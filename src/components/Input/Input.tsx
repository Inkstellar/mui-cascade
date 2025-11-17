import React from 'react';
import {
  TextField,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export interface InputProps {
  label?: string;
  placeholder?: string;
  helperText?: string;
  error?: boolean;
  disabled?: boolean;
  required?: boolean;
  size?: 'small' | 'medium';
  fullWidth?: boolean;
  variant?: 'outlined' | 'filled' | 'standard';
  type?: 'text' | 'password' | 'email' | 'number';
  value?: string;
  defaultValue?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  multiline?: boolean;
  rows?: number;
  maxRows?: number;
}

export const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  helperText,
  error = false,
  disabled = false,
  required = false,
  size = 'medium',
  fullWidth = false,
  variant = 'outlined',
  type = 'text',
  value,
  defaultValue,
  onChange,
  onBlur,
  onFocus,
  startAdornment,
  endAdornment,
  multiline = false,
  rows = 4,
  maxRows,
  sx,
  ...props
}) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <TextField
      label={label}
      placeholder={placeholder}
      helperText={helperText}
      error={error}
      disabled={disabled}
      required={required}
      size={size}
      fullWidth={fullWidth}
      variant={variant}
      type={inputType}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      multiline={multiline}
      rows={multiline ? rows : undefined}
      maxRows={multiline ? maxRows : undefined}
      InputProps={{
        startAdornment: startAdornment ? (
          <InputAdornment position="start">
            {startAdornment}
          </InputAdornment>
        ) : null,
        endAdornment: endAdornment || isPassword ? (
          <InputAdornment position="end">
            {isPassword ? (
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleTogglePassword}
                edge="end"
                size={size}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            ) : (
              endAdornment
            )}
          </InputAdornment>
        ) : null,
        sx: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: error ? 'var(--destructive)' : 'var(--border)',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: error ? 'var(--destructive)' : 'var(--primary)',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: error ? 'var(--destructive)' : 'var(--primary)',
            borderWidth: 2,
          },
          '&.Mui-error .MuiOutlinedInput-notchedOutline': {
            borderColor: 'var(--destructive)',
          },
          ...sx,
        },
      }}
      InputLabelProps={{
        sx: {
          color: error ? 'var(--destructive)' : 'var(--muted-foreground)',
          '&.Mui-focused': {
            color: error ? 'var(--destructive)' : 'var(--primary)',
          },
        },
      }}
      FormHelperTextProps={{
        sx: {
          color: error ? 'var(--destructive)' : 'var(--muted-foreground)',
          '&.Mui-error': {
            color: 'var(--destructive)',
          },
        },
      }}
      sx={{
        '& .MuiInputBase-root': {
          borderRadius: 8,
        },
        ...sx,
      }}
      {...props}
    />
  );
};

export default Input;