const webpack = require('webpack')

const { APP_PORT } = process.env
const paths = require('../paths')

module.exports = {
  name: 'app',
  target: 'web',
  mode: 'development',
  devtool: 'cheap-module-source-map',
  entry: [
    `webpack-dev-server/client?http://localhost:${APP_PORT}`,
    'webpack/hot/only-dev-server',
    paths.appIndex,
  ],
  output: {
    pathinfo: true,
    path: paths.appDist,
    filename: 'bundle.js',
    publicPath: `http://localhost:${APP_PORT}/`,
  },
  resolve: {
    extensions: paths.moduleFileExtensions,
    alias: paths.appAliases,
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        parser: {
          requireEnsure: false,
        },
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
        oneOf: [
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve('url-loader'),
            options: {
              limit: 10000,
              name: 'static/media/[name].[hash:8].[ext]',
            },
          },
          {
            test: /\.(js|mjs|jsx)$/,
            include: paths.appSrc,
            loader: require.resolve('babel-loader'),
            options: {
              cacheDirectory: true,
              cacheCompression: false,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env),
    }),
  ],
}
