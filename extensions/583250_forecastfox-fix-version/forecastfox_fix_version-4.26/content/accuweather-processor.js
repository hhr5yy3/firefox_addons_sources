/*******************************************************************************
 * The Weather Data Provider manages getting the data from the feed and
 * converting it to a vendor neutral format. The service is responsible for
 * always providing up-to-date data (as specified by the data source being used).
 * The service returns data that already adheres to the user's location,
 * units preferences and locale.
 ******************************************************************************/

 /**
  * prof -- profile
  * ufdb -- ufdb coordinates
  * city -- city of location
  * state -- state of location
  * dnam -- location display name
  * lat -- latitude
  * lon - longitude
  * tm -- time of last update
  * dls -- daylight savings true/false
  * gmt -- offset
  * barr -- decimal current pressure
  * bard -- description of pressure change
  * tmp -- current temperature
  * flk -- realfeel
  * hmid -- humidiity
  * sunr -- sunrise
  * suns -- sunset
  * t -- forecast summary
  * windgust -- wind gust
  * winds -- wind sepeed
  * windt -- wind direction
  * vis -- visibility
  * precip -- amount of precipitation
  * uvi -- uv index
  * uvt -- uv text description
  * moon -- phase of moon
  * moont -- description of moon phase
  * moond -- date of moon phase
  * moonr -- time of moon rise
  * moons -- time of moonset
  * tree -- tree pollen amount
  * weed -- weed pollen amount
  * grass -- grass pollen amount
  * mold -- mold amount
  *
  */

s3forecast.processor = {};
s3forecast.processor.MAX_FORECASTED_DAYS = 6;

//-------------------------------------------------------------------------
s3forecast.processor.process_data = function(data, location) {
	var f = undefined;

	if (data.forecast) {
		f = [];
		// TODO(jstritar): This should be based on the data available in the feed.
		for (var x = 0; x <= s3forecast.processor.MAX_FORECASTED_DAYS; x++) {
			f.push({
				"day": s3forecast.processor._forecast(x, true, data, location),
				"night": s3forecast.processor._forecast(x, false, data, location)
			});
		}
	}

	return {
		"cc" : s3forecast.processor._cc(data, location),
		"swa" : s3forecast.processor._swa(data, location),
		"radar" : s3forecast.processor._radar(data, location),
//		"planets" : s3forecast.processor._planets(data),
		"forecast" : f,
		"location" : s3forecast.processor._location(data, location),
		"connect_error" : data.connect_error
	};
}
//-------------------------------------------------------------------------
s3forecast.processor.get_uv_text = function(uvindex) {
	var maxuv_hash = { 'low' : '60+', 'moderate' : '45', 'high' : '25', 'very_high' : '15', 'extreme' : '5' };
	var maxuv_key = 'low';
	uvindex = Number(uvindex);

	if (uvindex <= 2) {
		maxuv_key = 'low';
	}
	else if (uvindex <= 5) {
		maxuv_key = 'moderate';
	}
	else if (uvindex <= 7) {
		maxuv_key = 'high';
	}
	else if (uvindex <= 10) {
		maxuv_key = 'very_high';
	}
	else if (uvindex > 10) {
		maxuv_key = 'extreme';
	}
	return {
		'text' : s3forecast.i18n.get_string("data.maxuv." + maxuv_key),
		'minutes' : (maxuv_key == 'low') ? '' : s3forecast.utils.parse_template(s3forecast.i18n.get_string("data.maxuv.minutes"), { "minutes" : maxuv_hash[maxuv_key] })
	};
}
//-------------------------------------------------------------------------
/**
 * Retrieves the current conditions
 * @return a CurrentCondition as specified by CC_MOCK_DATA above.
 */
