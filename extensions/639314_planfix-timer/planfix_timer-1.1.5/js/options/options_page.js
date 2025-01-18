browser.storage.local.get({showBadge: true}).then((r) => {
	$("#showBadgeCheckbox").prop("checked", r.showBadge);
});
$("#showBadgeCheckbox").change(function() {
	browser.storage.local.set({showBadge: this.checked});
});

browser.storage.local.get({stopTimerOnBrowserClose: false}).then((r) => {
	$("#stopTimerOnBrowserClose").prop("checked", r.stopTimerOnBrowserClose);
})
$("#stopTimerOnBrowserClose").change(function() {
	browser.storage.local.set({stopTimerOnBrowserClose: this.checked});
});

$("#resetSettingsBtn").on('click', this, function(e) {
	e.preventDefault();
	localStorage["saved"] = true;
	browser.storage.local.remove(["saveMessageData"]);
	
	$('#stopTimerOnBrowserClose').prop('checked', false);
	$('#stopTimerOnBrowserClose').trigger('change');
});

$('#header-logo').text(chrome.i18n.getMessage("app_system3"));
$('label[for="showBadgeCheckbox"]').text(chrome.i18n.getMessage("app_action5"));
$('label[for="stopTimerOnBrowserClose"]').text(chrome.i18n.getMessage("app_action6"));
$('#resetSettings').text(chrome.i18n.getMessage("app_action7"));
$('.info-for-develope').text(chrome.i18n.getMessage("app_info1"));
$('#resetSettingsBtn').text(chrome.i18n.getMessage("app_action4"));

$(".field").on('click', ".info-for-develope[data-attr='get-info']", function(e) {
	var self = this;
	
	e.preventDefault();

	browser.runtime.sendMessage({type: MessageType.INFO_FOR_DEVELOPE}).then((res) => {
		jQuery('<textarea/>', {
			id: 'info-for-develope-textarea',
			text: JSON.stringify(res)
		}).appendTo($(self).parent());

		$('.info-for-develope').text(chrome.i18n.getMessage('app_action3')).attr("data-attr", "copy-info");
	});
});

$(".field").on('click', ".info-for-develope[data-attr='copy-info']", function(e) {
	e.preventDefault();
	var textElem = $('#info-for-develope-textarea');

	textElem.select();
	// Пробуем скопировать
	if (document.execCommand('copy')) {
		$('.info-for-develope').text(chrome.i18n.getMessage('app_info1')).attr('data-attr', 'get-info');
		textElem.remove();
	} 
	else {
		$('.info-for-develope').text(chrome.i18n.getMessage('app_error1')).attr('data', 'error');
	}
});