var menuItemNip;
var menuItemRegon;
var menuItemPesel;
var menuItemIdentityCard;
var menuItemIban;
var menuItemCard;
var menuItemKrs;
var menuItemEan;
var menuItemText;
var menuItemSigns;
var menuItemCsv;
var menuItemData;
var text1Length;
var text2Length;
var text3Length;
var csvFileContent;
var csvFileSeparator;
var attributesNip;
var attributesRegon;
var attributesPesel;
var attributesIdentityCard;
var attributesIban;
var attributesCard;
var attributesKrs;
var userData;

var elementsCount;
var currentTabId;
var checkedState = false;

var gettingItem = chrome.storage.local.get(null, function (result) {
	menuItemNip = result.menuItemNip == 1 || result.menuItemNip == 0 ? result.menuItemNip : 1;
	menuItemRegon = result.menuItemRegon == 1 || result.menuItemRegon == 0 ? result.menuItemRegon : 1;
	menuItemPesel = result.menuItemPesel == 1 || result.menuItemPesel == 0 ? result.menuItemPesel : 1;
	menuItemIdentityCard = result.menuItemIdentityCard == 1 || result.menuItemIdentityCard == 0 ? result.menuItemIdentityCard : 1;
	menuItemIban = result.menuItemIban == 1 || result.menuItemIban == 0 ? result.menuItemIban : 1;
	menuItemCard = result.menuItemCard == 1 || result.menuItemCard == 0 ? result.menuItemCard : 1;
	menuItemKrs = result.menuItemKrs == 1 || result.menuItemKrs == 0 ? result.menuItemKrs : 1;
	menuItemEan = result.menuItemEan == 1 || result.menuItemEan == 0 ? result.menuItemEan : 1;
	menuItemText = result.menuItemText == 1 || result.menuItemText == 0 ? result.menuItemText : 1;
	menuItemSigns = result.menuItemSigns == 1 || result.menuItemSigns == 0 ? result.menuItemSigns : 1;
	menuItemCsv = result.menuItemCsv == 1 || result.menuItemCsv == 0 ? result.menuItemCsv : 1;
	menuItemData = result.menuItemData == 1 || result.menuItemData == 0 ? result.menuItemData : 1;
	text1Length = result.text1Length ? result.text1Length : 100;
	text2Length = result.text2Length ? result.text2Length : 200;
	text3Length = result.text3Length ? result.text3Length : 300;
	csvFileContent = result.csvFileContent ? result.csvFileContent : "";
	csvFileSeparator = result.csvFileSeparator ? result.csvFileSeparator : "";
	attributesNip = result.attributesNip ? result.attributesNip : "nip,numer_nip";
	attributesRegon = result.attributesRegon ? result.attributesRegon : "regon,numer_regon";
	attributesPesel = result.attributesPesel ? result.attributesPesel : "pesel,numer_pesel";
	attributesIdentityCard = result.attributesIdentityCard ? result.attributesIdentityCard : "dowod,dowod_osobisty";
	attributesIban = result.attributesIban ? result.attributesIban : "iban,numer_konta";
	attributesCard = result.attributesCard ? result.attributesCard : "karta,karta_kredytowa";
	attributesKrs = result.attributesKrs ? result.attributesKrs : "krs,numer_krs";
	userData = result.userData ? result.userData : "";
	drawContextMenu();
});

