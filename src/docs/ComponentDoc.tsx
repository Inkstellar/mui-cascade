import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Tabs,
  Tab,
  IconButton,
  Chip,
} from '@mui/material';
import { ContentCopy, Check } from '@mui/icons-material';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight, oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

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
      elevation={0}
      sx={{
        border: '1px solid',
        borderColor: theme === 'dark' ? '#2a2a2a' : '#e5e7eb',
        borderRadius: 2,
        overflow: 'hidden',
        backgroundColor: theme === 'dark' ? '#1a1a1a' : '#ffffff',
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
        {showCopy && (
          <IconButton
            onClick={handleCopy}
            sx={{
              position: 'absolute',
              top: 12,
              right: 12,
              zIndex: 1,
              backgroundColor: theme === 'dark' ? '#2a2a2a80' : '#ffffff80',
              backdropFilter: 'blur(8px)',
              color: theme === 'dark' ? '#ffffff' : '#18181b',
              '&:hover': {
                backgroundColor: theme === 'dark' ? '#2a2a2a' : '#f3f4f6',
              },
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
  examples?: {
    title: string;
    description: string;
    component: React.ReactNode;
    code: string;
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
  examples = [],
  props = [],
}) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Box sx={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
      <Typography
        variant="h1"
        sx={{
          fontSize: '3rem',
          fontWeight: 700,
          marginBottom: '16px',
          background: 'linear-gradient(135deg, #18181b 0%, #52525b 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        {title}
      </Typography>
      
      <Typography
        variant="body1"
        sx={{
          fontSize: '1.125rem',
          color: '#52525b',
          marginBottom: '40px',
          maxWidth: '600px',
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
          textAlign: 'center',
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
        <Typography variant="h3" sx={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '16px' }}>
          Usage
        </Typography>
        <CodeBlock
          code={code}
          language="jsx"
          title={`How to use ${title}`}
          description="Copy and paste this code to get started"
        />
      </Box>

      {/* Additional Examples */}
      {examples.length > 0 && (
        <Box sx={{ marginBottom: '32px' }}>
          <Typography variant="h3" sx={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '24px' }}>
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
              
              <Paper
                elevation={0}
                sx={{
                  border: '1px solid',
                  borderColor: '#e5e7eb',
                  borderRadius: 2,
                  padding: '40px',
                  marginBottom: '16px',
                  textAlign: 'center',
                  minHeight: '150px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {example.component}
              </Paper>
              
              <CodeBlock
                code={example.code}
                language="jsx"
                showCopy={false}
              />
            </Box>
          ))}
        </Box>
      )}

      {/* Props Documentation */}
      {props.length > 0 && (
        <Box sx={{ marginBottom: '32px' }}>
          <Typography variant="h3" sx={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '24px' }}>
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
  );
};

export default ComponentDoc;