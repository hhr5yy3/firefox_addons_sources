var fillType;
var clipboard;
var typeMethod;
var autofillType;
var matchType;
var csvFileContent;
var csvFileSeparator;
var csvOffsetStart;
var csvOffsetEnd;
var csvOffsetActual;
var csvOffsetActualValue;
var csvEOF;
var attributesNip;
var attributesRegon;
var attributesPesel;
var attributesIdentityCard;
var attributesIban;
var attributesCard;
var attributesKrs;
var attributesEan;
var userData;
var userElements;
var autofillFormMainKey;
var autofillFormAdditionalKey;
var autofillFieldMainKey;
var autofillFieldAdditionalKey;
var resetFormMainKey;
var resetFormAdditionalKey;

var TYPES = ['email', 'password', 'tel', 'text', 'search', 'url'];
var TAGS = ['input', 'textarea'];
var ATTRIBUTES = ['id', 'name', 'type', 'role', 'alt', 'title', 'placeholder', 'label'];

var gettingItem = chrome.storage.local.get(null, function (result) {
	saveStorageData(result);
});

function saveStorageData(result) {
	fillType = result.fillType ? result.fillType : "new";
	clipboard = result.clipboard ? result.clipboard : "no";
	typeMethod = result.typeMethod ? result.typeMethod : "keys";
	autofillType = result.autofillType ? result.autofillType : "generated";
	matchType = result.matchType ? result.matchType : "equals";
	csvFileContent = result.csvFileContent ? result.csvFileContent : "";
	csvFileSeparator = result.csvFileSeparator ? result.csvFileSeparator : "coma";
	csvOffsetStart = result.csvOffsetStart ? result.csvOffsetStart : 1;
	csvOffsetEnd = result.csvOffsetEnd ? result.csvOffsetEnd : 1;
	csvOffsetActual = result.csvOffsetActual ? result.csvOffsetActual : "";
	csvOffsetActualValue = result.csvOffsetActualValue ? result.csvOffsetActualValue : 1;
	csvEOF = result.csvEOF == 1 || result.csvEOF == 0 ? result.csvEOF : 1;
	attributesNip = result.attributesNip ? result.attributesNip : "nip,numer_nip";
	attributesRegon = result.attributesRegon ? result.attributesRegon : "regon,numer_regon";
	attributesPesel = result.attributesPesel ? result.attributesPesel : "pesel,numer_pesel";
	attributesIdentityCard = result.attributesIdentityCard ? result.attributesIdentityCard : "dowod,dowod_osobisty";
	attributesIban = result.attributesIban ? result.attributesIban : "iban,numer_konta";
	attributesCard = result.attributesCard ? result.attributesCard : "karta,karta_kredytowa";
	attributesKrs = result.attributesKrs ? result.attributesKrs : "krs,numer_krs";
	attributesEan = result.attributesEan ? result.attributesEan : "ean,numer_ean";
	userData = result.userData ? result.userData : "";
	userElements = result.userElements ? result.userElements : "";
	autofillFormMainKey = result.autofillFormMainKey ? result.autofillFormMainKey : "18";
	autofillFormAdditionalKey = result.autofillFormAdditionalKey ? result.autofillFormAdditionalKey : "65";
	autofillFieldMainKey = result.autofillFieldMainKey ? result.autofillFieldMainKey : "18";
	autofillFieldAdditionalKey = result.autofillFieldAdditionalKey ? result.autofillFieldAdditionalKey : "83";
	resetFormMainKey = result.resetFormMainKey ? result.resetFormMainKey : "18";
	resetFormAdditionalKey = result.resetFormAdditionalKey ? result.resetFormAdditionalKey : "82";
}