function drawContextMenu() {

	// Remove all items from menu
	chrome.contextMenus.removeAll();
	// X
	chrome.contextMenus.create({
		id: "get",
		title: "POBIERZ",
		contexts: ["all"]
	});

	chrome.contextMenus.create({
		id: "getId",
		parentId: 'get',
		title: "ID",
		contexts: ["all"]
	});
	chrome.contextMenus.create({
		id: "get1",
		parentId: 'get',
		type: "separator",
		contexts: ["all"]
	});
	chrome.contextMenus.create({
		id: "getName",
		parentId: 'get',
		title: "NAME",
		contexts: ["all"]
	});

	chrome.contextMenus.create({
		id: "separator000",
		type: "separator",
		contexts: ["all"]
	});

	if (elementsCount > 0) {
		chrome.contextMenus.create({
			id: "fillAllFields",
			title: "UZUPEŁNIJ WSZYSTKIE POLA",
			contexts: ["all"]
		});
		chrome.contextMenus.create({
			id: "separator00",
			type: "separator",
			contexts: ["all"]
		});
		chrome.contextMenus.create({
			id: "fillSingleField",
			title: "UZUPEŁNIJ TO POLE",
			contexts: ["editable", "password"]
		});
		chrome.contextMenus.create({
			id: "separator01",
			type: "separator",
			contexts: ["editable", "password"]
		});
	}
	chrome.contextMenus.create({
		id: "clearForm",
		title: "ZRESETUJ FORMULARZ",
		contexts: ["editable", "password"]
	});

	chrome.contextMenus.create({
		id: "separator02",
		type: "separator",
		contexts: ["editable", "password"]
	});
	// X
	if (menuItemNip == 1) {
		chrome.contextMenus.create({
			id: "nip",
			title: "NIP",
			contexts: ["editable", "password"]
		});
		// X.X
		chrome.contextMenus.create({
			id: "correctNip",
			parentId: 'nip',
			title: "Poprawny",
			contexts: ["editable", "password"]
		});
		chrome.contextMenus.create({
			id: "nip1",
			parentId: 'nip',
			type: "separator",
			contexts: ["editable", "password"]
		});
		// X.X
		chrome.contextMenus.create({
			id: "incorrectNip",
			parentId: 'nip',
			title: "Niepoprawny",
			contexts: ["editable", "password"]
		});
		chrome.contextMenus.create({
			id: "nip2",
			parentId: 'nip',
			type: "separator",
			contexts: ["editable", "password"]
		});
		// X.X
		chrome.contextMenus.create({
			id: "definedNip",
			parentId: 'nip',
			title: "Zdefiniowany",
			contexts: ["editable", "password"]
		});
		// ---
		chrome.contextMenus.create({
			id: "separator1",
			type: "separator",
			contexts: ["editable", "password"]
		});
	}

	if (menuItemRegon == 1) {
		chrome.contextMenus.create({
			id: "regon",
			title: "REGON",
			contexts: ["editable", "password"]
		});
		// X.X
		chrome.contextMenus.create({
			id: "correctRegon",
			parentId: 'regon',
			title: "Poprawny losowy",
			contexts: ["editable", "password"]
		});
		// X.X
		chrome.contextMenus.create({
			id: "incorrectRegon",
			parentId: 'regon',
			title: "Niepoprawny losowy",
			contexts: ["editable", "password"]
		});
		chrome.contextMenus.create({
			id: "regon1",
			parentId: 'regon',
			type: "separator",
			contexts: ["editable", "password"]
		});
		// X.X
		chrome.contextMenus.create({
			id: "correctRegon9",
			parentId: 'regon',
			title: "Poprawny 9",
			contexts: ["editable", "password"]
		});
		// X.X
		chrome.contextMenus.create({
			id: "incorrectRegon9",
			parentId: 'regon',
			title: "Niepoprawny 9",
			contexts: ["editable", "password"]
		});
		chrome.contextMenus.create({
			id: "regon2",
			parentId: 'regon',
			type: "separator",
			contexts: ["editable", "password"]
		});
		// X.X
		chrome.contextMenus.create({
			id: "correctRegon14",
			parentId: 'regon',
			title: "Poprawny 14",
			contexts: ["editable", "password"]
		});
		// X.X
		chrome.contextMenus.create({
			id: "incorrectRegon14",
			parentId: 'regon',
			title: "Niepoprawny 14",
			contexts: ["editable", "password"]
		});
		chrome.contextMenus.create({
			id: "regon3",
			parentId: 'regon',
			type: "separator",
			contexts: ["editable", "password"]
		});
		// X.X
		chrome.contextMenus.create({
			id: "definedRegon",
			parentId: 'regon',
			title: "Zdefiniowany",
			contexts: ["editable", "password"]
		});
		// ---
		chrome.contextMenus.create({
			id: "separator2",
			type: "separator",
			contexts: ["editable", "password"]
		});
	}

	if (menuItemPesel == 1) {
		chrome.contextMenus.create({
			id: "pesel",
			title: "PESEL",
			contexts: ["editable", "password"]
		});

		chrome.contextMenus.create({
			id: "correctPesel",
			parentId: 'pesel',
			title: "Poprawny losowy",
			contexts: ["editable", "password"]
		});
		chrome.contextMenus.create({
			id: "correctPeselAdult",
			parentId: 'pesel',
			title: "Poprawny pełnoletni",
			contexts: ["editable", "password"]
		});
		chrome.contextMenus.create({
			id: "correctPeselUnderage",
			parentId: 'pesel',
			title: "Poprawny niepełnoletni",
			contexts: ["editable", "password"]
		});
		chrome.contextMenus.create({
			id: "pesel1",
			parentId: 'pesel',
			type: "separator",
			contexts: ["editable", "password"]
		});
		chrome.contextMenus.create({
			id: "incorrectPesel",
			parentId: 'pesel',
			title: "Niepoprawny",
			contexts: ["editable", "password"]
		});
		chrome.contextMenus.create({
			id: "pesel2",
			parentId: 'pesel',
			type: "separator",
			contexts: ["editable", "password"]
		});
		chrome.contextMenus.create({
			id: "customPesel",
			parentId: 'pesel',
			title: "Określony parametrami",
			contexts: ["editable", "password"]
		});
		chrome.contextMenus.create({
			id: "pesel3",
			parentId: 'pesel',
			type: "separator",
			contexts: ["editable", "password"]
		});
		chrome.contextMenus.create({
			id: "definedPesel",
			parentId: 'pesel',
			title: "Zdefiniowany",
			contexts: ["editable", "password"]
		});

		chrome.contextMenus.create({
			id: "separator3",
			type: "separator",
			contexts: ["editable", "password"]
		});
	}

	if (menuItemIdentityCard == 1) {
		chrome.contextMenus.create({
			id: "identityCard",
			title: "DOWÓD OSOBISTY",
			contexts: ["editable", "password"]
		});

		chrome.contextMenus.create({
			id: "correctIdentityCard",
			parentId: 'identityCard',
			title: "Poprawny",
			contexts: ["editable", "password"]
		});
		chrome.contextMenus.create({
			id: "identityCard1",
			parentId: 'identityCard',
			type: "separator",
			contexts: ["editable", "password"]
		});
		chrome.contextMenus.create({
			id: "incorrectIdentityCard",
			parentId: 'identityCard',
			title: "Niepoprawny",
			contexts: ["editable", "password"]
		});
		chrome.contextMenus.create({
			id: "identityCard2",
			parentId: 'identityCard',
			type: "separator",
			contexts: ["editable", "password"]
		});
		chrome.contextMenus.create({
			id: "definedIdentityCard",
			parentId: 'identityCard',
			title: "Zdefiniowany",
			contexts: ["editable", "password"]
		});

		chrome.contextMenus.create({
			id: "separator4",
			type: "separator",
			contexts: ["editable", "password"]
		});
	}

	if (menuItemIban == 1) {
		chrome.contextMenus.create({
			id: "iban",
			title: "IBAN",
			contexts: ["editable", "password"]
		});

		chrome.contextMenus.create({
			id: "correctIban",
			parentId: 'iban',
			title: "Poprawny",
			contexts: ["editable", "password"]
		});
		chrome.contextMenus.create({
			id: "iban1",
			parentId: 'iban',
			type: "separator",
			contexts: ["editable", "password"]
		});
		chrome.contextMenus.create({
			id: "incorrectIban",
			parentId: 'iban',
			title: "Niepoprawny",
			contexts: ["editable", "password"]
		});
		chrome.contextMenus.create({
			id: "iban2",
			parentId: 'iban',
			type: "separator",
			contexts: ["editable", "password"]
		});
		chrome.contextMenus.create({
			id: "definedIban",
			parentId: 'iban',
			title: "Zdefiniowany",
			contexts: ["editable", "password"]
		});

		chrome.contextMenus.create({
			id: "separator5",
			type: "separator",
			contexts: ["editable", "password"]
		});
	}

	if (menuItemCard == 1) {
		chrome.contextMenus.create({
			id: "card",
			title: "KARTA KREDYTOWA",
			contexts: ["editable", "password"]
		});

		chrome.contextMenus.create({
			id: "correctCard",
			parentId: 'card',
			title: "Poprawny losowy",
			contexts: ["editable", "password"]
		});
		chrome.contextMenus.create({
			id: "incorrectCard",
			parentId: 'card',
			title: "Niepoprawny losowy",
			contexts: ["editable", "password"]
		});
		chrome.contextMenus.create({
			id: "card1",
			parentId: 'card',
			type: "separator",
			contexts: ["editable", "password"]
		});
		chrome.contextMenus.create({
			id: "correctVisaCard",
			parentId: 'card',
			title: "Poprawny Visa",
			contexts: ["editable", "password"]
		});

		chrome.contextMenus.create({
			id: "incorrectVisaCard",
			parentId: 'card',
			title: "Niepoprawny Visa",
			contexts: ["editable", "password"]
		});
		chrome.contextMenus.create({
			id: "card2",
			parentId: 'card',
			type: "separator",
			contexts: ["editable", "password"]
		});
		chrome.contextMenus.create({
			id: "correctMastercardCard",
			parentId: 'card',
			title: "Poprawny Mastercard",
			contexts: ["editable", "password"]
		});
		chrome.contextMenus.create({
			id: "incorrectMastercardCard",
			parentId: 'card',
			title: "Niepoprawny Mastercard",
			contexts: ["editable", "password"]
		});
		chrome.contextMenus.create({
			id: "card3",
			parentId: 'card',
			type: "separator",
			contexts: ["editable", "password"]
		});
		chrome.contextMenus.create({
			id: "definedCard",
			parentId: 'card',
			title: "Zdefiniowany",
			contexts: ["editable", "password"]
		});

		chrome.contextMenus.create({
			id: "separator6",
			type: "separator",
			contexts: ["editable", "password"]
		});
	}

	if (menuItemKrs == 1) {
		chrome.contextMenus.create({
			id: "krs",
			title: "KRS",
			contexts: ["editable", "password"]
		});
		chrome.contextMenus.create({
			id: "randomKrs",
			parentId: 'krs',
			title: "Losowy",
			contexts: ["editable", "password"]
		});
		chrome.contextMenus.create({
			id: "krs1",
			parentId: 'krs',
			type: "separator",
			contexts: ["editable", "password"]
		});
		chrome.contextMenus.create({
			id: "definedKrs",
			parentId: 'krs',
			title: "Zdefiniowany",
			contexts: ["editable", "password"]
		});
		chrome.contextMenus.create({
			id: "separator7",
			type: "separator",
			contexts: ["editable", "password"]
		});
	}

	if (menuItemEan == 1) {
		chrome.contextMenus.create({
			id: "ean",
			title: "EAN",
			contexts: ["editable", "password"]
		});
		// X.X
		chrome.contextMenus.create({
			id: "correctEan8",
			parentId: 'ean',
			title: "Poprawny 8",
			contexts: ["editable", "password"]
		});
		// X.X
		chrome.contextMenus.create({
			id: "incorrectEan8",
			parentId: 'ean',
			title: "Niepoprawny 8",
			contexts: ["editable", "password"]
		});
		chrome.contextMenus.create({
			id: "ean1",
			parentId: 'ean',
			type: "separator",
			contexts: ["editable", "password"]
		});
		// X.X
		chrome.contextMenus.create({
			id: "correctEan13",
			parentId: 'ean',
			title: "Poprawny 13",
			contexts: ["editable", "password"]
		});
		// X.X
		chrome.contextMenus.create({
			id: "incorrectEan13",
			parentId: 'ean',
			title: "Niepoprawny 13",
			contexts: ["editable", "password"]
		});
		chrome.contextMenus.create({
			id: "ean2",
			parentId: 'ean',
			type: "separator",
			contexts: ["editable", "password"]
		});
		// X.X
		chrome.contextMenus.create({
			id: "definedEan",
			parentId: 'ean',
			title: "Zdefiniowany",
			contexts: ["editable", "password"]
		});
		// ---
		chrome.contextMenus.create({
			id: "separator71",
			type: "separator",
			contexts: ["editable", "password"]
		});
	}

	if (menuItemText == 1) {
		chrome.contextMenus.create({
			id: "text",
			title: "TEKST DOMYŚLNY",
			contexts: ["editable", "password"]
		});

		chrome.contextMenus.create({
			id: "textFirst",
			parentId: 'text',
			title: "TEKST 1 [" + text1Length + "]",
			contexts: ["editable", "password"]
		});

		chrome.contextMenus.create({
			id: "textSecond",
			parentId: 'text',
			title: "TEKST 2 [" + text2Length + "]",
			contexts: ["editable", "password"]
		});

		chrome.contextMenus.create({
			id: "textThird",
			parentId: 'text',
			title: "TEKST 3 [" + text3Length + "]",
			contexts: ["editable", "password"]
		});

		chrome.contextMenus.create({
			id: "separator8",
			type: "separator",
			contexts: ["editable", "password"]
		});
	}

	if (menuItemSigns == 1) {
		chrome.contextMenus.create({
			id: "customSigns",
			title: "CIĄG ZNAKÓW",
			contexts: ["editable", "password"]
		});

		chrome.contextMenus.create({
			id: "separator9",
			type: "separator",
			contexts: ["editable", "password"]
		});
	}

	if (menuItemCsv == 1) {
		if (csvFileContent.length > 0 && csvFileContent != "undefined") {
			var allRows = csvFileContent.split(/\r?\n|\r/);

			var row = allRows[0].split(csvFileSeparator == "semicolon" ? ";" : ",");

			if (row.length > 0) {

				chrome.contextMenus.create({
					id: "csv",
					title: "CSV",
					contexts: ["editable", "password"]
				});

				for (var nameCount = 0; nameCount < row.length; nameCount++) {

					var csvName = row[nameCount];

					if (csvName.length > 15) {
						csvName = csvName.substring(0, 16) + "...";
					}

					chrome.contextMenus.create({
						id: "csv" + nameCount.toString(),
						title: csvName,
						parentId: 'csv',
						contexts: ["editable", "password"]
					});
				}
			}

			chrome.contextMenus.create({
				id: "separator10",
				type: "separator",
				contexts: ["editable", "password"]
			});

		}
	}

	if (menuItemData == 1) {
		var keywordsSet = getUserDataKeywords();
		if (keywordsSet.length > 0) {

			chrome.contextMenus.create({
				id: "data",
				title: "DANE UŻYTKOWNIKA",
				contexts: ["editable", "password"]
			});

			for (var i = 0; i < keywordsSet.length; i++) {

				var keywordName = keywordsSet[i].name;

				if (keywordName.length > 15) {
					keywordName = keywordName.substring(0, 16) + "...";
				}

				chrome.contextMenus.create({
					id: "data" + i.toString(),
					title: keywordName,
					parentId: 'data',
					contexts: ["editable", "password"]
				});
			}
			chrome.contextMenus.create({
				id: "separator11",
				type: "separator",
				contexts: ["editable", "password"]
			});
		}
	}
	chrome.contextMenus.create({
		id: "settings",
		title: "Ustawienia",
		contexts: ["all"]
	});
}

