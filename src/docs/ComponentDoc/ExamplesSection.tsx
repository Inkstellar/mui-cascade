import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  Stack,
} from '@mui/material';
import { Code2, Play } from 'lucide-react';
import { CodeBlock } from './CodeBlock';
import { LiveCodePlayground } from './LiveCodePlayground';

export interface ExampleItem {
  title: string;
  description: string;
  component?: React.ReactNode;
  code?: string;
  figmaUrl?: string;
  figmaPreviewImage?: string;
  codeSandboxUrl?: string;
  enableLiveCode?: boolean; // New option to enable live playground
}

export interface ExamplesSectionProps {
  examples: ExampleItem[];
}

export const ExamplesSection: React.FC<ExamplesSectionProps> = ({ examples }) => {
  const [viewMode, setViewMode] = useState<{ [key: number]: 'preview' | 'code' | 'live' }>({});

  if (examples.length === 0) {
    return null;
  }

  const handleViewModeChange = (index: number, newMode: 'preview' | 'code' | 'live') => {
    setViewMode((prev) => ({ ...prev, [index]: newMode }));
  };

  return (
    <Box sx={{ marginBottom: '32px' }}>
      <Typography variant="h3" id="component-Examples" sx={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '24px' }}>
        Examples
      </Typography>
      {examples.map((example, index) => {
        const currentMode = viewMode[index] || 'preview';

        return (
          <Box key={index} sx={{ marginBottom: '24px' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ marginBottom: '8px' }}>
              <Typography variant="h4" sx={{ fontSize: '1.125rem', fontWeight: 600 }}>
                {example.title}
              </Typography>
              
              {/* View Mode Toggle - only show if code is available */}
              {example.code && !example.figmaUrl && (
                <ToggleButtonGroup
                  value={currentMode}
                  exclusive
                  onChange={(_, newMode) => newMode && handleViewModeChange(index, newMode)}
                  size="small"
                  sx={{
                    '& .MuiToggleButton-root': {
                      textTransform: 'none',
                      fontSize: '0.813rem',
                      padding: '4px 12px',
                    },
                  }}
                >
                  {example.component && (
                    <ToggleButton value="preview">
                      <Code2 size={14} style={{ marginRight: '4px' }} />
                      Preview
                    </ToggleButton>
                  )}
                  <ToggleButton value="code">
                    <Code2 size={14} style={{ marginRight: '4px' }} />
                    Code
                  </ToggleButton>
                  {example.enableLiveCode && (
                    <ToggleButton value="live">
                      <Play size={14} style={{ marginRight: '4px' }} />
                      Live
                    </ToggleButton>
                  )}
                </ToggleButtonGroup>
              )}
            </Stack>
            
            <Typography variant="body2" sx={{ color: '#52525b', marginBottom: '16px' }}>
              {example.description}
            </Typography>

          {/* Render Figma embed if figmaUrl is provided */}
          {example.figmaUrl ? (
            <Paper
              elevation={0}
              sx={{
                border: '1px solid',
                borderColor: '#e5e7eb',
                borderRadius: 2,
                overflow: 'hidden',
                marginBottom: '16px',
              }}
            >
              {example.figmaPreviewImage ? (
                // Show preview image with "Open in Figma" button
                <Box sx={{ position: 'relative' }}>
                  <img
                    src={example.figmaPreviewImage}
                    alt={example.title}
                    style={{
                      width: '100%',
                      height: 'auto',
                      display: 'block',
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    <Button
                      variant="contained"
                      size="large"
                      component="a"
                      href={example.figmaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        backgroundColor: '#18181b',
                        color: '#ffffff',
                        padding: '12px 24px',
                        fontSize: '1rem',
                        fontWeight: 600,
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                        '&:hover': {
                          backgroundColor: '#27272a',
                          boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)',
                        },
                      }}
                    >
                      Open in Figma
                    </Button>
                  </Box>
                </Box>
              ) : (
                // Show iframe embed
                <iframe
                  style={{ border: 'none', width: '100%', height: '600px' }}
                  src={example.figmaUrl}
                  allowFullScreen
                />
              )}
            </Paper>
          ) : (
            <>
              {/* Show Live Playground */}
              {currentMode === 'live' && example.code && example.enableLiveCode ? (
                <LiveCodePlayground
                  code={example.code}
                  title={example.title}
                  height={600}
                  language="tsx"
                  showControls={true}
                  autoRun={false}
                />
              ) : currentMode === 'code' && example.code ? (
                /* Show Code Block */
                <Box>
                  {/* CodeSandbox button */}
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '8px' }}>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => {
                        // Create the sandbox configuration
                        const sandboxConfig = {
                          files: {
                            'package.json': {
                              content: {
                                dependencies: {
                                  "@emotion/react": "^11.11.1",
                                  "@emotion/styled": "^11.11.0",
                                  "@mui/icons-material": "^5.14.19",
                                  "@mui/material": "^5.14.20",
                                  "@mui/system": "^5.14.20",
                                  "react": "^18.2.0",
                                  "react-dom": "^18.2.0",
                                  "react-syntax-highlighter": "^15.5.13"
                                },
                              },
                            },
                            'index.js': {
                              content: `import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
import { createCustomTheme } from 'mui-cascade';
import App from './App';

const currentTheme = createCustomTheme('light');
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={currentTheme}>
    <App />
  </ThemeProvider>
);`,
                            },
                            'App.js': {
                              content: example.code || 'export default function App() { return <div>Hello</div>; }',
                            },
                            'public/index.html': {
                              content: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${example.title || 'React App'}</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`,
                            },
                          },
                        };

                        // Convert to JSON and encode
                        const parameters = JSON.stringify(sandboxConfig);

                        // Use fetch API to create sandbox
                        fetch('https://codesandbox.io/api/v1/sandboxes/define?json=1', {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                          },
                          body: JSON.stringify({ files: sandboxConfig.files }),
                        })
                          .then(res => res.json())
                          .then(data => {
                            window.open(`https://codesandbox.io/s/${data.sandbox_id}`, '_blank');
                          })
                          .catch(err => {
                            console.error('Failed to create sandbox:', err);
                            // Fallback: open template and copy code
                            window.open('https://codesandbox.io/s/new?template=react', '_blank');
                            if (example.code) {
                              navigator.clipboard.writeText(example.code);
                            }
                          });
                      }}
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
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 256 296"
                        style={{ marginRight: '8px' }}
                        fill="currentColor"
                      >
                        <path d="M115.498 261.088v-106.61L23.814 101.73v60.773l41.996 24.347v45.7l49.688 28.54zm23.814.627l50.605-29.151V185.78l-42.269-24.495v-44.907l-8.336-4.848v149.987zm0-198.576l47.896 27.73-47.896 27.73-47.896-27.73 47.896-27.73zm-58.233 43.02l-42.239-24.495v-43.02l42.239 24.495v43.02zm116.466 0v-43.02l42.239-24.495v43.02l-42.239 24.495zM0 222.212V73.783L127.912 0l128.088 73.783v148.429l-128.088 73.783L0 222.212z" />
                      </svg>
                      Open in CodeSandbox
                    </Button>
                  </Box>
                  <CodeBlock
                    code={example.code}
                    language="jsx"
                  />
                </Box>
              ) : (
                /* Show Preview */
                example.component && (
                  <Paper
                    elevation={0}
                    sx={{
                      border: '1px solid',
                      borderColor: '#e5e7eb',
                      borderRadius: 2,
                      padding: '40px',
                      marginBottom: '16px',
                      minHeight: '150px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {example.component}
                  </Paper>
                )
              )}
            </>
          )}
        </Box>
        );
      })}
    </Box>
  );
};
