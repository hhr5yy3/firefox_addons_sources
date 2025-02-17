var port = null;
var hbstate = 0;
var lang=getUILang();
var i18nReport="https://info.url.cloud.360safe.com/";
var i18nPage = "/plug.php?";
var productId = null;
var compatibleState = CompatibleState.none;
var installedDetails = null;
var curExtVer = null;
var browserType = null;
var injectCiuvoScriptFunc = null;
var openerTabId = 0;


var WebStatus = {
    "unknown":0, 
    "checking":1, 
    "safe":2, 
    "risk":3, 
    "shopping":4,
    "payment":5
}

function getBrowserInfoEx() {
    var browser = {
        version: navigator.appVersion, agent: navigator.userAgent,
        appname: navigator.appName, fullversion: ''+parseFloat(navigator.appVersion),
        majorversion: parseInt(navigator.appVersion,10)
    }
    var nameOffset,verOffset,ix;
    if ((verOffset = browser.agent.indexOf("Edg/")) != -1) {
        browser.appname = "msedge";
        browser.fullversion = browser.agent.substring(verOffset + 4);
    }
    // In Opera 15+, the true version is after "OPR/" 
    else if ((verOffset=browser.agent.indexOf("OPR/"))!=-1) {
     browser.appname = "opera";
     browser.fullversion = browser.agent.substring(verOffset+4);
    }
    // In older Opera, the true version is after "Opera" or after "Version"
    else if ((verOffset=browser.agent.indexOf("Opera"))!=-1) {
     browser.appname = "opera";
     browser.fullversion = browser.agent.substring(verOffset+6);
     if ((verOffset=browser.agent.indexOf("Version"))!=-1) 
       browser.fullversion = browser.agent.substring(verOffset+8);
    }
    else if ((verOffset=browser.agent.indexOf("YaBrowser/"))!=-1) {
     browser.appname = "yandex";
     browser.fullversion = browser.agent.substring(verOffset+10);
    }
    // In MSIE, the true version is after "MSIE" in userAgent
    else if ((verOffset=browser.agent.indexOf("MSIE"))!=-1) {
     browser.appname = "ie";
     browser.fullversion = browser.agent.substring(verOffset+5);
    }
    // In Chrome, the true version is after "Chrome" 
    else if ((verOffset=browser.agent.indexOf("Chrome"))!=-1) {
      browser.appname = "chrome";
      if(browser.agent.indexOf("x64")!=-1)
      {
        browser.appname += "64";
      }
     browser.fullversion = browser.agent.substring(verOffset+7);
    }
    // In Safari, the true version is after "Safari" or after "Version" 
    else if ((verOffset=browser.agent.indexOf("Safari"))!=-1) {
     browser.appname = "safari";
     browser.fullversion = browser.agent.substring(verOffset+7);
     if ((verOffset=browser.agent.indexOf("Version"))!=-1) 
       browser.fullversion = browser.agent.substring(verOffset+8);
    }
    // In Firefox, the true version is after "Firefox" 
    else if ((verOffset=browser.agent.indexOf("Firefox"))!=-1) {
     browser.appname = "firefox";
     browser.fullversion = browser.agent.substring(verOffset+8);
    }
    // In most other browsers, "name/version" is at the end of userAgent 
    else if ( (nameOffset=browser.agent.lastIndexOf(' ')+1) < 
              (verOffset=browser.agent.lastIndexOf('/')) ) 
    {
     browser.appname = browser.agent.substring(nameOffset,verOffset);
     browser.fullversion = browser.agent.substring(verOffset+1);
     if (browser.appname.toLowerCase()==browser.appname.toUpperCase()) {
      browser.appname = navigator.appName;
     }
    }
    // trim the browser.fullversion string at semicolon/space if present
    if ((ix=browser.fullversion.indexOf(";"))!=-1)
       browser.fullversion=browser.fullversion.substring(0,ix);
    if ((ix=browser.fullversion.indexOf(" "))!=-1)
       browser.fullversion=browser.fullversion.substring(0,ix);

    majorVersion = parseInt(''+browser.fullversion,10);
    if (isNaN(majorVersion)) {
     browser.fullversion  = ''+parseFloat(navigator.appVersion); 
     browser.majorversion = parseInt(navigator.appVersion,10);
    }

    return browser;
}
function ProtectStateChanged(obj) {
    if(obj.status){
        if(compatibleState == CompatibleState.enable_siteaccess){
            compatibleState = CompatibleState.compatible;
        }
    }
    else{
        if(compatibleState == CompatibleState.compatible){
            compatibleState = CompatibleState.enable_siteaccess;
        }
    }
}

function procNativeMessage(message) {//msg from native host
    for (var i = 0; i < message.length; i++) {
        var jsonObject = message[i];
        if (typeof (jsonObject.event) != "undefined") {
            consoleLog("procNativeMessage -> jsonObject:" + JSON.stringify(jsonObject));
            
            if (jsonObject.event == Event.session_beat) {
                hbstate = 1;
                testNativeHost(Event.test_host);
                AntiTrackAgentUpdate();
            } else if (jsonObject.event == Event.installed) {//install ok
                if (browserType.indexOf("firefox") != -1) {
                    //var visturl = i18nReport+"plugin"+i18nPage+"la="+lang+"&rq=2";
					consoleLog("insatll ok，Event.installed:" + Event.installed);
					setPref(Prop.enable_toast, false);
					//chrome.tabs.create({
					//    url: chrome.extension.getURL("popup/privacy.html")
					//}, function (t) {
					//    openerTabId = t.id;
					//    consoleLog("insatll ok，openerTabId:" + openerTabId);
					//});
                } else {
                    var visturl = i18nReport+browserType+i18nPage+"la="+lang+"&rq=2";
                    chrome.tabs.create({ url: visturl });
                }
            } else if (jsonObject.event == Event.version) {
               productId = jsonObject.pid;
   
               checkWebshieldVersionState(jsonObject.version_supported, jsonObject.status);
               
               // it's always installed by default.
               if (productId == ProductId.ts) {
                   setPref(Prop.dealprice_installed, true);
                   setPref(Prop.sovetnik_installed, true);
                   AntiTrackStateChanged(jsonObject);   
               }
               if (productId == ProductId.safe) {
                AntiTrackStateChanged(jsonObject);
                }
            } else if (jsonObject.event == Event.icon_status_notify) {
                updateToolIcon(jsonObject);
                if (compatibleState == CompatibleState.compatible){
                    trackDauState();
                }

            } else if (jsonObject.event == Event.popup_status_result) {
                if (compatibleState == CompatibleState.compatible) {
                    updatePopup(jsonObject);
                    checkPromoPrerequesite(jsonObject);
                }
            } else if (jsonObject.event == Event.netpay_changed) {
                if (compatibleState == CompatibleState.compatible) updateNetpayChanged(jsonObject);
            } else if (jsonObject.event == Event.scan_start) {
                if (compatibleState == CompatibleState.compatible) updateToastToScanStart(jsonObject);
            } else if (jsonObject.event == Event.scan_end) {
                if (compatibleState == CompatibleState.compatible) updateToastToScanEnd(jsonObject);
            } else if (jsonObject.event == Event.enter_shopping) {
                if (compatibleState == CompatibleState.compatible) {
                    updateToastToShoppingProtectionOn(jsonObject);
                    trackActivePromoState();
                }
            } else if (jsonObject.event == Event.site_access_result) {
                if (compatibleState == CompatibleState.compatible) initSiteAccessState(jsonObject);
            } else if (jsonObject.event == Event.refresh_tab) {
                var vaid = jsonObject.tabid;
                var vaurl = jsonObject.url;
                chrome.tabs.update(vaid, { url: vaurl });
            } 
            else if (jsonObject.event == Event.antitrack_status_changed) {
                AntiTrackStateChanged(jsonObject);
            }
            else if (jsonObject.event == Event.popup_protect_state) {
                ProtectStateChanged(jsonObject);
            }else if (jsonObject.event == Event.wd_helper && typeof wdHelper != 'undefined')
            {
                if(jsonObject.type == 0)
                {
                    wdHelper.webInit(jsonObject.nativeweb_list,jsonObject.nativeweb_script);
                }
                else if(jsonObject.type == 1)
                {
                    chrome.tabs.sendMessage(jsonObject.tabid, {text: Request.on_wd_helper_support, sid : jsonObject.sid, ret : jsonObject.ret, err : jsonObject.err});
                }
            }  
        }
    }
}

