const webpack = require('webpack');
const glob = require('glob');
const path = require('path');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PurgecssWebpackPlugin = require('purgecss-webpack-plugin');
const PostcssPresetEnv = require('postcss-preset-env');
const PostCssImport = require('postcss-import');
const StylelintWebpackPlugin = require('stylelint-webpack-plugin');
const htmlTemplate = require('html-webpack-template');

const PATHS = {
  src: path.join(__dirname, 'src')
};

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.[hash].js',
    chunkFilename: '[name].[hash].js'
  },
  plugins: [
    new Dotenv(),
    new MiniCssExtractPlugin({
      filename: 'styles.[hash].css',
      chunkFilename: '[name].[hash].css'
    }),
    // new StylelintWebpackPlugin({
    //   configFile: path.resolve(__dirname, '.stylelintrc.json'),
    //   context: path.resolve(__dirname, 'src', 'stylesheets'),
    //   files: '**/*.css',
    //   failOnError: true,
    //   quiet: false
    // }),
    new HtmlWebpackPlugin({
      title: 'SplitLunch',
      inject: false,
      template: htmlTemplate,
      appMountIds: ['root', 'portal'],
      mobile: true,
      lang: 'en',
      baseHref: '/'
    }),
    new HtmlWebpackExternalsPlugin({
      externals: [
        {
          module: 'google-nunito',
          entry: {
            path:
              'https://fonts.googleapis.com/css?family=Nunito:300,400,600,700&amp;subset=latin-ext',
            type: 'css'
          }
        }
      ]
    })
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        default: false,
        vendors: {
          name: 'vendors',
          chunks: 'all',
          test: /node_modules/,
          priority: 20
        }
      }
    },
    concatenateModules: true
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    compress: true,
    historyApiFallback: true,
    host: '0.0.0.0'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          failOnError: true
        }
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          plugins: ['@babel/plugin-syntax-dynamic-import'],
          presets: [
            [
              '@babel/preset-env',
              { targets: '> 1%, not dead, not ie 11, not op_mini all' }
            ],
            '@babel/preset-react'
          ]
        }
      },
      {
        test: /\.(gql|grapqhl)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader'
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [PostCssImport(), PostcssPresetEnv({ stage: 0 })]
            }
          }
        ]
      }
    ]
  }
};
