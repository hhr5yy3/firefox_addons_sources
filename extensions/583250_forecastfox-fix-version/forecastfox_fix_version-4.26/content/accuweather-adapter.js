s3forecast.adapter = {};

// s3forecast.adapter.SEARCH_URL = 'http://tclandroidicsapp.accu-weather.com/widget/tclandroidicsapp/city-find.asp?';
s3forecast.adapter.SEARCH_URL_LOCATION = 'https://s3blog.org/forecastfox3-accu-weather/city-find.asp?';
s3forecast.adapter.SEARCH_URL_LATLNG = 'https://samsungmobile.accu-weather.com/widget/samsungmobile/city-find.asp?';
// s3forecast.adapter.SEARCH_URL_LATLNG_ALTERNATIVE = 'https://m.accuweather.com/location/currentlocation?';
s3forecast.adapter.SEARCH_URL_LATLNG_ALTERNATIVE = 'https://www.accuweather.com/web-api/three-day-redirect?';

s3forecast.adapter.CC_URL = 'https://s3blog.org/forecastfox3-accu-weather/current-conditions.asp?location=${location}&metric=0&langId=${lang}&${rnd_symbols}=${rnd}';
//s3forecast.adapter.FORECAST_URL = "https://s3blog.org/forecastfox3-accu-weather/forecast-data.asp?location=${location}&metric=0&langId=1&${rnd_symbols}=${rnd}";
s3forecast.adapter.FORECAST_URL = "https://s3blog.org/forecastfox3-accu-weather/forecast-data.asp?location=${location}&metric=0&langId=${lang}&${rnd_symbols}=${rnd}";
s3forecast.adapter.FORECAST_URL_ALTERNATIVE = "https://samsungmobile.accu-weather.com/widget/samsungmobile/weather-data.asp?location=${location}&metric=0&langId=${lang}&xmlVersion=6&${rnd_symbols}=${rnd}";
s3forecast.adapter.FORECAST_URL_TRANSLATE = "https://samsungmobile.accu-weather.com/widget/samsungmobile/weather-data.asp?location=${location}&metric=0&langId=${lang}&xmlVersion=6&${rnd_symbols}=${rnd}";

s3forecast.adapter.DO_URL = {};
s3forecast.adapter._feed_xhr = {};

s3forecast.adapter.COORD_ARGS = 'latitude=${lat}&longitude=${lon}';
s3forecast.adapter.LOCID_ARGS = 'location=${loc}';

s3forecast.adapter.FeedError = { CONNECTION: 1, LOCATION_NOT_FOUND: 2, UNKNOWN: 3 };

