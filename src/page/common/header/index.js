/*
* @Author: midoDaddy
* @Date:   2017-09-24 21:59:13
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-09-24 22:21:10
*/
require('./index.css');
var _util = require('util/main.js');
    
var header = {
    init: function() {
        this.onload();
        this.bindEvent();
    },

    //搜索框关键词回填
    onload: function() {
        var keyword = _util.getUrlParam('keyword');
        keyword && $('#search-input').val(keyword);       
    },

    bindEvent: function() {
        var _this = this;
        $('#search-btn').on('click', this.searchSubmit.bind(this));
        $('#search-input').on('keyup', function(e) {
            if (e.keyCode === 13) {
                _this.searchSubmit();
            }
        })
    },

    //搜索提交
    searchSubmit: function() {
        var keyword = $.trim($('#search-input').val());
        if (keyword) {
            window.location.href = './list.html?keyword=' + keyword;
        } else {
            _util.goHome();
        }
    }  
}
header.init();