import React from 'react'
import { hydrate } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import App from './components/App'

const hydrateApp = (Component) => {
  hydrate((
    <BrowserRouter>
      {Component}
    </BrowserRouter>
  ), document.getElementById('root'))
}

hydrateApp(<App />)

if (module.hot) {
  module.hot.accept('./components/App', () => {
    // eslint-disable-next-line global-require
    const NextApp = require('./components/App').default
    hydrateApp(<NextApp />)
  })
}
