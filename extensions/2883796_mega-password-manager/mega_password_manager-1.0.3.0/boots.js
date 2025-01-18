var manifest = chrome.runtime.getManifest();
var buildVersion = {timestamp: 1734562233, pwmChrome: manifest.version};

var window = this;
var ua = window.navigator.userAgent.toLowerCase();
var u_sid, login_next;
var loggedout = d = false;
var l = [];
var defaultStaticPath = staticpath = 'https://eu.static.mega.co.nz/4/';
var extPath = chrome.runtime && chrome.runtime.id && `chrome-extension://${chrome.runtime.id}`;
var publicTLDs = new Set();

Object.defineProperties(window, {
    fminitialized: {value: false},
    is_extension: {value: false},
    is_pwm_extension: {value: true},
    is_eplusplus: {value: false},
    is_mobile: {value: false},
    pfid: {value: false},
    is_iframed: {value: false},
    is_livesite: {value: true},
    is_karma: {value: false},
    is_chrome_web_ext: {value: false},
    is_firefox_web_ext: {value: false},
    is_microsoft: {value: false},
    is_electron: {value: false},
    confirmok: {value: false},
    pfkey: {value: false},
    is_pwm: {value: true}
});

/**
 * NB: Duplicate from cryto.js to be made available on the popup window
 */
// general errors
var EINTERNAL = -1;
var EARGS = -2;
var EAGAIN = -3;
var ERATELIMIT = -4;
var EFAILED = -5;
var ETOOMANY = -6;
var ERANGE = -7;
var EEXPIRED = -8;

// FS access errors
var ENOENT = -9;            // No Entity (does not exist)
var ECIRCULAR = -10;
var EACCESS = -11;
var EEXIST = -12;
var EINCOMPLETE = -13;

// crypto errors
var EKEY = -14;

// user errors
var ESID = -15;
var EBLOCKED = -16;
var EOVERQUOTA = -17;
var ETEMPUNAVAIL = -18;
var ETOOMANYCONNECTIONS = -19;
var EGOINGOVERQUOTA = -24;

var EROLLEDBACK = -25;
var EMFAREQUIRED = -26;     // Multi-Factor Authentication Required
var EMASTERONLY = -27;      // Access denied for sub-users (only for business accounts)
var EBUSINESSPASTDUE = -28; // Business account expired
var EPAYWALL = -29;     // ODQ paywall state

// custom errors
var ETOOERR = -400;
var ESHAREROVERQUOTA = -401;

var mega = {
    ui: {},
    state: 0,
    utils: {},
    uaoref: window.uaoref,
    browserBrand: [
        0, 'Torch', 'Epic', 'Edgium'
    ],
    maxWorkers: Math.min(navigator.hardwareConcurrency || 4, 16),

    /** get cryptographically strong random values. */
    getRandomValues: function(len) {
        'use strict';
        var seed = new Uint8Array(len || 128);
        return asmCrypto.getRandomValues(seed);
    },
    /** Get browser brancd internal ID */
    getBrowserBrandID: function() {
        if (Object(window.chrome).torch) {
            return 1;
        }
        else {
            var plugins = Object(navigator.plugins);
            var len = plugins.length | 0;

            while (len--) {
                var plugin = Object(plugins[len]);

                // XXX: This plugin might be shown in other browsers than Epic,
                //      hence we check for chrome.webstore since it won't appear
                //      in Google Chrome, although it might does in other forks?
                if (plugin.name === 'Epic Privacy Browser Installer') {
                    return Object(window.chrome).webstore ? 2 : 0;
                }
            }

            if (this.chrome && !String(this.userAgentBrands).indexOf('MicrosoftEdge:')) {
                return 3;
            }
        }

        return 0;
    }
};

if (window.crypto && typeof crypto.getRandomValues === 'function') {
    (function(crypto, rand) {
        'use strict';
        mega.getRandomValues = function(len) {
            var seed = new Uint8Array(len || 128);
            return rand.call(crypto, seed);
        };
        mega.getRandomValues.strong = true;

        if (window.isSecureContext && typeof crypto.randomUUID === 'function') {
            Object.defineProperty(window, 'makeUUID', {
                value: () => crypto.randomUUID()
            });
        }
    })(crypto, crypto.getRandomValues);
}

