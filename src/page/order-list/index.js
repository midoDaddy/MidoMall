/*
* @Author: midoDaddy
* @Date:   2017-11-03 16:24:25
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-11-03 17:27:02
*/
require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');

var _util               = require('util/main.js'),
    _order              = require('service/order-service.js'),
    Pagination          = require('util/pagination/index.js'),
    template            = require('./index.string'),
    navSide             = require('page/common/nav-side/index.js');

var page = {
    data: {
        listParam: {
            pageNum : 1,
            pageSize: 3
        }
    },

    init: function() {
        navSide.init({
            name: 'order-list'
        })
        this.loadOrderList();
    },
    
    //加载订单列表
    loadOrderList: function() {
        var _this = this,
            orderListCon = $('.order-list-con');
        orderListCon.html('<div class=loading></div>');
        //获取订单列表
        _order.getOrderList(_this.data.listParam, function(res) {
            var html = _util.renderHtml(template, res);
            orderListCon.html(html);
            _this.loadPagination(res);
        }, function(errMsg) {
            _util.errorTip(errMsg);
        })
    },

    //加载分页信息
    loadPagination: function(data) {
        var _this = this;
        this.pagination ? null :  (this.pagination = new Pagination());
        this.pagination.render({
            container       : $('.pagination'),
            hasPreviousPage : data.hasPreviousPage,
            prePage         : data.prePage,
            hasNextPage     : data.hasNextPage,
            nextPage        : data.nextPage,
            pageNum         : data.pageNum,
            pages           : data.pages,
            onSelect        : function(pageNum) {
                _this.data.listParam.pageNum = pageNum;
                _this.loadOrderList();
            }
        })
    },
  
    //绑定事件
    bindEvent: function() {

    }
    
}

$(function() {
    page.init();
})