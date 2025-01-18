var s3forecast = {};
s3forecast.location_list = [];
s3forecast.location_current = {};
s3forecast.geolocation_id = 0;
s3forecast.geolocation_messages = [];

//------------------------------------------------------------------------------
s3forecast.init_0 = function() {
	s3forecast.prefs.init(function(){
		chrome.runtime.sendMessage({ 'action' : 'get_location_list' }, function(response) {
			s3forecast.location_list = response.location_list;
			s3forecast.location_current = response.location_current;
	
			setTimeout(function(){ s3forecast.utils.i18n_parse(document); }, 100);
			s3forecast.events_init();
			s3forecast.themes_init();
			s3forecast.init();
			s3forecast.current_locale_init();
			s3forecast.pref_init(true);
			s3forecast.tooltiptxt.init();
		});
	});
}
//------------------------------------------------------------------------------
s3forecast.init = function() {
	s3forecast.init_additional_text();
	s3forecast.location_list_set();

	if (! s3forecast.utils.prefs_get('migration_callout')) {
		document.getElementById('migration_callout').setAttribute('is_hidden', true);
	}
	if (! s3forecast.utils.prefs_get('top_instructions')) {
		document.getElementById('top_instructions').setAttribute('is_hidden', true);
	}
	if (s3forecast.utils.prefs_get('unitsystem') == 'custom') {
		document.getElementById('unitsystem_custom_units').removeAttribute('is_hidden', true);
	} else {
		document.getElementById('unitsystem_custom_units').setAttribute('is_hidden', true);
	}
	if (s3forecast.utils.prefs_get('radar_type') == 'custom') {
		document.getElementById('radar_url_box').removeAttribute('is_hidden', true);
	} else {
		document.getElementById('radar_url_box').setAttribute('is_hidden', true);
	}
	if (s3forecast.utils.prefs_get('radar_type') == 'windy.com') {
		document.getElementById('radar_layer_box').removeAttribute('is_hidden', true);
	} else {
		document.getElementById('radar_layer_box').setAttribute('is_hidden', true);
	}

	setTimeout(function(){
		var separators_list = document.getElementsByClassName('separator');
		Array.prototype.filter.call(separators_list, function(separator) {
			separator.style.width = separator.offsetWidth + 'px';
		});
		document.getElementById('forecastbar_exclude_links').style.width = '';
		document.getElementById('forecastbar_exclude_links').style.width = document.getElementById('forecastbar_exclude_links').parentNode.offsetWidth + 'px';
		document.getElementById('forecastbar_exclude_links_placeholder').style.width = document.getElementById('forecastbar_exclude_links').offsetWidth-2 + 'px';
		document.getElementById('forecastbar_exclude_links_placeholder').style.height = document.getElementById('forecastbar_exclude_links').offsetHeight + 'px';
	}, 200);

	document.getElementById('date_format_hint_tooltip').setAttribute('is_hidden', true);

	var manifest = chrome.runtime.getManifest();
	document.getElementById('addon_version').textContent = manifest.version;
}
//------------------------------------------------------------------------------
s3forecast.init_additional_text = function() {
	var options_units = s3forecast.utils.prefs_get('units');
	//------------------------------------------------------------------------
	var migration_callout_content = document.getElementById('migration_callout_content');
	s3forecast.utils.HTMLDOM_value(migration_callout_content, '');
	var migration_text = s3forecast.i18n.get_string("options.firefoxmigration");
	migration_text = s3forecast.utils.parse_template(migration_text, { 'feedback-forums' : s3forecast.i18n.get_string("options.feedback") });
	var migration_text_list = migration_text.split('${br}');
	for (var i=0; i<migration_text_list.length; i++) {
		var el = document.createElement('div');
		if (migration_text_list[i]) { s3forecast.utils.HTMLDOM_value(el, migration_text_list[i]); }
		else { el = document.createElement('br'); }
		migration_callout_content.appendChild(el);
	}
	//------------------------------------------------------------------------
	var header_location = document.getElementById('header_location');
	s3forecast.utils.HTMLDOM_value(header_location, '');
	var header_location_text = s3forecast.i18n.get_string("options.current").split('${location-name}');
	if (header_location_text) {
		var el1 = document.createElement('span');
		s3forecast.utils.HTMLDOM_value(el1, header_location_text[0]);
		header_location.appendChild(el1);
		var el2 = document.createElement('strong');
		s3forecast.utils.HTMLDOM_value(el2, s3forecast.location_current.name);
		header_location.appendChild(el2);
		var el3 = document.createElement('span');
		s3forecast.utils.HTMLDOM_value(el3, header_location_text[1]);
		header_location.appendChild(el3);
	}
	//------------------------------------------------------------------------
	var englishnames = document.getElementById('englishnames');
	if (s3forecast.i18n.locale() == 'en') {
		englishnames.setAttribute('is_hidden', true);
	} else {
		englishnames.removeAttribute('is_hidden');
	}
	//------------------------------------------------------------------------
	var multiselect_callout = document.getElementById('multiselect_callout');
	var multiselect_text = s3forecast.i18n.get_string("options.units.multiselect");
	var multiselect_key = (s3forecast.utils.check_isMac()) ? '⌘' : s3forecast.i18n.get_string("key.label.ctrl");
	multiselect_text = s3forecast.utils.parse_template(multiselect_text, { 'key' : multiselect_key });
	s3forecast.utils.HTMLDOM_value(multiselect_callout, multiselect_text);
	//------------------------------------------------------------------------
	var date_custom_example = document.getElementById('date_custom_example');
	if (options_units.date == "date_custom") {
		s3forecast.utils.HTMLDOM_value(date_custom_example, (new Date()).toLocaleFormat(options_units.date_custom_format));
		document.getElementById('date_custom_box').removeAttribute('is_hidden');
	} else {
		s3forecast.utils.HTMLDOM_value(date_custom_example, (new Date()).toLocaleDateString());
		document.getElementById('date_custom_box').setAttribute('is_hidden', true);
	}
	s3forecast.utils.HTMLDOM_value(document.getElementById('date_custom_format'), options_units.date_custom_format);
	//------------------------------------------------------------------------
	s3forecast.utils.HTMLDOM_value(document.getElementById('copyright'), 
		s3forecast.utils.parse_template(s3forecast.i18n.get_string("copyright"), { "year" : (new Date).getYear()+1900, "accuweather" : '' })
	);
	//------------------------------------------------------------------------
	s3forecast.utils.HTMLDOM_value(document.getElementById('radar_custom_url'), s3forecast.utils.prefs_get('radar_custom_url'));
}
//------------------------------------------------------------------------------
s3forecast.events_init = function() {
	document.getElementById('s3forecast_form').addEventListener('submit', function(event){
		event.stopPropagation();
		event.preventDefault();
	});
	//------------------------------------------------------------------------
	document.getElementById('top_instructions_close').addEventListener('click', function(){
		document.getElementById('top_instructions').setAttribute('is_hidden', true);
		s3forecast.pref_save('top_instructions', false);
	});
	document.getElementById('migration_callout_close').addEventListener('click', function(){
		document.getElementById('migration_callout').setAttribute('is_hidden', true);
		s3forecast.pref_save('migration_callout', false);
	});
	//------------------------------------------------------------------------
	document.getElementById('location_form').addEventListener('click', function(){
		s3forecast.geolocation_show(true);
	});
	document.getElementById('forecast_geolocation_cover').addEventListener('click', function(){
		s3forecast.geolocation_show(false);
	});
	document.getElementById('geolocation_close_button').addEventListener('click', function(){
		s3forecast.geolocation_show(false);
	});
	document.getElementById('geolocation_search_button').addEventListener("click", function(event) {
		s3forecast.geolocation_search(document.getElementById('geolocation_search_text').value.trim());
	});
	document.getElementById('geolocation_search_text').addEventListener("keypress", function(event) {
		if (event.keyCode && (event.keyCode == 13)) {
			event.stopPropagation();
			event.preventDefault();
			s3forecast.geolocation_search(this.value.trim());
		}
	});
	//------------------------------------------------------------------------
	document.getElementById('date_format_hint').addEventListener('click', function(){
		var date_format_hint_tooltip = document.getElementById('date_format_hint_tooltip');
		if (date_format_hint_tooltip.hasAttribute('is_hidden')) {
			document.getElementById('date_format_hint_tooltip').removeAttribute('is_hidden');
		} else {
			date_format_hint_tooltip.setAttribute('is_hidden', true);
		}
	});
	//------------------------------------------------------------------------
	document.getElementById('date_custom_format').addEventListener("keypress", function(event) {
		if (event.keyCode && (event.keyCode == 13)) {
			var options_units = s3forecast.utils.prefs_get('units');
			options_units.date_custom_format = this.value;
			s3forecast.pref_save('units', options_units);
		}
	});
	//------------------------------------------------------------------------
	document.getElementById('radar_custom_url').addEventListener("keypress", function(event) {
		if (event.keyCode && (event.keyCode == 13)) {
			s3forecast.pref_save('radar_custom_url', this.value);
		}
	});
	//------------------------------------------------------------------------
	document.getElementById('forecastbar_exclude_links').addEventListener("mousemove", function(event) {
		if (event.buttons == 1) {
			document.getElementById('forecastbar_exclude_links_placeholder').style.width = document.getElementById('forecastbar_exclude_links').offsetWidth-2 + 'px';
			document.getElementById('forecastbar_exclude_links_placeholder').style.height = document.getElementById('forecastbar_exclude_links').offsetHeight + 'px';
		}
	});
	//------------------------------------------------------------------------
	document.getElementById('forecastbar_exclude_links_save').addEventListener('click', s3forecast.forecastbar_exclude_links_save);

	//------------------------------------------------------------------------
	document.getElementById('save_settings').addEventListener('click', function(){ s3forecast.save_settings('save'); });
	document.getElementById('copy_settings').addEventListener('click', function(){ s3forecast.save_settings('copy'); });
	document.getElementById('load_settings').addEventListener('click', function(){ s3forecast.load_settings(); });
	document.getElementById('load_settings_file').addEventListener('change', function(event){ s3forecast.load_settings_file(event); });
	document.getElementById('reset_settings').addEventListener('click', function(){ s3forecast.reset_settings(); });
}
//------------------------------------------------------------------------------
s3forecast.themes_init = function() {
	var icon_pack_container = document.getElementById('icon_pack_container');
	s3forecast.themes_list.forEach(function(item) {
		var option = document.createElement('span');
		option.setAttribute('value', item.id);
		option.setAttribute('is_image', true);
		option.className = 'option';

		var image = document.createElement('div');
		image.className = 'theme_image theme_preview_' + item.id;
		option.appendChild(image);

		var text = document.createElement('div');
		text.className = 'theme_text';
		option.appendChild(text);
		s3forecast.utils.HTMLDOM_value(text, item.name);

		icon_pack_container.appendChild(option);
	});
}
//------------------------------------------------------------------------------
s3forecast.pref_init = function(is_event) {
	var pref_elements = document.getElementsByClassName('option_group');
	for (var i=0; i<pref_elements.length; i++) {
		//------------------------------------------------------------------
		var pref_el = pref_elements[i];
		pref_el.pref_name = pref_el.getAttribute('pref_name');
		pref_el.pref_type =  pref_el.getAttribute('pref_type');
		pref_el.pref_key =  pref_el.getAttribute('pref_key');
		if (! pref_el.pref_name) { continue; }
		var pref_value = s3forecast.utils.prefs_get(pref_el.pref_name);
		if (pref_el.pref_key) {
			pref_value = s3forecast.utils.text_hash_get(pref_el.pref_key, pref_value);
		}

		//------------------------------------------------------------------
		var options = pref_el.getElementsByClassName('option');
		for (var i2=0; i2<options.length; i2++) {
			var option = options[i2];
			option.pref_name = pref_el.pref_name;
			option.pref_type = pref_el.pref_type;
			option.pref_key = pref_el.pref_key;
			option.removeAttribute('is_selected');
			//------------------------------------------------------------
			if (pref_el.pref_type == 'boolean') {
				option.pref_value = (String(option.getAttribute('value')) == 'true');
				if (option.pref_value == pref_value) {
					option.setAttribute('is_selected', true);
				}
			}
			//------------------------------------------------------------
			if (pref_el.pref_type == 'numeric') {
				option.pref_value = parseInt(option.getAttribute('value'));
				if (option.pref_value == pref_value) {
					option.setAttribute('is_selected', true);
				}
			}
			//------------------------------------------------------------
			if (pref_el.pref_type == 'array') {
				option.pref_value = option.getAttribute('value');
				option.removeAttribute('option_title');
				var search_index = pref_value.indexOf(option.pref_value);
				if (search_index > -1) {
					option.setAttribute('option_title', search_index+1);
					option.setAttribute('is_selected', true);
				}
			}
			//------------------------------------------------------------
			else {
				option.pref_value = option.getAttribute('value');
				if (option.pref_value == pref_value) {
					option.setAttribute('is_selected', true);
				}
			}
			//------------------------------------------------------------
			//------------------------------------------------------------
			if (is_event) {
				option.addEventListener('click', function(event){
					s3forecast.pref_click(event);
				});
			}
		}
	}
	//------------------------------------------------------------------------
	var forecastbar_exclude_links = s3forecast.utils.prefs_get('forecastbar_exclude_links');
	forecastbar_exclude_links = forecastbar_exclude_links.map(function(element) { return element.replace(/\s/g, ''); });
	document.getElementById('forecastbar_exclude_links').value = forecastbar_exclude_links.join("\n");
	document.getElementById('forecastbar_exclude_links_save').setAttribute('is_hidden', true);

	if (is_event) {
		document.getElementById('forecastbar_exclude_links').addEventListener('change', s3forecast.forecastbar_exclude_links_set);
		document.getElementById('forecastbar_exclude_links').addEventListener('keyup', s3forecast.forecastbar_exclude_links_set);
		document.getElementById('forecastbar_exclude_links').addEventListener('paste', s3forecast.forecastbar_exclude_links_set);
	}
}
//------------------------------------------------------------------------------
s3forecast.forecastbar_exclude_links_set = function(event) {
	document.getElementById('forecastbar_exclude_links_save').setAttribute('is_hidden', false);
}
//------------------------------------------------------------------------------
s3forecast.forecastbar_exclude_links_save = function(event) {
	document.getElementById('forecastbar_exclude_links_save').setAttribute('is_hidden', true);
	var pref_value = document.getElementById('forecastbar_exclude_links').value.split(/\n+/);
	pref_value = pref_value.map(function(element) { return element.replace(/\s/g, ''); });
	s3forecast.pref_save('forecastbar_exclude_links', pref_value);
}
//------------------------------------------------------------------------------
s3forecast.pref_click = function(event) {
	var pref_el = event.target;
	//------------------------------------------------------------------------
	while (pref_el && pref_el.className != 'option') {
		pref_el = pref_el.parentNode;
	}
	if (! pref_el) { return; }
	//------------------------------------------------------------------------
	var pref_value = s3forecast.utils.prefs_get(pref_el.pref_name);
	if (pref_el.pref_key) {
		pref_value = s3forecast.utils.text_hash_get(pref_el.pref_key, pref_value);
	}
	//------------------------------------------------------------------------
	if (pref_el.pref_type == 'boolean') {
		pref_value = (String(pref_el.pref_value) == 'true');
	}
	//------------------------------------------------------------------------
	else if (pref_el.pref_type == 'numeric') {
		pref_value = parseInt(pref_el.pref_value);
	}
	//------------------------------------------------------------------------
	else if (pref_el.pref_type == 'array') {
		if (! Array.isArray(pref_value)) { pref_value = []; }
		var search_index = pref_value.indexOf(pref_el.pref_value);
		if (search_index > -1) {
			pref_value.splice(search_index, 1);
		}

		if (event.ctrlKey || event.metaKey) {
			pref_value.push(pref_el.pref_value);
		} else {
			pref_value = [ pref_el.pref_value ];
		}
	}
	//------------------------------------------------------------------------
	else {
		pref_value = pref_el.pref_value;
	}

	//------------------------------------------------------------------------
	//------------------------------------------------------------------------
	if (pref_el.pref_key) {
		var pref_value_old = s3forecast.utils.prefs_get(pref_el.pref_name);
		pref_value = s3forecast.utils.text_hash_set(pref_el.pref_key, pref_value_old, pref_value);
	}
	//------------------------------------------------------------------------
	if (pref_el.pref_name == 'theme_icon_pack') {
		var pref_elements = document.getElementsByClassName('theme_preview_' + pref_value);
		s3forecast.utils.HTMLDOM_value(pref_elements[0], '');
		pref_elements[0].removeAttribute('is_loading_error');
		pref_elements[0].setAttribute('is_loading', true);
		s3forecast.utils.prefs_set(pref_el.pref_name, pref_value);
		s3forecast.pref_init();
		s3forecast.themes.init(pref_value, function(){
			s3forecast.pref_save(pref_el.pref_name, pref_value);
		});
	}
	//------------------------------------------------------------------------
	else {
		s3forecast.pref_save(pref_el.pref_name, pref_value, s3forecast.pref_init);
	}
}
//------------------------------------------------------------------------------
s3forecast.location_list_set = function() {
	//------------------------------------------------------------------------
	var list_items = document.getElementById('forecast_location_list_items');
	while (list_items.firstChild) {
		list_items.removeChild(list_items.firstChild);
 	}
	var location_rotate = document.getElementById('forecast_location_item_rotate');
	while (location_rotate.firstChild) {
		location_rotate.removeChild(location_rotate.firstChild);
 	}

	//------------------------------------------------------------------------
	var menu_rotate = document.createElement('div');
	menu_rotate.className = "forecast_location_item_rotate";
	var rotate_pref = s3forecast.utils.prefs_get('rotate');
	var rotate_text = s3forecast.i18n.get_string("options.locations.rotate");
	var rotate_text_list = rotate_text.split('${number}');
	location_rotate.appendChild(menu_rotate);
	//------------------------------------------------------------------------
	var menu_rotate_text_1 = document.createElement('span');
	menu_rotate_text_1.className = "checkbox";
	menu_rotate_text_1.is_click = true;
	menu_rotate_text_1.setAttribute('is_checked', rotate_pref.enabled);
	s3forecast.utils.HTMLDOM_value(menu_rotate_text_1, rotate_text_list[0].trim());
	menu_rotate.appendChild(menu_rotate_text_1);
	//------------------------------------------------------------------------
	var menu_rotate_text_2 = document.createElement('span');
	menu_rotate_text_2.className = "forecast_location_rotate_number";
	s3forecast.utils.HTMLDOM_value(menu_rotate_text_2, rotate_pref.interval);
	menu_rotate_text_2.setAttribute('title', 60*rotate_pref.interval + 's');
	menu_rotate.appendChild(menu_rotate_text_2);
	//------------------------------------------------------------------------
	menu_rotate_text_2.addEventListener("click", function(event) {
		s3forecast.location_list_rotate_input(this);
	});
	//------------------------------------------------------------------------
	var menu_rotate_text_3 = document.createElement('span');
	menu_rotate_text_3.is_click = true;
	s3forecast.utils.HTMLDOM_value(menu_rotate_text_3, rotate_text_list[1].trim());
	menu_rotate.appendChild(menu_rotate_text_3);
	//------------------------------------------------------------------------
	menu_rotate.addEventListener("click", function(event) {
		if (event.target.is_click) {
			rotate_pref = s3forecast.utils.prefs_get('rotate');
			rotate_pref.enabled = ! rotate_pref.enabled;
			s3forecast.utils.prefs_set('rotate', rotate_pref);
			s3forecast.pref_save('rotate', rotate_pref, function(){
				chrome.runtime.sendMessage({ 'action' : 'rotate_location' }, function(response) {});
			});
		}
	});

	//------------------------------------------------------------------------
	for (var i=0; i<s3forecast.location_list.length; i++) {
		var option = document.createElement('div');
		option.className = "forecast_location_item";

		//-----------------------------------------------------------------
		if (rotate_pref.enabled) {
			var option_rotate = document.createElement('div');
			option_rotate.setAttribute('title', s3forecast.utils.parse_template(rotate_text, { 'number' : rotate_pref.interval }));
			option_rotate.setAttribute('is_checked', s3forecast.location_list[i].rotate);
			option_rotate.className = "forecast_location_rotate";
			option_rotate.id = "forecast_location_rotate";
			option_rotate.skip_click = true;
			option_rotate.value = s3forecast.location_list[i].code;
			option_rotate.addEventListener("click", function(event) {
				chrome.runtime.sendMessage({ 'action' : 'rotate_location', 'code' : this.value }, function(response) {
					s3forecast.save_settings_message();
				});
			});
			option.appendChild(option_rotate);
		}

		//-----------------------------------------------------------------
		var option_delete = document.createElement('div');
		option_delete.setAttribute('title', s3forecast.i18n.get_string("options.remove"));
		option_delete.className = "forecast_location_delete";
		option_delete.id = "forecast_location_delete";
		option_delete.skip_click = true;
		option_delete.value = s3forecast.location_list[i].code;
		option_delete.addEventListener("click", function(event) {
			chrome.runtime.sendMessage({ 'action' : 'delete_location', 'code' : this.value }, function(response) {
				event.target.parentNode.setAttribute('is_hidden', true);
				s3forecast.save_settings_message();
			});
		});
		option.appendChild(option_delete);
		//-----------------------------------------------------------------
		if (! rotate_pref.enabled) {
			var option_rename = document.createElement('div');
			option_rename.setAttribute('title', s3forecast.i18n.get_string("options.rename"));
			option_rename.className = "forecast_location_rename";
			option_rename.id = "forecast_location_rename";
			option_rename.skip_click = true;
			option_rename.value = s3forecast.location_list[i].code;
			option_rename.addEventListener("click", function(event) {
				s3forecast.location_list_rename(event.target.parentNode);
			});
			option.appendChild(option_rename);
		}
		//-----------------------------------------------------------------
		var option_span = document.createElement('span');
		option_span.id = "forecast_location_item_name";
		option_span.className = "forecast_location_item_name";
		s3forecast.utils.HTMLDOM_value(option_span, s3forecast.utils.make_location_short_name(s3forecast.location_list[i].name));
		option_span.setAttribute('title', s3forecast.location_list[i].name);
		option_span.setAttribute('code', s3forecast.location_list[i].code);
		option_span.name_original = s3forecast.location_list[i].name;
		option_span.value = s3forecast.location_list[i].code;
		option.appendChild(option_span);
		//-----------------------------------------------------------------
		option.value = s3forecast.location_list[i].code;
		option_span.addEventListener("click", function(event) {
			if (! event.target.skip_click) {
				chrome.runtime.sendMessage({ 'action' : 'change_forecast_data', 'code' : this.value }, function(response) {
					s3forecast.save_settings_message();
				});
			}
		});
		list_items.appendChild(option);
		//-----------------------------------------------------------------
		if (s3forecast.location_current.code == s3forecast.location_list[i].code) {
			option.setAttribute('is_selected', true);
		}
	}
}
//------------------------------------------------------------------------------
s3forecast.location_list_rotate_input = function(menu_rotate_text) {
	var rotate_pref = s3forecast.utils.prefs_get('rotate');
	var menu_rotate = menu_rotate_text.parentNode;

	//------------------------------------------------------------------------
	var menu_rotate_input = document.createElement('input');
	menu_rotate_input.type = 'text';
	menu_rotate_input.className = "forecast_location_rotate_input";
	menu_rotate_input.skip_click = true;
	menu_rotate_input.setAttribute('title', s3forecast.i18n.get_string("options.press.enter"));
	s3forecast.utils.HTMLDOM_value(menu_rotate_input, rotate_pref.interval);
	menu_rotate.replaceChild(menu_rotate_input, menu_rotate_text);
	menu_rotate_input.focus();
	//------------------------------------------------------------------------
	menu_rotate_input.addEventListener("keypress", function(event) {
		if (! /^[0-9.,]$/.test(event.key) && ! event.keyCode) {
			event.preventDefault();
		}
		if (event.keyCode && (event.keyCode == 13)) {
			var text = '0' + s3forecast.utils.HTMLDOM_value(menu_rotate_input);
			text = String(text).trim();
			text = text.replace(/,/g, '.');
			text = parseFloat(text);
			if (! text) { text = 1; }
			if (text < 0.005) { text = 0.005; }
			rotate_pref = s3forecast.utils.prefs_get('rotate');
			rotate_pref.interval = text;
			s3forecast.utils.prefs_set('rotate', rotate_pref);

			s3forecast.pref_save('rotate', rotate_pref, function(){
				chrome.runtime.sendMessage({ 'action' : 'rotate_location' }, function(response) { });
			});
		}
	});
}
//------------------------------------------------------------------------------
s3forecast.location_list_rename = function(option) {
	var forecast_location_rotate = s3forecast.utils.get_element(option, 'forecast_location_rotate');
	if (forecast_location_rotate) { forecast_location_rotate.setAttribute('is_hidden', true); }
	s3forecast.utils.get_element(option, 'forecast_location_rename').setAttribute('is_hidden', true);
	s3forecast.utils.get_element(option, 'forecast_location_delete').setAttribute('is_hidden', true);

	var option_span = s3forecast.utils.get_element(option, 'forecast_location_item_name');

	var option_input = document.createElement('input');
	option_input.type = 'text';
	option_input.id = 'forecast_location_item_text';
	option_input.className = 'forecast_location_item_text';
	option_input.skip_click = true;
	option_input.setAttribute('title', s3forecast.i18n.get_string("options.press.enter"));

	var text = option_span.name_original;
	s3forecast.utils.HTMLDOM_value(option_input, text);
	option.replaceChild(option_input, option_span);
	option_input.focus();

	option_input.addEventListener("keypress", function(event) {
		if (event.keyCode && (event.keyCode == 13)) {
			var text = s3forecast.utils.HTMLDOM_value(option_input);
			text = String(text).trim();
			if (! text) { return; }

			chrome.runtime.sendMessage({ 'action' : 'rename_location', 'code' : option.value, 'name' : text }, function(response) {
				if (forecast_location_rotate) { forecast_location_rotate.removeAttribute('is_hidden'); }
				s3forecast.utils.get_element(option, 'forecast_location_delete').removeAttribute('is_hidden');
				s3forecast.utils.get_element(option, 'forecast_location_rename').removeAttribute('is_hidden');
				option_span.name_original = text;
				s3forecast.utils.HTMLDOM_value(option_span, s3forecast.utils.make_location_short_name(text));
				option.replaceChild(option_span, option_input);
				s3forecast.save_settings_message();
			});
		}
	});
}
//------------------------------------------------------------------------------
s3forecast.current_locale_init = function() {
	var current_locale = document.getElementById('current_locale');
	var supported_locales = [];
	for (var i in s3forecast.I18N_SUPPORTED) {
		var locale = s3forecast.I18N_SUPPORTED[i];
		locale.lang = i;
		if (locale.active) {
			supported_locales.push(locale);
		}
	}
	supported_locales.sort(function (a, b) {
		if (a.english > b.english) { return 1; }
		if (a.english < b.english) { return -1; }
		return 0;
	});
	for (var i=0; i<supported_locales.length; i++) {
		var el_lang = supported_locales[i];
		var option = document.createElement("option");
		option.text = el_lang.name;
		option.setAttribute('title', el_lang.english);
		option.value = el_lang.lang;
		current_locale.options.add(option);
	}
	current_locale.value = s3forecast.i18n.locale();
	//------------------------------------------------------------------------
	current_locale.addEventListener('change', function(event) {
		s3forecast.current_locale_set(event.target);
	})
}
//------------------------------------------------------------------------------
s3forecast.geolocation_show = function(is_show) {
	if (is_show) {
		document.getElementById('geolocation_header').removeAttribute('is_hidden');
		document.getElementById('geolocation_search_text').setAttribute('is_hidden', true);
		document.getElementById('geolocation_search_button').setAttribute('is_hidden', true);

		document.getElementById('geolocation_search_text').value = '';
		document.getElementById('forecast_location_box').removeAttribute('is_hidden');
		document.getElementById('geolocation_wait').removeAttribute('is_hidden');
		s3forecast.geolocation_error_show(false);

		s3forecast.geolocation_id = s3forecast.utils.random_string(5);
		document.getElementById('geolocation_frame').src = 'http://www.s3blog.org/geolocation.html?r=' + s3forecast.geolocation_id;
	} else {
		document.getElementById('forecast_location_box').setAttribute('is_hidden', true);
		document.getElementById('geolocation_frame').src = 'about:blank';
	}
}
//------------------------------------------------------------------------------
s3forecast.geolocation_search = function(text) {
	s3forecast.geolocation_error_show(false);
	s3forecast.geolocation_messages.push({ 'action' : 'search', 'text' : text });
}
//------------------------------------------------------------------------------
s3forecast.geolocation_init = function() {
	document.getElementById('geolocation_header').setAttribute('is_hidden', true);
	document.getElementById('geolocation_search_text').removeAttribute('is_hidden');
	document.getElementById('geolocation_search_button').removeAttribute('is_hidden');
	document.getElementById('geolocation_wait').setAttribute('is_hidden', true);
}
//------------------------------------------------------------------------------
s3forecast.geolocation_spinner_show = function(is_show) {
	if (is_show) {
		document.getElementById('geolocation_wait').removeAttribute('is_hidden');
	} else {
		document.getElementById('geolocation_wait').setAttribute('is_hidden', true);
	}
}
//------------------------------------------------------------------------------
s3forecast.geolocation_error_show = function(is_show, text) {
	var geolocation_error = document.getElementById('geolocation_error');

	if (is_show && text) {
		geolocation_error.removeAttribute('is_hidden');
		s3forecast.utils.HTMLDOM_value(geolocation_error, text);
	} else {
		geolocation_error.setAttribute('is_hidden', true);
	}
}
//------------------------------------------------------------------------------
s3forecast.current_locale_set = function(current_locale) {
	var callback = function() {
		s3forecast.i18n.init(current_locale.value);
		s3forecast.utils.i18n_parse(document);
		s3forecast.init_additional_text();
	}
	s3forecast.pref_save('current_locale', current_locale.value, callback);
	current_locale.blur();
}
//------------------------------------------------------------------------------
s3forecast.pref_save = function(pref_name, pref_value, callback) {
	chrome.runtime.sendMessage({ 'action_prefs_set': true, 'pref_name' : pref_name, 'pref_value': pref_value }, function(response) {
		s3forecast.utils.prefs_set(pref_name, pref_value);
		if (callback) { callback(); }
		s3forecast.save_settings_message();
	});
}
//-------------------------------------------------------------------------------------------
s3forecast.save_settings = function(mode) {
	var permission = (mode == "save") ? 'downloads' : 'clipboardWrite';

	chrome.permissions.request({
		permissions: [ permission ]
	}, function(granted) {
		if (granted) {
			chrome.runtime.sendMessage({ 'save_settings': true, 'mode' : mode }, function(response) {
				if (mode == "copy") {
					alert(s3forecast.utils.get_string('options.settings_copied'));
				}
			});
		}
	});
}
//-------------------------------------------------------------------------------------------
s3forecast.load_settings = function() {
	document.getElementById('load_settings_file').click();
}
//-------------------------------------------------------------------------------------------
s3forecast.load_settings_file = function(event) {
	var file = event.target.files[0];
	var reader = new FileReader();
	//----------------------------------------------------------------------
	reader.onload = function(e) {
		s3forecast.load_settings_file_done(e.target.result || '');
	}
	reader.readAsText(file);
}
//-------------------------------------------------------------------------------------------
s3forecast.load_settings_file_done = function(result_txt) {
 	//-----------------------------------------------------------------------
	var prefs_list = result_txt.split("\n");
	var pref_branch = s3forecast.utils.clone_object(s3forecast.prefs.list);
	var prefs_new = {};
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
				} else {
					pref_value = String(pref_value);
				}
				s3forecast.utils.prefs_set(pref_name, pref_value);
				prefs_new[pref_name] = pref_value;
			}
		} catch(e) {
		}
	}
	//-----------------------------------------------------------------------
	chrome.runtime.sendMessage({ 'action_prefs_reload': true, 'prefs_new' : prefs_new }, function(response) {
		alert(s3forecast.utils.get_string('options.settings_loaded'));
		window.location.reload();
	});
}
//------------------------------------------------------------------------------
s3forecast.reset_settings = function() {
	if (confirm(s3forecast.utils.get_string('options.restore.confirm'))) {
		chrome.runtime.sendMessage({ 'action_reset_defaults': true }, function(response) {
			s3forecast.prefs.reset_defaults(function(){
				s3forecast.utils.i18n_parse(document);
				s3forecast.init();
				s3forecast.save_settings_message();
				window.location.reload();
			});
		});
	}
}
//------------------------------------------------------------------------------
s3forecast.save_settings_message = function() {
	document.getElementById("settings_saved").removeAttribute('is_hidden');
	setTimeout(function(){
		document.getElementById("settings_saved").setAttribute('is_hidden', true);
	}, 500);
}
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		//------------------------------------------------------------------
		if (! request) { return; }
		//------------------------------------------------------------------
		if (request.action_reload_popup || request.action_reload_settings) {
			chrome.runtime.sendMessage({ 'action_prefs_get': true }, function(response) {
				s3forecast.prefs.list = response.prefs_list;
				if (request.is_new) {
					s3forecast.geolocation_show(false);
				}
				s3forecast.location_list = request.location_list;
				if (request.forecast_data) {
					s3forecast.location_current = request.forecast_data.location;
				}
				if (request.location) {
					s3forecast.location_current = request.location;
				}
				s3forecast.init();
				s3forecast.pref_init();
			});
		}
		//------------------------------------------------------------------
		else if (request.find_location_result) {
			if (request.geolocation_id == s3forecast.geolocation_id) {
				s3forecast.geolocation_messages.push({ 'action' : 'find_location_result', 'text' : JSON.stringify(request) });
			}
		}
		//------------------------------------------------------------------
		else if (request.action_themes_load_done) {
			var pref_elements = document.getElementsByClassName('theme_preview_' + request.theme_id);
			if (pref_elements[0].hasAttribute('is_loading')) {
				pref_elements[0].removeAttribute('is_loading');
				pref_elements[0].setAttribute('is_loading_done', true);
				setTimeout(function(){
					pref_elements[0].removeAttribute('is_loading_done');
				}, 700);
				if (s3forecast.utils.prefs_get('theme_icon_pack') == request.theme_id) {
					s3forecast.pref_init();
				}
			}
		}
		//------------------------------------------------------------------
		else if (request.action_themes_load_error) {
			var pref_elements = document.getElementsByClassName('theme_preview_' + request.theme_id);
			pref_elements[0].removeAttribute('is_loading');
			if (request.error_text && (! /^0\:/.test(request.error_text))) {
				pref_elements[0].setAttribute('is_loading_error', true);
				s3forecast.utils.HTMLDOM_value(pref_elements[0], request.error_text);
				if (s3forecast.utils.prefs_get('theme_icon_pack') == request.theme_id) {
					s3forecast.utils.prefs_set('theme_icon_pack', 1);
					s3forecast.pref_init();
				}
			}
		}
		//------------------------------------------------------------------
		else if (request.action_geolocation) {
			if (request.geolocation_id == s3forecast.geolocation_id) {
				//------------------------------------------------------
				if (request.who == 'loaded') {
					var param = {
						'resource' : 'options',
						'locale_i18n' : s3forecast.i18n.locale(),
						'string_options.search.accuerror' : s3forecast.i18n.get_string("options.search.accuerror"),
						'string_options.locations.tryagain' : s3forecast.i18n.get_string("options.locations.tryagain"),
						'string_options.locations.select' : s3forecast.i18n.get_string("options.locations.select"),
						'string_options.locations.zoom' : s3forecast.i18n.get_string("options.locations.zoom")
					};
					sendResponse({ 'param' : param });
				}
				//------------------------------------------------------
				else if (request.who == 'callback_init') {
					s3forecast.geolocation_init();
					sendResponse({ 'success' : true });
				}
				//------------------------------------------------------
				else if (request.who == 'spinner_show') {
					s3forecast.geolocation_spinner_show(request.value);
					sendResponse({ 'success' : true });
				}
				//------------------------------------------------------
				else if (request.who == 'error_hidden') {
					s3forecast.geolocation_error_show(false);
					sendResponse({ 'success' : true });
				}
				//------------------------------------------------------
				else if (request.who == 'error_show_text') {
					s3forecast.geolocation_error_show(true, s3forecast.i18n.get_string(request.value));
					sendResponse({ 'success' : true });
				}
				//------------------------------------------------------
				else if (request.who == 'get_messages') {
					if (s3forecast.geolocation_messages.length > 0) {
						var message = s3forecast.geolocation_messages.shift();
						sendResponse(message);
					}
				}
			}
		}
	}
);
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
window.addEventListener("load", function(){
	s3forecast.prefs.init(s3forecast.init_0);
});
