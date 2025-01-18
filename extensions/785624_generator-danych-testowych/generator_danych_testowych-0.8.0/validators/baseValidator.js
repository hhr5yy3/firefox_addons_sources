var minLength = 1;
var maxLength = 5000;

var minStringLength = 1;
var maxStringLength = 255;

var projectNameMinStringLength = 1;
var projectNameMaxStringLength = 32;

function intValidate(n) {
	if (/[0-9]/.test(n)) {
		return n % 1 === 0;
	} else {
		return false;
	}
}

function minLengthValidate(elem) {
	if (elem.value.trim() >= minLength) {
		return true;
	} else {
		return false;
	}
}

function maxLengthValidate(elem) {
	if (elem.value <= maxLength) {
		return true;
	} else {
		return false;
	}
}

function minStringLengthValidate(elem,type) {
	var elemValue = type ? elem : elem.value.trim();
	if (elemValue.length >= minStringLength) {
		return true;
	} else {
		return false;
	}
}

function maxStringLengthValidate(elem,type) {
	var elemValue = type ? elem : elem.value.trim();
	if (elemValue.length <= maxStringLength) {
		return true;
	} else {
		return false;
	}
}

function projectNameMinStringLengthValidate(elem) {
	var elemValue = elem.value.trim();
	if (elemValue.length >= projectNameMinStringLength) {
		return true;
	} else {
		return false;
	}
}

function projectNameMaxStringLengthValidate(elem) {
	var elemValue = elem.value.trim();
	if (elemValue.length <= projectNameMaxStringLength) {
		return true;
	} else {
		return false;
	}
}

function radiobuttonValidate(elem) {
	if (elem.value) {
		return true;
	} else {
		return false;
	}
}

function checkboxValidate(elem) {
	return elem.checked;
}

function dateValidate(date) {

	var pattStd = new RegExp("[0-9]{4}[-]{1}[0-9]{2}[-]{1}[0-9]{2}");
	if (pattStd.test(date)) {
		return (new Date(date) !== "Invalid Date") && !isNaN(new Date(date));
	} else {
		return false;
	}
}

function validDate(date) {
	if ((new Date(date) <= new Date(new Date())) && (new Date(date) >= new Date(new Date("1900-01-01")))) {
		return true;
	} else {
		return false;
	}
}

function validRangeDate(startDate, endDate) {
	if (new Date(endDate) >= new Date(startDate)) {
		return true;
	} else {
		return false;
	}
}

function signsValidate(elem) {
	var elemValue = elem.value.trim();
	if (/\{/.test(elemValue) || /\}/.test(elemValue)) {
		return false;
	} else {
		return true;
	}
}

function projectNameSignsValidate(elem) {
	var elemValue = elem.value.trim();
	if (/^[a-zA-Z0-9_-]+$/.test(elemValue)) {
		return true;
	} else {
		return false;
	}
}

function jsonValidate(json) {
	try {
		JSON.parse(json);
		return true;
	} catch (e) {
		return false;
	}
}

//var allAttributesListValidation = [];

