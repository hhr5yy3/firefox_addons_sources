var smallLetter = "qwertyuioplkjhgfdsamnbvcxz";
var bigLetter = "ZXCVBNMLKJHGFDSAPOIUYTREWQ";
var space = " ";
var polishBig = "ĘÓĄŚŁŻŹĆŃ";
var polishSmall = "ęóąśłżźćń";
var digits = "0123456789";
var special = "?!@#$%^&*()-_.,=+~/\\|:;<>`[]'";

var partitionTable = [0.4, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1];

var tableWithSigns = [smallLetter, bigLetter, polishSmall, polishBig, digits, space, special];

var choosenSigns = [];

//-----------------------------------------------------------------------------
var lengthSigns, smallLettersSigns, bigLettersSigns, polishSmallLettersSigns, polishBigLettersSigns, digitsSigns, spacesSigns, specialsSigns;

var gettingItem = chrome.storage.local.get(["lengthSigns", "smallLettersSigns", "bigLettersSigns", "polishSmallLettersSigns", "polishBigLettersSigns", "digitsSigns", "spacesSigns", "specialsSigns"], function (result) {
	lengthSigns = result.lengthSigns ? result.lengthSigns : 100;
	smallLettersSigns = (result.smallLettersSigns == 1 || result.smallLettersSigns == 0) ? result.smallLettersSig : 1;
	bigLettersSigns = (result.bigLettersSigns == 1 || result.bigLettersSigns == 0) ? result.bigLettersSigns : 1;
	polishSmallLettersSigns = (result.polishSmallLettersSigns == 1 || result.polishSmallLettersSigns == 0) ? result.polishSmallLettersSigns : 1;
	polishBigLettersSigns = (result.polishBigLettersSigns == 1 || result.polishBigLettersSigns == 0) ? result.polishBigLettersSigns : 1;
	digitsSigns = (result.digitsSigns == 1 || result.digitsSigns == 0) ? result.digitsSigns : 1;
	spacesSigns = (result.spacesSigns == 1 || result.spacesSigns == 0) ? result.spacesSigns : 1;
	specialsSigns = (result.specialsSigns == 1 || result.specialsSigns == 0) ? result.specialsSigns : 1;
});

chrome.storage.onChanged.addListener(function (changes, namespace) {
	lengthSigns = changes.lengthSigns ? changes.lengthSigns.newValue : lengthSigns;
	smallLettersSigns = changes.smallLettersSigns ? changes.smallLettersSigns.newValue : smallLettersSigns;
	bigLettersSigns = changes.bigLettersSigns ? changes.bigLettersSigns.newValue : bigLettersSigns;
	polishSmallLettersSigns = changes.polishSmallLettersSigns ? changes.polishSmallLettersSigns.newValue : polishSmallLettersSigns;
	polishBigLettersSigns = changes.polishBigLettersSigns ? changes.polishBigLettersSigns.newValue : polishBigLettersSigns;
	digitsSigns = changes.digitsSigns ? changes.digitsSigns.newValue : digitsSigns;
	spacesSigns = changes.spacesSigns ? changes.spacesSigns.newValue : spacesSigns;
	specialsSigns = changes.specialsSigns ? changes.specialsSigns.newValue : specialsSigns;
});

function customSignsGenerate() {
	checkWhichSigns();

	var answer = "";

	if (choosenSigns.length == lengthSigns) {
		var copyMainTable = [];
		for (i = 0; i < choosenSigns.length; i++) {
			copyMainTable.push(i);
		}
		var IndexTableWithSign;
		for (i = 0; i < choosenSigns.length; i++) {
			randomIndexCopyTable = Math.floor(Math.random() * copyMainTable.length);
			randomIndex1 = copyMainTable[randomIndexCopyTable];
			indexTableWithSign = choosenSigns[randomIndex1];
			copyMainTable.splice(randomIndexCopyTable, 1);
			answer += generateSign(indexTableWithSign);
		}
	} else if (choosenSigns.length < lengthSigns) {
		var NumbersForTableWithSigns = generateNumbersForTableWithSigns(choosenSigns, lengthSigns);
		var x = lengthSigns;
		while (x > 0) {
			index = Math.floor(Math.random() * NumbersForTableWithSigns.length);
			if (NumbersForTableWithSigns[index] > 0) {
				answer += generateSign(choosenSigns[index]);
				NumbersForTableWithSigns[index] -= 1;
				x--;
			}
		}
		answer = answer.split("");
		answer2 = shuffleArray(answer);
		answer = generateString(answer2);
	} else {
		console.log("Error: Błędnie zapisane ustawienia. Długość wygenerowanego ciągu równa liczbie wybranych opcji.");
		answer = generateSign(Math.floor(Math.random() * choosenSigns.length));
	}
	choosenSigns = [];
	return answer;
}

function checkWhichSigns() {

	choosenSigns = [];

	if (smallLettersSigns == 1) {
		choosenSigns.push(0);
	}
	if (bigLettersSigns == 1) {
		choosenSigns.push(1);
	}
	if (polishSmallLettersSigns == 1) {
		choosenSigns.push(2);
	}
	if (polishBigLettersSigns == 1) {
		choosenSigns.push(3);
	}
	if (digitsSigns == 1) {
		choosenSigns.push(4);
	}
	if (spacesSigns == 1) {
		choosenSigns.push(5);
	}
	if (specialsSigns == 1) {
		choosenSigns.push(6);
	}

	if (smallLettersSigns != 1 && bigLettersSigns != 1 && polishSmallLettersSigns != 1 && polishBigLettersSigns != 1 && digitsSigns != 1 && spacesSigns != 1 && specialsSigns != 1) {
		choosenSigns = [0, 1, 2, 3, 4, 5, 1];
	}
}

//-----------------------------------------------------------------------------

function generateString(array) {
	answer = "";
	for (i = 0; i < array.length; i++) {
		answer += array[i];
	}
	return answer;
}

function shuffleArray(array) {
	for (var i = array.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		var temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
	return array;
}

function generateNumbersForTableWithSigns(table, totalnumbers) {
	var tableWithNumbersOfSign = [];
	for (i = 0; i < table.length; i++) {
		number = partitionTable[table[i]] * totalnumbers;
		// if (number < 1) {
		// 	number = 1;
		// } else if ((number*10)%10 >= 5) {
		// 	number = Math.ceil(number);
		// } else if ((number*10)%10 < 5) {
		// 	number = Math.floor(number)		
		// }
		number = (number < 1) ? 1 : (((number * 10) % 10 >= 5) ? Math.ceil(number) : Math.floor(number));

		tableWithNumbersOfSign.push(number);
	}
	var sum = 0;
	for (i = 0; i < tableWithNumbersOfSign.length; i++) {
		sum += tableWithNumbersOfSign[i];
	}
	while (sum != totalnumbers) {
		for (i = 0; i < tableWithNumbersOfSign.length; i++) {
			if (sum == totalnumbers) {
				break;
			} else if (sum > totalnumbers) {
				tableWithNumbersOfSign[i] -= 1;
				if (tableWithNumbersOfSign[i] < 1) {
					continue;
				}
				sum -= 1;
			} else {
				tableWithNumbersOfSign[i] += 1;
				sum += 1;
			}
		}
	}
	return tableWithNumbersOfSign;
}

function generateSign(index) {
	var signs = tableWithSigns[index];
	return signs[Math.floor(Math.random() * signs.length)];
}