import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const HeaderContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(3),
}));

export const ActionsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(2, 3),
  borderTop: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.default,
}));

export const ActionGroup = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
}));

export const ContentContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(3),
}));

export const HiddenInput = styled('input')({
  display: 'none',
});