function onDisconnected() {
    port = null; 
    if (hbstate == 0) {//native host not exist
        var os = navigator.platform;
        
        /*if (os.indexOf("Win") > -1) {//not exist native host
            visturl += "&rq=1";
        } else {//not win os 提示一次
            visturl += "&rq=3";
        }*/
        if(os.indexOf("Win") == -1){  // not supported prompt
            if (browserType.indexOf("firefox") != -1) {
                var visturl = i18nReport+"plugin"+i18nPage+"la="+lang+"&rq=3";
                chrome.tabs.create({ url: visturl });
            } else {
                var visturl = i18nReport+browserType+i18nPage+"la="+lang+"&rq=3";
                chrome.tabs.create({ url: visturl });
            }
        }
    }
}

function createNativeHost() {
    var hostName = "com.google.chrome.wdwedpro";
    port = chrome.runtime.connectNative(hostName);
    port.onMessage.addListener(procNativeMessage);
    port.onDisconnect.addListener(onDisconnected);
}

function callNativeHost(id,url,et) {
    var msg=[{"tabid":id,"url":url,"event":et}];
    if ( port != null ) {
        port.postMessage(msg);
    }
}

function callNativeHostWithInfo(id,url,et, opid,info) {
    var msg=[{"tabid":id,"url":url,"event":et, "openerId": opid,"windowid":info.windowId,"info":info}];
    if ( port != null ) {
        port.postMessage(msg);
    }
}

function notifyUpdateTab(addid,removeid,url,windowId) {
    var msg=[{"tabid":addid,"removeid":removeid,"url":url,"windowid":windowId,"event":Event.repalce_tab}];
    if ( port != null ) {
        port.postMessage(msg);
    }
}

function notifyActiveTab(tabid,windowId,title) {
    var msg=[{"tabid":tabid,"windowid":windowId,"title":title,"event":Event.active_tab}];
    if ( port != null ) {
        port.postMessage(msg);
    }
}

function notifyFocusWindow(windowId){
    var msg=[{"windowid":windowId,"event":Event.focus_window}];
    if ( port != null ) {
        port.postMessage(msg);
    }
}

function callNative(tabid, url, sid, func, parameter){
    var msg=[{"tabid" :tabid,"url":url, "sid" :sid, "func":func, "parameter" : parameter ,"event":Event.wd_helper}];
    if ( port != null ) {
        port.postMessage(msg);
    }
}

function testNativeHost(et) {
    if (port != null) {
        port.postMessage([{"event":et}]);
   }
}

function procUrl(tabId, url,et) {
    callNativeHost(tabId, url,et);
}

function procUrlWithInfo(tabId, url,et, info) {
    callNativeHostWithInfo(tabId, url, et,0, info);
}
function procUrlWithOpenerId(tabId, url, et, openerId, info) {
    callNativeHostWithInfo(tabId, url, et, openerId, info);
}

function callNativeHostWithTransType(id, url, et, transtype, transqualifiers) {
    var msg = [{
        "tabid": id,
        "url": url,
        "event": et,
        "transtype": transtype,
        "transqualifiers": transqualifiers
    }];
    if (port != null) {
        port.postMessage(msg);
    }
}


function callNativeHostWithRequestStaus(id, url, status, requestId, et, details) {
    var msg = [{
        "tabid": id,
        "requestId": requestId,
        "url": url,
        "event": et,
        "requestStatus": status,
        "details": details
    }];
    if (port != null) {
        port.postMessage(msg);
    }
}

function setContextInfo() {
    var browserInfo = getBrowserInfoEx();
    if (browserInfo.appname.indexOf("firefox") != -1) {
        curExtVer = browser.runtime.getManifest().version;
    } else {
        curExtVer = chrome.runtime.getManifest().version;
    }
    consoleLog("browser name:" + browserInfo.appname + ",browser ver:" + browserInfo.version + ", ext ver:" + curExtVer);
    if (port != null) {
        var bname = browserInfo.appname;
        if(bname == "msedge"){
            bname = "chrome";
        }
        port.postMessage([{ "bname": bname, "bname2": browserInfo.appname,"bver": browserInfo.fullversion, "ever": curExtVer}]);
    }
}

// last digit build checking ignored 
//
// 1: ver1 > ver2
// 0: ver1 == ver2
//-1: ver1 < ver2
function compareVersion(ver1, ver2) {
    var a = ver1.split('.');
    var b = ver2.split('.');

    for (var i = 0; i < a.length; ++i) {
        a[i] = Number(a[i]);
    }
    for (var i = 0; i < b.length; ++i) {
        b[i] = Number(b[i]);
    }
    
    if (a[0] > b[0]) return 1;
    if (a[0] < b[0]) return -1;
    if (a[1] > b[1]) return 1;
    if (a[1] < b[1]) return -1;
    
    return 0;
}
    
function checkWebshieldVersionState(curWebShieldVerSupported, supported) {
    var verState = compareVersion(curExtVer, curWebShieldVerSupported);
 
    if (verState == 1) {
        if (curWebShieldVerSupported == '2.0.14') {
            compatibleState = CompatibleState.base;
            setDefaultBrowserAction();
        } else {
            compatibleState = CompatibleState.upgrade_env;
            setUpgradeEnvAction();
        }
    } else if (verState == -1) {
        // currently silent work on base function.
        compatibleState = CompatibleState.base;
        setDefaultBrowserAction();
        
        //compatibleState = CompatibleState.upgrade_plugin;
        //setUpgradeExtensionAction();
    } else if (!checkBrowserVersionState()) {
        compatibleState = CompatibleState.upgrade_browser;
        setUpgradeBrowserAction();
    } else {
        compatibleState = CompatibleState.compatible;
        setDefaultBrowserAction();
        setOnConnectListener();
        resotrPrefs();
        
        checkSiteAccessState();
        
        if (isStoreConsultantAvailable(productId)) {
            //initSovetnik();
        } else if (isCiuvoAvailable(productId)) {
            //initCiuvo();
        }
        
        initStat(productId);
    }
    
    consoleLog("checkWebshieldVersionState -> compatibleState:" +compatibleState);
}

