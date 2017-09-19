/*
* @Author: midoDaddy
* @Date:   2017-09-19 09:43:36
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-09-19 17:58:08
*/

var webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    WEBPACK_ENV = process.env.WEBPACK_ENV;

//获取html模板参数
var getHtmlConfig = function(name) {
    return {
        template: './src/view/' + name + '.html',
        filename: 'view/' + name + '.html',
        inject: true,
        hash: true,
        chunks: ['common', name]
    }
}

var config = {
    entry: {
        'common': ['./src/page/common/index.js'],
        'index': ['./src/page/index/index.js'],
        'login': ['./src/page/login/index.js']
    },
    output: {
        path: './dist',
        publicPath: '/dist',
        filename: 'js/[name].js'
    },
    plugins: [
        //提取公共模块
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'js/common.js'
        }),
        //html模板
        new HtmlWebpackPlugin(getHtmlConfig('index')),
        //css单独打包
        new ExtractTextPlugin('css/[name].css')
    ],
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader","css-loader")
            },
            {
                test: /\.(gif|png|jpg|woff|ttf|svg|eot)\??.*$/,
                loader: 'url-loader?limit=100&name=resource/[name].[ext]'
            }
        ]
    },
    resolve: {
        alias: {
            'util': __dirname + '/src/util',
            'page': __dirname + '/src/page',
            'server': __dirname + '/src/server',
            'view': __dirname + '/src/view',           
        }
    }
}

if ('dev' === WEBPACK_ENV) {
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/')
}

module.exports = config;