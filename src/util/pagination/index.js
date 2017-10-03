/*
* @Author: midoDaddy
* @Date:   2017-10-03 23:32:27
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-10-04 00:10:13
*/
require('./index.css');
var _util = require('util/main.js'),
    template = require('./index.string');

var Pagination = function(cfg) {
    this.data.list = [];
    this.cfg = {
        pageNum: 1,
        pageSize: 10,
        pages: 1,
        pageRange: 10,
        hasPreviousPage: false,
        prePage: 0,
        hasNextPage: false,
        nextPage: 0
    }
    this.CFG = $.extend({}, this.cfg, cfg);
}

Pagination.prototype = {

    constructor: Pagination,

    getListData: function() {
        var list = this.data.list,
            CFG = this.CFG,
            minPage = Math.max((CFG.pageNum - CFG.pageRange/2), 1),
            maxPage = Math.min((CFG.pageNum + CFG.pageRange/2), CFG.pages);
        list.push({
            name: '上一页',
            value: CFG.prePage,
            disabled: !CFG.hasPreviousPage
        });

        for (var i = minPage; i <= maxPage; i++) {
            list.push({
                name: i,
                value: i,
                active: i === CFG.pageNum
            })
        }

        list.push({
            name: '下一页',
            value: CFG.nextPage,
            disabled: !CFG.hasNextPage
        });
    }

    render: function() {
        var _this = this;
        var html = _util.renderHtml(template, {
            list: _this.data.list,
            pageNum: _this.CFG.pageNum,
            pages: _this.CFG.pages
        });
        $('.pagination').html(html);
    }

}

module.exports = Pagination;