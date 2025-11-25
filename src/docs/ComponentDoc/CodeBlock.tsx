import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Chip,
} from '@mui/material';
import { ContentCopy } from '@mui/icons-material';
import { Editor } from '@monaco-editor/react';
import { Check, Scaling } from 'lucide-react';
import { useFullscreen } from '../../hooks/useFullscreen';
import { colors } from '../../theme/theme';

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
            zIndex: 1000,
            color: colors.grey[500],
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
              zIndex: 1001,
              color: colors.grey[500],
            }}
            size="small"
          >
            {copied ? <Check fontSize="small" /> : <ContentCopy fontSize="small" />}
          </IconButton>
        )}

        <Editor
          height={isFullscreen ? "96vh" : `${Math.min(Math.max((code.split('\n').length * 19) + 40, 100), 360)}px`}
          language={language === 'jsx' ? 'javascript' : language}
          value={code}
          theme={'vs-dark'}
          options={{
            readOnly: true,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            wordWrap: 'on',
            lineNumbers: showLineNumbers ? 'on' : 'off',
            folding: false,
            fontSize: 14,
            padding: { top: 20, bottom: 20 },
            scrollbar: {
              vertical: 'auto',
              horizontal: 'auto',
            },
            overviewRulerLanes: 0,
            hideCursorInOverviewRuler: true,
            overviewRulerBorder: false,
          }}
        />
      </Box>
    </Paper>
  );
};
