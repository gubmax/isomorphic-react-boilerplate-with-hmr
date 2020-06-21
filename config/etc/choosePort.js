const detect = require('detect-port-alt')
const { consoleOutput } = require('./console')

const choosePort = (host, defaultPort) => (
  detect(defaultPort, host).then((port, err) => {
    if (err) {
      throw err
    }

    if (Number(defaultPort) !== port) {
      consoleOutput('ERR', `Port ${defaultPort} was occupied, try ${port}.`)
      return null
    }

    return port
  })
)

module.exports = choosePort
