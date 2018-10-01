const webpack = require('webpack');

const webpackMerge = require("webpack-merge");
const commonConfig = require("./webpack.common.js");

const DefinePlugin = require("webpack/lib/DefinePlugin");
const NamedModulesPlugin = require("webpack/lib/NamedModulesPlugin");
const ZipBundlerPlugin = require("webpack-zip-bundler");

const ENV = process.env.ENV = process.env.NODE_ENV = "production";
const TARGET = process.env.TARGET;
const METADATA = webpackMerge(commonConfig({env: ENV}).metadata, {});

const helpers = require("./helpers");

const webpackOptions = {
    env: ENV,
    cleanOutput: true,
    filesToCopy: [{ from: "./src/icons_prod/*.png", to: "./icons", toType: "dir", flatten: true }],
};

module.exports = (function(options) {
    return webpackMerge(commonConfig(webpackOptions), {
        optimization: {
            minimize: true,
        },
        plugins: [
            new ZipBundlerPlugin(),
            new webpack.DefinePlugin({
                "process.env": {
                    "NODE_ENV": `"${ENV}"`,
                    "TARGET": `"${TARGET}"`
                }
            })
        ]
    });
})();
