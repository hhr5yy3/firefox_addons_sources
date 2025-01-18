var s3forecast = {};
s3forecast.geolocation = {};
s3forecast.geolocation.show_english_locations = false;
s3forecast.geolocation.p = {};
s3forecast.geolocation.infowindow = document.getElementById('geolocation_infowindow');
s3forecast.geolocation.script_wrapper = document.getElementById('script_wrapper');
s3forecast.geolocation.SEARCH_URL = 'http://forecastfox.accuweather.com/widget/forecastfoxjson/location-seek-json.asp?';

//------------------------------------------------------------------------------
s3forecast.geolocation.init = function(p) {
	s3forecast.geolocation.p = p;

	document.getElementById('geolocation_infowindow_accuerror').textContent = p['string_options.search.accuerror'];
	document.getElementById('geolocation_infowindow_tryagain').textContent = p['string_options.locations.tryagain'];
	document.getElementById('geolocation_infowindow_select').textContent = p['string_options.locations.select'];
	document.getElementById('geolocation_infowindow_zoom').textContent = p['string_options.locations.zoom'];

	s3forecast.geolocation.script_wrapper_set('search_url', s3forecast.geolocation.SEARCH_URL);

	if (p.resource == 'options') {
		document.getElementById('geolocation_infowindow_select').style.fontSize = '13px';
		document.getElementById('geolocation_infowindow_zoom').style.fontSize = '13px';
	}

	setTimeout(function(){
		s3forecast.geolocation.load_google_maps();
	}, 100);
}
//------------------------------------------------------------------------------
s3forecast.geolocation.script_wrapper_set = function(name, value) {
	s3forecast.geolocation.script_wrapper.setAttribute(name, value);
}
//------------------------------------------------------------------------------
s3forecast.geolocation.load_google_maps = function() {
	var locale_i18n = s3forecast.geolocation.p.locale_i18n;
	if ((locale_i18n == 'de-DSB') || (locale_i18n == 'de-HSB')) {
		locale_i18n = 'de';
	}
	s3forecast.geolocation.show_english_locations = s3forecast.utils.prefs_get('show_english_locations');
	var lang = (s3forecast.geolocation.show_english_locations) ? 'en' : locale_i18n;
	s3forecast.geolocation.script_wrapper_set('load_map', lang);
	s3forecast.geolocation.script_wrapper_set('show_english_locations', s3forecast.geolocation.show_english_locations);
	s3forecast.geolocation.script_wrapper_set('locale_i18n', s3forecast.geolocation.p.locale_i18n);
}
//------------------------------------------------------------------------------
