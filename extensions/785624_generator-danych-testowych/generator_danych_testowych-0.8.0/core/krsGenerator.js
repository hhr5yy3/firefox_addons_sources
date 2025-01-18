var definedKrs;

var gettingItem = chrome.storage.local.get(["definedKrs"], function (result) {
	if (result.definedKrs) {
		definedKrs = result.definedKrs;
	} else {
		definedKrs = "0000133156";
	}
});

chrome.storage.onChanged.addListener(function (changes, namespace) {
	if (changes.definedKrs) {
		definedKrs = changes.definedKrs.newValue;
	}
});

function correctKrsGenerate() {
	return randomKrsGenerate();
}

function randomKrsGenerate() {
	var zerosLength = generateRandomNumberBetween(3, 7);
	return '0'.repeat(zerosLength) + generateRandomNumber(10 - zerosLength);
}

function definedKrsGenerate() {
	return definedKrs;
}