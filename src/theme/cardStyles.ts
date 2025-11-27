import { ThemeOptions } from "@mui/material/styles";

export const cardStyles: ThemeOptions['components'] = {
     MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          border: '1px solid',
          borderColor: '#e4e4e7',
          boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        },
      },
    },
};