import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          transition: 'none',
          '&:hover': {
            backgroundColor: 'transparent',
            boxShadow: 'none',
            transform: 'none',
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          transition: 'none',
          '&:hover': {
            backgroundColor: 'transparent',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          transition: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          transition: 'none',
          '&:hover': {
            textDecoration: 'none',
            backgroundColor: 'transparent',
          },
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          transition: 'none',
          '&:hover': {
            backgroundColor: 'transparent',
          },
        },
      },
    },
  },
  transitions: {
    duration: {
      shortest: 0,
      shorter: 0,
      short: 0,
      standard: 0,
      complex: 0,
      enteringScreen: 0,
      leavingScreen: 0,
    },
  },
  palette: {
    mode: 'dark',
  },
});

export default theme;
