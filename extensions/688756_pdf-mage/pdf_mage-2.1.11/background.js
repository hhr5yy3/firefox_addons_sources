chrome.runtime.onInstalled.addListener(async function (details) {
    if (!(await getAppSetting("proKey")) && (details.reason == "install" || details.reason == "update")) {
        chrome.tabs.create({
            url: "https://pdfmage.org/thank-you-for-installing?source=firefoxExtension&previousVersion=" + details.previousVersion
        });
    }
});

chrome.runtime.setUninstallURL("https://pdfmage.org/home/uninstalled");

browser.contextMenus.create({
    id: "save-as-pdf",
    title: "Save page as PDF",
    contexts: ["all"]
}, function () { });

browser.contextMenus.create({
    id: "save-element-as-pdf",
    title: "Save part of page as PDF",
    contexts: ["all"]
}, function () { });

browser.contextMenus.onClicked.addListener(function (info, tab) {
    if (info.menuItemId == "save-as-pdf") {
        browser.tabs.executeScript(null, { file: "injected/getPagesSource.js" }, function () { });
    } else if (info.menuItemId == "save-element-as-pdf") {
        chrome.tabs.executeScript(tab.id, { file: 'injected/jquery.js' }, function () {
            chrome.tabs.executeScript(tab.id, { file: 'injected/saveElementGadget.js' });
        });
    }
});

chrome.runtime.onMessage.addListener(async function (request, sender) {
	if (request.action == "getSource") {
		log("Got page source from " + request.url + "; length: " + (request.source ? request.source.length : '0'));
        displayInProgress(request.url);
        try {
            await sendHtmlForConversion(request.url, request.source, request.pageWidth, sender.tab.windowId);
        } catch (e) {
            displayError("Server error, please try again later", e.message);
        }
    } else if (request.action == "startSaveElementAsPdf") {
        chrome.tabs.executeScript(null, { file: "injected/getPagesSource.js" }, function () { });
    } else if (request.action == "onError") {
		displayError(request.errorMessage, request.errorMessage);
	}
});

async function sendHtmlForConversion(targetUrl, html, pageWidth, windowId) {
    var webRequest = await buildRequest(targetUrl, html, pageWidth);
    var response = await fetch(webRequest);
    log("Sent request to " + webRequest.url);
    var responseText = response.status == 401
        ? '{"Success" : false, "Error": "Invalid PDF Mage Pro key" }'
        : await response.text();
    if (!responseText) {
        displayError("Server error, please try again later", "Receive empty response");
        return;
    }
    try {
        var result = JSON.parse(responseText);
        if (result.Success) {
            var dlUrl = result.Data.DownloadUrl;
            if (!(/^https?:/.test(dlUrl))) {
                displayError("Server error, please try again later", "Received invalid DownloadUrl: " + dlUrl);
                return;
            }

            displayDone();
            await showOrDownloadResult(dlUrl, windowId);
        }
        else {
            displayError("Server error: " + result.Error, "Request failed. Response: " + responseText);
        }
    }
    catch (e) {
        displayError("Unknown error, please try again later", "Error parsing response. Response: " + responseText);
    }
}

async function buildRequest(targetUrl, html, pageWidth) {
    var isProMode = await getAppSetting("proKey");
    var payload =
    {
        html: html,
        targetUrl: targetUrl,
        method: "1",
        pageOrientation: await getAppSetting("pageOrientation"),
        singlePage: await getAppSetting("singlePage"),
        paperSize: await getAppSetting("paperSize"),
        hideImages: await getAppSetting("hideImages"),
        avoidImageBreak: await getAppSetting("avoidImageBreak"),
        disableLinks: await getAppSetting("disableLinks"),
        displayUrlInFooter: await getAppSetting("displayUrlInFooter"),
        displayDateInFooter: await getAppSetting("displayDateInFooter"),
        preferPrintFriendlyVersion: await getAppSetting("preferPrintFriendlyVersion"),
        freeModeLimitation: await getAppSetting("freeModeLimitation"),
        dateTime: getDate()
    };

    if (!(await getAppSetting("pageWidth")) || (await getAppSetting("pageWidth") == "SameAsBrowserWindow"))
        payload["pageWidth"] = pageWidth;
    else if (await getAppSetting("pageWidth") == "Custom")
        payload["pageWidth"] = await getAppSetting("customPageWidth");
    else
        payload["pageWidth"] = await getAppSetting("pageWidth");

    if ((await getAppSetting("protectWithPassword")) == "True")
        payload["pdfPassword"] = await getAppSetting("pdfPassword");

    if ((await getAppSetting("customFileName")) == "True")
        payload["fileNameMask"] = await getAppSetting("fileNameMask");

    if ((await getAppSetting("customMargins")) == "True") {
        payload["topMargin"] = await getAppSetting("topMargin");
        payload["bottomMargin"] = await getAppSetting("bottomMargin");
        payload["leftMargin"] = await getAppSetting("leftMargin");
        payload["rightMargin"] = await getAppSetting("rightMargin");
    }

    var requestSettings = {
        method: 'POST',
        headers: {
            'Content-Type': ' application/json',
            'X-Api-Key': await getAppSetting("proKey")
        },
        body: JSON.stringify(payload)
    };
    var apiUrl = "https://pdfmage.org/api/process";
    if (isProMode) {
        apiUrl = "https://pdfmage.org/api/v2/process";
    }

    return new Request(apiUrl, requestSettings);
}