// Mapping of user's browser language preference to language codes and native/english names
var languages = {
    'ar': [['ar', 'ar-'], 'Arabic', 'العربية'],
    'br': [['pt-br', 'pt'], 'Portuguese', 'Português'],
    'cn': [['zh', 'zh-cn'], 'Chinese', '简体中文'],
    'ct': [['zh-hk', 'zh-sg', 'zh-tw'], 'Traditional Chinese', '中文繁體'],
    'de': [['de', 'de-'], 'German', 'Deutsch'],
    'en': [['en', 'en-'], 'English', 'English'],
    'es': [['es', 'es-'], 'Spanish', 'Español'],
    'fr': [['fr', 'fr-'], 'French', 'Français'],
    'id': [['id'], 'Indonesian', 'Bahasa Indonesia'],
    'it': [['it', 'it-'], 'Italian', 'Italiano'],
    'jp': [['ja'], 'Japanese', '日本語'],
    'kr': [['ko'], 'Korean', '한국어'],
    'nl': [['nl', 'nl-'], 'Dutch', 'Nederlands'],
    'pl': [['pl'], 'Polish', 'Polski'],
    'ro': [['ro', 'ro-'], 'Romanian', 'Română'],
    'ru': [['ru', 'ru-mo'], 'Russian', 'Pусский'],
    'th': [['||', 'th'], 'Thai', 'ไทย'],
    'vi': [['vn', 'vi'], 'Vietnamese', 'Tiếng Việt']
};

/**
 * Simple .toArray method to be used to convert `arguments` to a normal JavaScript Array
 *
 * Please note there is a huge performance degradation when using `arguments` outside their
 * owning function, to mitigate it use this function as follow: toArray.apply(null, arguments)
 *
 * @returns {Array}
 */
function toArray() {
    var len = arguments.length;
    var res = Array(len);
    while (len--) {
        res[len] = arguments[len];
    }
    return res;
}

/**
 * Events broadcaster
 * @name mBroadcaster
 * @global
 */
(function(s, o) {
    'use strict';
    Object.defineProperty(s, 'mBroadcaster', {
        value: o,
        writable: false
    });
})(self, {
    // @private
    _topics: Object.create(null),

    /**
     * Add broadcast event listener.
     * @param {String} topic A string representing the event type to listen for.
     * @param {Object|Function} options Event options or function to invoke.
     * @returns {String} The ID identifying the event
     * @memberOf mBroadcaster
     */
    addListener: function mBroadcaster_addListener(topic, options) {
        'use strict';

        if (typeof options === 'function') {
            options = {
                callback: options
            };
        }
        if (options.hasOwnProperty('handleEvent')) {
            options = {
                scope: options,
                callback: options.handleEvent
            };
        }
        if (typeof options.callback !== 'function') {
            return false;
        }

        if (!this._topics[topic]) {
            this._topics[topic] = Object.create(null);
        }

        var id = makeUUID();
        this._topics[topic][id] = options;

        //if (d) console.log('Adding broadcast listener', topic, id, options);

        return id;
    },

    /**
     * Check whether someone is listening for an event
     * @param {String} topic A string representing the event type we may be listening for.
     * @returns {Boolean}
     */
    hasListener: function mBroadcaster_hasListener(topic) {
        'use strict';
        return Boolean(this._topics[topic]);
    },

    /**
     * Remove all broadcast events for an specific topic.
     * @param {String} topic The string representing the event type we were listening for.
     * @returns {Boolean} Whether the event was found.
     * @memberOf mBroadcaster
     */
    removeListeners: function mBroadcaster_removeListeners(topic) {
        'use strict';

        if (this._topics[topic]) {
            delete this._topics[topic];
            return true;
        }
        return false;
    },

    /**
     * Remove an specific event based on the ID given by addListener()
     * @param {String} token The ID identifying the event.
     * @param {EventListener} [listener] Optional DOM event listener.
     * @returns {Boolean} Whether the event was found.
     * @memberOf mBroadcaster
     */
    removeListener: function mBroadcaster_removeListenr(token, listener) {
        'use strict';

        // if (d) console.log('Removing broadcast listener', token);

        if (listener) {
            // Remove an EventListener interface.
            var found;
            for (var id in this._topics[token]) {
                if (this._topics[token].hasOwnProperty(id)
                    && this._topics[token][id].scope === listener) {

                    found = id;
                    break;
                }
            }

            token = found;
        }

        for (var topic in this._topics) {
            if (this._topics[topic][token]) {
                delete this._topics[topic][token];
                if (!Object.keys(this._topics[topic]).length) {
                    delete this._topics[topic];
                }
                return true;
            }
        }
        return false;
    },

    /**
     * Send a broadcast event
     * @param {String} topic A string representing the event type to notify.
     * @returns {Boolean} Whether anyone were listening.
     * @memberOf mBroadcaster
     */
    sendMessage: function mBroadcaster_sendMessage(topic) {
        'use strict';

        if (this._topics[topic]) {
            var idr = [];
            var args = toArray.apply(null, arguments);
            args.shift();

            if (!args.length) {
                args = [{type: topic}];
            }

            // if (d) console.log('Broadcasting ' + topic, args);

            for (var id in this._topics[topic]) {
                var ev = this._topics[topic][id], rc;
                try {
                    rc = ev.callback.apply(ev.scope, args);
                }
                catch (ex) {
                    console.error(ex);

                    if (typeof reportError === 'function'
                        && buildVersion.timestamp * 1000 + 8e7 > Date.now()) {

                        reportError(ex);
                    }
                }
                if (ev.once || rc === 0xDEAD) {
                    idr.push(id);
                }
            }
            if (idr.length) {
                for (var i = idr.length; i--;) {
                    this.removeListener(idr[i]);
                }
            }

            return true;
        }

        return false;
    },

    /**
     * Wrapper around addListener() that will listen for the event just once.
     * @param {String} topic A string representing the event type to listen for.
     * @param {Function} callback The function to invoke
     * @memberOf mBroadcaster
     */
    once: function mBroadcaster_once(topic, callback) {
        'use strict';

        this.addListener(topic, {
            once: true,
            callback: callback
        });
    }
});

