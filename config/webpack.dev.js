const { merge } = require('webpack-merge')

const common = require('./webpack.common')

module.exports = merge(common, {
  // Установите режим для development или production
  mode: 'development',
  // Управляйте тем, как создаются исходные карты
  devtool: 'inline-source-map',

  // Поднять сервер для быстрой разработки
  devServer: {
    historyApiFallback: true,
    open: true,
    compress: true,
    hot: true,
  },

  module: {
    rules: [
      // Styles: Вставьте CSS в head с помощью исходных карт
      {
        test: /\.(sass|scss|css)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { sourceMap: true, importLoaders: 1, modules: false },
          },
          { loader: 'postcss-loader', options: { sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },
    ],
  },
})
