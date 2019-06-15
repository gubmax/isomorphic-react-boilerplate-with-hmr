/* eslint-disable no-console */
const fs = require('fs')
const path = require('path')
const webpack = require('webpack')

const webpackConfig = require('../config/webpack.config.server.dev')
const {
  isInteractive,
  consoleLinkMsg,
  clearConsole,
  consoleOutput,
  createCompiler,
} = require('../config/etc')

process.env.BABEL_ENV = 'development'
process.env.NODE_ENV = 'development'

const directoryPath = './dist/server'
consoleOutput('INFO', `Remove files from directory "${directoryPath}"...`)

fs.readdir(directoryPath, (err, files) => {
  if (err) {
    consoleOutput('WARN', `Files from directory "${directoryPath}" were not deleted.`)
    return false
  }

  files.forEach((file) => {
    fs.unlink(path.join(directoryPath, file), () => {})
  })

  return true
})

consoleOutput('INFO', 'Starting development server...')

createCompiler(webpack, webpackConfig, (err, stats) => {
  if (isInteractive) {
    clearConsole()
  }

  if (err || stats.hasErrors()) {
    consoleOutput('ERR', 'Failed to compile.')
    console.log(err || stats.compilation.errors)
    return false
  }

  consoleOutput('DONE', 'Compiled successfully!')
  if (isInteractive) {
    consoleLinkMsg()
  }

  return true
})