chrome.storage.onChanged.addListener(function (changes, namespace) {
	if (changes.fillType) {
		fillType = changes.fillType.newValue;
	}
	if (changes.clipboard) {
		clipboard = changes.clipboard.newValue;
	}
	if (changes.typeMethod) {
		typeMethod = changes.typeMethod.newValue;
	}
	if (changes.autofillType) {
		autofillType = changes.autofillType.newValue;
	}
	if (changes.matchType) {
		matchType = changes.matchType.newValue;
	}
	if (changes.csvFileContent) {
		csvFileContent = changes.csvFileContent.newValue;
	}
	if (changes.csvFileSeparator) {
		csvFileSeparator = changes.csvFileSeparator.newValue;
	}
	if (changes.csvOffsetStart) {
		csvOffsetStart = changes.csvOffsetStart.newValue;
	}
	if (changes.csvOffsetEnd) {
		csvOffsetEnd = changes.csvOffsetEnd.newValue;
	}
	if (changes.csvOffsetActual) {
		csvOffsetActual = changes.csvOffsetActual.newValue;
	}
	if (changes.csvOffsetActualValue) {
		csvOffsetActualValue = changes.csvOffsetActualValue.newValue;
	}
	if (changes.csvEOF) {
		csvEOF = changes.csvEOF.newValue;
	}
	if (changes.attributesNip) {
		attributesNip = changes.attributesNip.newValue;
	}
	if (changes.attributesRegon) {
		attributesRegon = changes.attributesRegon.newValue;
	}
	if (changes.attributesPesel) {
		attributesPesel = changes.attributesPesel.newValue;
	}
	if (changes.attributesIdentityCard) {
		attributesIdentityCard = changes.attributesIdentityCard.newValue;
	}
	if (changes.attributesIban) {
		attributesIban = changes.attributesIban.newValue;
	}
	if (changes.attributesCard) {
		attributesCard = changes.attributesCard.newValue;
	}
	if (changes.attributesKrs) {
		attributesKrs = changes.attributesKrs.newValue;
	}
	if (changes.attributesEan) {
		attributesEan = changes.attributesEan.newValue;
	}
	if (changes.userData) {
		userData = changes.userData.newValue;
	}
	if (changes.userElements) {
		userElements = changes.userElements.newValue;
	}
	if (changes.autofillFormMainKey) {
		autofillFormMainKey = changes.autofillFormMainKey.newValue;
	}
	if (changes.autofillFormAdditionalKey) {
		autofillFormAdditionalKey = changes.autofillFormAdditionalKey.newValue;
	}
	if (changes.autofillFieldMainKey) {
		autofillFieldMainKey = changes.autofillFieldMainKey.newValue;
	}
	if (changes.autofillFieldAdditionalKey) {
		autofillFieldAdditionalKey = changes.autofillFieldAdditionalKey.newValue;
	}
	if (changes.resetFormMainKey) {
		resetFormMainKey = changes.resetFormMainKey.newValue;
	}
	if (changes.resetFormAdditionalKey) {
		resetFormAdditionalKey = changes.resetFormAdditionalKey.newValue;
	}
});

