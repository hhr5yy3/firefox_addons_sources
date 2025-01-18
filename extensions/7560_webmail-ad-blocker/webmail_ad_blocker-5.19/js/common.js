// Copyright Jason Savard
"use strict";

/**
 * @param {() => void} fn
 */
function docReady(fn) {
    if (globalThis.document) {
        if (document.readyState === "interactive" || document.readyState === "complete") {
            fn();
        } else {
            document.addEventListener("DOMContentLoaded", () => {
                fn();
            });
        }
    } else {
        console.warn("can't use docRead without document");
    }
}

let escapeHTMLPolicy;

if (globalThis.trustedTypes?.createPolicy) { // Feature testing
    trustedTypes.createPolicy('default', {
        createScript: (string) => {
            if (location.href.includes("/search?")) {
                return string;
            } else {
                return undefined;
            }
        },
        createScriptURL: (input) => {
            // created specifically for stripe: https://stripe.com/docs/security/guide#content-security-policy
            if (new URL(input).origin === 'https://js.stripe.com') {
                return input;
            } else if (new URL(input).origin === 'https://www.gstatic.com') { // for recaptcha
                return input;
            }
            return undefined;
        }
    });
    
    escapeHTMLPolicy = trustedTypes.createPolicy('myEscapePolicy', {
        createHTML: string => string, //.replace(/\</g, '&lt;')
        createScriptURL: string => string,
    });
} else {
    // dummy
    escapeHTMLPolicy = {
        createHTML: string => string,
        createScriptURL: string => string,
    }
}

const htmlElement = globalThis.document?.documentElement;
const getBody = () => document.body;

function createBR() {
    return document.createElement("br");
}

function emptyNode(target) {
    parseTarget(target, el => {
        while(el.firstChild) el.removeChild(el.firstChild);
    });
}

function byId(id) {
    return document.getElementById(id);
}

function selector(selector) {
    return document.querySelector(selector);
}

function selectorAll(selector) {
    return document.querySelectorAll(selector);
}

function parseTarget(target, handleElement) {
    if (!target) {
        return [];
    }

    if (typeof target === "string") {
        target = selectorAll(target);
    }

    if (!target.forEach) {
        target = [target];
    }

    target.forEach(e => {
        handleElement(e);
    });
}

function show(target) {
    parseTarget(target, element => {
        if (element.hidden) {
            element.hidden = false;
        }

        if (getComputedStyle(element).display === "none") {
            element.style.display = "block";
        }
    });
}

function hide(target) {
    parseTarget(target, element => {
        element.hidden = true;

        if (getComputedStyle(element).display !== "none") {
            element.style.display = "none";
        }
    });
}

// note when using fnName "this" binding will not work and must use event.target
function addEventListeners(target, type, fn, fnName) {
    parseTarget(target, el => {
        if (fnName) {
            globalThis[fnName] = globalThis[fnName] || function(event) {
                fn(event);
            };
            el.addEventListener(type, globalThis[fnName]);        
        } else {
        	el.addEventListener(type, fn);
        }
    });
};


if (globalThis.browser) {
	chrome = globalThis.browser;
}

class DetectClientClass {
    platform = "Windows";

    constructor() {
    }

    async init() {
        if (navigator.userAgentData) {
            this.platform = (await navigator.userAgentData.getHighEntropyValues(["platform"])).platform;
        }
    }
  
    findBrand(brandString) {
        return navigator.userAgentData?.brands.some(brands => brands.brand == brandString);
    }
    
    isChrome() {
        return this.findBrand("Google Chrome");
    }

    isChromium () {
        return this.findBrand("Chromium")
             && !this.isFirefox()
             && !this.isSafari()
        ;
    }

    isEdge() {
        return this.findBrand("Microsoft Edge");
    }

    isOpera() {
        return this.findBrand("Opera");
    }

    isFirefox() {
        return /firefox/i.test(navigator.userAgent);
    }

    isSafari() {
        return /safari/i.test(navigator.userAgent) && !/chrome/i.test(navigator.userAgent);
    }

