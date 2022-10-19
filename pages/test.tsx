import { FC, useEffect, useRef } from "react";
import party from "party-js";
import GlobalSounds from "../lib/components/sound/GlobalSounds";
import { useAudioStore } from "../lib/components/hooks/use-audio.hook";

interface TestProps {}

const Test: FC<TestProps> = (props) => {
  const blockRef = useRef<HTMLDivElement>(null);
  const audioStore = useAudioStore();

  return (
    <>
      <GlobalSounds />
      <div className="wrapper">
        <div
          className="block"
          ref={blockRef}
          onClick={() => {
            console.log(audioStore.play("win", {fromStart: true}));
          }}
        ></div>
      </div>

      <style jsx>{`
        nav {
          background-color: var(--color-dark-purple);
          padding: 1rem;
          cursor: pointer;
        }
        .block {
          margin: 10rem;
          width: 100px;
          height: 100px;
          background-color: white;
        }
      `}</style>
    </>
  );
};

export default Test;
