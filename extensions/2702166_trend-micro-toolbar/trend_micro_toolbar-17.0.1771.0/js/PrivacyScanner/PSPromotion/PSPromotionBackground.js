import PSBGWrapper from '../extension_page/PSBackgroundWrapper';
import * as constants from '../../../common/UtilCarbonCommon/constants'
import productBundle from '../../ProductBundle/index';
import * as utilBrowser from '../../../common/UtilBrowser/index';
import utilUbm from '../../../common/UtilUbm';
import commonApi from '../../../common/UtilCarbonCommon/api';
import utilLocalStorageCache from '../../../common/UtilLocalStorageCache';
import utilMessageHandler from '../../../common/UtilMessageHandler';
import statusCtrl from '../../StatusCtrl/';

const tagName = '[PS][Background][Promotion]';

let _browser = commonApi.getBrowser();

function isPrivacyScannerEnable()
{
    let storageCache = utilLocalStorageCache.getValue({
        'eula': false,
        'mode': '',
        'wtp_status': false,
        'ps_status': false,
        'titanium': {}
    });
    if (!storageCache.eula) {
        return false;
    }
    else if (storageCache.mode === constants.CARBON_MODE.COEXIST &&
        storageCache.titanium.hasOwnProperty('toolbar_enable') &&
        !storageCache.titanium.toolbar_enable) {
        return false;
    }

    return storageCache.ps_status && storageCache.wtp_status;
}

function onCanPsPromote(request, sender)
{
    let bCanPsPromote = false;
    if(isPrivacyScannerEnable() && !statusCtrl.isInFreeMode()) {
        bCanPsPromote = true;
    }

    return bCanPsPromote;
}

async function onGetPsPromotionStatus(request, sender)
{
    // Do not show promotion if toolbar is enabled.
    let bIsToolbarEnabled = await productBundle.isAnotherToolbarEnable();
    commonApi.logInfo(tagName, 'onGetPsPromotionStatus: bIsToolbarEnabled = ' + bIsToolbarEnabled);
    let storageCache = utilLocalStorageCache.getValue({
        'ps_status': false
    });
    let promotion_status = null;
    if (!storageCache.ps_status) {
        promotion_status = {
            FaceBookPromotion: false,
            TwitterPromotion: false,
            LinkedInPromotion: false
        };
    }
    else {
        let storageData = await utilBrowser.AsyncChromeApi.getStorage({
            'ps_promotion_status': {
                'FaceBookPromotion': true,
                'TwitterPromotion': true,
                'LinkedInPromotion': true
            }
        })
        promotion_status = storageData.ps_promotion_status;
    }
    commonApi.logInfo(tagName, 'onGetPsPromotionStatus: promotion_status = ' + JSON.stringify(promotion_status));

    return promotion_status;
}

function onSetPsPromotionStatus(request, sender)
{
    if(!request.parameters || !request.parameters.Website) {
        commonApi.logError("onSetPsPromotionStatus: parameters is missed");
        return;
    }
    
    let storageCache = utilLocalStorageCache.getValue({
        'ps_promotion_status': {
            'FaceBookPromotion': true,
            'TwitterPromotion': true,
            'LinkedInPromotion': true
        }
    });
    switch(request.parameters.Website) {
        case "FACEBOOK":
            storageCache.ps_promotion_status.FaceBookPromotion = request.parameters.value;
            break;
        case "TWITTER":
            storageCache.ps_promotion_status.TwitterPromotion = request.parameters.value;
            break;
        case "LINKEDIN":
            storageCache.ps_promotion_status.LinkedInPromotion = request.parameters.value;
            break;
    }
    _browser.storage.local.set(storageCache);
}

async function onCheckPrivacy(request, sender)
{
    let browser_version = utilBrowser.getBrowserVersion();
    let browser_id = '0';
    let browser_status = '';
    let storageCache = utilLocalStorageCache.getValue({
        'mode': '',
        'browser_status': '',
        'locale': ''
    });
    if (storageCache.mode === constants.CARBON_MODE.COEXIST) {
        browser_status = storageCache.browser_status;
    }

    let website = '';
    if (request.parameters.WebSite) {
        website = request.parameters.WebSite;
    }

    let from = ['Carbon', 'SNS_' + website].join(',');
    let url =`js/PrivacyScanner/local_page/index.html?locale=${storageCache.locale}&browser_id=${browser_id}&browser_version=${browser_version}&from=${from}`
    if (browser_status) {
        url += `&status=${browser_status}`;
    }

    let tabList = await utilBrowser.AsyncChromeApi.getTabInfo();
    let hasTab = false;
    for (let i in tabList) {
        let tab = tabList[i];
        let urlRegExp = new RegExp("PrivacyScanner/local_page/index.html", "i");
        if (urlRegExp.test(tab.url)) {
            _browser.tabs.update(tab.id, {
                url: url,
                active: true
            });
            hasTab = true;
        }
    }

    if (!hasTab) {
        _browser.tabs.create({
            url: url
        });
    }
}

function onShowPromotionLearnmore(request, sender)
{
    PSBGWrapper.ShowPSHelpPage();
}

async function onFeedback2faStatus(request, sender)
{
    if (!request.params) {
        return;
    }
    
    let website = request.params['website'];
    let storageData = await utilBrowser.AsyncChromeApi.getStorage({
        'ps_2faFeedback_status': {}
    });
    if(storageData.ps_2faFeedback_status.hasOwnProperty(website) && !storageData.ps_2faFeedback_status[website]) {
        return;
    }

    let status = request.params['2FA'];
    utilUbm.addUbmEvent(constants.UBM_ID.PRIVACY_SCANNER_2FA_STATUS, JSON.stringify({
        'website': website,
        '2FA': status
    }));

    storageData.ps_2faFeedback_status[website] = false;
    await utilBrowser.AsyncChromeApi.setStorage(storageData);
}

function init() 
{
    utilMessageHandler.runtime.AddHandler(constants.TB_ACTIONS.PS_CAN_PROMOTE, onCanPsPromote);
    utilMessageHandler.runtime.AddHandler(constants.TB_ACTIONS.PS_GET_PROMOTION_STATUS, onGetPsPromotionStatus);
    utilMessageHandler.runtime.AddHandler(constants.TB_ACTIONS.PS_SET_PROMOTION_STATUS, onSetPsPromotionStatus);
    utilMessageHandler.runtime.AddHandler(constants.TB_ACTIONS.PS_CHECK_PRIVACY, onCheckPrivacy);
    utilMessageHandler.runtime.AddHandler(constants.TB_ACTIONS.PS_SHOW_PROMOTION_LEARNMORE, onShowPromotionLearnmore);
    utilMessageHandler.runtime.AddHandler(constants.TB_ACTIONS.PS_FEEDBACK_2FA_STATUS, onFeedback2faStatus);
}

async function onStartupHandler()
{
    await utilBrowser.AsyncChromeApi.setStorage({
        'ps_2faFeedback_status': {}
    });
}

export default {
    init,
    onStartupHandler
}
