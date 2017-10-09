/*
* @Author: midoDaddy
* @Date:   2017-10-03 23:32:27
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-10-09 10:20:31
*/
require('./index.css');
var _util = require('util/main.js'),
    template = require('./index.string');

var Pagination = function() {
    this.cfg = {
        pageNum: 1,
        pageSize: 10,
        pageRange: 10,
        container: null,
        onSelect: null
    } 
    this.bindEvent();  
}

Pagination.prototype = {

    constructor: Pagination,
    
    render: function(cfg) {
        var _this = this,
            html = '';
        this.CFG = $.extend({}, this.cfg, cfg); 
        if (!(this.CFG.container instanceof jQuery)) {
            return
        }
        if (this.CFG.pages <= 1) {
            return
        }       
        html = _util.renderHtml(template, {
            list: _this.getListData(),
            pageNum: _this.CFG.pageNum,
            pages: _this.CFG.pages
        });       
        this.CFG.container.html(html);
    },
    
    //获取分页列表数据
    getListData: function() {
        var listData = [],
            CFG = this.CFG,
            minPage = Math.max((CFG.pageNum - CFG.pageRange/2), 1),
            maxPage = Math.min((CFG.pageNum + CFG.pageRange/2), CFG.pages);

        listData.push({
            name: '上一页',
            value: CFG.prePage,
            disabled: !CFG.hasPreviousPage
        });

        for (var i = minPage; i <= maxPage; i++) {
            listData.push({
                name: i,
                value: i,
                active: (i === CFG.pageNum)
            })
        }

        listData.push({
            name: '下一页',
            value: CFG.nextPage,
            disabled: !CFG.hasNextPage
        });

        return listData;
    },
    
    //分页点击事件
    bindEvent: function() {
        var _this = this;
        $(document).on('click', '.pg-item', function(){
            var $this = $(this);
            if ($this.hasClass('disabled') || $this.hasClass('active')) {
                return;
            }
            //回调函数，返回页码数据
            if (typeof _this.CFG.onSelect === 'function') {
                _this.CFG.onSelect($(this).data('value'));
            }
        })
    }

}

module.exports = Pagination;