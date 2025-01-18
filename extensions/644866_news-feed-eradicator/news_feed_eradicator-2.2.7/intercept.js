(function (exports) {
	'use strict';

	var instagramCss = "/* Instagram feed, stories, recommended accounts */\nhtml:not([data-nfe-enabled='false']) main > :not(#nfe-container) {\n\tdisplay: none;\n}\n\nhtml:not([data-nfe-enabled='false']) main > #nfe-container {\n\twidth: 100%;\n\tfont-size: 24px;\n\tpadding: 128px;\n}\n";

	var twitterCss = "/* Twitter */\nhtml:not([data-nfe-enabled='false'])\n\tdiv[data-testid='primaryColumn']\n\t> div:last-child\n\t> div:nth-child(4)\n\t> #nfe-container {\n\tpadding: 16px;\n}\n\nhtml:not([data-nfe-enabled='false']) div[aria-label*='Timeline'],\nhtml:not([data-nfe-enabled='false']) div[data-testid=\"primaryColumn\"] > div:last-child > div:last-child\n{\n\topacity: 0 !important;\n\tpointer-events: none !important;\n}\n\n/* \"What's Happening\" section on Twitter */\n[data-testid='sidebarColumn'] [role='region'] {\n\topacity: 0 !important;\n\tpointer-events: none !important;\n\theight: 0 !important;\n}\n";

	var githubCss = "/* GitHub Home (feed, footer links, change log ,explore repo) */\n\nhtml:not([data-nfe-enabled='false'])\n\taside[aria-label='Account']\n\t+ div\n\tdiv[role='contentinfo'],\nhtml:not([data-nfe-enabled='false'])\n\taside[aria-label='Account']\n\t+ div\n\taside[aria-label='Explore'] {\n\topacity: 0 !important;\n\tpointer-events: none !important;\n\theight: 0 !important;\n\toverflow-y: hidden !important;\n}\n\nhtml:not([data-nfe-enabled='false'])\n\taside[aria-label='Account']\n\t+ div\n\t#dashboard-feed-frame\n\t> :not(#nfe-container) {\n\tdisplay: none;\n\t/* fix Chrome not overflow:hidden with way above*/\n}\n\n/* addtional: stretch quote full width */\nhtml:not([data-nfe-enabled='false'])\n\taside[aria-label='Account']\n\t+ div\n\taside[aria-label='Explore'] {\n\twidth: 0 !important;\n}\n\nhtml:not([data-nfe-enabled='false'])\n\taside[aria-label='Account']\n\t+ div\n\t> [class*='d-'][class*='-flex']\n\t> :first-child {\n\twidth: 100% !important;\n}\n";

	const Sites = {
	    facebook: {
	        label: 'Facebook',
	        domain: ['facebook.com'],
	        paths: [
	            '/',
	            '/home.php',
	            '/watch',
	            '/marketplace/',
	            '/groups/feed/',
	            '/gaming/feed/',
	        ],
	        origins: [
	            'http://www.facebook.com/*',
	            'https://www.facebook.com/*',
	            'http://web.facebook.com/*',
	            'https://web.facebook.com/*',
	        ],
	    },
	    instagram: {
	        label: 'Instagram',
	        domain: ['instagram.com'],
	        paths: ['/'],
	        origins: ['http://www.instagram.com/*', 'https://www.instagram.com/*'],
	        css: instagramCss,
	    },
	    twitter: {
	        label: 'Twitter/X',
	        domain: ['twitter.com', 'x.com'],
	        paths: ['/home', '/compose/tweet'],
	        origins: [
	            'http://twitter.com/*',
	            'https://twitter.com/*',
	            'http://x.com/*',
	            'https://x.com/*',
	        ],
	        css: twitterCss,
	    },
	    youtube: {
	        label: 'YouTube',
	        domain: ['youtube.com'],
	        paths: ['/', '/feed/trending'],
	        origins: ['https://www.youtube.com/*'],
	    },
	    linkedin: {
	        label: 'LinkedIn',
	        domain: ['linkedin.com'],
	        paths: ['/', '/feed/'],
	        origins: ['http://www.linkedin.com/*', 'https://www.linkedin.com/*'],
	    },
	    reddit: {
	        label: 'Reddit',
	        domain: ['reddit.com'],
	        paths: ['/', '/r/all/', '/r/popular/']
	            .map((i) => [
	            i + '',
	            i + 'home/',
	            i + 'hot/',
	            i + 'new/',
	            i + 'top/',
	            i + 'rising/',
	        ])
	            .reduce((i, j) => i.concat(j)),
	        origins: [
	            'https://www.reddit.com/*',
	            'http://www.reddit.com/*',
	            'https://old.reddit.com/*',
	            'http://old.reddit.com/*',
	        ],
	    },
	    hackernews: {
	        label: 'Y Combinator News (HN)',
	        domain: ['news.ycombinator.com'],
	        paths: ['/', '/news'],
	        origins: ['https://news.ycombinator.com/*'],
	    },
	    github: {
	        label: 'Github',
	        domain: ['github.com'],
	        paths: ['/', '/dashboard'],
	        origins: ['https://github.com/*'],
	        css: githubCss,
	    },
	};

	/*! *****************************************************************************
	Copyright (c) Microsoft Corporation.

	Permission to use, copy, modify, and/or distribute this software for any
	purpose with or without fee is hereby granted.

	THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
	REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
	AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
	INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
	LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
	OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
	PERFORMANCE OF THIS SOFTWARE.
	***************************************************************************** */

	function __awaiter(thisArg, _arguments, P, generator) {
	    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
	        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
	        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments || [])).next());
	    });
	}

	function getBrowser() {
	    var _a;
	    if (typeof browser !== 'undefined') {
	        return browser;
	    }
	    else if (typeof chrome !== 'undefined') {
	        // Chrome uses callbacks instead of promises, so we promisify everything
	        return {
	            runtime: {
	                openOptionsPage: () => new Promise((resolve) => chrome.runtime.openOptionsPage(resolve)),
	                sendMessage: (m) => new Promise((resolve) => chrome.runtime.sendMessage(undefined, m, undefined, resolve)),
	                connect: chrome.runtime.connect.bind(chrome.runtime),
	                onConnect: chrome.runtime.onConnect,
	            },
	            browserAction: chrome.browserAction,
	            permissions: {
	                getAll: () => new Promise((resolve) => { var _a; return (_a = chrome.permissions) === null || _a === void 0 ? void 0 : _a.getAll(resolve); }),
	                request: (p) => new Promise((resolve) => { var _a; return (_a = chrome.permissions) === null || _a === void 0 ? void 0 : _a.request(p, resolve); }),
	                remove: (p) => new Promise((resolve) => { var _a; return (_a = chrome.permissions) === null || _a === void 0 ? void 0 : _a.remove(p, resolve); }),
	            },
	            tabs: {
	                insertCSS: (a, b) => new Promise((resolve) => { var _a; return (_a = chrome.tabs) === null || _a === void 0 ? void 0 : _a.insertCSS(a, b, resolve); }),
	                executeScript: (a, b) => new Promise((resolve) => { var _a; return (_a = chrome.tabs) === null || _a === void 0 ? void 0 : _a.executeScript(a, b, resolve); }),
	                onUpdated: (_a = chrome.tabs) === null || _a === void 0 ? void 0 : _a.onUpdated,
	            },
	            storage: {
	                sync: {
	                    get: (key) => new Promise((resolve) => {
	                        chrome.storage.sync.get(key, resolve);
	                    }),
	                    set: chrome.storage.sync.set.bind(chrome.storage.sync),
	                },
	            },
	        };
	    }
	    else {
	        throw new Error('Could not find WebExtension API');
	    }
	}

	var Settings;
	(function (Settings) {
	    const defaults = {
	        version: 1,
	        showQuotes: true,
	        builtinQuotesEnabled: true,
	        featureIncrement: 0,
	        hiddenBuiltinQuotes: [],
	        customQuotes: [],
	        sites: {},
	    };
	    Settings.defaultSites = () => {
	        const sites = {};
	        for (const siteId of Object.keys(Sites)) {
	            sites[siteId] = { type: SiteStateTag.CHECK_PERMISSIONS };
	        }
	        return sites;
	    };
	    let SiteStateTag;
	    (function (SiteStateTag) {
	        SiteStateTag["ENABLED"] = "enabled";
	        SiteStateTag["CHECK_PERMISSIONS"] = "check_permissions";
	        SiteStateTag["DISABLED"] = "disabled";
	        SiteStateTag["DISABLED_TEMPORARILY"] = "disabled_temporarily";
	    })(SiteStateTag = Settings.SiteStateTag || (Settings.SiteStateTag = {}));
	    function load() {
	        return __awaiter(this, void 0, void 0, function* () {
	            return getBrowser()
	                .storage.sync.get(null)
	                .then((settings) => (Object.assign(Object.assign({}, defaults), settings)));
	        });
	    }
	    Settings.load = load;
	    function save(settings) {
	        return __awaiter(this, void 0, void 0, function* () {
	            return getBrowser().storage.sync.set(Object.assign(Object.assign({}, defaults), settings));
	        });
	    }
	    Settings.save = save;
	})(Settings || (Settings = {}));

	var SiteStatusTag;
	(function (SiteStatusTag) {
	    SiteStatusTag[SiteStatusTag["ENABLED"] = 0] = "ENABLED";
	    SiteStatusTag[SiteStatusTag["NEEDS_NEW_PERMISSIONS"] = 1] = "NEEDS_NEW_PERMISSIONS";
	    SiteStatusTag[SiteStatusTag["DISABLED"] = 2] = "DISABLED";
	    SiteStatusTag[SiteStatusTag["DISABLED_TEMPORARILY"] = 3] = "DISABLED_TEMPORARILY";
	})(SiteStatusTag || (SiteStatusTag = {}));
	var Record;
	(function (Record) {
	    function map(record, mapper) {
	        const out = {};
	        for (const key of Object.keys(record)) {
	            out[key] = mapper(key, record[key]);
	        }
	        return out;
	    }
	    Record.map = map;
	})(Record || (Record = {}));
	/*
	 * Combines the explicit user settings with the granted permissions to work
	 * out whether anything needs updating
	 */
	function getSiteStatus(state) {
	    return Record.map(state.sites, (key, siteState) => {
	        if (siteState.type === Settings.SiteStateTag.DISABLED) {
	            return { type: SiteStatusTag.DISABLED };
	        }
	        // How many origins do we have permission for?
	        const site = Sites[key];
	        const { origins } = state.permissions;
	        const grantedOrigins = site.origins.filter((origin) => origins.indexOf(origin) !== -1);
	        switch (siteState.type) {
	            case Settings.SiteStateTag.ENABLED:
	                // Explicitly enabled - make sure permissions are there
	                if (grantedOrigins.length === site.origins.length) {
	                    return { type: SiteStatusTag.ENABLED };
	                }
	                return { type: SiteStatusTag.NEEDS_NEW_PERMISSIONS };
	            case Settings.SiteStateTag.CHECK_PERMISSIONS:
	                // Not explicitly set, check the permissions instead to determine if enabled
	                if (grantedOrigins.length === site.origins.length) {
	                    return { type: SiteStatusTag.ENABLED };
	                }
	                else if (grantedOrigins.length > 0) {
	                    return { type: SiteStatusTag.NEEDS_NEW_PERMISSIONS };
	                }
	                return { type: SiteStatusTag.DISABLED };
	            case Settings.SiteStateTag.DISABLED_TEMPORARILY:
	                // Disable temporarily only - make sure permissions are there
	                if (grantedOrigins.length === site.origins.length) {
	                    if (siteState.disabled_until > Date.now()) {
	                        return {
	                            type: SiteStatusTag.DISABLED_TEMPORARILY,
	                            until: siteState.disabled_until,
	                        };
	                    }
	                    else {
	                        return { type: SiteStatusTag.ENABLED };
	                    }
	                }
	                return { type: SiteStatusTag.NEEDS_NEW_PERMISSIONS };
	        }
	    });
	}

	function isEnabled(state) {
	    return enabledStatus(state).type === 'enabled';
	}
	function enabledStatus(state) {
	    const siteStatuses = getSiteStatus(state);
	    for (let siteId of Object.keys(Sites)) {
	        let site = Sites[siteId];
	        const siteStatus = siteStatuses[siteId];
	        if (site.domain.find(domain => window.location.host.includes(domain)) != null) {
	            // Always disabled if the path doesn't match
	            if (site.paths.indexOf(window.location.pathname) === -1) {
	                return { type: 'disabled' };
	            }
	            if (siteStatus.type === SiteStatusTag.DISABLED) {
	                return { type: 'disabled' };
	            }
	            else if (siteStatus.type === SiteStatusTag.DISABLED_TEMPORARILY) {
	                return { type: 'disabled-temporarily', until: siteStatus.until };
	            }
	            return { type: 'enabled' };
	        }
	    }
	    return { type: 'disabled' };
	}

	// Unforunately the browser provides no native way to observe route changes initiated
	// by the page. The `popstate` event only observes browser initiated back/forward events.
	// So, we resort to this hack: checking the document URL every n milliseconds, to see if
	// it's changed.
	// NB: I also tried monkey patching history.pushState to intercept the calls, but that
	// had no effect.
	const CHECK_INTERVAL = 1000;
	let lastPath = undefined;
	let element = document.querySelector('html');
	function setupRouteChange(store) {
	    const updateEnabledStatus = () => {
	        const settings = store.getState().settings;
	        if (settings == null) {
	            // Settings not loaded yet, we need them to check if this site is enabled
	            setTimeout(updateEnabledStatus, 100);
	            return;
	        }
	        const status = enabledStatus(settings);
	        switch (status.type) {
	            case 'enabled':
	                element.dataset.nfeEnabled = 'true';
	                // Scroll back to top when reenabled
	                setTimeout(() => window.scrollTo(0, 0), 100);
	                return;
	            case 'disabled':
	                // Delay showing the feed when switching pages, sometimes it can appear
	                // before the page has switched
	                //
	                // Removed for now as this was causing issues when loading twitter. When
	                // it's disabled then enabled immediately after, the timeout still hangs around
	                // for a second and eventually disables it.
	                // setTimeout(() => {
	                // 	element!.dataset.nfeEnabled = 'false';
	                // }, 1000);
	                element.dataset.nfeEnabled = 'false';
	                return;
	            case 'disabled-temporarily':
	                element.dataset.nfeEnabled = 'false';
	                const remainingTime = status.until - Date.now();
	                const checkAgainDelay = remainingTime > 60000 ? 60000 : remainingTime;
	                setTimeout(updateEnabledStatus, checkAgainDelay);
	        }
	    };
	    let timer = undefined;
	    const checkIfLocationChanged = () => {
	        let path = document.location.pathname;
	        if (path != lastPath) {
	            lastPath = path;
	            updateEnabledStatus();
	        }
	        if (timer != null) {
	            clearTimeout(timer);
	        }
	        timer = setTimeout(checkIfLocationChanged, CHECK_INTERVAL);
	    };
	    window.addEventListener('popstate', checkIfLocationChanged);
	    // When the store changes, we might want to check if the enabled state has changed
	    store.subscribe(() => {
	        updateEnabledStatus();
	    });
	    checkIfLocationChanged();
	}

	const removeNode = (node) => node.parentNode && node.parentNode.removeChild(node);
	const removeChildren = (node) => {
	    while (node.firstChild) {
	        node.removeChild(node.firstChild);
	    }
	};
	const remove = (elements) => {
	    if (elements.toRemove)
	        document.querySelectorAll(elements.toRemove.join(',')).forEach(removeNode);
	    if (elements.toEmpty)
	        document
	            .querySelectorAll(elements.toEmpty.join(','))
	            .forEach(removeChildren);
	};

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var vnode_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	function vnode(sel, data, children, text, elm) {
	    var key = data === undefined ? undefined : data.key;
	    return { sel: sel, data: data, children: children, text: text, elm: elm, key: key };
	}
	exports.vnode = vnode;
	exports.default = vnode;

	});

	unwrapExports(vnode_1);
	vnode_1.vnode;

	var is = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.array = Array.isArray;
	function primitive(s) {
	    return typeof s === 'string' || typeof s === 'number';
	}
	exports.primitive = primitive;

	});

	unwrapExports(is);
	is.array;
	is.primitive;

	var h_1 = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });


	function addNS(data, children, sel) {
	    data.ns = 'http://www.w3.org/2000/svg';
	    if (sel !== 'foreignObject' && children !== undefined) {
	        for (var i = 0; i < children.length; ++i) {
	            var childData = children[i].data;
	            if (childData !== undefined) {
	                addNS(childData, children[i].children, children[i].sel);
	            }
	        }
	    }
	}
	function h(sel, b, c) {
	    var data = {}, children, text, i;
	    if (c !== undefined) {
	        data = b;
	        if (is.array(c)) {
	            children = c;
	        }
	        else if (is.primitive(c)) {
	            text = c;
	        }
	        else if (c && c.sel) {
	            children = [c];
	        }
	    }
	    else if (b !== undefined) {
	        if (is.array(b)) {
	            children = b;
	        }
	        else if (is.primitive(b)) {
	            text = b;
	        }
	        else if (b && b.sel) {
	            children = [b];
	        }
	        else {
	            data = b;
	        }
	    }
	    if (children !== undefined) {
	        for (i = 0; i < children.length; ++i) {
	            if (is.primitive(children[i]))
	                children[i] = vnode_1.vnode(undefined, undefined, undefined, children[i], undefined);
	        }
	    }
	    if (sel[0] === 's' && sel[1] === 'v' && sel[2] === 'g' &&
	        (sel.length === 3 || sel[3] === '.' || sel[3] === '#')) {
	        addNS(data, children, sel);
	    }
	    return vnode_1.vnode(sel, data, children, text, undefined);
	}
	exports.h = h;
	exports.default = h;

	});

	unwrapExports(h_1);
	var h_2 = h_1.h;

	const BuiltinQuotes = [
	    {
	        id: 1,
	        text: 'I have just three things to teach: simplicity, patience, compassion. These three are your greatest treasures.',
	        source: 'Lao Tzu',
	    },
	    {
	        id: 2,
	        text: "Do today what others won't and achieve tomorrow what others can't.",
	        source: 'Jerry Rice',
	    },
	    {
	        id: 3,
	        text: 'In character, in manner, in style, in all things, the supreme excellence is simplicity.',
	        source: 'Henry Wadsworth Longfellow',
	    },
	    {
	        id: 4,
	        text: "If we don't discipline ourselves, the world will do it for us.",
	        source: 'William Feather',
	    },
	    {
	        id: 5,
	        text: 'Rule your mind or it will rule you.',
	        source: 'Horace',
	    },
	    {
	        id: 6,
	        text: 'All that we are is the result of what we have thought.',
	        source: 'Buddha',
	    },
	    {
	        id: 7,
	        text: 'Doing just a little bit during the time we have available puts you that much further ahead than if you took no action at all.',
	        source: "Pulsifer, Take Action; Don't Procrastinate",
	    },
	    {
	        id: 8,
	        text: 'Never leave that till tomorrow which you can do today.',
	        source: 'Benjamin Franklin',
	    },
	    {
	        id: 9,
	        text: "Procrastination is like a credit card: it's a lot of fun until you get the bill.",
	        source: 'Christopher Parker',
	    },
	    {
	        id: 10,
	        text: 'Someday is not a day of the week.',
	        source: 'Author Unknown',
	    },
	    {
	        id: 11,
	        text: 'Tomorrow is often the busiest day of the week.',
	        source: 'Spanish Proverb',
	    },
	    {
	        id: 12,
	        text: "I can accept failure, everyone fails at something. But I can't accept not trying.",
	        source: 'Michael Jordan',
	    },
	    {
	        id: 13,
	        text: 'There’s a myth that time is money. In fact, time is more precious than money. It’s a nonrenewable resource. Once you’ve spent it, and if you’ve spent it badly, it’s gone forever.',
	        source: 'Neil A. Fiore',
	    },
	    {
	        id: 15,
	        text: 'There is only one success--to be able to spend your life in your own way.',
	        source: 'Christopher Morley',
	    },
	    {
	        id: 16,
	        text: 'Success is the good fortune that comes from aspiration, desperation, perspiration and inspiration.',
	        source: 'Evan Esar',
	    },
	    {
	        id: 17,
	        text: 'We are still masters of our fate. We are still captains of our souls.',
	        source: 'Winston Churchill',
	    },
	    {
	        id: 18,
	        text: 'Our truest life is when we are in dreams awake.',
	        source: 'Henry David Thoreau',
	    },
	    {
	        id: 19,
	        text: 'The best way to make your dreams come true is to wake up.',
	        source: 'Paul Valery',
	    },
	    {
	        id: 20,
	        text: 'Life without endeavor is like entering a jewel mine and coming out with empty hands.',
	        source: 'Japanese Proverb',
	    },
	    {
	        id: 21,
	        text: 'Happiness does not consist in pastimes and amusements but in virtuous activities.',
	        source: 'Aristotle',
	    },
	    {
	        id: 22,
	        text: 'By constant self-discipline and self-control, you can develop greatness of character.',
	        source: 'Grenville Kleiser',
	    },
	    {
	        id: 23,
	        text: 'The difference between a successful person and others is not a lack of strength, not a lack of knowledge, but rather a lack in will.',
	        source: 'Vince Lombardi Jr.',
	    },
	    {
	        id: 24,
	        text: 'At the end of the day, let there be no excuses, no explanations, no regrets.',
	        source: 'Steve Maraboli',
	    },
	    {
	        id: 25,
	        text: 'Inaction will cause a man to sink into the slough of despond and vanish without a trace.',
	        source: 'Farley Mowat',
	    },
	    {
	        id: 26,
	        text: 'True freedom is impossible without a mind made free by discipline.',
	        source: 'Mortimer J. Adler',
	    },
	    {
	        id: 27,
	        text: 'The most powerful control we can ever attain, is to be in control of ourselves.',
	        source: 'Chris Page',
	    },
	    {
	        id: 28,
	        text: 'Idleness is only the refuge of weak minds, and the holiday of fools.',
	        source: 'Philip Dormer Stanhope',
	    },
	    {
	        id: 29,
	        text: "This is your life and it's ending one minute at a time.",
	        source: 'Tyler Durden, Fight Club',
	    },
	    {
	        id: 30,
	        text: 'You create opportunities by performing, not complaining.',
	        source: 'Muriel Siebert',
	    },
	    {
	        id: 31,
	        text: 'Great achievement is usually born of great sacrifice, and is never the result of selfishness.',
	        source: 'Napoleon Hill',
	    },
	    {
	        id: 33,
	        text: 'Even if I knew that tomorrow the world would go to pieces, I would still plant my apple tree.',
	        source: 'Martin Luther',
	    },
	    {
	        id: 34,
	        text: 'Great acts are made up of small deeds.',
	        source: 'Lao Tzu',
	    },
	    {
	        id: 35,
	        text: 'The flame that burns Twice as bright burns half as long.',
	        source: 'Lao Tzu',
	    },
	    {
	        id: 36,
	        text: 'Perfection is achieved not when there is nothing more to add, but when there is nothing left to take away.',
	        source: 'Antoine de Saint-Exupery',
	    },
	    {
	        id: 37,
	        text: "If you can't do great things, do small things in a great way.",
	        source: 'Napoleon Hill',
	    },
	    {
	        id: 38,
	        text: 'When I let go of what I am, I become what I might be.',
	        source: 'Lao Tzu',
	    },
	    {
	        id: 39,
	        text: 'Do not go where the path may lead, go instead where there is no path and leave a trail.',
	        source: 'Ralph Waldo Emerson',
	    },
	    {
	        id: 40,
	        text: 'Well done is better than well said.',
	        source: 'Benjamin Franklin',
	    },
	    {
	        id: 41,
	        text: 'Whatever you think the world is withholding from you, you are withholding from the world.',
	        source: 'Eckhart Tolle',
	    },
	    {
	        id: 42,
	        text: 'Muddy water is best cleared by leaving it alone.',
	        source: 'Alan Watts',
	    },
	    {
	        id: 43,
	        text: 'Do, or do not. There is no try.',
	        source: 'Yoda',
	    },
	    {
	        id: 44,
	        text: 'The superior man is modest in his speech, but exceeds in his actions.',
	        source: 'Confucius',
	    },
	    {
	        id: 45,
	        text: 'Optimism is the faith that leads to achievement. Nothing can be done without hope and confidence.',
	        source: 'Helen Keller',
	    },
	    {
	        id: 46,
	        text: 'We must believe that we are gifted for something, and that this thing, at whatever cost, must be attained.',
	        source: 'Marie Curie',
	    },
	    {
	        id: 47,
	        text: 'If you look at what you have in life, you’ll always have more. If you look at what you don’t have in life, you’ll never have enough.',
	        source: 'Oprah Winfrey',
	    },
	    {
	        id: 48,
	        text: 'You may encounter many defeats, but you must not be defeated. In fact, it may be necessary to encounter the defeats, so you can know who you are, what you can rise from, how you can still come out of it.',
	        source: 'Maya Angelou',
	    },
	    {
	        id: 49,
	        text: 'We need to start work with the idea that we’re going to learn every day. I learn, even at my position, every single day.',
	        source: 'Chanda Kochhar',
	    },
	    {
	        id: 50,
	        text: 'There are two kinds of people, those who do the work and those who take the credit. Try to be in the first group; there is less competition there.',
	        source: 'Indira Gandhi',
	    },
	    {
	        id: 51,
	        text: 'You can’t be that kid standing at the top of the waterslide, overthinking it. You have to go down the chute.',
	        source: 'Tina Fey',
	    },
	    {
	        id: 52,
	        text: 'Above all, be the heroine of your life, not the victim.',
	        source: 'Nora Ephron',
	    },
	    {
	        id: 53,
	        text: 'Learn from the mistakes of others. You can’t live long enough to make them all yourself.',
	        source: 'Eleanor Roosevelt',
	    },
	    {
	        id: 54,
	        text: 'What you do makes a difference, and you have to decide what kind of difference you want to make.',
	        source: 'Jane Goodall',
	    },
	    {
	        id: 55,
	        text: 'One of the secrets to staying young is to always do things you don’t know how to do, to keep learning.',
	        source: 'Ruth Reichl',
	    },
	    {
	        id: 56,
	        text: 'If you don’t risk anything, you risk even more.',
	        source: 'Erica Jong',
	    },
	    {
	        id: 57,
	        text: 'When the whole world is silent, even one voice becomes powerful.',
	        source: 'Malala Yousafzai',
	    },
	    {
	        id: 58,
	        text: 'The most common way people give up their power is by thinking they don’t have any.',
	        source: 'Alice Walker',
	    },
	    {
	        id: 59,
	        text: 'My philosophy is that not only are you responsible for your life, but doing the best at this moment puts you in the best place for the next moment.',
	        source: 'Oprah Winfrey',
	    },
	    {
	        id: 60,
	        text: 'Don’t be intimidated by what you don’t know. That can be your greatest strength and ensure that you do things differently from everyone else.',
	        source: 'Sara Blakely',
	    },
	    {
	        id: 61,
	        text: 'If I had to live my life again, I’d make the same mistakes, only sooner.',
	        source: 'Tallulah Bankhead',
	    },
	    {
	        id: 62,
	        text: 'Never limit yourself because of others’ limited imagination; never limit others because of your own limited imagination.',
	        source: 'Mae C. Jemison',
	    },
	    {
	        id: 63,
	        text: 'If you obey all the rules, you miss all the fun.',
	        source: 'Katharine Hepburn',
	    },
	    {
	        id: 64,
	        text: 'Life shrinks or expands in proportion to one’s courage.',
	        source: 'Anaïs Nin',
	    },
	    {
	        id: 65,
	        text: 'Avoiding danger is no safer in the long run than outright exposure. The fearful are caught as often as the bold.',
	        source: 'Helen Keller',
	    },
	    {
	        id: 66,
	        text: 'How wonderful it is that nobody need wait a single moment before beginning to improve the world.',
	        source: 'Anne Frank',
	    },
	    {
	        id: 67,
	        text: 'So often people are working hard at the wrong thing. Working on the right thing is probably more important than working hard.',
	        source: 'Caterina Fake',
	    },
	    {
	        id: 68,
	        text: 'There are still many causes worth sacrificing for, so much history yet to be made.',
	        source: 'Michelle Obama',
	    },
	    {
	        id: 69,
	        text: 'Nothing is impossible; the word itself says ‘I’m possible’!',
	        source: 'Audrey Hepburn',
	    },
	    {
	        id: 70,
	        text: 'You only live once, but if you do it right, once is enough.',
	        source: 'Mae West',
	    },
	    {
	        id: 71,
	        text: 'We must use time creatively, in the knowledge that the time is always ripe to do right.',
	        source: 'Martin Luther King Jr.',
	    },
	    {
	        id: 72,
	        text: 'Every birthday is a gift. Every day is a gift.',
	        source: 'Aretha Franklin',
	    },
	    {
	        id: 73,
	        text: 'The quality, not the longevity, of one’s life is what is important.',
	        source: 'Martin Luther King Jr.',
	    },
	    {
	        id: 74,
	        text: 'Good manners will often take people where neither money nor education will take them.',
	        source: 'Fanny Jackson Coppin',
	    },
	    {
	        id: 75,
	        text: 'No matter how big a nation is, it is no stronger than its weakest people, and as long as you keep a person down, some part of you has to be down there to hold him down, so it means you cannot soar as you might otherwise.',
	        source: 'Marian Anderson',
	    },
	    {
	        id: 76,
	        text: 'The minute a person whose word means a great deal to others dare to take the open-hearted and courageous way, many others follow.',
	        source: 'Marian Anderson',
	    },
	    {
	        id: 77,
	        text: 'You cannot define a person on just one thing. You can’t just forget all these wonderful and good things that a person has done because one thing didn’t come off the way you thought it should come off.',
	        source: 'Aretha Franklin',
	    },
	    {
	        id: 78,
	        text: 'If you do not have courage, you may not have the opportunity to use any of your other virtues.',
	        source: 'Samuel L. Jackson',
	    },
	    {
	        id: 79,
	        text: "Our humanity is worth a little discomfort, it's actually worth a lot of discomfort.",
	        source: 'Ijeoma Oluo',
	    },
	    {
	        id: 80,
	        text: 'Not everything that is faced can be changed, but nothing can be changed until it is faced.',
	        source: 'James Baldwin',
	    },
	    {
	        id: 81,
	        text: 'If you’re always trying to be normal you will never know how amazing you can be.',
	        source: 'Maya Angelou',
	    },
	    {
	        id: 82,
	        text: 'If you find it in your heart to care for somebody else, you will have succeeded.',
	        source: 'Maya Angelou',
	    },
	    {
	        id: 83,
	        text: 'I’ve learned that whenever I decide something with an open heart, I usually make the right decision.',
	        source: 'Maya Angelou',
	    },
	    {
	        id: 84,
	        text: 'Every man must decide whether he will walk in the light of creative altruism or in the darkness of destructive selfishness.',
	        source: 'Martin Luther King Jr.',
	    },
	    {
	        id: 85,
	        text: 'An individual has not started living until he can rise above the narrow confines of his individualistic concerns to the broader concerns of all humanity.',
	        source: 'Martin Luther King Jr.',
	    },
	    {
	        id: 86,
	        text: 'Those who are not looking for happiness are the most likely to find it, because those who are searching forget that the surest way to be happy is to seek happiness for others.',
	        source: 'Martin Luther King Jr.',
	    },
	];

	function getBuiltinQuotes(state) {
	    if (state.settings == null)
	        return [];
	    if (!state.settings.builtinQuotesEnabled)
	        return [];
	    return BuiltinQuotes.filter((quote) => typeof quote.id !== 'number' ||
	        state.settings.hiddenBuiltinQuotes.indexOf(quote.id) === -1);
	}
	function getAvailableQuotes(state) {
	    if (state.settings == null) {
	        return [];
	    }
	    const builtinQuotes = getBuiltinQuotes(state).map((q) => ({
	        type: 'builtin',
	        id: q.id,
	    }));
	    const customQuotes = state.settings.customQuotes.map((q) => ({
	        type: 'custom',
	        id: q.id,
	    }));
	    return builtinQuotes.concat(customQuotes);
	}
	function currentQuote$1(state) {
	    if (state.settings == null)
	        return undefined;
	    if (state.currentQuote == null)
	        return undefined;
	    if (state.currentQuote.type === 'none-found')
	        return undefined;
	    if (state.currentQuote.type === 'custom') {
	        const currentId = state.currentQuote.id;
	        return state.settings.customQuotes.find((quote) => quote.id === currentId);
	    }
	    else {
	        const currentId = state.currentQuote.id;
	        if (!state.settings.builtinQuotesEnabled ||
	            state.settings.hiddenBuiltinQuotes.indexOf(currentId) >= 0) {
	            // Current quote has been hidden
	            return undefined;
	        }
	        return BuiltinQuotes.find((quote) => quote.id === currentId);
	    }
	}

	var ActionType;
	(function (ActionType) {
	    ActionType["SELECT_NEW_QUOTE"] = "SELECT_NEW_QUOTE";
	    ActionType["QUOTE_ADD_BULK"] = "QUOTE_ADD_BULK";
	    ActionType["QUOTE_EDIT"] = "QUOTE_EDIT";
	    ActionType["QUOTE_CURRENT_SET"] = "QUOTE_CURRENT_SET";
	    ActionType["QUOTE_SAVE_CLICKED"] = "QUOTE_SAVE_CLICKED";
	    ActionType["QUOTE_REMOVE_CURRENT"] = "QUOTE_REMOVE_CURRENT";
	    ActionType["QUOTE_MENU_SHOW"] = "QUOTE_MENU_SHOW";
	    ActionType["RESET_HIDDEN_QUOTES"] = "RESET_HIDDEN_QUOTES";
	    ActionType["BACKGROUND_ACTION"] = "BACKGROUND_ACTION";
	    ActionType["BACKGROUND_SETTINGS_CHANGED"] = "BACKGROUND_SETTINGS_CHANGED";
	    ActionType["PARSE_ERROR"] = "PARSE_ERROR";
	    ActionType["UI_OPTIONS_SHOW"] = "ui/options/show";
	    ActionType["UI_OPTIONS_TAB_SHOW"] = "ui/options/tab/show";
	    ActionType["UI_OPTIONS_QUOTE_TAB_SHOW"] = "ui/options/quote/tab/show";
	    ActionType["UI_SITES_SITE_CLICK"] = "sites/site/click";
	    /**
	     * Show the confirmation for disabling News Feed Eradicator for a site
	     */
	    ActionType["UI_SITES_SITE_DISABLE_CONFIRM_SHOW"] = "sites/site/disable/confirm/show";
	    /**
	     * User confirmed site being disabled
	     */
	    ActionType["UI_SITES_SITE_DISABLE_CONFIRMED"] = "sites/site/disable/confirmed";
	})(ActionType || (ActionType = {}));

	var BackgroundActionType;
	(function (BackgroundActionType) {
	    BackgroundActionType["QUOTES_SHOW_TOGGLE"] = "QUOTES_SHOW_TOGGLE";
	    BackgroundActionType["QUOTES_BUILTIN_TOGGLE"] = "QUOTES_BUILTIN_TOGGLE";
	    BackgroundActionType["QUOTE_HIDE"] = "QUOTE_HIDE";
	    BackgroundActionType["QUOTE_SHOW"] = "QUOTE_SHOW";
	    BackgroundActionType["QUOTE_HIDDEN_RESET"] = "QUOTE_HIDDEN_RESET";
	    BackgroundActionType["QUOTE_DELETE"] = "QUOTE_DELETE";
	    BackgroundActionType["QUOTE_ADD"] = "QUOTE_ADD";
	    BackgroundActionType["FEATURE_INCREMENT"] = "FEATURE_INCREMENT";
	    BackgroundActionType["SETTINGS_LOAD"] = "SETTINGS_LOAD";
	    BackgroundActionType["SETTINGS_LOADED"] = "SETTINGS_LOADED";
	    BackgroundActionType["PERMISSIONS_CHECK"] = "permissions/check";
	    BackgroundActionType["PERMISSIONS_UPDATE"] = "permissions/update";
	    BackgroundActionType["SITES_SET_STATE"] = "sites/set_state";
	})(BackgroundActionType || (BackgroundActionType = {}));

	function addQuote(id, text, source) {
	    return {
	        type: ActionType.BACKGROUND_ACTION,
	        action: {
	            type: BackgroundActionType.QUOTE_ADD,
	            id,
	            text,
	            source,
	        },
	    };
	}
	function removeCurrentQuote() {
	    return { type: ActionType.QUOTE_REMOVE_CURRENT };
	}
	function selectNewQuote$1() {
	    return { type: ActionType.SELECT_NEW_QUOTE };
	}
	function cancelEditing() {
	    return {
	        type: ActionType.QUOTE_EDIT,
	        action: { type: 'CANCEL' },
	    };
	}
	const menuHide = () => ({
	    type: ActionType.QUOTE_MENU_SHOW,
	    show: 'HIDE',
	});
	const menuToggle = () => ({
	    type: ActionType.QUOTE_MENU_SHOW,
	    show: 'TOGGLE',
	});
	const showOptions = () => ({
	    type: ActionType.UI_OPTIONS_SHOW,
	});
	const setSiteState = (siteId, state) => ({
	    type: ActionType.BACKGROUND_ACTION,
	    action: {
	        type: BackgroundActionType.SITES_SET_STATE,
	        siteId,
	        state,
	    },
	});

	const MenuItem = (store, action, children) => {
	    const onClick = (e) => {
	        e.preventDefault();
	        store.dispatch(menuHide());
	        store.dispatch(action);
	    };
	    return h_2('li.margin-0.pad-0', [
	        h_2('a.nfe-quote-action-menu-item.underline-off', { props: { href: '#' }, on: { click: onClick } }, children),
	    ]);
	};
	const QuoteMenu = (store) => {
	    return h_2('div.nfe-quote-action-menu-content', [
	        h_2('ul.margin-0.pad-0.list-unstyled', [
	            MenuItem(store, removeCurrentQuote(), 'Remove this quote'),
	            MenuItem(store, selectNewQuote$1(), 'See another quote'),
	            MenuItem(store, showOptions(), 'Settings...'),
	        ]),
	    ]);
	};
	const QuoteDisplay = (store) => {
	    const state = store.getState();
	    const quote = currentQuote$1(state);
	    if (quote == null)
	        return null;
	    const toggleMenu = (e) => {
	        e.preventDefault();
	        store.dispatch(menuToggle());
	    };
	    return h_2('div.nfe-quote', [
	        h_2('nfe-quote-action-menu', [
	            h_2('a.nfe-quote-action-menu-button', { props: { href: '#' }, on: { click: toggleMenu } }, '▾'),
	            state.isQuoteMenuVisible ? QuoteMenu(store) : null,
	        ]),
	        h_2('div', [
	            h_2('p.nfe-quote-text', [
	                h_2('span', '“'),
	                h_2('span', quote.text),
	                h_2('span', '”'),
	            ]),
	            h_2('p.nfe-quote-source', [h_2('span', '~ '), h_2('span', quote.source)]),
	        ]),
	    ]);
	};

	const NewsFeedEradicator = (store) => {
	    var _a;
	    const state = store.getState();
	    // TODO: Add quotes component
	    const quoteDisplay = ((_a = state.settings) === null || _a === void 0 ? void 0 : _a.showQuotes) ? QuoteDisplay(store) : null;
	    const footerText = 'News Feed Eradicator';
	    const onShowInfoPanel = () => {
	        store.dispatch({ type: ActionType.UI_OPTIONS_SHOW });
	    };
	    const link = h_2('a.nfe-info-link', { on: { click: onShowInfoPanel } }, [
	        h_2('span', footerText),
	    ]);
	    // Entire app component
	    return h_2('div', [quoteDisplay, link]);
	};

	function vnode(sel, data, children, text, elm) {
	    var key = data === undefined ? undefined : data.key;
	    return { sel: sel, data: data, children: children, text: text, elm: elm, key: key };
	}

	var array = Array.isArray;
	function primitive(s) {
	    return typeof s === 'string' || typeof s === 'number';
	}

	function createElement(tagName) {
	    return document.createElement(tagName);
	}
	function createElementNS(namespaceURI, qualifiedName) {
	    return document.createElementNS(namespaceURI, qualifiedName);
	}
	function createTextNode(text) {
	    return document.createTextNode(text);
	}
	function createComment(text) {
	    return document.createComment(text);
	}
	function insertBefore(parentNode, newNode, referenceNode) {
	    parentNode.insertBefore(newNode, referenceNode);
	}
	function removeChild(node, child) {
	    node.removeChild(child);
	}
	function appendChild(node, child) {
	    node.appendChild(child);
	}
	function parentNode(node) {
	    return node.parentNode;
	}
	function nextSibling(node) {
	    return node.nextSibling;
	}
	function tagName(elm) {
	    return elm.tagName;
	}
	function setTextContent(node, text) {
	    node.textContent = text;
	}
	function getTextContent(node) {
	    return node.textContent;
	}
	function isElement(node) {
	    return node.nodeType === 1;
	}
	function isText(node) {
	    return node.nodeType === 3;
	}
	function isComment(node) {
	    return node.nodeType === 8;
	}
	var htmlDomApi = {
	    createElement: createElement,
	    createElementNS: createElementNS,
	    createTextNode: createTextNode,
	    createComment: createComment,
	    insertBefore: insertBefore,
	    removeChild: removeChild,
	    appendChild: appendChild,
	    parentNode: parentNode,
	    nextSibling: nextSibling,
	    tagName: tagName,
	    setTextContent: setTextContent,
	    getTextContent: getTextContent,
	    isElement: isElement,
	    isText: isText,
	    isComment: isComment,
	};

	function isUndef(s) { return s === undefined; }
	function isDef(s) { return s !== undefined; }
	var emptyNode = vnode('', {}, [], undefined, undefined);
	function sameVnode(vnode1, vnode2) {
	    return vnode1.key === vnode2.key && vnode1.sel === vnode2.sel;
	}
	function isVnode(vnode) {
	    return vnode.sel !== undefined;
	}
	function createKeyToOldIdx(children, beginIdx, endIdx) {
	    var i, map = {}, key, ch;
	    for (i = beginIdx; i <= endIdx; ++i) {
	        ch = children[i];
	        if (ch != null) {
	            key = ch.key;
	            if (key !== undefined)
	                map[key] = i;
	        }
	    }
	    return map;
	}
	var hooks = ['create', 'update', 'remove', 'destroy', 'pre', 'post'];
	function init(modules, domApi) {
	    var i, j, cbs = {};
	    var api = domApi !== undefined ? domApi : htmlDomApi;
	    for (i = 0; i < hooks.length; ++i) {
	        cbs[hooks[i]] = [];
	        for (j = 0; j < modules.length; ++j) {
	            var hook = modules[j][hooks[i]];
	            if (hook !== undefined) {
	                cbs[hooks[i]].push(hook);
	            }
	        }
	    }
	    function emptyNodeAt(elm) {
	        var id = elm.id ? '#' + elm.id : '';
	        var c = elm.className ? '.' + elm.className.split(' ').join('.') : '';
	        return vnode(api.tagName(elm).toLowerCase() + id + c, {}, [], undefined, elm);
	    }
	    function createRmCb(childElm, listeners) {
	        return function rmCb() {
	            if (--listeners === 0) {
	                var parent_1 = api.parentNode(childElm);
	                api.removeChild(parent_1, childElm);
	            }
	        };
	    }
	    function createElm(vnode, insertedVnodeQueue) {
	        var i, data = vnode.data;
	        if (data !== undefined) {
	            if (isDef(i = data.hook) && isDef(i = i.init)) {
	                i(vnode);
	                data = vnode.data;
	            }
	        }
	        var children = vnode.children, sel = vnode.sel;
	        if (sel === '!') {
	            if (isUndef(vnode.text)) {
	                vnode.text = '';
	            }
	            vnode.elm = api.createComment(vnode.text);
	        }
	        else if (sel !== undefined) {
	            // Parse selector
	            var hashIdx = sel.indexOf('#');
	            var dotIdx = sel.indexOf('.', hashIdx);
	            var hash = hashIdx > 0 ? hashIdx : sel.length;
	            var dot = dotIdx > 0 ? dotIdx : sel.length;
	            var tag = hashIdx !== -1 || dotIdx !== -1 ? sel.slice(0, Math.min(hash, dot)) : sel;
	            var elm = vnode.elm = isDef(data) && isDef(i = data.ns) ? api.createElementNS(i, tag)
	                : api.createElement(tag);
	            if (hash < dot)
	                elm.setAttribute('id', sel.slice(hash + 1, dot));
	            if (dotIdx > 0)
	                elm.setAttribute('class', sel.slice(dot + 1).replace(/\./g, ' '));
	            for (i = 0; i < cbs.create.length; ++i)
	                cbs.create[i](emptyNode, vnode);
	            if (array(children)) {
	                for (i = 0; i < children.length; ++i) {
	                    var ch = children[i];
	                    if (ch != null) {
	                        api.appendChild(elm, createElm(ch, insertedVnodeQueue));
	                    }
	                }
	            }
	            else if (primitive(vnode.text)) {
	                api.appendChild(elm, api.createTextNode(vnode.text));
	            }
	            i = vnode.data.hook; // Reuse variable
	            if (isDef(i)) {
	                if (i.create)
	                    i.create(emptyNode, vnode);
	                if (i.insert)
	                    insertedVnodeQueue.push(vnode);
	            }
	        }
	        else {
	            vnode.elm = api.createTextNode(vnode.text);
	        }
	        return vnode.elm;
	    }
	    function addVnodes(parentElm, before, vnodes, startIdx, endIdx, insertedVnodeQueue) {
	        for (; startIdx <= endIdx; ++startIdx) {
	            var ch = vnodes[startIdx];
	            if (ch != null) {
	                api.insertBefore(parentElm, createElm(ch, insertedVnodeQueue), before);
	            }
	        }
	    }
	    function invokeDestroyHook(vnode) {
	        var i, j, data = vnode.data;
	        if (data !== undefined) {
	            if (isDef(i = data.hook) && isDef(i = i.destroy))
	                i(vnode);
	            for (i = 0; i < cbs.destroy.length; ++i)
	                cbs.destroy[i](vnode);
	            if (vnode.children !== undefined) {
	                for (j = 0; j < vnode.children.length; ++j) {
	                    i = vnode.children[j];
	                    if (i != null && typeof i !== "string") {
	                        invokeDestroyHook(i);
	                    }
	                }
	            }
	        }
	    }
	    function removeVnodes(parentElm, vnodes, startIdx, endIdx) {
	        for (; startIdx <= endIdx; ++startIdx) {
	            var i_1 = void 0, listeners = void 0, rm = void 0, ch = vnodes[startIdx];
	            if (ch != null) {
	                if (isDef(ch.sel)) {
	                    invokeDestroyHook(ch);
	                    listeners = cbs.remove.length + 1;
	                    rm = createRmCb(ch.elm, listeners);
	                    for (i_1 = 0; i_1 < cbs.remove.length; ++i_1)
	                        cbs.remove[i_1](ch, rm);
	                    if (isDef(i_1 = ch.data) && isDef(i_1 = i_1.hook) && isDef(i_1 = i_1.remove)) {
	                        i_1(ch, rm);
	                    }
	                    else {
	                        rm();
	                    }
	                }
	                else { // Text node
	                    api.removeChild(parentElm, ch.elm);
	                }
	            }
	        }
	    }
	    function updateChildren(parentElm, oldCh, newCh, insertedVnodeQueue) {
	        var oldStartIdx = 0, newStartIdx = 0;
	        var oldEndIdx = oldCh.length - 1;
	        var oldStartVnode = oldCh[0];
	        var oldEndVnode = oldCh[oldEndIdx];
	        var newEndIdx = newCh.length - 1;
	        var newStartVnode = newCh[0];
	        var newEndVnode = newCh[newEndIdx];
	        var oldKeyToIdx;
	        var idxInOld;
	        var elmToMove;
	        var before;
	        while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
	            if (oldStartVnode == null) {
	                oldStartVnode = oldCh[++oldStartIdx]; // Vnode might have been moved left
	            }
	            else if (oldEndVnode == null) {
	                oldEndVnode = oldCh[--oldEndIdx];
	            }
	            else if (newStartVnode == null) {
	                newStartVnode = newCh[++newStartIdx];
	            }
	            else if (newEndVnode == null) {
	                newEndVnode = newCh[--newEndIdx];
	            }
	            else if (sameVnode(oldStartVnode, newStartVnode)) {
	                patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
	                oldStartVnode = oldCh[++oldStartIdx];
	                newStartVnode = newCh[++newStartIdx];
	            }
	            else if (sameVnode(oldEndVnode, newEndVnode)) {
	                patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
	                oldEndVnode = oldCh[--oldEndIdx];
	                newEndVnode = newCh[--newEndIdx];
	            }
	            else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
	                patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
	                api.insertBefore(parentElm, oldStartVnode.elm, api.nextSibling(oldEndVnode.elm));
	                oldStartVnode = oldCh[++oldStartIdx];
	                newEndVnode = newCh[--newEndIdx];
	            }
	            else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
	                patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
	                api.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
	                oldEndVnode = oldCh[--oldEndIdx];
	                newStartVnode = newCh[++newStartIdx];
	            }
	            else {
	                if (oldKeyToIdx === undefined) {
	                    oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx);
	                }
	                idxInOld = oldKeyToIdx[newStartVnode.key];
	                if (isUndef(idxInOld)) { // New element
	                    api.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm);
	                    newStartVnode = newCh[++newStartIdx];
	                }
	                else {
	                    elmToMove = oldCh[idxInOld];
	                    if (elmToMove.sel !== newStartVnode.sel) {
	                        api.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm);
	                    }
	                    else {
	                        patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
	                        oldCh[idxInOld] = undefined;
	                        api.insertBefore(parentElm, elmToMove.elm, oldStartVnode.elm);
	                    }
	                    newStartVnode = newCh[++newStartIdx];
	                }
	            }
	        }
	        if (oldStartIdx <= oldEndIdx || newStartIdx <= newEndIdx) {
	            if (oldStartIdx > oldEndIdx) {
	                before = newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].elm;
	                addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
	            }
	            else {
	                removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
	            }
	        }
	    }
	    function patchVnode(oldVnode, vnode, insertedVnodeQueue) {
	        var i, hook;
	        if (isDef(i = vnode.data) && isDef(hook = i.hook) && isDef(i = hook.prepatch)) {
	            i(oldVnode, vnode);
	        }
	        var elm = vnode.elm = oldVnode.elm;
	        var oldCh = oldVnode.children;
	        var ch = vnode.children;
	        if (oldVnode === vnode)
	            return;
	        if (vnode.data !== undefined) {
	            for (i = 0; i < cbs.update.length; ++i)
	                cbs.update[i](oldVnode, vnode);
	            i = vnode.data.hook;
	            if (isDef(i) && isDef(i = i.update))
	                i(oldVnode, vnode);
	        }
	        if (isUndef(vnode.text)) {
	            if (isDef(oldCh) && isDef(ch)) {
	                if (oldCh !== ch)
	                    updateChildren(elm, oldCh, ch, insertedVnodeQueue);
	            }
	            else if (isDef(ch)) {
	                if (isDef(oldVnode.text))
	                    api.setTextContent(elm, '');
	                addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
	            }
	            else if (isDef(oldCh)) {
	                removeVnodes(elm, oldCh, 0, oldCh.length - 1);
	            }
	            else if (isDef(oldVnode.text)) {
	                api.setTextContent(elm, '');
	            }
	        }
	        else if (oldVnode.text !== vnode.text) {
	            if (isDef(oldCh)) {
	                removeVnodes(elm, oldCh, 0, oldCh.length - 1);
	            }
	            api.setTextContent(elm, vnode.text);
	        }
	        if (isDef(hook) && isDef(i = hook.postpatch)) {
	            i(oldVnode, vnode);
	        }
	    }
	    return function patch(oldVnode, vnode) {
	        var i, elm, parent;
	        var insertedVnodeQueue = [];
	        for (i = 0; i < cbs.pre.length; ++i)
	            cbs.pre[i]();
	        if (!isVnode(oldVnode)) {
	            oldVnode = emptyNodeAt(oldVnode);
	        }
	        if (sameVnode(oldVnode, vnode)) {
	            patchVnode(oldVnode, vnode, insertedVnodeQueue);
	        }
	        else {
	            elm = oldVnode.elm;
	            parent = api.parentNode(elm);
	            createElm(vnode, insertedVnodeQueue);
	            if (parent !== null) {
	                api.insertBefore(parent, vnode.elm, api.nextSibling(elm));
	                removeVnodes(parent, [oldVnode], 0, 0);
	            }
	        }
	        for (i = 0; i < insertedVnodeQueue.length; ++i) {
	            insertedVnodeQueue[i].data.hook.insert(insertedVnodeQueue[i]);
	        }
	        for (i = 0; i < cbs.post.length; ++i)
	            cbs.post[i]();
	        return vnode;
	    };
	}

	var props = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	function updateProps(oldVnode, vnode) {
	    var key, cur, old, elm = vnode.elm, oldProps = oldVnode.data.props, props = vnode.data.props;
	    if (!oldProps && !props)
	        return;
	    if (oldProps === props)
	        return;
	    oldProps = oldProps || {};
	    props = props || {};
	    for (key in oldProps) {
	        if (!props[key]) {
	            delete elm[key];
	        }
	    }
	    for (key in props) {
	        cur = props[key];
	        old = oldProps[key];
	        if (old !== cur && (key !== 'value' || elm[key] !== cur)) {
	            elm[key] = cur;
	        }
	    }
	}
	exports.propsModule = { create: updateProps, update: updateProps };
	exports.default = exports.propsModule;

	});

	var propsModule = unwrapExports(props);
	props.propsModule;

	var attributes = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	var xlinkNS = 'http://www.w3.org/1999/xlink';
	var xmlNS = 'http://www.w3.org/XML/1998/namespace';
	var colonChar = 58;
	var xChar = 120;
	function updateAttrs(oldVnode, vnode) {
	    var key, elm = vnode.elm, oldAttrs = oldVnode.data.attrs, attrs = vnode.data.attrs;
	    if (!oldAttrs && !attrs)
	        return;
	    if (oldAttrs === attrs)
	        return;
	    oldAttrs = oldAttrs || {};
	    attrs = attrs || {};
	    // update modified attributes, add new attributes
	    for (key in attrs) {
	        var cur = attrs[key];
	        var old = oldAttrs[key];
	        if (old !== cur) {
	            if (cur === true) {
	                elm.setAttribute(key, "");
	            }
	            else if (cur === false) {
	                elm.removeAttribute(key);
	            }
	            else {
	                if (key.charCodeAt(0) !== xChar) {
	                    elm.setAttribute(key, cur);
	                }
	                else if (key.charCodeAt(3) === colonChar) {
	                    // Assume xml namespace
	                    elm.setAttributeNS(xmlNS, key, cur);
	                }
	                else if (key.charCodeAt(5) === colonChar) {
	                    // Assume xlink namespace
	                    elm.setAttributeNS(xlinkNS, key, cur);
	                }
	                else {
	                    elm.setAttribute(key, cur);
	                }
	            }
	        }
	    }
	    // remove removed attributes
	    // use `in` operator since the previous `for` iteration uses it (.i.e. add even attributes with undefined value)
	    // the other option is to remove all attributes with value == undefined
	    for (key in oldAttrs) {
	        if (!(key in attrs)) {
	            elm.removeAttribute(key);
	        }
	    }
	}
	exports.attributesModule = { create: updateAttrs, update: updateAttrs };
	exports.default = exports.attributesModule;

	});

	var attrsModule = unwrapExports(attributes);
	attributes.attributesModule;

	var eventlisteners = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	function invokeHandler(handler, vnode, event) {
	    if (typeof handler === "function") {
	        // call function handler
	        handler.call(vnode, event, vnode);
	    }
	    else if (typeof handler === "object") {
	        // call handler with arguments
	        if (typeof handler[0] === "function") {
	            // special case for single argument for performance
	            if (handler.length === 2) {
	                handler[0].call(vnode, handler[1], event, vnode);
	            }
	            else {
	                var args = handler.slice(1);
	                args.push(event);
	                args.push(vnode);
	                handler[0].apply(vnode, args);
	            }
	        }
	        else {
	            // call multiple handlers
	            for (var i = 0; i < handler.length; i++) {
	                invokeHandler(handler[i], vnode, event);
	            }
	        }
	    }
	}
	function handleEvent(event, vnode) {
	    var name = event.type, on = vnode.data.on;
	    // call event handler(s) if exists
	    if (on && on[name]) {
	        invokeHandler(on[name], vnode, event);
	    }
	}
	function createListener() {
	    return function handler(event) {
	        handleEvent(event, handler.vnode);
	    };
	}
	function updateEventListeners(oldVnode, vnode) {
	    var oldOn = oldVnode.data.on, oldListener = oldVnode.listener, oldElm = oldVnode.elm, on = vnode && vnode.data.on, elm = (vnode && vnode.elm), name;
	    // optimization for reused immutable handlers
	    if (oldOn === on) {
	        return;
	    }
	    // remove existing listeners which no longer used
	    if (oldOn && oldListener) {
	        // if element changed or deleted we remove all existing listeners unconditionally
	        if (!on) {
	            for (name in oldOn) {
	                // remove listener if element was changed or existing listeners removed
	                oldElm.removeEventListener(name, oldListener, false);
	            }
	        }
	        else {
	            for (name in oldOn) {
	                // remove listener if existing listener removed
	                if (!on[name]) {
	                    oldElm.removeEventListener(name, oldListener, false);
	                }
	            }
	        }
	    }
	    // add new listeners which has not already attached
	    if (on) {
	        // reuse existing listener or create new
	        var listener = vnode.listener = oldVnode.listener || createListener();
	        // update vnode for listener
	        listener.vnode = vnode;
	        // if element changed or added we add all needed listeners unconditionally
	        if (!oldOn) {
	            for (name in on) {
	                // add listener if element was changed or new listeners added
	                elm.addEventListener(name, listener, false);
	            }
	        }
	        else {
	            for (name in on) {
	                // add listener if new listener added
	                if (!oldOn[name]) {
	                    elm.addEventListener(name, listener, false);
	                }
	            }
	        }
	    }
	}
	exports.eventListenersModule = {
	    create: updateEventListeners,
	    update: updateEventListeners,
	    destroy: updateEventListeners
	};
	exports.default = exports.eventListenersModule;

	});

	var eventsModule = unwrapExports(eventlisteners);
	eventlisteners.eventListenersModule;

	var htmldomapi = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	function createElement(tagName) {
	    return document.createElement(tagName);
	}
	function createElementNS(namespaceURI, qualifiedName) {
	    return document.createElementNS(namespaceURI, qualifiedName);
	}
	function createTextNode(text) {
	    return document.createTextNode(text);
	}
	function createComment(text) {
	    return document.createComment(text);
	}
	function insertBefore(parentNode, newNode, referenceNode) {
	    parentNode.insertBefore(newNode, referenceNode);
	}
	function removeChild(node, child) {
	    node.removeChild(child);
	}
	function appendChild(node, child) {
	    node.appendChild(child);
	}
	function parentNode(node) {
	    return node.parentNode;
	}
	function nextSibling(node) {
	    return node.nextSibling;
	}
	function tagName(elm) {
	    return elm.tagName;
	}
	function setTextContent(node, text) {
	    node.textContent = text;
	}
	function getTextContent(node) {
	    return node.textContent;
	}
	function isElement(node) {
	    return node.nodeType === 1;
	}
	function isText(node) {
	    return node.nodeType === 3;
	}
	function isComment(node) {
	    return node.nodeType === 8;
	}
	exports.htmlDomApi = {
	    createElement: createElement,
	    createElementNS: createElementNS,
	    createTextNode: createTextNode,
	    createComment: createComment,
	    insertBefore: insertBefore,
	    removeChild: removeChild,
	    appendChild: appendChild,
	    parentNode: parentNode,
	    nextSibling: nextSibling,
	    tagName: tagName,
	    setTextContent: setTextContent,
	    getTextContent: getTextContent,
	    isElement: isElement,
	    isText: isText,
	    isComment: isComment,
	};
	exports.default = exports.htmlDomApi;

	});

	unwrapExports(htmldomapi);
	htmldomapi.htmlDomApi;

	var tovnode = createCommonjsModule(function (module, exports) {
	Object.defineProperty(exports, "__esModule", { value: true });


	function toVNode(node, domApi) {
	    var api = domApi !== undefined ? domApi : htmldomapi.default;
	    var text;
	    if (api.isElement(node)) {
	        var id = node.id ? '#' + node.id : '';
	        var cn = node.getAttribute('class');
	        var c = cn ? '.' + cn.split(' ').join('.') : '';
	        var sel = api.tagName(node).toLowerCase() + id + c;
	        var attrs = {};
	        var children = [];
	        var name_1;
	        var i = void 0, n = void 0;
	        var elmAttrs = node.attributes;
	        var elmChildren = node.childNodes;
	        for (i = 0, n = elmAttrs.length; i < n; i++) {
	            name_1 = elmAttrs[i].nodeName;
	            if (name_1 !== 'id' && name_1 !== 'class') {
	                attrs[name_1] = elmAttrs[i].nodeValue;
	            }
	        }
	        for (i = 0, n = elmChildren.length; i < n; i++) {
	            children.push(toVNode(elmChildren[i], domApi));
	        }
	        return vnode_1.default(sel, { attrs: attrs }, children, undefined, node);
	    }
	    else if (api.isText(node)) {
	        text = api.getTextContent(node);
	        return vnode_1.default(undefined, undefined, undefined, text, node);
	    }
	    else if (api.isComment(node)) {
	        text = api.getTextContent(node);
	        return vnode_1.default('!', {}, [], text, node);
	    }
	    else {
	        return vnode_1.default('', {}, [], undefined, node);
	    }
	}
	exports.toVNode = toVNode;
	exports.default = toVNode;

	});

	unwrapExports(tovnode);
	var tovnode_1 = tovnode.toVNode;

	function isAlreadyInjected() {
	    return document.querySelector('#nfe-container') != null;
	}
	const rgbRe = /rgb\((\d+),\s*(\d+),\s*(\d+)\)/;
	/**
	 * Inject the News Feed Eradicator panel into the page.
	 */
	function injectUI(streamContainer, store, asFirstChild = false) {
	    const nfeContainer = document.createElement('div');
	    nfeContainer.id = 'nfe-container';
	    if (asFirstChild && streamContainer.firstChild) {
	        streamContainer.insertBefore(nfeContainer, streamContainer.firstChild);
	    }
	    else {
	        streamContainer.appendChild(nfeContainer);
	    }
	    const patch = init([propsModule, attrsModule, eventsModule]);
	    let vnode = tovnode_1(nfeContainer);
	    const render = () => {
	        const newVnode = h_2('div#nfe-container', [NewsFeedEradicator(store)]);
	        patch(vnode, newVnode);
	        vnode = newVnode;
	        const col = window.getComputedStyle(document.body)['background-color'];
	        const match = rgbRe.exec(col);
	        if (match) {
	            const r = parseInt(match[1], 10);
	            const g = parseInt(match[2], 10);
	            const b = parseInt(match[3], 10);
	            // Check the background color
	            let mode;
	            if (r < 100 && g < 100 && b < 100) {
	                mode = 'dark';
	            }
	            else {
	                mode = 'light';
	            }
	            document.body.dataset.nfeColorScheme = mode;
	        }
	    };
	    render();
	    store.subscribe(render);
	}

	// Elements here are removed from the DOM.
	// These selectors should also be added to `eradicate.css`
	// to ensure they're hidden before the script loads.
	const elementsToRemove = [
	    '.ticker_stream',
	    '.ego_column',
	    '#pagelet_gaming_destination_rhc',
	    '#stories_pagelet_rhc',
	    '#fb_stories_card_root',
	    '#stories_pagelet_below_composer',
	    '#pagelet_trending_tags_and_topics',
	    '#pagelet_canvas_nav_content',
	];
	const elementsToEmpty = ['[id^=topnews_main_stream]'];
	function checkSite$7() {
	    return !!document.querySelector('#stream_pagelet');
	}
	function eradicate$9(store) {
	    function eradicateRetry() {
	        const settings = store.getState().settings;
	        if (settings == null || !isEnabled(settings)) {
	            return;
	        }
	        // Don't do anything if the FB UI hasn't loaded yet
	        var streamContainer = document.querySelector('#stream_pagelet');
	        if (streamContainer == null) {
	            return;
	        }
	        remove({ toRemove: elementsToRemove, toEmpty: elementsToEmpty });
	        // Add News Feed Eradicator quote/info panel
	        if (!isAlreadyInjected()) {
	            injectUI(streamContainer, store);
	        }
	    }
	    // This delay ensures that the elements have been created by Facebook's
	    // scripts before we attempt to replace them
	    setInterval(eradicateRetry, 1000);
	}

	//export function checkSite(): boolean {
	//	return !!document.querySelector('#stream_pagelet');
	//}
	function eradicate$8(store) {
	    function eradicateRetry() {
	        const settings = store.getState().settings;
	        if (settings == null || !isEnabled(settings)) {
	            return;
	        }
	        // Remove notification text from document.title (i.e. '(7)' in '(7) Facebook')
	        if (document.title !== 'Facebook') {
	            document.title = 'Facebook';
	        }
	        // Don't do anything if the FB UI hasn't loaded yet
	        const feed = document.querySelector('#ssrb_feed_start + div') || // For home and groups feed
	            document.querySelector('[data-pagelet=MainFeed]') || // For watch and marketplace feeds
	            document.querySelector('div[aria-label=Gaming][role=main]') || // For gaming feed
	            document.querySelector('div.x1hc1fzr.x1unhpq9.x6o7n8i'); // For new fb layout (Q4 2022)
	        if (feed == null) {
	            return;
	        }
	        const container = feed.parentNode;
	        // Add News Feed Eradicator quote/info panel
	        if (container && !isAlreadyInjected()) {
	            injectUI(container, store);
	        }
	    }
	    // This delay ensures that the elements have been created by Facebook's
	    // scripts before we attempt to replace them
	    setInterval(eradicateRetry, 1000);
	}

	function checkSite$6() {
	    return window.location.host.includes('twitter.com')
	        || window.location.host.includes('x.com');
	}
	function eradicate$7(store) {
	    function eradicateRetry() {
	        const settings = store.getState().settings;
	        if (settings == null || !isEnabled(settings)) {
	            return;
	        }
	        // Determine if the user is logged in or not
	        const isUserLoggedOut = document.querySelector('[data-testid="login"]');
	        // Don't do anything if the UI hasn't loaded yet
	        // Select the correct Twitter feed based on the user's login status
	        let feed;
	        if (isUserLoggedOut) {
	            feed = document.querySelector('div[data-testid="primaryColumn"] > div:last-child > div:nth-child(3)');
	        }
	        else {
	            feed = document.querySelector('div[data-testid="primaryColumn"] > div:last-child > div:nth-child(4)');
	        }
	        if (feed == null) {
	            return;
	        }
	        const container = feed;
	        // Add News Feed Eradicator quote/info panel
	        if (container && !isAlreadyInjected()) {
	            injectUI(container, store);
	        }
	    }
	    // This delay ensures that the elements have been created by Twitter's
	    // scripts before we attempt to replace them
	    setInterval(eradicateRetry, 1000);
	}

	function checkSite$5() {
	    return window.location.host.includes('reddit.com');
	}
	function eradicate$6(store) {
	    function eradicateRetry() {
	        var _a, _b, _c;
	        const settings = store.getState().settings;
	        if (settings == null || !isEnabled(settings)) {
	            return;
	        }
	        // Don't do anything if the UI hasn't loaded yet
	        const scroll_item = document.querySelector('.scrollerItem');
	        const new_new_reddit_container = document.querySelector('shreddit-feed');
	        const new_reddit_container = (_c = (_b = (_a = scroll_item === null || scroll_item === void 0 ? void 0 : scroll_item.parentNode) === null || _a === void 0 ? void 0 : _a.parentNode) === null || _b === void 0 ? void 0 : _b.parentNode) === null || _c === void 0 ? void 0 : _c.previousSibling;
	        const old_reddit_container = document.querySelector('.listing-page > .content');
	        const container = new_new_reddit_container || new_reddit_container || old_reddit_container;
	        if (container == null) {
	            return;
	        }
	        // Add News Feed Eradicator quote/info panel
	        if (!isAlreadyInjected()) {
	            // Hack so that injectUI can handle new-reddit theme
	            document.body.style.background = 'var(--newRedditTheme-body)';
	            injectUI(container, store, true);
	        }
	    }
	    // This delay ensures that the elements have been created by Reddit's
	    // scripts before we attempt to replace them
	    setInterval(eradicateRetry, 1000);
	}

	function checkSite$4() {
	    return window.location.host.includes('news.ycombinator.com');
	}
	function eradicate$5(store) {
	    function eradicateRetry() {
	        const settings = store.getState().settings;
	        if (settings == null || !isEnabled(settings)) {
	            return;
	        }
	        // Don't do anything if the UI hasn't loaded yet
	        const feed = document.querySelector('table#hnmain tr:nth-of-type(3) td');
	        if (feed == null) {
	            return;
	        }
	        const container = feed;
	        // Add News Feed Eradicator quote/info panel
	        if (container && !isAlreadyInjected()) {
	            injectUI(container, store);
	        }
	    }
	    // This delay ensures that the elements have been created before we attempt
	    // to replace them
	    setInterval(eradicateRetry, 1000);
	}

	function checkSite$3() {
	    return window.location.host.includes('github.com');
	}
	function eradicate$4(store) {
	    function eradicateRetry() {
	        const settings = store.getState().settings;
	        if (settings == null || !isEnabled(settings)) {
	            return;
	        }
	        // Don't do anything if the UI hasn't loaded yet
	        const feed = document.querySelector('#dashboard-feed-frame');
	        if (feed === null)
	            return;
	        const container = feed;
	        // Add News Feed Eradicator quote/info panel
	        if (container && !isAlreadyInjected()) {
	            injectUI(container, store);
	        }
	    }
	    // This delay ensures that the elements have been created by GitHub's
	    // scripts before we attempt to replace them
	    setInterval(eradicateRetry, 1000);
	}

	function checkSite$2() {
	    return window.location.host.includes('linkedin.com');
	}
	function eradicate$3(store) {
	    function eradicateRetry() {
	        const settings = store.getState().settings;
	        if (settings == null || !isEnabled(settings)) {
	            return;
	        }
	        // Don't do anything if the UI hasn't loaded yet
	        const feed = document.querySelector('main.scaffold-layout__main > div:last-child');
	        if (feed == null) {
	            return;
	        }
	        // Add News Feed Eradicator quote/info panel
	        if (feed && !isAlreadyInjected()) {
	            injectUI(feed, store);
	        }
	    }
	    // This delay ensures that the elements have been created by Twitter's
	    // scripts before we attempt to replace them
	    setInterval(eradicateRetry, 1000);
	}

	function checkSite$1() {
	    return window.location.host.includes('instagram.com');
	}
	function eradicate$2(store) {
	    function eradicateRetry() {
	        const settings = store.getState().settings;
	        if (settings == null || !isEnabled(settings)) {
	            return;
	        }
	        // Don't do anything if the UI hasn't loaded yet
	        const feed = document.querySelector('main');
	        if (feed == null) {
	            return;
	        }
	        // Add News Feed Eradicator quote/info panel
	        if (feed && !isAlreadyInjected()) {
	            injectUI(feed, store);
	        }
	    }
	    // This delay ensures that the elements have been created by Twitter's
	    // scripts before we attempt to replace them
	    setInterval(eradicateRetry, 1000);
	}

	function checkSite() {
	    return window.location.host.includes('youtube.com');
	}
	function eradicate$1(store) {
	    function eradicateRetry() {
	        const settings = store.getState().settings;
	        if (settings == null || !isEnabled(settings)) {
	            return;
	        }
	        // Don't do anything if the UI hasn't loaded yet
	        const feed = document.querySelector('#primary');
	        if (feed == null) {
	            return;
	        }
	        const container = feed;
	        // Add News Feed Eradicator quote/info panel
	        if (container && !isAlreadyInjected()) {
	            // Hack so that injectUI can handle dark theme
	            document.body.style.background = 'var(--yt-spec-general-background-a)';
	            injectUI(container, store);
	        }
	    }
	    // This delay ensures that the elements have been created before we attempt
	    // to replace them
	    setInterval(eradicateRetry, 1000);
	}

	function _defineProperty(obj, key, value) {
	  if (key in obj) {
	    Object.defineProperty(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }
	  return obj;
	}

	function ownKeys(object, enumerableOnly) {
	  var keys = Object.keys(object);
	  if (Object.getOwnPropertySymbols) {
	    var symbols = Object.getOwnPropertySymbols(object);
	    enumerableOnly && (symbols = symbols.filter(function (sym) {
	      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
	    })), keys.push.apply(keys, symbols);
	  }
	  return keys;
	}
	function _objectSpread2(target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = null != arguments[i] ? arguments[i] : {};
	    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
	      _defineProperty(target, key, source[key]);
	    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
	      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
	    });
	  }
	  return target;
	}

	/**
	 * Adapted from React: https://github.com/facebook/react/blob/master/packages/shared/formatProdErrorMessage.js
	 *
	 * Do not require this module directly! Use normal throw error calls. These messages will be replaced with error codes
	 * during build.
	 * @param {number} code
	 */
	function formatProdErrorMessage(code) {
	  return "Minified Redux error #" + code + "; visit https://redux.js.org/Errors?code=" + code + " for the full message or " + 'use the non-minified dev environment for full errors. ';
	}

	// Inlined version of the `symbol-observable` polyfill
	var $$observable = (function () {
	  return typeof Symbol === 'function' && Symbol.observable || '@@observable';
	})();

	/**
	 * These are private action types reserved by Redux.
	 * For any unknown actions, you must return the current state.
	 * If the current state is undefined, you must return the initial state.
	 * Do not reference these action types directly in your code.
	 */
	var randomString = function randomString() {
	  return Math.random().toString(36).substring(7).split('').join('.');
	};

	var ActionTypes = {
	  INIT: "@@redux/INIT" + randomString(),
	  REPLACE: "@@redux/REPLACE" + randomString(),
	  PROBE_UNKNOWN_ACTION: function PROBE_UNKNOWN_ACTION() {
	    return "@@redux/PROBE_UNKNOWN_ACTION" + randomString();
	  }
	};

	/**
	 * @param {any} obj The object to inspect.
	 * @returns {boolean} True if the argument appears to be a plain object.
	 */
	function isPlainObject(obj) {
	  if (typeof obj !== 'object' || obj === null) return false;
	  var proto = obj;

	  while (Object.getPrototypeOf(proto) !== null) {
	    proto = Object.getPrototypeOf(proto);
	  }

	  return Object.getPrototypeOf(obj) === proto;
	}

	/**
	 * @deprecated
	 *
	 * **We recommend using the `configureStore` method
	 * of the `@reduxjs/toolkit` package**, which replaces `createStore`.
	 *
	 * Redux Toolkit is our recommended approach for writing Redux logic today,
	 * including store setup, reducers, data fetching, and more.
	 *
	 * **For more details, please read this Redux docs page:**
	 * **https://redux.js.org/introduction/why-rtk-is-redux-today**
	 *
	 * `configureStore` from Redux Toolkit is an improved version of `createStore` that
	 * simplifies setup and helps avoid common bugs.
	 *
	 * You should not be using the `redux` core package by itself today, except for learning purposes.
	 * The `createStore` method from the core `redux` package will not be removed, but we encourage
	 * all users to migrate to using Redux Toolkit for all Redux code.
	 *
	 * If you want to use `createStore` without this visual deprecation warning, use
	 * the `legacy_createStore` import instead:
	 *
	 * `import { legacy_createStore as createStore} from 'redux'`
	 *
	 */

	function createStore$1(reducer, preloadedState, enhancer) {
	  var _ref2;

	  if (typeof preloadedState === 'function' && typeof enhancer === 'function' || typeof enhancer === 'function' && typeof arguments[3] === 'function') {
	    throw new Error(formatProdErrorMessage(0) );
	  }

	  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
	    enhancer = preloadedState;
	    preloadedState = undefined;
	  }

	  if (typeof enhancer !== 'undefined') {
	    if (typeof enhancer !== 'function') {
	      throw new Error(formatProdErrorMessage(1) );
	    }

	    return enhancer(createStore$1)(reducer, preloadedState);
	  }

	  if (typeof reducer !== 'function') {
	    throw new Error(formatProdErrorMessage(2) );
	  }

	  var currentReducer = reducer;
	  var currentState = preloadedState;
	  var currentListeners = [];
	  var nextListeners = currentListeners;
	  var isDispatching = false;
	  /**
	   * This makes a shallow copy of currentListeners so we can use
	   * nextListeners as a temporary list while dispatching.
	   *
	   * This prevents any bugs around consumers calling
	   * subscribe/unsubscribe in the middle of a dispatch.
	   */

	  function ensureCanMutateNextListeners() {
	    if (nextListeners === currentListeners) {
	      nextListeners = currentListeners.slice();
	    }
	  }
	  /**
	   * Reads the state tree managed by the store.
	   *
	   * @returns {any} The current state tree of your application.
	   */


	  function getState() {
	    if (isDispatching) {
	      throw new Error(formatProdErrorMessage(3) );
	    }

	    return currentState;
	  }
	  /**
	   * Adds a change listener. It will be called any time an action is dispatched,
	   * and some part of the state tree may potentially have changed. You may then
	   * call `getState()` to read the current state tree inside the callback.
	   *
	   * You may call `dispatch()` from a change listener, with the following
	   * caveats:
	   *
	   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
	   * If you subscribe or unsubscribe while the listeners are being invoked, this
	   * will not have any effect on the `dispatch()` that is currently in progress.
	   * However, the next `dispatch()` call, whether nested or not, will use a more
	   * recent snapshot of the subscription list.
	   *
	   * 2. The listener should not expect to see all state changes, as the state
	   * might have been updated multiple times during a nested `dispatch()` before
	   * the listener is called. It is, however, guaranteed that all subscribers
	   * registered before the `dispatch()` started will be called with the latest
	   * state by the time it exits.
	   *
	   * @param {Function} listener A callback to be invoked on every dispatch.
	   * @returns {Function} A function to remove this change listener.
	   */


	  function subscribe(listener) {
	    if (typeof listener !== 'function') {
	      throw new Error(formatProdErrorMessage(4) );
	    }

	    if (isDispatching) {
	      throw new Error(formatProdErrorMessage(5) );
	    }

	    var isSubscribed = true;
	    ensureCanMutateNextListeners();
	    nextListeners.push(listener);
	    return function unsubscribe() {
	      if (!isSubscribed) {
	        return;
	      }

	      if (isDispatching) {
	        throw new Error(formatProdErrorMessage(6) );
	      }

	      isSubscribed = false;
	      ensureCanMutateNextListeners();
	      var index = nextListeners.indexOf(listener);
	      nextListeners.splice(index, 1);
	      currentListeners = null;
	    };
	  }
	  /**
	   * Dispatches an action. It is the only way to trigger a state change.
	   *
	   * The `reducer` function, used to create the store, will be called with the
	   * current state tree and the given `action`. Its return value will
	   * be considered the **next** state of the tree, and the change listeners
	   * will be notified.
	   *
	   * The base implementation only supports plain object actions. If you want to
	   * dispatch a Promise, an Observable, a thunk, or something else, you need to
	   * wrap your store creating function into the corresponding middleware. For
	   * example, see the documentation for the `redux-thunk` package. Even the
	   * middleware will eventually dispatch plain object actions using this method.
	   *
	   * @param {Object} action A plain object representing “what changed”. It is
	   * a good idea to keep actions serializable so you can record and replay user
	   * sessions, or use the time travelling `redux-devtools`. An action must have
	   * a `type` property which may not be `undefined`. It is a good idea to use
	   * string constants for action types.
	   *
	   * @returns {Object} For convenience, the same action object you dispatched.
	   *
	   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
	   * return something else (for example, a Promise you can await).
	   */


	  function dispatch(action) {
	    if (!isPlainObject(action)) {
	      throw new Error(formatProdErrorMessage(7) );
	    }

	    if (typeof action.type === 'undefined') {
	      throw new Error(formatProdErrorMessage(8) );
	    }

	    if (isDispatching) {
	      throw new Error(formatProdErrorMessage(9) );
	    }

	    try {
	      isDispatching = true;
	      currentState = currentReducer(currentState, action);
	    } finally {
	      isDispatching = false;
	    }

	    var listeners = currentListeners = nextListeners;

	    for (var i = 0; i < listeners.length; i++) {
	      var listener = listeners[i];
	      listener();
	    }

	    return action;
	  }
	  /**
	   * Replaces the reducer currently used by the store to calculate the state.
	   *
	   * You might need this if your app implements code splitting and you want to
	   * load some of the reducers dynamically. You might also need this if you
	   * implement a hot reloading mechanism for Redux.
	   *
	   * @param {Function} nextReducer The reducer for the store to use instead.
	   * @returns {void}
	   */


	  function replaceReducer(nextReducer) {
	    if (typeof nextReducer !== 'function') {
	      throw new Error(formatProdErrorMessage(10) );
	    }

	    currentReducer = nextReducer; // This action has a similiar effect to ActionTypes.INIT.
	    // Any reducers that existed in both the new and old rootReducer
	    // will receive the previous state. This effectively populates
	    // the new state tree with any relevant data from the old one.

	    dispatch({
	      type: ActionTypes.REPLACE
	    });
	  }
	  /**
	   * Interoperability point for observable/reactive libraries.
	   * @returns {observable} A minimal observable of state changes.
	   * For more information, see the observable proposal:
	   * https://github.com/tc39/proposal-observable
	   */


	  function observable() {
	    var _ref;

	    var outerSubscribe = subscribe;
	    return _ref = {
	      /**
	       * The minimal observable subscription method.
	       * @param {Object} observer Any object that can be used as an observer.
	       * The observer object should have a `next` method.
	       * @returns {subscription} An object with an `unsubscribe` method that can
	       * be used to unsubscribe the observable from the store, and prevent further
	       * emission of values from the observable.
	       */
	      subscribe: function subscribe(observer) {
	        if (typeof observer !== 'object' || observer === null) {
	          throw new Error(formatProdErrorMessage(11) );
	        }

	        function observeState() {
	          if (observer.next) {
	            observer.next(getState());
	          }
	        }

	        observeState();
	        var unsubscribe = outerSubscribe(observeState);
	        return {
	          unsubscribe: unsubscribe
	        };
	      }
	    }, _ref[$$observable] = function () {
	      return this;
	    }, _ref;
	  } // When a store is created, an "INIT" action is dispatched so that every
	  // reducer returns their initial state. This effectively populates
	  // the initial state tree.


	  dispatch({
	    type: ActionTypes.INIT
	  });
	  return _ref2 = {
	    dispatch: dispatch,
	    subscribe: subscribe,
	    getState: getState,
	    replaceReducer: replaceReducer
	  }, _ref2[$$observable] = observable, _ref2;
	}

	function assertReducerShape(reducers) {
	  Object.keys(reducers).forEach(function (key) {
	    var reducer = reducers[key];
	    var initialState = reducer(undefined, {
	      type: ActionTypes.INIT
	    });

	    if (typeof initialState === 'undefined') {
	      throw new Error(formatProdErrorMessage(12) );
	    }

	    if (typeof reducer(undefined, {
	      type: ActionTypes.PROBE_UNKNOWN_ACTION()
	    }) === 'undefined') {
	      throw new Error(formatProdErrorMessage(13) );
	    }
	  });
	}
	/**
	 * Turns an object whose values are different reducer functions, into a single
	 * reducer function. It will call every child reducer, and gather their results
	 * into a single state object, whose keys correspond to the keys of the passed
	 * reducer functions.
	 *
	 * @param {Object} reducers An object whose values correspond to different
	 * reducer functions that need to be combined into one. One handy way to obtain
	 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
	 * undefined for any action. Instead, they should return their initial state
	 * if the state passed to them was undefined, and the current state for any
	 * unrecognized action.
	 *
	 * @returns {Function} A reducer function that invokes every reducer inside the
	 * passed object, and builds a state object with the same shape.
	 */


	function combineReducers(reducers) {
	  var reducerKeys = Object.keys(reducers);
	  var finalReducers = {};

	  for (var i = 0; i < reducerKeys.length; i++) {
	    var key = reducerKeys[i];

	    if (typeof reducers[key] === 'function') {
	      finalReducers[key] = reducers[key];
	    }
	  }

	  var finalReducerKeys = Object.keys(finalReducers); // This is used to make sure we don't warn about the same

	  var shapeAssertionError;

	  try {
	    assertReducerShape(finalReducers);
	  } catch (e) {
	    shapeAssertionError = e;
	  }

	  return function combination(state, action) {
	    if (state === void 0) {
	      state = {};
	    }

	    if (shapeAssertionError) {
	      throw shapeAssertionError;
	    }

	    var hasChanged = false;
	    var nextState = {};

	    for (var _i = 0; _i < finalReducerKeys.length; _i++) {
	      var _key = finalReducerKeys[_i];
	      var reducer = finalReducers[_key];
	      var previousStateForKey = state[_key];
	      var nextStateForKey = reducer(previousStateForKey, action);

	      if (typeof nextStateForKey === 'undefined') {
	        action && action.type;
	        throw new Error(formatProdErrorMessage(14) );
	      }

	      nextState[_key] = nextStateForKey;
	      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
	    }

	    hasChanged = hasChanged || finalReducerKeys.length !== Object.keys(state).length;
	    return hasChanged ? nextState : state;
	  };
	}

	/**
	 * Composes single-argument functions from right to left. The rightmost
	 * function can take multiple arguments as it provides the signature for
	 * the resulting composite function.
	 *
	 * @param {...Function} funcs The functions to compose.
	 * @returns {Function} A function obtained by composing the argument functions
	 * from right to left. For example, compose(f, g, h) is identical to doing
	 * (...args) => f(g(h(...args))).
	 */
	function compose() {
	  for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) {
	    funcs[_key] = arguments[_key];
	  }

	  if (funcs.length === 0) {
	    return function (arg) {
	      return arg;
	    };
	  }

	  if (funcs.length === 1) {
	    return funcs[0];
	  }

	  return funcs.reduce(function (a, b) {
	    return function () {
	      return a(b.apply(void 0, arguments));
	    };
	  });
	}

	/**
	 * Creates a store enhancer that applies middleware to the dispatch method
	 * of the Redux store. This is handy for a variety of tasks, such as expressing
	 * asynchronous actions in a concise manner, or logging every action payload.
	 *
	 * See `redux-thunk` package as an example of the Redux middleware.
	 *
	 * Because middleware is potentially asynchronous, this should be the first
	 * store enhancer in the composition chain.
	 *
	 * Note that each middleware will be given the `dispatch` and `getState` functions
	 * as named arguments.
	 *
	 * @param {...Function} middlewares The middleware chain to be applied.
	 * @returns {Function} A store enhancer applying the middleware.
	 */

	function applyMiddleware() {
	  for (var _len = arguments.length, middlewares = new Array(_len), _key = 0; _key < _len; _key++) {
	    middlewares[_key] = arguments[_key];
	  }

	  return function (createStore) {
	    return function () {
	      var store = createStore.apply(void 0, arguments);

	      var _dispatch = function dispatch() {
	        throw new Error(formatProdErrorMessage(15) );
	      };

	      var middlewareAPI = {
	        getState: store.getState,
	        dispatch: function dispatch() {
	          return _dispatch.apply(void 0, arguments);
	        }
	      };
	      var chain = middlewares.map(function (middleware) {
	        return middleware(middlewareAPI);
	      });
	      _dispatch = compose.apply(void 0, chain)(store.dispatch);
	      return _objectSpread2(_objectSpread2({}, store), {}, {
	        dispatch: _dispatch
	      });
	    };
	  };
	}

	const confirmDisableSite = (state = null, action) => {
	    switch (action.type) {
	        case ActionType.UI_SITES_SITE_DISABLE_CONFIRM_SHOW:
	            if (state === action.site)
	                return null;
	            return action.site;
	        case ActionType.UI_SITES_SITE_DISABLE_CONFIRMED:
	            return null;
	    }
	    return state;
	};
	const tab = (state = 'sites', action) => {
	    if (action.type === ActionType.UI_OPTIONS_TAB_SHOW) {
	        return action.tab;
	    }
	    return state;
	};
	const quotesTab = (state = 'custom', action) => {
	    if (action.type === ActionType.UI_OPTIONS_QUOTE_TAB_SHOW) {
	        return action.tab;
	    }
	    // Deactivate builtin quotes tab if they've been disabled
	    if (action.type === ActionType.BACKGROUND_SETTINGS_CHANGED &&
	        action.settings.builtinQuotesEnabled === false &&
	        state === 'builtin') {
	        return 'custom';
	    }
	    return state;
	};
	const optionsReducer = combineReducers({
	    confirmDisableSite,
	    tab,
	    quotesTab,
	});

	function currentQuote(state = null, action) {
	    switch (action.type) {
	        case ActionType.QUOTE_CURRENT_SET:
	            return action.quote;
	    }
	    return state;
	}
	const editingText = (state = '', action) => {
	    switch (action.type) {
	        case ActionType.QUOTE_EDIT:
	            switch (action.action.type) {
	                case 'START':
	                    return '';
	                case 'CANCEL':
	                    return '';
	                case 'SET_TEXT':
	                    return action.action.text;
	                case 'TOGGLE_BULK':
	                    return '';
	            }
	    }
	    return state;
	};
	const editingSource = (state = '', action) => {
	    switch (action.type) {
	        case ActionType.QUOTE_EDIT:
	            switch (action.action.type) {
	                case 'START':
	                    return '';
	                case 'CANCEL':
	                    return '';
	                case 'SET_SOURCE':
	                    return action.action.source;
	            }
	    }
	    return state;
	};
	const isQuoteMenuVisible = (state = false, action) => {
	    switch (action.type) {
	        case ActionType.QUOTE_MENU_SHOW:
	            switch (action.show) {
	                case 'SHOW':
	                    return true;
	                case 'HIDE':
	                    return false;
	                case 'TOGGLE':
	                    return !state;
	            }
	    }
	    return state;
	};
	const isEditingQuote = (state = false, action) => {
	    switch (action.type) {
	        case ActionType.QUOTE_EDIT:
	            switch (action.action.type) {
	                case 'START':
	                    return true;
	                case 'CANCEL':
	                    return false;
	            }
	    }
	    return state;
	};
	const isEditingBulk = (state = false, action) => {
	    switch (action.type) {
	        case ActionType.QUOTE_EDIT:
	            switch (action.action.type) {
	                case 'TOGGLE_BULK':
	                    return !state;
	            }
	    }
	    return state;
	};
	const error = (state = '', action) => {
	    switch (action.type) {
	        case ActionType.QUOTE_EDIT:
	            switch (action.action.type) {
	                case 'CANCEL':
	                    return '';
	            }
	            return state;
	        case ActionType.PARSE_ERROR:
	            return action.message;
	    }
	    return state;
	};
	const settings = (state = null, action) => {
	    if (action.type === ActionType.BACKGROUND_SETTINGS_CHANGED) {
	        return action.settings;
	    }
	    return state;
	};
	var rootReducer = combineReducers({
	    currentQuote,
	    editingSource,
	    editingText,
	    isQuoteMenuVisible,
	    isEditingQuote,
	    isEditingBulk,
	    error,
	    settings,
	    uiOptions: optionsReducer,
	});

	var Effect;
	(function (Effect) {
	    function all(...effects) {
	        return (store) => {
	            const actionEffects = effects.map((eff) => eff(store));
	            return (action) => {
	                actionEffects.forEach((eff) => {
	                    eff(action);
	                });
	            };
	        };
	    }
	    Effect.all = all;
	})(Effect || (Effect = {}));
	const effectsMiddleware = (rootEffect) => (store) => {
	    const eff = rootEffect(store);
	    return (next) => (action) => {
	        next(action);
	        eff(action);
	    };
	};

	function generateID() {
	    let key = '';
	    while (key.length < 16) {
	        key += Math.random().toString(16).substr(2);
	    }
	    return key.substr(0, 16);
	}

	var MessageType;
	(function (MessageType) {
	    MessageType[MessageType["OPTIONS_PAGE_OPEN"] = 0] = "OPTIONS_PAGE_OPEN";
	    MessageType[MessageType["SETTINGS_ACTION"] = 1] = "SETTINGS_ACTION";
	    MessageType[MessageType["SETTINGS_CHANGED"] = 2] = "SETTINGS_CHANGED";
	})(MessageType || (MessageType = {}));

	// When the settings have changed, we might need to select a new quote
	const refreshQuotes = (store) => (action) => {
	    if (action.type === ActionType.BACKGROUND_SETTINGS_CHANGED) {
	        // Check if current quote still exists
	        const state = store.getState();
	        const current = currentQuote$1(state);
	        if (current == null) {
	            store.dispatch({ type: ActionType.SELECT_NEW_QUOTE });
	        }
	    }
	};
	// Find a new quote from the database
	const selectNewQuote = (store) => (action) => {
	    if (action.type === ActionType.SELECT_NEW_QUOTE) {
	        const state = store.getState();
	        if (state.settings == null) {
	            throw new Error('Settings not available yet');
	        }
	        const allQuotes = getAvailableQuotes(state);
	        if (allQuotes.length < 1) {
	            return store.dispatch({
	                type: ActionType.QUOTE_CURRENT_SET,
	                quote: { type: 'none-found' },
	            });
	        }
	        const quoteIndex = Math.floor(Math.random() * allQuotes.length);
	        store.dispatch({
	            type: ActionType.QUOTE_CURRENT_SET,
	            quote: allQuotes[quoteIndex],
	        });
	    }
	};
	// When quote is added, we can cancel editing
	const quoteSaveClicked = (store) => (action) => {
	    const state = store.getState();
	    if (action.type === ActionType.QUOTE_SAVE_CLICKED) {
	        // Don't do anything if quote is empty
	        if (state.editingText.trim().length < 1) {
	            return;
	        }
	        const id = generateID();
	        store.dispatch(addQuote(id, state.editingText, state.editingSource));
	        store.dispatch(cancelEditing());
	        store.dispatch({
	            type: ActionType.QUOTE_CURRENT_SET,
	            quote: { type: 'custom', id },
	        });
	    }
	};
	const quoteRemoveCurrent = (store) => (action) => {
	    if (action.type !== ActionType.QUOTE_REMOVE_CURRENT)
	        return;
	    const state = store.getState();
	    if (state.currentQuote == null || state.currentQuote.type === 'none-found') {
	        return;
	    }
	    else if (state.currentQuote.type === 'custom') {
	        store.dispatch({
	            type: ActionType.BACKGROUND_ACTION,
	            action: {
	                type: BackgroundActionType.QUOTE_DELETE,
	                id: state.currentQuote.id,
	            },
	        });
	    }
	    else {
	        store.dispatch({
	            type: ActionType.BACKGROUND_ACTION,
	            action: {
	                type: BackgroundActionType.QUOTE_HIDE,
	                id: state.currentQuote.id,
	            },
	        });
	    }
	    store.dispatch({ type: ActionType.SELECT_NEW_QUOTE });
	};
	const quoteAddBulk = (store) => (action) => {
	    if (action.type !== ActionType.QUOTE_ADD_BULK)
	        return;
	    const lines = action.text.split('\n');
	    const quotes = [];
	    for (var lineCount = 0; lineCount < lines.length; lineCount++) {
	        const line = lines[lineCount];
	        const quote = line.split('~');
	        const trimmedQuote = [];
	        if (quote.length === 0 || quote[0].trim() === '') ;
	        else if (quote.length !== 2) {
	            return store.dispatch({
	                type: ActionType.PARSE_ERROR,
	                message: `Invalid format on line ${(lineCount + 1).toString()}: \"${quote}\". Check that you have a "~" separating the quote text and the source.`,
	            });
	        }
	        else {
	            quote.forEach((field) => trimmedQuote.push(field.trim()));
	            quotes.push(trimmedQuote);
	        }
	    }
	    quotes.forEach((trimmedQuote) => store.dispatch(addQuote(generateID(), trimmedQuote[0], trimmedQuote[1])));
	    store.dispatch(cancelEditing());
	};
	const requestPermissions = (store, origins) => __awaiter(void 0, void 0, void 0, function* () {
	    const success = yield getBrowser().permissions.request({
	        permissions: [],
	        origins: origins,
	    });
	    if (success) {
	        // Check and update permissions
	        store.dispatch({
	            type: ActionType.BACKGROUND_ACTION,
	            action: { type: BackgroundActionType.PERMISSIONS_CHECK },
	        });
	    }
	    return success;
	});
	const removePermissions = (store, origins) => __awaiter(void 0, void 0, void 0, function* () {
	    const success = yield getBrowser().permissions.remove({
	        permissions: [],
	        origins: origins,
	    });
	    if (success) {
	        // Check and update permissions
	        store.dispatch({
	            type: ActionType.BACKGROUND_ACTION,
	            action: { type: BackgroundActionType.PERMISSIONS_CHECK },
	        });
	    }
	    return success;
	});
	const siteClicked = (store) => (action) => __awaiter(void 0, void 0, void 0, function* () {
	    if (action.type === ActionType.UI_SITES_SITE_CLICK) {
	        const state = store.getState();
	        if (state.settings == null) {
	            // Can't do anything until settings have loaded
	            return;
	        }
	        const sites = getSiteStatus(state.settings);
	        const site = Sites[action.site];
	        const s = sites[action.site];
	        if (s.type == SiteStatusTag.NEEDS_NEW_PERMISSIONS) {
	            if (yield requestPermissions(store, site.origins)) {
	                store.dispatch(setSiteState(action.site, {
	                    type: Settings.SiteStateTag.ENABLED,
	                }));
	            }
	            else {
	                // Permission denied, disable the site
	                store.dispatch(setSiteState(action.site, {
	                    type: Settings.SiteStateTag.DISABLED,
	                }));
	            }
	        }
	        else if (s.type === SiteStatusTag.DISABLED) {
	            const success = yield requestPermissions(store, site.origins);
	            if (success) {
	                store.dispatch(setSiteState(action.site, {
	                    type: Settings.SiteStateTag.ENABLED,
	                }));
	            }
	        }
	        else if (s.type === SiteStatusTag.DISABLED_TEMPORARILY) {
	            store.dispatch(setSiteState(action.site, {
	                type: Settings.SiteStateTag.ENABLED,
	            }));
	        }
	        else if (s.type === SiteStatusTag.ENABLED) {
	            store.dispatch({
	                type: ActionType.UI_SITES_SITE_DISABLE_CONFIRM_SHOW,
	                site: action.site,
	            });
	        }
	    }
	});
	const confirmSiteDisabled = (store) => (action) => __awaiter(void 0, void 0, void 0, function* () {
	    if (action.type === ActionType.UI_SITES_SITE_DISABLE_CONFIRMED) {
	        if (action.until.t === 'forever') {
	            // Don't need the permissions anymore
	            const site = Sites[action.site];
	            yield removePermissions(store, site.origins);
	            store.dispatch(setSiteState(action.site, {
	                type: Settings.SiteStateTag.DISABLED,
	            }));
	        }
	        else {
	            store.dispatch(setSiteState(action.site, {
	                type: Settings.SiteStateTag.DISABLED_TEMPORARILY,
	                disabled_until: Date.now() + action.until.milliseconds,
	            }));
	        }
	    }
	});
	// Connect to the background script at startup
	const connect = (store) => {
	    const browser = getBrowser();
	    const port = browser.runtime.connect();
	    port.onMessage.addListener((msg) => {
	        if (msg.t === MessageType.SETTINGS_CHANGED) {
	            store.dispatch({
	                type: ActionType.BACKGROUND_SETTINGS_CHANGED,
	                settings: msg.settings,
	            });
	        }
	    });
	    return (action) => {
	        // Forward any actions to the background script
	        if (action.type === ActionType.BACKGROUND_ACTION) {
	            port.postMessage({
	                t: MessageType.SETTINGS_ACTION,
	                action: action.action,
	            });
	        }
	        else if (action.type === ActionType.UI_OPTIONS_SHOW) {
	            port.postMessage({
	                t: MessageType.OPTIONS_PAGE_OPEN,
	            });
	        }
	    };
	};
	const rootEffect = Effect.all(refreshQuotes, selectNewQuote, quoteRemoveCurrent, quoteSaveClicked, quoteAddBulk, siteClicked, confirmSiteDisabled, connect);

	function createStore() {
	    const store = createStore$1(rootReducer, undefined, applyMiddleware(effectsMiddleware(rootEffect)));
	    return store;
	}

	/**
	 * This script should run at document start to set up
	 * intercepts before the site loads.
	 */
	const store = createStore();
	function eradicate(store) {
	    // Determine which site we're working with
	    if (checkSite$5()) {
	        eradicate$6(store);
	    }
	    else if (checkSite$6()) {
	        eradicate$7(store);
	    }
	    else if (checkSite$4()) {
	        eradicate$5(store);
	    }
	    else if (checkSite$3()) {
	        eradicate$4(store);
	    }
	    else if (checkSite$2()) {
	        eradicate$3(store);
	    }
	    else if (checkSite()) {
	        eradicate$1(store);
	    }
	    else if (checkSite$1()) {
	        eradicate$2(store);
	    }
	    else if (checkSite$7()) {
	        eradicate$9(store);
	    }
	    else {
	        eradicate$8(store);
	    }
	}
	setupRouteChange(store);
	eradicate(store);

	exports.eradicate = eradicate;

	Object.defineProperty(exports, '__esModule', { value: true });

	return exports;

})({});
