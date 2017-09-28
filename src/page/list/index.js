/*
* @Author: midoDaddy
* @Date:   2017-09-28 22:47:25
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-09-28 23:17:23
*/
require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');

require('util/unslider/index.js');

var _util       = require('util/main.js'),
    _product    = require('service/product-service.js'),
    template    = require('./index.string');

var page = {
    data: {
        listParam: {
            categoryId: _util.getUrlParam('categoryId') || '',
            keyword:  _util.getUrlParam('keyword') || '',
            pageNum: 1,
            pageSize: 20,
            orderBy: ''
        }
    },

    init: function() {
        this.onLoad();
        this.bindEvent();
    },

    onLoad: function() {
        _product.getProductList(this.data.listParam, function(res) {
            var html = _util.renderHtml(template, {
                list: res.list
            });
            $('.p-list-con').html(html);
        }, function(errMsg) {

        })
    },

    bindEvent: function() {
        
    },
    
}

$(function() {
    page.init();
})