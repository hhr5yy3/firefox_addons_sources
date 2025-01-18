var definedEan;

var gettingItem = chrome.storage.local.get(["definedEan"], function (result) {
	definedEan = result.definedEan ? result.definedEan : "4006381333931";
});

chrome.storage.onChanged.addListener(function (changes, namespace) {
	if (changes.definedEan) {
		definedEan = changes.definedEan.newValue;
	}
});

function correctEanGenerate() {
	return Math.random() >= 0.5 ? generateEanEight() : generateEanThirteen();
}

function correctEan8Generate() {
	return generateEanEight();
}

function correctEan13Generate() {
	return generateEanThirteen();
}

function incorrectEan8Generate() {
	return generateEanEightWithWrongChecksum();
}

function incorrectEan13Generate() {
	return generateEanThirteenWithWrongChecksum();
}

function definedEanGenerate() {
	return definedEan;
}

function generateEanEightWithWrongChecksum() {
	var number = generateRandomNumber(7);
	var controlNumber = getEanControlNumber("00000" + number);
	controlNumber = controlNumber == "5" ? "4" : "5";

	return number + controlNumber;
}

function generateEanThirteenWithWrongChecksum() {
	var number = "590" + generateRandomNumber(9);
	var controlNumber = getEanControlNumber(number);
	controlNumber = controlNumber == "5" ? "4" : "5";

	return number + controlNumber;
}

function generateEanEight() {
	var number = generateRandomNumber(7);
	return number + getEanControlNumber("00000" + number);
}

function generateEanThirteen() {
	var number = "590" + generateRandomNumber(9);
	return number + getEanControlNumber(number);
}

function getEanControlNumber(number) {
	var sum =
		number[0] * 1 +
		number[1] * 3 +
		number[2] * 1 +
		number[3] * 3 +
		number[4] * 1 +
		number[5] * 3 +
		number[6] * 1 +
		number[7] * 3 +
		number[8] * 1 +
		number[9] * 3 +
		number[10] * 1 +
		number[11] * 3;

	var controlNumber = sum % 10;
	if (controlNumber != 0) {
		controlNumber = 10 - controlNumber;
	}
	return controlNumber.toString();
}