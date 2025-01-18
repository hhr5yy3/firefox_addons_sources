(function() {
  // BEGIN src/config.coffee
  var $empty, $toFragment, ALL_SITES, ActivePages, ActiveRequests, AnyplaySettings, ArchiveOrgSettings, AuthenticationUI, BindingFilterSetting, BookmateSettings, BooleanTransformer, BrowserConnection, CommonBrowser, Configuration, ConfigurationProxy, ConfigurationSetting, ConfigurationUI, Connection, CounterFactory, EverandSettings, GoodReadsListSetting, HooplaSettings, KoboPlusSettings, LOG_LEVELS, LOG_LEVEL_TEXT, LibbySetting, LibraryLinkSetting, LibraryManager, LibroFMSettings, LocalStorageShim, Logger, MultipleResultsSetting, NLSBardSettings, SearchModeSetting, SettingsModules, ShowBindingIconSetting, SiteManager, WHITESPACE, _parser, anyBeginsWith, api, authorArtistRegEx, browserFetch, byRegEx, cleanArray, cleanArrayGenerator, cleanupPermissionUrl, commonBindingMappings, compareComponents, compareSortedComponents, compareText, configurationModules, createOptions, digitsOnly, elementGenerator, extRoot, findAllMatchingNodes, findFirstMatchingNode, friendlyTime, fromHTML, fromHTMLTemplate, fromTemplate, getMetaByProperty, hashToList, illustratorRegEx, initialize, isBinding, isUnitTestMode, logger, nodeListToArray, nodeToText, noop_fn, normalizeAuthor, normalizeAuthorPrefix_re, normalizeTitle, normalizeTitlePrefix_re, parseAuthorAndTitleBySlash, parseAuthorAndTitleFromOGMeta, parseBoolean, parseToFragment, permissionContains, permissionRemove, permissionRequest, pluck, pluralize, publishedRegEx, remove_paren_re, replacementChars, safeChars_re, sanitizeTitle, setutils, singularize, specialCatalog, splitAndNormalizeTitle, templateFilters, textFromElement, toQueryString, txtLower, uniqueArray, unitTestable, urlutils, validateISBN, validateISBN13,
    indexOf = [].indexOf;

  /*
  Library Extension
  Copyright (c) 2025 Quotidian LLC
  This software is provided as is, with no warranties implied.
  */
  // BEGIN src/common_init.coffee
  if (typeof unitTestMode !== 'undefined') {
    isUnitTestMode = true;
    unitTestable = function(t, name) {
      return window[name || t.name] = t;
    };
  } else {
    isUnitTestMode = false;
    unitTestable = function(_t, _name) {};
  }

  // END src/common_init.coffee

  // BEGIN src/browser/firefox/extension.coffee

  // BEGIN src/browser/firefox/extension_api.coffee

  // BEGIN src/browser/native_fetch.coffee
  browserFetch = function(_libraryInfo, url, params, statusCodeCallback, timeout) {
    var resolveable;
    resolveable = true;
    return new Promise(function(resolve, reject) {
      var rejectForTimeout, timeoutId;
      rejectForTimeout = function() {
        if (resolveable) {
          resolveable = false;
          return reject("timeout");
        }
      };
      timeoutId = setTimeout(rejectForTimeout, timeout);
      return fetch(url, params).then(function(resp) {
        var it, ref, responseHeaders, result;
        if ((ref = resp.status) === 301 || ref === 302) { // Will this every really resolve now?
          return;
        }
        responseHeaders = {};
        it = resp.headers.entries();
        result = it.next();
        while (!result.done) {
          responseHeaders[result.value[0]] = result.value[1];
          result = it.next();
        }
        if (!statusCodeCallback(resp.status, responseHeaders) || !resp.ok) {
          if (resolveable) {
            resolveable = false;
            clearTimeout(timeoutId);
            reject("status_code");
            return;
          }
        }
        return resp.text().then(function(body) {
          var rv;
          rv = {
            body: body,
            url: resp.url,
            status: resp.status,
            redirected: resp.redirected,
            headers: responseHeaders
          };
          if (resolveable) {
            clearTimeout(timeoutId);
            return resolve(rv);
          }
        });
      }, function(data) {
        resolveable = false;
        return reject("failed_request");
      });
    });
  };

  // END src/browser/native_fetch.coffee
  api = new Proxy(browser, {
    runtime: {
      getURL: function() {}
    }
  });

  permissionRequest = function(origins) {
    return api.permissions.request(origins);
  };

  permissionRemove = function(origins) {
    return api.permissions.remove(origins);
  };

  permissionContains = function(origins) {
    return api.permissions.contains(origins);
  };

  // END src/browser/firefox/extension_api.coffee
  extRoot = api.runtime.getURL("");

  BrowserConnection = function() {
    return api;
  };

  // BEGIN src/extension.coffee

  // BEGIN src/utilities/utilities.coffee
  LOG_LEVELS = {
    DEBUG: 0,
    INFO: 1,
    WARNING: 2,
    ERROR: 3,
    SILENT: 4
  };

  LOG_LEVEL_TEXT = ["DEBUG  ", "INFO   ", "WARNING", "ERROR  ", "SILENT "];

  Logger = class Logger {
    constructor() {
      this.exception = this.exception.bind(this);
      this.debug = this.debug.bind(this);
      this.info = this.info.bind(this);
      this.warn = this.warn.bind(this);
      this.error = this.error.bind(this);
      this.dir = this.dir.bind(this);
      this.setLevel = this.setLevel.bind(this);
      this.level = LOG_LEVELS.SILENT;
    }

    write(level, msg) {
      var ex, levelText, now, nowText, pad;
      if (this.level === LOG_LEVELS.SILENT) {
        return;
      }
      now = "UNKNOWN";
      levelText = LOG_LEVEL_TEXT[level];
      pad = function(v) {
        if (v < 10) {
          return "0" + v;
        }
        return "" + v;
      };
      now = new Date();
      nowText = pad(now.getFullYear()) + "/" + pad(now.getMonth() + 1) + "/" + pad(now.getDate()) + " " + pad(now.getHours()) + ":" + pad(now.getMinutes()) + ":" + pad(now.getSeconds());
      try {
        if (typeof msg !== "string") {
          msg = JSON.stringify(msg);
        }
        return console.log(`${nowText} | ${levelText} | ${msg}`);
      } catch (error) {
        ex = error;
        return console.log(`${nowText} | ${levelText} | Failed to properly convert logging statement ` + ex.toString());
      }
    }

    exception(msg, exc) {
      if (this.level <= LOG_LEVELS.ERROR) {
        this.write(LOG_LEVELS.ERROR, msg + ": " + JSON.stringify(exc));
        return this.write(LOG_LEVELS.ERROR, exc.stack);
      }
    }

    debug(msg) {
      if (this.level <= LOG_LEVELS.DEBUG) {
        return this.write(LOG_LEVELS.DEBUG, msg);
      }
    }

    info(msg) {
      if (this.level <= LOG_LEVELS.INFO) {
        return this.write(LOG_LEVELS.INFO, msg);
      }
    }

    warn(msg) {
      if (this.level <= LOG_LEVELS.WARNING) {
        return this.write(LOG_LEVELS.WARNING, msg);
      }
    }

    error(msg) {
      if (this.level <= LOG_LEVELS.ERROR) {
        return this.write(LOG_LEVELS.ERROR, msg);
      }
    }

    dir(obj) {
      if (this.level <= LOG_LEVELS.DEBUG) {
        return console.dir(obj);
      }
    }

    setLevel(level) {
      var old_level;
      if (level === this.level) {
        return;
      }
      old_level = LOG_LEVEL_TEXT[this.level];
      this.write(LOG_LEVELS.INFO, `Changing logging level from ${old_level} to ${LOG_LEVEL_TEXT[level]}`);
      return this.level = level;
    }

  };

  logger = new Logger();

  digitsOnly = function(txt) {
    if (txt != null) {
      return txt.replace(/[^0-9X]/g, "");
    }
    return "";
  };

  validateISBN = function(isbn) {
    var checkdigit, digits, maxlength, num, value;
    if ((typeof isbn) !== "string") {
      return false;
    }
    maxlength = 10;
    isbn = digitsOnly(isbn);
    if (isbn.length !== 10) {
      return false;
    }
    digits = (function() {
      var k, ref, results;
      results = [];
      for (num = k = 0, ref = maxlength - 2; (0 <= ref ? k <= ref : k >= ref); num = 0 <= ref ? ++k : --k) {
        results.push(parseInt(isbn[num]) * (maxlength - num));
      }
      return results;
    })();
    value = 0;
    num = digits.length;
    while (num > 0) {
      num -= 1;
      value += digits[num];
    }
    if (isbn[maxlength - 1] === "X") {
      checkdigit = 10;
    } else {
      checkdigit = parseInt(isbn[9]);
    }
    return ((value + checkdigit) % 11) === 0;
  };

  validateISBN13 = function(isbn) {
    var checkdigit, even_digits, k, l, len, len1, maxlength, num, odd_digits, v, value;
    if ((typeof isbn) !== "string") {
      return false;
    }
    maxlength = 13;
    isbn = digitsOnly(isbn);
    if (isbn.length !== maxlength) {
      return false;
    }
    even_digits = (function() {
      var k, ref, results;
      results = [];
      for (num = k = 0, ref = maxlength - 2; k <= ref; num = k += 2) {
        results.push(parseInt(isbn[num]));
      }
      return results;
    })();
    odd_digits = (function() {
      var k, ref, results;
      results = [];
      for (num = k = 1, ref = maxlength - 2; k <= ref; num = k += 2) {
        results.push(parseInt(isbn[num]) * 3);
      }
      return results;
    })();
    value = 0;
    for (k = 0, len = even_digits.length; k < len; k++) {
      v = even_digits[k];
      value += v;
    }
    for (l = 0, len1 = odd_digits.length; l < len1; l++) {
      v = odd_digits[l];
      value += v;
    }
    if (isbn[maxlength - 1] === "X") {
      checkdigit = 10;
    } else {
      checkdigit = parseInt(isbn[maxlength - 1]);
    }
    return (value + checkdigit) % 10 === 0;
  };

  urlutils = {
    name: "urlutils",
    concat: function() {
      var last, parts;
      parts = Array.from(arguments).map(function(x) {
        return x.replace(/^\//g, "").replace(/\/$/g, "");
      }).filter(function(x) {
        return x.length > 0;
      });
      last = arguments[arguments.length - 1];
      if (last.endsWith("/") && last.length > 0) {
        parts[parts.length - 1] = parts[parts.length - 1] + "/";
      }
      return parts.join("/");
    },
    formencode: function(v) {
      return encodeURIComponent(v).replace(/%20/g, '+');
    }
  };

  cleanArrayGenerator = function() {
    var invalidCharacters, validCharacters, wordsToRemove;
    validCharacters = /[a-zA-Z0-9]/;
    invalidCharacters = /[^a-zA-Z0-9]/g;
    wordsToRemove = new Set(["a", "the", "and"]);
    return function(arr) {
      return arr.reduce(function(acc, el) {
        return acc.concat(sanitizeTitle(el).split(" "));
      }, []).reduce(function(acc, el) {
        var term;
        if (validCharacters.test(el)) {
          term = el.replace(invalidCharacters, "");
          if (term.length > 0 && !wordsToRemove.has(term)) {
            acc.push(term);
          }
        }
        return acc;
      }, []);
    };
  };

  cleanArray = cleanArrayGenerator();

  uniqueArray = function(arr) {
    return Array.from((new Set(arr)).values());
  };

  compareSortedComponents = function(arrayA, arrayB) {
    var localA, localB, matches, max_matches, tmp;
    localA = uniqueArray(arrayA);
    localB = uniqueArray(arrayB);
    localA.sort();
    localB.sort();
    matches = 0;
    max_matches = Math.max(localA.length, localB.length);
    while (localA.length > 0 && localB.length > 0) {
      if (localA.length > localB.length) {
        tmp = localA;
        localA = localB;
        localB = tmp;
      }
      if (localA[0] < localB[0]) {
        localA.shift();
        continue;
      }
      if (localA[0] === localB[0]) {
        matches += 1;
        localA.shift();
      }
      localB.shift();
    }
    return matches / max_matches;
  };

  compareComponents = function(arrayA, arrayB) {
    var elemA, k, len, localA, localB, matches, position, tmp;
    localA = arrayA.slice(0);
    localB = arrayB.slice(0);
    if (localA.length > localB.length) {
      tmp = localA;
      localA = localB;
      localB = tmp;
    }
    position = 0;
    matches = 0;
    for (k = 0, len = localA.length; k < len; k++) {
      elemA = localA[k];
      if (position < localB.length && elemA === localB[position]) {
        matches += 1;
      }
      position += 1;
    }
    if (position > 0) {
      return matches / position;
    } else {
      return 0;
    }
  };

  normalizeTitlePrefix_re = /^(?:click\s*)?(?:title:?[\s\.]*)(?:\[?click on title for detail\]?\s*)?(?:&#160;)?(.*)/;

  normalizeTitle = function(origTitle) {
    var firstBadChar;
    if (origTitle === null || origTitle === void 0 || origTitle.length === 0) {
      return origTitle;
    }
    origTitle = origTitle.toLowerCase().trim();
    origTitle = origTitle.replace("a novel", "");
    origTitle = origTitle.replace(/[,]/g, "");
    origTitle = origTitle.replace(/^\[(.*)\](.*)/g, "$1$2");
    origTitle = origTitle.replace(/[\-:!\s]+/g, " ");
    origTitle = origTitle.replace(/\.\.\.?/g, " ");
    origTitle = origTitle.replace(normalizeTitlePrefix_re, "$1");
    origTitle = origTitle.replace(/^\((.*)\)(.*)/, "$1$2");
    origTitle = origTitle.replace(/^(.+)\(.*\)/, "$1");
    origTitle = origTitle.replace(/[Pp]art\s+\d+/g, "");
    origTitle = origTitle.replace(/kindle edition.*/, "");
    origTitle = origTitle.replace(/( an)? ebook$/, "");
    firstBadChar = -1;
    if (/\s+\/\s*/.exec(origTitle)) {
      firstBadChar = origTitle.indexOf("/");
    }
    if (firstBadChar < 0) {
      firstBadChar = origTitle.indexOf("|");
    }
    if (firstBadChar < 0) {
      firstBadChar = origTitle.indexOf("\n");
    }
    if (firstBadChar >= 0) {
      origTitle = origTitle.substr(0, firstBadChar);
    }
    return origTitle.trim();
  };

  safeChars_re = /([A-Za-z0-9\.\' \-]+)/;

  replacementChars = {
    "\u2013": {
      value: " ",
      description: "En dash - replace with space"
    },
    "\u2014": {
      value: " ",
      description: "Em dash - replace with space"
    },
    "\u2019": {
      value: "'",
      description: "Apostrophe"
    }
  };

  sanitizeTitle = function(val) {
    var res;
    res = [];
    res = val.split("").reduce(function(acc, s) {
      if (safeChars_re.exec(s)) {
        acc.push(s);
      } else if (replacementChars[s]) {
        acc.push(replacementChars[s].value);
      }
      return acc;
    }, []);
    res = res.join("");
    res = res.replace(/\W+-\W*/, " ");
    return res.trim();
  };

  splitAndNormalizeTitle = function(txt) {
    var components, parens, res, subtitle, title, vol;
    if (!txt) {
      return null;
    }
    components = txt.toLowerCase().split(/--/, 2);
    if (components.length === 1) {
      components = txt.toLowerCase().split(/[!:;\[](.*)/, 2);
    }
    title = components[0];
    subtitle = "";
    if (components.length > 1) {
      subtitle = components[1];
    } else {
      vol = /vol(ume)? \d+/.exec(title);
      if (vol) {
        subtitle = title.substr(vol.index);
        title = title.substr(0, vol.index);
      }
      vol = /livro [ixv]+/.exec(title);
      if (vol) {
        subtitle = title.substr(vol.index);
        title = title.substr(0, vol.index);
      }
    }
    parens = /(.+?)\((.+)\)/.exec(title);
    if (parens) {
      title = parens[1];
      subtitle = ((parens.length > 1 && parens[2]) || "") + subtitle;
    }
    res = {
      title: normalizeTitle(title),
      subtitle: normalizeTitle(subtitle)
    };
    return res;
  };

  remove_paren_re = RegExp("[(].*?[)]");

  byRegEx = /(?:.*\b(?:by|par)\W*)?(.*)/i;

  publishedRegEx = /^published.*/i;

  authorArtistRegEx = RegExp("[\s\(]*[Aa](uthor|rtist)[\.\s\)]?");

  illustratorRegEx = RegExp("[\s\(]*[Ii]llustrator[\.\s\)]?");

  normalizeAuthorPrefix_re = /^(?:[Aa]uthor\(?s?\)?:?[\s\.]*)(?:&#160;)?(.*)/;

  normalizeAuthor = function(origAuthor) {
    var author, cleanNames, k, len, line, lines, name, names, oldline, removeBy, removePublished, resultLines;
    if (origAuthor === null || origAuthor === void 0) {
      return origAuthor;
    }
    lines = origAuthor.trim().split("\n");
    resultLines = [];
    for (k = 0, len = lines.length; k < len; k++) {
      line = lines[k];
      line = line.trim();
      line = line.replace(normalizeAuthorPrefix_re, "$1");
      line = line.replace("et al", "");
      removeBy = byRegEx.exec(line);
      line = removeBy[1];
      removePublished = publishedRegEx.exec(line);
      if (removePublished) {
        line = "";
      }
      line = line.replace(authorArtistRegEx, "");
      line = line.replace(illustratorRegEx, "");
      if (line === "") {
        continue;
      }
      if (line.indexOf(",") > 0) {
        names = line.split(",");
        cleanNames = [];
        while (names.length > 0) {
          name = names.pop().trim();
          if (name.length === 0) {
            continue;
          }
          if (/[0-9]+\-[0-9]*/.test(name)) {
            continue;
          }
          cleanNames.push(name);
        }
        line = cleanNames.join(" ");
      }
      oldline = null;
      while (line !== oldline) {
        oldline = line;
        line = line.replace(remove_paren_re, "");
      }
      line = line.replace(/\./g, " ");
      names = line.toLowerCase().split(" ");
      cleanNames = [];
      while (names.length > 0) {
        name = names.pop().trim();
        if (/\-/.test(name)) {
          names = names.concat(name.split("-"));
          continue;
        }
        if (name.length > 1) {
          cleanNames.push(name);
        }
      }
      cleanNames = cleanArray(cleanNames);
      cleanNames.sort();
      line = cleanNames.join(" ");
      resultLines.push(line);
    }
    author = resultLines.join(" ");
    return author.trim();
  };

  hashToList = function(x = {}) {
    var rv;
    rv = Object.keys(x).map(function(el) {
      return el.trim();
    });
    rv.sort();
    return rv;
  };

  anyBeginsWith = function(arr, text, exclusions) {
    var i, j, k, l, len, len1;
    text = text || "";
    text = text.toLowerCase();
    for (k = 0, len = arr.length; k < len; k++) {
      i = arr[k];
      if (text.indexOf(i.toLowerCase()) === 0) { // > -1
        if (exclusions != null) {
          for (l = 0, len1 = exclusions.length; l < len1; l++) {
            j = exclusions[l];
            if (text.indexOf(j.toLowerCase()) > -1) {
              return false;
            }
          }
        }
        return true;
      }
    }
    return false;
  };

  toQueryString = function(params) {
    return (new URLSearchParams(params)).toString();
  };

  WHITESPACE = new RegExp(" ", "g");

  compareText = function(text1, text2) {
    if (typeof text1 !== "string" || typeof text2 !== "string") {
      return -1;
    }
    return text1.replace(WHITESPACE, "").toLowerCase().indexOf(text2.replace(WHITESPACE, "").toLowerCase());
  };

  nodeListToArray = function(entries) {
    if (entries === null) {
      return null;
    }
    if (entries instanceof NodeList) {
      entries = Array.from(entries);
    }
    if (!(entries instanceof Array)) {
      entries = [entries];
    }
    return entries;
  };

  friendlyTime = function(time) {
    var elapsed, now;
    now = Date.now() / 1000;
    elapsed = now - (time / 1000);
    if (elapsed < 0) {
      elapsed = elapsed * -1;
      if (elapsed < 10) {
        return "in a few seconds";
      } else if (elapsed < 60) {
        return "in less than a minute";
      } else if (elapsed < 600) {
        return "within a few minutes";
      } else if (elapsed < 3600) {
        return "within the next hour";
      } else if (elapsed < 24 * 3600) {
        return "within the next " + parseInt(elapsed / 3600) + " hours";
      }
      return "within a few days";
    }
    if (elapsed < 10) {
      return "a few seconds ago";
    } else if (elapsed < 60) {
      return "less than a minute ago";
    } else if (elapsed < 600) {
      return "a few minutes ago";
    } else if (elapsed < 3600) {
      return "less than an hour ago";
    } else if (elapsed < 7200) {
      return "within the last hour";
    } else if (elapsed < 24 * 3600) {
      return "within the last " + parseInt(elapsed / 3600) + " hours";
    }
    return "about " + parseInt(elapsed / (24 * 3600)) + " days ago";
  };

  findAllMatchingNodes = function(root, selectors) {
    var matches;
    if (!Array.isArray(selectors)) {
      selectors = [selectors];
    }
    matches = [];
    selectors.forEach(function(selector) {
      var contains, discriminator, elements, re, supportedKeyword, val, walker;
      discriminator = null;
      if (selector.indexOf(":") >= 0) {
        val = /(.*?):(.*)/.exec(selector);
        discriminator = val[0];
        selector = val[1];
      }
      elements = [];
      if (selector.length > 0) {
        elements = Array.from(root.querySelectorAll(selector));
      } else {
        walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT);
        while (walker.nextNode()) {
          elements.push(walker.currentNode);
        }
      }
      if (discriminator) {
        supportedKeyword = false;
        contains = /contains\('?(.+?)'?\)/.exec(discriminator);
        if (contains) {
          re = RegExp(contains[1]);
          elements = elements.filter(function(el) {
            return el.innerText && re.exec(el.innerText);
          });
          supportedKeyword = true;
        }
        if (!supportedKeyword) {
          throw Error("Unsupported keyword in selector: " + discriminator);
        }
      }
      return matches = matches.concat(elements);
    });
    return matches;
  };

  findFirstMatchingNode = function(root, selectors) {
    var rv;
    rv = findAllMatchingNodes(root, selectors);
    if (rv.length > 0) {
      return rv[0];
    }
    return null;
  };

  parseBoolean = function(bool) {
    return bool === "true";
  };

  cleanupPermissionUrl = function(urls) {
    if (!Array.isArray(urls)) {
      urls = [urls];
    }
    return urls.reduce(function(acc, el) {
      if (!el.endsWith("/*")) {
        el = el + "/*";
      }
      acc.push(el);
      return acc;
    }, []);
  };

  templateFilters = {
    encodeuri: encodeURIComponent,
    encodeuriplus: function(v) {
      return encodeURIComponent(v).replace(/%20/g, "+");
    },
    encodeform: urlutils.formencode,
    rtrimslash: function(v) {
      if (v.endsWith("/")) {
        v = v.substring(0, v.length - 1);
      }
      return v;
    }
  };

  fromTemplate = function(content, filters) {
    filters = Object.assign(filters || {}, templateFilters);
    return function(args) {
      var r;
      r = /(.*?)<%=\s*(\S*?)\s*%>/mg;
      return content.split("\n").map(function(line) {
        var el, idx, key, lastIdx, t;
        t = "";
        lastIdx = 0;
        while ((el = r.exec(line))) {
          lastIdx = r.lastIndex;
          t += el[1];
          key = el[2];
          t += key.split("|").reduce(function(acc, v) {
            var rv;
            if (typeof filters[v] === "function") {
              return filters[v](acc);
            }
            rv = v.split(".").reduce(function(vacc, vel) {
              return vacc && vacc[vel];
            }, args);
            if (rv !== void 0) {
              if (typeof rv === 'object') {
                return JSON.stringify(rv);
              }
              return rv;
            }
            return acc;
          }, '');
        }
        idx = lastIdx;
        t += line.substr(idx);
        return t;
      }).join("\n");
    };
  };

  txtLower = function(el) {
    if (el) {
      return el.toLowerCase().trim();
    }
    return el;
  };

  isBinding = function(val) {
    return commonBindingMappings(val, null) !== null;
  };

  singularize = function(v) {
    if (v.endsWith('s')) {
      v = v.substring(0, v.length - 1);
    }
    return v;
  };

  commonBindingMappings = function(val, def_value = "unknown") {
    var mappings, v;
    mappings = {
      "audio": "audiobook",
      "audiobook on cd": "audiobook on cd",
      "article": "article",
      "blu-ray disc": "blu-ray",
      "blu-ray + dvd": "blu-ray",
      "[book]": "book",
      "book": "book",
      "bk": "book",
      "braille": "braille",
      "cd": "cd",
      "cd-rom": "cdrom",
      "cdrom": "cdrom",
      "clebook": "ebook", // Koha: Cloud Library Ebook
      "odebook": "ebook", // Koha: Overdrive Ebook
      "dvd": "dvd",
      "dvd and vhs": "dvd",
      "blu-ray": "blu-ray",
      "eaudiobook": "audiobook",
      "ebook": "ebook",
      "download": "ebook",
      "electronic resource": "ebook",
      "paperback": "book",
      "hardback": "book",
      "hard cover": "book",
      "large print": "book",
      "language material": "book",
      "giant print": "book",
      "regular print": "book",
      "playaway": "audiobook",
      "mp 3 cd": "cd",
      "mp3": "audiobook",
      "mp3 disk": "audiobook",
      "audiobook": "audiobook",
      "magazine": "magazine",
      "moving picture": "video",
      "moving image": "video",
      "printed matl": "book", // encore
      "print matl": "book",
      "print material": "book",
      "printed material": "book",
      "fiction": "book",
      "print": "book",
      "non fiction": "book",
      "adult non-fiction book": "book",
      "teen book": "book",
      "[dvd]": "dvd",
      "[electronic resource]": "ebook",
      "electronic resource (audiobook)": "audiobook",
      "eaudio": "audiobook",
      "evideo": "evideo",
      "graphic novel": "book",
      "fmt_book": "book", // vufind
      "text": "book", // evergreen
      "electronic resource ebook": "ebook", // webpacpro
      "sound recording audiobook download": "audiobook",
      "overdrive ebook": "ebook",
      "sound recording": "sound recording", // XXX: Map this more correctly
      "sound recording-musical": "sound recording", // XXX: Map this more correctly
      "sound recording-nonmusical": "audiobook" // XXX: Map this more correctly
    };
    v = (val || "").toLowerCase().trim();
    return mappings[v] || mappings[singularize(v)] || def_value;
  };

  parseAuthorAndTitleBySlash = function(input) {
    var components, res;
    res = {};
    if (input) {
      components = input.split("/").map(function(el) {
        var m;
        m = /(.*\s)(\[.*\])/.exec(el.trim());
        if (m && m[2]) {
          res.binding = commonBindingMappings(m[2]);
          return m[1];
        }
        return el;
      });
      res = Object.assign(res, splitAndNormalizeTitle(components[0]));
      if (components.length > 1) {
        res.author = normalizeAuthor(components[1].split(";")[0]);
      }
    }
    return res;
  };

  CounterFactory = function(prefix, index, step) {
    index = index || 0;
    step = step || 1;
    return function() {
      var rv;
      rv = index;
      index += step;
      return "" + prefix + "-" + rv;
    };
  };

  pluralize = function(term, count, plural) {
    if (count === 1) {
      return term;
    }
    return plural || (term + "s");
  };

  noop_fn = function(response) {
    return response;
  };

  pluck = function(coll, keys) {
    return Object.keys(coll).reduce(function(acc, el) {
      if (keys.includes(el)) {
        acc[el] = coll[el];
      }
      return acc;
    }, {});
  };

  setutils = {
    union: function(iterA, iterB) {
      var rv;
      rv = new Set(iterA);
      iterB.forEach(function(x) {
        return rv.add(x);
      });
      return rv;
    },
    difference: function(iterA, iterB) {
      var rv;
      rv = new Set(iterA);
      iterB.forEach(function(x) {
        if (rv.has(x)) {
          return rv.delete(x);
        }
      });
      return rv;
    }
  };

  // BEGIN src/polyfill.coffee
  if (typeof NodeList !== "undefined" && NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
  }

  (function(arr) {
    return arr.forEach(function(item) {
      if (item.hasOwnProperty("prepend")) {
        return;
      }
      return Object.defineProperty(item, "prepend", {
        configurable: true,
        enumerable: true,
        writable: true,
        value: function() {
          var argArr, docFrag;
          argArr = Array.prototype.slice.call(arguments);
          docFrag = document.createDocumentFragment();
          argArr.forEach(function(argItem) {
            var arg, isNode;
            isNode = argItem instanceof Node;
            arg = argItem;
            if (!isNode) {
              arg = document.createTextNode(String(argItem));
            }
            return docFrag.appendChild(arg);
          });
          return this.insertBefore(docFrag, this.firstChild);
        }
      });
    });
  })([Element.prototype, Document.prototype, DocumentFragment.prototype]);

  if (!Promise.withResolvers) {
    Promise.withResolvers = function() {
      var promise, reject, resolve;
      resolve = null;
      reject = null;
      promise = new Promise(function(res, rej) {
        resolve = res;
        return reject = rej;
      });
      return {promise, resolve, reject};
    };
  }

  // END src/polyfill.coffee
  unitTestable(pluralize);

  unitTestable(parseBoolean);

  unitTestable(cleanArray, "cleanArray");

  unitTestable(compareComponents);

  unitTestable(compareSortedComponents);

  unitTestable(cleanupPermissionUrl);

  unitTestable(commonBindingMappings);

  unitTestable(uniqueArray);

  unitTestable(nodeListToArray);

  unitTestable(urlutils);

  unitTestable(normalizeAuthor);

  unitTestable(normalizeTitle);

  unitTestable(validateISBN);

  unitTestable(validateISBN13);

  unitTestable(anyBeginsWith);

  unitTestable(logger, "logger");

  unitTestable(LOG_LEVELS, "LOG_LEVELS");

  unitTestable(friendlyTime);

  unitTestable(findFirstMatchingNode);

  unitTestable(findAllMatchingNodes);

  unitTestable(splitAndNormalizeTitle);

  unitTestable(sanitizeTitle);

  unitTestable(hashToList);

  unitTestable(fromTemplate);

  unitTestable(txtLower);

  unitTestable(parseAuthorAndTitleBySlash);

  unitTestable(CounterFactory);

  unitTestable(pluck);

  unitTestable(setutils, "setutils");

  // END src/utilities/utilities.coffee
  Connection = class Connection {
    constructor() {
      var me;
      this.registerEvent = this.registerEvent.bind(this);
      this.incomingMessageCallback = this.incomingMessageCallback.bind(this);
      this.sendRequest = this.sendRequest.bind(this);
      me = this;
      me.browser = BrowserConnection();
      me.connection = me.browser.runtime.connect();
      me.connection.onDisconnect.addListener(function(data) {
        logger.debug("Disconnected Port object " + JSON.stringify(me.connection));
        return logger.debug(data);
      });
      me.messageHandler = null;
      me.connection.onMessage.addListener(me.incomingMessageCallback);
      me.registeredEvents = {};
      me.pendingResponses = {};
      me.is_debug = false;
      me.nextMessageId = CounterFactory("message", 1);
    }

    registerEvent(data) {
      this.registeredEvents[data.event] = data.callback;
      return this.connection.postMessage({
        action: "registerEvent",
        event: data.event
      });
    }

    incomingMessageCallback(msg) {
      var callback;
      this.is_debug = this.is_debug || msg.message.debug;
      if (this.is_debug) {
        logger.setLevel(LOG_LEVELS.DEBUG);
        logger.debug("Message: " + JSON.stringify(msg));
      }
      if (msg.event && this.registeredEvents[msg.event]) {
        this.registeredEvents[msg.event](msg);
        return;
      }
      if (msg.message_id) {
        if (this.pendingResponses.hasOwnProperty(msg.message_id)) {
          callback = this.pendingResponses[msg.message_id];
          delete this.pendingResponses[msg.message_id];
          callback(msg.message);
          return;
        }
      }
      if (this.messageHandler) {
        this.messageHandler(msg.resource_id, msg.message);
      }
      return false;
    }

    sendRequest(request) {
      var deferred, me;
      request.message_id = this.nextMessageId();
      logger.debug(`Sending a request to the background page: ${JSON.stringify(request)}`);
      me = this;
      deferred = new Promise(function(resolve) {
        return me.pendingResponses[request.message_id] = resolve;
      });
      this.connection.postMessage(request);
      return deferred;
    }

  };

  // END src/extension.coffee

  // END src/browser/firefox/extension.coffee

  // BEGIN src/sites.coffee
  ALL_SITES = [
    {
      id: "abebooks_com",
      name: "Abebooks.com",
      url: "https://*.abebooks.com/*",
      description: "AbeBooks.com is an online book seller offering both best sellers as well as rarebooks",
      primary_markets: ["US"]
    },
    {
      id: "amazon_com",
      name: "Amazon.com",
      url: "https://*.amazon.com/*",
      description: "Amazon.com is the online book seller that everyone knows. Books, music, and more"
    },
    {
      id: "audible_com",
      name: "Audible.com",
      url: "https://www.audible.com/*",
      description: "Audible.com is an online service offering access to audiobooks",
      primary_markets: ["US"]
    },
    {
      id: "audible_co_uk",
      name: "Audible.co.uk",
      url: "https://www.audible.co.uk/*",
      description: "Audible.co.uk is an online service offering access to audiobooks",
      primary_markets: ["UK"]
    },
    {
      id: "audible_ca",
      name: "Audible.ca",
      url: "https://www.audible.ca/*",
      description: "Audible.ca is an online service offering access to audiobooks",
      primary_markets: ["CA"]
    },
    {
      id: "audible_de",
      name: "Audible.de",
      url: "https://www.audible.de/*",
      description: "Audible.de is an online service offering access to audiobooks",
      primary_markets: ["DE"]
    },
    {
      id: "audiobooks_com",
      name: "Audiobooks.com",
      url: "https://www.audiobooks.com/*",
      description: "Audiobooks.com is an online service offering access to audiobooks",
      primary_markets: ["US"]
    },
    {
      id: "audiobooksnow_com",
      name: "Audiobooksnow.com",
      url: "https://www.audiobooksnow.com/*",
      description: "Audiobooksnow.com is an online service offering access to audiobooks",
      primary_markets: ["US"]
    },
    {
      id: "amazon_ca",
      name: "Amazon.ca",
      url: "https://*.amazon.ca/*",
      description: "Amazon.ca is the online book seller that everyone knows, offering books, music, and more with a focus on Canadian residents",
      primary_markets: ["CA"]
    },
    {
      id: "amazon_comau",
      name: "Amazon.com.au",
      url: "https://*.amazon.com.au/*",
      description: "Amazon.com.au is the online book seller that everyone knows, offering books, music, and more with a focus on Australian residents",
      primary_markets: ["AU"]
    },
    {
      id: "amazon_comsg",
      name: "Amazon.com.sg",
      url: "https://*.amazon.sg/*",
      description: "Amazon.sg is the online book seller that everyone knows. offering books, music, and more with a focus on Singaporean residents",
      primary_markets: ["SG"]
    },
    {
      id: "amazon_couk",
      name: "Amazon.co.uk",
      url: "https://*.amazon.co.uk/*",
      description: "Amazon.co.uk is the online book seller that everyone knows, offering books, music, and more with a focus on residents of the UK",
      primary_markets: ["UK"]
    },
    {
      id: "amazon_de",
      name: "Amazon.de",
      url: "https://*.amazon.de/*",
      description: "Amazon.de is the online book seller that everyone knows, offering books, music, and more with a focus on residents of Germany",
      primary_markets: ["DE"]
    },
    {
      id: "amazon_es",
      name: "Amazon.es",
      url: "https://*.amazon.es/*",
      description: "Amazon.es is the online book seller that everyone knows, offering books, music, and more with a focus on residents of Spain and Portugal",
      primary_markets: ["ES",
    "PT"]
    },
    {
      id: "amazon_in",
      name: "Amazon.in",
      url: "https://*.amazon.in/*",
      description: "Amazon.in is the online book seller that everyone knows, offering books, music, and more with a focus on residents of India",
      primary_markets: ["IN"]
    },
    {
      id: "arbookfind_couk",
      name: "AR Book Find (UK)",
      url: "http://*.arbookfind.co.uk/*",
      description: "Accelerated Reader Bookfinder (UK) helps teachers, parents and students find books that are relevant to students grade level and curriculum",
      primary_markets: ["UK"]
    },
    {
      id: "arbookfind_com",
      name: "AR Book Find (US)",
      url: "http://*.arbookfind.com/*",
      description: "Accelerated Reader Bookfinder helps teachers, parents and students find books that are relevant to students grade level and curriculum",
      primary_markets: ["US"]
    },
    {
      id: "barnesandnoble_com",
      name: "Barnes and Noble",
      url: "https://www.barnesandnoble.com/*",
      description: "Barnes and Noble is a large book seller in the US, offering both retail stores and an online store",
      primary_markets: ["US"]
    },
    {
      id: "biblio_com",
      name: "Biblio.com",
      url: "https://biblio.com/*",
      description: "Biblio.com is an online book seller that offers best sellers and used books",
      primary_markets: ["US"]
    },
    {
      id: "blackwells_co_uk",
      name: "Blackwells.co.uk",
      url: "https://blackwells.co.uk/*",
      description: "Blackwells.co.uk is British book seller, offering both retail stores and an online marketplace",
      primary_markets: ["UK"]
    },
    {
      id: "bookbub_com",
      name: "Bookbub",
      url: "https://bookbub.com/*",
      description: "Bookbub provides an emails newsletter subscription featuring daily offers and deals",
      primary_markets: ["US"]
    },
    {
      id: "bookclubz",
      name: "Bookclubz",
      url: "https://bookclubs.com/*",
      description: "Bookclubs.com is an online platform for organzing your bookclub."
    },
    {
      id: "bookdigits_com",
      name: "BookDigits (.com)",
      url: "https://bookdigits.com/*",
      description: "Bookdigits.com is an online book rating and discovery platform"
    },
    {
      id: "bookoutlet_com",
      name: "Book Outlet (.com)",
      url: "https://bookoutlet.com/*",
      description: "Bookoutlet.com is an online book seller",
      primary_markets: ["US"]
    },
    {
      id: "bookoutlet_ca",
      name: "Book Outlet (.ca)",
      url: "https://bookoutlet.ca/*",
      description: "Bookoutlet.ca is an online book seller",
      primary_markets: ["CA"]
    },
    {
      id: "booko_com",
      name: "Booko",
      url: "https://booko.com.au/*",
      description: "Booko.co.au is an online book seller with a focus on Australian and New Zealand",
      primary_markets: ["AU",
    "NZ"]
    },
    {
      id: "bookshop_org",
      name: "Bookshop.org",
      url: "https://bookshop.org/*",
      description: "Bookshop.org is an online platform connecting local book sellers",
      primary_markets: ["US",
    "CA"]
    },
    {
      id: "booktopia_com",
      name: "Booktopia.com.au",
      url: "https://www.booktopia.com.au/*",
      description: "Booktopia.com.au is a book seller with retail stores and an online marketplace in Australia",
      primary_markets: ["AU"]
    },
    {
      id: "chapters_ca",
      name: "Chapters Indigo",
      url: "https://www.indigo.ca/*",
      description: "Chapters Indigo is a book seller with retail stores and an online marketplace in Canada",
      primary_markets: ["CA"]
    },
    {
      id: "chirpbooks_com",
      name: "Chirp",
      url: "https://www.chirpbooks.com/*",
      description: "Chirpbooks is an online audiobook seller",
      primary_markets: ["US"]
    },
    {
      id: "ctpub_com",
      name: "C &amp; T Publishing",
      url: "https://www.ctpub.com/*",
      description: "C &amp; T Publishing is a craft book publisher",
      primary_markets: ["US"]
    },
    {
      id: "downpour_com",
      name: "Downpour.com",
      url: "https://www.downpour.com/*",
      description: "Downpour.com is a online service offering audiobooks for sale, either via membership or through individual sale.",
      primary_markets: ["US"]
    },
    {
      id: "easons_com",
      name: "Easons",
      url: "https://www.easons.com/*",
      description: "Easons.com is a book seller with retail stors and an online marketplace in Ireland",
      primary_markets: ["IE"]
    },
    {
      id: "fantasticfiction_com",
      name: "Fantastic Fiction",
      url: "https://www.fantasticfiction.com/*",
      description: "Fantastic Fiction is a online book rating and discovery platform"
    },
    {
      id: "goodreads_com",
      name: "GoodReads",
      url: "https://www.goodreads.com/*",
      description: "GoodReads is a online book rating and discovery platform"
    },
    {
      id: "books_google_com",
      name: "Google Books",
      url: "https://*.google.com/*",
      description: "Google Books is an online book discovery platform"
    },
    {
      id: "books_google_com_sg",
      name: "Google Books (Singapore)",
      url: "https://*.google.com.sg/*",
      description: "Google Books is an online book discovery platform. This site has a focus on Singaporean residents",
      primary_markets: ["SG"]
    },
    {
      id: "hive_couk",
      name: "Hive.co.uk",
      url: "https://www.hive.co.uk/*",
      description: "Hive.co.uk is an online platform connecting local book sellers in the UK",
      primary_markets: ["UK"]
    },
    {
      id: "kirkusreviews_com",
      name: "KirkusReviews.com",
      url: "https://www.kirkusreviews.com/*",
      description: "KirkusReviews.com is an American book review magazine, founded in 1933, focussing on literature for young adults",
      primary_markets: ["US"]
    },
    {
      id: "kobo_com",
      name: "Kobo.com",
      url: "https://www.kobo.com/*",
      description: "Kobo.com is an online marketplace with ebooks for the Kobo reader"
    },
    {
      id: "librarything_com",
      name: "Library Thing",
      url: "https://www.librarything.com/*",
      description: "LibraryThing is a online book rating and discovery platform"
    },
    {
      id: "libro_fm",
      name: "Libro.fm",
      url: "https://libro.fm/*",
      description: "Libro.fm is a membership required audiobook platform"
    },
    {
      id: "npr_org_best_books",
      name: "NPR.org: Books We Love",
      url: "https://apps.npr.org/*",
      description: "NPR is a public broadcaster in the United States, and creates a yearly list of books recommendations",
      primary_markets: ["US"]
    },
    {
      id: "penguinrandomhouse_com",
      name: "Penguin Random House",
      url: "https://www.penguinrandomhouse.com/*",
      description: "Penguin Random House is a publisher of books and ebooks"
    },
    {
      id: "penworthy_com",
      name: "Penworthy",
      url: "https://penworthy.com/*",
      description: "Penworthy is a book distributor focussing on libraries and schools in the United States",
      primary_markets: ["US"]
    },
    {
      id: "romance_io",
      name: "Romance.io",
      url: "https://www.romance.io/*",
      description: "Romance.io is an online book rating and discovery platform focussing on the romance genre",
      primary_markets: ["US"]
    },
    {
      id: "everand",
      name: "Everand",
      url: "https://www.everand.com/*",
      description: "Everand (formerly Scribd) is an online service offering access to ebook asnd audiobooks on a subscription basis",
      primary_markets: ["US"]
    },
    {
      id: "smashwords_com",
      name: "Smashwords.com",
      url: "https://www.smashwords.com/*",
      description: "Smashwords is an online distributor of indie author ebooks"
    },
    {
      id: "thepaintedporch_com",
      name: "The Painted Porch Bookshop",
      url: "https://*.thepaintedporch.com/*",
      description: "The Painted Porch is a bookseller located in Texas, United States owned and operated by Ryan Holiday",
      primary_markets: ["US"]
    },
    {
      id: "thestorygraph_com",
      name: "The StoryGraph",
      url: "https://*.thestorygraph.com/*",
      description: "TheStoryGraph is a online book rating and discovery platform"
    },
    {
      id: "theworks_co_uk",
      name: "TheWorks.co.uk",
      url: "https://www.theworks.co.uk/*",
      description: "WH Smith is a book, toys and crafts seller with retail stores and an online marketplace in the UK",
      primary_markets: ["UK"]
    },
    {
      id: "thriftbooks_com",
      name: "Thriftbooks.com",
      url: "https://www.thriftbooks.com/*",
      description: "Thriftbooks is a large only used bookseller",
      primary_markets: ["US"]
    },
    {
      id: "waterstones_co_uk",
      name: "Waterstones.co.uk",
      url: "https://waterstones.co.uk/*",
      description: "Waterstones is a book seller with retail stores and an online marketplace in the UK",
      primary_markets: ["UK"]
    },
    {
      id: "waterstones_com",
      name: "Waterstones.com",
      url: "https://waterstones.com/*",
      description: "Waterstones is a book seller with an online marketplace in the US",
      primary_markets: ["US"]
    },
    {
      id: "whsmith_co_uk",
      name: "WHSmith.co.uk",
      url: "https://whsmith.co.uk/*",
      description: "WH Smith is a book seller with retail stores and an online marketplace in the UK",
      primary_markets: ["UK"]
    },
    {
      id: "wordery_com",
      name: "Wordery.com",
      url: "https://wordery.com/*",
      description: "Wordery is an online book seller offering best sellers as well as hard to find items. Items are delivered for free worldwide"
    }
  ];

  SiteManager = class SiteManager {
    constructor(configurationSource, browser) {
      this.onBrowserEvent = this.onBrowserEvent.bind(this);
      this.getSiteForUrl = this.getSiteForUrl.bind(this);
      this.anySiteSupportedAtUrl = this.anySiteSupportedAtUrl.bind(this);
      this.isSiteEnabledForUrl = this.isSiteEnabledForUrl.bind(this);
      this.isSiteEnabledForUrls = this.isSiteEnabledForUrls.bind(this);
      this.requestPermission = this.requestPermission.bind(this);
      this.removePermission = this.removePermission.bind(this);
      this.hasPermission = this.hasPermission.bind(this);
      this.hasPermissions = this.hasPermissions.bind(this);
      this.setSiteEnabled = this.setSiteEnabled.bind(this);
      this._sites = ALL_SITES;
      this._config = configurationSource;
      this._browser = browser || null;
      if (configurationSource && configurationSource.hasOwnProperty("onBrowserEvent")) {
        configurationSource.onBrowserEvent.push(this.onBrowserEvent);
      }
    }

    onBrowserEvent(src, browser) {
      return this._browser = browser;
    }

    _extractDomain(url) {
      var re;
      re = /https?:\/\/(\*\.)*([^\/]*?)(\:\d+)?\/\.*/.exec(url);
      if (re) {
        return re[2];
      }
      re = /:\/\/(.*?)\//.exec(url);
      if (re) {
        return re[1];
      }
      re = /(.*?)\//.exec(url);
      if (re) {
        return re[1];
      }
      return url;
    }

    getSiteForUrl(url) {
      var domain, me, result;
      me = this;
      domain = me._extractDomain(url);
      result = me._sites.find(function(el) {
        return domain.endsWith(me._extractDomain(el.url));
      });
      return result;
    }

    anySiteSupportedAtUrl(url) {
      var result;
      result = this.getSiteForUrl(url);
      return result !== void 0;
    }

    async isSiteEnabledForUrl(url) {
      var site, siteConfig, sitesById, sitesConfig;
      if (this._config === void 0) {
        return false;
      }
      site = this.getSiteForUrl(url);
      if (!site) {
        return false;
      }
      sitesConfig = (await this._config.getJSONConfig("sites"));
      if (!sitesConfig.configured && sitesConfig.upgraded) {
        return true;
      }
      sitesById = sitesConfig.byId || {};
      siteConfig = sitesById[site.id] || {};
      return siteConfig.enabled === true;
    }

    async isSiteEnabledForUrls(urls) {
      var me, promises, values;
      if (this._config === void 0) {
        return false;
      }
      me = this;
      promises = urls.map(me.isSiteEnabledForUrl);
      values = (await Promise.all(promises));
      return urls.map(function(el, idx) {
        return {
          url: el,
          status: values[idx]
        };
      });
    }

    requestPermission(url) {
      if (!this._browser) {
        return Promise.resolve(false);
      }
      return this._browser.requestPermission(url);
    }

    removePermission(url) {
      if (!this._browser) {
        return Promise.resolve(false);
      }
      return this._browser.removePermission(url);
    }

    hasPermission(url) {
      return this.hasPermissions([url]);
    }

    async hasPermissions(urls) {
      var me, promises, values;
      if (!this._browser) {
        return Promise.resolve(false);
      }
      me = this;
      promises = urls.map(me._browser.hasPermission);
      values = (await Promise.all(promises));
      return urls.map(function(el, idx) {
        return {
          url: el,
          status: values[idx]
        };
      });
    }

    async setSiteEnabled(site_id, state) {
      var sites, sitesById, sitesConfig;
      sites = site_id;
      if (!Array.isArray(sites)) {
        sites = [site_id];
      }
      sitesConfig = (await this._config.getJSONConfig("sites"));
      sitesConfig = sitesConfig || {};
      sitesConfig.configured = true;
      sitesConfig.byId = sitesById = sitesConfig.byId || {};
      sitesConfig.byId = sites.reduce(function(arr, el) {
        var siteConfig;
        siteConfig = arr[el] || {};
        siteConfig.enabled = state;
        arr[el] = siteConfig;
        return arr;
      }, sitesConfig.byId);
      await this._config.setJSONConfig("sites", sitesConfig);
      return {
        status: "ok"
      };
    }

  };

  unitTestable(SiteManager);

  unitTestable(ALL_SITES, "ALL_SITES");

  // END src/sites.coffee

  // BEGIN src/utilities/browser.coffee
  _parser = new DOMParser();

  parseToFragment = function(format) {
    return function(content) {
      var stripLowCharacters;
      stripLowCharacters = function(s) {
        var cc, i, res;
        res = [];
        i = 0;
        while (i < s.length) {
          cc = s.charCodeAt(i);
          if (cc >= 0x20) { //  and cc < 0x80
            res.push(s.charAt(i));
          }
          i++;
        }
        return res.join("");
      };
      return _parser.parseFromString(stripLowCharacters(content), format);
    };
  };

  $toFragment = parseToFragment("text/html");

  fromHTML = function(content) {
    return $toFragment(content).querySelector("body").firstChild;
  };

  fromHTMLTemplate = function(content, filters) {
    var t;
    t = fromTemplate(content, filters);
    return function(args) {
      return fromHTML(t(args));
    };
  };

  getMetaByProperty = function(doc, prop) {
    return Array.from(doc.querySelectorAll("meta[property=\"" + prop + "\"]")).map(function(el) {
      return el.getAttribute("content");
    });
  };

  parseAuthorAndTitleFromOGMeta = function(doc) {
    var result;
    result = {
      title: null,
      authors: null
    };
    getMetaByProperty(doc, "og:title").find(function(val) {
      var data;
      data = /(.*) by (.*)/.exec(val);
      if (data) {
        result = Object.assign(result, splitAndNormalizeTitle(data[1]));
        result.authors = [normalizeAuthor(data[2])];
        return true;
      }
    });
    return result;
  };

  $empty = function(rootOrSelector, selector) {
    var el, root;
    if (rootOrSelector instanceof Node) {
      root = rootOrSelector;
    }
    if (!selector) {
      root = document;
      selector = rootOrSelector;
    }
    if (selector && !(selector instanceof Node)) {
      el = root.querySelector(selector);
    } else {
      el = selector;
    }
    while (el && el.firstChild) {
      el.firstChild.remove();
    }
    return el;
  };

  textFromElement = function(el) {
    if (el && el instanceof Node) {
      return el.textContent.trim();
    }
    if (el && typeof el === "string") {
      return el.trim();
    }
    return null;
  };

  nodeToText = function(el) {
    if (el instanceof Node) {
      return textFromElement(el);
    }
    return el;
  };

  unitTestable(textFromElement);

  unitTestable(nodeToText);

  unitTestable(parseAuthorAndTitleFromOGMeta);

  unitTestable(getMetaByProperty);

  unitTestable($toFragment, "$toFragment");

  unitTestable(fromHTML);

  unitTestable($empty);

  unitTestable(fromHTMLTemplate, "fromHTMLTemplate");

  // END src/utilities/browser.coffee

    // BEGIN src/browser.coffee

    // BEGIN src/storage.coffee
  LocalStorageShim = class LocalStorageShim {
    constructor(_storage) {
      this.getItem = this.getItem.bind(this);
      this.setItem = this.setItem.bind(this);
      this.removeItem = this.removeItem.bind(this);
      this._storage = _storage;
    }

    getItem(key) {
      return Promise.resolve(this._storage.getItem(key));
    }

    setItem(key, value) {
      this._storage.setItem(key, value);
      return Promise.resolve();
    }

    removeItem(key) {
      this._storage.removeItem(key);
      return Promise.resolve();
    }

    clear() {
      return Promise.resolve();
    }

  };

  unitTestable(LocalStorageShim);

  // END src/storage.coffee
  ActiveRequests = class ActiveRequests {
    constructor() {
      this.getCommonDomain = this.getCommonDomain.bind(this);
      this.setParallelRequests = this.setParallelRequests.bind(this);
      this.getParallelRequests = this.getParallelRequests.bind(this);
      this.anyPendingRequests = this.anyPendingRequests.bind(this);
      this.anyActiveRequests = this.anyActiveRequests.bind(this);
      this._getRequestsByState = this._getRequestsByState.bind(this);
      this.getActiveRequests = this.getActiveRequests.bind(this);
      this.getPendingRequests = this.getPendingRequests.bind(this);
      this.scheduleRequest = this.scheduleRequest.bind(this);
      this.canRunNextRequest = this.canRunNextRequest.bind(this);
      this._nextRequestInState = this._nextRequestInState.bind(this);
      this.getNextPendingRequest = this.getNextPendingRequest.bind(this);
      this.popRequest = this.popRequest.bind(this);
      this.requests = {};
      this.parallelRequestsConfig = {};
      this.nextId = CounterFactory("request", 1);
    }

    getDomain(url) {
      var exc, parsed;
      try {
        parsed = new URL(url);
      } catch (error) {
        exc = error;
        logger.exception("Failed to parse the URL" + url, exc);
        return null;
      }
      return parsed.hostname;
    }

    getCommonDomain(url) {
      var domain;
      domain = this.getDomain(url);
      domain = domain.split(".");
      domain = domain.splice(domain.length - 2).join(".");
      return domain;
    }

    setParallelRequests(url, count) {
      return this.parallelRequestsConfig[this.getDomain(url)] = count;
    }

    getParallelRequests(url) {
      return this.parallelRequestsConfig[this.getDomain(url)] || 1;
    }

    anyPendingRequests(url) {
      return this.getPendingRequests(url).length > 0;
    }

    anyActiveRequests(url) {
      return this.getActiveRequests(url).length > 0;
    }

    _getRequestsByState(url, state) {
      var active, domain;
      domain = this.getCommonDomain(url);
      active = this.requests[domain] || [];
      return active.filter(function(el) {
        return el.state === state;
      });
    }

    getActiveRequests(url) {
      return this._getRequestsByState(url, "active");
    }

    getPendingRequests(url) {
      return this._getRequestsByState(url, "pending");
    }

    scheduleRequest(url, fn) {
      var domain, me, req, requestsForDomain, startNextRequest;
      req = {
        id_: this.nextId(),
        url: url,
        fn: fn,
        state: "pending"
      };
      req = Object.assign({}, req, Promise.withResolvers());
      req.completed = new Promise((function(resolve) {
        return req.complete = resolve;
      }));
      req.started = new Promise((function(resolve) {
        return req.start = resolve;
      }));
      domain = this.getCommonDomain(url);
      requestsForDomain = this.requests[domain] || [];
      requestsForDomain.push(req);
      this.requests[domain] = requestsForDomain;
      me = this;
      startNextRequest = function(url_) {
        var nextRequest;
        if (me.canRunNextRequest(url_)) {
          nextRequest = me.getNextPendingRequest(url_);
          if (nextRequest !== null) {
            nextRequest.state = "active";
            logger.debug(`Calling ourselves again for next pending request to ${JSON.stringify(nextRequest)}`);
            nextRequest.start();
            return nextRequest.fn(nextRequest).then(function(resp) {
              me.popRequest(nextRequest);
              nextRequest.complete();
              return url_;
            }).then(startNextRequest, startNextRequest);
          }
        }
      };
      startNextRequest(req.url);
      return req;
    }

    canRunNextRequest(url) {
      return this.getActiveRequests(url).length < this.getParallelRequests(url);
    }

    _nextRequestInState(url, state) {
      var active, activeIdx, domain, res;
      domain = this.getCommonDomain(url);
      res = null;
      active = this.requests[domain] || [];
      if (active.length === 0) {
        return null;
      }
      activeIdx = active.findIndex(function(el) {
        return el.state === state;
      });
      if (activeIdx >= 0) {
        return active[activeIdx];
      }
      return null;
    }

    getNextPendingRequest(url) {
      logger.debug("Finding next pending request for " + url);
      return this._nextRequestInState(url, "pending");
    }

    popRequest(req) {
      var active, activeIdx, domain, res;
      logger.debug(`Popping request for ${JSON.stringify(req)}`);
      domain = this.getCommonDomain(req.url);
      active = this.requests[domain] || [];
      if (active.length === 0) {
        return null;
      }
      activeIdx = active.findIndex(function(el) {
        return el.id_ === req.id_;
      });
      if (activeIdx >= 0) {
        res = active.splice(activeIdx, 1)[0];
        return res;
      }
      return null;
    }

  };

  ActivePages = class ActivePages {
    constructor() {
      this.add = this.add.bind(this);
      this.remove = this.remove.bind(this);
      this.has = this.has.bind(this);
      this.log = this.log.bind(this);
      this.pages = {};
    }

    add(id, data) {
      this.pages[id] = data;
      logger.debug(`Attached Page: ${id}`);
      return this.log();
    }

    remove(id) {
      delete this.pages[id];
      logger.debug(`Detached Page: ${id}`);
      return this.log();
    }

    has(id) {
      return indexOf.call(this.pages, id) >= 0;
    }

    log() {
      var active_pages, cur_port, k, len, ref;
      active_pages = "";
      ref = Object.keys(this.pages);
      for (k = 0, len = ref.length; k < len; k++) {
        cur_port = ref[k];
        active_pages = active_pages + `\n${cur_port}:  ` + `${this.pages[cur_port]["sender"]["url"]}`;
      }
      return logger.debug("Current active pages: " + active_pages);
    }

  };

  CommonBrowser = class CommonBrowser {
    constructor(name1, baseBrowser = api, defaultFetchStrategy = browserFetch) {
      this.getMessage = this.getMessage.bind(this);
      this.setIcon = this.setIcon.bind(this);
      this.setIconText = this.setIconText.bind(this);
      this.getURL = this.getURL.bind(this);
      this.injectCommonCodeForEnabledSites = this.injectCommonCodeForEnabledSites.bind(this);
      this.setupHotReload = this.setupHotReload.bind(this);
      this.onInstalled = this.onInstalled.bind(this);
      this.onPortMessage = this.onPortMessage.bind(this);
      this.processMessage = this.processMessage.bind(this);
      this.setApplication = this.setApplication.bind(this);
      this.processWaitingMessages = this.processWaitingMessages.bind(this);
      this.onConnect = this.onConnect.bind(this);
      this.fetch = this.fetch.bind(this);
      this.proxiedFetch = this.proxiedFetch.bind(this);
      this.name = name1;
      this.activePages = new ActivePages();
      this.baseBrowser = baseBrowser;
      this.fetchStrategy = defaultFetchStrategy;
      this.appstoreURL = this.getMessage("appstoreUrl");
      this.uninstallURL = this.getMessage("uninstallUrl");
      this.extensionVersion = this.getMessage("version");
      this.activeRequests = new ActiveRequests();
      this.options = {
        timeout: 60000
      };
      this.messages = [];
    }

    getMessage(key, args_) {
      return this.baseBrowser.i18n.getMessage(key, args_);
    }

    setIcon(data) {
      return this.baseBrowser.browserAction.setIcon(data);
    }

    setIconText(data) {
      return this.baseBrowser.browserAction.setBadgeText({
        text: data
      });
    }

    getURL(path) {
      return this.baseBrowser.runtime.getURL(path);
    }

    requestPermission(urls) {
      urls = cleanupPermissionUrl(urls);
      return permissionRequest({
        origins: urls
      });
    }

    removePermission(urls) {
      urls = cleanupPermissionUrl(urls);
      return permissionRemove({
        origins: urls
      });
    }

    hasPermission(urls) {
      urls = cleanupPermissionUrl(urls);
      return permissionContains({
        origins: urls
      });
    }

    async injectCommonCodeForEnabledSites(tabId, changeInfo, tab) {
      var display_icon, loaders, me, mgr, permissionForUrl, should_try_to_inject, wrap, wrap_true;
      me = this;
      if (changeInfo.status === "loading") { // complete"
        display_icon = function() {};
        wrap = function(method) {
          return function(asset, cb) {
            return method(tabId, asset, cb);
          };
        };
        wrap_true = function(method) {
          return function(asset, cb) {
            var return_true;
            return_true = function() {
              return cb(true);
            };
            return method(tabId, asset, return_true);
          };
        };
        loaders = {
          css: wrap_true(me.baseBrowser.tabs.insertCSS),
          script: wrap(me.baseBrowser.tabs.executeScript),
          done: display_icon
        };
        if (!me.application) {
          return;
        }
        mgr = me.application.SiteManager;
        should_try_to_inject = (await mgr.anySiteSupportedAtUrl(tab.url)) && (await mgr.isSiteEnabledForUrl(tab.url));
        logger.debug("Is site supported for " + tab.url + " -> " + should_try_to_inject);
        if (should_try_to_inject) {
          permissionForUrl = (await mgr.hasPermission(tab.url));
          if (permissionForUrl) {
            return me.application.injectAssets(loaders);
          }
        } else {
          return logger.debug(`Site for ${tab.url} has no permission to run`);
        }
      }
    }

    setupHotReload(host) {
      var me, tryHotReload;
      if (!host) {
        logger.debug("No hot reload host defined, skipping");
        return;
      }
      logger.debug(`Connecting to ${host} waiting for any message`);
      me = this;
      tryHotReload = function() {
        var ex, ws;
        try {
          ws = new WebSocket(`ws://${host}/`);
          ws.onmessage = me.onReloadMessage;
          return logger.info(`Connected to ${host} waiting for any message`);
        } catch (error) {
          ex = error;
          logger.info("Hot Reload not configured, trying again in 500ms");
          return setTimeout(tryHotReload, 500);
        }
      };
      return tryHotReload();
    }

    onReloadMessage(evt) {
      logger.info("Received hot reload notification");
      return chrome.runtime.reload();
    }

    onInstalled(details) {
      var autoConfigureUrl, me, reason, show_welcome_page;
      me = this;
      reason = details.reason;
      if (reason === "install") {
        this.application.sessionStorageObj["libextInstalled"] = me.extensionVersion;
        show_welcome_page = function() {
          var welcomeUrl;
          welcomeUrl = urlutils.concat(me.getMessage("webRoot"), "/welcome-new-user?version=" + me.extensionVersion);
          return me.baseBrowser.tabs.create({
            url: welcomeUrl
          });
        };
        autoConfigureUrl = urlutils.concat(me.getMessage("apiRoot"), "/api/v1/install-configure");
        return fetch(autoConfigureUrl).then(function(resp) {
          if (!resp.ok) {
            return show_welcome_page();
          } else {
            return resp.json().then(function(data) {
              return me.application.setJSONConfig("libraries", data);
            });
          }
        }).then(me.application.trackInstallTime).catch(function(exp) {
          logger.exception("Failed to contact api server", exp);
          return show_welcome_page();
        });
      } else if (reason === "upgrade") {
        return this.checkSitePermissionOnUpgrade().then(function() {
          return me.application.sessionStorageObj["upgrade"] = true;
        });
      }
    }

    async checkSitePermissionOnUpgrade() {
      var sites_configuration;
      sites_configuration = (await this.application.getJSONConfig("sites", void 0));
      if (sites_configuration === void 0) {
        sites_configuration = {
          upgraded: true
        };
        if (!Object.hasOwnProperty(sites_configuration, "byId")) {
          sites_configuration.byId = {};
          sites.forEach(function(site) {
            return site_configuration[site.id] = {};
          });
        }
        return (await this.application.setJSONConfig("sites", sites_configuration));
      }
    }

    onPortMessage(port, tabId) {
      var me;
      me = this;
      if (tabId) {
        me.activePages.add(tabId, port);
      }
      return port.onMessage.addListener(function(request, messageSender) {
        var cb;
        request.sender = messageSender;
        cb = async function(data) {
          var ex, msg;
          if (typeof data === "undefined" || typeof data === "null") {
            return;
          }
          if (me.activePages.has(tabId)) {
            logger.info(`page ${tabId} is no longer present, dropped reply`);
            return;
          }
          if (data instanceof LibraryResults) {
            data = data.toJSON();
          }
          if (data.status === 'message') {
            data = (await me.application.filterMessages(data));
            if (data.messages.length === 0) {
              return;
            }
          }
          if (messageSender.sender.tab) {
            logger.debug("Sending response to " + messageSender.sender.tab.windowId + "." + messageSender.sender.tab.index + " (" + messageSender.sender.tab.id + ", " + messageSender.sender.tab.url);
          }
          logger.debug("- Response: ");
          logger.dir(data);
          msg = {
            message_id: request.message_id,
            resource_id: request.request && request.request.resource_id,
            message: data
          };
          try {
            return port.postMessage(msg);
          } catch (error) {
            ex = error;
          }
        };
        logger.debug("Received message: ");
        logger.dir(request);
        request.reply = cb;
        me.processMessage(request).then(cb);
        return true;
      });
    }

    processMessage(msg) {
      var me;
      me = this;
      if (me.application) {
        return me.application.onMessage(msg);
      }
      return new Promise(function(resolve, reject) {
        return me.messages.push(function(app) {
          return app.onMessages(msg).then(resolve);
        });
      });
    }

    setApplication(app) {
      return this.application = app;
    }

    processWaitingMessages() {
      var me;
      me = this;
      if (me.application) {
        me.messages.map(function(msg) {
          return msg(me.application);
        });
        return me.messages = [];
      }
    }

    onConnect(port) {
      var me, tabId;
      me = this;
      tabId = null;
      if (!"tab" in port.sender) {
        tabId = port.sender.tab.id;
      } else {
        tabId = "__config__";
      }
      port.onDisconnect.addListener(function(request) {
        logger.debug(`Disconnected Page: ${tabId}`);
        return me.activePages.remove(tabId);
      });
      return me.onPortMessage(port, tabId);
    }

    fetch(libraryInfo, url, params, statusCodeCallback, activeRequest) {
      var doFetch, exc, failureDetails, fetchStrategy, me;
      me = this;
      fetchStrategy = (libraryInfo && libraryInfo.fetch) || me.fetchStrategy;
      if (fetchStrategy === "nativeFetch") {
        fetchStrategy = browserFetch;
      }
      doFetch = function(req) {
        return fetchStrategy(libraryInfo, url, params, statusCodeCallback, me.options.timeout).then(req.resolve, req.reject).then(function() {
          return req;
        });
      };
      me = this;
      try {
        if (libraryInfo && libraryInfo.maxParallelRequests) {
          me.activeRequests.setParallelRequests(url, libraryInfo.maxParallelRequests);
        }
        return me.activeRequests.scheduleRequest(url, doFetch).promise;
      } catch (error) {
        exc = error;
        failureDetails = JSON.stringify(exc);
        me.application.report_failure(me, failureDetails, activeRequest);
        return Promise.reject();
      }
    }

    proxiedFetch(libraryInfo, url, params, statusCodeCallback) {
      var cookieJar, cookies, expiry, it, key, me, pair, proxyHeaders, proxyParams, proxyUrl, targetUrl;
      me = this;
      if (this.cookieJar === void 0) {
        this.cookieJar = {};
      }
      proxyHeaders = {};
      it = params.headers.entries();
      pair = it.next();
      while (!pair.done) {
        proxyHeaders[pair.value[0]] = [pair.value[1]];
        pair = it.next();
      }
      targetUrl = new URL(url);
      cookies = "";
      cookieJar = me.cookieJar[targetUrl.origin] || {};
      for (key in cookieJar) {
        if (cookies.length > 0) {
          cookies = cookies + "; ";
        }
        cookies = cookies + key + "=" + cookieJar[key];
      }
      proxyParams = {
        method: "POST",
        cache: "no-cache",
        mode: "cors",
        credentials: "include", // omit?
        referrer: "no-referrer",
        contentType: "application/json",
        body: JSON.stringify({
          method: params.method,
          endpoint: url,
          body: JSON.stringify(params.body),
          headers: proxyHeaders,
          cookies: cookies,
          library_id: libraryInfo.libraryId,
          catalog_id: libraryInfo.catalogId
        })
      };
      expiry = me.application.time() + 45 * 1000;
      proxyUrl = urlutils.concat(me.getMessage("apiRoot"), "/api/proxy/search/:library_id".replace(":library_id", libraryInfo.libraryId));
      logger.info(`Fetching info for ${proxyUrl}`);
      return fetch(proxyUrl, proxyParams).then(function(resp) {
        logger.info(`Received a ${resp.status} response for ${proxyUrl}`);
        if (resp.status === 200 || resp.status === 204) {
          return resp.text();
        }
        if (resp.status === 409) {
          return null;
        }
        return null;
      }).then(function(data) {
        return new Promise(function(resolve, reject) {
          var refreshResults, requestId, statusUrl;
          if (!data) {
            return reject();
          }
          requestId = JSON.parse(data).uuid;
          statusUrl = urlutils.concat(me.getMessage("apiRoot"), "/api/proxy/status/:request_id".replace(":request_id", requestId));
          refreshResults = function() {
            return fetch(statusUrl).then(function(stResp) {
              var responseCookies, responseHeaders, result;
              if (stResp.status === 409) {
                reject();
              }
              if (stResp.status > 299) {
                return reject();
              } else if (stResp.status === 204) {
                if (me.application.time() < expiry) {
                  setTimeout(refreshResults, 500);
                } else {
                  return null;
                }
                return null;
              } else {
                responseHeaders = {};
                it = stResp.headers.entries();
                result = it.next();
                cookieJar = me.cookieJar[targetUrl.origin] || {};
                while (!result.done) {
                  responseHeaders[result.value[0]] = result.value[1];
                  if (result.value[0].toLowerCase() === "x-setcookie") {
                    responseCookies = result.value[1].split(", ");
                    responseCookies.forEach(function(respCookie) {
                      var splits;
                      splits = respCookie.split("=", 2);
                      return cookieJar[splits[0]] = splits[1];
                    });
                  }
                  result = it.next();
                }
                me.cookieJar[targetUrl.origin] = cookieJar;
                return stResp.text().then(function(body) {
                  var rv;
                  rv = {
                    body: body,
                    headers: responseHeaders
                  };
                  return resolve(rv);
                });
              }
            });
          };
          return refreshResults(); // Promise
        });
      }).catch(function(exc) {
        return logger.error(`Failed on the request, getting ${exc}`);
      });
    }

  };

  unitTestable(CommonBrowser);

  unitTestable(ActiveRequests);

  // END src/browser.coffee
  createOptions = function(target, arr, opts) {
    var valueGetter;
    valueGetter = opts.value;
    if (!(typeof valueGetter === "function")) {
      valueGetter = function(item) {
        return item[opts.value];
      };
    }
    if (arr.length === 1) {
      opts = Object.assign({}, opts, {
        default: valueGetter(arr[0])
      });
    }
    return arr.reduce(function(acc, item) {
      var opt;
      opt = new Option(item[opts.name], valueGetter(item));
      opt.name = valueGetter(item);
      Object.keys(item).forEach(function(key) {
        if (key === opts.name || key === opts.value) {
          return;
        }
        return opt.dataset[key] = item[key];
      });
      if (valueGetter(item) === opts.default) {
        opt.selected = true;
        acc = item;
      }
      target.add(opt);
      return acc;
    }, {});
  };

  BooleanTransformer = class BooleanTransformer {
    toFormValue(val) {
      if (val === true) {
        return "true";
      } else {
        return "false";
      }
    }

    toConfigurationValue(val) {
      if (val === "true") {
        return true;
      } else {
        return false;
      }
    }

  };

  AuthenticationUI = class AuthenticationUI {
    constructor(root1, cfg1, catalogId1, fields1) {
      this.close = this.close.bind(this);
      this.display = this.display.bind(this);
      this.root = root1;
      this.cfg = cfg1;
      this.catalogId = catalogId1;
      this.fields = fields1;
      this.modal_bg = null;
      this.el = null;
      this.dirty = false;
    }

    close() {
      this.modal_bg && this.modal_bg.remove();
      this.el && this.el.remove();
      if (this.dirty) {
        this.root.dispatchEvent(new Event("updateLibrary"));
      }
      return this.root.dispatchEvent(new Event("closeAuthenticationDialog"));
    }

    display() {
      var cancelLabel, el, loginCatalog, loginLabel, me, modal;
      me = this;
      this.modal_bg = fromHTML("<div class=\"modal_background\" />");
      me.root.appendChild(me.modal_bg);
      loginCatalog = api.i18n.getMessage('Config_LoginToCatalog');
      modal = `<div class=\"modal\"><div class=\"title\">${loginCatalog}</div>`;
      this.fields.forEach(function(field) {
        var fieldType;
        fieldType = field.type || "text";
        return modal += "<div> <div><label>" + field.display + ":</label> <input type=\"" + fieldType + "\" name=\"" + field.field + "\" /></div>" + "<div><span class=\"warning\" id=\"" + field.field + "_warning\">&nbsp;</span></div>" + "</div>";
      });
      loginLabel = api.i18n.getMessage('Button_LoginLabel');
      cancelLabel = api.i18n.getMessage('Button_CancelLabel');
      modal += `<div><button class=\"login\">${loginLabel}</button>` + `<button class=\"cancel\">${cancelLabel}</button></div>` + "</div></div>";
      el = fromHTML(modal);
      this.el = el;
      el.querySelector("button.login").addEventListener("click", async function() {
        var invalid, password, requiredToLogin, res, username;
        me.dirty = true;
        invalid = false;
        requiredToLogin = api.i18n.getMessage('Config_LoginRequiredField');
        el.querySelectorAll("input").forEach(function(inp) {
          if (inp.value.length === 0) {
            el.querySelector("#" + inp.name + "_warning").textContent = requiredToLogin;
            return invalid = true;
          } else {
            return el.querySelector("#" + inp.name + "_warning").textContent = " ";
          }
        });
        if (invalid) {
          return;
        }
        username = el.querySelector("input[name=username]").value;
        password = el.querySelector("input[name=password]").value;
        res = (await me.cfg.loginForCatalog(me.catalogId, username, password));
        if (res) {
          return me.close();
        }
      });
      el.querySelector("button.cancel").addEventListener("click", me.close);
      this.modal_bg.addEventListener("click", me.close);
      me.root.appendChild(el);
      return el.querySelector("input").focus();
    }

  };

  LibraryManager = class LibraryManager {
    constructor(browserApi) {
      this.getLibrariesForCountryAndState = this.getLibrariesForCountryAndState.bind(this);
      this.api = browserApi;
      this.API_LIBRARY_BASE = urlutils.concat(this.api.i18n.getMessage("apiRoot"), "/api/library");
      this.cacheByCountryState = {};
    }

    fetch(url) {
      return fetch(url);
    }

    async getLibrariesForCountryAndState(country, state) {
      var args, body, cacheKey, me, resp, uri;
      cacheKey = country + "_" + state;
      if (this.cacheByCountryState.hasOwnProperty(cacheKey)) {
        return this.cacheByCountryState[cacheKey];
      }
      me = this;
      uri = fromTemplate("search/<%= country %>/<%= state %>?version=<%= version %>");
      if (!state) {
        uri = fromTemplate("search/<%= country %>?version=<%= version %>");
      }
      args = {
        country: country,
        state: state,
        version: me.api.i18n.getMessage("version")
      };
      resp = (await me.fetch(urlutils.concat(me.API_LIBRARY_BASE, uri(args))));
      if (!resp.ok) {
        raise(Exception("Failure to request libraries"));
      }
      body = (await resp.json());
      if (body) {
        body = body.filter(function(el) {
          return el.enabled;
        });
        body.sort(function(a, b) {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        });
        me.cacheByCountryState[cacheKey] = body;
        return body;
      }
    }

  };

  elementGenerator = CounterFactory("setting");

  ConfigurationSetting = class ConfigurationSetting {
    constructor(doc, cfg) {
      this.render = this.render.bind(this);
      this.updateConfiguration = this.updateConfiguration.bind(this);
      this.setValue = this.setValue.bind(this);
      this.initializeValue = this.initializeValue.bind(this);
      this.doc = doc;
      this.cfg = cfg;
      this.betaFeature = false;
      this.multipleItems = false;
      this.name = elementGenerator();
    }

    render() {
      var inputType, me, txt;
      me = this;
      inputType = "radio";
      if (this.multipleItems) {
        inputType = "checkbox";
      }
      txt = "<div>" + this.options.reduce(function(acc, el) {
        var def, value;
        def = "";
        if (el.default) {
          def = " checked";
        }
        value = el.value;
        if (me.typeTransformer) {
          value = me.typeTransformer.toFormValue(value);
        }
        txt = `<div><input type=\"${inputType}\" name=\"${me.name}\" id=\"${me.name}-${value}\" value=\"${value}\" ${def}/><label for=\"${me.name}-${el.value}\">${el.description}</label></div>`;
        acc += txt;
        return acc;
      }, "") + "</div>";
      txt = "<div class=\"setting-info\">" + me.text + "</div>" + txt;
      if (me.betaFeature) {
        txt = "<div><strong>BETA FEATURE</strong></div>" + txt;
      }
      txt = `<div id=\"${me.name}\" class=\"setting\">` + txt + "</div>";
      this.r = fromHTML(txt);
      this.r.querySelectorAll("input").forEach(function(el) {
        return el.addEventListener("click", function(e) {
          var value;
          value = e.currentTarget.value;
          return me.updateConfiguration(value);
        });
      });
      return this.r;
    }

    updateConfiguration(value) {
      var me;
      me = this;
      if (me.multipleItems) {
        value = Array.from(me.r.querySelectorAll("input")).reduce(function(acc, el) {
          if (el.checked) {
            acc.push(el.value);
          }
          return acc;
        }, []);
      } else {
        if (this.typeTransformer) {
          value = this.typeTransformer.toConfigurationValue(value);
        }
      }
      return this.cfg.setSettingsConfig(this.key, value);
    }

    setValue(data) {
      var me;
      if (data && data.value !== void 0) {
        data = data.value;
      }
      if (!Array.isArray(data)) {
        data = [data];
      }
      me = this;
      return data.forEach(function(el) {
        if (me.typeTransformer) {
          el = me.typeTransformer.toFormValue(el);
        }
        return me.r.querySelector(`#${me.name}-${el}`).checked = true;
      });
    }

    async initializeValue() {
      var data;
      data = (await this.cfg.getSettingsConfig(this.key));
      return this.setValue(data);
    }

  };

  LibraryLinkSetting = class LibraryLinkSetting extends ConfigurationSetting {
    constructor(doc, cfg) {
      super(doc, cfg);
      this.text = "Library Names are displayed on the extension as links, back to the library's home page or to the catalog. This is a user preference that does not impact the performance of the extension; it is merely a convenience link back to the library.";
      this.options = [
        {
          value: "library_url",
          description: "Library Url",
          default: true
        },
        {
          value: "catalog_url",
          description: "Catalog Url"
        }
      ];
      this.key = "library_link_default_setting";
    }

  };

  SearchModeSetting = class SearchModeSetting extends ConfigurationSetting {
    constructor(doc, cfg) {
      super(doc, cfg);
      this.text = "The Library Extension can search your library automatically when you visit a page with items that are considered books, or you can choose to have the Library Extension search only when you want.";
      this.options = [
        {
          value: "automatic",
          description: "Search automatically",
          default: true
        },
        {
          value: "on-demand",
          description: "Search on-demand"
        }
      ];
      this.key = "search_mode_setting";
    }

  };

  ShowBindingIconSetting = class ShowBindingIconSetting extends ConfigurationSetting {
    constructor(doc, cfg) {
      super(doc, cfg);
      this.text = "The Library Extension can show icons helping identify the type of resources available at your library";
      this.options = [
        {
          value: true,
          description: "Yes, show icons",
          default: true
        },
        {
          value: false,
          description: "No, I don't want any icons"
        }
      ];
      this.typeTransformer = new BooleanTransformer();
      this.key = "binding_icon_setting";
    }

  };

  MultipleResultsSetting = class MultipleResultsSetting extends ConfigurationSetting {
    constructor(doc, cfg) {
      super(doc, cfg);
      this.help = "/help/general-settings-controlling-results";
      this.text = "The Library Extension returns all matching results for primary catalogs. The default behavior is to try and display the 'best' result that matches on the item ISBN, and then try searching by title and author. All matching results will try to search by title first always, defaulting to ISBN only if nothing is matched earlier. This will result in more links to catalog entries, many of which may look similar until this feature is completed. This setting also applies to all catalogs in the current beta state but will eventually be configurable per catalog.";
      this.options = [
        {
          value: false,
          description: "No, keep using the existing 'best' result behavior",
          default: true
        },
        {
          value: true,
          description: "Yes, I want all possible matches to be displayed"
        }
      ];
      this.typeTransformer = new BooleanTransformer();
      this.key = "beta_multiple_results_setting";
    }

  };

  GoodReadsListSetting = class GoodReadsListSetting extends ConfigurationSetting {
    constructor(doc, cfg) {
      super(doc, cfg);
      this.betaFeature = true;
      this.text = "Add the ability to search for library status for individual items on GoodReads lists. This will enable the LibraryExtension to identify individual items on 'list' pages and provide an way to check your library for listings.";
      this.options = [
        {
          value: false,
          description: "No, I don't want to have the Library Extension show up on my GoodReads lists",
          default: true
        },
        {
          value: true,
          description: "Yes, I want the ability to check my libraries for my list items"
        }
      ];
      this.typeTransformer = new BooleanTransformer();
      this.key = "beta_goodreads_lists";
    }

  };

  BindingFilterSetting = class BindingFilterSetting extends ConfigurationSetting {
    constructor(doc, cfg) {
      super(doc, cfg);
      this.text = "Filter results from your library based on the resources you're interested in. These binding filters allow you to display those items that you care about most and make any other items available behind a link on the results page. Note: Leave all items unchecked to not filter anything.";
      this.help = "/help/general-settings-filtering-results-by-type";
      this.betaFeature = true;
      this.multipleItems = true;
      this.options = [
        {
          value: "audiobook",
          description: "Audiobooks"
        },
        {
          value: "blu-ray",
          description: "Blu-ray Discs"
        },
        {
          value: "book",
          description: "Books (print, large print, etc)"
        },
        {
          value: "braille",
          description: "Braille"
        },
        {
          value: "cd",
          description: "CD"
        },
        {
          value: "cdrom",
          description: "CD-ROM"
        },
        {
          value: "dvd",
          description: "DVD"
        },
        {
          value: "ebook",
          description: "eBooks"
        },
        {
          value: "magazine",
          description: "Magazine"
        },
        {
          value: "sound recording",
          description: "Sound Recording"
        },
        {
          value: "video",
          description: "Video"
        },
        {
          value: "unknown",
          description: "Others (shown as 'unknown')"
        }
      ];
      this.key = "binding_filter";
    }

  };

  LibbySetting = class LibbySetting extends ConfigurationSetting {
    constructor(doc, cfg) {
      super(doc, cfg);
      this.text = "Choose between Libby or Overdrive for the digital catalog where the choice is available. The old Overdrive interface and app is being deprecated for the newer Libby offering, and will become required in the future. Users can opt in ahead of time to use Libby instead.";
      this.options = [
        {
          value: false,
          description: "Use Overdrive",
          default: true
        },
        {
          value: true,
          description: "Use Libby"
        }
      ];
      this.typeTransformer = new BooleanTransformer();
      this.key = "use_libby";
    }

  };

  ConfigurationUI = class ConfigurationUI {
    constructor(root1, cfg1, configurationModules) {
      var applyConfigButton, downloadButton, me, refreshRegisteredUIs, refreshWithScroll, refreshWithoutScroll;
      this.initialize = this.initialize.bind(this);
      this.pickConfiguration = this.pickConfiguration.bind(this);
      this.downloadConfiguration = this.downloadConfiguration.bind(this);
      this.handleSiteChange = this.handleSiteChange.bind(this);
      this.handleCatalogChange = this.handleCatalogChange.bind(this);
      this.refreshDebugOptions = this.refreshDebugOptions.bind(this);
      this.setCatalogState = this.setCatalogState.bind(this);
      this.refreshSitesList = this.refreshSitesList.bind(this);
      this.handleAllSitesCheckboxClick = this.handleAllSitesCheckboxClick.bind(this);
      this.handleSiteCheckboxClick = this.handleSiteCheckboxClick.bind(this);
      this.refreshUIConfiguredLibraries = this.refreshUIConfiguredLibraries.bind(this);
      this.initializeCountry = this.initializeCountry.bind(this);
      this.initializeStates = this.initializeStates.bind(this);
      this.initializeLibraries = this.initializeLibraries.bind(this);
      this.updateVersionStatus = this.updateVersionStatus.bind(this);
      this.updateLibraryDataLastChecked = this.updateLibraryDataLastChecked.bind(this);
      this.initializeSearchCombo = this.initializeSearchCombo.bind(this);
      this.initializeViewSwitcher = this.initializeViewSwitcher.bind(this);
      this.closeDialog = this.closeDialog.bind(this);
      this.root = root1;
      this.cfg = cfg1;
      me = this;
      refreshRegisteredUIs = function(scrollToEnd) {
        return async function() {
          var notify, summary;
          summary = (await me.cfg.getLibrarySummary());
          notify = me.cfg.doNotifyEvent("libraryChange", {
            scroll: scrollToEnd
          });
          return notify(summary);
        };
      };
      refreshWithScroll = refreshRegisteredUIs(true);
      refreshWithoutScroll = refreshRegisteredUIs();
      this.cfg.addEventListener("addLibrary", refreshWithScroll);
      this.cfg.addEventListener("removeLibrary", refreshWithoutScroll);
      this.cfg.addEventListener("updateLibrary", refreshWithoutScroll);
      this.cfg.addEventListener("siteChange", me.handleSiteChange);
      this.cfg.addEventListener("libraryChange", me.refreshUIConfiguredLibraries);
      this.cfg.addEventListener("libraryChange", me.handleCatalogChange);
      this.cfg.addEventListener("catalogChange", me.handleCatalogChange);
      downloadButton = this.root.querySelector("button#config-download");
      if (downloadButton) {
        downloadButton.addEventListener("click", me.downloadConfiguration);
      }
      applyConfigButton = this.root.querySelector("button#config-pick");
      if (applyConfigButton) {
        applyConfigButton.addEventListener("click", me.pickConfiguration);
      }
      this.libraryManager = new LibraryManager(api);
      this.root.querySelector("#reviewLink").setAttribute("href", api.i18n.getMessage("reviewUrl"));
      me = this;
      this.ready = Promise.all(configurationModules.map(function(m) {
        var mod;
        mod = m(me);
        return me.cfg.addEventListener("libraryConfig", mod.listen);
      }));
    }

    initialize(settings) {
      var me, promises, tgt;
      settings = settings || [];
      me = this;
      me.root.querySelector("div.done").addEventListener("click", me.closeDialog);
      promises = [];
      promises.push(me.initializeSearchCombo());
      promises.push(me.initializeViewSwitcher());
      promises.push(me.cfg.isDebug().then(me.refreshSitesList));
      tgt = me.root.querySelector("#general #entries");
      settings.forEach(function(setting) {
        var c;
        c = new setting(me.root, me.cfg);
        tgt.append(c.render());
        me.cfg._proxy._conn.registerEvent({
          event: c.event,
          callback: c.setValue
        });
        return c.initializeValue();
      });
      return Promise.all(promises);
    }

    validateConfig(data) {
      var res;
      res = {
        valid: true
      };
      if (data.enabled_libraries) {
        res.libraries_count = data.enabled_libraries.length;
        res.valid = data.enabled_libraries.reduce(function(acc, el) {
          return acc && data.hasOwnProperty(el);
        }, true);
      } else {
        res.valid = false;
      }
      return res;
    }

    pickConfiguration(e) {
      var configStatus, doImport, entry, importConfiguration, importDirections, importLabel, me, updateConfigStatus;
      me = this;
      configStatus = me.root.querySelector("#config-status");
      $empty(configStatus);
      updateConfigStatus = function(msg) {
        $empty(configStatus);
        return configStatus.appendChild(fromHTML(msg, "text/html"));
      };
      importConfiguration = async function(parsed, value) {
        var message;
        if (value.valid) {
          message = api.i18n.getMessage('Config_ImportApplyingConfiguration', [parsed.enabled_libraries.length]);
          updateConfigStatus(`<div>\u2714 ${message}</div>`);
          await me.cfg.setJSONConfig("libraries", parsed);
          await me.cfg.refreshLibraries(parsed.enabled_libraries);
          await this.cfg.getCurrentLibraryConfiguration();
          message = api.i18n.getMessage('Config_ImportAppliedConfiguration', [parsed.enabled_libraries.length]);
          return updateConfigStatus(`<div>\u2714 ${message}</div>`);
        } else {
          message = api.i18n.getMessage('Config_ImportInvalidConfigurationFile');
          return updateConfigStatus(`<div class=\"warning\">\u26a0 ${message}</div>`);
        }
      };
      entry = me.root.querySelector("#config-entry");
      $empty(entry);
      importDirections = api.i18n.getMessage('Config_ImportDirections');
      importLabel = api.i18n.getMessage('Button_ImportLabel');
      entry.appendChild(fromHTML(`<div>${importDirections}</div>`));
      entry.appendChild(fromHTML("<textarea id='config-text'></textarea>"));
      entry.appendChild(fromHTML(`<button id='config-import'>${importLabel}</button>`));
      doImport = function() {
        var data, parsedConfig, stats;
        try {
          data = entry.querySelector('#config-text').value;
          parsedConfig = JSON.parse(data);
          stats = me.validateConfig(parsedConfig);
        } catch (error) {
          stats = {
            valid: false
          };
        }
        return importConfiguration(parsedConfig, stats);
      };
      return entry.querySelector('#config-import').addEventListener('click', doImport);
    }

    async downloadConfiguration(e) {
      var blob, data, el, url;
      data = (await this.cfg.getCurrentLibraryConfiguration());
      blob = new Blob([JSON.stringify(data, '', 2)], {
        type: "application/json"
      });
      url = URL.createObjectURL(blob);
      el = this.root.createElement('a');
      el.href = url;
      el.download = "libraryExtensionConfiguration.json";
      return el.dispatchEvent(new MouseEvent('click'));
    }

    handleSiteChange(e) {
      var annotation, color, el, enabledCount, me, title;
      me = this;
      enabledCount = Array.from(me.root.querySelectorAll('.site-listing input:checked')).length;
      annotation = '';
      title = '';
      color = 'black';
      if (enabledCount === 0) {
        annotation = '\u26a0';
        title = "No sites are enabled";
        color = 'red';
      }
      el = me.root.querySelector("li[data-target=sites] .annotation");
      el.textContent = annotation;
      el.title = title;
      return el.style.color = color;
    }

    handleCatalogChange(e) {
      var annotation, color, el, libraries, me, summary, title;
      me = this;
      libraries = Array.from(me.root.querySelectorAll('#librariesRows div.row'));
      annotation = '';
      title = '';
      color = 'black';
      summary = libraries.reduce(function(acc, el) {
        acc.libraries.count += 1;
        acc.catalogs.count += Array.from(el.querySelectorAll(".catalog-listing input:checked")).length;
        return acc;
      }, {
        libraries: {
          count: 0
        },
        catalogs: {
          count: 0
        }
      });
      if (summary.libraries.count === 0) {
        annotation = '\u26a0';
        title = "No libraries have been configured";
        color = 'red';
      } else if (summary.catalogs.count === 0) {
        annotation = '\u26a0';
        title = "No catalogs are enabled";
        color = 'red';
      }
      el = me.root.querySelector("li[data-target=libraries] .annotation");
      el.textContent = annotation;
      el.title = title;
      return el.style.color = color;
    }

    excludeRecentlySeenPendingLibrary(storage) {
      return function(updated_libraries) {
        var libraries, recentLibraries;
        libraries = [];
        if (updated_libraries) {
          try {
            recentLibraries = JSON.parse(storage["recentPendingLibraries"] || "[]");
          } catch (error) {
            recentLibraries = [];
          }
          storage["recentPendingLibraries"] = JSON.stringify(updated_libraries);
          libraries = updated_libraries.filter(function(el) {
            return recentLibraries.indexOf(el) < 0;
          });
        }
        return libraries;
      };
    }

    async refreshDebugOptions() {
      var actionsContainer, debug_enabled, disablePending, me, pending;
      me = this;
      debug_enabled = (await this.cfg.readConfig("debug"));
      if (debug_enabled) {
        logger.setLevel(LOG_LEVELS.DEBUG);
        actionsContainer = $empty(me.root, "#actions");
        actionsContainer.appendChild(fromHTML("<div class='nav pending' id='pending'>Pending Libraries</div>", "text/html"));
        pending = me.root.querySelector("#pending");
        pending.addEventListener("click", async function(evt) {
          var body, cb, resp, updated_libraries;
          resp = (await fetch(urlutils.concat(api.i18n.getMessage("apiRoot"), "/internal/libraries/recent-updates?daysago=1")));
          if (!resp.ok) {
            return null;
          }
          body = (await resp.json());
          cb = me.excludeRecentlySeenPendingLibrary(localStorage);
          updated_libraries = (await cb(body));
          if (updated_libraries) {
            return me.cfg.addLibrary(updated_libraries);
          }
        });
        actionsContainer.appendChild(fromHTML("<div class='nav pending' id='disable-all'>Disable All</div>", "text/html"));
        disablePending = me.root.querySelector("#disable-all");
        return disablePending.addEventListener("click", async function(evt) {
          var notify, promises, summary;
          promises = [];
          me.root.querySelectorAll("#librariesRows .row").forEach(function(row) {
            var libraryId;
            libraryId = row.dataset.libraryId;
            return row.querySelectorAll(".catalog-listing").forEach(function(el) {
              var catalogId;
              catalogId = el.dataset.catalogId;
              return promises.push(me.cfg.setCatalogState(libraryId, catalogId, false));
            });
          });
          await Promise.all(promises);
          summary = (await me.cfg.getLibrarySummary);
          notify = me.cfg.doNotifyEvent("libraryChange");
          return notify(summary);
        });
      }
    }

    setCatalogState(resetWarningsCallback, libraryId, catalogId, catalogUrl) {
      var me;
      me = this;
      return async function(evt) {
        var catalogEnabled, url, warningDiv;
        warningDiv = resetWarningsCallback();
        url = urlutils.concat(catalogUrl, "*");
        catalogEnabled = evt.target.checked;
        await me.cfg.setCatalogState(libraryId, catalogId, catalogEnabled);
        return me.cfg.notifyEvent("catalogChange", null);
      };
    }

    async refreshSitesList(debug) {
      var allUrls, content, enabledResults, me, permissionResults, rowTemplate;
      me = this;
      content = $empty(me.root, "#sitesContainer");
      rowTemplate = fromTemplate("<div class=\"site-listing list-item\">" + "<div class=\"site-enable-action\"><input type=\"checkbox\" id=\"<%= id %>\" data-site-url=\"<%= url %>\" /></div>" + "<div class=\"site-name\"><%= name %> <%= markets %></div>" + "<div class=\"site-url\">Applies to URLs that match <b><%= url %></b></div>" + "<div class=\"site-description\"><%= description %></div>" + "</div>");
      allUrls = ALL_SITES.slice().sort(function(a, b) {
        return a.name.localeCompare(b.name);
      }).reduce(function(acc, site) {
        if (site.debug && !debug) {
          return acc;
        }
        content.appendChild(fromHTML(rowTemplate(site)));
        me.root.querySelector("#" + site.id).addEventListener("click", me.handleSiteCheckboxClick);
        acc.push(site.url);
        return acc;
      }, []);
      permissionResults = (await me.cfg.hasPermissions(allUrls));
      enabledResults = (await me.cfg.isSiteEnabledForUrls(allUrls));
      permissionResults.forEach(function(pResult) {
        var eResult, site, siteEnabled;
        eResult = enabledResults.find(function(r) {
          return r.url === pResult.url;
        });
        siteEnabled = pResult.status && eResult.status;
        site = ALL_SITES.find(function(el) {
          return el.url === pResult.url;
        });
        return me.root.querySelector("input#" + site.id).checked = siteEnabled;
      });
      me.cfg.notifyEvent("siteChange", null);
      if (content.parentNode.querySelector("#enable_all") === null) {
        content.parentNode.appendChild(fromHTML("<div class=\"col-xs-12\"><button id=\"enable_all\" class=\"nav\">Enable All</button><button id=\"disable_all\" class=\"nav\">Disable All</button></div>", "text/html"));
        content.parentNode.querySelector("#enable_all").addEventListener("click", me.handleAllSitesCheckboxClick);
        content.parentNode.querySelector("#disable_all").addEventListener("click", me.handleAllSitesCheckboxClick);
      }
      return Promise.resolve();
    }

    async handleAllSitesCheckboxClick(evt) {
      var me, newState, permissionAction, root, siteOptions, sites, urls;
      me = this;
      root = me.root.querySelector("#sitesContainer");
      urls = [];
      siteOptions = Array.from(root.querySelectorAll("input[type=checkbox]"));
      siteOptions.forEach(function(el) {
        return urls.push(el.dataset.siteUrl);
      });
      if (evt.target.id === "enable_all") {
        permissionAction = true;
      } else if (evt.target.id === "disable_all") {
        permissionAction = false;
      }
      newState = permissionAction;
      sites = siteOptions.map(function(site) {
        return site.id;
      });
      await me.cfg.setSiteEnabled(sites, newState);
      siteOptions.forEach(function(site) {
        return site.checked = newState;
      });
      return me.cfg.notifyEvent("siteChange", null);
    }

    async handleSiteCheckboxClick(evt) {
      var changed_site, me, siteEnabled, url;
      me = this;
      changed_site = ALL_SITES.find(function(el) {
        return el.id === evt.target.id;
      });
      url = changed_site.url;
      siteEnabled = evt.target.checked;
      await me.cfg.setSiteEnabled(changed_site.id, siteEnabled);
      return me.cfg.notifyEvent("siteChange", null);
    }

    refreshUIConfiguredLibraries(opts) {
      var allRows, el, libraries, me, scrollToEnd;
      libraries = opts.libraries;
      scrollToEnd = opts.scroll;
      this.refreshDebugOptions();
      me = this;
      el = $empty(me.root, "#librariesRows");
      libraries.forEach(function(library) {
        var catalogs, country_and_state, logon, logout, newRow, render_catalog, reorderLibrary, row, thisLibrary;
        thisLibrary = library;
        render_catalog = function(catalog) {
          var auth_body, checked, loggedInAs;
          checked = "";
          if (catalog.enabled) {
            checked = " checked";
          }
          auth_body = "";
          if (catalog.authentication) {
            auth_body = "<div class=\"catalog-auth\">";
            if (catalog.authentication.isAuthenticated) {
              loggedInAs = "";
              if (catalog.authentication.username) {
                loggedInAs = "<div class=\"catalog-auth-user\">Logged in as: <i>" + (catalog.authentication.username || "") + "</i></div>";
              }
              auth_body += "<div>" + loggedInAs + "<button class=\"logout\" data-catalog-id=\"" + catalog.id + "\">Logout</button></div>";
            } else {
              auth_body += "<div><button class=\"login\" data-catalog-id=\"" + catalog.id + "\" data-auth-fields=\"" + encodeURIComponent(JSON.stringify(catalog.authentication.authenticationFields)) + "\">Login</button></div>";
            }
            auth_body += "</div>";
          }
          return "<div class=\"catalog-listing\" data-catalog-id=\"" + catalog.id + "\" data-catalog-url=\"" + catalog.url + "\">" + "<div class=\"catalog-permissions-warning\"></div>" + "<div class=\"catalog-enable-action\"><input type=\"checkbox\"" + checked + "/></div>" + "<div class=\"catalog-name\">" + catalog.name + "</div>" + "<div class=\"catalog-url\"><a href=\"" + catalog.url + "\">" + catalog.url + "</a></div>" + auth_body + "</div>";
        };
        country_and_state = "";
        if (thisLibrary.stateCode) {
          country_and_state = thisLibrary.state + ", " + thisLibrary.country;
        }
        newRow = "<div class=\"row libraryNewRow list-item\" id=\"row_" + thisLibrary.id + "\" data-library-id=\"" + thisLibrary.id + "\" " + "data-catalog-url=\"" + thisLibrary.url + "\">" + "<div class=\"library-remove-action\">" + "<button class=\"nav\">Remove</button></div>" + "<div class=\"library-name\">" + thisLibrary.name + "</div>" + "<div class=\"library-location\">" + country_and_state + "</div>" + "<div class=\"library-url\"><a href=\"" + thisLibrary.url + "\">" + thisLibrary.url + "</a></div>";
        catalogs = [];
        thisLibrary.catalogs.forEach(function(catalog) {
          return catalogs.push(render_catalog(catalog));
        });
        newRow += catalogs.join("");
        newRow += "<div class=\"position-group\">";
        newRow += "<div class=\"position-item position-up\" title=\"Move library higher\">&#x25b2;</div>";
        newRow += "<div class=\"position-item position-down\" title=\"Move library lower\">&#x25bC;</div>";
        newRow += "</div>";
        newRow += "</div>";
        row = fromHTML(newRow);
        logon = row.querySelector("button.login");
        reorderLibrary = function(relative) {
          return function() {
            return me.cfg.reorderLibrary(thisLibrary.id, relative);
          };
        };
        row.querySelector(".position-up").addEventListener("click", reorderLibrary(-1));
        row.querySelector(".position-down").addEventListener("click", reorderLibrary(1));
        if (logon) {
          logon.addEventListener("click", function(e) {
            var authDialog, fields;
            fields = JSON.parse(decodeURIComponent(e.target.dataset.authFields));
            authDialog = new AuthenticationUI(me.root.querySelector('div'), me.cfg, e.target.dataset.catalogId, fields);
            return authDialog.display();
          });
        }
        logout = row.querySelector("button.logout");
        if (logout) {
          logout.addEventListener("click", async function(e) {
            var evt;
            await me.cfg.logoutCatalog(e.target.dataset.catalogId);
            evt = new Event("updateLibrary");
            return me.root.dispatchEvent(evt);
          });
        }
        return el.appendChild(row);
      });
      if (scrollToEnd) {
        me.root.querySelector("#row_" + libraries[libraries.length - 1].id).scrollIntoView();
      }
      allRows = el.querySelectorAll(".row");
      allRows.forEach(function(row) {
        var libraryId, removeButton;
        libraryId = row.dataset.libraryId;
        removeButton = row.querySelector(".library-remove-action .nav");
        removeButton.addEventListener("click", function(btn) {
          me.cfg.removeLibrary(libraryId);
          return me.root.querySelector("#row_" + libraryId).remove();
        });
        return row.querySelectorAll(".catalog-listing").forEach(function(catalogEl) {
          var catalogId, catalogUrl, resetWarnings;
          catalogUrl = catalogEl.dataset.catalogUrl;
          catalogId = catalogEl.dataset.catalogId;
          resetWarnings = function() {
            return $empty(me.root, catalogEl.querySelector(".catalog-permissions-warning"));
          };
          return catalogEl.querySelector("input").addEventListener("click", me.setCatalogState(resetWarnings, libraryId, catalogId, catalogUrl));
        });
      });
      return null;
    }

    initializeCountry(selectedCountry, state) {
      var countryEl, me, selected;
      me = this;
      countryEl = $empty(me.root, "#country");
      selected = createOptions(countryEl, me.countries, {
        default: selectedCountry,
        name: "name",
        value: "code"
      });
      return this.initializeStates(selected.code, state, selected.region_descriptor);
    }

    async initializeStates(country, selectedState, descriptor) {
      var me, regions, selected, st;
      me = this;
      if (!(country in me.regionsByCountryCode)) {
        me.regionsByCountryCode[country] = (await me.cfg.getRegionsForCountry(country));
      }
      regions = me.regionsByCountryCode[country];
      $empty(this.root, "#library");
      st = $empty(this.root, "#states");
      if (regions.length === 0) {
        me.root.querySelector("#states").style.display = "none";
        me.initializeLibraries(country);
        return;
      }
      me.root.querySelector("#states").style.display = "block";
      st.add(new Option(`Choose your ${descriptor}`, "--"));
      selected = createOptions(st, regions, {
        default: selectedState,
        value: "code",
        name: "name"
      });
      if (Object.keys(selected).length > 0) {
        return this.initializeLibraries(country, selected.code);
      }
    }

    async initializeLibraries(country, state) {
      var enabledLibraries, lib, me, resp;
      me = this;
      resp = (await me.libraryManager.getLibrariesForCountryAndState(country, state));
      enabledLibraries = resp.filter(function(row) {
        return row.enabled;
      });
      lib = $empty(me.root, "#library");
      lib.add(new Option());
      createOptions(lib, enabledLibraries, {
        value: "id",
        name: "name"
      });
      return this.root.querySelector("#library").focus();
    }

    async updateVersionStatus() {
      var checkingForUpdates, chk, me, message, permissionsIssueTemplate, problemContactingService, status, urlBase, viewReleaseNotesTemplate;
      me = this;
      urlBase = api.i18n.getMessage("webRoot");
      checkingForUpdates = api.i18n.getMessage("Config_CheckingForUpdates");
      chk = $empty(me.root, "#version_check");
      chk.appendChild(fromHTML(`<span><i class=\"fa fa-check\"></i> ${checkingForUpdates}</span>`));
      try {
        status = (await this.cfg.checkVersion());
        me.root.querySelector("#version").textContent = status.version;
        viewReleaseNotesTemplate = api.i18n.getMessage("Config_tmplViewReleaseNotes", [urlBase, status.version]);
        $empty(me.root, "#release_notes").appendChild(fromHTML(`<span> &bull; ${viewReleaseNotesTemplate}</span>`));
        $empty(chk);
        if (status.state === "error") {
          permissionsIssueTemplate = api.i18n.getMessage("Config_tmplPermissionsError", [urlBase]);
          $empty(chk);
          chk.appendChild(fromHTML(`<div class=\"warning\">\u26a0 ${permissionsIssueTemplate}</div>`));
        } else if (status.state === "ok") {
          message = api.i18n.getMessage("Config_UpToDate");
          chk.appendChild(fromHTML(`<span><i class='fa fa-check'></i> ${message}</span>`));
        } else if (status.state === "new_version") {
          message = api.i18n.getMessage("Config_tmplNewVersionAvailable", [urlBase, status.version]);
          chk.appendChild(fromHTML(`<span><i class='fa fa-info'></i> ${message}</span>`));
        }
      } catch (error) {
        problemContactingService = api.i18n.getMessage("Config_tmplProblemContactingService", [urlBase]);
        $empty(chk);
        chk.appendChild(fromHTML(`<span><i class='fa-solid fa-triangle-exclamation'></i></span> ${problemContactingService}`));
      }
      return chk.querySelectorAll("a").forEach(function(el) {
        return el.addEventListener('click', function(e) {
          return chrome.tabs.create({
            url: e.currentTarget.href
          });
        });
      });
    }

    updateLibraryDataLastChecked(data) {
      var action, el, lastRefreshTimeMessage, me, nextRefreshTimeMessage, refresh;
      me = this;
      nextRefreshTimeMessage = "";
      lastRefreshTimeMessage = "";
      if (data.lastRefresh) {
        lastRefreshTimeMessage = "Library data last checked " + friendlyTime(data.lastRefresh) + ". ";
      }
      if (data.nextRefresh) {
        nextRefreshTimeMessage = "Library data will next be updated " + friendlyTime(data.nextRefresh) + ". ";
      }
      el = $empty("#library_data_msg");
      el.appendChild(fromHTML("<span>" + lastRefreshTimeMessage + nextRefreshTimeMessage + "<span class=\"library_data_action\">Check now</span></span>"));
      action = el.querySelector("span.library_data_action");
      refresh = async function() {
        action.classList.remove("library_data_action");
        action.textContent = "Checking for updates ...";
        data = (await me.cfg.updateLibraryDataNow(me));
        return me.updateLibraryDataLastChecked(data);
      };
      return action.addEventListener("click", refresh, {
        once: true
      });
    }

    async initializeSearchCombo() {
      var configurationSettings, data, defaultCountry, defaultState, me, notify, res;
      me = this;
      me.regionsByCountryCode = {};
      me.countries = (await me.cfg.getCountries());
      configurationSettings = (await this.cfg.getJSONConfig("settings"));
      defaultCountry = configurationSettings && configurationSettings.lastCountry;
      defaultState = configurationSettings && configurationSettings.lastState;
      if (!defaultCountry) {
        defaultCountry = navigator.language.split("-")[1];
        if (!me.countries || !me.countries.find(function(el) {
          return el.code === defaultCountry;
        })) {
          defaultCountry = "US";
        }
      }
      me.initializeCountry(defaultCountry, defaultState);
      data = {
        country: defaultCountry,
        state: defaultState
      };
      if (data && data.state) {
        me.initializeLibraries(data.country, data.state);
      }
      res = (await me.cfg.getLibrarySummary());
      notify = me.cfg.doNotifyEvent("libraryChange");
      notify(res);
      me.root.querySelector("#add_library").addEventListener("click", function(_evt) {
        var selected;
        selected = me.root.querySelector("#library").value;
        if (selected.length > 0) {
          return me.cfg.addLibrary(selected);
        }
      });
      me.root.querySelector("#states").addEventListener("input", async function(evt) {
        var countryEl, selectedCountry, selectedState, settings;
        countryEl = me.root.querySelector("#country");
        selectedCountry = countryEl[countryEl.selectedIndex].name;
        selectedState = evt.target[evt.target.selectedIndex].name;
        if (selectedState !== "--") {
          settings = (await me.cfg.getJSONConfig("settings"));
          settings.lastState = selectedState;
          console.log("Setting state configuration to " + JSON.stringify(settings));
          me.cfg.setJSONConfig("settings", settings);
        }
        return me.initializeLibraries(selectedCountry, selectedState);
      });
      return me.root.querySelector("#country").addEventListener("input", async function(evt) {
        var settings, target;
        target = evt.target[evt.target.selectedIndex];
        settings = (await me.cfg.getJSONConfig("settings"));
        settings.lastCountry = target.name;
        settings.lastState = void 0;
        console.log("Setting country configuration to " + JSON.stringify(settings));
        me.cfg.setJSONConfig("settings", settings);
        me.initializeStates(target.name, null, target.dataset.region_descriptor);
        return me.root.querySelector("#states").focus();
      });
    }

    initializeViewSwitcher() {
      var me;
      me = this;
      this.root.querySelectorAll("#view li").forEach(function(el) {
        return el.addEventListener("click", function(evt) {
          var target;
          me.root.querySelectorAll("#view li").forEach(function(view) {
            return view.classList.remove("selected");
          });
          evt.currentTarget.classList.add("selected");
          target = evt.currentTarget.getAttribute("data-target");
          me.root.querySelectorAll("#main-column .cell").forEach(function(view) {
            return view.classList.remove("selected");
          });
          return me.root.querySelector("#main-column #" + target + ".cell").classList.add("selected");
        });
      });
      return Promise.resolve();
    }

    closeDialog(evt) {
      if (this.root.querySelectorAll("#libraries div.libraryNewRow").length === 0) {
        this.root.querySelector("#add_library").click();
      }
      if (typeof safari !== "undefined" && safari !== null) {
        return safari.self.hide();
      } else {
        return window.close();
      }
    }

  };

  ConfigurationProxy = class ConfigurationProxy {
    constructor(conn) {
      this.execute = this.execute.bind(this);
      this.isDebugMode = this.isDebugMode.bind(this);
      this.readConfig = this.readConfig.bind(this);
      this.saveConfig = this.saveConfig.bind(this);
      this.getJSONConfig = this.getJSONConfig.bind(this);
      this.setJSONConfig = this.setJSONConfig.bind(this);
      this._conn = conn;
    }

    _promised(action, payload) {
      return this._conn.sendRequest({
        action: action,
        data: payload
      });
    }

    execute(action, payload) {
      return this._promised(action, payload || {});
    }

    isDebugMode() {
      return this._promised("config_isDebugMode");
    }

    readConfig(key, _default = "") {
      var payload;
      payload = {
        key: key,
        default: _default
      };
      return this._promised("config_readConfig", payload);
    }

    saveConfig(key, value) {
      var payload;
      payload = {
        key: key,
        value: value
      };
      return this._promised("config_saveConfig", payload);
    }

    getJSONConfig(key) {
      var payload;
      payload = {
        key: key
      };
      return this._promised("config_getJSONConfig", payload);
    }

    setJSONConfig(key, value) {
      var payload;
      payload = {
        key: key,
        value: value
      };
      return this._promised("config_setJSONConfig", payload);
    }

  };

  Configuration = class Configuration {
    constructor(proxy = null) {
      this.addEventListener = this.addEventListener.bind(this);
      this.doNotifyEvent = this.doNotifyEvent.bind(this);
      this.notifyEvent = this.notifyEvent.bind(this);
      this.getSettingsConfig = this.getSettingsConfig.bind(this);
      this.setSettingsConfig = this.setSettingsConfig.bind(this);
      this.logoutCatalog = this.logoutCatalog.bind(this);
      this.loginForCatalog = this.loginForCatalog.bind(this);
      this.updateLibraryDataNow = this.updateLibraryDataNow.bind(this);
      this.addLibrary = this.addLibrary.bind(this);
      this.refreshLibraries = this.refreshLibraries.bind(this);
      this.removeLibrary = this.removeLibrary.bind(this);
      this.reorderLibrary = this.reorderLibrary.bind(this);
      this.setCatalogState = this.setCatalogState.bind(this);
      this.getLibrarySummary = this.getLibrarySummary.bind(this);
      this.getCountries = this.getCountries.bind(this);
      this.getRegionsForCountry = this.getRegionsForCountry.bind(this);
      this.hasPermissions = this.hasPermissions.bind(this);
      this.isSiteEnabledForUrl = this.isSiteEnabledForUrl.bind(this);
      this.isSiteEnabledForUrls = this.isSiteEnabledForUrls.bind(this);
      this.setSiteEnabled = this.setSiteEnabled.bind(this);
      this.readConfig = this.readConfig.bind(this);
      this.checkVersion = this.checkVersion.bind(this);
      this.checkLastLibraryDataFetch = this.checkLastLibraryDataFetch.bind(this);
      this.isDebug = this.isDebug.bind(this);
      this.saveConfig = this.saveConfig.bind(this);
      this.getJSONConfig = this.getJSONConfig.bind(this);
      this.setJSONConfig = this.setJSONConfig.bind(this);
      this.getCurrentLibraryConfiguration = this.getCurrentLibraryConfiguration.bind(this);
      this._proxy = proxy;
      this.eventListeners = {};
    }

    addEventListener(evt, callback) {
      this.eventListeners[evt] = this.eventListeners[evt] || [];
      return this.eventListeners[evt].push(callback);
    }

    doNotifyEvent(evt, defaults) {
      var me;
      me = this;
      return function(data) {
        var opts;
        opts = Object.assign({}, defaults, data);
        return me.notifyEvent(evt, opts);
      };
    }

    notifyEvent(evt, data) {
      var handlers;
      handlers = this.eventListeners[evt] || [];
      return handlers.forEach(function(cb) {
        try {
          return cb(data);
        } catch (error) {

        }
      });
    }

    getSettingsConfig(key) {
      var payload;
      payload = {
        key: key
      };
      return this._proxy.execute("config_getSettingsConfig", payload);
    }

    setSettingsConfig(key, value) {
      var payload;
      payload = {
        key: key,
        value: value
      };
      return this._proxy.execute("config_setSettingsConfig", payload);
    }

    logoutCatalog(catalog) {
      return this._proxy.execute("logoutCatalog", {
        catalog: catalog
      });
    }

    loginForCatalog(catalog, username, password) {
      return this._proxy.execute("loginForCatalog", {
        catalog: catalog,
        username: username,
        password: password
      });
    }

    async updateLibraryDataNow(ui) {
      var data, evt, me;
      me = this;
      data = (await this._proxy.execute("update_library_data_now"));
      evt = new Event("updateLibrary");
      ui.root.dispatchEvent(evt);
      return data;
    }

    async addLibrary(libraryId) {
      var me, result;
      me = this;
      if (!libraryId || (Array.isArray(libraryId) && (libraryId.length === 0 || libraryId[0] === null))) {
        return Promise.resolve(false);
      }
      result = (await this._proxy.execute("addLibrary", {
        library_id: libraryId
      }));
      if (result.ok && result.config.libraries) {
        me.notifyEvent("addLibrary", result.config);
        me.notifyEvent("libraryChange", null);
        await me.getCurrentLibraryConfiguration();
      }
      return result.ok;
    }

    async refreshLibraries(libraryId) {
      var me, result;
      me = this;
      if (!libraryId || (Array.isArray(libraryId) && (libraryId.length === 0 || libraryId[0] === null))) {
        return Promise.resolve(false);
      }
      result = (await this._proxy.execute("refreshLibraries", {
        library_id: libraryId
      }));
      if (result.ok && result.config.libraries) {
        me.notifyEvent("addLibrary", result.config);
        me.notifyEvent("libraryChange", null);
        await me.getCurrentLibraryConfiguration();
      }
      return result.ok;
    }

    async removeLibrary(libraryId) {
      var me, result;
      me = this;
      if (!libraryId || (Array.isArray(libraryId) && (libraryId.length === 0 || libraryId[0] === null))) {
        return Promise.resolve(false);
      }
      result = (await this._proxy.execute("removeLibrary", {
        library_id: libraryId
      }));
      if (result.ok && result.config) {
        me.notifyEvent("removeLibrary", result.config);
        me.notifyEvent("libraryChange", null);
        await me.getCurrentLibraryConfiguration();
      }
      return result.ok;
    }

    async reorderLibrary(libraryId, relativeMove) {
      var me, result;
      me = this;
      result = (await this._proxy.execute("reorderLibrary", {
        library_id: libraryId,
        relative_move: relativeMove
      }));
      if (result.ok && result.config) {
        me.notifyEvent("updateLibrary", result.config);
      }
      return result.ok;
    }

    setCatalogState(libraryId, catalogId, state) {
      return this._proxy.execute("setCatalogState", {
        libraryId: libraryId,
        catalogId: catalogId,
        state: state
      });
    }

    async getLibrarySummary() {
      var data;
      data = (await this._proxy.execute("getLibrarySummary"));
      return {
        libraries: data
      };
    }

    getCountries() {
      return this._proxy.execute("getCountries");
    }

    getRegionsForCountry(countryCode) {
      return this._proxy.execute("getRegionsForCountry", {
        countryCode: countryCode
      });
    }

    hasPermissions(urls) {
      return this._proxy.execute("hasPermissions", {
        urls: urls
      });
    }

    isSiteEnabledForUrl(url) {
      return this._proxy.execute("isSiteEnabledForUrl", {
        url: url
      });
    }

    isSiteEnabledForUrls(urls) {
      return this._proxy.execute("isSiteEnabledForUrls", {
        urls: urls
      });
    }

    setSiteEnabled(site_id, state) {
      return this._proxy.execute("setSiteEnabled", {
        site_id: site_id,
        state: state
      });
    }

    readConfig(key, _default = "") {
      return this._proxy.readConfig(key, _default);
    }

    checkVersion() {
      return this._proxy.execute("version_check");
    }

    checkLastLibraryDataFetch() {
      return this._proxy.execute("get_last_library_data_fetch");
    }

    isDebug() {
      return this._proxy.isDebugMode().catch(function(res) {
        return false;
      });
    }

    saveConfig(key, value) {
      logger.debug(`Saving ${key}: ${value}`);
      return this._proxy.saveConfig(key, value);
    }

    getJSONConfig(key) {
      return this._proxy.getJSONConfig(key);
    }

    setJSONConfig(key, value) {
      return this._proxy.setJSONConfig(key, value);
    }

    async getCurrentLibraryConfiguration() {
      var data;
      data = (await this.getJSONConfig("libraries"));
      this.notifyEvent("libraryConfig", data);
      return data;
    }

  };

  specialCatalog = function(name, id_, imgConfig) {
    return function(ui) {
      return {
        listen: function(data) {
          var child, desc, el, img, imgPath, note;
          el = ui.root.querySelector("#specialCatalogs");
          child = $empty(el, "#" + id_);
          if (child) {
            child.remove();
          }
          if (!data.enabled_libraries || data.enabled_libraries.indexOf(id_) < 0) {
            el.style.display = "block";
            el.querySelector(".message").textContent = "The following catalogs are available to most users:";
            desc = name + " results to the Library Extension";
            img = "";
            if (imgConfig) {
              if (imgConfig.img) {
                imgPath = extRoot + imgConfig.img;
                img = `<img class=\"${imgConfig.class || ''}\" src=\"${imgPath}\" />`;
              }
              if (imgConfig.skiptext) {
                desc = "";
              }
            }
            note = fromHTML("<div id=\"" + id_ + "\">" + "<div class=\"centered\"><button id=\"add_" + id_ + "\">Add " + img + desc + "</button></div>" + "</div>");
            el.appendChild(note);
            return el.querySelector("#add_" + id_).addEventListener("click", function() {
              return ui.cfg.addLibrary(id_);
            });
          }
        }
      };
    };
  };

  HooplaSettings = specialCatalog("Hoopla", "hoopla", {
    img: "images/hoopla-49x21.png",
    skiptext: true
  });

  ArchiveOrgSettings = specialCatalog("(archive.org)", "archive_org", {
    img: "images/openlibrary-logo-tighter.svg",
    class: "openlibrary_logo"
  });

  NLSBardSettings = specialCatalog("NLS Bard", "nlsbard");

  EverandSettings = specialCatalog("Everand", "everand");

  AnyplaySettings = specialCatalog("Anyplay.fm", "anyplay");

  LibroFMSettings = specialCatalog("Libro.fm", "librofm");

  BookmateSettings = specialCatalog("Bookmate", "bookmate");

  KoboPlusSettings = specialCatalog("Kobo Plus", "koboplus");

  initialize = async function(doc, configurationModules, settingsModules) {
    var cfg, cfgp, conn, data, defaultConfig, ui;
    logger.debug("Initializing configuration...");
    conn = new Connection();
    cfgp = new ConfigurationProxy(conn);
    cfg = new Configuration(cfgp);
    ui = new ConfigurationUI(doc, cfg, configurationModules);
    ui.updateVersionStatus();
    cfg.checkLastLibraryDataFetch().then(function(data) {
      return ui.updateLibraryDataLastChecked(data);
    });
    data = (await cfg.getCurrentLibraryConfiguration());
    if (!("enabled_libraries" in data)) {
      defaultConfig = {
        "enabled_libraries": []
      };
      await cfg.setJSONConfig("libraries", defaultConfig);
    }
    return ui.initialize(settingsModules);
  };

  SettingsModules = [LibraryLinkSetting, SearchModeSetting, ShowBindingIconSetting, MultipleResultsSetting, GoodReadsListSetting, BindingFilterSetting, LibbySetting];

  unitTestable(SettingsModules, "SettingsModules");

  unitTestable(Configuration);

  unitTestable(ConfigurationUI);

  unitTestable(ConfigurationProxy);

  unitTestable(AuthenticationUI);

  unitTestable(LibraryManager);

  unitTestable(BooleanTransformer);

  unitTestable(HooplaSettings, "HooplaSettings");

  unitTestable(ArchiveOrgSettings, "ArchiveOrgSettings");

  unitTestable(NLSBardSettings, "NLSBardSettings");

  unitTestable(AnyplaySettings, "AnyplaySettings");

  unitTestable(LibroFMSettings, "LibroFMSettings");

  unitTestable(EverandSettings, "EverandSettings");

  unitTestable(KoboPlusSettings, "KoboPlusSettings");

  unitTestable(BookmateSettings, "BookmateSettings");

  unitTestable(MultipleResultsSetting);

  unitTestable(GoodReadsListSetting);

  unitTestable(BindingFilterSetting);

  unitTestable(LibbySetting);

  if (!isUnitTestMode) {
    configurationModules = [];
    configurationModules.push(HooplaSettings);
    configurationModules.push(ArchiveOrgSettings);
    configurationModules.push(NLSBardSettings);
    configurationModules.push(AnyplaySettings);
    configurationModules.push(LibroFMSettings);
    configurationModules.push(EverandSettings);
    configurationModules.push(BookmateSettings);
    configurationModules.push(KoboPlusSettings);
    document.addEventListener("DOMContentLoaded", function() {
      return initialize(document, configurationModules, SettingsModules);
    });
  }

  // END src/config.coffee

}).call(this);
