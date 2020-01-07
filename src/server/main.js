/* eslint-disable no-console */
import Koa from 'koa'

import { clearConsole, consoleOutput } from '@config/etc/console'
import router from './router'

const app = new Koa()

app.use(router.routes())

app.on('error', (err) => {
  clearConsole()
  consoleOutput('ERR', 'Runtime error on server side')
  console.error(err)
})

export default app