function initStat(productId) {
    if (productId != ProductId.ts) {
        return;
    }
}

function checkSiteAccessState() {
    var msg=[{"event":Event.site_access_query}];
    port.postMessage(msg);
}

function checkBrowserVersionState() {
    var browserInfo = getBrowserInfoEx();
    consoleLog("browserInfo:" + JSON.stringify(browserInfo));
    
    if (browserInfo.appname == 'opera' && compareVersion(browserInfo.fullversion, '32') == -1) {
        consoleLog("opera too old");
        return false;
    }
    
    return true;
}

function setUpgradeExtensionAction() {
    consoleLog("setUpgradeExtensionAction");
    
    chrome.browserAction.setPopup({
        popup: 'popup/upgradeext.html'
    });
    chrome.browserAction.setIcon({
        path: {
            "19": "images/unknown_icon_19.png",
            "38": "images/unknown_icon_38.png"
        }
    });
    chrome.browserAction.setTitle({
        title: chrome.i18n.getMessage('unknown_tips')
    });
}

function setSiteAccessDisabledBrowserAction() {
    consoleLog("setSiteAccessDisabledBrowserAction");
    
    chrome.browserAction.setPopup({
        popup: 'popup/siteaccess.html'
    });
    chrome.browserAction.setIcon({
        path: {
            "19": "images/icon_status_disable_19.png",
            "38": "images/icon_status_disable_38.png"
        }
    });
    chrome.browserAction.setTitle({
        title: chrome.i18n.getMessage('unknown_tips')
    });
}

function setSiteAccessDisabledAntiTrackBrowserAction() {
    consoleLog("setSiteAccessDisabledAntiTrackBrowserAction");
    
    chrome.browserAction.setPopup({
        popup: 'popup/siteaccessantitrack.html'
    });
    chrome.browserAction.setIcon({
        path: {
            "19": "images/unknown_icon_19.png",
            "38": "images/unknown_icon_38.png"
        }
    });
    chrome.browserAction.setTitle({
        title: chrome.i18n.getMessage('unknown_tips')
    });
}

function setUpgradeBrowserAction() {
    chrome.browserAction.setPopup({
        popup: 'popup/upgradebr.html'
    });
    chrome.browserAction.setIcon({
        path: {
            "19": "images/unknown_icon_19.png",
            "38": "images/unknown_icon_38.png"
        }
    });
    chrome.browserAction.setTitle({
        title: chrome.i18n.getMessage('unknown_tips')
    });
}

function setUpgradeEnvAction() {
    chrome.browserAction.setPopup({
        popup: 'popup/upgradesafe.html'
    });
    chrome.browserAction.setIcon({
        path: {
            "19": "images/unknown_icon_19.png",
            "38": "images/unknown_icon_38.png"
        }
    });
    chrome.browserAction.setTitle({
        title: chrome.i18n.getMessage('unknown_tips')
    });
}



var bListener = false;

function setStatusDisableBrowserAction() {
    consoleLog("setStatusDisableBrowserAction");
    chrome.browserAction.setPopup({
        popup: ''
    });
    chrome.browserAction.setIcon({
        path: {
            "19": "images/icon_status_disable_19.png",
            "38": "images/icon_status_disable_38.png"
        }
    });
    chrome.browserAction.setTitle({
        title: chrome.i18n.getMessage('unknown_tips')
    });

    if (bListener == false) {
        consoleLog("chrome.browserAction.onClicked begin, bListener = " + bListener);
        chrome.browserAction.onClicked.addListener(function (tab) {
            consoleLog("chrome.browserAction.onClicked,openerTabId = " + openerTabId);
            if (openerTabId > 0) {
                chrome.tabs.get(openerTabId, function (t) {
                    if (t) {
                        chrome.windows.update(t.windowId, { focused: true });
                        chrome.tabs.update(openerTabId, { active: true });
                    } else {
                        chrome.tabs.create({
                            url: chrome.extension.getURL("popup/privacy.html")
                        }, function (tab) {
                            openerTabId = tab.id;
                        });
                    }
                });
            } else {
                chrome.tabs.create({
                    url: chrome.extension.getURL("popup/privacy.html")
                }, function (t) {
                    openerTabId = t.id;
                });
            }
        });
        bListener = true;
    }
}

function setDefaultBrowserAction() {
    consoleLog("setDefaultBrowserAction");
    chrome.browserAction.setPopup({
        popup: 'popup/unknown.html'
    });
    chrome.browserAction.setIcon({
        path: {
            "19": "images/unknown_icon_19.png",
            "38": "images/unknown_icon_38.png"
        }
    });
    chrome.browserAction.setTitle({
        title: chrome.i18n.getMessage('unknown_tips')
    });
}

function setOnConnectListener() {
    chrome.runtime.onConnect.addListener(function(port) {
        consoleLog("port connected:" + port.name);
        
        if (port.name == "popup") {
            port.onMessage.addListener(function(curTab) {
                consoleLog("popup port: tab recieved" + JSON.stringify(curTab));
                triggerUpdatePopup(curTab.id, curTab.windowId);
            });
        }
    });
}

function resotrPrefs() {
    getPref(Prop.enable_toolbar, true, function(value) {
        enableToolIcon(value);
    });

    getPref(Prop.agree_to_privacy_policy, true, function(value) {
        setPrivacyPolicy(value);
    });
}