    isWindows() {
        if (navigator.userAgentData) {
            return this.platform == "Windows";
        } else {
            return /windows/i.test(navigator.userAgent);
        }
    }

    isAndroid() {
        if (navigator.userAgentData) {
            return this.platform == "Android";
        } else {
            return /android/i.test(navigator.userAgent);
        }
    }

    isMac() {
        if (navigator.userAgentData) {
            return this.platform == "macOS";
        } else {
            return /mac/i.test(navigator.userAgent);
        }
    }

    is_iPhone() {
        if (navigator.userAgentData) {
            return this.platform == "iOS";
        } else {
            return /iPhone/i.test(navigator.userAgent);
        }
    }

    isLinux() {
        if (navigator.userAgentData) {
            return this.platform == "Linux";
        } else {
            return /linux/i.test(navigator.userAgent);
        }
    }

    isChromeOS() {
        return this.platform == "Chrome OS" || this.platform == "ChromeOS";
    }

    async getChromeChannel() {
        
        if (this.isChrome() || this.isChromeOS()) {
            let platform;

            if (this.isWindows()) {
                platform = "win";
            } else if (this.isMac()) {
                platform = "mac";
            } else if (this.isLinux()) {
                platform = "linux";
            } else if (this.isChromeOS()) {
                platform = "chromeos";
            } else if (this.isAndroid()) {
                platform = "android";
            } else {
                platform = "all";
            }

            const fullVersionList = (await navigator.userAgentData.getHighEntropyValues(["fullVersionList"])).fullVersionList;
            let matchedBrand = fullVersionList.find(list => list.brand == "Google Chrome");
            if (!matchedBrand) {
                matchedBrand = fullVersionList.find(list => list.brand == "Chromium");
                if (!matchedBrand) {
                    matchedBrand = fullVersionList.find(list => !list.brand.match(/brand/i));
                }
            }

            let browserVersion = matchedBrand?.version;
            if (!browserVersion) {
                throw Error("Could not extract browser version", fullVersionList);
            }
            //browserVersion = "99.0.4844.74";

            const data = await fetchJSON(`https://versionhistory.googleapis.com/v1/chrome/platforms/${platform}/channels/all/versions/all/releases?filter=version=${browserVersion}`);
            const release = data.releases[0];
            const channel = release.name.split("/")[4];
            const startTime = new Date(release.serving.startTime);
            if (release.serving.endTime) {
                //console.log("et", new Date(release.serving.endTime));
            }

            const OLD_VERSION_THRESHOLD_IN_DAYS = 90;

            return {
                channel: channel,
                oldVersion: Math.abs(startTime.diffInDays()) > OLD_VERSION_THRESHOLD_IN_DAYS
            };
        } else {
            throw Error("Not Chrome");
        }
    }

    getFirefoxDetails() {
        return new Promise((resolve, reject) => {
            $.getJSON("https://jasonsavard.com/getBrowserDetails", response => {
                resolve(response);
            });
        });
    }
}

const DetectClient = new DetectClientClass();

globalThis.onerror = function(msg, url, line) {
	var thisUrl = removeOrigin(url).substr(1); // also remove beginning slash '/'
	var thisLine;
	if (line) {
		thisLine = " (" + line + ") ";
	} else {
		thisLine = " ";
	}
	
	var category = "JS Errors"; 
	var GAError = thisUrl + thisLine + msg;
	var label = navigator.appVersion;
	
	if (typeof sendGA != "undefined") {
		sendGA(category, GAError, label);
	}
	//return false; // false prevents default error handling.
};

//usage: [url] (optional, will use location.href by default)
function removeOrigin(url) {
	var linkObject;
	if (arguments.length && url) {
		try {
			linkObject = document.createElement('a');
			linkObject.href = url;
		} catch (e) {
			console.error("jerror: could not create link object: " + e);
		}
	} else {
		linkObject = location;
	}
	
	if (linkObject) {
		return linkObject.pathname + linkObject.search + linkObject.hash;
	} else {
		return url;
	}
}

