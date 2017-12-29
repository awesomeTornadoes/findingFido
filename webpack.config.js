const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');


module.exports = {
  entry: {
    main: './src/main.ts',
  },
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: '[name].bundle.js',
  },
  resolve: {
    extensions: ['.js', '.ts', '.html'],
  },
  devtool: 'inline-source-map',
  module: {
    loaders: [
      { test: /.ts$/, use: ['awesome-typescript-loader', 'angular2-template-loader'] },
      { test: /.html$/, use: 'raw-loader' },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
    ],
  },
  devServer: {
    historyApiFallback: true,
    hot: true, // Tell the dev-server we're using HMR
    contentBase: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      showErrors: true,
      path: path.join(__dirname, '/dist/'),
    }),
    new webpack.HotModuleReplacementPlugin(), // Enable HMR

  ],
};
