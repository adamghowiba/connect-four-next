import { MouseEvent } from "react";
import { useState } from "react";
import { Dispatch, FC, MouseEventHandler, SetStateAction, useEffect, useRef } from "react";
import { TurnType, WinType } from "../../../pages/board";
import Marker from "../icons/Marker";
import BoardLayer from "./BoardLayer";
import BoardPiece from "./BoardPiece";
import {
  getCeilingValue,
  getClosestAvailableSpot,
  isSlotAlreadyPlaced,
} from "./helpers/board.helpers";
import { checkWin } from "./helpers/board-win.helpers";

export interface MoveLocation {
  x: number;
  y: number;
}

export interface MovePosition {
  top: number;
  left: number;
}

interface BoardProps {
  currentSlotX: number;
  setCurrentSlotX: Dispatch<SetStateAction<number>>;
  currentSlotY: number;
  setCurrentSlotY: Dispatch<SetStateAction<number>>;
  board: Board;
  setBoard: Dispatch<SetStateAction<Board>>;
  turn: TurnType;
  setTurn: Dispatch<SetStateAction<TurnType>>;
  disabled?: boolean;
  winner: WinType | undefined;
  setWinner: Dispatch<SetStateAction<WinType | undefined>>;
  onChangeHoverRow?: (row: number) => void;
  onMovePlacement?: (spot: MoveLocation, board: Board) => void;
}

type TurnColor = "red" | "yellow";

/**
 * @description Location - {x, y} positon on the board
 * @description Position - {left, right} CSS offset on the board
 */
