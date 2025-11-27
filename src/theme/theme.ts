import { createTheme, type ThemeOptions } from '@mui/material/styles';
import { margin, positions } from '@mui/system';
import { componentStyles } from './componentStyles';
export const colors = {
  primary: {
    main: '#00a499',      // Teal base color
    light: '#33b8ae',     // Lighter teal
    dark: '#008a81',      // Darker teal
  },
  secondary: {
    main: '#f4f4f5',
    light: '#fafafa',
    dark: '#a1a1aa',
  },
  background: {
    default: '#ffffff',
    paper: '#ffffff',
  },
  text: {
    primary: '#18181b',
    secondary: '#52525b',
  },
  grey: {
    50: '#fafafa',
    100: '#f4f4f5',
    200: '#e4e4e7',
    300: '#d4d4d8',
    400: '#a1a1aa',
    500: '#71717a',
    600: '#52525b',
    700: '#3f3f46',
    800: '#27272a',
    900: '#18181b',
  },
}

export const themeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    ...colors
  },
  typography: {
    fontFamily: [
      'Inter',
      'system-ui',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '3.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
      background: `linear-gradient(135deg, ${colors.primary.main}  0%, #243947 100%)`,
      backgroundClip: 'text',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h6: {
      fontSize: '1.125rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
    button: {
      fontWeight: 500,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 8,
  },
  spacing: 8,
  components: componentStyles
};

export const darkThemeOptions: ThemeOptions = {
  ...themeOptions,
  palette: {
    ...(themeOptions.palette || {}),
    mode: 'dark',
    primary: {
      main: '#fafafa',
      light: '#ffffff',
      dark: '#a1a1aa',
    },
    secondary: {
      main: '#27272a',
      light: '#18181b',
      dark: '#3f3f46',
    },
    background: {
      default: '#0a0a0a',
      paper: '#18181b',
    },
    text: {
      primary: '#fafafa',
      secondary: '#a1a1aa',
    },
  },
};

export const createCustomTheme = (mode = 'light') => {
  return createTheme(mode === 'dark' ? darkThemeOptions : themeOptions);
};


