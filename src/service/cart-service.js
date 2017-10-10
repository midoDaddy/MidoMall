/*
* @Author: midoDaddy
* @Date:   2017-09-22 22:02:17
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-10-10 17:54:33
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
    },

    //添加购物车
    addToCart: function(productInfo, resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/cart/add.do'),
            data: productInfo,
            success: resolve,
            error: reject
        })
    },

    //加载购物车列表
    getCartList: function(resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/cart/list.do'),
            success: resolve,
            error: reject
        })
    },

    //全选
    selectAll: function(resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/cart/select_all.do'),
            success: resolve,
            error: reject
        })
    },

    //取消全选
    unSelectAll: function(resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/cart/un_select_all.do'),
            success: resolve,
            error: reject
        })
    },

    //选中某个商品
    selectProduct: function(productInfo, resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/cart/select.do'),
            data: productInfo,
            success: resolve,
            error: reject
        })
    },

    //取消选中某个商品
    unSelectProduct: function(productInfo, resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/cart/un_select.do'),
            data: productInfo,
            success: resolve,
            error: reject
        })
    },

    //移除商品
    deleteProduct: function(productInfo, resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/cart/delete_product.do'),
            data: productInfo,
            success: resolve,
            error: reject
        })
    },

    //更新购物车产品数量
    updateCount: function(productInfo, resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/cart/update.do'),
            data: productInfo,
            success: resolve,
            error: reject
        })
    }

}
module.exports = _cart;
