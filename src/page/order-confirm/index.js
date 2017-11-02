/*
* @Author: midoDaddy
* @Date:   2017-10-11 10:10:52
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-11-02 17:14:23
*/
require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');

var _util               = require('util/main.js'),
    _order              = require('service/order-service.js'),
    _address            = require('service/address-service.js'),
    addressModal       = require('./address-modal.js'),
    productTemplate     = require('./product-list.string'),
    addressTemplate     = require('./address-list.string');

var page = {
    data: {
        selectedId: null
    },

    init: function() {
        this.loadAddressList();
        this.loadProductList();
        this.bindEvent();
    },

    //加载地址列表
    loadAddressList: function() {
        var html = '',
            _this = this,
            $addressCon = $('.address-con');
        $addressCon.html('<div class="loading"></div>');
        _address.getAddressList({
           
        }, function(res){            
            _this.filter(res);
            html = _util.renderHtml(addressTemplate, res);
            $addressCon.html(html);
        }, function(errMsg) {
            $addressCon.html('<p class=err-tip>' + errMsg + '<p>');
        })
    },
   
    //加载产品列表
    loadProductList: function() {
        var html = '',
            $productCon = $('.product-con');
        $productCon.html('<div class="loading"></div>');
        _order.getProductList(function(res){                       
            html = _util.renderHtml(productTemplate, res);
            $productCon.html(html);
        }, function(errMsg) {
            $productCon.html('<p class=err-tip>' + errMsg + '<p>');
        })
    },

    //地址列表数据处理
    filter: function(data) {
        var lists = data.list,
            flag = false;
        if (this.data.selectedId) {
            for (var i = 0, length = lists.length; i < length; i++) {
                if (this.data.selectedId === lists[i].id) {
                    lists[i].isActive = true;
                    flag = true;
                }
            }
        }  
        if (!flag) {
            this.data.selectedId = null;
        }     
    },
    
    //绑定事件
    bindEvent: function() {
        var _this = this;

        //选中地址
        $(document).on('click', '.address-item', function() {
            $(this).addClass('active')
                .siblings('.address-item').removeClass('active');
            _this.data.selectedId = $(this).data('id');
        });

        //提交订单
        $(document).on('click', '.btn-submit', function() {
            var shippingId = _this.data.selectedId;
            if (!shippingId) {
                _util.errorTip('请选中地址后再提交')
            } else {
                _order.create({
                    shippingId: shippingId
                }, function(res) {
                    window.location.href = './payment.html?orderNumber=' + res.orderNo;
                }, function(errMsg) {
                    _util.errorTip(errMsg)
                })
            }           
        });
        
        //新增地址
        $(document).on('click', '.address-add', function() {
            addressModal.show({
                isUpdate    : false,
                onSuccess   : function() {
                    _this.loadAddressList();
                }
            });
        });

        //编辑地址
        $(document).on('click', '.address-update', function() {
            var shippingId = $(this).parents('.address-item').data('id');
            _address.getAddressInfo({
                shippingId: shippingId
            }, function(res) {
                addressModal.show({
                    isUpdate    : true,
                    data        : res,
                    onSuccess   : function() {
                        _this.loadAddressList();
                    }
                });
            }, function(errMsg) {
                _util.errorTip(errMsg);
            })            
        });

        //删除地址
        $(document).on('click', '.address-delete', function(e) {
            e.stopPropagation();
            var shippingId = $(this).parents('.address-item').data('id');
            if (confirm('确定要删除该地址吗')) {
                _address.delete({
                    shippingId: shippingId
                }, function(res) {
                    _this.loadAddressList();
                }, function(errMsg) {
                    _util.errorTip(errMsg);
                })   
            }          
        });
    },
    
}

$(function() {
    page.init();
})