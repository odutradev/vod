import { Typography, TextField, Button, Box } from '@mui/material';
import { useState, FormEvent } from 'react';
import { toast } from 'react-toastify';

import { ViewerContainer, ResultCard, FormContainer } from './styles';
import { GAME_CONSTANTS } from '@utils/constants/game';
import SecretModal from '../SecretModal';
import useGameStore from '@stores/game';

import type { GameViewerProps } from './types';

const SECRET_TRIGGER = '12345678';

interface DisplayState {
  text: string;
  number: number;
}

const GameViewer = (_props: GameViewerProps) => {
  const { game: { items } } = useGameStore();
  const [currentDisplay, setCurrentDisplay] = useState<DisplayState | null>(null);
  const [isSecretOpen, setIsSecretOpen] = useState<boolean>(false);
  const [inputNumber, setInputNumber] = useState<string>('');

  const totalItems = items.length;
  const hasItems = totalItems > 0;
  const minIndex = hasItems ? 1 : 0;

  const handleReveal = (event: FormEvent) => {
    event.preventDefault();

    if (inputNumber === SECRET_TRIGGER) {
      setIsSecretOpen(true);
      setInputNumber('');
      return;
    }

    if (!hasItems) return toast.info(GAME_CONSTANTS.ERROR_NOT_FOUND);

    const num = parseInt(inputNumber, 10);
    if (isNaN(num) || num < minIndex || num > totalItems) return toast.warning(GAME_CONSTANTS.ERROR_OUT_OF_BOUNDS);

    const found = items[num - 1];
    if (!found) {
      setCurrentDisplay(null);
      return toast.info(GAME_CONSTANTS.ERROR_NOT_FOUND);
    }

    setCurrentDisplay({ text: found.text, number: num });
    setInputNumber('');
  };

  const handleImmediateSecretReveal = (text: string, fakeNumber: number) => {
    setCurrentDisplay({ text, number: fakeNumber });
    setIsSecretOpen(false);
  };

  return (
    <ViewerContainer component="section">
      <FormContainer onSubmit={handleReveal}>
        <TextField fullWidth type="number" variant="outlined" value={inputNumber} disabled={!hasItems} onChange={(e) => setInputNumber(e.target.value)} label={hasItems ? `Digite um número de 1 a ${totalItems}` : 'Nenhum desafio disponível'} />
        <Button type="submit" variant="contained" color="primary" size="large" disabled={!hasItems}>Revelar</Button>
      </FormContainer>

      <ResultCard component="article">
        {currentDisplay ? (
          <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
            <Typography variant="h2" color="primary" sx={{ fontWeight: 900, letterSpacing: '-0.02em' }}>
              #{currentDisplay.number}
            </Typography>
            <Typography variant="h4" color="textPrimary" sx={{ fontWeight: 700, wordBreak: 'break-word', textAlign: 'center', letterSpacing: '-0.02em' }}>
              {currentDisplay.text}
            </Typography>
          </Box>
        ) : (
          <Typography variant="h6" color="textSecondary" sx={{ fontWeight: 400 }}>
            O desafio aparecerá aqui
          </Typography>
        )}
      </ResultCard>

      <SecretModal open={isSecretOpen} onClose={() => setIsSecretOpen(false)} items={items} onRevealImmediate={handleImmediateSecretReveal} />
    </ViewerContainer>
  );
};

export default GameViewer;