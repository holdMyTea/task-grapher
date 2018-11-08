import { ADD_NODE, ADD_LEVEL } from '../actions/Board'

const blankLevel = [[], []] // level is array of points, which are just arrays of connections

const initialState = [blankLevel] // board state is just array of levels, so baiscally it's a [[[]]]

export default function (
  state = initialState, action
) {
  switch (action.type) {
    case ADD_NODE:
      return state

    case ADD_LEVEL:
      return state

    default: return state
  }
}
