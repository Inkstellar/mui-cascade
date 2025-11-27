import { ThemeOptions } from "@mui/material/styles";

export const textFieldStyles: ThemeOptions['components'] = {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiFormHelperText-root': {
            marginLeft: 0,
            marginRight: 0,
          },
        }
      }
    },
};