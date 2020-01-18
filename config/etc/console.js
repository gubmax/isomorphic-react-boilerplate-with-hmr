/* eslint-disable no-console */
const chalk = require('chalk')

const appName = require('../../package.json').name

const {
  APP_PROTOCOL, APP_HOST, APP_PORT, APP_SERVER_PORT,
} = process.env

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

const consoleAppLink = () => console.log(`${chalk.bold('App:')} ${APP_PROTOCOL}://${APP_HOST}:${chalk.bold(APP_PORT)}\n`)

const consoleServerLink = () => console.log(`${chalk.bold('Server:')} ${APP_PROTOCOL}://${APP_HOST}:${chalk.bold(APP_SERVER_PORT)}\n`)

module.exports = {
  consoleOutput,
  consoleSuccessMsg,
  consoleAppLink,
  consoleServerLink,
  isInteractive,
  clearConsole,
}