function updateNetpayChanged(msg) {
    consoleLog("updateNetpayChanged:" + JSON.stringify(msg));
    
    if (msg.status == WebStatus.shopping || msg.status == WebStatus.payment) {
        if (msg.netpay) {
            chrome.browserAction.setIcon({
                path: {
                    "19": 'images/shopping_icon_19.png',
                    "38": 'images/shopping_icon_38.png'
                },
                tabId: msg.tabid
            });
        } else {
            chrome.browserAction.setIcon({
                path: {
                    "19": 'images/shopping_exit_icon_19.png',
                    "38": 'images/shopping_exit_icon_38.png'
                },
                tabId: msg.tabid
            });
        }
    }
}
function IsShowUnknow(msg) {
    if(AntiTrack.enable_antitrack){
        if(msg.hasOwnProperty("url") && msg.url != undefined){
            if(msg.url.indexOf("http://") ==0 || msg.url.indexOf("https://") ==0){
               return false;
            }
        }
    }
    return true;
}
function updateToolIcon(msg) {
    consoleLog("updateToolIcon:" + JSON.stringify(msg));

    getPref(Prop.enable_toast, true, function (value) {
        if (!value && !AntiTrack.settings.isEnabled() && browserType.indexOf("firefox") != -1) {
            setStatusDisableBrowserAction();
            return;
        }

        //setDefaultBrowserAction();

        if (compatibleState == CompatibleState.compatible) {
            if (msg.status == WebStatus.unknown) {
                if (IsShowUnknow(msg)) {
                    consoleLog("updateToolIcon: popup/unknown.html 574");
                    updateToolIconInternal(msg, 'popup/unknown.html', 'images/unknown_icon', chrome.i18n.getMessage('unknown_tips'));
                }
                else {
                    consoleLog("updateToolIcon: popup/siteaccessantitrack.html 578");
                    updateToolIconInternal(msg, 'popup/siteaccessantitrack.html', 'images/unknown_icon', chrome.i18n.getMessage('enableantitrack_tips'));
                }

            } else if (msg.status == WebStatus.checking) {
                updateToolIconInternal(msg, 'popup/checking.html', 'images/checking_icon', chrome.i18n.getMessage('checking_tips'));
            } else if (msg.status == WebStatus.safe) {
                if (AntiTrack.enable_antitrack) {
                    updateToolIconInternal(msg, 'popup/safe.html', 'images/antitrack', chrome.i18n.getMessage('enableantitrack_tips'));
                }
                else
                    updateToolIconInternal(msg, 'popup/safe.html', 'images/safe_icon', chrome.i18n.getMessage('safe_tips'));
            } else if (msg.status == WebStatus.risk) {
                updateToolIconInternal(msg, 'popup/risk.html', 'images/risk_icon', chrome.i18n.getMessage('risk_tips'));
            } else if (msg.status == WebStatus.shopping || msg.status == WebStatus.payment) {
                if (msg.netpay != undefined && msg.netpay) {
                    updateToolIconInternal(msg, 'popup/shopping.html', 'images/shopping_icon', chrome.i18n.getMessage('shopping_tips'));
                } else {
                    updateToolIconInternal(msg, 'popup/shopping.html', 'images/shopping_exit_icon', chrome.i18n.getMessage('shopping_tips'));
                }
            }
        }
        else if (CompatibleState.enable_siteaccess) {
            if (AntiTrack.enable_antitrack) {
                consoleLog("updateToolIcon: popup/siteaccessantitrack.html 602");
                updateToolIconInternal(msg, 'popup/siteaccessantitrack.html', 'images/unknown_icon', chrome.i18n.getMessage('enableantitrack_tips'));
            }
            else {
                updateToolIconInternal(msg, 'popup/siteaccess.html', 'images/icon_status_disable', chrome.i18n.getMessage('unknown_tips'));
            }
        }
    });
}

function isDauTimeUp() {
    var today = new Date();
    var curTime = Math.floor(today.getTime() / 1000);
    today.setDate(today.getDate() + 1);
    today.setUTCHours(0);
    today.setUTCMinutes(0);
    today.setUTCSeconds(0);
    today.setUTCMilliseconds(0);
    var nextTime = Math.floor(today.getTime() / 1000);
    consoleLog("isDauTimeUp -> nextTime:" + nextTime);
    
    var savedDauTime = getGlobalValue(Prop.next_dau_time);
    if (savedDauTime == null) {
        setGlobalValue(Prop.next_dau_time, nextTime);
        
        return true;
    } else {
        consoleLog("isDauTimeUp -> next_dau_time:" + savedDauTime);
        
        if (curTime >= savedDauTime) {
            setGlobalValue(Prop.next_dau_time, nextTime);
            
            return true;
        }
        
        return false;
    }
}

function isTimeUpToPopupCiuvo() {
    var curTime = Math.floor((new Date().getTime() / 1000));
    consoleLog("isTimeUpToPopupCiuvo -> curTime:" + curTime);
    
    var time = getGlobalValue(Prop.dealprice_popup_time);
    if (time == null) {
        return true;
    }
    
    var count = getGlobalValue(Prop.dealprice_popup_count);
    
    if (count == 1) {
        if (curTime - time >= 24 * 60 * 60) {
            return true;
        } else {
            consoleLog("isTimeUpToPopupCiuvo -> count:" + count + ", not right time");
            return false;
        }
    } else if (count == 2) {
        if (curTime - time >= 3 * 24 * 60 * 60) {
            return true;
        } else {
            consoleLog("isTimeUpToPopupCiuvo -> count:" + count + ", not right time");
            return false;
        }
    } else {
        consoleLog("isTimeUpToPopupCiuvo -> never popup");
        return false;
    }
}

function updateTimeUpToPopupCiuvo() {
    var curTime = Math.floor((new Date().getTime() / 1000));
    consoleLog("updateTimeUpToPopupCiuvo -> curTime:" + curTime);
    
    var time = getGlobalValue(Prop.dealprice_popup_time);
    if (time == null) {
        setGlobalValue(Prop.dealprice_popup_time, curTime);
        setGlobalValue(Prop.dealprice_popup_count, 1);
        return;
    }
    
    var count = getGlobalValue(Prop.dealprice_popup_count);
    
    if (count == 1) {
        if (curTime - time >= 24 * 60 * 60) {
            setGlobalValue(Prop.dealprice_popup_time, curTime);
            setGlobalValue(Prop.dealprice_popup_count, ++count);
            return;
        } else {
            consoleLog("updateTimeUpToPopupCiuvo -> count:" + count + ", not right time");
            return;
        }
    } else if (count == 2) {
        if (curTime - time >= 3 * 24 * 60 * 60) {
            setGlobalValue(Prop.dealprice_popup_time, curTime);
            setGlobalValue(Prop.dealprice_popup_count, ++count);
            return;
        } else {
            consoleLog("updateTimeUpToPopupCiuvo -> count:" + count + ", not right time");
            return;
        }
    } else {
        consoleLog("updateTimeUpToPopupCiuvo -> never popup");
    }
}

function trackDauState() {
    if (isDauTimeUp()) {
        trackPage();
    }
}

function trackActivePromoState() {
    var shoppingOnOff =
        browserType.indexOf("firefox") != -1 ?
        Rule.getIns().getStatFirefoxConfig().getShoppingOnOff() :
        Rule.getIns().getStatConfig().getShoppingOnOff();
        
    if (isStoreConsultantAvailable(productId)) {
        getPref(Prop.sovetnik_enabled, null, function(value) {
            new Stat().setTrackId(shoppingOnOff.getRes()).setType(Stat.Type.Shopping).setAction(Stat.PromoAction.StoreConsultant).setLabel(value ? Stat.PromoLabel.On : Stat.PromoLabel.Off).setSampleRate(shoppingOnOff.getRate()).finish();
        });
    } else if (isCiuvoAvailable(productId)) {
        getPref(Prop.dealprice_enabled, null, function(value) {
            new Stat().setTrackId(shoppingOnOff.getRes()).setType(Stat.Type.Shopping).setAction(Stat.PromoAction.Ciuvo).setLabel(value ? Stat.PromoLabel.On : Stat.PromoLabel.Off).setSampleRate(shoppingOnOff.getRate()).finish();
        });
    }
}

