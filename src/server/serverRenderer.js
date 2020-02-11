import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter, matchPath } from 'react-router-dom'
import StyleContext from 'isomorphic-style-loader/StyleContext'

import { routes } from '@helpers'
import { StoreProvider, mainReducer, initialState } from '@app/store'
import App from '@app/components/App'
import getHtmlTemplate from '@public/index.html'

const getData = (url) => {
  const matchRoutes = routes
    .filter((route) => matchPath(url, route))

  if (matchRoutes.length === 0) {
    return null
  }

  return matchRoutes.reduce((acc, route) => {
    let component = require(`${__dirname}/../app/components/pages/${route.componentName}`)

    if (component.default) {
      component = component.default
    }

    if (typeof component.getInitialProps === 'function') {
      const initialPropsPromise = component.getInitialProps(
        (initializerArg) => mainReducer(initialState, initializerArg),
      )
      acc.push(initialPropsPromise)
    }

    return acc
  }, [])
}

const joinStoreState = (arr) => (
  arr.reduce((acc, val) => (
    val
      ? { ...acc, ...val }
      : acc
  ), {})
)

const serverRenderer = async (ctx, next) => {
  const promises = getData(ctx.url)

  if (promises === null) {
    await next()
    return
  }

  await Promise.all(promises).then((res) => {
    // Initial Store
    const storeState = joinStoreState(res)

    // Critical Styles
    const css = new Set()
    const insertCss = (...styles) => styles.forEach((style) => (
      css.add(style._getCss()) // eslint-disable-line no-underscore-dangle
    ))

    const initialHtml = renderToString((
      <StyleContext.Provider value={{ insertCss }}>
        <StoreProvider state={storeState}>
          <StaticRouter location={ctx.url}>
            <App />
          </StaticRouter>
        </StoreProvider>
      </StyleContext.Provider>
    ))

    ctx.body = getHtmlTemplate(initialHtml, [...css].join(''), storeState)
  })
}

export default serverRenderer
