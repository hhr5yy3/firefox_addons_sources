//------------------------------------------------------------------------------
s3radio.create_list_by_search = function() {
	var search_country = s3radio.utils.prefs_get('search_country') || 'DDD';

	s3radio.get_country_stations(search_country, function(){
		s3radio.create_list_by_search_run(search_country);
	});

	if (s3radio.load_search_country) {
//		s3radio.create_list_by_search_run(search_country);
	} else {
		s3radio.load_search_country = true;

		s3radio.load_search_lists = 0;
		for (var country_id in s3radio.country_list) {
			if (! s3radio.stations[country_id]) {
				s3radio.load_search_lists++;
				s3radio.create_list_by_search_add(country_id, search_country);
			}
		}
	}
}
//------------------------------------------------------------------------------
s3radio.create_list_by_search_add = function(country_id, search_country) {
	setTimeout(function(){
		s3radio.get_country_stations(country_id, function(){
			s3radio.load_search_lists--;
			if (s3radio.load_search_lists <= 0) {
				s3radio.load_search_country = false;
				s3radio.create_list_by_search_run(search_country);
			}
		});
	}, 1);
}
//------------------------------------------------------------------------------
s3radio.create_list_by_search_run = function(search_country) {
	var search_text = s3radio.utils.prefs_get('search_text');
	//------------------------------------------------------------------------
//	var search_country = s3radio.utils.prefs_get('search_country') || 'DDD';
	var user_list = s3radio.utils.prefs_get('user_list');
	var stations_list = s3radio.utils.merge_user_list(s3radio.stations, user_list);

	//------------------------------------------------------------------------
	if (! stations_list[search_country]) { search_country = ''; }

	s3radio.station_list = [];
	//------------------------------------------------------------------------
	for (var country_id in stations_list) {
		if ((country_id == search_country) || (search_country == '')) {
			for (var i=0; i<stations_list[country_id].length; i++) {
//				var station = s3radio.utils.clone_object(stations_list[country_id][i]);
				var station = stations_list[country_id][i];
				s3radio.utils.create_station_id(station, country_id);
				if (station.name.toLocaleLowerCase().indexOf(search_text.toLocaleLowerCase()) >= 0) {
					station.gains = s3radio.equalizer.get_filters_by_radio_id(station.id);
					s3radio.station_list.push(station);
				}
			}
		}
	}

	//------------------------------------------------------------------------
	s3radio.station_list = s3radio.station_list.sort(function(a, b) {
		if (String(a.name).toLowerCase() > String(b.name).toLowerCase()) { return 1; }
		if (String(a.name).toLowerCase() < String(b.name).toLowerCase()) { return -1; }
		return 0;
	});

	//------------------------------------------------------------------------
	if (search_country == '') {
		document.getElementById('radio_search_select_country_current').setAttribute('title', s3radio.utils.get_string('all_countries') + ' (' + s3radio.station_list.length + ')');
	} else {
		document.getElementById('radio_search_select_country_current').setAttribute('title', s3radio.utils.get_country_name(search_country) + ' (' + s3radio.station_list.length + ')');
	}

	//------------------------------------------------------------------------
	if (s3radio.shuffle_enabled) {
		chrome.runtime.sendMessage({ 'action_set_station_list' : true, 'station_list' : s3radio.station_list }, function(response) {});
	}
	//------------------------------------------------------------------------
	s3radio.title_list_head_hide();
	document.getElementById('search_list_head').setAttribute('is_hidden', false);
	//------------------------------------------------------------------------
	s3radio.create_list_elements();
}
//------------------------------------------------------------------------------
s3radio.create_country_list_search = function() {
	var country_list_box = document.getElementById('radio_search_select_country_list');
	var country_list = [];

	//------------------------------------------------------------------------
	for (var country_id in s3radio.country_list) {
		country_list.push({ 'country_id' : country_id, 'name' : s3radio.utils.get_country_name(country_id) });
	}
	//------------------------------------------------------------------------
	country_list = country_list.sort(function(a, b) {
		if (a.name > b.name) { return 1; }
		if (a.name < b.name) { return -1; }
		return 0;
	});

	//------------------------------------------------------------------------
	for (var i=0; i<country_list.length; i++) {
		var country_option = document.createElement('div');
		country_option.className = 'country_list_option';
		country_option.id = 'radio_search_select_country_list_' + country_list[i].country_id;
		s3radio.utils.HTMLDOM_value(country_option, country_list[i].name);
		country_option.style.backgroundImage = 'url("/skin/country/' + country_list[i].country_id + '.png")';
		country_option.setAttribute('title', country_list[i].name);
		country_option.country_id = country_list[i].country_id;
		country_list_box.appendChild(country_option);

		//------------------------------------------------------------------
		country_option.addEventListener("click", function(event) {
			var search_country = this.country_id;
			s3radio.pref_save('search_country', search_country, function(){
				s3radio.make_search_country_current();
				s3radio.create_list_by_search();
				country_list_box.blur();
			});
		}, true);
	}

	//------------------------------------------------------------------------
	document.getElementById('radio_search_select_country_list_all').addEventListener("click", function(event) {
		s3radio.pref_save('search_country', 'all', function(){
			s3radio.make_search_country_current();
			s3radio.create_list_by_search();
			country_list_box.blur();
		});
	}, true);
	//------------------------------------------------------------------------
	document.getElementById('radio_search_select_country_list_user_list').addEventListener("click", function(event) {
		s3radio.pref_save('search_country', 'user_list', function(){
			s3radio.make_search_country_current();
			s3radio.create_list_by_search();
			country_list_box.blur();
		});
	}, true);

	//------------------------------------------------------------------------
	s3radio.make_search_country_current();
}
//------------------------------------------------------------------------------
s3radio.check_country_list_search = function() {
	var search_text = s3radio.utils.prefs_get('search_text');
	var country_station_list_all = 0;
	var user_list = s3radio.utils.prefs_get('user_list');
	var stations_list = s3radio.utils.merge_user_list(s3radio.stations, user_list);

	//------------------------------------------------------------------------
	for (var country_id in stations_list) {
		var country_station_list = 0;

		//------------------------------------------------------------------
		for (var i=0; i<stations_list[country_id].length; i++) {
//			var station = s3radio.utils.clone_object(stations_list[country_id][i]);
			var station = stations_list[country_id][i];
			if (station.name.toLocaleLowerCase().indexOf(search_text.toLocaleLowerCase()) >= 0) {
				country_station_list++;
				country_station_list_all++;
			}
		}
		//------------------------------------------------------------------
		var id = 'radio_search_select_country_list_' + country_id;
		if (document.getElementById(id)) {
			document.getElementById(id).setAttribute('is_search_count', country_station_list);
			document.getElementById(id).setAttribute('title', s3radio.utils.get_country_name(country_id) + ' (' + country_station_list + ')');
		}
	}

	//------------------------------------------------------------------------
	document.getElementById('radio_search_select_country_list_all').setAttribute('title', s3radio.utils.get_string('all_countries') + ' (' + country_station_list_all + ')');
}
//------------------------------------------------------------------------------
s3radio.make_search_country_current = function() {
	var search_country = s3radio.utils.prefs_get('search_country') || 'DDD';

	s3radio.get_country_stations(search_country, function(){
		s3radio.make_search_country_current_run(search_country);
	});
}
//------------------------------------------------------------------------------
s3radio.make_search_country_current_run = function(search_country) {
//	var search_country = s3radio.utils.prefs_get('search_country') || 'DDD';

	//------------------------------------------------------------------------
	for (var country_id in s3radio.country_list) {
		var id = 'radio_search_select_country_list_' + country_id;
		document.getElementById(id).setAttribute('is_selected', (country_id == search_country) ? true : false);
	}

	//------------------------------------------------------------------------
	var search_country_current = document.getElementById('radio_search_select_country_current');
	if (s3radio.stations[search_country]) {
		search_country_current.setAttribute('all_countries', false);
		s3radio.utils.HTMLDOM_value(search_country_current, s3radio.utils.get_country_name(search_country));
		search_country_current.style.backgroundImage = 'url("/skin/country/' + search_country + '.png")';
		document.getElementById('radio_search_select_country_list_all').setAttribute('is_selected', false);
		document.getElementById('radio_search_select_country_list_user_list').setAttribute('is_selected', false);
	} else if (search_country == 'user_list') {
		search_country_current.setAttribute('all_countries', false);
		s3radio.utils.HTMLDOM_value(search_country_current, s3radio.utils.get_string('user_list_radio_stations'));
		search_country_current.style.backgroundImage = 'url("/skin/' + s3radio.utils.get_theme_catalog() + '/button_user_list.png")';
		document.getElementById('radio_search_select_country_list_all').setAttribute('is_selected', false);
		document.getElementById('radio_search_select_country_list_user_list').setAttribute('is_selected', true);
	} else {
		search_country_current.setAttribute('all_countries', true);
		s3radio.utils.HTMLDOM_value(search_country_current, s3radio.utils.get_string('all_countries'));
		document.getElementById('radio_search_select_country_list_all').setAttribute('is_selected', true);
		document.getElementById('radio_search_select_country_list_user_list').setAttribute('is_selected', false);
	}
}
//------------------------------------------------------------------------------
