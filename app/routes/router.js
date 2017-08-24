/**
 * Create by hauk0101 on 2017/8/3
 * @Desc 路由处理中心
 */

var express = require('express');
var fs = require('fs');
var router = express.Router();

var upload = require('../controllers/upload');
var encrypt = require('../controllers/encrypt');

//websocket io
var mysocket;
//将默认根目录永久重定向为index路由
router.get('/', function (req, res, next) {
    res.redirect(301, '/index');
});
//主页
router.get('/index', function (req, res) {
    res.render('index',{data:null});
});
//上传视频页面
router.get('/upload', function (req, res) {
    res.render('upload');
});
//加密视频页面
router.get('/encrypt', function (req, res) {
    res.send('请先上传视频！');
});
//权限登录页面
router.get('/login', function (req, res) {
    if(req.session.username && req.session.username === 'admin'){
         res.render('login',{data:{code:0,msg:'已登录！'}})
    }
    else{
        res.render('login',{data:null});
    }
});
//权限登录处理
router.post('/login',function(req,res){
    console.log("登录信息：",req.body);
    var _username = req.body.username;
    var _password = req.body.password;
    if(_username === 'admin' && _password === 'admin'){
        req.session.username = _username;
        res.json({code:0,msg:'登录成功！'});
    }else{
        res.json({code:1,msg:'账号或名密码错误！'});
    }
    req.session.username = req.body.username;
    req.session.password = req.body.password;
});
//视频播放页面
router.get('/player', function (req, res) {
    res.render('player');
});
router.post('/player-name-test',function(req,res){
    var _exist,_url;
    var _path = './public/videos/encrypt/' + req.body.player_name;
    console.log(fs.existsSync(_path));
    if(fs.existsSync(_path)){
        _exist = true;
        _url = 'http://localhost:3000/videos/encrypt/' + req.body.player_name + '/playlist.m3u8'
    }else{
        _exist = false;
    }
    res.json({exist:_exist,url:_url});
})

//视频加密POST请求处理
router.post('/encrypt',function (req,res) {
    console.log(req.body);
    //为了表现压缩过程，转发一下视频加密的相关数据
    encrypt(req.body,mysocket,function(err,data){
        console.log(err,data);
        res.send({err:err,data:data});
    });
});
//加密成功后继续
router.get('/encrypt-success',function(req,res){
    res.render('index',{
        data:{
            type:2
        }
    })
});

//上传视频POST请求处理
router.post('/upload-video', function (req, res) {
    var _upload = upload.single('file');
    _upload(req, res, function (err) {
        if (err) {
            console.log('上传失败！');
        }
        else {
            res.render('encrypt',{
                data :{
                    type:1,
                    noencryptPath: req.file.destination,
                    fileName: req.file.originalname,
                    encryptPath: './public/videos/encrypt'
                }
            });
        }
        console.log(req.file);
    });
});

module.exports = function(app){
    io = app.io;
    app.io.on('connection', function (socket) {
        mysocket = socket;
    });
    return router;
};