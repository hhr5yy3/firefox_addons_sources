//------------------------------------------------------------------------------
s3radio.create_list_by_user_list = function() {
	var user_list = s3radio.utils.prefs_get('user_list');
	s3radio.station_list = [];

	//------------------------------------------------------------------------
	for (var user_list_id in user_list) {
		var user_station = user_list[user_list_id];
		var station = s3radio.utils.clone_object(user_station);
		s3radio.utils.create_station_id(station);
		station.gains = s3radio.equalizer.get_filters_by_radio_id(station.id);
		s3radio.station_list.push(station);
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
	document.getElementById('user_list_head').setAttribute('is_hidden', false);
	//------------------------------------------------------------------------
	s3radio.create_list_elements();
}
//------------------------------------------------------------------------------
s3radio.user_list_station_new_set = function(event) {
	s3radio.pref_save('user_list_new_station_name', document.getElementById('user_list_new_station_name').value);
	s3radio.pref_save('user_list_new_stream_url', document.getElementById('user_list_new_station_stream_url').value);
	s3radio.pref_save('user_list_new_website_url', document.getElementById('user_list_new_station_website_url').value);
	s3radio.pref_save('user_list_new_last', (event.target.id == 'user_list_new_station_stream_url') ? 'stream_url' : (event.target.id == 'user_list_new_station_website_url') ? 'website_url' : 'station_name');
	s3radio.user_list_station_new_check();
}
//------------------------------------------------------------------------------
s3radio.user_list_station_new_close = function(event) {
	document.getElementById('div_body_player').setAttribute('is_hidden', false);
	document.getElementById('div_body_user_list_new').setAttribute('is_hidden', true);
	document.getElementById('user_list_new_station_id').value = '';
	document.getElementById('user_list_new_station_name').value = '';
	document.getElementById('user_list_new_station_stream_url').value = '';
	document.getElementById('user_list_new_station_website_url').value = '';
	document.getElementById('user_list_new_station_delete').setAttribute('not_show', true);
	s3radio.pref_save('user_list_new_show', false);
}
//------------------------------------------------------------------------------
s3radio.user_list_station_new_check = function() {
	var station_name = document.getElementById('user_list_new_station_name').value;
	var stream_url = document.getElementById('user_list_new_station_stream_url').value;
	var website_url = document.getElementById('user_list_new_station_website_url').value;
	//------------------------------------------------------------------
	document.getElementById('user_list_new_station_name').setAttribute('is_error', false);
	document.getElementById('user_list_new_station_stream_url').setAttribute('is_error', false);
	document.getElementById('user_list_new_station_website_url').setAttribute('is_error', false);
	document.getElementById('user_list_new_station_save').removeAttribute('disabled');

	//------------------------------------------------------------------
	var is_ok = true;
	//------------------------------------------------------------------
	if (station_name.trim() == '') {
		is_ok = false;
		document.getElementById('user_list_new_station_name').setAttribute('is_error', true);
	}
	//------------------------------------------------------------------
	if (! /^https?\:\/\/.+/.test(stream_url.trim())) {
		is_ok = false;
		document.getElementById('user_list_new_station_stream_url').setAttribute('is_error', true);
	}
	//------------------------------------------------------------------
	if (website_url && (! /^https?\:\/\/.+/.test(website_url.trim()))) {
		is_ok = false;
		document.getElementById('user_list_new_station_website_url').setAttribute('is_error', true);
	}
	//------------------------------------------------------------------
	document.getElementById('user_list_new_station_name').value = station_name;
	document.getElementById('user_list_new_station_stream_url').value = stream_url;
	document.getElementById('user_list_new_station_website_url').value = website_url;

	//------------------------------------------------------------------
	if (! is_ok) {
		document.getElementById('user_list_new_station_save').setAttribute('disabled', true);
	}
	//------------------------------------------------------------------
	return is_ok;
}
//------------------------------------------------------------------------------
s3radio.user_list_new_station_save = function(event) {
	try {
		event.preventDefault();
		event.stopPropagation();
	} catch(e) {
	}

	if (s3radio.user_list_station_new_check()) {
		var station_name = document.getElementById('user_list_new_station_name').value.trim();
		var stream_url = document.getElementById('user_list_new_station_stream_url').value.trim();
		var website_url = document.getElementById('user_list_new_station_website_url').value.trim();
		var station_id = document.getElementById('user_list_new_station_id').value;

		var user_list = s3radio.utils.prefs_get('user_list');
		var order = 0;
		//------------------------------------------------------------------
		if (station_id && user_list[station_id]) {
			order = user_list[station_id].order;
		} else {
			station_id = 'user_list.user_list_' + s3radio.utils.random_string(16);
		}
		//------------------------------------------------------------------
		user_list[station_id] = {
			"name" : station_name,
			"image" : station_id.replace(/^user_list\./, ''),
			"site_url" : website_url,
			"radio_url" : stream_url,
			"description" : null,
			"country" : 'user_list',
			"order" : order
		};
		//------------------------------------------------------------------
		s3radio.pref_save('user_list', user_list, function(){
			s3radio.user_list_station_new_close();
			s3radio.create_list_selector();
			if (s3radio.current_radio.id == station_id) {
				s3radio.current_radio = user_list[station_id];
				s3radio.current_radio.id = station_id;
				s3radio.create_player();
				s3radio.pref_save('current_radio', s3radio.current_radio);
			}
		});
	}
}
//------------------------------------------------------------------------------
s3radio.user_list_new_station_delete = function(event) {
	//------------------------------------------------------------------------
	if (document.getElementById('user_list_new_station_delete').hasAttribute('is_confirm')) {
		var station_id = document.getElementById('user_list_new_station_id').value;
		var user_list = s3radio.utils.prefs_get('user_list');
		//------------------------------------------------------------------
		if (station_id && user_list[station_id]) {
			delete user_list[station_id];
			//------------------------------------------------------------
			var favorites_list = s3radio.utils.prefs_get('favorites_list');
			if (favorites_list[station_id]) {
				delete favorites_list[station_id];
				s3radio.pref_save('favorites_list', favorites_list);
			}
			s3radio.pref_save('user_list', user_list, function(){
				s3radio.create_list_selector();
			});
		}
		s3radio.user_list_station_new_close();
		s3radio.create_player();
	}
	//------------------------------------------------------------------------
	else {
		document.getElementById('user_list_new_station_delete').setAttribute('is_confirm', true);
		s3radio.utils.HTMLDOM_value(document.getElementById('user_list_new_station_delete'), s3radio.utils.get_string('confirm_delete'));
	}
}
//------------------------------------------------------------------------------

