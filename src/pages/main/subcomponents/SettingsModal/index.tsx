import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import { ChangeEvent, useRef, useState } from 'react';

import { ContentContainer, ActionsContainer, HiddenInput, Spacer } from './styles';
import { GAME_CONSTANTS } from '@utils/constants/game';
import useGameStore from '@stores/game';

import type { SettingsModalProps } from './types';

const SettingsModal = ({ open, onClose }: SettingsModalProps) => {
  const { addItems, importItems, exportItems } = useGameStore();
  const [rawInput, setRawInput] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAdd = () => {
    addItems(rawInput);
    setRawInput('');
    onClose();
  };

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      importItems(content);
      onClose();
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Gerenciar Desafios</DialogTitle>
      <DialogContent>
        <ContentContainer>
          <TextField
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            value={rawInput}
            onChange={(e) => setRawInput(e.target.value)}
            placeholder={GAME_CONSTANTS.DEFAULT_ARRAY_PLACEHOLDER}
            label="Adicionar Array de Desafios"
          />
          <HiddenInput
            type="file"
            accept=".json"
            ref={fileInputRef}
            onChange={handleFileUpload}
          />
        </ContentContainer>
      </DialogContent>
      <DialogActions component={ActionsContainer}>
        <Button onClick={handleImportClick} variant="outlined" color="secondary">
          Importar JSON
        </Button>
        <Button onClick={exportItems} variant="outlined" color="primary">
          Exportar JSON
        </Button>
        <Spacer />
        <Button onClick={onClose} color="inherit">
          Cancelar
        </Button>
        <Button onClick={handleAdd} variant="contained" color="primary" disabled={!rawInput.trim()}>
          Adicionar e Embaralhar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SettingsModal;