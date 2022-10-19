import { ChildProcess } from "child_process";
import { MoveLocation, MovePosition } from "../GameBoard";

/**
 * Returns an empty board state. Subject to be changed.
 * @returns An empty board
 */
export const getEmptyBoard = (): Board => {
  return [
    [NaN, NaN, NaN, NaN, NaN, NaN, NaN],
    [NaN, NaN, NaN, NaN, NaN, NaN, NaN],
    [NaN, NaN, NaN, NaN, NaN, NaN, NaN],
    [NaN, NaN, NaN, NaN, NaN, NaN, NaN],
    [NaN, NaN, NaN, NaN, NaN, NaN, NaN],
    [NaN, NaN, NaN, NaN, NaN, NaN, NaN],
  ];
};

/**
 * Checks if a slot is already filled or empty
 *
 * @param location - to check if it's already filled
 * @returns
 */
export const isSlotAlreadyPlaced = (board: Board, { x, y }: MoveLocation) => {
  return !isNaN(board[y][x]);
};

/**
 * Finds the closest available spot to place a board piece.
 * @param location -the location to find the nearest from
 * @returns {MoveLocation} the location of the nearest spot
 */
export const getClosestAvailableSpot = (board: Board, { x, y }: MoveLocation) => {
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

export const getCeilingValue = (value: number, cielingValue: number) => {
  return value > cielingValue ? cielingValue : value;
};

export const getFloorValue = (value: number, floorValue: number) => {
  return value < floorValue? floorValue : value;
}