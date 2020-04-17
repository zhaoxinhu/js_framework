(function () {
    var TOOL = window.TOOL;
    if (!TOOL) {
        TOOL = {};
    }
    // 因为cookie是基于TOOL.String工具类的，所以如果发现没有显示引用的话，主动加载，但是前提得存在该js
    if (!TOOL.string) {
        console.log("请确保您的路径下存在tool_string.js文件");
        var toolStringScript = document.createElement("script");
        toolStringScript.type = 'text/javascript';
        toolStringScript.src = "tool_string.js";

        document.getElementsByTagName("head")[0].appendChild(toolStringScript);
    }

    // cookie
    TOOL.cookie = {
        get: function (key) {
            let cookie = document.cookie;
            if (cookie) {
                let strings = TOOL.string.replaceAll(cookie, " ", "").split(";");
                for (let index in strings) {
                    let temp = strings[index].split("=");
                    if (temp[0] == key) {
                        return temp[1];
                    }
                }
            }
        },
        del: function (key, path) {
            let date = new Date();
            date.setTime(date.getTime() - 1);
            document.cookie = key + "=" + TOOL.cookie.get(key) + "; expires="+ date.toGMTString() +" path=" + path;
        }
    };

    window.TOOL = TOOL;
}());