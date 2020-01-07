const fs = require('fs')
const path = require('path')

const { consoleOutput } = require('./console')

const removeDist = () => {
  const directoryPath = './dist'

  if (fs.existsSync(directoryPath)) {
    consoleOutput('INFO', `Removing files from directory "${directoryPath}"...`)

    fs.readdirSync(directoryPath)
      .forEach((file) => {
        fs.unlinkSync(path.join(directoryPath, file))
      })

    consoleOutput('INFO', `Files from directory "${directoryPath}" removed!`)
  }
}

module.exports = removeDist
