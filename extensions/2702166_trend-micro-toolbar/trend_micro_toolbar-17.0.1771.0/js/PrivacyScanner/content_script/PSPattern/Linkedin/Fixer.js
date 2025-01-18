(function () {
    'use strict';

    var Fixer = function () {
        this.Scanner = new LinkedinPScanner();
        this.responseHeaderFixSingle = LIPFixSingleResponse;
    };

    Fixer.prototype.fixSingle = function (params, callback) {
        var id = params.id;
        var value = params.value;
        var that = this;
        var scannerHelper = new LinkedinScannerHelper();
        var fixHelper = new LinkedinFixHelper();

        function performFixFinished(data) {
            var parseData = fixHelper.handleResponse(id, value, data);
            if (!parseData) {
                // web content parse error
                var contentData = 'Web content parse error! ID: ' + id + ', value: ' + value + ', webData: ' + data;
                var responseData = new APIResponseHelper(that.responseHeaderFixSingle, ReturnCodeEnum.WEBRESPONSE_PARSE_ERROR.code, ReturnCodeEnum.WEBRESPONSE_PARSE_ERROR.description, contentData).getResponse();
                PSDebug.error(responseData);
                return callback(responseData);
            }

            var responseData = new APIResponseHelper(that.responseHeaderFixSingle, ReturnCodeEnum.OK.code, ReturnCodeEnum.OK.description, parseData).getResponse();
            PSDebug.log(responseData);
            return callback(responseData);
        }

        // params->id invalid error
        if (!scannerHelper.isValidID(id)) {
            var responseData = new APIResponseHelper(that.responseHeaderFixSingle, ReturnCodeEnum.INVALID_ID.code, ReturnCodeEnum.INVALID_ID.description, 'wrong ID! : ' + id + ', availableIDS: ' + scannerHelper.getAllvalidID()).getResponse();
            PSDebug.error(responseData);
            return callback(responseData);
        }

        // params->value invalid error
        if (!fixHelper.isValidFixValue(id, value)) {
            var responseData = new APIResponseHelper(that.responseHeaderFixSingle, ReturnCodeEnum.INVALID_FIX_VALUE.code, ReturnCodeEnum.INVALID_FIX_VALUE.description, 'wrong fix value! : ' + value + ', availableValues: ' + fixHelper.getValidFixValueByID(id)).getResponse();
            PSDebug.error(responseData);
            return callback(responseData);
        }

        fixHelper.performFix(id, value, performFixFinished)
        .then(fixResult => {
            PSDebug.log('[PS][Linkedin] fixResult = ' + fixResult);
            performFixFinished(fixResult);
        });
    };

    window.LinkedinPFixer = Fixer;
})();
