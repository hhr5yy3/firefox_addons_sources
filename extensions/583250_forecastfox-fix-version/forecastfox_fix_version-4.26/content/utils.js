s3forecast.utils = {};

//------------------------------------------------------------------------------
s3forecast.utils.console_log = function(msg) {
	console.log('%O', msg);
}
//------------------------------------------------------------------------------
s3forecast.utils.prefs_get = function(pref_name) {
	var pref_value = s3forecast.prefs.get(pref_name);
	try {
		return s3forecast.utils.clone_object(pref_value);
	} catch(e) {
		return pref_value;
	}
}
//------------------------------------------------------------------------------
s3forecast.utils.prefs_set = function(pref_name, pref_value) {
	s3forecast.prefs.set({ 'name' : pref_name, 'value' : pref_value });
	return true;
}
//------------------------------------------------------------------------------
s3forecast.utils.get_string = function(name, params) {
	var result = '';
	if (! params) { params = [] }

	try {
		result = s3forecast.i18n.get_string(name, params);
	} catch(e) {
		result = name + e;
	}
	return result || name;
}
//------------------------------------------------------------------------------
s3forecast.utils.clone_object = function(object) {
	return JSON.parse(JSON.stringify(object));
}
//------------------------------------------------------------------------------
s3forecast.utils.get_element = function(parent, search_id) {
	if (parent == null) { return null; };

	for (var i=0; i<parent.childNodes.length; i++) {
		var el = parent.childNodes[i];
		if (el.id == search_id) {
			return el;
		}
		if (el.hasChildNodes()) {
			var res = s3forecast.utils.get_element(el, search_id);
			if (res != null) {
				return res;
			}
		}
	}
	return null;
}
//------------------------------------------------------------------------------
s3forecast.utils.HTMLDOM_value = function(html_element, value) {
	var tagName = (html_element.tagName) ? html_element.tagName.toUpperCase() : '#text';
	var is_input_tag = ((tagName == 'INPUT') || (tagName == 'TEXTAREA')) ? true : false;

	if (value === undefined) {
		return (is_input_tag) ? html_element.value : html_element.textContent;
	} else {
		if (is_input_tag) {
			html_element.value = value;
		} else {
			html_element.textContent = value;
		}
		return;
	}
}
//------------------------------------------------------------------------------
s3forecast.utils.i18n_parse = function(doc) {
	s3forecast.i18n.parse_html(doc);
}
//------------------------------------------------------------------------------
s3forecast.utils.urlencode = function(str) {
	str = (str + '').toString();
	return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');
}
//------------------------------------------------------------------------------
s3forecast.utils.get_request = function(params) {
	var url_part = params.url.split('?', 2);

	var req = new XMLHttpRequest();
	if (params.timeout) {
		req.timeout = params.timeout;
	}

	if (! params.type) {
		var text_length = url_part[1].length;
		params.type = (text_length>750) ? 'POST' : 'GET';
	}

	req.onreadystatechange = function () {
		if (req.readyState == 4) {
			if (req.status == 200) {
				if (params.success) {
					params.success(req.responseText);
				}
			} else {
				if (params.error) {
					params.error(req.statusText);
				}
			}
		}
	};

	if (params.type == 'POST') {
		req.open("POST", url_part[0], true);
		req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		req.send(url_part[1]);
	} else {
		req.open("GET", params.url, true);
		req.send(null);
	}

	return req;
}
//-------------------------------------------------------------------------------------------
s3forecast.utils.random_string = function(size) {
	var size = size || 5;
	var a = 'qwertyuiopasdfghjklzxcvbnm0123456789';
	var result = '';
	for (var i=0; i<size; i++) {
		result += a.substr(Math.floor(Math.random() * a.length), 1);
	}
	return result;
}
//-------------------------------------------------------------------------------------------
s3forecast.utils.parse_document = function(doc, data) {
	if (doc.childNodes && doc.childNodes.length) {
		for (var i=0; i<doc.childNodes.length; i++) {
			var el = doc.childNodes[i];
			if (el.hasChildNodes()) {
				s3forecast.utils.parse_document(el, data);
			}
			else {
				var value = s3forecast.utils.HTMLDOM_value(el);
				value = s3forecast.utils.parse_template(value, data);
				s3forecast.utils.HTMLDOM_value(el, value);
			}
		}
	}
}
//-------------------------------------------------------------------------------------------
s3forecast.utils.parse_template = function(str, data) {
	// str = "asd ${a1} ${bbb}"
	// data = { 'a1' : '555', 'bbb' : 'wow!'}

	for (var d in data) {
		var regexp = new RegExp("\\${" + d + "}", "g");
		str = str.replace(regexp, data[d]);
	}

	function replacer(str, p1, p2, offset, s) {
		var keys = p2.split('-');
		if (keys.length>1) {
			var d = data;
			for (var i=0; i<keys.length; i++) {
				var key = keys[i];
				if (d[key] != undefined) {
					d = d[key];
				} else {
					return p1;
				}
			}
			if (d != undefined) {
				return d;
			}
		}
		return p1;
	}

	str = str.replace(/(\$\{([^\}]+)\})/g, replacer);
	return str;
}
//-------------------------------------------------------------------------------------------
s3forecast.utils.text_hash_get = function(str, hash) {
	var k = str.split('.');
	var result;

	try {
		if (k.length == 1) { result = hash[k[0]]; }
		if (k.length == 2) { result = hash[k[0]][k[1]]; }
		if (k.length == 3) { result = hash[k[0]][k[1]][k[2]]; }
		if (k.length == 4) { result = hash[k[0]][k[1]][k[2]][k[3]]; }
	} catch(e) {
	}
	return result;
}
//-------------------------------------------------------------------------------------------
s3forecast.utils.text_hash_set = function(str, hash, value) {
	var k = str.split('.');
	try {
		if (k.length == 1) { hash[k[0]] = value; }
		if (k.length == 2) { hash[k[0]][k[1]] = value; }
		if (k.length == 3) { hash[k[0]][k[1]][k[2]] = value; }
		if (k.length == 4) { hash[k[0]][k[1]][k[2]][k[3]] = value; }
	} catch(e) {
	}
	return hash;
}
//-------------------------------------------------------------------------------------------
s3forecast.utils.create_forecast_title = function(forecast_data) {
	var cc = {
		'temperature' : forecast_data.cc.temperature.high,
		'text' : forecast_data.cc.text,
		'location' : forecast_data.location,
		'date_locale' : forecast_data.cc.date_locale,
		'time' : forecast_data.cc.time
	};
	//------------------------------------------------------------------------------------
	var title = s3forecast.utils.parse_template(s3forecast.i18n.get_string("features.action"), cc);
	var tooltiptext_forecast_days = s3forecast.utils.prefs_get('tooltiptext_forecast_days');
	//------------------------------------------------------------------------------------
	if (forecast_data.forecast && forecast_data.forecast.length && (tooltiptext_forecast_days>0)) {
		var title_length = title.length;
		var tooltip_text = [];
		var tooltiptext_day_name = s3forecast.utils.prefs_get('tooltiptext_day_name');
		var tooltiptext_days_or_nights = s3forecast.utils.prefs_get('tooltiptext_days_or_nights');
		var tooltiptext_separators = s3forecast.utils.prefs_get('tooltiptext_separators');
		//-----------------------------------------------------------------------------
		for (var i=0; i<=7; i++) {
			var f = forecast_data.forecast[i];
			//----------------------------------------------------------------------
			if (! f) { continue; }
			if ((i+1) > tooltiptext_forecast_days) { continue; }
			//----------------------------------------------------------------------
			var day_name = (tooltiptext_day_name == 'full') ? f.day.day : (tooltiptext_day_name == 'date') ? f.day.date_locale : f.day.short_day;
			var forecast = day_name  + ' : ' + f.day.temperature.high + ' / ' + f.night.temperature.high + ' ; ' + f.day.text.shrt;
			if (tooltiptext_days_or_nights == 'days') {
				forecast = day_name  + ' : ' + f.day.temperature.high + ' ; ' + f.day.text.shrt;
			} else if (tooltiptext_days_or_nights == 'nights') {
				forecast = day_name  + ' : ' + f.night.temperature.high + ' ; ' + f.night.text.shrt;
			}
			tooltip_text.push(forecast);
			title_length = (title_length < forecast.length) ? forecast.length : title_length;
		}
		//-----------------------------------------------------------------------------
		var separator = '';
		var separator_head = '';
		for (var i=0; i<title_length; i++) {
			separator += (tooltiptext_separators) ? '–' : '';
			separator_head += (tooltiptext_separators) ? 'Ξ' : '-';
		}
		//-----------------------------------------------------------------------------
		separator += (separator) ? "\n" : '';
		separator_head += "\n";
		//-----------------------------------------------------------------------------
		if (tooltiptext_separators) { title = separator_head + title; }
		//-----------------------------------------------------------------------------
		for (var i=0; i<tooltip_text.length; i++) {
			title += "\n" + separator_head + tooltip_text[i];
			separator_head = separator;
		}
		//-----------------------------------------------------------------------------
		if (tooltiptext_separators) { title += "\n"  + separator_head; }
	}

	return title;
}
//-------------------------------------------------------------------------------------------
s3forecast.utils.make_location_short_name = function(name) {
	var name_short = name;
	if (name_short.length > 43) {
		name_short = name_short.substr(0, 40) + '...';
	}
	return name_short;
}
//------------------------------------------------------------------------------
s3forecast.utils.get_radar_src = function(radar_url) {
	var radar_custom_url = s3forecast.utils.prefs_get('radar_custom_url');
	if (! /^https?:\/\//i.test(radar_custom_url)) {
		radar_custom_url = radar_url;
	}

	if (s3forecast.utils.prefs_get('radar_type') == 'custom') {
		return radar_custom_url;
	} else if (s3forecast.utils.prefs_get('radar_type') == 'windy.com') {
		return 'windy.com';
	} else {
		return radar_url;
	}
}
//------------------------------------------------------------------------------
s3forecast.utils.check_radar_iframe = function() {
	if (s3forecast.utils.prefs_get('radar_type') == 'windy.com') {
		return true;
	}
	else if (s3forecast.utils.prefs_get('radar_type') == 'custom') {
		var radar_custom_url = s3forecast.utils.prefs_get('radar_custom_url');
		if (/^https?:\/\//i.test(radar_custom_url)) {
			radar_custom_url = radar_custom_url.replace(/\?.*$/, '');
			if (! /.(png|jpeg|jpg|gif|bmp)$/i.test(radar_custom_url)) {
				return true;
			}
		}
	}

	return false;
}
//------------------------------------------------------------------------------
s3forecast.utils.get_left_right_location = function(location_list) {
	var location_left = location_list[location_list.length-1];
	var location_right = location_list[0];

	//------------------------------------------------------------------------
	for (var i=0; i<location_list.length; i++) {
		if (location_list[i].current) {
			if (i>0) {
				location_left = location_list[i-1];
			}
			if (i<(location_list.length-1)) {
				location_right = location_list[i+1];
			}
			break;
		}
	}

	return { 'left' : location_left, 'right' : location_right };
}
//-------------------------------------------------------------------------------------------
s3forecast.utils.copy_clipboard = function(text, text_html) {
	var old_handler = document.oncopy;
	var handler = function(event) {
		event.clipboardData.setData('text/plain', text);
		if (text_html) {
			event.clipboardData.setData('text/html', text_html);
		}
		event.preventDefault();
		document.oncopy = old_handler;
	};
	document.oncopy = handler;

	var textarea = document.createElement("textarea");
	var scrollX = window.scrollX;
	var scrollY = window.scrollY;

	textarea.style.position = "absolute";
	textarea.style.left = scrollX + "px";
	textarea.style.top = scrollY + "px";
	textarea.style.width = "1px";
	textarea.style.height = "1px";

	document.body.appendChild(textarea);
	textarea.focus();
	document.execCommand("copy", false, null);
	document.body.removeChild(textarea);
}
//-------------------------------------------------------------------------------------------
s3forecast.utils.check_isMac = function() {
	var text = window.navigator.platform;
	return (text.indexOf('Mac') >= 0) ? true : false;
}
//-------------------------------------------------------------------------------------------
s3forecast.utils.check_isFirefox = function() {
	var text = window.navigator.userAgent;
	return (text.indexOf("Firefox") >=0) ? true : false;
}
//-------------------------------------------------------------------------------------------
