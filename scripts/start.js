const { fork } = require('child_process')

process.env.BABEL_ENV = 'development'
process.env.NODE_ENV = 'development'

require('../config/env')
const {
  protocol, host, port, serverPort,
} = require('../config/settings')
const paths = require('../config/paths')
const {
  consoleOutput, consoleSuccessMsg, consoleAppLink, consoleServerLink,
} = require('../config/etc/console')

const workersArr = [
  {
    name: 'start:app',
    display: () => consoleOutput('INFO', 'Webpack-dev-server started!'),
  },
  {
    name: 'start:server',
    display: () => consoleOutput('INFO', 'Development server started!'),
  },
]

let completeWorkersCount = 0
let isNotFirstCompilling = false

const onMessage = (display) => {
  const consoleMsg = () => {
    consoleSuccessMsg()
    consoleAppLink(protocol, host, port)
    consoleServerLink(protocol, host, serverPort)
  }

  if (isNotFirstCompilling) {
    consoleMsg()
    return
  }

  display()
  completeWorkersCount += 1

  if (completeWorkersCount === workersArr.length) {
    consoleMsg()
    isNotFirstCompilling = true
  }
}

const spawnWorker = (name, display) => (
  fork(`${paths.appPath}/scripts/${name}.js`)
    .on('message', () => onMessage(display))
)

workersArr.forEach(({ name, display }) => {
  spawnWorker(name, display)
})
