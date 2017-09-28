/*
* @Author: midoDaddy
* @Date:   2017-09-19 09:47:45
* @Last Modified by:   midoDaddy
<<<<<<< HEAD
* @Last Modified time: 2017-09-28 18:18:33
*/
require('./index.css');
require('page/common/header/index.js');
require('util/unslider/index.js');

var _util = require('util/main.js'),
    nav = require('page/common/nav/index.js');

$(function() {

    //初始化banner
    var unslider = $('.banner').unslider({
        dots: true
    });
    //上一张事件
    $('.banner-arrow.prev').on('click', function() {
        unslider.data('unslider').prev();
    });
    //下一张事件
    $('.banner-arrow.next').on('click', function() {
        unslider.data('unslider').next();
    })
    
})
