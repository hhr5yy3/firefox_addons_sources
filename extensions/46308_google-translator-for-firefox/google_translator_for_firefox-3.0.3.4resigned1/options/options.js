//TODO : is it possible to create a common js?

//preferences handling
function getStorageArea () {
	return (chrome.storage.sync ? chrome.storage.sync : chrome.storage.local);
}

var TranslationMode = Object.freeze ({
	TranslateSelection: 1,
	TranslateFullPage: 2,
	TranslateSelectionIfPossible: 3
});

function saveOptions () {
	var targetLang = document.getElementById ('targetLang').value;
	var translationMode = document.querySelector('input[name = "translationMode"]:checked').value;
	switch (translationMode) {
		case "TranslateSelection":
			translationMode = TranslationMode.TranslateSelection;
			break;
		case "TranslateFullPage":
			translationMode = TranslationMode.TranslateFullPage;
			break;
		case "TranslateSelectionIfPossible":
			translationMode = TranslationMode.TranslateSelectionIfPossible;
			break;
		default:
			console.error ("Unknown translation mode string.", {"translationMode":translationMode});
			break;
	}
	chrome.storage.sync.set ({
		'targetLang' : targetLang,
		'translationMode' : translationMode
	}, function () {
		// Update status to let user know options were saved.
		var status = document.getElementById ('status');
		status.textContent = browser.i18n.getMessage ("optionsPage_optionsSavedStatusText");
		setTimeout (function () {
			status.textContent = '';
		}, 1250);
	});
}

function restoreOptions () {
	getStorageArea ().get ({'targetLang':"undefined"}, function (result) {
		var targetLang = result.targetLang;
		document.getElementById ('targetLang').value = targetLang;
		//console.log ('Option restored: targetLang = ' + targetLang);
	});
	
	getStorageArea ().get ({'translationMode':"undefined"}, function (result) {
		var translationMode = result.translationMode;
		var translationModeString;
		switch (translationMode) {
			case TranslationMode.TranslateSelection:
				translationModeString = "TranslateSelection";
				break;
			case TranslationMode.TranslateFullPage:
				translationModeString = "TranslateFullPage";
				break;
			case TranslationMode.TranslateSelectionIfPossible:
				translationModeString = "TranslateSelectionIfPossible";
				break;
			default:
				console.error ("Unknown translation mode.", {"translationMode":translationMode});
				break;
		}
		document.getElementById (translationModeString).checked = true;
		//console.log ('Option restored: translationMode = ' + translationModeString);
	});
}

function localizeOptionsPage () {
	document.getElementById ("generalSettingsTitle").textContent = browser.i18n.getMessage ("optionsPage_generalSettingsTitle");
	document.getElementById ("languageOfTranslation").textContent = browser.i18n.getMessage ("optionsPage_languageOfTranslation");
	document.getElementById ("whatToTranslateTitle").textContent = browser.i18n.getMessage ("optionsPage_whatToTranslateTitle");
	
	document.getElementById ("translateSelectionLabel").textContent = browser.i18n.getMessage ("optionsPage_translateSelectionLabel");
	document.getElementById ("translatePageLabel").textContent = browser.i18n.getMessage ("optionsPage_translatePageLabel");
	document.getElementById ("translateSelectionIfPossibleLabel").textContent = browser.i18n.getMessage ("optionsPage_translateSelectionIfPossibleLabel");
	
	document.getElementById ("saveButton").textContent = browser.i18n.getMessage ("optionsPage_saveButtonText");
}

function onPageLoaded () {
	restoreOptions ();
	localizeOptionsPage ();
}

document.addEventListener('DOMContentLoaded', onPageLoaded);
document.getElementById ('saveButton').addEventListener ('click', saveOptions);