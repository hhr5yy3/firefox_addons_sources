(function() {'use strict';

    var Scanner = function() {
        this.responseHeaderScanSingle = MFPScanSingleResponse;
        this.responseHeaderScan = MFPScanResponse;
    };

    Scanner.prototype.getAllURLInfo = function(callback, whenNetworkError) {
        var that = this;

        var ExpectedCount = 3;
        var FinishedCount = 0;

        function CheckFinished() {
            if (FinishedCount == ExpectedCount) {
                return callback();
            }
        }

        /*
         URL : Privacy related
         */
        SendWebRequest({
            'type' : 'GET',
            'data' : null,
            'dataType' : 'html',
            'url' : URLList.Privacy
        }, function(data) {
            var htmlData = TMExt_$(data);
            
            MFacebookScanResultsTemplate[M_getScanResultIndexByID("20")].URL = htmlData.find('div[class="_56be"]:eq(0) a[class="_5b6s"]:eq(0)').attr('href');
            MFacebookScanResultsTemplate[M_getScanResultIndexByID("22")].URL = htmlData.find('div[class="_56be"]:eq(2) a[class="_5b6s"]:eq(0)').attr('href');
            MFacebookScanResultsTemplate[M_getScanResultIndexByID("23")].URL = htmlData.find('div[class="_56be"]:eq(2) a[class="_5b6s"]:eq(1)').attr('href');
            MFacebookScanResultsTemplate[M_getScanResultIndexByID("24")].URL = htmlData.find('div[class="_56be"]:eq(2) a[class="_5b6s"]:eq(2)').attr('href');

            FinishedCount++;
            CheckFinished()
        }, whenNetworkError);

        /*
         URL : TimeLineAndTagging related
         */
        SendWebRequest({
            'type' : 'GET',
            'data' : null,
            'dataType' : 'html',
            'url' : URLList.TimeLineAndTagging
        }, function(data) {
            var htmlData = TMExt_$(data);
            
            MFacebookScanResultsTemplate[M_getScanResultIndexByID("31")].URL = htmlData.find('div[class="_56be"]:eq(0) a[class="_5b6s"]:eq(1)').attr('href');
            MFacebookScanResultsTemplate[M_getScanResultIndexByID("33")].URL = htmlData.find('div[class="_56be"]:eq(1) a[class="_5b6s"]:eq(0)').attr('href');
            MFacebookScanResultsTemplate[M_getScanResultIndexByID("34")].URL = htmlData.find('div[class="_56be"]:eq(1) a[class="_5b6s"]:eq(1)').attr('href');
            MFacebookScanResultsTemplate[M_getScanResultIndexByID("35")].URL = htmlData.find('div[class="_56be"]:eq(2) a[class="_5b6s"]:eq(0)').attr('href');

            FinishedCount++;
            CheckFinished();
        }, whenNetworkError);

        /*
         URL : Apps related
         */
        SendWebRequest({
            'type' : 'GET',
            'data' : null,
            'dataType' : 'html',
            'url' : URLList.Apps
        }, function(data) {
            var htmlData = TMExt_$(data);
            
            MFacebookScanResultsTemplate[M_getScanResultIndexByID("81")].URL = htmlData.find('div[class="_56be"]:eq(2) a[class="_5b6s"]:eq(0)').attr('href');
            MFacebookScanResultsTemplate[M_getScanResultIndexByID("83")].URL = htmlData.find('div[class="_56be"]:last a[class="_5b6s"]:eq(0)').attr('href');

            FinishedCount++;
            CheckFinished();
        }, whenNetworkError);
    };

    Scanner.prototype.scanSingle = function(id, callback) {
        var that = this;
        var scannerHelper = new MFacebookScannerHelper();

        if (MFacebookScanResultsTemplate[M_getScanResultIndexByID(id)]["URL"]) {
            // already has URL for this setting.
            return doScanSingle();
        } else {
            that.getAllURLInfo(function() {
                return doScanSingle();
            }, sendWebRequestFailCallback);
        }

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
                // parseData = null;
                if (!parseData) {
                    // web content parse error
                    var responseData = new APIResponseHelper(that.responseHeaderScanSingle, ReturnCodeEnum.WEBRESPONSE_PARSE_ERROR.code, ReturnCodeEnum.WEBRESPONSE_PARSE_ERROR.description, 'Web content parse error! ID: ' + id + ', webData: ' + data).getResponse();
                    PSDebug.error(responseData);
                    return callback(responseData);
                }

                // return correct web content (white list: we only return these items)
                var parseDataFinal = {
                    ID : parseData['ID'],
                    Risk : parseData['Risk'],
                    Title : parseData['Title'],
                    Desc : parseData['Desc'],
                    PossibleValue : parseData['PossibleValue'],
                    possibleFixValue : parseData['possibleFixValue'],
                    Current : parseData['Current'],
                    Suggestion : parseData['Suggestion'],
                    Category : parseData['Category'],
                    Website : parseData['Website']
                };

                var responseData = new APIResponseHelper(that.responseHeaderScanSingle, ReturnCodeEnum.OK.code, ReturnCodeEnum.OK.description, parseDataFinal).getResponse();
                PSDebug.log(responseData);
                return callback(responseData);
            }

            SendWebRequest(scannerHelper.getSendData(id), sendWebRequestOKCallback, sendWebRequestFailCallback);
        }

    };

    Scanner.prototype.scan = function(callback) {
        var that = this;
        var scanResult = {
            'PrivacySetting' : {
                'ID' : 2,
                'Items' : []
            },
            'TimeLineAndTagging' : {
                'ID' : 3,
                'Items' : []
            },
            'AppsAndWebsites' : {
                'ID' : 8,
                'Items' : []
            }
        };

        var SCANSINGLE_COUNT = MFacebookScanResultsTemplate.length;

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
                switch (parseInt(data['ID'])) {
                    case 20:
                    case 22:
                    case 23:
                    case 24:
                        scanResult.PrivacySetting.Items.push(data);
                        break;
                    case 31:
                    case 33:
                    case 34:
                    case 35:
                        scanResult.TimeLineAndTagging.Items.push(data);
                        break;
                    case 81:
                    case 83:
                        scanResult.AppsAndWebsites.Items.push(data);
                        break;
                }
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
                return callback(responseData);
            }
        }

        function sendWebRequestFailCallback(data) {
            // network error
            var responseData = new APIResponseHelper(that.responseHeaderScan, ReturnCodeEnum.NETWORK_ERROR.code, ReturnCodeEnum.NETWORK_ERROR.description).getResponse();
            PSDebug.error(responseData);
            return callback(responseData);
        }

        function doScan() {
            // scan every single setting
            for (var i = 0; i < MFacebookScanResultsTemplate.length; i++) {
                that.scanSingle(MFacebookScanResultsTemplate[i]['ID'], scanSingleCallback);
            }
        }

        that.getAllURLInfo(doScan, sendWebRequestFailCallback);
    };

    Scanner.prototype.Website = "MFACEBOOK";

    window.MFacebookPScanner = Scanner;
    
    // for android old interface
    var MPSScan = {};
    MPSScan.scanSingle = function(id, callback) {
        new Scanner().scanSingle(id, function(data) {
            return callback(data['MFPScanSingleResponse']['Response']);
        });
    };

    MPSScan.scan = function(callback) {
        new Scanner().scan(function(data) {
            return callback(data['MFPScanResponse']['Response']);
        });
    };
    window.MPSScan = MPSScan;
})();
