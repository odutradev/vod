import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#09090b' },
    secondary: { main: '#71717a' },
    background: { default: '#fafafa', paper: '#ffffff' },
    divider: '#e4e4e7',
  },
  shape: { borderRadius: 16 },
  typography: { fontFamily: 'Inter, system-ui, sans-serif' },
  components: {
    MuiButton: { styleOverrides: { root: { textTransform: 'none', fontWeight: 600, padding: '0.75rem 1.5rem', boxShadow: 'none' } } },
    MuiPaper: { styleOverrides: { root: { backgroundImage: 'none' } } },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#fafafa' },
    secondary: { main: '#a1a1aa' },
    background: { default: '#09090b', paper: '#18181b' },
    divider: '#27272a',
  },
  shape: { borderRadius: 16 },
  typography: { fontFamily: 'Inter, system-ui, sans-serif' },
  components: {
    MuiButton: { styleOverrides: { root: { textTransform: 'none', fontWeight: 600, padding: '0.75rem 1.5rem', boxShadow: 'none' } } },
    MuiPaper: { styleOverrides: { root: { backgroundImage: 'none' } } },
  },
});