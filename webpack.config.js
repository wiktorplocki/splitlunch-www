const path = require('path');
const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PurgecssWebpackPlugin = require('purgecss-webpack-plugin');
const Tailwind = require('tailwindcss');
const PostcssPresetEnv = require('postcss-preset-env');
const PostCssImport = require('postcss-import');

class TailwindExtractor {
  static extract(content) {
    return content.match(/[A-z0-9-:\/]+g/) || [];
  }
}

const PATHS = {
  src: path.join(__dirname, 'src')
};

module.exports = {
  entry: './src/App.js',
  output: {
    filename: 'main.[hash].js',
    chunkFilename: '[name].[hash].js'
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles.[hash].css',
      chunkFilename: '[name].[hash].css'
    }),
    new PurgecssWebpackPlugin({
      paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
      content: ['./src/**/*.html', './src/**/*.js'],
      extractors: [
        {
          extractor: TailwindExtractor,
          extensions: ['html', 'js']
        }
      ]
    }),
    new HtmlWebpackPlugin({
      title: 'SplitLunch',
      inject: false,
      template: require('html-webpack-template'),
      appMountId: 'root',
      baseHref: '/'
    }),
    new HtmlWebpackExternalsPlugin({
      externals: [
        {
          module: 'google-opensans',
          entry: {
            path:
              'https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700&subset=latin-ext',
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
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          plugins: ['@babel/plugin-syntax-dynamic-import'],
          presets: [
            ['@babel/preset-env', { targets: '> 0.25%, not dead, not IE 11' }],
            '@babel/preset-react'
          ]
        }
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
              plugins: () => [
                Tailwind('./tailwind.js'),
                PostCssImport(),
                PostcssPresetEnv()
              ]
            }
          }
        ]
      }
    ]
  }
};
