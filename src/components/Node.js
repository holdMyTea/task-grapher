import React from 'react'
import PropTypes from 'prop-types'
import { Circle } from 'react-konva'

const Node = ({connections, nodeIndex}) => {
  return (
    <Circle x={50 + nodeIndex * 100} y={50} radius={35} fill='red' />
  )
}

Node.propTypes = {
  connections: PropTypes.arrayOf(
    PropTypes.array // for upcoming connections
  ),
  nodeIndex: PropTypes.number.isRequired
}

export default Node
