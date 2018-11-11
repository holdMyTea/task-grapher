import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Stage, Layer } from 'react-konva'

import { addNode, addLevel } from '../actions'
import Level from '../components/Level'
import PlusSign from '../components/PlusSign'

class Board extends React.Component {
  render () {
    console.log('Board render called')
    return (
      <Stage width={window.innerWidth} height={window.innerHeight} ref={ref => (this.stageRef = ref)}>
        <Layer>
          {
            this.props.board.map((level, index) => (
              <Level points={level} index={index} key={'lvl' + index}
                addNode={() => {
                  this.props.addNode(index)
                  console.log('Add node on level ' + index)
                }} />
            ))
          }
          <PlusSign offsetX={480} offsetY={this.props.board.length * 100 + 20}/>
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
  board: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        weight: PropTypes.number,
        clicked: PropTypes.bool
      })
    )
  ),
  addNode: PropTypes.func
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Board)
