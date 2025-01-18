!function(global, factory) {
    if ("function" == typeof define && define.amd) {
        define([ "~lib/messaging", "~lib/settings", "~lib/i18n", "~lib/framework", "~lib/utils" ], factory);
    } else if ("undefined" != typeof exports) {
        factory(require("~lib/messaging"), require("~lib/settings"), require("~lib/i18n"), require("~lib/framework"), require("~lib/utils"));
    } else {
        factory(global.messaging, global.settings, global.i18n, global.framework, global.utils);
        global.vk = {};
    }
}(this, function(_messaging, _settings, _i18n, _framework, _utils) {
    "use strict";
    var _messaging2 = _interopRequireDefault(_messaging);
    var _settings2 = _interopRequireDefault(_settings);
    var _i18n2 = _interopRequireDefault(_i18n);
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
    var Messages = new _messaging2.default({
        name: "audio:vk"
    });
    var AudioUtils = {
        AUDIO_ITEM_INDEX_ID: 0,
        AUDIO_ITEM_INDEX_OWNER_ID: 1,
        AUDIO_ITEM_INDEX_URL: 2,
        AUDIO_ITEM_INDEX_TITLE: 3,
        AUDIO_ITEM_INDEX_PERFORMER: 4,
        AUDIO_ITEM_INDEX_DURATION: 5,
        AUDIO_ITEM_INDEX_ALBUM_ID: 6,
        AUDIO_ITEM_INDEX_AUTHOR_LINK: 8,
        AUDIO_ITEM_INDEX_LYRICS: 9,
        AUDIO_ITEM_INDEX_FLAGS: 10,
        AUDIO_ITEM_INDEX_CONTEXT: 11,
        AUDIO_ITEM_INDEX_EXTRA: 12,
        AUDIO_ITEM_INDEX_HASHES: 13,
        AUDIO_ITEM_INDEX_COVER_URL: 14,
        AUDIO_ITEM_INLINED_BIT: 1,
        AUDIO_ITEM_CLAIMED_BIT: 16,
        AUDIO_ITEM_RECOMS_BIT: 64,
        AUDIO_ITEM_TOP_BIT: 1024,
        AUDIO_ITEM_LONG_PERFORMER_BIT: 16384,
        AUDIO_ITEM_LONG_TITLE_BIT: 32768,
        getMediaFromEl: function getMediaFromEl(el) {
            el = (0, _utils.domClosest)("_audio_row", el);
            try {
                var data = JSON.parse((0, _utils.domData)(el, "audio"));
                return this.asObject(data);
            } catch (e) {}
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
            var h = (a[this.AUDIO_ITEM_INDEX_HASHES] || "").split("");
            var c = (a[this.AUDIO_ITEM_INDEX_COVER_URL] || "").split(",");
            return {
                id: (0, _utils.intval)(a[this.AUDIO_ITEM_INDEX_ID]),
                owner_id: (0, _utils.intval)(a[this.AUDIO_ITEM_INDEX_OWNER_ID]),
                ownerId: a[this.AUDIO_ITEM_INDEX_OWNER_ID],
                fullId: a[this.AUDIO_ITEM_INDEX_OWNER_ID] + "_" + a[this.AUDIO_ITEM_INDEX_ID],
                title: a[this.AUDIO_ITEM_INDEX_TITLE],
                performer: a[this.AUDIO_ITEM_INDEX_PERFORMER],
                duration: (0, _utils.intval)(a[this.AUDIO_ITEM_INDEX_DURATION]),
                lyrics: (0, _utils.intval)(a[this.AUDIO_ITEM_INDEX_LYRICS]),
                url: a[this.AUDIO_ITEM_INDEX_URL],
                flags: a[this.AUDIO_ITEM_INDEX_FLAGS],
                context: a[this.AUDIO_ITEM_INDEX_CONTEXT],
                extra: a[this.AUDIO_ITEM_INDEX_EXTRA],
                isTop: a[this.AUDIO_ITEM_INDEX_FLAGS] & this.AUDIO_ITEM_TOP_BIT,
                addHash: h[0] || "",
                editHash: h[1] || "",
                actionHash: h[2] || "",
                isLongPerformer: a[this.AUDIO_ITEM_INDEX_FLAGS] & this.AUDIO_ITEM_LONG_PERFORMER_BIT,
                isLongTitle: a[this.AUDIO_ITEM_INDEX_FLAGS] & this.AUDIO_ITEM_LONG_TITLE_BIT,
                coverUrl_s: c[0],
                coverUrl: c[1]
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
    var VKAudio = function(_MediaFramework) {
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
            _this2.name = "vk_audio";
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
                    var tipPosition = (0, _utils.gpeByClass)("_im_mess_stack", row) ? [ 7, 10, 0 ] : [ 7, 4, 0 ];
                    (0, _utils.attr)(btn, "onmouseover", "showTooltip(this, { text: '" + (0, _i18n2.default)("action_download") + "', black: 1, shift: [" + tipPosition + "], needLeft: 1, appendParentCls: 'audio_row'})");
                    var controls = (0, _utils.geByClass1)("audio_row__inner", row);
                    if (controls) {
                        controls.prepend(btn);
                    }
                    break;

                  default:
                    var playButton = (0, _utils.geByClass1)("audio_row__play_btn", row);
                    if (playButton) {
                        (0, _utils.domInsertAfter)(btn, playButton);
                    }
                }
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
                        var fullId = media.fullId;
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
                            req.send(Object.values((0, _utils.map)({
                                act: "reload_audio",
                                al: 1,
                                ids: ids.join(",")
                            }, function(key, val) {
                                return key + "=" + val;
                            })).join("&"));
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
                return (0, _utils.hasClass)(row, "audio_claimed");
            }
        } ]);
        return VKAudio;
    }();
    Messages.onMessage(function(msg) {
        switch (msg.act) {
          case "get_settings":
          case "set_settings":
            !function setProgressColor(position) {
                if ("right" === position) {
                    (0, _utils.extend)(audioManager.progressBar, {
                        color: "#828a99",
                        trailColor: "#f2f4f7"
                    });
                } else {
                    (0, _utils.extend)(audioManager.progressBar, {
                        color: "#444",
                        trailColor: "#fff"
                    });
                }
            }(_settings2.default.button_position);
        }
    });
    Messages.post({
        act: "get_settings"
    });
    var audioManager = new VKAudio({
        rowsSelector: ".audio_row"
    });
    setTimeout(function() {
        return audioManager.initCtx(!0);
    }, 4);
});