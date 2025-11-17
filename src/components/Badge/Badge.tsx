import React from 'react';
import { Chip } from '@mui/material';

export interface BadgeProps {
  variant?: 'filled' | 'outlined' | 'tonal';
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'small' | 'medium';
  pulse?: boolean;
  label?: React.ReactNode;
  sx?: object;
}

const variantStyles = {
  filled: {
    backgroundColor: 'var(--primary)',
    color: 'var(--primary-foreground)',
  },
  outlined: {
    backgroundColor: 'transparent',
    color: 'var(--primary)',
    border: '1px solid',
    borderColor: 'var(--border)',
  },
  tonal: {
    backgroundColor: 'var(--primary)15',
    color: 'var(--primary)',
  },
};

const colorStyles = {
  default: {
    backgroundColor: 'var(--muted)',
    color: 'var(--muted-foreground)',
  },
  primary: variantStyles.filled,
  secondary: {
    backgroundColor: 'var(--secondary)',
    color: 'var(--secondary-foreground)',
  },
  success: {
    backgroundColor: 'var(--success)',
    color: 'var(--success-foreground)',
  },
  warning: {
    backgroundColor: 'var(--warning)',
    color: 'var(--warning-foreground)',
  },
  error: {
    backgroundColor: 'var(--destructive)',
    color: 'var(--destructive-foreground)',
  },
  info: {
    backgroundColor: 'var(--info)',
    color: 'var(--info-foreground)',
  },
};

const sizeStyles = {
  small: {
    height: 20,
    fontSize: '0.75rem',
    '& .MuiChip-label': {
      padding: '0 8px',
    },
  },
  medium: {
    height: 24,
    fontSize: '0.875rem',
    '& .MuiChip-label': {
      padding: '0 12px',
    },
  },
};

export const Badge: React.FC<BadgeProps> = ({
  variant = 'filled',
  color = 'default',
  size = 'medium',
  pulse = false,
  label,
  sx,
}) => {
  const getColorStyle = () => {
    if (variant === 'tonal') {
      return {
        backgroundColor: `${colorStyles[color].backgroundColor}15`,
        color: colorStyles[color].color || 'var(--primary)',
      };
    }
    if (variant === 'outlined') {
      return {
        backgroundColor: 'transparent',
        color: colorStyles[color].color || 'var(--primary)',
        border: '1px solid',
        borderColor: colorStyles[color].backgroundColor || 'var(--border)',
      };
    }
    return {
      backgroundColor: colorStyles[color].backgroundColor || 'var(--muted)',
      color: colorStyles[color].color || 'var(--muted-foreground)',
    };
  };

  return (
    <Chip
      size={size}
      label={label}
      sx={{
        borderRadius: 16,
        fontWeight: 500,
        textTransform: 'none',
        ...sizeStyles[size],
        ...getColorStyle(),
        animation: pulse ? 'pulse 2s infinite' : 'none',
        '@keyframes pulse': {
          '0%': {
            opacity: 1,
          },
          '50%': {
            opacity: 0.7,
          },
          '100%': {
            opacity: 1,
          },
        },
        ...sx,
      }}
    />
  );
};

export default Badge;
