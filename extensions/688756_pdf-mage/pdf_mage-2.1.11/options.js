
function initPage() {
    initSelect("pageOrientation", "pageOrientation");
    initSelect("singlePage", "singlePage");
    initSelect("pdfReadyAction", "pdfReadyAction");
    initSelect("pageWidth", "pageWidth");
    initTextBox("customPageWidth", "customPageWidth");
    initTextBlockVisibility("pageWidth", "customPageWidthBlock", "Custom");
    initSelect("freeModeLimitation", "freeModeLimitation");
    initSelect("paperSize", "paperSize");
    initSelect("hideImages", "hideImages");
    initSelect("avoidImageBreak", "avoidImageBreak");
    initSelect("disableLinks", "disableLinks");
    initSelect("displayUrlInFooter", "displayUrlInFooter");
    initSelect("displayDateInFooter", "displayDateInFooter");
    initSelect("preferPrintFriendlyVersion", "preferPrintFriendlyVersion");
    initSelect("protectWithPassword", "protectWithPassword");
    initTextBox("pdfPassword", "pdfPassword");
    initTextBlockVisibility("protectWithPassword", "pdfPasswordBlock", "True");
    initSelect("customMargins", "customMargins");
    initTextBox("topMargin", "topMargin");
    initTextBox("bottomMargin", "bottomMargin");
    initTextBox("leftMargin", "leftMargin");
    initTextBox("rightMargin", "rightMargin");
    initTextBlockVisibility("customMargins", "customMarginsBlock", "True");
    initSelect("customFileName", "customFileName");
    initTextBox("fileNameMask", "fileNameMask");
    initTextBlockVisibility("customFileName", "customFileNameBlock", "True");

    initTextBox("proKey", "proKey");
    
    setupProBlocks();
}

function initTextBox(textBoxId, loalStorageKey) {

    getAppSetting(loalStorageKey, function (currValue) {
        var textBox = document.getElementById(textBoxId);
        if (textBox)
            textBox.value = currValue;
    });
}

function initSelect(selectId, loalStorageKey) {

    getAppSetting(loalStorageKey, function (currValue) {
        var select = document.getElementById(selectId);
        for (var i = 0; i < select.children.length; i++) {
            var child = select.children[i];
            if (child.value == currValue) {
                child.selected = "true";
                break;
            }
        }
    });
}

function initTextBlockVisibility(selectId, textBlockId, valueToDisplay) {

	var select = document.getElementById(selectId);
	var textBox = document.getElementById(textBlockId);

	var onChange = function () {
		for (var i = 0; i < select.children.length; i++) {
			var child = select.children[i];
			if (child.value == valueToDisplay && child.selected) {
				textBox.style.display = 'block';
				return;
			}
		}

		textBox.style.display = 'none';
	};

	select.onchange = onChange;
	onChange();
}

function saveSelectedOption(selectId, loalStorageKey) {
    var select = document.getElementById(selectId);
    if (select) {
        setAppSetting(loalStorageKey, select.value);
    }
}

function getValue(elementId) {
	var element = document.getElementById(elementId);
	if (element)
		return element.value;
	return null;
}

function saveOptions() {
	if (getValue("protectWithPassword") == "True" && !getValue("pdfPassword")) {
		showMessage("Error saving changes! Please specify PDF password.");
		return;
	}

	if (getValue("customFileName") == "True") {
	    var fileNameMask = getValue("fileNameMask");
	    if (!fileNameMask || fileNameMask.length > 500) {
	        showMessage("Error saving changes! File name mask should be between 1 and 500 characters.");
	        return;
	    }

	    if (['"', '|', ':', '*', '?', '\\', '/', ',', '%'].some(function (c) { return fileNameMask.indexOf(c) > -1; })) {
	        showMessage("Error saving changes! File name mask contains invalid characters.");
	        return;
	    }
	}

	if (getValue("pageWidth") == "Custom") {
	    var customWidthValue = getValue("customPageWidth");
	    if (!customWidthValue || isNaN(customWidthValue) || isNaN(parseInt(customWidthValue)) || parseInt(customWidthValue) < 0) {
	        showMessage("Error saving changes! Invalid web page width.");
	        return;
	    }
	}

	var margins = ["top", "bottom", "left", "right"];
	for (var i = 0; i < margins.length; i++) {
		var marginName = margins[i];
		var marginElement = document.getElementById(marginName + "Margin");
		var marginValue = marginElement.value;
		if (!marginValue)
			marginValue = "0";
		if (isNaN(marginValue) || isNaN(parseInt(marginValue)) || parseInt(marginValue) < 0) {
			showMessage("Error saving changes! Inavlid " + marginName + " margin value.");
			return;
		}

		marginElement.value = parseInt(marginValue);
	}

    saveSelectedOption("pageOrientation", "pageOrientation");
    saveSelectedOption("singlePage", "singlePage");
    saveSelectedOption("pdfReadyAction", "pdfReadyAction");
    saveSelectedOption("pageWidth", "pageWidth");
    saveSelectedOption("customPageWidth", "customPageWidth");
    saveSelectedOption("freeModeLimitation", "freeModeLimitation");
    saveSelectedOption("paperSize", "paperSize");
    saveSelectedOption("hideImages", "hideImages");
    saveSelectedOption("avoidImageBreak", "avoidImageBreak");
    saveSelectedOption("disableLinks", "disableLinks");
    saveSelectedOption("displayUrlInFooter", "displayUrlInFooter");
    saveSelectedOption("displayDateInFooter", "displayDateInFooter");
    saveSelectedOption("preferPrintFriendlyVersion", "preferPrintFriendlyVersion");
    saveSelectedOption("pdfPassword", "pdfPassword");
    saveSelectedOption("protectWithPassword", "protectWithPassword");
    saveSelectedOption("customMargins", "customMargins");
    saveSelectedOption("topMargin", "topMargin");
    saveSelectedOption("bottomMargin", "bottomMargin");
    saveSelectedOption("leftMargin", "leftMargin");
    saveSelectedOption("rightMargin", "rightMargin");
    saveSelectedOption("fileNameMask", "fileNameMask");
    saveSelectedOption("customFileName", "customFileName");

    showMessage("Changes saved! Your settings will be applied next time you save a page as PDF.");
}

