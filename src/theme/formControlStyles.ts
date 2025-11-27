import { ThemeOptions } from "@mui/material/styles";

export const formControlStyles: ThemeOptions['components'] = {
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
};