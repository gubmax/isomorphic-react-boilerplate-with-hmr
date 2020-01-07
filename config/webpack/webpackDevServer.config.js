const config = require('./webpack.config.app.dev')

const {
  PROTOCOL, HOST, PORT_SERVER, PORT_APP,
} = require('../env')
const paths = require('../paths')

module.exports = {
  compress: true,
  clientLogLevel: 'none',
  contentBase: paths.appPublic,
  watchContentBase: true,
  hot: true,
  publicPath: config.output.publicPath,
  quiet: true,
  https: PROTOCOL === 'https',
  host: HOST,
  port: PORT_APP,
  headers: {
    'Access-Control-Allow-Origin': `http://${HOST}:${PORT_SERVER}`,
  },
  overlay: false,
  historyApiFallback: {
    disableDotRule: true,
  },
}
