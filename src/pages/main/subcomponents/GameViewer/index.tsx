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
    if (!hasItems) return toast.info(GAME_CONSTANTS.ERROR_NOT_FOUND);
    const num = parseInt(inputNumber, 10);
    if (isNaN(num) || num < minIndex || num > totalItems) return toast.warning(GAME_CONSTANTS.ERROR_OUT_OF_BOUNDS);
    const found = items[num - 1];
    if (!found) {
      setCurrentDisplay(null);
      return toast.info(GAME_CONSTANTS.ERROR_NOT_FOUND);
    }
    setCurrentDisplay(found.text);
  };

  return (
    <ViewerContainer component="section">
      <FormContainer onSubmit={handleReveal}>
        <TextField fullWidth type="number" variant="outlined" value={inputNumber} disabled={!hasItems} onChange={(e) => setInputNumber(e.target.value)} inputProps={{ min: minIndex, max: totalItems }} label={hasItems ? `Digite um número (${minIndex} a ${totalItems})` : 'Nenhum desafio disponível'} />
        <Button type="submit" variant="contained" color="primary" size="large" disabled={!hasItems}>Revelar</Button>
      </FormContainer>
      <ResultCard component="article">
        <Typography variant={currentDisplay ? "h3" : "h6"} color={currentDisplay ? 'textPrimary' : 'textSecondary'} sx={{ fontWeight: currentDisplay ? 800 : 400, wordBreak: 'break-word', letterSpacing: '-0.02em' }}>
          {currentDisplay ?? 'O desafio aparecerá aqui'}
        </Typography>
      </ResultCard>
    </ViewerContainer>
  );
};

export default GameViewer;