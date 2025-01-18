!function(global, factory) {
    if ("function" == typeof define && define.amd) {
        define([ "~lib/settings", "~lib/framework", "~lib/utils" ], factory);
    } else if ("undefined" != typeof exports) {
        factory(require("~lib/settings"), require("~lib/framework"), require("~lib/utils"));
    } else {
        factory(global.settings, global.framework, global.utils);
        global.ok = {};
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
    var md5 = SparkMD5.hash;
    var _getLoc = (0, _utils.getLoc)(), host = _getLoc.host, protocol = _getLoc.protocol;
    var sid = null;
    var getSid = function getSid() {
        return sid ? Promise.resolve(sid) : new Promise(function(resolve, reject) {
            var xhr = new XMLHttpRequest();
            (0, _utils.extend)(xhr, {
                onload: function onload() {
                    if (200 === xhr.status) {
                        try {
                            var json = JSON.parse(xhr.response);
                            resolve(sid = json.sid);
                        } catch (e) {
                            reject(e);
                        }
                    } else {
                        reject(null);
                    }
                }
            });
            xhr.open("POST", protocol + "//ok.ru/web-api/music/conf", !0);
            xhr.send(null);
        });
    };
    var AudioUtils = {
        getMediaFromEl: function getMediaFromEl(el, onlyId) {
            el = (0, _utils.domClosest)("mus-tr_i", el) || (0, _utils.domClosest)("track", el) || (0, 
            _utils.domClosest)("m_portal_track", el);
            try {
                var obj = JSON.parse((0, _utils.attr)(el, "data-query"));
                if (!obj) {
                    (0, _utils.each)([ function() {
                        var dataId = (0, _utils.domQuery)("[data-id]", el)[0];
                        return dataId && (0, _utils.attr)(dataId, "data-id");
                    }, function() {
                        var trackPlay = (0, _utils.geByClass1)("track_play", el);
                        var idStr = trackPlay && (0, _utils.attr)(trackPlay, "id");
                        var match = idStr && idStr.match(/\d+_(\d+)/);
                        return match && match[1];
                    }, function() {
                        var idStr = (0, _utils.attr)(el, "id");
                        var match = idStr && idStr.match(/\d+_(\d+)/);
                        return match && match[1];
                    } ], function(_, call) {
                        var trackId = call();
                        if (trackId) {
                            obj = {
                                trackId: trackId
                            };
                            return !1;
                        }
                    });
                    if (!obj) {
                        return null;
                    }
                }
                obj.fullId = "" + obj.trackId;
                if (onlyId) {
                    return obj;
                }
                obj.url = "";
                var album = (0, _utils.gpeByClass)("mus_album", el);
                var performer = (0, _utils.geByClass1)("mus-tr_artist", el) || (0, _utils.geByClass1)("track_artist", el) || (0, 
                _utils.geByClass1)("m_portal_c_artist", el) || album && (0, _utils.geByClass1)("mus_h2_tx", album);
                if (performer) {
                    performer = performer.innerText;
                }
                var title = (0, _utils.geByClass1)("mus-tr_song", el) || (0, _utils.geByClass1)("track_song", el) || (0, 
                _utils.geByClass1)("m_portal_track_name", el);
                if (title) {
                    title = title.innerText;
                }
                obj.performer = performer || "N/A";
                obj.title = title || "N/A";
                return obj;
            } catch (e) {
                return null;
            }
        },
        client: "flash",
        clientHashHelper: [ 4, 3, 5, 6, 1, 2, 8, 7, 2, 9, 3, 5, 7, 1, 4, 8, 8, 3, 4, 3, 1, 7, 3, 5, 9, 8, 1, 4, 3, 7, 2, 8 ],
        linkNornmalizer: function linkNornmalizer(url) {
            var r = /md5=(\w*)/g.exec(url)[1];
            var q = md5(r + "secret");
            var u = q.length;
            var t = 0;
            var p = void 0, v = void 0, s = void 0, o = "";
            for (p = 0; p < u; p += 1) {
                t += parseInt(q[p], 16);
            }
            for (p = 0; p < u; p += 1) {
                v = parseInt(q[p], 16);
                if (p === u - 1) {
                    s = v;
                } else {
                    s = parseInt(q[p + 1], 16);
                }
                o += Math.abs(t - v * s * this.clientHashHelper[p]);
            }
            return url + "&client=" + this.client + "&clientHash=" + o;
        },
        responseParser: function responseParser(response) {
            try {
                var json = JSON.parse(response);
                if (json.play && json.track) {
                    var url = this.linkNornmalizer(json.play);
                    var coverUrl = json.image && json.image.replace(/type=\d+/, "type=1").replace(/plc=\w+/, "plc=WEB");
                    var _json$track = json.track, performer = _json$track.ensemble, title = _json$track.name;
                    return {
                        fullId: _json$track.id,
                        title: title,
                        performer: performer,
                        url: url,
                        coverUrl: coverUrl
                    };
                } else {
                    return null;
                }
            } catch (e) {}
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
        }(OKAudio, _framework2.default);
        function OKAudio(options) {
            !function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) {
                    throw new TypeError("Cannot call a class as a function");
                }
            }(this, OKAudio);
            var _this2 = function _possibleConstructorReturn(self, call) {
                if (!self) {
                    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                }
                return call && ("object" == typeof call || "function" == typeof call) ? call : self;
            }(this, (OKAudio.__proto__ || Object.getPrototypeOf(OKAudio)).call(this, options));
            _this2.name = "mok_audio";
            _this2.__sid = null;
            Object.assign(_this2.progressBar, {
                color: "#ed812b",
                trailColor: "rgba(255,255,255,.1)"
            });
            return _this2;
        }
        _createClass(OKAudio, [ {
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
                    ((0, _utils.geByClass1)("mus-tr_right-controls", row) || (0, _utils.geByClass1)("track_ac", row) || (0, 
                    _utils.geByClass1)("m_track_opt", row)).prepend(btn);
                    break;

                  default:
                    var playButton = (0, _utils.geByClass1)("mus-tr_play", row) || (0, _utils.geByClass1)("track_play", row) || (0, 
                    _utils.geByClass1)("m_portal_c_play", row);
                    (0, _utils.domInsertAfter)(btn, playButton);
                }
                _get(OKAudio.prototype.__proto__ || Object.getPrototypeOf(OKAudio.prototype), "placeBtn", this).call(this, row, audio, btn);
            }
        }, {
            key: "preload",
            value: function preload(media) {
                _get(OKAudio.prototype.__proto__ || Object.getPrototypeOf(OKAudio.prototype), "preload", this).call(this, media);
                (function _preload(_ref) {
                    var _this = this;
                    var fullId = _ref.fullId;
                    getSid().then(function(sid) {
                        var unavailable = function unavailable() {
                            _this.remove(fullId);
                            _this.mark("UNAVAILABLE", fullId);
                        };
                        var xhr = new XMLHttpRequest();
                        (0, _utils.extend)(xhr, {
                            onload: function onload() {
                                if (200 === xhr.status) {
                                    var media = AudioUtils.responseParser(xhr.response);
                                    if (media) {
                                        _this.update(media);
                                    } else {
                                        unavailable();
                                    }
                                }
                            },
                            onerror: function onerror() {
                                return unavailable();
                            }
                        });
                        xhr.open("GET", "https://wmf." + host + "/play;jsessionid=" + sid + "?tid=" + fullId + "&client=" + AudioUtils.client + "&ctx=pop", !0);
                        xhr.setRequestHeader("Accept", "*/*");
                        xhr.send(null);
                    }).catch(function(e) {
                        return;
                    });
                }).call(this, media);
            }
        }, {
            key: "claimed",
            value: function claimed(row) {
                return (0, _utils.hasClass)(row, "__disabled");
            }
        } ]);
        return OKAudio;
    }())({
        rowsSelector: ".mus-tr_i,.track,.m_portal_track"
    });
    setTimeout(function() {
        return audioManager.initCtx(!0);
    }, 4);
});