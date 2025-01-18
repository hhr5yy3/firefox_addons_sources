var date_months = [];

var locale = lang;

var remappedLangLocales = {
    "cn": "zh-Hans",
    "ct": "zh-Hant",
    "kr": "ko",
    "jp": "ja",
    "tl": "fil",
    "br": "pt"
};

// Arabic speaking countries
var arabics = ['DZ', 'BH', 'TD', 'KM', 'DJ', 'EG', 'ER', 'IQ', 'JO', 'KW', 'LB', 'LY',
    'MR', 'MA', 'OM', 'PS', 'QA','SA', 'SO', 'SS', 'SY', 'TZ', 'TN', 'AE', 'YE'];

var lang_loaded = false;

$.dateTimeFormat = Object.create(null);
$.acc_dateTimeFormat = Object.create(null);

if (typeof l === 'undefined') {
    l = [];
}

/**
 * Convert all instances of [$nnn] e.g. [$102] to their localized strings
 * @param {String} html The html markup
 * @returns {String}
 */
function translate(html) {
    'use strict';

    /**
     * String.replace callback
     * @param {String} match The whole matched string
     * @param {Number} localeNum The locale string number
     * @param {String} namespace The operation, if any
     * @returns {String} The localized string
     */
    var replacer = function(match, localeNum, namespace) {

        if (namespace) {
            match = localeNum + '.' + namespace;
            localeNum = match;
        }

        // XXX: Seeing this warning could simply mean we forgot to replace entity tags
        //      within populate_l(), or it may indicate a worse issue where html pages
        //      are used before startMega() have finished. Also, injecting them in the
        //      DOM to manipulate it later is something we should avoid doing as well.
        // FIXME: we will for now whitelist onboarding strings doing so though...
        if (d && /\[\w+]/.test(l[localeNum]) && (localeNum < 17566 || localeNum > 17577) && localeNum != 23718) {
            console.warn('locale string %s does contain raw entity tags', localeNum, [l[localeNum]]);
        }

        if (typeof l[localeNum] === 'string') {
            return String(l[localeNum]);
        }

        // if the type is an object (not simple), then it's not allowed on HTML
        console.error(`locale l[${localeNum}] is used in HTML, not a string, val= ${JSON.stringify(l[localeNum])}`);

        return l[localeNum];
    };

    return String(html).replace(/\[\$(\w+)(?:\.(\w+))?\]/g, replacer);
}

/**
 * Loads localisation for images
 * Apply the locale-img class and the data-baseimg attribute for the image to be loaded in its localised version
 *    Images will be loaded from /images/mega/locale/lang_data-baseimg
 *        If the locale image is not present /images/mega/locale/en_data-baseimg will be used
 * For language codes see languages defined in secureboot
 *
 * @param {string|jQuery} scope The optional scope to perform the load on
 * @returns {void} void
 */
function localeImages(scope) {
    'use strict';
    const $imgs = $('.locale-img', scope || 'body');
    const fallbackLang = 'en';
    const prepImg = ($img, src, fbsrc) => {
        const img = new Image();
        const onload = () => {
            $img.replaceWith(img);
        };
        const onerr = () => {
            if (fbsrc) {
                if (d) {
                    console.warn(`Image ${src} missing. Using fallback`);
                }
                prepImg($img, fbsrc, undefined);
            }
            else if (d) {
                console.error(`Error loading fallback image ${src}`);
            }
        };
        img.classList = $img.get(0).classList;
        if (typeof img.decode === 'function') {
            img.src = src;
            img.decode().then(onload).catch(onerr);
        }
        else {
            img.onload = onload;
            img.onerror = onerr;
            img.src = src;
        }
    };
    for (let i = 0; i < $imgs.length; i++) {
        if ($imgs.eq(i).attr('data-baseimg')) {
            const base = $imgs.eq(i).attr('data-baseimg');
            $imgs.eq(i).removeAttr('data-baseimg');
            const ls = `${staticpath}images/mega/locale/${lang}_${base}`;
            const fs = `${staticpath}images/mega/locale/${fallbackLang}_${base}`;
            prepImg($imgs.eq(i), ls, fs);
        }
    }
}

/**
 * Set Date time object for time2date
 *
 * Examples by format value (NZ locale all made on Monday, 3 October 2022):
 * 1:       3/10/2022
 * 2:       3 October 2022
 * 3:       October 2022
 * 4:       Monday, 3 October 2022
 * 5:       Monday, 3 October 2022 at 10:30:00 NZDT
 * 6:       Oct 2022
 * 7:       Monday, 3 October 2022 at 10:30 NZDT
 * 8:       3 October 2022
 * 9:       3 October 2022
 * 10:      Mon
 * 11:      Monday
 * 12:      Oct
 * 13:      October
 * 14:      2022
 * 15:      3 Oct
 * 16:      3
 * 17:      3/10/22
 * 18:      3 Oct 2022
 * 19:      Mon, 3 Oct
 * 20:      Mon, 3 Oct 2022
 * 21:      13:30
 * 22:      1:30 pm
 *
 * @param {String} locales Locale string
 * @param {Number} format format number for the case.
 */
