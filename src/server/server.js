import Koa from 'koa'
import Router from 'koa-router'
import React from 'react'
import { renderToString } from 'react-dom/server'

import { PROTOCOL, HOST, PORT_CLIENT } from '@config/env'
import App from '@client/App'

const app = new Koa()
const router = new Router()

router.get('/*', async (ctx) => {
  const application = renderToString(<App />)

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
            <div id="root">${application}</div>
            <script src="${PROTOCOL}://${HOST}:${PORT_CLIENT}/bundle.js"></script>
        </body>
    </html>
  `

  ctx.body = html
})

app.use(router.routes())

export default app
