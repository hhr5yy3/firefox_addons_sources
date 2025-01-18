var Base = function Base() {
};
Base.extend = function (key, configs) {
    var extend = Base.prototype.extend;
    Base._prototyping = true;
    var proto = new this;
    extend.call(proto, key);
    proto.base = function () {};
    delete Base._prototyping;
    var constructor = proto.constructor;
    var _class = proto.constructor = function () {
        if (!Base._prototyping) {
            if (this._constructing || this.constructor == _class) {
                this._constructing = true;
                constructor.apply(this, arguments);
                delete this._constructing;
            } else {
                if (null != arguments[0]) {
                    return (arguments[0].extend || extend).call(arguments[0], proto);
                }
            }
        }
    };
    return _class.ancestor = this, _class.extend = this.extend, _class.forEach = this.forEach, _class.implement = this.implement, _class.prototype = proto, _class.toString = this.toString, _class.valueOf = function (type) {
        return "object" == type ? _class : constructor.valueOf();
    }, extend.call(_class, configs), "function" == typeof _class.init && _class.init(), _class;
}
Base.prototype = {
    extend: function extend(key, fn) {
        if (arguments.length > 1) {
            var obj = this[key];
            if (obj && "function" == typeof fn && (!obj.valueOf || obj.valueOf() != fn.valueOf()) && /\bbase\b/.test(fn)) {
                var fn_val = fn.valueOf();
                fn = function childConstructor() {
                    var previous = this.base || Base.prototype.base;
                    this.base = obj;
                    var firstResult = fn_val.apply(this, arguments);
                    return this.base = previous, firstResult;
                };
                fn.valueOf = function (type) {
                    return "object" == type ? fn : fn_val;
                };
                fn.toString = Base.toString;
            }
            this[key] = fn;
        } else {
            var obj = key;
            if (obj) {
                var extend = Base.prototype.extend;
                if (!(Base._prototyping || "function" == typeof this)) {
                    extend = this.extend || extend;
                }
                var b = {
                    toSource: null
                };
                var hidden = ["constructor", "toString", "valueOf"];
                var i = Base._prototyping ? 0 : 1;
                for (; key = hidden[i++];) {
                    if (obj[key] != b[key]) {
                        extend.call(this, key, obj[key]);
                    }
                }
                var key;
                for (key in obj) {
                    if (!b[key]) {
                        extend.call(this, key, obj[key]);
                    }
                }
            }
        }
        return this;
    }
}
Base = Base.extend({
    constructor: function scanTagsDir() {
        this.extend(arguments[0]);
    }
}, {
    ancestor: Object,
    version: "1.1",
    forEach: function forEach(array, fn, thisv) {
        var i;
        for (i in array) {
            if (void 0 === this.prototype[i]) {
                fn.call(thisv, array[i], i, array);
            }
        }
    },
    implement: function implement() {
        var i = 0;
        for (; i < arguments.length; i++) {
            if ("function" == typeof arguments[i]) {
                arguments[i](this.prototype);
            } else {
                this.prototype.extend(arguments[i]);
            }
        }
        return this;
    },
    toString: function primitiveOf() {
        return String(this.valueOf());
    }
});

Array.isArray = Array.isArray || function(obj) {
    return Object.prototype.toString.call(obj) === "[object Array]";
};

Array.makeArray = function(obj) {
    if(Object.isObject(obj))
        return [].slice.call(obj);
    if(Array.isArray(obj))
        return obj;
    return [obj];
};

Array.iterate = function(array, handler, context) {
    if(!array.length || !Functions.isFunction(handler))
        return array;
    var res = [];
    Object.isObject(context) && (handler = Functions.on(handler, context));
    for(var i = 0; i < array.length; ++i) { // do not fucking iterate from end!
        var handled = handler(array[i]);
        if(handled === false) break;
        if(handled === true) continue;
        handled && res.push(handled);
    }
    return res;
};

var Functions = {
    isFunction: function(obj) {
        return "function" === typeof obj;
    },
    on: function(func, obj) {
        return function() {
            return func.apply(obj, arguments)
        }
    }
};

Number.between = function(n, min, max) {
    return Math.min(Math.max(n, min), max) >> 0;
};

Number.isBetween = function(n, left, right) {
    return left < n && n < right;
};

Object.isObject = function(obj) {
    var obj_type = typeof obj;
    return obj_type === "function" || obj_type === "object" && !!obj;
};

Object.isEmpty = function(obj) {
    return !Object.keys(obj).length;
};

Object.each = function(obj, handler, context) {
    if(Object.isObject(obj) && Functions.isFunction(handler)) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key)) {
                handler.call(context || obj, key, obj[key]);
            }
        }
    }
};

Object.union = function(a, b) {
    var res = {};
    for(var x in a) a.hasOwnProperty(x) && (res[x] = a[x]);
    for(var y in b) b.hasOwnProperty(y) && (res[y] = b[y]);
    return res;
};

String.isString = function(target) {
    return typeof target === "string" || target instanceof String;
};

String.format = function(string, args) {
    var res = string;
    Array.makeArray(args).forEach(function(el,i) {
        var reg = new RegExp("\\{"+i+"\\}", "g");
        res = res.replace(reg, el == null ? "" : el);
    });
    return res;
};

String.contains = function(string1, string2) {
    return string1.toLowerCase().indexOf(string2.toLowerCase()) !== -1;
};

String.parseUrl = function(string) {
    try {
        return JSON.parse('{"'+decodeURIComponent(string.replace(/&/g, "\",\"").replace(/=/g,"\":\"")) + '"}');
    } catch(e) {
        return {};
    }
};

String.simplify = function(string) {
    return string.replace(/\s+/g, " ").trim();
};

// Wrapper
var App = Base.extend({
    constructor: function(global, chrome) {
        this.global = global;
        this.chrome = chrome;
    }
});

App.Dom = Base.extend({
    constructor: function(dom, attributes) {
        this.dom = dom;
        this.factory = new App.Dom.Factory();

        if(Object.isObject(attributes))
            Object.each(attributes, this.setAttr, this);
    },
    on: function(event, handler, context) {
        Object.isObject(context) && (handler = Functions.on(handler, context));
        this.dom.addEventListener(event, handler, true);
    },
    off: function(event, handler) {
        this.dom.removeEventListener(event, handler);
    },
    clone: function(deep) {
        !arguments.length && (deep = true);
        var c = this.dom.cloneNode(deep);
        return this.factory.create(c);
    },
    setAttr: function(name, value) {
        this.dom.setAttribute(name, value);
        return this;
    },
    getAttr: function(name) {
        if(typeof this.dom[name] !== "undefined")
            return this.dom[name];
        return this.dom.getAttribute(name);
    },
    hasAttr: function(name) {
        return this.getAttr(name) != null;
    },
    getValue: function() {
        return this.dom.value || "";
    },
    getText: function() {
        return (this.dom.innerText || "").trim();
    },
    setText: function(text) {
        this.dom.innerText = (text || "").trim();
        return this;
    },
    getData: function(name) {
        return this.dom.dataset[name];
    },
    setData: function(name, value) {
        (value == null) && (value = true);
        this.dom.dataset[name] = value;
        return this;
    },
    hasData: function(name) {
        return this.dom.dataset.hasOwnProperty(name);
    },
    addClass: function(className) {
        if (this.dom.classList) {
            var _this = this;
            var classArray = Array.isArray(className) ? className : className.split(" ");
            classArray.forEach(function(c) { _this.dom.classList.add(c) })
        }
        return this;
    },
    removeClass: function(className) {
        if (this.dom.classList) {
            var _this = this;
            var classArray = Array.isArray(className) ? className : className.split(" ");
            classArray.forEach(function(c) { _this.dom.classList.remove(c) })
        }
        return this;
    },
    switchClass: function(removeClass, addClass) {
        if (this.dom.classList) {
            this.dom.classList.remove(removeClass);
            this.dom.classList.add(addClass);
        }
        return this;
    },
    switchClasses: function(removeClasses, addClasses) {
        this.removeClass(removeClasses);
        this.addClass(addClasses);
        return this;
    },
    hasClass: function(className) {
        return this.dom.classList && this.dom.classList.contains(className);
    },
    find: function(selector) {
        var dom_el = this.dom.querySelector(selector);
        return dom_el ? this.factory.create(dom_el) : null;
    },
    findAll: function(selector) {
        var dom_els = this.dom.querySelectorAll(selector);
        return Array.iterate(Array.makeArray(dom_els), function(item) {
            return this.factory.create(item);
        }, this);
    },
    closest: function(selector) {
        var dom_el = this.dom.closest(selector);
        return dom_el ? this.factory.create(dom_el) : null;
    },
    has: function(element) {
        var dom_el = element instanceof App.Dom ? element.dom : element;
        return this.dom.contains(dom_el);
    },
    contains: function(selector) {
        return this.dom.querySelector(selector) !== null;
    },
    appendChild: function(node, toEnd) {
        if(node instanceof App.Dom) 
        {
            if (toEnd)
            {
                this.dom.appendChild(node.dom);
            }
            else
            {
                this.dom.insertBefore(node.dom, this.dom.firstChild)
            }
        }
        else
        {
            if (toEnd)
            {
                this.dom.appendChild(node);
            }
            else
            {
                this.dom.insertBefore(node, this.dom.firstChild)
            }
        }
        return this;
    },
    insertAfter: function(node) {
        this.dom.parentNode.insertBefore(node.dom, this.dom.nextSibling);
    },
    insertBefore: function(node) {
        this.dom.parentNode.insertBefore(node.dom, this.dom);
    },
    parent: function() {
        return this.factory.create(this.dom.parentNode);
    },
    next: function() {
        return this.factory.create(this.dom.nextSibling);
    }
}, {
    Factory: Base.extend({
        create: function(node, attributes) {
            if(node instanceof App.Dom)
                return node;
            if(!String.isString(node) && !this._isHtmlElement(node))
                return null;

            return new App.Dom(node, attributes);
        },
        createFragment: function() {
            return new App.Dom(document.createDocumentFragment());
        },
        _isHtmlElement: function(el) {
            return el && (el instanceof HTMLElement && el.nodeType === 1 || el instanceof HTMLDocument || el instanceof DocumentFragment);
        }
    })
});

