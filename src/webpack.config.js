const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoader = require('vue-loader/lib/plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const dev = true;
const root = path.resolve(__dirname, './dist');

module.exports = {
  watchOptions: {
    ignored: /node_modules/
  },
  entry: {
    'index': path.resolve(__dirname, 'src', 'js', 'index.js'),
    '404': path.resolve(__dirname, 'src', 'js', '404.js')
  },
  output: {
    path: root,
    publicPath: '/',
    filename: 'js/[name].bundle.js'
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js',
      '@v': path.resolve(__dirname, 'src', 'views'),
      '@s': path.resolve(__dirname, 'src', 'styles'),
      '@c': path.resolve(__dirname, 'src', 'components'),
    }
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      }
    ]
  },
  devtool: dev ? 'inline-source-map' : '',
  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: !dev
    }),
    new VueLoader(),
    new HtmlWebpackPlugin({
      template: path.resolve('src/views/index.html'),
      filename: 'views/index.html',
      chunks: ['index'],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve('src/views/404.html'),
      filename: 'views/404.html',
      chunks: ['404'],
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/assets', to: 'assets' }
      ],
    }),
  ]
}
