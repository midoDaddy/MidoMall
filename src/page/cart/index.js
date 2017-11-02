/*
* @Author: midoDaddy
* @Date:   2017-10-10 09:44:08
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-10-11 09:58:25
*/
require('./index.css');
require('page/common/header/index.js');


var _util       = require('util/main.js'),
    _cart       = require('service/cart-service.js'),
    template    = require('./index.string'),
    nav         = require('page/common/nav/index.js');

var page = {

    init: function() {
        this.render();
        this.bindEvent();
    },
    
    //渲染页面
    render: function() {
        var _this = this;
        //获取购物车列表
        _cart.getCartList(function(res) {
            _this.renderList(res);
        }, function(errMsg) {
            _this.showError(errMsg);
        })       
    },
    
    //渲染订单列表
    renderList: function(data) {
        this.filter(data)
        var html = _util.renderHtml(template, data);
        $('.page-wrapper').html(html);
        nav.loadCartCount();
    },
    

    //处理返回数据
    filter: function(data) {
        data.empty = (data.cartProductVoList.length === 0)
    },
    

    bindEvent: function() {
        var _this = this;
        
        //商品的全选、取消全选
        $(document).on('click', '.cart-select-all', function() {
            var $this = $(this);
            if ($this.is(':checked')) {
                _cart.selectAll(function(res){
                    _this.renderList(res);
                }, function(errMsg) {
                    _this.showError(errMsg);
                })
            } else {
                _cart.unSelectAll(function(res){
                    _this.renderList(res);
                }, function(errMsg) {
                    _this.showError(errMsg);
                })
            }
            
        });
    
        //商品的选择、取消选择
        $(document).on('click', '.cart-select', function() {
            var $this = $(this),
                productId = $this.parents('.cart-table').data('product-id');
            if ($this.is(':checked')) {
                _cart.selectProduct({
                    productId: productId
                }, function(res){
                    _this.renderList(res);
                }, function(errMsg) {
                    _this.showError(errMsg);
                })
            } else {
                _cart.unSelectProduct({
                    productId: productId
                }, function(res){
                    _this.renderList(res);
                }, function(errMsg) {
                    _this.showError(errMsg);
                })
            }
        });

        //商品数量的增减
        $(document).on('click', '.count-btn', function() {
            var $this = $(this),
                $countInput = $this.siblings('.count-input'),
                countNow = parseInt($countInput.val(), 10),
                maxCount = $countInput.data('max'),
                productId = $this.parents('.cart-table').data('product-id');
            
            if ($this.hasClass('plus')) {
                if (countNow >= maxCount) {
                    _util.errorTip('库存不足');
                    return
                }
                countNow++;
            }
            if ($this.hasClass('minus')) {
                countNow = Math.max(countNow - 1, 1);
            }

            _cart.updateCount({
                productId: productId,
                count: countNow
            }, function(res){
                _this.renderList(res);
            }, function(errMsg) {
                _this.showError(errMsg);
            })
        });

        //商品数量的填写
        $(document).on('blur', '.count-input', function() {
            var $this = $(this),
                count = parseInt($this.val(), 10),
                maxCount = $this.data('max'),
                productId = $this.parents('.cart-table').data('product-id');
            if (count >= maxCount) {
                alert('库存不足');
            }
            count = Math.min(Math.max(count, 1), maxCount);
            _cart.updateCount({
                productId: productId,
                count: count
            }, function(res){
                _this.renderList(res);
            }, function(errMsg) {
                _this.showError(errMsg);
            })
        });

        //删除单个商品
        $(document).on('click', '.cart-delete', function() {
            var productId = $(this).parents('.cart-table').data('product-id');
            if (confirm('确定要删除该商品吗')) {
                _this.deleteProduct(productId);
            }
        });

        //删除多个商品
        $(document).on('click', '.delete-selected', function() {
            var idArr = [];
            $('.cart-select:checked').each(function() {
                var thisId = $(this).parents('.cart-table').data('product-id')
                idArr.push(thisId);
            });
            if (idArr.length) {
                if (confirm('确定删除选中的商品吗？')) {
                    _this.deleteProduct(idArr.join(','));
                } 
            } else {
                _util.errorTip('您未选中任何商品')
            }                       
        });

        //提交订单
        $(document).on('click', '.btn-submit', function() {
            var totalPrice = parseInt($('.submit-total').text().slice(1))
            if (totalPrice > 0) {
                window.location.href = './order-confirm.html'
            } else {
                _util.errorTip('请选中商品后再提交')
            }               
        });
    },

    //删除商品
    deleteProduct: function(productIds) {
        var _this = this;
        _cart.deleteProduct({
            productIds: productIds
        }, function(res){
            _this.renderList(res);
        }, function(errMsg) {
            _this.showError(errMsg);
        })
    },

    //错误提示
    showError: function(errMsg) {
        $('.page-wrapper').html('<p class="err-tip">' + errMsg + '</p>');
    }
    
}

$(function() {
    page.init();
})