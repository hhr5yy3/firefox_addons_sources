import productBundle from '../../ProductBundle/index';
import utilUbm from '../../../common/UtilUbm/index';
import commonApi from '../../../common/UtilCarbonCommon/api';

let _browser = commonApi.getBrowser();

export function GetPrivacyScannerSettings(items)
{
    for (let i in items) {
        let item = items[i];
        switch (item.key) {
            case 'IsFirstSaveChanges':
                item.value = true;
                break;
            case 'IsFirstFixTwitter':
                item.value = true;
                break;
            case 'IsFirstFixLinkedIn':
                item.value = true;
                break;
            case 'IsConsoleLogEnabled':
                item.value = true;
                break;
            case 'IsFileLogEnabled':
                item.value = false;
                break;
            default:
                commonApi.logInfo('GetPrivacyScannerSettings: unknown item key = ' + item.key);
        }
    }
    return items;
};

function ShowPSPage(funid) {
    _browser.storage.local.get('urls', function(result) {
        let url = result.urls[funid];
        console.log(url);
        if(url) {
            _browser.tabs.create({
                url : url,
                active : true
            });
        }
        else {
            commonApi.logError('ShowPSPage: unable to find funid = ' + funid);
        }
    });
};
    
export function ShowPSHelpPage() {
    const FUNID = 'ps_help';
    ShowPSPage(FUNID);
};

export function ShowPSFAQHelpPage(website, help_id) {
    const FUNID = 'ps_faq';
    ShowPSPage(FUNID);
};

export function PrivacyScannerRequestForBrowsers(functionId, strMsg) {
    // Scan/Fix Browser Privacy settings
    return RetryPrivacyScannerRequestForBrowsers(functionId, strMsg, 0, 1000);
};

function RetryPrivacyScannerRequestForBrowsers(functionId, strMsg, count, interval) {
    const maxRetries = 5;

    return new Promise((resolve) => {
        if (count >= maxRetries) {
            resolve('');
            return;
        }

        productBundle.getTitaniumHelper().dispatchBrowserPrivacyScanner(functionId, strMsg)
        .then(response => {
            if (!response) {
                setTimeout(() => {
                    RetryPrivacyScannerRequestForBrowsers(functionId, strMsg, count+1, interval)
                    .then((value) => {
                        resolve(value);
                    });
                }, interval);
                return;
            }
            resolve(response);
        });
    });
}

export function PrivacyScannerCollectData(msg) {
    try {
        if(!msg || !msg.dataIn || !msg.dataIn.type || !msg.dataIn.data) {
            commonApi.logError('PrivacyScannerCollectData: No collected data');
            return;
        }

        if(!utilUbm || !utilUbm.addUbmEvent) {
            commonApi.logError('PrivacyScannerCollectData: No UtilUbm');
            return;
        }

        utilUbm.addUbmEvent(msg.dataIn.type, msg.dataIn.data);

    } catch(exception) {
        commonApi.logError('PrivacyScannerCollectData: exception = ' + exception);
    }
}
    
export default
{
    GetPrivacyScannerSettings,
    ShowPSHelpPage,
    ShowPSFAQHelpPage,
    PrivacyScannerRequestForBrowsers,
    PrivacyScannerCollectData
}
