import { ADD_NODE, ADD_LEVEL, CLICK_NODE, CHANGE_WEIGHT } from '../actions'

const blankNode = (levelId, nodeId = 0) => ({
  weight: 1,
  levelId,
  nodeId,
  clicked: false,
  from: [],
  to: []
})

const initialNodes = updateGlobalIndex(addConnection(
  [[blankNode(0)], [blankNode(1)]],
  {nodeId: 0, levelId: 0},
  {nodeId: 0, levelId: 1}
))

export default function (
  state = {
    nodes: initialNodes,
    clicked: undefined
  }, action
) {
  switch (action.type) {
    case ADD_NODE:
      const newNodes = state.nodes.map((level, index) => (
        action.levelId === index
          ? [...state.nodes[action.levelId]].concat([blankNode(action.levelId, state.nodes[action.levelId].length)])
          : level
      ))
      return {
        ...state,
        nodes: updateGlobalIndex(newNodes)
      }

    case ADD_LEVEL:
      const addedLevelNodes = [...state.nodes, [blankNode(state.nodes.length)]]
      return {
        ...state,
        nodes: updateGlobalIndex(addedLevelNodes)
      }

    case CHANGE_WEIGHT:
      return {
        ...state,
        nodes: updateNode(state.nodes, action.levelId, action.nodeId, {weight: action.newWeight})
      }

    case CLICK_NODE:
      if (state.clicked === undefined) {
        return handleFirstClick(state, action)
      } else return handleSecondClick(state, action)

    default: return state
  }
}

function updateGlobalIndex (nodes) {
  return nodes.map((level, levelIndex) =>
    level.map((node, nodeIndex) => ({
      ...node,
      globalIndex: levelIndex === 0
        ? nodeIndex + 1
        : (nodes.slice(0, levelIndex).flat().length) + nodeIndex + 1
    }))
  )
}

const handleFirstClick = (state, action) => {
  return {
    ...state,
    clicked: {
      levelId: action.levelId,
      nodeId: action.nodeId
    },
    nodes: updateNode(state.nodes, action.levelId, action.nodeId, {clicked: true})
  }
}

const handleSecondClick = (state, action) => {
  const first = state.clicked
  const second = {
    levelId: action.levelId,
    nodeId: action.nodeId
  }

  if (first.levelId >= second.levelId) { // if the second clicked node is the same or lower level than the first one, return and remove click. This prevents loop creation
    console.log('Only the levels below!!1')
    return {
      ...state,
      clicked: undefined,
      nodes: updateNode(state.nodes, first.levelId, first.nodeId, {clicked: false})
    }
  } else {
    if (state.nodes[first.levelId][first.nodeId].to.find(element => { // if there's already a connection between the two nodes, just return and remove clicked
      return (element.levelId === second.levelId) &&
        (element.nodeId === second.nodeId)
    })) {
      return {
        ...state,
        clicked: undefined,
        nodes: updateNode(state.nodes, first.levelId, first.nodeId, {clicked: false})
      }
    } else {
      return {
        ...state,
        clicked: undefined,
        nodes: addConnection(state.nodes, first, second)
      }
    }
  }
}

/** @function addConnection connects two nodes
 * @returns {Object} updated state.nodes Object
 * @param {Object} nodes current nodes matrix to build an updated one from
 * @param {Object} first the node from higher level being conncted
 * @param {Object} second the node from lower level being conncted
 */
function addConnection (nodes, first, second) {
  const newFirst = {...nodes[first.levelId][first.nodeId]}
  newFirst.to.push(second)
  newFirst.clicked = false

  const newSecond = {...nodes[second.levelId][second.nodeId]}
  newSecond.from.push(first)

  const firstLevel = nodes[first.levelId]
  firstLevel[first.nodeId] = newFirst

  const secondLevel = nodes[second.levelId]
  secondLevel[second.nodeId] = newSecond

  nodes[first.levelId] = firstLevel
  nodes[second.levelId] = secondLevel
  return nodes
}

/** @function updateNode sets Node's params
 * @returns {Object} updated state.nodes Object
 * @param {Object} nodes current nodes matrix to build an updated one from
 * @param {Number} levelId levelId of chosen Node
 * @param {Number} nodeId nodeId on level of chosen Node
 * @param {Object} newValue desired value of Node
 */
const updateNode = (nodes, levelId, nodeId, newValue) => {
  return nodes.map((level, levelIndex) => (
    levelId === levelIndex
      ? level.map((node, nodeIndex) => (
        nodeId === nodeIndex
          ? {...nodes[levelIndex][nodeIndex], ...newValue}
          : node
      ))
      : level
  ))
}