function setDateTimeFormat(locales, format) {

    "use strict";

    // Set date format
    var options = {hourCycle: 'h23'};

    if (format < 10) {
        options.year = 'numeric';
        options.month = format >= 2 ? 'long' : 'numeric';
        options.day = format === 3 || format === 6 ? undefined : 'numeric';
        options.weekday = format === 4 || format === 5 ? 'long' : undefined;

        if (format === 0 || format === 5 || format === 7) {
            options.minute = 'numeric';
            options.hour = 'numeric';
            if (format === 5) {
                options.second = 'numeric';
                options.timeZoneName = 'short';
            }
        }

        if (format === 6) {
            options.month = 'short';
        }
        if (format === 7) {
            options.weekday = 'long';
            options.timeZoneName = 'short';
        }
    }
    // Set non full date format
    else {
        switch (format) {
            case 10:
                options.weekday = 'short';
                break;
            case 11:
                options.weekday = 'long';
                break;
            case 12:
                options.month = 'short';
                break;
            case 13:
                options.month = 'long';
                break;
            case 14:
                options.year = 'numeric';
                break;
            case 15:
                options.month = 'short';
                options.day = 'numeric';
                break;
            case 16:
                options.day = 'numeric';
                break;
            case 17:
                options.year = '2-digit';
                options.month = 'numeric';
                options.day = 'numeric';
                break;
            case 18:
                options.day = 'numeric';
                options.month = 'short';
                options.year = 'numeric';
                break;
            case 19:
                options.weekday = 'short';
                options.day = 'numeric';
                options.month = 'long';
                break;
            case 20:
                options.weekday = 'short';
                options.day = 'numeric';
                options.month = 'long';
                options.year = 'numeric';
                break;
            case 21:
                options.hourCycle = 'h23';
                options.hour = 'numeric';
                options.minute = 'numeric';
                break;
            case 22:
                options.hourCycle = undefined;
                options.hour = 'numeric';
                options.minute = 'numeric';
                break;
        }
    }

    // Create new DateTimeFormat object if it is not exist
    try {
        $.dateTimeFormat[locales + '-' + format] = typeof Intl !== 'undefined' ?
            new Intl.DateTimeFormat(locales, options) : 'ISO';

        // If locale is Arabic and country is non-Arabic country, not set, or not logged in
        if (locale === 'ar' && (!u_attr || !u_attr.country || arabics.indexOf(u_attr.country) < 0)) {
            // To avoid Firefox bug, set Egypt as default country.
            $.dateTimeFormat[locales + '-' + format] = new Intl.DateTimeFormat('ar-AE', options);
        }
    }
    catch (e) {
        $.dateTimeFormat[locales + '-' + format] = format > 1 ? new Intl.DateTimeFormat(locale, options) : 'ISO';
    }
}

/**
 * Converts a timestamp to a readable time format - e.g. 2016-04-17 14:37
 * If user selected use ISO date formate, short date format will using ISO date format.
 * If user selected country on the setting using it to find locale.
 * If user did not selected country, assume country with ip address and apply date format.
 * e.g. US: mm/dd/yyyy, NZ: dd/mm/yyyy, CN: yyyy/mm/dd
 *
 * @param {Number} unixTime  The UNIX timestamp in seconds e.g. 1464829467
 * @param {Number} [format]  The readable time format to return
 * @returns {String}
 *
 * Formats (examples are ISO date format):
 *       0: yyyy-mm-dd hh:mm (Short date format with time)
 *       1: yyyy-mm-dd (Short date format without time)
 *       2: yyyy fmn dd (fmn: Full month name, based on the locale) (Long Date format)
 *       3: yyyy fmn (fmn: Full month name, based on the locale) (Long Date format without day)
 *       4: Monday, yyyy fmn dd (fmn: Full month name, based on the locale) (Long Date format with weekday)
 *       5: Monday, yyyy fmn dd hh:mm:ss TZ (fmn: Full month name, based on the locale)
 *                                                                  (Long Date format with weekday, time, and timezone)
 *       6: yyyy mm (Short Date format without day and time)
 *
 * Non full date formats:
 *       10: Mon (Only day of the week long version)
 *       11: Monday (Only day of the week short version)
 *       12: Jan (Only month short version)
 *       13: January (Only month long version)
 *       14: 2021 (Only year)
 *       15: dd mm (Date format with short month and without time and year)
 *       16: dd (Only day)
 */
