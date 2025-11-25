import React from 'react';
import { Stack, Typography } from '@mui/material';

export interface TableOfContentsProps {
  items?: string[];
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ 
  items = ['Usage', 'Installation', 'Examples', 'Props'] 
}) => {
  return (
    <Stack spacing={1} sx={{ position: 'sticky', top: '64px' }}>
      <Typography variant="caption" key="on-this-page">
        On this page
      </Typography>
      {items.map((item: string) => (
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
  );
};