function defaultSetValidation(type) {

	var settingsForm = document.getElementById("testDataGeneratorSettingsForm");

	var definedElement = document.getElementById("defined" + type);
	definedElement.style.borderColor = "";

	var attributesElement = document.getElementById("attributes" + type);
	if (attributesElement.previousElementSibling) {
		attributesElement.previousElementSibling.style.borderColor = "";
	}
	attributesElement.style.borderColor = "";

	var definedElementErrorLabel = document.getElementById('defined' + type + 'ErrorLabel');
	definedElementErrorLabel.innerHTML = "";

	var attributesElementErrorLabel = document.getElementById('attributes' + type + 'ErrorLabel');
	attributesElementErrorLabel.innerHTML = "";

	var defined = true;
	var attributes = true;

	if (!maxStringLengthValidate(definedElement,false)) {
		definedElement.style.borderColor = "#FF0000";
		definedElementErrorLabel.innerHTML = "Wprowadzony ciąg znaków do pola 'Dane zdefiniowane' jest za długi, maksymalna możliwa długość to 255 znaków";
		defined = false;
	}

	if (!minStringLengthValidate(definedElement,false)) {
		definedElement.style.borderColor = "#FF0000";
		definedElementErrorLabel.innerHTML = "Pole 'Dane zdefiniowane' nie zostało uzupełnione";
		defined = false;
	}

	if (!signsValidate(definedElement)) {
		definedElement.style.borderColor = "#FF0000";
		if (definedElementErrorLabel.innerHTML == "") {
			definedElementErrorLabel.innerHTML = "Pole 'Dane zdefiniowane' zostało uzupełnione niedozwolonymi znakami: '{' lub '}'";
		} else {
			definedElementErrorLabel.innerHTML += "<br/>Pole 'Dane zdefiniowane' zostało uzupełnione niedozwolonymi znakami: '{' lub '}'";
		}

		defined = false;
	}

	var attributesValues = getAttributesAsString(attributesElement.value);

	while (/\,[ ]+\,/g.test(attributesValues)) {
		attributesValues = attributesValues.replace(/\,[ ]+\,/g, ",");
	}

	var tempArray = removeDuplicates(attributesValues.split(","));

	attributesValues = tempArray.join();

	if (!maxStringLengthValidate(attributesValues,true)) {
		attributesElement.previousElementSibling.style.borderColor = "#FF0000";
		attributesElement.style.borderColor = "#FF0000";
		attributesElementErrorLabel.innerHTML = "Wprowadzony ciąg znaków do pola 'Wartości atrybutów pól' jest za długi, maksymalna możliwa długość to 255 znaków";
		attributes = false;
	}

	if (!minStringLengthValidate(attributesValues,true)) {
		attributesElement.previousElementSibling.style.borderColor = "#FF0000";
		attributesElement.style.borderColor = "#FF0000";
		attributesElementErrorLabel.innerHTML = "Pole 'Wartości atrybutów pól' nie zostało uzupełnione";
		attributes = false;
	}

	// 	var attributesElementValidation = true;

	// 	for (i = 0; i < tempArray.length; i++){
	// 		if (allAttributesListValidation.includes(tempArray[i])) {
	// 			attributesElementValidation = false;
	// 		} else {
	// 			allAttributesListValidation.push(tempArray[i]);
	// 		}
	// 	}
	// console.log(allAttributesListValidation);
	// 	if (!attributesElementValidation){
	// 		attributesElement.style.borderColor="#FF0000";
	// 		attributesElementErrorLabel.innerHTML = "Pole 'Wartości atrybutów pól' zostało uzupełnione wartością, która została użyta w innym module";
	// 		attributes = false;
	// 	}

	if (defined) {
		hideElement(definedElementErrorLabel);
	} else {
		showElement(definedElementErrorLabel);
	}

	if (attributes) {
		hideElement(attributesElementErrorLabel);
	} else {
		showElement(attributesElementErrorLabel);
	}

	if (defined && attributes) {
		return true;
	} else {
		return false;
	}
}

