/**
 * Create by hauk0101 on 2017/8/13
 * @Desc 视频加密处理
 * @Github //github.com/hauk0101
 */

var fs = require('fs');
var ffmpegCommand = require('fluent-ffmpeg');

/**
 * 加密处理方法
 * @param options 加密相关参数
 * @param callback 加密结果回调
 */
function encryptHandle(options,socket, callback) {
    var _name = options.fileName.split('.')[0];
    var _type = options.fileName.split('.')[1];
    var _encryptPath = options.encryptPath + '/' + _name;
    var _videoPath = options.noencryptPath + '/' + options.fileName;
    var _keyInfoPath = './public/key/key_info.key';
    var _outputPath = _encryptPath + '/playlist.m3u8';

    //如果没有encrypt目录，则创建之
    if(!fs.existsSync(options.encryptPath)){
        fs.mkdirSync(options.encryptPath);
    };
    //如果没有对应的文件目录，则创建之
    if(!fs.existsSync(_encryptPath)){
        fs.mkdirSync(_encryptPath);
    };
    encryptFun(options,socket, callback);
}

/**
 * 加密处理方法
 * @param options 加密数据的相关参数
 * @param socket socket输出
 * @param callback 回调函数
 */
function encryptFun(options,socket, callback) {
    var _name = options.fileName.split('.')[0];
    var _type = options.fileName.split('.')[1];
    var _encryptPath = options.encryptPath + '/' + _name;
    var _videoPath = options.noencryptPath + '/' + options.fileName;
    var _keyInfoPath = './public/key/key_info.key';
    var _outputPath = _encryptPath + '/playlist.m3u8';
    console.log('begin encrypt Fun');
    if (_type == 'mp4') {
        ffmpegCommand(_videoPath)
            .addOption('-hls_time', '10')   //设置每个片段的长度
            .addOption('-hls_key_info_file', _keyInfoPath)
            .save(_outputPath)
            .on('end', function () {
                socket.emit('encrypt-event',{msg:'Encrypt the ' + options.fileName + ' file OK!',type:1});
                callback(null, 'Encrypt the ' + options.fileName + ' file OK!');
            })
            .on('stderr', function (stderrLine) {
                console.log('Stderr output: ' + stderrLine);
                socket.emit('encrypt-event',{msg:stderrLine});
            })
            .on('error', function (err, stdout, stderr) {
                console.log('Cannot process video: ' + err.message);
                socket.emit('encrypt-event',{msg:err.message});
                callback(err, err.message);
            });
    }
    else{
        callback('type err','file type is not mp4.');
    }
}

module.exports = encryptHandle;