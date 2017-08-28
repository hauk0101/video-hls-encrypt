/**
 * Create by hauk0101 on 2017/8/22
 * @Desc 视频播放页面逻辑处理
 * @Github //github.com/hauk0101
 */

;(function(){
    var player_name = document.getElementById('player-name');
    var test_btn = document.getElementById('player-test-btn');
    var play_btn = document.getElementById('player-play-btn');
    var player_container = document.getElementById('player-container');
    var player_tip = document.getElementById('player-tip');

    var video_name,video_url,canPlay;

    //检测按钮点击处理函数
    eventBind(test_btn,'click',function(){
        canPlay = false;
       if(player_name.value && player_name.value != ""){
           video_name = player_name.value;
            ajax({
               url:'/player-name-test',
                type:'post',
                data:{player_name:player_name.value},
                dataType:'json',
                success:function(data){
                   if(data){
                       data = JSON.parse(data);
                       if(data.exist){
                           canPlay = true;
                           setClickable(play_btn,true);
                           setClickable(test_btn,true);
                           video_url = data.url;
                           player_tip.innerHTML = '视频存在，可正常播放，视频名为 :' + video_name;
                       }else{
                           alert('视频不存在，请输入正确的视频名称！');
                           setClickable(test_btn,true);
                           player_tip.innerHTML = '播放前请检测视频是否存在，如不存在则无法正常播放！';
                       }
                   }
                },
                fail:function () {
                    alert('检测视频异常！');
                    player_tip.innerHTML = '播放前请检测视频是否存在，如不存在则无法正常播放！';
                }
            });
           setClickable(test_btn,false);
       } else{
           alert('请输入需要检测的视频文件名！');
           player_tip.innerHTML = '播放前请检测视频是否存在，如不存在则无法正常播放！';
       }
    });
    //播放按钮点击处理函数
    eventBind(play_btn,'click',function(){
        if(canPlay){
            setHide(player_container,true);
            var myPlayer = videojs('my-video');
            myPlayer.ready(function() {
                this.src({
                    src: video_url,
                    type: 'application/x-mpegURL'
                });
                this.play();
            });
        }else{
            alert('视频不存在，请输入正确的视频名称！');
        }

    });
})();