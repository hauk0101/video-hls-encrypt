TODO LIST

## Must to do
* 搭建node+express框架
* 实现视频上传并转码为m3u8
* 实现视频加密
* 实现视频加密的相关cookie、session
* 实现简单的登录和未登录播放加密视频的效果

## Do more better
* 实现七牛加密相关的demo,只需要替代视频自行转码并加密部分
* 利用node中与FFmpeg相关的第三方插件实现相关需求
* 美化界面

## FFmpeg Command
* ffmpeg转mp4为加密后的hls
	```
	ffmpeg -i oceans.mp4 -hls_time 10 -hls_key_info_file key_info.key  ../output/m3u8_encrypt/playlist.m3u8 

	说明： oceans.mp4 为转换前的文件
	       -hls_key_info_file key_info.key 为加密相关的文件设置
		     key_info.key为同视频同级的key信息文件，其中key_info.key文件包含有2个必要的内容：
		    URI:XXX.key 即在服务器端存放key文件的地址
		    KEY_PATH:即在视频压缩端存放的key文件地址，应该是用作在播放时服务端进行比较时使用，必须与服务端存放的key文件内容一致
		    IV:可选值
	       （暂时只能通过videojs + videojs-contrib-hls进行播放）
	       需要安装ffmpeg,如果无法正常加密，确保安装了ffmpeg的环境变量，如果依旧不行，可以尝试关机重启
	       
	```
	 
## 权限登录
* 通过权限，最简单的实现cookie和session来允许是否可以访问静态文件
