var peselGenderType, peselDateType, peselBornDate, peselBornStartDate, peselBornEndDate, definedPesel;

var gettingItem = chrome.storage.local.get(["peselGenderType", "peselDateType", "peselBornDate", "peselBornStartDate", "peselBornEndDate", "definedPesel"], function (result) {
	peselGenderType = result.peselGenderType ? result.peselGenderType : "random";
	peselDateType = result.peselDateType ? result.peselDateType : "date";
	peselBornDate = result.peselBornDate ? result.peselBornDate : "1985-11-27";
	peselBornStartDate = result.peselBornStartDate ? result.peselBornStartDate : "1985-11-27";
	peselBornEndDate = result.peselBornEndDate ? result.peselBornEndDate : "1992-06-04";
	definedPesel = result.definedPesel ? result.definedPesel : "87060301030";
});

chrome.storage.onChanged.addListener(function (changes, namespace) {
	if (changes.peselGenderType) {
		peselGenderType = changes.peselGenderType.newValue;
	}
	if (changes.peselDateType) {
		peselDateType = changes.peselDateType.newValue;
	}
	if (changes.peselBornDate) {
		peselBornDate = changes.peselBornDate.newValue;
	}
	if (changes.peselBornStartDate) {
		peselBornStartDate = changes.peselBornStartDate.newValue;
	}
	if (changes.peselBornEndDate) {
		peselBornEndDate = changes.peselBornEndDate.newValue;
	}
	if (changes.definedPesel) {
		definedPesel = changes.definedPesel.newValue;
	}
});

function correctPeselGenerate() {
	return generateRandomPesel(new Date("1900-01-01"), new Date());
}

function correctPeselAdultGenerate() {
	var tempDate = new Date();
	return generateRandomPesel(new Date("1900-01-01"), new Date(tempDate.setFullYear(tempDate.getFullYear() - 18)));
}

function correctPeselUnderageGenerate() {
	var tempDate = new Date();
	return generateRandomPesel(new Date(tempDate.setFullYear(tempDate.getFullYear() - 18)), new Date());
}

function incorrectPeselGenerate() {
	return generateRandomPeselWithWrongChecksum();
}

function customPeselGenerate() {

	var generatedGender = "";
	if (peselGenderType == "random") {
		generatedGender = generatePeselGender();
	} else if (peselGenderType == "male") {
		generatedGender = choosePeselGender("male");
	} else if (peselGenderType == "female") {
		generatedGender = choosePeselGender("female");
	} else {
		generatedGender = generatePeselGender();
	}

	var date;
	if (peselDateType == "date") {
		date = new Date(peselBornDate);
	} else if (peselDateType == "range") {
		date = generatePeselDate(new Date(peselBornStartDate), new Date(peselBornEndDate));
	} else if (peselDateType == "random") {
		date = generatePeselDate(new Date("1900-01-01"), new Date());
	} else {
		date = new Date(peselBornDate);
	}

	var year = takePeselYear(date);
	var digitOfYear = year.toString().slice(2);
	var month = takePeselMonth(year, date);
	var day = takePeselDay(date);
	var fullDate = digitOfYear + month + day;

	var beforeControlNumber = fullDate + generateRandomNumber(3) + generatedGender;

	return beforeControlNumber + getPeselControlNumber(beforeControlNumber);
}

function definedPeselGenerate() {
	return definedPesel;
}

function generateRandomPesel(startDate, endDate) {

	var date = generatePeselDate(startDate, endDate);

	var generatedGender = generatePeselGender();

	var year = takePeselYear(date);
	var digitOfYear = year.toString().slice(2);
	var month = takePeselMonth(year, date);
	var day = takePeselDay(date);
	var fullDate = digitOfYear + month + day;

	var beforeControlNumber = fullDate + generateRandomNumber(3) + generatedGender;

	return beforeControlNumber + getPeselControlNumber(beforeControlNumber);
}

function generateRandomPeselWithWrongChecksum() {
	var date = generatePeselDate(new Date("1900,01,01"), new Date());

	var generatedGender = generatePeselGender();

	var year = takePeselYear(date);
	var digitOfYear = year.toString().slice(2);
	var month = takePeselMonth(year, date);
	var day = takePeselDay(date);
	var fullDate = digitOfYear + month + day;

	var beforeControlNumber = fullDate + generateRandomNumber(3) + generatedGender;

	var peselControlNumer = getPeselControlNumber(beforeControlNumber);

	if (peselControlNumer == "5") {
		peselControlNumer = "4";
	} else {
		peselControlNumer = "5";
	}
	return beforeControlNumber + peselControlNumer;
}

function getPeselControlNumber(number) {
	var controlNumber;
	sum = number[0] * 1 + number[1] * 3 + number[2] * 7 + number[3] * 9 + number[4] * 1 + number[5] * 3 +
		number[6] * 7 + number[7] * 9 + number[8] * 1 + number[9] * 3;
	result = sum % 10;
	controlNumber = (10 - result) % 10;
	return controlNumber.toString();
}

function generatePeselDate(startDate, endDate) {
	return new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
}

function generatePeselGender() {
	return Math.floor((Math.random() * 10));
}

function choosePeselGender(name) {
	var table;
	switch (name) {
		case "female":
			table = [0, 2, 4, 6, 8];
			break;
		case "male":
			table = [1, 3, 5, 7, 9];
			break;
		default:
			table = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
			break;
	}
	var index = Math.floor(Math.random() * table.length);
	return table[index].toString();
}

// Take year, month, day
function takePeselYear(date) {
	return date.getFullYear();
}

function takePeselMonth(year, date) {
	var month = date.getMonth() + 1;
	if (year > 1999) {
		return month + 20;
	} else if (year < 2000 && month < 10) {
		return "0" + month;
	} else {
		return month.toString();
	}
}

function takePeselDay(date) {
	var day = date.getDate();
	if (day < 10) {
		day = "0" + day;
	}
	return day;
}