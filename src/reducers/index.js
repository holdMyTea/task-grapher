import { ADD_NODE, ADD_LEVEL } from '../actions'

const blankNode = () => ({
  weight: 1,
  clicked: false
})

export default function (
  state = {
    board: [[blankNode()]]
  }, action
) {
  switch (action.type) {
    case ADD_NODE:
      return {
        ...state,
        board: state.board.map((level, index) => (
          action.levelId === index
            ? [...state.board[action.levelId]].concat([blankNode()])
            /* used concat() as I needed the value of new array returned */
            : level
        ))
      }

    case ADD_LEVEL:
      return state

    default: return state
  }
}
