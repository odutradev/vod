import { Typography, TextField, Button } from '@mui/material';
import { useState, FormEvent } from 'react';
import { toast } from 'react-toastify';

import { ViewerContainer, ResultCard, FormContainer } from './styles';
import { GAME_CONSTANTS } from '@utils/constants/game';
import SecretModal from '../SecretModal';
import useGameStore from '@stores/game';

import type { GameViewerProps } from './types';

const SECRET_TRIGGER = '403919';

const GameViewer = (_props: GameViewerProps) => {
  const { game: { items } } = useGameStore();
  const [currentDisplay, setCurrentDisplay] = useState<string | null>(null);
  const [inputNumber, setInputNumber] = useState<string>('');
  const [isSecretOpen, setIsSecretOpen] = useState<boolean>(false);
  const [fakeMappings, setFakeMappings] = useState<Record<number, number>>({});

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
    if (isNaN(num)) return toast.warning(GAME_CONSTANTS.ERROR_OUT_OF_BOUNDS);

    if (fakeMappings[num] !== undefined) {
      const mappedIndex = fakeMappings[num];
      const found = items[mappedIndex];
      if (found) {
        setCurrentDisplay(found.text);
        setInputNumber('');
        return;
      }
    }

    if (num < minIndex || num > totalItems) return toast.warning(GAME_CONSTANTS.ERROR_OUT_OF_BOUNDS);

    const found = items[num - 1];
    if (!found) {
      setCurrentDisplay(null);
      return toast.info(GAME_CONSTANTS.ERROR_NOT_FOUND);
    }

    setCurrentDisplay(found.text);
    setInputNumber('');
  };

  const handleAddFakeMapping = (fakeNumber: number, realIndex: number) => setFakeMappings((prev) => ({ ...prev, [fakeNumber]: realIndex }));
  const handleRemoveFakeMapping = (fakeNumber: number) => setFakeMappings((prev) => Object.fromEntries(Object.entries(prev).filter(([key]) => Number(key) !== fakeNumber)));

  return (
    <ViewerContainer component="section">
      <FormContainer onSubmit={handleReveal}>
        <TextField fullWidth type="number" variant="outlined" value={inputNumber} disabled={!hasItems} onChange={(e) => setInputNumber(e.target.value)} inputProps={{ min: minIndex }} label={hasItems ? `Digite um número (${minIndex} a ${totalItems})` : 'Nenhum desafio disponível'} />
        <Button type="submit" variant="contained" color="primary" size="large" disabled={!hasItems}>Revelar</Button>
      </FormContainer>
      <ResultCard component="article">
        <Typography variant={currentDisplay ? "h3" : "h6"} color={currentDisplay ? 'textPrimary' : 'textSecondary'} sx={{ fontWeight: currentDisplay ? 800 : 400, wordBreak: 'break-word', letterSpacing: '-0.02em' }}>
          {currentDisplay ?? 'O desafio aparecerá aqui'}
        </Typography>
      </ResultCard>

      <SecretModal open={isSecretOpen} onClose={() => setIsSecretOpen(false)} items={items} fakeMappings={fakeMappings} onAddMapping={handleAddFakeMapping} onRemoveMapping={handleRemoveFakeMapping} />
    </ViewerContainer>
  );
};

export default GameViewer;