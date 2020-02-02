/* eslint-disable no-console */
import Koa from 'koa'
import cors from '@koa/cors'
import serve from 'koa-static'

import paths from '@config/paths'
import { clearConsole, consoleOutput } from '@config/etc/console'
import router from './router'

const app = new Koa()

const corsOptions = {
  'Access-Control-Allow-Origin': '*',
}

app.use(cors(corsOptions))
app.use(router.routes())
app.use(serve(paths.appPublic))

app.on('error', (err) => {
  clearConsole()
  consoleOutput('ERR', 'Runtime error on server side')
  console.error(err)
})

export default app
