/* eslint-disable no-console */

const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const chalk = require('chalk')

const webpackConfig = require('../config/webpack.config.server.dev')
const { PROTOCOL, HOST, PORT_SERVER } = require('../config/env')
const appName = require('../package.json').name
const {
  consoleLog,
  isInteractive,
  clearConsole,
} = require('../config/etc')

process.env.BABEL_ENV = 'development'
process.env.NODE_ENV = 'development'

const directory = './dist/server'

fs.readdir(directory, (err, files) => {
  if (err) return false

  files.forEach((file) => {
    fs.unlink(path.join(directory, file), () => {})
  })

  return true
})

webpack(webpackConfig, (err, stats) => {
  if (isInteractive) {
    clearConsole()
  }

  if (err || stats.hasErrors()) {
    consoleLog('ERR', 'Failed to compile on server side.')
    console.log(err || stats.compilation.errors)
    return false
  }

  consoleLog('DONE', 'Compiled successfully!')
  console.log(`You can now view ${chalk.bold(appName)} in the browser.\n`)
  console.log(`${chalk.bold('URL:')} ${PROTOCOL}://${HOST}:${PORT_SERVER}\n`)
  return true
})
