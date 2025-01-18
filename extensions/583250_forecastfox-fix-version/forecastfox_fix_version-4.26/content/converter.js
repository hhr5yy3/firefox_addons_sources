/*******************************************************************************
 * The converter service is used to take in different weather measurements
 * and conver them from one unit of measure to another.
 *
 * TODO use JQuery number formatting extension for i18n:
 *
 * @see http://plugins.jquery.com/project/numberformatter
 * @see /content/logging.js
 * @see /content/observers.js
 * @see /content/preferences.js
 * @see /content/external/class.js
 * @see /content/external/jquery-1.3.2.js
 * @version 1.0
 ******************************************************************************/
s3forecast.converter = {};

//-------------------------------------------------------------------------
s3forecast.converter.SYSTEM_AMERICAN = {
	"temperature": ["f"],
	"speed": ["mph"],
	"date": ["date_system"],
	"time": ["h12"],
	"pressure": ["inhg"],
	"distance": { "shrt": ["inches"], "lng": ["mi"] }
};
//-------------------------------------------------------------------------
s3forecast.converter.SYSTEM_METRIC = {
	"temperature": ["c"],
	"speed": ["kph"],
	"date": ["date_system"],
	"time": ["h24"],
	"pressure": ["mmhg"],
	"distance": { "shrt": ["cm"], "lng": ["km"] }
};
/*******************************************************************************
 * The CONVERTERS methods are based on individual unit values.
 ******************************************************************************/
