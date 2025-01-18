(function() {'use strict';
    
    /* Util */
    window.nfinishFlag = 0;
    var ScannerHelper = TwitterScannerHelper;
    var FixHelper = TwitterFixHelper;

    var Fixer = function(isMobile) {
        this.isMobile = !!isMobile;
        this.ScannerHelper = new ScannerHelper(this.isMobile);
        this.FixHelper = new FixHelper(this.isMobile);
        this.responseHeaderFixSingle = TPFixSingleResponse;
        this.responseHeaderClickSave = TPClickSaveResponse;
    };

    Fixer.prototype.fixSingle = function(params, callback) {
        var id = params.id;
        var value = params.value;
        var that = this;
        // params->id invalid error
        if (!that.ScannerHelper.isValidID(id)) {
            var responseData = new APIResponseHelper(that.responseHeaderFixSingle, ReturnCodeEnum.INVALID_ID.code, ReturnCodeEnum.INVALID_ID.description, 'wrong ID! : ' + id + ', availableIDS: ' + that.ScannerHelper.getAllvalidID()).getResponse();
            PSDebug.error(responseData);
            return callback(responseData);
        }

        // params->value invalid error
        if (!that.FixHelper.isValidFixValue(id, value)) {
            var responseData = new APIResponseHelper(that.responseHeaderFixSingle, ReturnCodeEnum.INVALID_FIX_VALUE.code, ReturnCodeEnum.INVALID_FIX_VALUE.description, 'wrong fix value! : ' + value + ', availableValues: ' + that.FixHelper.getValidFixValueByID(id)).getResponse();
            PSDebug.error(responseData);
            return callback(responseData);
        }

        function performFixFinish(data) {
            var parseData = that.FixHelper.handleResponse(id, value, data);
            if (!parseData) {
                // web content parse error
                var responseData = new APIResponseHelper(that.responseHeaderFixSingle, ReturnCodeEnum.PERFORM_CLICK_FAIL.code, ReturnCodeEnum.PERFORM_CLICK_FAIL.description, 'perform click fail! ID: ' + id + ', value: ' + value + ', result: ' + data).getResponse();
                responseData['TPFixSingleResponse']['flag'] = 'finished';
                PSDebug.error(responseData);
                return callback(responseData);
            }

            var responseData = new APIResponseHelper(that.responseHeaderFixSingle, ReturnCodeEnum.OK.code, ReturnCodeEnum.OK.description, parseData).getResponse();
            responseData['TPFixSingleResponse']['flag'] = 'finished';
            PSDebug.log(responseData);
            return callback(responseData);
        }

        function triggerDoFix() {
            function doFix(){
                // return true if we could find the dom and perform click, otherwise, return false
                var fixResult = that.FixHelper.performFix(id, value);
                var finishFlag = setInterval(function(){
                    if(window.nfinishFlag == 1){
                        clearInterval(finishFlag);
                        window.nfinishFlag=0;
                        performFixFinish(fixResult);
                    }
               },200); 
            }
            setTimeout(doFix, TWITTER_WAITING_BEFORE_REAL_SCAN);
        }

        triggerDoFix();
    };

    window.TwitterPFixer = Fixer;
})();
