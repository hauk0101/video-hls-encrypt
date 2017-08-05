/**
 * Create by hauk0101 on 2017/8/3
 * @Desc 路由处理中心
 */

var express = require('express');
var router = express.Router();

//将默认根目录永久重定向为index路由
router.get('/',function(req,res,next){
   res.redirect(301,'/index');
});
//主页
router.get('/index',function(req,res){
    res.render('index');
});
//上传视频页面
router.get('/upload',function(req,res){
   res.render('upload');
});
//加密视频页面
router.get('/encrypt',function(req,res){
    res.render('encrypt');
});
//权限登录页面
router.get('/login',function(req,res){
    res.render('login');
});
//视频播放页面
router.get('/player',function(req,res){
   res.render('player');
});
module.exports = router;