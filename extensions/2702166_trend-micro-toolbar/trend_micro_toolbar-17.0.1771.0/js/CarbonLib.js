/**
    common functions
**/

function isChromium()
{
    return navigator.userAgent.indexOf("Chrome") != -1;
}

function isFirefox()
{
    return navigator.userAgent.indexOf("Firefox") != -1;
}

window.browser = (function () {
    if(isFirefox()) {
        return browser;
    }
    else {
        return chrome;
    }
}());

function logInfo()
{
    window.browser.storage.local.get('debug', (item) => {
        if(item.debug && console && console.log) {
            console.log.apply(this, arguments);
        }
    });
}

function logError()
{
    if (console && console.error){
        console.error.apply(this, arguments);
    }
}

// convert url to be relative to extension
function getURL(relativeURL)
{
    return window.browser.runtime.getURL(relativeURL);
}

function getCurrentLocale()
{
    var init_l10n = function (){
        if (typeof (getCurrentLocale.locale_map) === "undefined") {
            TMExt_$.ajax({
                url: getURL('settings.json'),
                async: false,
                dataType: 'json',
                success: function (response) {
                    logInfo(response);
                    getCurrentLocale.locale_map = response['supportLanguage'];
                    getCurrentLocale.default_lang = response['defaultLanguage'];
                    getCurrentLocale.l10n_map = response['l10nFolderMap'];
                }
            });
        }
    };
    
    init_l10n();
    
    let locale = navigator.language;
    let currentLocaleSupported = false;
    let langList = getCurrentLocale.locale_map;
    let lang = '';
    for (var i = 0; i < langList.length; ++i) {
        if (langList[i].includes(locale)) {
            lang = langList[i];
            currentLocaleSupported = true;
            break;
        }
    }
    if (!currentLocaleSupported) {
        lang = getCurrentLocale.default_lang;
    }

    let l10n = lang;
    if (typeof (getCurrentLocale.l10n_map[lang]) !== "undefined") {
        l10n = getCurrentLocale.l10n_map[lang];
    }
    
    return l10n;
}

function getLocaleResource(prefix, postfix)
{
    var locale = getCurrentLocale();
    return prefix + '/' + locale + '/' + postfix;
}

async function getBankingList() 
{
    let ret = [];
    try {
        const response = await fetch(getBrowser().runtime.getURL('PbBankingList.txt'));
        const list = await response.text();
        ret = list.split('\n');
    }
    catch (e) {
        logError('getBankingList: e = ' + e);
    }
    logInfo('getBankingList: size of banking list = ' + ret.length);

    return ret;
}

function GenerateGuid()
{
    var result, i, j;
    result = '';

    for (j = 0; j < 32; j++){
        if (j == 8 || j == 12 || j == 16 || j == 20){
            result = result + '-';
        }

        i = Math.floor(Math.random()*16).toString(16).toUpperCase();
        result = result + i;
    }
    return result
}

function tbc_sendRequest(action, params, callback)
{
    var request = { action:action, params:params};
    window.browser.runtime.sendMessage(request, callback);
}

function tbc_feedback_2fa_status(website, status)
{
    window.browser.runtime.sendMessage({
        'action': TB_ACTIONS.PS_FEEDBACK_2FA_STATUS, 
        'params': {
            'website': website,
            '2FA': status
        }
    });
}