// TODO separate out into (a) converter and (b) styler
//-------------------------------------------------------------------------
s3forecast.converter.CONVERTERS = {
	"temperature": {
		_count: 4,
		/* f default */
		"c": function(value) { return s3forecast.utils.parse_template(s3forecast.i18n.get_string("converters.temperature.c"), {temperature: Math.round((Number(value)-32)*(5/9))}); },
		"f": function(value) { return s3forecast.utils.parse_template(s3forecast.i18n.get_string("converters.temperature.f"), {temperature: Math.round(Number(value))}); },
		"r": function(value) { return s3forecast.utils.parse_template(s3forecast.i18n.get_string("converters.temperature.r"), {temperature: Math.round(Number(value) + 459.67)}); },
		"k": function(value) { return s3forecast.utils.parse_template(s3forecast.i18n.get_string("converters.temperature.k"), {temperature: Math.round((Number(value)-32)*(5/9) + 273.15)}); }
	},

	"speed": {
		_count: 5,
		/* mph default */
		"mph": function(value) { return s3forecast.utils.parse_template(s3forecast.i18n.get_string("converters.speed.mph"), {speed: Math.round(Number(value)) }); },
		"kph": function(value) { return s3forecast.utils.parse_template(s3forecast.i18n.get_string("converters.speed.kph"), {speed: Math.round(Number(value) * 1.609) }); },
		"ms": function(value) { return s3forecast.utils.parse_template(s3forecast.i18n.get_string("converters.speed.ms"), {speed: Math.round(Number(value) * 0.447) }); },
		"bft": function(value) { return s3forecast.utils.parse_template(s3forecast.i18n.get_string("converters.speed.bft"), {speed: Math.round(Math.pow(value * 0.5348, 2/3)) }) },
		"knots": function(value) { return s3forecast.utils.parse_template(s3forecast.i18n.get_string("converters.speed.knots"), {speed: Math.round(Number(value) * 0.868976242) }); }
	},

	"date": {
		_count: 2,
		/* date_system default */
		"date_system": function(value, format) {
			return (new Date(value)).toLocaleDateString();
		},
		"date_custom": function(value, format) {
			return (new Date(value)).toLocaleFormat(format);
		}
	},

	"time": {
		_count: 2,
		/* h12 default */
		"h12": function(value) {
			if (! value) { return "--:--" };
			var nums = value.split(":");
			var h = Number(nums[0]);
			var m = nums[1];
			if (m.length == 1) m = '0' + m;
			var p = (h < 12 || h == 24) ? "am" : "pm"; // TODO i18n
			if (h > 12) { h -= 12; }
			if (h == 0) { h = 12; }
			if (isNaN(h)) { return "--:--"; }
			// this needs moved somewhere where do not depend on the templator and i18n variables being available
			return s3forecast.utils.parse_template(s3forecast.i18n.get_string("converters.time.h12."+p), {hours: h, minutes: m});
		},
		"h24": function(value) {
			if (! value) { return "--:--" };
			var nums = value.split(":");
			var h = Number(nums[0]);
			if (h < 10) { h = '0' + (''+h); }
			var m = nums[1];
			if (m.length == 1) { m = '0' + m; }
			return s3forecast.utils.parse_template(s3forecast.i18n.get_string("converters.time.h24"), {hours: h, minutes: m});
		}
	},

	"pressure": {
		_count: 5,
		/* in hg default */
		"inhg": function(value) { return s3forecast.utils.parse_template(s3forecast.i18n.get_string("converters.pressure.inhg"), {pressure: Number(value).toFixed(2)}); },
		"psi": function (value) { return s3forecast.utils.parse_template(s3forecast.i18n.get_string("converters.pressure.psi"), {pressure: (Number(value) * 0.491098).toFixed(2)}); },
		"mb": function (value) { return s3forecast.utils.parse_template(s3forecast.i18n.get_string("converters.pressure.mb"), {pressure: Math.round(Number(value) * 33.86)}); },
		"hpa": function (value) { return s3forecast.utils.parse_template(s3forecast.i18n.get_string("converters.pressure.hpa"), {pressure: Math.round(Number(value) * 33.86)}); },
		"mmhg": function (value) { return s3forecast.utils.parse_template(s3forecast.i18n.get_string("converters.pressure.mmhg"), {pressure: Math.round(Number(value) * 25.39709)}); }
	},

	"distance": {
		/* mi default */
		"lng": {
			_count: 4,
			"mi": function (value) { return s3forecast.utils.parse_template(s3forecast.i18n.get_string("converters.distance.lng.mi"), {distance: Math.round(Number(value))}); },
			"km": function (value) { return s3forecast.utils.parse_template(s3forecast.i18n.get_string("converters.distance.lng.km"), {distance: Math.round(Number(value) * 1.6093)}); },
			"m": function (value) { return s3forecast.utils.parse_template(s3forecast.i18n.get_string("converters.distance.lng.m"), {distance: Math.round(Number(value) * 1609.344)}); },
			"nm": function (value) { return s3forecast.utils.parse_template(s3forecast.i18n.get_string("converters.distance.lng.nm"), {distance: Math.round(Number(value) * 0.868976242)}); }
		},
		/* in default */
		"shrt": {
			_count: 3,
			"inches": function (value) { return s3forecast.utils.parse_template(s3forecast.i18n.get_string("converters.distance.shrt.inches"), { distance: parseFloat(Number(value).toFixed(2)) }); },
			"cm": function (value) { return s3forecast.utils.parse_template(s3forecast.i18n.get_string("converters.distance.shrt.cm"), { distance: parseFloat(Number(value) * 2.54).toFixed(2) }); },
			"mm": function (value) { return s3forecast.utils.parse_template(s3forecast.i18n.get_string("converters.distance.shrt.mm"), { distance: parseFloat(Number(value) * 25.4).toFixed(2) }); }
		}
	},

	"percent": function(value) {
		value = new String(value).replace(/^\s+|\s+$/, '');
		if (value[value.length-1] == "%") { value = value.substring(value,value.length-1); }
		return s3forecast.utils.parse_template(s3forecast.i18n.get_string("converters.percent"), {percent: Math.round(Number(value))});
	},

	"coordinate": function(value) { return s3forecast.utils.parse_template(s3forecast.i18n.get_string("converters.coordinate"), {coordinate: Number(value).toFixed(2)}); }
};

/*******************************************************************************
 * Object used to convert units based on the user's preferences.  The methods
 * are in terms of weather domain objects, like wind and precipitation.
 ******************************************************************************/
