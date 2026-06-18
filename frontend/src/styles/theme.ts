import { createTheme } from '@mui/material/styles';

export const journalTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#7d6b57',
      contrastText: '#fffdf8',
    },
    secondary: {
      main: '#b66878',
      contrastText: '#fffdf8',
    },
    background: {
      default: '#f7f0e6',
      paper: '#fffaf1',
    },
    text: {
      primary: '#342c28',
      secondary: '#6d625b',
    },
    success: {
      main: '#6f8d74',
    },
  },
  typography: {
    fontFamily: '"Inter", "Segoe UI", sans-serif',
    h1: {
      fontFamily: '"Georgia", serif',
      fontWeight: 700,
    },
    h2: {
      fontFamily: '"Georgia", serif',
      fontWeight: 700,
    },
    h3: {
      fontFamily: '"Georgia", serif',
      fontWeight: 700,
    },
    button: {
      textTransform: 'none',
      fontWeight: 700,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
});
