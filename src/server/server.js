/* eslint-disable no-console */
import Koa from 'koa'
import Router from 'koa-router'

import { clearConsole, consoleOutput } from '@config/etc'
import serverRenderer from './serverRenderer'

const app = new Koa()
const router = new Router()

router
  .post('/users', async (ctx) => {
    ctx.body = ([
      {
        id: 0,
        name: 'Maxim',
      },
      {
        id: 1,
        name: 'John',
      },
      {
        id: 2,
        name: 'Anna',
      },
    ])
  })
  .get('/*', serverRenderer)

app.use(router.routes())

app.on('error', (err) => {
  clearConsole()
  consoleOutput('ERR', 'Runtime error on server side')
  console.error(err)
})

export default app
