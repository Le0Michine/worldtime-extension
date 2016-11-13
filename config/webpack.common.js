const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const JsonReplacerPlugin = require('./json-replacer-plugin');
const path = require('path');
const fs = require('fs');

const helpers = require('./helpers');

function versionReplacer(key, value) {
    if (key === "version") {
        var numbers = value.split(".");
        var major = numbers[0];
        var minor = numbers[1];
        var build = Number(numbers[2]) + 1;
        var version = major + "." + minor + "." + build;
        console.log("update version to ", version);
        return version;
    }
    return value;
}

var filesToCopy = [
    { from: './node_modules/bootstrap/dist/css/bootstrap.min.css', to: "./", toType: "dir" },
    { from: './node_modules/material-design-icons/iconfont/MaterialIcons-Regular.woff', to: "./", toType: "dir" },
    { from: './src/*', to: "./", toType: "dir", flatten: true }
];

var filesToIgnore = [
];

var optionalPlugins = [];

module.exports = function(options) {
  isProd = options.env === 'production';
  if (options.filesToIgnore) {
    filesToIgnore = [...filesToIgnore, ...options.filesToIgnore];
  }

  if (options.cleanOutput) {
    optionalPlugins.push(
      new CleanWebpackPlugin(['out/*'], {
        root: path.resolve(__dirname , '..'),
        verbose: true, 
        dry: false
      })
    );
  }

  return {
    name: "main",
    context: path.join(__dirname, "../"),
    devtool: !isProd ? "inline-sourcemap" : null,
    entry: {
      "app": "./src/app/app.js"
    },
    output: {
      path: helpers.root('out'),
      filename: "app.min.js",
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      modules: [helpers.root("src"), "node_modules"]
    },
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
              presets: ['react', 'es2015', 'stage-0'],
              plugins: ['react-html-attrs', 'transform-decorators-legacy', 'transform-class-properties'],
          }
        },
        {
          test: /\.css$/,
          loaders: [
            'style-loader',
            'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
          ]
        },
        {
          test: /\.json$/,
          loader: 'json-loader'
        },
        {
          test: /\.html$/,
          loaders: ['raw-loader'/*, 'html-minify-loader'*/]
        },
        {
          test: /\.(jpg|png|gif)$/,
          loader: 'file'
        }
      ]
    },
    plugins: [
      
      new CopyWebpackPlugin([ ...filesToCopy ], {
          ignore: [ ...filesToIgnore ],
          copyUnmodified: false
        }
      ),
      new JsonReplacerPlugin({
        inputFile: "src/manifest.json",
        replacers: [ versionReplacer ]
      }),
      new webpack.ContextReplacementPlugin(
        // The (\\|\/) piece accounts for path separators in *nix and Windows
        /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
        helpers.root('src') // location of your src
      ),
      ...optionalPlugins
    ]
  }
}