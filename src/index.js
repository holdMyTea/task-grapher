import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'

import reducers from './reducers'
import Board from './containers/Board.js'
import '../public/styles/style.scss'

const loggerMiddleware = createLogger()

const store = createStore(
  reducers,
  applyMiddleware(
    loggerMiddleware
  )
)

render(
  <Provider store={store}>
    <Board />
  </Provider>,
  document.getElementById('app')
)
