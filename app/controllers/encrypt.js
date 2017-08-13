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
function encryptHandle(options, callback) {
    var _name = options.fileName.split('.')[0];
    var _type = options.fileName.split('.')[1];
    var _encryptPath = options.encryptPath + '/' + _name;
    var _videoPath = options.noencryptPath + '/' + options.fileName;
    var _keyInfoPath = './public/key/key_info.key';
    var _outputPath = _encryptPath + '/playlist.m3u8';
    console.log('++', _encryptPath)
    //创建对应的文件目录
    if (fs.existsSync(_encryptPath)) {
        encryptFun(options, callback);

    } else {
        fs.mkdirSync(_encryptPath);
        encryptFun(options, callback);
    }
    console.log(fs.existsSync(options.encryptPath + '/' + _name));
}

function encryptFun(options, callback) {
    var _name = options.fileName.split('.')[0];
    var _type = options.fileName.split('.')[1];
    var _encryptPath = options.encryptPath + '/' + _name;
    var _videoPath = options.noencryptPath + '/' + options.fileName;
    var _keyInfoPath = './public/key/key_info.key';
    var _outputPath = _encryptPath + '/playlist.m3u8';
    console.log('begin encrypt Fun');
    if (_type == 'mp4') {
        ffmpegCommand(_videoPath)
            .addOption('-hls_time', '10')
            .addOption('-hls_key_info_file', _keyInfoPath)
            .save(_outputPath)
            .on('end', function () {
                //TODO 成功压缩后，返回访问地址
            })
            .on('stderr', function (stderrLine) {
                console.log('Stderr output: ' + stderrLine);
            })
            .on('error', function (err, stdout, stderr) {
                console.log('Cannot process video: ' + err.message);
                callback(err, err.message);
            });
    }
    else{
        callback('type err','file type is not mp4.');
    }
}

module.exports = encryptHandle;