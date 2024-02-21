import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#892912',
    },
    secondary: {
      main: '#e4915e',
    },
    background: {
      default: '#171717',
    },
  },
  // shadows: ['none', '0px 2px 4px rgba(0, 0, 0, 0.2)'], // Add shadows
  
  shadows: [
    'none',
    '0px 2px 4px rgba(0, 0, 0, 0.2)', // Existing shadow
    // Add your additional shadows here
    '0px 4px 6px rgba(0, 0, 0, 0.3)', // Example of an additional shadow
    '0px 8px 12px rgba(0, 0, 0, 0.4)', // Example of another additional shadow
    '0px 8px 12px rgba(0, 0, 0, 0.4)', // Example of another additional shadow
    '0px 8px 12px rgba(0, 0, 0, 0.4)', // Example of another additional shadow
    '0px 8px 12px rgba(0, 0, 0, 0.4)', // Example of another additional shadow
    '0px 8px 12px rgba(0, 0, 0, 0.4)', // Example of another additional shadow
    '0px 8px 12px rgba(0, 0, 0, 0.4)', // Example of another additional shadow
    '0px 8px 12px rgba(0, 0, 0, 0.4)', // Example of another additional shadow
    '0px 8px 12px rgba(0, 0, 0, 0.4)', // Example of another additional shadow
    '0px 8px 12px rgba(0, 0, 0, 0.4)', // Example of another additional shadow
    '0px 8px 12px rgba(0, 0, 0, 0.4)', // Example of another additional shadow
    '0px 8px 12px rgba(0, 0, 0, 0.4)', // Example of another additional shadow
    '0px 8px 12px rgba(0, 0, 0, 0.4)', // Example of another additional shadow
    '0px 8px 12px rgba(0, 0, 0, 0.4)', // Example of another additional shadow
    '0px 8px 12px rgba(0, 0, 0, 0.4)', // Example of another additional shadow
    '0px 8px 12px rgba(0, 0, 0, 0.4)', // Example of another additional shadow
    '0px 8px 12px rgba(0, 0, 0, 0.4)', // Example of another additional shadow
    '0px 8px 12px rgba(0, 0, 0, 0.4)', // Example of another additional shadow
    '0px 8px 12px rgba(0, 0, 0, 0.4)', // Example of another additional shadow
    '0px 8px 12px rgba(0, 0, 0, 0.4)', // Example of another additional shadow
    '0px 8px 12px rgba(0, 0, 0, 0.4)', // Example of another additional shadow
    '0px 8px 12px rgba(0, 0, 0, 0.4)', // Example of another additional shadow
    '0px 8px 12px rgba(0, 0, 0, 0.4)', // Example of another additional shadow
    '0px 8px 12px rgba(0, 0, 0, 0.4)', // Example of another additional shadow
    '0px 8px 12px rgba(0, 0, 0, 0.4)', // Example of another additional shadow
    '0px 8px 12px rgba(0, 0, 0, 0.4)', // Example of another additional shadow
    '0px 8px 12px rgba(0, 0, 0, 0.4)', // Example of another additional shadow
    '0px 8px 12px rgba(0, 0, 0, 0.4)', // Example of another additional shadow
    '0px 8px 12px rgba(0, 0, 0, 0.4)', // Example of another additional shadow
    '0px 8px 12px rgba(0, 0, 0, 0.4)', // Example of another additional shadow
    '0px 8px 12px rgba(0, 0, 0, 0.4)', // Example of another additional shadow
    // Add more shadow values as needed
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)', // Add shadow to Paper
          border: '1px solid #ccc', // Add a border to separate elements
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

export default theme;
