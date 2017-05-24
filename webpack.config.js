const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// first thing is to give the app and entry point and exit location
module.exports = {
  entry: './app/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index_bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      //any files with .js will be run through babel-loader.
      { test: /\.(js)$/, use: 'babel-loader' },
      //any files with css will pass through css-loader then through style-loader.
      { test: /\.css$/, use: ['style-loader', 'css-loader'] }
    ]
  },
  devServer: {
    historyApiFallback: true
  },
  plugins: [new HtmlWebpackPlugin({
    template: 'app/index.html'
  })]
};
