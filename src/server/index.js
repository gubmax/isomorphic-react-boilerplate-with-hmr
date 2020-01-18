import http from 'http'

import app from './main'

const server = http.createServer(app.callback())
let currentApp = app

server.listen(process.env.APP_SERVER_PORT)

if (module.hot) {
  module.hot.accept('./main', () => {
    server.removeListener('request', () => currentApp)
    server.on('request', () => app)
    currentApp = app
  })
}
