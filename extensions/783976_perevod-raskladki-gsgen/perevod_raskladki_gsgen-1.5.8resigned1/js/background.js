(function (chrome) {
// Определение начальных настроек расширения	
	if(!localStorage['no_alert']) localStorage['no_alert'] = 'off';
	if(!localStorage['no_save_last']) localStorage['no_save_last'] = 'on';
// Добавление пунктов в контекстное меню
	chrome.contextMenus.create({
		"title" : chrome.i18n.getMessage('context_menu'),
		"type" : "normal",
		"contexts" : ["selection"],
		"id": "gs_contextId"
	});
	chrome.contextMenus.create({
		"title" : chrome.i18n.getMessage('mode_en_ru'),
		"type" : "normal",
		"contexts" : ["selection"],
		"id": "gs_contextId_ru",
		"parentId": "gs_contextId"
	});
	chrome.contextMenus.create({
		"title" : chrome.i18n.getMessage('mode_ru_en'),
		"type" : "normal",
		"contexts" : ["selection"],
		"id": "gs_contextId_en",
		"parentId": "gs_contextId"
	});
	chrome.contextMenus.onClicked.addListener(function(info, tab) {
		if(localStorage['no_save_last'] != 'on') {
			localStorage['selection_text'] = info.selectionText;
			localStorage['menuItemId'] = info.menuItemId;
		}
		var text_buffer = "";
		if(info.menuItemId == "gs_contextId_ru") {
			text_buffer = to_rus(info.selectionText);
		} else if(info.menuItemId == "gs_contextId_en") {
			text_buffer = to_lat(info.selectionText);
		}
		if(localStorage['no_alert'] != 'on') {
			chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
				chrome.tabs.sendMessage(tabs[0].id, {result_text: text_buffer}, function(response) {
					// console.log(response.alert_text);
				});
			});
		}
	});
})(chrome);