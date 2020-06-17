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
        showShade();
        // 2、 构造一个简单弹窗
        showOpenDiv();
    };
    // 遮罩
    function showShade() {
        var shadeDiv = document.createElement("div");
           // width:100%;height: 100%;background-color: rgb(0, 0, 0); opacity: 0.3;z-index: 19891017;position: fixed;
        shadeDiv.style.width = "100%";
        shadeDiv.style.height = "100%";
        shadeDiv.style.backgroundColor = "rgb(0, 0, 0)";
        shadeDiv.style.opacity = 0.3;
        shadeDiv.style.zIndex = 19891017;
        shadeDiv.style.position = "fixed";
        document.body.append(shadeDiv);
    }
    // 创建弹窗div
    function showOpenDiv() {
        // 1、 构造大的div
        var openDiv = document.createElement("div");
        openDiv.style.width = "260px";
        openDiv.style.height = "154px";
        openDiv.style.position = "fixed";
        openDiv.style.zIndex = 19891018;
        openDiv.style.borderRadius = "2px";
        openDiv.style.backgroundColor = "#fff";
        openDiv.style.boxShadow = "1px 1px 50px rgba(0,0,0,.3)";
        // 居中显示
        //  获取可视化区域大小，计算显示位置
        var clientWidth = window.screen.availWidth;
        var clientHeight = window.screen.availHeight;
        openDiv.style.left = (((clientWidth - 260) / 2) - 130) + "px";
        openDiv.style.top = (((clientHeight - 154) / 2) - 77) + "px";
        // 2、 构造title
        var titleDiv = document.createElement("div");
        titleDiv.innerText = "在线调试";
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
        contentDiv.innerText = "填写内容";
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

        var btn1 = createBtn("确定");
        var btn2 = createBtn("取消");

        openDiv.append(titleDiv);
        openDiv.append(contentDiv);
        btnDiv.append(btn1);
        btnDiv.append(btn2);
        openDiv.append(btnDiv);

        document.body.append(openDiv);
    }
    // 创建按钮
    function createBtn(content) {
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

    w.layer = layer;
})(window);