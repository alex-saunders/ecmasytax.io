const webpack = require('webpack');
const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');

var config = {
  entry: './src/client.jsx',
  devtool: 'cheap-module-source-map',
  output: {
    path:  path.join(__dirname, 'public', 'static'),
    filename: 'app.js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        exclude: /node_modules/,
        use: [
          {
            loader : 'babel-loader',
            query: {
              presets: ['es2015', 'react', 'stage-0'],
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          { loader: 'isomorphic-style-loader' },
          { loader: 'css-loader' },
          {
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [
                  require('autoprefixer')
                ];
              }
            }
          },
          { loader: 'sass-loader' }
        ]
      },
      {
        test: /\.sass$/,
        loaders: ['style-loader','css-loader', 'sass-loader']
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'isomorphic-style-loader' },
          { loader: 'css-loader' },
          {
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [
                  require('autoprefixer')
                ];
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ]
};

process.traceDeprecation = false

module.exports = config;
