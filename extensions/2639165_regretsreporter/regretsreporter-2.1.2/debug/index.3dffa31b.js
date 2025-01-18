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
  var mainExports = newRequire("dtFnn");
  "object" == typeof exports && "undefined" != typeof module ? module.exports = mainExports : "function" == typeof define && define.amd && define((function() {
    return mainExports;
  }));
}({
  dtFnn: [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js"), _jsxRuntime = require("react/jsx-runtime"), _react = require("react"), _reactDom = (parcelHelpers.interopDefault(_react), 
    require("react-dom")), _reactDomDefault = parcelHelpers.interopDefault(_reactDom), _mainTsx = require("./main.tsx");
    _reactDomDefault.default.render(_jsxRuntime.jsx(_mainTsx.App, {}), document.getElementById("root"));
  }, {
    "react/jsx-runtime": "aMvgd",
    react: "8Nzqg",
    "react-dom": "cnO8j",
    "./main.tsx": "9f4tn",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  "9f4tn": [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "App", (() => App));
    var _jsxRuntime = require("react/jsx-runtime"), _react = require("react"), _webextensionPolyfillTs = require("webextension-polyfill-ts"), _reactTable = require("react-table"), _paginate = require("./paginate"), _paginateDefault = parcelHelpers.interopDefault(_paginate), _common = (require("./main.css"), 
    require("../common/common")), _reactInspector = require("react-inspector"), _reactInspectorDefault = parcelHelpers.interopDefault(_reactInspector), _helpers = require("../common/helpers"), _consts = require("./consts");
    function StatusSpan(props) {
      return _jsxRuntime.jsx("span", {
        style: {
          color: props.good ? "green" : "red"
        },
        children: props.good ? "recorded" : "missing"
      });
    }
    const columns = [ {
      Header: "ID",
      accessor: "id"
    }, {
      Header: "Time",
      accessor: "timestamp",
      Cell: ({value: value}) => value.toUTCString()
    }, {
      Header: "Type",
      accessor: "type"
    }, {
      Header: "Subtype",
      accessor: "subtype"
    }, {
      Header: "Counter",
      accessor: "counter"
    }, {
      Header: "Tab ID",
      accessor: "tabId"
    }, {
      Header: "Payload",
      accessor: "payload",
      Cell: ({value: value}) => {
        if (!value) return null;
        const {tokens: tokens, ...rest} = value;
        return _jsxRuntime.jsx(_reactInspectorDefault.default, {
          data: rest
        });
      }
    } ];
    function Table({columns: columns1, data: data, onSelectionChange: onSelectionChange}) {
      const {getTableProps: getTableProps, getTableBodyProps: getTableBodyProps, headerGroups: headerGroups, page: page, prepareRow: prepareRow, gotoPage: gotoPage, previousPage: previousPage, nextPage: nextPage, canNextPage: canNextPage, pageCount: pageCount, rowsById: rowsById, state: {pageIndex: pageIndex, pageSize: pageSize, rowId: rowId}, pageOptions: pageOptions, setPageSize: setPageSize, canGotoPage: canGotoPage, canPreviousPage: canPreviousPage, dispatch: dispatch} = _reactTable.useTable({
        stateReducer: (newState, action) => "selection" === action.type ? {
          ...newState,
          rowId: action.rowId
        } : newState,
        columns: columns1,
        data: data,
        initialState: {
          pageSize: 10
        }
      }, _reactTable.usePagination, (hooks => {
        hooks.visibleColumns.push((columns2 => [ {
          id: "selection",
          Cell: ({row: row, state: state}) => _jsxRuntime.jsx("div", {
            children: _jsxRuntime.jsx("input", {
              type: "radio",
              checked: row.id === state.rowId,
              onClick: () => {
                dispatch({
                  type: "selection",
                  rowId: row.id
                });
              }
            })
          })
        }, ...columns2 ]));
      }));
      return _react.useEffect((() => {
        var ref;
        onSelectionChange(null === (ref = rowsById[rowId]) || void 0 === ref ? void 0 : ref.original);
      }), [ rowId ]), _jsxRuntime.jsxs("div", {
        children: [ _jsxRuntime.jsxs("table", {
          ...getTableProps(),
          className: "table-auto border-t text-xs",
          children: [ _jsxRuntime.jsx("thead", {
            children: headerGroups.map((headerGroup => _jsxRuntime.jsx("tr", {
              ...headerGroup.getHeaderGroupProps(),
              className: "border-b border-r",
              children: headerGroup.headers.map((column => _jsxRuntime.jsx("th", {
                ...column.getHeaderProps(),
                className: "border-l",
                children: column.render("Header")
              })))
            })))
          }), _jsxRuntime.jsx("tbody", {
            ...getTableBodyProps(),
            children: page.map(((row, i) => (prepareRow(row), _jsxRuntime.jsx("tr", {
              ...row.getRowProps(),
              className: "border-b border-r border-black hover:bg-blue-20",
              onClick: () => dispatch({
                type: "selection",
                rowId: row.id
              }),
              children: row.cells.map((cell => _jsxRuntime.jsx("td", {
                className: "border-l px-3",
                ...cell.getCellProps(),
                children: cell.render("Cell")
              })))
            }))))
          }) ]
        }), _jsxRuntime.jsx(_paginateDefault.default, {
          gotoPage: gotoPage,
          previousPage: previousPage,
          nextPage: nextPage,
          canNextPage: canNextPage,
          pageCount: pageCount,
          pageIndex: pageIndex,
          pageOptions: pageOptions,
          pageSize: pageSize,
          setPageSize: setPageSize,
          canGotoPage: canGotoPage,
          canPreviousPage: canPreviousPage
        }) ]
      });
    }
    function FeedbackVariantPicker() {
      const [value, setValue] = _react.useState();
      _react.useEffect((() => {
        _common.feedbackUiVariant.acquire().then((v => setValue(v)));
      }), []);
      const updateVariant = _react.useCallback((async event => {
        const variant = event.target.value, bg = await _helpers.getBackgroundScript();
        await bg.updateFeedbackUiVariant(variant), setValue(variant);
      }), [ setValue ]);
      return _jsxRuntime.jsx("select", {
        value: value,
        onChange: updateVariant,
        className: "border border-blue-50",
        children: Object.entries(_consts.feedbackUiVariants).map((([k, v]) => _jsxRuntime.jsx("option", {
          value: k,
          children: v
        }, k)))
      });
    }
    function ExperimentArmPicker() {
      const [value, setValue] = _react.useState();
      _react.useEffect((() => {
        _common.experimentArm.acquire().then((v => setValue(v)));
      }), []);
      const updateCohort = _react.useCallback((async event => {
        const arm = event.target.value, bg = await _helpers.getBackgroundScript();
        await bg.updateExperimentArm(arm), setValue(arm);
      }), [ setValue ]);
      return _jsxRuntime.jsx("select", {
        value: value,
        onChange: updateCohort,
        className: "border border-blue-50",
        children: Object.entries(_consts.experimentArms).map((([k, v]) => _jsxRuntime.jsx("option", {
          value: k,
          children: v
        }, k)))
      });
    }
    const App = () => {
      const [selection, setSelection] = _react.useState(null), {id: videoId, tokens: {notInterested: feedbackTokenNotInterested, dontRecommend: feedbackTokenNoRecommend}} = (null == selection ? void 0 : selection.payload) || {
        tokens: {}
      }, tabId = null == selection ? void 0 : selection.tabId, onDislike = _react.useCallback((() => {
        _common.dispatchSendFeedbackEvent({
          videoId: videoId,
          tabId: tabId
        });
      }), [ selection ]), onFeedback = _react.useCallback((() => {
        _common.dispatchSendFeedbackEvent({
          videoId: videoId,
          tabId: tabId,
          feedbackTokenNoRecommend: feedbackTokenNoRecommend,
          feedbackTokenNotInterested: feedbackTokenNotInterested
        });
      }), [ selection ]), installationIdValue = _common.installationId.use(), [hasAuth, events] = function() {
        const [hasAuth, setAuth] = _react.useState(!1), [events, setEvents] = _react.useState([]);
        return _react.useEffect((() => {
          async function update() {
            const {authRecorded: authRecorded, events: bevents} = await _helpers.getBackgroundScript();
            setAuth(authRecorded), setEvents(bevents);
          }
          _webextensionPolyfillTs.browser.runtime.onMessage.addListener((async message => {
            update();
          })), update();
        }), [ setAuth ]), [ hasAuth, events ];
      }(), onExport = _react.useCallback((() => {
        const data = JSON.stringify(events), url = URL.createObjectURL(new Blob([ data ], {
          type: "application/json"
        }));
        _webextensionPolyfillTs.browser.tabs.create({
          url: url
        });
      }), [ events ]);
      return _jsxRuntime.jsxs("div", {
        className: "p-2",
        children: [ _jsxRuntime.jsxs("div", {
          className: "",
          children: [ _jsxRuntime.jsx("h1", {
            className: "text-2xl",
            children: "Extension state:"
          }), _jsxRuntime.jsxs("div", {
            children: [ _jsxRuntime.jsx("span", {
              className: "font-bold",
              children: "Authorization token: "
            }), _jsxRuntime.jsx(StatusSpan, {
              good: hasAuth
            }) ]
          }), _jsxRuntime.jsxs("div", {
            children: [ _jsxRuntime.jsx("span", {
              className: "font-bold",
              children: "Installation Id: "
            }), installationIdValue ]
          }), _jsxRuntime.jsxs("div", {
            children: [ _jsxRuntime.jsx("span", {
              className: "font-bold",
              children: "Experiment Arm: "
            }), _jsxRuntime.jsx(ExperimentArmPicker, {}) ]
          }), _jsxRuntime.jsxs("div", {
            children: [ _jsxRuntime.jsx("span", {
              className: "font-bold",
              children: "Feedback UI Variant: "
            }), _jsxRuntime.jsx(FeedbackVariantPicker, {}) ]
          }) ]
        }), _jsxRuntime.jsxs("div", {
          className: "mt-4",
          children: [ _jsxRuntime.jsxs("div", {
            children: [ _jsxRuntime.jsx("h1", {
              className: "text-2xl",
              children: "Event history:"
            }), _jsxRuntime.jsxs("div", {
              className: "mb-2",
              children: [ _jsxRuntime.jsx("button", {
                className: "button mr-2",
                onClick: onDislike,
                disabled: !videoId,
                children: "Dislike"
              }), _jsxRuntime.jsx("button", {
                className: "button mr-2",
                onClick: onFeedback,
                disabled: !feedbackTokenNoRecommend,
                children: "Don't Recommend"
              }), _jsxRuntime.jsx("button", {
                className: "button mr-2",
                onClick: onFeedback,
                disabled: !feedbackTokenNotInterested,
                children: "Not Interested"
              }), _jsxRuntime.jsx("button", {
                className: "button ml-4",
                onClick: onExport,
                children: "Export All"
              }) ]
            }) ]
          }), _jsxRuntime.jsx(Table, {
            columns: columns,
            data: events,
            onSelectionChange: setSelection
          }) ]
        }) ]
      });
    };
  }, {
    "react/jsx-runtime": "aMvgd",
    react: "8Nzqg",
    "webextension-polyfill-ts": "g4Zvj",
    "react-table": "8zykX",
    "./paginate": "dPeP9",
    "./main.css": "4Q3Cm",
    "../common/common": "jKOy4",
    "react-inspector": "1dVfx",
    "../common/helpers": "hce4W",
    "./consts": "gVwI6",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  "8zykX": [ function(require, module, exports) {
    module.exports = require("./dist/react-table.production.min.js");
  }, {
    "./dist/react-table.production.min.js": "hgTun"
  } ],
  hgTun: [ function(require, module, exports) {
    var e, t;
    e = this, t = function(e, t) {
      "use strict";
      function n(e1, t1, n1, o, r, i, u) {
        try {
          var l = e1[i](u), s = l.value;
        } catch (e2) {
          return void n1(e2);
        }
        l.done ? t1(s) : Promise.resolve(s).then(o, r);
      }
      function o(e1) {
        return function() {
          var t1 = this, o1 = arguments;
          return new Promise((function(r, i) {
            var u = e1.apply(t1, o1);
            function l(e2) {
              n(u, r, i, l, s, "next", e2);
            }
            function s(e2) {
              n(u, r, i, l, s, "throw", e2);
            }
            l(void 0);
          }));
        };
      }
      function r() {
        return (r = Object.assign || function(e1) {
          for (var t1 = 1; t1 < arguments.length; t1++) {
            var n1 = arguments[t1];
            for (var o1 in n1) Object.prototype.hasOwnProperty.call(n1, o1) && (e1[o1] = n1[o1]);
          }
          return e1;
        }).apply(this, arguments);
      }
      function i(e1, t1) {
        if (null == e1) return {};
        var n2, o2, r1 = {}, i1 = Object.keys(e1);
        for (o2 = 0; o2 < i1.length; o2++) n2 = i1[o2], t1.indexOf(n2) >= 0 || (r1[n2] = e1[n2]);
        return r1;
      }
      function u(e1) {
        var t1 = function(e2, t2) {
          if ("object" != typeof e2 || null === e2) return e2;
          var n2 = e2[Symbol.toPrimitive];
          if (void 0 !== n2) {
            var o2 = n2.call(e2, "string");
            if ("object" != typeof o2) return o2;
            throw new TypeError("@@toPrimitive must return a primitive value.");
          }
          return String(e2);
        }(e1);
        return "symbol" == typeof t1 ? t1 : String(t1);
      }
      t = t && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
      var l = {
        init: "init"
      }, s = function(e1) {
        var t1 = e1.value;
        return void 0 === t1 ? "" : t1;
      }, a = function() {
        return t.createElement(t.Fragment, null, " ");
      }, c = {
        Cell: s,
        width: 150,
        minWidth: 0,
        maxWidth: Number.MAX_SAFE_INTEGER
      };
      function d() {
        for (var e1 = arguments.length, t1 = new Array(e1), n2 = 0; n2 < e1; n2++) t1[n2] = arguments[n2];
        return t1.reduce((function(e2, t2) {
          var n3 = t2.style, o3 = t2.className;
          return e2 = r({}, e2, {}, i(t2, [ "style", "className" ])), n3 && (e2.style = e2.style ? r({}, e2.style || {}, {}, n3 || {}) : n3), 
          o3 && (e2.className = e2.className ? e2.className + " " + o3 : o3), "" === e2.className && delete e2.className, 
          e2;
        }), {});
      }
      var f = function(e1, t1) {
        return void 0 === t1 && (t1 = {}), function(n2) {
          return void 0 === n2 && (n2 = {}), [].concat(e1, [ n2 ]).reduce((function(e2, o3) {
            return function e3(t2, n3, o4) {
              return "function" == typeof n3 ? e3({}, n3(t2, o4)) : Array.isArray(n3) ? d.apply(void 0, [ t2 ].concat(n3)) : d(t2, n3);
            }(e2, o3, r({}, t1, {
              userProps: n2
            }));
          }), {});
        };
      }, p = function(e1, t1, n2, o3) {
        return void 0 === n2 && (n2 = {}), e1.reduce((function(e2, t2) {
          return t2(e2, n2);
        }), t1);
      }, g = function(e1, t1, n2) {
        return void 0 === n2 && (n2 = {}), e1.forEach((function(e2) {
          e2(t1, n2);
        }));
      };
      function v(e1, t1, n2, o3) {
        e1.findIndex((function(e2) {
          return e2.pluginName === n2;
        })), t1.forEach((function(t2) {
          e1.findIndex((function(e2) {
            return e2.pluginName === t2;
          }));
        }));
      }
      function m(e1, t1) {
        return "function" == typeof e1 ? e1(t1) : e1;
      }
      function h(e1) {
        var n2 = t.useRef();
        return n2.current = e1, t.useCallback((function() {
          return n2.current;
        }), []);
      }
      var y = "undefined" != typeof document ? t.useLayoutEffect : t.useEffect;
      function w(e1, n2) {
        var o3 = t.useRef(!1);
        y((function() {
          o3.current && e1(), o3.current = !0;
        }), n2);
      }
      function R(e1, t1, n2) {
        return void 0 === n2 && (n2 = {}), function(o3, i1) {
          void 0 === i1 && (i1 = {});
          var u1 = "string" == typeof o3 ? t1[o3] : o3;
          if (void 0 === u1) throw console.info(t1), new Error("Renderer Error ☝️");
          return b(u1, r({}, e1, {
            column: t1
          }, n2, {}, i1));
        };
      }
      function b(e1, n2) {
        var o3, e2, t1;
        return "function" == typeof (e2 = o3 = e1) && (t1 = Object.getPrototypeOf(e2)).prototype && t1.prototype.isReactComponent || "function" == typeof o3 || function(e2) {
          return "object" == typeof e2 && "symbol" == typeof e2.$$typeof && [ "react.memo", "react.forward_ref" ].includes(e2.$$typeof.description);
        }(o3) ? t.createElement(e1, n2) : e1;
      }
      function S(e1, t1, n2) {
        return void 0 === n2 && (n2 = 0), e1.map((function(e2) {
          return x(e2 = r({}, e2, {
            parent: t1,
            depth: n2
          })), e2.columns && (e2.columns = S(e2.columns, e2, n2 + 1)), e2;
        }));
      }
      function C(e1) {
        return G(e1, "columns");
      }
      function x(e1) {
        var t1 = e1.id, n2 = e1.accessor, o3 = e1.Header;
        if ("string" == typeof n2) {
          t1 = t1 || n2;
          var r1 = n2.split(".");
          n2 = function(e2) {
            return function(e3, t2, n3) {
              if (!t2) return e3;
              var o4, e4, r2 = "function" == typeof t2 ? t2 : JSON.stringify(t2), i1 = E.get(r2) || (e4 = function e6(t3, n4) {
                if (void 0 === n4 && (n4 = []), Array.isArray(t3)) for (var o5 = 0; o5 < t3.length; o5 += 1) e6(t3[o5], n4); else n4.push(t3);
                return n4;
              }(t2).map((function(e7) {
                return String(e7).replace(".", "_");
              })).join(".").replace(W, ".").replace(O, "").split("."), E.set(r2, e4), e4);
              try {
                o4 = i1.reduce((function(e4, t3) {
                  return e4[t3];
                }), e3);
              } catch (e4) {}
              return void 0 !== o4 ? o4 : void 0;
            }(e2, r1);
          };
        }
        if (!t1 && "string" == typeof o3 && o3 && (t1 = o3), !t1 && e1.columns) throw console.error(e1), 
        new Error('A column ID (or unique "Header" value) is required!');
        if (!t1) throw console.error(e1), new Error("A column ID (or string accessor) is required!");
        return Object.assign(e1, {
          id: t1,
          accessor: n2
        }), e1;
      }
      function P(e1, t1) {
        if (!t1) throw new Error;
        return Object.assign(e1, r({
          Header: a,
          Footer: a
        }, c, {}, t1, {}, e1)), Object.assign(e1, {
          originalWidth: e1.width
        }), e1;
      }
      function B(e1, t1, n2) {
        void 0 === n2 && (n2 = function() {
          return {};
        });
        for (var o3 = [], i1 = e1, u1 = 0, l1 = function() {
          return u1++;
        }, s1 = function() {
          var e2 = {
            headers: []
          }, u2 = [], s2 = i1.some((function(e3) {
            return e3.parent;
          }));
          i1.forEach((function(o4) {
            var i2, a1 = [].concat(u2).reverse()[0];
            s2 && (i2 = o4.parent ? r({}, o4.parent, {
              originalId: o4.parent.id,
              id: o4.parent.id + "_" + l1(),
              headers: [ o4 ]
            }, n2(o4)) : P(r({
              originalId: o4.id + "_placeholder",
              id: o4.id + "_placeholder_" + l1(),
              placeholderOf: o4,
              headers: [ o4 ]
            }, n2(o4)), t1), a1 && a1.originalId === i2.originalId ? a1.headers.push(o4) : u2.push(i2)), 
            e2.headers.push(o4);
          })), o3.push(e2), i1 = u2;
        }; i1.length; ) s1();
        return o3.reverse();
      }
      var E = new Map;
      function I() {
        for (var e1 = arguments.length, t1 = new Array(e1), n2 = 0; n2 < e1; n2++) t1[n2] = arguments[n2];
        for (var o3 = 0; o3 < t1.length; o3 += 1) if (void 0 !== t1[o3]) return t1[o3];
      }
      function F(e1) {
        if ("function" == typeof e1) return e1;
      }
      function G(e1, t1) {
        var n2 = [];
        return function e2(o3) {
          o3.forEach((function(o4) {
            o4[t1] ? e2(o4[t1]) : n2.push(o4);
          }));
        }(e1), n2;
      }
      function A(e1, t1) {
        var n2 = t1.manualExpandedKey, o3 = t1.expanded, r2 = t1.expandSubRows, i1 = void 0 === r2 || r2, u1 = [];
        return e1.forEach((function(e2) {
          return function e3(t2, r3) {
            void 0 === r3 && (r3 = !0), t2.isExpanded = t2.original && t2.original[n2] || o3[t2.id], 
            t2.canExpand = t2.subRows && !!t2.subRows.length, r3 && u1.push(t2), t2.subRows && t2.subRows.length && t2.isExpanded && t2.subRows.forEach((function(t3) {
              return e3(t3, i1);
            }));
          }(e2);
        })), u1;
      }
      function k(e1, t1, n2) {
        return F(e1) || t1[e1] || n2[e1] || n2.text;
      }
      function H(e1, t1, n2) {
        return e1 ? e1(t1, n2) : void 0 === t1;
      }
      function T() {
        throw new Error("React-Table: You have not called prepareRow(row) one or more rows you are attempting to render.");
      }
      var z = null, W = /\[/g, O = /\]/g, M = function(e1) {
        return r({
          role: "table"
        }, e1);
      }, j = function(e1) {
        return r({
          role: "rowgroup"
        }, e1);
      }, N = function(e1, t1) {
        var n2 = t1.column;
        return r({
          key: "header_" + n2.id,
          colSpan: n2.totalVisibleHeaderCount,
          role: "columnheader"
        }, e1);
      }, L = function(e1, t1) {
        var n2 = t1.column;
        return r({
          key: "footer_" + n2.id,
          colSpan: n2.totalVisibleHeaderCount
        }, e1);
      }, D = function(e1, t1) {
        return r({
          key: "headerGroup_" + t1.index,
          role: "row"
        }, e1);
      }, V = function(e1, t1) {
        return r({
          key: "footerGroup_" + t1.index
        }, e1);
      }, _ = function(e1, t1) {
        return r({
          key: "row_" + t1.row.id,
          role: "row"
        }, e1);
      }, X = function(e1, t1) {
        var n2 = t1.cell;
        return r({
          key: "cell_" + n2.row.id + "_" + n2.column.id,
          role: "cell"
        }, e1);
      };
      function q() {
        return {
          useOptions: [],
          stateReducers: [],
          useControlledState: [],
          columns: [],
          columnsDeps: [],
          allColumns: [],
          allColumnsDeps: [],
          accessValue: [],
          materializedColumns: [],
          materializedColumnsDeps: [],
          useInstanceAfterData: [],
          visibleColumns: [],
          visibleColumnsDeps: [],
          headerGroups: [],
          headerGroupsDeps: [],
          useInstanceBeforeDimensions: [],
          useInstance: [],
          prepareRow: [],
          getTableProps: [ M ],
          getTableBodyProps: [ j ],
          getHeaderGroupProps: [ D ],
          getFooterGroupProps: [ V ],
          getHeaderProps: [ N ],
          getFooterProps: [ L ],
          getRowProps: [ _ ],
          getCellProps: [ X ],
          useFinalInstance: []
        };
      }
      l.resetHiddenColumns = "resetHiddenColumns", l.toggleHideColumn = "toggleHideColumn", 
      l.setHiddenColumns = "setHiddenColumns", l.toggleHideAllColumns = "toggleHideAllColumns";
      var K = function(e1) {
        e1.getToggleHiddenProps = [ U ], e1.getToggleHideAllColumnsProps = [ $ ], e1.stateReducers.push(J), 
        e1.useInstanceBeforeDimensions.push(Y), e1.headerGroupsDeps.push((function(e2, t1) {
          var n2 = t1.instance;
          return [].concat(e2, [ n2.state.hiddenColumns ]);
        })), e1.useInstance.push(Q);
      };
      K.pluginName = "useColumnVisibility";
      var U = function(e1, t1) {
        var n2 = t1.column;
        return [ e1, {
          onChange: function(e2) {
            n2.toggleHidden(!e2.target.checked);
          },
          style: {
            cursor: "pointer"
          },
          checked: n2.isVisible,
          title: "Toggle Column Visible"
        } ];
      }, $ = function(e1, t1) {
        var n2 = t1.instance;
        return [ e1, {
          onChange: function(e2) {
            n2.toggleHideAllColumns(!e2.target.checked);
          },
          style: {
            cursor: "pointer"
          },
          checked: !n2.allColumnsHidden && !n2.state.hiddenColumns.length,
          title: "Toggle All Columns Hidden",
          indeterminate: !n2.allColumnsHidden && n2.state.hiddenColumns.length
        } ];
      };
      function J(e1, t1, n2, o3) {
        if (t1.type === l.init) return r({
          hiddenColumns: []
        }, e1);
        if (t1.type === l.resetHiddenColumns) return r({}, e1, {
          hiddenColumns: o3.initialState.hiddenColumns || []
        });
        if (t1.type === l.toggleHideColumn) {
          var i1 = (void 0 !== t1.value ? t1.value : !e1.hiddenColumns.includes(t1.columnId)) ? [].concat(e1.hiddenColumns, [ t1.columnId ]) : e1.hiddenColumns.filter((function(e2) {
            return e2 !== t1.columnId;
          }));
          return r({}, e1, {
            hiddenColumns: i1
          });
        }
        return t1.type === l.setHiddenColumns ? r({}, e1, {
          hiddenColumns: m(t1.value, e1.hiddenColumns)
        }) : t1.type === l.toggleHideAllColumns ? r({}, e1, {
          hiddenColumns: (void 0 !== t1.value ? t1.value : !e1.hiddenColumns.length) ? o3.allColumns.map((function(e2) {
            return e2.id;
          })) : []
        }) : void 0;
      }
      function Y(e1) {
        var n2 = e1.headers, o3 = e1.state.hiddenColumns;
        t.useRef(!1).current;
        var r2 = 0;
        n2.forEach((function(e2) {
          return r2 += function e3(t1, n3) {
            t1.isVisible = n3 && !o3.includes(t1.id);
            var r3 = 0;
            return t1.headers && t1.headers.length ? t1.headers.forEach((function(n4) {
              return r3 += e3(n4, t1.isVisible);
            })) : r3 = t1.isVisible ? 1 : 0, t1.totalVisibleHeaderCount = r3, r3;
          }(e2, !0);
        }));
      }
      function Q(e1) {
        var n2 = e1.columns, o3 = e1.flatHeaders, r2 = e1.dispatch, i2 = e1.allColumns, u1 = e1.getHooks, s1 = e1.state.hiddenColumns, a1 = e1.autoResetHiddenColumns, c1 = void 0 === a1 || a1, d1 = h(e1), p1 = i2.length === s1.length, g1 = t.useCallback((function(e2, t1) {
          return r2({
            type: l.toggleHideColumn,
            columnId: e2,
            value: t1
          });
        }), [ r2 ]), v1 = t.useCallback((function(e2) {
          return r2({
            type: l.setHiddenColumns,
            value: e2
          });
        }), [ r2 ]), m1 = t.useCallback((function(e2) {
          return r2({
            type: l.toggleHideAllColumns,
            value: e2
          });
        }), [ r2 ]), y1 = f(u1().getToggleHideAllColumnsProps, {
          instance: d1()
        });
        o3.forEach((function(e2) {
          e2.toggleHidden = function(t1) {
            r2({
              type: l.toggleHideColumn,
              columnId: e2.id,
              value: t1
            });
          }, e2.getToggleHiddenProps = f(u1().getToggleHiddenProps, {
            instance: d1(),
            column: e2
          });
        }));
        var R1 = h(c1);
        w((function() {
          R1() && r2({
            type: l.resetHiddenColumns
          });
        }), [ r2, n2 ]), Object.assign(e1, {
          allColumnsHidden: p1,
          toggleHideColumn: g1,
          setHiddenColumns: v1,
          toggleHideAllColumns: m1,
          getToggleHideAllColumnsProps: y1
        });
      }
      var Z = {}, ee = {}, te = function(e1, t1, n2) {
        return e1;
      }, ne = function(e1, t1) {
        return e1.subRows || [];
      }, oe = function(e1, t1, n2) {
        return "" + (n2 ? [ n2.id, t1 ].join(".") : t1);
      }, re = function(e1) {
        return e1;
      };
      function ie(e1) {
        var t1 = e1.initialState, n2 = void 0 === t1 ? Z : t1, o3 = e1.defaultColumn, u1 = void 0 === o3 ? ee : o3, l1 = e1.getSubRows, s1 = void 0 === l1 ? ne : l1, a1 = e1.getRowId, c1 = void 0 === a1 ? oe : a1, d1 = e1.stateReducer, f1 = void 0 === d1 ? te : d1, p1 = e1.useControlledState, g1 = void 0 === p1 ? re : p1;
        return r({}, i(e1, [ "initialState", "defaultColumn", "getSubRows", "getRowId", "stateReducer", "useControlledState" ]), {
          initialState: n2,
          defaultColumn: u1,
          getSubRows: s1,
          getRowId: c1,
          stateReducer: f1,
          useControlledState: g1
        });
      }
      function ue(e1, t1) {
        void 0 === t1 && (t1 = 0);
        var n2 = 0, o3 = 0, r2 = 0, i2 = 0;
        return e1.forEach((function(e2) {
          var u1 = e2.headers;
          if (e2.totalLeft = t1, u1 && u1.length) {
            var l1 = ue(u1, t1), s1 = l1[0], a1 = l1[1], c1 = l1[2], d1 = l1[3];
            e2.totalMinWidth = s1, e2.totalWidth = a1, e2.totalMaxWidth = c1, e2.totalFlexWidth = d1;
          } else e2.totalMinWidth = e2.minWidth, e2.totalWidth = Math.min(Math.max(e2.minWidth, e2.width), e2.maxWidth), 
          e2.totalMaxWidth = e2.maxWidth, e2.totalFlexWidth = e2.canResize ? e2.totalWidth : 0;
          e2.isVisible && (t1 += e2.totalWidth, n2 += e2.totalMinWidth, o3 += e2.totalWidth, 
          r2 += e2.totalMaxWidth, i2 += e2.totalFlexWidth);
        })), [ n2, o3, r2, i2 ];
      }
      function le(e1) {
        var t1 = e1.data, n2 = e1.rows, o3 = e1.flatRows, r2 = e1.rowsById, i2 = e1.column, u1 = e1.getRowId, l2 = e1.getSubRows, s2 = e1.accessValueHooks, a2 = e1.getInstance;
        t1.forEach((function(e2, c2) {
          return function e3(n3, c3, d2, f1, g1) {
            void 0 === d2 && (d2 = 0);
            var v1 = n3, m1 = u1(n3, c3, f1), h1 = r2[m1];
            if (h1) h1.subRows && h1.originalSubRows.forEach((function(t2, n4) {
              return e3(t2, n4, d2 + 1, h1);
            })); else if ((h1 = {
              id: m1,
              original: v1,
              index: c3,
              depth: d2,
              cells: [ {} ]
            }).cells.map = T, h1.cells.filter = T, h1.cells.forEach = T, h1.cells[0].getCellProps = T, 
            h1.values = {}, g1.push(h1), o3.push(h1), r2[m1] = h1, h1.originalSubRows = l2(n3, c3), 
            h1.originalSubRows) {
              var y1 = [];
              h1.originalSubRows.forEach((function(t2, n4) {
                return e3(t2, n4, d2 + 1, h1, y1);
              })), h1.subRows = y1;
            }
            i2.accessor && (h1.values[i2.id] = i2.accessor(n3, c3, h1, g1, t1)), h1.values[i2.id] = p(s2, h1.values[i2.id], {
              row: h1,
              column: i2,
              instance: a2()
            });
          }(e2, c2, 0, void 0, n2);
        }));
      }
      l.resetExpanded = "resetExpanded", l.toggleRowExpanded = "toggleRowExpanded", l.toggleAllRowsExpanded = "toggleAllRowsExpanded";
      var se = function(e1) {
        e1.getToggleAllRowsExpandedProps = [ ae ], e1.getToggleRowExpandedProps = [ ce ], 
        e1.stateReducers.push(de), e1.useInstance.push(fe), e1.prepareRow.push(pe);
      };
      se.pluginName = "useExpanded";
      var ae = function(e1, t1) {
        var n2 = t1.instance;
        return [ e1, {
          onClick: function(e2) {
            n2.toggleAllRowsExpanded();
          },
          style: {
            cursor: "pointer"
          },
          title: "Toggle All Rows Expanded"
        } ];
      }, ce = function(e1, t1) {
        var n2 = t1.row;
        return [ e1, {
          onClick: function() {
            n2.toggleRowExpanded();
          },
          style: {
            cursor: "pointer"
          },
          title: "Toggle Row Expanded"
        } ];
      };
      function de(e1, t1, n2, o3) {
        if (t1.type === l.init) return r({
          expanded: {}
        }, e1);
        if (t1.type === l.resetExpanded) return r({}, e1, {
          expanded: o3.initialState.expanded || {}
        });
        if (t1.type === l.toggleAllRowsExpanded) {
          var s2 = t1.value, a2 = o3.isAllRowsExpanded, c2 = o3.rowsById;
          if (void 0 !== s2 ? s2 : !a2) {
            var d2 = {};
            return Object.keys(c2).forEach((function(e2) {
              d2[e2] = !0;
            })), r({}, e1, {
              expanded: d2
            });
          }
          return r({}, e1, {
            expanded: {}
          });
        }
        if (t1.type === l.toggleRowExpanded) {
          var f1, p1 = t1.id, g1 = t1.value, v1 = e1.expanded[p1], m1 = void 0 !== g1 ? g1 : !v1;
          if (!v1 && m1) return r({}, e1, {
            expanded: r({}, e1.expanded, (f1 = {}, f1[p1] = !0, f1))
          });
          if (v1 && !m1) {
            var h1 = e1.expanded;
            return h1[p1], r({}, e1, {
              expanded: i(h1, [ p1 ].map(u))
            });
          }
          return e1;
        }
      }
      function fe(e1) {
        var n2 = e1.data, o3 = e1.rows, r2 = e1.rowsById, i2 = e1.manualExpandedKey, u1 = void 0 === i2 ? "expanded" : i2, s3 = e1.paginateExpandedRows, a3 = void 0 === s3 || s3, c3 = e1.expandSubRows, d3 = void 0 === c3 || c3, p2 = e1.autoResetExpanded, g2 = void 0 === p2 || p2, m2 = e1.getHooks, y2 = e1.plugins, R1 = e1.state.expanded, b1 = e1.dispatch;
        v(y2, [ "useSortBy", "useGroupBy", "usePivotColumns", "useGlobalFilter" ], "useExpanded");
        var S1 = h(g2), C1 = Boolean(Object.keys(r2).length && Object.keys(R1).length);
        C1 && Object.keys(r2).some((function(e2) {
          return !R1[e2];
        })) && (C1 = !1), w((function() {
          S1() && b1({
            type: l.resetExpanded
          });
        }), [ b1, n2 ]);
        var x1 = t.useCallback((function(e2, t1) {
          b1({
            type: l.toggleRowExpanded,
            id: e2,
            value: t1
          });
        }), [ b1 ]), P1 = t.useCallback((function(e2) {
          return b1({
            type: l.toggleAllRowsExpanded,
            value: e2
          });
        }), [ b1 ]), B1 = t.useMemo((function() {
          return a3 ? A(o3, {
            manualExpandedKey: u1,
            expanded: R1,
            expandSubRows: d3
          }) : o3;
        }), [ a3, o3, u1, R1, d3 ]), E1 = t.useMemo((function() {
          return e2 = R1, t1 = 0, Object.keys(e2).forEach((function(e3) {
            var n3 = e3.split(".");
            t1 = Math.max(t1, n3.length);
          })), t1;
          var e2, t1;
        }), [ R1 ]), I1 = h(e1), F1 = f(m2().getToggleAllRowsExpandedProps, {
          instance: I1()
        });
        Object.assign(e1, {
          preExpandedRows: o3,
          expandedRows: B1,
          rows: B1,
          expandedDepth: E1,
          isAllRowsExpanded: C1,
          toggleRowExpanded: x1,
          toggleAllRowsExpanded: P1,
          getToggleAllRowsExpandedProps: F1
        });
      }
      function pe(e1, t1) {
        var n2 = t1.instance.getHooks, o3 = t1.instance;
        e1.toggleRowExpanded = function(t2) {
          return o3.toggleRowExpanded(e1.id, t2);
        }, e1.getToggleRowExpandedProps = f(n2().getToggleRowExpandedProps, {
          instance: o3,
          row: e1
        });
      }
      var ge = function(e1, t1, n2) {
        return e1.filter((function(e2) {
          return t1.some((function(t2) {
            var o3 = e2.values[t2];
            return String(o3).toLowerCase().includes(String(n2).toLowerCase());
          }));
        }));
      };
      ge.autoRemove = function(e1) {
        return !e1;
      };
      var ve = function(e1, t1, n2) {
        return e1.filter((function(e2) {
          return t1.some((function(t2) {
            var o3 = e2.values[t2];
            return void 0 === o3 || String(o3).toLowerCase() === String(n2).toLowerCase();
          }));
        }));
      };
      ve.autoRemove = function(e1) {
        return !e1;
      };
      var me = function(e1, t1, n2) {
        return e1.filter((function(e2) {
          return t1.some((function(t2) {
            var o3 = e2.values[t2];
            return void 0 === o3 || String(o3) === String(n2);
          }));
        }));
      };
      me.autoRemove = function(e1) {
        return !e1;
      };
      var he = function(e1, t1, n2) {
        return e1.filter((function(e2) {
          return t1.some((function(t2) {
            return e2.values[t2].includes(n2);
          }));
        }));
      };
      he.autoRemove = function(e1) {
        return !e1 || !e1.length;
      };
      var ye = function(e1, t1, n2) {
        return e1.filter((function(e2) {
          return t1.some((function(t2) {
            var o3 = e2.values[t2];
            return o3 && o3.length && n2.every((function(e3) {
              return o3.includes(e3);
            }));
          }));
        }));
      };
      ye.autoRemove = function(e1) {
        return !e1 || !e1.length;
      };
      var we = function(e1, t1, n2) {
        return e1.filter((function(e2) {
          return t1.some((function(t2) {
            var o3 = e2.values[t2];
            return o3 && o3.length && n2.some((function(e3) {
              return o3.includes(e3);
            }));
          }));
        }));
      };
      we.autoRemove = function(e1) {
        return !e1 || !e1.length;
      };
      var Re = function(e1, t1, n2) {
        return e1.filter((function(e2) {
          return t1.some((function(t2) {
            var o3 = e2.values[t2];
            return n2.includes(o3);
          }));
        }));
      };
      Re.autoRemove = function(e1) {
        return !e1 || !e1.length;
      };
      var be = function(e1, t1, n2) {
        return e1.filter((function(e2) {
          return t1.some((function(t2) {
            return e2.values[t2] === n2;
          }));
        }));
      };
      be.autoRemove = function(e1) {
        return void 0 === e1;
      };
      var Se = function(e1, t1, n2) {
        return e1.filter((function(e2) {
          return t1.some((function(t2) {
            return e2.values[t2] == n2;
          }));
        }));
      };
      Se.autoRemove = function(e1) {
        return null == e1;
      };
      var Ce = function(e1, t1, n2) {
        var o3 = n2 || [], r2 = o3[0], i2 = o3[1];
        if ((r2 = "number" == typeof r2 ? r2 : -1 / 0) > (i2 = "number" == typeof i2 ? i2 : 1 / 0)) {
          var u1 = r2;
          r2 = i2, i2 = u1;
        }
        return e1.filter((function(e2) {
          return t1.some((function(t2) {
            var n3 = e2.values[t2];
            return n3 >= r2 && n3 <= i2;
          }));
        }));
      };
      Ce.autoRemove = function(e1) {
        return !e1 || "number" != typeof e1[0] && "number" != typeof e1[1];
      };
      var xe = Object.freeze({
        __proto__: null,
        text: ge,
        exactText: ve,
        exactTextCase: me,
        includes: he,
        includesAll: ye,
        includesSome: we,
        includesValue: Re,
        exact: be,
        equals: Se,
        between: Ce
      });
      l.resetFilters = "resetFilters", l.setFilter = "setFilter", l.setAllFilters = "setAllFilters";
      var Pe = function(e1) {
        e1.stateReducers.push(Be), e1.useInstance.push(Ee);
      };
      function Be(e1, t1, n2, o3) {
        if (t1.type === l.init) return r({
          filters: []
        }, e1);
        if (t1.type === l.resetFilters) return r({}, e1, {
          filters: o3.initialState.filters || []
        });
        if (t1.type === l.setFilter) {
          var i2 = t1.columnId, u2 = t1.filterValue, s3 = o3.allColumns, a3 = o3.filterTypes, c3 = s3.find((function(e2) {
            return e2.id === i2;
          }));
          if (!c3) throw new Error("React-Table: Could not find a column with id: " + i2);
          var d3 = k(c3.filter, a3 || {}, xe), f2 = e1.filters.find((function(e2) {
            return e2.id === i2;
          })), p2 = m(u2, f2 && f2.value);
          return H(d3.autoRemove, p2, c3) ? r({}, e1, {
            filters: e1.filters.filter((function(e2) {
              return e2.id !== i2;
            }))
          }) : r({}, e1, f2 ? {
            filters: e1.filters.map((function(e2) {
              return e2.id === i2 ? {
                id: i2,
                value: p2
              } : e2;
            }))
          } : {
            filters: [].concat(e1.filters, [ {
              id: i2,
              value: p2
            } ])
          });
        }
        if (t1.type === l.setAllFilters) {
          var g2 = t1.filters, v2 = o3.allColumns, h2 = o3.filterTypes;
          return r({}, e1, {
            filters: m(g2, e1.filters).filter((function(e2) {
              var t2 = v2.find((function(t3) {
                return t3.id === e2.id;
              }));
              return !H(k(t2.filter, h2 || {}, xe).autoRemove, e2.value, t2);
            }))
          });
        }
      }
      function Ee(e1) {
        var n2 = e1.data, o3 = e1.rows, r2 = e1.flatRows, i3 = e1.rowsById, u3 = e1.allColumns, s4 = e1.filterTypes, a4 = e1.manualFilters, c4 = e1.defaultCanFilter, d4 = void 0 !== c4 && c4, f3 = e1.disableFilters, p3 = e1.state.filters, g3 = e1.dispatch, v3 = e1.autoResetFilters, m2 = void 0 === v3 || v3, y2 = t.useCallback((function(e2, t1) {
          g3({
            type: l.setFilter,
            columnId: e2,
            filterValue: t1
          });
        }), [ g3 ]), R1 = t.useCallback((function(e2) {
          g3({
            type: l.setAllFilters,
            filters: e2
          });
        }), [ g3 ]);
        u3.forEach((function(e2) {
          var t1 = e2.id, n3 = e2.accessor, o4 = e2.defaultCanFilter, r3 = e2.disableFilters;
          e2.canFilter = n3 ? I(!0 !== r3 && void 0, !0 !== f3 && void 0, !0) : I(o4, d4, !1), 
          e2.setFilter = function(t2) {
            return y2(e2.id, t2);
          };
          var i4 = p3.find((function(e3) {
            return e3.id === t1;
          }));
          e2.filterValue = i4 && i4.value;
        }));
        var b1 = t.useMemo((function() {
          if (a4 || !p3.length) return [ o3, r2, i3 ];
          var e2 = [], t1 = {};
          return [ function n3(o4, r3) {
            void 0 === r3 && (r3 = 0);
            var i4 = o4;
            return (i4 = p3.reduce((function(e3, t2) {
              var n4 = t2.id, o5 = t2.value, i5 = u3.find((function(e4) {
                return e4.id === n4;
              }));
              if (!i5) return e3;
              0 === r3 && (i5.preFilteredRows = e3);
              var l2 = k(i5.filter, s4 || {}, xe);
              return l2 ? (i5.filteredRows = l2(e3, [ n4 ], o5), i5.filteredRows) : (console.warn("Could not find a valid 'column.filter' for column with the ID: " + i5.id + "."), 
              e3);
            }), o4)).forEach((function(o5) {
              e2.push(o5), t1[o5.id] = o5, o5.subRows && (o5.subRows = o5.subRows && o5.subRows.length > 0 ? n3(o5.subRows, r3 + 1) : o5.subRows);
            })), i4;
          }(o3), e2, t1 ];
        }), [ a4, p3, o3, r2, i3, u3, s4 ]), S1 = b1[0], C1 = b1[1], x1 = b1[2];
        t.useMemo((function() {
          u3.filter((function(e2) {
            return !p3.find((function(t1) {
              return t1.id === e2.id;
            }));
          })).forEach((function(e2) {
            e2.preFilteredRows = S1, e2.filteredRows = S1;
          }));
        }), [ S1, p3, u3 ]);
        var P1 = h(m2);
        w((function() {
          P1() && g3({
            type: l.resetFilters
          });
        }), [ g3, a4 ? null : n2 ]), Object.assign(e1, {
          preFilteredRows: o3,
          preFilteredFlatRows: r2,
          preFilteredRowsById: i3,
          filteredRows: S1,
          filteredFlatRows: C1,
          filteredRowsById: x1,
          rows: S1,
          flatRows: C1,
          rowsById: x1,
          setFilter: y2,
          setAllFilters: R1
        });
      }
      Pe.pluginName = "useFilters", l.resetGlobalFilter = "resetGlobalFilter", l.setGlobalFilter = "setGlobalFilter";
      var Ie = function(e1) {
        e1.stateReducers.push(Fe), e1.useInstance.push(Ge);
      };
      function Fe(e1, t1, n2, o3) {
        if (t1.type === l.resetGlobalFilter) return r({}, e1, {
          globalFilter: o3.initialState.globalFilter || void 0
        });
        if (t1.type === l.setGlobalFilter) {
          var u3 = t1.filterValue, s4 = o3.userFilterTypes, a4 = k(o3.globalFilter, s4 || {}, xe), c4 = m(u3, e1.globalFilter);
          return H(a4.autoRemove, c4) ? (e1.globalFilter, i(e1, [ "globalFilter" ])) : r({}, e1, {
            globalFilter: c4
          });
        }
      }
      function Ge(e1) {
        var n2 = e1.data, o3 = e1.rows, r2 = e1.flatRows, i3 = e1.rowsById, u4 = e1.allColumns, s5 = e1.filterTypes, a5 = e1.globalFilter, c5 = e1.manualGlobalFilter, d4 = e1.state.globalFilter, f3 = e1.dispatch, p3 = e1.autoResetGlobalFilter, g3 = void 0 === p3 || p3, v3 = e1.disableGlobalFilter, m2 = t.useCallback((function(e2) {
          f3({
            type: l.setGlobalFilter,
            filterValue: e2
          });
        }), [ f3 ]), y2 = t.useMemo((function() {
          if (c5 || void 0 === d4) return [ o3, r2, i3 ];
          var e2 = [], t1 = {}, n3 = k(a5, s5 || {}, xe);
          if (!n3) return console.warn("Could not find a valid 'globalFilter' option."), o3;
          u4.forEach((function(e3) {
            var t2 = e3.disableGlobalFilter;
            e3.canFilter = I(!0 !== t2 && void 0, !0 !== v3 && void 0, !0);
          }));
          var l2 = u4.filter((function(e3) {
            return !0 === e3.canFilter;
          }));
          return [ function o4(r3) {
            return (r3 = n3(r3, l2.map((function(e3) {
              return e3.id;
            })), d4)).forEach((function(n4) {
              e2.push(n4), t1[n4.id] = n4, n4.subRows = n4.subRows && n4.subRows.length ? o4(n4.subRows) : n4.subRows;
            })), r3;
          }(o3), e2, t1 ];
        }), [ c5, d4, a5, s5, u4, o3, r2, i3, v3 ]), R1 = y2[0], b1 = y2[1], S1 = y2[2], C1 = h(g3);
        w((function() {
          C1() && f3({
            type: l.resetGlobalFilter
          });
        }), [ f3, c5 ? null : n2 ]), Object.assign(e1, {
          preGlobalFilteredRows: o3,
          preGlobalFilteredFlatRows: r2,
          preGlobalFilteredRowsById: i3,
          globalFilteredRows: R1,
          globalFilteredFlatRows: b1,
          globalFilteredRowsById: S1,
          rows: R1,
          flatRows: b1,
          rowsById: S1,
          setGlobalFilter: m2,
          disableGlobalFilter: v3
        });
      }
      function Ae(e1, t1) {
        return t1.reduce((function(e2, t2) {
          return e2 + ("number" == typeof t2 ? t2 : 0);
        }), 0);
      }
      Ie.pluginName = "useGlobalFilter";
      var ke = Object.freeze({
        __proto__: null,
        sum: Ae,
        min: function(e1) {
          var t1 = e1[0] || 0;
          return e1.forEach((function(e2) {
            "number" == typeof e2 && (t1 = Math.min(t1, e2));
          })), t1;
        },
        max: function(e1) {
          var t1 = e1[0] || 0;
          return e1.forEach((function(e2) {
            "number" == typeof e2 && (t1 = Math.max(t1, e2));
          })), t1;
        },
        minMax: function(e1) {
          var t1 = e1[0] || 0, n2 = e1[0] || 0;
          return e1.forEach((function(e2) {
            "number" == typeof e2 && (t1 = Math.min(t1, e2), n2 = Math.max(n2, e2));
          })), t1 + ".." + n2;
        },
        average: function(e1) {
          return Ae(0, e1) / e1.length;
        },
        median: function(e1) {
          if (!e1.length) return null;
          var t1 = Math.floor(e1.length / 2), n2 = [].concat(e1).sort((function(e2, t2) {
            return e2 - t2;
          }));
          return e1.length % 2 != 0 ? n2[t1] : (n2[t1 - 1] + n2[t1]) / 2;
        },
        unique: function(e1) {
          return Array.from(new Set(e1).values());
        },
        uniqueCount: function(e1) {
          return new Set(e1).size;
        },
        count: function(e1) {
          return e1.length;
        }
      }), He = [], Te = {};
      l.resetGroupBy = "resetGroupBy", l.setGroupBy = "setGroupBy", l.toggleGroupBy = "toggleGroupBy";
      var ze = function(e1) {
        e1.getGroupByToggleProps = [ We ], e1.stateReducers.push(Oe), e1.visibleColumnsDeps.push((function(e2, t1) {
          var n2 = t1.instance;
          return [].concat(e2, [ n2.state.groupBy ]);
        })), e1.visibleColumns.push(Me), e1.useInstance.push(Ne), e1.prepareRow.push(Le);
      };
      ze.pluginName = "useGroupBy";
      var We = function(e1, t1) {
        var n2 = t1.header;
        return [ e1, {
          onClick: n2.canGroupBy ? function(e2) {
            e2.persist(), n2.toggleGroupBy();
          } : void 0,
          style: {
            cursor: n2.canGroupBy ? "pointer" : void 0
          },
          title: "Toggle GroupBy"
        } ];
      };
      function Oe(e1, t1, n2, o3) {
        if (t1.type === l.init) return r({
          groupBy: []
        }, e1);
        if (t1.type === l.resetGroupBy) return r({}, e1, {
          groupBy: o3.initialState.groupBy || []
        });
        if (t1.type === l.setGroupBy) return r({}, e1, {
          groupBy: t1.value
        });
        if (t1.type === l.toggleGroupBy) {
          var i3 = t1.columnId, u4 = t1.value, s5 = void 0 !== u4 ? u4 : !e1.groupBy.includes(i3);
          return r({}, e1, s5 ? {
            groupBy: [].concat(e1.groupBy, [ i3 ])
          } : {
            groupBy: e1.groupBy.filter((function(e2) {
              return e2 !== i3;
            }))
          });
        }
      }
      function Me(e1, t1) {
        var n2 = t1.instance.state.groupBy, o3 = n2.map((function(t2) {
          return e1.find((function(e2) {
            return e2.id === t2;
          }));
        })).filter(Boolean), r2 = e1.filter((function(e2) {
          return !n2.includes(e2.id);
        }));
        return (e1 = [].concat(o3, r2)).forEach((function(e2) {
          e2.isGrouped = n2.includes(e2.id), e2.groupedIndex = n2.indexOf(e2.id);
        })), e1;
      }
      var je = {};
      function Ne(e1) {
        var n2 = e1.data, o3 = e1.rows, r2 = e1.flatRows, i4 = e1.rowsById, u5 = e1.allColumns, s6 = e1.flatHeaders, a5 = e1.groupByFn, c5 = void 0 === a5 ? De : a5, d4 = e1.manualGroupBy, p3 = e1.aggregations, g3 = void 0 === p3 ? je : p3, m2 = e1.plugins, y2 = e1.state.groupBy, R1 = e1.dispatch, b1 = e1.autoResetGroupBy, S1 = void 0 === b1 || b1, C1 = e1.disableGroupBy, x1 = e1.defaultCanGroupBy, P1 = e1.getHooks;
        v(m2, [ "useColumnOrder", "useFilters" ], "useGroupBy");
        var B1 = h(e1);
        u5.forEach((function(t1) {
          var n3 = t1.accessor, o4 = t1.defaultGroupBy, r3 = t1.disableGroupBy;
          t1.canGroupBy = n3 ? I(t1.canGroupBy, !0 !== r3 && void 0, !0 !== C1 && void 0, !0) : I(t1.canGroupBy, o4, x1, !1), 
          t1.canGroupBy && (t1.toggleGroupBy = function() {
            return e1.toggleGroupBy(t1.id);
          }), t1.Aggregated = t1.Aggregated || t1.Cell;
        }));
        var E1 = t.useCallback((function(e2, t1) {
          R1({
            type: l.toggleGroupBy,
            columnId: e2,
            value: t1
          });
        }), [ R1 ]), F1 = t.useCallback((function(e2) {
          R1({
            type: l.setGroupBy,
            value: e2
          });
        }), [ R1 ]);
        s6.forEach((function(e2) {
          e2.getGroupByToggleProps = f(P1().getGroupByToggleProps, {
            instance: B1(),
            header: e2
          });
        }));
        var A1 = t.useMemo((function() {
          if (d4 || !y2.length) return [ o3, r2, i4, He, Te, r2, i4 ];
          var e2 = y2.filter((function(e3) {
            return u5.find((function(t1) {
              return t1.id === e3;
            }));
          })), t1 = [], n3 = {}, l2 = [], s7 = {}, a6 = [], f3 = {}, p4 = function o4(r3, i5, d5) {
            if (void 0 === i5 && (i5 = 0), i5 === e2.length) return r3;
            var p5 = e2[i5], v3 = c5(r3, p5);
            return Object.entries(v3).map((function(r4, c6) {
              var t2, n4, o5, r5, v4 = r4[0], m3 = r4[1], h3 = p5 + ":" + v4, y3 = o4(m3, i5 + 1, h3 = d5 ? d5 + ">" + h3 : h3), w1 = i5 ? G(m3, "leafRows") : m3, R2 = (t2 = w1, 
              n4 = m3, o5 = i5, r5 = {}, u5.forEach((function(i6) {
                if (e2.includes(i6.id)) r5[i6.id] = n4[0] ? n4[0].values[i6.id] : null; else {
                  var u6 = "function" == typeof i6.aggregate ? i6.aggregate : g3[i6.aggregate] || ke[i6.aggregate];
                  if (u6) {
                    var l3 = n4.map((function(e3) {
                      return e3.values[i6.id];
                    })), s8 = t2.map((function(e3) {
                      var t3 = e3.values[i6.id];
                      if (!o5 && i6.aggregateValue) {
                        var n5 = "function" == typeof i6.aggregateValue ? i6.aggregateValue : g3[i6.aggregateValue] || ke[i6.aggregateValue];
                        if (!n5) throw console.info({
                          column: i6
                        }), new Error("React Table: Invalid column.aggregateValue option for column listed above");
                        t3 = n5(t3, e3, i6);
                      }
                      return t3;
                    }));
                    r5[i6.id] = u6(s8, l3);
                  } else {
                    if (i6.aggregate) throw console.info({
                      column: i6
                    }), new Error("React Table: Invalid column.aggregate option for column listed above");
                    r5[i6.id] = null;
                  }
                }
              })), r5), b2 = {
                id: h3,
                isGrouped: !0,
                groupByID: p5,
                groupByVal: v4,
                values: R2,
                subRows: y3,
                leafRows: w1,
                depth: i5,
                index: c6
              };
              return y3.forEach((function(e3) {
                t1.push(e3), n3[e3.id] = e3, e3.isGrouped ? (l2.push(e3), s7[e3.id] = e3) : (a6.push(e3), 
                f3[e3.id] = e3);
              })), b2;
            }));
          }(o3);
          return p4.forEach((function(e3) {
            t1.push(e3), n3[e3.id] = e3, e3.isGrouped ? (l2.push(e3), s7[e3.id] = e3) : (a6.push(e3), 
            f3[e3.id] = e3);
          })), [ p4, t1, n3, l2, s7, a6, f3 ];
        }), [ d4, y2, o3, r2, i4, u5, g3, c5 ]), k1 = A1[0], H1 = A1[1], T1 = A1[2], z1 = A1[3], W1 = A1[4], O1 = A1[5], M1 = A1[6], j1 = h(S1);
        w((function() {
          j1() && R1({
            type: l.resetGroupBy
          });
        }), [ R1, d4 ? null : n2 ]), Object.assign(e1, {
          preGroupedRows: o3,
          preGroupedFlatRow: r2,
          preGroupedRowsById: i4,
          groupedRows: k1,
          groupedFlatRows: H1,
          groupedRowsById: T1,
          onlyGroupedFlatRows: z1,
          onlyGroupedRowsById: W1,
          nonGroupedFlatRows: O1,
          nonGroupedRowsById: M1,
          rows: k1,
          flatRows: H1,
          rowsById: T1,
          toggleGroupBy: E1,
          setGroupBy: F1
        });
      }
      function Le(e1) {
        e1.allCells.forEach((function(t1) {
          var n2;
          t1.isGrouped = t1.column.isGrouped && t1.column.id === e1.groupByID, t1.isPlaceholder = !t1.isGrouped && t1.column.isGrouped, 
          t1.isAggregated = !t1.isGrouped && !t1.isPlaceholder && (null == (n2 = e1.subRows) ? void 0 : n2.length);
        }));
      }
      function De(e1, t1) {
        return e1.reduce((function(e2, n2, o3) {
          var r2 = "" + n2.values[t1];
          return e2[r2] = Array.isArray(e2[r2]) ? e2[r2] : [], e2[r2].push(n2), e2;
        }), {});
      }
      var Ve = /([0-9]+)/gm;
      function _e(e1, t1) {
        return e1 === t1 ? 0 : e1 > t1 ? 1 : -1;
      }
      function Xe(e1, t1, n2) {
        return [ e1.values[n2], t1.values[n2] ];
      }
      function qe(e1) {
        return "number" == typeof e1 ? isNaN(e1) || e1 === 1 / 0 || e1 === -1 / 0 ? "" : String(e1) : "string" == typeof e1 ? e1 : "";
      }
      var Ke = Object.freeze({
        __proto__: null,
        alphanumeric: function(e1, t1, n2) {
          var o3 = Xe(e1, t1, n2), r2 = o3[0], i4 = o3[1];
          for (r2 = qe(r2), i4 = qe(i4), r2 = r2.split(Ve).filter(Boolean), i4 = i4.split(Ve).filter(Boolean); r2.length && i4.length; ) {
            var u5 = r2.shift(), l2 = i4.shift(), s6 = parseInt(u5, 10), a5 = parseInt(l2, 10), c5 = [ s6, a5 ].sort();
            if (isNaN(c5[0])) {
              if (u5 > l2) return 1;
              if (l2 > u5) return -1;
            } else {
              if (isNaN(c5[1])) return isNaN(s6) ? -1 : 1;
              if (s6 > a5) return 1;
              if (a5 > s6) return -1;
            }
          }
          return r2.length - i4.length;
        },
        datetime: function(e1, t1, n2) {
          var o3 = Xe(e1, t1, n2), r2 = o3[0], i4 = o3[1];
          return _e(r2 = r2.getTime(), i4 = i4.getTime());
        },
        basic: function(e1, t1, n2) {
          var o3 = Xe(e1, t1, n2);
          return _e(o3[0], o3[1]);
        },
        string: function(e1, t1, n2) {
          var o3 = Xe(e1, t1, n2), r2 = o3[0], i4 = o3[1];
          for (r2 = r2.split("").filter(Boolean), i4 = i4.split("").filter(Boolean); r2.length && i4.length; ) {
            var u7 = r2.shift(), l4 = i4.shift(), s7 = u7.toLowerCase(), a6 = l4.toLowerCase();
            if (s7 > a6) return 1;
            if (a6 > s7) return -1;
            if (u7 > l4) return 1;
            if (l4 > u7) return -1;
          }
          return r2.length - i4.length;
        },
        number: function(e1, t1, n2) {
          var o3 = Xe(e1, t1, n2), r2 = o3[0], i4 = o3[1], u8 = /[^0-9.]/gi;
          return _e(r2 = Number(String(r2).replace(u8, "")), i4 = Number(String(i4).replace(u8, "")));
        }
      });
      l.resetSortBy = "resetSortBy", l.setSortBy = "setSortBy", l.toggleSortBy = "toggleSortBy", 
      l.clearSortBy = "clearSortBy", c.sortType = "alphanumeric", c.sortDescFirst = !1;
      var Ue = function(e1) {
        e1.getSortByToggleProps = [ $e ], e1.stateReducers.push(Je), e1.useInstance.push(Ye);
      };
      Ue.pluginName = "useSortBy";
      var $e = function(e1, t1) {
        var n2 = t1.instance, o3 = t1.column, r2 = n2.isMultiSortEvent, i4 = void 0 === r2 ? function(e2) {
          return e2.shiftKey;
        } : r2;
        return [ e1, {
          onClick: o3.canSort ? function(e2) {
            e2.persist(), o3.toggleSortBy(void 0, !n2.disableMultiSort && i4(e2));
          } : void 0,
          style: {
            cursor: o3.canSort ? "pointer" : void 0
          },
          title: o3.canSort ? "Toggle SortBy" : void 0
        } ];
      };
      function Je(e1, t1, n2, o3) {
        if (t1.type === l.init) return r({
          sortBy: []
        }, e1);
        if (t1.type === l.resetSortBy) return r({}, e1, {
          sortBy: o3.initialState.sortBy || []
        });
        if (t1.type === l.clearSortBy) return r({}, e1, {
          sortBy: e1.sortBy.filter((function(e2) {
            return e2.id !== t1.columnId;
          }))
        });
        if (t1.type === l.setSortBy) return r({}, e1, {
          sortBy: t1.sortBy
        });
        if (t1.type === l.toggleSortBy) {
          var i4, u8 = t1.columnId, s9 = t1.desc, a7 = t1.multi, c6 = o3.allColumns, d4 = o3.disableMultiSort, f3 = o3.disableSortRemove, p3 = o3.disableMultiRemove, g3 = o3.maxMultiSortColCount, v3 = void 0 === g3 ? Number.MAX_SAFE_INTEGER : g3, m2 = e1.sortBy, h3 = c6.find((function(e2) {
            return e2.id === u8;
          })).sortDescFirst, y2 = m2.find((function(e2) {
            return e2.id === u8;
          })), w1 = m2.findIndex((function(e2) {
            return e2.id === u8;
          })), R1 = null != s9, b1 = [];
          return "toggle" != (i4 = !d4 && a7 ? y2 ? "toggle" : "add" : w1 !== m2.length - 1 || 1 !== m2.length ? "replace" : y2 ? "toggle" : "replace") || f3 || R1 || a7 && p3 || !(y2 && y2.desc && !h3 || !y2.desc && h3) || (i4 = "remove"), 
          "replace" === i4 ? b1 = [ {
            id: u8,
            desc: R1 ? s9 : h3
          } ] : "add" === i4 ? (b1 = [].concat(m2, [ {
            id: u8,
            desc: R1 ? s9 : h3
          } ])).splice(0, b1.length - v3) : "toggle" === i4 ? b1 = m2.map((function(e2) {
            return e2.id === u8 ? r({}, e2, {
              desc: R1 ? s9 : !y2.desc
            }) : e2;
          })) : "remove" === i4 && (b1 = m2.filter((function(e2) {
            return e2.id !== u8;
          }))), r({}, e1, {
            sortBy: b1
          });
        }
      }
      function Ye(e1) {
        var n2 = e1.data, o3 = e1.rows, r2 = e1.flatRows, i5 = e1.allColumns, u9 = e1.orderByFn, s10 = void 0 === u9 ? Qe : u9, a8 = e1.sortTypes, c7 = e1.manualSortBy, d5 = e1.defaultCanSort, p4 = e1.disableSortBy, g4 = e1.flatHeaders, m3 = e1.state.sortBy, y3 = e1.dispatch, R2 = e1.plugins, b2 = e1.getHooks, S1 = e1.autoResetSortBy, C1 = void 0 === S1 || S1;
        v(R2, [ "useFilters", "useGlobalFilter", "useGroupBy", "usePivotColumns" ], "useSortBy");
        var x1 = t.useCallback((function(e2) {
          y3({
            type: l.setSortBy,
            sortBy: e2
          });
        }), [ y3 ]), P1 = t.useCallback((function(e2, t1, n3) {
          y3({
            type: l.toggleSortBy,
            columnId: e2,
            desc: t1,
            multi: n3
          });
        }), [ y3 ]), B1 = h(e1);
        g4.forEach((function(e2) {
          var t1 = e2.accessor, n3 = e2.canSort, o4 = e2.disableSortBy, r3 = e2.id, i6 = t1 ? I(!0 !== o4 && void 0, !0 !== p4 && void 0, !0) : I(d5, n3, !1);
          e2.canSort = i6, e2.canSort && (e2.toggleSortBy = function(t2, n4) {
            return P1(e2.id, t2, n4);
          }, e2.clearSortBy = function() {
            y3({
              type: l.clearSortBy,
              columnId: e2.id
            });
          }), e2.getSortByToggleProps = f(b2().getSortByToggleProps, {
            instance: B1(),
            column: e2
          });
          var u10 = m3.find((function(e3) {
            return e3.id === r3;
          }));
          e2.isSorted = !!u10, e2.sortedIndex = m3.findIndex((function(e3) {
            return e3.id === r3;
          })), e2.isSortedDesc = e2.isSorted ? u10.desc : void 0;
        }));
        var E1 = t.useMemo((function() {
          if (c7 || !m3.length) return [ o3, r2 ];
          var e2 = [], t1 = m3.filter((function(e3) {
            return i5.find((function(t2) {
              return t2.id === e3.id;
            }));
          }));
          return [ function n3(o4) {
            var r3 = s10(o4, t1.map((function(e3) {
              var t2 = i5.find((function(t3) {
                return t3.id === e3.id;
              }));
              if (!t2) throw new Error("React-Table: Could not find a column with id: " + e3.id + " while sorting");
              var n4 = t2.sortType, o5 = F(n4) || (a8 || {})[n4] || Ke[n4];
              if (!o5) throw new Error("React-Table: Could not find a valid sortType of '" + n4 + "' for column '" + e3.id + "'.");
              return function(t3, n6) {
                return o5(t3, n6, e3.id, e3.desc);
              };
            })), t1.map((function(e3) {
              var t2 = i5.find((function(t3) {
                return t3.id === e3.id;
              }));
              return t2 && t2.sortInverted ? e3.desc : !e3.desc;
            })));
            return r3.forEach((function(t2) {
              e2.push(t2), t2.subRows && 0 !== t2.subRows.length && (t2.subRows = n3(t2.subRows));
            })), r3;
          }(o3), e2 ];
        }), [ c7, m3, o3, r2, i5, s10, a8 ]), G1 = E1[0], A1 = E1[1], k1 = h(C1);
        w((function() {
          k1() && y3({
            type: l.resetSortBy
          });
        }), [ c7 ? null : n2 ]), Object.assign(e1, {
          preSortedRows: o3,
          preSortedFlatRows: r2,
          sortedRows: G1,
          sortedFlatRows: A1,
          rows: G1,
          flatRows: A1,
          setSortBy: x1,
          toggleSortBy: P1
        });
      }
      function Qe(e1, t1, n2) {
        return [].concat(e1).sort((function(e2, o3) {
          for (var r2 = 0; r2 < t1.length; r2 += 1) {
            var i5 = t1[r2], u9 = !1 === n2[r2] || "desc" === n2[r2], l5 = i5(e2, o3);
            if (0 !== l5) return u9 ? -l5 : l5;
          }
          return n2[0] ? e2.index - o3.index : o3.index - e2.index;
        }));
      }
      l.resetPage = "resetPage", l.gotoPage = "gotoPage", l.setPageSize = "setPageSize";
      var Ze = function(e1) {
        e1.stateReducers.push(et), e1.useInstance.push(tt);
      };
      function et(e1, t1, n2, o3) {
        if (t1.type === l.init) return r({
          pageSize: 10,
          pageIndex: 0
        }, e1);
        if (t1.type === l.resetPage) return r({}, e1, {
          pageIndex: o3.initialState.pageIndex || 0
        });
        if (t1.type === l.gotoPage) {
          var i6 = o3.pageCount, u10 = o3.page, s10 = m(t1.pageIndex, e1.pageIndex), a8 = !1;
          return s10 > e1.pageIndex ? a8 = -1 === i6 ? u10.length >= e1.pageSize : s10 < i6 : s10 < e1.pageIndex && (a8 = s10 > -1), 
          a8 ? r({}, e1, {
            pageIndex: s10
          }) : e1;
        }
        if (t1.type === l.setPageSize) {
          var c7 = t1.pageSize, d5 = e1.pageSize * e1.pageIndex;
          return r({}, e1, {
            pageIndex: Math.floor(d5 / c7),
            pageSize: c7
          });
        }
      }
      function tt(e1) {
        var n2 = e1.rows, o3 = e1.autoResetPage, r2 = void 0 === o3 || o3, i7 = e1.manualExpandedKey, u11 = void 0 === i7 ? "expanded" : i7, s11 = e1.plugins, a9 = e1.pageCount, c8 = e1.paginateExpandedRows, d6 = void 0 === c8 || c8, f4 = e1.expandSubRows, p4 = void 0 === f4 || f4, g4 = e1.state, m3 = g4.pageSize, y3 = g4.pageIndex, R2 = g4.expanded, b2 = g4.globalFilter, S1 = g4.filters, C1 = g4.groupBy, x1 = g4.sortBy, P1 = e1.dispatch, B1 = e1.data, E1 = e1.manualPagination;
        v(s11, [ "useGlobalFilter", "useFilters", "useGroupBy", "useSortBy", "useExpanded" ], "usePagination");
        var I1 = h(r2);
        w((function() {
          I1() && P1({
            type: l.resetPage
          });
        }), [ P1, E1 ? null : B1, b2, S1, C1, x1 ]);
        var F1 = E1 ? a9 : Math.ceil(n2.length / m3), G1 = t.useMemo((function() {
          return F1 > 0 ? [].concat(new Array(F1)).fill(null).map((function(e2, t1) {
            return t1;
          })) : [];
        }), [ F1 ]), k1 = t.useMemo((function() {
          var e2;
          if (E1) e2 = n2; else {
            var t1 = m3 * y3, o4 = t1 + m3;
            e2 = n2.slice(t1, o4);
          }
          return d6 ? e2 : A(e2, {
            manualExpandedKey: u11,
            expanded: R2,
            expandSubRows: p4
          });
        }), [ p4, R2, u11, E1, y3, m3, d6, n2 ]), H1 = y3 > 0, T1 = -1 === F1 ? k1.length >= m3 : y3 < F1 - 1, z1 = t.useCallback((function(e2) {
          P1({
            type: l.gotoPage,
            pageIndex: e2
          });
        }), [ P1 ]), W1 = t.useCallback((function() {
          return z1((function(e2) {
            return e2 - 1;
          }));
        }), [ z1 ]), O1 = t.useCallback((function() {
          return z1((function(e2) {
            return e2 + 1;
          }));
        }), [ z1 ]), M1 = t.useCallback((function(e2) {
          P1({
            type: l.setPageSize,
            pageSize: e2
          });
        }), [ P1 ]);
        Object.assign(e1, {
          pageOptions: G1,
          pageCount: F1,
          page: k1,
          canPreviousPage: H1,
          canNextPage: T1,
          gotoPage: z1,
          previousPage: W1,
          nextPage: O1,
          setPageSize: M1
        });
      }
      Ze.pluginName = "usePagination", l.resetPivot = "resetPivot", l.togglePivot = "togglePivot";
      var nt = function(e1) {
        e1.getPivotToggleProps = [ rt ], e1.stateReducers.push(it), e1.useInstanceAfterData.push(ut), 
        e1.allColumns.push(lt), e1.accessValue.push(st), e1.materializedColumns.push(at), 
        e1.materializedColumnsDeps.push(ct), e1.visibleColumns.push(dt), e1.visibleColumnsDeps.push(ft), 
        e1.useInstance.push(pt), e1.prepareRow.push(gt);
      };
      nt.pluginName = "usePivotColumns";
      var ot = [], rt = function(e1, t2) {
        var n2 = t2.header;
        return [ e1, {
          onClick: n2.canPivot ? function(e2) {
            e2.persist(), n2.togglePivot();
          } : void 0,
          style: {
            cursor: n2.canPivot ? "pointer" : void 0
          },
          title: "Toggle Pivot"
        } ];
      };
      function it(e1, t2, n2, o3) {
        if (t2.type === l.init) return r({
          pivotColumns: ot
        }, e1);
        if (t2.type === l.resetPivot) return r({}, e1, {
          pivotColumns: o3.initialState.pivotColumns || ot
        });
        if (t2.type === l.togglePivot) {
          var i7 = t2.columnId, u11 = t2.value, s11 = void 0 !== u11 ? u11 : !e1.pivotColumns.includes(i7);
          return r({}, e1, s11 ? {
            pivotColumns: [].concat(e1.pivotColumns, [ i7 ])
          } : {
            pivotColumns: e1.pivotColumns.filter((function(e2) {
              return e2 !== i7;
            }))
          });
        }
      }
      function ut(e1) {
        e1.allColumns.forEach((function(t2) {
          t2.isPivotSource = e1.state.pivotColumns.includes(t2.id);
        }));
      }
      function lt(e1, t2) {
        var n2 = t2.instance;
        return e1.forEach((function(e2) {
          e2.isPivotSource = n2.state.pivotColumns.includes(e2.id), e2.uniqueValues = new Set;
        })), e1;
      }
      function st(e1, t2) {
        var n2 = t2.column;
        return n2.uniqueValues && void 0 !== e1 && n2.uniqueValues.add(e1), e1;
      }
      function at(e1, t2) {
        var n2 = t2.instance, o3 = n2.allColumns, i8 = n2.state;
        if (!i8.pivotColumns.length || !i8.groupBy || !i8.groupBy.length) return e1;
        var u12 = i8.pivotColumns.map((function(e2) {
          return o3.find((function(t3) {
            return t3.id === e2;
          }));
        })).filter(Boolean), l6 = o3.filter((function(e2) {
          return !e2.isPivotSource && !i8.groupBy.includes(e2.id) && !i8.pivotColumns.includes(e2.id);
        })), s12 = C(function e2(t3, n3, o5) {
          void 0 === t3 && (t3 = 0), void 0 === o5 && (o5 = []);
          var i9 = u12[t3];
          return i9 ? Array.from(i9.uniqueValues).sort().map((function(u13) {
            var l7 = r({}, i9, {
              Header: i9.PivotHeader || "string" == typeof i9.header ? i9.Header + ": " + u13 : u13,
              isPivotGroup: !0,
              parent: n3,
              depth: t3,
              id: n3 ? n3.id + "." + i9.id + "." + u13 : i9.id + "." + u13,
              pivotValue: u13
            });
            return l7.columns = e2(t3 + 1, l7, [].concat(o5, [ function(e3) {
              return e3.values[i9.id] === u13;
            } ])), l7;
          })) : l6.map((function(e3) {
            return r({}, e3, {
              canPivot: !1,
              isPivoted: !0,
              parent: n3,
              depth: t3,
              id: "" + (n3 ? n3.id + "." + e3.id : e3.id),
              accessor: function(t4, n4, r2) {
                if (o5.every((function(e4) {
                  return e4(r2);
                }))) return r2.values[e3.id];
              }
            });
          }));
        }());
        return [].concat(e1, s12);
      }
      function ct(e1, t2) {
        var n2 = t2.instance.state, o3 = n2.pivotColumns, r2 = n2.groupBy;
        return [].concat(e1, [ o3, r2 ]);
      }
      function dt(e1, t2) {
        var n2 = t2.instance.state;
        return e1 = e1.filter((function(e2) {
          return !e2.isPivotSource;
        })), n2.pivotColumns.length && n2.groupBy && n2.groupBy.length && (e1 = e1.filter((function(e2) {
          return e2.isGrouped || e2.isPivoted;
        }))), e1;
      }
      function ft(e1, t2) {
        var n2 = t2.instance;
        return [].concat(e1, [ n2.state.pivotColumns, n2.state.groupBy ]);
      }
      function pt(e1) {
        var t2 = e1.columns, n2 = e1.allColumns, o3 = e1.flatHeaders, r2 = e1.getHooks, i8 = e1.plugins, u12 = e1.dispatch, s12 = e1.autoResetPivot, a9 = void 0 === s12 || s12, c8 = e1.manaulPivot, d6 = e1.disablePivot, p4 = e1.defaultCanPivot;
        v(i8, [ "useGroupBy" ], "usePivotColumns");
        var g4 = h(e1);
        n2.forEach((function(t3) {
          var n3 = t3.accessor, o5 = t3.defaultPivot, r3 = t3.disablePivot;
          t3.canPivot = n3 ? I(t3.canPivot, !0 !== r3 && void 0, !0 !== d6 && void 0, !0) : I(t3.canPivot, o5, p4, !1), 
          t3.canPivot && (t3.togglePivot = function() {
            return e1.togglePivot(t3.id);
          }), t3.Aggregated = t3.Aggregated || t3.Cell;
        })), o3.forEach((function(e2) {
          e2.getPivotToggleProps = f(r2().getPivotToggleProps, {
            instance: g4(),
            header: e2
          });
        }));
        var m3 = h(a9);
        w((function() {
          m3() && u12({
            type: l.resetPivot
          });
        }), [ u12, c8 ? null : t2 ]), Object.assign(e1, {
          togglePivot: function(e2, t3) {
            u12({
              type: l.togglePivot,
              columnId: e2,
              value: t3
            });
          }
        });
      }
      function gt(e1) {
        e1.allCells.forEach((function(e2) {
          e2.isPivoted = e2.column.isPivoted;
        }));
      }
      l.resetSelectedRows = "resetSelectedRows", l.toggleAllRowsSelected = "toggleAllRowsSelected", 
      l.toggleRowSelected = "toggleRowSelected", l.toggleAllPageRowsSelected = "toggleAllPageRowsSelected";
      var vt = function(e1) {
        e1.getToggleRowSelectedProps = [ mt ], e1.getToggleAllRowsSelectedProps = [ ht ], 
        e1.getToggleAllPageRowsSelectedProps = [ yt ], e1.stateReducers.push(wt), e1.useInstance.push(Rt), 
        e1.prepareRow.push(bt);
      };
      vt.pluginName = "useRowSelect";
      var mt = function(e1, t2) {
        var n2 = t2.instance, o3 = t2.row, r2 = n2.manualRowSelectedKey, i8 = void 0 === r2 ? "isSelected" : r2;
        return [ e1, {
          onChange: function(e2) {
            o3.toggleRowSelected(e2.target.checked);
          },
          style: {
            cursor: "pointer"
          },
          checked: !(!o3.original || !o3.original[i8]) || o3.isSelected,
          title: "Toggle Row Selected",
          indeterminate: o3.isSomeSelected
        } ];
      }, ht = function(e1, t2) {
        var n2 = t2.instance;
        return [ e1, {
          onChange: function(e2) {
            n2.toggleAllRowsSelected(e2.target.checked);
          },
          style: {
            cursor: "pointer"
          },
          checked: n2.isAllRowsSelected,
          title: "Toggle All Rows Selected",
          indeterminate: Boolean(!n2.isAllRowsSelected && Object.keys(n2.state.selectedRowIds).length)
        } ];
      }, yt = function(e1, t2) {
        var n2 = t2.instance;
        return [ e1, {
          onChange: function(e2) {
            n2.toggleAllPageRowsSelected(e2.target.checked);
          },
          style: {
            cursor: "pointer"
          },
          checked: n2.isAllPageRowsSelected,
          title: "Toggle All Current Page Rows Selected",
          indeterminate: Boolean(!n2.isAllPageRowsSelected && n2.page.some((function(e2) {
            var t3 = e2.id;
            return n2.state.selectedRowIds[t3];
          })))
        } ];
      };
      function wt(e1, t2, n2, o3) {
        if (t2.type === l.init) return r({
          selectedRowIds: {}
        }, e1);
        if (t2.type === l.resetSelectedRows) return r({}, e1, {
          selectedRowIds: o3.initialState.selectedRowIds || {}
        });
        if (t2.type === l.toggleAllRowsSelected) {
          var i8 = t2.value, u12 = o3.isAllRowsSelected, s12 = o3.rowsById, a9 = o3.nonGroupedRowsById, c8 = void 0 === a9 ? s12 : a9, d6 = void 0 !== i8 ? i8 : !u12, f4 = Object.assign({}, e1.selectedRowIds);
          return d6 ? Object.keys(c8).forEach((function(e2) {
            f4[e2] = !0;
          })) : Object.keys(c8).forEach((function(e2) {
            delete f4[e2];
          })), r({}, e1, {
            selectedRowIds: f4
          });
        }
        if (t2.type === l.toggleRowSelected) {
          var p4 = t2.id, g4 = t2.value, v4 = o3.rowsById, m3 = o3.selectSubRows, h4 = void 0 === m3 || m3, y3 = o3.getSubRows, w2 = e1.selectedRowIds[p4], R2 = void 0 !== g4 ? g4 : !w2;
          if (w2 === R2) return e1;
          var b2 = r({}, e1.selectedRowIds);
          return function e2(t3) {
            var n3 = v4[t3];
            if (n3.isGrouped || (R2 ? b2[t3] = !0 : delete b2[t3]), h4 && y3(n3)) return y3(n3).forEach((function(t4) {
              return e2(t4.id);
            }));
          }(p4), r({}, e1, {
            selectedRowIds: b2
          });
        }
        if (t2.type === l.toggleAllPageRowsSelected) {
          var S1 = t2.value, C1 = o3.page, x1 = o3.rowsById, P1 = o3.selectSubRows, B1 = void 0 === P1 || P1, E1 = o3.isAllPageRowsSelected, I1 = o3.getSubRows, F1 = void 0 !== S1 ? S1 : !E1, G1 = r({}, e1.selectedRowIds);
          return C1.forEach((function(e2) {
            return function e3(t3) {
              var n3 = x1[t3];
              if (n3.isGrouped || (F1 ? G1[t3] = !0 : delete G1[t3]), B1 && I1(n3)) return I1(n3).forEach((function(t4) {
                return e3(t4.id);
              }));
            }(e2.id);
          })), r({}, e1, {
            selectedRowIds: G1
          });
        }
        return e1;
      }
      function Rt(e1) {
        var n2 = e1.data, o3 = e1.rows, r2 = e1.getHooks, i9 = e1.plugins, u13 = e1.rowsById, s13 = e1.nonGroupedRowsById, a10 = void 0 === s13 ? u13 : s13, c9 = e1.autoResetSelectedRows, d7 = void 0 === c9 || c9, p5 = e1.state.selectedRowIds, g5 = e1.selectSubRows, m4 = void 0 === g5 || g5, y4 = e1.dispatch, R3 = e1.page, b3 = e1.getSubRows;
        v(i9, [ "useFilters", "useGroupBy", "useSortBy", "useExpanded", "usePagination" ], "useRowSelect");
        var S2 = t.useMemo((function() {
          var e2 = [];
          return o3.forEach((function(t2) {
            var n3 = m4 ? function e3(t3, n4, o5) {
              if (n4[t3.id]) return !0;
              var r3 = o5(t3);
              if (r3 && r3.length) {
                var i10 = !0, u14 = !1;
                return r3.forEach((function(t4) {
                  u14 && !i10 || (e3(t4, n4, o5) ? u14 = !0 : i10 = !1);
                })), !!i10 || !!u14 && null;
              }
              return !1;
            }(t2, p5, b3) : !!p5[t2.id];
            t2.isSelected = !!n3, t2.isSomeSelected = null === n3, n3 && e2.push(t2);
          })), e2;
        }), [ o3, m4, p5, b3 ]), C2 = Boolean(Object.keys(a10).length && Object.keys(p5).length), x2 = C2;
        C2 && Object.keys(a10).some((function(e2) {
          return !p5[e2];
        })) && (C2 = !1), C2 || R3 && R3.length && R3.some((function(e2) {
          var t2 = e2.id;
          return !p5[t2];
        })) && (x2 = !1);
        var P2 = h(d7);
        w((function() {
          P2() && y4({
            type: l.resetSelectedRows
          });
        }), [ y4, n2 ]);
        var B2 = t.useCallback((function(e2) {
          return y4({
            type: l.toggleAllRowsSelected,
            value: e2
          });
        }), [ y4 ]), E2 = t.useCallback((function(e2) {
          return y4({
            type: l.toggleAllPageRowsSelected,
            value: e2
          });
        }), [ y4 ]), I2 = t.useCallback((function(e2, t2) {
          return y4({
            type: l.toggleRowSelected,
            id: e2,
            value: t2
          });
        }), [ y4 ]), F2 = h(e1), G2 = f(r2().getToggleAllRowsSelectedProps, {
          instance: F2()
        }), A1 = f(r2().getToggleAllPageRowsSelectedProps, {
          instance: F2()
        });
        Object.assign(e1, {
          selectedFlatRows: S2,
          isAllRowsSelected: C2,
          isAllPageRowsSelected: x2,
          toggleRowSelected: I2,
          toggleAllRowsSelected: B2,
          getToggleAllRowsSelectedProps: G2,
          getToggleAllPageRowsSelectedProps: A1,
          toggleAllPageRowsSelected: E2
        });
      }
      function bt(e1, t2) {
        var n2 = t2.instance;
        e1.toggleRowSelected = function(t3) {
          return n2.toggleRowSelected(e1.id, t3);
        }, e1.getToggleRowSelectedProps = f(n2.getHooks().getToggleRowSelectedProps, {
          instance: n2,
          row: e1
        });
      }
      var St = function(e1) {
        return {};
      }, Ct = function(e1) {
        return {};
      };
      l.setRowState = "setRowState", l.setCellState = "setCellState", l.resetRowState = "resetRowState";
      var xt = function(e1) {
        e1.stateReducers.push(Pt), e1.useInstance.push(Bt), e1.prepareRow.push(Et);
      };
      function Pt(e1, t2, n2, o3) {
        var i9 = o3.initialRowStateAccessor, u13 = void 0 === i9 ? St : i9, s13 = o3.initialCellStateAccessor, a10 = void 0 === s13 ? Ct : s13, c9 = o3.rowsById;
        if (t2.type === l.init) return r({
          rowState: {}
        }, e1);
        if (t2.type === l.resetRowState) return r({}, e1, {
          rowState: o3.initialState.rowState || {}
        });
        if (t2.type === l.setRowState) {
          var d7, f5 = t2.rowId, p5 = t2.value, g5 = void 0 !== e1.rowState[f5] ? e1.rowState[f5] : u13(c9[f5]);
          return r({}, e1, {
            rowState: r({}, e1.rowState, (d7 = {}, d7[f5] = m(p5, g5), d7))
          });
        }
        if (t2.type === l.setCellState) {
          var v5, h5, y4, w3, R3, b3 = t2.rowId, S2 = t2.columnId, C2 = t2.value, x2 = void 0 !== e1.rowState[b3] ? e1.rowState[b3] : u13(c9[b3]), P2 = void 0 !== (null == x2 || null == (v5 = x2.cellState) ? void 0 : v5[S2]) ? x2.cellState[S2] : a10(null == (h5 = c9[b3]) || null == (y4 = h5.cells) ? void 0 : y4.find((function(e2) {
            return e2.column.id === S2;
          })));
          return r({}, e1, {
            rowState: r({}, e1.rowState, (R3 = {}, R3[b3] = r({}, x2, {
              cellState: r({}, x2.cellState || {}, (w3 = {}, w3[S2] = m(C2, P2), w3))
            }), R3))
          });
        }
      }
      function Bt(e1) {
        var n2 = e1.autoResetRowState, o3 = void 0 === n2 || n2, r2 = e1.data, i9 = e1.dispatch, u13 = t.useCallback((function(e2, t2) {
          return i9({
            type: l.setRowState,
            rowId: e2,
            value: t2
          });
        }), [ i9 ]), s13 = t.useCallback((function(e2, t2, n3) {
          return i9({
            type: l.setCellState,
            rowId: e2,
            columnId: t2,
            value: n3
          });
        }), [ i9 ]), a10 = h(o3);
        w((function() {
          a10() && i9({
            type: l.resetRowState
          });
        }), [ r2 ]), Object.assign(e1, {
          setRowState: u13,
          setCellState: s13
        });
      }
      function Et(e1, t2) {
        var n2 = t2.instance, o3 = n2.initialRowStateAccessor, r2 = void 0 === o3 ? St : o3, i9 = n2.initialCellStateAccessor, u13 = void 0 === i9 ? Ct : i9, l6 = n2.state.rowState;
        e1 && (e1.state = void 0 !== l6[e1.id] ? l6[e1.id] : r2(e1), e1.setState = function(t3) {
          return n2.setRowState(e1.id, t3);
        }, e1.cells.forEach((function(t3) {
          e1.state.cellState || (e1.state.cellState = {}), t3.state = void 0 !== e1.state.cellState[t3.column.id] ? e1.state.cellState[t3.column.id] : u13(t3), 
          t3.setState = function(o5) {
            return n2.setCellState(e1.id, t3.column.id, o5);
          };
        })));
      }
      xt.pluginName = "useRowState", l.resetColumnOrder = "resetColumnOrder", l.setColumnOrder = "setColumnOrder";
      var It = function(e1) {
        e1.stateReducers.push(Ft), e1.visibleColumnsDeps.push((function(e2, t2) {
          var n2 = t2.instance;
          return [].concat(e2, [ n2.state.columnOrder ]);
        })), e1.visibleColumns.push(Gt), e1.useInstance.push(At);
      };
      function Ft(e1, t2, n2, o3) {
        return t2.type === l.init ? r({
          columnOrder: []
        }, e1) : t2.type === l.resetColumnOrder ? r({}, e1, {
          columnOrder: o3.initialState.columnOrder || []
        }) : t2.type === l.setColumnOrder ? r({}, e1, {
          columnOrder: m(t2.columnOrder, e1.columnOrder)
        }) : void 0;
      }
      function Gt(e1, t2) {
        var n2 = t2.instance.state.columnOrder;
        if (!n2 || !n2.length) return e1;
        for (var o3 = [].concat(n2), r2 = [].concat(e1), i9 = [], u13 = function() {
          var e2 = o3.shift(), t3 = r2.findIndex((function(t4) {
            return t4.id === e2;
          }));
          t3 > -1 && i9.push(r2.splice(t3, 1)[0]);
        }; r2.length && o3.length; ) u13();
        return [].concat(i9, r2);
      }
      function At(e1) {
        var n2 = e1.dispatch;
        e1.setColumnOrder = t.useCallback((function(e2) {
          return n2({
            type: l.setColumnOrder,
            columnOrder: e2
          });
        }), [ n2 ]);
      }
      It.pluginName = "useColumnOrder", c.canResize = !0, l.columnStartResizing = "columnStartResizing", 
      l.columnResizing = "columnResizing", l.columnDoneResizing = "columnDoneResizing", 
      l.resetResize = "resetResize";
      var kt = function(e1) {
        e1.getResizerProps = [ Ht ], e1.getHeaderProps.push({
          style: {
            position: "relative"
          }
        }), e1.stateReducers.push(Tt), e1.useInstance.push(Wt), e1.useInstanceBeforeDimensions.push(zt);
      }, Ht = function(e1, t2) {
        var n2 = t2.instance, o3 = t2.header, r2 = n2.dispatch, i9 = function(e2, t3) {
          var n3 = !1;
          if ("touchstart" === e2.type) {
            if (e2.touches && e2.touches.length > 1) return;
            n3 = !0;
          }
          var e3, t4, o5 = (e3 = t3, t4 = [], function e4(n4) {
            n4.columns && n4.columns.length && n4.columns.map(e4), t4.push(n4);
          }(e3), t4).map((function(e3) {
            return [ e3.id, e3.totalWidth ];
          })), i11 = n3 ? Math.round(e2.touches[0].clientX) : e2.clientX, u13 = function(e3) {
            r2({
              type: l.columnResizing,
              clientX: e3
            });
          }, s13 = function() {
            return r2({
              type: l.columnDoneResizing
            });
          }, a10 = {
            mouse: {
              moveEvent: "mousemove",
              moveHandler: function(e3) {
                return u13(e3.clientX);
              },
              upEvent: "mouseup",
              upHandler: function(e3) {
                document.removeEventListener("mousemove", a10.mouse.moveHandler), document.removeEventListener("mouseup", a10.mouse.upHandler), 
                s13();
              }
            },
            touch: {
              moveEvent: "touchmove",
              moveHandler: function(e3) {
                return e3.cancelable && (e3.preventDefault(), e3.stopPropagation()), u13(e3.touches[0].clientX), 
                !1;
              },
              upEvent: "touchend",
              upHandler: function(e3) {
                document.removeEventListener(a10.touch.moveEvent, a10.touch.moveHandler), document.removeEventListener(a10.touch.upEvent, a10.touch.moveHandler), 
                s13();
              }
            }
          }, c9 = n3 ? a10.touch : a10.mouse, d8 = !!function() {
            if ("boolean" == typeof z) return z;
            var e3 = !1;
            try {
              var t4 = {
                get passive() {
                  return e3 = !0, !1;
                }
              };
              window.addEventListener("test", null, t4), window.removeEventListener("test", null, t4);
            } catch (t5) {
              e3 = !1;
            }
            return z = e3;
          }() && {
            passive: !1
          };
          document.addEventListener(c9.moveEvent, c9.moveHandler, d8), document.addEventListener(c9.upEvent, c9.upHandler, d8), 
          r2({
            type: l.columnStartResizing,
            columnId: t3.id,
            columnWidth: t3.totalWidth,
            headerIdWidths: o5,
            clientX: i11
          });
        };
        return [ e1, {
          onMouseDown: function(e2) {
            return e2.persist() || i9(e2, o3);
          },
          onTouchStart: function(e2) {
            return e2.persist() || i9(e2, o3);
          },
          style: {
            cursor: "col-resize"
          },
          draggable: !1,
          role: "separator"
        } ];
      };
      function Tt(e1, t2) {
        if (t2.type === l.init) return r({
          columnResizing: {
            columnWidths: {}
          }
        }, e1);
        if (t2.type === l.resetResize) return r({}, e1, {
          columnResizing: {
            columnWidths: {}
          }
        });
        if (t2.type === l.columnStartResizing) {
          var n2 = t2.clientX, o3 = t2.columnId, i9 = t2.columnWidth, u13 = t2.headerIdWidths;
          return r({}, e1, {
            columnResizing: r({}, e1.columnResizing, {
              startX: n2,
              headerIdWidths: u13,
              columnWidth: i9,
              isResizingColumn: o3
            })
          });
        }
        if (t2.type === l.columnResizing) {
          var s13 = t2.clientX, a10 = e1.columnResizing, c9 = a10.startX, d8 = a10.columnWidth, f6 = a10.headerIdWidths, p6 = (s13 - c9) / d8, g6 = {};
          return (void 0 === f6 ? [] : f6).forEach((function(e2) {
            var t3 = e2[0], n3 = e2[1];
            g6[t3] = Math.max(n3 + n3 * p6, 0);
          })), r({}, e1, {
            columnResizing: r({}, e1.columnResizing, {
              columnWidths: r({}, e1.columnResizing.columnWidths, {}, g6)
            })
          });
        }
        return t2.type === l.columnDoneResizing ? r({}, e1, {
          columnResizing: r({}, e1.columnResizing, {
            startX: null,
            isResizingColumn: null
          })
        }) : void 0;
      }
      kt.pluginName = "useResizeColumns";
      var zt = function(e1) {
        var t2 = e1.flatHeaders, n3 = e1.disableResizing, o5 = e1.getHooks, r2 = e1.state.columnResizing, i11 = h(e1);
        t2.forEach((function(e2) {
          var t3 = I(!0 !== e2.disableResizing && void 0, !0 !== n3 && void 0, !0);
          e2.canResize = t3, e2.width = r2.columnWidths[e2.id] || e2.originalWidth || e2.width, 
          e2.isResizing = r2.isResizingColumn === e2.id, t3 && (e2.getResizerProps = f(o5().getResizerProps, {
            instance: i11(),
            header: e2
          }));
        }));
      };
      function Wt(e1) {
        var n3 = e1.plugins, o5 = e1.dispatch, r2 = e1.autoResetResize, i11 = void 0 === r2 || r2, u15 = e1.columns;
        v(n3, [ "useAbsoluteLayout" ], "useResizeColumns");
        var s14 = h(i11);
        w((function() {
          s14() && o5({
            type: l.resetResize
          });
        }), [ u15 ]);
        var a11 = t.useCallback((function() {
          return o5({
            type: l.resetResize
          });
        }), [ o5 ]);
        Object.assign(e1, {
          resetResizing: a11
        });
      }
      var Ot = {
        position: "absolute",
        top: 0
      }, Mt = function(e1) {
        e1.getTableBodyProps.push(jt), e1.getRowProps.push(jt), e1.getHeaderGroupProps.push(jt), 
        e1.getFooterGroupProps.push(jt), e1.getHeaderProps.push((function(e2, t2) {
          var n3 = t2.column;
          return [ e2, {
            style: r({}, Ot, {
              left: n3.totalLeft + "px",
              width: n3.totalWidth + "px"
            })
          } ];
        })), e1.getCellProps.push((function(e2, t2) {
          var n3 = t2.cell;
          return [ e2, {
            style: r({}, Ot, {
              left: n3.column.totalLeft + "px",
              width: n3.column.totalWidth + "px"
            })
          } ];
        })), e1.getFooterProps.push((function(e2, t2) {
          var n3 = t2.column;
          return [ e2, {
            style: r({}, Ot, {
              left: n3.totalLeft + "px",
              width: n3.totalWidth + "px"
            })
          } ];
        }));
      };
      Mt.pluginName = "useAbsoluteLayout";
      var jt = function(e1, t2) {
        return [ e1, {
          style: {
            position: "relative",
            width: t2.instance.totalColumnsWidth + "px"
          }
        } ];
      }, Nt = {
        display: "inline-block",
        boxSizing: "border-box"
      }, Lt = function(e1, t2) {
        return [ e1, {
          style: {
            display: "flex",
            width: t2.instance.totalColumnsWidth + "px"
          }
        } ];
      }, Dt = function(e1) {
        e1.getRowProps.push(Lt), e1.getHeaderGroupProps.push(Lt), e1.getFooterGroupProps.push(Lt), 
        e1.getHeaderProps.push((function(e2, t2) {
          var n3 = t2.column;
          return [ e2, {
            style: r({}, Nt, {
              width: n3.totalWidth + "px"
            })
          } ];
        })), e1.getCellProps.push((function(e2, t2) {
          var n3 = t2.cell;
          return [ e2, {
            style: r({}, Nt, {
              width: n3.column.totalWidth + "px"
            })
          } ];
        })), e1.getFooterProps.push((function(e2, t2) {
          var n3 = t2.column;
          return [ e2, {
            style: r({}, Nt, {
              width: n3.totalWidth + "px"
            })
          } ];
        }));
      };
      function Vt(e1) {
        e1.getTableProps.push(_t), e1.getRowProps.push(Xt), e1.getHeaderGroupProps.push(Xt), 
        e1.getFooterGroupProps.push(Xt), e1.getHeaderProps.push(qt), e1.getCellProps.push(Kt), 
        e1.getFooterProps.push(Ut);
      }
      Dt.pluginName = "useBlockLayout", Vt.pluginName = "useFlexLayout";
      var _t = function(e1, t2) {
        return [ e1, {
          style: {
            minWidth: t2.instance.totalColumnsMinWidth + "px"
          }
        } ];
      }, Xt = function(e1, t2) {
        return [ e1, {
          style: {
            display: "flex",
            flex: "1 0 auto",
            minWidth: t2.instance.totalColumnsMinWidth + "px"
          }
        } ];
      }, qt = function(e1, t2) {
        var n3 = t2.column;
        return [ e1, {
          style: {
            boxSizing: "border-box",
            flex: n3.totalFlexWidth ? n3.totalFlexWidth + " 0 auto" : void 0,
            minWidth: n3.totalMinWidth + "px",
            width: n3.totalWidth + "px"
          }
        } ];
      }, Kt = function(e1, t2) {
        var n3 = t2.cell;
        return [ e1, {
          style: {
            boxSizing: "border-box",
            flex: n3.column.totalFlexWidth + " 0 auto",
            minWidth: n3.column.totalMinWidth + "px",
            width: n3.column.totalWidth + "px"
          }
        } ];
      }, Ut = function(e1, t2) {
        var n3 = t2.column;
        return [ e1, {
          style: {
            boxSizing: "border-box",
            flex: n3.totalFlexWidth ? n3.totalFlexWidth + " 0 auto" : void 0,
            minWidth: n3.totalMinWidth + "px",
            width: n3.totalWidth + "px"
          }
        } ];
      };
      function $t(e1) {
        e1.stateReducers.push(Qt), e1.getTableProps.push(Jt), e1.getHeaderProps.push(Yt);
      }
      $t.pluginName = "useGridLayout";
      var Jt = function(e1, t2) {
        return [ e1, {
          style: {
            display: "grid",
            gridTemplateColumns: t2.instance.state.gridLayout.columnWidths.map((function(e2) {
              return e2;
            })).join(" ")
          }
        } ];
      }, Yt = function(e1, t2) {
        return [ e1, {
          id: "header-cell-" + t2.column.id,
          style: {
            position: "sticky"
          }
        } ];
      };
      function Qt(e1, t2, n3, o5) {
        if ("init" === t2.type) return r({
          gridLayout: {
            columnWidths: o5.columns.map((function() {
              return "auto";
            }))
          }
        }, e1);
        if ("columnStartResizing" === t2.type) {
          var i11 = t2.columnId, u15 = o5.visibleColumns.findIndex((function(e2) {
            return e2.id === i11;
          })), l6 = function(e2) {
            var t3, n4 = null == (t3 = document.getElementById("header-cell-" + e2)) ? void 0 : t3.offsetWidth;
            if (void 0 !== n4) return n4;
          }(i11);
          return void 0 !== l6 ? r({}, e1, {
            gridLayout: r({}, e1.gridLayout, {
              columnId: i11,
              columnIndex: u15,
              startingWidth: l6
            })
          }) : e1;
        }
        if ("columnResizing" === t2.type) {
          var s14 = e1.gridLayout, a11 = s14.columnIndex, c10 = s14.startingWidth, d9 = s14.columnWidths, f7 = c10 - (e1.columnResizing.startX - t2.clientX), p7 = [].concat(d9);
          return p7[a11] = f7 + "px", r({}, e1, {
            gridLayout: r({}, e1.gridLayout, {
              columnWidths: p7
            })
          });
        }
      }
      e._UNSTABLE_usePivotColumns = nt, e.actions = l, e.defaultColumn = c, e.defaultGroupByFn = De, 
      e.defaultOrderByFn = Qe, e.defaultRenderer = s, e.emptyRenderer = a, e.ensurePluginOrder = v, 
      e.flexRender = b, e.functionalUpdate = m, e.loopHooks = g, e.makePropGetter = f, 
      e.makeRenderer = R, e.reduceHooks = p, e.safeUseLayoutEffect = y, e.useAbsoluteLayout = Mt, 
      e.useAsyncDebounce = function(e1, n3) {
        void 0 === n3 && (n3 = 0);
        var e2, r2 = t.useRef({}), i12 = h(e1), u16 = h(n3);
        return t.useCallback((e2 = o(regeneratorRuntime.mark((function e3() {
          var t2, n4, l7, s15 = arguments;
          return regeneratorRuntime.wrap((function(e4) {
            for (;;) switch (e4.prev = e4.next) {
             case 0:
              for (t2 = s15.length, n4 = new Array(t2), l7 = 0; l7 < t2; l7++) n4[l7] = s15[l7];
              return r2.current.promise || (r2.current.promise = new Promise((function(e5, t3) {
                r2.current.resolve = e5, r2.current.reject = t3;
              }))), r2.current.timeout && clearTimeout(r2.current.timeout), r2.current.timeout = setTimeout(o(regeneratorRuntime.mark((function e5() {
                return regeneratorRuntime.wrap((function(e6) {
                  for (;;) switch (e6.prev = e6.next) {
                   case 0:
                    return delete r2.current.timeout, e6.prev = 1, e6.t0 = r2.current, e6.next = 5, 
                    i12().apply(void 0, n4);

                   case 5:
                    e6.t1 = e6.sent, e6.t0.resolve.call(e6.t0, e6.t1), e6.next = 12;
                    break;

                   case 9:
                    e6.prev = 9, e6.t2 = e6.catch(1), r2.current.reject(e6.t2);

                   case 12:
                    return e6.prev = 12, delete r2.current.promise, e6.finish(12);

                   case 15:
                   case "end":
                    return e6.stop();
                  }
                }), e5, null, [ [ 1, 9, 12, 15 ] ]);
              }))), u16()), e4.abrupt("return", r2.current.promise);

             case 5:
             case "end":
              return e4.stop();
            }
          }), e3);
        }))), function() {
          return e2.apply(this, arguments);
        }), [ i12, u16 ]);
      }, e.useBlockLayout = Dt, e.useColumnOrder = It, e.useExpanded = se, e.useFilters = Pe, 
      e.useFlexLayout = Vt, e.useGetLatest = h, e.useGlobalFilter = Ie, e.useGridLayout = $t, 
      e.useGroupBy = ze, e.useMountedLayoutEffect = w, e.usePagination = Ze, e.useResizeColumns = kt, 
      e.useRowSelect = vt, e.useRowState = xt, e.useSortBy = Ue, e.useTable = function(e1) {
        for (var n3 = arguments.length, o5 = new Array(n3 > 1 ? n3 - 1 : 0), i12 = 1; i12 < n3; i12++) o5[i12 - 1] = arguments[i12];
        e1 = ie(e1), o5 = [ K ].concat(o5);
        var u16 = t.useRef({}), s15 = h(u16.current);
        Object.assign(s15(), r({}, e1, {
          plugins: o5,
          hooks: q()
        })), o5.filter(Boolean).forEach((function(e2) {
          e2(s15().hooks);
        }));
        var a12 = h(s15().hooks);
        s15().getHooks = a12, delete s15().hooks, Object.assign(s15(), p(a12().useOptions, ie(e1)));
        var c11 = s15(), d10 = c11.data, v6 = c11.columns, m4 = c11.initialState, y5 = c11.defaultColumn, w4 = c11.getSubRows, b4 = c11.getRowId, E2 = c11.stateReducer, I2 = c11.useControlledState, F2 = h(E2), G2 = t.useCallback((function(e2, t2) {
          if (!t2.type) throw console.info({
            action: t2
          }), new Error("Unknown Action 👆");
          return [].concat(a12().stateReducers, Array.isArray(F2()) ? F2() : [ F2() ]).reduce((function(n4, o6) {
            return o6(n4, t2, e2, s15()) || n4;
          }), e2);
        }), [ a12, F2, s15 ]), A1 = t.useReducer(G2, void 0, (function() {
          return G2(m4, {
            type: l.init
          });
        })), k1 = A1[0], H1 = A1[1], T1 = p([].concat(a12().useControlledState, [ I2 ]), k1, {
          instance: s15()
        });
        Object.assign(s15(), {
          state: T1,
          dispatch: H1
        });
        var z1 = t.useMemo((function() {
          return S(p(a12().columns, v6, {
            instance: s15()
          }));
        }), [ a12, s15, v6 ].concat(p(a12().columnsDeps, [], {
          instance: s15()
        })));
        s15().columns = z1;
        var W1 = t.useMemo((function() {
          return p(a12().allColumns, C(z1), {
            instance: s15()
          }).map(x);
        }), [ z1, a12, s15 ].concat(p(a12().allColumnsDeps, [], {
          instance: s15()
        })));
        s15().allColumns = W1;
        var O1 = t.useMemo((function() {
          for (var e2 = [], t2 = [], n4 = {}, o6 = [].concat(W1); o6.length; ) {
            var r2 = o6.shift();
            le({
              data: d10,
              rows: e2,
              flatRows: t2,
              rowsById: n4,
              column: r2,
              getRowId: b4,
              getSubRows: w4,
              accessValueHooks: a12().accessValue,
              getInstance: s15
            });
          }
          return [ e2, t2, n4 ];
        }), [ W1, d10, b4, w4, a12, s15 ]), M1 = O1[0], j1 = O1[1], N1 = O1[2];
        Object.assign(s15(), {
          rows: M1,
          initialRows: [].concat(M1),
          flatRows: j1,
          rowsById: N1
        }), g(a12().useInstanceAfterData, s15());
        var L1 = t.useMemo((function() {
          return p(a12().visibleColumns, W1, {
            instance: s15()
          }).map((function(e2) {
            return P(e2, y5);
          }));
        }), [ a12, W1, s15, y5 ].concat(p(a12().visibleColumnsDeps, [], {
          instance: s15()
        })));
        W1 = t.useMemo((function() {
          var e2 = [].concat(L1);
          return W1.forEach((function(t2) {
            e2.find((function(e3) {
              return e3.id === t2.id;
            })) || e2.push(t2);
          })), e2;
        }), [ W1, L1 ]), s15().allColumns = W1;
        var D1 = t.useMemo((function() {
          return p(a12().headerGroups, B(L1, y5), s15());
        }), [ a12, L1, y5, s15 ].concat(p(a12().headerGroupsDeps, [], {
          instance: s15()
        })));
        s15().headerGroups = D1;
        var V1 = t.useMemo((function() {
          return D1.length ? D1[0].headers : [];
        }), [ D1 ]);
        s15().headers = V1, s15().flatHeaders = D1.reduce((function(e2, t2) {
          return [].concat(e2, t2.headers);
        }), []), g(a12().useInstanceBeforeDimensions, s15());
        var _1 = L1.filter((function(e2) {
          return e2.isVisible;
        })).map((function(e2) {
          return e2.id;
        })).sort().join("_");
        L1 = t.useMemo((function() {
          return L1.filter((function(e2) {
            return e2.isVisible;
          }));
        }), [ L1, _1 ]), s15().visibleColumns = L1;
        var X1 = ue(V1), U1 = X1[0], $1 = X1[1], J1 = X1[2];
        return s15().totalColumnsMinWidth = U1, s15().totalColumnsWidth = $1, s15().totalColumnsMaxWidth = J1, 
        g(a12().useInstance, s15()), [].concat(s15().flatHeaders, s15().allColumns).forEach((function(e2) {
          e2.render = R(s15(), e2), e2.getHeaderProps = f(a12().getHeaderProps, {
            instance: s15(),
            column: e2
          }), e2.getFooterProps = f(a12().getFooterProps, {
            instance: s15(),
            column: e2
          });
        })), s15().headerGroups = t.useMemo((function() {
          return D1.filter((function(e2, t2) {
            return e2.headers = e2.headers.filter((function(e3) {
              return e3.headers ? function e4(t3) {
                return t3.filter((function(t4) {
                  return t4.headers ? e4(t4.headers) : t4.isVisible;
                })).length;
              }(e3.headers) : e3.isVisible;
            })), !!e2.headers.length && (e2.getHeaderGroupProps = f(a12().getHeaderGroupProps, {
              instance: s15(),
              headerGroup: e2,
              index: t2
            }), e2.getFooterGroupProps = f(a12().getFooterGroupProps, {
              instance: s15(),
              headerGroup: e2,
              index: t2
            }), !0);
          }));
        }), [ D1, s15, a12 ]), s15().footerGroups = [].concat(s15().headerGroups).reverse(), 
        s15().prepareRow = t.useCallback((function(e2) {
          e2.getRowProps = f(a12().getRowProps, {
            instance: s15(),
            row: e2
          }), e2.allCells = W1.map((function(t2) {
            var n4 = e2.values[t2.id], o6 = {
              column: t2,
              row: e2,
              value: n4
            };
            return o6.getCellProps = f(a12().getCellProps, {
              instance: s15(),
              cell: o6
            }), o6.render = R(s15(), t2, {
              row: e2,
              cell: o6,
              value: n4
            }), o6;
          })), e2.cells = L1.map((function(t2) {
            return e2.allCells.find((function(e3) {
              return e3.column.id === t2.id;
            }));
          })), g(a12().prepareRow, e2, {
            instance: s15()
          });
        }), [ a12, s15, W1, L1 ]), s15().getTableProps = f(a12().getTableProps, {
          instance: s15()
        }), s15().getTableBodyProps = f(a12().getTableBodyProps, {
          instance: s15()
        }), g(a12().useFinalInstance, s15()), s15();
      }, Object.defineProperty(e, "__esModule", {
        value: !0
      });
    }, "object" == typeof exports && void 0 !== module ? t(exports, require("react")) : "function" == typeof define && define.amd ? define([ "exports", "react" ], t) : t((e = e || self).ReactTable = {}, e.React);
  }, {
    react: "8Nzqg"
  } ],
  dPeP9: [ function(require, module, exports) {
    require("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(exports);
    var _jsxRuntime = require("react/jsx-runtime");
    exports.default = function({gotoPage: gotoPage, previousPage: previousPage, nextPage: nextPage, canNextPage: canNextPage, pageCount: pageCount, pageIndex: pageIndex, pageOptions: pageOptions, pageSize: pageSize, setPageSize: setPageSize, canGotoPage: canGotoPage, canPreviousPage: canPreviousPage}) {
      return _jsxRuntime.jsxs("div", {
        className: "mt-2 flex-row",
        children: [ _jsxRuntime.jsx("button", {
          className: "button",
          onClick: () => gotoPage(0),
          disabled: !canPreviousPage,
          children: "<<"
        }), " ", _jsxRuntime.jsx("button", {
          className: "button ml-4",
          onClick: () => previousPage(),
          disabled: !canPreviousPage,
          children: "<"
        }), " ", _jsxRuntime.jsx("button", {
          className: "button ml-1",
          onClick: () => nextPage(),
          disabled: !canNextPage,
          children: ">"
        }), " ", _jsxRuntime.jsx("button", {
          className: "button ml-4",
          onClick: () => gotoPage(pageCount - 1),
          disabled: !canNextPage,
          children: ">>"
        }), " ", _jsxRuntime.jsxs("span", {
          children: [ "Page", " ", _jsxRuntime.jsxs("strong", {
            children: [ pageIndex + 1, " of ", pageOptions.length ]
          }), " " ]
        }), _jsxRuntime.jsx("select", {
          className: "border border-blue-50",
          value: pageSize,
          onChange: e => {
            setPageSize(Number(e.target.value));
          },
          children: [ 5, 10, 20, 30, 40, 50 ].map((pageSize1 => _jsxRuntime.jsxs("option", {
            value: pageSize1,
            children: [ "Show ", pageSize1 ]
          }, pageSize1)))
        }) ]
      });
    };
  }, {
    "react/jsx-runtime": "aMvgd",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  "4Q3Cm": [ function() {}, {} ],
  "1dVfx": [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "DOMInspector", (() => DOMInspector$1)), 
    parcelHelpers.export(exports, "Inspector", (() => Inspector)), parcelHelpers.export(exports, "ObjectInspector", (() => ObjectInspector$1)), 
    parcelHelpers.export(exports, "ObjectLabel", (() => ObjectLabel)), parcelHelpers.export(exports, "ObjectName", (() => ObjectName)), 
    parcelHelpers.export(exports, "ObjectPreview", (() => ObjectPreview)), parcelHelpers.export(exports, "ObjectRootLabel", (() => ObjectRootLabel)), 
    parcelHelpers.export(exports, "ObjectValue", (() => ObjectValue)), parcelHelpers.export(exports, "TableInspector", (() => TableInspector$1)), 
    parcelHelpers.export(exports, "chromeDark", (() => theme$1)), parcelHelpers.export(exports, "chromeLight", (() => theme));
    var _react = require("react"), _reactDefault = parcelHelpers.interopDefault(_react), _propTypes = require("prop-types"), _propTypesDefault = parcelHelpers.interopDefault(_propTypes), _isDom = require("is-dom"), _isDomDefault = parcelHelpers.interopDefault(_isDom);
    function unwrapExports(x) {
      return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x.default : x;
    }
    function createCommonjsModule(fn, module) {
      return fn(module = {
        exports: {}
      }, module.exports), module.exports;
    }
    var _extends = unwrapExports(createCommonjsModule((function(module) {
      function _extends() {
        return module.exports = _extends = Object.assign || function(target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
          }
          return target;
        }, module.exports.default = module.exports, module.exports.__esModule = !0, _extends.apply(this, arguments);
      }
      module.exports = _extends, module.exports.default = module.exports, module.exports.__esModule = !0;
    }))), objectWithoutPropertiesLoose = createCommonjsModule((function(module) {
      module.exports = function(source, excluded) {
        if (null == source) return {};
        var key, i, target = {}, sourceKeys = Object.keys(source);
        for (i = 0; i < sourceKeys.length; i++) key = sourceKeys[i], excluded.indexOf(key) >= 0 || (target[key] = source[key]);
        return target;
      }, module.exports.default = module.exports, module.exports.__esModule = !0;
    }));
    unwrapExports(objectWithoutPropertiesLoose);
    var _objectWithoutProperties = unwrapExports(createCommonjsModule((function(module) {
      module.exports = function(source, excluded) {
        if (null == source) return {};
        var key, i, target = objectWithoutPropertiesLoose(source, excluded);
        if (Object.getOwnPropertySymbols) {
          var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
          for (i = 0; i < sourceSymbolKeys.length; i++) key = sourceSymbolKeys[i], excluded.indexOf(key) >= 0 || Object.prototype.propertyIsEnumerable.call(source, key) && (target[key] = source[key]);
        }
        return target;
      }, module.exports.default = module.exports, module.exports.__esModule = !0;
    }))), theme$1 = {
      BASE_FONT_FAMILY: "Menlo, monospace",
      BASE_FONT_SIZE: "11px",
      BASE_LINE_HEIGHT: 1.2,
      BASE_BACKGROUND_COLOR: "rgb(36, 36, 36)",
      BASE_COLOR: "rgb(213, 213, 213)",
      OBJECT_PREVIEW_ARRAY_MAX_PROPERTIES: 10,
      OBJECT_PREVIEW_OBJECT_MAX_PROPERTIES: 5,
      OBJECT_NAME_COLOR: "rgb(227, 110, 236)",
      OBJECT_VALUE_NULL_COLOR: "rgb(127, 127, 127)",
      OBJECT_VALUE_UNDEFINED_COLOR: "rgb(127, 127, 127)",
      OBJECT_VALUE_REGEXP_COLOR: "rgb(233, 63, 59)",
      OBJECT_VALUE_STRING_COLOR: "rgb(233, 63, 59)",
      OBJECT_VALUE_SYMBOL_COLOR: "rgb(233, 63, 59)",
      OBJECT_VALUE_NUMBER_COLOR: "hsl(252, 100%, 75%)",
      OBJECT_VALUE_BOOLEAN_COLOR: "hsl(252, 100%, 75%)",
      OBJECT_VALUE_FUNCTION_PREFIX_COLOR: "rgb(85, 106, 242)",
      HTML_TAG_COLOR: "rgb(93, 176, 215)",
      HTML_TAGNAME_COLOR: "rgb(93, 176, 215)",
      HTML_TAGNAME_TEXT_TRANSFORM: "lowercase",
      HTML_ATTRIBUTE_NAME_COLOR: "rgb(155, 187, 220)",
      HTML_ATTRIBUTE_VALUE_COLOR: "rgb(242, 151, 102)",
      HTML_COMMENT_COLOR: "rgb(137, 137, 137)",
      HTML_DOCTYPE_COLOR: "rgb(192, 192, 192)",
      ARROW_COLOR: "rgb(145, 145, 145)",
      ARROW_MARGIN_RIGHT: 3,
      ARROW_FONT_SIZE: 12,
      ARROW_ANIMATION_DURATION: "0",
      TREENODE_FONT_FAMILY: "Menlo, monospace",
      TREENODE_FONT_SIZE: "11px",
      TREENODE_LINE_HEIGHT: 1.2,
      TREENODE_PADDING_LEFT: 12,
      TABLE_BORDER_COLOR: "rgb(85, 85, 85)",
      TABLE_TH_BACKGROUND_COLOR: "rgb(44, 44, 44)",
      TABLE_TH_HOVER_COLOR: "rgb(48, 48, 48)",
      TABLE_SORT_ICON_COLOR: "black",
      TABLE_DATA_BACKGROUND_IMAGE: "linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0) 50%, rgba(51, 139, 255, 0.0980392) 50%, rgba(51, 139, 255, 0.0980392))",
      TABLE_DATA_BACKGROUND_SIZE: "128px 32px"
    }, theme = {
      BASE_FONT_FAMILY: "Menlo, monospace",
      BASE_FONT_SIZE: "11px",
      BASE_LINE_HEIGHT: 1.2,
      BASE_BACKGROUND_COLOR: "white",
      BASE_COLOR: "black",
      OBJECT_PREVIEW_ARRAY_MAX_PROPERTIES: 10,
      OBJECT_PREVIEW_OBJECT_MAX_PROPERTIES: 5,
      OBJECT_NAME_COLOR: "rgb(136, 19, 145)",
      OBJECT_VALUE_NULL_COLOR: "rgb(128, 128, 128)",
      OBJECT_VALUE_UNDEFINED_COLOR: "rgb(128, 128, 128)",
      OBJECT_VALUE_REGEXP_COLOR: "rgb(196, 26, 22)",
      OBJECT_VALUE_STRING_COLOR: "rgb(196, 26, 22)",
      OBJECT_VALUE_SYMBOL_COLOR: "rgb(196, 26, 22)",
      OBJECT_VALUE_NUMBER_COLOR: "rgb(28, 0, 207)",
      OBJECT_VALUE_BOOLEAN_COLOR: "rgb(28, 0, 207)",
      OBJECT_VALUE_FUNCTION_PREFIX_COLOR: "rgb(13, 34, 170)",
      HTML_TAG_COLOR: "rgb(168, 148, 166)",
      HTML_TAGNAME_COLOR: "rgb(136, 18, 128)",
      HTML_TAGNAME_TEXT_TRANSFORM: "lowercase",
      HTML_ATTRIBUTE_NAME_COLOR: "rgb(153, 69, 0)",
      HTML_ATTRIBUTE_VALUE_COLOR: "rgb(26, 26, 166)",
      HTML_COMMENT_COLOR: "rgb(35, 110, 37)",
      HTML_DOCTYPE_COLOR: "rgb(192, 192, 192)",
      ARROW_COLOR: "#6e6e6e",
      ARROW_MARGIN_RIGHT: 3,
      ARROW_FONT_SIZE: 12,
      ARROW_ANIMATION_DURATION: "0",
      TREENODE_FONT_FAMILY: "Menlo, monospace",
      TREENODE_FONT_SIZE: "11px",
      TREENODE_LINE_HEIGHT: 1.2,
      TREENODE_PADDING_LEFT: 12,
      TABLE_BORDER_COLOR: "#aaa",
      TABLE_TH_BACKGROUND_COLOR: "#eee",
      TABLE_TH_HOVER_COLOR: "hsla(0, 0%, 90%, 1)",
      TABLE_SORT_ICON_COLOR: "#6e6e6e",
      TABLE_DATA_BACKGROUND_IMAGE: "linear-gradient(to bottom, white, white 50%, rgb(234, 243, 255) 50%, rgb(234, 243, 255))",
      TABLE_DATA_BACKGROUND_SIZE: "128px 32px"
    }, themes = Object.freeze({
      __proto__: null,
      chromeDark: theme$1,
      chromeLight: theme
    }), arrayWithHoles = createCommonjsModule((function(module) {
      module.exports = function(arr) {
        if (Array.isArray(arr)) return arr;
      }, module.exports.default = module.exports, module.exports.__esModule = !0;
    }));
    unwrapExports(arrayWithHoles);
    var iterableToArrayLimit = createCommonjsModule((function(module) {
      module.exports = function(arr, i) {
        if ("undefined" != typeof Symbol && Symbol.iterator in Object(arr)) {
          var _arr = [], _n = !0, _d = !1, _e = void 0;
          try {
            for (var _s, _i = arr[Symbol.iterator](); !(_n = (_s = _i.next()).done) && (_arr.push(_s.value), 
            !i || _arr.length !== i); _n = !0) ;
          } catch (err) {
            _d = !0, _e = err;
          } finally {
            try {
              _n || null == _i.return || _i.return();
            } finally {
              if (_d) throw _e;
            }
          }
          return _arr;
        }
      }, module.exports.default = module.exports, module.exports.__esModule = !0;
    }));
    unwrapExports(iterableToArrayLimit);
    var arrayLikeToArray = createCommonjsModule((function(module) {
      module.exports = function(arr, len) {
        (null == len || len > arr.length) && (len = arr.length);
        for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
        return arr2;
      }, module.exports.default = module.exports, module.exports.__esModule = !0;
    }));
    unwrapExports(arrayLikeToArray);
    var unsupportedIterableToArray = createCommonjsModule((function(module) {
      module.exports = function(o, minLen) {
        if (o) {
          if ("string" == typeof o) return arrayLikeToArray(o, minLen);
          var n = Object.prototype.toString.call(o).slice(8, -1);
          return "Object" === n && o.constructor && (n = o.constructor.name), "Map" === n || "Set" === n ? Array.from(o) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? arrayLikeToArray(o, minLen) : void 0;
        }
      }, module.exports.default = module.exports, module.exports.__esModule = !0;
    }));
    unwrapExports(unsupportedIterableToArray);
    var nonIterableRest = createCommonjsModule((function(module) {
      module.exports = function() {
        throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }, module.exports.default = module.exports, module.exports.__esModule = !0;
    }));
    unwrapExports(nonIterableRest);
    var _slicedToArray = unwrapExports(createCommonjsModule((function(module) {
      module.exports = function(arr, i) {
        return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || unsupportedIterableToArray(arr, i) || nonIterableRest();
      }, module.exports.default = module.exports, module.exports.__esModule = !0;
    }))), _typeof = unwrapExports(createCommonjsModule((function(module) {
      function _typeof(obj) {
        return "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? (module.exports = _typeof = function(obj1) {
          return typeof obj1;
        }, module.exports.default = module.exports, module.exports.__esModule = !0) : (module.exports = _typeof = function(obj1) {
          return obj1 && "function" == typeof Symbol && obj1.constructor === Symbol && obj1 !== Symbol.prototype ? "symbol" : typeof obj1;
        }, module.exports.default = module.exports, module.exports.__esModule = !0), _typeof(obj);
      }
      module.exports = _typeof, module.exports.default = module.exports, module.exports.__esModule = !0;
    }))), regenerator = createCommonjsModule((function(module) {
      var runtime = function(exports) {
        var Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
        function define(obj, key, value) {
          return Object.defineProperty(obj, key, {
            value: value,
            enumerable: !0,
            configurable: !0,
            writable: !0
          }), obj[key];
        }
        try {
          define({}, "");
        } catch (err) {
          define = function(obj, key, value) {
            return obj[key] = value;
          };
        }
        function wrap(innerFn, outerFn, self, tryLocsList) {
          var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []);
          return generator._invoke = function(innerFn, self, context) {
            var state = "suspendedStart";
            return function(method, arg) {
              if ("executing" === state) throw new Error("Generator is already running");
              if ("completed" === state) {
                if ("throw" === method) throw arg;
                return doneResult();
              }
              for (context.method = method, context.arg = arg; ;) {
                var delegate = context.delegate;
                if (delegate) {
                  var delegateResult = maybeInvokeDelegate(delegate, context);
                  if (delegateResult) {
                    if (delegateResult === ContinueSentinel) continue;
                    return delegateResult;
                  }
                }
                if ("next" === context.method) context.sent = context._sent = context.arg; else if ("throw" === context.method) {
                  if ("suspendedStart" === state) throw state = "completed", context.arg;
                  context.dispatchException(context.arg);
                } else "return" === context.method && context.abrupt("return", context.arg);
                state = "executing";
                var record = tryCatch(innerFn, self, context);
                if ("normal" === record.type) {
                  if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
                  return {
                    value: record.arg,
                    done: context.done
                  };
                }
                "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
              }
            };
          }(innerFn, self, context), generator;
        }
        function tryCatch(fn, obj, arg) {
          try {
            return {
              type: "normal",
              arg: fn.call(obj, arg)
            };
          } catch (err) {
            return {
              type: "throw",
              arg: err
            };
          }
        }
        exports.wrap = wrap;
        var ContinueSentinel = {};
        function Generator() {}
        function GeneratorFunction() {}
        function GeneratorFunctionPrototype() {}
        var IteratorPrototype = {};
        IteratorPrototype[iteratorSymbol] = function() {
          return this;
        };
        var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([])));
        NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
        var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
        function defineIteratorMethods(prototype) {
          [ "next", "throw", "return" ].forEach((function(method) {
            define(prototype, method, (function(arg) {
              return this._invoke(method, arg);
            }));
          }));
        }
        function AsyncIterator(generator, PromiseImpl) {
          function invoke(method, arg, resolve, reject) {
            var record = tryCatch(generator[method], generator, arg);
            if ("throw" !== record.type) {
              var result = record.arg, value = result.value;
              return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then((function(value1) {
                invoke("next", value1, resolve, reject);
              }), (function(err) {
                invoke("throw", err, resolve, reject);
              })) : PromiseImpl.resolve(value).then((function(unwrapped) {
                result.value = unwrapped, resolve(result);
              }), (function(error) {
                return invoke("throw", error, resolve, reject);
              }));
            }
            reject(record.arg);
          }
          var previousPromise;
          this._invoke = function(method, arg) {
            function callInvokeWithMethodAndArg() {
              return new PromiseImpl((function(resolve, reject) {
                invoke(method, arg, resolve, reject);
              }));
            }
            return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
          };
        }
        function maybeInvokeDelegate(delegate, context) {
          var method = delegate.iterator[context.method];
          if (undefined === method) {
            if (context.delegate = null, "throw" === context.method) {
              if (delegate.iterator.return && (context.method = "return", context.arg = undefined, 
              maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel;
              context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method");
            }
            return ContinueSentinel;
          }
          var record = tryCatch(method, delegate.iterator, context.arg);
          if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, 
          context.delegate = null, ContinueSentinel;
          var info = record.arg;
          return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, 
          "return" !== context.method && (context.method = "next", context.arg = undefined), 
          context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), 
          context.delegate = null, ContinueSentinel);
        }
        function pushTryEntry(locs) {
          var entry = {
            tryLoc: locs[0]
          };
          1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], 
          entry.afterLoc = locs[3]), this.tryEntries.push(entry);
        }
        function resetTryEntry(entry) {
          var record = entry.completion || {};
          record.type = "normal", delete record.arg, entry.completion = record;
        }
        function Context(tryLocsList) {
          this.tryEntries = [ {
            tryLoc: "root"
          } ], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
        }
        function values(iterable) {
          if (iterable) {
            var iteratorMethod = iterable[iteratorSymbol];
            if (iteratorMethod) return iteratorMethod.call(iterable);
            if ("function" == typeof iterable.next) return iterable;
            if (!isNaN(iterable.length)) {
              var i = -1, next = function next1() {
                for (;++i < iterable.length; ) if (hasOwn.call(iterable, i)) return next1.value = iterable[i], 
                next1.done = !1, next1;
                return next1.value = undefined, next1.done = !0, next1;
              };
              return next.next = next;
            }
          }
          return {
            next: doneResult
          };
        }
        function doneResult() {
          return {
            value: undefined,
            done: !0
          };
        }
        return GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype, 
        GeneratorFunctionPrototype.constructor = GeneratorFunction, GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), 
        exports.isGeneratorFunction = function(genFun) {
          var ctor = "function" == typeof genFun && genFun.constructor;
          return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
        }, exports.mark = function(genFun) {
          return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, 
          define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), 
          genFun;
        }, exports.awrap = function(arg) {
          return {
            __await: arg
          };
        }, defineIteratorMethods(AsyncIterator.prototype), AsyncIterator.prototype[asyncIteratorSymbol] = function() {
          return this;
        }, exports.AsyncIterator = AsyncIterator, exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
          void 0 === PromiseImpl && (PromiseImpl = Promise);
          var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
          return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then((function(result) {
            return result.done ? result.value : iter.next();
          }));
        }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), Gp[iteratorSymbol] = function() {
          return this;
        }, Gp.toString = function() {
          return "[object Generator]";
        }, exports.keys = function(object) {
          var keys = [];
          for (var key in object) keys.push(key);
          return keys.reverse(), function next() {
            for (;keys.length; ) {
              var key1 = keys.pop();
              if (key1 in object) return next.value = key1, next.done = !1, next;
            }
            return next.done = !0, next;
          };
        }, exports.values = values, Context.prototype = {
          constructor: Context,
          reset: function(skipTempReset) {
            if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, 
            this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), 
            !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
          },
          stop: function() {
            this.done = !0;
            var rootRecord = this.tryEntries[0].completion;
            if ("throw" === rootRecord.type) throw rootRecord.arg;
            return this.rval;
          },
          dispatchException: function(exception) {
            if (this.done) throw exception;
            var context = this;
            function handle(loc, caught) {
              return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", 
              context.arg = undefined), !!caught;
            }
            for (var i = this.tryEntries.length - 1; i >= 0; --i) {
              var entry = this.tryEntries[i], record = entry.completion;
              if ("root" === entry.tryLoc) return handle("end");
              if (entry.tryLoc <= this.prev) {
                var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc");
                if (hasCatch && hasFinally) {
                  if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
                  if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
                } else if (hasCatch) {
                  if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
                } else {
                  if (!hasFinally) throw new Error("try statement without catch or finally");
                  if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
                }
              }
            }
          },
          abrupt: function(type, arg) {
            for (var i = this.tryEntries.length - 1; i >= 0; --i) {
              var entry = this.tryEntries[i];
              if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
                var finallyEntry = entry;
                break;
              }
            }
            finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
            var record = finallyEntry ? finallyEntry.completion : {};
            return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", 
            this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
          },
          complete: function(record, afterLoc) {
            if ("throw" === record.type) throw record.arg;
            return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, 
            this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), 
            ContinueSentinel;
          },
          finish: function(finallyLoc) {
            for (var i = this.tryEntries.length - 1; i >= 0; --i) {
              var entry = this.tryEntries[i];
              if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), 
              resetTryEntry(entry), ContinueSentinel;
            }
          },
          catch: function(tryLoc) {
            for (var i = this.tryEntries.length - 1; i >= 0; --i) {
              var entry = this.tryEntries[i];
              if (entry.tryLoc === tryLoc) {
                var record = entry.completion;
                if ("throw" === record.type) {
                  var thrown = record.arg;
                  resetTryEntry(entry);
                }
                return thrown;
              }
            }
            throw new Error("illegal catch attempt");
          },
          delegateYield: function(iterable, resultName, nextLoc) {
            return this.delegate = {
              iterator: values(iterable),
              resultName: resultName,
              nextLoc: nextLoc
            }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
          }
        }, exports;
      }(module.exports);
      try {
        regeneratorRuntime = runtime;
      } catch (accidentalStrictMode) {
        Function("r", "regeneratorRuntime = r")(runtime);
      }
    })), arrayWithoutHoles = createCommonjsModule((function(module) {
      module.exports = function(arr) {
        if (Array.isArray(arr)) return arrayLikeToArray(arr);
      }, module.exports.default = module.exports, module.exports.__esModule = !0;
    }));
    unwrapExports(arrayWithoutHoles);
    var iterableToArray = createCommonjsModule((function(module) {
      module.exports = function(iter) {
        if ("undefined" != typeof Symbol && Symbol.iterator in Object(iter)) return Array.from(iter);
      }, module.exports.default = module.exports, module.exports.__esModule = !0;
    }));
    unwrapExports(iterableToArray);
    var nonIterableSpread = createCommonjsModule((function(module) {
      module.exports = function() {
        throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }, module.exports.default = module.exports, module.exports.__esModule = !0;
    }));
    unwrapExports(nonIterableSpread);
    var _toConsumableArray = unwrapExports(createCommonjsModule((function(module) {
      module.exports = function(arr) {
        return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
      }, module.exports.default = module.exports, module.exports.__esModule = !0;
    }))), _defineProperty = unwrapExports(createCommonjsModule((function(module) {
      module.exports = function(obj, key2, value) {
        return key2 in obj ? Object.defineProperty(obj, key2, {
          value: value,
          enumerable: !0,
          configurable: !0,
          writable: !0
        }) : obj[key2] = value, obj;
      }, module.exports.default = module.exports, module.exports.__esModule = !0;
    }))), ExpandedPathsContext = _react.createContext([ {}, function() {} ]), unselectable = {
      WebkitTouchCallout: "none",
      WebkitUserSelect: "none",
      KhtmlUserSelect: "none",
      MozUserSelect: "none",
      msUserSelect: "none",
      OUserSelect: "none",
      userSelect: "none"
    };
    function ownKeys$7(object, enumerableOnly) {
      var keys = Object.keys(object);
      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        enumerableOnly && (symbols = symbols.filter((function(sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        }))), keys.push.apply(keys, symbols);
      }
      return keys;
    }
    function _objectSpread$7(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = null != arguments[i] ? arguments[i] : {};
        i % 2 ? ownKeys$7(Object(source), !0).forEach((function(key2) {
          _defineProperty(target, key2, source[key2]);
        })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$7(Object(source)).forEach((function(key2) {
          Object.defineProperty(target, key2, Object.getOwnPropertyDescriptor(source, key2));
        }));
      }
      return target;
    }
    var base = function(theme1) {
      return {
        DOMNodePreview: {
          htmlOpenTag: {
            base: {
              color: theme1.HTML_TAG_COLOR
            },
            tagName: {
              color: theme1.HTML_TAGNAME_COLOR,
              textTransform: theme1.HTML_TAGNAME_TEXT_TRANSFORM
            },
            htmlAttributeName: {
              color: theme1.HTML_ATTRIBUTE_NAME_COLOR
            },
            htmlAttributeValue: {
              color: theme1.HTML_ATTRIBUTE_VALUE_COLOR
            }
          },
          htmlCloseTag: {
            base: {
              color: theme1.HTML_TAG_COLOR
            },
            offsetLeft: {
              marginLeft: -theme1.TREENODE_PADDING_LEFT
            },
            tagName: {
              color: theme1.HTML_TAGNAME_COLOR,
              textTransform: theme1.HTML_TAGNAME_TEXT_TRANSFORM
            }
          },
          htmlComment: {
            color: theme1.HTML_COMMENT_COLOR
          },
          htmlDoctype: {
            color: theme1.HTML_DOCTYPE_COLOR
          }
        },
        ObjectPreview: {
          objectDescription: {
            fontStyle: "italic"
          },
          preview: {
            fontStyle: "italic"
          },
          arrayMaxProperties: theme1.OBJECT_PREVIEW_ARRAY_MAX_PROPERTIES,
          objectMaxProperties: theme1.OBJECT_PREVIEW_OBJECT_MAX_PROPERTIES
        },
        ObjectName: {
          base: {
            color: theme1.OBJECT_NAME_COLOR
          },
          dimmed: {
            opacity: .6
          }
        },
        ObjectValue: {
          objectValueNull: {
            color: theme1.OBJECT_VALUE_NULL_COLOR
          },
          objectValueUndefined: {
            color: theme1.OBJECT_VALUE_UNDEFINED_COLOR
          },
          objectValueRegExp: {
            color: theme1.OBJECT_VALUE_REGEXP_COLOR
          },
          objectValueString: {
            color: theme1.OBJECT_VALUE_STRING_COLOR
          },
          objectValueSymbol: {
            color: theme1.OBJECT_VALUE_SYMBOL_COLOR
          },
          objectValueNumber: {
            color: theme1.OBJECT_VALUE_NUMBER_COLOR
          },
          objectValueBoolean: {
            color: theme1.OBJECT_VALUE_BOOLEAN_COLOR
          },
          objectValueFunctionPrefix: {
            color: theme1.OBJECT_VALUE_FUNCTION_PREFIX_COLOR,
            fontStyle: "italic"
          },
          objectValueFunctionName: {
            fontStyle: "italic"
          }
        },
        TreeView: {
          treeViewOutline: {
            padding: 0,
            margin: 0,
            listStyleType: "none"
          }
        },
        TreeNode: {
          treeNodeBase: {
            color: theme1.BASE_COLOR,
            backgroundColor: theme1.BASE_BACKGROUND_COLOR,
            lineHeight: theme1.TREENODE_LINE_HEIGHT,
            cursor: "default",
            boxSizing: "border-box",
            listStyle: "none",
            fontFamily: theme1.TREENODE_FONT_FAMILY,
            fontSize: theme1.TREENODE_FONT_SIZE
          },
          treeNodePreviewContainer: {},
          treeNodePlaceholder: _objectSpread$7({
            whiteSpace: "pre",
            fontSize: theme1.ARROW_FONT_SIZE,
            marginRight: theme1.ARROW_MARGIN_RIGHT
          }, unselectable),
          treeNodeArrow: {
            base: _objectSpread$7(_objectSpread$7({
              color: theme1.ARROW_COLOR,
              display: "inline-block",
              fontSize: theme1.ARROW_FONT_SIZE,
              marginRight: theme1.ARROW_MARGIN_RIGHT
            }, parseFloat(theme1.ARROW_ANIMATION_DURATION) > 0 ? {
              transition: "transform ".concat(theme1.ARROW_ANIMATION_DURATION, " ease 0s")
            } : {}), unselectable),
            expanded: {
              WebkitTransform: "rotateZ(90deg)",
              MozTransform: "rotateZ(90deg)",
              transform: "rotateZ(90deg)"
            },
            collapsed: {
              WebkitTransform: "rotateZ(0deg)",
              MozTransform: "rotateZ(0deg)",
              transform: "rotateZ(0deg)"
            }
          },
          treeNodeChildNodesContainer: {
            margin: 0,
            paddingLeft: theme1.TREENODE_PADDING_LEFT
          }
        },
        TableInspector: {
          base: {
            color: theme1.BASE_COLOR,
            position: "relative",
            border: "1px solid ".concat(theme1.TABLE_BORDER_COLOR),
            fontFamily: theme1.BASE_FONT_FAMILY,
            fontSize: theme1.BASE_FONT_SIZE,
            lineHeight: "120%",
            boxSizing: "border-box",
            cursor: "default"
          }
        },
        TableInspectorHeaderContainer: {
          base: {
            top: 0,
            height: "17px",
            left: 0,
            right: 0,
            overflowX: "hidden"
          },
          table: {
            tableLayout: "fixed",
            borderSpacing: 0,
            borderCollapse: "separate",
            height: "100%",
            width: "100%",
            margin: 0
          }
        },
        TableInspectorDataContainer: {
          tr: {
            display: "table-row"
          },
          td: {
            boxSizing: "border-box",
            border: "none",
            height: "16px",
            verticalAlign: "top",
            padding: "1px 4px",
            WebkitUserSelect: "text",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",
            lineHeight: "14px"
          },
          div: {
            position: "static",
            top: "17px",
            bottom: 0,
            overflowY: "overlay",
            transform: "translateZ(0)",
            left: 0,
            right: 0,
            overflowX: "hidden"
          },
          table: {
            positon: "static",
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            borderTop: "0 none transparent",
            margin: 0,
            backgroundImage: theme1.TABLE_DATA_BACKGROUND_IMAGE,
            backgroundSize: theme1.TABLE_DATA_BACKGROUND_SIZE,
            tableLayout: "fixed",
            borderSpacing: 0,
            borderCollapse: "separate",
            width: "100%",
            fontSize: theme1.BASE_FONT_SIZE,
            lineHeight: "120%"
          }
        },
        TableInspectorTH: {
          base: {
            position: "relative",
            height: "auto",
            textAlign: "left",
            backgroundColor: theme1.TABLE_TH_BACKGROUND_COLOR,
            borderBottom: "1px solid ".concat(theme1.TABLE_BORDER_COLOR),
            fontWeight: "normal",
            verticalAlign: "middle",
            padding: "0 4px",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",
            lineHeight: "14px",
            ":hover": {
              backgroundColor: theme1.TABLE_TH_HOVER_COLOR
            }
          },
          div: {
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",
            fontSize: theme1.BASE_FONT_SIZE,
            lineHeight: "120%"
          }
        },
        TableInspectorLeftBorder: {
          none: {
            borderLeft: "none"
          },
          solid: {
            borderLeft: "1px solid ".concat(theme1.TABLE_BORDER_COLOR)
          }
        },
        TableInspectorSortIcon: _objectSpread$7({
          display: "block",
          marginRight: 3,
          width: 8,
          height: 7,
          marginTop: -7,
          color: theme1.TABLE_SORT_ICON_COLOR,
          fontSize: 12
        }, unselectable)
      };
    }, ThemeContext = _react.createContext(base(themes.chromeLight)), useStyles = function(baseStylesKey) {
      return _react.useContext(ThemeContext)[baseStylesKey];
    }, themeAcceptor = function(WrappedComponent) {
      var ThemeAcceptor = function(_ref) {
        var _ref$theme = _ref.theme, theme1 = void 0 === _ref$theme ? "chromeLight" : _ref$theme, restProps = _objectWithoutProperties(_ref, [ "theme" ]), themeStyles = _react.useMemo((function() {
          switch (Object.prototype.toString.call(theme1)) {
           case "[object String]":
            return base(themes[theme1]);

           case "[object Object]":
            return base(theme1);

           default:
            return base(themes.chromeLight);
          }
        }), [ theme1 ]);
        return _reactDefault.default.createElement(ThemeContext.Provider, {
          value: themeStyles
        }, _reactDefault.default.createElement(WrappedComponent, restProps));
      };
      return ThemeAcceptor.propTypes = {
        theme: _propTypesDefault.default.oneOfType([ _propTypesDefault.default.string, _propTypesDefault.default.object ])
      }, ThemeAcceptor;
    };
    function ownKeys$6(object, enumerableOnly) {
      var keys = Object.keys(object);
      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        enumerableOnly && (symbols = symbols.filter((function(sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        }))), keys.push.apply(keys, symbols);
      }
      return keys;
    }
    function _objectSpread$6(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = null != arguments[i] ? arguments[i] : {};
        i % 2 ? ownKeys$6(Object(source), !0).forEach((function(key2) {
          _defineProperty(target, key2, source[key2]);
        })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$6(Object(source)).forEach((function(key2) {
          Object.defineProperty(target, key2, Object.getOwnPropertyDescriptor(source, key2));
        }));
      }
      return target;
    }
    var Arrow = function(_ref) {
      var expanded = _ref.expanded, styles = _ref.styles;
      return _reactDefault.default.createElement("span", {
        style: _objectSpread$6(_objectSpread$6({}, styles.base), expanded ? styles.expanded : styles.collapsed)
      }, "▶");
    }, TreeNode = _react.memo((function(props) {
      var _props = props = _objectSpread$6({
        expanded: !0,
        nodeRenderer: function(_ref2) {
          var name = _ref2.name;
          return _reactDefault.default.createElement("span", null, name);
        },
        onClick: function() {},
        shouldShowArrow: !1,
        shouldShowPlaceholder: !0
      }, props), expanded = _props.expanded, onClick = _props.onClick, children = _props.children, nodeRenderer = _props.nodeRenderer, title = _props.title, shouldShowArrow = _props.shouldShowArrow, shouldShowPlaceholder = _props.shouldShowPlaceholder, styles = useStyles("TreeNode"), NodeRenderer = nodeRenderer;
      return _reactDefault.default.createElement("li", {
        "aria-expanded": expanded,
        role: "treeitem",
        style: styles.treeNodeBase,
        title: title
      }, _reactDefault.default.createElement("div", {
        style: styles.treeNodePreviewContainer,
        onClick: onClick
      }, shouldShowArrow || _react.Children.count(children) > 0 ? _reactDefault.default.createElement(Arrow, {
        expanded: expanded,
        styles: styles.treeNodeArrow
      }) : shouldShowPlaceholder && _reactDefault.default.createElement("span", {
        style: styles.treeNodePlaceholder
      }, " "), _reactDefault.default.createElement(NodeRenderer, props)), _reactDefault.default.createElement("ol", {
        role: "group",
        style: styles.treeNodeChildNodesContainer
      }, expanded ? children : void 0));
    }));
    function ownKeys$5(object, enumerableOnly) {
      var keys = Object.keys(object);
      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        enumerableOnly && (symbols = symbols.filter((function(sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        }))), keys.push.apply(keys, symbols);
      }
      return keys;
    }
    function _createForOfIteratorHelper$1(o, allowArrayLike) {
      var it;
      if ("undefined" == typeof Symbol || null == o[Symbol.iterator]) {
        if (Array.isArray(o) || (it = function(o, minLen) {
          if (!o) return;
          if ("string" == typeof o) return _arrayLikeToArray$1(o, minLen);
          var n = Object.prototype.toString.call(o).slice(8, -1);
          "Object" === n && o.constructor && (n = o.constructor.name);
          if ("Map" === n || "Set" === n) return Array.from(o);
          if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen);
        }(o)) || allowArrayLike && o && "number" == typeof o.length) {
          it && (o = it);
          var i = 0, F = function() {};
          return {
            s: F,
            n: function() {
              return i >= o.length ? {
                done: !0
              } : {
                done: !1,
                value: o[i++]
              };
            },
            e: function(_e) {
              throw _e;
            },
            f: F
          };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
      var err, normalCompletion = !0, didErr = !1;
      return {
        s: function() {
          it = o[Symbol.iterator]();
        },
        n: function() {
          var step = it.next();
          return normalCompletion = step.done, step;
        },
        e: function(_e2) {
          didErr = !0, err = _e2;
        },
        f: function() {
          try {
            normalCompletion || null == it.return || it.return();
          } finally {
            if (didErr) throw err;
          }
        }
      };
    }
    function _arrayLikeToArray$1(arr, len) {
      (null == len || len > arr.length) && (len = arr.length);
      for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
      return arr2;
    }
    TreeNode.propTypes = {
      name: _propTypesDefault.default.string,
      data: _propTypesDefault.default.any,
      expanded: _propTypesDefault.default.bool,
      shouldShowArrow: _propTypesDefault.default.bool,
      shouldShowPlaceholder: _propTypesDefault.default.bool,
      nodeRenderer: _propTypesDefault.default.func,
      onClick: _propTypesDefault.default.func
    };
    var DEFAULT_ROOT_PATH = "$";
    function hasChildNodes(data, dataIterator) {
      return !dataIterator(data).next().done;
    }
    var getExpandedPaths = function(data, dataIterator, expandPaths, expandLevel, prevExpandedPaths) {
      var level, wildcardPaths = [].concat((level = expandLevel, Array.from({
        length: level
      }, (function(_, i) {
        return [ DEFAULT_ROOT_PATH ].concat(Array.from({
          length: i
        }, (function() {
          return "*";
        }))).join(".");
      })))).concat(expandPaths).filter((function(path) {
        return "string" == typeof path;
      })), expandedPaths = [];
      return wildcardPaths.forEach((function(wildcardPath) {
        var keyPaths = wildcardPath.split(".");
        !function populatePaths1(curData, curPath, depth) {
          if (depth !== keyPaths.length) {
            var key2 = keyPaths[depth];
            if (0 === depth) !hasChildNodes(curData, dataIterator) || key2 !== DEFAULT_ROOT_PATH && "*" !== key2 || populatePaths1(curData, DEFAULT_ROOT_PATH, depth + 1); else if ("*" === key2) {
              var _step, _iterator = _createForOfIteratorHelper$1(dataIterator(curData));
              try {
                for (_iterator.s(); !(_step = _iterator.n()).done; ) {
                  var _step$value = _step.value, name = _step$value.name, _data = _step$value.data;
                  hasChildNodes(_data, dataIterator) && populatePaths1(_data, "".concat(curPath, ".").concat(name), depth + 1);
                }
              } catch (err) {
                _iterator.e(err);
              } finally {
                _iterator.f();
              }
            } else {
              var value = curData[key2];
              hasChildNodes(value, dataIterator) && populatePaths1(value, "".concat(curPath, ".").concat(key2), depth + 1);
            }
          } else expandedPaths.push(curPath);
        }(data, "", 0);
      })), expandedPaths.reduce((function(obj, path) {
        return obj[path] = !0, obj;
      }), function(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = null != arguments[i] ? arguments[i] : {};
          i % 2 ? ownKeys$5(Object(source), !0).forEach((function(key2) {
            _defineProperty(target, key2, source[key2]);
          })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$5(Object(source)).forEach((function(key2) {
            Object.defineProperty(target, key2, Object.getOwnPropertyDescriptor(source, key2));
          }));
        }
        return target;
      }({}, prevExpandedPaths));
    };
    function ownKeys$4(object, enumerableOnly) {
      var keys = Object.keys(object);
      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        enumerableOnly && (symbols = symbols.filter((function(sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        }))), keys.push.apply(keys, symbols);
      }
      return keys;
    }
    function _objectSpread$4(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = null != arguments[i] ? arguments[i] : {};
        i % 2 ? ownKeys$4(Object(source), !0).forEach((function(key2) {
          _defineProperty(target, key2, source[key2]);
        })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$4(Object(source)).forEach((function(key2) {
          Object.defineProperty(target, key2, Object.getOwnPropertyDescriptor(source, key2));
        }));
      }
      return target;
    }
    var ConnectedTreeNode = _react.memo((function(props) {
      var data = props.data, dataIterator = props.dataIterator, path = props.path, depth = props.depth, nodeRenderer = props.nodeRenderer, _useContext = _react.useContext(ExpandedPathsContext), _useContext2 = _slicedToArray(_useContext, 2), expandedPaths = _useContext2[0], setExpandedPaths = _useContext2[1], nodeHasChildNodes = hasChildNodes(data, dataIterator), expanded = !!expandedPaths[path], handleClick = _react.useCallback((function() {
        return nodeHasChildNodes && setExpandedPaths((function(prevExpandedPaths) {
          return _objectSpread$4(_objectSpread$4({}, prevExpandedPaths), {}, _defineProperty({}, path, !expanded));
        }));
      }), [ nodeHasChildNodes, setExpandedPaths, path, expanded ]);
      return _reactDefault.default.createElement(TreeNode, _extends({
        expanded: expanded,
        onClick: handleClick,
        shouldShowArrow: nodeHasChildNodes,
        shouldShowPlaceholder: depth > 0,
        nodeRenderer: nodeRenderer
      }, props), expanded ? _toConsumableArray(dataIterator(data)).map((function(_ref) {
        var name = _ref.name, data1 = _ref.data, renderNodeProps = _objectWithoutProperties(_ref, [ "name", "data" ]);
        return _reactDefault.default.createElement(ConnectedTreeNode, _extends({
          name: name,
          data: data1,
          depth: depth + 1,
          path: "".concat(path, ".").concat(name),
          key: name,
          dataIterator: dataIterator,
          nodeRenderer: nodeRenderer
        }, renderNodeProps));
      })) : null);
    }));
    ConnectedTreeNode.propTypes = {
      name: _propTypesDefault.default.string,
      data: _propTypesDefault.default.any,
      dataIterator: _propTypesDefault.default.func,
      depth: _propTypesDefault.default.number,
      expanded: _propTypesDefault.default.bool,
      nodeRenderer: _propTypesDefault.default.func
    };
    var TreeView = _react.memo((function(_ref2) {
      var name = _ref2.name, data = _ref2.data, dataIterator = _ref2.dataIterator, nodeRenderer = _ref2.nodeRenderer, expandPaths = _ref2.expandPaths, expandLevel = _ref2.expandLevel, styles = useStyles("TreeView"), stateAndSetter = _react.useState({}), setExpandedPaths = _slicedToArray(stateAndSetter, 2)[1];
      return _react.useLayoutEffect((function() {
        return setExpandedPaths((function(prevExpandedPaths) {
          return getExpandedPaths(data, dataIterator, expandPaths, expandLevel, prevExpandedPaths);
        }));
      }), [ data, dataIterator, expandPaths, expandLevel ]), _reactDefault.default.createElement(ExpandedPathsContext.Provider, {
        value: stateAndSetter
      }, _reactDefault.default.createElement("ol", {
        role: "tree",
        style: styles.treeViewOutline
      }, _reactDefault.default.createElement(ConnectedTreeNode, {
        name: name,
        data: data,
        dataIterator: dataIterator,
        depth: 0,
        path: DEFAULT_ROOT_PATH,
        nodeRenderer: nodeRenderer
      })));
    }));
    function ownKeys$3(object, enumerableOnly) {
      var keys = Object.keys(object);
      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        enumerableOnly && (symbols = symbols.filter((function(sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        }))), keys.push.apply(keys, symbols);
      }
      return keys;
    }
    function _objectSpread$3(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = null != arguments[i] ? arguments[i] : {};
        i % 2 ? ownKeys$3(Object(source), !0).forEach((function(key2) {
          _defineProperty(target, key2, source[key2]);
        })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$3(Object(source)).forEach((function(key2) {
          Object.defineProperty(target, key2, Object.getOwnPropertyDescriptor(source, key2));
        }));
      }
      return target;
    }
    TreeView.propTypes = {
      name: _propTypesDefault.default.string,
      data: _propTypesDefault.default.any,
      dataIterator: _propTypesDefault.default.func,
      nodeRenderer: _propTypesDefault.default.func,
      expandPaths: _propTypesDefault.default.oneOfType([ _propTypesDefault.default.string, _propTypesDefault.default.array ]),
      expandLevel: _propTypesDefault.default.number
    };
    var ObjectName = function(_ref) {
      var name = _ref.name, _ref$dimmed = _ref.dimmed, dimmed = void 0 !== _ref$dimmed && _ref$dimmed, _ref$styles = _ref.styles, styles = void 0 === _ref$styles ? {} : _ref$styles, themeStyles = useStyles("ObjectName"), appliedStyles = _objectSpread$3(_objectSpread$3(_objectSpread$3({}, themeStyles.base), dimmed ? themeStyles.dimmed : {}), styles);
      return _reactDefault.default.createElement("span", {
        style: appliedStyles
      }, name);
    };
    function ownKeys$2(object, enumerableOnly) {
      var keys = Object.keys(object);
      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        enumerableOnly && (symbols = symbols.filter((function(sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        }))), keys.push.apply(keys, symbols);
      }
      return keys;
    }
    function _objectSpread$2(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = null != arguments[i] ? arguments[i] : {};
        i % 2 ? ownKeys$2(Object(source), !0).forEach((function(key2) {
          _defineProperty(target, key2, source[key2]);
        })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$2(Object(source)).forEach((function(key2) {
          Object.defineProperty(target, key2, Object.getOwnPropertyDescriptor(source, key2));
        }));
      }
      return target;
    }
    ObjectName.propTypes = {
      name: _propTypesDefault.default.string,
      dimmed: _propTypesDefault.default.bool
    };
    var ObjectValue = function(_ref) {
      var object = _ref.object, styles = _ref.styles, themeStyles = useStyles("ObjectValue"), mkStyle = function(key2) {
        return _objectSpread$2(_objectSpread$2({}, themeStyles[key2]), styles);
      };
      switch (_typeof(object)) {
       case "bigint":
        return _reactDefault.default.createElement("span", {
          style: mkStyle("objectValueNumber")
        }, String(object), "n");

       case "number":
        return _reactDefault.default.createElement("span", {
          style: mkStyle("objectValueNumber")
        }, String(object));

       case "string":
        return _reactDefault.default.createElement("span", {
          style: mkStyle("objectValueString")
        }, '"', object, '"');

       case "boolean":
        return _reactDefault.default.createElement("span", {
          style: mkStyle("objectValueBoolean")
        }, String(object));

       case "undefined":
        return _reactDefault.default.createElement("span", {
          style: mkStyle("objectValueUndefined")
        }, "undefined");

       case "object":
        return null === object ? _reactDefault.default.createElement("span", {
          style: mkStyle("objectValueNull")
        }, "null") : object instanceof Date ? _reactDefault.default.createElement("span", null, object.toString()) : object instanceof RegExp ? _reactDefault.default.createElement("span", {
          style: mkStyle("objectValueRegExp")
        }, object.toString()) : Array.isArray(object) ? _reactDefault.default.createElement("span", null, "Array(".concat(object.length, ")")) : object.constructor ? "function" == typeof object.constructor.isBuffer && object.constructor.isBuffer(object) ? _reactDefault.default.createElement("span", null, "Buffer[".concat(object.length, "]")) : _reactDefault.default.createElement("span", null, object.constructor.name) : _reactDefault.default.createElement("span", null, "Object");

       case "function":
        return _reactDefault.default.createElement("span", null, _reactDefault.default.createElement("span", {
          style: mkStyle("objectValueFunctionPrefix")
        }, "ƒ "), _reactDefault.default.createElement("span", {
          style: mkStyle("objectValueFunctionName")
        }, object.name, "()"));

       case "symbol":
        return _reactDefault.default.createElement("span", {
          style: mkStyle("objectValueSymbol")
        }, object.toString());

       default:
        return _reactDefault.default.createElement("span", null);
      }
    };
    ObjectValue.propTypes = {
      object: _propTypesDefault.default.any
    };
    var hasOwnProperty = Object.prototype.hasOwnProperty, propertyIsEnumerable = Object.prototype.propertyIsEnumerable;
    function getPropertyValue(object, propertyName) {
      var propertyDescriptor = Object.getOwnPropertyDescriptor(object, propertyName);
      if (propertyDescriptor.get) try {
        return propertyDescriptor.get();
      } catch (_unused) {
        return propertyDescriptor.get;
      }
      return object[propertyName];
    }
    function intersperse(arr, sep) {
      return 0 === arr.length ? [] : arr.slice(1).reduce((function(xs, x) {
        return xs.concat([ sep, x ]);
      }), [ arr[0] ]);
    }
    var ObjectPreview = function(_ref) {
      var data = _ref.data, styles = useStyles("ObjectPreview"), object = data;
      if ("object" !== _typeof(object) || null === object || object instanceof Date || object instanceof RegExp) return _reactDefault.default.createElement(ObjectValue, {
        object: object
      });
      if (Array.isArray(object)) {
        var maxProperties = styles.arrayMaxProperties, previewArray = object.slice(0, maxProperties).map((function(element, index) {
          return _reactDefault.default.createElement(ObjectValue, {
            key: index,
            object: element
          });
        }));
        object.length > maxProperties && previewArray.push(_reactDefault.default.createElement("span", {
          key: "ellipsis"
        }, "…"));
        var arrayLength = object.length;
        return _reactDefault.default.createElement(_reactDefault.default.Fragment, null, _reactDefault.default.createElement("span", {
          style: styles.objectDescription
        }, 0 === arrayLength ? "" : "(".concat(arrayLength, ") ")), _reactDefault.default.createElement("span", {
          style: styles.preview
        }, "[", intersperse(previewArray, ", "), "]"));
      }
      var _maxProperties = styles.objectMaxProperties, propertyNodes = [];
      for (var propertyName in object) if (hasOwnProperty.call(object, propertyName)) {
        var ellipsis = void 0;
        propertyNodes.length === _maxProperties - 1 && Object.keys(object).length > _maxProperties && (ellipsis = _reactDefault.default.createElement("span", {
          key: "ellipsis"
        }, "…"));
        var propertyValue = getPropertyValue(object, propertyName);
        if (propertyNodes.push(_reactDefault.default.createElement("span", {
          key: propertyName
        }, _reactDefault.default.createElement(ObjectName, {
          name: propertyName || '""'
        }), ": ", _reactDefault.default.createElement(ObjectValue, {
          object: propertyValue
        }), ellipsis)), ellipsis) break;
      }
      var objectConstructorName = object.constructor ? object.constructor.name : "Object";
      return _reactDefault.default.createElement(_reactDefault.default.Fragment, null, _reactDefault.default.createElement("span", {
        style: styles.objectDescription
      }, "Object" === objectConstructorName ? "" : "".concat(objectConstructorName, " ")), _reactDefault.default.createElement("span", {
        style: styles.preview
      }, "{", intersperse(propertyNodes, ", "), "}"));
    }, ObjectRootLabel = function(_ref) {
      var name = _ref.name, data = _ref.data;
      return "string" == typeof name ? _reactDefault.default.createElement("span", null, _reactDefault.default.createElement(ObjectName, {
        name: name
      }), _reactDefault.default.createElement("span", null, ": "), _reactDefault.default.createElement(ObjectPreview, {
        data: data
      })) : _reactDefault.default.createElement(ObjectPreview, {
        data: data
      });
    }, ObjectLabel = function(_ref) {
      var name = _ref.name, data = _ref.data, _ref$isNonenumerable = _ref.isNonenumerable, isNonenumerable = void 0 !== _ref$isNonenumerable && _ref$isNonenumerable, object = data;
      return _reactDefault.default.createElement("span", null, "string" == typeof name ? _reactDefault.default.createElement(ObjectName, {
        name: name,
        dimmed: isNonenumerable
      }) : _reactDefault.default.createElement(ObjectPreview, {
        data: name
      }), _reactDefault.default.createElement("span", null, ": "), _reactDefault.default.createElement(ObjectValue, {
        object: object
      }));
    };
    function _createForOfIteratorHelper(o, allowArrayLike) {
      var it;
      if ("undefined" == typeof Symbol || null == o[Symbol.iterator]) {
        if (Array.isArray(o) || (it = function(o, minLen) {
          if (!o) return;
          if ("string" == typeof o) return _arrayLikeToArray(o, minLen);
          var n = Object.prototype.toString.call(o).slice(8, -1);
          "Object" === n && o.constructor && (n = o.constructor.name);
          if ("Map" === n || "Set" === n) return Array.from(o);
          if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
        }(o)) || allowArrayLike && o && "number" == typeof o.length) {
          it && (o = it);
          var i = 0, F = function() {};
          return {
            s: F,
            n: function() {
              return i >= o.length ? {
                done: !0
              } : {
                done: !1,
                value: o[i++]
              };
            },
            e: function(_e) {
              throw _e;
            },
            f: F
          };
        }
        throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }
      var err, normalCompletion = !0, didErr = !1;
      return {
        s: function() {
          it = o[Symbol.iterator]();
        },
        n: function() {
          var step = it.next();
          return normalCompletion = step.done, step;
        },
        e: function(_e2) {
          didErr = !0, err = _e2;
        },
        f: function() {
          try {
            normalCompletion || null == it.return || it.return();
          } finally {
            if (didErr) throw err;
          }
        }
      };
    }
    function _arrayLikeToArray(arr, len) {
      (null == len || len > arr.length) && (len = arr.length);
      for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
      return arr2;
    }
    ObjectLabel.propTypes = {
      isNonenumerable: _propTypesDefault.default.bool
    };
    var defaultNodeRenderer = function(_ref) {
      var depth = _ref.depth, name = _ref.name, data = _ref.data, isNonenumerable = _ref.isNonenumerable;
      return 0 === depth ? _reactDefault.default.createElement(ObjectRootLabel, {
        name: name,
        data: data
      }) : _reactDefault.default.createElement(ObjectLabel, {
        name: name,
        data: data,
        isNonenumerable: isNonenumerable
      });
    }, ObjectInspector = function(_ref2) {
      var _ref2$showNonenumerab = _ref2.showNonenumerable, showNonenumerable = void 0 !== _ref2$showNonenumerab && _ref2$showNonenumerab, sortObjectKeys = _ref2.sortObjectKeys, nodeRenderer = _ref2.nodeRenderer, treeViewProps = _objectWithoutProperties(_ref2, [ "showNonenumerable", "sortObjectKeys", "nodeRenderer" ]), dataIterator = function(showNonenumerable, sortObjectKeys) {
        return regenerator.mark((function objectIterator1(data) {
          var dataIsArray, i, _iterator, _step, entry, _entry, k, v, keys, _iterator2, _step2, propertyName, propertyValue, _propertyValue;
          return regenerator.wrap((function(_context) {
            for (;;) switch (_context.prev = _context.next) {
             case 0:
              if ("object" === _typeof(data) && null !== data || "function" == typeof data) {
                _context.next = 3;
                break;
              }
              return _context.abrupt("return");

             case 3:
              if ((dataIsArray = Array.isArray(data)) || !data[Symbol.iterator]) {
                _context.next = 32;
                break;
              }
              i = 0, _iterator = _createForOfIteratorHelper(data), _context.prev = 7, _iterator.s();

             case 9:
              if ((_step = _iterator.n()).done) {
                _context.next = 22;
                break;
              }
              if (entry = _step.value, !Array.isArray(entry) || 2 !== entry.length) {
                _context.next = 17;
                break;
              }
              return _entry = _slicedToArray(entry, 2), k = _entry[0], v = _entry[1], _context.next = 15, 
              {
                name: k,
                data: v
              };

             case 15:
              _context.next = 19;
              break;

             case 17:
              return _context.next = 19, {
                name: i.toString(),
                data: entry
              };

             case 19:
              i++;

             case 20:
              _context.next = 9;
              break;

             case 22:
              _context.next = 27;
              break;

             case 24:
              _context.prev = 24, _context.t0 = _context.catch(7), _iterator.e(_context.t0);

             case 27:
              return _context.prev = 27, _iterator.f(), _context.finish(27);

             case 30:
              _context.next = 64;
              break;

             case 32:
              keys = Object.getOwnPropertyNames(data), !0 !== sortObjectKeys || dataIsArray ? "function" == typeof sortObjectKeys && keys.sort(sortObjectKeys) : keys.sort(), 
              _iterator2 = _createForOfIteratorHelper(keys), _context.prev = 35, _iterator2.s();

             case 37:
              if ((_step2 = _iterator2.n()).done) {
                _context.next = 53;
                break;
              }
              if (propertyName = _step2.value, !propertyIsEnumerable.call(data, propertyName)) {
                _context.next = 45;
                break;
              }
              return propertyValue = getPropertyValue(data, propertyName), _context.next = 43, 
              {
                name: propertyName || '""',
                data: propertyValue
              };

             case 43:
              _context.next = 51;
              break;

             case 45:
              if (!showNonenumerable) {
                _context.next = 51;
                break;
              }
              _propertyValue = void 0;
              try {
                _propertyValue = getPropertyValue(data, propertyName);
              } catch (e) {}
              if (void 0 === _propertyValue) {
                _context.next = 51;
                break;
              }
              return _context.next = 51, {
                name: propertyName,
                data: _propertyValue,
                isNonenumerable: !0
              };

             case 51:
              _context.next = 37;
              break;

             case 53:
              _context.next = 58;
              break;

             case 55:
              _context.prev = 55, _context.t1 = _context.catch(35), _iterator2.e(_context.t1);

             case 58:
              return _context.prev = 58, _iterator2.f(), _context.finish(58);

             case 61:
              if (!showNonenumerable || data === Object.prototype) {
                _context.next = 64;
                break;
              }
              return _context.next = 64, {
                name: "__proto__",
                data: Object.getPrototypeOf(data),
                isNonenumerable: !0
              };

             case 64:
             case "end":
              return _context.stop();
            }
          }), objectIterator1, null, [ [ 7, 24, 27, 30 ], [ 35, 55, 58, 61 ] ]);
        }));
      }(showNonenumerable, sortObjectKeys), renderer = nodeRenderer || defaultNodeRenderer;
      return _reactDefault.default.createElement(TreeView, _extends({
        nodeRenderer: renderer,
        dataIterator: dataIterator
      }, treeViewProps));
    };
    ObjectInspector.propTypes = {
      expandLevel: _propTypesDefault.default.number,
      expandPaths: _propTypesDefault.default.oneOfType([ _propTypesDefault.default.string, _propTypesDefault.default.array ]),
      name: _propTypesDefault.default.string,
      data: _propTypesDefault.default.any,
      showNonenumerable: _propTypesDefault.default.bool,
      sortObjectKeys: _propTypesDefault.default.oneOfType([ _propTypesDefault.default.bool, _propTypesDefault.default.func ]),
      nodeRenderer: _propTypesDefault.default.func
    };
    var ObjectInspector$1 = themeAcceptor(ObjectInspector);
    function ownKeys$1(object, enumerableOnly) {
      var keys = Object.keys(object);
      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        enumerableOnly && (symbols = symbols.filter((function(sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        }))), keys.push.apply(keys, symbols);
      }
      return keys;
    }
    function _objectSpread$1(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = null != arguments[i] ? arguments[i] : {};
        i % 2 ? ownKeys$1(Object(source), !0).forEach((function(key2) {
          _defineProperty(target, key2, source[key2]);
        })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach((function(key2) {
          Object.defineProperty(target, key2, Object.getOwnPropertyDescriptor(source, key2));
        }));
      }
      return target;
    }
    Array.prototype.includes || (Array.prototype.includes = function(searchElement) {
      var O = Object(this), len = parseInt(O.length) || 0;
      if (0 === len) return !1;
      var k, currentElement, n = parseInt(arguments[1]) || 0;
      for (n >= 0 ? k = n : (k = len + n) < 0 && (k = 0); k < len; ) {
        if (searchElement === (currentElement = O[k]) || searchElement != searchElement && currentElement != currentElement) return !0;
        k++;
      }
      return !1;
    });
    var DataContainer = function(_ref) {
      var rows = _ref.rows, columns = _ref.columns, rowsData = _ref.rowsData, styles = useStyles("TableInspectorDataContainer"), borderStyles = useStyles("TableInspectorLeftBorder");
      return _reactDefault.default.createElement("div", {
        style: styles.div
      }, _reactDefault.default.createElement("table", {
        style: styles.table
      }, _reactDefault.default.createElement("colgroup", null), _reactDefault.default.createElement("tbody", null, rows.map((function(row, i) {
        return _reactDefault.default.createElement("tr", {
          key: row,
          style: styles.tr
        }, _reactDefault.default.createElement("td", {
          style: _objectSpread$1(_objectSpread$1({}, styles.td), borderStyles.none)
        }, row), columns.map((function(column) {
          var rowData = rowsData[i];
          return "object" === _typeof(rowData) && null !== rowData && hasOwnProperty.call(rowData, column) ? _reactDefault.default.createElement("td", {
            key: column,
            style: _objectSpread$1(_objectSpread$1({}, styles.td), borderStyles.solid)
          }, _reactDefault.default.createElement(ObjectValue, {
            object: rowData[column]
          })) : _reactDefault.default.createElement("td", {
            key: column,
            style: _objectSpread$1(_objectSpread$1({}, styles.td), borderStyles.solid)
          });
        })));
      })))));
    };
    function ownKeys(object, enumerableOnly) {
      var keys = Object.keys(object);
      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        enumerableOnly && (symbols = symbols.filter((function(sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        }))), keys.push.apply(keys, symbols);
      }
      return keys;
    }
    function _objectSpread(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = null != arguments[i] ? arguments[i] : {};
        i % 2 ? ownKeys(Object(source), !0).forEach((function(key2) {
          _defineProperty(target, key2, source[key2]);
        })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach((function(key2) {
          Object.defineProperty(target, key2, Object.getOwnPropertyDescriptor(source, key2));
        }));
      }
      return target;
    }
    var SortIconContainer = function(props) {
      return _reactDefault.default.createElement("div", {
        style: {
          position: "absolute",
          top: 1,
          right: 0,
          bottom: 1,
          display: "flex",
          alignItems: "center"
        }
      }, props.children);
    }, SortIcon = function(_ref) {
      var sortAscending = _ref.sortAscending, styles = useStyles("TableInspectorSortIcon"), glyph = sortAscending ? "▲" : "▼";
      return _reactDefault.default.createElement("div", {
        style: styles
      }, glyph);
    }, TH = function(_ref2) {
      var _ref2$sortAscending = _ref2.sortAscending, sortAscending = void 0 !== _ref2$sortAscending && _ref2$sortAscending, _ref2$sorted = _ref2.sorted, sorted = void 0 !== _ref2$sorted && _ref2$sorted, _ref2$onClick = _ref2.onClick, onClick = void 0 === _ref2$onClick ? void 0 : _ref2$onClick, _ref2$borderStyle = _ref2.borderStyle, borderStyle = void 0 === _ref2$borderStyle ? {} : _ref2$borderStyle, children = _ref2.children, thProps = _objectWithoutProperties(_ref2, [ "sortAscending", "sorted", "onClick", "borderStyle", "children" ]), styles = useStyles("TableInspectorTH"), _useState = _react.useState(!1), _useState2 = _slicedToArray(_useState, 2), hovered = _useState2[0], setHovered = _useState2[1], handleMouseEnter = _react.useCallback((function() {
        return setHovered(!0);
      }), []), handleMouseLeave = _react.useCallback((function() {
        return setHovered(!1);
      }), []);
      return _reactDefault.default.createElement("th", _extends({}, thProps, {
        style: _objectSpread(_objectSpread(_objectSpread({}, styles.base), borderStyle), hovered ? styles.base[":hover"] : {}),
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        onClick: onClick
      }), _reactDefault.default.createElement("div", {
        style: styles.div
      }, children), sorted && _reactDefault.default.createElement(SortIconContainer, null, _reactDefault.default.createElement(SortIcon, {
        sortAscending: sortAscending
      })));
    }, HeaderContainer = function(_ref) {
      var _ref$indexColumnText = _ref.indexColumnText, indexColumnText = void 0 === _ref$indexColumnText ? "(index)" : _ref$indexColumnText, _ref$columns = _ref.columns, columns = void 0 === _ref$columns ? [] : _ref$columns, sorted = _ref.sorted, sortIndexColumn = _ref.sortIndexColumn, sortColumn = _ref.sortColumn, sortAscending = _ref.sortAscending, onTHClick = _ref.onTHClick, onIndexTHClick = _ref.onIndexTHClick, styles = useStyles("TableInspectorHeaderContainer"), borderStyles = useStyles("TableInspectorLeftBorder");
      return _reactDefault.default.createElement("div", {
        style: styles.base
      }, _reactDefault.default.createElement("table", {
        style: styles.table
      }, _reactDefault.default.createElement("tbody", null, _reactDefault.default.createElement("tr", null, _reactDefault.default.createElement(TH, {
        borderStyle: borderStyles.none,
        sorted: sorted && sortIndexColumn,
        sortAscending: sortAscending,
        onClick: onIndexTHClick
      }, indexColumnText), columns.map((function(column) {
        return _reactDefault.default.createElement(TH, {
          borderStyle: borderStyles.solid,
          key: column,
          sorted: sorted && sortColumn === column,
          sortAscending: sortAscending,
          onClick: onTHClick.bind(null, column)
        }, column);
      }))))));
    }, TableInspector = function(_ref) {
      var data = _ref.data, columns = _ref.columns, styles = useStyles("TableInspector"), _useState = _react.useState({
        sorted: !1,
        sortIndexColumn: !1,
        sortColumn: void 0,
        sortAscending: !1
      }), _useState2 = _slicedToArray(_useState, 2), _useState2$ = _useState2[0], sorted = _useState2$.sorted, sortIndexColumn = _useState2$.sortIndexColumn, sortColumn = _useState2$.sortColumn, sortAscending = _useState2$.sortAscending, setState = _useState2[1], handleIndexTHClick = _react.useCallback((function() {
        setState((function(_ref2) {
          var sortIndexColumn1 = _ref2.sortIndexColumn, sortAscending1 = _ref2.sortAscending;
          return {
            sorted: !0,
            sortIndexColumn: !0,
            sortColumn: void 0,
            sortAscending: !sortIndexColumn1 || !sortAscending1
          };
        }));
      }), []), handleTHClick = _react.useCallback((function(col) {
        setState((function(_ref3) {
          var sortColumn1 = _ref3.sortColumn, sortAscending1 = _ref3.sortAscending;
          return {
            sorted: !0,
            sortIndexColumn: !1,
            sortColumn: col,
            sortAscending: col !== sortColumn1 || !sortAscending1
          };
        }));
      }), []);
      if ("object" !== _typeof(data) || null === data) return _reactDefault.default.createElement("div", null);
      var _getHeaders = function(data) {
        if ("object" === _typeof(data)) {
          var rowHeaders;
          if (Array.isArray(data)) {
            var nRows = data.length;
            rowHeaders = _toConsumableArray(Array(nRows).keys());
          } else null !== data && (rowHeaders = Object.keys(data));
          var colHeaders = rowHeaders.reduce((function(colHeaders1, rowHeader) {
            var row = data[rowHeader];
            return "object" === _typeof(row) && null !== row && Object.keys(row).reduce((function(xs, x) {
              return xs.includes(x) || xs.push(x), xs;
            }), colHeaders1), colHeaders1;
          }), []);
          return {
            rowHeaders: rowHeaders,
            colHeaders: colHeaders
          };
        }
      }(data), rowHeaders = _getHeaders.rowHeaders, colHeaders = _getHeaders.colHeaders;
      void 0 !== columns && (colHeaders = columns);
      var columnDataWithRowIndexes, mapper, ascending, rowsData = rowHeaders.map((function(rowHeader) {
        return data[rowHeader];
      }));
      if (void 0 !== sortColumn ? columnDataWithRowIndexes = rowsData.map((function(rowData, index) {
        return "object" === _typeof(rowData) && null !== rowData ? [ rowData[sortColumn], index ] : [ void 0, index ];
      })) : sortIndexColumn && (columnDataWithRowIndexes = rowHeaders.map((function(rowData, index) {
        return [ rowHeaders[index], index ];
      }))), void 0 !== columnDataWithRowIndexes) {
        var sortedRowIndexes = columnDataWithRowIndexes.sort((mapper = function(item) {
          return item[0];
        }, ascending = sortAscending, function(a, b) {
          var result, v1 = mapper(a), v2 = mapper(b), type1 = _typeof(v1), type2 = _typeof(v2), lt = function(v11, v21) {
            return v11 < v21 ? -1 : v11 > v21 ? 1 : 0;
          };
          if (type1 === type2) result = lt(v1, v2); else {
            var order = {
              string: 0,
              number: 1,
              object: 2,
              symbol: 3,
              boolean: 4,
              undefined: 5,
              function: 6
            };
            result = lt(order[type1], order[type2]);
          }
          return ascending || (result = -result), result;
        })).map((function(item) {
          return item[1];
        }));
        rowHeaders = sortedRowIndexes.map((function(i) {
          return rowHeaders[i];
        })), rowsData = sortedRowIndexes.map((function(i) {
          return rowsData[i];
        }));
      }
      return _reactDefault.default.createElement("div", {
        style: styles.base
      }, _reactDefault.default.createElement(HeaderContainer, {
        columns: colHeaders,
        sorted: sorted,
        sortIndexColumn: sortIndexColumn,
        sortColumn: sortColumn,
        sortAscending: sortAscending,
        onTHClick: handleTHClick,
        onIndexTHClick: handleIndexTHClick
      }), _reactDefault.default.createElement(DataContainer, {
        rows: rowHeaders,
        columns: colHeaders,
        rowsData: rowsData
      }));
    };
    TableInspector.propTypes = {
      data: _propTypesDefault.default.oneOfType([ _propTypesDefault.default.array, _propTypesDefault.default.object ]),
      columns: _propTypesDefault.default.array
    };
    var TableInspector$1 = themeAcceptor(TableInspector), shouldInline = function(data) {
      return 0 === data.childNodes.length || 1 === data.childNodes.length && data.childNodes[0].nodeType === Node.TEXT_NODE && data.textContent.length < 80;
    }, OpenTag = function(_ref) {
      var tagName = _ref.tagName, attributes = _ref.attributes, styles = _ref.styles;
      return _reactDefault.default.createElement("span", {
        style: styles.base
      }, "<", _reactDefault.default.createElement("span", {
        style: styles.tagName
      }, tagName), function() {
        if (attributes) {
          for (var attributeNodes = [], i = 0; i < attributes.length; i++) {
            var attribute = attributes[i];
            attributeNodes.push(_reactDefault.default.createElement("span", {
              key: i
            }, " ", _reactDefault.default.createElement("span", {
              style: styles.htmlAttributeName
            }, attribute.name), '="', _reactDefault.default.createElement("span", {
              style: styles.htmlAttributeValue
            }, attribute.value), '"'));
          }
          return attributeNodes;
        }
      }(), ">");
    }, CloseTag = function(_ref2) {
      var tagName = _ref2.tagName, _ref2$isChildNode = _ref2.isChildNode, isChildNode = void 0 !== _ref2$isChildNode && _ref2$isChildNode, styles = _ref2.styles;
      return _reactDefault.default.createElement("span", {
        style: _extends({}, styles.base, isChildNode && styles.offsetLeft)
      }, "</", _reactDefault.default.createElement("span", {
        style: styles.tagName
      }, tagName), ">");
    }, nameByNodeType = {
      1: "ELEMENT_NODE",
      3: "TEXT_NODE",
      7: "PROCESSING_INSTRUCTION_NODE",
      8: "COMMENT_NODE",
      9: "DOCUMENT_NODE",
      10: "DOCUMENT_TYPE_NODE",
      11: "DOCUMENT_FRAGMENT_NODE"
    }, DOMNodePreview = function(_ref3) {
      var isCloseTag = _ref3.isCloseTag, data = _ref3.data, expanded = _ref3.expanded, styles = useStyles("DOMNodePreview");
      if (isCloseTag) return _reactDefault.default.createElement(CloseTag, {
        styles: styles.htmlCloseTag,
        isChildNode: !0,
        tagName: data.tagName
      });
      switch (data.nodeType) {
       case Node.ELEMENT_NODE:
        return _reactDefault.default.createElement("span", null, _reactDefault.default.createElement(OpenTag, {
          tagName: data.tagName,
          attributes: data.attributes,
          styles: styles.htmlOpenTag
        }), shouldInline(data) ? data.textContent : !expanded && "…", !expanded && _reactDefault.default.createElement(CloseTag, {
          tagName: data.tagName,
          styles: styles.htmlCloseTag
        }));

       case Node.TEXT_NODE:
        return _reactDefault.default.createElement("span", null, data.textContent);

       case Node.CDATA_SECTION_NODE:
        return _reactDefault.default.createElement("span", null, "<![CDATA[" + data.textContent + "]]>");

       case Node.COMMENT_NODE:
        return _reactDefault.default.createElement("span", {
          style: styles.htmlComment
        }, "\x3c!--", data.textContent, "--\x3e");

       case Node.PROCESSING_INSTRUCTION_NODE:
        return _reactDefault.default.createElement("span", null, data.nodeName);

       case Node.DOCUMENT_TYPE_NODE:
        return _reactDefault.default.createElement("span", {
          style: styles.htmlDoctype
        }, "<!DOCTYPE ", data.name, data.publicId ? ' PUBLIC "'.concat(data.publicId, '"') : "", !data.publicId && data.systemId ? " SYSTEM" : "", data.systemId ? ' "'.concat(data.systemId, '"') : "", ">");

       case Node.DOCUMENT_NODE:
       case Node.DOCUMENT_FRAGMENT_NODE:
        return _reactDefault.default.createElement("span", null, data.nodeName);

       default:
        return _reactDefault.default.createElement("span", null, nameByNodeType[data.nodeType]);
      }
    };
    DOMNodePreview.propTypes = {
      isCloseTag: _propTypesDefault.default.bool,
      name: _propTypesDefault.default.string,
      data: _propTypesDefault.default.object.isRequired,
      expanded: _propTypesDefault.default.bool.isRequired
    };
    var domIterator = regenerator.mark((function domIterator1(data) {
      var i, node;
      return regenerator.wrap((function(_context) {
        for (;;) switch (_context.prev = _context.next) {
         case 0:
          if (!data || !data.childNodes) {
            _context.next = 17;
            break;
          }
          if (!shouldInline(data)) {
            _context.next = 4;
            break;
          }
          return _context.abrupt("return");

         case 4:
          i = 0;

         case 5:
          if (!(i < data.childNodes.length)) {
            _context.next = 14;
            break;
          }
          if ((node = data.childNodes[i]).nodeType !== Node.TEXT_NODE || 0 !== node.textContent.trim().length) {
            _context.next = 9;
            break;
          }
          return _context.abrupt("continue", 11);

         case 9:
          return _context.next = 11, {
            name: "".concat(node.tagName, "[").concat(i, "]"),
            data: node
          };

         case 11:
          i++, _context.next = 5;
          break;

         case 14:
          if (!data.tagName) {
            _context.next = 17;
            break;
          }
          return _context.next = 17, {
            name: "CLOSE_TAG",
            data: {
              tagName: data.tagName
            },
            isCloseTag: !0
          };

         case 17:
         case "end":
          return _context.stop();
        }
      }), domIterator1);
    })), DOMInspector = function(props) {
      return _reactDefault.default.createElement(TreeView, _extends({
        nodeRenderer: DOMNodePreview,
        dataIterator: domIterator
      }, props));
    };
    DOMInspector.propTypes = {
      data: _propTypesDefault.default.object.isRequired
    };
    var DOMInspector$1 = themeAcceptor(DOMInspector), Inspector = function(_ref) {
      var _ref$table = _ref.table, table = void 0 !== _ref$table && _ref$table, data = _ref.data, rest = _objectWithoutProperties(_ref, [ "table", "data" ]);
      return table ? _reactDefault.default.createElement(TableInspector$1, _extends({
        data: data
      }, rest)) : _isDomDefault.default(data) ? _reactDefault.default.createElement(DOMInspector$1, _extends({
        data: data
      }, rest)) : _reactDefault.default.createElement(ObjectInspector$1, _extends({
        data: data
      }, rest));
    };
    Inspector.propTypes = {
      data: _propTypesDefault.default.any,
      name: _propTypesDefault.default.string,
      table: _propTypesDefault.default.bool
    }, exports.default = Inspector;
  }, {
    react: "8Nzqg",
    "prop-types": "dLAVF",
    "is-dom": "cbUKD",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ],
  dLAVF: [ function(require, module, exports) {
    module.exports = require("./factoryWithThrowingShims")();
  }, {
    "./factoryWithThrowingShims": "9gNCj"
  } ],
  "9gNCj": [ function(require, module, exports) {
    "use strict";
    var ReactPropTypesSecret = require("./lib/ReactPropTypesSecret");
    function emptyFunction() {}
    function emptyFunctionWithReset() {}
    emptyFunctionWithReset.resetWarningCache = emptyFunction, module.exports = function() {
      function shim(props, propName, componentName, location, propFullName, secret) {
        if (secret !== ReactPropTypesSecret) {
          var err = new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");
          throw err.name = "Invariant Violation", err;
        }
      }
      function getShim() {
        return shim;
      }
      shim.isRequired = shim;
      var ReactPropTypes = {
        array: shim,
        bool: shim,
        func: shim,
        number: shim,
        object: shim,
        string: shim,
        symbol: shim,
        any: shim,
        arrayOf: getShim,
        element: shim,
        elementType: shim,
        instanceOf: getShim,
        node: shim,
        objectOf: getShim,
        oneOf: getShim,
        oneOfType: getShim,
        shape: getShim,
        exact: getShim,
        checkPropTypes: emptyFunctionWithReset,
        resetWarningCache: emptyFunction
      };
      return ReactPropTypes.PropTypes = ReactPropTypes, ReactPropTypes;
    };
  }, {
    "./lib/ReactPropTypesSecret": "gQm5j"
  } ],
  gQm5j: [ function(require, module, exports) {
    "use strict";
    module.exports = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  }, {} ],
  cbUKD: [ function(require, module, exports) {
    var isObject = require("is-object"), isWindow = require("is-window");
    module.exports = function(val) {
      return !(!isObject(val) || !isWindow(window) || "function" != typeof window.Node) && ("number" == typeof val.nodeType && "string" == typeof val.nodeName);
    };
  }, {
    "is-object": "i62vd",
    "is-window": "k7hpB"
  } ],
  i62vd: [ function(require, module, exports) {
    "use strict";
    module.exports = function(x) {
      return "object" == typeof x && null !== x;
    };
  }, {} ],
  k7hpB: [ function(require, module, exports) {
    "use strict";
    module.exports = function(obj) {
      if (null == obj) return !1;
      var o = Object(obj);
      return o === o.window;
    };
  }, {} ],
  gVwI6: [ function(require, module, exports) {
    var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
    parcelHelpers.defineInteropFlag(exports), parcelHelpers.export(exports, "feedbackUiVariants", (() => feedbackUiVariants)), 
    parcelHelpers.export(exports, "experimentArms", (() => experimentArms));
    var _common = require("../common/common");
    const feedbackUiVariants = {
      [_common.FeedbackUiVariant.TellUsMore]: 'Show "Tell Us More" intermediate step',
      [_common.FeedbackUiVariant.ForcedModal]: "Show modal immediately after regret click"
    }, experimentArms = {
      [_common.ExperimentArm.DislikeAction]: "Dislike action",
      [_common.ExperimentArm.NotInterestedAction]: "Not interested action",
      [_common.ExperimentArm.NoRecommendAction]: "Don't recommend channel action",
      [_common.ExperimentArm.RemoveFromHistory]: "Remove from history action",
      [_common.ExperimentArm.NoAction]: "Control-with-UX (shows the button but it doesn’t do anything)",
      [_common.ExperimentArm.NoInject]: "UX-control (doesn’t show the button, but still collects data)",
      [_common.ExperimentArm.OptOut]: "Opt-out (shows button which does dislike, but no data collection)"
    };
  }, {
    "../common/common": "jKOy4",
    "@parcel/transformer-js/src/esmodule-helpers.js": "9Dmg7"
  } ]
}, [ "dtFnn" ]);