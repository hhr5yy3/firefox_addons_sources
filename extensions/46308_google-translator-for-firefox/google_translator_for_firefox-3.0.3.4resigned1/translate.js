//TODO: use Promises instead of callback pyramids for cleaner code:
//https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API

//TODO: use let-s instead of var-s, if possible: http://stackoverflow.com/questions/762011/let-keyword-vs-var-keyword

//TODO : is it possible to create a common js?

//preferences handling
function getStorageArea () {
	return (chrome.storage.sync ? chrome.storage.sync : chrome.storage.local);
}

function isValidTargetLangCode (lang) {
	//based on  http://stackoverflow.com/questions/24196067/what-is-the-javascript-equivalent-to-a-c-sharp-hashset and http://stackoverflow.com/questions/1535631/static-variables-in-javascript
	if (typeof isValidTargetLangCode.validLangCodes == 'undefined') {
		isValidTargetLangCode.validLangCodes = {"af":true, "sq":true, "ar":true, "hy":true, "az":true, "eu":true, "be":true, "bn":true, "bs":true, "bg":true, "ca":true, "zh":true, "hr":true, "cs":true, "da":true, "nl":true, "en":true, "eo":true, "et":true, "tl":true, "fi":true, "fr":true, "gl":true, "ka":true, "de":true, "el":true, "gu":true, "ht":true, "ha":true, "iw":true, "hi":true, "hmn":true, "hu":true, "is":true, "ig":true, "id":true, "ga":true, "it":true, "ja":true, "jw":true, "kn":true, "kk":true, "km":true, "ko":true, "lo":true, "la":true, "lv":true, "lt":true, "mk":true, "mg":true, "ms":true, "ml":true, "mt":true, "mi":true, "mr":true, "mn":true, "my":true, "ne":true, "no":true, "fa":true, "pl":true, "pt":true, "pa":true, "ro":true, "ru":true, "sr":true, "st":true, "si":true, "sk":true, "sl":true, "so":true, "es":true, "su":true, "sw":true, "sv":true, "tg":true, "ta":true, "te":true, "th":true, "tr":true, "uk":true, "ur":true, "uz":true, "vi":true, "cy":true, "yi":true, "yo":true, "zu":true};
	}
	return (isValidTargetLangCode.validLangCodes[lang] === true);
}

function isValidTextLength (text) {
	return (text.length > 0 && text.length <= 1100);
}

function getSelection (tab, callback) {
	//TODO: support multiple selection ranges: http://help.dottoro.com/ljxsqnoi.php
	
	chrome.tabs.executeScript (tab.id, {file:'/selectionManager.js'}, function executionDoneCallback () {
		//console.log ("executionDoneCallback Called!");
		//console.log (tab.id);
		chrome.tabs.sendMessage (tab.id, {action:'getSelectedText'}, function responseHandler (response) {
			//console.log ("Got response from content script (getSelectedText)!");
			//console.log (response);
			if (response && response.action === 'getSelectedText') {
				callback (response.selectedText);
			} else {
				console.error ("getSelectedText returned with invalid response", {"response":response});
				callback ("");
			}
		});
	});
}

var TranslationState = Object.freeze ({
	NoTranslationInProgress: 0,
	TranslationIsInProgress: 1
});

function setToolbarIcon (translationState) {
	var iconName = (translationState == TranslationState.NoTranslationInProgress ? "icons/Ticon.png" : "icons/Ticongreen.png");
	chrome.browserAction.setIcon ({path: iconName});
}

var TranslationMode = Object.freeze ({
	TranslateSelection: 1,
	TranslateFullPage: 2,
	TranslateSelectionIfPossible: 3
});

function translationEnded () {
	//console.log ("Translation ended!");
	setToolbarIcon (TranslationState.NoTranslationInProgress);
}

function doTranslation (activeTab, requestedMode) {
	requestedMode = (typeof requestedMode !== 'undefined' ? requestedMode : null);
	//console.log ("Translation requested!");
	//console.log (activeTab);
	getStorageArea ().get ({'translationMode':TranslationMode.TranslateSelectionIfPossible}, function (result) {
		var translationMode = (requestedMode ? requestedMode : result.translationMode); //can override with requestedMode
		setToolbarIcon (TranslationState.TranslationIsInProgress);
		switch (translationMode) {
			case TranslationMode.TranslateSelection:
				doSelectionTranslation (activeTab, translationEnded);
				break;
			case TranslationMode.TranslateFullPage:
				doPageTranslation (activeTab, translationEnded);
				break;
			case TranslationMode.TranslateSelectionIfPossible:
				doSelectionTranslationIfPossible (activeTab, translationEnded);
				break;
			default:
				console.error ("Unknown translation mode!", {"translationMode":translationMode});
				translationEnded ();
				break;
		}
	});
}

