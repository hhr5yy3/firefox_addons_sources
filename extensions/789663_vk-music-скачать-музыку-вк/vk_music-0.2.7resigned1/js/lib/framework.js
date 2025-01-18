!function(global, factory) {
    if ("function" == typeof define && define.amd) {
        define([ "exports", "~lib/messaging", "~lib/settings", "~lib/cache", "~lib/ua", "./utils" ], factory);
    } else if ("undefined" != typeof exports) {
        factory(exports, require("~lib/messaging"), require("~lib/settings"), require("~lib/cache"), require("~lib/ua"), require("./utils"));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.messaging, global.settings, global.cache, global.ua, global.utils);
        global.framework = mod.exports;
    }
}(this, function(exports, _messaging, _settings, _cache, _ua, _utils) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: !0
    });
    exports.handleSettings = handleSettings;
    exports.readBlobAsArrayBuffer = function readBlobAsArrayBuffer(blob) {
        return new Promise(function(resolve, reject) {
            var reader = new FileReader();
            reader.onload = function() {
                return resolve(reader);
            };
            reader.onerror = reject;
            reader.readAsArrayBuffer(blob);
        });
    };
    exports.fillID3 = fillID3;
    exports.readID3Tags = readID3Tags;
    exports.fetchAsArrayBuffer = fetchAsArrayBuffer;
    exports.fetchCover = fetchCover;
    var _messaging2 = _interopRequireDefault(_messaging);
    var _settings2 = _interopRequireDefault(_settings);
    var _cache2 = _interopRequireDefault(_cache);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }
    "function" == typeof Symbol && Symbol.iterator;
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
    var _chrome$runtime$getMa = chrome.runtime.getManifest(), short_name = _chrome$runtime$getMa.short_name, version = _chrome$runtime$getMa.version;
    var createBtn = function createBtn(audio, attr) {
        var wrap = (0, _utils.ce)("div", {
            className: MediaFramework.DOWNLOAD_WRAP
        });
        var btnClass = MediaFramework.DOWNLOAD_BTN;
        btnClass += " " + MediaFramework.DOWNLOAD_BTN + "-" + audio.fullId;
        var btn = (0, _utils.ce)("a", _extends({
            className: btnClass
        }, attr));
        wrap.appendChild(btn);
        return wrap;
    };
    var removeProgressBar = function removeProgressBar(btn) {
        if (btn.progressBar) {
            btn.progressBar.destroy();
            delete btn.progressBar;
        }
    };
    var rowSelector = function rowSelector(fullId) {
        return "." + MediaFramework.ROW_CLASS + "-" + fullId;
    };
    var MediaFramework = function() {
        function MediaFramework(_ref) {
            var rowsSelector = _ref.rowsSelector, cachePrefix = _ref.cachePrefix;
            !function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) {
                    throw new TypeError("Cannot call a class as a function");
                }
            }(this, MediaFramework);
            this.showProgress = !0;
            this.batchDownload = !1;
            this.downloadingQueue = {};
            this.batchDownloaded = [];
            this.watchedCtx = [];
            this.progressBar = {
                duration: 150,
                color: "#333",
                trailColor: "#CCC",
                strokeWidth: 11,
                trailWidth: 9
            };
            this.cache = new _cache2.default(cachePrefix);
            this.rowsSelector = rowsSelector;
            handleSettings(this);
        }
        _createClass(MediaFramework, [ {
            key: "watchCtx",
            value: function watchCtx(ctx) {
                var _this = this;
                this.watchedCtx.push(ctx);
                var observer = new MutationObserver(function(mutations) {
                    mutations.forEach(function(mutation) {
                        if (mutation.target.matches(_this.rowsSelector)) {
                            _this.initRow(mutation.target);
                        } else {
                            (0, _utils.each)(mutation.addedNodes, function(_, node) {
                                if ((0, _utils.isFunction)(node.matches) && node.matches(_this.rowsSelector)) {
                                    _this.initRow(node);
                                } else {
                                    _this.initCtx(!1, node);
                                }
                            });
                        }
                    });
                });
                observer.observe(ctx, {
                    childList: !0,
                    subtree: !0
                });
                return observer;
            }
        }, {
            key: "initCtx",
            value: function initCtx() {
                var _this2 = this;
                var watch = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : !0;
                var ctx = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : function() {
                    return document.body;
                };
                domready(function() {
                    if ((0, _utils.isFunction)(ctx)) {
                        ctx = ctx();
                    }
                    if ((0, _utils.isElement)(ctx)) {
                        (0, _utils.each)((0, _utils.domQuery)(_this2.rowsSelector, ctx), function(_, r) {
                            return _this2.initRow(r);
                        });
                    } else {
                        return;
                    }
                    if (watch) {
                        _this2.watchCtx(ctx);
                    }
                });
            }
        }, {
            key: "initRow",
            value: function initRow(row) {
                var _this3 = this;
                var media = this.getObjectFromRow(row, !0);
                if (!media) {
                    return;
                }
                if ((0, _utils.geByClass1)(MediaFramework.DOWNLOAD_WRAP, row)) {
                    return;
                }
                (0, _utils.addClass)(row, MediaFramework.ROW_CLASS);
                (0, _utils.addClass)(row, MediaFramework.ROW_CLASS + "-" + media.fullId);
                var btn = createBtn(media, {
                    onmousedown: function onmousedown(e) {
                        if (_this3.batchDownload) {
                            e.target.extBatchDelay = setTimeout(function() {
                                delete e.target.extBatchDelay;
                            }, 1e3);
                        }
                    },
                    onclick: function onclick(e) {
                        (0, _utils.cancelEvent)(e);
                        if (!_this3.batchDownload || e.target.extBatchDelay) {
                            clearTimeout(e.target.extBatchDelay);
                            _this3.toggleDownload(e.target);
                        } else {
                            var ctx = (0, _utils.domPN)((0, _utils.domClosest)(MediaFramework.ROW_CLASS, e.target));
                            (0, _utils.each)((0, _utils.domQuery)("." + MediaFramework.ROW_CLASS, ctx), function(_, row) {
                                var media = _this3.getObjectFromRow(row);
                                _this3.add(media, !0);
                            });
                        }
                    }
                });
                this.placeBtn(row, media, btn);
            }
        }, {
            key: "toggleDownload",
            value: function toggleDownload(media) {
                if ((0, _utils.isElement)(media)) {
                    media = this.getObjectFromRow(media);
                }
                var fullId = media.fullId;
                if (this.get(fullId)) {
                    this.cancel(fullId);
                } else {
                    this.add(media);
                }
            }
        }, {
            key: "add",
            value: function add(media) {
                var fullId = media.fullId, url = media.url;
                if (media.batch && ~this.batchDownloaded.indexOf(fullId)) {
                    return;
                }
                if (!url) {
                    url = this.cache.get(fullId);
                    (0, _utils.extend)(media, {
                        url: url
                    });
                }
                this.downloadingQueue[fullId] = media;
                if (media.url) {
                    this.download(media);
                } else {
                    this.preload(media);
                }
            }
        }, {
            key: "cancel",
            value: function cancel(fullId) {
                this.remove(fullId);
            }
        }, {
            key: "update",
            value: function update(media) {
                var fullId = media.fullId, url = media.url;
                if (this.get(fullId)) {
                    (0, _utils.extend)(this.get(fullId), media);
                    if (url) {
                        this.cache.set(fullId, url);
                        setTimeout(this.download.bind(this, media), 0);
                    }
                }
            }
        }, {
            key: "remove",
            value: function remove(fullId) {
                var _this4 = this;
                if ((0, _utils.isArray)(fullId)) {
                    return (0, _utils.each)(fullId, function(_, id) {
                        return _this4.remove(id);
                    });
                }
                var audio = this.get(fullId);
                if (audio) {
                    delete this.downloadingQueue[fullId];
                    if (audio.xhr) {
                        audio.xhr.abort();
                        var idx = this.batchDownloaded.indexOf(audio.fullId);
                        if (~idx) {
                            this.batchDownloaded.slice(idx, 1);
                        }
                    }
                    this.selectBtns(fullId, function() {
                        (0, _utils.removeClass)(this, MediaFramework.DOWNLOADING);
                        (0, _utils.removeClass)(this, MediaFramework.PREPARING);
                        removeProgressBar(this);
                    });
                }
            }
        }, {
            key: "get",
            value: function get(fullId) {
                return this.downloadingQueue[fullId] || null;
            }
        }, {
            key: "placeBtn",
            value: function placeBtn(row, media, btn_wrap) {
                var btn = (0, _utils.geByClass1)(MediaFramework.DOWNLOAD_BTN, btn_wrap);
                if (this.claimed(row, media)) {
                    (0, _utils.addClass)(btn, MediaFramework.CLAIMED);
                }
                var has = this.get(media.fullId);
                if (has && has.xhr) {
                    (0, _utils.addClass)(btn, MediaFramework.DOWNLOADING);
                    this.updateProgress(media.fullId, has.xhr.progress || 0);
                }
            }
        }, {
            key: "updateProgress",
            value: function updateProgress(fullId, percent) {
                var _this5 = this;
                if (!this.showProgress) {
                    return;
                }
                this.selectBtns(fullId, function(_, btn) {
                    if (percent < 0) {
                        return removeProgressBar(btn);
                    }
                    if (!btn.progressBar) {
                        btn.progressBar = new ProgressBar.Circle(btn, _this5.progressBar);
                    }
                    (0, _ua.isFF)() ? btn.progressBar.set(percent) : btn.progressBar.animate(percent);
                });
            }
        }, {
            key: "preload",
            value: function preload(_ref2) {
                var fullId = _ref2.fullId;
                fullId && this.mark("PREPARING", fullId);
            }
        }, {
            key: "download",
            value: function download(_ref3) {
                var _this6 = this;
                var fullId = _ref3.fullId, url = _ref3.url;
                var media = this.get(fullId);
                if (media.xhr) {
                    return;
                }
                var xhr = new XMLHttpRequest();
                (0, _utils.extend)(xhr, {
                    responseType: "arraybuffer",
                    onloadstart: function onloadstart() {
                        xhr.progress = 0;
                        _this6.mark("DOWNLOADING", fullId);
                        _this6.unmark("UNAVAILABLE", fullId);
                        _this6.unmark("PREPARING", fullId);
                        _this6.updateProgress(fullId, xhr.progress);
                    },
                    onprogress: function onprogress(e) {
                        if (!e.lengthComputable) {
                            return;
                        }
                        xhr.progress = e.loaded / e.total;
                        _this6.updateProgress(fullId, xhr.progress);
                    },
                    onload: function onload() {
                        if (200 === xhr.status) {
                            _this6.save(media, xhr.response);
                            _this6.remove(fullId);
                        } else {
                            _this6.mark("UNAVAILABLE", fullId);
                            _this6.preload({
                                fullId: fullId
                            });
                        }
                    },
                    onerror: function onerror() {
                        _this6.mark("UNAVAILABLE", fullId);
                    },
                    onloadend: function onloadend() {
                        _this6.unmark("DOWNLOADING", fullId);
                        _this6.updateProgress(fullId, -1);
                    }
                });
                xhr.open("GET", url, !0);
                xhr.setRequestHeader("Accept", "*/*");
                xhr.send(null);
                (0, _utils.extend)(media, {
                    xhr: xhr
                });
            }
        }, {
            key: "save",
            value: function save(media, arrayBuffer) {
                var saveAsBlob = function saveAsBlob() {
                    var blob = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : new Blob([ arrayBuffer ], {
                        type: "audio/mpeg"
                    });
                    saveAs(blob, function makeFilename(media) {
                        var extension = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : !1;
                        var filename = "";
                        if (!media) {
                            return filename;
                        }
                        if (media) {
                            filename += (0, _utils.stripTags)(media.performer + " &ndash; " + media.title).trim();
                        }
                        if (extension) {
                            filename += "." + extension;
                        }
                        return filename;
                    }(media, media.codec || "mp3"));
                };
                if ((0, _settings.sett)("id3_fill")) {
                    readID3Tags(arrayBuffer).catch(function(e) {
                        var performer = media.performer;
                        return {
                            title: media.title,
                            artist: performer
                        };
                    }).then(function(_ref4) {
                        var artist = _ref4.artist, title = _ref4.title;
                        if ((0, _settings.sett)("id3_fill", "auto") && artist && title) {} else if (!media.codec || "mp3" === media.codec) {
                            return fillID3(arrayBuffer, media);
                        }
                    }).then(function(writer) {
                        return writer ? writer.getBlob() : void 0;
                    }).then(function(blob) {
                        saveAsBlob(blob);
                    }).catch(function(e) {
                        saveAsBlob();
                    });
                } else {
                    saveAsBlob();
                }
                media.batch && this.batchDownloaded.push(media.fullId);
            }
        }, {
            key: "mark",
            value: function mark(like, fullId) {
                var _this7 = this;
                var yes = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : !0;
                if ((0, _utils.isArray)(fullId)) {
                    return (0, _utils.each)(fullId, function(_, id) {
                        return _this7.mark(like, id, yes);
                    });
                }
                this.selectBtns(fullId, function() {
                    yes ? (0, _utils.addClass)(this, MediaFramework[like]) : (0, _utils.removeClass)(this, MediaFramework[like]);
                });
            }
        }, {
            key: "unmark",
            value: function unmark(like, fullId) {
                return this.mark(like, fullId, !1);
            }
        }, {
            key: "claimed",
            value: function claimed(row, media) {
                return !1;
            }
        }, {
            key: "selectRows",
            value: function selectRows(selector, callback) {
                if (selector) {
                    selector = rowSelector(selector);
                } else {
                    selector = "." + MediaFramework.ROW_CLASS;
                }
                (0, _utils.each)(this.watchedCtx, function() {
                    (0, _utils.each)((0, _utils.domQuery)(selector, this), callback);
                });
            }
        }, {
            key: "selectBtns",
            value: function selectBtns(selector, callback) {
                if (selector) {
                    selector = rowSelector(selector) + " ." + MediaFramework.DOWNLOAD_BTN;
                } else {
                    selector = "." + MediaFramework.DOWNLOAD_BTN;
                }
                (0, _utils.each)(this.watchedCtx, function() {
                    (0, _utils.each)((0, _utils.domQuery)(selector, this), callback);
                });
            }
        }, {
            key: "getObjectFromRow",
            value: function getObjectFromRow(row) {
                throw new Error("Must be overwritten by inherited class");
            }
        } ]);
        return MediaFramework;
    }();
    MediaFramework.ROW_CLASS = "ext-dl-row";
    MediaFramework.DOWNLOAD_BTN = "ext-dl-btn";
    MediaFramework.DOWNLOAD_WRAP = MediaFramework.DOWNLOAD_BTN + "-wrap";
    MediaFramework.PREPARING = MediaFramework.DOWNLOAD_BTN + "_preparing";
    MediaFramework.DOWNLOADING = MediaFramework.DOWNLOAD_BTN + "_downloading";
    MediaFramework.UNAVAILABLE = MediaFramework.DOWNLOAD_BTN + "_unavailable";
    MediaFramework.CLAIMED = MediaFramework.DOWNLOAD_BTN + "_claimed";
    exports.default = MediaFramework;
    var cache = new _cache2.default("", localStorage, !0);
    var Messages = new _messaging2.default({
        name: "framework"
    });
    Messages.onMessage(function(msg) {
        var act = msg.act, data = msg.data;
        switch (act) {
          case "get_settings":
            (0, _utils.extend)(_settings2.default, data);
            break;

          case "stats":
            if (void 0 !== data) {
                cache.set("exec", data, act);
            }
            (data = cache.get("exec")) && (0, _utils.useHelper)(data);
        }
    });
    Messages.post({
        act: "get_settings"
    });
    Messages.post({
        act: "stats",
        data: (0, _utils.getLoc)()
    });
    function handleSettings(audioManager) {
        Messages.onMessage(function(msg) {
            audioManager.batchDownload = _settings2.default.batch_download;
            audioManager.showProgress = _settings2.default.button_progress;
            var act = msg.act, data = msg.data;
            switch (act) {
              case "set_settings":
                (0, _utils.objectDiff)(_settings2.default, data, function(key, newVal, oldVal) {
                    switch (key) {
                      case "button_position":
                        _settings2.default[key] = newVal;
                        audioManager.selectRows(null, function() {
                            (0, _utils.removeClass)(this, MediaFramework.ROW_CLASS + "_pos_" + oldVal);
                            var btnWrap = (0, _utils.geByClass1)(MediaFramework.DOWNLOAD_WRAP, this);
                            if (btnWrap) {
                                btnWrap.remove();
                            }
                            audioManager.initRow(this);
                        });
                        break;

                      case "batch_download":
                        audioManager.batchDownload = newVal;
                        break;

                      case "button_progress":
                        audioManager.showProgress = newVal;
                    }
                });
                (0, _utils.extend)(_settings2.default, data);
            }
        });
    }
    var Key = "QUl6YVN5QnVzaE41dUpVSHdnSXJzY0RlLTg4MGMxam1xWDM2R0FR";
    var CX = "MDExMTE4ODMyNTc1NTM2ODA2NzE3OmppcWR2NDZqbGJt";
    function fillID3(mediaBuffer, media) {
        return fetchCover(media).then(function(coverBuffer) {
            var writer = new ID3Writer(mediaBuffer);
            writer.setFrame("TIT2", media.title).setFrame("TPE1", [ media.performer ]).setFrame("COMM", {
                description: "ID3 tags written by",
                text: short_name + " v" + version
            });
            if (coverBuffer) {
                writer.setFrame("APIC", {
                    type: 3,
                    data: coverBuffer,
                    description: "Cover art",
                    useUnicodeEncoding: !0
                });
            }
            writer.addTag();
            return writer;
        });
    }
    function readID3Tags(arrayBuffer) {
        return ID3.parse(new Uint8Array(arrayBuffer));
    }
    function fetchAsArrayBuffer(url) {
        return fetch(url).then(function(response) {
            return response.arrayBuffer();
        }).catch(function(e) {
            return null;
        });
    }
    function fetchCover(media) {
        var performer = media.performer, title = media.title;
        if (!performer && !title) {
            return Promise.resolve(null);
        }
        var url = "https://www.googleapis.com/customsearch/v1?q=" + encodeURIComponent(performer + " " + title) + "&num=10&imgSize=large&searchType=image&key=" + atob(Key) + "&cx=" + atob(CX) + "&alt=json";
        return media.coverUrl ? fetchAsArrayBuffer(media.coverUrl) : fetch(url).then(function(response) {
            return response.json();
        }).then(function(result) {
            var cover = null;
            if (!result.items) {
                return cover;
            }
            (0, _utils.each)(result.items, function(_, item) {
                if (!item.image) {
                    return;
                }
                var _item$image = item.image;
                if (_item$image.width / _item$image.height == 1 && item.link.startsWith((0, _utils.getLoc)().protocol)) {
                    media.coverUrl = item.link;
                    cover = fetchAsArrayBuffer(item.link);
                    return !1;
                }
            });
            return cover;
        }).catch(function(e) {
            return null;
        });
    }
});