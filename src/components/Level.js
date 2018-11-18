import React from 'react'
import PropTypes from 'prop-types'
import { Group } from 'react-konva'

import Node from './Node'
import PlusSign from './PlusSign'

const Level = ({nodes, index, constants, onAddNode, onNodeClick}) => {
  return (
    <Group x={0 + constants.applyOddLevelXShift(index)} y={0 + index * constants.levelDifferenceY}
      height={constants.levelDifferenceY} width={1100}>
      <Group x={0} y={0} height={constants.levelDifferenceY} width={1000}>
        {
          nodes.map((node, nodeIndex) => (
            <Node weight={node.weight} clicked={node.clicked} nodeIndex={nodeIndex}
              constants={constants}
              key={`nd ${index * 10 + nodeIndex}`}
              onClick={() => onNodeClick(nodeIndex)} />
          ))
        }
      </Group>
      <PlusSign offsetX={1020} offsetY={20} onClick={onAddNode} />
    </Group>
  )
}

Level.propTypes = {
  nodes: PropTypes.arrayOf(
    PropTypes.shape({
      weight: PropTypes.number,
      clicked: PropTypes.bool
    })
  ),
  constants: PropTypes.shape({
    nodeDifferenceX: PropTypes.number,
    levelDifferenceY: PropTypes.number,
    nodeRadius: PropTypes.number,
    nodeWeightTextSize: PropTypes.number,
    applyOddLevelXShift: PropTypes.func
  }),
  index: PropTypes.number.isRequired,
  onAddNode: PropTypes.func.isRequired,
  onNodeClick: PropTypes.func.isRequired
}

export default Level
