/* eslint-disable no-console */
const chalk = require('chalk')

const appName = require('../../package.json').name
const {
  PROTOCOL, HOST, PORT_APP, PORT_SERVER,
} = require('../env')

const consoleOutput = (type, text) => {
  const colorsByType = {
    INFO: 'cyan',
    DONE: 'green',
    WARN: 'yellow',
    ERR: 'red',
  }

  const currColor = colorsByType[type]

  console.log(chalk[currColor].inverse(` ${type} `), chalk[currColor](`${text}\n`))
}

const isInteractive = () => process.stdout.isTTY

const clearConsole = () => {
  const output = process.platform === 'win32' ? '\x1B[2J\x1B[0f' : '\x1B[2J\x1B[3J\x1B[H'

  if (isInteractive) {
    process.stdout.write(output)
  }
}

const consoleSuccessMsg = () => {
  clearConsole()
  consoleOutput('DONE', 'Compiled successfully!')
  console.log(`You can now view ${chalk.bold(appName)} in the browser.\n`)
}

const consoleAppLink = () => console.log(`${chalk.bold('App:')} ${PROTOCOL}://${HOST}:${chalk.bold(PORT_APP)}\n`)

const consoleServerLink = () => console.log(`${chalk.bold('Server:')} ${PROTOCOL}://${HOST}:${chalk.bold(PORT_SERVER)}\n`)

module.exports = {
  consoleOutput,
  consoleSuccessMsg,
  consoleAppLink,
  consoleServerLink,
  isInteractive,
  clearConsole,
}
