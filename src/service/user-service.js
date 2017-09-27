/*
* @Author: midoDaddy
* @Date:   2017-09-22 22:01:35
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-09-27 15:45:52
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

    //修改密码
    updatePassword: function(userInfo, resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/user/reset_password.do'),
            method: 'POST',
            data: userInfo,
            success: resolve,
            error: reject
        })
    },

    //获取密码提示问题
    getQuestion: function(userInfo, resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/user/forget_get_question.do'),
            method: 'POST',
            data: userInfo,
            success: resolve,
            error: reject
        })
    },

    //提交密码提示问题与答案，获取token
    checkAnswer: function(userInfo, resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/user/forget_check_answer.do'),
            method: 'POST',
            data: userInfo,
            success: resolve,
            error: reject
        })
    },

    //重置密码
    resetPassword: function(userInfo, resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/user/forget_reset_password.do'),
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