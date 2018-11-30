// 1. Number of jumps from start; 2. Weight from the start; 3. Index.
const calculateTask8 = (board) => {
  // Calculating weight from the top of the graph
  for (let i = 0; i < board[0].length; i++) {
    // For the top level just setting weight from start to this node's weight.
    // It will serve as the starting point for the following levels.
    board[0][i].weightFromStart = board[0][i].weight
    board[0][i].distanceFromStart = 1
  }

  for (let i = 1; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      // Just reducing the array of parent connections to one that has maximal weight from the start.
      // As we are checking from the top and the 0 level has been already pre-calculated, all is safe.
      board[i][j].weightFromStart = board[i][j].from.reduce(
        (acc, cur) =>
          Math.max(acc, board[cur.levelId][cur.nodeId].weightFromStart),
        0
      ) + board[i][j].weight
      board[i][j].distanceFromStart = i + 1
    }
  }

  // Now, as we have calculated sorting parameters, we can mix everythin up
  const result = board.flatMap(level => (
    level.sort((a, b) => a.weightFromStart - b.weightFromStart)
  )).reduce((acc, cur, idx) => (
    acc += `${idx + 1}: ${cur.globalIndex}(${cur.distanceFromStart},${cur.weightFromStart})\n`
  ), '')

  return result
}

export {calculateTask8}
