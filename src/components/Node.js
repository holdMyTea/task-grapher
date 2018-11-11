import React from 'react'
import PropTypes from 'prop-types'
import { Group, Circle, Text } from 'react-konva'

const Node = ({weight, clicked, nodeIndex}) => {
  return (
    <Group x={nodeIndex * 100} y={0}>
      <Circle x={50} y={50} radius={35}
        fill={clicked ? 'green' : 'white'}
        stroke='black' strokeWidth={5} />
      <Text x={45} y={15} height={70} width={70}
        aligh='center' verticalAlign='middle'
        text={weight} fontSize={15} fontStyle='bold' />
    </Group>
  )
}

Node.propTypes = {
  weight: PropTypes.number.isRequired,
  clicked: PropTypes.bool.isRequired,
  nodeIndex: PropTypes.number.isRequired
}

export default Node
