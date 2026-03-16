import { styled } from '@mui/material/styles';
import { Paper, Box } from '@mui/material';

export const ViewerContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(4),
  width: '100%',
  maxWidth: '600px',
}));

export const FormContainer = styled('form')(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  width: '100%',
}));

export const ResultCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  width: '100%',
  minHeight: '200px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius * 2,
}));