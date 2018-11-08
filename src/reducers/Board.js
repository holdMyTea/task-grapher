import { ADD_NODE, ADD_LEVEL } from '../actions/Board'

const blankLevel = {
  points: [{
    id: 0,
    connections: []
  }]
}

const initialState = {
  levels: [blankLevel]
}

export default function (
  state = initialState, action
) {
  switch (action.type) {
    case ADD_NODE:
      const newState = {...state}
      newState.levels[action.levelId].points.push({
        id: state.levels[action.levelId].points.length,
        connections: []
      })

      return newState

    case ADD_LEVEL:
      return {...state, levels: {...state.levels, blankLevel}}

    default: return state
  }
}