function getTargetLanguageCode (callback) {
	var defaultTargetLang = "en";
	getStorageArea ().get ({'targetLang':"undefined"}, function (result) {
		var targetLang = result.targetLang;
		if (targetLang === "undefined" || !isValidTargetLangCode (targetLang)) {
			chrome.i18n.getAcceptLanguages (function (languages) {
				if (languages.length > 0) {
					targetLang = languages[0].substr (0,2);
					if (isValidTargetLangCode (targetLang)) {
						if (targetLang == "zh") {
							targetLang = "zh-CN"; //TODO: isn't there a nicer solution?
						}
					} else {
						targetLang = defaultTargetLang;
					}
				} else {
					targetLang = defaultTargetLang;
				}
				var gotFromStorageArea = false;
				callback (targetLang, gotFromStorageArea);
			});
		} else {
			var gotFromStorageArea = true;
			callback (targetLang, gotFromStorageArea);
		}
	});
}

function translateSelection (tab, selectedText, finishedCallback) {
	function getTranslationFromHTTPResponse (responseText) {
		var translation = "";
		var output = responseText;
		if (responseText.length) {
			var responseDocument = document.implementation.createHTMLDocument ("translation");
			var cleanDOM = DOMPurify.sanitize (responseText, {RETURN_DOM_FRAGMENT: true, RETURN_DOM_IMPORT: true});
			responseDocument.body.appendChild (cleanDOM);
			
			var resultBox = responseDocument.getElementById ("result_box");
			if (resultBox) {
				//console.log (resultBox.textContent);
				translation = resultBox.textContent; //better than innerHTML because this strips unnecessary HTML tags automatically, and handles special chars (&, <, >, ", ') too
			} else {
				console.error ("Response from Google doesn't contain a 'result_box' element.");
			}
		}
		return translation.trim ();
	}
	
	function translationReceived () {
		//console.log ('Translation received from Google!');
		if (httpRequest.responseText.length) {
			var translation = getTranslationFromHTTPResponse (httpRequest.responseText);
			var preSpace = (selectedText[0] == " " ? " " : ""); //put a space before the translated text if the selected text had a space at the beginning
			var endSpace = (selectedText[selectedText.length - 1] == " " ? " " : ""); //put a space after the translated text if the selected text had a space at the end
			var translationToDisplay = preSpace + translation + endSpace;
			//console.log (translationToDisplay);
			
			chrome.tabs.executeScript (tab.id, {file:'/selectionManager.js'}, function executionDoneCallback () {
				//console.log ("executionDoneCallback Called!");
				//console.log (tab.id);
				chrome.tabs.sendMessage (tab.id, {action:'replaceSelectedText', newText:translationToDisplay}, function responseHandler (response) {
					//console.log ("Got response from content script (replaceSelectedText)!");
					//console.log (response);
					if (response && response.action === 'replaceSelectedText') {
						console.assert (response.succeeded, {"response.succeeded":response.succeeded});
						finishedCallback ();
					} else {
						console.error ("replaceSelectedText returned with invalid response", {"response":response});
						finishedCallback ();
					}
				});
			});
		} else {
			console.error ("Response from Google is not valid.", {"httpRequest":httpRequest});
			finishedCallback ();
		}
	}
	
	function translationFailed () {
		console.error ("Translation failed.");
		browser.notifications.create ("translationFailedError", {
			"type": "basic",
			"title": browser.runtime.getManifest ().name,
			"message": browser.i18n.getMessage ("errorMessageIfTranslationFailed"),
			"iconUrl": "icons/icon-48.png"
		}, function notificationCreationDoneCallback () {
			finishedCallback ();
		});
	}
	
	if (!isValidTextLength (selectedText)) {
		//console.log ('Cannot translate text this long!');
		browser.notifications.create ("notValidTextLengthWarning", {
			"type": "basic",
			"title": browser.runtime.getManifest ().name,
			"message": browser.i18n.getMessage ("errorMessageOnInvalidTextLength"),
			"iconUrl": "icons/icon-48.png"
		}, function notificationCreationDoneCallback () {
			finishedCallback ();
		});
		return;
	}
	
	// On 29 November, 2018 Google Translate page changed, so this method doesn't work...
	
	//console.log ("Translating selection: " + selectedText);
	//var httpRequest = new XMLHttpRequest();
	//getTargetLanguageCode (function (targetLang) {
	//	var baseUrl = "http://translate.google.com/translate_t";
	//	var urlParams = "text=" + encodeURIComponent (selectedText) + "&hl=" + targetLang + "&langpair=auto|" + targetLang + "&tbb=1";
	//	var fullUrl = baseUrl + "?" + urlParams;
	//	//console.log (fullUrl);
	//	
	//	httpRequest.open ("GET", fullUrl, true);
	//	httpRequest.onload = translationReceived;
	//	httpRequest.onerror = translationFailed;
	//	httpRequest.onabort = translationFailed;
	//	httpRequest.send (null);
	//});
	
	// ... to keep at least some of the functionality, selected text translation now opens a new tab
	getTargetLanguageCode (function (targetLang) {
		var baseUrl = "http://translate.google.com/translate_t";
		var urlParams = "text=" + encodeURIComponent (selectedText) + "&hl=" + targetLang + "&langpair=auto|" + targetLang + "&tbb=1";
		var fullUrl = baseUrl + "?" + urlParams;
		//console.log (fullUrl);
		chrome.tabs.create ({
			"url": fullUrl
		}, function (tab) {
			finishedCallback ();
		});
	});
}

