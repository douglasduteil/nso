//

const { resolve } = require('path')

const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const { IgnorePlugin, optimize: { CommonsChunkPlugin }, ProgressPlugin } = require('webpack')
const { CheckerPlugin, TsConfigPathsPlugin } = require('awesome-typescript-loader')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin');

//

const isInNodeModules = (module) => module.context && module.context.indexOf("node_modules") !== -1;
const isInCoreJsModule = (module) => module.context && module.context.indexOf("code-js") !== -1;
const isInPolyfillsCommonChunk = (module) => isInNodeModules(module) && isInCoreJsModule(module);

//

exports.default = {

  context: resolve(__dirname, '..'),

  entry: {
    inline: [
      './src/www/inline.ts'
    ],
    bootstrap: ['babel-polyfill', './src/www/main.ts']
  },

  //

  module: {
    rules: [
      {
        // Disable require.ensure
        parser: {
          requireEnsure: false
        }
      },

      {
        test: /\.ts$/,
        use: [
          {
            loader: 'awesome-typescript-loader',
            options: {
              useBabel: true,
              useCache: true
            }
          }
        ]
      },

      {
        test: /\.html$/,
        exclude: [/index.html$/],
        use: [
          {
            loader: 'html-loader'
          }
        ].reverse()
      },

      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          //resolve-url-loader may be chained before sass-loader if necessary
          use: [
            'sass-loader',
            'css-loader'
          ].reverse()
        })
      }
    ]
  },

  //

  node: {
    // Don't import Node Modules
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },

  //

  output: {
    path: resolve(__dirname, '../dist'),
    filename: '[name].[chunkhash:8].js',
  },

  //

  plugins: [
    // awesome-typescript-loader plugins
    new CheckerPlugin(),
    new TsConfigPathsPlugin(),

    // copy-webpack-plugin
    new CopyWebpackPlugin([
      {
        from: 'src/www/assets',
        to: 'assets'
      }
    ]),

    // extract-text-webpack-plugin
    new ExtractTextPlugin('[name].css'),

    // webpack plugins
    new CaseSensitivePathsPlugin(),

    new CommonsChunkPlugin({
      name: 'vendor',
      minChunks: isInNodeModules
    }),
    new CommonsChunkPlugin({
      name: 'polyfills',
      minChunks: isInPolyfillsCommonChunk
    }),
    new CommonsChunkPlugin('webpack-loader')
  ]
    // Don't use progess plugin on Travis
    .concat(process.env.TRAVIS ? [] : [new ProgressPlugin()]),

  //

  resolve: {
    extensions: ['.js', '.ts'],
    plugins: [
        new TsConfigPathsPlugin(/* { tsconfig, compiler } */)
    ],
    modules: [
      "node_modules",
      resolve(__dirname, 'src')
    ],
  }
};
