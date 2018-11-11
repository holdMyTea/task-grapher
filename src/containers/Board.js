import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Stage, Layer } from 'react-konva'

import { addNode, addLevel, clickNode } from '../actions'
import Level from '../components/Level'
import PlusSign from '../components/PlusSign'

class Board extends React.Component {
  render () {
    console.log('Board render called')
    return (
      <Stage width={window.innerWidth} height={window.innerHeight} ref={ref => (this.stageRef = ref)}>
        <Layer>
          {
            this.drawNodes()
          }
          <PlusSign offsetX={480} offsetY={this.props.nodes.length * 100 + 20}
            onClick={this.props.onAddLevel}/>
        </Layer>
      </Stage>
    )
  }

  drawNodes () {
    return this.props.nodes.map((level, index) => (
      <Level points={level} index={index} key={'lvl' + index}
        onAddNode={() => this.props.onAddNode(index)}
        onNodeClick={(nodeId) => this.props.onNodeClick(index, nodeId)} />
    ))
  }
}

const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = dispatch => {
  return {
    onAddNode: (levelId) => dispatch(addNode(levelId)),
    onAddLevel: () => dispatch(addLevel()),
    onNodeClick: (levelId, nodeId) => dispatch(clickNode(levelId, nodeId))
  }
}

Board.propTypes = {
  nodes: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        weight: PropTypes.number,
        clicked: PropTypes.bool
      })
    )
  ),
  onAddNode: PropTypes.func.isRequired,
  onAddLevel: PropTypes.func.isRequired,
  onNodeClick: PropTypes.func.isRequired
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Board)
