/*
* @Author: midoDaddy
* @Date:   2017-09-19 09:47:45
* @Last Modified by:   midoDaddy
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