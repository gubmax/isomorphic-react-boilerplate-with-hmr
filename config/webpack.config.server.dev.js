const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')

const StartServerPlugin = require('./StartServerWebpackPlugin')

const paths = require('./paths')

module.exports = {
  name: 'server',
  target: 'node',
  mode: 'development',
  watch: true,
  entry: [
    'webpack/hot/poll?1000',
    paths.appServerIndex,
  ],
  output: {
    path: paths.appServerDist,
    filename: 'bundle.node.js',
    publicPath: '/',
  },
  externals: [
    nodeExternals({ whitelist: ['webpack/hot/poll?1000'] }),
  ],
  resolve: {
    alias: paths.appAliases,
  },
  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx)$/,
        enforce: 'pre',
        use: [
          {
            options: {
              eslintPath: require.resolve('eslint'),
            },
            loader: require.resolve('eslint-loader'),
          },
        ],
        include: paths.appSrc,
      },
      {
        test: /\.js?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new StartServerPlugin('bundle.node.js'),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
}
