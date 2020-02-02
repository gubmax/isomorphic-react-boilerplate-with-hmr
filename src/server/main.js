import http from 'http'

import app from './app'

const server = http.createServer(app.callback())

server.listen(process.env.APP_SERVER_PORT)

if (module.hot) {
  let currentApp = app
  module.hot.accept('./app', () => {
    server.removeListener('request', () => currentApp)
    server.on('request', () => app)
    currentApp = app
  })
}

export default server
