/* eslint-env node */
const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const {config, componentsPath, loaders} = require('@jetbrains/ring-ui/webpack.config')

componentsPath.push(path.resolve(__dirname, 'src'))
loaders.babelLoader.options.configFile = path.resolve(__dirname, './babel.config.js')
loaders.svgInlineLoader.include.push(require('@jetbrains/icons'))

const webpackConfig = {
  ...config,
  devtool: 'cheap-source-map',
  optimization: {
    minimize: false,
  },
  entry: {
    popup: './src/popup',
    options: './src/options',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'popup.html',
      chunks: ['popup'],
    }),
    new HtmlWebpackPlugin({
      filename: 'options.html',
      chunks: ['options'],
    }),
  ],
}

module.exports = webpackConfig
