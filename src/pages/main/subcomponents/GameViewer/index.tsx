import { Typography, TextField, Button } from '@mui/material';
import { useState, FormEvent } from 'react';
import { toast } from 'react-toastify';

import { ViewerContainer, ResultCard, FormContainer } from './styles';
import { GAME_CONSTANTS } from '@utils/constants/game';
import useGameStore from '@stores/game';

import type { GameViewerProps } from './types';

const GameViewer = (_props: GameViewerProps) => {
  const { game: { items } } = useGameStore();
  const [currentDisplay, setCurrentDisplay] = useState<string | null>(null);
  const [inputNumber, setInputNumber] = useState<string>('');

  const totalItems = items.length;
  const hasItems = totalItems > 0;
  const minIndex = hasItems ? 1 : 0;

  const handleReveal = (event: FormEvent) => {
    event.preventDefault();

    if (!hasItems) {
      toast.info(GAME_CONSTANTS.ERROR_NOT_FOUND);
      return;
    }

    const num = parseInt(inputNumber, 10);

    if (isNaN(num) || num < minIndex || num > totalItems) {
      toast.warning(GAME_CONSTANTS.ERROR_OUT_OF_BOUNDS);
      return;
    }

    const targetIndex = num - 1;
    const found = items[targetIndex];

    if (!found) {
      toast.info(GAME_CONSTANTS.ERROR_NOT_FOUND);
      setCurrentDisplay(null);
      return;
    }

    setCurrentDisplay(found.text);
  };

  return (
    <ViewerContainer component="section">
      <FormContainer onSubmit={handleReveal}>
        <TextField
          fullWidth
          type="number"
          variant="outlined"
          value={inputNumber}
          disabled={!hasItems}
          onChange={(e) => setInputNumber(e.target.value)}
          inputProps={{ min: minIndex, max: totalItems }}
          label={hasItems ? `Digite um número (${minIndex} a ${totalItems})` : 'Nenhum desafio disponível'}
        />
        <Button type="submit" variant="contained" color="primary" size="large" disabled={!hasItems}>
          Revelar
        </Button>
      </FormContainer>
      <ResultCard elevation={3} component="article">
        <Typography variant="h5" color={currentDisplay ? 'textPrimary' : 'textSecondary'}>
          {currentDisplay ?? 'O desafio aparecerá aqui'}
        </Typography>
      </ResultCard>
    </ViewerContainer>
  );
};

export default GameViewer;