async function showOrDownloadResult(dlUrl, windowId) {
    var pdfReadyAction = await getAppSetting("pdfReadyAction");
    switch (pdfReadyAction) {
        case "Download":
            await browser.downloads.download({
                url: dlUrl,
                conflictAction: 'uniquify'
            });
            break;
        case "AskWhereToSave":
            await browser.downloads.download({
                url: dlUrl,
                conflictAction: 'uniquify',
                saveAs: true
            });
            break;
        case "Open":
        default:
            chrome.tabs.create({
                url: dlUrl,
                windowId: windowId,
            });
            break;
    }
}

async function getAppSetting(key) {
    var settingsObject = await browser.storage.local.get();
    if (settingsObject && settingsObject[key])
        return settingsObject[key];
    else
        return localStorage[key];
}

function log(text) {
	if (text) {
		var bg = chrome.extension.getBackgroundPage();
		if (bg)
			bg.console.log(getDate() + " " + text);
	}
}

function displayError(errorStatus, logText) {	
	isInProgress = false;
	if (errorStatus && errorStatus.indexOf("<all_urls>") !== -1)
		errorStatus = "Convertion of pages from this website is currently not supported";
	chrome.browserAction.setTitle({ title: "Error saving page as PDF:\n" + errorStatus });
	chrome.browserAction.setBadgeBackgroundColor({ color: [177, 0, 19, 230] });
	chrome.browserAction.setBadgeText({ text: "!" });

	chrome.runtime.sendMessage({
		action: "closePopup",
	});

	log(logText);
}

isInProgress = false;

function displayInProgress(url) {
	isInProgress = true;
	chrome.browserAction.setTitle({ title: "Saving page as PDF:\n" + url });
	chrome.browserAction.setBadgeBackgroundColor({ color: [190, 190, 190, 230] });

	var timeout = function (newText) {
		if (!isInProgress)
			return;
		chrome.browserAction.setBadgeText({ text: newText });

		chrome.browserAction.getBadgeText({}, function (result) {
			var nextText = '';
			if (result == '...')
				nextText = '.';
			else if (result == '..')
				nextText = '...';
			else if (result == '.')
				nextText = '..';

			if (nextText)
				setTimeout(function () { timeout(nextText) }, 1000);
		});
	};
	timeout('...');
}

function displayDone() {
	isInProgress = false;
	chrome.browserAction.setTitle({ title: "Click to save page as PDF" });
	chrome.browserAction.setBadgeText({ text: '' });

	chrome.runtime.sendMessage({
		action: "closePopup",
	});
}

function getDate() {

	var d1 = new Date();

	var curr_year = d1.getFullYear();

	var curr_month = d1.getMonth() + 1; //Months are zero based
	if (curr_month < 10)
		curr_month = "0" + curr_month;

	var curr_date = d1.getDate();
	if (curr_date < 10)
		curr_date = "0" + curr_date;

	var curr_hour = d1.getHours();
	if (curr_hour < 10)
		curr_hour = "0" + curr_hour;

	var curr_min = d1.getMinutes();
	if (curr_min < 10)
		curr_min = "0" + curr_min;

	var curr_sec = d1.getSeconds();
	if (curr_sec < 10)
		curr_sec = "0" + curr_sec;

	var newtimestamp = curr_year + "-" + curr_month + "-" + curr_date + " " + curr_hour + ":" + curr_min + ":" + curr_sec;

	return newtimestamp;
}

function initLocalStorage() {
	if (!localStorage["pageWidth"])
		localStorage["pageWidth"] = "SameAsBrowserWindow";

	if (!localStorage["pageOrientation"])
		localStorage["pageOrientation"] = "Portrait";

	if (localStorage["singlePage"] == undefined)
		localStorage["singlePage"] = "False";

}

initLocalStorage();