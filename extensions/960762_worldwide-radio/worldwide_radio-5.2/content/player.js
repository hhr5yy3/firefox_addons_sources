//------------------------------------------------------------------------------
s3radio.create_player = function() {
	var radio_name = s3radio.utils.create_full_description(s3radio.current_radio);
	var started_radio = s3radio.utils.prefs_get('started_radio');

	//------------------------------------------------------------------------
	s3radio.utils.HTMLDOM_value(document.getElementById('radio_player_name'), s3radio.current_radio.name);
	document.getElementById('radio_player_name').setAttribute('title', radio_name);
	//------------------------------------------------------------------------
	if (s3radio.current_radio.site_url) {
		document.getElementById('radio_player_name').setAttribute('href', s3radio.current_radio.site_url);
	} else {
		document.getElementById('radio_player_name').removeAttribute('href');
	}

	//------------------------------------------------------------------------
	document.getElementById('radio_player_control_play').setAttribute('started_radio', started_radio);
	if (s3radio.current_radio.site_url) {
		document.getElementById('radio_player_site_url').setAttribute('href', s3radio.current_radio.site_url);
	} else {
		document.getElementById('radio_player_site_url').removeAttribute('href');
	}
	document.getElementById('radio_player_country').setAttribute('title', s3radio.utils.get_country_name(s3radio.current_radio.country));
	//------------------------------------------------------------------------
	if (s3radio.current_radio.country == 'user_list') {
		document.getElementById('radio_player_image').setAttribute('title', radio_name);
		document.getElementById('radio_player_image').setAttribute('alt', radio_name);
		document.getElementById('radio_player_image').src = '/skin/station_user_list.png';
		document.getElementById('radio_player_country').src = '/skin/' + s3radio.utils.get_theme_catalog() + '/button_user_list.png';
	} else {
		document.getElementById('radio_player_image').setAttribute('title', radio_name);
		document.getElementById('radio_player_image').setAttribute('alt', radio_name);
		document.getElementById('radio_player_image').src = s3radio.main_url + s3radio.current_radio.image;
		document.getElementById('radio_player_country').src = '/skin/country/'  + s3radio.current_radio.country + '.png';
//		document.getElementById('radio_player_country_list').style.backgroundImage = 'url("/skin/country/' + s3radio.current_radio.country + '.png")';
	}

	//------------------------------------------------------------------------
	document.getElementById('radio_player_trackid').setAttribute('is_hidden', true);
	document.getElementById('radio_player_trackid_wait').setAttribute('is_hidden', true);
	document.getElementById('radio_player_control_play').setAttribute('trackid_is_hide', true);
	//------------------------------------------------------------------------
	if (s3radio.trackid_info_timer) {
		clearTimeout(s3radio.trackid_info_timer);
	}
	if (started_radio == 'play') {
		document.getElementById('radio_player_trackid_wait').setAttribute('is_hidden', false);
		s3radio.get_trackid();
	}

	//------------------------------------------------------------------------
	var radio_station_box = document.getElementById('radio_list_' + s3radio.current_radio.id);
	if (radio_station_box) {
		s3radio.utils.get_element(radio_station_box, 'radio_station_play').setAttribute('started_radio', started_radio);
//		radio_station_box.scrollIntoView();
	}

	//------------------------------------------------------------------------
	var favorites_list = s3radio.utils.prefs_get('favorites_list');
	s3radio.create_player_favorites((favorites_list[s3radio.current_radio.id]) ? true : false);
	//------------------------------------------------------------------------
	if (favorites_list[s3radio.current_radio.id] && favorites_list[s3radio.current_radio.id].equalizer_filters) {
		s3radio.equalizer.create_presets('preset_' + s3radio.current_radio.id);
	} else {
		s3radio.equalizer.create_presets();
	}

	//------------------------------------------------------------------------
	document.getElementById('radio_player_control_volume').value = s3radio.utils.prefs_get('volume_value');
	s3radio.volume_value();
}
//------------------------------------------------------------------------------
s3radio.create_player_favorites = function(is_favorite) {
	if (is_favorite) {
		document.getElementById('radio_player_station_favorites').setAttribute('is_favorite', true);
		document.getElementById('radio_player_station_favorites').setAttribute('title', s3radio.utils.get_string('remove_from_favorites'));
	} else {
		document.getElementById('radio_player_station_favorites').setAttribute('is_favorite', false);
		document.getElementById('radio_player_station_favorites').setAttribute('title', s3radio.utils.get_string('add_to_favorites'));
	}
}
//------------------------------------------------------------------------------
s3radio.get_trackid = function() {
	fetch(s3radio.main_url + '/extension/trackid/' + s3radio.current_radio.id + '.json').then(function(response) {
		return response.json();
	}).then(function(trackid_info) {
		if (trackid_info && trackid_info.radio_id == s3radio.current_radio.id) {
			if (s3radio.utils.prefs_get('started_radio') == 'play') {
				s3radio.create_trackid(trackid_info);
			}
		}
		document.getElementById('radio_player_trackid_wait').setAttribute('is_hidden', true);
	}).catch(function(error) {
		document.getElementById('radio_player_trackid_wait').setAttribute('is_hidden', true);
	});
}
//------------------------------------------------------------------------------
s3radio.create_trackid = function(trackid_info) {
	document.getElementById('radio_player_trackid').setAttribute('is_hidden', false);
	document.getElementById('radio_player_control_play').setAttribute('trackid_is_hide', false);

	s3radio.utils.HTMLDOM_value(document.getElementById('radio_player_trackid_link'), trackid_info.text);
	document.getElementById('radio_player_trackid_link').setAttribute('href', trackid_info.link);
	document.getElementById('radio_player_trackid_link').setAttribute('title', trackid_info.text);
	s3radio.trackid_info_timer = setTimeout(function(){
		s3radio.get_trackid();
	}, 1000*10);
}
//------------------------------------------------------------------------------
s3radio.station_switch = function(station, no_history) {
	//------------------------------------------------------------------------
	var radio_station_box = document.getElementById('radio_list_' + s3radio.current_radio.id);
	if (radio_station_box) {
		radio_station_box.setAttribute('current_radio', false);
		s3radio.utils.get_element(radio_station_box, 'radio_station_play').setAttribute('started_radio', 'pause');
	}
	//------------------------------------------------------------------------
	if (! no_history) {
		s3radio.pref_save('prev_radio', s3radio.utils.set_prev_radio(s3radio.current_radio));
		s3radio.pref_save('next_radio', []);
	}
	//------------------------------------------------------------------------
	s3radio.current_radio = station;
//	s3radio.pref_save('current_radio', s3radio.current_radio);
	s3radio.pref_save('started_radio', 'pause', function(){
		s3radio.radio_play();
	});
	//------------------------------------------------------------------------
	var radio_station_box = document.getElementById('radio_list_' + s3radio.current_radio.id);
	if (radio_station_box) {
		radio_station_box.setAttribute('current_radio', true);
	}
}
//------------------------------------------------------------------------------
s3radio.radio_play = function() {
	var started_radio = s3radio.utils.prefs_get('started_radio');
	started_radio = (started_radio == 'pause') ? 'wait' : 'pause';
	s3radio.pref_save('started_radio', started_radio, function(){
		var radio_name = s3radio.current_radio.name + ' (' + s3radio.utils.get_country_name(s3radio.current_radio.country) + ')';
		chrome.runtime.sendMessage({ 'action_radio_play' : true, 'current_radio' : s3radio.current_radio, 'radio_name' : radio_name, 'started_radio' : started_radio }, function(response) { });
		s3radio.create_player();
	});
	s3radio.pref_save('current_radio', s3radio.current_radio);
}
//------------------------------------------------------------------------------
s3radio.radio_station_prev_next = function(is_next) {
	var current_id = -1;

	//------------------------------------------------------------------------
	for (var i=0; i<s3radio.station_list.length; i++) {
		var station = s3radio.station_list[i];
		if (s3radio.current_radio.id == station.id) {
			current_id = i;
			break;
		}
	}

	//------------------------------------------------------------------------
	if (is_next) {
		var next_radio_list = s3radio.utils.prefs_get('next_radio');
		var next_radio = next_radio_list.pop();
		var index_id = -1;
		//------------------------------------------------------------------
		if (next_radio) {
			index_id = s3radio.station_list.findIndex(function(station){
				return (station.id == next_radio.id) ? true : false;
			});
		}
		//------------------------------------------------------------------
		if (index_id >= 0) {
			current_id = index_id;
		} else {
			current_id++;
			if (current_id >= s3radio.station_list.length) {
				current_id = 0;
			}
		}
		//------------------------------------------------------------------
		s3radio.pref_save('prev_radio', s3radio.utils.set_prev_radio(s3radio.current_radio));
		s3radio.pref_save('next_radio', next_radio_list);
	}
	//------------------------------------------------------------------------
	else {
		var prev_radio_list = s3radio.utils.prefs_get('prev_radio');
		var prev_radio = prev_radio_list.pop();
		var index_id = -1;
		//------------------------------------------------------------------
		if (prev_radio) {
			index_id = s3radio.station_list.findIndex(function(station){
				return (station.id == prev_radio.id) ? true : false;
			});
		}
		//------------------------------------------------------------------
		if (index_id >= 0) {
			current_id = index_id;
		} else {
			current_id--;
			if (current_id < 0) {
				current_id = s3radio.station_list.length - 1;
			}
		}
		//------------------------------------------------------------------
		s3radio.pref_save('prev_radio', prev_radio_list);
		s3radio.pref_save('next_radio', s3radio.utils.set_next_radio(s3radio.current_radio));
	}

	//------------------------------------------------------------------------
	if (s3radio.station_list[current_id]) {
		s3radio.station_switch(s3radio.station_list[current_id], true);
		//------------------------------------------------------------------
		var radio_station_box = document.getElementById('radio_list_' + s3radio.current_radio.id);
		if (radio_station_box) {
			s3radio.stop_event_scroll = true;
			s3radio.scrollIntoView(radio_station_box, 4);
			setTimeout(function(){
				s3radio.scrollIntoView(radio_station_box, 4);
				s3radio.stop_event_scroll = false;
			}, 100);
		} else {
			s3radio.create_list_elements();
		}
	}
}
//------------------------------------------------------------------------------
s3radio.radio_station_random = function() {
	var current_id = Math.floor(Math.random() * s3radio.station_list.length);
	s3radio.station_switch(s3radio.station_list[current_id]);

	s3radio.create_list_elements();
}
//------------------------------------------------------------------------------
s3radio.radio_station_shuffle = function() {
	//------------------------------------------------------------------------
	if (s3radio.shuffle_enabled) {
		for (var i=0; i<s3radio.station_list.length; i++) {
			var station = s3radio.station_list[i];
			s3radio.utils.create_station_id(station, station.country);
			station.gains = s3radio.equalizer.get_filters_by_radio_id(station.id);
		}
	}
	//------------------------------------------------------------------------
	chrome.runtime.sendMessage({ 'action_shuffle_enabled' : true, 'is_enabled' : s3radio.shuffle_enabled, 'station_list' : s3radio.station_list }, function(response) {
		document.getElementById('radio_player_shuffle').setAttribute('shuffle_enabled', s3radio.shuffle_enabled);
	});
}
//------------------------------------------------------------------------------
s3radio.radio_player_sleep_timer = function() {
	s3radio.sleep_timer_enabled = ! s3radio.sleep_timer_enabled;
	chrome.runtime.sendMessage({ 'action_sleep_timer_enabled' : true, 'is_enabled' : s3radio.sleep_timer_enabled }, function(response) {
		document.getElementById('radio_player_sleep_timer').setAttribute('sleep_timer_enabled', s3radio.sleep_timer_enabled);
	});
}
//------------------------------------------------------------------------------
s3radio.volume_value = function() {
	var volume_value = document.getElementById('radio_player_control_volume').value;
	var volume_value_img = 0;
	if ((volume_value > 0) && (volume_value <= 33)) {
		volume_value_img = 1;
	}
	else if ((volume_value > 33) && (volume_value <= 80)) {
		volume_value_img = 2;
	}
	else if (volume_value > 80) {
		volume_value_img = 3;
	}
	document.getElementById('radio_player_control_sound').setAttribute('volume', volume_value_img);
	document.getElementById('radio_player_control_sound').setAttribute('title', volume_value + '%');
	document.getElementById('radio_player_control_volume').setAttribute('title', volume_value + '%');
}
//------------------------------------------------------------------------------
s3radio.title_list_head_hide = function() {
	document.getElementById('country_list_head').setAttribute('is_hidden', true);
	document.getElementById('favorite_list_head').setAttribute('is_hidden', true);
	document.getElementById('search_list_head').setAttribute('is_hidden', true);
	document.getElementById('user_list_head').setAttribute('is_hidden', true);
}
//------------------------------------------------------------------------------

