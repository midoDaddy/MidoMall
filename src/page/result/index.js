/*
* @Author: midoDaddy
* @Date:   2017-09-25 12:37:26
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-09-25 12:52:44
*/
require('./index.css');
require('page/common/nav-simple/index.js')

var _util = require('util/main.js');

$(function() {
    var type = _util.getUrlParam('type') || 'default';
    $('.' + type + '-success').show();
})
