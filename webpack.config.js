'use strict';

var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: ['./src/app.js', './style/css/style.css', './style/scss/style.scss'],

  output: {
    path: __dirname,
    filename: 'dist/js/app.js'
  },

  plugins: [
    // Specify the resulting CSS filename
    new ExtractTextPlugin('dist/css/style.css')
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
       /*{
        test: /\slider*.png$/,
        use: [
          {
            loader: 'file-loader',
            options: {
                name: '../../static/[name].[ext]',
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
                name: 'dist/images/[name].[ext]',
            }
          }
        ]
      },
      {
        test: /\.(svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
                name: '../../static/[name].[ext]',
            }
          }
        ]
      },*/
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