function prepareData(data) {

	var numberCheck = true;
	while (numberCheck) {
		if (/%{1}randomNumber:[0-9]+%{1}/.test(data)) {
			var length = data.match(/%{1}randomNumber:([0-9]+)%{1}/)[1];
			data = data.replace(/%{1}randomNumber:[0-9]+%{1}/, generateRandomNumber(length));
		} else {
			numberCheck = false;
		}
	}

	var stringCheck = true;
	while (stringCheck) {
		if (/%{1}randomString:[0-9]+%{1}/.test(data)) {
			var randomStringLength = data.match(/%{1}randomString:([0-9]+)%{1}/)[1];
			data = data.replace(/%{1}randomString:[0-9]+%{1}/, generateRandomString(randomStringLength));
		} else {
			stringCheck = false;
		}
	}

	var numberStringCheck = true;
	while (numberStringCheck) {
		if (/%{1}randomNumberString:[0-9]+%{1}/.test(data)) {
			var randomNumberStringLength = data.match(/%{1}randomNumberString:([0-9]+)%{1}/)[1];
			data = data.replace(/%{1}randomNumberString:[0-9]+%{1}/, generateRandomNumberString(randomNumberStringLength));
		} else {
			numberStringCheck = false;
		}
	}

	var numberHexadecimalCheck = true;
	while (numberHexadecimalCheck) {
		if (/%{1}randomHexadecimal:[0-9]+%{1}/.test(data)) {
			var randomHexadecimalLength = data.match(/%{1}randomHexadecimal:([0-9]+)%{1}/)[1];
			data = data.replace(/%{1}randomHexadecimal:[0-9]+%{1}/, generateRandomHexadecimal(randomHexadecimalLength));
		} else {
			numberHexadecimalCheck = false;
		}
	}

	var timestampCheck = true;
	while (timestampCheck) {
		if (/%{1}timestamp%{1}/.test(data)) {
			data = data.replace(/%{1}timestamp%{1}/, Date.now());
		} else {
			timestampCheck = false;
		}
	}

	var randomFirstnameCheck = true;
	while (randomFirstnameCheck) {
		if (/%{1}randomFirstname%{1}/.test(data)) {
			data = data.replace(/%{1}randomFirstname%{1}/, generateFirstname());
		} else {
			randomFirstnameCheck = false;
		}
	}

	var maleFirstnameCheck = true;
	while (maleFirstnameCheck) {
		if (/%{1}maleFirstname%{1}/.test(data)) {
			data = data.replace(/%{1}maleFirstname%{1}/, generateMaleFirstname());
		} else {
			maleFirstnameCheck = false;
		}
	}

	var femaleFirstnameCheck = true;
	while (femaleFirstnameCheck) {
		if (/%{1}femaleFirstname%{1}/.test(data)) {
			data = data.replace(/%{1}femaleFirstname%{1}/, generateFemaleFirstname());
		} else {
			femaleFirstnameCheck = false;
		}
	}

	var randomSurnameCheck = true;
	while (randomSurnameCheck) {
		if (/%{1}randomSurname%{1}/.test(data)) {
			data = data.replace(/%{1}randomSurname%{1}/, generateSurname());
		} else {
			randomSurnameCheck = false;
		}
	}

	var maleSurnameCheck = true;
	while (maleSurnameCheck) {
		if (/%{1}maleSurname%{1}/.test(data)) {
			data = data.replace(/%{1}maleSurname%{1}/, generateMaleSurname());
		} else {
			maleSurnameCheck = false;
		}
	}

	var femaleSurnameCheck = true;
	while (femaleSurnameCheck) {
		if (/%{1}femaleSurname%{1}/.test(data)) {
			data = data.replace(/%{1}femaleSurname%{1}/, generateFemaleSurname());
		} else {
			femaleSurnameCheck = false;
		}
	}

	var cityCheck = true;
	while (cityCheck) {
		if (/%{1}city%{1}/.test(data)) {
			data = data.replace(/%{1}city%{1}/, generateCity());
		} else {
			cityCheck = false;
		}
	}

	var streetCheck = true;
	while (streetCheck) {
		if (/%{1}street%{1}/.test(data)) {
			data = data.replace(/%{1}street%{1}/, generateStreet());
		} else {
			streetCheck = false;
		}
	}
	return data;
}

function getKeywords() {
	var userDataKeywords = getUserDataKeywords();
	var defaultKeywords = getDefaultKeywords();

	return defaultKeywords.concat(userDataKeywords);
}

function getUserDataKeywords() {
	var data = [];

	for (var i = 0; i < userData.length; i++) {
		var elements = userData[i];
		data.push({ name: elements[0], value: elements[1], attriubutes: elements[2] });
	}

	return data;
}

function getDefaultKeywords() {
	var keywords = [];
	keywords.push({ "nip": attributesNip });
	keywords.push({ "regon": attributesRegon });
	keywords.push({ "pesel": attributesPesel });
	keywords.push({ "identityCard": attributesIdentityCard });
	keywords.push({ "iban": attributesIban });
	keywords.push({ "card": attributesCard });
	keywords.push({ "krs": attributesKrs });
	keywords.push({ "ean": attributesEan });
	return keywords;
}

document.addEventListener('keydown', shortKey.bind(this, document), false);

