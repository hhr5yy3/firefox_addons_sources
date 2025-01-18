(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.datasources = factory());
})(this, (function () { 'use strict';

	function getDefaultExportFromCjs (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	var browser = {exports: {}};

	/**
	 * Helpers.
	 */

	var ms;
	var hasRequiredMs;

	function requireMs () {
		if (hasRequiredMs) return ms;
		hasRequiredMs = 1;
		var s = 1000;
		var m = s * 60;
		var h = m * 60;
		var d = h * 24;
		var w = d * 7;
		var y = d * 365.25;

		/**
		 * Parse or format the given `val`.
		 *
		 * Options:
		 *
		 *  - `long` verbose formatting [false]
		 *
		 * @param {String|Number} val
		 * @param {Object} [options]
		 * @throws {Error} throw an error if val is not a non-empty string or a number
		 * @return {String|Number}
		 * @api public
		 */

		ms = function(val, options) {
		  options = options || {};
		  var type = typeof val;
		  if (type === 'string' && val.length > 0) {
		    return parse(val);
		  } else if (type === 'number' && isFinite(val)) {
		    return options.long ? fmtLong(val) : fmtShort(val);
		  }
		  throw new Error(
		    'val is not a non-empty string or a valid number. val=' +
		      JSON.stringify(val)
		  );
		};

		/**
		 * Parse the given `str` and return milliseconds.
		 *
		 * @param {String} str
		 * @return {Number}
		 * @api private
		 */

		function parse(str) {
		  str = String(str);
		  if (str.length > 100) {
		    return;
		  }
		  var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
		    str
		  );
		  if (!match) {
		    return;
		  }
		  var n = parseFloat(match[1]);
		  var type = (match[2] || 'ms').toLowerCase();
		  switch (type) {
		    case 'years':
		    case 'year':
		    case 'yrs':
		    case 'yr':
		    case 'y':
		      return n * y;
		    case 'weeks':
		    case 'week':
		    case 'w':
		      return n * w;
		    case 'days':
		    case 'day':
		    case 'd':
		      return n * d;
		    case 'hours':
		    case 'hour':
		    case 'hrs':
		    case 'hr':
		    case 'h':
		      return n * h;
		    case 'minutes':
		    case 'minute':
		    case 'mins':
		    case 'min':
		    case 'm':
		      return n * m;
		    case 'seconds':
		    case 'second':
		    case 'secs':
		    case 'sec':
		    case 's':
		      return n * s;
		    case 'milliseconds':
		    case 'millisecond':
		    case 'msecs':
		    case 'msec':
		    case 'ms':
		      return n;
		    default:
		      return undefined;
		  }
		}

		/**
		 * Short format for `ms`.
		 *
		 * @param {Number} ms
		 * @return {String}
		 * @api private
		 */

		function fmtShort(ms) {
		  var msAbs = Math.abs(ms);
		  if (msAbs >= d) {
		    return Math.round(ms / d) + 'd';
		  }
		  if (msAbs >= h) {
		    return Math.round(ms / h) + 'h';
		  }
		  if (msAbs >= m) {
		    return Math.round(ms / m) + 'm';
		  }
		  if (msAbs >= s) {
		    return Math.round(ms / s) + 's';
		  }
		  return ms + 'ms';
		}

		/**
		 * Long format for `ms`.
		 *
		 * @param {Number} ms
		 * @return {String}
		 * @api private
		 */

		function fmtLong(ms) {
		  var msAbs = Math.abs(ms);
		  if (msAbs >= d) {
		    return plural(ms, msAbs, d, 'day');
		  }
		  if (msAbs >= h) {
		    return plural(ms, msAbs, h, 'hour');
		  }
		  if (msAbs >= m) {
		    return plural(ms, msAbs, m, 'minute');
		  }
		  if (msAbs >= s) {
		    return plural(ms, msAbs, s, 'second');
		  }
		  return ms + ' ms';
		}

		/**
		 * Pluralization helper.
		 */

		function plural(ms, msAbs, n, name) {
		  var isPlural = msAbs >= n * 1.5;
		  return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
		}
		return ms;
	}

	/**
	 * This is the common logic for both the Node.js and web browser
	 * implementations of `debug()`.
	 */

	function setup(env) {
		createDebug.debug = createDebug;
		createDebug.default = createDebug;
		createDebug.coerce = coerce;
		createDebug.disable = disable;
		createDebug.enable = enable;
		createDebug.enabled = enabled;
		createDebug.humanize = requireMs();
		createDebug.destroy = destroy;

		Object.keys(env).forEach(key => {
			createDebug[key] = env[key];
		});

		/**
		* The currently active debug mode names, and names to skip.
		*/

		createDebug.names = [];
		createDebug.skips = [];

		/**
		* Map of special "%n" handling functions, for the debug "format" argument.
		*
		* Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
		*/
		createDebug.formatters = {};

		/**
		* Selects a color for a debug namespace
		* @param {String} namespace The namespace string for the debug instance to be colored
		* @return {Number|String} An ANSI color code for the given namespace
		* @api private
		*/
		function selectColor(namespace) {
			let hash = 0;

			for (let i = 0; i < namespace.length; i++) {
				hash = ((hash << 5) - hash) + namespace.charCodeAt(i);
				hash |= 0; // Convert to 32bit integer
			}

			return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
		}
		createDebug.selectColor = selectColor;

		/**
		* Create a debugger with the given `namespace`.
		*
		* @param {String} namespace
		* @return {Function}
		* @api public
		*/
		function createDebug(namespace) {
			let prevTime;
			let enableOverride = null;
			let namespacesCache;
			let enabledCache;

			function debug(...args) {
				// Disabled?
				if (!debug.enabled) {
					return;
				}

				const self = debug;

				// Set `diff` timestamp
				const curr = Number(new Date());
				const ms = curr - (prevTime || curr);
				self.diff = ms;
				self.prev = prevTime;
				self.curr = curr;
				prevTime = curr;

				args[0] = createDebug.coerce(args[0]);

				if (typeof args[0] !== 'string') {
					// Anything else let's inspect with %O
					args.unshift('%O');
				}

				// Apply any `formatters` transformations
				let index = 0;
				args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
					// If we encounter an escaped % then don't increase the array index
					if (match === '%%') {
						return '%';
					}
					index++;
					const formatter = createDebug.formatters[format];
					if (typeof formatter === 'function') {
						const val = args[index];
						match = formatter.call(self, val);

						// Now we need to remove `args[index]` since it's inlined in the `format`
						args.splice(index, 1);
						index--;
					}
					return match;
				});

				// Apply env-specific formatting (colors, etc.)
				createDebug.formatArgs.call(self, args);

				const logFn = self.log || createDebug.log;
				logFn.apply(self, args);
			}

			debug.namespace = namespace;
			debug.useColors = createDebug.useColors();
			debug.color = createDebug.selectColor(namespace);
			debug.extend = extend;
			debug.destroy = createDebug.destroy; // XXX Temporary. Will be removed in the next major release.

			Object.defineProperty(debug, 'enabled', {
				enumerable: true,
				configurable: false,
				get: () => {
					if (enableOverride !== null) {
						return enableOverride;
					}
					if (namespacesCache !== createDebug.namespaces) {
						namespacesCache = createDebug.namespaces;
						enabledCache = createDebug.enabled(namespace);
					}

					return enabledCache;
				},
				set: v => {
					enableOverride = v;
				}
			});

			// Env-specific initialization logic for debug instances
			if (typeof createDebug.init === 'function') {
				createDebug.init(debug);
			}

			return debug;
		}

		function extend(namespace, delimiter) {
			const newDebug = createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
			newDebug.log = this.log;
			return newDebug;
		}

		/**
		* Enables a debug mode by namespaces. This can include modes
		* separated by a colon and wildcards.
		*
		* @param {String} namespaces
		* @api public
		*/
		function enable(namespaces) {
			createDebug.save(namespaces);
			createDebug.namespaces = namespaces;

			createDebug.names = [];
			createDebug.skips = [];

			let i;
			const split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
			const len = split.length;

			for (i = 0; i < len; i++) {
				if (!split[i]) {
					// ignore empty strings
					continue;
				}

				namespaces = split[i].replace(/\*/g, '.*?');

				if (namespaces[0] === '-') {
					createDebug.skips.push(new RegExp('^' + namespaces.slice(1) + '$'));
				} else {
					createDebug.names.push(new RegExp('^' + namespaces + '$'));
				}
			}
		}

		/**
		* Disable debug output.
		*
		* @return {String} namespaces
		* @api public
		*/
		function disable() {
			const namespaces = [
				...createDebug.names.map(toNamespace),
				...createDebug.skips.map(toNamespace).map(namespace => '-' + namespace)
			].join(',');
			createDebug.enable('');
			return namespaces;
		}

		/**
		* Returns true if the given mode name is enabled, false otherwise.
		*
		* @param {String} name
		* @return {Boolean}
		* @api public
		*/
		function enabled(name) {
			if (name[name.length - 1] === '*') {
				return true;
			}

			let i;
			let len;

			for (i = 0, len = createDebug.skips.length; i < len; i++) {
				if (createDebug.skips[i].test(name)) {
					return false;
				}
			}

			for (i = 0, len = createDebug.names.length; i < len; i++) {
				if (createDebug.names[i].test(name)) {
					return true;
				}
			}

			return false;
		}

		/**
		* Convert regexp to namespace
		*
		* @param {RegExp} regxep
		* @return {String} namespace
		* @api private
		*/
		function toNamespace(regexp) {
			return regexp.toString()
				.substring(2, regexp.toString().length - 2)
				.replace(/\.\*\?$/, '*');
		}

		/**
		* Coerce `val`.
		*
		* @param {Mixed} val
		* @return {Mixed}
		* @api private
		*/
		function coerce(val) {
			if (val instanceof Error) {
				return val.stack || val.message;
			}
			return val;
		}

		/**
		* XXX DO NOT USE. This is a temporary stub function.
		* XXX It WILL be removed in the next major release.
		*/
		function destroy() {
			console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
		}

		createDebug.enable(createDebug.load());

		return createDebug;
	}

	var common = setup;

	/* eslint-env browser */

	(function (module, exports) {
		/**
		 * This is the web browser implementation of `debug()`.
		 */

		exports.formatArgs = formatArgs;
		exports.save = save;
		exports.load = load;
		exports.useColors = useColors;
		exports.storage = localstorage();
		exports.destroy = (() => {
			let warned = false;

			return () => {
				if (!warned) {
					warned = true;
					console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
				}
			};
		})();

		/**
		 * Colors.
		 */

		exports.colors = [
			'#0000CC',
			'#0000FF',
			'#0033CC',
			'#0033FF',
			'#0066CC',
			'#0066FF',
			'#0099CC',
			'#0099FF',
			'#00CC00',
			'#00CC33',
			'#00CC66',
			'#00CC99',
			'#00CCCC',
			'#00CCFF',
			'#3300CC',
			'#3300FF',
			'#3333CC',
			'#3333FF',
			'#3366CC',
			'#3366FF',
			'#3399CC',
			'#3399FF',
			'#33CC00',
			'#33CC33',
			'#33CC66',
			'#33CC99',
			'#33CCCC',
			'#33CCFF',
			'#6600CC',
			'#6600FF',
			'#6633CC',
			'#6633FF',
			'#66CC00',
			'#66CC33',
			'#9900CC',
			'#9900FF',
			'#9933CC',
			'#9933FF',
			'#99CC00',
			'#99CC33',
			'#CC0000',
			'#CC0033',
			'#CC0066',
			'#CC0099',
			'#CC00CC',
			'#CC00FF',
			'#CC3300',
			'#CC3333',
			'#CC3366',
			'#CC3399',
			'#CC33CC',
			'#CC33FF',
			'#CC6600',
			'#CC6633',
			'#CC9900',
			'#CC9933',
			'#CCCC00',
			'#CCCC33',
			'#FF0000',
			'#FF0033',
			'#FF0066',
			'#FF0099',
			'#FF00CC',
			'#FF00FF',
			'#FF3300',
			'#FF3333',
			'#FF3366',
			'#FF3399',
			'#FF33CC',
			'#FF33FF',
			'#FF6600',
			'#FF6633',
			'#FF9900',
			'#FF9933',
			'#FFCC00',
			'#FFCC33'
		];

		/**
		 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
		 * and the Firebug extension (any Firefox version) are known
		 * to support "%c" CSS customizations.
		 *
		 * TODO: add a `localStorage` variable to explicitly enable/disable colors
		 */

		// eslint-disable-next-line complexity
		function useColors() {
			// NB: In an Electron preload script, document will be defined but not fully
			// initialized. Since we know we're in Chrome, we'll just detect this case
			// explicitly
			if (typeof window !== 'undefined' && window.process && (window.process.type === 'renderer' || window.process.__nwjs)) {
				return true;
			}

			// Internet Explorer and Edge do not support colors.
			if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
				return false;
			}

			// Is webkit? http://stackoverflow.com/a/16459606/376773
			// document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
			return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
				// Is firebug? http://stackoverflow.com/a/398120/376773
				(typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
				// Is firefox >= v31?
				// https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
				(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
				// Double check webkit in userAgent just in case we are in a worker
				(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
		}

		/**
		 * Colorize log arguments if enabled.
		 *
		 * @api public
		 */

		function formatArgs(args) {
			args[0] = (this.useColors ? '%c' : '') +
				this.namespace +
				(this.useColors ? ' %c' : ' ') +
				args[0] +
				(this.useColors ? '%c ' : ' ') +
				'+' + module.exports.humanize(this.diff);

			if (!this.useColors) {
				return;
			}

			const c = 'color: ' + this.color;
			args.splice(1, 0, c, 'color: inherit');

			// The final "%c" is somewhat tricky, because there could be other
			// arguments passed either before or after the %c, so we need to
			// figure out the correct index to insert the CSS into
			let index = 0;
			let lastC = 0;
			args[0].replace(/%[a-zA-Z%]/g, match => {
				if (match === '%%') {
					return;
				}
				index++;
				if (match === '%c') {
					// We only are interested in the *last* %c
					// (the user may have provided their own)
					lastC = index;
				}
			});

			args.splice(lastC, 0, c);
		}

		/**
		 * Invokes `console.debug()` when available.
		 * No-op when `console.debug` is not a "function".
		 * If `console.debug` is not available, falls back
		 * to `console.log`.
		 *
		 * @api public
		 */
		exports.log = console.debug || console.log || (() => {});

		/**
		 * Save `namespaces`.
		 *
		 * @param {String} namespaces
		 * @api private
		 */
		function save(namespaces) {
			try {
				if (namespaces) {
					exports.storage.setItem('debug', namespaces);
				} else {
					exports.storage.removeItem('debug');
				}
			} catch (error) {
				// Swallow
				// XXX (@Qix-) should we be logging these?
			}
		}

		/**
		 * Load `namespaces`.
		 *
		 * @return {String} returns the previously persisted debug modes
		 * @api private
		 */
		function load() {
			let r;
			try {
				r = exports.storage.getItem('debug');
			} catch (error) {
				// Swallow
				// XXX (@Qix-) should we be logging these?
			}

			// If debug isn't set in LS, and we're in Electron, try to load $DEBUG
			if (!r && typeof process !== 'undefined' && 'env' in process) {
				r = process.env.DEBUG;
			}

			return r;
		}

		/**
		 * Localstorage attempts to return the localstorage.
		 *
		 * This is necessary because safari throws
		 * when a user disables cookies/localstorage
		 * and you attempt to access it.
		 *
		 * @return {LocalStorage}
		 * @api private
		 */

		function localstorage() {
			try {
				// TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
				// The Browser also has localStorage in the global context.
				return localStorage;
			} catch (error) {
				// Swallow
				// XXX (@Qix-) should we be logging these?
			}
		}

		module.exports = common(exports);

		const {formatters} = module.exports;

		/**
		 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
		 */

		formatters.j = function (v) {
			try {
				return JSON.stringify(v);
			} catch (error) {
				return '[UnexpectedJSONParseError]: ' + error.message;
			}
		}; 
	} (browser, browser.exports));

	var browserExports = browser.exports;
	var Debug = /*@__PURE__*/getDefaultExportFromCjs(browserExports);

	/**
	 * All the different datasources will be extending this class
	 */
	class DataSource {

	  /**
	   * @returns {string}
	   */
	  type() {
	    throw new Error("not implemented")
	  }

	  /**
	   * To be called with the sieveOpts and the required params depending on the
	   * type of the datasource
	   */
	  async handle(sieveOpts, datasourceParams, configuration) {
	  }

	}

	const SSL_ERROR_CODES = [
	  'CERT_HAS_EXPIRED',
	  'CERT_UNTRUSTED',
	  'ERR_TLS_CERT_ALTNAME_INVALID',
	  'DEPTH_ZERO_SELF_SIGNED_CERT',
	  'DEPTH_ZERO_SELF_SIGNED_CERT',
	  'SELF_SIGNED_CERT_IN_CHAIN',
	  'EPROTO',
	];

	const ErrNoConnectionMsg = 'Unable to connected to internet';
	const ErrRequestTimeoutMsg = 'Request timed out';

	class BaseError extends Error {
	  constructor(message, code, details = null) {
	    super(message);
	    this.code = code;
	    this.details = details;
	  }

	  toJSON() {
	    return {
	      name: this.constructor.name,
	      code: this.code,
	      message: this.message,
	      details: this.details
	    }
	  }
	}


	const ErrInvalidParamsPassed = 'E_INVALID_PARAMS';

	class ErrInvalidParams extends BaseError {
	  constructor(message = 'invalid params passed', code = ErrInvalidParamsPassed) {
	    super(message, code);
	  }
	}

	class RequestError extends BaseError {

	  constructor(e, detail) {
	    const errorCode = getFetchErrorCode(e);
	    super(e.message, errorCode, detail);
	    this.retryable = isRetryable(errorCode);
	  }

	  toJSON() {
	    return {
	      ...super.toJSON(),
	      retryable: this.retryable,
	    }
	  }
	}

	function getFetchErrorCode(e) {
	  let code = e.errno;
	  if ((code === 'FETCH_ERROR' && e.type === 'request-timeout') ||
	    code === 'ERR_SOCKET_TIMEOUT') {
	    code = 'ETIMEDOUT';
	  } else if (SSL_ERROR_CODES.includes(code)) {
	    code = 'ESSLCERT';
	  }
	  return code || e.message;
	}

	/**
	 * @param {string} errorCode
	 */
	function isRetryable(errorCode) {
	  switch (errorCode) {
	    case 'ERR_SOCKET_TIMEOUT':
	    case 'ETIMEDOUT':
	      return true
	  }

	  return false
	}

	function prepareHeaders(headersFromOpts) {
	  const headers = {};
	  if (!headersFromOpts) {
	    return headers
	  }
	  headersFromOpts
	    .filter(([name, val]) => {
	      return !!name
	    })
	    .forEach(([name, val]) => {
	      headers[name] = val;
	    });
	  return headers
	}

	const CONTENT_TYPES = {
	  json: 'application/json',
	  urlencoded: 'application/x-www-form-urlencoded',
	};

	const DEFAULT_HEADERS = {
	  // from firefox
	  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
	  'Accept-Encoding': 'gzip, deflate, br',
	  'Accept-Language': 'en-US,en;q=0.5',
	  'Cache-Control': 'no-cache',
	  'DNT': '1',
	  'Sec-Fetch-Dest': 'document',
	  'Sec-Fetch-Mode': 'navigate',
	  'Sec-Fetch-Site': 'none',
	  'Sec-Fetch-User': '?1',
	  'Upgrade-Insecure-Requests': '1',
	  // TODO fetch from a web service?
	  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:108.0) Gecko/20100101 Firefox/108.0'
	};

	let fetch, altFetch;

	const registerFetch = ({ fetch: f, altFetch: af }) => {
	  fetch = processFetch(f);
	  if (!af) {
	    altFetch = fetch;
	    return;
	  }
	  altFetch = processFetch(af);
	};

	function processFetch(fetchObj) {
	  if(fetchObj.useWrapper){
	    return fetchWrapper(fetchObj);
	  }else {
	    return fetchObj;
	  }
	}

	function fetchWrapper({ fetch, serializeResponse } = {}) {
	  return async (opts) => {
	    let {
	      uri,
	      config,
	      request
	    } = opts;

	    if (!request) {
	      request = config.request ?? {
	        method: "GET",
	        body: {
	          type: "none"
	        },
	        headers: []
	      };
	    }

	    let { method = 'GET', body, headers, timeout = 60000 } = request;
	    if (!uri) {
	      throw new ErrInvalidParams('a `uri` must be passed ');
	    }

	    const requestHeaders = prepareHeaders(headers);

	    // handle body
	    let encodedBody;
	    if (method != 'GET') {
	      let params,
	        { data, type } = body;
	      requestHeaders['content-type'] = CONTENT_TYPES[body.type];
	      switch (type) {
	        case 'json':
	          encodedBody = JSON.stringify(body.data);
	          break;
	        case 'urlencoded':
	          params = new URLSearchParams();
	          for (let [name, value] of data) {
	            params.append(name, value);
	          }
	          encodedBody = params.toString();
	          break;
	      }
	    }

	    let defaultHeaders;
	    try {
	      defaultHeaders = structuredClone(DEFAULT_HEADERS);
	    } catch (e) {
	      defaultHeaders = JSON.parse(JSON.stringify(DEFAULT_HEADERS));
	    }
	    const res = await fetch({
	      uri,
	      fetchOpts: {
	        method,
	        cache: 'no-cache',
	        headers: {
	          ...defaultHeaders,
	          ...requestHeaders
	        },
	        timeout,
	        body: encodedBody
	      },
	      opts
	    });

	    if (res instanceof Response || serializeResponse) {
	      // fetch Response Object serialization
	      return {
	        url: res.url,
	        status: res.status,
	        statusText: res.statusText,
	        headers: Array.from(res.headers.entries()).reduce((acc, [key, value]) => ((acc[key] = value), acc), {}),
	        text: await res.text()
	      };
	    }
	    return res;
	  };
	}

	/**
	 * @param {{
	 *     status: {
	 *       code: number,
	 *       message?: string
	 *     },
	 *     headers: {
	 *       [key: string]: string
	 *     },
	 *     body?: string
	 *   }} data
	 */
	function shouldRetryUsingAltFetch(data) {
	  return checkCloudflare(data);
	}

	function checkCloudflare(data) {
	  if (data?.status?.code < 400) {
	    return false;
	  }

	  const cloudflareHeaders = Object.keys(data.headers || {})
	    .map((k) => k.toLowerCase())
	    .filter((k) => k === 'cf-ray');

	  return !!cloudflareHeaders && cloudflareHeaders.length > 0;
	}

	/**
	 * @param fetch
	 * @param {{
	 *   proxyGateway: string,
	 *   timeout: number
	 * }}
	 *
	 * @returns true if should retry
	 * @throws if local network is broken
	 */
	async function checkConnectivity({ timeout, proxyGateway } = {}) {
	  const opts = {
	    uri: 'https://1.1.1.1',
	    config: {
	      request: {
	        timeout
	      }
	    }
	  };
	  try {
	    await fetch({
	      ...opts,
	      proxyGateway
	    });
	    return true;
	  } catch (e) {
	    return false;
	  }
	}

	const httpStatusCodes = {
	  100: 'Continue',
	  101: 'Switching Protocols',
	  200: 'OK',
	  201: 'Created',
	  202: 'Accepted',
	  203: 'Non-Authoritative Information',
	  204: 'No Content',
	  205: 'Reset Content',
	  206: 'Partial Content',
	  300: 'Multiple Choices',
	  301: 'Moved Permanently',
	  302: 'Found',
	  303: 'See Other',
	  304: 'Not Modified',
	  305: 'Use Proxy',
	  307: 'Temporary Redirect',
	  400: 'Bad Request',
	  401: 'Unauthorized',
	  402: 'Payment Required',
	  403: 'Forbidden',
	  404: 'Not Found',
	  405: 'Method Not Allowed',
	  406: 'Not Acceptable',
	  407: 'Proxy Authentication Required',
	  408: 'Request Timeout',
	  409: 'Conflict',
	  410: 'Gone',
	  411: 'Length Required',
	  412: 'Precondition Failed',
	  413: 'Request Entity Too Large',
	  414: 'Request-URI Too Long',
	  415: 'Unsupported Media Type',
	  416: 'Requested Range Not Satisfiable',
	  417: 'Expectation Failed',
	  500: 'Internal Server Error',
	  501: 'Not Implemented',
	  502: 'Bad Gateway',
	  503: 'Service Unavailable',
	  504: 'Gateway Timeout',
	  505: 'HTTP Version Not Supported'
	};

	function getStatusText(statusCode) {
	  return httpStatusCodes[statusCode];
	}

	const debug$3 = Debug('ds:json');
	Debug('err:ds:json');

	const JSONType = 'json';

	class JSONDS extends DataSource {
	  type() {
	    return JSONType;
	  }

	  /**
	   * @async
	   * @param {*} opts
	   * @returns
	   * @throws {RequestError}
	   * @throws {Error}
	   */
	  async handle(opts) {
	    debug$3('json.handle', opts);
	    if (opts.getProxy) {
	      opts.proxyGateway = await opts.getProxy(this, {
	        retryCount: opts.retryCount
	      });
	    }
	    let res;
	    let resText;
	    try {
	      res = await fetch(opts);
	      if (shouldRetryUsingAltFetch({ status: { code: res.status }, headers: res.headers })) {
	        res = await altFetch(opts);
	      }
	      resText = res.text;
	      return JSON.parse(resText);
	    } catch (e) {
	      console.error('fetch error', e, e.type, res?.status, resText);
	      const connected = await checkConnectivity();
	      if (!connected) {
	        e.message = ErrNoConnectionMsg;
	      } else if (e.message === 'TIMEOUT') {
	        e.message = ErrRequestTimeoutMsg;
	      }
	      throw new RequestError(e, { uri: opts.uri, request: opts.request, text: resText });
	    }
	  }
	}

	const debug$2 = Debug('ds:uptime');
	Debug('err:ds:uptime');

	const ERR_STATUS_PROXY_AUTH = 407;

	const UptimeType = 'uptime';

	class UptimeDS extends DataSource {
	  type() {
	    return UptimeType;
	  }

	  /**
	   * @param {{
	   *   id: string,
	   *   uri: string,
	   *   config: {
	   *     request: {
	   *       method: string,
	   *       body: {
	   *         data: any,
	   *         type: string
	   *       },
	   *       headers: [],
	   *       timeout: number
	   *     }
	   *   },
	   *   retryCount: number,
	   *   getProxy: (datasource:DataSource, options:{retryCount: number}) => Promise<string | false>,
	   *   proxyGateway: string | false,
	   * }} opts
	   */
	  async handle(opts) {
	    opts = { retryCount: 0, ...opts };
	    debug$2('uptime.handle', opts);
	    if (opts.getProxy) {
	      opts.proxyGateway = await opts.getProxy(this, {
	        retryCount: opts.retryCount
	      });
	    }
	    let data = await this._handle(opts, { useAltFetch: false });
	    const { code } = data.status;
	    if (code === ERR_STATUS_PROXY_AUTH || code === 0) {
	      debug$2('retrying on error:', opts.id, data.status);
	      // beforeRetry
	      const connected = await checkConnectivity({
	        timeout: opts.config?.request?.timeout || 60000
	      });

	      if (!connected) {
	        throw new RequestError({ message: ErrNoConnectionMsg });
	      }

	      let proxyActive = false;
	      if (opts.proxyGateway) {
	        proxyActive = await checkConnectivity({
	          proxyGateway: opts.proxyGateway,
	          timeout: opts.config?.request?.timeout || 60000
	        });
	      }

	      if (!proxyActive) {
	        opts.retryCount++;
	        opts.proxyGateway = false;
	        data = this._handle(opts);
	      }
	    } else if (shouldRetryUsingAltFetch(data)) {
	      return await this._handle(opts, { useAltFetch: true });
	    }
	    return data;
	  }

	  /**
	   * @async
	   * @returns {Promise<{
	   *     status: {
	   *       code: number,
	   *       message: string
	   *     },
	   *     headers: {
	   *       [key: string]: string
	   *     },
	   *     body: string
	   *   }>}
	   */
	  async _handle(opts, { useAltFetch = false } = {}) {
	    let data = { status: {}, headers: {}, body: null };
	    try {
	      let res;
	      if (!useAltFetch) {
	        res = await fetch(opts);
	      } else {
	        res = await altFetch(opts);
	      }

	      data.status.code = res.status;
	      data.status.message = res.statusText || getStatusText(res.status);
	      data.headers = res.headers;
	      data.body = res.text;
	    } catch (e) {
	      data.status.code = 0;
	      let message = getFetchErrorCode(e);
	      if (message === 'TIMEOUT') {
	        message = ErrRequestTimeoutMsg;
	      }
	      data.status.message = message;
	    }
	    return data;
	  }
	}

	const debug$1 = Debug('ds:text');
	const error = Debug('err:ds:text');

	const TextType = 'text';

	class TextDS extends DataSource {
	  type() {
	    return TextType;
	  }

	  /**
	   * @async
	   * @param {*} opts
	   * @returns
	   * @throws {RequestError}
	   * @throws {Error}
	   */
	  async handle(opts) {
	    debug$1('text.handle', opts);
	    if (opts.getProxy) {
	      opts.proxyGateway = await opts.getProxy(this, {
	        retryCount: opts.retryCount
	      });
	    }
	    let res;
	    try {
	      res = await fetch(opts);
	      if (shouldRetryUsingAltFetch({ status: { code: res.status }, headers: res.headers })) {
	        res = await altFetch(opts);
	      }
	      return res;
	    } catch (e) {
	      error('fetch error', e, e.type, res?.status, res?.text);
	      const connected = await checkConnectivity();
	      if (!connected) {
	        e.message = ErrNoConnectionMsg;
	      } else if (e.message === 'TIMEOUT') {
	        e.message = ErrRequestTimeoutMsg;
	      }
	      throw new RequestError(e, { uri: opts.uri, request: opts.request, text: res?.text });
	    }
	  }
	}

	const debug = Debug('datasource');
	Debug('err:datasource');


	const DatasourceType = 'datasourceType';

	const DatasourceTypes = {};

	DatasourceTypes[JSONType] = (...args) => new JSONDS(...args);

	DatasourceTypes[UptimeType] = (...args) => new UptimeDS(...args);

	DatasourceTypes[TextType] = (...args) => new TextDS(...args);

	/**
	 * Returns an instance of the datasource from the datasource type
	 * @throws ErrInvalidParams if there were no matching datasource or if the datasourceType contains invalid value
	 * @returns {DataSource}
	 */
	function findDatasource(type) {
	  if (!type) {
	    throw new ErrInvalidParams('invalid datasource type passed');
	  }

	  if (DatasourceTypes[type]) {
	    return DatasourceTypes[type]();
	  }
	  throw new ErrInvalidParams('no matching datasource found: ' + type);
	}

	async function fetchData({ type, fetchOpts, params, configuration }) {
	  debug('fetchData', { fetchOpts, params, configuration });
	  const datasource = findDatasource(type);
	  return await datasource.handle(fetchOpts, params, configuration);
	}

	var ds = /*#__PURE__*/Object.freeze({
		__proto__: null,
		DatasourceType: DatasourceType,
		fetchData: fetchData,
		findDatasource: findDatasource,
		registerFetch: registerFetch
	});

	function applyFilters(json, filters) {
	  let prev = isArray(json) ? [] : {};
	  let filtersExecuted = [];

	  // When the filter is : ['.'] return the input as it is
	  if (filters.length === 1 && filters[0] === '.') {
	    return json;
	  }
	  let clone = structuredClone(prev);
	  filters.forEach((filter) => {
	    if (!isSubstring(filtersExecuted, filter)) {
	      let operations = getOperationsArray(filter);
	      try {
	        prev = applyFilter(json, operations, prev);
	        clone = structuredClone(prev);
	      } catch (e) {
	        // On error reset to previous output
	        prev = structuredClone(clone);
	      }
	      filtersExecuted.push(filter);
	    }
	  });
	  return prev;
	}

	// Applies a single filter
	function applyFilter(data, operations, prev, explode = false) {
	  let res = prev || {}; // filtered output
	  let temp = res;
	  let key;
	  for (let index = 0; index < operations.length; index++) {
	    let op = operations[index];
	    if (op.includes('[]?')) {
	      if (data === undefined) {
	        throw new Error('Data Undefined');
	      }
	      key = op.split('[]?')[0];
	      if (key) {
	        data = data[key];
	        if (!temp[key]) {
	          temp[key] = [];
	        }
	        temp = temp[key];
	      } else if (!prev) {
	        res = [];
	        temp = res;
	      }

	      if (!operations[index + 1]) {
	        data.forEach((value) => temp.push(value));
	      } else {
	        let ops = operations.splice(index + 1);
	        // Check if subtree already exists from a previous filter
	        if (temp.length !== 0) {
	          // If it does just pass the reference to be updated with new data i.e temp[i]
	          data.forEach((obj, i) => applyFilter(obj, [...ops], temp[i], true));
	        } else {
	          data.forEach((obj) =>
	            temp.push(applyFilter(obj, [...ops], undefined, true))
	          );
	        }
	      }
	    } else if (op !== '') {
	      data = data[op];
	      if (data === undefined) {
	        if (explode) {
	          return res;
	        } else {
	          throw new Error('Data Undefined')
	        }
	      }
	      if (isObject(data) && operations[index + 1]) {
	        if (!temp[op]) {
	          temp[op] = {};
	        }
	        temp = temp[op];
	      } else {
	        temp[op] = data;
	      }
	    }
	  }
	  return res;
	}

	// Split an operation on .
	// Example : ".\"movies\"[]?.\"year\"" -> [ '', 'movies[]?', 'year' ]
	function getOperationsArray(filter) {
	  filter = filter.replace(/"/g, '');
	  return filter.split('.');
	}

	function getType(data) {
	  return Object.prototype.toString.call(data).slice(8, -1);
	}

	function isObject(data) {
	  return Object.prototype.toString.call(data).slice(8, -1) === 'Object';
	}

	function isArray(data) {
	  return getType(data) === 'Array';
	}

	// Checks if any element in arr is a substring of str
	function isSubstring(arr, str) {
	  let res = false;
	  for (let val of arr) {
	    if (str.includes(val)) {
	      res = true;
	      break;
	    }
	  }
	  return res;
	}

	var filters = /*#__PURE__*/Object.freeze({
		__proto__: null,
		applyFilter: applyFilter,
		applyFilters: applyFilters
	});

	var _virtual_index = { ...ds, ...filters };

	return _virtual_index;

}));