//-------------------------------------------------------------------------
/**
 * Set or get the units in the service.  This will update the preference.
 * Each unit is in an array. If multiple units are  specified, then both
 * units are displayed at once. For example,
 *     temperature: ["f", "c"]
 *   will display the temperature 40 as:
 *     40 &deg;F / 4 &deg; C
 *
 * @param   units          [OPTIONAL] A JSON object representing units.
 * @returns                The current units or null if no units set.
 */
//-------------------------------------------------------------------------
s3forecast.converter.units = function(units) {
	// get the current units
	var system = s3forecast.utils.prefs_get('unitsystem');
	var current = null;

	switch (system) {
		case "american":
			current = s3forecast.converter.SYSTEM_AMERICAN;
			break;

		case "metric":
			current = s3forecast.converter.SYSTEM_METRIC;
			break;

		case "custom":
		default:
			current = s3forecast.utils.prefs_get('units');
			break;
	}

	// if the units are valid then set them
	if (units && s3forecast.converter._validate(units)) {
		// set the preference
		s3forecast.utils.prefs_set('units', units);
		current = units;
	}

	// return the units
	return current;
}
//-------------------------------------------------------------------------
/**
 * Converts the temperature to a string that matches the user's preferences.
 *
 * @param   value          a number representing the temperature in fahrenheit
 * @returns                the temperature as a string based on the user's preference
 */
//-------------------------------------------------------------------------
s3forecast.converter.temperature = function(value, join) {
	return s3forecast.converter._convert("temperature", value, join);
}
//-------------------------------------------------------------------------
/**
 * Converts the wind to a string that matches the user's preferences.
 *
 * @param   value          a number representing the wind in mph
 * @returns                the wind speed as a string based on the user's preference
 */
//-------------------------------------------------------------------------
s3forecast.converter.wind = function(value) {
	return s3forecast.converter._convert("speed", value, ' / ');
}
//-------------------------------------------------------------------------
/**
 * Converts the distance to a string that matches the user's preferences.
 *
 * @param   value          a number representing the distance in mi
 * @param   isLong         If the distance is long or short
 * @returns                the distance as a string based on the user's preference
 */
//-------------------------------------------------------------------------
s3forecast.converter.distance = function(value, isLong) {
	return s3forecast.converter._convert("distance", value, ' / ', isLong ? "lng" : "shrt");
}
//-------------------------------------------------------------------------
/**
 * Converts the pressure to a string that matches the user's preferences.
 *
 * @param   value          a number representing the pressure in inhg
 * @returns                the pressure as a string based on the user's preference
 */
//-------------------------------------------------------------------------
s3forecast.converter.pressure = function(value) {
	return s3forecast.converter._convert("pressure", value, ' / ');
}
//-------------------------------------------------------------------------
/**
 * Converts the date to a string that matches the user's preferences.
 *
 * @param   value          date MM/DD/YYYY
 *			format	custom format http://pubs.opengroup.org/onlinepubs/007908799/xsh/strftime.html
 * @returns                the time as a string based on the user's preference
 */
//-------------------------------------------------------------------------
s3forecast.converter.date = function(value) {
	var units = s3forecast.converter.units();
	var converter = s3forecast.converter.CONVERTERS['date'][units.date];
	return converter(value, units.date_custom_format);
}
//-------------------------------------------------------------------------
/**
 * Converts the time to a string that matches the user's preferences.
 *
 * @param   value          a number representing the time in 24h
 * @returns                the time as a string based on the user's preference
 */
//-------------------------------------------------------------------------
s3forecast.converter.time = function(value) {
	return s3forecast.converter._convert("time", value, ' / ');
}
//-------------------------------------------------------------------------
/**
 * Converts the percent to a string that matches the user's preferences.
 *
 * @param   value          a number representing percent
 * @returns                the percent as a string based on the user's preference
 */
//-------------------------------------------------------------------------
s3forecast.converter.percent = function(value) {
	return s3forecast.converter.CONVERTERS.percent(value);
}
//-------------------------------------------------------------------------
/**
 * Converts the coordinate to a string that matches the user's preferences.
 *
 * @param   value          a number representing a coordinate
 * @returns                the coordinate as a string based on the user's preference
 */
