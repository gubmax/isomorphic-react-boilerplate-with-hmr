import http from 'http'

import { serverPort } from '@config/settings'
import app from './app'

const server = http.createServer(app.callback())

server.listen(serverPort)

if (module.hot) {
  let currentApp = app
  module.hot.accept('./app', () => {
    server.removeListener('request', () => currentApp)
    server.on('request', () => app)
    currentApp = app
  })
}

export default server
