/**
 * @returns bool
 */
function saveActiveProject() {
	var value = document.getElementById("project").options[document.getElementById("project").selectedIndex].value ? document.getElementById("project").options[document.getElementById("project").selectedIndex].value : 1;

	updateActiveProjectDB(value, function () {
		chrome.storage.local.set({
			activeProject: value
		});
	});
	return true;
}
/**
 * @returns bool
 */
function saveMainOptions() {
	var settingsForm = document.getElementById("testDataGeneratorSettingsForm");

	chrome.storage.local.set({
		fillType: settingsForm.elements.fillType.value,
		clipboard: settingsForm.elements.clipboard.value,
		typeMethod: settingsForm.elements.typeMethod.value,
		autofillType: settingsForm.elements.autofillType.value,
		matchType: settingsForm.elements.matchType.value,
		autofillFormMainKey: document.getElementById('autofillFormMainKey').value,
		autofillFormAdditionalKey: document.getElementById('autofillFormAdditionalKey').value,
		autofillFieldMainKey: document.getElementById('autofillFieldMainKey').value,
		autofillFieldAdditionalKey: document.getElementById('autofillFieldAdditionalKey').value,
		resetFormMainKey: document.getElementById('resetFormMainKey').value,
		resetFormAdditionalKey: document.getElementById('resetFormAdditionalKey').value
	});
	return true;
}
/**
 * @returns bool
 */
function saveNipOptions() {

	if (defaultSetValidation("Nip")) {
		document.getElementById("definedNip").value = document.getElementById("definedNip").value.trim();
		document.getElementById("attributesNip").value = document.getElementById("attributesNip").value.trim();

		chrome.storage.local.set({
			menuItemNip: (document.getElementById("menuItemNip").checked ? 1 : 0),
			definedNip: document.getElementById("definedNip").value,
			attributesNip: getAttributesAsString(document.getElementById("attributesNip").value)
		});

		document.getElementById("nipSettings").style.border = "1px solid #cecece";
		return true;
	} else {
		showSettingsDiv("nipSettings");
		document.getElementById("nipSettings").style.border = "1px solid red";
		return false;
	}
}
/**
 * @returns bool
 */
function saveRegonOptions() {
	if (defaultSetValidation("Regon")) {
		document.getElementById("definedRegon").value = document.getElementById("definedRegon").value.trim();
		document.getElementById("attributesRegon").value = document.getElementById("attributesRegon").value.trim();

		chrome.storage.local.set({
			menuItemRegon: (document.getElementById("menuItemRegon").checked ? 1 : 0),
			definedRegon: document.getElementById("definedRegon").value,
			attributesRegon: getAttributesAsString(document.getElementById("attributesRegon").value)
		});
		document.getElementById("regonSettings").style.border = "1px solid #cecece";
		return true;
	} else {
		showSettingsDiv("regonSettings");
		document.getElementById("regonSettings").style.border = "1px solid red";
		return false;
	}
}
/**
 * @returns bool
 */
function savePeselOptions() {
	var parameterizedValidation = parameterizedPeselValidation();
	var peselValidation = defaultSetValidation("Pesel");

	if (parameterizedValidation && peselValidation) {
		var settingsForm = document.getElementById("testDataGeneratorSettingsForm");

		document.getElementById("peselBornDate").value = document.getElementById("peselBornDate").value.trim();
		document.getElementById("definedPesel").value = document.getElementById("definedPesel").value.trim();
		document.getElementById("attributesPesel").value = document.getElementById("attributesPesel").value.trim();

		chrome.storage.local.set({
			menuItemPesel: (document.getElementById("menuItemPesel").checked ? 1 : 0),
			definedPesel: document.getElementById("definedPesel").value,
			attributesPesel: getAttributesAsString(document.getElementById("attributesPesel").value),
			peselGenderType: settingsForm.elements.peselGenderType.value,
			peselDateType: settingsForm.elements.peselDateType.value,
			peselBornDate: document.getElementById("peselBornDate").value,
			peselBornStartDate: document.getElementById("peselBornStartDate").value,
			peselBornEndDate: document.getElementById("peselBornEndDate").value
		});
		document.getElementById("peselSettings").style.border = "1px solid #cecece";
		return true;
	} else {
		showSettingsDiv("peselSettings");
		document.getElementById("peselSettings").style.border = "1px solid red";
		return false;
	}
}
/**
 * @returns bool
 */
function saveIdentityCardOptions() {
	if (defaultSetValidation("IdentityCard")) {
		document.getElementById("definedIdentityCard").value = document.getElementById("definedIdentityCard").value.trim();
		document.getElementById("attributesIdentityCard").value = document.getElementById("attributesIdentityCard").value.trim();

		chrome.storage.local.set({
			menuItemIdentityCard: (document.getElementById("menuItemIdentityCard").checked ? 1 : 0),
			definedIdentityCard: document.getElementById("definedIdentityCard").value,
			attributesIdentityCard: getAttributesAsString(document.getElementById("attributesIdentityCard").value)
		});
		document.getElementById("identityCardSettings").style.border = "1px solid #cecece";
		return true;
	} else {
		showSettingsDiv("identityCardSettings");
		document.getElementById("identityCardSettings").style.border = "1px solid red";
		return false;
	}
}
/**
 * @returns bool
 */
function saveIbanOptions() {
	if (defaultSetValidation("Iban")) {
		document.getElementById("definedIban").value = document.getElementById("definedIban").value.trim();
		document.getElementById("attributesIban").value = document.getElementById("attributesIban").value.trim();

		chrome.storage.local.set({
			menuItemIban: (document.getElementById("menuItemIban").checked ? 1 : 0),
			definedIban: document.getElementById("definedIban").value,
			ibanWithPrefix : (document.getElementById("ibanWithPrefix").checked ? 1 : 0),
			bankType: document.getElementById("bankType").value,
			attributesIban: getAttributesAsString(document.getElementById("attributesIban").value)
		});
		document.getElementById("ibanSettings").style.border = "1px solid #cecece";
		return true;
	} else {
		showSettingsDiv("ibanSettings");
		document.getElementById("ibanSettings").style.border = "1px solid red";
		return false;
	}
}
/**
 * @returns bool
 */
function saveCardOptions() {
	if (defaultSetValidation("Card")) {
		document.getElementById("definedCard").value = document.getElementById("definedCard").value.trim();
		document.getElementById("attributesCard").value = document.getElementById("attributesCard").value.trim();

		chrome.storage.local.set({
			menuItemCard: (document.getElementById("menuItemCard").checked ? 1 : 0),
			definedCard: document.getElementById("definedCard").value.trim(),
			attributesCard: getAttributesAsString(document.getElementById("attributesCard").value)
		});
		document.getElementById("cardSettings").style.border = "1px solid #cecece";
		return true;
	} else {
		showSettingsDiv("cardSettings");
		document.getElementById("cardSettings").style.border = "1px solid red";
		return false;
	}
}
/**
 * @returns bool
 */
function saveKrsOptions() {
	if (defaultSetValidation("Krs")) {
		document.getElementById("definedKrs").value = document.getElementById("definedKrs").value.trim();
		document.getElementById("attributesKrs").value = document.getElementById("attributesKrs").value.trim();

		chrome.storage.local.set({
			menuItemKrs: (document.getElementById("menuItemKrs").checked ? 1 : 0),
			definedKrs: document.getElementById("definedKrs").value,
			attributesKrs: getAttributesAsString(document.getElementById("attributesKrs").value)
		});
		document.getElementById("krsSettings").style.border = "1px solid #cecece";
		return true;
	} else {
		showSettingsDiv("krsSettings");
		document.getElementById("krsSettings").style.border = "1px solid red";
		return false;
	}
}
/**
 * @returns bool
 */
function saveEanOptions() {
	if (defaultSetValidation("Ean")) {
		document.getElementById("definedEan").value = document.getElementById("definedEan").value.trim();
		document.getElementById("attributesEan").value = document.getElementById("attributesEan").value.trim();

		chrome.storage.local.set({
			menuItemEan: (document.getElementById("menuItemEan").checked ? 1 : 0),
			definedEan: document.getElementById("definedEan").value,
			attributesEan: getAttributesAsString(document.getElementById("attributesEan").value)
		});
		document.getElementById("eanSettings").style.border = "1px solid #cecece";
		return true;
	} else {
		showSettingsDiv("eanSettings");
		document.getElementById("eanSettings").style.border = "1px solid red";
		return false;
	}
}
/**
 * @returns bool
 */
function saveTextOptions() {
	var text1Validation = defaultTextValidation("text1");
	var text2Validation = defaultTextValidation("text2");
	var text3Validation = defaultTextValidation("text3");

	if (text1Validation && text2Validation && text3Validation) {

		chrome.storage.local.set({
			menuItemText: (document.getElementById("menuItemText").checked ? 1 : 0),
			text1Length: document.getElementById("text1Length").value,
			text2Length: document.getElementById("text2Length").value,
			text3Length: document.getElementById("text3Length").value
		});
		document.getElementById("textSettings").style.border = "1px solid #cecece";
		return true;
	} else {
		showSettingsDiv("textSettings");
		document.getElementById("textSettings").style.border = "1px solid red";
		return false;
	}
}
/**
 * @returns bool
 */
function saveSignsOptions() {
	if (signsValidation()) {

		chrome.storage.local.set({
			menuItemSigns: (document.getElementById("menuItemSigns").checked ? 1 : 0),
			lengthSigns: document.getElementById("lengthSigns").value,
			smallLettersSigns: (document.getElementById("smallLettersSigns").checked ? 1 : 0),
			bigLettersSigns: (document.getElementById("bigLettersSigns").checked ? 1 : 0),
			polishSmallLettersSigns: (document.getElementById("polishSmallLettersSigns").checked ? 1 : 0),
			polishBigLettersSigns: (document.getElementById("polishBigLettersSigns").checked ? 1 : 0),
			digitsSigns: (document.getElementById("digitsSigns").checked ? 1 : 0),
			spacesSigns: (document.getElementById("spacesSigns").checked ? 1 : 0),
			specialsSigns: (document.getElementById("specialsSigns").checked ? 1 : 0)
		});
		document.getElementById("signsSettings").style.border = "1px solid #cecece";
		return true;
	} else {
		showSettingsDiv("signsSettings");
		document.getElementById("signsSettings").style.border = "1px solid red";
		return false;
	}
}
/**
 * @returns bool
 */
function saveCsvOptions() {
	if (csvValidation()) {
		document.getElementById("csvFile").value = "";

		var actualOffset = new Array(document.getElementById("csvFileContent").value.split(/\r?\n|\r/)[0].split(document.getElementById("csvFileSeparator").value=="semicolon" ? ";" : ",").length);
		actualOffset.fill("0");

		document.getElementById("csvOffsetActual").value = actualOffset;
		document.getElementById("csvOffsetActualValue").value = document.getElementById("csvOffsetStart").value;
		document.getElementById("csvOffsetActualValueLabel").innerHTML = document.getElementById("csvOffsetStart").value;

		chrome.storage.local.set({
			menuItemCsv: (document.getElementById("menuItemCsv").checked ? 1 : 0),
			csvFileName: document.getElementById("csvFileName").value,
			csvFileSeparator: document.getElementById("csvFileSeparator").value,
			csvFileContent: (document.getElementById("csvFileContent").value.length > 0 ? document.getElementById("csvFileContent").value : ""),
			csvOffsetStart: document.getElementById("csvOffsetStart").value,
			csvOffsetEnd: document.getElementById("csvOffsetEnd").value,
			csvOffsetActual: document.getElementById("csvOffsetActual").value,
			csvOffsetActualValue: document.getElementById("csvOffsetActualValue").value,
			csvEOF: (document.getElementById("csvEOF").checked ? 1 : 0)
		});
		document.getElementById("csvSettings").style.border = "1px solid #cecece";
		return true;
	} else {
		showSettingsDiv("csvSettings");
		document.getElementById("csvSettings").style.border = "1px solid red";
		return false;
	}
}
/**
 * @returns bool
 */
