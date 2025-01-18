var config = {};

config.options = {
  set SorH (val) {app.storage.write("settings-or-history", val)},
  get SorH () {return app.storage.read("settings-or-history") || "settings"}
};

config.history = {
  set enable (val) {app.storage.write("enableHistory", val)},
  set data (val) {app.storage.write("history", JSON.stringify(val))},
  get enable () {return app.storage.read("enableHistory") || "true"},
  get data () {return JSON.parse(app.storage.read("history") || "[]")},
  get number () {return parseInt(app.storage.read("numberHistoryItems") || "20")},
  set number (val) {
    val = parseInt(val);
    if (val < 0) val = 0;
    app.storage.write("numberHistoryItems", val + '');
  }
};

config.translator = {
  set to (val) {app.storage.write("to", val)},
  set TKK (val) {app.storage.write("TKK", val)},
  set alt (val) {app.storage.write("alt", val)},
  set from (val) {app.storage.write("from", val)},
  get TKK () {return app.storage.read("TKK") || ''},
  get to () {return app.storage.read("to") || "en"},
  get alt () {return app.storage.read("alt") || "en"},
  get from () {return app.storage.read("from") || "auto"},
  set useCache (val) {app.storage.write("useCache", val)},
  get useCache () {return app.storage.read("useCache") || "true"},
  set shortcut (val) {app.storage.write('keyboard-shortcut', val)},
  set autoAdjustSize (val) {app.storage.write("autoAdjustSize", val)},
  get width () {return parseInt(app.storage.read("popupWidth") || "450")},
  get height () {return parseInt(app.storage.read("popupHeight") || "170")},
  get iwidth () {return parseInt(app.storage.read("popupiWidth") || "450")},
  get autoAdjustSize () {return app.storage.read("autoAdjustSize") || "true"},
  get iheight () {return parseInt(app.storage.read("popupiHeight") || "300")},
  get shortcut () {return app.storage.read('keyboard-shortcut') || "accel-alt-d"},
  set width (val) {
    if (!val || isNaN(val)) val = 450;
    val = parseInt(val);
    if (val < 300) val = 300;
    if (val > 700) val = 700;
    app.storage.write("popupWidth", val);
  },
  set height (val) {
    if (!val || isNaN(val)) val = 170;
    val = parseInt(val);
    if (val < 100) val = 100;
    if (val > 510) val = 510;
    app.storage.write("popupHeight", val);
  },
  set iwidth (val) {
    if (!val || isNaN(val)) val = 450;
    val = parseInt(val);
    if (val < 200) val = 200;
    if (val > 700) val = 700;
    app.storage.write("popupiWidth", val);
  },
  set iheight (val) {
    if (!val || isNaN(val)) val = 300;
    val = parseInt(val);
    if (val < 200) val = 200;
    if (val > 700) val = 700;
    app.storage.write("popupiHeight", val);
  }
};

config.settings = {
  set dbClick (val) {app.storage.write("isDblclick", val)},
  set showIcon (val) {app.storage.write("isTranslateIcon", val)},
  set selection (val) {app.storage.write("isTextSelection", val)},
  get dbClick () {return app.storage.read("isDblclick") || "false"},
  set contextMenu (val) {app.storage.write("showContextMenu", val)},
  set iconTopCorner (val) {app.storage.write("iconTopCorner", val)},
  set copyToClipboard (val) {app.storage.write("copyToClipboard", val)},
  get showIcon () {return app.storage.read("isTranslateIcon") || "true"},
  get selection () {return app.storage.read("isTextSelection") || "false"},
  set translateInNewTab (val) {app.storage.write("translateInNewTab", val)},
  get contextMenu () {return app.storage.read("showContextMenu") || "true"},
  get iconTopCorner () {return app.storage.read("iconTopCorner") || "true"},
  set translateInputArea (val) {app.storage.write("translateInputArea", val)},
  get copyToClipboard () {return app.storage.read("copyToClipboard") || "true"},
  get bubbleRGB () {return app.storage.read("bubbleRGB") || "rgb(222, 184, 135)"},
  set mouseOverTranslation (val) {app.storage.write("isMouseOverTranslation", val)},
  get translateInNewTab () {return app.storage.read("translateInNewTab") || "true"},
  get translateInputArea () {return app.storage.read("translateInputArea") || "true"},
  get translateIconShow () {return parseInt(app.storage.read("translateIconShow") || "0")},
  get translateIconTime () {return parseInt(app.storage.read("translateIconTime") || "5")},
  get mouseOverTranslation () {return app.storage.read("isMouseOverTranslation") || "false"},
  get minimumNumberOfCharacters () {return parseInt(app.storage.read("minimumNumberOfCharacters") || "3")},
  get exclude () {return app.storage.read("exclude") || 'https://translate.google.com/*, http://translate.google.com/*, *.xml'},
  set exclude (val) {
    val = val.split(/\s*\,\s*/).map(function (a) {return a.trim()}).filter(function (a) {return a}).filter(function (a, i, l) {return l.indexOf(a) === i}).join(', ');
    app.storage.write("exclude", val);
  },
  set translateIconTime (val) {
    val = parseInt(val);
    if (val < 1) val = 1;
    app.storage.write("translateIconTime", val);
  },
  set translateIconShow (val) {
    val = parseInt(val);
    if (val < 0) val = 0;
    app.storage.write("translateIconShow", val);
  },
  set minimumNumberOfCharacters (val) {
    val = parseInt(val);
    if (val < 1) val = 1;
    app.storage.write("minimumNumberOfCharacters", val);
  },
  set bubbleRGB (val) {
    if (val.indexOf("rgb(") === -1 || val.indexOf(")") === -1) val = "rgb(222, 184, 135)";
    app.storage.write("bubbleRGB", val);
  }
};

config.get = function (name) {return name.split('.').reduce(function (p, c) {return p[c]}, config)};

config.set = function (name, value) {
  function set(name, value, scope) {
    name = name.split('.');
    if (name.length > 1) set.call((scope || this)[name.shift()], name.join('.'), value);
    else this[name[0]] = value;
  }
  set(name, value, config);
};