function updateToolIconInternal(msg, popupPath, iconPath, tips) {
    consoleLog("updateToolIconInternal begin, popupPath:" + popupPath);
    chrome.browserAction.setPopup({
        popup: popupPath,
        tabId: msg.tabid
    });
    chrome.browserAction.setIcon({
        path: {
            "19": iconPath + "_19.png",
            "38": iconPath + "_38.png"
        },
        tabId: msg.tabid
    });
    chrome.browserAction.setTitle({
        title: tips,
        tabId: msg.tabid
    });
}

function rgb(r,g,b) {
    return 'rgb(' + [(r||0),(g||0),(b||0)].join(',') + ')';
}

function testDOMLoad(tabId, callback, retry) {
    chrome.tabs.sendMessage(tabId, {type:'test'}, function(response) {
        retry--;
        
        consoleLog("testDOMLoad:" + retry);
        
        if (retry == 0) {
            return;
        } else if (response == undefined) {
            setTimeout(function() {
                testDOMLoad(tabId, callback, retry);
            }, 100);
        } else {
            callback();
        }
    });
}

function updateToastToShoppingProtectionOn(msg) {
    consoleLog("updateToastToShoppingProtectionOn:" + JSON.stringify(msg));
    
    testDOMLoad(msg.tabid, function() {
        var request = {type: Request.show_toast, pid: productId, event: msg.event};
        if (msg.name != '') {
            request.text = chrome.i18n.getMessage('shopping_protection_on') + msg.name;
        } else {
            request.text = chrome.i18n.getMessage('shopping_protection_on_without_pattern');
        }
        
        request.status = 'safety';
        
        chrome.tabs.sendMessage(msg.tabid, request, function(response) {
            consoleLog("sendMessage response:" + JSON.stringify(response));
        });
    }, 40);
}

function updateToastToScanStart(msg) {
    updateToastToShoppingProtectionOn(msg);
}

function updateToastToScanEnd(msg) {
    var request = {type: Request.show_toast, pid: productId, event: msg.event};
    if (msg.safe) {
        request.text = chrome.i18n.getMessage('shopping_protection_no_risk');
        request.status = 'safety';
    } else {
        request.text = chrome.i18n.getMessage('shopping_protection_risk_found');
        request.status = 'risky';
    }
    
    chrome.tabs.sendMessage(msg.tabid, request, function(response) {
        consoleLog("updateToastToScanEnd response:" + JSON.stringify(response));
    }); 
}

function enterNetPayMode(tabId) {
    var msg=[{"event":Event.enable_netpay,"tabid":tabId}];
    port.postMessage(msg);
    
    consoleLog("enterNetPayMode:" + JSON.stringify(msg));
}

function exitNetPayMode(tabId) {
    var msg=[{"event":Event.disable_netpay,"tabid":tabId}];
    port.postMessage(msg);
    
    consoleLog("exitNetPayMode:" + JSON.stringify(msg));
}

function initTemplateBase(document, msg) {
    if (msg.netpay != undefined) {
        document.getElementById('netpay-mode').textContent = chrome.i18n.getMessage('shopping_protection');
        var netpaySwitch = document.getElementById('netpay-switch');
        
        if (msg.netpay) {
            netpaySwitch.src  = "../images/switch_on.png";
            
            if (msg.safe != undefined) {
                document.getElementById('security-check-container').style.display = 'flex';
                
                securityCheckText = document.getElementById('security-check');
                securityCheckText.textContent = chrome.i18n.getMessage('security_check');
                
                securityStateText = document.getElementById('security-state');
                scanResultImg = document.getElementById('scan-result-img');
                riskProcessedText = document.getElementById('risk-processed');
                if (msg.safe) {
                    securityStateText.textContent = chrome.i18n.getMessage('no_risk');
                    scanResultImg.src = "../images/icon_checked.png";
                    
                    riskProcessedText.style.display = 'none';
                } else {
                    securityStateText.textContent = chrome.i18n.getMessage('risk_detected') + ". ";
                    scanResultImg.src = "../images/icon_risky.png";
                    
                    riskProcessedText.style.display = 'inline';
                    riskProcessedText.textContent = chrome.i18n.getMessage('Resolved') + '?';
                    riskProcessedText.onclick = function(e) {
                        var msg=[{"event":Event.risk_processed}];
                        port.postMessage(msg);
                        
                        riskProcessedText.style.display = 'none';
                        securityStateText.textContent = chrome.i18n.getMessage('no_risk');
                        scanResultImg.src = "../images/icon_checked.png";
                    };
                }
            }
            else{
                if(AntiTrack.enable_antitrack) {
                    scanStatusImg = document.getElementById('large_icon');
                    if(scanStatusImg != null)
                        scanStatusImg.src = "../images/antitrack_large.png";
                }    
            }
        } else {
            if(AntiTrack.enable_antitrack)
            {
                scanStatusImg = document.getElementById('large_icon');
                if(scanStatusImg != null)
                    scanStatusImg.src = "../images/antitrack_large.png";
            }

            netpaySwitch.src = "../images/switch_off.png";
            document.getElementById('misc-pannel').style.display = 'none';
        }
        
        netpaySwitch.onclick = function(e) {
            document.getElementById('security-check-container').style.display = 'none';
            
            var miscPannel = document.getElementById('misc-pannel');
            if (msg.netpay) {
                miscPannel.style.display = 'none';
                this.src  = "../images/switch_off.png";
                
                exitNetPayMode(msg.tabid);
            } else {
                miscPannel.style.display = 'block';
                this.src  = "../images/switch_on.png";
                
                enterNetPayMode(msg.tabid);
            }
        };
    } else {
        document.getElementById('netpay-pannel').style.display = 'none';
        document.getElementById('misc-pannel').style.display = 'none';
    }
}

function updateSafeTemplate(document, msg) {
    initTemplateBase(document, msg);

    if(AntiTrack.enable_antitrack)
        document.getElementById('status-text').textContent = chrome.i18n.getMessage('safe_website_antitrack');
    else   
        document.getElementById('status-text').textContent = chrome.i18n.getMessage('safe_website');

    document.getElementById('enhance-text').textContent = chrome.i18n.getMessage('enhanced');
    
    if (msg.netpay == undefined) {
        document.getElementById('enhance-pannel').style.display = 'none';
        document.getElementById('status-desc').style.display = 'flex'; 
        document.getElementById('status-desc').textContent = getEnableShoppingProtectionDesc(productId);
    }

    if(AntiTrack.enable_antitrack)
    {
        document.getElementById('status-desc').style.display = 'flex';
        document.getElementById('status-desc').textContent = chrome.i18n.getMessage('safe_website_desc');
    }
}