function saveDataOptions() {
	if (dataValidation()) {
		chrome.storage.local.set({
			menuItemData: (document.getElementById("menuItemData").checked ? 1 : 0),
			userData: getUserData()
		});
		document.getElementById("dataSettings").style.border = "1px solid #cecece";
		return true;
	} else {
		showSettingsDiv("dataSettings");
		document.getElementById("dataSettings").style.border = "1px solid red";
		return false;
	}
}
/**
 * @returns bool
 */
function saveElementsOptions() {
	if (elementsValidation()) {
		chrome.storage.local.set({
			userElements: getUserElements()
		});
		document.getElementById("elementsSettings").style.border = "1px solid #cecece";
		return true;
	} else {
		showSettingsDiv("elementsSettings");
		document.getElementById("elementsSettings").style.border = "1px solid red";
		return false;
	}
}
// ----- RESTORE OPTIONS -----
function restoreMainOptions() {
	getAllDataFromStorage(function (result) {
		fillMainForm(result);
	});
}
function restoreOptions() {
	getAllDataFromStorage(function (result) {
		fillMainForm(result);
		fillForm(result);
	});
}
function fillMainForm(result) {
	if (document.getElementById("testDataGeneratorSettingsForm")) {
		var settingsForm = document.getElementById("testDataGeneratorSettingsForm");

		settingsForm.elements.fillType.value = result.fillType || "new";
		settingsForm.elements.clipboard.value = result.clipboard || "no";
		settingsForm.elements.typeMethod.value = result.typeMethod || "keys";
		settingsForm.elements.autofillType.value = result.autofillType || "generated";
		settingsForm.elements.matchType.value = result.matchType || "equals";

		hideElement(document.getElementById("autofillFormErrorLabel"));
		hideElement(document.getElementById("autofillFieldErrorLabel"));
		hideElement(document.getElementById("resetFormErrorLabel"));

		document.getElementById("autofillFormMainKey").style.border = "";
		document.getElementById("autofillFormAdditionalKey").style.border = "";
		document.getElementById("autofillFieldMainKey").style.border = "";
		document.getElementById("autofillFieldAdditionalKey").style.border = "";
		document.getElementById("resetFormMainKey").style.border = "";
		document.getElementById("resetFormAdditionalKey").style.border = "";

		document.getElementById('autofillFormMainKey').value = result.autofillFormMainKey || "18";
		document.getElementById('autofillFormAdditionalKey').value = result.autofillFormAdditionalKey || "65";
		document.getElementById('autofillFieldMainKey').value = result.autofillFieldMainKey || "18";
		document.getElementById('autofillFieldAdditionalKey').value = result.autofillFieldAdditionalKey || "83";
		document.getElementById('resetFormMainKey').value = result.resetFormMainKey || "18";
		document.getElementById('resetFormAdditionalKey').value = result.resetFormAdditionalKey || "82";

		disableEnableFields();
	}
}
function fillForm(result) {
	if (document.getElementById("testDataGeneratorSettingsForm")) {
		var settingsForm = document.getElementById("testDataGeneratorSettingsForm");

		document.getElementById("menuItemNip").checked = (((result.menuItemNip == 1) || (result.menuItemNip != 0)) ? true : false);
		document.getElementById("menuItemRegon").checked = (((result.menuItemRegon == 1) || (result.menuItemRegon != 0)) ? true : false);
		document.getElementById("menuItemPesel").checked = (((result.menuItemPesel == 1) || (result.menuItemPesel != 0)) ? true : false);
		document.getElementById("menuItemIdentityCard").checked = (((result.menuItemIdentityCard == 1) || (result.menuItemIdentityCard != 0)) ? true : false);
		document.getElementById("menuItemIban").checked = (((result.menuItemIban == 1) || (result.menuItemIban != 0)) ? true : false);
		document.getElementById("menuItemCard").checked = (((result.menuItemCard == 1) || (result.menuItemCard != 0)) ? true : false);
		document.getElementById("menuItemKrs").checked = (((result.menuItemKrs == 1) || (result.menuItemKrs != 0)) ? true : false);
		document.getElementById("menuItemEan").checked = (((result.menuItemEan == 1) || (result.menuItemEan != 0)) ? true : false);
		document.getElementById("menuItemText").checked = (((result.menuItemText == 1) || (result.menuItemText != 0)) ? true : false);
		document.getElementById("menuItemSigns").checked = (((result.menuItemSigns == 1) || (result.menuItemSigns != 0)) ? true : false);
		document.getElementById("menuItemCsv").checked = (((result.menuItemCsv == 1) || (result.menuItemCsv != 0)) ? true : false);
		document.getElementById("menuItemData").checked = (((result.menuItemData == 1) || (result.menuItemData != 0)) ? true : false);

		checkUncheckAllMenuItem();

		document.querySelector("#definedNip").value = result.definedNip || "5564943707";
		document.querySelector("#definedRegon").value = result.definedRegon || "451187704";
		document.querySelector("#definedPesel").value = result.definedPesel || "87060301030";
		settingsForm.elements.peselGenderType.value = result.peselGenderType || "random";
		settingsForm.elements.peselDateType.value = result.peselDateType || "random";
		document.querySelector("#peselBornDate").value = result.peselBornDate || "1985-11-27";
		document.querySelector("#peselBornStartDate").value = result.peselBornStartDate || "1985-11-27";
		document.querySelector("#peselBornEndDate").value = result.peselBornEndDate || "1992-06-04";

		document.querySelector("#peselBornDate").setAttribute("max", getTodayDate());
		document.querySelector("#definedIdentityCard").value = result.definedIdentityCard || "ATI610961";
		document.querySelector("#definedIban").value = result.definedIban || "PL89249000053591078401160741";
		document.getElementById("ibanWithPrefix").checked = (((result.ibanWithPrefix == 1) || (result.ibanWithPrefix != 0)) ? true : false);
		document.querySelector("#bankType").value = result.bankType || "1000";
		document.querySelector("#definedCard").value = result.definedCard || "5377223617291234";
		document.querySelector("#definedKrs").value = result.definedKrs || "0000133156";
		document.querySelector("#definedEan").value = result.definedEan || "4006381333931";

		document.querySelector("#attributesNip").value = result.attributesNip || "nip,numer_nip";
		addTagify(document.querySelector("#attributesNip"));
		document.querySelector("#attributesRegon").value = result.attributesRegon || "regon,numer_regon";
		addTagify(document.querySelector("#attributesRegon"));
		document.querySelector("#attributesPesel").value = result.attributesPesel || "pesel,numer_pesel";
		addTagify(document.querySelector("#attributesPesel"));
		document.querySelector("#attributesIdentityCard").value = result.attributesIdentityCard || "dowod,dowod_osobisty";
		addTagify(document.querySelector("#attributesIdentityCard"));
		document.querySelector("#attributesIban").value = result.attributesIban || "iban,numer_konta";
		addTagify(document.querySelector("#attributesIban"));
		document.querySelector("#attributesCard").value = result.attributesCard || "karta,karta_kredytowa";
		addTagify(document.querySelector("#attributesCard"));
		document.querySelector("#attributesKrs").value = result.attributesKrs || "krs,numer_krs";
		addTagify(document.querySelector("#attributesKrs"));
		document.querySelector("#attributesEan").value = result.attributesEan || "ean,numer_ean";
		addTagify(document.querySelector("#attributesEan"));

		document.querySelector("#text1Length").value = result.text1Length || "100";
		document.querySelector("#text2Length").value = result.text2Length || "200";
		document.querySelector("#text3Length").value = result.text3Length || "300";
		document.querySelector("#lengthSigns").value = result.lengthSigns || "100";
		document.getElementById("smallLettersSigns").checked = (((result.smallLettersSigns == 1) || (result.smallLettersSigns != 0)) ? true : false);
		document.getElementById("bigLettersSigns").checked = (((result.bigLettersSigns == 1) || (result.bigLettersSigns != 0)) ? true : false);
		document.getElementById("polishSmallLettersSigns").checked = (((result.polishSmallLettersSigns == 1) || (result.polishSmallLettersSigns != 0)) ? true : false);
		document.getElementById("polishBigLettersSigns").checked = (((result.polishBigLettersSigns == 1) || (result.polishBigLettersSigns != 0)) ? true : false);
		document.getElementById("digitsSigns").checked = (((result.digitsSigns == 1) || (result.digitsSigns != 0)) ? true : false);
		document.getElementById("spacesSigns").checked = (((result.spacesSigns == 1) || (result.spacesSigns != 0)) ? true : false);
		document.getElementById("specialsSigns").checked = (((result.specialsSigns == 1) || (result.specialsSigns != 0)) ? true : false);
		document.getElementById("csvFileName").value = result.csvFileName;
		document.getElementById("csvFileSeparator").value = result.csvFileSeparator || "coma";
		document.getElementById("csvFileContent").value = result.csvFileContent;
		document.getElementById("csvOffsetActual").value = result.csvOffsetActual;
		document.getElementById("csvEOF").checked = (((result.csvEOF == 1) || (result.csvEOF != 0)) ? true : false);

		setCsvData();

		document.getElementById("csvOffsetStart").value = result.csvOffsetStart;
		document.getElementById("csvOffsetEnd").value = result.csvOffsetEnd;
		document.getElementById("csvOffsetActualValue").value = result.csvOffsetActualValue;
		document.getElementById("csvOffsetActualValueLabel").innerHTML = result.csvOffsetActualValue;

		setUserData(result.userData || "");
		setUserElements(result.userElements || "");

		saveAllDataService();

		createDB(function (event) { 
			if (event.created) {
				saveDefaultProjectToDB(function () {
					fillProjectSelectOption(result.activeProject, function () {
						saveActiveProject();
					});
				});
			} else {
				if(event.status){
					getAllProjectsFromDB(function (projects) {
						if (projects.length > 0) {
							updateProjectFromDB(result.activeProject, null, result, function () {
								fillProjectSelectOption(result.activeProject, function () {
									saveActiveProject();
								});
							});
						} else {
							saveDefaultProjectToDB(function () {
								fillProjectSelectOption(result.activeProject, function () {
									saveActiveProject();
								});
							});
						}
					});
				} else {
					addOptionElement(1, "Projekt", false, true);
					
					document.getElementById("project").disabled = true;
					document.getElementById("project").title = "Funkcjonalność jest niedostępna z powodu nieodpowiednich ustawień przeglądarki.";
					document.getElementById("project").style = "cursor: no-drop;";
					
					document.getElementById("projectManagement").disabled = true;
					document.getElementById("projectManagement").title = "Funkcjonalność jest niedostępna z powodu nieodpowiednich ustawień przeglądarki.";
					document.getElementById("projectManagement").style = "cursor: no-drop;";
					document.getElementById('projectManagement').removeEventListener('click', projectManagementShow);
				}
			}
		});
	}
}
function fillProjectSelectOption(value, fn) {
	getAllProjectsFromDB(function (projects) {
		removeOptionElements();
		if (projects.length == 1) {
			addOptionElement(projects[0].id, projects[0].value.name, true, true);

			document.getElementById("project").disabled = true;
			document.getElementById("project").style.color = "grey";

		} else {
			for (var project in projects) {
				if (value) {
					if (projects[project].id == value) {
						addOptionElement(projects[project].id, projects[project].value.name, false, true);
					} else {
						addOptionElement(projects[project].id, projects[project].value.name, false, false);
					}
				} else {
					if (project == projects.length) {
						addOptionElement(projects[project].id, projects[project].value.name, false, true);
					} else {
						addOptionElement(projects[project].id, projects[project].value.name, false, false);
					}
				}
			}

			document.getElementById("project").disabled = false;
			document.getElementById("project").style.color = "black";
		}
		fn(projects);
	});
}
function getAllDataFromStorage(fn) {
	chrome.storage.local.get(null, function (result) {
		fn(result);
	});
}
function saveDefaultProjectToDB(fn) {
	getAllDataFromStorage(function (result) {
		writeProjectToDB("Projekt", result, function (result) {
			fn(result);
		});
	});
}

