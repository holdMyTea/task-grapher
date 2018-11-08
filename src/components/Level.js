import React from 'react'
import PropTypes from 'prop-types'
import { Group, Rect } from 'react-konva'

import Node from './Node'
import PlusSign from './PlusSign'

const Level = ({points, index}) => {
  return (
    <Group x={0} y={0 + index * 100} height={100} width={1100}>
      <Rect x={0} y={0} height={100} width={1100} stroke='black' strokeWidth={2}/>
      <Group x={0} y={0} height={100} width={1000}>
        <Rect x={2} y={2} height={96} width={996} stroke='grey' strokeWidth={4}/>
        {
          points.map((node, nodeIndex) => (
            <Node connections={node} nodeIndex={nodeIndex} key={nodeIndex} />
          ))
        }
      </Group>
      <PlusSign offsetX={1020} offsetY={20} />
    </Group>
  )
}

Level.propTypes = {
  points: PropTypes.arrayOf(
    PropTypes.array // for upcoming connections
  ),
  index: PropTypes.number.isRequired
}

export default Level
