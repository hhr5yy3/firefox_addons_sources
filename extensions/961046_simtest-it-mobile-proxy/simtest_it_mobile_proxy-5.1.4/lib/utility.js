    /**
     * String
     *
     * @type {{strReplace: Function, getUrlVars: Function, rtrim: Function, parseUrl: Function}}
     */
    const Str = {
        /**
         * Replace string
         *
         * @param search
         * @param replace
         * @param subject
         * @param count
         * @returns {*}
         */
        strReplace: function (search, replace, subject, count) {
            var i    = 0,
                j    = 0,
                temp = '',
                repl = '',
                sl   = 0,
                fl   = 0,
                f    = [].concat(search),
                r    = [].concat(replace),
                s    = subject,
                ra   = Object.prototype.toString.call(r) === '[object Array]',
                sa   = Object.prototype.toString.call(s) === '[object Array]';
            s        = [].concat(s);
            if (count) {
                this.window[count] = 0;
            }

            for (i = 0, sl = s.length; i < sl; i++) {
                if (s[i] === '') {
                    continue;
                }
                for (j = 0, fl = f.length; j < fl; j++) {
                    temp = s[i] + '';
                    repl = ra ? (r[j] !== undefined ? r[j] : '') : r[0];
                    s[i] = (temp)
                        .split(f[j])
                        .join(repl);
                    if (count && s[i] !== temp) {
                        this.window[count] += (temp.length - s[i].length) / f[j].length;
                    }
                }
            }
            return sa ? s : s[0];
        },

        /**
         * Get URL variables
         *
         * @param url
         * @returns {{}}
         */
        getUrlVars: function (url) {
            var vars  = {};
            var parts = url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
                vars[key] = value;
            });
            return vars;
        },

        rtrim: function (str, charlist) {
            charlist = !charlist ? ' \\s\u00A0' : (charlist + '')
                .replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g, '\\$1');
            var re   = new RegExp('[' + charlist + ']+$', 'g');
            return (str + '')
                .replace(re, '');
        },

        validateParts: function(parts) {
            for (var i = 0; i < parts.length; ++i) {
                if (!this.isPositiveInteger(parts[i])) {
                    return false;
                }
            }
            return true;
        },

        isPositiveInteger: function(x) {
            return /^\d+$/.test(x);
        },

        compareVersionNumbers: function(v1, v2) {
            var v1parts = v1.split('.');
            var v2parts = v2.split('.');

            // First, validate both numbers are true version numbers
            if (!this.validateParts(v1parts) || !this.validateParts(v2parts)) {
                return NaN;
            }

            for (var i = 0; i < v1parts.length; ++i) {
                if (v2parts.length === i) {
                    return 1;
                }

                if (v1parts[i] === v2parts[i]) {
                    continue;
                }
                if (v1parts[i] > v2parts[i]) {
                    return 1;
                }
                return -1;
            }

            if (v1parts.length != v2parts.length) {
                return -1;
            }

            return 0;
        },

        /**
         * Parse url by string
         *
         * @param str
         * @param component
         * @returns {*}
         */
        parseUrl: function (str, component) {

            var query, key = ['source', 'scheme', 'authority', 'userInfo', 'user', 'pass', 'host', 'port',
                              'relative', 'path', 'directory', 'file', 'query', 'fragment'
                ],
                ini        = {},
                mode       = 'php',
                parser     = {
                    php   : /^(?:([^:\/?#]+):)?(?:\/\/()(?:(?:()(?:([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?()(?:(()(?:(?:[^?#\/]*\/)*)()(?:[^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
                    strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
                    loose : /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/\/?)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/ // Added one optional slash to post-scheme to catch file:/// (should restrict this)
                };

            var m   = parser[mode].exec(str),
                uri = {},
                i   = 14;
            while (i--) {
                if (m[i]) {
                    uri[key[i]] = m[i];
                }
            }

            if (component) {
                return uri[component.replace('PHP_URL_', '')
                    .toLowerCase()];
            }
            if (mode !== 'php') {
                var name  = (ini['phpjs.parse_url.queryKey'] &&
                             ini['phpjs.parse_url.queryKey'].local_value) || 'queryKey';
                parser    = /(?:^|&)([^&=]*)=?([^&]*)/g;
                uri[name] = {};
                query     = uri[key[12]] || '';
                query.replace(parser, function ($0, $1, $2) {
                    if ($1) {
                        uri[name][$1] = $2;
                    }
                });
            }
            delete uri.source;

            if (uri.hasOwnProperty('host')) {
                uri.domain = this.strReplace('www.', '', uri.host);
            }

            return uri;
        },

        startsWith: function (str, prefix) {
            return str.indexOf(prefix) === 0;
        },

        endsWith: function (str, suffix) {
            return str.match(suffix + "$") == suffix;
        }
    };

    const Arr = {
        groupBy : function(xs, key) {
            return xs.reduce(function(rv, x) {
                (rv[x[key]] = rv[x[key]] || []).push(x);
                return rv;
            }, {});
        },
    };

    const Debug  = {

        enable: function() {
            this.enabled = true;
        },
        disable: function() {
            this.enabled = false;
        },

        log : function() {
            if (!this.enabled) return;
            window.console.log.apply(null, arguments);
        },
        error : function() {
            if (!this.enabled) return;
            window.console.error.apply(null, arguments);
        },
        info : function() {
            if (!this.enabled) return;
            window.console.info.apply(null, arguments);
        },
        warn : function() {
            if (!this.enabled) return;
            window.console.warn.apply(null, arguments);
        },
        exception : function() {
            if (!this.enabled) return;
            window.console.exception.apply(null, arguments);
        },
    };


    /**
     * Notifications proxy wrapper. It uses browser notification engine
     *
     * @type {{_do: Function, info: Function, error: Function}}
     */
    const Notify = {
        /**
         * Execute notification
         *
         * @param title
         * @param content
         * @param type
         * @returns {*}
         * @private
         */
        _do: function (title, content, type) {
            // TODO see with PM if we need icon
            browser.notifications.create(
                {
                    "type"   : 'basic',
                    //"iconUrl": browser.extension.getURL("icons/link-48.png"),
                    "title"  : title,
                    "message": content
                }
            );
        },

        /**
         * Notify info message
         *
         * @param text
         * @returns {*}
         */
        info: function (text) {
            return this._do('Info', text, 'basic');
        },

        /**
         * Notify Error message
         *
         * @param text
         * @returns {*}
         */
        error: function (text) {
            return this._do('Error', text, 'error');
        }
    };