function updateShoppingTemplate(document, msg) {
    initTemplateBase(document, msg);
    
    //console.log('=========updateShoppingTemplate=========')
    
    if (msg.name != undefined) {
        document.getElementById('website-name-container').style.display = 'flex';
        document.getElementById('website').textContent = chrome.i18n.getMessage('website');
        document.getElementById('website-name').textContent = msg.name;
        
        document.getElementById('website-description-container').style.display = 'flex';
        document.getElementById('website-status').textContent = chrome.i18n.getMessage('status');
        document.getElementById('website-official').textContent = chrome.i18n.getMessage('official');
        document.getElementById('website-safe').textContent = chrome.i18n.getMessage('safe');
    }
    
    var statusText = document.getElementById('status-text');
    var statusDesc = document.getElementById('status-desc');
    
    if (msg.netpay != undefined) {
        var miscPannel = document.getElementById('misc-pannel');
        var shoppingImg = document.getElementById('shopping-icon-large');
        
        statusText.textContent = chrome.i18n.getMessage('shopping_website');
        
        if( msg.netpay == 0) {
            miscPannel.style.display = 'none';
            shoppingImg.src  = "../images/shopping_exit_large.png";
            statusDesc.textContent = chrome.i18n.getMessage('shopping_protection_exit_desc');
        } else {
            miscPannel.style.display = 'block';
            shoppingImg.src  = "../images/shopping_large.png";

            if(AntiTrack.enable_antitrack)
                statusDesc.textContent = chrome.i18n.getMessage('shopping_desc_antitrack');
            else
                statusDesc.textContent = chrome.i18n.getMessage('shopping_desc');
        }
    } else { // disabled by ts/360safe
        statusText.textContent = chrome.i18n.getMessage('shopping_website_off');
        statusDesc.textContent = getEnableShoppingProtectionDesc(productId);
        
        document.getElementById('netpay-pannel').style.display = 'none';
        document.getElementById('misc-pannel').style.display = 'none';
        document.getElementById('shopping-icon-large').src= "../images/shopping_exit_large.png";
    }
}

function updatePayTemplate(document, msg) {
    updateShoppingTemplate(document, msg);
}

function updateRiskTemplate(document, msg) {
    document.getElementById('status-text').textContent = chrome.i18n.getMessage('risk_website');
    document.getElementById('status-desc').textContent = chrome.i18n.getMessage('risk_desc');
    
    closeButton = document.getElementById('close-tab');
    closeButton.textContent = chrome.i18n.getMessage('close');
    closeButton.onclick = function(e) {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            var currentTab = tabs[0];
            consoleLog("callback:" + JSON.stringify(currentTab));      
            chrome.tabs.remove([currentTab.id]);
        });
    };
    
    reportText = document.getElementById('report-false-positive');
    reportText.textContent = chrome.i18n.getMessage('report_false_positive');
    reportText.onclick = function(e) {
        chrome.tabs.create({url: getReportFalsePositiveUrl(productId)});
    };
}

function updateUnknownTemplate(document, msg) {
    document.getElementById('status-text').textContent = getCopyRightDesc();
}

function updateCheckingTemplate(document, msg) {
    document.getElementById('status-text').textContent = chrome.i18n.getMessage('checking_website');
}

function updatePopup(msg) {
    consoleLog("updatePopup:" + JSON.stringify(msg));
    
    var popupTemplates = [
        {id:'safe-container', func: updateSafeTemplate},
        {id:'risk-container', func: updateRiskTemplate},
        {id:'pay-container', func: updatePayTemplate},
        {id:'shopping-container', func: updateShoppingTemplate},
        {id:'unknown-container', func: updateUnknownTemplate},
        {id:'checking-container', func: updateCheckingTemplate},
    ];
    
    chrome.tabs.get(msg.tabid,function(tab){
        var views = chrome.extension.getViews({type: "popup", windowId:tab.windowId});
        for (var i = 0; i < views.length; i++) {
            for (var j = 0; j < popupTemplates.length; j++) {
                elem = views[i].document.getElementById(popupTemplates[j].id);
                if (elem != null) {
                    popupTemplates[j].func(views[i].document, msg);
                    return;
                }
            }
        }
    });   
}


function initSiteAccessState(msg) {
    if (msg.siteaccess == 0) {
        compatibleState = CompatibleState.enable_siteaccess;
        if(AntiTrack.enable_antitrack)
        {
            setTimeout(function() {
                setSiteAccessDisabledAntiTrackBrowserAction();
            }, 1000);
        }
        else
        {
            setTimeout(function() {
                setSiteAccessDisabledBrowserAction();
            }, 1000);
        }
    }
}

function triggerUpdatePopup(tabId) {
    var msg=[{"tabid":tabId,"event":Event.popup_status_query}];
    port.postMessage(msg);
    
    consoleLog("triggerUpdatePopup:" + JSON.stringify(msg));
}

function setPopupPrivacyPageState(state) {
    var msg = [{ "tabid": state, "event": Event.popup_privacy_page_state }];
    if (port != null) {
        port.postMessage(msg);
    }
    consoleLog("setPopupPrivacyState:" + JSON.stringify(msg));
}

function enableToolIcon(enabled) {
    if (enabled) {
        chrome.browserAction.enable();
    } else {
        chrome.browserAction.disable();
    }
}

function enableToolIconStatus(staus) {
    if (staus) {
        
        if (compatibleState == CompatibleState.none) {
            setUpgradeEnvAction();
        }
        else {
            setDefaultBrowserAction();
        }
    } else {
        setStatusDisableBrowserAction();
    }
}

function statPopup(id) {
    var action = null;
    
    if (id == 'safe-container') {
        action = Stat.PopupAction.Safe;
    } else if (id == 'risk-container') {
        action = Stat.PopupAction.Risk;
    } else if (id == 'pay-container') {
        action = Stat.PopupAction.Payment;
    } else if (id == 'shopping-container') {
        action = Stat.PopupAction.Shopping;
    } else if (id == 'unknown-container') {
        action = Stat.PopupAction.Unknown;
    } else if (id == 'checking-container') {
        action = Stat.PopupAction.Checking;
    } else {
        return false;
    }
    
    var config =
        browserType.indexOf("firefox") != -1 ?
        Rule.getIns().getStatFirefoxConfig().getPopup() :
        Rule.getIns().getStatConfig().getPopup();
    
    new Stat().setTrackId(config.getRes()).setType(Stat.Type.Popup).setAction(action).setSampleRate(config.getRate()).finish();
    return true;
}

