module.exports = ({
  test: /(\.module)?\.(s?css|sass)$/,
  ...{
    use: [
      'isomorphic-style-loader',
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1,
          modules: {
            mode: 'local',
            localIdentName: '[name]__[local]--[hash:base64:5]',
          },
        },
      },
      {
        loader: 'sass-loader',
        options: {
          sourceMap: true,
        },
      },
    ],
  },
})
