var allJson = [];
var htmlBlocks = {};
var activeBasket = 1;

var badgeColors = {1: '#0288d1', 2: '#689f38', 3: '#fbc02d', 4: '#7b1fa2', 5: '#d32f2f'};

getStats();

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {

		if (request.action == 'openOptionsPage') {
			chrome.runtime.openOptionsPage();
		} else if (request.action == 'checkUrl') {
			if (allJson.length == 0) {
				downloadJson(sender.tab, sendResponse);
			} else {
				checkUrl(sender.tab, sendResponse);
			}
		} else if (request.action == 'getRatings') {
			$.post('https://ratings.podborka-turov.ru/ratings/get', {operator: request.operator, country: request.country, hotels: JSON.stringify(request.hotels)}, function(result) {
				if (result.auth === undefined) {
					sendResponse({result: false});
				} else {
					sendResponse({result: true, data: result});
				}
			}).fail(function() {
				sendResponse({result: false});
			});
		} else if (request.action == 'setBadge') {
			setBadge(request.text);
			sendResponse({result: true});
		} else if (request.action == 'getHashes') {
			$.post('https://podborka-turov.ru/embded/get-tour-hashes', {hashes: request.hashes}, function(result) {
				if (result.hashes == undefined) {
					sendResponse({result: false});
				} else {
					sendResponse({result: true, data: result});
				}
			}).fail(function() {
				sendResponse({result: false});
			});
		} else if (request.action == 'getStats') {
			getStats();
		} else if (request.action == 'tourDeleted') {
			setBadge(request.tours_count);

			chrome.tabs.query({}, function(tabs) {
				for (var i=0; i < tabs.length; ++i) {
					chrome.tabs.sendMessage(tabs[i].id, {action: 'tourDeleted', hash: request.hash});
				}
			});
		} else if (request.action == 'basketChanged') {
			activeBasket = request.basket_number;
			setBadge(request.tours_count);

			chrome.tabs.query({}, function(tabs) {
				for (var i=0; i < tabs.length; ++i) {
					chrome.tabs.sendMessage(tabs[i].id, {action: 'basketChanged', basket_number: request.basket_number, tours_count: request.tours_count, hashes: request.hashes});
				}
			});
		} else if (request.action == 'tourAdd') {
			tourAdd(request.params);
		} else if (request.action == 'tourExport') {
			tourExport(request.params, request.url);
		} else if (request.action == 'tourAdded') {
			chrome.tabs.query({url: 'https://podborka-turov.ru/cabinet/preview-basket'}, function(tabs) {
				for (var i=0; i < tabs.length; ++i) {
					chrome.tabs.sendMessage(tabs[i].id, {action: 'tourAdded', hash: request.hash, tours_count: request.tours_count});
				}
			});

			var notificationOptions = {
				type: 'basic',
				iconUrl: 'icons/64.png',
				title: request['tour_info']['hotel_name'],
				message: 'Тур добавлен в подборку',
				contextMessage: 'Подборка-Туров.ру'
			}
			chrome.notifications.create('podborka-turov.ru_'+Date.now(), notificationOptions);
		} else if (request.action == 'saveImageUrl') {
			$.post('https://podborka-turov.ru/embded/save-image-url', {hotel_id: request.hotel_id, operator_id: request.operator_id, url: request.url});
		}
		return true;
	}
);

function setBadge(text) {
	text = String(text);

	if (text == '' || text == 0 || text == 'undefined') {
		chrome.browserAction.setBadgeText({text: ''});
		chrome.browserAction.setTitle({title: 'Подборка-Туров.ру'});
	} else {
		chrome.browserAction.setBadgeText({text: text});
		chrome.browserAction.setTitle({title: 'Подборка-Туров.ру ('+parseInt(text)+' '+declOfNum(parseInt(text), ['тур', 'тура', 'туров'])+')'});
	}

	chrome.browserAction.setBadgeBackgroundColor({color: badgeColors[activeBasket]});

	//if (color != '' && color != 'undefined') {
	//	chrome.browserAction.setBadgeBackgroundColor({color: color});
	//}
}

function getStats() {
	var version = '';
	try {
		var manifestData = chrome.runtime.getManifest();
		version = manifestData.version;
	}
	catch (e) { }

	$.get('https://podborka-turov.ru/embded/get-stats', {'v': version}, function(result) {
		activeBasket = result.active_basket;
		setBadge(result.tours_count);
	});

	downloadJson();
}

function tourAdd(params) {
	var params_final = {};
	for (var key in params) {
		params_final[key.replace('podborka-turov-hotel-name', 'podborka-turov-hotel').replace('podborka-turov-hotel-region', 'podborka-turov-region').replace('podborka-turov-', 'tour-')] = params[key];
	}

	$.post('https://podborka-turov.ru/embded/tour-item-add', params_final, function(result) {
		setBadge(result.tours_count);

		chrome.tabs.query({}, function(tabs) {
			for (var i=0; i < tabs.length; ++i) {
				chrome.tabs.sendMessage(tabs[i].id, {action: 'tourAdded', hash: params_final['tour-hash'], tours_count: result.tours_count});
			}
		});

		var notificationOptions = {
			type: 'basic',
			iconUrl: 'icons/64.png',
			title: params_final['tour-hotel'],
			message: 'Тур добавлен в подборку',
			contextMessage: 'Подборка-Туров.ру'
		}
		chrome.notifications.create('podborka-turov.ru_'+Date.now(), notificationOptions);
	});
}

function tourExport(params, url) {
	var params_final = {};
	for (var key in params) {
		params_final[key.replace('podborka-turov-hotel-name', 'podborka-turov-hotel').replace('podborka-turov-hotel-region', 'podborka-turov-region').replace('podborka-turov-', 'tour-')] = params[key];
	}

	var query_string = $.param(params_final);

	chrome.tabs.create({'url': url+'/tours/import/?'+query_string});
}

function downloadJson(tab, sendResponse) {
	$.get('https://podborka-turov.ru/embded/get-json-data?_='+Date.now(), function(json) {
		allJson = [];
		htmlBlocks = json.html_blocks;

		for (var site_key in json.sites) {
			var site = json.sites[site_key];

			for (var url_key in site.urls) {
				var url_regexp_string = site.urls[url_key];
				var url_regexp = new RegExp('^http[s]?:\/\/'+url_regexp_string+'.*','i');

				allJson.push({'url': url_regexp_string, 'url_regexp': url_regexp, 'data': site});
			}
		}

		if (tab && sendResponse) {
			checkUrl(tab, sendResponse);
		}
	}).fail(function() {
		if (tab && sendResponse) {
			sendResponse({'result': false});
		}
	});
}

function checkUrl(tab, sendResponse) {
	var data = [];

	for (var key in allJson) {
		if (allJson[key].url_regexp.test(tab.url) && data.indexOf(allJson[key].data) == -1) {
			data.push(allJson[key].data);
		}
	}

	if (data.length > 0) {
		sendResponse({'result': true, 'data': data, 'html_blocks': htmlBlocks});
		return true;
	} else {
		sendResponse({'result': false});
	}
}

function declOfNum(n, titles) {
	return titles[(n % 10 === 1 && n % 100 !== 11) ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2];
}

setInterval(function(){
    getStats();
}, 1000 * (Math.random() * 300 + 600)); //10-15min