function time2date(unixTime, format) {
    'use strict';
    var date = new Date(unixTime * 1000 || 0);
    var result;
    var dateFunc;
    var countryAndLocales = getCountryAndLocales();

    format = format || 0;

    // If dateTimeFormat is not set with the current locale set it.
    if ($.dateTimeFormat[countryAndLocales.locales + '-' + format] === undefined) {
        setDateTimeFormat(countryAndLocales.locales, format);
    }

    var dFObj = $.dateTimeFormat[countryAndLocales.locales + '-' + format];

    // print time as ISO date format
    var printISO = function _printISO() {
        var timeOffset = date.getTimezoneOffset() * 60;
        var isodate = new Date((unixTime - timeOffset) * 1000 || 0);
        var length = format === 0 ? 16 : 10;
        return isodate.toISOString().replace('T', ' ').substr(0, length);
    };

    dateFunc = dFObj === 'ISO' ? printISO : dFObj.format;

    // if it is short date format and user selected to use ISO format
    if (countryAndLocales.country === 'ISO' && format < 2) {
        result = printISO();
    }
    else {
        result = dateFunc(date);
    }

    return result;
}

/**
 * Set Date time object for acc_time2date
 * @param {String} locales Locale string
 */
function setAccDateTimeFormat(locales) {

    "use strict";

    // Set acc date format
    var options = {month: 'long', day: 'numeric', year: 'numeric'};
    var nYOptions = {month: 'long', day: 'numeric'};

    // Create new DateTimeFormat object if it is not exist
    try {
        $.acc_dateTimeFormat[locales] = typeof Intl !== 'undefined' ?
            new Intl.DateTimeFormat(locales, options) : 'fallback';
        $.acc_dateTimeFormat[locales + '-noY'] = Intl ? new Intl.DateTimeFormat(locales, nYOptions) : 'fallback';

        // If locale is Arabic and country is non-Arabic country or non set,
        if (locale === 'ar' && (!u_attr || !u_attr.country || arabics.indexOf(u_attr.country) < 0)) {
            // To avoid Firefox bug, set Egypt as default country.
            $.acc_dateTimeFormat[locales] = new Intl.DateTimeFormat('ar-AE', options);
            $.acc_dateTimeFormat[locales + '-noY'] = new Intl.DateTimeFormat('ar-AE', nYOptions);
        }
    }
    catch (e) {
        $.acc_dateTimeFormat[locales] = new Intl.DateTimeFormat(locale, options);
        $.acc_dateTimeFormat[locales + '-noY'] = new Intl.DateTimeFormat(locale, nYOptions);
    }
}

/**
 * Function to create long date format for current locales.
 * @param {Number} unixtime The UNIX timestamp in seconds e.g. 1464829467
 * @param {Boolean} yearIsOptional Optional, set year for the date format as optional
 * @returns {String} result Formatted date.
 */
function acc_time2date(unixtime, yearIsOptional) {

    var MyDate = new Date(unixtime * 1000 || 0);
    var locales = getCountryAndLocales().locales;
    var currYear = l.year;
    var result;

    // If dateTimeFormat is already set with the current locale using it.
    if (!$.acc_dateTimeFormat[locales]) {
        setAccDateTimeFormat(locales);
    }

    if (yearIsOptional && currYear === MyDate.getFullYear()) {
        locales += '-noY';
    }

    if ($.acc_dateTimeFormat[locales] === 'fallback') {
        result = date_months[MyDate.getMonth()] + ' ' + MyDate.getDate();
        if (yearIsOptional && currYear === MyDate.getFullYear()) {
            result += MyDate.getFullYear();
        }
    }
    else {
        var dateFunc = $.acc_dateTimeFormat[locales].format;
        result = dateFunc(MyDate);
    }

    if (locale === 'en') {
        var date = MyDate.getDate();
        var lb = date.toString().slice(-1);
        var th = 'th';
        if (lb === '1' && date !== 11) {
            th = 'st';
        }
        else if (lb === '2' && date !== 12) {
            th = 'nd';
        }
        else if (lb === '3' && date !== 13) {
            th = 'rd';
        }

        result = result.replace(date, date + th);
    }

    return result;
}

function time2last(timestamp, skipSeconds) {
    var sec = Date.now() / 1000 - timestamp;
    if (skipSeconds && sec < 59) {
        return l[23252] || "Less then a minute ago";
    }
    else if (sec < 4) {
        return l[880];
    }
    else if (sec < 59) {
        return mega.icu.format(l.second_last_count, Math.ceil(sec));
    }
    else if (sec < 3540) {
        return mega.icu.format(l.minute_last_count, Math.ceil(sec / 60));
    }
    else if (sec < 82000) {
        return mega.icu.format(l.hour_last_count, Math.ceil(sec / 3600));
    }
    return mega.icu.format(l.day_last_count, Math.ceil(sec / 86400));
}

/*
 * Calculate start and end of calendar on the week/month/year contains time passed or today.
 *
 * @param {String} type  type of calendar to calculate. 'w' for week, 'm' for month, 'y' for year
 * @param {Number} [unixTime]  The UNIX timestamp in seconds e.g. 1464829467
 * @returns {Object}
 */
