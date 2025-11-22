import React from 'react';
import {
  TextField,
  InputAdornment,
  IconButton,
  useTheme,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export interface InputProps {
  label?: string;
  placeholder?: string;
  helperText?: string;
  error?: boolean;
  disabled?: boolean;
  required?: boolean;
  starticon?: React.ReactNode;
  endicon?: React.ReactNode;
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
  sx?: any;
  inputProps?: any;
  onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  helperText,
  error = false,
  disabled = false,
  required = false,
  size = 'small',
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
  const theme = useTheme();
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
      size={size || 'small'}
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
            borderColor: error ? theme.palette.error.main : theme.palette.divider,
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: error ? theme.palette.error.main : theme.palette.primary.main,
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: error ? theme.palette.error.main : theme.palette.primary.main,
            borderWidth: 2,
          },
          '&.Mui-error .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.error.main,
          },
          ...sx,
        },
      }}
      InputLabelProps={{
        sx: {
          color: error ? theme.palette.error.main : theme.palette.text.secondary,
          '&.Mui-focused': {
            color: error ? theme.palette.error.main : theme.palette.primary.main,
          },
        },
      }}
      FormHelperTextProps={{
        sx: {
          mx: 0,
          color: error ? theme.palette.error.main : theme.palette.text.secondary,
          '&.Mui-error': {
            color: theme.palette.error.main,
          },
        },
      }}
      sx={{
        '& .MuiInputBase-root': {
          borderRadius: 1,
        },
        ...sx,
      }}
      {...props}
    />
  );
};

export default Input;
