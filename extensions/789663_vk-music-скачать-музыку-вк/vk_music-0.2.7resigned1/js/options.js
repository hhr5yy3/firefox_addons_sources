!function(global, factory) {
    if ("function" == typeof define && define.amd) {
        define([ "~lib/messaging", "~lib/settings", "~lib/i18n", "~lib/utils" ], factory);
    } else if ("undefined" != typeof exports) {
        factory(require("~lib/messaging"), require("~lib/settings"), require("~lib/i18n"), require("~lib/utils"));
    } else {
        factory(global.messaging, global.settings, global.i18n, global.utils);
        global.options = {};
    }
}(this, function(_messaging, _settings, _i18n, _utils) {
    "use strict";
    var _messaging2 = _interopRequireDefault(_messaging);
    var _settings2 = _interopRequireDefault(_settings);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }
    var version = chrome.runtime.getManifest().version;
    var Messages = new _messaging2.default({
        name: "ext_options"
    });
    Messages.onMessage(function(msg) {
        switch (msg.act) {
          case "get_settings":
            Object.assign(_settings2.default, msg.data), domready(start);
            break;

          default:
            return;
        }
    }), Messages.post({
        act: "get_settings"
    });
    function start() {
        Messages.post({
            act: "track_page",
            data: [ "options", "Options page" ]
        });
        var verEl = (0, _utils.geByClass1)("version");
        verEl && (verEl.innerText = version);
        (0, _i18n.domI18n)();
        (0, _utils.each)((0, _utils.domQuery)("select,input"), function() {
            var _this = this;
            var name = this.name, value = this.value;
            switch (this.type) {
              case "checkbox":
                this.checked = _settings2.default[name];
                break;

              case "radio":
                if (value == _settings2.default[name]) {
                    this.checked = !0;
                }
                break;

              default:
                this.value = _settings2.default[name];
            }
            updateValue(name, _settings2.default[name]);
            this.addEventListener("change", function() {
                switch (_this.type) {
                  case "checkbox":
                    _settings2.default[name] = _this.checked;
                    break;

                  case "range":
                    _settings2.default[name] = (0, _utils.intval)(_this.value);
                    break;

                  default:
                    _settings2.default[name] = _this.value;
                }
                updateValue(name, _settings2.default[name]);
                Messages.post({
                    act: "track_event",
                    data: [ "options", "change", name + ":" + _settings2.default[name] ]
                });
                Messages.post({
                    act: "set_settings",
                    data: _settings2.default
                });
            });
        });
    }
    function updateValue(name, value) {
        var valueEl = document.getElementById(name + "-value");
        valueEl && (valueEl.innerText = value);
    }
});