function shortKey(doc, e) {
	if (e.keyCode == autofillFormAdditionalKey) {
		if (autofillFormMainKey == "17") {
			if (!e.shiftKey && e.ctrlKey && !e.altKey) {
				allFieldsService("fill");
			}
		} else if (autofillFormMainKey == "18") {
			if (!e.shiftKey && !e.ctrlKey && e.altKey) {
				allFieldsService("fill");
			}
		}
	} else if (e.keyCode == autofillFieldAdditionalKey) {
		if (autofillFieldMainKey == "17") {
			if (!e.shiftKey && e.ctrlKey && !e.altKey) {
				fillSingleField(doc);
			}
		} else if (autofillFieldMainKey == "18") {
			if (!e.shiftKey && !e.ctrlKey && e.altKey) {
				fillSingleField(doc);
			}
		}
	} else if (e.keyCode == resetFormAdditionalKey) {
		if (resetFormMainKey == "17") {
			if (!e.shiftKey && e.ctrlKey && !e.altKey) {
				clearForm(doc);
			}
		} else if (resetFormMainKey == "18") {
			if (!e.shiftKey && !e.ctrlKey && e.altKey) {
				clearForm(doc);
			}
		}
	}
}

// // IFRAMES
// var iframes = document.getElementsByTagName("iframe");
// for (var iframe in iframes) {

// 	if (iframes[iframe].outerHTML) {
// 		iframes[iframe].contentWindow.document.addEventListener('keydown', shortKey.bind(this, iframes[iframe].contentWindow.document), false);
// 	}
// }

chrome.runtime.onMessage.addListener(
	function (request, sender, sendResponse) {
		if (request.action == "FILL_FIELD") {
			fillField(request.dataType, getActiveDocument());
		} else if (request.action == "CLEAR_FORM") {
			clearForm(getActiveDocument());
		} else if (request.action == "FILL_ALL_FIELDS") {
			allFieldsService("fill");
		} else if (request.action == "FILL_SINGLE_FIELD") {
			fillSingleField(getActiveDocument());
		} else if (request.action == "COUNT_ELEMENTS") {
			saveStorageData(request.data);
			sendResponse({ elementsCount: allFieldsService("count") });
		} else if (request.action == "GET_ATTRIBUTE") {
			getAttribute(request.dataType);
		}
	});


function getAttribute(attributeType) {
	if (attributeType == "getId") {
		if (document.activeElement.hasAttribute("id")) {
			if (copyAttribute(document.activeElement.id)) {
				injectMessageBox("Wartość atrybutu ID wskazanego elementu została pobrana.");
			} else {
				injectMessageBox("Nie udało się pobrać wartości atrybutu ID dla wskazanego elementu.");
			}
		} else {
			injectMessageBox("Brak atrybutu ID do pobrania we wskazanym elemencie.");
		}
	} else if (attributeType == "getName") {
		if (document.activeElement.hasAttribute("name")) {
			if (copyAttribute(document.activeElement.name)) {
				injectMessageBox("Wartość atrybutu NAME wskazanego elementu została pobrana.");
			} else {
				injectMessageBox("Nie udało się pobrać wartości atrybutu NAME dla wskazanego elementu.");
			}
		} else {
			injectMessageBox("Brak atrybutu NAME do pobrania we wskazanym elemencie.");
		}
	}
}

function copyAttribute(value) {

	var result = false;
	var tempElement = document.createElement('textarea');
	tempElement.value = value;
	document.activeElement.parentElement.appendChild(tempElement);

	tempElement.select();
	tempElement.focus();

	try {
		result = document.execCommand('copy');
	} catch (err) {
		result = false;
	}
	document.activeElement.parentElement.removeChild(tempElement);
	return result;
}

function clearForm(doc) {
	if (doc.activeElement.form) {
		var form = doc.activeElement.form;
		form.reset();
		injectMessageBox("Formularz został zresetowany.");
	} else {
		injectMessageBox("Dla aktywnego elementu nie ma formularza do zresetowania.");
	}
}

function getActiveDocument() {
	// if (document.activeElement.tagName.toLowerCase() == "iframe") {
	// 	var iframes = document.getElementsByTagName("iframe");
	// 	for (var iframe in iframes) {
	// 		if (iframes[iframe].outerHTML) {
	// 			if (iframes[iframe].contentWindow.document.activeElement) {
	// 				return iframes[iframe].contentWindow.document;
	// 			} else {
	// 				return document;
	// 			}
	// 		}
	// 	}
	// } else {
	return document;
	//}
}

