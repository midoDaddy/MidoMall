/*
* @Author: midoDaddy
* @Date:   2017-09-19 09:47:45
* @Last Modified by:   midoDaddy
<<<<<<< HEAD
* @Last Modified time: 2017-09-25 12:49:51
*/
require('./index.css');
require('page/common/header/index.js')

var _util = require('util/main.js'),
    nav = require('page/common/nav/index.js'),
    navSide = require('page/common/nav-side/index.js');

navSide.init({
    name: 'user-center'
})
=======
* @Last Modified time: 2017-09-19 23:31:05
*/
require('./index.css')
var util = require('util/main.js');

util.request({
    url: '/product/list.do?keyword=1',
    success: function(res) {
        console.log(res)
    },
    error: function(err) {
        console.log(err)
    }
})


console.log('this is index')
>>>>>>> 0b7d680709e6471868628852425112cc3777cdc3
