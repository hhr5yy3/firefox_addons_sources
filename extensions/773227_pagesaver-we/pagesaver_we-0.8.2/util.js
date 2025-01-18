/* Copyright (c) 2016-2022 Pearl Crescent, LLC.  All Rights Reserved. */
/* vim: set sw=2 sts=2 ts=8 et syntax=javascript: */

let PageSaverUtil = {
  mExtVersion: chrome.runtime.getManifest().version,
  mExtName: chrome.runtime.getManifest().name,

  get extVersion() {
    return this.mExtVersion;
  },

  get hasDownloadSaveAs() {
    // TODO: Chrome support.
    return this.browserVersion >= 52;
  },

  get browserVersion() {
    let version;
    try {
      version = /Firefox\/([0-9.]+)/.exec(navigator.userAgent)[1];
    } catch(e) {}
    if (!version) try {
        version = /Chrome\/([0-9.]+)/.exec(navigator.userAgent)[1];
    } catch(e) {}

    return version;
  },

  debugLog: function(aMsg) {
    // TODO: provide a way to disable error logging.
    console.info(this.mExtName + ": " + aMsg);
  },

  errorLog: function(aMsg) {
    console.error(this.mExtName + " error: " + aMsg);
  },

  localize: function(aDoc) {
    // See https://bugs.chromium.org/p/chromium/issues/detail?id=115800
    let _this = this;
    aDoc.addEventListener("DOMContentLoaded", function () {
      document.querySelectorAll("[i18n-msg]").forEach(aElem => {
        let subs = [];
        if (aElem.hasAttribute("i18n-msg-sub1"))
          subs.push(aElem.getAttribute("i18n-msg-sub1"));
        let s = _this.getLocalizedString(aElem.getAttribute("i18n-msg"), subs);
        let key = aElem.getAttribute("shortcut");
        let span;
        if (key) {
          let index = s.indexOf(key);
          if (index > 0) {
            span = document.createElement("span");
            span.appendChild(document.createTextNode(s.substr(0, index)));
            let underline = document.createElement("u");
            underline.appendChild(document.createTextNode(key));
            span.appendChild(underline);
            span.appendChild(document.createTextNode(s.substr(index + 1)));
          }
        }
        if (span)
          aElem.appendChild(span);
        else
          aElem.innerText = s;
      });
    });
  },

  getLocalizedString: function(aMsgName, aSubArray) {
    let isDebug = chrome.i18n.getUILanguage().startsWith("en_debug");
    let prefix = isDebug ? "\u25a0" : "";
    return prefix + chrome.i18n.getMessage(aMsgName, aSubArray);
  },

  // If aIsFile is true, aFileExt is used to determine length of extension.
  formatTextWithPattern: function(aFormat, aPageURL, aPageTitle,
                                  aIsFile, aUseVerySafeChars, aFileExt) {
    let _this = this;

    function intTo2Char(aNumber) {
      if (!aNumber)
        return "00";

      let s = String(aNumber);
      if (s.length < 2)
        s = '0' + s;

      return s;
    }

    /*
     * To avoid an ugly "filename must not contain illegal characters" error
     * when calling downloads.download(), this function needs to be at least
     * as aggressive as Firefox's DownloadPaths.sanitize() function, which
     * calls nsExternalHelperAppService::ValidateFilenameForSaving(), which
     * in turn calls nsExternalHelperAppService::SanitizeFileName().
     *
     * We requested a better API; see Mozilla bug #1780864.  As a workaround,
     * when we detect an "illegal characters" error we call
     * formatTextWithPattern() a second time and pass true for
     * aUseVerySafeChars.  This causes only a small subset of characters
     * to be used in the filename.
     */
    function sanitizeFileName(aName) {
      let fileName = null;
      if (aName && aName.length > 0) {
        // Replace forward slash, back slash, and colon with hyphen.
        fileName = aName.replace(/[\/\\:]/g, "-");

        // Replace non-breaking and other special spaces with regular spaces.
        fileName = fileName.replace(/\s/g, " ");

        if (aUseVerySafeChars) {
          // Only keep characters that are very common and safe:  we only
          // keep spaces, A-Z, a-z, 0-9, underscore, and hyphen characters.
          fileName = fileName.replace(/[^ \w\-]/g, "");
        } else {
          // Remove disallowed characters.
          fileName = fileName.replace(/[\*\?\"\<\>\|]+/g, "");
          // TODO: for Android, add (or consider other replacements):
          // fileName = fileName.replace(/[;,+=\[\]]+/g, "");

          // Remove invisible Unicode control characters such as \u200e.
          fileName = fileName.replace(/[\u200e\u200f\u202a-\u202e]/g, "");

          // Remove control characters.
          fileName = fileName.replace(/[\x00-\x1f\x7f-\x9f]+/g, ""); // gConvertToSpaceRegExp

        }

        // Replace runs of two or more whitespace characters with a space.
        fileName = fileName.replace(/\s{2,}/g, " ");

        // Trim leading and trailing:
        //   whitespace,
        //   periods
        //   and U+180E (Mongolian Vowel Separator) characters.
        fileName = fileName.replace(/^[\s\u180e.]+|[\s\u180e.]+$/g, "");

        // Limit file name length (Windows cannot handle really long names).
        let maxLen = 216; // TODO _this.GetPSIntPref(_this.K.kPrefFileNameMaxLen, 216);
        if (aFileExt)
          maxLen -= aFileExt.length;
        if (maxLen < 1)
          maxLen = 1;
        fileName = fileName.substring(0, maxLen);
      }

      // If nothing is left, use the default name ("Page Image" in English).
      if (!fileName || 0 == fileName.length)
        fileName = _this.getLocalizedString("suggestedFilePrefix");

      return fileName;
    } // sanitizeFileName()

    let result = "";
    let url = "";
    if (aPageURL) {
      url = aPageURL;
      if (aIsFile) {
        url = url.replace(/^[a-z]*:[\/]*/, "");   // remove leading scheme://
        url = url.replace(/\.[a-zA-Z]*$/, "");    // remove file name extension
        url = url.replace(/\/$/, "");             // remove trailing /
      }
    }

    try {
      let pageHost;
      let today = new Date();
      let len = aFormat.length;
      for (let i = 0; i < len; i++) {
        if (aFormat[i] != '%' || i + 1 == len)
          result += aFormat[i];
        else if (aFormat[i+1] == '%') {
          result += '%';
          ++i;
        } else {
          switch(aFormat[i+1]) {
            case 't':
              if (aPageTitle)
                result += aPageTitle;
              ++i;
              break;
            case 'h': // TODO: %h in strftime is a synonym for %b
              if (!pageHost && aPageURL) try
              {
                let urlObj = new URL(aPageURL);
                pageHost = urlObj.hostname;
              } catch (e) {console.log(e); }
              if (pageHost)
                result += pageHost;
              ++i;
              break;

              if (aPageHost)
                result += aPageHost;
              ++i;
              break;
            case 'u': result += url; ++i; break;
            case 'm': result += intTo2Char(1 + today.getMonth()); ++i; break;
            case 'd': result += intTo2Char(today.getDate()); ++i; break;
            case 'Y': result += today.getFullYear(); ++i; break;
            case 'y': result += today.getFullYear() % 100; ++i; break;
            case 'H': result += intTo2Char(today.getHours()); ++i; break;
            case 'M': result += intTo2Char(today.getMinutes()); ++i; break;
            case 'S': result += intTo2Char(today.getSeconds()); ++i; break;
            default:
              result += "%";
          }
        }
      }
    } catch(e) {}

    if (aIsFile)
      result = sanitizeFileName(result);

    return result;
  }, // formatTextWithPattern()

  playSound: function() {
    let audioObj = new Audio();
    audioObj.src = "media/cameraclick.wav";
    audioObj.play();     
  }
};
