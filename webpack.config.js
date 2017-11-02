/*
* @Author: midoDaddy
* @Date:   2017-09-19 09:43:36
* @Last Modified by:   midoDaddy
<<<<<<< HEAD
* @Last Modified time: 2017-10-11 10:12:43
=======
* @Last Modified time: 2017-09-19 17:58:08
>>>>>>> 0b7d680709e6471868628852425112cc3777cdc3
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
        'common'                : ['./src/page/common/index.js'],
        'index'                 : ['./src/page/index/index.js'],
        'list'                  : ['./src/page/list/index.js'],
        'detail'                : ['./src/page/detail/index.js'],
        'cart'                  : ['./src/page/cart/index.js'],
        'result'                : ['./src/page/result/index.js'],
        'order-confirm'         : ['./src/page/order-confirm/index.js'],
        'user-login'            : ['./src/page/user-login/index.js'],
        'user-register'         : ['./src/page/user-register/index.js'],
        'user-center'           : ['./src/page/user-center/index.js'],
        'user-center-update'    : ['./src/page/user-center-update/index.js'],
        'user-pass-update'      : ['./src/page/user-pass-update/index.js'],
        'user-pass-reset'       : ['./src/page/user-pass-reset/index.js']       
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
        new HtmlWebpackPlugin(getHtmlConfig('list', '商品列表页')),
        new HtmlWebpackPlugin(getHtmlConfig('detail', '商品详情页')),
        new HtmlWebpackPlugin(getHtmlConfig('cart', '购物车')),
        new HtmlWebpackPlugin(getHtmlConfig('result', '结果提示')),
        new HtmlWebpackPlugin(getHtmlConfig('order-confirm', '订单确认')),
        new HtmlWebpackPlugin(getHtmlConfig('user-login', '用户登录')),
        new HtmlWebpackPlugin(getHtmlConfig('user-register', '用户注册')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center', '用户中心')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center-update', '编辑用户信息')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-update', '修改密码')),       
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset', '找回密码')),       
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