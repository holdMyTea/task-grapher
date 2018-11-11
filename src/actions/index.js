export const ADD_NODE = 'ADD_NODE'
export const addNode = (levelId) => ({
  type: ADD_NODE,
  levelId
})

export const ADD_LEVEL = 'ADD_LEVEL'
export const addLevel = () => ({
  type: ADD_LEVEL
})

export const CLICK_NODE = 'CLICK_NODE'
export const clickNode = (levelId, nodeId) => ({
  levelId, nodeId, type: CLICK_NODE
})
