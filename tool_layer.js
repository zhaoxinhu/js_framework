(function (window) {
    var TOOL = window.TOOL;
    if (!TOOL) {
        TOOL = {};
    }

    TOOL["layer"] = {};

    if (!layer) {
        // 加载layer
    }
    // 封装layer，进行简单的弹窗提示
    TOOL.layer = {
        success: function(msg, option) {
            if (!option) {
                option = {};
            }
            option.icon = 1;
            layer.alert(msg, option);
        },
        error: function(msg, option) {
            if (!option) {
                option = {};
            }
            option.icon = 5;
            layer.alert(msg, option);
        },
        load: function (option) {
            if (!option) {
                option = {};
            }
            option["shade"] = [0.5, '#393D49'];
            return layer.load(2, option);
        }
    };
    window.TOOL = TOOL;
})(window);