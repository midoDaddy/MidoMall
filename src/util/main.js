/*
* @Author: midoDaddy
* @Date:   2017-09-20 09:39:21
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-09-20 16:59:00
*/
var config = {
    serverHost: ''
}
var Hogan = require('hogan');
var _util = {
    //ajax请求
    request: function(param) {
        var _this = this;
        $.ajax({
            method: param.method || 'get',
            dataType: param.type || 'json',
            url: param.url || '',
            data: param.data || '',
            success: function(res) {
                //请求成功
                if (0 === res.status) {
                    typeof param.success === 'function' && param.success(res.data, res.msg)
                }
                //需要登录
                else if (10 === res.status) {
                    _this.doLogin();
                }
                //数据请求失败
                else if (10 === res.status) {
                    typeof param.error === 'function' && param.error(res.msg)
                }
            },
            error: function(err) {
                typeof param.error === 'function' && param.error(err.statusText)
            }
        })
    },
    
    //统一登录处理
    doLogin: function() {
        window.location.href = './login.html?redirect=' + encodeURIComponent(window.location.href)
    },

    //返回首页
    goHome: function() {
        window.location.href = './index.html'
    },

    //获取服务器地址
    getServerUrl: function(path) {
        return config.serverHost + path;
    },

    //获取url参数
    getUrlParam: function(name) {
        var pattern = new RegExp('(^|&)' + name + '=([^&]*)(&|$)'),
            result = window.location.search.substr(1).match(pattern);
        return result ? result[2] : null;
    },

    //渲染html模板
    renderHtml: function(htmlTemplate, data) {
        return Hogan.compile(htmlTemplate).render(data);
    },

    //成功提示
    successTip: function(msg) {
        alert(msg || '操作成功')
    },

    //错误提示
    errorTip: function(msg) {
        alert(msg || '操作失败')
    },

    //通用验证
    validate: function(value, type) {
        var value = $.trim(value);
        //非空验证
        if ('required' === type) {
            return !!value;
        }
        //手机号验证
        if ('phone' === type) {
            return /^1\d{10}$/.test(value)
        }
        //邮箱验证
        if ('mail' === type) {
            return /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value)
        }
    }
}

module.exports = _util;