function doSelectionTranslation (tab, finishedCallback) {
	//console.log ("Selection translation...");
	getSelection (tab, function (selectedText) {
		translateSelection (tab, selectedText, finishedCallback);
	});
}

function doPageTranslation (tab, finishedCallback) {
	//console.log ("Page translation...");
	getTargetLanguageCode (function (targetLang) {
		var translatedPageUrl = "http://translate.google.com/translate?hl=" + targetLang + "&sl=auto&tl=" + targetLang + "&u=" + encodeURIComponent (tab.url);
		//console.log (translatedPageUrl);
		chrome.tabs.create ({
			"url": translatedPageUrl
		}, function (tab) {
			finishedCallback ();
		});
	});
}

function doSelectionTranslationIfPossible (tab, finishedCallback) {
	//console.log ("Selection translation if possible...");
	getSelection (tab, function (selectedText) {
		//console.log ("getSelection callback in dSTIP: " + selectedText);
		if (isValidTextLength (selectedText)) {
			translateSelection (tab, selectedText, finishedCallback);
		} else {
			doPageTranslation (tab, finishedCallback);
		}
	});
}

// --------- CREATE CONTEXT MENU ITEMS ---------

chrome.contextMenus.create({
	id: "open-options",
	title: browser.i18n.getMessage ("contextMenuOpenOptions"),
	contexts: ["browser_action"]
});

chrome.contextMenus.create({
	id: "translate-selection",
	title: browser.i18n.getMessage ("contextMenuTranslateSelected"),
	contexts: ["selection"] //TODO : show on browser_action only if there is selection (or grey it out)
});

chrome.contextMenus.create({
	id: "translate-page",
	title: browser.i18n.getMessage ("contextMenuTranslatePage"),
	contexts: ["all"] //TODO : should not be shown when there is selection
});

// --------- HANDLE EVENTS ---------

chrome.browserAction.onClicked.addListener (doTranslation);

chrome.contextMenus.onClicked.addListener (function (info, tab) {
	switch (info.menuItemId) {
		case "open-options":
			browser.runtime.openOptionsPage();
			break;
		case "translate-selection":
			doTranslation (tab, TranslationMode.TranslateSelection);
			break;
		case "translate-page":
			doTranslation (tab, TranslationMode.TranslateFullPage);
			break;
		default:
			console.error ("Unknown context menu id: " + info.menuItemId, {"info":info});
			break;
	}
});

// --------- FIRST START ---------

//TODO : better way?
//TODO : move to function
//TODO : try to move 'targetLang' string as a constant to a common.js
getTargetLanguageCode (function (targetLang, gotFromStorageArea) {
	if (!gotFromStorageArea) {
		getStorageArea ().set ({'targetLang':targetLang}, function () {
			//console.log ('Default TargetLang Set: ' + targetLang);
		});
	} else {
		//console.log ('Default Target Lang Got: ' + targetLang);
	}
});

getStorageArea ().get ({'translationMode':"undefined"}, function (result) {
	var translationMode = result.translationMode;
	if (translationMode === "undefined") {
		getStorageArea ().set ({'translationMode':TranslationMode.TranslateSelectionIfPossible}, function () {
			//console.log ('Translation Mode Set: ' + TranslationMode.TranslateSelectionIfPossible);
		});
	} else {
		//console.log ('Translation Mode Got: ' + translationMode);
	}
});

getStorageArea ().get ({'lastMainVersion':"undefined"}, function (result) {
	var manifest = browser.runtime.getManifest ();
	var currentMainVersion = Math.floor (parseFloat (manifest.version));
	if (result.lastMainVersion === "undefined" || result.lastMainVersion < currentMainVersion) {
		getStorageArea ().set ({'lastMainVersion' : currentMainVersion}, function () {
			//console.log ('Last Main Version Set: ' + currentMainVersion);
			chrome.tabs.create ({
				"url": manifest.homepage_url + "/p/whats-new.html"
			}, function (tab) {
				//console.log ('Add-on webpage opened after big update.');
			});
		});
	} else {
		//console.log ('Last Main Version Got: ' + result.lastMainVersion);
	}
});