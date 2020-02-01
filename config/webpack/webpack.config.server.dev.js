const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')

const StartServerPlugin = require('./StartServerWebpackPlugin')
const paths = require('../paths')

const { APP_PUBLIC_URL } = process.env

module.exports = {
  name: 'server',
  target: 'node',
  mode: 'development',
  watch: true,
  devtool: 'source-map',
  entry: [
    'webpack/hot/poll?1000',
    paths.appServerIndex,
  ],
  output: {
    path: paths.appDist,
    filename: 'bundle.node.js',
    publicPath: paths.appPublic,
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
        test: /\.html$/,
        include: [paths.appHtml],
        use: [
          {
            options: {
              serializeFuncPath: `${paths.appPath}/src/server/serializeHtmlTemplateFunc.js`,
              replaceableVariables: { APP_PUBLIC_URL },
            },
            loader: `${paths.appPath}/config/webpack/serializeHtmlTemplateLoader.js`,
          },
        ],
      },
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
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
    }),
  ],
}
