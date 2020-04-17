(function () {
    var TOOL = window.TOOL;
    if (!TOOL) {
        TOOL = {};
    }

    TOOL["location"] = {};

    // 自定义的location 处理一些简单的location操作
    TOOL.location.getParameter = function (key) {
        var obj = _getAllObj();
        return obj[key];
    }

    /**
     * 将location中的key=value转化为对象
     * @private
     */
    function _getAllObj() {
        let url = location.search; //获取url中"?"符后的字串
        let theRequest = {};
        if (url.indexOf("?") != -1) {
            let str = url.substr(1);
            let strs = str.split("&");
            for (let i = 0; i < strs.length; i++) {
                var tempData = strs[i];
                var key = tempData.split("=")[0];
                var value = tempData.split("=")[1];
                if (typeof value === "string") {
                    theRequest[key] = decodeURI(value);
                }
            }
        }
        return theRequest;
    }

    window.TOOL = TOOL;
}());