function logError(msg, o) {
	try {
		var onErrorMessage;
		if (o) {
			console.error(msg, o);
			onErrorMessage = msg + " " + o;
		} else {
			console.error(msg);
			onErrorMessage = msg;
		}
		globalThis.onerror(onErrorMessage, location.href);
	} catch (e) {
		console.error("error in onerror?", e);
	}
}

function getInternalPageProtocol() {
	var protocol;
	if (DetectClient.isFirefox()) {
		protocol = "moz-extension:";
	} else {
		protocol = "chrome-extension:";
	}
	return protocol;
}

function isInternalPage(url) {
	if (arguments.length == 0) {
		url = location.href;
	}
	return url && url.indexOf(getInternalPageProtocol()) == 0;
}

var ONE_MINUTE = 60000;
var ONE_HOUR = ONE_MINUTE * 60;
var ONE_DAY = ONE_HOUR * 24;
var origConsoleLog = null;
var origConsoleWarn = null;
var origConsoleDebug = null;

//usage: sendGA('send', 'event', 'category', 'action', 'opt_label', opt_value, {'nonInteraction': 1});
function sendGA(category, action, label, nonInteraction) {
	console.log("sendGA: ", category, action, label, nonInteraction);
	if (globalThis.ga) {
		if (arguments.length <= 1) {
			console.error("ga requires the category and action parameters");
		} else if (arguments.length == 2) {
			ga('send', 'event', category, action);
		} else if (arguments.length == 3) {
			ga('send', 'event', category, action, label);
		} else if (arguments.length == 4) {
			ga('send', 'event', category, action, label, nonInteraction);
		}
	}
}

function getPaypalLC() {
	var locale = globalThis.navigator.language;
	var lang = null;
	if (locale) {
		if (locale.match(/zh/i)) {
			lang = "CN"; 
		} else if (locale.match(/_GB/i)) {
			lang = "GB";
		} else if (locale.match(/ja/i)) {
			lang = "JP";
		} else {
			lang = locale.substring(0,2);
		}
		return lang;
	}
}

function loadCalendarJS(lang) {
	document.write(unescape("%3Cscript src='js/calendar/calendar-" + lang + ".js' type='text/javascript'%3E%3C/script%3E"));
}


// Console...
origConsoleLog = console.log;
origConsoleWarn = console.warn;
origConsoleDebug = console.debug;
//initConsole();

var lang = "en";			
if (globalThis.navigator.language) {
	lang = globalThis.navigator.language.substring(0, 2);
}

docReady(() => {
    initMessages();
});

function log(str, prefName) {
	if (pref(prefName)) {
		console.log(str);
	}
}

function getProtocol() {
	return pref("ssl2", true) ? "https" : "http";
}

function initConsole() {
	// Legacy
	if (false && getBrowserVersion() && getBrowserVersion() < 4.2) {
		console.error = console.warn = console.info = console.log = function(msg){alert(msg);};
	}
	if (pref("console_messages")) {
		chrome.extension.getBackgroundPage().console.log = console.log = origConsoleLog;
		chrome.extension.getBackgroundPage().console.warn = console.warn = origConsoleWarn;
		chrome.extension.getBackgroundPage().console.debug = console.debug = origConsoleDebug;
	} else {
		chrome.extension.getBackgroundPage().console.log = chrome.extension.getBackgroundPage().console.warn = chrome.extension.getBackgroundPage().console.debug = console.warn = console.info = console.log = function(msg){};
	}
}

