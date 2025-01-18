var vflscrsh = {};
vflscrsh.form = null;
vflscrsh.engines = {};

//------------------------------------------------------------------------------
vflscrsh.init_0 = function() {
	chrome.runtime.sendMessage({ action_check_mhtml : true }, function(response) {
		if (response && response.saveAsMHTML) {
		} else {
			document.getElementById('button_click_save_mhtml').style.display = 'none';
			document.getElementById('hotkey_save_mhtml').style.display = 'none';
		}
		vflscrsh.init_pre();
	});
}
//------------------------------------------------------------------------------
vflscrsh.init_pre = function() {
	setTimeout(function(){ vflscrsh.utils.i18n_parse(document); }, 100);
	vflscrsh.form = document.getElementById('vflscrsh_form');
	//------------------------------------------------------------------------
	var current_locale = document.getElementById('current_locale');
	for (var i=0; i<vflscrsh.I18N_SUPPORTED.length; i++) {
		var el_lang = vflscrsh.I18N_SUPPORTED[i];
		var option = document.createElement("option");
		option.text = el_lang.name;
		option.value = el_lang.lang;
		current_locale.options.add(option);
	}
	//------------------------------------------------------------------------
	if (vflscrsh.utils.clipboard_image_not_copy()) {
		document.getElementById('button_click_copy').style.display = 'none';
		document.getElementById('hotkey_copy').style.display = 'none';
		document.getElementById('showCopyNotification_box').style.display = 'none';
	}

	//------------------------------------------------------------------------
	if (document.createElement('canvas').toDataURL('image/webp').substring(5, 15) != 'image/webp') {
		document.getElementById('webpImageQuality_block').style.display = 'none';
	}

	//------------------------------------------------------------------------
	vflscrsh.init_events();
	vflscrsh.init();
}
//------------------------------------------------------------------------------
vflscrsh.init = function() {
	vflscrsh.init_prefs();
	document.getElementById('jpgImageQuality_label').textContent = document.getElementById('jpgImageQuality').value + '%';
	document.getElementById('webpImageQuality_label').textContent = document.getElementById('webpImageQuality').value + '%';
	vflscrsh.uploadDisable();
	vflscrsh.onlyPageForce();
	vflscrsh.hotkeys_init();

	if (document.getElementById('buttonClickIconGeneral').value == 'menu') {
		document.getElementById("buttonClickIconAdditional").setAttribute('disabled', true);
	} else {
		document.getElementById("buttonClickIconAdditional").removeAttribute('disabled');
	}
	//------------------------------------------------------------------------
	var show_tab = window.location.hash || '';
	if (show_tab) {
		tabs.showTab(null, show_tab);
	}
}
//------------------------------------------------------------------------------
vflscrsh.init_events = function() {
	vflscrsh.form.addEventListener('submit', function(event){
		event.stopPropagation();
		event.preventDefault();
	});

	var input_list = document.getElementsByTagName('input');
	for (var i=0; i<input_list.length; i++) {
		if (input_list[i].getAttribute('clickSelectsAll')) {
			input_list[i].addEventListener('click', function(event){
				this.select();
			});
		}
	}

	document.getElementById('templateFileName_label').addEventListener('click', function(){ vflscrsh.setDefaultFileName(); });
	document.getElementById('templateImageName_label').addEventListener('click', function(){ vflscrsh.setDefaultImageName(); });
	document.getElementById('jpgImageQuality').addEventListener('change', function(event){ vflscrsh.changeJpgImageQuality(event.target.value); });
	document.getElementById("jpgImageQuality_reset").addEventListener('click', function(){ vflscrsh.changeJpgImageQuality(70); });
	document.getElementById('webpImageQuality').addEventListener('change', function(event){ vflscrsh.changeWebpImageQuality(event.target.value); });
	document.getElementById("webpImageQuality_reset").addEventListener('click', function(){ vflscrsh.changeWebpImageQuality(70); });
	document.getElementById("prefs_button_plus").addEventListener('click', function(){ vflscrsh.hotkey_plus(); });

	document.getElementById('buttonClickIconGeneral').addEventListener('change', function(){
		if (document.getElementById('buttonClickIconGeneral').value == 'menu') {
			document.getElementById("buttonClickIconAdditional").setAttribute('disabled', true);
		} else {
			document.getElementById("buttonClickIconAdditional").removeAttribute('disabled');
		}
	});

	document.getElementById('reset_settings').addEventListener('click', function(){ vflscrsh.reset_settings(); });
	document.getElementById('close_settings').addEventListener('click', function(){ vflscrsh.window_close(); });
}
//------------------------------------------------------------------------------
vflscrsh.window_close = function() {
	chrome.runtime.sendMessage({ action: 'window_close' }, function(response) {});
}
//------------------------------------------------------------------------------
vflscrsh.init_prefs = function() {
	for (var pref_name in vflscrsh.prefs.list) {
		var pref_value = vflscrsh.prefs.list[pref_name];
		var pref_el = vflscrsh.form[pref_name];
		if (pref_el) {
			if (pref_el.type && (pref_el.type == 'checkbox')) {
				pref_el.checked = pref_value;
			} else {
				pref_el.value = pref_value;
			}
		}
	}
	//------------------------------------------------------------------------
	vflscrsh.form.addEventListener('change', function(event){
		var pref_el = event.target;
		if (! pref_el.name) { return; }
		if (vflscrsh.prefs.list[pref_el.name] === undefined) { return; }
		//-----------------------------------------------------
		var callback = null;
		var pref_value = pref_el.value;
		//-----------------------------------------------------
		if (pref_el.type && (pref_el.type == 'checkbox')) {
			pref_value = pref_el.checked;
		}
		//-----------------------------------------------------
		if (pref_el.name == 'current_locale') {
			callback = function() {
				vflscrsh.i18n.init(pref_value);
				vflscrsh.utils.i18n_parse(document);
			}
		}
		//-----------------------------------------------------
		else if (pref_el.name == 'jpgImageQuality') {
			pref_value = parseInt(pref_el.value);
		}
		//-----------------------------------------------------
		else if (pref_el.name == 'webpImageQuality') {
			pref_value = parseInt(pref_el.value);
		}
		//-----------------------------------------------------
		vflscrsh.pref_save(pref_el.name, pref_value, callback);
		pref_el.blur();
	});
}
//------------------------------------------------------------------------------
vflscrsh.pref_save = function(pref_name, pref_value, callback) {
	chrome.runtime.sendMessage({ 'action_prefs_set': true, 'pref_name' : pref_name, 'pref_value': pref_value }, function(response) {
		vflscrsh.utils.prefs_set(pref_name, pref_value);
		if (callback) {
			callback();
		}
		vflscrsh.save_settings_message();
		vflscrsh.uploadDisable();
		vflscrsh.onlyPageForce();
	});
}
//------------------------------------------------------------------------------
vflscrsh.reset_settings = function() {
	if (confirm(vflscrsh.utils.get_string('confirm_warning'))) {
		chrome.runtime.sendMessage({ 'action_reset_defaults': true }, function(response) {
			vflscrsh.prefs.reset_defaults(function(){
				vflscrsh.utils.i18n_parse(document);
				vflscrsh.init();
				vflscrsh.save_settings_message();
				window.location.reload();
			});
		});
	}
}
//------------------------------------------------------------------------------
vflscrsh.save_settings_message = function() {
	document.getElementById("settings_saved").removeAttribute('is_hidden');
	setTimeout(function(){
		document.getElementById("settings_saved").setAttribute('is_hidden', true);
	}, 500);
}
//------------------------------------------------------------------------------
vflscrsh.setDefaultFileName = function() {
	if (confirm(vflscrsh.utils.get_string('reset_to_default'))) {
		document.getElementById('templateFileName').value = '{#TITLE#} - {#YYYY#}-{#MM#}-{#DD#}_{#H#}.{#M#}.{#S#}';
		vflscrsh.pref_save('templateFileName', '{#TITLE#} - {#YYYY#}-{#MM#}-{#DD#}_{#H#}.{#M#}.{#S#}');
	}
}
//------------------------------------------------------------------------------
vflscrsh.setDefaultImageName = function() {
	if (confirm(vflscrsh.utils.get_string('reset_to_default'))) {
		document.getElementById('templateImageName').value = '{#URL#}';
		vflscrsh.pref_save('templateImageName', '{#URL#}');
	}
}
//------------------------------------------------------------------------------
vflscrsh.changeJpgImageQuality = function(value) {
	document.getElementById('jpgImageQuality_label').textContent = value + '%';
	document.getElementById('jpgImageQuality').value = value;
	vflscrsh.pref_save('jpgImageQuality', parseInt(value));
}
//------------------------------------------------------------------------------
vflscrsh.changeWebpImageQuality = function(value) {
	document.getElementById('webpImageQuality_label').textContent = value + '%';
	document.getElementById('webpImageQuality').value = value;
	vflscrsh.pref_save('webpImageQuality', parseInt(value));
}
//------------------------------------------------------------------------------
vflscrsh.uploadDisable = function() {
	if (vflscrsh.prefs.list.uploadDisable) {
		document.getElementById('uploadStorageLabel').setAttribute("disabled", true);
		document.getElementById('uploadStorage_s3blog').setAttribute("disabled", true);
		document.getElementById('uploadStorage_share_pho_to').setAttribute("disabled", true);
		document.getElementById('uploadStorage_imgur').setAttribute("disabled", true);
		document.getElementById('uploadStorage_imagebam').setAttribute("disabled", true);
		document.getElementById('uploadStorage_lut_im').setAttribute("disabled", true);
		document.getElementById('uploadStorage_snag_gy').setAttribute("disabled", true);
		document.getElementById('uploadClipboardLink').setAttribute("disabled", true);

		document.getElementById('button_click_upload').style.display = 'none';
		document.getElementById('hotkey_upload').style.display = 'none';
	} else {
		document.getElementById('uploadStorageLabel').removeAttribute("disabled");
		document.getElementById('uploadStorage_s3blog').removeAttribute("disabled");
		document.getElementById('uploadStorage_share_pho_to').removeAttribute("disabled");
		document.getElementById('uploadStorage_imgur').removeAttribute("disabled");
		document.getElementById('uploadStorage_imagebam').removeAttribute("disabled");
		document.getElementById('uploadStorage_lut_im').removeAttribute("disabled");
		document.getElementById('uploadStorage_snag_gy').removeAttribute("disabled");
		document.getElementById('uploadClipboardLink').removeAttribute("disabled");

		document.getElementById('button_click_upload').style.display = '';
		document.getElementById('hotkey_upload').style.display = '';
	}
}
//------------------------------------------------------------------------------
vflscrsh.onlyPageForce = function() {
	if (vflscrsh.prefs.list.onlyPageForce) {
		document.getElementById('button_click_capture_page').style.display = 'none';
		document.getElementById('hotkey_capture_page').style.display = 'none';
	} else {
		document.getElementById('button_click_capture_page').style.display = '';
		document.getElementById('hotkey_capture_page').style.display = '';
	}
}
//------------------------------------------------------------------------------
vflscrsh.hotkeys_init = function() {
	for (var i=0; i<vflscrsh.prefs.list.hotkeys.length; i++) {
		var key = vflscrsh.prefs.list.hotkeys[i];
		var hotkeys_box = vflscrsh.hotkey_plus();
		hotkeys_box.vflscrsh_key = key;
		vflscrsh.utils.get_element(hotkeys_box, 'hotkeys_textbox').value = vflscrsh.hotkeys_string(key);
		vflscrsh.utils.get_element(hotkeys_box, 'hotkeys_list_method').value = key.method;
		vflscrsh.utils.get_element(hotkeys_box, 'hotkeys_list_target').value = key.target;
		vflscrsh.utils.get_element(hotkeys_box, 'hotkeys_list_closetab').checked = key.closetab;
	}
}
//------------------------------------------------------------------------------
vflscrsh.hotkey_plus = function() {
	var hotkeys_box = document.getElementById('hotkeys_box').cloneNode(true);
	var table = document.getElementById('hotkeys_list');
	var row = table.insertRow(table.rows.length);
	var cell = row.insertCell(0);
	cell.appendChild(hotkeys_box);

	vflscrsh.utils.get_element(hotkeys_box, 'prefs_button_minus').addEventListener('click', function() {
		vflscrsh.hotkey_minus(this);
	});
	vflscrsh.utils.get_element(hotkeys_box, 'hotkeys_textbox').addEventListener('click', function() {
		this.select();
	});
	vflscrsh.utils.get_element(hotkeys_box, 'hotkeys_textbox').addEventListener('keydown', function(event) {
		vflscrsh.hotkey_input(event, this);
	});
	vflscrsh.utils.get_element(hotkeys_box, 'hotkeys_list_method').addEventListener('click', function(event) {
		var hotkeys_box = this.parentNode;
		if (hotkeys_box.vflscrsh_key) {
			hotkeys_box.vflscrsh_key.method = this.value;
			vflscrsh.hotkey_save();
		}
	});
	vflscrsh.utils.get_element(hotkeys_box, 'hotkeys_list_method').addEventListener('change', function(event) {
		var hotkeys_box = this.parentNode;
		if (hotkeys_box.vflscrsh_key) {
			hotkeys_box.vflscrsh_key.method = this.value;
			vflscrsh.hotkey_save();
		}
	});
	vflscrsh.utils.get_element(hotkeys_box, 'hotkeys_list_target').addEventListener('click', function(event) {
		var hotkeys_box = this.parentNode;
		if (hotkeys_box.vflscrsh_key) {
			hotkeys_box.vflscrsh_key.target = this.value;
			vflscrsh.hotkey_save();
		}
	});
	vflscrsh.utils.get_element(hotkeys_box, 'hotkeys_list_target').addEventListener('change', function(event) {
		var hotkeys_box = this.parentNode;
		if (hotkeys_box.vflscrsh_key) {
			hotkeys_box.vflscrsh_key.target = this.value;
			vflscrsh.hotkey_save();
		}
	});
	vflscrsh.utils.get_element(hotkeys_box, 'hotkeys_list_closetab').addEventListener('click', function(event) {
		var hotkeys_box = this.parentNode.parentNode;
		if (hotkeys_box.vflscrsh_key) {
			hotkeys_box.vflscrsh_key.closetab = this.checked;
			vflscrsh.hotkey_save();
		}
	});

	return hotkeys_box;
}
//------------------------------------------------------------------------------
vflscrsh.hotkey_minus = function(el) {
	el.parentNode.vflscrsh_key = null;
	el.parentNode.style.display = 'none';
	vflscrsh.hotkey_save();
}
//------------------------------------------------------------------------------
vflscrsh.hotkey_input = function(event, el) {
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
	key.method = vflscrsh.utils.get_element(hotkeys_box, 'hotkeys_list_method').value;
	key.target = vflscrsh.utils.get_element(hotkeys_box, 'hotkeys_list_target').value;
	key.closetab = vflscrsh.utils.get_element(hotkeys_box, 'hotkeys_list_closetab').checked;

	if (key.ctrlKey || key.altKey) {
		if ((key.keyCode != 16) && (key.keyCode != 17) && (key.keyCode != 18)) {
			vflscrsh.utils.get_element(hotkeys_box, 'hotkeys_textbox').value = vflscrsh.hotkeys_string(key);
			hotkeys_box.vflscrsh_key = key;
			vflscrsh.hotkey_save();
		}
	}
}
//------------------------------------------------------------------------------
vflscrsh.hotkeys_string = function(key) {
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
vflscrsh.hotkey_save = function() {
	var table = document.getElementById('hotkeys_list');
	var hotkeys = [];

	for (var i=0; i<table.rows.length; i++) {
		var hotkeys_box = vflscrsh.utils.get_element(table.rows[i], 'hotkeys_box');
		if (hotkeys_box.vflscrsh_key) {
			hotkeys.push(hotkeys_box.vflscrsh_key);
		}
	}

	vflscrsh.pref_save('hotkeys', hotkeys);
}
//-------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------
window.addEventListener("load", function(){
	vflscrsh.prefs.init(vflscrsh.init_0);
});
