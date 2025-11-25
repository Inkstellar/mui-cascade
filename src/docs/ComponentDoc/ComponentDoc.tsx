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
import { Check, Terminal, Package, TestTube2, StopCircle, Scaling } from 'lucide-react';
import { componentMetadata } from '../registryMetadata';
import { useFullscreen } from '../../hooks/useFullscreen';
import { colors } from '../../theme/theme';
import { CodeBlock } from './CodeBlock';
import { PropsTable } from './PropsTable';
import { ExamplesSection } from './ExamplesSection';
import { CliInstallation } from './CliInstallation';
import { TableOfContents } from './TableOfContents';

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

            {/* Basic Code Examples */}
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
            {cliInstall && <CliInstallation cliInstall={cliInstall} />}

            {/* Additional Examples */}
            <ExamplesSection examples={examples} />

            {/* Props Documentation */}
            <PropsTable props={props} />
          </Box>
        </Grid>
        {/* hide table of contents on mobile */}
        <Grid item xs={12} md={2} sx={{ display: { xs: 'none', md: 'block' } }}>
          <TableOfContents />
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