function fillActiveField(element, data, defaultAction) {
	if (typeMethod == "value") {
		if (fillType == "new") {
			element.value = data;
			if (clipboard == "yes" && defaultAction) {
				element.select();
				document.execCommand("copy");
			}
		} else if (fillType == "add" && defaultAction) {
			element.value += data;
		} else {
			element.value = data;
			if (clipboard == "yes" && defaultAction) {
				element.select();
				document.execCommand("copy");
			}
		}
	} else if (typeMethod == "keys") {
		$(element).focus();
		if (fillType == "new") {
			$(element).val("");
			$(element).sendkeys(data);
			if (clipboard == "yes" && defaultAction) {
				$(element).select();
				document.execCommand("copy");
			}
		} else if (fillType == "add" && defaultAction) {
			$(element).sendkeys(data);
		} else {
			$(element).val("");
			$(element).sendkeys(data);
			if (clipboard == "yes" && defaultAction) {
				$(element).select();
				document.execCommand("copy");
			}
		}

	}
}

function saveData(csvOffsetActualValue, csvOffsetActual) {
	chrome.storage.local.set({
		csvOffsetActualValue: csvOffsetActualValue,
		csvOffsetActual: csvOffsetActual.join()
	});
}

function csvGenerate(index) {
	var allRows = csvFileContent.split(/\r?\n|\r/);

	var row = allRows[csvOffsetActualValue].split(csvFileSeparator == "semicolon" ? ";" : ",");
	var actual = csvOffsetActual.split(csvFileSeparator == "semicolon" ? ";" : ",");
	if (actual[index] == "0") {
		saveData(csvOffsetActualValue, actual.fill("1", index, parseInt(index) + 1));
		return row[parseInt(index)];
	} else {
		if (parseInt(csvOffsetActualValue) < parseInt(csvOffsetEnd)) {
			actual.fill("0");
			saveData(parseInt(csvOffsetActualValue) + 1, actual.fill("1", index, parseInt(index) + 1));
			row = allRows[parseInt(csvOffsetActualValue) + 1].split(csvFileSeparator == "semicolon" ? ";" : ",");
			return row[parseInt(index)];
		} else {
			if (csvEOF == 1) {
				actual.fill("0");
				saveData(csvOffsetStart, actual.fill("1", index, parseInt(index) + 1));
				row = allRows[csvOffsetStart].split(csvFileSeparator == "semicolon" ? ";" : ",");
				return row[parseInt(index)];
			} else {
				return "EOF";
			}
		}
	}
}

function dataGenerate(index) {
	return getUserDataKeywords()[index].value;
}

var messageDivVersion;

function injectMessageBox(message) {
	var elem = document.getElementById("generatorDanychTestowychMessageDiv");
	var timestamp = Date.now();
	if (elem === null) {
		var messageDiv = document.createElement('div');
		messageDiv.id = "generatorDanychTestowychMessageDiv";
		messageDiv.style = "z-index: 16777271; display: none; position: fixed; width: 40%; left: 30%; right: 30%; text-align: center; color: #000000; background: #ffffff; opacity:0.95; top:10px; padding: 25px; border: 2px solid #0026FF; border-radius: 6px; font-size: 18px !important;";
		messageDiv.textContent = message;
		document.body.appendChild(messageDiv);
		messageDiv.style.display = "block";
		messageDivVersion = timestamp;
	} else {
		elem.textContent = message;
		elem.style.display = "block";
		messageDivVersion = timestamp;
	}

	setTimeout(function () {
		if (messageDivVersion == timestamp) {
			var elem = document.getElementById("generatorDanychTestowychMessageDiv");
			elem.style.display = "none";
		}
	}, 2000);
}

function fillField(dataType, doc) {
	var data;

	if (dataType.substring(0, 3) == "csv") {
		data = eval("csvGenerate")(dataType.substring(3, dataType.length)).toString();
	} else if (dataType.substring(0, 4) == "data") {
		data = eval("dataGenerate")(dataType.substring(4, dataType.length)).toString();
		data = prepareData(data);
	} else {
		data = eval(dataType + "Generate")().toString();
	}

	fillActiveField(doc.activeElement, data, true);
	injectMessageBox("Wybrane pole formularza zostało uzupełnione.");
}

