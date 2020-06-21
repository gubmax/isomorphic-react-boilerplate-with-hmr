const paths = require('../paths')

function devServerConfigFactory(protocol, host, port, publicPath) {
  return {
    compress: true,
    clientLogLevel: 'none',
    contentBase: paths.appPublic,
    watchContentBase: true,
    hot: true,
    publicPath: publicPath || '/',
    quiet: true,
    https: protocol === 'https',
    host,
    port,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    overlay: false,
    historyApiFallback: {
      disableDotRule: true,
    },
  }
}

module.exports = devServerConfigFactory
