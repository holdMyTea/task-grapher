import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { calculateTask8 } from '../calcualtions'

class Results extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      text: ''
    }
  }

  render () {
    console.log(this.state.text)
    return (
      <div width={100}>
        <button onClick={() => this.setState({
          text: String(calculateTask8(this.props.nodes))
        })}>Ebosh</button>
        <p>{this.state.text}</p>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return state
}

Results.propTypes = {
  nodes: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        weight: PropTypes.number,
        clicked: PropTypes.bool
      })
    )
  ),
  connections: PropTypes.arrayOf(
    PropTypes.shape({
      from: PropTypes.shape({
        levelId: PropTypes.number,
        nodeId: PropTypes.number
      }),
      to: PropTypes.shape({
        levelId: PropTypes.number,
        nodeId: PropTypes.number
      })
    })
  )
}

export default connect(
  mapStateToProps
)(Results)