function allFieldsService(action) {
	var selectors = TAGS.join(", ");
	var elements = Array.from(document.querySelectorAll(selectors));
	var keywords = getKeywords();

	var elementsFilledCount = 0;

	for (var element in elements) {
		elementsFilledCount += fieldService(action, elements[element], keywords, false);
	}

	for (var elem in userElements) {
		elementsFilledCount += fieldServiceElement(action, userElements[elem], document);
	}

	// // IFRAMES
	// var iframes = document.getElementsByTagName("iframe");

	// for (var iframe in iframes) {

	// 	if (iframes[iframe].outerHTML) {

	// 		var iframeElements = Array.from(iframes[iframe].contentWindow.document.querySelectorAll(selectors));

	// 		for (var iframElement in iframeElements) {
	// 			elementsFilledCount += fieldService(action, iframeElements[iframElement], keywords, false);
	// 		}
	// 		for (var elem in userElements) {
	// 			elementsFilledCount += fieldServiceElement(action, userElements[elem], iframes[iframe].contentWindow.document);
	// 		}
	// 	}
	// }

	if (action == "fill") {
		if (allFieldsService("count") > 0) {
			// if (elementsFilledCount > 0) {
			injectMessageBox("Rozpoznane pola zostały uzupełnione.");
			// } else {
			// 	injectMessageBox("Nie udało się uzupełnić rozpoznanych pól");
			// }
		} else {
			injectMessageBox("Nie udało się rozpoznać pól do autouzupełnienia.");
		}
	}

	return elementsFilledCount;
}

function fillSingleField(doc) {
	var selectors = TAGS.join(", ");
	var element = doc.activeElement;
	var keywords = getKeywords();

	var elementsFilledCount = fieldService("fill", element, keywords, true);

	if (element.tagName.toLowerCase() == "input" || element.tagName.toLowerCase() == "textarea") {
		if (elementsFilledCount > 0) {
			injectMessageBox("Wybrane pole formularza zostało uzupełnione.");
		} else {
			injectMessageBox("Nie udało się uzupełnić wybranego pola.");
		}
	} else {
		injectMessageBox("Pole do uzupełnienia nie zostało wskazane.");
	}
}

function fieldService(serviceType, element, keywords, actionType) {
	var data;

	var elementFilled = false;
	var elementsFilledCount = 0;

	if ((element.tagName.toLowerCase() == "input" && !element.getAttribute("type")) ||
		(element.tagName.toLowerCase() == "input" && TYPES.includes(element.getAttribute("type").toLowerCase())) ||
		(element.tagName.toLowerCase() == "textarea")) {

		for (var attriubute in ATTRIBUTES) {

			if (element.hasAttribute(ATTRIBUTES[attriubute])) {

				// KEYWORDY ZBIÓR	
				for (var key in keywords) {
					var keywordType = keywords[key];
					var objectSize = Object.keys(keywordType).length;
					var keywordsSet;
					if (objectSize == 1) {
						var keywordsName = Object.keys(keywordType)[0];
						keywordsSet = Object.values(keywordType)[0].split(",");
						for (var keyword in keywordsSet) {
							if (keywordsSet[keyword].toLowerCase() != "") {
								if (matchType == "equals") {
									if (element.getAttribute(ATTRIBUTES[attriubute]).toLowerCase().replace(/\s/, " ") == keywordsSet[keyword].toLowerCase().replace(/\s/, " ")) {
										if (element.hasAttribute("type") && element.getAttribute("type").toLowerCase() != "button" || !element.hasAttribute("type")) {
											if (serviceType != "count") {
												data = eval((autofillType == "defined" ? "defined" : "correct") + keywordsName[0].toUpperCase() + keywordsName.substring(1) + "Generate")().toString();

												fillActiveField(element, data, actionType);
											}
											elementFilled = true;
											elementsFilledCount += 1;
											break;
										}
									}
								} else if (matchType == "contains") {
									if (element.getAttribute(ATTRIBUTES[attriubute]).toLowerCase().replace(/\s/, " ").includes(keywordsSet[keyword].toLowerCase().replace(/\s/, " "))) {
										if (element.hasAttribute("type") && element.getAttribute("type").toLowerCase() != "button" || !element.hasAttribute("type")) {
											if (serviceType != "count") {
												data = eval((autofillType == "defined" ? "defined" : "correct") + keywordsName[0].toUpperCase() + keywordsName.substring(1) + "Generate")().toString();

												fillActiveField(element, data, actionType);
											}
											elementFilled = true;
											elementsFilledCount += 1;
											break;
										}
									}
								}
							}
						}
					} else if (objectSize == 3) {
						keywordsSet = Object.values(keywordType)[2].split(",");
						for (var keyword in keywordsSet) {
							if (keywordsSet[keyword].toLowerCase() != "") {
								if (matchType == "equals") {
									if (element.getAttribute(ATTRIBUTES[attriubute]).toLowerCase().replace(/\s/, " ") == keywordsSet[keyword].toLowerCase().replace(/\s/, " ")) {
										if (element.hasAttribute("type") && element.getAttribute("type").toLowerCase() != "button" || !element.hasAttribute("type")) {
											if (serviceType != "count") {
												data = Object.values(keywordType)[1];
												data = prepareData(data);
												fillActiveField(element, data, actionType);
											}
											elementFilled = true;
											elementsFilledCount += 1;
											break;
										}
									}
								} else if (matchType == "contains") {
									if (element.getAttribute(ATTRIBUTES[attriubute]).toLowerCase().replace(/\s/, " ").includes(keywordsSet[keyword].toLowerCase().replace(/\s/, " "))) {
										if (element.hasAttribute("type") && element.getAttribute("type").toLowerCase() != "button" || !element.hasAttribute("type")) {
											if (serviceType != "count") {
												data = Object.values(keywordType)[1];
												data = prepareData(data);
												fillActiveField(element, data, actionType);
											}
											elementFilled = true;
											elementsFilledCount += 1;
											break;
										}
									}
								}
							}
						}
					}
					if (elementFilled) { break; }
				}
			}
			if (elementFilled) { break; }
		}
		return elementsFilledCount;
	} else {
		return 0;
	}
}

