// 1. Number of jumps from start; 2. Weight from the start; 3. Index.
const calculateTask8 = (board) => {
  // Calculating weight from top to the bottom
  for (let i = 0; i < board[0].length; i++) {
    // For the top level just setting weight from start to this node's weight.
    // Will server as the starting point for the following levels.
    board[0][i].weightFromStart = board[0][i].weight
  }

  for (let i = 1; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      board[i][j].weightFromStart = board[i][j].from.reduce(
        (acc, cur) =>
          Math.max(acc, board[cur.levelId][cur.nodeId].weightFromStart),
        0
      ) + board[i][j].weight
      board[i][j].distanceFromStart = i + 1
    }
  }

  console.log(JSON.stringify(board))
  return JSON.stringify(board)
}

export {calculateTask8}
