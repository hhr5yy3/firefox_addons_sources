s3forecast.forecastbar = {};

s3forecast.forecastbar.mutation_observer = null;
s3forecast.forecastbar.mutation_count = 5;
s3forecast.forecastbar.box = null;
s3forecast.forecastbar.box_id = 'forecastfox-boljdehmejbffnfiiicckjhafabdepnd';
s3forecast.forecastbar.location_list = null;
s3forecast.forecastbar.zoom_index = 1;
s3forecast.forecastbar.radar_image = null;

s3forecast.forecastbar.is_view_vertical = false;
s3forecast.forecastbar.is_position = 'bottom-right';
s3forecast.forecastbar.is_collapsed = false;
s3forecast.forecastbar.button_collapse = null;
s3forecast.forecastbar.button_expand = null;
s3forecast.forecastbar.button_reload = null;
s3forecast.forecastbar.current_tooltip_box = null;
s3forecast.forecastbar.contextmenu = null;

s3forecast.forecastbar.fontColor = '#222222';
s3forecast.forecastbar.borderColor = '#999999';
s3forecast.forecastbar.backgroundColor = "#EEEEEE";
s3forecast.forecastbar.backgroundColor_hover = "#C8C8C8";

//------------------------------------------------------------------------------
s3forecast.forecastbar.init_0 = function(init_count) {
	var lib_list = ['utils', 'prefs', 'i18n', 'themes' ];
	var lib_load_ok = true;
	//------------------------------------------------------------------------
	for (var i=0; i<lib_list.length; i++) {
		if (! s3forecast[lib_list[i]]) {
			lib_load_ok = false;
			break;
		}
	}
	//------------------------------------------------------------------------
	if (! lib_load_ok) {
		init_count--;
		if (init_count > 0) {
			setTimeout(function(){ s3forecast.forecastbar.init_0(init_count); }, 50);
		}
		return;
	}
	//------------------------------------------------------------------------
	try {
		chrome.runtime.onMessage.removeListener(s3forecast.forecastbar.onMessage);
	} catch(e) {
	}

	s3forecast.prefs.init(function(){
		s3forecast.themes.init(null, s3forecast.forecastbar.init);
		chrome.runtime.onMessage.addListener(s3forecast.forecastbar.onMessage);
	});
}
//------------------------------------------------------------------------------
s3forecast.forecastbar.init = function() {
	//------------------------------------------------------------------------
	chrome.runtime.sendMessage({ 'action' : 'get_zoom_tab' }, function(response) {
		if (s3forecast.forecastbar.create_forecastbar_box()) {
			chrome.runtime.sendMessage({ 'action' : 'get_forecast_data' }, function(response) {
				if (! response) {
					response = { 'forecast_data' : { 'location' : { 'name' : '-', 'name_short' : '-' } } };
				}
				if (response.prefs_not_init) {
					setTimeout(function(){ s3forecast.forecastbar.init(); }, 1000);
					return;
				}
				s3forecast.forecastbar.set_forecast_data(response.forecast_data, response.location_list);
			});
		}
	});
}
//------------------------------------------------------------------------------
s3forecast.forecastbar.create_forecastbar_box = function() {
	s3forecast.forecastbar.is_view_vertical = s3forecast.utils.prefs_get('forecastbar_view_vertical');
	s3forecast.forecastbar.is_position = s3forecast.utils.prefs_get('forecastbar_position');

	//------------------------------------------------------------------------
	if (s3forecast.forecastbar.mutation_observer) {
		try {
			s3forecast.forecastbar.mutation_observer.disconnect();
		} catch(e) {
		}
	}
	//------------------------------------------------------------------------
	if (! s3forecast.forecastbar.box) {
		s3forecast.forecastbar.box = document.getElementById(s3forecast.forecastbar.box_id);
	}
	//------------------------------------------------------------------------
	if (s3forecast.forecastbar.box) {
		try {
			s3forecast.forecastbar.box.parentNode.removeChild(s3forecast.forecastbar.box);
		} catch(e) {
		}
	}

	//------------------------------------------------------------------------
	var forecastbar_show = s3forecast.utils.prefs_get('forecastbar_show');
	if (forecastbar_show) {
		var exclude_links = s3forecast.utils.prefs_get('forecastbar_exclude_links');
		var link = new String(document.location);
		for (var i=0; i<exclude_links.length; i++) {
			var exclude = exclude_links[i].replace(/\s/g, '');
			if (/\*$/.test(exclude)) {
				exclude = exclude.replace(/\*+$/, '');
				if (link.indexOf(exclude) == 0) {
					forecastbar_show = false;
				}
			} else if (link == exclude) {
				forecastbar_show = false;
			}
		}
	}
	if (! forecastbar_show) {
		return false;
	}

	//------------------------------------------------------------------------
	s3forecast.forecastbar.box = document.createElement('div');
	s3forecast.forecastbar.box.id = s3forecast.forecastbar.box_id;
	try {
		s3forecast.forecastbar.reset_style(s3forecast.forecastbar.box);
	} catch(e) {
		return false;
	}
	document.body.appendChild(s3forecast.forecastbar.box);
	s3forecast.forecastbar.set_print_style();
	s3forecast.forecastbar.box.style.position = "fixed";
	s3forecast.forecastbar.box.style.border = "3px " + s3forecast.forecastbar.borderColor + " double";
	//------------------------------------------------------------------------
	if (s3forecast.forecastbar.is_position == 'top-left') {
		s3forecast.forecastbar.box.style.left = "0px";
		s3forecast.forecastbar.box.style.top = "0px";
		s3forecast.forecastbar.box.style.borderLeft = "1px " + s3forecast.forecastbar.borderColor + " solid";
		s3forecast.forecastbar.box.style.borderTop = "1px " + s3forecast.forecastbar.borderColor + " solid";
		s3forecast.forecastbar.box.style.borderBottomRightRadius = "3px";
		s3forecast.forecastbar.box.style.textAlign = "left";
		s3forecast.forecastbar.box.is_right0 = false;
		s3forecast.forecastbar.box.style.transformOrigin = 'top left';
	}
	else if (s3forecast.forecastbar.is_position == 'top-right') {
		s3forecast.forecastbar.box.style.right = "0px";
		s3forecast.forecastbar.box.style.top = "0px";
		s3forecast.forecastbar.box.style.borderRight = "1px " + s3forecast.forecastbar.borderColor + " solid";
		s3forecast.forecastbar.box.style.borderTop = "1px " + s3forecast.forecastbar.borderColor + " solid";
		s3forecast.forecastbar.box.style.borderBottomLeftRadius = "3px";
		s3forecast.forecastbar.box.style.textAlign = "right";
		s3forecast.forecastbar.box.is_right0 = true;
		s3forecast.forecastbar.box.style.transformOrigin = 'top right';
	}
	else if (s3forecast.forecastbar.is_position == 'bottom-left') {
		s3forecast.forecastbar.box.style.left = "0px";
		s3forecast.forecastbar.box.style.bottom = "0px";
		s3forecast.forecastbar.box.style.borderLeft = "1px " + s3forecast.forecastbar.borderColor + " solid";
		s3forecast.forecastbar.box.style.borderBottom = "1px " + s3forecast.forecastbar.borderColor + " solid";
		s3forecast.forecastbar.box.style.borderTopRightRadius = "3px";
		s3forecast.forecastbar.box.style.textAlign = "left";
		s3forecast.forecastbar.box.is_right0 = false;
		s3forecast.forecastbar.box.style.transformOrigin = 'bottom left';
	}
	else {
		s3forecast.forecastbar.box.style.right = "0px";
		s3forecast.forecastbar.box.style.bottom = "0px";
		s3forecast.forecastbar.box.style.borderRight = "1px " + s3forecast.forecastbar.borderColor + " solid";
		s3forecast.forecastbar.box.style.borderBottom = "1px " + s3forecast.forecastbar.borderColor + " solid";
		s3forecast.forecastbar.box.style.borderTopLeftRadius = "3px";
		s3forecast.forecastbar.box.style.textAlign = "right";
		s3forecast.forecastbar.box.is_right0 = true;
		s3forecast.forecastbar.box.style.transformOrigin = 'bottom right';
	}
	//------------------------------------------------------------------------
	s3forecast.forecastbar.box.style.zIndex = "9999999998";
	s3forecast.forecastbar.box.style.margin = "0";
	s3forecast.forecastbar.box.style.padding = "0px 2px";
	s3forecast.forecastbar.box.style.backgroundColor = s3forecast.forecastbar.backgroundColor;
	s3forecast.forecastbar.box.style.color = s3forecast.forecastbar.fontColor;
	s3forecast.forecastbar.box.style.display = "inline-block";

	//------------------------------------------------------------------------
	s3forecast.forecastbar.box.addEventListener("contextmenu", function(e){
		e.preventDefault();
		s3forecast.forecastbar.contextmenu_create(e);
	});

	//------------------------------------------------------------------------
	if (s3forecast.utils.prefs_get('theme_black_white')) {
		s3forecast.forecastbar.box.style.setProperty ("filter", "brightness(90%) contrast(120%) saturate(0%)", "important");
	}
	//------------------------------------------------------------------------
	var observer = new MutationObserver(function(mutations) {
		if (s3forecast.forecastbar.box.is_right0) {
			var body_style = window.getComputedStyle(document.body, "");
			var has_scroll = !((body_style.overflow == "hidden")  || (body_style.overflowY == "hidden"));
			if (has_scroll) {
				var html_style = window.getComputedStyle(document.documentElement, "");
				has_scroll = !((html_style.overflow == "hidden")  || (html_style.overflowY == "hidden"));
			}
			if (! has_scroll) {
				observer.disconnect();
				s3forecast.forecastbar.box.is_right0 = false;
				s3forecast.forecastbar.box.style.right = "15px";
				s3forecast.forecastbar.box.style.borderRight = "3px " + s3forecast.forecastbar.borderColor + " double";
			}
		}
	});
	observer.observe(document.body, { childList: true, subtree: true, attributes: true });

	//------------------------------------------------------------------------
	s3forecast.forecastbar.set_zoom(s3forecast.forecastbar.zoom_index);

	//------------------------------------------------------------------------
	return true;
}
//------------------------------------------------------------------------------
s3forecast.forecastbar.set_zoom = function(zoom_index) {
	s3forecast.forecastbar.zoom_index = zoom_index;
	try {
		s3forecast.forecastbar.box.style.transform = 'scale(' + 1/ zoom_index + ')';
	} catch(e) {
	}
}
//------------------------------------------------------------------------------
s3forecast.forecastbar.contextmenu_create = function(e) {
	if (s3forecast.forecastbar.current_tooltip_box) {
		s3forecast.forecastbar.tooltip_hide(s3forecast.forecastbar.current_tooltip_box);
	}
	s3forecast.forecastbar.contextmenu_destroy();

	//------------------------------------------------------------------------
	s3forecast.forecastbar.contextmenu = document.createElement('div');
	s3forecast.forecastbar.reset_style(s3forecast.forecastbar.contextmenu);
	s3forecast.forecastbar.box.appendChild(s3forecast.forecastbar.contextmenu);
//	s3forecast.forecastbar.contextmenu.style.position = "fixed";
	s3forecast.forecastbar.contextmenu.style.position = "absolute";
	s3forecast.forecastbar.contextmenu.style.zIndex = "9999999999";
	s3forecast.forecastbar.contextmenu.style.margin = "0";
	s3forecast.forecastbar.contextmenu.style.padding = "2px";
	s3forecast.forecastbar.contextmenu.style.border = "1px " + s3forecast.forecastbar.borderColor + " solid";
	s3forecast.forecastbar.contextmenu.style.backgroundColor = s3forecast.forecastbar.backgroundColor;
	s3forecast.forecastbar.contextmenu.style.color = s3forecast.forecastbar.fontColor;
	s3forecast.forecastbar.contextmenu.style.display = "inline-block";
	s3forecast.forecastbar.contextmenu.style.boxShadow = "0 0 10px";
	s3forecast.forecastbar.contextmenu.setAttribute('tabindex', 0);
	s3forecast.forecastbar.contextmenu.focus();
	s3forecast.forecastbar.contextmenu.addEventListener("blur", function(e){ s3forecast.forecastbar.contextmenu_destroy(); });
	s3forecast.forecastbar.contextmenu.mouseX = e.clientX-10;
	s3forecast.forecastbar.contextmenu.mouseY = e.clientY-10;

	//------------------------------------------------------------------------
	var menu_list = [ 'improve', 'homepage', 'accuweather', 'share', 'troubleshooting', 'refresh', 'locations', 'options' ];
	//------------------------------------------------------------------------
	for (var i=0; i<menu_list.length; i++) {
		var menu = document.createElement('div')
		s3forecast.forecastbar.set_box_style(menu);
		s3forecast.forecastbar.contextmenu.appendChild(menu);
		menu.appendChild(document.createTextNode(s3forecast.utils.get_string( 'menu.' + menu_list[i] )));
		menu.action = menu_list[i];
		menu.style.display = 'block';
		menu.style.padding = '2px';
		menu.style.paddingLeft = '22px';
		menu.style.background = 'url("' + chrome.extension.getURL('/skin/images/menu_' + menu_list[i] + '.png') + '") no-repeat';
		menu.style.backgroundSize = '16px';
		menu.style.backgroundPosition = '3px center';

		menu.addEventListener("click", function(e) {
			s3forecast.forecastbar.contextmenu_click(this.action);
		});
		menu.addEventListener("mouseover", function(e) {
			this.style.backgroundColor = s3forecast.forecastbar.backgroundColor_hover;
		});
		menu.addEventListener("mouseout", function(e) {
			this.style.backgroundColor = s3forecast.forecastbar.backgroundColor;
		});

		if (i != (menu_list.length-1)) {
			s3forecast.forecastbar.contextmenu_separator();
		}
	}

	//------------------------------------------------------------------------
	s3forecast.forecastbar.contextmenu_position();
}
//------------------------------------------------------------------------------
s3forecast.forecastbar.contextmenu_position = function() {
	var mouseX = s3forecast.forecastbar.contextmenu.mouseX;
	var mouseY = s3forecast.forecastbar.contextmenu.mouseY;

	var contextmenu_width = s3forecast.forecastbar.contextmenu.offsetWidth;
	var contextmenu_height = s3forecast.forecastbar.contextmenu.offsetHeight;

	s3forecast.forecastbar.contextmenu.style.minWidth = contextmenu_width + 'px';
	s3forecast.forecastbar.contextmenu.style.minHeight = contextmenu_height + 'px';

	var page_height = Math.min(document.body.clientHeight, document.documentElement.clientHeight);

	if ((mouseX + contextmenu_width) > (document.documentElement.clientWidth - 10)) {
		mouseX = document.documentElement.clientWidth - (contextmenu_width + 10);
	}
	if ((mouseY + contextmenu_height) > (page_height - 2)) {
		mouseY = page_height - (contextmenu_height + 2);
	}
	//------------------------------------------------------------------------
	if (mouseX < 0) { mouseX = 0; }
	if (mouseY < 0) { mouseY = 0; }

	//------------------------------------------------------------------------
	var box_width = s3forecast.forecastbar.box.offsetWidth;
	var box_height = s3forecast.forecastbar.box.offsetHeight;
	var right = document.documentElement.clientWidth - mouseX - contextmenu_width;
	var bottom = page_height - mouseY - contextmenu_height;
	//------------------------------------------------------------------------
	if (right < 0) { right = 0; }
	if (bottom < 0) { bottom = 0; }
	//------------------------------------------------------------------------

	if (s3forecast.forecastbar.is_position == 'top-left') {
		var left = mouseX;
		var top = mouseY;
		s3forecast.forecastbar.contextmenu.style.left = left + "px";
		s3forecast.forecastbar.contextmenu.style.top = top + "px";
	}
	else if (s3forecast.forecastbar.is_position == 'top-right') {
		var top = mouseY;
		s3forecast.forecastbar.contextmenu.style.right = right + "px";
		s3forecast.forecastbar.contextmenu.style.top = top + "px";
	}
	else if (s3forecast.forecastbar.is_position == 'bottom-left') {
		var left = mouseX;
		s3forecast.forecastbar.contextmenu.style.left = left + "px";
		s3forecast.forecastbar.contextmenu.style.bottom = bottom + "px";
	}
	else {
		s3forecast.forecastbar.contextmenu.style.right = right + "px";
		s3forecast.forecastbar.contextmenu.style.bottom = bottom + "px";
	}

	s3forecast.forecastbar.contextmenu.mouseX = mouseX;
	s3forecast.forecastbar.contextmenu.mouseY = mouseY;
}
//------------------------------------------------------------------------------
// for position: fixed, but style "transform" breaks the style "position"...
// https://www.w3.org/Bugs/Public/show_bug.cgi?id=16328
//------------------------------------------------------------------------------
s3forecast.forecastbar.contextmenu_position_off = function() {
	var mouseX = s3forecast.forecastbar.contextmenu.mouseX;
	var mouseY = s3forecast.forecastbar.contextmenu.mouseY;

	var contextmenu_width = s3forecast.forecastbar.contextmenu.offsetWidth;
	var contextmenu_height = s3forecast.forecastbar.contextmenu.offsetHeight;

	s3forecast.forecastbar.contextmenu.style.minWidth = contextmenu_width + 'px';
	s3forecast.forecastbar.contextmenu.style.minHeight = contextmenu_height + 'px';

	//------------------------------------------------------------------------
	if ((mouseX + contextmenu_width) > (document.documentElement.clientWidth - 10)) {
		mouseX = document.documentElement.clientWidth - (contextmenu_width + 10);
	}
	if ((mouseY + contextmenu_height) > (document.documentElement.clientHeight - 2)) {
		mouseY = document.documentElement.clientHeight - (contextmenu_height + 2);
	}
	//------------------------------------------------------------------------
	s3forecast.forecastbar.contextmenu.style.left = mouseX + "px";
	s3forecast.forecastbar.contextmenu.style.top = mouseY + "px";

	s3forecast.forecastbar.contextmenu.mouseX = mouseX;
	s3forecast.forecastbar.contextmenu.mouseY = mouseY;
}
//------------------------------------------------------------------------------
s3forecast.forecastbar.contextmenu_destroy = function() {
	if (s3forecast.forecastbar.contextmenu) {
		try {
			s3forecast.forecastbar.contextmenu.parentNode.removeChild(s3forecast.forecastbar.contextmenu);
		} catch(e) {
		}
		s3forecast.forecastbar.contextmenu = null;
	}
}
//------------------------------------------------------------------------------
s3forecast.forecastbar.contextmenu_click = function(action) {
	if (action == 'improve') {
		s3forecast.forecastbar.window_open('http://www.s3blog.org/addon-contribute/forecastfox-fix-version.html');
	} else if (action == 'homepage') {
		s3forecast.forecastbar.window_open('http://www.s3blog.org/forecastfox.html');
	} else if (action == 'accuweather') {
		s3forecast.forecastbar.window_open('http://www.accuweather.com/?partner=forecastfox');
	} else if (action == 'share') {
		s3forecast.forecastbar.window_open('http://www.s3blog.org/forecastfox.html?share=1');
	} else if (action == 'troubleshooting') {
		s3forecast.forecastbar.window_open('http://www.s3blog.org/forecastfox/support.html');
	} else if (action == 'refresh') {
		s3forecast.forecastbar.forecast_reload();
	} else if (action == 'locations') {
		s3forecast.forecastbar.contextmenu_location_list();
		return;
	} else if (action == 'options') {
		chrome.runtime.sendMessage({ 'action' : 'open_options_page' }, function(response) { });
	}
	s3forecast.forecastbar.contextmenu_destroy();
}
//------------------------------------------------------------------------------
s3forecast.forecastbar.contextmenu_separator = function() {
	var separator = document.createElement('div');
	s3forecast.forecastbar.reset_style(separator);
	separator.style.height = '1px';
	separator.style.borderTop = '1px dotted ' + s3forecast.forecastbar.borderColor;
	separator.style.margin = '2px';
	separator.style.display = 'block';
	s3forecast.forecastbar.contextmenu.appendChild(separator);
}
//------------------------------------------------------------------------------
s3forecast.forecastbar.contextmenu_location_list = function() {
	while (s3forecast.forecastbar.contextmenu.firstChild) {
		s3forecast.forecastbar.contextmenu.removeChild(s3forecast.forecastbar.contextmenu.firstChild);
	}
	//------------------------------------------------------------------------
	for (var i=0; i<s3forecast.forecastbar.location_list.length; i++) {
		var menu = document.createElement('div')
		s3forecast.forecastbar.set_box_style(menu);
		s3forecast.forecastbar.contextmenu.appendChild(menu);
		menu.appendChild(document.createTextNode( s3forecast.forecastbar.location_list[i].name ));
		menu.code = s3forecast.forecastbar.location_list[i].code;
		menu.style.display = 'block';
		menu.style.padding = '2px';
		if (s3forecast.forecastbar.location_list[i].current) {
			menu.style.fontWeight = 'bold';
		}
		menu.addEventListener("click", function(e) {
			s3forecast.forecastbar.change_location(this.code);
			s3forecast.forecastbar.contextmenu_destroy();
		});
		menu.addEventListener("mouseover", function(e) {
			this.style.backgroundColor = s3forecast.forecastbar.backgroundColor_hover;
		});
		menu.addEventListener("mouseout", function(e) {
			this.style.backgroundColor = s3forecast.forecastbar.backgroundColor;
		});

		if (i != (s3forecast.forecastbar.location_list.length-1)) {
			s3forecast.forecastbar.contextmenu_separator();
		}
	}

	//------------------------------------------------------------------------
	s3forecast.forecastbar.contextmenu_position();
}
//------------------------------------------------------------------------------
s3forecast.forecastbar.set_print_style = function() {
	var style_print = document.createElement('style');
	style_print.setAttribute('type', 'text/css');
	style_print.setAttribute('media', 'print');
	style_print.appendChild(document.createTextNode('#' + s3forecast.forecastbar.box_id + ' { display: none !important; }'));
	s3forecast.forecastbar.box.appendChild(style_print);
}
//------------------------------------------------------------------------------
s3forecast.forecastbar.set_forecast_data = function(forecast_data, location_list) {
	while (s3forecast.forecastbar.box.firstChild) {
		s3forecast.forecastbar.box.removeChild(s3forecast.forecastbar.box.firstChild);
	}

	//------------------------------------------------------------------------
	s3forecast.forecastbar.set_print_style();
	//------------------------------------------------------------------------
	if (location_list) {
		s3forecast.forecastbar.location_list = location_list;
	}
	//------------------------------------------------------------------------
	if (! forecast_data) {
		return;
	}
	s3forecast.forecastbar.forecast_data = forecast_data;

	//------------------------------------------------------------------------
	var forecastbar_forecast_days = s3forecast.utils.prefs_get('forecastbar_forecast_days');
	var forecastbar_days_or_nights = s3forecast.utils.prefs_get('forecastbar_days_or_nights');
	var forecastbar_day_name = s3forecast.utils.prefs_get('forecastbar_day_name');
	s3forecast.forecastbar.forecast_labels = s3forecast.utils.prefs_get('forecastbar_forecast_labels');
	s3forecast.forecastbar.is_collapsed = s3forecast.utils.prefs_get('forecastbar_is_collapsed');

	//------------------------------------------------------------------------
	if (forecast_data.cc && s3forecast.utils.prefs_get('forecastbar_cc')) {
		var current_box = document.createElement('div');
		s3forecast.forecastbar.set_box_style(current_box, true);
		current_box.style.textAlign = 'center';
		s3forecast.forecastbar.box.appendChild(current_box);
		//------------------------------------------------------------------------
		s3forecast.forecastbar.tooltip_create(s3forecast.forecastbar.tooltip_init(), current_box, function(mbox){
			s3forecast.forecastbar.tooltip_content(mbox.tooltip_box, 'cc', forecast_data);
		});
		//------------------------------------------------------------------------
		var location_name = s3forecast.utils.prefs_get('forecastbar_location_show') ? forecast_data.location.name_short + ' : ' : s3forecast.i18n.get_string('features.cc.now') + ' ';
		var forecastbar_current = s3forecast.forecastbar.create_forecast_data(location_name + forecast_data.cc.temperature.high, forecast_data.cc.icon);
		current_box.appendChild(forecastbar_current);
		current_box.addEventListener("click", function(e){ s3forecast.forecastbar.window_open(forecast_data.cc.links.quicklook); });
		if (! s3forecast.forecastbar.is_view_vertical) {
			s3forecast.forecastbar.box.appendChild(s3forecast.forecastbar.create_separator());
		}
	}

	//------------------------------------------------------------------------
	var forecast_table = null;
	if (s3forecast.forecastbar.is_view_vertical) {
		forecast_table = document.createElement('table');
		s3forecast.forecastbar.reset_style(forecast_table);
		forecast_table.setAttribute('width', '100%');
		forecast_table.style.width = "100%";
		s3forecast.forecastbar.box.appendChild(forecast_table);
	}

	//------------------------------------------------------------------------
	for (var i=0; i<=7; i++) {
		if (! (forecast_data.forecast && forecast_data.forecast.length)) { continue; }
		//------------------------------------------------------------------
		if ((i+1) > forecastbar_forecast_days) { continue; }
		//------------------------------------------------------------------
		var f = forecast_data.forecast[i];
		if (! f) { continue; }
		//------------------------------------------------------------------
		var is_last = ((forecastbar_forecast_days < (i+2)) || (! forecast_data.forecast[i+1])) ? true : false;
		//------------------------------------------------------------------
		f.location = forecast_data.location;
		var insert_cell = -1;
		var insert_td_name = false;
		var day_name = (forecastbar_day_name == 'full') ? f.day.day : (forecastbar_day_name == 'date') ? f.day.date_locale : f.day.short_day;

		var forecast_box = document.createElement('div');
		if (forecast_table) {
			forecast_box = forecast_table.insertRow(forecast_table.length);
			s3forecast.forecastbar.reset_style(forecast_box);
			forecast_box.addEventListener("mouseover", function(e){ s3forecast.forecastbar.tooltip_show(this); });
			forecast_box.addEventListener("mouseout", function(e){ s3forecast.forecastbar.tooltip_hide(this); });
		} else {
			s3forecast.forecastbar.set_box_style(forecast_box, true);
			forecast_box.style.textAlign = 'right';

			s3forecast.forecastbar.box.appendChild(forecast_box);
			s3forecast.forecastbar.tooltip_create(s3forecast.forecastbar.tooltip_init(), forecast_box);
			s3forecast.forecastbar.tooltip_content(forecast_box.tooltip_box, 'forecast', f);
		}
		forecast_box.links_details = f.day.links.details;
		forecast_box.addEventListener("click", function(e){ s3forecast.forecastbar.window_open(this.links_details); });

		//------------------------------------------------------------------
		function td_name_create() {
			if (insert_td_name) { return; }
			var td_name = forecast_box.insertCell(++insert_cell);
			s3forecast.forecastbar.reset_style(td_name);
			td_name.style.cursor ="pointer";
			td_name.style.paddingLeft ="2px";
			td_name.style.verticalAlign = 'middle';
			if (! is_last) {
				td_name.style.borderBottom ="1px " + s3forecast.forecastbar.borderColor + " solid";
			}
			td_name.style.color = s3forecast.forecastbar.fontColor;
			td_name.appendChild(document.createTextNode(day_name + ' : '));
			insert_td_name = true;
		}

		//------------------------------------------------------------------
		if (forecastbar_days_or_nights != 'nights') {
			if (forecast_table) {
				td_name_create();
				var td_day = forecast_box.insertCell(++insert_cell);
				s3forecast.forecastbar.reset_style(td_day);

				td_day.style.verticalAlign = 'middle';
				td_day.style.textAlign = 'right';
				if (! is_last) {
					td_day.style.borderBottom ="1px " + s3forecast.forecastbar.borderColor + " solid";
				}
				td_day.style.position = 'relative';

				var tooltip = s3forecast.forecastbar.tooltip_init();
				forecast_box.tooltip_box = tooltip.box;
				forecast_box.tooltip_arrow = tooltip.arrow;
				td_day.appendChild(tooltip.box);
				td_day.appendChild(tooltip.arrow);
				s3forecast.forecastbar.tooltip_content(forecast_box.tooltip_box, 'forecast', f);

				var forecastbar_forecast_day = s3forecast.forecastbar.create_forecast_data(f.day.temperature.high, f.day.icon);
				td_day.appendChild(forecastbar_forecast_day);
			} else {
				var forecastbar_forecast_day = s3forecast.forecastbar.create_forecast_data(day_name + ' : ' + f.day.temperature.high, f.day.icon);
				forecast_box.appendChild(forecastbar_forecast_day);
			}
		}
		//------------------------------------------------------------------
		if (forecastbar_days_or_nights != 'days') {
			if (forecast_table) {
				td_name_create();
				var td_night = forecast_box.insertCell(++insert_cell);
				s3forecast.forecastbar.reset_style(td_night);
				td_night.style.verticalAlign = 'middle';
				td_night.style.textAlign = 'right';
				if (! is_last) {
					td_night.style.borderBottom ="1px " + s3forecast.forecastbar.borderColor + " solid";
				}
				var forecastbar_forecast_night = s3forecast.forecastbar.create_forecast_data(f.night.temperature.high, f.night.icon);
				td_night.appendChild(forecastbar_forecast_night);
			} else {
				var text = '';
				if (forecastbar_days_or_nights == 'nights') {
					text = day_name + ' : ' + f.night.temperature.high;
				}
				else if (s3forecast.utils.prefs_get('forecastbar_daynight_separators')) {
//					text = ' : ' + f.night.temperature.high;
					forecast_box.appendChild(s3forecast.forecastbar.create_separator(true));
					text = f.night.temperature.high;
				}
				else {
					text = f.night.temperature.high;
				}
				var forecastbar_forecast_night = s3forecast.forecastbar.create_forecast_data(text, f.night.icon);
				forecast_box.appendChild(forecastbar_forecast_night);
			}
		}
		//------------------------------------------------------------------
		if (! s3forecast.forecastbar.is_view_vertical) {
			s3forecast.forecastbar.box.appendChild(s3forecast.forecastbar.create_separator());
		}
	}
	//------------------------------------------------------------------------
	var additional_box = document.createElement('div');
	s3forecast.forecastbar.set_box_style(additional_box);
	additional_box.style.textAlign = 'right';
	var additional_box_list = [];
	//------------------------------------------------------------------------
	if ((s3forecast.forecastbar.is_position == 'top-left') || (s3forecast.forecastbar.is_position == 'top-right')) {
		if (s3forecast.forecastbar.is_view_vertical) {
			s3forecast.forecastbar.box.insertBefore(additional_box, s3forecast.forecastbar.box.firstChild);
			s3forecast.forecastbar.box.insertBefore(s3forecast.forecastbar.create_separator(false, true), additional_box.nextSibling);
		} else {
			s3forecast.forecastbar.box.appendChild(additional_box);
		}
	} else {
		if (s3forecast.forecastbar.is_view_vertical) {
			s3forecast.forecastbar.box.appendChild(s3forecast.forecastbar.create_separator(false, true));
		}
		s3forecast.forecastbar.box.appendChild(additional_box);
	}

	//------------------------------------------------------------------------
	if (forecast_data.connect_error) {
		var error_box = s3forecast.forecastbar.additional_box('/skin/images/error2.png');
		additional_box_list.push(error_box);
		s3forecast.forecastbar.tooltip_create(s3forecast.forecastbar.tooltip_init(), error_box);
		forecast_data.connect_error_text = s3forecast.i18n.get_string('features.errors.connection_tooltip');
		s3forecast.forecastbar.tooltip_content(error_box.tooltip_box, 'error', forecast_data);
		error_box.addEventListener("click", function(e){ s3forecast.forecastbar.forecast_reload(); });
	}
	//------------------------------------------------------------------------
	if (forecast_data.swa && forecast_data.swa.isActive && s3forecast.utils.prefs_get('warning_swa')) {
		var swa_box = s3forecast.forecastbar.additional_box('/skin/images/swa.png');
		additional_box_list.push(swa_box);
		s3forecast.forecastbar.tooltip_create(s3forecast.forecastbar.tooltip_init(), swa_box);
		s3forecast.forecastbar.tooltip_content(swa_box.tooltip_box, 'swa', forecast_data);
		swa_box.addEventListener("click", function(e){ s3forecast.forecastbar.window_open(forecast_data.swa.link); });
		forecast_data.swa_alert = true;
	}
	//------------------------------------------------------------------------
	if (s3forecast.utils.prefs_get('forecastbar_button_locations') && (s3forecast.forecastbar.location_list.length > 1)) {
		var res = s3forecast.utils.get_left_right_location(s3forecast.forecastbar.location_list);
		var arrow_is_both = (s3forecast.forecastbar.location_list.length == 2) ? true : false;
		//------------------------------------------------------------------
		var arrow_left_box = s3forecast.forecastbar.additional_box(arrow_is_both ? '/skin/images/arrow_left_right.png' : '/skin/images/arrow_left.png');
		additional_box_list.push(arrow_left_box);
		s3forecast.forecastbar.tooltip_create(s3forecast.forecastbar.tooltip_init(), arrow_left_box);
		s3forecast.forecastbar.tooltip_content(arrow_left_box.tooltip_box, 'text', res.left.name);
		arrow_left_box.addEventListener("click", function(e){ s3forecast.forecastbar.change_location(res.left.code); });
		//------------------------------------------------------------------
		if (! arrow_is_both) {
			var arrow_right_box = s3forecast.forecastbar.additional_box('/skin/images/arrow_right.png');
			additional_box_list.push(arrow_right_box);
			s3forecast.forecastbar.tooltip_create(s3forecast.forecastbar.tooltip_init(), arrow_right_box);
			s3forecast.forecastbar.tooltip_content(arrow_right_box.tooltip_box, 'text', res.right.name);
			arrow_right_box.addEventListener("click", function(e){ s3forecast.forecastbar.change_location(res.right.code); });
			//------------------------------------------------------------------
		}
	}
	//------------------------------------------------------------------------
	if (s3forecast.utils.prefs_get('forecastbar_button_reload')) {
		var reload_box = s3forecast.forecastbar.additional_box('/skin/images/reload.png');
		additional_box_list.push(reload_box);
		s3forecast.forecastbar.tooltip_create(s3forecast.forecastbar.tooltip_init(), reload_box);
		s3forecast.forecastbar.tooltip_content(reload_box.tooltip_box, 'text', s3forecast.i18n.get_string('menu.refresh'));
		s3forecast.forecastbar.button_reload = reload_box.firstChild;
		reload_box.addEventListener("click", function(e){ s3forecast.forecastbar.forecast_reload(); });
	}
	//------------------------------------------------------------------------
	if (s3forecast.utils.prefs_get('forecastbar_button_radar') && forecast_data.radar) {
		var radar_box = s3forecast.forecastbar.additional_box('/skin/images/radar.png');
		additional_box_list.push(radar_box);
		s3forecast.forecastbar.tooltip_create(s3forecast.forecastbar.tooltip_init(), radar_box, function(mbox){
			s3forecast.forecastbar.tooltip_content(mbox.tooltip_box, 'radar', forecast_data);
		});

		if (s3forecast.utils.prefs_get('radar_type') == 'windy.com') {
			radar_box.addEventListener("click", function(e){ s3forecast.forecastbar.window_open('https://www.windy.com/?' + s3forecast.utils.prefs_get('radar_layer') + ',' + forecast_data.location.latitude + ',' + forecast_data.location.longitude + ',7'); });
		} else {
			radar_box.addEventListener("click", function(e){ s3forecast.forecastbar.window_open(s3forecast.utils.get_radar_src(forecast_data.radar.links.regional.animated)); });
		}
	}
	//------------------------------------------------------------------------
	if (s3forecast.utils.prefs_get('forecastbar_button_hourly') && forecast_data.cc) {
		var hourly_box = s3forecast.forecastbar.additional_box('/skin/images/hourly.png');
		additional_box_list.push(hourly_box);
		s3forecast.forecastbar.tooltip_create(s3forecast.forecastbar.tooltip_init(), hourly_box);
		s3forecast.forecastbar.tooltip_content(hourly_box.tooltip_box, 'text', s3forecast.i18n.get_string('features.hourlyclick'));
		hourly_box.addEventListener("click", function(e){ s3forecast.forecastbar.window_open(forecast_data.cc.links.hourly); });
	}
	//------------------------------------------------------------------------
	if (s3forecast.utils.prefs_get('forecastbar_button_5day') && forecast_data.cc) {
		var day5_box = s3forecast.forecastbar.additional_box('/skin/images/5day.png');
		additional_box_list.push(day5_box);
		s3forecast.forecastbar.tooltip_create(s3forecast.forecastbar.tooltip_init(), day5_box, function(mbox) {
			s3forecast.forecastbar.tooltip_content(mbox.tooltip_box, '5day', forecast_data);
		});
		day5_box.addEventListener("click", function(e){ s3forecast.forecastbar.window_open(forecast_data.cc.links.day5); });
	}
	//------------------------------------------------------------------------
	//------------------------------------------------------------------------
	for (var i=0; i<additional_box_list.length; i++) {
		additional_box.appendChild(additional_box_list[i]);
		if ((i+1) < additional_box_list.length) {
			additional_box.appendChild(s3forecast.forecastbar.create_separator(true));
		}
	}
	//------------------------------------------------------------------------
	//------------------------------------------------------------------------
	var forecastbar_collapse_box = s3forecast.forecastbar.additional_box('/skin/images/forecastbar_collapse.png');
	if ((s3forecast.forecastbar.is_position == 'bottom-left') || (s3forecast.forecastbar.is_position == 'top-left')) {
		if (s3forecast.forecastbar.is_view_vertical) {
			additional_box.insertBefore(s3forecast.forecastbar.create_separator(true), additional_box.firstChild);
			additional_box.insertBefore(forecastbar_collapse_box, additional_box.firstChild);
		} else {
			s3forecast.forecastbar.box.insertBefore(s3forecast.forecastbar.create_separator(true), s3forecast.forecastbar.box.firstChild);
			s3forecast.forecastbar.box.insertBefore(forecastbar_collapse_box, s3forecast.forecastbar.box.firstChild);
		}
	} else if (s3forecast.forecastbar.is_position == 'top-right') {
			s3forecast.forecastbar.box.insertBefore(forecastbar_collapse_box, additional_box.nextSibling);
			additional_box.appendChild(s3forecast.forecastbar.create_separator(true));
	} else {
			additional_box.appendChild(s3forecast.forecastbar.create_separator(true));
			s3forecast.forecastbar.box.appendChild(forecastbar_collapse_box);
	}
	s3forecast.forecastbar.button_collapse = forecastbar_collapse_box;
	s3forecast.forecastbar.tooltip_create(s3forecast.forecastbar.tooltip_init(), forecastbar_collapse_box);
	s3forecast.forecastbar.tooltip_content(forecastbar_collapse_box.tooltip_box, 'text', s3forecast.i18n.get_string('forecastbar.button_collapse'));
	forecastbar_collapse_box.addEventListener("click", function(e){ s3forecast.forecastbar.collapse_click(); });
	//------------------------------------------------------------------------
	//------------------------------------------------------------------------
	var forecastbar_expand_icon_mini = (forecast_data.connect_error || forecast_data.swa_alert) ? '/skin/images/logo16_error.png' : '/skin/images/logo16.png';
	var forecastbar_expand_icon_maxi = (forecast_data.cc && ! forecast_data.connect_error) ? s3forecast.themes.get(forecast_data.cc.icon, 'large') : '';
	var forecastbar_expand_box = s3forecast.forecastbar.additional_box(forecastbar_expand_icon_mini, forecastbar_expand_icon_maxi);
	//------------------------------------------------------------------------
	if ((s3forecast.forecastbar.is_position == 'bottom-left') || (s3forecast.forecastbar.is_position == 'top-left')) {
		if (s3forecast.forecastbar.is_view_vertical) {
			s3forecast.forecastbar.box.insertBefore(forecastbar_expand_box, additional_box);
		} else {
			s3forecast.forecastbar.box.insertBefore(forecastbar_expand_box, s3forecast.forecastbar.box.firstChild);
		}
	} else if (s3forecast.forecastbar.is_position == 'top-right') {
			s3forecast.forecastbar.box.insertBefore(forecastbar_expand_box, additional_box.nextSibling);
	} else {
		s3forecast.forecastbar.box.appendChild(forecastbar_expand_box);
	}
	//------------------------------------------------------------------------
	if (forecastbar_expand_icon_maxi) {
		var cur_temp = document.createElement('div');
		s3forecast.forecastbar.reset_style(cur_temp);
		cur_temp.style.position = 'absolute';
		cur_temp.style.right = '0px';
		cur_temp.style.bottom = '0px';
		if (forecast_data.swa_alert) {
			cur_temp.style.backgroundColor = 'rgba(208,36,53, 0.45)';
		} else {
			cur_temp.style.backgroundColor = 'rgba(50,50,50, 0.45)';
		}
		cur_temp.style.color = '#FFFFFF';
		cur_temp.style.padding = '1px';
		cur_temp.style.fontSize = '0.9em';
		cur_temp.appendChild(document.createTextNode( forecast_data.cc.temperature.part[0].substring(0, forecast_data.cc.temperature.part[0].length-1) ));
		forecastbar_expand_box.appendChild(cur_temp);
	}

	s3forecast.forecastbar.button_expand = forecastbar_expand_box;
	s3forecast.forecastbar.tooltip_create(s3forecast.forecastbar.tooltip_init(), forecastbar_expand_box);
	s3forecast.forecastbar.tooltip_content(forecastbar_expand_box.tooltip_box, 'text', s3forecast.i18n.get_string('forecastbar.button_expand'));
	forecastbar_expand_box.tooltip_box.is_timeout = true;
	forecastbar_expand_box.addEventListener("click", function(e){ s3forecast.forecastbar.expand_click(); });
	forecastbar_expand_box.addEventListener("mouseover", function(e){ s3forecast.forecastbar.expand_over(); });
//	forecastbar_expand_box.addEventListener("mouseout", function(e){ s3forecast.forecastbar.expand_out(); });
	//------------------------------------------------------------------------
	s3forecast.forecastbar.box.addEventListener("mouseout", function(e) {
		var node = e.relatedTarget;
		var is_out = true;
		while (node) {
			if (node.id && (node.id == s3forecast.forecastbar.box_id)) {
				is_out = false;
				break;
			}
			node = node.parentNode;
		}
		if (is_out) {
			s3forecast.forecastbar.expand_out(); 
		}
	});

	//------------------------------------------------------------------------
	if (s3forecast.forecastbar.is_collapsed) {
		s3forecast.forecastbar.collapse();
	} else {
		s3forecast.forecastbar.button_expand.style.display = 'none';
	}

	//------------------------------------------------------------------------
	// Tweak for protection against injections
	// example page: https://developers.google.com/web/updates/2016/10/avoid-not-secure-warn
	// Google add <div class="devsite-table-wrapper"> for tables, margin-bottom: 16px; margin-top: 16px;
	//------------------------------------------------------------------------
	s3forecast.forecastbar.mutation_observer = new MutationObserver(function(mutations) {
		for (var mutation of mutations) {
			if (mutation.addedNodes) {
				var is_external_node = false;
				for (var i=0; i<mutation.addedNodes.length; i++) {
					var node = mutation.addedNodes[i];
					while (node.parentNode) {
						if (node == s3forecast.forecastbar.box) {
							break;
						}
						node = node.parentNode;
					}
					if (node != s3forecast.forecastbar.box) {
						is_external_node = true;
					}
				}
				if (is_external_node) {
					s3forecast.forecastbar.mutation_observer.disconnect();
					if (s3forecast.forecastbar.create_forecastbar_box()) {
						s3forecast.forecastbar.set_forecast_data(s3forecast.forecastbar.forecast_data, s3forecast.forecastbar.location_list);
					}
					s3forecast.forecastbar.mutation_count--;
				}
			}
		}
	});
	if (s3forecast.forecastbar.mutation_count > 0) {
		s3forecast.forecastbar.mutation_observer.observe(s3forecast.forecastbar.box, { childList: true, subtree: false, attributes: false });
	}
}
//------------------------------------------------------------------------------
s3forecast.forecastbar.additional_box = function(img_src, img_src_maxi) {
	var box = document.createElement('div');
	s3forecast.forecastbar.set_box_style(box);
	var img = document.createElement('img');
	s3forecast.forecastbar.reset_style(img);
	if (img_src_maxi) {
		img.src = img_src_maxi;
		img.style.setProperty ("height", "20px", "important");
	} else {
		img.src = chrome.extension.getURL(img_src);
		img.style.setProperty ("height", "15px", "important");
	}
	img.setAttribute('align', 'center');
	img.style.verticalAlign ="middle";
	img.style.padding ="3px 5px";

	box.img_src_mini = chrome.extension.getURL(img_src);
	box.img_src_maxi = img_src_maxi;

	box.appendChild(img);
	return box;
}
//------------------------------------------------------------------------------
s3forecast.forecastbar.create_forecast_data = function(text, icon) {
	var forecastbar_forecast = document.createElement('div');
	s3forecast.forecastbar.set_box_style(forecastbar_forecast);

	if (s3forecast.forecastbar.forecast_labels > 0) {
		var forecastbar_forecast_temp = document.createElement('div');
		s3forecast.forecastbar.set_box_style(forecastbar_forecast_temp);
		forecastbar_forecast_temp.appendChild(document.createTextNode(text));
		forecastbar_forecast_temp.style.padding = "0px 2px";
		forecastbar_forecast.appendChild(forecastbar_forecast_temp);
		s3forecast.forecastbar.forecast_labels--;
	}

	var forecastbar_forecast_img = document.createElement('img');
	s3forecast.forecastbar.reset_style(forecastbar_forecast_img);
	forecastbar_forecast_img.src = s3forecast.themes.get(icon, 'forecastbar');
	forecastbar_forecast_img.setAttribute('align', 'center');
	forecastbar_forecast_img.style.verticalAlign ="middle";
	forecastbar_forecast.appendChild(forecastbar_forecast_img);

	return forecastbar_forecast;
}
//------------------------------------------------------------------------------
s3forecast.forecastbar.tooltip_init = function() {
	var tooltip_box = document.createElement('div');
	var tooltip_arrow = document.createElement('div');
	s3forecast.forecastbar.reset_style(tooltip_box);
	s3forecast.forecastbar.reset_style(tooltip_arrow);

	tooltip_box.style.backgroundColor = '#5E6164';
	tooltip_box.style.color = '#DFDFDF';
	tooltip_box.style.padding = '5px';
	tooltip_box.style.borderRadius = '6px';
	tooltip_box.style.left = '50%';
	tooltip_box.style.position = 'absolute';
	tooltip_box.style.zIndex = '9999999999';
	tooltip_box.style.opacity = '0';
	tooltip_box.style.transition = 'opacity 0.3s';
	tooltip_box.style.display = 'none';

	tooltip_arrow.style.position = 'absolute';
	tooltip_arrow.style.left = '50%';
	tooltip_arrow.style.marginLeft = '-5px';
	tooltip_arrow.style.borderWidth = '5px';
	tooltip_arrow.style.borderStyle = 'solid';
	tooltip_arrow.style.opacity = '0';
	tooltip_arrow.style.transition = 'opacity 0.3s';
	tooltip_arrow.style.display = 'none';

	if ((s3forecast.forecastbar.is_position == 'top-left') || (s3forecast.forecastbar.is_position == 'top-right')) {
		tooltip_box.style.top = '100%';
		tooltip_box.style.marginTop = '10px';
		tooltip_arrow.style.top = '100%';
		tooltip_arrow.style.borderColor = 'transparent transparent #5E6164 transparent';
	} else {
		tooltip_box.style.bottom = '100%';
		tooltip_box.style.marginBottom = '10px';
		tooltip_arrow.style.bottom = '100%';
		tooltip_arrow.style.borderColor = '#5E6164 transparent transparent transparent';
	}

	return { 'box' : tooltip_box, 'arrow' : tooltip_arrow };
}
//------------------------------------------------------------------------------
s3forecast.forecastbar.tooltip_create = function(tooltip, box, func) {
	box.tooltip_box = tooltip.box;
	box.tooltip_arrow = tooltip.arrow;
	box.appendChild(tooltip.box);
	box.appendChild(tooltip.arrow);
	box.style.position = 'relative';
	box.addEventListener("mouseover", function(e){
		if (func) {
			var mbox = this;
			if (! mbox.is_created) {
				func(mbox);
				mbox.is_created = true;
			}
		}
		s3forecast.forecastbar.tooltip_show(this); 
	});
	box.addEventListener("mouseout", function(e){ s3forecast.forecastbar.tooltip_hide(this); });
}
//------------------------------------------------------------------------------
s3forecast.forecastbar.tooltip_content = function(tooltip_box, tooltip_type, tooltip_data) {
	if (tooltip_type == 'cc') {
		s3forecast.forecastbar.tooltip_content_cc(tooltip_box, tooltip_data);
	} else if (tooltip_type == 'forecast') {
		s3forecast.forecastbar.tooltip_content_forecast(tooltip_box, tooltip_data);
	} else if (tooltip_type == '5day') {
		s3forecast.forecastbar.tooltip_content_5day(tooltip_box, tooltip_data);
	} else if (tooltip_type == 'radar') {
		s3forecast.forecastbar.tooltip_content_radar(tooltip_box, tooltip_data);
	} else if (tooltip_type == 'swa') {
		var text_list = [];
		for (var i=0; i<tooltip_data.swa.alerts.length; i++) {
			text_list.push(tooltip_data.swa.alerts[i].text);
		}
		tooltip_data.error_text = text_list.join('; ');
		s3forecast.forecastbar.tooltip_content_swa_error(tooltip_box, tooltip_data);
	} else if (tooltip_type == 'error') {
		tooltip_data.error_text = tooltip_data.connect_error_text;
		s3forecast.forecastbar.tooltip_content_swa_error(tooltip_box, tooltip_data);
	} else if (tooltip_type == 'text') {
		var text = document.createElement('div');
		s3forecast.forecastbar.reset_style(text);
		text.appendChild(document.createTextNode(tooltip_data));
		text.style.fontSize = "13px";
		text.style.padding = "5px 0px";
		text.style.textAlign = "center";
		text.style.whiteSpace ="nowrap";
		text.style.color = '#DFDFDF';
		tooltip_box.appendChild(text);
	}
}
//------------------------------------------------------------------------------
s3forecast.forecastbar.tooltip_content_cc = function(tooltip_box, tooltip_data) {
	s3forecast.forecastbar.tooltip_template_header_name(tooltip_box, tooltip_data);
	tooltip_data.cc.is_cc = true;
	tooltip_box.appendChild(s3forecast.forecastbar.tooltip_template_forecast(tooltip_data.cc, 'day'));
}
//------------------------------------------------------------------------------
s3forecast.forecastbar.tooltip_content_forecast = function(tooltip_box, tooltip_data) {
	s3forecast.forecastbar.tooltip_template_header_name(tooltip_box, tooltip_data);
	tooltip_box.appendChild(s3forecast.forecastbar.tooltip_template_forecast(tooltip_data.day, 'day'));
	tooltip_box.appendChild(s3forecast.forecastbar.tooltip_template_forecast(tooltip_data.night, 'night'));
}
//------------------------------------------------------------------------------
s3forecast.forecastbar.tooltip_content_5day = function(tooltip_box, tooltip_data) {
	s3forecast.forecastbar.tooltip_template_header_name(tooltip_box, tooltip_data);

	//------------------------------------------------------------------------
	var table = document.createElement('table');
	s3forecast.forecastbar.reset_style(table);
	table.setAttribute('width', '100%');
	table.style.width = "inherit";
	table.style.paddingBottom = '4px';
	tooltip_box.appendChild(table);

	var tr_day = table.insertRow(0);
	var tr_night = table.insertRow(1);
	s3forecast.forecastbar.reset_style(tr_day);
	s3forecast.forecastbar.reset_style(tr_night);

	for (var i=0; i<5; i++) {
		var f = tooltip_data.forecast[i];
		if (! f) { continue; }
		f.location = tooltip_data.location;

		var td_day = tr_day.insertCell(i);
		var td_night = tr_night.insertCell(i);
		s3forecast.forecastbar.reset_style(td_day);
		s3forecast.forecastbar.reset_style(td_night);
		td_day.style.width = '100%';
		td_day.style.height = '100%';
		td_day.style.padding = '0 1px';

		td_night.style.width = '100%';
		td_night.style.height = '100%';
		td_night.style.padding = '0 1px';

		var box_day = s3forecast.forecastbar.tooltip_template_forecast(f.day, 'day');
		box_day.style.width = '100%';
		box_day.style.height = '100%';
		td_day.appendChild(box_day);

		var box_night = s3forecast.forecastbar.tooltip_template_forecast(f.night, 'night');
		box_night.style.width = '100%';
		box_night.style.height = '100%';
		td_night.appendChild(box_night);
	}
}
//------------------------------------------------------------------------------
s3forecast.forecastbar.tooltip_content_radar = function(tooltip_box, tooltip_data) {
	s3forecast.forecastbar.tooltip_template_header_name(tooltip_box, tooltip_data);

	var radar_box = document.createElement('div');
	s3forecast.forecastbar.set_box_style(radar_box);

	var radar_src = s3forecast.utils.get_radar_src(tooltip_data.radar.images.regional.large);
	//------------------------------------------------------------------------
	if (s3forecast.utils.check_radar_iframe()) {
		s3forecast.forecastbar.radar_image = document.createElement('iframe');
	} else {
		s3forecast.forecastbar.radar_image = document.createElement('img');
		s3forecast.forecastbar.radar_image.src = chrome.extension.getURL('/skin/images/radar_loading_big.gif');
	}
	s3forecast.forecastbar.reset_style(s3forecast.forecastbar.radar_image);

	//------------------------------------------------------------------------
	// Tweak for some sites that use Content Security Policy
	//------------------------------------------------------------------------
	if (s3forecast.utils.check_radar_iframe()) {
		if (s3forecast.utils.prefs_get('radar_type') == 'windy.com') {
			s3forecast.forecastbar.radar_image.src = 'https://embed.windy.com/embed2.html?lat=' + tooltip_data.location.latitude + '&lon=' + tooltip_data.location.longitude + '&zoom=7&level=surface&overlay=' + s3forecast.utils.prefs_get('radar_layer') + '&menu=&message=true&marker=&calendar=&pressure=&type=map&location=coordinates&detail=&detailLat=' + tooltip_data.location.latitude + '&detailLon=' + tooltip_data.location.longitude + '&metricWind=m%2Fs&metricTemp=%C2%B0C';
		} else {
			s3forecast.forecastbar.radar_image.src = radar_src;
		}
		radar_box.style.minHeight = '480px';
		s3forecast.forecastbar.radar_image.style.height = '480px';
	} else {
		if (/^https?\:\/\//.test(radar_src)) {
			s3forecast.forecastbar.radar_image.source_src = radar_src;
			chrome.runtime.sendMessage({ 'action' : 'get_radar_image', 'radar_src' : radar_src }, function() {});
		}
		s3forecast.forecastbar.radar_image.src = radar_src;
	}
	//------------------------------------------------------------------------
	s3forecast.forecastbar.radar_image.setAttribute('align', 'center');
	s3forecast.forecastbar.radar_image.style.verticalAlign ="middle";
	s3forecast.forecastbar.radar_image.style.paddingBottom ="3px";
	radar_box.style.minWidth = '640px';
	s3forecast.forecastbar.radar_image.style.width = '640px';
	radar_box.appendChild(s3forecast.forecastbar.radar_image);
	tooltip_box.style.textAlign ="center";
	tooltip_box.appendChild(radar_box);
}
//------------------------------------------------------------------------------
s3forecast.forecastbar.tooltip_content_swa_error = function(tooltip_box, tooltip_data) {
	s3forecast.forecastbar.tooltip_template_header_name(tooltip_box, tooltip_data);

	var text_box = document.createElement('div');
	s3forecast.forecastbar.set_box_style(text_box);
	text_box.style.backgroundColor = '#C1DDFE';
	text_box.style.background = 'radial-gradient(farthest-corner at 30% 30%, #D1EDFF 35%, #50A7E7 75%) repeat scroll 0 0 transparent';
	text_box.style.fontSize = "14px";
	text_box.style.fontWeight = "bold";
	text_box.style.color = "#ED0707";
//	text_box.style.whiteSpace ="nowrap";
	text_box.style.minWidth ="350px";
	text_box.style.display ="block";
	text_box.style.borderRadius ="5px";
	text_box.style.padding ="5px";
	text_box.appendChild(document.createTextNode(tooltip_data.error_text));
	tooltip_box.appendChild(text_box);
}
//------------------------------------------------------------------------------
s3forecast.forecastbar.tooltip_template_header_name = function(tooltip_box, tooltip_data) {
	var tooltip_name = document.createElement('div');
	s3forecast.forecastbar.reset_style(tooltip_name);
	tooltip_name.appendChild(document.createTextNode(tooltip_data.location.name_short));
	tooltip_name.style.fontSize = "13px";
	tooltip_name.style.fontWeight = "bold";
	tooltip_name.style.padding = "5px";
	tooltip_name.style.paddingLeft = "0";
	tooltip_name.style.whiteSpace ="nowrap";
	tooltip_name.style.textAlign ="left";
	tooltip_name.style.display = "block";
	tooltip_name.style.color = '#DFDFDF';
	tooltip_box.appendChild(tooltip_name);
}
//------------------------------------------------------------------------------
s3forecast.forecastbar.tooltip_template_forecast = function(tooltip_data, data_type) {
	var table = document.createElement('table');
	s3forecast.forecastbar.reset_style(table);
	table.setAttribute('width', '100%');
	table.style.fontSize = "12px";
	table.style.color = "#000000";
	table.style.padding = '5px';
	table.style.width = "100%";
	table.style.minWidth = '250px';
	table.style.borderRadius = '5px';
	//------------------------------------------------------------------------
	if (data_type == 'night') {
		table.style.marginTop = '3px';
		table.style.backgroundColor = '#D2D2D2';
		table.style.background = 'radial-gradient(farthest-corner at 30% 30%, #DADADA 35%, #828282 80%) repeat scroll 0 0 transparent';
	} else {
		table.style.backgroundColor = '#C1DDFE';
		table.style.background = 'radial-gradient(farthest-corner at 30% 30%, #D1EDFF 35%, #50A7E7 75%) repeat scroll 0 0 transparent';
	}

	//------------------------------------------------------------------------
	var tr_date = table.insertRow(0);
	var td_date_left = tr_date.insertCell(0);
	var td_date_right = tr_date.insertCell(1);

	s3forecast.forecastbar.reset_style(tr_date);
	s3forecast.forecastbar.reset_style(td_date_left);
	s3forecast.forecastbar.reset_style(td_date_right);

	tr_date.style.color = "#000000";
	td_date_left.style.fontWeight = "bold";
	td_date_right.style.fontWeight = "bold";
	td_date_right.style.textAlign = 'right';
	td_date_right.style.lineHeight = '1.1em';

	td_date_left.appendChild(document.createTextNode(tooltip_data.day));
	td_date_right.appendChild(document.createTextNode(tooltip_data.date_locale));
	if (tooltip_data.time) {
		td_date_right.appendChild(document.createElement('br'));
		td_date_right.appendChild(document.createTextNode(tooltip_data.time));
	}

	//------------------------------------------------------------------------
	var tr_forecast_description = table.insertRow(1);
	var td_forecast_description = tr_forecast_description.insertCell(0);
	s3forecast.forecastbar.reset_style(tr_forecast_description);
	s3forecast.forecastbar.reset_style(td_forecast_description);

	tr_forecast_description.style.color = "#000000";
	td_forecast_description.style.fontWeight = "bold";
	td_forecast_description.style.textAlign = 'center';
	td_forecast_description.setAttribute('colspan', '2');
	td_forecast_description.style.fontSize = "14px";
	td_forecast_description.style.padding = '15px 5px';

	td_forecast_description.appendChild(document.createTextNode(tooltip_data.text.shrt));
	if (tooltip_data.text.shrt != tooltip_data.text.lng) {
		var desc_lng = document.createElement('div');
		td_forecast_description.appendChild(desc_lng);
		desc_lng.style.fontWeight = 'normal';
		desc_lng.style.fontSize = '0.9em';

		var desc_text = tooltip_data.text.lng;
		if (desc_text.length > 45) {
			desc_text = desc_text.substr(0, 45) + '...';
		}
		desc_lng.setAttribute('title', tooltip_data.text.lng);
		desc_lng.appendChild(document.createTextNode(desc_text));
	}

	//------------------------------------------------------------------------
	var tr_image = table.insertRow(2);
	var td_image_left = tr_image.insertCell(0);
	var td_image_right = tr_image.insertCell(1);
	s3forecast.forecastbar.reset_style(tr_image);
	s3forecast.forecastbar.reset_style(td_image_left);
	s3forecast.forecastbar.reset_style(td_image_right);

	td_image_left.setAttribute('rowspan', '2');
	td_image_left.setAttribute('width', '32');

	if (tooltip_data.is_cc) {
		td_image_right.style.color = '#000000';
	} else if (data_type == 'night') {
		td_image_right.style.color = '#0000FF';
	} else {
		td_image_right.style.color = '#FF0000';
	}
	tr_image.style.color = "#000000";
	td_image_right.style.fontSize = '28px';
	td_image_right.style.fontWeight = "bold";
	td_image_right.style.padding = '10px 0';
	td_image_right.style.whiteSpace ="nowrap";

	var icon = tooltip_data.icon;
	var forecast_img = document.createElement('img');
	s3forecast.forecastbar.reset_style(forecast_img);
	forecast_img.src = s3forecast.themes.get(icon, 'large');
	forecast_img.style.padding ="0 25px";
	td_image_left.appendChild(forecast_img);

	td_image_right.appendChild(document.createTextNode(tooltip_data.temperature.high));

	//------------------------------------------------------------------------
	var tr_temperature = table.insertRow(3);
	var td_temperature = tr_temperature.insertCell(0);
	s3forecast.forecastbar.reset_style(tr_temperature);
	s3forecast.forecastbar.reset_style(td_temperature);
	tr_temperature.style.color = "#000000";
	td_temperature.style.whiteSpace ="nowrap";
	td_temperature.style.paddingBottom ="10px";

	td_temperature.appendChild(document.createTextNode(tooltip_data.realfeel.high));

	//------------------------------------------------------------------------
	var tr_features = table.insertRow(4);
	var td_features = tr_features.insertCell(0);
	s3forecast.forecastbar.reset_style(tr_features);
	s3forecast.forecastbar.reset_style(td_features);
	tr_features.style.color = "#000000";
	td_features.style.textAlign = 'center';
	td_features.setAttribute('colspan', '2');

	var table_features = document.createElement('table');
	s3forecast.forecastbar.reset_style(table_features);
	table_features.setAttribute('align', 'center');
	td_features.appendChild(table_features);

	var features_list = [
		{ 'name' : 'features.sunrise', 'data' : 'sunrise', 'pref' : 'forecastbar_show' },
		{ 'name' : 'features.sunset', 'data' : 'sunset', 'pref' : 'forecastbar_show' },
		{ 'name' : 'features.humidity', 'data' : 'humidity', 'pref' : 'forecastbar_feature_humidity' },
		{ 'name' : 'features.dewpoint', 'data' : 'dewpoint', 'pref' : 'forecastbar_feature_dewpoint' },
		{ 'name' : 'features.uvindex', 'data' : 'uv', 'pref' : 'forecastbar_feature_uvindex' },
		{ 'name' : 'features.winds', 'data' : 'wind', 'pref' : 'forecastbar_feature_winds' },
		{ 'name' : 'features.visibility', 'data' : 'visibility', 'pref' : 'forecastbar_feature_visibility' },
		{ 'name' : 'features.pressure', 'data' : 'pressure', 'pref' : 'forecastbar_feature_pressure' },
		{ 'name' : 'features.precipitation', 'data' : 'precipitation', 'pref' : 'forecastbar_feature_precipitation' },
		{ 'name' : 'features.moon', 'data' : 'moonphase', 'pref' : 'forecastbar_feature_moon' }
	];

	for (var i in features_list) {
		var feature = features_list[i];
		if (tooltip_data[feature.data] && s3forecast.utils.prefs_get(feature.pref)) {
			//------------------------------------------------------------
			var feature_data = document.createTextNode(tooltip_data[feature.data]);
			//------------------------------------------------------------
			if (feature.data == 'uv') {
				if (data_type == 'night') { continue; }

				feature_data = document.createElement('div');
				s3forecast.forecastbar.reset_style(feature_data);
				feature_data.style.whiteSpace ="nowrap";
				feature_data.appendChild(document.createTextNode(tooltip_data[feature.data].text + ' (' + tooltip_data[feature.data].index + ')'));
				if (tooltip_data[feature.data].minutes) {
					feature_data.appendChild(document.createElement('br'));
					feature_data.appendChild(document.createTextNode(tooltip_data[feature.data].minutes));
				}
			}
			//------------------------------------------------------------
			else if (feature.data == 'wind') {
				if (tooltip_data[feature.data].direction) {
					feature_data = document.createTextNode(tooltip_data[feature.data].direction + ', ' + tooltip_data[feature.data].speed);
				} else {
					feature_data = document.createTextNode(tooltip_data[feature.data].speed);
				}
			}
			//------------------------------------------------------------
			else if (feature.data == 'pressure') {
				feature_data = document.createTextNode(tooltip_data[feature.data].value + ' ( ' + tooltip_data[feature.data].trend_symbol + ')');
			}
			//------------------------------------------------------------
			else if (feature.data == 'precipitation') {
				feature_data = document.createTextNode(tooltip_data[feature.data].all);
			}
			//------------------------------------------------------------
			else if ((feature.data == 'sunrise') && (data_type != 'day')) {
				continue;
			}
			//------------------------------------------------------------
			else if ((feature.data == 'sunset') && (data_type != 'night')) {
				continue;
			}
			//------------------------------------------------------------
			else if ((feature.data == 'moonphase') && (data_type != 'night')) {
				continue;
			}

			//------------------------------------------------------------
			var tr_feature = table_features.insertRow(table_features.length);
			var td_feature_left = tr_feature.insertCell(0);
			var td_feature_right = tr_feature.insertCell(1);
			s3forecast.forecastbar.reset_style(tr_feature);
			s3forecast.forecastbar.reset_style(td_feature_left);
			s3forecast.forecastbar.reset_style(td_feature_right);
			tr_feature.style.color = "#000000";
			td_feature_left.style.paddingTop = "5px";
			td_feature_right.style.paddingTop = "5px";
			td_feature_left.style.fontWeight = "bold";
			td_feature_right.style.paddingLeft = "10px";
			td_feature_left.style.whiteSpace ="nowrap";
			td_feature_left.style.fontSize = "12px";
			td_feature_right.style.fontSize = "12px";
			td_feature_left.style.lineHeight = "12px";
			td_feature_right.style.lineHeight = "12px";

			td_feature_left.appendChild(document.createTextNode(s3forecast.i18n.get_string(feature.name)));
			td_feature_right.appendChild(feature_data);
		}
	}
	//------------------------------------------------------------------------
	return table;
}
//------------------------------------------------------------------------------
s3forecast.forecastbar.tooltip_show = function(forecast_box) {
	s3forecast.forecastbar.current_tooltip_box = forecast_box;
	s3forecast.forecastbar.contextmenu_destroy();

	forecast_box.tooltip_box.style.display = 'inline-block';
	forecast_box.tooltip_arrow.style.display = 'inline-block';

	var tooltip_box_width = forecast_box.tooltip_box.offsetWidth;
	if (! forecast_box.tooltip_box.style.width) {
		forecast_box.tooltip_box.style.width = forecast_box.tooltip_box.clientWidth + 'px';
	}

	forecast_box.tooltip_box.style.marginBottom = '10px';
	forecast_box.tooltip_box.style.transform = 'scale(1)';
	var box_height = forecast_box.tooltip_box.offsetHeight;

	if (forecast_box.tooltip_box.offsetWidth > (document.documentElement.clientWidth - 5)) {
		var scale = (document.documentElement.clientWidth - 10) / forecast_box.tooltip_box.offsetWidth;
		forecast_box.tooltip_box.style.transform = 'scale( '+ scale +' )';
		var margin_value = parseInt(((box_height * scale) - box_height) / 2 + 9);
		if ((s3forecast.forecastbar.is_position == 'top-left') || (s3forecast.forecastbar.is_position == 'top-right')) {
			forecast_box.tooltip_box.style.marginTop = margin_value + 'px';
		} else {
			forecast_box.tooltip_box.style.marginBottom = margin_value + 'px';
		}
	}

	var margin_left = Math.ceil(tooltip_box_width/2);
	forecast_box.tooltip_box.style.marginLeft = '-' + margin_left + 'px';
	var rect = forecast_box.tooltip_box.getBoundingClientRect();
	if (rect.left < 5) {
		forecast_box.tooltip_box.style.marginLeft = '-' + (margin_left  + rect.left - 5) + 'px';
	}
	else if (rect.right > (document.documentElement.clientWidth - 5)) {
		forecast_box.tooltip_box.style.marginLeft = '-' + (margin_left  + (rect.right - document.documentElement.clientWidth) + 5) + 'px';
	}

	forecast_box.tooltip_box.style.opacity = '1';
	forecast_box.tooltip_arrow.style.opacity = '1';
	forecast_box.style.backgroundColor = s3forecast.forecastbar.backgroundColor_hover;

	if (forecast_box.tooltip_box.timeout) {
		try {
			clearTimeout(forecast_box.tooltip_box.timeout);
		} catch(e){};
		forecast_box.tooltip_box.timeout = null;
	}
	if (forecast_box.tooltip_box.is_timeout) {
		forecast_box.tooltip_box.timeout = setTimeout(function(){ s3forecast.forecastbar.tooltip_hide(forecast_box, true); }, 1000);
	}
}
//------------------------------------------------------------------------------
s3forecast.forecastbar.tooltip_hide = function(forecast_box, is_timer) {
	if (is_timer) {
		setTimeout(function(){
			forecast_box.tooltip_box.style.display = 'none';
			forecast_box.tooltip_arrow.style.display = 'none';
		}, 500);
	} else {
		forecast_box.tooltip_box.style.display = 'none';
		forecast_box.tooltip_arrow.style.display = 'none';
		forecast_box.style.backgroundColor = s3forecast.forecastbar.backgroundColor;
	}
	forecast_box.tooltip_box.style.opacity = '0';
	forecast_box.tooltip_arrow.style.opacity = '0';

	if (forecast_box.tooltip_box.timeout) {
		try {
			clearTimeout(forecast_box.tooltip_box.timeout);
		} catch(e){};
		forecast_box.tooltip_box.timeout = null;
	}
}
//------------------------------------------------------------------------------
s3forecast.forecastbar.forecast_reload = function() {
	chrome.runtime.sendMessage({ 'action' : 'refresh_forecast_data' }, function(response) {
		s3forecast.forecastbar.forecast_reload_img();
	});
}
//------------------------------------------------------------------------------
s3forecast.forecastbar.forecast_reload_img = function() {
	s3forecast.forecastbar.button_reload.src = chrome.extension.getURL('/skin/images/plswait.gif');
	s3forecast.forecastbar.button_reload.style.width ="16px";
}
//------------------------------------------------------------------------------
s3forecast.forecastbar.collapse = function() {
	var box_list = s3forecast.forecastbar.box.childNodes || [];
	for (var i=0; i<box_list.length; i++) {
		var box = box_list[i];
		box.style_display_expand = box.style.display;
		box.style.display = 'none';
	}
	s3forecast.forecastbar.button_expand.style.display = 'inline-block';
}
//------------------------------------------------------------------------------
s3forecast.forecastbar.collapse_click = function() {
	s3forecast.forecastbar.set_collapsed_pref(true);
	s3forecast.forecastbar.collapse();
}
//------------------------------------------------------------------------------
s3forecast.forecastbar.expand_click = function() {
	s3forecast.forecastbar.set_collapsed_pref(false);
	s3forecast.forecastbar.expand();
}
//------------------------------------------------------------------------------
s3forecast.forecastbar.expand = function() {
	var box_list = s3forecast.forecastbar.box.childNodes || [];
	for (var i=0; i<box_list.length; i++) {
		var box = box_list[i];
		box.style.display = box.style_display_expand || '';
	}
	if (s3forecast.forecastbar.is_collapsed) {
		s3forecast.forecastbar.button_expand.style.display = 'inline-block';
		s3forecast.forecastbar.button_collapse.style.display = 'none';
	} else {
		s3forecast.forecastbar.button_collapse.style.display = 'inline-block';
		s3forecast.forecastbar.button_expand.style.display = 'none';
	}
}
//------------------------------------------------------------------------------
s3forecast.forecastbar.expand_set_image = function(is_show) {
	if (s3forecast.forecastbar.button_expand.img_src_maxi) {
		var img = s3forecast.forecastbar.button_expand.firstChild;
		var cur_temp = img.nextSibling;
		if (is_show) {
			img.src = s3forecast.forecastbar.button_expand.img_src_maxi;
			img.style.setProperty ("height", "20px", "important");
			if (cur_temp) {
				cur_temp.style.display = 'inline-block';
			}
		} else {
			img.src = s3forecast.forecastbar.button_expand.img_src_mini;
			img.style.setProperty ("height", "15px", "important");
			if (cur_temp) {
				cur_temp.style.display = 'none';
			}
		}
	}
}
//------------------------------------------------------------------------------
s3forecast.forecastbar.expand_over = function() {
	s3forecast.forecastbar.expand_set_image(false);
	if (s3forecast.forecastbar.is_collapsed) {
		s3forecast.forecastbar.expand();
	}
}
//------------------------------------------------------------------------------
s3forecast.forecastbar.expand_out = function() {
	s3forecast.forecastbar.expand_set_image(true);
	if (s3forecast.forecastbar.is_collapsed) {
		s3forecast.forecastbar.collapse();
	}
}
//------------------------------------------------------------------------------
s3forecast.forecastbar.set_collapsed_pref = function(is_collapsed) {
	s3forecast.forecastbar.pref_save('forecastbar_is_collapsed', is_collapsed);
	s3forecast.forecastbar.is_collapsed = is_collapsed;
}
//------------------------------------------------------------------------------
s3forecast.forecastbar.create_separator = function(is_dotted, is_horizontal) {
	var forecastbar_separator = null;
	var border_style = (is_dotted) ? 'dotted' : 'solid';
	forecastbar_separator = document.createElement('div');
	s3forecast.forecastbar.reset_style(forecastbar_separator);
	if (is_horizontal) {
		forecastbar_separator.style.height = '1px';
		forecastbar_separator.style.borderTop= '1px ' + border_style + ' ' + s3forecast.forecastbar.borderColor;
		forecastbar_separator.style.margin = '0px 2px';
		forecastbar_separator.style.marginTop = '1px';
		forecastbar_separator.style.display = 'block';
	} else {
		forecastbar_separator.style.height = (is_dotted) ? '16px' : '18px';
		forecastbar_separator.style.borderLeft = '1px ' + border_style + ' ' + s3forecast.forecastbar.borderColor;
		forecastbar_separator.style.margin = '0px 2px';
		forecastbar_separator.style.display = 'inline-block';
	}
	forecastbar_separator.style.verticalAlign ="middle";

	return forecastbar_separator;
}
//------------------------------------------------------------------------------
s3forecast.forecastbar.reset_style = function(el) {
	el.style.setProperty ("background", "initial", "important");
	el.style.setProperty ("border", "initial", "important");
	el.style.setProperty ("border-radius", "initial", "important");
	el.style.setProperty ("border-spacing", "initial", "important");
	el.style.setProperty ("border-collapse", "initial", "important");
	el.style.setProperty ("direction", "ltr", "important");
	el.style.setProperty ("flex-direction", "initial", "important");
	el.style.setProperty ("font-weight", "initial", "important");
	el.style.setProperty ("height", "initial", "important");
	el.style.setProperty ("letter-spacing", "initial", "important");
	el.style.setProperty ("min-width", "initial", "important");
	el.style.setProperty ("max-width", "initial", "important");
	el.style.setProperty ("min-height", "initial", "important");
	el.style.setProperty ("max-height", "initial", "important");
	el.style.setProperty ("margin", "auto", "important");
	el.style.setProperty ("outline", "initial", "important");
	el.style.setProperty ("padding", "initial", "important");
	el.style.setProperty ("position", "initial", "important");
	el.style.setProperty ("table-layout", "initial", "important");
	el.style.setProperty ("text-align", "initial", "important");
	el.style.setProperty ("text-shadow", "initial", "important");
	el.style.setProperty ("width", "initial", "important");
	el.style.setProperty ("word-break", "initial", "important");
	el.style.setProperty ("word-spacing", "initial", "important");
	el.style.setProperty ("word-wrap", "initial", "important");

	if (el.tagName == 'TABLE') {
		if (s3forecast.utils.check_isFirefox()) {
			el.style.setProperty ("box-sizing", "border-box", "important"); // -- for Firefox
		} else {
			el.style.setProperty ("box-sizing", "content-box", "important"); // -- for Chrome
		}
	} else {
		el.style.setProperty ("box-sizing", "initial", "important");
	}
	if (el.tagName == 'IMG') {
		el.style.setProperty ("display", "initial", "important");
	}
	if ((el.tagName != 'TABLE') && (el.tagName != 'TR') && (el.tagName != 'TD')) {
		el.style.setProperty ("display", "initial", "important");
	}

	el.style.setProperty ("color", "inherit", "important");
	el.style.setProperty ("font-size", "13px", "important");
	el.style.setProperty ("font-family", "X-LocaleSpecific, sans-serif, Tahoma, Helvetica", "important");
	el.style.setProperty ("line-height", "13px", "important");
	el.style.setProperty ("vertical-align", "top", "important");
	el.style.setProperty ("white-space", "inherit", "important");
}
//------------------------------------------------------------------------------
s3forecast.forecastbar.set_box_style = function(box, is_main_box) {
	s3forecast.forecastbar.reset_style(box);
	box.style.display = "inline-block";
	box.style.padding = "0px 1px";
	box.style.verticalAlign ="middle";
	box.style.cursor ="pointer";
	box.style.whiteSpace ="nowrap";
	box.style.color = s3forecast.forecastbar.fontColor;
	if (is_main_box) {
		if (s3forecast.forecastbar.is_view_vertical) {
			box.style.borderBottom ="1px " + s3forecast.forecastbar.borderColor + " solid";
			box.style.width = "100%";
		}
	}
}
//------------------------------------------------------------------------------
s3forecast.forecastbar.change_location = function(code) {
	chrome.runtime.sendMessage({ 'action' : 'change_forecast_data', 'code' : code }, function(response) {
		s3forecast.forecastbar.forecast_reload_img();
	});
}
//------------------------------------------------------------------------------
s3forecast.forecastbar.window_open = function(url) {
	window.open(url, "_blank");
}
//------------------------------------------------------------------------------
s3forecast.forecastbar.pref_save = function(pref_name, pref_value, callback) {
	chrome.runtime.sendMessage({ 'action_prefs_set': true, 'pref_name' : pref_name, 'pref_value': pref_value }, function(response) {
		if (callback) {
			callback();
		}
	});
	s3forecast.utils.prefs_set(pref_name, pref_value);
}
//------------------------------------------------------------------------------
s3forecast.forecastbar.onMessage = function(request, sender, sendResponse) {
	//------------------------------------------------------------------------
	if (! request) { return; }
	//------------------------------------------------------------------------
	if (request.action_reload_popup) {
		s3forecast.prefs.init(function(){
			s3forecast.themes.init(null, function(){
				if (s3forecast.forecastbar.create_forecastbar_box()) {
					s3forecast.forecastbar.set_forecast_data(request.forecast_data, request.location_list);
				}
			});
		});
	}
	//------------------------------------------------------------------------
	else if (request.action_prepare_popup) {
		s3forecast.forecastbar.forecast_reload_img();
	}
	//------------------------------------------------------------------------
	else if (request.check_tooltip) {
		sendResponse({ 'success' : true });
	}
	//------------------------------------------------------------------------
	else if (request.action_change_zoom) {
		s3forecast.forecastbar.set_zoom(request.zoom_index);
		sendResponse({ 'success' : true });
	}
	//------------------------------------------------------------------------
	else if (request.set_radar_image && s3forecast.forecastbar.radar_image) {
		if (s3forecast.forecastbar.radar_image.source_src == request.radar_src) {
			s3forecast.forecastbar.radar_image.src = request.radar_data;
		}
	}
}
//------------------------------------------------------------------------------
s3forecast.forecastbar.init_0(60);