//-------------------------------------------------------------------------
s3forecast.converter.coordinate = function(value) {
	return s3forecast.converter.CONVERTERS.coordinate(value);
}
//-------------------------------------------------------------------------
/**
 * Converts a link.
 *
 * @param   value          The link value
 * @returns                The link value base on the user's preference
 */
//-------------------------------------------------------------------------
s3forecast.converter.link = function(value) {
	// TODO This may be a good spot to track things here.
	return value;
}
//-------------------------------------------------------------------------
s3forecast.converter.description = function(value) {
	if (value) {
		return value.charAt(0).toUpperCase() + value.slice(1);
	} else {
		return '';
	}
}
//-------------------------------------------------------------------------
/**
 * Validate the units passed in.  This will validate each key in the units.
 *
 * @param   units          The units key/value pairs.
 * @return                 True if valid, otherwise false.
 */
//-------------------------------------------------------------------------
s3forecast.converter._validate = function(units) {
	// validate each units array independently and return true if nothing fails
	try {
		s3forecast.converter._validate_array(units, ["temperature"]);
		s3forecast.converter._validate_array(units, ["speed"]);
		s3forecast.converter._validate_array(units, ["time"]);
		s3forecast.converter._validate_array(units, ["pressure"]);
		s3forecast.converter._validate_array(units, ["distance", "lng"]);
		s3forecast.converter._validate_array(units, ["distance", "shrt"]);
	} catch (e) {
		return false;
	}

	// make sure other units aren't in the units
	for (var key in units) {
		if (!(key in s3forecast.converter.CONVERTERS)) {
			return false;
		}
	}

	// units are valid
	return true;
}
//-------------------------------------------------------------------------
/**
 * Validate a unit array.
 *
 * @param   units          The units key/value pairs.
 * @param   path           An array of paths to the unit array to validate.
 * @throws  An error if any of the arrays fail.
 */
//-------------------------------------------------------------------------
s3forecast.converter._validate_array = function(units, path) {
	// loop through the path array and get the converter for the path
	var cv = s3forecast.converter.CONVERTERS;
	var attr, x;

	for (x=0; x<path.length; x++) {
		// get the converter attribute
		attr = path[x];
		cv = cv[attr];

		// throw if the path is not in units
		if (!(attr in units)) {
			throw "missing units " + attr;
		}
		units = units[attr];
	}

	// check that the units path is an array
	if (!Array.isArray(units)) {
		throw "invalid unit format, " + attr + " not an array";
	}

	// check that the units path is not greather than the converter count
	if (units.length > cv._count) {
		throw "too many units";
	}

	// check that at least one unit is specified
	if (units.length == 0) {
		throw "no unit specified for " + path.toString();
	}

	// check if any unit is not in the converter
	for (x=0; x<units.length; x++) {
		if (!(units[x] in cv)) {
			throw "invalid unit " + path.toString() + " " + units[x];
		}
	}
}
//-------------------------------------------------------------------------
/**
 * Convert a value into the users preference.  If the units are invalid then
 * we return the unchanged value.
 *
 * @param   type           Type of unit to convert.
 * @param   value          The value to convert.
 * @param   subtype        [OPTIONAL] a subtype for conversion.
 */
//-------------------------------------------------------------------------
s3forecast.converter._convert = function(type, value, join, /*OPTIONAL*/ subtype) {
	var units = s3forecast.converter.units();

	// get the type of value for conversion then get the converter
	units = subtype ? units[type][subtype] : units[type];
	var converter = (subtype) ? s3forecast.converter.CONVERTERS[type][subtype] : s3forecast.converter.CONVERTERS[type];

	// convert all the units
	var values = [];
	for (var i=0; i<units.length; i++) {
		var pref = units[i];
		values.push(converter[pref](value));
	}

	return (join) ? values.join(join) : values;
}
//-------------------------------------------------------------------------