App.Ajax = function() {};
App.Ajax.prototype = {
    defaults: {
        async: true,
        type: "GET",
        responseType: "json"
    },
    send: function(data) {
        var config = Object.union(this.defaults, data);
        var httpRequest = new XMLHttpRequest();
        httpRequest.responseType = config.responseType;
        httpRequest.onload = config.onload || function() {};
        httpRequest.onerror = config.onerror || function() {};
        httpRequest.onprogress = config.onprogress || function() {};
        httpRequest.onloadstart = config.onloadstart || function() {};
        httpRequest.onreadystatechange = config.onreadystatechange || function() {};
        httpRequest.open(config.type, config.url, config.async);
        httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        httpRequest.setRequestHeader('x-requested-with', 'XMLHttpRequest');
        httpRequest.send(config.content);
    }
};

App.Language = App.extend({
    languages: {
        by: "by", // Belarusian
        en: "en", // English
        im: "im", // Old russian (before revolution)
        ru: "ru", // Russian
        so: "so", // Soviet Union
        uk: "uk" // Ukraine
    },
    constructor: function(global) {
        this.domFactory = new App.Dom.Factory();
        this.document = this.domFactory.create(global.document);
        this.markerNode = this.document.find("#myprofile");
        if(!this.markerNode)
        {
            this.markerNode = this.document.find("#l_pr");
        }
        this.language = this._getInterfaceLanguage();
    },
    getString: function(branch, name) {
        return this.strings[branch][name][this.language] || "";
    },
    _getInterfaceLanguage: function() {
        var text = this.markerNode ? this.markerNode.getText() : "";
        var marker = this.strings.marker;
        switch(true) {
            case String.contains(text, marker.by):
                return this.languages.by;
            case String.contains(text, marker.en):
                return this.languages.en;
            case String.contains(text, marker.im):
                return this.languages.im;
            case String.contains(text, marker.ru):
                return this.languages.ru;
            case String.contains(text, marker.so):
                return this.languages.so;
            case String.contains(text, marker.uk):
                return this.languages.uk;
            default:
                return this.languages.en;
        }
    }
});

// !!!!WARNING!!!!!: Do not use nonlatin symbols in platform as is, use decodeURIComponent instead. Platform will convert all code to the special string and non latin symbols can be converted bad.
// Marker
App.Language.prototype.strings = {
    marker: {
        by: "Мая Старонка",
        en: "My Profile",
        im: "Мой Паспортъ",
        ru: "Моя Страница",
        so: "Мое Досье",
        uk: "Моя Cторінка"
    }
};

// Audio
App.Language.prototype.strings.audio = {
    download: {
        by: "Спампаваць {0}kbps",
        en: "Download {0}kbps",
        im: "Сберечь {0}kbps",
        ru: "Скачать {0}kbps",
        so: "Переписать {0}kbps",
        uk: "Завантажити {0}kbps"
    },
    downloadAll: {
        by: "Спампаваць усе",
        en: "Download all",
        im: "Сберечь всѣ",
        ru: "Скачать все",
        so: "Переписать все",
        uk: "Завантажити всі"
    },
    stop: {
        by: "Спыніць",
        en: "Stop",
        im: "Остановить",
        ru: "Остановить",
        so: "Остановить",
        uk: "Зупинити"
    },
    started: {
        by: "Паведамленні ў загрузкі",
        en: "Added to downloads",
        im: "Добавлено в загрузки",
        ru: "Добавлено в загрузки",
        so: "Добавлено в загрузки",
        uk: "Додано в завантаження"
    },
    failed: {
        by: "Памылка загрузкі",
        en: "Download failed",
        im: "Ошибка загрузки",
        ru: "Ошибка загрузки",
        so: "Ошибка загрузки",
        uk: "Помилка завантаження"
    }
};

// Photo
App.Language.prototype.strings.photo = {
    download: {
        by: "Спампаваць арыгінал",
        en: "Download original",
        im: "Сберечь оригиналъ",
        ru: "Скачать оригинал",
        so: "Переписать оригинал",
        uk: "Скачати оригінал"
    }
};

// Video
App.Language.prototype.strings.video = {
    download: {
        by: "Спампаваць",
        en: "Download",
        im: "Сберечь",
        ru: "Скачать",
        so: "Переписать",
        uk: "Скачати"
    }
};

// Observer
App.Observer = Base.extend({
    defaults: {
        childList: false,
        attributes: false,
        characterData: false,
        subtree: false,
        attributeOldValue: false,
        characterDataOldValue: false,
        target: null,
        callback: function() {}
    },
    constructor: function() {
        this.config = {};
        this.observer = null;
    },
    configure: function(options) {
        this.config = Object.union(this.defaults, options);
        this.observer = this._getObserverInstance(this.config.callback);
    },
    start: function() {
        if(this.config.target !== null)
            this.observer.observe(this.config.target, this.config);
    },
    stop: function() {
        this.observer && this.observer.disconnect();
    },
    destroy: function() {
        this.stop();
        this.observer = null;
        this.config = {};
    },
    _getObserverInstance: function(callback) {
        if(window.MutationObserver != null)
            return new MutationObserver(callback);
        return new WebKitMutationObserver(callback);
    }
});
App.Template = {
    audio: "(this.title='')||window.showTooltip&&!showTooltip(this,{text:'{0}',showdt:0,black:1,shift:[10,5,0]})||(this.title='{0}')",
    video: function(text) {
        var domFactory = new App.Dom.Factory();

        var wrap = domFactory.create(document.createElement("div"));

        var idd_selected_value = domFactory.create(document.createElement("div"), {"class": "idd_selected_value idd_arrow"});
        idd_selected_value.setText(text);
        wrap.appendChild(idd_selected_value, true);

        var idd_popup = domFactory.create(document.createElement("div"), {"class": "idd_popup"});
        var idd_header_wrap = domFactory.create(document.createElement("div"), {"class": "idd_header_wrap"});
        var idd_header = domFactory.create(document.createElement("div"), {"class": "idd_header idd_arrow"});
        idd_header.setText(text);
        idd_header_wrap.appendChild(idd_header, true);

        var idd_items_wrap = domFactory.create(document.createElement("div"), {"class": "idd_items_wrap"});
        var idd_items_content = domFactory.create(document.createElement("div"), {"class": "idd_items_content"});
        [240, 360, 480, 720, 1080].forEach(function(el) {
            var idd_item = domFactory.create(document.createElement("div"), {"class": "idd_item m-" + el, "data-resolution": el});
            idd_item.setText(el.toString());
            idd_items_content.appendChild(idd_item, true);
        });
        idd_items_wrap.appendChild(idd_items_content, true);

        idd_popup.appendChild(idd_header_wrap, true);
        idd_popup.appendChild(idd_items_wrap, true);

        wrap.appendChild(idd_selected_value, true);
        wrap.appendChild(idd_popup, true);

        return wrap;
    }
};

