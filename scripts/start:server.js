/* eslint-disable no-console */
const webpack = require('webpack')

const webpackConfig = require('../config/webpack/webpack.config.server.dev')
const createCompiler = require('../config/etc/createCompiler')
const removeDist = require('../config/etc/removeDist')
const { consoleOutput, consoleSuccessMsg, consoleServerLink } = require('../config/etc/console')

process.env.BABEL_ENV = 'development'
process.env.NODE_ENV = 'development'

removeDist()

consoleOutput('INFO', 'Starting development server...')

createCompiler(webpack, webpackConfig, (err, stats) => {
  if (err || stats.hasErrors()) {
    consoleOutput('ERR', 'Failed to compile.')
    console.log(err || stats.compilation.errors)
    return false
  }

  if (process.send) {
    process.send(true)
  } else {
    consoleSuccessMsg()
    consoleServerLink()
  }

  return true
})
