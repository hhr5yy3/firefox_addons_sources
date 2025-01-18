var config = {};

config.addon = {
  set contextmenu (val) {app.storage.write("context-menu", val)},
  get contextmenu () {return app.storage.read("context-menu") !== undefined ? app.storage.read("context-menu") : true}
};

config.popup = {
  set shortcut (val) {app.storage.write('shortcut', val)},
  get width () {return +app.storage.read('width') || 500},
  get height () {return +app.storage.read('height') || 600},
  set inputword (val) {app.storage.write('inputword', val)},
  set targetlang (val) {app.storage.write('targetlang', val)},
  set sourcelang (val) {app.storage.write('sourcelang', val)},
  get targetlang () {return app.storage.read('targetlang') || "en"},
  get sourcelang () {return app.storage.read('sourcelang') || "auto"},
  get shortcut () {return app.storage.read('shortcut') || "accel-alt-s"},
  get inputword () {return app.storage.read('inputword') || "translate"},
  set width (val) {
    val = +val;
    if (val < 350) val = 350;
    app.storage.write('width', val);
  },
  set height (val) {
    val = +val;
    if (val < 415) val = 415;
    app.storage.write('height', val);
  }
};

config.get = function (name) {return name.split('.').reduce(function (p, c) {return p[c]}, config)};

config.set = function (name, value) {
  function set(name, value, scope) {
    name = name.split('.');
    if (name.length > 1) set.call((scope || this)[name.shift()], name.join('.'), value);
    else this[name[0]] = value;
  }
  /*  */
  set(name, value, config);
};
