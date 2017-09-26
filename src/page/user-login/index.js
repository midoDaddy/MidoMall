/*
* @Author: midoDaddy
* @Date:   2017-09-19 09:48:07
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-09-26 15:07:30
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
            username: $.trim($('#username').val()),
            password: $.trim($('#password').val())
        };
        //获取前端验证结果
        var result = this.validateForm(userInfo);
        //前端验证成功，则请求后端接口，失败则提示
        if (result.status) {
            //后端请求成功则回跳，失败则提示
            _user.login(userInfo, function(res) {
                var redirect = decodeURIComponent(_util.getUrlParam('redirect'));
                errorTip.hide();       
                window.location.href = redirect || './index.html';
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
            return;
        }
        if (!_util.validate(userInfo.password, 'required')) {
            result.msg = '密码不能为空';
            return;
        }
        result.status = true;
        return result;
    }
}
$(function() {
    page.init();
})