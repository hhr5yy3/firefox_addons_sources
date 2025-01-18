(function () {
    'use strict';

    var Fixer = function () {
        this.Scanner = new FacebookPScanner();

        this.responseHeaderFixSingle = FPFixSingleResponse;

        this.reset();
    };

    Fixer.prototype.data = {
        user_id: null,
        fb_dtsg: null
    };

    Fixer.prototype.reset = function () {
        for (var k in this.data) {
            this.data[k] = null;
        }
    };

    Fixer.prototype.fixSingle = function (params, callback) {
        var that = this;
        var id = params.id;
        var value = params.value;

        var scannerHelper = new FacebookScannerHelper();
        var fixHelper = new FacebookFixHelper();

        function sendWebRequestFailCallback(data) {
            // network error
            var responseData = new APIResponseHelper(that.responseHeaderFixSingle, ReturnCodeEnum.NETWORK_ERROR.code, ReturnCodeEnum.NETWORK_ERROR.description).getResponse();
            PSDebug.error(responseData);
            return callback(responseData);
        }

        // function sendWebRequestOKCallback(data) {
        //     var parseData = fixHelper.handleResponse(id, value, data);
        //     if (!parseData) {
        //         // web content parse error
        //         var responseData = new APIResponseHelper(that.responseHeaderFixSingle, ReturnCodeEnum.WEBRESPONSE_PARSE_ERROR.code, ReturnCodeEnum.WEBRESPONSE_PARSE_ERROR.description, 'Web content parse error! ID: ' + id + ', value: ' + value + ', webData: ' + data).getResponse();
        //         PSDebug.error(responseData);
        //         return callback(responseData);
        //     }

        //     var responseData = new APIResponseHelper(that.responseHeaderFixSingle, ReturnCodeEnum.OK.code, ReturnCodeEnum.OK.description, parseData).getResponse();
        //     PSDebug.log(responseData);
        //     return callback(responseData);
        // }

        function doFixSingle(isUnder18) {
            // params->id invalid error
            if (!scannerHelper.isValidID(id)) {
                var responseData = new APIResponseHelper(that.responseHeaderFixSingle, ReturnCodeEnum.INVALID_ID.code, ReturnCodeEnum.INVALID_ID.description, 'wrong ID! : ' + id + ', availableIDS: ' + scannerHelper.getAllvalidID()).getResponse();
                PSDebug.error(responseData);
                return callback(responseData);
            }

            // params->value invalid error
            if (!fixHelper.isValidFixValue(id, value)) {
                var responseData = new APIResponseHelper(that.responseHeaderFixSingle, ReturnCodeEnum.INVALID_FIX_VALUE.code, ReturnCodeEnum.INVALID_FIX_VALUE.description, 'wrong fix value! : ' + value + ', availableValues: ' + fixHelper.getValidFixValueByID(id)).getResponse();
                PSDebug.error(responseData);
                return callback(responseData);
            }

            if (PUtil.checkPage.IsFacebook()) {
                fixHelper.getSendData(id, value).then(result => {
                    if (result) {
                        var responseData = new APIResponseHelper(that.responseHeaderFixSingle, ReturnCodeEnum.OK.code, ReturnCodeEnum.OK.description, {
                            "id": id,
                            "value": value
                        }).getResponse();
                        callback(responseData);
                    }
                    else {
                        var responseData = new APIResponseHelper(that.responseHeaderFixSingle, ReturnCodeEnum.UNKNOWN_EXCEPTION.code, ReturnCodeEnum.UNKNOWN_EXCEPTION.description, {}).getResponse();
                        callback(responseData);
                    }
                });
            }
        }

        that.Scanner.getUserInfo(function () {
            // not under 18
            doFixSingle(false);
        }, function () {
            // is under 18
            console.log("under 18");
        }, function () {
        }, sendWebRequestFailCallback);
    };

    window.FacebookPFixer = Fixer;

    // for android old interface
    var PSFix = {};
    PSFix.fixSingle = function (id, value, callback) {
        new Fixer().fixSingle({ id: id, value: value }, function (data) {
            var dataFinal = data['FPFixSingleResponse']['Response'];
            dataFinal["code"] = "success";
            return callback(dataFinal);
        });
    };
    window.PSFix = PSFix;
})();
