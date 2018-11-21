import React from 'react'
import PropTypes from 'prop-types'
import { Group, Circle, Text } from 'react-konva'

const Node = ({weight, clicked, nodeIndex, constants, count, onClick, onDoubleClick}) => {
  return (
    <Group x={nodeIndex * constants.nodeDifferenceX} y={0}>
      <Circle
        x={constants.nodeDifferenceX / 2}
        y={constants.levelDifferenceY / 2}
        radius={constants.nodeRadius}
        fill={clicked ? 'green' : 'white'}
        stroke='black' strokeWidth={5}
        onClick={onClick}
        // using onWheel() here, because in addition to onDoubleClick onClick fires twice
        // P.S. dear ESLint, sorry for prompt
        onWheel={() => onDoubleClick(Number(prompt('Please input new weight', 1)))}
      />
      <Text
        x={constants.nodeDifferenceX / 2 - constants.nodeRadius - 5}
        y={constants.levelDifferenceY / 2 - constants.nodeRadius}
        fill='red'
        text={count} fontSize={constants.nodeWeightTextSize} fontStyle='bold' listening={false}
      />
      <Text
        x={constants.nodeDifferenceX / 2 - constants.nodeRadius}
        y={constants.levelDifferenceY / 2 - constants.nodeRadius}
        height={constants.levelDifferenceY / 2 + constants.nodeRadius - constants.nodeWeightTextSize}
        width={constants.nodeDifferenceX / 2 + constants.nodeRadius - constants.nodeWeightTextSize}
        align='center' verticalAlign='middle'
        text={weight} fontSize={constants.nodeWeightTextSize} fontStyle='bold' listening={false} />
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
  count: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  onDoubleClick: PropTypes.func.isRequired
}

export default Node
