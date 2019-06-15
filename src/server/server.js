/* eslint-disable no-console */
import Koa from 'koa'
import Router from 'koa-router'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'

import { PROTOCOL, HOST, PORT_CLIENT } from '@config/env'
import { clearConsole, consoleOutput } from '@config/etc'
import App from '@client/components/App'

const app = new Koa()
const router = new Router()

router.get('/*', async (ctx) => {
  const initialHTML = renderToString((
    <StaticRouter location={ctx.url}>
      <App />
    </StaticRouter>
  ))

  const html = `
    <!doctype html>
    <html lang="ru">
        <head>
            <meta charset="utf-8">
            <meta http-equiv="x-ua-compatible" content="ie=edge">
            <title>Isomorphic react boilerplate with HMR</title>
            <meta name="description" content="">
            <meta name="viewport" content="width=device-width, initial-scale=1">
        </head>
        <body>
            <div id="root">${initialHTML}</div>
            <script src="${PROTOCOL}://${HOST}:${PORT_CLIENT}/bundle.js"></script>
        </body>
    </html> 
  `

  ctx.body = html
})

app.use(router.routes())

app.on('error', (err) => {
  clearConsole()
  consoleOutput('ERR', 'Runtime error on server side')
  console.error(err)
})

export default app