//-------------------------------------------------------------------------
s3forecast.processor._cc = function(data, location) {
	if (! data) { return; }
	if (! data.cc) { return; }

	var c = s3forecast.converter;
	var cc = data.cc.current;
	var obsDate = data.cc.local.date;

	if (! cc.uvindex) {
		cc.uvindex = { 'index': 0, 'text' : '' };
	}
	var uv_result = s3forecast.processor.get_uv_text(cc.uvindex.index);
	cc.uvindex.text = uv_result.text;
	cc.uvindex.minutes = uv_result.minutes;

	var pressure_trends = {'steady' : '—', 'decreasing' : '↓', 'rising' : '↑'};

	return s3forecast.processor._sanitize({
		"date": null, // TODO localized format
		"date_locale": c.date(obsDate),
		"day": s3forecast.i18n.get_string("features.cc.header"),  // TODO
		"short_day": s3forecast.i18n.get_string("features.cc.header"),
		"time": c.time(cc.observationtime),
		"time_raw": cc.observationtime,
		"text": {
			"shrt": c.description(cc.weathertext),
			"lng": c.description(cc.weathertext)
		},
		"icon": Number(cc.weathericon),
		"temperature": {
			"high": c.temperature(cc.temperature, ' / '),
			"low": c.temperature(cc.temperature, ' / '),
			"part": c.temperature(cc.temperature),
		},
		"realfeel": s3forecast.utils.parse_template(s3forecast.i18n.get_string("features.feelslike"), { "realfeel": c.temperature(cc.realfeel, ' / ') }),
		"realfeel-part": s3forecast.utils.parse_template(s3forecast.i18n.get_string("features.feelslike"), { "realfeel": c.temperature(cc.realfeel, ' / ') }),
		"realfeel": {
			"high": s3forecast.utils.parse_template(s3forecast.i18n.get_string("features.feelslike"), { "realfeel": c.temperature(cc.realfeel, ' / ') }),
			"low": s3forecast.utils.parse_template(s3forecast.i18n.get_string("features.feelslike"), { "realfeel": c.temperature(cc.realfeel, ' / ') }),
			"part": s3forecast.utils.parse_template(s3forecast.i18n.get_string("features.feelslike"), { "realfeel": c.temperature(cc.realfeel, ' / ') })
		},
		"humidity": c.percent(cc.humidity),
		"wind": {
			"speed": c.wind(cc.windspeed),
			"gusts": c.wind(cc.windgusts),
			"direction": cc.winddirection
		},
		"visibility": c.distance(cc.visibility, true),
		"precipitation": {
			"all": c.distance(cc.precip)
		},
		"uv": {
			"index": cc.uvindex.index,
			"text": cc.uvindex.text,
			"minutes": cc.uvindex.minutes,
		},
		"pressure": {
			"value": c.pressure(cc.pressure.text),
			"trend": cc.pressure.state.toLowerCase(),
			"trend_symbol": (pressure_trends[cc.pressure.state.toLowerCase()]) ? pressure_trends[cc.pressure.state.toLowerCase()] : '--'
		},
		"dewpoint": c.temperature(cc.dewpoint, ' / '),
		"cloudcover": c.percent(cc.cloudcover),
		"links": {
			"cc": c.link(null), // TODO
			"quicklook": c.link(cc.url),
			"hourly": (data.forecast) ? c.link(data.forecast.forecast.hbh) : '',
			"day5": (data.forecast) ? c.link(data.forecast.forecast.url5Day) : ''
		}
	});
}
//-------------------------------------------------------------------------
s3forecast.processor._radar = function(data, location) {
	if (! data) { return; }
	if (! data.cc) { return; }

	var r = data.cc.images;
	var c = s3forecast.converter;

	return s3forecast.processor._sanitize({
		"images": {
			"local": { "small": "N/A", "large": "N/A" }, // TODO
			"regional": {
				"small": r.radar.replace(/640[xX]480/, '234x175'), "medium": r.radar.replace(/640[xX]480/, '400x300'),
				"large": r.radar
			}
		},
		"links": {
			"local": { "small": c.link("N/A"), "animated": c.link("N/A") },
			"regional": { "static": "N/A", "animated": c.link(r.radarLink) }
		}
	});
}
//-------------------------------------------------------------------------
s3forecast.processor._swa = function(data, location) {
	if (! data) { return; }
	if (! data.cc) { return; }

	var swa = data.cc.watchWarningAdvisory || {};
	var c = s3forecast.converter;

	return s3forecast.processor._sanitize({
		"isActive": ((swa["numActive"]||"0") == "0" ? false : true),
		"county": swa.county,
		"zone": swa.zone,
		"link": c.link(swa.url),
		"alerts": (function(a) {
			return (a.constructor != Array) ? [a] : a;
		})((swa["events"]||{})["event"]||[]) //TODO
	});
}
//-------------------------------------------------------------------------
/**
 * Retrieves a Forecast for the specified day.
 * @param day_index the index of the day. 0 == today/tonight, 1 == tomorrow...
 * @param isDay boolean true for day forecast, false for night forecast
 */
