/*
* @Author: midoDaddy
* @Date:   2017-09-28 22:47:25
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-10-09 10:21:16
*/
require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');
require('util/unslider/index.js');

var _util       = require('util/main.js'),
    _product    = require('service/product-service.js'),
    template    = require('./index.string'),
    Pagination  = require('util/pagination/index.js');

var page = {
    data: {
        listParam: {
            categoryId: _util.getUrlParam('categoryId') || '',
            keyword:  _util.getUrlParam('keyword') || '',
            pageNum: _util.getUrlParam('pageNum') || 1,
            pageSize: _util.getUrlParam('pageSize') || 8,
            orderBy: _util.getUrlParam('orderBy') || 'default',
        }
    },

    init: function() {
        this.loadList();
        this.bindEvent();
    },
    
    //加载产品列表
    loadList: function() {
        var pListCon = $('.p-list-con'),
            _this = this;
        pListCon.html('<div class="loading"></div>'); //加载进度条
        //请求产品列表接口
        _product.getProductList(this.data.listParam, function(res) {
            var html = _util.renderHtml(template, {
                list: res.list
            });
            $('.p-list-con').html(html);
            //加载分页信息
            _this.loadPagination({
                pageNum         : res.pageNum,
                pages           : res.pages,
                hasPreviousPage : res.hasPreviousPage,
                prePage         : res.prePage,
                hasNextPage     : res.hasNextPage,
                nextPage        : res.nextPage,               
            });                       
        }, function(errMsg) {
            _util.errorTip(errMsg);
        })
    },
    
    //加载分页组件
    loadPagination: function(cfg) {
        var _this = this;
        if (!this.pagination) {
            this.pagination = new Pagination();
        }
        this.pagination.render($.extend({}, cfg, {
            container   : $('.pagination'),
            onSelect    : function(pageNum) {
                    _this.data.listParam.pageNum = pageNum;
                    _this.loadList();
                }
        }))
    },

    //产品排序
    sortItem: function(e) {
        this.data.listParam.pageNum = 1;
        var $target = $(e.target);       
        while(!$target.hasClass('sort-item')){
            $target = $target.parent();
        }
        //默认排序
        if ($target.data('type') === 'default') {
            if ($target.hasClass('active')) {
                return;
            } else {
                $target.addClass('active')
                    .siblings('.sort-item').removeClass('active asc desc');
                this.data.listParam.orderBy = 'default';
            }               
        }        
        //价格排序
        if ($target.data('type') === 'price') {
            if (!$target.hasClass('active')) {
                $target.addClass('active')
                    .siblings('.sort-item').removeClass('active')
            }
            if ($target.hasClass('asc')) {
                $target.removeClass('asc').addClass('desc');
                this.data.listParam.orderBy = 'price_desc';
            } else {
                $target.removeClass('desc').addClass('asc');
                this.data.listParam.orderBy = 'price_asc';
            }                
        }
        this.loadList();                
    },

    bindEvent: function() {
        $('.sort-item').on('click', this.sortItem.bind(this))           
    },
    
}

$(function() {
    page.init();
})