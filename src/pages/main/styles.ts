import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

export const MainContainer = styled('main')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  minHeight: '100vh',
  padding: theme.spacing(4),
  backgroundColor: theme.palette.background.default,
}));

export const Header = styled('header')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  maxWidth: '600px',
  marginBottom: theme.spacing(6),
}));

export const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: theme.palette.primary.main,
}));