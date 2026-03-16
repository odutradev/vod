import type { GameItem } from '@stores/game/types';

export interface SecretModalProps {
  open: boolean;
  onClose: () => void;
  items: GameItem[];
  fakeMappings: Record<number, number>;
  onAddMapping: (fakeNumber: number, realIndex: number) => void;
  onRemoveMapping: (fakeNumber: number) => void;
}