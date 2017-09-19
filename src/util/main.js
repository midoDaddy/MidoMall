/*
* @Author: midoDaddy
* @Date:   2017-09-19 17:51:53
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-09-19 22:45:04
*/
var util = {
    request: function(param){
        var _this = this;
        $.ajax({
            method      : param.method  || 'get',
            url         : param.url     || '',
            data        : param.data    || '',
            dataType    : param.type    || 'json',
            success: function(res) {
                if (0 === res.status) {
                    typeof param.success === 'function' && param.success(res.data, res.msg);
                }
                else if (10 === res.status) {
                    _this.doLogin();
                }
                else if (1 === res.status) {
                    typeof param.error === 'function' && param.error(res.msg);
                }
            },
            error: function(err) {
                typeof param.error === 'function' && param.error(err.statusText);
            }
        })
    },
    doLogin: function() {
        window.location.href = './login.html?redirect=' + encodeURIComponent(window.location.href)
    }
}

module.exports = util;