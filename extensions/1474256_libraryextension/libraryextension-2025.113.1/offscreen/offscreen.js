// BEGIN src/offscreen/offscreen.coffee
  /*
  Library Extension
  Copyright (c) 2025 Quotidian LLC
  This software is provided as is, with no warranties implied.
  */
var $toFragment, $toXMLFragment, ApacheSolrDOMOperations, ArchiveOrgDOMOperations, AxielArenaDOMOperations, Axis360DOMOperations, BiblioCommonsDOMOperations, BiblionixDOMOperations, BorrowBoxDOMOperations, CapitaDOMOperations, ChamoDOMOperations, CounterFactory, DOMOperations, DOMOperationsDirectory, DrupalDOMOperations, EncoreDOMOperations, FollettDestinyDOMOperations, IPac20DOMOperations, IguanaDOMOperations, KoboPlusDOMOperations, KohaDOMOperations, LOG_LEVELS, LOG_LEVEL_TEXT, LiberoDOMOperations, Logger, MontageDOMOperations, NLSBardDOMOperations, OverdriveDOMOperations, PolarisDOMOperations, SirsiDynixDOMOperations, SirsiDynixEnterpriseDOMOperations, SpydusDOMOperations, TinycatDOMOperations, TorontoPublicLibraryDOMOperations, VoebbDOMOperations, VufindDOMOperations, WHITESPACE, WebPacProDOMOperations, WebPacProStrategies, WebVoyageDOMOperations, WheelersDOMOperations, WorldcatDOMOperations, Z3950Record, Z3950RecordSet, Z3950TagMap, _parser, anyBeginsWith, authorArtistRegEx, byRegEx, cleanArray, cleanArrayGenerator, cleanupPermissionUrl, commonBindingMappings, compareComponents, compareSortedComponents, compareText, digitsOnly, findAllMatchingNodes, findFirstMatchingNode, findWinningStrategy, friendlyTime, fromHTML, fromHTMLTemplate, fromTemplate, handleDOMOperations, handleMessages, handleStorage, hashToList, illustratorRegEx, isBinding, logger, nodeListToArray, noop_fn, normalizeAuthor, normalizeAuthorPrefix_re, normalizeTitle, normalizeTitlePrefix_re, parseAuthorAndTitleBySlash, parseBoolean, parseResponse, parseToFragment, pluck, pluralize, port, publishedRegEx, registerDOMOperations, remove_paren_re, replacementChars, safeChars_re, sanitizeTitle, setutils, singularize, splitAndNormalizeTitle, stripHtml, stripTags, templateFilters, textFromElement, toQueryString, txtLower, uniqueArray, unitTestable, urlutils, validateISBN, validateISBN13,
  boundMethodCheck = function(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new Error('Bound instance method accessed before binding'); } };

unitTestable = function() {
  return 0;
};