function tryCatch(fn, onerror) {
    fn.foo = function __tryCatchWrapper() {
        try {
            return fn.apply(this, arguments);
        }
        catch (ex) {
            if (onerror !== false) {
                console.error(ex);
            }

            if (typeof onerror === 'function') {
                onIdle(onerror.bind(null, ex));
            }
        }
    };
    fn.foo.bar = fn;
    return fn.foo;
}

function onIdle(callback) {
    'use strict';
    return window.requestIdleCallback(callback, {timeout: 51});
}

function makeUUID(a) {
    'use strict';

    return a
        ? (a ^ Math.random() * 16 >> a / 4).toString(16)
        : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, makeUUID);
}

Object.defineProperties(self, {
    'freeze': {
        value: function freeze(obj) {
            Object.setPrototypeOf(obj, null);
            return Object.freeze(obj);
        }
    },
    'lazy': {
        value: function lazy(target, property, stub) {
            return Object.defineProperty(target, property, {
                get: function() {
                    Object.defineProperty(this, property, {
                        value: stub.call(this),
                        enumerable: property[0] !== '_'
                    });
                    return this[property];
                },
                configurable: true
            });
        }
    },
    'gClearTimeout': {
        value: self.clearTimeout
    },

    'gSetTimeout': {
        value: self.setTimeout
    }
});

const detectLang = function() {
    'use strict';

    // Get the preferred language in their browser
    let userLangs, userLang, ourLangs, k, v, j, i, u;

    // Otherwise get the user's preferred language in their browser settings
    userLangs = navigator.languages || navigator.language || navigator.userLanguage;

    // If a language can't be detected, default to English
    if (!userLangs) {
        return 'en';
    }

    if (!Array.isArray(userLangs)) {
        userLangs = [userLangs];
    }

    for (u = 0; u < userLangs.length; u++) {

        // Lowercase it
        userLang = String(userLangs[u]).toLowerCase();

        // Language mapping handling.
        ourLangs = Object.keys(languages);

        // Match on language code variants e.g. 'pt-br' returns 'br'
        for (i = ourLangs.length; i--;) {
            k = ourLangs[i];
            v = languages[k][0];

            for (j = v.length; j--;) {
                if (v[j] === userLang || v[j] === userLang.substr(0, 3)) {
                    return k;
                }
            }
        }

        // If no exact match supported, normalise to base language code e.g. en-gb, en-us, en-ca returns 'en'
        for (i = ourLangs.length; i--;) {
            k = ourLangs[i];
            v = languages[k][0];

            for (j = v.length; j--;) {
                if (v[j].substr(0, 3) === userLang.substr(0, 3)) {
                    return k;
                }
            }
        }
    }

    // Default to English
    return 'en';
};