function setMessageListener() {
    function promptOptin() {
        return  "(function() {\n" +
        "        var ciuvoOptin = new ciuvoSDK.Optin(document, {\n" +
        "            'tag': 'threesixty',\n" +
        "            'base_url': 'https://api.ciuvo.com/api/',\n" +
        "            'media_host_url': 'https://www.ciuvo.com/',\n" +
        "        });\n" +
        "        var statusCallback = function(optinStatus, runSDKCallback) {\n" +
        "            if (optinStatus === 'enabled') { consoleLog('enabled'); }\n" +
        "            else if (optinStatus === 'declined') { consoleLog('declined');}\n" +
        "            else {}\n" +
        "            runSDKCallback(null);\n" +
        "        };" +
        "        ciuvoOptin.on('optin-changed', function(value) {\n" +
        "            consoleLog('New optin status: ' + value);\n" +
        "            if (value === 'enabled') {\n" +
        "                consoleLog('accept offer');\n" +
        "                chrome.runtime.sendMessage({text: Request.deal_price_accepted, state: true }, function(response) {\n" +
        "                });\n" +
        "            } else if (value === 'declined') {\n" +
        "                consoleLog('decline offer');\n" +
        "                chrome.runtime.sendMessage({text: Request.deal_price_accepted, state: false }, function(response) {\n" +
        "                });\n" +
        "            } else {\n" +
        "                consoleLog('cancel offer');\n" +
        "                chrome.runtime.sendMessage({text: Request.deal_price_accepted, state: null }, function(response) {\n" +
        "                });\n" +
        "            }\n" +
        "        });\n" +
        "        ciuvoOptin.run(statusCallback);\n" +
        "})();";
    }

    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        consoleLog("onMessage:" + JSON.stringify(sender));
        
        if (request.text == Request.get_product_id) {
            sendResponse(productId);
        } else if (request.text == Request.stat_popup) {
            sendResponse(statPopup(request.id));
        } else if (request.text == Request.enable_toolbar_icon) {
            sendResponse(enableToolIcon(request.state));
        } else if (request.text == Request.enable_toolbar_icon_status) {
            sendResponse(enableToolIconStatus(request.state));
        }else if (request.text == Request.on_antitrack_inject) {
            var e = [];
            e[0] = false;
            if(AntiTrack.settings.isEnabled()){
  
                var find = false;
                if (request.hasOwnProperty("url")) {
                    try {
                        AntiTrack.exclude_list.forEach(function f(e, u, a) {
                            if ( request.url.indexOf(e) != -1) {
                                find = true;
                                throw Error();  
                            }
                        });
                    } catch (e) {
                        
                    }
                }
                if (!find ) {
                    e[0] = true;
                    e[1] = AntiTrack.useragent.GetAgent(sender.tab.id);
                    e[2] = AntiTrack.plugin_list;
                    if (request.hasOwnProperty("url"))
                    callNativeHost(0, request.url, Event.antitrack_host_notify);
                }
                else{
                  
                }
            }
            sendResponse(e); 

        } else if (request.text == Request.agree_to_privacy_policy) {
            sendResponse(setPrivacyPolicy(request.state));
        } else if (request.text == Request.get_compatiable_state) {
           /*
            * response: {pid:xxx, state:xxx}
            */
            sendResponse({state:compatibleState, pid:productId});
    

        } else if (request.text == Request.check_promo_prerequisite) {
            sendResponse(triggerUpdatePopup(sender.tab.id, sender.tab.windowId));
        } else if (request.text == Request.inject_script) {
            if (isStoreConsultantAvailable(productId) && Rule.getIns().getStoreConsultant().isEnabled()) {
                if ((request.status == WebStatus.safe && Rule.getIns().getStoreConsultant().isSafeWebsiteInjected()) || 
                    request.status == WebStatus.shopping) { // prompt except malware website 
                    getPref(Prop.sovetnik_enabled, null, function(value) {
                        consoleLog("sovetnik_enabled:" + value);
                        
                        if (value == null) {
                            consoleLog("inject_script: sovetnik-inject-content.js");
                            chrome.tabs.executeScript(sender.tab.id, {file: "promo/sovetnik-inject-content.js"});
                        } else if (value) {
                            consoleLog("inject_script: sovetnik-inject-content.js");
                            chrome.tabs.executeScript(sender.tab.id, {file: "promo/sovetnik-inject-content.js"});
                        } else {
                            consoleLog("inject_script: turn off sovetnik-inject-content.js");
                        }
                    });
                }
            } else if (isCiuvoAvailable(productId) && Rule.getIns().getCiuvo().isEnabled()) {
                if ((request.status == WebStatus.safe && Rule.getIns().getCiuvo().isSafeWebsiteInjected()) || 
                    request.status == WebStatus.shopping) {
                    getPref(Prop.dealprice_enabled, null, function(value) {
                        consoleLog("ciuvo_enabled:" + value);
                        
                        if (value == null) {
                            if (isTimeUpToPopupCiuvo()) {
                                chrome.tabs.executeScript(sender.tab.id, {
                                    code: 'var count = ' + getGlobalValue(Prop.dealprice_popup_count) + ';'
                                }, function() {
                                    var ciuvoCS = {file: "promo/ciuvo-contentscript.js", runAt: 'document_start'},
                                    optinCS = {code: promptOptin(), runAt: 'document_end'};
                                
                                    // injects the ciuvo-contentscript.min.js and afterwards sends the message
                                    chrome.tabs.executeScript(sender.tab.id, ciuvoCS, function(result) {
                                        if (result) {
                                            chrome.tabs.executeScript(sender.tab.id, optinCS, function(result) {
                                                consoleLog("Injected: " + result);
                                            });
                                        }
                                    });
                                });
                            }
                        } else if (value) {
                            injectCiuvoScriptFunc(sender.tab.id, sender.tab.url);
                        } else {
                            consoleLog("inject_script: turn off ciuvo-contentscript.js");
                        }
                    });
                }
            }
            sendResponse(0);
        } else if (request.text == Request.store_consultant_accepted) {
            var config = 
                browserType.indexOf("firefox") != -1 ? 
                Rule.getIns().getStatFirefoxConfig().getAgreement() :
                Rule.getIns().getStatConfig().getAgreement();
            
            if (request.state) {
                new Stat().setTrackId(config.getRes()).setType(Stat.Type.StoreConsultant).setAction(Stat.Action.AcceptOffer).setSampleRate(config.getRate()).finish();
            } else {
                new Stat().setTrackId(config.getRes()).setType(Stat.Type.StoreConsultant).setAction(Stat.Action.DeclineOffer).setSampleRate(config.getRate()).finish();
            }
        } else if (request.text == Request.deal_price_accepted) {
            updateTimeUpToPopupCiuvo();
            
            var config = 
                browserType.indexOf("firefox") != -1 ? 
                Rule.getIns().getStatFirefoxConfig().getAgreement() :
                Rule.getIns().getStatConfig().getAgreement();
            
            if (request.state == null) {
                new Stat().setTrackId(config.getRes()).setType(Stat.Type.Ciuvo).setAction(Stat.Action.CancelOffer).setSampleRate(config.getRate()).finish();
            } else if (request.state) {
                setPref(Prop.dealprice_enabled, true);
                injectCiuvoScriptFunc(sender.tab.id, sender.tab.url);
                new Stat().setTrackId(config.getRes()).setType(Stat.Type.Ciuvo).setAction(Stat.Action.AcceptOffer).setSampleRate(config.getRate()).finish();
            } else {
                setPref(Prop.dealprice_enabled, false);
                new Stat().setTrackId(config.getRes()).setType(Stat.Type.Ciuvo).setAction(Stat.Action.DeclineOffer).setSampleRate(config.getRate()).finish();
            }
        } else if (request.text == Request.on_wd_helper_inject && typeof wdHelper != 'undefined'){
            if(wdHelper.webSupport(request.url))
            {
                sendResponse(wdHelper.web_script);
            }
            else{
                sendResponse(0);
            }
        } else if (request.text == Request.on_wd_helper_support)
        {
            callNative(sender.tab.id,sender.url, request.sid,request.func, request.parameter);
        } else if (request.text == Request.popup_privacy_page_agree) {
            sendResponse(setPopupPrivacyPageState(request.state));
        }
    });
}

