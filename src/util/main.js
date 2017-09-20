/*
* @Author: midoDaddy
* @Date:   2017-09-20 09:39:21
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-09-20 10:36:32
*/
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
    }
}

module.exports = _util;