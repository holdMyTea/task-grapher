import React from 'react'
import PropTypes from 'prop-types'
import { Arrow } from 'react-konva'

const Arrows = ({ connections, constants }) => {
  return connections.map((from, index1) => (
    from.to.map((to, index2) =>
      <Arrow
        x={0} y={0}
        points={[
          (from.nodeId + 0.5) * constants.nodeDifferenceX +
            constants.applyOddLevelXShift(from.levelId), // x1
          (from.levelId + 0.5) * constants.levelDifferenceY, // y1
          (to.nodeId + 0.5) * constants.nodeDifferenceX +
            constants.applyOddLevelXShift(to.levelId), // x2
          (to.levelId + 0.5) * constants.levelDifferenceY // y2
        ]} key={`arr-${index1}${index2}`}
        stroke='black' strokeWidth={3}
        lineCap='round' lineJoin='round' />
    ))
  ).flat()
}

Arrows.propTypes = {
  connections: PropTypes.arrayOf(
    PropTypes.shape({
      nodeId: PropTypes.number,
      levelId: PropTypes.number,
      to: PropTypes.arrayOf(
        PropTypes.shape({
          levelId: PropTypes.number,
          nodeId: PropTypes.number
        })
      )
    })
  ),
  constants: PropTypes.shape({
    nodeDifferenceX: PropTypes.number,
    levelDifferenceY: PropTypes.number,
    nodeRadius: PropTypes.number,
    nodeWeightTextSize: PropTypes.number,
    applyOddLevelXShift: PropTypes.func
  })
}

export default Arrows
