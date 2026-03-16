import type { GameItem } from '@stores/game/types';

export interface SecretModalProps {
  open: boolean;
  onClose: () => void;
  items: GameItem[];
  onRevealImmediate: (text: string, fakeNumber: number) => void;
}