function calculateCalendar(type, unixTime) {

    'use strict';

    unixTime = unixTime * 1000 || Date.now();

    var time = new Date(unixTime);
    var startDate;
    var endDate;

    if (type === 'd') {
        startDate = endDate = time;
    }
    else if (type === 'w') {
        var timeDay = time.getDay();

        startDate = new Date(unixTime - 86400000 * timeDay);
        endDate = new Date(unixTime + 86400000 * (6 - timeDay));
    }
    else if (type === 'm') {
        var timeMonth = time.getMonth();

        startDate = new Date(unixTime);
        startDate.setDate(1);

        endDate = new Date(unixTime);

        // End date of months can be vary and cause issue when update month, lets set it for 15 for now.
        endDate.setDate(15);
        endDate.setMonth(timeMonth + 1);
        endDate.setDate(0); // -1 day from next month
    }
    else if (type === 'y') {
        var timeYear = time.getFullYear();

        startDate = new Date(unixTime);
        startDate.setDate(1);
        startDate.setMonth(0);

        endDate = new Date(unixTime);
        endDate.setFullYear(timeYear + 1);
        endDate.setMonth(0);
        endDate.setDate(0);
    }
    else {
        return false;
    }

    startDate = startDate.setHours(0, 0, 0, 0) / 1000;
    endDate = endDate.setHours(23, 59, 59, 0) / 1000;

    return {start: startDate, end: endDate};
}

/**
 * Function to get date time structure for current locale.
 * @returns {String|Boolean} result Date structure as 'ymd', 'dmy', or 'mdy' or false if errored.
 */
function getDateStructure() {

    'use strict';

    // Date made with unique number 1987-04-23.
    var uniqTime = new Date(1987, 3, 23);
    var uniqUnix = uniqTime.getTime() / 1000 | 0;
    var index = [];
    var localeTime = time2date(uniqUnix, 1);
    var result;
    if (locale !== 'ar') {
        // thai case using buddhist calendar, 1987 in gregorian calendar is 2530 in buddhist calendar
        index.y = (locale === 'th') ? localeTime.indexOf(2530) : localeTime.indexOf(1987);
        index.m = localeTime.indexOf(4);
        index.d = localeTime.indexOf(23);

        result = Object.keys(index).sort(function(a, b) {
            return index[a] - index[b];
        }).join('');
    }
    else {
        // Arabic special
        var locales = getCountryAndLocales().locales;

        var options_y = {year: 'numeric'}; // Format only Day
        var options_m = {month: 'numeric'}; // Format only Month
        var options_d = {day: 'numeric'}; // Format only Year

        locales = !u_attr || !u_attr.country || arabics.indexOf(u_attr.country) < 0 ? 'ar-AE' : locales;

        try {
            if (typeof Intl !== 'undefined') {
                var locale_y = new Intl.DateTimeFormat(locales, options_y).format(uniqTime);
                var locale_m = new Intl.DateTimeFormat(locales, options_m).format(uniqTime);
                var locale_d = new Intl.DateTimeFormat(locales, options_d).format(uniqTime);

                index.y = localeTime.indexOf(locale_y);
                index.m = localeTime.indexOf(locale_m);
                index.d = localeTime.indexOf(locale_d);

                result = Object.keys(index).sort(function(a, b) {
                    return index[b] - index[a];
                }).join('');
            }
            else {
                return false;
            }
        }
        catch (e) {
            return false;
        }
    }

    return result;
}

/**
 * Basic calendar math function (using moment.js) to return true or false if the date passed in is either
 * the same day or the previous day.
 *
 * @param dateString {String|int}
 * @param [refDate] {String|int}
 * @returns {Boolean}
 */
function todayOrYesterday(dateString, refDate) {
    "use strict";
    var targetDate = new Date(dateString);
    var today = refDate ? new Date(refDate) : new Date();

    // 24h only limit
    if ((today - targetDate) / 1e3 < 172800) {
        var yesterday = new Date(today / 1);
        yesterday.setDate(yesterday.getDate() - 1);

        return today.getDay() === targetDate.getDay() || yesterday.getDay() === targetDate.getDay();
    }
    return false;
}

/**
 * Basic calendar math function (using moment.js) that will return a string, depending on the exact calendar
 * dates/months ago when the passed `dateString` had happened.
 *
 * @param dateString {String|int}
 * @param [refDate] {String|int}
 * @returns {String}
 */
function time2lastSeparator(dateString, refDate) {
    var momentDate = moment(dateString);
    var today = moment(refDate ? refDate : undefined).startOf('day');
    var yesterday = today.clone().subtract(1, 'days');
    var weekAgo = today.clone().startOf('week').endOf('day');
    var twoWeeksAgo = today.clone().startOf('week').subtract(1, 'weeks').endOf('day');
    var thisMonth = today.clone().startOf('month').startOf('day');
    var thisYearAgo = today.clone().startOf('year');

    if (momentDate.isSame(today, 'd')) {
        // Today
        return l[1301];
    }
    else if (momentDate.isSame(yesterday, 'd')) {
        // Yesterday
        return l[1302];
    }
    else if (momentDate.isAfter(weekAgo)) {
        // This week
        return l[1303];
    }
    else if (momentDate.isAfter(twoWeeksAgo)) {
        // Last week
        return l[1304];
    }
    else if (momentDate.isAfter(thisMonth)) {
        // This month
        return l[1305];
    }
    else if (momentDate.isAfter(thisYearAgo)) {
        // This year
        return l[1306];
    }
    else {
        // more then 1 year ago...
        return l[1307];
    }
}

