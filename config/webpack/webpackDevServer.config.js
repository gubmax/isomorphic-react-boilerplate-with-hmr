const config = require('./webpack.config.app.dev')

const {
  APP_PROTOCOL, APP_HOST, APP_SERVER_PORT, APP_PORT,
} = process.env
const paths = require('../paths')

module.exports = {
  compress: true,
  clientLogLevel: 'none',
  contentBase: paths.appPublic,
  watchContentBase: true,
  hot: true,
  publicPath: config.output.publicPath,
  quiet: true,
  https: APP_PROTOCOL === 'https',
  host: APP_HOST,
  port: APP_PORT,
  headers: {
    'Access-Control-Allow-Origin': `http://${APP_HOST}:${APP_SERVER_PORT}`,
  },
  overlay: false,
  historyApiFallback: {
    disableDotRule: true,
  },
}
