import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const ActionsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(1),
  padding: theme.spacing(2),
  paddingTop: 0,
}));

export const ContentContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  marginTop: theme.spacing(2),
}));

export const HiddenInput = styled('input')({
  display: 'none',
});

export const Spacer = styled('div')({
  flexGrow: 1,
});