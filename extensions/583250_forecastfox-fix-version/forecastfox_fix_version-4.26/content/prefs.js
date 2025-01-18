s3forecast.prefs = {};
s3forecast.prefs.list = {};
s3forecast.prefs.is_init = false;

//------------------------------------------------------------------------------
s3forecast.prefs.init = function(callback) {
	chrome.storage.local.get(function(items) {
		s3forecast.prefs.list = items;

		if (s3forecast.i18n) {
			s3forecast.i18n.init(items.current_locale);
		}

		s3forecast.prefs.check_defaults();
		s3forecast.prefs.is_init = true;
		if (callback) {
			callback();
		}
	});
}
//------------------------------------------------------------------------------
s3forecast.prefs.set = function(pref) {
	var pref_hash = {};
	pref_hash[pref.name] = pref.value;
	chrome.storage.local.set(pref_hash);
	s3forecast.prefs.list[pref.name] = pref.value;
}
//------------------------------------------------------------------------------
s3forecast.prefs.get = function(pref_name) {
	return s3forecast.prefs.list[pref_name];
}
//------------------------------------------------------------------------------
s3forecast.prefs.check_defaults = function() {
	var defaults = s3forecast.utils.clone_object(s3forecast.prefs.defaults);
	if (! /^en/i.test(window.navigator.language)) {
		defaults.unitsystem = 'metric';
		defaults.units = {
			'temperature' : [ 'c' ],
			'speed' : [ 'kph' ],
			'date' : 'date_system',
			'date_custom_format' : '%d-%m-%Y',
			'time' : [ 'h24' ],
			'pressure' : [ 'mmhg' ],
			'distance': { "shrt": ["cm"], "lng": ["km"] }
		};
	}

	for (var pref_name in defaults) {
		if (s3forecast.prefs.list[pref_name] === undefined) {
			s3forecast.prefs.list[pref_name] = defaults[pref_name];
		}
		else if (typeof(s3forecast.prefs.list[pref_name]) != typeof(defaults[pref_name])) {
			s3forecast.prefs.list[pref_name] = defaults[pref_name];
		}
	}
}
//------------------------------------------------------------------------------
s3forecast.prefs.reset_defaults = function(callback) {
	chrome.storage.local.clear(function() {
		s3forecast.prefs.list = {};
		s3forecast.prefs.check_defaults();
		if (s3forecast.i18n) {
			s3forecast.i18n.init();
		}
		if (callback) {
			callback();
		}
	});
}
//------------------------------------------------------------------------------
s3forecast.prefs.defaults = {
	'current_version' : '0',
	'not_open_contribute_page' : false,
	'show_page_timer' : 0, 
	'first_run' : true, 

	'update_timer_value' : 30, // minutes
	'last_data' : {},
	'location_list' : null,
	'migration_callout' : true,    // displays welcome message in customization
	'top_instructions' : true,
	'show_english_locations' : false,
	'unitsystem' : "american",
	'rotate' : {
		'enabled' : false,
		'interval' : 0.05
	},
	'theme_icon_pack' : '1',
	'theme_black_white' : false,
	'theme_button_temperature' : true,
	'radar_type' : 'system', // system , custom , windy.com
	'radar_custom_url' : 'http://sirocco.accuweather.com/nx_mosaic_400x300_public/sir/inmasirCT_.gif',
	'radar_layer' : 'wind', // wind , rain , temp , clouds , pressure, radar
	'warning_swa' : true,

	'units' : {
		'temperature' : [ 'f' ],
		'speed' : [ 'mph' ],
		'date' : 'date_system',
		'date_custom_format' : '%d-%m-%Y',
		'time' : [ 'h12' ],
		'pressure' : [ 'inhg' ],
		'distance' : { 'shrt': [ 'inches' ], 'lng': [ 'mi' ] }
	},

	'tooltiptext_day_name' : 'full',  // full , short , date
	'tooltiptext_days_or_nights' : 'both',  // both , days , nights
	'tooltiptext_separators' : true,
	'tooltiptext_forecast_days' : 7, // max 7

	'forecastbar_show' : true,
	'forecastbar_position' : 'top-right', // top-left , top-right , bottom-left , bottom-right
	'forecastbar_exclude_links' : [],
	'forecastbar_view_vertical' : true,
	'forecastbar_location_show' : true,
	'forecastbar_is_collapsed' : true,
	'forecastbar_cc' : true,
	'forecastbar_days_or_nights' : 'both',  // both , days , nights
	'forecastbar_daynight_separators' : true,
	'forecastbar_day_name' : 'full',  // full , short , date
	'forecastbar_forecast_days' : 7,  // max 7
	'forecastbar_forecast_labels' : 15, // max 15
	'forecastbar_feature_humidity' : true,
	'forecastbar_feature_dewpoint' : true,
	'forecastbar_feature_uvindex' : true,
	'forecastbar_feature_winds' : true,
	'forecastbar_feature_visibility' : true,
	'forecastbar_feature_pressure' : true,
	'forecastbar_feature_precipitation' : true,
	'forecastbar_feature_moon' : true,
	'forecastbar_button_radar' : true,
	'forecastbar_button_hourly' : true,
	'forecastbar_button_5day' : true,
	'forecastbar_button_locations' : true,
	'forecastbar_button_reload' : true,

	'_end' : '_end'
};
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
s3forecast.prefs.init();
