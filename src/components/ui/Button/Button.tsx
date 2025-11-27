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
  to?: string;
}

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
  
  // Map custom variants to MUI variants
  const muiVariant = variant === 'elevated' || variant === 'tonal' ? 'contained' : variant;

  return (
    <MuiButton
      variant={muiVariant as 'contained' | 'outlined' | 'text'}
      size={size}
      disabled={isDisabled}
      sx={sx}
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
