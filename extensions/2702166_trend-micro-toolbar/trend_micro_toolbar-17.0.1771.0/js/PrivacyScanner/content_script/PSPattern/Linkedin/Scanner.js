(function() {'use strict';

    var Scanner = function() {
        this.PROTOCOL_DOMAIN = PUtil.checkPage.IsLinkedIn() ? window.location.protocol + '//' + window.location.host : 'https://www.facebook.com';
        this.responseHeaderScanSingle = LIPScanSingleResponse;
        this.responseHeaderScan = LIPScanResponse;
    };

    Scanner.prototype.scanSingle = function(id, callback) {
        var that = this;
        var scannerHelper = null;

        scannerHelper = new LinkedinScannerHelper();
        return doScanSingle();

        function sendWebRequestFailCallback(data) {
            // network error
            var responseData = new APIResponseHelper(that.responseHeaderScanSingle, ReturnCodeEnum.NETWORK_ERROR.code, ReturnCodeEnum.NETWORK_ERROR.description).getResponse();
            PSDebug.error(responseData);
            return callback(responseData);
        }

        function doScanSingle() {
            if (!scannerHelper.isValidID(id)) {
                var responseData = new APIResponseHelper(that.responseHeaderScanSingle, ReturnCodeEnum.INVALID_ID.code, ReturnCodeEnum.INVALID_ID.description, 'wrong ID! : ' + id + ', availableIDS: ' + scannerHelper.getAllvalidID()).getResponse();
                PSDebug.error(responseData);
                return callback(responseData);
            }

            function sendWebRequestOKCallback(data) {
                var parseData = scannerHelper.handleResponse(id, data);
                // TI-12917 Please don't show the error handle page when there is no supported setting in Linkedin
                /*if (parseData && TMExt_$.trim(parseData["Title"]) == "") {
                    parseData = null;
                }*/
                // parseData = null;
                if (!parseData) {
                    // web content parse error
                    var responseData = new APIResponseHelper(that.responseHeaderScanSingle, ReturnCodeEnum.WEBRESPONSE_PARSE_ERROR.code, ReturnCodeEnum.WEBRESPONSE_PARSE_ERROR.description, 'Web content parse error! ID: ' + id + ', webData: ' + data).getResponse();
                    PSDebug.error('[PS][LinkedIn] doScanSingle: responseData = ' + JSON.stringify(responseData));
                    return callback(responseData);
                }
                else if(!parseData.hasOwnProperty('Current')) {
                    scannerHelper.getScanResult_SettingsPage(id)
                    .then(parseSettingsPageData => {
                        var responseData = new APIResponseHelper(that.responseHeaderScanSingle, ReturnCodeEnum.OK.code, ReturnCodeEnum.OK.description, parseSettingsPageData).getResponse();
                        PSDebug.log('[PS][LinkedIn] doScanSingle: responseData = ' + JSON.stringify(responseData));
                        return callback(responseData);
                    })

                    return;
                }

                var responseData = new APIResponseHelper(that.responseHeaderScanSingle, ReturnCodeEnum.OK.code, ReturnCodeEnum.OK.description, parseData).getResponse();
                PSDebug.log('[PS][LinkedIn] doScanSingle: responseData = ' + JSON.stringify(responseData));
                return callback(responseData);
            }

            SendWebRequest(scannerHelper.getSendData_wording(id), sendWebRequestOKCallback, sendWebRequestFailCallback);
        }

    };

    Scanner.prototype.scan = function(callback) {
        var that = this;
        var scanResult = [];

        var SCANSINGLE_COUNT = LinkedinScanResultsTemplate.length;

        // scan single callback
        var countAlreadyScan = 0;
        var needStopCallback = false;
        var isWebResponsePartlyError = false;
        function scanSingleCallback(data) {
            if (needStopCallback) {
                return;
            }

            if (data[that.responseHeaderScanSingle]['ReturnCode'] == ReturnCodeEnum.OK.code) {
                // get right single scan result, add it to final result now
                addSingleToScanResult(data[that.responseHeaderScanSingle]['Response']);
            } else if (data[that.responseHeaderScanSingle]['ReturnCode'] == ReturnCodeEnum.WEBRESPONSE_PARSE_ERROR.code) {
                isWebResponsePartlyError = true;
            } else {
                var responseData = new APIResponseHelper(that.responseHeaderScan, data[that.responseHeaderScanSingle].ReturnCode, data[that.responseHeaderScanSingle].Description, data[that.responseHeaderScanSingle].Response).getResponse();

                PSDebug.error(responseData);

                needStopCallback = true;
                return callback(responseData);
            }

            function addSingleToScanResult(data) {
                scanResult.push(PUtil.cloneObj(data));
            }

            countAlreadyScan++;
            if (countAlreadyScan == SCANSINGLE_COUNT) {
                // finish all single scan
                if (!isWebResponsePartlyError) {
                    var responseData = new APIResponseHelper(that.responseHeaderScan, ReturnCodeEnum.OK.code, ReturnCodeEnum.OK.description, scanResult).getResponse();
                } else {
                    var responseData = new APIResponseHelper(that.responseHeaderScan, ReturnCodeEnum.WEBRESPONSE_PARSE_ERROR_COULD_USE_PARTLY.code, ReturnCodeEnum.WEBRESPONSE_PARSE_ERROR_COULD_USE_PARTLY.description, scanResult).getResponse();
                }
                PSDebug.log(responseData);
                PSDebug.log("do scan finish");
                return callback(responseData);
            }
        }

        function doScan() {
            // scan every single setting
            for (var i = 0; i < SCANSINGLE_COUNT; i++) {
                that.scanSingle(LinkedinScanResultsTemplate[i]['ID'], scanSingleCallback);
            }
        }

        return doScan();
    };

    Scanner.prototype.getAccountInfo = function(target_url, callback) {
        const MAX_GET_ACCOUNT_COUNT = 10;
        let accountInfo = {
            'name': '',
            'image_url': ''
        };

        const tryGetAccountInfo = (count) => {
            if(count >= MAX_GET_ACCOUNT_COUNT) {
                callback(accountInfo);
                return;
            }

            let node = document.querySelector('.global-nav__me-photo');
            if(!node) {
                setTimeout(() => {
                    tryGetAccountInfo(count+1);
                }, 1000);
                return;
            }

            accountInfo['name'] = node.getAttribute('alt');
            accountInfo['image_url'] = node.getAttribute('src');
            callback(accountInfo);
        }
        tryGetAccountInfo(0);
    }

    Scanner.prototype.Website = "LINKEDIN";

    window.LinkedinPScanner = Scanner;
})();