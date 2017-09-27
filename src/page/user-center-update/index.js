/*
* @Author: midoDaddy
* @Date:   2017-09-27 11:02:12
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-09-27 11:41:37
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
        this.bindEvent();
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
    bindEvent: function() {
        $(document).on('click', '.btn-submit', this.submit.bind(this));
    },

    //向后台提交数据
    submit: function() {
        var userInfo = {
            phone           : $.trim($('#phone').val()),
            email           : $.trim($('#email').val()),
            question        : $.trim($('#question').val()),
            answer          : $.trim($('#answer').val())
        };
        //获取前端验证结果
        var result = this.validateForm(userInfo);
        //前端验证成功，则请求后端接口，失败则提示
        if (result.status) {
            //后端请求成功则回跳，失败则提示
            _user.updateUserInfo(userInfo, function(res, msg) { 
                _util.successTip(msg); 
                window.location.href = './user-center.html';
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