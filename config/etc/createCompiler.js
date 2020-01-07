/* eslint-disable no-console */
const { consoleOutput, clearConsole } = require('./console')

const createCompiler = (webpack, config, callback) => {
  let result

  try {
    if (callback) {
      result = webpack(config, callback.bind(webpack))
    } else {
      result = webpack(config)
    }
  } catch (err) {
    clearConsole()
    consoleOutput('ERR', 'Failed to compile.')
    console.log(err.message || err)
    process.exit(1)
  }

  const { hooks } = result.compiler || result

  hooks.invalid.tap('invalid', () => {
    clearConsole()
    consoleOutput('INFO', 'Compiling...')
  })

  hooks.done.tap('done', (stats) => {
    const { errors, warnings } = stats.compilation

    if (errors.length || warnings.length) {
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

module.exports = createCompiler
