vflscrsh.prefs = {};
vflscrsh.prefs.list = {};

//------------------------------------------------------------------------------
vflscrsh.prefs.init = function(callback) {
	chrome.storage.local.get(function(items) {
		vflscrsh.prefs.list = items;

		if (vflscrsh.i18n) {
			vflscrsh.i18n.init(items.current_locale);
		}

		vflscrsh.prefs.check_defaults();
		if (callback) {
			callback();
		}
	});
}
//------------------------------------------------------------------------------
vflscrsh.prefs.set = function(pref) {
	var pref_hash = {};
	pref_hash[pref.name] = pref.value;
	chrome.storage.local.set(pref_hash);
	vflscrsh.prefs.list[pref.name] = pref.value;
}
//------------------------------------------------------------------------------
vflscrsh.prefs.get = function(pref_name) {
	return vflscrsh.prefs.list[pref_name];
}
//------------------------------------------------------------------------------
vflscrsh.prefs.check_defaults = function() {
	var defaults = vflscrsh.utils.clone_object(vflscrsh.prefs.defaults);

	for (var pref_name in defaults) {
		if (vflscrsh.prefs.list[pref_name] === undefined) {
			vflscrsh.prefs.list[pref_name] = defaults[pref_name];
		}
		else if (typeof(vflscrsh.prefs.list[pref_name]) != typeof(defaults[pref_name])) {
			vflscrsh.prefs.list[pref_name] = defaults[pref_name];
		}
	}
}
//------------------------------------------------------------------------------
vflscrsh.prefs.reset_defaults = function(callback) {
	chrome.storage.local.clear(function() {
		vflscrsh.prefs.list = {};
		vflscrsh.prefs.check_defaults();
		if (vflscrsh.i18n) {
			vflscrsh.i18n.init();
		}
		if (callback) {
			callback();
		}
	});
}
//------------------------------------------------------------------------------
vflscrsh.prefs.defaults = {
	'current_version' : '0',
	'not_open_contribute_page' : false,
	'show_page_timer' : 0, 
	'advertisement' : 'wait',		// wait, check, on, off

	'templateFileName' : '{#TITLE#} - {#YYYY#}-{#MM#}-{#DD#}_{#H#}.{#M#}.{#S#}',
	'templateImageName' : '{#URL#}',
	
	'convertumlaute' : false,
	'onlyascii' : false,
	'replaceCharInFilename' : "_",
	
	'imageFormat' : 'png', // png, jpg, bmp, webp
	'jpgImageQuality' : 70,
	'webpImageQuality' : 70,
	'insertTextInImage' : false,
	'uploadLinkToClipboard' : false,
	'uploadStorage' : 'vfl.ru',
	'uploadDisable' : false,
	'onlyPageForce' : false,

	'defaultSavePath' : 'vflru',
	'quicklySave' : false,

	'showInContextMenu' : true,
	'showCopyNotification' : true,

	'buttonClickIconGeneral' : 'menu',
	'buttonClickIconAdditional' : 'visible_portion',

	'hotkeys' : [{ shiftKey:true, ctrlKey:true, altKey:false, keyCode:49, key:'!', method:'preview', target: 'visible_portion' , closetab: false }],

	'selection.savePosition' : false,
	'selection.startX' : 0,
	'selection.startY' : 0,
	'selection.width' : 0,
	'selection.height' : 0,
	'selection.scrollX' : 0,
	'selection.scrollY' : 0,
	'selection.fastMode' : false,
	'selection.hide_hint_text' : false,

	'last_operation' : { 'method' : 'save', 'target' : 'page' },

	'_end' : '_end'
};
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
vflscrsh.prefs.init();
