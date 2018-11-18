import React from 'react'
import PropTypes from 'prop-types'
import { Arrow } from 'react-konva'

const ArrowMap = ({ connections, constants }) => {
  return connections.map((connection, index) => (
    <Arrow
      x={0} y={0}
      points={[
        (connection.from.nodeId + 0.5) * constants.nodeDifferenceX +
          constants.applyOddLevelXShift(connection.from.levelId), // x1
        (connection.from.levelId + 0.5) * constants.levelDifferenceY, // y1
        (connection.to.nodeId + 0.5) * constants.nodeDifferenceX +
          constants.applyOddLevelXShift(connection.to.levelId), // x2
        (connection.to.levelId + 0.5) * constants.levelDifferenceY // y2
      ]} key={`arr-${index}`}
      stroke='black' strokeWidth={3} />
  ))
}

ArrowMap.propTypes = {
  connections: PropTypes.arrayOf(
    PropTypes.shape({
      from: PropTypes.shape({
        levelId: PropTypes.number,
        nodeId: PropTypes.number
      }),
      to: PropTypes.shape({
        levelId: PropTypes.number,
        nodeId: PropTypes.number
      })
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

export default ArrowMap
