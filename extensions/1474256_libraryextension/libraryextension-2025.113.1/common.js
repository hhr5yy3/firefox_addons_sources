(function() {
  // BEGIN src/browser/firefox/extension.coffee
  var $empty, $toFragment, AbebooksPlugin, AcceleratedReaderPlugin, AmazonPlugin, ApiClient, AudiblePlugin, AudiobooksComPlugin, AudiobooksnowComPlugin, BNPlugin, BibliocomPlugin, BlackwellsSitePlugin, BookBubSitePlugin, BookDigitsPlugin, BookOutletPlugin, BookclubzPlugin, BookoPlugin, BookshopOrgPlugin, BooktopiaPlugin, BrowserConnection, ChaptersIndigoPlugin, ChirpPlugin, Connection, CounterFactory, CtpubPlugin, DocumentProxy, DownpourPlugin, EasonsPlugin, Eventable, EverandPlugin, FantasticFictionPlugin, FrontendDebugger, GenericPlugin, GenericSiteLayoutFactory, GoodreadsPlugin, GoogleBooksPlugin, HivePlugin, ItemListing, KirkusReviewsPlugin, KoboPlugin, LOG_LEVELS, LOG_LEVEL_TEXT, LexileSitePlugin, LibraryExtensionPlugin, LibraryResultWidget, LibraryResultsListWidget, LibrarySearchResultWidget, LibrarySearchWidget, LibrarySearchWidgetDialog, LibrarySearchWidgetFactory, LibraryThingPlugin, LibroFMPlugin, Logger, NPRBooksWeLovePlugin, OverdrivePlugin, PenguinRandomHousePlugin, PenworthySitePlugin, QuickCheckoutHelper, Resource, ResultWidget, ResultWidgetFactory, RomanceIoSitePlugin, SearchLayout, SearchLayoutFactory, SiteLayout, SiteParser, SiteParserWithScraper, SmashwordsPlugin, StructuredDataReader, ThePaintedPorchSitePlugin, TheStoryGraphSitePlugin, TheWorksCoUkSitePlugin, ThriftbooksSitePlugin, WHITESPACE, WHSmithSitePlugin, WaterstonesSitePlugin, WorderyPlugin, _imgpath, _parser, addSource, anyBeginsWith, api, authorArtistRegEx, bindingSort, browserFetch, byRegEx, c_link, cleanArray, cleanArrayGenerator, cleanupPermissionUrl, commonBindingIcons, commonBindingMappings, compareComponents, compareSortedComponents, compareText, conn, digitsOnly, extRoot, findAllMatchingNodes, findFirstMatchingNode, findMatchingPlugin, friendlyTime, fromHTML, fromHTMLTemplate, fromTemplate, getMetaByProperty, hashToList, icons, illustratorRegEx, imgRoot, initLayout, isBinding, isUnitTestMode, libraryFromKey, logger, make_icon, nodeListToArray, nodeToText, noop_fn, normalizeAuthor, normalizeAuthorPrefix_re, normalizeTitle, normalizeTitlePrefix_re, parseAuthorAndTitleBySlash, parseAuthorAndTitleFromOGMeta, parseBoolean, parseToFragment, permissionContains, permissionRemove, permissionRequest, pluck, plugins, pluralize, publishedRegEx, registerSite, remove_paren_re, replacementChars, resourceIdGenerator, run, safeChars_re, sanitizeTitle, setutils, singularize, splitAndNormalizeTitle, stateHasAuthor, templateFilters, textFromElement, theDocument, toQueryString, txtLower, uniqueArray, unitTestable, urlutils, validateISBN, validateISBN13,
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
        var it, ref1, responseHeaders, result;
        if ((ref1 = resp.status) === 301 || ref1 === 302) { // Will this every really resolve now?
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
      var o, ref1, results1;
      results1 = [];
      for (num = o = 0, ref1 = maxlength - 2; (0 <= ref1 ? o <= ref1 : o >= ref1); num = 0 <= ref1 ? ++o : --o) {
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
    var checkdigit, even_digits, len, len1, maxlength, num, o, odd_digits, u, v, value;
    if ((typeof isbn) !== "string") {
      return false;
    }
    maxlength = 13;
    isbn = digitsOnly(isbn);
    if (isbn.length !== maxlength) {
      return false;
    }
    even_digits = (function() {
      var o, ref1, results1;
      results1 = [];
      for (num = o = 0, ref1 = maxlength - 2; o <= ref1; num = o += 2) {
        results1.push(parseInt(isbn[num]));
      }
      return results1;
    })();
    odd_digits = (function() {
      var o, ref1, results1;
      results1 = [];
      for (num = o = 1, ref1 = maxlength - 2; o <= ref1; num = o += 2) {
        results1.push(parseInt(isbn[num]) * 3);
      }
      return results1;
    })();
    value = 0;
    for (o = 0, len = even_digits.length; o < len; o++) {
      v = even_digits[o];
      value += v;
    }
    for (u = 0, len1 = odd_digits.length; u < len1; u++) {
      v = odd_digits[u];
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
    var elemA, len, localA, localB, matches, o, position, tmp;
    localA = arrayA.slice(0);
    localB = arrayB.slice(0);
    if (localA.length > localB.length) {
      tmp = localA;
      localA = localB;
      localB = tmp;
    }
    position = 0;
    matches = 0;
    for (o = 0, len = localA.length; o < len; o++) {
      elemA = localA[o];
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
    var author, cleanNames, len, line, lines, name, names, o, oldline, removeBy, removePublished, resultLines;
    if (origAuthor === null || origAuthor === void 0) {
      return origAuthor;
    }
    lines = origAuthor.trim().split("\n");
    resultLines = [];
    for (o = 0, len = lines.length; o < len; o++) {
      line = lines[o];
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
    var i, j, len, len1, o, u;
    text = text || "";
    text = text.toLowerCase();
    for (o = 0, len = arr.length; o < len; o++) {
      i = arr[o];
      if (text.indexOf(i.toLowerCase()) === 0) { // > -1
        if (exclusions != null) {
          for (u = 0, len1 = exclusions.length; u < len1; u++) {
            j = exclusions[u];
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
  // BEGIN src/common.coffee

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

    // BEGIN src/frontend/debugging.coffee
  FrontendDebugger = class FrontendDebugger {
    constructor(doc, layout) {
      this.setEnabled = this.setEnabled.bind(this);
      this.setLibraryExtensionElement = this.setLibraryExtensionElement.bind(this);
      this.showSummary = this.showSummary.bind(this);
      this.enabled = false;
      this.doc = doc;
      this.layout = layout;
    }

    setEnabled(state) {
      return this.enabled = this.enabled || state;
    }

    setLibraryExtensionElement(target) {
      var el;
      if (!this.enabled) {
        return;
      }
      el = fromHTML("<div>" + "DEBUG MODE <span><i class=\"clickable\" aria-hidden=\"true\">&#x21ba;</i></span>" + "</div>");
      el.addEventListener("click", this.layout.run);
      return target.appendChild(el);
    }

    showSummary(site, msg) {
      var body;
      if (!this.enabled) {
        return;
      }
      try {
        body = this.doc.root.querySelector("body");
        return body.appendChild(fromHTML("<div id='libraryextension_debug'>" + "<div>Category: " + site.getCategory() + "</div>" + "<div>Binding: " + JSON.stringify(site.getBinding()) + "</div>" + "<div>Title: " + JSON.stringify(site.getTitle()) + "</div>" + "<div>Author: " + JSON.stringify(site.getAuthors()) + "</div>" + "<div>ISBN: " + JSON.stringify(site.getIsbn()) + "</div>" + "<div>ISBN13: " + JSON.stringify(site.getIsbn13()) + "</div>" + "<div>Response.libraries: " + JSON.stringify(msg.libraries) + "</div>" + "<div>Response.sellmode: " + JSON.stringify(msg.sellmode) + "</div>" + "</div>"));
      } catch (error) {
        return 0;
      }
    }

  };

  // END src/frontend/debugging.coffee

  // BEGIN src/frontend/icons.coffee

  // BEGIN src/frontend/utilities.coffee
  addSource = function(ref, src) {
    if (typeof ref !== "string") {
      return ref;
    }
    if (!ref) {
      return ref;
    }
    if (ref.indexOf("?") >= 0) {
      ref += "&";
    } else {
      ref += "?";
    }
    ref += "utm_source=libraryextension.com&utm_content=" + src + "&utm_medium=onpage_catalog_view";
    return ref;
  };

  imgRoot = `${extRoot}images/`;

  _imgpath = function(img, ext = "png") {
    return `${imgRoot}${img}.${ext}`;
  };

  c_link = function(url, text, css_class, onclickCB) {
    var el, onClick;
    onClick = `try{ ${onclickCB || ''} }catch(e){debug(e);};`;
    el = document.createElement("a");
    el.className = css_class;
    el.setAttribute("onclick", onClick);
    if (url) {
      el.setAttribute("href", url);
      el.setAttribute("target", "_blank");
    }
    el.appendChild(fromHTML("<span>" + text + "</span>")); // document.createTextNode(text)c)
    return el;
  };

  unitTestable(addSource);

  // END src/frontend/utilities.coffee
  make_icon = function(path) {
    if (path.charAt(0) === "0") {
      return fromTemplate("<img class=\"libIcon\" src=\"<%= path %>\" />")({
        path: _imgpath(path)
      });
    }
    return fromTemplate("<span class=\"libIcon lib<%= path %>\"><span></span></span>")({
      path: path
    });
  };

  icons = {
    ALERT_ICON: make_icon("Alert"),
    WARN_ICON: make_icon("Warn"),
    CONFIRM_ICON: make_icon("Confirm"),
    QUOTE_ICON: make_icon("001_50")
  };

  // END src/frontend/icons.coffee

  // BEGIN src/frontend/result_widget.coffee
  commonBindingIcons = {
    audiobook: "icon-headphones",
    ebook: "icon-phone",
    book: "icon-book"
  };

  bindingSort = function(a, b) {
    if (a.binding === void 0 || b.binding === void 0) {
      return 0;
    }
    if (a.binding < b.binding) {
      return -1;
    }
    if (a.binding === b.binding) {
      return a.title.localeCompare(b.title);
    }
    if (a.binding > b.binding) {
      return 1;
    }
  };

  stateHasAuthor = function(state) {
    return state && state.content && state.content.authors && state.content.authors.length > 0;
  };

  libraryFromKey = function(key) {
    var keys;
    if (key.indexOf("_") >= 0) {
      keys = key.split("_");
    } else {
      keys = [key];
    }
    return {
      libraryId: keys[0],
      catalogId: (keys.length > 1 && keys[1]) || null,
      key: key
    };
  };

  ItemListing = class ItemListing {
    constructor(resource1, item1, templates) {
      this.render = this.render.bind(this);
      this._show_available_single_item = this._show_available_single_item.bind(this);
      this._templateForAvailability = this._templateForAvailability.bind(this);
      this.getHoldLink = this.getHoldLink.bind(this);
      this._getBorrowText = this._getBorrowText.bind(this);
      this._getHoldText = this._getHoldText.bind(this);
      this.resource = resource1;
      this.item = item1;
      this.templates = templates;
      0;
    }

    render(state, libraryId) {
      var container;
      container = fromHTML("<div class=\"listing\"></div>");
      this._show_available_single_item(container, this.item, libraryId, state);
      return container;
    }

    _show_available_single_item(container, item, libraryId, state) {
      var actions, additionalInfo, binding, bindingIcon, binding_icon_div, commonBindings, link, listing, t, targetUrl, title, titleListing;
      listing = document.createElement("div");
      listing.className = "listing_name";
      container.appendChild(listing);
      title = item.title || "";
      additionalInfo = item.additionalInfo || "";
      if (!stateHasAuthor(state) && item.author) {
        title = `${title} &bull; ${item.author}`;
      }
      binding = (item.binding || "").toLowerCase();
      if (binding) {
        commonBindings = {
          audiobook: "Audiobook",
          ebook: "eBook"
        };
        bindingIcon = commonBindingIcons[binding] || null;
        binding = commonBindings[binding] || binding;
        title = `${title} &bull; ${binding}`;
      }
      link = addSource(item.url, "title_link");
      binding_icon_div = "";
      if (state.config.showBindingIcons && bindingIcon) {
        binding_icon_div = `<div class=\"icon ${bindingIcon}\"></div>`;
      }
      titleListing = fromHTMLTemplate("<div title=\"<%= title %>\"><%= binding_icon %></div>")({
        binding_icon: binding_icon_div,
        title: item.catalog_title
      });
      titleListing.appendChild(c_link(link, title, null));
      listing.appendChild(titleListing);
      if (additionalInfo) {
        listing.appendChild(fromHTMLTemplate("<div><%= additionalInfo %></div>")({
          additionalInfo: additionalInfo
        }));
      }
      targetUrl = addSource(item.url, "hold_button");
      actions = document.createElement("div");
      actions.className = "libraryAction";
      actions.role = "button";
      titleListing.appendChild(actions);
      if (this._isAvailable(item.availability)) {
        t = this._templateForAvailability(item.availability);
        listing.appendChild(t({
          icon: this._getIconForAvailability(item.availability),
          available: this._getAvailableQty(item.availability),
          copyQtyText: this._getCopiesPluralText(item.availability),
          count: this._getCopiesTotalText(item.availability),
          estimated: item.availability.estimated,
          holdQueue: this._getHoldQueueText(item.availability)
        }));
        actions.appendChild(this.getHoldLink(libraryId, targetUrl, item.availability));
        actions.setAttribute("aria-label", this.resource.parser.BORROWTEXT);
      } else {
        actions.appendChild(c_link(targetUrl, this.resource.parser.VIEWTEXT, "libHold"));
        actions.setAttribute("aria-label", this.resource.parser.VIEWTEXT);
      }
      return actions;
    }

    _getCopiesPluralText(availability) {
      var copyQtyText;
      copyQtyText = "copies";
      if (availability && (availability.available === 1 && !availability.count)) {
        copyQtyText = "copy";
      }
      return copyQtyText;
    }

    _getCopiesTotalText(availability) {
      var copiesTotal, dig_tmpl_total;
      dig_tmpl_total = fromTemplate("<span class='libText'> of </span><span class='libCount libCopiesTotal'><%= count %></span>");
      copiesTotal = "";
      if (availability && availability.count) {
        copiesTotal = dig_tmpl_total(availability);
      }
      return copiesTotal;
    }

    _getHoldQueueText(availability) {
      var holdTemplate;
      if (availability && availability.available > 0) {
        return "";
      }
      holdTemplate = "<div>";
      if (availability.holds) {
        holdTemplate += "<%= holds %> holds";
      }
      if (availability.estimatedHoldWait) {
        holdTemplate += " (Estimated wait: <%= estimatedHoldWait %> days)";
      }
      holdTemplate += "</div>";
      return fromTemplate(holdTemplate)(availability);
    }

    _isAvailable(availability) {
      if (!availability) {
        return false;
      }
      return (availability.count != null) || availability.isAvailable || availability.availabilityType === "always";
    }

    _templateForAvailability(availability) {
      if (!availability || availability.availabilityType === "always") {
        return this.templates.availabilityAlwaysAvailable;
      }
      if (availability.isAvailable) {
        return this.templates.availabilityAtLeastOneCopy;
      }
      return this.templates.availabilityCounts;
    }

    _getIconForAvailability(availability) {
      var iconCls;
      iconCls = (availability && availability.available === 0 && availability.availabilityType !== "always" ? icons.ALERT_ICON : icons.CONFIRM_ICON);
      return iconCls;
    }

    _getAvailableQty(availability) {
      return (availability && availability.available) || 0;
    }

    _getTotalQty(availability) {
      return (availability && availability.copies) || 0;
    }

    getHoldLink(libraryId, url, availability) {
      var borrowText, copiesAvailable, copiesTotal, holdText, text;
      copiesAvailable = this._getAvailableQty(availability);
      copiesTotal = this._getTotalQty(availability);
      borrowText = this._getBorrowText(availability);
      holdText = this._getHoldText(availability);
      text = copiesAvailable > 0 || (availability && availability.availabilityType === "always") ? borrowText || this.browserApi.i18n.getMessage("reserveYourCopy") : holdText || this.browserApi.i18n.getMessage("addYourselfToWaitlist");
      if (copiesTotal < 0) {
        text = this.browserApi.i18n.getMessage("checkAvailability");
      }
      return c_link(url, text, "libHold");
    }

    _getBorrowText(availability) {
      var result;
      result = this.resource.parser.BORROWTEXT;
      if (availability && availability.availabilityType === "no_holds") {
        result = this.resource.parser.VIEWTEXT;
      }
      return result;
    }

    _getHoldText(availability) {
      var result;
      result = this.resource.parser.HOLDTEXT;
      if (availability && availability.availabilityType === "no_holds") {
        result = this.resource.parser.VIEWTEXT;
      }
      return result;
    }

  };

  ResultWidget = class ResultWidget {
    constructor(resource, browserApi, docRoot) {
      this.render_libraries = this.render_libraries.bind(this);
      this.addLibrary = this.addLibrary.bind(this);
      this.setLibraryName = this.setLibraryName.bind(this);
      this.show_searching = this.show_searching.bind(this);
      this.show_message = this.show_message.bind(this);
      this.usermessage = this.usermessage.bind(this);
      this.render_sellmode = this.render_sellmode.bind(this);
      this.showFailures = this.showFailures.bind(this);
      this.show_wait_for_demand = this.show_wait_for_demand.bind(this);
      this.show_writereview = this.show_writereview.bind(this);
      this.show_spinner = this.show_spinner.bind(this);
      this.show_error = this.show_error.bind(this);
      this.updateTarget = this.updateTarget.bind(this);
      this.show_available = this.show_available.bind(this);
      this.show_available_library = this.show_available_library.bind(this);
      this.show_invalid = this.show_invalid.bind(this);
      this.show_unavailable = this.show_unavailable.bind(this);
      this.render_failures = this.render_failures.bind(this);
      this.getDisplayElementForLibrary = this.getDisplayElementForLibrary.bind(this);
      this.render = this.render.bind(this);
      this.box = this.box.bind(this);
      this.docRoot = docRoot;
      this.browserApi = browserApi;
      this.resource = resource;
      this.root = null;
      this.displayed_supporter = false;
      this.templates = {
        catalog: fromHTMLTemplate("<div data-library='<%= id %>' class='LibraryResults'> <div class='Library LibraryName'></div> <div class='Messages'></div> <div class='Status'></div> <div class='Status Searching'></div> </div>"),
        welcomeNewUser: fromHTMLTemplate("<div> <div class=\"Library libName\"><%= welcomeNewUser %></div> <div><%= welcomeNewUserYouHaventSetup %></div> <img height=\"37\" width=\"228\" src=\"<%= imagePath %>\" /> <div><%= welcomeNewUserSetup %></div> </div>"),
        message: fromHTMLTemplate("<div id='libraryUserMessage' data-name='<%= id %>'> <%= quoteIcon %> <%= body %> </div>"),
        messageDismissable: fromHTMLTemplate("<div id='libraryUserMessage' data-name='<%= id %>'><div class='dismissUserMessage' onclick='<%= dismissed %>'></div> <%= quoteIcon %> <%= body %> </div>"),
        estimatedAvailabilityCounts: fromHTMLTemplate("<div><%= icon %> <span class='libName'> <span class='libCount libCopiesAvailable'><%= available %></span><%= count %> <span class='libText'><%= copyQtyText %> available</span> </span> <%= holdQueue %> </div>"),
        availabilityCounts: fromHTMLTemplate("<div><%= icon %> <span> <%= estimated|atLeastStr %> </span> <span class='libName'> <span class='libCount libCopiesAvailable'><%= available %></span><%= count %> <span class='libText'><%= copyQtyText %> available</span> </span> <%= holdQueue %> </div>", {
          atLeastStr: function(v) {
            if (v) {
              return "At least";
            }
            return "";
          }
        }),
        availabilityAtLeastOneCopy: fromHTMLTemplate("<div><%= icon %> <span class='libName'> At least one copy is available </span> </div>"),
        availabilityAlwaysAvailable: fromHTMLTemplate("<div><%= icon %> <span class='libName'> This item is always available </span> </div>"),
        textBox: fromHTMLTemplate("<div><%= sprite %><div class=\"libText\"><%= message %></div></div>")
      };
    }

    render_libraries(state) {
      var me;
      if (state.libraries) {
        me = this;
        return state.libraries.forEach(me.addLibrary);
      } else {
        return this.show_wait_for_demand(state);
      }
    }

    addLibrary(library) {
      var catalogs, container, librarySystemName, logo, name, root, url;
      catalogs = library.catalogs.filter(function(catalog) {
        return catalog.enabled;
      });
      if (catalogs.length === 0) {
        return 0;
      }
      logo = library.logo;
      name = library.name;
      url = library.url;
      librarySystemName = catalogs[0].librarySystemName;
      logo = logo || catalogs[0].logo;
      container = this.templates.catalog({
        id: library.id
      });
      root = this.root.querySelector(".libextHeader");
      root.appendChild(container);
      if (library.link_display_mode === "catalog_url" && catalogs[0].url) {
        url = catalogs[0].url;
      }
      this.setLibraryName(library.id, name, url, logo, librarySystemName);
      return 1;
    }

    setLibraryName(id, desc, url, logoData, librarySystemName) {
      var el, link, logo, n, p;
      if (url) {
        url = addSource(url, "library_link");
      }
      if (logoData) {
        logo = new Image(logoData.widthPx, logoData.heightPx);
        logo.src = logoData.src;
        logo.setAttribute("alt", desc);
        link = document.createElement("a");
        link.className = "libTitle";
        if (url) {
          link.setAttribute("href", url);
          link.setAttribute("target", "_blank");
        }
        link.appendChild(logo);
        if (librarySystemName) {
          n = document.createElement("div");
          n.textContent = librarySystemName;
          p = document.createElement("div");
          p.appendChild(n);
          p.appendChild(link);
          link = p;
        }
      } else {
        link = c_link(url, desc, "libTitle");
      }
      el = this.getDisplayElementForLibrary(id).querySelector(".LibraryName");
      return el.appendChild(link);
    }

    show_searching(state) {
      var me;
      me = this;
      if (!stateHasAuthor(state)) {
        me.show_message({
          content: "No author was found for this item, search results may included similarly named items by various authors",
          icon: icons.WARN_ICON
        });
      }
      if (state.libraries) {
        return state.libraries.forEach(function(library) {
          var catalogsBeingSearched, msg, target;
          catalogsBeingSearched = library.catalogs.reduce(function(acc, catalog) {
            if (catalog.enabled && state.catalogResults[catalog.id] === void 0) {
              acc += 1;
            }
            return acc;
          }, 0);
          target = me.getDisplayElementForLibrary(library.id);
          if (target) {
            $empty(target, ".Searching");
            if (catalogsBeingSearched > 0) {
              msg = me.browserApi.i18n.getMessage("searchingCatalogs", [catalogsBeingSearched, pluralize("catalog", catalogsBeingSearched)]);
              return me.show_spinner(target, ".Searching", msg);
            }
          }
        });
      }
    }

    show_message(data) {
      var args, content, dismissFn, el, id_, me, tmpl, trackingFn;
      if (data.is_update_message && this.resource.parser._hideUpdateMessages) {
        return;
      }
      if (!data.content) {
        return;
      }
      me = this;
      id_ = data.message_id || data.content.split(' ')[0];
      content = data.content;
      if (data.append_supporter && ((me.displayed_supporter || id_) === id_)) {
        content = content + `<div><hr></hr>Become a <b><a href='${me.browserApi.i18n.getMessage("webRoot")}/support-us?utm_source=extension&utm_campaign=<%= message_id %>' ` + "target='_blank' onclick='<%= tracking %>'>project supporter</a></b> to ensure we can continue bringing updates like this to you.</div>";
        me.displayed_supporter = id_;
      }
      tmpl = fromTemplate(content);
      if (tmpl) {
        try {
          dismissFn = `document.querySelector(\"#libraryUserMessage[data-name=${id_}]\").remove();document.dispatchEvent(new CustomEvent(\"libraryEvent\",{\"detail\":{\"name\":\"${id_}:dismissed\"}}));`;
          trackingFn = `document.querySelector(\"#libraryUserMessage[data-name=${id_}]\").remove();document.dispatchEvent(new CustomEvent(\"libraryEvent\",{\"detail\":{\"name\":\"${id_}:click\"}}));`;
          args = Object.assign(args || {}, {
            message_id: id_,
            tracking: trackingFn
          });
          el = tmpl(args);
          return this.usermessage(id_, el, dismissFn, null, data.icon);
        } catch (error) {
          return 0;
        }
      }
    }

    usermessage(id_, el, dismissFn, setupElement, icon = icons.QUOTE_ICON) {
      var base, existing, frag;
      if (icons.hasOwnProperty(icon)) {
        icon = icons[icon];
      }
      if (dismissFn) {
        frag = this.templates.messageDismissable({
          id: id_,
          dismissed: dismissFn,
          quoteIcon: icon || "",
          body: el
        });
      } else {
        frag = this.templates.message({
          id: id_,
          quoteIcon: icon || "",
          body: el
        });
      }
      if (setupElement) {
        setupElement(frag);
      }
      base = this.root.querySelector(".libraryMessages");
      existing = base.querySelector("[data-name='" + id_ + "']");
      if (existing !== null) {
        existing.parentNode.removeChild(existing);
      }
      base.appendChild(frag);
      return frag;
    }

    render_sellmode(_state) {
      var frag, tmplData;
      frag = fromHTML("<div id='lib_sellmode' class='Status' />");
      this.root.querySelector(".libextHeader").appendChild(frag);
      tmplData = {
        imagePath: _imgpath("toolbar_select", "gif"),
        welcomeNewUser: this.browserApi.i18n.getMessage("welcomeNewUser"),
        welcomeNewUserYouHaventSetup: this.browserApi.i18n.getMessage("welcomeNewUserYouHaventSetup"),
        welcomeNewUserSetup: this.browserApi.i18n.getMessage("welcomeNewUserSetup")
      };
      return frag.appendChild(this.templates.welcomeNewUser(tmplData));
    }

    hasFailure() {
      return false;
    }

    show_config_ready(result) {
      if (!result.config.sellmode && result.libraries.length === 0) {
        return;
      }
      return logger.debug("Running Initialize Layout");
    }

    showFailures() {
      var el, hasAnyFailure, tmpl;
      hasAnyFailure = this.hasFailure();
      if (hasAnyFailure) {
        tmpl = fromTemplate("<span><%= description %></span><div><%= user_direction %></div>");
        el = tmpl(hasAnyFailure[0]);
        this.usermessage('failures', el, noop_fn, null, icons.ALERT_ICON);
      }
    }

    show_wait_for_demand(state) {
      var action, clsName, el, frag, me, searchAll, showSearchAll;
      if (state.config.searchMode !== "on-demand" || state.hide_on_demand_message) {
        $empty(this.root, ".libraryMessages");
        return;
      }
      me = this;
      showSearchAll = state.multipleItems && this.resource.parser.ON_DEMAND_MODE_SEARCH_ALL_BUTTON_TEXT;
      clsName = "libSearch";
      if (showSearchAll) {
        searchAll = `<a class=\"${clsName} searchAll\">${this.resource.parser.ON_DEMAND_MODE_SEARCH_ALL_BUTTON_TEXT}</a>`;
      } else {
        searchAll = "";
      }
      el = this.resource.parser.ON_DEMAND_MODE_MESSAGE;
      action = `<div> <div class=\"ondemand\"> <a class=\"${clsName} searchOne\">${this.resource.parser.ON_DEMAND_MODE_BUTTON_TEXT}</a> </div> </div>`;
      frag = this.usermessage('demand', el, null, null, this.resource.parser.ON_DEMAND_MODE_ICON);
      frag.appendChild(fromHTMLTemplate(action)());
      frag.querySelector("a.searchOne").addEventListener("click", function() {
        return me.resource.search(true);
      });
      if (showSearchAll) {
        searchAll = function() {
          return me.resource.parser.resources.forEach(function(r) {
            return r.search(true);
          });
        };
        return frag.querySelector("a.searchAll").addEventListener("click", searchAll);
      }
    }

    show_writereview(data) {
      var el, reviewsDismissFn, reviewsFn, reviewsUrl, supportFn, supportStyle, supportUrl, tmpl;
      if (this.resource.parser._hideUpdateMessages) {
        return;
      }
      reviewsUrl = this.browserApi.i18n.getMessage("reviewUrl");
      supportUrl = urlutils.concat(this.browserApi.i18n.getMessage("webRoot"), "/support-us");
      supportStyle = data.supportStyle || "c";
      reviewsFn = "document.querySelector(\"#libraryUserMessage[data-name=review]\").remove(); document.dispatchEvent(new CustomEvent(\"libraryEvent\",{\"detail\":{\"name\":\"review:click\"}}));";
      reviewsDismissFn = "document.querySelector(\"#libraryUserMessage[data-name=review]\").remove();document.dispatchEvent(new CustomEvent(\"libraryEvent\",{\"detail\":{\"name\":\"review:dismissed\"}}));";
      supportFn = "document.querySelector(\"#libraryUserMessage[data-name=review]\").remove();document.dispatchEvent(new CustomEvent(\"libraryEvent\",{\"detail\":{\"name\":\"supportus:click\"}}));";
      tmpl = fromTemplate("<span>Find this extension useful?<br />Take a moment to <a href='<%= reviewUrl %>' onclick='<%= tracking %>' target='_blank'>post a rating/review</a> or <a href='<%= supportUrl %>' class='style_<%= supportStyle %>' target='_blank' onclick='<%= trackingSupport %>'> support the project</a>. Thank you.</span>");
      el = tmpl({
        reviewUrl: reviewsUrl,
        supportUrl: supportUrl,
        tracking: reviewsFn,
        trackingSupport: supportFn,
        supportStyle: supportStyle
      });
      this.usermessage('review', el, reviewsDismissFn);
    }

    show_spinner(root, targetId, message) {
      var el;
      el = "<div style=\"float: left\"> <span class=\"icon icon-spinner rotate\"></span> </div>";
      return this.updateTarget(root, targetId, el, message);
    }

    show_error(root, targetId, message) {
      return this.updateTarget(root, targetId, icons.ALERT_ICON, message);
    }

    updateTarget(root, targetId, sprite, message) {
      var el, target;
      el = this.templates.textBox({
        message: message,
        sprite: sprite
      });
      target = $empty(root, targetId);
      target.appendChild(el);
      target.style.display = "block";
      return target;
    }

    all_catalogs_have_results(state, catalogs) {
      if (catalogs.length === 0) {
        return false;
      }
      return catalogs.reduce(function(acc, el) {
        if (state.catalogResults[el.id] === void 0) {
          return false;
        }
        return acc;
      }, true);
    }

    show_available(state) {
      var me;
      if (state.libraries) {
        me = this;
        return state.libraries.forEach(function(library) {
          var enabledCatalogs;
          enabledCatalogs = library.catalogs.filter(function(catalog) {
            return catalog.enabled;
          });
          if (me.all_catalogs_have_results(state, enabledCatalogs)) {
            return me.show_available_library(state, library, enabledCatalogs);
          }
        });
      }
    }

    show_available_library(state, library, catalogs) {
      var bindingFilter, bindingFilterExists, d, displayedItems, hiddenContainer, items, key, me, msg, target, trigger;
      me = this;
      d = this.getDisplayElementForLibrary(library.id).querySelector(".Status");
      $empty(d);
      items = catalogs.reduce(function(acc, catalog) {
        var results;
        results = state.catalogResults[catalog.id];
        if (results === void 0 || results.data === void 0 || results.data.matches === void 0) {
          return acc;
        }
        if (results.failureReason !== void 0) {
          return acc;
        }
        items = results.data.matches.map(function(item) {
          var rv;
          rv = Object.assign({}, item);
          rv.catalog_title = catalog.name;
          return rv;
        });
        acc = acc.concat(items);
        return acc;
      }, []);
      bindingFilterExists = state.config.bindingFilter && state.config.bindingFilter.length > 0;
      bindingFilter = function(acc, item) {
        if (!bindingFilterExists || state.config.bindingFilter.indexOf(item.binding) >= 0) {
          acc.visible.push(item);
        } else {
          acc.hidden.push(item);
        }
        return acc;
      };
      displayedItems = items.sort(bindingSort).reduce(bindingFilter, {
        visible: [],
        hidden: []
      });
      if (displayedItems.visible.length > 0) {
        displayedItems.visible.forEach(function(item) {
          var listing;
          listing = new ItemListing(me.resource, item, me.templates);
          return d.appendChild(listing.render(state, library.id));
        });
      } else {
        key = "noSimilarTitle";
        if (bindingFilterExists) {
          key = "noSimilarTitleForBinding";
        }
        msg = this.browserApi.i18n.getMessage(key);
        d.appendChild(fromHTML("<div class='no-results'></div>"));
        this.show_error(d, ".no-results", msg);
      }
      if (displayedItems.hidden.length > 0) {
        if (displayedItems.hidden.length === 1) {
          msg = this.browserApi.i18n.getMessage("additionalHiddenItem");
        } else {
          msg = this.browserApi.i18n.getMessage("additionalHiddenItems");
        }
        hiddenContainer = fromHTMLTemplate(`<div><div class='hiddenItemsTrigger'><div class='libMoreResults'>${msg}</div></div><div class='hiddenItems'></div></div>`)({
          count: displayedItems.hidden.length
        });
        target = hiddenContainer.querySelector(".hiddenItems");
        trigger = hiddenContainer.querySelector(".hiddenItemsTrigger");
        trigger.addEventListener("click", function() {
          trigger.style.display = "none";
          target.style.display = "block";
          if (displayedItems.visible.length === 0) {
            return d.querySelector('.no-results').style.display = "none";
          }
        });
        d.appendChild(hiddenContainer);
        target = hiddenContainer.querySelector(".hiddenItems");
        return displayedItems.hidden.forEach(function(item) {
          var listing;
          listing = new ItemListing(me.resource, item, me.templates);
          return target.appendChild(listing.render(state, library.id));
        });
      }
    }

    show_invalid(data) {
      var el;
      el = this.getDisplayElementForLibrary(data.catalog_id);
      return this.updateTarget(el, ".Status", icons.ALERT_ICON, this.browserApi.i18n.getMessage("invalidTitle"));
    }

    show_unavailable(data) {
      var el;
      el = this.getDisplayElementForLibrary(data.catalog_id);
      return this.updateTarget(el, ".Status", icons.ALERT_ICON, this.browserApi.i18n.getMessage("titleUnavailable"));
    }

    render_failures(state) {
      var anyFailures, me;
      if (!state.catalogResults) {
        return false;
      }
      me = this;
      anyFailures = Object.keys(state.catalogResults).reduce(function(acc, key) {
        var el, msg, target;
        el = state.catalogResults[key];
        if (!el || !el.failureReason) {
          return acc;
        }
        msg = "We cannot complete your search at this time. ";
        if (el.failureReason) {
          if (el.failureReason === "429_rate_limit") {
            msg += "The library catalog has responded with " + "a request to reduce the rate of requests (HTTP Error 429).";
          }
          if (el.failureReason === "503_server_unavailable") {
            msg += "The library catalog was unable to complete the request and is " + "having difficulty contacting its internal services (HTTP Error 503).";
          }
          if (el.failureReason === "504_proxy_timeout") {
            msg += "The library catalog was unable to complete the request and is " + "having difficulty contacting its internal services (HTTP Error 504).";
          }
          if (el.failureReason === "not_found") {
            msg += "The library catalog was unable to process " + "the request due to a possible configuration error (HTTP Error 404). Please contact " + "support@libraryextension.com so we can investigate the problem if it persists.";
          }
          if (el.failureReason === "server_error") {
            msg += "The library catalog was unable to process " + "the request due to a possible configuration error (HTTP Error 500). Please contact " + "support@libraryextension.com so we can investigate the problem if it persists.";
          }
          if (el.failureReason === "timeout") {
            msg += "The library catalog is taking too long to respond to our search." + " Please contact " + "support@libraryextension.com so we can investigate the problem if it persists.";
          }
        }
        target = me.getDisplayElementForLibrary(libraryFromKey(key).libraryId);
        me.updateTarget(target, ".Messages", icons.ALERT_ICON, msg);
        return true;
      }, false);
      return anyFailures;
    }

    getDisplayElementForLibrary(libraryId) {
      return this.root.querySelector(`div[data-library=\"${libraryId}\"]`);
    }

    render(state) {
      var me;
      if (this.root === null) {
        this.box(state);
      }
      if (!state) {
        return;
      }
      $empty(this.root, ".libextHeader");
      if (state.config.sellmode) {
        this.render_sellmode(state);
      } else {
        this.render_libraries(state);
        if (state.messages) {
          me = this;
          state.messages.forEach(function(msg) {
            return me.show_message(msg);
          });
        }
        if (state.review && state.review.writereview) {
          this.show_writereview(state.review);
        }
        if (state.status === "searching") {
          this.show_searching(state);
        }
        if (state.catalogResults) {
          this.show_available(state);
        }
        this.render_failures(state);
      }
      return this.root;
    }

    box(state) {
      var bindingToIcon, collapsableTarget, foundItem, fromImageUrl, infoDialog, itemsForCatalog, listingsByTerm, me, rejectedItem, rejectedReason, showInfo;
      this.root = fromHTMLTemplate(`<div class="libraryExtension" role="widget">
  <div class="libextTitle">
    <span>
      <a href="<%= url %>" target="_blank">
        Library Extension
      </a>
    </span>
    <div class="libraryExtInfo">&#x24D8;</div>
    <div class="le-collapsable le-collapsable-right le-collapse" role="button"></div>
  </div>
  <div class="libraryMessages cBoxInner"></div>
  <div class="libextHeader mbcContainer"></div>
</div>`)({
        url: addSource(`${this.browserApi.i18n.getMessage("webRoot")}/`, "installed_extension")
      });
      collapsableTarget = function(tgt) {
        var collapse;
        collapse = function(evt) {
          var container, el;
          el = evt.currentTarget;
          container = el.parentElement.parentElement.querySelector(tgt);
          if (el.classList.contains("le-collapse")) {
            el.classList.replace("le-collapse", "le-uncollapse");
            return container.style.display = "none";
          } else {
            el.classList.replace("le-uncollapse", "le-collapse");
            return container.style.display = "block";
          }
        };
        return collapse;
      };
      fromImageUrl = function(url) {
        if (url) {
          return `<div class=\"le-coverimage\"><img src=\"${url}\"></div>`;
        }
        return "";
      };
      bindingToIcon = function(binding) {
        var bindingIcon;
        bindingIcon = commonBindingIcons[binding] || null;
        if (state.config.showBindingIcons && bindingIcon) {
          return `<div class=\"icon ${bindingIcon}\"></div>`;
        }
        return "";
      };
      infoDialog = fromHTML(`<dialog class="libraryExtInfoDialog">
  <div class="libraryExtension libraryExtensionFlex">
    <div class="le-header">
      <h3>Library Extension</h3>
      <div class="t-title">Title identified:</div>
      <div class="le-title le-title-observed"></div>
      <div class="t-author">Author identified:</div>
      <div class="le-author le-author-observed"></div>
    </div>
    <div class="le-catalogs"></div>
  </div>
  <button class="le-close">Close</button>
</dialog>`);
      itemsForCatalog = fromHTMLTemplate(`<div>
  <div class="le-catalog"><%= catalog %></div>
  <div class="found-items"></div>
  <div class="rej-items"></div>
</div>`);
      listingsByTerm = fromHTMLTemplate(`<div>
  <div class="le-collapsable-heading">
    <div class="le-collapsable le-collapse"></div>
    <div class="le-description"></div>
  </div>
  <div class="le-item-listing"></div>
</div>`);
      foundItem = fromHTMLTemplate(`<div class="le-item le-matched-item">
  <%= coverImage|fromImageUrl %>
  <div>
    <div><span class="le-title"><a href="<%= url %>" target="_blank"><%= title %></a></span></div>
    <div class="t-author">by <span class="le-author"><%= author %></span></div>
    <div class="t-binding">Format: <%= binding|bindingToIcon %><span class="le-binding"><%= binding %></span></div>
    <div class="t-language">Language: <span class="le-language"><%= languages %></span></div>
    <div><%= availability.available %> of <%= availability.count %> copies available</div>
  </div>
</div>`, {
        fromImageUrl: fromImageUrl,
        bindingToIcon: bindingToIcon
      });
      rejectedItem = fromHTMLTemplate(`<div class="le-item le-unmatched-item">
  <%= coverImage|fromImageUrl %>
  <div>
    <div><span class="le-title"><a href="<%= url %>" target="_blank"><%= title %></a></span></div>
    <div class="t-author">by <span class="le-author"><%= author %></span></div>
    <div class="t-binding">Format: <%= binding|bindingToIcon %><span class="le-binding"><%= binding %></span></div>
    <div class="t-language">Language: <span class="le-language"><%= languages %></span></div>
    <div class="ref-reason">Reasons:</div><div class="rej-reasons"></div>
  </div>
</div>`, {
        fromImageUrl: fromImageUrl,
        bindingToIcon: bindingToIcon
      });
      rejectedReason = fromHTMLTemplate(`<div class="rej-reason"><%= reason %></div>`);
      me = this;
      showInfo = function(evt) {
        var catalogs, close, closeOutsideClick, collapsableSection, getMatches, getRejections, populateSectionByType;
        infoDialog.querySelector(".le-title").textContent = state.content.title;
        infoDialog.querySelector(".le-author").textContent = state.content.authors.join(', ');
        catalogs = infoDialog.querySelector(".le-catalogs");
        $empty(catalogs);
        populateSectionByType = function(type_, itemEl, descriptionTemplate, itemCustomizeCallback, displayHidden) {
          var populateSection;
          populateSection = function(target, field, collapsable) {
            var items, reduction, section;
            section = listingsByTerm();
            items = section.querySelector('.le-item-listing');
            if (displayHidden) {
              items.parentElement.querySelector(".le-collapsable").classList.replace("le-collapse", "le-uncollapse");
              items.style.display = "none";
            }
            reduction = (field[type_] || []).reduce(function(acc, el) {
              var item;
              item = itemEl(el);
              if (itemCustomizeCallback) {
                itemCustomizeCallback(item, el);
              }
              items.append(item);
              acc.count += 1;
              return acc;
            }, {
              count: 0
            });
            section.querySelector(".le-description").textContent = descriptionTemplate(reduction);
            if (reduction.count > 0) {
              section.classList = target.classList;
              section.querySelector(".le-collapsable").addEventListener("click", collapsable);
              target.replaceWith(section);
            }
            return reduction;
          };
          return populateSection;
        };
        getMatches = populateSectionByType('matches', foundItem, fromTemplate("Matched items (<%= count %>)"));
        getRejections = populateSectionByType('rejections', rejectedItem, fromTemplate("Unmatched items (<%= count %>)"), function(item, el) {
          var reasons;
          reasons = item.querySelector(".rej-reasons");
          return el.reasons.forEach(function(reason) {
            return reasons.append(rejectedReason(reason));
          });
        }, true);
        collapsableSection = collapsableTarget(".le-item-listing");
        state.libraries.forEach(function(libraryInfo) {
          return libraryInfo.catalogs.forEach(function(catalogInfo) {
            var catalogDiv, matches, rejections;
            catalogDiv = itemsForCatalog({
              catalog: `${libraryInfo.name} &bull; ${catalogInfo.name}`
            });
            if (!state.catalogResults[catalogInfo.id]) {
              return;
            }
            rejections = getRejections(catalogDiv.querySelector(".rej-items"), state.catalogResults[catalogInfo.id].data, collapsableSection);
            matches = getMatches(catalogDiv.querySelector(".found-items"), state.catalogResults[catalogInfo.id].data, collapsableSection);
            if (rejections.count + matches.count > 0) {
              return catalogs.append(catalogDiv);
            }
          });
        });
        close = function(_evt) {
          return infoDialog.close();
        };
        closeOutsideClick = function(evt) {
          var bounds;
          bounds = infoDialog.getBoundingClientRect();
          if ((evt.pageX < bounds.left || evt.pageX > bounds.right) || (evt.pageY < bounds.top || evt.pageY > bounds.bottom)) {
            me.docRoot.removeEventListener("click", closeOutsideClick, {
              capture: true
            });
            return infoDialog.close();
          }
        };
        infoDialog.querySelector(".le-close").addEventListener("click", close, {
          capture: true
        });
        me.docRoot.addEventListener("click", closeOutsideClick, {
          capture: true
        });
        me.docRoot.append(infoDialog);
        return infoDialog.showModal();
      };
      this.root.querySelector(".le-collapsable").addEventListener("click", collapsableTarget(".libextHeader"));
      this.root.querySelector(".libraryExtInfo").addEventListener("click", showInfo);
      return this.root;
    }

  };

  ResultWidgetFactory = function(browserApi) {
    var functor;
    functor = function(resource, root) {
      return new ResultWidget(resource, browserApi, root);
    };
    return functor;
  };

  unitTestable(libraryFromKey);

  unitTestable(ResultWidget);

  unitTestable(ResultWidgetFactory);

  // END src/frontend/result_widget.coffee
  plugins = [];

  theDocument = null;

  if (!isUnitTestMode) {
    if (window.libraryExtensionInstalled) {
      return;
    }
    window.libraryExtensionInstalled = true;
    DocumentProxy = class DocumentProxy {
      constructor() {
        this.root = document.documentElement;
      }

      getPageUrl() {
        return window.location.toString();
      }

      getHost() {
        return window.location.host;
      }

    };
    theDocument = new DocumentProxy();
  }

  registerSite = function(cls) {
    unitTestable(cls);
    if (!isUnitTestMode) {
      return plugins.push(cls);
    }
  };

  // BEGIN src/frontend/layouts/quick_checkout.coffee
  QuickCheckoutHelper = class QuickCheckoutHelper {
    constructor(app1, is_debug) {
      this.isSingleClickCheckoutEnabled = this.isSingleClickCheckoutEnabled.bind(this);
      this._getQuickHoldLink = this._getQuickHoldLink.bind(this);
      this._getCheckoutLink = this._getCheckoutLink.bind(this);
      this.addSingleClickCheckout = this.addSingleClickCheckout.bind(this);
      this.app = app1;
      this.is_debug = is_debug;
      document.addEventListener("quickCheckout", function(evt) {
        return app.conn.sendRequest({
          action: evt.detail.action,
          request: evt.detail
        });
      });
    }

    isSingleClickCheckoutEnabled() {
      return this.is_debug;
    }

    _getEasyLink(action, url, libraryid, link_text) {
      var bookid, data, link;
      bookid = /id=(.+)/.exec(url);
      if (!bookid) {
        bookid = /\/(.*?)$/.exec(url)[1];
      }
      data = {
        action: action,
        url: url,
        libraryid: libraryid,
        bookid: bookid
      };
      link = $("<a>").addClass("libHold").text(link_text).click(function(evt) {
        var notifyEvent;
        notifyEvent = new CustomEvent("quickCheckout", {
          detail: data
        });
        document.dispatchEvent(notifyEvent);
        evt.stopPropagation();
        evt.preventDefault();
        return false; // .data(data) # onclick
      });
      return link;
    }

    _getQuickHoldLink(url, libraryid) {
      return this._getEasyLink("quickHold", url, libraryid, this.SINGLECLICKHOLDTEXT);
    }

    _getCheckoutLink(url, libraryid) {
      return this._getEasyLink("quickCheckout", url, libraryid, this.SINGLECLICKBORROWTEXT);
    }

    addSingleClickCheckout(row, libraryid, actions, container) {
      var bookid;
      if (!this.isSingleClickCheckoutEnabled()) {
        return;
      }
      bookid = /id=(.+)/.exec(row.link);
      if (!bookid) {
        bookid = /\/(.*?)$/.exec(row.link)[1];
      }
      if (row.copiesAvailable > 0) { // QuickCheckout
        actions.append($("<div>").append(this._getCheckoutLink(row.link, libraryid))); // QuickHold
      } else {
        actions.append($("<div>").append(this._getQuickHoldLink(row.link, libraryid)));
      }
      container.append($(`<div class=\"quickstatus\" id=\"quickStatus_${libraryid}_${bookid}\">`));
    }

    updateCheckoutStatus(data, resource, show_spinner_cb, show_confirm_cb, show_error_cb) {
      var bookid, checkout_state, libraryid, target;
      checkout_state = data.state.state;
      bookid = data.state.bookid;
      libraryid = data.state.libraryid;
      target = `#quickStatus_${libraryid}_${bookid}`;
      if (checkout_state === "created") {
        show_spinner_cb(resource, target, "Getting ready to checkout title...");
      }
      if (checkout_state === "existing_checkout_found") {
        show_confirm_cb(resource, target, "You already have a copy of this title checked out!");
      }
      if (checkout_state === "borrow_clicked") {
        show_spinner_cb(resource, target, "Checking out a copy...");
      }
      if (checkout_state === "need_credentials") {
        show_error_cb(resource, target, "Credentials Needed! link here to the tab");
      }
      if (checkout_state === "need_email") {
        show_error_cb(resource, target, "Overdrive needs your email address! link here to the tab");
      }
      if (checkout_state === "error") {
        show_error_cb(resource, target, "Whoops!  We hit an error page");
      }
      if (checkout_state === "borrow_pending_download") {
        show_spinner_cb(resource, target, "Checkout complete, preparing to download");
      }
      if (checkout_state === "borrow_download_click") {
        show_spinner_cb(resource, target, "Requesting book from Amazon");
      }
      if (checkout_state === "complete") {
        return show_confirm_cb(resource, target, "Checkout complete.");
      }
    }

    updateHoldStatus(data, resource, show_spinner_cb, show_confirm_cb, show_error_cb) {
      var bookid, hold_state, libraryid, target;
      hold_state = data.state.state;
      bookid = data.state.bookid;
      libraryid = data.state.libraryid;
      target = `#quickStatus_${libraryid}_${bookid}`;
      if (hold_state === "created") {
        show_spinner_cb(resource, target, "Getting ready to place hold...");
      }
      if (hold_state === "hold_clicked") {
        show_spinner_cb(resource, target, "Placing hold...");
      }
      if (hold_state === "complete") {
        show_confirm_cb(resource, target, "Hold complete!");
      }
      if (hold_state === "existing_hold_found") {
        show_confirm_cb(resource, target, "Existing hold found!");
      }
      if (hold_state === "need_credentials") {
        show_error_cb(resource, target, "Credentials Needed! link here to the tab");
      }
      if (hold_state === "need_email") {
        show_error_cb(resource, target, "Overdrive needs your email address! link here to the tab");
      }
      if (hold_state === "error") {
        return show_error_cb(resource, target, "Whoops!  We hit an error page");
      }
    }

  };

  unitTestable(QuickCheckoutHelper);

  // END src/frontend/layouts/quick_checkout.coffee
  // BEGIN src/frontend/layouts/search_layout.coffee

    // BEGIN src/api_client.coffee
  ApiClient = class ApiClient {
    constructor(browser) {
      this.search = this.search.bind(this);
      this.browser = browser;
      try {
        this.host = browser.getMessage("apiRoot");
      } catch (error) {
        this.host = "https://api.libraryextension.com";
      }
      this.timeout = 1000;
    }

    search(term) {
      var headers, url;
      url = urlutils.concat(this.host, "/api/library/search?term=" + encodeURIComponent(term));
      headers = {
        "Accept": "application/json",
        "X-Extension-Version": this.browser.getMessage("")
      };
      return fetch(url, {
        mode: "cors",
        headers: headers
      }).then(function(resp) {
        if (resp.ok) {
          return resp.json();
        }
        return {};
      });
    }

  };

  unitTestable(ApiClient);

  // END src/api_client.coffee

    // BEGIN src/frontend/layouts/site_layout.coffee
  SiteLayout = class SiteLayout {
    constructor(documentProxy, parser, conn, browserApi = api) {
      this.getRequest = this.getRequest.bind(this);
      this.setConnection = this.setConnection.bind(this);
      this.messageHandler = this.messageHandler.bind(this);
      this.createEventListener = this.createEventListener.bind(this);
      this.run = this.run.bind(this);
      this.doc = documentProxy;
      this.parser = parser;
      this.libraries = {};
      this.quickCheckout = null;
      this.debugger = new FrontendDebugger(documentProxy, this);
      this.display_mode = "traditional";
      this.factory = ResultWidgetFactory(browserApi);
      this.setConnection(conn);
    }

    getRequest() {
      return this.parser.getResources()[0].toJSON();
    }

    setConnection(conn) {
      var me;
      me = this;
      me.conn = conn;
      me.conn.messageHandler = me.messageHandler;
      return this.parser.setConnection(conn);
    }

    messageHandler(resourceId, data) {
      var resource;
      resource = this.parser.resourceMap[resourceId];
      this.debugger.setEnabled(data.debug);
      logger.debug("Received message: ");
      logger.dir(data);
      if (this.parser.isDetailPage()) {
        this.debugger.showSummary(this.parser, data);
      }
      if (resource) {
        return resource.update(data);
      }
    }

    createEventListener() {
      var me;
      me = this;
      document.addEventListener("libraryEvent", function(e) {
        var evt, exc;
        evt = e.detail;
        if (evt) {
          logger.debug(evt);
        }
        try {
          if (evt.name === "search:click") {
            me.conn.sendRequest({
              action: "startCatalogSearch",
              request: me.getRequest() // XXX: replace with context
            });
          }
          return me.conn.sendRequest({
            action: "measure",
            data: evt,
            request: me.getRequest() // XXX: replace with context
          });
        } catch (error) {
          exc = error;
          return logger.exception("createEventListener", exc);
        }
      });
      if (this.parser.refreshOnEvents) {
        return this.parser.refreshOnEvents.forEach(function(el) {
          return window.addEventListener(el, me.run);
        });
      }
    }

    getBinding() {}

    run() {
      var foundResources, lastRefreshTime, maxRefreshInterval, me, refreshAnyVisible;
      if (this.quickCheckout === null) {
        this.quickCheckout = new QuickCheckoutHelper(this, false);
      }
      if (!this.parser.isDetailPage()) {
        return;
      }
      me = this;
      foundResources = this.parser.getResources({
        factory: me.factory
      });
      maxRefreshInterval = 0.3;
      lastRefreshTime = 0;
      refreshAnyVisible = function() {
        var now, unqueriedCount;
        now = Date.now();
        if (lastRefreshTime + maxRefreshInterval < now) {
          lastRefreshTime = now;
          unqueriedCount = foundResources.reduce(function(acc, el) {
            if (el.isValid() && !el.isQueried() && el.isVisible()) {
              el.search();
              return acc;
            }
            return acc + 1;
          }, 0);
          if (unqueriedCount === 0) {
            document.removeEventListener("resize", refreshAnyVisible);
            return document.removeEventListener("scroll", refreshAnyVisible);
          }
        }
      };
      document.addEventListener("resize", refreshAnyVisible);
      document.addEventListener("scroll", refreshAnyVisible);
      return refreshAnyVisible();
    }

  };

  GenericSiteLayoutFactory = function(doc, plugin, conn) {
    return new SiteLayout(doc, plugin, conn);
  };

  // END src/frontend/layouts/site_layout.coffee

    // BEGIN src/frontend/library_search_widget.coffee
  Eventable = class Eventable {
    constructor() {
      this.addEventListener = this.addEventListener.bind(this);
      this.notifyEvent = this.notifyEvent.bind(this);
      this.events = {};
    }

    addEventListener(name, callback) {
      var callback_list;
      callback_list = this.events[name] || [];
      callback_list.push(callback);
      return this.events[name] = callback_list;
    }

    notifyEvent(name, value) {
      var callback_list;
      callback_list = this.events[name] || [];
      return callback_list.forEach(function(cb) {
        return cb({
          data: value
        });
      });
    }

  };

  LibraryResultWidget = class LibraryResultWidget extends Eventable {
    constructor() {
      super();
    }

  };

  LibraryResultsListWidget = class LibraryResultsListWidget extends Eventable {
    constructor() {
      super();
    }

  };

  LibrarySearchWidgetDialog = class LibrarySearchWidgetDialog extends Eventable {
    constructor(options) {
      super();
      this.render = this.render.bind(this);
      this.render_results = this.render_results.bind(this);
      this.box = this.box.bind(this);
      this.root = null;
      this.options = Object.assign({}, options);
      this.state = {};
      this.resultTemplate = fromHTMLTemplate("<div class=\"libraryResult\"> <div class=\"libraryName\"><%= name %></div> <div class=\"state\"><%= cityIfFound %><%= state %>, <%= country %></div> <button><%= action %> Library</button> </div>");
      this.resultSummaryTemplate = fromHTMLTemplate("<div class=\"libraryResultSummary\"> <b><%= count %></b> matching <%= libraries %> found </div>");
      this.flashTemplate = fromHTMLTemplate("<div class=\"libraryExtensionFlash\"> <%= message %> </div>");
    }

    render(state) {
      var el, me;
      boundMethodCheck(this, LibrarySearchWidgetDialog);
      if (this.root === null) {
        this.box(state);
      }
      this.state = Object.assign({}, this.state, state);
      if (state.keyword !== this.state.oldKeyword) {
        this.state.oldKeyword = state.keyword;
        this.render_results(state);
      }
      me = this;
      if (this.state.flash !== this.state.flashMessage) {
        this.state.flashMessage = state.flash;
        if (!this.state.flashTimeout) {
          this.state.flashTimeout = setTimeout(function() {
            return me.render({
              flash: null,
              flashTimeout: null
            });
          }, 3000);
        }
        if (this.state.flashMessage) {
          el = this.flashTemplate({
            message: this.state.flashMessage
          });
          this.root.appendChild(el);
        } else {
          if (this.root.querySelector(".libraryExtensionFlash")) {
            this.root.querySelector(".libraryExtensionFlash").remove();
          }
        }
      }
      return this.root;
    }

    render_results(state) {
      var action, compare, el, me, res, resultCount, summary;
      boundMethodCheck(this, LibrarySearchWidgetDialog);
      res = this.root.querySelector(".results");
      $empty(res);
      me = this;
      compare = function(a, b) {
        if (a.name.toLowerCase().indexOf(state.keyword) < b.name.toLowerCase().indexOf(state.keyword)) {
          return -1;
        }
        if (a.name.toLowerCase().indexOf(state.keyword) > b.name.toLowerCase().indexOf(state.keyword)) {
          return 1;
        }
        if (a.name.length < b.name.length) {
          return -1;
        }
        if (a.name.length > b.name.length) {
          return 1;
        }
        if (a.state < b.state) {
          return -1;
        }
        return 1;
      };
      action = this.options.libraryActionString.action_button;
      resultCount = (state.results || []).sort(compare).reduce(function(acc, entry) {
        var el, opts;
        opts = Object.assign({
          action: action
        }, entry);
        if (opts.city) {
          opts.cityIfFound = opts.city + ", ";
        }
        el = me.resultTemplate(opts);
        el.querySelector("button").addEventListener("click", function(e) {
          return me.notifyEvent("libraryActionClick", {
            library_id: entry.id,
            action: me.options.libraryAction
          });
        });
        res.appendChild(el);
        return acc + 1;
      }, 0);
      summary = this.root.querySelector(".resultsSummary");
      $empty(summary);
      if (resultCount >= 0) {
        el = me.resultSummaryTemplate({
          count: resultCount,
          libraries: pluralize("library", resultCount, "libraries")
        });
        return summary.appendChild(el);
      }
    }

    box(state) {
      var el, initialValue, me;
      boundMethodCheck(this, LibrarySearchWidgetDialog);
      initialValue = (state.initialValue || "").trim();
      el = fromHTMLTemplate("<div class=\"LibraryExtensionSearchWidget\"> <div> <div class=\"searchCaption\">Search for a library by name</div> <input name=\"searchText\" value=\"<%= initialValue %>\" /> </div> <div class=\"results\"> </div> <div class=\"resultsSummary\"> </div> </div>")({
        initialValue: initialValue
      });
      this.root = el;
      me = this;
      el.querySelector("input").addEventListener("input", function(e) {
        var v;
        v = e.target.value;
        if (me.state.initialValue !== v) {
          return me.notifyEvent("searchKeywordChanged", v);
        }
      });
      if (initialValue) {
        me.notifyEvent("searchKeywordChanged", initialValue);
      }
      return el;
    }

  };

  LibrarySearchWidget = class LibrarySearchWidget extends Eventable {
    constructor(doc, options) {
      super();
      this.render = this.render.bind(this);
      this.box = this.box.bind(this);
      this.button = this.button.bind(this);
      this.hasButton = this.hasButton.bind(this);
      this.doc = doc;
      this.root = null;
      this.buttonRoot = null;
      this.options = Object.assign({}, options || {});
      this.state = {
        dialogOpen: false
      };
    }

    render(state) {
      var me;
      boundMethodCheck(this, LibrarySearchWidget);
      if (this.root === null) {
        this.box(state);
      }
      if (this.hasButton && this.buttonRoot === null) {
        this.button(state);
      }
      me = this;
      this.state = Object.assign({}, this.state, state);
      if (this.state.dialogOpen) {
        this.dialog.render(state);
      }
      return this.root;
    }

    box(state) {
      var dialogParent, el, me;
      boundMethodCheck(this, LibrarySearchWidget);
      this.dialog = new LibrarySearchWidgetDialog(this.options);
      me = this;
      this.dialog.addEventListener("searchKeywordChanged", function(v) {
        return me.notifyEvent("searchKeywordChanged", v.data);
      });
      this.dialog.addEventListener("libraryActionClick", function(v) {
        return me.notifyEvent("libraryActionClick", v.data);
      });
      el = fromHTMLTemplate("<div id=\"LibraryExtensionSearchWidgets\"> <div class=\"LibraryExtensionSearchWidgetDialog\"> </div> </div>")();
      if (!this.hasButton()) {
        el.querySelector(".LibraryExtensionSearchWidgetDialog").style.display = "block";
        me.state.dialogOpen = true;
      }
      dialogParent = el.querySelector(".LibraryExtensionSearchWidgetDialog");
      dialogParent.appendChild(this.dialog.render(state));
      this.root = el;
      this.doc.root.querySelector(this.options.dialog.injection.point).insertAdjacentElement(this.options.dialog.injection.where, el);
      return el;
    }

    button(state) {
      var closeButton, el, me;
      boundMethodCheck(this, LibrarySearchWidget);
      me = this;
      el = fromHTMLTemplate("<div class=\"LibraryExtensionSearchWidgetButton\"> <button>Find Library in Library Extension</button> </div>")();
      el.querySelector(".LibraryExtensionSearchWidgetButton button").addEventListener("click", function(v) {
        me.root.querySelector(".LibraryExtensionSearchWidgetDialog").style.display = "block";
        me.state.dialogOpen = true;
        return me.render(me.state);
      });
      closeButton = fromHTMLTemplate("<button class=\"close\">Close</button>button>")();
      closeButton.addEventListener("click", function(v) {
        me.root.querySelector(".LibraryExtensionSearchWidgetDialog").style.display = "none";
        me.state.dialogOpen = false;
        return me.render(me.state);
      });
      this.root.querySelector(".LibraryExtensionSearchWidgetDialog").appendChild(closeButton);
      Object.keys(this.options.button.style || {}).forEach(function(k) {
        return el.style[k] = me.options.button.style[k];
      });
      this.buttonRoot = el;
      this.doc.root.querySelector(this.options.button.injection.point).insertAdjacentElement(this.options.button.injection.where, el);
      return el;
    }

    hasButton() {
      boundMethodCheck(this, LibrarySearchWidget);
      return this.options.useButtonToDisplayDialog;
    }

  };

  LibrarySearchResultWidget = class LibrarySearchResultWidget {
    constructor(parent, action) {
      this.root = null;
    }

  };

  LibrarySearchWidgetFactory = function() {
    var functor;
    functor = function(doc, options) {
      return new LibrarySearchWidget(doc, options);
    };
    return functor;
  };

  unitTestable(LibrarySearchWidget);

  unitTestable(LibrarySearchWidgetFactory);

  // END src/frontend/library_search_widget.coffee
  SearchLayout = class SearchLayout extends SiteLayout {
    constructor(documentProxy, parser, conn, api_client, options) {
      var defaults;
      super(documentProxy, parser, conn);
      this.libraryActionClick = this.libraryActionClick.bind(this);
      this.requestKeywordSearch = this.requestKeywordSearch.bind(this);
      this.run = this.run.bind(this);
      this.factory = LibrarySearchWidgetFactory();
      this.client = api_client;
      this.searchActive = false;
      this.searchTerm = null;
      this.state = {};
      defaults = {
        libraryAction: "add",
        libraryActionString: {
          action_button: "Add",
          action_complete: "added"
        }
      };
      this.options = Object.assign(defaults, options || {});
    }

    async libraryActionClick(val) {
      var me, res, verb;
      boundMethodCheck(this, SearchLayout);
      me = this;
      if (!val.data.library_id) {
        return;
      }
      verb = this.options.libraryActionString.action_complete;
      res = (await this.conn.sendRequest({
        action: "addLibrary",
        data: val.data
      }));
      if (res.ok) {
        return me.widget.render({
          flash: `Library ${verb}!`
        });
      }
    }

    requestKeywordSearch(val) {
      var checkSearch, doSearch, me;
      boundMethodCheck(this, SearchLayout);
      me = this;
      if (val.data.length < 3) {
        return;
      }
      doSearch = function(keyword) {
        return me.client.search(keyword).then(function(res) {
          me.searchActive = null;
          me.state = Object.assign(me.state, {
            keyword: keyword,
            results: res
          });
          return me.widget.render(me.state);
        });
      };
      checkSearch = function() {
        me.searchTerm = val.data;
        if (me.searchActive) {
          return me.searchActive = setTimeout(checkSearch, 300);
        } else {
          me.searchActive = true;
          return doSearch(me.searchTerm);
        }
      };
      return checkSearch();
    }

    run() {
      var el, initialValue;
      boundMethodCheck(this, SearchLayout);
      el = this.doc.root.querySelector(this.options.dialog.injection.point);
      if (el) {
        initialValue = this.parser.getInitialSearchKeyword();
        this.widget = this.factory(this.doc, this.options);
        this.widget.addEventListener("searchKeywordChanged", this.requestKeywordSearch);
        this.widget.addEventListener("libraryActionClick", this.libraryActionClick);
        this.state = {
          initialValue: initialValue
        };
        return this.widget.render(this.state);
      }
    }

  };

  SearchLayoutFactory = function(options) {
    return function(doc, plugin, conn, api_client) {
      api_client = api_client || new ApiClient();
      return new SearchLayout(doc, plugin, conn, api_client, options);
    };
  };

  // END src/frontend/layouts/search_layout.coffee

  // BEGIN src/sites/abebooks.coffee

  // BEGIN src/sites/base_parser.coffee

  // BEGIN src/frontend/resource.coffee
  resourceIdGenerator = CounterFactory("resource");

  Resource = class Resource {
    constructor(src, anchorRoot, resourceRoot, selector1, factory1) {
      this.setConnection = this.setConnection.bind(this);
      this.destroy = this.destroy.bind(this);
      this.isQueried = this.isQueried.bind(this);
      this.isValid = this.isValid.bind(this);
      this.isVisible = this.isVisible.bind(this);
      this.getDisplayElement = this.getDisplayElement.bind(this);
      this.getDisplayElementForLibrary = this.getDisplayElementForLibrary.bind(this);
      this.render = this.render.bind(this);
      this.toJSON = this.toJSON.bind(this);
      this.update = this.update.bind(this);
      this.search = this.search.bind(this);
      this.getState = this.getState.bind(this);
      this.selector = selector1;
      this.factory = factory1;
      this.root = anchorRoot;
      this.document = src.doc.root;
      this.resourceRoot = resourceRoot || src.doc.root;
      this.resourceId = resourceIdGenerator();
      this.parser = src;
      this.id = src.getId(this);
      this.authors = src.getAuthors(this);
      this.binding = src.getBinding(this);
      this.category = src.getCategory(this);
      this.isbn = src.getIsbn(this) || [];
      this.isbn13 = src.getIsbn13(this) || [];
      this.title = src.getTitle(this);
      this.queried = false;
      this.displayElement = null;
      this.resetElementAnchor = false;
      this._state = {
        config: {},
        catalogResults: {}
      };
      this.conn = null;
      this.el = null;
    }

    setConnection(conn) {
      this.conn = conn;
      return this.conn.registerEvent({
        event: "pauseStateChange",
        callback: this.render
      });
    }

    destroy() {
      return this.conn.unregisterEvent({
        event: "pauseStateChange",
        callback: this.render
      });
    }

    isQueried() {
      return this.queried;
    }

    isValid() {
      return !!this.title;
    }

    isVisible() {
      var rect;
      rect = this.resourceRoot.getBoundingClientRect();
      return (rect.top >= 0 && ((rect.top + rect.height) <= this.document.clientHeight) && rect.left >= 0 && ((rect.left + rect.width) <= this.document.clientWidth)) || (rect.bottom >= 0 && ((rect.bottom - rect.height) <= this.document.clientHeight) && rect.right >= 0 && ((rect.right - rect.width) <= this.document.clientWidth));
    }

    getDisplayElement() {
      return this.displayElement;
    }

    getDisplayElementForLibrary(libraryId) {
      return this.displayElement.querySelector(`div[data-library=\"${libraryId}\"]`);
    }

    render(state) {
      if (this.displayElement === null) {
        this.el = this.factory(this, this.document);
        this.displayElement = this.el.render(this._state);
        this.resetElementAnchor = true;
      }
      if (this.resetElementAnchor) {
        this.parser._addToAnchor(this.root, this.displayElement);
        this.parser.onWindowScroll();
        return this.resetElementAnchor = false;
      } else {
        return this.el.render(state);
      }
    }

    toJSON() {
      return {
        id: this.id,
        authors: this.authors,
        binding: this.binding,
        category: this.category,
        isbn: this.isbn,
        isbn13: this.isbn13,
        title: this.title,
        resource_id: this.resourceId
      };
    }

    handleMigrateUnavailable(state) {
      if (state.status === "unavailable") {
        state = {
          catalog_id: state.catalog_id,
          data: []
        };
      }
      return state;
    }

    update(state) {
      if (state.name === "libraryResults") {
        state = this.handleMigrateUnavailable(state);
        this._state.catalogResults[state.catalog_id] = Object.assign(this._state.catalogResults[state.catalog_id] || {}, state);
      } else {
        this._state = Object.assign(this._state, state);
      }
      this.render(this._state);
      if (this.parser.onResize) {
        return this.parser.onResize();
      }
    }

    async search(demand = false) {
      var res, status;
      this.queried = true;
      status = {
        status: "searching",
        content: this.toJSON()
      };
      if (demand) {
        status.hide_on_demand_message = demand;
      }
      this.update(status);
      if (!demand) {
        res = (await this.conn.sendRequest({
          action: "register",
          request: this.toJSON(),
          searchMode: this.parser.getSearchMode()
        }));
        this.update(res);
        if (res.status === "wait_for_demand" || res.status === "paused") {
          return;
        }
      }
      res = (await this.conn.sendRequest({
        action: "startCatalogSearch",
        request: this.toJSON(),
        searchMode: this.parser.getSearchMode()
      }));
      return this.update(res);
    }

    getState() {
      return this._state;
    }

  };

  unitTestable(Resource);

  // END src/frontend/resource.coffee
  SiteParser = class SiteParser {
    constructor(documentProxy) {
      this.applyConfigSettings = this.applyConfigSettings.bind(this);
      this.setConnection = this.setConnection.bind(this);
      this.addResource = this.addResource.bind(this);
      this.getResources = this.getResources.bind(this);
      this.getBinding = this.getBinding.bind(this);
      this.getTitle = this.getTitle.bind(this);
      this._getAnchorElement = this._getAnchorElement.bind(this);
      this._getConfigsByAnchor = this._getConfigsByAnchor.bind(this);
      this._addToAnchor = this._addToAnchor.bind(this);
      this._hasAnyIsbn = this._hasAnyIsbn.bind(this);
      this.isDetailPage = this.isDetailPage.bind(this);
      this.applies = this.applies.bind(this);
      this.hasSearchLayoutAnchor = this.hasSearchLayoutAnchor.bind(this);
      this.attrIf = this.attrIf.bind(this);
      this.getId = this.getId.bind(this);
      this.doc = documentProxy;
      this.libraries = {};
      this._title = null;
      this._binding = null;
      this._category = null;
      this._authors = null;
      this._skipIsbnCheck = false;
      this.resources = [];
      this.resourceMap = {};
      this.resourceById = {};
      this.conn = null;
      this.observerById = {};
      this.BORROWTEXT = "Borrow";
      this.VIEWTEXT = "View";
      this.HOLDTEXT = "Place a hold";
      this.SINGLECLICKBORROWTEXT = "Instant Borrow";
      this.SINGLECLICKHOLDTEXT = "Instant Hold";
      this.ON_DEMAND_MODE_BUTTON_TEXT = "Search your libraries";
      this.ON_DEMAND_MODE_SEARCH_ALL_BUTTON_TEXT = null;
      this.ON_DEMAND_MODE_MESSAGE = "<span>Searches are on-demand.</span>";
      this.ON_DEMAND_MODE_ICON = icons.QUOTE_ICON;
      this.layoutFactories = [GenericSiteLayoutFactory];
      this.configSettings = [];
      this.configByAnchor = {
        "__default__": {
          position: "afterbegin"
        }
      };
    }

    applyConfigSettings(configSettings) {
      return this.configSettings = configSettings || [];
    }

    getSearchMode() {
      return null;
    }

    setConnection(conn) {
      return this.conn = conn;
    }

    addResource(res) {
      if (res.isValid()) {
        res.setConnection(this.conn);
        this.resourceMap[res.resourceId] = res;
        this.resourceById[res.id] = res;
        return this.resources.push(res);
      }
    }

    getResources(settings) {
      var rv;
      if (this.resources.length === 0) {
        rv = new Resource(this, this._getAnchorElement(), null, null, settings.factory);
        this.addResource(rv);
      }
      return this.resources;
    }

    getCategory() {
      return "book";
    }

    getBinding(root) {
      return this._binding;
    }

    getTitle(root) {
      return this.getRawTitle(root);
    }

    getIsbn13(url) {
      return [];
    }

    getIsbn(url) {
      return [];
    }

    _getAnchorElement() {
      return this.doc.root.querySelector(this._anchorElement);
    }

    _getConfigsByAnchor(el) {
      var key, me;
      if (this.configByAnchor.hasOwnProperty(el.id)) {
        return this.configByAnchor[el.id];
      }
      me = this;
      key = Array.from(el.classList).find(function(cls) {
        return me.configByAnchor.hasOwnProperty(cls);
      }) || "__default__";
      return this.configByAnchor[key];
    }

    _addToAnchor(root, el) {
      var base, config;
      base = root;
      if (base) {
        config = this._getConfigsByAnchor(base);
        Object.getOwnPropertyNames(config.styles || {}).forEach(function(style) {
          return el.style[style] = config.styles[style];
        });
        base.insertAdjacentElement(config.position, el);
      }
      return base;
    }

    _hasAnyIsbn() {
      return (this.getIsbn().length > 0) || (this.getIsbn13().length > 0);
    }

    isDetailPage() {
      return this._getAnchorElement() !== null && (this._skipIsbnCheck || this._hasAnyIsbn());
    }

    isCollectionPage() {
      return false;
    }

    applies() {
      return !!(this._urlRegex.test(this.doc.getHost()) && (this.refreshOnEvents || this.isDetailPage())) || (this.hasSearchLayoutAnchor());
    }

    hasSearchLayoutAnchor() {
      return !!(this.searchLayoutOptions && this.doc.root.querySelector(this.searchLayoutOptions.dialog.injection.point) !== null);
    }

    attrIf(selector, attr) {
      var el;
      el = this.doc.root.querySelector(selector);
      return el && el.getAttribute(attr);
    }

    onWindowScroll() {}

    getId() {
      return this.doc.getPageUrl();
    }

    getInitialSearchKeyword() {
      return "";
    }

  };

  SiteParserWithScraper = class SiteParserWithScraper extends SiteParser {
    constructor() {
      super(...arguments);
      this.getId = this.getId.bind(this);
      this.getAuthors = this.getAuthors.bind(this);
      this.getRawTitle = this.getRawTitle.bind(this);
      this.isDetailPage = this.isDetailPage.bind(this);
      this.getSearchMode = this.getSearchMode.bind(this);
      this.scraperHasConfigSettingsFulfilled = this.scraperHasConfigSettingsFulfilled.bind(this);
      this.hasResources = this.hasResources.bind(this);
      this.getCollectionResources = this.getCollectionResources.bind(this);
      this.watchForChanges = this.watchForChanges.bind(this);
      this.getResources = this.getResources.bind(this);
    }

    getId(resource) {
      boundMethodCheck(this, SiteParserWithScraper);
      if (resource.selector.id) {
        return this.querySelector(resource.resourceRoot, resource.selector.id);
      }
      return this.doc.getPageUrl();
    }

    getAuthors(resource) {
      var authors, me, q, res;
      boundMethodCheck(this, SiteParserWithScraper);
      res = resource.selector.author;
      me = this;
      if (res.multiple) {
        q = function(root, sel) {
          return Array.from(me.querySelectorAll(root, sel));
        };
      } else {
        q = function(root, sel) {
          var r;
          r = me.querySelector(root, sel);
          return (r && [r]) || [];
        };
      }
      authors = q(resource.resourceRoot, res.selector);
      return Array.from(new Set(authors.map(function(el) {
        if (typeof el === "string") {
          return normalizeAuthor(el);
        }
        if (typeof res.selector !== "function" && res.selector.indexOf("itemprop") >= 0) {
          return normalizeAuthor(nodeToText(el.getAttribute("content") || el.dataset["content"] || el.textContent));
        }
        return normalizeAuthor(el.textContent);
      }).filter(function(el) {
        return el && el.length > 0;
      })));
    }

    getRawTitle(resource) {
      var res, title;
      boundMethodCheck(this, SiteParserWithScraper);
      try {
        res = resource.selector.title;
        title = this.querySelector(resource.resourceRoot, res.selector);
        if (title) {
          if (typeof title === "string") {
            return title.trim();
          }
          if (typeof res.selector !== "function" && res.selector.indexOf("itemprop") >= 0) {
            return (title.getAttribute("content") || title.dataset["content"] || title.textContent).trim();
          }
          return title.textContent.trim();
        }
      } catch (error) {
        0;
      }
      return null;
    }

    isDetailPage() {
      boundMethodCheck(this, SiteParserWithScraper);
      return this.hasResources();
    }

    querySelector(root, selector) {
      if (typeof selector === "function") {
        return selector(root);
      } else {
        if (selector) {
          return root.querySelector(selector);
        }
      }
      return root;
    }

    querySelectorAll(root, selector) {
      if (typeof selector === "function") {
        return selector(root);
      } else {
        return root.querySelectorAll(selector);
      }
    }

    getSearchMode() {
      boundMethodCheck(this, SiteParserWithScraper);
      return this.scraper.searchMode || null;
    }

    scraperHasConfigSettingsFulfilled(selector) {
      var expectedSettings, fulfilledSettings, me;
      boundMethodCheck(this, SiteParserWithScraper);
      if (!selector.configSettings) {
        return true;
      }
      me = this;
      expectedSettings = selector.configSettings.length;
      fulfilledSettings = selector.configSettings.reduce(function(acc, requiredSetting) {
        if (me.configSettings.find(function(configSetting) {
          return configSetting.name === requiredSetting.name && configSetting.value === requiredSetting.value;
        })) {
          acc.push(true);
        }
        return acc;
      }, []).length;
      return expectedSettings === fulfilledSettings;
    }

    hasResources() {
      var me, url;
      boundMethodCheck(this, SiteParserWithScraper);
      if (!this.scraper) {
        me = this;
        url = this.doc.getPageUrl();
        this.scraper = this.pageScrapers.find(function(el) {
          if (!me.scraperHasConfigSettingsFulfilled(el)) {
            return false;
          }
          if (el.selectors.find(function(selector) {
            var base, items, pseudoResource;
            base = me.querySelector(me.doc.root, selector.collection);
            if ((!el.urlMatch || el.urlMatch.exec(url)) && base) {
              items = me.getCollectionResources(base, selector);
              if (items.length === 0) {
                return false;
              }
              pseudoResource = {
                resourceRoot: items[0],
                selector: {
                  title: selector.title
                }
              };
              return me.getRawTitle(pseudoResource) !== null;
            }
          })) {
            return el;
          }
        });
      }
      return !!this.scraper;
    }

    getCollectionResources(base, selector) {
      var candidates;
      boundMethodCheck(this, SiteParserWithScraper);
      candidates = this.querySelectorAll(base, selector.resource);
      return Array.from(candidates).reduce(function(acc, el) {
        if (!selector.injection.point || (el.querySelector(selector.injection.point) !== null || selector.injection.point === 'body')) {
          acc.push(el);
        }
        return acc;
      }, []);
    }

    watchForChanges(base, settings) {
      var me;
      boundMethodCheck(this, SiteParserWithScraper);
      me = this;
      if (!me.observerById[base.id]) {
        me.observerById[base.id] = new MutationObserver(function(mutations, obs) {
          var general_mutations, mutations_removing_extension;
          general_mutations = mutations.filter(function(el) {
            return !el.target.querySelector(".libraryExtension");
          });
          mutations_removing_extension = general_mutations.filter(function(el) {
            return Array.from(el.removedNodes).filter(function(n) {
              return n.querySelector && n.querySelector(".libraryExtension") !== null;
            }).length > 0;
          });
          if (general_mutations.find(function(tgt) {
            return tgt.target.id === base.id;
          }) || mutations_removing_extension.length > 0) {
            me.scraper = null;
            me.getResources(settings);
            return Object.keys(me.resourceMap).forEach(function(res) {
              var el;
              el = me.resourceMap[res];
              if (el.isValid() && !el.isQueried()) {
                return el.search();
              } else {
                return el.update({});
              }
            });
          }
        });
        return me.observerById[base.id].observe(base, {
          subtree: true,
          childList: true
        });
      }
    }

    getResources(settings) {
      var me, rv, updatePayload;
      boundMethodCheck(this, SiteParserWithScraper);
      me = this;
      if (this.hasResources()) {
        rv = this.scraper.selectors.reduce(function(acc, selector) {
          var base, items, r;
          base = me.querySelector(me.doc.root, selector.collection);
          if (!base) {
            return acc;
          }
          items = me.getCollectionResources(base, selector);
          if (me.scraper.refreshOnDOMChanges) {
            me.watchForChanges(base, settings);
          }
          r = items.reduce(function(acci, el) {
            var id_, newClass, newEl, position, res, scraperName, selectorName, target;
            position = me.querySelector(el, selector.injection.point) || (selector.injection.point === "body" && me.doc.root.querySelector("body"));
            try {
              id_ = me.querySelector(el, selector.id);
            } catch (error) {
              id_ = null;
            }
            if (id_ && position) {
              newEl = me.querySelector(fromHTML(selector.injection.element), selector.injection.selector);
              scraperName = (me.scraper.name || "default").replace(/ /g, '-');
              selectorName = (selector.description || "default").replace(/ /g, '-');
              newClass = `le-${me._site}-${scraperName}-${selectorName}`;
              newEl.classList.add(newClass);
              position.insertAdjacentElement(selector.injection.where, newEl);
              target = me.querySelector(newEl, selector.injection.target);
              if (me.resourceById[id_]) {
                res = me.resourceById[id_];
                res.root = target; // AnchorRoot
                res.resourceRoot = el;
                res.selector = selector;
                res.resetElementAnchor = true;
              } else {
                res = new Resource(me, target, el, selector, settings.factory);
              }
              if (acc.identifiers.indexOf(id_) < 0 && res.isValid()) {
                me.addResource(res);
                me.resourceMap[res.resourceId] = res;
                acc.elements.push(res);
                acc.identifiers.push(id_);
                res.update({});
              }
            }
            return acci + 1;
          }, 0);
          return acc;
        }, {
          elements: [],
          identifiers: []
        });
        updatePayload = {
          multipleItems: rv.elements.length > 1
        };
        rv.elements.forEach(function(res) {
          return res.update(updatePayload);
        });
        return rv.elements;
      } else if (me.pageInitializationDelayed) {
        setTimeout(function() {
          return me.getResources(settings);
        }, me.pageInitializationDelayed);
      }
      return [];
    }

  };

  // END src/sites/base_parser.coffee
  AbebooksPlugin = class AbebooksPlugin extends SiteParserWithScraper {
    constructor(documentProxy) {
      super(documentProxy);
      this._site = "abebooks_com";
      this._urlRegex = /abebooks.com/;
      this._skipIsbnCheck = true;
      this.pageScrapers = [
        {
          name: "main",
          urlMatch: /\/(BookDetailsPL|isbn)/,
          refreshOnDOMChanges: false,
          selectors: [
            {
              description: "detail item",
              collection: function(root) {
                try {
                  return root.querySelector("div#abe-content, main#abe-content");
                } catch (error) {
                  return null;
                }
              },
              resource: function(root) {
                return [root];
              },
              author: {
                selector: "#book-author, .plp-author"
              },
              title: {
                selector: "#book-title, .plp-title"
              },
              injection: {
                point: "div#bookPurchase, .pricing-info",
                element: "<div></div>",
                where: "afterbegin"
              }
            }
          ]
        }
      ];
    }

  };

  registerSite(AbebooksPlugin);

  // END src/sites/abebooks.coffee
  // BEGIN src/sites/accelerated_reader.coffee
  AcceleratedReaderPlugin = class AcceleratedReaderPlugin extends SiteParserWithScraper {
    constructor(documentProxy) {
      super(documentProxy);
      this.getIsbn13 = this.getIsbn13.bind(this);
      this.getIsbn = this.getIsbn.bind(this);
      this._site = "arbookfind";
      this._urlRegex = /arbookfind.co(m|.uk)/;
      this.pageScrapers = [
        {
          name: "main",
          urlMatch: /\/bookdetail.aspx/,
          refreshOnDOMChanges: false,
          selectors: [
            {
              description: "detail item",
              collection: "#tblMainTable",
              resource: "table.detail-table",
              id: function(root) {
                return root.querySelector("#ContentPlaceHolder1_ucBookDetail_lblQuizNumber").textContent;
              },
              author: {
                selector: "#ContentPlaceHolder1_ucBookDetail_lblAuthor"
              },
              title: {
                selector: "#ContentPlaceHolder1_ucBookDetail_lblBookTitle"
              },
              injection: {
                point: "#ContentPlaceHolder1_ucBookDetail_tblPublisherTable",
                element: "<div></div>",
                where: "beforebegin"
              }
            },
            {
              description: "detail item new",
              collection: "#ctl00_tblMainTable",
              resource: "table.detail-table",
              id: function(root) {
                return root.querySelector("#ctl00_ContentPlaceHolder1_ucBookDetail_lblQuizNumber").textContent;
              },
              author: {
                selector: "#ctl00_ContentPlaceHolder1_ucBookDetail_lblAuthor"
              },
              title: {
                selector: "#ctl00_ContentPlaceHolder1_ucBookDetail_lblBookTitle"
              },
              injection: {
                point: "#ctl00_ContentPlaceHolder1_ucBookDetail_tblPublisherTable",
                element: "<div></div>",
                where: "beforebegin"
              }
            }
          ]
        }
      ];
    }

    _extractIsbn(rows, validationCallback) {
      var isbnColumn, isbnList;
      isbnList = [];
      isbnColumn = null;
      rows.forEach(function(row, idx) {
        var cell, value;
        if (idx === 0) {
          isbnColumn = nodeListToArray(row.querySelectorAll("td")).findIndex(function(el) {
            return (el.textContent || "").toLowerCase() === "isbn";
          });
          return;
        }
        cell = row.cells[isbnColumn];
        value = cell.textContent.replace(/-/g, "");
        if (validationCallback(value)) {
          return isbnList.push(value);
        }
      });
      return isbnList;
    }

    getIsbn13(url) {
      var publisherTableId, rows;
      boundMethodCheck(this, AcceleratedReaderPlugin);
      publisherTableId = "#ContentPlaceHolder1_ucBookDetail_tblPublisherTable,#ctl00_ContentPlaceHolder1_ucBookDetail_tblPublisherTable";
      rows = this.doc.root.querySelector(publisherTableId).rows;
      rows = Object.keys(rows).map(function(x) {
        return rows[x];
      });
      return this._extractIsbn(rows, validateISBN13);
    }

    getIsbn(url) {
      var publisherTableId, rows;
      boundMethodCheck(this, AcceleratedReaderPlugin);
      publisherTableId = "#ContentPlaceHolder1_ucBookDetail_tblPublisherTable,#ctl00_ContentPlaceHolder1_ucBookDetail_tblPublisherTable";
      rows = this.doc.root.querySelector(publisherTableId).rows;
      rows = Object.keys(rows).map(function(x) {
        return rows[x];
      });
      return this._extractIsbn(rows, validateISBN);
    }

  };

  registerSite(AcceleratedReaderPlugin);

  // END src/sites/accelerated_reader.coffee
  // BEGIN src/sites/amazon.coffee
  AmazonPlugin = class AmazonPlugin extends SiteParser {
    constructor(doc) {
      super(doc);
      this.isDetailPage = this.isDetailPage.bind(this);
      this.getAuthors = this.getAuthors.bind(this);
      this.hasFailure = this.hasFailure.bind(this);
      this.getRawTitle = this.getRawTitle.bind(this);
      this.getCategory = this.getCategory.bind(this);
      this._amazonStoreId = this._amazonStoreId.bind(this);
      this.isVideoStreamingCategory = this.isVideoStreamingCategory.bind(this);
      this.isMusicCategory = this.isMusicCategory.bind(this);
      this.isBookCategory = this.isBookCategory.bind(this);
      this.isAudioBookCategory = this.isAudioBookCategory.bind(this);
      this.isDVDCategory = this.isDVDCategory.bind(this);
      this._getIsbnByLI = this._getIsbnByLI.bind(this);
      this.getBinding = this.getBinding.bind(this);
      this.getIsbn13 = this.getIsbn13.bind(this);
      this.getIsbn = this.getIsbn.bind(this);
      this.notifyStateChange = this.notifyStateChange.bind(this);
      this.show_quickCheckout = this.show_quickCheckout.bind(this);
      this._url = "www.amazon.com";
      this._site = "amzn";
      this.watchAdded = false;
      this._urlRegex = /amazon\./;
      this._skipIsbnCheck = true;
      this.configByAnchor = {
        "__default__": {
          position: "beforebegin"
        },
        "dv-dp-node-bottom": {
          styles: {
            width: "500px"
          },
          position: "beforebegin"
        }
      };
      this._anchorElement = "#desktop_buybox, #combinedBuyBox, #CombinedBuybox, .dv-dp-node-bottom, #mediaTabsGroup #footer";
    }

    isDetailPage() {
      var l;
      boundMethodCheck(this, AmazonPlugin);
      l = this.doc.getPageUrl();
      if (/gp\/registry/.test(l)) {
        return false;
      }
      if (l.indexOf("library-lend-redemption") >= 0) {
        return false;
      }
      return this._getAnchorElement() !== null && this.getCategory() !== null;
    }

    getAuthors() {
      var doc, keys, me, title;
      boundMethodCheck(this, AmazonPlugin);
      doc = this.doc.root;
      if (this._authors === null) {
        this._authors = [];
        me = this;
        keys = [".contributorNameTrigger", ".contributorNameID", "span.author a", "a[href*=field-author]"];
        if (this.isMusicCategory()) {
          keys = ["#ProductInfoArtistLink", "span.author a"];
        }
        keys.forEach(function(key) {
          return doc.querySelectorAll(key).forEach(function(el) {
            var val;
            if (/Visit Amazon's (.*) Page|search results/.exec(el.textContent)) {
              return;
            }
            val = normalizeAuthor(el.textContent);
            if (val.length > 0 && !me._authors.includes(val)) {
              return me._authors.push(val);
            }
          });
        });
        if (this._authors.length === 0) {
          title = this.getRawTitle();
          if (title.indexOf("by") >= 0) {
            this._authors[this._authors.length] = normalizeAuthor(title.substr(title.indexOf("by") + 3));
          }
        }
      }
      return this._authors;
    }

    hasFailure() {
      boundMethodCheck(this, AmazonPlugin);
      if (this.getRawTitle().length === 0) {
        return [
          {
            level: "warning",
            description: "The Product Title for this item is blank and a search cannot be performed. This appears to be a bug with Amazon's systems which causes the title to not be displayed.",
            user_direction: "Please try to refresh this title with another binding, or on another site."
          }
        ];
      }
      return false;
    }

    removeAmazonMarkupFromTitle(title) {
      if (!title || title.length === 0) {
        return null;
      }
      return title.toLowerCase().replace(/amazon.com:\s*/, "").replace(/on amazon music.*/, "").replace(/\s*watch (.*)/, "$1").replace(/^([^(]+?)([\s\W]*(season|series) .*)/, "$1").trim();
    }

    getRawTitle() {
      var doc, getMeta, getText, me, rawTitle, result;
      boundMethodCheck(this, AmazonPlugin);
      doc = this.doc.root;
      me = this;
      getMeta = function(key) {
        return me.attrIf("meta[name=" + key + "]", "content");
      };
      getText = function(selector) {
        var el;
        el = doc.querySelector(selector);
        if (el) {
          return el.textContent;
        }
        return null;
      };
      rawTitle = getText("#btAsinTitle") || getText("#productTitle") || getText("[data-automation-id=title]") || getMeta("title") || "";
      result = me.removeAmazonMarkupFromTitle(rawTitle);
      if (result && result.length > 0) {
        return result;
      }
      return null;
    }

    getCategory() {
      var category, categoryMap, realized_category;
      boundMethodCheck(this, AmazonPlugin);
      if (this._category === null) {
        categoryMap = {
          "audiobook": this.isAudioBookCategory,
          "book": this.isBookCategory,
          "dvd": this.isDVDCategory,
          "video": this.isVideoStreamingCategory,
          "music": this.isMusicCategory
        };
        realized_category = null;
        for (category in categoryMap) {
          if (categoryMap[category]()) {
            realized_category = category;
            break;
          }
        }
        logger.debug(`Category: ${realized_category}`);
        this._category = realized_category;
      }
      return this._category;
    }

    _amazonStoreId() {
      var searchOption;
      boundMethodCheck(this, AmazonPlugin);
      searchOption = this.doc.root.querySelector("#searchDropdownBox option[selected]");
      return this.attrIf("#storeID", "value") || this.attrIf("input[name=t]", "value") || (searchOption && searchOption.value.split('=')[1]) || "";
    }

    isVideoStreamingCategory() {
      var storeId;
      boundMethodCheck(this, AmazonPlugin);
      storeId = this._amazonStoreId();
      return storeId.indexOf("instant-video") >= 0 || this.doc.root.querySelector("div-dp-node-bottom");
    }

    isMusicCategory() {
      var storeId;
      boundMethodCheck(this, AmazonPlugin);
      storeId = this._amazonStoreId();
      return storeId.indexOf("music") >= 0;
    }

    isBookCategory() {
      boundMethodCheck(this, AmazonPlugin);
      return this.doc.root.querySelector("#authorFollow_feature_div, #books-entity-teaser, a[href*='bestsellers/books'], .kindle-price") !== null && !this.isAudioBookCategory();
    }

    isAudioBookCategory() {
      var meta, title;
      boundMethodCheck(this, AmazonPlugin);
      title = this.getRawTitle() || "";
      meta = this.attrIf("meta[name=title]", "content") || "";
      return title.indexOf("Audiobook") >= 0 || title.indexOf("Audio CD") >= 0 || title.indexOf("Audible Audio") >= 0 || meta.indexOf("Audible Audio") >= 0;
    }

    isDVDCategory() {
      var storeId;
      boundMethodCheck(this, AmazonPlugin);
      storeId = this._amazonStoreId();
      return storeId.indexOf("movies-tv") >= 0;
    }

    _getIsbnByLI(desc) {
      var doc, isbnTag;
      boundMethodCheck(this, AmazonPlugin);
      doc = this.doc.root;
      isbnTag = findFirstMatchingNode(doc, `#productDetailsTable li:contains('${desc}')`);
      if (isbnTag !== null) {
        isbnTag = isbnTag.firstChild.textContent;
        isbnTag = isbnTag.split(":")[1].trim();
        return isbnTag.replace("-", "").trim();
      }
      return null;
    }

    getBinding() {
      var doc, el, exc;
      boundMethodCheck(this, AmazonPlugin);
      doc = this.doc.root;
      if (this._binding === null) {
        try {
          el = findFirstMatchingNode(doc, ["span.a-button-selected a span", "span.a-size-large.mediaTab_title"]);
          if (el) {
            this._binding = el.innerText.trim().split("\n")[0];
          } else {
            el = doc.querySelector("#pageData");
            this._binding = el && el.dataset.subPageType.toLowerCase();
          }
        } catch (error) {
          exc = error;
          logger.exception("Failed during binding search", exc);
        }
      }
      return this._binding;
    }

    getIsbn13(url) {
      var r, results;
      boundMethodCheck(this, AmazonPlugin);
      results = [];
      r = this._getIsbnByLI("ISBN-13");
      if (r !== null && r.length > 0) {
        results.push(r);
      }
      return results;
    }

    getIsbn(url) {
      var doc, eanInputs, element, formElements, isbnTag, len, o, other_bindings, results, url_asin;
      boundMethodCheck(this, AmazonPlugin);
      results = [];
      doc = this.doc.root;
      isbnTag = this._getIsbnByLI("ISBN-10");
      if (isbnTag !== null && isbnTag.trim().length > 0) {
        results.push(isbnTag.trim());
      }
      logger.debug("Searching for other bindings with ISBN values...");
      url_asin = /\/([0-9X]{10})\//;
      other_bindings = doc.querySelectorAll(".dp-title-col a.title-text");
      other_bindings.forEach(function(binding, idx) {
        var m;
        url = binding.getAttribute("href");
        m = url_asin.exec(url);
        if (m && m[1].trim().length > 1) {
          return results.push(m[1]);
        }
      });
      if (results) {
        return results;
      }
      formElements = ["ASIN", "ASIN.0"];
      for (o = 0, len = formElements.length; o < len; o++) {
        element = formElements[o];
        eanInputs = doc.getElementsByName(element);
        if (eanInputs.length > 0 && eanInputs[0].value.length > 0) {
          return [eanInputs[0].value];
        }
      }
      return [];
    }

    notifyStateChange(action, state) {
      boundMethodCheck(this, AmazonPlugin);
      return this.conn.sendRequest({
        action: `${action}_${state}`,
        request: new Request(null, document.URL)
      });
    }

    show_quickCheckout(data) {
      var doc, downloadForm;
      boundMethodCheck(this, AmazonPlugin);
      doc = this.doc.root;
      if (data.state === "borrow_pending_download") {
        downloadForm = doc.querySelector("form#frm-lend-redeem");
        downloadForm.submit();
        this.notifyStateChange("quickCheckout", "borrow_download_click");
        return;
      }
      if (data.state === "borrow_download_click") {
        logger.debug("I would say download here");
        this.notifyStateChange("quickCheckout", "complete");
      }
    }

  };

  registerSite(AmazonPlugin);

  // END src/sites/amazon.coffee
  // BEGIN src/sites/audible.coffee

    // BEGIN src/structured_data_reader.coffee
  StructuredDataReader = class StructuredDataReader {
    constructor(documentProxy) {
      this._getStructuredData = this._getStructuredData.bind(this);
      this.getValue = this.getValue.bind(this);
      this.getAuthors = this.getAuthors.bind(this);
      this.getTitle = this.getTitle.bind(this);
      this.getCategory = this.getCategory.bind(this);
      this.getIsbn = this.getIsbn.bind(this);
      this.getIsbn13 = this.getIsbn13.bind(this);
      this.doc = documentProxy;
      this._structured = null;
    }

    _getStructuredData() {
      var me, scripts;
      if (this._structured === null) {
        me = this;
        scripts = Array.from(this.doc.root.querySelectorAll("script[type=\"application/ld+json\"]"));
        scripts.find(function(script) {
          var content;
          content = null;
          try {
            content = JSON.parse(script.innerText);
          } catch (error) {
            return;
          }
          if (!content) {
            return;
          }
          if (!Array.isArray(content)) {
            content = [content];
          }
          me._structured = content.find(function(el) {
            var t;
            t = el["@type"];
            return t && (t === "Book" || t === "Audiobook");
          });
          return me._structured;
        });
      }
      return this._structured;
    }

    getValue(key, def) {
      var keys, value;
      value = this._getStructuredData();
      keys = key.split(".");
      return keys.reduce(function(acc, k) {
        if (k.length === 0) {
          return acc;
        }
        if (acc && acc.hasOwnProperty(k)) {
          return acc[k];
        }
        return def;
      }, value);
    }

    getAuthors() {
      var author, authors, list;
      authors = [];
      author = normalizeAuthor(this.getValue(".author.name", ""));
      if (author) {
        authors.push(author);
      }
      try {
        if (authors.length === 0) {
          list = this.getValue(".author", []);
          if (!Array.isArray(list)) {
            list = [list];
          }
          list.forEach(function(el) {
            return authors.push(normalizeAuthor(el && el.name || el));
          });
        }
      } catch (error) {
        "";
      }
      return authors.reduce(function(res, el) {
        if (el) {
          return res.concat([el]);
        }
        return res;
      }, []);
    }

    getTitle() {
      return normalizeTitle(this.getValue(".name"));
    }

    getCategory() {
      return this.getValue(".@type", "").toLowerCase();
    }

    getIsbn() {
      var candidate, results;
      results = [];
      candidate = this.getValue(".workExample.isbn");
      if (candidate && validateISBN(candidate)) {
        results.push(candidate);
      }
      return results;
    }

    getIsbn13() {
      var candidate, results;
      results = [];
      candidate = this.getValue(".workExample.isbn");
      if (candidate && validateISBN13(candidate)) {
        results.push(candidate);
      }
      return results;
    }

  };

  unitTestable(StructuredDataReader);

  // END src/structured_data_reader.coffee
  AudiblePlugin = class AudiblePlugin extends SiteParser {
    constructor(documentProxy) {
      super(documentProxy);
      this.getAuthors = this.getAuthors.bind(this);
      this.getRawTitle = this.getRawTitle.bind(this);
      this.getCategory = this.getCategory.bind(this);
      this.getIsbn13 = this.getIsbn13.bind(this);
      this.getIsbn = this.getIsbn.bind(this);
      this._site = "audible";
      this._anchorElement = "div#adbl-buy-box-container";
      this._urlRegex = /audible.[cd]/;
      this._skipIsbnCheck = true;
      this._structured = new StructuredDataReader(documentProxy);
    }

    _addToAnchor(base, el) {
      return base.parentNode.insertBefore(el, base);
    }

    getAuthors() {
      boundMethodCheck(this, AudiblePlugin);
      if (this._authors === null) {
        this._authors = this._structured.getAuthors();
      }
      return this._authors;
    }

    getRawTitle() {
      boundMethodCheck(this, AudiblePlugin);
      if (this._title === null) {
        this._title = this._structured.getTitle();
      }
      return this._title;
    }

    getCategory() {
      boundMethodCheck(this, AudiblePlugin);
      return this._structured.getCategory();
    }

    getIsbn13(url) {
      boundMethodCheck(this, AudiblePlugin);
      return getMetaByProperty(this.doc.root, "books:isbn").filter(validateISBN13);
    }

    getIsbn(url) {
      boundMethodCheck(this, AudiblePlugin);
      return getMetaByProperty(this.doc.root, "books:isbn").filter(validateISBN);
    }

  };

  registerSite(AudiblePlugin);

  // END src/sites/audible.coffee
  // BEGIN src/sites/audiobooks.coffee
  AudiobooksComPlugin = class AudiobooksComPlugin extends SiteParserWithScraper {
    constructor(documentProxy) {
      super(documentProxy);
      this._site = "audiobooks_com";
      this._urlRegex = /www.audiobooks.com/;
      this._skipIsbnCheck = true;
      this.configByAnchor = {
        "__default__": {
          position: "afterend",
          styles: {
            "margin-top": "10px",
            "margin-left": "10px",
            float: "left",
            width: "400px"
          }
        }
      };
      this.pageScrapers = [
        {
          name: "main",
          urlMatch: /\/audiobook\//,
          refreshOnDOMChanges: false,
          selectors: [
            {
              description: "detail item",
              collection: "div.book-details-card",
              resource: ":scope > div",
              id: function(root) {
                return root.querySelector("[data-bookid]").dataset.bookid;
              },
              author: {
                selector: "a[href*='/author/']"
              },
              title: {
                selector: "h1"
              },
              injection: {
                point: ":scope > div:last-child",
                element: "<div></div>",
                where: "afterend"
              }
            }
          ]
        }
      ];
    }

  };

  registerSite(AudiobooksComPlugin);

  // END src/sites/audiobooks.coffee
  // BEGIN src/sites/audiobooksnow.coffee
  AudiobooksnowComPlugin = class AudiobooksnowComPlugin extends SiteParserWithScraper {
    constructor(documentProxy) {
      super(documentProxy);
      this._site = "audiobooksnow_com";
      this._urlRegex = /www.audiobooksnow.com/;
      this._skipIsbnCheck = true;
      this.pageScrapers = [
        {
          name: "main",
          urlMatch: /\/audiobook\//,
          refreshOnDOMChanges: false,
          selectors: [
            {
              description: "detail item",
              collection: "div",
              resource: ":scope > div",
              id: function(root) {
                return root.querySelector("button[data-id]").dataset.id;
              },
              author: {
                selector: "a[href*='/author/']"
              },
              title: {
                selector: "h1.title"
              },
              injection: {
                point: "div.pricecolumn",
                element: "<div></div>",
                where: "afterbegin"
              }
            }
          ]
        }
      ];
    }

  };

  registerSite(AudiobooksnowComPlugin);

  // END src/sites/audiobooksnow.coffee
  // BEGIN src/sites/barnes_and_noble.coffee
  BNPlugin = class BNPlugin extends SiteParser {
    constructor(documentProxy) {
      super(documentProxy);
      this.onWindowScroll = this.onWindowScroll.bind(this);
      this.getAuthors = this.getAuthors.bind(this);
      this.getRawTitle = this.getRawTitle.bind(this);
      this.getIsbn13 = this.getIsbn13.bind(this);
      this.getIsbn = this.getIsbn.bind(this);
      this._site = "barnesandnoble";
      this._anchorElement = "#commerce-zone";
      this._urlRegex = /barnesandnoble.com/;
    }

    onWindowScroll() {
      var me;
      boundMethodCheck(this, BNPlugin);
      me = this;
      return window.addEventListener("scroll", function() {
        var e;
        e = me.doc.root.querySelector(me._anchorElement);
        if (e && window.getComputedStyle(e).display === "flex") {
          return me.doc.root.querySelector(".libraryExtension").style.display = "none";
        } else {
          return me.doc.root.querySelector(".libraryExtension").style.display = "block";
        }
      });
    }

    getAuthors() {
      var name;
      boundMethodCheck(this, BNPlugin);
      if (this._authors === null) {
        this._authors = [];
        name = this.doc.root.getElementsByClassName("contributors")[0].getElementsByTagName("a")[0].textContent;
        if (name) {
          this._authors[this._authors.length] = normalizeAuthor(name);
        }
      }
      return this._authors;
    }

    getRawTitle() {
      var len, metaTags, o, tag, title;
      boundMethodCheck(this, BNPlugin);
      metaTags = this.doc.root.getElementsByTagName("meta");
      for (o = 0, len = metaTags.length; o < len; o++) {
        tag = metaTags[o];
        if (tag.getAttribute("property") === "og:title") {
          title = tag.getAttribute("content");
          return title;
        }
      }
      return null;
    }

    getIsbn13(url) {
      var dataTags, isbn, len, o, result, tag;
      boundMethodCheck(this, BNPlugin);
      dataTags = this.doc.root.querySelectorAll("input[name=skuId]");
      for (o = 0, len = dataTags.length; o < len; o++) {
        tag = dataTags[o];
        if (validateISBN13(tag.value)) {
          isbn = tag.value;
          return [isbn];
        }
      }
      result = Array.from(this.doc.root.querySelectorAll("div#ProductDetailsTab tr")).reduce(function(acc, el) {
        if (el.querySelector("th") && el.querySelector("th").textContent.indexOf("ISBN-13") >= 0) {
          acc.push(el.querySelector("td").textContent);
        }
        return acc;
      }, []);
      return result;
    }

    getIsbn(url) {
      var dataTags, isbn, len, o, tag;
      boundMethodCheck(this, BNPlugin);
      dataTags = this.doc.root.querySelectorAll("input[name=skuId]");
      for (o = 0, len = dataTags.length; o < len; o++) {
        tag = dataTags[o];
        if (validateISBN(tag.value)) {
          isbn = tag.value;
          return [isbn];
        }
      }
      return [];
    }

  };

  registerSite(BNPlugin);

  // END src/sites/barnes_and_noble.coffee
  // BEGIN src/sites/bibliocom.coffee
  BibliocomPlugin = class BibliocomPlugin extends SiteParserWithScraper {
    constructor(documentProxy) {
      super(documentProxy);
      this._site = "biblio_com";
      this._urlRegex = /biblio.com/;
      this._skipIsbnCheck = true;
      this.pageScrapers = [
        {
          name: "main",
          urlMatch: /\/work\//,
          refreshOnDOMChanges: false,
          selectors: [
            {
              description: "detail item",
              collection: function(root) {
                try {
                  return root.querySelector("main#page-content");
                } catch (error) {
                  return null;
                }
              },
              resource: function(root) {
                return [root];
              },
              id: function(root) {
                return "1";
              },
              author: {
                selector: ".author"
              },
              title: {
                selector: ".title"
              },
              injection: {
                point: "#secondary",
                element: "<div></div>",
                where: "afterbegin"
              }
            }
          ]
        }
      ];
    }

  };

  registerSite(BibliocomPlugin);

  // END src/sites/bibliocom.coffee
  // BEGIN src/sites/blackwells.coffee
  BlackwellsSitePlugin = class BlackwellsSitePlugin extends SiteParserWithScraper {
    constructor(documentProxy) {
      super(documentProxy);
      this._site = "";
      this._urlRegex = /blackwells.co.uk/;
      this._skipIsbnCheck = true;
      this.pageScrapers = [
        {
          name: "main",
          urlMatch: /\/product\//,
          refreshOnDOMChanges: false,
          selectors: [
            {
              description: "detail item",
              collection: function(root) {
                try {
                  return root.querySelector("div[itemtype=\"https://schema.org/Book\"]");
                } catch (error) {
                  return null;
                }
              },
              resource: function(root) {
                return [root];
              },
              id: function(root) {
                return root.querySelector("[itemprop=\"name\"]").textContent.trim();
              },
              author: {
                selector: "[itemprop=\"author\"]"
              },
              title: {
                selector: "[itemprop=\"name\"]"
              },
              isbn: null,
              isbn13: null,
              injection: {
                point: "div.product__price",
                element: "<div></div>",
                where: "afterend"
              }
            }
          ]
        }
      ];
    }

  };

  registerSite(BlackwellsSitePlugin);

  // END src/sites/blackwells.coffee
  // BEGIN src/sites/book_outlet.coffee
  BookOutletPlugin = class BookOutletPlugin extends SiteParserWithScraper {
    constructor(documentProxy) {
      super(documentProxy);
      this._site = "bookoutlet";
      this._urlRegex = /bookoutlet.c/;
      this._skipIsbnCheck = true;
      this.pageScrapers = [
        {
          name: "main",
          urlMatch: /\/products\//,
          selectors: [
            {
              description: "detail item",
              collection: function(root) {
                return root;
              },
              resource: function(root) {
                return [root];
              },
              author: {
                multiple: true,
                selector: "a[href*=author]"
              },
              title: {
                selector: "h1"
              },
              injection: {
                point: "button[aria-label*='add to wishlist']",
                element: "<div></div>",
                where: "beforebegin"
              }
            }
          ]
        }
      ];
    }

  };

  registerSite(BookOutletPlugin);

  // END src/sites/book_outlet.coffee
  // BEGIN src/sites/bookbub.coffee
  BookBubSitePlugin = class BookBubSitePlugin extends SiteParserWithScraper {
    constructor(documentProxy) {
      super(documentProxy);
      this._site = "bookbub";
      this._urlRegex = /www.bookbub.com/;
      this._skipIsbnCheck = true;
      this.pageScrapers = [
        {
          name: "main",
          urlMatch: /\/books\//,
          refreshOnDOMChanges: false,
          selectors: [
            {
              description: "detail item",
              collection: "div.page-wrapper",
              resource: "div.book-panel",
              id: function(root) {
                return root.querySelector("#book-app").dataset["bookId"];
              },
              author: {
                selector: function(root) {
                  return JSON.parse(root.querySelector("#book-app").dataset["bookJson"])["authors"];
                }
              },
              title: {
                selector: function(root) {
                  return JSON.parse(root.querySelector("#book-app").dataset["bookJson"])["title"];
                }
              },
              injection: {
                point: "div.book-cta-vc",
                element: "<div></div>",
                where: "beforebegin"
              }
            }
          ]
        }
      ];
    }

  };

  registerSite(BookBubSitePlugin);

  // END src/sites/bookbub.coffee
  // BEGIN src/sites/bookclubz.coffee
  BookclubzPlugin = class BookclubzPlugin extends SiteParserWithScraper {
    constructor(documentProxy) {
      super(documentProxy);
      this._site = "bookclubz";
      this._urlRegex = /bookclubs.com/;
      this._skipIsbnCheck = true;
      this.pageScrapers = [
        {
          name: "main",
          urlMatch: /\/books\//,
          selectors: [
            {
              description: "detail item",
              collection: "main",
              resource: ".book-detail",
              author: {
                multiple: true,
                selector: ".book-author span[itemprop=name]"
              },
              title: {
                selector: ".book-title-wrap h1[itemprop=name]"
              },
              injection: {
                point: "div.btn-groups",
                element: "<div></div>",
                where: "beforebegin"
              }
            }
          ]
        }
      ];
    }

  };

  registerSite(BookclubzPlugin);

  // END src/sites/bookclubz.coffee
  // BEGIN src/sites/bookdigits.coffee
  BookDigitsPlugin = class BookDigitsPlugin extends SiteParserWithScraper {
    constructor(documentProxy) {
      super(documentProxy);
      this._site = "bookdigits";
      this._urlRegex = /bookdigits/;
      this._skipIsbnCheck = true;
      this.pageScrapers = [
        {
          name: "main",
          urlMatch: /\/book\?(id|ID)=/,
          refreshOnDOMChanges: false,
          selectors: [
            {
              description: "detail item",
              collection: "div#wrapper",
              resource: "div#main",
              author: {
                multiple: true,
                selector: ".bookauthor a[href*=author]"
              },
              title: {
                selector: ".booktitle"
              },
              injection: {
                point: ".lightboxlink",
                element: "<div></div>",
                where: "beforebegin"
              }
            },
            {
              description: "detail item 2021",
              collection: "div#content",
              resource: "div#container",
              author: {
                multiple: true,
                selector: ".book-author a[href*=author]"
              },
              title: {
                selector: ".book-title"
              },
              injection: {
                point: "#library-container",
                element: "<div></div>",
                where: "beforebegin"
              }
            }
          ]
        }
      ];
    }

  };

  registerSite(BookDigitsPlugin);

  // END src/sites/bookdigits.coffee
  // BEGIN src/sites/booko.coffee
  BookoPlugin = class BookoPlugin extends SiteParserWithScraper {
    constructor(documentProxy) {
      super(documentProxy);
      this._site = "booko";
      this._urlRegex = /booko.c/;
      this._skipIsbnCheck = true;
      this.pageScrapers = [
        {
          name: "main",
          selectors: [
            {
              description: "detail item",
              collection: function(root) {
                return root;
              },
              resource: function(root) {
                return [root];
              },
              author: {
                multiple: true,
                selector: "h3[itemprop=author]"
              },
              title: {
                selector: "h1[itemprop=name]"
              },
              injection: {
                point: "div#productPrices",
                element: "<div></div>",
                where: "beforebegin"
              }
            }
          ]
        }
      ];
    }

  };

  registerSite(BookoPlugin);

  // END src/sites/booko.coffee
  // BEGIN src/sites/bookshop.coffee
  BookshopOrgPlugin = class BookshopOrgPlugin extends SiteParserWithScraper {
    constructor(documentProxy) {
      super(documentProxy);
      this._site = "bookshop_org";
      this._urlRegex = /bookshop.org/;
      this._skipIsbnCheck = true;
      this.pageScrapers = [
        {
          name: "main",
          selectors: [
            {
              description: "detail item",
              collection: function(root) {
                return root;
              },
              resource: function(root) {
                return [root];
              },
              author: {
                multiple: true,
                selector: ".h1[itemprop=name] ~ div span a"
              },
              title: {
                selector: ".h1[itemprop=name]"
              },
              injection: {
                point: "#cart-form",
                element: "<div></div>",
                where: "beforebegin"
              }
            }
          ]
        }
      ];
    }

  };

  registerSite(BookshopOrgPlugin);

  // END src/sites/bookshop.coffee
  // BEGIN src/sites/booktopia.coffee
  BooktopiaPlugin = class BooktopiaPlugin extends SiteParserWithScraper {
    constructor(documentProxy) {
      super(documentProxy);
      this._site = "booktopia";
      this._urlRegex = /booktopia.com.au/;
      this._skipIsbnCheck = true;
      this._anchorElement = "";
      this.pageScrapers = [
        {
          name: "main",
          selectors: [
            {
              description: "detail item",
              collection: function(root) {
                return root;
              },
              resource: function(root) {
                return [root];
              },
              author: {
                multiple: true,
                selector: "div#contributors a[href*=author]"
              },
              title: {
                selector: "div#product-title h1"
              },
              injection: {
                point: "div#d-product-price",
                element: "<div></div>",
                where: "beforebegin"
              }
            }
          ]
        }
      ];
    }

  };

  registerSite(BooktopiaPlugin);

  // END src/sites/booktopia.coffee
  // BEGIN src/sites/chapters.coffee
  ChaptersIndigoPlugin = class ChaptersIndigoPlugin extends SiteParserWithScraper {
    constructor(documentProxy) {
      super(documentProxy);
      this._site = "chapters_indigo";
      this._urlRegex = /indigo.ca/;
      this._skipIsbnCheck = true;
      this.pageScrapers = [
        {
          name: "main",
          urlMatch: /./,
          selectors: [
            {
              description: "detail item",
              collection: function(root) {
                return root;
              },
              resource: function(root) {
                return [root];
              },
              author: {
                multiple: true,
                selector: "a.author-name"
              },
              title: {
                selector: function(root) {
                  var title;
                  title = root.querySelector("h1.product-name");
                  return title && title.textContent || title;
                }
              },
              injection: {
                point: ".prices-add-to-cart-actions",
                element: "<div></div>",
                where: "beforebegin"
              }
            }
          ]
        }
      ];
    }

  };

  registerSite(ChaptersIndigoPlugin);

  // END src/sites/chapters.coffee
  // BEGIN src/sites/chirp.coffee
  ChirpPlugin = class ChirpPlugin extends SiteParserWithScraper {
    constructor(documentProxy) {
      super(documentProxy);
      this._site = "chirpbooks_com";
      this._urlRegex = /www.chirpbooks.com/;
      this._skipIsbnCheck = true;
      this.pageScrapers = [
        {
          name: "main",
          urlMatch: /\/audiobooks\//,
          refreshOnDOMChanges: false,
          selectors: [
            {
              description: "detail item",
              collection: "div.audiobook-content",
              resource: ":scope > div",
              id: function(root) {
                return JSON.parse(root.dataset["audiobook"])["id"];
              },
              author: {
                selector: function(root) {
                  return JSON.parse(root.dataset["audiobook"])["displayAuthors"];
                }
              },
              title: {
                selector: function(root) {
                  return JSON.parse(root.dataset["audiobook"])["displayTitle"];
                }
              },
              injection: {
                point: "div[class*=ctas]",
                element: "<div></div>",
                where: "beforebegin"
              }
            }
          ]
        }
      ];
    }

  };

  registerSite(ChirpPlugin);

  // END src/sites/chirp.coffee
  // BEGIN src/sites/ctpub.coffee
  CtpubPlugin = class CtpubPlugin extends SiteParserWithScraper {
    constructor(documentProxy) {
      super(documentProxy);
      this._site = "ctpub";
      this._urlRegex = /ctpub.com/;
      this._skipIsbnCheck = true;
      this.pageScrapers = [
        {
          name: "main",
          urlMatch: /.*/,
          refreshOnDOMChanges: false,
          selectors: [
            {
              description: "detail item",
              collection: function(root) {
                return root.querySelector("div[itemtype=\"http://schema.org/Product\"]");
              },
              resource: function(root) {
                return [root];
              },
              id: function(root) {
                return root.querySelector("[itemprop=\"name\"]");
              },
              author: {
                selector: ".produveView-author a"
              },
              title: {
                selector: "h1[itemprop=name]"
              },
              injection: {
                point: "form[action*=wish]",
                element: "<div></div>",
                where: "beforebegin"
              }
            }
          ]
        }
      ];
    }

  };

  registerSite(CtpubPlugin);

  // END src/sites/ctpub.coffee
  // BEGIN src/sites/downpour.coffee
  DownpourPlugin = class DownpourPlugin extends SiteParserWithScraper {
    constructor(documentProxy) {
      super(documentProxy);
      this._site = "downpour_com";
      this._urlRegex = /www.downpour.com/;
      this._skipIsbnCheck = true;
      this.configByAnchor = {
        "__default__": {
          position: "afterend",
          styles: {
            "margin-left": "10px",
            float: "left",
            width: "400px"
          }
        }
      };
      this.pageScrapers = [
        {
          name: "main",
          urlMatch: /\/catalog\/product\/view\/id\//,
          refreshOnDOMChanges: false,
          selectors: [
            {
              description: "detail item",
              collection: ".main",
              resource: ":scope > div",
              id: function(root) {
                return root.querySelector("[data-prod-id]").dataset.prodId;
              },
              author: {
                selector: "[itemprop=author] [itemprop=name]"
              },
              title: {
                selector: "[itemtype='http://schema.org/Book'] [itemprop=name]"
              },
              injection: {
                point: "div.product-buttons",
                element: "<div></div>",
                where: "afterend"
              }
            }
          ]
        }
      ];
    }

  };

  registerSite(DownpourPlugin);

  // END src/sites/downpour.coffee
  // BEGIN src/sites/easons.coffee
  EasonsPlugin = class EasonsPlugin extends SiteParserWithScraper {
    constructor(documentProxy) {
      super(documentProxy);
      this._site = "easons_com";
      this._urlRegex = /www.easons.com/;
      this._skipIsbnCheck = true;
      this.pageScrapers = [
        {
          name: "main",
          refreshOnDOMChanges: false,
          selectors: [
            {
              description: "detail item",
              collection: "div.product-page",
              resource: ":scope > div",
              id: function(root) {
                return root.querySelector("h1").textContent;
              },
              author: {
                selector: ".author a"
              },
              title: {
                selector: "h1"
              },
              injection: {
                point: "div.basketboxtablet",
                element: "<div class=\"col-4\"></div>",
                where: "beforebegin"
              }
            }
          ]
        }
      ];
    }

  };

  registerSite(EasonsPlugin);

  // END src/sites/easons.coffee
  // BEGIN src/sites/everand.coffee
  EverandPlugin = class EverandPlugin extends SiteParser {
    constructor(documentProxy) {
      super(documentProxy);
      this.getAuthors = this.getAuthors.bind(this);
      this.getRawTitle = this.getRawTitle.bind(this);
      this.getCategory = this.getCategory.bind(this);
      this._site = "everand";
      this._anchorElement = "div[data-e2e*=thumbnail-desk]";
      this._urlRegex = /everand.c/;
      this._skipIsbnCheck = true;
      this._structured = new StructuredDataReader(documentProxy);
    }

    _addToAnchor(base, el) {
      return base.parentNode.insertBefore(el, base);
    }

    getAuthors() {
      boundMethodCheck(this, EverandPlugin);
      if (this._authors === null) {
        this._authors = this._structured.getAuthors();
      }
      return this._authors;
    }

    getRawTitle() {
      boundMethodCheck(this, EverandPlugin);
      if (this._title === null) {
        this._title = this._structured.getTitle();
      }
      return this._title;
    }

    getCategory() {
      boundMethodCheck(this, EverandPlugin);
      return this._structured.getCategory();
    }

    getIsbn13(url) {
      return [];
    }

    getIsbn(url) {
      return [];
    }

  };

  registerSite(EverandPlugin);

  // END src/sites/everand.coffee
  // BEGIN src/sites/fantasticfiction.coffee
  FantasticFictionPlugin = class FantasticFictionPlugin extends SiteParserWithScraper {
    constructor(documentProxy) {
      super(documentProxy);
      this._site = "fantasticfiction";
      this._urlRegex = /fantasticfiction.com/;
      this._skipIsbnCheck = true;
      this.configByAnchor = {
        "__default__": {
          position: "afterend",
          styles: {
            "margin": "0 auto",
            padding: "0px",
            width: "80%"
          }
        }
      };
      this.pageScrapers = [
        {
          name: "main",
          selectors: [
            {
              description: "detail item",
              collection: function(root) {
                return root;
              },
              resource: function(root) {
                return root.querySelectorAll("div[itemtype='http://schema.org/Book']");
              },
              author: {
                multiple: true,
                selector: "span[itemprop=author]"
              },
              title: {
                selector: "h1[itemprop=name]"
              },
              injection: {
                point: "div.blurb",
                element: "<div></div>",
                where: "beforebegin"
              }
            }
          ]
        }
      ];
    }

  };

  registerSite(FantasticFictionPlugin);

  // END src/sites/fantasticfiction.coffee
  // BEGIN src/sites/generic.coffee
  GenericPlugin = class GenericPlugin extends SiteParser {
    constructor(documentProxy) {
      super(documentProxy);
      this._site = "generic";
      this._urlRegex = /.*/;
      this._anchorElement = "#libraryextension";
    }

    getAuthors() {
      var el, result;
      result = [];
      el = document.querySelector(".entry-author");
      if (el) {
        result.push(normalizeAuthor(el.textContent));
      }
      return result;
    }

    getRawTitle() {
      var title;
      title = document.getElementById("title") || document.querySelector(".entry-title");
      if (title) {
        if ("value" in title) {
          title = title.value;
        } else if ("textContent" in title) {
          title = title.textContent;
        }
      }
      return title;
    }

    getIsbn13(url) {
      var isbn;
      isbn = document.getElementById("isbn13-sample");
      if (isbn) {
        isbn = isbn.textContent;
        return [isbn];
      }
      return [];
    }

    getIsbn(url) {
      var isbn, results;
      results = [];
      isbn = document.getElementById("isbn-sample");
      if (isbn) {
        results.push(isbn.textContent);
      }
      return results;
    }

  };

  registerSite(GenericPlugin);

  // END src/sites/generic.coffee
  // BEGIN src/sites/goodreads.coffee
  GoodreadsPlugin = class GoodreadsPlugin extends SiteParserWithScraper {
    constructor(documentProxy) {
      super(documentProxy);
      this._site = "goodreads";
      this._urlRegex = /goodreads.com/;
      this._skipIsbnCheck = true;
      this.pageInitializationDelayed = 300;
      this.pageScrapers = [
        {
          name: "main",
          urlMatch: /\/book\/show\//,
          refreshOnDOMChanges: false,
          selectors: [
            {
              description: "detail item",
              collection: function(root) {
                try {
                  return root.querySelector(".authorName span") && root.querySelector("div.content");
                } catch (error) {
                  return null;
                }
              },
              resource: function(root) {
                return [root];
              },
              id: function(root) {
                return root.querySelector("[itemprop=\"name\"]").textContent;
              },
              author: {
                multiple: true,
                selector: ".authorName span[itemprop=name]"
              },
              title: {
                selector: function(el) {
                  var fullTitle,
            greyText,
            title,
            titleId;
                  titleId = "#bookTitle";
                  title = el.querySelector(titleId);
                  if (title) {
                    fullTitle = title.textContent;
                    greyText = title.querySelector(".greyText");
                    if (greyText) {
                      fullTitle = fullTitle.substr(0,
            fullTitle.indexOf(greyText.textContent));
                    }
                    if (fullTitle.length > 0) {
                      return fullTitle.trim();
                    }
                  }
                  return null;
                }
              },
              injection: {
                point: "#details",
                element: "<div></div>",
                where: "beforebegin"
              }
            },
            {
              description: "detail item beta",
              collection: function(root) {
                return root.querySelector("div[itemtype=\"http://schema.org/Book\"], main.BookPage");
              },
              resource: function(root) {
                return [root];
              },
              id: function(root) {
                return root.querySelector(".Text__title1").textContent;
              },
              author: {
                multiple: true,
                selector: ".ContributorLink span"
              },
              title: {
                selector: ".Text__title1"
              },
              injection: {
                point: "body",
                element: "<div></div>",
                where: "beforeend"
              }
            }
          ]
        },
        {
          name: "shelves",
          urlMatch: /\/review\/list\//,
          searchMode: "on-demand",
          configSettings: [
            {
              name: "beta_goodreads_lists",
              value: true
            }
          ],
          refreshOnDOMChanges: false,
          selectors: [
            {
              description: "shelf beta",
              collection: function(root) {
                return root.querySelector("tbody#booksBody");
              },
              resource: function(root) {
                return root.querySelectorAll("tr.bookalike");
              },
              id: function(root) {
                return root.querySelector("td.title div.value a").href;
              },
              author: {
                multiple: true,
                selector: "td.author div.value a"
              },
              title: {
                selector: function(el) {
                  return el.querySelector("td.title div.value a").title;
                }
              },
              injection: {
                point: null,
                element: "<table><tr><td colspan=100></td></tr></table>",
                selector: "tr",
                target: "td",
                where: "afterend"
              }
            }
          ]
        }
      ];
    }

  };

  registerSite(GoodreadsPlugin);

  // END src/sites/goodreads.coffee
  // BEGIN src/sites/google_books.coffee
  GoogleBooksPlugin = class GoogleBooksPlugin extends SiteParser {
    constructor(documentProxy) {
      super(documentProxy);
      this._getAnchorElement = this._getAnchorElement.bind(this);
      this.applies = this.applies.bind(this);
      this.getAuthors = this.getAuthors.bind(this);
      this.getRawTitle = this.getRawTitle.bind(this);
      this._filterByCallback = this._filterByCallback.bind(this);
      this.getIsbn13 = this.getIsbn13.bind(this);
      this.getIsbn = this.getIsbn.bind(this);
      this._site = "googlebooks";
      this._anchorElement = "#menu_scroll";
      this._urlRegex = /(books.google.c[ao]|google.c.*\/books)/;
      this._skipIsbnCheck = true;
    }

    _getAnchorElement() {
      boundMethodCheck(this, GoogleBooksPlugin);
      return this.doc.root.querySelector(this._anchorElement) || findFirstMatchingNode(this.doc.root, "div:contains('^About the work')");
    }

    applies() {
      boundMethodCheck(this, GoogleBooksPlugin);
      return !!(this._urlRegex.test(this.doc.getPageUrl()) && this.isDetailPage()) || (this.hasSearchLayoutAnchor());
    }

    getAuthors() {
      var author, el, res;
      boundMethodCheck(this, GoogleBooksPlugin);
      if (this._authors === null) {
        this._authors = [];
        author = this._filterByMetaData(this.doc.root, "Author");
        if (author === "") {
          el = this.doc.root.querySelector("title").textContent;
          res = /.* - (.*) - Google Books/.exec(el);
          if (res) {
            author = res[1];
          }
        }
        if (author === "") {
          el = findFirstMatchingNode(this.doc.root, "span:contains('^Author:')");
          if (el) {
            author = el.parentElement.querySelector("span:nth-of-type(2)").textContent;
          }
        }
        if (author && author.length > 0) {
          this._authors[this._authors.length] = normalizeAuthor(nodeToText(author));
        }
      }
      return this._authors;
    }

    getRawTitle() {
      var el, len, metaTags, node, o, res, tag, title;
      boundMethodCheck(this, GoogleBooksPlugin);
      metaTags = this.doc.root.getElementsByTagName("meta");
      for (o = 0, len = metaTags.length; o < len; o++) {
        tag = metaTags[o];
        if (tag.getAttribute("property") === "og:title") {
          title = tag.getAttribute("content");
          return title;
        }
      }
      el = this.doc.root.querySelector("title").textContent;
      res = /(.*?) - .* - Google Books/.exec(el);
      if (res) {
        return res[1];
      }
      node = document.querySelector("div[role=heading]");
      if (node) {
        return node.textContent;
      }
      return null;
    }

    _filterByMetaData(doc, key) {
      var dataTags, len, o, tag;
      dataTags = doc.getElementsByClassName("metadata_row");
      for (o = 0, len = dataTags.length; o < len; o++) {
        tag = dataTags[o];
        if (tag.getElementsByClassName("metadata_label")[0].textContent === key) {
          return tag.getElementsByClassName("metadata_value")[0].textContent;
        }
      }
      return "";
    }

    _filterByCallback(doc, key, callback) {
      var data, len, o, ref1, results, tag;
      boundMethodCheck(this, GoogleBooksPlugin);
      data = this._filterByMetaData(doc, key);
      results = [];
      ref1 = data.split(",");
      for (o = 0, len = ref1.length; o < len; o++) {
        tag = ref1[o];
        tag = tag.trim();
        if (callback(tag)) {
          results.push(tag);
        }
      }
      return results;
    }

    getIsbn13(url) {
      boundMethodCheck(this, GoogleBooksPlugin);
      return this._filterByCallback(this.doc.root, "ISBN", validateISBN13);
    }

    getIsbn(url) {
      boundMethodCheck(this, GoogleBooksPlugin);
      return this._filterByCallback(this.doc.root, "ISBN", validateISBN);
    }

  };

  registerSite(GoogleBooksPlugin);

  // END src/sites/google_books.coffee
  // BEGIN src/sites/hive.coffee
  HivePlugin = class HivePlugin extends SiteParserWithScraper {
    constructor(documentProxy) {
      super(documentProxy);
      this._site = "hive";
      this._urlRegex = /hive.co/;
      this._skipIsbnCheck = true;
      this.pageScrapers = [
        {
          name: "main",
          selectors: [
            {
              description: "detail item",
              collection: function(root) {
                return root;
              },
              resource: function(root) {
                return [root];
              },
              author: {
                multiple: true,
                selector: "h2[itemprop=author]"
              },
              title: {
                selector: function(root) {
                  var binding,
            tag,
            title;
                  tag = root.querySelector("h1[itemprop=name]");
                  title = tag.textContent;
                  binding = tag.querySelector("span");
                  if (binding) {
                    title = title.substr(0,
            title.indexOf(binding.textContent) - 1).trim();
                  }
                  return title;
                }
              },
              injection: {
                point: "div.priceArea",
                element: "<div></div>",
                where: "beforebegin"
              }
            }
          ]
        }
      ];
    }

  };

  registerSite(HivePlugin);

  // END src/sites/hive.coffee
  // BEGIN src/sites/kirkusreviews.coffee
  KirkusReviewsPlugin = class KirkusReviewsPlugin extends SiteParserWithScraper {
    constructor(documentProxy) {
      super(documentProxy);
      this._site = "kirkus";
      this._urlRegex = /kirkusreviews.com/;
      this._skipIsbnCheck = true;
      this.pageScrapers = [
        {
          name: "main",
          urlMatch: /\/book-reviews\//,
          refreshOnDOMChanges: false,
          selectors: [
            {
              description: "detail item",
              collection: function(root) {
                try {
                  return root.querySelector("#book-review-page");
                } catch (error) {
                  return null;
                }
              },
              resource: function(root) {
                return [root];
              },
              id: function(root) {
                return root.querySelector(".single-review").dataset.slug;
              },
              author: {
                selector: function(el) {
                  return el.querySelector(".single-review").dataset.author.replace('-',
            ' ');
                }
              },
              title: {
                selector: "h1.article-title"
              },
              injection: {
                point: ".book-content",
                element: "<div></div>",
                where: "afterend"
              }
            }
          ]
        }
      ];
    }

  };

  registerSite(KirkusReviewsPlugin);

  // END src/sites/kirkusreviews.coffee
  // BEGIN src/sites/kobo.coffee
  KoboPlugin = class KoboPlugin extends SiteParserWithScraper {
    constructor(documentProxy) {
      super(documentProxy);
      this._site = "kobo";
      this._urlRegex = /kobo.c/;
      this._skipIsbnCheck = true;
      this.pageScrapers = [
        {
          name: "main",
          urlMatch: /\/(ebook|audiobooks)\//,
          refreshOnDOMChanges: false,
          selectors: [
            {
              description: "detail item",
              collection: function(root) {
                return root.querySelector("div.kobo-main");
              },
              resource: function(root) {
                return [root];
              },
              id: function(root) {
                return root.querySelector("h1.title").textContent.trim();
              },
              author: {
                selector: "span.authors .contributor-name"
              },
              title: {
                selector: "h1.title"
              },
              injection: {
                point: "div.pricing-details:nth-child(1)",
                element: "<div></div>",
                where: "beforebegin"
              }
            }
          ]
        }
      ];
    }

  };

  registerSite(KoboPlugin);

  // END src/sites/kobo.coffee
  // BEGIN src/sites/lexile.coffee
  LexileSitePlugin = class LexileSitePlugin extends SiteParserWithScraper {
    constructor(documentProxy) {
      super(documentProxy);
      this.isDetailPage = this.isDetailPage.bind(this);
      this._site = "lexile";
      this._urlRegex = /hub.lexile.com/;
      this._skipIsbnCheck = true;
      this.pageInitializationDelayed = 600;
      this.pageScrapers = [
        {
          name: "main",
          urlMatch: /\/book-details\//,
          refreshOnDOMChanges: true,
          selectors: [
            {
              description: "detail item",
              collection: "main",
              resource: ".details",
              id: function(root) {
                return root.querySelector(".isbns span");
              },
              author: {
                selector: ".authors button"
              },
              title: {
                selector: ".header-info h1"
              },
              injection: {
                point: "a[href*='www.amazon.com']",
                element: "<div></div>",
                where: "beforebegin"
              }
            }
          ]
        }
      ];
    }

    isDetailPage() {
      boundMethodCheck(this, LexileSitePlugin);
      return /\/book-details\//.exec(this.doc.getPageUrl());
    }

  };

  registerSite(LexileSitePlugin);

  // END src/sites/lexile.coffee
  // BEGIN src/sites/library_extension.coffee
  LibraryExtensionPlugin = class LibraryExtensionPlugin extends SiteParser {
    constructor(documentProxy) {
      super(documentProxy);
      this.applies = this.applies.bind(this);
      this.show_add_library_confirmation = this.show_add_library_confirmation.bind(this);
      this.getLibraryId = this.getLibraryId.bind(this);
      this.getIsbn = this.getIsbn.bind(this);
      this.getIsbn13 = this.getIsbn13.bind(this);
      this.getAuthors = this.getAuthors.bind(this);
      this.getTitle = this.getTitle.bind(this);
      this.getCategory = this.getCategory.bind(this);
      this.getInitialSearchKeyword = this.getInitialSearchKeyword.bind(this);
      this._site = "libraryextension";
      this._anchorElement = "div#results";
      this._urlRegex = /libraryextension.com/;
      this._skipIsbnCheck = true;
      this.searchLayoutOptions = {
        useButtonToDisplayDialog: false,
        button: {
          injection: {
            point: "#librarySearch",
            where: "beforeend"
          }
        },
        dialog: {
          injection: {
            point: "#librarySearch",
            where: "beforeend"
          }
        },
        libraryAction: "replace"
      };
      this.layoutFactories.push(SearchLayoutFactory(this.searchLayoutOptions));
    }

    applies() {
      var host;
      boundMethodCheck(this, LibraryExtensionPlugin);
      host = this.doc.getHost();
      return /libraryextension.com/.test(host) || /localhost/.test(host);
    }

    get_configured_libraries() {
      var el, libraries;
      el = document.querySelector("div#libraryextension_installed");
      if (!el) {
        return [];
      }
      libraries = JSON.parse(el.dataset.libraries || "[]");
      return libraries;
    }

    show_add_library_confirmation(result) {
      var add_library_tmpl, dialog, dt, enterhandler, len, me, node, o, ref1;
      boundMethodCheck(this, LibraryExtensionPlugin);
      me = this;
      dt = new Date();
      dt.setTime(dt.getTime() - (7 * 24 * 60 * 60 * 1000));
      document.cookie = "lid=; expires=" + dt.toUTCString() + "; path=/";
      add_library_tmpl = fromHTMLTemplate("<div><h2>Add your library?</h2>" + "<div>Would you like to add <b><%= name %> (<%= state %>)</b> " + "to the Library Extension now?</div>" + "<div class='btns'>" + "<button id='libext_agree' class='action_default'>Yes</button>" + "<button id='libext_dismiss'>No</button>" + "</div></div>");
      dialog = document.querySelector("#libext_add_dialog");
      if (!dialog) {
        dialog = document.createElement("dialog");
        dialog.id = "libext_add_dialog";
        document.querySelector("body").appendChild(dialog);
      }
      if (dialog.hasChildNodes()) {
        ref1 = dialog.childNodes;
        for (o = 0, len = ref1.length; o < len; o++) {
          node = ref1[o];
          dialog.removeChild(node);
        }
      }
      dialog.appendChild(add_library_tmpl({
        name: result.library.name,
        state: result.library.state
      }));
      enterhandler = function(e) {
        if (e.key === "enter") {
          document.removeEventListener("keypress", enterhandler);
          return $("#libext_agree").click();
        }
      };
      document.querySelector("#libext_dismiss").addEventListener("click", function() {
        return dialog.close();
      });
      document.querySelector("#libext_agree").addEventListener("click", async function() {
        var urls;
        await me.conn.sendRequest({
          action: "addLibrary",
          data: {
            id: result.library.id,
            settings: {
              catalog_enabled: true,
              digital_catalog_enabled: true
            }
          },
          request: me.getRequest()
        });
        urls = result.library.catalogs.map(function(cat) {
          return cat.url;
        });
        await me.conn.sendRequest({
          action: "requestPermission",
          url: urls
        });
        return dialog.close();
      });
      dialog.addEventListener("show", function(e) {
        return document.addEventListener("keypress", enterhandler);
      });
      return dialog.showModal();
    }

    createEventListener() {
      var me, runPage;
      me = this;
      document.addEventListener("addLibrary", function(evt) {});
      runPage = async function() {
        if (document.querySelector("div#library_extension_search")) {
          await me.conn.sendRequest({
            action: "setDebugLibrary",
            data: {
              libraryId: me.getLibraryId()
            },
            request: me.getRequest()
          });
          await me.conn.sendRequest({
            action: "check_config",
            request: me.getRequest()
          });
          me.show_config_ready();
        }
        if (document.querySelector("div#add-library")) {
          return setInterval(function() {
            var el, libraries, lid, newLibraries;
            el = document.querySelector("div#add-library");
            newLibraries = JSON.parse(el.dataset["libraries"] || "[]");
            lid = newLibraries[0];
            if (!!lid) {
              lid = "l" + lid;
              libraries = me.get_configured_libraries();
              if (libraries.indexOf(lid) < 0) {
                me.conn.sendRequest({
                  action: "queryLibraryForAdd",
                  data: lid,
                  request: me.getRequest()
                });
              }
            }
            return el.dataset["libraries"] = "[]";
          }, 250);
        }
      };
      if (document.readyState === "loading") {
        return document.addEventListener("DOMContentLoaded", runPage);
      } else {
        return runPage();
      }
    }

    _getSearchElement(key, def, raw) {
      var el;
      el = document.querySelector("#library_extension_search");
      if (el) {
        if (raw) {
          return el.dataset[key];
        }
        return JSON.parse(el.dataset[key]);
      }
      return def;
    }

    getLibraryId() {
      boundMethodCheck(this, LibraryExtensionPlugin);
      return this._getSearchElement("libraryId", "", true);
    }

    getIsbn(url) {
      boundMethodCheck(this, LibraryExtensionPlugin);
      return this._getSearchElement("isbn", []);
    }

    getIsbn13(url) {
      boundMethodCheck(this, LibraryExtensionPlugin);
      return this._getSearchElement("isbn13", []);
    }

    getAuthors() {
      boundMethodCheck(this, LibraryExtensionPlugin);
      return this._getSearchElement("authors", []);
    }

    getTitle() {
      boundMethodCheck(this, LibraryExtensionPlugin);
      return this._getSearchElement("title", "", true);
    }

    getCategory() {
      boundMethodCheck(this, LibraryExtensionPlugin);
      return this._getSearchElement("category", "", true);
    }

    getInitialSearchKeyword() {
      var initialEl;
      boundMethodCheck(this, LibraryExtensionPlugin);
      initialEl = this.doc.root.querySelector("div#libraryKeyword");
      if (initialEl) {
        return initialEl.textContent;
      }
      return "";
    }

  };

  registerSite(LibraryExtensionPlugin);

  // END src/sites/library_extension.coffee
  // BEGIN src/sites/library_thing.coffee
  LibraryThingPlugin = class LibraryThingPlugin extends SiteParserWithScraper {
    constructor(documentProxy) {
      var me;
      super(documentProxy);
      this._site = "librarything";
      this._urlRegex = /librarything.com/;
      this._skipIsbnCheck = true;
      me = this;
      this.pageScrapers = [
        {
          name: "main",
          urlMatch: /\/work\//,
          refreshOnDOMChanges: false,
          selectors: [
            {
              description: "detail item",
              collection: function(root) {
                try {
                  return root.querySelector("body");
                } catch (error) {
                  return null;
                }
              },
              resource: function(root) {
                return [root];
              },
              id: function(root) {
                return "1"; // root.querySelector("[itemprop=\"name\"]").textContent.trim()
              },
              author: {
                multiple: true,
                selector: function(_root) {
                  return parseAuthorAndTitleFromOGMeta(me.doc.root).authors;
                }
              },
              title: {
                selector: function(_root) {
                  return parseAuthorAndTitleFromOGMeta(me.doc.root).title;
                }
              },
              injection: {
                point: "div#buyborrowswapbox",
                element: "<div></div>",
                where: "beforebegin"
              }
            }
          ]
        }
      ];
    }

  };

  registerSite(LibraryThingPlugin);

  // END src/sites/library_thing.coffee
  // BEGIN src/sites/librofm.coffee
  LibroFMPlugin = class LibroFMPlugin extends SiteParser {
    constructor(documentProxy) {
      super(documentProxy);
      this.getAuthors = this.getAuthors.bind(this);
      this.getRawTitle = this.getRawTitle.bind(this);
      this.getCategory = this.getCategory.bind(this);
      this._site = "libro_fm";
      this._urlRegex = /libro.fm/;
      this._anchorElement = "div.price-sidebar";
      this._skipIsbnCheck = true;
      this._structured = new StructuredDataReader(documentProxy);
    }

    getAuthors() {
      boundMethodCheck(this, LibroFMPlugin);
      if (this._authors === null) {
        this._authors = this._structured.getAuthors();
      }
      return this._authors;
    }

    getRawTitle() {
      boundMethodCheck(this, LibroFMPlugin);
      if (this._title === null) {
        this._title = this._structured.getTitle();
      }
      return this._title;
    }

    getCategory() {
      boundMethodCheck(this, LibroFMPlugin);
      return this._structured.getCategory();
    }

  };

  registerSite(LibroFMPlugin);

  // END src/sites/librofm.coffee
  // BEGIN src/sites/npr_books_we_love.coffee
  NPRBooksWeLovePlugin = class NPRBooksWeLovePlugin extends SiteParserWithScraper {
    constructor(documentProxy) {
      var me;
      super(documentProxy);
      this._site = "npr_org_best_books";
      this._urlRegex = /apps.npr.org/;
      this._skipIsbnCheck = true;
      me = this;
      this.pageScrapers = [
        {
          name: "main",
          selectors: [
            {
              description: "detail item",
              collection: function(root) {
                return root.querySelector(".book-detail");
              },
              resource: function(root) {
                return [root];
              },
              author: {
                multiple: true,
                selector: ".author"
              },
              title: {
                selector: ".title"
              },
              injection: {
                point: ".links",
                element: "<div></div>",
                where: "beforebegin"
              }
            }
          ]
        }
      ];
    }

  };

  registerSite(NPRBooksWeLovePlugin);

  // END src/sites/npr_books_we_love.coffee
  // BEGIN src/sites/overdrive.coffee
  OverdrivePlugin = class OverdrivePlugin {
    constructor(doc) {
      this.applies = this.applies.bind(this);
      this.applyConfigSettings = this.applyConfigSettings.bind(this);
      this.notifyStateChange = this.notifyStateChange.bind(this);
      this.handleClickLink = this.handleClickLink.bind(this);
      this.handleLogin = this.handleLogin.bind(this);
      this.show_quickCheckout = this.show_quickCheckout.bind(this);
      this.show_quickHold = this.show_quickHold.bind(this);
      this.doc = doc;
      this.initial_action = "overdrive_ready";
    }

    applies() {
      return /overdrive/.test(this.doc.getHost());
    }

    applyConfigSettings(configSettings) {
      return this.configSettings = configSettings;
    }

    run() {}

    show_config_ready(result) {}

    createEventListener() {}

    notifyStateChange(action, state) {
      return this.conn.sendRequest({
        action: `${action}_${state}`,
        request: new Request(null, document.URL)
      });
    }

    handleClickLink(action, expected_track, success_state, existing_text, existing_state, callback = null) {
      var checkForLink, maxChecksRemaining, me;
      me = this;
      maxChecksRemaining = 10;
      checkForLink = function() {
        var allLinks, btn;
        logger.debug("Searching for borrow links");
        allLinks = nodeListToArray(document.querySelectorAll("a"));
        btn = allLinks.find(function(el) {
          return el.textContent === existing_text;
        });
        if (btn != null) {
          me.notifyStateChange(action, existing_state);
          if (callback !== null) {
            callback(success_state);
          }
        }
        btn = allLinks.find(function(el) {
          return el.dataset && el.dataset.track === expected_track;
        });
        if (btn != null) {
          me.notifyStateChange(action, success_state);
          btn.click();
          if (callback !== null) {
            callback(success_state);
          }
        }
        maxChecksRemaining = maxChecksRemaining - 1;
        if (maxChecksRemaining > 0) {
          return setTimeout(checkForLink, 500);
        }
      };
      return checkForLink();
    }

    handleLogin(action) {
      var checkForCredentials, maxChecksRemaining, me;
      me = this;
      maxChecksRemaining = 10;
      checkForCredentials = function() {
        var cardpin, signin, username;
        username = document.querySelector("input#lcn");
        cardpin = document.querySelector("input#LibraryCardPin");
        signin = document.querySelector("input#submitBtn");
        if (username.value && username.value.length > 0 && cardpin.value && cardpin.value.length > 0) {
          return signin.click();
        } else {
          maxChecksRemaining = maxChecksRemaining - 1;
          if (maxChecksRemaining > 0) {
            return setTimeout(checkForCredentials, 500);
          } else {
            return me.notifyStateChange(action, "need_credentials");
          }
        }
      };
      return checkForCredentials();
    }

    show_quickCheckout(data) {
      var currentURL, format, me, state, url;
      logger.debug("QuickHold: " + JSON.stringify(data));
      me = this;
      if (document.location.pathname.indexOf("Error.htm") >= 0) {
        this.notifyStateChange("quickCheckout", "error");
        return;
      }
      if (data.state === "created") {
        state = this.handleClickLink("quickCheckout", "checkout", "borrow_clicked", "Go to Checkouts", "existing_checkout_found", function(st) {
          var checkForSuccessfulCheckout, maxChecksRemaining;
          if (st === "borrow_clicked") {
            maxChecksRemaining = 10;
            return checkForSuccessfulCheckout = function() {
              var allLinks, btn;
              allLinks = nodeListToArray(document.querySelectorAll("a"));
              btn = allLinks.find(function(el) {
                return el.textContent === "Go to Checkouts";
              });
              if (btn != null) {
                btn.click();
                return;
              }
              maxChecksRemaining = maxChecksRemaining - 1;
              if (maxChecksRemaining > 0) {
                return setTimeout(checkForSuccessfulCheckout, 500);
              }
            };
          }
        });
        return;
      }
      if (data.state === "borrow_clicked" || data.state === "need_email" || data.state === "need_credentials") {
        if (document.location.pathname.indexOf("SignIn.htm") >= 0) {
          this.handleLogin("quickCheckout");
        }
        if (document.location.pathname.indexOf("MyAccount.htm") >= 0) {
          this.notifyStateChange("quickCheckout", "borrow_pending_download");
          format = "420";
          url = `/BANGPurchase.dll?Action=Download&ReserveID=${data.bookid}&FormatID=${format}&url=MyAccount.htm`;
          currentURL = document.URL;
          currentURL = currentURL.substr(0, currentURL.lastIndexOf("/")) + url;
          return document.location.replace(currentURL);
        }
      }
    }

    show_quickHold(data) {
      var email, email_confirm, me, placehold;
      logger.debug("QuickHold: " + JSON.stringify(data));
      me = this;
      if (document.location.pathname.indexOf("Error.htm") >= 0) {
        this.notifyStateChange("quickHold", "error");
        return;
      }
      if (data.state === "created") {
        this.handleClickLink("quickHold", "hold", "hold_clicked", "Go to Holds", "existing_hold_found");
        return;
      }
      if (data.state === "hold_clicked" || data.state === "need_email" || data.state === "need_credentials") {
        if (document.location.pathname.indexOf("SignIn.htm") >= 0) {
          this.handleLogin("quickCheckout");
        }
        if (document.location.pathname.indexOf("WaitingListForm.htm") >= 0) {
          email = document.querySelector("input#email");
          email_confirm = document.querySelector("input#c_email");
          if (!email || email.value.length === 0 || !email_confirm || email_confirm.value.length === 0) {
            me.notifyStateChange("quickHold", "need_email");
            return;
          }
          placehold = document.querySelector("input#submit");
          placehold.click();
          return;
        }
        if (document.location.pathname.indexOf("WaitingListConfirm.htm") >= 0) {
          return this.notifyStateChange("quickHold", "complete");
        }
      }
    }

  };

  registerSite(OverdrivePlugin);

  // END src/sites/overdrive.coffee
  // BEGIN src/sites/penguinrandomhouse.coffee
  PenguinRandomHousePlugin = class PenguinRandomHousePlugin extends SiteParser {
    constructor(documentProxy) {
      super(documentProxy);
      this._getTealiumField = this._getTealiumField.bind(this);
      this.getAuthors = this.getAuthors.bind(this);
      this.getRawTitle = this.getRawTitle.bind(this);
      this._findISBNByValidator = this._findISBNByValidator.bind(this);
      this.getIsbn13 = this.getIsbn13.bind(this);
      this._site = "penguinrandomhouse_com";
      this._anchorElement = "div.product-format";
      this._urlRegex = /penguinrandomhouse.com/;
    }

    _getTealiumField(field) {
      var tag, value;
      boundMethodCheck(this, PenguinRandomHousePlugin);
      value = null;
      tag = this.doc.root.querySelector("meta[name=Tealium]");
      if (tag) {
        value = tag.dataset[field];
      }
      return value;
    }

    getAuthors() {
      var author;
      boundMethodCheck(this, PenguinRandomHousePlugin);
      if (this._authors === null) {
        this._authors = [];
        author = this._getTealiumField("bookAuthors");
        if (author) {
          this._authors = [normalizeAuthor(nodeToText(author))];
        }
      }
      return this._authors;
    }

    getRawTitle() {
      boundMethodCheck(this, PenguinRandomHousePlugin);
      return this._getTealiumField("bookTitle");
    }

    _findISBNByValidator(_key, validator) {
      var isbn, results;
      boundMethodCheck(this, PenguinRandomHousePlugin);
      results = [];
      isbn = this._getTealiumField("bookIsbn");
      if (isbn && validator(isbn)) {
        results.push(isbn);
      }
      return results;
    }

    getIsbn13(url) {
      boundMethodCheck(this, PenguinRandomHousePlugin);
      return this._findISBNByValidator("ISBN13", validateISBN13);
    }

    getIsbn(url) {
      return this._findISBNByValidator("ISBN", validateISBN);
    }

  };

  registerSite(PenguinRandomHousePlugin);

  // END src/sites/penguinrandomhouse.coffee
  // BEGIN src/sites/penworthy.coffee
  PenworthySitePlugin = class PenworthySitePlugin extends SiteParserWithScraper {
    constructor(documentProxy) {
      super(documentProxy);
      this.onResize = this.onResize.bind(this);
      this.getInitialSearchKeyword = this.getInitialSearchKeyword.bind(this);
      this.BORROWTEXT = "View";
      this.VIEWTEXT = "View";
      this.HOLDTEXT = "View";
      this.ON_DEMAND_MODE_BUTTON_TEXT = "Search Title";
      this.ON_DEMAND_MODE_SEARCH_ALL_BUTTON_TEXT = "Search Full Page";
      this.ON_DEMAND_MODE_MESSAGE = "";
      this.ON_DEMAND_MODE_ICON = null;
      this._site = "penworthy_com";
      this._urlRegex = /penworthy.com/;
      this._skipIsbnCheck = true;
      this._hideUpdateMessages = true;
      this.searchLayoutOptions = {
        useButtonToDisplayDialog: true,
        button: {
          style: {
            right: "0px",
            position: "absolute"
          },
          injection: {
            point: ".nlp-New",
            where: "afterend"
          }
        },
        dialog: {
          injection: {
            point: ".nlp-New",
            where: "afterend"
          }
        },
        libraryAction: "replace",
        libraryActionString: {
          action_button: "Select",
          action_complete: "selected"
        }
      };
      this.layoutFactories.push(SearchLayoutFactory(this.searchLayoutOptions));
      this.pageScrapers = [
        {
          name: "decisionwizard",
          urlMatch: /\/decisionwizard\//,
          searchMode: "on-demand",
          refreshOnDOMChanges: true,
          selectors: [
            {
              description: "grid view",
              collection: "#dwList",
              resource: "div.row div[id^=dwitem]",
              id: function(root) {
                try {
                  return root.querySelector("span.itemidstyle").textContent;
                } catch (error) {
                  return null;
                }
              },
              author: {
                selector: ".overlay label:nth-of-type(2)"
              },
              title: {
                selector: ".overlay label:nth-of-type(1)"
              },
              injection: {
                point: "div.AddtocartHeight",
                element: "<div></div>",
                where: "beforebegin"
              }
            },
            {
              description: "list view",
              collection: "#dwList",
              resource: "div.row div[id^=dwitem]",
              id: function(root) {
                try {
                  return root.querySelector("span.product_id").textContent;
                } catch (error) {
                  return null;
                }
              },
              author: {
                selector: "label.titlesize ~ label"
              },
              title: {
                selector: "label.titlesize"
              },
              injection: {
                point: "div.bg_buttoncolor",
                element: "<div></div>",
                where: "beforebegin"
              }
            }
          ]
        },
        {
          name: "shoppingcart",
          urlMatch: /\/(View|Rep)ShoppingCart/,
          searchMode: "on-demand",
          refreshOnDOMChanges: true,
          selectors: [
            {
              collection: "div#GridContent",
              resource: "tbody tr",
              id: function(root) {
                try {
                  return root.querySelector("a#DeleteItem").dataset["id"];
                } catch (error) {
                  return null;
                }
              },
              author: {
                selector: "td:nth-of-type(2) div.title div div:last-child"
              },
              title: {
                selector: "td:nth-of-type(2) div.title a"
              },
              injection: {
                element: "<table><tr><td colspan='5'></td></tr></table>",
                selector: "tr",
                target: "td",
                where: "afterend"
              }
            }
          ]
        },
        {
          name: "admin-filter-list",
          urlMatch: /^((?!(DWTemplate)).)*$/,
          searchMode: "on-demand",
          refreshOnDOMChanges: true,
          selectors: [
            {
              description: "list view",
              collection: "div#divSCtable",
              resource: "tbody tr",
              id: function(root) {
                try {
                  return root.id;
                } catch (error) {
                  return null;
                }
              },
              author: {
                selector: "td:nth-of-type(4)"
              },
              title: {
                selector: "td:nth-of-type(2)"
              },
              injection: {
                element: "<table><tr><td colspan='8'></td></tr></table>",
                selector: "tr",
                target: "td",
                where: "afterend"
              }
            }
          ]
        },
        {
          name: "list",
          urlMatch: /^((?!(DWTemplate)).)*$/,
          searchMode: "on-demand",
          refreshOnDOMChanges: true,
          selectors: [
            {
              description: "list view",
              collection: "#ItemList",
              resource: "div[itemtype=\"https://schema.org/Book\"]",
              id: function(root) {
                try {
                  return root.getAttribute("itemid");
                } catch (error) {
                  return null;
                }
              },
              author: {
                selector: "label[itemprop=\"author\"]"
              },
              title: {
                selector: "label[itemprop=\"name\"]"
              },
              injection: {
                point: "form",
                element: "<div></div>",
                where: "beforebegin"
              }
            },
            {
              description: "grid view - updated",
              collection: "#ItemList",
              resource: "div[itemtype=\"https://schema.org/Book\"]",
              id: function(root) {
                try {
                  return root.getAttribute("itemid");
                } catch (error) {
                  return null;
                }
              },
              author: {
                selector: "label[itemprop=\"author\"]"
              },
              title: "label[itemprop=\"name\"]",
              injection: {
                point: "div.AddtocartHeight",
                element: "<div></div>",
                where: "beforebegin"
              }
            }
          ]
        },
        {
          name: "detail",
          urlMatch: /^((?!(DWTemplate)).)*$/,
          selectors: [
            {
              collection: function(root) {
                return root;
              },
              resource: "body",
              id: function(root) {
                try {
                  return root.querySelector("form input[name=\"itemID\"]").value;
                } catch (error) {
                  return null;
                }
              },
              author: {
                selector: function(root) {
                  return root.querySelector("h1").parentElement.querySelector("p");
                }
              },
              title: {
                selector: "h1"
              },
              injection: {
                point: "div.text-right h3",
                element: "<div></div>",
                where: "afterend"
              }
            }
          ]
        }
      ];
    }

    onResize() {
      var height;
      boundMethodCheck(this, PenworthySitePlugin);
      height = this.resources.reduce(function(acc, el) {
        if (el.displayElement) {
          return Math.max(el.displayElement.clientHeight, acc);
        }
        return acc;
      }, 0);
      return this.resources.forEach(function(el) {
        if (el.displayElement) {
          if (el.displayElement.clientHeight < height) {
            return el.displayElement.style.minHeight = height + "px";
          }
        }
      });
    }

    getInitialSearchKeyword() {
      var initialEl;
      boundMethodCheck(this, PenworthySitePlugin);
      initialEl = this.doc.root.querySelector("input#hdnName");
      if (initialEl) {
        return initialEl.value;
      }
      return "";
    }

  };

  registerSite(PenworthySitePlugin);

  // END src/sites/penworthy.coffee
  // BEGIN src/sites/romance_io.coffee
  RomanceIoSitePlugin = class RomanceIoSitePlugin extends SiteParserWithScraper {
    constructor(documentProxy) {
      super(documentProxy);
      this._site = "";
      this._urlRegex = /romance.io/;
      this._skipIsbnCheck = true;
      this.pageScrapers = [
        {
          name: "main",
          urlMatch: /\/books\/.+/,
          refreshOnDOMChanges: false,
          selectors: [
            {
              description: "detail item",
              collection: function(root) {
                return root;
              },
              resource: function(root) {
                return [root];
              },
              id: function(root) {
                return root.querySelector(".book-info h1").textContent.trim();
              },
              author: {
                selector: ".book-info .author"
              },
              title: {
                selector: ".book-info h1"
              },
              isbn: null,
              isbn13: null,
              injection: {
                point: ".bookstream-links",
                element: "<div></div>",
                where: "afterend"
              }
            }
          ]
        }
      ];
    }

  };

  registerSite(RomanceIoSitePlugin);

  // END src/sites/romance_io.coffee
  // BEGIN src/sites/smashwords.coffee
  SmashwordsPlugin = class SmashwordsPlugin extends SiteParserWithScraper {
    constructor(documentProxy) {
      var me;
      super(documentProxy);
      this._site = "smashwords_com";
      this._urlRegex = /smashwords.com/;
      this._skipIsbnCheck = true;
      me = this;
      this.pageScrapers = [
        {
          name: "main",
          selectors: [
            {
              description: "detail item",
              collection: function(root) {
                return root;
              },
              resource: function(root) {
                return [root];
              },
              author: {
                multiple: true,
                selector: function(_root) {
                  return parseAuthorAndTitleFromOGMeta(me.doc.root).authors;
                }
              },
              title: {
                selector: function(_root) {
                  return parseAuthorAndTitleFromOGMeta(me.doc.root).title;
                }
              },
              injection: {
                point: "div[itemprop=offers]",
                element: "<div></div>",
                where: "beforebegin"
              }
            }
          ]
        }
      ];
    }

  };

  registerSite(SmashwordsPlugin);

  // END src/sites/smashwords.coffee
  // BEGIN src/sites/thepaintedporch.coffee
  ThePaintedPorchSitePlugin = class ThePaintedPorchSitePlugin extends SiteParserWithScraper {
    constructor(documentProxy) {
      super(documentProxy);
      this._site = "";
      this._urlRegex = /thepaintedporch.com/;
      this._skipIsbnCheck = true;
      this.pageScrapers = [
        {
          name: "main",
          urlMatch: /\/products\//,
          refreshOnDOMChanges: false,
          selectors: [
            {
              description: "detail item",
              collection: function(root) {
                return root;
              },
              resource: function(root) {
                return [root];
              },
              id: function(root) {
                return root.querySelector("[class*=__title]").textContent.trim();
              },
              author: {
                selector: "[class*=__vendor]"
              },
              title: {
                selector: "[class*=__title]"
              },
              isbn: null,
              isbn13: null,
              injection: {
                point: "form.product-form",
                element: "<div></div>",
                where: "afterend"
              }
            }
          ]
        }
      ];
    }

  };

  registerSite(ThePaintedPorchSitePlugin);

  // END src/sites/thepaintedporch.coffee
  // BEGIN src/sites/thestorygraph.coffee
  TheStoryGraphSitePlugin = class TheStoryGraphSitePlugin extends SiteParserWithScraper {
    constructor(documentProxy) {
      super(documentProxy);
      this._site = "thestorygraph_com";
      this._urlRegex = /.*\.thestorygraph\.com/;
      this._skipIsbnCheck = true;
      this.refreshOnEvents = ["turbo:load"];
      this.pageScrapers = [
        {
          name: "main",
          urlMatch: /\/books\/[0-9a-f\-]+$/,
          refreshOnDOMChanges: false,
          selectors: [
            {
              description: "detail item 2023",
              collection: function(root) {
                return root.querySelector("main");
              },
              resource: function(root) {
                return [root];
              },
              id: function(root) {
                try {
                  return root.querySelector("span[data-book-id]").dataset.bookId;
                } catch (error) {
                  return null;
                }
              },
              author: {
                multiple: true,
                selector: ".book-title-and-author a[href*=authors]"
              },
              title: {
                selector: function(root) {
                  return root.querySelector(".book-title-and-author h3").firstChild.textContent;
                }
              },
              injection: {
                point: "div.book-pane",
                element: "<div></div>",
                where: "afterend"
              }
            },
            {
              description: "detail item 2023 incl series",
              collection: function(root) {
                return root.querySelector("main");
              },
              resource: function(root) {
                return [root];
              },
              id: function(root) {
                try {
                  return root.querySelector("span[data-book-id]").dataset.bookId;
                } catch (error) {
                  return null;
                }
              },
              author: {
                multiple: true,
                selector: ".book-title-author-and-series a[href*=authors]"
              },
              title: {
                selector: function(root) {
                  return root.querySelector(".book-title-author-and-series h3").firstChild.textContent;
                }
              },
              injection: {
                point: "div.book-cover",
                element: "<div style='margin-top: 10px'></div>",
                where: "afterend"
              }
            }
          ]
        }
      ];
    }

  };

  registerSite(TheStoryGraphSitePlugin);

  // END src/sites/thestorygraph.coffee
  // BEGIN src/sites/theworkscouk.coffee
  TheWorksCoUkSitePlugin = class TheWorksCoUkSitePlugin extends SiteParserWithScraper {
    constructor(documentProxy) {
      super(documentProxy);
      this._site = "theworks_co_uk";
      this._urlRegex = /www.theworks.co.uk/;
      this._skipIsbnCheck = true;
      this.pageScrapers = [
        {
          name: "main",
          urlMatch: /\/p\//,
          refreshOnDOMChanges: false,
          selectors: [
            {
              description: "detail item",
              collection: function(root) {
                if (root.textContent.indexOf("ISBN") >= 0) {
                  return root.querySelector("div#main");
                }
                return null;
              },
              resource: "[itemtype=\"https://schema.org/Product\"]",
              id: function(root) {
                try {
                  return root.querySelector("[itemprop=\"url\"]").getAttribute("content");
                } catch (error) {
                  return null;
                }
              },
              author: {
                selector: ".product-attr a"
              },
              title: {
                selector: "[itemprop=\"name\"]"
              },
              injection: {
                point: "form#OrderItemAddForm",
                element: "<div></div>",
                where: "beforebegin"
              }
            }
          ]
        }
      ];
    }

  };

  registerSite(TheWorksCoUkSitePlugin);

  // END src/sites/theworkscouk.coffee
  // BEGIN src/sites/thriftbooks.coffee
  ThriftbooksSitePlugin = class ThriftbooksSitePlugin extends SiteParserWithScraper {
    constructor(documentProxy) {
      super(documentProxy);
      this._site = "thriftbooks_com";
      this._urlRegex = /www.thriftbooks.com/;
      this._skipIsbnCheck = true;
      this.pageScrapers = [
        {
          name: "main",
          urlMatch: /\/w\//,
          refreshOnDOMChanges: false,
          selectors: [
            {
              description: "detail item",
              collection: function(root) {
                try {
                  return root.querySelector("div[itemtype=\"http://schema.org/Book\"]");
                } catch (error) {
                  return null;
                }
              },
              resource: function(root) {
                return [root];
              },
              id: function(root) {
                return root.querySelector("[itemprop=\"name\"]").textContent.trim();
              },
              author: {
                selector: "[itemprop=\"author\"]"
              },
              title: {
                selector: "[itemprop=\"name\"]"
              },
              injection: {
                point: "div.WorkPriceSidebar",
                element: "<div></div>",
                where: "beforebegin"
              }
            }
          ]
        }
      ];
    }

  };

  registerSite(ThriftbooksSitePlugin);

  // END src/sites/thriftbooks.coffee
  // BEGIN src/sites/waterstones.coffee
  WaterstonesSitePlugin = class WaterstonesSitePlugin extends SiteParserWithScraper {
    constructor(documentProxy) {
      super(documentProxy);
      this._site = "waterstones_co_uk";
      this._urlRegex = /waterstones.co/;
      this._skipIsbnCheck = true;
      this.pageScrapers = [
        {
          name: "main",
          urlMatch: /\/book\//,
          refreshOnDOMChanges: false,
          selectors: [
            {
              description: "detail item",
              collection: function(root) {
                try {
                  return root.querySelector("[itemtype=\"http://schema.org/Book\"]");
                } catch (error) {
                  return null;
                }
              },
              resource: ".book-detail",
              id: function(root) {
                return root.querySelector("[itemprop=\"name\"]").textContent.trim();
              },
              author: {
                selector: "[itemprop=\"author\"]"
              },
              title: {
                selector: "[itemprop=\"name\"]"
              },
              injection: {
                point: ".book-info",
                element: "<div></div>",
                where: "beforebegin"
              }
            }
          ]
        }
      ];
    }

  };

  registerSite(WaterstonesSitePlugin);

  // END src/sites/waterstones.coffee
  // BEGIN src/sites/whsmith.coffee
  WHSmithSitePlugin = class WHSmithSitePlugin extends SiteParserWithScraper {
    constructor(documentProxy) {
      super(documentProxy);
      this._site = "whsmith_co_uk";
      this._urlRegex = /www.whsmith.co.uk/;
      this._skipIsbnCheck = true;
      this.pageScrapers = [
        {
          name: "main",
          urlMatch: /\/products\//,
          refreshOnDOMChanges: false,
          selectors: [
            {
              description: "detail item",
              collection: function(root) {
                try {
                  return root.querySelector("div[itemtype=\"http://schema.org/Product\"]");
                } catch (error) {
                  return null;
                }
              },
              resource: function(root) {
                return [root];
              },
              id: function(root) {
                return root.querySelector("[itemprop=\"name\"]").textContent.trim();
              },
              author: {
                selector: ".author"
              },
              title: {
                selector: "[itemprop=\"name\"]"
              },
              injection: {
                point: "div.product-details-action",
                element: "<div></div>",
                where: "beforebegin"
              }
            }
          ]
        }
      ];
    }

  };

  registerSite(WHSmithSitePlugin);

  // END src/sites/whsmith.coffee
  // BEGIN src/sites/wordery.coffee
  WorderyPlugin = class WorderyPlugin extends SiteParserWithScraper {
    constructor(documentProxy) {
      super(documentProxy);
      this._site = "wordery";
      this._urlRegex = /wordery.com/;
      this._skipIsbnCheck = true;
      this.pageScrapers = [
        {
          name: "main",
          selectors: [
            {
              description: "detail item",
              collection: function(root) {
                return root;
              },
              resource: function(root) {
                return [root];
              },
              author: {
                multiple: true,
                selector: "#product-description-and-details a[href*='-author']"
              },
              title: {
                selector: "strong[itemprop=name]"
              },
              injection: {
                point: "div[data-wishlist]",
                element: "<div></div>",
                where: "afterend"
              }
            }
          ]
        }
      ];
    }

  };

  registerSite(WorderyPlugin);

  // END src/sites/wordery.coffee
  findMatchingPlugin = function(settings) {
    return plugins.reduce(function(acc, cls) {
      var impl;
      if (acc) {
        return acc;
      }
      impl = new cls(theDocument);
      impl.applyConfigSettings(settings);
      return impl.applies() && impl;
    }, null);
  };

  initLayout = function(settings) {
    var plugin;
    plugin = findMatchingPlugin(settings);
    if (plugin) {
      return plugin.layoutFactories.forEach(function(factory) {
        var layout;
        layout = factory(theDocument, plugin, conn, settings);
        layout.createEventListener();
        return layout.run();
      });
    }
  };

  if (!isUnitTestMode) {
    conn = new Connection();
    run = function() {
      var message;
      message = {
        action: "getConfigSettings"
      };
      return conn.sendRequest(message).then(initLayout);
    };
    run();
  }

  unitTestable(GenericSiteLayoutFactory);

  unitTestable(SearchLayoutFactory);

  unitTestable(SiteLayout);

  unitTestable(plugins);

  // END src/common.coffee

}).call(this);
