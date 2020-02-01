const config = require('./webpack.config.app.dev')

const paths = require('../paths')

const { APP_PROTOCOL, APP_HOST, APP_PORT } = process.env

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
    'Access-Control-Allow-Origin': '*',
  },
  overlay: false,
  historyApiFallback: {
    disableDotRule: true,
  },
}
