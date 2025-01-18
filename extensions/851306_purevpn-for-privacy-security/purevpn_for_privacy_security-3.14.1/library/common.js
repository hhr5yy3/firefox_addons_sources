/*
*   PureVPN
*   by GZ systems Ltd.
*	Everyone is permitted to copy and distribute verbatim copies
*	of this document, but changing it is not allowed.
*
*	This program is distributed in the hope that it will be useful,
*	but WITHOUT ANY WARRANTY; without even the implied warranty of
*	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
*
*	copyright 2016 All Rights are Reserved.
*/

(function() {
  'use strict';
  var pVn = self.pVn = self.pVn || {};
  //! Blank function
  pVn.nofunc = function(callback, sParam) {
    if (callback && typeof callback === "function") {
      callback(sParam);
    }
  };
  //! Blank function with a callback function and check for chrome api error
  pVn.nofuncE = function(callback, sParam) {
    if (chrome.runtime.lastError) {
      /* no action */
    }
    if (callback && typeof callback === "function") {
      callback(sParam);
    }
  };
  //! get icon for region
  pVn.regionIcon = function(sRegionCode) {
    if (sRegionCode && sRegionCode !== "") {
      sRegionCode = sRegionCode.toLowerCase();
      return {
        19: PVN_FLAG_PATH + "19/" + sRegionCode + ".png",
        38: PVN_FLAG_PATH + "32/" + sRegionCode + ".png",
        64: PVN_FLAG_PATH + "64/" + sRegionCode + ".png"
      };
    }
    return {
      19: PVN_IMAGES.img19on,
      38: PVN_IMAGES.img38on
    };
  };
  //! get dom elements matched with attribute.
  pVn.getDom = function(sAttribute) {
    return document.querySelectorAll('[' + sAttribute + ']');
  };
  //! set the badge text to extension icon. params: tabId:required | badge:string:optional
  pVn.setBadgeText = function(iTabId, sBadge) {
    sBadge = sBadge.toString();
    if (sBadge === "0") {
      sBadge = "";
    }
    var options = {text: sBadge};
    if (iTabId) {
      options.tabId = iTabId;
    }
    chrome.browserAction.setBadgeText(options);
  };
  //! get the extension icon. params: region:string:optional
  pVn.getIcons = function(sRegionCode) {
    return pVn.regionIcon(sRegionCode);
  };
  //! set the ico. params: country icon:string:optional
  pVn.setIcons = function(sRegionCode, callback) {
    if (!callback || typeof callback !== "function") {
      callback = pVn.nofuncE;
    }
    var icon = {};
    // console.log("server key %s, sRegionCode %s", pVn.systemSettings.serverKey, sRegionCode)
    if (sRegionCode && pVn.systemSettings.serverKey === 'purposeCode') {
      icon.path = {
        19: PVN_IMAGES.img19channel,
        38: PVN_IMAGES.img38channel
      };
    } else {
      icon.path = pVn.getIcons(sRegionCode);
    }
    chrome.browserAction.setIcon(icon, callback);
  };
  //! set the icon params: channel base64 code
  pVn.setChannelIcon = function(sChannelIcon, callback) {
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    var image = new Image();
    image.onload = function() {
      ctx.drawImage(image, 0, 0, 32, 25);
      chrome.browserAction.setIcon({
        imageData: ctx.getImageData(0, 0, 32, 25)
      }, callback);
    };
    image.src = "data:image/png;base64," + sChannelIcon;
  };
  pVn.setIconBadge = function(iTabId, sBadge, sRegionCode) {
    var icon = {};
    if (iTabId) {
      icon.tabId = parseInt(iTabId, 10);
    }
    icon.path = pVn.getIcons(sRegionCode);
    var callback = function() {
      pVn.setBadgeText(iTabId, sBadge);
    };
    chrome.browserAction.setIcon(icon, pVn.nofuncE.apply(null, [callback]));
  };
  //! Convert snake_case string into camelCase
  pVn.toCamelCase = function(str) {
    return str
      .replace(/_(.)/g, function($1) {
        return $1.toUpperCase();
      })
      .replace(/_/g, '')
      .replace(/^(.)/, function($1) {
        return $1.toLowerCase();
      });
  };
  //! Convert camelCase into snake_case
  pVn.toSnakeCase = function(str) {
    var upperChars = str.match(/([A-Z])/g);
    if (upperChars) {
      for (var i = 0, n = upperChars.length; i < n; i++) {
        str = str.replace(new RegExp(upperChars[i]), '_' +
          upperChars[i].toLowerCase());
      }
      if (str.slice(0, 1) === '_') {
        str = str.slice(1);
      }
    }
    return str;
  };
  //! object to http url data
  pVn.encodeData = function(data, toSnakeCase) {
    return Object.keys(data).map(function(key) {
      var sKey = key;
      if (toSnakeCase === true) {
        sKey = pVn.toSnakeCase(sKey);
      }
      return [sKey, data[key]].map(encodeURIComponent).join("=");
    }).join("&");
  };

  //! object to http url data with out url encoding
  pVn.urlDataWithOutEncode = function(data, toSnakeCase) {
    return Object.keys(data).map(function(key) {
      var sKey = key;
      if (toSnakeCase === true) {
        sKey = pVn.toSnakeCase(sKey);
      }
      return [sKey, encodeURIComponent(data[key])].join("=");
    }).join("&");
  };

  //! create the date: params: interval[days]:optional | add:optional | curDate: object:optional
  pVn.makeDate = function(iInterval, bAdd, dCurrent) {
    if (iInterval) {
      if (!dCurrent || dCurrent === "") {
        dCurrent = new Date(Date.now());
      }
      return (bAdd === true) ?
        dCurrent.setDate(dCurrent.getDate() - iInterval) / 1000 | 0 :
        dCurrent.setDate(dCurrent.getDate() + iInterval) / 1000 | 0;
    }
    return Date.now() / 1000 | 0;
  };
  //! create timestamp for given seconds. params: seconds:required
  pVn.makeTime = function(iSeconds) {
    var minutes = Math.floor(iSeconds / 60);
    var date = new Date(Date.now());
    return new Date(date.getTime() + minutes * 60000) / 1000 | 0;
  };
  //! it will add hours in current time and return time stamp
  pVn.addHoursInCurrentTime = function(hours) {
    var t = new Date();
    var timeStampAfterHours = Math.round(t.setHours(t.getHours() +
parseInt(
  hours, 10)
    ) / 1000);
    return timeStampAfterHours;
  };
  //! convert hours into miliseconds
  pVn.createMilisByHours = function(hours) {
    var minutes = parseInt(hours, 10) * 60;
    var millis = minutes * 60 * 1000;
    return millis;
  };
  //! get current date
  pVn.currentDate = function(separator) {
    var dd = new Date();
    var currentDate = (dd.getMonth() + 1) +
      separator + dd.getDate() + separator +
    dd.getFullYear();
    return currentDate;
  };
  //! get the difference between two dates. params: dateUnix1:timestamp:required | dateUnix2:timestamp:optional
  pVn.timeDiff = function(dUnix1, dUnix2) {
    if (!dUnix2 || dUnix2 === "") {
      dUnix2 = pVn.makeDate();
    }
    var d1 = new Date(dUnix1 * 1000);
    var d2 = new Date(dUnix2 * 1000);
    var diffMs = (d1 - d2);
    var diffDays = Math.round(diffMs / 86400000);
    var diffHrs = Math.round((diffMs % 86400000) / 3600000);
    var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
    var diffSecs = Math.floor(diffMins * 60);
    return {
      day: diffDays,
      hours: diffHrs,
      minutes: diffMins,
      seconds: diffSecs,
      miliseconds: diffMs};
  };
  //! math match
  pVn.isEqual = function(sParam1, sParam2) {
    return sParam1 === sParam2;
  };
  //! Exact clone of an object.
  pVn.obClone = function(oParam) {
    if (oParam === null || typeof oParam !== "object") {
      return oParam;
    }

    var copy = oParam.constructor();
    for (var attr in oParam) {
      if (oParam.hasOwnProperty(attr)) copy[attr] = oParam[attr];
    }
    return copy;
  };
  //! Determines whether an object is empty
  pVn.isEmpty = function(oParam) {
    // null and undefined are "empty"
    if (oParam === null) return true;
    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (oParam.length > 0) return false;
    if (oParam.length === 0) return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (var sKey in oParam) {
      if (hasOwnProperty.call(oParam, sKey)) return false;
    }

    return true;
  };
  //! get the microtime
  //! calculate script run time
  pVn.microtime = function(bIsFloat) {
    var unixtimeMs = (new Date()).getTime();
    var sec = Math.floor(unixtimeMs / 1000);
    return bIsFloat ? (unixtimeMs - (sec * 1000)) / 1000 + ' ' + sec : sec;
  };
  //! convert timestamp
  pVn.timestampToTime = function(dUnix, bTimeOnly) {
    if (typeof bTimeOnly === "undefined") {
      bTimeOnly = true;
    }
    var date = new Date(dUnix * 1000);
    // Hours part from the timestamp
    var hours = date.getHours();
    // Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    var seconds = "0" + date.getSeconds();

    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();

    return (bTimeOnly === false) ?
      year + "/" + month + "/" + day : hours + ':' +
      minutes.substr(-2) + ':' + seconds.substr(-2);
  };
  pVn.userNameBase64 = function() {
    var usernameParsed =
        CryptoJS.enc.Utf8.parse(pVn.systemSettings.user_name);
    return CryptoJS.enc.Base64.stringify(usernameParsed);
  };
  pVn.appData = function() {
    var browserDetails = RE_BROWSER_INFO.exec(navigator.userAgent);
    return {
      platformName: browserDetails[1],
      platformVersion: browserDetails[2],
      platformLocale: navigator.language,
      appVersion: pVn.manifest.version,
      user_os: (!(pVn.systemSettings.user_os) === false) ?
        pVn.systemSettings.user_os : "Not Available",
      id: pVn.systemSettings.user_id ||
       pVn.clientUserId || pVn.gaId || chrome.runtime.id,
      uuid: pVn.systemSettings.proxy_user_unique_id,
      usid: pVn.systemSettings.session_id,
      email: pVn.systemSettings.user_email,
      domain_fronting: pVn.systemSettings.use_cloudfront_domain
    };
  };
  //! get the unique value of array [not object] in array 1 and returns new array
  pVn.arrUnique = function(aParam1, aParam2) {
    return aParam1.filter(function(oParam) {
      return aParam2.indexOf(oParam) === -1;
    });
  };
  pVn.checkUrlQueryString = function(sUrl) {
    var result = sUrl.indexOf("?");
    return result !== -1;
  };
  pVn.createUrlWithQueryString = function(sUrl, oParams) {
    var paramExists = pVn.checkUrlQueryString(sUrl);
    var paramsToAdd = pVn.urlDataWithOutEncode(oParams);
    if (paramExists) {
      return sUrl + "&" + paramsToAdd;
    }
    return sUrl + "?" + paramsToAdd;
  };

  pVn.dateTwoDigits = function(d) {
    if (d >= 0 && d < 10) return "0" + d.toString();
    if (d > -10 && d < 0) return "-0" + (-1 * d).toString();
    return d.toString();
  };

  Date.prototype.toMysqlFormat = function() {
    return this.getUTCFullYear() + "-" +
      pVn.dateTwoDigits(1 + this.getUTCMonth()) + "-" +
      pVn.dateTwoDigits(this.getUTCDate()) + " " +
      pVn.dateTwoDigits(this.getUTCHours()) + ":" +
      pVn.dateTwoDigits(this.getUTCMinutes()) + ":" +
      pVn.dateTwoDigits(this.getUTCSeconds()
      );
  };
  pVn.getIsoCodeByCityCode = function(sCityCode) {
    for (var i = 0; i < pVn.systemSettings.cities.length; i++) {
      if (pVn.systemSettings.cities[i].code === sCityCode) {
        return {iso: pVn.systemSettings.cities[i].iso_code,
          name: pVn.systemSettings.cities[i].name};
      }
    }
    return {iso: '', name: 'United States'};
  };

  pVn.getCityNameByCityCode = function(sCityCode) {
    for (var i = 0; i < pVn.systemSettings.cities.length; i++) {
      if (pVn.systemSettings.cities[i].code === sCityCode) {
        return pVn.systemSettings.cities[i].name;
      }
    }
    return 'City';
  };

  // Get difference of weeks from two dates
  pVn.getWeeksBetweenTimestamps = function(date1, date2) {
    // The number of milliseconds in one week
    let ONE_WEEK = 1000 * 60 * 60 * 24 * 7;
    // Convert both dates to milliseconds
    let date1MS = date1.getTime();
    let date2MS = date2.getTime();
    // Calculate the difference in milliseconds
    let differenceMS = Math.abs(date1MS - date2MS);
    // Convert back to weeks and return hole weeks
    return Math.floor(differenceMS / ONE_WEEK);
  };
  pVn.getDesireOutcomePromptTypeAndSessionType =
    function(options, extraData = {}) {
      // console.log("Options For Events:", options);
      let response = {};
      response.eventPropSessionType = "none";
      response.eventPropPromptType = "none";
      response.countryName = "none";
      response.connectVia = "none";
      response.rating = "none";

      if (!options.current_session.desiredOutcomeMessageProvided) {
        if (options.desired_outcome.global === false) {
          response.eventPropSessionType = "DO";
        }
      }
      if (!options.current_session.sessionRatingMessageProvided) {
        if (options.desired_outcome.global !== false) {
          response.eventPropSessionType = "rating";
        }
      } else if (response.eventPropSessionType === "none" &&
        options.desired_outcome.global !== false) {
        response.eventPropSessionType = "rating";
      }
      if (extraData.hasOwnProperty('disconnectedStarted')) {
        if (extraData.disconnectedStarted) {
          response.eventPropPromptType = "in-session";
        } else {
          response.eventPropPromptType = "popup";
        }
      } else if (options.current_session.disconnectedStarted) {
        response.eventPropPromptType = "in-session";
      } else {
        response.eventPropPromptType = "popup";
      }
      if (extraData.hasOwnProperty('rating')) {
        response.rating = (extraData.rating) ? "Good" : "Bad";
      }
      if (options.hasOwnProperty('countryName')) {
        response.countryName = options.countryName;
      }
      if (options.hasOwnProperty('countryCode')) {
        response.countryCode = options.countryCode;
      }
      // Set ConnectedVia prop
      if (options.serverKey === 'cityServerCode') {
        response.connectVia = 'Server';
      } else if (options.serverKey === 'cityCode') {
        response.connectVia = 'City';
      } else if (options.serverKey === 'countryCode') {
        response.connectVia = 'Country';
      } else if (options.serverKey === 'purposeCode') {
        response.connectVia = 'Channel';
      }
      return response;
    };
})();
