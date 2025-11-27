import { ThemeOptions } from "@mui/material/styles";

export const paperStyles: ThemeOptions['components'] = {
     MuiPaper: { 
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
        elevation1: {
          boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        },
      },
    }
}