import React from 'react'
import { hydrate } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import { initialState, StoreProvider, mainReducer } from '@app/store'
import App from './components/App'

let storeState = initialState

if (window.INITIAL_STATE) {
  storeState = { ...storeState, ...window.INITIAL_STATE }
  delete window.INITIAL_STATE
}

const hydrateApp = (Component) => {
  hydrate((
    <StoreProvider state={storeState} reducer={mainReducer}>
      <BrowserRouter>
        {Component}
      </BrowserRouter>
    </StoreProvider>
  ), document.getElementById('root'))
}

if (module.hot) {
  module.hot.accept('./components/App', () => {
    const NextApp = require('./components/App').default
    hydrateApp(<NextApp />)
  })
}

export default hydrateApp(<App />)
