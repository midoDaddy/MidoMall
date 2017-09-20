/*
* @Author: midoDaddy
* @Date:   2017-09-19 09:47:45
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-09-20 10:35:13
*/
require('./index.css')
var _util = require('util/main.js');
_util.request({
    url: '/product/list.do?keyword=1',
    success: function(res) {
        console.log(res)
    },
    error: function(errMsg) {
        console.log(errMsg)
    }
});
console.log('this is index')