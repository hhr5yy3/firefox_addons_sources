var s3forecast = {};
s3forecast.location_default = {"name":"New York, NY, USA","code":"cityId:349727","current":true,"rotate":true,"latlng":{"lat":40.7127837,"lng":-74.00594130000002}};
s3forecast.rotate_tiimer = null;
s3forecast.update_tiimer = null;
s3forecast.update_timer_value = 1000*60*30;
s3forecast.last_render = null;
s3forecast.radar_image_list = {};
s3forecast.last_data = {};

//------------------------------------------------------------------------------
s3forecast.init = function() {
	s3forecast.prefs.init(function(){
		s3forecast.last_data = s3forecast.utils.prefs_get('last_data');
		for (var key in s3forecast.last_data) {
			s3forecast.last_data[key].wait_request = false;
			s3forecast.last_data[key].run_request = 0;
		}
		s3forecast.utils.prefs_set('last_data', s3forecast.last_data);

		s3forecast.themes.init(null, function(){
			s3forecast.set_update_tiimer(100);
			s3forecast.set_rotate_tiimer();

			chrome.tabs.query({  active: true }, function(tab_list) {
				if (tab_list && tab_list.length) {
					for (var i in  tab_list) {
						if (tab_list[i].id) {
							s3forecast.set_content_scripts(tab_list[0].id);
						}
					}
				}
			});

			if (s3forecast.utils.prefs_get('first_run')) {
				s3forecast.utils.prefs_set('first_run', false);
				chrome.runtime.openOptionsPage();
			}
		});
	});
}
//------------------------------------------------------------------------------
s3forecast.set_content_scripts = function(tab_id, callback, set_all_script) {
	chrome.tabs.sendMessage(tab_id, { check_tooltip: true }, function(response) {
		if (chrome.runtime.lastError) {
		} else if (response && response.success) {
			if (callback) {
				callback(tab_id);
			}
			return;
		}

		var js_list = (set_all_script) ?
			[ "/content/forecastbar.js", "/content/utils.js", "/content/prefs.js", "/content/themes.js", "/content/i18n.js" ]
			:
			[ "/content/tab_loader.js" ];

		var executeScript = function(js_list) {
			var js_file = js_list.shift();
			var data = {};
			data.file = js_file;
			if (set_all_script) {
				data.runAt = 'document_start';
			}
			chrome.tabs.executeScript(tab_id, data, function() {
				if (chrome.runtime.lastError) {}
				if (js_list.length > 0) {
					executeScript(js_list);
				} else if (callback) {
					callback(tab_id);
				}
			});
		}
		executeScript(js_list);
	 });
}
//------------------------------------------------------------------------------
s3forecast.process_forecast = function(location) {
	var last_data = s3forecast.get_last_data(location);
	if (last_data) {
		s3forecast.render_forecast(last_data, location);
		if (! s3forecast.update_tiimer) {
			s3forecast.update_timer_value = s3forecast.utils.prefs_get('update_timer_value') * 1000*60;
			s3forecast.set_update_tiimer(s3forecast.update_timer_value);
		}
	} else {
		s3forecast.request_forecast_data(location);
	}
}
//------------------------------------------------------------------------------
s3forecast.request_forecast_data = function(location, is_background) {
	if (! is_background) {
		chrome.runtime.sendMessage({ 'action_prepare_popup': true }, function(response) { if (chrome.runtime.lastError) {} });
	}
	//------------------------------------------------------------------------
	if (! location) {
		location = s3forecast.get_location_current(false);
	}
	//------------------------------------------------------------------------
	var forecast = {};
	var current_time = (new Date()).getTime();
	//------------------------------------------------------------------------
	if (s3forecast.last_data[location.code]) {
		if (s3forecast.last_data[location.code].run_request && (s3forecast.last_data[location.code].run_request > current_time - 1000*60)) {
			return;
		}
		s3forecast.last_data[location.code].run_request = current_time;
	} else {
		s3forecast.last_data[location.code] = {};
		s3forecast.last_data[location.code].run_request = current_time;
	}
	s3forecast.utils.prefs_set('last_data', s3forecast.last_data);
	chrome.runtime.sendMessage({ 'action_update_forecast': true, 'prefs_list' : s3forecast.prefs.list }, function(response) { if (chrome.runtime.lastError) {} });

	//------------------------------------------------------------------------
	s3forecast.adapter.fetch_feed_data(location.code, 'cc', function(result_cc) {
		if (result_cc.resolve) {
			forecast.cc = result_cc.resolve;
		} else {
			forecast.connect_error = true;
		}
		//------------------------------------------------------------------
		s3forecast.adapter.fetch_feed_data(location.code, 'forecast', function(result_forecast) {
			//------------------------------------------------------------
			if (typeof(result_forecast) != 'object') {
				result_forecast = {};
			}
			//------------------------------------------------------------
			if (result_forecast.resolve) {
				forecast.forecast = result_forecast.resolve;
				if (! Array.isArray(forecast.forecast.forecast.day)) {
					forecast.forecast = undefined;
					forecast.connect_error = true;
				} else {
					forecast = s3forecast.adapter.normalize_url_list(forecast);
				}
			}
			//------------------------------------------------------------
			else {
				forecast.connect_error = true;
			}

			if (s3forecast.last_data[location.code]) {
				if (! forecast.cc || ! forecast.forecast) {
					forecast.cc = s3forecast.last_data[location.code].cc;
					forecast.forecast = s3forecast.last_data[location.code].forecast;
				}

			}

			var update_timer_value = 1000 * 60;
			forecast.update_time = 0;
			s3forecast.last_data[location.code] = forecast;

			if (forecast.cc && forecast.forecast && (! forecast.connect_error)) {
				forecast.update_time = (new Date()).getTime();
				update_timer_value = s3forecast.update_timer_value;
			}
			//-----------------------------------------------------------
			s3forecast.utils.prefs_set('last_data', s3forecast.last_data);
			//-----------------------------------------------------------
			if (is_background) {
				chrome.runtime.sendMessage({ 'action_update_forecast': true, 'prefs_list' : s3forecast.prefs.list }, function(response) { if (chrome.runtime.lastError) {} });
			}
			//-----------------------------------------------------------
			else {
				//-----------------------------------------------------
				s3forecast.render_forecast(s3forecast.last_data[location.code], location);
				s3forecast.set_update_tiimer(update_timer_value);
				//-----------------------------------------------------
				var location_list = s3forecast.utils.prefs_get('location_list');
				for (var i=0; i<location_list.length; i++) {
					if (! location_list[i].current) {
						if (location_list[i].code != location.code) {
							s3forecast.request_forecast_data(location_list[i], true);
						}
					}
				}
			}
		});
	});
}
//------------------------------------------------------------------------------
s3forecast.get_last_data = function(location) {
	var current_time = (new Date()).getTime();
	var update_timer = s3forecast.update_timer_value;

	//------------------------------------------------------------------------
	if (location) {
		var last_data = s3forecast.last_data[location.code];
		if (last_data) {
			last_data.wait_request = false;
			if (((last_data.update_time + update_timer) < current_time) || (last_data.connect_error)) {
//				if (! last_data.wait_request) {
					last_data.wait_request = true;
					s3forecast.request_forecast_data(location);
//				}
			}
		}
		return last_data;
	}
	//------------------------------------------------------------------------
	else {
		return s3forecast.last_data;
	}
}
//------------------------------------------------------------------------------
s3forecast.down_last_data = function() {
	for (var key in s3forecast.last_data) {
		s3forecast.last_data[key].update_time = 0;
	}
	s3forecast.utils.prefs_set('last_data', s3forecast.last_data);
	var location = s3forecast.get_location_current(false);
	s3forecast.request_forecast_data(location);
}
//------------------------------------------------------------------------------
s3forecast.del_last_data_location = function(location) {
	var last_data_new = {};
	for (var key in s3forecast.last_data) {
		if (key != location.code) {
			last_data_new[key] = s3forecast.last_data[key];
		}
	}
	s3forecast.utils.prefs_set('last_data', last_data_new);
	s3forecast.last_data = last_data_new;
}
//------------------------------------------------------------------------------
s3forecast.get_location_current = function(is_rotate) {
	var location_list = s3forecast.utils.prefs_get('location_list');
	if (! location_list) { location_list = []; }
	if (! location_list.length) {
		location_list = [s3forecast.location_default];
	}
	//------------------------------------------------------------------------
	var location = location_list[0];
	var  check_current = -1;

	//------------------------------------------------------------------------
	for (var i=0; i<location_list.length; i++) {
		if (location_list[i].current && (check_current >=0)) {
			location_list[i].current = false;
		}
		else if (location_list[i].current) {
			location = location_list[i];
			check_current = i;
		}
	}
	//------------------------------------------------------------------------
	if (check_current <0) { check_current = 0 }
	//------------------------------------------------------------------------
	if (is_rotate) {
		var rotate_prev = -1;
		var rotate_next = -1;

		for (var i=0; i<location_list.length; i++) {
			if (location_list[i].rotate && (i < check_current) && (rotate_prev < 0)) {
				rotate_prev = i;
			}
			else if (location_list[i].rotate && (i > check_current) && (rotate_next < 0)) {
				rotate_next = i;
			}
		}

		if (rotate_next >= 0) {
			location = location_list[rotate_next];
		} else if (rotate_prev >= 0) {
			location = location_list[rotate_prev];
		}
		location_list[check_current].current = false;
		location.current = true;
	}

	s3forecast.utils.prefs_set('location_list', location_list);

	return location;
}
//------------------------------------------------------------------------------
s3forecast.set_location_current = function(code) {
	var location_list = s3forecast.utils.prefs_get('location_list');
	var location = location_list[0];

	for (var i=0; i<location_list.length; i++) {
		location_list[i].current = false;
		if (location_list[i].code == code) {
			location_list[i].current = true;
			location = location_list[i];
		}
	}
	s3forecast.utils.prefs_set('location_list', location_list);
	return location;
}
//------------------------------------------------------------------------------
s3forecast.set_location = function(location) {
	var location_list = s3forecast.utils.prefs_get('location_list');
	var location_exists = false;

	for (var i=0; i<location_list.length; i++) {
		location_list[i].current = false;
		if (location_list[i].code == location.code) {
			location_exists = true;
			location_list[i] = location;
			location_list[i].current = true;
			location = location_list[i];
		}
	}

	if (! location_exists) {
		location.current = true;
		location_list.push(location);
	}

	s3forecast.utils.prefs_set('location_list', location_list);
	location = s3forecast.utils.clone_object(location);
	location.is_new = true;
	s3forecast.request_forecast_data(location);
	s3forecast.set_rotate_tiimer();
}
//------------------------------------------------------------------------------
s3forecast.delete_location = function(code) {
	var location_list = s3forecast.utils.prefs_get('location_list');
	var location_list_tmp = [];

	for (var i=0; i<location_list.length; i++) {
		if (location_list[i].code == code) {
			s3forecast.del_last_data_location(location_list[i]);
		} else {
			location_list_tmp.push(location_list[i]);
		}
	}

	s3forecast.utils.prefs_set('location_list', location_list_tmp);
	s3forecast.process_forecast(s3forecast.get_location_current(false));
}
//------------------------------------------------------------------------------
s3forecast.rename_location = function(code, name) {
	var location_list = s3forecast.utils.prefs_get('location_list');

	for (var i=0; i<location_list.length; i++) {
		if (location_list[i].code == code) {
			location_list[i].name = name;
		}
	}

	s3forecast.utils.prefs_set('location_list', location_list);
	s3forecast.process_forecast(s3forecast.get_location_current(false));
}
//------------------------------------------------------------------------------
s3forecast.rotate_location = function(code) {
	var location_list = s3forecast.utils.prefs_get('location_list');

	for (var i=0; i<location_list.length; i++) {
		if (location_list[i].code == code) {
			location_list[i].rotate = ! location_list[i].rotate;
		}
	}

	s3forecast.utils.prefs_set('location_list', location_list);
}
//------------------------------------------------------------------------------
s3forecast.render_forecast = function(last_data, location) {
	var forecast_data = null;
	try {
		forecast_data = s3forecast.processor.process_data(last_data, location);
	} catch(e) {
		s3forecast.set_update_tiimer(1000*60);
	}

	forecast_data.wait_request = last_data.wait_request;
	var location_list = s3forecast.utils.prefs_get('location_list');

	s3forecast.last_render = { 'action_reload_popup': true, 'forecast_data' : forecast_data, 'location_list' : location_list, 'is_new' : location.is_new, 'prefs_list' : s3forecast.prefs.list };
	chrome.runtime.sendMessage(s3forecast.last_render, function(response) { if (chrome.runtime.lastError) {} });
	s3forecast.render_forecastbar();
	s3forecast.set_status_icon(forecast_data);
}
//------------------------------------------------------------------------------
s3forecast.render_forecastbar = function() {
	chrome.tabs.query({  active: true }, function(tab_list) {
		if (tab_list && tab_list.length) {
			for (var i in  tab_list) {
				if (tab_list[i].id) {
					s3forecast.set_content_scripts(tab_list[i].id, function(tab_id) {
						chrome.tabs.sendMessage(tab_id, s3forecast.last_render, function(response) { if (chrome.runtime.lastError) {}; });
					});
				}
			}
		}
	});
}
//------------------------------------------------------------------------------
//chrome.tabs.onHighlighted.addListener(function(){ s3forecast.render_forecastbar(); });
chrome.tabs.onActivated.addListener(function(){ s3forecast.render_forecastbar(); });
chrome.tabs.onUpdated.addListener(function(tab_id, changeInfo) {
	if (! changeInfo) { return; }
	if (changeInfo && (changeInfo.status !== 'loading')) { return; }
	s3forecast.render_forecastbar(); 
});

