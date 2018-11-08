import React from 'react'
import { connect } from 'react-redux'
import Konva from 'konva'
import { Stage, Layer, Circle } from 'react-konva'

import { addNode, addLevel } from '../actions/Board'

class Board extends React.Component {
  render () {
    return (
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <Circle x={200} y={100} radius={50} fill="green" />
        </Layer>
      </Stage>
    )
  }
}

const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = dispatch => {
  return {
    addNode: (levelId) => dispatch(addNode(levelId)),
    addLevel: () => dispatch(addLevel)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Board)
