/*
* @Author: midoDaddy
* @Date:   2017-09-28 22:56:11
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-10-09 16:02:14
*/

var _util = require('util/main.js');

var _product = {

    //获取产品列表
    getProductList: function(listParam, resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/product/list.do'),
            data: listParam,
            success: resolve,
            error: reject
        })
    },

    //获取产品详情信息
    getProudctDetail:  function(productInfo, resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/product/detail.do'),
            data: productInfo,
            success: resolve,
            error: reject
        })
    }
}
module.exports = _product;
