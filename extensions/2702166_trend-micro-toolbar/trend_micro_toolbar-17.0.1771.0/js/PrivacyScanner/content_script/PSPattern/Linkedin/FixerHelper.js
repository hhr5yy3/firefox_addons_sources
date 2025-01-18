(function () {
    'use strict';

    var Constants = [{
            ID: 12,
            FixRelated: {}
            // Description: 'Advertising Pref'
        }];

    var FixHelper = function () {
        this.PROTOCOL_DOMAIN = PUtil.checkPage.IsLinkedIn() ? window.location.protocol + '//' + window.location.host : 'https://www.linkedin.com';
    };

    FixHelper.prototype.getValidFixValueByID = function (id) {
        for (var i = 0; i < Constants.length; i++) {
            if (Constants[i]['ID'] == id) {
                return LinkedinScanResultsTemplate[i]['possibleFixValue'];
            }
        }
    };
    FixHelper.prototype.isValidFixValue = function (id, value) {
        var possibleValueList = this.getValidFixValueByID(id);
        for (var i = 0; i < possibleValueList.length; i++) {
            if (value == possibleValueList[i]) {
                return true;
            }
        }
        return false;
    };

    FixHelper.prototype.logHeaderSendData = '[Linkedin Fix -> send data]';
    FixHelper.prototype.logHeaderHandleResponseData = '[Linkedin Fix -> handle response data]';

    FixHelper.prototype.performFix = async function(id, value) {
        const MAX_RETRY_COUNT = 10;

        const clickCheckBox = () => {
            let check_box = TMExt_$('input.a11y-text[role=switch]');
            if (check_box.length === 0) {
                return false;
            }

            let current_value = check_box[0].checked ? 1 : 0;
            if (value != current_value) {
                check_box[0].click();
                return false;
            }

            return true;
        }

        const tryClickCheckbox = (count) => {
            return new Promise(resolve => {
                if(count >= MAX_RETRY_COUNT) {
                    resolve(false);
                    return;
                }

                let clickRet = clickCheckBox();
                if(clickRet) {
                    resolve(true);
                    return;
                }

                setTimeout(() => {
                    tryClickCheckbox(count+1)
                    .then(nextClickRet => {
                        resolve(nextClickRet);
                    });
                }, 1000);
            });
        }

        let ret = false;
        try {
            switch (String(id)) {
                case '12':
                    // Advertising preferences;
                    ret = await tryClickCheckbox(0);
                    break;
                default:
                    PSDebug.error('Unknown id');
            }
        } catch (e) {
            PSDebug.error(e);
        }

        return ret;
    };

    FixHelper.prototype.handleResponse = function(id, value, data) {
        new ResponseHandlerLogger(this.logHeaderHandleResponseData + ', ID : ' + id + ', value : ' + value, data).getLog();
        if (!data) {
            // when click fail
            return null;
        }
        
        var fixResult = PUtil.cloneObj(LinkedinFixResultsTemplate);
        fixResult['id'] = id;
        fixResult['value'] = value;
        fixResult['data'] = data;
        return fixResult;
    };
    
    window.LinkedinFixHelper = FixHelper;
    window.LinkedinFixHelper_Constants = Constants;
})();