function initMessages(node) {
	var selector;
	if (node) {
		selector = node;
	} else {
		selector = "*";
	}
	selectorAll(selector).forEach(el => {
		let attr = el.getAttribute("msg");
		if (attr) {
			const msgArg1 = el.getAttribute("msgArg1");
			if (msgArg1) {
                el.textContent = chrome.i18n.getMessage( attr, msgArg1 )
			} else {
				// look for inner msg nodes to replace before...
				const innerMsg = el.querySelectorAll("*[msg]");
				if (innerMsg.length) {
					initMessages(innerMsg);
					const msgArgs = innerMsg.map(msg => msg.outerHTML);
					el.innerHTML = escapeHTMLPolicy.createHTML(chrome.i18n.getMessage(attr, msgArgs));
				} else {
                    el.textContent = chrome.i18n.getMessage(attr);
				}
			}
		}
		attr = el.getAttribute("msgTitle");
		if (attr) {
			el.setAttribute("title", chrome.i18n.getMessage(attr));
		}
		attr = el.getAttribute("msgSrc");
		if (attr) {
			el.setAttribute("src", chrome.i18n.getMessage(attr));
		}
		attr = el.getAttribute("msgValue");
		if (attr) {
			el.setAttribute("value", chrome.i18n.getMessage(attr));
		}
	});
}

function donationClicked(action, ls) {
	if (pref("donationClicked", null, ls)) {
		return true;
	} else {
		var url = "donate.html?action=" + action;
		try {
			chrome.tabs.create({url:url});
		} catch (e) {
			// Must be in a content_script or somewhere chrome.tabs.create cannot be called so send call to background.js
			chrome.runtime.sendMessage({name: "openTab", url:url});
		}
		return false;
	}
}

function removeNode(id) {
	var o = document.getElementById(id);
	if (o) {
		o.parentNode.removeChild(o);
	}
}

function addCSS(id, css) {
	removeNode(id);
	var s = document.createElement('style');
	s.setAttribute('id', id);
	s.setAttribute('type', 'text/css');
	s.appendChild(document.createTextNode(css));
	(document.getElementsByTagName('head')[0] || document.documentElement).appendChild(s);
}

function pad(str, times, character) { 
	var s = str.toString();
	var pd = '';
	var ch = character ? character : ' ';
	if (times > s.length) { 
		for (var i=0; i < (times-s.length); i++) { 
			pd += ch; 
		}
	}
	return pd + str.toString();
}

function getBrowserVersion() {
	// Browser name = Chrome, Full version = 4.1.249.1064, Major version = 4, navigator.appName = Netscape, navigator.userAgent = Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US) AppleWebKit/532.5 (KHTML, like Gecko) Chrome/4.1.249.1064 Safari/532.5
	//																															  Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US) AppleWebKit/533.4 (KHTML, like Gecko) Chrome/5.0.375.38 Safari/533.4
	var agent = navigator.userAgent;
	var offset = agent.indexOf("Chrome");
	var version = null;
	if (offset != -1) {
		version = agent.substring(offset+7);
		offset = version.indexOf(";");
		if (offset != -1) {
			version = version.substring(0, offset);
		}
		offset = version.indexOf(" ");
		if (offset != -1) {
			version = version.substring(0, offset);
		}
	}
	if (version) {
		return parseFloat(version);
	}
}

function toBool(str) {
	if ("false" === str || str == undefined) {
		return false;
	} else if ("true" === str) {
		return true;
	} else {
		return str;
	}
}

// This pref function is different*** we pass either just the param to localStorage[param] or the value of localStorage["example"]
function pref(param, defaultValue, ls) {
	var value;
	if (ls) {
		value = ls[param];
	} else {
		value = localStorage[param];
	}
	if (defaultValue == undefined) {
		defaultValue = false;
	}
	return value == null ? defaultValue : toBool(value);
}

// name case sensitive
// url (optional defaults to location.href)
function getUrlValue(name, url) {
    url ||= globalThis.location?.href;

    const urlObj = new URL(url, "https://jasondefault.com");
    return urlObj.searchParams.get(name);
}

function addUrlParam(url, name, value) {
	if (url) {
		var urlStart = url;
		if (url.includes("?")) {
			urlStart += "&";
		} else {
			urlStart += "?";
		}
		return urlStart + name + "=" + value;
	}
	return null;
}

function getCookie(c_name) {
	if (document.cookie.length>0) {
	  c_start=document.cookie.indexOf(c_name + "=");
	  if (c_start!=-1) {
	    c_start=c_start + c_name.length+1;
	    c_end=document.cookie.indexOf(";",c_start);
	    if (c_end==-1) c_end=document.cookie.length;
	    return unescape(document.cookie.substring(c_start,c_end));
	    }
	  }
	return "";
}

