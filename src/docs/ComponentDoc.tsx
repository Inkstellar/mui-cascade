import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  IconButton,
  Chip,
  Stack,
  Grid,
  Container,
  Snackbar,
  Tooltip,
} from '@mui/material';
import { ContentCopy } from '@mui/icons-material';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight, oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Check, Terminal, Package, TestTube2, StopCircle, Scaling } from 'lucide-react';
import { componentMetadata } from './registryMetadata';
import { useFullscreen } from '../hooks/useFullscreen';

export interface CodeBlockProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  title?: string;
  description?: string;
  showCopy?: boolean;
  theme?: 'light' | 'dark';
  maxHeight?: number | string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'jsx',
  showLineNumbers = true,
  title,
  description,
  showCopy = true,
  theme = 'light',
  maxHeight = 'auto',
}) => {
  const [copied, setCopied] = useState(false);
  const { isFullscreen, toggleFullscreen, fullscreenStyles } = useFullscreen("codeBlock" + title);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <Paper
      id={`codeBlock${title}`}
      elevation={0}
      sx={{
        border: '1px solid',
        borderColor: theme === 'dark' ? '#2a2a2a' : '#e5e7eb',
        borderRadius: 2,
        overflow: 'hidden',
        backgroundColor: theme === 'dark' ? '#1a1a1a' : '#ffffff',
        ...fullscreenStyles
      }}
    >
      {(title || description) && (
        <Box
          sx={{
            padding: '16px 20px',
            borderBottom: '1px solid',
            borderColor: theme === 'dark' ? '#2a2a2a' : '#e5e7eb',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <div>
            {title && (
              <Typography
                variant="h6"
                sx={{
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: theme === 'dark' ? '#ffffff' : '#18181b',
                  marginBottom: '4px',
                }}
              >
                {title}
              </Typography>
            )}

            {description && (
              <Typography
                variant="body2"
                sx={{
                  color: theme === 'dark' ? '#a1a1aa' : '#52525b',
                }}
              >
                {description}
              </Typography>
            )}
          </div>
          {title && (
            <Chip
              label={language.toUpperCase()}
              size="small"
              sx={{
                backgroundColor: theme === 'dark' ? '#2a2a2a' : '#f3f4f6',
                color: theme === 'dark' ? '#a1a1aa' : '#6b7280',
                fontSize: '0.75rem',
              }}
            />
          )}
        </Box>
      )}

      <Box
        sx={{
          position: 'relative',
          maxHeight: maxHeight,
          overflow: 'auto',
        }}
      >
        <IconButton
          key={"scaling"}
          size="small"
          onClick={toggleFullscreen}
          title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          sx={{
            position: 'absolute',
            top: 12,
            right: 12,
            zIndex: 1,
          }}
        >
          <Scaling size={20} />
        </IconButton>
        {showCopy && (
          <IconButton
            onClick={handleCopy}
            sx={{
              position: 'absolute',
              top: 12,
              right: 48,
              zIndex: 1,
            }}
            size="small"
          >
            {copied ? <Check fontSize="small" /> : <ContentCopy fontSize="small" />}
          </IconButton>
        )}

        <SyntaxHighlighter
          language={language}
          style={theme === 'dark' ? oneDark : oneLight}
          showLineNumbers={showLineNumbers}
          customStyle={{
            margin: 0,
            padding: '20px',
            backgroundColor: 'transparent',
            fontSize: '0.875rem',
            lineHeight: 1.6,
          }}
          lineNumberStyle={{
            color: theme === 'dark' ? '#6b7280' : '#9ca3af',
            minWidth: '3em',
            paddingRight: '1em',
          }}
        >
          {code}
        </SyntaxHighlighter>
      </Box>
    </Paper>
  );
};

export interface ComponentDocProps {
  title: string;
  description: string;
  component: React.ReactNode;
  code: string;
  cliInstall?: string;
  newitem?: boolean;
  experimental?: boolean;
  examples?: {
    title: string;
    description: string;
    component?: React.ReactNode;
    code?: string;
    figmaUrl?: string;
    figmaPreviewImage?: string; // Optional preview image for Figma
    codeSandboxUrl?: string; // Optional CodeSandbox URL
  }[];
  props?: {
    name: string;
    type: string;
    description: string;
    required?: boolean;
    default?: string;
  }[];
}

export const ComponentDoc: React.FC<ComponentDocProps> = ({
  title,
  description,
  component,
  code,
  cliInstall,
  newitem,
  experimental,
  examples = [],
  props = [],
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);
  const [copiedText, setCopiedText] = useState('');


  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        <Grid item xs={12} md={10}>
          <Box sx={{ px: { xs: 0, md: 12 } }}>
            <Stack direction={'row'} mb={2} justifyContent={'space-between'} flexWrap={'wrap'} alignItems={'baseline'}>
              <Box> <Typography
                id="component-Title"
                variant="h1"
                sx={{ mb: 1 }}
              >
                {title}
              </Typography>
                {componentStatus(title)}</Box>
              {cliInstall && <Button
                size='small'
                variant="outlined"
                color="primary"
                startIcon={copied ? <Check size={20} /> : <Terminal size={20} />}
                onClick={() => handleCopy(cliInstall)}
              >
                {cliInstall}
              </Button>}
            </Stack>
            <Typography
              id="component-Description"
              variant="body1"
              sx={{
                fontSize: '1.125rem',
                color: '#52525b',
                marginBottom: '40px',
              }}
            >
              {description}
            </Typography>

            {/* Preview */}
            <Paper
              elevation={0}
              sx={{
                border: '1px solid',
                borderColor: '#e5e7eb',
                borderRadius: 2,
                padding: '40px',
                marginBottom: '32px',
                minHeight: '200px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {component}
            </Paper>

            {/* Code Examples */}
            <Box sx={{ marginBottom: '32px' }}>
              <Typography variant="h3" id="component-Usage" sx={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '16px' }}>
                Usage
              </Typography>
              <CodeBlock
                code={code}
                language="jsx"
                title={`How to use ${title}`}
                description="Copy and paste this code to get started"
              />
            </Box>

            {/* CLI Installation */}
            {cliInstall && (
              <Box sx={{ marginBottom: '32px' }}>
                <Typography variant="h3" id="component-Installation" sx={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '16px' }}>
                  Installation
                </Typography>
                <CodeBlock
                  code={cliInstall}
                  language="bash"
                  title="CLI Installation"
                  description="Automatically add this component to your project with our CLI tool"
                />
              </Box>
            )}

            {/* Additional Examples */}
            {examples.length > 0 && (
              <Box sx={{ marginBottom: '32px' }}>
                <Typography variant="h3" id="component-Examples" sx={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '24px' }}>
                  Examples
                </Typography>
                {examples.map((example, index) => (
                  <Box key={index} sx={{ marginBottom: '24px' }}>
                    <Typography variant="h4" sx={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '8px' }}>
                      {example.title}
                    </Typography>
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
                        {/* Render React component preview */}
                        {example.component && (
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
                        )}

                        {/* Render code block if code is provided */}
                        {example.code && (
                          <Box>
                            {/* CodeSandbox button - auto-generate from code */}
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
                              showCopy={false}
                            />
                          </Box>
                        )}
                      </>
                    )}
                  </Box>
                ))}
              </Box>
            )}

            {/* Props Documentation */}
            {props.length > 0 && (
              <Box sx={{ marginBottom: '32px' }}>
                <Typography variant="h3" id="component-Props" sx={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '24px' }}>
                  Props
                </Typography>

                <Paper
                  elevation={0}
                  sx={{
                    border: '1px solid',
                    borderColor: '#e5e7eb',
                    borderRadius: 2,
                    overflow: 'hidden',
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: '#f9fafb',
                      padding: '16px 20px',
                      borderBottom: '1px solid',
                      borderColor: '#e5e7eb',
                      display: 'grid',
                      gridTemplateColumns: '200px 150px 1fr 100px',
                      gap: '20px',
                      fontWeight: 600,
                      fontSize: '0.875rem',
                      color: '#374151',
                    }}
                  >
                    <div>Name</div>
                    <div>Type</div>
                    <div>Description</div>
                    <div>Default</div>
                  </Box>

                  {props.map((prop, index) => (
                    <Box
                      key={index}
                      sx={{
                        padding: '16px 20px',
                        borderBottom: index < props.length - 1 ? '1px solid' : 'none',
                        borderColor: '#e5e7eb',
                        display: 'grid',
                        gridTemplateColumns: '200px 150px 1fr 100px',
                        gap: '20px',
                        fontSize: '0.875rem',
                      }}
                    >
                      <div style={{ fontWeight: 500 }}>
                        {prop.name}
                        {prop.required && (
                          <Chip
                            label="required"
                            size="small"
                            sx={{
                              marginLeft: '8px',
                              height: '20px',
                              fontSize: '0.75rem',
                              backgroundColor: '#fef2f2',
                              color: '#dc2626',
                            }}
                          />
                        )}
                      </div>
                      <div
                        style={{
                          fontFamily: 'Monaco, Consolas, monospace',
                          backgroundColor: '#f3f4f6',
                          padding: '2px 6px',
                          borderRadius: '4px',
                          fontSize: '0.75rem',
                        }}
                      >
                        {prop.type}
                      </div>
                      <div style={{ color: '#374151' }}>{prop.description}</div>
                      <div style={{ color: '#6b7280' }}>{prop.default || '-'}</div>
                    </Box>
                  ))}
                </Paper>
              </Box>
            )}
          </Box>
        </Grid>
        {/* hide table of contents on mobile */}
        <Grid item xs={12} md={2} sx={{ display: { xs: 'none', md: 'block' } }}>
          <Stack spacing={1} sx={{ position: 'sticky', top: '64px' }}>
            <Typography variant="caption" key="on-this-page">
              On this page
            </Typography>
            {['Usage', 'Installation', 'Examples', 'Props'].map((item: string) => (
              <a
                href={`#component-${item}`}
                key={item}
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                  fontSize: '0.875rem',
                  display: 'block',
                  padding: '4px 0',
                  cursor: 'pointer',
                }}
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.getElementById(`component-${item}`);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
              >
                {item}
              </a>
            ))}

          </Stack>
        </Grid>
      </Grid>

      {/* Toast notification for copy */}
      <Snackbar
        open={copied}
        autoHideDuration={2000}
        onClose={() => setCopied(false)}
        message={copiedText.startsWith('npx') ? 'CLI command copied!' : 'Code copied to clipboard'}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Container >
  );
};

export default ComponentDoc;




function componentStatus(title: string) {
  // Find the component in the metadata by matching the title
  const metadataEntry = Object.values(componentMetadata).find(
    entry => entry.name === title
  );

  const newitem = metadataEntry?.newitem;
  const experimental = metadataEntry?.experimental;
  const deprecated = metadataEntry?.deprecated;

  return (
    <Stack direction={"row"} sx={{ ml: 1 }} gap={1}>
      {newitem && <Tooltip title="New"><Package size={24} color="#00a499" /></Tooltip>}
      {experimental && <Tooltip title="Experimental"><TestTube2 size={24} color="#ef4444" /></Tooltip>}
      {deprecated && (
        <Tooltip title="Deprecated">
          <StopCircle size={24} color="#ef4444" />
        </Tooltip>
      )}
    </Stack>
  );
}

