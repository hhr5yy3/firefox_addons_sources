var s3dm = {};
s3dm.form = null;

//------------------------------------------------------------------------------
s3dm.init_0 = function() {
	s3dm.prefs.init(function(){
		setTimeout(function(){ s3dm.utils.i18n_parse(document); }, 100);
		s3dm.form = document.getElementById('s3dm_form');
		//------------------------------------------------------------------------
		var current_locale = document.getElementById('current_locale');
		for (var i=0; i<s3dm.I18N_SUPPORTED.length; i++) {
			var el_lang = s3dm.I18N_SUPPORTED[i];
			var option = document.createElement("option");
			option.text = el_lang.name;
			option.value = el_lang.lang;
			option.setAttribute('title', el_lang.english);
			current_locale.options.add(option);
		}
		//------------------------------------------------------------------------
		s3dm.init_events();
		setTimeout(function(){ s3dm.init(); }, 100);
	});
}
//------------------------------------------------------------------------------
s3dm.init = function() {
	var manifest = chrome.runtime.getManifest();
	document.getElementById('addon_version').textContent = manifest.version;

	s3dm.init_prefs();
	s3dm.hotkeys_init();
	s3dm.popupNotification_check();
	s3dm.sound_check();
	s3dm.hideStatusbarAfterAllFinished();
	s3dm.showTooltip_check('options_show_tooltip');
	s3dm.showTooltip_check('DL_show_tooltip');
	s3dm.enableDownbar();
	s3dm.keep_history_check();
	s3dm.queue_check();
	s3dm.style_default_check();
	s3dm.show_buttons('showMainButton');
	s3dm.show_buttons('showClearButton');
	s3dm.show_buttons('showHideButton');
	s3dm.show_buttons('showSummaryProgress');
	s3dm.speed_color_check();
	s3dm.speed_color_change('speedColorKB1');
	s3dm.speed_color_change('speedColorKB2');
	s3dm.speed_color_change('speedColorKB3');
	s3dm.virusAutoScan_check();
	s3dm.checkAVenable();
	s3dm.download_history_init();

	//------------------------------------------------------------------------
	var exclude_links = s3dm.utils.prefs_get('downbar_exclude_links');
	exclude_links = exclude_links.map(function(element) { return element.replace(/\s/g, ''); });
	document.getElementById('exclude_links').value = exclude_links.join("\n");
	document.getElementById('exclude_links_save').setAttribute('is_hidden', true);

	document.getElementById('exclude_links').addEventListener('change', s3dm.exclude_links_set);
	document.getElementById('exclude_links').addEventListener('keyup', s3dm.exclude_links_set);
	document.getElementById('exclude_links').addEventListener('paste', s3dm.exclude_links_set);

	//------------------------------------------------------------------------
	document.getElementById('style_downbar_height').value = s3dm.utils.prefs_get('style.downbar_height');

	//------------------------------------------------------------------------
	var show_tab = window.location.hash || '';
	if (show_tab) {
		if (/\-\-/.test(show_tab)) {
			var main_tab = show_tab.replace(/^([^\-]+).*$/, '$1');
			if (tab_list[main_tab]) {
				tab_list.main.showTab(null, main_tab);
				tab_list[main_tab].showTab(null, show_tab);
			}
		} else {
			tab_list.main.showTab(null, show_tab);
		}
	}
}
//------------------------------------------------------------------------------
s3dm.init_events = function() {
	s3dm.form.addEventListener('submit', function(event){
		event.preventDefault();
		event.stopPropagation();
	});

	//------------------------------------------------------------------------
	var input_list = document.getElementsByTagName('input');
	for (var i=0; i<input_list.length; i++) {
		if (input_list[i].getAttribute('clickSelectsAll')) {
			input_list[i].addEventListener('click', function(event){
				this.select();
			});
		}
	}

	//------------------------------------------------------------------------
	document.getElementById('options_show_tooltip').addEventListener('click', function(){ s3dm.showTooltip_check('options_show_tooltip'); });
	document.getElementById('DL_show_tooltip').addEventListener('click', function(){ s3dm.showTooltip_check('DL_show_tooltip'); });

	//------------------------------------------------------------------------
	document.getElementById('popupNotification').addEventListener('click', function(){ s3dm.popupNotification_check(); });

	//------------------------------------------------------------------------
	document.getElementById('playSound').addEventListener('click', function(){ s3dm.sound_check(); });
	document.getElementById('soundSelect').addEventListener('change', function(){ s3dm.sound_select(); });
	document.getElementById('soundPlay').addEventListener('click', function(){ s3dm.sound_play(); });
	document.getElementById('soundFile').addEventListener("click", function(event) { s3dm.sound_check(); });
	document.getElementById('soundFile').addEventListener("change", function(event) {
		var file = event.target.files[0];
		if (file) {
			s3dm.utils.convert_to_dataURL(file, function(result){
				if (! result) { result = ''; }
				//-----------------------------------------------------
				s3dm.pref_save('function.soundCustomCompleteData', result, function() {
					s3dm.pref_save('function.soundCustomCompleteFile', file.name, function() {
						s3dm.sound_check();
						s3dm.sound_play();
					});
				});
			});
		} else {
			s3dm.pref_save('function.soundCustomCompleteData', '', function() {
				s3dm.sound_check();
			});
		}
		event.target.value = '';
	}, true);

	//------------------------------------------------------------------------
	document.getElementById('enableDownbar').addEventListener('click', function(){ s3dm.enableDownbar(); });
	document.getElementById('hideStatusbarAfterAllFinished').addEventListener('click', function(){ s3dm.hideStatusbarAfterAllFinished(); });
	document.getElementById('keepHistory').addEventListener('click', function(){ s3dm.keep_history_check(); });
	document.getElementById('trimHistory').addEventListener('click', function(){ s3dm.keep_history_check_trim(); });
	document.getElementById('queEnable').addEventListener('click', function(){ s3dm.queue_check(); });

	//------------------------------------------------------------------------
	document.getElementById("hotkey_button_plus").addEventListener('click', function(){ s3dm.hotkey_plus(); });

	//------------------------------------------------------------------------
	document.getElementById('exclude_links').addEventListener("mousemove", function(event) {
		if (event.buttons == 1) {
			document.getElementById('exclude_links_placeholder').style.width = document.getElementById('exclude_links').offsetWidth-2 + 'px';
			document.getElementById('exclude_links_placeholder').style.height = document.getElementById('exclude_links').offsetHeight + 'px';
		}
	});
	//------------------------------------------------------------------------
	document.getElementById('exclude_links_save').addEventListener('click', s3dm.exclude_links_save);

	//------------------------------------------------------------------------
	document.getElementById('defaultStyle').addEventListener('click', s3dm.style_default_check);
	document.getElementById('customStyle').addEventListener('click', s3dm.style_default_check);
	document.getElementById('resetCustom').addEventListener('click', s3dm.style_custom_reset);

	//------------------------------------------------------------------------
	document.getElementById("showMainButton").addEventListener('click', function(){ s3dm.show_buttons('showMainButton'); });
	document.getElementById("showClearButton").addEventListener('click', function(){ s3dm.show_buttons('showClearButton'); });
	document.getElementById("showHideButton").addEventListener('click', function(){ s3dm.show_buttons('showHideButton'); });
	document.getElementById("showSummaryProgress").addEventListener('click', function(){ s3dm.show_buttons('showSummaryProgress'); });

	//------------------------------------------------------------------------
	document.getElementById('speedColorsEnabled').addEventListener('click', s3dm.speed_color_check);
	document.getElementById('resetCustom_speed').addEventListener('click', s3dm.speed_color_reset);
	document.getElementById("speedColorKB1").addEventListener('change', function(){ s3dm.speed_color_change('speedColorKB1'); });
	document.getElementById("speedColorKB2").addEventListener('change', function(){ s3dm.speed_color_change('speedColorKB2'); });
	document.getElementById("speedColorKB3").addEventListener('change', function(){ s3dm.speed_color_change('speedColorKB3'); });

	//------------------------------------------------------------------------
	document.getElementById('virusScan').addEventListener('click', s3dm.confirmAVenable);
	document.getElementById('virusAutoScan').addEventListener('click', s3dm.virusAutoScan_check);

	//------------------------------------------------------------------------
	document.getElementById('save_settings').addEventListener('click', function(){ s3dm.save_settings('save'); });
	document.getElementById('copy_settings').addEventListener('click', function(){ s3dm.save_settings('copy'); });
	document.getElementById('load_settings').addEventListener('click', function(){ s3dm.load_settings(); });
	document.getElementById('load_settings_file').addEventListener('change', function(event){ s3dm.load_settings_file(event); });
	document.getElementById('reset_settings').addEventListener('click', function(){ s3dm.reset_settings(); });
}
//------------------------------------------------------------------------------
s3dm.window_close = function() {
	chrome.runtime.sendMessage({ action: 'window_close' }, function(response) {});
}
//------------------------------------------------------------------------------
s3dm.init_prefs = function() {
	for (var pref_name in s3dm.prefs.list) {
		var pref_value = s3dm.prefs.list[pref_name];
		var pref_el = s3dm.form[pref_name];
		if (pref_el) {
			if (pref_el.type && (pref_el.type == 'checkbox')) {
				pref_el.checked = pref_value;
			} else {
				pref_el.value = pref_value;
			}
			pref_el.type_of = typeof(pref_value);
		}
	}
	//------------------------------------------------------------------------
	s3dm.form.addEventListener('change', function(event) {
		var pref_el = event.target;
		if (! pref_el.name) { return; }
		if (s3dm.prefs.list[pref_el.name] === undefined) { return; }
		//-----------------------------------------------------
		var callback = null;
		var pref_value = pref_el.value;
		//-----------------------------------------------------
		if (pref_el.type && (pref_el.type == 'checkbox')) {
			pref_value = pref_el.checked;
		}
		//-----------------------------------------------------
		else if (pref_el.name == 'current_locale') {
			callback = function() {
				s3dm.i18n.init(pref_value);
				s3dm.utils.i18n_parse(document);
			}
		}
		//-----------------------------------------------------
		else if (typeof(s3dm.prefs.list[pref_el.name]) == 'number') {
			pref_value = parseInt(pref_el.value);
		}
		//-----------------------------------------------------
		else if (typeof(s3dm.prefs.list[pref_el.name]) == 'boolean') {
			pref_value = (String(pref_el.value) == 'true');
		}
		//-----------------------------------------------------
		s3dm.pref_save(pref_el.name, pref_value, callback);
		pref_el.blur();
	});
}
//------------------------------------------------------------------------------
s3dm.pref_save = function(pref_name, pref_value, callback) {
	chrome.runtime.sendMessage({ 'action_prefs_set': true, 'pref_name' : pref_name, 'pref_value': pref_value }, function(response) {
		s3dm.utils.prefs_set(pref_name, pref_value);
		if (callback) {
			callback(pref_name, pref_value);
		}
		s3dm.save_settings_message();
	});
}
//-------------------------------------------------------------------------------------------
s3dm.save_settings = function(mode) {
	chrome.runtime.sendMessage({ 'save_settings': true, 'mode' : mode }, function(response) {});
}
//-------------------------------------------------------------------------------------------
s3dm.load_settings = function() {
	document.getElementById('load_settings_file').click();
}
//-------------------------------------------------------------------------------------------
s3dm.load_settings_file = function(event) {
	var file = event.target.files[0];
	var reader = new FileReader();
	//----------------------------------------------------------------------
	reader.onload = function(e) {
		s3dm.load_settings_file_done(e.target.result || '');
	}
	reader.readAsText(file);
}
//-------------------------------------------------------------------------------------------
s3dm.load_settings_file_done = function(result_txt) {
 	//-----------------------------------------------------------------------
	var prefs_list = result_txt.split("\n");
	var pref_branch = s3dm.utils.clone_object(s3dm.prefs.list);
	//-----------------------------------------------------------------------
	for (var i=0; i<prefs_list.length; i++) {
		try {
			var pref = prefs_list[i].replace(/[\n\r]/g, '');
			var p = pref.match(/^(.*?)\=(.*)/);
			var pref_name = p[1] || '---';
			var pref_value = p[2];
			if (pref_name in pref_branch) {
				if (typeof(pref_branch[pref_name]) == 'boolean') {
					pref_value = (String(pref_value) == 'true');
				} else if (typeof(pref_branch[pref_name]) == 'number') {
					pref_value = parseInt(pref_value);
				} else if (typeof(pref_branch[pref_name]) == 'object') {
					pref_value = JSON.parse(pref_value);
				} else if (typeof(pref_branch[pref_name]) == 'array') {
					pref_value = JSON.parse(pref_value);
				}
				chrome.runtime.sendMessage({ 'action_prefs_set': true, 'pref_name' : pref_name, 'pref_value': pref_value }, function(response) {
					s3dm.utils.prefs_set(pref_name, pref_value);
				});
			}
		} catch(e) {
		}
	}
	//-----------------------------------------------------------------------
	alert(s3dm.utils.get_string('message.settings_loaded'));
	window.location.reload();
}
//------------------------------------------------------------------------------
s3dm.reset_settings = function() {
	if (confirm(s3dm.utils.get_string('confirm.warning'))) {
		chrome.runtime.sendMessage({ 'action_reset_defaults': true }, function(response) {
			s3dm.prefs.reset_defaults(function(){
				s3dm.utils.i18n_parse(document);
				s3dm.init();
				s3dm.save_settings_message();
				alert(s3dm.utils.get_string('message.settings_restored'));
				window.location.reload();
			});
		});
	}
}
//------------------------------------------------------------------------------
s3dm.save_settings_message = function() {
	document.getElementById("settings_saved").removeAttribute('is_hidden');
	document.getElementById('addon_version').setAttribute('is_hidden', true);
	setTimeout(function(){
		document.getElementById("settings_saved").setAttribute('is_hidden', true);
		document.getElementById("addon_version").removeAttribute('is_hidden');
	}, 500);
}
//------------------------------------------------------------------------------
s3dm.showTooltip_check = function(id) {
	s3dm.set_element_disable(document.getElementById(id + "_hint"), ! document.getElementById(id).checked);
}
//------------------------------------------------------------------------------
s3dm.popupNotification_check = function(id) {
	s3dm.set_element_disable(document.getElementById('popupNotification_addbox'), ! document.getElementById('popupNotification').checked);
	s3dm.set_element_disable(document.getElementById('popupNotification_ignore_box'), ! document.getElementById('popupNotification').checked);
}
//------------------------------------------------------------------------------
s3dm.sound_check = function() {
	if (document.getElementById("playSound").checked) {
		document.getElementById("soundSelect").removeAttribute("disabled");
		document.getElementById("soundPlay").removeAttribute("disabled");
		document.getElementById("soundExcludeLabel").removeAttribute("disabled");
		document.getElementById("soundIgnoreFiletypes").removeAttribute("disabled");  // have to remove or it doesn't work
	}
	else {
		document.getElementById("soundSelect").setAttribute("disabled", "true");
		document.getElementById("soundPlay").setAttribute("disabled", "true");
		document.getElementById("soundExcludeLabel").setAttribute("disabled", "true");
		document.getElementById("soundIgnoreFiletypes").setAttribute("disabled", "true");
	}
	//------------------------------------------------------------------------
	s3dm.set_element_disable(document.getElementById("soundComplete_addbox"), ! document.getElementById("playSound").checked);
	//------------------------------------------------------------------------
	if (s3dm.utils.prefs_get('function.soundCustomCompleteData')) {
		var filename = s3dm.utils.prefs_get('function.soundCustomCompleteFile');
		if (filename) {
			document.getElementById('soundSelect').setAttribute('title', filename);
			document.getElementById('customSound').setAttribute('title', filename);
		}
		document.getElementById('soundSelect').value = 'customSound';
	} else {
		document.getElementById('soundSelect').value = 'defaultSound';
		document.getElementById('soundSelect').setAttribute('title', '');
		document.getElementById('customSound').setAttribute('title', '');
	}
}
//------------------------------------------------------------------------------
s3dm.sound_play = function() {
	if (! s3dm.sound) {
		s3dm.sound = new Audio();
		s3dm.preload = 'none';
	}
	var sound_custom = s3dm.utils.prefs_get('function.soundCustomCompleteData') || chrome.extension.getURL('/skin/downbar_finished.ogg');

	s3dm.sound.src = sound_custom;
	s3dm.sound.load();
	s3dm.sound.play();
}
//------------------------------------------------------------------------------
s3dm.sound_select = function() {
	var soundSelect = document.getElementById("soundSelect");
	if (soundSelect.value == 'defaultSound') {
		s3dm.pref_save('function.soundCustomCompleteData', '', function() {
			s3dm.sound_check();
			s3dm.sound_play();
		});
	} else {
		document.getElementById('soundFile').click();
	}
}
//------------------------------------------------------------------------------
s3dm.enableDownbar = function() {
	var is_disabled = ! document.getElementById("enableDownbar").checked;
	s3dm.set_element_disable(document.getElementById("hideStatusbarAfterAllFinished_box"), is_disabled);
	s3dm.set_element_disable(document.getElementById("exclude_links_box"), is_disabled);
	if (! is_disabled) {
		s3dm.hideStatusbarAfterAllFinished();
	}
}
//------------------------------------------------------------------------------
s3dm.hideStatusbarAfterAllFinished = function() {
	if (document.getElementById("hideStatusbarAfterAllFinished").checked) {
		document.getElementById("hideStatusbarAfterAllFinishedTime").removeAttribute("disabled");
		document.getElementById("hideStatusbarAfterAllFinishedTimeSec").removeAttribute("disabled");
		document.getElementById("hideStatusbarAfterAllFinishedTimeDesc").removeAttribute("disabled");
	}
	else {
		document.getElementById("hideStatusbarAfterAllFinishedTime").setAttribute("disabled", "true");
		document.getElementById("hideStatusbarAfterAllFinishedTimeSec").setAttribute("disabled", "true");
		document.getElementById("hideStatusbarAfterAllFinishedTimeDesc").setAttribute("disabled", "true");
	}
}
//------------------------------------------------------------------------------
s3dm.keep_history_check = function() {
	if (document.getElementById("keepHistory").checked) {
		document.getElementById("clearFiletypesKeepHistory").removeAttribute("disabled");
		document.getElementById("clearFiletypesKeepHistory_label").removeAttribute("disabled");
		document.getElementById("trimHistory").removeAttribute("disabled");
		document.getElementById("trimHistoryDes").removeAttribute("disabled");
		document.getElementById("trimNum").removeAttribute("disabled");
		document.getElementById("itemsDes").removeAttribute("disabled");
		s3dm.keep_history_check_trim();
	}
	else {
		document.getElementById("clearFiletypesKeepHistory").setAttribute("disabled", "true");
		document.getElementById("clearFiletypesKeepHistory_label").setAttribute("disabled", "true");
		document.getElementById("trimHistory").setAttribute("disabled", "true");
		document.getElementById("trimHistoryDes").setAttribute("disabled", "true");
		document.getElementById("trimNum").setAttribute("disabled", "true");
		document.getElementById("itemsDes").setAttribute("disabled", "true");
	}
}
//------------------------------------------------------------------------------
s3dm.keep_history_check_trim = function() {
	if (document.getElementById("trimHistory").checked) {
		document.getElementById("trimHistoryDes").removeAttribute("disabled");
		document.getElementById("trimNum").removeAttribute("disabled");
		document.getElementById("itemsDes").removeAttribute("disabled");
	}
	else {
		document.getElementById("trimHistoryDes").setAttribute("disabled", "true");
		document.getElementById("trimNum").setAttribute("disabled", "true");
		document.getElementById("itemsDes").setAttribute("disabled", "true");
	}
}
//------------------------------------------------------------------------------
s3dm.queue_check = function() {
	s3dm.set_element_disable(document.getElementById("queEnable_box"), ! document.getElementById("queEnable").checked);
}
//------------------------------------------------------------------------------
s3dm.style_default_check = function() {
	var is_disabled = (String(s3dm.form['style.default'].value) == 'true') ? true : false;
	s3dm.set_element_disable(document.getElementById("customStyle_form"), is_disabled);
	s3dm.set_element_disable(document.getElementById("resetCustom"), is_disabled);
}
//------------------------------------------------------------------------------
s3dm.style_custom_reset = function() {
	if (! confirm(s3dm.utils.get_string('confirm.warning'))) { return; }

	var style_list = [
		'style.version', 
		'style.progressbar_color', 'style.progressremainder_color', 'style.finishedHbox_color', 'style.notdoneHbox_color', 
		'style.pausedHbox_border_color', 'style.filenameLabel_color', 'style.filenameLabel_size', 'style.downbar_color',
		'style.progressIndicator_size', 'style.tooltipFontSize', 'style.hbox_width', 'style.hbox_height', 'style.downbar_height',
		'style.button_text_color', 'style.button_text_size',
		'style.contextmenu_bgcolor', 'style.contextmenu_text_color', 'style.contextmenu_text_size'
	];

	for (var i=0; i<style_list.length; i++) {
		var pref_name = style_list[i];
		var pref_value = s3dm.prefs.defaults[pref_name];
		s3dm.pref_save(pref_name, pref_value, function(p_name, p_value){
			var pref_el = s3dm.form[p_name];
			if (pref_el) {
				if (pref_el.type && (pref_el.type == 'checkbox')) {
					pref_el.checked = p_value;
				} else {
					pref_el.value = p_value;
				}
				pref_el.type_of = typeof(p_value);
			}
		});
	}
}
//------------------------------------------------------------------------------
s3dm.show_buttons = function(id) {
	s3dm.set_element_disable(document.getElementById(id + '_pos'), ! document.getElementById(id).checked);
}
//------------------------------------------------------------------------------
s3dm.speed_color_check = function() {
	s3dm.set_element_disable(document.getElementById('speedColorBox'), ! document.getElementById('speedColorsEnabled').checked);
	s3dm.set_element_disable(document.getElementById('resetCustom_speed'), ! document.getElementById('speedColorsEnabled').checked);
}
//------------------------------------------------------------------------------
s3dm.speed_color_change = function(id) {
	document.getElementById(id + '_from').value = document.getElementById(id).value;
}
//------------------------------------------------------------------------------
s3dm.speed_color_reset = function() {
	if (! confirm(s3dm.utils.get_string('confirm.warning'))) { return; }

	var style_list = [
		'style.speedColor0', 'style.speedColorKB0', 'style.speedColor1', 'style.speedColorKB1',
		'style.speedColor2', 'style.speedColorKB2', 'style.speedColor3', 'style.speedColorKB3'
	];

	for (var i=0; i<style_list.length; i++) {
		var pref_name = style_list[i];
		var pref_value = s3dm.prefs.defaults[pref_name];
		s3dm.pref_save(pref_name, pref_value, function(p_name, p_value){
			var pref_el = s3dm.form[p_name];
			if (pref_el) {
				pref_el.value = p_value;
				pref_el.type_of = typeof(p_value);

				s3dm.speed_color_change('speedColorKB1');
				s3dm.speed_color_change('speedColorKB2');
				s3dm.speed_color_change('speedColorKB3');
			}
		});
	}
}
//------------------------------------------------------------------------------
s3dm.confirmAVenable = function() {
	if (document.getElementById("virusScan").checked) {
		var db_enableTxt = s3dm.utils.get_string("options.av_enable.confirm");
		var s3dm_addonName = s3dm.utils.get_string("extension_name");
		db_enableTxt = db_enableTxt.replace('%APP_NAME%', '"' + s3dm_addonName + '"');
		if (! confirm(db_enableTxt)) {
			document.getElementById("virusScan").checked = false; 
		}
	}

	s3dm.pref_save('function.virusScan', document.getElementById("virusScan").checked, function(){
		s3dm.checkAVenable();
	});
}
//------------------------------------------------------------------------------
s3dm.checkAVenable = function() {
	if (s3dm.utils.prefs_get('function.virusScan')) {
		document.getElementById("virusScan").checked = true;
	}
	document.getElementById("virusScanTabLink").setAttribute('is_enabled', document.getElementById("virusScan").checked);
	s3dm.set_element_disable(document.getElementById("virusScan_prop"), ! document.getElementById("virusScan").checked);
	if (document.getElementById("virusScan").checked) {
		s3dm.virusAutoScan_check();
	}
}
//------------------------------------------------------------------------------
s3dm.virusAutoScan_check = function() {
	s3dm.set_element_disable(document.getElementById("virusAutoScan_exclude"), ! document.getElementById("virusAutoScan").checked);
}
//------------------------------------------------------------------------------
s3dm.download_history_init = function() {
	var date = new Date();
	var dbelems = document.getElementById("dateTimeFormatDL");
	for (var i=0; i<dbelems.options.length; i++) {
		dbelems.options[i].text = date.toLocaleFormat(dbelems.options[i].value);
	}

	var dbelems2 = document.getElementById("dateTimeFormat");
	for (var i=0; i<dbelems2.options.length; i++) {
		dbelems2.options[i].text = date.toLocaleFormat(dbelems2.options[i].value);
	}
}
//------------------------------------------------------------------------------
s3dm.set_element_disable = function(parent, is_disabled) {
	if (parent == null) { return null; };
	if (parent.hasAttribute && parent.hasAttribute('no_auto_disable')) {
		return null;
	}

	if (parent.hasChildNodes()) {
		for (var i=0; i<parent.childNodes.length; i++) {
			var el = parent.childNodes[i];
			s3dm.set_element_disable(el, is_disabled);
		}
	}

	try {
		if ((parent.nodeName != 'TABLE') && (parent.nodeName != 'TR') && (parent.nodeName != 'TD')) {
			if (is_disabled) {
				parent.setAttribute("disabled", "true");
			} else {
				parent.removeAttribute("disabled");
			}
		}
	} catch(e){};
}
//------------------------------------------------------------------------------
s3dm.hotkeys_init = function() {
	for (var i=0; i<s3dm.prefs.list.hotkeys.length; i++) {
		var key = s3dm.prefs.list.hotkeys[i];
		var hotkeys_box = s3dm.hotkey_plus();
		hotkeys_box.s3dm_key = key;
		s3dm.utils.get_element(hotkeys_box, 'hotkeys_textbox').value = s3dm.hotkeys_string(key);
		s3dm.utils.get_element(hotkeys_box, 'hotkeys_list_method').value = key.method;
	}
}
//------------------------------------------------------------------------------
s3dm.hotkey_plus = function() {
	var hotkeys_box = document.getElementById('hotkeys_box').cloneNode(true);
	var table = document.getElementById('hotkeys_list');
	var row = table.insertRow(table.rows.length);
	var cell = row.insertCell(0);
	cell.appendChild(hotkeys_box);

	s3dm.utils.get_element(hotkeys_box, 'hotkey_button_minus').addEventListener('click', function() {
		s3dm.hotkey_minus(this);
	});
	s3dm.utils.get_element(hotkeys_box, 'hotkeys_textbox').addEventListener('click', function() {
		this.select();
	});
	s3dm.utils.get_element(hotkeys_box, 'hotkeys_textbox').addEventListener('keydown', function(event) {
		s3dm.hotkey_input(event, this);
	});
	s3dm.utils.get_element(hotkeys_box, 'hotkeys_list_method').addEventListener('click', function(event) {
		var hotkeys_box = this.parentNode;
		if (hotkeys_box.s3dm_key) {
			hotkeys_box.s3dm_key.method = this.value;
			s3dm.hotkey_save();
		}
	});
	s3dm.utils.get_element(hotkeys_box, 'hotkeys_list_method').addEventListener('change', function(event) {
		var hotkeys_box = this.parentNode;
		if (hotkeys_box.s3dm_key) {
			hotkeys_box.s3dm_key.method = this.value;
			s3dm.hotkey_save();
		}
	});

	return hotkeys_box;
}
//------------------------------------------------------------------------------
s3dm.hotkey_minus = function(el) {
	el.parentNode.s3dm_key = null;
	el.parentNode.style.display = 'none';
	s3dm.hotkey_save();
}
//------------------------------------------------------------------------------
s3dm.hotkey_input = function(event, el) {
	event.preventDefault();
	event.stopPropagation();
	event.stopImmediatePropagation();

	var hotkeys_box = el.parentNode;
	var key = {};

	key.shiftKey = event.shiftKey;
	key.ctrlKey = event.ctrlKey;
	key.altKey = event.altKey;
	key.keyCode = event.keyCode;
	key.key = event.key;
	key.method = s3dm.utils.get_element(hotkeys_box, 'hotkeys_list_method').value;

	if (key.ctrlKey || key.altKey) {
		if ((key.keyCode != 16) && (key.keyCode != 17) && (key.keyCode != 18)) {
			s3dm.utils.get_element(hotkeys_box, 'hotkeys_textbox').value = s3dm.hotkeys_string(key);
			hotkeys_box.s3dm_key = key;
			s3dm.hotkey_save();
		}
	}
}
//------------------------------------------------------------------------------
s3dm.hotkeys_string = function(key) {
	var str = [];

	if (key.ctrlKey) { str.push('Ctrl'); }
	if (key.altKey) { str.push('Alt'); }
	if (key.shiftKey) { str.push('Shift'); }

	if (key.key.length > 1) {
		str.push(key.key);
	}
	else if ((key.keyCode >= 32) && (key.keyCode < 127)) {
		str.push(String.fromCharCode(key.keyCode).toUpperCase());
	} 
	else if (key.key) {
		str.push(key.key.toUpperCase());
	}

	return str.join(' + ');
}
//------------------------------------------------------------------------------
s3dm.hotkey_save = function() {
	var table = document.getElementById('hotkeys_list');
	var hotkeys = [];

	for (var i=0; i<table.rows.length; i++) {
		var hotkeys_box = s3dm.utils.get_element(table.rows[i], 'hotkeys_box');
		if (hotkeys_box.s3dm_key) {
			hotkeys.push(hotkeys_box.s3dm_key);
		}
	}

	s3dm.pref_save('hotkeys', hotkeys);
}
//------------------------------------------------------------------------------
s3dm.exclude_links_set = function(event) {
	document.getElementById('exclude_links_save').setAttribute('is_hidden', false);
}
//------------------------------------------------------------------------------
s3dm.exclude_links_save = function(event) {
	document.getElementById('exclude_links_save').setAttribute('is_hidden', true);
	var pref_value = document.getElementById('exclude_links').value.split(/\n+/);
	pref_value = pref_value.map(function(element) { return element.replace(/\s/g, ''); });
	s3dm.pref_save('downbar_exclude_links', pref_value);
}
//------------------------------------------------------------------------------
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	//------------------------------------------------------------------------
	if (! request) { return; }
	//------------------------------------------------------------------------
	if (request.action_set_downbar_height) {
		document.getElementById('style_downbar_height').value = request.downbar_height;
	}
	//------------------------------------------------------------------------
});
//------------------------------------------------------------------------------
window.addEventListener("load", function(){
	s3dm.prefs.init(s3dm.init_0);
});
