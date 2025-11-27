import { ThemeOptions } from "@mui/material/styles";

export const inputStyles: ThemeOptions['components'] = {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          position: 'initial',
          transform: 'none',
          fontSize: '0.875rem',
          marginBottom: '8px',
          '&.Mui-focused': {
            color: 'var(--mui-palette-primary-main)',
          },
          '&.Mui-error': {
            color: 'var(--mui-palette-error-main)',
          },
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-root': {
            borderRadius: 8,
          },
          '& .MuiFormHelperText-root': {
            marginLeft: 0,
            marginRight: 0,
            '&.Mui-error': {
              color: 'var(--mui-palette-error-main)',
            },
          },
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'var(--mui-palette-divider)',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'var(--mui-palette-primary-main)',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'var(--mui-palette-primary-main)',
            borderWidth: 2,
          },
          '&.Mui-error .MuiOutlinedInput-notchedOutline': {
            borderColor: 'var(--mui-palette-error-main)',
          },
          '&.Mui-error:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: 'var(--mui-palette-error-main)',
          },
          '&.Mui-error.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'var(--mui-palette-error-main)',
            borderWidth: 2,
          },
        }
      }
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          '& .MuiFormHelperText-root': {
            mx: 0,
          },
          '& fieldset': {
            top: 0,
          },
          '& legend': {
            display: 'none',
          }
        }
      }
    },
}