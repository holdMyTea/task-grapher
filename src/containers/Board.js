import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Stage, Layer } from 'react-konva'

import { addNode, addLevel } from '../actions/Board'
import Level from '../components/Level'
import PlusSign from '../components/PlusSign'

class Board extends React.Component {
  constructor () {
    super()
    this.state = {
      clicked: false
    }
  }

  render () {
    return (
      <Stage width={window.innerWidth} height={window.innerHeight} ref={ref => (this.stageRef = ref)}>
        <Layer>
          {
            this.props.Board.map((level, index) => (
              <Level points={level} index={index} key={index} />
            ))
          }
          <PlusSign offsetX={480} offsetY={this.props.Board.length * 100 + 20}/>
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

Board.propTypes = {
  Board: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.array // for upcoming connections
    )
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Board)