/**
 * Gets the current UNIX timestamp
 * @returns {Number} Returns an integer with the current UNIX timestamp (in seconds)
 */
function unixtime() {
    'use strict';
    return Math.round(Date.now() / 1000);
}

function uplpad(number, length) {
    'use strict';
    var str = String(number);
    while (str.length < length) {
        str = '0' + str;
    }
    return str;
}

function secondsToTime(secs, html_format) {
    'use strict';

    if (isNaN(secs) || secs === Infinity) {
        return '--:--:--';
    }
    if (secs < 0) {
        return '';
    }

    var hours = uplpad(Math.floor(secs / (60 * 60)), 2);
    var divisor_for_minutes = secs % (60 * 60);
    var minutes = uplpad(Math.floor(divisor_for_minutes / 60), 2);
    var divisor_for_seconds = divisor_for_minutes % 60;
    var seconds = uplpad(Math.floor(divisor_for_seconds), 2);
    var returnvar = hours + ':' + minutes + ':' + seconds;

    if (html_format) {
        hours = (hours !== '00') ? (hours + '<span>h</span> ') : '';
        returnvar = hours + minutes + '<span>m</span> ' + seconds + '<span>s</span>';
    }
    return returnvar;
}

function secondsToTimeShort(secs) {
    'use strict';
    var val = secondsToTime(secs);

    if (!val) {
        return val;
    }

    if (val.substr(0, 1) === "0") {
        val = val.substr(1, val.length);
    }
    if (val.substr(0, 2) === "0:") {
        val = val.substr(2, val.length);
    }

    return val;
}

function hoursToSeconds(hours) {
    'use strict';
    return hours * 60 * 60;
}

function secondsToHours(seconds) {
    'use strict';
    return seconds / (60 * 60);
}

function daysToSeconds(days) {
    'use strict';
    return days * 24 * 60 * 60;
}

function secondsToDays(seconds) {
    'use strict';
    return seconds / (24 * 60 * 60);
}

function formatTimeField(field, value) {
    'use strict';
    return `${value}${field} `;
}

function secondsToTimeLong(secs) {
    'use strict';

    if (isNaN(secs) || secs === Infinity) {
        return '--:--:--';
    }
    if (secs < 0) {
        return '';
    }

    const years = Math.floor(secs / (365 * 24 * 60 * 60));
    const divisor_for_months = secs % (365 * 24 * 60 * 60);
    const months = Math.floor(divisor_for_months / (30 * 24 * 60 * 60));
    const divisor_for_days = divisor_for_months % (30 * 24 * 60 * 60);
    const days = Math.floor(divisor_for_days / (24 * 60 * 60));
    const divisor_for_hours = divisor_for_days % (24 * 60 * 60);
    const hours = uplpad(Math.floor(divisor_for_hours / (60 * 60)), 2);
    const divisor_for_minutes = divisor_for_hours % (60 * 60);
    const minutes = uplpad(Math.floor(divisor_for_minutes / 60), 2);
    const divisor_for_seconds = divisor_for_minutes % 60;
    const seconds = uplpad(Math.floor(divisor_for_seconds), 2);

    const fields = ['y', 'm', 'd', 'h', 'm'];
    const values = [years, months, days, hours, minutes];
    const time_fields = [];

    for (let i = 0; i < values.length; i++) {
        if (values[i] > 0) {
            for (let j = i; j < values.length; j++) {
                time_fields.push(formatTimeField(fields[j], values[j]));
            }
            break;
        }
    }

    time_fields.push(`${seconds}s `);

    return time_fields.join('');
}

/**
 * Calculate the number of days since the given date
 * @param {String} dateStr The date string, in YYYY-MM-DD format
 * @returns {Number} the number of days
 */
function daysSince(dateStr) {
    'use strict';
    return moment(new Date()).diff(moment(dateStr, 'YYYY-MM-DD'), 'days');
}

/**
 * Calculate the number of days since Jan 1, 2000
 * @returns {Number}
 */
function daysSince1Jan2000() {
    'use strict';
    return daysSince('2000-01-01');
}

/**
 * Function to format currency with current locale
 * @param {Number} value Value to format
 * @param {String} [currency] Currency to use in currency formatting. Default: 'EUR'
 * @param {String} [display] display type of currency format, supporting types are below:
 *                  'symbol' - use a localized currency symbol but with country code such as "NZ$",
 *                  'narrowSymbol' - use a localized currency symbol without country code such as "$" for "NZ$",
 *                  'code' - use the ISO currency code such as "NZD",
 *                  'name' - use a localized currency name such as "dollar"
 *                  'number' - just number with correct decimal
 * @param {*} noDecimals True if no decimals wanted, otherwise it is the maximum number of decimals wanted
 * @param {Number} maxDecimalPlaces Set the maximum decimal places that will be printed
 * @returns {String} formated currency value
 */