function parameterizedPeselValidation() {

	var settingsForm = document.getElementById("testDataGeneratorSettingsForm");

	document.querySelector("#peselBornDate").style.border = "";
	document.querySelector("#peselBornStartDate").style.border = "";
	document.querySelector("#peselBornEndDate").style.border = "";

	document.getElementById('parameterizedPeselErrorLabel').innerHTML = "";

	var validation = true;

	if (!radiobuttonValidate(settingsForm.elements.peselGenderType)) {
		document.getElementById('parameterizedPeselErrorLabel').innerHTML = "Parametry generowanych danych nie zostały wybrane";
		validation = false;
	}

	if (!radiobuttonValidate(settingsForm.elements.peselDateType)) {
		document.getElementById('parameterizedPeselErrorLabel').innerHTML = "Parametry generowanych danych nie zostały wybrane";
		validation = false;
	}

	if (!dateValidate(document.querySelector("#peselBornDate").value.trim())) {
		document.querySelector("#peselBornDate").style.border = "1px solid #FF0000";
		if (document.getElementById('parameterizedPeselErrorLabel').innerHTML == "") {
			document.getElementById('parameterizedPeselErrorLabel').innerHTML = "Wprowadzona data urodzenia jest niepoprawna";
		} else {
			document.getElementById('parameterizedPeselErrorLabel').innerHTML += "<br/>Wprowadzona data urodzenia jest niepoprawna";
		}
		validation = false;
	} else {
		if (!validDate(document.querySelector("#peselBornDate").value.trim())) {
			document.querySelector("#peselBornDate").style.border = "1px solid #FF0000";
			if (document.getElementById('parameterizedPeselErrorLabel').innerHTML == "") {
				document.getElementById('parameterizedPeselErrorLabel').innerHTML = "Wprowadzona data urodzenia jest niepoprawna, możliwy zakres dat to od 1 stycznia 1900 do daty dzisiejszej";
			} else {
				document.getElementById('parameterizedPeselErrorLabel').innerHTML += "<br/>Wprowadzona data urodzenia jest niepoprawna, możliwy zakres dat to od 1 stycznia 1900 do daty dzisiejszej";
			}
			validation = false;
		}
	}

	if (!dateValidate(document.querySelector("#peselBornStartDate").value.trim())) {
		document.querySelector("#peselBornStartDate").style.border = "1px solid #FF0000";
		if (document.getElementById('parameterizedPeselErrorLabel').innerHTML == "") {
			document.getElementById('parameterizedPeselErrorLabel').innerHTML = "Wprowadzona data początkowa jest niepoprawna";
		} else {
			document.getElementById('parameterizedPeselErrorLabel').innerHTML += "<br/>Wprowadzona data początkowa jest niepoprawna";
		}
		validation = false;
	} else {
		if (!validDate(document.querySelector("#peselBornStartDate").value.trim())) {
			document.querySelector("#peselBornStartDate").style.border = "1px solid #FF0000";
			if (document.getElementById('parameterizedPeselErrorLabel').innerHTML == "") {
				document.getElementById('parameterizedPeselErrorLabel').innerHTML = "Wprowadzona data początkowa jest niepoprawna, możliwy zakres dat to od 1 stycznia 1900 do daty dzisiejszej";
			} else {
				document.getElementById('parameterizedPeselErrorLabel').innerHTML += "<br/>Wprowadzona data początkowa jest niepoprawna, możliwy zakres dat to od 1 stycznia 1900 do daty dzisiejszej";
			}
			validation = false;
		}
	}

	if (!dateValidate(document.querySelector("#peselBornEndDate").value.trim())) {
		document.querySelector("#peselBornEndDate").style.border = "1px solid #FF0000";
		if (document.getElementById('parameterizedPeselErrorLabel').innerHTML == "") {
			document.getElementById('parameterizedPeselErrorLabel').innerHTML = "Wprowadzona data końcowa jest niepoprawna";
		} else {
			document.getElementById('parameterizedPeselErrorLabel').innerHTML += "<br/>Wprowadzona data końcowa jest niepoprawna";
		}
		validation = false;
	} else {
		if (!validDate(document.querySelector("#peselBornEndDate").value.trim())) {
			document.querySelector("#peselBornEndDate").style.border = "1px solid #FF0000";
			if (document.getElementById('parameterizedPeselErrorLabel').innerHTML == "") {
				document.getElementById('parameterizedPeselErrorLabel').innerHTML = "Wprowadzona data końcowa jest niepoprawna, możliwy zakres dat to od 1 stycznia 1900 do daty dzisiejszej";
			} else {
				document.getElementById('parameterizedPeselErrorLabel').innerHTML += "<br/>Wprowadzona data końcowa jest niepoprawna, możliwy zakres dat to od 1 stycznia 1900 do daty dzisiejszej";
			}
			validation = false;
		}
	}

	if (!validRangeDate(document.querySelector("#peselBornStartDate").value.trim(), document.querySelector("#peselBornEndDate").value.trim())) {
		document.querySelector("#peselBornStartDate").style.border = "1px solid #FF0000";
		document.querySelector("#peselBornEndDate").style.border = "1px solid #FF0000";
		if (document.getElementById('parameterizedPeselErrorLabel').innerHTML == "") {
			document.getElementById('parameterizedPeselErrorLabel').innerHTML = "Wprowadzony zakres dat jest niepoprawny, data początkowa musi być wcześniejsza lub równa dacie końcowej";
		} else {
			document.getElementById('parameterizedPeselErrorLabel').innerHTML += "<br/>Wprowadzony zakres dat jest niepoprawny, data początkowa musi być wcześniejsza lub równa dacie końcowej";
		}
		validation = false;
	}


	if (validation) {
		hideElement(document.getElementById("parameterizedPeselErrorLabel"));
	} else {
		showElement(document.getElementById("parameterizedPeselErrorLabel"));
	}

	return validation;
}

