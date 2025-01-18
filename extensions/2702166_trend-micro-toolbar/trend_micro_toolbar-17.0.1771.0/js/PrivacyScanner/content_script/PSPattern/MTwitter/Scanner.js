(function() {'use strict';

    var ScannerHelper = MTwitterScannerHelper;

    var Scanner = function() {
        this.ScannerHelper = new ScannerHelper();
        this.responseHeaderScanSingle = MTPScanSingleResponse;
        this.responseHeaderScan = MTPScanResponse;
    };

    Scanner.prototype.scanSingle = function(id, callback) {
        var that = this;
        // params invalid error
        if (!this.ScannerHelper.isValidID(id)) {

            var responseData = new APIResponseHelper(that.responseHeaderScanSingle, ReturnCodeEnum.INVALID_ID.code, ReturnCodeEnum.INVALID_ID.description, 'wrong ID! : ' + id + ', availableIDS: ' + this.ScannerHelper.getAllvalidID()).getResponse();
            PSDebug.error(responseData);
            return callback(responseData);
        }

        function doWhenScanAllFinish(data) {
            // data will not be null
            if (data[that.responseHeaderScan]['ReturnCode'] == ReturnCodeEnum.OK.code || data[that.responseHeaderScan]['ReturnCode'] == ReturnCodeEnum.WEBRESPONSE_PARSE_ERROR_COULD_USE_PARTLY.code) {
                var scanResult = null;
                var responseData = data[that.responseHeaderScan]['Response'];
                for (var i = 0; i < responseData.length; i++) {
                    if (responseData[i]['ID'] == id) {
                        scanResult = responseData[i];
                        break;
                    }
                }

                if (scanResult) {
                    var responseData = new APIResponseHelper(that.responseHeaderScanSingle, ReturnCodeEnum.OK.code, ReturnCodeEnum.OK.description, scanResult).getResponse();

                    PSDebug.log(responseData);
                    return callback(responseData);
                } else {
                    var responseData = new APIResponseHelper(that.responseHeaderScanSingle, ReturnCodeEnum.WEBRESPONSE_PARSE_ERROR.code, ReturnCodeEnum.WEBRESPONSE_PARSE_ERROR.description, 'Web content parse error! ID: ' + id).getResponse();

                    PSDebug.error(responseData);
                    return callback(responseData);
                }
            } else {
                var responseData = new APIResponseHelper(that.responseHeaderScanSingle, data[that.responseHeaderScan].ReturnCode, data[that.responseHeaderScan].Description, data[that.responseHeaderScan].Response).getResponse();

                PSDebug.error(responseData);
                return callback(responseData);
            }

        }

        this.scan(doWhenScanAllFinish);
    };

    Scanner.prototype.scan = function(callback) {
        var that = this;

        function returnParseDataToUser(parseData) {
            if (parseData['scanResult_incomplete'] == true) {
                // web content parse partly error
                var responseData = new APIResponseHelper(that.responseHeaderScan, ReturnCodeEnum.WEBRESPONSE_PARSE_ERROR_COULD_USE_PARTLY.code, ReturnCodeEnum.WEBRESPONSE_PARSE_ERROR_COULD_USE_PARTLY.description, parseData['scanResult']).getResponse();
            } else {
                // ok
                var responseData = new APIResponseHelper(that.responseHeaderScan, ReturnCodeEnum.OK.code, ReturnCodeEnum.OK.description, parseData['scanResult']).getResponse();
            }
            PSDebug.log(responseData);
            return callback(responseData);
        }

        function sendWebRequestFailCallback() {
            // network error
            var responseData = new APIResponseHelper(that.responseHeaderScan, ReturnCodeEnum.NETWORK_ERROR.code, ReturnCodeEnum.NETWORK_ERROR.description).getResponse();
            PSDebug.error(responseData);
            return callback(responseData);
        }

        SendWebRequest(that.ScannerHelper.getSendData_SettingPage(), function(data) {
            var parseData = that.ScannerHelper.handleResponse_SettingPage(data);
            if (parseData && parseData.scanResult) {
                returnParseDataToUser(parseData);
            } else {
                // user not logged in
                var responseData = new APIResponseHelper(that.responseHeaderScan, ReturnCodeEnum.NOT_LOGGED_IN.code, ReturnCodeEnum.NOT_LOGGED_IN.description).getResponse();
                PSDebug.error(responseData);
                callback(responseData);
            }

        }, sendWebRequestFailCallback);
    };

    Scanner.prototype.Website = "MTWITTER";
    window.MTwitterPScanner = Scanner;
})();
