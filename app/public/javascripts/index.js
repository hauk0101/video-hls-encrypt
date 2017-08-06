/**
 * Create by hauk0101 on 2017/8/6
 * @Desc Demo主页模板逻辑处理
 * @Github //github.com/hauk0101
 */
 ;(function(){
     //获取数据的隐藏域对象
     var input = document.getElementById('index-data');
     //上传状态的元素
    var upload_status = document.getElementById('index-upload-tip');
     //如果数据为空，则表示未进行任何操作
    if(input && input.value ==""){
        console.log('请逐步进行操作');
    }else{
        var data = JSON.parse(input.value);
        switch (data.type){
            case 1:
                uploadStatus(true);
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

    //修改上传状态
    function uploadStatus(bool){
        if(bool){
            upload_status.innerHTML = '已上传';
        }else{
            upload_status.innerHTML = '未上传';
        }

    }

    //修改加密状态

    //修改登录状态

})();