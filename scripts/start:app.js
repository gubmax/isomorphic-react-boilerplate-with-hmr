/* eslint-disable no-console */
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')

process.env.BABEL_ENV = 'development'
process.env.NODE_ENV = 'development'

require('../config/env')
const {
  protocol, host, port, publicUrl,
} = require('../config/settings')
const choosePort = require('../config/etc/choosePort')
const configFactory = require('../config/webpack/webpack.config.app.dev')
const devServerConfigFactory = require('../config/webpack/webpackDevServer.config')
const createCompiler = require('../config/etc/createCompiler')
const isRootProcess = require('../config/etc/isRootProcess')
const { consoleOutput, consoleSuccessMsg, consoleAppLink } = require('../config/etc/console')

consoleOutput('INFO', 'Starting webpack-dev-server...')

choosePort(host, port).then((currPort) => {
  if (currPort == null) {
    return
  }

  process.on('unhandledRejection', (err) => {
    consoleOutput('ERR', 'Failed to compile for webpack-dev-server.')
    throw err
  })

  const webpackConfig = configFactory(port, publicUrl)
  const compiler = createCompiler(webpack, webpackConfig)
  const webpackDevServerConfig = devServerConfigFactory(
    protocol, host, port, webpackConfig.output.publicPath,
  )
  const devServer = new WebpackDevServer(compiler, webpackDevServerConfig)

  devServer.listen(currPort, host, (err) => {
    if (err) {
      consoleOutput('ERR', 'Webpack-dev-server failed to start.')
      console.log(err)
      return false
    }

    if (!isRootProcess() && process.send) {
      process.send(currPort)
    } else {
      consoleSuccessMsg()
      consoleAppLink(protocol, host, currPort)
    }

    return true
  })

  Array.of('SIGINT', 'SIGTERM').forEach((sig) => {
    process.on(sig, () => {
      devServer.close()
      process.exit()
    })
  })
})
