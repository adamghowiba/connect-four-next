import create from "zustand";

export type Sounds = "click" | "win" | "move" | "clearBoard";

export type AudioStore = {
  [k in `${Sounds}AudioElement`]: HTMLAudioElement | null;
};

export const audioStore = create<AudioStore>((set, get) => ({
  clickAudioElement: null,
  winAudioElement: null,
  moveAudioElement: null,
  clearBoardAudioElement: null
}));
