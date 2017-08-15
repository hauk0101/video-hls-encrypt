/**
 * Create by hauk0101 on 2017/8/14
 * @Desc 加密页面的逻辑处理
 * @Github //github.com/hauk0101
 */

;(function(){
    var ecnrypt_input = document.getElementById('encrypt-data');
    var encrypt_btn = document.getElementById('encrypt-btn');
    var success_btn = document.getElementById('encrypt-success');
    var encrypt_out = document.getElementById('encrypt-out');

    var data = JSON.parse(ecnrypt_input.value);

    setClickable(success_btn,false);
    //添加事件
    eventBind(encrypt_btn,'click',function () {
        ajax({
            url:'/encrypt',
            type:'POST',
            data:data,
            dataType:'json',
            success:function(){

            },
            fail:function () {
                console.log('视频加密POST请求失败！');
            }
        });
        setClickable(encrypt_btn,false);
    });
    //websocket 成功，进行设置
    var socket = io.connect("//localhost:3000");
    socket.on('connection', function (data) {
        console.log('socket connection.');
    });
    socket.on('encrypt-event',function(data){
        console.log(data.msg);
        encrypt_out.innerHTML += '<br>' + data.msg;
        if(data.type == 1){
            setClickable(encrypt_btn,true);
        }
    });
    //有待修改
    socket.on('connect_error',function(){
       console.log('socket error.');
       socket.close();
    });


})();