//-------------------------------------------------------------------------
//-------------------------------------------------------------------------
s3forecast.adapter.find_location = function (query, search_id, callback, errback) {
	//------------------------------------------------------------------
	// step 1 - search by location
	//------------------------------------------------------------------
	if (! query.location.locality) {
		s3forecast.adapter.find_location2(query, search_id, callback, errback);
		return;
	}
	//------------------------------------------------------------------
	var argArr = [];
	argArr.push(query.location.locality.replace(/\'/g, ''));
	argArr.push(query.location.country);
//	argArr.push(query.location.political);

	if ('postal_code' in query.location) {
		if (query.location.country == 'US') {
			argArr.push(query.location.postal_code);
		}
	}

	var url = s3forecast.adapter.SEARCH_URL_LOCATION;
	url += 'location=' + s3forecast.utils.urlencode(argArr.join(' '));

	s3forecast.adapter.find_location_location(url, search_id, callback, function(){
		s3forecast.adapter.find_location2(query, search_id, callback, errback);
	});
},
//-------------------------------------------------------------------------
s3forecast.adapter.find_location2 = function (query, search_id, callback, errback) {
	//------------------------------------------------------------------
	// step 2 - search by latlng
	//------------------------------------------------------------------
	var args = {};
	var args_alt = {};
	var argArr = [];
	var argArr_alt = [];

	args.latitude = query.latlng.lat;
	args.longitude = query.latlng.lng;
	args_alt.lat = query.latlng.lat;
	args_alt.lon = query.latlng.lng;

	var url = s3forecast.adapter.SEARCH_URL_LATLNG;
	var url_alt = s3forecast.adapter.SEARCH_URL_LATLNG_ALTERNATIVE;

	for (var x in args) {
		argArr.push(x + '=' + encodeURIComponent(args[x]));
	}
	for (var x in args_alt) {
		argArr_alt.push(x + '=' + encodeURIComponent(args_alt[x]));
	}

	s3forecast.adapter.find_location_latlng(url + argArr.join('&'), query, search_id, callback, errback, url_alt + argArr_alt.join('&'));
}
//-------------------------------------------------------------------------
s3forecast.adapter.find_location_latlng = function (url, query, search_id, callback, errback, url_alt) {
	var deferred = s3forecast.utils.get_request({
		url: url,
		type: 'GET',
		timeout: 10*1000,  
		error: function (status) {
			return s3forecast.adapter.find_location_latlng_alternative(url_alt, 'GET', search_id, callback, errback);
		},
		success: function (responseText) {
			var data = s3forecast.text2xml(responseText);
			try {
				var json = s3forecast.xml2json(data);
				if (json && json.citylist && json.citylist.location && (! Array.isArray(json.citylist.location))) {
					callback(search_id, json.citylist.location.location);
					return;
				}
			} catch(e) {
			}
			return s3forecast.adapter.find_location_latlng_alternative(url_alt, 'GET', search_id, callback, errback);
		}		
	});
},
//-------------------------------------------------------------------------
s3forecast.adapter.find_location_latlng_alternative = function (url, method, search_id, callback, errback) {
	var deferred = s3forecast.utils.get_request({
		url: url,
		type: method,
		timeout: 10*1000,  
		error: function (status) {
			var errorType = s3forecast.adapter.FeedError.UNKNOWN;
			if (status == 'timeout') {
				errorType = s3forecast.adapter.FeedError.CONNECTION;
			}
			errback(search_id, errorType);
		},
		success: function (responseText) {
			var city_id = 0;
			var text_result = /<link[^>]+\/weather\-forecast\/(\d+)/i.exec(responseText);
			if (text_result != null) {
				city_id = text_result[1];
			} else {
				text_result = /<meta[^>]+\/weather\-forecast\/(\d+)/i.exec(responseText);
				if (text_result != null) {
					city_id = text_result[1];
				}
			}
			if (city_id == 0) {
				errback(search_id, s3forecast.adapter.FeedError.LOCATION_NOT_FOUND);
				return;
			}
			callback(search_id, 'cityId:' + city_id);
		}
	});
},
//-------------------------------------------------------------------------
s3forecast.adapter.find_location_location = function (url, search_id, callback, errback) {
	var deferred = s3forecast.utils.get_request({
		url: url, 
		type: 'GET', 
		timeout: 10*1000,
		error : function (status) {
			var errorType = s3forecast.adapter.FeedError.UNKNOWN;
			if (status == 'timeout') {
				errorType = s3forecast.adapter.FeedError.CONNECTION;
			}
			errback(search_id, errorType);
		},
		success : function (data) {
			data = s3forecast.text2xml(data);
			try {
				var json = s3forecast.xml2json(data);
				if (json && json.citylist && json.citylist.location && (! Array.isArray(json.citylist.location))) {
					callback(search_id, json.citylist.location.location);
					return;
				}
			} catch(e) {
			}
			errback(search_id, s3forecast.adapter.FeedError.LOCATION_NOT_FOUND);
		}
	});
}
//-------------------------------------------------------------------------
s3forecast.adapter.change_url = function(data) {
	try {
		var childNodes = data.childNodes;
		var locale_i18n = s3forecast.i18n.locale();
		if ((locale_i18n == 'de-DSB') || (locale_i18n == 'de-HSB')) {
			locale_i18n = 'de';
		}
		if (childNodes && (childNodes.length > 0)) {
			for (var n=0; n<childNodes.length; n++) {
				var node = childNodes[n];
				if (node.nodeType == node.TEXT_NODE) {
					if (node.textContent && (node.textContent != null)) {
						node.textContent = node.textContent.replace(/^(https?\:\/\/)spotlight\.accuweather\.com\/dyndoc\/goto\/.*?\|(www\.accuweather\.com\/.*)$/ig, '$1$2');
						node.textContent = node.textContent.replace(/^(https?\:\/\/www\.accuweather\.com\/)en.*?\/(.+)/ig, '$1' + locale_i18n + '/$2');
						node.textContent = node.textContent.replace(/http\:\/\//ig, 'https://');
					}
				} else {
					s3forecast.adapter.change_url(node);
				}
			}
		}
	} catch(e) {
	}
}
//-------------------------------------------------------------------------
s3forecast.adapter.normalize_alt_url = function(url) {
	url = url.replace(/^(https?\:\/\/www\.accuweather\.com\/)m\//ig, '$1');
	url = url.replace(/^(http)(\:\/\/www\.accuweather\.com\/)/ig, 'https$2');
	url = url.replace(/\?p(artner)?\=[^\&]+/, '?');
	url = url.replace(/\&lang\=[^\&]+/, '');
	url = url.replace(/\?\&/, '?');
	url = url.replace(/\?$/, '');
	return url;
}
//-------------------------------------------------------------------------
s3forecast.adapter.normalize_forecast_data = function(data) {
	data.forecast.url = s3forecast.adapter.normalize_alt_url(data.forecast.url || data.forecast.traditionalLink || '');
	data.forecast.hbh = data.forecast.url.replace(/\/forecast\.aspx/i, '/Hourly.aspx').replace(/daily\-weather\-forecast/i, 'hourly-weather-forecast');
	data.forecast.url5Day = data.forecast.url;
	data.forecast.url = data.forecast.url.replace(/\/forecast\.aspx/i, '/Quick-Look.aspx').replace(/daily\-weather\-forecast/i, 'weather-forecast');;

	var moon_hash = {};
	var moon_hash_text = {
		'New' : 0,
		'Waxing Crescent' : 1,
		'First' : 2,
		'Waxing Gibbous' : 3,
		'Full' : 4,
		'Waning Gibbous' : 5,
		'Last' : 6,
		'Waning Crescent' : 7
	};

	for (var i in data.moon.phase) {
		moon_hash[data.moon.phase[i].date] = data.moon.phase[i].text;
	}
	for (var i in data.forecast.day) {
		data.forecast.day[i].url = s3forecast.adapter.normalize_alt_url(data.forecast.day[i].url || data.forecast.day[i].traditionalLink || '');
		data.forecast.day[i].obsDate = data.forecast.day[i].obsdate;
		data.forecast.day[i].dayName = data.forecast.day[i].daycode;
		data.forecast.day[i].dayCode = Number((new Date(data.forecast.day[i].obsdate)).toLocaleFormat('%w')) + 1;

		if (/AM/i.test(data.forecast.day[i].sunrise)) {
			data.forecast.day[i].sunrise = data.forecast.day[i].sunrise.replace(/ AM/i, '');
			data.forecast.day[i].sunrise = data.forecast.day[i].sunrise.replace(/^(\d)\:/i, '0$1:');
		}
		if (/AM/i.test(data.forecast.day[i].sunset)) {
			data.forecast.day[i].sunset = data.forecast.day[i].sunset.replace(/ AM/i, '');
			data.forecast.day[i].sunset = data.forecast.day[i].sunset.replace(/^(\d)\:/i, '0$1:');
		}
		if (/PM/i.test(data.forecast.day[i].sunrise)) {
			data.forecast.day[i].sunrise = data.forecast.day[i].sunrise.replace(/ PM/i, '');
			var digits = data.forecast.day[i].sunrise.split(/\:/);
			data.forecast.day[i].sunrise = (Number(digits[0])+12) + ':' + digits[1];
		}
		if (/PM/i.test(data.forecast.day[i].sunset)) {
			data.forecast.day[i].sunset = data.forecast.day[i].sunset.replace(/ PM/i, '');
			var digits = data.forecast.day[i].sunset.split(/\:/);
			data.forecast.day[i].sunset = (Number(digits[0])+12) + ':' + digits[1];
		}

		var dtime_list = ['daytime', 'nighttime'];
		for (var dtime_index in dtime_list) {
			var dtime = dtime_list[dtime_index];
			data.forecast.day[i][dtime].shortText = data.forecast.day[i][dtime].txtshort;
			data.forecast.day[i][dtime].longText = data.forecast.day[i][dtime].txtlong;
			data.forecast.day[i][dtime].realFeelHigh = data.forecast.day[i][dtime].realfeelhigh;
			data.forecast.day[i][dtime].realFeelLow = data.forecast.day[i][dtime].realfeellow;
			data.forecast.day[i][dtime].windDirectionText = data.forecast.day[i][dtime].windDirectionText || '';
			data.forecast.day[i][dtime].windSpeed = data.forecast.day[i][dtime].windspeed;
			data.forecast.day[i][dtime].windGust = data.forecast.day[i][dtime].windgust;
			data.forecast.day[i][dtime].maxUV = { 'index' : data.forecast.day[i][dtime].maxuv };
			data.forecast.day[i][dtime].rain = data.forecast.day[i][dtime].rainamount;
			data.forecast.day[i][dtime].snow = data.forecast.day[i][dtime].snowamount;
			data.forecast.day[i][dtime].ice = data.forecast.day[i][dtime].iceamount;
			data.forecast.day[i][dtime].liq = data.forecast.day[i][dtime].precipamount;
			data.forecast.day[i][dtime].thunderstormProb = data.forecast.day[i][dtime].tstormprob;
		}

		var moonPhaseText = moon_hash[data.forecast.day[i].obsDate];
		if (moon_hash_text[moonPhaseText] != undefined) {
			data.forecast.day[i].nighttime.moonPhaseNum = moon_hash_text[moonPhaseText];
		} else {
			data.forecast.day[i].nighttime.moonPhaseText = moonPhaseText;
		}
		data.forecast.day[i].nighttime.moonPhaseNum = data.forecast.day[i].nighttime.moonPhaseNum || 0;
	}

	return data;
}
//-------------------------------------------------------------------------
s3forecast.adapter.set_translate = function(data, data_translate) {
/*
	var day_translate = {};
	
	for (var i in data_translate.forecast.day) {
		if (data_translate.forecast.day[i]) {
			day_translate[data_translate.forecast.day[i].obsdate] = data_translate.forecast.day[i];
		}
	}
	for (var i in data.forecast.day) {
		if (day_translate[data.forecast.day[i].obsDate]) {
			var dtime_list = ['daytime', 'nighttime'];
			var data_day_translate = day_translate[data.forecast.day[i].obsDate];
			for (var dtime_index in dtime_list) {
				var dtime = dtime_list[dtime_index];
				data.forecast.day[i][dtime].shortText = data_day_translate[dtime].txtshort;
				data.forecast.day[i][dtime].longText = data_day_translate[dtime].txtlong;
				data.forecast.day[i][dtime].windDirectionText = data_day_translate[dtime].winddirection || '';

				if (dtime == 'daytime') {
					data.forecast.day[i][dtime].maxUV = { 'index' : data_day_translate[dtime].maxuv };
				}
			}
		}
	}
*/
	if (data_translate.forecast.traditionalLink) {
		data_translate.forecast.traditionalLink = s3forecast.adapter.normalize_alt_url(data_translate.forecast.traditionalLink);
		data.forecast.url5Day = data_translate.forecast.traditionalLink;
		data.forecast.url5Day = data.forecast.url5Day.replace(/[\&\?]p\=samsungmobile/, '');
		data.forecast.url5Day = data.forecast.url5Day.replace(/[\&\?]lang\=[^\&]+/, '');
	}

	return data;
}
//-------------------------------------------------------------------------
s3forecast.adapter.normalize_url_list = function(data) {
	var source_url = s3forecast.adapter.normalize_alt_url(data.forecast.forecast.url5Day);

	data.cc.current.url = source_url.replace(/daily\-weather\-forecast/i, 'weather-forecast');
	data.cc.images.radarLink = source_url.replace(/daily\-weather\-forecast/i, 'weather-radar');
	if (data.cc.watchWarningAdvisory) {
		data.cc.watchWarningAdvisory.url = source_url.replace(/daily\-weather\-forecast/i, 'weather-warnings');
	}

	data.forecast.forecast.url = source_url.replace(/daily\-weather\-forecast/i, 'weather-forecast');
	data.forecast.forecast.hbh = source_url.replace(/daily\-weather\-forecast/i, 'hourly-weather-forecast');
	for (var i=0; i<data.forecast.forecast.day.length; i++) {
		data.forecast.forecast.day[i].url = source_url + '?day=' + data.forecast.forecast.day[i].number;
	}

	return data;
}
//-------------------------------------------------------------------------
s3forecast.adapter.request_2_url = function(callback, code, lang_code, feed_type, request_count, json_data) {
	var link = s3forecast.adapter.FORECAST_URL;
	if (feed_type == 'cc' ) {
		link = s3forecast.adapter.CC_URL;
	} else if (feed_type == 'forecast-translate') {
		link = s3forecast.adapter.FORECAST_URL_TRANSLATE;
	} else if (feed_type == 'forecast-alternative') {
		link = s3forecast.adapter.FORECAST_URL_ALTERNATIVE;
	}

	var url = s3forecast.utils.parse_template(link, {
		location: encodeURIComponent(code),
		lang: encodeURIComponent(lang_code),
		rnd: (new Date()).getTime(),
		rnd_symbols : s3forecast.utils.random_string(3)
	});

	request_count -= 1;
	s3forecast.adapter._feed_xhr[code][feed_type] = s3forecast.utils.get_request({
		url: url,
		type: "GET",
		timeout: 20*1000,
		error: function (status) {
			s3forecast.adapter._feed_xhr[code][feed_type] = null;
			var errorType = s3forecast.adapter.FeedError.UNKNOWN;
			if (status == 'timeout') {
				errorType = s3forecast.adapter.FeedError.CONNECTION;
			}
			if ((feed_type == 'forecast-translate') && json_data) {
				callback({ resolve : json_data });
			} else {
				callback({ reject : errorType });
			}
		},
		success: function(data) {
			s3forecast.adapter._feed_xhr[code][feed_type] = null;
			data = s3forecast.text2xml(data);
			s3forecast.adapter.change_url(data);
			try {
				var json = s3forecast.xml2json(data);
				if (!json) {
					if ((feed_type == 'forecast-translate') && json_data) {
						callback({ resolve : json_data });
					} else {
						callback({ reject : s3forecast.adapter.FeedError.UNKNOWN });
					}
					return;
				}
				if ('error' in json) {
					if ((feed_type == 'forecast-translate') && json_data) {
						callback({ resolve : json_data });
						return;
					}
					if (json.error == 'Invalid location, or no location found') {
						callback({ reject : s3forecast.adapter.FeedError.LOCATION_NOT_FOUND });
					} else {
						callback({ reject : s3forecast.adapter.FeedError.UNKNOWN });
					}
					return;
				}
				//-----------------------------------------------------------
				var error_connect = false;
				if ((feed_type == 'forecast') && (! json.forecast)) {
					error_connect = true;
				} else if ((feed_type == 'forecast') && (! json.forecast.day)) {
					error_connect = true;
				} else if ((feed_type == 'forecast') && (! Array.isArray(json.forecast.day))) {
					error_connect = true;
				} else if ((feed_type == 'forecast-alternative') && (! json.forecast)) {
					error_connect = true;
				} else if ((feed_type == 'cc') && (! json.current)) {
					error_connect = true;
				}
				if (error_connect) {
					if (request_count > 0) {
						if ((feed_type == 'forecast') && (request_count < 5)) {
							feed_type = 'forecast-alternative';
						}
						s3forecast.adapter.DO_URL[code][feed_type] = setTimeout(function(){
							s3forecast.adapter.request_2_url(callback, code, lang_code, feed_type, request_count);
						}, 500);
						return;
					} else {
						callback({ reject : s3forecast.adapter.FeedError.CONNECTION });
						return;
					}
				}
				//-----------------------------------------------------------
				json.locale = s3forecast.i18n.locale();
				//-----------------------------------------------------------
				if (feed_type == 'forecast') {
//					if (parseInt(lang_code) != 0) {
						s3forecast.adapter.request_2_url(callback, code, lang_code, 'forecast-translate', 0, json);
						return;
//					}
				}
				else if (feed_type == 'forecast-translate') {
					json = s3forecast.adapter.set_translate(json_data, json);
				}
				else if (feed_type == 'forecast-alternative') {
					json = s3forecast.adapter.normalize_forecast_data(json);
				}
				else if (feed_type == 'cc') {
					try {
						var lang_locale = s3forecast.i18n.locale();
						var city_id = json.local.cityId;
						var country_code = json.local.country.code;
						if (lang_locale && city_id && country_code) {
	//						json.images.radarLink = 'https://www.accuweather.com/' + lang_locale + '/' + country_code + '/' + city_id + '/' + city_id + '/satellite/' + city_id;
							json.images.radarLink = 'https://www.accuweather.com/' + lang_locale + '/' + country_code + '/' + city_id + '/' + city_id + '/weather-radar/' + city_id;
						}
					} catch(e) {
					}
				}
			} catch (e) {
				if ((feed_type == 'forecast-translate') && json_data) {
					callback({ resolve : json_data });
				} else {
					callback({ reject : s3forecast.adapter.FeedError.UNKNOWN });
				}
				return;
			}
			callback({ resolve : json });
		}
	});
}
//------------------------------------------------------------------------------
s3forecast.adapter.fetch_feed_data = function (code, feed_type, callback) {
	var lang_code = s3forecast.i18n.accucode();

	if (s3forecast.adapter._feed_xhr[code] && s3forecast.adapter._feed_xhr[code][feed_type]) {
		s3forecast.adapter._feed_xhr[code][feed_type].abort();
	}

	if (!navigator.onLine) {
		callback({ reject : s3forecast.adapter.FeedError.CONNECTION });
		return;
	}

	if (s3forecast.adapter.DO_URL[code] && s3forecast.adapter.DO_URL[code][feed_type]) {
		try {
			clearTimeout(s3forecast.adapter.DO_URL[code][feed_type]);
		} catch(e) {
		}
	}

	s3forecast.adapter.DO_URL[code] = { 'cc' : null, 'forecast' : null, 'forecast-translate' : null };
	s3forecast.adapter._feed_xhr[code] = { 'cc' : null, 'forecast' : null };

	s3forecast.adapter.DO_URL[code][feed_type] = setTimeout(function(){
		s3forecast.adapter.request_2_url(callback, code, lang_code, feed_type, 7);
	}, 500);

	return;
}
