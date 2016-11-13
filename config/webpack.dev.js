const webpackMerge = require('webpack-merge'); // used to merge webpack configs
const commonConfig = require('./webpack.common.js'); // the settings that are common to prod and dev

/**
 * Webpack Plugins
 */
const DefinePlugin = require('webpack/lib/DefinePlugin');
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');

/**
 * Webpack Constants
 */
const ENV = process.env.ENV = process.env.NODE_ENV = 'development';
const METADATA = webpackMerge(commonConfig({env: ENV}).metadata, {});

const helpers = require('./helpers');

const webpackOptions = {
    env: ENV,
    cleanOutput: false
};

/**
 * Webpack configuration
 */
module.exports = (function(env) {
    webpackOptions.cleanOutput = env.clean === "true";
    return webpackMerge(commonConfig(webpackOptions), {
        devtool: 'cheap-module-source-map'
    });
});