function setupProBlocks() {
    var displayProBlocks = function () {
        document.querySelector('#freeOptions').style.display = 'none';
        document.querySelector('#proText').style.display = 'none';
        document.querySelector('#proOptions').style.display = 'block';
        displayProKeyInfo();
    };
    var hideProBlocks = function () {
        document.querySelector('#freeOptions').style.display = 'block';
        document.querySelector('#proText').style.display = 'block';
        document.querySelector('#proOptions').style.display = 'none';
        document.querySelector('#proKeyInfo').style.display = 'none';
        document.querySelector('#proKeyError').style.display = 'none';
    };

    hideProBlocks();
    getAppSetting("proKey", function (settings) { displayProBlocks() });
}

function saveProKey() {	
	
	var key = document.getElementById("proKey").value.trim();
    if (!key) {
        setAppSetting("proKey", "");
		setupProBlocks();
		return;
	}

	var proKeyApplyButton = document.getElementById("proKeyApply");
	proKeyApplyButton.innerHTML = "Checking...";

	var displayError = function (title, message) {
	    showMessage(title + ": " + message);
		proKeyApplyButton.innerHTML = "Apply";
	};

	var displayDone = function () {
	    showMessage("Key saved! Enjoy your PDF Mage Pro!");
		saveSelectedOption("proKey", "proKey");
		setupProBlocks();
		proKeyApplyButton.innerHTML = "Apply";
	};

	var requestSettings = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ apiKey: key })
	};
	var webRequest = new Request("https://pdfmage.org/api/validateApiKey", requestSettings);

	fetch(webRequest).then(function (response) {
		return response.text();
	}).then(function (responseText) {
		if (!responseText) {
			displayError("Server error, please try again later", "Receive empty response");
			return;
		}
		try {
			var result = JSON.parse(responseText);
			if (result.Success) {
				displayDone();
			}
			else {
				displayError("Error validating key", result.Error);
			}
		}
		catch (e) {
			displayError("Unknown error, please try again later", "Error parsing response. Response: " + responseText);
		}
	}, function (e) {
		displayError("Server error, please try again later", e.message);
	});

}

function displayProKeyInfo() {
    document.querySelector('#proKeyInfo').style.display = 'none';
    document.querySelector('#proKeyError').style.display = 'none';
    getAppSetting("proKey", function (proKey) {

        var requestSettings = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ apiKey: proKey })
        };
        var webRequest = new Request("https://pdfmage.org/api/validateApiKey", requestSettings);

        fetch(webRequest).then(function (response) {
            return response.text();
        }).then(function (responseText) {
            try {
                var result = JSON.parse(responseText);
                if (result.Success && result.Data) {
                    document.querySelector('#proKeyValidUntil').innerText = result.Data.ValidUntil || "forever";
                    document.querySelector('#proKeyRemainingUsages').innerText = result.Data.UsagesLeft || "unlimited";
                    document.querySelector('#proKeyLastConvertedPage').innerText = result.Data.LastUrl || "none";
                    document.querySelector('#proKeyInfo').style.display = 'block';
                } else if (!result.Success) {
                    document.querySelector('#proKeyError').style.display = 'block';
                    document.querySelector('#proKeyError').innerText = result.Error || "Error validating your key";
                }
            }
            catch (e) { }
        }, function (e) { });
    });
}

function showMessage(message) {
    document.querySelector('#overlay-message').innerText = message;
    document.getElementById("overlay").style.visibility = "visible";
    window.scrollTo(0, 0);
}

function getAppSetting(key, onSuccess) {
    if (localStorage[key]) {
        onSuccess(localStorage[key]);
        setAppSetting(key, localStorage[key]);
    }
    else {
        browser.storage.local.get().then(function (restoredSettings) {
            if (restoredSettings[key])
                onSuccess(restoredSettings[key]);
        }, function (e) { console.log(e); });
    }
}

function setAppSetting(key, value) {
    localStorage[key] = value;
    var settingsItem = {};
    settingsItem[key] = value;
    browser.storage.local.set(settingsItem);
}

document.addEventListener('DOMContentLoaded', function () {
	document.querySelector('#saveButton').addEventListener('click', saveOptions);
	document.querySelector('#proKeyApply').addEventListener('click', saveProKey);
    document.querySelector('#overlay-message-button').addEventListener('click', function () { document.querySelector('#overlay-message').innerText = ''; document.getElementById("overlay").style.visibility = "hidden" });
    initPage();
});