import React from 'react';
import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
  CircularProgress,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

export interface ButtonProps extends Omit<MuiButtonProps, 'variant'> {
  variant?: 'contained' | 'outlined' | 'text' | 'elevated' | 'tonal';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  to?: string;
}

const variantStyles = (theme: any) => ({
  contained: {
    backgroundColor: theme.palette.primary.main,
    color: '#ffffff',
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      opacity: 0.9,
    },
  },

  elevated: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.primary.main,
    border: '1px solid',
    borderColor: theme.palette.grey[300],
    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
      boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -2px rgb(0 0 0 / 0.1)',
    },
  },
  tonal: {
    backgroundColor: `${theme.palette.primary.main}15`,
    color: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: `${theme.palette.primary.main}25`,
    },
  },
  outlined: {
    backgroundColor: 'transparent',
    color: theme.palette.primary.main,
    border: `1px solid ${theme.palette.grey[300]}`,
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
      borderColor: theme.palette.grey[300],
    },
  },
  text: {
    backgroundColor: 'transparent',
    color: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
    },
  },
});

const sizeStyles = {
  small: {
    padding: '6px 12px',
    fontSize: '0.875rem',
    minHeight: 32,
  },
  medium: {
    padding: '8px 16px',
    fontSize: '0.875rem',
    minHeight: 40,
  },
  large: {
    padding: '12px 24px',
    fontSize: '1rem',
    minHeight: 48,
  },
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'contained',
  size = 'medium',
  loading = false,
  leftIcon,
  rightIcon,
  disabled,
  children,
  sx,
  ...props
}) => {
  const theme = useTheme();
  const isDisabled = disabled || loading;

  return (
    <MuiButton
      variant="contained"
      disabled={isDisabled}
      sx={{
        ...variantStyles(theme)[variant],
        ...sizeStyles[size],
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.2s ease-in-out',
        ...sx,
      }}
      {...props}
    >
      {loading && (
        <CircularProgress
          size={16}
          sx={{
            position: 'absolute',
            color: 'inherit',
          }}
        />
      )}
      <span
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: leftIcon || rightIcon ? '8px' : '0',
          opacity: loading ? 0 : 1,
        }}
      >
        {leftIcon && !loading && leftIcon}
        {children}
        {rightIcon && !loading && rightIcon}
      </span>
    </MuiButton>
  );
};

export default Button;
