(function() {'use strict';

    /* Util */
    var timeOutCount = 0;
    function isPageLoadComplete(data) {
        timeOutCount += GOOGLEPLUS_TIME_INTERVAL_CHECK_LOAD_COMPLETE;
        if (timeOutCount >= GOOGLEPLUS_TIMEOUT_LOAD_COMPLETE) {
            return true;
        }

        // check load complete by verifing if we could find photo setting
        if (data.find('#profiles-photos-settings-defaultGeoVisibility').length == 1 && data.find('#profiles-photos-settings-enableDownload').length == 1 && data.find('#profiles-photos-settings-enableNs').length == 1) {
            return true;
        }
        return false;
    }


    window.GooglePlusIsPageLoadComplete = isPageLoadComplete;

    var ScannerHelper = GooglePlusScannerHelper;

    var Scanner = function() {
        this.ScannerHelper = new ScannerHelper();        this.responseHeaderScanSingle = GPPScanSingleResponse;
        this.responseHeaderScan = GPPScanResponse;
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

        function sendWebRequestFailCallback(data) {
            // network error
            var responseData = new APIResponseHelper(that.responseHeaderScan, ReturnCodeEnum.NETWORK_ERROR.code, ReturnCodeEnum.NETWORK_ERROR.description).getResponse();
            PSDebug.error(responseData);
            return callback(responseData);
        }

        function triggerDoScan() {
            var returnResult = null;
            var setting_fromSettingPage = null;

            function doScan() {
                setting_fromSettingPage = that.ScannerHelper.handleResponse_SettingPage(TMExt_$(document));

                returnResult = PUtil.cloneObj(setting_fromSettingPage);
                
                // for setting : 21. this setting is on another page
                /*SendWebRequest(that.ScannerHelper.getSendData_endorsement_scan(), function(data) {
                    var parseData = that.ScannerHelper.handleResponse_endorsement_scan(TMExt_$(data));
                    if (parseData) {
                        var endorsement = that.ScannerHelper.getScanResultSampleByID('21');

                        endorsement["Title"] = parseData["Title"]
                        endorsement["Desc"] = parseData["Desc"]
                        endorsement["Current"] = parseData["Current"]

                        returnResult['scanResult'].push(endorsement);
                        returnParseDataToUser(returnResult);
                    } else {
                        returnResult['scanResult_incomplete'] = true;
                        returnParseDataToUser(returnResult);
                    }
                }, sendWebRequestFailCallback);*/
                returnParseDataToUser(returnResult);
            }

            // wait for page load complete
            if (GooglePlusIsPageLoadComplete(TMExt_$(document))) {
                setTimeout(doScan, GOOGLEPLUS_WAITING_BEFORE_REAL_SCAN);
            } else {
                setTimeout(triggerDoScan, GOOGLEPLUS_TIME_INTERVAL_CHECK_LOAD_COMPLETE);
            }
        }

        // could only work in GooglePlus page
        triggerDoScan();
    };

    Scanner.prototype.Website = "GOOGLEPLUS";
    window.GooglePlusPScanner = Scanner;
})();
