(function() {
    'use strict';

    var Constants = [
        {
            ID: 11,
            FixRelated: {
            }
            // Description: 'Show photo geo location information in newly uploaded albums and photos'
        }, {
            ID: 12,
            FixRelated: {
            }
            // Description: 'Allow viewers to download my photos'
        }, {
            ID: 13,
            FixRelated: {
            }
            // Description: 'Find my face in photos and videos and prompt people I know to tag me.'
        },  {
            ID: 21,
            FixRelated: {
            }
            // Description: 'Based upon my activity, Google may show my name and profile photo in shared endorsements that appear in ads.'
        }, {
            ID: 31,
            FixRelated: {
            }
            // Show your Google+ communities posts on the Posts tab of your Google+ profile'
        }];


    var FixHelper = function() {
    };
    FixHelper.prototype.logHeaderSendData = '[GooglePlus Fix -> click data]';
    FixHelper.prototype.logHeaderHandleResponseData = '[GooglePlus Fix -> handle response data]';

    FixHelper.prototype.performFix = function(id, value) {
        var params = null;
        var objItem = null;

        //Old Version
        /*
        function clickCheckBox(check_box) {
            var current_value = check_box[0].checked ? 1 : 0;
            if (value != current_value) {
                check_box.click();
            }
        }
        */

        function clickCheckBox(objCheckbox){
            var bChecked = TMExt_$(objCheckbox).attr("aria-checked");
            var current_value = (bChecked == "true") ? 1 : 0;

            if (value != current_value){
                TMExt_$(objCheckbox).click();
            }
        }


        try {
            switch (String(id)) {
                case '11':
                    params = 'Show photo geo location information in newly uploaded albums and photos';
                    objItem = TMExt_$(TMExt_$(".EKledf")[0]).parent().next().find("div")[1];
                    clickCheckBox(objItem);
                    break;
                case '12':
                    params = 'Allow viewers to download my photos';
                    objItem = TMExt_$(TMExt_$(".EKledf")[1]).parent().next().find("div")[1];
                    clickCheckBox(objItem);
                    break;
                case '13':
                    params = 'Find my face in photos and videos and prompt people I know to tag me.';
                    //check_box = TMExt_$('#profiles-photos-settings-enableNs');
                    //clickCheckBox(check_box);

                    objItem = TMExt_$(TMExt_$(".EKledf")[2]).parent().next().find("div")[1];
                    clickCheckBox(objItem);
                    break;
                case '31':
                    params = 'Show your Google+ communities posts on the Posts tab of your Google+ profile';
                    //check_box = TMExt_$('#profiles-profiles-settings-profilePostVisibility');
                    //clickCheckBox(check_box);

                    objItem = TMExt_$(TMExt_$(TMExt_$('.LthDBb')[1]).next()[0]).find("div")[0];
                    clickCheckBox(objItem);

                    break;
            }


            new SendDataLogger(this.logHeaderSendData + ' : ' + id, params).getLog();
            return true;
        }catch (e) {
            PSDebug.error(e);
            return false;
        }
    };

    FixHelper.prototype.getSendData_google_1 = function(id, value, at) {
        var params = {
            'type' : 'POST',
            'data' : {
                'at' : at,
                'sa' : (value == '0' ? true : false)
            },
            'dataType' : 'html',
            'url' : 'https://plus.google.com/u/0/_/personalization/sa/'
        };

        new SendDataLogger(this.logHeaderSendData + ' : ' + 'getSendData_google_1', params).getLog();
        return params;
    };


    FixHelper.prototype.handleResponse_google_1 = function(value, data) {
        new ResponseHandlerLogger(this.logHeaderHandleResponseData + ', ID : ' + 'handleResponse_google_1', data).getLog();
        try {
            var scanResult = {

            };

            // get at
            var at = data.find('#sa-form input:first')[0].value;
            scanResult['at'] = at;

            return scanResult;
        } catch (e) {
            PSDebug.error(e);
            return null;
        }
    };
    
    
    FixHelper.prototype.getSendData = function(id, value, at) {
        var params = {
            'type' : 'POST',
            'data' : {
                'at' : at,
                'sa' : (value == '0' ? false : true)
            },
            'dataType' : 'html',
            'url' : 'https://plus.google.com/_/personalization/sa/'
        };

        new SendDataLogger(this.logHeaderSendData + ' : ' + 'getSendData', params).getLog();
        return params;
    };

    FixHelper.prototype.handleResponse = function(id, value, data) {
        new ResponseHandlerLogger(this.logHeaderHandleResponseData + ', ID : ' + id + ', value : ' + value, data).getLog();

        if (!data) {
            // when click fail
            return null;
        }

        var fixResult = PUtil.cloneObj(GooglePlusFixResultsTemplate);

        fixResult['id'] = id;
        fixResult['value'] = value;

        if (typeof data === 'string') {
            // this is a string
            fixResult['data'] = data.substring(0, 100);
        }else {
            fixResult['data'] = data;
        }

        return fixResult;
    };

    FixHelper.prototype.getValidFixValueByID = function(id) {
        for (var i = 0; i < Constants.length; i++) {
            if (Constants[i]['ID'] == id) {
                return GooglePlusScanResultsTemplate[i]['possibleFixValue'];
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

    window.GooglePlusFixHelper = FixHelper;
    window.GooglePlusFixHelper_Constants = Constants;
})();