function defaultTextValidation(type) {

	document.getElementById(type + "Length").value = parseInt(document.getElementById(type + "Length").value);

	document.getElementById(type + "Length").style.borderColor = "";
	document.getElementById(type + 'ErrorLabel').innerHTML = "";

	var textErrorLabel = document.getElementById(type + 'ErrorLabel');
	textErrorLabel.innerHTML = "";

	var validation = true;

	if (!intValidate(document.getElementById(type + "Length").value)) {
		document.getElementById(type + "Length").style.borderColor = "#FF0000";
		document.getElementById(type + 'ErrorLabel').innerHTML = "Wprowadzona wartość nie jest liczbą naturalną, pole dopuszcza tylko liczby naturalne większe od zera";
		validation = false;
	} else {
		if (!maxLengthValidate(document.getElementById(type + "Length"))) {
			document.getElementById(type + "Length").style.borderColor = "#FF0000";
			document.getElementById(type + 'ErrorLabel').innerHTML = "Wprowadzona wartość jest za duża, maksymalna możliwa wartość to 5000";
			validation = false;
		}
		if (!minLengthValidate(document.getElementById(type + "Length"))) {
			document.getElementById(type + "Length").style.borderColor = "#FF0000";
			document.getElementById(type + 'ErrorLabel').innerHTML = "Wprowadzona wartość jest za mała, minimalna możliwa wartość to 1";
			validation = false;
		}
	}

	if (validation) {
		hideElement(textErrorLabel);
	} else {
		showElement(textErrorLabel);
	}

	return validation;
}

function signsValidation() {

	var settingsForm = document.getElementById("testDataGeneratorSettingsForm");

	document.getElementById("lengthSigns").value = parseInt(document.getElementById("lengthSigns").value);

	var lengthSigns = document.getElementById("lengthSigns");
	lengthSigns.style.borderColor = "";

	var signsType = document.getElementById("signsType");
	signsType.style.border = "";

	var lengthSignsErrorLabel = document.getElementById('lengthSignsErrorLabel');
	lengthSignsErrorLabel.innerHTML = "";

	var signsTypeErrorLabel = document.getElementById('signsTypeErrorLabel');
	signsTypeErrorLabel.innerHTML = "";

	var lengthSignsValidation = true;
	var signsTypeValidation = true;

	var checkedCount = 0;

	if (checkboxValidate(document.getElementById("smallLettersSigns"))) {
		checkedCount = checkedCount + 1;
	}
	if (checkboxValidate(document.getElementById("bigLettersSigns"))) {
		checkedCount = checkedCount + 1;
	}
	if (checkboxValidate(document.getElementById("polishSmallLettersSigns"))) {
		checkedCount = checkedCount + 1;
	}
	if (checkboxValidate(document.getElementById("polishBigLettersSigns"))) {
		checkedCount = checkedCount + 1;
	}
	if (checkboxValidate(document.getElementById("digitsSigns"))) {
		checkedCount = checkedCount + 1;
	}
	if (checkboxValidate(document.getElementById("spacesSigns"))) {
		checkedCount = checkedCount + 1;
	}
	if (checkboxValidate(document.getElementById("specialsSigns"))) {
		checkedCount = checkedCount + 1;
	}

	if (!intValidate(lengthSigns.value)) {
		lengthSigns.style.borderColor = "#FF0000";
		lengthSignsErrorLabel.innerHTML = "Wprowadzona wartość nie jest liczbą naturalną, pole dopuszcza tylko liczby naturalne większe od zera";
		lengthSignsValidation = false;
	} else {
		if (checkedCount <= 0) {
			signsType.style.border = "1px solid #FF0000";
			signsTypeErrorLabel.innerHTML += "Żadna opcja nie została wybrana, musisz zaznaczyć przynajmniej jedną opcję";
			signsTypeValidation = false;
		}

		if (checkedCount > lengthSigns.value) {
			lengthSigns.style.borderColor = "#FF0000";
			signsType.style.border = "1px solid #FF0000";
			lengthSignsErrorLabel.innerHTML += "Liczba generowanych znaków musi być większa lub równa liczbie wybranych opcji";
			lengthSignsValidation = false;
		} else {
			if (!maxLengthValidate(lengthSigns)) {
				lengthSigns.style.borderColor = "#FF0000";
				lengthSignsErrorLabel.innerHTML = "Liczba znaków w generowanym ciągu jest za duża, maksymalna możliwa wartość to 5000";
				lengthSignsValidation = false;
			}

			if (!minLengthValidate(lengthSigns)) {
				lengthSigns.style.borderColor = "#FF0000";
				lengthSignsErrorLabel.innerHTML = "Liczba znaków w generowanym ciągu jest za mała, minimalna możliwa wartość to 1";
				lengthSignsValidation = false;
			}
		}
	}

	if (lengthSignsValidation) {
		hideElement(lengthSignsErrorLabel);
	} else {
		showElement(lengthSignsErrorLabel);
	}

	if (signsTypeValidation) {
		hideElement(signsTypeErrorLabel);
	} else {
		showElement(signsTypeErrorLabel);
	}

	if (lengthSignsValidation && signsTypeValidation) {
		return true;
	} else {
		return false;
	}
}

