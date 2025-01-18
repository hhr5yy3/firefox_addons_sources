(function() {'use strict';

    var FixHelper = function() {

    };
    FixHelper.prototype.logHeaderSendData = '[MFacebook Fix -> send data]';
    FixHelper.prototype.logHeaderHandleResponseData = '[MFacebook Fix -> handle response data]';
    FixHelper.prototype.getSendData = function(id, value) {
        var scanResult = MFacebookScanResultsTemplate[M_getScanResultIndexByID(id)];
        var params = {
            'type' : 'POST',
            'data' : {
                __user : UserInfo.userID,
                fb_dtsg : scanResult.FixRelatedData.form.fb_dtsg,
                charset_test : scanResult.FixRelatedData.form.charset_test,
                __ajax__ : true
            },
            'dataType' : 'html',
            'url' : scanResult.FixRelatedData.URL
        };

        // set form data
        
        switch (String(id)) {
            case '20':
                params.data["privacyx"] = scanResult.FixRelatedData.form.fixList[value];
                break;
            case '22':
            case '23':
            case '33':
            case '34':
            case '83':
                params.data["privacyX"] = scanResult.FixRelatedData.form.fixList[value];
                break;
            case '24':
                if(value == 0){
                    params.data["confirmed"] = "Confirm";
                }else{
                    params.data["enable"] = 1;
                }
                break;
            case '31':
            case '35':
                params.data["enable"] = scanResult.FixRelatedData.form.fixList[value];
                break;
            case '81':
                break;
        }

        new SendDataLogger(FixHelper.logHeaderSendData + ' : ' + id, params).getLog();
        return params;
    };
    FixHelper.prototype.handleResponse = function(id, value, data) {
        new ResponseHandlerLogger(FixHelper.logHeaderHandleResponseData + ', ID : ' + id + ', value : ' + value, data).getLog();
        var fixResult = PUtil.cloneObj(MFacebookFixResultsTemplate);

        fixResult['id'] = id;
        fixResult['value'] = value;

        fixResult['data'] = data;
        return fixResult;
    };

    FixHelper.prototype.getValidFixValueByID = function(id) {
        for (var i = 0; i < MFacebookScanResultsTemplate.length; i++) {
            if (MFacebookScanResultsTemplate[i]['ID'] == id) {
                return MFacebookScanResultsTemplate[i]['possibleFixValue'];
            }
        }
    };
    FixHelper.prototype.isValidFixValue = function(id, value) {
        var possibleValueList = this.getValidFixValueByID(id);
        for (var i = 0; i < possibleValueList.length; i++) {
            if (value == possibleValueList[i]) {
                return true;
            }
        }
        return false;
    };

    window.MFacebookFixHelper = FixHelper;
})();
