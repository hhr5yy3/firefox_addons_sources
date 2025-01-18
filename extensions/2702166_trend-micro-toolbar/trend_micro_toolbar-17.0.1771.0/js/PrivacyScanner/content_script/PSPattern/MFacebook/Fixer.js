(function() {'use strict';

    var Fixer = function() {
        this.Scanner = new MFacebookPScanner();
        this.responseHeaderFixSingle = MFPFixSingleResponse;
    };

    Fixer.prototype.fixSingle = function(id, value, callback) {
        var that = this;
        var scannerHelper = new MFacebookScannerHelper();
        var fixHelper = new MFacebookFixHelper();

        function sendWebRequestFailCallback(data) {
            // network error
            var responseData = new APIResponseHelper(that.responseHeaderFixSingle, ReturnCodeEnum.NETWORK_ERROR.code, ReturnCodeEnum.NETWORK_ERROR.description).getResponse();
            PSDebug.error(responseData);
            return callback(responseData);
        }

        function sendWebRequestOKCallback(data) {
            var parseData = fixHelper.handleResponse(id, value, data);
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

        if(MFacebookScanResultsTemplate[M_getScanResultIndexByID(id)]["FixRelatedData"]){
            return doFixSingle();
        }else{
            return that.Scanner.scanSingle(id, doFixSingle);
        }

        function doFixSingle() {
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
            
            doFix();
            
            function doFix() {
                SendWebRequest(fixHelper.getSendData(id, value), sendWebRequestOKCallback, sendWebRequestFailCallback);
            }

        }
    };

    window.MFacebookPFixer = Fixer;
    
    // for android old interface
    var MPSFix = {};
    MPSFix.fixSingle = function(id, value, callback) {
        new Fixer().fixSingle(id, value, function(data) {
            var dataFinal = data['MFPFixSingleResponse']['Response'];
            dataFinal["code"] = "success";
            return callback(dataFinal);
        });
    };
    window.MPSFix = MPSFix;
})();
