s3forecast.themes = {};
s3forecast.themes.icon_pack = {};
s3forecast.themes.URL = 'https://www.s3blog.org/forecastfox-files/themes/%ID%/data.json?v4';
s3forecast.themes.req = null;

//------------------------------------------------------------------------------
s3forecast.themes.init = function(theme_id, callback) {
	if (! theme_id) {
		theme_id = s3forecast.utils.prefs_get('theme_icon_pack');
	}
	s3forecast.themes.load(theme_id, callback);
}
//------------------------------------------------------------------------------
s3forecast.themes.get = function(icon_id, icon_type) {
	if (! s3forecast.themes.icon_pack.id) {
		s3forecast.themes.init_default();
	}
	return s3forecast.themes.icon_pack[icon_type][icon_id];
}
//------------------------------------------------------------------------------
s3forecast.themes.load = function(theme_id, callback) {
	//------------------------------------------------------------------------
	if (theme_id == 1) {
		s3forecast.themes.load_done(theme_id, null, callback);
		return;
	}
	//------------------------------------------------------------------------
	s3forecast.themes.icon_pack = s3forecast.utils.prefs_get('theme_icon_pack_data');
	if (s3forecast.themes.icon_pack && (s3forecast.themes.icon_pack.id == theme_id) && s3forecast.themes.icon_pack.forecastbar) {
		s3forecast.themes.load_done(theme_id, s3forecast.themes.icon_pack, callback);
		return;
	}
	//------------------------------------------------------------------------
	if (s3forecast.themes.req) {
		try {
			s3forecast.themes.req.abort();
		} catch(e) {
		}
	}

	s3forecast.themes.req = new XMLHttpRequest();
	s3forecast.themes.req.onreadystatechange = function () {
		if (s3forecast.themes.req.readyState == 4) {
			var responseText = s3forecast.themes.req.status + ': ' + s3forecast.themes.req.statusText;
			if (s3forecast.themes.req.status == 200) {
				try {
					var response = JSON.parse(s3forecast.themes.req.responseText);
					if (response.id) {
						s3forecast.themes.req = null;
						s3forecast.themes.load_done(theme_id, response, callback);
						return;
					}
				} catch(e) {
					if (e.message) {
						responseText = e.message;
					} else {
						responseText = e;
					}
				}
			}
			s3forecast.themes.req = null;
			s3forecast.themes.load_error(theme_id, responseText, callback);
		}
	};
	var url = s3forecast.themes.URL.replace('%ID%', theme_id);
	s3forecast.themes.req.open("GET", url, true);
	s3forecast.themes.req.send(null);
}
//------------------------------------------------------------------------------
s3forecast.themes.load_done = function(theme_id, icon_pack_data, callback) {
	if (icon_pack_data) {
		s3forecast.utils.prefs_set('theme_icon_pack', theme_id);
		s3forecast.utils.prefs_set('theme_icon_pack_data', icon_pack_data);
		s3forecast.themes.icon_pack = icon_pack_data;
	} else {
		s3forecast.themes.init_default();
	}
	chrome.runtime.sendMessage({ 'action_themes_load_done': true, 'theme_id' : theme_id }, function(response) { if (chrome.runtime.lastError) {} }); 
	if (callback) { callback(); }
}
//------------------------------------------------------------------------------
s3forecast.themes.load_error = function(theme_id, error_text, callback) {
	s3forecast.themes.init_default();
	chrome.runtime.sendMessage({ 'action_themes_load_error': true, 'error_text' : error_text, 'theme_id' : theme_id }, function(response) { if (chrome.runtime.lastError) {} }); 
	if (callback) { callback(); }
}
//------------------------------------------------------------------------------
s3forecast.themes.init_default = function() {
	//------------------------------------------------------------------------
	s3forecast.themes.icon_pack = {
		"id" : 1,
		"large" : {},
		"small" : {},
		"forecastbar" : {},
	};
	//------------------------------------------------------------------------
	for (var i=1; i<=44; i++) {
		s3forecast.themes.icon_pack.large[i] = chrome.extension.getURL('/skin/default/large/' + i + '.png');
		s3forecast.themes.icon_pack.small[i] = chrome.extension.getURL('/skin/default/small/' + i + '.png');
		s3forecast.themes.icon_pack.forecastbar[i] = chrome.extension.getURL('/skin/default/forecastbar/' + i + '.png');
	}
	//------------------------------------------------------------------------
	s3forecast.utils.prefs_set('theme_icon_pack', "1");
	s3forecast.utils.prefs_set('theme_icon_pack_data', s3forecast.themes.icon_pack);
}
//------------------------------------------------------------------------------
