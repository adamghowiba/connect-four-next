import { MoveLocation } from "../GameBoard";

const checkRowWin = (board: number[][]) => {
  const playerScoreCount: any = {};
  let winner: number | undefined = undefined;

  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      const move = board[row][col];
      const nextMove = board[row]?.[col + 1];

      if (isNaN(move)) continue;

      if (move === nextMove) {
        let playerScore = playerScoreCount[move];
        playerScoreCount[move] = (playerScore || 0) + 1;
        // console.log(playerScoreCount);
      } else {
        playerScoreCount[move] = 0;
      }

      if (playerScoreCount[move] >= 3) {
        console.log("Winner winner");
        winner = move;
      }
    }
  }

  return winner;
};

/* TODO: finish */
const checkColumnWin = (board: number[][], x: number) => {
  const playerScoreCount: any = {};
  let winner: number | undefined = undefined;

  const column = board.reduce((acc, row) => {
    return (acc = [...acc, row[x]]);
  }, []);

  for (let columnIndex = 0; columnIndex < column.length - 1; columnIndex++) {
    const move = column[columnIndex];
    const nextMove = column?.[columnIndex + 1];

    if (move === nextMove) {
      playerScoreCount[move] = (playerScoreCount[move] || 0) + 1;
    } else {
      playerScoreCount[move] = 0;
    }

    if (playerScoreCount[move] >= 3) return (winner = move);
  }

  return winner;
};

export const checkWin = (board: Board, position: MoveLocation) => {
  const rowWin = checkRowWin(board);
  const verticalWin = checkColumnWin(board, position.x);

  if (!isNaN(rowWin)) return rowWin;
  if (!isNaN(verticalWin)) return verticalWin;
};
