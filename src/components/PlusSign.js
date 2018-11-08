import React from 'react'
import PropTypes from 'prop-types'
import { Shape } from 'react-konva'

const PlusSign = ({offsetX = 0, offsetY = 0}) => {
  return (
    <Shape
      sceneFunc={(context, shape) => {
        context.beginPath()
        context.moveTo(offsetX + 20, offsetY + 0)
        context.lineTo(offsetX + 40, offsetY + 0)
        context.lineTo(offsetX + 40, offsetY + 20)
        context.lineTo(offsetX + 60, offsetY + 20)
        context.lineTo(offsetX + 60, offsetY + 40)
        context.lineTo(offsetX + 40, offsetY + 40)
        context.lineTo(offsetX + 40, offsetY + 60)
        context.lineTo(offsetX + 20, offsetY + 60)
        context.lineTo(offsetX + 20, offsetY + 40)
        context.lineTo(offsetX + 0, offsetY + 40)
        context.lineTo(offsetX + 0, offsetY + 20)
        context.lineTo(offsetX + 20, offsetY + 20)
        context.closePath()
        context.fillStrokeShape(shape)
      }}
      fill="#00D2FF"
      stroke="black"
      strokeWidth={4}
    />
  )
}

PlusSign.propTypes = {
  offsetX: PropTypes.number,
  offsetY: PropTypes.number
}

export default PlusSign