// FOR MODALS

function disableScrolling(){
    var x=window.scrollX;
    var y=window.scrollY;
    window.onscroll=function(){window.scrollTo(x, y);};
}

function enableScrolling(){
    window.onscroll = function () {
		if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
			document.getElementById("topButton").style.display = "block";
		} else {
			document.getElementById("topButton").style.display = "none";
		}
	};
}

// ----- SHOW MODALS -----
function showResetModal() {
	showElement(document.getElementById("resetModal"));
	disableScrolling();
}
function projectManagementShow() {
	showElement(document.getElementById("projectManagementModal"));
	getAllProjectsFromDB(function (result) {
		for (var item in result) {
			addProjectElement(result[item]);
		}
	});
	disableScrolling();
}
function showImportProjectModal() {
	projectManagementHide();
	document.getElementById("importProjectName").value = "";
	document.getElementById("settingsFile").value = "";
	showElement(document.getElementById("importProjectModal"));
	disableScrolling();
}
function showAddProjectModal() {
	projectManagementHide();
	document.getElementById("addProjectName").value = "";
	showElement(document.getElementById("addProjectModal"));
	disableScrolling();
}
function showEditProjectModal(id) {
	getProjectFromDB(id, function (result) {
		if (result && Object.keys(result).length > 0) {
			projectManagementHide();
			document.getElementById("editProjectId").value = id;
			document.getElementById("editProjectName").value = result.name;
			document.getElementById("editProjectOldName").value = result.name;
			showElement(document.getElementById("editProjectModal"));
			disableScrolling();
		}
	});
}
function showDeleteProjectModal(element) {
	var fullId = element.id;
	var elementId = fullId.substring(12, fullId.length);
	var projectId = document.getElementById("projectId-" + elementId).value;
	projectManagementHide();
	showElement(document.getElementById("deleteProjectModal"));
	document.getElementById("deletedProjectId").value = projectId;
	document.getElementById("deletedElementId").value = elementId;
	disableScrolling();
}
function showDeleteElementModal(element) {
	var id = element.id;
	showElement(document.getElementById("deleteElementModal"));
	document.getElementById("deletedChoosenElementId").value = id;
	disableScrolling();
}

// ----- HIDE MODALS -----
function hideMainModal() {
	hideElement(document.getElementById('mainModal'));
	if (!document.getElementById("projectManagement").disabled) {
		getAllDataFromStorage(function (result) {
			fillProjectSelectOption(result.activeProject, function () {
				// PO CO?
			});
		});
	} else {
		addOptionElement(1, "Projekt", false, true);
					
		document.getElementById("project").disabled = true;
		document.getElementById("project").title = "Z powodu błędnych ustawień przeglądarki ta funkcjonalność jest niedostępna.";
		document.getElementById("project").style = "cursor: no-drop;";
		document.getElementById("project").style.color = "gray";
		
		document.getElementById("projectManagement").disabled = true;
		document.getElementById("projectManagement").title = "Z powodu błędnych ustawień przeglądarki ta funkcjonalność jest niedostępna.";
		document.getElementById("projectManagement").style = "cursor: no-drop;";
		document.getElementById('projectManagement').removeEventListener('click', projectManagementShow);
	}
	enableScrolling();
}
function hideResetModal() {
	hideElement(document.getElementById("resetModal"));
	enableScrolling();
}
function projectManagementHide() {
	document.getElementById("projectElements").innerHTML = "";
	hideElement(document.getElementById("projectManagementModal"));
	enableScrolling();
}
function projectManagementClose() {
	document.getElementById("projectElements").innerHTML = "";
	hideElement(document.getElementById("projectManagementModal"));
	var value = document.getElementById("project").options[document.getElementById("project").selectedIndex].value;

	getAllProjectsFromDB(function (result) {
		if (result.length > 0) {
			fillProjectSelectOption(value, function () {

			});
		} else {
			location.reload();
		}
	});
	enableScrolling();
}
function hideDeleteProjectModal() {
	hideElement(document.getElementById("deleteProjectModal"));
	enableScrolling();
	projectManagementShow();
}
function hideDeleteElementModal() {
	document.getElementById("deletedChoosenElementId").value = "";
	hideElement(document.getElementById("deleteElementModal"));
	enableScrolling();
}
// ----- ACTIONS MODALS -----
function deleteChoosenElement() {
	deleteElement(document.getElementById(document.getElementById("deletedChoosenElementId").value));
	hideDeleteElementModal();
}
function deleteProject() {
	deleteProjectFromDB(document.getElementById("deletedProjectId").value, function (result) {
		hideDeleteProjectModal();
	});
}
function addProject() {
	projectNameValidation("addProject", function(result){
		if (result) {
			saveNewProjectToDB(document.getElementById("addProjectName").value);
		}
	});
}
function editProject() {
	changeProjectNameValidation("editProject", function(result){
		if (result) {
			var editProjectId = document.getElementById("editProjectId");
			saveEditedProjectToDB(editProjectId.value, editProjectName.value);
		}
	});
}
function projectExport(id) {
	getProjectFromDB(id, function (result) {
		if (result) {
			download(result.name + ".settings", JSON.stringify(result.body));
		}
	});
}
// ----- MODALS SERVICE -----
function abortImportProject() {

	hideElement(document.getElementById("importProjectModal"));
	document.getElementById("settingsFile").value = "";
	document.getElementById("importProjectName").value = "";
	document.getElementById("importProjectName").style.borderColor = "";
	hideElement(document.getElementById("importProjectNameErrorLabel"));
	document.getElementById("importProjectNameErrorLabel").innerHTML = "";
	hideElement(document.getElementById("importProjectErrorLabel"));
	document.getElementById('importProjectErrorLabel').innerHTML = "";
	projectManagementShow();
}
function abortAddProject() {
	hideElement(document.getElementById("addProjectNameErrorLabel"));
	hideElement(document.getElementById("addProjectModal"));
	document.getElementById("addProjectName").value = "";
	document.getElementById("addProjectName").style.borderColor = "";

	projectManagementShow();
}
function abortEditProject() {
	hideElement(document.getElementById("editProjectNameErrorLabel"));
	hideElement(document.getElementById("editProjectModal"));
	document.getElementById("editProjectId").value = "";
	document.getElementById("editProjectName").value = "";
	document.getElementById("editProjectName").style.borderColor = "";

	projectManagementShow();
}

function settingsRestore(e) {
	if (document.getElementById("testDataGeneratorSettingsForm")) {
		var settingsForm = document.getElementById("testDataGeneratorSettingsForm");

		settingsForm.elements.fillType.value = "new";
		settingsForm.elements.clipboard.value = "no";
		settingsForm.elements.typeMethod.value = "keys";
		settingsForm.elements.autofillType.value = "generated";
		settingsForm.elements.matchType.value = "equals";

		document.getElementById('autofillFormMainKey').value = "18";
		document.getElementById('autofillFormAdditionalKey').value = "65";
		document.getElementById('autofillFieldMainKey').value = "18";
		document.getElementById('autofillFieldAdditionalKey').value = "83";
		document.getElementById('resetFormMainKey').value = "18";
		document.getElementById('resetFormAdditionalKey').value = "82";

		validateShortKeyOptions(e);

		saveMainOptions();

		document.getElementById("menuItemNip").checked = true;
		document.getElementById("menuItemRegon").checked = true;
		document.getElementById("menuItemPesel").checked = true;
		document.getElementById("menuItemIdentityCard").checked = true;
		document.getElementById("menuItemIban").checked = true;
		document.getElementById("menuItemCard").checked = true;
		document.getElementById("menuItemKrs").checked = true;
		document.getElementById("menuItemEan").checked = true;
		document.getElementById("menuItemText").checked = true;
		document.getElementById("menuItemSigns").checked = true;
		document.getElementById("menuItemCsv").checked = true;
		document.getElementById("menuItemData").checked = true;

		checkUncheckAllMenuItem();

		document.querySelector("#definedNip").value = "5564943707";
		document.querySelector("#definedRegon").value = "451187704";
		document.querySelector("#definedPesel").value = "87060301030";
		settingsForm.elements.peselGenderType.value = "random";
		settingsForm.elements.peselDateType.value = "date";
		document.querySelector("#peselBornDate").value = "1985-11-27";
		document.querySelector("#peselBornStartDate").value = "1985-11-27";
		document.querySelector("#peselBornEndDate").value = "1992-06-04";

		document.querySelector("#definedIdentityCard").value = "ATI610961";
		document.querySelector("#definedIban").value = "PL89249000053591078401160741";
		document.getElementById("ibanWithPrefix").checked = true;
		document.querySelector("#bankType").value = "1000";
		document.querySelector("#definedCard").value = "5377223617291234";
		document.querySelector("#definedKrs").value = "0000133156";
		document.querySelector("#definedEan").value = "4006381333931";

		// document.querySelector("#attributesNip").value = "nip,numer_nip";
		// document.querySelector("#attributesRegon").value = "regon,numer_regon";
		// document.querySelector("#attributesPesel").value = "pesel,numer_pesel";
		// document.querySelector("#attributesIdentityCard").value = "dowod,dowod_osobisty";
		// document.querySelector("#attributesIban").value = "iban,numer_konta";
		// document.querySelector("#attributesCard").value = "karta,karta_kredytowa";
		// document.querySelector("#attributesKrs").value = "krs,numer_krs";
		// document.querySelector("#attributesEan").value = "ean,numer_ean";

		document.querySelector("#attributesNip").value = "nip,numer_nip";
		addTagify(document.querySelector("#attributesNip"));
		document.querySelector("#attributesRegon").value = "regon,numer_regon";
		addTagify(document.querySelector("#attributesRegon"));
		document.querySelector("#attributesPesel").value = "pesel,numer_pesel";
		addTagify(document.querySelector("#attributesPesel"));
		document.querySelector("#attributesIdentityCard").value = "dowod,dowod_osobisty";
		addTagify(document.querySelector("#attributesIdentityCard"));
		document.querySelector("#attributesIban").value = "iban,numer_konta";
		addTagify(document.querySelector("#attributesIban"));
		document.querySelector("#attributesCard").value = "karta,karta_kredytowa";
		addTagify(document.querySelector("#attributesCard"));
		document.querySelector("#attributesKrs").value = "krs,numer_krs";
		addTagify(document.querySelector("#attributesKrs"));
		document.querySelector("#attributesEan").value = "ean,numer_ean";
		addTagify(document.querySelector("#attributesEan"));

		document.querySelector("#text1Length").value = "100";
		document.querySelector("#text2Length").value = "200";
		document.querySelector("#text3Length").value = "300";
		document.querySelector("#lengthSigns").value = "100";
		document.getElementById("smallLettersSigns").checked = true;
		document.getElementById("bigLettersSigns").checked = true;
		document.getElementById("polishSmallLettersSigns").checked = true;
		document.getElementById("polishBigLettersSigns").checked = true;
		document.getElementById("digitsSigns").checked = true;
		document.getElementById("spacesSigns").checked = true;
		document.getElementById("specialsSigns").checked = true;
		document.getElementById("csvFileName").value = "";
		document.getElementById("csvFileSeparator").value = "coma";
		document.getElementById("csvFileContent").value = "";
		document.getElementById("csvOffsetActual").value = "";
		document.getElementById("csvEOF").checked = true;

		clearCsvFile();

		setUserData("");
		setUserElements("");

		disableEnableFields();

		hideResetModal();

		document.getElementById("saveAll").click();
	}
}

