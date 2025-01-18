/**
 * @property checkSubtitles
 * @property noDash
 * @property requires_purchase
 * @property url_encoded_fmt_stream_map
 * @property fmt_url_map
 * @property adaptive_fmts
 * @property errorcode
 * @property swfcfg
 * @property assets
 * @property PLAYER_JS_URL
 * @property dashmpd
 * @property sig
 * @property itag
 * @property size
 * @property length_seconds
 * @property projection_type
 * @property livestream
 * @property live_playback
 */

/**
 * @typedef {{}} YtSignature
 * @property {number} sts
 * @property {string} playerUrl
 * @property {string} [actionList]
 */

const YT = {
    lastSts: ["17463", [["reverse",null],["swap",69],["swap",9],["splice",1]] ],
    _stsIsLoaded: false,
    _lastSignature: null,
    _dashMpdSigR: /(\/s\/([^\/]+))/,
    getYoutubeLinks: function (request, callback) {
        function callback_links(links, title, subtitles, duration) {
            var response = {
                action: request.action,
                extVideoId: request.extVideoId,
                links: links,
                title: title,
                subtitles: subtitles,
                duration: duration,
                checkLinks: null
            };

            return callback(response);
        }
        //console.log(555);
        YT._prepareLastSts().then(function () {
            //console.log(666);
            return YT._getYoutubeLinks(request.url, request.extVideoId, request.checkSubtitles, request.noDash)
                .then(function (result) {
                    callback_links(result.links, result.title, result.subtitles, result.duration);

                }, function (err) {
                    mono.error('_getYoutubeLinks error', err);
                    callback_links(null, '', null, '');
                });
        });
        return true;
    },
    _getYoutubeLinks: function (eurl, id, checkSubtitles, noDash) {
        var self = this;

        if (!eurl) eurl = 'https://www.youtube.com/watch?v=' + id;

        return self._getVideoInfo(id, eurl).then(function (result) {
            var config = result.config;
            var signature = result.signature;
            return self.onGetConfig(id, checkSubtitles, noDash, config, signature);
        });
    },
    _getVideoInfo: function (id, eurl) {
        var self = this;
        var rp = self._rp;
        var getVideoInfo = function (domain, eurl, id, signature) {
            var headers = {};
            if (mono.isChromeMobile) headers['User-Agent'] = mono.getDesktopUa();
            return rp({
                url: 'https://' + domain + '/get_video_info?' + mono.param({
                    video_id: id,
                    eurl: eurl,
                    el: 'info',
                    sts: signature.sts
                }),
                headers: headers
            }).then(function (config) {
                return self._dataStrToObj(config);

            }).then(function (config) {
                if (!config.video_id) throw new Error('Config videoId is empty!');

                return {signature: signature, config: config};
            });
        };
        var getAsJsonPage = function (id) {
            var headers = {};
            if (mono.isChromeMobile) headers['User-Agent'] = mono.getDesktopUa();
            return rp({
                url: 'https://www.youtube.com/watch?' + mono.param({v: id, spf: 'navigate'}),
                headers: headers

            }).then(function (response) {
                var json = JSON.parse(response);
                var jsonList = null;
                json.some(function (item) {
                    if (item.data && item.data.swfcfg) {jsonList = item.data.swfcfg;return true;}
                });
                if (!jsonList) throw new Error('swfcfg is not found');
                if (!jsonList.args || typeof jsonList.args !== 'object') throw new Error('jsonList args is not found!');

                var config = self._decodeParams(jsonList.args);
                if (!config.video_id) throw new Error('Config videoId is empty!');

                var sts = parseInt(jsonList.sts);
                var playerUrl = jsonList.assets && jsonList.assets.js;

                return getSignatureByConfig(config, playerUrl, sts).then(function (signature) {
                    return {config: config, signature: signature}
                });
            });
        };
        var getAsVideoPage = function (id) {
            var headers = {};
            if (mono.isChromeMobile) headers['User-Agent'] = mono.getDesktopUa();
            return rp({
                url: 'https://www.youtube.com/watch?' + mono.param({v: id}),
                headers: headers
            }).then(function (response) {
                var script = mono.getPageScript(response, /ytplayer\.config\s+=\s+/);
                if (!script.length) throw new Error('Video page script is not found!');
                script = script[0];

                var jsonList = mono.findJson(script, [/"video_id":/])[0];
                if (!jsonList) throw new Error('Video page jsonList is not found!');
                if (!jsonList.args || typeof jsonList.args !== 'object') {
                    throw new Error('jsonList args is not found!');
                }

                var config = self._decodeParams(jsonList.args);
                if (!config.video_id) throw new Error('Config videoId is empty!');

                var sts = parseInt(jsonList.sts);
                var playerUrl = jsonList.assets && jsonList.assets.js;

                return getSignatureByConfig(config, playerUrl, sts).then(function (signature) {
                    return {config: config, signature: signature}
                });
            });
        };
        var getSignatureByConfig = function (config, playerUrl, sts) {
            var promise = Promise.resolve(null);

            if (self._getChipedItem(config)) {
                promise = promise.then(function () {
                    if (!playerUrl) throw new Error('Player url is not found!');
                    return self._ytHtml5SigDecipher.dechip(playerUrl, sts);
                });
            }
            return promise;
        };

        return self._getSignature().then(function (signature) {
            return getVideoInfo('www.youtube-nocookie.com', eurl, id, signature).then(function (config) {
                if (config.requires_purchase === '1' ||
                    config.url_encoded_fmt_stream_map === '' ||
                    config.fmt_url_map === '' ||
                    config.adaptive_fmts === '' ||
                    config.errorcode > 0) {
                    throw new Error('Some config keys is bad');
                }
                return config;
            }, function (err) {
                mono.debug('try 1', err);
                throw err;

            }).catch(function () {
                return getVideoInfo('www.youtube.com', eurl, id, signature).catch(function (err) {
                    mono.debug('try 2', err);
                    throw err;
                });
            });

        }).catch(function (err) {
            mono.debug('_getSignature error', err);
            throw err;

        }).catch(function () {
            return getAsJsonPage(id).catch(function (err) {
                mono.debug('try 3', err);
                throw err;
            });

        }).catch(function () {
            return getAsVideoPage(id).catch(function (err) {
                mono.debug('try 4', err);
                throw err;
            });

        }).catch(function () {
            throw new Error('Get config error');

        }).then(function (result) {
            var config = result.config;
            var signature = result.signature;
            return self._testSignature(config, signature).then(function () {
                return {config: config, signature: signature};
            });
        });
    },
    _getSignature: function () {
        const self = this;
        const rp = self._rp;

        if (self._lastSignature && self._lastSignature.expire > parseInt((Date.now() / 1000).toString())) {
            return Promise.resolve(self._lastSignature);
        }

        var headers = {};
        if (mono.isChromeMobile) headers['User-Agent'] = mono.getDesktopUa();

        return rp({
            url: 'https://www.youtube.com/',
            headers: headers

        }).then(function (html) {
            var playerInfo = null;
            try {
                playerInfo = self.getPlayerStsAndUrlFromHtml(html);
            } catch (err) {
                playerInfo = self.getPlayerStsAndUrlFromAuthHtml(html);
            }
            return playerInfo;
        }).then(function (playerInfo) {
            if (!playerInfo.sts) {
                return self._ytHtml5SigDecipher.dechip(playerInfo.playerUrl);
            } else {
                return playerInfo;
            }
        }).then(function (signature) {
            signature.expire = parseInt((Date.now() / 1000).toString()) + 6 * 60 * 60;
            return self._lastSignature = signature;
        });
    },
    getPlayerStsAndUrlFromHtml: function (html) {
        var script = mono.getPageScript(html, /window\.ytplayer\s*=\s*/);
        if (!script.length) throw new Error('Player config is not found');
        script = script[0];

        var jsonList = mono.findJson(script, [/"PLAYER_JS_URL":/]);
        if (!jsonList.length) {
            throw new Error('Player url is not found!');
        }
        jsonList = jsonList[0];

        var playerUrl = jsonList.PLAYER_JS_URL;
        if (!playerUrl) throw new Error('playerUrl is not found');

        return {sts: null, playerUrl: playerUrl};
    },
    getPlayerStsAndUrlFromAuthHtml: function (html) {
        var script = mono.getPageScript(html, /ytplayer\.config\s+=\s+/);
        if (!script.length) throw new Error('Player config script is not found');

        var jsonList = mono.findJson(script[0], [/"assets":/, /"sts":\d+/]);
        if (!jsonList.length) throw new Error('Player config json is not found!');
        jsonList = jsonList[0];

        var playerUrl = jsonList.assets && jsonList.assets.js;
        if (!playerUrl) throw new Error('playerUrl is not found');

        var sts = parseInt(jsonList.sts);

        return {sts: sts, playerUrl: playerUrl};
    },
    _dataStrToObj: function (data) {
        return this._decodeParams(mono.parseUrl(data, {params: true}));
    },
    _decodeParams: function (data) {
        var self = this;
        ['url_encoded_fmt_stream_map', 'adaptive_fmts', 'fmt_url_map'].forEach(function(key) {
            if (data[key]) {
                data[key] = data[key].split(',').map(function(item) {
                    return self._dataStrToObj(item);
                });
            }
        });
        return data;
    },
    _testSignature: function (config, signature) {
        const self = this;
        const rp = self._rp;
        const chipedItem = self._getChipedItem(config);

        if (!chipedItem) return Promise.resolve();

        return Promise.resolve().then(function () {
            if (!signature.actionList) {
                return self._ytHtml5SigDecipher.dechip(signature.playerUrl, signature.sts).then(function (sig) {
                    signature.sts = sig.sts;
                    signature.actionList = sig.actionList;
                    return signature;
                });
            } else {
                return signature;
            }

        }).then(function (signature) {
            var url = null;
            var decodedSignature = self._ytHtml5SigDecipher.applyActions(signature.actionList, chipedItem.s);
            if (chipedItem.getUrl) {
                url = chipedItem.getUrl(decodedSignature);
            } else {
                url = chipedItem.url + '&signature=' + decodedSignature;
            }

            return rp({method: 'HEAD', url: url})
                .then(function () {
                    return self._ytHtml5SigDecipher.saveSignature(signature);
                }, function (err) {
                    if (/403/.test(err.message)) throw err;
                });
        });
    },
    _getChipedItem: function (config) {
        var self = this;
        var chipedItem = null;

        ['url_encoded_fmt_stream_map', 'adaptive_fmts', 'fmt_url_map'].some(function(key) {
            var item = config[key];
            if (!item) return false;

            return item.some(function(subItem) {
                if (subItem.s && subItem.url) {chipedItem = subItem;return true;}
            });
        });

        var dashUrl = config.dashmpd;
        if (!chipedItem && dashUrl) {
            var s = self._dashMpdSigR.exec(dashUrl);
            if (s) {
                chipedItem = {
                    s: s[2],
                    url: dashUrl.replace(s[1], ''),
                    getUrl: function(url, s, signature) {
                        return url.replace(s[1], '/signature/' + signature);
                    }.bind(null, dashUrl, s)
                };
            }
        }

        return chipedItem;
    },
    readFmt: function(links, fmt, signature, titleParam) {
        var self = this;
        var meta = links.meta;

        fmt.forEach(function(item) {
            if (item.stream) {meta.hasStream = 1;return;}

            var url = item.url;
            if (!url) return;

            if (!/([?&])s(ig(nature)?)?=/i.test(url)) {
                if (item.sig) {
                    url += '&signature=' + item.sig;
                } else if (item.signature) {
                    url += '&signature=' + item.signature;
                } else if (item.s) {
                    url += '&signature=' + self._ytHtml5SigDecipher.applyActions(signature.actionList, item.s);
                }
            }
            url = url.replace(/([?&])sig=/i, '$1signature=').replace(/\\u0026/ig, '&');

            var itag = item.itag;
            if (!itag) {
                var m = /(?:[?&])itag=(\d+)/i.exec(url);
                if (m) itag = m[1];
            }
            if (!itag) return;
            if(!/[?&]itag=/i.test(url)) url += '&itag=' + itag;

            url = self._addRateByPass(url);

            var metaItem = meta[itag];
            if (!metaItem) metaItem = meta[itag] = {};

            if (item.fps) metaItem.fps = item.fps;

            if (item.size && /^\d+x\d+$/.test(item.size)) {
                var wh = item.size.split('x');
                metaItem.quality = YT.getDashQuality(wh[0], wh[1]);
            }

            if (item.bitrate) metaItem.bitrate = parseInt(item.bitrate);

            if (item.type) {
                metaItem.type = item.type;
                var codecs = item.type.match(/codecs="([^"]+)"/);
                if (codecs) {
                    metaItem.codecs = codecs[1];
                }
            }
            if (item.projection_type) metaItem.projectionType = parseInt(item.projection_type);
            if (!links[itag]) links[itag] = url + titleParam;
        });
    },
    onGetConfig: function(videoId, checkSubtitles, noDash, config, signature) {
        "use strict";
        var self = this;
        var links = {meta: {}}, title = '', subtitles = null, duration = '', dashUrl = null;

        return Promise.resolve().then(function () {
            duration = config.length_seconds || '';

            title = config.title || '';
            var titleParam = '';
            if (title) {
                title = title.replace(/\+/g, ' ');
                titleParam = '&title=' + encodeURIComponent(mono.fileName.modify(title));
            }

            var fmtMap = config.fmt_url_map || config.url_encoded_fmt_stream_map || [];
            var adaptiveFmts = config.adaptive_fmts || [];

            if (config.livestream || config.live_playback) {
                links.meta.hasStream = 1;
            }

            fmtMap && self.readFmt(links, fmtMap, signature, titleParam);
            adaptiveFmts && self.readFmt(links, adaptiveFmts, signature, titleParam);

            dashUrl = config.dashmpd || '';
            if (dashUrl && dashUrl.indexOf('yt_live_broadcast') !== -1) {
                dashUrl = null;
            }
        }).then(function () {
            var promise = Promise.resolve();

            if(checkSubtitles) {
                promise = promise.then(function () {
                    return new Promise(function (resolve) {
                        self.getYoutubeSubtitles({extVideoId: videoId}, function(subs) {
                            subtitles = subs || null;
                            resolve();
                        });
                    }).catch(function (err) {
                        mono.error('Get subtitles error', err);
                    });
                });
            }

            if (!noDash && dashUrl) {
                promise = promise.then(function () {
                    var dechipedDashUrl = dashUrl;

                    var s = self._dashMpdSigR.exec(dashUrl);
                    if (s) {
                        var sig = self._ytHtml5SigDecipher.applyActions(signature.actionList, s[2]);
                        dechipedDashUrl = dashUrl.replace(s[1], '/signature/' + sig);
                    }

                    dechipedDashUrl = dechipedDashUrl.replace('/sig/', '/signature/');

                    return self.getYouTubeDashLinks(links, dechipedDashUrl).catch(function (err) {
                        mono.error('Get dash error', err);
                    });
                });
            }

            return promise;
        }).then(function () {
            var len = Object.keys(links).length;
            if (links.meta && !links.meta.hasStream)  len--;
            if (!len)  links = null;
            return {links, title, subtitles, duration};
        });
    },
    convertVtt2Srt: function(item, cb) {
        "use strict";
        mono.request({
            url: item.url
        }, function(err, resp, body) {
            if (err || !body) {
                //console.error('Request error!', err);
                return cb();
            }

            var re = /(\d{2}:\d{2}:\d{2})\.(\d{3})/g;
            var validateRe = /^\d{2}:\d{2}:\d{2}\.\d{3}/;
            var arr = body.split('\n\n');

            if (!validateRe.test(arr[0])) arr.shift();
            if (!validateRe.test(arr[arr.length - 1]))  arr.pop();
            var hasSkip = false;
            var srt = arr.filter(function(item) {
                var r = validateRe.test(item);
                if (!r) {
                    hasSkip = true;
                }
                return r;
            }).map(function(item, index) {
                item = item.replace(re, "$1,$2");
                return (index + 1) + '\n' + item;
            });
            srt = srt.join('\n\n');

            if (hasSkip) return cb();
            item.srt = srt;
            item.preprocess = 'srt2url';
            cb();
        });
    },
    getYoutubeSubtitles: function(message, cb) {
        var _this = this;
        var videoId = message.extVideoId;
        var baseUrl = 'http://video.google.com/timedtext';
        mono.request({
            url: baseUrl + '?hl=ru&v=' + videoId + '&type=list&tlangs=1',
            xml: true
        }, function(err, resp, xml) {
            if (err || !xml) return cb();
            var track = xml.querySelectorAll('track');
            var target = xml.querySelectorAll('target');
            var list = [];
            var trackList = {};
            var targetList = {};
            var origTrack = undefined;
            var langCode, param;
            for (var i = 0, item; item = track[i]; i++) {
                langCode = item.getAttribute('lang_code');
                param = {
                    lang: langCode,
                    v: videoId,
                    fmt: 'vtt',
                    name: item.getAttribute('name') || undefined
                };
                trackList[langCode] = {
                    lang: item.getAttribute('lang_translated'),
                    langCode: langCode,
                    url: baseUrl + '?' + mono.param(param),
                    name: param.name
                };
                list.push(trackList[langCode]);
                if (!origTrack && item.getAttribute('cantran')) {
                    origTrack = param;
                }
            }

            if (origTrack) {
                for (i = 0, item; item = target[i]; i++) {
                    langCode = item.getAttribute('lang_code');
                    param = {
                        lang: origTrack.lang,
                        v: videoId,
                        tlang: langCode,
                        fmt: 'vtt',
                        name: origTrack.name
                    };
                    targetList[langCode] = {
                        lang: item.getAttribute('lang_translated'),
                        langCode: langCode,
                        url: baseUrl + '?' + mono.param(param),
                        isAuto: true
                    };
                }
            }

            langCode = mono.getNavigator().language.toLowerCase();
            if (langCode.indexOf('zh-hant') === 0) {
                langCode = 'zh-Hant';
            } else
            if (langCode.indexOf('zh-hans') === 0) {
                langCode = 'zh-Hans';
            }
            var localeList = [langCode];
            if (localeList[0] === 'uk') {
                localeList.push('ru');
            }
            for (let i = 0, item; item = localeList[i]; i++) {
                if (!trackList[item] && targetList[item]) {
                    list.push(targetList[item]);
                }
            }

            var waitCount = 0;
            var readyCount = 0;
            var onReady = function() {
                readyCount++;
                if (waitCount !== readyCount) {
                    return;
                }
                return cb(list);
            };
            waitCount++;
            list.forEach(function(item) {
                waitCount++;
                _this.convertVtt2Srt(item, onReady);
            });
            onReady();
        });
    },
    getYouTubeDashLinks: function(links, dashUrl) {
        var self = this;
        var rp = self._rp;

        var headers = {};
        if (mono.isChromeMobile) {
            headers['User-Agent'] = mono.getDesktopUa();
        }

        return rp({
            url: dashUrl,
            headers: headers,
            xml: true
        }).then(function(xml) {
            self.parseDash(xml, links);
        });
    },
    getDashQuality: function(a, b) {
        var qualityList = {
            144: 144,
            240: 240,
            360: 360,
            480: 480,
            720: 720,
            1080: 1080,
            1440: 1440,
            '4K': 2160,
            '5K': 2880,
            '8K': 4320
        };

        var quality;
        var g = Math.max(a, b);
        a = Math.min(a, b);
        for (var qualityName in qualityList) {
            var value = qualityList[qualityName];
            if (g >= Math.floor(16 * value / 9) || a >= value) {
                quality = qualityName;
            } else {
                return quality;
            }
        }
        return quality;
    },
    parseDash: function(xml, links) {
        var self = this;
        var elList = xml.querySelectorAll('Representation');
        var meta = links.meta = links.meta || {};

        for (var i = 0, el; el = elList[i]; i++) {
            var baseUrlNode = el.querySelector('BaseURL');
            var url = baseUrlNode.textContent;
            if (!url) {
                continue;
            }

            var segmentUrlNode = baseUrlNode.parentNode.querySelector('SegmentURL');
            var segmentUrl = segmentUrlNode && segmentUrlNode.getAttribute('media');
            if (segmentUrl && segmentUrl.indexOf('sq/') === 0) {
                continue;
            }

            var itag = el.getAttribute('id');
            var metaItem = meta[itag];
            if (!metaItem) {
                metaItem = meta[itag] = {};
            }

            url = self._addRateByPass(url);

            var frameRate = el.getAttribute('frameRate');
            if (frameRate) {
                metaItem.fps = frameRate;
            }

            var width = el.getAttribute('width');
            var height = el.getAttribute('height');

            if (width && height) {
                metaItem.quality = YT.getDashQuality(width, height);
            }

            var codecs = el.getAttribute('codecs');
            if (codecs) {
                metaItem.codecs = codecs;
                var type = url.match(/mime=([^&]+)/);
                type = type && type[1];
                if (type) {
                    metaItem.type = type;
                }
            }

            if (!links[itag]) links[itag] = url;
        }
    },
    _addRateByPass: function (url) {
        if (!/ratebypass/.test(url)) {
            if (!/\?/.test(url)) {
                if (!/\/$/.test(url)) {
                    url += '/';
                }
                url += 'ratebypass/yes/'
            } else {
                url += '&ratebypass=yes'
            }
        }
        return url;
    },
    _ytHtml5SigDecipher: {
        applyActions: function (actionList, sig) {
            var actions = {
                slice:function(a,b){a.slice(b)},
                splice:function(a,b){a.splice(0,b)},
                reverse:function(a){a.reverse()},
                swap:function(a,b){var c=a[0];a[0]=a[b%a.length];a[b]=c}
            };
            var parts = sig.split("");
            for (var i = 0, item; item = actionList[i]; i++) {
                actions[item[0]](parts, item[1]);
            }
            return parts.join("");
        },
        readObfFunc: function(func, data) {
            var vList = func.match(/\[(\w+)\]/g);
            if (!vList) {
                return;
            }
            for (var i = 0, v; v = vList[i]; i++) {
                var vv = data.match(new RegExp('[, ]{1}'+ v.slice(1, -1) +'="(\\w+)"'));
                if (vv) {
                    func = func.replace(v, '.'+vv[1]);
                }
            }
            var arr = func.split(';');
            var actList = [];
            for (var i = 0, item; item = arr[i]; i++) {
                if (item.indexOf('.split(') !== -1 || item.indexOf('.join(') !== -1) {
                    continue;
                }
                if (item.indexOf('reverse') !== -1) {
                    actList.push(['reverse', null]);
                    continue;
                }
                var m = item.match(/splice\((\d+)\)/);
                if (m) {
                    m = parseInt(m[1]);
                    if (isNaN(m)) return;
                    actList.push(['splice', m]);
                    continue;
                }
                var m = item.match(/slice\((\d+)\)/);
                if (m) {
                    m = parseInt(m[1]);
                    if (isNaN(m)) return;
                    actList.push(['slice', m]);
                    continue;
                }
                var m = item.match(/\[(\d+)%\w+\.length/);
                if (m) {
                    m = parseInt(m[1]);
                    if (isNaN(m)) return;
                    actList.push(['swap', m]);
                }
            }
            return actList;
        },
        getNewChip: function (data) {
            var getObjPropFn = function (objectName, propName) {
                objectName = objectName.replace(/\$/g, '\\$');
                var placeRe = new RegExp('(?:var |,)?' + objectName + '={');
                var placePos = data.search(placeRe);
                if (placePos === -1) {
                    throw new Error('Place is not found');
                }

                var place = data.substr(placePos, 300);
                propName = propName.replace(/\$/g, '\\$');
                var re = new RegExp(propName + ':function\\(([$\\w,]+)\\){([^}]+)}');
                var m = place.match(re);
                if (!m) {
                    throw new Error('Place function is not found!');
                }

                var args = m[1];
                var statement = m[2];
                return {args: args, statement: statement};
            };
            var readAction = function (item) {
                var m = /([\w$]+)(?:\.([\w$]+)|\[("[\w$]+")\])\([\w$]+,?([\w$]+)?\)/.exec(item);
                if (!m) {
                    throw new Error('readAction');
                }

                var objectName = m[1];
                var propName = m[2] || m[3];
                var arg = m[4];
                var fn = getObjPropFn(objectName, propName);
                if (/\.reverse/.test(fn.statement)) {
                    return ['reverse', null];
                } else {
                    if (!/^[\d]+$/.test(arg)) {
                        throw new Error('Arg is not number');
                    }

                    if (/\.splice/.test(fn.statement)) {
                        return ['splice', parseInt(arg)];
                    } else if (/\.slice/.test(fn.statement)) {
                        return ['slice', parseInt(arg)];
                    } else {
                        return ['swap', parseInt(arg)];
                    }
                }
            };
            var readStatement = function (arg, statement) {
                arg = arg.replace(/\$/g, '\\$');
                var re = new RegExp('[\\w$]+(?:\\.[\\w$]+|\\["[\\w$]+"\\])\\(' + arg + '[^)]*\\)', 'g');
                var actionList = statement.match(re);
                if (!actionList) {
                    throw new Error('readScope');
                }

                return actionList.map(function (item) {
                    return readAction(item);
                });
            };
            var findDecodeFn = function (name) {
                name = name.replace(/\$/g, '\\$');
                var re = new RegExp('(?:function ' + name + '|(?:var |,|;\n)' + name + '=function)\\(([\\w$]+)\\){([^}]*)}[;,]');
                var m = re.exec(data);
                if (!m) {
                    throw new Error('findConvertFn');
                }

                var variable = m[1];
                var statement = m[2];
                return readStatement(variable, statement);
            };

            var stsM = /,sts:(\d+)/.exec(data);
            if (!stsM) {
                throw new Error('Sts is not found');
            }
            var sts = parseInt(stsM[1]);

            var fnName = /[$_a-zA-Z0-9]+\.set\("signature",([$_a-zA-Z0-9]+)\(/.exec(data);
            if (fnName) {
                mono.debug('new chip');
            } else {
                fnName = /(?:function ([$_a-zA-Z0-9]+)|(?:var |,|;\n)([$_a-zA-Z0-9]+)=function)\(([\w$]+)\){\3=\3\.split\([^}]+;return \3\.join\([^}]+}[;,]/.exec(data);
                if (fnName) {
                    mono.debug('alt chip');
                    fnName = [fnName[0], fnName[1] || fnName[2]];
                }
            }
            if (!fnName) {
                throw new Error('Decode function name is not found!');
            }

            var actionList = findDecodeFn(fnName[1]);

            if (!actionList.length) {
                throw new Error('actionList is empty');
            }

            return {
                actionList: actionList,
                sts: sts
            };
        },
        getChip: function(data) {
            var sts = data.match(/,sts:(\d+)/);
            sts = sts && sts[1];

            var actList = [];
            var funcName = data.match(/\.sig\|\|([$_a-zA-Z0-9]+)\(/);
            if (!funcName) {
                return this.getNewChip(data);
            } else {
                mono.debug('old chip');
            }
            funcName = funcName[1];
            funcName = funcName.replace(/\$/g, '\\$');
            var func = data.match(new RegExp("((?:function "+funcName+"|(?:var |,|;\n)"+funcName+"=function)\\(([\\w$]+)\\){[^}]*})[;,]"));
            if (!func) {
                throw new Error('Func is not found!');
            }
            var vName = func[2];
            func = func[1];
            var regexp = new RegExp("[\\w$]+\\.[\\w$]+\\("+vName+"[^)]*\\)", 'g');
            var sFuncList = func.match(regexp);
            if (!sFuncList) {
                actList = this.readObfFunc(func, data);
                if (actList && actList.length > 0) {
                    return {
                        actionList: actList,
                        sts: sts
                    };
                }
                throw new Error('readObfFunc actions is not found');
            }
            var objName = '';
            var objElList = [];
            for (var i = 0, item; item = sFuncList[i]; i++) {
                var m = item.match(/([\w$]+)\.([\w$]+)\([\w$]+,?([\w$]+)?\)/);
                if (m) {
                    objName = m[1];
                    objElList.push({name: m[2], arg: parseInt(m[3])});
                }
            }
            var sPos = data.indexOf('var '+objName+'={');
            if (sPos === -1) {
                sPos = data.indexOf(','+objName+'={');
            }
            if (sPos === -1) {
                sPos = data.indexOf(objName+'={');
            }
            var place = data.substr(sPos, 300);
            for (i = 0, item; item = objElList[i]; i++) {
                const vName = item.name;
                regexp = new RegExp(vName+":(function\\([$\\w,]+\\){[^}]+})");
                var sF = place.match(regexp);
                if (!sF) {
                    throw new Error('Match fn error');
                }
                sF = sF[1];
                if (sF.indexOf('splice') !== -1) {
                    if (isNaN(item.arg)) {
                        throw new Error('Match splice error');
                    }
                    actList.push(['splice', item.arg]);
                } else
                if (sF.indexOf('slice') !== -1) {
                    if (isNaN(item.arg)) {
                        throw new Error('Match slice error');
                    }
                    actList.push(['slice', item.arg]);
                } else
                if (sF.indexOf('reverse') !== -1) {
                    item.arg = null;
                    actList.push(['reverse', item.arg]);
                } else {
                    if (isNaN(item.arg)) {
                        throw new Error('Match reverse error');
                    }
                    actList.push(['swap', item.arg]);
                }
            }
            return {
                actionList: actList,
                sts: sts
            };
        },
        getPlayer: function(url) {
            if (url.substr(0, 2) === '//') url = 'https:' + url;
            else if (url[0] === '/') url = 'https://www.youtube.com' + url;
            var headers = {};
            if (mono.isChromeMobile) headers['User-Agent'] = mono.getDesktopUa();

            var rp = YT._rp;
            return rp({url: url, headers: headers});
        },
        playerUrlSts: {},
        storage: {},
        saveSignature: function (signature) {
            var self = this;

            if (!self.playerUrlSts[signature.playerUrl]) {
                self.playerUrlSts[signature.playerUrl] = signature.sts;
            }

            var existsActionList = self.storage[signature.sts];
            if (!existsActionList || JSON.stringify(existsActionList) !== JSON.stringify(signature.actionList)) {
                Object.keys(self.storage).sort(function(a, b) {
                    return a < b ? 1 : -1
                }).slice(3).forEach(function (key) {
                    delete self.storage[key];
                });

                if (signature.sts && signature.actionList) {
                    self.storage[signature.sts] = signature.actionList;
                }

                return new Promise(function (resolve) {
                    mono.storage.set({ytDechipList: self.storage}, resolve);
                });
            }
        },
        isTrackError: {},
        dechip: function(playerUrl, sts) {
            var self = this;

            if (!sts) sts = self.playerUrlSts[playerUrl];
            var cache = self.storage[sts];
            if (cache) {
                return Promise.resolve({sts: sts, actionList: cache, playerUrl: playerUrl});
            }

            return self.getPlayer(playerUrl).then(function (response) {
                return self.getChip(response);
            }).then(function (result) {
                return {
                    sts: result.sts,
                    actionList: result.actionList,
                    playerUrl: playerUrl
                };
            }).catch(function (err) {
                var sigUrl = '';
                var m = /\/(?:[^\/]+)?player-([^\/]+)\//.exec(playerUrl);
                if (m) {
                    sigUrl = m[1];
                } else {
                    sigUrl = 'unknownPlayerName';
                }
                if (!self.isTrackError[sigUrl]) self.isTrackError[sigUrl] = 1;
                throw err;
            });
        }
    },
    _prepareLastSts: function () {
        var _this = this;
        
        if (_this._stsIsLoaded) {
            return Promise.resolve();
        }
        _this._stsIsLoaded = true;

        return new Promise(function (resolve) {
            mono.storage.get('ytDechipList', resolve);
        }).then(function (storage) {
            var stsObj = storage.ytDechipList || {};
            _this._ytHtml5SigDecipher.storage = stsObj;

            var inlineSts = _this.lastSts;
            var inlineStsNum = inlineSts[0];
            stsObj[inlineStsNum] = inlineSts[1];

            var lastStsNum = Object.keys(stsObj).sort(function(a, b) {
                return a < b ? 1 : -1
            }).shift();
            var lastStsActions = stsObj[lastStsNum];

            if (inlineStsNum < lastStsNum) {
                _this.lastSts[0] = lastStsNum;
                _this.lastSts[1] = lastStsActions;
            }
        });
    },
    _rp: function (options) {
        return new Promise(function (resolve, reject) {
            mono.request(options, function (err, resp, data) {
                if (err && typeof err === 'string') {
                    err = new Error(err);
                }
                err ? reject(err) : resolve(data);
            });
        });
    }
};