var definedCard;

var gettingItem = chrome.storage.local.get(["definedCard"], function (result) {
	definedCard = result.definedCard ? result.definedCard : "5377223617291234";
});

chrome.storage.onChanged.addListener(function (changes, namespace) {
	if (changes.definedCard) {
		definedCard = changes.definedCard.newValue;
	}
});

function definedCardGenerate() {
	return definedCard;
}

function correctCardGenerate() {
	return cardGenerate((Math.floor(Math.random() * 2) + 4).toString(), true);
}

function correctVisaCardGenerate() {
	return cardGenerate("4", true);
}

function correctMastercardCardGenerate() {
	return cardGenerate("5", true);
}

function incorrectCardGenerate() {
	return cardGenerate((Math.floor(Math.random() * 2) + 4).toString(), false);
}

function incorrectMastercardCardGenerate() {
	return cardGenerate("5", false);
}

function incorrectVisaCardGenerate() {
	return cardGenerate("4", false);
}

function cardGenerate(type, correct) {
	var number = generateRandomNumber(14);
	var controlNumber = getControlCardNumber(type + number);
	if (!correct) {
		controlNumber = controlNumber == "2" ? "3" : "2";
	}

	return type + number + controlNumber;
}

function getControlCardNumber(value) {
	var numbers = value.slice(0, 15);
	var sum = 0;
	for (x = numbers.length; x > 0; x -= 1) {
		var number = parseInt(numbers[x - 1]);
		if ((x + 1) % 2 == 0) {
			var num = number * 2;
			if (num >= 10) {
				sum += parseInt(num.toString().substring(0, 1)) + parseInt(num.toString().substring(1, 2));
			} else {
				sum += number * 2;
			}
		} else {
			sum += number * 1;
		}
	}

	return sum % 10 == 0 ? sum % 10 : (10 - (sum % 10));
}