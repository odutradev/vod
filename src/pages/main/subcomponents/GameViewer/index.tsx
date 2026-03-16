import { Typography, TextField, Button } from '@mui/material';
import { useState, FormEvent } from 'react';
import { toast } from 'react-toastify';

import { ViewerContainer, ResultCard, FormContainer } from './styles';
import { GAME_CONSTANTS } from '@utils/constants/game';
import useGameStore from '@stores/game';

import type { GameViewerProps } from './types';

const GameViewer = (_props: GameViewerProps) => {
  const { game: { items } } = useGameStore();
  const [inputNumber, setInputNumber] = useState<string>('');
  const [currentDisplay, setCurrentDisplay] = useState<string | null>(null);

  const handleReveal = (event: FormEvent) => {
    event.preventDefault();
    const num = parseInt(inputNumber, 10);
    if (isNaN(num) || num < GAME_CONSTANTS.MIN_ID || num > GAME_CONSTANTS.MAX_ID) {
      toast.warning(GAME_CONSTANTS.ERROR_OUT_OF_BOUNDS);
      return;
    }
    const found = items.find((item) => item.id === num);
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
          onChange={(e) => setInputNumber(e.target.value)}
          label={`Digite um número (${GAME_CONSTANTS.MIN_ID} a ${GAME_CONSTANTS.MAX_ID})`}
          inputProps={{ min: GAME_CONSTANTS.MIN_ID, max: GAME_CONSTANTS.MAX_ID }}
        />
        <Button type="submit" variant="contained" color="primary" size="large">
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