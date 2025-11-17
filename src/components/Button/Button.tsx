import React from 'react';
import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
  CircularProgress,
} from '@mui/material';

export interface ButtonProps extends Omit<MuiButtonProps, 'variant'> {
  variant?: 'contained' | 'outlined' | 'text' | 'elevated' | 'tonal';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const variantStyles = {
  contained: {
    backgroundColor: 'var(--primary)',
    color: 'var(--primary-foreground)',
    '&:hover': {
      backgroundColor: 'var(--primary)',
      opacity: 0.9,
    },
  },
  elevated: {
    backgroundColor: 'var(--secondary)',
    color: 'var(--primary)',
    border: '1px solid',
    borderColor: 'var(--border)',
    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    '&:hover': {
      backgroundColor: 'var(--secondary)',
      boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -2px rgb(0 0 0 / 0.1)',
    },
  },
  tonal: {
    backgroundColor: 'var(--primary)15',
    color: 'var(--primary)',
    '&:hover': {
      backgroundColor: 'var(--primary)25',
    },
  },
  outlined: {
    backgroundColor: 'transparent',
    color: 'var(--primary)',
    border: '1px solid var(--border)',
    '&:hover': {
      backgroundColor: 'var(--secondary)',
      borderColor: 'var(--border)',
    },
  },
  text: {
    backgroundColor: 'transparent',
    color: 'var(--primary)',
    '&:hover': {
      backgroundColor: 'var(--secondary)',
    },
  },
};

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
  const isDisabled = disabled || loading;

  return (
    <MuiButton
      variant="contained"
      disabled={isDisabled}
      sx={{
        ...variantStyles[variant],
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