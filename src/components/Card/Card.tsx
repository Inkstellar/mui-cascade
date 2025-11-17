import React from 'react';
import {
  Card as MuiCard,
  CardContent as MuiCardContent,
  CardActions as MuiCardActions,
  CardHeader as MuiCardHeader,
  CardProps as MuiCardProps,
} from '@mui/material';

export interface CardProps extends Omit<MuiCardProps, 'variant'> {
  variant?: 'elevated' | 'outlined' | 'filled';
  padding?: 'none' | 'small' | 'medium' | 'large';
  interactive?: boolean;
}

const variantStyles = {
  elevated: {
    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    border: 'none',
  },
  outlined: {
    boxShadow: 'none',
    border: '1px solid',
    borderColor: 'var(--border)',
  },
  filled: {
    boxShadow: 'none',
    border: 'none',
    backgroundColor: 'var(--secondary)',
  },
};

const paddingStyles = {
  none: {
    padding: 0,
  },
  small: {
    padding: '16px',
  },
  medium: {
    padding: '24px',
  },
  large: {
    padding: '32px',
  },
};

export const Card: React.FC<CardProps> = ({
  variant = 'elevated',
  padding = 'medium',
  interactive = false,
  sx,
  children,
  ...props
}) => {
  return (
    <MuiCard
      sx={{
        ...variantStyles[variant],
        ...paddingStyles[padding],
        transition: interactive ? 'all 0.2s ease-in-out' : 'none',
        cursor: interactive ? 'pointer' : 'default',
        '&:hover': interactive
          ? {
              transform: 'translateY(-2px)',
              boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
            }
          : {},
        ...sx,
      }}
      {...props}
    >
      {children}
    </MuiCard>
  );
};

export const CardHeader: React.FC<any> = ({ title, subtitle, action, avatar, ...props }) => (
  <MuiCardHeader
    title={title}
    subheader={subtitle}
    action={action}
    avatar={avatar}
    sx={{
      '& .MuiCardHeader-title': {
        fontSize: '1.25rem',
        fontWeight: 600,
      },
      '& .MuiCardHeader-subheader': {
        fontSize: '0.875rem',
        color: 'var(--muted-foreground)',
      },
      ...props.sx,
    }}
    {...props}
  />
);

export const CardContent: React.FC<any> = ({ children, sx, ...props }) => (
  <MuiCardContent
    sx={{
      padding: paddingStyles.medium,
      '&:last-child': {
        paddingBottom: paddingStyles.medium.padding,
      },
      ...sx,
    }}
    {...props}
  >
    {children}
  </MuiCardContent>
);

export const CardActions: React.FC<any> = ({ children, sx, ...props }) => (
  <MuiCardActions
    sx={{
      padding: '16px',
      gap: '8px',
      ...sx,
    }}
    {...props}
  >
    {children}
  </MuiCardActions>
);

export default Card;