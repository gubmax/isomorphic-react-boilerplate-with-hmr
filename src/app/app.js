import React from 'react'
import { hydrate } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import StyleContext from 'isomorphic-style-loader/StyleContext'

import { initialState, StoreProvider, mainReducer } from '@app/store'
import App from './components/App'

let storeState = initialState

// Initial Store
if (window.INITIAL_STATE) {
  storeState = { ...storeState, ...window.INITIAL_STATE }
  delete window.INITIAL_STATE
}

// Critical Styles
const insertCss = (...styles) => {
  const removeCss = styles.map(
    (style) => style._insertCss(), // eslint-disable-line no-underscore-dangle
  )
  return () => removeCss.forEach((dispose) => dispose())
}

const hydrateApp = (Component) => {
  hydrate((
    <StyleContext.Provider value={{ insertCss }}>
      <StoreProvider state={storeState} reducer={mainReducer}>
        <BrowserRouter>
          {Component}
        </BrowserRouter>
      </StoreProvider>
    </StyleContext.Provider>
  ), document.getElementById('root'))
}

if (module.hot) {
  module.hot.accept('./components/App', () => {
    const NextApp = require('./components/App').default
    hydrateApp(<NextApp />)
  })
}

export default hydrateApp(<App />)
