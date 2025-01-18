window.onload = function () {
	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		var storageData = chrome.storage.local.get(null, function (result) {
			chrome.tabs.sendMessage(tabs[0].id, {
				action: 'COUNT_ELEMENTS', data: result
			}, function (response) {
				if (response) {
					if (response.elementsCount >= 1) {
						document.getElementById("fillAllFields").disabled = false;
					} else {
						document.getElementById("fillAllFields").disabled = true;
					}
				} else {
					document.getElementById("fillAllFields").disabled = true;
				}
			});
		});
	});
};

function saveMainOptions() {
	var settingsForm = document.getElementById("testDataGeneratorSettingsForm");

	chrome.storage.local.set({
		fillType: settingsForm.elements.fillType.value,
		clipboard: settingsForm.elements.clipboard.value,
		typeMethod: settingsForm.elements.typeMethod.value,
		autofillType: settingsForm.elements.autofillType.value,
		matchType: settingsForm.elements.matchType.value
	});

	return true;
}

function restoreOptions() {
	var gettingItem = chrome.storage.local.get(null, function (result) {
		fillForm(result);
	});

	function onError(error) {
		console.log('Error: ${error}');
	}
}


function fillForm(result) {
	var settingsForm = document.getElementById("testDataGeneratorSettingsForm");

	settingsForm.elements.fillType.value = result.fillType || "new";
	settingsForm.elements.clipboard.value = result.clipboard || "no";
	settingsForm.elements.typeMethod.value = result.typeMethod || "keys";
	settingsForm.elements.autofillType.value = result.autofillType || "generated";
	settingsForm.elements.matchType.value = result.matchType || "equals";

	var keys = {
		17: "CTRL",
		18: "L-ALT"
	};

	document.getElementById('autofillForm').innerHTML = keys[result.autofillFormMainKey || "18"] + " + " + String.fromCharCode(result.autofillFormAdditionalKey || "65");
	document.getElementById('autofillField').innerHTML = keys[result.autofillFieldMainKey || "18"] + " + " + String.fromCharCode(result.autofillFieldAdditionalKey || "83");
	document.getElementById('resetForm').innerHTML = keys[result.resetFormMainKey || "18"] + " + " + String.fromCharCode(result.resetFormAdditionalKey || "82");
	//----------------------
	disableEnableFields();

	saveMainOptions();

	createDB(function (event) {
		if (event.created) {
			saveDefaultProjectToDB(function () {
				saveActiveProject(1);
				document.getElementById("project").innerHTML = "Projekt";
			});
		} else {
			if (event.status) {
				getProjectFromDB(result.activeProject, function (project) {
					if (project.name != null) {
						if (project.name.length > 16) {
							document.getElementById("project").innerHTML = project.name.substring(0, 16) + "...";
						} else {
							document.getElementById("project").innerHTML = project.name;
						}
						document.getElementById("project").title = project.name;
					} else {
						document.getElementById("project").innerHTML = "Projekt";
						document.getElementById("changeProjectLink").disabled = true;
						document.getElementById("changeProjectLink").title = "Funkcjonalność jest niedostępna z powodu nieodpowiednich ustawień przeglądarki.";
						document.getElementById("changeProjectLink").className = "notactive";
						document.getElementById('changeProjectLink').removeEventListener('click', openOptionsPage);
					}
				});
			} else {
				document.getElementById("project").innerHTML = "Projekt";
				document.getElementById("changeProjectLink").disabled = true;
				document.getElementById("changeProjectLink").title = "Funkcjonalność jest niedostępna z powodu nieodpowiednich ustawień przeglądarki.";
				document.getElementById("changeProjectLink").className = "notactive";
				document.getElementById('changeProjectLink').removeEventListener('click', openOptionsPage);
			}
		}
	});
}

function saveActiveProject(value) {
	updateActiveProjectDB(value, function () {
		chrome.storage.local.set({
			activeProject: value
		});
	});

	return true;
}

function saveDefaultProjectToDB(fn) {
	getAllDataFromStorage(function (result) {
		writeProjectToDB("Projekt", result, function (result) {
			fn(result);
		});
	});
}

function getAllDataFromStorage(fn) {
	chrome.storage.local.get(null, function (result) {
		fn(result);
	});
}

// --LISTENERS--
// ----MAIN----
document.addEventListener("DOMContentLoaded", restoreOptions);

if (document.getElementById("settings")) {
	document.getElementById("settings").addEventListener("click", openOptionsPage);
}

if (document.getElementById("changeProjectLink")) {
	document.getElementById("changeProjectLink").addEventListener("click", openOptionsPage);
}

if (document.getElementById("fillAllFields")) {
	document.getElementById("fillAllFields").addEventListener("click", fillAllFields);
}

// ----DISABLE / ENABLE FIELD----
var typeMethodRadioButtons = document.getElementsByName('typeMethod');
for (var i = 0; i < typeMethodRadioButtons.length; i++) {
	typeMethodRadioButtons[i].addEventListener("change", saveTestDataGeneratorOptions);
}

var fillTypeRadioButtons = document.getElementsByName('fillType');
for (var i = 0; i < fillTypeRadioButtons.length; i++) {
	fillTypeRadioButtons[i].addEventListener("change", saveTestDataGeneratorOptions);
}

var clipboardRadioButtons = document.getElementsByName('clipboard');
for (var i = 0; i < clipboardRadioButtons.length; i++) {
	clipboardRadioButtons[i].addEventListener("change", saveTestDataGeneratorOptions);
}

var autofillTypeRadioButtons = document.getElementsByName('autofillType');
for (var i = 0; i < autofillTypeRadioButtons.length; i++) {
	autofillTypeRadioButtons[i].addEventListener("change", saveTestDataGeneratorOptions);
}

var matchTypeRadioButtons = document.getElementsByName('matchType');
for (var i = 0; i < matchTypeRadioButtons.length; i++) {
	matchTypeRadioButtons[i].addEventListener("change", saveTestDataGeneratorOptions);
}

function disableEnableFields() {
	var settingsForm = document.getElementById("testDataGeneratorSettingsForm");

	var fillTypeRadios = settingsForm.elements.fillType;
	if (settingsForm.elements.typeMethod.value == "value") {
		fillTypeRadios.value = "new";
		fillTypeRadios[1].disabled = true;
	} else {
		fillTypeRadios[1].disabled = false;
	}

	var clipboardRadios = settingsForm.elements.clipboard;
	if (settingsForm.elements.fillType.value == "add") {
		clipboardRadios.value = "no";
		clipboardRadios[0].disabled = true;
	} else {
		clipboardRadios[0].disabled = false;
	}
}

// --FORM SERVICE--END

function saveTestDataGeneratorOptions(e) {
	e.preventDefault();
	disableEnableFields();
	saveMainOptions();
}

function openOptionsPage() {
	var opening = chrome.runtime.openOptionsPage( function() {
		window.close();
	});
}

function fillAllFields() {
	var tabs = chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
		getCurTab(tabs);
	});
	//tabs.then(getCurTab, onError);
}

function getCurTab(tab) {
	var curTab = chrome.tabs.get(tab[0].id, function (tab) {
		updTab(tab);
	});
    //curTab.then(updTab, onError);
}

function updTab(tab) {
	window.close();
	chrome.tabs.sendMessage(tab.id, { action: "FILL_ALL_FIELDS" }, function (response) {
		//log(response.result);
	});
}

function onError(error) {
	console.log("Error: " + error);
}