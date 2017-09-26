/*
* @Author: midoDaddy
* @Date:   2017-09-26 15:09:30
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-09-26 22:48:49
*/
require('./index.css');
require('page/common/nav-simple/index.js')

var _util = require('util/main.js'),
    _user = require('service/user-service.js');

//提示信息的显示与隐藏
var errorTip = {
    show: function(msg) {
        $('.error-item').show().find('.error-msg').text(msg);
    },
    hide: function(msg) {
        $('.error-item').hide().find('.error-msg').text('');
    },
};

var page = {
    init: function() {
        this.bindEvent();
    },

    bindEvent: function() {
        var _this = this;
        //验证用户名是否已存在
        $('#username').on('blur', function() {
            var username = $.trim($('#username').val());
            if (!username) {
                return;
            }
            _user.checkUsername({
                str: username,
                type: 'username'
            }, function(res) {
                errorTip.hide();
            }, function(errMsg) {
                errorTip.show(errMsg)
            })
        })
        $('#submit-btn').on('click', this.submit.bind(this));
        $('.user-input').on('click', function(e) {
            if (e.keyCode === 13) {
                _this.submit();
            }
        });
    },
    
    //向后台提交数据
    submit: function() {
        var userInfo = {
            username        : $.trim($('#username').val()),
            password        : $.trim($('#password').val()),
            passwordConfirm : $.trim($('#password-confirm').val()),
            phone           : $.trim($('#phone').val()),
            email            : $.trim($('#email').val()),
            question        : $.trim($('#question').val()),
            answer          : $.trim($('#answer').val())
        };
        //获取前端验证结果
        var result = this.validateForm(userInfo);
        //前端验证成功，则请求后端接口，失败则提示
        if (result.status) {
            //后端请求成功则回跳，失败则提示
            _user.register(userInfo, function(res) {  
                window.location.href = './result.html?type=register';
            }, function(errMsg) {
                errorTip.show(errMsg);
            })
        } else {
            errorTip.show(result.msg);
        }          
    },
    
    //前端验证
    validateForm: function(userInfo) {
        var result = {
            status: false,
            msg: ''
        }
        if (!_util.validate(userInfo.username, 'required')) {
            result.msg = '用户名不能为空';
            return result;
        }
        if (!_util.validate(userInfo.password, 'required')) {
            result.msg = '密码不能为空';
            return result;
        }
        if (userInfo.password.length < 6) {
            result.msg = '密码不能小于6位';
            return result;
        }
        if (!_util.validate(userInfo.passwordConfirm, 'required')) {
            result.msg = '密码确认不能为空';
            return result;
        }
        if (userInfo.password !== userInfo.passwordConfirm) {
            result.msg = '两次密码输入不一致';
            return result;
        }
        if (!_util.validate(userInfo.phone, 'phone')) {
            result.msg = '手机号格式不正确';
            return result;
        }
        if (!_util.validate(userInfo.email, 'mail')) {
            result.msg = '邮箱格式不正确';
            return result;
        }
        if (!_util.validate(userInfo.question, 'required')) {
            result.msg = '密码提示问题不能为空';
            return result;
        }
        if (!_util.validate(userInfo.answer, 'required')) {
            result.msg = '密码提示问题答案不能为空';
            return result;
        }
        result.status = true;
        return result;
    }
}
$(function() {
    page.init();
})