var s3radio = {};
s3radio.current_radio = {};
s3radio.selected_country = '';
s3radio.station_list = [];
s3radio.stop_event_scroll = false;
s3radio.shuffle_enabled = false;
s3radio.sleep_timer_enabled = false;
s3radio.div_body_load_progress = null;
s3radio.draggable = null;
s3radio.show_init_progress = true;
s3radio.main_url = "https://radio.s3blog.org";
s3radio.search_input_timer = 0;
s3radio.trackid_info_timer = 0;
//------------------------------------------------------------------------------
s3radio.init_0 = function() {
	s3radio.div_body_load_progress = document.getElementById('div_body_load_progress');

	s3radio.prefs.init(function(){
		s3radio.set_theme_color();
		s3radio.selected_country = s3radio.utils.prefs_get('selected_country');
		var favorites_country_hash = false;

		//------------------------------------------------------------------
		var stylesheet = document.createElement('link');
		stylesheet.setAttribute('rel', 'stylesheet');
		stylesheet.setAttribute('type', 'text/css');
		stylesheet.setAttribute('href', '/skin/' + s3radio.utils.get_theme_catalog() + '/popup.css');
		document.getElementById('div_body').appendChild(stylesheet);

		//------------------------------------------------------------------
		var scale_height = document.documentElement.clientHeight / 500;
		var scale_width = document.documentElement.clientWidth / 350;
		var scale_value = (scale_height > scale_width) ? scale_width : scale_height;
		if (scale_value > 1) {
			document.getElementById('div_body').style.transform = 'scale(' + scale_value.toFixed(2)+ ')';
			document.body.style.overflow = "auto";
		}
		//------------------------------------------------------------------
		else if (s3radio.utils.prefs_get('theme_big_size')) {
			var stylesheet2 = document.createElement('link');
			stylesheet2.setAttribute('rel', 'stylesheet');
			stylesheet2.setAttribute('type', 'text/css');
			stylesheet2.setAttribute('href', '/skin/' + s3radio.utils.get_theme_catalog() + '/scale.css');
			document.getElementById('div_body').appendChild(stylesheet2);
		}

		//------------------------------------------------------------------
		{
			var favorites_list = s3radio.utils.prefs_get('favorites_list');
			var is_version_1 = false;
			favorites_country_hash = {};
			for (var favorite_id in favorites_list) {
				if (typeof favorites_list[favorite_id] != 'object') {
					favorites_list[favorite_id] = { 'country' : favorites_list[favorite_id], 'order' : (new Date()).getTime() };
					is_version_1 = true;
				}
				var country_id = favorites_list[favorite_id].country;
				favorites_country_hash[country_id] = true;
			}
			if (is_version_1) {
				s3radio.pref_save('favorites_list', favorites_list);
			}
		}
		//------------------------------------------------------------------
		s3radio.utils.i18n_parse(document);
		//-----------------------------------------------------------------
		if (s3radio.selected_country == 'user_list') {
			s3radio.init_stations_end();
		}
		//-----------------------------------------------------------------
		s3radio.init_stations(favorites_country_hash);
	});
}
//------------------------------------------------------------------------------
s3radio.get_country_stations = function(country, callback) {
	if (! s3radio.country_list[country]) {
		if (callback) { callback(); }
	}
	else if (s3radio.stations[country]) {
		if (callback) { callback(); }
	} else {
		fetch(s3radio.main_url + '/stations/json/' + country + '.json').then(function(response) {
			return response.json();
		}).then(function(stations) {
			s3radio.stations[country] = stations[country];
			if (stations.next_json) {
				s3radio.get_country_stations_sub(country, stations.next_json, callback);
			} else if (callback) { callback(); }
		}).catch(function(error) {
			s3radio.utils.console_log(country + " : " + error.message);
			if (callback) { callback(); }
		});
	}
}
//------------------------------------------------------------------------------
s3radio.get_country_stations_sub = function(country, file, callback) {
	fetch(s3radio.main_url + '/stations/json/' + file).then(function(response) {
		return response.json();
	}).then(function(stations) {
		if (stations[country]) {
			s3radio.stations[country].push.apply(s3radio.stations[country], stations[country]);
		}
		if (stations[country] && stations.next_json) {
			s3radio.get_country_stations_sub(country, stations.next_json, callback);
		} else if (callback) { callback(); }
	}).catch(function(error) {
		if (callback) { callback(); }
	});
}
//------------------------------------------------------------------------------
s3radio.init_stations = function(favorites_country_hash) {
	if (s3radio.selected_country) {
		s3radio.get_country_stations(s3radio.selected_country, function(){
			s3radio.init_stations_favorites(favorites_country_hash);
		});
	} else {
		s3radio.init_stations_favorites(favorites_country_hash);
	}
}
//------------------------------------------------------------------------------
s3radio.init_stations_favorites = function(favorites_country_hash) {
	s3radio.load_favorites_lists = 0;
	var is_load_favorites_country = false;

	for (var country_id in favorites_country_hash) {
		is_load_favorites_country = true;
		s3radio.load_favorites_lists++;
		s3radio.init_stations_favorites_add(country_id);
	}
	//------------------------------------------------------------------------
	if (! is_load_favorites_country) {
		s3radio.init_stations_run();
	}
}
//------------------------------------------------------------------------------
s3radio.init_stations_favorites_add = function(country_id) {
	setTimeout(function(){
		s3radio.get_country_stations(country_id, function(){
			s3radio.load_favorites_lists--;
			if (s3radio.load_favorites_lists <= 0) {
				s3radio.init_stations_run();
			}
		});
	}, 1);
}
//------------------------------------------------------------------------------
s3radio.init_stations_run = function() {
	//------------------------------------------------------------------------
	var favorites_list = s3radio.utils.prefs_get('favorites_list');
	var is_version_2 = false;
	//------------------------------------------------------------------------
	for (var favorite_id in favorites_list) {
		if (/\.png$/.test(favorite_id)) {
			var country = favorites_list[favorite_id].country;
			var old_id = favorite_id.replace(/^.*?\.(.+?)\..*$/, "$1") || 'DDDDD';
			//-----------------------------------------------------------
			if (s3radio.stations[country]) {
				//-----------------------------------------------------
				var station = s3radio.stations[country].find(function(el) {
					return (el.old_id && (el.old_id == old_id)) ? true : false;
				})
				//-----------------------------------------------------
				if (station) {
					is_version_2 = true;
					s3radio.utils.create_station_id(station, country);
					favorites_list[station.id] = favorites_list[favorite_id];
					delete favorites_list[favorite_id];
				}
			}
		}
	}
	if (is_version_2) {
		s3radio.pref_save('favorites_list', favorites_list);
	}

	//------------------------------------------------------------------------
	var search_country = s3radio.utils.prefs_get('search_country') || 'DDD';
	s3radio.get_country_stations(search_country, function(){
		s3radio.init_stations_end(true);
		s3radio.create_country_list();
	});
}
//------------------------------------------------------------------------------
s3radio.init_stations_end = function(is_finish) {
	if (s3radio.utils.prefs_get('search_open') && ! is_finish) {
		return;
	}
	if (s3radio.show_init_progress) {
		s3radio.show_init_progress = false;
		s3radio.init_1();
	}
}
//------------------------------------------------------------------------------
s3radio.init_1 = function() {
	var current_radio = s3radio.utils.prefs_get('current_radio');

	if (current_radio && current_radio.country && s3radio.stations[current_radio.country]) {
		var country = current_radio.country;
		s3radio.get_country_stations(country, function(){
			//-----------------------------------------------------------
			var station = s3radio.stations[country].find(function(el) {
				if (/\.png$/.test(current_radio.id)) {
					var old_id = current_radio.id.replace(/^.*?\.(.+?)\..*$/, "$1") || 'DDDDD';
					return (el.old_id && (el.old_id == old_id)) ? true : false;
				} else {
					return (el.id && (el.id == current_radio.id)) ? true : false;
				}
			})
			//-----------------------------------------------------------
			if (station) {
				current_radio = station;
				current_radio.country = country;
				s3radio.pref_save('current_radio', current_radio);
			}
			//-----------------------------------------------------------
			s3radio.init_1_run();
		});
	} else {
		s3radio.init_1_run();
	}
}
//------------------------------------------------------------------------------
s3radio.init_1_run = function() {
	//------------------------------------------------------------------------
	document.getElementById('radio_player_control_volume').addEventListener("mousemove", function() {
		var volume_value = s3radio.utils.prefs_get('volume_value');
		if (volume_value != this.value) {
			s3radio.pref_save('volume_value', parseInt(this.value));
			s3radio.volume_value();
		}
	});
	//------------------------------------------------------------------------
	document.getElementById('radio_player_control_volume').addEventListener("change", function() {
		var volume_value = s3radio.utils.prefs_get('volume_value');
		if (volume_value != this.value) {
			s3radio.pref_save('volume_value', parseInt(this.value));
			s3radio.volume_value();
		}
	});

	//------------------------------------------------------------------------
	document.getElementById('radio_player_control_sound').addEventListener("click", function() {
		var volume_value = s3radio.utils.prefs_get('volume_value');
		var volume_value_old = volume_value || s3radio.utils.prefs_get('volume_value_old') || 50;

		volume_value = (volume_value > 0) ? 0 : volume_value_old;
		document.getElementById('radio_player_control_volume').value = volume_value;
		s3radio.pref_save('volume_value', volume_value);
		s3radio.pref_save('volume_value_old', volume_value_old);
		s3radio.volume_value();
	});
	//------------------------------------------------------------------------
	document.getElementById('radio_player_control_play').addEventListener("click", function(event) {
		s3radio.radio_play();
	});
	//------------------------------------------------------------------------
	document.getElementById('radio_player_country').addEventListener("click", function(event) {
		s3radio.selected_country = s3radio.current_radio.country;
		s3radio.pref_save('selected_country', s3radio.selected_country, function(){
			s3radio.create_list_selector();
		});
		event.preventDefault();
		event.stopPropagation();
	});
	//------------------------------------------------------------------------
	document.getElementById('radio_player_prev').addEventListener("click", function() {
		s3radio.radio_station_prev_next(false);
	});
	//------------------------------------------------------------------------
	document.getElementById('radio_player_next').addEventListener("click", function() {
		s3radio.radio_station_prev_next(true);
	});
	//------------------------------------------------------------------------
	document.getElementById('radio_player_random').addEventListener("click", function() {
		s3radio.radio_station_random();
	});
	//------------------------------------------------------------------------
	document.getElementById('radio_player_shuffle').addEventListener("click", function() {
		s3radio.shuffle_enabled = ! s3radio.shuffle_enabled;
		s3radio.radio_station_shuffle();
	});
	//------------------------------------------------------------------------
	document.getElementById('radio_player_sleep_timer').addEventListener("click", function() {
		s3radio.radio_player_sleep_timer();
	});
	//------------------------------------------------------------------------
	document.getElementById('radio_player_search').addEventListener("click", function() {
		var search_open = ! s3radio.utils.prefs_get('search_open');

		s3radio.pref_save('search_open', search_open, function(){
			document.getElementById('radio_player_search').setAttribute('is_search', search_open);
			document.getElementById('radio_search_box').setAttribute('is_hidden', ! search_open);
			s3radio.create_list_selector();
		});
	});
	//------------------------------------------------------------------------
	document.getElementById('radio_search_input').addEventListener("input", function(e) {
		if (s3radio.search_input_timeout) {
			clearTimeout(s3radio.search_input_timeout);
		}

		var current_time = (new Date()).getTime();
		var timer_time = ((current_time - s3radio.search_input_timer) >500) ? 1 : 500;
		s3radio.search_input_timer = current_time;

		var _this = this;
		s3radio.search_input_timeout = setTimeout(function(){
			s3radio.pref_save('search_text', _this.value, function(){
				s3radio.create_list_by_search();
			});
		}, timer_time);
	});
	//------------------------------------------------------------------------
	document.getElementById('radio_player_favorites').addEventListener("click", function() {
		var search_open = s3radio.utils.prefs_get('search_open');
		if (search_open && (s3radio.selected_country == 'favorites')) {
			s3radio.pref_save('selected_country', s3radio.selected_country, function(){
				s3radio.create_list_selector();
			});
		}
		else if (s3radio.selected_country == 'favorites') {
			s3radio.selected_country = s3radio.current_radio.country;
			s3radio.pref_save('selected_country', s3radio.selected_country, function(){
				s3radio.create_list_selector();
			});
		} else {
			s3radio.selected_country = 'favorites';
			s3radio.pref_save('selected_country', s3radio.selected_country, function(){
				s3radio.create_list_selector();
			});
		}
	});
	//------------------------------------------------------------------------
	document.getElementById('radio_player_user_list').addEventListener("click", function() {
		var search_open = s3radio.utils.prefs_get('search_open');
		if (search_open && (s3radio.selected_country == 'user_list')) {
			s3radio.pref_save('selected_country', s3radio.selected_country, function(){
				s3radio.create_list_selector();
			});
		}
		else if (s3radio.selected_country == 'user_list') {
			s3radio.selected_country = s3radio.utils.prefs_get('last_normal_selected_country');
			s3radio.pref_save('selected_country', s3radio.selected_country, function(){
				s3radio.create_list_selector();
			});
		} else {
			s3radio.selected_country = 'user_list';
			s3radio.pref_save('selected_country', s3radio.selected_country, function(){
				s3radio.create_list_selector();
			});
		}
	});
	//------------------------------------------------------------------------
	document.getElementById('radio_player_list').addEventListener("click", function() {
		if (s3radio.utils.prefs_get('search_open')) { return; }

		var radio_list_show = ! s3radio.utils.prefs_get('radio_list_show');
		s3radio.pref_save('radio_list_show', radio_list_show, function(){
			document.getElementById('radio_player_list').setAttribute('is_hidden', ! radio_list_show);
			document.getElementById('radio_list_box').setAttribute('is_hidden', ! radio_list_show);
			document.getElementById('radio_box_head').setAttribute('is_hidden', ! radio_list_show);
			document.getElementById('radio_player_list').setAttribute('title', s3radio.utils.get_string((radio_list_show) ? 'hide_list_radio_stations' : 'show_list_radio_stations'));
			document.getElementById('radio_list_box_is_empty').setAttribute('is_hidden', ! radio_list_show);
		});
	});
	//------------------------------------------------------------------------
	document.getElementById('radio_player_country_list').addEventListener("click", function() {
		document.getElementById('div_body_player').setAttribute('is_hidden', true);
		document.getElementById('div_body_country_list').setAttribute('is_hidden', false);
	});
	//------------------------------------------------------------------------
	document.getElementById('radio_player_station_favorites').addEventListener("click", function() {
		var favorites_list = s3radio.utils.prefs_get('favorites_list');
		var is_deleted = false;
		if (favorites_list[s3radio.current_radio.id]) {
			delete favorites_list[s3radio.current_radio.id];
			is_deleted = true;
		} else {
			favorites_list[s3radio.current_radio.id] = { 'country' : s3radio.current_radio.country, 'order' : (new Date()).getTime() };
		}
		s3radio.pref_save('favorites_list', favorites_list, function(){
			var radio_station_box = document.getElementById('radio_list_' + s3radio.current_radio.id);
			if (radio_station_box) {
				s3radio.create_list_elements_favorites(radio_station_box, (favorites_list[s3radio.current_radio.id]) ? true : false);
			}
			s3radio.create_player_favorites((favorites_list[s3radio.current_radio.id]) ? true : false);
			if (is_deleted) {
				s3radio.equalizer.create_presets();
			}
		});
	});
	//------------------------------------------------------------------------
	document.getElementById('radio_player_equalizer').addEventListener("click", function() {
		var equalizer_open = s3radio.utils.prefs_get('equalizer_open');
		equalizer_open = ! equalizer_open;
		document.getElementById('radio_box_equalizer').setAttribute('is_hidden', ! equalizer_open);
		document.getElementById('radio_player_equalizer').setAttribute('is_equalizer', equalizer_open);
		document.getElementById('radio_player_equalizer').setAttribute('title', equalizer_open ? s3radio.utils.get_string('equalizer_button_hide') : s3radio.utils.get_string('equalizer_button_show'));
		s3radio.pref_save('equalizer_open', equalizer_open);
	});
	//------------------------------------------------------------------------
	document.getElementById('radio_player_settings').addEventListener("click", function() {
		chrome.runtime.openOptionsPage();
		s3radio.window_close();
	});
	//------------------------------------------------------------------------
	document.getElementById('radio_list_box').addEventListener("scroll", function(event) {
		s3radio.create_list_elements_plus(event);
	});
	//------------------------------------------------------------------------
	document.getElementById('button_body_country_list_close').addEventListener("click", function() {
		document.getElementById('div_body_player').setAttribute('is_hidden', false);
		document.getElementById('div_body_country_list').setAttribute('is_hidden', true);
	});
	//------------------------------------------------------------------------
	document.getElementById('radio_search_select_country_current').addEventListener("click", function() {
		var country_list_box = document.getElementById('radio_search_select_country_list');
		country_list_box.setAttribute('is_hidden', 'false');
		document.getElementById('div_body_player').style.minHeight = (document.getElementById('radio_player_box').clientHeight + country_list_box.clientHeight + 20) + 'px';
		country_list_box.focus();
		s3radio.check_country_list_search();

		//------------------------------------------------------------------------
		if (! country_list_box.second_open) {
			country_list_box.second_open = true;
			var search_country = s3radio.utils.prefs_get('search_country') || 'DDD';
			if (s3radio.stations[search_country]) {
				s3radio.scrollIntoView(document.getElementById('radio_search_select_country_list_' + search_country), 4);
			}
		}
	});
	//------------------------------------------------------------------------
	document.getElementById('radio_search_select_country_list').addEventListener("blur", function() {
		this.setAttribute('is_hidden', 'true');
		document.getElementById('div_body_player').style.minHeight = '';
	});

	//------------------------------------------------------------------------
	//------------------------------------------------------------------------
	document.getElementById('user_list_head_plus').addEventListener("click", function() {
		document.getElementById('div_body_player').setAttribute('is_hidden', true);
		document.getElementById('div_body_user_list_new').setAttribute('is_hidden', false);
		document.getElementById('user_list_new_station_name').value = '';
		document.getElementById('user_list_new_station_stream_url').value = '';
		document.getElementById('user_list_new_station_website_url').value = '';
		document.getElementById('user_list_new_station_id').value = '';
		document.getElementById('user_list_new_station_name').focus();
		document.getElementById('user_list_new_station_delete').setAttribute('not_show', true);
		s3radio.pref_save('user_list_new_show', true);
		s3radio.pref_save('user_list_new_station_id', '');
		s3radio.pref_save('user_list_new_station_name', '');
		s3radio.pref_save('user_list_new_stream_url', '');
		s3radio.pref_save('user_list_new_website_url', '');
		s3radio.pref_save('user_list_new_last', 'station_name');
		s3radio.utils.HTMLDOM_value(document.getElementById('user_list_radio_stations_new_title'), s3radio.utils.get_string('user_list_radio_stations_new'));
		s3radio.user_list_station_new_check();
	});
	//------------------------------------------------------------------------
	document.getElementById('button_body_user_list_new_close').addEventListener("click", s3radio.user_list_station_new_close);
	//------------------------------------------------------------------------
	document.getElementById('user_list_new_station_name').addEventListener('focus', s3radio.user_list_station_new_set);
	document.getElementById('user_list_new_station_name').addEventListener('keyup', s3radio.user_list_station_new_set);
	document.getElementById('user_list_new_station_name').addEventListener('paste', s3radio.user_list_station_new_set);
	document.getElementById('user_list_new_station_name').addEventListener('input', s3radio.user_list_station_new_set);
	//------------------------------------------------------------------------
	document.getElementById('user_list_new_station_stream_url').addEventListener('focus', s3radio.user_list_station_new_set);
	document.getElementById('user_list_new_station_stream_url').addEventListener('keyup', s3radio.user_list_station_new_set);
	document.getElementById('user_list_new_station_stream_url').addEventListener('paste', s3radio.user_list_station_new_set);
	document.getElementById('user_list_new_station_stream_url').addEventListener('input', s3radio.user_list_station_new_set);
	//------------------------------------------------------------------------
	document.getElementById('user_list_new_station_website_url').addEventListener('focus', s3radio.user_list_station_new_set);
	document.getElementById('user_list_new_station_website_url').addEventListener('keyup', s3radio.user_list_station_new_set);
	document.getElementById('user_list_new_station_website_url').addEventListener('paste', s3radio.user_list_station_new_set);
	document.getElementById('user_list_new_station_website_url').addEventListener('input', s3radio.user_list_station_new_set);
	//------------------------------------------------------------------------
	document.getElementById('user_list_new_station_form').addEventListener("submit", s3radio.user_list_new_station_save);
	document.getElementById('user_list_new_station_save').addEventListener("click", s3radio.user_list_new_station_save);
	document.getElementById('user_list_new_station_delete').addEventListener("click", s3radio.user_list_new_station_delete);

	//------------------------------------------------------------------------
/*
	var scale_height = document.documentElement.clientHeight / 400;
	var scale_width = document.documentElement.clientWidth / 350;
	var scale_value = (scale_height > scale_width) ? scale_width : scale_height;
	if (scale_value > 1) {
		document.getElementById('div_body').style.transform = 'scale(' + scale_value.toFixed(2)+ ')';
	}
*/
	//------------------------------------------------------------------------
	s3radio.equalizer.init();
	s3radio.init();
}
//------------------------------------------------------------------------------
s3radio.set_theme_color = function() {
	var theme_saturate = s3radio.utils.prefs_get('theme_saturate');
	var theme_hue_rotate = s3radio.utils.prefs_get('theme_hue_rotate');
	var theme_brightness = s3radio.utils.prefs_get('theme_brightness');
	var theme_contrast = s3radio.utils.prefs_get('theme_contrast');
	var theme_hue_rotate_invert = 360 - theme_hue_rotate;

	document.getElementById('div_body').style.filter = 'saturate(' + theme_saturate + '%) hue-rotate(' + theme_hue_rotate + 'deg) brightness(' + theme_brightness + '%) contrast(' + theme_contrast + '%)';
	document.getElementById('radio_player_site_url').style.filter = 'hue-rotate(' + (theme_hue_rotate_invert+11) + 'deg) saturate(35%)';
	document.getElementById('radio_search_select_country_list').style.filter = 'hue-rotate(' + theme_hue_rotate_invert + 'deg)';

	var x = document.getElementById('div_body').querySelectorAll("#radio_station_country");
	for (var i = 0; i < x.length; i++) {
		x[i].style.filter = 'hue-rotate(' + theme_hue_rotate_invert + 'deg)';
	}

	var x2 = document.getElementById('div_body').querySelectorAll(".country_region_list");
	for (var i = 0; i < x2.length; i++) {
		x2[i].style.filter = 'hue-rotate(' + theme_hue_rotate_invert + 'deg)';
	}
}
//------------------------------------------------------------------------------
s3radio.init = function() {
	//------------------------------------------------------------------------
	s3radio.current_radio = s3radio.utils.prefs_get('current_radio');

	s3radio.div_body_load_progress.style.width = '100%';
	s3radio.div_body_load_progress.setAttribute('is_hidden', true);
	document.getElementById('div_body_player').setAttribute('is_hidden', false);

	//------------------------------------------------------------------------
	s3radio.shuffle_enabled = s3radio.utils.prefs_get('shuffle_enabled');
	document.getElementById('radio_player_shuffle').setAttribute('shuffle_enabled', s3radio.shuffle_enabled);

	//------------------------------------------------------------------------
	s3radio.sleep_timer_enabled = s3radio.utils.prefs_get('sleep_timer_enabled');
	document.getElementById('radio_player_sleep_timer').setAttribute('sleep_timer_enabled', s3radio.sleep_timer_enabled);
	var sleep_timer_value = s3radio.utils.prefs_get('sleep_timer_value');
	s3radio.utils.HTMLDOM_value(
		document.getElementById('radio_player_sleep_timer_tooltip'), 
		s3radio.utils.get_string('sleep_timer_tooltip', [ s3radio.utils.calculate_text_time(sleep_timer_value*60) ])
	);

	//------------------------------------------------------------------------
	var radio_list_show = s3radio.utils.prefs_get('radio_list_show');
	document.getElementById('radio_search_input').setAttribute('placeholder', s3radio.utils.get_string('search_placeholder'));
	document.getElementById('radio_player_list').setAttribute('is_hidden', ! radio_list_show);
	document.getElementById('radio_list_box').setAttribute('is_hidden', ! radio_list_show);
	document.getElementById('radio_box_head').setAttribute('is_hidden', ! radio_list_show);
	document.getElementById('radio_player_list').setAttribute('title', s3radio.utils.get_string((radio_list_show) ? 'hide_list_radio_stations' : 'show_list_radio_stations'));

	//------------------------------------------------------------------------
	if (s3radio.current_radio && s3radio.current_radio.country) {
		s3radio.create_player();
	}

	//------------------------------------------------------------------------
	if (s3radio.utils.prefs_get('user_list_new_show')) {
		var station_id = s3radio.utils.prefs_get('user_list_new_station_id');
		document.getElementById('div_body_player').setAttribute('is_hidden', true);
		document.getElementById('div_body_user_list_new').setAttribute('is_hidden', false);
		document.getElementById('user_list_new_station_id').value = station_id;
		document.getElementById('user_list_new_station_name').value = s3radio.utils.prefs_get('user_list_new_station_name');
		document.getElementById('user_list_new_station_stream_url').value = s3radio.utils.prefs_get('user_list_new_stream_url');
		document.getElementById('user_list_new_station_website_url').value = s3radio.utils.prefs_get('user_list_new_website_url');
		document.getElementById('user_list_new_station_delete').setAttribute('not_show', station_id ? false : true);
		if (station_id) {
			s3radio.utils.HTMLDOM_value(document.getElementById('user_list_radio_stations_new_title'), s3radio.utils.get_string('user_list_radio_stations_edit'));
		}
		//------------------------------------------------------------------
		if (s3radio.utils.prefs_get('user_list_new_last') == 'stream_url') {
			document.getElementById('user_list_new_station_stream_url').focus();
		} else if (s3radio.utils.prefs_get('user_list_new_last') == 'website_url') {
			document.getElementById('user_list_new_station_website_url').focus();
		} else {
			document.getElementById('user_list_new_station_name').focus();
		}
		//------------------------------------------------------------------
		s3radio.user_list_station_new_check();
	}

	//------------------------------------------------------------------------
	var equalizer_open = s3radio.utils.prefs_get('equalizer_open');
	document.getElementById('radio_box_equalizer').setAttribute('is_hidden', ! equalizer_open);
	document.getElementById('radio_player_equalizer').setAttribute('is_equalizer', equalizer_open);
	document.getElementById('radio_player_equalizer').setAttribute('title', equalizer_open ? s3radio.utils.get_string('equalizer_button_hide') : s3radio.utils.get_string('equalizer_button_show'));

	//------------------------------------------------------------------------
	var search_text = s3radio.utils.prefs_get('search_text');
	document.getElementById('radio_search_input').value = search_text;
	s3radio.create_list_selector();

	//------------------------------------------------------------------------
}
//------------------------------------------------------------------------------
s3radio.create_list_selector = function() {
	s3radio.get_country_stations(s3radio.selected_country, function(){
		s3radio.create_list_selector_run();
	});
}
//------------------------------------------------------------------------------
s3radio.create_list_selector_run = function() {
	//------------------------------------------------------------------------
	s3radio.title_list_head_hide();
	//------------------------------------------------------------------------
	if (s3radio.utils.prefs_get('search_open')) {
		document.getElementById('radio_search_box').setAttribute('is_hidden', false);
		document.getElementById('radio_player_search').setAttribute('is_search', true);
		s3radio.create_list_by_search();
		document.getElementById('button_body_country_list_close').setAttribute('is_hidden', false);
	}
	else if (s3radio.selected_country == 'favorites') {
		s3radio.create_list_by_favorites();
		document.getElementById('radio_player_favorites').setAttribute("is_favorites", true);
		document.getElementById('button_body_country_list_close').setAttribute('is_hidden', false);
	}
	else if (s3radio.selected_country == 'user_list') {
		s3radio.create_list_by_user_list();
		document.getElementById('radio_player_user_list').setAttribute("is_user_list", true);
		document.getElementById('button_body_country_list_close').setAttribute('is_hidden', false);
	}
	else if (s3radio.selected_country && s3radio.stations[s3radio.selected_country]) {
		s3radio.create_list_by_country(s3radio.selected_country);
		document.getElementById('button_body_country_list_close').setAttribute('is_hidden', false);
	}
	else {
		document.getElementById('div_body_player').setAttribute('is_hidden', true);
		document.getElementById('div_body_country_list').setAttribute('is_hidden', false);
	}
}
//------------------------------------------------------------------------------
s3radio.create_list_by_favorites = function() {
	var favorites_list = s3radio.utils.prefs_get('favorites_list');
	var user_list = s3radio.utils.prefs_get('user_list');
	//------------------------------------------------------------------------
	s3radio.station_list = [];

	//------------------------------------------------------------------------
	for (var favorite_id in favorites_list) {
		//------------------------------------------------------------------
		var country_id = favorites_list[favorite_id].country;
		//------------------------------------------------------------------
		if (s3radio.stations[country_id]) {
			for (var i=0; i<s3radio.stations[country_id].length; i++) {
				var station = s3radio.utils.clone_object(s3radio.stations[country_id][i]);
				s3radio.utils.create_station_id(station, country_id);
				if (station.id == favorite_id) {
					station.order = favorites_list[favorite_id].order;
					station.gains = s3radio.equalizer.get_filters_by_radio_id(station.id);
					s3radio.station_list.push(station);
				}
			}
		}
		//------------------------------------------------------------------
		else {
			var user_station = s3radio.utils.check_is_user_list(favorite_id, user_list);
			if (user_station) {
				s3radio.utils.create_station_id(user_station);
				user_station.order = favorites_list[favorite_id].order;
				user_station.gains = s3radio.equalizer.get_filters_by_radio_id(user_station.id);
				s3radio.station_list.push(user_station);
			}
		}
	}

	//------------------------------------------------------------------------
	s3radio.station_list = s3radio.station_list.sort(function(a, b) {
		if (a.order > b.order) { return 1; }
		if (a.order < b.order) { return -1; }
		return 0;
	});

	//------------------------------------------------------------------------
	if (s3radio.shuffle_enabled) {
		chrome.runtime.sendMessage({ 'action_set_station_list' : true, 'station_list' : s3radio.station_list }, function(response) {});
	}
	//------------------------------------------------------------------------
	s3radio.title_list_head_hide();
	document.getElementById('favorite_list_head').setAttribute('is_hidden', false);
	//------------------------------------------------------------------------
	s3radio.create_list_elements();
}
//------------------------------------------------------------------------------
s3radio.create_list_elements = function(is_plus, is_direction_down) {
	var radio_list_box = document.getElementById('radio_list_box');
	var list_length = 200;

	//------------------------------------------------------------------------
	if (! is_plus) {
		radio_list_box.scrollTop = 0;
		while (radio_list_box.firstChild) {
			radio_list_box.removeChild(radio_list_box.firstChild);
		}
		radio_list_box.setAttribute('not_empty', s3radio.station_list.length);
 		radio_list_box.appendChild(document.createElement("div"));
		document.getElementById('radio_list_box_is_empty').setAttribute('not_empty', s3radio.station_list.length);
	}

	//------------------------------------------------------------------------
	var last_scrollTop = radio_list_box.scrollTop;
	var first_view_element = radio_list_box.firstChild;
	//------------------------------------------------------------------------
	while (last_scrollTop > 0) {
		last_scrollTop = last_scrollTop - first_view_element.clientHeight;
		if (first_view_element.nextSibling) {
			first_view_element = first_view_element.nextSibling;
		}
	}

	//------------------------------------------------------------------------
	var favorites_list = s3radio.utils.prefs_get('favorites_list');
	var started_radio = s3radio.utils.prefs_get('started_radio');
	var radio_station_box_sep = radio_list_box.firstChild;

	//------------------------------------------------------------------------
	if (is_plus) {
		if (is_direction_down) {
			radio_list_box.list_start = radio_list_box.list_end;
			radio_list_box.list_end = s3radio.station_list.length;
			if ((radio_list_box.list_end - radio_list_box.list_start) > list_length/2) {
				radio_list_box.list_end = radio_list_box.list_start + list_length/2;
			}
		} else {
			radio_list_box.list_end = radio_list_box.list_start;
			radio_list_box.list_start = radio_list_box.list_start - list_length/2;
			if (radio_list_box.list_start < 0) {
				radio_list_box.list_start = 0;
			}
		}
	}
	//------------------------------------------------------------------------
	else {
		var index_id = s3radio.station_list.findIndex(function(station){
			return (station.id == s3radio.current_radio.id) ? true : false;
		});
		radio_list_box.list_start = 0;
		radio_list_box.list_end = s3radio.station_list.length;

		if (radio_list_box.list_end > list_length) {
			if (index_id >= 0) {
				if ((index_id+list_length/2) > radio_list_box.list_end) {
					radio_list_box.list_start = radio_list_box.list_end - list_length;
				} else if ((index_id-list_length/2) < 0) {
					radio_list_box.list_end = list_length;
				} else {
					radio_list_box.list_start = index_id - list_length/2;
					radio_list_box.list_end = radio_list_box.list_start + list_length;
				}
				if (radio_list_box.list_start < 0) {
					radio_list_box.list_start = 0;
				}
				if (radio_list_box.list_end > s3radio.station_list.length) {
					radio_list_box.list_end = s3radio.station_list.length;
				}
			} else {
				radio_list_box.list_end = list_length;
			}
		}
	}

	//------------------------------------------------------------------------
	var new_element_count = 0;
	var search_open = s3radio.utils.prefs_get('search_open');

	//------------------------------------------------------------------------
	for (var i=radio_list_box.list_start; i<radio_list_box.list_end; i++) {
		var station = s3radio.station_list[i];
		//------------------------------------------------------------------
		if (document.getElementById('radio_list_' + station.id)) {
			continue;
		}
		//------------------------------------------------------------------
		var radio_list_template = document.getElementById('radio_list_template').cloneNode(true);
		var radio_station_box = s3radio.utils.get_element(radio_list_template, 'radio_station_box');

		//------------------------------------------------------------------
		if (((s3radio.selected_country == 'favorites') || (s3radio.selected_country == 'user_list')) && ! search_open) {
			s3radio.utils.get_element(radio_list_template, 'radio_station_order').setAttribute('is_hidden', false);
		} else {
			s3radio.utils.get_element(radio_list_template, 'radio_station_order').setAttribute('is_hidden', true);
		}
		//------------------------------------------------------------------
		if ((s3radio.selected_country == 'user_list') && ! search_open) {
			s3radio.utils.get_element(radio_list_template, 'radio_station_country').setAttribute('is_hidden', true);
			s3radio.utils.get_element(radio_list_template, 'radio_station_user_list_edit').setAttribute('is_hidden', false);
			s3radio.utils.get_element(radio_station_box, 'radio_station_user_list_edit').setAttribute('title', s3radio.utils.get_string('user_list_radio_stations_edit'));
		} else {
			s3radio.utils.get_element(radio_list_template, 'radio_station_country').setAttribute('is_hidden', false);
			s3radio.utils.get_element(radio_list_template, 'radio_station_user_list_edit').setAttribute('is_hidden', true);
		}

		//------------------------------------------------------------------
		radio_station_box.id = 'radio_list_' + station.id;

		//------------------------------------------------------------------
		s3radio.utils.HTMLDOM_value(s3radio.utils.get_element(radio_station_box, 'radio_station_name'), station.name);
		var radio_name = s3radio.utils.create_full_description(station);
		//------------------------------------------------------------------
		if (station.country == 'user_list') {
			s3radio.utils.get_element(radio_station_box, 'radio_station_name').setAttribute('title', radio_name);
			s3radio.utils.get_element(radio_station_box, 'radio_station_country').style.backgroundImage = 'url("/skin/' + s3radio.utils.get_theme_catalog() + '/button_user_list.png")';
			s3radio.utils.get_element(radio_station_box, 'radio_station_country').setAttribute('title', s3radio.utils.get_string('user_list_radio_stations'));
			s3radio.utils.get_element(radio_station_box, 'radio_station_country').setAttribute('is_user_list', true);
		} else {
			s3radio.utils.get_element(radio_station_box, 'radio_station_name').setAttribute('title', radio_name);
			s3radio.utils.get_element(radio_station_box, 'radio_station_country').style.backgroundImage = 'url("/skin/country/' + station.country + '.png")';
			s3radio.utils.get_element(radio_station_box, 'radio_station_country').setAttribute('title', s3radio.utils.get_country_name(station.country));
		}

		//------------------------------------------------------------------
		if (s3radio.current_radio.id == station.id) {
			s3radio.utils.get_element(radio_station_box, 'radio_station_play').setAttribute('started_radio', started_radio);
			radio_station_box.setAttribute('current_radio', true);
		} else {
			s3radio.utils.get_element(radio_station_box, 'radio_station_play').setAttribute('started_radio', 'pause');
			radio_station_box.setAttribute('current_radio', false);
		}

		//------------------------------------------------------------------
		s3radio.create_list_elements_favorites(radio_station_box, (favorites_list[station.id]) ? true : false);

		//------------------------------------------------------------------
		if (is_plus && ! is_direction_down) {
 			radio_list_box.insertBefore(radio_station_box, radio_station_box_sep);
		} else {
			radio_list_box.appendChild(radio_station_box);
		}
		//------------------------------------------------------------------
		if (is_plus && is_direction_down) {
			radio_list_box.removeChild(radio_list_box.firstChild);
		}
		else if (is_plus && ! is_direction_down) {
			if (radio_station_box_sep != radio_list_box.lastChild) {
				radio_list_box.removeChild(radio_list_box.lastChild);
			}
		}
		s3radio.create_list_events(radio_station_box, station);
		new_element_count++;
	}

	//------------------------------------------------------------------------
	if (is_plus) {
		if (! s3radio.stop_event_scroll) {
			if (new_element_count>0) {
				first_view_element.scrollIntoView();
			}
		}
	}
	//------------------------------------------------------------------------
	else {
		var radio_station_box = document.getElementById('radio_list_' + s3radio.current_radio.id);
		if (radio_station_box) {
			s3radio.stop_event_scroll = true;
			setTimeout(function(){
				s3radio.scrollIntoView(radio_station_box, 4);
				s3radio.stop_event_scroll = false;
			}, 100);
		} else {
			s3radio.stop_event_scroll = true;
			setTimeout(function(){
				radio_list_box.scrollTo(0, 0);
				s3radio.stop_event_scroll = false;
			}, 1);
		}
	}

	//------------------------------------------------------------------------
	s3radio.set_theme_color();
}
//------------------------------------------------------------------------------
s3radio.create_list_elements_favorites = function(radio_station_box, is_favorite) {
	if (is_favorite) {
		s3radio.utils.get_element(radio_station_box, 'radio_station_favorites').setAttribute('is_favorite', true);
		s3radio.utils.get_element(radio_station_box, 'radio_station_favorites').setAttribute('title', s3radio.utils.get_string('remove_from_favorites'));
	} else {
		s3radio.utils.get_element(radio_station_box, 'radio_station_favorites').setAttribute('is_favorite', false);
		s3radio.utils.get_element(radio_station_box, 'radio_station_favorites').setAttribute('title', s3radio.utils.get_string('add_to_favorites'));
	}
}
//------------------------------------------------------------------------------
s3radio.create_list_elements_plus = function(event) {
	var radio_list_box = document.getElementById('radio_list_box');
	if (! radio_list_box.last_scrollTop) { radio_list_box.last_scrollTop = radio_list_box.scrollTop; }

	var last_scrollTop = radio_list_box.last_scrollTop;
	var scrollTop = radio_list_box.scrollTop;
	var clientHeight = radio_list_box.clientHeight;
	var scrollHeight = radio_list_box.scrollHeight;
	radio_list_box.last_scrollTop = radio_list_box.scrollTop;

	if (scrollTop > last_scrollTop) {
		if ((scrollTop + clientHeight + 300) >= scrollHeight) {
			s3radio.create_list_elements(true, true);
		}
	} else if (scrollTop < last_scrollTop) {
		if (scrollTop < 200) {
			s3radio.create_list_elements(true, false);
		}
	}
}
//------------------------------------------------------------------------------
s3radio.create_list_events = function(radio_station_box, station) {
	radio_station_box.station = station;
	//------------------------------------------------------------------------
	s3radio.utils.get_element(radio_station_box, 'radio_station_name').addEventListener("dblclick", function(event) {
		if (s3radio.current_radio.id == station.id) {
			s3radio.current_radio = station;
			s3radio.radio_play();
		} else {
			s3radio.station_switch(station);
		}
	}, true);

	//------------------------------------------------------------------------
	s3radio.utils.get_element(radio_station_box, 'radio_station_name').addEventListener("touchstart", function(event) {
		radio_station_box.touch_station_id = station.id;
	}, true);
	//------------------------------------------------------------------------
	s3radio.utils.get_element(radio_station_box, 'radio_station_name').addEventListener("touchmove", function(event) {
		radio_station_box.touch_station_id = null;
	}, true);
	//------------------------------------------------------------------------
	s3radio.utils.get_element(radio_station_box, 'radio_station_name').addEventListener("touchend", function(event) {
		if (radio_station_box.touch_station_id == station.id) {
			if (s3radio.current_radio.id == station.id) {
				s3radio.current_radio = station;
				s3radio.radio_play();
			} else {
				s3radio.station_switch(station);
			}
		}
	}, true);

	//------------------------------------------------------------------------
	s3radio.utils.get_element(radio_station_box, 'radio_station_play').addEventListener("click", function(event) {
		if (s3radio.current_radio.id == station.id) {
			s3radio.current_radio = station;
			s3radio.radio_play();
		} else {
			s3radio.station_switch(station);
		}
	}, true);

	//------------------------------------------------------------------------
	s3radio.utils.get_element(radio_station_box, 'radio_station_favorites').addEventListener("click", function(event) {
		var favorites_list = s3radio.utils.prefs_get('favorites_list');
		var is_deleted = false;
		if (favorites_list[station.id]) {
			delete favorites_list[station.id];
			is_deleted = true;
		} else {
			favorites_list[station.id] = { 'country' : station.country, 'order' : (new Date()).getTime() };
		}
		s3radio.pref_save('favorites_list', favorites_list, function(){
			var radio_station_box = document.getElementById('radio_list_' + station.id);
			if (radio_station_box) {
				s3radio.create_list_elements_favorites(radio_station_box, (favorites_list[station.id]) ? true : false);
			}
			if (s3radio.current_radio.id == station.id) {
				s3radio.create_player_favorites((favorites_list[station.id]) ? true : false);
			}
			if (is_deleted) {
				if (favorites_list[s3radio.current_radio.id] && favorites_list[s3radio.current_radio.id].equalizer_filters) {
					s3radio.equalizer.create_presets('preset_' + s3radio.current_radio.id);
				} else {
					s3radio.equalizer.create_presets();
				}
			}
		});
	}, true);

	//------------------------------------------------------------------------
	s3radio.utils.get_element(radio_station_box, 'radio_station_country').addEventListener("click", function(event) {
		if (s3radio.utils.prefs_get('search_open')) {
			s3radio.pref_save('search_country', station.country, function(){
				s3radio.make_search_country_current();
				s3radio.create_list_selector();
			});
		} else {
			s3radio.selected_country = station.country;
			s3radio.pref_save('selected_country', s3radio.selected_country, function(){
			s3radio.create_list_selector();
			});
		}
	});

	//------------------------------------------------------------------------
	s3radio.utils.get_element(radio_station_box, 'radio_station_user_list_edit').addEventListener("click", function(event) {
		document.getElementById('div_body_player').setAttribute('is_hidden', true);
		document.getElementById('div_body_user_list_new').setAttribute('is_hidden', false);
		document.getElementById('user_list_new_station_name').value = station.name;
		document.getElementById('user_list_new_station_stream_url').value = station.radio_url;
		document.getElementById('user_list_new_station_website_url').value = station.site_url;
		document.getElementById('user_list_new_station_id').value = station.id;
		document.getElementById('user_list_new_station_name').focus();
		document.getElementById('user_list_new_station_delete').setAttribute('not_show', false);
		s3radio.pref_save('user_list_new_show', true);
		s3radio.pref_save('user_list_new_station_id', station.id);
		s3radio.pref_save('user_list_new_station_name', station.name);
		s3radio.pref_save('user_list_new_stream_url', station.radio_url);
		s3radio.pref_save('user_list_new_website_url', station.site_url);
		s3radio.pref_save('user_list_new_last', 'station_name');

		document.getElementById('user_list_new_station_delete').removeAttribute('is_confirm');
		s3radio.utils.HTMLDOM_value(document.getElementById('user_list_new_station_delete'), s3radio.utils.get_string('user_list_radio_stations_new_delete'));
		s3radio.utils.HTMLDOM_value(document.getElementById('user_list_radio_stations_new_title'), s3radio.utils.get_string('user_list_radio_stations_edit'));
		//------------------------------------------------------------------
		s3radio.user_list_station_new_check();
	});

	//------------------------------------------------------------------------
	//------------------------------------------------------------------------
	s3radio.utils.get_element(radio_station_box, 'radio_station_order').addEventListener("dragstart", function(event) {
		s3radio.draggable = {
			'start_element' : radio_station_box,
			'movement_y' : 'still',
			'client_y' :  event.clientY,
			'timeout_id' : {}
		};
		event.dataTransfer.setData('text/plain', ''); // for fix Firefox gluches...
		event.dataTransfer.setDragImage(radio_station_box, 340, 10);
		event.dataTransfer.effectAllowed = "move";
	}, true);
	//------------------------------------------------------------------------
	s3radio.utils.get_element(radio_station_box, 'radio_station_order').addEventListener("dragend", function(event) {
		radio_station_box.removeAttribute('drag_start');
	}, true);
	//------------------------------------------------------------------------
	radio_station_box.addEventListener("dragover", function(event) {
		if (s3radio.draggable == null) { return false; }
		if (s3radio.draggable.start_element == radio_station_box) { return false; }

		//------------------------------------------------------------------
		s3radio.draggable.start_element.setAttribute('drag_start', true);

		//------------------------------------------------------------------
		if (s3radio.draggable.timeout_id[radio_station_box.id]) {
			clearTimeout(s3radio.draggable.timeout_id[radio_station_box.id]);
		}

		//------------------------------------------------------------------
		if ((event.clientY-3) > s3radio.draggable.client_y) {
			s3radio.draggable.movement_y = 'down';
			s3radio.draggable.client_y = event.clientY;
		} else if ((event.clientY+3) < s3radio.draggable.client_y) {
			s3radio.draggable.movement_y = 'up';
			s3radio.draggable.client_y = event.clientY;
		}

		//------------------------------------------------------------------
		setTimeout(function() { 
			radio_station_box.setAttribute('drag_over', true);
			radio_station_box.setAttribute('drag_movement_y', (s3radio.draggable) ? s3radio.draggable.movement_y : 0);
		}, 50);
		//------------------------------------------------------------------
		event.preventDefault();
	}, true);
	//------------------------------------------------------------------------
	radio_station_box.addEventListener("dragleave", function(event) {
		s3radio.draggable.timeout_id[radio_station_box.id] = setTimeout(function() { 
			radio_station_box.removeAttribute('drag_over');
		}, 50);
	}, true);
	//------------------------------------------------------------------------
	radio_station_box.addEventListener("drop", function(event) {
		var station_list = null;
		//------------------------------------------------------------------
		if (s3radio.selected_country == 'favorites') {
			var favorites_list = s3radio.utils.prefs_get('favorites_list');
			if (favorites_list[radio_station_box.station.id] && favorites_list[s3radio.draggable.start_element.station.id]) {
				station_list = favorites_list;
			}
		}
		//------------------------------------------------------------------
		else if (s3radio.selected_country == 'user_list') {
			var user_list = s3radio.utils.prefs_get('user_list');
			if (s3radio.utils.check_is_user_list(radio_station_box.station.id, user_list) && s3radio.utils.check_is_user_list(s3radio.draggable.start_element.station.id, user_list)) {
				station_list = user_list;
			}
		}
		//------------------------------------------------------------------
		if (station_list) {
			var start_id = s3radio.station_list.findIndex(function(station){
				return (station.id == s3radio.draggable.start_element.station.id) ? true : false;
			});
			var removed = s3radio.station_list.splice(start_id, 1);
			//------------------------------------------------------------
			var drop_id = s3radio.station_list.findIndex(function(station){
				return (station.id == radio_station_box.station.id) ? true : false;
			});
			if (s3radio.draggable.movement_y == 'down') {
				s3radio.station_list.splice(drop_id+1, 0, removed[0]);
			} else {
				s3radio.station_list.splice(drop_id, 0, removed[0]);
			}

			//------------------------------------------------------------
			for (var i=0; i<s3radio.station_list.length; i++) {
				var station = s3radio.station_list[i];
				station.order = i+1;
				if (station_list[station.id]) {
					station_list[station.id].order = i+1;
				}
				station.gains = s3radio.equalizer.get_filters_by_radio_id(station.id);
			}
			//------------------------------------------------------------
			if (s3radio.selected_country == 'favorites') {
				s3radio.pref_save('favorites_list', station_list);
			}
			//------------------------------------------------------------
			else if (s3radio.selected_country == 'user_list') {
				s3radio.pref_save('user_list', user_list);
			}
			//------------------------------------------------------------
			s3radio.pref_save('prev_radio', []);
			s3radio.pref_save('next_radio', []);
			//------------------------------------------------------------
			if (s3radio.shuffle_enabled) {
				chrome.runtime.sendMessage({ 'action_set_station_list' : true, 'station_list' : s3radio.station_list }, function(response) {});
			}
			//------------------------------------------------------------
			s3radio.create_list_elements();
		}

		radio_station_box.removeAttribute('drag_over');
		s3radio.draggable = null;
		event.preventDefault();
	}, true);
}
//------------------------------------------------------------------------------
s3radio.scrollIntoView = function(node, count) {
	while (node.previousSibling && count > 0) {
		node = node.previousSibling;
		count--;
	}
	node.scrollIntoView();
}
//------------------------------------------------------------------------------
s3radio.window_close = function() {
	setTimeout(function(){ 
		try {
			window.close(); 
		} catch(e) {};
	}, 5);
}
//------------------------------------------------------------------------------
s3radio.pref_save = function(pref_name, pref_value, callback) {
	chrome.runtime.sendMessage({ 'action_prefs_set': true, 'pref_name' : pref_name, 'pref_value': pref_value }, function(response) {
		if (callback) {
			callback();
		}
	});
	s3radio.utils.prefs_set(pref_name, pref_value);

	//------------------------------------------------------------------------
	if (pref_name == 'selected_country') {
		//------------------------------------------------------------------
		document.getElementById('radio_player_favorites').setAttribute("is_favorites", (pref_value == 'favorites') ? true : false);
		document.getElementById('radio_player_user_list').setAttribute("is_user_list", (pref_value == 'user_list') ? true : false);

		//------------------------------------------------------------------
		chrome.runtime.sendMessage({ 'action_prefs_set': true, 'pref_name' : 'search_open', 'pref_value': false }, function(response) {});
		s3radio.utils.prefs_set('search_open', false);
		document.getElementById('radio_search_box').setAttribute('is_hidden', true);
		document.getElementById('radio_player_search').setAttribute('is_search', false);

		//------------------------------------------------------------------
		chrome.runtime.sendMessage({ 'action_prefs_set': true, 'pref_name' : 'radio_list_show', 'pref_value': true }, function(response) {});
		s3radio.utils.prefs_set('radio_list_show', true);
		document.getElementById('radio_player_list').setAttribute('is_hidden', false);
		document.getElementById('radio_list_box').setAttribute('is_hidden', false);
		document.getElementById('radio_box_head').setAttribute('is_hidden', false);
		document.getElementById('radio_player_list').setAttribute('title', s3radio.utils.get_string('hide_list_radio_stations'));

		//------------------------------------------------------------------
		if ((pref_value != 'favorites') && (pref_value != 'user_list')) {
			chrome.runtime.sendMessage({ 'action_prefs_set': true, 'pref_name' : 'last_normal_selected_country', 'pref_value': pref_value }, function(response) {
				s3radio.utils.prefs_set('last_normal_selected_country', pref_value);
			});
		}
	}
	//------------------------------------------------------------------------
	else if (pref_name == 'search_open') {
		document.getElementById('radio_player_favorites').setAttribute("is_favorites", false);
		document.getElementById('radio_player_user_list').setAttribute("is_user_list", false);
		//------------------------------------------------------------------
		chrome.runtime.sendMessage({ 'action_prefs_set': true, 'pref_name' : 'radio_list_show', 'pref_value': true }, function(response) {});
		s3radio.utils.prefs_set('radio_list_show', true);
		document.getElementById('radio_player_list').setAttribute('is_hidden', false);
		document.getElementById('radio_list_box').setAttribute('is_hidden', false);
		document.getElementById('radio_box_head').setAttribute('is_hidden', false);
		document.getElementById('radio_player_list').setAttribute('title', s3radio.utils.get_string('hide_list_radio_stations'));
	}
}
//------------------------------------------------------------------------------
chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		//------------------------------------------------------------------
		if (! request) { return; }

		//------------------------------------------------------------------
		if (request.action_started_radio) {
			s3radio.utils.prefs_set('started_radio', request.action_started_radio);
			s3radio.create_player();
		}
		//------------------------------------------------------------------
		else if (request.action_update_radio) {
			s3radio.prefs.list = request.prefs_list;
			s3radio.init();
		}
		//------------------------------------------------------------------
		else if (request.action_sleep_timer_process) {
			s3radio.utils.HTMLDOM_value(
				document.getElementById('radio_player_sleep_timer_tooltip'), 
				s3radio.utils.get_string('sleep_timer_tooltip', [ s3radio.utils.calculate_text_time(request.sleep_timer_value) ])
			);
		}
		//------------------------------------------------------------------
		else if (request.action_sleep_timer_finish) {
			s3radio.sleep_timer_enabled = false;
			document.getElementById('radio_player_sleep_timer').setAttribute('sleep_timer_enabled', s3radio.sleep_timer_enabled);
			var sleep_timer_value = s3radio.utils.prefs_get('sleep_timer_value');
			s3radio.utils.HTMLDOM_value(
				document.getElementById('radio_player_sleep_timer_tooltip'), 
				s3radio.utils.get_string('sleep_timer_tooltip', [ s3radio.utils.calculate_text_time(sleep_timer_value*60) ])
			);
		}
		//------------------------------------------------------------------
		sendResponse({ 'success' : false });
	}
);
//------------------------------------------------------------------------------
window.addEventListener("load", s3radio.init_0);
