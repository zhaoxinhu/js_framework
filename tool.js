(function(window) {
    let TOOL = {
        ajax: {
            get: function(url, success, err) {
                _sendRequest(url, true, null, success, error, "get");
            },
            syncGet: function(url, success, err) {
                _sendRequest(url, false, null, success, error, "get");
            },
            post: function(url, data, success, err) {
                _sendRequest(url, true, data, success, error, "post");
            },
            postNoData: function(url, success, err) {
                _sendRequest(url, true, null, success, error, "post");
            },
            syncPost: function(url, data, success, err) {
                 _sendRequest(url, false, data, success, error, "post");
            }
        },
        validator: {
            isMobile: function(mobile) {
                return _is_mobile(mobile);
            },
            isEmail: function(email) {
                return _is_email(email);
            }
        }
    };

    window.TOOL = TOOL;

    /**
     * 发送真正的http请求
     * @param url
     * @param async
     * @param data
     * @param handler
     * @param errHandler
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

    // 验证手机格式
    function _is_mobile(mobile) {
    	let mobileReg = /^(((13[0-9]{1})|159|153)+\d{8})$/;
    	return mobileReg.test(mobile);
    }
    // 验证邮箱
    function _is_email(email) {
        let reg = /^\w{3,}@\w+(\.\w+)+$/;
        return reg.test(email);
    }


// 测试
})(window);
