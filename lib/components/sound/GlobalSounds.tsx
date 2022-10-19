import React, { FC, useRef, useEffect } from "react";
import { audioStore as zAudioStore } from "../../stores/sound.store";


interface GlobalSoundsProps {}

const GlobalSounds: FC<GlobalSoundsProps> = (props) => {
  const audioStore = zAudioStore();
  const clickAudioRef = useRef<HTMLAudioElement>(null);
  const winAudioRef = useRef<HTMLAudioElement>(null);
  const moveAudioRef = useRef<HTMLAudioElement>(null);
  const clearBoardAudioRef = useRef<HTMLAudioElement>(null);


  useEffect(() => {
    audioStore.clickAudioElement = clickAudioRef.current;
    audioStore.winAudioElement = winAudioRef.current;
    audioStore.moveAudioElement = moveAudioRef.current;
    audioStore.clearBoardAudioElement = clearBoardAudioRef.current;
  }, [clickAudioRef.current, winAudioRef.current]);

  return (
    <>
      <audio src="/sounds/click.mp3" ref={clickAudioRef}></audio>
      <audio src="/sounds/success.mp3" ref={winAudioRef}></audio>
      <audio src="/sounds/move.mp3" ref={moveAudioRef}></audio>
      <audio src="/sounds/clear_board.mp3" ref={clearBoardAudioRef}></audio>

      <style jsx>{``}</style>
    </>
  );
};

GlobalSounds.defaultProps = {};

export default GlobalSounds;
