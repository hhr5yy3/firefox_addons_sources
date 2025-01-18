"use strict";
const {alarms, storage, tabs, notifications, webRequest} = browser;

var options = {
  "enable_notifications": true,
};

storage.onChanged.addListener((changes, area) => {
  if ("enable_notifications" in changes) {
    options["enable_notifications"] = changes["enable_notifications"].newValue;
  }
});

storage.local.get("enable_notifications").then(res => {
  if ("enable_notifications" in res && res["enable_notifications"] != true) {
    options["enable_notifications"] = false;
  }
});

function notify(message) {
  if (!options["enable_notifications"]) {
    return;
  }

  notifications.create("google-link-cleaner-notification", {
    "type": "basic",
    "title": "Google Link Cleaner",
    "message": message,
  });

  alarms.clearAll();
  alarms.create("", {
    delayInMinutes: 0.1,
  });
}

function processRequest(details) {
  if (details.tabId == tabs.TAB_ID_NONE) {
    return;
  }
  
  var url = details.url;
  //retrieve the url from a google link
	if (/^https?:\/\/www\.google\.[a-z.]+\/url\?.+&url=/.test(url)) {
		url = /&url=([^&]+)/.exec(url)[1];
	}
	
  // special case for yahoo search results
	if (/^https?:\/\/r\.search\.yahoo\.com\/.+\/RU=/.test(url)) {
		url = /\/RU=([^\/]+)/.exec(url)[1];
	}
	
	if (url != details.url) {
	  url = decodeURIComponent(url);
	  notify(`Opening: ${url}`);
	  
	  if (details.type == "sub_frame") { // on google page
	    tabs.update(details.tabId, {url});
	    return {cancel: true};
	  }
	  return {redirectUrl: url};
	}
}

webRequest.onBeforeRequest.addListener(
  processRequest,
  {urls: ["*://*/*"], types: ["main_frame", "sub_frame"]},
  ["blocking"]
);

alarms.onAlarm.addListener(alarm => {
  notifications.clear("google-link-cleaner-notification");
});
