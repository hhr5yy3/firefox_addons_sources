(function() {
  // BEGIN src/background.coffee
  var $toFragment, $toXMLFragment, ALL_SITES, ActivePages, ActiveRequests, AnyplayCatalog, ApacheSolrDOMOperations, ApacheSolrLibrary, ArchiveOrgCatalog, ArchiveOrgDOMOperations, AtriuumLibrary, AutoGraphicsLibrary, AxielArenaCatalog, AxielArenaDOMOperations, Axis360DOMOperations, Axis360DigitalLibrary, BackgroundApplication, BackgroundRefresh, BiblioCommonsDOMOperations, BiblioCommonsLibrary, BiblionixDOMOperations, BiblionixLibrary, BookmateCatalog, BorrowBoxDOMOperations, BorrowBoxDigitalLibrary, BrooklynCatalog, CapitaDOMOperations, CapitaLibrary, Catalog, ChamoDOMOperations, ChamoLibrary, CloudLibraryCatalog, CommonBrowser, CounterFactory, DOMOperations, Dispatch, DrupalDOMOperations, DrupalLibrary, EncoreDOMOperations, EncoreLibrary, ErrorContext, ErrorManager, EverandCatalog, EvergreenLibrary, EvergreenResponse, EvergreenResponseFromResp, ExLibrisPrimoLibrary, FollettDestinyDOMOperations, FollettDestinyLibrary, FollettDestinyQuestLibrary, FollettDiscoverLibrary, HooplaLibrary, HttpRequest, IIIVegaLibrary, IPac20DOMOperations, IPac20Library, IguanaDOMOperations, IguanaLibrary, InMediaCMS, ItemIdSearches, JSONPath, KoboPlusCatalog, KoboPlusDOMOperations, KohaDOMOperations, KohaLibrary, KohaV2Library, LOG_LEVELS, LOG_LEVEL_TEXT, LS2Pac2Library, LiberoCatalog, LiberoDOMOperations, Library, LibraryConfigurationComparitor, LibraryDataCache, LibraryResults, LibrarySummary, LibroFMCatalog, LocalStorageShim, Logger, MontageDOMOperations, MontageLibrary, NLSBardCatalog, NLSBardDOMOperations, NoneLibrary, OCLCWiseLibrary, OverdriveDOMOperations, OverdriveDigitalLibrary, PolarisDOMOperations, PolarisLibrary, Request, RequestFactory, SirsiDynixCatalog, SirsiDynixDOMOperations, SirsiDynixEnterpriseDOMOperations, SirsiDynixV2Catalog, SiteManager, SpydusDOMOperations, SpydusLibrary, TinycatCatalog, TinycatDOMOperations, TorontoPublicLibrary, TorontoPublicLibraryDOMOperations, VoebbCatalog, VoebbDOMOperations, VufindDOMOperations, VufindLibrary, WHITESPACE, WebPacProDOMOperations, WebPacProLibrary, WebPacProStrategies, WebVoyageDOMOperations, WebVoyageLibrary, WheelersDOMOperations, WheelersDigitalLibrary, WorldcatCatalog, WorldcatDOMOperations, Z3950Record, Z3950RecordSet, Z3950TagMap, _maxSessionsPromptReviewMode, _maxWriteReviewDisplayPerSession, _parser, anyBeginsWith, api, authorArtistRegEx, browserFetch, browserShim, byRegEx, catalogMap, cleanArray, cleanArrayGenerator, cleanupPermissionUrl, commonBindingMappings, compareComponents, compareSortedComponents, compareText, createNonLibraryCatalog, digitsOnly, ensureBrowser, findAllMatchingNodes, findFirstMatchingNode, findWinningStrategy, friendlyTime, fromHTML, fromHTMLTemplate, fromTemplate, hashToList, illustratorRegEx, initializeCatalog, initializeInstances, initializeLibrary, isBinding, isUnitTestMode, localStorageShim, logger, nodeListToArray, noop_fn, normalizeAuthor, normalizeAuthorPrefix_re, normalizeTitle, normalizeTitlePrefix_re, parseAuthorAndTitleBySlash, parseBoolean, parseResponse, parseToFragment, permissionContains, permissionRemove, permissionRequest, pluck, pluralize, publishedRegEx, register, registerDOMOperations, registerNonLibraryCatalog, remove_paren_re, replacementChars, safeChars_re, sanitizeTitle, sessionStorageShim, setupConnections, setutils, singularize, specialCatalogs, splitAndNormalizeTitle, statusCodeCallback, stripHtml, stripTags, templateFilters, textFromElement, toQueryString, txtLower, uniqueArray, unitTestable, urlutils, validateISBN, validateISBN13, webrequestHelpers,
    indexOf = [].indexOf,
    boundMethodCheck = function(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new Error('Bound instance method accessed before binding'); } };

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

  // BEGIN src/browser.coffee

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
      } catch (error1) {
        ex = error1;
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
      var n, ref, results1;
      results1 = [];
      for (num = n = 0, ref = maxlength - 2; (0 <= ref ? n <= ref : n >= ref); num = 0 <= ref ? ++n : --n) {
        results1.push(parseInt(isbn[num]) * (maxlength - num));
      }
      return results1;
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
    var checkdigit, even_digits, len, len1, maxlength, n, num, o, odd_digits, v, value;
    if ((typeof isbn) !== "string") {
      return false;
    }
    maxlength = 13;
    isbn = digitsOnly(isbn);
    if (isbn.length !== maxlength) {
      return false;
    }
    even_digits = (function() {
      var n, ref, results1;
      results1 = [];
      for (num = n = 0, ref = maxlength - 2; n <= ref; num = n += 2) {
        results1.push(parseInt(isbn[num]));
      }
      return results1;
    })();
    odd_digits = (function() {
      var n, ref, results1;
      results1 = [];
      for (num = n = 1, ref = maxlength - 2; n <= ref; num = n += 2) {
        results1.push(parseInt(isbn[num]) * 3);
      }
      return results1;
    })();
    value = 0;
    for (n = 0, len = even_digits.length; n < len; n++) {
      v = even_digits[n];
      value += v;
    }
    for (o = 0, len1 = odd_digits.length; o < len1; o++) {
      v = odd_digits[o];
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
    var elemA, len, localA, localB, matches, n, position, tmp;
    localA = arrayA.slice(0);
    localB = arrayB.slice(0);
    if (localA.length > localB.length) {
      tmp = localA;
      localA = localB;
      localB = tmp;
    }
    position = 0;
    matches = 0;
    for (n = 0, len = localA.length; n < len; n++) {
      elemA = localA[n];
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
    var author, cleanNames, len, line, lines, n, name, names, oldline, removeBy, removePublished, resultLines;
    if (origAuthor === null || origAuthor === void 0) {
      return origAuthor;
    }
    lines = origAuthor.trim().split("\n");
    resultLines = [];
    for (n = 0, len = lines.length; n < len; n++) {
      line = lines[n];
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
    var i, j, len, len1, n, o;
    text = text || "";
    text = text.toLowerCase();
    for (n = 0, len = arr.length; n < len; n++) {
      i = arr[n];
      if (text.indexOf(i.toLowerCase()) === 0) { // > -1
        if (exclusions != null) {
          for (o = 0, len1 = exclusions.length; o < len1; o++) {
            j = exclusions[o];
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
      } catch (error1) {
        exc = error1;
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
      var active_pages, cur_port, len, n, ref;
      active_pages = "";
      ref = Object.keys(this.pages);
      for (n = 0, len = ref.length; n < len; n++) {
        cur_port = ref[n];
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
        } catch (error1) {
          ex = error1;
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
          } catch (error1) {
            ex = error1;
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
      } catch (error1) {
        exc = error1;
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

  // BEGIN src/request.coffee
  Request = function(plugin, url) {
    if (plugin && url) {
      this.isbn = plugin.getIsbn(url) || [];
      this.isbn13 = plugin.getIsbn13(url) || [];
      this.title = plugin.getTitle();
      this.category = plugin.getCategory();
      this.authors = plugin.getAuthors();
    }
    this.callback = null;
    return this.tab = null;
  };

  unitTestable(Request);

  // END src/request.coffee

  // BEGIN src/libraries.coffee

  // BEGIN src/utilities/service_worker.coffee
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

  $toXMLFragment = parseToFragment("text/xml");

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

  textFromElement = function(el) {
    if (el && el instanceof Node) {
      return el.textContent.trim();
    }
    if (el && typeof el === "string") {
      return el.trim();
    }
    return null;
  };

  parseResponse = async function(opts, raw, customParsers) {
    var parsers, res, values, xfrms;
    if (typeof raw !== "string") {
      return raw;
    }
    parsers = {
      "html": $toFragment,
      "xml": $toXMLFragment,
      "json": JSON.parse,
      "noop": noop_fn
    };
    if (customParsers) {
      parsers = Object.assign({}, parsers, customParsers());
    }
    xfrms = (opts.xfrm || '').split(',');
    if (xfrms.indexOf("noop") < 0) {
      xfrms.push("noop");
    }
    res = xfrms.map(async function(xfrm) {
      try {
        if (parsers[xfrm]) {
          return (await parsers[xfrm](raw, parsers));
        }
      } catch (error1) {
        return null;
      }
    });
    values = (await Promise.all(res));
    return values.reduce(function(resp, el) {
      if (resp) {
        return resp || null;
      }
      if (el) {
        return el || null;
      }
      return null;
    }, null);
  };

  stripHtml = function(content) {
    var noHtml, stripHtmlRe;
    stripHtmlRe = /<body>(.*)<\/body>/g;
    noHtml = stripHtmlRe.exec(content);
    if (noHtml) {
      content = noHtml[1];
    }
    return content;
  };

  stripTags = function(content) {
    var t;
    t = fromHTML("<div>" + content + "</div>");
    return t.textContent || t.innerText || "";
  };

  unitTestable(stripTags);

  unitTestable(parseResponse);

  unitTestable($toFragment, "$toFragment");

  unitTestable($toXMLFragment, "$toXMLFragment");

  unitTestable(textFromElement);

  unitTestable(fromHTML);

  unitTestable(fromHTMLTemplate);

  // END src/utilities/service_worker.coffee
  statusCodeCallback = function(me, url, request) {
    return function(statusCode, headers) {
      var failureDetails, ok;
      failureDetails = {
        request: {
          url: url,
          reply: request.reply
        },
        search_request: request,
        response: {
          code: statusCode,
          headers: headers
        }
      };
      ok = true;
      if (statusCode === 500) {
        ok = false;
        failureDetails.response.statusText = "http_500_server_error";
        failureDetails.response.explanation = "server_error";
        failureDetails.reportToUser = true;
      } else if (statusCode === 404) {
        ok = false;
        failureDetails.response.statusText = "http_404_not_found";
        failureDetails.response.explanation = "not_found";
        failureDetails.reportToUser = true;
      } else if (statusCode === 503) {
        ok = false;
        failureDetails.response.statusText = "http_503_server_unavailable";
        failureDetails.response.explanation = "503_server_unavailable";
        failureDetails.reportToUser = true;
      } else if (statusCode === 504) {
        ok = false;
        failureDetails.response.statusText = "http_504_proxy_timeout";
        failureDetails.response.explanation = "504_proxy_timeout";
        failureDetails.reportToUser = true;
      } else if (statusCode === 429) {
        ok = false;
        failureDetails.response.statusText = "http_429_rate_limit";
        failureDetails.response.explanation = "429_rate_limit";
        failureDetails.reportToUser = true;
      }
      if (!ok) {
        me.app.report_failure(me, failureDetails);
      }
      return ok;
    };
  };

  HttpRequest = class HttpRequest {
    constructor(app, browser, catalog) {
      this.call = this.call.bind(this);
      this.buildRequestHeaders = this.buildRequestHeaders.bind(this);
      this.app = app;
      this.browser = browser;
      this.catalog = catalog;
      this.libraryInfo = {
        libraryId: catalog.getLibraryId(),
        catalogId: catalog.getCatalogId(),
        catalogUrl: catalog.catalogUrl,
        fetch: catalog._fetch,
        maxParallelRequests: catalog.getMaxParallelRequests()
      };
    }

    call(opts) {
      var fullurl, me, method, request_param;
      me = this;
      method = (opts.body != null) ? "POST" : "GET";
      fullurl = /(https?):\/\//.exec(opts.url) ? opts.url : `${me.libraryInfo.catalogUrl}${opts.url}`;
      logger.debug(`${method} ${fullurl} <= ${opts.body}`);
      request_param = {
        method: method,
        body: opts.body,
        headers: this.buildRequestHeaders(opts.headers, opts.body),
        credentials: "include"
      };
      return me.browser.fetch(me.libraryInfo, fullurl, request_param, statusCodeCallback(me.catalog, fullurl, opts.request)).then(async function(resp) {
        var body, exc, failureDetails, rv;
        try {
          if (resp.hasOwnProperty("body")) {
            body = (await parseResponse(opts, resp.body));
            if (typeof body === "string") {
              body = body.trim();
            }
            rv = {
              body: body,
              headers: resp.headers,
              http: resp
            };
            return rv;
          } else {
            failureDetails = {};
            failureDetails.url = fullurl;
            failureDetails.statusText = "request_error";
            failureDetails.explanation = resp;
            failureDetails.request = opts.request;
            failureDetails.data = "";
            failureDetails.exception = exc;
            failureDetails.reportToUser = true;
            return me.app.report_failure(me.catalog, failureDetails);
          }
        } catch (error1) {
          exc = error1;
          failureDetails = {};
          failureDetails.url = fullurl;
          failureDetails.statusText = "server_error";
          failureDetails.explanation = exc.message;
          failureDetails.request = opts.request;
          failureDetails.data = resp.body;
          failureDetails.exception = exc;
          return me.app.report_failure(me.catalog, failureDetails);
        }
      }, function(failure) {
        var failureDetails;
        failureDetails = {};
        failureDetails.url = fullurl;
        failureDetails.statusText = "failed_request_maybe_dns";
        failureDetails.explanation = "promise_rejected_as_failed_request";
        failureDetails.request = opts.request;
        failureDetails.data = failure;
        me.app.report_failure(me.catalog, failureDetails);
        return Promise.reject({
          message: "InaccessibleUrl"
        });
      });
    }

    buildRequestHeaders(requestHeaders, params) {
      var allRequestHeaders, commonHeaders, ref, res;
      commonHeaders = (ref = this.catalog.commonHeaders) != null ? ref : [];
      requestHeaders = requestHeaders != null ? requestHeaders : [];
      allRequestHeaders = commonHeaders.concat(requestHeaders);
      res = allRequestHeaders.reduce(function(acc, item) {
        if (item[0] === "Content-Type") {
          acc.contentType = item[1];
        } else {
          acc.headers.append(item[0], item[1]);
        }
        return acc;
      }, {
        headers: new Headers(),
        contentType: "application/x-www-form-urlencoded"
      });
      if (params != null) {
        res.headers.set("Content-Type", res.contentType);
      }
      return res.headers;
    }

  };

  RequestFactory = class RequestFactory {
    create(app, browser, catalog) {
      return new HttpRequest(app, browser, catalog);
    }

  };

  Library = class Library {
    constructor() {
      this.setReason = this.setReason.bind(this);
      this.setApplication = this.setApplication.bind(this);
      this.getLibraryId = this.getLibraryId.bind(this);
      this.getCatalogId = this.getCatalogId.bind(this);
      this.getLastUpdated = this.getLastUpdated.bind(this);
      this.getETag = this.getETag.bind(this);
      this.getTermPriority = this.getTermPriority.bind(this);
      this.transformRequestSearchTerms = this.transformRequestSearchTerms.bind(this);
      this.setKeyValue = this.setKeyValue.bind(this);
      this.getKey = this.getKey.bind(this);
      this.getLastSearchTerm = this.getLastSearchTerm.bind(this);
      this.setSearchTerms = this.setSearchTerms.bind(this);
      this.setData = this.setData.bind(this);
      this.getData = this.getData.bind(this);
      this.setLibraryId = this.setLibraryId.bind(this);
      this.chooseNextEligibleSearchTerm = this.chooseNextEligibleSearchTerm.bind(this);
      this.hasAnyRemainingSearchTerm = this.hasAnyRemainingSearchTerm.bind(this);
      this.getNextSearchTerm = this.getNextSearchTerm.bind(this);
      this.searchForCopyByTerms = this.searchForCopyByTerms.bind(this);
      this._filterParsedInventoryResults = this._filterParsedInventoryResults.bind(this);
      this.setEnabled = this.setEnabled.bind(this);
      this.isEnabled = this.isEnabled.bind(this);
      this.getLibraryInformation = this.getLibraryInformation.bind(this);
      this.handleDisabledCatalog = this.handleDisabledCatalog.bind(this);
      this.handleInaccessibleUrl = this.handleInaccessibleUrl.bind(this);
      this.searchHoldings = this.searchHoldings.bind(this);
      this.checkAvailabilityForSingleItem = this.checkAvailabilityForSingleItem.bind(this);
      this.processInventoryLookup = this.processInventoryLookup.bind(this);
    }

    toJSON() {
      return void 0;
    }

    setReason(reason) {
      return this.reason = reason;
    }

    setApplication(app) {
      return this.app = app;
    }

    getLibraryId() {
      return this.libraryId.split('_')[0];
    }

    getCatalogId() {
      return this.libraryId.split('_')[1];
    }

    getLastUpdated() {
      return this.app.AllLibraries[this.getLibraryId()].last_updated;
    }

    getETag() {
      var lastUpdated;
      lastUpdated = this.getLastUpdated();
      if (lastUpdated) {
        return "W/" + lastUpdated;
      }
    }

    getTermPriority(term) {
      var termPriority;
      if (this.supportsMultipleResults()) {
        termPriority = {
          isbn13: 100,
          isbn: 110,
          title: 10
        };
      } else {
        termPriority = {
          isbn13: 100,
          isbn: 110,
          title: 300
        };
      }
      return termPriority[term];
    }

    async transformRequestSearchTerms(request) {
      var me, requestTitle, searchTerms;
      await this.checkSupportsMultipleResults();
      searchTerms = [];
      me = this;
      if (this.canSearchByIsbn13()) {
        searchTerms = request.isbn13.reduce(function(acc, el) {
          if (validateISBN13(el)) {
            acc.push({
              by: "isbn13",
              term: el
            });
          }
          return acc;
        }, searchTerms);
      }
      if (this.canSearchByIsbn()) {
        searchTerms = request.isbn.reduce(function(acc, el) {
          if (validateISBN(el)) {
            acc.push({
              by: "isbn",
              term: el
            });
          }
          return acc;
        }, searchTerms);
      }
      requestTitle = splitAndNormalizeTitle(request.title);
      searchTerms.push({
        by: "title",
        term: requestTitle.title.trim()
      });
      if (requestTitle.subtitle) {
        searchTerms.push({
          by: "title",
          term: sanitizeTitle(request.title).trim()
        });
      }
      return searchTerms.sort(function(a, b) {
        var ap, bp;
        ap = me.getTermPriority(a.by);
        bp = me.getTermPriority(b.by);
        if (ap < bp) {
          return -1;
        }
        if (ap > bp) {
          return 1;
        }
        return 0;
      });
    }

    setKeyValue(request, key, value) {
      var dict;
      dict = request.catalogs[this.libraryId] || {};
      dict[key] = value;
      return request.catalogs[this.libraryId] = dict;
    }

    getKey(request, key) {
      var dict;
      dict = request.catalogs[this.libraryId] || {};
      return dict[key];
    }

    getLastSearchTerm(request) {
      var searchTerm;
      searchTerm = this.getKey(request, "lastSearchTerm");
      logger.debug(`[${request.searchId}] Returning search term ${searchTerm}`);
      return searchTerm;
    }

    setSearchTerms(request, searchTerms, lastSearchTerm) {
      logger.debug(`[${request.searchId}] Setting search terms to ${JSON.stringify(searchTerms)}`);
      this.setKeyValue(request, "searchTerms", searchTerms.slice());
      return this.setKeyValue(request, "lastSearchTerm", lastSearchTerm);
    }

    canSearchByIsbn() {
      return true;
    }

    canSearchByIsbn13() {
      return true;
    }

    setData(request, data) {
      logger.debug("Setting data to");
      logger.debug(data);
      return this.setKeyValue(request, "data", data);
    }

    getData(request) {
      return this.getKey(request, "data");
    }

    setLibraryId(request, id) {
      return this.setKeyValue(request, "libraryId", id);
    }

    chooseNextEligibleSearchTerm(terms) {
      var availableTerms, term;
      availableTerms = terms.slice();
      while (true) {
        term = availableTerms.shift();
        if (term === void 0) {
          return {
            term: null,
            searchTerms: availableTerms
          };
        }
        if (term.by === "isbn") {
          if (!this.canSearchByIsbn()) {
            continue;
          }
        }
        if (term.by === "isbn13") {
          if (!this.canSearchByIsbn13()) {
            continue;
          }
        }
        break;
      }
      return {
        term: term,
        searchTerms: availableTerms
      };
    }

    hasAnyRemainingSearchTerm(request) {
      var res, searchTerms;
      searchTerms = this.getKey(request, "searchTerms") || [];
      res = this.chooseNextEligibleSearchTerm(searchTerms);
      return res.term !== null;
    }

    getNextSearchTerm(request) {
      var res, searchTerms;
      searchTerms = this.getKey(request, "searchTerms") || [];
      res = this.chooseNextEligibleSearchTerm(searchTerms);
      this.setSearchTerms(request, res.searchTerms, res.term);
      return res.term;
    }

    async searchForCopyByTerms(request) {
      var me, opts, resp, term;
      me = this;
      term = me.getNextSearchTerm(request);
      if (!term) {
        logger.debug(`[${request.searchId}] No terms remaining to search, returning`);
        return false;
      }
      opts = (await me.buildSearchUrl(term.by, term.term, request));
      opts = Object.assign({}, me.http.common || {}, me.http.search || {}, opts, {
        request: request
      });
      logger.debug(`[${request.searchId}] Searching by ${opts.by}:${opts.url}`);
      try {
        resp = (await me.httpRequest(opts, request));
        return (await me.inventoryLookup(request, resp, opts));
      } catch (error1) {
        return request.reply({
          status: 'message',
          messages: [
            {
              status: 'message',
              icon: 'ALERT_ICON',
              content: `An error was encountered while searching the ${me.getDescription()} at ${me.libraryName} (${me.getCatalogUrl()}). Please contact support@libraryextension.com if you continue to see this message for this library and catalog.`
            }
          ]
        });
      }
    }

    async _filterParsedInventoryResults(request, results) {
      var allowMultiple, authorMismatch, bindingExactMatchForSingleResults, categoryRequiresAuthorMatch, heuristics, limitOneMatch, logStatus, me, missingId, missingTitle, noAuthorMatchesCategories, requestTitle, requiresAuthorMatch, titleMismatch;
      await this.checkSupportsMultipleResults();
      allowMultiple = this.supportsMultipleResults();
      noAuthorMatchesCategories = ["streaming", "dvd", "video", "television", "tvseason"];
      categoryRequiresAuthorMatch = noAuthorMatchesCategories.indexOf(request.category) < 0;
      requiresAuthorMatch = function(comparison) {
        var result;
        result = true;
        if (request.authors.length === 0) {
          result = false;
        }
        if (!categoryRequiresAuthorMatch && comparison.binding === "movie") {
          result = false;
        }
        if (!categoryRequiresAuthorMatch && comparison.binding === "television") {
          result = false;
        }
        return result;
      };
      if (!Array.isArray(results)) {
        return results;
      }
      requestTitle = splitAndNormalizeTitle(request.title);
      requestTitle = {
        title: cleanArray(requestTitle.title.split(" ")),
        subtitle: cleanArray((requestTitle.subtitle || "").split(" "))
      };
      logger.info(`[${request.searchId}] Filtering through ${results.length} results...`);
      logStatus = function(el, status) {
        return logger.debug(`[${request.searchId}] ${status} || Title [${el.title}/${el.subtitle}] | Author [${el.author}] | Binding [${el.binding}]`);
      };
      me = this;
      limitOneMatch = function(state, item) {
        if (!allowMultiple && state.matches.length > 0) {
          return {
            'reason': 'only one match permitted'
          };
        }
      };
      missingId = function(state, item) {
        if (!item.hasOwnProperty("id")) {
          return {
            'reason': 'missing id'
          };
        }
      };
      missingTitle = function(state, item) {
        if (!item.title) {
          return {
            'reason': 'missing title'
          };
        }
      };
      authorMismatch = function(state, item) {
        var authors;
        if (!requiresAuthorMatch(item)) {
          return;
        }
        if (!item.author) {
          return;
        }
        authors = item.author;
        if (!Array.isArray(authors)) {
          authors = [authors];
        }
        state.values.authorMatch = authors.reduce(function(acc, el) {
          var match, resultAuthor;
          if (acc >= 0.5) {
            return acc;
          }
          resultAuthor = normalizeAuthor(el).split(" ");
          match = request.authors.reduce(function(inner, inner_el) {
            if (inner >= 0.5) {
              return inner;
            }
            return compareSortedComponents(inner_el.split(" "), resultAuthor);
          }, 0);
          if (match > acc) {
            return match;
          }
          return acc;
        }, 0);
        if (state.values.authorMatch < 0.5) {
          return {
            'reason': `author mismatch (score: ${state.authorMatch}) :: actual ${JSON.stringify(authors)}, expected any of ${JSON.stringify(request.authors)}`
          };
        }
      };
      titleMismatch = function(state, item) {
        var leftTitle, match, resultTitle;
        if (!item.hasOwnProperty("title") || !item.title) {
          return;
        }
        resultTitle = cleanArray(item.title.split(" "));
        match = compareSortedComponents(requestTitle.title, resultTitle);
        if (match < 0.5 && (item.subtitle || requestTitle.subtitle)) {
          if (item.subtitle) {
            match = compareSortedComponents(cleanArray((item.subtitle || "").split(" ")), cleanArray(requestTitle.title || []));
          }
          if (match < 0.5) {
            match = compareSortedComponents(cleanArray((item.title || "").split(" ")), cleanArray(requestTitle.subtitle || []));
          }
          if (match < 0.5) {
            resultTitle = cleanArray((item.title + " " + item.subtitle).split(" "));
            leftTitle = cleanArray(requestTitle.title.concat(requestTitle.subtitle || []));
            match = compareSortedComponents(leftTitle, resultTitle);
          }
        }
        if (match < 0.5 || (match <= 0.5 && state.values.authorMatch <= 0.5)) {
          return {
            'reason': `title mismatch (score: ${match}) :: actual ${JSON.stringify(resultTitle)}, expected ${JSON.stringify(requestTitle)}`
          };
        }
      };
      bindingExactMatchForSingleResults = function(state, item) {
        var binding;
        if (allowMultiple) {
          return;
        }
        if (item.hasOwnProperty("binding") && !!item.binding) {
          binding = item["binding"].toLowerCase();
          if (!anyBeginsWith(["book", "large print", "picture book", "unknown"], binding)) {
            return {
              'reason': `binding mismatch :: actual ${binding}, expected ${request.catalog}`
            };
          }
          if (binding.indexOf("cd") >= 0 && request.category === "book") {
            return {
              'reason': `binding mismatch :: actual ${binding}, expected ${request.catalog}`
            };
          }
          if (binding.indexOf("ebook") >= 0 && request.category === "book") {
            return {
              'reason': `binding mismatch :: actual ${binding}, expected ${request.catalog}`
            };
          }
        }
      };
      heuristics = [limitOneMatch, missingId, missingTitle, authorMismatch, titleMismatch, bindingExactMatchForSingleResults];
      return results.reduce(function(acc, result) {
        var book, heuristicResults, reasons, rejection;
        result.url = result.url || me.getDetailPageUrl(result.id);
        book = Object.assign({}, result, splitAndNormalizeTitle(result.title) || {});
        heuristicResults = heuristics.reduce(function(acc, fn) {
          var rejection;
          rejection = fn(acc, book);
          if (rejection) {
            acc.failures.push(rejection);
          }
          return acc;
        }, {
          failures: [],
          values: {},
          matches: acc.matches
        });
        if (heuristicResults.failures.length === 0) {
          acc.matches.push(result);
        } else {
          reasons = heuristicResults.failures.map(function(failure) {
            return failure.reason;
          }).join(", ");
          logStatus(book, `Item rejection: ${reasons}`);
          rejection = Object.assign({}, result, {
            reasons: heuristicResults.failures
          });
          acc.rejections.push(rejection);
        }
        return acc;
      }, {
        matches: [],
        rejections: []
      });
    }

    setEnabled(enabled) {
      return this.enabled = enabled;
    }

    isEnabled() {
      return this.isSearchable() && !!this.enabled;
    }

    refreshHoldsRemaining(resp) {
      return Promise.resolve(resp);
    }

    getLibraryInformation() {
      return Promise.resolve({
        librarySystemName: this.name
      });
    }

    holdsRemaining() {
      return null;
    }

    handleDisabledCatalog(request, err) {
      var disableReq, me;
      me = this;
      disableReq = {
        libraryId: me.getLibraryId(),
        catalogId: me.getCatalogId(),
        state: false
      };
      me.app.setCatalogState(disableReq).then(function() {
        return me.app.setLibraryFromConfig();
      }).then(function(resp) {
        return request.start(resp);
      });
      request.reply({
        status: 'message',
        messages: [
          {
            status: 'message',
            icon: 'ALERT_ICON',
            content: me.app.browser.getMessage("catalogDisabled",
          [me.description,
          me.libraryName])
          }
        ]
      });
      return me.app.report_failure(me, err);
    }

    handleInaccessibleUrl(request, err) {
      var me;
      me = this;
      return request.reply({
        status: 'message',
        messages: [
          {
            status: 'message',
            icon: 'ALERT_ICON',
            content: me.app.browser.getMessage("catalogInaccessible",
          [me.description,
          me.getCatalogUrl()])
          }
        ]
      });
    }

    async searchHoldings(request) {
      var err, handler, me, searchFailureHandlers, terms;
      me = this;
      terms = (await me.transformRequestSearchTerms(request));
      searchFailureHandlers = {
        CatalogDisabled: me.handleDisabledCatalog,
        InaccessibleUrl: me.handleInaccessibleUrl
      };
      try {
        await this.checkSession(request);
        me.setSearchTerms(request, terms);
        return me.searchForCopyByTerms(request);
      } catch (error1) {
        err = error1;
        logger.exception(`[${request.searchId}] Error when establishing a new session`, err);
        handler = searchFailureHandlers[err.message];
        if (handler) {
          return handler(request, err);
        }
      }
    }

    checkAvailabilityForSingleItem(request, response, item, depth) {
      var match, me, needsInformationFromAnotherPage;
      me = this;
      depth = depth || 0;
      needsInformationFromAnotherPage = function(acc, cond) {
        var opts, res;
        res = cond.condition(response.http.body, depth);
        if (!!res) {
          opts = cond.urlBuilder(res, response.http.body, request, item);
          if (opts) {
            acc.promise = new Promise(async function(resolve) {
              var httpRequest;
              httpRequest = (await me.httpRequest(opts, request));
              return resolve(me.checkAvailabilityForSingleItem(request, httpRequest, item, depth + 3));
            });
          }
        }
        return acc;
      };
      match = me.availabilitySearchConditions.reduce(needsInformationFromAnotherPage, {});
      if (match && match.promise) {
        return match.promise;
      }
      return new Promise(function(resolve) {
        return resolve(me.updateAvailabilityCounts(request, response, item));
      });
    }

    processInventoryLookup(request, response, data) {
      var inventorySearches, items, me;
      me = this;
      inventorySearches = data.matches.reduce(function(acc, item) {
        if (item.availability && ((item.availability.count != null) || item.availability.isAvailable || (item.availability.availabilityType === "always"))) {
          acc.push(Promise.resolve(item));
          return acc;
        }
        acc.push(me.checkAvailabilityForSingleItem(request, response, item));
        return acc;
      }, []);
      items = Object.assign({}, data);
      request.context.setData(items);
      return Promise.all(inventorySearches).then(async function(matches) {
        items = Object.assign({}, items, {
          matches: matches
        });
        request.context.setData(items);
        if (items.matches.find(function(el) {
          return el;
        })) {
          return request.context.setStatus("available");
        } else {
          return (await me.searchForCopyByTerms(request));
        }
      });
    }

    registerEvents() {}

  };

  Catalog = class Catalog extends Library {
    constructor(libraryName, libraryState, libraryCountry, libraryId1, url1, catalogUrl1, defaults1, params, categories) {
      var me, opt;
      super();
      this.getMaxParallelRequests = this.getMaxParallelRequests.bind(this);
      this.httpRequest = this.httpRequest.bind(this);
      this.isSessionValid = this.isSessionValid.bind(this);
      this.checkSession = this.checkSession.bind(this);
      this.getNewSessionTimeout = this.getNewSessionTimeout.bind(this);
      this.getCatalogUrl = this.getCatalogUrl.bind(this);
      this.getDescription = this.getDescription.bind(this);
      this.checkSupportsMultipleResults = this.checkSupportsMultipleResults.bind(this);
      this.supportsMultipleResults = this.supportsMultipleResults.bind(this);
      this.inventoryLookup = this.inventoryLookup.bind(this);
      this.getDetailUrl = this.getDetailUrl.bind(this);
      this.getDetailPageUrl = this.getDetailPageUrl.bind(this);
      this.buildInventoryLookupUrl = this.buildInventoryLookupUrl.bind(this);
      this.updateAvailabilityCounts = this.updateAvailabilityCounts.bind(this);
      this.libraryName = libraryName;
      this.libraryState = libraryState;
      this.libraryCountry = libraryCountry;
      this.libraryId = libraryId1;
      this.url = url1;
      this.catalogUrl = catalogUrl1;
      this.defaults = defaults1;
      this.description = "Main Catalog";
      this.categories = categories;
      this.pageUrl = null;
      this.commonHeaders = [];
      this.state = {};
      this.http = {};
      this.defaults["holds_permitted"] = this.defaults["holds_permitted"] || "true";
      if (params != null) {
        for (opt in this.defaults) {
          if (params.hasOwnProperty(opt)) {
            this.defaults[opt] = params[opt];
          }
        }
      }
      me = this;
      this.availabilitySearchConditions = [
        {
          condition: function(res,
        depth) {
            return depth === 0;
          },
          urlBuilder: function(re_res,
        res,
        req,
        item) {
            if (me.buildInventoryLookupUrl != null) {
              return Object.assign({},
        me.http.common || {},
        me.http.inventory || {},
        me.buildInventoryLookupUrl(req,
        item));
            }
          }
        }
      ];
      this.session = {};
      this.httpRequestFactory = new RequestFactory();
    }

    getMaxParallelRequests() {
      boundMethodCheck(this, Catalog);
      return (this.defaults || {}).PARALLEL_REQUESTS || 1;
    }

    httpRequest(opts, request) {
      var me, tempOpts;
      boundMethodCheck(this, Catalog);
      me = this;
      request = this.httpRequestFactory.create(me.app, me.app.browser, me);
      tempOpts = Object.assign({}, opts, {
        request: request
      });
      return request.call(tempOpts);
    }

    isSessionValid() {
      boundMethodCheck(this, Catalog);
      return this.session.expiry > this.app.time();
    }

    checkSession(request) {
      boundMethodCheck(this, Catalog);
      if (this.isSessionValid()) {
        return Promise.resolve();
      } else {
        return this.newSession(request);
      }
    }

    getNewSessionTimeout() {
      boundMethodCheck(this, Catalog);
      return this.app.time() + (((this.defaults || {}).sessionTimeoutMinutes || 60) * 60 * 1000);
    }

    newSession() {
      return Promise.resolve();
    }

    isSearchable() {
      return true;
    }

    supportsAuthentication() {
      return false;
    }

    getResultsLogo() {
      return null;
    }

    getCatalogUrl() {
      boundMethodCheck(this, Catalog);
      return urlutils.concat(this.catalogUrl, "/");
    }

    getDescription() {
      boundMethodCheck(this, Catalog);
      return this.description || "Catalog";
    }

    async checkSupportsMultipleResults() {
      var beta_setting_enabled;
      boundMethodCheck(this, Catalog);
      beta_setting_enabled = ((await this.app.getConfigValue("beta_multiple_results_setting"))).value;
      return this.session.handleMultipleResults = this.allowMultiple || beta_setting_enabled === true;
    }

    supportsMultipleResults() {
      boundMethodCheck(this, Catalog);
      if (this.multipleResultsDisabled) {
        return false;
      }
      return this.session.handleMultipleResults || false;
    }

    async inventoryLookup(request, response, opts) {
      var data, me, results;
      boundMethodCheck(this, Catalog);
      me = this;
      if (response.body) {
        results = (await me.parseSearchResults(response.body, request, response.http.body));
        if (results) {
          data = (await me._filterParsedInventoryResults(request, results));
        }
      }
      if ((!data || data.matches.length === 0) && !me.hasAnyRemainingSearchTerm(request)) {
        logger.debug(`[${request.searchId}] No terms remaining to search by`);
        request.context.setStatus("unavailable");
        request.finish();
        return;
      }
      return me.processInventoryLookup(request, response, data).then(request.finish);
    }

    getDetailUrl(id) {
      var detailUrl;
      boundMethodCheck(this, Catalog);
      detailUrl = this.session.detailUrl || this.detailUrl;
      if (typeof detailUrl === "function") {
        return detailUrl(Object.assign({}, this.defaults, this.session, {
          id: id
        }));
      } else {
        if (detailUrl.indexOf("##ID##") > 0) {
          return detailUrl.replace("##ID##", id);
        } else {
          return `${detailUrl}${id}`;
        }
      }
    }

    getDetailPageUrl(id) {
      boundMethodCheck(this, Catalog);
      if (this.pageUrl != null) {
        if (typeof this.pageUrl === "function") {
          return this.pageUrl({
            id: encoreURLComponent(id)
          });
        }
        return `${this.pageUrl}${encodeURIComponent(id)}`;
      } else {
        return this.getDetailUrl(id);
      }
    }

    buildSearchUrl(isbn, title, request) {}

    parseSearchResults(response, request) {
      return Promise.resolve();
    }

    buildInventoryLookupUrl(request, item) {
      boundMethodCheck(this, Catalog);
      return {
        url: this.getDetailUrl(item.id)
      };
    }

    parseInventoryLookup(response) {}

    async updateAvailabilityCounts(request, response, item) {
      var data;
      boundMethodCheck(this, Catalog);
      if (!item.availability) {
        data = (await this.parseInventoryLookup(response.body, request, item, response.http.body));
        if (data != null) {
          item = Object.assign({}, item, {
            availability: data
          });
        }
      }
      return item;
    }

  };

  NoneLibrary = class NoneLibrary extends Catalog {
    constructor(name, country, state, id, url, catalogUrl, params, categories) {
      var defaults;
      defaults = {};
      super(name, country, state, id, url, catalogUrl, defaults, params, categories);
    }

    isSearchable() {
      return false;
    }

  };

  catalogMap = {};

  specialCatalogs = {};

  register = function(cls, catalogType, singletonCatalogFactory, domOperationsCls) {
    cls.configKey = catalogType;
    unitTestable(cls);
    catalogMap[catalogType] = cls;
    cls.prototype.getDomOperations = function() {
      return new domOperationsCls(this.http, this.defaults);
    };
    if (singletonCatalogFactory) {
      specialCatalogs[catalogType] = singletonCatalogFactory;
      return unitTestable(singletonCatalogFactory);
    }
  };

  registerDOMOperations = function(_cls, _name) {
    return 0;
  };

  createNonLibraryCatalog = function(cls, name, id_) {
    return function(app, credentials, params) {
      var catalog, catalogId;
      catalogId = id_ + "_1";
      params = Object.assign({}, params, {
        credentials: credentials
      });
      catalog = new cls(name, null, null, catalogId, "", "", params, ["book", "audiobook", "music", "video"]);
      catalog.setApplication(app);
      catalog.setEnabled(true);
      app.AllLibraries[id_] = {
        id: id_,
        name: name,
        url: catalog.libraryUrl,
        country: "US",
        catalogs: [
          {
            id: "1",
            url: catalog.catalogUrl,
            driver: catalog
          }
        ]
      };
      app.AllCatalogs[catalogId] = {
        library: id_,
        driver: catalog
      };
      return catalog;
    };
  };

  registerNonLibraryCatalog = function(cls, id_, name, domOperationsCls) {
    var factory;
    factory = createNonLibraryCatalog(cls, name, id_);
    unitTestable(factory, `create${id_}Catalog`);
    return register(cls, id_, factory, domOperationsCls);
  };

  register(NoneLibrary, "NoneLibrary", "none");

  // BEGIN src/catalogs/anyplayfm.coffee
  AnyplayCatalog = class AnyplayCatalog extends Catalog {
    constructor(name, state, country, id, url, catalogUrl, params, categories) {
      var defaults;
      defaults = {};
      categories = ["book", "audiobook"];
      super(name, state, country, id, url, catalogUrl, defaults, params, categories);
      this.newSession = this.newSession.bind(this);
      this.buildSearchUrl = this.buildSearchUrl.bind(this);
      this.parseSearchResults = this.parseSearchResults.bind(this);
      this.version = "8e04434ac4b74317150bdcd6ff33c658";
      this.allowMultiple = true;
      this.baseUrl = "https://account.anyplay.fm/";
      this.catalogUrl = "https://www.anyplay.fm/";
      this.libraryUrl = "https://www.anyplay.fm/";
      this.apiUrl = "https://anyplay.se";
      this.searchUrl = "https://search.anyplay.se/indexes/audiobooks/search";
      this.detailUrl = fromTemplate("https://account.anyplay.fm/audiobook/<%= slug %>");
      this.http = {
        common: {
          xfrm: 'json'
        }
      };
      this.initializeUrl = this.baseUrl;
    }

    canSearchByIsbn() {
      return false;
    }

    canSearchByIsbn13() {
      return false;
    }

    async newSession() {
      var apiKeyContent, me, opts, resp;
      boundMethodCheck(this, AnyplayCatalog);
      me = this;
      opts = {
        url: urlutils.concat(me.apiUrl, "/api/public/v1/territories/current_territory")
      };
      resp = (await me.httpRequest(opts));
      this.session.territory = (resp && resp.body && resp.body.data.attributes.code) || "US";
      opts = {
        url: urlutils.concat(this.baseUrl, '/static/js/13.6d27083a.chunk.js'),
        xfrm: 'noop'
      };
      resp = (await me.httpRequest(opts));
      apiKeyContent = /apiKey:"".concat\("(.*?)"/.exec(resp.body);
      if (apiKeyContent) {
        this.session.apikey = apiKeyContent[1];
      }
      return this.commonHeaders = [['X-Meili-API-Key', this.session.apikey]];
    }

    buildSearchUrl(searchBy, searchTerm, request) {
      var payload;
      boundMethodCheck(this, AnyplayCatalog);
      payload = {
        q: searchTerm,
        offset: 0,
        limit: 20,
        filters: "territories=" + this.session.territory
      };
      return {
        by: searchBy,
        url: this.searchUrl,
        body: JSON.stringify(payload)
      };
    }

    parseSearchResults(response, request) {
      var me;
      boundMethodCheck(this, AnyplayCatalog);
      me = this;
      return response.hits.map(function(el) {
        return {
          id: el.id,
          title: el.title,
          author: el.authors_simple,
          url: me.detailUrl({
            slug: el.slug
          }),
          binding: "audiobook",
          availability: {
            isAvailable: true
          }
        };
      });
    }

    parseInventoryLookup(response) {}

  };

  registerNonLibraryCatalog(AnyplayCatalog, "anyplay", "Anyplay.fm");

  // END src/catalogs/anyplayfm.coffee
  // BEGIN src/catalogs/apachesolr.coffee
  ApacheSolrLibrary = class ApacheSolrLibrary extends Catalog {
    constructor(name, state, country, id, url, catalogUrl, params, categories) {
      var defaults;
      defaults = {
        "search_path": "/search/book?category=book&searchField=<%= term|encodeuri %>",
        "detail_path": "/book/title/##ID##"
      };
      super(name, state, country, id, url, catalogUrl, defaults, params, categories);
      this.buildSearchUrl = this.buildSearchUrl.bind(this);
      this.parseSearchResults = this.parseSearchResults.bind(this);
      this.buildInventoryLookupUrl = this.buildInventoryLookupUrl.bind(this);
      this.version = "ae43ff902857f19e3fb41fb91b1d6ce3";
      this.detailUrl = `${this.catalogUrl}${this.defaults["detail_path"]}`;
      this.searchUrl = fromTemplate(urlutils.concat(this.catalogUrl, this.defaults.search_path));
      this.inventoryUrl = fromTemplate(urlutils.concat(this.catalogUrl, "/bib-details/<%= id %>/statuses_oracle"));
      this.branches = null;
      this.http = {
        common: {
          xfrm: "html"
        },
        inventory: {
          xfrm: 'json'
        }
      };
      this.domOperations = this.getDomOperations();
    }

    buildSearchUrl(searchBy, searchTerm, request) {
      boundMethodCheck(this, ApacheSolrLibrary);
      return {
        by: searchBy,
        url: this.searchUrl({
          term: searchTerm
        })
      };
    }

    async parseSearchResults(response, request) {
      var items, me;
      boundMethodCheck(this, ApacheSolrLibrary);
      me = this;
      items = (await this.domOperations.extractSearchResults(response));
      items = items.map(function(el) {
        return Object.assign({}, el, {
          url: me.detailUrl.replace("##ID##", el.id)
        });
      });
      return items;
    }

    buildInventoryLookupUrl(request, item) {
      boundMethodCheck(this, ApacheSolrLibrary);
      return {
        url: this.inventoryUrl(item)
      };
    }

    parseInventoryLookup(response) {
      var data;
      data = {
        estimated: false,
        count: 0,
        available: 0,
        branches: {}
      };
      return Object.keys(response).reduce(function(acc, key) {
        response[key].items.reduce(function(items_acc, item) {
          items_acc.count += 1;
          if (item.value.availability === "Available") {
            items_acc.available += 1;
          }
          items_acc.branches[item.value.locationName] = 1;
          return items_acc;
        }, acc);
        return acc;
      }, data);
    }

  };

  // BEGIN src/catalogs/dom/apachesolr.coffee

    // BEGIN src/catalogs/dom/common.coffee
  DOMOperations = class DOMOperations {
    constructor(http1, defaults1) {
      var me;
      this.http = http1;
      this.defaults = defaults1;
      me = this;
      this.parser = function(el, cfg) {
        return parseResponse(cfg || me.http.common, el, me.customParsers);
      };
    }

  };

  // END src/catalogs/dom/common.coffee
  ApacheSolrDOMOperations = class ApacheSolrDOMOperations extends DOMOperations {
    constructor() {
      super(...arguments);
      this.extractSearchResults = this.extractSearchResults.bind(this);
    }

    async extractSearchResults(content) {
      var obj;
      boundMethodCheck(this, ApacheSolrDOMOperations);
      obj = (await this.parser(content));
      return Array.from(obj.querySelectorAll("div.search-results div.cardWrapper")).reduce(function(acc, el) {
        var author, binding, id_, title;
        id_ = /wrapper_chamo_(\d+)_.*/.exec(el.getAttribute("id"))[1];
        title = normalizeTitle(textFromElement(el.querySelector("p.title")));
        binding = textFromElement(el.querySelector("p.category"));
        author = normalizeAuthor(textFromElement(el.querySelector("p.author")));
        acc.push({
          id: id_,
          title: title,
          author: author,
          binding: binding
        });
        return acc;
      }, []);
    }

  };

  registerDOMOperations(ApacheSolrDOMOperations, "solr");

  // END src/catalogs/dom/apachesolr.coffee
  register(ApacheSolrLibrary, "solr", null, ApacheSolrDOMOperations);

  // END src/catalogs/apachesolr.coffee
  // BEGIN src/catalogs/archive_org.coffee
  ArchiveOrgCatalog = class ArchiveOrgCatalog extends Catalog {
    constructor(name, state, country, id, url, catalogUrl, params, categories) {
      var defaults;
      defaults = {
        PATH: "/",
        BRANCH_FILTER: ""
      };
      categories = ["book", "audiobook", "music"];
      super(name, state, country, id, url, catalogUrl, defaults, params, categories);
      this.getCatalogUrl = this.getCatalogUrl.bind(this);
      this.buildSearchUrl = this.buildSearchUrl.bind(this);
      this.version = "c23f40c838581f9db80f3987f56418d8";
      this.baseUrl = "https://openlibrary.org/";
      this.catalogUrl = "https://openlibrary.org/";
      this.libraryUrl = "https://openlibrary.org/";
      this.detailUrl = fromTemplate(urlutils.concat(this.baseUrl, "works/<%= id %>/"));
      this.searchUrl = fromTemplate(urlutils.concat(this.baseUrl, "search?has_fulltext=true&q=<%= term|encodeuri %>"));
      this.branches = null;
      this.initializeUrl = this.baseUrl;
      this.http = {
        common: {
          xfrm: "html"
        }
      };
      this.domOperations = this.getDomOperations();
    }

    getResultsLogo() {
      return {
        src: `chrome-extension://${chrome.i18n.getMessage('@@extension_id')}/images/openlibrary-logo-tighter.svg`,
        heightPx: 21,
        widthPx: 85
      };
    }

    getCatalogUrl() {
      boundMethodCheck(this, ArchiveOrgCatalog);
      return this.baseUrl;
    }

    buildSearchUrl(searchBy, searchTerm, request) {
      boundMethodCheck(this, ArchiveOrgCatalog);
      return {
        by: searchBy,
        url: this.searchUrl({
          term: searchTerm
        })
      };
    }

    async parseSearchResults(response, request) {
      var items;
      items = (await this.domOperations.extractSearchResults(response));
      return items;
    }

    parseInventoryLookup(response) {}

  };

  // BEGIN src/catalogs/dom/archive_org.coffee
  ArchiveOrgDOMOperations = class ArchiveOrgDOMOperations extends DOMOperations {
    constructor() {
      super(...arguments);
      this.extractSearchResults = this.extractSearchResults.bind(this);
    }

    async extractSearchResults(content) {
      var idFromWorksUrl, isAvailableFromOpenLibrary, obj;
      boundMethodCheck(this, ArchiveOrgDOMOperations);
      obj = (await this.parser(content));
      idFromWorksUrl = function(s) {
        return /\/.+\/(.+)$/.exec(s)[1];
      };
      isAvailableFromOpenLibrary = function(el) {
        var txt;
        txt = textFromElement(el);
        return txt && !/not in library/.exec(txt.toLowerCase());
      };
      return Array.from(obj.querySelectorAll("[itemtype=\"https://schema.org/Book\"]")).reduce(function(acc, el) {
        if (isAvailableFromOpenLibrary(el.querySelector(".cta-btn"))) {
          acc.push({
            id: idFromWorksUrl(el.querySelector(".booktitle a, .workDetails link[itemprop=exampleOfWork]").attributes["href"].value),
            title: textFromElement(el.querySelector(".work-title, .booktitle a, div.BookTitle")).split('\n')[0],
            author: normalizeAuthor(textFromElement(el.querySelector(".bookauthor, .Author"))),
            binding: "book"
          });
        }
        return acc;
      }, []);
    }

  };

  registerDOMOperations(ArchiveOrgDOMOperations, "archive_org");

  // END src/catalogs/dom/archive_org.coffee
  registerNonLibraryCatalog(ArchiveOrgCatalog, "archive_org", "Internet Archive Open Library", ArchiveOrgDOMOperations);

  // END src/catalogs/archive_org.coffee
  // BEGIN src/catalogs/arena.coffee
  AxielArenaCatalog = class AxielArenaCatalog extends Catalog {
    constructor(name, country, state, id, url, catalogUrl, params, categories) {
      var baseUrl, defaults;
      defaults = {
        locale: "en_GB",
        org_index: "",
        org_index_key: "0",
        search_type: "solr",
        site: "arena"
      };
      super(name, country, state, id, url, catalogUrl, defaults, params, categories);
      this.newSession = this.newSession.bind(this);
      baseUrl = urlutils.concat(this.catalogUrl, `/web/${this.defaults.site}`);
      this.initializeUrl = baseUrl;
      this.searchUrl = fromTemplate(urlutils.concat(baseUrl, "/search?<%= qs %>"));
      this.detailUrl = fromTemplate(urlutils.concat(baseUrl, "/results?p_p_id=crDetailWicket_WAR_arenaportlet&p_p_lifecycle=0&p_p_state=normal&p_p_mode=view&p_r_p_687834046_search_item_id=<%= id %>"));
      this.inventoryUrl = urlutils.concat(baseUrl, "/results?p_p_id=crDetailWicket_WAR_arenaportlet&p_p_lifecycle=0&p_p_state=normal&p_p_mode=view&p_r_p_687834046_search_item_id=##ID##");
      this.http = {
        common: {
          xfrm: "html"
        }
      };
      this.domOperations = this.getDomOperations();
    }

    getAuthToken(body) {
      var res;
      res = /Liferay.authToken="(.*?)";/.exec(body);
      if (res) {
        return res[1];
      }
      return null;
    }

    async newSession() {
      var me, opts, resp;
      boundMethodCheck(this, AxielArenaCatalog);
      me = this;
      opts = {
        url: me.initializeUrl,
        xfrm: 'noop'
      };
      resp = (await me.httpRequest(opts));
      return me.session.authToken = me.getAuthToken(resp.body);
    }

    buildSearchUrl(searchBy, searchTerm, request) {
      var args, url;
      url = this.searchUrl;
      args = {
        p_p_id: "searchResult_WAR_arenaportlet",
        p_p_lifecycle: 1,
        p_p_state: "normal",
        p_p_mode: "view",
        "p_r_p_arena_urn:arena_facet_queries": "",
        "p_r_p_arena_urn:arena_search_query": escape(`${searchTerm}`).replace(/%20/g, "+"),
        "p_r_p_arena_urn:arena_search_type": this.defaults["search_type"],
        "p_r_p_arena_urn:arena_sort_advice": "field=Relevance&direction=Descending"
      };
      return {
        by: searchBy,
        url: this.searchUrl({
          qs: toQueryString(args)
        })
      };
    }

    async parseSearchResults(response, request) {
      var items;
      items = (await this.domOperations.extractSearchResults(response));
      return items;
    }

    async parseInventoryLookup(response, request) {
      return (await this.domOperations.extractAvailability(response));
    }

  };

  // BEGIN src/catalogs/dom/arena.coffee
  AxielArenaDOMOperations = class AxielArenaDOMOperations extends DOMOperations {
    constructor() {
      super(...arguments);
      this.extractSearchResults = this.extractSearchResults.bind(this);
      this.extractAvailability = this.extractAvailability.bind(this);
    }

    async extractSearchResults(content) {
      var obj;
      boundMethodCheck(this, AxielArenaDOMOperations);
      obj = (await this.parser(content));
      return Array.from(obj.querySelectorAll(".arena-record")).reduce(function(acc, el) {
        var author, title;
        title = el.querySelector(".arena-record-title");
        author = el.querySelector(".arena-record-author");
        if (title && author) {
          return acc.concat([
            {
              title: normalizeTitle(title.textContent),
              author: normalizeAuthor(author.textContent),
              id: el.querySelector(".arena-record-id").textContent
            }
          ]);
        }
        return acc;
      }, []);
    }

    async extractAvailability(content) {
      var obj;
      boundMethodCheck(this, AxielArenaDOMOperations);
      obj = (await this.parser(content));
      return Array.from(obj.querySelectorAll(".arena-summary-container")).reduce(function(acc, el) {
        var available, total;
        total = /Total\s+(\d+)/.exec(el.textContent);
        if (total) {
          acc.copies += parseInt(total[1]);
        }
        available = /Available:?\s+(\d+)/.exec(el.textContent);
        if (available) {
          acc.available += parseInt(available[1]);
        }
        return acc;
      }, {
        count: 0,
        available: 0,
        estimated: false,
        branches: []
      });
    }

  };

  registerDOMOperations(AxielArenaDOMOperations, "arena");

  // END src/catalogs/dom/arena.coffee
  register(AxielArenaCatalog, "arena", null, AxielArenaDOMOperations);

  // END src/catalogs/arena.coffee
  // BEGIN src/catalogs/atriuum.coffee
  AtriuumLibrary = class AtriuumLibrary extends Catalog {
    constructor(name, state, country, id, url, catalogUrl, params, categories) {
      var defaults;
      defaults = {
        "PATH": "" // the path used to access the opac
      };
      super(name, state, country, id, url, catalogUrl, defaults, params, categories);
      this.generateV2Urls = this.generateV2Urls.bind(this);
      this.generateV3Urls = this.generateV3Urls.bind(this);
      this.newSession = this.newSession.bind(this);
      this.initializeSessionV2 = this.initializeSessionV2.bind(this);
      this.initializeSessionV3 = this.initializeSessionV3.bind(this);
      this.getCatalogUrl = this.getCatalogUrl.bind(this);
      this.buildSearchUrl = this.buildSearchUrl.bind(this);
      this.buildSearchUrlV2 = this.buildSearchUrlV2.bind(this);
      this.materialTypeCodeToBinding = this.materialTypeCodeToBinding.bind(this);
      this.parseSearchResults = this.parseSearchResults.bind(this);
      this.parseSearchResultsV2 = this.parseSearchResultsV2.bind(this);
      this.buildInventoryLookupUrl = this.buildInventoryLookupUrl.bind(this);
      this.parseInventoryLookup = this.parseInventoryLookup.bind(this);
      this._libraryId = /\/opac\/(?<libraryId>.*)\/?/.exec(this.defaults.PATH).groups.libraryId;
      this.baseUrl = urlutils.concat(this.catalogUrl, this.defaults["PATH"]);
      this.version = "196f0e670e27c57432b1dd5760e46a28";
      this.state.codeMapInitialized = false;
      this.state.codeMap = {
        "1": "book",
        "4": "audiobook",
        "5": "book", // largeprint
        "100": "book",
        "102": "dvd",
        "104": "book_and_audiocd",
        "107": "vhs",
        "108": "book",
        "109": "book",
        "110": "magazine",
        "111": "ebook",
        "112": "audiocd",
        "113": "mp3cd",
        "114": "ebook",
        "115": "gamedisc",
        "116": "audiocassette",
        "117": "cd-rom",
        "118": "musiccd",
        "119": "equipment",
        "120": "videocassettes"
      };
      this.buildInventoryLookupUrl = null;
      this.http = {
        common: {
          xfrm: "json"
        }
      };
    }

    generateV2Urls() {
      var suffix;
      boundMethodCheck(this, AtriuumLibrary);
      suffix = "/ProcessHttpReq?asJSON=t";
      this.searchUrl = urlutils.concat(urlutils.concat(this.catalogUrl, this.defaults["PATH"]), suffix);
      this.detailUrl = urlutils.concat(urlutils.concat(this.catalogUrl, this.defaults["PATH"]), suffix);
      this.pageUrl = urlutils.concat(this.baseUrl, "/#full:FullDisp?mode=main&itemID=");
      return this.implementationUrls = {
        generateSearchUrl: this.buildSearchUrlV2,
        handleSearchResults: this.parseSearchResultsV2,
        handleHoldingsResults: this.parseSearchResultsV2
      };
    }

    generateV3Urls() {
      var suffix;
      boundMethodCheck(this, AtriuumLibrary);
      suffix = "/ProcessHttpReq?asJSON=t";
      this.searchUrl = urlutils.concat(urlutils.concat(this.catalogUrl, this.defaults["PATH"]), suffix);
      this.detailUrl = urlutils.concat(urlutils.concat(this.catalogUrl, this.defaults["PATH"]), suffix);
      this.pageUrl = urlutils.concat(this.baseUrl, "/index.html#/details/");
      return this.implementationUrls = {
        generateSearchUrl: this.buildSearchUrlV2,
        handleSearchResults: this.parseSearchResultsV2,
        handleHoldingsResults: this.parseSearchResultsV2
      };
    }

    async newSession() {
      var me, opts, resp;
      boundMethodCheck(this, AtriuumLibrary);
      me = this;
      opts = {
        url: urlutils.concat(urlutils.concat(this.catalogUrl, this.defaults["PATH"]))
      };
      resp = (await me.httpRequest(opts));
      if (resp.http.body.indexOf('g_materialTypes') < 0) {
        await me.initializeSessionV3(resp);
      } else {
        await me.initializeSessionV2(resp);
      }
      return me.session.expiry = me.getNewSessionTimeout();
    }

    initializeSessionV2(resp) {
      var binding, code, jacket, materialTypes_re, me, newCodeMap, value;
      boundMethodCheck(this, AtriuumLibrary);
      me = this;
      me.generateV2Urls();
      materialTypes_re = /g_materialTypes.push\({code:(\d+), value:'(.+)', fileName:'.+', genericdustjacketname:'(.*)'}\)/g;
      newCodeMap = {};
      while ((code = materialTypes_re.exec(resp.http.body))) {
        value = code[2].toLowerCase().trim();
        jacket = code[3].toLowerCase().trim();
        binding = commonBindingMappings(value) || commonBindingMappings(jacket) || value;
        newCodeMap[code[1]] = binding;
      }
      if (newCodeMap) {
        return me.state.codeMap = newCodeMap;
      }
    }

    initializeSessionV3() {
      var me;
      boundMethodCheck(this, AtriuumLibrary);
      me = this;
      return me.generateV3Urls();
    }

    getCatalogUrl() {
      boundMethodCheck(this, AtriuumLibrary);
      return this.baseUrl;
    }

    buildSearchUrl(searchBy, searchTerm, request) {
      boundMethodCheck(this, AtriuumLibrary);
      return this.implementationUrls.generateSearchUrl(searchBy, searchTerm, request);
    }

    buildSearchUrlV2(searchBy, searchTerm, request) {
      var searchBody, searchField;
      boundMethodCheck(this, AtriuumLibrary);
      if (searchBy === "isbn" || searchBy === "isbn13") {
        searchField = "I";
      } else {
        searchField = "T";
      }
      searchBody = fromTemplate("<actionmessagelist><action><type>LCISearch</type>" + "<websearch>ExpertSearch?view=Bibliographic&amp;SortDescend=0&amp;" + "ST0=<%= searchField %>&amp;SF0=<%= searchTerm|encodeuri %>&amp;B1=O&amp;" + "ST1=Z&amp;M1=c&amp;sortBy=Bibliographic.SortTitle&amp;useRanking=true</websearch>" + "<startPosition>0</startPosition><numToLoad>25</numToLoad></action></actionmessagelist>");
      return {
        by: searchBy,
        url: this.searchUrl,
        body: searchBody({
          searchField: searchField,
          searchTerm: searchTerm
        })
      };
    }

    materialTypeCodeToBinding(code) {
      boundMethodCheck(this, AtriuumLibrary);
      if (code in this.state.codeMap) {
        return this.state.codeMap[code];
      }
      return "unknown";
    }

    parseSearchResults(response, request) {
      boundMethodCheck(this, AtriuumLibrary);
      return this.implementationUrls.handleSearchResults(response, request);
    }

    parseSearchResultsV2(response, request) {
      var getAuthor, responseCount, results, row;
      boundMethodCheck(this, AtriuumLibrary);
      responseCount = response.responsemessagelist.response.NumResponses;
      results = [];
      if (responseCount > 0) {
        getAuthor = function(row) {
          var author;
          author = row.authorsname;
          if (author.length === 0) {
            try {
              author = /^.*\/\s*(by )?(?<author>.*?)\s*/.exec(row.extendedtitle).groups["author"];
            } catch (error1) {
              return;
            }
          }
          return author;
        };
        results = (function() {
          var len, n, ref, results1;
          ref = response.responsemessagelist.response.recordList;
          results1 = [];
          for (n = 0, len = ref.length; n < len; n++) {
            row = ref[n];
            results1.push({
              id: row.itemID,
              binding: this.materialTypeCodeToBinding(row.materialtypecode),
              title: normalizeTitle(row.title),
              author: normalizeAuthor(getAuthor(row)),
              availability: {
                available: parseInt(row.numofavailablecopies || 0),
                count: parseInt(row.numofopaccopies),
                branches: row.locationlistopac.split(",")
              }
            });
          }
          return results1;
        }).call(this);
      }
      return results;
    }

    buildInventoryLookupUrl(request, item) {
      boundMethodCheck(this, AtriuumLibrary);
      return this.implementationUrls.generateHoldingsUrl(request, item);
    }

    parseInventoryLookup(response) {
      boundMethodCheck(this, AtriuumLibrary);
      return this.implementationUrls.handleHoldingsResults(response);
    }

  };

  register(AtriuumLibrary, "atriuum");

  // END src/catalogs/atriuum.coffee
  // BEGIN src/catalogs/autographics.coffee

  // BEGIN src/utilities/webrequest.coffee
  webrequestHelpers = {
    authorization: function(existingHeaders, bearerToken) {
      var headers;
      headers = existingHeaders.slice();
      headers = headers.reduce(function(acc, header) {
        if (header[0].toLowerCase() !== 'authorization') {
          acc.push(header);
        }
        return acc;
      }, []);
      if (bearerToken) {
        headers.push(["Authorization", `Bearer ${bearerToken}`]);
      }
      return headers;
    }
  };

  unitTestable(webrequestHelpers, "webrequestHelpers");

  // END src/utilities/webrequest.coffee
  AutoGraphicsLibrary = class AutoGraphicsLibrary extends Catalog {
    constructor(name, state, country, id, url, catalogUrl, params, categories) {
      var defaults;
      defaults = {
        "KEYS": "5296",
        "CID": "", // ConsortiumID
        "LID": "", // LibraryID
        "api_url_base": "https://aws02-api.auto-graphics.com/",
        "target_catalog_name": null,
        "catalog_api_version": "5"
      };
      categories = ["book", "audiobook", "music", "dvd"];
      super(name, state, country, id, url, catalogUrl, defaults, params, categories);
      this.getDetailPageUrl = this.getDetailPageUrl.bind(this);
      this.getCatalogUrl = this.getCatalogUrl.bind(this);
      this.databaseConfigCallbackv5 = this.databaseConfigCallbackv5.bind(this);
      this.databaseConfigCallbackv6 = this.databaseConfigCallbackv6.bind(this);
      this.sessionInitv5 = this.sessionInitv5.bind(this);
      this.sessionInitv6 = this.sessionInitv6.bind(this);
      this.initializeBodyv6 = this.initializeBodyv6.bind(this);
      this.newSession = this.newSession.bind(this);
      this.buildSearchUrl = this.buildSearchUrl.bind(this);
      this.inventoryLookup = this.inventoryLookup.bind(this);
      this.buildSearchUrl_v6 = this.buildSearchUrl_v6.bind(this);
      this.inventoryLookup_v5 = this.inventoryLookup_v5.bind(this);
      this.inventoryLookup_v6 = this.inventoryLookup_v6.bind(this);
      this.version = "2d0e71d6e2cc2bdb5c89a899e01d535c";
      this.http = {
        common: {
          xfrm: 'json',
          headers: [["Content-Type", "application/json"], ["Accept", "application/json, text/plain, */*"]]
        }
      };
      this.commonHeaders = [["Content-Type", "application/json"], ["Accept", "application/json, text/plain, */*"]];
      this.urlsByVersion = {
        "5": {
          catalogUrl: urlutils.concat(this.catalogUrl, `/mvc?cid=${this.defaults.CID}&lid=${this.defaults.LID}&reset=force`),
          initialize: {
            makeBody: "initializeBodyv5",
            transform: 'noop',
            url: urlutils.concat(this.catalogUrl, `/mvc?cid=${this.defaults.CID}&lid=${this.defaults.LID}&reset=vauth`)
          },
          inventory: {
            lookup_callback: "inventoryLookup_v5"
          },
          search: {
            build_url_callback: "buildSearchUrl_v5",
            results_callback: "parseSearchResults_v5"
          },
          searchUrl: urlutils.concat(this.catalogUrl, "/mvc/Search/Perform/"),
          searchStatusUrl: urlutils.concat(this.catalogUrl, "/mvc/Search/PollSearchResults/"),
          detailUrl: urlutils.concat(this.catalogUrl, "/MVC/#fullrecord/fs/one/##ID##"),
          databaseKey: {
            callback: "databaseConfigCallbackv5",
            init: "sessionInitv6",
            url: urlutils.concat(this.catalogUrl, "/mvc/User/GetToolbarInfo")
          }
        },
        "6": {
          catalogUrl: urlutils.concat(this.catalogUrl, `/home?cid=${this.defaults.CID}&lid=${this.defaults.LID}&reset=force`),
          initialize: {
            transform: 'noop',
            makeBody: "initializeBodyv6",
            url: urlutils.concat(this.defaults.api_url_base, "/agapi/api/v1/auth")
          },
          inventory: {
            lookup_callback: "inventoryLookup_v6"
          },
          search: {
            build_url_callback: "buildSearchUrl_v6",
            results_callback: "parseSearchResults_v6"
          },
          searchUrl: urlutils.concat(this.catalogUrl, "/searchapi/searchapi/v1/search"),
          searchStatusUrl: urlutils.concat(this.catalogUrl, "/searchapi/searchapi/v1/search/results"),
          detailUrl: urlutils.concat(this.catalogUrl, `/record?agcn=##ID##&cid=${this.defaults.CID}&lid=${this.defaults.LID}&key=##KEY##`),
          databaseKey: {
            callback: "databaseConfigCallbackv6",
            init: "sessionInitv6",
            url: urlutils.concat(this.defaults.api_url_base, "/searchapi/searchapi/v1/library/AvailableTargets")
          }
        }
      };
      this.version = this.defaults.catalog_api_version;
      if (/agverso.com/.exec(this.catalogUrl)) {
        this.version = "6";
      }
      this.config = this.urlsByVersion[this.version];
      this.searchUrl = this.config.searchUrl;
      this.detailUrl = this.config.detailUrl;
      this.searchStatusUrl = this.config.searchStatusUrl;
      this.detailUrl = this.config.detailUrl;
    }

    getDetailPageUrl(id) {
      boundMethodCheck(this, AutoGraphicsLibrary);
      return this.detailUrl.replace("##ID##", id).replace("##KEY##", this.session.KEYS);
    }

    getCatalogUrl() {
      boundMethodCheck(this, AutoGraphicsLibrary);
      return this.config.catalogUrl;
    }

    databaseConfigCallbackv5(response) {
      var resp;
      boundMethodCheck(this, AutoGraphicsLibrary);
      resp = response.body;
      this.session.KEYS = "" + resp.mtm.UserInfo.MainLibraryDBPoolKey;
      return logger.debug("Set database key to " + me.session.KEYS);
    }

    databaseConfigCallbackv6(response) {
      var limitToTargetCatalog, me, resp;
      boundMethodCheck(this, AutoGraphicsLibrary);
      resp = response.body;
      me = this;
      limitToTargetCatalog = function(el) {
        if (me.defaults.target_catalog_name) {
          return el.targetName === me.defaults.target_catalog_name;
        }
        return el.isDefault;
      };
      this.session.KEYS = "" + resp.data.targetGroups.reduce(function(acc, el) {
        var matching;
        if (acc) {
          return acc;
        }
        matching = el.searchTargets.find(limitToTargetCatalog);
        if (matching) {
          return matching.libraryDBpoolKey;
        }
      }, null);
      return logger.debug("Set database key to " + this.session.KEYS);
    }

    sessionInitv5(response) {
      var me, opts;
      boundMethodCheck(this, AutoGraphicsLibrary);
      me = this;
      opts = {
        url: me.config.databaseKey.url,
        body: "null",
        xfrm: "json"
      };
      return me.httpRequest(opts);
    }

    sessionInitv6(response) {
      var me, opts, resp;
      boundMethodCheck(this, AutoGraphicsLibrary);
      me = this;
      resp = JSON.parse(response.body);
      me.session.TOKEN = resp.access_Token;
      me.session.SESSIONID = resp.userData && resp.userData.sessionId;
      me.session.LIBRARYNAME = resp.userData && resp.userData.libraryName;
      me.session.LIBRARYID = resp.userData && resp.userData.libraryId;
      me.commonHeaders = webrequestHelpers.authorization(me.commonHeaders, me.session.TOKEN);
      opts = {
        url: me.config.databaseKey.url,
        xfrm: "json"
      };
      return me.httpRequest(opts);
    }

    initializeBodyv5() {
      return null;
    }

    initializeBodyv6() {
      var payload;
      boundMethodCheck(this, AutoGraphicsLibrary);
      payload = {
        Cid: this.defaults.CID,
        Grant_type: "password",
        Lid: this.defaults.LID,
        UserName: "guest",
        Password: "guest",
        RememberMe: false
      };
      return JSON.stringify(payload);
    }

    async newSession() {
      var e, initResp, me, opts, resp;
      boundMethodCheck(this, AutoGraphicsLibrary);
      me = this;
      opts = {
        url: me.config.initialize.url,
        body: me[me.config.initialize.makeBody](),
        xfrm: me.config.initialize.transform
      };
      try {
        resp = (await me.httpRequest(opts));
        initResp = (await me[me.config.databaseKey.init](resp));
        await me[me.config.databaseKey.callback](initResp);
        return me.session.expiry = me.getNewSessionTimeout();
      } catch (error1) {
        e = error1;
        return logger.error(JSON.stringify(e));
      }
    }

    buildSearchUrl(searchBy, searchTerm, request) {
      boundMethodCheck(this, AutoGraphicsLibrary);
      return this[this.config.search.build_url_callback](searchBy, searchTerm, request);
    }

    inventoryLookup(request, response, responseHeaders) {
      boundMethodCheck(this, AutoGraphicsLibrary);
      return this[this.config.inventory.lookup_callback](request, response, responseHeaders);
    }

    parseSearchResults(response, request) {
      return this[this.config.search.results_callback](response, request);
    }

    buildSearchUrl_v5(searchBy, searchTerm, request) {
      var payload, searchIndex;
      searchIndex = {
        "isbn": "6",
        "isbn13": "6"
      }[searchBy] || "1";
      payload = {
        "Filters": [decodeURIComponent(searchTerm).trim()],
        "keys": [`${this.session.KEYS}`],
        "PageSize": "20",
        "StartRecord": 0,
        "SelectedSearchIndex": searchIndex
      };
      return {
        by: searchBy,
        url: this.searchUrl,
        body: JSON.stringify(payload)
      };
    }

    buildSearchUrl_v6(searchBy, searchTerm, request) {
      var payload, searchIndex;
      boundMethodCheck(this, AutoGraphicsLibrary);
      searchIndex = {
        "isbn": "isbn",
        "isbn13": "isbn"
      }[searchBy] || "title";
      payload = {
        searchQuery: {
          facetMatches: [],
          facetOffset: 0,
          filters: {
            scopingLevel: 1
          },
          matches: [
            {
              index: searchIndex,
              matchJoinOperator: "AND",
              query: decodeURIComponent(searchTerm),
              queryOption: "ALL"
            }
          ],
          numOfFacetsPerGroup: 20,
          numOfRecords: 40,
          orderBy: "asc",
          resources: [parseInt(this.session.KEYS)],
          resulttype: "merged",
          searchType: 1,
          sortBy: ["relevance"],
          startRecord: 1
        }
      };
      return {
        by: searchBy,
        url: this.searchUrl,
        body: JSON.stringify(payload)
      };
    }

    superInventoryLookup(request, response, opts) {
      return super.inventoryLookup(request, response, opts);
    }

    inventoryLookup_v5(request, response, opts) {
      var is_ready, max_timeout, me, payload, poll_search_results, searchId, searchTerm;
      boundMethodCheck(this, AutoGraphicsLibrary);
      searchId = response.body.SearchId;
      searchTerm = response.body.SearchTerm;
      me = this;
      payload = {
        "searchCacheId": searchId,
        "searchTerm": encodeURIComponent(searchTerm.trim()),
        "sortOption": "0",
        "startRecord": "0",
        "count": "20"
      };
      max_timeout = 10;
      opts = {
        url: me.searchStatusUrl,
        body: JSON.stringify(payload),
        headers: me.commonHeaders,
        xfrm: "json"
      };
      is_ready = function(response) {
        if (response.body.Status !== 0) { // or response.ProgressPercentage < 100
          max_timeout = max_timeout - 1;
          if (max_timeout > 1) {
            return setTimeout(poll_search_results, 1000);
          } else {
            return me.failureCallback(me, request);
          }
        } else {
          return me.superInventoryLookup(request, response, opts);
        }
      };
      poll_search_results = async function() {
        var rv;
        rv = (await me.httpRequest(opts, request));
        return is_ready(rv);
      };
      return poll_search_results();
    }

    inventoryLookup_v6(request, response, opts) {
      var is_ready, max_timeout, me, payload, poll_search_results, searchId;
      boundMethodCheck(this, AutoGraphicsLibrary);
      searchId = response.body.data.searchId;
      me = this;
      payload = {
        facetOffset: 0,
        numOfFacetPerGroup: 20,
        numOfRecords: 40,
        orderBy: "asc",
        resulttype: "merged",
        searchId: searchId,
        sortBy: ["relevance"],
        startRecord: "1",
        wait: true
      };
      max_timeout = 10;
      is_ready = function(response) {
        if (response.body.status !== "OK") {
          max_timeout = max_timeout - 1;
          if (max_timeout > 1) {
            return setTimeout(poll_search_results, 1000);
          } else {
            return me.failureCallback(me, request);
          }
        } else {
          return me.superInventoryLookup(request, response, opts);
        }
      };
      opts = {
        url: me.searchStatusUrl,
        body: JSON.stringify(payload),
        xfrm: 'json'
      };
      poll_search_results = async function() {
        var rv;
        rv = (await me.httpRequest(opts, request));
        return is_ready(rv);
      };
      return poll_search_results();
    }

    parseSearchResults_v6(response, request) {
      if (response.data.results === null) {
        return [];
      }
      return response.data.results.reduce(function(acc, el) {
        acc = acc.concat(el.formats.reduce(function(facc, fel) {
          facc = facc.concat(fel.documents.reduce(function(dacc, del) {
            dacc.push({
              id: del.agControlId,
              title: normalizeTitle(del.title),
              author: normalizeAuthor(del.author),
              binding: del.format_Long.toLowerCase(),
              availability: {
                available: del.availables,
                count: del.copies
              }
            });
            return dacc;
          }, []));
          return facc;
        }, []));
        return acc;
      }, []);
    }

    parseSearchResults_v5(response, request) {
      var pollId, results;
      results = [];
      pollId = response.PollID;
      response.Clusters.forEach(function(el) {
        return el.Groupings.forEach(function(item) {
          return results.push({
            "id": item.MemeberId + "/" + pollId,
            "title": normalizeTitle(item.Items[0].Title),
            "author": normalizeAuthor(item.Items[0].Author),
            "binding": item.MaterialType.toLowerCase(),
            availability: {
              available: item.TotalAvailables,
              count: item.TotalCopies
            }
          });
        });
      });
      return results;
    }

  };

  register(AutoGraphicsLibrary, "autographics");

  // END src/catalogs/autographics.coffee
  // BEGIN src/catalogs/axis360.coffee
  Axis360DigitalLibrary = class Axis360DigitalLibrary extends Catalog {
    constructor(name, state, country, id, url, catalogUrl, params, categories) {
      var defaults;
      defaults = {};
      catalogUrl = catalogUrl.replace('axis360', 'boundless');
      super(name, state, country, id, url, catalogUrl, defaults, params, categories);
      this.buildInventoryLookupUrl = this.buildInventoryLookupUrl.bind(this);
      this.buildSearchUrl = this.buildSearchUrl.bind(this);
      this.parseSearchResults = this.parseSearchResults.bind(this);
      this.version = "4c938279d3719c4abfa2e26968a30a33";
      this.description = "Boundless Digital Catalog";
      this.searchUrl = fromTemplate(urlutils.concat(catalogUrl, "/Search/GetListContent?sortby=Score" + "&sortorder=-1&term=<%= term|encodeuri %>&searchby=" + "&availability=All&format=&releasedate=" + "&addeddate=&language=&agelevel=" + "&pageSize=48&page=1"));
      this.detailUrl = fromTemplate(urlutils.concat(catalogUrl, "/Title?itemId=<%= id %>"));
      this.availabilityUrl = fromTemplate(urlutils.concat(catalogUrl, "/Title/TitleDetails?itemId=<%= id %>"));
      this.categories = ["book", "music", "audiobook"];
      this.http = {
        common: {
          xfrm: 'noop'
        },
        inventory: {
          xfrm: 'json'
        }
      };
      this.allowMultiple = true;
      this.domOperations = this.getDomOperations();
    }

    canSearchByIsbn() {
      return false;
    }

    canSearchByIsbn13() {
      return false;
    }

    buildInventoryLookupUrl(request, item) {
      boundMethodCheck(this, Axis360DigitalLibrary);
      return {
        url: this.availabilityUrl({
          id: item.id
        })
      };
    }

    buildSearchUrl(searchBy, searchTerm, request) {
      var term, titleRegExp;
      boundMethodCheck(this, Axis360DigitalLibrary);
      term = searchTerm;
      if (searchBy === "title") {
        titleRegExp = RegExp("([a-zA-Z0-9% \.]+)");
        term = titleRegExp.exec(term)[1];
      }
      return {
        by: searchBy,
        url: this.searchUrl({
          term: term
        })
      };
    }

    async parseSearchResults(response, request) {
      var items;
      boundMethodCheck(this, Axis360DigitalLibrary);
      return items = (await this.domOperations.extractSearchResults(response));
    }

    parseInventoryLookup(doc) {
      var res;
      res = {
        available: doc.titleAvailabilityInfo.availability.availableCopies,
        count: doc.titleAvailabilityInfo.availability.totalQuantity,
        estimated: false,
        branches: []
      };
      return res;
    }

  };

  // BEGIN src/catalogs/dom/axis360.coffee
  Axis360DOMOperations = class Axis360DOMOperations extends DOMOperations {
    constructor() {
      super(...arguments);
      this.extractSearchResults = this.extractSearchResults.bind(this);
    }

    async extractSearchResults(content) {
      var bindingMap, me, obj;
      boundMethodCheck(this, Axis360DOMOperations);
      bindingMap = {
        EBT: "eBook",
        ABT: "Audiobook"
      };
      obj = (await this.parser(content, {
        xfrm: "json"
      }));
      me = this;
      return obj.Items.reduce(function(acc, item) {
        var availability;
        availability = {
          count: item.TotalQuantity,
          isAvailable: item.IsAvailable,
          holds: item.ActiveHolds
        };
        if (item.IsAvailable) {
          availability = null;
        }
        acc.push({
          id: item.ItemId,
          title: stripTags(item.Title).trim(),
          author: (item.Author || item.Authors).split('#')[0].trim(),
          binding: bindingMap[item.FormatType],
          availability: availability
        });
        return acc;
      }, []);
    }

  };

  registerDOMOperations(Axis360DOMOperations, "axis360");

  // END src/catalogs/dom/axis360.coffee
  register(Axis360DigitalLibrary, "axis360", null, Axis360DOMOperations);

  // END src/catalogs/axis360.coffee
  // BEGIN src/catalogs/bibliocommons.coffee
  BiblioCommonsLibrary = class BiblioCommonsLibrary extends Catalog {
    constructor(name, state, country, id, url, catalogUrl, params, categories) {
      var defaults, library;
      defaults = {
        "branch": ""
      };
      categories = ["book", "audiobook", "music"];
      super(name, state, country, id, url, catalogUrl, defaults, params, categories);
      this.buildSearchUrl = this.buildSearchUrl.bind(this);
      this.parseSearchResults = this.parseSearchResults.bind(this);
      this.buildInventoryLookupUrl = this.buildInventoryLookupUrl.bind(this);
      this.parseInventoryLookupAsHTML = this.parseInventoryLookupAsHTML.bind(this);
      this.parseInventoryLookup = this.parseInventoryLookup.bind(this);
      this.version = "d571872884ae950c4cd16c4a1c29ba8a";
      this.detailUrl = `${this.catalogUrl}/item/show/`;
      library = /:\/\/(.*).bibliocommons.com/.exec(this.catalogUrl)[1];
      this.searchUrl = fromTemplate(`https://gateway.bibliocommons.com/v2/libraries/${library}/rss/search?locked=false&searchType=bl&<%= qs %>`);
      this.inventoryUrl = fromTemplate(urlutils.concat(this.catalogUrl, "/item/show_circulation_widget/<%= id %>"));
      this.branch = this.defaults["branch"];
      this.http = {
        common: {
          xfrm: 'xml'
        },
        inventory: {
          xfrm: 'json'
        }
      };
      this.domOperations = this.getDomOperations();
    }

    buildSearchUrl(searchBy, searchTerm, request) {
      var formatMap, params;
      boundMethodCheck(this, BiblioCommonsLibrary);
      if (request.category === "book" && (searchBy === "isbn" || searchBy === "isbn13")) {
        params = `query=Identifier:(${searchTerm})`;
      } else {
        formatMap = {
          "book": "formatcode:(BOARD_BK OR BK OR GRAPHIC_NOVEL OR LPRINT OR BIG_BK OR PAPERBACK OR PICTURE_BOOK )",
          "music": "formatcode:(MUSIC_CD)",
          "audiobook": "formatcode:(AB OR MP3_CD OR BOOK_CD OR SPOKEN_CD)"
        };
        params = `query=title:(${encodeURIComponent(searchTerm)})+++${encodeURI(formatMap[request.category])}`;
      }
      return {
        by: searchBy,
        url: this.searchUrl({
          qs: params
        })
      };
    }

    async parseSearchResults(response, request) {
      var items;
      boundMethodCheck(this, BiblioCommonsLibrary);
      items = (await this.domOperations.extractSearchResults(response));
      return items;
    }

    buildInventoryLookupUrl(request, item) {
      boundMethodCheck(this, BiblioCommonsLibrary);
      return {
        url: this.inventoryUrl(item),
        headers: [["Accept", "application/json"]]
      };
    }

    async parseInventoryLookupAsHTML(response) {
      boundMethodCheck(this, BiblioCommonsLibrary);
      return (await this.domOperations.extractAvailability(response));
    }

    parseInventoryLookup(response) {
      var data;
      boundMethodCheck(this, BiblioCommonsLibrary);
      try {
        data = response.html;
      } catch (error1) {
        data = response;
      }
      return this.parseInventoryLookupAsHTML(data);
    }

  };

  // BEGIN src/catalogs/dom/bibliocommons.coffee
  BiblioCommonsDOMOperations = class BiblioCommonsDOMOperations extends DOMOperations {
    constructor(http, defaults) {
      super(http, defaults);
      this.extractSearchResults = this.extractSearchResults.bind(this);
      this.extractAvailability = this.extractAvailability.bind(this);
      this.page_re = new RegExp("/item/show/(.*)");
    }

    getTextFromElement(el, key) {
      try {
        return textFromElement(el.querySelector(key));
      } catch (error1) {
        return null;
      }
    }

    async extractSearchResults(content) {
      var formatMap, me, obj;
      boundMethodCheck(this, BiblioCommonsDOMOperations);
      me = this;
      obj = (await this.parser(content));
      formatMap = {
        BK: "book",
        PAPERBACK: "book",
        BIG_BK: "book",
        LPRINT: "book",
        GRAPHIC_NOVEL: "book",
        BOARD_BK: "book",
        MUSIC_CD: "music",
        AB: "audiobook",
        MP3_CD: "audiobook",
        BOOK_CD: "audiobook",
        SPOKEN_CD: "audiobook"
      };
      return Array.from(obj.querySelectorAll("item")).reduce(function(acc, el) {
        var categories, result;
        if (el.querySelector("guid") === null) {
          return acc;
        }
        result = {};
        result.title = me.getTextFromElement(el, "title");
        try {
          result.author = normalizeAuthor(me.getTextFromElement(el, "creator"));
        } catch (error1) {

        }
        categories = nodeListToArray(el.querySelectorAll("category"));
        categories.forEach(function(category) {
          category = textFromElement(category);
          if (formatMap[category]) {
            return result.binding = formatMap[category];
          }
        });
        result.id = me.page_re.exec(me.getTextFromElement(el, "guid"))[1];
        result.coverImage = me.getTextFromElement(el, "image_url");
        acc.push(result);
        return acc;
      }, []);
    }

    extractAvailability(content) {
      var additionalInfo, availabilityType, branchHash, copiesAvailable, copiesTotal, data, estimated, holds, r;
      boundMethodCheck(this, BiblioCommonsDOMOperations);
      r = fromHTML("<div>" + content + "</div>");
      copiesTotal = parseInt(textFromElement(r.querySelector("span[testid=text_totalcopies]")));
      copiesAvailable = parseInt(textFromElement(r.querySelector("span[testid=text_availablecopies]")));
      additionalInfo = textFromElement(r.querySelector(".secondary  ~ div"));
      if (additionalInfo) {
        additionalInfo = additionalInfo.split(":")[1].trim();
      }
      holds = textFromElement(r.querySelector("span[testid=text_holdcopies]"));
      holds = holds && parseInt(holds) || void 0;
      availabilityType = "normal";
      if (/holds_not_allowed/.exec(content)) {
        availabilityType = "no_holds";
      }
      branchHash = {};
      estimated = false;
      if (this.branch !== "") {
        estimated = true;
      }
      data = {
        additionalInfo: additionalInfo,
        availabilityType: availabilityType,
        estimated: estimated,
        count: copiesTotal,
        holds: holds,
        available: copiesAvailable,
        branches: hashToList(branchHash)
      };
      return data;
    }

  };

  registerDOMOperations(BiblioCommonsDOMOperations, "bibliocommons");

  // END src/catalogs/dom/bibliocommons.coffee
  register(BiblioCommonsLibrary, "bibliocommons", null, BiblioCommonsDOMOperations);

  // END src/catalogs/bibliocommons.coffee
  // BEGIN src/catalogs/biblionix.coffee
  BiblionixLibrary = class BiblionixLibrary extends Catalog {
    constructor(name, state, country, id, url, catalogUrl, params, categories) {
      var defaults;
      defaults = {};
      categories = ["book", "audiobook", "music", "dvd"];
      super(name, state, country, id, url, catalogUrl, defaults, params, categories);
      this.getCatalogUrl = this.getCatalogUrl.bind(this);
      this.inventoryOverride = this.inventoryOverride.bind(this);
      this.inventoryLookup = this.inventoryLookup.bind(this);
      this.parseSearchResults = this.parseSearchResults.bind(this);
      this.version = "fcb5977741e598391491f97e4a7ac82c";
      this.detailUrl = urlutils.concat(this.catalogUrl, "/catalog/biblio/##ID##/");
      this.http = {
        common: {
          xfrm: 'noop'
        }
      };
      this.domOperations = this.getDomOperations();
    }

    getCatalogUrl() {
      boundMethodCheck(this, BiblionixLibrary);
      return urlutils.concat(this.catalogUrl, "/catalog/");
    }

    buildSearchUrl(searchBy, searchTerm, request) {
      var param, url;
      searchTerm = searchTerm.trim().replace("&", "and");
      param = "?solr=1&search=" + encodeURIComponent("keyword:" + searchTerm);
      url = urlutils.concat(this.catalogUrl, "catalog/ajax_backend/search_setup.xml.pl");
      url = url + param;
      return {
        by: searchBy,
        url: url
      };
    }

    inventoryOverride(request, response, opts) {
      var me;
      boundMethodCheck(this, BiblionixLibrary);
      me = this;
      return super.inventoryLookup(request, response, opts);
    }

    async inventoryLookup(request, response) {
      var me, opts, resp, search_id, url;
      boundMethodCheck(this, BiblionixLibrary);
      search_id = /search_id="(.*)"/.exec(response.body);
      me = this;
      url = urlutils.concat(this.catalogUrl, "catalog/ajax_backend/perform_search.xml.pl");
      url = url + "?solr=1&search_id=" + search_id[1];
      opts = {
        url: url,
        xfrm: 'xml'
      };
      resp = (await me.httpRequest(opts, request));
      return me.inventoryOverride(request, resp, opts);
    }

    async parseSearchResults(response, request) {
      boundMethodCheck(this, BiblionixLibrary);
      return (await this.domOperations.extractSearchResults(response));
    }

  };

  // BEGIN src/catalogs/dom/biblionix.coffee
  BiblionixDOMOperations = class BiblionixDOMOperations extends DOMOperations {
    constructor() {
      super(...arguments);
      this.extractSearchResults = this.extractSearchResults.bind(this);
    }

    extractOneResult(item) {
      var author, available, binding, bindingMap, count, id, len, n, ref, row, title;
      bindingMap = {
        pb: "book",
        softbook: "book"
      };
      title = item.getAttribute("t");
      author = item.getAttribute("a");
      binding = item.getAttribute("m") || "book";
      id = item.getAttribute("b");
      count = parseInt(item.querySelector("ol").getAttribute("t"));
      available = 0;
      binding = binding.toLowerCase();
      if (bindingMap.hasOwnProperty(binding)) {
        binding = bindingMap[binding];
      }
      ref = item.querySelector("ol").querySelectorAll("br");
      for (n = 0, len = ref.length; n < len; n++) {
        row = ref[n];
        available += parseInt(row.getAttribute("in"));
      }
      return {
        title: normalizeTitle(title),
        author: normalizeAuthor(author),
        binding: binding,
        id: id,
        availability: {
          count: count,
          available: available || 0
        }
      };
    }

    async extractSearchResults(content) {
      var me, obj;
      boundMethodCheck(this, BiblionixDOMOperations);
      obj = (await this.parser(content, {
        xfrm: "xml"
      }));
      me = this;
      return Array.from(obj.querySelectorAll("s")).reduce(function(acc, el) {
        var existing, res;
        res = me.extractOneResult(el);
        existing = false;
        acc.forEach(function(res_el) {
          if (res_el.id === res.id) {
            existing = true;
            return res_el.available += res.available;
          }
        });
        if (!existing) {
          acc.push(res);
        }
        return acc;
      }, []);
    }

  };

  registerDOMOperations(BiblionixDOMOperations, "biblionix");

  // END src/catalogs/dom/biblionix.coffee
  register(BiblionixLibrary, "biblionix", null, BiblionixDOMOperations);

  // END src/catalogs/biblionix.coffee
  // BEGIN src/catalogs/bookmate.coffee
  BookmateCatalog = class BookmateCatalog extends Catalog {
    constructor(name, state, country, id, url, catalogUrl, params, categories) {
      var defaults;
      defaults = {};
      super(name, state, country, id, url, catalogUrl, defaults, params, categories);
      this.buildSearchUrl = this.buildSearchUrl.bind(this);
      this.parseSearchResults = this.parseSearchResults.bind(this);
      this.version = "f7faa0d7875d654c79bc8ffc5f3d0a27";
      this.categories = ["books", "book", "audiobook"];
      this.baseUrl = "https://www.bookmate.com/";
      this.catalogUrl = this.baseUrl;
      this.detailUrl = fromTemplate(urlutils.concat(this.baseUrl, "/books/<%= id %>"));
      this.searchUrl = fromTemplate(urlutils.concat(this.baseUrl, "/p/api/v5/search?<%= qs %>"));
      this.http = {
        common: {
          xfrm: 'json'
        }
      };
    }

    canSearchByIsbn() {
      return false;
    }

    canSearchByIsbn13() {
      return false;
    }

    buildSearchUrl(searchBy, searchTerm, request) {
      var params, qs;
      boundMethodCheck(this, BookmateCatalog);
      qs = {
        query: encodeURIComponent(searchTerm),
        page: 1,
        per_page: 20,
        lang: "en"
      };
      params = toQueryString(qs);
      return {
        by: searchBy,
        url: this.searchUrl({
          qs: params
        })
      };
    }

    parseSearchResults(response, request) {
      var me;
      boundMethodCheck(this, BookmateCatalog);
      me = this;
      return response.search.books.objects.reduce(function(acc, item) {
        acc.push({
          id: item.uuid,
          title: item.title,
          author: item.authors,
          binding: commonBindingMappings(item.type),
          url: me.detailUrl({
            id: item.uuid
          }),
          availability: {
            isAvailable: item.can_be_read,
            availabilityType: "always"
          }
        });
        return acc;
      }, []);
    }

  };

  registerNonLibraryCatalog(BookmateCatalog, "bookmate", "Bookmate");

  // END src/catalogs/bookmate.coffee
  // BEGIN src/catalogs/borrowbox.coffee
  BorrowBoxDigitalLibrary = class BorrowBoxDigitalLibrary extends Catalog {
    constructor(name, state, country, id, url, catalogUrl, params, categories) {
      var defaults;
      defaults = {
        site: params.site
      };
      super(name, state, country, id, url, catalogUrl, defaults, params, categories);
      this.getCatalogUrl = this.getCatalogUrl.bind(this);
      this.buildSearchUrl = this.buildSearchUrl.bind(this);
      this.parseSearchResults = this.parseSearchResults.bind(this);
      this.version = "5506553cbae0060f8af57535a38bfe98";
      this.description = "BorrowBox Digital Catalog";
      this.catalogUrl = "https://fe.bolindadigital.com/";
      this.rootUrl = fromTemplate(urlutils.concat(this.catalogUrl, "wldcs_bol_fo/b2i/mainPage.html?" + "b2bSite=<%= site %>"));
      this.searchUrl = fromTemplate(urlutils.concat(this.catalogUrl, "/wldcs_bol_fo/b2i/search.html" + "?b2bSite=<%= site %>" + "&searchBy=ALL" + "&q=<%= term|encodeuri %>"));
      this.detailUrl = fromTemplate(urlutils.concat(this.catalogUrl, "/wldcs_bol_fo/b2i/productDetail.html" + "?productId=<%= id %>" + "&b2bSite=<%= site %>"));
      this.categories = ["book", "music", "audiobook"];
      this.allowMultiple = true;
      this.http = {
        common: {
          xfrm: "html"
        }
      };
      this.domOperations = this.getDomOperations();
    }

    getCatalogUrl() {
      boundMethodCheck(this, BorrowBoxDigitalLibrary);
      return this.rootUrl(this.defaults);
    }

    canSearchByIsbn() {
      return false;
    }

    canSearchByIsbn13() {
      return false;
    }

    buildSearchUrl(searchBy, searchTerm, request) {
      boundMethodCheck(this, BorrowBoxDigitalLibrary);
      return {
        by: searchBy,
        url: this.searchUrl(Object.assign({}, this.defaults, {
          term: searchTerm
        }))
      };
    }

    async parseSearchResults(response, request) {
      boundMethodCheck(this, BorrowBoxDigitalLibrary);
      return (await this.domOperations.extractSearchResults(response));
    }

  };

  // BEGIN src/catalogs/dom/borrowbox.coffee
  BorrowBoxDOMOperations = class BorrowBoxDOMOperations extends DOMOperations {
    constructor() {
      super(...arguments);
      this.extractSearchResults = this.extractSearchResults.bind(this);
    }

    async extractSearchResults(content) {
      var digitalBooks, js, me, response;
      boundMethodCheck(this, BorrowBoxDOMOperations);
      me = this;
      response = (await this.parser(content));
      js = response.querySelector("script#__NEXT_DATA__");
      if (js && js.textContent) {
        try {
          return JSON.parse(js.textContent).props.pageProps.dehydratedState.queries.reduce(function(acc, el) {
            return acc.concat(el.state.data.products.reduce(function(pacc, pel) {
              pacc.push({
                id: pel.productId,
                title: normalizeTitle(pel.title),
                author: normalizeAuthor(pel.authors[0].name), // Need to pull all authors here
                binding: commonBindingMappings(pel.format),
                coverImage: pel.coverUrl,
                availability: {
                  count: 1,
                  available: pel.availability.status === "AVAILABLE" && 1 || 0
                }
              });
              return pacc;
            }, []));
          }, []);
        } catch (error1) {
          0;
        }
      }
      digitalBooks = Array.from(response.querySelectorAll(".productVertical")).reduce(function(acc, el) {
        var id_;
        id_ = /productId=(.*?)&/.exec(el.querySelector(".productVerticalAddToCart a").getAttribute("href"))[1];
        if (id_) {
          acc.push({
            title: normalizeTitle(textFromElement(el.querySelector(".productVerticalTitle"))),
            author: normalizeAuthor(textFromElement(el.querySelector(".productVerticalAuthor"))),
            binding: commonBindingMappings(textFromElement(el.querySelector(".productVerticalFormat:nth-child(2)"))),
            id: id_,
            availability: {
              count: 1,
              available: 1, // el.querySelector(".productVerticalAvailable") ? 0 : 1
              estimated: true
            }
          });
        }
        return acc;
      }, []);
      if (digitalBooks.length === 0) {
        digitalBooks = Array.from(response.querySelectorAll(".item-wrapper")).reduce(function(acc, el) {
          var binding, coverButton, href, id_;
          href = el.querySelector(".title a").getAttribute("href");
          id_ = /product\/(.*?)\//.exec(href) || /product\/(.*)/.exec(href);
          if (id_) {
            id_ = id_[1];
            binding = "ebook";
            coverButton = el.querySelector(".cover button");
            if (coverButton && coverButton.classList.contains("audio-preview")) {
              binding = "audio";
            }
            acc.push({
              title: normalizeTitle(textFromElement(el.querySelector(".title"))),
              author: normalizeAuthor(textFromElement(el.querySelector(".author"))),
              binding: commonBindingMappings(binding),
              id: id_,
              availability: {
                count: 1,
                available: 1 - el.querySelectorAll(".availability").length,
                estimated: true
              }
            });
          }
          return acc;
        }, []);
      }
      return digitalBooks;
    }

  };

  registerDOMOperations(BorrowBoxDOMOperations, "borrowbox");

  // END src/catalogs/dom/borrowbox.coffee
  register(BorrowBoxDigitalLibrary, "borrowbox", null, BorrowBoxDOMOperations);

  // END src/catalogs/borrowbox.coffee
  // BEGIN src/catalogs/brooklyn.coffee
  BrooklynCatalog = class BrooklynCatalog extends Catalog {
    constructor(name, state, country, id, url, catalogUrl, params, categories) {
      var defaults;
      defaults = {
        PATH: "/",
        BRANCH_FILTER: ""
      };
      categories = ["book", "audiobook", "music"];
      super(name, state, country, id, url, catalogUrl, defaults, params, categories);
      this.getCatalogUrl = this.getCatalogUrl.bind(this);
      this.buildSearchUrl = this.buildSearchUrl.bind(this);
      this.version = "54f4739eebafbea20d622b6657df8c50";
      this.baseUrl = "https://bklynlibrary.org/";
      this.libraryUrl = "https://bklynlibrary.org/";
      this.detailUrl = fromTemplate(urlutils.concat(this.baseUrl, "item?b=<%= id %>"));
      this.searchUrl = fromTemplate(urlutils.concat(this.catalogUrl, "api/search/index.php?search=<%= term|encodeuri %>"));
      this.http = {
        common: {
          xfrm: "noop"
        },
        search: {
          xfrm: "json"
        }
      };
      this.branches = null;
      this.initializeUrl = this.baseUrl;
    }

    getCatalogUrl() {
      boundMethodCheck(this, BrooklynCatalog);
      return this.baseUrl;
    }

    buildSearchUrl(searchBy, searchTerm, request) {
      boundMethodCheck(this, BrooklynCatalog);
      return {
        by: searchBy,
        url: this.searchUrl({
          term: searchTerm
        })
      };
    }

    parseSearchResults(response, request) {
      return response.grouped.ss_grouping.groups.reduce(function(acc, el) {
        acc = acc.concat(el.doclist.docs.reduce(function(acc_docs, el_doc) {
          if (el_doc.opac_title === 'ONLINE' || el_doc.opac_label === 'ONLINE') {
            return acc_docs;
          }
          acc_docs.push({
            id: el_doc.id,
            author: el_doc.author,
            title: el_doc.title,
            binding: el_doc.material_type,
            availability: {
              count: el_doc.is_copies,
              available: el_doc.is_available_locations
            }
          });
          return acc_docs;
        }, []));
        return acc;
      }, []);
    }

  };

  register(BrooklynCatalog, "brooklyn");

  // END src/catalogs/brooklyn.coffee
  // BEGIN src/catalogs/capita.coffee
  CapitaLibrary = class CapitaLibrary extends Catalog {
    constructor(name, state, country, id, url, catalogUrl, params, categories) {
      var defaults;
      defaults = {
        "LIBRARY": ""
      };
      categories = ["book", "audiobook", "music"];
      super(name, state, country, id, url, catalogUrl, defaults, params, categories);
      this.getCatalogUrl = this.getCatalogUrl.bind(this);
      this.buildSearchUrl = this.buildSearchUrl.bind(this);
      this.parseSearchResults = this.parseSearchResults.bind(this);
      this.version = "dfbe169baa2026d7af7b9bd80df5b424";
      this.baseUrl = urlutils.concat(this.catalogUrl, this.defaults["LIBRARY"]);
      this.detailUrl = fromTemplate(urlutils.concat(this.baseUrl, "items/<%= id %>"));
      this.searchUrl = fromTemplate(urlutils.concat(this.baseUrl, "items.rss?query=+<%= term|encodeuri %>"));
      this.branches = null;
      this.http = {
        common: {
          xfrm: "html"
        },
        search: {
          xfrm: 'xml'
        }
      };
      this.domOperations = this.getDomOperations();
    }

    getCatalogUrl() {
      boundMethodCheck(this, CapitaLibrary);
      return urlutils.concat(this.baseUrl, "/home");
    }

    canSearchByIsbn() {
      return false;
    }

    canSearchByIsbn13() {
      return false;
    }

    buildSearchUrl(searchBy, searchTerm, request) {
      var idxLookup, term;
      boundMethodCheck(this, CapitaLibrary);
      idxLookup = {
        title: "title"
      };
      term = `${idxLookup[searchBy]}:(${searchTerm})`;
      return {
        by: searchBy,
        url: this.searchUrl({
          term: term
        })
      };
    }

    async parseSearchResults(response, request) {
      var items;
      boundMethodCheck(this, CapitaLibrary);
      items = (await this.domOperations.extractSearchResults(response));
      return items;
    }

    async parseInventoryLookup(response) {
      var availability;
      availability = (await this.domOperations.extractAvailability(response));
      return availability;
    }

  };

  // BEGIN src/catalogs/dom/capita.coffee
  CapitaDOMOperations = class CapitaDOMOperations extends DOMOperations {
    constructor(http, defaults) {
      super(http, defaults);
      this.extractSearchResults = this.extractSearchResults.bind(this);
      this.extractAvailability = this.extractAvailability.bind(this);
      this.bindingMap = {
        "Paperback": "book",
        "Book": "book",
        "DVD": "dvd",
        "unknown": "unknown",
        "eAudiobook": "audiobook",
        "Audiobook": "audiobook"
      };
    }

    async extractSearchResults(content) {
      var me, obj;
      boundMethodCheck(this, CapitaDOMOperations);
      me = this;
      obj = (await this.parser(content, this.http.search));
      return Array.from(obj.querySelectorAll("item")).map(function(el) {
        var author, binding, bindings, result;
        binding = "unknown";
        bindings = Array.from(el.querySelectorAll("format"));
        bindings.find(function(x) {
          x = textFromElement(x);
          if (me.bindingMap.hasOwnProperty(x)) {
            binding = me.bindingMap[x];
            return true;
          }
        });
        author = el.querySelector("creator") || el.querySelector("contributor");
        result = {
          id: textFromElement(el.querySelector("identifier")),
          title: normalizeTitle(textFromElement(el.querySelector("title"))),
          binding: binding,
          author: normalizeAuthor(textFromElement(author))
        };
        return result;
      });
    }

    async extractAvailability(content) {
      var branchHash, copiesAvailable, copiesTotal, data, obj;
      boundMethodCheck(this, CapitaDOMOperations);
      obj = (await this.parser(content));
      copiesTotal = copiesAvailable = 0;
      branchHash = {};
      obj.querySelectorAll("div#availability ul.options li").forEach(function(el) {
        var branch, found;
        branch = textFromElement(el.querySelector("span[itemprop=name]"));
        branchHash[branch] = 1;
        found = Array.from(el.querySelectorAll("tbody tr")).reduce(function(acc, tr) {
          var status;
          copiesTotal += 1;
          if (tr.classList.contains("unavailable")) {
            return true;
          }
          status = tr.querySelector("td.item-status");
          if (tr.classList.contains("available") || (status && status.classList.contains("available"))) {
            copiesAvailable += 1;
          }
          return true;
        }, false);
        if (!found) {
          copiesTotal += 1;
          if (el.classList.contains("available")) {
            return copiesAvailable += 1;
          }
        }
      });
      data = {
        estimated: false,
        count: copiesTotal,
        available: copiesAvailable,
        branches: hashToList(branchHash)
      };
      return data;
    }

  };

  registerDOMOperations(CapitaDOMOperations, "capita");

  // END src/catalogs/dom/capita.coffee
  register(CapitaLibrary, "capita", null, CapitaDOMOperations);

  // END src/catalogs/capita.coffee
  // BEGIN src/catalogs/chamo.coffee
  ChamoLibrary = class ChamoLibrary extends Catalog {
    constructor(name, state, country, id, url, catalogUrl, params, categories) {
      var defaults;
      defaults = {
        theme: "main"
      };
      super(name, state, country, id, url, catalogUrl, defaults, params, categories);
      this.getCatalogUrl = this.getCatalogUrl.bind(this);
      this.buildSearchUrl = this.buildSearchUrl.bind(this);
      this.vendor = "iii";
      this.version = "05e478512ca1fc7fde4d51974266630e";
      this.searchUrl = fromTemplate(urlutils.concat(catalogUrl, `/search/syndication?term_1=<%= term|encodeform %>&theme=${this.defaults.theme}`));
      this.detailUrl = fromTemplate(urlutils.concat(catalogUrl, `/lib/item?id=<%= id %>&theme=${this.defaults.theme}`));
      this.http = {
        common: {
          xfrm: "html"
        },
        search: {
          xfrm: 'xml'
        }
      };
      this.domOperations = this.getDomOperations();
    }

    getCatalogUrl() {
      boundMethodCheck(this, ChamoLibrary);
      return urlutils.concat(this.catalogUrl, `/search/query?theme=${this.defaults.theme}`);
    }

    buildSearchUrl(searchBy, searchTerm, request) {
      boundMethodCheck(this, ChamoLibrary);
      return {
        by: searchBy,
        url: this.searchUrl({
          term: searchTerm
        })
      };
    }

    async parseSearchResults(response, request) {
      var items;
      items = (await this.domOperations.extractSearchResults(response));
      return items;
    }

    async parseInventoryLookup(response, request) {
      return (await this.domOperations.extractAvailability(response));
    }

  };

  // BEGIN src/catalogs/dom/chamo.coffee
  ChamoDOMOperations = class ChamoDOMOperations extends DOMOperations {
    constructor() {
      super(...arguments);
      this.extractSearchResults = this.extractSearchResults.bind(this);
      this.extractAvailability = this.extractAvailability.bind(this);
    }

    async extractSearchResults(content) {
      var bindingMap, me, obj;
      boundMethodCheck(this, ChamoDOMOperations);
      obj = (await this.parser(content));
      bindingMap = {
        "electronic resource": "digital resource",
        "electronic book": "ebook",
        "sound recording": "audiobook"
      };
      me = this;
      return Array.from(obj.querySelectorAll("rss channel item")).reduce(function(acc, item) {
        var author, binding, bindingMatch, data, idmatch, title, titleAndAuthor;
        idmatch = /(chamo:[0-9]+)/.exec(textFromElement(item.querySelector("link")));
        if (!idmatch) {
          return acc;
        }
        titleAndAuthor = textFromElement(item.querySelector("title"));
        title = normalizeTitle(titleAndAuthor.split("/")[0]);
        author = normalizeAuthor(titleAndAuthor.split("/")[1]);
        if (title.length === 0) {
          return acc;
        }
        bindingMatch = /\[.*\]/.exec(titleAndAuthor.split("/")[0]);
        if (bindingMatch) {
          binding = bindingMap[bindingMatch[1]] || "book";
        } else {
          binding = "book";
        }
        data = {
          id: idmatch[1],
          title: title,
          author: author,
          binding: binding
        };
        acc.push(data);
        return acc;
      }, []);
    }

    async extractAvailability(content) {
      var inventory, obj, result;
      boundMethodCheck(this, ChamoDOMOperations);
      obj = (await this.parser(content));
      result = {
        available: 0,
        count: 0
      };
      inventory = Array.from(obj.querySelector(".table").querySelector("tbody").querySelectorAll("tr"));
      inventory.forEach(function(row) {
        if (row.cells.length < 6) {
          return;
        }
        result.count += 1;
        if (txtLower(row.cells[5]) === "available") {
          return result.available += 1;
        }
      });
      return result;
    }

  };

  registerDOMOperations(ChamoDOMOperations, "chamo");

  // END src/catalogs/dom/chamo.coffee
  register(ChamoLibrary, "chamo", null, ChamoDOMOperations);

  // END src/catalogs/chamo.coffee
  // BEGIN src/catalogs/cloudlibrary.coffee
  CloudLibraryCatalog = class CloudLibraryCatalog extends Catalog {
    constructor(name, state, country, id, url, catalogUrl, params, categories) {
      var defaults;
      defaults = {};
      super(name, state, country, id, url, catalogUrl, defaults, params, categories);
      this.newSession = this.newSession.bind(this);
      this.buildSearchUrl = this.buildSearchUrl.bind(this);
      this.parseSearchResults = this.parseSearchResults.bind(this);
      this.description = "Cloud Library Digital Catalog";
      if (this.catalogUrl[this.catalogUrl.length - 1] === "/") {
        this.catalogUrl = this.catalogUrl.substr(0, this.catalogUrl.length - 1);
      }
      this.searchUrl = fromTemplate(urlutils.concat(this.catalogUrl, "/search?title=<%= term|encodeuri %>&available=Any&language=&sort=&orderBy=relevence&owned=yes&_data=routes%2Flibrary.%24name.search"));
      this.version = "5efba749dc0bb66205f340b5a217c858";
      this.categories = ["book", "music", "audiobook"];
      this.allowMultiple = true;
      this.searchHeaders = this.buildInventoryLookupUrl = null;
      this.detailUrl = fromTemplate(`${this.catalogUrl}-document_id-<%= id %>`);
      this.http = {
        common: {
          xfrm: 'json',
          headers: [["Accept", "application/json, text/plain, */*"]]
        }
      };
    }

    canSearchByIsbn() {
      return false;
    }

    canSearchByIsbn13() {
      return false;
    }

    async newSession() {
      var me, opts, resp;
      boundMethodCheck(this, CloudLibraryCatalog);
      me = this;
      opts = {
        url: me.catalogUrl,
        xfrm: 'noop'
      };
      resp = (await me.httpRequest(opts));
      if (resp.http.redirected && resp.http.url.indexOf('NotFound.html') > 0) {
        return Promise.reject({
          message: "CatalogDisabled",
          url: opts.url
        });
      }
      return me.session.expiry = me.getNewSessionTimeout();
    }

    buildSearchUrl(searchBy, searchTerm, request) {
      boundMethodCheck(this, CloudLibraryCatalog);
      return {
        by: searchBy,
        url: this.searchUrl({
          term: searchTerm
        })
      };
    }

    parseSearchResults(response, request) {
      var me;
      boundMethodCheck(this, CloudLibraryCatalog);
      me = this;
      return response.results.search.items.reduce(function(acc, item) {
        acc.push({
          id: item.documentId,
          title: item.title,
          author: item.authors,
          url: me.getDetailUrl(item.documentId),
          binding: item.format,
          format: item.format,
          coverImage: item.ImageLinkThumbnail,
          availability: {
            count: item.totalCopies,
            available: item.currentlyAvailable
          }
        });
        return acc;
      }, []);
    }

  };

  register(CloudLibraryCatalog, "threem");

  // END src/catalogs/cloudlibrary.coffee
  // BEGIN src/catalogs/drupal.coffee
  DrupalLibrary = class DrupalLibrary extends Catalog {
    constructor(name, state, country, id, url, catalogUrl, params, categories) {
      var defaults;
      defaults = {};
      super(name, state, country, id, url, catalogUrl, defaults, params, categories);
      this.buildSearchUrl = this.buildSearchUrl.bind(this);
      this.parseSearchResults = this.parseSearchResults.bind(this);
      this.version = "9ea7e33a973fb27b52180692a050fb28";
      this.searchUrl = fromTemplate(urlutils.concat(this.catalogUrl, "/catalog/search/<%= by %>/<%= term|encodeuri %>"));
      this.detailUrl = `${this.catalogUrl}/catalog/record/##ID##`;
      this.http = {
        common: {
          xfrm: "html"
        }
      };
      this.domOperations = this.getDomOperations();
    }

    buildSearchUrl(searchBy, searchTerm, request) {
      var searchType;
      boundMethodCheck(this, DrupalLibrary);
      if (searchBy === "isbn" || searchBy === "isbn13") {
        searchType = "keyword";
      } else {
        searchType = "title";
      }
      return {
        by: searchBy,
        url: this.searchUrl({
          by: searchType,
          term: searchTerm
        })
      };
    }

    async parseSearchResults(response, request) {
      var items;
      boundMethodCheck(this, DrupalLibrary);
      items = (await this.domOperations.extractSearchResults(response));
      return items;
    }

    buildInventoryLookupUrl(request, item) {
      return {
        url: this.getDetailUrl(encodeURIComponent(item.id))
      };
    }

    async parseInventoryLookup(response, request) {
      return (await this.domOperations.extractAvailability(response));
    }

  };

  // BEGIN src/catalogs/dom/drupal.coffee
  DrupalDOMOperations = class DrupalDOMOperations extends DOMOperations {
    constructor() {
      super(...arguments);
      this.extractSearchResults = this.extractSearchResults.bind(this);
      this.extractAvailability = this.extractAvailability.bind(this);
    }

    async extractSearchResults(content) {
      var me, obj, results, searchResults;
      boundMethodCheck(this, DrupalDOMOperations);
      obj = (await this.parser(content));
      me = this;
      results = [];
      searchResults = obj.querySelectorAll("div#search-results");
      if (searchResults.length === 0) {
        return results;
      }
      searchResults = searchResults[0].querySelectorAll("div.search-result");
      searchResults.forEach(function(el) {
        var author, binding, coverUrl, id, info, link, title;
        binding = commonBindingMappings(txtLower(textFromElement(el.querySelector("div.mat-type-icon"))));
        coverUrl = el.querySelector("img.result-image").getAttribute("src");
        info = el.querySelector("div.result-info a.result-title");
        link = info.getAttribute("href");
        id = /record\/(\w+)/.exec(link);
        if (id) {
          id = id[1];
        }
        if (!id) {
          return;
        }
        title = normalizeTitle(textFromElement(info));
        author = "";
        info = el.querySelectorAll("div.result-info span a");
        info.forEach(function(span) {
          if (span.getAttribute("href").indexOf("author") >= 0) {
            return author = normalizeAuthor(textFromElement(span));
          }
        });
        return results.push({
          id: id,
          title: title,
          author: author,
          coverUrl: coverUrl,
          binding: binding
        });
      });
      return results;
    }

    async extractAvailability(content) {
      var availableCopies, branchHash, data, excludedStatus, obj, searchResults, totalCopies;
      boundMethodCheck(this, DrupalDOMOperations);
      obj = (await this.parser(content));
      excludedStatus = ["Missing", "Claims Returned", "Lost and Paid"];
      branchHash = {};
      totalCopies = availableCopies = 0;
      searchResults = obj.querySelectorAll("table#record-copies-table tbody tr");
      searchResults.forEach(function(el) {
        var columns, status;
        columns = el.querySelectorAll("td");
        branchHash[textFromElement(columns[2])] = 1;
        status = textFromElement(columns[3]);
        if (excludedStatus.indexOf(status) >= 0) {
          return;
        }
        totalCopies += 1;
        if (status === "On Shelf") {
          return availableCopies += 1;
        }
      });
      data = {
        estimated: false,
        count: totalCopies,
        available: availableCopies,
        branches: hashToList(branchHash)
      };
      return data;
    }

  };

  registerDOMOperations(DrupalDOMOperations, "drupal");

  // END src/catalogs/dom/drupal.coffee
  register(DrupalLibrary, "drupal", null, DrupalDOMOperations);

  // END src/catalogs/drupal.coffee
  // BEGIN src/catalogs/encore.coffee
  EncoreLibrary = class EncoreLibrary extends Catalog {
    constructor(name, state, country, id, url, catalogUrl, params, categories) {
      var defaults;
      defaults = {
        "encore_path": "/iii/encore/",
        "record_delim": "__",
        "availabilityItemTableSelector": ".itemTable",
        "LIMIT_BRANCH": null,
        "LIMIT_BRANCH_KEY": "c"
      };
      categories = ["book", "audiobook", "music"];
      super(name, state, country, id, url, catalogUrl, defaults, params, categories);
      this.getCatalogUrl = this.getCatalogUrl.bind(this);
      this.buildSearchUrl = this.buildSearchUrl.bind(this);
      this.parseSearchResults = this.parseSearchResults.bind(this);
      this.buildInventoryLookupUrl = this.buildInventoryLookupUrl.bind(this);
      this.version = "5a3f37e61f8cfeca83bb118d973c0765";
      this.baseUrl = urlutils.concat(this.catalogUrl, this.defaults["encore_path"]);
      this.detailUrl = fromTemplate(urlutils.concat(this.baseUrl, `record/C${this.defaults["record_delim"]}R<%= id %>`));
      this.searchUrl = fromTemplate(urlutils.concat(this.baseUrl, `search/C${this.defaults["record_delim"]}S<%= params|encodeuri %>`));
      this.http = {
        common: {
          xfrm: "html"
        }
      };
      this.domOperations = this.getDomOperations();
    }

    getCatalogUrl() {
      boundMethodCheck(this, EncoreLibrary);
      return this.baseUrl;
    }

    buildSearchUrl(searchBy, searchTerm, request) {
      var format, formatMap, idxLookup, params;
      boundMethodCheck(this, EncoreLibrary);
      idxLookup = {
        isbn: "",
        isbn13: "",
        title: "t"
      };
      formatMap = {
        book: "",
        audiobook: "f:z",
        music: "f:j"
      };
      format = encodeURI(formatMap[request.category] || "");
      searchTerm = searchTerm.replaceAll(/[?\/]/g, btoa);
      params = `${idxLookup[searchBy]}:(${searchTerm}) ${format}`.trim();
      if (this.defaults["LIMIT_BRANCH"] !== null) {
        params = `${params} ${this.defaults['LIMIT_BRANCH_KEY']}:${this.defaults['LIMIT_BRANCH']}`;
      }
      return {
        by: searchBy,
        url: this.searchUrl({
          params: params
        })
      };
    }

    async parseSearchResults(response, request) {
      var items, me;
      boundMethodCheck(this, EncoreLibrary);
      me = this;
      items = (await this.domOperations.extractSearchResults(response));
      items = items.map(function(el) {
        return Object.assign({}, el, {
          url: me.getDetailPageUrl(el.id)
        });
      });
      return items;
    }

    buildInventoryLookupUrl(request, item) {
      boundMethodCheck(this, EncoreLibrary);
      return {
        url: this.detailUrl({
          id: item.id
        }) + "?lang=eng"
      };
    }

    async parseInventoryLookup(response) {
      return (await this.domOperations.extractAvailability(response, this.defaults));
    }

  };

  // BEGIN src/catalogs/dom/encore.coffee
  EncoreDOMOperations = class EncoreDOMOperations extends DOMOperations {
    constructor() {
      super(...arguments);
      this.extractSearchResults = this.extractSearchResults.bind(this);
      this.extractAvailability = this.extractAvailability.bind(this);
    }

    async extractSearchResults(content) {
      var ENCORETITLES_RE, ID_RE, MATCHBREAK_RE, me, obj;
      boundMethodCheck(this, EncoreDOMOperations);
      obj = (await this.parser(content));
      if (findAllMatchingNodes(obj, ":contains('would be here')").length > 0) {
        return [];
      }
      ENCORETITLES_RE = new RegExp(/(.*?)\s*(\[.*\])?$/);
      ID_RE = new RegExp(/C__R([0-9A-Za-z]+)_/);
      MATCHBREAK_RE = new RegExp(/(.*)--/);
      me = this;
      return Array.from(obj.querySelectorAll("div.dpBibTitle")).reduce(function(acc, el) {
        var alt_binding, author, binding, encoreTitleMatch, link, matchBreak, result, title;
        link = el.querySelector(".title a") || el.querySelector("a");
        title = textFromElement(link);
        author = el.querySelector(".dpBibAuthor a") || el.parentNode.querySelector(".dpBibAuthor a") || el.querySelector(".title .customSecondaryText");
        encoreTitleMatch = ENCORETITLES_RE.exec(title);
        alt_binding = void 0;
        if (encoreTitleMatch) {
          title = encoreTitleMatch[1];
          alt_binding = encoreTitleMatch[2];
        }
        binding = txtLower(textFromElement(el.parentNode.querySelector(".recordDetailValue span.itemMediaDescription")) || alt_binding);
        if (binding) {
          matchBreak = MATCHBREAK_RE.exec(binding);
          if (matchBreak) {
            binding = matchBreak[1];
          }
          binding = commonBindingMappings(binding, "book");
        }
        result = ID_RE.exec(link.getAttribute("href"));
        result = result && result[1];
        if (result) {
          acc.push({
            id: result,
            title: normalizeTitle(textFromElement(title)),
            author: (author && normalizeAuthor(textFromElement(author))) || void 0,
            binding: binding || void 0
          });
        }
        return acc;
      }, []);
    }

    async extractAvailability(content, defaults) {
      var availableText, branchHash, columns, data, inventoryTable, locationHeaders, obj, reduceAvailabilityFromRow, statusHeaders;
      boundMethodCheck(this, EncoreDOMOperations);
      obj = (await this.parser(content));
      branchHash = {};
      availableText = ["CHECKED IN", "CHECK SHELVES", "AVAILABLE", "LOOK ON SHELF", "CHECK ON SHELF", "ON SHELF", "ON THE SHELF", "CHECK SHELF", "IN LIBRARY"];
      data = {
        estimated: false,
        count: null,
        available: null,
        branches: []
      };
      inventoryTable = Array.from(obj.querySelectorAll(`table${defaults.availabilityItemTableSelector}`));
      if (inventoryTable.length > 0) {
        inventoryTable = inventoryTable[inventoryTable.length - 1];
        locationHeaders = ["library", "location"];
        statusHeaders = ["status", "availability"];
        columns = Array.from(inventoryTable.querySelectorAll("tr th")).reduce(function(acc, el) {
          var name;
          name = txtLower(el.textContent);
          if (acc.status === null && anyBeginsWith(statusHeaders, name, null)) {
            acc.status = acc.currentColumn;
          }
          if (acc.branch === null && anyBeginsWith(locationHeaders, name, null)) {
            acc.branch = acc.currentColumn;
          }
          acc.currentColumn += parseInt(el.getAttribute("colspan") || 1);
          return acc;
        }, {
          currentColumn: 0,
          status: null,
          branch: null
        });
        if (columns.status === null) {
          columns.status = columns.currentColumn - 1;
        }
        reduceAvailabilityFromRow = function(acc, el) {
          var col;
          col = Array.from(el.querySelectorAll("td"));
          if (col && col.length > 0) {
            acc.count = (acc.count || 0) + 1;
            if (anyBeginsWith(availableText, textFromElement(col[columns.status]))) {
              if (columns.branch !== null) {
                branchHash[textFromElement(col[columns.branch])] = 1;
              }
              acc.available = (acc.available || 0) + 1;
            }
          }
          return acc;
        };
        data = Array.from(inventoryTable.querySelectorAll("tr")).reduce(reduceAvailabilityFromRow, data);
        data.branches = hashToList(branchHash);
      }
      if (data.count === null) {
        data.count = 0;
        data.available = 0;
        obj.querySelectorAll("div.dpBibHoldingStatement").forEach(function(el) {
          data.count += 1;
          if (anyBeginsWith(availableText, textFromElement(el))) {
            return data.available += 1;
          }
        });
      }
      data.estimated = data.count === 20;
      return data;
    }

  };

  registerDOMOperations(EncoreDOMOperations, "encore");

  // END src/catalogs/dom/encore.coffee
  register(EncoreLibrary, "encore", null, EncoreDOMOperations);

  // END src/catalogs/encore.coffee
  // BEGIN src/catalogs/everand.coffee
  EverandCatalog = class EverandCatalog extends Catalog {
    constructor(name, state, country, id, url, catalogUrl, params, categories) {
      var defaults;
      defaults = {};
      categories = ["book", "audiobook"];
      super(name, state, country, id, url, catalogUrl, defaults, params, categories);
      this.buildSearchUrl = this.buildSearchUrl.bind(this);
      this.parseSearchResults = this.parseSearchResults.bind(this);
      this.version = "727c50bf1ba3ca6c6b724aa2e7ffd9e8";
      this.allowMultiple = true;
      this.baseUrl = "https://www.everand.com/";
      this.catalogUrl = "https://www.everand.com/";
      this.libraryUrl = "https://www.everand.com/";
      this.searchUrl = fromTemplate(urlutils.concat(this.baseUrl, "search/query?query=<%= term|encodeuri %>"));
      this.detailUrl = fromTemplate(urlutils.concat(this.baseUrl, "<%= binding %>/<%= id %>/"));
      this.initializeUrl = this.baseUrl;
      this.http = {
        common: {
          xfrm: 'json'
        }
      };
    }

    canSearchByIsbn() {
      return false;
    }

    canSearchByIsbn13() {
      return false;
    }

    buildSearchUrl(searchBy, searchTerm, request) {
      boundMethodCheck(this, EverandCatalog);
      return {
        by: searchBy,
        url: this.searchUrl({
          term: searchTerm
        })
      };
    }

    parseSearchResults(response, request) {
      var me, results;
      boundMethodCheck(this, EverandCatalog);
      me = this;
      results = [];
      if (response.results.audiobooks) {
        results = results.concat(response.results.audiobooks.content.documents);
      }
      if (response.results.books) {
        results = results.concat(response.results.books.content.documents);
      }
      return results.map(function(el) {
        return {
          id: el.id,
          title: el.title,
          author: el.author && el.author.name || el.author,
          binding: commonBindingMappings(el.type),
          url: me.detailUrl({
            binding: el.type,
            id: el.id
          }),
          availability: {
            availabilityType: "always"
          }
        };
      });
    }

    parseInventoryLookup(response) {}

  };

  registerNonLibraryCatalog(EverandCatalog, "everand", "Everand");

  // END src/catalogs/everand.coffee
  // BEGIN src/catalogs/evergreen.coffee
  EvergreenResponse = class EvergreenResponse {
    constructor(data) {
      this.rawPayload = this.rawPayload.bind(this);
      this.field = this.field.bind(this);
      this.ids = this.ids.bind(this);
      this.isValid = this.isValid.bind(this);
      this._data = data;
    }

    rawPayload(index) {
      return this.isValid() && this._data[index];
    }

    field(index) {
      return this.rawPayload(0).__p[index];
    }

    ids() {
      return this.rawPayload(0).ids;
    }

    isValid() {
      return this._data && this._data.length > 0;
    }

  };

  EvergreenResponseFromResp = function(body) {
    return new EvergreenResponse(body.payload);
  };

  EvergreenLibrary = class EvergreenLibrary extends Catalog {
    constructor(name, state, country, id, url, catalogUrl, params, categories) {
      var defaults;
      defaults = {
        "skin": "default",
        "detailUrl": "/eg/opac/record/",
        "limitBranches": [],
        "ORG_UNIT": 1,
        "record_query_method": "open-ils.search.biblio.record.print"
      };
      super(name, state, country, id, url, catalogUrl, defaults, params, categories);
      this.newSession = this.newSession.bind(this);
      this.getCatalogUrl = this.getCatalogUrl.bind(this);
      this.buildSearchUrl = this.buildSearchUrl.bind(this);
      this.getDetailPageUrl = this.getDetailPageUrl.bind(this);
      this._extractBiblioInfo = this._extractBiblioInfo.bind(this);
      this.parseSearchResults = this.parseSearchResults.bind(this);
      this.getBiblioRecord = this.getBiblioRecord.bind(this);
      this.buildInventoryLookupUrl = this.buildInventoryLookupUrl.bind(this);
      this.parseInventoryLookup = this.parseInventoryLookup.bind(this);
      this.version = "78e3e7a43f9e7d0087904e4297b81012";
      this.detailUrl = `${this.catalogUrl}${this.defaults["detailUrl"]}`;
      this.searchUrl = urlutils.concat(this.catalogUrl, "/osrf-gateway-v1");
      this.branchUrl = urlutils.concat(this.catalogUrl, "/opac/common/js/en-US/OrgTree.js");
      this.branches = null;
      this.branchesLoaded = false;
      this.biblio_re = [
        {
          key: 'title',
          transform: normalizeTitle,
          regex: /Title:\s+(.*?)(<|:by)/
        },
        {
          key: 'author',
          transform: normalizeAuthor,
          regex: /Author:\s+([^<]+)/
        },
        {
          key: 'binding',
          transform: commonBindingMappings,
          regex: /Item Type:\s+([^<]+)/
        }
      ];
      this.defaults.PARALLEL_REQUESTS = 2;
      this.http = {
        common: {
          xfrm: 'json',
          headers: [["X-Requested-With", "XMLHttpRequest"]]
        }
      };
    }

    async newSession() {
      var body, egResp, me, opts, resp;
      boundMethodCheck(this, EvergreenLibrary);
      me = this;
      body = `service=open-ils.actor&method=open-ils.actor.org_unit.retrieve&param=&param=${this.defaults.ORG_UNIT}`;
      opts = {
        url: this.searchUrl,
        body: body,
        xfrm: 'json'
      };
      resp = (await me.httpRequest(opts));
      egResp = EvergreenResponseFromResp(resp.body);
      me.session.LIBRARY_SHORTNAME = egResp.field(9);
      me.session.LIBRARY_FULLNAME = egResp.field(6);
      return me.session.expiry = me.getNewSessionTimeout();
    }

    getCatalogUrl() {
      boundMethodCheck(this, EvergreenLibrary);
      return urlutils.concat(this.catalogUrl, `/eg/opac/home?loc=${this.defaults.ORG_UNIT}`);
    }

    buildSearchUrl(searchBy, searchTerm, request) {
      var params, qs, searchClass;
      boundMethodCheck(this, EvergreenLibrary);
      if (request.category === "book" && (searchBy === "isbn" || searchBy === "isbn13")) {
        searchBy = "isbn";
        searchClass = "keyword";
        searchTerm = `identifier|isbn:${searchTerm}`;
      } else {
        searchClass = "title";
        searchTerm = `title:${searchTerm}`;
      }
      params = [
        ["service",
        "open-ils.search"],
        ["method",
        "open-ils.search.biblio.multiclass.query"],
        ["locale",
        "en-US"],
        ["param",
        '{"depth":0,"limit":15,"offset":0,"visibility_limit":30,' + '"default_class":"' + searchClass + '","sort":"pubdate","sort_dir":"desc"}'],
        ["param",
        `\"${searchTerm} site(${this.session.LIBRARY_SHORTNAME})\"`],
        [
          "param",
          1 // docache
        ]
      ];
      qs = toQueryString(params);
      return {
        by: searchBy,
        url: this.searchUrl,
        body: qs
      };
    }

    getDetailPageUrl(id) {
      var divider, res;
      boundMethodCheck(this, EvergreenLibrary);
      res = `${this.detailUrl}${id}`;
      if (parseInt(this.defaults["ORG_UNIT"]) !== 1) {
        divider = "&";
        if (res.indexOf("?") < 0) {
          divider = "?";
        }
        res = `${res}${divider}loc=${this.defaults['ORG_UNIT']}`;
      }
      return res;
    }

    _extractBiblioInfo(content) {
      boundMethodCheck(this, EvergreenLibrary);
      return this.biblio_re.reduce(function(acc, extract) {
        var match;
        match = extract.regex.exec(content);
        if (match) {
          acc[extract.key] = extract.transform(match[1]);
        }
        return acc;
      }, {});
    }

    parseSearchResults(response, request) {
      var egResp, expected_length, ids, me, responseBiblioMap, results, this_id;
      boundMethodCheck(this, EvergreenLibrary);
      this_id = null;
      egResp = EvergreenResponseFromResp(response);
      if (!egResp.isValid() || !egResp.ids()) {
        return [];
      }
      me = this;
      ids = response.payload[0].ids;
      expected_length = ids.length;
      responseBiblioMap = {
        "open-ils.search.biblio.record.print": function(resp) {
          var content;
          content = resp.field(10)["__p"][2];
          return me._extractBiblioInfo(content);
        },
        "open-ils.search.biblio.record.mods_slim.retrieve": function(resp) {
          var res;
          res = {
            title: normalizeTitle(resp.rawPayload(0)[0]["__p"][0]),
            author: normalizeAuthor(resp.rawPayload(0)[0]["__p"][1]),
            binding: commonBindingMappings(resp.rawPayload(0)[0]["__p"][9][0])
          };
          return res;
        }
      };
      results = ids.map(function(row) {
        this_id = row[0];
        return me.getBiblioRecord(request, this_id).then(function(resp) {
          var biblioResp, result;
          try {
            biblioResp = EvergreenResponseFromResp(resp.response);
            if (!biblioResp.isValid()) {
              return null;
            }
            result = {
              "id": resp.id,
              "url": me.getDetailPageUrl(resp.id)
            };
            result = Object.assign(result, responseBiblioMap[me.defaults.record_query_method](biblioResp));
            if (result && result.title) {
              return result;
            }
          } catch (error1) {

          }
          return null;
        });
      });
      return Promise.all(results).then(function(res) {
        return res.filter(function(el) {
          return el !== null;
        });
      });
    }

    async getBiblioRecord(request, id) {
      var me, opts, params, qs, rv;
      boundMethodCheck(this, EvergreenLibrary);
      params = [["service", "open-ils.search"], ["method", this.defaults.record_query_method], ["locale", "en-US"], ["param", `[\"${id}\"]`]];
      qs = toQueryString(params);
      me = this;
      opts = {
        url: me.searchUrl,
        body: qs,
        xfrm: 'json'
      };
      rv = (await me.httpRequest(opts, request));
      return {
        request: request,
        response: rv.body,
        id: id
      };
    }

    buildInventoryLookupUrl(request, item) {
      var params, qs;
      boundMethodCheck(this, EvergreenLibrary);
      params = [["service", "open-ils.search"], ["method", "open-ils.search.biblio.record.copy_count"], ["locale", "en-US"], ["param", this.defaults["ORG_UNIT"]], ["param", item.id], ["depth", "1"]];
      qs = toQueryString(params);
      return {
        url: this.searchUrl,
        body: qs
      };
    }

    parseInventoryLookup(response) {
      var filterByOrgUnit, org_unit, res;
      boundMethodCheck(this, EvergreenLibrary);
      org_unit = parseInt(this.defaults["ORG_UNIT"]);
      if (org_unit !== 1) {
        filterByOrgUnit = function(el) {
          return el.org_unit === org_unit;
        };
        res = response.payload[0].find(filterByOrgUnit) || response.payload[0][1];
        return pluck(res, ["count", "available"]);
      } else {
        return pluck(response.payload[0][0], ["count", "available"]);
      }
    }

  };

  register(EvergreenLibrary, "evergreen");

  // END src/catalogs/evergreen.coffee
  // BEGIN src/catalogs/evolve.coffee

    // END src/catalogs/evolve.coffee
  // BEGIN src/catalogs/exlibris_primo.coffee
  ExLibrisPrimoLibrary = class ExLibrisPrimoLibrary extends Catalog {
    constructor(name, state, country, id, url, catalogUrl, params, categories) {
      var defaults;
      defaults = {
        "VID": null,
        "INSTITUTION": "",
        "SEARCH_SCOPE": "everything",
        "TAB": "default_tab",
        "DISCOVERY_PATH": "",
        CONTEXT: null
      };
      super(name, state, country, id, url, catalogUrl, defaults, params, categories);
      this.newSession = this.newSession.bind(this);
      this.buildSearchUrl = this.buildSearchUrl.bind(this);
      if (defaults.CONTEXT) {
        defaults.CONTEXT_PARAM = `&context=${defaults.CONTEXT}`;
      }
      this.version = "790a28c03e5e6da0d5292e710db624c2";
      this.urls = {
        discovery: {
          authTokenUrl: fromTemplate(urlutils.concat(this.catalogUrl, "/primaws/rest/pub/institution/<%= institutionCode %>/guestJwt?" + "isGuest=true&lang=en&targetUrl=<%= searchUrl|encodeuri %>&viewId=<%= VID %>")),
          searchUrl: fromTemplate(urlutils.concat(this.catalogUrl, "/<%= DISCOVERY_PATH %>primaws/rest/pub/pnxs?blendFacetsSeparately=false" + "&disableCache=false&getMore=0&inst=<%= institutionCode %>&lang=en&limit=10&newspapersActive=" + "false&newspapersSearch=false&offset=0&pcAvailability=false&q=any,contains,<%= term|encodeuri %>&qExclude=" + "&qInclude=&rtaLinks=true&scope=<%= SEARCH_SCOPE %>&skipDelivery=N&sort=rank&tab=<%= TAB %>" + "&vid=<%= VID %>")),
          sourceUrl: fromTemplate(urlutils.concat(this.catalogUrl, "/discovery/search?query=any,contains,<%= term|encodeuri %>&tab=<%= TAB %>&search_scope=<%= SEARCH_SCOPE %>&vid=<%= VID %>&offset=0")),
          detailUrl: fromTemplate(urlutils.concat(this.catalogUrl, "/discovery/fulldisplay?docid=<%= id %>&vid=<%= VID %>&searchScope=<%= SEARCH_SCOPE %><%= CONTEXT_PARAM %>")),
          sessionConfigurationUrl: fromTemplate(urlutils.concat(this.catalogUrl, '/primaws/rest/pub/configuration/vid/<%= VID %>'))
        },
        "primo": {
          authTokenUrl: fromTemplate(urlutils.concat(this.catalogUrl, "/primo/v1/jwt/<%= institutionCode %>?" + "vid=<%= VID %>&lang=en_US&apikey=<%= apikey %>")),
          searchUrl: fromTemplate(urlutils.concat(this.catalogUrl, "/primo/v1/search" + "?apikey=<%= apikey %>" + "&inst=<%= institutionCode %>&lang=en&limit=10" + "&pcAvailability=false&q=any,contains,<%= term|encodeuri %>&qExclude=" + "&scope=<%= SEARCH_SCOPE %>&tab=<%= TAB %>" + "&vid=<%= VID %>")),
          sourceUrl: fromTemplate(urlutils.concat(this.catalogUrl, "/primo-explore/search?vid=<%= VID %>&mode=advanced&isIframeSSO=true")),
          detailUrl: fromTemplate(urlutils.concat(this.catalogUrl, "/primo-explore/fulldisplay?docid=<%= id %>&vid=<%= VID %>&searchScope=<%= SEARCH_SCOPE %>& primo_library/libweb/action/dlDisplay.do?")),
          sessionConfigurationUrl: fromTemplate(urlutils.concat(this.catalogUrl, '/primo_library/libweb/webservices/rest/v1/configuration/<%= VID %>'))
        },
        "primo-explore": {
          authTokenUrl: fromTemplate(urlutils.concat(this.catalogUrl, "/primo_library/libweb/webservices/rest/v1/guestJwt/<%= institutionCode %>?" + "vid=<%= VID %>&lang=en_US")),
          searchUrl: fromTemplate(urlutils.concat(this.catalogUrl, "/primo_library/libweb/webservices/rest/primo-explore/v1/pnxs" + "?inst=<%= institutionCode %>&lang=en_US&limit=10" + "&pcAvailability=false&q=any,contains,<%= term|encodeuri %>" + "&scope=<%= SEARCH_SCOPE %>&tab=<%= TAB %>" + "&vid=<%= VID %>")),
          sourceUrl: fromTemplate(urlutils.concat(this.catalogUrl, "/primo-explore/search?vid=<%= VID %>&mode=advanced&isIframeSSO=true")),
          detailUrl: fromTemplate(urlutils.concat(this.catalogUrl, "/primo-explore/fulldisplay?docid=<%= id %>&vid=<%= VID %>&searchScope=<%= SEARCH_SCOPE %>& primo_library/libweb/action/dlDisplay.do?")),
          sessionConfigurationUrl: fromTemplate(urlutils.concat(this.catalogUrl, '/primo_library/libweb/webservices/rest/v1/configuration/<%= VID %>'))
        }
      };
      this.buildInventoryLookupUrl = null;
      this.commonHeaders = [["Content-Type", "application/json"], ["Accept", "application/json, text/plain, */*"]];
      this.http = {
        common: {
          xfrm: 'json'
        }
      };
    }

    canSearchByIsbn() {
      return false;
    }

    canSearchByIsbn13() {
      return false;
    }

    async newSession() {
      var args, authOpts, authResp, authUrl, finalUrl, me, opts, resp, root, searchUrl, settings, url;
      boundMethodCheck(this, ExLibrisPrimoLibrary);
      me = this;
      if (me.catalogUrl.indexOf('exlibrisgroup.com') < 0) {
        opts = {
          url: me.catalogUrl,
          xfrm: 'noop'
        };
        resp = (await me.httpRequest(opts));
        finalUrl = new URL(resp.http.url);
        me.session.catalogType = finalUrl.pathname.substr(1).split('/')[0];
        me.session.VID = me.defaults.VID || finalUrl.searchParams.get("vid");
      } else {
        me.session.catalogType = 'discovery';
        me.session.VID = me.defaults.VID;
      }
      me.session.detailUrl = me.urls[me.session.catalogType].detailUrl;
      if (me.urls[me.session.catalogType].sessionConfigurationUrl) {
        settings = Object.assign({}, me.defaults, me.session);
        url = me.urls[me.session.catalogType].sessionConfigurationUrl(settings);
        opts = {
          url: url,
          xfrm: 'json'
        };
        resp = (await me.httpRequest(opts));
        root = resp.body['institution-libraries'];
        me.session.institutionCode = me.session.VID.split(":")[0];
        me.session.fullConfig = resp.body;
        me.session.SEARCH_SCOPE = (resp.body.searchWithinJournalConfig && resp.body.searchWithinJournalConfig.scope) || resp.body['primo-view']['scopes'][0] || me.defaults.SEARCH_SCOPE;
        if (me.session.SEARCH_SCOPE['scope-id']) {
          me.session.SEARCH_SCOPE = me.session.SEARCH_SCOPE['scope-id'];
        }
        me.session.TAB = (resp.body.searchWithinJournalConfig && resp.body.searchWithinJournalConfig.tab) || resp.body['primo-view']['available-tabs'][0] || me.defaults.TAB;
      }
      if (me.urls[me.session.catalogType].authTokenUrl) {
        searchUrl = me.urls[me.session.catalogType].sourceUrl(Object.assign({}, {
          term: "="
        }, me.defaults, me.session));
        searchUrl = encodeURIComponent(searchUrl);
        args = Object.assign({}, me.defaults, me.session, {
          searchUrl: searchUrl
        });
        authUrl = me.urls[me.session.catalogType].authTokenUrl(args);
        authOpts = {
          url: authUrl,
          xfrm: 'noop'
        };
        authResp = (await me.httpRequest(authOpts));
        me.credentials = authResp.body.replace('"', '');
        return me.commonHeaders = webrequestHelpers.authorization(me.commonHeaders, me.credentials);
      }
    }

    buildSearchUrl(searchBy, searchTerm, request) {
      var args;
      boundMethodCheck(this, ExLibrisPrimoLibrary);
      args = Object.assign({}, {
        term: searchTerm
      }, {
        institutionCode: this.session.VID.split(":")[0]
      }, this.defaults, this.session);
      return {
        by: searchBy,
        url: this.urls[this.session.catalogType].searchUrl(args)
      };
    }

    parseSearchResults(response, request) {
      return response.docs.reduce(function(acc, el) {
        var data, e;
        if (el.delivery || el.pnx.delivery) { // .availability.indexOf("available_in_library") >= 0
          try {
            data = {
              id: el.pnx.control.recordid[0],
              author: (el.pnx.addata.au || el.pnx.display.creator || el.pnx.display.contributor)[0],
              title: el.pnx.display.title[0],
              binding: commonBindingMappings((el.pnx.addata.format || el.pnx.display.type)[0]),
              availabilityUrl: el.delivery.availabilityLinksUrl,
              availability: {
                isAvailable: (el.pnx.display.availibrary && el.pnx.display.availibrary.length > 0) || void 0
              }
            };
            acc.push(data);
          } catch (error1) {
            e = error1;
            logger.info(e);
          }
        }
        return acc;
      }, []);
    }

  };

  register(ExLibrisPrimoLibrary, "primo");

  // END src/catalogs/exlibris_primo.coffee
  // BEGIN src/catalogs/follettdestiny.coffee
  FollettDestinyLibrary = class FollettDestinyLibrary extends Catalog {
    constructor(name, state, country, id, url, catalogUrl, params, categories) {
      var defaults;
      defaults = {
        site: 100,
        context: null
      };
      super(name, state, country, id, url, catalogUrl, defaults, params, categories);
      this.getCatalogUrl = this.getCatalogUrl.bind(this);
      this.newSession = this.newSession.bind(this);
      this.buildSearchUrl = this.buildSearchUrl.bind(this);
      this.version = "8431f438e1b03dba3a7fd259ae6de859";
      this.initializeUrl = urlutils.concat(this.catalogUrl, "/");
      this.initializeUrl2 = urlutils.concat(this.catalogUrl, "/common/welcome.jsp?site=" + this.defaults.site);
      if (this.defaults.context) {
        this.initializeUrl2 = this.initializeUrl2 + "&context=" + this.defaults.context;
      }
      this.searchUrl = urlutils.concat(this.catalogUrl, "/cataloging/servlet/handlebasicsearchform.do");
      this.detailUrl = fromTemplate(urlutils.concat(this.catalogUrl, "/cataloging/servlet/presenttitledetailform.do?bibID=<%= id %>&site=<%= site %>&viewType=2"));
      this.http = {
        common: {
          xfrm: "html"
        }
      };
      this.domOperations = this.getDomOperations();
    }

    getCatalogUrl() {
      boundMethodCheck(this, FollettDestinyLibrary);
      return this.initializeUrl2;
    }

    async newSession() {
      var me, opts, opts2;
      boundMethodCheck(this, FollettDestinyLibrary);
      me = this;
      opts = {
        url: me.initializeUrl,
        xfrm: 'noop'
      };
      await me.httpRequest(opts);
      opts2 = {
        url: me.initializeUrl2,
        xfrm: 'noop'
      };
      await me.httpRequest(opts2);
      return me.session.expiry = me.getNewSessionTimeout();
    }

    buildSearchUrl(searchBy, searchTerm, request) {
      var payload, searchIndex;
      boundMethodCheck(this, FollettDestinyLibrary);
      searchIndex = {
        "isbn": "6",
        "isbn13": "6"
      }[searchBy] || "1";
      payload = {
        searchType: "keyword",
        redisplay: "false",
        showLimiterOptions: "true",
        digitalContentMode: "0",
        keywordText: searchTerm,
        includeLibrary: "true",
        materialType: "0"
      };
      return {
        by: searchBy,
        url: this.searchUrl,
        body: toQueryString(payload)
      };
    }

    async parseSearchResults(response, request) {
      var items, me;
      me = this;
      return items = (await this.domOperations.extractSearchResults(response));
    }

  };

  // BEGIN src/catalogs/dom/follettdestiny.coffee
  FollettDestinyDOMOperations = class FollettDestinyDOMOperations extends DOMOperations {
    constructor() {
      super(...arguments);
      this.extractSearchResults = this.extractSearchResults.bind(this);
    }

    async extractSearchResults(content) {
      var obj;
      boundMethodCheck(this, FollettDestinyDOMOperations);
      obj = (await this.parser(content));
      return Array.from(obj.querySelectorAll("table#keywordTable tr")).reduce(function(acc, elem) {
        var author, available, bibId, bibId_r, binding, bindingMap, children, cleanData, counts_r, data, imgs, src, title, titleLink, total;
        title = null;
        titleLink = elem.querySelector("a.DetailLink");
        if (!titleLink) {
          return acc;
        }
        bibId_r = /bibID=(\d+)/.exec(titleLink.getAttribute("href"));
        if (!bibId_r) {
          return acc;
        }
        bibId = bibId_r[1];
        title = textFromElement(titleLink);
        children = Array.from(elem.children);
        if (children.length < 2) {
          return acc;
        }
        data = children[1].querySelectorAll("table tr td")[2];
        if (data) {
          data = textFromElement(data).split(/\s\s+/);
        } else {
          data = [];
        }
        cleanData = [];
        data.forEach(function(el) {
          el = el.trim();
          if (el.length > 0) {
            return cleanData.push(el);
          }
        });
        author = normalizeAuthor(cleanData[1]);
        src = textFromElement(children[2]) || "";
        counts_r = /(\d+) of (\d+) available/.exec(src);
        if (counts_r) {
          total = parseInt(counts_r[2]);
          available = parseInt(counts_r[1]);
        }
        binding = void 0;
        imgs = elem.querySelectorAll("img");
        imgs.forEach(function(el) {
          var mtype;
          mtype = /\/materialtype\//.exec(el.getAttribute("src"));
          if (mtype) {
            return binding = el.getAttribute("title").toLowerCase();
          }
        });
        bindingMap = {
          hardcover: "book",
          paperback: "book"
        };
        binding = bindingMap[binding] || binding;
        acc.push({
          title: title,
          author: author,
          id: bibId,
          binding: binding,
          availability: {
            count: total,
            available: available
          }
        });
        return acc;
      }, []);
    }

  };

  registerDOMOperations(FollettDestinyDOMOperations, "follettdestiny");

  // END src/catalogs/dom/follettdestiny.coffee
  register(FollettDestinyLibrary, "follettdestiny", null, FollettDestinyDOMOperations);

  // END src/catalogs/follettdestiny.coffee
  // BEGIN src/catalogs/follettdestinyquest.coffee
  FollettDestinyQuestLibrary = class FollettDestinyQuestLibrary extends Catalog {
    constructor(name, state, country, id, url, catalogUrl, params, categories) {
      var defaults, landingPageUrlTmpl;
      defaults = {
        site: 100,
        context: null
      };
      super(name, state, country, id, url, catalogUrl, defaults, params, categories);
      this.getCatalogUrl = this.getCatalogUrl.bind(this);
      this.newSession = this.newSession.bind(this);
      this.buildSearchUrl = this.buildSearchUrl.bind(this);
      this.parseOneResult = this.parseOneResult.bind(this);
      this.parseSearchResults = this.parseSearchResults.bind(this);
      this.version = "113c1ed72ab05fc358d8699503e7136c";
      this.initializeUrl = urlutils.concat(this.catalogUrl, "/");
      this.initializeUrl2 = urlutils.concat(this.catalogUrl, "/common/welcome.jsp?site=" + this.defaults.site);
      landingPageUrlTmpl = "/quest/servlet/presentquestform.do?site=<%= site %>";
      if (this.defaults.context) {
        landingPageUrlTmpl += "&context=<%= context %>";
      }
      this.landingPageUrl = fromTemplate(urlutils.concat(this.catalogUrl, landingPageUrlTmpl))(defaults);
      this.searchUrl = urlutils.concat(this.catalogUrl, "/quest/servlet/ajaxdaoform.do?");
      this.detailUrl = fromTemplate(urlutils.concat(this.catalogUrl, "/cataloging/servlet/presenttitledetailform.do?bibID=<%= id %>"));
      this.http = {
        common: {
          xfrm: 'json',
          headers: [["Content-Type", "application/json"]]
        }
      };
    }

    canSearchByIsbn() {
      return false;
    }

    getCatalogUrl() {
      boundMethodCheck(this, FollettDestinyQuestLibrary);
      return this.landingPageUrl;
    }

    async newSession() {
      var me, opts, opts2;
      boundMethodCheck(this, FollettDestinyQuestLibrary);
      me = this;
      opts = {
        url: me.initializeUrl,
        xfrm: 'noop'
      };
      await me.httpRequest(opts);
      opts2 = {
        url: me.landingPageUrl,
        xfrm: 'noop'
      };
      await me.httpRequest(opts2);
      return me.session.expiry = me.getNewSessionTimeout();
    }

    buildSearchUrl(searchBy, searchTerm, request) {
      var payload;
      boundMethodCheck(this, FollettDestinyQuestLibrary);
      payload = {
        arg0: searchTerm,
        endpointName: "SearchController.SearchResults",
        cb: this.app.time()
      };
      return {
        by: searchBy,
        url: this.searchUrl + toQueryString(payload)
      };
    }

    parseAvailabilityFromRecord(el) {
      var matches, result, row;
      result = {
        count: 0,
        available: 0
      };
      row = el.hoverHighLevelAvailabilityLocalStatusString;
      if (!row) {
        return result;
      }
      if (row.toLowerCase() === "no copies") {
        return result;
      }
      matches = /(\d+) of (\d+) available/.exec(row);
      if (matches) {
        result.count = matches[2];
        result.available = matches[1];
      }
      return result;
    }

    parseOneResult(results, el) {
      var result;
      boundMethodCheck(this, FollettDestinyQuestLibrary);
      result = {
        availability: this.parseAvailabilityFromRecord(el)
      };
      results.push(Object.assign({}, result, {
        author: normalizeAuthor(el.author),
        title: normalizeTitle(el.title),
        id: el.bibID,
        binding: el.bibTypeDescription.toLowerCase()
      }));
      return results;
    }

    parseSearchResults(response, request) {
      var results;
      boundMethodCheck(this, FollettDestinyQuestLibrary);
      results = [];
      if (response.data.hitList) {
        results = response.data.hitList.records.reduce(this.parseOneResult, []);
      }
      return results;
    }

  };

  register(FollettDestinyQuestLibrary, "follettdestinyquest");

  // END src/catalogs/follettdestinyquest.coffee
  // BEGIN src/catalogs/follettdiscover.coffee
  FollettDiscoverLibrary = class FollettDiscoverLibrary extends Catalog {
    constructor(name, state, country, id, url, catalogUrl, params, categories) {
      var defaults;
      defaults = {
        site: null
      };
      super(name, state, country, id, url, catalogUrl, defaults, params, categories);
      this.getCatalogUrl = this.getCatalogUrl.bind(this);
      this.buildSearchUrl = this.buildSearchUrl.bind(this);
      this.parseOneResult = this.parseOneResult.bind(this);
      this.parseSearchResults = this.parseSearchResults.bind(this);
      this.version = "5f584419ed909c1e84fbaa0e4fb3f455";
      this.landingPageUrl = fromTemplate("https://search.follettsoftware.com/metasearch/ui/<%= site %>")(defaults);
      this.searchUrl = fromTemplate("https://search.follettsoftware.com/metasearch/rest/v2/searches?nocachekey=<%= time %>&pl=<%= site %>");
      this.detailUrl = fromTemplate("https://search.follettsoftware.com/metasearch/rest/v2/go/<%= site %>/details/<%= id %>");
      this.http = {
        common: {
          xfrm: 'json',
          headers: [["Content-Type", "application/json"]]
        }
      };
    }

    getCatalogUrl() {
      boundMethodCheck(this, FollettDiscoverLibrary);
      return this.landingPageUrl;
    }

    buildSearchUrl(searchBy, searchTerm, request) {
      var args, payload, url;
      boundMethodCheck(this, FollettDiscoverLibrary);
      args = {
        site: this.defaults.site,
        time: this.app.time()
      };
      url = this.searchUrl(args);
      payload = {
        limit: 20,
        offset: 0,
        query: searchTerm,
        searchFormatId: "0",
        selectedTab: "ALL",
        requestId: "",
        searchTypeId: "ALL",
        resultsSortBy: "RELEVANCE"
      };
      return {
        by: searchBy,
        url: url,
        body: JSON.stringify(payload)
      };
    }

    parseAvailabilityFromRecord(el) {
      var result, row, unknownAvailability;
      result = {
        count: 0,
        available: 0
      };
      row = el.availabilityVO;
      if (row.hideAvailability) {
        unknownAvailability = {
          count: -1,
          available: -1
        };
        return unknownAvailability;
      }
      if (!row) {
        return result;
      }
      if (row.hiddenFromUser) {
        return result;
      }
      result.count += 1;
      if (row.available) {
        result.available += 1;
      }
      return result;
    }

    parseOneResult(results, el) {
      var result;
      boundMethodCheck(this, FollettDiscoverLibrary);
      result = {
        availability: this.parseAvailabilityFromRecord(el)
      };
      results.push(Object.assign({}, result, {
        author: normalizeAuthor(el.authors[0]),
        title: normalizeTitle(el.title),
        id: el.appPrimaryKey
      }));
      return results;
    }

    parseSearchResults(response, request) {
      boundMethodCheck(this, FollettDiscoverLibrary);
      if (!response.documentCount > 0) {
        return [];
      }
      return response.hits.reduce(this.parseOneResult, []);
    }

  };

  register(FollettDiscoverLibrary, "follettdiscover");

  // END src/catalogs/follettdiscover.coffee
  // BEGIN src/catalogs/hoopla.coffee
  HooplaLibrary = class HooplaLibrary extends Catalog {
    constructor(name, country, state, id, url, catalogUrl, params, categories) {
      var defaults;
      defaults = {};
      super(name, country, state, id, url, catalogUrl, defaults, params, categories);
      this.setCredentials = this.setCredentials.bind(this);
      this.buildSearchUrl = this.buildSearchUrl.bind(this);
      this.parseSearchResults = this.parseSearchResults.bind(this);
      this.refreshHoldsRemaining = this.refreshHoldsRemaining.bind(this);
      this.holdsRemaining = this.holdsRemaining.bind(this);
      this.isAuthenticated = this.isAuthenticated.bind(this);
      this.getUsername = this.getUsername.bind(this);
      this.logout = this.logout.bind(this);
      this.login = this.login.bind(this);
      this.getLibraryInformation = this.getLibraryInformation.bind(this);
      this.version = "5f113c2a15a871b540a1f741730a7178";
      this.categories = ["books", "dvd", "music", "audiobook", "video"];
      this.baseUrl = "https://www.hoopladigital.com/";
      this.catalogUrl = "https://www.hoopladigital.com/";
      this.libraryUrl = "https://www.hoopladigital.com/";
      this.searchUrl = fromTemplate("https://hoopla-ws.hoopladigital.com/v2/search/ALL?q=<%= term|encodeuri %>&offset=0&limit=50&sort=TOP");
      this.searchGraphqlUrl = fromTemplate("https://patron-api-gateway.hoopladigital.com/graphql");
      this.detailUrl = "https://www.hoopladigital.com/title/##ID##";
      this.holdsInformationUrl = "https://patron-api-gateway.hoopladigital.com/core/v2/borrowed/status";
      this.patronUrl = "https://patron-api-gateway.hoopladigital.com/core/patrons";
      this.librarySystemUrl = fromTemplate("https://patron-api-gateway.hoopladigital.com/core/libraries/<%= libraryId %>");
      this.http = {
        common: {
          xfrm: 'json'
        }
      };
      this.librarySystemName = null;
      this.commonHeaders = [];
      this.setCredentials(params.credentials);
      this.allowMultiple = true;
      this._holdsRemainingInfo = null;
      this._checkHoldsEverySearch = true;
      if (params.fetch) {
        this.__fetch = params.fetch;
      }
      this.getLibraryInformation();
    }

    setCredentials(credentials) {
      boundMethodCheck(this, HooplaLibrary);
      this.credentials = credentials;
      this.librarySystemName = null;
      return this.commonHeaders = webrequestHelpers.authorization(this.commonHeaders, (credentials && credentials.token) || credentials);
    }

    getResultsLogo() {
      return {
        src: `chrome-extension://${chrome.i18n.getMessage('@@extension_id')}/images/hoopla-49x21.png`,
        heightPx: 21,
        widthPx: 49
      };
    }

    canSearchByIsbn() {
      return false;
    }

    canSearchByIsbn13() {
      return false;
    }

    buildSearchUrl(searchBy, searchTerm, request) {
      var body;
      boundMethodCheck(this, HooplaLibrary);
      body = {
        operationName: "FilterSearch",
        query: "query FilterSearch($criteria: SearchCriteria!, $sort: Sort) {\n  search(criteria: $criteria, sort: $sort) {\n    found\n    " + "hits {\n      ...TitleListItemFragment\n      __typename\n    }\n    aggregations {\n      ...AggregationsFragment\n      __typename\n    }\n " + "algorithm\n    __typename\n  }\n}\n\nfragment AggregationsFragment on Facet {\n  name\n  buckets {\n    key\n    value\n    __typename\n  }\n " + " __typename\n}\n\nfragment TitleListItemFragment on Title {\n  id\n  artKey\n  issueNumberDescription\n  kind {\n    name\n    __typename\n  }\n " + " language {\n name\n label\n id\n __typename\n }\n" + "parentalAdvisory\n  primaryArtist {\n    name\n    __typename\n  }\n  releaseDate\n  title\n  titleId\n  \n status\n  licenseType\n  __typename\n} \n",
        variables: {
          criteria: {
            availability: "ALL_TITLES",
            pagination: {
              page: 1,
              pageSize: 48
            },
            q: searchTerm
          }
        }
      };
      return {
        by: searchBy,
        url: this.searchGraphqlUrl(),
        body: JSON.stringify(body),
        headers: [["Content-Type", "application/json"]]
      };
    }

    parseSearchResults(response, request) {
      var me;
      boundMethodCheck(this, HooplaLibrary);
      me = this;
      return response.data.search.hits.map(function(el) {
        var item;
        item = {
          title: el.title.replace(/^(.+?)([\s\W]*(season|series) .*)/, "$1").trim(),
          author: el.primaryArtist && el.primaryArtist.name,
          binding: el.kind.name.toLowerCase(),
          id: el.titleId,
          availability: {
            availabilityType: "always"
          },
          url: me.getDetailPageUrl(el.titleId)
        };
        return item;
      });
    }

    refreshHoldsRemaining(lookup) {
      var me, params, token;
      boundMethodCheck(this, HooplaLibrary);
      if (this.credentials === null || this.credentials === void 0) {
        logger.info("No credentials available; not checking for pending holds");
        return Promise.resolve(lookup);
      }
      if (!this._checkHoldsEverySearch || !lookup) {
        return Promise.resolve(lookup);
      }
      token = this.credentials.token || this.credentials;
      params = {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          "Authorization": "Bearer " + token
        },
        mode: "cors"
      };
      me = this;
      return this.__fetch(null, this.holdsInformationUrl, params).then(function(resp) {
        if (resp.status === 200) {
          return resp.json();
        }
        return {};
      }).then(function(resp) {
        me._holdsRemainingInfo = {
          holdsRemaining: resp.borrowsRemaining,
          holdsRemainingText: resp.borrowsRemainingMessage
        };
        lookup.setHoldsRemaining(me._holdsRemainingInfo);
        return lookup;
      });
    }

    holdsRemaining() {
      boundMethodCheck(this, HooplaLibrary);
      return this._holdsRemainingInfo;
    }

    supportsAuthentication() {
      return true;
    }

    isAuthenticated() {
      boundMethodCheck(this, HooplaLibrary);
      return this.credentials !== null && this.credentials !== void 0;
    }

    getUsername() {
      boundMethodCheck(this, HooplaLibrary);
      return this.credentials && this.credentials.username;
    }

    getAuthenticationFields() {
      return [
        {
          field: "username",
          display: "Username"
        },
        {
          field: "password",
          display: "Password",
          type: "password"
        }
      ];
    }

    __fetch(unused, url, params) {
      return fetch(url, params);
    }

    logout() {
      boundMethodCheck(this, HooplaLibrary);
      this.setCredentials();
      return Promise.resolve();
    }

    login(username, password) {
      var loginUrl, me, res;
      boundMethodCheck(this, HooplaLibrary);
      loginUrl = "https://patron-api-gateway.hoopladigital.com/core/tokens"; // POST to this with standard form; store the result
      me = this;
      res = new Promise(function(resolve, reject) {
        var body, params;
        body = new URLSearchParams();
        body.append("username", username);
        body.append("password", password);
        body = body.toString();
        params = {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
          },
          body: body,
          mode: "cors"
        };
        return me.__fetch(null, loginUrl, params).then(function(resp) {
          if (resp.status === 200) {
            return resp.json();
          }
          return {};
        }).then(function(resp) {
          if (resp.tokenStatus === "SUCCESS") {
            return resolve({
              username: username,
              token: resp.token
            });
          } else {
            return reject(resp.tokenStatus);
          }
        });
      });
      return res;
    }

    getLibraryInformation() {
      var me, params;
      boundMethodCheck(this, HooplaLibrary);
      if (!this.isAuthenticated()) {
        return Promise.resolve(null);
      }
      me = this;
      if (me.librarySystemName) {
        return Promise.resolve({
          librarySystemName: me.librarySystemName
        });
      }
      params = {
        method: "GET",
        headers: me.commonHeaders
      };
      return new Promise(async function(resolve, reject) {
        var body, library_body, library_resp, resp;
        resp = (await me.__fetch(null, me.patronUrl, params));
        if (!resp || resp.status !== 200) {
          return resolve({});
        }
        body = (await resp.json());
        if (!body.libraryId) {
          return resolve({});
        }
        library_resp = (await me.__fetch(null, me.librarySystemUrl({
          libraryId: body.libraryId
        }), params));
        if (!library_resp || library_resp.status !== 200) {
          return resolve({});
        }
        library_body = (await library_resp.json());
        me.librarySystemName = library_body.name;
        return resolve({
          librarySystemName: me.librarySystemName
        });
      });
    }

  };

  registerNonLibraryCatalog(HooplaLibrary, "hoopla", "Hoopla");

  // END src/catalogs/hoopla.coffee
  // BEGIN src/catalogs/iguana.coffee
  IguanaLibrary = class IguanaLibrary extends Catalog {
    constructor(name, state, country, id, url, catalogUrl, params, categories) {
      var defaults;
      defaults = {
        DATABASE: "1",
        INDEX: "1*Keywordsbib",
        PROFILE: "Iguana",
        FU: "BibSearch",
        LANGUAGE: "eng",
        EXTERNALPROFILE: "",
        SEARCHMODE: "simple"
      };
      super(name, state, country, id, url, catalogUrl, defaults, params, categories);
      this.newSession = this.newSession.bind(this);
      this.parseSearchResults = this.parseSearchResults.bind(this);
      this.version = "1ebb610d20eba75fea2b8843ad4923ef";
      this.searchUrl = urlutils.concat(this.catalogUrl, "/iguana/Proxy.SearchRequest.cls");
      this.detailUrl = urlutils.concat(this.catalogUrl, "/iguana/www.main.cls?sUrl=search#RecordId=##ID##");
      this.sessionInitialized = false;
      this.http = {
        common: {
          xfrm: 'xml'
        }
      };
      this.domOperations = this.getDomOperations();
    }

    async newSession() {
      var SID_re, initialPage, login, me, rv, setSession;
      boundMethodCheck(this, IguanaLibrary);
      SID_re = /Vfocus\.Settings\.sessionID = '(.*)';/;
      me = this;
      login = async function() {
        var opts, params;
        params = {
          action: "getSettings",
          SIDTKN: me.session["SIDTKN"]
        };
        opts = {
          url: urlutils.concat(me.catalogUrl, "/iguana/Service.Login.cls"),
          body: toQueryString(params),
          headers: [["X-Requested-With", "XMLHttpRequest"]]
        };
        return (await me.httpRequest(opts));
      };
      setSession = async function(resp) {
        var opts, params, token;
        token = SID_re.exec(resp);
        me.session["SIDTKN"] = token && token[1];
        params = {
          SessionId: me.session["SIDTKN"],
          Url: urlutils.concat(me.catalogUrl, "/iguana/www.main.cls?surl=search"),
          SIDTKN: me.session["SIDTKN"]
        };
        opts = {
          url: urlutils.concat(me.catalogUrl, "/iguana/Proxy.Url.cls"),
          body: toQueryString(params),
          headers: [["X-Requested-With", "XMLHttpRequest"]]
        };
        await me.httpRequest(opts);
        return login();
      };
      initialPage = async function() {
        var opts;
        opts = {
          url: urlutils.concat(me.catalogUrl, "/iguana/www.main.cls?surl=search")
        };
        return (await me.httpRequest(opts));
      };
      rv = (await initialPage());
      await setSession(rv.body);
      return (await login());
    }

    buildSearchUrl(searchBy, searchTerm, request) {
      var params, qs;
      params = {
        fu: this.defaults.FU,
        RequestType: "ResultSet_DisplayList",
        NumberToRetrieve: 10,
        StartValue: 1,
        SearchTechnique: "Find",
        Language: this.defaults.LANGUAGE,
        Profile: this.defaults.PROFILE,
        ExportByTemplate: "Brief",
        TemplateId: "Iguana_Brief",
        FacetedSearch: "Yes",
        MetaBorrower: "",
        Namespace: 0,
        BestMatch: 99,
        ASRProfile: "",
        Sort: "Relevancy",
        SortDirection: "-1",
        WithoutRestrictions: "Yes",
        Associations: "Also",
        Application: "Bib",
        Database: this.defaults.DATABASE,
        Index: this.defaults.INDEX,
        Request: searchTerm,
        SearchMode: this.defaults.SEARCHMODE,
        CspSessionId: this.session.SIDTKN,
        SessionCMS: "",
        SIDTKN: this.session.SIDTKN
      };
      if (this.defaults.SEARCHMODE === "expert") {
        params.Request1 = searchTerm;
        params.Index1 = this.defaults.INDEX;
        params.Request = void 0;
        params.Index = void 0;
      }
      if (this.defaults.EXTERNALPROFILE.length > 0) {
        params.ExternalProfile = this.defaults.EXTERNALPROFILE;
      }
      qs = toQueryString(params);
      return {
        by: searchBy,
        url: this.searchUrl,
        body: qs,
        headers: [["X-Requested-With", "XMLHttpRequest"]]
      };
    }

    async parseSearchResults(response, request) {
      boundMethodCheck(this, IguanaLibrary);
      return (await this.domOperations.extractSearchResults(response));
    }

  };

  // BEGIN src/catalogs/dom/iguana.coffee
  IguanaDOMOperations = class IguanaDOMOperations extends DOMOperations {
    constructor() {
      super(...arguments);
      this.extractSearchResults = this.extractSearchResults.bind(this);
    }

    _translateMaterialTypeToBinding(data) {
      var binding, material;
      material = /MATTYPE=([A-Z]+)/.exec(data)[1];
      binding = "unknown";
      if (material === "AB") {
        binding = "book";
      } else if (material === "LPR") {
        binding = "book-largeprint";
      } else if (material === "AVDVD") {
        binding = "dvd";
      }
      return binding;
    }

    async extractSearchResults(content) {
      var me, obj;
      boundMethodCheck(this, IguanaDOMOperations);
      me = this;
      obj = (await this.parser(content));
      return Array.from(obj.querySelectorAll("record")).reduce(function(acc, el) {
        var result;
        result = {
          id: textFromElement(el.querySelector("Id")),
          availability: {
            count: el.querySelectorAll("ShelfmarkData").length,
            available: 0
          }
        };
        el.querySelectorAll("Element").forEach(function(el_info) {
          var data, field;
          field = textFromElement(el_info.querySelector("Label"));
          data = stripTags(textFromElement(el_info.querySelector("Data")));
          if (field === "Contents A") {
            result["binding"] = me._translateMaterialTypeToBinding(data);
          }
          if (field === "BriefAuthor") {
            result["author"] = normalizeAuthor(data);
          }
          if (field === "BriefMainTitle") {
            return result["title"] = normalizeTitle(data);
          }
        });
        el.querySelectorAll("ShelfmarkData").forEach(function(el_info) {
          return result.availability.available += parseInt(textFromElement(el_info.querySelector("Available")) || "0");
        });
        acc.push(result);
        return acc;
      }, []);
    }

  };

  registerDOMOperations(IguanaDOMOperations, "iguana");

  // END src/catalogs/dom/iguana.coffee
  register(IguanaLibrary, "iguana", null, IguanaDOMOperations);

  // END src/catalogs/iguana.coffee
  // BEGIN src/catalogs/iiivega.coffee
  IIIVegaLibrary = class IIIVegaLibrary extends Catalog {
    constructor(name, state, country, id, url, catalogUrl, params, categories) {
      var apiUrl, defaults;
      defaults = {
        customerDomain: /:\/\/(.*?)\/?$/.exec(catalogUrl)[1],
        hostDomain: null,
        resourceType: "FormatGroup",
        searchType: "everything"
      };
      super(name, state, country, id, url, catalogUrl, defaults, params, categories);
      this.buildSearchUrl = this.buildSearchUrl.bind(this);
      this.parseSearchResults = this.parseSearchResults.bind(this);
      this.buildInventoryLookupUrl = this.buildInventoryLookupUrl.bind(this);
      this.version = "70285906f0653548ec1a63c7175be544";
      apiUrl = `https://${this.defaults.customerDomain}`;
      this.detailUrl = fromTemplate(urlutils.concat(this.catalogUrl, "/search/card?id=<%= id %>&entityType=<%= resourceType %>"));
      this.searchUrl = urlutils.concat(apiUrl, "/api/search-result/search/format-groups");
      this.inventoryUrl = fromTemplate(urlutils.concat(apiUrl, "/api/search-result/search/instances/<%= instanceId %>/items"));
      this.http = {
        common: {
          xfrm: 'json',
          headers: [["Content-Type", "application/json"], ["iii-customer-domain", this.defaults.customerDomain]]
        }
      };
      if (this.defaults.hostDomain) {
        this.http.common.headers.push(["iii-host-domain", this.defaults.hostDomain]);
      }
    }

    buildSearchUrl(searchBy, searchTerm, request) {
      var payload;
      boundMethodCheck(this, IIIVegaLibrary);
      payload = {
        pageNum: 0,
        pageSize: 10,
        resourceType: this.defaults.resourceType,
        searchText: searchTerm,
        searchType: this.defaults.searchType,
        sortOrder: "asc",
        sorting: "relevance"
      };
      return {
        by: searchBy,
        url: this.searchUrl,
        body: JSON.stringify(payload),
        headers: [["api-version", "2"]].concat(this.http.common.headers)
      };
    }

    parseSearchResults(response, request) {
      var me;
      boundMethodCheck(this, IIIVegaLibrary);
      me = this;
      return response.data.reduce(function(acc, el) {
        return acc.concat(el.materialTabs.filter(function(mel) {
          return mel.locations !== void 0 && mel.editions !== void 0 && mel.editions.length > 0;
        }).map(function(mel) {
          return {
            id: el.id,
            title: el.title,
            author: el.primaryAgent && normalizeAuthor(el.primaryAgent.label),
            binding: commonBindingMappings(mel.name),
            instanceId: mel.editions[0].id,
            coverImage: el.coverUrl && el.coverUrl.small,
            availability: {
              available: mel.locations.reduce(function(avail_acc, avail_el) {
                if (avail_el.availabilityStatus === "Available") {
                  return avail_acc + 1;
                }
                return avail_acc;
              }, 0),
              count: mel.locationsTotalResults,
              estimated: true
            }
          };
        }));
      }, []);
    }

    buildInventoryLookupUrl(request, item) {
      boundMethodCheck(this, IIIVegaLibrary);
      return {
        url: this.inventoryUrl(item),
        headers: [["api-version", "1"]].concat(this.http.common.headers)
      };
    }

    parseInventoryLookup(response) {
      var availableCount, availableTerms, branchList, data;
      availableTerms = ["AVAILABLE", "CHECK ON SHELF", "CHECK SHELF"];
      availableCount = function(arr) {
        return arr.filter(function(el) {
          return availableTerms.filter(function(term) {
            return term === el.status;
          }).length > 0;
        }).length;
      };
      branchList = function(arr) {
        return Array.from(new Set(arr.map(function(el) {
          return el.location;
        })));
      };
      data = {
        estimated: false,
        count: response.length,
        available: availableCount(response),
        branches: branchList(response)
      };
      return data;
    }

  };

  register(IIIVegaLibrary, "iiivega");

  // END src/catalogs/iiivega.coffee
  // BEGIN src/catalogs/inmedia.coffee
  InMediaCMS = class InMediaCMS extends Catalog {
    constructor(name, state, country, id, url, catalogUrl, params, categories) {
      var defaults;
      defaults = {
        LOCALE: "en"
      };
      super(name, state, country, id, url, catalogUrl, defaults, params, categories);
      this.buildSearchUrl = this.buildSearchUrl.bind(this);
      this.buildInventoryLookupUrl = this.buildInventoryLookupUrl.bind(this);
      this.searchUrl = urlutils.concat(this.catalogUrl, "/in/rest/api/search");
      this.detailUrl = fromTemplate(urlutils.concat(this.catalogUrl, "/notice?id=<%= id %>"));
      this.inventoryUrl = fromTemplate(urlutils.concat(this.catalogUrl, "/in/rest/api/notice?id=<%= id %>&locale=<%= LOCALE %>&aspect=Stock&opac=true"));
      this.session.token = "-";
      this.http = {
        common: {
          xfrm: 'json',
          headers: [["Content-Type", "application/json"]]
        }
      };
    }

    buildSearchUrl(searchBy, searchTerm, request) {
      var body;
      boundMethodCheck(this, InMediaCMS);
      body = {
        includeFacets: false,
        locale: this.defaults.LOCALE,
        mappedFQ: {},
        order: "score",
        pageNo: 1,
        pageSize: 10,
        query: [searchTerm],
        queryid: "NONE",
        sf: "*"
      };
      return {
        by: searchBy,
        url: this.searchUrl,
        body: JSON.stringify(body),
        headers: this.commonHeaders
      };
    }

    parseSearchResults(response, request) {
      var results;
      results = response.resultSet.reduce(function(acc, el) {
        var biblio;
        if (el.IsPhysicalDocument[0].value === "0") {
          return acc;
        }
        biblio = parseAuthorAndTitleBySlash(el.title[0].value);
        acc.push(Object.assign(biblio, {
          id: encodeURIComponent(el.id[0].value),
          binding: commonBindingMappings(el.zmatDisplay[0].value)
        }));
        return acc;
      }, []);
      return results;
    }

    buildInventoryLookupUrl(request, item) {
      boundMethodCheck(this, InMediaCMS);
      return {
        url: this.inventoryUrl(Object.assign(this.defaults, {
          id: item.id
        }))
      };
    }

    parseInventoryLookup(response, request) {
      if (!response.monographicCopies) {
        return {};
      }
      return response.monographicCopies.reduce(function(acc, el) {
        return (el.children && el.children.reduce(function(child_acc, child_el) {
          child_acc.count += 1;
          if (child_el.data.stat === "00" && child_el.data.copyCanReserve === "true") {
            child_acc.available += 1;
          }
          return child_acc;
        }, acc)) || acc;
      }, {
        count: 0,
        available: 0
      });
    }

  };

  register(InMediaCMS, "inmedia");

  // END src/catalogs/inmedia.coffee
  // BEGIN src/catalogs/ipac20.coffee
  IPac20Library = class IPac20Library extends Catalog {
    constructor(name, state, country, id, url, catalogUrl, params, categories) {
      var appPath, defaults, profile;
      defaults = {
        "ISBN": "1", // isbn serach permitted
        "METHOD": "POST",
        "INDEX": "ALLTITL",
        "LIMITBOX": null, // allows limiting results to a given library,
        "PROFILE": null
      };
      super(name, state, country, id, url, catalogUrl, defaults, params, categories);
      this.getCatalogUrl = this.getCatalogUrl.bind(this);
      this.buildSearchUrl = this.buildSearchUrl.bind(this);
      this.canSearchByIsbn = this.canSearchByIsbn.bind(this);
      this.parseSearchResults = this.parseSearchResults.bind(this);
      this.parseInventoryLookup = this.parseInventoryLookup.bind(this);
      this.version = "469c9665a5c8de51f33f689683826f5f";
      appPath = "/ipac20/ipac.jsp";
      this.searchUrl = urlutils.concat(this.catalogUrl, appPath);
      profile = "";
      if (this.defaults["PROFILE"] != null) {
        profile = `profile=${this.defaults["PROFILE"]}&`;
      }
      this.inventoryLookupUrl = urlutils.concat(this.catalogUrl, `${appPath}?${profile}GetXML=true&uri=`);
      this.http = {
        common: {
          xfrm: "noop"
        }
      };
      this.domOperations = this.getDomOperations();
      this.detailUrl = fromTemplate(urlutils.concat(this.catalogUrl, `${appPath}?${profile}GetXML=true&ipp=150&uri=<%= id %>`));
      this.pageUrl = urlutils.concat(this.catalogUrl, `${appPath}?${profile}uri=`);
    }

    getCatalogUrl() {
      var profile;
      boundMethodCheck(this, IPac20Library);
      profile = this.defaults.PROFILE || "";
      return `${this.searchUrl}?profile=${profile}`;
    }

    buildSearchUrl(searchBy, searchTerm, request) {
      var index, postParams;
      boundMethodCheck(this, IPac20Library);
      if (searchBy === "isbn" || searchBy === "isbn13") {
        if (this.defaults["ISBN"] === "1") {
          index = "ISBNEX";
        } else {
          index = this.defaults["ISBN"];
        }
      } else {
        index = this.defaults["INDEX"];
      }
      postParams = `menu=search&aspect=basic_search&term=${encodeURIComponent(searchTerm)}&index=${index}&GetXML=true`;
      if (this.defaults["LIMITBOX"] != null) {
        postParams = `${postParams}&limitbox_1=${this.defaults["LIMITBOX"]}`;
      }
      if (this.defaults["PROFILE"] != null) {
        postParams = `${postParams}&profile=${this.defaults["PROFILE"]}`;
      }
      if (this.defaults["METHOD"] === "POST") {
        return {
          by: searchBy,
          url: this.searchUrl,
          body: postParams
        };
      } else {
        return {
          by: searchBy,
          url: `${this.searchUrl}?${postParams}`
        };
      }
    }

    canSearchByIsbn() {
      var isbnSearchEnabled;
      boundMethodCheck(this, IPac20Library);
      isbnSearchEnabled = this.defaults["ISBN"] !== "0";
      logger.debug(`${this.libraryName} library can handle ISBN search: ${isbnSearchEnabled}`);
      return isbnSearchEnabled;
    }

    async parseSearchResults(doc, request) {
      var items;
      boundMethodCheck(this, IPac20Library);
      return items = (await this.domOperations.extractSearchResults(doc));
    }

    async parseInventoryLookup(doc) {
      boundMethodCheck(this, IPac20Library);
      return (await this.domOperations.extractAvailability(doc));
    }

  };

  // BEGIN src/catalogs/dom/ipac20.coffee
  IPac20DOMOperations = class IPac20DOMOperations extends DOMOperations {
    constructor() {
      super(...arguments);
      this.extractSearchResults = this.extractSearchResults.bind(this);
      this.extractAvailability = this.extractAvailability.bind(this);
    }

    customParsers() {
      return {
        "ipac20_xml": function(content, parsers) {
          var exc, response;
          content = stripHtml(content);
          if (content.indexOf("</col>") < 0) {
            content = content.replace(/<col>/g, "<col />");
          }
          if (content.indexOf("</link>") < 0) {
            content = content.replace(/<link>/g, "<link />");
          }
          response = "";
          try {
            response = parsers.xml(content);
          } catch (error1) {
            exc = error1;
            logger.exception("IPac20Library:parse", exc);
          }
          return response;
        }
      };
    }

    async extractSearchResults(content) {
      var cellsIdx, data, elem, errors, exactMatchLink, extractField, key, obj, requestTitle, result, results, results_this_row, searchResults;
      boundMethodCheck(this, IPac20DOMOperations);
      obj = (await this.parser(content, {
        xfrm: "ipac20_xml"
      }));
      results = [];
      searchResults = null;
      errors = obj.querySelectorAll("searchresponse > error");
      if (errors.length > 0) {
        if (Array.from(errors).find(function(el) {
          return el.textContent.length > 0;
        })) {
          return [];
        }
      }
      cellsIdx = {
        "Format": -1,
        "Author": -1,
        "Title": -1,
        "Pub date": -1 // unused
      };
      obj.querySelectorAll("searchresults header label").forEach(function(data, idx) {
        var key;
        key = data.textContent;
        if (key in cellsIdx) {
          return cellsIdx[key] = idx;
        }
      });
      if (cellsIdx["Title"] < 0) {
        requestTitle = request.title;
        data = obj.querySelector("searchdata").querySelector("link");
        exactMatchLink = decodeURIComponent(textFromElement(data) || "");
        if ((exactMatchLink != null) && exactMatchLink.length > 0) {
          result = {
            id: exactMatchLink
          };
          key = "TITLE";
          elem = obj.querySelector("searchresults");
          if (elem.querySelectorAll(key).length === 0) {
            key = "data";
          }
          results_this_row = elem.querySelectorAll(key + " text");
          result.title = normalizeTitle(results_this_row[0]);
          if (key === "data") {
            if (results_this_row.length > 1) {
              result.author = normalizeAuthor(results_this_row[1]);
            }
          } else {
            result.author = normalizeAuthor(findFirstMatchingNode(elem, ["author", "AUTHOR"]));
          }
          results.push(result);
          return results;
        }
        obj.querySelectorAll("results row").forEach(function(elem) {
          var author, resultId, title;
          key = "TITLE";
          if (elem.querySelector(key) === 0) {
            key = "data";
          }
          results_this_row = elem.querySelectorAll(key + " text");
          title = normalizeTitle(results_this_row[0]);
          if (key === "data") {
            if (results_this_row.length > 1) {
              author = normalizeAuthor(results_this_row[1]);
            }
          }
          resultId = textFromElement(elem.querySelector(key + " func"));
          data = {
            id: resultId,
            title: title
          };
          if (!resultId) {
            return;
          }
          if (author !== void 0) {
            data.author = author;
          }
          return results.push(data);
        });
      } else {
        extractField = function(cells, fieldName, targetField) {
          if (cellsIdx[fieldName] >= 0) {
            targetField = targetField || "text";
            return textFromElement(cells[cellsIdx[fieldName]].querySelector(targetField));
          }
          return void 0;
        };
        obj.querySelectorAll("results row").forEach(function(el) {
          var author, binding, cells, resultId, title;
          cells = el.querySelectorAll("cell");
          title = extractField(cells, "Title");
          author = extractField(cells, "Author");
          binding = extractField(cells, "Format") || "book";
          resultId = extractField(cells, "Title", "func");
          if (!resultId) {
            return;
          }
          return results.push({
            id: resultId,
            title: title,
            binding: binding,
            author: author
          });
        });
        if (results.length === 0) {
          searchResults = textFromElement(obj.querySelector("results row func"));
          if (searchResults) {
            results.push({
              "id": searchResults
            });
          }
        }
      }
      return results;
    }

    async extractAvailability(content) {
      var AVAILABLE_TERMS, UNAVAILABLE_TERMS, available, branchCell, branchHash, count, data, obj, searchResults, statusCell;
      boundMethodCheck(this, IPac20DOMOperations);
      obj = (await this.parser(content));
      available = 0;
      count = 0;
      branchHash = {};
      AVAILABLE_TERMS = ["AVAILABLE", "CHECKED IN", "ON SHELF", "CHECK SHELVES", "IN"];
      UNAVAILABLE_TERMS = ["MISSING", "ITEM MISSING"];
      statusCell = 4;
      branchCell = 0;
      data = {
        "estimated": false,
        "count": 0,
        "available": 0,
        "branches": []
      };
      searchResults = obj.querySelectorAll("searchresults");
      searchResults.forEach(function(resultSet) {
        var header;
        header = resultSet.querySelector("header");
        if (!header) {
          return;
        }
        header.querySelectorAll("label").forEach(function(el, idx) {
          if (/status/i.exec(textFromElement(el))) {
            return statusCell = idx;
          }
        });
        resultSet.querySelector("results").querySelectorAll("row").forEach(function(el) {
          var branchName, columns, exc, status;
          try {
            count += 1;
            columns = el.querySelectorAll("text");
            status = textFromElement(columns[statusCell]);
            if (anyBeginsWith(AVAILABLE_TERMS, status, UNAVAILABLE_TERMS)) {
              available += 1;
            }
            branchName = textFromElement(columns[branchCell]);
            return branchHash[branchName] = 1;
          } catch (error1) {
            exc = error1;
            return logger.exception("IPac20Library:parseInventoryLookup", exc);
          }
        });
        data = {
          "estimated": false,
          "count": count,
          "available": available,
          "branches": hashToList(branchHash)
        };
      });
      return data;
    }

  };

  registerDOMOperations(IPac20DOMOperations, "ipac20");

  // END src/catalogs/dom/ipac20.coffee
  register(IPac20Library, "ipac20", null, IPac20DOMOperations);

  // END src/catalogs/ipac20.coffee
  // BEGIN src/catalogs/koboplus.coffee
  KoboPlusCatalog = class KoboPlusCatalog extends Catalog {
    constructor(name, state, country, id, url, catalogUrl, params, categories) {
      var defaults;
      defaults = {};
      categories = ["book", "audiobook"];
      super(name, state, country, id, url, catalogUrl, defaults, params, categories);
      this.buildSearchUrl = this.buildSearchUrl.bind(this);
      this.version = "806fcf7562cb1245edbe5820778bd0a3";
      this.allowMultiple = true;
      this.baseUrl = "https://www.kobo.com/";
      this.catalogUrl = "https://www.kobo.com/";
      this.libraryUrl = "https://www.kobo.com/";
      this.searchUrl = fromTemplate(urlutils.concat(this.baseUrl, "us/en/search/query?query=<%= term|encodeuri %>&fcmedia=BookSubscription"));
      this.detailUrl = fromTemplate(urlutils.concat(this.baseUrl, "us/en/<%= binding %>/<%= id %>/"));
      this.initializeUrl = this.baseUrl;
      this.http = {
        common: {
          xfrm: "html"
        }
      };
      this.domOperations = this.getDomOperations();
    }

    canSearchByIsbn() {
      return false;
    }

    canSearchByIsbn13() {
      return false;
    }

    buildSearchUrl(searchBy, searchTerm, request) {
      boundMethodCheck(this, KoboPlusCatalog);
      return {
        by: searchBy,
        url: this.searchUrl({
          term: searchTerm
        })
      };
    }

    async parseSearchResults(response, request) {
      var items;
      items = (await this.domOperations.extractSearchResults(response));
      return items;
    }

    parseInventoryLookup(response) {}

  };

  // BEGIN src/catalogs/dom/koboplus.coffee
  KoboPlusDOMOperations = class KoboPlusDOMOperations extends DOMOperations {
    constructor() {
      super(...arguments);
      this.extractSearchResults = this.extractSearchResults.bind(this);
    }

    async extractSearchResults(content) {
      var obj;
      boundMethodCheck(this, KoboPlusDOMOperations);
      obj = (await this.parser(content));
      return Array.from(obj.querySelectorAll("div[data-testid=book-card-search-result-items]")).reduce(function(acc, el) {
        var row, url;
        url = el.querySelector('h2 a').href;
        row = {
          title: textFromElement(el.querySelector('h2')),
          author: textFromElement(el.querySelector('dd[data-testid=authors]')),
          binding: /\/us\/en\/(.*)\//.exec(url)[1],
          id: /\/us\/en\/(.*)\/(.*)$/.exec(url)[2],
          url: url,
          availability: {
            availabilityType: 'always'
          }
        };
        acc.push(row);
        return acc;
      }, []);
    }

  };

  registerDOMOperations(KoboPlusDOMOperations, "koboplus");

  // END src/catalogs/dom/koboplus.coffee
  registerNonLibraryCatalog(KoboPlusCatalog, "koboplus", "Kobo Plus", KoboPlusDOMOperations);

  // END src/catalogs/koboplus.coffee
  // BEGIN src/catalogs/koha.coffee
  KohaLibrary = class KohaLibrary extends Catalog {
    constructor(name, state, country, id, url, catalogUrl, params, categories) {
      var defaults;
      defaults = {
        "koha_path": "/cgi-bin/koha/",
        "LIMIT_BRANCH": null,
        "LIMIT_BRANCH_KEY": "limit"
      };
      super(name, state, country, id, url, catalogUrl, defaults, params, categories);
      this.newSession = this.newSession.bind(this);
      this.buildSearchUrl = this.buildSearchUrl.bind(this);
      this.buildInventoryLookupUrl = this.buildInventoryLookupUrl.bind(this);
      this.parseInventoryLookup = this.parseInventoryLookup.bind(this);
      this.version = "ef2c5a9bf30b2d938492c9572c2074c2";
      this.detailUrl = urlutils.concat(this.catalogUrl, this.defaults["koha_path"]) + "opac-detail.pl?viewallitems=1&biblionumber=";
      this.searchUrl = fromTemplate(urlutils.concat(this.catalogUrl, this.defaults["koha_path"], "opac-search.pl?<%= params %>"));
      this.branches = null;
      this.http = {
        common: {
          xfrm: "html"
        }
      };
      this.domOperations = this.getDomOperations();
      if (this.defaults.LIMIT_BRANCH != null) {
        if (!this.defaults.LIMIT_BRANCH.startsWith('branch')) {
          this.defaults.LIMIT_BRANCH = `branch:${this.defaults.LIMIT_BRANCH}`;
        }
        if (this.defaults.LIMIT_BRANCH.startsWith('branch:')) {
          this.defaults.LIMIT_BRANCH = encodeURIComponent(this.defaults.LIMIT_BRANCH);
        }
      }
      this.searchQueryString = "&format=rss2";
    }

    newSession(request) {
      var me;
      boundMethodCheck(this, KohaLibrary);
      return me = this;
    }

    buildSearchUrl(searchBy, searchTerm, request) {
      var idxLookup, me, params;
      boundMethodCheck(this, KohaLibrary);
      me = this;
      idxLookup = {
        "isbn": "nb",
        "isbn13": "nb",
        "title": "ti"
      };
      params = `q=${idxLookup[searchBy]}:(${encodeURIComponent(searchTerm)})${me.searchQueryString}`;
      if (this.defaults.LIMIT_BRANCH != null) {
        params = `${params}&${this.defaults.LIMIT_BRANCH_KEY}=${this.defaults.LIMIT_BRANCH}`;
      }
      return {
        by: searchBy,
        url: this.searchUrl({
          params: params
        })
      };
    }

    buildInventoryLookupUrl(request, item) {
      var params;
      boundMethodCheck(this, KohaLibrary);
      params = "";
      if (this.defaults["LIMIT_BRANCH"] != null) {
        params = `${params}&limit=${this.defaults['LIMIT_BRANCH']}`;
      }
      return {
        url: `${this.detailUrl}${item.id}${params}`
      };
    }

    async parseSearchResults(response, request) {
      var items;
      items = (await this.domOperations.extractSearchResults(response));
      return items;
    }

    async parseInventoryLookup(response) {
      boundMethodCheck(this, KohaLibrary);
      return (await this.domOperations.extractAvailability(response));
    }

  };

  // BEGIN src/catalogs/dom/koha.coffee
  KohaDOMOperations = class KohaDOMOperations extends DOMOperations {
    constructor() {
      super(...arguments);
      this.extractSearchResults = this.extractSearchResults.bind(this);
      this.extractAvailability = this.extractAvailability.bind(this);
    }

    async extractSearchResults(content) {
      var items, obj;
      boundMethodCheck(this, KohaDOMOperations);
      obj = (await this.parser(content));
      items = Array.from(obj.querySelectorAll("item"));
      return items.reduce(function(results, el) {
        var author, authorSearch, authorSearch_re, binding, desc, guid, item;
        guid = /biblionumber=(\d+)/.exec(textFromElement(el.querySelector("guid")));
        if (!guid) {
          return results;
        }
        binding = "book";
        desc = el.querySelector("description").innerHTML;
        if (desc.indexOf("videodisc") >= 0) {
          binding = "dvd";
        }
        if (desc.indexOf("sound disc") >= 0) {
          binding = "cd";
        }
        if (desc.indexOf("audio file") >= 0) {
          binding = "audiobook";
        }
        if (desc.indexOf("online resource") >= 0) {
          binding = "ebook";
        }
        author = null;
        authorSearch_re = /(?:by|contributor[\(s\)]*):? (.*?)([\n\s]\s+|<br)/im;
        authorSearch = authorSearch_re.exec(desc);
        if (authorSearch) {
          author = authorSearch[1];
        }
        item = {
          "id": guid[1],
          "title": normalizeTitle(textFromElement(el.querySelector("title"))),
          "binding": binding
        };
        if (author) {
          item.author = normalizeAuthor(author);
        }
        results.push(item);
        return results;
      }, []);
    }

    async extractAvailability(content) {
      var available, branchHash, count, data, headers, holdings, libraryColumn, locationText, obj, statusColumn;
      boundMethodCheck(this, KohaDOMOperations);
      obj = (await this.parser(content));
      branchHash = {};
      count = 0;
      available = 0;
      locationText = ["library", "location", "current location"];
      statusColumn = -1;
      libraryColumn = -1;
      holdings = obj.querySelectorAll("#holdingst tbody tr, #holdings tbody tr");
      headers = obj.querySelectorAll("th");
      headers.forEach(function(el, idx) {
        if (statusColumn < 0 && txtLower(textFromElement(el)) === "status") {
          statusColumn = idx;
        }
        if (libraryColumn < 0 && anyBeginsWith(locationText, textFromElement(el), null)) {
          return libraryColumn = idx;
        }
      });
      holdings.forEach(function(el) {
        var columns;
        columns = Array.from(el.querySelectorAll("td"));
        if (columns.length >= Math.max(statusColumn, libraryColumn) && txtLower(textFromElement(columns[statusColumn])) === "available") {
          if (libraryColumn >= 0) {
            branchHash[textFromElement(columns[libraryColumn])] = 1;
          }
          available += 1;
        }
        return count += 1;
      });
      data = {
        "estimated": false,
        "count": count,
        "available": available,
        "branches": hashToList(branchHash)
      };
      return data;
    }

  };

  registerDOMOperations(KohaDOMOperations, "koha");

  // END src/catalogs/dom/koha.coffee
  register(KohaLibrary, "koha", null, KohaDOMOperations);

  // END src/catalogs/koha.coffee
  // BEGIN src/catalogs/kohav2.coffee
  KohaV2Library = class KohaV2Library extends Catalog {
    constructor(name, state, country, id, url, catalogUrl, params, categories) {
      var defaults;
      defaults = {
        "koha_path": "",
        "LIMIT_BRANCH": null,
        "MULTIBRANCH_LIMIT": null,
        "SEARCH_ISBN": "isbn",
        "SEARCH_TITLE": "title"
      };
      super(name, state, country, id, url, catalogUrl, defaults, params, categories);
      this.newSession = this.newSession.bind(this);
      this.buildSearchUrl = this.buildSearchUrl.bind(this);
      this.parseSearchResults = this.parseSearchResults.bind(this);
      this.version = "8d738457a4d54d38e372311a7720c2b9";
      this.detailUrl = fromTemplate(urlutils.concat(this.catalogUrl, this.defaults["koha_path"], "app/work/<%= id %>"));
      this.searchUrl = fromTemplate(urlutils.concat(this.catalogUrl, this.defaults["koha_path"], "api/opac/<%= params %>"));
      this.branches = null;
      this.buildInventoryLookupUrl = null;
      this.http = {
        search: {
          xfrm: 'json'
        }
      };
    }

    async newSession() {
      var me, opts;
      boundMethodCheck(this, KohaV2Library);
      me = this;
      opts = {
        url: this.catalogUrl,
        xfrm: 'noop'
      };
      await me.httpRequest(opts);
      return me.session.expiry = me.getNewSessionTimeout();
    }

    buildSearchUrl(searchBy, searchTerm, request) {
      var idxLookup, params;
      boundMethodCheck(this, KohaV2Library);
      idxLookup = {
        "isbn": this.defaults["SEARCH_ISBN"],
        "isbn13": this.defaults["SEARCH_ISBN"],
        "title": this.defaults["SEARCH_TITLE"]
      };
      params = encodeURIComponent(`${idxLookup[searchBy]}:${searchTerm}`);
      return {
        by: searchBy,
        url: this.searchUrl({
          params: params
        })
      };
    }

    parseMarc(marc, key) {
      var keyIdx, value;
      value = null;
      keyIdx = marc.fields.findIndex(function(el) {
        return el === key;
      });
      if (keyIdx >= 0) {
        value = marc.fields[keyIdx + 1].subfields[1];
      }
      return value;
    }

    parseSearchResults(response, request) {
      var me, results;
      boundMethodCheck(this, KohaV2Library);
      results = [];
      me = this;
      if (response.total_hits > 0) {
        response.hits.forEach(function(el, idx) {
          var item;
          item = {
            id: el["_embed"].id,
            author: normalizeAuthor(me.parseMarc(el["_embed"].marc, "100")),
            title: normalizeTitle(el.title),
            binding: el["_embed"].format[0],
            isbn: el["_embed"].isbn,
            availability: {
              available: el["_embed"].summary.available_count,
              count: el["_embed"].summary.item_count
            }
          };
          return results.push(item);
        });
      }
      return results;
    }

  };

  register(KohaV2Library, "koha2");

  // END src/catalogs/kohav2.coffee
  // BEGIN src/catalogs/libero.coffee
  LiberoCatalog = class LiberoCatalog extends Catalog {
    constructor(name, country, state, id, url, catalogUrl, params, categories) {
      var defaults;
      defaults = {
        SUPPORTS_ISBN: "1"
      };
      super(name, country, state, id, url, catalogUrl, defaults, params, categories);
      this.buildSearchUrl = this.buildSearchUrl.bind(this);
      this.getCatalogUrl = this.getCatalogUrl.bind(this);
      this.extractTokenMiddleware = this.extractTokenMiddleware.bind(this);
      this.extractDataMiddleware = this.extractDataMiddleware.bind(this);
      this.newSession = this.newSession.bind(this);
      this.parseSearchResults = this.parseSearchResults.bind(this);
      this.parseInventoryLookup = this.parseInventoryLookup.bind(this);
      this.searchUrl = urlutils.concat(this.catalogUrl, "/libero/WebOpac.cls");
      this.detailUrl = fromTemplate(urlutils.concat(this.catalogUrl, "/libero/WebopacOpenURL.cls?ACTION=DISPLAY&sid=LIBERO:<%= DATA %>&RSN=<%= id %>"));
      this.http = {
        common: {
          xfrm: "html"
        }
      };
      this.domOperations = this.getDomOperations();
    }

    buildSearchUrl(searchBy, searchTerm, request) {
      var idxLookup, params, qs;
      boundMethodCheck(this, LiberoCatalog);
      idxLookup = {
        "isbn": "i",
        "isbn13": "i",
        "title": "ku" // any text?
      };
      params = {
        TOKEN: this.session.token,
        TOKENX: this.session.token,
        DATA: this.session.DATA,
        VERSION: 2,
        TERM_1: searchTerm,
        USE_1: idxLookup[searchBy],
        LIMLOC: "",
        ACTION: "SEARCH"
      };
      qs = toQueryString(params);
      return {
        by: searchBy,
        url: this.searchUrl,
        body: qs
      };
    }

    getCatalogUrl() {
      boundMethodCheck(this, LiberoCatalog);
      return this.searchUrl;
    }

    extractTokenMiddleware(response) {
      var res;
      boundMethodCheck(this, LiberoCatalog);
      res = /input.*"TOKEN".*value=['"](.*?)['"]/.exec(response.body);
      if (res) {
        return this.session.token = res[1];
      }
    }

    extractDataMiddleware(response) {
      var res;
      boundMethodCheck(this, LiberoCatalog);
      res = /input.*"DATA".*value=['"](.*?)['"]/.exec(response.body);
      if (res) {
        return this.session.DATA = res[1];
      }
    }

    async newSession() {
      var me, opts, resp;
      boundMethodCheck(this, LiberoCatalog);
      me = this;
      opts = {
        url: me.catalogUrl
      };
      resp = (await me.httpRequest(opts));
      me.extractTokenMiddleware(resp);
      return me.extractDataMiddleware(resp);
    }

    async parseSearchResults(response, request) {
      var items, me;
      boundMethodCheck(this, LiberoCatalog);
      me = this;
      items = (await this.domOperations.extractSearchResults(response));
      return items.map(function(el) {
        return Object.assign({}, el, {
          url: me.getDetailUrl(el.id)
        });
      });
    }

    async parseInventoryLookup(response, request) {
      boundMethodCheck(this, LiberoCatalog);
      return (await this.domOperations.extractAvailability(response));
    }

  };

  // BEGIN src/catalogs/dom/libero.coffee
  LiberoDOMOperations = class LiberoDOMOperations extends DOMOperations {
    constructor() {
      super(...arguments);
      this.extractSearchResults = this.extractSearchResults.bind(this);
      this.extractAvailability = this.extractAvailability.bind(this);
    }

    extractIdFromHref(link) {
      var resp;
      resp = /&RSN=(.*?)&/.exec(link);
      return resp[1];
    }

    async extractSearchResults(content) {
      var books, columns, me, obj;
      boundMethodCheck(this, LiberoDOMOperations);
      obj = (await this.parser(content));
      books = [];
      me = this;
      columns = Array.from(obj.querySelectorAll("table#searchResults thead tr th")).reduce(function(res, cell, idx) {
        var val;
        val = cell.textContent.toLowerCase().trim();
        if (val && res[val]) {
          res[val] = idx + 1;
        }
        return res;
      }, {
        title: 3,
        author: -1
      });
      return Array.from(obj.querySelectorAll("table#searchResults tbody tr")).reduce(function(acc, row) {
        var book, col, id_, span;
        span = row.querySelector("td:nth-child(" + columns.title + ") span a");
        if (span === null) {
          return acc;
        }
        id_ = me.extractIdFromHref(span["href"]);
        book = {
          id: id_
        };
        if (columns.author >= 0) {
          col = row.querySelector("td:nth-child(" + columns.author + ") span.ShortTAut a");
          if (col) {
            book.author = normalizeAuthor(col.textContent);
          }
        }
        book = Object.assign(book, parseAuthorAndTitleBySlash(span.textContent));
        acc.push(book);
        return acc;
      }, []);
    }

    async extractAvailability(content) {
      var columns, data, obj, period, trimAndRemovePeriods;
      boundMethodCheck(this, LiberoDOMOperations);
      obj = (await this.parser(content));
      period = RegExp("\\s*\\.\\s*", "g");
      trimAndRemovePeriods = function(el) {
        if (el) {
          el = el.replace(period, "");
          return el.trim();
        }
        return "";
      };
      columns = Array.from(obj.querySelectorAll("div.ItemInfoCont thead tr th")).reduce(function(res, cell, idx) {
        var val;
        val = cell.textContent.toLowerCase().trim();
        if (val && res[val]) {
          res[val] = idx + 1;
        }
        return res;
      }, {
        status: -1,
        branch: 4,
        "due date": -1
      });
      data = Array.from(obj.querySelectorAll("div.ItemInfoCont tbody tr")).reduce(function(res, row) {
        var branch, status;
        res.count += 1;
        if (columns.status >= 0) {
          status = row.querySelector("td:nth-child(" + columns.status + ")").textContent;
          status = trimAndRemovePeriods(status).toLowerCase();
          if (status.indexOf("available") >= 0) {
            res.available += 1;
          }
        } else if (columns["due date"] >= 0) {
          status = row.querySelector("td:nth-child(" + columns["due date"] + ")").textContent;
          status = trimAndRemovePeriods(status).toLowerCase();
          if (status.length === 0) {
            res.available += 1;
          }
        }
        branch = row.querySelector("td:nth-child(" + columns.branch + ")").textContent.trim();
        if (branch) {
          res.branchHash[branch] = 1;
        }
        return res;
      }, {
        count: 0,
        available: 0,
        branchHash: {}
      });
      data.branches = hashToList(data.branchHash);
      return data;
    }

  };

  registerDOMOperations(LiberoDOMOperations, "libero");

  // END src/catalogs/dom/libero.coffee
  register(LiberoCatalog, "libero", null, LiberoDOMOperations);

  // END src/catalogs/libero.coffee
  // BEGIN src/catalogs/librofm.coffee
  LibroFMCatalog = class LibroFMCatalog extends Catalog {
    constructor(name, state, country, id, url, catalogUrl, params, categories) {
      var defaults;
      defaults = {};
      categories = ["book", "audiobook"];
      super(name, state, country, id, url, catalogUrl, defaults, params, categories);
      this.buildSearchUrl = this.buildSearchUrl.bind(this);
      this.parseSearchResults = this.parseSearchResults.bind(this);
      this.version = "76975393420a3733f8d5b96d7fd6e81a";
      this.allowMultiple = true;
      this.baseUrl = "https://libro.fm/";
      this.catalogUrl = "https://libro.fm/";
      this.libraryUrl = "https://libro.fm/";
      this.searchUrl = fromTemplate(urlutils.concat(this.catalogUrl, "/suggest.json?q=<%= query|encodeuri %>"));
      this.detailUrl = fromTemplate(urlutils.concat(this.catalogUrl, "/audiobooks/<%= id %>"));
      this.initializeUrl = this.baseUrl;
      this.http = {
        search: {
          xfrm: 'json'
        }
      };
    }

    canSearchByIsbn() {
      return false;
    }

    canSearchByIsbn13() {
      return false;
    }

    buildSearchUrl(searchBy, searchTerm, request) {
      boundMethodCheck(this, LibroFMCatalog);
      return {
        by: searchBy,
        url: this.searchUrl({
          query: searchTerm
        })
      };
    }

    parseSearchResults(response, request) {
      var me;
      boundMethodCheck(this, LibroFMCatalog);
      me = this;
      return response.map(function(el) {
        return {
          id: el.isbn,
          title: /<em>(.*)<\/em>/.exec(el.value)[1],
          author: (/by (.*?), narrated/.exec(el.value) || /by (.*?),/.exec(el.value))[1].split(',').map(function(e) {
            return e.trim();
          }),
          url: me.detailUrl({
            id: el.isbn
          }),
          binding: "audiobook",
          availability: {
            availabilityType: "always"
          }
        };
      });
    }

    parseInventoryLookup(response) {}

  };

  registerNonLibraryCatalog(LibroFMCatalog, "librofm", "Libro.fm");

  // END src/catalogs/librofm.coffee
  // BEGIN src/catalogs/ls2pac2.coffee
  LS2Pac2Library = class LS2Pac2Library extends Catalog {
    constructor(name, state, country, id, url, catalogUrl, params, categories) {
      var configSetting, defaults;
      defaults = {
        "requestParams": "",
        "CONFIG": null,
        "BRANCH_FILTER": null // this should be a single value (like ##)
      };
      categories = ["book", "audiobook", "music"];
      super(name, state, country, id, url, catalogUrl, defaults, params, categories);
      this.getCatalogUrl = this.getCatalogUrl.bind(this);
      this.getDetailPageUrl = this.getDetailPageUrl.bind(this);
      this.buildSearchUrl = this.buildSearchUrl.bind(this);
      this.parseSearchResults = this.parseSearchResults.bind(this);
      this.buildInventoryLookupUrl = this.buildInventoryLookupUrl.bind(this);
      this.version = "b036c4893a3c05dac2ab968fd2ad229f";
      this.searchUrl = urlutils.concat(this.catalogUrl, "/search");
      this.inventoryLookupUrl = urlutils.concat(this.catalogUrl, "/availability");
      configSetting = this.defaults["CONFIG"] || "default";
      this.detailUrl = urlutils.concat(this.catalogUrl, `/?config=${configSetting}&section=resource&resourceid=`);
      this.http = {
        common: {
          xfrm: 'json',
          headers: [["Content-Type", "application/json"]]
        }
      };
    }

    getCatalogUrl() {
      boundMethodCheck(this, LS2Pac2Library);
      if (this.defaults["CONFIG"]) {
        return urlutils.concat(this.catalogUrl, `/?config=${this.defaults["CONFIG"]}`);
      }
      return this.catalogUrl;
    }

    getDetailPageUrl(id) {
      boundMethodCheck(this, LS2Pac2Library);
      return `${this.detailUrl}${id}&currentIndex=0`;
    }

    buildSearchUrl(searchBy, searchTerm, request) {
      var config, data, postContent;
      boundMethodCheck(this, LS2Pac2Library);
      if (searchBy === "isbn" || searchBy === "isbn13") {
        searchBy = "isbn";
      } else {
        searchTerm = searchTerm.replace(":", " ");
      }
      config = "";
      if (this.defaults["CONFIG"] != null) {
        config = `p-config:${this.defaults["CONFIG"]}\n`;
      }
      postContent = {
        "searchTerm": searchTerm,
        "hitsPerPage": 100,
        "sortCriteria": "Relevancy",
        "startIndex": 0
      };
      if (this.defaults.BRANCH_FILTER) {
        postContent.branchFilters = [this.defaults.BRANCH_FILTER];
      }
      data = JSON.stringify(postContent);
      return {
        by: searchBy,
        url: this.searchUrl,
        body: data
      };
    }

    parseSearchResults(response, request) {
      var len, match, matches, n, result, results, title;
      boundMethodCheck(this, LS2Pac2Library);
      results = [];
      matches = response["resources"];
      for (n = 0, len = matches.length; n < len; n++) {
        match = matches[n];
        title = match["shortTitle"];
        if (!title) {
          continue;
        }
        result = {
          "title": title,
          "author": normalizeAuthor(match["shortAuthor"]),
          "id": match["id"],
          "url": this.getDetailPageUrl(match["id"]),
          "binding": match["format"],
          "copies": (match["holdingsInformations"] != null ? match["holdingsInformations"].length : 0),
          "holdings": match["holdingsInformations"]
        };
        results[results.length] = result;
      }
      return results;
    }

    buildInventoryLookupUrl(request, item) {
      var body, copyData, len, n, ref, result;
      boundMethodCheck(this, LS2Pac2Library);
      copyData = [];
      ref = item.holdings;
      for (n = 0, len = ref.length; n < len; n++) {
        result = ref[n];
        copyData[copyData.length] = {
          "itemIdentifier": result["barcode"],
          "resourceId": item.id
        };
      }
      body = JSON.stringify(copyData);
      return {
        url: this.inventoryLookupUrl,
        body: body
      };
    }

    parseInventoryLookup(response, request) {
      var available, data, len, n, r, ref;
      available = 0;
      ref = response["itemAvailabilities"];
      for (n = 0, len = ref.length; n < len; n++) {
        r = ref[n];
        if (r["statusCode"] === "I" || r["statusCode"] === "available") {
          available += 1;
        }
      }
      data = {
        "estimated": false,
        "count": response["itemAvailabilities"].length,
        "available": available,
        "branches": null
      };
      return data;
    }

  };

  register(LS2Pac2Library, "ls2pac2");

  // END src/catalogs/ls2pac2.coffee
  // BEGIN src/catalogs/montage.coffee
  MontageLibrary = class MontageLibrary extends Catalog {
    constructor(name, state, country, id, url, catalogUrl, params, categories) {
      var defaults;
      defaults = {
        "LIMIT_BRANCH": null,
        "MULTIBRANCH_LIMIT": null,
        "SEARCH_ISBN": "isbn",
        "SEARCH_TITLE": "title"
      };
      super(name, state, country, id, url, catalogUrl, defaults, params, categories);
      this.buildSearchUrl = this.buildSearchUrl.bind(this);
      this.version = "b8f2b0293a8dad48bc0aa1fae79297d1";
      this.detailUrl = fromTemplate(urlutils.concat(this.catalogUrl, "Montage/Books.aspx?bibid=<%= id %>"));
      this.searchUrl = fromTemplate(urlutils.concat(this.catalogUrl, "Montage/webmethods.aspx/GetTitles"));
      this.branches = null;
      this.http = {
        common: {
          xfrm: "noop",
          headers: [['Content-Type', 'application/json']]
        }
      };
      this.buildInventoryLookupUrl = null;
      this.allowMultiple = true;
      this.domOperations = this.getDomOperations();
    }

    canSearchByIsbn() {
      return false;
    }

    canSearchByIsbn13() {
      return false;
    }

    buildSearchUrl(searchBy, searchTerm, request) {
      var idxLookup, params;
      boundMethodCheck(this, MontageLibrary);
      idxLookup = {
        "isbn": this.defaults["SEARCH_ISBN"],
        "isbn13": this.defaults["SEARCH_ISBN"],
        "title": this.defaults["SEARCH_TITLE"]
      };
      params = {
        pageIndex: 1,
        keyword: searchTerm,
        method: "0",
        collection: "",
        refinements: "",
        datefrom: "",
        dateto: "",
        page: "Books.aspx",
        noDays: "0",
        sort: "1003",
        bibid: "",
        showall: 0,
        stats: 1,
        listid: "",
        frm: ""
      };
      return {
        by: searchBy,
        url: this.searchUrl({
          params: params
        }),
        body: JSON.stringify(params)
      };
    }

    async parseSearchResults(response, request) {
      return (await this.domOperations.extractSearchResults(response));
    }

  };

  // BEGIN src/catalogs/dom/montage.coffee
  MontageDOMOperations = class MontageDOMOperations extends DOMOperations {
    constructor() {
      super(...arguments);
      this.extractSearchResults = this.extractSearchResults.bind(this);
    }

    customParsers() {
      return {
        "json_xml": function(content, parsers) {
          var data;
          data = parsers.json(content);
          return parsers.xml(data.d);
        }
      };
    }

    async extractSearchResults(content) {
      var obj;
      boundMethodCheck(this, MontageDOMOperations);
      obj = (await this.parser(content, {
        xfrm: "json_xml"
      }));
      return Array.from(obj.querySelectorAll("Access")).reduce(function(acc, el) {
        var item;
        item = {
          id: el.querySelector("dds_bibusri").textContent,
          author: normalizeAuthor(el.querySelector("dds_author").textContent),
          title: normalizeTitle(el.querySelector("dds_title").textContent),
          binding: commonBindingMappings(el.querySelector("dds_formatgrp").textContent),
          edition: el.querySelector("dds_edition").textContent,
          isbn: el.querySelector("dds_isbn").textContent,
          availability: {
            available: parseInt(el.querySelector("CountOfItemsAvailable").textContent),
            isAvailable: parseInt(el.querySelector("CountOfItemsAvailable").textContent) > 0,
            count: 0
          }
        };
        acc.push(item);
        return acc;
      }, []);
    }

  };

  registerDOMOperations(MontageDOMOperations, "montage");

  // END src/catalogs/dom/montage.coffee
  register(MontageLibrary, "montage", null, MontageDOMOperations);

  // END src/catalogs/montage.coffee
  // BEGIN src/catalogs/nls_bard.coffee
  NLSBardCatalog = class NLSBardCatalog extends Catalog {
    constructor(name, state, country, id, url, catalogUrl, params, categories) {
      var defaults;
      defaults = {};
      categories = ["book", "audiobook", "music"];
      super(name, state, country, id, url, catalogUrl, defaults, params, categories);
      this.buildSearchUrl = this.buildSearchUrl.bind(this);
      this.parseSearchResults = this.parseSearchResults.bind(this);
      this.version = "96780d7ca909ade6713ebb47b81a5a32";
      this.baseUrl = "https://nlsbard.loc.gov/";
      this.catalogUrl = "https://nlsbard.loc.gov/";
      this.libraryUrl = "https://nlsbard.loc.gov/";
      this.sruBaseUrl = "https://lx2.loc.gov/sru/nlsbph?";
      this.searchUrl = fromTemplate(urlutils.concat(this.sruBaseUrl, "version=2.0&operation=searchRetrieve&startRecord=1&maximumRecords=100&query=<%= term|encodeuri %>"));
      this.allowMultiple = true;
      this.buildInventoryLookupUrl = null;
      this.http = {
        common: {
          xfrm: 'xml'
        }
      };
      this.domOperations = this.getDomOperations();
    }

    canSearchByIsbn() {
      return false;
    }

    canSearchByIsbn13() {
      return false;
    }

    buildSearchUrl(searchBy, searchTerm, request) {
      boundMethodCheck(this, NLSBardCatalog);
      searchTerm = searchTerm.replace(/[\*\?]/g, ' ');
      return {
        by: searchBy,
        url: this.searchUrl({
          term: `(dc.title = \"${searchTerm}\")`
        })
      };
    }

    async parseSearchResults(response, request) {
      var items;
      boundMethodCheck(this, NLSBardCatalog);
      return items = (await this.domOperations.extractSearchResults(response));
    }

    parseInventoryLookup(response) {}

  };

  // BEGIN src/catalogs/dom/nls_bard.coffee
  Z3950TagMap = {
    ID: {
      TAG: "010",
      CODE: "a",
      DESCRIPTION: "LCCN"
    },
    TITLE: {
      TAG: "245",
      CODE: "a",
      DESCRIPTION: "Title"
    },
    AUTHOR: {
      TAG: "100",
      CODE: "a",
      DESCRIPTION: "Personal Name"
    },
    BINDING: {
      TAG: "245",
      CODE: "h",
      DESCRIPTION: "medium"
    },
    LINK: {
      TAG: "856",
      CODE: "u",
      DESCRIPTION: "Electronic Location and Access"
    }
  };

  Z3950RecordSet = class Z3950RecordSet {
    constructor() {
      this.fromXml = this.fromXml.bind(this);
      this.getRecordByTag = this.getRecordByTag.bind(this);
      this.toResourceResults = this.toResourceResults.bind(this);
      this.toResourceResult = this.toResourceResult.bind(this);
      this._recordsByTag = {};
    }

    fromXml(xml) {
      this._recordsByTag = Array.from(xml.querySelectorAll("datafield")).reduce(function(acc, el) {
        var rec;
        rec = new Z3950Record();
        rec.fromRecord(el);
        acc[rec.getTag()] = rec;
        return acc;
      }, {});
      return this;
    }

    getRecordByTag(tag) {
      var rec;
      rec = this._recordsByTag[tag.TAG];
      return rec.getSubfield(tag.CODE);
    }

    toResourceResults() {
      var res;
      res = this.toResourceResult();
      if (res) {
        return [res];
      }
      return [];
    }

    toResourceResult() {
      try {
        return {
          id: this.getRecordByTag(Z3950TagMap.ID),
          title: this.getRecordByTag(Z3950TagMap.TITLE),
          author: normalizeAuthor(this.getRecordByTag(Z3950TagMap.AUTHOR)),
          url: this.getRecordByTag(Z3950TagMap.LINK),
          binding: commonBindingMappings(/\[(.*)\]/.exec(this.getRecordByTag(Z3950TagMap.BINDING))[1]),
          availability: {
            isAvailable: true
          }
        };
      } catch (error1) {
        return null;
      }
    }

  };

  Z3950Record = class Z3950Record {
    constructor() {
      this.fromRecord = this.fromRecord.bind(this);
      this.getTag = this.getTag.bind(this);
      this.getSubfield = this.getSubfield.bind(this);
      this._el = null;
    }

    fromRecord(el) {
      this._el = el;
      return this;
    }

    getTag() {
      return this._el.getAttribute("tag");
    }

    getSubfield(subfield) {
      var selector;
      selector = "subfield[code=\"" + subfield + "\"]";
      return textFromElement(this._el.querySelector(selector));
    }

  };

  NLSBardDOMOperations = class NLSBardDOMOperations extends DOMOperations {
    constructor() {
      super(...arguments);
      this.extractSearchResults = this.extractSearchResults.bind(this);
    }

    async extractSearchResults(content) {
      var obj;
      boundMethodCheck(this, NLSBardDOMOperations);
      obj = (await this.parser(content));
      return Array.from(obj.querySelectorAll("records > record")).reduce(function(acc, el) {
        var rs;
        rs = new Z3950RecordSet();
        rs.fromXml(el);
        return acc.concat(rs.toResourceResults());
      }, []);
    }

  };

  registerDOMOperations(NLSBardDOMOperations, "nlsbard");

  // END src/catalogs/dom/nls_bard.coffee
  registerNonLibraryCatalog(NLSBardCatalog, 'nlsbard', "National Library Service for the Blind and Physically Handicapped", NLSBardDOMOperations);

  // END src/catalogs/nls_bard.coffee
  // BEGIN src/catalogs/oclcwise.coffee

  // BEGIN src/utilities/json.coffee
  JSONPath = {
    find: function(path, obj) {
      try {
        if (typeof path === 'object') {
          return JSONPath.parseObject(path, obj);
        }
        return JSONPath.parseString(path, obj);
      } catch (error1) {
        return null;
      }
    },
    parseObject: function(path, obj) {
      return Object.keys(path).reduce(function(acc, el) {
        acc[el] = JSONPath.parseString(path[el], obj);
        return acc;
      }, {});
    },
    parseString: function(path, obj) {
      return path.split(' ').map(function(p) {
        return JSONPath.parseOne(p, obj);
      }).join(' ');
    },
    parseOne: function(path, obj) {
      var identity;
      identity = function(v) {
        return v;
      };
      return path.split('.').reduce(function(acc, v) {
        var arr, hasTransform, xfrm;
        if (v === "$") {
          return obj;
        }
        xfrm = identity;
        hasTransform = /(?<key>.*?)\|(?<fn>.*)/.exec(v);
        if (hasTransform) {
          xfrm = this[hasTransform.groups.fn];
        }
        arr = /(?<key>.*?)\[(?<idx>[0-9]+)\]/.exec(v);
        if (arr) {
          return xfrm(acc[arr.groups.key][arr.groups.idx]);
        }
        return xfrm(acc[v]);
      }, obj);
    }
  };

  unitTestable(JSONPath, "JSONPath");

  // END src/utilities/json.coffee
  OCLCWiseLibrary = class OCLCWiseLibrary extends Catalog {
    constructor(name, country, state, id, url, catalogUrl, params, categories) {
      var defaults, me;
      defaults = {
        'vestnr': null,
        'app_js_host': null
      };
      super(name, country, state, id, url, catalogUrl, defaults, params, categories);
      this.newSession = this.newSession.bind(this);
      this.buildSearchUrl = this.buildSearchUrl.bind(this);
      this.parseSearchResults = this.parseSearchResults.bind(this);
      this.searchUrl = urlutils.concat(this.defaults.app_js_host || this.catalogUrl, "/cgi-bin/bx.pl");
      this.detailUrl = fromTemplate(urlutils.concat(this.catalogUrl, "/wise-apps/catalog/<%= vestnr %>/detail/wise/<%= id %>"));
      this.holdingsUrl = fromTemplate(urlutils.concat(this.defaults.app_js_host || this.catalogUrl, "/restapi/title/<%= id %>/iteminformation?branchCatGroups=0&branchId=<%= vestnr %>&clientType=I"));
      this.availabilityUrl = fromTemplate(urlutils.concat(this.defaults.app_js_host || this.catalogUrl, "/restapi/item/<%= items %>/availability"));
      this.http = {
        common: {
          xfrm: 'json'
        }
      };
      me = this;
      this.availabilitySearchConditions = [
        {
          condition: function(res,
        depth) {
            return depth === 0;
          },
          urlBuilder: function(re_res,
        res,
        req,
        item) {
            return {
              url: me.holdingsUrl(Object.assign({},
        me.defaults,
        item)),
              headers: [["wise_key",
        me.session.session_key]]
            };
          }
        },
        {
          condition: function(res,
        depth) {
            var items;
            items = Array.isArray(res) && res.reduce(function(acc,
        el) {
              if (el && el.id) {
                acc.push(el.id);
              }
              return acc;
            },
        []) || [];
            return items.length > 0 && depth > 0 && Array.isArray(res) && res.length > 0;
          },
          urlBuilder: function(re_res,
        res,
        req,
        item) {
            var items;
            items = res.reduce(function(acc,
        el) {
              if (el && el.id) {
                acc.push(el.id);
              }
              return acc;
            },
        []).join(",");
            return {
              url: me.availabilityUrl(Object.assign({
                items: items
              },
        me.defaults,
        item)),
              headers: [["wise_key",
        me.session.session_key]]
            };
          }
        }
      ];
    }

    async getHmac(public_key, secret, message) {
      var algorithm, buffer, crypto_key, d, encoder, harray, hmac, msg;
      d = Math.floor(new Date() / 86400000);
      encoder = new TextEncoder("utf-8");
      algorithm = {
        name: "HMAC",
        hash: "SHA-256"
      };
      msg = "" + d + message;
      crypto_key = (await crypto.subtle.importKey("raw", encoder.encode(secret), algorithm, false, ["sign", "verify"]));
      buffer = (await crypto.subtle.sign(algorithm.name, crypto_key, encoder.encode(msg)));
      harray = Array.from(new Uint8Array(buffer));
      hmac = harray.map(function(ch) {
        return ch.toString(16).padStart(2, "0");
      }).join("");
      return `${public_key}:${hmac}`;
    }

    async newSession() {
      var me, opts, resp;
      boundMethodCheck(this, OCLCWiseLibrary);
      me = this;
      opts = {
        url: urlutils.concat(this.defaults.app_js_host || this.catalogUrl, "/wise-apps/catalog/js/app.js"),
        xfrm: 'noop'
      };
      resp = (await me.httpRequest(opts));
      me.session.wise_key_id = /apiKeyId:\W*"(.*?)"/.exec(resp.body)[1];
      me.session.wise_key = /apiKey:\W*"(.*?)"/.exec(resp.body)[1];
      me.session.session_key = (await me.getHmac(me.session.wise_key_id, me.session.wise_key, "Catalog"));
      return me.session.wise_session = "";
    }

    buildSearchUrl(searchBy, searchTerm, request) {
      var formData, me;
      boundMethodCheck(this, OCLCWiseLibrary);
      me = this;
      formData = {
        prt: "INTERNET",
        var: "portal",
        vestnr: me.defaults.vestnr,
        fmt: "json",
        search_in: "iets",
        amount: "50",
        catalog: "default",
        event: "osearch",
        preset: "all",
        offset: "0",
        qs: searchTerm,
        vcgrpf: "0",
        prespectiveId: "8",
        backend: "wise",
        vcgrpt: "0"
      };
      return {
        by: searchBy,
        url: me.searchUrl,
        body: toQueryString(formData),
        headers: [["wise_key", `${me.session.wise_key}:`]]
      };
    }

    parseSearchResults(response, request) {
      var me;
      boundMethodCheck(this, OCLCWiseLibrary);
      me = this;
      return response.objects.reduce(function(acc, item) {
        try {
          if (item.fields.origine.content.value === "wise") {
            acc.push({
              id: item.fields.origin_id.content[0].value,
              title: item.fields.titel.content.value,
              author: normalizeAuthor(item.fields.auteur.content[0].value),
              url: me.getDetailUrl(item.fields.origin_id.content[0].value),
              binding: commonBindingMappings(item.fields.medium_srt.content.label),
              coverImage: JSONPath.find('$.fields.thumbnail.content[0].value', item)
            });
          }
        } catch (error1) {
          0;
        }
        return acc;
      }, []);
    }

    buildInventoryLookupUrl(request, item) {
      return {
        url: item.url
      };
    }

    parseInventoryLookup(response, request) {
      return response.reduce(function(acc, el) {
        if (el.forLoan && !el.blockPublic) {
          acc.count += 1;
          if (el.availabilityStatus === "AVAILABLE") {
            acc.available += 1;
          }
        }
        return acc;
      }, {
        available: 0,
        count: 0
      });
    }

  };

  register(OCLCWiseLibrary, "oclcwise");

  // END src/catalogs/oclcwise.coffee
  // BEGIN src/catalogs/overdrive.coffee
  OverdriveDigitalLibrary = class OverdriveDigitalLibrary extends Catalog {
    constructor(name, state, country, id, url, catalogUrl, params, categories) {
      var defaults;
      categories = ["books", "music", "audiobook"];
      defaults = {
        PARALLEL_REQUESTS: 4,
        USE_LIBBY: params && params.FORCE_LIBBY
      };
      super(name, state, country, id, url, catalogUrl, defaults, params, categories);
      this.registerEvents = this.registerEvents.bind(this);
      this.initializeUrls = this.initializeUrls.bind(this);
      this.newSession = this.newSession.bind(this);
      this.logout = this.logout.bind(this);
      this.determineFormats = this.determineFormats.bind(this);
      this.determineOverdriveVersion = this.determineOverdriveVersion.bind(this);
      this.buildSearchUrl = this.buildSearchUrl.bind(this);
      this.parseLibby = this.parseLibby.bind(this);
      this.parseSearchResults = this.parseSearchResults.bind(this);
      this.version = "b2a66a92b7ccf463cd93e1418db747d8";
      this.description = "Overdrive Digital Catalog";
      this.overdriveUrl = catalogUrl;
      this.v2Search = "/search?q=";
      this.v2dot1Search = "/search/title?query=";
      this.urls = {
        signout: urlutils.concat(catalogUrl, "/accounts/sign-out")
      };
      this.overdrive_version = (params && params.overdrive_version) || 2;
      this.http = {
        common: {
          xfrm: "noop"
        }
      };
      this.session.USE_LIBBY = this.defaults.USE_LIBBY;
      this.initializeUrls();
      this.allowMultiple = true;
      this.domOperations = this.getDomOperations();
    }

    async registerEvents() {
      var me, postCallback, use_libby;
      boundMethodCheck(this, OverdriveDigitalLibrary);
      me = this;
      postCallback = function(newValue) {
        me.session.USE_LIBBY = newValue.status;
        return me.initializeUrls();
      };
      me.app.registerEvent('on_use_libby_change', {
        postMessage: postCallback
      });
      use_libby = ((await me.app.getConfigValue("use_libby"))).value;
      me.session.USE_LIBBY = (use_libby === true) || me.defaults.USE_LIBBY;
      return me.initializeUrls();
    }

    initializeUrls() {
      boundMethodCheck(this, OverdriveDigitalLibrary);
      if (this.session.USE_LIBBY) {
        this.description = "Libby Digital Catalog";
        this.session.LIBBY_LIBRARY_ID = /:\/\/([A-Za-z0-9\-]+).overdrive.com/.exec(this.overdriveUrl)[1];
        this.catalogUrl = urlutils.concat("https://libbyapp.com/library/", this.session.LIBBY_LIBRARY_ID);
        this.urls = {
          search: fromTemplate(urlutils.concat("https://thunder.api.overdrive.com/v2/libraries/", this.session.LIBBY_LIBRARY_ID, "media?<%= qs %>"))
        };
        return this.http.common.xfrm = 'json';
      } else {
        this.description = "Overdrive Digital Catalog";
        this.catalogUrl = this.overdriveUrl;
        this.urls = {
          signout: urlutils.concat(this.overdriveUrl, "/accounts/sign-out")
        };
        return this.session.LIBBY_LIBRARY_ID = void 0;
      }
    }

    async newSession(request) {
      var me, opts, resp;
      boundMethodCheck(this, OverdriveDigitalLibrary);
      me = this;
      opts = {
        url: me.catalogUrl
      };
      resp = (await me.httpRequest(opts));
      if (resp.http.redirected && resp.http.url.indexOf('merged') > 0) {
        return Promise.reject({
          message: "CatalogDisabled",
          url: opts.url
        });
      }
      if (resp.code === 504) {
        await me.logout();
        resp = (await me.httpRequest(opts));
      }
      if (resp.http && resp.http.url && resp.http.url.indexOf(me.catalogUrl) < 0) {
        me.catalogUrl = /https?:\/\/.*?\//.exec(resp.http.url)[0];
      }
      if (!this.session.USE_LIBBY) {
        await me.determineOverdriveVersion(resp);
        await me.determineFormats(resp);
      }
      return me.session.expiry = me.getNewSessionTimeout();
    }

    logout() {
      var me;
      boundMethodCheck(this, OverdriveDigitalLibrary);
      me = this;
      if (me.session.logout) {
        return Promise.resolve();
      }
      me.session.logout = me.app.time();
      if (me.urls.logout) {
        ({
          opts: {
            url: me.urls.logout,
            xfrm: 'noop'
          }
        });
        return me.httpRequest(opts);
      }
      return Promise.resolve();
    }

    async determineFormats(resp) {
      var me, mediaFormatsPage, mediaResp, opts;
      boundMethodCheck(this, OverdriveDigitalLibrary);
      if (this.overdrive_version !== 2) {
        return;
      }
      me = this;
      mediaFormatsPage = urlutils.concat(this.catalogUrl, '/advanced-search');
      opts = {
        url: mediaFormatsPage,
        xfrm: "html"
      };
      mediaResp = (await me.httpRequest(opts));
      return me.formats = (await this.domOperations.extractFormats(mediaResp.http.body));
    }

    async determineOverdriveVersion(resp) {
      var v2Versions, version;
      boundMethodCheck(this, OverdriveDigitalLibrary);
      version = (await this.domOperations.extractOverdriveVersion(resp.http.body));
      v2Versions = new Set(["2", "2.1"]);
      if (v2Versions.has(version)) {
        this.overdrive_version = 2;
        if (version === "2.1") {
          return this.v2Search = this.v2dot1Search;
        }
      }
    }

    canSearchByIsbn() {
      return false;
    }

    canSearchByIsbn13() {
      return false;
    }

    buildSearchUrl(searchBy, searchTerm, request) {
      var me, params, qs, title, titleRegExp, url;
      boundMethodCheck(this, OverdriveDigitalLibrary);
      me = this;
      if (this.session.USE_LIBBY) {
        params = {
          query: searchTerm,
          format: "ebook-overdrive,ebook-media-do,audiobook-overdrive,ebook-overdrive-provisional,audiobook-overdrive-provisional",
          page: "1",
          perPage: "24"
        };
        qs = new URLSearchParams(params);
        url = this.urls.search({
          qs: qs.toString()
        });
      } else {
        titleRegExp = RegExp("([a-zA-Z0-9%\'' \.]+)");
        title = titleRegExp.exec(searchTerm)[1];
        url = urlutils.concat(this.catalogUrl, `${this.v2Search}${encodeURIComponent(searchTerm)}`);
      }
      return {
        by: searchBy,
        url: url
      };
    }

    parseLibby(response) {
      var me;
      boundMethodCheck(this, OverdriveDigitalLibrary);
      me = this;
      return response.items.map(function(el) {
        var res;
        return res = {
          id: el.id,
          title: el.title,
          author: el.firstCreatorName,
          url: urlutils.concat(me.catalogUrl, "search/page-1", el.id),
          binding: el.type.id,
          availability: {
            count: el.ownedCopies || 0,
            available: el.availableCopies || 0,
            estimatedHoldWait: el.estimatedWaitDays
          }
        };
      });
    }

    async parseSearchResults(response, request, raw) {
      var items, me, noresults;
      boundMethodCheck(this, OverdriveDigitalLibrary);
      noresults = /We couldn't find any matches for/.exec(raw);
      if (noresults) {
        return [];
      }
      if (this.session.USE_LIBBY) {
        return this.parseLibby(response);
      }
      me = this;
      items = (await this.domOperations.extractSearchResults(response));
      items = items.map(function(el) {
        return Object.assign({}, el, {
          url: urlutils.concat(me.catalogUrl, el.url)
        });
      });
      return items;
    }

  };

  // BEGIN src/catalogs/dom/overdrive.coffee
  OverdriveDOMOperations = class OverdriveDOMOperations extends DOMOperations {
    constructor() {
      super(...arguments);
      this.extractOverdriveVersion = this.extractOverdriveVersion.bind(this);
      this.extractFormats = this.extractFormats.bind(this);
      this.extractSearchResults = this.extractSearchResults.bind(this);
    }

    customParsers() {
      return {
        "content": function(content) {
          if (content.indexOf("OverDrive.titleCollection") >= 0 || content.indexOf("Overdrive.mediaItems") >= 0) {
            return content;
          }
          return null;
        }
      };
    }

    async extractOverdriveVersion(content) {
      var obj;
      boundMethodCheck(this, OverdriveDOMOperations);
      obj = (await this.parser(content, {
        xfrm: "html"
      }));
      if (obj.querySelector("#search-form, .Nav-searchText, .LibbyPromo")) {
        if (obj.querySelector("input[name=query]")) {
          return "2.1";
        }
        return "2";
      }
      return "unknown";
    }

    async extractFormats(content) {
      var obj;
      boundMethodCheck(this, OverdriveDOMOperations);
      obj = (await this.parser(content, {
        xfrm: "html"
      }));
      return Array.from(obj.querySelectorAll("select[name='format'] option")).reduce(function(acc, el) {
        acc.push({
          format: el.value,
          description: el.textContent.trim()
        });
        return acc;
      }, []);
    }

    _parseAvailabilityFromJSON(raw) {
      var args, digitalBooks, urlRoot;
      urlRoot = "/media/";
      digitalBooks = [];
      args = [/window.OverDrive.titleCollection = (.*);/, /window.Overdrive.mediaItems = (.*);/];
      args.forEach(function(arg) {
        var data, results;
        data = arg.exec(raw);
        if (data) {
          results = JSON.parse(data[1]);
          return results.forEach(function(item) {
            var coverImage, res;
            if (!item.isOwned) {
              return;
            }
            coverImage = item.covers && Object.keys(item.covers).reduce(function(acc, key) {
              var el;
              el = item.covers[key];
              if (acc.size === 0 || el.size < acc.size) {
                acc.url = el.href;
                acc.size = el.width;
              }
              return acc;
            }, {
              size: 0,
              url: ""
            });
            res = {
              id: item.id,
              title: item.title.trim(),
              author: item.firstCreatorName && item.firstCreatorName.trim(),
              languages: item.languages,
              url: urlutils.concat(urlRoot, item.id),
              binding: item.type.name.trim().toLowerCase(),
              availability: {
                count: item.ownedCopies,
                available: item.availableCopies,
                availabilityType: item.availabilityType
              },
              coverImage: coverImage && coverImage.url
            };
            if (item.holdsCount) {
              res.availability.holds = item.holdsCount;
            }
            if (item.estimatedWaitDays) {
              res.availability.estimatedHoldWait = item.estimatedWaitDays;
            }
            return digitalBooks[digitalBooks.length] = res;
          });
        }
      });
      return digitalBooks;
    }

    async extractSearchResults(content) {
      var obj;
      boundMethodCheck(this, OverdriveDOMOperations);
      obj = (await this.parser(content, {
        xfrm: "content,html"
      }));
      if (typeof obj === "string") {
        return this._parseAvailabilityFromJSON(content);
      }
      return Array.from(obj.querySelectorAll("div.title-container")).reduce(function(acc, el) {
        var author, binding, copies, copiesAvailable, copiesTotal, id, link, mtch, res, title;
        title = el.querySelector("p.title-name").textContent.trim();
        author = textFromElement(el.querySelector("p.title-author"));
        binding = txtLower(el.querySelector("span.title-format-badge").textContent);
        link = el.querySelector("p.title-name a").getAttribute("href");
        id = el.querySelector("p.title-name").dataset["id"] || el.querySelector("p.title-name").dataset["mediaId"];
        copiesTotal = null;
        copiesAvailable = 0;
        copies = textFromElement(el.querySelector("p.copies-available"));
        if (copies) {
          mtch = /(\d+) of (\d+) cop(y|ies)/.exec(copies);
          if (mtch) {
            copiesAvailable = parseInt(mtch[1]);
            copiesTotal = parseInt(mtch[2]);
          }
        }
        res = {
          id: id,
          title: title,
          author: author,
          url: link,
          binding: binding,
          availability: {
            count: copiesTotal,
            available: copiesAvailable
          }
        };
        acc.push(res);
        return acc;
      }, []);
    }

  };

  registerDOMOperations(OverdriveDOMOperations, "overdrive");

  // END src/catalogs/dom/overdrive.coffee
  register(OverdriveDigitalLibrary, "overdrive", null, OverdriveDOMOperations);

  // END src/catalogs/overdrive.coffee
  // BEGIN src/catalogs/polaris.coffee
  PolarisLibrary = class PolarisLibrary extends Catalog {
    constructor(name, state, country, id, url, catalogUrl, params, categories) {
      var defaults, me;
      defaults = {
        rootpath: "/polaris/",
        context: "1.1033.0.0.6",
        limitBranches: null
      };
      super(name, state, country, id, url, catalogUrl, defaults, params, categories);
      this.newSession = this.newSession.bind(this);
      this.getCatalogUrl = this.getCatalogUrl.bind(this);
      this.getDetailPageUrl = this.getDetailPageUrl.bind(this);
      this.buildSearchUrl = this.buildSearchUrl.bind(this);
      this.parseSearchResults = this.parseSearchResults.bind(this);
      this.handleAjaxResultsResponse = this.handleAjaxResultsResponse.bind(this);
      this.parseInventoryLookup = this.parseInventoryLookup.bind(this);
      this.version = "ef2b513c4bb28c43ec10d32dc06894fc";
      this.isbn = null;
      this.baseUrl = urlutils.concat(catalogUrl, this.defaults.rootpath);
      this.searchUrl = fromTemplate(`${this.baseUrl}search/searchresults.aspx?ctx=${this.defaults.context}&type=Term&by=<%= by %>&sort=RELEVANCE&limit=&query=&page=0&term=<%= term %>`);
      this.detailUrl = fromTemplate(`${this.baseUrl}search/searchresults.aspx?ctx=${this.defaults.context}&type=Term&by=<%= by %>&sort=RELEVANCE&limit=&query=&page=0&term=<%= term %>`);
      this.detailUrlById = fromTemplate(`${this.baseUrl}search/title.aspx?ctx=${this.defaults.context}&pos=<%= position %>&cn=<%= id %>`);
      this.ajaxInventoryUrl = `${this.baseUrl}search/components/ajaxResults.aspx?page=1`;
      me = this;
      this.availabilitySearchConditions = [
        {
          condition: function(res,
        depth) {
            return depth === 0;
          },
          urlBuilder: function(re_res,
        res,
        req,
        item) {
            return {
              url: me.getDetailPageUrl(item.id,
        item),
              xfrm: "html"
            };
          }
        },
        {
          condition: function(res,
        depth) {
            return RegExp("load\\('(.*ajaxavailability\.aspx.*)'").exec(res);
          },
          urlBuilder: function(res) {
            return {
              url: res[1],
              headers: [['x-requested-with',
        'XMLHttpRequest']],
              xfrm: "html"
            };
          }
        }
      ];
      this.http = {
        common: {
          xfrm: "html"
        }
      };
      this.domOperations = this.getDomOperations();
    }

    async newSession() {
      var me, opts;
      boundMethodCheck(this, PolarisLibrary);
      me = this;
      opts = {
        url: me.baseUrl
      };
      await me.httpRequest(opts);
      return me.session.expiry = me.getNewSessionTimeout();
    }

    getCatalogUrl() {
      boundMethodCheck(this, PolarisLibrary);
      return `${this.baseUrl}?ctx=${this.defaults.context}`;
    }

    getDetailPageUrl(id, item) {
      boundMethodCheck(this, PolarisLibrary);
      if (this.isbn != null) {
        return this.detailUrl({
          by: "ISBN",
          term: this.isbn
        });
      }
      return this.detailUrlById(item);
    }

    buildSearchUrl(searchBy, searchTerm, request) {
      var data;
      boundMethodCheck(this, PolarisLibrary);
      data = {
        term: searchTerm,
        by: "TI"
      };
      if (searchBy === "isbn" || searchBy === "isbn13") {
        data.by = "ISBN";
        searchBy = "isbn";
      }
      return {
        by: searchBy,
        url: this.searchUrl(data)
      };
    }

    async parseSearchResults(response, request, raw) {
      var matches, me, opts, resp, result, results;
      boundMethodCheck(this, PolarisLibrary);
      matches = /ajaxLoadResultsPage/.exec(raw);
      if (matches != null) {
        logger.debug("Loading sub-results page...");
        me = this;
        opts = {
          url: `${me.ajaxInventoryUrl}&hpp=100`,
          xfrm: "html"
        };
        resp = (await me.httpRequest(opts, request));
        return me.handleAjaxResultsResponse(resp.body, request);
      }
      result = (await this.domOperations.extractAvailability(response));
      return [result];
      results = [];
      matches = /ShowContent\(.*, '([0-9]+)', ([0-9]+)\)/.exec(raw);
      if (matches != null) {
        this.isbn = matches[1];
        results.push({
          id: matches[2],
          url: this.getDetailPageUrl(matches[2])
        });
        return results;
      }
      matches = /ShowContent\(.*, ([0-9]+), '([0-9]+)'\)/.exec(raw);
      if (matches != null) {
        this.isbn = matches[2];
        results.push({
          id: this.isbn,
          url: this.getDetailPageUrl(this.isbn)
        });
        return results;
      }
      return [];
    }

    async handleAjaxResultsResponse(response, request) {
      boundMethodCheck(this, PolarisLibrary);
      return (await this.domOperations.extractSearchResultsAjax(response));
    }

    async parseInventoryLookup(response, request) {
      boundMethodCheck(this, PolarisLibrary);
      return (await this.domOperations.extractAvailability(response));
    }

  };

  // BEGIN src/catalogs/dom/polaris.coffee
  PolarisDOMOperations = class PolarisDOMOperations extends DOMOperations {
    constructor() {
      super(...arguments);
      this.extractSearchResultsAjax = this.extractSearchResultsAjax.bind(this);
      this.extractAvailability = this.extractAvailability.bind(this);
    }

    getBinding(el) {
      var bindingImages, result;
      bindingImages = Array.from(el.querySelectorAll("img[class*=detail-formats], .marcview img"));
      result = bindingImages.reduce(function(acc, binding_el) {
        return acc || (binding_el.getAttribute("title") && binding_el.getAttribute("title").toLowerCase()) || "";
      }, "");
      if (!result) {
        bindingImages = Array.from(el.querySelectorAll(".nsm-brief-standard-group"));
        result = bindingImages.reduce(function(acc, gr_el) {
          if (acc) {
            return acc;
          }
          if (txtLower(textFromElement(findFirstMatchingNode(gr_el, ".nsm-brief-label"))) === "medium:") {
            return txtLower(textFromElement(findFirstMatchingNode(gr_el, ".nsm-short-item")));
          }
          return "";
        }, "");
      }
      return result;
    }

    idFromActionLinkQueryString(el) {
      var href, id_, link;
      link = el.querySelector("[class*=action-link]");
      if (link) {
        href = link.href;
        if (href.indexOf('cn') >= 0) {
          id_ = /cn=(\d+)/.exec(link.href)[1];
          return {
            url: href,
            id: id_,
            position: parseInt(/pos=(\d+)/.exec(href)[1])
          };
        }
      }
    }

    idFromActionLinkAddToMyList(el) {
      var href, id_, link;
      link = el.querySelector("[class*=action-link]");
      if (link) {
        href = el.querySelector('.c-add-to-my-list').href;
        if (href) {
          id_ = /'(.*)'/.exec(href)[1];
          return {
            url: `${link.href}&cn=${id_}`,
            id: id_,
            position: parseInt(/pos=(\d+)/.exec(link.href)[1])
          };
        }
      }
    }

    async extractSearchResultsAjax(content) {
      var idSources, items, me, obj;
      boundMethodCheck(this, PolarisDOMOperations);
      obj = (await this.parser(content));
      me = this;
      idSources = [me.idFromActionLinkQueryString, me.idFromActionLinkAddToMyList];
      items = Array.from(obj.querySelectorAll("div[class*=--search-result]"));
      return items.reduce(function(acc, el) {
        var coverImage, res;
        res = idSources.reduce(function(acc, fn) {
          return acc || fn(el);
        }, null);
        if (res) {
          coverImage = el.querySelector("img[class*=thumbnail]");
          res = Object.assign({}, res, {
            title: normalizeTitle(textFromElement(el.querySelector("[class*=-title-group]"))),
            author: normalizeAuthor(textFromElement(el.querySelector("[class*=-author-group]"))),
            binding: commonBindingMappings(me.getBinding(el) || null),
            coverImage: coverImage && coverImage.src
          });
          acc.push(res);
        }
        return acc;
      }, []);
    }

    async extractAvailability(content) {
      var AVAILABLE_TERMS, UNAVAILABLE_TERMS, available, availableData, branchHash, count, countAvailableItems, expectedBranch, me, obj, result, summaryByLocation;
      boundMethodCheck(this, PolarisDOMOperations);
      obj = (await this.parser(content));
      AVAILABLE_TERMS = ["In", "On shelf", "Shelf", "Shelving", "Not Checked Out", "Available", "Checked In"];
      UNAVAILABLE_TERMS = ["In-Process", "In-Transit", "Hold Shelf"];
      countAvailableItems = function(el) {
        var len, len1, n, o, sum, term;
        sum = 0;
        for (n = 0, len = AVAILABLE_TERMS.length; n < len; n++) {
          term = AVAILABLE_TERMS[n];
          sum += findAllMatchingNodes(el, `td.piece:contains('${term}')`).length;
        }
        for (o = 0, len1 = UNAVAILABLE_TERMS.length; o < len1; o++) {
          term = UNAVAILABLE_TERMS[o];
          sum -= findAllMatchingNodes(el, `td.piece:contains('${term}')`).length;
        }
        if (sum < 0) {
          sum = 0;
        }
        return sum;
      };
      available = count = 0;
      branchHash = {};
      me = this;
      result = {
        estimated: false
      };
      availableData = /([0-9]+) of ([0-9]+) available/;
      summaryByLocation = Array.from(obj.querySelectorAll("tr.location")).reduce(function(acc, location) {
        var availability, branch;
        branch = textFromElement(location.querySelector("a.group"));
        availability = Array.from(location.querySelectorAll(".resultsdate")).reduce(function(availability_acc, hs_el) {
          var match;
          match = availableData.exec(textFromElement(hs_el));
          if (match) {
            availability_acc.available += parseInt(match[1]);
            availability_acc.count += parseInt(match[2]);
          }
          return availability_acc;
        }, {
          available: 0,
          count: 0,
          branch: branch
        });
        acc[txtLower(branch)] = availability;
        return acc;
      }, {});
      expectedBranch = me.defaults.limitBranches || me.libraryName;
      if (expectedBranch != null) {
        expectedBranch = expectedBranch.toLowerCase();
      }
      if (expectedBranch && summaryByLocation[expectedBranch]) {
        return Object.assign({}, result, summaryByLocation[expectedBranch]);
      }
      count = Array.from(obj.querySelectorAll("td.piecefront")).length;
      available = countAvailableItems(obj);
      return {
        estimated: false,
        count: count,
        available: available,
        branches: hashToList(branchHash)
      };
    }

  };

  registerDOMOperations(PolarisDOMOperations, "polaris");

  // END src/catalogs/dom/polaris.coffee
  register(PolarisLibrary, "polaris", null, PolarisDOMOperations);

  // END src/catalogs/polaris.coffee
  // BEGIN src/catalogs/sirsidynix.coffee
  SirsiDynixCatalog = class SirsiDynixCatalog extends Catalog {
    constructor(name, state, country, id, url, catalogUrl, params, categories) {
      var defaults;
      defaults = {
        "APPLICATION_EXTENSION": "",
        "post_only": false,
        "USER_ID": "WEBSERVER",
        "PASSWORD": null,
        "LIMIT_BRANCH": null
      };
      categories = ["book", "audiobook", "music"];
      super(name, state, country, id, url, catalogUrl, defaults, params, categories);
      this.getCatalogUrl = this.getCatalogUrl.bind(this);
      this.buildSearchUrl = this.buildSearchUrl.bind(this);
      this.getDetailUrl = this.getDetailUrl.bind(this);
      this.buildInventoryLookupUrl = this.buildInventoryLookupUrl.bind(this);
      this.parseSearchResults = this.parseSearchResults.bind(this);
      this.parseInventoryLookup = this.parseInventoryLookup.bind(this);
      this.version = "583a5b066b05d8442d31a59962ef95d3";
      this.searchPath = "/0/5?";
      this.lookupPath = "/0/57/5/3?";
      this.postOnly = false;
      this.searchParams = {
        "search_entries1": "TI",
        "user_id": this.defaults["USER_ID"],
        "password": this.defaults["PASSWORD"]
      };
      this.params = params;
      if (this.params != null) {
        if ("SEARCH_PATH" in this.params) {
          this.searchPath = this.params["SEARCH_PATH"];
          if (this.searchPath[this.searchPath.length - 1] !== "?") {
            this.searchPath = this.searchPath + "?";
          }
        }
        if ("SEARCH_HEADERS" in this.params) {
          this.searchParams = this.params["SEARCH_HEADERS"];
        }
      }
      this.baseUrl = urlutils.concat(catalogUrl, `uhtbin/cgisirsi${this.defaults.APPLICATION_EXTENSION}/x/0`);
      this.searchUrl = urlutils.concat(this.baseUrl, this.searchPath);
      this.detailUrl = urlutils.concat(this.baseUrl, this.lookupPath);
      this.http = {
        common: {
          xfrm: "html"
        }
      };
      this.domOperations = this.getDomOperations();
      this.searchUri = "";
    }

    getCatalogUrl() {
      boundMethodCheck(this, SirsiDynixCatalog);
      return urlutils.concat(this.catalogUrl, "/");
    }

    buildSearchUrl(searchBy, searchTerm, request) {
      var i, params, qs;
      boundMethodCheck(this, SirsiDynixCatalog);
      params = {
        "searchdata1": searchTerm
      };
      if (searchBy === "title" && this.searchParams !== {}) {
        for (i in this.searchParams) {
          if (this.searchParams[i] != null) {
            params[i] = this.searchParams[i];
          }
        }
      } else {
        params["user_id"] = this.searchParams["user_id"];
      }
      qs = toQueryString(params);
      this.searchUri = `${this.searchUrl}${qs}`;
      return {
        by: searchBy,
        url: this.searchUri
      };
    }

    getDetailUrl(id) {
      var params;
      boundMethodCheck(this, SirsiDynixCatalog);
      if (this.postOnly) {
        return this.searchUri;
      }
      params = {
        "searchfield1": "GENERAL^SUBJECT^GENERAL^^",
        "user_id": this.defaults['USER_ID'],
        "searchdata1": `${id}{CKEY}`
      };
      if ("password" in this.searchParams && this.searchParams["password"] !== null) {
        params["password"] = this.searchParams["password"];
      }
      params = toQueryString(params);
      return `${this.detailUrl}${params}`;
    }

    buildInventoryLookupUrl(request, item) {
      boundMethodCheck(this, SirsiDynixCatalog);
      if (request["found"] === true) {
        return null;
      }
      if (this.postOnly) {
        return {
          url: `${this.catalogUrl}${this.resultsUri}`,
          body: `first_hit=1&last_hit=10&form_type=&${encodeURIComponent(item.id)}=Details`
        };
      } else {
        return {
          url: this.getDetailUrl(item.id)
        };
      }
    }

    async parseSearchResults(response, request) {
      boundMethodCheck(this, SirsiDynixCatalog);
      return (await this.domOperations.extractSearchResults(response));
    }

    async parseInventoryLookup(response) {
      boundMethodCheck(this, SirsiDynixCatalog);
      return (await this.domOperations.extractAvailability(response));
    }

  };

  // BEGIN src/catalogs/dom/sirsidynix.coffee
  SirsiDynixDOMOperations = class SirsiDynixDOMOperations extends DOMOperations {
    constructor() {
      super(...arguments);
      this.extractSearchResults = this.extractSearchResults.bind(this);
      this.extractAvailability = this.extractAvailability.bind(this);
    }

    async extractSearchResults(content) {
      var authors, bestMatch, binding_re, bookId, bookIds, ckeys, ckeys_re, counter, defaultBookId, endpoint, extractBiblioFromText, iconType, iconTypes, icons, keepRemoveButton, len, match, matches, n, obj, putremove_re, raw, reBookIds, resp, result, results, rows, skipRows, titles, updateFromBibInfo, url_re;
      boundMethodCheck(this, SirsiDynixDOMOperations);
      obj = (await this.parser(content));
      raw = obj.documentElement.innerHTML;
      results = [];
      obj["found"] = false;
      extractBiblioFromText = function(text, result_obj) {
        var author, row, rows, rv;
        rows = text.split(/\s\s+/);
        rows = (function() {
          var len, n, results1;
          results1 = [];
          for (n = 0, len = rows.length; n < len; n++) {
            row = rows[n];
            if (row.trim().length > 0) {
              results1.push(row.trim());
            }
          }
          return results1;
        })();
        if (rows.length < 2) {
          return;
        }
        rv = rows.shift();
        if (rv) {
          result_obj = Object.assign(result_obj, {
            title: rv
          });
        }
        if (/\w+ edition/.exec(rows[0].toLowerCase())) {
          rows.shift();
        }
        author = result_obj.author || normalizeAuthor(rows.shift());
        if (author) {
          return result_obj.author = author;
        }
      };
      updateFromBibInfo = function(result_obj) {
        result_obj = Object.assign(result_obj, {
          title: textFromElement(obj.querySelector("#detail_item_information dd.title"))
        });
        result_obj.author = normalizeAuthor(obj.querySelector("#detail_item_information dd.author"));
        return extractBiblioFromText(textFromElement(obj.querySelector(".bibinfo")), result_obj);
      };
      matches = /permalink.*searchdata1=([0-9]*){CKEY}/.exec(raw);
      if (matches != null) {
        obj["found"] = true;
        result = {
          id: matches[1]
        };
        updateFromBibInfo(result);
        results.push(result);
        return results;
      }
      ckeys = [];
      authors = [];
      titles = [];
      matches = [];
      ckeys_re = /keep_ckeys_array.push\(['"]([0-9]+)['"]\)/g;
      match = ckeys_re.exec(raw);
      if (match !== null) {
        counter = 0;
        rows = [];
        obj.querySelectorAll("tr").forEach(function(row) {
          if (row.textContent.trim()) {
            return rows.push(row);
          }
        });
        while (match !== null) {
          counter += 1;
          result = {
            id: match[1]
          };
          skipRows = -1;
          rows.forEach(function(row) {
            if (row.querySelector("td.header")) {
              return;
            }
            if (row.querySelector("form[name=hitlist]")) {
              return;
            }
            if (row.querySelector(`input[id=VIEW${counter}]`)) {
              skipRows = 1;
            } else {
              skipRows -= 1;
            }
            if (row && skipRows === 0) {
              extractBiblioFromText(row.textContent, result);
              return false;
            }
          });
          matches.push(result);
          match = ckeys_re.exec(raw);
        }
      }
      if (matches.length === 0) {
        putremove_re = /put_keepremove_button\(['"]([0-9]+)['"]/g;
        match = putremove_re.exec(raw);
        while (match !== null) {
          result = {
            id: match[1]
          };
          updateFromBibInfo(result);
          matches.push(result);
          match = ckeys_re.exec(raw);
        }
      }
      binding_re = /\[(.*?)\]/;
      obj.querySelectorAll("dd.title a").forEach(function(elem, idx) {
        var binding, title;
        if (idx < matches.length) {
          title = elem.textContent;
          matches[idx]["title"] = normalizeTitle(title);
          binding = binding_re.exec(title);
          if (binding) {
            return matches[idx]["binding"] = binding[1];
          }
        }
      });
      obj.querySelectorAll("dd.author").forEach(function(elem, idx) {
        if (idx < matches.length) {
          return matches[idx]["author"] = normalizeAuthor(elem.textContent);
        }
      });
      if (matches.length > 0) {
        return matches;
      }
      if (this.defaults["post_only"]) {
        endpoint = obj.querySelector("#hitlist, [name*=\"item_view\"]");
        if (endpoint != null) {
          this.resultsUri = endpoint.getAttribute("action");
        }
        results = Array.from(endpoint.querySelectorAll(".hit_list_item_info")).map(function(item) {
          return {
            title: normalizeTitle(item.querySelector("dd.title")),
            author: normalizeAuthor(item.querySelector("dd.author")),
            id: /(VIEW\d+)/.exec(item.querySelector("dd.title a").getAttribute('onclick').toString())[0]
          };
        });
        if (results.length > 0) {
          return results;
        }
        bestMatch = 0;
        obj.querySelectorAll(".hit_list_item_icon").forEach(function(elem, idx) {
          var iconType;
          iconType = elem.querySelector("img").getAttribute("title").trim();
          if (iconType === "BOOK" || iconType === "BOOK1") {
            bestMatch = idx + 1;
            return false;
          }
        });
        if (bestMatch !== 0) {
          this.setData(obj, endpoint);
          results.push({
            id: `VIEW^${bestMatch}`
          });
          return results;
        }
        return [];
      }
      reBookIds = /keep_ckeys_array.push\(['"]([0-9]*)['"]\);/g;
      bookId = reBookIds.exec(raw);
      if (bookId != null) {
        bookIds = [bookId[1]];
        while ((bookId = reBookIds.exec(raw))) {
          bookIds.push(bookId[1]);
        }
        defaultBookId = bookIds[0];
        icons = obj.querySelectorAll(".hit_list_item_icon");
        iconTypes = icons.map(function(el) {
          return el.querySelector("img").getAttribute("title");
        });
        for (n = 0, len = iconTypes.length; n < len; n++) {
          iconType = iconTypes[n];
          if (iconType === "BOOK" || iconType === "BOOK1") {
            defaultBookId = bookIds[0];
            break;
          }
          bookIds.shift();
        }
        result = {
          id: defaultBookId
        };
        updateFromBibInfo(result);
        results.push(result);
        return results;
      }
      matches = /CreateBookmarkLink.*searchdata1=([0-9]*){CKEY}/.exec(raw);
      if (matches != null) {
        result = {
          id: matches[1]
        };
        updateFromBibInfo(result);
        results.push(result);
        return results;
      }
      keepRemoveButton = /put_keepremove_button\(['"]([0-9]*)['"],/g;
      bookId = keepRemoveButton.exec(raw);
      if (bookId != null) {
        result = {
          id: bookId[1]
        };
        updateFromBibInfo(result);
        results.push(result);
        return results;
      }
      resp = obj.querySelector(".hit_list_row");
      if (resp) {
        url_re = /uhtbin\/cgisirsi.*\/.*\/[0-9]+\/[0-9]+\/([0-9]+)/g;
        bookId = url_re.exec(resp.querySelector("a").getAttribute("href"));
        if (bookId != null) {
          result = {
            id: bookId[1]
          };
          updateFromBibInfo(result);
          results.push(result);
          return results;
        }
      }
      return results;
    }

    async extractAvailability(content) {
      var AVAILABLE_STATUS, UNAVAILABLE_STATUS, availabilityFromCopyInfo, branchHash, branchName, copyInfo, countUnits, countUnitsFromBody, data, foundAnyLibrary, holdings, matches, me, obj, tableTargets;
      boundMethodCheck(this, SirsiDynixDOMOperations);
      obj = (await this.parser(content));
      UNAVAILABLE_STATUS = [
        "DUE",
        "BEING", // ACQUIRED|HELD|TRANSFERRED
        "TRANSIT", // IN|
        "OUT", // ITEM IS CHECKED|CHARGED|CHECKED
        "HOLD",
        "ON HOLD",
        "MATERIAL HAS BEEN CHECKED"
      ];
      AVAILABLE_STATUS = [
        "CHECKED IN",
        "NOT CHECKED",
        "STACKS",
        "LARGE PRINT",
        "ADULT FICTION",
        "ADULT",
        "COLLECTION",
        "SUR LES RAYONS" // Haskell, VT - shared with QC, content in Fr
      ];
      data = {
        estimated: false,
        count: -1,
        available: void 0,
        branches: []
      };
      copyInfo = obj.querySelector(".copy_info");
      availabilityFromCopyInfo = false;
      if (copyInfo) {
        matches = /(.*) cop(?:y|ies) (?:currently )?available/.exec(copyInfo.textContent) || /(.*) exemplaires disponibles/.exec(copyInfo.textContent);
        if (matches) {
          availabilityFromCopyInfo = true;
          data = Object.assign({}, data, {
            count: -1,
            available: 0
          });
          if (matches[1].trim().toLowerCase() !== "no") {
            data.available = parseInt(matches[1].trim());
          }
        }
      }
      tableTargets = ["[name=holdings] + table tr", "#display_holdings_table tr"];
      holdings = findAllMatchingNodes(obj, tableTargets);
      if (holdings.length === 0) {
        return data;
      }
      foundAnyLibrary = false;
      branchHash = {};
      branchName = null;
      me = this;
      countUnitsFromBody = function(body) {
        return parseInt(body) || 1;
      };
      countUnits = countUnitsFromBody;
      holdings.forEach(function(el, idx) {
        var cols, copyText, exc, exc2, status, txt;
        try {
          cols = findAllMatchingNodes(el, ["th", ".holdingsheader2", ".holdingsheader"]);
          if (cols.length > 0) {
            txt = cols[0].textContent.trim();
            if (txt.length > 0) {
              if (txt === "Call Number") {
                return;
              }
              branchName = txt;
              if (me.defaults["LIMIT_BRANCH"] != null) {
                if (branchName.indexOf(me.defaults["LIMIT_BRANCH"]) < 0) {
                  branchName = null;
                }
              }
              logger.debug(`Starting to look at branch ${branchName}`);
            }
          } else {
            if (branchName === "" || branchName === null) {
              return;
            }
            cols = el.querySelectorAll("td");
            try {
              copyText = cols[1].textContent.trim();
              if (copyText.indexOf("Note") >= 0) {
                return;
              }
              if (copyText !== "NONE") {
                if (data.count < 0) {
                  data.count = 0;
                }
                data.count += countUnits(copyText);
                if (!availabilityFromCopyInfo) {
                  status = cols[3].textContent.trim() + cols[2].textContent.trim();
                  if (!anyBeginsWith(UNAVAILABLE_STATUS, status, AVAILABLE_STATUS)) {
                    data.available = (data.available || 0) + countUnits(cols[1].textContent);
                    branchHash[branchName] = 1;
                  }
                }
              }
            } catch (error1) {
              exc2 = error1;
              logger.exception("SirsiDynixLibrary:parseInventoryLookup", exc2);
            }
          }
        } catch (error1) {
          exc = error1;
          logger.exception("SirsiDynixLibrary:parseInventoryLookup", exc);
        }
      });
      data = Object.assign(data, {
        estimated: false,
        branches: hashToList(branchHash)
      });
      return data;
    }

  };

  registerDOMOperations(SirsiDynixDOMOperations, "sirsidynix");

  // END src/catalogs/dom/sirsidynix.coffee
  register(SirsiDynixCatalog, "sirsidynix", null, SirsiDynixDOMOperations);

  // END src/catalogs/sirsidynix.coffee
  // BEGIN src/catalogs/sirsidynixv2.coffee
  SirsiDynixV2Catalog = class SirsiDynixV2Catalog extends Catalog {
    constructor(name, state, country, id, url, catalogUrl, params, categories) {
      var defaults, me;
      defaults = {
        "CLIENT": "default",
        "CATALOG": "CATALOG/",
        "LIBRARY_FILTER": null,
        "LOCALE": "en_US",
        "VERSION": "0",
        "IGNORE_FORMAT": false,
        "SUPPORTED_ENT_VERSIONS": Array("4.3", "4.5", "5.0.0.4", "5.0.1"),
        "COMPOSE_DETAILMODAL_URL": false
      };
      super(name, state, country, id, url, catalogUrl, defaults, params, categories);
      this.getCatalogUrl = this.getCatalogUrl.bind(this);
      this.identifyVersion = this.identifyVersion.bind(this);
      this.newSession = this.newSession.bind(this);
      this.buildSearchUrl = this.buildSearchUrl.bind(this);
      this.parseSearchResults = this.parseSearchResults.bind(this);
      this._getEncodedIdentifier = this._getEncodedIdentifier.bind(this);
      this.getDetailPageUrl = this.getDetailPageUrl.bind(this);
      this.parseInventoryLookup = this.parseInventoryLookup.bind(this);
      this.version = "dd34534d7351ee109e59fd41800d31ff";
      if (this.defaults["CLIENT"] !== "" && this.defaults["CLIENT"].indexOf("/") < 0) {
        this.defaults["CLIENT"] = `${this.defaults["CLIENT"]}/`;
        this.defaults["CATALOG"] = this.defaults["CLIENT"].toUpperCase();
      }
      this.searchTermTranslate = function(term) {
        var i, len, n, newTerm, ref;
        newTerm = [];
        ref = term.split("");
        for (n = 0, len = ref.length; n < len; n++) {
          i = ref[n];
          if (/[0-9a-zA-Z ]/.test(i)) {
            newTerm.push(i);
          }
        }
        return encodeURIComponent(newTerm.join(""));
      };
      this.searchUrl = urlutils.concat(this.catalogUrl, `/client/rss/hitlist/${this.defaults['CLIENT']}rw=0&pv=-1&ic=false&dt=list&q=`);
      this.inventoryAvailabilityUrl = urlutils.concat(this.catalogUrl, `/client/${this.defaults['CLIENT']}search/results.displaypanel.displaycell.detail.detailitemstable:loadAvailability/${this.defaults['LOCALE']}/Unknown/`);
      this.inventoryLookupUrl = urlutils.concat(this.catalogUrl, `/client/${this.defaults['CLIENT']}search/results.displaypanel.displaycell:detailClick/catalog/`);
      this.detailUrlId = "";
      this.initializeUrl = urlutils.concat(this.catalogUrl, `/client/${this.defaults.LOCALE}/${this.defaults.CLIENT}`);
      this.detailUrl = urlutils.concat(this.initializeUrl, "/search/detailNonModal/");
      this.http = {
        common: {
          xfrm: "json,html",
          headers: [["X-Requested-With", "XMLHttpRequest"]]
        }
      };
      this.domOperations = this.getDomOperations();
      me = this;
      this.availabilitySearchConditions = [
        {
          condition: function(res,
        depth) {
            return depth === 0;
          },
          urlBuilder: function(re_res,
        res,
        req,
        item) {
            if (me.buildInventoryLookupUrl != null) {
              return me.buildInventoryLookupUrl(req,
        item);
            }
          }
        },
        {
          condition: function(res) {
            return RegExp("AjaxHandler\\(null, \"(.*?)\",.*handleDetailAvailabilityLoad").exec(res);
          },
          urlBuilder: function(res) {
            return Object.assign({},
        {
              url: res[1]
            },
        me.http.common);
          }
        },
        {
          condition: function(res) {
            return me.defaults.LIBRARY_FILTER && RegExp("url: '(.*ajax:lookuptitleinfo.*)\\?").exec(res);
          },
          urlBuilder: function(res) {
            return Object.assign({},
        {
              url: urlutils.concat(me.catalogUrl,
        res[1])
            },
        me.http.common);
          }
        },
        {
          condition: function(res) {
            return RegExp("url: '(.*ajax:lookupavailability.*)(\\?.*)'").exec(res);
          },
          urlBuilder: function(res) {
            var body,
        csrf,
        headers,
        q;
            q = new URLSearchParams(res[2]);
            headers = [["X-Requested-With",
        "XMLHttpRequest"]];
            csrf = q.get("sdcsrf");
            if (csrf) {
              headers.push(["sdcsrf",
        csrf]);
              body = "";
            }
            return {
              url: urlutils.concat(me.catalogUrl,
        res[1]),
              body: body,
              headers: headers,
              xfrm: "json,html"
            };
          }
        },
        {
          condition: function(res) {
            return RegExp("url='(.*detailavailabilityaccordions.*)(\\?.*)'").exec(res);
          },
          urlBuilder: function(res) {
            var body,
        csrf,
        headers,
        q;
            q = new URLSearchParams(res[2]);
            headers = [["X-Requested-With",
        "XMLHttpRequest"]];
            csrf = q.get("sdcsrf");
            if (csrf) {
              headers.push(["sdcsrf",
        csrf]);
              body = "";
            }
            return {
              url: res[1],
              body: body,
              headers: headers,
              xfrm: "json,html"
            };
          }
        }
      ];
    }

    getCatalogUrl() {
      boundMethodCheck(this, SirsiDynixV2Catalog);
      return this.initializeUrl;
    }

    identifyVersion(resp) {
      var me, version;
      boundMethodCheck(this, SirsiDynixV2Catalog);
      me = this;
      version = /(Enterprise|Portfolio) Version ([\d\.]+)/.exec(resp.body);
      if (version != null) {
        logger.debug(`SirsiDynix ${version[1]} Version: ${version[2]}`);
        me.defaults.VERSION = version[2];
      }
      if (me.defaults.VERSION === "4.5" || me.defaults.VERSION === "5.0.0.4") {
        me.searchUrl = urlutils.concat(me.catalogUrl, `/client/rss/hitlist/${me.defaults.CLIENT}qu=`);
        return me.defaults.skipSearchBy = true;
      }
    }

    async newSession() {
      var me, opts, resp;
      boundMethodCheck(this, SirsiDynixV2Catalog);
      me = this;
      opts = {
        url: me.initializeUrl
      };
      resp = (await me.httpRequest(opts));
      me.identifyVersion(resp);
      return me.session.expiry = me.getNewSessionTimeout();
    }

    buildSearchUrl(searchBy, searchTerm, request) {
      var format, index;
      boundMethodCheck(this, SirsiDynixV2Catalog);
      index = "";
      format = "";
      if (!this.defaults.skipSearchBy) {
        if (searchBy === "isbn" || searchBy === "isbn13") {
          index = "&rt=ISBN%7C%7C%7CISBN%7C%7C%7Cfalse";
        } else {
          index = "&rt=false%7C%7C%7CTITLE%7C%7C%7CTitle";
        }
      }
      if (request.category === "book" && !this.defaults["IGNORE_FORMAT"]) {
        format = "&qf=FORMAT%09Format%09BOOK%09Books";
      }
      searchTerm = this.searchTermTranslate(searchTerm);
      this.searchUri = `${this.searchUrl}${searchTerm}${index}${format}`;
      return {
        by: searchBy,
        url: this.searchUri,
        xfrm: "html"
      };
    }

    async parseSearchResults(response, request, raw) {
      boundMethodCheck(this, SirsiDynixV2Catalog);
      return (await this.domOperations.extractSearchResults(response));
    }

    _getEncodedSlash(text) {
      return text.replace(/\//g, '$002f');
    }

    _getEncodedIdentifier(request) {
      boundMethodCheck(this, SirsiDynixV2Catalog);
      return this._getEncodedSlash(this.getLibraryResult(request)["id"]);
    }

    getDetailPageUrl(id) {
      var base;
      boundMethodCheck(this, SirsiDynixV2Catalog);
      base = id;
      if (/^[0-9]+$/.exec(base)) {
        base = `ent://SD_ILS/0/SD_ILS:${id}`;
      }
      base = this._getEncodedSlash(base);
      base = base.replace("0/ent:", "ent:");
      return `${this.detailUrl}${base}/one`;
    }

    buildInventoryLookupUrl(request, item) {
      return {
        url: item.url
      };
    }

    async parseInventoryLookup(response, request) {
      boundMethodCheck(this, SirsiDynixV2Catalog);
      return (await this.domOperations.extractAvailability(response));
    }

  };

  // BEGIN src/catalogs/dom/sirsidynixenterprise.coffee
  SirsiDynixEnterpriseDOMOperations = class SirsiDynixEnterpriseDOMOperations extends DOMOperations {
    constructor() {
      super(...arguments);
      this._parseInventoryLookupFromJson = this._parseInventoryLookupFromJson.bind(this);
    }

    cleanupTitle(title) {
      var key;
      key = "first title value, for searching";
      if (title.toLowerCase().startsWith(key)) {
        title = title.substring(key.length);
      }
      return title.toLowerCase();
    }

    _getEncodedSlash(text) {
      return text.replace(/\//g, '$002f');
    }

    async extractSearchResults(content) {
      var entries, extractContentFn, me, obj, results;
      me = this;
      obj = (await this.parser(content));
      entries = Array.from(obj.querySelectorAll("entry"));
      extractContentFn = function(acc, row) {
        var details, done, key, value;
        done = function(v) {
          return Object.assign(acc, v);
        };
        row = row.toLowerCase();
        details = row.split("&#160;", 2);
        if (details.length < 2) {
          details = row.split(":");
        }
        details = details.map(function(d) {
          return d.trim().replace(/(?:.*&#160;)?(.*?)/, "$1");
        });
        key = details.shift();
        if (isBinding(key)) {
          return done({
            binding: commonBindingMappings(key)
          });
        }
        if (details.length === 0 && acc.title === "") {
          return done({
            title: normalizeTitle(key)
          });
        }
        value = details.shift();
        if (/^(title )?format/.exec(key)) {
          return done({
            binding: commonBindingMappings(value)
          });
        }
        if (/^title\.?/.exec(key)) {
          return done({
            title: normalizeTitle(value)
          });
        }
        if (key === "by" || key.indexOf("author") >= 0) {
          return done({
            author: normalizeAuthor(value)
          });
        }
        return acc;
      };
      results = entries.reduce(function(acc, entry) {
        var format_as_title, id_, result, row, url;
        url = entry.querySelector("link");
        id_ = textFromElement(entry.querySelector("id"));
        if (url) {
          if (me.defaults.COMPOSE_DETAILMODAL_URL) {
            url = urlutils.concat(me.detailUrl, me._getEncodedSlash(id_));
            url = urlutils.concat(result.url, "/one");
          } else {
            url = url.getAttribute("href");
            url = url && url.replace(/amp;/g, "");
          }
        }
        if (!url) {
          return acc;
        }
        result = {
          id: id_,
          title: normalizeTitle(me.cleanupTitle(textFromElement(entry.querySelector("title")))),
          url: url
        };
        content = textFromElement(entry.querySelector("content"));
        content = content.split("<br/>");
        if (isBinding(result.title)) {
          result.binding = commonBindingMappings(result.title);
          result.title = "";
        }
        format_as_title = /format:? (\w+)/.exec(result.title);
        if (format_as_title) {
          content.push("format: " + format_as_title[1]);
          content[0] = "title: " + content[0];
        }
        row = content.reduce(extractContentFn, result);
        acc.push(row);
        return acc;
      }, []);
      return results;
    }

    _parseInventoryLookupFromJson(response) {
      var copyCount_re, counterWithFilter, data, getIfNumber, totalAvailable_re;
      boundMethodCheck(this, SirsiDynixEnterpriseDOMOperations);
      if (response.inits) {
        totalAvailable_re = /[\\]?"(available|total)Count[\\]?"\s*:\s*[\\]?"(\d+)[\\]?"/g;
        copyCount_re = /[\\]?"copyCount[\\]?"\s*:\s*[\\]?"(\d+)[\\]?"/g;
        response = JSON.parse(/({.*})/.exec(response.inits[0].evalScript[0])[0]);
      }
      getIfNumber = function(field) {
        var r;
        r = parseInt(field);
        if (r !== "NaN") {
          return r;
        }
        return null;
      };
      if ("copyCount" in response) {
        data = {
          "estimated": false,
          "count": getIfNumber(response.copyCount),
          "available": getIfNumber(response.availableCount),
          "branches": []
        };
        return data;
      }
      if (response.childRecords) {
        counterWithFilter = function(filter, excludeKeyword) {
          return function(acc, value) {
            if (filter && value.LIBRARY.indexOf(filter) < 0) {
              return acc;
            }
            if (excludeKeyword && value.SD_ITEM_STATUS && value.SD_ITEM_STATUS.indexOf(excludeKeyword) >= 0) {
              return acc;
            }
            return acc + 1;
          };
        };
        data = {
          estimated: false,
          count: response.childRecords.reduce(counterWithFilter(this.defaults.LIBRARY_FILTER), 0),
          available: response.childRecords.reduce(counterWithFilter(this.defaults.LIBRARY_FILTER, "Due"), 0),
          branches: []
        };
        return data;
      }
      return null;
    }

    async extractAvailability(content) {
      var available, branchHash, count, data, exceptions, obj;
      available = 0;
      count = 0;
      branchHash = {};
      obj = (await this.parser(content));
      if (obj.inits || obj.childRecords || "copyCount" in obj) {
        data = this._parseInventoryLookupFromJson(obj);
        if (data !== null) {
          return data;
        }
      }
      if (raw.indexOf("Error Summary") >= 0) {
        data = {
          unknown: true
        };
        return data;
      }
      exceptions = /due |process|cataloged|technical|storage|acquired|order|(Available soon)/gi;
      data = Array.from(obj.querySelectorAll(".detailItemsTableRow")).reduce(function(acc, el) {
        var location, status;
        location = el.querySelector(".detailItemsTable_LOCATION,.detailItemsTable_LIBRARY").textContent.trim().toLowerCase();
        status = el.querySelector(".detailItemsTable_SD_ITEM_STATUS").textContent.trim().toLowerCase();
        acc.count += 1;
        if (location === status && !exceptions.test(location)) {
          acc.available += 1;
          if (acc.branches.indexOf(location) < 0) {
            acc.branches = acc.branches.concat([location]);
          }
        }
        return acc;
      }, data);
      return data;
    }

  };

  registerDOMOperations(SirsiDynixEnterpriseDOMOperations, "sirsidynix2");

  // END src/catalogs/dom/sirsidynixenterprise.coffee
  register(SirsiDynixV2Catalog, "sirsidynix2", null, SirsiDynixEnterpriseDOMOperations);

  // END src/catalogs/sirsidynixv2.coffee
  // BEGIN src/catalogs/spydus.coffee
  SpydusLibrary = class SpydusLibrary extends Catalog {
    constructor(name, state, country, id, url, catalogUrl, params, categories) {
      var defaults;
      defaults = {
        OPAC: "OPAC",
        InventoryViaXHLD: false,
        DETAIL_PATH: "FULL"
      };
      super(name, state, country, id, url, catalogUrl, defaults, params, categories);
      this.newSession = this.newSession.bind(this);
      this.buildSearchUrl = this.buildSearchUrl.bind(this);
      this.parseSearchResults = this.parseSearchResults.bind(this);
      this.buildInventoryLookupUrl = this.buildInventoryLookupUrl.bind(this);
      this.version = "94b44f990bc088165e902610e84d8f23";
      this.searchUrl = fromTemplate(urlutils.concat(this.catalogUrl, "/cgi-bin/spydus.exe/ENQ/<%= OPAC %>/BIBENQ?<%= qs %>"));
      this.detailUrl = fromTemplate(urlutils.concat(this.catalogUrl, "/cgi-bin/spydus.exe/ENQ/<%= OPAC %>/BIBENQ?BRN<%= id %>"));
      this.http = {
        common: {
          xfrm: "html"
        }
      };
      this.defaults.catalogUrl = this.catalogUrl;
      this.domOperations = this.getDomOperations();
    }

    async newSession() {
      var me, opts, redirect, resp;
      boundMethodCheck(this, SpydusLibrary);
      me = this;
      opts = {
        url: me.getCatalogUrl()
      };
      resp = (await me.httpRequest(opts));
      redirect = /URL=.*\/MSGTRN\/(?<opac>.*?)\/HOME/.exec(resp.body);
      if (redirect) {
        me.defaults.OPAC = redirect.groups.opac;
      }
      return me.session.expiry = me.getNewSessionTimeout();
    }

    buildSearchUrl(searchBy, searchTerm, request) {
      var data, qs, searchKey;
      boundMethodCheck(this, SpydusLibrary);
      searchKey = {
        isbn: "SBN",
        isbn13: "SBN",
        title: "TI"
      }[searchBy];
      data = {
        ENTRY1_TYPE: "K",
        ENTRY1_NAME: searchKey,
        ENTRY1: searchTerm
      };
      qs = toQueryString(data);
      return {
        by: searchBy,
        url: this.searchUrl(Object.assign({
          qs: qs
        }, this.defaults))
      };
    }

    async parseSearchResults(response, request) {
      boundMethodCheck(this, SpydusLibrary);
      return (await this.domOperations.extractSearchResults(response));
    }

    buildInventoryLookupUrl(request, item) {
      boundMethodCheck(this, SpydusLibrary);
      return {
        url: this.detailUrl(Object.assign(this.defaults, {
          id: item.id,
          DETAIL_PATH: this.defaults.INVENTORY_FLAG
        }))
      };
    }

    async parseInventoryLookup(response, request) {
      return (await this.domOperations.extractAvailability(response));
    }

  };

  // BEGIN src/catalogs/dom/spydus.coffee
  SpydusDOMOperations = class SpydusDOMOperations extends DOMOperations {
    constructor() {
      super(...arguments);
      this._splitTitleAndAuthor = this._splitTitleAndAuthor.bind(this);
      this._findKeyInContentTable = this._findKeyInContentTable.bind(this);
      this._extractIdFromContentTable = this._extractIdFromContentTable.bind(this);
      this._extractTitleAndAuthorFromContentTable = this._extractTitleAndAuthorFromContentTable.bind(this);
      this._extractDetailUrlFromElement = this._extractDetailUrlFromElement.bind(this);
      this._setInventoryAvailabilityFlag = this._setInventoryAvailabilityFlag.bind(this);
      this.extractSearchResults = this.extractSearchResults.bind(this);
    }

    _extractIdFromMetaTag(doc) {
      var bookId, matches, metaTags, url;
      bookId = {};
      metaTags = doc.querySelector("meta[property=\"og:url\"]");
      if (metaTags) {
        url = metaTags.attributes["content"].value;
        matches = /BRN=(.*)/.exec(url);
        if (!!matches) {
          bookId["id"] = matches[1];
        }
      }
      return bookId;
    }

    _bindingFromTitle(title) {
      var bindingMap, rv;
      bindingMap = {
        "videorecording": "dvd",
        "dvd": "dvd",
        "electronic resource": "ebook"
      };
      rv = /\[(.*)\]/.exec(title);
      if (rv && bindingMap.hasOwnProperty(rv[1])) {
        return {
          binding: bindingMap[rv[1]]
        };
      }
      return {};
    }

    _splitTitleAndAuthor(titleAndAuthor) {
      var data, splitData;
      boundMethodCheck(this, SpydusDOMOperations);
      splitData = titleAndAuthor.split("/");
      data = {
        title: normalizeTitle(splitData[0]),
        author: normalizeAuthor(splitData[1])
      };
      data = Object.assign(data, this._bindingFromTitle(splitData[0]));
      return data;
    }

    _extractTitleAndAuthorFromMetaTag(doc) {
      var data, metaTags, titleAndAuthor;
      data = {};
      metaTags = doc.querySelector("meta[property=\"og:title\"]");
      if (metaTags) {
        titleAndAuthor = metaTags.attributes["content"].value;
        data = this._splitTitleAndAuthor(titleAndAuthor);
      }
      return data;
    }

    _findContentTable(doc) {
      var catalogDetails, content, contentBody, contentTableColumns;
      contentBody = doc.querySelector("div#content table");
      if (contentBody) {
        contentTableColumns = doc.querySelectorAll("td table");
        if (contentTableColumns.length !== 2) {
          return null;
        }
        catalogDetails = nodeListToArray(contentTableColumns[1].querySelectorAll("tr"));
        if (catalogDetails.length === 0) {
          return null;
        }
        content = {};
        catalogDetails.forEach(function(el) {
          var columns, data, key;
          columns = el.querySelectorAll("td");
          if (columns.length !== 3) {
            return;
          }
          key = textFromElement(columns[0]);
          key = key.substr(0, key.length - 1);
          data = textFromElement(columns[columns.length - 1]);
          return content[key] = data;
        });
        return content;
      }
      return null;
    }

    _findKeyInContentTable(doc, key) {
      var contentTable;
      boundMethodCheck(this, SpydusDOMOperations);
      contentTable = this._findContentTable(doc);
      if (!contentTable) {
        return null;
      }
      if (contentTable.hasOwnProperty(key)) {
        return contentTable[key];
      }
      return null;
    }

    _extractIdFromContentTable(doc) {
      var brn;
      boundMethodCheck(this, SpydusDOMOperations);
      brn = this._findKeyInContentTable(doc, "BRN");
      if (brn) {
        return {
          id: brn
        };
      }
      return {};
    }

    _extractTitleAndAuthorFromContentTable(doc, key) {
      var data, titleAndAuthor;
      boundMethodCheck(this, SpydusDOMOperations);
      data = {};
      titleAndAuthor = this._findKeyInContentTable(doc, key);
      if (!titleAndAuthor) {
        return data;
      }
      data = this._splitTitleAndAuthor(titleAndAuthor);
      return data;
    }

    _extractIdFromBookmark(doc) {
      var bookmark, brn_match, result, title, url;
      result = {};
      bookmark = doc.querySelector("a#bookmark_pre");
      if (bookmark) {
        url = bookmark.getAttribute("data-url");
        brn_match = /BRN=(.*)/.exec(url);
        if (brn_match) {
          title = normalizeTitle(bookmark.getAttribute("data-title"));
          result = {
            id: brn_match[1],
            title: title
          };
        }
      }
      return result;
    }

    _extractDetailUrlFromElement(el, id_) {
      var url;
      boundMethodCheck(this, SpydusDOMOperations);
      url = el.attributes["href"].value;
      if (url.indexOf("://") < 0) {
        url = urlutils.concat(this.defaults.catalogUrl, url);
      }
      return fromTemplate(url.replace(id_, "<%= id %>").replace('/FULL/', '/<%= DETAIL_PATH %>/'));
    }

    _setInventoryAvailabilityFlag(response) {
      boundMethodCheck(this, SpydusDOMOperations);
      if (this.defaults.InventoryViaXHLD || response.querySelector('a[href*=XHLD]')) {
        this.defaults.InventoryViaXHLD = true;
        return this.defaults.INVENTORY_FLAG = "XHLD";
      } else {
        return this.defaults.INVENTORY_FLAG = "FULL";
      }
    }

    async extractSearchResults(content) {
      var data, findAuthorTitleLink, getBindingIfOverdrive, inventoryData, me, multipleMatches, response, result, results;
      boundMethodCheck(this, SpydusDOMOperations);
      me = this;
      response = (await this.parser(content));
      results = [];
      this._setInventoryAvailabilityFlag(response);
      result = this._extractIdFromMetaTag(response);
      if (!result.hasOwnProperty("id")) {
        result = this._extractIdFromContentTable(response);
      }
      if (!result.hasOwnProperty("id")) {
        result = this._extractIdFromBookmark(response);
      }
      if (result.hasOwnProperty("id")) {
        if (!result.hasOwnProperty("title")) {
          data = this._extractTitleAndAuthorFromMetaTag(response);
          result = Object.assign({}, result, data);
        }
        if (!result.hasOwnProperty("title")) {
          data = this._extractTitleAndAuthorFromContentTable(response, "Main Title");
          result = Object.assign({}, result, data);
        }
        inventoryData = (await this.extractAvailability(response));
        result = Object.assign({}, result, {
          availability: inventoryData
        });
        results.push(result);
      }
      findAuthorTitleLink = function(e) {
        try {
          if (e.attributes["href"].value.indexOf("cgi-bin") >= 0) {
            return e;
          }
        } catch (error1) {
          return null;
        }
        return null;
      };
      multipleMatches = nodeListToArray(response.querySelectorAll("ul.briefRecords li"));
      getBindingIfOverdrive = function(el) {
        if (el.textContent.indexOf("overdrive") >= 0) {
          return {
            binding: "ebook"
          };
        }
        return {};
      };
      me = this;
      if (multipleMatches.length > 0) {
        multipleMatches.forEach(function(el) {
          var allLinks, columns, detailUrlNode, findDetailUrl, idElement, thisId, titleAndAuthor, titleAndAuthorValue;
          columns = el.querySelector("div.briefText td");
          idElement = el.querySelector("input");
          if (idElement === null) {
            return;
          }
          thisId = idElement.attributes["value"];
          if (!thisId) {
            return;
          }
          thisId = thisId.value;
          if (!thisId) {
            return;
          }
          allLinks = nodeListToArray(el.querySelectorAll("a"));
          if (allLinks === null) {
            return;
          }
          findDetailUrl = function(e) {
            try {
              if (e.attributes["href"].value.indexOf(thisId) >= 0) {
                return e;
              }
            } catch (error1) {
              return null;
            }
            return null;
          };
          detailUrlNode = allLinks.find(findDetailUrl);
          if (detailUrlNode) {
            me.detailUrl = me._extractDetailUrlFromElement(detailUrlNode, thisId);
          }
          titleAndAuthorValue = textFromElement(allLinks.find(findAuthorTitleLink));
          if (titleAndAuthorValue.length > 0) {
            titleAndAuthor = me._splitTitleAndAuthor(titleAndAuthorValue);
          }
          titleAndAuthor = Object.assign(titleAndAuthor, getBindingIfOverdrive(el));
          result = Object.assign({}, {
            id: thisId
          }, titleAndAuthor, {
            availability: me._extractInventoryStatus(el)
          });
          return results.push(result);
        });
      } else {
        multipleMatches = response.querySelectorAll("div.card,fieldset.card-list");
      }
      if (results.length === 0 && multipleMatches.length > 0) {
        multipleMatches.forEach(function(el) {
          var author, authorEl, binding, detailUrlNode, idElement, id_, opts, title;
          idElement = el.querySelector("input");
          if (idElement === null) {
            return;
          }
          id_ = idElement.attributes["value"];
          if (!id_) {
            return;
          }
          id_ = id_.value;
          title = normalizeTitle(el.querySelector(".card-title").textContent);
          authorEl = el.querySelector(".recdetails span");
          if (!authorEl) {
            return;
          }
          author = normalizeAuthor(authorEl.textContent);
          binding = el.querySelector(".recfrmt") && el.querySelector(".recfrmt").textContent;
          if (id_) {
            result = Object.assign({}, {
              id: id_,
              author: author,
              title: title,
              binding: binding
            });
            detailUrlNode = el.querySelector(".card-title a");
            if (detailUrlNode) {
              opts = Object.assign({}, me.defaults, {
                id: id_
              });
              result.url = me._extractDetailUrlFromElement(detailUrlNode, id_)(opts);
            }
            return results.push(result);
          }
        });
      } else {
        multipleMatches = nodeListToArray(response.querySelectorAll("table tr td"));
        if (multipleMatches.length > 0) {
          multipleMatches.forEach(function(el) {
            var allLinks, detailUrl, detailUrlNode, findDetailUrl, idAttribute, idElement, matchingId, opts, thisId, titleAndAuthor, titleAndAuthorValue;
            idElement = el.querySelector("a");
            if (idElement === null) {
              return;
            }
            idAttribute = idElement.attributes["name"];
            if (!idAttribute) {
              return;
            }
            thisId = idAttribute.value;
            detailUrl = null;
            findDetailUrl = function(e) {
              try {
                if (e.attributes["href"].value.indexOf(thisId) >= 0) {
                  return e;
                }
              } catch (error1) {
                return null;
              }
              return null;
            };
            allLinks = nodeListToArray(el.querySelectorAll("a"));
            if (allLinks === null) {
              return;
            }
            titleAndAuthorValue = textFromElement(allLinks.find(findAuthorTitleLink));
            if (titleAndAuthorValue.length > 0) {
              titleAndAuthor = me._splitTitleAndAuthor(titleAndAuthorValue);
            }
            titleAndAuthor = Object.assign(titleAndAuthor, getBindingIfOverdrive(el));
            if (thisId) {
              matchingId = function(e) {
                return e.id === thisId;
              };
              if (!results.find(matchingId)) {
                result = Object.assign({}, {
                  id: thisId
                }, titleAndAuthor);
                detailUrlNode = allLinks.find(findDetailUrl);
                if (detailUrlNode) {
                  opts = Object.assign({}, me.defaults, {
                    id: thisId
                  });
                  result.url = me._extractDetailUrlFromElement(detailUrlNode, thisId)(opts);
                }
                return results.push(result);
              }
            }
          });
        }
      }
      return results;
    }

    _extractInventoryStatus(doc) {
      var AVAILABLE_STATUS, UNAVAILABLE_STATUS, available, count, data, holdings, root, rows;
      UNAVAILABLE_STATUS = ["On loan", "Onloan", "lost", "overdue", "Item unavailable", "missing"];
      AVAILABLE_STATUS = ["On shelf", "Available"];
      root = "div.holdings";
      if (this.defaults.InventoryViaXHLD) {
        root = "table";
      }
      holdings = doc.querySelector(root);
      data = {};
      if (!!holdings) {
        count = available = 0;
        rows = nodeListToArray(holdings.querySelectorAll("tr"));
        rows.forEach(function(el) {
          var availabilityData, status;
          availabilityData = el.querySelectorAll("td");
          if (availabilityData.length > 0) {
            count += 1;
            status = textFromElement(availabilityData[availabilityData.length - 1]);
            if (anyBeginsWith(AVAILABLE_STATUS, status, UNAVAILABLE_STATUS)) {
              return available += 1;
            }
          }
        });
        data["count"] = count;
        data["available"] = available;
      }
      return data;
    }

    async extractAvailability(content) {
      var obj;
      obj = (await this.parser(content));
      return this._extractInventoryStatus(obj);
    }

  };

  registerDOMOperations(SpydusDOMOperations, "spydus");

  // END src/catalogs/dom/spydus.coffee
  register(SpydusLibrary, "spydus", null, SpydusDOMOperations);

  // END src/catalogs/spydus.coffee
  // BEGIN src/catalogs/tinycat.coffee
  TinycatCatalog = class TinycatCatalog extends Catalog {
    constructor(name, state, country, id, url, catalogUrl, params, categories) {
      var defaults;
      defaults = {
        PATH: null
      };
      super(name, state, country, id, url, catalogUrl, defaults, params, categories);
      this.getCatalogUrl = this.getCatalogUrl.bind(this);
      this.buildSearchUrl = this.buildSearchUrl.bind(this);
      this.parseSearchResults = this.parseSearchResults.bind(this);
      this.version = "b843172b026cde24213fda759474774f";
      this.detailUrl = urlutils.concat(this.getCatalogUrl(), "item/##ID##");
      this.searchUrl = fromTemplate(urlutils.concat(this.getCatalogUrl(), "search/text/<%= param %>"));
      this.http = {
        common: {
          xfrm: "html"
        }
      };
      this.domOperations = this.getDomOperations();
    }

    getCatalogUrl() {
      boundMethodCheck(this, TinycatCatalog);
      return urlutils.concat(this.catalogUrl, `lib/${this.defaults.PATH}`);
    }

    buildSearchUrl(searchBy, searchTerm, request) {
      var idxLookup, searchParam;
      boundMethodCheck(this, TinycatCatalog);
      idxLookup = {
        "isbn": "isbn",
        "isbn13": "isbn",
        "title": "title"
      };
      searchParam = encodeURIComponent("( " + idxLookup[searchBy] + ": " + searchTerm + ") ");
      return {
        by: searchBy,
        url: this.searchUrl({
          param: searchParam
        })
      };
    }

    async parseSearchResults(response, request) {
      boundMethodCheck(this, TinycatCatalog);
      return (await this.domOperations.extractSearchResults(response));
    }

  };

  // BEGIN src/catalogs/dom/tinycat.coffee
  TinycatDOMOperations = class TinycatDOMOperations extends DOMOperations {
    constructor() {
      super(...arguments);
      this.extractSearchResults = this.extractSearchResults.bind(this);
    }

    async extractSearchResults(content) {
      var author, available, binding, formatMap, id_, obj, results, rows, title;
      boundMethodCheck(this, TinycatDOMOperations);
      obj = (await this.parser(content));
      results = [];
      formatMap = {
        "PAPERBACK": "book",
        "PAPER BACK": "book"
      };
      if (obj.querySelector("body").classList.contains("minipac_bib")) {
        id_ = /\/(\d+)$/.exec(obj.querySelector("head meta[property=\"og:url\"]").getAttribute("content"))[1];
        title = obj.querySelector(".title").textContent;
        author = normalizeAuthor(obj.querySelector(".author").textContent);
        binding = formatMap[obj.querySelector(".minipac_bibpage_mediatype").textContent.toUpperCase()] || "book";
        available = obj.querySelector(".minipac_holding_status.avail") && 1 || 0;
        results.push({
          title: title,
          author: author,
          binding: binding,
          id: id_,
          availability: {
            count: 1,
            available: available
          }
        });
      } else {
        rows = obj.querySelectorAll("#resultsbox .minipac_result");
        results = Array.from(rows).reduce(function(acc, row) {
          id_ = row.getAttribute("id").replace("mpr_", "");
          title = row.querySelector(".minipac_tad_t h2").textContent;
          author = normalizeAuthor(row.querySelector(".minipac_tad_a a").textContent);
          binding = formatMap[row.querySelector(".minipac_search_fmt").textContent.toUpperCase()] || "book";
          available = row.querySelector(".minipac_holding_status.avail") && 1 || 0;
          acc.push({
            title: title,
            author: author,
            binding: binding,
            id: id_,
            availability: {
              count: 1,
              available: available
            }
          });
          return acc;
        }, []);
      }
      return results;
    }

  };

  registerDOMOperations(TinycatDOMOperations, "tinycat");

  // END src/catalogs/dom/tinycat.coffee
  register(TinycatCatalog, "tinycat", null, TinycatDOMOperations);

  // END src/catalogs/tinycat.coffee
  // BEGIN src/catalogs/toronto.coffee
  TorontoPublicLibrary = class TorontoPublicLibrary extends Catalog {
    constructor(name, state, country, id, url, catalogUrl, params, categories) {
      var defaults;
      defaults = {
        SEARCH_URI: "/search.jsp",
        BY_TITLE: "Keyword_Anywhere",
        BY_ISBN: "ISBN%2FISSN_Search_Interface"
      };
      super(name, state, country, id, url, catalogUrl, defaults, params, categories);
      this.buildSearchUrl = this.buildSearchUrl.bind(this);
      this.buildInventoryLookupUrl = this.buildInventoryLookupUrl.bind(this);
      this.version = "82d55e6462b48d338a780bea081cdb48";
      this.searchUrl = fromTemplate(urlutils.concat(this.catalogUrl, defaults.SEARCH_URI + "?Ntk=<%= by %>&Ntt=<%= term|encodeuriplus %>"));
      this.detailUrl = fromTemplate(urlutils.concat(this.catalogUrl, "/detail.jsp?R=<%= id %>"));
      this.inventoryUrl = fromTemplate(urlutils.concat(this.catalogUrl, "/components/elem_bib-branch-holdings.jspf?numberCopies=1&itemId=<%= id|encodeuri %>"));
      this.http = {
        common: {
          xfrm: "html"
        }
      };
      this.domOperations = this.getDomOperations();
    }

    buildSearchUrl(searchBy, searchTerm, request) {
      var searchType;
      boundMethodCheck(this, TorontoPublicLibrary);
      if (searchBy === "title") {
        searchType = this.defaults.BY_TITLE;
      } else {
        searchType = this.defaults.BY_ISBN;
      }
      return {
        by: searchBy,
        url: this.searchUrl({
          by: searchType,
          term: searchTerm
        })
      };
    }

    buildInventoryLookupUrl(request, item) {
      boundMethodCheck(this, TorontoPublicLibrary);
      return {
        url: this.inventoryUrl(item)
      };
    }

    async parseSearchResults(response, request) {
      return (await this.domOperations.extractSearchResults(response));
    }

    async parseInventoryLookup(response) {
      return (await this.domOperations.extractAvailability(response));
    }

  };

  // BEGIN src/catalogs/dom/toronto.coffee
  TorontoPublicLibraryDOMOperations = class TorontoPublicLibraryDOMOperations extends DOMOperations {
    constructor() {
      super(...arguments);
      this.extractSearchResults = this.extractSearchResults.bind(this);
      this.extractAvailability = this.extractAvailability.bind(this);
    }

    async extractSearchResults(content) {
      var COVER_SELECTOR, extractId, me, obj, records, results;
      boundMethodCheck(this, TorontoPublicLibraryDOMOperations);
      COVER_SELECTOR = ".image-container";
      obj = (await this.parser(content));
      me = this;
      extractId = function(el) {
        var match;
        match = /R=(\d+)/.exec(el);
        if (match) {
          return match[1];
        }
        return null;
      };
      results = [];
      records = nodeListToArray(obj.querySelectorAll(".record-result"));
      return records.reduce(function(acc, el) {
        var author, coverImage, id_, record, result;
        record = el.querySelector(".save-item");
        if (!record) {
          return acc;
        }
        id_ = record.dataset.recordId;
        if (!id_) {
          return acc;
        }
        coverImage = el.querySelector(COVER_SELECTOR + " img");
        coverImage = coverImage && coverImage.getAttribute("src");
        author = record.dataset.author;
        author = author && normalizeAuthor(author);
        result = {
          id: id_,
          title: normalizeTitle(record.dataset.title),
          author: author,
          binding: commonBindingMappings(record.dataset.format),
          coverImage: coverImage
        };
        acc.push(result);
        return acc;
      }, []);
    }

    async extractAvailability(content) {
      var available, branchHash, count, data, obj;
      boundMethodCheck(this, TorontoPublicLibraryDOMOperations);
      obj = (await this.parser(content));
      available = 0;
      count = 0;
      branchHash = {};
      data = {
        "estimated": false,
        "count": 0,
        "available": 0,
        "branches": []
      };
      return Array.from(obj.querySelectorAll("tr.notranslate")).reduce(function(acc, el) {
        var columns, location, status;
        acc.count += 1;
        columns = el.querySelectorAll("td");
        status = txtLower(columns[3].textContent);
        if (status === "in library") {
          acc.available += 1;
        }
        location = textFromElement(columns[0].textContent);
        branchHash[location] = 1;
        return acc;
      }, data);
    }

  };

  registerDOMOperations(TorontoPublicLibraryDOMOperations, "toronto");

  // END src/catalogs/dom/toronto.coffee
  register(TorontoPublicLibrary, "toronto", null, TorontoPublicLibraryDOMOperations);

  // END src/catalogs/toronto.coffee
  // BEGIN src/catalogs/voebb.coffee
  VoebbCatalog = class VoebbCatalog extends Catalog {
    constructor(name, state, country, id, url, catalogUrl, params, categories) {
      var defaults;
      defaults = {
        site: 100,
        context: null
      };
      super(name, state, country, id, url, catalogUrl, defaults, params, categories);
      this.getCatalogUrl = this.getCatalogUrl.bind(this);
      this.version = "ff88c631b339c946b41d42ba4116b760";
      this.searchUrl = fromTemplate(urlutils.concat(this.catalogUrl, "/aDISWeb/app?service=direct/0/Home/$DirectLink&sp=SPROD00&sp=SDE&sp=SBK00000000&sp=SAKFreitext+<%= term|encodeuri %>"));
      this.detailUrl = urlutils.concat(this.catalogUrl, "/aDISWeb/app?service=direct/0/Home/$DirectLink&sp=SPROD00&sp=S##ID##");
      this.http = {
        common: {
          xfrm: "html"
        }
      };
      this.domOperations = this.getDomOperations();
    }

    getCatalogUrl() {
      boundMethodCheck(this, VoebbCatalog);
      return this.searchUrl;
    }

    buildSearchUrl(searchBy, searchTerm, _request) {
      var searchIndex;
      searchIndex = {
        "isbn": "6",
        "isbn13": "6"
      }[searchBy] || "1";
      return {
        by: searchBy,
        url: this.searchUrl({
          term: searchTerm
        })
      };
    }

    async parseSearchResults(response, request) {
      var items;
      items = (await this.domOperations.extractSearchResults(response));
      return items;
    }

    buildInventoryLookupUrl(request, item) {
      var url;
      url = this.detailUrl.replace("##ID##", item.id);
      url = url + "&site=" + this.defaults.site + "&viewType=2";
      return {
        url: url
      };
    }

    parseInventoryLookup(response, request) {}

  };

  // BEGIN src/catalogs/dom/voebb.coffee
  VoebbDOMOperations = class VoebbDOMOperations extends DOMOperations {
    constructor() {
      super(...arguments);
      this.extractSearchResults = this.extractSearchResults.bind(this);
    }

    async extractSearchResults(content) {
      var obj, results, rows;
      boundMethodCheck(this, VoebbDOMOperations);
      obj = (await this.parser(content));
      results = [];
      rows = Array.from(obj.querySelectorAll("table#keywordTable tr"));
      rows.forEach(function(elem) {
        var author, available, bibId, bibId_r, binding, bindingMap, children, cleanData, counts_r, data, imgs, src, title, titleLink, total;
        title = null;
        titleLink = elem.querySelector("a.DetailLink");
        if (!titleLink) {
          return;
        }
        bibId_r = /bibID=(\d+)/.exec(titleLink.getAttribute("href"));
        if (!bibId_r) {
          return;
        }
        bibId = bibId_r[1];
        title = textFromElement(titleLink);
        children = Array.from(elem.children);
        if (children.length < 2) {
          return;
        }
        data = children[1].querySelectorAll("table tr td")[2];
        if (data) {
          data = textFromElement(data).split("\n");
        } else {
          data = [];
        }
        cleanData = [];
        data.forEach(function(el) {
          el = el.trim();
          if (el.length > 0) {
            return cleanData.push(el);
          }
        });
        author = normalizeAuthor(cleanData[1]);
        src = textFromElement(children[2]) || "";
        counts_r = /(\d+) of (\d+) available/.exec(src);
        if (counts_r) {
          total = parseInt(counts_r[2]);
          available = parseInt(counts_r[1]);
        }
        binding = void 0;
        imgs = elem.querySelectorAll("img");
        imgs.forEach(function(el) {
          if (mtype) {
            return binding = el.getAttribute("title").toLowerCase();
          }
        });
        bindingMap = {
          hardcover: "book",
          paperback: "book"
        };
        binding = bindingMap[binding] || binding;
        return results.push({
          title: title,
          author: author,
          id: bibId,
          binding: binding,
          availability: {
            count: total,
            available: available
          }
        });
      });
      return results;
    }

    extractAvailability(content) {}

  };

  registerDOMOperations(VoebbDOMOperations, "voebb");

  // END src/catalogs/dom/voebb.coffee
  register(VoebbCatalog, "voebb", null, VoebbDOMOperations);

  // END src/catalogs/voebb.coffee
  // BEGIN src/catalogs/vufind.coffee
  VufindLibrary = class VufindLibrary extends Catalog {
    constructor(name, state, country, id, url, catalogUrl, params, categories) {
      var defaults;
      defaults = {
        INVENTORY_AS_JSON: false,
        USE_ARRAY_INDEX: false,
        USE_AJAX: false,
        AJAX_METHOD: "GetHoldingsInfo",
        AJAX_TEMPLATE: null,
        ROOT: "/",
        SEARCH_PATH: "/Search/Results?",
        SEARCH_TITLE: "Title",
        SEARCH_ISBN: "ISN",
        TYPE_PARAM: "type",
        LOOKFOR_PARAM: "lookfor",
        INVENTORY_SELECTOR: null,
        INVENTORY_SELECTOR_LOCATION: null,
        INVENTORY_SELECTOR_STATUS: null,
        INVENTORY_BRANCH_FILTER: null,
        PARALLEL_REQUESTS: 4
      };
      super(name, state, country, id, url, catalogUrl, defaults, params, categories);
      this.getCatalogUrl = this.getCatalogUrl.bind(this);
      this.buildSearchUrl = this.buildSearchUrl.bind(this);
      this.getDetailUrl = this.getDetailUrl.bind(this);
      this.getDetailPageUrl = this.getDetailPageUrl.bind(this);
      this.getPageType = this.getPageType.bind(this);
      this.parseSearchResults = this.parseSearchResults.bind(this);
      this.parseGroupWorkPage = this.parseGroupWorkPage.bind(this);
      this.buildInventoryLookupUrl = this.buildInventoryLookupUrl.bind(this);
      this.parseInventoryFromObject = this.parseInventoryFromObject.bind(this);
      this.parseInventoryLookupJson = this.parseInventoryLookupJson.bind(this);
      this.parseInventoryLookup = this.parseInventoryLookup.bind(this);
      if (this.defaults.USE_AJAX) {
        this.defaults.ARRAY_INDEX = (this.defaults.USE_ARRAY_INDEX && "[0][id]") || "[]";
        if (!this.defaults.AJAX_TEMPLATE) {
          if (this.defaults.INVENTORY_AS_JSON) {
            this.defaults.AJAX_TEMPLATE = "<%= rootUrl|rtrimslash %>/AJAX/JSON?id<%= arrIndex %>=<%= id %>&method=<%= method %>";
          } else {
            this.defaults.AJAX_TEMPLATE = "<%= url|rtrimslash %>/AJAX?method=<%= method %>";
          }
        }
        this.defaults.AJAX_TEMPLATE = fromTemplate(this.defaults.AJAX_TEMPLATE);
      }
      this.version = "0eaf1ef546720d00986861cf3a85d073";
      this.rootUrl = urlutils.concat(this.catalogUrl, this.defaults["ROOT"]);
      this.searchUrl = urlutils.concat(this.rootUrl, this.defaults["SEARCH_PATH"]);
      this.inventoryLookupUrl = this.rootUrl;
      this.http = {
        common: {
          xfrm: 'html'
        },
        search: {
          xfrm: 'xml'
        }
      };
      this.domOperations = this.getDomOperations();
      if (this.defaults.INVENTORY_AS_JSON) {
        this.http.inventory = {
          xfrm: 'json'
        };
      }
      this.detailUrl = this.inventoryLookupUrl;
      this.domOperations = this.getDomOperations();
    }

    getCatalogUrl() {
      boundMethodCheck(this, VufindLibrary);
      return urlutils.concat(this.rootUrl, "/");
    }

    buildSearchUrl(searchBy, searchTerm, request) {
      var idxLookup, params;
      boundMethodCheck(this, VufindLibrary);
      idxLookup = {
        "isbn": this.defaults["SEARCH_ISBN"],
        "isbn13": this.defaults["SEARCH_ISBN"],
        "title": this.defaults["SEARCH_TITLE"]
      };
      searchTerm = searchTerm.replace(":", " ");
      params = `${this.defaults.TYPE_PARAM}=${idxLookup[searchBy]}&${this.defaults.LOOKFOR_PARAM}=${encodeURIComponent(searchTerm)}&view=rss`;
      return {
        by: searchBy,
        url: `${this.searchUrl}${params}`
      };
    }

    getDetailUrl(id, pageType) {
      boundMethodCheck(this, VufindLibrary);
      pageType = pageType || "Record";
      return urlutils.concat(this.detailUrl, `/${pageType}/${id}`);
    }

    getDetailPageUrl(id, pageType) {
      boundMethodCheck(this, VufindLibrary);
      return this.getDetailUrl(id, pageType);
    }

    getPageType(request) {
      boundMethodCheck(this, VufindLibrary);
      if (request[`${this.libraryId}libraryResult`] !== void 0) {
        return request[`${this.libraryId}libraryResult`]["pageType"];
      }
      return "Record";
    }

    async parseSearchResults(response, request) {
      var arrg, flatten, group_results, me, results, sparseFilter;
      boundMethodCheck(this, VufindLibrary);
      me = this;
      results = (await this.domOperations.extractSearchResults(response));
      sparseFilter = function(arr) {
        return arr.filter(function(el) {
          return el !== null;
        });
      };
      flatten = function(arrs) {
        var res;
        res = arrs.reduce(function(acc, arr) {
          return acc = acc.concat(arr);
        }, []);
        return res;
      };
      results.items = flatten(results.items);
      results.items = sparseFilter(results.items);
      results.items = results.items.map(function(item) {
        return Object.assign({}, item, {
          url: urlutils.concat(me.rootUrl, item.url)
        });
      });
      if (results.group_results) {
        arrg = flatten(results.group_results);
        group_results = (await Promise.all(arrg.map(me.parseGroupWorkPage)));
        results.items = group_results.reduce(function(acc, el) {
          var items;
          items = el.map(function(item) {
            return Object.assign({}, item, {
              url: urlutils.concat(me.rootUrl, item.url)
            });
          });
          return acc = acc.concat(items);
        }, results.items);
      }
      return results.items;
    }

    async parseGroupWorkPage(data) {
      var opts, rv;
      boundMethodCheck(this, VufindLibrary);
      opts = {
        url: urlutils.concat(this.rootUrl, data.url),
        xfrm: "html"
      };
      rv = (await this.httpRequest(opts));
      return (await this.domOperations.extractGroupWorkSearchResults(rv.body, data));
    }

    buildInventoryLookupUrl(request, item) {
      var url;
      boundMethodCheck(this, VufindLibrary);
      url = this.getDetailUrl(item.id, this.getPageType(request));
      if (this.defaults["USE_AJAX"] === "true" && this.defaults.AJAX_TEMPLATE) {
        url = this.defaults.AJAX_TEMPLATE({
          arrIndex: this.defaults.ARRAY_INDEX,
          id: item.id,
          method: this.defaults.AJAX_METHOD,
          rootUrl: this.rootUrl,
          url: url
        });
      }
      return {
        url: url
      };
    }

    parseInventoryFromObject(obj) {
      var LIBRARY_AVAILABILITY_RE, data, filter, keys, nodes;
      boundMethodCheck(this, VufindLibrary);
      filter = this.defaults.INVENTORY_BRANCH_FILTER;
      keys = Object.keys(obj);
      data = {
        count: 0,
        available: 0,
        branches: []
      };
      LIBRARY_AVAILABILITY_RE = /(.*) \(([0-9]+) of ([0-9]+)\)/;
      nodes = nodeListToArray($toFragment(obj[keys[0]]).querySelectorAll("a"));
      return nodes.reduce(function(acc, el) {
        var res;
        res = LIBRARY_AVAILABILITY_RE.exec(el.textContent);
        if (res) {
          if (filter === null || res[1].toLowerCase().indexOf(filter.toLowerCase()) >= 0) {
            acc.count += parseInt(res[3]);
            acc.available += parseInt(res[2]);
            if (acc.branches.indexOf(res[1].toLowerCase()) < 0) {
              acc.branches.push(res[1].toLowerCase());
            }
          }
        }
        return acc;
      }, data);
    }

    parseInventoryLookupJson(response) {
      var available, branchHash, count, data;
      boundMethodCheck(this, VufindLibrary);
      branchHash = {};
      available = 0;
      count = 0;
      if (response.status === "OK") {
        if (!Array.isArray(response.data)) {
          return this.parseInventoryFromObject(response.data);
        }
        count = response.data.length;
        response.data.forEach(function(el) {
          if (el.locationList.length > 1) {
            count += el.locationList.length - 1;
            return el.locationList.forEach(function(location) {
              if (location.availability) {
                return available += 1;
              }
            });
          } else {
            available += parseInt(el.availability) || 0;
            return branchHash[el.branch] = 1;
          }
        });
      }
      data = {
        "count": count,
        "available": available,
        "branches": hashToList(branchHash)
      };
      return data;
    }

    async parseInventoryLookup(response) {
      boundMethodCheck(this, VufindLibrary);
      if (this.defaults["INVENTORY_AS_JSON"] === "true") {
        return this.parseInventoryLookupJson(response);
      }
      return (await this.domOperations.extractAvailability(response));
    }

  };

  // BEGIN src/catalogs/dom/vufind.coffee
  VufindDOMOperations = class VufindDOMOperations extends DOMOperations {
    constructor() {
      super(...arguments);
      this.extractGroupWorkSearchResults = this.extractGroupWorkSearchResults.bind(this);
      this.parseOneRSSRow = this.parseOneRSSRow.bind(this);
      this.extractSearchResults = this.extractSearchResults.bind(this);
      this._extractInventoryByConfig = this._extractInventoryByConfig.bind(this);
      this.extractAvailability = this.extractAvailability.bind(this);
    }

    formatToBinding(format) {
      var comps, res;
      comps = format.split("/");
      res = comps.reduce(function(acc, el) {
        if (acc === null) {
          if (el.length > 1) {
            acc = el;
          }
        }
        return acc;
      }, null);
      return commonBindingMappings(res);
    }

    async extractGroupWorkSearchResults(content, data) {
      var IDMATCH_REGEX, me, response;
      boundMethodCheck(this, VufindDOMOperations);
      IDMATCH_REGEX = /Record\/([\._a-zA-Z0-9]+)/;
      response = (await this.parser(content));
      me = this;
      return Array.from(response.querySelectorAll(".related-manifestation")).reduce(function(books, manifestation) {
        var binding, elements, records;
        records = Array.from(manifestation.querySelectorAll("a[href*=Record]")).reduce(function(acc, el) {
          var href;
          href = el.getAttribute("href");
          if (IDMATCH_REGEX.exec(href)) {
            acc.add(href);
          }
          return acc;
        }, new Set());
        if (records.size === 0) {
          return books;
        }
        elements = manifestation.querySelectorAll(".manifestation-format");
        binding = null;
        elements.forEach(function(el) {
          binding = txtLower(el.textContent);
          if (binding.startsWith("+ ")) {
            binding = binding.substr(2);
          }
          if (binding.indexOf("show") >= 0) { // show edition
            binding = binding.substr(0, binding.indexOf("show")).trim();
          }
          return false;
        });
        return books.concat(Array.from(records).reduce(function(acc, el) {
          var item;
          item = Object.assign({}, data, {
            binding: binding,
            url: el,
            id: IDMATCH_REGEX.exec(el)[1]
          });
          acc.push(item);
          return acc;
        }, []));
      }, []);
    }

    parseOneRSSRow(item) {
      var author, binding, data, ex, id, idmatch, pageType, title;
      boundMethodCheck(this, VufindDOMOperations);
      title = item.querySelector("title").textContent;
      idmatch = /(Record|GroupedWork)\/([\._\-a-zA-Z0-9]+)/.exec(textFromElement(item.querySelector("link")) || textFromElement(item.querySelector("guid")));
      if (title.length && idmatch) {
        id = idmatch[2];
        pageType = idmatch[1];
        author = normalizeAuthor(textFromElement(item.querySelector("creator, author")));
        try {
          binding = this.formatToBinding(textFromElement(item.querySelector("format")));
        } catch (error1) {
          ex = error1;
          0;
        }
        data = {
          title: title,
          author: author,
          id: id,
          pageType: pageType,
          url: this.getDetailPageUrl(id, pageType)
        };
        if ("GroupedWork" === pageType) {
          return {
            key: "group_results",
            value: [data]
          };
        } else {
          if (binding) {
            data["binding"] = binding;
          }
          return {
            key: "items",
            value: [data]
          };
        }
      } else {
        return null;
      }
    }

    getDetailPageUrl(id, pageType) {
      pageType = pageType || "Record";
      return `/${pageType}/${id}`;
    }

    async extractSearchResults(content) {
      var me, response, results, splitResults;
      boundMethodCheck(this, VufindDOMOperations);
      response = (await this.parser(content));
      me = this;
      results = nodeListToArray(response.querySelectorAll("rss channel item")).reduce(function(acc, item) {
        var rv;
        rv = me.parseOneRSSRow(item);
        if (rv) {
          acc.push(rv);
        }
        return acc;
      }, []);
      splitResults = function(arr) {
        return arr.reduce(function(acc, item) {
          if (item && item.key) {
            acc[item.key].push(item.value);
          }
          return acc;
        }, {
          items: [],
          group_results: []
        });
      };
      return splitResults(results);
    }

    checkGroupedWork(result, branchHash, doc) {
      var applies;
      applies = false;
      if (result.count === 0) {
        doc.querySelectorAll("table tr").forEach(function(el) {
          var details, header;
          header = el.querySelector("th");
          if (header && /scoping_details_.*/.exec(textFromElement(header))) {
            applies = true;
            details = textFromElement(el.querySelector("td")).split("|,");
            return details.forEach(function(row) {
              result.count += 1;
              if (row.split("|")[2] === "On Shelf") {
                return result.available += 1;
              }
            });
          }
        });
      }
      return applies;
    }

    _getHoldingsPhiladelphia(result, branchHash, doc) {
      var applied;
      applied = false;
      doc.querySelectorAll("div").forEach(function(row) {
        var available_match, text, total_match;
        applied = true;
        text = textFromElement(row);
        total_match = /Total Copies:\W+(\d+)/.exec(text);
        available_match = /Available:\W+(\d+)/.exec(text);
        if (total_match) {
          result.count = parseInt(total_match[1]);
          return result.available = parseInt(available_match[1]);
        }
      });
      return applied;
    }

    _extractInventoryByConfig(response, results, branchHash) {
      var holdings, likeHoldingIdentifier, me;
      boundMethodCheck(this, VufindDOMOperations);
      me = this;
      likeHoldingIdentifier = function(txt) {
        return /([A-Z]+[0-9]+[A-Z\. ])+/.exec(txt.toUpperCase());
      };
      holdings = response.querySelectorAll(this.defaults.INVENTORY_SELECTOR);
      return holdings.forEach(function(holding) {
        var availabilityText, location, status;
        location = status = null;
        if (me.defaults.INVENTORY_SELECTOR_LOCATION) {
          location = holding.querySelector(me.defaults.INVENTORY_SELECTOR_LOCATION);
        }
        if (me.defaults.INVENTORY_SELECTOR_STATUS) {
          status = holding.querySelector(me.defaults.INVENTORY_SELECTOR_STATUS);
        }
        if (status && txtLower(textFromElement(status)) === "status") {
          return;
        }
        if (location) {
          branchHash[txtLower(textFromElement(location))] = 1;
        }
        results.applied = true;
        results.count += 1;
        if (status) {
          availabilityText = txtLower(textFromElement(status));
          if (availabilityText.indexOf("on shelf") > -1 || availabilityText.indexOf("available") > -1 || availabilityText.indexOf("checked in") > -1 || likeHoldingIdentifier(availabilityText)) {
            return results.available += 1;
          }
        }
      });
    }

    async extractAvailability(content) {
      var availableMatch, book, branchHash, countMatch, data, exc, holdableCopies, internalChecks, me, response, summary;
      boundMethodCheck(this, VufindDOMOperations);
      response = (await this.parser(content));
      me = this;
      book = {
        available: 0,
        count: 0,
        applied: false
      };
      branchHash = {};
      try {
        holdableCopies = response.querySelector("holdablecopies");
        if (holdableCopies) {
          book.count = parseInt(textFromElement(holdableCopies));
          book.available = parseInt(textFromElement(response.querySelector("availablecopies")));
          book.applied = true;
        } else {
          summary = textFromElement(response.querySelector("HoldingsSummary"));
          if (summary !== null) {
            countMatch = /([0-9]+) total copies/.exec(summary);
            if (countMatch) {
              book.applied = true;
              book.count = parseInt(countMatch[1]);
            }
            availableMatch = /([0-9]+) are on shelf/.exec(summary);
            if (availableMatch) {
              book.available = parseInt(availableMatch[1]);
            }
          }
          if (book.applied) {
            return book;
          }
        }
      } catch (error1) {
        exc = error1;
        logger.exception("VufindLibrary:parseInventoryLookup", exc);
      }
      content = [];
      if (this.defaults.INVENTORY_SELECTOR) {
        this._extractInventoryByConfig(response, book, branchHash);
      }
      if (!book.applied) {
        book = Array.from(response.querySelectorAll(".holdings")).reduce(function(arr, el) {
          return arr.concat(Array.from(el.childNodes));
        }, []).filter(function(el) {
          return el.nodeType === 1;
        }).reduce(function(arr, el) {
          return arr.concat(Array.from(el.querySelectorAll("tr")));
        }, []).reduce(function(book, el) {
          var applied, branchName, dataCells;
          dataCells = el.querySelectorAll("td");
          if (dataCells.length === 0) {
            return book;
          }
          book.count += 1;
          if (dataCells[dataCells.length - 1].getAttribute("style") === void 0) {
            book.available += 1;
            branchName = textFromElement(dataCells[0]);
            branchHash[branchName] = 1;
          }
          applied = true;
          book.applied = true;
          return book;
        }, {
          applied: false,
          count: 0,
          available: 0
        });
      }
      if (!book.applied) {
        book = Array.from(response.querySelectorAll("tr[typeof=Offer]")).reduce(function(arr, el) {
          var availability;
          arr.applied = true;
          arr.count += 1;
          availability = el.querySelector("link[property=availability]");
          arr.available += (/InStock/.exec(availability.getAttribute("href")) && 1) || 0;
          return arr;
        }, {
          applied: false,
          count: 0,
          available: 0
        });
      }
      if (!book.applied) {
        book.applied = me.checkGroupedWork(book, branchHash, response);
      }
      if (!book.applied) {
        internalChecks = [this._getHoldingsPhiladelphia];
        internalChecks.find(function(check) {
          return check(book, branchHash, response);
        });
      }
      data = {
        count: book.count,
        available: book.available,
        branches: hashToList(branchHash)
      };
      return data;
    }

  };

  registerDOMOperations(VufindDOMOperations, "vufind");

  // END src/catalogs/dom/vufind.coffee
  register(VufindLibrary, "vufind", null, VufindDOMOperations);

  // END src/catalogs/vufind.coffee
  // BEGIN src/catalogs/webpacpro.coffee
  ItemIdSearches = function() {
    var regex;
    regex = {
      EXACT_RE: /request(?:browse|exact)\~(b[0-9]+[A-Za-z]*?)&/g,
      RE: /\=(b[0-9]+[A-Za-z]*)/g,
      ONLY_RE: /(b[0-9]+[A-Za-z]*)/g,
      RECORD_RE: /record=(.*?)\~/g
    };
    return regex;
  };

  WebPacProLibrary = class WebPacProLibrary extends Catalog {
    constructor(name, state, country, id, url, catalogUrl, params, categories) {
      var defaults;
      defaults = {
        "LIMIT_BRANCH": "",
        "ISBN": "1",
        "ISBN13": "1",
        "INVENTORY_PAGE": null,
        "HOLDINGS_SEARCH": ".bibItems",
        "STATUS_COLUMN_TEXT": "STATUS",
        "LOCATION_COLUMN_TEXT": "LOCATION",
        "INV_COLUMN_TITLE_SEARCH": "th.bibItemsHeader",
        "INV_ROW_SEARCH": "tr.bibItemsEntry",
        "TITLE_SEARCHTYPE": "t"
      };
      super(name, state, country, id, url, catalogUrl, defaults, params, categories);
      this.canSearchByIsbn = this.canSearchByIsbn.bind(this);
      this.canSearchByIsbn13 = this.canSearchByIsbn13.bind(this);
      this.buildSearchUrl = this.buildSearchUrl.bind(this);
      this.parseSearchResults = this.parseSearchResults.bind(this);
      this.parseInventoryLookup = this.parseInventoryLookup.bind(this);
      this.version = "cc033c261f69c26f88076beb74a9ebe2";
      this.commonHeaders = [["Content-Type", "application/json"]];
      this.searchUrl = `${this.catalogUrl}/search${this.defaults['LIMIT_BRANCH']}/`;
      if ("searchroot" in params) {
        this.searchUrl = `${this.catalogUrl}${params['searchroot']}`;
      }
      this.searchScope = "";
      if ("searchscope" in params) {
        this.searchScope = params["searchscope"];
      }
      this.detailUrl = fromTemplate(urlutils.concat(this.catalogUrl, "/record=<%= id %>"));
      this.http = {
        common: {
          xfrm: "html"
        }
      };
      this.domOperations = this.getDomOperations();
    }

    canSearchByIsbn() {
      var isbnSearchEnabled;
      boundMethodCheck(this, WebPacProLibrary);
      isbnSearchEnabled = this.defaults["ISBN"] === "1";
      logger.debug(`${this.libraryName} library can handle ISBN search: ${isbnSearchEnabled}`);
      return isbnSearchEnabled;
    }

    canSearchByIsbn13() {
      var isbnSearchEnabled;
      boundMethodCheck(this, WebPacProLibrary);
      isbnSearchEnabled = this.defaults["ISBN13"] === "1";
      logger.debug(`${this.libraryName} library can handle ISBN13 search: ${isbnSearchEnabled}`);
      return isbnSearchEnabled;
    }

    buildSearchUrl(searchBy, searchTerm, request) {
      var idxLookup, searchScope;
      boundMethodCheck(this, WebPacProLibrary);
      idxLookup = {
        "isbn": "i",
        "isbn13": "i",
        "title": this.defaults.TITLE_SEARCHTYPE
      };
      searchTerm = `?searchtype=${idxLookup[searchBy]}&searcharg=${encodeURIComponent(searchTerm)}`;
      searchScope = "";
      if (this.searchScope !== "") {
        searchScope = `&searchscope=${this.searchScope}`;
      }
      return {
        by: searchBy,
        url: this.searchUrl + searchTerm + searchScope
      };
    }

    async parseSearchResults(response, request) {
      var items, me;
      boundMethodCheck(this, WebPacProLibrary);
      me = this;
      items = (await this.domOperations.extractSearchResults(response, request));
      items = items.map(function(el) {
        return Object.assign({}, el, {
          url: me.getDetailPageUrl(el.id)
        });
      });
      return items;
    }

    async parseInventoryLookup(response, request, item) {
      var items, me, opts;
      boundMethodCheck(this, WebPacProLibrary);
      items = (await this.domOperations.extractAvailability(response));
      me = this;
      if (items.action === "subrequest") {
        opts = {
          url: items.link,
          xfrm: "html"
        };
        me = this;
        me.httpRequest(opts, request).then(function(resp) {
          return me.updateAvailabilityCounts(request, resp, item);
        });
        return null;
      }
      return items;
    }

  };

  // BEGIN src/catalogs/dom/webpacpro.coffee
  WebPacProStrategies = {
    idStrategyFromInput: function(el) {
      var source;
      source = el.querySelector("input");
      return source && source.getAttribute("value");
    },
    idStrategyFromLink: function(el) {
      var rv, source;
      source = el.querySelector("div.briefcitRequest a");
      if (source) {
        rv = ItemIdSearches().EXACT_RE.exec(source.getAttribute("href") || "");
        return rv && rv[1];
      }
    },
    idStrategyFromOnClickHandler: function(el) {
      var rv, source;
      source = el.querySelector("a[href]");
      if (source) {
        rv = ItemIdSearches().RE.exec(source.getAttribute("onClick") || "");
        return rv && rv[1];
      }
    },
    idStrategyFromActionsLink: function(el) {
      var rv, source;
      source = el.querySelector(".briefcitActions a");
      if (source) {
        rv = ItemIdSearches().EXACT_RE.exec(source.getAttribute("href"));
        return rv && rv[1];
      }
    }
  };

  findWinningStrategy = function(strategyObj, el) {
    return Object.keys(strategyObj).reduce(function(acc, strategyName) {
      if (!acc.result) {
        acc.result = strategyObj[strategyName](el);
        if (acc.result) {
          acc.winner = strategyName;
        }
      }
      return acc;
    }, {
      result: null
    }).result;
  };

  WebPacProDOMOperations = class WebPacProDOMOperations extends DOMOperations {
    constructor() {
      super(...arguments);
      this.extractSearchResults = this.extractSearchResults.bind(this);
      this.extractAvailability = this.extractAvailability.bind(this);
    }

    async extractSearchResults(content, request) {
      var FRAMESET_RE, bibDetails, binding, details, el, extId, extractFromBibInfoData, holdingsTable, id_match, me, nodes, obj, permLink, permaLink, requestItemLink, requestTitle, result, results, searchResultsTable, searchTerms, status, thisResult;
      boundMethodCheck(this, WebPacProDOMOperations);
      obj = (await this.parser(content));
      me = this;
      binding = void 0;
      results = [];
      extractFromBibInfoData = function(el) {
        var parent, result;
        parent = findFirstMatchingNode(el, "td.bibInfoLabel:contains('Title')").parentNode;
        result = parseAuthorAndTitleBySlash(textFromElement(parent.querySelector("td.bibInfoData")));
        if (!result.hasOwnProperty("author") || !result.author || result.author.length === 0) {
          parent = findFirstMatchingNode(el, "td.bibInfoLabel:contains('Author')");
          parent = parent && parent.parentNode;
          if (parent) {
            result.author = normalizeAuthor(parent.querySelector("td.bibInfoData").textContent);
          }
        }
        return result;
      };
      nodes = findAllMatchingNodes(obj, [
        "a:contains('Permanent Link')",
        ":contains('Permanent')", // any div
        "a:contains('Permalink')"
      ]);
      if (nodes.length > 0) {
        id_match = null;
        nodes.forEach(function(el) {
          var target;
          target = el.getAttribute("href");
          id_match = ItemIdSearches().ONLY_RE.exec(target);
          if (!id_match) {
            target = el.textContent;
            id_match = ItemIdSearches().ONLY_RE.exec(target);
          }
          if (id_match) {
            return false;
          }
        });
        if (id_match) {
          result = extractFromBibInfoData(obj);
          result = Object.assign(result, {
            id: id_match[1],
            binding: binding || void 0
          });
          results.push(result);
          return results;
        }
      }
      el = obj.querySelector("div.navigationRowRecord");
      if (el) {
        requestItemLink = el.querySelector("a");
        if (requestItemLink) {
          id_match = /[=~](b[0-9]+[A-Za-z]*)&/.exec(requestItemLink.getAttribute("href"));
        }
        if (id_match) {
          result = extractFromBibInfoData(obj);
          result = Object.assign(result, {
            id: id_match[1],
            binding: binding || void 0
          });
          results.push(result);
          return results;
        }
      }
      permLink = findFirstMatchingNode(obj, [".bibDisplayPermLink a", "a#recordnum"]);
      if (permLink) {
        extId = ItemIdSearches().RE.exec(permLink.getAttribute("href"));
        if (extId != null) {
          thisResult = {
            id: extId[1]
          };
          bibDetails = findAllMatchingNodes(obj, ["table.bibDetail tr", "table.bibdetail tr"]);
          bibDetails.forEach(function(elem) {
            var target;
            target = txtLower(textFromElement(elem.querySelector("td.bibInfoLabel")));
            if (target === "title") {
              return thisResult = extractFromBibInfoData(elem);
            }
          });
          result = Object.assign(thisResult, {
            id: extId[1]
          });
          results.push(result);
          return results;
        }
      }
      searchResultsTable = obj.querySelector("table.browseScreen, table:has(> tr.browserSuperEntry)");
      if (searchResultsTable) { // A link
        details = Array.from(searchResultsTable.querySelectorAll("div.briefcitRow, tr.briefCitRow"));
        results = details.reduce(function(acc, el) {
          var title;
          title = textFromElement(el.querySelector(".briefcitTitle"));
          result = parseAuthorAndTitleBySlash(title);
          if (!result.author) {
            result.author = normalizeAuthor(textFromElement(el.querySelector(".briefcitAuthor, .briefcitTitle ~ i")));
          }
          result.id = findWinningStrategy(WebPacProStrategies, el);
          if (result.id) {
            acc.push(result);
          }
          return acc;
        }, []);
      }
      if (results.length > 0) {
        return results;
      }
      status = null;
      FRAMESET_RE = /frameset/g;
      searchTerms = [/exact/g, FRAMESET_RE];
      requestTitle = request.title;
      [".browseEntryData", ".browseScreen"].find(function(searchClass) {
        var collectionRows;
        collectionRows = [];
        el = obj.querySelector(searchClass);
        if (el) {
          collectionRows = el.querySelectorAll("a");
        }
        if (collectionRows.length > 0) {
          logger.debug("Found matching subcollection");
          collectionRows = nodeListToArray(collectionRows);
          collectionRows.find(function(elem) {
            var fullLink, href, opts;
            href = elem.getAttribute("href");
            if (href != null) {
              if (normalizeTitle(elem.textContent) === requestTitle) {
                fullLink = `${me.catalogUrl}${href}`;
                opts = {
                  url: fullLink,
                  xfrm: "html"
                };
                me.httpRequest(opts, request).then(function(rv) {
                  return me.inventoryLookup(request, rv, opts);
                });
                status = "searching";
                return true;
              }
            }
          });
          if (status != null) {
            return true;
          }
        }
      });
      if (status != null) {
        return results;
      }
      holdingsTable = obj.querySelector(this.defaults.HOLDINGS_SEARCH);
      if ((holdingsTable != null) && holdingsTable.length > 0) {
        permaLink = this._getPermaLink(holdingsTable);
        if (permaLink != null) {
          result = extractFromBibInfoData(obj);
          result.id = permaLink;
          results.push(result);
        }
      }
      return results;
    }

    _getPermaLink(req) {
      var attribute, extId, lastDitch, permaLink, plainText, target;
      permaLink = req.querySelector("a[href*='record=']");
      attribute = "href";
      if (!permaLink) {
        permaLink = req.querySelector("input[name='LinkURL']");
        attribute = "value";
      }
      if (permaLink) {
        extId = ItemIdSearches().RECORD_RE.exec(permaLink.getAttribute(attribute));
        if (extId != null) {
          return extId[1];
        }
      }
      plainText = req.querySelector(":contains('Record Number: ')");
      if (!plainText) {
        plainText = req.querySelector("#BibNumb");
        attribute = null;
      }
      if (plainText.length > 0) {
        target = plainText;
        if (attribute !== null) {
          target = target.getAttribute(attribute);
        } else {
          target = textFromElement(target);
        }
        extId = ItemIdSearches().RECORD_RE.exec(target);
        if (extId != null) {
          return extId[1];
        }
      }
      lastDitch = req.querySelector('a[href*="=b"]');
      if (lastDitch) {
        extId = ItemIdSearches().RE.exec(lastDitch.getAttribute("href"));
        if (extId != null) {
          return extId[1];
        }
      }
      return null;
    }

    async extractAvailability(content) {
      var available, availableStatus, branchFilter, branchHash, columnHdrs, count, data, fullLink, headers, holdingsTable, holdingsforms, href, me, obj, rows, unavailableStatus;
      boundMethodCheck(this, WebPacProDOMOperations);
      obj = (await this.parser(content));
      holdingsforms = obj.querySelector("[action*=\"holdings\"]");
      if (holdingsforms != null) {
        href = holdingsforms.getAttribute("action");
        if (href != null) {
          fullLink = `${this.catalogUrl}${href}`;
          return {
            "action": "subrequest",
            "link": fullLink
          };
        }
      }
      holdingsTable = obj.querySelector(this.defaults["HOLDINGS_SEARCH"]);
      if (!holdingsTable) {
        data = {
          "estimated": true,
          "count": 0,
          "available": 0,
          "branches": []
        };
        return data;
      }
      availableStatus = [
        "AVAILABLE",
        "CHECK SHELF",
        "CHECK SHELVES",
        "CHECKED IN",
        "DISPONIBLE", // spanish
        "IN LIBRARY",
        "IN",
        "NOT CHECKED OUT",
        "NOT CHK'D OUT",
        "NOT CHKED OUT",
        "ON SHELF",
        "SHELF"
      ];
      unavailableStatus = ["ON HOLDSHELF", "UNAVAILABLE"];
      available = 0;
      count = 0;
      branchHash = {};
      branchFilter = this.defaults.searchBranch || "";
      columnHdrs = {};
      columnHdrs[this.defaults["STATUS_COLUMN_TEXT"].toLowerCase()] = 2;
      columnHdrs[this.defaults["LOCATION_COLUMN_TEXT"].toLowerCase()] = 0;
      headers = holdingsTable.querySelectorAll(this.defaults["INV_COLUMN_TITLE_SEARCH"]);
      headers.forEach(function(el, idx) {
        var t;
        t = txtLower(el.textContent).trim();
        return Object.keys(columnHdrs).forEach(function(hdr) {
          if (t.startsWith(hdr)) {
            return columnHdrs[hdr] = idx;
          }
        });
      });
      me = this;
      rows = holdingsTable.querySelectorAll(this.defaults["INV_ROW_SEARCH"]);
      rows.forEach(function(el) {
        var branchName, columns, exc, isAvailable, status;
        try {
          columns = el.querySelectorAll("td");
          branchName = txtLower(textFromElement(columns[columnHdrs[me.defaults["LOCATION_COLUMN_TEXT"].toLowerCase()]]));
          if (branchName === "") {
            return;
          }
          status = txtLower(textFromElement(columns[columnHdrs[me.defaults["STATUS_COLUMN_TEXT"].toLowerCase()]]));
          isAvailable = anyBeginsWith(availableStatus, status, unavailableStatus);
          if (branchFilter === "" || branchName === branchFilter) {
            count += 1;
            if (isAvailable) {
              available += 1;
              return branchHash[branchName] = 1;
            }
          }
        } catch (error1) {
          exc = error1;
          return logger.exception("WebPacPro:parseInventoryLookup", exc);
        }
      });
      data = {
        "estimated": true,
        "count": count,
        "available": available,
        "branches": hashToList(branchHash)
      };
      return data;
    }

  };

  registerDOMOperations(WebPacProDOMOperations, "webpacpro");

  // END src/catalogs/dom/webpacpro.coffee
  register(WebPacProLibrary, "webpacpro", null, WebPacProDOMOperations);

  // END src/catalogs/webpacpro.coffee
  // BEGIN src/catalogs/webvoyage.coffee
  WebVoyageLibrary = class WebVoyageLibrary extends Catalog {
    constructor(name, state, country, id, url, catalogUrl, params, categories) {
      var defaults;
      defaults = {};
      super(name, state, country, id, url, catalogUrl, defaults, params, categories);
      this.getCatalogUrl = this.getCatalogUrl.bind(this);
      this.buildSearchUrl = this.buildSearchUrl.bind(this);
      this.parseSearchResults = this.parseSearchResults.bind(this);
      this.version = "8e376ede9abc13b15371faa2cb4b34ce";
      this.searchUrl = urlutils.concat(this.catalogUrl, "vwebv/search?");
      this.detailUrl = fromTemplate(urlutils.concat(this.catalogUrl, "vwebv/holdingsInfo?bibId=<%= id %>"));
      this.http = {
        common: {
          xfrm: "html"
        }
      };
      this.domOperations = this.getDomOperations();
    }

    getCatalogUrl() {
      boundMethodCheck(this, WebVoyageLibrary);
      return urlutils.concat(this.catalogUrl, "vwebv/searchBasic");
    }

    buildSearchUrl(searchBy, searchTerm, request) {
      var idxLookup, params, qs;
      boundMethodCheck(this, WebVoyageLibrary);
      idxLookup = {
        "isbn": "ISBN",
        "isbn13": "ISBN",
        "title": "TKEY"
      };
      params = {
        "searchType": "2",
        "recCount": "50",
        "searchArg1": searchTerm,
        "searchCode1": idxLookup[searchBy],
        "argType1": "all"
      };
      qs = toQueryString(params);
      return {
        by: searchBy,
        url: this.searchUrl + qs
      };
    }

    async parseSearchResults(response, request) {
      var items;
      boundMethodCheck(this, WebVoyageLibrary);
      items = (await this.domOperations.extractSearchResults(response));
      return items;
    }

    async parseInventoryLookup(response, request) {
      return (await this.domOperations.extractAvailability(response));
    }

  };

  // BEGIN src/catalogs/dom/webvoyage.coffee
  WebVoyageDOMOperations = class WebVoyageDOMOperations extends DOMOperations {
    constructor() {
      super(...arguments);
      this.extractSearchResults = this.extractSearchResults.bind(this);
      this.extractAvailability = this.extractAvailability.bind(this);
    }

    extractBinding(text) {
      logger.debug(`Binding: ${text}`);
      if (/DVD/.exec(text)) {
        return "dvd";
      }
      if (/Audio/.exec(text)) {
        return "audiocd";
      }
      if (/CD/.exec(text)) {
        return "audiocd";
      }
      return null;
    }

    extractBibliographicInformation(body) {
      var bibInfo, result, tags;
      bibInfo = {};
      tags = nodeListToArray(body.querySelectorAll(".bibTag"));
      tags.forEach(function(el) {
        var key, keyField, value;
        keyField = el.querySelector(".fieldLabelSpan");
        if (!keyField === 0) {
          return;
        }
        key = txtLower(textFromElement(keyField));
        if (key.endsWith(":")) {
          key = key.replace(":", "");
        }
        if (key === "author/creator") {
          key = "author";
        }
        value = textFromElement(el.querySelector(".subfieldData"));
        return bibInfo[key] = value;
      });
      result = {};
      if (bibInfo.title) {
        result.title = bibInfo.title;
      }
      if (bibInfo.author) {
        result.author = bibInfo.author;
      }
      return result;
    }

    async extractSearchResults(content) {
      var addToList, cells, exact, id, me, obj, result, results;
      boundMethodCheck(this, WebVoyageDOMOperations);
      obj = (await this.parser(content));
      me = this;
      results = [];
      exact = obj.querySelector("#persistentLink");
      if (exact) {
        try {
          id = (/bibId=(\d+)/.exec(exact.getAttribute("href")))[1];
          result = me.extractBibliographicInformation(obj);
          result = Object.assign(result, {
            id: id
          });
          results.push(result);
          return results;
        } catch (error1) {
          exact = false;
        }
      }
      addToList = obj.querySelector("a[href*=\"addToList.do\"]");
      if (addToList) {
        id = (/bibId=(\d+)/.exec(addToList.getAttribute('href')))[1];
        result = me.extractBibliographicInformation(obj);
        result = Object.assign(result, {
          id: id
        });
        results.push(result);
        return results;
      }
      cells = nodeListToArray(obj.querySelectorAll(".resultListTextCell"));
      return cells.map(function(row) {
        var author, binding, data, title;
        title = normalizeTitle(row.querySelector(".line1Link"));
        author = normalizeAuthor(row.querySelector(".line2Link"));
        id = (/bibId=(\d+)/.exec(row.querySelector(".line1Link a").getAttribute("href")))[1];
        binding = me.extractBinding(textFromElement(row.querySelector(".line5Link")));
        data = {
          id: id,
          author: author,
          title: title
        };
        if (binding !== null) {
          data["binding"] = binding;
        }
        return data;
      });
      return results;
    }

    async extractAvailability(content) {
      var AVAILABLE_TERMS, available, branchHash, count, data, items, obj;
      boundMethodCheck(this, WebVoyageDOMOperations);
      obj = (await this.parser(content));
      AVAILABLE_TERMS = ["Available", "Not Checked Out", "Not Charged", "On Shelf"];
      available = 0;
      count = 0;
      branchHash = {};
      items = obj.querySelectorAll(".displayHoldings > div");
      items.forEach(function(data) {
        var branchName, details, rows;
        details = {};
        rows = nodeListToArray(data.querySelectorAll("li"));
        rows.forEach(function(detail) {
          var key, value;
          key = textFromElement(detail.querySelector(".fieldLabelSpan"));
          value = textFromElement(detail.querySelector(".subfieldData"));
          return details[key] = value;
        });
        branchName = details["Location:"];
        branchHash[branchName] = 1;
        count += parseInt(details["Number of Items:"]) || 1;
        if (anyBeginsWith(AVAILABLE_TERMS, details["Status:"])) {
          return available += parseInt(details["Number of Items:"]) || 1;
        }
      });
      data = {
        "estimated": false,
        "count": count,
        "available": available,
        "branches": hashToList(branchHash)
      };
      return data;
    }

  };

  registerDOMOperations(WebVoyageDOMOperations, "webvoyage");

  // END src/catalogs/dom/webvoyage.coffee
  register(WebVoyageLibrary, "webvoyage", null, WebVoyageDOMOperations);

  // END src/catalogs/webvoyage.coffee
  // BEGIN src/catalogs/wheelers.coffee
  WheelersDigitalLibrary = class WheelersDigitalLibrary extends Catalog {
    constructor(name, state, country, id, url, catalogUrl, params, categories) {
      var defaults;
      categories = ["books", "music", "audiobook"];
      defaults = {
        PARALLEL_REQUESTS: 4
      };
      super(name, state, country, id, url, catalogUrl, defaults, params, categories);
      this.newSession = this.newSession.bind(this);
      this.buildSearchUrl = this.buildSearchUrl.bind(this);
      this.parseSearchResults = this.parseSearchResults.bind(this);
      this.version = "ffa32d8ba04c8625e0adb3e0a30a3acf";
      this.description = "Wheelers Digital Catalog";
      this.searchUrl = fromTemplate(urlutils.concat(this.catalogUrl, "/search?query=<%= term|encodeuri %>"));
      this.detailUrl = fromTemplate(urlutils.concat(this.catalogUrl, "/search?query=<%= term|encodeuri %>"));
      this.http = {
        common: {
          xfrm: "html"
        }
      };
      this.domOperations = this.getDomOperations();
      this.allowMultiple = true;
    }

    newSession(request) {
      var me;
      boundMethodCheck(this, WheelersDigitalLibrary);
      return me = this;
    }

    canSearchByIsbn() {
      return false;
    }

    canSearchByIsbn13() {
      return false;
    }

    buildSearchUrl(searchBy, searchTerm, request) {
      var me, url;
      boundMethodCheck(this, WheelersDigitalLibrary);
      me = this;
      url = this.searchUrl({
        term: searchTerm
      });
      return {
        by: searchBy,
        url: url
      };
    }

    async parseSearchResults(response, request) {
      var items;
      boundMethodCheck(this, WheelersDigitalLibrary);
      return items = (await this.domOperations.extractSearchResults(response));
    }

  };

  // BEGIN src/catalogs/dom/wheelers.coffee
  WheelersDOMOperations = class WheelersDOMOperations extends DOMOperations {
    constructor() {
      super(...arguments);
      this.extractSearchResults = this.extractSearchResults.bind(this);
    }

    async extractSearchResults(content) {
      var bindingMap, obj, results;
      boundMethodCheck(this, WheelersDOMOperations);
      obj = (await this.parser(content));
      bindingMap = {
        "epub": "ebook",
        "mp3": "audiobook"
      };
      results = Array.from(obj.querySelectorAll("div.flex-gallery-item")).reduce(function(acc, el) {
        var id_, item, parts;
        item = el.querySelector('.flex-item-details:nth-of-type(1) a');
        parts = /\/title\/([0-9]+)\/([a-z0-9]+)/.exec(item.href);
        id_ = parts[1];
        if (id_) {
          acc.push({
            title: normalizeTitle(item.title),
            author: normalizeAuthor(el.querySelector("span.flex-item-details:nth-of-type(2) a.author")),
            binding: bindingMap[parts[2]] || 'ebook',
            id: id_,
            url: item.href,
            availability: {
              count: 1,
              available: 1,
              estimated: true
            }
          });
        }
        return acc;
      }, []);
      return results;
    }

  };

  registerDOMOperations(WheelersDOMOperations, "wheelers");

  // END src/catalogs/dom/wheelers.coffee
  register(WheelersDigitalLibrary, "wheelers", null, WheelersDOMOperations);

  // END src/catalogs/wheelers.coffee
  // BEGIN src/catalogs/worldcat.coffee
  WorldcatCatalog = class WorldcatCatalog extends Catalog {
    constructor(name, state, country, id, url, catalogUrl, params, categories) {
      var defaults;
      defaults = {
        DATABASE_LIST: null,
        SCOPE: null
      };
      super(name, state, country, id, url, catalogUrl, defaults, params, categories);
      this.buildSearchUrl = this.buildSearchUrl.bind(this);
      this.buildInventoryLookupUrl = this.buildInventoryLookupUrl.bind(this);
      this.version = "6fcb7ab0f7b72d586e70615dd5a3b601";
      this.detailUrl = urlutils.concat(this.catalogUrl, "oclc/##ID##");
      this.searchUrl = fromTemplate(urlutils.concat(this.catalogUrl, "search?<%= qs %>"));
      this.http = {
        common: {
          xfrm: "html"
        },
        inventory: {
          xfrm: 'json'
        }
      };
      this.domOperations = this.getDomOperations();
    }

    buildSearchUrl(searchBy, searchTerm, request) {
      var idxLookup, params, qs;
      boundMethodCheck(this, WorldcatCatalog);
      idxLookup = {
        "isbn": "bn",
        "isbn13": "bn",
        "title": "kw"
      };
      qs = {
        "sortKey": "LIBRARY",
        "queryString": idxLookup[searchBy] + ":(" + searchTerm + ")"
      };
      if (this.defaults.DATABASE_LIST) {
        qs["databaseList"] = this.defaults.DATABASE_LIST;
      }
      if (this.defaults.SCOPE) {
        qs["scope"] = this.defaults.SCOPE;
      }
      params = toQueryString(qs);
      return {
        by: searchBy,
        url: this.searchUrl({
          qs: params
        })
      };
    }

    async parseSearchResults(response, request) {
      var items;
      items = (await this.domOperations.extractSearchResults(response));
      return items;
    }

    buildInventoryLookupUrl(request, item) {
      var dbList, url;
      boundMethodCheck(this, WorldcatCatalog);
      dbList = this.defaults.DATABASE_LIST;
      url = urlutils.concat(this.catalogUrl, "ajax/elink?id=##ID##&dbList=" + dbList).replace("##ID##", item.id);
      return {
        url: url
      };
    }

    parseInventoryLookup(response) {
      var available, count, holdings;
      count = 0;
      available = 0;
      response.ELinksResponse.result.forEach(function(result) {
        if (result.holding) {
          return result.holding.forEach(function(el) {
            var holdingsString, res;
            holdingsString = el.availableHoldings;
            res = /(\d)+ of (\d)+ available/.exec(holdingsString);
            if (res) {
              count += parseInt(res[2]);
              return available += parseInt(res[1]);
            }
          });
        }
      });
      holdings = {
        estimated: false,
        count: count,
        available: available
      };
      return holdings;
    }

  };

  // BEGIN src/catalogs/dom/worldcat.coffee
  WorldcatDOMOperations = class WorldcatDOMOperations extends DOMOperations {
    constructor() {
      super(...arguments);
      this.extractSearchResults = this.extractSearchResults.bind(this);
    }

    async extractSearchResults(content) {
      var formatMap, obj, rows;
      boundMethodCheck(this, WorldcatDOMOperations);
      obj = (await this.parser(content));
      formatMap = {
        "PRINT BOOK": "book",
        "AUDIOBOOK ON CD": "audiobook"
      };
      rows = Array.from(obj.querySelectorAll("ol.results li.record"));
      return rows.reduce(function(acc, row) {
        var author, binding, id_, title;
        id_ = row.dataset["oclcnum"];
        title = textFromElement(row.querySelector("div.title"));
        author = normalizeAuthor(textFromElement(row.querySelector("span.author-string-primary")));
        binding = formatMap[textFromElement(row.querySelector("dd.item-type")).toUpperCase()] || "book";
        acc.push({
          title: title,
          author: author,
          binding: binding,
          id: id_
        });
        return acc;
      }, []);
    }

  };

  registerDOMOperations(WorldcatDOMOperations, "worldcat");

  // END src/catalogs/dom/worldcat.coffee
  register(WorldcatCatalog, "worldcat", null, WorldcatDOMOperations);

  // END src/catalogs/worldcat.coffee
  LibraryConfigurationComparitor = class LibraryConfigurationComparitor {
    static calculateChanges(prev_config, new_config, excluded_fields = []) {
      var fields, rv;
      if (prev_config === void 0 || prev_config === null) {
        return {
          'action': 'added'
        };
      }
      if (new_config === void 0 || new_config === null) {
        return {
          'action': 'deleted'
        };
      }
      if (typeof prev_config === "string" || typeof new_config === "string") {
        if (prev_config !== new_config) {
          return {
            'action': 'updated',
            'new_value': new_config,
            'prev_value': prev_config
          };
        } else {
          return {};
        }
      }
      if (typeof prev_config === "number" || typeof new_config === "number") {
        if (prev_config !== new_config) {
          return {
            'action': 'updated',
            'new_value': new_config,
            'prev_value': prev_config
          };
        } else {
          return {};
        }
      }
      rv = {};
      fields = setutils.union(Object.getOwnPropertyNames(prev_config), Object.getOwnPropertyNames(new_config));
      fields = setutils.difference(fields, excluded_fields);
      fields.forEach(function(el) {
        var changed, obj_fields;
        changed = false;
        obj_fields = rv.fields || [];
        if (!prev_config.hasOwnProperty(el)) {
          obj_fields.push({
            'action': 'added',
            'field': el,
            'new_value': new_config[el]
          });
          changed = true;
        } else if (!new_config.hasOwnProperty(el)) {
          obj_fields.push({
            'action': 'removed',
            'field': el,
            'prev_value': prev_config[el]
          });
          changed = true;
        } else if (LibraryConfigurationComparitor.calculateChanges(prev_config[el], new_config[el]).action) {
          obj_fields.push({
            'action': 'updated',
            'field': el,
            'new_value': new_config[el],
            'prev_value': prev_config[el]
          });
          changed = true;
        }
        if (changed) {
          return rv = Object.assign(rv, {
            'action': 'updated',
            'fields': obj_fields
          });
        }
      });
      return rv;
    }

  };

  LibraryDataCache = class LibraryDataCache {
    constructor(app, browser) {
      this.initialize = this.initialize.bind(this);
      this.clear = this.clear.bind(this);
      this.migrateCacheData = this.migrateCacheData.bind(this);
      this.save = this.save.bind(this);
      this.load = this.load.bind(this);
      this.invalidateLibrary = this.invalidateLibrary.bind(this);
      this.clearInvalidationFlag = this.clearInvalidationFlag.bind(this);
      this.invalidate = this.invalidate.bind(this);
      this.notify = this.notify.bind(this);
      this.updateLibraryDefinition = this.updateLibraryDefinition.bind(this);
      this.getLibraryById = this.getLibraryById.bind(this);
      this.needsLibraryDefinitionRefresh = this.needsLibraryDefinitionRefresh.bind(this);
      this.getLibraryDefinitionFromService = this.getLibraryDefinitionFromService.bind(this);
      this.refreshLibraryDefinition = this.refreshLibraryDefinition.bind(this);
      this.find = this.find.bind(this);
      this.set_cache_data = this.set_cache_data.bind(this);
      this.API_LIBRARY_BASE = urlutils.concat(browser.getMessage("apiRoot"), "/api/library");
      this.app = app;
      this.onLibraryUpdated = [];
      this.onLibraryAdded = [];
      this.onDefinitionsUpdated = [];
      this.data = this.initializeData();
    }

    async initialize() {
      await this.migrateCacheData();
      return (await this.load());
    }

    initializeData() {
      return {
        version: 2,
        libraries: {}
      };
    }

    clear() {
      return this.data = this.initializeData();
    }

    async migrateCacheData() {
      var data, library_id, newData, rawData;
      rawData = (await this.app.localStorageObj.getItem("library_data"));
      rawData = rawData || JSON.stringify(this.initializeData());
      data = JSON.parse(rawData);
      if (data.version >= 2) {
        return;
      }
      newData = this.initializeData();
      for (library_id in data) {
        newData.libraries[library_id] = {
          library: data[library_id]
        };
      }
      return (await this.app.localStorageObj.setItem("library_data", JSON.stringify(newData)));
    }

    async save() {
      return (await this.app.localStorageObj.setItem("library_data", JSON.stringify(this.data)));
    }

    async load() {
      var rawData;
      rawData = (await this.app.localStorageObj.getItem("library_data"));
      rawData = rawData || JSON.stringify(this.initializeData());
      return this.data = JSON.parse(rawData);
    }

    invalidateLibrary(library_id) {
      var library;
      library = this.getLibraryById(library_id);
      return library.invalidated = true;
    }

    clearInvalidationFlag(library_id) {
      var library;
      library = this.getLibraryById(library_id);
      return library.invalidated = void 0;
    }

    invalidate() {
      var library_id, results1;
      results1 = [];
      for (library_id in this.data.libraries) {
        results1.push(this.invalidateLibrary(library_id));
      }
      return results1;
    }

    notify(evt, data) {
      if (this.hasOwnProperty(evt) && Array.isArray(this[evt])) {
        return this[evt].forEach(function(t) {
          return t(data);
        });
      }
    }

    async updateLibraryDefinition(library_id, data) {
      var evt, library;
      evt = "onLibraryAdded";
      if (library_id in this.data.libraries) {
        evt = "onLibraryUpdated";
      }
      library = this.getLibraryById(library_id);
      library.library = data;
      library.lastChecked = this.app.time();
      await this.save();
      return this.notify(evt, library_id);
    }

    getLibraryById(library_id) {
      this.data.libraries[library_id] = this.data.libraries[library_id] || {};
      return this.data.libraries[library_id];
    }

    needsLibraryDefinitionRefresh(library_id) {
      var library;
      library = this.getLibraryById(library_id);
      return !library || library.invalidated || ((library.lastChecked || 0) < (this.app.time() - 86400000));
    }

    getLibraryDefinitionFromService(library_id) {
      var etag, headers, options, result;
      result = {};
      headers = {};
      etag = this.data.libraries[library_id] && this.data.libraries[library_id].library && this.data.libraries[library_id].library.last_updated;
      if (etag) {
        headers["If-None-Match"] = 'W/' + etag;
      }
      options = {
        headers: headers
      };
      return fetch(urlutils.concat(this.API_LIBRARY_BASE, "id/:library_id?c=:cache").replace(":library_id", library_id).replace(":cache", this.app.time()), options).then(function(data) {
        result["status"] = data.status;
        if (data.status === 200) {
          return data.json();
        }
        return null;
      }).then(function(data) {
        if (data) {
          result.data = data;
        }
        return result;
      }).catch(function(ex) {
        return {
          failure: "failed to retrieve latest library data",
          ex: ex
        };
      });
    }

    refreshLibraryDefinition(library_id) {
      var me;
      me = this;
      return new Promise(function(resolve, reject) {
        me.invalidateLibrary(library_id);
        return me.getLibraryDefinitionFromService(library_id).then((async function(res) {
          var library;
          if (res.status === null) {
            reject();
            return;
          }
          library = res.data;
          if (library) {
            library.catalogs.forEach(function(catalog) {
              if (catalog.params === null || typeof catalog.params === "string") {
                return catalog.params = JSON.parse(catalog.params || "{}");
              }
            });
          } else {
            library = me.clearInvalidationFlag(library_id);
            if (Object.keys(me.data.libraries).indexOf(library_id) >= 0) {
              library = me.data.libraries[library_id].library;
            }
          }
          await me.updateLibraryDefinition(library_id, library);
          return resolve({
            library: library,
            cache_data: me.data.libraries[library_id].cache_data || {},
            reason: null
          });
        }));
      });
    }

    find(library_id) {
      if (this.needsLibraryDefinitionRefresh(library_id)) {
        return this.refreshLibraryDefinition(library_id);
      } else {
        return Promise.resolve({
          library: this.data.libraries[library_id].library,
          cache_data: this.data.libraries[library_id].cache_data || {},
          reason: null
        });
      }
    }

    async set_cache_data(library_id, key, value) {
      var cache_data;
      cache_data = this.data.libraries[library_id].cache_data || {};
      cache_data[key] = value;
      this.data.libraries[library_id].cache_data = cache_data;
      return (await this.save());
    }

  };

  initializeInstances = function(app, id, library) {
    if (library === null || library === void 0 || !library.catalogs) {
      logger.warn(`Ignoring unknown library id '${id}'`);
      return null;
    }
    Promise.all(library.catalogs.map(function(catalog) {
      if (!catalogMap.hasOwnProperty(catalog.type)) {
        logger.warn(`Ignoring unknown driver ${catalog.type} for library '${id}'`);
        return null;
      }
      try {
        return initializeCatalog(catalog, library, app, null);
      } catch (error1) {
        return null;
      }
    }));
    app.AllLibraries[id] = library;
    return library;
  };

  initializeCatalog = async function(catalog, library, app, reason) {
    var catalog_id, categories, driver, driverInst, params;
    driver = catalogMap[catalog.type];
    catalog_id = library.id + "_" + catalog.id;
    params = catalog.params || {};
    if (typeof params === "string") {
      params = JSON.parse(params);
    }
    categories = params.categories || ["books"];
    driverInst = new driver(library.name, library.state, library.country, catalog_id, library.url, catalog.url, params, categories);
    if (!driverInst.isSearchable()) {
      logger.info(`Catalog ${library.id}:${catalog.id} is not a usable catalog`);
      return;
    }
    if (catalog.driver) {
      logger.info(`Replacing existing driver implementation for library ${library.id}:${catalog.id}`);
    }
    catalog.driver = driverInst;
    catalog.driver.setApplication(app);
    await catalog.driver.registerEvents();
    catalog.driver.setReason(reason);
    return app.AllCatalogs[catalog_id] = {
      library: library.id,
      driver: catalog.driver
    };
  };

  initializeLibrary = async function(id, app) {
    var credentials, library, libraryConfig, res;
    if (id in specialCatalogs) {
      if (!(id in app.AllLibraries)) {
        libraryConfig = (await app.getJSONConfig("libraries"));
        credentials = ((libraryConfig[id] || {})["1"] || {}).credentials;
        specialCatalogs[id](app, credentials);
      }
      library = app.AllLibraries[id];
      res = {
        library: library,
        id: id
      };
      return Promise.resolve(res);
    }
    return new Promise(function(resolve, reject) {
      var initializeInstancesPartial;
      initializeInstancesPartial = function(res) {
        return initializeInstances(app, id, res.library);
      };
      return app.LibraryDataCache.find(id).then(initializeInstancesPartial, reject).then(function(library) {
        var result;
        result = {
          library: library,
          id: id
        };
        return resolve(result);
      }).catch(reject);
    });
  };

  unitTestable(Library);

  unitTestable(Catalog);

  unitTestable(catalogMap, "catalogMap");

  unitTestable(initializeLibrary);

  unitTestable(initializeInstances);

  unitTestable(LibraryConfigurationComparitor);

  unitTestable(LibraryDataCache);

  // END src/libraries.coffee

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

    // BEGIN src/errors.coffee
  ErrorContext = class ErrorContext {
    constructor(app) {
      this._version = app.browser.extensionVersion;
      this._ts = app.time();
    }

  };

  ErrorManager = (function() {
    class ErrorManager {
      constructor(app1) {
        this.recordError = this.recordError.bind(this);
        this._shouldReportAutomatically = this._shouldReportAutomatically.bind(this);
        this._recordAuditAction = this._recordAuditAction.bind(this);
        this.getReportingPolicy = this.getReportingPolicy.bind(this);
        this._saveReportingPolicy = this._saveReportingPolicy.bind(this);
        this.setReportingPolicy = this.setReportingPolicy.bind(this);
        this.app = app1;
        this.auditor = this.app.getAuditor();
      }

      _reportError(e) {
        return new Promise(function(resolve, reject) {
          return reject();
        });
      }

      recordError(ctx, err) {
        var me;
        me = this;
        return new Promise(function(resolve, reject) {
          var res;
          res = Promise.reject();
          if (me._shouldReportAutomatically()) {
            return me._reportError(err).then(reject);
          }
          return res;
        });
      }

      _shouldReportAutomatically() {
        return this.getReportingPolicy().policy === this.POLICY_ON_INCIDENT;
      }

      _recordAuditAction(msg) {
        return this.auditor.report(this.SERVICE_NAME, msg);
      }

      getReportingPolicy() {
        var policy;
        policy = this.app.getJSONConfig(this.SERVICE_NAME).policy;
        return policy || {
          configured: false,
          policy: this.POLICY_ON_USER_ACTION
        };
      }

      _saveReportingPolicy(newPolicy) {
        var cfg, policy;
        cfg = this.app.getJSONConfig(this.SERVICE_NAME);
        policy = cfg.policy || {};
        policy.ts = this.app.time();
        policy.configured = true;
        policy.policy = newPolicy;
        cfg = Object.assign(cfg, {
          policy: policy
        });
        return this.app.setJSONConfig(this.SERVICE_NAME, cfg);
      }

      setReportingPolicy(policy) {
        var valid_policies;
        valid_policies = [this.POLICY_ON_INCIDENT, this.POLICY_ON_USER_ACTION];
        if (valid_policies.indexOf(policy) < 0) {
          this._recordAuditAction(`Rejected invalid ErrorManager policy to ${policy}`);
          return null;
        }
        this._recordAuditAction(`Setting ErrorManager policy to ${policy}`);
        return this._saveReportingPolicy(policy);
      }

    };

    ErrorManager.prototype.SERVICE_NAME = "ErrorManager";

    ErrorManager.prototype.POLICY_ON_INCIDENT = "on_incident";

    ErrorManager.prototype.POLICY_ON_USER_ACTION = "on_user_action";

    return ErrorManager;

  }).call(this);

  unitTestable(ErrorContext);

  unitTestable(ErrorManager);

  // END src/errors.coffee
  _maxWriteReviewDisplayPerSession = 5;

  _maxSessionsPromptReviewMode = 10;

  LibraryResults = class LibraryResults {
    constructor(libraryName, data1) {
      this.setStatus = this.setStatus.bind(this);
      this.setDetailUrl = this.setDetailUrl.bind(this);
      this.setData = this.setData.bind(this);
      this.setHoldsRemaining = this.setHoldsRemaining.bind(this);
      this.setLibrarySystemName = this.setLibrarySystemName.bind(this);
      this.toJSON = this.toJSON.bind(this);
      this.libraryName = libraryName;
      this.data = data1;
      return;
    }

    setStatus(status1) {
      this.status = status1;
    }

    setDetailUrl(url1) {
      this.url = url1;
    }

    setData(data1) {
      this.data = data1;
    }

    setHoldsRemaining(holdsInfo) {
      this.holdsInfo = holdsInfo;
    }

    setLibrarySystemName(librarySystemName) {
      this.librarySystemName = librarySystemName;
    }

    toJSON() {
      var res;
      res = {
        name: "libraryResults",
        status: this.status,
        catalog_id: this.libraryName,
        url: this.url,
        data: this.data,
        accountHolds: this.holdsInfo,
        librarySystemName: this.librarySystemName
      };
      if (this.failureReason) {
        res.status = "failure";
        res.failureReason = this.failureReason;
      }
      return res;
    }

  };

  LibrarySummary = class LibrarySummary {
    static async fromLibrary(l, app) {
      var isCatalogEnabled, promised, result;
      isCatalogEnabled = (await app.areCatalogsEnabledHelper());
      result = {
        "id": l.id,
        "name": l.name,
        "url": l.url,
        "stateCode": l.state,
        "countryCode": l.country,
        "state": l.state && (await app.stateByCode(l.state, l.country)),
        "country": (await app.countryByCode(l.country)),
        "catalogs": []
      };
      result.catalogs = promised = l.catalogs.reduce(function(acc, catalog) {
        var item;
        if (!catalog.driver) {
          return acc;
        }
        item = {
          id: l.id + "_" + catalog.id,
          name: catalog.driver && catalog.driver.description,
          librarySystemName: catalog.driver.librarySystemName,
          url: catalog.driver.getCatalogUrl(),
          enabled: isCatalogEnabled(l.id, catalog.id),
          permissions_enabled: true,
          logo: catalog.driver && catalog.driver.getResultsLogo(),
          categories: catalog.driver.categories
        };
        if (catalog.driver.supportsAuthentication()) {
          item = Object.assign(item, {
            authentication: {
              isAuthenticated: catalog.driver.isAuthenticated(),
              username: catalog.driver.getUsername(),
              authenticationFields: catalog.driver.getAuthenticationFields()
            }
          });
        }
        acc.push(item);
        return acc;
      }, []);
      return result;
    }

  };

  Dispatch = class Dispatch {
    constructor(app) {
      this.getConfigSettings = this.getConfigSettings.bind(this);
      this.setDebugLibrary = this.setDebugLibrary.bind(this);
      this.registerEvent = this.registerEvent.bind(this);
      this.pause = this.pause.bind(this);
      this.unpause = this.unpause.bind(this);
      this.isPaused = this.isPaused.bind(this);
      this.addLibrary = this.addLibrary.bind(this);
      this.refreshLibraries = this.refreshLibraries.bind(this);
      this.removeLibrary = this.removeLibrary.bind(this);
      this.reorderLibrary = this.reorderLibrary.bind(this);
      this.logoutCatalog = this.logoutCatalog.bind(this);
      this.loginForCatalog = this.loginForCatalog.bind(this);
      this.setCatalogState = this.setCatalogState.bind(this);
      this.queryLibraryForAdd = this.queryLibraryForAdd.bind(this);
      this.update_libraries = this.update_libraries.bind(this);
      this.getCountries = this.getCountries.bind(this);
      this.getRegionsForCountry = this.getRegionsForCountry.bind(this);
      this.getLibrarySummary = this.getLibrarySummary.bind(this);
      this.supportus_followed = this.supportus_followed.bind(this);
      this.review_followed = this.review_followed.bind(this);
      this.hoopla_add = this.hoopla_add.bind(this);
      this.recentUpdate_followed = this.recentUpdate_followed.bind(this);
      this.message_followed = this.message_followed.bind(this);
      this.releaseNotes_followed = this.releaseNotes_followed.bind(this);
      this.survey_followed = this.survey_followed.bind(this);
      this.hold_followed = this.hold_followed.bind(this);
      this.register = this.register.bind(this);
      this.startCatalogSearch = this.startCatalogSearch.bind(this);
      this.measure = this.measure.bind(this);
      this.update_library_data_now = this.update_library_data_now.bind(this);
      this.set_debug_flag = this.set_debug_flag.bind(this);
      this.get_last_library_data_fetch = this.get_last_library_data_fetch.bind(this);
      this.get_library_link_default_setting = this.get_library_link_default_setting.bind(this);
      this.get_search_mode_setting = this.get_search_mode_setting.bind(this);
      this.set_search_mode_setting = this.set_search_mode_setting.bind(this);
      this.set_library_link_default_setting = this.set_library_link_default_setting.bind(this);
      this.version_check = this.version_check.bind(this);
      this.config_isDebugMode = this.config_isDebugMode.bind(this);
      this.config_readConfig = this.config_readConfig.bind(this);
      this.config_saveConfig = this.config_saveConfig.bind(this);
      this.config_getJSONConfig = this.config_getJSONConfig.bind(this);
      this.config_setJSONConfig = this.config_setJSONConfig.bind(this);
      this.config_getSettingsConfig = this.config_getSettingsConfig.bind(this);
      this.config_setSettingsConfig = this.config_setSettingsConfig.bind(this);
      this.requestPermission = this.requestPermission.bind(this);
      this.removePermission = this.removePermission.bind(this);
      this.hasPermission = this.hasPermission.bind(this);
      this.hasPermissions = this.hasPermissions.bind(this);
      this.setSiteEnabled = this.setSiteEnabled.bind(this);
      this.isSiteEnabledForUrl = this.isSiteEnabledForUrl.bind(this);
      this.isSiteEnabledForUrls = this.isSiteEnabledForUrls.bind(this);
      this.app = app;
      this.searchId = CounterFactory("search", 1);
    }

    async getConfigSettings(r) {
      return (await this.app.getConfigSettings());
    }

    setDebugLibrary(request) {
      var me;
      me = this;
      return new Promise(async function(resolve, reject) {
        var libraryConfig;
        libraryConfig = (await me.app.getJSONConfig("libraries"));
        libraryConfig.enabled_libraries = [request.data.libraryId];
        libraryConfig[request.data.libraryId] = {
          0: {
            enabled: true
          },
          1: {
            enabled: true
          }
        };
        await me.app.setJSONConfig("libraries", libraryConfig);
        return resolve({
          status: "ok"
        });
      });
    }

    registerEvent(request) {
      var me;
      me = this;
      return new Promise(function(resolve, reject) {
        me.app.registerEvent(request.event, request.sender);
        return resolve();
      });
    }

    async pause(request) {
      await this.app.setPausedSetting(true);
      return {
        status: "ok"
      };
    }

    async unpause(request) {
      await this.app.setPausedSetting(false);
      return {
        status: "ok"
      };
    }

    async isPaused(request) {
      var state;
      state = (await this.app.getPausedSetting());
      return {
        action: "isPaused",
        status: state
      };
    }

    addLibrary(request) {
      var enableLibrariesAndGetUrls, libraryId, me, promises;
      me = this;
      enableLibrariesAndGetUrls = async function(libraries) {
        var libraryConfig, newLibraryUrls;
        newLibraryUrls = [];
        libraryConfig = (await me.app.getJSONConfig("libraries"));
        libraryConfig.enabled_libraries = libraryConfig.enabled_libraries || [];
        if (request.data.action === "replace") {
          libraryConfig.enabled_libraries = [];
        }
        libraries.forEach(function(row) {
          var catalogSettings, inList, library;
          if (!row) {
            logger.warn("warn: null row found");
            return;
          }
          library = row.library;
          if (!library) {
            return;
          }
          inList = me.app.libraries.find(function(el) {
            return el.id === row.id;
          });
          if (!inList) {
            me.app.libraries.push(library);
          }
          if (libraryConfig.enabled_libraries.includes(library.libraryId)) {
            return;
          }
          catalogSettings = [];
          library.catalogs.forEach(function(catalog) {
            catalogSettings[catalog.id] = {
              enabled: true
            };
            return newLibraryUrls.push(urlutils.concat(catalog.url, "*"));
          });
          libraryConfig[row.id] = Object.assign(libraryConfig[row.id] || {}, catalogSettings);
          if (!libraryConfig.enabled_libraries.includes(row.id)) {
            return libraryConfig.enabled_libraries.push(row.id);
          }
        });
        await me.app.setJSONConfig("libraries", libraryConfig);
        return newLibraryUrls;
      };
      libraryId = request.data.library_id;
      if (!Array.isArray(libraryId)) {
        libraryId = [libraryId];
      }
      promises = [];
      libraryId.forEach(function(id) {
        return promises.push(initializeLibrary(id, me.app));
      });
      return Promise.all(promises).then(enableLibrariesAndGetUrls).then(function(newLibraryUrls) {
        var cb_res;
        cb_res = {
          ok: true
        };
        if (newLibraryUrls.length === 0) {
          return cb_res;
        }
        return me.update_libraries(request).then(function(res) {
          cb_res.config = res;
          return cb_res;
        });
      });
    }

    refreshLibraries(request) {
      var libraryId, me, promises;
      me = this;
      libraryId = request.data.library_id;
      if (!Array.isArray(libraryId)) {
        libraryId = [libraryId];
      }
      promises = [];
      libraryId.forEach(function(id) {
        return promises.push(initializeLibrary(id, me.app));
      });
      return Promise.all(promises).then(function() {
        var cb_res;
        cb_res = {
          ok: true
        };
        return me.update_libraries(request).then(function(res) {
          cb_res.config = res;
          return cb_res;
        });
      });
    }

    async removeLibrary(request) {
      var app, cb_res, isCatalogEnabled, libraryConfig, libraryIds, me, permissionsInEffect, urls;
      me = this;
      app = me.app;
      isCatalogEnabled = (await app.areCatalogsEnabledHelper());
      libraryIds = request.data.library_id;
      if (!Array.isArray(libraryIds)) {
        libraryIds = [libraryIds];
      }
      libraryConfig = (await app.getJSONConfig("libraries"));
      libraryConfig.enabled_libraries = libraryConfig.enabled_libraries || [];
      libraryIds = libraryIds.filter(function(el) {
        return libraryConfig.enabled_libraries.indexOf(el) >= 0;
      });
      permissionsInEffect = {};
      libraryConfig.enabled_libraries.forEach(async function(libraryId) {
        var library, thisLibrary;
        library = app.AllLibraries[libraryId];
        if (library) {
          thisLibrary = (await LibrarySummary.fromLibrary(library, app));
          return thisLibrary.catalogs.forEach(function(el) {
            if (isCatalogEnabled(libraryId, el.type)) {
              permissionsInEffect[urlutils.concat(el.url, "*")] = permissionsInEffect[urlutils.concat(el.url, "*")] || 0;
              return permissionsInEffect[urlutils.concat(el.url, "*")] += 1;
            }
          });
        }
      });
      libraryIds.forEach(async function(libraryId) {
        var thisLibrary;
        libraryConfig.enabled_libraries.splice(libraryConfig.enabled_libraries.indexOf(libraryId), 1);
        thisLibrary = (await LibrarySummary.fromLibrary(app.AllLibraries[libraryId], app));
        return thisLibrary.catalogs.forEach(function(el) {
          if (isCatalogEnabled(libraryId, el.type)) {
            permissionsInEffect[urlutils.concat(el.url, "*")] = permissionsInEffect[urlutils.concat(el.url, "*")] || 0;
            return permissionsInEffect[urlutils.concat(el.url, "*")] -= 1;
          }
        });
      });
      urls = [];
      Object.keys(permissionsInEffect).forEach(function(libraryId) {
        if (permissionsInEffect[libraryId] <= 0) {
          return urls.push(libraryId);
        }
      });
      if (urls.length > 0) {
        me.removePermission({
          data: {
            url: urls
          }
        }, function(res) {});
      }
      await app.setJSONConfig("libraries", libraryConfig);
      cb_res = {
        ok: true,
        config: libraryConfig
      };
      return Promise.resolve(cb_res);
    }

    async reorderLibrary(request) {
      var app, libraryConfig, libraryId, me, position, relativeMove, res;
      me = this;
      app = me.app;
      libraryId = request.data.library_id;
      relativeMove = request.data.relative_move;
      libraryConfig = (await app.getJSONConfig("libraries"));
      libraryConfig.enabled_libraries = libraryConfig.enabled_libraries || [];
      position = libraryConfig.enabled_libraries.indexOf(libraryId) + relativeMove;
      if (position < 0) {
        position = 0;
      }
      if (position > libraryConfig.enabled_libraries.length - 1) {
        position = libraryConfig.enabled_libraries.length - 1;
      }
      libraryConfig.enabled_libraries = libraryConfig.enabled_libraries.reduce(function(acc, el) {
        if (acc.idx === position) {
          acc.result.push(libraryId);
          acc.idx += 1;
        }
        if (el !== libraryId) {
          acc.result.push(el);
          acc.idx += 1;
        }
        if (acc.idx === position) {
          acc.result.push(libraryId);
          acc.idx += 1;
        }
        return acc;
      }, {
        idx: 0,
        result: []
      }).result;
      await app.setJSONConfig("libraries", libraryConfig);
      res = {
        ok: true,
        config: libraryConfig
      };
      return res;
    }

    async logoutCatalog(request) {
      var driver, id_, libraryConfig, me, res;
      me = this;
      driver = request.catalog.driver;
      res = (await driver.logout());
      libraryConfig = (await me.app.getJSONConfig("libraries"));
      id_ = driver.libraryId.substr(driver.libraryId.indexOf("_") + 1);
      libraryConfig[request.catalog.library][id_]["credentials"] = void 0;
      await me.app.setJSONConfig("libraries", libraryConfig);
      return true;
    }

    async loginForCatalog(request) {
      var driver, id_, libraryConfig, me, res;
      me = this;
      driver = request.catalog.driver;
      res = (await driver.login(request.data.username, request.data.password));
      driver.setCredentials(res);
      libraryConfig = (await me.app.getJSONConfig("libraries"));
      id_ = driver.libraryId.substr(driver.libraryId.indexOf("_") + 1);
      libraryConfig[request.catalog.library][id_]["credentials"] = res;
      await me.app.setJSONConfig("libraries", libraryConfig);
      return true;
    }

    setCatalogState(request) {
      return this.app.setCatalogState(request.data);
    }

    queryLibraryForAdd(request) {
      var checkLibraryInitializationCompleteCallback, library, me;
      me = this;
      checkLibraryInitializationCompleteCallback = async function(result) {
        if (result.library != null) {
          result = {
            status: "add_library_confirmation",
            library: (await LibrarySummary.fromLibrary(result.library, me.app))
          };
          return Promise.resolve(result);
        }
      };
      library = request.data;
      return initializeLibrary(library, this.app).then(checkLibraryInitializationCompleteCallback);
    }

    filterLibraryForCategory(category, librarySummary) {
      return librarySummary.reduce(function(acc, library) {
        if (library.catalogs.find(function(catalog) {
          return (catalog.categories || []).indexOf(category) >= 0 || category === "book";
        })) {
          acc = acc.concat(library);
        }
        return acc;
      }, []);
    }

    async update_libraries(request) {
      var enabled_libraries, filterByCategory, librarySummary, me, result;
      result = {
        config: {
          debug: (await this.app.isDebugMode()),
          paused: false, // @app.getPauseSetting()
          showBindingIcons: (await this.app.getBindingIconSetting()),
          searchMode: (await this.app.getSearchModeSetting()),
          bindingFilter: (await this.app.getBindingFilter()),
          sellmode: (await this.app.inSellMode())
        },
        status: "config_ready"
      };
      me = this;
      filterByCategory = function(librarySummary) {
        if (request.request && request.request.category) {
          return me.filterLibraryForCategory(request.request.category, librarySummary);
        }
        return librarySummary;
      };
      if (result.config.sellmode) {
        return result;
      } else {
        enabled_libraries = (await this.app.setLibraryFromConfig());
        librarySummary = (await this.getLibrarySummary({
          enabled_libraries: enabled_libraries
        }).then(filterByCategory));
        result = Object.assign(result, {
          libraries: librarySummary
        });
        return result;
      }
    }

    async getCountries(req) {
      var me;
      me = this;
      return (await me.app.getCountries());
    }

    async getRegionsForCountry(req) {
      var me;
      me = this;
      return (await me.app.getRegionsForCountry(req.data.countryCode));
    }

    async getLibrarySummary(req) {
      var config, def_link_display, enabled_libraries, librarySummary, link_display_mode, me, res, result;
      me = this;
      res = (await me.get_library_link_default_setting());
      link_display_mode = res.status;
      config = (await me.app.getJSONConfig("libraries"));
      enabled_libraries = req.enabled_libraries || (config && config.enabled_libraries) || [];
      librarySummary = (await Promise.all(enabled_libraries.map(async function(l) {
        var library;
        library = me.app.AllLibraries[l];
        if (!library) {
          library = (await initializeLibrary(l, me.app));
        }
        if (!library) {
          logger.warn("warn: null row found for " + l);
          return null;
        }
        return LibrarySummary.fromLibrary(library, me.app);
      }, [])));
      librarySummary = librarySummary.reduce(function(acc, el) {
        if (el) {
          acc.push(el);
        }
        return acc;
      }, []);
      def_link_display = {
        link_display_mode: link_display_mode || "website_url"
      };
      result = librarySummary.map(function(el) {
        return Object.assign({}, def_link_display, el);
      });
      return result;
    }

    async supportus_followed(request) {
      var dataParts, key, supportData;
      dataParts = request.data.name.split(":");
      supportData = (await this.app.getJSONConfig("supportus"));
      if (dataParts[1].indexOf("dismiss") >= 0) {
        key = "dismissed";
      } else {
        key = "followed";
      }
      supportData[key] = this.app.time();
      await this.app.setJSONConfig("supportus", supportData);
      return Promise.resolve();
    }

    async review_followed(request) {
      var dataParts, key, reviewData;
      dataParts = request.data.name.split(":");
      reviewData = (await this.app.getJSONConfig("review"));
      if (dataParts[1].indexOf("dismiss") >= 0) {
        key = "dismissed";
      } else {
        key = "followed";
      }
      reviewData[key] = this.app.time();
      await this.app.setJSONConfig("review", reviewData);
      return Promise.resolve();
    }

    async hoopla_add(request) {
      var addRequest, dataParts, key, no_op, settings;
      dataParts = request.data.name.split(":");
      settings = (await this.app.getJSONConfig("settings"));
      if (dataParts[1].indexOf("dismiss") >= 0) {
        key = "dismissed";
        settings.hooplaPromoNotification.dismissed = this.app.time();
        await this.app.setJSONConfig("settings", settings);
      } else {
        key = "added";
        settings.hooplaPromoNotification.clicked = this.app.time();
        await this.app.setJSONConfig("settings", settings);
        no_op = function() {};
        addRequest = {
          data: {
            library_id: ["hoopla"]
          }
        };
        this.addLibrary(addRequest, no_op);
      }
      return Promise.resolve();
    }

    async recentUpdate_followed(request) {
      var dataParts, key, lastUpdated, libraryId, settings;
      dataParts = request.data.name.split(":");
      settings = (await this.app.getJSONConfig("settings"));
      if (dataParts[1].indexOf("dismiss") >= 0) {
        key = "dismissed";
      } else {
        lastUpdated = settings.lastLibrarySettingsUpdated;
        libraryId = settings.lastLibrarySettingsUpdatedId;
        settings["click-" + libraryId + "-" + lastUpdated] = true;
        await this.app.setJSONConfig("settings", settings);
        key = "followed";
      }
      return Promise.resolve();
    }

    async message_followed(request) {
      var dataParts, key, messages, this_message;
      dataParts = request.data.name.split(":");
      if (dataParts[1].indexOf("dismiss") >= 0) {
        key = "dismissed";
      } else {
        key = "followed";
      }
      messages = (await this.app.getJSONConfig("messages"));
      messages = messages || {};
      this_message = messages[dataParts[0]] || {};
      this_message[key] = this.app.time();
      messages[dataParts[0]] = this_message;
      await this.app.setJSONConfig("messages", messages);
      return Promise.resolve();
    }

    async releaseNotes_followed(request) {
      var settings;
      settings = (await this.app.getJSONConfig("settings"));
      settings["click-releaseNotes-" + this.app.browser.extensionVersion] = true;
      await this.app.setJSONConfig("settings", settings);
      return Promise.resolve();
    }

    async survey_followed(request) {
      var data, surveyData, surveyId;
      data = request.data.name.split(":");
      surveyId = data[1];
      surveyData = (await this.app.getJSONConfig("surveys"));
      surveyData[surveyId] = this.app.time();
      await this.app.setJSONConfig("surveys", surveyData);
      return Promise.resolve();
    }

    hold_followed(request) {
      var dataParts;
      dataParts = request.data.name.split(":");
      this.app.trackBorrowClickTime(request.data.library);
      return Promise.resolve();
    }

    async register(request) {
      var me, res, supportStyle;
      me = this;
      res = {
        config: {
          debug: (await me.app.isDebugMode()),
          paused: (await me.app.getPausedSetting()),
          searchMode: request.searchMode || (await me.app.getSearchModeSetting()),
          bindingFilter: (await me.app.getBindingFilter())
        },
        messages: []
      };
      if (res.config.searchMode === "on-demand") {
        res = Object.assign(res, {
          status: "wait_for_demand"
        });
        return res;
      }
      if (res.config.paused) {
        res = Object.assign(res, {
          status: "paused"
        });
        return res;
      }
      if (res.config.sellmode) {
        return res;
      }
      if ((await me.app.inReviewMode())) {
        await me.app.sessionStorageObj.setItem("support_style", "b");
        supportStyle = (await me.app.sessionStorageObj.setItem("support_style", "c"));
        res = Object.assign(res, {
          review: {
            writereview: true,
            supportStyle: supportStyle
          }
        });
      } else {
        res = (await me.app.notifyAnyReleaseNotes(res));
        res = (await me.app.notifyEverandMigration(res));
        res = (await me.app.notifyCloudLibraryUpdate(res));
      }
      return res;
    }

    async startCatalogSearch(request) {
      var catalogs, data, me, res;
      me = this;
      res = (await me.update_libraries(request));
      data = request.request;
      if (data === void 0) {
        return res;
      }
      data.catalogs = {};
      data.reply = request.reply;
      catalogs = ((await me.app.getEnabledCatalogs())).reduce(function(acc, catalog) {
        acc.drivers.push(catalog[1].driver);
        acc.ids.push(catalog[0]);
        return acc;
      }, {
        ids: [],
        drivers: []
      });
      catalogs.drivers.map(async function(driver) {
        var catalogRequest, ctx, libraryInfo;
        ctx = new LibraryResults(driver.libraryId, {});
        catalogRequest = Object.assign({}, data, {
          searchId: me.searchId(),
          context: ctx
        });
        catalogRequest.start = function(resp) {
          return catalogRequest.reply(Object.assign(resp, {
            status: 'searching'
          }));
        };
        catalogRequest.finish = function() {
          return catalogRequest.reply(catalogRequest.context);
        };
        libraryInfo = (await driver.getLibraryInformation());
        if (libraryInfo) {
          ctx.setLibrarySystemName(libraryInfo.librarySystemName);
          await driver.refreshHoldsRemaining(ctx);
        }
        driver.searchHoldings(catalogRequest);
        return catalogRequest;
      });
      return Object.assign(res, {
        status: "searching",
        data: catalogs.ids
      });
    }

    measure(request) {
      var me, singleActionMap;
      me = this;
      singleActionMap = {
        supportus: me.supportus_followed,
        review: me.review_followed,
        survey: me.survey_followed,
        hold: me.hold_followed,
        recentUpdate: me.recentUpdate_followed,
        releaseNotes: me.releaseNotes_followed,
        hooplaAvailable: me.hoopla_add
      };
      return new Promise(function(resolve, reject) {
        var actionName, dataParts, exc;
        try {
          dataParts = request.data.name.split(":");
          actionName = dataParts[0];
          if (dataParts.length === 3) {
            return resolve();
          }
          if (singleActionMap.hasOwnProperty(actionName)) {
            return singleActionMap[actionName](request).then(resolve);
          } else {
            return me.message_followed(request).then(resolve);
          }
        } catch (error1) {
          exc = error1;
          logger.exception("Exception measuring action", exc);
          reject(exc);
        }
        return reject("no action executed");
      });
    }

    update_library_data_now(req) {
      var me;
      me = this;
      return this.app.backgroundRefresh.run().then(function() {
        return me.get_last_library_data_fetch(req);
      });
    }

    async set_debug_flag(req) {
      var settings;
      logger.info("Setting debug flag " + req.data.flag);
      settings = (await this.app.getJSONConfig("settings"));
      settings[req.data.flag] = true;
      return (await this.app.setJSONConfig("settings", settings));
    }

    get_last_library_data_fetch(req) {
      return Promise.resolve({
        action: "library_data",
        nextRefresh: this.app.backgroundRefresh.getNextCheck(),
        lastRefresh: this.app.backgroundRefresh.getLastCheck()
      });
    }

    get_library_link_default_setting(req) {
      var resp;
      resp = {
        action: "get_library_link_default_setting.response",
        status: null
      };
      return this.app.getJSONConfig("settings").then(function(val) {
        resp.status = val.library_link_default_setting || null;
        return resp;
      });
    }

    get_search_mode_setting(req) {
      var resp;
      resp = {
        action: "get_search_mode_setting.response",
        status: null
      };
      return this.app.getSearchModeSetting().then(function(mode) {
        resp.status = mode;
        return resp;
      });
    }

    set_search_mode_setting(req) {
      var resp, status;
      resp = "set_search_mode_setting.response";
      status = req.data;
      return this.app.setSearchModeSetting(req.data).then(function() {
        return resp;
      });
    }

    set_library_link_default_setting(req) {
      var me, newValue, resp, validValues;
      me = this;
      resp = {
        action: "set_library_link_default_setting.response",
        status: false
      };
      newValue = req.data;
      validValues = ["catalog_url", "library_url"];
      if (validValues.indexOf(newValue) < 0) {
        return Promise.resolve(resp);
      }
      return me.app.setLibraryLinkDefaultSetting(newValue || null).then(function(setting) {
        resp.status = setting;
        return resp;
      });
    }

    version_check(req) {
      var compareVersion, extensionVersion, me, versionUrl;
      me = this;
      extensionVersion = this.app.browser.extensionVersion;
      compareVersion = function(versionA, versionB) {
        var a, b, versionAComponents, versionBComponents;
        versionAComponents = versionA.split(".");
        versionBComponents = versionB.split(".");
        while (versionAComponents.length > 0) {
          a = parseInt(versionAComponents.shift());
          b = parseInt(versionBComponents.shift());
          if (a > b) {
            return 1;
          } else if (b > a) {
            return -1;
          }
        }
        return 0;
      };
      versionUrl = urlutils.concat(this.app.browser.getMessage("apiRoot"), "/api/v1/version");
      return fetch(versionUrl).then(function(version_resp) {
        if (version_resp.ok) {
          return version_resp.json();
        } else {
          return {
            status: "error"
          };
        }
      }).then(function(data) {
        var response, status;
        response = function(state) {
          return {
            state: state,
            version: extensionVersion
          };
        };
        if (data.status === "error") {
          return response("error");
        } else {
          status = compareVersion(extensionVersion, data.version);
          if (status < 0) {
            return response("new_version");
          } else {
            return response("ok");
          }
        }
      }).catch(function(ex) {
        return {
          state: "error",
          version: extensionVersion,
          exception: ex
        };
      });
    }

    config_isDebugMode(req) {
      return this.app.isDebugMode();
    }

    config_readConfig(req) {
      return this.app.getConfig(req.data.key, req.data.default);
    }

    config_saveConfig(req) {
      return this.app.setConfig(req.data.key, req.data.value);
    }

    config_getJSONConfig(req) {
      return this.app.getJSONConfig(req.data.key);
    }

    config_setJSONConfig(req) {
      return this.app.setJSONConfig(req.data.key, req.data.value);
    }

    config_getSettingsConfig(req) {
      return this.app.getConfigValue(req.data.key);
    }

    config_setSettingsConfig(req) {
      return this.app.setConfigValue(req.data.key, req.data.value);
    }

    requestPermission(request) {
      return this.app.SiteManager.requestPermission(request.data.url);
    }

    removePermission(request) {
      return this.app.SiteManager.removePermission(request.data.url);
    }

    hasPermission(request) {
      return this.app.SiteManager.hasPermission(request.data.url);
    }

    hasPermissions(request) {
      return this.app.SiteManager.hasPermissions(request.data.urls);
    }

    setSiteEnabled(request) {
      var me;
      me = this;
      return this.app.SiteManager.setSiteEnabled(request.data.site_id, request.data.state).then(function(res) {
        me.app.notifyEvent("siteChanged", null);
        return res;
      });
    }

    isSiteEnabledForUrl(request) {
      return this.app.SiteManager.isSiteEnabledForUrl(request.data.url);
    }

    isSiteEnabledForUrls(request) {
      return this.app.SiteManager.isSiteEnabledForUrls(request.data.urls);
    }

  };

  BackgroundRefresh = class BackgroundRefresh {
    constructor(app) {
      this.getNextCheck = this.getNextCheck.bind(this);
      this.getLastCheck = this.getLastCheck.bind(this);
      this.run = this.run.bind(this);
      this.refreshLibraries = this.refreshLibraries.bind(this);
      this.setupTimer = this.setupTimer.bind(this);
      this.refreshInterval = 1000 * 60 * 60 * 13;
      this.lastCheckTime = null; // this may come from persistent storage?
      this.nextCheckTime = null;
      this.timerId = null;
      this.app = app;
      this.run(true);
    }

    getNextCheck() {
      if (this.nextCheckTime) {
        return this.nextCheckTime.getTime();
      }
      return null;
    }

    getLastCheck() {
      if (this.lastCheckTime) {
        return this.lastCheckTime;
      }
      return null;
    }

    run(skipRefresh) {
      var me;
      me = this;
      return new Promise(function(resolve) {
        var next;
        if (me.timerId) {
          clearInterval(me.timerId);
        }
        next = Promise.resolve();
        if (!skipRefresh) {
          next = me.refreshLibraries();
        }
        return next.then(me.setupTimer).then(resolve);
      });
    }

    async refreshLibraries() {
      var data, me;
      me = this;
      me.app.resetCache();
      data = (await this.app.getJSONConfig("libraries"));
      return Promise.all(data.enabled_libraries && data.enabled_libraries.reduce(function(acc, library_id) {
        me.app.LibraryDataCache.invalidateLibrary(library_id);
        acc.push(initializeLibrary(library_id, me.app));
        return acc;
      }, []) || []);
    }

    setupTimer() {
      this.nextCheckTime = new Date();
      this.nextCheckTime.setTime(this.app.time() + this.refreshInterval);
      logger.debug("Next library configuration check scheduled for " + this.nextCheckTime.toLocaleString());
      return this.timerId = setInterval(this.run, this.refreshInterval);
    }

  };

  BackgroundApplication = class BackgroundApplication {
    constructor(browser, backgroundRefreshCls, localStorageObj, sessionStorageObj, opts) {
      var defineConfigGetterSetter, me;
      this.resetCache = this.resetCache.bind(this);
      this.initialize = this.initialize.bind(this);
      this.time = this.time.bind(this);
      this.registerEvent = this.registerEvent.bind(this);
      this.notifyEvent = this.notifyEvent.bind(this);
      this.notifyAll = this.notifyAll.bind(this);
      this.updateBadgeForSites = this.updateBadgeForSites.bind(this);
      this.getEnabledCatalogs = this.getEnabledCatalogs.bind(this);
      this.replaceLibrary = this.replaceLibrary.bind(this);
      this.libraryUpdated = this.libraryUpdated.bind(this);
      this.setConfigValue = this.setConfigValue.bind(this);
      this.getConfigValue = this.getConfigValue.bind(this);
      this.migrateStateAndCountry = this.migrateStateAndCountry.bind(this);
      this.migrateEverandConfiguration = this.migrateEverandConfiguration.bind(this);
      this.migrateLibraryConfiguration = this.migrateLibraryConfiguration.bind(this);
      this.enableDefaultSites = this.enableDefaultSites.bind(this);
      this.migrateLegacyConfigurationToJSON = this.migrateLegacyConfigurationToJSON.bind(this);
      this.migrateLibraryIdentifiers = this.migrateLibraryIdentifiers.bind(this);
      this.checkUpgrade = this.checkUpgrade.bind(this);
      this.performConfigMigration = this.performConfigMigration.bind(this);
      this.eligibleForSurvey = this.eligibleForSurvey.bind(this);
      this.trackInstallTime = this.trackInstallTime.bind(this);
      this.trackBorrowClickTime = this.trackBorrowClickTime.bind(this);
      this.inSellMode = this.inSellMode.bind(this);
      this.isDebugMode = this.isDebugMode.bind(this);
      this.getDebugHost = this.getDebugHost.bind(this);
      this.inReviewMode = this.inReviewMode.bind(this);
      this.getConfiguredCatalogs = this.getConfiguredCatalogs.bind(this);
      this.areCatalogsEnabledHelper = this.areCatalogsEnabledHelper.bind(this);
      this.setCatalogState = this.setCatalogState.bind(this);
      this.setLibraryFromConfig = this.setLibraryFromConfig.bind(this);
      this.getConfigSettings = this.getConfigSettings.bind(this);
      this.getConfig = this.getConfig.bind(this);
      this.setConfig = this.setConfig.bind(this);
      this.getJSONConfig = this.getJSONConfig.bind(this);
      this.setJSONConfig = this.setJSONConfig.bind(this);
      this.notifyAnyReleaseNotes = this.notifyAnyReleaseNotes.bind(this);
      this.notifyAnyLibraryUpdates = this.notifyAnyLibraryUpdates.bind(this);
      this.notifyEverandMigration = this.notifyEverandMigration.bind(this);
      this.notifyCloudLibraryUpdate = this.notifyCloudLibraryUpdate.bind(this);
      this.onMessage = this.onMessage.bind(this);
      this.filterMessages = this.filterMessages.bind(this);
      this.create_failure_data = this.create_failure_data.bind(this);
      this.report_failure = this.report_failure.bind(this);
      this.apiFetch = this.apiFetch.bind(this);
      this.getCountries = this.getCountries.bind(this);
      this.getRegionsForCountry = this.getRegionsForCountry.bind(this);
      this.stateByCode = this.stateByCode.bind(this);
      this.countryByCode = this.countryByCode.bind(this);
      this.localStorageObj = localStorageObj;
      this.sessionStorageObj = sessionStorageObj;
      this.dispatch = new Dispatch(this);
      this.opts = opts || {};
      me = this;
      this.resetCache();
      this.AllLibraries = {};
      this.AllCatalogs = {};
      this.libraries = [];
      this.quickConnectTabs = {};
      this.registeredEvents = {};
      this.SiteManager = new SiteManager(this, browser);
      this.backgroundRefresh = null;
      if (backgroundRefreshCls) {
        this.backgroundRefresh = new backgroundRefreshCls(this);
      }
      me = this;
      me.LibraryDataCache = new LibraryDataCache(me, browser);
      me.LibraryDataCache.onLibraryUpdated.push(me.libraryUpdated);
      this.configSettings = {
        paused: {
          default: false,
          values: [true, false]
        },
        binding_icon_setting: {
          default: true,
          values: [true, false]
        },
        search_mode_setting: {
          default: "automatic",
          values: ["automatic", "on-demand"]
        },
        library_link_default_setting: {
          default: "library_url",
          values: ["catalog_url", "library_url"]
        },
        beta_multiple_results_setting: {
          default: false,
          values: [true, false]
        },
        beta_goodreads_lists: {
          default: false,
          values: [true, false]
        },
        binding_filter: {
          default: [],
          values: []
        },
        use_libby: {
          default: [false],
          values: [true, false]
        }
      };
      defineConfigGetterSetter = function(name, key) {
        me[`set${name}`] = async function(newValue) {
          return (await me.setConfigValue(key, newValue));
        };
        return me[`get${name}`] = async function() {
          var resp;
          resp = (await me.getConfigValue(key));
          return resp.value;
        };
      };
      defineConfigGetterSetter("BindingIconSetting", "binding_icon_setting");
      defineConfigGetterSetter("LibraryLinkDefaultSetting", "library_link_default_setting");
      defineConfigGetterSetter("PausedSetting", "paused");
      defineConfigGetterSetter("SearchModeSetting", "search_mode_setting");
      defineConfigGetterSetter("BindingFilter", "binding_filter");
      this.browser = browser;
      this.browser.setApplication(this);
    }

    resetCache() {
      return this.cache = {
        regions: {},
        countries: {}
      };
    }

    async initialize() {
      var debugMode;
      debugMode = (await this.isDebugMode());
      if (!isUnitTestMode && debugMode) {
        logger.setLevel(LOG_LEVELS.DEBUG);
        this.getDebugHost().then(this.browser.setupHotReload);
      }
      this.setConfig("libextInstalled", this.browser.extensionVersion);
      await this.performConfigMigration();
      await this.LibraryDataCache.initialize();
      await this.setLibraryFromConfig();
      await this.checkUpgrade();
      await this.browser.processWaitingMessages();
      return this;
    }

    time() {
      if (this.opts.clock) {
        return this.opts.clock.tick();
      }
      return Date.now();
    }

    registerEvent(event, subscriber) {
      var me;
      me = this;
      me.registeredEvents[event] = me.registeredEvents[event] || [];
      return me.registeredEvents[event].push(function(evt) {
        return subscriber.postMessage(evt);
      });
    }

    notifyEvent(event, message) {
      var me, subscribers;
      me = this;
      subscribers = me.registeredEvents[event] || [];
      return subscribers.forEach(function(callback) {
        try {
          return callback({
            event: event,
            status: message
          });
        } catch (error1) {

        }
      });
    }

    notifyAll(msg) {
      var key, results1;
      logger.debug("Sending message to all registered pages");
      logger.debug(this.browser.activePages.pages);
      logger.debug(msg);
      results1 = [];
      for (key in this.browser.activePages.pages) {
        results1.push(this.browser.activePages.pages[key].postMessage(msg));
      }
      return results1;
    }

    async updateBadgeForSites(msg) {
      var allSites, anyEnabled, enabledSites, me, promises, text;
      me = this;
      allSites = (await this.getJSONConfig("sites"));
      promises = sites.reduce(function(acc, el) {
        acc.push(me.SiteManager.isSiteEnabledForUrl(el.url));
        return acc;
      }, []);
      enabledSites = (await Promise.all(promises));
      anyEnabled = enabledSites.reduce(function(acc, el) {
        if (el) {
          acc.count += 1;
        }
        return acc;
      }, {
        count: 0
      });
      text = '';
      if (anyEnabled.count === 0) {
        text = '\u26a0';
      }
      return me.browser.setIconText(text);
    }

    async getEnabledCatalogs() {
      var isCatalogEnabled, me, results;
      if (!this.libraries) {
        return [];
      }
      me = this;
      isCatalogEnabled = (await this.areCatalogsEnabledHelper());
      results = [];
      me.libraries.forEach(function(library) {
        return library.catalogs.forEach(function(catalog) {
          return results.push({
            key: library.id + "_" + catalog.id,
            catalog: catalog,
            enabled: isCatalogEnabled(library.id, catalog.id)
          });
        });
      });
      return results.reduce(function(acc, el) {
        if (el.enabled && el.catalog.driver) {
          acc.push([el.key, el.catalog]);
        }
        return acc;
      }, []);
    }

    async replaceLibrary(old_library_id, new_library_id) {
      var idx, oldConfig, settings;
      settings = (await this.getJSONConfig("libraries"));
      oldConfig = null;
      idx = settings.enabled_libraries.indexOf(old_library_id);
      if (idx >= 0) {
        settings.enabled_libraries.splice(idx, 1);
        oldConfig = settings[old_library_id];
        delete settings[old_library_id];
      }
      if (settings.enabled_libraries.indexOf(new_library_id) < 0) {
        if (idx >= 0) {
          settings.enabled_libraries.splice(idx, 0, new_library_id);
        } else {
          settings.enabled_libraries.push(new_library_id);
        }
        if (oldConfig !== null) {
          settings[new_library_id] = oldConfig;
        }
      }
      await this.setJSONConfig("libraries", settings);
      return this.libraryUpdated(new_library_id);
    }

    async libraryUpdated(library_id) {
      var settings;
      settings = (await this.getJSONConfig("settings"));
      settings.lastLibrarySettingsUpdated = this.time();
      settings.lastLibrarySettingsUpdatedId = library_id;
      return (await this.setJSONConfig("settings", settings));
    }

    async setConfigValue(key, newValue) {
      var currentSetting, settings;
      currentSetting = (await this.getJSONConfig("settings"));
      if (!Array.isArray(this.configSettings[key].default) && this.configSettings[key].values.indexOf(newValue) < 0) {
        return Promise.resolve(false);
      }
      if (currentSetting[key] !== newValue) {
        settings = Object.assign({}, currentSetting);
        settings[key] = newValue;
        await this.setJSONConfig("settings", settings);
        this.notifyEvent("on_" + key + "_change", newValue);
        return Promise.resolve(true);
      }
      return Promise.resolve(false);
    }

    async getConfigValue(key) {
      var currentSettings, defaultValue, resp;
      defaultValue = this.configSettings[key].default;
      resp = (await this.getJSONConfig("settings"));
      currentSettings = resp;
      if (currentSettings[key] !== void 0) {
        return {
          value: currentSettings[key]
        };
      }
      return {
        value: defaultValue
      };
    }

    async migrateStateAndCountry(migratedKeys) {
      var data, updatedConfig;
      updatedConfig = {};
      data = (await this.getConfig("lastCountry"));
      if (data) {
        updatedConfig["lastCountry"] = data;
        migratedKeys.push("lastCountry");
      }
      data = (await this.getConfig("lastState"));
      if (data) {
        updatedConfig["lastState"] = data;
        migratedKeys.push("lastState");
      }
      if (updatedConfig) {
        updatedConfig = Object.assign({}, (await this.getJSONConfig("settings")), updatedConfig);
        await this.setJSONConfig("settings", updatedConfig);
      }
      return migratedKeys;
    }

    async migrateEverandConfiguration(migratedKeys) {
      var data;
      data = (await this.getJSONConfig("sites"));
      if (data.byId && data.byId.scribd) {
        if (!data.byId.everand) {
          data.byId.everand = data.byId.scribd;
          delete data.byId.scribd;
          await this.setJSONConfig("sites", data);
        }
      }
      data = (await this.getJSONConfig("libraries"));
      if (data.scribd) {
        if (!data.everand) {
          data.everand = data.scribd;
          delete data.scribd;
          data.enabled_libraries = data.enabled_libraries.map(function(el) {
            if (el === "scribd") {
              return "everand";
            }
            return el;
          });
          if (data.enabled_libraries.includes('everand')) {
            await this.sessionStorageObj.setItem("everandMigrationTimestamp", this.time());
          }
          await this.setJSONConfig("libraries", data);
        }
      }
      return migratedKeys;
    }

    async migrateLibraryConfiguration(migratedKeys) {
      var catalogKey, config, data, digitalKey, k, updated;
      data = (await this.getJSONConfig("libraries"));
      updated = false;
      for (k in data) {
        if (k === "enabled_libraries") {
          continue;
        }
        config = data[k];
        if (config.hasOwnProperty("catalog_enabled")) {
          catalogKey = "1";
          data[k][catalogKey] = {
            enabled: config.catalog_enabled
          };
          data[k].catalog_enabled = void 0;
          updated = true;
        }
        if (config.hasOwnProperty("digital_catalog_enabled")) {
          digitalKey = "2";
          data[k][digitalKey] = {
            enabled: config.digital_catalog_enabled
          };
          data[k].digital_catalog_enabled = void 0;
          updated = true;
        }
      }
      if (updated) {
        await this.setJSONConfig("libraries", data);
      }
      return migratedKeys;
    }

    async enableDefaultSites() {
      var allSites, me, site;
      me = this;
      allSites = (await this.getJSONConfig("sites"));
      if (!allSites.configured) {
        for (site of ALL_SITES) {
          await me.SiteManager.setSiteEnabled(site.id, true);
        }
      }
      return me.notifyEvent("siteChanged", null);
    }

    async migrateLegacyConfigurationToJSON(migratedKeys) {
      var cat_enabled, data, dig_cat_enabled, len, libraries, library, libraryData, me, n;
      me = this;
      data = (await me.getConfig("library"));
      if (data) {
        logger.debug("BEGIN LIBRARY CONFIGURATION");
        libraryData = {};
        libraries = data.split(";");
        libraryData["enabled_libraries"] = libraries; // ordered list
        for (n = 0, len = libraries.length; n < len; n++) {
          library = libraries[n];
          cat_enabled = (await me.getConfig(`chk_${library}_book`)) === "true"; // bool
          dig_cat_enabled = (await me.getConfig(`chk_${library}_ebook`)) === "true"; // bool
          libraryData[library] = {
            "catalog_enabled": cat_enabled,
            "digital_catalog_enabled": dig_cat_enabled
          };
          migratedKeys.push(`chk_${library}_book`);
          migratedKeys.push(`chk_${library}_ebook`);
        }
        migratedKeys.push("library");
        await me.setJSONConfig("libraries", libraryData);
        logger.debug("COMPLETE LIBRARY CONFIGURATION");
      }
      return migratedKeys;
    }

    async migrateLibraryIdentifiers() {
      var data, enabledLibraries, result;
      data = (await this.getJSONConfig("libraries"));
      enabledLibraries = data["enabled_libraries"] || [];
      result = [];
      enabledLibraries.forEach((function(key) {
        var newKey;
        if (!key) {
          return;
        }
        if (key.length === 33 && key[0] === "l") {
          newKey = key.substr(1);
          data[newKey] = data[newKey] || data[key];
          data[key] = void 0;
          key = newKey;
        }
        return result.push(key);
      }));
      data.enabled_libraries = result;
      return (await this.setJSONConfig("libraries", data));
    }

    async checkUpgrade() {
      var hasCloudLibraryEnabled, isCatalogEnabled;
      if (!this.sessionStorageObj["upgrade"]) {
        return;
      }
      isCatalogEnabled = (await this.areCatalogsEnabledHelper());
      hasCloudLibraryEnabled = function(library) {
        var isCloudLibraryEnabled;
        isCloudLibraryEnabled = function(catalog) {
          return catalog.type === "threem" && isCatalogEnabled(library.id, catalog.id);
        };
        return library.catalogs.some(isCloudLibraryEnabled);
      };
      if (this.libraries.some(hasCloudLibraryEnabled)) {
        return this.sessionStorageObj["cloudLibrary2023Timestamp"] = this.time();
      }
    }

    async performConfigMigration() {
      var me, migratedKeys;
      logger.debug("BEGIN CONFIGURATION MIGRATION");
      me = this;
      migratedKeys = (await Promise.resolve([]).then(async function(keys) {
        var data, surveyData;
        data = (await me.getConfig("surveys"));
        if (data) {
          logger.debug("BEGIN SURVEY CONFIGURATION");
          surveyData = JSON.parse(data);
          await me.setJSONConfig("surveys", surveyData.surveys);
          keys.push("surveys");
          logger.debug("COMPLETED SURVEY CONFIGURATION");
        }
        return keys;
      }).then(async function(keys) {
        var data, followed, reviewData, sessions;
        data = (await me.getConfig("reviewSessions"));
        if (data) {
          logger.debug("BEGIN REVIEW CONFIGURATION");
          sessions = parseInt(data);
          followed = parseInt((await me.getConfig("reviewFollowed")));
          reviewData = {
            "sessions": sessions, // int
            "followed": followed // int/datetimestamp
          };
          await me.setJSONConfig("review", reviewData);
          keys.push("reviewSessions");
          keys.push("reviewFollowed");
          logger.debug("COMPLETED REVIEW CONFIGURATION");
        }
        return keys;
      }).then(me.migrateLegacyConfigurationToJSON).then(me.migrateStateAndCountry).then(me.migrateLibraryConfiguration).then(me.migrateEverandConfiguration));
      await me.enableDefaultSites();
      await me.migrateLibraryIdentifiers();
      Promise.all(migratedKeys.reduce(function(acc, el) {
        acc.push(me.localStorageObj.removeItem(el));
        return acc;
      }, []));
      return logger.debug("COMPLETED CONFIGURATION MIGRATION");
    }

    async eligibleForSurvey(surveyId) {
      var data;
      data = (await this.getJSONConfig("surveys"));
      return !data[surveyId];
    }

    async trackInstallTime() {
      var settings;
      settings = (await this.getJSONConfig("settings"));
      if (!settings.hasOwnProperty("installTime")) {
        settings.installTime = this.time();
      }
      return (await this.setJSONConfig("settings", settings));
    }

    async trackBorrowClickTime(libraryId) {
      var libraries, myLibrary, now, settings;
      now = this.time();
      settings = (await this.getJSONConfig("settings"));
      if (!settings.hasOwnProperty("firstBorrowClick")) {
        settings.firstBorrowClick = now;
      }
      settings.lastBorrowClick = now;
      settings.borrowClickCount = (settings.borrowClickCount || 0) + 1;
      await this.setJSONConfig("settings", settings);
      libraries = (await this.getJSONConfig("libraries"));
      if (libraries.hasOwnProperty(libraryId)) {
        myLibrary = libraries[libraryId];
        if (!myLibrary.hasOwnProperty("firstBorrowClick")) {
          myLibrary.firstBorrowClick = now;
        }
        myLibrary.lastBorrowClick = now;
        myLibrary.borrowClickCount = (myLibrary.borrowClickCount || 0) + 1;
        return (await this.setJSONConfig("libraries", libraries));
      }
    }

    async inSellMode() {
      var enabledCatalogs;
      if (!this.libraries) {
        return true;
      }
      enabledCatalogs = (await this.getEnabledCatalogs());
      return enabledCatalogs.length === 0;
    }

    async isDebugMode() {
      var debugMode;
      debugMode = (await this.getConfig("debug"));
      return debugMode === "true" || this.browser.getMessage("debugMode") === "true";
    }

    getDebugHost() {
      return this.getConfig("debugHost");
    }

    async inReviewMode() {
      var displayCount, reviewData, reviewPromptFollowed, sessionsPrompted, supportData, supportUsDismissedEngaged, supportUsPromptFollowed;
      if ((await this.sessionStorageObj.getItem("forceReview"))) {
        return true;
      }
      reviewData = (await this.getJSONConfig("review"));
      supportData = (await this.getJSONConfig("supportus"));
      supportUsDismissedEngaged = (parseInt(reviewData["dismissed"] || 0) + (24 * 60 * 60 * 1000)) > this.time();
      supportUsPromptFollowed = supportData["followed"] || 0;
      reviewPromptFollowed = reviewData["followed"] || 0;
      if (reviewPromptFollowed || supportUsPromptFollowed || supportUsDismissedEngaged) {
        return false;
      }
      sessionsPrompted = reviewData["sessions"] || 0;
      displayCount = 1 + parseInt((await this.sessionStorageObj.getItem("reviewDisplayCount"))) || 0;
      if ((await this.sessionStorageObj.getItem("libextInstalled")) || sessionsPrompted > _maxSessionsPromptReviewMode || displayCount > _maxWriteReviewDisplayPerSession) {
        return false;
      }
      if (!(await this.sessionStorageObj["reviewPromptedThisSession"])) {
        await this.sessionStorageObj.setItem("reviewPromptedThisSession", true);
        reviewData["sessions"] = sessionsPrompted + 1;
        await this.setJSONConfig("review", reviewData);
      }
      await (this.sessionStorageObj["reviewDisplayCount"] = displayCount);
      return true;
    }

    async getConfiguredCatalogs() {
      var config;
      config = (await this.getJSONConfig("libraries"));
      return config;
    }

    async areCatalogsEnabledHelper() {
      var config;
      config = (await this.getConfiguredCatalogs());
      return function(library_id, catalog_id) {
        if (config.enabled_libraries.indexOf(library_id) < 0) {
          return false;
        }
        return config[library_id] && config[library_id][catalog_id] && config[library_id][catalog_id].enabled;
      };
    }

    setCatalogState(req) {
      var me;
      me = this;
      return new Promise(async function(resolve, reject) {
        var catalogId, config, libraryId;
        libraryId = req.libraryId;
        catalogId = req.catalogId;
        if (catalogId.indexOf("_") >= 0) {
          catalogId = catalogId.substr(catalogId.indexOf("_") + 1);
        }
        config = (await me.getJSONConfig("libraries"));
        config[libraryId] = config[libraryId] || {};
        config[libraryId][catalogId] = config[libraryId][catalogId] || {};
        config[libraryId][catalogId].enabled = req.state;
        await me.setJSONConfig("libraries", config);
        return resolve({
          status: "ok"
        });
      });
    }

    async setLibraryFromConfig() {
      var checkLibraryInitializationCompleteCallback, config, enabledLibraries, libraries, me;
      config = (await this.getJSONConfig("libraries"));
      if ((config.enabled_libraries == null) || config.enabled_libraries.length === 0) {
        return Promise.resolve([]);
      }
      me = this;
      me.libraries = [];
      checkLibraryInitializationCompleteCallback = function(libraries) {
        return new Promise(function(resolve, reject) {
          libraries.forEach(async function(row) {
            var this_library;
            if (!row) {
              logger.warn("warn: null row found");
              return;
            }
            if (!row.library) {
              logger.warn("warn: null row.library found: " + JSON.stringify(row));
              return;
            }
            if (row.library != null) {
              me.libraries.push(row.library);
            }
            this_library = row.library;
            if (row.id !== this_library.id) {
              await me.replaceLibrary(row.id, this_library.id);
            }
            return row.library.catalogs.forEach(function(catalog) {
              var url;
              return url = urlutils.concat(catalog.url, "/");
            });
          });
          return resolve();
        });
      };
      libraries = [];
      enabledLibraries = config.enabled_libraries;
      enabledLibraries.forEach(function(library) {
        var settings;
        if (!library) {
          return;
        }
        library = library.toLowerCase();
        settings = config[library] || {};
        return libraries.push(initializeLibrary(library, me));
      });
      return Promise.all(libraries).then(checkLibraryInitializationCompleteCallback).then(function() {
        return enabledLibraries;
      });
    }

    getConfigSettings() {
      var me, values;
      me = this;
      values = Object.keys(me.configSettings).map(async function(name) {
        var value;
        value = (await me.getConfigValue(name));
        return {
          name: name,
          value: value.value
        };
      });
      return Promise.all(values);
    }

    async getConfig(item, _default) {
      return (await this.localStorageObj.getItem(item)) || _default;
    }

    setConfig(item, value) {
      return this.localStorageObj.setItem(item, value);
    }

    async getJSONConfig(key, _default = {}) {
      var data, raw, resp;
      resp = (await this.localStorageObj.getItem("config"));
      raw = resp || "{}";
      data = JSON.parse(raw);
      return data[key] || _default;
    }

    async setJSONConfig(key, value) {
      var data, raw, resp;
      resp = (await this.localStorageObj.getItem("config"));
      raw = resp || "{}";
      data = JSON.parse(raw);
      data[key] = value;
      await this.localStorageObj.setItem("config", JSON.stringify(data));
      return value;
    }

    getSiteFromRequest(req) {
      var category;
      category = "unknown";
      if (req.request && "category" in req.request) {
        category = req.request.category;
      }
      return category;
    }

    async notifyAnyReleaseNotes(res) {
      var lastUpdated, lastVersion, now, settings, shouldShowUpdate;
      now = this.time();
      settings = (await this.getJSONConfig("settings"));
      lastUpdated = settings.lastVersionUpgrade || now;
      lastVersion = settings.lastVersion || "";
      shouldShowUpdate = (lastVersion !== this.browser.extensionVersion) && (lastUpdated + (2 * 86400 * 1000) > now) && !settings["click-releaseNotes-" + this.browser.extensionVersion];
      if (!shouldShowUpdate) {
        return res;
      }
      settings.lastVersion = this.browser.extensionVersion;
      settings.lastVersionUpgrade = lastUpdated;
      await this.setJSONConfig("settings", settings);
      res.messages = res.messages || [];
      res.messages.push({
        status: "message",
        message_id: "releaseNotes",
        is_update_message: true,
        last_updated: lastUpdated,
        content: "Check out our latest " + `<b><a href='${this.browser.getMessage("webRoot")}/release-notes/${this.browser.extensionVersion}?utm_source=extension&utm_campaign=recentUpdate'` + " target='_blank' onclick='<%= tracking %>'>release notes</a></b> to learn about what's new in the Library Extension." + "</span>"
      });
      return res;
    }

    async notifyAnyLibraryUpdates(res) {
      var lastUpdated, libraryId, me, now, settings, shouldShowUpdate;
      now = this.time();
      settings = (await this.getJSONConfig("settings"));
      lastUpdated = settings.lastLibrarySettingsUpdated || 0;
      libraryId = settings.lastLibrarySettingsUpdatedId;
      shouldShowUpdate = lastUpdated + (2 * 86400 * 1000) > now;
      if (this.isDebugMode() && settings.forceLibraryUpdateMessage) {
        settings.forceLibraryUpdateMessage = void 0;
        await this.setJSONConfig("settings", settings);
        lastUpdated = 0;
        libraryId = this.libraries[0].id;
        settings["click-" + libraryId + "-0"] = void 0;
        shouldShowUpdate = true;
      }
      if (!shouldShowUpdate) {
        return res;
      }
      me = this;
      this.libraries.reduce(function(acc, library) {
        if (acc.indexOf(library.id) < 0 && library.id === libraryId && !settings["click-" + libraryId + "-" + lastUpdated]) {
          acc.push(library.id);
          res.messages = res.messages || [];
          res.messages.push({
            status: "message",
            message_id: "recentUpdate",
            is_update_message: true,
            library_id: libraryId,
            last_updated: lastUpdated,
            append_supporter: true,
            content: "<span><b>You've received an automatic update for your library</b><br />" + "We've automatically updated settings to keep your library searches working.  " + `Become a <b><a href='${me.browser.getMessage("webRoot")}/support-us?utm_source=extension&utm_campaign=recentUpdate'` + " target='_blank' onclick='<%= tracking %>'>project supporter</a></b> to ensure we can continue bringing updates like this to you." + "</span>"
          });
        }
        return acc;
      }, []);
      return res;
    }

    async notifyEverandMigration(res) {
      var me, messages, migrationTimestamp, now;
      me = this;
      now = me.time();
      migrationTimestamp = (await me.sessionStorageObj.getItem("everandMigrationTimestamp")) || 0;
      if (migrationTimestamp < now - (2 * 86400 * 1000)) {
        return res;
      }
      messages = (await me.getJSONConfig("messages")) || {};
      if (messages.everandMigration) {
        return res;
      }
      res.messages = res.messages || [];
      res.messages.push({
        status: "message",
        message_id: "everandMigration",
        is_update_message: true,
        library_id: 'everand',
        last_updated: migrationTimestamp,
        append_supporter: false,
        content: "<span><b>You've received an update to support the new Everand site</b><br />" + "We've automatically the Library Extension to support the new Everand site, migrating your existing Scribd settings, to keep your searches with Everand working. <p />" + `Become a <b><a href='${me.browser.getMessage("webRoot")}/support-us?utm_source=extension&utm_campaign=recentUpdate'` + " target='_blank' onclick='<%= tracking %>'>project supporter</a></b> to ensure we can continue bringing updates like this to you." + "</span>"
      });
      return res;
    }

    async notifyCloudLibraryUpdate(res) {
      var me, messages, migrationTimestamp, now;
      me = this;
      now = me.time();
      migrationTimestamp = (await me.sessionStorageObj.getItem("cloudLibrary2023Timestamp")) || 0;
      if (migrationTimestamp < now - (2 * 86400 * 1000)) {
        return res;
      }
      messages = (await me.getJSONConfig("messages")) || {};
      if (messages.cloudLibrary2023) {
        return res;
      }
      res.messages = res.messages || [];
      res.messages.push({
        status: "message",
        message_id: "cloudLibrary2023",
        is_update_message: true,
        library_id: 'cloudlibrary',
        last_updated: migrationTimestamp,
        append_supporter: false,
        content: "<span><b>You've received an update for your CloudLibrary settings</b><br />" + "We've automatically updated the Library Extension to continuing working with your CloudLibrary catalogs, after recent updates at CloudLibrary. <p />" + `Become a <b><a href='${me.browser.getMessage("webRoot")}/support-us?utm_source=extension&utm_campaign=cloudLibraryUpdate'` + " target='_blank' onclick='<%= tracking %>'>project supporter</a></b> to ensure we can continue bringing updates like this to you." + "</span>"
      });
      return res;
    }

    onMessage(request) {
      var exc, me;
      me = this;
      try {
        if (!("request" in request)) {
          request["request"] = new Request(null, null);
        }
      } catch (error1) {
        exc = error1;
        logger.exception("Request was not defined onMessage", exc);
      }
      try {
        if (request.action in this.dispatch) {
          logger.debug(`Received message for action ${request.action}`);
          if (request.data && request.data.catalog) {
            request = Object.assign({}, request, {
              'catalog': me.AllCatalogs[request.data.catalog]
            });
          }
          return this.dispatch[request.action](request);
        }
      } catch (error1) {
        exc = error1;
        logger.exception("Failure onMessage", exc);
      }
      return Promise.reject();
    }

    async filterMessages(message) {
      var message_history;
      message_history = (await this.getJSONConfig('messages'));
      message.messages = message.messages.filter(function(el) {
        var res, this_history;
        this_history = message_history[el.message_id] || {};
        res = !this_history.hasOwnProperty('dismissed');
        if (!res) {
          logger.debug(`Skipping dismissed message ${el.message_id}`);
        }
        return res;
      });
      return message;
    }

    injectAssets(loaders) {
      var loadResource, resources;
      resources = [
        {
          type: "css",
          args: {
            file: "css/common.css"
          }
        },
        {
          type: "script",
          args: {
            file: "common.js"
          }
        }
      ];
      loadResource = function(result) {
        var action, resource;
        if (result) { // previous load successful?
          if (resources.length === 0) {
            if (loaders.done) {
              loaders.done();
            }
            return;
          }
          resource = resources.shift();
          action = loaders[resource.type];
          return action(resource.args, loadResource);
        }
      };
      return loadResource(true);
    }

    create_failure_data(self, failureDetails) {
      var error;
      error = {
        library_id: self.getLibraryId(),
        catalog_id: self.getCatalogId(),
        last_updated: self.getLastUpdated(),
        etag: self.getETag(),
        request: failureDetails.request,
        url: failureDetails.url,
        statusReportedToUser: failureDetails.reportToUser && failureDetails.statusText,
        stack: failureDetails.exception && failureDetails.exception.stack,
        extension: {
          version: this.browser.extensionVersion,
          platform: navigator.userAgent
        }
      };
      return error;
    }

    report_failure(self, failureDetails) {
      var error, errorReportingUrl, headers, lookup, me, post_param;
      me = this;
      headers = new Headers();
      headers.append("Content-Type", "application/json");
      error = me.create_failure_data(self, failureDetails);
      post_param = {
        method: "POST",
        headers: headers,
        body: JSON.stringify(error)
      };
      errorReportingUrl = urlutils.concat(me.browser.getMessage("apiRoot"), "/api/report_error");
      fetch(errorReportingUrl, post_param).then(function(resp) {
        if (resp.ok && resp.headers.get('Content-Type').startsWith('application/json')) {
          return resp.json().then(function(body) {
            if (body.last_updated && body.last_updated !== self.getLastUpdated()) {
              self.app.LibraryDataCache.invalidateLibrary(self.getLibraryId());
              return initializeLibrary(self.getLibraryId(), me.app);
            }
          });
        }
      });
      if (failureDetails.request) {
        lookup = new LibraryResults(self.libraryId);
        lookup.setStatus(failureDetails.statusReportedToUser);
        if (failureDetails.reportToUser) {
          lookup.failureReason = failureDetails.explanation;
        }
        return failureDetails.request.reply(lookup);
      }
    }

    apiFetch(url) {
      var headers, uri;
      uri = urlutils.concat(this.browser.getMessage("apiRoot"), url);
      headers = new Headers([["Accept", "application/json"]]);
      return fetch(uri, {
        headers: headers
      });
    }

    getCountries() {
      var me;
      me = this;
      if (Array.isArray(me.cache.countries)) {
        return me.cache.countries;
      }
      if (me.cache.countries instanceof Promise) {
        return me.cache.countries;
      }
      me.cache.countries = new Promise(async function(resolve, reject) {
        var countriesUrl, data, resp;
        countriesUrl = "/api/library/config/countries";
        resp = (await me.apiFetch(countriesUrl));
        if (!resp.ok) {
          return resolve([]);
        }
        data = (await resp.json());
        me.cache.countries = data;
        return resolve(data);
      });
      return me.cache.countries;
    }

    getRegionsForCountry(countryCode) {
      var me;
      me = this;
      if (me.cache.regions[countryCode]) {
        return me.cache.regions[countryCode];
      }
      if (me.cache.regions[countryCode] instanceof Promise) {
        return me.cache.regions[countryCode];
      }
      me.cache.regions[countryCode] = new Promise(async function(resolve, reject) {
        var data, regionsUrl, resp;
        regionsUrl = fromTemplate("/api/library/config/country/<%= countryCode %>")({
          countryCode: countryCode
        });
        resp = (await me.apiFetch(regionsUrl));
        if (!resp.ok) {
          return resolve([]);
        }
        data = (await resp.json());
        me.cache.regions[countryCode] = data;
        return resolve(data);
      });
      return me.cache.regions[countryCode];
    }

    async stateByCode(stateCode, countryCode) {
      var me, region, regions;
      me = this;
      regions = (await me.getRegionsForCountry(countryCode));
      region = regions.find(function(item) {
        return item.code === stateCode;
      });
      return (region && region.name) || "Unknown";
    }

    async countryByCode(countryCode) {
      var countries, country, me;
      me = this;
      countries = (await me.getCountries());
      country = countries.find(function(item) {
        return item.code === countryCode;
      });
      return (country && country.name) || "Unknown";
    }

  };

  unitTestable(BackgroundApplication);

  unitTestable(BackgroundRefresh);

  unitTestable(LibrarySummary);

  unitTestable(LibraryResults);

  if (!isUnitTestMode) {
    browserShim = null;
    ensureBrowser = function() {
      if (browserShim === null) {
        browserShim = new CommonBrowser();
      }
      return browserShim;
    };
    ensureBrowser();
    setupConnections = Promise.resolve();
    localStorageShim = new LocalStorageShim(localStorage);
    sessionStorageShim = sessionStorage;
    browserShim.baseBrowser.runtime.onInstalled.addListener(browserShim.onInstalled);
    browserShim.baseBrowser.runtime.onConnect.addListener(browserShim.onConnect);
    browserShim.baseBrowser.tabs.onUpdated.addListener(browserShim.injectCommonCodeForEnabledSites);
    if (browserShim.uninstallURL) {
      browserShim.baseBrowser.runtime.setUninstallURL(browserShim.uninstallURL);
    }
    setupConnections.then(function() {
      return new BackgroundApplication(browserShim, BackgroundRefresh, localStorageShim, sessionStorageShim);
    }).then(function(application) {
      return application.initialize();
    });
  }

  // END src/background.coffee

}).call(this);
