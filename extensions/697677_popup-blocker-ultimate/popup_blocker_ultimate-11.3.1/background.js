var donatePage = "http://www.popupblocker.ir/v/click.php?id=3";
var sharePage = "http://www.popupblocker.ir/v/click.php?id=4";
var ratePage = "http://www.popupblocker.ir/v/click.php?id=5";
var aboutPage = "http://www.popupblocker.ir/v/click.php?id=6";
var sbuPage = "http://www.popupblocker.ir/v/click.php?id=12";
var blockedCounts = 0;
var blockedRequests = 0;
var getFinalStatus = "disabled";
function updateIcon(type) {
	browser.runtime.getPlatformInfo().then((info) => {
		if (info.os != "android") {
			browser.browserAction.setIcon({
				path: {
				  32: "data/icons/icon-" + type + ".png"
				}
		    });
		}
	});
}
function getDomain(url) {
  url = url.replace(/https?:\/\/(www.)?/i, '');
  if (url.indexOf('/') === -1) {
    return url;
  }
  return url.split('/')[0];
}
function matchRuleShort(str, rule) {
  var escapeRegex = (str) => str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
  return new RegExp("^" + rule.split("*").map(escapeRegex).join(".*") + "$").test(str);
}
function getStatus() {
	return new Promise(function(resolve) {
		browser.storage.local.get("statuspopup", function (o) {
			 status = ("statuspopup" in o) ? o["statuspopup"] : "babw";
			 resolve(status);
	 });
	});
}
function CheckInWhitelist(url){
	var domainName = getDomain(url);
	return new Promise(function(resolve) {
	browser.storage.local.get("whitelistpb", function (o) {
		var tmp = ("whitelistpb" in o) ? o["whitelistpb"] : "";
		if (tmp !== "")  {
			var lines =  tmp.split(/\n/);
			for (var i=0; i < lines.length; i++) {
				if (lines[i] != "") {
					if (domainName == getDomain(lines[i]) || matchRuleShort(domainName, lines[i]) || matchRuleShort(url, lines[i])) {
						 foundInWhitelistJs = true;
						 resolve("whitelist");
						 break;
					}
				}
			  
			}
		}
		resolve("enabled");
	  });
	});
}
function CheckInBlacklist(url){
	var domainName = getDomain(url);
	return new Promise(function(resolve) {
		browser.storage.local.get("blacklistpb", function (o) {
				var tmp = ("blacklistpb" in o) ? o["blacklistpb"] : "";
				if (tmp !== "")  {
					var lines =  tmp.split(/\n/);
					for (var i=0; i < lines.length; i++) {
						if (lines[i] != "") {
							if (domainName == getDomain(lines[i]) || matchRuleShort(domainName, lines[i]) || matchRuleShort(url, lines[i])) {
								 foundInBlacklist = true;
								 resolve("blacklist");
								 break;
							}
						}
					  
					}
				}
				resolve("disabled");
	    });
	});
}
// add header listener
function changeSettings(details) {
	 var url = details.url;
	 return new Promise(function(resolve) {
		getStatus().then(function(statusValue) {
		  if (statusValue == "aa") {
				resolve("disabled");
		  } else if (statusValue == "ba") {
			  resolve("enabled");
		  } else if (statusValue == "babw") {
			  CheckInWhitelist(url).then(function(whiteListValue) {
				  resolve(whiteListValue);
			  });
		  } else if (statusValue == "aabb") {
			  CheckInBlacklist(url).then(function(blackListValue) {
				  resolve(blackListValue);
			  });
		  }
		});
	 }).then(function(finalStatus) {
		 getFinalStatus = finalStatus;
		 updateIcon(finalStatus);
		 if (finalStatus == "disabled") {
			 browser.browserSettings.allowPopupsForUserEvents.set({
                value: true
            });
		 } else if (finalStatus == "enabled") {
			 browser.browserSettings.allowPopupsForUserEvents.set({
                value: false
            });
		 } else if (finalStatus == "whitelist") {
			 browser.browserSettings.allowPopupsForUserEvents.set({
                value: true
            });
		 } else if (finalStatus == "blacklist") {
			 browser.browserSettings.allowPopupsForUserEvents.set({
                value: false
            });
		 }
	 });
}	 
function addToWhitelist(domainName) {
	var found = false;
	var myWhitelist = "";
	browser.storage.local.get("whitelistpb", function (o) {
		var tmp = ("whitelistpb" in o) ? o["whitelistpb"] : "";
		if (tmp !== "")  {
			var lines =  tmp.split(/\n/);
			for (var i=0; i < lines.length; i++) {
				if (lines[i] != "") {
					if (domainName == lines[i]) {
						 found = true;
					} else {
						myWhitelist = myWhitelist + lines[i] + "\n";
					}
				}
			}
		}
		if (found == false) {
			inWhitelist = myWhitelist + domainName + "\n";
			browser.storage.local.set({"whitelistpb": inWhitelist});
			browser.notifications.create({
			  "type": "basic",
			  "iconUrl": browser.extension.getURL("data/icons/icon-enabled.png"),
			  "title": "Whitelist",
			  "message": domainName + " has been added to the whitelist."
			});
			
		} else {
			browser.storage.local.set({"whitelistpb": myWhitelist});
			browser.notifications.create({
			  "type": "basic",
			  "iconUrl": browser.extension.getURL("data/icons/icon-enabled.png"),
			  "title": "Whitelist",
			  "message": domainName + " has been removed from whitelist."
			});
			return false;
		}
	});	
}
// add to blacklist
function addToBlacklist(domainName) {
	var found = false;
	var myBlacklist = "";
	browser.storage.local.get("blacklistpb", function (o) {
		var tmp = ("blacklistpb" in o) ? o["blacklistpb"] : "";
		if (tmp !== "")  {
			var lines =  tmp.split(/\n/);
			for (var i=0; i < lines.length; i++) {
				if (lines[i] != "") {
					if (domainName == lines[i]) {
						 found = true;
					} else {
						myBlacklist = myBlacklist + lines[i] + "\n";
					}
				}
			}
		}
		if (found == false) {
			inBlacklist = myBlacklist + domainName + "\n";
			browser.storage.local.set({"blacklistpb": inBlacklist});
			browser.notifications.create({
			  "type": "basic",
			  "iconUrl": browser.extension.getURL("data/icons/icon-enabled.png"),
			  "title": "Blacklist",
			  "message": domainName + " has been added to the blacklist."
			});
			
		} else {
			browser.storage.local.set({"blacklistpb": myBlacklist});
			browser.notifications.create({
			  "type": "basic",
			  "iconUrl": browser.extension.getURL("data/icons/icon-enabled.png"),
			  "title": "Blacklist",
			  "message": domainName + " has been removed from blacklist."
			});
			return false;
		}
	});	
}
function onMessageHandler(request, sender, sendResponse) {
  if (request.message === 'type') {
    var type = request.data.type;
    if (type === "options") browser.runtime.openOptionsPage();
	if (type === "sbu") browser.tabs.create({"url": sbuPage, "active": true});
	if (type === "donate") browser.tabs.create({"url": donatePage, "active": true});
    if (type === "share") browser.tabs.create({"url": sharePage, "active": true});
	if (type === "rate") browser.tabs.create({"url": ratePage, "active": true});
	if (type === "about") browser.tabs.create({"url": aboutPage, "active": true});
	if (type === "aa" || type === "ba" || type === "babw" || type === "aabb") {
		browser.browserAction.setTitle({title: "Popup Blocker Ultimate (" + type.toUpperCase() + ")"});
		browser.storage.local.set({
			"statuspopup": type
		}, function() {
			updateActiveTab();
		});
    }
    if (type === "whitelistpb"  || type === "blacklistpb") {
        browser.tabs.query({currentWindow: true, "active": true}, function (tabs) {
	    var url = tabs[0].url;
          if (url.indexOf("http") === 0 || url.indexOf("ftp") === 0 || true) {
			url = getDomain(url);
			switch(type) {
				case "whitelistpb":
					var inWhitelist = addToWhitelist(url);
					updateActiveTab();
					break;
				case "blacklistpb":
					var inBlacklist = addToBlacklist(url);
					updateActiveTab();
					break;
			}
            
          }
        });
    }
  }
}
browser.runtime.onMessage.addListener(onMessageHandler);
browser.storage.local.get("statuspopup", function (o) {
	var statusPopup = ("statuspopup" in o) ? o["statuspopup"] : "babw";
	browser.browserAction.setTitle({title: "Popup Blocker Ultimate (" + statusPopup.toUpperCase() + ")"});
});
function updateActiveTab(tabs) {
function updateTab(tabs) {
	if (tabs[0]) {
		currentTab = tabs[0];
		changeSettings(currentTab);
	}
}
var gettingActiveTab = browser.tabs.query({
	active: true,
	currentWindow: true
});
gettingActiveTab.then(updateTab);
}
browser.tabs.onUpdated.addListener(updateActiveTab);
browser.tabs.onActivated.addListener(updateActiveTab);
updateActiveTab();