window.lang = detectLang();

/**
 * Escape HTML markup
 * @param {string} str The HTML fragment to parse.
 * NB: This should be the same than our legacy `htmlentities`
 *     function, except that it's faster and deals with quotes
 */
function escapeHTML(str) {
    return String(str).replace(/["&'<>]/g, (match) => escapeHTML.replacements[match]);
}

escapeHTML.replacements = {"&": "&amp;", '"': "&quot;", "'": "&#39;", "<": "&lt;", ">": "&gt;"};

// Promise.catch helper
function nop() {
    'use strict';
}

// Promise.catch helper
function echo(a) {
    'use strict';
    return a;
}

var dump = nop;

function init_storage(storage) {
    var v = storage.v || 0,
        d = storage.d,
        dd = storage.dd,
        sp = storage.staticpath;

    // Graceful storage version upgrade
    if (v == 0) {
        // array of limbs -> mpi-encoded number
        function b2mpi(b) {
            var bs = 28, bm = (1 << bs) - 1, bn = 1, bc = 0, r = [0], rb = 1, rn = 0;
            var bits = b.length * bs;
            var n, rr = '';

            for (n = 0; n < bits; n++) {
                if (b[bc] & bn) {
                    r[rn] |= rb;
                }
                if ((rb <<= 1) > 255) {
                    rb = 1, r[++rn] = 0;
                }
                if ((bn <<= 1) > bm) {
                    bn = 1, bc++;
                }
            }

            while (rn && r[rn] == 0) rn--;

            bn = 256;
            for (bits = 8; bits > 0; bits--) {
                if (r[rn] & (bn >>= 1)) {
                    break;
                }
            }
            bits += rn * 8;

            rr += String.fromCharCode(bits / 256) + String.fromCharCode(bits % 256);
            if (bits) {
                for (n = rn; n >= 0; n--) {
                    rr += String.fromCharCode(r[n]);
                }
            }
            return rr;
        }

        if (storage.privk && storage.privk.substr(0, 1) == "[") { /* is json serialized array which need to be migrated */
            // Upgrade key format
            try {
                var privk = JSON.parse(storage.privk), str = '';
                for (var i = 0; i < privk.length; i++) {
                    str += b2mpi(privk[i]);
                }
                storage.privk = btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
                v++;
            }
            catch (e) {
                console.error("Could not migrate storage - priv key could not be converted to the new format: ", e);
            }
        }
        else {
            v++;
        }

        storage.v = v;
    }

    return storage;
}

function inherits(target, source) {
    'use strict';

    target.prototype = Object.create(source && source.prototype || source);
    Object.defineProperty(target.prototype, 'constructor', {
        value: target,
        enumerable: false
    });

    Object.defineProperty(target.prototype, 'toString', {
        value: function() {
            return '[object ' + this.constructor.name + ']';
        },
        writable: true,
        configurable: true
    });

    if (!target.prototype.valueOf) {
        Object.defineProperty(target.prototype, 'valueOf', {
            value: function() {
                return this;
            },
            configurable: true
        });
    }

    if (source) {
        Object.setPrototypeOf(target, source);
    }
}

function showToast(classname, msg) {
    'use strict';

    if (classname) {
        mega.ui.toast.rack.addClass(classname);
    }

    mega.ui.toast.show(msg);
}

var SUPPORTED_FAVICON = new Set([
    "adobe", "airbnb", "aliexpress", "allrecipes", "amazon", "americanexpress", "apple",
    "battle", "bbc", "bestbuy", "bitly", "bloomberg", "booking",
    "canva", "capitalone", "citi", "clevelandclinic", "cnn", "coursera", "craigslist", "cricbuzz",
    "dell", "discord", "disneyplus", "dropbox",
    "ea", "ebay", "espn", "etsy", "eventbrite", "expedia",
    "facebook", "fandom", "fedex", "figma", "flipkart", "forbes", "foxnews",
    "gamespot", "github", "gog", "google",
    "healthline", "hotels", "hulu",
    "ibm", "imdb", "imgur", "indeed", "instagram", "investing", "irs",
    "kickstarter",
    "linkedin", "linktree", "live",
    "mapquest", "medium", "meetup", "mega", "messenger", "mlb",
    "netflix", "nytimes", "nih", "nike", "nintendo",
    "ok", "openai", "outbrain",
    "patreon", "paypal", "pinterest", "playstation",
    "quora",
    "reddit", "roblox", "rockstargames", "rottentomatoes",
    "samsung", "shopify", "snapchat", "soundcloud", "speedtest", "spotify", "stackoverflow", "steampowered",
    "t-mobile", "taboola", "target", "telegram", "temu", "homedepot", "ticketmaster", "tiktok",
    "theguardian", "tripadvisor", "tumblr", "twitch",
    "uber", "usatoday", "usnews", "usps",
    "vimeo", "vk",
    "walmart", "webmd", "wix", "wordpress",
    "x", "xero",
    "yahoo", "yelp", "youtube",
    "zillow", "zoom"
]);

/**
 * Function that return either favicon for the website of the url provided or manual favicon
 *
 * @param {string} name Name of saved password
 * @param {string} url URL of saved password
 * @param {HTMLElement} elem Element where the favicon should be added
 * @returns {void}
 */
function generateFavicon(name, url, elem) {
    "use strict";

    url = typeof url === "undefined" ? "" : url;
    name = name.trim();

    const inner = elem.getElementsByTagName('span')[0];
    inner.textContent = '';
    elem.classList.remove('manual-favicon', 'brand-favicon', 'color0', 'color1', 'color2');

    if (url !== '' && isURL(url)) {
        const domain = domainFromURL(url);

        if (domain && SUPPORTED_FAVICON.has(domain.toLowerCase())) {
            elem.classList.add('brand-favicon');
            inner.className = `favicon-brand`;
            const chromePath = chrome.runtime.getURL(`/images/favicon-sprite.svg#${domain.toLowerCase()}`);
            let img;
            if (typeof specialWebsite !== 'undefined' && specialWebsite && specialWebsite.insertRawCSS) {
                img = document.createElement('i');
                img.style.backgroundImage = `url(${chromePath})`;
            }
            else {
                img = document.createElement('img');
                img.src = chromePath;
            }

            inner.append(img);

            return;
        }
        name = name || domain;
    }

    elem.classList.add('manual-favicon');
    inner.className = '';

    const hash = name.charCodeAt(0);

    if (!hash) {
        return;
    }

    const color = `color${hash % 3}`;
    elem.classList.add(color);

    const hasEmoji = /^([\p{Emoji}\p{sc=Han}\p{sc=Hangul}\p{sc=Katakana}\p{sc=Hiragana}])|^.([\p{Emoji}\p{sc=Han}\p{sc=Hangul}\p{sc=Katakana}\p{sc=Hiragana}])/u.exec(name);

    if (hasEmoji === null) {
        inner.innerText = name[0].toUpperCase() + (name[1] || '');
    }
    else if (hasEmoji[1]) {
        inner.innerText = hasEmoji[1];
    }
    else {
        inner.innerText = name[0].toUpperCase();
    }
}

function getHostname(url) {
    "use strict";

    if (typeof url === 'undefined' || url === '') {
        return '';
    }

    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = `http://${url}`;
    }

    const urlObj = tryCatch(() => new URL(url), false)();

    if (typeof urlObj === 'undefined') {
        return false;
    }

    return urlObj.hostname;
}

/**
 * Extracts the domain name from a given URL.
 *
 * @param {string} url - The URL from which to extract the domain name.
 * @param {boolean} [withTLD] - Return TLD with the domain
 * @returns {string|boolean} - The extracted domain name.
 */
function domainFromURL(url, withTLD) {
    "use strict";

    withTLD = withTLD || false;
    const cleanedDomain = getHostname(url);

    if (!cleanedDomain) {
        return false;
    }

    // Extract the domain name part
    const domainParts = cleanedDomain.split('.');
    return getEffectiveDomain(domainParts, withTLD);
}

/**
 * Gets the effective domain name from the domain parts.
 *
 * @param {string[]} domainParts - The parts of the domain.
 * @param {boolean} [withTLD] - Return TLD with the domain
 * @returns {string} - The effective domain name.
 */
function getEffectiveDomain(domainParts, withTLD) {
    "use strict";

    withTLD = withTLD || false;

    let tldIndex = domainParts.length - 1;
    while (tldIndex > 0) {
        const potentialTLD = domainParts.slice(tldIndex).join('.');
        if (publicTLDs.has(potentialTLD)) {
            tldIndex--;
        }
        else {
            break;
        }
    }
    return withTLD ? domainParts.slice(tldIndex).join('.') : domainParts[tldIndex];
}

function fullDomainFromURL(url) {
    "use strict";

    const domain = getHostname(url);

    if (!domain) {
        return '';
    }

    return domain.replace(/^www\./, '');
}

function isURL(url) {
    'use strict';

    return /^(?:https?:\/{2})?[\w#%+.:=@~-]{1,256}\.(?:[a-z]{2,16}|(?:\d{1,3}.?){4})\b[\w#%&*+,./:=?@~-]*$/
        .test(url.toLowerCase());
}

/**
 * Copy the provided content to the clipboard.
 * @param {String} content The content to copy to the clipboard
 * @param {String} [toastText] Optional toast notification message
 * @param {String} [classname] Optional toast notification addition classname
 * @param {Number} [timeout] Optional toast notification time (millis) until dismiss
 * @returns {Boolean} Whether the operation was successful
 */
function copyToClipboard(content, toastText, classname) {
    'use strict';

    chrome.runtime.sendMessage({type: 'clipboard', data: content}).then(({success, error}) => {
        if (error) {
            console.log(error);
            return false;
        }
        if (success && toastText) {
            showToast(classname || 'clipboard', toastText);
        }
        return success;
    });
}

// nb: can overflow..
Object.defineProperty(window, 'mIncID', {value: 0, writable: true});

function mCreateElement(aNode, aAttrs, aChildNodes, aTarget) {
    "use strict";

    aNode = document.createElement(aNode);
    if (!aNode) {
        return null;
    }

    if (aAttrs) {
        for (var attr in aAttrs) {
            if (aAttrs[attr] !== null) {
                aNode.setAttribute(attr, aAttrs[attr]);
            }
        }
    }

    if (!Array.isArray(aChildNodes)) {
        aTarget = aChildNodes;
        aChildNodes = null;
    }

    if (aChildNodes) {
        for (var cn in aChildNodes) {
            if (aChildNodes[cn]) {
                aNode.appendChild(aChildNodes[cn]);
            }
        }
    }

    if (aTarget) {
        if (typeof aTarget === 'string') {
            aTarget = document[aTarget] || document.getElementsByTagName(aTarget)[0];
        }
        if (aTarget) {
            aTarget.appendChild(aNode);
        }
        else if (d) {
            console.error('Invalid target', aNode, aAttrs, aTarget);
        }
    }

    return aNode;
}

function redirectToMega(url) {
    'use strict';

    chrome.tabs.create({
        url: url
    });
}

function appendSpan(fragment, text, className) {
    "use strict";

    const span = document.createElement('span');
    span.className = className;
    span.textContent = text;
    fragment.appendChild(span);
}

function getCharacterType(char) {
    "use strict";

    if (/[A-Za-z]/.test(char)) {
        return "letter";
    }
    if (/\d/.test(char)) {
        return "number";
    }
    return "special";
}

Object.defineProperty(mega, 'flags', {
    get: function() {
        'use strict';
        return typeof u_attr === 'object' && u_attr.flags || this.apiMiscFlags || false;
    }
});

mega.loadReport = {};

// fire an event log
function eventlog(id, msg, once) {
    'use strict';

    if ((id = parseInt(id)) >= 590000) {
        const req = {a: 'log', e: id};
        const {jid} = mega.flags;

        if (msg === true) {
            once = true;
            msg = 0;
        }

        if (jid) {
            req.v = mega.viewID;
            req.j = localStorage.jid || jid;
            req.ms = Date.now();
        }

        if (msg) {
            req.m = String(msg).replace(/[\t\n\v\f\r\u200E\u200F\u202E]+/g, ' ');

            if (req.m.length > 666) {
                if (d) {
                    console.error('The message provided for %s is too large...', id, [req.m]);
                }
                delete req.m;
            }
        }

        if (!once || !eventlog.sent[id]) {
            eventlog.sent[id] = 1;

            if (typeof api === 'undefined') {
                // popup error handling
                chrome.runtime.sendMessage({type: 'event-log', req});
            }
            else {
                return api.req(req).catch((ex) => dump(id, ex));
            }
        }
    }
    else {
        console.error('Invalid event log.', id, msg);
    }
}

eventlog.sent = Object.create(null);

/**
 * Instantiates an enum-like list on the provided target object
 * NB: Copy of makeEnum function from conv.js to load in popup
 */
function makeEnum(aEnum, aPrefix, aTarget, aNorm) {
    'use strict';

    aTarget = aTarget || {};

    var len = aEnum.length;
    while (len--) {
        Object.defineProperty(aTarget,
            (aPrefix || '') + String(aEnum[len]).toUpperCase(), {
                value: aNorm ? len : (1 << len),
                enumerable: true
            });
    }
    return aTarget;
}

/**
 * Generate a DocumentFragment containing the string provided cut into span
 * @param {string} password - Password to colorize
 * @returns {DocumentFragment} - DocumentFragment containing the password
 */
function colorizedPassword(password) {
    "use strict";

    const fragment = document.createDocumentFragment();

    let segment = "";
    let currentType = "";

    for (const char of password) {
        const type = getCharacterType(char);

        if (currentType && currentType === type) {
            segment += char;
        }
        else {
            if (segment) {
                appendSpan(fragment, segment, currentType);
            }
            segment = char;
            currentType = type;
        }
    }

    if (segment) {
        appendSpan(fragment, segment, currentType);
    }
    return fragment;
}

var exTimeLeft = (buildVersion.timestamp + 15 * 86400) * 1000 > Date.now();
window.buildOlderThan10Days = !exTimeLeft;

if (!String.trim) {
    String.trim = function(s) {
        'use strict';
        return String(s).trim();
    };
}

if (exTimeLeft && is_livesite) {

    window.onerror = (msg, url, ln, cn, errobj) => {
        'use strict';

        const version = buildVersion.pwmChrome;

        if (extPath && !String(url).includes(extPath)) {
            return false;
        }

        url = String(url).replace(extPath, '..');

        if (typeof eventlog === 'function' && /\w/.test(msg || '')) {
            eventlog(590000, JSON.stringify([version, ln, msg, url]), true);
        }

        return false;
    };
}

function validateUserStatus(isFromSW) {
    'use strict';

    if (typeof u_attr === 'object' && ((u_attr.b && u_attr.b.s === -1) || (u_attr.pf && u_attr.pf.s === -1))) {

        // userstatus validation is triggered by account active subscription check method on login or starting SW.
        // let expired Business or PF users to login asusual as they will have read-only access to the passwords
        if (isFromSW) {
            return false;
        }

        const isMaster = u_attr.b && u_attr.b.m || u_attr.pf;
        const opts = {
            actions: [{
                type: 'normal',
                text: l[20403],
                href: 'https://mega.nz/repay',
                target: '_blank'
            }]
        };

        if (isMaster) {
            if (u_attr.pf) {
                opts.title = l.pro_flexi_account_suspended_title;
                opts.contents = [parseHTML(l.flexi_suspended_desc)];
            }
            else {
                opts.title = l[20401];
                opts.contents = [parseHTML(l[20402])];
            }
        }
        else {
            opts.title = l[20464];
            opts.contents = `${l[20462]} ${l[20463]}`;
            opts.actions = [{
                type: 'normal',
                text: l[81],
                onClick: () => {
                    mega.ui.dialog.hide();
                }
            }];
        }

        mega.ui.dialog.show({
            ...opts,
            name: 'subscription-account-expired',
            icon: 'sprite-pm-ext-mono icon-alert-triangle-thin-outline warning',
            showClose: true
        });
        return false;
    }

    return true;
}
