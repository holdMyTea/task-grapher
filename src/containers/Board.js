import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Stage, Layer, Group, Rect } from 'react-konva'

import { addNode, addLevel, clickNode, changeWeight } from '../actions'
import Level from '../components/board/Level'
import PlusSign from '../components/board/PlusSign'
import Arrows from '../components/board/Arrows'

class Board extends React.Component {
  constructor () {
    super()
    this.state = {
      constants: {
        nodeDifferenceX: 100,
        levelDifferenceY: 100,
        nodeRadius: 35,
        nodeWeightTextSize: 15,
        applyOddLevelXShift: (levelId) => {
          return levelId % 2 === 0 ? 0 : 50
        }
      }
    }
  }

  render () {
    return (
      <div>
        <Stage width={1160} height={window.innerHeight} ref={ref => (this.stageRef = ref)}>
          <Layer>
            { this.drawLevelLines() }
            <Arrows connections={this.filterConnections()} constants={this.state.constants} />
            { this.drawNodes() }
            <PlusSign offsetX={480} offsetY={this.props.nodes.length * 100 + 20}
              onClick={this.props.onAddLevel}/>
          </Layer>
        </Stage>
      </div>
    )
  }

  drawLevelLines () {
    return (
      <Group>
        {this.props.nodes.map((level, index) => (
          <Group key={`rects-${index}`}
            x={0 + this.state.constants.applyOddLevelXShift(index)}
            y={0 + index * this.state.constants.levelDifferenceY}
            height={this.state.levelDifferenceY} width={1100}>
            <Rect x={0} y={0} height={this.state.constants.levelDifferenceY} width={1100} stroke='black' strokeWidth={2}/>
            <Rect x={2} y={2} height={this.state.constants.levelDifferenceY - 4} width={996} stroke='grey' strokeWidth={4}/>
          </Group>
        ))}
      </Group>)
  }

  drawNodes () {
    return this.props.nodes.map((level, index, array) => (
      <Level nodes={level} index={index} key={`lvl-${index}`}
        constants={this.state.constants}
        nodeCountOffset={index === 0 ? 1 : array.slice(0, index).flat().length + 1}
        onPlusClick={() => this.props.onAddNode(index)}
        onNodeClick={(nodeId) => this.props.onNodeClick(index, nodeId)}
        onNodeDoubleClick={(nodeId, newWeight) => this.props.onNodeDoubleClick(index, nodeId, newWeight)} />
    ))
  }

  filterConnections () {
    return this.props.nodes.flat().filter(node => node.to === undefined || node.to.length > 0)
  }
}

const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = dispatch => {
  return {
    onAddNode: (levelId) => dispatch(addNode(levelId)),
    onAddLevel: () => dispatch(addLevel()),
    onNodeClick: (levelId, nodeId) => dispatch(clickNode(levelId, nodeId)),
    onNodeDoubleClick: (levelId, nodeId, newWeight) => dispatch(changeWeight(levelId, nodeId, newWeight))
  }
}

Board.propTypes = {
  nodes: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        weight: PropTypes.number,
        clicked: PropTypes.bool,
        from: PropTypes.arrayOf(
          PropTypes.shape({
            levelId: PropTypes.number,
            nodeId: PropTypes.number
          })
        ),
        to: PropTypes.arrayOf(
          PropTypes.shape({
            levelId: PropTypes.number,
            nodeId: PropTypes.number
          })
        )
      })
    )
  ),
  onAddNode: PropTypes.func.isRequired,
  onAddLevel: PropTypes.func.isRequired,
  onNodeClick: PropTypes.func.isRequired,
  onNodeDoubleClick: PropTypes.func.isRequired
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Board)