function fieldServiceElement(serviceType, data, doc) {
	var elementsFilledCount = 0;

	var ids = data.identity.split(",");
	for (var id in ids) {
		var element;
		if (serviceType == "count") {
			element = doc.getElementById(ids[id]);
			if (element) {
				if (data.elementType == "checkbox" && element.type == "checkbox") {
					elementsFilledCount += 1;
				} else if (data.elementType == "select" && (element.type == "select-one" || element.type == "select-multiple")) {
					elementsFilledCount += 1;
				}
			}
		} else {
			element = doc.getElementById(ids[id]);
			if (element) {
				if (data.elementType == "checkbox" && element.type == "checkbox") {
					if (data.value == "checked") {
						if (!element.checked) {
							if (data.type == "value") {
								element.checked = true;
							} else if (data.type == "click") {
								element.click();
							}
						}
					} else if (data.value == "unchecked") {
						if (element.checked) {
							if (data.type == "value") {
								element.checked = false;
							} else if (data.type == "click") {
								element.click();
							}
						}
					} else if (data.value == "random") {
						if (Math.random() >= 0.5) {
							if (data.type == "value") {
								element.checked = true;
							} else if (data.type == "click") {
								element.click();
							}
						} else {
							element.checked = false;
						}
					}
				} else if (data.elementType == "select" && (element.type == "select-one" || element.type == "select-multiple")) {

					if (data.value == "choosen") {

						var options = data.options.split(",");

						if (data.type == "value") {
							if (element.type == "select-one") {
								element.value = options[0];
							} else if (element.type == "select-multiple") {
								for (var i = 0; i < element.options.length; i++) {
									var o = element.options[i];
									if (options.indexOf(o.value) != -1) {
										o.selected = true;
									}
								}
							}
						}
					} else if (data.value == "random") {
						if (data.type == "value") {

							if (element.type == "select-one") {
								element.value = element.options[generateRandomNumberBetween(0, element.options.length - 1)].value;
							} else if (element.type == "select-multiple") {
								for (var i = 0; i < element.options.length; i++) {
									var o = element.options[i];
									if (Math.random() >= 0.5) {
										o.selected = true;
									} else {
										o.selected = false;
									}
								}
							}
						}
					}
				}
			}
		}
	}
	return elementsFilledCount;
}