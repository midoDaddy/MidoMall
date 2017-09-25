/*
* @Author: midoDaddy
* @Date:   2017-09-19 09:47:45
* @Last Modified by:   midoDaddy
* @Last Modified time: 2017-09-25 11:26:45
*/
require('./index.css');
require('page/common/header/index.js')

var util = require('util/main.js'),
    nav = require('page/common/nav/index.js'),
    navSide = require('page/common/nav-side/index.js');

navSide.init({
    name: 'user-center'
})
