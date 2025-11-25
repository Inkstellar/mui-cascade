import React, { useEffect, useRef, useState } from 'react';
import { Box, Paper, Button, Stack, Chip, IconButton, Tooltip, Typography } from '@mui/material';
import { Play, Code, Maximize2, X } from 'lucide-react';

// Type definitions for LiveCodes (will be available when livecodes package is installed)
type EmbedOptions = any;
type Playground = any;

export interface LiveCodePlaygroundProps {
  code: string;
  title?: string;
  height?: number | string;
  language?: 'jsx' | 'tsx' | 'javascript' | 'typescript';
  showControls?: boolean;
  autoRun?: boolean;
}

export const LiveCodePlayground: React.FC<LiveCodePlaygroundProps> = ({
  code,
  title,
  height = 500,
  language = 'tsx',
  showControls = true,
  autoRun = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const playgroundRef = useRef<Playground | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let mounted = true;

    const initPlayground = async () => {
      if (!containerRef.current) return;

      try {
        // Dynamically import LiveCodes SDK
        const { createPlayground } = await import('livecodes');

        if (!mounted) return;

        // Prepare code content based on language
        const isTypeScript = language === 'tsx' || language === 'typescript';
        const isReact = language === 'jsx' || language === 'tsx';

        // Configure the playground
        const config: EmbedOptions = {
          config: {
            markup: {
              language: 'html',
              content: `<!DOCTYPE html>
                        <html lang="en">
                        <head>
                            <meta charset="utf-8" />
                            <meta name="viewport" content="width=device-width, initial-scale=1" />
                            <title>${title || 'Live Code'}</title>
                        </head>
                        <body>
                            <div id="root"></div>
                        </body>
                        </html>`,
            },
            style: {
              language: 'css',
              content: `body {
                        margin: 0;
                        padding: 16px;
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
                            'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
                            sans-serif;
                        -webkit-font-smoothing: antialiased;
                        -moz-osx-font-smoothing: grayscale;
                        }`,
            },
            script: {
              language: isTypeScript ? 'typescript' : 'javascript',
              content: isReact
                ? `import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  palette: {
    mode: 'light',
  },
});

${code}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);`
                : code,
            },
            customSettings: {
              imports: {
                react: 'https://esm.sh/react@18.2.0',
                'react-dom': 'https://esm.sh/react-dom@18.2.0',
                'react-dom/client': 'https://esm.sh/react-dom@18.2.0/client',
                '@mui/material': 'https://esm.sh/@mui/material@5.14.20',
                '@mui/material/styles': 'https://esm.sh/@mui/material@5.14.20/styles',
                '@mui/icons-material': 'https://esm.sh/@mui/icons-material@5.14.19',
                'lucide-react': 'https://esm.sh/lucide-react@0.292.0',
              },
            },
            activeEditor: 'script',
          },
          params: {
            console: 'open',
            compiled: 'open',
          },
          loading: 'eager',
          view: 'split',
        };

        // Create the playground
        const playground = await createPlayground(containerRef.current, config);
        playgroundRef.current = playground;

        if (mounted) {
          setIsLoading(false);
          if (autoRun) {
            setIsRunning(true);
            await playground.run();
          }
        }
      } catch (error) {
        console.error('Failed to initialize LiveCodes playground:', error);
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    initPlayground();

    return () => {
      mounted = false;
      if (playgroundRef.current) {
        playgroundRef.current.destroy();
      }
    };
  }, [code, language, title, autoRun]);

  const handleRun = async () => {
    if (playgroundRef.current) {
      setIsRunning(true);
      await playgroundRef.current.run();
    }
  };

  const handleToggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const playgroundContainer = (
    <Paper
      elevation={0}
      sx={{
        border: '1px solid',
        borderColor: '#e5e7eb',
        borderRadius: 2,
        overflow: 'hidden',
        ...(isFullscreen && {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 9999,
          borderRadius: 0,
          height: '100vh',
        }),
      }}
    >
      {showControls && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 16px',
            borderBottom: '1px solid',
            borderColor: '#e5e7eb',
            backgroundColor: '#f9fafb',
          }}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <Chip
              icon={<Code size={14} />}
              label="Live Code"
              size="small"
              sx={{
                backgroundColor: '#18181b',
                color: '#ffffff',
                fontWeight: 600,
              }}
            />
            {title && (
              <Typography variant="body2" sx={{ color: '#52525b' }}>
                {title}
              </Typography>
            )}
          </Stack>
          <Stack direction="row" spacing={1}>
            <Tooltip title={isRunning ? 'Running' : 'Run Code'}>
              <Button
                variant="outlined"
                size="small"
                startIcon={<Play size={16} />}
                onClick={handleRun}
                disabled={isLoading || isRunning}
                sx={{
                  borderColor: '#e5e7eb',
                  color: '#18181b',
                  textTransform: 'none',
                  '&:hover': {
                    borderColor: '#18181b',
                    backgroundColor: '#f9fafb',
                  },
                }}
              >
                Run
              </Button>
            </Tooltip>
            <Tooltip title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}>
              <IconButton
                size="small"
                onClick={handleToggleFullscreen}
                sx={{
                  border: '1px solid',
                  borderColor: '#e5e7eb',
                  borderRadius: 1,
                  '&:hover': {
                    borderColor: '#18181b',
                    backgroundColor: '#f9fafb',
                  },
                }}
              >
                {isFullscreen ? <X size={16} /> : <Maximize2 size={16} />}
              </IconButton>
            </Tooltip>
          </Stack>
        </Box>
      )}
      <Box
        ref={containerRef}
        sx={{
          width: '100%',
          height: isFullscreen ? 'calc(100vh - 57px)' : height,
          position: 'relative',
        }}
      >
        {isLoading && (
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: '#52525b',
            }}
          >
            Loading playground...
          </Box>
        )}
      </Box>
    </Paper>
  );

  return isFullscreen ? (
    <Box sx={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999 }}>
      {playgroundContainer}
    </Box>
  ) : (
    playgroundContainer
  );
};
