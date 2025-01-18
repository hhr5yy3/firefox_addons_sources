s3radio.equalizer = {};
s3radio.equalizer.count = 9;
s3radio.equalizer.preset_last = '';
//------------------------------------------------------------------------------
s3radio.equalizer.presets = [
	{ "id" : "preset_default", "gains" : [ 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0 ] },
	{ "id" : "preset_user", "gains" : [] },
	{ "is_separator" : true },
	{ "is_favorites" : true },
	{ "id" : "preset_live", "gains" : [ -2.9, 0.0, 2.4, 3.4, 3.4, 3.4, 2.4, 1.4, 1.4, 1.4 ] },
	{ "id" : "preset_acoustic", "gains" : [ 7.5, 7.5, 5.0, 2.0, 3.5, 3.5, 5.0, 6.0, 5.0, 2.5 ] },
	{ "id" : "preset_classical", "gains" : [ 7.5, 6.0, 5.0, 4.0, -2.5, -2.5, 0.0, 3.5, 5.0, 6.0 ] },
	{ "id" : "preset_piano", "gains" : [ 5.0, 3.0, 0.0, 4.5, 5.0, 2.5, 6.5, 7.5, 5.0, 5.5 ] },
	{ "id" : "preset_lounge", "gains" : [ -5.0, -2.5, -1.0, 2.0, 6.5, 2.0, 0.0, -2.5, 3.0, 1.5 ] },
	{ "id" : "preset_spoken_word", "gains" : [ -3.5, -0.5, 0.0, 1.0, 6.0, 7.5, 8.0, 7.0, 4.0, 0.0 ] },
	{ "id" : "preset_jazz", "gains" : [ 6.5, 5.0, 2.0, 3.0, -2.5, -2.5, 0.0, 2.0, 5.0, 6.5 ] },
	{ "id" : "preset_pop", "gains" : [ 1.0, 2.9, 4.3, 4.8, 3.4, 0.0, -1.4, -1.4, 1.0, 1.0 ] },
	{ "id" : "preset_dance", "gains" : [ 6.0, 11.0, 7.5, 0.0, 2.5, 5.0, 8.0, 7.5, 6.0, 0.0 ] },
	{ "id" : "preset_latin", "gains" : [ 4.5, 2.5, 0.0, 0.0, -2.5, -2.5, -2.5, 0.0, 5.0, 7.5 ] },
	{ "id" : "preset_rnb", "gains" : [ 4.5, 11.5, 9.5, 2.0, -4.0, -2.5, 4.0, 4.5, 5.0, 6.0 ] },
	{ "id" : "preset_hiphop", "gains" : [ 8.0, 7.0, 2.0, 5.0, -2.0, -1.5, 2.0, -1.0, 3.0, 5.0 ] },
	{ "id" : "preset_electronic", "gains" : [ 7.0, 6.5, 2.0, 0.0, -3.0, 3.0, 1.5, 2.0, 6.5, 7.5 ] },
	{ "id" : "preset_techno", "gains" : [ 4.8, 3.4, 0.0, -3.4, -2.9, 0.0, 4.8, 5.8, 5.8, 5.3 ] },
	{ "id" : "preset_deep", "gains" : [ 7.5, 6.0, 2.5, 1.5, 5.0, 4.0, 2.5, -3.0, -6.0, -7.5 ] },
	{ "id" : "preset_club", "gains" : [ 0.0, 0.0, 4.8, 3.4, 3.4, 3.4, 1.9, 0.0, 0.0, 0.0 ] },
	{ "id" : "preset_rock", "gains" : [ 8.0, 6.5, 5.0, 2.0, -0.5, -1.0, 0.5, 4.0, 5.5, 7.5 ] },
	{ "id" : "preset_rock_soft", "gains" : [ 2.9, 1.0, 0.0, -1.4, 0.0, 2.4, 4.8, 5.8, 6.7, 7.2 ] },
	{ "id" : "preset_ska", "gains" : [ -1.4, -2.9, -2.4, 0.0, 2.4, 3.4, 5.3, 5.8, 6.7, 5.8 ] },
	{ "id" : "preset_reggae", "gains" : [ 0.0, 0.0, 0.0, -3.4, 0.0, 3.8, 3.8, 0.0, 0.0, 0.0 ] },
	{ "is_separator" : true },
	{ "id" : "preset_headphones", "gains" : [ 2.9, 6.7, 3.4, -1.9, -1.4, 1.0, 2.9, 5.8, 7.7, 8.6 ] },
	{ "id" : "preset_laptop_speakers", "gains" : [ 5.6, 9.9, 6.0, 1.7, 2.1, 5.1, 5.6, 5.8, 7.7, 8.6 ] },
	{ "id" : "preset_small_speakers", "gains" : [ 9.0, 7.0, 6.5, 4.0, 2.0, 0.0, -2.0, -4.5, -5.5, -7.0 ] },
	{ "id" : "preset_vocal_booster", "gains" : [ -2.5, -5.0, -5.0, 2.0, 6.0, 6.0, 5.0, 2.5, 0.0, -2.5 ] },
	{ "id" : "preset_bass_booster", "gains" : [ 7.5, 6.0, 5.0, 3.5, 1.5, 0.0, 0.0, 0.0, 0.0, 0.0 ] },
	{ "id" : "preset_bass_reducer", "gains" : [ -7.5, -6.0, -5.0, -4.0, -2.5, 0.0, 0.0, 3.5, 5.0, 6.0 ] },
	{ "id" : "preset_treble_booster", "gains" : [ 0.0, 0.0, 0.0, 0.0, 0.0, 1.5, 4.0, 6.0, 7.0, 8.5 ] },
	{ "id" : "preset_treble_reducer", "gains" : [ 0.0, 0.0, 0.0, 0.0, 0.0, -1.5, -4.0, -6.0, -7.0, -8.5 ] },
	{ "id" : "preset_bass_treble_booster", "gains" : [ 4.3, 3.4, 0.0, -4.3, -2.9, 1.0, 4.8, 6.7, 7.2, 7.2 ] }
];
//------------------------------------------------------------------------------
s3radio.equalizer.init = function() {
	s3radio.equalizer.select_presets = document.getElementById('radio_equalizer_presets');

	//------------------------------------------------------------------------
	var equalizer_enabled = s3radio.utils.prefs_get('equalizer_enabled');
	var equalizer_filters = s3radio.utils.prefs_get('equalizer_filters');
	//------------------------------------------------------------------------
	for (var i=0; i<=s3radio.equalizer.count; i++) {
		var slider = document.getElementById('radio_equalizer_slider_' + i);
		slider.filter_id = i;
		slider.value = 	equalizer_filters[i] || 0;

		//------------------------------------------------------------------
		slider.addEventListener("mousemove", function(e) {
			if (e.buttons) {
				s3radio.equalizer.change_slider(this);
			}
		});
		//------------------------------------------------------------------
		slider.addEventListener("change", function() {
			s3radio.equalizer.change_slider(this, true);
		});
	}

	//------------------------------------------------------------------------
	document.getElementById('equalizer_enabled').checked = equalizer_enabled;
	document.getElementById('equalizer_enabled').addEventListener("click", function() {
		s3radio.pref_save('equalizer_enabled', this.checked);
		s3radio.equalizer.check_status(this.checked);
		s3radio.radio_station_shuffle();
	});
	s3radio.equalizer.check_status(equalizer_enabled);

	//------------------------------------------------------------------------
	s3radio.equalizer.select_presets.addEventListener("change", function() {
		s3radio.equalizer.select_value(this.value);
		//------------------------------------------------------------------
		s3radio.pref_save('equalizer_preset', this.value, function(){
			s3radio.equalizer.check_status();
			s3radio.radio_station_shuffle();
		});
	});
	s3radio.equalizer.create_presets();

	//------------------------------------------------------------------------
	document.getElementById('radio_equalizer_save').addEventListener("click", function() {
		s3radio.equalizer.save_to_favorites();
		s3radio.radio_station_shuffle();
	});
}
//------------------------------------------------------------------------------
s3radio.equalizer.change_slider = function(slider, is_change) {
	var favorite_id = s3radio.equalizer.select_presets.options[s3radio.equalizer.select_presets.selectedIndex].favorite_id;

	if (slider.value > 12) { slider.value = 12; }
	if (slider.value < -12) { slider.value = -12; }

	slider.setAttribute("title", slider.value);

	if (favorite_id && (favorite_id == s3radio.current_radio.id)) {
		s3radio.equalizer.save_to_favorites();
	} else {
		s3radio.equalizer.save();
		s3radio.pref_save('equalizer_preset', 'preset_user');
		s3radio.equalizer.create_presets("preset_user");
	}
	if (is_change) {
		s3radio.radio_station_shuffle();
	}
}
//------------------------------------------------------------------------------
s3radio.equalizer.create_presets = function(equalizer_preset) {
	if (! equalizer_preset) {
		equalizer_preset = s3radio.utils.prefs_get('equalizer_preset');
	}
	var equalizer_filters = s3radio.utils.prefs_get('equalizer_filters');

	//------------------------------------------------------------------------
	while (s3radio.equalizer.select_presets.length > 0) {
		s3radio.equalizer.select_presets.remove(s3radio.equalizer.select_presets.length-1);
	}

	//------------------------------------------------------------------------
	for (var i=0; i<s3radio.equalizer.presets.length; i++) {
		if (s3radio.equalizer.presets[i].is_separator) {
			s3radio.equalizer.create_presets_separator();
		}
		else if (s3radio.equalizer.presets[i].is_favorites) {
			s3radio.equalizer.create_presets_favorites();
		}
		else {
			var gains = (s3radio.equalizer.presets[i].id == 'preset_user') ? equalizer_filters : s3radio.equalizer.presets[i].gains;
			var option = document.createElement("option");
			option.text = s3radio.utils.get_string("equalizer_" + s3radio.equalizer.presets[i].id);
			option.value = s3radio.equalizer.presets[i].id;
			s3radio.equalizer.select_presets.options.add(option);
			option.gains = gains;
		}
	}
	//------------------------------------------------------------------------
	s3radio.equalizer.select_value(equalizer_preset);
	s3radio.equalizer.check_status();
}
//------------------------------------------------------------------------------
s3radio.equalizer.create_presets_favorites = function() {
	//------------------------------------------------------------------------
	var user_list = s3radio.utils.prefs_get('user_list');
	var favorites_list = s3radio.utils.prefs_get('favorites_list');
	var favorites_list_tmp = [];
	//------------------------------------------------------------------------
	for (var favorite_id in favorites_list) {
		if (favorites_list[favorite_id].equalizer_filters) {
			var country = favorites_list[favorite_id].country;
			var name = undefined;
			//-----------------------------------------------------------
			if (s3radio.stations[country]) {
				var station = s3radio.stations[country].find(function(el) {
					return (el.id && (el.id == favorite_id)) ? true : false;
				})
				if (station) {
					name = station.name;
				}
			}
			//-----------------------------------------------------------
			else {
				var user_station = s3radio.utils.check_is_user_list(favorite_id, user_list);
				if (user_station) {
					name = user_station.name;
				}
			}
			//-----------------------------------------------------------
			if (name) {
				favorites_list_tmp.push({
					"name" : name,
					"favorite_id" : favorite_id,
					"equalizer_filters" : favorites_list[favorite_id].equalizer_filters
				});
			}
		}
	}

	//------------------------------------------------------------------------
	if (favorites_list_tmp.length > 0) {
		//------------------------------------------------------------------
		favorites_list_tmp = favorites_list_tmp.sort(function(a, b) {
			if (String(a.name).toLowerCase() > String(b.name).toLowerCase()) { return 1; }
			if (String(a.name).toLowerCase() < String(b.name).toLowerCase()) { return -1; }
			return 0;
		});
		//------------------------------------------------------------------
		for (var i =0 ; i<favorites_list_tmp.length; i++) {
			var option = document.createElement("option");
			option.text = "\u2605 " + favorites_list_tmp[i].name;
			option.value = 'preset_' + favorites_list_tmp[i].favorite_id;
			s3radio.equalizer.select_presets.options.add(option);
			option.gains = favorites_list_tmp[i].equalizer_filters;
			option.favorite_id = favorites_list_tmp[i].favorite_id;
		}
		s3radio.equalizer.create_presets_separator();
	}
}
//------------------------------------------------------------------------------
s3radio.equalizer.create_presets_separator = function() {
	var option = document.createElement("option");
	option.text = '──────────';
	s3radio.equalizer.select_presets.options.add(option);
	option.disabled = true;
}
//------------------------------------------------------------------------------
s3radio.equalizer.select_value = function(equalizer_preset) {
	//------------------------------------------------------------------------
	if (equalizer_preset === undefined) {
		return s3radio.equalizer.select_presets.value;
	}

	//------------------------------------------------------------------------
	s3radio.equalizer.select_presets.value = equalizer_preset;
	//------------------------------------------------------------------------
	if (s3radio.equalizer.select_presets.selectedIndex < 0) {
		s3radio.equalizer.create_presets("preset_default");
		return;
	}
	//------------------------------------------------------------------------
	if (s3radio.equalizer.preset_last != equalizer_preset) {
		var preset_gains = s3radio.equalizer.select_presets.options[s3radio.equalizer.select_presets.selectedIndex].gains;
		if (! preset_gains) { return; }
		//------------------------------------------------------------------
		for (var i=0; i<=s3radio.equalizer.count; i++) {
			var slider = document.getElementById('radio_equalizer_slider_' + i);
			slider.value = preset_gains[i];
			slider.setAttribute("title", preset_gains[i]);
		}
	}

	//------------------------------------------------------------------------
	s3radio.equalizer.preset_last = equalizer_preset;
}
//------------------------------------------------------------------------------
s3radio.equalizer.save_to_favorites = function() {
	if (! document.getElementById('equalizer_enabled').checked) {
		return;
	}

	//------------------------------------------------------------------------
	var favorites_list = s3radio.utils.prefs_get('favorites_list');

	//------------------------------------------------------------------------
	if (! favorites_list[s3radio.current_radio.id]) {
		favorites_list[s3radio.current_radio.id] = { 'country' : s3radio.current_radio.country, 'order' : (new Date()).getTime() };
	}

	//------------------------------------------------------------------------
	favorites_list[s3radio.current_radio.id].equalizer_filters = [];

	//------------------------------------------------------------------------
	for (var i=0; i<=s3radio.equalizer.count; i++) {
		var slider = document.getElementById('radio_equalizer_slider_' + i);
		favorites_list[s3radio.current_radio.id].equalizer_filters.push(parseFloat(slider.value));
	}

	//------------------------------------------------------------------------
	s3radio.pref_save('favorites_list', favorites_list, function(){
		var radio_station_box = document.getElementById('radio_list_' + s3radio.current_radio.id);
		if (radio_station_box) {
			s3radio.create_list_elements_favorites(radio_station_box, true);
		}
		s3radio.create_player_favorites(true);
		s3radio.equalizer.create_presets('preset_' + s3radio.current_radio.id);
	});
}
//------------------------------------------------------------------------------
s3radio.equalizer.check_status = function(enabled) {
	if (enabled === undefined) {
		enabled = document.getElementById('equalizer_enabled').checked;
	}

	//------------------------------------------------------------------------
	var result = [];
	for (var i=0; i<=s3radio.equalizer.count; i++) {
		var slider = document.getElementById('radio_equalizer_slider_' + i);
		slider.disabled = ! enabled;
		result.push(parseFloat(slider.value));
	}

	//------------------------------------------------------------------------
	if (enabled) {
		document.getElementById('radio_equalizer_controls').removeAttribute("is_disabled");
		document.getElementById('radio_equalizer_save').removeAttribute("is_disabled");
	} else {
		result = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
		document.getElementById('radio_equalizer_controls').setAttribute("is_disabled", true);
		document.getElementById('radio_equalizer_save').setAttribute("is_disabled", true);
	}

	s3radio.equalizer.select_presets.disabled = ! enabled;
	s3radio.equalizer.filters_apply(result);
}
//------------------------------------------------------------------------------
s3radio.equalizer.get_filters_by_radio_id = function(radio_id) {
	var equalizer_enabled = s3radio.utils.prefs_get('equalizer_enabled');
	var equalizer_preset = s3radio.utils.prefs_get('equalizer_preset');

	//------------------------------------------------------------------------
	var result = [];
	var equalizer_preset_result = [];
	var equalizer_radio_id_result = [];

	//------------------------------------------------------------------------
	if (equalizer_enabled) {
		for (var i=0; i<s3radio.equalizer.select_presets.length; i++) {
			if (s3radio.equalizer.select_presets.options[i].gains) {
				if (s3radio.equalizer.select_presets.options[i].value == equalizer_preset) {
					equalizer_preset_result = s3radio.equalizer.select_presets.options[i].gains;
				}
				if (s3radio.equalizer.select_presets.options[i].value == 'preset_' + radio_id) {
					equalizer_radio_id_result = s3radio.equalizer.select_presets.options[i].gains;
				}
			}
		}
		if (equalizer_radio_id_result.length > 0) {
			result = equalizer_radio_id_result;
		} else if (equalizer_preset_result.length > 0) {
			result = equalizer_preset_result;
		}
	}
	//------------------------------------------------------------------------
	else {
		result = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
	}

	return result;
}
//------------------------------------------------------------------------------
s3radio.equalizer.save = function() {
	var result = [];

	for (var i=0; i<=s3radio.equalizer.count; i++) {
		var slider = document.getElementById('radio_equalizer_slider_' + i);
		result.push(parseFloat(slider.value));
	}

	s3radio.pref_save('equalizer_filters', result, function(){
		s3radio.equalizer.filters_apply(result);
	});
}
//------------------------------------------------------------------------------
s3radio.equalizer.filters_apply = function(filters) {
	chrome.runtime.sendMessage({ 'action_equalizer_filters_apply' : true, 'filters' : filters }, function(response) {});
}
//------------------------------------------------------------------------------
