const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ContextReplacementPlugin = require("webpack/lib/ContextReplacementPlugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const JsonReplacerPlugin = require("./json-replacer-plugin");
const autoprefixer = require("autoprefixer");
const path = require("path");
const fs = require("fs");

const helpers = require("./helpers");

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
  { from: "./node_modules/bootstrap/dist/css/bootstrap.min.css", to: "./", toType: "dir", flatten: true },
  { from: "./node_modules/material-design-icons/iconfont/MaterialIcons-Regular.woff", to: "./", toType: "dir" },
  { from: "./src/*", to: "./", toType: "dir", flatten: true }
];

var filesToIgnore = [
  "*.svg",
];

var optionalPlugins = [];

module.exports = function (options) {
  isProd = options.env === "production";
  if (options.filesToCopy) {
    filesToCopy = [...filesToCopy, ...options.filesToCopy];
  }
  if (options.filesToIgnore) {
    filesToIgnore = [...filesToIgnore, ...options.filesToIgnore];
  }

  if (options.cleanOutput) {
    optionalPlugins.push(
      new CleanWebpackPlugin(["out/*"], {
        root: path.resolve(__dirname, ".."),
        verbose: true,
        dry: false
      })
    );
  }

  return {
    name: "main",
    context: path.join(__dirname, "../"),
    devtool: !isProd ? "inline-sourcemap" : false,
    entry: {
      "app": "./src/app/app.tsx",
      "app.options": "./src/app.options/app.options.tsx"
    },
    output: {
      path: helpers.root("out"),
      filename: "[name].min.js",
    },
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx"],
      modules: [helpers.root("src"), "node_modules"]
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loaders: "awesome-typescript-loader",
          exclude: [/\.(spec|e2e)\.ts$/]
        },
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: "babel-loader",
          query: {
            presets: ["react", "env"],
            plugins: ["react-html-attrs"],
          }
        },
        {
          test: /src\/scss\/.*\.scss$/,
          loaders: ["style-loader", "css-loader", "sass-loader"]
        },
        {
          test: /\.scss$/,
          exclude: /src\/scss\/.*\.scss/,
          use: [
            "style-loader",
            {
              loader: "typings-for-css-modules-loader",
              options: {
                modules: true,
                namedExport: true,
                importLoaders: 1,
                localIdentName: "[name]__[local]___[hash:base64:5]",
              }
            },
            "postcss-loader",
            "sass-loader"
          ]
        },
        {
          test: /\.css$/,
          loaders: [
            "style-loader",
            "css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]"
          ]
        },
        {
          test: /\.html$/,
          loaders: ["raw-loader"/*, "html-minify-loader"*/]
        },
        {
          test: /\.(jpg|png|gif)$/,
          loader: "file"
        }
      ]
    },
    plugins: [
      new CopyWebpackPlugin([...filesToCopy], {
        ignore: [...filesToIgnore],
        copyUnmodified: false
      }
      ),
      new JsonReplacerPlugin({
        inputFile: "src/manifest.json",
        replacers: [versionReplacer]
      }),
      new webpack.ContextReplacementPlugin(
        // The (\\|\/) piece accounts for path separators in *nix and Windows
        /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
        helpers.root("src") // location of your src
      ),
      new webpack.LoaderOptionsPlugin({
        minimize: isProd,
        options: {
          postcss: [
            autoprefixer({
              browsers: [">1%", "last 4 versions", "Firefox ESR", "not ie < 9"]
            })
          ]
        }
      }),
      new webpack.DefinePlugin({
        "process.env": {
          "OPTIONS_PAGE_URL": `"/options.html"`,
        }
      }),
      ...optionalPlugins
    ]
  }
}