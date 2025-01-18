/* eslint-disable */
import { TB_ACTIONS } from '../../../../common/UtilCarbonCommon/constants';
import commonApi from '../../../common/UtilCarbonCommon/api';

const _browser = commonApi.getBrowser();

var FraudBusterSetting = {};

function FraudBusterPostNativeMessage(tabId, params) {
    console.log('[FraudBuster] postNativeMessage to port:', JSON.stringify(params));
    carbonport.postMessage({
        feature: 'FraudBuster',
        action: params.action,
        params: params.params,
        tabId: tabId
    });
};

_browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
        const tabId = sender.tab ? sender.tab.id : 'undefined';
        switch (message.action) {
        case TB_ACTIONS.FRAUD_BUSTER_GET_PRODUCT_INFO:
            console.log(`[DEV]background sendMessage receive: ${JSON.stringify(message)}`);
            FraudBusterPostNativeMessage(tabId, message);
            break;
        case TB_ACTIONS.CAN_FRAUD_BUSTER_WORK:
            console.log(`[DEV]background sendMessage receive: ${JSON.stringify(message)}`);
            sendResponse(FraudBusterSetting);
        case TB_ACTIONS.UPDATE_EMAIL_SCANNED_COUNT:
        case TB_ACTIONS.GET_USER_FRAUD_BUSTER_SETTING:
            console.log(`[DEV]background sendMessage receive: ${JSON.stringify(message)}`);
            FraudBusterPostNativeMessage(tabId, message);
            break;
        case TB_ACTIONS.SET_USER_FRAUD_BUSTER_SETTING:
            console.log(`[DEV]background sendMessage receive: ${JSON.stringify(message)}`);
            FraudBusterPostNativeMessage(tabId, message);
            break;
        case TB_ACTIONS.GET_FRAUD_BUSTER_SECRET:
            console.log(`[DEV]background sendMessage receive: ${JSON.stringify(message)}`);
            FraudBusterPostNativeMessage(tabId, message);
            break;
        case TB_ACTIONS.OPEN_NEW_TAB_WITH_URL:
            console.log(`[DEV]background sendMessage receive: ${JSON.stringify(message)}`);
            _browser.tabs.create({url:message.params});
            break;
        case TB_ACTIONS.SEND_UBM:
            console.log(`[DEV]background sendMessage receive: ${JSON.stringify(message)}`);
            FraudBusterPostNativeMessage(tabId, message);
            break;
        case TB_ACTIONS.UPDATE_PRODUCT_INFO:
            console.log(`[DEV]background sendMessage receive: ${JSON.stringify(message)}`);
            FraudBusterPostNativeMessage(tabId, message);
            break;
        }}
    );


browser.storage.onChanged.addListener(function(changes, area){
    if ("framework_status" in changes) {
        if (changes.framework_status.newValue)
            FraudBusterPostNativeMessage('background',{action:TB_ACTIONS.CAN_FRAUD_BUSTER_WORK});
    }
    if ("license" in changes) {
        if (changes.license.newValue.FeatureToggle.FMA) {
            FraudBusterPostNativeMessage('background',{action:TB_ACTIONS.CAN_FRAUD_BUSTER_WORK});
        }
    }
    if ("mode" in changes) {
        browser.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            if (typeof (tabs[0]) !== "undefined") {
                browser.tabs.sendMessage(tabs[0].id, {action:TB_ACTIONS.NOTIFY_PRODUCT_INFO_CHANGE});
            }
        });
    }

});


function onFraudBusterNativeMessage(message)
{
    if( typeof(message) === 'string')
    {
        try
        {
            var nativeMessage = JSON.parse(message);
            // filter predefined feature, only accept Titanium/carbonframework/FraudBuster
            if(nativeMessage.feature !== undefined)
            {
                if(nativeMessage.feature === "FraudBuster")
                {
                    console.log('FraudBuster receive Native:' + message);
                    switch(nativeMessage.action)
                    {
                        case TB_ACTIONS.FRAUD_BUSTER_GET_PRODUCT_INFO:
                            browser.tabs.sendMessage(nativeMessage.tab_id, {action:TB_ACTIONS.FRAUD_BUSTER_GET_PRODUCT_INFO, result:nativeMessage.dataOut});
                            break;
                        case TB_ACTIONS.UPDATE_PRODUCT_INFO:
                            browser.tabs.sendMessage(nativeMessage.tab_id, {action:TB_ACTIONS.UPDATE_PRODUCT_INFO, result:nativeMessage.dataOut});
                            break;
                        case TB_ACTIONS.CAN_FRAUD_BUSTER_WORK:
                            console.log('Can Fraud Buster work' + nativeMessage.EnableFraudBuster);
                            FraudBusterSetting = nativeMessage;
                            break;
                        case TB_ACTIONS.GET_USER_FRAUD_BUSTER_SETTING:
                            console.log('Got user setting in background');
                            if(nativeMessage.in_out.comefrom==="popup"){
                                browser.runtime.sendMessage({action:TB_ACTIONS.GET_USER_FRAUD_BUSTER_SETTING, result:nativeMessage.dataOut});
                            }
                            else if(nativeMessage.in_out.comefrom==="content"){
                                browser.tabs.sendMessage(nativeMessage.tab_id,{action:TB_ACTIONS.GET_USER_FRAUD_BUSTER_SETTING, result:nativeMessage.dataOut});
                            }
                            break;
                        case TB_ACTIONS.GET_FRAUD_BUSTER_SECRET:
                            console.log('Got FraudBuster secret');
                            browser.tabs.sendMessage(nativeMessage.tab_id,{action:TB_ACTIONS.GET_FRAUD_BUSTER_SECRET, result:nativeMessage.dataOut});
                            break;
                        case TB_ACTIONS.UPDATE_EMAIL_SCANNED_COUNT:
                            console.log('Update email scan count in storage');
                            var period_count_email_scanned = 0, period_count_threats_found = 0;
                            var current_date = new Date();
                            var count_start_date = new Date(current_date.getUTCFullYear(),current_date.getUTCMonth(),current_date.getUTCDate(),0,0,0,0);
                            count_start_date.setUTCDate(current_date.getUTCDate() - 30);

                            for(var i =0; i < nativeMessage.dataOut.record.length; ++i )
                            {
                                var recordDate = new Date(nativeMessage.dataOut.record[i].date);
                                if(recordDate > count_start_date)
                                {
                                    period_count_email_scanned += nativeMessage.dataOut.record[i].fbEmailScanned;
                                    period_count_threats_found += nativeMessage.dataOut.record[i].fbThreatsFound;
                                }
                            }

                            browser.storage.local.set({fbEmailScanned:period_count_email_scanned,fbThreatsFound:period_count_threats_found});
                            break;
                        case TB_ACTIONS.SET_USER_FRAUD_BUSTER_SETTING:   // update localstorage for scanned mail count and suspicious count
                            console.log('Receive email scan count');
                            browser.storage.local.set({fbEmailScanned:nativeMessage.dataOut.fbEmailScanned,fbThreatsFound:nativeMessage.dataOut.fbThreatsFound});
                            break;
                        default:
                            console.log('Not support response');
                            break;
                    }
                }
            }
        }

        catch(e)
        {
            // do nothing
        }
    }
}