function procWebNavigation(details) {
    if (details.transitionType != "auto_subframe") {
        var transitionQualifiers = 0;
        for (var i = 0; i < details.transitionQualifiers.length; i++) {
            if (details.transitionQualifiers[i] == 'client_redirect') {
                transitionQualifiers |= 0x00020000;
            }
            if (details.transitionQualifiers[i] == 'server_redirect') {
                transitionQualifiers |= 0x80000000;
            }
            if (details.transitionQualifiers[i] == 'forward_back') {
                transitionQualifiers |= 0x00040000;
            }
            if (details.transitionQualifiers[i] == 'from_address_bar') {
                transitionQualifiers |= 0x02000000;
            }
        }

        callNativeHostWithTransType(details.tabId, details.url, Event.transType_tab, details.transitionType, transitionQualifiers);

    }
}
function initExtension() {
    browserType = getBrowserInfoEx().appname.toLowerCase();
    
    createNativeHost();
    setContextInfo();
    
    chrome.tabs.onCreated.addListener(function (tab) {
        if(!tab.url) return; 
        procUrlWithInfo(tab.id,tab.url,Event.create_tab, tab);
    });
    if ("object" == (typeof chrome.webNavigation) && browserType.indexOf("firefox") == -1) {
        chrome.webNavigation.onCommitted.addListener(function (details) {
            procWebNavigation(details);
         });
        chrome.webNavigation.onHistoryStateUpdated.addListener(function (details) {
            procWebNavigation(details);
        });
        chrome.webRequest.onHeadersReceived.addListener(function (details) {
            var requestId = parseInt(details.requestId, 10);
            callNativeHostWithRequestStaus(details.tabId, details.url, details.statusCode, requestId, Event.request_tab, details);
        }, {
            urls: ['<all_urls>'],
         types: ['main_frame']
        }, ['extraHeaders']);
    }

    if(typeof browser === 'undefined')
    {
        chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
            if(changeInfo.status == "loading"){
                if(!tab.url) return;
                    if (tab.url.search("chrome://*") != -1 || tab.url.search("edge://*") != -1) {
                        procUrlWithInfo(tab.id, tab.url, Event.update_tab, tab);
                    } else {
                        procUrlWithOpenerId(tab.id, tab.url, Event.update_tab, tab.openerTabId, tab);
                    }
            }
        });
    }
    else
    {
        chrome.webNavigation.onCompleted.addListener(function(details) {
            if (details.frameId === 0) {
                chrome.tabs.get(details.tabId,function(tab){
                    procUrlWithInfo(tab.id, tab.url, Event.update_tab, tab);
                })
            }
            });
    }


    chrome.tabs.onReplaced.addListener(function (addTabId,removeTabId){
        chrome.tabs.get(addTabId,function(tab){
            notifyUpdateTab(addTabId,removeTabId,tab.url,tab.windowId);
        });
    });
    
    chrome.tabs.onActivated.addListener(function (activeInfo) {
        chrome.tabs.get(activeInfo.tabId,function(tab){
            notifyActiveTab(tab.id, tab.windowId, tab.title);
        });
    });

    chrome.windows.onFocusChanged.addListener(function (windowid) {
        notifyFocusWindow(windowid);
    });

    chrome.tabs.onRemoved.addListener(function (tabId, removeInfo) {
        procUrl(tabId,0,Event.remove_tab);
    });
    
    setTimeout(function() {
        if (installedDetails != null) {
            if (installedDetails.reason == "install") {
                PopupPrivacyPage();
                testNativeHost(Event.installed);
            } else if (installedDetails.reason == "update") {
            }
        }
    }, 500); // wait OnInstalled event sent
}

function PopupPrivacyPage() {
    if (browserType.indexOf("firefox") != -1 || browserType.indexOf("chrome") != -1) {
        consoleLog("initExtension，pop privacy.html");
        setPref(Prop.enable_toast, false);
        chrome.tabs.create({
            url: chrome.extension.getURL("popup/privacy.html")
        }, function (t) {
            openerTabId = t.id;
            consoleLog("initExtension，openerTabId:" + openerTabId);
        });
        setStatusDisableBrowserAction();
    }
}

function checkCanonicalWebshield(retry) {
    if (compatibleState != CompatibleState.none) {
        return;
    }
    
    retry--;
    consoleLog("checkCanonicalWebshield:" + retry);
        
    if (retry == 0) {
        if (compatibleState == CompatibleState.none) {
            if (browserType.indexOf("firefox") == -1) {
                consoleLog("checkCanonicalWebshield，setUpgradeEnvAction()");
                setUpgradeEnvAction();
            }
        }
    } else {
        setTimeout(function() {
            checkCanonicalWebshield(retry);
        }, 1000);
    }
}

function checkPromoPrerequesite(msg) {
    if (msg.status == WebStatus.safe || msg.status == WebStatus.shopping) {
        if (msg.netpay != undefined) { // neypay function turned on
            var request = { type: Request.promo_prerequisite_ok, status: msg.status };
            chrome.tabs.sendMessage(msg.tabid, request, function(response) {
            });
        }
    }
}

function initCiuvo() {
    config = {
        "tag": "threesixty"
    };
    
    injectCiuvoScriptFunc = initCiuvoSettings(config);
}

function setOninstalledListener() {
    // ASAP ready for event sent from chrome
    chrome.runtime.onInstalled.addListener(function(details) {
        consoleLog("onInstalled:" + JSON.stringify(details));
        
        installedDetails = details;

    });
}

(function() {
    setOninstalledListener();
    setMessageListener();
    
    chrome.runtime.getPlatformInfo(function(info) {
        consoleLog("checkPlatform:" + JSON.stringify(info));
        
        if (info.os == "win") {
            initExtension();
            
            checkCanonicalWebshield(5);
        } else {
            compatibleState = CompatibleState.unsupported_platform;
            try {
                enableToolIcon(false);
                AntiTrack.settings.setEenabled(false);
            } catch (e) {
                
            }
            chrome.browserAction.setTitle({
                title: chrome.i18n.getMessage('unsupported_platform_message')
            });
        }
    });
})();