import { Settings as SettingsIcon } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useState } from 'react';

import SettingsModal from './subcomponents/SettingsModal';
import GameViewer from './subcomponents/GameViewer';
import { MainContainer, Header, Title } from './styles';

const Main = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleOpenSettings = () => setIsSettingsOpen(true);
  const handleCloseSettings = () => setIsSettingsOpen(false);

  return (
    <MainContainer>
      <Header>
        <Title variant="h4">VoD</Title>
        <IconButton onClick={handleOpenSettings} color="primary" aria-label="Configurações">
          <SettingsIcon />
        </IconButton>
      </Header>
      <GameViewer />
      <SettingsModal open={isSettingsOpen} onClose={handleCloseSettings} />
    </MainContainer>
  );
};

export default Main;