function formatCurrency(value, currency, display, noDecimals) {

    'use strict';

    value = typeof value === 'string' ? parseFloat(value) : value;
    currency = currency || 'EUR';
    display = display || 'symbol';

    var displayNumber = false;
    var narrowSymbol = false;

    if (display === 'number') {
        display = 'code';
        displayNumber = true;
    }

    if (display === 'narrowSymbol') {
        display = 'symbol';
        narrowSymbol = currency !== 'EUR'; // Euro cannot have country
    }

    const {country, locales} = getCountryAndLocales();

    var options = {'style': 'currency', 'currency': currency, currencyDisplay: display};

    if (noDecimals) {
        options.minimumFractionDigits = 0;
        options.maximumFractionDigits = noDecimals === true ? 0 : noDecimals;
    }

    var result = value.toLocaleString(locales, options);

    // For Safari that 'symbol' result same as 'code', using fallback locale without country code to avoid the bug.
    if (display === 'symbol' && result.indexOf(currency.toUpperCase()) !== -1) {

        // Romanian with Euro Symbol currency display is currently buggy on all browsers, so doing this to polyfill it
        if (locales.startsWith('ro')) {
            result = value.toLocaleString('fr', options);
        }
        else if (locales.startsWith('ar') && !arabics.includes(country)) {
            // To avoid Firefox bug, set UAE as default country.
            result = value.toLocaleString('ar-AE', options);
        }
        else {
            result = value.toLocaleString(locale, options);
        }
    }

    // Polyfill for narrow symbol format as lacking support on Safari and old browers
    if (narrowSymbol) {

        // Cover NZ$, $NZ kinds case to just $ and not change something like NZD
        result = result.replace(/\b[A-Z]{2}\b/, '');
    }

    // If this is number only, remove currency code
    if (displayNumber) {
        result = result.replace(currency, '').trim();
    }

    if (locale === 'fr' && display === 'symbol') {
        result = result.replace(/([^1-9A-Za-z])([A-Z]{2})/, '$1 $2');
    }

    return result;
}

/**
 * Function to return percentage structure as it is difference on some locale.
 * @param {Number} value Value to format
 * @param {Boolean} twoDecimals If the number should be displayed with 2 decimals
 * @returns {String} Formateed percentage value with curreny locales
 */
function formatPercentage(value, twoDecimals) {

    'use strict';

    twoDecimals = twoDecimals || false;
    const locales = getCountryAndLocales().locales;
    const options = {'style': 'percent'};

    if (twoDecimals) {
        options.maximumFractionDigits = 2;
        options.minimumFractionDigits = 2;
    }

    return value.toLocaleString(locales, options);
}

/**
 * Function to return locales(e.g. en-GB, en-NZ...) and country code
 * @returns {Object} currently selected country and locales that user chosen
 */
function getCountryAndLocales() {

    'use strict';

    let country = 'ISO';
    let locales = '';

    // If user logged in and country data is set on Mega, using it.
    if (window.u_attr && window.u_attr.country) {
        country = window.u_attr.country;
        locales = locale + '-' + country;
    }
    // Otherwise, try grab country data from browser's navigator.languages
    else if (Array.isArray(navigator.languages)) {

        locales = navigator.languages.filter(l => l !== locale && l.startsWith(locale))[0];

        if (locales) {
            country = locales.replace(`${locale}-`, '');
        }
    }

    // cnl is exist and has same country as u_attr return cached version.
    if ($.cnl && $.cnl.country === country) {
        return $.cnl;
    }

    locales = mega.intl.test(locales) || mega.intl.test(locale) || 'ISO';

    // If locale is Arabic and country is non-Arabic country or non set,
    if (locale === 'ar' && !arabics.includes(country)) {
        // To avoid Firefox bug, set UAE as default country.
        locales = 'ar-AE';
    }

    return $.cnl = {country: country, locales: locales};
}

//----------------------------------------------------------------------------
/**
 * Date.parse with progressive enhancement for ISO 8601 <https://github.com/csnover/js-iso8601>
 * (c) 2011 Colin Snover <http://zetafleet.com>
 * Released under MIT license.
 */
(function(Date, undefined) {
    var origParse = Date.parse,
        numericKeys = [1, 4, 5, 6, 7, 10, 11];
    Date.parse = function(date) {
        var timestamp, struct, minutesOffset = 0;

        // ES5 15.9.4.2 states that the string should attempt to be parsed as a Date Time String Format string
        // before falling back to any implementation-specific date parsing, so that's what we do, even if native
        // implementations could be faster
        //              1 YYYY                2 MM       3 DD           4 HH    5 mm       6 ss        7 msec        8 Z 9 +    10 tzHH    11 tzmm
        if ((struct = /^(\d{4}|[+\-]\d{6})(?:-(\d{2})(?:-(\d{2}))?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{3}))?)?(?:(Z)|([+\-])(\d{2})(?::(\d{2}))?)?)?$/.exec(date))) {
            // avoid NaN timestamps caused by "undefined" values being passed to Date.UTC
            for (var i = 0, k; (k = numericKeys[i]); ++i) {
                struct[k] = +struct[k] || 0;
            }

            // allow undefined days and months
            struct[2] = (+struct[2] || 1) - 1;
            struct[3] = +struct[3] || 1;

            if (struct[8] !== 'Z' && struct[9] !== undefined) {
                minutesOffset = struct[10] * 60 + struct[11];

                if (struct[9] === '+') {
                    minutesOffset = 0 - minutesOffset;
                }
            }

            timestamp = Date.UTC(struct[1],
                struct[2], struct[3], struct[4], struct[5] + minutesOffset, struct[6], struct[7]);
        }
        else {
            timestamp = origParse ? origParse(date) : NaN;
        }

        return timestamp;
    };
}(Date));

