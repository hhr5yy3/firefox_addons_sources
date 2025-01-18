var regonRegionPrefix =
	["02", "04", "06", "08", "10", "12", "14", "16",
		"18", "20", "22", "24", "26", "28", "30", "32"];

var definedRegon;

var gettingItem = chrome.storage.local.get(["definedRegon"], function (result) {
	if (result.definedRegon) {
		definedRegon = result.definedRegon;
	} else {
		definedRegon = "451187704";
	}
});

chrome.storage.onChanged.addListener(function (changes, namespace) {
	if (changes.definedRegon) {
		definedRegon = changes.definedRegon.newValue;
	}
});

function correctRegonGenerate() {
	if (Math.random() >= 0.5) {
		return generateRegonNine();
	} else {
		return generateRegonFourteen();
	}
}

function incorrectRegonGenerate() {
	if (Math.random() >= 0.5) {
		return generateRegonNineWithWrongChecksum();
	} else {
		return generateRegonFourteenWithWrongChecksum();
	}
}

function correctRegon9Generate() {
	return generateRegonNine();
}

function correctRegon14Generate() {
	return generateRegonFourteen();
}

function incorrectRegon9Generate() {
	return generateRegonNineWithWrongChecksum();
}

function incorrectRegon14Generate() {
	return generateRegonFourteenWithWrongChecksum();
}

function definedRegonGenerate() {
	return definedRegon;
}

function generateRegonNineWithWrongChecksum() {
	var prefix = generateRegonPrefix();
	var partOneNumber = prefix + generateRandomNumber(6);
	var controlNumber = getRegonControlNumberOfNine(partOneNumber);

	if (controlNumber == "5") {
		controlNumber = "4";
	} else {
		controlNumber = "5";
	}
	return partOneNumber + controlNumber;
}

function generateRegonFourteenWithWrongChecksum() {
	var prefix = generateRegonNine();
	var partOneNumber = prefix + generateRandomNumber(4);
	var controlNumber = getRegonControlNumberOfFourteen(partOneNumber);

	if (controlNumber == "5") {
		controlNumber = "4";
	} else {
		controlNumber = "5";
	}
	return partOneNumber + controlNumber;
}

function generateRegonNine() {
	var prefix = generateRegonPrefix();
	var partOneNumber = prefix + generateRandomNumber(6);
	var controlNumber = getRegonControlNumberOfNine(partOneNumber);
	return partOneNumber + controlNumber;
}

function generateRegonFourteen() {
	var prefix = generateRegonNine();
	var partOneNumber = prefix + generateRandomNumber(4);
	var controlNumber = getRegonControlNumberOfFourteen(partOneNumber);
	return partOneNumber + controlNumber;
}

function getRegonControlNumberOfNine(number) {
	var sum = number[0] * 8 + number[1] * 9 + number[2] * 2 + number[3] * 3 +
		number[4] * 4 + number[5] * 5 + number[6] * 6 + number[7] * 7;
	var controlNumber = sum % 11;
	if (controlNumber == 10) {
		controlNumber = 0;
	}
	return controlNumber.toString();
}

function getRegonControlNumberOfFourteen(number) {
	var sum = number[0] * 2 + number[1] * 4 + number[2] * 8 + number[3] * 5 +
		number[4] * 0 + number[5] * 9 + number[6] * 7 + number[7] * 3 +
		number[8] * 6 + number[9] * 1 + number[10] * 2 + number[11] * 4 +
		number[12] * 8;
	var controlNumber = sum % 11;
	if (controlNumber == 10) {
		controlNumber = 0;
	}
	return controlNumber.toString();
}

function generateRegonPrefix() {
	randomNumber = Math.floor(Math.random() * regonRegionPrefix.length);
	var prefix = regonRegionPrefix[randomNumber];
	return prefix;
}