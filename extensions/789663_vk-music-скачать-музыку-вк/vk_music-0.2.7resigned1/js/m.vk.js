!function(global, factory) {
    if ("function" == typeof define && define.amd) {
        define([ "~lib/messaging", "~lib/settings", "~lib/i18n", "~lib/framework", "~lib/utils" ], factory);
    } else if ("undefined" != typeof exports) {
        factory(require("~lib/messaging"), require("~lib/settings"), require("~lib/i18n"), require("~lib/framework"), require("~lib/utils"));
    } else {
        factory(global.messaging, global.settings, global.i18n, global.framework, global.utils);
        global.mVk = {};
    }
}(this, function(_messaging, _settings, _i18n, _framework, _utils) {
    "use strict";
    var _messaging2 = _interopRequireDefault(_messaging);
    _interopRequireDefault(_settings);
    _interopRequireDefault(_i18n);
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
    var _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }
        return target;
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
    new _messaging2.default({
        name: "audio:vk"
    });
    var AudioUtils = {
        AUDIO_ITEM_INDEX_ID: 0,
        AUDIO_ITEM_INDEX_OWNER_ID: 1,
        AUDIO_ITEM_INDEX_URL: 2,
        AUDIO_ITEM_INDEX_TITLE: 3,
        AUDIO_ITEM_INDEX_PERFORMER: 4,
        AUDIO_ITEM_INDEX_DURATION: 5,
        AUDIO_ITEM_INDEX_COVER_URL: 6,
        getMediaId: function getMediaId(el) {
            var dataId = (0, _utils.domData)(el, "id");
            if (dataId) {
                var matched = dataId.match(/([\d-]+)_([\d-]+)(?:_(?:\w+)([\d-]+))?/);
                if (matched) {
                    var _matched = _slicedToArray(matched, 3), ownerId = (_matched[0], _matched[1]);
                    return {
                        id: _matched[2],
                        ownerId: ownerId
                    };
                }
            }
            return {};
        },
        getAudioFromEl: function getAudioFromEl(el, onlyId) {
            el = (0, _utils.domClosest)("audio_item", el);
            var _AudioUtils$getMediaI = AudioUtils.getMediaId(el), ownerId = _AudioUtils$getMediaI.ownerId, id = _AudioUtils$getMediaI.id;
            if (!id) {
                return;
            }
            if (onlyId) {
                return {
                    fullId: ownerId + "_" + id
                };
            }
            var data = [];
            data.push(id);
            data.push(ownerId);
            var input = (0, _utils.domQuery)('input[type="hidden"]', el)[0];
            data.push(input && input.value);
            data.push((0, _utils.geByClass1)("ai_title", el).innerText);
            data.push((0, _utils.geByClass1)("ai_artist", el).innerText);
            data.push((0, _utils.domData)((0, _utils.geByClass1)("ai_dur", el), "dur"));
            var ai_play = (0, _utils.geByClass1)("ai_play", el), style = void 0, matched = void 0;
            if (ai_play && (style = (0, _utils.attr)(ai_play, "style")) && (matched = style.match(/url\(['"]?(.*)['"]?\)/))) {
                var _matched3 = _slicedToArray(matched, 2), coverUrl = (_matched3[0], _matched3[1]);
                data.push(coverUrl);
            }
            return this.asObject(data);
        },
        asObject: function asObject(a) {
            if (!a) {
                return null;
            }
            if ((0, _utils.isObject)(a)) {
                return a;
            }
            if ("string" == typeof a) {
                return {
                    id: a
                };
            }
            return {
                id: (0, _utils.intval)(a[this.AUDIO_ITEM_INDEX_ID]),
                ownerId: a[this.AUDIO_ITEM_INDEX_OWNER_ID],
                fullId: a[this.AUDIO_ITEM_INDEX_OWNER_ID] + "_" + a[this.AUDIO_ITEM_INDEX_ID],
                title: a[this.AUDIO_ITEM_INDEX_TITLE],
                performer: a[this.AUDIO_ITEM_INDEX_PERFORMER],
                duration: (0, _utils.intval)(a[this.AUDIO_ITEM_INDEX_DURATION]),
                _url: AudioUtils.linkNormalizer(a[this.AUDIO_ITEM_INDEX_URL]),
                coverUrl: a[this.AUDIO_ITEM_INDEX_COVER_URL]
            };
        },
        linkNormalizer: function linkNormalizer(url, vkId) {
            function a(t) {
                if (!t || t.length % 4 == 1) {
                    return !1;
                }
                for (var e, i, o = 0, a = 0, s = ""; i = t.charAt(a++); ) {
                    ~(i = r.indexOf(i)) && (e = o % 4 ? 64 * e + i : i, o++ % 4) && (s += String.fromCharCode(255 & e >> (-2 * o & 6)));
                }
                return s;
            }
            var r = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMN0PQRSTUVWXYZO123456789+/=", l = {
                v: function v(t) {
                    return t.split("").reverse().join("");
                },
                r: function(_r) {
                    function r(_x, _x2) {
                        return _r.apply(this, arguments);
                    }
                    r.toString = function() {
                        return _r.toString();
                    };
                    return r;
                }(function(t, e) {
                    t = t.split("");
                    for (var i, o = r + r, a = t.length; a--; ) {
                        ~(i = o.indexOf(t[a])) && (t[a] = o.substr(i - e, 1));
                    }
                    return t.join("");
                }),
                s: function s(t, e) {
                    var i = t.length;
                    if (i) {
                        var o = function _s(t, e) {
                            var i = t.length, o = [];
                            if (i) {
                                var a = i;
                                for (e = Math.abs(e); a--; ) {
                                    e = (i * (a + 1) ^ e + a) % i, o[a] = e;
                                }
                            }
                            return o;
                        }(t, e), a = 0;
                        for (t = t.split(""); ++a < i; ) {
                            t[a] = t.splice(o[i - 1 - a], 1, t[a])[0];
                        }
                        t = t.join("");
                    }
                    return t;
                },
                i: function i(t, e) {
                    return l.s(t, e ^ vkId);
                },
                x: function x(t, e) {
                    var i = [];
                    return e = e.charCodeAt(0), (0, _utils.each)(t.split(""), function(t, o) {
                        i.push(String.fromCharCode(o.charCodeAt(0) ^ e));
                    }), i.join("");
                }
            };
            return function o(t) {
                if (~t.indexOf("audio_api_unavailable")) {
                    var e = t.split("?extra=")[1].split("#"), o = "" === e[1] ? "" : a(e[1]);
                    if (e = a(e[0]), "string" != typeof o || !e) {
                        return t;
                    }
                    for (var s, r, n = (o = o ? o.split(String.fromCharCode(9)) : []).length; n--; ) {
                        if (s = (r = o[n].split(String.fromCharCode(11))).splice(0, 1, e)[0], !l[s]) {
                            return t;
                        }
                        e = l[s].apply(null, r);
                    }
                    if (e && "http" === e.substr(0, 4)) {
                        return e;
                    }
                }
                return t;
            }(url);
        },
        responseParser: function responseParser(response) {
            var get = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "json";
            var responseToken = function responseToken() {
                return "<!" + (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "") + ">";
            };
            var result = null;
            var needly = responseToken(get);
            (0, _utils.each)(response.split(responseToken()), function(_, str) {
                if (~str.indexOf(needly)) {
                    result = str.substr(needly.length);
                    return !1;
                }
            });
            try {
                switch (get) {
                  case "json":
                    result = JSON.parse(result);
                    break;

                  case "bool":
                    result = Boolean(result);
                }
            } catch (e) {}
            return result;
        }
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
            _this2.name = "mvk_audio";
            (0, _utils.extend)(_this2.progressBar, {
                color: "#4774ac",
                trailColor: "#e6edf5"
            });
            return _this2;
        }
        _createClass(VKAudio, [ {
            key: "getObjectFromRow",
            value: function getObjectFromRow() {
                return AudioUtils.getAudioFromEl.apply(AudioUtils, arguments);
            }
        }, {
            key: "placeBtn",
            value: function placeBtn(row, audio, btn) {
                (0, _utils.addClass)(row, _framework2.default.ROW_CLASS + "_pos_" + (0, _settings.sett)("button_position"));
                var playButton = (0, _utils.geByClass1)("ai_play", row);
                (0, _utils.domInsertAfter)(btn, playButton);
                _get(VKAudio.prototype.__proto__ || Object.getPrototypeOf(VKAudio.prototype), "placeBtn", this).call(this, row, audio, btn);
            }
        }, {
            key: "preload",
            value: function preload(media) {
                var _this3 = this;
                _get(VKAudio.prototype.__proto__ || Object.getPrototypeOf(VKAudio.prototype), "preload", this).call(this, media);
                (0, _utils.useHelper)('this.setAttribute("data", vk.id)').then(function(vkId) {
                    (function _preload(media, _ref) {
                        var _this = this;
                        var id = _ref.id;
                        var fullId = media.fullId, _url = media._url;
                        if (_url) {
                            var url = AudioUtils.linkNormalizer(_url, id);
                            return this.update(_extends({}, media, {
                                url: url
                            }));
                        }
                        clearTimeout(this.reloadTimeout);
                        var ids = Object.keys(this.downloadingQueue).filter(function(id) {
                            return !_this.downloadingQueue[id].url;
                        }).splice(0, (0, _utils.irand)(4, 5));
                        if (fullId && ids.indexOf(fullId) < 0) {
                            ids.push(fullId);
                        }
                        if (!ids.length) {
                            return;
                        }
                        this.reloadTimeout = setTimeout(function() {
                            var req = new XMLHttpRequest();
                            req.onload = function() {
                                if (200 === req.status) {
                                    (0, _utils.each)(AudioUtils.responseParser(req.response), function(_, audio) {
                                        var _audio = audio = AudioUtils.asObject(audio), fullId = _audio.fullId, url = _audio.url;
                                        url = AudioUtils.linkNormalizer(url, id);
                                        _this.update(_extends({}, audio, {
                                            fullId: fullId,
                                            url: url
                                        }));
                                        var idx = ids.indexOf(fullId);
                                        if (~idx) {
                                            ids.splice(idx, 1);
                                        }
                                    });
                                    _this.remove(ids);
                                    _this.mark("UNAVAILABLE", ids);
                                }
                            };
                            req.onloadend = function() {
                                _preload.call(_this, {}, {
                                    id: id
                                });
                            };
                            req.open("POST", "https://vk.com/al_audio.php", !0);
                            req.setRequestHeader("Accept", "*/*");
                            req.setRequestHeader("x-requested-with", "XMLHttpRequest");
                            req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                            var data = [];
                            (0, _utils.each)({
                                act: "reload_audio",
                                al: 1,
                                ids: ids.join(",")
                            }, function(key, val) {
                                return data.push(key + "=" + val);
                            });
                            req.send(data.join("&"));
                        }, (0, _settings.sett)("reload_audio_interval"));
                    }).call(_this3, media, {
                        id: +vkId
                    });
                }).catch(function(e) {
                    return;
                });
            }
        }, {
            key: "claimed",
            value: function claimed(row) {
                return (0, _utils.hasClass)(row, "claimed");
            }
        } ]);
        return VKAudio;
    }())({
        rowsSelector: ".audio_item"
    });
    setTimeout(function() {
        return audioManager.initCtx(!0);
    }, 4);
});