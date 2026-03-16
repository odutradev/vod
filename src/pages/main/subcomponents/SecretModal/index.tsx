import { Dialog, Typography, IconButton, TextField, Button, ListItem, ListItemText, MenuItem, Select } from '@mui/material';
import { Close as CloseIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useState } from 'react';

import { ModalContainer, HeaderContainer, FormContainer, ItemsList } from './styles';

import type { SecretModalProps } from './types';

const SecretModal = ({ open, onClose, items, fakeMappings, onAddMapping, onRemoveMapping }: SecretModalProps) => {
  const [fakeNum, setFakeNum] = useState<string>('');
  const [selectedIndex, setSelectedIndex] = useState<string>('');

  const handleSave = () => {
    if (!fakeNum || !selectedIndex) return;
    onAddMapping(Number(fakeNum), Number(selectedIndex));
    setFakeNum('');
    setSelectedIndex('');
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <ModalContainer>
        <HeaderContainer>
          <Typography variant="h6">Painel de Manipulação Secreto</Typography>
          <IconButton onClick={onClose}><CloseIcon /></IconButton>
        </HeaderContainer>

        <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>Adicionar Número Falso</Typography>
        <FormContainer>
          <TextField label="Número Falso" type="number" value={fakeNum} onChange={(e) => setFakeNum(e.target.value)} size="small" />
          <Select value={selectedIndex} onChange={(e) => setSelectedIndex(e.target.value)} displayEmpty size="small" fullWidth>
            <MenuItem value="" disabled>Selecione a Pergunta Real</MenuItem>
            {items.map((item, index) => (
              <MenuItem key={item.id} value={index}>[{index + 1}] {item.text}</MenuItem>
            ))}
          </Select>
          <Button variant="contained" onClick={handleSave} disableElevation>Salvar</Button>
        </FormContainer>

        <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>Mapeamentos Ativos</Typography>
        <ItemsList>
          {Object.entries(fakeMappings).map(([fake, realIdx]) => (
            <ListItem key={fake} secondaryAction={<IconButton edge="end" onClick={() => onRemoveMapping(Number(fake))}><DeleteIcon /></IconButton>}>
              <ListItemText primary={`Número Mapeado: ${fake}`} secondary={`Vai revelar a pergunta [${Number(realIdx) + 1}]: ${items[Number(realIdx)]?.text}`} />
            </ListItem>
          ))}
          {Object.keys(fakeMappings).length === 0 && (
            <ListItem><ListItemText primary="Nenhum mapeamento falso ativo no momento." /></ListItem>
          )}
        </ItemsList>

        <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>Gabarito Original</Typography>
        <ItemsList>
          {items.map((item, index) => (
            <ListItem key={item.id}>
              <ListItemText primary={`Número Real: ${index + 1}`} secondary={item.text} />
            </ListItem>
          ))}
        </ItemsList>
      </ModalContainer>
    </Dialog>
  );
};

export default SecretModal;