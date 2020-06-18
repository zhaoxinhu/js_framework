// 封装自己的弹窗
(function(w) {
    var layer = {};
    // 简单提示
    layer.msg = function(msg, options) {
        var element = document.createElement("div");
        var styleOptions = {
            "backgroundColor": "#000",
            "width": "100px",
            "height": "30px",
            "opacity": 0.8,
            "color": "white",
            "textAlign": "center",
            "lineHeight": "30px",
            "borderRadius": "5px",
            "fontSize": "1rem",
            "position": "absolute"
        };
        for (var key in options) {
            if (options[key]) {
                styleOptions[key] = options[key];
            }
        }
        for (var key in styleOptions) {
            element.style[key] = styleOptions[key];
        }
        element.innerText = msg?msg:'提示信息';
        // 获取浏览器可视化区域大小
        var height = document.documentElement.clientHeight;
        var width = document.documentElement.clientWidth;
        // 获取要显示div的大小
        var divHeight = element.offsetHeight;
        var divWidth = element.offsetHeight;
        // 设置top和left
        if (event) {
            element.style.left = event.clientX + "px";
            element.style.top = event.clientY + "px";
        } else {
            element.style.top = (height - divHeight)/2 + "px";
            element.style.left = (width - divWidth)/2 + "px";
        }
        var timeout = 2000;
        if (options && options["timeout"]) {
            timeout = options["timeout"];
        }
        document.body.append(element);
        setTimeout(function() {
            element.remove();
        }, timeout);
    }

    // 带按钮的弹窗
    layer.open = function(title, content, options) {
        // 1、 构造一个遮罩层
        _showShade();
        // 2、 构造一个简单弹窗
        _showOpenDiv(title, content, options);
    };
    // 遮罩
    function _showShade() {
        var shadeDiv = document.createElement("div");
        shadeDiv.style.cssText=
            "width:100%;" + 
            "height:100%;" + 
            "background-color:rgba(0, 0, 0,0.3);" + 
            "zIndex:19891017;" + 
            "position:fixed;" + 
            "top:0;" + 
            "left:0;";
        shadeDiv.id = "layer-open-shade";
        document.body.append(shadeDiv);
    }
    // 创建弹窗div
    function _showOpenDiv(title, content, options) {
        // 1、 构造大的div
        var openDiv = document.createElement("div");
        openDiv.style.cssText=
            "width:260px;" + 
            "height:154px;" + 
            "position:fixed;" + 
            "zIndex:19891018;" + 
            "border-radius:2px;" + 
            "background-color:#fff;" + 
            "box-shadow:1px 1px 50px rgba(0,0,0,.3);";
        openDiv.id = "layer-open-div";
        // 居中显示
        //  获取可视化区域大小，计算显示位置
        var clientWidth = window.innerWidth;
        var clientHeight = window.innerHeight;
        openDiv.style.left = ((clientWidth - 260) / 2) + "px";
        openDiv.style.top = ((clientHeight - 154) / 2) + "px";

        //监听window大小变化
        window.addEventListener('resize', function(res){
            openDiv.style.left = ((res.target.innerWidth - 260) / 2) + "px";
            openDiv.style.top = ((res.target.innerHeight - 154) / 2) + "px";
        });

        // 2、 构造title
        var titleDiv = document.createElement("div");
        titleDiv.innerText = title?title:'在线调试';
        titleDiv.style.cssText=
            "height:42px;" + 
            "border-bottom:1px solid #eee;" + 
            "padding:0 80px 0 20px;" + 
            "line-height:42px;" + 
            "font-size:14px;" + 
            "color:#333;" + 
            "overflow:hidden;" + 
            "background-color:#F8F8F8;" + 
            "border-radius:2px 2px 0 0;";

        // 3、 构造content
        var contentDiv = document.createElement("div");
        contentDiv.innerText = content?content:'显示内容';
        contentDiv.style.cssText=
            "position:relative;" + 
            "padding:20px;" + 
            "line-hight:24px;" + 
            "word-break:break-all;" + 
            "font-size:14px;" + 
            "overflowX:hidden;" + 
            "overflowY:auto;";
        // 4、 构造btn
        var btnDiv = document.createElement("div");
        btnDiv.style.cssText=
            "text-align:right;" + 
            "padding:0 15px 12px;" + 
            "pointer-events:auto;";

        var btn1 = _createBtn("确定");
        btn1.id = "layer-open-btn-yes";
        // 增加默认的关闭事件
        btn1.addEventListener("click", _defaultCloseFunction);
        if (options && options.yes) {
            btn1.addEventListener("click", options.yes);
        }

        var btn2 = _createBtn("取消");
        btn2.id = "layer-open-btn-cancel";
        // 增加默认的关闭事件
        btn2.addEventListener("click", _defaultCloseFunction);
        if (options && options.cancel) {
            btn2.addEventListener("click", options.cancel);
        }

        openDiv.append(titleDiv);
        openDiv.append(contentDiv);
        btnDiv.append(btn1);
        btnDiv.append(btn2);
        openDiv.append(btnDiv);

        document.body.append(openDiv);
    }
    // 创建按钮
    function _createBtn(content) {
        var btn1 = document.createElement("a");
        btn1.style.cssText=
            "height:28px;" + 
            "line-height:28px;" + 
            "margin:5px 5px 0;" + 
            "padding:0 15px;" + 
            "border:1px solid #1E9FFF;" + 
            "border-radius:2px;" + 
            "font-weight:400;" + 
            "cursor:pointer;" + 
            "text-decoration:none;" + 
            "background-color:#1E9FFF;" + 
            "color:#fff;" + 
            "display:inline-block;";
        btn1.innerText = content;
        return btn1;
    }
    // 默认关闭事件
    function _defaultCloseFunction() {
        var shade = document.getElementById("layer-open-shade");
        var openDIV = document.getElementById("layer-open-div");
        shade.remove();
        openDIV.remove();
    }

    w.layer = layer;
})(window);