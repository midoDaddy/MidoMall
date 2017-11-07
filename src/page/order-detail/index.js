/*
* @Author: midoDaddy
* @Date:   2017-11-07 14:43:39
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-11-07 15:31:09
*/
require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');

var _util               = require('util/main.js'),
    _order              = require('service/order-service.js'),
    template            = require('./index.string'),
    navSide             = require('page/common/nav-side/index.js');

var page = {

    data: {
        orderNo: _util.getUrlParam('orderNumber')
    },

    init: function() {
        navSide.init({
            name: 'order-list'
        });
        this.loadOrderDetail();
        this.bindEvent();
    },
    
    //加载订单信息
    loadOrderDetail: function() {
        var html = '',
            _this = this,
            $contentWrap = $('.content');
        $contentWrap.html('<div class=loading></div>');       
        _order.getDetail({
            orderNo: this.data.orderNo
        }, function(res) {
            _this.dataFilter(res);
            html = _util.renderHtml(template, res);
            $('.content').html(html)
        }, function(errMsg) {
            $('.content').html('<p class=err-tip>' + errMsg + '</P>');
        })
    },

    dataFilter: function(data) {
        data.needPay = (data.status === 10);
        data.cancelable = (data.status === 10);
    },

    bindEvent: function() {
        var _this = this;
        $(document).on('click', '.btn-cancel', function() {
            if (confirm('确定要取消订单吗')) {
                _order.cancel({
                    orderNo: _this.data.orderNo
                }, function(res) {
                    _util.successTip('订单取消成功');
                    _this.loadOrderDetail();
                }, function(errMsg) {
                    _mm.errorTips(errMsg);
                })
            }
        });
    } 
}

$(function() {
    page.init();
})