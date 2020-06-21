/* eslint-disable no-console */
const webpack = require('webpack')

process.env.BABEL_ENV = 'development'
process.env.NODE_ENV = 'development'

require('../config/env')
const {
  protocol, host, serverPort, publicUrl,
} = require('../config/settings')
const choosePort = require('../config/etc/choosePort')
const configFactory = require('../config/webpack/webpack.config.server.dev')
const createCompiler = require('../config/etc/createCompiler')
const removeDist = require('../config/etc/removeDist')
const isRootProcess = require('../config/etc/isRootProcess')
const { consoleOutput, consoleSuccessMsg, consoleServerLink } = require('../config/etc/console')

removeDist()

consoleOutput('INFO', 'Starting development server...')

choosePort(host, serverPort).then((currPort) => {
  if (currPort == null) {
    return
  }

  const webpackConfig = configFactory(publicUrl, currPort)

  createCompiler(webpack, webpackConfig, (err, stats) => {
    if (err || stats.hasErrors()) {
      consoleOutput('ERR', 'Failed to compile.')
      console.log(err || stats.compilation.errors)
      return false
    }

    if (!isRootProcess() && process.send) {
      process.send(currPort)
    } else {
      consoleSuccessMsg()
      consoleServerLink(protocol, host, currPort)
    }

    return true
  })
})
