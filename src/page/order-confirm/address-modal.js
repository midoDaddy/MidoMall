/*
* @Author: midoDaddy
* @Date:   2017-10-17 10:26:38
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-11-02 17:14:14
*/

var _util           = require('util/main.js'),
    _address        = require('service/address-service.js'),
    _city           = require('util/city.js'),
    modalTemplate   = require('./address-modal.string');

var addressModal = {
    
    show: function(option) {
        this.option = option;
        this.modalWrap = $('.modal-wrap');
        this.loadModal();
        this.loadProvinceOption();
        this.bindEvent();
    },

    loadModal: function() {
        var html = _util.renderHtml(modalTemplate, {
            isUpdate: this.option.isUpdate,
            data: this.option.data
        });   
        this.modalWrap.html(html);              
    },
    
    removeModal: function() {
        this.modalWrap.empty();
    },

    //加载省份信息
    loadProvinceOption: function() {
        var html = this.getOptionHtml(_city.getProvinces());
        $('#receiver-province').html(html);
        if (this.option.isUpdate) {
            var province = this.option.data.receiverProvince;
            $('#receiver-province').val(province);
            this.loadCityOption(province);
            $('#receiver-city').val(this.option.data.receiverCity);
        }
    },

    //加载城市信息
    loadCityOption: function(province) {
        var html = this.getOptionHtml(_city.getCities(province));
        $('#receiver-city').html(html);
    },

    //生成option选项的html
    getOptionHtml: function(data) {
        var html = '<option value="">请选择</option>';
        for (var i = 0, length = data.length; i < length; i++) {
            html += '<option value="' + data[i] + '">' + data[i] + '</option>'
        }
        return html;
    },

    //地址信息验证
    infoValidate: function() {
        var addressInfo = {
            receiverName        : $('#receiver-name').val(),
            receiverProvince    : $('#receiver-province').val(),
            receiverCity        : $('#receiver-city').val(),
            receiverAddress     : $('#receiver-address').val(),
            receiverPhone       : $('#receiver-phone').val(),
            receiverZip         : $('#receiver-zip').val()
        }
        if (this.option.isUpdate) {
            addressInfo.id = this.option.data.id
        }
        if (!addressInfo.receiverName) {
            _util.errorTip('收件人姓名不能为空');
            return false;
        }
        if (!addressInfo.receiverProvince) {
            _util.errorTip('收件人省份不能为空');
            return false;
        }
        if (!addressInfo.receiverCity) {
            _util.errorTip('收件人城市不能为空');
            return false;
        }
        if (!addressInfo.receiverAddress) {
            _util.errorTip('收件人地址不能为空');
            return false;
        }
        if (!addressInfo.receiverPhone) {
            _util.errorTip('收件人电话不能为空');
            return false;
        }
        this.addressInfo = addressInfo;
        return true;
    },

    bindEvent: function() {
        var _this = this;

        //关闭窗口
        $('.close').on('click', function(e) {
            _this.removeModal();
        });
        $('.modal-con').on('click', function(e) {
            e.stopPropagation();
        });

        //选择省份后，加载城市信息
        $('#receiver-province').on('change', function() {
            _this.loadCityOption($(this).val());            
        });

        //保存收货地址
        $('.address-confirm-btn').on('click', function(e) {
            var validateState = _this.infoValidate();
            //验证通过，添加地址信息
            if (validateState && !_this.option.isUpdate) {
                _address.add(_this.addressInfo, function(res) {
                    _util.successTip('地址添加成功');
                    _this.removeModal();
                    typeof _this.option.onSuccess === 'function' && _this.option.onSuccess(res);
                }, function(errMsg) {
                    _util.errorTip(errMsg)
                })
            }
            //验证通过，更新地址信息
            else if (validateState && _this.option.isUpdate) {
                _address.update(_this.addressInfo, function(res) {
                    _util.successTip('地址更新成功');
                    _this.removeModal();
                    typeof _this.option.onSuccess === 'function' && _this.option.onSuccess();
                }, function(errMsg) {
                    _util.errorTip(errMsg)
                })
            }
        });
    }    
}

module.exports = addressModal;