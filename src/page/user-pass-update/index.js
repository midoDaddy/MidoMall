/*
* @Author: midoDaddy
* @Date:   2017-09-27 12:20:13
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-09-27 12:46:34
*/
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');

var _util = require('util/main.js'),
    _user = require('service/user-service.js'),
    navSide = require('page/common/nav-side/index.js');

var page = {
    init: function() {
        navSide.init({
            name: 'user-pass-update'
        })
        this.bindEvent();
    },

    bindEvent: function() {
        $(document).on('click', '.btn-submit', this.submit.bind(this));
    },

    //向后台提交数据
    submit: function() {
        var userInfo = {
            passwordOld     : $.trim($('#password-old').val()),
            passwordNew     : $.trim($('#password-new').val()),
            passwordConfirm : $.trim($('#password-confirm').val()),           
        };
        //获取前端验证结果
        var result = this.validateForm(userInfo);
        //前端验证成功，则请求后端接口，失败则提示
        if (result.status) {
            //后端请求成功则回跳，失败则提示
            _user.updatePassword(userInfo, function(res, msg) { 
                _util.successTip(msg); 
                window.location.href = './result.html?type=pass-reset';
            }, function(errMsg) {
                _util.errorTip(errMsg);
            })
        } else {
            _util.errorTip(result.msg);
        }          
    },
    
    //前端验证
    validateForm: function(userInfo) {
        var result = {
            status: false,
            msg: ''
        }
        if (!_util.validate(userInfo.passwordOld, 'required')) {
            result.msg = '原密码不能为空';
            return result;
        }
        if (userInfo.passwordNew.length < 6) {
            result.msg = '密码长度不能小于6位';
            return result;
        }
        if (userInfo.passwordNew !== userInfo.passwordConfirm) {
            result.msg = '新密码两次输入不一致';
            return result;
        }
        result.status = true;
        return result;
    } 
}

$(function() {
    page.init();
})