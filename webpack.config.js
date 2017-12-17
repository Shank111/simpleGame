'use strict';

var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: ['./src/app.js', './style/css/style.css', './style/scss/style.scss', './style/css/reset.css'],

  output: {
    path: __dirname,
    filename: 'dist/js/app.js'
  },

  plugins: [
    // Specify the resulting CSS filename
    new ExtractTextPlugin('dist/css/style.css'),
    new UglifyJsPlugin()
  ],



  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          'babel-loader'
        ]
      },
      {
        test: /\.(css|scss)/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'sass-loader'
          ]
        })
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
                name: 'dist/images/[name].[ext]',
            }
          }
        ]
      },
        {
            enforce: "pre",
            test: /\.js$/,
            loader: 'eslint-loader'
        },
      {
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'dist/audio/[name].[ext]'
            }
          }
        ]
      }
    ]
  },

  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000,
    ignored: ['dist/**/*.js', 'bundle/**/*.js']
  },

  stats: {
    // Colored output
    colors: true
  },

  // Create Sourcemaps for the bundle
  devtool: 'source-map'
};

