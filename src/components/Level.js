import React from 'react'
import PropTypes from 'prop-types'
import { Group, Circle } from 'react-konva'

const Level = ({points, index}) => {
  return (
    <Group x={0} y={0 + index * 100} height={100} width={1050} >
      {
        points.map((node, index) => (
          <Circle x={50 + index * 100} y={50} radius={35} fill='red' key={index} />
        ))
      }
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
