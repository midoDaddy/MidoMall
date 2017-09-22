/*
* @Author: midoDaddy
* @Date:   2017-09-22 22:01:35
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-09-23 07:50:38
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