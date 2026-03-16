import { Dialog, Typography, TextField, Button, IconButton } from '@mui/material';
import { Upload, Download, Close } from '@mui/icons-material';
import { ChangeEvent, useRef, useState } from 'react';

import { ContentContainer, ActionsContainer, HeaderContainer, ActionGroup, HiddenInput } from './styles';
import { GAME_CONSTANTS } from '@utils/constants/game';
import useGameStore from '@stores/game';

import type { SettingsModalProps } from './types';

const SettingsModal = ({ open, onClose }: SettingsModalProps) => {
  const { addItems, importItems, exportItems } = useGameStore();
  const [rawInput, setRawInput] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAdd = () => {
    if (!rawInput.trim()) return;
    addItems(rawInput);
    setRawInput('');
    onClose();
  };

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      importItems(e.target?.result as string);
      onClose();
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleImportClick = () => fileInputRef.current?.click();

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" PaperProps={{ sx: { borderRadius: 3, backgroundImage: 'none', border: 1, borderColor: 'divider', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.2)' } }} slotProps={{ backdrop: { sx: { backdropFilter: 'blur(4px)', backgroundColor: 'rgba(0, 0, 0, 0.4)' } } }}>
      <ContentContainer>
        <HeaderContainer component="header">
          <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: '-0.02em' }}>Configurações</Typography>
          <IconButton onClick={onClose} size="small" color="secondary">
            <Close fontSize="small" />
          </IconButton>
        </HeaderContainer>
        <TextField multiline rows={8} fullWidth variant="outlined" value={rawInput} onChange={(e) => setRawInput(e.target.value)} placeholder={GAME_CONSTANTS.DEFAULT_ARRAY_PLACEHOLDER} sx={{ '& .MuiOutlinedInput-root': { fontFamily: 'monospace', fontSize: '0.875rem', backgroundColor: 'background.default' } }} />
        <HiddenInput type="file" accept=".json" ref={fileInputRef} onChange={handleFileUpload} />
      </ContentContainer>
      <ActionsContainer component="footer">
        <ActionGroup>
          <Button onClick={handleImportClick} startIcon={<Upload />} variant="text" color="secondary" size="small">Importar</Button>
          <Button onClick={exportItems} startIcon={<Download />} variant="text" color="secondary" size="small">Exportar</Button>
        </ActionGroup>
        <ActionGroup>
          <Button onClick={onClose} color="secondary" variant="text">Cancelar</Button>
          <Button onClick={handleAdd} variant="contained" color="primary" disableElevation disabled={!rawInput.trim()}>Salvar Desafios</Button>
        </ActionGroup>
      </ActionsContainer>
    </Dialog>
  );
};

export default SettingsModal;