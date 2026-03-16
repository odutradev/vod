import { persist, createJSONStorage } from "zustand/middleware";
import { toast } from "react-toastify";
import { create } from "zustand";

import { gameStoreDefaultValues } from "./defaultValues";
import { GAME_CONSTANTS } from "@utils/constants/game";

import type { GameStore, GameItem } from "./types";

const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      game: gameStoreDefaultValues,
      addItems: (raw: string) => {
        try {
          const parsed = JSON.parse(raw);
          if (!Array.isArray(parsed)) throw new Error(GAME_CONSTANTS.ERROR_INVALID_JSON);
          const currentTexts = get().game.items.map((item) => item.text);
          const mergedTexts = [...currentTexts, ...parsed];
          const shuffled = [...mergedTexts].sort(() => Math.random() - 0.5);
          const newItems: GameItem[] = shuffled.map((text, index) => ({ id: index, text }));
          set({ game: { items: newItems } });
          toast.success(GAME_CONSTANTS.SUCCESS_ADDED);
        } catch {
          toast.error(GAME_CONSTANTS.ERROR_INVALID_JSON);
        }
      },
      importItems: (raw: string) => {
        try {
          const parsed = JSON.parse(raw);
          if (!Array.isArray(parsed)) throw new Error(GAME_CONSTANTS.ERROR_INVALID_JSON);
          const isValid = parsed.every((item: unknown) => {
            if (typeof item !== 'object' || item === null) return false;
            const obj = item as Record<string, unknown>;
            return typeof obj.id === 'number' && typeof obj.text === 'string';
          });
          if (!isValid) throw new Error(GAME_CONSTANTS.ERROR_INVALID_JSON);
          set({ game: { items: parsed as GameItem[] } });
          toast.success(GAME_CONSTANTS.SUCCESS_IMPORTED);
        } catch {
          toast.error(GAME_CONSTANTS.ERROR_INVALID_JSON);
        }
      },
      exportItems: () => {
        const items = get().game.items;
        const blob = new Blob([JSON.stringify(items, null, 2)], { type: GAME_CONSTANTS.EXPORT_MIME_TYPE });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = GAME_CONSTANTS.EXPORT_FILE_NAME;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }
    }),
    {
      name: "game-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useGameStore;