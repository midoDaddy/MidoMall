/*
* @Author: midoDaddy
* @Date:   2017-09-25 10:56:01
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-09-25 11:35:23
*/
require('./index.css');
var _util = require('util/main.js'),
    template = require('./index.string');
    
var navSide = {
    init: function(option) {
        this.option = {
            name: '',
            navList: [
                {name: 'order-list', desc: '我的订单', href: './order-list.html'},
                {name: 'user-center', desc: '个人中心', href: './user-center.html'},
                {name: 'about', desc: '关于我们', href: './about.html'}
            ]
        }
        $.extend(this.option, option);
        this.renderNav();
    },
    renderNav: function() {
        var name = this.option.name;
        $.each(this.option.navList, function(index, item) {
            if (item.name === name) {
                item.isActive = true;
            }
        });
        console.log(this.option.navList)
        var navHtml = _util.renderHtml(template, {
            navList: this.option.navList
        });
        $('.nav-side-list').html(navHtml);
    },
    
}
module.exports = navSide;