function csvValidation() {

	var settingsForm = document.getElementById("testDataGeneratorSettingsForm");

	document.getElementById("csvOffsetStart").style.borderColor = "";
	document.getElementById("csvOffsetEnd").style.borderColor = "";

	document.getElementById('csvErrorLabel').innerHTML = "";

	var validation = true;

	if (document.getElementById("csvFileContent").value != "undefined") {
		if (parseInt(document.getElementById("csvOffsetEnd").value) < parseInt(document.getElementById("csvOffsetStart").value)) {
			document.getElementById("csvOffsetEnd").style.borderColor = "#FF0000";
			document.getElementById('csvErrorLabel').innerHTML += "</br>- górna granica zakresu musi być większa lub równa dolnej";
			validation = false;
		}

		if (parseInt(document.getElementById("csvOffsetStart").value) < 1) {
			document.getElementById("csvOffsetStart").style.borderColor = "#FF0000";
			document.getElementById('csvErrorLabel').innerHTML += "</br>- wprowadzona wartość początkowa jest spoza zakresu";
			validation = false;

		}

		var array = document.getElementById("csvFileContent").value.split(/\r?\n|\r/);

		if (parseInt(document.getElementById("csvOffsetEnd").value) > array.length) {
			document.getElementById("csvOffsetEnd").style.borderColor = "#FF0000";
			document.getElementById('csvErrorLabel').innerHTML += "</br>- wprowadzona wartość końcowa jest spoza zakresu";
			validation = false;
		}

	}

	if (validation) {
		hideElement(document.getElementById("csvErrorLabel"));
	} else {
		showElement(document.getElementById("csvErrorLabel"));
		document.getElementById('csvErrorLabel').innerHTML = "Błędnie uzupełnione dane:" + document.getElementById('csvErrorLabel').innerHTML;
	}

	return validation;
}

