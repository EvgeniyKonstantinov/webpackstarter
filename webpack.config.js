'use strict';
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const pug = require('./webpack/pug');
const devserver = require('./webpack/devserver');
const extractCSS = require('./webpack/css.extract');
const uglifyJs = require('./webpack/js.uglify');
const images = require('./webpack/images');

const PATH = {
    source: path.join(__dirname, 'app'),
    dist: path.join(__dirname, 'dist')
};

const common = merge([
    {
        entry: {
            'index': PATH.source + '/index.js' 
        }, 
        output: {
            path: PATH.dist,
            filename: 'js/[name].js'
        },
        plugins: [
            new HtmlWebpackPlugin({
                filename: 'index.html',
                chunks: ['index', 'common'],
                template: PATH.source + '/index.pug'
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'common'
            })
        ]
    },
    pug(),
    extractCSS(),
    images()
]);

module.exports = function(env) {
    if (env === 'production') {
        return merge([ 
            common,
            uglifyJs()
        ]);
    } else {
        return merge([
            common, 
            devserver()
        ]);
    }
}
