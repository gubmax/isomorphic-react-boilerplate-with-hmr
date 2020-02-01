import React from 'react'
import { hydrate } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import { RootStateProvider, rootReducer } from '@utils'
import App from './components/App'

let initialState = {}

if (window.INITIAL_STATE) {
  initialState = window.INITIAL_STATE
  delete window.INITIAL_STATE
}

const hydrateApp = (Component) => {
  hydrate((
    <RootStateProvider state={initialState} reducer={rootReducer}>
      <BrowserRouter>
        {Component}
      </BrowserRouter>
    </RootStateProvider>
  ), document.getElementById('root'))
}

hydrateApp(<App />)

if (module.hot) {
  module.hot.accept('./components/App', () => {
    const NextApp = require('./components/App').default
    hydrateApp(<NextApp />)
  })
}