chrome.browserAction.onClicked.addListener(openOptionsPage);

chrome.contextMenus.onClicked.addListener(function (info, tab) {
	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		if (info.menuItemId == "settings") {
			openOptionsPage();
		} else if (info.menuItemId == "fillAllFields") {
			chrome.tabs.sendMessage(tabs[0].id, { action: "FILL_ALL_FIELDS" }, function (response) { });
		} else if (info.menuItemId == "fillSingleField") {
			chrome.tabs.sendMessage(tabs[0].id, { action: "FILL_SINGLE_FIELD" }, function (response) { });
		} else if (info.menuItemId == "clearForm") {
			chrome.tabs.sendMessage(tabs[0].id, { action: "CLEAR_FORM" }, function (response) { });
		} else if (info.menuItemId == "getId" || info.menuItemId == "getName") {
			chrome.tabs.sendMessage(tabs[0].id, { action: "GET_ATTRIBUTE", dataType: info.menuItemId }, function (response) { });
		} else {
			chrome.tabs.sendMessage(tabs[0].id, { action: "FILL_FIELD", dataType: info.menuItemId }, function (response) { });
		}
	});
});

chrome.storage.onChanged.addListener(function (changes, namespace) {
	if (changes) {
		menuItemNip = changes.menuItemNip ? changes.menuItemNip.newValue : menuItemNip;
		menuItemRegon = changes.menuItemRegon ? changes.menuItemRegon.newValue : menuItemRegon;
		menuItemPesel = changes.menuItemPesel ? changes.menuItemPesel.newValue : menuItemPesel;
		menuItemIdentityCard = changes.menuItemIdentityCard ? changes.menuItemIdentityCard.newValue : menuItemIdentityCard;
		menuItemIban = changes.menuItemIban ? changes.menuItemIban.newValue : menuItemIban;
		menuItemCard = changes.menuItemCard ? changes.menuItemCard.newValue : menuItemCard;
		menuItemKrs = changes.menuItemKrs ? changes.menuItemKrs.newValue : menuItemKrs;
		menuItemEan = changes.menuItemEan ? changes.menuItemEan.newValue : menuItemEan;
		menuItemText = changes.menuItemText ? changes.menuItemText.newValue : menuItemText;
		menuItemSigns = changes.menuItemSigns ? changes.menuItemSigns.newValue : menuItemSigns;
		menuItemCsv = changes.menuItemCsv ? changes.menuItemCsv.newValue : menuItemCsv;
		menuItemData = changes.menuItemData ? changes.menuItemData.newValue : menuItemData;
		text1Length = changes.text1Length ? changes.text1Length.newValue : text1Length;
		text2Length = changes.text2Length ? changes.text2Length.newValue : text2Length;
		text3Length = changes.text3Length ? changes.text3Length.newValue : text3Length;
		csvFileContent = changes.csvFileContent ? changes.csvFileContent.newValue : csvFileContent;
		csvFileSeparator = changes.csvFileSeparator ? changes.csvFileSeparator.newValue : csvFileSeparator;
		attributesNip = changes.attributesNip ? changes.attributesNip.newValue : attributesNip;
		attributesRegon = changes.attributesRegon ? changes.attributesRegon.newValue : attributesRegon;
		attributesPesel = changes.attributesPesel ? changes.attributesPesel.newValue : attributesPesel;
		attributesIdentityCard = changes.attributesIdentityCard ? changes.attributesIdentityCard.newValue : attributesIdentityCard;
		attributesIban = changes.attributesIban ? changes.attributesIban.newValue : attributesIban;
		attributesCard = changes.attributesCard ? changes.attributesCard.newValue : attributesCard;
		attributesKrs = changes.attributesKrs ? changes.attributesKrs.newValue : attributesKrs;
		userData = changes.userData ? changes.userData.newValue : userData;
	}
	drawContextMenu();
});

