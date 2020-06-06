// 封装自己的弹窗
(function(w) {
    var layer = {};
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

    w.layer = layer;
})(window);