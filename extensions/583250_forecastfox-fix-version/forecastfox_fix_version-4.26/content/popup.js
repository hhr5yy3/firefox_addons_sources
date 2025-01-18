var s3forecast = {};
s3forecast.menu_selected = 'cc';
s3forecast.forecast_data = {};
s3forecast.swa_link = '';
s3forecast.radar_timer = null;
s3forecast.location_list = null;
s3forecast.is_radar_show = false;
s3forecast.geolocation_id = 0;
s3forecast.geolocation_messages = [];

//------------------------------------------------------------------------------
s3forecast.init_0 = function() {
	var menu_list = [ 'cc', '0', '1', '2', '3', '4', '5' ];
	for (var i=0; i<menu_list.length; i++) {
		var menu_id = 'menu_day_box_' + menu_list[i];
		document.getElementById(menu_id).addEventListener("click", function() {
			s3forecast.selected_forecast_data(this.getAttribute('menu_id'));
			s3forecast.check_size_body();
		});
	}
	document.getElementById('s3forecast_settings').addEventListener("click", s3forecast.open_options_window);
	document.getElementById('forecast_data_warning_swa').addEventListener("click", function(){ s3forecast.window_open_swa(); });

	document.getElementById('menu_button').addEventListener("click", function(event) {
		if (event.target.id == 'menu_button') {
			document.getElementById('menu_button_item_box').removeAttribute('is_hidden');
			document.getElementById('menu_button_item_box').focus();
		}
	});

	document.getElementById('menu_improve').addEventListener("click", function() { s3forecast.window_open('http://www.s3blog.org/addon-contribute/forecastfox-fix-version.html'); });
	document.getElementById('menu_homepage').addEventListener("click", function() { s3forecast.window_open('http://www.s3blog.org/forecastfox.html'); });
	document.getElementById('menu_accuweather').addEventListener("click", function() { s3forecast.window_open('http://www.accuweather.com/?partner=forecastfox'); });
	document.getElementById('menu_share').addEventListener("click", function() { s3forecast.window_open('http://www.s3blog.org/forecastfox.html?share=1'); });
	document.getElementById('menu_troubleshooting').addEventListener("click", function() { s3forecast.window_open('http://www.s3blog.org/forecastfox/support.html'); });
	document.getElementById('menu_refresh').addEventListener("click", function() {
		chrome.runtime.sendMessage({ 'action' : 'refresh_forecast_data' }, function(response) {});
		s3forecast.menu_item_box_close();
	});
	document.getElementById('menu_locations').addEventListener("click", function() {
		s3forecast.menu_item_box_close();
		s3forecast.location_list_show(true);
	});
	document.getElementById('menu_newlocation').addEventListener("click", function() {
		s3forecast.menu_item_box_close();
		s3forecast.geolocation_show(true);
	});
	document.getElementById('menu_options').addEventListener("click", s3forecast.open_options_window);

	document.getElementById('forecast_data_error').addEventListener("click", function() {
		chrome.runtime.sendMessage({ 'action' : 'refresh_forecast_data' }, function(response) {});
		s3forecast.menu_item_box_close();
	});

	document.getElementById('menu_button_item_box').addEventListener("blur", function() { s3forecast.menu_item_box_close(); });

	document.getElementById('forecast_location').addEventListener("click", function() {
		s3forecast.location_list_show(true);
	});
	document.getElementById('forecast_location_list_items').addEventListener("blur", function(event) {
		var skip_blur = (event.relatedTarget && event.relatedTarget.loc_list_skip_blur) ? true : false;
		if (! skip_blur) {
			s3forecast.location_list_show(false);
		}
	});
	document.getElementById('geolocation_form').addEventListener("submit", function(event) {
		event.preventDefault();
		s3forecast.geolocation_search(this.geolocation_search_text.value.trim());
		return false;
	});
	document.getElementById('geolocation_search_button').addEventListener("click", function(event) {
		s3forecast.geolocation_search(document.getElementById('geolocation_form').geolocation_search_text.value.trim());
	});
	document.getElementById('geolocation_close_button').addEventListener("click", function(event) {
		s3forecast.geolocation_show(false);
	});

	document.getElementById('button_arrow_left').addEventListener("click", function(e){
		var self = this;
		self.style.visibility = 'hidden';
		s3forecast.button_change_location(self.location_code);
		setTimeout(function(){
			self.style.visibility = 'visible';
		}, 100);
	});
	document.getElementById('button_arrow_right').addEventListener("click", function(e){
		var self = this;
		self.style.visibility = 'hidden';
		s3forecast.button_change_location(self.location_code);
		setTimeout(function(){
			self.style.visibility = 'visible';
		}, 100);
	});
	document.getElementById('button_reload').addEventListener("click", function(e){
		chrome.runtime.sendMessage({ 'action' : 'refresh_forecast_data' }, function(response) {});
	});

	document.getElementById('link_accuweather').addEventListener("click", function(e){
		s3forecast.window_close();
	});

	s3forecast.prefs.init(function(){
		setTimeout(function(){ s3forecast.utils.i18n_parse(document); }, 100);
		s3forecast.themes.init(null, s3forecast.init);
	});
	s3forecast.tooltiptxt.init();
}
//------------------------------------------------------------------------------
s3forecast.init = function() {
	chrome.runtime.sendMessage({ 'action' : 'get_forecast_data' }, function(response) {
		if (! response) {
			response = { 'forecast_data' : { 'location' : { 'name' : '-', 'name_short' : '-' } } };
		}
		if (response.prefs_not_init) {
			setTimeout(function(){ s3forecast.init(); }, 1000);
			return;
		}
		s3forecast.get_forecast_data(response.forecast_data, response.location_list);
	});

	if (s3forecast.utils.prefs_get('theme_black_white')) {
		document.getElementById('table_body').setAttribute('is_black_and_white', true);
	} else {
		document.getElementById('table_body').removeAttribute('is_black_and_white');
	}

	s3forecast.utils.HTMLDOM_value(document.getElementById('copyright'), 
		s3forecast.utils.parse_template(s3forecast.i18n.get_string("copyright"), { "year" : (new Date).getYear()+1900, "accuweather" : '' })
	);
}
//------------------------------------------------------------------------------
s3forecast.body_show = function() {
	setTimeout(function(){
		document.getElementById('table_body').removeAttribute('is_hidden');
	}, 100);
}
//------------------------------------------------------------------------------
s3forecast.get_forecast_data = function(forecast_data, location_list) {
	if (location_list) {
		s3forecast.location_list = location_list;
	}
	s3forecast.forecast_data = forecast_data;

	document.getElementById('forecast_data_error').setAttribute('is_hidden', true);
	document.getElementById('forecast_data_warning_swa').setAttribute('is_hidden', true);
	s3forecast.swa_link = '';

	if (forecast_data && forecast_data.cc && forecast_data.forecast) {
		s3forecast.set_forecast_data(forecast_data);
		document.getElementById('forecast_data_box_weather').removeAttribute('is_nonvisibility');
	} else {
		document.getElementById('forecast_data_box_weather').setAttribute('is_nonvisibility', true);
		document.getElementById('forecast_data_error').removeAttribute('is_hidden');
	}
	if (forecast_data && forecast_data.connect_error) {
		document.getElementById('forecast_data_error').removeAttribute('is_hidden');
	}

	s3forecast.utils.HTMLDOM_value(document.getElementById('forecast_location'), forecast_data.location.name_short);
	document.getElementById('forecast_location').setAttribute('title', forecast_data.location.name);
	s3forecast.utils.HTMLDOM_value(document.getElementById('forecast_location_list_current'), s3forecast.forecast_data.location.name_short);
	document.getElementById('forecast_location_list_current').setAttribute('title', s3forecast.forecast_data.location.name);

	document.getElementById('forecast_data_error').setAttribute('title', s3forecast.i18n.get_string("menu.refresh"));
	if (! forecast_data.wait_request) {
		s3forecast.show_icon_wait(false);
	}

	if (s3forecast.location_list && (s3forecast.location_list.length > 1)) {
		var res = s3forecast.utils.get_left_right_location(s3forecast.location_list);
		var arrow_is_both = (s3forecast.location_list.length == 2) ? true : false;

		document.getElementById('button_arrow_left').setAttribute('title', res.left.name);
		document.getElementById('button_arrow_left').location_code = res.left.code;
		document.getElementById('button_arrow_left').removeAttribute('is_hidden');
		document.getElementById('button_arrow_left').setAttribute('arrow_is_both', arrow_is_both);

		document.getElementById('button_arrow_right').setAttribute('title', res.right.name);
		document.getElementById('button_arrow_right').location_code = res.right.code;
		if (arrow_is_both) {
			document.getElementById('button_arrow_right').setAttribute('is_hidden', true);
		} else {
			document.getElementById('button_arrow_right').removeAttribute('is_hidden');
		}

	} else {
		document.getElementById('button_arrow_left').setAttribute('is_hidden', true);
		document.getElementById('button_arrow_right').setAttribute('is_hidden', true);
	}

	s3forecast.location_list_select();
	s3forecast.body_show();
	setTimeout(function(){
		s3forecast.check_size_body();
	}, 100);
}
//------------------------------------------------------------------------------
s3forecast.check_size_body = function() {
	var weather_menu = document.getElementById('forecast_data_box_weather_menu');
	var weather_data = document.getElementById('forecast_data_box_weather_data');
//	var body = document.getElementById('table_body');

	if (! weather_menu.current_width) { weather_menu.current_width = 0; }
	if (! weather_data.current_width) { weather_data.current_width = 0; }
//	if (! body.current_width) { body.current_width = 0; }

/*
	if ((body.clientWidth > body.current_width) && (body.clientWidth < 800)) {
		body.current_width = body.clientWidth;
		body.style.minWidth = body.clientWidth + 'px';
	}
*/
	if ((weather_menu.clientWidth > weather_menu.current_width) && (weather_menu.clientWidth < 800)) {
		weather_menu.current_width = weather_menu.clientWidth;
		weather_menu.style.minWidth = weather_menu.clientWidth + 'px';
	}
	if ((weather_data.clientWidth > weather_data.current_width) && (weather_data.clientWidth < 800)) {
		weather_data.current_width = weather_data.clientWidth;
		weather_data.style.minWidth = weather_data.clientWidth + 'px';
	}

	document.getElementById('forecast_location_list_items').style.maxHeight = document.getElementById('table_body').clientHeight - 20 + 'px';
}
//------------------------------------------------------------------------------
s3forecast.menu_item_box_close = function() {
	document.getElementById('menu_button_item_box').setAttribute('is_hidden', true);
}
//------------------------------------------------------------------------------
s3forecast.open_options_window = function() {
	chrome.runtime.openOptionsPage();
	s3forecast.window_close();
}
//------------------------------------------------------------------------------
s3forecast.window_open = function(url) {
	window.open(url);
	s3forecast.window_close();
}
//------------------------------------------------------------------------------
s3forecast.window_open_swa = function() {
	if (s3forecast.swa_link) {
		s3forecast.window_open(s3forecast.swa_link);
	}
}
//------------------------------------------------------------------------------
s3forecast.window_close = function() {
	setTimeout(function(){ 
		try {
			window.close(); 
		} catch(e) {};
	}, 5);
}
//------------------------------------------------------------------------------
s3forecast.window_close_link = function(el) {
	var links = el.getElementsByTagName('a');
	for (var i=0; i<links.length; i++) {
		var link = links[i];
		link.addEventListener("click", function(e) {
			if (this.href || this.getAttribute('href')) {
				s3forecast.window_close();
			}
		});
	}
}
//------------------------------------------------------------------------------
s3forecast.location_list_select = function() {
	var list_items = document.getElementById('forecast_location_list_items');
	if (list_items.hasChildNodes()) {
		for (var i=0; i<list_items.childNodes.length; i++) {
			var el = list_items.childNodes[i];
			el.removeAttribute('is_selected');
			if (s3forecast.forecast_data.location.code == el.value) {
				el.setAttribute('is_selected', true);
			}
		}
	}
}
//------------------------------------------------------------------------------
s3forecast.location_list_set = function() {
	//------------------------------------------------------------------------
	var list_items = document.getElementById('forecast_location_list_items');
	list_items.loc_list_skip_blur = true;

	while (list_items.firstChild) {
		list_items.removeChild(list_items.firstChild);
 	}

	//------------------------------------------------------------------------
	var menu_rotate = document.createElement('div');
	menu_rotate.className = "forecast_location_item";
	var rotate_pref = s3forecast.utils.prefs_get('rotate');
	var rotate_text = s3forecast.i18n.get_string("options.locations.rotate");
	var rotate_text_list = rotate_text.split('${number}');
	list_items.appendChild(menu_rotate);
	//------------------------------------------------------------------------
	var menu_rotate_text_1 = document.createElement('span');
	menu_rotate_text_1.className = "checkbox";
	menu_rotate_text_1.setAttribute('is_checked', rotate_pref.enabled);
	s3forecast.utils.HTMLDOM_value(menu_rotate_text_1, rotate_text_list[0]);
	menu_rotate.appendChild(menu_rotate_text_1);
	//------------------------------------------------------------------------
	var menu_rotate_text_2 = document.createElement('span');
	menu_rotate_text_2.className = "forecast_location_rotate_number";
	menu_rotate_text_2.skip_click = true;
	s3forecast.utils.HTMLDOM_value(menu_rotate_text_2, rotate_pref.interval);
	menu_rotate_text_2.setAttribute('title', 60*rotate_pref.interval + 's');
	menu_rotate.appendChild(menu_rotate_text_2);
	//------------------------------------------------------------------------
	menu_rotate_text_2.addEventListener("click", function(event) {
		s3forecast.location_list_rotate_input(this);
	});
	//------------------------------------------------------------------------
	var menu_rotate_text_3 = document.createElement('span');
	s3forecast.utils.HTMLDOM_value(menu_rotate_text_3, rotate_text_list[1]);
	menu_rotate.appendChild(menu_rotate_text_3);

	//------------------------------------------------------------------------
	//------------------------------------------------------------------------
	menu_rotate.addEventListener("click", function(event) {
		if (! event.target.skip_click) {
			rotate_pref = s3forecast.utils.prefs_get('rotate');
			rotate_pref.enabled = ! rotate_pref.enabled;
			s3forecast.utils.prefs_set('rotate', rotate_pref);
			chrome.runtime.sendMessage({ 'action_prefs_set' : true, 'pref_name' : 'rotate', 'pref_value' : rotate_pref }, function(response) {
				chrome.runtime.sendMessage({ 'action' : 'rotate_location' }, function(response) {
					s3forecast.location_list_set();
				});
			});
		}
	});

	//------------------------------------------------------------------------
	var menu_refresh = document.createElement('div');
	menu_refresh.className = "forecast_location_item";
	s3forecast.utils.HTMLDOM_value(menu_refresh, s3forecast.i18n.get_string("menu.refresh"));
	list_items.appendChild(menu_refresh);
	menu_refresh.addEventListener("click", function() {
		chrome.runtime.sendMessage({ 'action' : 'refresh_forecast_data' }, function(response) {});
	});

	//------------------------------------------------------------------------
	var menu_newlocation = document.createElement('div');
	menu_newlocation.className = "forecast_location_item";
	s3forecast.utils.HTMLDOM_value(menu_newlocation, s3forecast.i18n.get_string("menu.newlocation"));
	menu_newlocation.setAttribute('is_separator', true);
	list_items.appendChild(menu_newlocation);
	menu_newlocation.addEventListener("click", function() {
		s3forecast.location_list_show(false);
		s3forecast.geolocation_show(true);
	});

	//------------------------------------------------------------------------
	var selected_option = null;
	var last_data = s3forecast.utils.prefs_get('last_data');
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
				chrome.runtime.sendMessage({ 'action' : 'rotate_location', 'code' : this.value }, function(response) { });
				this.setAttribute('is_checked', ! (String(this.getAttribute('is_checked')) == 'true'));
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
			});
		});
		option.appendChild(option_delete);
		//-----------------------------------------------------------------
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

		//-----------------------------------------------------------------
		var option_cc = document.createElement('div');
		option_cc.id = "forecast_location_item_cc";
		var forecast_data = last_data[s3forecast.location_list[i].code];
		try {
			forecast_data = s3forecast.processor.process_data(forecast_data, s3forecast.location_list[i]);
		} catch(e) {};
		//-----------------------------------------------------------------
		var option_cc_txt = document.createElement('span');
		s3forecast.utils.HTMLDOM_value(option_cc_txt, forecast_data.cc.temperature.high);
		option_cc.appendChild(option_cc_txt);
		//-----------------------------------------------------------------
		var option_cc_img = document.createElement('img');
		var cc_img_src = (forecast_data && forecast_data.cc) ? s3forecast.themes.get(forecast_data.cc.icon, 'forecastbar') : '';
		if (last_data[s3forecast.location_list[i].code].run_request) {
			cc_img_src = "/skin/images/plswait_3220.gif";
			option_cc_img.setAttribute('is_wait', true);
		}
		option_cc_img.src = cc_img_src;
		option_cc.appendChild(option_cc_img);

		option_cc.className = "forecast_location_item_cc";
		var title_cc = s3forecast.utils.create_forecast_title(forecast_data);
		option_cc.setAttribute('title', title_cc);
		option.appendChild(option_cc);

		//-----------------------------------------------------------------
		var option_span = document.createElement('span');
		option_span.id = "forecast_location_item_name";
		option_span.className = "forecast_location_item_name";
		s3forecast.utils.HTMLDOM_value(option_span, s3forecast.utils.make_location_short_name(s3forecast.location_list[i].name));
		option_span.setAttribute('title', s3forecast.location_list[i].name);
		option_span.name_original = s3forecast.location_list[i].name;
		option.appendChild(option_span);
		//-----------------------------------------------------------------
		option.value = s3forecast.location_list[i].code;
		option.addEventListener("click", function(event) {
			if (! event.target.skip_click) {
				chrome.runtime.sendMessage({ 'action' : 'change_forecast_data', 'code' : this.value }, function(response) {});
				if (selected_option) { selected_option.removeAttribute('is_selected'); }
				this.setAttribute('is_selected', true);
				selected_option = this;
			}
		});
		list_items.appendChild(option);
		//-----------------------------------------------------------------
		if (s3forecast.forecast_data.location.code == s3forecast.location_list[i].code) {
			option.setAttribute('is_selected', true);
			selected_option = option;
		}
	}
}
//------------------------------------------------------------------------------
s3forecast.location_list_show = function(is_show) {
	if (is_show) {
		s3forecast.location_list_set();
		document.getElementById('forecast_location').setAttribute('is_hidden', true);
		document.getElementById('forecast_location_list').removeAttribute('is_hidden');
		document.getElementById('forecast_location_list_items').focus();
	} else {
		document.getElementById('forecast_location').removeAttribute('is_hidden');
		document.getElementById('forecast_location_list').setAttribute('is_hidden', true);
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
	menu_rotate_input.loc_list_skip_blur = true;
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

			chrome.runtime.sendMessage({ 'action_prefs_set' : true, 'pref_name' : 'rotate', 'pref_value' : rotate_pref }, function(response) {
				chrome.runtime.sendMessage({ 'action' : 'rotate_location' }, function(response) {
					s3forecast.utils.HTMLDOM_value(menu_rotate_text, text);
					menu_rotate.parentNode.focus();
					menu_rotate.replaceChild(menu_rotate_text, menu_rotate_input);
				});
			});
		}
	});

	menu_rotate_input.addEventListener("blur", function(event) {
		var skip_blur = (event.relatedTarget && event.relatedTarget.loc_list_skip_blur) ? true : false;
		if (! skip_blur) {
			s3forecast.location_list_show(false);
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
	option_input.loc_list_skip_blur = true;
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
				option.parentNode.focus();
				option.replaceChild(option_span, option_input);
			});
		}
	});


	option_input.addEventListener("blur", function(event) {
		var skip_blur = (event.relatedTarget && event.relatedTarget.loc_list_skip_blur) ? true : false;
		if (! skip_blur) {
			s3forecast.location_list_show(false);
		}
	});
}
//------------------------------------------------------------------------------
s3forecast.button_change_location = function(code) {
	chrome.runtime.sendMessage({ 'action' : 'change_forecast_data', 'code' : code }, function(response) {});
}
//------------------------------------------------------------------------------
s3forecast.geolocation_show = function(is_show) {
	if (is_show) {
		document.getElementById('geolocation_header').removeAttribute('is_hidden');
		document.getElementById('geolocation_search_text').setAttribute('is_hidden', true);
		document.getElementById('geolocation_search_button').setAttribute('is_hidden', true);

		document.getElementById('geolocation_form').geolocation_search_text.value = '';
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
s3forecast.set_forecast_data = function(forecast_data) {
	if (! forecast_data) { return; }

	//------------------------------------------------------------------------
	var current = document.getElementById('menu_day_box_cc');
	s3forecast.utils.HTMLDOM_value(s3forecast.utils.get_element(current, 'menu_day_date'), forecast_data.cc.date_locale);
	s3forecast.utils.HTMLDOM_value(s3forecast.utils.get_element(current, 'menu_day_temp_now'), forecast_data.cc.temperature.high);
	s3forecast.utils.HTMLDOM_value(s3forecast.utils.get_element(current, 'menu_day_temp_realfeel'), forecast_data.cc.realfeel.high);
	s3forecast.utils.get_element(current, 'menu_day_icon').src = s3forecast.themes.get(forecast_data.cc.icon, 'large');

	//------------------------------------------------------------------------
	for (var i=0; i<=5; i++) {
		var f = forecast_data.forecast[i];
		var box = document.getElementById('menu_day_box_' + i);
		var template = document.getElementById('menu_day_template_box').cloneNode(true);

		while (box.firstChild) {
			box.removeChild(box.firstChild);
	 	}
		box.appendChild(template);

		s3forecast.utils.HTMLDOM_value(s3forecast.utils.get_element(template, 'menu_day_name'), f.day.day);
		s3forecast.utils.HTMLDOM_value(s3forecast.utils.get_element(template, 'menu_day_date'), f.day.date_locale);
		s3forecast.utils.HTMLDOM_value(s3forecast.utils.get_element(template, 'menu_day_temp_high'), f.day.temperature.high);
		s3forecast.utils.HTMLDOM_value(s3forecast.utils.get_element(template, 'menu_day_temp_low'), f.day.temperature.low);
		s3forecast.utils.get_element(template, 'menu_day_icon').src = s3forecast.themes.get(f.day.icon, 'large');
	}

	//------------------------------------------------------------------------
	if (forecast_data.swa && forecast_data.swa.isActive && s3forecast.utils.prefs_get('warning_swa')) {
		document.getElementById('forecast_data_warning_swa').removeAttribute('is_hidden');
		s3forecast.swa_link = forecast_data.swa.link;
		var text_list = [];
		for (var i=0; i<forecast_data.swa.alerts.length; i++) {
			text_list.push(forecast_data.swa.alerts[i].text);
		}
		s3forecast.utils.HTMLDOM_value(document.getElementById('forecast_data_warning_swa'), 
			s3forecast.utils.parse_template(s3forecast.i18n.get_string("features.swa"), { "message" :  text_list.join('; ') })
		);
	}

	s3forecast.selected_forecast_data(s3forecast.menu_selected);
}
//------------------------------------------------------------------------------
s3forecast.view_data = function() {
	var view_data_top = document.getElementById('view_data_top');
	var view_data_bottom = document.getElementById('view_data_bottom');
	while (view_data_top.firstChild) { view_data_top.removeChild(view_data_top.firstChild); }
	while (view_data_bottom.firstChild) { view_data_bottom.removeChild(view_data_bottom.firstChild); }

	if (s3forecast.menu_selected == 'cc') {
		var cc = s3forecast.forecast_data.cc;

		var template_header = document.getElementById('view_data_template_header_cc').cloneNode(true);
		s3forecast.utils.get_element(template_header, 'link_details').href = cc.links.quicklook;
		s3forecast.utils.get_element(template_header, 'link_hourly').href = cc.links.hourly;
		s3forecast.utils.get_element(template_header, 'link_day5').href = cc.links.day5;
		if (s3forecast.utils.prefs_get('radar_type') == 'windy.com') {
//			s3forecast.utils.get_element(template_header, 'link_radar').href = 'https://www.windy.com/?' + s3forecast.utils.prefs_get('radar_layer') + ',' + s3forecast.forecast_data.location.latitude + ',' + s3forecast.forecast_data.location.longitude + ',7';
			s3forecast.utils.get_element(template_header, 'link_radar').href = 'https://www.windy.com/' + s3forecast.forecast_data.location.latitude + '/' + s3forecast.forecast_data.location.longitude + '?' + s3forecast.utils.prefs_get('radar_layer') + ',' + s3forecast.forecast_data.location.latitude + ',' + s3forecast.forecast_data.location.longitude;
		} else {
			s3forecast.utils.get_element(template_header, 'link_radar').href = s3forecast.utils.get_radar_src(s3forecast.forecast_data.radar.links.regional.animated);
		}
		s3forecast.window_close_link(template_header);

		s3forecast.utils.HTMLDOM_value(s3forecast.utils.get_element(template_header, 'date_local'), cc.date_locale);
		s3forecast.utils.HTMLDOM_value(s3forecast.utils.get_element(template_header, 'cc_time'), cc.time);

		var template_top = document.getElementById('view_data_template_cc').cloneNode(true);
		template_top = s3forecast.view_data_setup(template_top, cc);
		s3forecast.utils.HTMLDOM_value(s3forecast.utils.get_element(template_top, 'forecast_humidity'), cc.humidity);
		s3forecast.utils.HTMLDOM_value(s3forecast.utils.get_element(template_top, 'forecast_dewpoint'), cc.dewpoint);
		s3forecast.utils.HTMLDOM_value(s3forecast.utils.get_element(template_top, 'forecast_pressure_value'), cc.pressure.value);
		s3forecast.utils.HTMLDOM_value(s3forecast.utils.get_element(template_top, 'forecast_pressure_trend'), cc.pressure.trend_symbol);
		s3forecast.utils.HTMLDOM_value(s3forecast.utils.get_element(template_top, 'forecast_precipitation_cc'), cc.precipitation.all);
		s3forecast.utils.HTMLDOM_value(s3forecast.utils.get_element(template_top, 'forecast_visibility'), cc.visibility);

		var template_bottom = document.getElementById('view_data_bottom_template_cc').cloneNode(true);
		var view_data_radar = null;
		//-----------------------------------------------------------------
		if (s3forecast.utils.check_radar_iframe()) {
			view_data_radar = document.createElement('iframe');
			view_data_radar.addEventListener("mouseover", function() { 
				view_data_radar.setAttribute('show_radar', true);
			});
			view_data_radar.addEventListener("mouseout", function() { 
				view_data_radar.removeAttribute('show_radar');
			});
			view_data_radar.style.padding = '1px';
		}
		//-----------------------------------------------------------------
		else {
			view_data_radar = document.createElement('img');
			view_data_radar.addEventListener("click", function() { 
				s3forecast.is_radar_show = ! this.hasAttribute('show_radar');
				s3forecast.radar_show(this, s3forecast.is_radar_show);
			});
			view_data_radar.setAttribute('alt', s3forecast.i18n.get_string("features.radar"));
			view_data_radar.setAttribute('title', s3forecast.i18n.get_string("features.radar"));
		}
		//-----------------------------------------------------------------
		view_data_radar.id = 'view_data_radar';
		view_data_radar.setAttribute('width', 350);
		view_data_radar.setAttribute('height', 210);
		view_data_radar.setAttribute('border', 0);
		template_bottom.appendChild(view_data_radar);

//		var view_data_radar = s3forecast.utils.get_element(template_bottom, 'view_data_radar');
		s3forecast.load_radar_image(view_data_radar, s3forecast.forecast_data.radar.images.regional.medium);
		s3forecast.radar_show(view_data_radar, s3forecast.is_radar_show);
		view_data_top.appendChild(template_header);
		view_data_top.appendChild(template_top);
		view_data_bottom.appendChild(template_bottom);
	}
	else {
		var forecast = s3forecast.forecast_data.forecast[s3forecast.menu_selected].day;

		var template_header = document.getElementById('view_data_template_header_day').cloneNode(true);
		s3forecast.utils.HTMLDOM_value(s3forecast.utils.get_element(template_header, 'forecast_day'), forecast.day);
		s3forecast.utils.get_element(template_header, 'link_details').href = forecast.links.details;
		s3forecast.utils.HTMLDOM_value(s3forecast.utils.get_element(template_header, 'date_local'), forecast.date_locale);
		s3forecast.window_close_link(template_header);

		var template_top = document.getElementById('view_data_template_day').cloneNode(true);
		template_top = s3forecast.view_data_setup(template_top, forecast);
		s3forecast.utils.HTMLDOM_value(s3forecast.utils.get_element(template_top, 'forecast_precipitation_day'), forecast.precip.all);
		s3forecast.utils.HTMLDOM_value(s3forecast.utils.get_element(template_top, 'forecast_sunrise'), forecast.sun.rise);
		s3forecast.utils.get_element(template_top, 'forecast_temp').setAttribute('is_day', true);


		var forecast_night = s3forecast.forecast_data.forecast[s3forecast.menu_selected].night;

		var template_header_night = document.getElementById('view_data_template_header_day').cloneNode(true);
		s3forecast.utils.HTMLDOM_value(s3forecast.utils.get_element(template_header_night, 'forecast_day'), forecast_night.day);
		s3forecast.utils.get_element(template_header_night, 'link_details').href = forecast_night.links.details;
		s3forecast.utils.HTMLDOM_value(s3forecast.utils.get_element(template_header_night, 'date_local'), forecast_night.date_locale);
		s3forecast.window_close_link(template_header_night);

		var template_bottom = document.getElementById('view_data_template_day').cloneNode(true);
		template_bottom = s3forecast.view_data_setup(template_bottom, forecast_night);
		s3forecast.utils.HTMLDOM_value(s3forecast.utils.get_element(template_bottom, 'forecast_precipitation_day'), forecast_night.precip.all);
		s3forecast.utils.HTMLDOM_value(s3forecast.utils.get_element(template_bottom, 'forecast_sunset'), forecast_night.sun.set);
		s3forecast.utils.HTMLDOM_value(s3forecast.utils.get_element(template_bottom, 'forecast_moon'), forecast_night.moon.phase);
		s3forecast.utils.get_element(template_bottom, 'forecast_temp').setAttribute('is_night', true);

		s3forecast.view_data_remove_unused(template_top, ['row_sunset', 'row_moon' ]);
		s3forecast.view_data_remove_unused(template_bottom, ['row_sunrise', 'row_uvindex' ]);
		s3forecast.view_data_remove_unused(template_header_night, ['forecast_links' ]);

		view_data_top.appendChild(template_header);
		view_data_top.appendChild(template_top);

		view_data_bottom.appendChild(template_header_night);
		view_data_bottom.appendChild(template_bottom);
	}
}
//------------------------------------------------------------------------------
s3forecast.radar_show = function(radar, is_show) {
	if (is_show) {
		if (! /^http/.test(radar.src)) {
			s3forecast.load_radar_image(radar, s3forecast.forecast_data.radar.images.regional.medium, true);
		}
		radar.setAttribute('show_radar', true);
		if (! s3forecast.utils.check_radar_iframe()) {
			var url = s3forecast.radar_src(s3forecast.forecast_data.radar.images.regional.large);
			var img = new Image();
			img.onload = function() {
				radar.src = url;
			}
			img.src = url;
		}
	} else {
		radar.removeAttribute('show_radar'); 
		s3forecast.load_radar_image(radar, s3forecast.forecast_data.radar.images.regional.medium);
	}
}
//------------------------------------------------------------------------------
s3forecast.radar_src = function(radar_url) {
	return s3forecast.utils.get_radar_src(radar_url);
}
//------------------------------------------------------------------------------
s3forecast.load_radar_image = function(view_data_radar, url, is_big) {
	if (s3forecast.radar_timer) {
		clearTimeout(s3forecast.radar_timer);
		s3forecast.radar_timer = null;
	}
	url = s3forecast.radar_src(url);

	//------------------------------------------------------------------------
	if (s3forecast.utils.check_radar_iframe()) {
		if (s3forecast.utils.prefs_get('radar_type') == 'windy.com') {
			view_data_radar.src = 'https://embed.windy.com/embed2.html?lat=' + s3forecast.forecast_data.location.latitude + '&lon=' + s3forecast.forecast_data.location.longitude + '&zoom=7&level=surface&overlay=' + s3forecast.utils.prefs_get('radar_layer') + '&menu=&message=true&marker=&calendar=&pressure=&type=map&location=coordinates&detail=&detailLat=' + s3forecast.forecast_data.location.latitude + '&detailLon=' + s3forecast.forecast_data.location.longitude + '&metricWind=m%2Fs&metricTemp=%C2%B0C';
		} else {
			view_data_radar.src = url;
		}
	}
	//------------------------------------------------------------------------
	else {
		var img = new Image();
		img.onload = function() {
			if (s3forecast.radar_timer) {
				clearTimeout(s3forecast.radar_timer);
				s3forecast.radar_timer = null;
			}
			view_data_radar.src = url;
		}
		img.src = url;
		
		s3forecast.radar_timer = setTimeout(function(){ 
			view_data_radar.src = (is_big) ? '/skin/images/radar_loading_big.gif' : '/skin/images/radar_loading.gif';
		}, 100);
	}
}
//------------------------------------------------------------------------------
s3forecast.view_data_remove_unused = function(template, unused_list) {
	for (var i=0; i<unused_list.length; i++) {
		var el = s3forecast.utils.get_element(template, unused_list[i]);
		if (el) {
			el.parentNode.removeChild(el);
		}
	}
}
//------------------------------------------------------------------------------
s3forecast.view_data_setup = function(template, forecast) {
	var text_desc = forecast.text.lng;
	if (text_desc.length > 65) {
		text_desc = text_desc.substr(0, 65) + '...';
		s3forecast.utils.get_element(template, 'forecast_description').setAttribute('is_text_long', true);
	}
	s3forecast.utils.HTMLDOM_value(s3forecast.utils.get_element(template, 'forecast_description'), text_desc);
	s3forecast.utils.get_element(template, 'forecast_description').setAttribute('title', forecast.text.lng);
	if (forecast.text.lng == forecast.text.shrt) {
		s3forecast.utils.get_element(template, 'forecast_description').setAttribute('is_hidden', true);
	}
	s3forecast.utils.HTMLDOM_value(s3forecast.utils.get_element(template, 'forecast_description_short'), forecast.text.shrt);
	s3forecast.utils.get_element(template, 'forecast_description_short').setAttribute('title', forecast.text.lng);
	s3forecast.utils.get_element(template, 'forecast_icon').src = s3forecast.themes.get(forecast.icon, 'large');
	s3forecast.utils.HTMLDOM_value(s3forecast.utils.get_element(template, 'forecast_temp'), forecast.temperature.high);
	s3forecast.utils.HTMLDOM_value(s3forecast.utils.get_element(template, 'forecast_realfeel'), forecast.realfeel.high);
	s3forecast.utils.HTMLDOM_value(s3forecast.utils.get_element(template, 'forecast_winds'), (forecast.wind.direction) ? forecast.wind.direction + ', ' + forecast.wind.speed : forecast.wind.speed);
	s3forecast.utils.HTMLDOM_value(s3forecast.utils.get_element(template, 'forecast_uvindex_text'), forecast.uv.text);
	s3forecast.utils.HTMLDOM_value(s3forecast.utils.get_element(template, 'forecast_uvindex_index'), forecast.uv.index);
	s3forecast.utils.HTMLDOM_value(s3forecast.utils.get_element(template, 'forecast_uvindex_minutes'), forecast.uv.minutes);

	return template;
}
//------------------------------------------------------------------------------
s3forecast.selected_forecast_data = function(menu_name) {
	document.getElementById('menu_day_box_' + s3forecast.menu_selected).removeAttribute('is_selected');
	document.getElementById('menu_day_box_' + menu_name).setAttribute('is_selected', true);
	s3forecast.menu_selected = menu_name;
	s3forecast.view_data();
	setTimeout(function(){
		s3forecast.check_size_body();
	}, 300);
}
//------------------------------------------------------------------------------
s3forecast.show_icon_wait = function(is_show) {
	if (is_show) {
		document.getElementById('icon_wait').removeAttribute('is_hidden');
	} else {
		document.getElementById('icon_wait').setAttribute('is_hidden', true);
	}
}
//------------------------------------------------------------------------------
chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		//------------------------------------------------------------------
		if (! request) { return; }
		//------------------------------------------------------------------
		if (request.action_reload_popup) {
			s3forecast.get_forecast_data(request.forecast_data, request.location_list);
			if (request.is_new) {
				s3forecast.geolocation_show(false);
			}
			if (request.prefs_list) {
				s3forecast.prefs.list = request.prefs_list;
				s3forecast.location_list_set();
			}
		}
		//------------------------------------------------------------------
		if (request.action_update_forecast) {
			if (request.prefs_list) {
				s3forecast.prefs.list = request.prefs_list;
				s3forecast.location_list_set();
			}
		}
		//------------------------------------------------------------------
		else if (request.action_prepare_popup) {
			s3forecast.show_icon_wait(true);
		}
		//------------------------------------------------------------------
		else if (request.find_location_result) {
			if (request.geolocation_id == s3forecast.geolocation_id) {
				s3forecast.geolocation_messages.push({ 'action' : 'find_location_result', 'text' : JSON.stringify(request) });
			}
		}
		//------------------------------------------------------------------
		else if (request.action_geolocation) {
			if (request.geolocation_id == s3forecast.geolocation_id) {
				//------------------------------------------------------
				if (request.who == 'loaded') {
					var param = {
						'resource' : 'popup',
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
window.addEventListener("load", s3forecast.init_0);
