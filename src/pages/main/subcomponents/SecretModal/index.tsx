import { Dialog, Typography, IconButton, TextField, ListItem, ListItemText, Button } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { useState } from 'react';

import { ModalContainer, HeaderContainer, ItemsList } from './styles';

import type { SecretModalProps } from './types';

const SecretModal = ({ open, onClose, items, onRevealImmediate }: SecretModalProps) => {
  const [fakeNumbers, setFakeNumbers] = useState<Record<number, string>>({});

  const handleReveal = (index: number, text: string) => {
    const fakeNum = fakeNumbers[index];
    if (!fakeNum || isNaN(Number(fakeNum))) return toast.warning('Informe um número falso válido para revelar.');
    onRevealImmediate(text, Number(fakeNum));
    setFakeNumbers({});
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <ModalContainer>
        <HeaderContainer>
          <Typography variant="h6" sx={{ fontWeight: 800 }}>Painel Secreto de Revelação</Typography>
          <IconButton onClick={onClose} size="small"><CloseIcon /></IconButton>
        </HeaderContainer>

        <ItemsList>
          {items.map((item, index) => (
            <ListItem key={item.id} sx={{ gap: 2 }}>
              <ListItemText primary={`[Real: ${index + 1}] ${item.text}`} />
              <TextField
                type="number"
                size="small"
                placeholder="Nº Falso"
                value={fakeNumbers[index] ?? ''}
                onChange={(e) => setFakeNumbers((prev) => ({ ...prev, [index]: e.target.value }))}
                sx={{ width: '120px' }}
              />
              <Button
                variant="contained"
                color="primary"
                disableElevation
                onClick={() => handleReveal(index, item.text)}
              >
                Revelar
              </Button>
            </ListItem>
          ))}
          {items.length === 0 && (
            <ListItem>
              <ListItemText primary="Nenhum desafio cadastrado no jogo ainda." />
            </ListItem>
          )}
        </ItemsList>
      </ModalContainer>
    </Dialog>
  );
};

export default SecretModal;