// open options page
function openOptionsPage() {
	var opening = chrome.runtime.openOptionsPage(function () {
		console.log("Strona ustawień wyświetlona");
	});
}

// logger
function log(message) {
	console.log(message);
}

// empty function
function noop() {
	log("Noop executed");
}

chrome.tabs.onUpdated.addListener(onTabUpdate);
chrome.tabs.onActivated.addListener(function(activeInfo) { onTabActive(activeInfo.tabId);});

function getUserDataKeywords() {
	var data = [];
	for (var i = 0; i < userData.length; i++) {
		var elements = userData[i];
		data.push({ name: elements[0], value: elements[1], attriubutes: elements[2] });
	}
	return data;
}

function onTabUpdate(tabId, changeInfo, tab) {
	if (changeInfo.hasOwnProperty("status") && typeof changeInfo.status === 'undefined') {
		changeInfo.status = 'loading';
		toolbarUpdate(0);
	} else if (changeInfo.status === 'loading') {
		toolbarUpdate(0);
	} else if (changeInfo.status === 'complete') {
		chrome.storage.local.get(null, function (result) {
			chrome.tabs.sendMessage(tabId, {
				action: 'COUNT_ELEMENTS', data: result
			}, function (response) {
				if (response) {
					elementsCountUpdate(response.elementsCount);
					toolbarUpdate(response.elementsCount);
				} else {
					elementsCountUpdate(0);
					toolbarUpdate(0);
				}
			});
		});
	}
}

function onTabActive(tabId) {
	chrome.storage.local.get(null, function (result) {
		chrome.tabs.sendMessage(tabId, {
			action: 'COUNT_ELEMENTS', data: result
		}, function (response) {
			if (response) {
				elementsCountUpdate(response.elementsCount);
				toolbarUpdate(response.elementsCount);
			} else {
				elementsCountUpdate(0);
				toolbarUpdate(0);
			}
		});
	});
}

function elementsCountUpdate(value) {
	elementsCount = value;
	drawContextMenu();
}

function toolbarUpdate(count) {
	var title = "Generator danych testowych";
	if (count > 0) {
		chrome.browserAction.setBadgeText({ text: count.toString() });
		chrome.browserAction.setTitle({ title: title + "\n\n" + "Liczba rozpoznanych pól do autouzupełnienia: " + count.toString() });
	} else {
		chrome.browserAction.setBadgeText({ text: "" });
		chrome.browserAction.setTitle({ title: title });
	}
}