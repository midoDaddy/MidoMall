/*
* @Author: midoDaddy
* @Date:   2017-10-17 11:14:49
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-11-02 16:38:20
*/
var _util = require('util/main.js');

var _address = {

    //获取地址列表
    getAddressList: function(listParam, resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/shipping/list.do'),
            data: listParam,
            success: resolve,
            error: reject
        })
    },

    //获取地址详细信息
    getAddressInfo: function(addressInfo, resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/shipping/select.do'),
            data: addressInfo,
            success: resolve,
            error: reject
        })
    },

    //添加地址信息
    add: function(addressInfo, resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/shipping/add.do'),
            data: addressInfo,
            success: resolve,
            error: reject
        })
    },

    //更新地址信息
    update: function(addressInfo, resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/shipping/update.do'),
            data: addressInfo,
            success: resolve,
            error: reject
        })
    },

    //删除地址
    delete: function(addressInfo, resolve, reject) {
        _util.request({
            url: _util.getServerUrl('/shipping/del.do'),
            data: addressInfo,
            success: resolve,
            error: reject
        })
    },

}
module.exports = _address;
