import { audioStore as zAudioStore, Sounds } from "../../stores/sound.store";

interface PlayAudioParams {
  fromStart: boolean;
  volume: number;
}

export const useAudioStore = () => {
  const audioStore = zAudioStore();

  const play = async (sound: Sounds, params?: Partial<PlayAudioParams>) => {
    const audioElement = audioStore[`${sound}AudioElement`];
    if (!audioElement) return;

    const PARAMS: PlayAudioParams = { fromStart: true, volume: 1, ...params };

    if (PARAMS.fromStart) audioElement.currentTime = 0;
    audioElement.volume = PARAMS.volume;
    return audioElement.play();
  };

  const pause = (sound: Sounds) => {
    const audioElement = audioStore[`${sound}AudioElement`];
    if (!audioElement) return;

    return audioElement.pause();
  };

  return {
    play,
    pause,
  };
};
