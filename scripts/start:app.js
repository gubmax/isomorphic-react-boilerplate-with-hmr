/* eslint-disable no-console */
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')

process.env.BABEL_ENV = 'development'
process.env.NODE_ENV = 'development'

require('../config/env')
const webpackConfig = require('../config/webpack/webpack.config.app.dev')
const webpackDevServerConfig = require('../config/webpack/webpackDevServer.config')
const createCompiler = require('../config/etc/createCompiler')
const { consoleOutput, consoleSuccessMsg, consoleAppLink } = require('../config/etc/console')

consoleOutput('INFO', 'Starting webpack-dev-server...')

process.on('unhandledRejection', (err) => {
  consoleOutput('ERR', 'Failed to compile for webpack-dev-server.')
  throw err
})

const compiler = createCompiler(webpack, webpackConfig)
const devServer = new WebpackDevServer(compiler, webpackDevServerConfig)
const { APP_HOST, APP_PORT } = process.env

devServer.listen(APP_PORT, APP_HOST, (err) => {
  if (err) {
    consoleOutput('ERR', 'Webpack-dev-server failed to start.')
    console.log(err)
    return false
  }

  if (process.send) {
    process.send(true)
  } else {
    consoleSuccessMsg()
    consoleAppLink()
  }

  return true
})

Array.of('SIGINT', 'SIGTERM').forEach((sig) => {
  process.on(sig, () => {
    devServer.close()
    process.exit()
  })
})
