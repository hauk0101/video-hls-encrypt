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

router.get('/index',function(req,res){
    res.render('index',{});
});

module.exports = router;