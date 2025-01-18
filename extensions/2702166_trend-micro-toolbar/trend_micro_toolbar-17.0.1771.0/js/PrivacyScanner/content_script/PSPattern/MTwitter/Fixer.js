(function() {'use strict';

    var ScannerHelper = MTwitterScannerHelper;
    var FixHelper = MTwitterFixHelper;

    var Fixer = function() {
        this.ScannerHelper = new ScannerHelper();
        this.FixHelper = new FixHelper();
        this.responseHeaderFixSingle = MTPFixSingleResponse;
		this.responseHeaderFix = MTPFixResponse;
    };

	Fixer.prototype.fixSingle = function(id, callback) {
        var that = this;

        // check if id is valid
        if (!this.FixHelper.isValidID(id)) {

            var responseData = new APIResponseHelper(that.responseHeaderFixSingle, ReturnCodeEnum.INVALID_ID.code, ReturnCodeEnum.INVALID_ID.description, 'wrong ID! : ' + id + ', availableIDS: ' + this.FixHelper.getAllvalidID()).getResponse();
            PSDebug.error(responseData);
            return callback(responseData);
        }

        
        var singleFixResult = that.FixHelper.performFix(id);
        performFixFinished(singleFixResult);
        // check if DOM render finished
        // this.fixDomReadyCheck(function() {
        //     var singleFixResult = that.FixHelper.performFix(id);
        //     performFixFinished(singleFixResult);
        // });

        function performFixFinished(parseData) {
            if (parseData['fixResult_incomplete'] == true) {
                // web content parse partly error
                var responseData = new APIResponseHelper(that.responseHeaderFix, ReturnCodeEnum.WEBRESPONSE_PARSE_ERROR_COULD_USE_PARTLY.code, ReturnCodeEnum.WEBRESPONSE_PARSE_ERROR_COULD_USE_PARTLY.description, parseData['fixResult']).getResponse();
            } else {
                // ok
                var responseData = new APIResponseHelper(that.responseHeaderFix, ReturnCodeEnum.OK.code, ReturnCodeEnum.OK.description, parseData['fixResult']).getResponse();
            }
            PSDebug.log(responseData);
            return callback(responseData);
        }
    };

    Fixer.prototype.fixDomReadyCheck = function (callback) {
        var intervalProcess = setInterval(checkDomLoad, 2000);
        function checkDomLoad() {
            var divs = TMExt_$('main');
            if(divs.length > 0) {
                clearInterval(intervalProcess);
                if (callback) {
                    callback();
                }
            }
        }
    };

    window.MTwitterPFixer = Fixer;
})();