function dataValidation() {

	var divElements = document.getElementById("dataElements").children;

	var validation = true;

	var names = [];
	var attributes = [];

	var attributesTemp = [];

	//zapis temp listy
	for (divIndex = 0; divIndex < divElements.length; divIndex++) {
		var elements = divElements[divIndex].children;

		for (elementIndex = 1; elementIndex < elements.length - 3; elementIndex++) {

			var element = elements[elementIndex];

			if (elementIndex == 3) {
				while (/\,[ ]+\,/g.test(element.value)) {
					element.value = element.value.replace(/\,[ ]+\,/g, ",");
				}

				var tempArray = removeDuplicates(element.value.split(","));

				element.value = tempArray.join();

				for (k = 0; k < tempArray.length; k++) {
					if (tempArray[k].length > 0) {
						attributesTemp.push(tempArray[k]);
					}
				}
			}
		}
	}

	// sprawdzenie listy
	for (i = 0; i < divElements.length; i++) {
		var elements = divElements[i].children;
		var id = divElements[i].id;

		var errorLabel = document.getElementById('dataErrorLabel-' + id.match(/div-([0-9]+)/)[1]);
		errorLabel.innerHTML = "";

		hideElement(errorLabel);

		for (j = 1; j < elements.length - 3; j++) {

			var elementValidation = true;
			var element = elements[j];

			if (j == 3) {
				while (/\,[ ]+\,/g.test(element.value)) {
					element.value = element.value.replace(/\,[ ]+\,/g, ",");
				}

				var attributesElementValidation = true;

				var tempArray = removeDuplicates(element.value.split(","));

				element.value = tempArray.join();

				for (k = 0; k < tempArray.length; k++) {
					if (attributesTemp.filter(i => i === tempArray[k]).length > 1) {
						attributesElementValidation = false;
					} else {
						if (tempArray[k].length > 0) {
							attributes.push(tempArray[k]);
						}
					}
				}

				if (!attributesElementValidation) {
					errorLabel.innerHTML += "Pole '" + element.placeholder + "' zostało uzupełnione wartością, która została użyta w innym zestawie danych<br/>";
					elementValidation = false;
				}
			}

			if (j == 1) {
				if (names.includes(element.value)) {
					elementValidation = false;
					errorLabel.innerHTML += "Pole '" + element.placeholder + "' zostało uzupełnione wartością, która została użyta w innym zestawie danych<br/>";
				} else {
					if (element.value.length > 0) {
						names.push(element.value);
					}
				}
			}

			if (!maxStringLengthValidate(element,false)) {
				elementValidation = false;
				errorLabel.innerHTML += "Wprowadzony ciąg znaków do pola '" + element.placeholder + "' jest za długi, maksymalna możliwa długość to 255 znaków<br/>";
			}

			if (!minStringLengthValidate(element,false)) {
				elementValidation = false;
				errorLabel.innerHTML += "Pole '" + element.placeholder + "' nie zostało uzupełnione<br/>";
			}

			if (j == 2) {
				if (!signsValidate(element)) {
					elementValidation = false;
					errorLabel.innerHTML += "Pole '" + element.placeholder + "' zostało uzupełnione niedozwolonymi znakami: '{' lub '}'<br/>";
				}
			}

			if (elementValidation) {
				element.style.borderColor = "";
			} else {
				element.style.borderColor = "#FF0000";
				showElement(errorLabel);
				validation = false;
			}
		}
	}
	return validation;
}

