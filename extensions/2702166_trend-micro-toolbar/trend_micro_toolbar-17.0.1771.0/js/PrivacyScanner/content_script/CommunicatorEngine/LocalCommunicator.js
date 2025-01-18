(function() {
    var exports = window;
    var PSLocalCommunicator = {
        PSTimeoutID: {},

        PSLocalSendMessage: function(msg, timeout, callback) {
            PSLocalCommunicator.PSSetTimeoutCallback(msg, timeout);
            console.log('[PS][LOCAL_PAGE]: PSLocalSendMessage: msg = ' + JSON.stringify(msg))
            window.browser.runtime.sendMessage(msg, response => {
                if (callback) {
                    callback(response);
                }
            });
        },

        PSSetTimeoutCallback: function(msg, timeout) {
            const _sendError = function(errorMsg, type, error_id) {
                errorMsg.type = type;
                errorMsg.dataOut = {
                    ret_status: false,
                    ret_value: error_id
                };
                PSLocalCommunicator.PSLocalReceiveMessage(errorMsg);
            };
            
            if (typeof (msg.dataIn) != 'undefined' || typeof (msg.function_id) != 'undefined') {
                return;
            }

            let id = msg.function_id;
            if (msg.type == 'ajax_request') {
                // IE cannot timeout ajax, so make this one.
                PSLocalCommunicator.PSTimeoutID[id] = setTimeout(function () {
                    _sendError(msg, 'ajax_request_result', null);
                }, TIMEOUT_SEND_REQUEST_TO_BACKGROUND);
            } 
            else if (timeout) {
                // all other types timeout, default 60 * 1000
                PSLocalCommunicator.PSTimeoutID[id] = setTimeout(function () {
                    _sendError(msg, 'error', '80000001');
                    // send fix timeout UBM
                    if (msg.type === 'fix_single' && msg.dataIn.params.id) {
                        FeedbackFixTimeout(msg.dataIn.Website, msg.dataIn.params.id);
                    }
                }, timeout);
            }
        },

        PSLocalReceiveMessage: function(msg) {
            console.log('PSLocalReceiveMessage: msg = ' + JSON.stringify(msg));
            if(typeof (msg.dataIn) === 'undefined') {
                console.log('PSLocalReceiveMessage: dataIn missed');
                return;
            }
            
            let msgTypes = [
                'get_sns_account_info_result',
                'get_sns_cookies_result',
                'sync_up_page_connection'
            ];
            
            if(msgTypes.includes(msg.type)) {
                DoPSLocalReceiveMessage(msg)
            }
            else if (typeof (msg.function_id) != 'undefined') {
                let id = msg.function_id;
                if (PSLocalCommunicator.PSTimeoutID[id] != null) {
                    clearTimeout(PSLocalCommunicator.PSTimeoutID[id]);
                    PSLocalCommunicator.PSTimeoutID[id] = null;  
                } 

                DoPSLocalReceiveMessage(msg);
            }
        }
    };

    exports.PSLocalSendMessage = PSLocalCommunicator.PSLocalSendMessage;
    exports.PSLocalReceiveMessage = PSLocalCommunicator.PSLocalReceiveMessage;
})();
