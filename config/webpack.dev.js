const webpackMerge = require("webpack-merge");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const commonConfig = require("./webpack.common.js"); // the settings that are common to prod and dev
const webpack = require("webpack");

const DefinePlugin = require("webpack/lib/DefinePlugin");
const NamedModulesPlugin = require("webpack/lib/NamedModulesPlugin");

const ENV = process.env.ENV = process.env.NODE_ENV = "development";
const METADATA = webpackMerge(commonConfig({env: ENV}).metadata, {});

const helpers = require("./helpers");

const webpackOptions = {
    env: ENV,
    cleanOutput: false,
    filesToCopy: [{ from: "./src/icons_dev", to: "./icons", toType: "dir" }],
};

module.exports = (function(env) {
    webpackOptions.cleanOutput = env.clean === "true";
    return webpackMerge(commonConfig(webpackOptions), {
        mode: "development",
        devtool: "cheap-module-source-map",
        plugins: [
            new webpack.DefinePlugin({
                "process.env": {
                    "NODE_ENV": `"${ENV}"`
                }
            }),
            ...((process.argv || []).includes("--profile-bundle") ? [new BundleAnalyzerPlugin()] : []),
        ]
    });
});
