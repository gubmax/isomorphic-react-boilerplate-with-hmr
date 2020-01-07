import http from 'http'

import { PORT_SERVER } from '@config/env'
import app from './main'

const server = http.createServer(app.callback())
let currentApp = app

server.listen(PORT_SERVER)

if (module.hot) {
  module.hot.accept('./main', () => {
    server.removeListener('request', () => currentApp)
    server.on('request', () => app)
    currentApp = app
  })
}
