(function () {
    var TOOL = window.TOOL;
    if (!TOOL) {
        TOOL = {};
    }

    TOOL["string"] = {};

    /**
     * replaceAll 替换所有的字符
     * @param source    需要替换的字符
     * @param target    替换成的目标字符
     */
    TOOL.string.replaceAll = function (obj, source, target) {
        if (!(typeof obj == "string")) {
            console.log("该类型不支持replaceAll");
            return;
        }
        if (obj.indexOf(source) == -1) {
            return obj;
        }
        let replace = obj.replace(source, target);
        return TOOL.string.replaceAll(replace, source, target);
    };

    window.TOOL = TOOL;
}());