function uploadSettingsFile() {

	var settingsFile = document.getElementById("settingsFile").files[0];

	projectNameValidation("importProject", function (nameResult){
		validateImportedProjectFile(function (fileResult){
			if (fileResult && nameResult){
				var importProjectName = document.getElementById("importProjectName");
				var fileReader = new FileReader();
				fileReader.onload = function (fileLoadedEvent) {
					result = JSON.parse(fileLoadedEvent.target.result);
					saveProjectToDB(importProjectName.value, result);
				};
				fileReader.readAsText(settingsFile, "UTF-8");
			}
		});
	});
}

function saveProjectToDB(name, body) {
	writeProjectToDB(name, body, function () {
		document.getElementById("settingsFile").value = "";
		document.getElementById("importProjectName").value = "";
		hideElement(document.getElementById("importProjectNameErrorLabel"));
		document.getElementById('importProjectNameErrorLabel').innerHTML = "";
		hideElement(document.getElementById("importProjectErrorLabel"));
		document.getElementById('importProjectErrorLabel').innerHTML = "";
		hideElement(document.getElementById("importProjectModal"));
		projectManagementShow();
	});
}
// DO ZMIANY???
function saveNewProjectToDB(name) {
	// TODO: Zapis danych domyślnych
	writeProjectToDB(name, "{}", function () {
		document.getElementById("addProjectName").value = "";
		hideElement(document.getElementById("addProjectNameErrorLabel"));
		document.getElementById('addProjectNameErrorLabel').innerHTML = "";
		hideElement(document.getElementById("addProjectModal"));
		projectManagementShow();
	});
}

function saveEditedProjectToDB(id, name) {
	updateProjectFromDB(id, name, null, function (result) {
		document.getElementById("editProjectId").value = "";
		document.getElementById("editProjectName").value = "";
		document.getElementById("editProjectOldName").value = "";
		hideElement(document.getElementById("editProjectNameErrorLabel"));
		document.getElementById('editProjectNameErrorLabel').innerHTML = "";
		hideElement(document.getElementById("editProjectModal"));
		projectManagementShow();
	});
}

// --LISTENERS--
// ----MAIN----
document.addEventListener("DOMContentLoaded", restoreOptions);

window.addEventListener("focus", restoreMainOptions);

