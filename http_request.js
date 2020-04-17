var REQUEST_TOOL = {};

/**
 * 异步get 请求
 * @param url
 * @param handler
 * @param errorHandler
 */
REQUEST_TOOL.get = function(url, handler, errorHandler) {
    _sendRequest(url, true, null, handler, errorHandler, "get");
};

/**
 * 同步get 请求
 * @param url
 * @param handler
 * @param errorHandler
 */
REQUEST_TOOL.asyncGet = function(url, handler, errorHandler) {
    _sendRequest(url, false, null, handler, errorHandler, "get");
};

/**
 * 异步 post请求，返回json
 * @param url               请求地址
 * @param handler           成功处理函数
 * @param errorHandler      失败处理函数
 */
REQUEST_TOOL.post = function (url, handler, errorHandler) {
    _ajax_format(url, true, null, handler, errorHandler);
};
/**
 * 异步 post请求，返回json
 * @param url               请求地址
 * @param data              请求数据
 * @param handler           成功处理函数
 * @param errorHandler      失败处理函数
 */
REQUEST_TOOL.post = function (url, data, handler, errorHandler) {
    _ajax_format(url, true, data, handler, errorHandler);
};
/**
 * 同步 post请求，返回json
 * @param url               请求地址
 * @param data              请求数据
 * @param handler           成功处理函数
 * @param errorHandler      失败处理函数
 */
REQUEST_TOOL.asyncPost = function (url, data, handler, errorHandler) {
    _ajax_format(url, false, data, handler, errorHandler);
};

/**
 * 封装ajax请求
 * @param url
 * @param async                 true为异步，false为同步
 * @param data
 * @param successHandler
 * @param errHandler
 * @private
 */
function _ajax_format(url, async, data, successHandler, errHandler) {
    var postUrl = url,
        postData;
    if (typeof data == 'object') {
        postData = data;
    } else if (typeof data == 'function') {
        successHandler = data;
        if (successHandler) {
            errHandler = successHandler;
        }
    }
    _sendRequest(postUrl, async, postData, successHandler, errHandler, "post");
}

/**
 * 发送真正的http请求
 * @param url
 * @param async
 * @param data
 * @param handler
 * @param errhandler
 * @param ajaxType      "get" or "post"
 */
function _sendRequest(url, async, data, handler, errHandler, ajaxType) {
    var ajaxData = {
        url: url,
        async: async,
        type: ajaxType,
        contentType : "application/json;charset=UTF-8",
        dataType : 'json',
        success: handler,
        error: errHandler
    };
    if (data) {
        ajaxData.data = JSON.stringify(data);
    }
    $.ajax(ajaxData);
}

window.REQUEST_TOOL = REQUEST_TOOL;