/*
* @Author: midoDaddy
* @Date:   2017-10-11 10:22:22
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-11-01 10:25:35
*/
var _util = require('util/main.js');

var _order = {

    //获取订单的商品信息
    getProductList: function(resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/order/get_order_cart_product.do'),
            success: resolve,
            error: reject
        })
    },

    //创建订单
    create:  function(productInfo, resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/order/create.do'),
            data: productInfo,
            success: resolve,
            error: reject
        })
    }
}
module.exports = _order;