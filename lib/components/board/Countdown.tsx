import React, { FC, useEffect, useRef, useState } from "react";
import { TurnType, WinType } from "../../../pages/board";
import Button from "../button/Button";
import CountdownLayer from "./CountdownLayer";

interface CountdownProps {
  title: string;
  startingSeconds?: number;
  color: "red" | "yellow";
  winner?: WinType;
  onRestart?: () => void;
  onCountDownEnd?: () => void;
}

const Countdown: FC<CountdownProps> = (props) => {
  const [timer, setTimer] = useState(props.startingSeconds);
  const intervalRef = useRef<any>();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimer((timer) => timer && timer - 1);
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [props.winner]);

  useEffect(() => {
    if (timer === 0) {
      clearInterval(intervalRef.current);
      props.onCountDownEnd && props.onCountDownEnd();
    }
  }, [timer]);

  useEffect(() => {
    if (!props.winner) return;
    clearInterval(intervalRef.current);
    setTimer(props.startingSeconds);
  }, [props.winner]);

  if (props.winner)
    return (
      <>
        <div className="card">
          {(() => {
            if (props.winner === "stale")
              return (
                <>
                  <h3>IT'S A STALE-MATE</h3>
                </>
              );

            return (
              <>
                <h3>PLAYER {props.winner.substring(1, 2)}</h3>
                <h1>WINS</h1>
              </>
            );
          })()}

          <Button size="xs" color="purple" onClick={props.onRestart}>
            Play Again
          </Button>
        </div>
        <style jsx>
          {`
            .card {
              width: 285px;
              padding: 1rem;
              background-color: var(--color-white);
              position: relative;
              display: flex;
              gap: 12px;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              color: var(--color-black);
              border: 3px solid var(--color-black);
              box-shadow: 0px 10px 0px var(--color-black);
              border-radius: 20px;
            }
          `}
        </style>
      </>
    );

  return (
    <>
      <div className={`countdown color--${props.color}`}>
        <div className="info">
          <h4 className="info__title">{props.title}</h4>
          <h1 className="info__time">{timer}s</h1>
        </div>

        <div className="countdown__layer">
          <CountdownLayer color={props.color} />
        </div>
      </div>

      <style jsx>{`
        .countdown {
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          width: 199px;
          height: 175px;

          &__layer {
            z-index: -1;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            position: absolute;
          }

          &.color--yellow {
            color: var(--color-black);
          }

          &.color--red {
            color: var(--color-white);
          }
        }

        .info {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-top: 12px;

          &__title {
            text-transform: uppercase;
          }
        }

        @media only screen and (max-width: 768px) {
          .countdown {
            
          }
        }
      `}</style>
    </>
  );
};

Countdown.defaultProps = {
  startingSeconds: 30,
};

export default Countdown;
