import React from 'react'
import PropTypes from 'prop-types'
import { Group, Circle, Text } from 'react-konva'

const Node = ({weight, clicked, nodeIndex, constants, onClick}) => {
  return (
    <Group x={nodeIndex * constants.nodeDifferenceX} y={0}>
      <Circle
        x={constants.nodeDifferenceX / 2}
        y={constants.levelDifferenceY / 2}
        radius={constants.nodeRadius}
        fill={clicked ? 'green' : 'white'}
        stroke='black' strokeWidth={5}
        onClick={onClick} />
      <Text
        x={constants.nodeDifferenceX / 2 - constants.nodeRadius}
        y={constants.levelDifferenceY / 2 - constants.nodeRadius}
        height={constants.levelDifferenceY / 2 + constants.nodeRadius - constants.nodeWeightTextSize}
        width={constants.nodeDifferenceX / 2 + constants.nodeRadius - constants.nodeWeightTextSize}
        align='center' verticalAlign='middle'
        text={weight} fontSize={constants.nodeWeightTextSize} fontStyle='bold'
        listening={false} />
    </Group>
  )
}

Node.propTypes = {
  weight: PropTypes.number.isRequired,
  clicked: PropTypes.bool.isRequired,
  nodeIndex: PropTypes.number.isRequired,
  constants: PropTypes.shape({
    nodeDifferenceX: PropTypes.number,
    levelDifferenceY: PropTypes.number,
    nodeRadius: PropTypes.number,
    nodeWeightTextSize: PropTypes.number
  }),
  onClick: PropTypes.func.isRequired
}

export default Node