// Usage: getManifest(function(manifest) { display(manifest.version) });
function getManifest(callback) {
	var xhr = new XMLHttpRequest();
	xhr.onload = function() {
		callback(JSON.parse(xhr.responseText));
	};
	xhr.open('GET', './manifest.json', true);
	xhr.send(null);
}

var DATE_TIME_REGEX = /^(\d\d\d\d)-(\d\d)-(\d\d)T(\d\d):(\d\d):(\d\d)\.\d+(\+|-)(\d\d):(\d\d)$/;
var DATE_TIME_REGEX_Z = /^(\d\d\d\d)-(\d\d)-(\d\d)T(\d\d):(\d\d):(\d\d)\.\d+Z$/;
var DATE_TIME_REGEX_Z2 = /^(\d\d\d\d)-(\d\d)-(\d\d)T(\d\d):(\d\d):(\d\d)+Z$/;
var DATE_MILLI_REGEX = /^(\d\d\d\d)(\d\d)(\d\d)T(\d\d)(\d\d)(\d\d)$/;
var DATE_REGEX = /^(\d\d\d\d)-(\d\d)-(\d\d)$/;
var DATE_NOSPACES_REGEX = /^(\d\d\d\d)(\d\d)(\d\d)$/;

/* Convert the incoming date into a javascript date
 * 2006-04-28T09:00:00.000-07:00
 * 2006-04-28T09:00:00.000Z
 * 2010-05-25T23:00:00Z (new one from jason)
 * 2006-04-19
 */
function exists(o) {
	if (o) {
		return true;
	} else {
		return false;	
	}	
}
 
function rfc3339StringToDate(rfc3339) {
  var parts = DATE_TIME_REGEX.exec(rfc3339);
  
  // Try out the Z version
  if (!parts) {
    parts = DATE_TIME_REGEX_Z.exec(rfc3339);
  }
  if (!parts) {
	parts = DATE_TIME_REGEX_Z2.exec(rfc3339);
  }
  
  if (exists(parts) && parts.length > 0) {
    var d = new Date();
    d.setUTCFullYear(parts[1], parseInt(parts[2], 10) - 1, parts[3]);
    d.setUTCHours(parts[4]);
    d.setUTCMinutes(parts[5]);
    d.setUTCSeconds(parts[6]);
	d.setUTCMilliseconds(0);

    var tzOffsetFeedMin = 0;
    if (parts.length > 7) {
      tzOffsetFeedMin = parseInt(parts[8],10) * 60 + parseInt(parts[9],10);
      if (parts[7] != '-') { // This is supposed to be backwards.
        tzOffsetFeedMin = -tzOffsetFeedMin;
      }
    }
    return new Date(d.getTime() + tzOffsetFeedMin * ONE_MINUTE);
  }
  
  parts = DATE_MILLI_REGEX.exec(rfc3339);
  if (exists(parts)) {
		var d = new Date();
		d.setFullYear(parts[1], parseInt(parts[2], 10) - 1, parts[3]);
	    d.setHours(parts[4]);
	    d.setMinutes(parts[5]);
	    d.setSeconds(parts[6]);
		d.setMilliseconds(0);
		return d;
  }
  if (!parts) {
	  parts = DATE_REGEX.exec(rfc3339);
  }
  if (!parts) {
	  parts = DATE_NOSPACES_REGEX.exec(rfc3339);
  }
  if (exists(parts) && parts.length > 0) {
    return new Date(parts[1], parseInt(parts[2],10) - 1, parts[3]);
  }
  if (!isNaN(rfc3339)) {
	  return new Date(rfc3339);
  }
  return null;
}

function getExtensionIDFromURL(url) {
	//"chrome-extension://dlkpjianaefoochoggnjdmapfddblocd/options.html"
	return url.split("/")[2]; 
}

