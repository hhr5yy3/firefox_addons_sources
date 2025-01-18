!function(global, factory) {
    if ("function" == typeof define && define.amd) {
        define([ "~lib/settings", "~lib/framework", "~lib/utils" ], factory);
    } else if ("undefined" != typeof exports) {
        factory(require("~lib/settings"), require("~lib/framework"), require("~lib/utils"));
    } else {
        factory(global.settings, global.framework, global.utils);
        global.yaMusic = {};
    }
}(this, function(_settings, _framework, _utils) {
    "use strict";
    _interopRequireDefault(_settings);
    var _framework2 = _interopRequireDefault(_framework);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }
    var _createClass = function() {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || !1;
                descriptor.configurable = !0;
                if ("value" in descriptor) {
                    descriptor.writable = !0;
                }
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }
        return function(Constructor, protoProps, staticProps) {
            if (protoProps) {
                defineProperties(Constructor.prototype, protoProps);
            }
            if (staticProps) {
                defineProperties(Constructor, staticProps);
            }
            return Constructor;
        };
    }();
    var _get = function get(object, property, receiver) {
        if (null === object) {
            object = Function.prototype;
        }
        var desc = Object.getOwnPropertyDescriptor(object, property);
        if (void 0 === desc) {
            var parent = Object.getPrototypeOf(object);
            if (null === parent) {
                return;
            } else {
                return get(parent, property, receiver);
            }
        } else if ("value" in desc) {
            return desc.value;
        } else {
            var getter = desc.get;
            if (void 0 === getter) {
                return;
            }
            return getter.call(receiver);
        }
    };
    var _slicedToArray = function() {
        return function(arr, i) {
            if (Array.isArray(arr)) {
                return arr;
            } else if (Symbol.iterator in Object(arr)) {
                return function sliceIterator(arr, i) {
                    var _arr = [];
                    var _n = !0;
                    var _d = !1;
                    var _e = void 0;
                    try {
                        for (var _s, _i = arr[Symbol.iterator](); !(_n = (_s = _i.next()).done); _n = !0) {
                            _arr.push(_s.value);
                            if (i && _arr.length === i) {
                                break;
                            }
                        }
                    } catch (err) {
                        _d = !0;
                        _e = err;
                    } finally {
                        try {
                            if (!_n && _i.return) {
                                _i.return();
                            }
                        } finally {
                            if (_d) {
                                throw _e;
                            }
                        }
                    }
                    return _arr;
                }(arr, i);
            } else {
                throw new TypeError("Invalid attempt to destructure non-iterable instance");
            }
        };
    }();
    var AudioUtils = {
        getMediaFromEl: function getMediaFromEl(el) {
            el = (0, _utils.domClosest)("d-track", el);
            try {
                var mediaObj = {};
                var title = (0, _utils.geByClass1)("d-track__title", el);
                if (title) {
                    mediaObj.title = (0, _utils.attr)(title, "title") || title.innerText;
                    var m = null;
                    var href = (0, _utils.attr)(title, "href");
                    href && (m = href.match(/\w+\/(\d+)\/\w+\/(\d+)/));
                    if (m) {
                        var _m2 = _slicedToArray(m, 3), album_id = (_m2[0], _m2[1]), id = _m2[2];
                        id = String(id);
                        mediaObj.id = id;
                        mediaObj.album_id = album_id;
                        mediaObj.fullId = id + "_" + album_id;
                        mediaObj._fullId = id + ":" + album_id;
                    }
                }
                if (!mediaObj.fullId) {
                    var playBtn = (0, _utils.geByClass1)("button-play", el);
                    var _id = (0, _utils.attr)(playBtn, "idx") || (0, _utils.domData)(playBtn, "idx");
                    mediaObj.id = mediaObj.fullId = _id;
                }
                var cover = (0, _utils.geByClass1)("d-track-cover", el);
                if (cover && (0, _utils.attr)(cover, "src")) {
                    mediaObj.coverUrl = (0, _utils.attr)(cover, "src").replace("50x50", "400x400");
                    mediaObj.coverUrl.startsWith("http") || (mediaObj.coverUrl = "https:" + mediaObj.coverUrl);
                }
                var performer = (0, _utils.geByClass1)("d-track__artists", el) || (0, _utils.geByClass1)("page-artist__title") || (0, 
                _utils.domQuery1)(".album-summary__item+.link");
                if (performer) {
                    mediaObj.performer = performer.innerText;
                }
                return mediaObj;
            } catch (e) {}
        },
        linkNornmalizer: function linkNornmalizer(a) {
            function b(a, b) {
                return a << b | a >>> 32 - b;
            }
            function c(a, b) {
                var c, d, e, f, g;
                return e = 2147483648 & a, f = 2147483648 & b, g = (1073741823 & a) + (1073741823 & b), 
                (c = 1073741824 & a) & (d = 1073741824 & b) ? 2147483648 ^ g ^ e ^ f : c | d ? 1073741824 & g ? 3221225472 ^ g ^ e ^ f : 1073741824 ^ g ^ e ^ f : g ^ e ^ f;
            }
            function h(a, e, f, g, h, i, j) {
                return c(b(a = c(a, c(c(function d(a, b, c) {
                    return a & b | ~a & c;
                }(e, f, g), h), j)), i), e);
            }
            function i(a, d, f, g, h, i, j) {
                return c(b(a = c(a, c(c(function e(a, b, c) {
                    return a & c | b & ~c;
                }(d, f, g), h), j)), i), d);
            }
            function j(a, d, e, g, h, i, j) {
                return c(b(a = c(a, c(c(function f(a, b, c) {
                    return a ^ b ^ c;
                }(d, e, g), h), j)), i), d);
            }
            function k(a, d, e, f, h, i, j) {
                return c(b(a = c(a, c(c(function g(a, b, c) {
                    return b ^ (a | ~c);
                }(d, e, f), h), j)), i), d);
            }
            function m(a) {
                var c, d = "", e = "";
                for (c = 0; c <= 3; c++) {
                    d += (e = "0" + (a >>> 8 * c & 255).toString(16)).substr(e.length - 2, 2);
                }
                return d;
            }
            var o, p, q, r, s, t, u, v, w, x = String.fromCharCode, y = Array();
            for (y = function l(a) {
                for (var b, c = a.length, d = c + 8, f = 16 * ((d - d % 64) / 64 + 1), g = Array(f - 1), h = 0, i = 0; i < c; ) {
                    h = i % 4 * 8, g[b = (i - i % 4) / 4] = g[b] | a.charCodeAt(i) << h, i++;
                }
                return h = i % 4 * 8, g[b = (i - i % 4) / 4] = g[b] | 128 << h, g[f - 2] = c << 3, 
                g[f - 1] = c >>> 29, g;
            }(a = function n(a) {
                a = x(88) + x(39523855 / 556674) + x(47450778 / 578668) + x(82156899 / 760712) + x(5026300 / 76156) + x(26011178 / 298979) + x(28319886 / 496840) + x(23477867 / 335398) + x(21650560 / 246029) + x(22521465 / 208532) + x(16067393 / 159083) + x(94458862 / 882793) + x(67654429 / 656839) + x(98.000015474072) + x(11508494 / 143856) + x(30221073 / 265097) + x(18712908 / 228206) + x(21423113 / 297543) + x(65168784 / 556998) + x(48924535 / 589452) + x(61018985 / 581133) + x(10644616 / 163763) + a.replace(/\r\n/g, "\n");
                for (var b = "", c = 0; c < a.length; c++) {
                    var d = a.charCodeAt(c);
                    d < 128 ? b += x(d) : d > 127 && d < 2048 ? (b += x(d >> 6 | 192), b += x(63 & d | 128)) : (b += x(d >> 12 | 224), 
                    b += x(d >> 6 & 63 | 128), b += x(63 & d | 128));
                }
                return b;
            }(a)), t = 1732584193, u = 4023233417, v = 2562383102, w = 271733878, o = 0; o < y.length; o += 16) {
                p = t, q = u, r = v, s = w, u = k(u = k(u = k(u = k(u = j(u = j(u = j(u = j(u = i(u = i(u = i(u = i(u = h(u = h(u = h(u = h(u, v = h(v, w = h(w, t = h(t, u, v, w, y[o + 0], 7, 3614090360), u, v, y[o + 1], 12, 3905402710), t, u, y[o + 2], 17, 606105819), w, t, y[o + 3], 22, 3250441966), v = h(v, w = h(w, t = h(t, u, v, w, y[o + 4], 7, 4118548399), u, v, y[o + 5], 12, 1200080426), t, u, y[o + 6], 17, 2821735955), w, t, y[o + 7], 22, 4249261313), v = h(v, w = h(w, t = h(t, u, v, w, y[o + 8], 7, 1770035416), u, v, y[o + 9], 12, 2336552879), t, u, y[o + 10], 17, 4294925233), w, t, y[o + 11], 22, 2304563134), v = h(v, w = h(w, t = h(t, u, v, w, y[o + 12], 7, 1804603682), u, v, y[o + 13], 12, 4254626195), t, u, y[o + 14], 17, 2792965006), w, t, y[o + 15], 22, 1236535329), v = i(v, w = i(w, t = i(t, u, v, w, y[o + 1], 5, 4129170786), u, v, y[o + 6], 9, 3225465664), t, u, y[o + 11], 14, 643717713), w, t, y[o + 0], 20, 3921069994), v = i(v, w = i(w, t = i(t, u, v, w, y[o + 5], 5, 3593408605), u, v, y[o + 10], 9, 38016083), t, u, y[o + 15], 14, 3634488961), w, t, y[o + 4], 20, 3889429448), v = i(v, w = i(w, t = i(t, u, v, w, y[o + 9], 5, 568446438), u, v, y[o + 14], 9, 3275163606), t, u, y[o + 3], 14, 4107603335), w, t, y[o + 8], 20, 1163531501), v = i(v, w = i(w, t = i(t, u, v, w, y[o + 13], 5, 2850285829), u, v, y[o + 2], 9, 4243563512), t, u, y[o + 7], 14, 1735328473), w, t, y[o + 12], 20, 2368359562), v = j(v, w = j(w, t = j(t, u, v, w, y[o + 5], 4, 4294588738), u, v, y[o + 8], 11, 2272392833), t, u, y[o + 11], 16, 1839030562), w, t, y[o + 14], 23, 4259657740), v = j(v, w = j(w, t = j(t, u, v, w, y[o + 1], 4, 2763975236), u, v, y[o + 4], 11, 1272893353), t, u, y[o + 7], 16, 4139469664), w, t, y[o + 10], 23, 3200236656), v = j(v, w = j(w, t = j(t, u, v, w, y[o + 13], 4, 681279174), u, v, y[o + 0], 11, 3936430074), t, u, y[o + 3], 16, 3572445317), w, t, y[o + 6], 23, 76029189), v = j(v, w = j(w, t = j(t, u, v, w, y[o + 9], 4, 3654602809), u, v, y[o + 12], 11, 3873151461), t, u, y[o + 15], 16, 530742520), w, t, y[o + 2], 23, 3299628645), v = k(v, w = k(w, t = k(t, u, v, w, y[o + 0], 6, 4096336452), u, v, y[o + 7], 10, 1126891415), t, u, y[o + 14], 15, 2878612391), w, t, y[o + 5], 21, 4237533241), v = k(v, w = k(w, t = k(t, u, v, w, y[o + 12], 6, 1700485571), u, v, y[o + 3], 10, 2399980690), t, u, y[o + 10], 15, 4293915773), w, t, y[o + 1], 21, 2240044497), v = k(v, w = k(w, t = k(t, u, v, w, y[o + 8], 6, 1873313359), u, v, y[o + 15], 10, 4264355552), t, u, y[o + 6], 15, 2734768916), w, t, y[o + 13], 21, 1309151649), v = k(v, w = k(w, t = k(t, u, v, w, y[o + 4], 6, 4149444226), u, v, y[o + 11], 10, 3174756917), t, u, y[o + 2], 15, 718787259), w, t, y[o + 9], 21, 3951481745), 
                t = c(t, p), u = c(u, q), v = c(v, r), w = c(w, s);
            }
            return (m(t) + m(u) + m(v) + m(w)).toLowerCase();
        },
        responseParser: function responseParser(media) {
            var id = media.id, albums = media.albums, title = media.title, artists = media.artists, version = media.version;
            var album_id = albums && albums[0] && albums[0].id;
            var fullId = id + (album_id ? "_" + album_id : "");
            var _fullId = id + (album_id ? ":" + album_id : "");
            var performer = artists && artists[0] && artists[0].name;
            if (version) {
                title += " " + version;
            }
            return {
                id: id,
                fullId: fullId,
                _fullId: _fullId,
                album_id: album_id,
                performer: performer,
                title: title
            };
        }
    };
    var currentHost = document.location.host;
    var preloadInfo = function preloadInfo(mediaList) {
        return new Promise(function(resolve, reject) {
            if (mediaList.length < 1) {
                return resolve(mediaList);
            }
            var ids = (0, _utils.map)(mediaList, function(_, media) {
                return media._fullId;
            });
            var url = "https://" + currentHost + "/api/v2.1/handlers/tracks?tracks=" + encodeURIComponent(ids) + "&external-domain=" + currentHost + "&overembed=no&__t=" + Date.now();
            var req = new XMLHttpRequest();
            req.onload = function() {
                if (200 === req.status) {
                    resolve((0, _utils.map)(JSON.parse(req.response), function(_, json) {
                        return AudioUtils.responseParser(json);
                    }));
                } else {
                    reject("not response");
                }
            };
            req.onerror = reject;
            req.open("GET", url, !0);
            req.setRequestHeader("Accept", "application/json; q=1.0, text/*; q=0.8, */*; q=0.1");
            req.setRequestHeader("X-Requested-With", "XMLHttpRequest");
            req.setRequestHeader("X-Retpath-Y", encodeURIComponent(document.location.href));
            req.send(null);
        });
    };
    var preloadTrackVariants = [ "web-album-track-track-main", "web-feed-genre_top-track-saved" ];
    var preloadTrackResolver = function preloadTrackResolver(media) {
        return new Promise(function(resolve, reject) {
            if (media.url) {
                return reject("link already fetched");
            }
            var req = new XMLHttpRequest();
            req.onload = function() {
                if (200 === req.status) {
                    var _JSON$parse = JSON.parse(req.response), codec = _JSON$parse.codec, resolve_url = _JSON$parse.src;
                    (0, _utils.extend)(media, {
                        codec: codec,
                        resolve_url: resolve_url
                    });
                    resolve(resolveUrl(media));
                } else {
                    reject("info link not loaded");
                }
            };
            req.onerror = reject;
            var variant = preloadTrackVariants[(0, _utils.irand)(0, preloadTrackVariants.length - 1)];
            var url = "https://" + currentHost + "/api/v2.1/handlers/track/" + media._fullId + "/" + variant + "/download/m?hq=1&strm=0&external-domain=" + currentHost + "&overembed=no&__t=" + Date.now();
            req.open("GET", url, !0);
            req.setRequestHeader("Accept", "application/json; q=1.0, text/*; q=0.8, */*; q=0.1");
            req.setRequestHeader("X-Requested-With", "XMLHttpRequest");
            req.setRequestHeader("X-Retpath-Y", encodeURIComponent(document.location.href));
            req.send(null);
        });
    };
    var resolveUrl = function resolveUrl(media) {
        return new Promise(function(resolve, reject) {
            var onerror = function onerror(msg) {
                return reject(msg);
            };
            var id = media.id, resolve_url = media.resolve_url;
            var req = new XMLHttpRequest();
            req.onload = function() {
                if (200 === req.status) {
                    delete media.resolve_url;
                    var _JSON$parse2 = JSON.parse(req.response), host = _JSON$parse2.host, path = _JSON$parse2.path, ts = _JSON$parse2.ts, s = _JSON$parse2.s;
                    var url = "https://" + host + "/get-mp3/" + AudioUtils.linkNornmalizer(path.substr(1) + s) + "/" + ts + path + "?track-id=" + id + "&play=false";
                    (0, _utils.extend)(media, {
                        url: url
                    });
                    resolve(media);
                } else {
                    onerror("can't resolve url");
                }
            };
            req.onerror = onerror;
            req.open("GET", resolve_url + "&format=json", !0);
            req.setRequestHeader("Accept", "application/json; q=1.0, text/*; q=0.8, */*; q=0.1");
            req.send(null);
        });
    };
    var audioManager = new (function(_MediaFramework) {
        !function _inherits(subClass, superClass) {
            if ("function" != typeof superClass && null !== superClass) {
                throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
            }
            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            });
            if (superClass) {
                Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
            }
        }(VKAudio, _framework2.default);
        function VKAudio(options) {
            !function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) {
                    throw new TypeError("Cannot call a class as a function");
                }
            }(this, VKAudio);
            var _this2 = function _possibleConstructorReturn(self, call) {
                if (!self) {
                    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                }
                return call && ("object" == typeof call || "function" == typeof call) ? call : self;
            }(this, (VKAudio.__proto__ || Object.getPrototypeOf(VKAudio)).call(this, options));
            _this2.name = "ya_audio";
            Object.assign(_this2.progressBar, {
                color: "#fc0",
                trailColor: "#fff"
            });
            return _this2;
        }
        _createClass(VKAudio, [ {
            key: "getObjectFromRow",
            value: function getObjectFromRow() {
                return AudioUtils.getMediaFromEl.apply(AudioUtils, arguments);
            }
        }, {
            key: "placeBtn",
            value: function placeBtn(row, audio, btn) {
                var btnPos = (0, _settings.sett)("button_position");
                (0, _utils.addClass)(row, _framework2.default.ROW_CLASS + "_pos_" + btnPos);
                switch (btnPos) {
                  case "right":
                    var controls = (0, _utils.geByClass1)("d-track__actions", row);
                    controls && controls.prepend(btn);
                    break;

                  default:
                    var startColumn = (0, _utils.geByClass1)("d-track__start-column", row);
                    startColumn && (0, _utils.domInsertAfter)(btn, startColumn);
                }
                _get(VKAudio.prototype.__proto__ || Object.getPrototypeOf(VKAudio.prototype), "placeBtn", this).call(this, row, audio, btn);
            }
        }, {
            key: "preload",
            value: function preload(media) {
                _get(VKAudio.prototype.__proto__ || Object.getPrototypeOf(VKAudio.prototype), "preload", this).call(this, media);
                (function _preload(media) {
                    var _this = this;
                    var fullId = media.fullId;
                    clearTimeout(this.reloadTimeout);
                    this.reloadTimeout = setTimeout(function() {
                        var preloadMediaList = Object.values(_this.downloadingQueue).filter(function(media) {
                            return !media.url && media.fullId !== fullId;
                        }).splice(0, 9);
                        if (fullId) {
                            preloadMediaList.push(media);
                        }
                        if (preloadMediaList.length < 1) {
                            return;
                        }
                        var needPreload = [];
                        var hasPreloaded = [];
                        (0, _utils.each)(preloadMediaList, function(_, media) {
                            var title = media.title, performer = media.performer;
                            if (title && performer) {
                                hasPreloaded.push(media);
                            } else {
                                needPreload.push(media);
                            }
                        });
                        preloadInfo(needPreload).then(function(preloaded) {
                            return hasPreloaded.concat(preloaded);
                        }).then(function(mediaList) {
                            return Promise.all((0, _utils.map)(mediaList, function(_, media) {
                                return preloadTrackResolver(media).catch(function(e) {
                                    return _this.cancel(media.fullId), {};
                                });
                            }));
                        }).then(function(mediaList) {
                            return (0, _utils.each)(mediaList, function(_, media) {
                                return _this.update(media);
                            });
                        }).then(function() {
                            return _this.preload({});
                        });
                    }, (0, _settings.sett)("reload_audio_interval"));
                }).call(this, media);
            }
        } ]);
        return VKAudio;
    }())({
        rowsSelector: ".d-track"
    });
    setTimeout(function() {
        return audioManager.initCtx(!0);
    }, 4);
});