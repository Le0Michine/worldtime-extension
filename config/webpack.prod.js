const webpack = require('webpack');

const webpackMerge = require("webpack-merge");
const commonConfig = require("./webpack.common.js");

const ZipBundlerPlugin = require("webpack-zip-bundler");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const ENV = process.env.ENV = process.env.NODE_ENV = "production";
const TARGET = process.env.TARGET;

const webpackOptions = {
    env: ENV,
    cleanOutput: true,
    filesToCopy: [{ from: "./src/icons_prod/*.png", to: "./icons", toType: "dir", flatten: true }],
};

module.exports = (function(options) {
    return webpackMerge(commonConfig(webpackOptions), {
        mode: "production",
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
            }),
            ...((process.argv || []).includes("--profile-bundle") ? [new BundleAnalyzerPlugin()] : []),
        ]
    });
})();
