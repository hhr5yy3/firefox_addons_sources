(function() {'use strict';

    var ScannerHelper = TwitterScannerHelper;

    var Scanner = function(isMobile) {
        this.isMobile = !!isMobile;
        this.ScannerHelper = new ScannerHelper(this.isMobile);
        this.responseHeaderScanSingle = TPScanSingleResponse;
        this.responseHeaderScan = TPScanResponse;
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

        that.ScannerHelper.getSendData_SettingPage(function(data) {
            var parseData = that.ScannerHelper.handleResponse_SettingPage(data);

            if (parseData && parseData.user_id && parseData.scanResult) {
                returnParseDataToUser(parseData);
            } else {
                // user not logged in
                var responseData = new APIResponseHelper(that.responseHeaderScan, ReturnCodeEnum.NOT_LOGGED_IN.code, ReturnCodeEnum.NOT_LOGGED_IN.description).getResponse();
                PSDebug.error(responseData);
                callback(responseData);
            }

        }, sendWebRequestFailCallback);
    };

    Scanner.prototype.getAccountInfo = function (target_url, callback) {
        let accountInfo = {
            'name': '',
            'image_url': 'https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png'
        };
        let count = 0;
        const MAX_GET_ACCOUNT_COUNT = 10;

        function tryGetAccountImageNode() {
            let imageNode = null;
            do {
                let bannerNode = document.querySelector('[role=banner]');
                if(!bannerNode) {
                    break;
                }
    
                let presentationNode = bannerNode.querySelector('[role=presentation]');
                if(!presentationNode) {
                    break;
                }
    
                imageNode = presentationNode.querySelector('img');
            } while(false);

            return imageNode;
        }

        function tryGetAccountInfo() {
            if(count >= MAX_GET_ACCOUNT_COUNT) {
                return callback(accountInfo);
            }
            count++;

            let imageNode = tryGetAccountImageNode();
            if(!imageNode) {
                setTimeout(() => {
                    tryGetAccountInfo();
                }, 500);
            }
            else {
                accountInfo['name'] = imageNode.getAttribute('alt');
                accountInfo['image_url'] = imageNode.getAttribute('src');

                return callback(accountInfo);
            }
        }
        tryGetAccountInfo();
    };

    Scanner.prototype.Website = "TWITTER";
    window.TwitterPScanner = Scanner;
})();
