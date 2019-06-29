import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter, matchPath } from 'react-router-dom'

import { PROTOCOL, HOST, PORT_CLIENT } from '@config/env'
import {
  routes,
  getInitialProps,
  RootStateProvider,
  rootReducer,
} from '@utils'
import App from '@components/App'

const getData = url => (
  routes
    .filter(route => matchPath(url, route) && !!route.initialActionType)
    .map(({ initialActionType }) => (
      getInitialProps(
        url,
        obj => rootReducer({}, obj),
        initialActionType,
      )
    ))
)

const serverRenderer = async (ctx) => {
  const promises = getData(ctx.url)

  await Promise.all(promises).then((res) => {
    const initialState = res.reduce((acc, val) => (
      val
        ? { ...acc, ...val }
        : acc
    ), {})

    const initialHTML = renderToString((
      <RootStateProvider state={initialState}>
        <StaticRouter location={ctx.url}>
          <App />
        </StaticRouter>
      </RootStateProvider>
    ))

    const html = `
      <!doctype html>
      <html lang="ru">
        <head>
          <meta charset="utf-8">
          <meta http-equiv="x-ua-compatible" content="ie=edge">
          <title>Isomorphic react boilerplate</title>
          <meta name="description" content="">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <!-- JavaScripts -->
          <script type="text/javascript" id="state">
              window.INITIAL_STATE = ${JSON.stringify(initialState).replace(/</g, '\\u003c')};
              document.getElementById('state').remove();
          </script>
        </head>
        <body>
          <div id="root">${initialHTML}</div>
          <script src="${PROTOCOL}://${HOST}:${PORT_CLIENT}/bundle.js"></script>
        </body>
      </html> 
    `

    ctx.body = html
  })
}

export default serverRenderer
