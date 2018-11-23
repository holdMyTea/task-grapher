import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class Results extends React.Component {
  render () {
    return null
  }

  calculate () {
    const arr = this.props.nodes.flat(2).map((node, index, array) => {
      console.log('log')
    })
  }

  criticalDistanceFromStart () {
    
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
