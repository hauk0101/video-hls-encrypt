/**
 * Create by hauk0101 on 2017/8/13
 * @Desc 工具类
 * @Github //github.com/hauk0101
 */

/**
 * 原生ajax请求
 * @param options
 *    url: "./TestXHR.aspx",              //请求地址
 *    type: "POST",                       //请求方式
 *    data: { name: "super", age: 20 },        //请求参数
 *    dataType: "json",
 *    success: function (response, xml) {
 *           // 此处放成功后执行的代码
 *       },
 *    fail: function (status) {
 *           // 此处放失败后执行的代码
 *       }
 */
function ajax(options) {
    options = options || {};
    options.type = (options.type || "GET").toUpperCase();
    options.dataType = options.dataType || "json";
    var params = formatParams(options.data);

    //创建 - 非IE6 - 第一步
    if (window.XMLHttpRequest) {
        var xhr = new XMLHttpRequest();
    } else { //IE6及其以下版本浏览器
        var xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }

    //接收 - 第三步
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            var status = xhr.status;
            if (status >= 200 && status < 300) {
                options.success && options.success(xhr.responseText, xhr.responseXML);
            } else {
                options.fail && options.fail(status);
            }
        }
    }

    //连接 和 发送 - 第二步
    if (options.type == "GET") {
        xhr.open("GET", options.url + "?" + params, true);
        xhr.send(null);
    } else if (options.type == "POST") {
        xhr.open("POST", options.url, true);
        //设置表单提交时的内容类型
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(params);
    }
}

//格式化参数
function formatParams(data) {
    var arr = [];
    for (var name in data) {
        arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
    }
    arr.push(("v=" + Math.random()).replace(".", ""));
    return arr.join("&");
}

//事件绑定
function eventBind(obj, eventType, callBack) {
    if (obj.addEventListener) {
        obj.addEventListener(eventType, callBack, false);
    }
    else if (window.attachEvent) {
        obj.attachEvent('on' + eventType, callBack);
    }
    else {
        obj['on' + eventType] = callBack;
    }
};

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

//设置元素是否可见
function setHide(obj,bool){
    if(bool){
        var reg = new RegExp('(\\s|^)' + 'obj-disable' + '(\\s|$)');
        obj.className = obj.className.replace(reg,' ');
    }else{
        obj.className += ' ' + 'obj-disable';
    }
}