// BEGIN src/utilities/service_worker.coffee

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
    var k, ref, results1;
    results1 = [];
    for (num = k = 0, ref = maxlength - 2; (0 <= ref ? k <= ref : k >= ref); num = 0 <= ref ? ++k : --k) {
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
    var k, ref, results1;
    results1 = [];
    for (num = k = 0, ref = maxlength - 2; k <= ref; num = k += 2) {
      results1.push(parseInt(isbn[num]));
    }
    return results1;
  })();
  odd_digits = (function() {
    var k, ref, results1;
    results1 = [];
    for (num = k = 1, ref = maxlength - 2; k <= ref; num = k += 2) {
      results1.push(parseInt(isbn[num]) * 3);
    }
    return results1;
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
    } catch (error) {
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
DOMOperationsDirectory = {};

registerDOMOperations = function(cls, name) {
  return DOMOperationsDirectory[name] = cls;
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
    } catch (error) {
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
      } catch (error) {

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
// BEGIN src/catalogs/dom/biblionix.coffee
BiblionixDOMOperations = class BiblionixDOMOperations extends DOMOperations {
  constructor() {
    super(...arguments);
    this.extractSearchResults = this.extractSearchResults.bind(this);
  }

  extractOneResult(item) {
    var author, available, binding, bindingMap, count, id, k, len, ref, row, title;
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
    for (k = 0, len = ref.length; k < len; k++) {
      row = ref[k];
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
      } catch (error) {
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
// BEGIN src/catalogs/dom/evolve.coffee

  // END src/catalogs/dom/evolve.coffee
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
        } catch (error) {
          exc = error;
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
        } catch (error) {
          exc = error;
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
    } catch (error) {
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
      var k, l, len, len1, sum, term;
      sum = 0;
      for (k = 0, len = AVAILABLE_TERMS.length; k < len; k++) {
        term = AVAILABLE_TERMS[k];
        sum += findAllMatchingNodes(el, `td.piece:contains('${term}')`).length;
      }
      for (l = 0, len1 = UNAVAILABLE_TERMS.length; l < len1; l++) {
        term = UNAVAILABLE_TERMS[l];
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
// BEGIN src/catalogs/dom/sirsidynix.coffee
SirsiDynixDOMOperations = class SirsiDynixDOMOperations extends DOMOperations {
  constructor() {
    super(...arguments);
    this.extractSearchResults = this.extractSearchResults.bind(this);
    this.extractAvailability = this.extractAvailability.bind(this);
  }

  async extractSearchResults(content) {
    var authors, bestMatch, binding_re, bookId, bookIds, ckeys, ckeys_re, counter, defaultBookId, endpoint, extractBiblioFromText, iconType, iconTypes, icons, k, keepRemoveButton, len, match, matches, obj, putremove_re, raw, reBookIds, resp, result, results, rows, skipRows, titles, updateFromBibInfo, url_re;
    boundMethodCheck(this, SirsiDynixDOMOperations);
    obj = (await this.parser(content));
    raw = obj.documentElement.innerHTML;
    results = [];
    obj["found"] = false;
    extractBiblioFromText = function(text, result_obj) {
      var author, row, rows, rv;
      rows = text.split(/\s\s+/);
      rows = (function() {
        var k, len, results1;
        results1 = [];
        for (k = 0, len = rows.length; k < len; k++) {
          row = rows[k];
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
      for (k = 0, len = iconTypes.length; k < len; k++) {
        iconType = iconTypes[k];
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
          } catch (error) {
            exc2 = error;
            logger.exception("SirsiDynixLibrary:parseInventoryLookup", exc2);
          }
        }
      } catch (error) {
        exc = error;
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
      } catch (error) {
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
          } catch (error) {
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
            } catch (error) {
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
      } catch (error) {
        ex = error;
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
    } catch (error) {
      exc = error;
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
      } catch (error) {
        exc = error;
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
      } catch (error) {
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
handleStorage = function(message, sendResponse) {
  var value;
  switch (message.type) {
    case 'localstorage.getItem':
      value = localStorage.getItem(message.args.key);
      return sendResponse({
        value: value,
        ok: true
      });
    case 'localstorage.setItem':
      localStorage.setItem(message.args.key, message.args.value);
      return sendResponse({
        ok: true
      });
    case 'localstorage.removeItem':
      localStorage.removeItem(message.args.key);
      return sendResponse({
        ok: true
      });
    case 'sessionstorage.getItem':
      value = sessionStorage.getItem(message.args.key);
      return sendResponse({
        value: value,
        ok: true
      });
    case 'sessionstorage.setItem':
      sessionStorage.setItem(message.args.key, message.args.value);
      return sendResponse({
        ok: true
      });
    case 'sessionstorage.removeItem':
      sessionStorage.removeItem(message.args.key);
      return sendResponse({
        ok: true
      });
    default:
      console.warn(`Unexpected message type received: '${message.type}'.`);
      return sendResponse({
        ok: false
      });
  }
};

handleDOMOperations = async function(message, sendResponse) {
  var e, operations, res;
  operations = new DOMOperationsDirectory[message.catalog](message.http, message.defaults);
  try {
    res = (await operations[message.method](...message.args));
    return sendResponse({
      ok: true,
      value: res
    });
  } catch (error) {
    e = error;
    return sendResponse({
      ok: false,
      value: e.stack
    });
  }
};

port = null;

handleMessages = function(message, _sender, sendResponse) {
  var handlePortMessages;
  if (port === null) {
    port = chrome.runtime.connect({
      name: "offscreen"
    });
    handlePortMessages = function(message) {
      var responder;
      responder = function(msg) {
        return port.postMessage({
          'target': 'offscreen-replies',
          'reply-to': message.message_id,
          'message': msg
        });
      };
      if (message.type) {
        handleMessages(message, null, responder);
        return true;
      }
    };
    port.onMessage.addListener(handlePortMessages);
  }
  switch (message.target) {
    case 'offscreen-storage':
      handleStorage(message, sendResponse);
      return true;
    case 'offscreen-dom':
      handleDOMOperations(message, sendResponse);
      return true;
    case 'offscreen-ping':
      sendResponse({
        ok: true,
        value: {
          pong: true
        }
      });
      return true;
    default:
      return false;
  }
};

chrome.runtime.onMessage.addListener(handleMessages);

// END src/offscreen/offscreen.coffee
