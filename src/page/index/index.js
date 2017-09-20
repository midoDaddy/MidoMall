/*
* @Author: midoDaddy
* @Date:   2017-09-19 09:47:45
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-09-20 16:29:48
*/
require('./index.css');

var _util = require('util/main.js');
var html = '<div>{{name}}</div>';
var data = {
    name: 'fisheep'
}

console.log(_util.renderHtml(html, data));