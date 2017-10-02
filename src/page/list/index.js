/*
* @Author: midoDaddy
* @Date:   2017-09-28 22:47:25
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-10-02 23:46:15
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
        this.loadList();
        this.bindEvent();
    },
    
    //加载产品列表
    loadList: function() {
        var pListCon = $('.p-list-con');
        pListCon.html('<div class="loading"></div>'); //加载进度条
        //请求产品列表接口
        _product.getProductList(this.data.listParam, function(res) {
            var html = _util.renderHtml(template, {
                list: res.list
            });
            $('.p-list-con').html(html);
        }, function(errMsg) {
            _util.errorTip(errMsg);
        })
    },

    bindEvent: function() {
        var _this = this;
        $('.sort-item').on('click', function(){
            var $this = $(this);
            _this.data.listParam.pageNum = 1;
            
            //默认排序
            if ($this.data('type') === 'default') {
                if ($this.hasClass('active')) {
                    return;
                } else {
                    $this.addClass('active')
                        .siblings('.sort-item').removeClass('active');
                    _this.data.listParam.orderBy = 'default';
                }               
            }
            
            //价格排序
            if ($this.data('type') === 'price') {
                if (!$this.hasClass('active')) {
                    $this.addClass('active')
                        .siblings('.sort-item').removeClass('active')
                }
                if ($this.hasClass('asc')) {
                    $this.removeClass('asc').addClass('desc');
                    _this.data.listParam.orderBy = 'price_desc';
                } else {
                    $this.removeClass('desc').addClass('asc');
                    _this.data.listParam.orderBy = 'price_asc';
                }                
            }
            _this.loadList();
        })
    },
    
}

$(function() {
    page.init();
})