const webpack = require("webpack");
const fs = require("fs");
const path = require("path");
const webpackMerge = require("webpack-merge");
const ZipBundlerPlugin = require('webpack-zip-bundler');
const commonConfig = require("./webpack.common.js");

const GenerateJsonPlugin = require("generate-json-webpack-plugin");

const manifest = require(path.resolve(__dirname, "..", "src", "manifest.json"));
manifest.name = `${manifest.name} canary`;

const ENV = process.env.ENV = process.env.NODE_ENV = 'production';
const METADATA = webpackMerge(commonConfig({env: ENV}).metadata, {});

const helpers = require('./helpers');

const webpackOptions = {
    env: ENV,
    cleanOutput: true,
    filesToCopy: [{ from: './src/icons_dev/*.png', to: "./icons", toType: "dir", flatten: true }],
    filesToIgnore: ["manifest.json"]
};

module.exports = (function(options) {
    return webpackMerge(commonConfig(webpackOptions), {
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': '"production"'
                }
            }),
            new GenerateJsonPlugin("manifest.json", manifest),
            new ZipBundlerPlugin(),
        ]
    });
})();
