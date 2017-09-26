/*
* @Author: midoDaddy
* @Date:   2017-09-22 22:01:35
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-09-26 22:58:04
*/
var _util = require('util/main.js');
var _user = {

    //检查登录状态
    checkLogin: function(resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/user/get_user_info.do'),
            method: 'POST',
            success: resolve,
            error: reject
        })
    },

    //登录
    login: function(userInfo, resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/user/login.do'),
            method: 'POST',
            data: userInfo,
            success: resolve,
            error: reject
        })
    },

    //注册
    register: function(userInfo, resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/user/register.do'),
            method: 'POST',
            data: userInfo,
            success: resolve,
            error: reject
        })
    },

    //验证用户名是否已经存在
    checkUsername: function(userInfo, resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/user/check_valid.do'),
            method: 'POST',
            data: userInfo,
            success: resolve,
            error: reject
        })
    },

    //获取用户信息
    getUserInfo: function(resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/user/get_information.do'),
            method: 'POST',
            success: resolve,
            error: reject
        })
    },

    //更新用户信息
    updateUserInfo: function(userInfo, resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/user/update_information.do'),
            method: 'POST',
            data: userInfo,
            success: resolve,
            error: reject
        })
    },

    //登出
    logout: function(resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/user/logout.do'),
            method: 'POST',
            success: resolve,
            error: reject
        })
    }
}
module.exports = _user;