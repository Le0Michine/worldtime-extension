const webpack = require('webpack');

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
    cleanOutput: true,
    filesToCopy: [{ from: './src/icons_prod', to: "./icons", toType: "dir" }],
};

/**
 * Webpack configuration
 */
module.exports = (function(options) {
    return webpackMerge(commonConfig(webpackOptions), {
        plugins: [
            new webpack.optimize.UglifyJsPlugin({
                sourceMap: false,
                compress: {
                    warnings: false,
                    properties: true,
                    sequences: true,
                    dead_code: true,
                    conditionals: true,
                    comparisons: true,
                    evaluate: true,
                    booleans: true,
                    unused: true,
                    loops: true,
                    hoist_funs: true,
                    cascade: true,
                    if_return: true,
                    join_vars: true,
                    drop_console: true,
                    drop_debugger: true,
                    //unsafe: true,
                    hoist_vars: true,
                    negate_iife: true,
                    //side_effects: true,
                    screw_ie8: true
                },
              mangle: {
                toplevel: true,
                sort: true,
                eval: true,
                properties: true
              },
              output: {
                space_colon: false,
                comments: false
              }
            })
        ]
    });
})();
