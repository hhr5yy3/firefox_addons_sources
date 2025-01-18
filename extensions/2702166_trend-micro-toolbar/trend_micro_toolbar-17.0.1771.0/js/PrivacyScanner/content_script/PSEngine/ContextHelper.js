(function() {

    var SendWebRequest = function(params, success, error) {
        TMExt_$.ajax({
            type: params.type,
            url: params.url,
            data: params.data,
            async:params.async,
            dataType: params.dataType,
            headers:params.headers,
            success: function (callback_data) {
                success(callback_data);
            },
            error: function() {
                error();
            }
        });
    };

    window.SendWebRequest = SendWebRequest;
})();
