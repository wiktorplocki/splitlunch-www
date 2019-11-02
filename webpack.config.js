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
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

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
    new LodashModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: 'styles.[hash].css',
      chunkFilename: '[name].[hash].css'
    }),
    new StylelintWebpackPlugin({
      configFile: path.resolve(__dirname, '.stylelintrc.json'),
      context: path.resolve(__dirname, 'src', 'stylesheets'),
      files: '**/*.scss',
      failOnError: true,
      quiet: false
    }),
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
          module: 'google-lato',
          entry: {
            path:
              'https://fonts.googleapis.com/css?family=Lato:300,400,700&display=swap&subset=latin-ext',
            type: 'css'
          }
        }
      ]
    })
    // new PurgecssWebpackPlugin({
    //   paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true })
    // })
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
        },
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
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
          plugins: ['@babel/plugin-syntax-dynamic-import', 'lodash'],
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
        test: /\.(svg)$/,
        use: [
          'babel-loader',
          {
            loader: 'react-svg-loader',
            options: {
              jsx: true,
              svgo: {
                plugins: [{ removeTitle: false }],
                floatPrecision: 2
              }
            }
          }
        ]
      },
      {
        test: /\.(jpg|png)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[path][name]-[has].[ext]'
          }
        }
      },
      {
        test: /\.(ttf|eof|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]'
        }
      },
      {
        test: /\.(css|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 1,
              url: false
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [PostCssImport(), PostcssPresetEnv({ stage: 0 })]
            }
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true }
          }
        ]
      }
    ]
  }
};
