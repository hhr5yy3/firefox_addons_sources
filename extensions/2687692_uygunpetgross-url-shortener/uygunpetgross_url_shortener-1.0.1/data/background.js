var id = null;
var uid = null;
var config_sync = {};
var themes = {};
var KEY_USERID = "Ext_UserId";

var getUserId = () => {
    let userId = localStorage.getItem(KEY_USERID);

    if (!userId) {
        userId = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });

        localStorage.setItem(KEY_USERID, userId);
    }

    return userId;
}


// var homepage = function () {return chrome.runtime.getManifest().homepage_url};
// var version = function () {return chrome.runtime.getManifest().version};
// const welcomeUrl = `${homepage()}/successful-installation?v=${version()}&type=install&uid=${getUserId()}`;
// const goodbyeUrl = `${homepage()}?v=${version()}&type=uninstall&uid=${getUserId()}`;
const url = "/data/popup/index.html";


// var initListeners = () => {
//     chrome.runtime.setUninstallURL(goodbyeUrl, function () {});
//     chrome.runtime.onInstalled.addListener(function(details){
//         if(details.reason == "install"){
//             onInstall();
//         }
// 
//         chrome.tabs.create({ url: welcomeUrl });
//     });
//     
//     chrome.browserAction.onClicked.addListener(function(activeTab)
//     {
//         chrome.tabs.create({ url: url });
//     });
// 
//     chrome.storage.onChanged.addListener(function (changes, namespace) {
//     });
// 
// 
// }

var onInstall = function(){
    chrome.storage.sync.set({
        currentTheme: "day",
        di: (new Date()).getTime(),
        uid: getUserId()
    });

}

// var Background = (function(){
// 
//     console.log('background constructor');
// 
//     initListeners();
// 
//       
// })();
