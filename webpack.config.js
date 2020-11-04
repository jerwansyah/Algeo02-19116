const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoader = require('vue-loader/lib/plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const dev = true;
const root = path.resolve(__dirname, './dist');

module.exports = {
  watchOptions: {
    ignored: /node_modules/
  },
  entry: [
    './src/index.js'
  ],
  output: {
    path: root,
    publicPath: '/',
    filename: 'js/[name].bundle.js'
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js',
      views: path.resolve(__dirname, '/src/views')
    }
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/,
        use: [
          'vue-style-loader',
          'style-loader',
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
      template: './src/index.html',
      filename: 'views/index.html'
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: './src/views', to: 'views' },
        { from: './src/assets', to: 'assets' }
      ],
    }),
  ]
}