//-------------------------------------------------------------------------
s3forecast.processor._forecast = function(day_index, isDay, data, location) {
	if (! data) { return; }
	if (! data.forecast) { return; }
	if (! data.forecast.forecast) { return; }
	if (! data.cc) { return; }

	var c = s3forecast.converter;
	var f = data.forecast.forecast;

	var day = f.day[day_index];
	if (! day) { return; }
	if (! day.daytime) { return; }
	var part = isDay ? day.daytime : day.nighttime;

	var dow = day.dayName;
	var full_days = { "1" : "sunday", "2": "monday", "3": "tuesday", "4": "wednesday", "5": "thursday", "6": "friday", "7": "saturday" };
	var short_days = { "1" : "sun", "2": "mon", "3": "tue", "4": "wed", "5": "thu", "6": "fri", "7": "sat" };

	if (day_index == 0) {
		dow = s3forecast.i18n.get_string("features.forecast.today");
	} else if (day_index == 1) {
		dow = s3forecast.i18n.get_string("features.forecast.tomorrow");
	} else {
		try {
			var dow_temp = s3forecast.i18n.get_string("days." + full_days[day.dayCode]);
			if (dow_temp && (dow_temp != '')) {
				dow = dow_temp;
			}
		} catch(e) {};
	}

	if (!isDay) {
		if (day_index == 0) {
			dow = s3forecast.i18n.get_string("features.forecast.tonight");
		} else if (day_index == 1 && s3forecast.i18n.has_string('features.forecast.tomorrownight')) {
			dow = s3forecast.i18n.get_string('features.forecast.tomorrownight');
		} else {
			dow = s3forecast.utils.parse_template( s3forecast.i18n.get_string("features.forecast.night"), {"day": dow} );
//			dow = dow.replace(' ', '<br/>');
		}
	}

	if (! part.maxUV) {
		part.maxUV = { 'index': 0, 'text' : '' };
	}
	var uv_result = s3forecast.processor.get_uv_text(part.maxUV.index);
	part.maxUV.text = uv_result.text;
	part.maxUV.minutes = uv_result.minutes;

	// get moon
	var phasenum = Number(day.nighttime.moonPhaseNum);
	var phase = "N/A";
	var phases = ['new', 'waxing_crescent', 'first_quarter', 'waxing_gibbous', 'full', 'waning_gibbous', 'last_quarter', 'waning_crescent'];

	if (phasenum >= 0 && phasenum <= phases.length) {
		phase = s3forecast.i18n.get_string('data.moon_phases.' + phases[phasenum]);
	}
	if (day.nighttime.moonPhaseText) {
		phase = day.nighttime.moonPhaseText;
	}
	var rl_high = c.temperature(day.daytime.realFeelHigh, ' / ');
	var rl_low = c.temperature(day.daytime.realFeelLow, ' / ');
	var precip_all = Math.max(part.rain, part.snow, part.liq, part.ice);

	return s3forecast.processor._sanitize({
		"date": day.obsDate,
		"date_locale": c.date(day.obsDate),
		"day": dow, //TODO
		"dow": day.dayCode,
		"short_day": s3forecast.i18n.get_string("days." + short_days[day.dayCode]),//TODO lookup
		// special code used to figure out what day to show
		"_time": data.cc.current.observationtime,
		"part": (isDay ? "Day" : "Night"),                // part of the day "Day" or "Night"
		"icon": Number(part.weathericon),
		"text": {
			"shrt": c.description(part.shortText),
			"lng": c.description(part.longText)
		},
		"temperature": {
			"high": c.temperature(isDay ? day.daytime.hightemperature : day.daytime.lowtemperature, ' / '),
			"low": c.temperature(isDay ? day.daytime.lowtemperature : day.daytime.hightemperature, ' / '),
			"part": c.temperature(isDay ? day.daytime.hightemperature : day.daytime.lowtemperature),
		},
		"realfeel": {
			"high": s3forecast.utils.parse_template(s3forecast.i18n.get_string("features.feelslike"), { realfeel: isDay ? rl_high : rl_low }),
			"low": s3forecast.utils.parse_template(s3forecast.i18n.get_string("features.feelslike"), { realfeel: isDay ? rl_low : rl_high }),
			"part": s3forecast.utils.parse_template(s3forecast.i18n.get_string("features.feelslike"), { realfeel: isDay ? rl_high : rl_low })
		},
		"precip": {
			"rain" : c.distance(part.rain),
			"snow" : c.distance(part.snow),
			"liquid" : c.distance(part.liq),
			"ice" : c.distance(part.ice),
			"potstorm" : c.percent(part.thunderstormProb),
			"all" : c.distance(precip_all),
			"pop" : "N/A"
		},
		"precipitation": {
			"all": c.distance(precip_all)
		},
		"sun": {
			"rise": c.time(day.sunrise),
			"rise_raw": day.sunrise,
			"set": c.time(day.sunset),
			"set_raw": day.sunset
		},
		"sunrise": c.time(day.sunrise),
		"sunset": c.time(day.sunset),
		"moon": {
			"phase": phase, // TODO why isn't this converted in the feed
			"rise": "N/A",
			"set": "N/A"
		},
		"moonphase": phase,
		"uv": {
			"index": part.maxUV.index,
			"text": part.maxUV.text,
			"minutes": part.maxUV.minutes
		},
		"links": {
			"details": c.link(day.url),
			"historical": c.link("N/A"),
			"astronomy": c.link("N/A"),
			"hourly": (isDay ? day.urlhbhday : day.urlhbhnight)
		},
		"wind": {
			"speed": c.wind(part.windSpeed),
			"gusts": c.wind(part.windGust),  // TODO this doesn't match CC windgust(s)
			"direction": part.windDirectionText
		},
		"location": this._location(data, location)
	});
}
//-------------------------------------------------------------------------
s3forecast.processor._location = function(data, location) {
	if (!data) return "N/A";
	if (data.location) return data.location; //TODO what does this line do?

	var c = s3forecast.converter;
	var p = {
		'lat' : '0',
		'lon' : '0',
		'time': '00:00',
		'city': location.name,
		'adminArea': location.name,
		'country': 'world'
	};

	if (data.cc) {
		p = data.cc.local;
	}

	return s3forecast.processor._sanitize({
		//"ufdb": p.ufdb,
		"code": location.code,
		"name": location.name,
		"name_short": s3forecast.utils.make_location_short_name(location.name),
		"latitude_off": c.coordinate(p.lat),
		"longitude_off": c.coordinate(p.lon),
		"latitude": p.lat,
		"longitude": p.lon,
		"local_time": c.time(p.time),
		"city": p.city,
		"adminArea": p.adminArea,
		"country": p.country
	});
}
//-------------------------------------------------------------------------
s3forecast.processor._planets = function(data) {
	if (!data) return "N/A";
	if (data.planets) return data.planets;

	var c = s3forecast.converter;
	var p = data.planets;

	// TODO why does the planets.sun.rise differ from cc.sunrise
	return s3forecast.processor._sanitize({
		"sun": {
			"rise": c.time(p.sun.rise),
			"set": c.time(p.sun.set)
		},
		"moon": {
			"rise": c.time(p.moon.rise),
			"set": c.time(p.moon.set)
		},
		"mercury": {
			"rise": c.time(p.mercury.rise),
			"set": c.time(p.mercury.set)
		},
		"venus": {
			"rise": c.time(p.venus.rise),
			"set": c.time(p.venus.set)
		},
		"mars": {
			"rise": c.time(p.mars.rise),
			"set": c.time(p.mars.set)
		},
		"jupiter": {
			"rise": c.time(p.jupiter.rise),
			"set": c.time(p.jupiter.set)
		},
		"saturn": {
			"rise": c.time(p.saturn.rise),
			"set": c.time(p.saturn.set)
		},
		"uranus": {
			"rise": c.time(p.uranus.rise),
			"set": c.time(p.uranus.set)
		},
		"neptune": {
			"rise": c.time(p.neptune.rise),
			"set": c.time(p.neptune.set)
		},
		"pluto": {
			"rise": c.time(p.pluto.rise),
			"set": c.time(p.pluto.set)
		}
	});
}
//-------------------------------------------------------------------------
s3forecast.processor._sanitize = function(object) {
	for (var prop in object) {
		if (typeof(object[prop]) == 'object') {
			object[prop] = s3forecast.processor._sanitize(object[prop]);
		} else if (object[prop] === undefined) {
			object[prop] = "N/A";
		}
	}
	return object;
}
//-------------------------------------------------------------------------