const GameBoard: FC<BoardProps> = (props) => {
  const [screenSize, setScreenSize] = useState<"large" | "small">("large");
  const markerRef = useRef<HTMLDivElement | null>(null);
  const playerMap: Record<TurnType, { id: number; color: TurnColor }> = {
    p1: {
      id: 0,
      color: "red",
    },
    p2: {
      id: 1,
      color: "yellow",
    },
  };

  useEffect(() => {
    const largeMediaQuery = window.matchMedia(SCREEN_SIZES.large);

    const largeMQEventHandler = (event: MediaQueryListEvent) => {
      if (event.matches) return setScreenSize("large");
      setScreenSize("small");
    };

    largeMediaQuery.addEventListener("change", largeMQEventHandler);

    return () => {
      largeMediaQuery.removeEventListener("change", largeMQEventHandler);
    };
  });

  const {
    currentSlotX,
    currentSlotY,
    setCurrentSlotX,
    setCurrentSlotY,
    turn,
    setTurn,
    setBoard,
    board,
    setWinner,
  } = props;

  const SCREEN_SIZES = {
    large: "(min-width: 768px)",
  };

  const SIZING = {
    large: {
      gutterHeight: 16,
      gapHeight: 20,
      circleHeight: 68,

      gutterWidth: 16,
      circleWidth: 71,
      gapWidth: 17,
    },
    small: {
      circleHeight: 38,
      gutterHeight: 8,
      gapHeight: 9,

      gapWidth: 9,
      circleWidth: 37.5,
      gutterWidth: 7,
    },
  };

  /* Refactor to use correct values */
  const getLocationFromPosition = ({ top, left }: MovePosition): MoveLocation => {
    const { gutterWidth, gapWidth, circleWidth, gutterHeight, gapHeight, circleHeight } =
      SIZING[screenSize];

    // Unsued, might not be needed
    // const isFirst = left < gutterWidth / 2 + circleWidth;
    const locationX = getCeilingValue(
      Math.floor((left - gutterWidth) / (gapWidth + circleWidth)),
      6
    );
    const locationY = getCeilingValue(
      Math.floor((top - gutterHeight) / (gapHeight + circleHeight)),
      5
    );

    /* Todod; allow for max & min values */
    return { x: locationX <= -1 ? 0 : locationX, y: locationY <= -1 ? 0 : locationY };
  };

  /**1
   * Gets a board pieces CSS postion reltive to the top left of the board.
   * @param location - the location to get the postion of
   */
  const getPositionFromLocation = (location: MoveLocation): MovePosition => {
    const { gapWidth, circleWidth, circleHeight, gapHeight, gutterHeight } = SIZING[screenSize];

    const locationLeft = (circleWidth + gapWidth) * location.x + circleWidth / 4;
    const locationTop = (circleHeight + gapHeight) * location.y + gutterHeight;

    return { left: locationLeft, top: locationTop };
  };

  const placeMove = (player: TurnType, spot: MoveLocation) => {
    if (props.disabled) return;
    if (isSlotAlreadyPlaced(board, { x: spot.x, y: spot.y })) return;

    const { x, y } = getClosestAvailableSpot(board, { x: spot.x, y: spot.y });

    setBoard((board) => {
      board[y - 1][x] = player === "p1" ? 0 : 1;
      return board;
    });

    props.onMovePlacement && props.onMovePlacement(spot, board);

    const win = checkWin(board, spot);
    if (win !== undefined && !isNaN(win)) return setWinner(win === 0 ? "p1" : "p2");
    setTurn(turn === "p1" ? "p2" : "p1");
  };

  const getBoardPeices = () => {
    let boardPieces: { left: number; top: number; color: "red" | "yellow" }[] = [];

    for (let rowIndex = 0; rowIndex < 6; rowIndex++) {
      for (let colIndex = 0; colIndex < 7; colIndex++) {
        let piece = board[rowIndex][colIndex];

        if (!isNaN(piece)) {
          let position = getPositionFromLocation({ x: colIndex, y: rowIndex });
          /* TODO: Refactor to use map */
          let color: "yellow" | "red" = piece === 0 ? "red" : "yellow";
          boardPieces.push({ color: color, left: position.left, top: position.top });
        }
      }
    }

    return boardPieces;
  };

  const handleBoardClick = (event: MouseEvent) => {
    if (!event.target) return;
    const target = event.target as HTMLElement;

    const offsetLeft = event.clientX - target.getBoundingClientRect().left;
    const offsetTop = event.clientY - target.getBoundingClientRect().top;

    const position = getLocationFromPosition({ top: offsetTop, left: offsetLeft });
    console.log(position);

    placeMove(turn, position);
  };

  /* Calculates the current slot being hovered over */
  const handleMouseMove: MouseEventHandler = (event) => {
    if (props.winner) return;
    const target = event.target as HTMLDivElement;
    const offsetLeft = event.clientX - target.getBoundingClientRect().left;
    const offsetTop = event.clientY - target.getBoundingClientRect().top;

    let { x, y } = getLocationFromPosition({ left: offsetLeft, top: offsetTop });

    if (x !== currentSlotX && props.onChangeHoverRow) {
      props.onChangeHoverRow(x);
    }

    setCurrentSlotX(x);
    setCurrentSlotY(y);
  };

  /**
   * @param slot
   * @returns
   */
  const moveMarkerToSlot = (xLocation: number) => {
    if (!markerRef.current) return;
    const target = markerRef.current;

    const { circleWidth, gapWidth } = SIZING[screenSize];
    const offsetLeft = (circleWidth + gapWidth) * xLocation + circleWidth / 2;

    target.style.left = `${offsetLeft - 2}px`;
  };

  /* Move marker to X hovered postion  */
  useEffect(() => {
    moveMarkerToSlot(currentSlotX);
  }, [currentSlotX]);

  /* Start market in first slot */
  useEffect(() => {
    moveMarkerToSlot(0);
  }, []);

  return (
    <div className="wrapper">
      {/* <div className="slots">
        <h3>{currentSlotX}</h3>
        <h3>{currentSlotY}</h3>
      </div> */}

      <div className="board" onMouseMove={handleMouseMove} onClick={handleBoardClick}>
        <div className="marker" ref={markerRef}>
          <Marker color={playerMap[turn].color} />
        </div>

        {getBoardPeices().map((piece, i) => (
          <div className="board__piece" style={{ left: piece.left, top: piece.top }} key={i}>
            <BoardPiece color={piece.color} size={screenSize} />
          </div>
        ))}

        {/* <div className="line line--x"></div>
        <div className="line line--y"></div> */}

        <div className="board__layer board__layer-black">
          <BoardLayer color="black" size={screenSize} />
        </div>
        <div className="board__layer board__layer-white">
          <BoardLayer color="white" size={screenSize} />
        </div>
      </div>

      <style jsx>{`
        .wrapper {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          align-items: center;
        }

        .marker {
          position: absolute;
          top: 0;
          left: 0;
          z-index: 10;
          pointer-events: none;
          transform: translateY(-83%);
          transition: left 0.1s ease-in;
        }

        .line {
          position: absolute;
          top: 0;
          background-color: red;
          z-index: 100;

          &--x {
            top: 1px;
            width: 100%;
            height: 1px;
          }

          &--y {
            left: 5px;
            height: 100%;
            width: 1px;
          }
        }

        .slots {
          display: flex;
          gap: 1rem;
        }

        .board {
          position: relative;
          display: flex;
          justify-content: center;
          background-color: var(--color-purple);
          border-radius: 38px;

          &__layer-white {
            z-index: 20;
            position: relative;
          }

          &__layer-black {
            z-index: 10;
            top: 8px;
            position: absolute;
          }

          &__piece {
            z-index: 15;
            position: absolute;
          }
        }
      `}</style>
    </div>
  );
};

GameBoard.defaultProps = {
  disabled: false,
};

export default GameBoard;
