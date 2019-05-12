/* eslint-disable no-console */

const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')

const { HOST, PORT_CLIENT } = require('../config/env')
const webpackConfig = require('../config/webpack.config.client.dev')
const webpackDevServerConfig = require('../config/webpackDevServer.config')
const {
  consoleLog,
  clearConsole,
  isInteractive,
  createCompiler,
} = require('../config/etc')

process.env.BABEL_ENV = 'development'
process.env.NODE_ENV = 'development'

process.on('unhandledRejection', (err) => {
  consoleLog('ERR', 'Failed to compile.\n')
  throw err
})

const compiler = createCompiler(webpack, webpackConfig)
const devServer = new WebpackDevServer(compiler, webpackDevServerConfig)

devServer.listen(PORT_CLIENT, HOST, (err) => {
  if (isInteractive) {
    clearConsole()
  }

  if (err) {
    return console.log(err)
  }

  consoleLog('INFO', 'Starting the development server...\n')

  Array.of('SIGINT', 'SIGTERM').forEach((sig) => {
    process.on(sig, () => {
      devServer.close()
      process.exit()
    })
  })

  return true
})
