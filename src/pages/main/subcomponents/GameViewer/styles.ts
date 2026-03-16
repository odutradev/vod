import { styled } from '@mui/material/styles';
import { Paper, Box } from '@mui/material';

export const ViewerContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(4),
  height: '100%',
}));

export const FormContainer = styled('form')(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  width: '100%',
  maxWidth: '600px',
  alignSelf: 'center',
}));

export const ResultCard = styled(Paper)(({ theme }) => ({
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(6),
  borderRadius: theme.spacing(3),
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
  boxShadow: 'none',
  overflow: 'auto',
}));