// Abstract
App.Content = App.extend({
    constructor: function(global, chrome) {
        this.base(global, chrome);
        this.cache = {};
        this.ajax = new App.Ajax();
        this.language = new App.Language(global);
        this.template = App.Template;
        this.domFactory = new App.Dom.Factory();
        this.document = this.domFactory.create(global.document);
        this.body = this.domFactory.create(global.document.body);
    },
    _sendMessage: function(action, data) {
        if(action && Object.isObject(data))
            this.chrome.runtime.sendMessage({action: action, data: data});
    },
    _addMessageListenter: function(callback) {
        this.chrome.runtime.onMessage.addListener(callback);
    },
    _removeMessageListenter: function(callback) {
        this.chrome.runtime.onMessage.removeListener(callback);
    },
    _getString: function(branch, stringName) {
        return this.language.getString(branch, stringName);
    },
    _prepareFileName: function(string) {
        return String.simplify(string.replace(/[\\\/:\?\*<>\|~"]+/g, " ")) || "Untitled";
    }
}, {
    Audio: null,
    Photo: null,
    Video: null,
    Bootstrap: function(global, chrome) {
        App.Content.Audio.Instance = new App.Content.Audio(global, chrome);
        App.Content.Photo.Instance = new App.Content.Photo(global, chrome);
        App.Content.Video.Instance = new App.Content.Video(global, chrome);
    },
    Destroy: function() {
        App.Content.Audio && App.Content.Audio.Instance.destructor();
        App.Content.Photo && App.Content.Photo.Instance.destructor();
        App.Content.Video && App.Content.Video.Instance.destructor();
    }
});

// Audio
App.Content.Audio = App.Content.extend({
    selector: {
        area: ".area.clear_fix",
        newArea: ".audio_row:not(.audio_claimed), .SecondaryAttachment:not(.audio_claimed):not([data-restricted])",
        newAudioRows: ".SecondaryAttachment:not(.vkd-area):not(.audio_claimed):not([data-restricted]), .OwnerContentTabAudiosItem[data-audio]:not([vkdButtonAdded])",
        newAreaNotPrepared: ".audio_row:not(.vkd-area):not(.audio_claimed)",
        groupArea: ".group-tab-audios, .audio_page__audio_rows_list, .audio_pl_snippet__list, .wall_audio_rows, #profile_audios .module_body, .audios_module .module_body, .SecondaryAttachmentGroup, .im-mess-stack div[class^='_im_msg_media'], .AudioPlaylistSnippet__list, .OwnerContentTabAudios__items"
    },
    css: {
        area: "vkd-area",
        clear: "clear_fix"
    },
    constructor: function(global, chrome) {
        this.base(global, chrome);
        this.observer = null;

        this._start();
        this._startObserver();
    },
    destructor: function() {
        this.observer && this.observer.destroy();
    },
    _start: function() {
        this._updateContent();
    },
    _startObserver: function() {
        var options = {
            childList : true,
            subtree   : true,
            target    : this.body.dom,
            callback  : Functions.on(this._updateContent, this)
        };
        update_user_vk_id();
        this.observer = new App.Observer();
        this.observer.configure(options);
        this.observer.start();
    },
    _updateContent: function() {
        var audioRows = this.body.findAll(this.selector.area);
        var newAudioRows = this.body.findAll([this.selector.newAreaNotPrepared, this.selector.newAudioRows].join(","));
        var audioGroups = this.body.findAll(this.selector.groupArea);
        Array.iterate(audioRows, this._injectElements, this);
        Array.iterate(newAudioRows, this._injectElementsNew, this);
        Array.iterate(audioGroups, this._injectGroupsElements, this);
    },
    _injectElements: function(rowNode) {
        var inputNode = rowNode.addClass(this.css.area).find("input");
        if(!inputNode) return;

        var trackId = this._getTrackId(inputNode);
        var trackInstance = this._getTrack(trackId);
        trackInstance.injectElements(rowNode);
    },
    _injectElementsNew: function(rowNode) {
        rowNode.addClass(this.css.area);
        var trackId = this._getTrackIdNew(rowNode);
        var trackInstance = this._getTrack(trackId, true);
        trackInstance.injectElements(rowNode);
    },
    _injectGroupsElements: function(groupNode) {
        if (groupNode.dom.className.indexOf('_im_msg_media') >= 0 && groupNode.findAll('.post_media>' + this.selector.newArea) <= 1) {
            return;
        }

        var groupId = groupNode.getAttr('vkd-playlist-id');
        var plId = groupNode.getAttr('vkd-playlist-plid');
        if (!groupId || !plId) {
            groupId = groupNode.getAttr('data-playlist-id');
            if (!groupId) {
                if (groupNode.getAttr('data-audio-context')) {
                    return;
                }
                var closest_wrap_with_id = groupNode.closest('[data-playlist-id]');
                if (closest_wrap_with_id) {
                    groupId = closest_wrap_with_id.getAttr('data-playlist-id');
                }
                if (!groupId && groupNode.dom.classList.contains('OwnerContentTabAudios__items')) {
                    var OwnerContentTabAudios = groupNode.closest('.OwnerContentTabAudios');
                    var all_user_audio_href = OwnerContentTabAudios && OwnerContentTabAudios.find('.vkuiButton[href]');
                    var href = all_user_audio_href && all_user_audio_href.dom.href;
                    var user_id = href && href.match(/audios(\d+)/);
                    user_id && user_id.length > 1 && (user_id = user_id[1]);
                    if (user_id) {
                        groupId = 'id' + user_id;
                    }
                }
            }
            if (groupId) {
                plId = groupId.match(/(-?\d+)_(-?\d+)/);
                if (plId && plId.length > 2) {
                    plId = plId[1] + '_' + plId[2];
                }
                if (this.document.findAll('[data-playlist-id="' + groupId + '"]').length > 1) {
                    groupId += ':' + parseInt(Math.random() * 100000);
                }
            }
            else {
                groupId = parseInt(Math.random() * 100000).toString();
            }
            if (!plId) {
                plId = groupId;
            }
            groupNode.setAttr('vkd-playlist-id', groupId);
            groupNode.setAttr('vkd-playlist-plid', plId);
        }
        var groupInstance = this._getGroup(plId);
        groupInstance.updateElements(groupNode, groupId);
    },
    _getTrackId: function(inputNode) {
        return inputNode.getAttr("id").replace(/^\D+|\D+$/g, "");
    },
    _getTrackIdNew: function(inputNode) {
        return inputNode.getAttr("data-full-id");
    },
    _getTrack: function(id, isNew) {
        if(!this.cache[id])
            this.cache[id] = this._createTrack(id, isNew);
        return this.cache[id];
    },
    _createTrack: function(id, isNew) {
        return new App.Content.Audio.Track(this.global, this.chrome, id, isNew);
    },
    _getGroup: function(id) {
        if(!this.cache[id])
            this.cache[id] = new App.Content.Audio.Group(this.global, this.chrome, id);
        return this.cache[id];
    },
    getURL: function(id_ind, paramses, callback) {
        function get_seed(params) {
            var seed = null;
            var seeds = params.length > 13 ? (params[13] || '').split('/') : [];
            if (seeds.length > 5) {
                seed = seeds[2] + '_' + seeds[5]; // 2 - actionHash; 5 - urlHash
            }
            return seed;
        }
        
        var cur_id = paramses[id_ind][1] + "_" + paramses[id_ind][0];
        var cur_seed = get_seed(paramses[id_ind]);
        var all_full_ids = [cur_id + (cur_seed ? '_' + cur_seed : '')];
        if (audio_url_cache.has(cur_id))
        {
            var cur_url = audio_url_cache.get(cur_id);
            callback && callback({url: cur_url, is_m3u: /^http.*\/index\.m3u8/.test(cur_url)});
        }
        else
        {
            for (var i = id_ind; i < paramses.length; i++)
            {
                if (paramses[i].length < 2) continue;
                var tmp_id = paramses[i][1] + "_" + paramses[i][0];
                var tmp_seed = get_seed(paramses[i]);
                if (!audio_url_cache.has(tmp_id))
                {
                    all_full_ids.push(tmp_id + (tmp_seed ? '_' + tmp_seed : ''));
                    if (all_full_ids.length >= 4) {
                        break;
                    }
                }
            }
            (!window.vk || !window.vk.id) && update_user_vk_id();
            this.ajax.send({
                url: "https://vk.com/al_audio.php",
                type: "POST",
                responseType: "",
                content: "act=reload_audio&al=1&ids=" + all_full_ids.join(','),
                onload: function () {
                    try
                    {
                        var res = JSON.parse(this.response);
                        res = res.payload[1][0];
                        for (var i = 0; i < res.length; i++)
                        {
                            var id = res[i][1] + '_' + res[i][0];
                            decode_audio_url(id, res[i][2], function(id, decoded_url) {
                                audio_url_cache.add(id, decoded_url);
                            });
                        }
                    }
                    catch(e){}

                    if (audio_url_cache.has(cur_id)) {
                        var cur_url = audio_url_cache.get(cur_id);
                        callback && callback({url: cur_url, is_m3u: /^http.*\/index\.m3u8/.test(cur_url)});
                    }
                    else {
                        callback && callback({success: false});
                    }
                },
                onerror: function() {
                    callback && callback({success: false});
                }
            });
        }
    }
});
App.Content.Audio.Track = App.Content.extend({
    constructor: function(global, chrome, id, isNew) {
        this.base(global, chrome);

        this.trackId = id;
        this.isNew = isNew;
        this.url = null;
        this.is_m3u = false;
        this.text = null;
        this.wrap = null;
        this.length = null;
        this.button = null;
        this.bitrate = null;
        this.bitrateCss = null;
    },
    injectElements: function(wrapNode) {
        this.wrap = wrapNode;
        if (!this.params || !this.params[2])
        {
            this.params = JSON.parse(wrapNode.getAttr("data-audio"));
        }
        if (!this.isNew) {
            this.url =  wrapNode.find("input").getValue();
        } else {
            if (!this.params) return;
            this.url = this.params.length > 2 ? this.params[2]: this.params['url'];
        }
        if (!this.url)
        {
            this.url = this.params[1] + '_' + this.params[0];
        }

        if (wrapNode.dom.classList.contains('OwnerContentTabAudiosItem')) {
            if (!wrapNode.find(this.selector.button)) {
                this._appendButton(), this.__getBitrate();
                wrapNode.setAttr('vkdButtonAdded', '');
            }

            return !(this.isNew && !this.url);
        }
        else if (this.isNew)
        {
            if (this.wrap.dom.parentNode.classList.contains('choose_row'))
            {
                var par = this.wrap.dom.parentNode;
                par.style['overflow'] = 'visible';
                par.style['width'] = '494px';
            }
            var duration = this.wrap.dom.querySelector('.audio_row__duration'),
                acts = this.wrap.dom.querySelector('._audio_row__actions'),
                bitrate_timeout,
                moveButton_timeout,
                intervalTimer;
            this.wrap.dom.addEventListener("mouseenter", (function(track) {return function() {
                if (!track.wrap.dom.isConnected) {
                    //need to reconnect
                    //new design tracks dont have id in classlist, but have data-full-id attribute
                    const fullId = track.wrap.dom.dataset['fullId'];
                    if (fullId) {
                        track.wrap.dom = document.querySelector(`[data-full-id="${fullId}"]`);
                    }
                    else {
                        //for old tracks (without data-full-id) find by classlist as before
                        track.wrap.dom = document.querySelector(('.' + [].slice.call(track.wrap.dom.classList).join('.')));
                    } 
                }

                if (intervalTimer) {
                    clearInterval(intervalTimer);
                }
                intervalTimer = setInterval(moveButton.bind(this), 100);

                function moveButton () {
                    var acts = track.wrap.dom.querySelector('._audio_row__actions');
                    var button = acts ? acts.querySelector('.vkd-button-download') : null;
                    if (acts && !button) {
                        track._appendButtonToActs();
                        track._appendQuality();
                        if (!this.classList.contains('bitrated'))
                        {
                            if (!global_request_flag)
                            {
                                track.__getBitrate();
                                global_request_flag = true;
                                setTimeout(function() {
                                    global_request_flag = false
                                }, 1000);
                            }
                            else
                            {
                                if (bitrate_timeout) {
                                    clearTimeout(bitrate_timeout);
                                }
                                bitrate_timeout = setTimeout(function() {
                                    track.__getBitrate();
                                }, 1000);
                            }
                        }
                    }
                }

                moveButton.apply(this);
            }})(this), false);

            this.wrap.dom.addEventListener("mouseleave", (function(track) {return function() {
                if (moveButton_timeout) {
                    clearTimeout(moveButton_timeout);
                }
                if (intervalTimer) {
                    clearInterval(intervalTimer);
                }
            }})(this), false);
        }

        this._appendButton(), this._appendQuality();

        return !(this.isNew && !this.url);
    },
    _sendDownloadMessage: function(trackUrl, trackTitle) {
        var data = {
            url: trackUrl,
            type: "audio",
            filename: trackTitle + ".mp3"
        };
        var progress_bar = this.domFactory.create(document.createElement("div"), {"class": "progress-bar"});
        this.wrap.appendChild(progress_bar, true);
        var on_message = function(e) {
            if (e.data.url == trackUrl) {
                if (e.success) {
                    if (e.action == "buffering") {
                        if (e.data.perc < 100) {
                            progress_bar.setAttr("style", "width:" + e.data.perc + "%");
                        }
                        else {
                            progress_bar.dom.remove();
                        }
                    }
                    else if (e.action == 'downloadsStarted') {
                        this._removeMessageListenter(on_message);
                    }
                }
                else {
                    progress_bar.dom.remove();
                    this._removeMessageListenter(on_message);
                } 
            }
        }.bind(this)
        this._addMessageListenter(on_message);
        this._sendMessage("download", data);
    },
    _appendButton: function() {
        var buttonNode = this._getButton();
        buttonNode.on("click", function(e) {
            e.preventDefault(); e.stopPropagation();
            var trackName = this._getName();
            this._sendDownloadMessage(this.url, trackName);
        }, this);

        var targetNode = this.wrap.find(!this.isNew ? this.selector.actions : this.selector.actionsNew);
        if (!targetNode) {
            targetNode = this.wrap.find('.audio_row__inner');
        }
        if (targetNode) {
            if (this.isNew)
            {
                buttonNode instanceof App.Dom ? (buttonNode.dom.style['float'] = 'left', buttonNode.dom.style['visibility'] = 'visible', buttonNode.dom.style['display'] = 'none') : (buttonNode.style['float'] = 'left', buttonNode.style['visibility'] = 'visible', buttonNode.style['display'] = 'none');
            }
        } else {
            targetNode = this.wrap.find('.SecondaryAttachment__after');
        }
        if (!targetNode) {
            targetNode = this.wrap.find('.OwnerContentTabAudiosItem__body');
        }
        targetNode.appendChild(buttonNode, !this.isNew);
    },
    _appendButtonToActs: function() {
        var targetNode = this.wrap.find('._audio_row__actions');
        if (!targetNode.dom.querySelector('.vkd-button-download')) {
            var buttonNode = this.__createButton();
            this.button = buttonNode;
            var _this = this;
            buttonNode.on("click", function(e) {
                e.preventDefault(); e.stopPropagation();
                if (this.url.indexOf('http') != 0)
                {
                    _this.download_after_getting_url = true;
                    return;
                }
                var trackName = this._getName();
                this._sendDownloadMessage(this.url, trackName);
            }, this);
            targetNode.appendChild(buttonNode, !this.isNew);
            if (this.isNew)
            {
                buttonNode instanceof App.Dom ? (buttonNode.dom.style['float'] = 'left', buttonNode.dom.style['visibility'] = 'visible', buttonNode.dom.style['display'] = 'inline-block') : (buttonNode.style['float'] = 'left', buttonNode.style['visibility'] = 'visible', buttonNode.style['display'] = 'inline-block');
            }
        }
    },
    _appendQuality: function() {
        if (this.text === null || this.bitrateCss === null) {
           this.__defineQuality();
        }
        else {
            this._setWrapClass(this.bitrateCss);
            this._setButtonHover(this.text);
        }
    },
    __defineQuality: function() {
        if (this.url && this.url.indexOf('http') === 0)
        {
            if (!this.is_m3u) {
                var self = this;
                var queryConfig = {
                    url: this.url,
                    type: "HEAD",
                    onload: function() {
                        self.__onHeadersReceived.call(self, this);
                    },
                    onerror: function () {
                        self.wrap.dom.classList.remove('bitrated');
                    }
                };
                this.ajax.send(queryConfig);
            }
        }
        else if (!this.isNew)
        {
            var btn = this.wrap.dom.querySelector('.vkd-button-download');
            if (btn)
            {
                btn.remove();
            }
        }
    },
    __getBitrate: function() {
        var tracks = [this.params];
        var next_track = this.wrap.dom.nextSibling;
        for (var i = 0; i < 3 && next_track;)
        {
            if (next_track.classList && !next_track.classList.contains('bitrated'))
            {
                i++;
                var next_track_params = JSON.parse(next_track.getAttribute("data-audio") || "[]");
                if (next_track_params)
                {
                    tracks.push(next_track_params);
                }
            }
            next_track = next_track.nextSibling;
        }

        this.wrap.dom.classList.add('bitrated');
        App.Content.Audio.Instance.getURL(0, tracks, function(res) {
            if (res.url) {
                this.url = res.url;
                this.is_m3u = res.is_m3u;
                if (this.download_after_getting_url)
                {
                    this._sendDownloadMessage(this.url, this._getName());
                    this.download_after_getting_url = false;
                }

                this.__defineQuality();
            }
            else {
                this.wrap.dom.classList.remove('bitrated');
            }
        }.bind(this));
    },
    __onHeadersReceived: function(xhr) {
        var trackSize = xhr.getResponseHeader("content-length") >> 0;
        var trackLength = !this.isNew ? this._getLength() : this.params[5];
        var trackBitrate = this._getBitrate(trackSize, trackLength);
        this.text = this._getFormattedText(trackBitrate);
        this.bitrateCss = this._getBitrateCss(trackBitrate);

        this._setWrapClass(this.bitrateCss);
        this._setButtonHover(this.text);
    },
    _getName: function() {
        var bandName = this.wrap.find(!this.isNew ? this.selector.band : this.selector.band_new);
        if (bandName) {
            bandName = bandName.getText();
        } else {
            bandName = this.params && this.params[4];
        }
        var songName = this.wrap.find(!this.isNew ? this.selector.title : this.selector.title_new);
        if (songName) {
            songName = songName.getText();
        } else {
            songName = this.params && this.params[3];
        }
        var fullName = [bandName, songName].join(" - ");
        return this._prepareFileName(fullName);
    },
    _getLength: function() {
        if(this.length === null)
            this.length = this.url.match(/\d+$/) >> 0;
        return this.length;
    },
    _getFormattedText: function(bitrate) {
        if(this.text === null)
            this.text = this._getString("audio", "download");
        return String.format(this.text, bitrate);
    },
    _getBitrate: function(byteSize, secLength) {
        if(this.bitrate === null)
            this.bitrate = this.__defineBitrate(byteSize, secLength);
        return this.bitrate;
    },
    __defineBitrate: function(byteSize, secLength) {
        var bitrateMin = this.settings.bitrate.min;
        var bitrateMax = this.settings.bitrate.max;
        var bitrate = (byteSize / secLength / 125) >> 0;
        switch(true) {
            case Number.isBetween(bitrate, bitrateMin, bitrateMin + 10):
                return bitrateMin;
            case Number.isBetween(bitrate, bitrateMax - 10, bitrateMax):
                return bitrateMax;
            default:
                return Number.between(bitrate, bitrateMin, bitrateMax);
        }
    },
    _getBitrateCss: function(bitrate) {
        if(this.bitrateCss === null)
            this.bitrateCss = this.__defineBitrateCss(bitrate);
        return this.bitrateCss;
    },
    __defineBitrateCss: function(bitrate) {
        switch(true) {
            case bitrate < this.settings.bitrate.low:
                return this.css.bitrate.lowest;
            case bitrate < this.settings.bitrate.average:
                return this.css.bitrate.low;
            case bitrate < this.settings.bitrate.high:
                return this.css.bitrate.average;
            default:
                return this.css.bitrate.high;
        }
    },
    _getButton: function() {
        if(this.button === null)
            return this.button = this.__createButton();
        return this.button = this.button.clone();
    },
    __createButton: function() {
        return this.domFactory.create(document.createElement("a"), {"class": this.css.button, href: "#"});
    },
    _setWrapClass: function(css) {
        this.wrap.addClass(css);
    },
    _setButtonHover: function(text) {
        var tooltip = this.domFactory.create(document.createElement("div"), {"class": "tooltip"});
        tooltip.appendChild(this.domFactory.create(document.createElement("div"), {"class": "tt_text"}).setText(text));
        this.button.appendChild(tooltip);
        this.button.dom.onmouseover = function() {
            tooltip.addClass("show");
        }
        this.button.dom.onmouseout = function() {
            tooltip.removeClass("show");
        }
    }
});

// Settings
App.Content.Audio.Track.prototype.extend({
    css: {
        button: "vkd-button-download audio_edit_wrap",
        bitrate: {
            high    : "vkd-bitrate-high",
            average : "vkd-bitrate-average",
            low     : "vkd-bitrate-low",
            lowest  : "vkd-bitrate-lowest"
        }
    },
    selector: {
        band: "b",
        band_new: ".audio_row__performer, .audio_row__performers, .SecondaryAttachment__description",
        title: ".title",
        title_new: ".audio_row__title_inner, .SecondaryAttachmentTitle > .SecondaryAttachment__childrenText",
        button: ".vkd-button-download",
        actions: ".actions",
        actionsNew: "._audio_row__actions"
    },
    settings: {
        bitrate: {
            min     : 70,
            low     : 170,
            average : 220,
            high    : 280,
            max     : 320
        }
    }
});
App.Content.Audio.Group = App.Content.extend({
    constructor: function(global, chrome, playlist_id) {
        this.base(global, chrome);

        this.playlist_id = playlist_id;
        this.downloadBtns = {};
        this.wraps = {};
        this.tracks = {};
        this.isStatic = null;
        this.audioCount = 0;
        this.isDownloading = false;
        this.gettingTracks = false;
        this.downloadedStartedList = [];
        this.downloadedFailedList = [];
        this.downloadsQueue = [];
        this.downloadsListeners = {};
        this.groupIdDownloadAfterGettingTracks = null;
    },
    selector: {
        audio: ".audio_row, .SecondaryAttachment, .OwnerContentTabAudiosItem"
    },
    css: {
        downloading: 'vkd_downloading',
        ready: 'vkd_ready',
        anyMarkerStyles: 'vkd_downloaded_marker',
        readyMarker: 'vkd_downloaded_started_marker',
        failedMarker: 'vkd_downloaded_failed_marker',
        button: 'vkd_download_all_btn'
    },
    updateElements: function(groupNode, full_id) {
        groupNode && (this.wraps[full_id] = groupNode);

        if (this.gettingTracks) {
            return;
        }

        var download_btn = this.wraps[full_id].parent().find('.' + this.css.button);
        var mathed_id = full_id && (/^temp_/.test(full_id) ? null : full_id.match(/(-?\d+)_(-?\d+)/));
        if (this.isStatic === null) {
            this.isStatic = mathed_id ? mathed_id.length > 2 : false;
        }

        if (this.isStatic) {
            var can_download_count = this.audioCount ?
                this.audioCount - this.downloadedStartedList.length - this.downloadedFailedList.length :
                999;
            if (!download_btn && can_download_count > 0) {
                this.isStatic = true;
                var ownerId = mathed_id[1];
                var playlistId = mathed_id[2];
                this.gettingTracks = true;
                this._getTracksCountForPlaylist(playlistId, ownerId, function(count) {
                    this.audioCount = count;
                    this._appendDownloadButton(full_id);
                    this._getTrackIdsForPlaylist(playlistId, ownerId, function(tracks) {
                        this.gettingTracks = false;
                        this.tracks = {};
                        if (tracks && tracks.length > 1) {
                            this.audioCount = tracks.length;
                            for (var i = 0; i < this.audioCount; i++) {
                                this.tracks[tracks[i][1] + '_' + tracks[i][0]] = tracks[i];
                            }
                            this._updateByttonText();
                        }
                        else {
                            this.isStatic = false;
                        }
                        if (this.groupIdDownloadAfterGettingTracks) {
                            this._startGroupDownloading(this.groupIdDownloadAfterGettingTracks);
                        }
                    }.bind(this));
                }.bind(this));
            }
            else if (can_download_count <= 0) {
                this.downloadBtns[full_id] && this.downloadBtns[full_id].dom.remove();
                delete this.downloadBtns[full_id];
            }
            this._markAudios();
        }
        else if (/^id/.test(full_id)) {
            var audiosItems = groupNode && groupNode.findAll(this.selector.audio);
            audiosItems && (this.audioCount = audiosItems.length);
            var can_download_count = this.audioCount - this.downloadedStartedList.length - this.downloadedFailedList.length;
            if (!download_btn && can_download_count > 0) {
                var user_id = full_id.match(/^id(\d+)/);
                user_id && user_id.length > 1 && (user_id = user_id[1]);
                this.gettingTracks = true;
                user_id && this._getTracksByUserId(user_id, this.audioCount, function(tracks) {
                    this.gettingTracks = false;
                    this.tracks = {};
                    if (tracks && tracks.length >= 1 && !tracks.some(item => item[1] != user_id)) {
                        this._appendDownloadButton(full_id);
                        for (var i = 0; i < this.audioCount; i++) {
                            this.tracks[tracks[i][1] + '_' + tracks[i][0]] = tracks[i];
                            audiosItems[i].setAttr('data-audio', JSON.stringify(tracks[i]));
                            audiosItems[i].setAttr('data-full-id', tracks[i][1] + '_' + tracks[i][0]);
                        }
                        this._updateByttonText();
                    }
                    else {
                        this.isStatic = false;
                    }
                    if (this.groupIdDownloadAfterGettingTracks) {
                        this._startGroupDownloading(this.groupIdDownloadAfterGettingTracks);
                    }
                }.bind(this));
            }
            this._markAudios();
        }
        else {
            var total_count = this.wraps[full_id].findAll(this.selector.audio).length;
            var can_download_count = total_count - this.downloadedStartedList.length - this.downloadedFailedList.length;
            if (!download_btn && this.downloadBtns[full_id]) {
                delete this.downloadBtns[full_id];
            }

            if (!this.downloadBtns[full_id] && can_download_count > 0 && total_count > 1) {
                this.audioCount = total_count;
                this._appendDownloadButton(full_id);
                this._markAudios();
            }
            else if (can_download_count <= 0) {
                this.downloadBtns[full_id] && this.downloadBtns[full_id].dom.remove();
                delete this.downloadBtns[full_id];
            }
            else if (this.audioCount != total_count) {
                this.audioCount = total_count;
                this.downloadBtns[full_id] && this._updateByttonText();
                this._markAudios();
            }
        }
    },
    _prepareFileName: function(str) {
        var result;
        var node = new DOMParser().parseFromString(str, "text/html").querySelector("body");
        result = node.textContent;
        return App.Content.prototype._prepareFileName.apply(this, [result]);
    },
    _getTracksCountForPlaylist: function(playlist_id, owner_id, callback) {
        var access_hash = this.wraps[Object.keys(this.wraps)[0]].closest('[data-access-hash]');
        access_hash && (access_hash = access_hash.getAttr('data-access-hash'));
        var _this = this;
        this.ajax.send({
            url: "https://vk.com/al_audio.php",
            type: "POST",
            responseType: "",
            content: "act=load_section&al=1&type=playlist&playlist_id=" + playlist_id + "&owner_id=" + owner_id + (access_hash ? "&access_hash=" + access_hash : "") + "&offset=-1",
            onload: function() {
                try {
                    var res = JSON.parse(this.response);
                    var count = parseInt(res.payload[1][0].infoLine1.match(/\d+/)[0]);
                    callback && callback(count);
                }
                catch(e) {
                    callback && callback(0);
                }
            },
            onerror: function() {
                callback && callback(0);
            }
        });
    },
    _getTrackIdsForPlaylist: function(playlist_id, owner_id, callback, tracks) {
        tracks = tracks || [];
        var access_hash = this.wraps[Object.keys(this.wraps)[0]].closest('[data-access-hash]');
        access_hash && (access_hash = access_hash.getAttr('data-access-hash'));
        var _this = this;
        this.ajax.send({
            url: "https://vk.com/al_audio.php",
            type: "POST",
            responseType: "",
            content: "act=load_section&al=1&is_loading_all=1&band=false&claim=0&type=playlist&playlist_id=" + playlist_id + "&owner_id=" + owner_id + (access_hash ? "&access_hash=" + access_hash : "") + "&offset=" + tracks.length,
            onload: function() {
                try {
                    var res = JSON.parse(this.response);
                    res = res.payload[1][0];
                    if (res.hasMore) {
                        tracks = tracks.concat(res.list);
                        _this._getTrackIdsForPlaylist(playlist_id, owner_id, callback, tracks);
                    }
                    else {
                        callback && callback(tracks.concat(res.list));
                    }
                }
                catch(e) {
                    callback && callback(tracks);
                }
            },
            onerror: function() {
                callback && callback(tracks);
            }
        });
    },
    _getTracksByUserId: function(user_id, count, callback) {
        var _this = this;
        this.ajax.send({
            url: "https://vk.com/audios" + user_id,
            type: "GET",
            responseType: "document",
            onload: function() {
                try {
                    var audios = this.response.querySelectorAll(_this.selector.audio);
                    if (audios && audios.length > 0) {
                        var tracks = [];
                        if (audios.length >= count) {
                            for (var i = 0; i < count; i++) {
                                tracks.push(JSON.parse(audios[i].getAttribute('data-audio')));
                            }
                            callback && callback(tracks);
                        }
                        else {
                            callback && callback([]);
                        }
                    } else {
                       _this._getTracksByMe(count, callback)
                    }
                } catch(e) {
                    callback && callback([]);
                }
            },
            onerror: function() {
                callback && callback([]);
            }
        });
    },
    _getTracksByMe: function(count, callback) {
        var _this = this;
        this.ajax.send({
            url: "https://vk.com/audio?section=recoms_block&type=0",
            type: "GET",
            responseType: "document",
            onload: function() {
                try {
                    var audios = this.response.querySelectorAll(_this.selector.audio);
                    var tracks = [];
                    if (audios.length >= count) {
                        for (var i = 0; i < count; i++) {
                            tracks.push(JSON.parse(audios[i].getAttribute('data-audio')));
                        }
                        callback && callback(tracks);
                    }
                    else {
                        callback && callback([]);
                    }
                } catch(e) {
                    callback && callback([]);
                }
            },
            onerror: function() {
                callback && callback([]);
            }
        });
    },
    _appendDownloadButton: function(full_id) {
        this.downloadBtns[full_id] = this.domFactory.create(document.createElement("div"), {
            "class": this.css.button,
            "count": this.audioCount,
            "id": full_id
        });
        if (this.wraps[full_id].dom.classList.contains('OwnerContentTabAudios__items')) {
            var vkuiGroup = this.wraps[full_id].closest('.vkuiGroup');
            if (vkuiGroup) {
                var rectPar = vkuiGroup.dom.getBoundingClientRect();
                var rectCur = this.wraps[full_id].dom.getBoundingClientRect();
                this.downloadBtns[full_id].dom.style.top = (rectCur.y - rectPar.y - 11) + 'px';
            }
        }
        this._updateByttonText();
        this.wraps[full_id].insertBefore(this.downloadBtns[full_id]);
        this.downloadBtns[full_id].on('click', function(e) {
            e.stopPropagation();
            if (this.isDownloading) {
                this._stopGroupDownloading();
            }
            else {
                this._startGroupDownloading(e.target.id);
            }
        }.bind(this));
    },
    _updateByttonText: function() {
        for (var full_id in this.downloadBtns) {
            if (this.isDownloading) {
                var download_btn_text = this._getString("audio", "stop");
                this.audioCount > 0 && (download_btn_text += ' (' + this.downloadedStartedList.length + '/' + (this.audioCount - this.downloadedFailedList.length) + ')');
                this.downloadBtns[full_id].setText(download_btn_text);
                !this.wraps[full_id].hasClass(this.css.downloading) && this.wraps[full_id].addClass(this.css.downloading);
                !this.downloadBtns[full_id].hasClass(this.css.downloading) && this.downloadBtns[full_id].addClass(this.css.downloading);
            }
            else {
                var downloaded_count = this.downloadedStartedList.length;
                var download_btn_text = this._getString("audio", "downloadAll");
                this.audioCount > 0 && (download_btn_text += ' ' + (this.audioCount - downloaded_count) + '/' + (this.audioCount - this.downloadedFailedList.length));
                this.downloadBtns[full_id].setText(download_btn_text);
                this.wraps[full_id].hasClass(this.css.downloading) && this.wraps[full_id].removeClass(this.css.downloading);
                this.downloadBtns[full_id].hasClass(this.css.downloading) && this.downloadBtns[full_id].removeClass(this.css.downloading);
            }
        }
    },
    _markAudios: function(audio, asDownloaded) {
        if (audio) {
            audio.addClass(this.css.ready);
            !audio.find("." + this.css.anyMarkerStyles) && audio.appendChild(this.domFactory.create(document.createElement("div"), {
                "class": this.css.anyMarkerStyles + " " + (asDownloaded ? this.css.readyMarker : this.css.failedMarker),
                "alt": this._getString("audio", (asDownloaded ? "started" : "failed"))
            }), false);
        }
        else {
            Array.iterate(this.downloadedStartedList, function(item) {
                for (var full_id in this.wraps) {
                    var idem_el = this.wraps[full_id].find('[data-full-id="' + item + '"]:not(.' + this.css.ready + ')');
                    idem_el && this._markAudios(idem_el, true);
                }
            }, this);
            Array.iterate(this.downloadedFailedList, function(item) {
                for (var full_id in this.wraps) {
                    var idem_el = this.wraps[full_id].find('[data-full-id="' + item + '"]:not(.' + this.css.ready + ')');
                    idem_el && this._markAudios(idem_el, false);
                }
            }, this);
        }
    },
    _startGroupDownloading: function(full_id) {
        this.groupIdDownloadAfterGettingTracks = null;
        this.isDownloading = true;
        if (!this.isStatic) {
            var audios_in_wrap = this.wraps[full_id].findAll(this.selector.audio);
            for (var i = 0; i < audios_in_wrap.length; i++) {
                var audio_params = JSON.parse(audios_in_wrap[i].getAttr('data-audio') || '[]');
                if (audio_params['id']) {
                    /* 
                    audio_params from Object {} transform into Array: 
                    [0] = 'id', [1] = 'owner_id', 
                    [3] = 'title'
                    [4] = 'artist'
                    [13] = 'addHash'+//+'actionHash'+///+'urlHash'+/
                    */
                    this.tracks[audio_params['owner_id'] + '_' + audio_params['id']] = [audio_params['id'], audio_params['owner_id'],"", audio_params['title'], audio_params['artist'], "", "", "", "", "", "","","", `${audio_params['addHash']}//${audio_params['actionHash']}///${audio_params['urlHash']}/`];
                } else {
                    this.tracks[audio_params[1] + '_' + audio_params[0]] = audio_params;
                }
            }
        }
        this.downloadsQueue = Object.keys(this.tracks);
        this._updateByttonText();
        if (!this.gettingTracks) {
            this._nextDownloading((function(id) {
                this.downloadedStartedList.push(id);
                this._updateByttonText();
                for (var full_id in this.wraps) {
                    var ready_audio = this.wraps[full_id].find('[data-full-id="' + id + '"]');
                    ready_audio && this._markAudios(ready_audio, true);
                }
            }).bind(this), (function(id){
                this.downloadedFailedList.push(id);
                this._updateByttonText();
                for (var full_id in this.wraps) {
                    var failed_audio = this.wraps[full_id].find('[data-full-id="' + id + '"]');
                    failed_audio && this._markAudios(failed_audio, false);
                }
            }).bind(this));
        } else {
            this.groupIdDownloadAfterGettingTracks = full_id;
        }
    },
    _nextDownloading: function(onDownloadingStarted, onDownloadingSkipped) {
        if (!this.downloadsQueue || !this.downloadsQueue.length) {
            this._stopGroupDownloading();
            return;
        };

        var next = function() {
            setTimeout(function() {
                this._nextDownloading(onDownloadingStarted, onDownloadingSkipped);
            }.bind(this), 700);
        }.bind(this);

        var find_closest_or_first = function() {
            this._markAudios();
            for (var full_id in this.wraps) {
                var first_audio = this.wraps[full_id].find('[data-full-id]:not(.' + this.css.ready + ')');
                if (first_audio) {
                    return first_audio.getAttr('data-full-id');
                }
                else if (this.downloadsQueue.length) {
                    return this.downloadsQueue[0];
                }
            }
            return null;
        }.bind(this);
        var remove_from_queue_by_id = function(audio_id) {
            var ind = this.downloadsQueue.indexOf(audio_id);
            if (ind >= 0) {
                this.downloadsQueue.splice(ind, 1);
            }
        }.bind(this);

        var cur_id = find_closest_or_first();
        while (cur_id && this.downloadedStartedList.indexOf(cur_id) >= 0) {
            remove_from_queue_by_id(cur_id);
            cur_id = find_closest_or_first();
        }
        if (!cur_id)
        {
            this._stopGroupDownloading();
            return;
        }
        var array_of_params = Array.iterate(this.downloadsQueue, function(audio_id) {
            return this.tracks[audio_id];
        }, this);

        var ind = this.downloadsQueue.indexOf(cur_id);
        if (ind >= 0)
        {
            App.Content.Audio.Instance.getURL(ind, array_of_params, function(res) {
                remove_from_queue_by_id(cur_id);
                if (res.url) {
                    var progress_bars = [];
                    for (var full_id in this.wraps) {
                        var item = this.wraps[full_id].find('[data-full-id="' + cur_id + '"]');
                        if (item) {
                            var pr_bar = this.domFactory.create(document.createElement("div"), {"class": "progress-bar"});
                            progress_bars.push(pr_bar);
                            item.appendChild(pr_bar);
                        }
                    }
                    var on_message = function(data) {
                        if (data.data.url == res.url) {
                            if (data.success) {
                                if (data.action == "buffering") {
                                    if (data.data.perc < 100) {
                                        progress_bars.forEach(function(pr_bar) {pr_bar.setAttr("style", "width:" + data.data.perc + "%");});
                                    }
                                    else {
                                        progress_bars.forEach(function(pr_bar) {pr_bar.dom.remove();});
                                    }
                                }
                                else if (data.action == 'downloadsStarted') {
                                    this._removeMessageListenter(on_message);
                                    delete this.downloadsListeners[cur_id];
                                    onDownloadingStarted && onDownloadingStarted(cur_id);
                                    next();
                                }
                            }
                            else {
                                progress_bars.forEach(function(pr_bar) {pr_bar.dom.remove();});
                                this._removeMessageListenter(on_message);
                                delete this.downloadsListeners[cur_id];
                                onDownloadingSkipped && onDownloadingSkipped(cur_id);
                                if (data.action == "buffering") {
                                    next();
                                } else if (data.action == 'downloadsStarted') {
                                    this._stopGroupDownloading();
                                }
                            }
                        }
                    }.bind(this);
                    this._addMessageListenter(on_message);
                    this.downloadsListeners[cur_id] = on_message;
                    var file_name = this._prepareFileName(this.tracks[cur_id][4] + ' - ' + this.tracks[cur_id][3]);
                    this._sendMessage("download", {
                        url: res.url,
                        type: "audio",
                        filename: file_name + ".mp3",
                        playlist_id: this.playlist_id
                    });
                }
                else {
                    onDownloadingSkipped && onDownloadingSkipped(cur_id);
                    next();
                }
            }.bind(this));
        }
        else
        {// shouldn't be here but anyway
            onDownloadingSkipped && onDownloadingSkipped(cur_id);
            next();
        }
    },
    _stopGroupDownloading: function() {
        this.isDownloading = false;
        this.groupIdDownloadAfterGettingTracks = null;
        this.downloadsQueue = [];
        this._updateByttonText();
        for (var id in this.downloadsListeners) {
            this._removeMessageListenter(this.downloadsListeners[id]);
        }
        this.downloadsListeners = {};
        this._sendMessage("stop_buffering", {playlist_id: this.playlist_id});
        for (var full_id in this.wraps) {
            this.wraps[full_id].findAll('.progress-bar').forEach(function(pr_bar) {pr_bar.dom.remove();});
            this.updateElements(null, full_id);
        }
    }
});

// Photo
App.Content.Photo = App.Content.extend({
    selector: {
        layer: "#layer_wrap",
        original: "#pv_open_original",
        originalNew: "#pv_more_act_download"
    },
    constructor: function(global, chrome) {
        this.base(global, chrome);
        this.layer = this.body.find(this.selector.layer);
        this.observer = null;

        this.layer && this._startObserver();
    },
    destructor: function() {
        this.observer && this.observer.destroy();
    },
    _startObserver: function() {
        var options = {
            childList : true,
            subtree   : true,
            target    : this.layer.dom,
            callback  : Functions.on(this._updateCurrentContent, this)
        };
        this.observer = new App.Observer();
        this.observer.configure(options);
        this.observer.start();
    },
    _sendDownloadMessage: function (photoUrl, photoName) {
        var data = {
            url: photoUrl,
            type: "photo",
            filename: photoName
        };
        this._sendMessage("download", data);
    },
    _updateCurrentContent: function() {
        var targetNode = this.layer.find(this.selector.original);

        if (!targetNode)
        {
            targetNode = this.layer.find(this.selector.originalNew);
            this.isNew = true;
        }

        if(!targetNode || targetNode.hasData("vkd")) return;

        var photoUrl = targetNode.setData("vkd").getAttr("href");
        var photoName = window.location.pathname.match(/^\/photo([0-9-_]+)/) || window.location.search.match(/(?:\?|&)z=photo([0-9-_]+)/);
        if (photoName && photoName.length > 1)
        {
            var ext = photoUrl.match(/.*(\.[^?#]+)/g);
            photoName = photoName[1] + (ext && ext.length == 2 ? ext[1] : ".jpg");
        }
        if (!photoName)
        {
            photoName = (photoUrl.match(/[^\\//]+$/g) || ["Photo"])[0];
        }
        var anchorNode = this._getAnchor();
        if (this.isNew)
        {
            anchorNode.setAttr("class", "pv_more_act_item");
            anchorNode.setAttr("id", "pv_more_act_download");
        }
        anchorNode.on("click", Functions.on(function (e) {
            e.stopPropagation(); e.preventDefault();
            this._sendDownloadMessage(photoUrl, photoName);
        }, this));

        targetNode.insertAfter(anchorNode);
        var more_acts_popup = targetNode.closest('#pv_more_acts_tt');
        more_acts_popup.dom.style.top = (parseInt(more_acts_popup.dom.style.top || 0) - targetNode.dom.getBoundingClientRect().height) + 'px';
    },
    _getAnchor: function() {
        if(!this.cache.anchor)
            this.cache.anchor = this.__createAnchor();
        return this.cache.anchor.clone();
    },
    __createAnchor: function() {
        var text = this._getString("photo", "download");
        return this.domFactory.create(document.createElement("a"), {href: "#"}).setText(text);
    }
});

// Video
App.Content.Video = App.Content.extend({
    selector: {
        layer: "#mv_layer",
        flash: "embed",
        title: "#mv_title",
        more: ".like_btns"
    },
    css: {
        button: "vkd-download-video idd_wrap mv_more fl_l",
        resolution: {
            all: "vkd-resolution-240 vkd-resolution-360 vkd-resolution-480 vkd-resolution-720 vkd-resolution-1080",
            240: "vkd-resolution-240",
            360: "vkd-resolution-360",
            480: "vkd-resolution-480",
            720: "vkd-resolution-720",
            1080: "vkd-resolution-1080"
        }
    },
    constructor: function(global, chrome) {
        this.base(global, chrome);
        this.layer = null;
        this.observers = {
            body: new App.Observer(),
            layer: new App.Observer()
        };

        this._start();
    },
    destructor: function() {
        this.observers.body && this.observers.body.destroy();
        this.observers.layer && this.observers.layer.destroy();
    },
    _start: function() {
        this.layer = this.body.find(this.selector.layer);
        if(this.layer === null)
            return this._startBodyObserver();
        this._updateContent();
        this._startLayerObserver();
    },
    _startBodyObserver: function() {
        var options = {
            childList : true,
            target    : this.body.dom,
            callback  : Functions.on(this._trackLayer, this)
        };
        this.observers.body.configure(options);
        this.observers.body.start();
    },
    _startLayerObserver: function() {
        var options = {
            childList  : true,
            subtree    : true,
            target     : this.layer.dom,
            callback   : Functions.on(this._updateContent, this)
        };
        this.observers.layer.configure(options);
        this.observers.layer.start();
    },
    _trackLayer: function() {
        this.layer = this.body.find(this.selector.layer);
        if(this.layer === null) return;

        this.observers.body.destroy();
        this._startLayerObserver();
    },
    _updateContent: function() {
        this.youtube = this.layer.find('iframe#video_yt_player');
        if (this.youtube)
        {
            return;
        }

        this.flash = this.layer.find(this.selector.flash);
        if (!this.flash)
        {
            var _window = retrieve_window_variables([{
                var_name: "mvcur.player.vars",
                var_value: "(window.mvcur.player || window.html5video).getVars()"
            }]);
            this.html5vars = _window["mvcur.player.vars"];

            if (!this.html5vars)
            {
                return;
            }
        }

        this.more && this.layer.has(this.more) || (this.more = this.layer.find(this.selector.more), this.more && !this.more.hasData("vkd") && (this.title = this.layer.find(this.selector.title), this.title && this._appendButton()))
    },
    _addVideosFromHtml5Vars: function () {
        var videos = {};
        if (this.html5vars)
        {
            var vars = this.html5vars;
            var resArray = ["240", "360", "480", "720", "1080"];
            for (i = 0, l = resArray.length; i < l; i++)
            {
                var res = resArray[i];
                if (vars['url' + res])
                {
                    videos[res] = vars['url' + res];
                }
            }
        }
        return videos;
    },
    _sendDownloadMessage: function(videoUrl, videoTitle) {
        var data = {
            url: videoUrl,
            type: "video",
            filename: videoTitle + ".mp4"
        }
        this._sendMessage("download", data);
    },
    _appendButton: function() {
        this.more.setData("vkd");

        var videoConfig;
        var videoResolutions

        if (this.flash)
        {
            videoConfig = this._getVideoConfig();
            videoResolutions = this._getVideoResolutions(videoConfig);
        }
        else
        {
            videoResolutions = this._addVideosFromHtml5Vars();
        }

        if(Object.isEmpty(videoResolutions))
            return;

        var buttonClasses = this._getButtonCss(videoResolutions);
        var buttonNode = this._getButton(buttonClasses);
        buttonNode.on("click", Functions.on(function(e) {
            e.stopPropagation(); e.preventDefault();
            var target = this.domFactory.create(e.target);
            var targetResolution = target.getData("resolution");
            var videoTitle = this._getVideoTitle();
            var videoUrl = videoResolutions[targetResolution];
            this._sendDownloadMessage(videoUrl, videoTitle);
        }, this));

        this.more.insertAfter(buttonNode);
    },
    _getVideoConfig: function() {
        var videoOptions = this.flash.getAttr("flashvars") || "";
        return String.parseUrl(videoOptions);
    },
    _getVideoTitle: function() {
        return this._prepareFileName(this.title.getText());
    },
    _getVideoResolutions: function(config) {
        var resolutions = {};
        if((config["extra_data"] || "").endsWith("mp4"))
            resolutions["240"] = config["extra_data"];
        config["url240"] && (resolutions["240"] = config["url240"]);
        config["url360"] && (resolutions["360"] = config["url360"]);
        config["url480"] && (resolutions["480"] = config["url480"]);
        config["url720"] && (resolutions["720"] = config["url720"]);
        config["url1080"] && (resolutions["1080"] = config["url1080"]);
        return resolutions;
    },
    _getButton: function(cssClasses) {
        if(!this.cache.button)
            this.cache.button = this.__createButton();
        return this.cache.button.clone().switchClasses(this.css.resolution.all, cssClasses);
    },
    __createButton: function() {
        var text = this._getString("video", "download");
        var btn_dom = this.template.video(text);
        btn_dom.addClass(this.css.button);
        return btn_dom;
    },
    _getButtonCss: function(videoResolutions) {
        var handler = function(e) { return this.css.resolution[e] };
        return Array.iterate(Object.keys(videoResolutions), Functions.on(handler, this));
    }
});

var global_request_flag = false;
var audio_url_cache = {
    data: {},

    init: function() {
        chrome.storage.local.get('audio_url_cache', function(result) {
            audio_url_cache.data = result;
        });
    },

    has: function(id) {
        return this.data[id] != undefined;
    },

    add: function(id, href) {
        this.data[id] = href;
        chrome.storage.local.set({'audio_url_cache': this.data});
    },

    get: function(id) {
        return this.data[id];
    }
};

var retrieve_window_variables = function(variables) {
    var ret = {};

    var scriptContent = "";
    for (var i = 0; i < variables.length; i++) {
        scriptContent += "var tmp = undefined; try {tmp = " + variables[i].var_value + "}catch(e){tmp = undefined;} if (typeof tmp !== 'undefined') { document.body.setAttribute('tmp_" + variables[i].var_name + "', JSON.stringify(tmp));} else { document.body.removeAttribute('tmp_" + variables[i].var_name + "');}\n"
    }

    var script = document.createElement('script');
    script.id = 'tmpScript';
    script.appendChild(document.createTextNode(scriptContent));
    (document.body || document.head || document.documentElement).appendChild(script);

    for (var i = 0; i < variables.length; i++) {
        var currVariable = variables[i].var_name;
        ret[currVariable] = JSON.parse(document.body.getAttribute("tmp_" + currVariable));
        document.body.removeAttribute("tmp_" + currVariable);
    }

    script.remove();

    return ret;
}

var update_user_vk_id = function() {
    var _window = retrieve_window_variables([{
        var_name: "vk",
        var_value: "window.vk"
    }]);
    window.vk = _window["vk"];
}

var audio_url_decoder = function() {
    var decoder;
    var loading = false;

    function get_audio_url_decoder() {

        function GetVKAudioDecoder(e) {
            // code from https://vk.com/js/al/audioplayer.js or https://vk.com/js/cmodules/bundles/common.{random_seed}.js
            "use strict";
            function i() {
                return window.wbopen && ~(window.open + "").indexOf("wbopen")
            }
            function o(t) {
                if (!i() && ~t.indexOf("audio_api_unavailable")) {
                    var e = t.split("?extra=")[1].split("#")
                      , o = "" === e[1] ? "" : a(e[1]);
                    if (e = a(e[0]),
                    "string" != typeof o || !e)
                        return t;
                    o = o ? o.split(String.fromCharCode(9)) : [];
                    for (var s, r, n = o.length; n--; ) {
                        if (r = o[n].split(String.fromCharCode(11)),
                        s = r.splice(0, 1, e)[0],
                        !l[s])
                            return t;
                        e = l[s].apply(null, r)
                    }
                    if (e && "http" === e.substr(0, 4))
                        return e
                }
                return t
            }
            function a(t) {
                if (!t || t.length % 4 == 1)
                    return !1;
                for (var e, i, o = 0, a = 0, s = ""; i = t.charAt(a++); )
                    i = r.indexOf(i),
                    ~i && (e = o % 4 ? 64 * e + i : i,
                    o++ % 4) && (s += String.fromCharCode(255 & e >> (-2 * o & 6)));
                return s
            }
            function s(t, e) {
                var i = t.length
                  , o = [];
                if (i) {
                    var a = i;
                    for (e = Math.abs(e); a--; )
                        e = (i * (a + 1) ^ e + a) % i,
                        o[a] = e
                }
                return o
            }
            Object.defineProperty(e, "__esModule", {
                value: !0
            }),
            e.audioUnmaskSource = o;
            var r = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMN0PQRSTUVWXYZO123456789+/=",
                l = {
                    v: function(t) {
                        return t.split("").reverse().join("")
                    },
                    r: function(t, e) {
                        t = t.split("");
                        for (var i, o = r + r, a = t.length; a--; )
                            i = o.indexOf(t[a]),
                            ~i && (t[a] = o.substr(i - e, 1));
                        return t.join("")
                    },
                    s: function(t, e) {
                        var i = t.length;
                        if (i) {
                            var o = s(t, e)
                              , a = 0;
                            for (t = t.split(""); ++a < i; )
                                t[a] = t.splice(o[i - 1 - a], 1, t[a])[0];
                            t = t.join("")
                        }
                        return t
                    },
                    i: function(t, e) {
                        return l.s(t, e ^ window.vk.id)
                    },
                    x: function(t, e) {
                        var i = [];
                        return e = e.charCodeAt(0),
                        each(t.split(""), function(t, o) {
                            i.push(String.fromCharCode(o.charCodeAt(0) ^ e))
                        }),
                        i.join("")
                    }
                }
        }

        var obj = {};
        GetVKAudioDecoder(obj);
        decoder = obj.audioUnmaskSource;
    }
    if (!decoder)
    {
        get_audio_url_decoder();
    }

    return function decode(id, encoded_url, callback) {
        if (decoder)
        {
            callback(id, decoder(encoded_url));
            return;
        }
        else if (!loading)
        {
            get_audio_url_decoder();
        }
        setTimeout(function() {
            decode(id, encoded_url, callback);
        }, 500);
    }
}
var decode_audio_url = new audio_url_decoder();

audio_url_cache.init();

App.Content.Bootstrap(window, chrome);
window.onbeforeunload = App.Content.Destroy;
