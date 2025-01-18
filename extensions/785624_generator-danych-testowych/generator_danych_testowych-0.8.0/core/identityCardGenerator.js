var valueLetter = {
	"A": 10, "B": 11, "C": 12, "D": 13, "E": 14, "F": 15, "G": 16, "H": 17, "I": 18, "J": 19,
	"K": 20, "L": 21, "M": 22, "N": 23, "P": 25, "R": 27, "S": 28, "T": 29, "U": 30, "V": 31,
	"W": 32, "X": 33, "Y": 34, "Z": 35
};

var letterId = [
	"A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "P",
	"R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

var definedIdentityCard;

var gettingItem = chrome.storage.local.get(["definedIdentityCard"], function (result) {
	if (result.definedIdentityCard) {
		definedIdentityCard = result.definedIdentityCard;
	} else {
		definedIdentityCard = "ATI610961";
	}
});

chrome.storage.onChanged.addListener(function (changes, namespace) {
	if (changes.definedIdentityCard) {
		definedIdentityCard = changes.definedIdentityCard.newValue;
	}
});

function correctIdentityCardGenerate() {
	return generateIdentityCardNumber();
}

function incorrectIdentityCardGenerate() {
	return generateIdentityCardNumberWithWrongChecksum();
}

function definedIdentityCardGenerate() {
	return definedIdentityCard;
}

function generateIdentityCardNumberWithWrongChecksum() {
	var prefix = generatePrefix(1, 24, 24);
	var prefixValue = [
		valueLetter[prefix.charAt(0)],
		valueLetter[prefix.charAt(1)],
		valueLetter[prefix.charAt(2)]
	];
	var partOnenumberString = generateRandomNumber(5).split("");
	var partOnenumber = prefixValue.concat(partOnenumberString);
	var control_number = getIdentityCardControlNumber(partOnenumber);

	if (control_number == "5") {
		control_number = "4";
	} else {
		control_number = "5";
	}

	partOnenumber.splice(3, 0, control_number);
	var answer = prefix;
	for (var i = 3; i < 9; i++) {
		answer += partOnenumber[i];
	}
	return answer;
}

function generateIdentityCardNumber() {
	var prefix = generatePrefix(1, 24, 24);
	var prefixValue = [
		valueLetter[prefix.charAt(0)],
		valueLetter[prefix.charAt(1)],
		valueLetter[prefix.charAt(2)]
	];
	var partOnenumberString = generateRandomNumber(5).split("");
	var partOnenumber = prefixValue.concat(partOnenumberString);
	var control_number = getIdentityCardControlNumber(partOnenumber);
	partOnenumber.splice(3, 0, control_number);
	var answer = prefix;
	for (var i = 3; i < 9; i++) {
		answer += partOnenumber[i];
	}
	return answer;
}

function generatePrefix(max1, max2, max3) {
	var prefix = "";
	prefix += letterId[Math.floor(Math.random() * max1)].toString();
	prefix += letterId[Math.floor(Math.random() * max2)].toString();
	prefix += letterId[Math.floor(Math.random() * max3)].toString();
	return prefix;
}

function getIdentityCardControlNumber(number) {
	var sum = (number[0] * 7) + (number[1] * 3) + (number[2] * 1) + (number[3] * 7) + (number[4] * 3) + (number[5] * 1) + (number[6] * 7) + (number[7] * 3);
	return sum % 10;
}