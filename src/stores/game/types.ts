export interface GameItem {
  id: number;
  text: string;
}

export interface GameStoreData {
  items: GameItem[];
}

export interface GameStore {
  game: GameStoreData;
  addItems: (raw: string) => void;
  importItems: (raw: string) => void;
  exportItems: () => void;
}