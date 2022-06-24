// const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const paths = require('./paths')

module.exports = {
  // Где webpack смотрит, чтобы начать сборку пакета
  entry: [paths.src + '/index.js'],

  // Где webpack выводит активы и пакеты
  output: {
    path: paths.build,
    filename: '[name].bundle.js',
    publicPath: '/',
    clean: true, // Очищает директорию dist перед обновлением бандла Свойство стало доступно с версии 5.20.0, до этого использовался CleanWebpackPlugin
  },

  // Настройте процесс сборки веб-пакета
  plugins: [
    // Удаляет/очищает папки сборки и неиспользуемые активы при перестроении
    // new CleanWebpackPlugin(),

    // Копирует файлы из целевой папки в целевую
    new CopyWebpackPlugin({
      patterns: [
        {
          from: paths.public,
          to: 'assets',
          globOptions: {
            ignore: ['*.DS_Store'],
          },
          noErrorOnMissing: true,
        },
      ],
    }),

    // Генерирует HTML-файл из шаблона
    // Генерирует предупреждение об устаревании: https://github.com/jantimon/html-webpack-plugin/issues/1501
    new HtmlWebpackPlugin({
      title: 'WEBPACK-5 | JS',
      favicon: './public/favicon.png',
      template: './public/index.html', // файл шаблона
      filename: 'index.html', // исходящие файл
    }),
  ],

  // Определяет, как обрабатываются модули в рамках проекта
  module: {
    rules: [
      // JavaScript: Используйте Babel для переноса файлов JavaScript
      { test: /\.js$/, use: ['babel-loader'] },

      // Images: Скопируйте файлы изображений в папку сборки
      { test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: 'asset/resource' },

      // Fonts and SVGs: Встроенные файлы
      { test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, type: 'asset/inline' },
    ],
  },

  resolve: {
    modules: [paths.src, 'node_modules'],
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@': paths.src,
      assets: paths.public,
    },
  },
}