function elementsValidation() {

	var divElements = document.getElementById("elements").children;

	var validation = true;

	var ids = [];
	var idsTemp = [];

	// zapis temp listy
	for (divIndex = 0; divIndex < divElements.length; divIndex++) {
		var elements = divElements[divIndex].children;

		for (elementIndex = 1; elementIndex < elements.length - 3; elementIndex++) {

			var element = elements[elementIndex];

			if (elementIndex == 3) {
				while (/\,[ ]+\,/g.test(element.value)) {
					element.value = element.value.replace(/\,[ ]+\,/g, ",");
				}
				var idsElementValidation = true;

				var tempArray = removeDuplicates(element.value.split(","));

				element.value = tempArray.join();

				for (k = 0; k < tempArray.length; k++) {
					if (tempArray[k].length > 0) {
						idsTemp.push(tempArray[k]);
					}
				}
			}
		}
	}

	// sprawdzanie listy
	for (i = 0; i < divElements.length; i++) {
		var elements = divElements[i].children;
		var id = divElements[i].id;

		var errorLabel = document.getElementById('elementErrorLabel-' + id.match(/div-([0-9]+)/)[1]);
		errorLabel.innerHTML = "";

		hideElement(errorLabel);

		for (j = 1; j < elements.length - 3; j++) {

			var elementValidation = true;
			var element = elements[j];

			if (j == 1) {
				var elementTypes = ["checkbox", "select"];
				if (!elementTypes.includes(element.value)) {
					errorLabel.innerHTML += "Pole '" + element.placeholder + "' zostało uzupełnione nieprawidłową wartością<br/>";
					elementValidation = false;
				}
			}

			if (j == 2) {
				var identityTypes = ["id"];
				if (!identityTypes.includes(element.value)) {
					errorLabel.innerHTML += "Pole '" + element.title + "' zostało uzupełnione nieprawidłową wartością<br/>";
					elementValidation = false;
				}
			}

			if (j == 3) {
				while (/\,[ ]+\,/g.test(element.value)) {
					element.value = element.value.replace(/\,[ ]+\,/g, ",");
				}
				var idsElementValidation = true;

				var tempArray = removeDuplicates(element.value.split(","));

				element.value = tempArray.join();

				for (k = 0; k < tempArray.length; k++) {
					if (idsTemp.filter(i => i === tempArray[k]).length > 1) {
						idsElementValidation = false;
					} else {
						if (tempArray[k].length > 0) {
							ids.push(tempArray[k]);
						}
					}
				}

				if (!idsElementValidation) {
					errorLabel.innerHTML += "Pole '" + element.placeholder + "' zostało uzupełnione wartością, która została użyta w innym zestawie danych<br/>";
					elementValidation = false;
				}

				if (!maxStringLengthValidate(element,false)) {
					elementValidation = false;
					errorLabel.innerHTML += "Wprowadzony ciąg znaków do pola '" + element.placeholder + "' jest za długi, maksymalna możliwa długość to 255 znaków<br/>";
				}

				if (!minStringLengthValidate(element,false)) {
					elementValidation = false;
					errorLabel.innerHTML += "Pole '" + element.placeholder + "' nie zostało uzupełnione<br/>";
				}
			}

			if (j == 4) {
				if (elements[1].value == "checkbox") {
					var identityTypes = ["checked", "unchecked", "random"];
					if (!identityTypes.includes(element.value)) {
						errorLabel.innerHTML += "Pole '" + element.title + "' zostało uzupełnione nieprawidłową wartością<br/>";
						elementValidation = false;
					}
				} else if (elements[1].value == "select") {
					var identityTypes = ["choosen", "random"];
					if (!identityTypes.includes(element.value)) {
						errorLabel.innerHTML += "Pole '" + element.title + "' zostało uzupełnione nieprawidłową wartością<br/>";
						elementValidation = false;
					}
				} else {
					errorLabel.innerHTML += "Pole '" + element.title + "' zostało uzupełnione nieprawidłową wartością<br/>";
					elementValidation = false;
				}
			}

			if (j == 5) {
				var elementTypes;
				if (elements[1].value == "checkbox") {
					elementTypes = ["click", "value"];
				} else if (elements[1].value == "select") {
					elementTypes = ["value"];
				}

				if (!elementTypes.includes(element.value)) {
					errorLabel.innerHTML += "Pole '" + element.title + "' zostało uzupełnione nieprawidłową wartością<br/>";
					elementValidation = false;
				}
			}

			if (j == 6) {
				while (/\,[ ]+\,/g.test(element.value)) {
					element.value = element.value.replace(/\,[ ]+\,/g, ",");
				}

				if (!maxStringLengthValidate(element,false)) {
					elementValidation = false;
					errorLabel.innerHTML += "Wprowadzony ciąg znaków do pola '" + element.placeholder + "' jest za długi, maksymalna możliwa długość to 255 znaków<br/>";
				}

				if (!minStringLengthValidate(element,false)) {
					elementValidation = false;
					errorLabel.innerHTML += "Pole '" + element.placeholder + "' nie zostało uzupełnione<br/>";
				}
			}

			if (elementValidation) {
				element.style.borderColor = "";
			} else {
				element.style.borderColor = "#FF0000";
				showElement(errorLabel);
				validation = false;
			}
		}
	}
	return validation;
}

function removeDuplicates(arr) {
	var unique_array = [];
	var unique_temp_array = [];
	for (var i = 0; i < arr.length; i++) {
		if (unique_temp_array.indexOf(arr[i].toLowerCase().trim()) == -1) {
			unique_temp_array.push(arr[i].toLowerCase().trim());
			unique_array.push(arr[i].trim());
		}
	}
	return unique_array;
}

function changeProjectNameValidation(type, fn) {

	var projectName = document.getElementById(type + 'Name');
	projectName.value = projectName.value.trim();
	projectName.style.borderColor = "";

	var projectNameErrorLabel = document.getElementById(type + 'NameErrorLabel');
	projectNameErrorLabel.innerHTML = "";

	var editProjectName = document.getElementById("editProjectName");
	var editProjectOldName = document.getElementById("editProjectOldName");
	if (editProjectName.value == editProjectOldName.value) {
		showElement(document.getElementById("editProjectNameErrorLabel"));
		editProjectName.style.borderColor = "#FF0000";
		editProjectNameErrorLabel.innerHTML = "Wprowadzona nazwa projektu jest identyczna z poprzednią. Wprowadź inną nazwę.";
		fn (false);
	} else {
		projectNameValidation(type, function(result){
			fn(result);
		});
	}
}

