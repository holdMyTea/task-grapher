import { ADD_NODE, ADD_LEVEL, CLICK_NODE } from '../actions'

const blankNode = () => ({
  weight: 1,
  clicked: false
})

export default function (
  state = {
    nodes: [[blankNode()]],
    connections: [],
    clicked: undefined
  }, action
) {
  switch (action.type) {
    case ADD_NODE:
      return {
        ...state,
        nodes: state.nodes.map((level, index) => (
          action.levelId === index
            ? [...state.nodes[action.levelId]].concat([blankNode()])
            /* used concat() as I needed the value of new array returned */
            : level
        ))
      }

    case ADD_LEVEL:
      return {
        ...state,
        nodes: [...state.nodes, [blankNode()]]
      }

    case CLICK_NODE:
      if (state.clicked === undefined) {
        return {
          ...state,
          clicked: {
            levelId: action.levelId,
            nodeId: action.nodeId
          },
          nodes: state.nodes.map((level, levelIndex) => (
            action.levelId === levelIndex
              ? level.map((node, nodeIndex) => (
                action.nodeId === nodeIndex
                  ? {...state.nodes[levelIndex][nodeIndex], clicked: true}
                  : node
              ))
              : level
          ))
        }
      } else return {...state, clicked: undefined}

    default: return state
  }
}