try {
	chrome.windows.onFocusChanged.addListener(function(windowId){ setTimeout(function(){ s3forecast.render_forecastbar(); }, 200); });
} catch(e) {};
try {
	chrome.tabs.onZoomChange.addListener(function(zoom) {
		chrome.tabs.sendMessage(zoom.tabId, { 'action_change_zoom' : true, 'zoom_index' : zoom.newZoomFactor}, function(response) { if (chrome.runtime.lastError) {} });
	});
} catch(e) {};
//------------------------------------------------------------------------------
s3forecast.set_status_icon = function(data) {
	if (data.cc) {
		var is_warning = (data.swa && data.swa.isActive) ? true : false;
		if (is_warning && ! (s3forecast.utils.prefs_get('warning_swa'))) {
			is_warning = false;
		}
		is_warning = (is_warning) ? true : data.connect_error;
		//-----------------------------------------------------------------
		var title = s3forecast.utils.create_forecast_title(data);
		try { chrome.browserAction.setTitle({ 'title': title }); } catch(e) {};
		//-----------------------------------------------------------------
		var icon_path = s3forecast.themes.get(data.cc.icon, 'small');
		try { chrome.browserAction.setIcon({ 'path': icon_path }); } catch(e) {};

		if (s3forecast.utils.prefs_get('theme_button_temperature')) {
			try { chrome.browserAction.setBadgeText({ 'text':  data.cc.temperature.part[0].substring(0, data.cc.temperature.part[0].length-1) }); } catch(e) {};
		} else {
			try { chrome.browserAction.setBadgeText({ 'text' :  '' }); } catch(e) {};
		}
		try { chrome.browserAction.setBadgeBackgroundColor({ 'color': (is_warning) ? '#D02435' : '#666666' }); } catch(e) {};
/*
		try {
			if (is_warning) {
				chrome.browserAction.setBadgeBackgroundColor({ 'color': "rgba(208,36,53, 0.45)" }, function(callback) { if (chrome.runtime.lastError) {} });
			} else {
				chrome.browserAction.setBadgeBackgroundColor({ 'color': "rgba(50,50,50, 0.45)" }, function(callback) { if (chrome.runtime.lastError) {} });
			}
		} catch(e) {
		}
*/

	} else {
		var icon = (data && data.connect_error) ? '/skin/images/logo16_error.png' : '/skin/images/logo16.png';
		try { chrome.browserAction.setIcon({ 'path' : icon }); } catch(e) {};
		try { chrome.browserAction.setTitle({ 'title' : 'Forecastfox (fix version)' }); } catch(e) {};
		try { chrome.browserAction.setBadgeText({ 'text' :  '' }); } catch(e) {};
	}
}
//------------------------------------------------------------------------------
s3forecast.set_update_tiimer = function(update_timer_value) {
	if (s3forecast.update_tiimer) {
		clearTimeout(s3forecast.update_tiimer);
	}
	s3forecast.update_tiimer = setTimeout(function(){
		s3forecast.update_tiimer = null;
		s3forecast.process_forecast(s3forecast.get_location_current(false));
	}, update_timer_value);
}
//------------------------------------------------------------------------------
s3forecast.set_rotate_tiimer = function() {
	if (s3forecast.rotate_tiimer) {
		clearTimeout(s3forecast.rotate_tiimer);
	}

	var rotate_pref = s3forecast.utils.prefs_get('rotate');
	if (rotate_pref.enabled) {
		s3forecast.rotate_tiimer = setTimeout(function() {
			var location = s3forecast.get_location_current(true);
			s3forecast.process_forecast(location);
			s3forecast.set_rotate_tiimer();
		}, rotate_pref.interval * 1000 * 60);
	}
}
//------------------------------------------------------------------------------
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) { return s3forecast.onMessage(request, sender, sendResponse); });
//------------------------------------------------------------------------------
s3forecast.onMessage = function(request, sender, sendResponse) {
	//------------------------------------------------------------------------
	if (! request) { return; }
	//------------------------------------------------------------------------
	if (request.action_prefs_set && request.pref_name) {
		s3forecast.utils.prefs_set(request.pref_name, request.pref_value);
		//------------------------------------------------------------------
		if (request.is_load) {
			sendResponse({ 'success' : true });
			return;
		}
		//------------------------------------------------------------------
		else if (request.pref_name == 'current_locale') {
			s3forecast.i18n.init(request.pref_value);
			s3forecast.down_last_data();
		}
		//------------------------------------------------------------------
		else if (request.pref_name == 'theme_icon_pack') {
			s3forecast.themes.init(request.pref_value, function(){
				s3forecast.process_forecast(s3forecast.get_location_current(false));
			});
		}
		//------------------------------------------------------------------
		s3forecast.update_timer_value = s3forecast.utils.prefs_get('update_timer_value') * 1000*60;
		s3forecast.process_forecast(s3forecast.get_location_current(false));
		sendResponse({ 'success' : true });
	}
	//------------------------------------------------------------------------
	else if (request.action_prefs_get) {
		sendResponse({ 'prefs_list' : s3forecast.prefs.list });
	}
	//------------------------------------------------------------------------
	else if (request.action_reset_defaults) {
		s3forecast.prefs.reset_defaults(function(){
			s3forecast.utils.prefs_set('first_run', false);
			s3forecast.init();
		});
		sendResponse({ 'success' : true });
	}
	//------------------------------------------------------------------------
	else if (request.action_prefs_reload) {
		if (request.prefs_new) {
			for (var pref_name in request.prefs_new) {
				s3forecast.utils.prefs_set(pref_name, request.prefs_new[pref_name]);
			}
		}
		s3forecast.init();
		sendResponse({ 'success' : true });
	}
	//------------------------------------------------------------------------
	else if (request.action_get_strings && request.string_list) {
		for (var i in request.string_list) {
			request.string_list[i] = s3forecast.utils.get_string(i);
		}
		sendResponse({ 'string_list' : request.string_list });
	}
	//------------------------------------------------------------------------
	else if (request.init_content_scripts) {
		s3forecast.set_content_scripts(sender.tab.id, undefined, true);
		sendResponse({ 'success' : true });
	}
	//------------------------------------------------------------------------
	else if (request.action && (request.action == 'get_forecast_data')) {
		if (s3forecast.prefs.is_init) {
			var location = s3forecast.get_location_current(false);
			var last_data = s3forecast.get_last_data(location);
			var forecast_data = null;
			if (last_data) {
				forecast_data = s3forecast.processor.process_data(last_data, location);
			} else {
				s3forecast.request_forecast_data(location);
			}
			var location_list = s3forecast.utils.prefs_get('location_list');
			sendResponse({ 'forecast_data' : forecast_data, 'location_list' : location_list });
		} else {
			sendResponse({ 'prefs_not_init' : true });
		}
	}
	//------------------------------------------------------------------------
	else if (request.action && (request.action == 'refresh_forecast_data')) {
		var location = s3forecast.get_location_current(false);
		s3forecast.request_forecast_data(location);
		sendResponse({ 'success' : true });
	}
	//------------------------------------------------------------------------
	else if (request.action && (request.action == 'change_forecast_data')) {
		var location = s3forecast.get_location_current(false);
		if (location.code == request.code) {
			s3forecast.request_forecast_data(location);
		} else {
			location = s3forecast.set_location_current(request.code);
			s3forecast.process_forecast(location);
		}
		sendResponse({ 'success' : true });
	}
	//------------------------------------------------------------------------
	else if (request.action && (request.action == 'find_location')) {
		var p = request.param;

		var search_callback = function (search_id, code) {
			chrome.runtime.sendMessage({ 'find_location_result': true, 'success' : true, 'code' : code, 'search_id' : search_id, 'geolocation_id' : request.geolocation_id }, function(response) { if (chrome.runtime.lastError) {} }); 
		}
		var search_errback = function (search_id) {
			chrome.runtime.sendMessage({ 'find_location_result': true, 'success' : false, 'search_id' : search_id, 'geolocation_id' : request.geolocation_id }, function(response) { if (chrome.runtime.lastError) {} }); 
		}

		s3forecast.adapter.find_location(p.query, p.search_id, search_callback, search_errback);
		sendResponse({ 'success' : true });
	}
	//------------------------------------------------------------------------
	else if (request.action && (request.action == 'set_location')) {
		s3forecast.set_location(request.param);
		sendResponse({ 'success' : true });
	}
	//------------------------------------------------------------------------
	else if (request.action && (request.action == 'delete_location')) {
		s3forecast.delete_location(request.code);
		sendResponse({ 'success' : true });
	}
	//------------------------------------------------------------------------
	else if (request.action && (request.action == 'rename_location')) {
		s3forecast.rename_location(request.code, request.name);
		sendResponse({ 'success' : true });
	}
	//------------------------------------------------------------------------
	else if (request.action && (request.action == 'rotate_location')) {
		if (request.code) {
			s3forecast.rotate_location(request.code);
		} else {
			s3forecast.set_rotate_tiimer();
		}
		var location = s3forecast.get_location_current(false);
		var location_list = s3forecast.utils.prefs_get('location_list');
		chrome.runtime.sendMessage({ 'action_reload_settings': true, 'location_list' : location_list, 'location' : location }, function(response) { if (chrome.runtime.lastError) {} }); 
		sendResponse({ 'success' : true });
	}
	//------------------------------------------------------------------------
	else if (request.action && (request.action == 'get_location_list')) {
		var location_current = s3forecast.get_location_current(false);
		var location_list = s3forecast.utils.prefs_get('location_list');
		sendResponse({ 'location_list' : location_list, 'location_current' : location_current });
	}
	//------------------------------------------------------------------------
	else if (request.action && (request.action == 'get_zoom_tab')) {
		if (sender.tab) {
			request.tab_id = sender.tab.id;
		}
		else if (request.tabId) {
			request.tab_id = request.tabId;
		}
		chrome.tabs.getZoom(request.tab_id, function(zoom_index) {
			chrome.tabs.sendMessage(request.tab_id, { 'action_change_zoom' : true, 'zoom_index' : zoom_index}, function(response) { if (chrome.runtime.lastError) {} });
		});
		sendResponse({ 'success' : true });
	}
	//------------------------------------------------------------------------
	else if (request.action && (request.action == 'get_radar_image')) {
		if (sender.tab) {
			request.tab_id = sender.tab.id;
		}
		else if (request.tabId) {
			request.tab_id = request.tabId;
		}
		if (request.radar_src) {
			var current_time = (new Date()).getTime();
			if (s3forecast.radar_image_list[request.radar_src] && s3forecast.radar_image_list[request.radar_src].time > (current_time - (1000*60*5))) {
				chrome.tabs.sendMessage(request.tab_id, { 'set_radar_image' : true, 'radar_src' : request.radar_src, 'radar_data' : s3forecast.radar_image_list[request.radar_src].data }, function(response) { if (chrome.runtime.lastError) {} });
			} else {
				var xhr = new XMLHttpRequest();
				xhr.responseType = 'blob';
				xhr.open('GET', request.radar_src, true);
				xhr.timeout = 20000;
				xhr.onload = function(e) {
					if (this.status == 200) {
						var blob = new Blob([this.response], {type: 'image/image'});
		//				radar.src = URL.createObjectURL(blob);
						var reader = new window.FileReader();
						reader.readAsDataURL(blob); 
						reader.onloadend = function() {
							s3forecast.radar_image_list[request.radar_src] = {
								'time' : current_time,
								'data' : reader.result
							};
							chrome.tabs.sendMessage(request.tab_id, { 'set_radar_image' : true, 'radar_src' : request.radar_src, 'radar_data' : s3forecast.radar_image_list[request.radar_src].data }, function(response) { if (chrome.runtime.lastError) {} });
						}
					}
				};
				xhr.send(null);
			}
		}
		sendResponse({ 'success' : true });
	}
	//------------------------------------------------------------------------
	else if (request.save_settings) {
		var result = [];
		//------------------------------------------------------------------
		var prefs_list = s3forecast.utils.clone_object(s3forecast.prefs.list);
		var exclude_prefs = { 'current_version' : 1,	'not_open_contribute_page' : 1, 'is_first_run' : 1, 'show_page_timer' : 1, 'statistics' : 1, 'statistics_timer' : 1, 'theme_icon_pack_data' : 1, '_end' : 1 };
		//------------------------------------------------------------------
		for (var pref_name in prefs_list) {
			if (exclude_prefs[pref_name]) { continue; }
		 	//------------------------------------------------------------
			if (typeof(prefs_list[pref_name]) == 'object') {
				result.push(pref_name + '='  + JSON.stringify(prefs_list[pref_name]));
			} else if (typeof(prefs_list[pref_name]) == 'array') {
				result.push(pref_name + '='  + JSON.stringify(prefs_list[pref_name]));
			} else {
				result.push(pref_name + '='  + prefs_list[pref_name]);
			}
		}
	 	//-------------------------------------------------------------------
		var result_txt = result.join("\n") + "\n";
	 	//-------------------------------------------------------------------
		if (request.mode == "copy") {
			s3forecast.utils.copy_clipboard(result_txt, '', true);
		}
	 	//-------------------------------------------------------------------
		else if(request.mode == "save") {
			var blob1 = new Blob([result_txt], { type: "text/plain" });
			var result_url = URL.createObjectURL(blob1);
			var date = new Date();
			var dd = date.getDate(); if (dd < 10) { dd = '0' + dd; }
			var mm = date.getMonth() + 1; if (mm < 10) { mm = '0' + mm; }
			var hh = date.getHours(); if (hh < 10) { hh = '0' + hh; }
			var mn = date.getMinutes(); if (mn < 10) { mn = '0' + mn; }
			var ss = date.getSeconds(); if (ss < 10) { ss = '0' + ss; }

			var filename = 'Forecastfox.' + date.getFullYear() + '.' + mm + '.'  + dd + '.'  + hh + '.'  + mn + '.'  + ss + '.txt';
	
			chrome.downloads.download({
				url: result_url,
				filename: filename,
				saveAs: true
			}, function (downloadId) {});
		}
		sendResponse({ 'success' : true });
	}
	//------------------------------------------------------------------------
	else if (request.action && (request.action == 'open_options_page')) {
		chrome.runtime.openOptionsPage();
		sendResponse({ 'success' : true });
	}
	//------------------------------------------------------------------------
}
//------------------------------------------------------------------------------
s3forecast.onBeforeRequest = function(httpChannel) {
	if (httpChannel.originUrl && (httpChannel.originUrl.indexOf( "http://www.s3blog.org/geolocation.html" ) == 0 )) {
		return { cancel: true };
	}
	else if (httpChannel.url.indexOf( "www.s3blog.org%2Fgeolocation.html" ) >= 0 ) {
		return { cancel: true };
	}
}
//------------------------------------------------------------------------------
s3forecast.onBeforeRequest2 = function(httpChannel) {
	if (httpChannel.originUrl && (httpChannel.originUrl.indexOf( "http://www.s3blog.org/geolocation.html" ) == 0 )) {
		return { cancel: true };
	}
	else if (httpChannel.url.indexOf( "host:www.s3blog.org" ) >= 0 ) {
		return { cancel: true };
	}
}
//------------------------------------------------------------------------------
chrome.webRequest.onBeforeRequest.addListener(
	s3forecast.onBeforeRequest,
	{urls: [ "*://maps.googleapis.com/maps/api/js/QuotaService*", "*://maps.googleapis.com/maps/api/js/AuthenticationService.Authenticate*" ]},
	["blocking"]
);
chrome.webRequest.onBeforeRequest.addListener(
	s3forecast.onBeforeRequest2,
	{urls: [ "*://maps.googleapis.com/maps/gen_204*" ]},
	["blocking"]
);
//------------------------------------------------------------------------------
chrome.webRequest.onBeforeSendHeaders.addListener(
	function(httpChannel) {
		var headers = httpChannel.requestHeaders;
		//-----------------------------------------------------------------
		for (var i = 0; i < headers.length; i++) {
			if (headers[i].name.toLowerCase() === 'referer') {
				if (headers[i].value.indexOf( "http://www.s3blog.org/geolocation.html" ) == 0 ) {
					headers.splice(i, 1);
					return { requestHeaders: headers };
				}
				break;
			}
		}
		return;
	},
	{urls: ["http://*/*", "https://*/*"]},
	["blocking", "requestHeaders"]
);
//------------------------------------------------------------------------------
// check and add to Content Security Policy  "img-src data:" for ForecastBar images by url 'data:image'
//------------------------------------------------------------------------------
chrome.webRequest.onHeadersReceived.addListener(
	function(httpChannel) {
		var headers = httpChannel.responseHeaders;
		//-----------------------------------------------------------------
		for (var i = 0; i < headers.length; i++) {
			if (headers[i].name.toLowerCase() === 'content-security-policy') {
				var policy_list = headers[i].value.split(/\;/);
				var is_ok = false;
				for (var p=0; p<policy_list.length; p++) {
					if (/^\s+img\-src/.test(policy_list[p])) {
						is_ok = true;
						if (! /\sdata\:/.test(policy_list[p])) {
							policy_list[p] += ' data:';
							headers[i].value = policy_list.join(';');
							return { responseHeaders: headers };
						}
//						if (! /\sblob\:/.test(policy_list[p])) {
//							policy_list[p] += ' blob:';
//							headers[i].value = policy_list.join(';');
//							return { responseHeaders: headers };
//						}
					}
				}
				//----------------------------------------------------
/*
				if (! is_ok) {
					//---------------------------------------------
					// This crazy piece of code is just for crawling an bug in Kaspersky Internet Security
					//---------------------------------------------
					for (var p=0; p<1; p++) {
						if (/\s/.test(policy_list[p])) {
							policy_list.push(" img-src * 'self' data:");
							headers[i].value = policy_list.join(';');
							return { responseHeaders: headers };
						}
					}
				}
*/
				break;
			}
		}
		return;
	},
	{
		urls: ["http://*/*", "https://*/*"],
		types: ["main_frame"]
	},
	["blocking", "responseHeaders"]
);
//------------------------------------------------------------------------------
setTimeout(s3forecast.init, 500);
