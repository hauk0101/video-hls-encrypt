/**
 * Create by hauk0101 on 2017/8/6
 * @Desc 视频上传处理
 */

var multer = require('multer');

var storage = multer.diskStorage({
    //设置上传后文件路径，如果文件夹路径不存在则会自动创建
    destination: function (req, file, cb) {
        cb(null,'./public/videos/noencrypt');
    },
    //重命名上传的文件，并添加后缀
    filename:function(req,file,cb){
        var fileFormat = (file.originalname).split('.');
        cb(null,fileFormat[0] + '.' + fileFormat[fileFormat.length - 1]);
    }
});

var upload = multer({storage:storage});
module.exports = upload;