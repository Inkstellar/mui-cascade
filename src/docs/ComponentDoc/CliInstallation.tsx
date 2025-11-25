import React from 'react';
import { Box, Typography } from '@mui/material';
import { CodeBlock } from './CodeBlock';

export interface CliInstallationProps {
  cliInstall: string;
}

export const CliInstallation: React.FC<CliInstallationProps> = ({ cliInstall }) => {
  return (
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
  );
};
