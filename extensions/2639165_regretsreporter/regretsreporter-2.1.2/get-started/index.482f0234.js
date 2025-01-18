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
  var mainExports = newRequire("1p1CZ");
  "object" == typeof exports && "undefined" != typeof module ? module.exports = mainExports : "function" == typeof define && define.amd && define((function() {
    return mainExports;
  }));
}({
  "1p1CZ": [ function(require, module, exports) {
    var _jsxRuntime = require("react/jsx-runtime"), _reactDom = (require("react"), require("react-dom")), _getStartedFlow = require("./GetStartedFlow");
    require("./index.css"), require("../common/fonts/changa.css"), require("../common/fonts/zilla-slab.css"), 
    require("../common/fonts/nunito-sans.css");
    (async () => {
      _reactDom.render(_jsxRuntime.jsx(_getStartedFlow.GetStartedFlow, {}), document.getElementById("app"));
    })();
  }, {
    "react/jsx-runtime": "aMvgd",
    react: "8Nzqg",
    "react-dom": "cnO8j",
    "./GetStartedFlow": "bT2Rj",
    "./index.css": "cDqvA",
    "../common/fonts/changa.css": "4ieuR",
    "../common/fonts/zilla-slab.css": "jFz1c",
    "../common/fonts/nunito-sans.css": "8Gyxh"
  } ],
  bT2Rj: [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "GetStartedFlow", (() => GetStartedFlow));
    var _jsxRuntime = require("react/jsx-runtime"), _react = require("react"), _yourPrivacy = (require("photon-colors/photon-colors.css"), 
    require("../common/photon-components-web/attributes/index.css"), require("../common/tailwind.css"), 
    require("./inc/YourPrivacy")), _checkbox = require("../common/photon-components-web/photon-components/Checkbox"), _checkboxDefault = parcelHelpers.interopDefault(_checkbox), _common = require("../common/common"), _helpers = require("../common/helpers"), _links = require("../common/links"), _storage = require("../common/storage"), _classnames = require("classnames"), _classnamesDefault = parcelHelpers.interopDefault(_classnames);
    function GetStartedFlow() {
      const [enableErrorReporting, setEnableErrorReporting] = _common.useErrorReportingToggle(), [submitted, setSubmitted] = _storage.useExtensionState(_storage.localStorageKeys.onboardingCompleted, !1), [experimentOptedIn, setExperimentOptIn] = _storage.useExtensionState(_storage.localStorageKeys.experimentOptedIn, !1), onSubmit = (_react.useCallback((async () => {
        const bg = await _helpers.getBackgroundScript(), installationIdValue = await _common.installationId.acquire(), personalSurveyUrl = `${_links.surveyUrl}#regretsreporter=${installationIdValue}`;
        await bg.onSurveyClick(), window.open(personalSurveyUrl, "_blank");
      }), []), _react.useCallback((async () => {
        setSubmitted(!0);
        const bg = await _helpers.getBackgroundScript();
        await bg.onOnboardingCompleted(experimentOptedIn), await bg.toggleErrorReporting(enableErrorReporting), 
        await bg.updateBadgeIcon();
      }), [ experimentOptedIn, enableErrorReporting ])), hideWelcomeSection = "#active-user" === window.location.hash;
      return _jsxRuntime.jsxs("div", {
        className: _classnamesDefault.default({
          "hide-welcome-section": hideWelcomeSection
        }),
        children: [ _jsxRuntime.jsx("div", {
          className: "img-get-started-bg absolute"
        }), _jsxRuntime.jsx("div", {
          className: "img-circles absolute"
        }), _jsxRuntime.jsxs("div", {
          className: "px-16",
          children: [ _jsxRuntime.jsx("div", {
            className: "flex flex-col",
            children: _jsxRuntime.jsxs("div", {
              className: "justify-center",
              children: [ _jsxRuntime.jsx("div", {
                className: "img-mozilla-logo m-auto mt-12.5 leading-none"
              }), _jsxRuntime.jsx("div", {
                className: "font-changa font-light text-2.25xl mt-4 leading-none text-center text-white",
                children: "RegretsReporter"
              }) ]
            })
          }), _jsxRuntime.jsxs("div", {
            className: "mx-auto max-w-3xl grid grid-cols-12 gap-5 font-sans text-xl",
            children: [ _jsxRuntime.jsx("div", {
              className: "col-span-1"
            }), _jsxRuntime.jsxs("div", {
              className: "col-span-10",
              children: [ !hideWelcomeSection && _jsxRuntime.jsxs(_jsxRuntime.Fragment, {
                children: [ _jsxRuntime.jsxs("div", {
                  className: "flex flex-col text-center text-white",
                  children: [ _jsxRuntime.jsx("div", {
                    className: "font-changa text-giant mt-16 leading-none",
                    children: "Welcome!"
                  }), _jsxRuntime.jsxs("div", {
                    className: "font-sans font-light text-left text-xl mt-5 leading-tight",
                    children: [ _jsxRuntime.jsx("p", {
                      children: "RegretsReporter will help you take control of your YouTube recommendations. It is also part of Mozilla’s crowdsourced research into YouTube’s algorithm to learn more about what people regret being recommended and how the algorithm responds to user feedback."
                    }), _jsxRuntime.jsx("br", {}), _jsxRuntime.jsxs("p", {
                      children: [ "If you choose to participate in our research, you may be assigned to a “control” (or “placebo”) group and the ", _jsxRuntime.jsx("span", {
                        className: "font-bold",
                        children: "extension may not function"
                      }), ". See more information about our research", " ", _jsxRuntime.jsx("a", {
                        href: _links.experimentGroupsUrl,
                        target: "_blank",
                        className: "underline",
                        rel: "noreferrer",
                        children: "here"
                      }), ". If you do choose to participate, please leave the extension installed even if it does not appear to be doing anything." ]
                    }), _jsxRuntime.jsx("br", {}), _jsxRuntime.jsxs("p", {
                      children: [ "Please also be aware that if you participate in our research, the extension will send Mozilla information about the number of videos you view, your use of features to control your recommendations, and information about the videos that you are recommended. To learn more about what RegretsReporter will collect, read our", " ", _jsxRuntime.jsx("a", {
                        href: _links.privacyNoticeUrl,
                        target: "_blank",
                        className: "underline",
                        rel: "noreferrer",
                        children: "Privacy Notice"
                      }), "." ]
                    }) ]
                  }) ]
                }), _jsxRuntime.jsx("div", {
                  className: "action-result",
                  children: submitted ? _jsxRuntime.jsx("div", {
                    className: "flex flex-col items-center mt-12 text-center",
                    children: _jsxRuntime.jsx("div", {
                      className: "font-changa text-huge font-light",
                      children: experimentOptedIn ? "Thanks! You’re in." : "Thanks for letting us know."
                    })
                  }) : _jsxRuntime.jsxs("div", {
                    className: "flex flex-col items-start mt-6 text-left",
                    children: [ _jsxRuntime.jsx(_checkboxDefault.default, {
                      checked: experimentOptedIn,
                      label: "I would like to participate in Mozilla’s research into YouTube’s algorithmic controls.",
                      onChange: () => setExperimentOptIn(!experimentOptedIn)
                    }), _jsxRuntime.jsx(_checkboxDefault.default, {
                      checked: enableErrorReporting,
                      label: "I would like to send extension error reports to Mozilla.",
                      onChange: () => setEnableErrorReporting(!enableErrorReporting)
                    }), _jsxRuntime.jsx("div", {
                      className: "flex flex-row mt-6",
                      children: _jsxRuntime.jsx("button", {
                        onClick: onSubmit,
                        className: "button bg-blue-50 disabled:bg-blue-30 hover:bg-blue-70 text-white text-sm py-5 px-12 inline-block flex-grow-0",
                        children: "Submit"
                      })
                    }) ]
                  })
                }) ]
              }), _jsxRuntime.jsxs("div", {
                className: "flex flex-col text-center mt-22.5",
                children: [ _jsxRuntime.jsx("div", {
                  className: "font-changa text-huge slides-header",
                  children: "Submitting feedback and a YouTube Regret"
                }), _jsxRuntime.jsx("div", {
                  className: "font-sans text-2xl mt-3.25 mb-8.75 slides-subheader",
                  children: "If you see a video and do not want to receive recommendations similar to it just follow these 3 steps."
                }) ]
              }) ]
            }), _jsxRuntime.jsx("div", {
              className: "col-span-1"
            }), _jsxRuntime.jsxs("div", {
              className: "col-span-4 text-center",
              children: [ _jsxRuntime.jsx("div", {
                className: "img-step-1 m-auto border border-grey-95"
              }), _jsxRuntime.jsx("div", {
                className: "mt-11 text-center",
                children: _jsxRuntime.jsx("div", {
                  className: "m-auto rounded-full bg-red h-11 w-11 text-white font-semibold font-sans text-3xl flex items-center justify-center leading-none pt-1",
                  children: "1"
                })
              }), _jsxRuntime.jsx("div", {
                className: "mt-5.25 font-serif font-light text-2xl font-light leading-tight",
                children: "Hover your cursor over the feedback button on any recommendation or video player. Press button to submit feedback."
              }) ]
            }), _jsxRuntime.jsxs("div", {
              className: "col-span-4 text-center",
              children: [ _jsxRuntime.jsx("div", {
                className: "img-step-2 m-auto border border-grey-95"
              }), _jsxRuntime.jsx("div", {
                className: "mt-11 text-center",
                children: _jsxRuntime.jsx("div", {
                  className: "m-auto rounded-full bg-red h-11 w-11 text-white font-semibold font-sans text-3xl flex items-center justify-center leading-none pt-1",
                  children: "2"
                })
              }), _jsxRuntime.jsx("div", {
                className: "mt-5.25 font-serif font-light text-2xl font-light leading-tight",
                children: 'If desired, press the "tell us more" button to provide a comment explaining why you don\'t want to see more videos like that.'
              }) ]
            }), _jsxRuntime.jsxs("div", {
              className: "col-span-4 text-center",
              children: [ _jsxRuntime.jsx("div", {
                className: "img-step-3 m-auto border border-grey-95"
              }), _jsxRuntime.jsx("div", {
                className: "mt-11 text-center",
                children: _jsxRuntime.jsx("div", {
                  className: "m-auto rounded-full bg-red h-11 w-11 text-white font-semibold font-sans text-3xl flex items-center justify-center leading-none pt-1 pl-0.5",
                  children: "3"
                })
              }), _jsxRuntime.jsx("div", {
                className: "mt-5.25 font-serif font-light text-2xl font-light leading-tight",
                children: "Share more information with Mozilla about why you don't like this recommendation."
              }) ]
            }), _jsxRuntime.jsx("div", {
              className: "col-span-2"
            }), _jsxRuntime.jsxs("div", {
              className: "col-span-8 font-light",
              children: [ _jsxRuntime.jsx(_yourPrivacy.YourPrivacy, {}), _jsxRuntime.jsx("section", {
                className: "mt-7",
                children: _jsxRuntime.jsxs("p", {
                  children: [ "For more information, see our", " ", _jsxRuntime.jsx("a", {
                    href: _links.privacyNoticeUrl,
                    target: "_blank",
                    className: "underline",
                    rel: "noreferrer",
                    children: "full privacy notice"
                  }), "." ]
                })
              }), _jsxRuntime.jsxs("section", {
                className: "mt-24 mb-33",
                children: [ _jsxRuntime.jsx("h2", {
                  className: "text-huge font-changa font-light",
                  children: "Removing the Extension"
                }), _jsxRuntime.jsx("p", {
                  className: "mt-4",
                  children: "Users are welcome to opt out at any point by removing the extension:"
                }), _jsxRuntime.jsx("ul", {
                  className: "triangle-bullets",
                  children: _jsxRuntime.jsxs("li", {
                    children: [ "Right-click on the extension's toolbar icon and select", " ", _jsxRuntime.jsx("span", {
                      className: "font-semibold",
                      children: window.navigator.userAgent.indexOf("Firefox/") > -1 ? "Remove Extension" : "Remove From Chrome..."
                    }), "." ]
                  })
                }), _jsxRuntime.jsxs("p", {
                  className: "mt-4",
                  children: [ "Removing the extension will stop all ongoing data collection, only your already contributed data will be available to our researchers. For more information, please read our", " ", _jsxRuntime.jsx("a", {
                    href: _links.privacyNoticeUrl,
                    target: "_blank",
                    className: "underline",
                    rel: "noreferrer",
                    children: "full privacy notice"
                  }), "." ]
                }) ]
              }) ]
            }), _jsxRuntime.jsx("div", {
              className: "col-span-2"
            }) ]
          }) ]
        }) ]
      });
    }
  }, {
    "react/jsx-runtime": "aMvgd",
    react: "8Nzqg",
    "photon-colors/photon-colors.css": "bRZpQ",
    "../common/photon-components-web/attributes/index.css": "4rzQV",
    "../common/tailwind.css": "4H2Bi",
    "./inc/YourPrivacy": "1UPtF",
    "../common/photon-components-web/photon-components/Checkbox": "c9z6E",
    "../common/common": "jKOy4",
    "../common/helpers": "hce4W",
    "../common/links": "4v6Gb",
    "../common/storage": "4FzrO",
    classnames: "g4yFL",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  bRZpQ: [ function() {}, {} ],
  "4rzQV": [ function() {}, {} ],
  "4H2Bi": [ function() {}, {} ],
  "1UPtF": [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "YourPrivacy", (() => YourPrivacy));
    var _jsxRuntime = require("react/jsx-runtime");
    function YourPrivacy() {
      return _jsxRuntime.jsxs("section", {
        className: "mt-24",
        children: [ _jsxRuntime.jsx("h2", {
          className: "text-huge font-changa font-light",
          children: "Your Privacy"
        }), _jsxRuntime.jsx("p", {
          className: "mt-4",
          children: "Mozilla understands the sensitivity of the data that is collected and works hard to keep your data private and secure:"
        }), _jsxRuntime.jsxs("ul", {
          children: [ _jsxRuntime.jsxs("li", {
            className: "mt-7",
            children: [ _jsxRuntime.jsx("div", {
              className: "font-semibold",
              children: "General data collection principles"
            }), _jsxRuntime.jsxs("ul", {
              className: "triangle-bullets",
              children: [ _jsxRuntime.jsx("li", {
                children: "You must be 18 or older to use RegretsReporter."
              }), _jsxRuntime.jsx("li", {
                children: "No data is collected from inside Private Browsing windows."
              }), _jsxRuntime.jsx("li", {
                children: "If you participate in our research, periodically, information about the number of videos you view, when and for what videos you press the “stop recommending”, “dislike”, “not interested”, or “don’t recommend channel” buttons, and information about what videos you are recommended will be sent to Mozilla."
              }) ]
            }) ]
          }), _jsxRuntime.jsxs("li", {
            className: "mt-10",
            children: [ _jsxRuntime.jsx("div", {
              className: "font-semibold",
              children: "Understand how your data is used"
            }), _jsxRuntime.jsx("ul", {
              className: "triangle-bullets",
              children: _jsxRuntime.jsx("li", {
                children: "Data — including the videos you report and the comments you submit — from the RegretsReporter extension will be used in Mozilla Foundation's advocacy and campaigning work. It will be shared with organizations working to investigate these problems and technologists working to build more trustworthy AI. When we disclose information, we disclose it in a way that minimizes the risk of you being re-identified."
              })
            }) ]
          }) ]
        }) ]
      });
    }
  }, {
    "react/jsx-runtime": "aMvgd",
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
  cDqvA: [ function() {}, {} ],
  "4ieuR": [ function() {}, {} ],
  jFz1c: [ function() {}, {} ],
  "8Gyxh": [ function() {}, {} ]
}, [ "1p1CZ" ]);