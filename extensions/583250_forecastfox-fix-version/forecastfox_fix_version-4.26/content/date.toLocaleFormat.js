if (! Date.prototype.toLocaleFormat) {
	Date.prototype.toLocaleFormat = function(formatString) {
		var pad = function (val, len) {
			val = String(val);
			len = len || 2;
			while (val.length < len) val = "0" + val;
			return val;
		};

		var day_names = [
			"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
			"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
		];
		if (window.i18n) {
			var i18n = window.i18n;
			day_names = [
				i18n.data('days.sun'), i18n.data('days.mon'), i18n.data('days.tue'), i18n.data('days.wed'), i18n.data('days.thu'), i18n.data('days.fri'), i18n.data('days.sat'),
				i18n.data('days.sunday'), i18n.data('days.monday'), i18n.data('days.tuesday'), i18n.data('days.wednesday'), i18n.data('days.thursday'), i18n.data('days.friday'), i18n.data('days.saturday')
			];
		}

		var month_names = [
			"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
			"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
		];

		var date = this || new Date();
		var newYear = new Date(date.getFullYear(), 0, 0);
		var newYearDay = newYear.getDay();
		var delta = Math.floor((date.getTime() - newYear.getTime())/1000/60/60/24);

		var timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g;
		var timezoneClip = /[^-+\dA-Z]/g;
	
		formatString = formatString.replace(/\%a/g, day_names[date.getDay()]);
		formatString = formatString.replace(/\%A/g, day_names[date.getDay()+7]);
		formatString = formatString.replace(/\%b/g, month_names[date.getMonth()]);
		formatString = formatString.replace(/\%B/g, month_names[date.getMonth()+12]);
		formatString = formatString.replace(/\%d/g, pad(date.getDate()));
		formatString = formatString.replace(/\%m/g, pad(date.getMonth()+1));
		formatString = formatString.replace(/\%y/g, String(date.getFullYear()).slice(2));
		formatString = formatString.replace(/\%Y/g, date.getFullYear());
		formatString = formatString.replace(/\%w/g, date.getDay());
		formatString = formatString.replace(/\%W/g, Math.ceil((delta + newYearDay)/7));
		formatString = formatString.replace(/\%\%/g, '%');
		formatString = formatString.replace(/\%Z/g, (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""));
		formatString = formatString.replace(/\%j/g, Math.floor((date - newYear) / (1000 * 60 * 60 * 24)));

		return formatString;
	}
}
