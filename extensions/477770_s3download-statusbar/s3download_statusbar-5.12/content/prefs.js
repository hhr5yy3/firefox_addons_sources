s3dm.prefs = {};
s3dm.prefs.list = {};
s3dm.prefs.is_init = false;

//------------------------------------------------------------------------------
s3dm.prefs.init = function(callback) {
	chrome.storage.local.get(function(items) {
		s3dm.prefs.list = items;

		if (s3dm.i18n) {
			s3dm.i18n.init(items.current_locale);
		}

		s3dm.prefs.check_defaults();
		s3dm.prefs.is_init = true;
		if (callback) {
			callback();
		}
	});
}
//------------------------------------------------------------------------------
s3dm.prefs.set = function(pref) {
	var pref_hash = {};
	pref_hash[pref.name] = pref.value;
	chrome.storage.local.set(pref_hash);
	s3dm.prefs.list[pref.name] = pref.value;
}
//------------------------------------------------------------------------------
s3dm.prefs.get = function(pref_name) {
	return s3dm.prefs.list[pref_name];
}
//------------------------------------------------------------------------------
s3dm.prefs.check_defaults = function() {
	var defaults = s3dm.utils.clone_object(s3dm.prefs.defaults);

	for (var pref_name in defaults) {
		if (s3dm.prefs.list[pref_name] === undefined) {
			s3dm.prefs.list[pref_name] = defaults[pref_name];
		}
		else if (typeof(s3dm.prefs.list[pref_name]) != typeof(defaults[pref_name])) {
			s3dm.prefs.list[pref_name] = defaults[pref_name];
		}
	}
}
//------------------------------------------------------------------------------
s3dm.prefs.reset_defaults = function(callback) {
	chrome.storage.local.clear(function() {
		s3dm.prefs.list = {};
		s3dm.prefs.check_defaults();
		if (s3dm.i18n) {
			s3dm.i18n.init();
		}
		if (callback) {
			callback();
		}
	});
}
//------------------------------------------------------------------------------
s3dm.prefs.defaults = {
	'current_version' : '0',
	'not_open_contribute_page' : false,
	'show_page_timer' : 0,
	'first_run' : true,

	'download_list' : {},

	'downbar_show' : true,
	'downbar_position' : 'bottom', // top , bottom
	'downbar_exclude_links' : [],
	'downbar_is_collapsed' : false,

	'display.percent' : false,
	'display.speed' : true,
	'display.size' : false,
	'display.time' : true,
	'function.clearFiletypes' : "jpg, jpeg, png, gif",
	'function.clearFiletypesKeepHistory' : true,
	'function.ignoreFiletypes' : "",
	'function.autoFiletypes' : "",
	'function.timeToClear' : 5,
	'function.askOnDelete' : true,
	'function.removeOnOpen' : false,
	'function.removeOnShow' : false,
	'function.showTooltip' : true,
	'function.showTooltip_hint' : true,
	'function.dblclickClearPanel' : false,

	'function.keepHistory' : true,
	'function.trimHistory' : false,
	'function.numToTrim' : 50,
	'function.numToShowCompleted' : 50,
	'function.clearFinishedAfterCloseBrowser' : false,
	'function.hideStatusbarAfterAllFinished' : false,
	'function.hideStatusbarAfterAllFinishedTime' : 0,

	'function.virusScan' : false,
	'function.virusExclude' : "jpg, jpeg, gif, png" ,
	'function.virusMode' : 'checksum', // checksum , url
	'function.virusAutoScan' : false,

	'function.queueMode' : false,
	'function.queueNum' : 3,
	'function.queueIgnoreSizeKB' : 0,

	'function.popupNotification' : true,
	'function.popupNotification_filesize' : 0,
	'function.popupNotification_timesize' : 0,
	'function.popupNotification_ignore' : '',

	'function.autoOpenFolder' : false,

	'context_menu.downloadbar_show' : true,

	'style.default' : true,
	'style.version' : 1,
	'style.progressbar_color' : "#89AFDB",
	'style.progressremainder_color' : "#FFFFFF",
	'style.finishedHbox_color' : "#89AFDB",
	'style.notdoneHbox_color' : "#A3A3A3",
	'style.pausedHbox_border_color' : "#FF0000",
	'style.filenameLabel_color' : '#222222',
	'style.filenameLabel_size' : 9,
	'style.downbar_color' : '#EEEEEE',
	'style.downbar_height' : 60,
	'style.progressIndicator_size' : 5,
	'style.tooltipFontSize' : 9,
	'style.hbox_width' : 170,
	'style.hbox_height' : 20,
	'style.button_text_color' : '#222222',
	'style.button_text_size' : 9,
	'style.contextmenu_bgcolor' : '#F0F0F0',
	'style.contextmenu_text_color' : '#222222',
	'style.contextmenu_text_size' : 9,

	'style.speedColorsEnabled' : true,
	'style.speedColor0' : "#708FB5",
	'style.speedColorKB0' : 0,
	'style.speedColor1' : "#81A5CE",
	'style.speedColorKB1' : 50,
	'style.speedColor2' : "#8FB9E8",
	'style.speedColorKB2' : 200,
	'style.speedColor3' : "#9AC5F7",
	'style.speedColorKB3' : 400,
	'style.useGradients' : true,
	'function.useAnimation' : true,
	'function.soundComplete' : true,
	'function.soundCustomCompleteFile' : "",
	'function.soundCustomCompleteData' : "",
	'function.soundCompleteIgnore' : "",
	'function.soundComplete_filesize' : 0,
	'function.soundComplete_timesize' : 0,

	'display.mainButton' : true,
	'display.clearButton' : true,
	'display.hideButton' : true,
	'display.summaryProgress' : true,
	'display.dateTimeFormat' : '%Y.%m.%d - %H:%M:%S',

	'display.mainButtonFromLeft' : true,
	'display.clearButtonFromLeft' : false,
	'display.hideButtonFromLeft' : false,
	'display.summaryProgressFromLeft' : false,

	'function.placeDownloadsFromRight' : true,
	'function.placeDownloadsScrollToNew' : true,

	'popup.sort_direction' : 'descending',

	'DL.openInWindow' : false,
	'DL.showCreateNewButton' : true,
	'DL.showPauseButton' : true,
	'DL.showResumeButton' : true,
	'DL.showCancelButton' : true,
	'DL.showRemoveButton' : true,
	'DL.showTooltip' : true,
	'DL.showTooltip_hint' : true,
	'DL.switchDownloadsTab' : false,
	'DL.dateTimeFormat' : '%Y.%m.%d - %H:%M:%S',
	'DL.confirmDeleteSystem' : true,
	'DL.confirmDeleteHistory' : true,
	'DL.sortName' : 'DateTime',
	'DL.sortDirection' : 'descending',
	'DL.fields_list' : {
		'FileName' : { 'size' : 1.2, 'disabled' : false, 'order' : 1 },
		'FileExt' : { 'size' : 0.4, 'disabled' : false, 'order' : 2 },
		'FileFullPath' : { 'size' : 1.5, 'disabled' : false, 'order' : 3 },
		'FileSize' : { 'size' : 0.8, 'disabled' : false, 'order' : 4 },
		'Progress' : { 'size' : 1.5, 'disabled' : false, 'order' : 5 },
		'ProgressPercent' : { 'size' : 0.4, 'disabled' : false, 'order' : 6 },
		'Speed' : { 'size' : 0.6, 'disabled' : false, 'order' : 7 },
		'TimeRemaining' : { 'size' : 0.6, 'disabled' : false, 'order' : 8 },
		'URL' : { 'size' : 1.5, 'disabled' : false, 'order' : 9 },
		'Domain' : { 'size' : 0.6, 'disabled' : false, 'order' : 10 },
		'DateTime' : { 'size' : 0.8, 'disabled' : false, 'order' : 11 }
	},

	'hotkeys' : [
		{"altKey":false,"ctrlKey":true,"key":"j","keyCode":74,"method":"open_downloads","shiftKey":false},
		{"altKey":false,"ctrlKey":true,"key":"Z","keyCode":90,"method":"hide_downbar","shiftKey":true},
		{"altKey":false,"ctrlKey":true,"key":"Backspace","keyCode":8,"method":"clear_last","shiftKey":true},
		{"altKey":false,"ctrlKey":true,"key":"Insert","keyCode":45,"method":"undo_clear","shiftKey":true},
		{"altKey":false,"ctrlKey":true,"key":"Enter","keyCode":13,"method":"open_last_file","shiftKey":true},
		{"altKey":true,"ctrlKey":false,"key":"Enter","keyCode":13,"method":"show_last_file","shiftKey":true}
	],

	'_end' : '_end'
};
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
s3dm.prefs.init();
