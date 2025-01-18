!function(modules, entry, mainEntry, parcelRequireName, globalName) {
  var globalObject = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : {}, previousRequire = "function" == typeof globalObject.parcelRequire94c2 && globalObject.parcelRequire94c2, cache = previousRequire.cache || {}, nodeRequire = "undefined" != typeof module && "function" == typeof module.require && module.require.bind(module);
  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        var currentRequire = "function" == typeof globalObject.parcelRequire94c2 && globalObject.parcelRequire94c2;
        if (!jumped && currentRequire) return currentRequire(name, !0);
        if (previousRequire) return previousRequire(name, !0);
        if (nodeRequire && "string" == typeof name) return nodeRequire(name);
        var err = new Error("Cannot find module '" + name + "'");
        throw err.code = "MODULE_NOT_FOUND", err;
      }
      localRequire.resolve = function(x) {
        return modules[name][1][x] || x;
      }, localRequire.cache = {};
      var module = cache[name] = new newRequire.Module(name);
      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }
    return cache[name].exports;
    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }
  }
  newRequire.isParcelRequire = !0, newRequire.Module = function(moduleName) {
    this.id = moduleName, this.bundle = newRequire, this.exports = {};
  }, newRequire.modules = modules, newRequire.cache = cache, newRequire.parent = previousRequire, 
  newRequire.register = function(id, exports) {
    modules[id] = [ function(require, module) {
      module.exports = exports;
    }, {} ];
  }, Object.defineProperty(newRequire, "root", {
    get: function() {
      return globalObject.parcelRequire94c2;
    }
  }), globalObject.parcelRequire94c2 = newRequire;
  for (var i = 0; i < entry.length; i++) newRequire(entry[i]);
  var mainExports = newRequire("heyVG");
  "object" == typeof exports && "undefined" != typeof module ? module.exports = mainExports : "function" == typeof define && define.amd && define((function() {
    return mainExports;
  }));
}({
  heyVG: [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js"), _jsxRuntime = require("react/jsx-runtime"), _react = require("react"), _reactDom = (parcelHelpers.interopDefault(_react), 
    require("react-dom")), _reactDomDefault = parcelHelpers.interopDefault(_reactDom), _indexTsx = require("./index.tsx");
    _reactDomDefault.default.render(_jsxRuntime.jsx(_indexTsx.Main, {}), document.getElementById("root"));
  }, {
    "react/jsx-runtime": "aMvgd",
    react: "8Nzqg",
    "react-dom": "cnO8j",
    "./index.tsx": "beTm6",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  beTm6: [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "Main", (() => Main));
    var _jsxRuntime = require("react/jsx-runtime"), _checkbox = require("../common/photon-components-web/photon-components/Checkbox"), _checkboxDefault = parcelHelpers.interopDefault(_checkbox), _button = require("../common/photon-components-web/photon-components/Button"), _buttonDefault = parcelHelpers.interopDefault(_button), _common = (require("../common/tailwind.css"), 
    require("../common/photon-components-web/index.css"), require("../common/photon-components-web/attributes/index.css"), 
    require("./index.css"), require("../common/common")), _helpers = require("../common/helpers"), _react = require("react"), _webextensionPolyfillTs = require("webextension-polyfill-ts"), _links = require("../common/links");
    _webextensionPolyfillTs.browser.runtime.getURL("debug/index.html");
    function Main() {
      const [enableErrorReporting, setEnableErrorReporting] = _common.useErrorReportingToggle(), installationIdValue = _common.installationId.use(), {value: bg} = _helpers.useAsync(_helpers.getBackgroundScript, !0), toggleErrorReporting = _react.useCallback((async e => {
        const enabled = e.target.checked;
        bg.toggleErrorReporting(enabled), setEnableErrorReporting(enabled);
      }), [ bg ]), [dataDeletionRequested, setDataDeletionRequested] = _react.useState(!1), requestDataDeletion = _react.useCallback((async () => {
        bg.sendDataDeletionRequest(), setDataDeletionRequested(!0);
      }), [ bg ]), onExport = _react.useCallback((() => {
        const data = JSON.stringify((null == bg ? void 0 : bg.events) || []), url = URL.createObjectURL(new Blob([ data ], {
          type: "application/json"
        }));
        _webextensionPolyfillTs.browser.tabs.create({
          url: url
        });
      }), [ bg ]);
      return _jsxRuntime.jsxs(_jsxRuntime.Fragment, {
        children: [ _jsxRuntime.jsx("div", {
          className: "text-xl font-semibold",
          children: "Error Reporting"
        }), _jsxRuntime.jsx("div", {
          className: "my-4",
          children: _jsxRuntime.jsx("label", {
            className: "flex items-center",
            children: _jsxRuntime.jsxs("span", {
              className: "checkbox__label__text flex items-center",
              children: [ _jsxRuntime.jsx(_checkboxDefault.default, {
                className: "w-8 h-8 mr-2",
                label: "",
                value: "enable_error_reporting",
                checked: enableErrorReporting,
                onChange: toggleErrorReporting
              }), _jsxRuntime.jsx("span", {
                className: "ml-1",
                children: "Allow RegretsReporter to send information about encountered errors to Mozilla"
              }) ]
            })
          })
        }), _jsxRuntime.jsx("div", {
          className: "text-xl font-semibold mt-12",
          children: "Collected Data"
        }), _jsxRuntime.jsxs("div", {
          className: "my-4 flex justify-between items-center",
          children: [ _jsxRuntime.jsx("span", {
            className: "",
            children: "See what data RegretsReporter has collected so far"
          }), _jsxRuntime.jsx(_buttonDefault.default, {
            onClick: onExport,
            className: "btn btn-grey ml-4 text-center outline-none",
            target: "_blank",
            rel: "noreferrer",
            children: "Inspect Collected Data"
          }) ]
        }), _jsxRuntime.jsx("div", {
          className: "my-4 flex justify-between items-center",
          children: dataDeletionRequested && _jsxRuntime.jsx("span", {
            className: "text-center font-semibold",
            children: "Telemetry has been disabled and data deletion has been requested."
          }) || _jsxRuntime.jsxs(_jsxRuntime.Fragment, {
            children: [ _jsxRuntime.jsx("span", {
              className: "",
              children: "Disable telemetry and request that all your RegretsReporter data gets deleted from Mozilla's servers"
            }), _jsxRuntime.jsx(_buttonDefault.default, {
              onClick: requestDataDeletion,
              className: "btn btn-grey ml-4",
              children: "Send Data Deletion Request"
            }) ]
          })
        }), false, _jsxRuntime.jsx("div", {
          className: "text-xl font-semibold mt-12",
          children: "Feedback"
        }), _jsxRuntime.jsxs("div", {
          className: "my-4",
          children: [ "Do you have feedback about the RegretsReporter? We would love to hear it.", " ", _jsxRuntime.jsx("a", {
            href: _links.extensionFeedbackUrl,
            rel: "noreferrer noopener",
            target: "_blank",
            className: "text-red underline",
            children: "Send us feedback"
          }), "." ]
        }), _jsxRuntime.jsx("div", {
          className: "text-xl font-semibold mt-12",
          children: "Additional information"
        }), _jsxRuntime.jsxs("div", {
          className: "my-4",
          children: [ "Extension version: ", _jsxRuntime.jsx("code", {
            children: "2.1.1"
          }) ]
        }), _jsxRuntime.jsxs("div", {
          className: "my-4",
          children: [ "Extension Installation ID: ", _jsxRuntime.jsx("code", {
            children: installationIdValue
          }) ]
        }), _jsxRuntime.jsxs("div", {
          className: "my-4",
          children: [ "Error Reporting ID: ", _jsxRuntime.jsx("code", {
            children: installationIdValue
          }) ]
        }) ]
      });
    }
  }, {
    "react/jsx-runtime": "aMvgd",
    "../common/photon-components-web/photon-components/Checkbox": "c9z6E",
    "../common/photon-components-web/photon-components/Button": "ar4Nu",
    "../common/tailwind.css": "4H2Bi",
    "../common/photon-components-web/index.css": "42lIn",
    "../common/photon-components-web/attributes/index.css": "4rzQV",
    "./index.css": "kltD9",
    "../common/common": "jKOy4",
    "../common/helpers": "hce4W",
    react: "8Nzqg",
    "webextension-polyfill-ts": "g4Zvj",
    "../common/links": "4v6Gb",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  c9z6E: [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "Checkbox", (() => Checkbox));
    var _jsxRuntime = require("react/jsx-runtime"), _classnames = require("classnames"), _classnamesDefault = parcelHelpers.interopDefault(_classnames);
    require("./index.css"), require("./light-theme.css");
    const Checkbox = ({disabled: disabled, label: label, ...props}) => {
      const checkbox = _jsxRuntime.jsx("input", {
        className: _classnamesDefault.default("checkbox", {
          "checkbox--disabled": disabled
        }),
        disabled: disabled,
        type: "checkbox",
        ...props
      });
      return label ? _jsxRuntime.jsxs("label", {
        className: _classnamesDefault.default("checkbox__label", {
          "checkbox--disabled": disabled
        }),
        children: [ checkbox, _jsxRuntime.jsx("span", {
          className: _classnamesDefault.default("checkbox__label__text", {
            "checkbox--disabled__label__text": disabled
          }),
          children: label
        }) ]
      }) : checkbox;
    };
    exports.default = Checkbox;
  }, {
    "react/jsx-runtime": "aMvgd",
    classnames: "g4yFL",
    "./index.css": "h7zC7",
    "./light-theme.css": "4sWZ3",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  g4yFL: [ function(require, module, exports) {
    !function() {
      var hasOwn = {}.hasOwnProperty;
      function classNames() {
        for (var classes = [], i = 0; i < arguments.length; i++) {
          var arg = arguments[i];
          if (arg) {
            var argType = typeof arg;
            if ("string" === argType || "number" === argType) classes.push(arg); else if (Array.isArray(arg)) {
              if (arg.length) {
                var inner = classNames.apply(null, arg);
                inner && classes.push(inner);
              }
            } else if ("object" === argType) if (arg.toString === Object.prototype.toString) for (var key in arg) hasOwn.call(arg, key) && arg[key] && classes.push(key); else classes.push(arg.toString());
          }
        }
        return classes.join(" ");
      }
      void 0 !== module && module.exports ? (classNames.default = classNames, module.exports = classNames) : "function" == typeof define && "object" == typeof define.amd && define.amd ? define("classnames", [], (function() {
        return classNames;
      })) : window.classNames = classNames;
    }();
  }, {} ],
  h7zC7: [ function() {}, {} ],
  "4sWZ3": [ function() {}, {} ],
  ar4Nu: [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "Button", (() => Button));
    var _jsxRuntime = require("react/jsx-runtime");
    require("./index.css");
    const Button = ({type: type, photonSize: photonSize, children: children, ...props}) => {
      let optionClasses = "button ";
      return type && (optionClasses = optionClasses += `button--${type} `), photonSize && (optionClasses = optionClasses += `button--${photonSize} `), 
      _jsxRuntime.jsx("button", {
        className: optionClasses,
        ...props,
        children: children
      });
    };
    exports.default = Button;
  }, {
    "react/jsx-runtime": "aMvgd",
    "./index.css": "iZBdF",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  iZBdF: [ function() {}, {} ],
  "4H2Bi": [ function() {}, {} ],
  "42lIn": [ function() {}, {} ],
  "4rzQV": [ function() {}, {} ],
  kltD9: [ function() {}, {} ]
}, [ "heyVG" ]);