/*
* @Author: midoDaddy
* @Date:   2017-09-19 09:43:36
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-09-26 15:13:32
*/

var webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    WEBPACK_ENV = process.env.WEBPACK_ENV;

//获取html模板参数
var getHtmlConfig = function(name, title) {
    return {
        template    : './src/view/' + name + '.html',
        filename    : 'view/' + name + '.html',
        title       : title,
        inject      : true,
        hash        : true,
        chunks      : ['common', name]
    }
}

var config = {
    entry: {
        'common'        : ['./src/page/common/index.js'],
        'index'         : ['./src/page/index/index.js'],
        'result'        : ['./src/page/result/index.js'],
        'user-login'    : ['./src/page/user-login/index.js'],
        'user-register' : ['./src/page/user-register/index.js']
        
    },
    output: {
        path        : './dist',
        publicPath  : '/dist',
        filename    : 'js/[name].js'
    },
    plugins: [
        //提取公共模块
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: 'js/common.js'
        }),
        //css单独打包
        new ExtractTextPlugin('css/[name].css'),
        //html模板
        new HtmlWebpackPlugin(getHtmlConfig('index', '首页')),
        new HtmlWebpackPlugin(getHtmlConfig('result', '结果提示')),
        new HtmlWebpackPlugin(getHtmlConfig('user-login', '用户登录')),
        new HtmlWebpackPlugin(getHtmlConfig('user-register', '用户注册'))
        
        
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
            },
            {
                test: /\.string$/,
                loader: 'html-loader'
            },
        ]
    },
    resolve: {
        alias: {
            util        : __dirname + '/src/util',
            page        : __dirname + '/src/page',
            service     : __dirname + '/src/service',
            view        : __dirname + '/src/view',
            image       : __dirname + '/src/image',
            node_modules: __dirname + '/node_modules',
        }
    }
}

if ('dev' === WEBPACK_ENV) {
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/')
}

module.exports = config;