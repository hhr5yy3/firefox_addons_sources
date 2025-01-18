(function() {
    const DoPSContentReceiveMessage = function(msg) {
        if(Scanner.Website != msg.dataIn.Website){
            return;
        }
        console.log('DoPSContentReceiveMessage: msg = ' + JSON.stringify(msg));

        function callback(data) {
            // var msg = {
            // source : "local",
            // type : type,
            // dataIn : {
            // function_id : function_table["count"],
            // params : params
            // // and other params
            // },
            // dataOut : {
            // ret_status : null,
            // ret_value : data
            // }
            // };

            msg.action = TB_ACTIONS.PS_LOCAL_PAGE_MESSAGE;
            msg.source = 'content';
            msg.dataOut.ret_status = true;
            msg.dataOut.ret_value = data;
            
            if(msg.type === "fix_single_result"){
                try {
                    if (data['TPFixSingleResponse']['flag'] == 'finished') {
                        msg.dataOut.ret_value = "finished";
                    }
                } catch(e){
                }
            }

            try {
                PSDebug.log('[send message] content page -> background page : ');
                PSDebug.log(msg);
                window.browser.runtime.sendMessage(msg);
            } catch (e) {
                PSDebug.error('[send message] e = ' + e);
            }
        }

        PSDebug.log("[common_helper] msg type: " + msg.type);
        switch (msg.type) {
            case 'scan_all':
                msg.type = 'scan_all_result';
                Scanner.scan(callback);
                break;
            case 'scan_single':
                msg.type = 'scan_single_result';
                Scanner.scanSingle(msg.dataIn.params.id, callback);
                break;
            case 'fix_single':
                msg.type = 'fix_single_result';
                Fixer.fixSingle(msg.dataIn.params, callback);
                break;
            case 'get_sns_account_info':
                msg.type = 'get_sns_account_info_result';
                Scanner.getAccountInfo(msg.target_url, callback);
                break;
        }
    };
    
    const SyncPrivacyScannerSettings = function(destination) {
        try {
            // Get settings
            const msg = {
                action: TB_ACTIONS.PS_GET_SETTINGS,
                source: 'content',
                function_id: "NotUsed",
                dataIn: {
                    destination: destination,
                    setting_items: [{
                        key: SettingConstants.is_console_log_enabled,
                        value: 0
                    }, {
                        key: SettingConstants.is_file_log_enabled,
                        value: 0
                    }]
                },
                dataOut: {
                    setting_items: []
                }
            };
            window.browser.runtime.sendMessage(msg, (response) => {
                let setting_items = response.dataOut.setting_items;
                for (let i in setting_items) {
                    let item = setting_items[i];
                    let key = item.key;
                    let value = item.value;
                    window.PrivacyScannerGlobalSettings[key] = value;
                }
            });
        } catch (e) {
            logError('[PS][Content] SyncPrivacyScannerSettings: e = ' + e);
        }
    };

    const RegisterPage = function(id) {
        return new Promise(resolve => {
            const msg = {
                'action': TB_ACTIONS.PS_REGISTER_CONTENT_PAGE,
                'name': id
            };
            window.browser.runtime.sendMessage(msg, () => {
                resolve();
            });
        });
    }

    window.InitialPrivacyScanner = async function(id) {
        let storageData = await window.browser.storage.local.get({
            'framework_status': false
        });
        if (!storageData.framework_status) {
            setTimeout(() => {
                InitialPrivacyScanner(id);
            }, 500);
            return;
        }

        window.browser.runtime.onMessage.addListener((msg) => {
            if (!msg || msg.action !== TB_ACTIONS.PS_CONTENT_MESSAGE) {
                return;
            }

            DoPSContentReceiveMessage(msg);
        });
        await RegisterPage(id);
        SyncPrivacyScannerSettings(id);
    }
})();
