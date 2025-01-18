KEY_USERID = "notif-user-id";
getUserId = () => {
    let userId = localStorage.getItem(KEY_USERID);

    if (!userId) {
        userId = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });

        localStorage.setItem(KEY_USERID, userId);
    }

    return userId;
};


var homepage = function () {return browser.runtime.getManifest().homepage_url};
var version = function () {return browser.runtime.getManifest().version};
const welcomeUrl = `${homepage()}/?v=${version()}&type=install`;
const goodbyeUrl = `${homepage()}?v=${version()}&type=uninstall&uid=${getUserId()}`;
const url = "/index.html";
browser.runtime.setUninstallURL(goodbyeUrl, function () {});


browser.runtime.onInstalled.addListener(function(details){
    if(details.reason == "install"){
		  browser.tabs.create({ url: welcomeUrl });
    }
});

browser.browserAction.onClicked.addListener(function(activeTab)
{
    browser.tabs.create({ url: url });
});
