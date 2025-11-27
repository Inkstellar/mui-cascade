import { ThemeOptions } from "@mui/material/styles";

export const buttonStyles: ThemeOptions['components'] = {
  MuiButton:  {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontSize: '0.875rem',
          fontWeight: 500,
          textTransform: 'none',
          boxShadow: 'none',
          transition: 'all 0.2s ease-in-out',
          position: 'relative',
          overflow: 'hidden',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        sizeSmall: {
          padding: '6px 12px',
          fontSize: '0.875rem',
          minHeight: 32,
        },
        sizeMedium: {
          padding: '8px 16px',
          fontSize: '0.875rem',
          minHeight: 40,
        },
        sizeLarge: {
          padding: '12px 24px',
          fontSize: '1rem',
          minHeight: 48,
        },
        contained: {
          backgroundColor: 'var(--mui-palette-primary-main)',
          color: '#ffffff',
          boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
          '&:hover': {
            backgroundColor: 'var(--mui-palette-primary-main)',
            opacity: 0.9,
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
          },
        },
        outlined: {
          backgroundColor: 'transparent',
          color: 'var(--mui-palette-primary-main)',
          border: '1px solid',
          borderColor: 'var(--mui-palette-grey-300)',
          '&:hover': {
            backgroundColor: 'var(--mui-palette-secondary-main)',
            borderColor: 'var(--mui-palette-grey-300)',
          },
        },
        text: {
          backgroundColor: 'transparent',
          color: 'var(--mui-palette-primary-main)',
          '&:hover': {
            backgroundColor: 'var(--mui-palette-secondary-main)',
          },
        },
      },
      variants: [
        {
          props: { variant: 'elevated' as any },
          style: ({ theme }: any) => ({
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.primary.main,
            border: '1px solid',
            borderColor: theme.palette.grey[300],
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
            '&:hover': {
              backgroundColor: theme.palette.secondary.main,
              boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -2px rgb(0 0 0 / 0.1)',
            },
          }),
        },
        {
          props: { variant: 'tonal' as any },
          style: ({ theme }: any) => ({
            backgroundColor: `${theme.palette.primary.main}15`,
            color: theme.palette.primary.main,
            '&:hover': {
              backgroundColor: `${theme.palette.primary.main}25`,
            },
          }),
        },
      ],
    }
};