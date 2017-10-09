/*
* @Author: midoDaddy
* @Date:   2017-10-09 15:43:44
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-10-09 16:54:55
*/
require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');

var _util       = require('util/main.js'),
    _product    = require('service/product-service.js'),
    _cart       = require('service/cart-service.js'),
    template    = require('./index.string');

var page = {

    data: {
        productId: _util.getUrlParam('productId') || ''
    },

    init: function() {
        this.loadDetail();
        this.bindEvent();
    },
    
    //加载产品详情信息
    loadDetail: function() {
        var html = '',
            _this = this,
            $pageWrapper = $('.page-wrapper');
        if (!this.data.productId) {
            _util.goHome(); 
            return;
        }
        $pageWrapper.html('<div class="loading"></div>');
        _product.getProudctDetail({
            productId: _this.data.productId
        }, function(res) {
            _this.data.detailInfo = res;
            html = _util.renderHtml(template, _this.filter(res));
            $pageWrapper.html(html);
        }, function(errMsg) {
            $pageWrapper.html('<div class="err-tip">' + errMsg + '</div>');
        })       
    },
    
    //数据处理，分割subImage数据
    filter: function(data) {
        data.subImages = data.subImages.split(',');
        return data;
    },

    bindEvent: function() {
        var _this = this;
        //图片预览
        $(document).on('mouseenter', '.p-img', function() {
            $('.main-img').attr('src', $(this).attr('src'))
        });  

        //改变商品数量
        $(document).on('click', '.p-count-btn', function() {
            var pCountInput = $('.p-count-input'),
                count = parseInt(pCountInput.val(), 10),
                $this = $(this);           
            if ($this.hasClass('btn-plus')) {
                count =  Math.min(_this.data.detailInfo.stock, count + 1);                
            }
            if ($this.hasClass('btn-minus')) {
                count = Math.max(0, count - 1);
            }
            pCountInput.val(count);
        });  

        //添加购物车
        $(document).on('click', '.cart-add', function() {
            _cart.addToCart({
                productId: _this.data.productId,
                count: parseInt($('.p-count-input').val(), 10)
            }, function(res){
                window.location.href = './result.html?type=cart-add';
            }, function(errMsg){
                _util.errorTip(errMsg)
            })
        });  

    },
    
}

$(function() {
    page.init();
})