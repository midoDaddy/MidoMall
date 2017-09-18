/*
* @Author: midoDaddy
* @Date:   2017-09-14 14:31:53
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-09-18 20:13:06
*/
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

//获取html模板参数
/*var getHtmlConfig = function(name) {
    return {
        template: './src/view/' + name + '.html',
        filename: 'view/' + name + '.html',
        inject: true,
        hash: true,
        chunks: ['common', name]
    }
}*/

var config  = {
    entry: {
        /*'common': ['./src/page/common/index.js'],*/
        'index': ['./src/page/index/index.js'],
        'login': ['./src/page/login/index.js']
    },
    output: {
        path:  './dist',
        filename: 'js/[name].js'
    },
    /*plugins: [
        //提取通用模块
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'js/common.js'
        }),
        //css单独打包
        new ExtractTextPlugin('css/[name].css'),
        //html模板
        new HtmlWebpackPlugin(getHtmlConfig('index'))
    ],*/
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader','css-loader')
            },
            {
                test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader?limit=100&name=resource/[name].[ext]'
            }
        ]
    }
}

module.exports = config;