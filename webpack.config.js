const path = require('path');
require('webpack');

module.exports = {
  entry: './src/FRAK.js',
  output: {
    path: path.resolve(__dirname, './'),
    filename: 'frak.min.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  optimization: {
    minimize: false,
  },
  mode: 'development',
  stats: {
    colors: true,
  },
  devtool: 'source-map',
};
