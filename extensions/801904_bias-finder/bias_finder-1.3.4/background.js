let currentData = {};
let firstParagraph = "";
let confidence = "";

let currentTab;

const images = {
	"71": {"img": "Icons/icon-left.png", "name":"Left"},
	"72": {"img": "Icons/icon-leaning-left.png", "name":"Lean Left"},
	"73": {"img": "Icons/icon-center.png", "name":"Center"},
	"74": {"img": "Icons/icon-leaning-right.png", "name":"Lean Right"},
	"75": {"img": "Icons/icon-right.png", "name":"Right"},
	"2707": {"img": "Icons/icon-mixed.png", "name":"Mixed"},
	"2690": {"img": "Icons/icon-not-yet-rated.png", "name":"Not Rated"},
};
const nameDict = {
	"Left": "71",
	"Lean Left": "72",
	"Center": "73",
	"Lean Right": "74",
	"Right": "75",
	"Mixed": "2707",
	"Not Rated": "2690"
};
const hardcodeList = {
	"Washington Post": "https://washingtonpost.com/",
	"Yahoo News": "https://yahoo.com/",
	"Associated Press": "https://apnews.com/",
	"Newsweek": "https://newsweek.com/",
	"The Korea Herald": "https://koreaherald.com/",
	"The Advocate-Messenger": "https://amnews.com/",
	"CBN": "https://www1.cbn.com/",
	"CBS ": "https://cbsnews.com/",
	"Wall Street Journal- News": "https://wsj.com/",
	"CNN": "cnn.com/", //No https:// in order to add support for CNN's numerous subdomains.
};

$(() => {
	postVersionInfo();
	let data = [];
	$.getJSON('https://gist.githubusercontent.com/TheUnlocked/42be5e01eaad902415bf4c23224a8679/raw/biasfinder_data.json', d => data = data.concat(d))
	.always(() => $.getJSON('http://www.allsides.com/download/allsides_data.json', d => data = data.concat(d)))
	.always(() => {
		function switchIcon(tab, tabId){
			data = data.filter(obj => obj.news_source != "Test Source");

			currentTab = tab;

			let simplifiedURL = tab.url.toLowerCase().replace("http://", "https://").replace("www.", "");

			let biasList = data.filter(function(obj){
				if (!obj.url || obj.url === ""){
					return false;
				}
				if (obj.news_source in hardcodeList){
					return simplifiedURL.includes(hardcodeList[obj.news_source]);
				}
				return simplifiedURL.includes(obj.url.toLowerCase().replace("\\", "").replace("http://", "https://").replace("www.", ""));
			});
			if (biasList.length > 0){
				currentData = biasList.filter((obj) => obj.forced)[0] || biasList.sort((a,b) => a.bias_rating - b.bias_rating)[0];

				chrome.browserAction.setIcon({"path": {"24": images[currentData.bias_rating].img}, "tabId": tabId});
				chrome.browserAction.setTitle({"title": images[currentData.bias_rating].name + " - " + currentData.news_source, "tabId": tabId});
				chrome.browserAction.setPopup({"popup": "Popup/info_popup.html", "tabId": tabId});
				$.get(currentData.allsides_url.replace("\\", ""), function(data){
					dataText = String(data);
					firstParagraph = dataText.split('<div id="content"', 2)[1].split('<p>', 2)[1].split('</p>', 1)[0];
					confidence = dataText.split('<h4>Confidence Level:</h4>', 2)[1].split('<strong class="margin-left-25">')[1].split('</', 1)[0];
					let biasString = dataText.split('<span class="bias-value">', 2)[1].split('</', 1)[0];
					if (biasString && biasString != images[currentData.bias_rating].name){
						currentData.bias_rating = nameDict[biasString];
						chrome.browserAction.setIcon({"path": {"24": images[currentData.bias_rating].img}, "tabId": tabId});
						chrome.browserAction.setTitle({"title": images[currentData.bias_rating].name + " - " + currentData.news_source, "tabId": tabId});
					}
					currentData.news_source = dataText.split('<div class="span4 source-image-wrapper News Media">', 2)[1].split('<h2>', 2)[1].split('</', 1)[0];

					gotoSite(currentData.news_source, images[currentData.bias_rating].name);
				});
			}
		}
		chrome.tabs.onActivated.addListener(function(info){
			chrome.tabs.get(info.tabId, function(tab){
				switchIcon(tab, info.tabId);
			});
		});
		chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
			switchIcon(tab, tabId);
		});
	});
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse){
	if (message.message == "getinfo"){
		sendResponse(currentData);
	}
	else if (message.message == "getFirstParagraph"){
		sendResponse(firstParagraph);
	}
	else if (message.message == "getConfidence"){
		sendResponse(confidence);
	}
	return true;
});
