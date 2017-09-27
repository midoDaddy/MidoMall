/*
* @Author: midoDaddy
* @Date:   2017-09-27 11:01:48
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-09-27 11:27:21
*/
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');

var _util = require('util/main.js'),
    _user = require('service/user-service.js'),
    navSide = require('page/common/nav-side/index.js'),
    template = require('./index.string');

var page = {
    init: function() {
        navSide.init({
            name: 'user-center'
        })
        this.renderUserInfo();
    },
    //渲染用户信息
    renderUserInfo: function() {
        _user.getUserInfo(function(res) {
            var html = _util.renderHtml(template, res);
            $('.panel-body').html(html);
        }, function(errMsg) {
            _util.errorTip(errMsg)
        })
    },   
}

$(function() {
    page.init();
})