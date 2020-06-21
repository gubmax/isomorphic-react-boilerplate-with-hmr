/* eslint-disable no-console */
const chalk = require('chalk')

const appName = require('../../package.json').name

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

const consoleAppLink = (protocol, host, port) => (
  console.log(`${chalk.bold('App:')} ${protocol}://${host}:${chalk.bold(port)}\n`)
)

const consoleServerLink = (protocol, host, port) => (
  console.log(`${chalk.bold('Server:')} ${protocol}://${host}:${chalk.bold(port)}\n`)
)

module.exports = {
  consoleOutput,
  consoleSuccessMsg,
  consoleAppLink,
  consoleServerLink,
  isInteractive,
  clearConsole,
}
