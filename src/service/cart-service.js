/*
* @Author: midoDaddy
* @Date:   2017-09-22 22:02:17
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-09-22 23:21:01
*/

var _util = require('util/main.js');
var _cart = {
    //检查登录状态
    getCartCount: function(resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/cart/get_cart_product_count.do'),
            success: resolve,
            error: reject
        })
    }
}
module.exports = _cart;
