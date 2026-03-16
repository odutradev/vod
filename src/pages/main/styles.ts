import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';

export const MainContainer = styled('main')(({ theme }) => ({
  width: '100vw',
  height: '100dvh',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette.background.default,
}));

export const Header = styled('header')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(2, 4),
  borderBottom: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
}));

export const ContentWrapper = styled('section')(({ theme }) => ({
  flex: 1,
  display: 'flex',
  padding: theme.spacing(4),
  overflow: 'hidden',
}));

export const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  letterSpacing: '-0.02em',
  color: theme.palette.text.primary,
}));