/**
 * Returns "Today" (or "Today, 16:32" if verbose is true) if  the specific timestamp was in the past 2 days, otherwise
 * uses an absolute date stamp (1st June 2020)
 *
 * @param {Number} unixtime
 * @param {Boolean} [verbose]
 * @returns {String}
 */
function getTimeMarker(unixtime, verbose) {
    'use strict';
    var result;
    if (todayOrYesterday(unixtime * 1000)) {
        // if in last 2 days, use the time2lastSeparator
        var iso = (new Date(unixtime * 1e3)).toISOString();
        result = time2lastSeparator(iso) + (verbose ? ", " + toLocaleTime(unixtime) : "");
    }
    else {
        // if not in the last 2 days, use 1st June [Year]
        result = acc_time2date(unixtime, false);
    }
    return result;

}

/**
 * Returns formatted time string for the given timestamp. The format used is based on the user's locale and selected
 * settings, e.g. ISO formatting. Use `HH h MM` format for French locales.
 * @param {Number} unixtime UNIX timestamp, either in milliseconds or seconds.
 * @returns {String}
 */

function toLocaleTime(unixtime) {
    'use strict';
    unixtime = Math.abs(Date.now() - unixtime) < Math.abs(Date.now() - unixtime * 1000) ? unixtime / 1000 : unixtime;
    const { locales, country } = getCountryAndLocales();
    if (country === 'ISO') {
        return time2date(unixtime, 21);
    }
    return locales.startsWith('fr') ? time2date(unixtime, 22).replace(':', ' h ') : time2date(unixtime, 22);
}

//----------------------------------------------------------------------------

// eslint-disable-next-line complexity
mBroadcaster.once('boot_done', async function populate_l() {
    'use strict';

    const lang_json = chrome.runtime.getURL(`../lang/${locale}.json`);

    const response = await fetch(lang_json);
    l = await response.json();

    if (d) {
        const loaded = l;
        window.dstringids = localStorage.dstringids;
        l = new Proxy(loaded, {
            get: (target, prop) => {
                if (dstringids) {
                    return `[$${prop}]`;
                }

                return target[prop] ? target[prop] : `(missing-$${prop})`;
            }
        });
    }

    l[0] = 'MEGA ' + new Date().getFullYear();
    if ((lang === 'es') || (lang === 'pt') || (lang === 'sk')) {
        l[0] = 'MEGA';
    }

    l.year = new Date().getFullYear();
    date_months = [
        l[408], l[409], l[410], l[411], l[412], l[413],
        l[414], l[415], l[416], l[417], l[418], l[419]
    ].map(escapeHTML);

    l.date_added = escapeHTML(l.date_added).replace('[S]', '<span>').replace('[/S]', '</span>');
    l.blocked_rsn_terminated = escapeHTML(l.blocked_rsn_terminated)
        .replace('[A]', '<a href="https://mega.io/terms" target="_blank" rel="noopener noreferrer">')
        .replace('[/A]', '</a>')
        .replace('[BR]', '<br>');

    l.error_fetching_items = escapeHTML(l.error_fetching_items)
        .replace('[A]', '<a href="mailto:support@mega.nz">')
        .replace('[/A]', '</a>');

    l.request_failed = escapeHTML(l.request_failed)
        .replace('[A]', '<a href="mailto:support@mega.nz">')
        .replace('[/A]', '</a>');

    l.item_updated = escapeHTML(l.item_updated)
        .replace('[S]', '"<span class="long-title-truncate">')
        .replace('[/S]', '</span>"');

    l.delete_confirmation_title = escapeHTML(l.delete_confirmation_title)
        .replace('[S]', '<span class="long-title-truncate">"')
        .replace('[/S]', '</span>"');

    l.item_deleted = escapeHTML(l.item_deleted)
        .replace('[S]', '"<span class="long-title-truncate">')
        .replace('[/S]', '</span>"');

    l.clear_clipboard_google_update_subtitle = escapeHTML(l.clear_clipboard_google_update_subtitle)
        .replace('[A]', '<a href="https://www.google.com/chrome/update/" target="_blank">')
        .replace('[/A]', '</a>');

    l.recovery_key_subtitle = escapeHTML(l.recovery_key_subtitle)
        .replace('[A]', '<a href="https://help.mega.io/accounts/password-management/recovery-key" target="_blank">')
        .replace('[/A]', '</a>');

    const recoveryKeyLink = 'https://help.mega.io/accounts/password-management/recovery-key';

    l.logout_recovery_key = escapeHTML(l.logout_recovery_key)
        .replace('[A]', `<a href="${recoveryKeyLink}" target="_blank">`)
        .replace('[/A]', '</a>');
    l.select_file_notes = escapeHTML(l.select_file_notes)
        .replace('[B]', '<b>')
        .replace('[/B]', '</b>');

    l.flexi_suspended_desc = escapeHTML(l.pro_flexi_account_suspended_description)
        .replace(/\[BR]/g, '<br>');
    l[20402] = escapeHTML(l[20402]).replace(/\[BR]/g, '<br>');

    l.import_notes = escapeHTML(l.import_notes)
        .replace('[A]', `<a href="https://help.mega.io/pass/features/import-passwords" target="_blank">`)
        .replace('[/A]', '</a>');

    // Set the Locale based the language that is selected. (Required for accurate string comparisons).
    // If the locale has been remapped, apply the remap.
    locale = lang;
    if (remappedLangLocales.hasOwnProperty(locale)) {
        locale = remappedLangLocales[locale];
    }

    lang_loaded = true;
    mBroadcaster.sendMessage('lang_loaded');
});

