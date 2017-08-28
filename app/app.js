var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var app = express();
var router = require('./routes/router');
//websocket
var socket_io = require('socket.io');
var io = socket_io();
app.io = io;


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
//静态资源访问时的跨域设置
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});
//设置session,设置为1天有效
app.use(session({
    name:'video-hls-encrypt',
    secret:'encrypt',
    cookie:{
        maxAge:1000 * 60 * 60 * 24
    }
}));
//静态资源访问限制,
app.use(function (req, res, next) {
    var static = /^(\/public|\/key)/g;//设置指定文件目录
    var suffix = /(\.key)$/g;//后缀格式指定
    // if ((req.session.username != 'admin')
    //     && (static.test(req.path) && suffix.test(req.path) )) {
    //     console.log('用户未登录，不允许访问key文件');
    //     return res.send('请求非法');
    // }
    // else {
    //     console.log('当前用户已登录');
        next();
    // }
});
app.use(express.static(path.join(__dirname, 'public')));

//路由
app.use('/', router(app));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
