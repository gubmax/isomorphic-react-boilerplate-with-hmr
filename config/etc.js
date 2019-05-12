/* eslint-disable no-console */
const chalk = require('chalk')

const consoleLog = (type, text) => {
  const colorsByType = {
    INFO: 'cyan',
    DONE: 'green',
    WARN: 'yellow',
    ERR: 'red',
  }

  const currColor = colorsByType[type]

  console.log(chalk[currColor].inverse(` ${type} `), chalk[currColor](`${text}\n`))
}

const clearConsole = () => {
  const output = process.platform === 'win32' ? '\x1B[2J\x1B[0f' : '\x1B[2J\x1B[3J\x1B[H'
  process.stdout.write(output)
}

const isInteractive = () => process.stdout.isTTY

const createCompiler = (webpack, config) => {
  let compiler

  try {
    compiler = webpack(config)
  } catch (err) {
    consoleLog('ERR', 'Failed to compile on client side.')
    console.log(err.message || err)
    process.exit(1)
  }

  const { hooks } = compiler

  hooks.invalid.tap('invalid', () => {
    if (isInteractive) {
      clearConsole()
    }
    consoleLog('INFO', 'Compiling...')
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
      consoleLog('ERR', 'Failed to compile on client side.')
      console.log(errors)
      return false
    }

    if (warnings.length) {
      consoleLog('WARN', 'Compiled with warnings on client side.')
      console.log(warnings)
    }

    return true
  })

  return compiler
}

module.exports = {
  consoleLog,
  clearConsole,
  isInteractive,
  createCompiler,
}
