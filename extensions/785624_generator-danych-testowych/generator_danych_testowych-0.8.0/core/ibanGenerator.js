var mainBankTypes = ["1000", "1010", "1020", "1030", "1050", "1060", "1090", "1130", "1140", "1160", "1240", "1280", "1320", "1470", "1540", "1580",
	"1610", "1670", "1680", "1750", "1840", "1870", "1910", "1930", "1940", "1950", "2030", "2070", "2120", "2130", "2140", "2160", "2190", "2480", "2490"];

var definedIban;
var ibanWithPrefix;
var bankType;

var gettingItem = chrome.storage.local.get(["definedIban", "ibanWithPrefix", "bankType"], function (result) {
	definedIban = result.definedIban ? result.definedIban : "PL89249000053591078401160741";
	ibanWithPrefix = result.ibanWithPrefix == 1 ? true : false;
	bankType = result.bankType ? result.bankType : "1000";
});

chrome.storage.onChanged.addListener(function (changes, namespace) {
	if (changes.definedIban) {
		definedIban = changes.definedIban.newValue;
	}
	if (changes.ibanWithPrefix) {
		ibanWithPrefix = changes.ibanWithPrefix.newValue == 1 ? true : false;
	}
	if (changes.bankType) {
		bankType = changes.bankType.newValue;
	}
});

function correctIbanGenerate() {
	return generateIban();
}

function incorrectIbanGenerate() {
	return generateIbanWithWrongChecksum();
}

function definedIbanGenerate() {
	return definedIban;
}

function generateIban() {

	var bankCode;

	if (bankType == "1000") {
		bankCode = mainBankTypes[Math.floor(Math.random() * mainBankTypes.length)];
	} else {
		bankCode = bankType;
	}

	var bankIdentifier = getIdBank(bankCode + "000");

	var accountNumber = generateRandomNumber(16);

	var bban = bankIdentifier + accountNumber;

	var beforeChanges = bban + "252100";
	var controlNumber = getControlIbanNumber(beforeChanges);
	if (ibanWithPrefix) {
		return "PL" + controlNumber + bban;
	} else {
		return controlNumber + bban;
	}
}

function generateIbanWithWrongChecksum() {

	var bankCode;

	if (bankType == 1000) {
		bankCode = Math.floor(Math.random() * mainBankTypes.length);
	} else {
		bankCode = bankType;
	}

	var bankIdentifier = getIdBank(bankCode + "000");
	var accountNumber = generateRandomNumber(16);

	var bban = bankIdentifier + accountNumber;

	var beforeChanges = bban + "252100";
	var controlNumber = getControlIbanNumber(beforeChanges);

	if (controlNumber.length == 2) {
		if (controlNumber == "15") {
			controlNumber = "14";
		} else {
			controlNumber = "15";
		}
	} else {
		if (controlNumber == "5") {
			controlNumber = "4";
		} else {
			controlNumber = "5";
		}
	}

	if (ibanWithPrefix) {
		return "PL" + controlNumber + bban;
	} else {
		return controlNumber + bban;
	}
}

function getControlIbanNumber(number) {
	var partOne = number.slice(0, 10);
	var prefixForPartTwo = partOne % 97;
	var partTwo = (prefixForPartTwo + number.slice(10, 20));
	var prefixForPartThree = partTwo % 97;
	var partThree = (prefixForPartThree + number.slice(20, 30));

	var modulo = partThree % 97;
	var result = 98 - modulo;
	result = String(result);
	if (result.length < 2) {
		result = "0" + result;
	}

	return result;
}

function getIdBank(number) {
	var sum = number[0] * 3 + number[1] * 9 + number[2] * 7 + number[3] * 1 +
		number[4] * 3 + number[5] * 9 + number[6] * 7;

	var controlNipNumber = sum % 10;

	return number + (controlNipNumber == 0 ? controlNipNumber : 10 - controlNipNumber);
}