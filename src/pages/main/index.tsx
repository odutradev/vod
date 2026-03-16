import { Settings as SettingsIcon } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useState } from 'react';

import { MainContainer, Header, ContentWrapper, Title } from './styles';
import SettingsModal from './subcomponents/SettingsModal';
import GameViewer from './subcomponents/GameViewer';

const Main = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleOpenSettings = () => setIsSettingsOpen(true);
  const handleCloseSettings = () => setIsSettingsOpen(false);

  return (
    <MainContainer>
      <Header>
        <Title variant="h5">VoD</Title>
        <IconButton onClick={handleOpenSettings} color="primary">
          <SettingsIcon />
        </IconButton>
      </Header>
      <ContentWrapper>
        <GameViewer />
      </ContentWrapper>
      <SettingsModal open={isSettingsOpen} onClose={handleCloseSettings} />
    </MainContainer>
  );
};

export default Main;