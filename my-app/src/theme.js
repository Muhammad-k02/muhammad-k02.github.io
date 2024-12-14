import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: '"Montserrat", sans-serif',
    h1: {
      fontFamily: '"Montserrat", sans-serif',
    },
    h2: {
      fontFamily: '"Montserrat", sans-serif',
    },
    h3: {
      fontFamily: '"Montserrat", sans-serif',
    },
    h4: {
      fontFamily: '"Montserrat", sans-serif',
    },
    h5: {
      fontFamily: '"Montserrat", sans-serif',
    },
    h6: {
      fontFamily: '"Montserrat", sans-serif',
    },
    body1: {
      fontFamily: '"Montserrat", sans-serif',
    },
    body2: {
      fontFamily: '"Montserrat", sans-serif',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: '"Montserrat", sans-serif',
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
          fontFamily: '"Montserrat", sans-serif',
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
          fontFamily: '"Montserrat", sans-serif',
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
          fontFamily: '"Montserrat", sans-serif',
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
