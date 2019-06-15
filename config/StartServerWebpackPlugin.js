const cluster = require('cluster')

const { PORT_SERVER } = require('./env')
const {
  clearConsole,
  isInteractive,
  consoleOutput,
} = require('./etc')

class StartServerPlugin {
  constructor(options) {
    if (options == null || typeof options !== 'string') {
      if (isInteractive) {
        clearConsole()
      }
      consoleOutput('ERR', '[StartServerPlugin] Argument must be a string')
      process.exit()
    }

    this.bundleName = options
    this.worker = null
    this.afterEmit = this.afterEmit.bind(this)
    this.apply = this.apply.bind(this)
    this.startServer = this.startServer.bind(this)
  }

  startServer(compilation, callback) {
    const { bundleName } = this
    const { assets } = compilation
    const assetName = assets[bundleName]

    if (!assetName) {
      const allAssetsNames = Object.keys(assets)
      clearConsole()
      consoleOutput('ERR', `[StartServerPlugin] Entry name not found. Try one of: ${allAssetsNames.join(' ')}`)
      process.exit()
    }

    const clusterOptions = {
      exec: assetName.existsAt,
      inspectPort: PORT_SERVER,
    }

    cluster.setupMaster(clusterOptions)

    cluster.on('online', (worker) => {
      this.worker = worker
    })

    cluster.on('error', (err) => {
      consoleOutput('ERR', err)
    })

    cluster.fork()
    callback()
  }

  afterEmit(compilation, callback) {
    const { worker, startServer } = this

    if (worker && worker.isConnected()) {
      process.kill(worker.process.pid)
    }

    startServer(compilation, callback)
  }

  apply(compiler) {
    const { afterEmit } = this
    const { hooks } = compiler
    hooks.afterEmit.tapAsync('StartServerPlugin', afterEmit)
  }
}

module.exports = StartServerPlugin
