/* eslint-disable no-console */
const chalk = require('chalk')

const appName = require('../package.json').name
const {
  PROTOCOL,
  HOST,
  PORT_SERVER,
} = require('../config/env')

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

const consoleLinkMsg = () => {
  console.log(`You can now view ${chalk.bold(appName)} in the browser.\n`)
  console.log(`${chalk.bold('Local:')} ${PROTOCOL}://${HOST}:${chalk.bold(PORT_SERVER)}\n`)
}

const clearConsole = () => {
  const output = process.platform === 'win32' ? '\x1B[2J\x1B[0f' : '\x1B[2J\x1B[3J\x1B[H'
  process.stdout.write(output)
}

const isInteractive = () => process.stdout.isTTY

const createCompiler = (webpack, config, callback) => {
  let result

  try {
    if (callback) {
      result = webpack(config, callback.bind(webpack))
    } else {
      result = webpack(config)
    }
  } catch (err) {
    consoleOutput('ERR', 'Failed to compile.')
    console.log(err.message || err)
    process.exit(1)
  }

  const { hooks } = result.compiler || result

  hooks.invalid.tap('invalid', () => {
    if (isInteractive) {
      clearConsole()
    }
    consoleOutput('INFO', 'Compiling...')
  })

  hooks.done.tap('done', (stats) => {
    const { errors, warnings } = stats.compilation

    if (
      (errors.length || warnings.length)
      && isInteractive
    ) {
      clearConsole()
    }

    if (errors.length) {
      if (errors.length > 1) {
        errors.length = 1
      }
      consoleOutput('ERR', 'Failed to compile.')
      console.log(errors.join('\n\n'))
      return false
    }

    if (warnings.length) {
      consoleOutput('WARN', 'Compiled with warnings.')
      console.log(warnings.join('\n\n'))
    }

    return true
  })

  return result
}

module.exports = {
  consoleOutput,
  consoleLinkMsg,
  clearConsole,
  isInteractive,
  createCompiler,
}
