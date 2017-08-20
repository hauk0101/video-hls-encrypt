/**
 * Create by hauk0101 on 2017/8/6
 * @Desc Demo主页模板逻辑处理
 * @Github //github.com/hauk0101
 */
;(function () {


    //元素对象
    var elementOBJ = {
        //获取数据的隐藏域对象
        index_input: document.getElementById('index-data'),
        //上传状态的元素
        upload_status: document.getElementById('index-upload-tip'),
        //视频加密按钮
        encrypt_btn: document.getElementById('index-encrypt-btn'),
        //视频加密状态的元素
        encrypt_status: document.getElementById('index-encrypt-tip'),
        //登录状态提示
        login_status: document.getElementById('index-login-tip'),
        //登录按钮
        login_btn: document.getElementById('index-login-btn'),
        //可播放状态提示
        play_status:document.getElementById('index-play-tip'),
        //视频播放按钮
        play_btn:document.getElementById('index-play-btn')
    };
    //post请求的相关数据
    var postData = {
        encrypt_data: {}
    };

    //入口
    init();

    function init() {
        initEvents();
        elementStatus();
    }


    //初始化事件
    function initEvents() {
    }

    //元素的状态
    function elementStatus() {

        setClickable(elementOBJ.encrypt_btn, false);
        //暂时打开登录
        // setClickable(elementOBJ.login_btn,false);
        // setClickable(elementOBJ.play_btn,false);

        //如果数据为空，则表示未进行任何操作
        if (elementOBJ.index_input && elementOBJ.index_input.value == "") {

        } else {
            var data = JSON.parse(elementOBJ.index_input.value);
            switch (data.type) {
                case 1:
                    uploadStatus(true);
                    setClickable(elementOBJ.encrypt_btn, true);
                    break;
                case 2:
                    encryptStatus(true);
                    setClickable(elementOBJ.login_btn,true);
                    break;
                case 3:
                    console.log('已登录');
                    break;
                case 4:
                    console.log('可观看');
                    break;
                default:
                    console.log('出现异常，请注意！');
                    break;
            }
        }
    }


    //修改上传状态
    function uploadStatus(bool) {
        if (bool) {
            elementOBJ.upload_status.innerHTML = '已上传';
        } else {
            elementOBJ.upload_status.innerHTML = '未上传';
        }

    }

    //修改加密状态
    function encryptStatus(bool) {
        if (bool) {
            elementOBJ.encrypt_status.innerHTML = '已加密';
        } else {
            elementOBJ.encrypt_status.innerHTML = '未加密';
        }

    }

    //修改登录状态


})();