function getStatus(request, textStatus) {
	var status; // status/textStatus combos are: 201/success, 401/error, undefined/timeout
	try {
		status = request.status;
	} catch (e) {
		status = textStatus;
	}
	return status;
}

function now() {
	return today().getTime();
}

function today() {
	var offsetToday = localStorage["today"];
	if (offsetToday) {
		return new Date(offsetToday);
	} else {
		return new Date();
	}
}

function setTodayOffsetInDays(days) {
	var offset = today();
	offset.setDate(offset.getDate()+parseInt(days));
	localStorage["today"] = offset;
}

function clearTodayOffset() {
	localStorage.removeItem("today");
}

function isToday(date) {
	return date.getFullYear() == today().getFullYear() && date.getMonth() == today().getMonth() && date.getDate() == today().getDate();
}

function isTomorrow(date) {
	var tomorrow = today();
	tomorrow.setDate(tomorrow.getDate()+1);
	return date.getFullYear() == tomorrow.getFullYear() && date.getMonth() == tomorrow.getMonth() && date.getDate() == tomorrow.getDate();
}

function isYesterday(date) {
	var tomorrow = today();
	tomorrow.setDate(tomorrow.getDate()-1);
	return date.getFullYear() == tomorrow.getFullYear() && date.getMonth() == tomorrow.getMonth() && date.getDate() == tomorrow.getDate();
}

Date.prototype.isToday = function () {
	return isToday(this);
};

Date.prototype.isTomorrow = function () {
	return isTomorrow(this);
};

Date.prototype.isYesterday = function () {
	return isYesterday(this);
};

Date.prototype.isSameDay = function (otherDay) {
	return this.getFullYear() == otherDay.getFullYear() && this.getMonth() == otherDay.getMonth() && this.getDate() == otherDay.getDate();
};

function diffInDays(date1, date2) {
	var d1 = new Date(date1);
	d1.setHours(1);
	d1.setMinutes(1);
	var d2 = new Date(date2);
	d2.setHours(1);
	d2.setMinutes(1);
	return Math.round(Math.ceil(d2.getTime() - d1.getTime()) / ONE_MINUTE / 60 / 24);
}

function addToArray(str, ary) {
	for (a in ary) {
		if (ary[a] == str) {
			return false;
		}
	}
	ary.push(str);
	return true;
}

function removeFromArray(str, ary) {
	for (var a=0; a<ary.length; a++) {
		if (ary[a] == str) {
			ary.splice(a, 1);
			return true;
		}
	}
	return false;
}

function isInArray(str, ary) {
	for (a in ary) {
		if (isSameUrl(ary[a], str)) {
			return true;
		}
	}
	return false;
}

function isSameUrl(url1, url2) {
	return removeProtocol(url1) == removeProtocol(url2);
}

