/**
 * Create by hauk0101 on 2017/8/6
 * @Desc 视频上传处理
 */

var multer = require('multer');
var fs = require('fs');

var storage = multer.diskStorage({
    //设置上传后文件路径，如果文件夹路径不存在则会自动创建
    destination: function (req, file, cb) {
        var _noencryptPath = './public/videos/noencrypt';
        //如果没有videos目录，则创建之
        if(!fs.existsSync('./public/videos')){
            fs.mkdirSync('./public/videos');
        }
        //如果没有noencrypt目录，则创建之
        if(!fs.existsSync(_noencryptPath)){
            fs.mkdirSync(_noencryptPath);
        }
        cb(null,_noencryptPath);
    },
    //重命名上传的文件，并添加后缀
    filename:function(req,file,cb){
        var fileFormat = (file.originalname).split('.');
        cb(null,fileFormat[0] + '.' + fileFormat[fileFormat.length - 1]);
    }
});

var upload = multer({storage:storage});
module.exports = upload;