import { FC } from "react";
import Button from "../lib/components/button/Button";
import PlayerVsCpu from "../lib/components/icons/PlayerVsCpu";
import Modal from "../lib/components/Modal";

export default function Home() {
  return (
    <>
      <Modal>
        <div className="circles-wrap">
          {Array.from({ length: 4 }).map((_, i) => (
            <Circle key={i} color={i % 3 === 0 ? "red" : "yellow"} />
          ))}
        </div>

        <div className="actions">
          <Button color="yellow" size="large" href="/board">
            Player vs Player
            <PlayerVsCpu backgroundColor="yellow" color="black" />
          </Button>
          <Button color="white" size="large">
            Game rules
            <></>
          </Button>
        </div>
      </Modal>

      <style jsx>{`
        .actions {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .circles-wrap {
          margin: 0 auto;
          display: grid;
          width: min-content;
          gap: 6px;
          grid-template-columns: repeat(2, auto);
          grid-template-rows: repeat(2, auto);
          margin-bottom: 79px;
        }
      `}</style>
    </>
  );
}

export interface CircleProps {
  color: "yellow" | "red";
}

const Circle: FC<CircleProps> = (props) => {
  return (
    <>
      <div className={`circle color--${props.color}`}></div>

      <style jsx>
        {`
          .circle {
            width: 20px;
            height: 20px;
            border: 3px solid var(--color-black);
            box-shadow: 0px 2.5px 0px var(--color-black);
            border-radius: 50%;

            &.color--red {
              background-color: var(--color-red);
            }

            &.color--yellow {
              background-color: var(--color-yellow);
            }
          }
        `}
      </style>
    </>
  );
};
