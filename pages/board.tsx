import { createContext, useContext, useEffect, useRef, useState } from "react";
import Countdown from "../lib/components/board/Countdown";
import GameBoard from "../lib/components/board/GameBoard";
import { getEmptyBoard } from "../lib/components/board/helpers/board.helpers";
import ScoreCard from "../lib/components/board/ScoreCard";
import Button from "../lib/components/button/Button";
import classNames from "classnames";
import { useAudioStore } from "../lib/components/hooks/use-audio.hook";
import GlobalSounds from "../lib/components/sound/GlobalSounds";

export type TurnType = "p1" | "p2";

const useDebounce = (callback: () => any, time: number = 60) => {
  const timeoutRef = useRef<NodeJS.Timeout>();
  return () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      callback();
    }, time);
  };
};

const Board = () => {
  const [turn, setTurn] = useState<TurnType>("p1");
  const [currentSlotX, setCurrentSlotX] = useState(0);
  const [currentSlotY, setCurrentSlotY] = useState(0);
  const [board, setBoard] = useState(getEmptyBoard());
  const [winner, setWinner] = useState<TurnType | "stale">();
  const audio = useAudioStore();

  const boardProps = {
    currentSlotX,
    setCurrentSlotX,
    currentSlotY,
    setCurrentSlotY,
    turn,
    setTurn,
    board,
    setBoard,
    setWinner,
    winner,
  };

  const handleRestart = () => {
    setBoard(getEmptyBoard());
    setWinner(undefined);
    setTurn("p1");
    audio.play("clearBoard", { volume: 0.15 });
  };

  useEffect(() => {
    if (winner) audio.play("win");
  }, [winner]);

  useEffect(() => {
    if (board.every((row) => row.every((move) => !isNaN(move)))) {
      setWinner("stale");
    }
  }, [turn]);

  return (
    <>
      <GlobalSounds />
      <main>
        <header>
          <Button size="xs" color="purple">
            Menu
          </Button>
          <Button size="xs" color="purple" onClick={handleRestart}>
            Restart
          </Button>
        </header>

        <div className="board">
          <div className="board__score board__score--p1">
            <ScoreCard
              title="Player 1"
              score={10}
              icon="player-one"
              hovering={turn === "p1"}
              isWinner={winner === "p1"}
            />
          </div>

          <div className="board__board">
            <GameBoard
              {...boardProps}
              disabled={!!winner}
              onMovePlacement={() => {
                audio.play("move", { volume: 0.2 });
              }}
              onChangeHoverRow={() => {
                audio.play("click", { volume: 0.2 });
              }}
            />
          </div>

          <div className="board__score board__score-p2">
            <ScoreCard
              title="Player 2"
              score={10}
              icon="player-two"
              hovering={turn === "p2"}
              isWinner={winner === "p2"}
            />
          </div>

          <div className="board__countdown">
            <Countdown
              winner={winner}
              key={turn}
              title={`player ${turn.substring(1, 2)}'s turn`}
              color={turn === "p1" ? "red" : "yellow"}
              onCountDownEnd={() => setWinner(turn)}
              onRestart={handleRestart}
            />
          </div>
        </div>

        <footer
          className={classNames(winner === "p1" && "winner-p1", winner === "p2" && "winner-p2")}
        ></footer>
      </main>

      <style jsx>{`
        main {
          height: 100%;
          display: flex;
          flex-direction: column;
          padding: 2rem 1rem;
        }

        header {
          display: flex;
          max-width: 600px;
          width: 100%;
          margin: 0 auto;
          margin-bottom: 5rem;
          justify-content: space-between;
        }

        .board {
          position: relative;
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          grid-template-areas: "score-1 board score-2";
          gap: 4rem;
          align-items: center;
          justify-content: center;

          &__board {
            grid-area: board;
          }

          &__score-p1 {
            grid-area: score-1;
          }

          &__score-p2 {
            grid-area: score-2;
          }

          &__countdown {
            position: absolute;
            left: 50%;
            transform: translate(-50%, 65%);
            bottom: 0;
            z-index: 20;
          }
        }

        footer {
          position: fixed;
          width: 100%;
          height: 200px;
          background-color: var(--color-dark-purple);
          bottom: 0;
          left: 0;
          z-index: -1;
          border-top-left-radius: 60px;
          border-top-right-radius: 60px;

          &.winner-p1 {
            background-color: var(--color-red);
          }

          &.winner-p2 {
            background-color: var(--color-yellow);
          }
        }

        @media only screen and (max-width: 1030px) {
          .board {
            grid-template-columns: 1fr 1fr;
            grid-template-areas:
              "score-1 score-2"
              "board board";

            &__countdown {
              transform: translate(-50%, 80%);
            }
          }

          header {
            margin-bottom: 3rem;
          }
        }

        @media only screen and (max-width: 768px) {
          main {
            padding: 3rem 1rem;
          }
        }

        @media only screen and (max-width: 425px) {
          .board {
            column-gap: 2.5rem;
          }
        }
      `}</style>
    </>
  );
};

export default Board;
