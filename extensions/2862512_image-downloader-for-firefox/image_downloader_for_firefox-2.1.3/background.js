const debugMode = false;
const browserType = "firefox"; //chrome/edge/opera/firefox

chrome.runtime.onInstalled.addListener(onInstall);

chrome.tabs.onActivated.addListener(function(activeInfo){
    chrome.tabs.get(activeInfo.tabId, function(tab){
        if(!isValidURL(tab.url)){
            chrome.action.setIcon({
                path: {
                    '16':chrome.runtime.getURL("assets/disableIcon-16.png"),
                    '32':chrome.runtime.getURL("assets/disableIcon-32.png"),
                    '48':chrome.runtime.getURL("assets/disableIcon-48.png"),
                    '128':chrome.runtime.getURL("assets/disableIcon-128.png")
                },
                tabId: activeInfo.tabId
            });
        } 
    });
});


function isValidURL(url){
    let address=url.toString();
    let size = address.length;
    if((browserType == "chrome") && size > 28 && address.substring(8,29)=="chromewebstore.google"){
        return false;
    }else if((browserType == "edge") && size > 30 && address.substring(8,31)=="microsoftedge.microsoft"){
        return false; 
    }else if((browserType == "firefox") && size > 21 && address.substring(8,22)=="addons.mozilla"){
        return false;
    }else if(size > 3 && address.startsWith("http")){
        return true;
    }
    return false;
}
function last2Char(str){
    let lastTwo = "0" + str;
    return lastTwo.slice(-2)
}
function onInstall(details){
    if(debugMode){console.log("onInstall");}
    if(details.reason == "install"){
        if(!debugMode){chrome.runtime.setUninstallURL('https://suricata.software/en/uninstall_survey/image_downloader');}
        chrome.runtime.getPlatformInfo().then(function(info){
            let date = new Date();
            let UID = browserType=='firefox' ? 'g' : 'c' ;
            UID += last2Char(date.getFullYear())+last2Char((date.getMonth()+1))+last2Char(date.getDate()); //last2Char adds a '0' prefix
            let randomPool = new Uint8Array(8);
            crypto.getRandomValues(randomPool);
            for (let i=0; i<randomPool.length; ++i) {
                UID += randomPool[i].toString(16);
            }
            let lang = chrome.i18n.getUILanguage().replace('-','_');
            if(lang.substr(0,2) == 'en'){
                lang = 'en';
            }else if(lang.substr(0,2) == 'es'){
                lang = 'es';
            }else if(lang.substr(0,2) == 'pt'){
                lang = 'pt';
            }
            chrome.storage.local.set({
                UID: UID,
                lang: lang
            });
            if(!debugMode){
                const locals = ['ja','ko','es','pt_BR','zh_CN'];                
                if(false && locals.includes(lang)){
                    chrome.tabs.create({
                        url:"https://suricata.software/"+lang+"/image_downloader"
                    });
                }else{
                    chrome.tabs.create({
                        url:"https://suricata.software/en/image_downloader"
                    });
                }
            }
        });
    }else if(details.reason=="update"){
        chrome.storage.local.get({
            lang:"en",
        },function(items){
            let lang = items['lang'];
            if(lang.substr(0,2) == 'en'){
                lang = 'en';
            }else if(lang.substr(0,2) == 'es'){
                lang = 'es';
            }else if(lang.substr(0,2) == 'pt'){
                lang = 'pt';
            }
            if(!debugMode){
                chrome.tabs.create({
                    url:"https://suricata.software/image_downloader-rate_us/"+browserType+"/"+lang
                });
            }
        });
    }
    init();
}
function init(){
    if(debugMode){console.log("init");}
    try{
        chrome.tabs.query({}, function(tabs) {
            if(debugMode){console.log("inject");}
            for(let i=0;i<tabs.length;i++){
                if(isValidURL(tabs[i].url)){
                    chrome.scripting.executeScript({
                        target: {tabId: tabs[i].id, allFrames:false},
                        files: ['contentScript.js'],
                    }, () => { if(debugMode){console.log("script injected" + tabs[i].url)} });
                }
            }
        });
    }catch(error){
        if(debugMode){console.log("inject failed");}
    }
}
