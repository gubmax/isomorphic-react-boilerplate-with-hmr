/* eslint-disable no-console */

const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')

const { HOST, PORT_CLIENT } = require('../config/env')
const webpackConfig = require('../config/webpack.config.client.dev')
const webpackDevServerConfig = require('../config/webpackDevServer.config')
const {
  consoleOutput,
  consoleLinkMsg,
  clearConsole,
  isInteractive,
  createCompiler,
} = require('../config/etc')

process.env.BABEL_ENV = 'development'
process.env.NODE_ENV = 'development'

consoleOutput('INFO', 'Starting webpack-dev-server...')

process.on('unhandledRejection', (err) => {
  consoleOutput('ERR', 'Failed to compile for webpack-dev-server.')
  throw err
})

const compiler = createCompiler(webpack, webpackConfig)
const devServer = new WebpackDevServer(compiler, webpackDevServerConfig)
let isNotFirstCompile = false

devServer.listen(PORT_CLIENT, HOST, (err) => {
  if (isInteractive && isNotFirstCompile) {
    clearConsole()
  }

  if (err) {
    consoleOutput('ERR', 'Webpack-dev-server failed to start.')
    console.log(err)
    return false
  }

  consoleOutput('DONE', 'Webpack-dev-server started!')
  if (isInteractive && isNotFirstCompile) {
    consoleLinkMsg()
  } else {
    isNotFirstCompile = true
  }

  return true
})

Array.of('SIGINT', 'SIGTERM').forEach((sig) => {
  process.on(sig, () => {
    devServer.close()
    process.exit()
  })
})
