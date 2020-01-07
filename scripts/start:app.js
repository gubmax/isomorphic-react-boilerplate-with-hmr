/* eslint-disable no-console */
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')

const { HOST, PORT_APP } = require('../config/env')
const webpackConfig = require('../config/webpack/webpack.config.app.dev')
const webpackDevServerConfig = require('../config/webpack/webpackDevServer.config')
const createCompiler = require('../config/etc/createCompiler')
const { consoleOutput, consoleSuccessMsg, consoleAppLink } = require('../config/etc/console')

process.env.BABEL_ENV = 'development'
process.env.NODE_ENV = 'development'

consoleOutput('INFO', 'Starting webpack-dev-server...')

process.on('unhandledRejection', (err) => {
  consoleOutput('ERR', 'Failed to compile for webpack-dev-server.')
  throw err
})

const compiler = createCompiler(webpack, webpackConfig)
const devServer = new WebpackDevServer(compiler, webpackDevServerConfig)

devServer.listen(PORT_APP, HOST, (err) => {
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
