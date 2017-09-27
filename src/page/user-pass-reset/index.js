/*
* @Author: midoDaddy
* @Date:   2017-09-27 14:18:07
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-09-27 16:01:58
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

    data: {
        username: '',
        question: '',
        answer: '',
        forgetToken: ''
    },

    init: function() {
        this.bindEvent();
        this.loadStepUsername();
    },

    bindEvent: function() {
        $('#username-submit').on('click', this.submitUsername.bind(this));
        $('#answer-submit').on('click', this.submitAnswer.bind(this));
        $('#password-submit').on('click', this.submitPassword.bind(this));
    },

    //加载第一步：填写用户名
    loadStepUsername: function() {
        $('.step-username').show();
    },
    
    //加载第二步：填写密码提示问题答案
    loadStepAnswer: function() {
        errorTip.hide();
        $('.step-username').hide()
            .siblings('.step-answer').show()
            .find('.question').text(this.data.question);
    },

    //加载第三部：填写新密码
    loadStepPassword: function() {
        errorTip.hide();
        $('.step-con.step-answer').hide()
            .siblings('.step-password').show();
    },
    
    //根据用户名，获取密码提示问题
    submitUsername: function() {
        var _this = this,
            username = $.trim($('#username').val());
        _user.getQuestion({
            username: username
        }, function(res) {
            _this.data.username = username;
            _this.data.question = res;
            _this.loadStepAnswer();
        }, function(errMsg) {
            errorTip.show(errMsg)
        })
    },

    //验证密码提示问题答案，获取token
    submitAnswer: function() {
        var _this = this,
            answer = $.trim($('#answer').val());
        _user.checkAnswer({
            username: this.data.username,
            question: this.data.question,
            answer: answer
        }, function(res) {
            _this.data.answer = answer;
            _this.data.forgetToken = res;
            _this.loadStepPassword();
        }, function(errMsg) {
            errorTip.show(errMsg)
        })
    },

    //设置新密码
    submitPassword: function() {
        var _this = this,
            passwordNew = $.trim($('#password').val()),
            passwordConfirm = $.trim($('#password-confirm').val());
        if (passwordNew.length < 6) {
            errorTip.show('密码不得小于6位');
            return;
        }
        if (passwordNew !== passwordConfirm) {
            errorTip.show('两次输入的密码不一致');
            return;
        }
        this.data.passwordNew = passwordNew;
        _user.resetPassword({
            username: this.data.username,
            passwordNew: this.data.passwordNew,
            forgetToken: this.data.forgetToken
        }, function(res) {
            window.location.href = './result.html?type=pass-reset'
        }, function(errMsg) {
            errorTip.show(errMsg)
        })
    },      
}

$(function() {
    page.init();
})
