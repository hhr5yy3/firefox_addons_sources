"use strict";

let bgEscapeHTMLPolicy;

if (globalThis.trustedTypes?.createPolicy) { // Feature testing
    trustedTypes.createPolicy('myImportScriptPolicy', {
        createScriptURL: (input) => {
            return undefined;
        }
    });
    
    bgEscapeHTMLPolicy = trustedTypes.createPolicy('myEscapePolicy', {
        createScriptURL: string => string,
    });
} else {
    // dummy
    bgEscapeHTMLPolicy = {
        createScriptURL: string => string,
    }
}

try {
    importScripts(bgEscapeHTMLPolicy.createScriptURL("common.js"));
} catch (error) {
    console.error("error in sw: " + error);
}

async function setAdForSupportDismissed() {
    await chrome.storage.local.set({adForSupportDismissed:true});
}

function onButtonClicked(notificationId, buttonIndex) {
	if (notificationId == "extensionUpdate") {
		if (buttonIndex == -1 || buttonIndex == 0) {
            chrome.windows.update(chrome.windows.WINDOW_ID_CURRENT, {focused:true});
            chrome.tabs.create({url:"https://jasonsavard.com/wiki/Webmail_Ad_Blocker_changelog", active:true});
            chrome.notifications.clear(notificationId, function() {});
		} else {
			chrome.notifications.clear(notificationId, function(wasCleared) {
				// nothing
			});
		}
	} else { // ad for support
		if (buttonIndex == -1 || buttonIndex == 0) {
			setAdForSupportDismissed().then(() => {
				chrome.tabs.create({url:"https://jasonsavard.com/contribute?ref=WABNotification"});
				clearNotification("adForSupport");
			});
		} else {
            setAdForSupportDismissed();
        }
	}
}

if (chrome.notifications) {
	chrome.notifications.onClicked.addListener(function(notificationId) {
		onButtonClicked(notificationId, -1);
	});

	chrome.notifications.onButtonClicked.addListener(function(notificationId, buttonIndex) {
		onButtonClicked(notificationId, buttonIndex)
	});

	chrome.notifications.onClosed.addListener(function(notificationId, byUser) {
		if (notificationId == "extensionUpdate") {
			// nothing
		} else {
			if (byUser) {
				setAdForSupportDismissed();
			}
		}
	});	
}

function clearNotification(id) {
	chrome.notifications.clear(id, function() {
		// nothing
	});
}

if (chrome.alarms) {
	chrome.alarms.onAlarm.addListener(function(alarm) {
		if (alarm.name == "adForSupportAlarm") {
			chrome.storage.local.get(null, items => {
				if (items && !items.adForSupportDismissed) {
					const options = {
                        type: "basic",
                        priority: 2,
                        title: "Webmail Ad Blocker",
                        iconUrl: "/images/icon64.png"
                    }
                    
					if (DetectClient.isChromium()) {
                        options.message = "Thank you for using this extension!\nIf you like it, consider supporting your developer with a contribution.";
						options.buttons = [{title: getMessage("contribute")}, {title: getMessage("dismiss")}];
					} else {
                        options.message = "Thank you for using this extension!\nIf you like it, consider supporting your developer with a contribution by clicking here.";
                    }
					
					chrome.notifications.create("adForSupport", options);
				}			
			});
		} else if (alarm.name == "adForCheckerPlusForGmailAlarm") {
			/*
			if (!localStorage.adForCheckerPlusForGmailShown) {
				var options = {
						type: "basic",
						priority: 2,
						title: "Webmail Ad Blocker news",
						message: "Thank you for using WAB! You may be interested in my Gmail checker extension: It offers desktop, sound & voice notifications while avoiding ads and the Gmail website!",
						iconUrl: "/images/icon64.png",
						buttons: [{title:"Click to see: Checker Plus for Gmail"}]
				}
				chrome.notifications.create("adForCheckerPlusForGmail", options, function(notificationId) {
					localStorage.adForCheckerPlusForGmailShown = true;
				});
			}
			*/
		}
	});	
}

if (chrome.runtime.onMessage) {
	chrome.runtime.onMessage.addListener(
	     function(request, sender, sendResponse) {
			switch (request.name) {
				case "sendGA":
					sendGA(request.value);
					break;
			}
	     }
	);
}

chrome.runtime.onInstalled.addListener(async details => {
    console.info('after oninst', details);
    await DetectClient.init();

    if (details.reason == "install") {
        chrome.storage.local.set({
            installDate: new Date().toJSON(),
            installVersion: chrome.runtime.getManifest().version
        });
        chrome.alarms.create("adForSupportAlarm", {delayInMinutes:10080}); // 10080 minutes = 1 week

        chrome.permissions.getAll(response => {
            if (response.origins.length) {
                chrome.tabs.create({url: "https://jasonsavard.com/?ref=WABInstall"});
            } else {
                chrome.tabs.create({url: chrome.runtime.getURL("options.html?action=install")});
            }
        });
    } else if (details.reason == "update") {
        // seems that Reloading extension from extension page will trigger an onIntalled with reason "update"
        // so let's make sure this is a real version update by comparing versions
        var realUpdate = details.previousVersion != chrome.runtime.getManifest().version;
        if (realUpdate) {
            console.log("real version changed");
        }
        
        var previousVersionObj = parseVersionString(details.previousVersion)
        var currentVersionObj = parseVersionString(chrome.runtime.getManifest().version);

        if (previousVersionObj.major != currentVersionObj.major || previousVersionObj.minor != currentVersionObj.minor) {
            var options = {
                    type: "basic",
                    title: chrome.i18n.getMessage("extensionUpdated"),
                    message: "Webmail Ad Blocker " + chrome.runtime.getManifest().version,
                    iconUrl: "/images/icon64.png",
                    buttons: [{title: chrome.i18n.getMessage("seeUpdates")}]
            }

            if (DetectClient.isFirefox()) {
                options.priority = 2;
            } else {
                if (!DetectClient.isMac()) { // patch for macOS Catalina not working with requireinteraction
                    options.requireInteraction = true;
                }
            }

            chrome.notifications.create("extensionUpdate", options, function(notificationId) {
                if (chrome.runtime.lastError) {
                    console.error(chrome.runtime.lastError.message);
                }
            });
        }
    }
});

if (chrome.runtime.setUninstallURL) {
	chrome.runtime.setUninstallURL("https://jasonsavard.com/uninstalled?app=wab");
}