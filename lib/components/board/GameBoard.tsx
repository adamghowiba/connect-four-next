import { Dispatch, FC, MouseEventHandler, SetStateAction, useEffect, useRef } from "react";
import { TurnType } from "../../../pages/board";
import Marker from "../icons/Marker";
import BoardLayer from "./BoardLayer";
import BoardPiece from "./BoardPiece";
import { checkWin } from "./helpers/board.helpers";

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
  winner: TurnType;
  setWinner: Dispatch<SetStateAction<TurnType>>;
  onChangeHoverRow?: (row: number) => void;
  onMovePlacement?: (spot: MoveLocation, board: Board) => void;
}

type TurnColor = "red" | "yellow";

const GameBoard: FC<BoardProps> = (props) => {
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

  let gutterSize = 16;
  let circleWidth = 71;
  let gapWidth = 17;
  let gapHeight = 20;
  let circleHeight = 68;

  /* Refactor to use correct values */
  const getSlot = (offset: number, max: number) => {
    let gapWidth = 20;
    let circleSize = 68;

    let isFirstSlot = offset < circleSize + gapWidth;
    let spaceBetweenSlots = 68 - (isFirstSlot ? gapWidth : 23.5);
    let slot = Math.floor(offset / spaceBetweenSlots / 2) + 1;
    let maxedOutSlot = (slot > max ? max : slot) || 1;

    return maxedOutSlot;
  };

  /* Calculates the current slot being hovered over */
  const handleMouseMove: MouseEventHandler = (event) => {
    if (props.winner) return;
    const target = event.target as HTMLDivElement;
    const offsetLeft = event.clientX - target.getBoundingClientRect().left;
    const offsetTop = event.clientY - target.getBoundingClientRect().top;
    let slotX = getSlot(offsetLeft, 7);

    if (slotX !== currentSlotX && props.onChangeHoverRow) {
      props.onChangeHoverRow(slotX);
    }

    setCurrentSlotX(slotX);
    setCurrentSlotY(getSlot(offsetTop, 6));
  };

  /**
   * Gets a board pieces CSS postion reltive to the top left of the board.
   * @param location - the location to get the postion of
   */
  const getBoardSlotPosition = (location: MoveLocation): MovePosition => {
    // const locationTop = (circleSize + gapWidth) * location.y + circleSize / 2;
    const locationLeft = (circleWidth + gapWidth) * location.x + circleWidth / 4;
    const locationTop = (circleHeight + gapHeight) * location.y + circleHeight / 4;

    return { left: locationLeft, top: locationTop };
  };

  /**
   * Finds the closest available spot to place a board piece.
   * @param location -the location to find the nearest from
   * @returns {MoveLocation} the location of the nearest spot
   */
  const getClosestAvailableSpot = ({ x, y }: MoveLocation) => {
    const column = board.reduce((acc, row) => {
      return (acc = [...acc, row[x]]);
    }, []);

    let location: MoveLocation = { x, y: column.length };

    for (let index = 0; index < column.length; index++) {
      const element = column[index];

      if (!isNaN(element)) return (location = { x, y: index });
    }

    return location;
  };

  /**
   * Checks if a slot is already filled or empty
   *
   * @param location - to check if it's already filled
   * @returns
   */
  const isSlotAlreadyPlaced = ({ x, y }: MoveLocation) => {
    return !isNaN(board[y][x]);
  };

  const placeMove = (player: TurnType, spot: MoveLocation) => {
    if (props.disabled) return;
    if (isSlotAlreadyPlaced({ x: spot.x - 1, y: spot.y - 1 })) return;

    const { x, y } = getClosestAvailableSpot({ x: spot.x - 1, y: spot.y });

    setBoard((board) => {
      board[y - 1][x] = player === "p1" ? 0 : 1;
      board = board;

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
          let position = getBoardSlotPosition({ x: colIndex, y: rowIndex });
          /* Refactor to use map */
          let color: "yellow" | "red" = piece === 0 ? "red" : "yellow";
          boardPieces.push({ color: color, left: position.left, top: position.top });
        }
      }
    }

    return boardPieces;
  };

  const moveMarkerToSlot = (slot: number) => {
    const target = markerRef.current;
    if (!target) return;

    const offsetLeft = (circleWidth + gapWidth) * slot + circleWidth / 2;

    target.style.left = `${offsetLeft - 2}px`;
  };

  const handleBoardClick = () => placeMove(turn, { x: currentSlotX, y: currentSlotY });

  /* Move marker to X slot postion  */
  useEffect(() => {
    moveMarkerToSlot(currentSlotX - 1);
  }, [currentSlotX]);

  /* Start market in first slot */
  useEffect(() => {
    moveMarkerToSlot(0);
  }, []);

  return (
    <div className="wrapper">
      <div className="slots">
        <h3>{currentSlotX}</h3>
        <h3>{currentSlotY}</h3>
      </div>

      <div className="board" onMouseMove={handleMouseMove} onClick={handleBoardClick}>
        <div className="marker" ref={markerRef}>
          <Marker color={playerMap[turn].color} />
        </div>

        {getBoardPeices().map((piece, i) => (
          <div className="board__piece" style={{ left: piece.left, top: piece.top }} key={i}>
            <BoardPiece color={piece.color} />
          </div>
        ))}

        <div className="board__layer board__layer-black">
          <BoardLayer color="black" />
        </div>
        <div className="board__layer board__layer-white">
          <BoardLayer color="white" />
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

        .slots {
          display: flex;
          gap: 1rem;
        }

        .board {
          position: relative;
          display: flex;
          height: 597px;
          width: 632px;
          justify-content: center;

          &__layer-white {
            position: absolute;
          }

          &__layer-black {
            top: 8px;
            position: absolute;
          }

          &__piece {
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
