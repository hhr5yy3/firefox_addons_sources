(function() {'use strict';

    var ScannerHelper = GooglePlusScannerHelper;
    var FixHelper = GooglePlusFixHelper;

    var Fixer = function() {
        this.ScannerHelper = new ScannerHelper();
        this.FixHelper = new FixHelper();
        this.responseHeaderFixSingle = GPPFixSingleResponse;
    };

    Fixer.prototype.fixSingle = function(params, callback) {
        var id = params.id;
        var value = params.value;
        var that = this;
        // params->id invalid error
        if (!that.ScannerHelper.isValidID(id)) {
            var responseData = new APIResponseHelper(that.responseHeaderFixSingle, ReturnCodeEnum.INVALID_ID.code, ReturnCodeEnum.INVALID_ID.description, 'wrong ID! : ' + id + ', availableIDS: ' + that.ScannerHelper.getAllvalidID()).getResponse();
            PSDebug.error(responseData);
            return callback(responseData);
        }

        // params->value invalid error
        if (!that.FixHelper.isValidFixValue(id, value)) {
            var responseData = new APIResponseHelper(that.responseHeaderFixSingle, ReturnCodeEnum.INVALID_FIX_VALUE.code, ReturnCodeEnum.INVALID_FIX_VALUE.description, 'wrong fix value! : ' + value + ', availableValues: ' + that.FixHelper.getValidFixValueByID(id)).getResponse();
            PSDebug.error(responseData);
            return callback(responseData);
        }

        function performFixFinish(data) {
            var parseData = that.FixHelper.handleResponse(id, value, data);
            if (!parseData) {
                // web content parse error
                var responseData = new APIResponseHelper(that.responseHeaderFixSingle, ReturnCodeEnum.PERFORM_CLICK_FAIL.code, ReturnCodeEnum.PERFORM_CLICK_FAIL.description, 'perform click fail! ID: ' + id + ', value: ' + value + ', result: ' + data).getResponse();
                PSDebug.error(responseData);
                return callback(responseData);
            }

            var responseData = new APIResponseHelper(that.responseHeaderFixSingle, ReturnCodeEnum.OK.code, ReturnCodeEnum.OK.description, parseData).getResponse();
            PSDebug.log(responseData);
            return callback(responseData);
        }
        
        function sendWebRequestOKCallback(data) {
            var parseData = that.FixHelper.handleResponse(id, value, data);
            if (!parseData) {
                // web content parse error
                var responseData = new APIResponseHelper(that.responseHeaderFixSingle, ReturnCodeEnum.WEBRESPONSE_PARSE_ERROR.code, ReturnCodeEnum.WEBRESPONSE_PARSE_ERROR.description, 'Web content parse error! ID: ' + id + ', value: ' + value + ', webData: ' + data).getResponse();
                PSDebug.error(responseData);
                return callback(responseData);
            }

            var responseData = new APIResponseHelper(that.responseHeaderFixSingle, ReturnCodeEnum.OK.code, ReturnCodeEnum.OK.description, parseData).getResponse();
            PSDebug.log(responseData);
            return callback(responseData);
        }
        
        function sendWebRequestFailCallback(data) {
            // network error
            var responseData = new APIResponseHelper(that.responseHeaderFixSingle, ReturnCodeEnum.NETWORK_ERROR.code, ReturnCodeEnum.NETWORK_ERROR.description).getResponse();
            PSDebug.error(responseData);
            return callback(responseData);
        }

        function triggerDoFix() {
            // wait for page load complete
            if (GooglePlusIsPageLoadComplete(TMExt_$(document))) {
                // perform fix  and return

                // return true if we could find the dom and perform click, otherwise, return false
                var fixResult = that.FixHelper.performFix(id, value);
                performFixFinish(fixResult);
            } else {
                setTimeout(triggerDoFix, 500);
            }
        }
        
        if (id == "21") {
            // this setting item is on another setting page.
            /*SendWebRequest(that.ScannerHelper.getSendData_endorsement_scan(), function(data) {
                var parseData = that.ScannerHelper.handleResponse_endorsement_scan(TMExt_$(data));
                if (parseData && parseData.at) {
                    SendWebRequest(that.FixHelper.getSendData(id, value, parseData.at), sendWebRequestOKCallback, sendWebRequestFailCallback);
                } else {
                    // user not logged in
                    var responseData = new APIResponseHelper(that.responseHeaderFixSingle, ReturnCodeEnum.NOT_LOGGED_IN.code, ReturnCodeEnum.NOT_LOGGED_IN.description).getResponse();
                    PSDebug.error(responseData);
                    callback(responseData);
                }
            });
            */
        } else {
            triggerDoFix();
        }
    };

    window.GooglePlusPFixer = Fixer;
})();
