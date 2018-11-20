import { ADD_NODE, ADD_LEVEL, CLICK_NODE, CHANGE_WEIGHT } from '../actions'

const blankNode = () => ({
  weight: 1,
  clicked: false
})

export default function (
  state = {
    nodes: [[blankNode()], [blankNode()]],
    connections: [{
      from: {
        levelId: 0,
        nodeId: 0
      },
      to: {
        levelId: 1,
        nodeId: 0
      }
    }],
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
            : level
        ))
      }

    case ADD_LEVEL:
      return {
        ...state,
        nodes: [...state.nodes, [blankNode()]]
      }

    case CHANGE_WEIGHT:
      return {
        ...state,
        nodes: setNodeWeight(state, action.levelId, action.nodeId, action.newWeight)
      }

    case CLICK_NODE:
      if (state.clicked === undefined) {
        return handleFirstClick(state, action)
      } else return handleSecondClick(state, action)

    default: return state
  }
}

const handleFirstClick = (state, action) => {
  return {
    ...state,
    clicked: {
      levelId: action.levelId,
      nodeId: action.nodeId
    },
    nodes: setNodeClicked(state, action.levelId, action.nodeId, true)
  }
}

const handleSecondClick = (state, action) => {
  const first = state.clicked
  const second = {
    levelId: action.levelId,
    nodeId: action.nodeId
  }

  if (first.levelId >= second.levelId) {
    console.log('Only the levels below!!1')
    return {
      ...state,
      clicked: undefined,
      nodes: setNodeClicked(state, first.levelId, first.nodeId, false)
    }
  } else {
    if (state.connections.find(element => {
      return (element.from.levelId === first.levelId) &&
        (element.from.nodeId === first.nodeId) &&
        (element.to.levelId === second.levelId) &&
        (element.to.nodeId === second.nodeId)
    })) {
      return {
        ...state,
        clicked: undefined,
        nodes: setNodeClicked(state, first.levelId, first.nodeId, false)
      }
    } else {
      return {
        ...state,
        clicked: undefined,
        nodes: setNodeClicked(state, first.levelId, first.nodeId, false),
        connections: [...state.connections, {
          from: first,
          to: second
        }]
      }
    }
  }
}

/** @function setNodeClicked - sets Node's Clicked value and returns updated state.nodes Object
 * @param {Object} state current store's state
 * @param {Number} levelId levelId of chosen Node
 * @param {Number} nodeId nodeId on level of chosen Node
 * @param {Boolean} value desired Clicked value
 * @returns {Object} updated state.nodes Object for state
 */
const setNodeClicked = (state, levelId, nodeId, value) => {
  return state.nodes.map((level, levelIndex) => (
    levelId === levelIndex
      ? level.map((node, nodeIndex) => (
        nodeId === nodeIndex
          ? {...state.nodes[levelIndex][nodeIndex], clicked: value}
          : node
      ))
      : level
  ))
}

const setNodeWeight = (state, levelId, nodeId, newWeight) => {
  return state.nodes.map((level, levelIndex) => (
    levelId === levelIndex
      ? level.map((node, nodeIndex) => (
        nodeId === nodeIndex
          ? {...state.nodes[levelIndex][nodeIndex], weight: newWeight}
          : node
      ))
      : level
  ))
}
