/*
* @Author: midoDaddy
* @Date:   2017-09-22 17:00:05
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-09-23 07:51:09
*/
require('./index.css');
var _util = require('util/main.js'),
    _user = require('service/user-service.js'),
    _cart = require('service/cart-service.js');
    
var nav = {
    init: function() {
        this.bindEvent();
        this.loadUserInfo();
        this.loadCartCount();
        return this;
    },
    bindEvent: function() {

        //登录点击事件
        $('.js-login').on('click', _util.doLogin);

        //注册点击事件
        $('.js-register').on('click', function() {
            window.location.href = './register.html'
        });

        //注销点击事件
        $('.js-logout').on('click', function() {
            _user.logout(function(res) {
                window.location.reload();
            }, function(errMsg) {
                _util.errorTip(errMsg)
            })
        });
    },
    
    //检查登录状态
    loadUserInfo: function() {
        _user.checkLogin(function(res) {
            $('.user-not-login').hide().siblings('.user-login').show()
                .find('.username').text(res.username);
        }, function(errMsg) {
            _util.errorTip(errMsg)
        })
    },

    //加载购物车商品数量
    loadCartCount: function() {
        _cart.getCartCount(function(res) {
            $('.nav .cart-count').text(res || 0);
        }, function(errMsg) {
            $('.nav .cart-count').text(0);
        })
    }
    
}
module.exports = nav.init();