window.onscroll = function () {
	if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
		document.getElementById("topButton").style.display = "block";
	} else {
		document.getElementById("topButton").style.display = "none";
	}
};
// ----- LISTENERS -----
if (document.getElementById('project')) {
	document.getElementById('project').addEventListener('change', changeProject);
}
// ----- MAIN OPTIONS -----
var typeMethodRadioButtons = document.getElementsByName('typeMethod');
for (var i = 0; i < typeMethodRadioButtons.length; i++) {
	typeMethodRadioButtons[i].addEventListener("change", saveMainTestDataGeneratorOptions);
}
var fillTypeRadioButtons = document.getElementsByName('fillType');
for (var i = 0; i < fillTypeRadioButtons.length; i++) {
	fillTypeRadioButtons[i].addEventListener("change", saveMainTestDataGeneratorOptions);
}
var clipboardRadioButtons = document.getElementsByName('clipboard');
for (var i = 0; i < clipboardRadioButtons.length; i++) {
	clipboardRadioButtons[i].addEventListener("change", saveMainTestDataGeneratorOptions);
}
var autofillTypeRadioButtons = document.getElementsByName('autofillType');
for (var i = 0; i < autofillTypeRadioButtons.length; i++) {
	autofillTypeRadioButtons[i].addEventListener("change", saveMainTestDataGeneratorOptions);
}
var matchTypeRadioButtons = document.getElementsByName('matchType');
for (var i = 0; i < matchTypeRadioButtons.length; i++) {
	matchTypeRadioButtons[i].addEventListener("change", saveMainTestDataGeneratorOptions);
}
if (document.getElementById('autofillFormMainKey')) {
	document.getElementById('autofillFormMainKey').addEventListener('change', validateShortKeyOptions);
}
if (document.getElementById('autofillFormAdditionalKey')) {
	document.getElementById('autofillFormAdditionalKey').addEventListener('change', validateShortKeyOptions);
}
if (document.getElementById('autofillFieldMainKey')) {
	document.getElementById('autofillFieldMainKey').addEventListener('change', validateShortKeyOptions);
}
if (document.getElementById('autofillFieldAdditionalKey')) {
	document.getElementById('autofillFieldAdditionalKey').addEventListener('change', validateShortKeyOptions);
}
if (document.getElementById('resetFormMainKey')) {
	document.getElementById('resetFormMainKey').addEventListener('change', validateShortKeyOptions);
}
if (document.getElementById('resetFormAdditionalKey')) {
	document.getElementById('resetFormAdditionalKey').addEventListener('change', validateShortKeyOptions);
}
// ----- MODALS -----
if (document.getElementById("closeButton")) {
	document.getElementById("closeButton").addEventListener("click", hideMainModal);
}
// if(document.getElementById("mainModal")){ // Klikanie w czarne tło
// 	document.getElementById("mainModal").addEventListener("click", hideMainModal);
// }
if (document.getElementById('settingsRestore')) {
	document.getElementById('settingsRestore').addEventListener('click', showResetModal, false);
}
if (document.getElementById('projectManagement')) {
	document.getElementById('projectManagement').addEventListener('click', projectManagementShow);
}
if (document.getElementById('projectManagementClose')) {
	document.getElementById('projectManagementClose').addEventListener('click', projectManagementClose, false);
}
if (document.getElementById('projectImport')) {
	document.getElementById('projectImport').addEventListener('click', showImportProjectModal, false);
}
if (document.getElementById("projectAdd")) {
	document.getElementById("projectAdd").addEventListener("click", showAddProjectModal, false);
}
if (document.getElementById('abortImportProject')) {
	document.getElementById('abortImportProject').addEventListener('click', abortImportProject, false);
}
if (document.getElementById('abortAddProject')) {
	document.getElementById('abortAddProject').addEventListener('click', abortAddProject, false);
}
if (document.getElementById('abortEditProject')) {
	document.getElementById('abortEditProject').addEventListener('click', abortEditProject, false);
}
if (document.getElementById('resetModalYes')) {
	document.getElementById('resetModalYes').addEventListener('click', settingsRestore, false);
}
if (document.getElementById('resetModalNo')) {
	document.getElementById('resetModalNo').addEventListener('click', hideResetModal, false);
}
if (document.getElementById('deleteElementYes')) {
	document.getElementById('deleteElementYes').addEventListener('click', deleteChoosenElement, false);
}
if (document.getElementById('deleteElementNo')) {
	document.getElementById('deleteElementNo').addEventListener('click', hideDeleteElementModal, false);
}
if (document.getElementById('deleteProjectYes')) {
	document.getElementById('deleteProjectYes').addEventListener('click', deleteProject, false);
}
if (document.getElementById('deleteProjectNo')) {
	document.getElementById('deleteProjectNo').addEventListener('click', hideDeleteProjectModal, false);
}
if (document.getElementById('importProject')) {
	document.getElementById('importProject').addEventListener('click', uploadSettingsFile, false);
}
if (document.getElementById('addProject')) {
	document.getElementById('addProject').addEventListener('click', addProject, false);
}
if (document.getElementById('editProject')) {
	document.getElementById('editProject').addEventListener('click', editProject, false);
}
// ----- SAVE BUTTONS -----
if (document.getElementById("saveAll")) {
	document.getElementById("saveAll").addEventListener("click", saveTestDataGeneratorOptions);
}
if (document.getElementById("saveAllBottom")) {
	document.getElementById("saveAllBottom").addEventListener("click", saveTestDataGeneratorOptions);
}
if (document.getElementById("nipSave")) {
	document.getElementById("nipSave").addEventListener("click", function () { validateAndSave(saveNipOptions()); });
}
if (document.getElementById("regonSave")) {
	document.getElementById("regonSave").addEventListener("click", function () { validateAndSave(saveRegonOptions()); });
}
if (document.getElementById("peselSave")) {
	document.getElementById("peselSave").addEventListener("click", function () { validateAndSave(savePeselOptions()); });
}
if (document.getElementById("identityCardSave")) {
	document.getElementById("identityCardSave").addEventListener("click", function () { validateAndSave(saveIdentityCardOptions()); });
}
if (document.getElementById("ibanSave")) {
	document.getElementById("ibanSave").addEventListener("click", function () { validateAndSave(saveIbanOptions()); });
}
if (document.getElementById("cardSave")) {
	document.getElementById("cardSave").addEventListener("click", function () { validateAndSave(saveCardOptions()); });
}
if (document.getElementById("krsSave")) {
	document.getElementById("krsSave").addEventListener("click", function () { validateAndSave(saveKrsOptions()); });
}
if (document.getElementById("eanSave")) {
	document.getElementById("eanSave").addEventListener("click", function () { validateAndSave(saveEanOptions()); });
}
if (document.getElementById("textSave")) {
	document.getElementById("textSave").addEventListener("click", function () { validateAndSave(saveTextOptions()); });
}
if (document.getElementById("signsSave")) {
	document.getElementById("signsSave").addEventListener("click", function () { validateAndSave(saveSignsOptions()); });
}
if (document.getElementById("csvSave")) {
	document.getElementById("csvSave").addEventListener("click", function () { validateAndSave(saveCsvOptions()); });
}
if (document.getElementById("dataSave")) {
	document.getElementById("dataSave").addEventListener("click", function () { validateAndSave(saveDataOptions()); });
}
if (document.getElementById("elementsSave")) {
	document.getElementById("elementsSave").addEventListener("click", function () { validateAndSave(saveElementsOptions()); });
}
// ---- MENU ITEMS ----
if (document.getElementById('menuItems')) {
	document.getElementById('menuItems').addEventListener("change", checkUncheckAllMenuItems);
}
if (document.getElementById('menuItemsBottom')) {
	document.getElementById('menuItemsBottom').addEventListener("change", checkUncheckAllMenuItems);
}
if (document.getElementById('menuItemNip')) {
	document.getElementById('menuItemNip').addEventListener("change", checkUncheckAllMenuItem);
}
if (document.getElementById('menuItemRegon')) {
	document.getElementById('menuItemRegon').addEventListener("change", checkUncheckAllMenuItem);
}
if (document.getElementById('menuItemPesel')) {
	document.getElementById('menuItemPesel').addEventListener("change", checkUncheckAllMenuItem);
}
if (document.getElementById('menuItemIdentityCard')) {
	document.getElementById('menuItemIdentityCard').addEventListener("change", checkUncheckAllMenuItem);
}
if (document.getElementById('menuItemIban')) {
	document.getElementById('menuItemIban').addEventListener("change", checkUncheckAllMenuItem);
}
if (document.getElementById('menuItemCard')) {
	document.getElementById('menuItemCard').addEventListener("change", checkUncheckAllMenuItem);
}
if (document.getElementById('menuItemKrs')) {
	document.getElementById('menuItemKrs').addEventListener("change", checkUncheckAllMenuItem);
}
if (document.getElementById('menuItemEan')) {
	document.getElementById('menuItemEan').addEventListener("change", checkUncheckAllMenuItem);
}
if (document.getElementById('menuItemText')) {
	document.getElementById('menuItemText').addEventListener("change", checkUncheckAllMenuItem);
}
if (document.getElementById('menuItemSigns')) {
	document.getElementById('menuItemSigns').addEventListener("change", checkUncheckAllMenuItem);
}
if (document.getElementById('menuItemCsv')) {
	document.getElementById('menuItemCsv').addEventListener("change", checkUncheckAllMenuItem);
}
if (document.getElementById('menuItemData')) {
	document.getElementById('menuItemData').addEventListener("change", checkUncheckAllMenuItem);
}
// ----SETTINGS BUTTONS----
if (document.getElementById('allSettingsButton')) {
	document.getElementById('allSettingsButton').addEventListener("click", checkUncheckAllSettings);
}
if (document.getElementById('allSettingsButtonBottom')) {
	document.getElementById('allSettingsButtonBottom').addEventListener("click", checkUncheckAllSettings);
}
if (document.getElementById('nipSettingsButton')) {
	document.getElementById('nipSettingsButton').addEventListener("click", showHideSettingsDiv);
}
if (document.getElementById('regonSettingsButton')) {
	document.getElementById('regonSettingsButton').addEventListener("click", showHideSettingsDiv);
}
if (document.getElementById('peselSettingsButton')) {
	document.getElementById('peselSettingsButton').addEventListener("click", showHideSettingsDiv);
}
if (document.getElementById('identityCardSettingsButton')) {
	document.getElementById('identityCardSettingsButton').addEventListener("click", showHideSettingsDiv);
}
if (document.getElementById('ibanSettingsButton')) {
	document.getElementById('ibanSettingsButton').addEventListener("click", showHideSettingsDiv);
}
if (document.getElementById('cardSettingsButton')) {
	document.getElementById('cardSettingsButton').addEventListener("click", showHideSettingsDiv);
}
if (document.getElementById('krsSettingsButton')) {
	document.getElementById('krsSettingsButton').addEventListener("click", showHideSettingsDiv);
}
if (document.getElementById('eanSettingsButton')) {
	document.getElementById('eanSettingsButton').addEventListener("click", showHideSettingsDiv);
}
if (document.getElementById('textSettingsButton')) {
	document.getElementById('textSettingsButton').addEventListener("click", showHideSettingsDiv);
}
if (document.getElementById('signsSettingsButton')) {
	document.getElementById('signsSettingsButton').addEventListener("click", showHideSettingsDiv);
}
if (document.getElementById('csvSettingsButton')) {
	document.getElementById('csvSettingsButton').addEventListener("click", showHideSettingsDiv);
}
if (document.getElementById('dataSettingsButton')) {
	document.getElementById('dataSettingsButton').addEventListener("click", showHideSettingsDiv);
}
if (document.getElementById('elementsSettingsButton')) {
	document.getElementById('elementsSettingsButton').addEventListener("click", showHideSettingsDiv);
}
// ----- SERVICE -----
if (document.getElementById("dataAdd")) {
	document.getElementById("dataAdd").addEventListener("click", function () { addDataElement(null); });
}
if (document.getElementById("elementAdd")) {
	document.getElementById("elementAdd").addEventListener("click", function () { addElement(document.getElementById("elementTypeChooser").value, null);});
}
if (document.getElementById('userDataOptionsButton')) {
	document.getElementById('userDataOptionsButton').addEventListener("click", showDataOptionsDiv);
}
if (document.getElementById('csvFile')) {
	document.getElementById('csvFile').addEventListener('change', uploadCsvFile, false);
}
if (document.getElementById('csvOffsetStart')) {
	document.getElementById('csvOffsetStart').addEventListener('change', updateStartSelectOptions, false);
}
if (document.getElementById('csvOffsetEnd')) {
	document.getElementById('csvOffsetEnd').addEventListener('change', updateEndSelectOptions, false);
}
if (document.getElementById('clear')) {
	document.getElementById('clear').addEventListener('click', clearCsvFile, false);
}
chrome.storage.onChanged.addListener(function (changes, namespace) {
	if (changes) {
		if (changes.csvOffsetActualValue) {
			if (document.getElementById("csvOffsetActualValue")) {
				document.getElementById("csvOffsetActualValue").value = changes.csvOffsetActualValue.newValue;
			}
			if (document.getElementById("csvOffsetActualValueLabel")) {
				document.getElementById("csvOffsetActualValueLabel").innerHTML = changes.csvOffsetActualValue.newValue;
			}
		}
		if (changes.csvOffsetActual) {
			if (document.getElementById("csvOffsetActual")) {
				document.getElementById("csvOffsetActual").value = changes.csvOffsetActual.newValue;
			}
		}
	}
});
// ----- FORM SERVICE -----
function showElement(elem) {
	elem.style.display = 'block';
}
function hideElement(elem) {
	elem.style.display = 'none';
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
function checkAllMenuItems(value) {
	document.getElementById("menuItemNip").checked = value;
	document.getElementById("menuItemRegon").checked = value;
	document.getElementById("menuItemPesel").checked = value;
	document.getElementById("menuItemIdentityCard").checked = value;
	document.getElementById("menuItemIban").checked = value;
	document.getElementById("menuItemCard").checked = value;
	document.getElementById("menuItemKrs").checked = value;
	document.getElementById("menuItemEan").checked = value;
	document.getElementById("menuItemText").checked = value;
	document.getElementById("menuItemSigns").checked = value;
	document.getElementById("menuItemCsv").checked = value;
	document.getElementById("menuItemData").checked = value;
}
function showAllSettings(value) {
	document.getElementById("nipSettings").style.display = value;
	document.getElementById("regonSettings").style.display = value;
	document.getElementById("peselSettings").style.display = value;
	document.getElementById("identityCardSettings").style.display = value;
	document.getElementById("ibanSettings").style.display = value;
	document.getElementById("cardSettings").style.display = value;
	document.getElementById("krsSettings").style.display = value;
	document.getElementById("eanSettings").style.display = value;
	document.getElementById("textSettings").style.display = value;
	document.getElementById("signsSettings").style.display = value;
	document.getElementById("csvSettings").style.display = value;
	document.getElementById("dataSettings").style.display = value;
	document.getElementById("elementsSettings").style.display = value;
}
function setAllSettingsButtons(value) {
	document.getElementById("nipSettingsButton").innerHTML = value;
	document.getElementById("regonSettingsButton").innerHTML = value;
	document.getElementById("peselSettingsButton").innerHTML = value;
	document.getElementById("identityCardSettingsButton").innerHTML = value;
	document.getElementById("ibanSettingsButton").innerHTML = value;
	document.getElementById("cardSettingsButton").innerHTML = value;
	document.getElementById("krsSettingsButton").innerHTML = value;
	document.getElementById("eanSettingsButton").innerHTML = value;
	document.getElementById("textSettingsButton").innerHTML = value;
	document.getElementById("signsSettingsButton").innerHTML = value;
	document.getElementById("csvSettingsButton").innerHTML = value;
	document.getElementById("dataSettingsButton").innerHTML = value;
	document.getElementById("elementsSettingsButton").innerHTML = value;
}
function checkMenuItemsIsShowed() {
	var showed = true;
	showed = !document.getElementById("menuItemNip").checked ? false : showed;
	showed = !document.getElementById("menuItemRegon").checked ? false : showed;
	showed = !document.getElementById("menuItemPesel").checked ? false : showed;
	showed = !document.getElementById("menuItemIdentityCard").checked ? false : showed;
	showed = !document.getElementById("menuItemIban").checked ? false : showed;
	showed = !document.getElementById("menuItemCard").checked ? false : showed;
	showed = !document.getElementById("menuItemKrs").checked ? false : showed;
	showed = !document.getElementById("menuItemEan").checked ? false : showed;
	showed = !document.getElementById("menuItemText").checked ? false : showed;
	showed = !document.getElementById("menuItemSigns").checked ? false : showed;
	showed = !document.getElementById("menuItemCsv").checked ? false : showed;
	showed = !document.getElementById("menuItemData").checked ? false : showed;
	return showed;
}
function checkSettingsIsShowed() {
	var showed = false;
	showed = document.getElementById("nipSettings").style.display == 'block' ? true : showed;
	showed = document.getElementById("regonSettings").style.display == 'block' ? true : showed;
	showed = document.getElementById("peselSettings").style.display == 'block' ? true : showed;
	showed = document.getElementById("identityCardSettings").style.display == 'block' ? true : showed;
	showed = document.getElementById("ibanSettings").style.display == 'block' ? true : showed;
	showed = document.getElementById("cardSettings").style.display == 'block' ? true : showed;
	showed = document.getElementById("krsSettings").style.display == 'block' ? true : showed;
	showed = document.getElementById("eanSettings").style.display == 'block' ? true : showed;
	showed = document.getElementById("textSettings").style.display == 'block' ? true : showed;
	showed = document.getElementById("signsSettings").style.display == 'block' ? true : showed;
	showed = document.getElementById("csvSettings").style.display == 'block' ? true : showed;
	showed = document.getElementById("dataSettings").style.display == 'block' ? true : showed;
	return showed;
}
function showHideSettingsDiv(e) {
	var elemId = e.target.id;
	var elem = document.getElementById(elemId.substring(0, elemId.length - 6));
	if (elem.style.display == 'block') {
		hideElement(elem);
		document.getElementById(e.target.id).innerHTML = "Pokaż ustawienia";
	} else {
		showElement(elem);
		document.getElementById(e.target.id).innerHTML = "Schowaj ustawienia";
	}
	checkUncheckAllSettingsButton();
}
function checkUncheckAllSettings(e) {
	var elemId = e.target.id;
	if (checkSettingsIsShowed()) {
		showAllSettings('none');
		setAllSettingsButtons("Pokaż ustawienia");
	} else {
		showAllSettings('block');
		setAllSettingsButtons("Schowaj ustawienia");
	}
	checkUncheckAllSettingsButton();
	location.href = "#" + elemId;
}
function checkUncheckAllSettingsButton() {
	if (checkSettingsIsShowed()) {
		document.getElementById("allSettingsButton").innerHTML = "Schowaj wszystkie ustawienia";
		document.getElementById("allSettingsButtonBottom").innerHTML = "Schowaj wszystkie ustawienia";
	} else {
		document.getElementById("allSettingsButton").innerHTML = "Pokaż wszystkie ustawienia";
		document.getElementById("allSettingsButtonBottom").innerHTML = "Pokaż wszystkie ustawienia";
	}
}
function checkUncheckAllMenuItems() {
	if (checkMenuItemsIsShowed()) {
		checkAllMenuItems(false);
	} else {
		checkAllMenuItems(true);
	}
	checkUncheckAllMenuItem();
}
function checkUncheckAllMenuItem() {
	if (checkMenuItemsIsShowed()) {
		document.getElementById("menuItems").checked = true;
		document.getElementById("menuItemsBottom").checked = true;
	} else {
		document.getElementById("menuItems").checked = false;
		document.getElementById("menuItemsBottom").checked = false;
	}
}
function showDataOptionsDiv(e) {
	var elem = document.getElementById('userDataOptions');
	if (elem.style.display == 'block') {
		hideElement(elem);
		document.getElementById('userDataOptionsButton').innerHTML = "Pokaż dostępne opcje dla danych użytkownika";
	} else {
		showElement(elem);
		document.getElementById('userDataOptionsButton').innerHTML = "Schowaj dostępne opcje dla danych użytkownika";
	}
}
function showSettingsDiv(elementId) {
	var elem = document.getElementById(elementId);
	if (elem.style.display == 'none') {
		showElement(elem);
		document.getElementById(elementId + "Button").innerHTML = "Schowaj ustawienia";
	}
}
var codeElements = document.getElementsByClassName("code");
for (var i = 0; i < codeElements.length; i++) {
	codeElements[i].addEventListener('dragstart', drag);
}
function addOptionElement(id, name, value, selected) {
	var select = document.getElementById("project");
	var option = document.createElement('option');
	option.value = id;
	option.title = name;
	if (name.length > 16) {
		option.innerHTML = name.substring(0, 16) + "...";
	} else {
		option.innerHTML = name;
	}
	option.selected = selected;
	select.appendChild(option);
	select.disabled = value;
}
function removeOptionElements() {
	var select = document.getElementById("project");
	select.innerHTML = "";
}
function addDataElement(values) {
	var dataElements = document.getElementById("dataElements");
	var elements = document.getElementsByName("dataName");
	var id;
	if (elements.length > 0) {
		var elementsCount = elements.length;
		var lastId = elements[elementsCount - 1].id;
		var parts = lastId.split('-', 2);
		id = parseInt(parts[1]);
	} else {
		id = 0;
	}
	var div = document.createElement('div');
	id = id + 1;
	div.id = "div-" + id;
	div.className = "dataDiv";
	div.innerHTML =
		'<button name="dataDelete" class="delete" id="dataDelete-' + id + '" type="button" title="Usuń element">-</button> ' +
		'<input type="text"' + (values ? ' value="' + values[0].replace(/["]/g, "&quot;") + '" ' : " ") + 'class="enable" id="dataName-' + id + '" name="dataName" size="16" maxlength="255" placeholder="Nazwa danych" title="Nazwa danych - długość minimalna: 1 znak / długość maksymalna: 255 znaków"> ' +
		'<input type="text"' + (values ? ' value="' + values[1].replace(/["]/g, "&quot;") + '" ' : " ") + 'class="enable" id="dataValue-' + id + '" name="dataValue" size="32" maxlength="255" placeholder="Dane użytkownika" title="Dane użytkownika - długość minimalna: 1 znak / długość maksymalna: 255 znaków, niedozwolone znaki \'{\' lub \'}\'"> ' +
		'<input type="text"' + (values ? ' value="' + values[2].replace(/["]/g, "&quot;") + '" ' : " ") + 'class="enable" id="dataAttributes-' + id + '" name="dataAttributes" size="32" maxlength="255" placeholder="Wartości atrybutów pól" title="Wartości atrybutów pól - długość minimalna: 1 znak / długość maksymalna: 255 znaków"> ' +
		'<img src="icons/info_16.png" style="vertical-align: middle" title="' +
		'Nazwa danych - nazwa, pod jaką będą dostępne wprowadzone dane.&#013;' +
		'Dane użytkownika - wprowadzone / wygenerowane dane, które będą wstawiane do pól.&#013;' +
		'Wartości atrybutów pól - wartości (rozdzielone przecinkami) umożliwiające rozpoznanie pól dla funkcji autouzupełniania, np.: wartość1,wartość2."/><br/>' +
		'<label id="dataErrorLabel-' + id + '" class="errorLabel"></label>';
	dataElements.appendChild(div);

	//addTagify(document.querySelector('#dataAttributes-'+id));

	document.getElementById("dataDelete-" + (id)).addEventListener("click", function () { showDeleteElementModal(div); });
}
function addProjectElement(data) {
	var projectElements = document.getElementById("projectElements");
	var elements = document.getElementsByName("projectName");
	var id;
	if (elements.length > 0) {
		var elementsCount = elements.length;
		var lastId = elements[elementsCount - 1].id;
		var parts = lastId.split('-', 2);
		id = parseInt(parts[1]);
	} else {
		id = 0;
	}
	var projectId = document.getElementById("project").options[document.getElementById("project").selectedIndex].value;
	var div = document.createElement('div');
	id = id + 1;
	var activeProjectId = data.value.body.activeProject ? data.value.body.activeProject : document.getElementById("project").options[document.getElementById("project").selectedIndex].value;
	div.id = "project-div-" + id;
	div.className = "projectDiv";
	div.innerHTML =
		'<button name="projectDelete" id="projectDelete-' + id + '" type="button" class="' + (activeProjectId == data.id ? 'delete disabled' : 'delete') + '" title="' + (activeProjectId == data.id ? "Aktywnego projektu nie można usunąć" : "Usuń projekt") + '">-</button> ' +
		'<input type="text"' + (data ? ' value="' + data.value.name + '" ' : " ") + 'class="disable" id="projectName-' + id + '" name="projectName" size="64" maxlength="32" placeholder="Nazwa projektu" title="Nazwa projektu" disabled> ' +
		'<input type="text"' + (data ? ' value="' + data.id + '" ' : " ") + 'class="disable" id="projectId-' + id + '" name="projectId" size="32" maxlength="32" placeholder="Id projektu" title="id projektu" disabled hidden> ' +
		'<button name="projectExport" id="projectExport-' + id + '" type="button" title="Eksportuj projekt">Eksport</button> ' +
		'<button name="projectEdit" id="projectEdit-' + id + '" type="button" title="Edytuj projekt">Edycja</button> ' +
		'<label id="projectErrorLabel-' + id + '" class="errorLabel"></label>';

	projectElements.appendChild(div);

	if (activeProjectId != data.id) {
		document.getElementById("projectDelete-" + (id)).addEventListener("click", function () { showDeleteProjectModal(div); });
	}
	document.getElementById("projectExport-" + (id)).addEventListener("click", function () { projectExport(data.id); });
	document.getElementById("projectEdit-" + (id)).addEventListener("click", function () { showEditProjectModal(data.id); });

	//projectElements.scrollTop = projectElements.scrollHeight;
}
function addElement(elementType, data) {
	if (elementType == "checkbox") {
		addCheckboxElement(elementType, data);
	} else if (elementType == "radio") {
		addRadioElement(elementType, data);
	} else if (elementType == "select") {
		addSelectElement(elementType, data);
	}
}

function addSelectElement(elementType, data) {
	var elementsDiv = document.getElementById("elements");
	var elements = document.getElementsByName("elementType");
	var id;
	if (elements.length > 0) {
		var elementsCount = elements.length;
		var lastId = elements[elementsCount - 1].id;
		var parts = lastId.split('-', 2);
		id = parseInt(parts[1]);
	} else {
		id = 0;
	}
	var div = document.createElement('div');
	id = id + 1;
	div.id = "element-div-" + id;
	div.className = "elementDiv";

	div.innerHTML =
		'<button name="elementDelete" class="delete" id="elementDelete-' + id + '" type="button" title="Usuń element">-</button> ' +
		'<input id="elementType-' + id + '" name="elementType" type="text" class="disable center" size="8" title="Typ elementu" value="' + elementType + '" placeholder="Typ elementu" disabled> ' +
		'<select id="identityType-' + id + '" name="identityType" class="data"' + (data ? ' value="' + data.identityType + '" ' : " ") + 'title="Sposób identyfikacji elementu">' +
		'<option value="id">ID</option>' +
		'</select> ' +
		'<input id="identityValue-' + id + '" name="identityValue" type="text" class="enable" size="32" maxlength="255"' + (data ? ' value="' + data.identity + '" ' : " ") + 'placeholder="Identyfikatory elementów" title="Identyfikatory elementów - długość minimalna: 1 znak / długość maksymalna: 255 znaków"> ' +
		'<select id="valueSelect-' + id + '" name="valueSelect" class="data"' + (data ? ' value="' + data.value + '" ' : " ") + 'title="Sposób wybierania opcji">' +
		'<option value="choosen">wybrany</option>' +
		'<option value="random">losowy</option>' +
		'</select> ' +
		'<select id="typeSelect-' + id + '" name="typeSelect" class="data"' + (data ? ' value="' + data.type + '" ' : " ") + 'title="Typ obsługi pola">' +
		'<option value="value">przez wartość</option>' +
		'</select> ' +
		'<input id="optionsSelect-' + id + '" name="optionsSelect" type="text" class="enable" size="64" maxlength="255"' + (data ? ' value="' + data.options + '" ' : " ") + 'placeholder="Wybierane opcje" title="Wybierane opcje - długość minimalna: 1 znak / długość maksymalna: 255 znaków"> ' +
		'<img src="icons/info_16.png" style="vertical-align: middle" title="' +
		'Typ elementu - typ elementu który będzie autouzupełniany.&#013;' +
		'Sposób identyfikacji elementu - sposób indentyfikacji używany do rozpoznania elementu podczas autouzupełniania.&#013;' +
		'Identyfikatory elementów - wartości identyfikatorów (rozdzielone przecinkami) umożliwiające rozpoznanie elementów dla funkcji autouzupełniania, np.: id1,id2...&#013;' +
		'Sposób wybierania opcji - sposób wybierania opcji dla rozpoznanego elementu podczas autouzupełniania.&#013;' +
		'Typ obsługi pola - typ obsługi dla rozpoznanego elementu podczas ustawiania wartości.&#013;' +
		'Wybierane opcje - wybierane opcje (rozdzielone przecinkami dla select-multiple) dla rozpoznanego elementu podczas autouzupełniania."/><br/>' +
		'<label id="elementErrorLabel-' + id + '" class="errorLabel"></label>';
	elementsDiv.appendChild(div);
	if (data) {
		document.getElementById('identityType-' + id).value = data.identityType;
		document.getElementById('valueSelect-' + id).value = data.value;
		document.getElementById('typeSelect-' + id).value = data.type;
	}
	document.getElementById("elementDelete-" + (id)).addEventListener("click", function () { showDeleteElementModal(div); });
}

function addCheckboxElement(elementType, data) {
	var elementsDiv = document.getElementById("elements");
	var elements = document.getElementsByName("elementType");
	var id;
	if (elements.length > 0) {
		var elementsCount = elements.length;
		var lastId = elements[elementsCount - 1].id;
		var parts = lastId.split('-', 2);
		id = parseInt(parts[1]);
	} else {
		id = 0;
	}
	var div = document.createElement('div');
	id = id + 1;
	div.id = "element-div-" + id;
	div.className = "elementDiv";

	div.innerHTML =
		'<button name="elementDelete" class="delete" id="elementDelete-' + id + '" type="button" title="Usuń element">-</button> ' +
		'<input id="elementType-' + id + '" name="elementType" type="text" class="disable center" size="8" title="Typ elementu" value="' + elementType + '" placeholder="Typ elementu" disabled> ' +
		'<select id="identityType-' + id + '" name="identityType" class="data"' + (data ? ' value="' + data.identityType + '" ' : " ") + 'title="Sposób identyfikacji elementu">' +
		'<option value="id">ID</option>' +
		'</select> ' +
		'<input id="identityValue-' + id + '" name="identityValue" type="text" class="enable" size="32" maxlength="255"' + (data ? ' value="' + data.identity + '" ' : " ") + 'placeholder="Identyfikatory elementów" title="Identyfikatory elementów - długość minimalna: 1 znak / długość maksymalna: 255 znaków"> ' +
		'<select id="valueSelect-' + id + '" name="valueSelect" class="data"' + (data ? ' value="' + data.value + '" ' : " ") + 'title="Ustawiana wartość">' +
		'<option value="checked">zaznaczony</option>' +
		'<option value="unchecked">odznaczony</option>' +
		'<option value="random">losowy</option>' +
		'</select> ' +
		'<select id="typeSelect-' + id + '" name="typeSelect" class="data"' + (data ? ' value="' + data.type + '" ' : " ") + 'title="Typ obsługi pola">' +
		'<option value="click">przez klik</option>' +
		'<option value="value">przez wartość</option>' +
		'</select> ' +
		'<img src="icons/info_16.png" style="vertical-align: middle" title="' +
		'Typ elementu - typ elementu który będzie autouzupełniany.&#013;' +
		'Sposób identyfikacji elementu - sposób indentyfikacji używany do rozpoznania elementu podczas autouzupełniania.&#013;' +
		'Identyfikatory elementów - wartości identyfikatorów (rozdzielone przecinkami) umożliwiające rozpoznanie elementów dla funkcji autouzupełniania, np.: id1,id2...&#013;' +
		'Ustawiana wartość - ustawiana wartość dla rozpoznanego elementu podczas autouzupełniania.&#013;' +
		'Typ obsługi pola - typ obsługi dla rozpoznanego elementu podczas ustawiania wartości."/><br/>' +
		'<label id="elementErrorLabel-' + id + '" class="errorLabel"></label>';
	elementsDiv.appendChild(div);
	if (data) {
		document.getElementById('identityType-' + id).value = data.identityType;
		document.getElementById('valueSelect-' + id).value = data.value;
		document.getElementById('typeSelect-' + id).value = data.type;
	}
	document.getElementById("elementDelete-" + (id)).addEventListener("click", function () { showDeleteElementModal(div); });
}
// ----Add data information for CSV----
function addDataInformation(data, id) {
	var dataOptions = document.getElementById(id);
	dataOptions.innerHTML = "";
	
	var table = document.createElement('table');
	table.style = "border: 1px solid black; border-collapse: collapse;";
	
	var tr = document.createElement('tr');

	for (i = 0; i < data.length; i += 1) {
		// var span = document.createElement('span');
		// span.appendChild(document.createTextNode(" | "));

		// var label = document.createElement('label')
		// label.htmlFor = data[i];
		// label.appendChild(document.createTextNode(data[i]));

		// dataOptions.appendChild(label);

		// if (i + 1 < data.length) {
		// 	dataOptions.appendChild(span);
		// }

		var th = document.createElement('td');
		th.style = "border: 1px solid black; padding: 5px;";
		th.innerHTML = data[i];

		tr.appendChild(th);
	}

	table.appendChild(tr);
	dataOptions.appendChild(table);
}
function setUserData(userdData) {
	var dataElements = document.getElementById("dataElements");
	while (dataElements.firstChild) {
		dataElements.removeChild(dataElements.firstChild);
	}
	for (var i = 0; i < userdData.length; i++) {
		addDataElement(userdData[i]);
	}
}
function setUserElements(userElements) {
	var elements = document.getElementById("elements");
	while (elements.firstChild) {
		elements.removeChild(elements.firstChild);
	}
	for (var i = 0; i < userElements.length; i++) {
		addElement(userElements[i].elementType, userElements[i]);
	}
}
function clearCsvFile() {
	document.getElementById("csvFile").value = "";
	document.getElementById("csvFileSeparator").value = "coma";
	document.getElementById("csvFileContent").value = "";
	document.getElementById("dataFile").innerHTML = "";
	document.getElementById("csvOffsetStart").value = 1;
	document.getElementById("csvOffsetEnd").value = 1;
	document.getElementById("csvOffsetActual").value = 1;
	document.getElementById("csvOffsetActualValue").value = 1;
	document.getElementById("csvOffsetActualValueLabel").innerHTML = 1;

	csvFileName = "";
	csvFileContent = "";
	csvOffsetStart = 1;
	csvOffsetEnd = 1;
	csvOffsetActual = 1;
	csvOffsetActualValue = 1;
	csvEOF = true;

	hideElement(document.getElementById("csvErrorLabel"));
	document.getElementById('csvErrorLabel').innerHTML = "";
	document.getElementById("csvSettings").style.border = "1px solid #cecece";

	hideElement(document.getElementById("readedFile"));
}
function setCsvData() {
	if (document.getElementById("csvFileContent").value != "undefined" && document.getElementById("csvFileContent").value.length > 0) {
		showElement(document.getElementById("readedFile"));
		var contentData = document.getElementById("csvFileContent").value.split(/\r?\n|\r/);
		var namesData = contentData[0].split(document.getElementById("csvFileSeparator").value=="semicolon" ? ";" : ",");

		contentData = contentData.slice(1, contentData.length);

		addDataInformation(namesData, "dataOptions");
		addSelectOptions(contentData.length, "csvOffsetStart");
		addSelectOptions(contentData.length, "csvOffsetEnd");

		document.getElementById("dataFile").innerHTML = (document.getElementById("csvFileName").value.length > 32 ? document.getElementById("csvFileName").value.substring(0, 32) : document.getElementById("csvFileName").value) + "...";
		document.getElementById("dataFile").title = document.getElementById("csvFileName").value;

		var dataCount = document.getElementById("dataCount");
		dataCount.innerHTML = contentData.length;
	} else {
		hideElement(document.getElementById("readedFile"));
	}
}
function uploadCsvFile() {
	document.getElementById("csvSettings").style.border = "1px solid #cecece";
	var csvFile = document.getElementById("csvFile").files[0];
	if (csvFile) {
		if (csvFile.size > 0) {
			if (csvFile.size < 256000) {
				var fileReader = new FileReader();
				fileReader.onload = function (fileLoadedEvent) {
					var csvFileContent = fileLoadedEvent.target.result;

					var rowCount = 0;
					var error = 0;
					var array = csvFileContent.split(/\r?\n|\r/);
					if (array.length > 1) {
						for (var index = 0; index < array.length; index++) {

							var element = array[index].split(document.getElementById("csvFileSeparator").value=="semicolon" ? ";" : ",");
							if (element.length != rowCount && index > 0) {
								error = 1;
								break;
							} else {
								rowCount = element.length;
							}
						}
					} else {
						error = 1;
					}

					if (error == 0) {

						var actualOffset = new Array(array[0].split(document.getElementById("csvFileSeparator").value=="semicolon" ? ";" : ",").length);
						actualOffset.fill("0");

						document.getElementById("dataFile").innerHTML = document.getElementById("csvFileName").value = csvFile.name;
						document.getElementById("csvFileContent").value = csvFileContent;
						document.getElementById("csvOffsetActual").value = actualOffset;

						setCsvData();
						
						document.getElementById("csvOffsetStart").value = 1;
						document.getElementById("csvOffsetEnd").value = array.length - 1;

						document.getElementById("csvOffsetActualValue").value = 1;
						document.getElementById("csvOffsetActualValueLabel").innerHTML = "1";

						document.getElementById("csvEOF").checked = true;

						hideElement(document.getElementById("csvErrorLabel"));
						document.getElementById('csvErrorLabel').innerHTML = "";
					} else {
						showElement(document.getElementById("csvErrorLabel"));
						document.getElementById("csvSettings").style.border = "1px solid red";
						document.getElementById('csvErrorLabel').innerHTML = "Plik '" + csvFile.name + "' nie został wczytany, ponieważ posiada niewłaściwą strukturę. Akceptowany separator danych to przecinek lub średnik, akceptowany separator końca linii to znak końca linii. Liczba danych dla każdego wiersza musi być taka sama. Dopuszczone kodowanie pliku to UTF-8.";
					}
				};

				fileReader.readAsText(csvFile, "UTF-8");

			} else {
				showElement(document.getElementById("csvErrorLabel"));
				document.getElementById("csvSettings").style.border = "1px solid red";
				document.getElementById('csvErrorLabel').innerHTML = "Plik '" + csvFile.name + "' nie został wczytany, ponieważ posiada za duży rozmiar. Maksymalny możliwy rozmiar pliku to 250 KB.";
			}
		} else {
			showElement(document.getElementById("csvErrorLabel"));
			document.getElementById("csvSettings").style.border = "1px solid red";
			document.getElementById('csvErrorLabel').innerHTML = "Plik '" + csvFile.name + "' nie został wczytany ponieważ jest pusty.";
		}
	}
}
//----- OPTIONS SERVICE -----

function validateShortKeyOptions(e) {

	document.getElementById("autofillFormMainKey").style.border = "";
	document.getElementById("autofillFormAdditionalKey").style.border = "";
	hideElement(document.getElementById("autofillFormErrorLabel"));

	document.getElementById("autofillFieldMainKey").style.border = "";
	document.getElementById("autofillFieldAdditionalKey").style.border = "";
	hideElement(document.getElementById("autofillFieldErrorLabel"));

	document.getElementById("resetFormMainKey").style.border = "";
	document.getElementById("resetFormAdditionalKey").style.border = "";
	hideElement(document.getElementById("resetFormErrorLabel"));

	var validateShortKeyAutofillForm = validateShortKeyAutofillFormOptions(e);
	var validateShortKeyAutofillField = validateShortKeyAutofillFieldOptions(e);
	var validateShortKeyResetForm = validateShortKeyResetFormOptions(e);

	if (validateShortKeyAutofillForm && validateShortKeyAutofillField && validateShortKeyResetForm){
		saveMainTestDataGeneratorOptions(e);
	}
}

function validateShortKeyAutofillFormOptions(e) {
	var elemID = e.target.id;

	var fillAll = document.getElementById('autofillFormMainKey').value + "" + document.getElementById('autofillFormAdditionalKey').value;
	var fillSingle = document.getElementById('autofillFieldMainKey').value + "" + document.getElementById('autofillFieldAdditionalKey').value;
	var resetForm = document.getElementById('resetFormMainKey').value + "" + document.getElementById('resetFormAdditionalKey').value;

	if (fillAll == fillSingle || fillAll == resetForm) {
		document.getElementById("autofillFormMainKey").style.border = "2px solid red";
		document.getElementById("autofillFormAdditionalKey").style.border = "2px solid red";
		showElement(document.getElementById("autofillFormErrorLabel"));
		return false;
	} else {
		return true;
	}
}

function validateShortKeyAutofillFieldOptions(e) {
	var elemID = e.target.id;

	var fillAll = document.getElementById('autofillFormMainKey').value + "" + document.getElementById('autofillFormAdditionalKey').value;
	var fillSingle = document.getElementById('autofillFieldMainKey').value + "" + document.getElementById('autofillFieldAdditionalKey').value;
	var resetForm = document.getElementById('resetFormMainKey').value + "" + document.getElementById('resetFormAdditionalKey').value;

	if (fillSingle == fillAll || fillSingle == resetForm) {
		document.getElementById("autofillFieldMainKey").style.border = "2px solid red";
		document.getElementById("autofillFieldAdditionalKey").style.border = "2px solid red";
		showElement(document.getElementById("autofillFieldErrorLabel"));
		return false;
	} else {
		return true;
	}
}

function validateShortKeyResetFormOptions(e) {
	var elemID = e.target.id;

	var fillAll = document.getElementById('autofillFormMainKey').value + "" + document.getElementById('autofillFormAdditionalKey').value;
	var fillSingle = document.getElementById('autofillFieldMainKey').value + "" + document.getElementById('autofillFieldAdditionalKey').value;
	var resetForm = document.getElementById('resetFormMainKey').value + "" + document.getElementById('resetFormAdditionalKey').value;

	if (resetForm == fillAll || resetForm == fillSingle) {
		document.getElementById("resetFormMainKey").style.border = "2px solid red";
		document.getElementById("resetFormAdditionalKey").style.border = "2px solid red";
		showElement(document.getElementById("resetFormErrorLabel"));
		return false;
	} else {
		return true;
	}
}

function saveAllDataService() {
	saveMainOptions();
	saveNipOptions();
	saveRegonOptions();
	savePeselOptions();
	saveIdentityCardOptions();
	saveIbanOptions();
	saveCardOptions();
	saveKrsOptions();
	saveEanOptions();
	saveTextOptions();
	saveSignsOptions();
	saveCsvOptions();
	saveDataOptions();
	saveElementsOptions();
}
function saveMainTestDataGeneratorOptions(e) {
	if (e) { e.preventDefault(); }
	disableEnableFields();
	if (saveMainOptions()) {
		if (!document.getElementById("projectManagement").disabled) {
			saveActiveProject();
			getAllDataFromStorage(function (result) {
				var id = document.getElementById("project").options[document.getElementById("project").selectedIndex].value;
				updateProjectFromDB(id, null, result, function (event) {
					fillProjectSelectOption(id, function () {
						console.log("Projekty na liście zostały uzupełnione");
					});
				});
			});
		}
	}
}
function saveTestDataGeneratorOptions(e) {
	if (e) { e.preventDefault(); }
	var result = true;
	result = (saveNipOptions() && result) ? true : false;
	result = (saveRegonOptions() && result) ? true : false;
	result = (savePeselOptions() && result) ? true : false;
	result = (saveIdentityCardOptions() && result) ? true : false;
	result = (saveIbanOptions() && result) ? true : false;
	result = (saveCardOptions() && result) ? true : false;
	result = (saveKrsOptions() && result) ? true : false;
	result = (saveEanOptions() && result) ? true : false;
	result = (saveTextOptions() && result) ? true : false;
	result = (saveSignsOptions() && result) ? true : false;
	result = (saveCsvOptions() && result) ? true : false;
	result = (saveDataOptions() && result) ? true : false;
	result = (saveElementsOptions() && result) ? true : false;
	validateAndSave(result);
}
function validateAndSave(validationResult) {
	var validation = false;
	if (validationResult) {
		validation = true;
	}
	showValidationMessage(validation);
}
function showValidationMessage(validation) {
	var modal = document.getElementById('mainModal');
	disableScrolling();
	if (validation) {

		if (!document.getElementById("projectManagement").disabled) {
			saveActiveProject();

			getAllDataFromStorage(function (result) {
				updateProjectFromDB(document.getElementById("project").options[document.getElementById("project").selectedIndex].value, null, result, function () {
					modal.style.display = "block";
					document.getElementById('mainLabel').innerHTML = "Ustawienia zostały zapisane.";
					hideElement(document.getElementById("mainErrorLabel"));
					showElement(document.getElementById("mainLabel"));
					document.getElementById("closeButton").focus();
				});
			});
		} else {
			modal.style.display = "block";
			document.getElementById('mainLabel').innerHTML = "Ustawienia zostały zapisane.";
			hideElement(document.getElementById("mainErrorLabel"));
			showElement(document.getElementById("mainLabel"));
			document.getElementById("closeButton").focus();
		}
	} else {
		modal.style.display = "block";
		document.getElementById('mainErrorLabel').innerHTML = "Błędnie uzupełnione dane.</br>Ustawienia nie zostały zapisane.";
		hideElement(document.getElementById("mainLabel"));
		showElement(document.getElementById("mainErrorLabel"));
		document.getElementById("closeButton").focus();
	}
}
function drag(e) {
	e.dataTransfer.setData("text/plain", e.target.innerHTML);
}
function download(filename, text) {
	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	element.setAttribute('download', filename);

	element.style.display = 'none';
	document.body.appendChild(element);

	element.click();

	document.body.removeChild(element);
}
function changeProject(e) {
	var element = e.target;
	var keyId = element.options[element.selectedIndex].value;

	saveActiveProject();
	getProjectFromDB(keyId, function (result) {
		if (result && Object.keys(result).length > 0) {
			fillMainForm(result.body);
			fillForm(result.body);
		}
	});

	// TODO: zmiana projektu
}
// ----Get user data from FORM----
function getUserData() {
	var divElements = document.getElementById("dataElements").children;

	var userData = [];
	for (i = 0; i < divElements.length; i++) {
		var elements = divElements[i].children;
		//var id = divElements[i].id;
		var elementsData = [];
		var index = 0;
		for (j = 0; j < elements.length; j++) {
			if (elements[j].tagName == 'INPUT') {
				elements[j].value = elements[j].value.trim();
				elementsData[index] = elements[j].value.trim();
				index += 1;
			}
		}
		userData[i] = elementsData;
	}

	return userData;
}
// ----Get user elements from FORM----
function getUserElements() {
	var divElements = document.getElementById("elements").children;

	var userElements = [];
	for (i = 0; i < divElements.length; i++) {
		var elements = divElements[i].children;
		var elementsData;
		if (elements[1].value=="checkbox") {
			elementsData = {
				elementType: elements[1].value,
				identityType: elements[2].value,
				identity: elements[3].value,
				value: elements[4].value,
				type: elements[5].value
			};
		} else if (elements[1].value=="select") {
			elementsData = {
				elementType: elements[1].value,
				identityType: elements[2].value,
				identity: elements[3].value,
				value: elements[4].value,
				type: elements[5].value,
				options: elements[6].value
			};
		}

		userElements[i] = elementsData;
	}

	return userElements;
}
// ----Add select options for CSV----
function addSelectOptions(length, id) {
	var select = document.getElementById(id);
	select.innerHTML = "";
	for (i = 1; i <= length; i += 1) {
		option = document.createElement("option");
		option.value = option.text = i;
		select.add(option);
	}
}
// ----Update select options for CSV----
function updateStartSelectOptions() {
	var csvOffsetStartValue = document.getElementById("csvOffsetStart").value;
	var csvOffsetEndValue = document.getElementById("csvOffsetEnd").value;
	if (parseInt(csvOffsetStartValue) > parseInt(csvOffsetEndValue)) {
		document.getElementById("csvOffsetEnd").value = document.getElementById("csvOffsetStart").value;
	}
	var actualOffset = new Array(document.getElementById("csvFileContent").value.split(/\r?\n|\r/)[0].split(document.getElementById("csvFileSeparator").value=="semicolon" ? ";" : ",").length);
	actualOffset.fill("0");
	document.getElementById("csvOffsetActual").value = actualOffset;
	document.getElementById("csvOffsetActualValue").value = document.getElementById("csvOffsetStart").value;
	document.getElementById("csvOffsetActualValueLabel").innerHTML = document.getElementById("csvOffsetStart").value;
}
// ----Update select options for CSV----
function updateEndSelectOptions() {
	var csvOffsetStartValue = document.getElementById("csvOffsetStart").value;
	var csvOffsetEndValue = document.getElementById("csvOffsetEnd").value;
	if (parseInt(csvOffsetStartValue) > parseInt(csvOffsetEndValue)) {
		document.getElementById("csvOffsetStart").value = document.getElementById("csvOffsetEnd").value;
	}

	var actualOffset = new Array(document.getElementById("csvFileContent").value.split(/\r?\n|\r/)[0].split(document.getElementById("csvFileSeparator").value=="semicolon" ? ";" : ",").length);
	actualOffset.fill("0");

	document.getElementById("csvOffsetActual").value = actualOffset;
	document.getElementById("csvOffsetActualValue").value = document.getElementById("csvOffsetStart").value;
	document.getElementById("csvOffsetActualValueLabel").innerHTML = document.getElementById("csvOffsetStart").value;
}
// ----Delete data element from FORM----
function deleteElement(element) {
	element.outerHTML = "";
	delete element;
}

//document.getElementsByClassName("modal-main")[0].style.height = Math.round(document.documentElement.clientHeight - (document.documentElement.clientHeight * 0.2)) + "px";

// ZAKŁADKI DO DANYCH UŻYTKOWNIKA
// if (document.getElementById("showBaseGeneratedData")) {
// 	document.getElementById("showBaseGeneratedData").addEventListener("click", function (event) {showGeneratedData(event, "baseGeneratedData")});
// 	document.getElementById("showBaseGeneratedData").click();
// }

// function showGeneratedData(evt, type) {
// 	var i, tabcontent, tablinks;
  
// 	tabcontent = document.getElementsByClassName("tabcontent");
// 	for (i = 0; i < tabcontent.length; i++) {
// 	  tabcontent[i].style.display = "none";
// 	}
  
// 	tablinks = document.getElementsByClassName("tablinks");
// 	for (i = 0; i < tablinks.length; i++) {
// 	  tablinks[i].className = tablinks[i].className.replace(" active", "");
// 	}
  
// 	document.getElementById(type).style.display = "block";
// 	evt.currentTarget.className += " active";
//   } 

function addTagify(input) {
	if (input.previousElementSibling) {
		input.previousElementSibling.remove();
	}
	tagify = new Tagify(input);
}

function getAttributesAsString(jsonObject){
	values = JSON.parse(jsonObject);

	var attributes = [];
	for (index = 0; index < values.length; index++) {
		attributes[index] = values[index].value;
	}

	return attributes.join();
}