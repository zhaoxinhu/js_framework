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
        if (!msg) {
            msg = "提示信息";
        }
        element.innerText = msg;
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
        shadeDiv.style.width = window.innerWidth + "px";
        shadeDiv.style.height = window.innerHeight + "px";
        shadeDiv.style.backgroundColor = "rgb(0, 0, 0)";
        shadeDiv.style.opacity = 0.3;
        shadeDiv.style.zIndex = 19891017;
        shadeDiv.style.top = 0;
        shadeDiv.style.left = 0;
        shadeDiv.style.position = "fixed";
        shadeDiv.id = "layer-open-shade";
        document.body.append(shadeDiv);
    }
    // 创建弹窗div
    function _showOpenDiv(title, content, options) {
        // 1、 构造大的div
        var openDiv = document.createElement("div");
        openDiv.id = "layer-open-div";
        openDiv.style.width = "260px";
        openDiv.style.height = "154px";
        openDiv.style.position = "fixed";
        openDiv.style.zIndex = 19891018;
        openDiv.style.borderRadius = "2px";
        openDiv.style.backgroundColor = "#fff";
        openDiv.style.boxShadow = "1px 1px 50px rgba(0,0,0,.3)";
        // 居中显示
        //  获取可视化区域大小，计算显示位置
        var clientWidth = window.innerWidth;
        var clientHeight = window.innerHeight;
        openDiv.style.left = (((clientWidth - 260) / 2) - 130) + "px";
        openDiv.style.top = (((clientHeight - 154) / 2) - 77) + "px";
        // 2、 构造title
        var titleDiv = document.createElement("div");
        var defaultTitle = "在线调试";
        if (!title) {
            title = defaultTitle;
        }
        titleDiv.innerText = title;
        titleDiv.style.padding = "0 80px 0 20px";
        titleDiv.style.height = "42px";
        titleDiv.style.lineHeight = "42px";
        titleDiv.style.borderBottom = "1px solid #eee";
        titleDiv.style.fontSize = "14px";
        titleDiv.style.color = "#333";
        titleDiv.style.overflow = "hidden";
        titleDiv.style.backgroundColor = "#F8F8F8";
        titleDiv.style.borderRadius = "2px 2px 0 0";
        // 3、 构造content
        var contentDiv = document.createElement("div");
        var defaultContent = "显示内容";
        if (!content) {
            content = defaultContent;
        }
        contentDiv.innerText = content;
        contentDiv.style.position = "relative";
        contentDiv.style.padding = "20px";
        contentDiv.style.lineHight = "24px";
        contentDiv.style.wordBreak = "break-all";
        contentDiv.style.fontSize = "14px";
        contentDiv.style.overflowX = "hidden";
        contentDiv.style.overflowY = "auto";
        // 4、 构造btn
        var btnDiv = document.createElement("div");
        btnDiv.style.textAlign = "right";
        btnDiv.style.padding = "0 15px 12px";
        btnDiv.style.pointerEvents = "auto";

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
        btn1.style.height = "28px";
        btn1.style.lineHeight = "28px";
        btn1.style.margin = "5px 5px 0";
        btn1.style.padding = "0 15px";
        btn1.style.border = "1px solid #dedede";
        btn1.style.borderRadius = "2px";
        btn1.style.fontWeight = 400;
        btn1.style.cursor = "pointer";
        btn1.style.textDecoration = "none";
        btn1.style.borderColor = "#1E9FFF";
        btn1.style.backgroundColor = "#1E9FFF";
        btn1.style.color = "#fff";
        btn1.style.display = "inline-block";
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