function removeProtocol(url) {
	if (url) {
		return url.replace(/https?:\/\//g, "");
	} else {
		return url;
	}
}

var dateFormat = function () {
	var	token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
		timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
		timezoneClip = /[^-+\dA-Z]/g,
		pad = function (val, len) {
			val = String(val);
			len = len || 2;
			while (val.length < len) val = "0" + val;
			return val;
		};

	// Regexes and supporting functions are cached through closure
	return function (date, mask, utc) {
		var dF = dateFormat;

		// You can't provide utc if you skip other args (use the "UTC:" mask prefix)
		if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
			mask = date;
			date = undefined;
		}

		// Passing date through Date applies Date.parse, if necessary
		date = date ? new Date(date) : new Date;
		if (isNaN(date)) throw SyntaxError("invalid date");

		mask = String(dF.masks[mask] || mask || dF.masks["default"]);

		// Allow setting the utc argument via the mask
		if (mask.slice(0, 4) == "UTC:") {
			mask = mask.slice(4);
			utc = true;
		}

		var	_ = utc ? "getUTC" : "get",
			d = date[_ + "Date"](),
			D = date[_ + "Day"](),
			m = date[_ + "Month"](),
			y = date[_ + "FullYear"](),
			H = date[_ + "Hours"](),
			M = date[_ + "Minutes"](),
			s = date[_ + "Seconds"](),
			L = date[_ + "Milliseconds"](),
			o = utc ? 0 : date.getTimezoneOffset(),
			flags = {
				d:    d,
				dd:   pad(d),
				ddd:  dF.i18n.dayNamesShort[D],
				dddd: dF.i18n.dayNames[D],
				m:    m + 1,
				mm:   pad(m + 1),
				mmm:  dF.i18n.monthNamesShort[m],
				mmmm: dF.i18n.monthNames[m],
				yy:   String(y).slice(2),
				yyyy: y,
				h:    H % 12 || 12,
				hh:   pad(H % 12 || 12),
				H:    H,
				HH:   pad(H),
				M:    M,
				MM:   pad(M),
				s:    s,
				ss:   pad(s),
				l:    pad(L, 3),
				L:    pad(L > 99 ? Math.round(L / 10) : L),
				t:    H < 12 ? "a"  : "p",
				tt:   H < 12 ? "am" : "pm",
				T:    H < 12 ? "A"  : "P",
				TT:   H < 12 ? "AM" : "PM",
				Z:    utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
				o:    (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
				S:    ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
			};

		return mask.replace(token, function ($0) {
			return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
		});
	};
}();

// Some common format strings
dateFormat.masks = {
	"default":      "ddd mmm dd yyyy HH:MM:ss",
	shortDate:      "m/d/yy",
	mediumDate:     "mmm d, yyyy",
	longDate:       "mmmm d, yyyy",
	fullDate:       "dddd, mmmm d, yyyy",
	shortTime:      "h:MM TT",
	mediumTime:     "h:MM:ss TT",
	longTime:       "h:MM:ss TT Z",
	isoDate:        "yyyy-mm-dd",
	isoTime:        "HH:MM:ss",
	isoDateTime:    "yyyy-mm-dd'T'HH:MM:ss",
	isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
};

// Internationalization strings
dateFormat.i18n = {
	dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
	dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
	monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
	monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
};

//dateFormat.i18nEnglish = $.extend(true, {}, dateFormat.i18n);
//dateFormat.i18nCalendarLanguage = $.extend(true, {}, dateFormat.i18n);

// For convenience...
Date.prototype.format = function (mask, utc) {
	return dateFormat(this, mask, utc);
};

Date.prototype.formattedTime = function () {
	if (pref("24hourMode")) {
		return dateFormat(this, "HH:MM");
	} else {
		return dateFormat(this, "h:MMtt");
	}
};

function findTag(str, name) {
	if (str) {
		var index = str.indexOf("<" + name + " ");
		if (index == -1) {
			index = str.indexOf("<" + name + ">");
		}
		if (index == -1) {
			return null;
		}
		var closingTag = "</" + name + ">";
		var index2 = str.indexOf(closingTag);
		return str.substring(index, index2 + closingTag.length);
	}
}

function isRockMelt() {
	return navigator.userAgent.match(/rockmelt/i);
}

function isLiteVersion() {
	return chrome.extension.getBackgroundPage().manifest.name.match(/lite/i);
}

function findEmailAddresses(str) {
	if (str) {
		return str.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
	}
}

function initUndefinedObject(obj) {
    if (typeof obj == "undefined") {
        return {};
    } else {
        return obj;
    }
}

function initUndefinedCallback(callback) {
    if (callback) {
        return callback;
    } else {
        return function() {};
    }
}

function getMessage(messageID, args, localeMessages) {
	// if localeMessage null because english is being used and we haven't loaded the localeMessage
	if (!localeMessages) {
		try {
			localeMessages = chrome.extension.getBackgroundPage().localeMessages;
		} catch (e) {
			// might be in content_script and localMessages not defined because it's in english
			return chrome.i18n.getMessage(messageID, args);
		}				
	}
	if (localeMessages) {
		var messageObj = localeMessages[messageID];	
		if (messageObj) { // found in this language
			var str = messageObj.message;
			
			// patch: replace escaped $$ to just $ (because chrome.i18n.getMessage did it automatically)
			if (str) {
				str = str.replace(/\$\$/g, "$");
			}
			
			if (args) {
				if (args instanceof Array) {
					for (var a=0; a<args.length; a++) {
						str = str.replace("$" + (a+1), args[a]);
					}
				} else {
					str = str.replace("$1", args);
				}
			}
			return str;
		} else { // default to default language
			return chrome.i18n.getMessage(messageID, args);
		}
	} else {
		return chrome.i18n.getMessage(messageID, args);
	}
}

function parseVersionString(str) {
    if (typeof(str) != 'string') { return false; }
    var x = str.split('.');
    // parse from string or default to 0 if can't parse
    var maj = parseInt(x[0]) || 0;
    var min = parseInt(x[1]) || 0;
    var pat = parseInt(x[2]) || 0;
    return {
        major: maj,
        minor: min,
        patch: pat
    }
}

async function initVersionCheck() {
	await polymerPromise;
    byId("version").textContent = `v.${chrome.runtime.getManifest().version}`;
    byId("version").addEventListener("click", () => {
        chrome.runtime.requestUpdateCheck((status, details) => {
            console.log("updatechec:", details)
            if (status == "no_update") {
                openGenericDialog({ title: "No update!", otherLabel: "More info" }).then(response => {
                    if (response == "other") {
                        location.href = "https://jasonsavard.com/wiki/Extension_Updates";
                    }
                })
            } else if (status == "throttled") {
                openGenericDialog({ title: "Thottled, try again later!" });
            } else {
                openGenericDialog({ title: "Response: " + status + " new version " + details.version });
            }
        });
    });
}

async function getChromeWindows() {
    const windows = await chrome.windows.getAll();
    // keep only normal windows and not app windows like debugger etc.
    return windows.filter(thisWindow => {
        return thisWindow.type == "normal";
    });
}

async function findTab(url) {
    try {
        const tabs = await chrome.tabs.query({ url: url + "*" });
        if (tabs.length) {
            const tab = tabs.last();
            console.log("force window found")
            await chrome.tabs.update(tab.id, { active: true });
            // must do this LAST when called from the popup window because if set focus to a window the popup loses focus and disappears and code execution stops
            await chrome.windows.update(tab.windowId, { focused: true });
            return { found: true, tab: tab };
        }
    } catch (error) {
        console.error("find tab error", error);
    }
}

//usage: openUrl(url, {urlToFind:""})
async function openUrl(url, params = {}) {
    if (!globalThis.inWidget && chrome.tabs) {
        const normalWindows = await getChromeWindows();
        if (normalWindows.length == 0) { // Chrome running in background
            const createWindowParams = { url: url };
            if (DetectClient.isChromium()) {
                createWindowParams.focused = true;
            }
            await chrome.windows.create(createWindowParams);
            return findTab(url);
        } else {
            let response;

            if (params.urlToFind) {
                response = await findTab(params.urlToFind);
            }

            if (response?.found) {
                // nothing
            } else {
                await createTabAndFocusWindow(url);
            }

            if (location.href.includes("source=toolbar") && DetectClient.isFirefox() && params.autoClose !== false) {
                globalThis.close();
            }
        }
    } else {
        top.location.href = url;
    }
}

async function createTabAndFocusWindow(url) {
    let windowId;

    if (DetectClient.isFirefox()) { // required for Firefox because when inside a popup the tabs.create would open a tab/url inside the popup but we want it to open inside main browser window 
        const thisWindow = await chrome.windows.getCurrent();
        if (thisWindow?.type == "popup") {
            const windows = await chrome.windows.getAll({ windowTypes: ["normal"] });
            if (windows.length) {
                windowId = windows[0].id;
            }
        }
    }

    const createParams = { url: url };
    if (windowId != undefined) {
        createParams.windowId = windowId;
    }
    const tab = await chrome.tabs.create(createParams);
    await chrome.windows.update(tab.windowId, { focused: true });
    return tab;
}