/** @property mega.intl */
lazy(mega, 'intl', function _() {
    'use strict';
    const ns = Object.create(null);
    const Intl = window.Intl || {};
    if (!Intl.NumberFormat) {
        // weak silly polyfill
        Intl.NumberFormat = function mIntlNumberFormat() { /* dummy */ };
        Intl.NumberFormat.prototype = {
            constructor: Intl.NumberFormat,
            format: (n) => parseFloat(n).toString(),
            formatToParts: function(n) {
                const [i, f] = this.format(n).split(/[,.]/);
                return [
                    {type: 'integer', value: i | 0}, {type: 'decimal', value: '.'}, {type: 'fraction', value: f | 0}
                ];
            }
        };
        // @todo add Collator whenever needed.
    }

    /** @property mega.intl.number */
    lazy(ns, 'number', function() {
        return this.get('NumberFormat', {minimumFractionDigits: 2});
    });

    /** @property mega.intl.bitcoin */
    lazy(ns, 'bitcoin', function() {
        return this.get('NumberFormat', {minimumFractionDigits: 8});
    });

    /** @property mega.intl.collator */
    lazy(ns, 'collator', function() {
        return this.get('Collator');
    });

    /** @property mega.intl.decimal */
    lazy(ns, 'decimal', function() {
        return this.get('NumberFormat');
    });

    /** @property mega.intl.decimalSeparator */
    lazy(ns, 'decimalSeparator', function() {
        const value = tryCatch(() => this.number.formatToParts(1.1).find(obj => obj.type === 'decimal').value, false)();
        return value || '.';
    });

    /** @property mega.intl.locale */
    lazy(ns, 'locale', function() {
        const locale = window.locale || window.lang;
        const navLocales = Array.isArray(navigator.languages)
            && navigator.languages.filter(l => l !== locale && l.startsWith(locale))[0];

        // @todo Polyfill Intl.Locale() and return an instance of it instead?
        return navLocales && this.test(navLocales) || this.test(locale) || 'en';
    });

    /** @function mega.intl.get */
    ns.get = function(type, options) {
        let intl;

        tryCatch(() => {
            intl = new Intl[type](this.locale.replace('ar', 'en'), options);
        }, false)();

        return intl || new Intl[type]();
    };

    /** @function mega.intl.compare */
    ns.compare = function(a, b) {
        // compares two strings according to the sort order of the current locale.
        return this.collator.compare(a, b);
    };

    /** @function mega.intl.reset */
    ns.reset = function() {
        delete mega.intl;
        lazy(mega, 'intl', _);
    };

    /** @function mega.intl.test */
    ns.test = locale => tryCatch(() => Intl.NumberFormat.supportedLocalesOf(locale)[0], false)();
    // @todo ^ does this return the canonical even in browsers not supporting Intl.getCanonicalLocales() ?

    return ns;
});

/**
 * Returns the remapped language code (correct for Transifex) for the users selected lang
 *
 * @returns {string} The language code.
 */
function getTransifexLangCode() {
    'use strict';

    switch (lang) {
        case 'br': return 'pt';
        case 'cn': return 'zh_CN';
        case 'ct': return 'zh_TW';
        case 'jp': return 'ja';
        case 'kr': return 'ko';
        default: return lang;
    }
}

/**
 * Apply any remapping of internal language codes to what should be shown in the UI
 *
 * @param {string} [langCode] The two character language code used internally by webclient
 * @returns {string} The two character language code that should be displayed to the user
 */
function getRemappedLangCode(langCode) {
    'use strict';

    langCode = langCode || lang;
    const remaps = {
        br: 'pt',
        cn: 'sc',
        ct: 'tc',
    };

    if (remaps[langCode]) {
        return remaps[langCode];
    }
    return langCode;
}