function projectNameValidation(type, fn) {

	var projectName = document.getElementById(type + 'Name');
	projectName.value = projectName.value.trim();
	projectName.style.borderColor = "";

	var projectNameErrorLabel = document.getElementById(type + 'NameErrorLabel');
	projectNameErrorLabel.innerHTML = "";

	var validation = true;

	if (!projectNameMaxStringLengthValidate(projectName)) {
		projectName.style.borderColor = "#FF0000";
		projectNameErrorLabel.innerHTML = "Wprowadzona nazwa projektu jest za długa, maksymalna możliwa długość to 32 znaki";
		validation = false;
	}

	if (!projectNameMinStringLengthValidate(projectName)) {
		projectName.style.borderColor = "#FF0000";
		projectNameErrorLabel.innerHTML = "Pole 'Nazwa projektu' nie zostało uzupełnione";
		validation = false;
	}
	if (projectName.value.trim().length > 0) {
		if (!projectNameSignsValidate(projectName)) {
			projectName.style.borderColor = "#FF0000";
			if (projectNameErrorLabel.innerHTML == "") {
				projectNameErrorLabel.innerHTML = "Pole 'Nazwa projektu' zostało uzupełnione niedozwolonymi znakami";
			} else {
				projectNameErrorLabel.innerHTML += "<br/>Pole 'Nazwa projektu' zostało uzupełnione niedozwolonymi znakami";
			}
			validation = false;
		}
	}

	getAllProjectsFromDB(function (result) {
		if (validation){
			var projectExist = false;
			for (var item in result) {
				if (result[item].value.name.toLowerCase() == projectName.value.toLowerCase()) {
					projectExist = true;
					break;
				}
			}

			if (projectExist) {
				projectName.style.borderColor = "#FF0000";
				if (projectNameErrorLabel.innerHTML == "") {
					projectNameErrorLabel.innerHTML = "Projekt o tej nazwie istnieje już w systemie";
				} else {
					projectNameErrorLabel.innerHTML += "<br/>Projekt o tej nazwie istnieje już w systemie";
				}
				validation = false;
			}
		}

		if (validation) {
			hideElement(projectNameErrorLabel);
		} else {
			showElement(projectNameErrorLabel);
		}
		fn(validation);
	});
}

function validateImportedProjectFile(fn) {
	var validation = true;
	document.getElementById('importProjectErrorLabel').innerHTML = "";
	
	var settingsFile = document.getElementById("settingsFile").files[0];
	if (settingsFile) {
		if (settingsFile.size > 0) {
			if (settingsFile.size < 512000) {
				var fileReader = new FileReader();
				fileReader.onload = function (fileLoadedEvent) {
					if (jsonValidate(fileLoadedEvent.target.result)) {
						validation = true;
					} else {
						showElement(document.getElementById("importProjectErrorLabel"));
						document.getElementById('importProjectErrorLabel').innerHTML = "Plik '" + settingsFile.name + "' nie może zostać wczytany ponieważ jest uszkodzony lub nie spełnia wymagań.";
						validation = false;
					}
					fn(validation);
				};
				fileReader.readAsText(settingsFile, "UTF-8");
			} else {
				showElement(document.getElementById("importProjectErrorLabel"));
				document.getElementById('importProjectErrorLabel').innerHTML = "Plik '" + settingsFile.name + "' nie może zostać wczytany ponieważ posiada za duży rozmiar.<br/>Maksymalny możliwy rozmiar pliku to 500KB.";
				fn(false);
			}
		} else {
			showElement(document.getElementById("importProjectErrorLabel"));
			document.getElementById('importProjectErrorLabel').innerHTML = "Plik '" + settingsFile.name + "' nie może zostać wczytany ponieważ jest pusty.";
			fn(false);
		}
	} else {
		showElement(document.getElementById("importProjectErrorLabel"));
		document.getElementById('importProjectErrorLabel').innerHTML = "Plik nie został wybrany.";
		fn(false);
	}
}