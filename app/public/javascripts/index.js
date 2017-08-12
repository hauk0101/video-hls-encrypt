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
        encrypt_btn: document.getElementById('index-encrypt-btn')
    };
    //post请求的相关数据
    var postData = {
        encrypt_data: {}
    }

    //入口
    init();

    function init() {
        initEvents();
        elementStatus();
    }


    //初始化事件
    function initEvents() {
        //视频加密按钮点击事件
        eventBind(elementOBJ.encrypt_btn, 'click', function () {
            ajax({
                url:'/encrypt',
                type:'POST',
                data:postData.encrypt_data,
                dataType:'json',
                success:function(){
                    console.log('ok');
                },
                fail:function () {
                    console.log('no ok');
                }
            })
        });
    }

    //元素的状态
    function elementStatus() {

        setClickable(elementOBJ.encrypt_btn,false);

        //如果数据为空，则表示未进行任何操作
        if (elementOBJ.index_input && elementOBJ.index_input.value == "") {

        } else {
            var data = JSON.parse(elementOBJ.index_input.value);
            switch (data.type) {
                case 1:
                    uploadStatus(true);
                    postData.encrypt_data.noencryptPath = data.noencryptPath;
                    postData.encrypt_data.fileName = data.fileName;
                    postData.encrypt_data.encryptPath = data.encryptPath;
                    setClickable(elementOBJ.encrypt_btn,true);
                    break;
                case 2:
                    console.log('已加密');
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

    //修改登录状态


    //设置对应的按钮可点击状态
    function  setClickable(btn,bool) {
        if(bool){
            var reg = new RegExp('(\\s|^)' + 'btn-disable' + '(\\s|$)');
            btn.className = btn.className.replace(reg,' ');
            btn.removeAttribute('disabled');
        }else{
            btn.className += ' ' + 'btn-disable';
            btn.setAttribute('disabled','disabled');
        }
    }
})();