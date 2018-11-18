import React from 'react'
import PropTypes from 'prop-types'
import { Group, Circle, Text } from 'react-konva'

class Node extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      locked: false
    }
    this.doubleClick = this.doubleClick.bind(this)
    this.click = this.click.bind(this)
  }

  render () {
    return (
      <Group x={this.props.nodeIndex * this.props.constants.nodeDifferenceX} y={0}>
        <Circle
          x={this.props.constants.nodeDifferenceX / 2}
          y={this.props.constants.levelDifferenceY / 2}
          radius={this.props.constants.nodeRadius}
          fill={this.props.clicked ? 'green' : 'white'}
          stroke='black' strokeWidth={5}
          onClick={this.props.onClick}
          onWheel={this.doubleClick} // using onWheel() here, because in addition to onDoubleClick onClick fires twice
        />
        <Text
          x={this.props.constants.nodeDifferenceX / 2 - this.props.constants.nodeRadius}
          y={this.props.constants.levelDifferenceY / 2 - this.props.constants.nodeRadius}
          height={this.props.constants.levelDifferenceY / 2 + this.props.constants.nodeRadius - this.props.constants.nodeWeightTextSize}
          width={this.props.constants.nodeDifferenceX / 2 + this.props.constants.nodeRadius - this.props.constants.nodeWeightTextSize}
          align='center' verticalAlign='middle'
          text={this.props.weight} fontSize={this.props.constants.nodeWeightTextSize} fontStyle='bold' listening={false} />
      </Group>
    )
  }

  click () {
    if (!this.state.locked) {
      this.props.onClick()
    }
  }

  doubleClick () {
    this.setState({locked: true})
    this.props.onDoubleClick(Number(prompt('Please input new weight', 1))) // sorry, EsLint, will keep propmpt() here
  }
}

Node.propTypes = {
  weight: PropTypes.number.isRequired,
  clicked: PropTypes.bool.isRequired,
  nodeIndex: PropTypes.number.isRequired,
  constants: PropTypes.shape({
    nodeDifferenceX: PropTypes.number,
    levelDifferenceY: PropTypes.number,
    nodeRadius: PropTypes.number,
    nodeWeightTextSize: PropTypes.number
  }),
  onClick: PropTypes.func.isRequired,
  onDoubleClick: PropTypes.func.isRequired
}

export default Node
