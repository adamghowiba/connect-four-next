import React, { FC, ReactElement, useEffect, useRef } from "react";
import PlayerOne from "../icons/PlayerOne";
import PlayerTwo from "../icons/PlayerTwo";
import classNames from "classnames";
import party from "party-js";

interface ScoreCardProps {
  score: number;
  title: string;
  icon: "player-one" | "player-two";
  hovering?: boolean;
  isWinner?: boolean;
}

const ScoreCard: FC<ScoreCardProps> = (props) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const PLAYER_ICONS: Record<ScoreCardProps["icon"], FC<any>> = {
    "player-one": PlayerOne,
    "player-two": PlayerTwo,
  };

  useEffect(() => {
    if (props.isWinner) party.confetti(cardRef.current, {count: 60});
  }, [props.isWinner]);

  return (
    <>
      <div className={classNames("card", props.hovering && "hovering")} ref={cardRef}>
        <div className="icon">{React.createElement(PLAYER_ICONS[props.icon])}</div>
        <h3 className="card__title">{props.title}</h3>
        <h1>{props.score}</h1>
      </div>

      <style jsx>{`
        .card {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 17px 27px;
          padding-top: 45px;
          background-color: #ffffff;
          border: 3px solid var(--color-black);
          box-shadow: 0px 10px 0px var(--color-black);
          color: var(--color-black);
          border-radius: 20px;
          position: relative;
          transition: transform 0.25s linear;

          &.hovering {
            animation: 1.3s infinite float;
            animation-timing-function: ease-in-out;
          }

          &__title {
            text-transform: uppercase;
          }
        }

        @keyframes float {
          0% {
            transform: translateY(0px);
          }

          50% {
            transform: translateY(-5px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        .icon {
          position: absolute;
          top: 0;
          transform: translateY(-40%);
        }
      `}</style>
    </>
  );
};

ScoreCard.defaultProps = {
  icon: "player-one",
  hovering: false,
  isWinner: false,
};

export default ScoreCard;
