/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 641);
/******/ })
/************************************************************************/
/******/ ({

/***/ 102:
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(19)["default"];

function _regeneratorRuntime() {
  "use strict";
  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */

  module.exports = _regeneratorRuntime = function _regeneratorRuntime() {
    return e;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;

  var t,
      e = {},
      r = Object.prototype,
      n = r.hasOwnProperty,
      o = Object.defineProperty || function (t, e, r) {
    t[e] = r.value;
  },
      i = "function" == typeof Symbol ? Symbol : {},
      a = i.iterator || "@@iterator",
      c = i.asyncIterator || "@@asyncIterator",
      u = i.toStringTag || "@@toStringTag";

  function define(t, e, r) {
    return Object.defineProperty(t, e, {
      value: r,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), t[e];
  }

  try {
    define({}, "");
  } catch (t) {
    define = function define(t, e, r) {
      return t[e] = r;
    };
  }

  function wrap(t, e, r, n) {
    var i = e && e.prototype instanceof Generator ? e : Generator,
        a = Object.create(i.prototype),
        c = new Context(n || []);
    return o(a, "_invoke", {
      value: makeInvokeMethod(t, r, c)
    }), a;
  }

  function tryCatch(t, e, r) {
    try {
      return {
        type: "normal",
        arg: t.call(e, r)
      };
    } catch (t) {
      return {
        type: "throw",
        arg: t
      };
    }
  }

  e.wrap = wrap;
  var h = "suspendedStart",
      l = "suspendedYield",
      f = "executing",
      s = "completed",
      y = {};

  function Generator() {}

  function GeneratorFunction() {}

  function GeneratorFunctionPrototype() {}

  var p = {};
  define(p, a, function () {
    return this;
  });
  var d = Object.getPrototypeOf,
      v = d && d(d(values([])));
  v && v !== r && n.call(v, a) && (p = v);
  var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p);

  function defineIteratorMethods(t) {
    ["next", "throw", "return"].forEach(function (e) {
      define(t, e, function (t) {
        return this._invoke(e, t);
      });
    });
  }

  function AsyncIterator(t, e) {
    function invoke(r, o, i, a) {
      var c = tryCatch(t[r], t, o);

      if ("throw" !== c.type) {
        var u = c.arg,
            h = u.value;
        return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) {
          invoke("next", t, i, a);
        }, function (t) {
          invoke("throw", t, i, a);
        }) : e.resolve(h).then(function (t) {
          u.value = t, i(u);
        }, function (t) {
          return invoke("throw", t, i, a);
        });
      }

      a(c.arg);
    }

    var r;
    o(this, "_invoke", {
      value: function value(t, n) {
        function callInvokeWithMethodAndArg() {
          return new e(function (e, r) {
            invoke(t, n, e, r);
          });
        }

        return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }

  function makeInvokeMethod(e, r, n) {
    var o = h;
    return function (i, a) {
      if (o === f) throw new Error("Generator is already running");

      if (o === s) {
        if ("throw" === i) throw a;
        return {
          value: t,
          done: !0
        };
      }

      for (n.method = i, n.arg = a;;) {
        var c = n.delegate;

        if (c) {
          var u = maybeInvokeDelegate(c, n);

          if (u) {
            if (u === y) continue;
            return u;
          }
        }

        if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) {
          if (o === h) throw o = s, n.arg;
          n.dispatchException(n.arg);
        } else "return" === n.method && n.abrupt("return", n.arg);
        o = f;
        var p = tryCatch(e, r, n);

        if ("normal" === p.type) {
          if (o = n.done ? s : l, p.arg === y) continue;
          return {
            value: p.arg,
            done: n.done
          };
        }

        "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg);
      }
    };
  }

  function maybeInvokeDelegate(e, r) {
    var n = r.method,
        o = e.iterator[n];
    if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y;
    var i = tryCatch(o, e.iterator, r.arg);
    if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y;
    var a = i.arg;
    return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y);
  }

  function pushTryEntry(t) {
    var e = {
      tryLoc: t[0]
    };
    1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e);
  }

  function resetTryEntry(t) {
    var e = t.completion || {};
    e.type = "normal", delete e.arg, t.completion = e;
  }

  function Context(t) {
    this.tryEntries = [{
      tryLoc: "root"
    }], t.forEach(pushTryEntry, this), this.reset(!0);
  }

  function values(e) {
    if (e || "" === e) {
      var r = e[a];
      if (r) return r.call(e);
      if ("function" == typeof e.next) return e;

      if (!isNaN(e.length)) {
        var o = -1,
            i = function next() {
          for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next;

          return next.value = t, next.done = !0, next;
        };

        return i.next = i;
      }
    }

    throw new TypeError(_typeof(e) + " is not iterable");
  }

  return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: !0
  }), o(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: !0
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) {
    var e = "function" == typeof t && t.constructor;
    return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name));
  }, e.mark = function (t) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t;
  }, e.awrap = function (t) {
    return {
      __await: t
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () {
    return this;
  }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) {
    void 0 === i && (i = Promise);
    var a = new AsyncIterator(wrap(t, r, n, o), i);
    return e.isGeneratorFunction(r) ? a : a.next().then(function (t) {
      return t.done ? t.value : a.next();
    });
  }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () {
    return this;
  }), define(g, "toString", function () {
    return "[object Generator]";
  }), e.keys = function (t) {
    var e = Object(t),
        r = [];

    for (var n in e) r.push(n);

    return r.reverse(), function next() {
      for (; r.length;) {
        var t = r.pop();
        if (t in e) return next.value = t, next.done = !1, next;
      }

      return next.done = !0, next;
    };
  }, e.values = values, Context.prototype = {
    constructor: Context,
    reset: function reset(e) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t);
    },
    stop: function stop() {
      this.done = !0;
      var t = this.tryEntries[0].completion;
      if ("throw" === t.type) throw t.arg;
      return this.rval;
    },
    dispatchException: function dispatchException(e) {
      if (this.done) throw e;
      var r = this;

      function handle(n, o) {
        return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o;
      }

      for (var o = this.tryEntries.length - 1; o >= 0; --o) {
        var i = this.tryEntries[o],
            a = i.completion;
        if ("root" === i.tryLoc) return handle("end");

        if (i.tryLoc <= this.prev) {
          var c = n.call(i, "catchLoc"),
              u = n.call(i, "finallyLoc");

          if (c && u) {
            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
          } else if (c) {
            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
          } else {
            if (!u) throw new Error("try statement without catch or finally");
            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
          }
        }
      }
    },
    abrupt: function abrupt(t, e) {
      for (var r = this.tryEntries.length - 1; r >= 0; --r) {
        var o = this.tryEntries[r];

        if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
          var i = o;
          break;
        }
      }

      i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null);
      var a = i ? i.completion : {};
      return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a);
    },
    complete: function complete(t, e) {
      if ("throw" === t.type) throw t.arg;
      return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y;
    },
    finish: function finish(t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var r = this.tryEntries[e];
        if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y;
      }
    },
    "catch": function _catch(t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var r = this.tryEntries[e];

        if (r.tryLoc === t) {
          var n = r.completion;

          if ("throw" === n.type) {
            var o = n.arg;
            resetTryEntry(r);
          }

          return o;
        }
      }

      throw new Error("illegal catch attempt");
    },
    delegateYield: function delegateYield(e, r, n) {
      return this.delegate = {
        iterator: values(e),
        resultName: r,
        nextLoc: n
      }, "next" === this.method && (this.arg = t), y;
    }
  }, e;
}

module.exports = _regeneratorRuntime, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 11:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DB", function() { return DB; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__babel_runtime_helpers_asyncToGenerator__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__babel_runtime_helpers_asyncToGenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__babel_runtime_helpers_asyncToGenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_dexie__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__helpers__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__constants_app__ = __webpack_require__(33);


//Runs Database



/*
* Database init*/

var db = new __WEBPACK_IMPORTED_MODULE_2_dexie__["a" /* default */]("Ocular");
db.version(14).stores({
  session: 'id,email,name,password,passphrase,token,server,created_at,remember_me,encryption_key',
  passwords: 'id, client_id, description, url, username, display_url, folder_id, credential_id, notes, credential_name, client_name, sort_username, sort_description, sort_client_name, sort_credential_name, [url+client_name], [url+credential_name], is_website, totp',
  clients: 'id, name, sort_name',
  credentialTypes: 'id, name, sort_name',
  folders: 'id, name, client_id',
  websites: 'id,alias,org_id,user_id,login_url,username_element,password_element,submit_element,two_step,auto_login',
  settings: 'id,sync,auto_capture,auto_fill,instant_login,timeout,open_in,subdomain_match,instant_login_on_click,default_tab',
  generateSettings: 'id,length,lowerCase,upperCase,numbers,special,specialCharacters',
  branding: 'id',
  state: 'id,sort_by,group_by,show_groups,inject_password,current_tab,active_credential,last_generated_password,search_value'
});
db.version(15).stores({
  formOptions: 'id, form_element, element_type, value'
});
db.version(16).stores({
  permissions: 'id, name'
});
db.version(17).stores({
  passwords: 'id, client_id, description, url, username, display_url, folder_id, credential_id, notes, credential_name, client_name, sort_username, sort_description, sort_client_name, sort_credential_name, [url+client_name], [url+credential_name], is_website, totp, last_used_date',
  state: 'id,group_by,last_generated_password,sort_by,show_groups,inject_password,current_tab,active_credential,search_value,page,params,history,new_password',
  forgetSites: 'id++,key,user_id,title,url,type,created_at,updated_at'
});
db.version(18).stores({
  bannerMessages: 'id++, key, showMessage, expiryDate'
});
db.open();
var DB = db;
var DBService = {
  //================================================================================
  // Session Methods
  //================================================================================

  /*
  * Creates a new session
  * */
  _newSession: function _newSession(user, keys, keyResponse, userDetails) {
    return db.session.put({
      id: 1,
      user_id: userDetails.id,
      email: user.email,
      name: userDetails.display_name,
      password: keys.key,
      organization_id: userDetails.organization_id,
      passphrase: keys.passphrase,
      token: keyResponse.results.token,
      server: user.server,
      remember_me: user.remember,
      encryption_key: user.passphrase,
      created_at: Date.now(),
      timeout: Date.now(),
      session_control: user.session_control
    });
  },

  /*
  * Gets existing session.  Should always have an ID of 1
  * */
  _existingSession: function _existingSession() {
    return db.session.get(1);
  },

  /**
   * @deprecated
   * Removes session.
   * If remember me is checked, will only remove some info
   */
  _removeSession: function _removeSession() {
    return db.session.get(1).then(function (session) {
      if (session.remember_me) {
        db.session.update(1, {
          password: '',
          passphrase: '',
          token: ''
        });
        db.state.where('id').aboveOrEqual(0)["delete"]();
      } else {
        db.session.where('id').aboveOrEqual(0)["delete"]();
        db.passwords.where('id').aboveOrEqual(0)["delete"]();
        db.clients.where('id').aboveOrEqual(0)["delete"]();
        db.websites.where('id').aboveOrEqual(0)["delete"]();
        db.folders.where('id').aboveOrEqual(0)["delete"]();
        db.credentialTypes.where('id').aboveOrEqual(0)["delete"]();
        db.permissions.where('id').aboveOrEqual(0)["delete"]();
        db.state.where('id').aboveOrEqual(0)["delete"]();
        db.formOptions.where('id').aboveOrEqual(0)["delete"]();
        db.settings.where('id').aboveOrEqual(0)["delete"]();
        db.forgetSites.where('id').aboveOrEqual(0)["delete"]();
      }
    });
  },
  _resetTable: function () {
    var _resetTable2 = __WEBPACK_IMPORTED_MODULE_1__babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee(table) {
      return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (table) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return");

            case 2:
              return _context.abrupt("return", db[table].where('id').aboveOrEqual(0)["delete"]());

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function _resetTable(_x) {
      return _resetTable2.apply(this, arguments);
    }

    return _resetTable;
  }(),
  //================================================================================
  // Password Methods
  //================================================================================

  /**
   * @deprecated
   * Inserts passwords into indexedDB
   * Use PasswordRepository instead
   * @param passwords
   * @return {Dexie.Promise<any>}
   * @private
   */
  _insertPasswords: function _insertPasswords(passwords) {
    var allPasswords = [];

    for (var password in passwords) {
      password = passwords[password];

      if (typeof password != 'undefined') {
        var client_name = password.isInMyVault ? __WEBPACK_IMPORTED_MODULE_4__constants_app__["a" /* default */].my_vault_label : password.client.name;
        allPasswords.push({
          id: password.id,
          client_id: parseInt(password.client.id),
          description: Object(__WEBPACK_IMPORTED_MODULE_3__helpers__["htmlDecode"])(password.description) || '',
          sort_description: password.description ? password.description.toLowerCase().trim() : '',
          url: password.url,
          username: Object(__WEBPACK_IMPORTED_MODULE_3__helpers__["htmlDecode"])(password.username) || '',
          sort_username: password.username ? Object(__WEBPACK_IMPORTED_MODULE_3__helpers__["htmlDecode"])(password.username).toLowerCase().trim() : '',
          display_url: __WEBPACK_IMPORTED_MODULE_3__helpers__["default"]._extractRootDomain(password.url, false),
          folder_id: password.folderId,
          credential_id: password.credentialTypeId,
          notes: password.notes,
          credential_name: password.credentialTypeName,
          sort_credential_name: password.credentialTypeName ? password.credentialTypeName.toLowerCase().trim() : '',
          client_name: client_name,
          sort_client_name: client_name ? client_name.toLowerCase().trim() : '',
          is_website: password.url && password.url.length ? 'true' : 'false',
          is_vault: password.isInMyVault,
          totp: password.totp,
          last_used_date: password.lastUsedDate
        });
      }
    }

    return db.passwords.bulkAdd(allPasswords);
  },

  /*
  * Loads passwords for a client
  * */
  _loadClientPasswords: function _loadClientPasswords(per_page, page, search, filters, clientID) {
    var folderId = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
    var offset = (page - 1) * per_page;

    switch (filters.sortBy.value) {
      case 'client_name':
        if (Number.isInteger(folderId)) {
          return db.passwords.where("client_id").equals(parseInt(clientID)).filter(function (password) {
            return parseInt(password.folder_id) === folderId;
          }).offset(offset).limit(per_page).toArray();
        }

        return db.passwords.where("client_id").equals(parseInt(clientID)).offset(offset).limit(per_page).toArray();

      case 'credential_name':
        return db.passwords.where("credential_id").equals(clientID).offset(offset).limit(per_page).toArray();
    }
  },

  /*
  * Loads Vault passwords
  * */
  _loadVaultPasswords: function _loadVaultPasswords(per_page, page, search, filters) {
    var offset = (page - 1) * per_page;

    if (search) {
      search = search.toLowerCase();

      var filterFunction = function filterFunction(password) {
        return password.description.toLowerCase().includes(search) || password.username.toLowerCase().startsWith(search) || password.display_url.toLowerCase().startsWith(search) || password.sort_client_name.toLowerCase().startsWith(search);
      }; // When the user is using the search box
      // we forcefully order it by sort_description


      return db.passwords.orderBy('sort_description').filter(filterFunction).offset(offset).limit(per_page).toArray();
    } else {
      // Otherwise we just sort it by filter selected
      return db.passwords.orderBy("sort_".concat(filters.sortBy.value)).offset(offset).limit(per_page).toArray();
    }
  },
  _getWebsitePasswordsWithURL: function _getWebsitePasswordsWithURL(per_page, page) {
    var URL = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
    var subdomainMatch = arguments.length > 3 ? arguments[3] : undefined;
    var offset = (page - 1) * per_page;

    if (URL.length) {
      URL = URL.toLowerCase(); //Handle migration to clover

      if (URL.includes('-clover.passportalmsp') || URL.includes('-c.mypasswordapp')) {
        var atomURL = URL.replace('-clover.', '.');
        atomURL = atomURL.replace('-c.mypassword', '.mypassword');
        return db.passwords.where('is_website').equals('true').filter(function (password) {
          return password.url.toLowerCase().includes(__WEBPACK_IMPORTED_MODULE_3__helpers__["default"]._extractRootDomain(URL, subdomainMatch)) || password.url.toLowerCase().includes(__WEBPACK_IMPORTED_MODULE_3__helpers__["default"]._extractRootDomain(atomURL, subdomainMatch));
        }).toArray();
      }

      return db.passwords.where('is_website').equals('true').filter(function (password) {
        return __WEBPACK_IMPORTED_MODULE_3__helpers__["default"]._extractRootDomain(password.url, subdomainMatch) === __WEBPACK_IMPORTED_MODULE_3__helpers__["default"]._extractRootDomain(URL, subdomainMatch);
      }).offset(offset).limit(per_page).toArray();
    } else {
      return db.passwords.orderBy('display_url').filter(function (password) {
        return Object(__WEBPACK_IMPORTED_MODULE_3__helpers__["toBoolean"])(password.is_website);
      }).offset(offset).limit(per_page).toArray();
    }
  },
  _getWebsitesPasswords: function () {
    var _getWebsitesPasswords2 = __WEBPACK_IMPORTED_MODULE_1__babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee2(per_page, page, clientName, filters) {
      var URL,
          subdomainMatch,
          search,
          offset,
          clients,
          _args2 = arguments;
      return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              URL = _args2.length > 4 && _args2[4] !== undefined ? _args2[4] : '';
              subdomainMatch = _args2.length > 5 && _args2[5] !== undefined ? _args2[5] : true;
              search = _args2.length > 6 && _args2[6] !== undefined ? _args2[6] : false;
              offset = (page - 1) * per_page;

              if (!((!clientName || !clientName.length) && (!search || !search.length))) {
                _context2.next = 8;
                break;
              }

              return _context2.abrupt("return", DBService._getWebsitePasswordsWithURL(per_page, page, URL, subdomainMatch));

            case 8:
              if (Object(__WEBPACK_IMPORTED_MODULE_3__helpers__["isEmpty"])(clientName)) {
                _context2.next = 17;
                break;
              }

              _context2.next = 11;
              return db.clients.where('name').equalsIgnoreCase(clientName).first();

            case 11:
              clients = _context2.sent;

              if (!Object(__WEBPACK_IMPORTED_MODULE_3__helpers__["isEmpty"])(clients === null || clients === void 0 ? void 0 : clients.id)) {
                _context2.next = 14;
                break;
              }

              return _context2.abrupt("return", []);

            case 14:
              return _context2.abrupt("return", db.passwords.orderBy('display_url').filter(function (password) {
                return password.client_id === parseInt(clients.id) && Object(__WEBPACK_IMPORTED_MODULE_3__helpers__["toBoolean"])(password.is_website);
              }).offset(offset).limit(per_page).toArray());

            case 17:
              return _context2.abrupt("return", db.passwords // Lets order everything first by display url
              // Before we filter
              .orderBy('display_url').filter(function (password) {
                var desc = typeof password.sort_description === 'string' ? password.sort_description : '';
                var url = typeof password.url === 'string' ? password.url : ''; // We are only interested in website entries
                // and entries that matched the keyword

                return Object(__WEBPACK_IMPORTED_MODULE_3__helpers__["toBoolean"])(password.is_website) && (desc.includes(search.toLowerCase()) || url.includes(search.toLowerCase()) || password.sort_client_name.includes(search.toLowerCase()) || password.sort_username.includes(search.toLowerCase()));
              }).offset(offset).limit(per_page).toArray());

            case 18:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function _getWebsitesPasswords(_x2, _x3, _x4, _x5) {
      return _getWebsitesPasswords2.apply(this, arguments);
    }

    return _getWebsitesPasswords;
  }(),
  _getPasswords: function _getPasswords(searchURL) {
    var subdomainMatch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    if (Object(__WEBPACK_IMPORTED_MODULE_3__helpers__["isEmpty"])(searchURL)) return [];
    searchURL = searchURL.toLowerCase(); //Handle migration to clover

    if (searchURL.includes('-clover.passportalmsp') || searchURL.includes('-c.mypasswordapp')) {
      var atomURL = searchURL.replace('-clover.', '.');
      atomURL = atomURL.replace('-c.mypassword', '.mypassword');
      return db.passwords.where('is_website').equals('true').filter(function (password) {
        return password.url.toLowerCase().includes(__WEBPACK_IMPORTED_MODULE_3__helpers__["default"]._extractRootDomain(searchURL, subdomainMatch)) || password.url.toLowerCase().includes(__WEBPACK_IMPORTED_MODULE_3__helpers__["default"]._extractRootDomain(atomURL, subdomainMatch));
      }).toArray();
    }

    return db.passwords.where('is_website').equals('true').filter(function (password) {
      return __WEBPACK_IMPORTED_MODULE_3__helpers__["default"]._extractRootDomain(password.url, subdomainMatch) === __WEBPACK_IMPORTED_MODULE_3__helpers__["default"]._extractRootDomain(searchURL, subdomainMatch);
    }).toArray();
  },
  _updatePassword: function _updatePassword(password) {
    return db.passwords.update(password.id, {
      client_id: password.client_id,
      description: password.description,
      sort_description: password.description.toLowerCase().trim(),
      url: password.url,
      display_url: __WEBPACK_IMPORTED_MODULE_3__helpers__["default"]._extractRootDomain(password.url, false),
      username: password.username,
      sort_username: password.username.toLowerCase().trim(),
      folder_id: password.folder_id,
      credential_id: password.credential_id,
      notes: password.notes,
      credential_name: password.credential_name,
      sort_credential_name: password.credential_name.toLowerCase().trim(),
      client_name: password.client_name,
      sort_client_name: password.client_name.toLowerCase().trim(),
      is_website: password.url && password.url.length ? 'true' : 'false',
      totp: password.totp,
      last_used_date: Date.now()
    }).then(function (updated) {
      return updated;
    });
  },
  _viewPassword: function _viewPassword(id) {
    return db.passwords.update(id, {
      last_used_date: Date.now()
    });
  },
  _deletePassword: function _deletePassword(id) {
    return db.passwords.where('id').equals(id)["delete"]();
  },
  //================================================================================
  // Client Methods
  //================================================================================
  _insertClients: function _insertClients(clients) {
    var allClients = [];

    for (var client in clients) {
      client = clients[client];
      allClients.push({
        id: client.id,
        name: Object(__WEBPACK_IMPORTED_MODULE_3__helpers__["htmlDecode"])(client.name),
        is_company_vault: client.is_company_vault
      });
    }

    return db.clients.bulkAdd(allClients)["catch"](function (error) {
      console.log(error);
    });
  },
  // Method called in
  _getCredentialIDs: function _getCredentialIDs(type) {
    return __WEBPACK_IMPORTED_MODULE_1__babel_runtime_helpers_asyncToGenerator___default()( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.mark(function _callee3() {
      var clients;
      return __WEBPACK_IMPORTED_MODULE_0__babel_runtime_regenerator___default.a.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              clients = [];

              if (!(type === 'client')) {
                _context3.next = 7;
                break;
              }

              _context3.next = 4;
              return db.clients.orderBy('name').filter(function (client) {
                return client.name !== __WEBPACK_IMPORTED_MODULE_4__constants_app__["a" /* default */].my_vault_label && client.is_company_vault === false;
              }).primaryKeys();

            case 4:
              clients = _context3.sent;
              _context3.next = 8;
              break;

            case 7:
              if (type === 'credential') {
                clients = db.credentialTypes.orderBy('sort_name').primaryKeys();
              }

            case 8:
              return _context3.abrupt("return", clients);

            case 9:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }))();
  },
  _loadClients: function _loadClients(per_page, page) {
    var offset = (page - 1) * per_page;
    return db.clients.orderBy('name').filter(function (client) {
      return client.name != __WEBPACK_IMPORTED_MODULE_4__constants_app__["a" /* default */].my_vault_label && client.is_company_vault === false;
    }).offset(offset).limit(per_page).toArray();
  },
  _loadAllClients: function _loadAllClients() {
    return db.clients.orderBy('name').toArray();
  },
  _loadPersonalVault: function _loadPersonalVault() {
    return db.clients.where('name').equals(__WEBPACK_IMPORTED_MODULE_4__constants_app__["a" /* default */].my_vault_label).toArray();
  },
  _loadCompanyVault: function _loadCompanyVault() {
    return db.clients.filter(function (client) {
      return client.is_company_vault;
    }).toArray();
  },
  //================================================================================
  // credentialTypes Methods
  //================================================================================
  _insertCredentialTypes: function _insertCredentialTypes(credentials) {
    var allCredentials = [];

    for (var credential in credentials) {
      credential = credentials[credential];
      allCredentials.push({
        id: credential.id,
        name: Object(__WEBPACK_IMPORTED_MODULE_3__helpers__["htmlDecode"])(credential.name),
        sort_name: Object(__WEBPACK_IMPORTED_MODULE_3__helpers__["htmlDecode"])(credential.name).toLowerCase().trim()
      });
    }

    return db.credentialTypes.bulkPut(allCredentials)["catch"](function (error) {
      console.log(error);
    });
  },
  _loadCredentialTypes: function _loadCredentialTypes() {
    return db.credentialTypes.orderBy('name').toArray();
  },
  _loadCredentialsPaginated: function _loadCredentialsPaginated(per_page, page, search) {
    var offset = (page - 1) * per_page;
    return db.credentialTypes.orderBy('sort_name').offset(offset).limit(per_page).toArray();
  },
  //================================================================================
  // Folder Methods
  //================================================================================
  _insertFolders: function _insertFolders(folders) {
    var allFolders = [];

    for (var folder in folders) {
      folder = folders[folder];
      allFolders.push({
        id: folder.id,
        name: Object(__WEBPACK_IMPORTED_MODULE_3__helpers__["htmlDecode"])(folder.name),
        client_id: parseInt(folder.client_id),
        parent_id: parseInt(folder.parent_id) || 0
      });
    }

    return db.folders.bulkPut(allFolders)["catch"](function (error) {
      console.log(error);
    });
  },
  _loadFolders: function _loadFolders(client_id) {
    var parentID = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    if (Number.isInteger(parentID)) {
      return db.folders.where('client_id').equals(parseInt(client_id)).filter(function (folder) {
        return folder.parent_id == parseInt(parentID);
      }).sortBy('name');
    }

    return db.folders.where('client_id').equals(client_id).toArray();
  },
  _loadPasswordGenerateSettings: function _loadPasswordGenerateSettings() {
    return db.generateSettings.get(1).then(function (settings) {
      if (!settings) {
        return db.generateSettings.put({
          id: 1,
          length: '12',
          lowerCase: true,
          upperCase: true,
          numbers: true,
          special: true,
          specialCharacters: '!@#$%^&*()_+'
        });
      }
    }).then(function () {
      return db.generateSettings.get(1);
    });
  },
  _saveGenerateSettings: function _saveGenerateSettings(settings) {
    db.generateSettings.put({
      id: 1,
      length: settings.length,
      lowerCase: settings.lowerCase,
      upperCase: settings.upperCase,
      numbers: settings.numbers,
      special: settings.special,
      specialCharacters: settings.specialCharacters
    })["catch"](function (error) {
      console.log(error);
    });
    return db.generateSettings.get(1);
  },
  _saveformOptions: function _saveformOptions(formOptions) {
    formOptions.forEach(function (option, index) {
      db.formOptions.put({
        id: index,
        form_element: option.form_element,
        element_type: option.element_type,
        value: option.value
      })["catch"](function (error) {
        console.log(error);
      });
    });
  },
  _getFormOptions: function _getFormOptions() {
    return db.formOptions.orderBy('form_element');
  },
  //================================================================================
  // User/App State Methods
  //================================================================================
  _loadState: function _loadState() {
    return db.state.get(1).then(function (state) {
      if (!state) {
        db.state.put({
          id: 1,
          sort_by: 'username',
          group_by: {
            value: 'client_name',
            label: 'Client'
          },
          show_groups: true,
          inject_password: false,
          current_tab: null,
          active_credential: null,
          last_generated_password: null,
          search_value: null,
          page: null,
          params: {},
          history: [],
          new_password: {}
        });
      }
    }).then(function () {
      return db.state.get(1);
    });
  },
  _saveState: function _saveState(state) {
    db.state.put({
      id: 1,
      sort_by: state.sort_by || 'username',
      group_by: state.group_by || {
        value: 'client_name',
        label: 'Client'
      },
      show_groups: state.show_groups || true,
      inject_password: state.inject_password || false,
      current_tab: state.current_tab || null,
      active_credential: state.active_credential || null,
      last_generated_password: state.last_generated_password || null,
      search_value: state.search_value || null,
      page: state.page || null,
      params: state.params || {},
      history: state.history || [],
      new_password: state.new_password || {}
    })["catch"](function (error) {
      console.log(error);
    });
    return db.state.get(1);
  },
  _insertBranding: function _insertBranding(branding) {
    return db.branding.put({
      id: 1,
      logo: branding.logo_url,
      primary: branding.primary.toLowerCase() == '#c046ff' ? '#c046ff' : branding.primary,
      secondary: branding.secondary,
      button_primary: branding.button_primary,
      button_primary_hover: branding.button_primary_hover,
      button_secondary: branding.button_secondary,
      button_secondary_hover: branding.button_secondary_hover
    });
  },
  _getBranding: function _getBranding() {
    return db.branding.get(1);
  },
  //================================================================================
  // Website Setting Methods
  //================================================================================

  /*Not used yet*/
  _insertWebsites: function _insertWebsites(websites) {
    for (var website in websites) {
      db.websites.put({
        id: website,
        alias: websites[website],
        org_id: '',
        user_id: '',
        login_url: websites[website],
        username_element: '',
        password_element: '',
        submit_element: '',
        two_step: '',
        auto_login: ''
      })["catch"](function (error) {
        console.log(error);
      });
    }
  },
  _loadAllWebSites: function _loadAllWebSites(per_page, page, search, subdomainMatch) {
    var offset = (page - 1) * per_page;
    return db.passwords.where('url').notEqual('').offset(offset).limit(per_page).uniqueKeys();
  },
  _insertWebsiteSettings: function _insertWebsiteSettings(websites) {
    for (var website in websites.results) {
      website = websites.results[website];
      db.websites.put({
        id: website.id,
        alias: website.alias,
        org_id: website.org_id,
        user_id: website.user_id,
        login_url: website.login_url,
        username_element: website.username_element,
        password_element: website.password_element,
        submit_element: website.submit_element,
        two_step: website.two_step,
        auto_login: website.auto_login
      })["catch"](function (error) {
        console.log(error);
      });
    }
  },
  _getWebsites: function _getWebsites(search) {
    return db.websites.filter(function (website) {
      return website.alias.includes(search);
    }).toArray();
  },
  //================================================================================
  // User Permissions
  //================================================================================
  _insertPermissions: function _insertPermissions(permissions) {
    return db.permissions.bulkPut(permissions);
  },
  _loadPermissions: function _loadPermissions() {
    return db.permissions.toArray();
  },
  _getPermission: function _getPermission(search) {
    return db.permissions.where('id').equals(search).toArray();
  }
};
/* harmony default export */ __webpack_exports__["default"] = (DBService);

/***/ }),

/***/ 122:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
  "use strict";

  if (global.setImmediate) {
    return;
  }

  var nextHandle = 1; // Spec says greater than zero

  var tasksByHandle = {};
  var currentlyRunningATask = false;
  var doc = global.document;
  var registerImmediate;

  function setImmediate(callback) {
    // Callback can either be a function or a string
    if (typeof callback !== "function") {
      callback = new Function("" + callback);
    } // Copy function arguments


    var args = new Array(arguments.length - 1);

    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i + 1];
    } // Store and register the task


    var task = {
      callback: callback,
      args: args
    };
    tasksByHandle[nextHandle] = task;
    registerImmediate(nextHandle);
    return nextHandle++;
  }

  function clearImmediate(handle) {
    delete tasksByHandle[handle];
  }

  function run(task) {
    var callback = task.callback;
    var args = task.args;

    switch (args.length) {
      case 0:
        callback();
        break;

      case 1:
        callback(args[0]);
        break;

      case 2:
        callback(args[0], args[1]);
        break;

      case 3:
        callback(args[0], args[1], args[2]);
        break;

      default:
        callback.apply(undefined, args);
        break;
    }
  }

  function runIfPresent(handle) {
    // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
    // So if we're currently running a task, we'll need to delay this invocation.
    if (currentlyRunningATask) {
      // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
      // "too much recursion" error.
      setTimeout(runIfPresent, 0, handle);
    } else {
      var task = tasksByHandle[handle];

      if (task) {
        currentlyRunningATask = true;

        try {
          run(task);
        } finally {
          clearImmediate(handle);
          currentlyRunningATask = false;
        }
      }
    }
  }

  function installNextTickImplementation() {
    registerImmediate = function (handle) {
      process.nextTick(function () {
        runIfPresent(handle);
      });
    };
  }

  function canUsePostMessage() {
    // The test against `importScripts` prevents this implementation from being installed inside a web worker,
    // where `global.postMessage` means something completely different and can't be used for this purpose.
    if (global.postMessage && !global.importScripts) {
      var postMessageIsAsynchronous = true;
      var oldOnMessage = global.onmessage;

      global.onmessage = function () {
        postMessageIsAsynchronous = false;
      };

      global.postMessage("", "*");
      global.onmessage = oldOnMessage;
      return postMessageIsAsynchronous;
    }
  }

  function installPostMessageImplementation() {
    // Installs an event handler on `global` for the `message` event: see
    // * https://developer.mozilla.org/en/DOM/window.postMessage
    // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages
    var messagePrefix = "setImmediate$" + Math.random() + "$";

    var onGlobalMessage = function (event) {
      if (event.source === global && typeof event.data === "string" && event.data.indexOf(messagePrefix) === 0) {
        runIfPresent(+event.data.slice(messagePrefix.length));
      }
    };

    if (global.addEventListener) {
      global.addEventListener("message", onGlobalMessage, false);
    } else {
      global.attachEvent("onmessage", onGlobalMessage);
    }

    registerImmediate = function (handle) {
      global.postMessage(messagePrefix + handle, "*");
    };
  }

  function installMessageChannelImplementation() {
    var channel = new MessageChannel();

    channel.port1.onmessage = function (event) {
      var handle = event.data;
      runIfPresent(handle);
    };

    registerImmediate = function (handle) {
      channel.port2.postMessage(handle);
    };
  }

  function installReadyStateChangeImplementation() {
    var html = doc.documentElement;

    registerImmediate = function (handle) {
      // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
      // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
      var script = doc.createElement("script");

      script.onreadystatechange = function () {
        runIfPresent(handle);
        script.onreadystatechange = null;
        html.removeChild(script);
        script = null;
      };

      html.appendChild(script);
    };
  }

  function installSetTimeoutImplementation() {
    registerImmediate = function (handle) {
      setTimeout(runIfPresent, 0, handle);
    };
  } // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.


  var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
  attachTo = attachTo && attachTo.setTimeout ? attachTo : global; // Don't get fooled by e.g. browserify environments.

  if ({}.toString.call(global.process) === "[object process]") {
    // For Node.js before 0.9
    installNextTickImplementation();
  } else if (canUsePostMessage()) {
    // For non-IE10 modern browsers
    installPostMessageImplementation();
  } else if (global.MessageChannel) {
    // For web workers, where supported
    installMessageChannelImplementation();
  } else if (doc && "onreadystatechange" in doc.createElement("script")) {
    // For IE 6–8
    installReadyStateChangeImplementation();
  } else {
    // For older browsers
    installSetTimeoutImplementation();
  }

  attachTo.setImmediate = setImmediate;
  attachTo.clearImmediate = clearImmediate;
})(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(13), __webpack_require__(67)))

/***/ }),

/***/ 125:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, setImmediate) {/*
 * Dexie.js - a minimalistic wrapper for IndexedDB
 * ===============================================
 *
 * By David Fahlander, david.fahlander@gmail.com
 *
 * Version {version}, {date}
 *
 * http://dexie.org
 *
 * Apache License Version 2.0, January 2004, http://www.apache.org/licenses/
 */
var keys = Object.keys;
var isArray = Array.isArray;

var _global = typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : global;

function extend(obj, extension) {
  if (typeof extension !== 'object') return obj;
  keys(extension).forEach(function (key) {
    obj[key] = extension[key];
  });
  return obj;
}

var getProto = Object.getPrototypeOf;
var _hasOwn = {}.hasOwnProperty;

function hasOwn(obj, prop) {
  return _hasOwn.call(obj, prop);
}

function props(proto, extension) {
  if (typeof extension === 'function') extension = extension(getProto(proto));
  keys(extension).forEach(function (key) {
    setProp(proto, key, extension[key]);
  });
}

var defineProperty = Object.defineProperty;

function setProp(obj, prop, functionOrGetSet, options) {
  defineProperty(obj, prop, extend(functionOrGetSet && hasOwn(functionOrGetSet, "get") && typeof functionOrGetSet.get === 'function' ? {
    get: functionOrGetSet.get,
    set: functionOrGetSet.set,
    configurable: true
  } : {
    value: functionOrGetSet,
    configurable: true,
    writable: true
  }, options));
}

function derive(Child) {
  return {
    from: function (Parent) {
      Child.prototype = Object.create(Parent.prototype);
      setProp(Child.prototype, "constructor", Child);
      return {
        extend: props.bind(null, Child.prototype)
      };
    }
  };
}

var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

function getPropertyDescriptor(obj, prop) {
  var pd = getOwnPropertyDescriptor(obj, prop),
      proto;
  return pd || (proto = getProto(obj)) && getPropertyDescriptor(proto, prop);
}

var _slice = [].slice;

function slice(args, start, end) {
  return _slice.call(args, start, end);
}

function override(origFunc, overridedFactory) {
  return overridedFactory(origFunc);
}

function assert(b) {
  if (!b) throw new Error("Assertion Failed");
}

function asap(fn) {
  if (_global.setImmediate) setImmediate(fn);else setTimeout(fn, 0);
}
/** Generate an object (hash map) based on given array.
 * @param extractor Function taking an array item and its index and returning an array of 2 items ([key, value]) to
 *        instert on the resulting object for each item in the array. If this function returns a falsy value, the
 *        current item wont affect the resulting object.
 */


function arrayToObject(array, extractor) {
  return array.reduce(function (result, item, i) {
    var nameAndValue = extractor(item, i);
    if (nameAndValue) result[nameAndValue[0]] = nameAndValue[1];
    return result;
  }, {});
}

function trycatcher(fn, reject) {
  return function () {
    try {
      fn.apply(this, arguments);
    } catch (e) {
      reject(e);
    }
  };
}

function tryCatch(fn, onerror, args) {
  try {
    fn.apply(null, args);
  } catch (ex) {
    onerror && onerror(ex);
  }
}

function getByKeyPath(obj, keyPath) {
  // http://www.w3.org/TR/IndexedDB/#steps-for-extracting-a-key-from-a-value-using-a-key-path
  if (hasOwn(obj, keyPath)) return obj[keyPath]; // This line is moved from last to first for optimization purpose.

  if (!keyPath) return obj;

  if (typeof keyPath !== 'string') {
    var rv = [];

    for (var i = 0, l = keyPath.length; i < l; ++i) {
      var val = getByKeyPath(obj, keyPath[i]);
      rv.push(val);
    }

    return rv;
  }

  var period = keyPath.indexOf('.');

  if (period !== -1) {
    var innerObj = obj[keyPath.substr(0, period)];
    return innerObj === undefined ? undefined : getByKeyPath(innerObj, keyPath.substr(period + 1));
  }

  return undefined;
}

function setByKeyPath(obj, keyPath, value) {
  if (!obj || keyPath === undefined) return;
  if ('isFrozen' in Object && Object.isFrozen(obj)) return;

  if (typeof keyPath !== 'string' && 'length' in keyPath) {
    assert(typeof value !== 'string' && 'length' in value);

    for (var i = 0, l = keyPath.length; i < l; ++i) {
      setByKeyPath(obj, keyPath[i], value[i]);
    }
  } else {
    var period = keyPath.indexOf('.');

    if (period !== -1) {
      var currentKeyPath = keyPath.substr(0, period);
      var remainingKeyPath = keyPath.substr(period + 1);
      if (remainingKeyPath === "") {
        if (value === undefined) delete obj[currentKeyPath];else obj[currentKeyPath] = value;
      } else {
        var innerObj = obj[currentKeyPath];
        if (!innerObj) innerObj = obj[currentKeyPath] = {};
        setByKeyPath(innerObj, remainingKeyPath, value);
      }
    } else {
      if (value === undefined) delete obj[keyPath];else obj[keyPath] = value;
    }
  }
}

function delByKeyPath(obj, keyPath) {
  if (typeof keyPath === 'string') setByKeyPath(obj, keyPath, undefined);else if ('length' in keyPath) [].map.call(keyPath, function (kp) {
    setByKeyPath(obj, kp, undefined);
  });
}

function shallowClone(obj) {
  var rv = {};

  for (var m in obj) {
    if (hasOwn(obj, m)) rv[m] = obj[m];
  }

  return rv;
}

var concat = [].concat;

function flatten(a) {
  return concat.apply([], a);
} //https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm


var intrinsicTypes = "Boolean,String,Date,RegExp,Blob,File,FileList,ArrayBuffer,DataView,Uint8ClampedArray,ImageData,Map,Set".split(',').concat(flatten([8, 16, 32, 64].map(function (num) {
  return ["Int", "Uint", "Float"].map(function (t) {
    return t + num + "Array";
  });
}))).filter(function (t) {
  return _global[t];
}).map(function (t) {
  return _global[t];
});

function deepClone(any) {
  if (!any || typeof any !== 'object') return any;
  var rv;

  if (isArray(any)) {
    rv = [];

    for (var i = 0, l = any.length; i < l; ++i) {
      rv.push(deepClone(any[i]));
    }
  } else if (intrinsicTypes.indexOf(any.constructor) >= 0) {
    rv = any;
  } else {
    rv = any.constructor ? Object.create(any.constructor.prototype) : {};

    for (var prop in any) {
      if (hasOwn(any, prop)) {
        rv[prop] = deepClone(any[prop]);
      }
    }
  }

  return rv;
}

function getObjectDiff(a, b, rv, prfx) {
  // Compares objects a and b and produces a diff object.
  rv = rv || {};
  prfx = prfx || '';
  keys(a).forEach(function (prop) {
    if (!hasOwn(b, prop)) rv[prfx + prop] = undefined; // Property removed
    else {
        var ap = a[prop],
            bp = b[prop];
        if (typeof ap === 'object' && typeof bp === 'object' && ap && bp && // Now compare constructors are same (not equal because wont work in Safari)
        '' + ap.constructor === '' + bp.constructor) // Same type of object but its properties may have changed
          getObjectDiff(ap, bp, rv, prfx + prop + ".");else if (ap !== bp) rv[prfx + prop] = b[prop]; // Primitive value changed
      }
  });
  keys(b).forEach(function (prop) {
    if (!hasOwn(a, prop)) {
      rv[prfx + prop] = b[prop]; // Property added
    }
  });
  return rv;
} // If first argument is iterable or array-like, return it as an array


var iteratorSymbol = typeof Symbol !== 'undefined' && Symbol.iterator;
var getIteratorOf = iteratorSymbol ? function (x) {
  var i;
  return x != null && (i = x[iteratorSymbol]) && i.apply(x);
} : function () {
  return null;
};
var NO_CHAR_ARRAY = {}; // Takes one or several arguments and returns an array based on the following criteras:
// * If several arguments provided, return arguments converted to an array in a way that
//   still allows javascript engine to optimize the code.
// * If single argument is an array, return a clone of it.
// * If this-pointer equals NO_CHAR_ARRAY, don't accept strings as valid iterables as a special
//   case to the two bullets below.
// * If single argument is an iterable, convert it to an array and return the resulting array.
// * If single argument is array-like (has length of type number), convert it to an array.

function getArrayOf(arrayLike) {
  var i, a, x, it;

  if (arguments.length === 1) {
    if (isArray(arrayLike)) return arrayLike.slice();
    if (this === NO_CHAR_ARRAY && typeof arrayLike === 'string') return [arrayLike];

    if (it = getIteratorOf(arrayLike)) {
      a = [];

      while (x = it.next(), !x.done) a.push(x.value);

      return a;
    }

    if (arrayLike == null) return [arrayLike];
    i = arrayLike.length;

    if (typeof i === 'number') {
      a = new Array(i);

      while (i--) a[i] = arrayLike[i];

      return a;
    }

    return [arrayLike];
  }

  i = arguments.length;
  a = new Array(i);

  while (i--) a[i] = arguments[i];

  return a;
} // By default, debug will be true only if platform is a web platform and its page is served from localhost.
// When debug = true, error's stacks will contain asyncronic long stacks.


var debug = typeof location !== 'undefined' && // By default, use debug mode if served from localhost.
/^(http|https):\/\/(localhost|127\.0\.0\.1)/.test(location.href);

function setDebug(value, filter) {
  debug = value;
  libraryFilter = filter;
}

var libraryFilter = function () {
  return true;
};

var NEEDS_THROW_FOR_STACK = !new Error("").stack;

function getErrorWithStack() {
  "use strict";

  if (NEEDS_THROW_FOR_STACK) try {
    // Doing something naughty in strict mode here to trigger a specific error
    // that can be explicitely ignored in debugger's exception settings.
    // If we'd just throw new Error() here, IE's debugger's exception settings
    // will just consider it as "exception thrown by javascript code" which is
    // something you wouldn't want it to ignore.
    getErrorWithStack.arguments;
    throw new Error(); // Fallback if above line don't throw.
  } catch (e) {
    return e;
  }
  return new Error();
}

function prettyStack(exception, numIgnoredFrames) {
  var stack = exception.stack;
  if (!stack) return "";
  numIgnoredFrames = numIgnoredFrames || 0;
  if (stack.indexOf(exception.name) === 0) numIgnoredFrames += (exception.name + exception.message).split('\n').length;
  return stack.split('\n').slice(numIgnoredFrames).filter(libraryFilter).map(function (frame) {
    return "\n" + frame;
  }).join('');
}

function deprecated(what, fn) {
  return function () {
    console.warn(what + " is deprecated. See https://github.com/dfahlander/Dexie.js/wiki/Deprecations. " + prettyStack(getErrorWithStack(), 1));
    return fn.apply(this, arguments);
  };
}

var dexieErrorNames = ['Modify', 'Bulk', 'OpenFailed', 'VersionChange', 'Schema', 'Upgrade', 'InvalidTable', 'MissingAPI', 'NoSuchDatabase', 'InvalidArgument', 'SubTransaction', 'Unsupported', 'Internal', 'DatabaseClosed', 'PrematureCommit', 'ForeignAwait'];
var idbDomErrorNames = ['Unknown', 'Constraint', 'Data', 'TransactionInactive', 'ReadOnly', 'Version', 'NotFound', 'InvalidState', 'InvalidAccess', 'Abort', 'Timeout', 'QuotaExceeded', 'Syntax', 'DataClone'];
var errorList = dexieErrorNames.concat(idbDomErrorNames);
var defaultTexts = {
  VersionChanged: "Database version changed by other database connection",
  DatabaseClosed: "Database has been closed",
  Abort: "Transaction aborted",
  TransactionInactive: "Transaction has already completed or failed"
}; //
// DexieError - base class of all out exceptions.
//

function DexieError(name, msg) {
  // Reason we don't use ES6 classes is because:
  // 1. It bloats transpiled code and increases size of minified code.
  // 2. It doesn't give us much in this case.
  // 3. It would require sub classes to call super(), which
  //    is not needed when deriving from Error.
  this._e = getErrorWithStack();
  this.name = name;
  this.message = msg;
}

derive(DexieError).from(Error).extend({
  stack: {
    get: function () {
      return this._stack || (this._stack = this.name + ": " + this.message + prettyStack(this._e, 2));
    }
  },
  toString: function () {
    return this.name + ": " + this.message;
  }
});

function getMultiErrorMessage(msg, failures) {
  return msg + ". Errors: " + failures.map(function (f) {
    return f.toString();
  }).filter(function (v, i, s) {
    return s.indexOf(v) === i;
  }) // Only unique error strings
  .join('\n');
} //
// ModifyError - thrown in Collection.modify()
// Specific constructor because it contains members failures and failedKeys.
//


function ModifyError(msg, failures, successCount, failedKeys) {
  this._e = getErrorWithStack();
  this.failures = failures;
  this.failedKeys = failedKeys;
  this.successCount = successCount;
}

derive(ModifyError).from(DexieError);

function BulkError(msg, failures) {
  this._e = getErrorWithStack();
  this.name = "BulkError";
  this.failures = failures;
  this.message = getMultiErrorMessage(msg, failures);
}

derive(BulkError).from(DexieError); //
//
// Dynamically generate error names and exception classes based
// on the names in errorList.
//
//
// Map of {ErrorName -> ErrorName + "Error"}

var errnames = errorList.reduce(function (obj, name) {
  return obj[name] = name + "Error", obj;
}, {}); // Need an alias for DexieError because we're gonna create subclasses with the same name.

var BaseException = DexieError; // Map of {ErrorName -> exception constructor}

var exceptions = errorList.reduce(function (obj, name) {
  // Let the name be "DexieError" because this name may
  // be shown in call stack and when debugging. DexieError is
  // the most true name because it derives from DexieError,
  // and we cannot change Function.name programatically without
  // dynamically create a Function object, which would be considered
  // 'eval-evil'.
  var fullName = name + "Error";

  function DexieError(msgOrInner, inner) {
    this._e = getErrorWithStack();
    this.name = fullName;

    if (!msgOrInner) {
      this.message = defaultTexts[name] || fullName;
      this.inner = null;
    } else if (typeof msgOrInner === 'string') {
      this.message = msgOrInner;
      this.inner = inner || null;
    } else if (typeof msgOrInner === 'object') {
      this.message = msgOrInner.name + " " + msgOrInner.message;
      this.inner = msgOrInner;
    }
  }

  derive(DexieError).from(BaseException);
  obj[name] = DexieError;
  return obj;
}, {}); // Use ECMASCRIPT standard exceptions where applicable:

exceptions.Syntax = SyntaxError;
exceptions.Type = TypeError;
exceptions.Range = RangeError;
var exceptionMap = idbDomErrorNames.reduce(function (obj, name) {
  obj[name + "Error"] = exceptions[name];
  return obj;
}, {});

function mapError(domError, message) {
  if (!domError || domError instanceof DexieError || domError instanceof TypeError || domError instanceof SyntaxError || !domError.name || !exceptionMap[domError.name]) return domError;
  var rv = new exceptionMap[domError.name](message || domError.message, domError);

  if ("stack" in domError) {
    // Derive stack from inner exception if it has a stack
    setProp(rv, "stack", {
      get: function () {
        return this.inner.stack;
      }
    });
  }

  return rv;
}

var fullNameExceptions = errorList.reduce(function (obj, name) {
  if (["Syntax", "Type", "Range"].indexOf(name) === -1) obj[name + "Error"] = exceptions[name];
  return obj;
}, {});
fullNameExceptions.ModifyError = ModifyError;
fullNameExceptions.DexieError = DexieError;
fullNameExceptions.BulkError = BulkError;

function nop() {}

function mirror(val) {
  return val;
}

function pureFunctionChain(f1, f2) {
  // Enables chained events that takes ONE argument and returns it to the next function in chain.
  // This pattern is used in the hook("reading") event.
  if (f1 == null || f1 === mirror) return f2;
  return function (val) {
    return f2(f1(val));
  };
}

function callBoth(on1, on2) {
  return function () {
    on1.apply(this, arguments);
    on2.apply(this, arguments);
  };
}

function hookCreatingChain(f1, f2) {
  // Enables chained events that takes several arguments and may modify first argument by making a modification and then returning the same instance.
  // This pattern is used in the hook("creating") event.
  if (f1 === nop) return f2;
  return function () {
    var res = f1.apply(this, arguments);
    if (res !== undefined) arguments[0] = res;
    var onsuccess = this.onsuccess,
        // In case event listener has set this.onsuccess
    onerror = this.onerror; // In case event listener has set this.onerror

    this.onsuccess = null;
    this.onerror = null;
    var res2 = f2.apply(this, arguments);
    if (onsuccess) this.onsuccess = this.onsuccess ? callBoth(onsuccess, this.onsuccess) : onsuccess;
    if (onerror) this.onerror = this.onerror ? callBoth(onerror, this.onerror) : onerror;
    return res2 !== undefined ? res2 : res;
  };
}

function hookDeletingChain(f1, f2) {
  if (f1 === nop) return f2;
  return function () {
    f1.apply(this, arguments);
    var onsuccess = this.onsuccess,
        // In case event listener has set this.onsuccess
    onerror = this.onerror; // In case event listener has set this.onerror

    this.onsuccess = this.onerror = null;
    f2.apply(this, arguments);
    if (onsuccess) this.onsuccess = this.onsuccess ? callBoth(onsuccess, this.onsuccess) : onsuccess;
    if (onerror) this.onerror = this.onerror ? callBoth(onerror, this.onerror) : onerror;
  };
}

function hookUpdatingChain(f1, f2) {
  if (f1 === nop) return f2;
  return function (modifications) {
    var res = f1.apply(this, arguments);
    extend(modifications, res); // If f1 returns new modifications, extend caller's modifications with the result before calling next in chain.

    var onsuccess = this.onsuccess,
        // In case event listener has set this.onsuccess
    onerror = this.onerror; // In case event listener has set this.onerror

    this.onsuccess = null;
    this.onerror = null;
    var res2 = f2.apply(this, arguments);
    if (onsuccess) this.onsuccess = this.onsuccess ? callBoth(onsuccess, this.onsuccess) : onsuccess;
    if (onerror) this.onerror = this.onerror ? callBoth(onerror, this.onerror) : onerror;
    return res === undefined ? res2 === undefined ? undefined : res2 : extend(res, res2);
  };
}

function reverseStoppableEventChain(f1, f2) {
  if (f1 === nop) return f2;
  return function () {
    if (f2.apply(this, arguments) === false) return false;
    return f1.apply(this, arguments);
  };
}

function promisableChain(f1, f2) {
  if (f1 === nop) return f2;
  return function () {
    var res = f1.apply(this, arguments);

    if (res && typeof res.then === 'function') {
      var thiz = this,
          i = arguments.length,
          args = new Array(i);

      while (i--) args[i] = arguments[i];

      return res.then(function () {
        return f2.apply(thiz, args);
      });
    }

    return f2.apply(this, arguments);
  };
}
/*
 * Copyright (c) 2014-2017 David Fahlander
 * Apache License Version 2.0, January 2004, http://www.apache.org/licenses/LICENSE-2.0
 */
//
// Promise and Zone (PSD) for Dexie library
//
// I started out writing this Promise class by copying promise-light (https://github.com/taylorhakes/promise-light) by
// https://github.com/taylorhakes - an A+ and ECMASCRIPT 6 compliant Promise implementation.
//
// In previous versions this was fixed by not calling setTimeout when knowing that the resolve() or reject() came from another
// tick. In Dexie v1.4.0, I've rewritten the Promise class entirely. Just some fragments of promise-light is left. I use
// another strategy now that simplifies everything a lot: to always execute callbacks in a new micro-task, but have an own micro-task
// engine that is indexedDB compliant across all browsers.
// Promise class has also been optimized a lot with inspiration from bluebird - to avoid closures as much as possible.
// Also with inspiration from bluebird, asyncronic stacks in debug mode.
//
// Specific non-standard features of this Promise class:
// * Custom zone support (a.k.a. PSD) with ability to keep zones also when using native promises as well as
//   native async / await.
// * Promise.follow() method built upon the custom zone engine, that allows user to track all promises created from current stack frame
//   and below + all promises that those promises creates or awaits.
// * Detect any unhandled promise in a PSD-scope (PSD.onunhandled). 
//
// David Fahlander, https://github.com/dfahlander
//
// Just a pointer that only this module knows about.
// Used in Promise constructor to emulate a private constructor.


var INTERNAL = {}; // Async stacks (long stacks) must not grow infinitely.

var LONG_STACKS_CLIP_LIMIT = 100;
var MAX_LONG_STACKS = 20;
var ZONE_ECHO_LIMIT = 7;

var nativePromiseInstanceAndProto = function () {
  try {
    // Be able to patch native async functions
    return new Function("let F=async ()=>{},p=F();return [p,Object.getPrototypeOf(p),Promise.resolve(),F.constructor];")();
  } catch (e) {
    var P = _global.Promise;
    return P ? [P.resolve(), P.prototype, P.resolve()] : [];
  }
}();

var resolvedNativePromise = nativePromiseInstanceAndProto[0];
var nativePromiseProto = nativePromiseInstanceAndProto[1];
var resolvedGlobalPromise = nativePromiseInstanceAndProto[2];
var nativePromiseThen = nativePromiseProto && nativePromiseProto.then;
var NativePromise = resolvedNativePromise && resolvedNativePromise.constructor;
var AsyncFunction = nativePromiseInstanceAndProto[3];
var patchGlobalPromise = !!resolvedGlobalPromise;
var stack_being_generated = false;
/* The default function used only for the very first promise in a promise chain.
   As soon as then promise is resolved or rejected, all next tasks will be executed in micro ticks
   emulated in this module. For indexedDB compatibility, this means that every method needs to
   execute at least one promise before doing an indexedDB operation. Dexie will always call
   db.ready().then() for every operation to make sure the indexedDB event is started in an
   indexedDB-compatible emulated micro task loop.
*/

var schedulePhysicalTick = resolvedGlobalPromise ? function () {
  resolvedGlobalPromise.then(physicalTick);
} : _global.setImmediate ? // setImmediate supported. Those modern platforms also supports Function.bind().
setImmediate.bind(null, physicalTick) : _global.MutationObserver ? // MutationObserver supported
function () {
  var hiddenDiv = document.createElement("div");
  new MutationObserver(function () {
    physicalTick();
    hiddenDiv = null;
  }).observe(hiddenDiv, {
    attributes: true
  });
  hiddenDiv.setAttribute('i', '1');
} : // No support for setImmediate or MutationObserver. No worry, setTimeout is only called
// once time. Every tick that follows will be our emulated micro tick.
// Could have uses setTimeout.bind(null, 0, physicalTick) if it wasnt for that FF13 and below has a bug 
function () {
  setTimeout(physicalTick, 0);
}; // Configurable through Promise.scheduler.
// Don't export because it would be unsafe to let unknown
// code call it unless they do try..catch within their callback.
// This function can be retrieved through getter of Promise.scheduler though,
// but users must not do Promise.scheduler = myFuncThatThrowsException

var asap$1 = function (callback, args) {
  microtickQueue.push([callback, args]);

  if (needsNewPhysicalTick) {
    schedulePhysicalTick();
    needsNewPhysicalTick = false;
  }
};

var isOutsideMicroTick = true;
var needsNewPhysicalTick = true;
var unhandledErrors = [];
var rejectingErrors = [];
var currentFulfiller = null;
var rejectionMapper = mirror; // Remove in next major when removing error mapping of DOMErrors and DOMExceptions

var globalPSD = {
  id: 'global',
  global: true,
  ref: 0,
  unhandleds: [],
  onunhandled: globalError,
  pgp: false,
  env: {},
  finalize: function () {
    this.unhandleds.forEach(function (uh) {
      try {
        globalError(uh[0], uh[1]);
      } catch (e) {}
    });
  }
};
var PSD = globalPSD;
var microtickQueue = []; // Callbacks to call in this or next physical tick.

var numScheduledCalls = 0; // Number of listener-calls left to do in this physical tick.

var tickFinalizers = []; // Finalizers to call when there are no more async calls scheduled within current physical tick.

function Promise(fn) {
  if (typeof this !== 'object') throw new TypeError('Promises must be constructed via new');
  this._listeners = [];
  this.onuncatched = nop; // Deprecate in next major. Not needed. Better to use global error handler.
  // A library may set `promise._lib = true;` after promise is created to make resolve() or reject()
  // execute the microtask engine implicitely within the call to resolve() or reject().
  // To remain A+ compliant, a library must only set `_lib=true` if it can guarantee that the stack
  // only contains library code when calling resolve() or reject().
  // RULE OF THUMB: ONLY set _lib = true for promises explicitely resolving/rejecting directly from
  // global scope (event handler, timer etc)!

  this._lib = false; // Current async scope

  var psd = this._PSD = PSD;

  if (debug) {
    this._stackHolder = getErrorWithStack();
    this._prev = null;
    this._numPrev = 0; // Number of previous promises (for long stacks)
  }

  if (typeof fn !== 'function') {
    if (fn !== INTERNAL) throw new TypeError('Not a function'); // Private constructor (INTERNAL, state, value).
    // Used internally by Promise.resolve() and Promise.reject().

    this._state = arguments[1];
    this._value = arguments[2];
    if (this._state === false) handleRejection(this, this._value); // Map error, set stack and addPossiblyUnhandledError().

    return;
  }

  this._state = null; // null (=pending), false (=rejected) or true (=resolved)

  this._value = null; // error or result

  ++psd.ref; // Refcounting current scope

  executePromiseTask(this, fn);
} // Prepare a property descriptor to put onto Promise.prototype.then


var thenProp = {
  get: function () {
    var psd = PSD,
        microTaskId = totalEchoes;

    function then(onFulfilled, onRejected) {
      var _this = this;

      var possibleAwait = !psd.global && (psd !== PSD || microTaskId !== totalEchoes);
      if (possibleAwait) decrementExpectedAwaits();
      var rv = new Promise(function (resolve, reject) {
        propagateToListener(_this, new Listener(nativeAwaitCompatibleWrap(onFulfilled, psd, possibleAwait), nativeAwaitCompatibleWrap(onRejected, psd, possibleAwait), resolve, reject, psd));
      });
      debug && linkToPreviousPromise(rv, this);
      return rv;
    }

    then.prototype = INTERNAL; // For idempotense, see setter below.

    return then;
  },
  // Be idempotent and allow another framework (such as zone.js or another instance of a Dexie.Promise module) to replace Promise.prototype.then
  // and when that framework wants to restore the original property, we must identify that and restore the original property descriptor.
  set: function (value) {
    setProp(this, 'then', value && value.prototype === INTERNAL ? thenProp : // Restore to original property descriptor.
    {
      get: function () {
        return value; // Getter returning provided value (behaves like value is just changed)
      },
      set: thenProp.set // Keep a setter that is prepared to restore original.

    });
  }
};
props(Promise.prototype, {
  then: thenProp,
  _then: function (onFulfilled, onRejected) {
    // A little tinier version of then() that don't have to create a resulting promise.
    propagateToListener(this, new Listener(null, null, onFulfilled, onRejected, PSD));
  },
  catch: function (onRejected) {
    if (arguments.length === 1) return this.then(null, onRejected); // First argument is the Error type to catch

    var type = arguments[0],
        handler = arguments[1];
    return typeof type === 'function' ? this.then(null, function (err) {
      // Catching errors by its constructor type (similar to java / c++ / c#)
      // Sample: promise.catch(TypeError, function (e) { ... });
      return err instanceof type ? handler(err) : PromiseReject(err);
    }) : this.then(null, function (err) {
      // Catching errors by the error.name property. Makes sense for indexedDB where error type
      // is always DOMError but where e.name tells the actual error type.
      // Sample: promise.catch('ConstraintError', function (e) { ... });
      return err && err.name === type ? handler(err) : PromiseReject(err);
    });
  },
  finally: function (onFinally) {
    return this.then(function (value) {
      onFinally();
      return value;
    }, function (err) {
      onFinally();
      return PromiseReject(err);
    });
  },
  stack: {
    get: function () {
      if (this._stack) return this._stack;

      try {
        stack_being_generated = true;
        var stacks = getStack(this, [], MAX_LONG_STACKS);
        var stack = stacks.join("\nFrom previous: ");
        if (this._state !== null) this._stack = stack; // Stack may be updated on reject.

        return stack;
      } finally {
        stack_being_generated = false;
      }
    }
  },
  timeout: function (ms, msg) {
    var _this = this;

    return ms < Infinity ? new Promise(function (resolve, reject) {
      var handle = setTimeout(function () {
        return reject(new exceptions.Timeout(msg));
      }, ms);

      _this.then(resolve, reject).finally(clearTimeout.bind(null, handle));
    }) : this;
  }
});
if (typeof Symbol !== 'undefined' && Symbol.toStringTag) setProp(Promise.prototype, Symbol.toStringTag, 'Promise'); // Now that Promise.prototype is defined, we have all it takes to set globalPSD.env.
// Environment globals snapshotted on leaving global zone

globalPSD.env = snapShot();

function Listener(onFulfilled, onRejected, resolve, reject, zone) {
  this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
  this.onRejected = typeof onRejected === 'function' ? onRejected : null;
  this.resolve = resolve;
  this.reject = reject;
  this.psd = zone;
} // Promise Static Properties


props(Promise, {
  all: function () {
    var values = getArrayOf.apply(null, arguments) // Supports iterables, implicit arguments and array-like.
    .map(onPossibleParallellAsync); // Handle parallell async/awaits 

    return new Promise(function (resolve, reject) {
      if (values.length === 0) resolve([]);
      var remaining = values.length;
      values.forEach(function (a, i) {
        return Promise.resolve(a).then(function (x) {
          values[i] = x;
          if (! --remaining) resolve(values);
        }, reject);
      });
    });
  },
  resolve: function (value) {
    if (value instanceof Promise) return value;
    if (value && typeof value.then === 'function') return new Promise(function (resolve, reject) {
      value.then(resolve, reject);
    });
    var rv = new Promise(INTERNAL, true, value);
    linkToPreviousPromise(rv, currentFulfiller);
    return rv;
  },
  reject: PromiseReject,
  race: function () {
    var values = getArrayOf.apply(null, arguments).map(onPossibleParallellAsync);
    return new Promise(function (resolve, reject) {
      values.map(function (value) {
        return Promise.resolve(value).then(resolve, reject);
      });
    });
  },
  PSD: {
    get: function () {
      return PSD;
    },
    set: function (value) {
      return PSD = value;
    }
  },
  //totalEchoes: {get: ()=>totalEchoes},
  //task: {get: ()=>task},
  newPSD: newScope,
  usePSD: usePSD,
  scheduler: {
    get: function () {
      return asap$1;
    },
    set: function (value) {
      asap$1 = value;
    }
  },
  rejectionMapper: {
    get: function () {
      return rejectionMapper;
    },
    set: function (value) {
      rejectionMapper = value;
    } // Map reject failures

  },
  follow: function (fn, zoneProps) {
    return new Promise(function (resolve, reject) {
      return newScope(function (resolve, reject) {
        var psd = PSD;
        psd.unhandleds = []; // For unhandled standard- or 3rd party Promises. Checked at psd.finalize()

        psd.onunhandled = reject; // Triggered directly on unhandled promises of this library.

        psd.finalize = callBoth(function () {
          var _this = this; // Unhandled standard or 3rd part promises are put in PSD.unhandleds and
          // examined upon scope completion while unhandled rejections in this Promise
          // will trigger directly through psd.onunhandled


          run_at_end_of_this_or_next_physical_tick(function () {
            _this.unhandleds.length === 0 ? resolve() : reject(_this.unhandleds[0]);
          });
        }, psd.finalize);
        fn();
      }, zoneProps, resolve, reject);
    });
  }
});
/**
* Take a potentially misbehaving resolver function and make sure
* onFulfilled and onRejected are only called once.
*
* Makes no guarantees about asynchrony.
*/

function executePromiseTask(promise, fn) {
  // Promise Resolution Procedure:
  // https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
  try {
    fn(function (value) {
      if (promise._state !== null) return; // Already settled

      if (value === promise) throw new TypeError('A promise cannot be resolved with itself.');
      var shouldExecuteTick = promise._lib && beginMicroTickScope();

      if (value && typeof value.then === 'function') {
        executePromiseTask(promise, function (resolve, reject) {
          value instanceof Promise ? value._then(resolve, reject) : value.then(resolve, reject);
        });
      } else {
        promise._state = true;
        promise._value = value;
        propagateAllListeners(promise);
      }

      if (shouldExecuteTick) endMicroTickScope();
    }, handleRejection.bind(null, promise)); // If Function.bind is not supported. Exception is handled in catch below
  } catch (ex) {
    handleRejection(promise, ex);
  }
}

function handleRejection(promise, reason) {
  rejectingErrors.push(reason);
  if (promise._state !== null) return;
  var shouldExecuteTick = promise._lib && beginMicroTickScope();
  reason = rejectionMapper(reason);
  promise._state = false;
  promise._value = reason;
  debug && reason !== null && typeof reason === 'object' && !reason._promise && tryCatch(function () {
    var origProp = getPropertyDescriptor(reason, "stack");
    reason._promise = promise;
    setProp(reason, "stack", {
      get: function () {
        return stack_being_generated ? origProp && (origProp.get ? origProp.get.apply(reason) : origProp.value) : promise.stack;
      }
    });
  }); // Add the failure to a list of possibly uncaught errors

  addPossiblyUnhandledError(promise);
  propagateAllListeners(promise);
  if (shouldExecuteTick) endMicroTickScope();
}

function propagateAllListeners(promise) {
  //debug && linkToPreviousPromise(promise);
  var listeners = promise._listeners;
  promise._listeners = [];

  for (var i = 0, len = listeners.length; i < len; ++i) {
    propagateToListener(promise, listeners[i]);
  }

  var psd = promise._PSD;
  --psd.ref || psd.finalize(); // if psd.ref reaches zero, call psd.finalize();

  if (numScheduledCalls === 0) {
    // If numScheduledCalls is 0, it means that our stack is not in a callback of a scheduled call,
    // and that no deferreds where listening to this rejection or success.
    // Since there is a risk that our stack can contain application code that may
    // do stuff after this code is finished that may generate new calls, we cannot
    // call finalizers here.
    ++numScheduledCalls;
    asap$1(function () {
      if (--numScheduledCalls === 0) finalizePhysicalTick(); // Will detect unhandled errors
    }, []);
  }
}

function propagateToListener(promise, listener) {
  if (promise._state === null) {
    promise._listeners.push(listener);

    return;
  }

  var cb = promise._state ? listener.onFulfilled : listener.onRejected;

  if (cb === null) {
    // This Listener doesnt have a listener for the event being triggered (onFulfilled or onReject) so lets forward the event to any eventual listeners on the Promise instance returned by then() or catch()
    return (promise._state ? listener.resolve : listener.reject)(promise._value);
  }

  ++listener.psd.ref;
  ++numScheduledCalls;
  asap$1(callListener, [cb, promise, listener]);
}

function callListener(cb, promise, listener) {
  try {
    // Set static variable currentFulfiller to the promise that is being fullfilled,
    // so that we connect the chain of promises (for long stacks support)
    currentFulfiller = promise; // Call callback and resolve our listener with it's return value.

    var ret,
        value = promise._value;

    if (promise._state) {
      // cb is onResolved
      ret = cb(value);
    } else {
      // cb is onRejected
      if (rejectingErrors.length) rejectingErrors = [];
      ret = cb(value);
      if (rejectingErrors.indexOf(value) === -1) markErrorAsHandled(promise); // Callback didnt do Promise.reject(err) nor reject(err) onto another promise.
    }

    listener.resolve(ret);
  } catch (e) {
    // Exception thrown in callback. Reject our listener.
    listener.reject(e);
  } finally {
    // Restore env and currentFulfiller.
    currentFulfiller = null;
    if (--numScheduledCalls === 0) finalizePhysicalTick();
    --listener.psd.ref || listener.psd.finalize();
  }
}

function getStack(promise, stacks, limit) {
  if (stacks.length === limit) return stacks;
  var stack = "";

  if (promise._state === false) {
    var failure = promise._value,
        errorName,
        message;

    if (failure != null) {
      errorName = failure.name || "Error";
      message = failure.message || failure;
      stack = prettyStack(failure, 0);
    } else {
      errorName = failure; // If error is undefined or null, show that.

      message = "";
    }

    stacks.push(errorName + (message ? ": " + message : "") + stack);
  }

  if (debug) {
    stack = prettyStack(promise._stackHolder, 2);
    if (stack && stacks.indexOf(stack) === -1) stacks.push(stack);
    if (promise._prev) getStack(promise._prev, stacks, limit);
  }

  return stacks;
}

function linkToPreviousPromise(promise, prev) {
  // Support long stacks by linking to previous completed promise.
  var numPrev = prev ? prev._numPrev + 1 : 0;

  if (numPrev < LONG_STACKS_CLIP_LIMIT) {
    promise._prev = prev;
    promise._numPrev = numPrev;
  }
}
/* The callback to schedule with setImmediate() or setTimeout().
   It runs a virtual microtick and executes any callback registered in microtickQueue.
 */


function physicalTick() {
  beginMicroTickScope() && endMicroTickScope();
}

function beginMicroTickScope() {
  var wasRootExec = isOutsideMicroTick;
  isOutsideMicroTick = false;
  needsNewPhysicalTick = false;
  return wasRootExec;
}
/* Executes micro-ticks without doing try..catch.
   This can be possible because we only use this internally and
   the registered functions are exception-safe (they do try..catch
   internally before calling any external method). If registering
   functions in the microtickQueue that are not exception-safe, this
   would destroy the framework and make it instable. So we don't export
   our asap method.
*/


function endMicroTickScope() {
  var callbacks, i, l;

  do {
    while (microtickQueue.length > 0) {
      callbacks = microtickQueue;
      microtickQueue = [];
      l = callbacks.length;

      for (i = 0; i < l; ++i) {
        var item = callbacks[i];
        item[0].apply(null, item[1]);
      }
    }
  } while (microtickQueue.length > 0);

  isOutsideMicroTick = true;
  needsNewPhysicalTick = true;
}

function finalizePhysicalTick() {
  var unhandledErrs = unhandledErrors;
  unhandledErrors = [];
  unhandledErrs.forEach(function (p) {
    p._PSD.onunhandled.call(null, p._value, p);
  });
  var finalizers = tickFinalizers.slice(0); // Clone first because finalizer may remove itself from list.

  var i = finalizers.length;

  while (i) finalizers[--i]();
}

function run_at_end_of_this_or_next_physical_tick(fn) {
  function finalizer() {
    fn();
    tickFinalizers.splice(tickFinalizers.indexOf(finalizer), 1);
  }

  tickFinalizers.push(finalizer);
  ++numScheduledCalls;
  asap$1(function () {
    if (--numScheduledCalls === 0) finalizePhysicalTick();
  }, []);
}

function addPossiblyUnhandledError(promise) {
  // Only add to unhandledErrors if not already there. The first one to add to this list
  // will be upon the first rejection so that the root cause (first promise in the
  // rejection chain) is the one listed.
  if (!unhandledErrors.some(function (p) {
    return p._value === promise._value;
  })) unhandledErrors.push(promise);
}

function markErrorAsHandled(promise) {
  // Called when a reject handled is actually being called.
  // Search in unhandledErrors for any promise whos _value is this promise_value (list
  // contains only rejected promises, and only one item per error)
  var i = unhandledErrors.length;

  while (i) if (unhandledErrors[--i]._value === promise._value) {
    // Found a promise that failed with this same error object pointer,
    // Remove that since there is a listener that actually takes care of it.
    unhandledErrors.splice(i, 1);
    return;
  }
}

function PromiseReject(reason) {
  return new Promise(INTERNAL, false, reason);
}

function wrap(fn, errorCatcher) {
  var psd = PSD;
  return function () {
    var wasRootExec = beginMicroTickScope(),
        outerScope = PSD;

    try {
      switchToZone(psd, true);
      return fn.apply(this, arguments);
    } catch (e) {
      errorCatcher && errorCatcher(e);
    } finally {
      switchToZone(outerScope, false);
      if (wasRootExec) endMicroTickScope();
    }
  };
} //
// variables used for native await support
//


var task = {
  awaits: 0,
  echoes: 0,
  id: 0
}; // The ongoing macro-task when using zone-echoing.

var taskCounter = 0; // ID counter for macro tasks.

var zoneStack = []; // Stack of left zones to restore asynchronically.

var zoneEchoes = 0; // zoneEchoes is a must in order to persist zones between native await expressions.

var totalEchoes = 0; // ID counter for micro-tasks. Used to detect possible native await in our Promise.prototype.then.

var zone_id_counter = 0;

function newScope(fn, props$$1, a1, a2) {
  var parent = PSD,
      psd = Object.create(parent);
  psd.parent = parent;
  psd.ref = 0;
  psd.global = false;
  psd.id = ++zone_id_counter; // Prepare for promise patching (done in usePSD):

  var globalEnv = globalPSD.env;
  psd.env = patchGlobalPromise ? {
    Promise: Promise,
    PromiseProp: {
      value: Promise,
      configurable: true,
      writable: true
    },
    all: Promise.all,
    race: Promise.race,
    resolve: Promise.resolve,
    reject: Promise.reject,
    nthen: getPatchedPromiseThen(globalEnv.nthen, psd),
    gthen: getPatchedPromiseThen(globalEnv.gthen, psd) // global then

  } : {};
  if (props$$1) extend(psd, props$$1); // unhandleds and onunhandled should not be specifically set here.
  // Leave them on parent prototype.
  // unhandleds.push(err) will push to parent's prototype
  // onunhandled() will call parents onunhandled (with this scope's this-pointer though!)

  ++parent.ref;

  psd.finalize = function () {
    --this.parent.ref || this.parent.finalize();
  };

  var rv = usePSD(psd, fn, a1, a2);
  if (psd.ref === 0) psd.finalize();
  return rv;
} // Function to call if scopeFunc returns NativePromise
// Also for each NativePromise in the arguments to Promise.all()


function incrementExpectedAwaits() {
  if (!task.id) task.id = ++taskCounter;
  ++task.awaits;
  task.echoes += ZONE_ECHO_LIMIT;
  return task.id;
} // Function to call when 'then' calls back on a native promise where onAwaitExpected() had been called.
// Also call this when a native await calls then method on a promise. In that case, don't supply
// sourceTaskId because we already know it refers to current task.


function decrementExpectedAwaits(sourceTaskId) {
  if (!task.awaits || sourceTaskId && sourceTaskId !== task.id) return;
  if (--task.awaits === 0) task.id = 0;
  task.echoes = task.awaits * ZONE_ECHO_LIMIT; // Will reset echoes to 0 if awaits is 0.
} // Call from Promise.all() and Promise.race()


function onPossibleParallellAsync(possiblePromise) {
  if (task.echoes && possiblePromise && possiblePromise.constructor === NativePromise) {
    incrementExpectedAwaits();
    return possiblePromise.then(function (x) {
      decrementExpectedAwaits();
      return x;
    }, function (e) {
      decrementExpectedAwaits();
      return rejection(e);
    });
  }

  return possiblePromise;
}

function zoneEnterEcho(targetZone) {
  ++totalEchoes;

  if (!task.echoes || --task.echoes === 0) {
    task.echoes = task.id = 0; // Cancel zone echoing.
  }

  zoneStack.push(PSD);
  switchToZone(targetZone, true);
}

function zoneLeaveEcho() {
  var zone = zoneStack[zoneStack.length - 1];
  zoneStack.pop();
  switchToZone(zone, false);
}

function switchToZone(targetZone, bEnteringZone) {
  var currentZone = PSD;

  if (bEnteringZone ? task.echoes && (!zoneEchoes++ || targetZone !== PSD) : zoneEchoes && (! --zoneEchoes || targetZone !== PSD)) {
    // Enter or leave zone asynchronically as well, so that tasks initiated during current tick
    // will be surrounded by the zone when they are invoked.
    enqueueNativeMicroTask(bEnteringZone ? zoneEnterEcho.bind(null, targetZone) : zoneLeaveEcho);
  }

  if (targetZone === PSD) return;
  PSD = targetZone; // The actual zone switch occurs at this line.
  // Snapshot on every leave from global zone.

  if (currentZone === globalPSD) globalPSD.env = snapShot();

  if (patchGlobalPromise) {
    // Let's patch the global and native Promises (may be same or may be different)
    var GlobalPromise = globalPSD.env.Promise; // Swich environments (may be PSD-zone or the global zone. Both apply.)

    var targetEnv = targetZone.env; // Change Promise.prototype.then for native and global Promise (they MAY differ on polyfilled environments, but both can be accessed)
    // Must be done on each zone change because the patched method contains targetZone in its closure.

    nativePromiseProto.then = targetEnv.nthen;
    GlobalPromise.prototype.then = targetEnv.gthen;

    if (currentZone.global || targetZone.global) {
      // Leaving or entering global zone. It's time to patch / restore global Promise.
      // Set this Promise to window.Promise so that transiled async functions will work on Firefox, Safari and IE, as well as with Zonejs and angular.
      Object.defineProperty(_global, 'Promise', targetEnv.PromiseProp); // Support Promise.all() etc to work indexedDB-safe also when people are including es6-promise as a module (they might
      // not be accessing global.Promise but a local reference to it)

      GlobalPromise.all = targetEnv.all;
      GlobalPromise.race = targetEnv.race;
      GlobalPromise.resolve = targetEnv.resolve;
      GlobalPromise.reject = targetEnv.reject;
    }
  }
}

function snapShot() {
  var GlobalPromise = _global.Promise;
  return patchGlobalPromise ? {
    Promise: GlobalPromise,
    PromiseProp: Object.getOwnPropertyDescriptor(_global, "Promise"),
    all: GlobalPromise.all,
    race: GlobalPromise.race,
    resolve: GlobalPromise.resolve,
    reject: GlobalPromise.reject,
    nthen: nativePromiseProto.then,
    gthen: GlobalPromise.prototype.then
  } : {};
}

function usePSD(psd, fn, a1, a2, a3) {
  var outerScope = PSD;

  try {
    switchToZone(psd, true);
    return fn(a1, a2, a3);
  } finally {
    switchToZone(outerScope, false);
  }
}

function enqueueNativeMicroTask(job) {
  //
  // Precondition: nativePromiseThen !== undefined
  //
  nativePromiseThen.call(resolvedNativePromise, job);
}

function nativeAwaitCompatibleWrap(fn, zone, possibleAwait) {
  return typeof fn !== 'function' ? fn : function () {
    var outerZone = PSD;
    if (possibleAwait) incrementExpectedAwaits();
    switchToZone(zone, true);

    try {
      return fn.apply(this, arguments);
    } finally {
      switchToZone(outerZone, false);
    }
  };
}

function getPatchedPromiseThen(origThen, zone) {
  return function (onResolved, onRejected) {
    return origThen.call(this, nativeAwaitCompatibleWrap(onResolved, zone, false), nativeAwaitCompatibleWrap(onRejected, zone, false));
  };
}

var UNHANDLEDREJECTION = "unhandledrejection";

function globalError(err, promise) {
  var rv;

  try {
    rv = promise.onuncatched(err);
  } catch (e) {}

  if (rv !== false) try {
    var event,
        eventData = {
      promise: promise,
      reason: err
    };

    if (_global.document && document.createEvent) {
      event = document.createEvent('Event');
      event.initEvent(UNHANDLEDREJECTION, true, true);
      extend(event, eventData);
    } else if (_global.CustomEvent) {
      event = new CustomEvent(UNHANDLEDREJECTION, {
        detail: eventData
      });
      extend(event, eventData);
    }

    if (event && _global.dispatchEvent) {
      dispatchEvent(event);
      if (!_global.PromiseRejectionEvent && _global.onunhandledrejection) // No native support for PromiseRejectionEvent but user has set window.onunhandledrejection. Manually call it.
        try {
          _global.onunhandledrejection(event);
        } catch (_) {}
    }

    if (!event.defaultPrevented) {
      console.warn("Unhandled rejection: " + (err.stack || err));
    }
  } catch (e) {}
}

var rejection = Promise.reject;

function Events(ctx) {
  var evs = {};

  var rv = function (eventName, subscriber) {
    if (subscriber) {
      // Subscribe. If additional arguments than just the subscriber was provided, forward them as well.
      var i = arguments.length,
          args = new Array(i - 1);

      while (--i) args[i - 1] = arguments[i];

      evs[eventName].subscribe.apply(null, args);
      return ctx;
    } else if (typeof eventName === 'string') {
      // Return interface allowing to fire or unsubscribe from event
      return evs[eventName];
    }
  };

  rv.addEventType = add;

  for (var i = 1, l = arguments.length; i < l; ++i) {
    add(arguments[i]);
  }

  return rv;

  function add(eventName, chainFunction, defaultFunction) {
    if (typeof eventName === 'object') return addConfiguredEvents(eventName);
    if (!chainFunction) chainFunction = reverseStoppableEventChain;
    if (!defaultFunction) defaultFunction = nop;
    var context = {
      subscribers: [],
      fire: defaultFunction,
      subscribe: function (cb) {
        if (context.subscribers.indexOf(cb) === -1) {
          context.subscribers.push(cb);
          context.fire = chainFunction(context.fire, cb);
        }
      },
      unsubscribe: function (cb) {
        context.subscribers = context.subscribers.filter(function (fn) {
          return fn !== cb;
        });
        context.fire = context.subscribers.reduce(chainFunction, defaultFunction);
      }
    };
    evs[eventName] = rv[eventName] = context;
    return context;
  }

  function addConfiguredEvents(cfg) {
    // events(this, {reading: [functionChain, nop]});
    keys(cfg).forEach(function (eventName) {
      var args = cfg[eventName];

      if (isArray(args)) {
        add(eventName, cfg[eventName][0], cfg[eventName][1]);
      } else if (args === 'asap') {
        // Rather than approaching event subscription using a functional approach, we here do it in a for-loop where subscriber is executed in its own stack
        // enabling that any exception that occur wont disturb the initiator and also not nescessary be catched and forgotten.
        var context = add(eventName, mirror, function fire() {
          // Optimazation-safe cloning of arguments into args.
          var i = arguments.length,
              args = new Array(i);

          while (i--) args[i] = arguments[i]; // All each subscriber:


          context.subscribers.forEach(function (fn) {
            asap(function fireEvent() {
              fn.apply(null, args);
            });
          });
        });
      } else throw new exceptions.InvalidArgument("Invalid event config");
    });
  }
}
/*
 * Dexie.js - a minimalistic wrapper for IndexedDB
 * ===============================================
 *
 * Copyright (c) 2014-2017 David Fahlander
 *
 * Version {version}, {date}
 *
 * http://dexie.org
 *
 * Apache License Version 2.0, January 2004, http://www.apache.org/licenses/LICENSE-2.0
 *
 */


var DEXIE_VERSION = '{version}';
var maxString = String.fromCharCode(65535);

var maxKey = function () {
  try {
    IDBKeyRange.only([[]]);
    return [[]];
  } catch (e) {
    return maxString;
  }
}();

var minKey = -Infinity;
var INVALID_KEY_ARGUMENT = "Invalid key provided. Keys must be of type string, number, Date or Array<string | number | Date>.";
var STRING_EXPECTED = "String expected.";
var connections = [];
var isIEOrEdge = typeof navigator !== 'undefined' && /(MSIE|Trident|Edge)/.test(navigator.userAgent);
var hasIEDeleteObjectStoreBug = isIEOrEdge;
var hangsOnDeleteLargeKeyRange = isIEOrEdge;

var dexieStackFrameFilter = function (frame) {
  return !/(dexie\.js|dexie\.min\.js)/.test(frame);
};

var dbNamesDB; // Global database for backing Dexie.getDatabaseNames() on browser without indexedDB.webkitGetDatabaseNames() 
// Init debug

setDebug(debug, dexieStackFrameFilter);

function Dexie(dbName, options) {
  /// <param name="options" type="Object" optional="true">Specify only if you wich to control which addons that should run on this instance</param>
  var deps = Dexie.dependencies;
  var opts = extend({
    // Default Options
    addons: Dexie.addons,
    autoOpen: true,
    indexedDB: deps.indexedDB,
    IDBKeyRange: deps.IDBKeyRange // Backend IDBKeyRange api. Default to browser env.

  }, options);
  var addons = opts.addons,
      autoOpen = opts.autoOpen,
      indexedDB = opts.indexedDB,
      IDBKeyRange = opts.IDBKeyRange;
  var globalSchema = this._dbSchema = {};
  var versions = [];
  var dbStoreNames = [];
  var allTables = {}; ///<var type="IDBDatabase" />

  var idbdb = null; // Instance of IDBDatabase

  var dbOpenError = null;
  var isBeingOpened = false;
  var onReadyBeingFired = null;
  var openComplete = false;
  var READONLY = "readonly",
      READWRITE = "readwrite";
  var db = this;
  var dbReadyResolve,
      dbReadyPromise = new Promise(function (resolve) {
    dbReadyResolve = resolve;
  }),
      cancelOpen,
      openCanceller = new Promise(function (_, reject) {
    cancelOpen = reject;
  });
  var autoSchema = true;
  var hasNativeGetDatabaseNames = !!getNativeGetDatabaseNamesFn(indexedDB),
      hasGetAll;

  function init() {
    // Default subscribers to "versionchange" and "blocked".
    // Can be overridden by custom handlers. If custom handlers return false, these default
    // behaviours will be prevented.
    db.on("versionchange", function (ev) {
      // Default behavior for versionchange event is to close database connection.
      // Caller can override this behavior by doing db.on("versionchange", function(){ return false; });
      // Let's not block the other window from making it's delete() or open() call.
      // NOTE! This event is never fired in IE,Edge or Safari.
      if (ev.newVersion > 0) console.warn("Another connection wants to upgrade database '" + db.name + "'. Closing db now to resume the upgrade.");else console.warn("Another connection wants to delete database '" + db.name + "'. Closing db now to resume the delete request.");
      db.close(); // In many web applications, it would be recommended to force window.reload()
      // when this event occurs. To do that, subscribe to the versionchange event
      // and call window.location.reload(true) if ev.newVersion > 0 (not a deletion)
      // The reason for this is that your current web app obviously has old schema code that needs
      // to be updated. Another window got a newer version of the app and needs to upgrade DB but
      // your window is blocking it unless we close it here.
    });
    db.on("blocked", function (ev) {
      if (!ev.newVersion || ev.newVersion < ev.oldVersion) console.warn("Dexie.delete('" + db.name + "') was blocked");else console.warn("Upgrade '" + db.name + "' blocked by other connection holding version " + ev.oldVersion / 10);
    });
  } //
  //
  //
  // ------------------------- Versioning Framework---------------------------
  //
  //
  //


  this.version = function (versionNumber) {
    /// <param name="versionNumber" type="Number"></param>
    /// <returns type="Version"></returns>
    if (idbdb || isBeingOpened) throw new exceptions.Schema("Cannot add version when database is open");
    this.verno = Math.max(this.verno, versionNumber);
    var versionInstance = versions.filter(function (v) {
      return v._cfg.version === versionNumber;
    })[0];
    if (versionInstance) return versionInstance;
    versionInstance = new Version(versionNumber);
    versions.push(versionInstance);
    versions.sort(lowerVersionFirst); // Disable autoschema mode, as at least one version is specified.

    autoSchema = false;
    return versionInstance;
  };

  function Version(versionNumber) {
    this._cfg = {
      version: versionNumber,
      storesSource: null,
      dbschema: {},
      tables: {},
      contentUpgrade: null
    };
    this.stores({}); // Derive earlier schemas by default.
  }

  extend(Version.prototype, {
    stores: function (stores) {
      /// <summary>
      ///   Defines the schema for a particular version
      /// </summary>
      /// <param name="stores" type="Object">
      /// Example: <br/>
      ///   {users: "id++,first,last,&amp;username,*email", <br/>
      ///   passwords: "id++,&amp;username"}<br/>
      /// <br/>
      /// Syntax: {Table: "[primaryKey][++],[&amp;][*]index1,[&amp;][*]index2,..."}<br/><br/>
      /// Special characters:<br/>
      ///  "&amp;"  means unique key, <br/>
      ///  "*"  means value is multiEntry, <br/>
      ///  "++" means auto-increment and only applicable for primary key <br/>
      /// </param>
      this._cfg.storesSource = this._cfg.storesSource ? extend(this._cfg.storesSource, stores) : stores; // Derive stores from earlier versions if they are not explicitely specified as null or a new syntax.

      var storesSpec = {};
      versions.forEach(function (version) {
        extend(storesSpec, version._cfg.storesSource);
      });
      var dbschema = this._cfg.dbschema = {};

      this._parseStoresSpec(storesSpec, dbschema); // Update the latest schema to this version
      // Update API


      globalSchema = db._dbSchema = dbschema;
      removeTablesApi([allTables, db, Transaction.prototype]); // Keep Transaction.prototype even though it should be depr.

      setApiOnPlace([allTables, db, Transaction.prototype, this._cfg.tables], keys(dbschema), dbschema);
      dbStoreNames = keys(dbschema);
      return this;
    },
    upgrade: function (upgradeFunction) {
      this._cfg.contentUpgrade = upgradeFunction;
      return this;
    },
    _parseStoresSpec: function (stores, outSchema) {
      keys(stores).forEach(function (tableName) {
        if (stores[tableName] !== null) {
          var instanceTemplate = {};
          var indexes = parseIndexSyntax(stores[tableName]);
          var primKey = indexes.shift();
          if (primKey.multi) throw new exceptions.Schema("Primary key cannot be multi-valued");
          if (primKey.keyPath) setByKeyPath(instanceTemplate, primKey.keyPath, primKey.auto ? 0 : primKey.keyPath);
          indexes.forEach(function (idx) {
            if (idx.auto) throw new exceptions.Schema("Only primary key can be marked as autoIncrement (++)");
            if (!idx.keyPath) throw new exceptions.Schema("Index must have a name and cannot be an empty string");
            setByKeyPath(instanceTemplate, idx.keyPath, idx.compound ? idx.keyPath.map(function () {
              return "";
            }) : "");
          });
          outSchema[tableName] = new TableSchema(tableName, primKey, indexes, instanceTemplate);
        }
      });
    }
  });

  function runUpgraders(oldVersion, idbtrans, reject) {
    var trans = db._createTransaction(READWRITE, dbStoreNames, globalSchema);

    trans.create(idbtrans);

    trans._completion.catch(reject);

    var rejectTransaction = trans._reject.bind(trans);

    newScope(function () {
      PSD.trans = trans;

      if (oldVersion === 0) {
        // Create tables:
        keys(globalSchema).forEach(function (tableName) {
          createTable(idbtrans, tableName, globalSchema[tableName].primKey, globalSchema[tableName].indexes);
        });
        Promise.follow(function () {
          return db.on.populate.fire(trans);
        }).catch(rejectTransaction);
      } else updateTablesAndIndexes(oldVersion, trans, idbtrans).catch(rejectTransaction);
    });
  }

  function updateTablesAndIndexes(oldVersion, trans, idbtrans) {
    // Upgrade version to version, step-by-step from oldest to newest version.
    // Each transaction object will contain the table set that was current in that version (but also not-yet-deleted tables from its previous version)
    var queue = [];
    var oldVersionStruct = versions.filter(function (version) {
      return version._cfg.version === oldVersion;
    })[0];
    if (!oldVersionStruct) throw new exceptions.Upgrade("Dexie specification of currently installed DB version is missing");
    globalSchema = db._dbSchema = oldVersionStruct._cfg.dbschema;
    var anyContentUpgraderHasRun = false;
    var versToRun = versions.filter(function (v) {
      return v._cfg.version > oldVersion;
    });
    versToRun.forEach(function (version) {
      /// <param name="version" type="Version"></param>
      queue.push(function () {
        var oldSchema = globalSchema;
        var newSchema = version._cfg.dbschema;
        adjustToExistingIndexNames(oldSchema, idbtrans);
        adjustToExistingIndexNames(newSchema, idbtrans);
        globalSchema = db._dbSchema = newSchema;
        var diff = getSchemaDiff(oldSchema, newSchema); // Add tables           

        diff.add.forEach(function (tuple) {
          createTable(idbtrans, tuple[0], tuple[1].primKey, tuple[1].indexes);
        }); // Change tables

        diff.change.forEach(function (change) {
          if (change.recreate) {
            throw new exceptions.Upgrade("Not yet support for changing primary key");
          } else {
            var store = idbtrans.objectStore(change.name); // Add indexes

            change.add.forEach(function (idx) {
              addIndex(store, idx);
            }); // Update indexes

            change.change.forEach(function (idx) {
              store.deleteIndex(idx.name);
              addIndex(store, idx);
            }); // Delete indexes

            change.del.forEach(function (idxName) {
              store.deleteIndex(idxName);
            });
          }
        });

        if (version._cfg.contentUpgrade) {
          anyContentUpgraderHasRun = true;
          return Promise.follow(function () {
            version._cfg.contentUpgrade(trans);
          });
        }
      });
      queue.push(function (idbtrans) {
        if (!anyContentUpgraderHasRun || !hasIEDeleteObjectStoreBug) {
          var newSchema = version._cfg.dbschema; // Delete old tables

          deleteRemovedTables(newSchema, idbtrans);
        }
      });
    }); // Now, create a queue execution engine

    function runQueue() {
      return queue.length ? Promise.resolve(queue.shift()(trans.idbtrans)).then(runQueue) : Promise.resolve();
    }

    return runQueue().then(function () {
      createMissingTables(globalSchema, idbtrans); // At last, make sure to create any missing tables. (Needed by addons that add stores to DB without specifying version)
    });
  }

  function getSchemaDiff(oldSchema, newSchema) {
    var diff = {
      del: [],
      add: [],
      change: [] // Array of {name: tableName, recreate: newDefinition, del: delIndexNames, add: newIndexDefs, change: changedIndexDefs}

    };

    for (var table in oldSchema) {
      if (!newSchema[table]) diff.del.push(table);
    }

    for (table in newSchema) {
      var oldDef = oldSchema[table],
          newDef = newSchema[table];

      if (!oldDef) {
        diff.add.push([table, newDef]);
      } else {
        var change = {
          name: table,
          def: newDef,
          recreate: false,
          del: [],
          add: [],
          change: []
        };

        if (oldDef.primKey.src !== newDef.primKey.src) {
          // Primary key has changed. Remove and re-add table.
          change.recreate = true;
          diff.change.push(change);
        } else {
          // Same primary key. Just find out what differs:
          var oldIndexes = oldDef.idxByName;
          var newIndexes = newDef.idxByName;

          for (var idxName in oldIndexes) {
            if (!newIndexes[idxName]) change.del.push(idxName);
          }

          for (idxName in newIndexes) {
            var oldIdx = oldIndexes[idxName],
                newIdx = newIndexes[idxName];
            if (!oldIdx) change.add.push(newIdx);else if (oldIdx.src !== newIdx.src) change.change.push(newIdx);
          }

          if (change.del.length > 0 || change.add.length > 0 || change.change.length > 0) {
            diff.change.push(change);
          }
        }
      }
    }

    return diff;
  }

  function createTable(idbtrans, tableName, primKey, indexes) {
    /// <param name="idbtrans" type="IDBTransaction"></param>
    var store = idbtrans.db.createObjectStore(tableName, primKey.keyPath ? {
      keyPath: primKey.keyPath,
      autoIncrement: primKey.auto
    } : {
      autoIncrement: primKey.auto
    });
    indexes.forEach(function (idx) {
      addIndex(store, idx);
    });
    return store;
  }

  function createMissingTables(newSchema, idbtrans) {
    keys(newSchema).forEach(function (tableName) {
      if (!idbtrans.db.objectStoreNames.contains(tableName)) {
        createTable(idbtrans, tableName, newSchema[tableName].primKey, newSchema[tableName].indexes);
      }
    });
  }

  function deleteRemovedTables(newSchema, idbtrans) {
    for (var i = 0; i < idbtrans.db.objectStoreNames.length; ++i) {
      var storeName = idbtrans.db.objectStoreNames[i];

      if (newSchema[storeName] == null) {
        idbtrans.db.deleteObjectStore(storeName);
      }
    }
  }

  function addIndex(store, idx) {
    store.createIndex(idx.name, idx.keyPath, {
      unique: idx.unique,
      multiEntry: idx.multi
    });
  } //
  //
  //      Dexie Protected API
  //
  //


  this._allTables = allTables;

  this._createTransaction = function (mode, storeNames, dbschema, parentTransaction) {
    return new Transaction(mode, storeNames, dbschema, parentTransaction);
  };
  /* Generate a temporary transaction when db operations are done outside a transaction scope.
  */


  function tempTransaction(mode, storeNames, fn) {
    if (!openComplete && !PSD.letThrough) {
      if (!isBeingOpened) {
        if (!autoOpen) return rejection(new exceptions.DatabaseClosed());
        db.open().catch(nop); // Open in background. If if fails, it will be catched by the final promise anyway.
      }

      return dbReadyPromise.then(function () {
        return tempTransaction(mode, storeNames, fn);
      });
    } else {
      var trans = db._createTransaction(mode, storeNames, globalSchema);

      try {
        trans.create();
      } catch (ex) {
        return rejection(ex);
      }

      return trans._promise(mode, function (resolve, reject) {
        return newScope(function () {
          PSD.trans = trans;
          return fn(resolve, reject, trans);
        });
      }).then(function (result) {
        // Instead of resolving value directly, wait with resolving it until transaction has completed.
        // Otherwise the data would not be in the DB if requesting it in the then() operation.
        // Specifically, to ensure that the following expression will work:
        //
        //   db.friends.put({name: "Arne"}).then(function () {
        //       db.friends.where("name").equals("Arne").count(function(count) {
        //           assert (count === 1);
        //       });
        //   });
        //
        return trans._completion.then(function () {
          return result;
        });
      });
      /*.catch(err => { // Don't do this as of now. If would affect bulk- and modify methods in a way that could be more intuitive. But wait! Maybe change in next major.
      trans._reject(err);
      return rejection(err);
      });*/
    }
  }

  this._whenReady = function (fn) {
    return openComplete || PSD.letThrough ? fn() : new Promise(function (resolve, reject) {
      if (!isBeingOpened) {
        if (!autoOpen) {
          reject(new exceptions.DatabaseClosed());
          return;
        }

        db.open().catch(nop); // Open in background. If if fails, it will be catched by the final promise anyway.
      }

      dbReadyPromise.then(resolve, reject);
    }).then(fn);
  }; //
  //
  //
  //
  //      Dexie API
  //
  //
  //


  this.verno = 0;

  this.open = function () {
    if (isBeingOpened || idbdb) return dbReadyPromise.then(function () {
      return dbOpenError ? rejection(dbOpenError) : db;
    });
    debug && (openCanceller._stackHolder = getErrorWithStack()); // Let stacks point to when open() was called rather than where new Dexie() was called.

    isBeingOpened = true;
    dbOpenError = null;
    openComplete = false; // Function pointers to call when the core opening process completes.

    var resolveDbReady = dbReadyResolve,
        // upgradeTransaction to abort on failure.
    upgradeTransaction = null;
    return Promise.race([openCanceller, new Promise(function (resolve, reject) {
      // Multiply db.verno with 10 will be needed to workaround upgrading bug in IE:
      // IE fails when deleting objectStore after reading from it.
      // A future version of Dexie.js will stopover an intermediate version to workaround this.
      // At that point, we want to be backward compatible. Could have been multiplied with 2, but by using 10, it is easier to map the number to the real version number.
      // If no API, throw!
      if (!indexedDB) throw new exceptions.MissingAPI("indexedDB API not found. If using IE10+, make sure to run your code on a server URL " + "(not locally). If using old Safari versions, make sure to include indexedDB polyfill.");
      var req = autoSchema ? indexedDB.open(dbName) : indexedDB.open(dbName, Math.round(db.verno * 10));
      if (!req) throw new exceptions.MissingAPI("IndexedDB API not available"); // May happen in Safari private mode, see https://github.com/dfahlander/Dexie.js/issues/134

      req.onerror = eventRejectHandler(reject);
      req.onblocked = wrap(fireOnBlocked);
      req.onupgradeneeded = wrap(function (e) {
        upgradeTransaction = req.transaction;

        if (autoSchema && !db._allowEmptyDB) {
          // Caller did not specify a version or schema. Doing that is only acceptable for opening alread existing databases.
          // If onupgradeneeded is called it means database did not exist. Reject the open() promise and make sure that we
          // do not create a new database by accident here.
          req.onerror = preventDefault; // Prohibit onabort error from firing before we're done!

          upgradeTransaction.abort(); // Abort transaction (would hope that this would make DB disappear but it doesnt.)
          // Close database and delete it.

          req.result.close();
          var delreq = indexedDB.deleteDatabase(dbName); // The upgrade transaction is atomic, and javascript is single threaded - meaning that there is no risk that we delete someone elses database here!

          delreq.onsuccess = delreq.onerror = wrap(function () {
            reject(new exceptions.NoSuchDatabase("Database " + dbName + " doesnt exist"));
          });
        } else {
          upgradeTransaction.onerror = eventRejectHandler(reject);
          var oldVer = e.oldVersion > Math.pow(2, 62) ? 0 : e.oldVersion; // Safari 8 fix.

          runUpgraders(oldVer / 10, upgradeTransaction, reject, req);
        }
      }, reject);
      req.onsuccess = wrap(function () {
        // Core opening procedure complete. Now let's just record some stuff.
        upgradeTransaction = null;
        idbdb = req.result;
        connections.push(db); // Used for emulating versionchange event on IE/Edge/Safari.

        if (autoSchema) readGlobalSchema();else if (idbdb.objectStoreNames.length > 0) {
          try {
            adjustToExistingIndexNames(globalSchema, idbdb.transaction(safariMultiStoreFix(idbdb.objectStoreNames), READONLY));
          } catch (e) {// Safari may bail out if > 1 store names. However, this shouldnt be a showstopper. Issue #120.
          }
        }
        idbdb.onversionchange = wrap(function (ev) {
          db._vcFired = true; // detect implementations that not support versionchange (IE/Edge/Safari)

          db.on("versionchange").fire(ev);
        });

        if (!hasNativeGetDatabaseNames && dbName !== '__dbnames') {
          dbNamesDB.dbnames.put({
            name: dbName
          }).catch(nop);
        }

        resolve();
      }, reject);
    })]).then(function () {
      // Before finally resolving the dbReadyPromise and this promise,
      // call and await all on('ready') subscribers:
      // Dexie.vip() makes subscribers able to use the database while being opened.
      // This is a must since these subscribers take part of the opening procedure.
      onReadyBeingFired = [];
      return Promise.resolve(Dexie.vip(db.on.ready.fire)).then(function fireRemainders() {
        if (onReadyBeingFired.length > 0) {
          // In case additional subscribers to db.on('ready') were added during the time db.on.ready.fire was executed.
          var remainders = onReadyBeingFired.reduce(promisableChain, nop);
          onReadyBeingFired = [];
          return Promise.resolve(Dexie.vip(remainders)).then(fireRemainders);
        }
      });
    }).finally(function () {
      onReadyBeingFired = null;
    }).then(function () {
      // Resolve the db.open() with the db instance.
      isBeingOpened = false;
      return db;
    }).catch(function (err) {
      try {
        // Did we fail within onupgradeneeded? Make sure to abort the upgrade transaction so it doesnt commit.
        upgradeTransaction && upgradeTransaction.abort();
      } catch (e) {}

      isBeingOpened = false; // Set before calling db.close() so that it doesnt reject openCanceller again (leads to unhandled rejection event).

      db.close(); // Closes and resets idbdb, removes connections, resets dbReadyPromise and openCanceller so that a later db.open() is fresh.
      // A call to db.close() may have made on-ready subscribers fail. Use dbOpenError if set, since err could be a follow-up error on that.

      dbOpenError = err; // Record the error. It will be used to reject further promises of db operations.

      return rejection(dbOpenError);
    }).finally(function () {
      openComplete = true;
      resolveDbReady(); // dbReadyPromise is resolved no matter if open() rejects or resolved. It's just to wake up waiters.
    });
  };

  this.close = function () {
    var idx = connections.indexOf(db);
    if (idx >= 0) connections.splice(idx, 1);

    if (idbdb) {
      try {
        idbdb.close();
      } catch (e) {}

      idbdb = null;
    }

    autoOpen = false;
    dbOpenError = new exceptions.DatabaseClosed();
    if (isBeingOpened) cancelOpen(dbOpenError); // Reset dbReadyPromise promise:

    dbReadyPromise = new Promise(function (resolve) {
      dbReadyResolve = resolve;
    });
    openCanceller = new Promise(function (_, reject) {
      cancelOpen = reject;
    });
  };

  this.delete = function () {
    var hasArguments = arguments.length > 0;
    return new Promise(function (resolve, reject) {
      if (hasArguments) throw new exceptions.InvalidArgument("Arguments not allowed in db.delete()");

      if (isBeingOpened) {
        dbReadyPromise.then(doDelete);
      } else {
        doDelete();
      }

      function doDelete() {
        db.close();
        var req = indexedDB.deleteDatabase(dbName);
        req.onsuccess = wrap(function () {
          if (!hasNativeGetDatabaseNames) {
            dbNamesDB.dbnames.delete(dbName).catch(nop);
          }

          resolve();
        });
        req.onerror = eventRejectHandler(reject);
        req.onblocked = fireOnBlocked;
      }
    });
  };

  this.backendDB = function () {
    return idbdb;
  };

  this.isOpen = function () {
    return idbdb !== null;
  };

  this.hasBeenClosed = function () {
    return dbOpenError && dbOpenError instanceof exceptions.DatabaseClosed;
  };

  this.hasFailed = function () {
    return dbOpenError !== null;
  };

  this.dynamicallyOpened = function () {
    return autoSchema;
  }; //
  // Properties
  //


  this.name = dbName; // db.tables - an array of all Table instances.

  props(this, {
    tables: {
      get: function () {
        /// <returns type="Array" elementType="Table" />
        return keys(allTables).map(function (name) {
          return allTables[name];
        });
      }
    }
  }); //
  // Events
  //

  this.on = Events(this, "populate", "blocked", "versionchange", {
    ready: [promisableChain, nop]
  });
  this.on.ready.subscribe = override(this.on.ready.subscribe, function (subscribe) {
    return function (subscriber, bSticky) {
      Dexie.vip(function () {
        if (openComplete) {
          // Database already open. Call subscriber asap.
          if (!dbOpenError) Promise.resolve().then(subscriber); // bSticky: Also subscribe to future open sucesses (after close / reopen) 

          if (bSticky) subscribe(subscriber);
        } else if (onReadyBeingFired) {
          // db.on('ready') subscribers are currently being executed and have not yet resolved or rejected
          onReadyBeingFired.push(subscriber);
          if (bSticky) subscribe(subscriber);
        } else {
          // Database not yet open. Subscribe to it.
          subscribe(subscriber); // If bSticky is falsy, make sure to unsubscribe subscriber when fired once.

          if (!bSticky) subscribe(function unsubscribe() {
            db.on.ready.unsubscribe(subscriber);
            db.on.ready.unsubscribe(unsubscribe);
          });
        }
      });
    };
  });

  this.transaction = function () {
    /// <summary>
    ///
    /// </summary>
    /// <param name="mode" type="String">"r" for readonly, or "rw" for readwrite</param>
    /// <param name="tableInstances">Table instance, Array of Table instances, String or String Array of object stores to include in the transaction</param>
    /// <param name="scopeFunc" type="Function">Function to execute with transaction</param>
    var args = extractTransactionArgs.apply(this, arguments);
    return this._transaction.apply(this, args);
  };

  function extractTransactionArgs(mode, _tableArgs_, scopeFunc) {
    // Let table arguments be all arguments between mode and last argument.
    var i = arguments.length;
    if (i < 2) throw new exceptions.InvalidArgument("Too few arguments"); // Prevent optimzation killer (https://github.com/petkaantonov/bluebird/wiki/Optimization-killers#32-leaking-arguments)
    // and clone arguments except the first one into local var 'args'.

    var args = new Array(i - 1);

    while (--i) args[i - 1] = arguments[i]; // Let scopeFunc be the last argument and pop it so that args now only contain the table arguments.


    scopeFunc = args.pop();
    var tables = flatten(args); // Support using array as middle argument, or a mix of arrays and non-arrays.

    return [mode, tables, scopeFunc];
  }

  this._transaction = function (mode, tables, scopeFunc) {
    var parentTransaction = PSD.trans; // Check if parent transactions is bound to this db instance, and if caller wants to reuse it

    if (!parentTransaction || parentTransaction.db !== db || mode.indexOf('!') !== -1) parentTransaction = null;
    var onlyIfCompatible = mode.indexOf('?') !== -1;
    mode = mode.replace('!', '').replace('?', ''); // Ok. Will change arguments[0] as well but we wont touch arguments henceforth.

    try {
      //
      // Get storeNames from arguments. Either through given table instances, or through given table names.
      //
      var storeNames = tables.map(function (table) {
        var storeName = table instanceof Table ? table.name : table;
        if (typeof storeName !== 'string') throw new TypeError("Invalid table argument to Dexie.transaction(). Only Table or String are allowed");
        return storeName;
      }); //
      // Resolve mode. Allow shortcuts "r" and "rw".
      //

      if (mode == "r" || mode == READONLY) mode = READONLY;else if (mode == "rw" || mode == READWRITE) mode = READWRITE;else throw new exceptions.InvalidArgument("Invalid transaction mode: " + mode);

      if (parentTransaction) {
        // Basic checks
        if (parentTransaction.mode === READONLY && mode === READWRITE) {
          if (onlyIfCompatible) {
            // Spawn new transaction instead.
            parentTransaction = null;
          } else throw new exceptions.SubTransaction("Cannot enter a sub-transaction with READWRITE mode when parent transaction is READONLY");
        }

        if (parentTransaction) {
          storeNames.forEach(function (storeName) {
            if (parentTransaction && parentTransaction.storeNames.indexOf(storeName) === -1) {
              if (onlyIfCompatible) {
                // Spawn new transaction instead.
                parentTransaction = null;
              } else throw new exceptions.SubTransaction("Table " + storeName + " not included in parent transaction.");
            }
          });
        }

        if (onlyIfCompatible && parentTransaction && !parentTransaction.active) {
          // '?' mode should not keep using an inactive transaction.
          parentTransaction = null;
        }
      }
    } catch (e) {
      return parentTransaction ? parentTransaction._promise(null, function (_, reject) {
        reject(e);
      }) : rejection(e);
    } // If this is a sub-transaction, lock the parent and then launch the sub-transaction.


    return parentTransaction ? parentTransaction._promise(mode, enterTransactionScope, "lock") : PSD.trans ? // no parent transaction despite PSD.trans exists. Make sure also
    // that the zone we create is not a sub-zone of current, because
    // Promise.follow() should not wait for it if so.
    usePSD(PSD.transless, function () {
      return db._whenReady(enterTransactionScope);
    }) : db._whenReady(enterTransactionScope);

    function enterTransactionScope() {
      return Promise.resolve().then(function () {
        // Keep a pointer to last non-transactional PSD to use if someone calls Dexie.ignoreTransaction().
        var transless = PSD.transless || PSD; // Our transaction.
        //return new Promise((resolve, reject) => {

        var trans = db._createTransaction(mode, storeNames, globalSchema, parentTransaction); // Let the transaction instance be part of a Promise-specific data (PSD) value.


        var zoneProps = {
          trans: trans,
          transless: transless
        };

        if (parentTransaction) {
          // Emulate transaction commit awareness for inner transaction (must 'commit' when the inner transaction has no more operations ongoing)
          trans.idbtrans = parentTransaction.idbtrans;
        } else {
          trans.create(); // Create the backend transaction so that complete() or error() will trigger even if no operation is made upon it.
        } // Support for native async await.


        if (scopeFunc.constructor === AsyncFunction) {
          incrementExpectedAwaits();
        }

        var returnValue;
        var promiseFollowed = Promise.follow(function () {
          // Finally, call the scope function with our table and transaction arguments.
          returnValue = scopeFunc.call(trans, trans);

          if (returnValue) {
            if (returnValue.constructor === NativePromise) {
              var decrementor = decrementExpectedAwaits.bind(null, null);
              returnValue.then(decrementor, decrementor);
            } else if (typeof returnValue.next === 'function' && typeof returnValue.throw === 'function') {
              // scopeFunc returned an iterator with throw-support. Handle yield as await.
              returnValue = awaitIterator(returnValue);
            }
          }
        }, zoneProps);
        return (returnValue && typeof returnValue.then === 'function' ? // Promise returned. User uses promise-style transactions.
        Promise.resolve(returnValue).then(function (x) {
          return trans.active ? x // Transaction still active. Continue.
          : rejection(new exceptions.PrematureCommit("Transaction committed too early. See http://bit.ly/2kdckMn"));
        }) // No promise returned. Wait for all outstanding promises before continuing. 
        : promiseFollowed.then(function () {
          return returnValue;
        })).then(function (x) {
          // sub transactions don't react to idbtrans.oncomplete. We must trigger a completion:
          if (parentTransaction) trans._resolve(); // wait for trans._completion
          // (if root transaction, this means 'complete' event. If sub-transaction, we've just fired it ourselves)

          return trans._completion.then(function () {
            return x;
          });
        }).catch(function (e) {
          trans._reject(e); // Yes, above then-handler were maybe not called because of an unhandled rejection in scopeFunc!


          return rejection(e);
        });
      });
    }
  };

  this.table = function (tableName) {
    /// <returns type="Table"></returns>
    if (!hasOwn(allTables, tableName)) {
      throw new exceptions.InvalidTable("Table " + tableName + " does not exist");
    }

    return allTables[tableName];
  }; //
  //
  //
  // Table Class
  //
  //
  //


  function Table(name, tableSchema, optionalTrans) {
    /// <param name="name" type="String"></param>
    this.name = name;
    this.schema = tableSchema;
    this._tx = optionalTrans;
    this.hook = allTables[name] ? allTables[name].hook : Events(null, {
      "creating": [hookCreatingChain, nop],
      "reading": [pureFunctionChain, mirror],
      "updating": [hookUpdatingChain, nop],
      "deleting": [hookDeletingChain, nop]
    });
  }

  function BulkErrorHandlerCatchAll(errorList, done, supportHooks) {
    return (supportHooks ? hookedEventRejectHandler : eventRejectHandler)(function (e) {
      errorList.push(e);
      done && done();
    });
  }

  function bulkDelete(idbstore, trans, keysOrTuples, hasDeleteHook, deletingHook) {
    // If hasDeleteHook, keysOrTuples must be an array of tuples: [[key1, value2],[key2,value2],...],
    // else keysOrTuples must be just an array of keys: [key1, key2, ...].
    return new Promise(function (resolve, reject) {
      var len = keysOrTuples.length,
          lastItem = len - 1;
      if (len === 0) return resolve();

      if (!hasDeleteHook) {
        for (var i = 0; i < len; ++i) {
          var req = idbstore.delete(keysOrTuples[i]);
          req.onerror = eventRejectHandler(reject);
          if (i === lastItem) req.onsuccess = wrap(function () {
            return resolve();
          });
        }
      } else {
        var hookCtx,
            errorHandler = hookedEventRejectHandler(reject),
            successHandler = hookedEventSuccessHandler(null);
        tryCatch(function () {
          for (var i = 0; i < len; ++i) {
            hookCtx = {
              onsuccess: null,
              onerror: null
            };
            var tuple = keysOrTuples[i];
            deletingHook.call(hookCtx, tuple[0], tuple[1], trans);
            var req = idbstore.delete(tuple[0]);
            req._hookCtx = hookCtx;
            req.onerror = errorHandler;
            if (i === lastItem) req.onsuccess = hookedEventSuccessHandler(resolve);else req.onsuccess = successHandler;
          }
        }, function (err) {
          hookCtx.onerror && hookCtx.onerror(err);
          throw err;
        });
      }
    });
  }

  props(Table.prototype, {
    //
    // Table Protected Methods
    //
    _trans: function getTransaction(mode, fn, writeLocked) {
      var trans = this._tx || PSD.trans;
      return trans && trans.db === db ? trans === PSD.trans ? trans._promise(mode, fn, writeLocked) : newScope(function () {
        return trans._promise(mode, fn, writeLocked);
      }, {
        trans: trans,
        transless: PSD.transless || PSD
      }) : tempTransaction(mode, [this.name], fn);
    },
    _idbstore: function getIDBObjectStore(mode, fn, writeLocked) {
      var tableName = this.name;

      function supplyIdbStore(resolve, reject, trans) {
        if (trans.storeNames.indexOf(tableName) === -1) throw new exceptions.NotFound("Table" + tableName + " not part of transaction");
        return fn(resolve, reject, trans.idbtrans.objectStore(tableName), trans);
      }

      return this._trans(mode, supplyIdbStore, writeLocked);
    },
    //
    // Table Public Methods
    //
    get: function (keyOrCrit, cb) {
      if (keyOrCrit && keyOrCrit.constructor === Object) return this.where(keyOrCrit).first(cb);
      var self = this;
      return this._idbstore(READONLY, function (resolve, reject, idbstore) {
        var req = idbstore.get(keyOrCrit);
        req.onerror = eventRejectHandler(reject);
        req.onsuccess = wrap(function () {
          resolve(self.hook.reading.fire(req.result));
        }, reject);
      }).then(cb);
    },
    where: function (indexOrCrit) {
      if (typeof indexOrCrit === 'string') return new WhereClause(this, indexOrCrit);
      if (isArray(indexOrCrit)) return new WhereClause(this, "[" + indexOrCrit.join('+') + "]"); // indexOrCrit is an object map of {[keyPath]:value} 

      var keyPaths = keys(indexOrCrit);
      if (keyPaths.length === 1) // Only one critera. This was the easy case:
        return this.where(keyPaths[0]).equals(indexOrCrit[keyPaths[0]]); // Multiple criterias.
      // Let's try finding a compound index that matches all keyPaths in
      // arbritary order:

      var compoundIndex = this.schema.indexes.concat(this.schema.primKey).filter(function (ix) {
        return ix.compound && keyPaths.every(function (keyPath) {
          return ix.keyPath.indexOf(keyPath) >= 0;
        }) && ix.keyPath.every(function (keyPath) {
          return keyPaths.indexOf(keyPath) >= 0;
        });
      })[0];
      if (compoundIndex && maxKey !== maxString) // Cool! We found such compound index
        // and this browser supports compound indexes (maxKey !== maxString)!
        return this.where(compoundIndex.name).equals(compoundIndex.keyPath.map(function (kp) {
          return indexOrCrit[kp];
        }));
      if (!compoundIndex) console.warn("The query " + JSON.stringify(indexOrCrit) + " on " + this.name + " would benefit of a " + ("compound index [" + keyPaths.join('+') + "]")); // Ok, now let's fallback to finding at least one matching index
      // and filter the rest.

      var idxByName = this.schema.idxByName;
      var simpleIndex = keyPaths.reduce(function (r, keyPath) {
        return [r[0] || idxByName[keyPath], r[0] || !idxByName[keyPath] ? combine(r[1], function (x) {
          return '' + getByKeyPath(x, keyPath) == '' + indexOrCrit[keyPath];
        }) : r[1]];
      }, [null, null]);
      var idx = simpleIndex[0];
      return idx ? this.where(idx.name).equals(indexOrCrit[idx.keyPath]).filter(simpleIndex[1]) : compoundIndex ? this.filter(simpleIndex[1]) : // Has compound but browser bad. Allow filter.
      this.where(keyPaths).equals(''); // No index at all. Fail lazily.
    },
    count: function (cb) {
      return this.toCollection().count(cb);
    },
    offset: function (offset) {
      return this.toCollection().offset(offset);
    },
    limit: function (numRows) {
      return this.toCollection().limit(numRows);
    },
    reverse: function () {
      return this.toCollection().reverse();
    },
    filter: function (filterFunction) {
      return this.toCollection().and(filterFunction);
    },
    each: function (fn) {
      return this.toCollection().each(fn);
    },
    toArray: function (cb) {
      return this.toCollection().toArray(cb);
    },
    orderBy: function (index) {
      return new Collection(new WhereClause(this, isArray(index) ? "[" + index.join('+') + "]" : index));
    },
    toCollection: function () {
      return new Collection(new WhereClause(this));
    },
    mapToClass: function (constructor, structure) {
      /// <summary>
      ///     Map table to a javascript constructor function. Objects returned from the database will be instances of this class, making
      ///     it possible to the instanceOf operator as well as extending the class using constructor.prototype.method = function(){...}.
      /// </summary>
      /// <param name="constructor">Constructor function representing the class.</param>
      /// <param name="structure" optional="true">Helps IDE code completion by knowing the members that objects contain and not just the indexes. Also
      /// know what type each member has. Example: {name: String, emailAddresses: [String], password}</param>
      this.schema.mappedClass = constructor;
      var instanceTemplate = Object.create(constructor.prototype);

      if (structure) {
        // structure and instanceTemplate is for IDE code competion only while constructor.prototype is for actual inheritance.
        applyStructure(instanceTemplate, structure);
      }

      this.schema.instanceTemplate = instanceTemplate; // Now, subscribe to the when("reading") event to make all objects that come out from this table inherit from given class
      // no matter which method to use for reading (Table.get() or Table.where(...)... )

      var readHook = function (obj) {
        if (!obj) return obj; // No valid object. (Value is null). Return as is.
        // Create a new object that derives from constructor:

        var res = Object.create(constructor.prototype); // Clone members:

        for (var m in obj) if (hasOwn(obj, m)) try {
          res[m] = obj[m];
        } catch (_) {}

        return res;
      };

      if (this.schema.readHook) {
        this.hook.reading.unsubscribe(this.schema.readHook);
      }

      this.schema.readHook = readHook;
      this.hook("reading", readHook);
      return constructor;
    },
    defineClass: function (structure) {
      /// <summary>
      ///     Define all members of the class that represents the table. This will help code completion of when objects are read from the database
      ///     as well as making it possible to extend the prototype of the returned constructor function.
      /// </summary>
      /// <param name="structure">Helps IDE code completion by knowing the members that objects contain and not just the indexes. Also
      /// know what type each member has. Example: {name: String, emailAddresses: [String], properties: {shoeSize: Number}}</param>
      return this.mapToClass(Dexie.defineClass(structure), structure);
    },
    bulkDelete: function (keys$$1) {
      if (this.hook.deleting.fire === nop) {
        return this._idbstore(READWRITE, function (resolve, reject, idbstore, trans) {
          resolve(bulkDelete(idbstore, trans, keys$$1, false, nop));
        });
      } else {
        return this.where(':id').anyOf(keys$$1).delete().then(function () {}); // Resolve with undefined.
      }
    },
    bulkPut: function (objects, keys$$1) {
      var _this = this;

      return this._idbstore(READWRITE, function (resolve, reject, idbstore) {
        if (!idbstore.keyPath && !_this.schema.primKey.auto && !keys$$1) throw new exceptions.InvalidArgument("bulkPut() with non-inbound keys requires keys array in second argument");
        if (idbstore.keyPath && keys$$1) throw new exceptions.InvalidArgument("bulkPut(): keys argument invalid on tables with inbound keys");
        if (keys$$1 && keys$$1.length !== objects.length) throw new exceptions.InvalidArgument("Arguments objects and keys must have the same length");
        if (objects.length === 0) return resolve(); // Caller provided empty list.

        var done = function (result) {
          if (errorList.length === 0) resolve(result);else reject(new BulkError(_this.name + ".bulkPut(): " + errorList.length + " of " + numObjs + " operations failed", errorList));
        };

        var req,
            errorList = [],
            errorHandler,
            numObjs = objects.length,
            table = _this;

        if (_this.hook.creating.fire === nop && _this.hook.updating.fire === nop) {
          //
          // Standard Bulk (no 'creating' or 'updating' hooks to care about)
          //
          errorHandler = BulkErrorHandlerCatchAll(errorList);

          for (var i = 0, l = objects.length; i < l; ++i) {
            req = keys$$1 ? idbstore.put(objects[i], keys$$1[i]) : idbstore.put(objects[i]);
            req.onerror = errorHandler;
          } // Only need to catch success or error on the last operation
          // according to the IDB spec.


          req.onerror = BulkErrorHandlerCatchAll(errorList, done);
          req.onsuccess = eventSuccessHandler(done);
        } else {
          var effectiveKeys = keys$$1 || idbstore.keyPath && objects.map(function (o) {
            return getByKeyPath(o, idbstore.keyPath);
          }); // Generate map of {[key]: object}

          var objectLookup = effectiveKeys && arrayToObject(effectiveKeys, function (key, i) {
            return key != null && [key, objects[i]];
          });
          var promise = !effectiveKeys ? // Auto-incremented key-less objects only without any keys argument.
          table.bulkAdd(objects) : // Keys provided. Either as inbound in provided objects, or as a keys argument.
          // Begin with updating those that exists in DB:
          table.where(':id').anyOf(effectiveKeys.filter(function (key) {
            return key != null;
          })).modify(function () {
            this.value = objectLookup[this.primKey];
            objectLookup[this.primKey] = null; // Mark as "don't add this"
          }).catch(ModifyError, function (e) {
            errorList = e.failures; // No need to concat here. These are the first errors added.
          }).then(function () {
            // Now, let's examine which items didnt exist so we can add them:
            var objsToAdd = [],
                keysToAdd = keys$$1 && []; // Iterate backwards. Why? Because if same key was used twice, just add the last one.

            for (var i = effectiveKeys.length - 1; i >= 0; --i) {
              var key = effectiveKeys[i];

              if (key == null || objectLookup[key]) {
                objsToAdd.push(objects[i]);
                keys$$1 && keysToAdd.push(key);
                if (key != null) objectLookup[key] = null; // Mark as "dont add again"
              }
            } // The items are in reverse order so reverse them before adding.
            // Could be important in order to get auto-incremented keys the way the caller
            // would expect. Could have used unshift instead of push()/reverse(),
            // but: http://jsperf.com/unshift-vs-reverse


            objsToAdd.reverse();
            keys$$1 && keysToAdd.reverse();
            return table.bulkAdd(objsToAdd, keysToAdd);
          }).then(function (lastAddedKey) {
            // Resolve with key of the last object in given arguments to bulkPut():
            var lastEffectiveKey = effectiveKeys[effectiveKeys.length - 1]; // Key was provided.

            return lastEffectiveKey != null ? lastEffectiveKey : lastAddedKey;
          });
          promise.then(done).catch(BulkError, function (e) {
            // Concat failure from ModifyError and reject using our 'done' method.
            errorList = errorList.concat(e.failures);
            done();
          }).catch(reject);
        }
      }, "locked"); // If called from transaction scope, lock transaction til all steps are done.
    },
    bulkAdd: function (objects, keys$$1) {
      var self = this,
          creatingHook = this.hook.creating.fire;
      return this._idbstore(READWRITE, function (resolve, reject, idbstore, trans) {
        if (!idbstore.keyPath && !self.schema.primKey.auto && !keys$$1) throw new exceptions.InvalidArgument("bulkAdd() with non-inbound keys requires keys array in second argument");
        if (idbstore.keyPath && keys$$1) throw new exceptions.InvalidArgument("bulkAdd(): keys argument invalid on tables with inbound keys");
        if (keys$$1 && keys$$1.length !== objects.length) throw new exceptions.InvalidArgument("Arguments objects and keys must have the same length");
        if (objects.length === 0) return resolve(); // Caller provided empty list.

        function done(result) {
          if (errorList.length === 0) resolve(result);else reject(new BulkError(self.name + ".bulkAdd(): " + errorList.length + " of " + numObjs + " operations failed", errorList));
        }

        var req,
            errorList = [],
            errorHandler,
            successHandler,
            numObjs = objects.length;

        if (creatingHook !== nop) {
          //
          // There are subscribers to hook('creating')
          // Must behave as documented.
          //
          var keyPath = idbstore.keyPath,
              hookCtx;
          errorHandler = BulkErrorHandlerCatchAll(errorList, null, true);
          successHandler = hookedEventSuccessHandler(null);
          tryCatch(function () {
            for (var i = 0, l = objects.length; i < l; ++i) {
              hookCtx = {
                onerror: null,
                onsuccess: null
              };
              var key = keys$$1 && keys$$1[i];
              var obj = objects[i],
                  effectiveKey = keys$$1 ? key : keyPath ? getByKeyPath(obj, keyPath) : undefined,
                  keyToUse = creatingHook.call(hookCtx, effectiveKey, obj, trans);

              if (effectiveKey == null && keyToUse != null) {
                if (keyPath) {
                  obj = deepClone(obj);
                  setByKeyPath(obj, keyPath, keyToUse);
                } else {
                  key = keyToUse;
                }
              }

              req = key != null ? idbstore.add(obj, key) : idbstore.add(obj);
              req._hookCtx = hookCtx;

              if (i < l - 1) {
                req.onerror = errorHandler;
                if (hookCtx.onsuccess) req.onsuccess = successHandler;
              }
            }
          }, function (err) {
            hookCtx.onerror && hookCtx.onerror(err);
            throw err;
          });
          req.onerror = BulkErrorHandlerCatchAll(errorList, done, true);
          req.onsuccess = hookedEventSuccessHandler(done);
        } else {
          //
          // Standard Bulk (no 'creating' hook to care about)
          //
          errorHandler = BulkErrorHandlerCatchAll(errorList);

          for (var i = 0, l = objects.length; i < l; ++i) {
            req = keys$$1 ? idbstore.add(objects[i], keys$$1[i]) : idbstore.add(objects[i]);
            req.onerror = errorHandler;
          } // Only need to catch success or error on the last operation
          // according to the IDB spec.


          req.onerror = BulkErrorHandlerCatchAll(errorList, done);
          req.onsuccess = eventSuccessHandler(done);
        }
      });
    },
    add: function (obj, key) {
      /// <summary>
      ///   Add an object to the database. In case an object with same primary key already exists, the object will not be added.
      /// </summary>
      /// <param name="obj" type="Object">A javascript object to insert</param>
      /// <param name="key" optional="true">Primary key</param>
      var creatingHook = this.hook.creating.fire;
      return this._idbstore(READWRITE, function (resolve, reject, idbstore, trans) {
        var hookCtx = {
          onsuccess: null,
          onerror: null
        };

        if (creatingHook !== nop) {
          var effectiveKey = key != null ? key : idbstore.keyPath ? getByKeyPath(obj, idbstore.keyPath) : undefined;
          var keyToUse = creatingHook.call(hookCtx, effectiveKey, obj, trans); // Allow subscribers to when("creating") to generate the key.

          if (effectiveKey == null && keyToUse != null) {
            if (idbstore.keyPath) setByKeyPath(obj, idbstore.keyPath, keyToUse);else key = keyToUse;
          }
        }

        try {
          var req = key != null ? idbstore.add(obj, key) : idbstore.add(obj);
          req._hookCtx = hookCtx;
          req.onerror = hookedEventRejectHandler(reject);
          req.onsuccess = hookedEventSuccessHandler(function (result) {
            // TODO: Remove these two lines in next major release (2.0?)
            // It's no good practice to have side effects on provided parameters
            var keyPath = idbstore.keyPath;
            if (keyPath) setByKeyPath(obj, keyPath, result);
            resolve(result);
          });
        } catch (e) {
          if (hookCtx.onerror) hookCtx.onerror(e);
          throw e;
        }
      });
    },
    put: function (obj, key) {
      var _this = this; /// <summary>
      ///   Add an object to the database but in case an object with same primary key alread exists, the existing one will get updated.
      /// </summary>
      /// <param name="obj" type="Object">A javascript object to insert or update</param>
      /// <param name="key" optional="true">Primary key</param>


      var creatingHook = this.hook.creating.fire,
          updatingHook = this.hook.updating.fire;

      if (creatingHook !== nop || updatingHook !== nop) {
        //
        // People listens to when("creating") or when("updating") events!
        // We must know whether the put operation results in an CREATE or UPDATE.
        //
        var keyPath = this.schema.primKey.keyPath;
        var effectiveKey = key !== undefined ? key : keyPath && getByKeyPath(obj, keyPath);
        if (effectiveKey == null) return this.add(obj); // Since key is optional, make sure we get it from obj if not provided
        // Primary key exist. Lock transaction and try modifying existing. If nothing modified, call add().
        // clone obj before this async call. If caller modifies obj the line after put(), the IDB spec requires that it should not affect operation.

        obj = deepClone(obj);
        return this._trans(READWRITE, function () {
          return _this.where(":id").equals(effectiveKey).modify(function () {
            // Replace extisting value with our object
            // CRUD event firing handled in Collection.modify()
            this.value = obj;
          }).then(function (count) {
            return count === 0 ? _this.add(obj, key) : effectiveKey;
          });
        }, "locked"); // Lock needed because operation is splitted into modify() and add().
      } else {
        // Use the standard IDB put() method.
        return this._idbstore(READWRITE, function (resolve, reject, idbstore) {
          var req = key !== undefined ? idbstore.put(obj, key) : idbstore.put(obj);
          req.onerror = eventRejectHandler(reject);
          req.onsuccess = wrap(function (ev) {
            var keyPath = idbstore.keyPath;
            if (keyPath) setByKeyPath(obj, keyPath, ev.target.result);
            resolve(req.result);
          });
        });
      }
    },
    'delete': function (key) {
      /// <param name="key">Primary key of the object to delete</param>
      if (this.hook.deleting.subscribers.length) {
        // People listens to when("deleting") event. Must implement delete using Collection.delete() that will
        // call the CRUD event. Only Collection.delete() will know whether an object was actually deleted.
        return this.where(":id").equals(key).delete();
      } else {
        // No one listens. Use standard IDB delete() method.
        return this._idbstore(READWRITE, function (resolve, reject, idbstore) {
          var req = idbstore.delete(key);
          req.onerror = eventRejectHandler(reject);
          req.onsuccess = wrap(function () {
            resolve(req.result);
          });
        });
      }
    },
    clear: function () {
      if (this.hook.deleting.subscribers.length) {
        // People listens to when("deleting") event. Must implement delete using Collection.delete() that will
        // call the CRUD event. Only Collection.delete() will knows which objects that are actually deleted.
        return this.toCollection().delete();
      } else {
        return this._idbstore(READWRITE, function (resolve, reject, idbstore) {
          var req = idbstore.clear();
          req.onerror = eventRejectHandler(reject);
          req.onsuccess = wrap(function () {
            resolve(req.result);
          });
        });
      }
    },
    update: function (keyOrObject, modifications) {
      if (typeof modifications !== 'object' || isArray(modifications)) throw new exceptions.InvalidArgument("Modifications must be an object.");

      if (typeof keyOrObject === 'object' && !isArray(keyOrObject)) {
        // object to modify. Also modify given object with the modifications:
        keys(modifications).forEach(function (keyPath) {
          setByKeyPath(keyOrObject, keyPath, modifications[keyPath]);
        });
        var key = getByKeyPath(keyOrObject, this.schema.primKey.keyPath);
        if (key === undefined) return rejection(new exceptions.InvalidArgument("Given object does not contain its primary key"));
        return this.where(":id").equals(key).modify(modifications);
      } else {
        // key to modify
        return this.where(":id").equals(keyOrObject).modify(modifications);
      }
    }
  }); //
  //
  //
  // Transaction Class
  //
  //
  //

  function Transaction(mode, storeNames, dbschema, parent) {
    var _this = this; /// <summary>
    ///    Transaction class. Represents a database transaction. All operations on db goes through a Transaction.
    /// </summary>
    /// <param name="mode" type="String">Any of "readwrite" or "readonly"</param>
    /// <param name="storeNames" type="Array">Array of table names to operate on</param>


    this.db = db;
    this.mode = mode;
    this.storeNames = storeNames;
    this.idbtrans = null;
    this.on = Events(this, "complete", "error", "abort");
    this.parent = parent || null;
    this.active = true;
    this._reculock = 0;
    this._blockedFuncs = [];
    this._resolve = null;
    this._reject = null;
    this._waitingFor = null;
    this._waitingQueue = null;
    this._spinCount = 0; // Just for debugging waitFor()

    this._completion = new Promise(function (resolve, reject) {
      _this._resolve = resolve;
      _this._reject = reject;
    });

    this._completion.then(function () {
      _this.active = false;

      _this.on.complete.fire();
    }, function (e) {
      var wasActive = _this.active;
      _this.active = false;

      _this.on.error.fire(e);

      _this.parent ? _this.parent._reject(e) : wasActive && _this.idbtrans && _this.idbtrans.abort();
      return rejection(e); // Indicate we actually DO NOT catch this error.
    });
  }

  props(Transaction.prototype, {
    //
    // Transaction Protected Methods (not required by API users, but needed internally and eventually by dexie extensions)
    //
    _lock: function () {
      assert(!PSD.global); // Locking and unlocking reuires to be within a PSD scope.
      // Temporary set all requests into a pending queue if they are called before database is ready.

      ++this._reculock; // Recursive read/write lock pattern using PSD (Promise Specific Data) instead of TLS (Thread Local Storage)

      if (this._reculock === 1 && !PSD.global) PSD.lockOwnerFor = this;
      return this;
    },
    _unlock: function () {
      assert(!PSD.global); // Locking and unlocking reuires to be within a PSD scope.

      if (--this._reculock === 0) {
        if (!PSD.global) PSD.lockOwnerFor = null;

        while (this._blockedFuncs.length > 0 && !this._locked()) {
          var fnAndPSD = this._blockedFuncs.shift();

          try {
            usePSD(fnAndPSD[1], fnAndPSD[0]);
          } catch (e) {}
        }
      }

      return this;
    },
    _locked: function () {
      // Checks if any write-lock is applied on this transaction.
      // To simplify the Dexie API for extension implementations, we support recursive locks.
      // This is accomplished by using "Promise Specific Data" (PSD).
      // PSD data is bound to a Promise and any child Promise emitted through then() or resolve( new Promise() ).
      // PSD is local to code executing on top of the call stacks of any of any code executed by Promise():
      //         * callback given to the Promise() constructor  (function (resolve, reject){...})
      //         * callbacks given to then()/catch()/finally() methods (function (value){...})
      // If creating a new independant Promise instance from within a Promise call stack, the new Promise will derive the PSD from the call stack of the parent Promise.
      // Derivation is done so that the inner PSD __proto__ points to the outer PSD.
      // PSD.lockOwnerFor will point to current transaction object if the currently executing PSD scope owns the lock.
      return this._reculock && PSD.lockOwnerFor !== this;
    },
    create: function (idbtrans) {
      var _this = this;

      if (!this.mode) return this;
      assert(!this.idbtrans);

      if (!idbtrans && !idbdb) {
        switch (dbOpenError && dbOpenError.name) {
          case "DatabaseClosedError":
            // Errors where it is no difference whether it was caused by the user operation or an earlier call to db.open()
            throw new exceptions.DatabaseClosed(dbOpenError);

          case "MissingAPIError":
            // Errors where it is no difference whether it was caused by the user operation or an earlier call to db.open()
            throw new exceptions.MissingAPI(dbOpenError.message, dbOpenError);

          default:
            // Make it clear that the user operation was not what caused the error - the error had occurred earlier on db.open()!
            throw new exceptions.OpenFailed(dbOpenError);
        }
      }

      if (!this.active) throw new exceptions.TransactionInactive();
      assert(this._completion._state === null);
      idbtrans = this.idbtrans = idbtrans || idbdb.transaction(safariMultiStoreFix(this.storeNames), this.mode);
      idbtrans.onerror = wrap(function (ev) {
        preventDefault(ev); // Prohibit default bubbling to window.error

        _this._reject(idbtrans.error);
      });
      idbtrans.onabort = wrap(function (ev) {
        preventDefault(ev);
        _this.active && _this._reject(new exceptions.Abort(idbtrans.error));
        _this.active = false;

        _this.on("abort").fire(ev);
      });
      idbtrans.oncomplete = wrap(function () {
        _this.active = false;

        _this._resolve();
      });
      return this;
    },
    _promise: function (mode, fn, bWriteLock) {
      var _this = this;

      if (mode === READWRITE && this.mode !== READWRITE) return rejection(new exceptions.ReadOnly("Transaction is readonly"));
      if (!this.active) return rejection(new exceptions.TransactionInactive());

      if (this._locked()) {
        return new Promise(function (resolve, reject) {
          _this._blockedFuncs.push([function () {
            _this._promise(mode, fn, bWriteLock).then(resolve, reject);
          }, PSD]);
        });
      } else if (bWriteLock) {
        return newScope(function () {
          var p = new Promise(function (resolve, reject) {
            _this._lock();

            var rv = fn(resolve, reject, _this);
            if (rv && rv.then) rv.then(resolve, reject);
          });
          p.finally(function () {
            return _this._unlock();
          });
          p._lib = true;
          return p;
        });
      } else {
        var p = new Promise(function (resolve, reject) {
          var rv = fn(resolve, reject, _this);
          if (rv && rv.then) rv.then(resolve, reject);
        });
        p._lib = true;
        return p;
      }
    },
    _root: function () {
      return this.parent ? this.parent._root() : this;
    },
    waitFor: function (promise) {
      // Always operate on the root transaction (in case this is a sub stransaction)
      var root = this._root(); // For stability reasons, convert parameter to promise no matter what type is passed to waitFor().
      // (We must be able to call .then() on it.)


      promise = Promise.resolve(promise);

      if (root._waitingFor) {
        // Already called waitFor(). Wait for both to complete.
        root._waitingFor = root._waitingFor.then(function () {
          return promise;
        });
      } else {
        // We're not in waiting state. Start waiting state.
        root._waitingFor = promise;
        root._waitingQueue = []; // Start interacting with indexedDB until promise completes:

        var store = root.idbtrans.objectStore(root.storeNames[0]);

        (function spin() {
          ++root._spinCount; // For debugging only

          while (root._waitingQueue.length) root._waitingQueue.shift()();

          if (root._waitingFor) store.get(-Infinity).onsuccess = spin;
        })();
      }

      var currentWaitPromise = root._waitingFor;
      return new Promise(function (resolve, reject) {
        promise.then(function (res) {
          return root._waitingQueue.push(wrap(resolve.bind(null, res)));
        }, function (err) {
          return root._waitingQueue.push(wrap(reject.bind(null, err)));
        }).finally(function () {
          if (root._waitingFor === currentWaitPromise) {
            // No one added a wait after us. Safe to stop the spinning.
            root._waitingFor = null;
          }
        });
      });
    },
    //
    // Transaction Public Properties and Methods
    //
    abort: function () {
      this.active && this._reject(new exceptions.Abort());
      this.active = false;
    },
    tables: {
      get: deprecated("Transaction.tables", function () {
        return allTables;
      })
    },
    table: function (name) {
      var table = db.table(name); // Don't check that table is part of transaction. It must fail lazily!

      return new Table(name, table.schema, this);
    }
  }); //
  //
  //
  // WhereClause
  //
  //
  //

  function WhereClause(table, index, orCollection) {
    /// <param name="table" type="Table"></param>
    /// <param name="index" type="String" optional="true"></param>
    /// <param name="orCollection" type="Collection" optional="true"></param>
    this._ctx = {
      table: table,
      index: index === ":id" ? null : index,
      or: orCollection
    };
  }

  props(WhereClause.prototype, function () {
    // WhereClause private methods
    function fail(collectionOrWhereClause, err, T) {
      var collection = collectionOrWhereClause instanceof WhereClause ? new Collection(collectionOrWhereClause) : collectionOrWhereClause;
      collection._ctx.error = T ? new T(err) : new TypeError(err);
      return collection;
    }

    function emptyCollection(whereClause) {
      return new Collection(whereClause, function () {
        return IDBKeyRange.only("");
      }).limit(0);
    }

    function upperFactory(dir) {
      return dir === "next" ? function (s) {
        return s.toUpperCase();
      } : function (s) {
        return s.toLowerCase();
      };
    }

    function lowerFactory(dir) {
      return dir === "next" ? function (s) {
        return s.toLowerCase();
      } : function (s) {
        return s.toUpperCase();
      };
    }

    function nextCasing(key, lowerKey, upperNeedle, lowerNeedle, cmp, dir) {
      var length = Math.min(key.length, lowerNeedle.length);
      var llp = -1;

      for (var i = 0; i < length; ++i) {
        var lwrKeyChar = lowerKey[i];

        if (lwrKeyChar !== lowerNeedle[i]) {
          if (cmp(key[i], upperNeedle[i]) < 0) return key.substr(0, i) + upperNeedle[i] + upperNeedle.substr(i + 1);
          if (cmp(key[i], lowerNeedle[i]) < 0) return key.substr(0, i) + lowerNeedle[i] + upperNeedle.substr(i + 1);
          if (llp >= 0) return key.substr(0, llp) + lowerKey[llp] + upperNeedle.substr(llp + 1);
          return null;
        }

        if (cmp(key[i], lwrKeyChar) < 0) llp = i;
      }

      if (length < lowerNeedle.length && dir === "next") return key + upperNeedle.substr(key.length);
      if (length < key.length && dir === "prev") return key.substr(0, upperNeedle.length);
      return llp < 0 ? null : key.substr(0, llp) + lowerNeedle[llp] + upperNeedle.substr(llp + 1);
    }

    function addIgnoreCaseAlgorithm(whereClause, match, needles, suffix) {
      /// <param name="needles" type="Array" elementType="String"></param>
      var upper,
          lower,
          compare,
          upperNeedles,
          lowerNeedles,
          direction,
          nextKeySuffix,
          needlesLen = needles.length;

      if (!needles.every(function (s) {
        return typeof s === 'string';
      })) {
        return fail(whereClause, STRING_EXPECTED);
      }

      function initDirection(dir) {
        upper = upperFactory(dir);
        lower = lowerFactory(dir);
        compare = dir === "next" ? simpleCompare : simpleCompareReverse;
        var needleBounds = needles.map(function (needle) {
          return {
            lower: lower(needle),
            upper: upper(needle)
          };
        }).sort(function (a, b) {
          return compare(a.lower, b.lower);
        });
        upperNeedles = needleBounds.map(function (nb) {
          return nb.upper;
        });
        lowerNeedles = needleBounds.map(function (nb) {
          return nb.lower;
        });
        direction = dir;
        nextKeySuffix = dir === "next" ? "" : suffix;
      }

      initDirection("next");
      var c = new Collection(whereClause, function () {
        return IDBKeyRange.bound(upperNeedles[0], lowerNeedles[needlesLen - 1] + suffix);
      });

      c._ondirectionchange = function (direction) {
        // This event onlys occur before filter is called the first time.
        initDirection(direction);
      };

      var firstPossibleNeedle = 0;

      c._addAlgorithm(function (cursor, advance, resolve) {
        /// <param name="cursor" type="IDBCursor"></param>
        /// <param name="advance" type="Function"></param>
        /// <param name="resolve" type="Function"></param>
        var key = cursor.key;
        if (typeof key !== 'string') return false;
        var lowerKey = lower(key);

        if (match(lowerKey, lowerNeedles, firstPossibleNeedle)) {
          return true;
        } else {
          var lowestPossibleCasing = null;

          for (var i = firstPossibleNeedle; i < needlesLen; ++i) {
            var casing = nextCasing(key, lowerKey, upperNeedles[i], lowerNeedles[i], compare, direction);
            if (casing === null && lowestPossibleCasing === null) firstPossibleNeedle = i + 1;else if (lowestPossibleCasing === null || compare(lowestPossibleCasing, casing) > 0) {
              lowestPossibleCasing = casing;
            }
          }

          if (lowestPossibleCasing !== null) {
            advance(function () {
              cursor.continue(lowestPossibleCasing + nextKeySuffix);
            });
          } else {
            advance(resolve);
          }

          return false;
        }
      });

      return c;
    } //
    // WhereClause public methods
    //


    return {
      between: function (lower, upper, includeLower, includeUpper) {
        /// <summary>
        ///     Filter out records whose where-field lays between given lower and upper values. Applies to Strings, Numbers and Dates.
        /// </summary>
        /// <param name="lower"></param>
        /// <param name="upper"></param>
        /// <param name="includeLower" optional="true">Whether items that equals lower should be included. Default true.</param>
        /// <param name="includeUpper" optional="true">Whether items that equals upper should be included. Default false.</param>
        /// <returns type="Collection"></returns>
        includeLower = includeLower !== false; // Default to true

        includeUpper = includeUpper === true; // Default to false

        try {
          if (cmp(lower, upper) > 0 || cmp(lower, upper) === 0 && (includeLower || includeUpper) && !(includeLower && includeUpper)) return emptyCollection(this); // Workaround for idiotic W3C Specification that DataError must be thrown if lower > upper. The natural result would be to return an empty collection.

          return new Collection(this, function () {
            return IDBKeyRange.bound(lower, upper, !includeLower, !includeUpper);
          });
        } catch (e) {
          return fail(this, INVALID_KEY_ARGUMENT);
        }
      },
      equals: function (value) {
        return new Collection(this, function () {
          return IDBKeyRange.only(value);
        });
      },
      above: function (value) {
        return new Collection(this, function () {
          return IDBKeyRange.lowerBound(value, true);
        });
      },
      aboveOrEqual: function (value) {
        return new Collection(this, function () {
          return IDBKeyRange.lowerBound(value);
        });
      },
      below: function (value) {
        return new Collection(this, function () {
          return IDBKeyRange.upperBound(value, true);
        });
      },
      belowOrEqual: function (value) {
        return new Collection(this, function () {
          return IDBKeyRange.upperBound(value);
        });
      },
      startsWith: function (str) {
        /// <param name="str" type="String"></param>
        if (typeof str !== 'string') return fail(this, STRING_EXPECTED);
        return this.between(str, str + maxString, true, true);
      },
      startsWithIgnoreCase: function (str) {
        /// <param name="str" type="String"></param>
        if (str === "") return this.startsWith(str);
        return addIgnoreCaseAlgorithm(this, function (x, a) {
          return x.indexOf(a[0]) === 0;
        }, [str], maxString);
      },
      equalsIgnoreCase: function (str) {
        /// <param name="str" type="String"></param>
        return addIgnoreCaseAlgorithm(this, function (x, a) {
          return x === a[0];
        }, [str], "");
      },
      anyOfIgnoreCase: function () {
        var set = getArrayOf.apply(NO_CHAR_ARRAY, arguments);
        if (set.length === 0) return emptyCollection(this);
        return addIgnoreCaseAlgorithm(this, function (x, a) {
          return a.indexOf(x) !== -1;
        }, set, "");
      },
      startsWithAnyOfIgnoreCase: function () {
        var set = getArrayOf.apply(NO_CHAR_ARRAY, arguments);
        if (set.length === 0) return emptyCollection(this);
        return addIgnoreCaseAlgorithm(this, function (x, a) {
          return a.some(function (n) {
            return x.indexOf(n) === 0;
          });
        }, set, maxString);
      },
      anyOf: function () {
        var set = getArrayOf.apply(NO_CHAR_ARRAY, arguments);
        var compare = ascending;

        try {
          set.sort(compare);
        } catch (e) {
          return fail(this, INVALID_KEY_ARGUMENT);
        }

        if (set.length === 0) return emptyCollection(this);
        var c = new Collection(this, function () {
          return IDBKeyRange.bound(set[0], set[set.length - 1]);
        });

        c._ondirectionchange = function (direction) {
          compare = direction === "next" ? ascending : descending;
          set.sort(compare);
        };

        var i = 0;

        c._addAlgorithm(function (cursor, advance, resolve) {
          var key = cursor.key;

          while (compare(key, set[i]) > 0) {
            // The cursor has passed beyond this key. Check next.
            ++i;

            if (i === set.length) {
              // There is no next. Stop searching.
              advance(resolve);
              return false;
            }
          }

          if (compare(key, set[i]) === 0) {
            // The current cursor value should be included and we should continue a single step in case next item has the same key or possibly our next key in set.
            return true;
          } else {
            // cursor.key not yet at set[i]. Forward cursor to the next key to hunt for.
            advance(function () {
              cursor.continue(set[i]);
            });
            return false;
          }
        });

        return c;
      },
      notEqual: function (value) {
        return this.inAnyRange([[minKey, value], [value, maxKey]], {
          includeLowers: false,
          includeUppers: false
        });
      },
      noneOf: function () {
        var set = getArrayOf.apply(NO_CHAR_ARRAY, arguments);
        if (set.length === 0) return new Collection(this); // Return entire collection.

        try {
          set.sort(ascending);
        } catch (e) {
          return fail(this, INVALID_KEY_ARGUMENT);
        } // Transform ["a","b","c"] to a set of ranges for between/above/below: [[minKey,"a"], ["a","b"], ["b","c"], ["c",maxKey]]


        var ranges = set.reduce(function (res, val) {
          return res ? res.concat([[res[res.length - 1][1], val]]) : [[minKey, val]];
        }, null);
        ranges.push([set[set.length - 1], maxKey]);
        return this.inAnyRange(ranges, {
          includeLowers: false,
          includeUppers: false
        });
      },

      /** Filter out values withing given set of ranges.
      * Example, give children and elders a rebate of 50%:
      *
      *   db.friends.where('age').inAnyRange([[0,18],[65,Infinity]]).modify({Rebate: 1/2});
      *
      * @param {(string|number|Date|Array)[][]} ranges
      * @param {{includeLowers: boolean, includeUppers: boolean}} options
      */
      inAnyRange: function (ranges, options) {
        if (ranges.length === 0) return emptyCollection(this);

        if (!ranges.every(function (range) {
          return range[0] !== undefined && range[1] !== undefined && ascending(range[0], range[1]) <= 0;
        })) {
          return fail(this, "First argument to inAnyRange() must be an Array of two-value Arrays [lower,upper] where upper must not be lower than lower", exceptions.InvalidArgument);
        }

        var includeLowers = !options || options.includeLowers !== false; // Default to true

        var includeUppers = options && options.includeUppers === true; // Default to false

        function addRange(ranges, newRange) {
          for (var i = 0, l = ranges.length; i < l; ++i) {
            var range = ranges[i];

            if (cmp(newRange[0], range[1]) < 0 && cmp(newRange[1], range[0]) > 0) {
              range[0] = min(range[0], newRange[0]);
              range[1] = max(range[1], newRange[1]);
              break;
            }
          }

          if (i === l) ranges.push(newRange);
          return ranges;
        }

        var sortDirection = ascending;

        function rangeSorter(a, b) {
          return sortDirection(a[0], b[0]);
        } // Join overlapping ranges


        var set;

        try {
          set = ranges.reduce(addRange, []);
          set.sort(rangeSorter);
        } catch (ex) {
          return fail(this, INVALID_KEY_ARGUMENT);
        }

        var i = 0;
        var keyIsBeyondCurrentEntry = includeUppers ? function (key) {
          return ascending(key, set[i][1]) > 0;
        } : function (key) {
          return ascending(key, set[i][1]) >= 0;
        };
        var keyIsBeforeCurrentEntry = includeLowers ? function (key) {
          return descending(key, set[i][0]) > 0;
        } : function (key) {
          return descending(key, set[i][0]) >= 0;
        };

        function keyWithinCurrentRange(key) {
          return !keyIsBeyondCurrentEntry(key) && !keyIsBeforeCurrentEntry(key);
        }

        var checkKey = keyIsBeyondCurrentEntry;
        var c = new Collection(this, function () {
          return IDBKeyRange.bound(set[0][0], set[set.length - 1][1], !includeLowers, !includeUppers);
        });

        c._ondirectionchange = function (direction) {
          if (direction === "next") {
            checkKey = keyIsBeyondCurrentEntry;
            sortDirection = ascending;
          } else {
            checkKey = keyIsBeforeCurrentEntry;
            sortDirection = descending;
          }

          set.sort(rangeSorter);
        };

        c._addAlgorithm(function (cursor, advance, resolve) {
          var key = cursor.key;

          while (checkKey(key)) {
            // The cursor has passed beyond this key. Check next.
            ++i;

            if (i === set.length) {
              // There is no next. Stop searching.
              advance(resolve);
              return false;
            }
          }

          if (keyWithinCurrentRange(key)) {
            // The current cursor value should be included and we should continue a single step in case next item has the same key or possibly our next key in set.
            return true;
          } else if (cmp(key, set[i][1]) === 0 || cmp(key, set[i][0]) === 0) {
            // includeUpper or includeLower is false so keyWithinCurrentRange() returns false even though we are at range border.
            // Continue to next key but don't include this one.
            return false;
          } else {
            // cursor.key not yet at set[i]. Forward cursor to the next key to hunt for.
            advance(function () {
              if (sortDirection === ascending) cursor.continue(set[i][0]);else cursor.continue(set[i][1]);
            });
            return false;
          }
        });

        return c;
      },
      startsWithAnyOf: function () {
        var set = getArrayOf.apply(NO_CHAR_ARRAY, arguments);

        if (!set.every(function (s) {
          return typeof s === 'string';
        })) {
          return fail(this, "startsWithAnyOf() only works with strings");
        }

        if (set.length === 0) return emptyCollection(this);
        return this.inAnyRange(set.map(function (str) {
          return [str, str + maxString];
        }));
      }
    };
  }); //
  //
  //
  // Collection Class
  //
  //
  //

  function Collection(whereClause, keyRangeGenerator) {
    /// <summary>
    ///
    /// </summary>
    /// <param name="whereClause" type="WhereClause">Where clause instance</param>
    /// <param name="keyRangeGenerator" value="function(){ return IDBKeyRange.bound(0,1);}" optional="true"></param>
    var keyRange = null,
        error = null;
    if (keyRangeGenerator) try {
      keyRange = keyRangeGenerator();
    } catch (ex) {
      error = ex;
    }
    var whereCtx = whereClause._ctx,
        table = whereCtx.table;
    this._ctx = {
      table: table,
      index: whereCtx.index,
      isPrimKey: !whereCtx.index || table.schema.primKey.keyPath && whereCtx.index === table.schema.primKey.name,
      range: keyRange,
      keysOnly: false,
      dir: "next",
      unique: "",
      algorithm: null,
      filter: null,
      replayFilter: null,
      justLimit: true,
      isMatch: null,
      offset: 0,
      limit: Infinity,
      error: error,
      or: whereCtx.or,
      valueMapper: table.hook.reading.fire
    };
  }

  function isPlainKeyRange(ctx, ignoreLimitFilter) {
    return !(ctx.filter || ctx.algorithm || ctx.or) && (ignoreLimitFilter ? ctx.justLimit : !ctx.replayFilter);
  }

  props(Collection.prototype, function () {
    //
    // Collection Private Functions
    //
    function addFilter(ctx, fn) {
      ctx.filter = combine(ctx.filter, fn);
    }

    function addReplayFilter(ctx, factory, isLimitFilter) {
      var curr = ctx.replayFilter;
      ctx.replayFilter = curr ? function () {
        return combine(curr(), factory());
      } : factory;
      ctx.justLimit = isLimitFilter && !curr;
    }

    function addMatchFilter(ctx, fn) {
      ctx.isMatch = combine(ctx.isMatch, fn);
    }
    /** @param ctx {
     *      isPrimKey: boolean,
     *      table: Table,
     *      index: string
     * }
     * @param store IDBObjectStore
     **/


    function getIndexOrStore(ctx, store) {
      if (ctx.isPrimKey) return store;
      var indexSpec = ctx.table.schema.idxByName[ctx.index];
      if (!indexSpec) throw new exceptions.Schema("KeyPath " + ctx.index + " on object store " + store.name + " is not indexed");
      return store.index(indexSpec.name);
    }
    /** @param ctx {
     *      isPrimKey: boolean,
     *      table: Table,
     *      index: string,
     *      keysOnly: boolean,
     *      range?: IDBKeyRange,
     *      dir: "next" | "prev"
     * }
     */


    function openCursor(ctx, store) {
      var idxOrStore = getIndexOrStore(ctx, store);
      return ctx.keysOnly && 'openKeyCursor' in idxOrStore ? idxOrStore.openKeyCursor(ctx.range || null, ctx.dir + ctx.unique) : idxOrStore.openCursor(ctx.range || null, ctx.dir + ctx.unique);
    }

    function iter(ctx, fn, resolve, reject, idbstore) {
      var filter = ctx.replayFilter ? combine(ctx.filter, ctx.replayFilter()) : ctx.filter;

      if (!ctx.or) {
        iterate(openCursor(ctx, idbstore), combine(ctx.algorithm, filter), fn, resolve, reject, !ctx.keysOnly && ctx.valueMapper);
      } else (function () {
        var set = {};
        var resolved = 0;

        function resolveboth() {
          if (++resolved === 2) resolve(); // Seems like we just support or btwn max 2 expressions, but there are no limit because we do recursion.
        }

        function union(item, cursor, advance) {
          if (!filter || filter(cursor, advance, resolveboth, reject)) {
            var primaryKey = cursor.primaryKey;
            var key = '' + primaryKey;
            if (key === '[object ArrayBuffer]') key = '' + new Uint8Array(primaryKey);

            if (!hasOwn(set, key)) {
              set[key] = true;
              fn(item, cursor, advance);
            }
          }
        }

        ctx.or._iterate(union, resolveboth, reject, idbstore);

        iterate(openCursor(ctx, idbstore), ctx.algorithm, union, resolveboth, reject, !ctx.keysOnly && ctx.valueMapper);
      })();
    }

    return {
      //
      // Collection Protected Functions
      //
      _read: function (fn, cb) {
        var ctx = this._ctx;
        return ctx.error ? ctx.table._trans(null, rejection.bind(null, ctx.error)) : ctx.table._idbstore(READONLY, fn).then(cb);
      },
      _write: function (fn) {
        var ctx = this._ctx;
        return ctx.error ? ctx.table._trans(null, rejection.bind(null, ctx.error)) : ctx.table._idbstore(READWRITE, fn, "locked"); // When doing write operations on collections, always lock the operation so that upcoming operations gets queued.
      },
      _addAlgorithm: function (fn) {
        var ctx = this._ctx;
        ctx.algorithm = combine(ctx.algorithm, fn);
      },
      _iterate: function (fn, resolve, reject, idbstore) {
        return iter(this._ctx, fn, resolve, reject, idbstore);
      },
      clone: function (props$$1) {
        var rv = Object.create(this.constructor.prototype),
            ctx = Object.create(this._ctx);
        if (props$$1) extend(ctx, props$$1);
        rv._ctx = ctx;
        return rv;
      },
      raw: function () {
        this._ctx.valueMapper = null;
        return this;
      },
      //
      // Collection Public methods
      //
      each: function (fn) {
        var ctx = this._ctx;
        return this._read(function (resolve, reject, idbstore) {
          iter(ctx, fn, resolve, reject, idbstore);
        });
      },
      count: function (cb) {
        var ctx = this._ctx;

        if (isPlainKeyRange(ctx, true)) {
          // This is a plain key range. We can use the count() method if the index.
          return this._read(function (resolve, reject, idbstore) {
            var idx = getIndexOrStore(ctx, idbstore);
            var req = ctx.range ? idx.count(ctx.range) : idx.count();
            req.onerror = eventRejectHandler(reject);

            req.onsuccess = function (e) {
              resolve(Math.min(e.target.result, ctx.limit));
            };
          }, cb);
        } else {
          // Algorithms, filters or expressions are applied. Need to count manually.
          var count = 0;
          return this._read(function (resolve, reject, idbstore) {
            iter(ctx, function () {
              ++count;
              return false;
            }, function () {
              resolve(count);
            }, reject, idbstore);
          }, cb);
        }
      },
      sortBy: function (keyPath, cb) {
        /// <param name="keyPath" type="String"></param>
        var parts = keyPath.split('.').reverse(),
            lastPart = parts[0],
            lastIndex = parts.length - 1;

        function getval(obj, i) {
          if (i) return getval(obj[parts[i]], i - 1);
          return obj[lastPart];
        }

        var order = this._ctx.dir === "next" ? 1 : -1;

        function sorter(a, b) {
          var aVal = getval(a, lastIndex),
              bVal = getval(b, lastIndex);
          return aVal < bVal ? -order : aVal > bVal ? order : 0;
        }

        return this.toArray(function (a) {
          return a.sort(sorter);
        }).then(cb);
      },
      toArray: function (cb) {
        var ctx = this._ctx;
        return this._read(function (resolve, reject, idbstore) {
          if (hasGetAll && ctx.dir === 'next' && isPlainKeyRange(ctx, true) && ctx.limit > 0) {
            // Special optimation if we could use IDBObjectStore.getAll() or
            // IDBKeyRange.getAll():
            var readingHook = ctx.table.hook.reading.fire;
            var idxOrStore = getIndexOrStore(ctx, idbstore);
            var req = ctx.limit < Infinity ? idxOrStore.getAll(ctx.range, ctx.limit) : idxOrStore.getAll(ctx.range);
            req.onerror = eventRejectHandler(reject);
            req.onsuccess = readingHook === mirror ? eventSuccessHandler(resolve) : eventSuccessHandler(function (res) {
              try {
                resolve(res.map(readingHook));
              } catch (e) {
                reject(e);
              }
            });
          } else {
            // Getting array through a cursor.
            var a = [];
            iter(ctx, function (item) {
              a.push(item);
            }, function arrayComplete() {
              resolve(a);
            }, reject, idbstore);
          }
        }, cb);
      },
      offset: function (offset) {
        var ctx = this._ctx;
        if (offset <= 0) return this;
        ctx.offset += offset; // For count()

        if (isPlainKeyRange(ctx)) {
          addReplayFilter(ctx, function () {
            var offsetLeft = offset;
            return function (cursor, advance) {
              if (offsetLeft === 0) return true;

              if (offsetLeft === 1) {
                --offsetLeft;
                return false;
              }

              advance(function () {
                cursor.advance(offsetLeft);
                offsetLeft = 0;
              });
              return false;
            };
          });
        } else {
          addReplayFilter(ctx, function () {
            var offsetLeft = offset;
            return function () {
              return --offsetLeft < 0;
            };
          });
        }

        return this;
      },
      limit: function (numRows) {
        this._ctx.limit = Math.min(this._ctx.limit, numRows); // For count()

        addReplayFilter(this._ctx, function () {
          var rowsLeft = numRows;
          return function (cursor, advance, resolve) {
            if (--rowsLeft <= 0) advance(resolve); // Stop after this item has been included

            return rowsLeft >= 0; // If numRows is already below 0, return false because then 0 was passed to numRows initially. Otherwise we wouldnt come here.
          };
        }, true);
        return this;
      },
      until: function (filterFunction, bIncludeStopEntry) {
        addFilter(this._ctx, function (cursor, advance, resolve) {
          if (filterFunction(cursor.value)) {
            advance(resolve);
            return bIncludeStopEntry;
          } else {
            return true;
          }
        });
        return this;
      },
      first: function (cb) {
        return this.limit(1).toArray(function (a) {
          return a[0];
        }).then(cb);
      },
      last: function (cb) {
        return this.reverse().first(cb);
      },
      filter: function (filterFunction) {
        /// <param name="jsFunctionFilter" type="Function">function(val){return true/false}</param>
        addFilter(this._ctx, function (cursor) {
          return filterFunction(cursor.value);
        }); // match filters not used in Dexie.js but can be used by 3rd part libraries to test a
        // collection for a match without querying DB. Used by Dexie.Observable.

        addMatchFilter(this._ctx, filterFunction);
        return this;
      },
      and: function (filterFunction) {
        return this.filter(filterFunction);
      },
      or: function (indexName) {
        return new WhereClause(this._ctx.table, indexName, this);
      },
      reverse: function () {
        this._ctx.dir = this._ctx.dir === "prev" ? "next" : "prev";
        if (this._ondirectionchange) this._ondirectionchange(this._ctx.dir);
        return this;
      },
      desc: function () {
        return this.reverse();
      },
      eachKey: function (cb) {
        var ctx = this._ctx;
        ctx.keysOnly = !ctx.isMatch;
        return this.each(function (val, cursor) {
          cb(cursor.key, cursor);
        });
      },
      eachUniqueKey: function (cb) {
        this._ctx.unique = "unique";
        return this.eachKey(cb);
      },
      eachPrimaryKey: function (cb) {
        var ctx = this._ctx;
        ctx.keysOnly = !ctx.isMatch;
        return this.each(function (val, cursor) {
          cb(cursor.primaryKey, cursor);
        });
      },
      keys: function (cb) {
        var ctx = this._ctx;
        ctx.keysOnly = !ctx.isMatch;
        var a = [];
        return this.each(function (item, cursor) {
          a.push(cursor.key);
        }).then(function () {
          return a;
        }).then(cb);
      },
      primaryKeys: function (cb) {
        var ctx = this._ctx;

        if (hasGetAll && ctx.dir === 'next' && isPlainKeyRange(ctx, true) && ctx.limit > 0) {
          // Special optimation if we could use IDBObjectStore.getAllKeys() or
          // IDBKeyRange.getAllKeys():
          return this._read(function (resolve, reject, idbstore) {
            var idxOrStore = getIndexOrStore(ctx, idbstore);
            var req = ctx.limit < Infinity ? idxOrStore.getAllKeys(ctx.range, ctx.limit) : idxOrStore.getAllKeys(ctx.range);
            req.onerror = eventRejectHandler(reject);
            req.onsuccess = eventSuccessHandler(resolve);
          }).then(cb);
        }

        ctx.keysOnly = !ctx.isMatch;
        var a = [];
        return this.each(function (item, cursor) {
          a.push(cursor.primaryKey);
        }).then(function () {
          return a;
        }).then(cb);
      },
      uniqueKeys: function (cb) {
        this._ctx.unique = "unique";
        return this.keys(cb);
      },
      firstKey: function (cb) {
        return this.limit(1).keys(function (a) {
          return a[0];
        }).then(cb);
      },
      lastKey: function (cb) {
        return this.reverse().firstKey(cb);
      },
      distinct: function () {
        var ctx = this._ctx,
            idx = ctx.index && ctx.table.schema.idxByName[ctx.index];
        if (!idx || !idx.multi) return this; // distinct() only makes differencies on multiEntry indexes.

        var set = {};
        addFilter(this._ctx, function (cursor) {
          var strKey = cursor.primaryKey.toString(); // Converts any Date to String, String to String, Number to String and Array to comma-separated string

          var found = hasOwn(set, strKey);
          set[strKey] = true;
          return !found;
        });
        return this;
      },
      //
      // Methods that mutate storage
      //
      modify: function (changes) {
        var self = this,
            ctx = this._ctx,
            hook = ctx.table.hook,
            updatingHook = hook.updating.fire,
            deletingHook = hook.deleting.fire;
        return this._write(function (resolve, reject, idbstore, trans) {
          var modifyer;

          if (typeof changes === 'function') {
            // Changes is a function that may update, add or delete propterties or even require a deletion the object itself (delete this.item)
            if (updatingHook === nop && deletingHook === nop) {
              // Noone cares about what is being changed. Just let the modifier function be the given argument as is.
              modifyer = changes;
            } else {
              // People want to know exactly what is being modified or deleted.
              // Let modifyer be a proxy function that finds out what changes the caller is actually doing
              // and call the hooks accordingly!
              modifyer = function (item) {
                var origItem = deepClone(item); // Clone the item first so we can compare laters.

                if (changes.call(this, item, this) === false) return false; // Call the real modifyer function (If it returns false explicitely, it means it dont want to modify anyting on this object)

                if (!hasOwn(this, "value")) {
                  // The real modifyer function requests a deletion of the object. Inform the deletingHook that a deletion is taking place.
                  deletingHook.call(this, this.primKey, item, trans);
                } else {
                  // No deletion. Check what was changed
                  var objectDiff = getObjectDiff(origItem, this.value);
                  var additionalChanges = updatingHook.call(this, objectDiff, this.primKey, origItem, trans);

                  if (additionalChanges) {
                    // Hook want to apply additional modifications. Make sure to fullfill the will of the hook.
                    item = this.value;
                    keys(additionalChanges).forEach(function (keyPath) {
                      setByKeyPath(item, keyPath, additionalChanges[keyPath]); // Adding {keyPath: undefined} means that the keyPath should be deleted. Handled by setByKeyPath
                    });
                  }
                }
              };
            }
          } else if (updatingHook === nop) {
            // changes is a set of {keyPath: value} and no one is listening to the updating hook.
            var keyPaths = keys(changes);
            var numKeys = keyPaths.length;

            modifyer = function (item) {
              var anythingModified = false;

              for (var i = 0; i < numKeys; ++i) {
                var keyPath = keyPaths[i],
                    val = changes[keyPath];

                if (getByKeyPath(item, keyPath) !== val) {
                  setByKeyPath(item, keyPath, val); // Adding {keyPath: undefined} means that the keyPath should be deleted. Handled by setByKeyPath

                  anythingModified = true;
                }
              }

              return anythingModified;
            };
          } else {
            // changes is a set of {keyPath: value} and people are listening to the updating hook so we need to call it and
            // allow it to add additional modifications to make.
            var origChanges = changes;
            changes = shallowClone(origChanges); // Let's work with a clone of the changes keyPath/value set so that we can restore it in case a hook extends it.

            modifyer = function (item) {
              var anythingModified = false;
              var additionalChanges = updatingHook.call(this, changes, this.primKey, deepClone(item), trans);
              if (additionalChanges) extend(changes, additionalChanges);
              keys(changes).forEach(function (keyPath) {
                var val = changes[keyPath];

                if (getByKeyPath(item, keyPath) !== val) {
                  setByKeyPath(item, keyPath, val);
                  anythingModified = true;
                }
              });
              if (additionalChanges) changes = shallowClone(origChanges); // Restore original changes for next iteration

              return anythingModified;
            };
          }

          var count = 0;
          var successCount = 0;
          var iterationComplete = false;
          var failures = [];
          var failKeys = [];
          var currentKey = null;

          function modifyItem(item, cursor) {
            currentKey = cursor.primaryKey;
            var thisContext = {
              primKey: cursor.primaryKey,
              value: item,
              onsuccess: null,
              onerror: null
            };

            function onerror(e) {
              failures.push(e);
              failKeys.push(thisContext.primKey);
              checkFinished();
              return true; // Catch these errors and let a final rejection decide whether or not to abort entire transaction
            }

            if (modifyer.call(thisContext, item, thisContext) !== false) {
              var bDelete = !hasOwn(thisContext, "value");
              ++count;
              tryCatch(function () {
                var req = bDelete ? cursor.delete() : cursor.update(thisContext.value);
                req._hookCtx = thisContext;
                req.onerror = hookedEventRejectHandler(onerror);
                req.onsuccess = hookedEventSuccessHandler(function () {
                  ++successCount;
                  checkFinished();
                });
              }, onerror);
            } else if (thisContext.onsuccess) {
              // Hook will expect either onerror or onsuccess to always be called!
              thisContext.onsuccess(thisContext.value);
            }
          }

          function doReject(e) {
            if (e) {
              failures.push(e);
              failKeys.push(currentKey);
            }

            return reject(new ModifyError("Error modifying one or more objects", failures, successCount, failKeys));
          }

          function checkFinished() {
            if (iterationComplete && successCount + failures.length === count) {
              if (failures.length > 0) doReject();else resolve(successCount);
            }
          }

          self.clone().raw()._iterate(modifyItem, function () {
            iterationComplete = true;
            checkFinished();
          }, doReject, idbstore);
        });
      },
      'delete': function () {
        var _this = this;

        var ctx = this._ctx,
            range = ctx.range,
            deletingHook = ctx.table.hook.deleting.fire,
            hasDeleteHook = deletingHook !== nop;

        if (!hasDeleteHook && isPlainKeyRange(ctx) && (ctx.isPrimKey && !hangsOnDeleteLargeKeyRange || !range)) {
          // May use IDBObjectStore.delete(IDBKeyRange) in this case (Issue #208)
          // For chromium, this is the way most optimized version.
          // For IE/Edge, this could hang the indexedDB engine and make operating system instable
          // (https://gist.github.com/dfahlander/5a39328f029de18222cf2125d56c38f7)
          return this._write(function (resolve, reject, idbstore) {
            // Our API contract is to return a count of deleted items, so we have to count() before delete().
            var onerror = eventRejectHandler(reject),
                countReq = range ? idbstore.count(range) : idbstore.count();
            countReq.onerror = onerror;

            countReq.onsuccess = function () {
              var count = countReq.result;
              tryCatch(function () {
                var delReq = range ? idbstore.delete(range) : idbstore.clear();
                delReq.onerror = onerror;

                delReq.onsuccess = function () {
                  return resolve(count);
                };
              }, function (err) {
                return reject(err);
              });
            };
          });
        } // Default version to use when collection is not a vanilla IDBKeyRange on the primary key.
        // Divide into chunks to not starve RAM.
        // If has delete hook, we will have to collect not just keys but also objects, so it will use
        // more memory and need lower chunk size.


        var CHUNKSIZE = hasDeleteHook ? 2000 : 10000;
        return this._write(function (resolve, reject, idbstore, trans) {
          var totalCount = 0; // Clone collection and change its table and set a limit of CHUNKSIZE on the cloned Collection instance.

          var collection = _this.clone({
            keysOnly: !ctx.isMatch && !hasDeleteHook
          }) // load just keys (unless filter() or and() or deleteHook has subscribers)
          .distinct() // In case multiEntry is used, never delete same key twice because resulting count
          .limit(CHUNKSIZE).raw(); // Don't filter through reading-hooks (like mapped classes etc)


          var keysOrTuples = []; // We're gonna do things on as many chunks that are needed.
          // Use recursion of nextChunk function:

          var nextChunk = function () {
            return collection.each(hasDeleteHook ? function (val, cursor) {
              // Somebody subscribes to hook('deleting'). Collect all primary keys and their values,
              // so that the hook can be called with its values in bulkDelete().
              keysOrTuples.push([cursor.primaryKey, cursor.value]);
            } : function (val, cursor) {
              // No one subscribes to hook('deleting'). Collect only primary keys:
              keysOrTuples.push(cursor.primaryKey);
            }).then(function () {
              // Chromium deletes faster when doing it in sort order.
              hasDeleteHook ? keysOrTuples.sort(function (a, b) {
                return ascending(a[0], b[0]);
              }) : keysOrTuples.sort(ascending);
              return bulkDelete(idbstore, trans, keysOrTuples, hasDeleteHook, deletingHook);
            }).then(function () {
              var count = keysOrTuples.length;
              totalCount += count;
              keysOrTuples = [];
              return count < CHUNKSIZE ? totalCount : nextChunk();
            });
          };

          resolve(nextChunk());
        });
      }
    };
  }); //
  //
  //
  // ------------------------- Help functions ---------------------------
  //
  //
  //

  function lowerVersionFirst(a, b) {
    return a._cfg.version - b._cfg.version;
  }

  function setApiOnPlace(objs, tableNames, dbschema) {
    tableNames.forEach(function (tableName) {
      var schema = dbschema[tableName];
      objs.forEach(function (obj) {
        if (!(tableName in obj)) {
          if (obj === Transaction.prototype || obj instanceof Transaction) {
            // obj is a Transaction prototype (or prototype of a subclass to Transaction)
            // Make the API a getter that returns this.table(tableName)
            setProp(obj, tableName, {
              get: function () {
                return this.table(tableName);
              }
            });
          } else {
            // Table will not be bound to a transaction (will use Dexie.currentTransaction)
            obj[tableName] = new Table(tableName, schema);
          }
        }
      });
    });
  }

  function removeTablesApi(objs) {
    objs.forEach(function (obj) {
      for (var key in obj) {
        if (obj[key] instanceof Table) delete obj[key];
      }
    });
  }

  function iterate(req, filter, fn, resolve, reject, valueMapper) {
    // Apply valueMapper (hook('reading') or mappped class)
    var mappedFn = valueMapper ? function (x, c, a) {
      return fn(valueMapper(x), c, a);
    } : fn; // Wrap fn with PSD and microtick stuff from Promise.

    var wrappedFn = wrap(mappedFn, reject);
    if (!req.onerror) req.onerror = eventRejectHandler(reject);

    if (filter) {
      req.onsuccess = trycatcher(function filter_record() {
        var cursor = req.result;

        if (cursor) {
          var c = function () {
            cursor.continue();
          };

          if (filter(cursor, function (advancer) {
            c = advancer;
          }, resolve, reject)) wrappedFn(cursor.value, cursor, function (advancer) {
            c = advancer;
          });
          c();
        } else {
          resolve();
        }
      }, reject);
    } else {
      req.onsuccess = trycatcher(function filter_record() {
        var cursor = req.result;

        if (cursor) {
          var c = function () {
            cursor.continue();
          };

          wrappedFn(cursor.value, cursor, function (advancer) {
            c = advancer;
          });
          c();
        } else {
          resolve();
        }
      }, reject);
    }
  }

  function parseIndexSyntax(indexes) {
    /// <param name="indexes" type="String"></param>
    /// <returns type="Array" elementType="IndexSpec"></returns>
    var rv = [];
    indexes.split(',').forEach(function (index) {
      index = index.trim();
      var name = index.replace(/([&*]|\+\+)/g, ""); // Remove "&", "++" and "*"
      // Let keyPath of "[a+b]" be ["a","b"]:

      var keyPath = /^\[/.test(name) ? name.match(/^\[(.*)\]$/)[1].split('+') : name;
      rv.push(new IndexSpec(name, keyPath || null, /\&/.test(index), /\*/.test(index), /\+\+/.test(index), isArray(keyPath), /\./.test(index)));
    });
    return rv;
  }

  function cmp(key1, key2) {
    return indexedDB.cmp(key1, key2);
  }

  function min(a, b) {
    return cmp(a, b) < 0 ? a : b;
  }

  function max(a, b) {
    return cmp(a, b) > 0 ? a : b;
  }

  function ascending(a, b) {
    return indexedDB.cmp(a, b);
  }

  function descending(a, b) {
    return indexedDB.cmp(b, a);
  }

  function simpleCompare(a, b) {
    return a < b ? -1 : a === b ? 0 : 1;
  }

  function simpleCompareReverse(a, b) {
    return a > b ? -1 : a === b ? 0 : 1;
  }

  function combine(filter1, filter2) {
    return filter1 ? filter2 ? function () {
      return filter1.apply(this, arguments) && filter2.apply(this, arguments);
    } : filter1 : filter2;
  }

  function readGlobalSchema() {
    db.verno = idbdb.version / 10;
    db._dbSchema = globalSchema = {};
    dbStoreNames = slice(idbdb.objectStoreNames, 0);
    if (dbStoreNames.length === 0) return; // Database contains no stores.

    var trans = idbdb.transaction(safariMultiStoreFix(dbStoreNames), 'readonly');
    dbStoreNames.forEach(function (storeName) {
      var store = trans.objectStore(storeName),
          keyPath = store.keyPath,
          dotted = keyPath && typeof keyPath === 'string' && keyPath.indexOf('.') !== -1;
      var primKey = new IndexSpec(keyPath, keyPath || "", false, false, !!store.autoIncrement, keyPath && typeof keyPath !== 'string', dotted);
      var indexes = [];

      for (var j = 0; j < store.indexNames.length; ++j) {
        var idbindex = store.index(store.indexNames[j]);
        keyPath = idbindex.keyPath;
        dotted = keyPath && typeof keyPath === 'string' && keyPath.indexOf('.') !== -1;
        var index = new IndexSpec(idbindex.name, keyPath, !!idbindex.unique, !!idbindex.multiEntry, false, keyPath && typeof keyPath !== 'string', dotted);
        indexes.push(index);
      }

      globalSchema[storeName] = new TableSchema(storeName, primKey, indexes, {});
    });
    setApiOnPlace([allTables], keys(globalSchema), globalSchema);
  }

  function adjustToExistingIndexNames(schema, idbtrans) {
    /// <summary>
    /// Issue #30 Problem with existing db - adjust to existing index names when migrating from non-dexie db
    /// </summary>
    /// <param name="schema" type="Object">Map between name and TableSchema</param>
    /// <param name="idbtrans" type="IDBTransaction"></param>
    var storeNames = idbtrans.db.objectStoreNames;

    for (var i = 0; i < storeNames.length; ++i) {
      var storeName = storeNames[i];
      var store = idbtrans.objectStore(storeName);
      hasGetAll = 'getAll' in store;

      for (var j = 0; j < store.indexNames.length; ++j) {
        var indexName = store.indexNames[j];
        var keyPath = store.index(indexName).keyPath;
        var dexieName = typeof keyPath === 'string' ? keyPath : "[" + slice(keyPath).join('+') + "]";

        if (schema[storeName]) {
          var indexSpec = schema[storeName].idxByName[dexieName];
          if (indexSpec) indexSpec.name = indexName;
        }
      }
    } // Bug with getAll() on Safari ver<604 on Workers only, see discussion following PR #579


    if (/Safari/.test(navigator.userAgent) && !/(Chrome\/|Edge\/)/.test(navigator.userAgent) && _global.WorkerGlobalScope && _global instanceof _global.WorkerGlobalScope && [].concat(navigator.userAgent.match(/Safari\/(\d*)/))[1] < 604) {
      hasGetAll = false;
    }
  }

  function fireOnBlocked(ev) {
    db.on("blocked").fire(ev); // Workaround (not fully*) for missing "versionchange" event in IE,Edge and Safari:

    connections.filter(function (c) {
      return c.name === db.name && c !== db && !c._vcFired;
    }).map(function (c) {
      return c.on("versionchange").fire(ev);
    });
  }

  extend(this, {
    Collection: Collection,
    Table: Table,
    Transaction: Transaction,
    Version: Version,
    WhereClause: WhereClause
  });
  init();
  addons.forEach(function (fn) {
    fn(db);
  });
}

function parseType(type) {
  if (typeof type === 'function') {
    return new type();
  } else if (isArray(type)) {
    return [parseType(type[0])];
  } else if (type && typeof type === 'object') {
    var rv = {};
    applyStructure(rv, type);
    return rv;
  } else {
    return type;
  }
}

function applyStructure(obj, structure) {
  keys(structure).forEach(function (member) {
    var value = parseType(structure[member]);
    obj[member] = value;
  });
  return obj;
}

function hookedEventSuccessHandler(resolve) {
  // wrap() is needed when calling hooks because the rare scenario of:
  //  * hook does a db operation that fails immediately (IDB throws exception)
  //    For calling db operations on correct transaction, wrap makes sure to set PSD correctly.
  //    wrap() will also execute in a virtual tick.
  //  * If not wrapped in a virtual tick, direct exception will launch a new physical tick.
  //  * If this was the last event in the bulk, the promise will resolve after a physical tick
  //    and the transaction will have committed already.
  // If no hook, the virtual tick will be executed in the reject()/resolve of the final promise,
  // because it is always marked with _lib = true when created using Transaction._promise().
  return wrap(function (event) {
    var req = event.target,
        ctx = req._hookCtx,
        // Contains the hook error handler. Put here instead of closure to boost performance.
    result = ctx.value || req.result,
        // Pass the object value on updates. The result from IDB is the primary key.
    hookSuccessHandler = ctx && ctx.onsuccess;
    hookSuccessHandler && hookSuccessHandler(result);
    resolve && resolve(result);
  }, resolve);
}

function eventRejectHandler(reject) {
  return wrap(function (event) {
    preventDefault(event);
    reject(event.target.error);
    return false;
  });
}

function eventSuccessHandler(resolve) {
  return wrap(function (event) {
    resolve(event.target.result);
  });
}

function hookedEventRejectHandler(reject) {
  return wrap(function (event) {
    // See comment on hookedEventSuccessHandler() why wrap() is needed only when supporting hooks.
    var req = event.target,
        err = req.error,
        ctx = req._hookCtx,
        // Contains the hook error handler. Put here instead of closure to boost performance.
    hookErrorHandler = ctx && ctx.onerror;
    hookErrorHandler && hookErrorHandler(err);
    preventDefault(event);
    reject(err);
    return false;
  });
}

function preventDefault(event) {
  if (event.stopPropagation) event.stopPropagation();
  if (event.preventDefault) event.preventDefault();
}

function awaitIterator(iterator) {
  var callNext = function (result) {
    return iterator.next(result);
  },
      doThrow = function (error) {
    return iterator.throw(error);
  },
      onSuccess = step(callNext),
      onError = step(doThrow);

  function step(getNext) {
    return function (val) {
      var next = getNext(val),
          value = next.value;
      return next.done ? value : !value || typeof value.then !== 'function' ? isArray(value) ? Promise.all(value).then(onSuccess, onError) : onSuccess(value) : value.then(onSuccess, onError);
    };
  }

  return step(callNext)();
} //
// IndexSpec struct
//


function IndexSpec(name, keyPath, unique, multi, auto, compound, dotted) {
  /// <param name="name" type="String"></param>
  /// <param name="keyPath" type="String"></param>
  /// <param name="unique" type="Boolean"></param>
  /// <param name="multi" type="Boolean"></param>
  /// <param name="auto" type="Boolean"></param>
  /// <param name="compound" type="Boolean"></param>
  /// <param name="dotted" type="Boolean"></param>
  this.name = name;
  this.keyPath = keyPath;
  this.unique = unique;
  this.multi = multi;
  this.auto = auto;
  this.compound = compound;
  this.dotted = dotted;
  var keyPathSrc = typeof keyPath === 'string' ? keyPath : keyPath && '[' + [].join.call(keyPath, '+') + ']';
  this.src = (unique ? '&' : '') + (multi ? '*' : '') + (auto ? "++" : "") + keyPathSrc;
} //
// TableSchema struct
//


function TableSchema(name, primKey, indexes, instanceTemplate) {
  /// <param name="name" type="String"></param>
  /// <param name="primKey" type="IndexSpec"></param>
  /// <param name="indexes" type="Array" elementType="IndexSpec"></param>
  /// <param name="instanceTemplate" type="Object"></param>
  this.name = name;
  this.primKey = primKey || new IndexSpec();
  this.indexes = indexes || [new IndexSpec()];
  this.instanceTemplate = instanceTemplate;
  this.mappedClass = null;
  this.idxByName = arrayToObject(indexes, function (index) {
    return [index.name, index];
  });
}

function safariMultiStoreFix(storeNames) {
  return storeNames.length === 1 ? storeNames[0] : storeNames;
}

function getNativeGetDatabaseNamesFn(indexedDB) {
  var fn = indexedDB && (indexedDB.getDatabaseNames || indexedDB.webkitGetDatabaseNames);
  return fn && fn.bind(indexedDB);
} // Export Error classes


props(Dexie, fullNameExceptions); // Dexie.XXXError = class XXXError {...};
//
// Static methods and properties
// 

props(Dexie, {
  //
  // Static delete() method.
  //
  delete: function (databaseName) {
    var db = new Dexie(databaseName),
        promise = db.delete();

    promise.onblocked = function (fn) {
      db.on("blocked", fn);
      return this;
    };

    return promise;
  },
  //
  // Static exists() method.
  //
  exists: function (name) {
    return new Dexie(name).open().then(function (db) {
      db.close();
      return true;
    }).catch(Dexie.NoSuchDatabaseError, function () {
      return false;
    });
  },
  //
  // Static method for retrieving a list of all existing databases at current host.
  //
  getDatabaseNames: function (cb) {
    var getDatabaseNames = getNativeGetDatabaseNamesFn(Dexie.dependencies.indexedDB);
    return getDatabaseNames ? new Promise(function (resolve, reject) {
      var req = getDatabaseNames();

      req.onsuccess = function (event) {
        resolve(slice(event.target.result, 0)); // Converst DOMStringList to Array<String>
      };

      req.onerror = eventRejectHandler(reject);
    }).then(cb) : dbNamesDB.dbnames.toCollection().primaryKeys(cb);
  },
  defineClass: function () {
    // Default constructor able to copy given properties into this object.
    function Class(properties) {
      /// <param name="properties" type="Object" optional="true">Properties to initialize object with.
      /// </param>
      if (properties) extend(this, properties);
    }

    return Class;
  },
  applyStructure: applyStructure,
  ignoreTransaction: function (scopeFunc) {
    // In case caller is within a transaction but needs to create a separate transaction.
    // Example of usage:
    //
    // Let's say we have a logger function in our app. Other application-logic should be unaware of the
    // logger function and not need to include the 'logentries' table in all transaction it performs.
    // The logging should always be done in a separate transaction and not be dependant on the current
    // running transaction context. Then you could use Dexie.ignoreTransaction() to run code that starts a new transaction.
    //
    //     Dexie.ignoreTransaction(function() {
    //         db.logentries.add(newLogEntry);
    //     });
    //
    // Unless using Dexie.ignoreTransaction(), the above example would try to reuse the current transaction
    // in current Promise-scope.
    //
    // An alternative to Dexie.ignoreTransaction() would be setImmediate() or setTimeout(). The reason we still provide an
    // API for this because
    //  1) The intention of writing the statement could be unclear if using setImmediate() or setTimeout().
    //  2) setTimeout() would wait unnescessary until firing. This is however not the case with setImmediate().
    //  3) setImmediate() is not supported in the ES standard.
    //  4) You might want to keep other PSD state that was set in a parent PSD, such as PSD.letThrough.
    return PSD.trans ? usePSD(PSD.transless, scopeFunc) : // Use the closest parent that was non-transactional.
    scopeFunc(); // No need to change scope because there is no ongoing transaction.
  },
  vip: function (fn) {
    // To be used by subscribers to the on('ready') event.
    // This will let caller through to access DB even when it is blocked while the db.ready() subscribers are firing.
    // This would have worked automatically if we were certain that the Provider was using Dexie.Promise for all asyncronic operations. The promise PSD
    // from the provider.connect() call would then be derived all the way to when provider would call localDatabase.applyChanges(). But since
    // the provider more likely is using non-promise async APIs or other thenable implementations, we cannot assume that.
    // Note that this method is only useful for on('ready') subscribers that is returning a Promise from the event. If not using vip()
    // the database could deadlock since it wont open until the returned Promise is resolved, and any non-VIPed operation started by
    // the caller will not resolve until database is opened.
    return newScope(function () {
      PSD.letThrough = true; // Make sure we are let through if still blocking db due to onready is firing.

      return fn();
    });
  },
  async: function (generatorFn) {
    return function () {
      try {
        var rv = awaitIterator(generatorFn.apply(this, arguments));
        if (!rv || typeof rv.then !== 'function') return Promise.resolve(rv);
        return rv;
      } catch (e) {
        return rejection(e);
      }
    };
  },
  spawn: function (generatorFn, args, thiz) {
    try {
      var rv = awaitIterator(generatorFn.apply(thiz, args || []));
      if (!rv || typeof rv.then !== 'function') return Promise.resolve(rv);
      return rv;
    } catch (e) {
      return rejection(e);
    }
  },
  // Dexie.currentTransaction property
  currentTransaction: {
    get: function () {
      return PSD.trans || null;
    }
  },
  waitFor: function (promiseOrFunction, optionalTimeout) {
    // If a function is provided, invoke it and pass the returning value to Transaction.waitFor()
    var promise = Promise.resolve(typeof promiseOrFunction === 'function' ? Dexie.ignoreTransaction(promiseOrFunction) : promiseOrFunction).timeout(optionalTimeout || 60000); // Default the timeout to one minute. Caller may specify Infinity if required.       
    // Run given promise on current transaction. If no current transaction, just return a Dexie promise based
    // on given value.

    return PSD.trans ? PSD.trans.waitFor(promise) : promise;
  },
  // Export our Promise implementation since it can be handy as a standalone Promise implementation
  Promise: Promise,
  // Dexie.debug proptery:
  // Dexie.debug = false
  // Dexie.debug = true
  // Dexie.debug = "dexie" - don't hide dexie's stack frames.
  debug: {
    get: function () {
      return debug;
    },
    set: function (value) {
      setDebug(value, value === 'dexie' ? function () {
        return true;
      } : dexieStackFrameFilter);
    }
  },
  // Export our derive/extend/override methodology
  derive: derive,
  extend: extend,
  props: props,
  override: override,
  // Export our Events() function - can be handy as a toolkit
  Events: Events,
  // Utilities
  getByKeyPath: getByKeyPath,
  setByKeyPath: setByKeyPath,
  delByKeyPath: delByKeyPath,
  shallowClone: shallowClone,
  deepClone: deepClone,
  getObjectDiff: getObjectDiff,
  asap: asap,
  maxKey: maxKey,
  minKey: minKey,
  // Addon registry
  addons: [],
  // Global DB connection list
  connections: connections,
  MultiModifyError: exceptions.Modify,
  errnames: errnames,
  // Export other static classes
  IndexSpec: IndexSpec,
  TableSchema: TableSchema,
  //
  // Dependencies
  //
  // These will automatically work in browsers with indexedDB support, or where an indexedDB polyfill has been included.
  //
  // In node.js, however, these properties must be set "manually" before instansiating a new Dexie().
  // For node.js, you need to require indexeddb-js or similar and then set these deps.
  //
  dependencies: function () {
    try {
      return {
        // Required:
        indexedDB: _global.indexedDB || _global.mozIndexedDB || _global.webkitIndexedDB || _global.msIndexedDB,
        IDBKeyRange: _global.IDBKeyRange || _global.webkitIDBKeyRange
      };
    } catch (e) {
      return {
        indexedDB: null,
        IDBKeyRange: null
      };
    }
  }(),
  // API Version Number: Type Number, make sure to always set a version number that can be comparable correctly. Example: 0.9, 0.91, 0.92, 1.0, 1.01, 1.1, 1.2, 1.21, etc.
  semVer: DEXIE_VERSION,
  version: DEXIE_VERSION.split('.').map(function (n) {
    return parseInt(n);
  }).reduce(function (p, c, i) {
    return p + c / Math.pow(10, i * 2);
  }),
  // https://github.com/dfahlander/Dexie.js/issues/186
  // typescript compiler tsc in mode ts-->es5 & commonJS, will expect require() to return
  // x.default. Workaround: Set Dexie.default = Dexie.
  default: Dexie,
  // Make it possible to import {Dexie} (non-default import)
  // Reason 1: May switch to that in future.
  // Reason 2: We declare it both default and named exported in d.ts to make it possible
  // to let addons extend the Dexie interface with Typescript 2.1 (works only when explicitely
  // exporting the symbol, not just default exporting)
  Dexie: Dexie
}); // Map DOMErrors and DOMExceptions to corresponding Dexie errors. May change in Dexie v2.0.

Promise.rejectionMapper = mapError; // Initialize dbNamesDB (won't ever be opened on chromium browsers')

dbNamesDB = new Dexie('__dbnames');
dbNamesDB.version(1).stores({
  dbnames: 'name'
});

(function () {
  // Migrate from Dexie 1.x database names stored in localStorage:
  var DBNAMES = 'Dexie.DatabaseNames';

  try {
    if (typeof localStorage !== undefined && _global.document !== undefined) {
      // Have localStorage and is not executing in a worker. Lets migrate from Dexie 1.x.
      JSON.parse(localStorage.getItem(DBNAMES) || "[]").forEach(function (name) {
        return dbNamesDB.dbnames.put({
          name: name
        }).catch(nop);
      });
      localStorage.removeItem(DBNAMES);
    }
  } catch (_e) {}
})();

/* harmony default export */ __webpack_exports__["a"] = (Dexie);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(13), __webpack_require__(66).setImmediate))

/***/ }),

/***/ 13:
/***/ (function(module, exports) {

var g; // This works in non-strict mode

g = function () {
  return this;
}();

try {
  // This works if eval is allowed (see CSP)
  g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
  // This works if the window reference is available
  if (typeof window === "object") g = window;
} // g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}


module.exports = g;

/***/ }),

/***/ 19:
/***/ (function(module, exports) {

function _typeof(o) {
  "@babel/helpers - typeof";

  return (module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports), _typeof(o);
}

module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 33:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  my_vault_label: "Personal Vault",
  auth: {
    mfaChromeSyncKey: 'login_status'
  },
  duo: {
    timeout: 30000
  },
  alert: {
    defaultToastDuration: 5000
  },
  data_centers: [{
    label: 'Canada',
    code: 'ca'
  }, {
    label: 'United States',
    code: 'us'
  }, {
    label: 'United Kingdom',
    code: 'uk'
  }, {
    label: 'Germany',
    code: 'de'
  }, {
    label: 'Australia',
    code: 'au'
  }]
});

/***/ }),

/***/ 37:
/***/ (function(module, exports, __webpack_require__) {

var toPropertyKey = __webpack_require__(55);

function _defineProperty(obj, key, value) {
  key = toPropertyKey(key);

  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

module.exports = _defineProperty, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 4:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isMainWindow", function() { return isMainWindow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "extractRootDomain", function() { return extractRootDomain; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateProcessKey", function() { return generateProcessKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isElementMarked", function() { return isElementMarked; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toQueryString", function() { return toQueryString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "currentURL", function() { return currentURL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "escapeHTML", function() { return escapeHTML; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "htmlDecode", function() { return htmlDecode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "str_replace_key", function() { return str_replace_key; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "queryStringToObject", function() { return queryStringToObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "flattenObject", function() { return flattenObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isURL", function() { return isURL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isRandomString", function() { return isRandomString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toBoolean", function() { return toBoolean; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ensureArray", function() { return ensureArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toInt", function() { return toInt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isEmpty", function() { return isEmpty; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sortObjectArray", function() { return sortObjectArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sortByTags", function() { return sortByTags; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ucFirst", function() { return ucFirst; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dotSet", function() { return dotSet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dotGet", function() { return dotGet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stringHasAny", function() { return stringHasAny; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isElementVisible", function() { return isElementVisible; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isElementViewable", function() { return isElementViewable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "maskSensitiveInfoFromUrl", function() { return maskSensitiveInfoFromUrl; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_defineProperty__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_defineProperty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__babel_runtime_helpers_typeof__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__babel_runtime_helpers_typeof___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__babel_runtime_helpers_typeof__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__babel_runtime_helpers_toConsumableArray__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__babel_runtime_helpers_toConsumableArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__babel_runtime_helpers_toConsumableArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_parse_domain__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_object_hash__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_object_hash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_object_hash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__constants_options__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_he_he__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_he_he___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_he_he__);



//================================================================================
// Helper Methods
//================================================================================

/** Ajax Call Builder
 * uses https://github.com/axios/axios
 * TODO: When new API is complete rewrite this.  Should be able to set global defaults.
 * */




var helpers = {
  _extractRootDomain: function _extractRootDomain(url, matchSubdomain) {
    try {
      if (!url || !url.length) {
        return '';
      } //IP Address case


      if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(url)) {
        return url;
      }

      var hostname = ''; //hard fix for our nasty subdomain

      url = url.replace('clover-', '');

      var _parseDomain = Object(__WEBPACK_IMPORTED_MODULE_3_parse_domain__["c" /* parseDomain */])(Object(__WEBPACK_IMPORTED_MODULE_3_parse_domain__["b" /* fromUrl */])(url)),
          type = _parseDomain.type,
          subDomains = _parseDomain.subDomains,
          domain = _parseDomain.domain,
          topLevelDomains = _parseDomain.topLevelDomains;

      if (type !== __WEBPACK_IMPORTED_MODULE_3_parse_domain__["a" /* ParseResultType */].Listed) {
        var _hostname; //find & remove protocol (http, ftp, etc.) and get hostname


        if (url.indexOf("://") > -1) {
          _hostname = url.split('/')[2];
        } else {
          _hostname = url.split('/')[0];
        } //find & remove port number


        _hostname = _hostname.split(':')[0]; //find & remove "?"

        _hostname = _hostname.split('?')[0];
        return _hostname;
      }

      if (matchSubdomain && subDomains) {
        var subdomain = subDomains.join('.');

        if (subdomain) {
          hostname = subdomain + '.' + domain;
        } else {
          hostname = domain;
        }
      } else {
        hostname = domain;
      }

      var tld = topLevelDomains.join('.');
      hostname += '.' + tld;
      return hostname;
    } catch (error) {
      return url;
    }
  },

  /**
   * @deprecated
   * Changes the logo color
   * @param SVG
   * @param colour
   * @private
   */
  _changeLogo: function _changeLogo(SVG) {
    var colour = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '#707070';
    chrome.action.setIcon({
      imageData: convertSVGtoDataURI(changeFillSVG(SVG, colour))
    }, function () {});
  },

  /*
  * Get Data URI
  * */
  _getLogo: function _getLogo(SVG) {
    var colour = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '#707070';
    return convertSVGtoDataURI(changeFillSVG(SVG, colour));
  },
  _toBoolean: function _toBoolean(value) {
    if (value === "false") return false;
    return !!(value && (value === true || value === 'true' || parseInt(value, 10) > 0 || value.length > 0));
  },
  _isEmpty: function _isEmpty(value) {
    return value === null || typeof value === "undefined" || value.hasOwnProperty('length') && value.length === 0 || value.constructor === Object && Object.keys(value).length === 0;
  }
};
/* harmony default export */ __webpack_exports__["default"] = (helpers);
var isMainWindow = function isMainWindow() {
  return window.self === window.top;
};
var extractRootDomain = function extractRootDomain(url) {
  var matchSubdomain = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  return helpers._extractRootDomain(url, matchSubdomain);
};
var generateProcessKey = function generateProcessKey() {
  var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'msp';
  return __WEBPACK_IMPORTED_MODULE_4_object_hash___default.a.sha1(key + '-' + extractRootDomain(window.location.href));
};
var isElementMarked = function isElementMarked(element) {
  return element.matches(__WEBPACK_IMPORTED_MODULE_5__constants_options__["d" /* logoIdentifier */].selector) || element.matches('[style*="Passportal_msp"]');
};
var toQueryString = function toQueryString(obj) {
  var con = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '?';
  if (isEmpty(obj)) return '';
  return con + Object.keys(obj).map(function (k) {
    return "".concat(encodeURIComponent(k), "=").concat(encodeURIComponent(obj[k]));
  }).join('&');
};
var currentURL = function currentURL() {
  if (window.self !== window.top) {
    return escapeHTML(document.referrer) || document.location.ancestorOrigins[0];
  }

  return escapeHTML(window.location.href);
};
var escapeHTML = function escapeHTML(text) {
  var map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, function (m) {
    return map[m];
  });
};
var htmlDecode = function htmlDecode(input) {
  if (input) {
    return __WEBPACK_IMPORTED_MODULE_6_he_he___default.a.decode(input);
  }
};
var str_replace_key = function str_replace_key(pairs, str) {
  var key, re;

  for (key in pairs) {
    if (pairs.hasOwnProperty(key)) {
      re = new RegExp(key, "g");
      str = str.replace(re, pairs[key]);
    }
  }

  return str;
};
/**
 * returns object representation of a query string
 * @param value
 * @return {{}|any}
 */

var queryStringToObject = function queryStringToObject(value) {
  try {
    var obj = Object.fromEntries(new URLSearchParams(value));
    return JSON.parse(JSON.stringify(obj));
  } catch (e) {
    return {};
  }
};
/**
 * Returns flattened object
 * @param obj
 * @return {*}
 */

var flattenObject = function flattenObject(obj) {
  return Object.assign.apply(Object, [{}].concat(__WEBPACK_IMPORTED_MODULE_2__babel_runtime_helpers_toConsumableArray___default()(function _flatten(o) {
    var _ref;

    if (isEmpty(o)) return [];
    return (_ref = []).concat.apply(_ref, __WEBPACK_IMPORTED_MODULE_2__babel_runtime_helpers_toConsumableArray___default()(Object.keys(o).map(function (k) {
      return __WEBPACK_IMPORTED_MODULE_1__babel_runtime_helpers_typeof___default()(o[k]) === 'object' ? _flatten(o[k]) : __WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_defineProperty___default()({}, k, o[k]);
    })));
  }(obj))));
};
/**
 * return whether or NOT string is URL
 * @param str
 * @return {boolean}
 */

var isURL = function isURL(str) {
  try {
    if (str) new URL(str);
    return true;
  } catch (e) {}

  return false;
};
/**
 * return whether or NOT string is Random
 * @param str
 * @return {boolean}
 */

var isRandomString = function isRandomString(str) {
  if (typeof str !== 'string' || isURL(str)) return false; // We say its random if its NOT a url
  // doesnt have spaces and its super long for a word

  return str.indexOf(' ') < 0 && str.length > 150;
};
/**
 * returns Boolean representation of a value
 * @param value
 * @returns {boolean}
 * @private
 */

var toBoolean = helpers._toBoolean;
var ensureArray = function ensureArray(data) {
  if (isEmpty(data)) return [];
  var arr = Array.isArray(data) ? data : [data];
  return arr.filter(function (i) {
    return i;
  });
};
var toInt = function toInt(str) {
  var _default = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  var val = parseInt(str);
  return isNaN(val) ? _default : val;
};
/**
 * Returns whether a value is empty or not
 * [] return true; {} returns true
 * @param value
 * @return Boolean
 */

var isEmpty = helpers._isEmpty;
var sortObjectArray = function sortObjectArray(arr, field) {
  if (isEmpty(arr) || !Array.isArray(arr)) return arr;
  return arr.sort(function (a, b) {
    return b[field] - a[field];
  });
};
var sortByTags = function sortByTags(fields) {
  var score = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    INPUT: 1,
    BUTTON: 2,
    DIV: 3
  };
  return __WEBPACK_IMPORTED_MODULE_2__babel_runtime_helpers_toConsumableArray___default()(fields).sort(function (a, b) {
    return (score[a.tagName] || 10) - (score[b.tagName] || 10);
  });
};
/**
 * Returns uppercase first of a string
 * @param s
 * @returns {string}
 */

var ucFirst = function ucFirst(s) {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};
/**
 * Sets the value of nested object
 * @param name dot notated name eg. main.level1.level2.level3
 * @param value value you want to set
 * @param obj the actual object
 * @returns {*}
 */

var dotSet = function dotSet(name, value, obj) {
  if (!name) return value;
  var nested = obj;
  var path = name.split('.');

  for (var i = 0; i < path.length; i++) {
    var key = path[i];

    if (!(key in nested)) {
      nested = nested[key] = i + 1 === path.length ? value : {};
    } else {
      if (i + 1 === path.length) {
        nested[key] = value;
      } else {
        nested = nested[key];
      }
    }
  }

  return obj;
};
/**
 * Returns the value from a nested object
 * @param obj the actual object
 * @param dot dot notated name eg. main.level1.level2.level3
 * @param _default default value if ever there's no such property
 * @returns {*}
 */

var dotGet = function dotGet(obj, dot, _default) {
  try {
    var path = dot.split('.');

    for (var i = 0; i < path.length; i++) {
      if (_default != null && i + 1 === path.length) {
        obj[path[i]] = obj[path[i]] || _default;
      }

      obj = obj[path[i]];
    }

    return typeof obj === "undefined" ? _default : obj;
  } catch (e) {
    return _default;
  }
};
var stringHasAny = function stringHasAny(needle) {
  var stack = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  for (var p in stack) {
    if (needle.includes(stack[p])) return true;
  }

  return false;
};
var isElementVisible = function isElementVisible(elem) {
  if (!(elem instanceof Element)) return false;
  var style = getComputedStyle(elem);
  if (style.display === 'none') return false;
  if (style.visibility !== 'visible') return false;
  if (parseFloat(style.opacity) === 0) return false;

  if (elem.offsetWidth + elem.offsetHeight + elem.getBoundingClientRect().height + elem.getBoundingClientRect().width === 0) {
    return false;
  }

  var elementPoints = {
    'center': {
      x: elem.getBoundingClientRect().left + elem.offsetWidth / 2,
      y: elem.getBoundingClientRect().top + elem.offsetHeight / 2
    },
    'top-left': {
      x: elem.getBoundingClientRect().left,
      y: elem.getBoundingClientRect().top
    },
    'top-right': {
      x: elem.getBoundingClientRect().right,
      y: elem.getBoundingClientRect().top
    },
    'bottom-left': {
      x: elem.getBoundingClientRect().left,
      y: elem.getBoundingClientRect().bottom
    },
    'bottom-right': {
      x: elem.getBoundingClientRect().right,
      y: elem.getBoundingClientRect().bottom
    }
  };

  for (var index in elementPoints) {
    var point = elementPoints[index];
    if (point.x < 0) return false;
    if (point.x > (document.documentElement.clientWidth || window.innerWidth)) return false;
    if (point.y < 0) return false;
    if (point.y > (document.documentElement.clientHeight || window.innerHeight)) return false;
    var pointContainer = document.elementFromPoint(point.x, point.y);

    if (pointContainer !== null) {
      do {
        if (pointContainer === elem) return true;
      } while (pointContainer = pointContainer.parentNode);
    }
  }

  return true;
};
var isElementViewable = function isElementViewable(el) {
  var theDoc = el.ownerDocument.documentElement,
      rect = el.getBoundingClientRect(),
      docScrollWidth = theDoc.scrollWidth,
      docScrollHeight = theDoc.scrollHeight,
      leftOffset = rect.left - theDoc.clientLeft,
      topOffset = rect.top - theDoc.clientTop,
      theRect;

  if (!isElementVisible(el) || !el.offsetParent || 10 > el.clientWidth || 10 > el.clientHeight) {
    return false;
  }

  var rects = el.getClientRects();

  if (0 === rects.length) {
    return false;
  }

  for (var i = 0; i < rects.length; i++) {
    if (theRect = rects[i], theRect.left > docScrollWidth || 0 > theRect.right) {
      return false;
    }
  }

  if (0 > leftOffset || leftOffset > docScrollWidth || 0 > topOffset || topOffset > docScrollHeight) {
    return false;
  } // walk the tree


  var pointEl;

  for (pointEl = el.ownerDocument.elementFromPoint(leftOffset + (rect.right > window.innerWidth ? (window.innerWidth - leftOffset) / 2 : rect.width / 2), topOffset + (rect.bottom > window.innerHeight ? (window.innerHeight - topOffset) / 2 : rect.height / 2)); pointEl && pointEl !== el && pointEl !== document;) {
    if (pointEl.tagName && 'string' === typeof pointEl.tagName && 'label' === pointEl.tagName.toLowerCase() && el.labels && 0 < el.labels.length) {
      return 0 <= Array.prototype.slice.call(el.labels).indexOf(pointEl);
    } // walk up


    pointEl = pointEl.parentNode;
  }

  return pointEl === el;
};
/*
* Changes colour of SVG
* */

var changeFillSVG = function changeFillSVG(SVG, colour) {
  var fill = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '#C046FF';
  return SVG.replace("fill: ".concat(fill), "fill: ".concat(colour));
};
/*
* Methods for converting img to dataURI
* */


var escapeRegExp = function escapeRegExp(str) {
  return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
};

var replaceAll = function replaceAll(str, find, replace) {
  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
};

var convertSVGtoDataURI = function convertSVGtoDataURI(SVG) {
  var encoded = SVG.replace(/\s+/g, " "); // According to Taylor Hunt, lowercase gzips better ... my tiny test confirms this

  encoded = replaceAll(encoded, "%", "%25");
  encoded = replaceAll(encoded, "> <", "><"); // normalise spaces elements

  encoded = replaceAll(encoded, "; }", ";}"); // normalise spaces css

  encoded = replaceAll(encoded, "<", "%3c");
  encoded = replaceAll(encoded, ">", "%3e");
  encoded = replaceAll(encoded, "\"", "'");
  encoded = replaceAll(encoded, "#", "%23"); // needed for ie and firefox

  encoded = replaceAll(encoded, "{", "%7b");
  encoded = replaceAll(encoded, "}", "%7d");
  encoded = replaceAll(encoded, "|", "%7c");
  encoded = replaceAll(encoded, "^", "%5e");
  encoded = replaceAll(encoded, "`", "%60");
  encoded = replaceAll(encoded, "@", "%40");
  return "data:image/svg+xml;charset=UTF-8,".concat(encoded);
};

var maskSensitiveInfoFromUrl = function maskSensitiveInfoFromUrl(urlString) {
  var url = new URL(urlString);
  var sensitiveFields = ['password', 'token'];

  for (var _i = 0, _sensitiveFields = sensitiveFields; _i < _sensitiveFields.length; _i++) {
    var field = _sensitiveFields[_i];

    if (url.searchParams.has(field)) {
      url.searchParams.set(field, '********');
    }
  }

  return url.toString();
};

/***/ }),

/***/ 42:
/***/ (function(module, exports, __webpack_require__) {

var require;var require;!function (e) {
  var t;
   true ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : ("undefined" != typeof window ? t = window : "undefined" != typeof global ? t = global : "undefined" != typeof self && (t = self), t.objectHash = e());
}(function () {
  return function o(i, u, a) {
    function s(n, e) {
      if (!u[n]) {
        if (!i[n]) {
          var t = "function" == typeof require && require;
          if (!e && t) return require(n, !0);
          if (f) return f(n, !0);
          throw new Error("Cannot find module '" + n + "'");
        }

        var r = u[n] = {
          exports: {}
        };
        i[n][0].call(r.exports, function (e) {
          var t = i[n][1][e];
          return s(t || e);
        }, r, r.exports, o, i, u, a);
      }

      return u[n].exports;
    }

    for (var f = "function" == typeof require && require, e = 0; e < a.length; e++) s(a[e]);

    return s;
  }({
    1: [function (w, b, m) {
      (function (e, t, f, n, r, o, i, u, a) {
        "use strict";

        var s = w("crypto");

        function c(e, t) {
          return function (e, t) {
            var n;
            n = "passthrough" !== t.algorithm ? s.createHash(t.algorithm) : new y();
            void 0 === n.write && (n.write = n.update, n.end = n.update);
            g(t, n).dispatch(e), n.update || n.end("");
            if (n.digest) return n.digest("buffer" === t.encoding ? void 0 : t.encoding);
            var r = n.read();
            return "buffer" !== t.encoding ? r.toString(t.encoding) : r;
          }(e, t = h(e, t));
        }

        (m = b.exports = c).sha1 = function (e) {
          return c(e);
        }, m.keys = function (e) {
          return c(e, {
            excludeValues: !0,
            algorithm: "sha1",
            encoding: "hex"
          });
        }, m.MD5 = function (e) {
          return c(e, {
            algorithm: "md5",
            encoding: "hex"
          });
        }, m.keysMD5 = function (e) {
          return c(e, {
            algorithm: "md5",
            encoding: "hex",
            excludeValues: !0
          });
        };
        var l = s.getHashes ? s.getHashes().slice() : ["sha1", "md5"];
        l.push("passthrough");
        var d = ["buffer", "hex", "binary", "base64"];

        function h(e, t) {
          t = t || {};
          var n = {};
          if (n.algorithm = t.algorithm || "sha1", n.encoding = t.encoding || "hex", n.excludeValues = !!t.excludeValues, n.algorithm = n.algorithm.toLowerCase(), n.encoding = n.encoding.toLowerCase(), n.ignoreUnknown = !0 === t.ignoreUnknown, n.respectType = !1 !== t.respectType, n.respectFunctionNames = !1 !== t.respectFunctionNames, n.respectFunctionProperties = !1 !== t.respectFunctionProperties, n.unorderedArrays = !0 === t.unorderedArrays, n.unorderedSets = !1 !== t.unorderedSets, n.unorderedObjects = !1 !== t.unorderedObjects, n.replacer = t.replacer || void 0, n.excludeKeys = t.excludeKeys || void 0, void 0 === e) throw new Error("Object argument required.");

          for (var r = 0; r < l.length; ++r) l[r].toLowerCase() === n.algorithm.toLowerCase() && (n.algorithm = l[r]);

          if (-1 === l.indexOf(n.algorithm)) throw new Error('Algorithm "' + n.algorithm + '"  not supported. supported values: ' + l.join(", "));
          if (-1 === d.indexOf(n.encoding) && "passthrough" !== n.algorithm) throw new Error('Encoding "' + n.encoding + '"  not supported. supported values: ' + d.join(", "));
          return n;
        }

        function p(e) {
          if ("function" == typeof e) {
            return null != /^function\s+\w*\s*\(\s*\)\s*{\s+\[native code\]\s+}$/i.exec(Function.prototype.toString.call(e));
          }
        }

        function g(u, t, a) {
          a = a || [];

          function s(e) {
            return t.update ? t.update(e, "utf8") : t.write(e, "utf8");
          }

          return {
            dispatch: function (e) {
              return u.replacer && (e = u.replacer(e)), this["_" + (null === e ? "null" : typeof e)](e);
            },
            _object: function (t) {
              var e = Object.prototype.toString.call(t),
                  n = /\[object (.*)\]/i.exec(e);
              n = (n = n ? n[1] : "unknown:[" + e + "]").toLowerCase();
              var r;
              if (0 <= (r = a.indexOf(t))) return this.dispatch("[CIRCULAR:" + r + "]");
              if (a.push(t), void 0 !== f && f.isBuffer && f.isBuffer(t)) return s("buffer:"), s(t);

              if ("object" === n || "function" === n || "asyncfunction" === n) {
                var o = Object.keys(t);
                u.unorderedObjects && (o = o.sort()), !1 === u.respectType || p(t) || o.splice(0, 0, "prototype", "__proto__", "constructor"), u.excludeKeys && (o = o.filter(function (e) {
                  return !u.excludeKeys(e);
                })), s("object:" + o.length + ":");
                var i = this;
                return o.forEach(function (e) {
                  i.dispatch(e), s(":"), u.excludeValues || i.dispatch(t[e]), s(",");
                });
              }

              if (!this["_" + n]) {
                if (u.ignoreUnknown) return s("[" + n + "]");
                throw new Error('Unknown object type "' + n + '"');
              }

              this["_" + n](t);
            },
            _array: function (e, t) {
              t = void 0 !== t ? t : !1 !== u.unorderedArrays;
              var n = this;
              if (s("array:" + e.length + ":"), !t || e.length <= 1) return e.forEach(function (e) {
                return n.dispatch(e);
              });
              var r = [],
                  o = e.map(function (e) {
                var t = new y(),
                    n = a.slice();
                return g(u, t, n).dispatch(e), r = r.concat(n.slice(a.length)), t.read().toString();
              });
              return a = a.concat(r), o.sort(), this._array(o, !1);
            },
            _date: function (e) {
              return s("date:" + e.toJSON());
            },
            _symbol: function (e) {
              return s("symbol:" + e.toString());
            },
            _error: function (e) {
              return s("error:" + e.toString());
            },
            _boolean: function (e) {
              return s("bool:" + e.toString());
            },
            _string: function (e) {
              s("string:" + e.length + ":"), s(e.toString());
            },
            _function: function (e) {
              s("fn:"), p(e) ? this.dispatch("[native]") : this.dispatch(e.toString()), !1 !== u.respectFunctionNames && this.dispatch("function-name:" + String(e.name)), u.respectFunctionProperties && this._object(e);
            },
            _number: function (e) {
              return s("number:" + e.toString());
            },
            _xml: function (e) {
              return s("xml:" + e.toString());
            },
            _null: function () {
              return s("Null");
            },
            _undefined: function () {
              return s("Undefined");
            },
            _regexp: function (e) {
              return s("regex:" + e.toString());
            },
            _uint8array: function (e) {
              return s("uint8array:"), this.dispatch(Array.prototype.slice.call(e));
            },
            _uint8clampedarray: function (e) {
              return s("uint8clampedarray:"), this.dispatch(Array.prototype.slice.call(e));
            },
            _int8array: function (e) {
              return s("uint8array:"), this.dispatch(Array.prototype.slice.call(e));
            },
            _uint16array: function (e) {
              return s("uint16array:"), this.dispatch(Array.prototype.slice.call(e));
            },
            _int16array: function (e) {
              return s("uint16array:"), this.dispatch(Array.prototype.slice.call(e));
            },
            _uint32array: function (e) {
              return s("uint32array:"), this.dispatch(Array.prototype.slice.call(e));
            },
            _int32array: function (e) {
              return s("uint32array:"), this.dispatch(Array.prototype.slice.call(e));
            },
            _float32array: function (e) {
              return s("float32array:"), this.dispatch(Array.prototype.slice.call(e));
            },
            _float64array: function (e) {
              return s("float64array:"), this.dispatch(Array.prototype.slice.call(e));
            },
            _arraybuffer: function (e) {
              return s("arraybuffer:"), this.dispatch(new Uint8Array(e));
            },
            _url: function (e) {
              return s("url:" + e.toString());
            },
            _map: function (e) {
              s("map:");
              var t = Array.from(e);
              return this._array(t, !1 !== u.unorderedSets);
            },
            _set: function (e) {
              s("set:");
              var t = Array.from(e);
              return this._array(t, !1 !== u.unorderedSets);
            },
            _file: function (e) {
              return s("file:"), this.dispatch([e.name, e.size, e.type, e.lastModfied]);
            },
            _blob: function () {
              if (u.ignoreUnknown) return s("[blob]");
              throw Error('Hashing Blob objects is currently not supported\n(see https://github.com/puleos/object-hash/issues/26)\nUse "options.replacer" or "options.ignoreUnknown"\n');
            },
            _domwindow: function () {
              return s("domwindow");
            },
            _bigint: function (e) {
              return s("bigint:" + e.toString());
            },
            _process: function () {
              return s("process");
            },
            _timer: function () {
              return s("timer");
            },
            _pipe: function () {
              return s("pipe");
            },
            _tcp: function () {
              return s("tcp");
            },
            _udp: function () {
              return s("udp");
            },
            _tty: function () {
              return s("tty");
            },
            _statwatcher: function () {
              return s("statwatcher");
            },
            _securecontext: function () {
              return s("securecontext");
            },
            _connection: function () {
              return s("connection");
            },
            _zlib: function () {
              return s("zlib");
            },
            _context: function () {
              return s("context");
            },
            _nodescript: function () {
              return s("nodescript");
            },
            _httpparser: function () {
              return s("httpparser");
            },
            _dataview: function () {
              return s("dataview");
            },
            _signal: function () {
              return s("signal");
            },
            _fsevent: function () {
              return s("fsevent");
            },
            _tlswrap: function () {
              return s("tlswrap");
            }
          };
        }

        function y() {
          return {
            buf: "",
            write: function (e) {
              this.buf += e;
            },
            end: function (e) {
              this.buf += e;
            },
            read: function () {
              return this.buf;
            }
          };
        }

        m.writeToStream = function (e, t, n) {
          return void 0 === n && (n = t, t = {}), g(t = h(e, t), n).dispatch(e);
        };
      }).call(this, w("lYpoI2"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, w("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/fake_7eac155c.js", "/");
    }, {
      buffer: 3,
      crypto: 5,
      lYpoI2: 10
    }],
    2: [function (e, t, f) {
      (function (e, t, n, r, o, i, u, a, s) {
        !function (e) {
          "use strict";

          var f = "undefined" != typeof Uint8Array ? Uint8Array : Array,
              n = "+".charCodeAt(0),
              r = "/".charCodeAt(0),
              o = "0".charCodeAt(0),
              i = "a".charCodeAt(0),
              u = "A".charCodeAt(0),
              a = "-".charCodeAt(0),
              s = "_".charCodeAt(0);

          function c(e) {
            var t = e.charCodeAt(0);
            return t === n || t === a ? 62 : t === r || t === s ? 63 : t < o ? -1 : t < o + 10 ? t - o + 26 + 26 : t < u + 26 ? t - u : t < i + 26 ? t - i + 26 : void 0;
          }

          e.toByteArray = function (e) {
            var t, n;
            if (0 < e.length % 4) throw new Error("Invalid string. Length must be a multiple of 4");
            var r = e.length,
                o = "=" === e.charAt(r - 2) ? 2 : "=" === e.charAt(r - 1) ? 1 : 0,
                i = new f(3 * e.length / 4 - o),
                u = 0 < o ? e.length - 4 : e.length,
                a = 0;

            function s(e) {
              i[a++] = e;
            }

            for (t = 0; t < u; t += 4, 0) s((16711680 & (n = c(e.charAt(t)) << 18 | c(e.charAt(t + 1)) << 12 | c(e.charAt(t + 2)) << 6 | c(e.charAt(t + 3)))) >> 16), s((65280 & n) >> 8), s(255 & n);

            return 2 == o ? s(255 & (n = c(e.charAt(t)) << 2 | c(e.charAt(t + 1)) >> 4)) : 1 == o && (s((n = c(e.charAt(t)) << 10 | c(e.charAt(t + 1)) << 4 | c(e.charAt(t + 2)) >> 2) >> 8 & 255), s(255 & n)), i;
          }, e.fromByteArray = function (e) {
            var t,
                n,
                r,
                o,
                i = e.length % 3,
                u = "";

            function a(e) {
              return "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(e);
            }

            for (t = 0, r = e.length - i; t < r; t += 3) n = (e[t] << 16) + (e[t + 1] << 8) + e[t + 2], u += a((o = n) >> 18 & 63) + a(o >> 12 & 63) + a(o >> 6 & 63) + a(63 & o);

            switch (i) {
              case 1:
                u += a((n = e[e.length - 1]) >> 2), u += a(n << 4 & 63), u += "==";
                break;

              case 2:
                u += a((n = (e[e.length - 2] << 8) + e[e.length - 1]) >> 10), u += a(n >> 4 & 63), u += a(n << 2 & 63), u += "=";
            }

            return u;
          };
        }(void 0 === f ? this.base64js = {} : f);
      }).call(this, e("lYpoI2"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/base64-js/lib/b64.js", "/node_modules/gulp-browserify/node_modules/base64-js/lib");
    }, {
      buffer: 3,
      lYpoI2: 10
    }],
    3: [function (O, e, H) {
      (function (e, t, g, n, r, o, i, u, a) {
        var s = O("base64-js"),
            f = O("ieee754");

        function g(e, t, n) {
          if (!(this instanceof g)) return new g(e, t, n);
          var r,
              o,
              i,
              u,
              a,
              s = typeof e;
          if ("base64" === t && "string" == s) for (e = (r = e).trim ? r.trim() : r.replace(/^\s+|\s+$/g, ""); e.length % 4 != 0;) e += "=";
          if ("number" == s) o = x(e);else if ("string" == s) o = g.byteLength(e, t);else {
            if ("object" != s) throw new Error("First argument needs to be a number, array or string.");
            o = x(e.length);
          }
          if (g._useTypedArrays ? i = g._augment(new Uint8Array(o)) : ((i = this).length = o, i._isBuffer = !0), g._useTypedArrays && "number" == typeof e.byteLength) i._set(e);else if (S(a = e) || g.isBuffer(a) || a && "object" == typeof a && "number" == typeof a.length) for (u = 0; u < o; u++) g.isBuffer(e) ? i[u] = e.readUInt8(u) : i[u] = e[u];else if ("string" == s) i.write(e, 0, t);else if ("number" == s && !g._useTypedArrays && !n) for (u = 0; u < o; u++) i[u] = 0;
          return i;
        }

        function y(e, t, n, r) {
          return g._charsWritten = T(function (e) {
            for (var t = [], n = 0; n < e.length; n++) t.push(255 & e.charCodeAt(n));

            return t;
          }(t), e, n, r);
        }

        function w(e, t, n, r) {
          return g._charsWritten = T(function (e) {
            for (var t, n, r, o = [], i = 0; i < e.length; i++) t = e.charCodeAt(i), n = t >> 8, r = t % 256, o.push(r), o.push(n);

            return o;
          }(t), e, n, r);
        }

        function c(e, t, n) {
          var r = "";
          n = Math.min(e.length, n);

          for (var o = t; o < n; o++) r += String.fromCharCode(e[o]);

          return r;
        }

        function l(e, t, n, r) {
          r || (D("boolean" == typeof n, "missing or invalid endian"), D(null != t, "missing offset"), D(t + 1 < e.length, "Trying to read beyond buffer length"));
          var o,
              i = e.length;
          if (!(i <= t)) return n ? (o = e[t], t + 1 < i && (o |= e[t + 1] << 8)) : (o = e[t] << 8, t + 1 < i && (o |= e[t + 1])), o;
        }

        function d(e, t, n, r) {
          r || (D("boolean" == typeof n, "missing or invalid endian"), D(null != t, "missing offset"), D(t + 3 < e.length, "Trying to read beyond buffer length"));
          var o,
              i = e.length;
          if (!(i <= t)) return n ? (t + 2 < i && (o = e[t + 2] << 16), t + 1 < i && (o |= e[t + 1] << 8), o |= e[t], t + 3 < i && (o += e[t + 3] << 24 >>> 0)) : (t + 1 < i && (o = e[t + 1] << 16), t + 2 < i && (o |= e[t + 2] << 8), t + 3 < i && (o |= e[t + 3]), o += e[t] << 24 >>> 0), o;
        }

        function h(e, t, n, r) {
          if (r || (D("boolean" == typeof n, "missing or invalid endian"), D(null != t, "missing offset"), D(t + 1 < e.length, "Trying to read beyond buffer length")), !(e.length <= t)) {
            var o = l(e, t, n, !0);
            return 32768 & o ? -1 * (65535 - o + 1) : o;
          }
        }

        function p(e, t, n, r) {
          if (r || (D("boolean" == typeof n, "missing or invalid endian"), D(null != t, "missing offset"), D(t + 3 < e.length, "Trying to read beyond buffer length")), !(e.length <= t)) {
            var o = d(e, t, n, !0);
            return 2147483648 & o ? -1 * (4294967295 - o + 1) : o;
          }
        }

        function b(e, t, n, r) {
          return r || (D("boolean" == typeof n, "missing or invalid endian"), D(t + 3 < e.length, "Trying to read beyond buffer length")), f.read(e, t, n, 23, 4);
        }

        function m(e, t, n, r) {
          return r || (D("boolean" == typeof n, "missing or invalid endian"), D(t + 7 < e.length, "Trying to read beyond buffer length")), f.read(e, t, n, 52, 8);
        }

        function v(e, t, n, r, o) {
          o || (D(null != t, "missing value"), D("boolean" == typeof r, "missing or invalid endian"), D(null != n, "missing offset"), D(n + 1 < e.length, "trying to write beyond buffer length"), N(t, 65535));
          var i = e.length;
          if (!(i <= n)) for (var u = 0, a = Math.min(i - n, 2); u < a; u++) e[n + u] = (t & 255 << 8 * (r ? u : 1 - u)) >>> 8 * (r ? u : 1 - u);
        }

        function _(e, t, n, r, o) {
          o || (D(null != t, "missing value"), D("boolean" == typeof r, "missing or invalid endian"), D(null != n, "missing offset"), D(n + 3 < e.length, "trying to write beyond buffer length"), N(t, 4294967295));
          var i = e.length;
          if (!(i <= n)) for (var u = 0, a = Math.min(i - n, 4); u < a; u++) e[n + u] = t >>> 8 * (r ? u : 3 - u) & 255;
        }

        function E(e, t, n, r, o) {
          o || (D(null != t, "missing value"), D("boolean" == typeof r, "missing or invalid endian"), D(null != n, "missing offset"), D(n + 1 < e.length, "Trying to write beyond buffer length"), Y(t, 32767, -32768)), e.length <= n || v(e, 0 <= t ? t : 65535 + t + 1, n, r, o);
        }

        function I(e, t, n, r, o) {
          o || (D(null != t, "missing value"), D("boolean" == typeof r, "missing or invalid endian"), D(null != n, "missing offset"), D(n + 3 < e.length, "Trying to write beyond buffer length"), Y(t, 2147483647, -2147483648)), e.length <= n || _(e, 0 <= t ? t : 4294967295 + t + 1, n, r, o);
        }

        function A(e, t, n, r, o) {
          o || (D(null != t, "missing value"), D("boolean" == typeof r, "missing or invalid endian"), D(null != n, "missing offset"), D(n + 3 < e.length, "Trying to write beyond buffer length"), F(t, 34028234663852886e22, -34028234663852886e22)), e.length <= n || f.write(e, t, n, r, 23, 4);
        }

        function B(e, t, n, r, o) {
          o || (D(null != t, "missing value"), D("boolean" == typeof r, "missing or invalid endian"), D(null != n, "missing offset"), D(n + 7 < e.length, "Trying to write beyond buffer length"), F(t, 17976931348623157e292, -17976931348623157e292)), e.length <= n || f.write(e, t, n, r, 52, 8);
        }

        H.Buffer = g, H.SlowBuffer = g, H.INSPECT_MAX_BYTES = 50, g.poolSize = 8192, g._useTypedArrays = function () {
          try {
            var e = new ArrayBuffer(0),
                t = new Uint8Array(e);
            return t.foo = function () {
              return 42;
            }, 42 === t.foo() && "function" == typeof t.subarray;
          } catch (e) {
            return !1;
          }
        }(), g.isEncoding = function (e) {
          switch (String(e).toLowerCase()) {
            case "hex":
            case "utf8":
            case "utf-8":
            case "ascii":
            case "binary":
            case "base64":
            case "raw":
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return !0;

            default:
              return !1;
          }
        }, g.isBuffer = function (e) {
          return !(null == e || !e._isBuffer);
        }, g.byteLength = function (e, t) {
          var n;

          switch (e += "", t || "utf8") {
            case "hex":
              n = e.length / 2;
              break;

            case "utf8":
            case "utf-8":
              n = C(e).length;
              break;

            case "ascii":
            case "binary":
            case "raw":
              n = e.length;
              break;

            case "base64":
              n = k(e).length;
              break;

            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              n = 2 * e.length;
              break;

            default:
              throw new Error("Unknown encoding");
          }

          return n;
        }, g.concat = function (e, t) {
          if (D(S(e), "Usage: Buffer.concat(list, [totalLength])\nlist should be an Array."), 0 === e.length) return new g(0);
          if (1 === e.length) return e[0];
          if ("number" != typeof t) for (o = t = 0; o < e.length; o++) t += e[o].length;

          for (var n = new g(t), r = 0, o = 0; o < e.length; o++) {
            var i = e[o];
            i.copy(n, r), r += i.length;
          }

          return n;
        }, g.prototype.write = function (e, t, n, r) {
          var o;
          isFinite(t) ? isFinite(n) || (r = n, n = void 0) : (o = r, r = t, t = n, n = o), t = Number(t) || 0;
          var i,
              u,
              a,
              s,
              f,
              c,
              l,
              d,
              h,
              p = this.length - t;

          switch ((!n || p < (n = Number(n))) && (n = p), r = String(r || "utf8").toLowerCase()) {
            case "hex":
              i = function (e, t, n, r) {
                n = Number(n) || 0;
                var o = e.length - n;
                (!r || o < (r = Number(r))) && (r = o);
                var i = t.length;
                D(i % 2 == 0, "Invalid hex string"), i / 2 < r && (r = i / 2);

                for (var u = 0; u < r; u++) {
                  var a = parseInt(t.substr(2 * u, 2), 16);
                  D(!isNaN(a), "Invalid hex string"), e[n + u] = a;
                }

                return g._charsWritten = 2 * u, u;
              }(this, e, t, n);

              break;

            case "utf8":
            case "utf-8":
              c = this, l = e, d = t, h = n, i = g._charsWritten = T(C(l), c, d, h);
              break;

            case "ascii":
            case "binary":
              i = y(this, e, t, n);
              break;

            case "base64":
              u = this, a = e, s = t, f = n, i = g._charsWritten = T(k(a), u, s, f);
              break;

            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              i = w(this, e, t, n);
              break;

            default:
              throw new Error("Unknown encoding");
          }

          return i;
        }, g.prototype.toString = function (e, t, n) {
          var r,
              o,
              i,
              u,
              a = this;
          if (e = String(e || "utf8").toLowerCase(), t = Number(t) || 0, (n = void 0 !== n ? Number(n) : n = a.length) === t) return "";

          switch (e) {
            case "hex":
              r = function (e, t, n) {
                var r = e.length;
                (!t || t < 0) && (t = 0);
                (!n || n < 0 || r < n) && (n = r);

                for (var o = "", i = t; i < n; i++) o += j(e[i]);

                return o;
              }(a, t, n);

              break;

            case "utf8":
            case "utf-8":
              r = function (e, t, n) {
                var r = "",
                    o = "";
                n = Math.min(e.length, n);

                for (var i = t; i < n; i++) e[i] <= 127 ? (r += M(o) + String.fromCharCode(e[i]), o = "") : o += "%" + e[i].toString(16);

                return r + M(o);
              }(a, t, n);

              break;

            case "ascii":
            case "binary":
              r = c(a, t, n);
              break;

            case "base64":
              o = a, u = n, r = 0 === (i = t) && u === o.length ? s.fromByteArray(o) : s.fromByteArray(o.slice(i, u));
              break;

            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              r = function (e, t, n) {
                for (var r = e.slice(t, n), o = "", i = 0; i < r.length; i += 2) o += String.fromCharCode(r[i] + 256 * r[i + 1]);

                return o;
              }(a, t, n);

              break;

            default:
              throw new Error("Unknown encoding");
          }

          return r;
        }, g.prototype.toJSON = function () {
          return {
            type: "Buffer",
            data: Array.prototype.slice.call(this._arr || this, 0)
          };
        }, g.prototype.copy = function (e, t, n, r) {
          if (n = n || 0, r || 0 === r || (r = this.length), t = t || 0, r !== n && 0 !== e.length && 0 !== this.length) {
            D(n <= r, "sourceEnd < sourceStart"), D(0 <= t && t < e.length, "targetStart out of bounds"), D(0 <= n && n < this.length, "sourceStart out of bounds"), D(0 <= r && r <= this.length, "sourceEnd out of bounds"), r > this.length && (r = this.length), e.length - t < r - n && (r = e.length - t + n);
            var o = r - n;
            if (o < 100 || !g._useTypedArrays) for (var i = 0; i < o; i++) e[i + t] = this[i + n];else e._set(this.subarray(n, n + o), t);
          }
        }, g.prototype.slice = function (e, t) {
          var n = this.length;
          if (e = U(e, n, 0), t = U(t, n, n), g._useTypedArrays) return g._augment(this.subarray(e, t));

          for (var r = t - e, o = new g(r, void 0, !0), i = 0; i < r; i++) o[i] = this[i + e];

          return o;
        }, g.prototype.get = function (e) {
          return console.log(".get() is deprecated. Access using array indexes instead."), this.readUInt8(e);
        }, g.prototype.set = function (e, t) {
          return console.log(".set() is deprecated. Access using array indexes instead."), this.writeUInt8(e, t);
        }, g.prototype.readUInt8 = function (e, t) {
          if (t || (D(null != e, "missing offset"), D(e < this.length, "Trying to read beyond buffer length")), !(e >= this.length)) return this[e];
        }, g.prototype.readUInt16LE = function (e, t) {
          return l(this, e, !0, t);
        }, g.prototype.readUInt16BE = function (e, t) {
          return l(this, e, !1, t);
        }, g.prototype.readUInt32LE = function (e, t) {
          return d(this, e, !0, t);
        }, g.prototype.readUInt32BE = function (e, t) {
          return d(this, e, !1, t);
        }, g.prototype.readInt8 = function (e, t) {
          if (t || (D(null != e, "missing offset"), D(e < this.length, "Trying to read beyond buffer length")), !(e >= this.length)) return 128 & this[e] ? -1 * (255 - this[e] + 1) : this[e];
        }, g.prototype.readInt16LE = function (e, t) {
          return h(this, e, !0, t);
        }, g.prototype.readInt16BE = function (e, t) {
          return h(this, e, !1, t);
        }, g.prototype.readInt32LE = function (e, t) {
          return p(this, e, !0, t);
        }, g.prototype.readInt32BE = function (e, t) {
          return p(this, e, !1, t);
        }, g.prototype.readFloatLE = function (e, t) {
          return b(this, e, !0, t);
        }, g.prototype.readFloatBE = function (e, t) {
          return b(this, e, !1, t);
        }, g.prototype.readDoubleLE = function (e, t) {
          return m(this, e, !0, t);
        }, g.prototype.readDoubleBE = function (e, t) {
          return m(this, e, !1, t);
        }, g.prototype.writeUInt8 = function (e, t, n) {
          n || (D(null != e, "missing value"), D(null != t, "missing offset"), D(t < this.length, "trying to write beyond buffer length"), N(e, 255)), t >= this.length || (this[t] = e);
        }, g.prototype.writeUInt16LE = function (e, t, n) {
          v(this, e, t, !0, n);
        }, g.prototype.writeUInt16BE = function (e, t, n) {
          v(this, e, t, !1, n);
        }, g.prototype.writeUInt32LE = function (e, t, n) {
          _(this, e, t, !0, n);
        }, g.prototype.writeUInt32BE = function (e, t, n) {
          _(this, e, t, !1, n);
        }, g.prototype.writeInt8 = function (e, t, n) {
          n || (D(null != e, "missing value"), D(null != t, "missing offset"), D(t < this.length, "Trying to write beyond buffer length"), Y(e, 127, -128)), t >= this.length || (0 <= e ? this.writeUInt8(e, t, n) : this.writeUInt8(255 + e + 1, t, n));
        }, g.prototype.writeInt16LE = function (e, t, n) {
          E(this, e, t, !0, n);
        }, g.prototype.writeInt16BE = function (e, t, n) {
          E(this, e, t, !1, n);
        }, g.prototype.writeInt32LE = function (e, t, n) {
          I(this, e, t, !0, n);
        }, g.prototype.writeInt32BE = function (e, t, n) {
          I(this, e, t, !1, n);
        }, g.prototype.writeFloatLE = function (e, t, n) {
          A(this, e, t, !0, n);
        }, g.prototype.writeFloatBE = function (e, t, n) {
          A(this, e, t, !1, n);
        }, g.prototype.writeDoubleLE = function (e, t, n) {
          B(this, e, t, !0, n);
        }, g.prototype.writeDoubleBE = function (e, t, n) {
          B(this, e, t, !1, n);
        }, g.prototype.fill = function (e, t, n) {
          if (e = e || 0, t = t || 0, n = n || this.length, "string" == typeof e && (e = e.charCodeAt(0)), D("number" == typeof e && !isNaN(e), "value is not a number"), D(t <= n, "end < start"), n !== t && 0 !== this.length) {
            D(0 <= t && t < this.length, "start out of bounds"), D(0 <= n && n <= this.length, "end out of bounds");

            for (var r = t; r < n; r++) this[r] = e;
          }
        }, g.prototype.inspect = function () {
          for (var e = [], t = this.length, n = 0; n < t; n++) if (e[n] = j(this[n]), n === H.INSPECT_MAX_BYTES) {
            e[n + 1] = "...";
            break;
          }

          return "<Buffer " + e.join(" ") + ">";
        }, g.prototype.toArrayBuffer = function () {
          if ("undefined" == typeof Uint8Array) throw new Error("Buffer.toArrayBuffer not supported in this browser");
          if (g._useTypedArrays) return new g(this).buffer;

          for (var e = new Uint8Array(this.length), t = 0, n = e.length; t < n; t += 1) e[t] = this[t];

          return e.buffer;
        };
        var L = g.prototype;

        function U(e, t, n) {
          return "number" != typeof e ? n : t <= (e = ~~e) ? t : 0 <= e || 0 <= (e += t) ? e : 0;
        }

        function x(e) {
          return (e = ~~Math.ceil(+e)) < 0 ? 0 : e;
        }

        function S(e) {
          return (Array.isArray || function (e) {
            return "[object Array]" === Object.prototype.toString.call(e);
          })(e);
        }

        function j(e) {
          return e < 16 ? "0" + e.toString(16) : e.toString(16);
        }

        function C(e) {
          for (var t = [], n = 0; n < e.length; n++) {
            var r = e.charCodeAt(n);
            if (r <= 127) t.push(e.charCodeAt(n));else {
              var o = n;
              55296 <= r && r <= 57343 && n++;

              for (var i = encodeURIComponent(e.slice(o, n + 1)).substr(1).split("%"), u = 0; u < i.length; u++) t.push(parseInt(i[u], 16));
            }
          }

          return t;
        }

        function k(e) {
          return s.toByteArray(e);
        }

        function T(e, t, n, r) {
          for (var o = 0; o < r && !(o + n >= t.length || o >= e.length); o++) t[o + n] = e[o];

          return o;
        }

        function M(e) {
          try {
            return decodeURIComponent(e);
          } catch (e) {
            return String.fromCharCode(65533);
          }
        }

        function N(e, t) {
          D("number" == typeof e, "cannot write a non-number as a number"), D(0 <= e, "specified a negative value for writing an unsigned value"), D(e <= t, "value is larger than maximum value for type"), D(Math.floor(e) === e, "value has a fractional component");
        }

        function Y(e, t, n) {
          D("number" == typeof e, "cannot write a non-number as a number"), D(e <= t, "value larger than maximum allowed value"), D(n <= e, "value smaller than minimum allowed value"), D(Math.floor(e) === e, "value has a fractional component");
        }

        function F(e, t, n) {
          D("number" == typeof e, "cannot write a non-number as a number"), D(e <= t, "value larger than maximum allowed value"), D(n <= e, "value smaller than minimum allowed value");
        }

        function D(e, t) {
          if (!e) throw new Error(t || "Failed assertion");
        }

        g._augment = function (e) {
          return e._isBuffer = !0, e._get = e.get, e._set = e.set, e.get = L.get, e.set = L.set, e.write = L.write, e.toString = L.toString, e.toLocaleString = L.toString, e.toJSON = L.toJSON, e.copy = L.copy, e.slice = L.slice, e.readUInt8 = L.readUInt8, e.readUInt16LE = L.readUInt16LE, e.readUInt16BE = L.readUInt16BE, e.readUInt32LE = L.readUInt32LE, e.readUInt32BE = L.readUInt32BE, e.readInt8 = L.readInt8, e.readInt16LE = L.readInt16LE, e.readInt16BE = L.readInt16BE, e.readInt32LE = L.readInt32LE, e.readInt32BE = L.readInt32BE, e.readFloatLE = L.readFloatLE, e.readFloatBE = L.readFloatBE, e.readDoubleLE = L.readDoubleLE, e.readDoubleBE = L.readDoubleBE, e.writeUInt8 = L.writeUInt8, e.writeUInt16LE = L.writeUInt16LE, e.writeUInt16BE = L.writeUInt16BE, e.writeUInt32LE = L.writeUInt32LE, e.writeUInt32BE = L.writeUInt32BE, e.writeInt8 = L.writeInt8, e.writeInt16LE = L.writeInt16LE, e.writeInt16BE = L.writeInt16BE, e.writeInt32LE = L.writeInt32LE, e.writeInt32BE = L.writeInt32BE, e.writeFloatLE = L.writeFloatLE, e.writeFloatBE = L.writeFloatBE, e.writeDoubleLE = L.writeDoubleLE, e.writeDoubleBE = L.writeDoubleBE, e.fill = L.fill, e.inspect = L.inspect, e.toArrayBuffer = L.toArrayBuffer, e;
        };
      }).call(this, O("lYpoI2"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, O("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/buffer/index.js", "/node_modules/gulp-browserify/node_modules/buffer");
    }, {
      "base64-js": 2,
      buffer: 3,
      ieee754: 11,
      lYpoI2: 10
    }],
    4: [function (l, d, e) {
      (function (e, t, u, n, r, o, i, a, s) {
        var u = l("buffer").Buffer,
            f = 4,
            c = new u(f);
        c.fill(0);
        d.exports = {
          hash: function (e, t, n, r) {
            return u.isBuffer(e) || (e = new u(e)), function (e, t, n) {
              for (var r = new u(t), o = n ? r.writeInt32BE : r.writeInt32LE, i = 0; i < e.length; i++) o.call(r, e[i], 4 * i, !0);

              return r;
            }(t(function (e, t) {
              var n;
              e.length % f != 0 && (n = e.length + (f - e.length % f), e = u.concat([e, c], n));

              for (var r = [], o = t ? e.readInt32BE : e.readInt32LE, i = 0; i < e.length; i += f) r.push(o.call(e, i));

              return r;
            }(e, r), 8 * e.length), n, r);
          }
        };
      }).call(this, l("lYpoI2"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, l("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/crypto-browserify/helpers.js", "/node_modules/gulp-browserify/node_modules/crypto-browserify");
    }, {
      buffer: 3,
      lYpoI2: 10
    }],
    5: [function (w, e, b) {
      (function (e, t, a, n, r, o, i, u, s) {
        var a = w("buffer").Buffer,
            f = w("./sha"),
            c = w("./sha256"),
            l = w("./rng"),
            d = {
          sha1: f,
          sha256: c,
          md5: w("./md5")
        },
            h = 64,
            p = new a(h);

        function g(e, r) {
          var o = d[e = e || "sha1"],
              i = [];
          return o || y("algorithm:", e, "is not yet supported"), {
            update: function (e) {
              return a.isBuffer(e) || (e = new a(e)), i.push(e), e.length, this;
            },
            digest: function (e) {
              var t = a.concat(i),
                  n = r ? function (e, t, n) {
                a.isBuffer(t) || (t = new a(t)), a.isBuffer(n) || (n = new a(n)), t.length > h ? t = e(t) : t.length < h && (t = a.concat([t, p], h));

                for (var r = new a(h), o = new a(h), i = 0; i < h; i++) r[i] = 54 ^ t[i], o[i] = 92 ^ t[i];

                var u = e(a.concat([r, n]));
                return e(a.concat([o, u]));
              }(o, r, t) : o(t);
              return i = null, e ? n.toString(e) : n;
            }
          };
        }

        function y() {
          var e = [].slice.call(arguments).join(" ");
          throw new Error([e, "we accept pull requests", "http://github.com/dominictarr/crypto-browserify"].join("\n"));
        }

        p.fill(0), b.createHash = function (e) {
          return g(e);
        }, b.createHmac = g, b.randomBytes = function (e, t) {
          if (!t || !t.call) return new a(l(e));

          try {
            t.call(this, void 0, new a(l(e)));
          } catch (e) {
            t(e);
          }
        }, function (e, t) {
          for (var n in e) t(e[n], n);
        }(["createCredentials", "createCipher", "createCipheriv", "createDecipher", "createDecipheriv", "createSign", "createVerify", "createDiffieHellman", "pbkdf2"], function (e) {
          b[e] = function () {
            y("sorry,", e, "is not implemented yet");
          };
        });
      }).call(this, w("lYpoI2"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, w("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/crypto-browserify/index.js", "/node_modules/gulp-browserify/node_modules/crypto-browserify");
    }, {
      "./md5": 6,
      "./rng": 7,
      "./sha": 8,
      "./sha256": 9,
      buffer: 3,
      lYpoI2: 10
    }],
    6: [function (w, b, e) {
      (function (e, t, n, r, o, i, u, a, s) {
        var f = w("./helpers");

        function c(e, t) {
          e[t >> 5] |= 128 << t % 32, e[14 + (t + 64 >>> 9 << 4)] = t;

          for (var n = 1732584193, r = -271733879, o = -1732584194, i = 271733878, u = 0; u < e.length; u += 16) {
            var a = n,
                s = r,
                f = o,
                c = i,
                n = d(n, r, o, i, e[u + 0], 7, -680876936),
                i = d(i, n, r, o, e[u + 1], 12, -389564586),
                o = d(o, i, n, r, e[u + 2], 17, 606105819),
                r = d(r, o, i, n, e[u + 3], 22, -1044525330);
            n = d(n, r, o, i, e[u + 4], 7, -176418897), i = d(i, n, r, o, e[u + 5], 12, 1200080426), o = d(o, i, n, r, e[u + 6], 17, -1473231341), r = d(r, o, i, n, e[u + 7], 22, -45705983), n = d(n, r, o, i, e[u + 8], 7, 1770035416), i = d(i, n, r, o, e[u + 9], 12, -1958414417), o = d(o, i, n, r, e[u + 10], 17, -42063), r = d(r, o, i, n, e[u + 11], 22, -1990404162), n = d(n, r, o, i, e[u + 12], 7, 1804603682), i = d(i, n, r, o, e[u + 13], 12, -40341101), o = d(o, i, n, r, e[u + 14], 17, -1502002290), n = h(n, r = d(r, o, i, n, e[u + 15], 22, 1236535329), o, i, e[u + 1], 5, -165796510), i = h(i, n, r, o, e[u + 6], 9, -1069501632), o = h(o, i, n, r, e[u + 11], 14, 643717713), r = h(r, o, i, n, e[u + 0], 20, -373897302), n = h(n, r, o, i, e[u + 5], 5, -701558691), i = h(i, n, r, o, e[u + 10], 9, 38016083), o = h(o, i, n, r, e[u + 15], 14, -660478335), r = h(r, o, i, n, e[u + 4], 20, -405537848), n = h(n, r, o, i, e[u + 9], 5, 568446438), i = h(i, n, r, o, e[u + 14], 9, -1019803690), o = h(o, i, n, r, e[u + 3], 14, -187363961), r = h(r, o, i, n, e[u + 8], 20, 1163531501), n = h(n, r, o, i, e[u + 13], 5, -1444681467), i = h(i, n, r, o, e[u + 2], 9, -51403784), o = h(o, i, n, r, e[u + 7], 14, 1735328473), n = p(n, r = h(r, o, i, n, e[u + 12], 20, -1926607734), o, i, e[u + 5], 4, -378558), i = p(i, n, r, o, e[u + 8], 11, -2022574463), o = p(o, i, n, r, e[u + 11], 16, 1839030562), r = p(r, o, i, n, e[u + 14], 23, -35309556), n = p(n, r, o, i, e[u + 1], 4, -1530992060), i = p(i, n, r, o, e[u + 4], 11, 1272893353), o = p(o, i, n, r, e[u + 7], 16, -155497632), r = p(r, o, i, n, e[u + 10], 23, -1094730640), n = p(n, r, o, i, e[u + 13], 4, 681279174), i = p(i, n, r, o, e[u + 0], 11, -358537222), o = p(o, i, n, r, e[u + 3], 16, -722521979), r = p(r, o, i, n, e[u + 6], 23, 76029189), n = p(n, r, o, i, e[u + 9], 4, -640364487), i = p(i, n, r, o, e[u + 12], 11, -421815835), o = p(o, i, n, r, e[u + 15], 16, 530742520), n = g(n, r = p(r, o, i, n, e[u + 2], 23, -995338651), o, i, e[u + 0], 6, -198630844), i = g(i, n, r, o, e[u + 7], 10, 1126891415), o = g(o, i, n, r, e[u + 14], 15, -1416354905), r = g(r, o, i, n, e[u + 5], 21, -57434055), n = g(n, r, o, i, e[u + 12], 6, 1700485571), i = g(i, n, r, o, e[u + 3], 10, -1894986606), o = g(o, i, n, r, e[u + 10], 15, -1051523), r = g(r, o, i, n, e[u + 1], 21, -2054922799), n = g(n, r, o, i, e[u + 8], 6, 1873313359), i = g(i, n, r, o, e[u + 15], 10, -30611744), o = g(o, i, n, r, e[u + 6], 15, -1560198380), r = g(r, o, i, n, e[u + 13], 21, 1309151649), n = g(n, r, o, i, e[u + 4], 6, -145523070), i = g(i, n, r, o, e[u + 11], 10, -1120210379), o = g(o, i, n, r, e[u + 2], 15, 718787259), r = g(r, o, i, n, e[u + 9], 21, -343485551), n = y(n, a), r = y(r, s), o = y(o, f), i = y(i, c);
          }

          return Array(n, r, o, i);
        }

        function l(e, t, n, r, o, i) {
          return y((u = y(y(t, e), y(r, i))) << (a = o) | u >>> 32 - a, n);
          var u, a;
        }

        function d(e, t, n, r, o, i, u) {
          return l(t & n | ~t & r, e, t, o, i, u);
        }

        function h(e, t, n, r, o, i, u) {
          return l(t & r | n & ~r, e, t, o, i, u);
        }

        function p(e, t, n, r, o, i, u) {
          return l(t ^ n ^ r, e, t, o, i, u);
        }

        function g(e, t, n, r, o, i, u) {
          return l(n ^ (t | ~r), e, t, o, i, u);
        }

        function y(e, t) {
          var n = (65535 & e) + (65535 & t);
          return (e >> 16) + (t >> 16) + (n >> 16) << 16 | 65535 & n;
        }

        b.exports = function (e) {
          return f.hash(e, c, 16);
        };
      }).call(this, w("lYpoI2"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, w("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/crypto-browserify/md5.js", "/node_modules/gulp-browserify/node_modules/crypto-browserify");
    }, {
      "./helpers": 4,
      buffer: 3,
      lYpoI2: 10
    }],
    7: [function (e, l, t) {
      (function (e, t, n, r, o, i, u, a, s) {
        var f, c;
        c = function (e) {
          for (var t, n = new Array(e), r = 0; r < e; r++) 0 == (3 & r) && (t = 4294967296 * Math.random()), n[r] = t >>> ((3 & r) << 3) & 255;

          return n;
        }, l.exports = f || c;
      }).call(this, e("lYpoI2"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/crypto-browserify/rng.js", "/node_modules/gulp-browserify/node_modules/crypto-browserify");
    }, {
      buffer: 3,
      lYpoI2: 10
    }],
    8: [function (l, d, e) {
      (function (e, t, n, r, o, i, u, a, s) {
        var f = l("./helpers");

        function c(e, t) {
          e[t >> 5] |= 128 << 24 - t % 32, e[15 + (t + 64 >> 9 << 4)] = t;

          for (var n, r, o, i, u, a = Array(80), s = 1732584193, f = -271733879, c = -1732584194, l = 271733878, d = -1009589776, h = 0; h < e.length; h += 16) {
            for (var p = s, g = f, y = c, w = l, b = d, m = 0; m < 80; m++) {
              a[m] = m < 16 ? e[h + m] : E(a[m - 3] ^ a[m - 8] ^ a[m - 14] ^ a[m - 16], 1);

              var v = _(_(E(s, 5), (o = f, i = c, u = l, (r = m) < 20 ? o & i | ~o & u : !(r < 40) && r < 60 ? o & i | o & u | i & u : o ^ i ^ u)), _(_(d, a[m]), (n = m) < 20 ? 1518500249 : n < 40 ? 1859775393 : n < 60 ? -1894007588 : -899497514)),
                  d = l,
                  l = c,
                  c = E(f, 30),
                  f = s,
                  s = v;
            }

            s = _(s, p), f = _(f, g), c = _(c, y), l = _(l, w), d = _(d, b);
          }

          return Array(s, f, c, l, d);
        }

        function _(e, t) {
          var n = (65535 & e) + (65535 & t);
          return (e >> 16) + (t >> 16) + (n >> 16) << 16 | 65535 & n;
        }

        function E(e, t) {
          return e << t | e >>> 32 - t;
        }

        d.exports = function (e) {
          return f.hash(e, c, 20, !0);
        };
      }).call(this, l("lYpoI2"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, l("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/crypto-browserify/sha.js", "/node_modules/gulp-browserify/node_modules/crypto-browserify");
    }, {
      "./helpers": 4,
      buffer: 3,
      lYpoI2: 10
    }],
    9: [function (l, d, e) {
      (function (e, t, n, r, o, i, u, a, s) {
        function B(e, t) {
          var n = (65535 & e) + (65535 & t);
          return (e >> 16) + (t >> 16) + (n >> 16) << 16 | 65535 & n;
        }

        function L(e, t) {
          return e >>> t | e << 32 - t;
        }

        function f(e, t) {
          var n,
              r,
              o,
              i,
              u,
              a,
              s,
              f,
              c,
              l,
              d = new Array(1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298),
              h = new Array(1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225),
              p = new Array(64);
          e[t >> 5] |= 128 << 24 - t % 32, e[15 + (t + 64 >> 9 << 4)] = t;

          for (var g, y, w, b, m, v, _, E, I = 0; I < e.length; I += 16) {
            n = h[0], r = h[1], o = h[2], i = h[3], u = h[4], a = h[5], s = h[6], f = h[7];

            for (var A = 0; A < 64; A++) p[A] = A < 16 ? e[A + I] : B(B(B((E = p[A - 2], L(E, 17) ^ L(E, 19) ^ E >>> 10), p[A - 7]), (_ = p[A - 15], L(_, 7) ^ L(_, 18) ^ _ >>> 3)), p[A - 16]), c = B(B(B(B(f, L(v = u, 6) ^ L(v, 11) ^ L(v, 25)), (m = u) & a ^ ~m & s), d[A]), p[A]), l = B(L(b = n, 2) ^ L(b, 13) ^ L(b, 22), (g = n) & (y = r) ^ g & (w = o) ^ y & w), f = s, s = a, a = u, u = B(i, c), i = o, o = r, r = n, n = B(c, l);

            h[0] = B(n, h[0]), h[1] = B(r, h[1]), h[2] = B(o, h[2]), h[3] = B(i, h[3]), h[4] = B(u, h[4]), h[5] = B(a, h[5]), h[6] = B(s, h[6]), h[7] = B(f, h[7]);
          }

          return h;
        }

        var c = l("./helpers");

        d.exports = function (e) {
          return c.hash(e, f, 32, !0);
        };
      }).call(this, l("lYpoI2"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, l("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/crypto-browserify/sha256.js", "/node_modules/gulp-browserify/node_modules/crypto-browserify");
    }, {
      "./helpers": 4,
      buffer: 3,
      lYpoI2: 10
    }],
    10: [function (e, c, t) {
      (function (e, t, n, r, o, i, u, a, s) {
        function f() {}

        (e = c.exports = {}).nextTick = function () {
          var e = "undefined" != typeof window && window.setImmediate,
              t = "undefined" != typeof window && window.postMessage && window.addEventListener;
          if (e) return function (e) {
            return window.setImmediate(e);
          };

          if (t) {
            var n = [];
            return window.addEventListener("message", function (e) {
              var t = e.source;
              t !== window && null !== t || "process-tick" !== e.data || (e.stopPropagation(), 0 < n.length && n.shift()());
            }, !0), function (e) {
              n.push(e), window.postMessage("process-tick", "*");
            };
          }

          return function (e) {
            setTimeout(e, 0);
          };
        }(), e.title = "browser", e.browser = !0, e.env = {}, e.argv = [], e.on = f, e.addListener = f, e.once = f, e.off = f, e.removeListener = f, e.removeAllListeners = f, e.emit = f, e.binding = function (e) {
          throw new Error("process.binding is not supported");
        }, e.cwd = function () {
          return "/";
        }, e.chdir = function (e) {
          throw new Error("process.chdir is not supported");
        };
      }).call(this, e("lYpoI2"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/gulp-browserify/node_modules/process/browser.js", "/node_modules/gulp-browserify/node_modules/process");
    }, {
      buffer: 3,
      lYpoI2: 10
    }],
    11: [function (e, t, f) {
      (function (e, t, n, r, o, i, u, a, s) {
        f.read = function (e, t, n, r, o) {
          var i,
              u,
              a = 8 * o - r - 1,
              s = (1 << a) - 1,
              f = s >> 1,
              c = -7,
              l = n ? o - 1 : 0,
              d = n ? -1 : 1,
              h = e[t + l];

          for (l += d, i = h & (1 << -c) - 1, h >>= -c, c += a; 0 < c; i = 256 * i + e[t + l], l += d, c -= 8);

          for (u = i & (1 << -c) - 1, i >>= -c, c += r; 0 < c; u = 256 * u + e[t + l], l += d, c -= 8);

          if (0 === i) i = 1 - f;else {
            if (i === s) return u ? NaN : 1 / 0 * (h ? -1 : 1);
            u += Math.pow(2, r), i -= f;
          }
          return (h ? -1 : 1) * u * Math.pow(2, i - r);
        }, f.write = function (e, t, n, r, o, i) {
          var u,
              a,
              s,
              f = 8 * i - o - 1,
              c = (1 << f) - 1,
              l = c >> 1,
              d = 23 === o ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
              h = r ? 0 : i - 1,
              p = r ? 1 : -1,
              g = t < 0 || 0 === t && 1 / t < 0 ? 1 : 0;

          for (t = Math.abs(t), isNaN(t) || t === 1 / 0 ? (a = isNaN(t) ? 1 : 0, u = c) : (u = Math.floor(Math.log(t) / Math.LN2), t * (s = Math.pow(2, -u)) < 1 && (u--, s *= 2), 2 <= (t += 1 <= u + l ? d / s : d * Math.pow(2, 1 - l)) * s && (u++, s /= 2), c <= u + l ? (a = 0, u = c) : 1 <= u + l ? (a = (t * s - 1) * Math.pow(2, o), u += l) : (a = t * Math.pow(2, l - 1) * Math.pow(2, o), u = 0)); 8 <= o; e[n + h] = 255 & a, h += p, a /= 256, o -= 8);

          for (u = u << o | a, f += o; 0 < f; e[n + h] = 255 & u, h += p, u /= 256, f -= 8);

          e[n + h - p] |= 128 * g;
        };
      }).call(this, e("lYpoI2"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/node_modules/ieee754/index.js", "/node_modules/ieee754");
    }, {
      buffer: 3,
      lYpoI2: 10
    }]
  }, {}, [1])(1);
});

/***/ }),

/***/ 48:
/***/ (function(module, exports) {

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

module.exports = _arrayLikeToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 49:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// UP, SAME, DOWN, RESET should not be special regex characters in a character class.
const UP = "<";
/* harmony export (immutable) */ __webpack_exports__["e"] = UP;
 // one level up

const SAME = ",";
/* harmony export (immutable) */ __webpack_exports__["d"] = SAME;
 // same level

const DOWN = ">";
/* harmony export (immutable) */ __webpack_exports__["a"] = DOWN;
 // one level down

const RESET = "|";
/* harmony export (immutable) */ __webpack_exports__["c"] = RESET;
 // reset level index and start new

const WILDCARD = "*";
/* harmony export (immutable) */ __webpack_exports__["f"] = WILDCARD;
 // as defined by publicsuffix.org

const EXCEPTION = "!";
/* harmony export (immutable) */ __webpack_exports__["b"] = EXCEPTION;
 // as defined by publicsuffix.org

/***/ }),

/***/ 5:
/***/ (function(module, exports, __webpack_require__) {

// TODO(Babel 8): Remove this file.
var runtime = __webpack_require__(102)();

module.exports = runtime; // Copied from https://github.com/facebook/regenerator/blob/main/packages/runtime/runtime.js#L736=

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}

/***/ }),

/***/ 50:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export ValidationErrorType */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SanitizationResultType; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_is_ip__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_is_ip___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_is_ip__);
// eslint-disable-next-line import/default
 // See https://en.wikipedia.org/wiki/Domain_name
// See https://tools.ietf.org/html/rfc1034

const LABEL_SEPARATOR = ".";
const LABEL_ROOT = "";
const LABEL_LENGTH_MIN = 1;
const LABEL_LENGTH_MAX = 63;
const DOMAIN_LENGTH_MAX = 253;
var ValidationErrorType;

(function (ValidationErrorType) {
  ValidationErrorType["NoHostname"] = "NO_HOSTNAME";
  ValidationErrorType["DomainMaxLength"] = "DOMAIN_MAX_LENGTH";
  ValidationErrorType["LabelMinLength"] = "LABEL_MIN_LENGTH";
  ValidationErrorType["LabelMaxLength"] = "LABEL_MAX_LENGTH";
  ValidationErrorType["LabelInvalidCharacter"] = "LABEL_INVALID_CHARACTER";
})(ValidationErrorType || (ValidationErrorType = {}));

var SanitizationResultType;

(function (SanitizationResultType) {
  SanitizationResultType["ValidIp"] = "VALID_IP";
  SanitizationResultType["ValidDomain"] = "VALID_DOMAIN";
  SanitizationResultType["Error"] = "ERROR";
})(SanitizationResultType || (SanitizationResultType = {}));

const createNoHostnameError = input => {
  return {
    type: ValidationErrorType.NoHostname,
    message: `The given input ${String(input)} does not look like a hostname.`,
    column: 1
  };
};

const createDomainMaxLengthError = domain => {
  const length = domain.length;
  return {
    type: ValidationErrorType.DomainMaxLength,
    message: `Domain "${domain}" is too long. Domain is ${length} octets long but should not be longer than ${DOMAIN_LENGTH_MAX}.`,
    column: length
  };
};

const createLabelMinLengthError = (label, column) => {
  const length = label.length;
  return {
    type: ValidationErrorType.LabelMinLength,
    message: `Label "${label}" is too short. Label is ${length} octets long but should be at least ${LABEL_LENGTH_MIN}.`,
    column
  };
};

const createLabelMaxLengthError = (label, column) => {
  const length = label.length;
  return {
    type: ValidationErrorType.LabelMaxLength,
    message: `Label "${label}" is too long. Label is ${length} octets long but should not be longer than ${LABEL_LENGTH_MAX}.`,
    column
  };
};

const createLabelInvalidCharacterError = (label, invalidCharacter, column) => {
  return {
    type: ValidationErrorType.LabelInvalidCharacter,
    message: `Label "${label}" contains invalid character "${invalidCharacter}" at column ${column}.`,
    column
  };
};

const sanitize = input => {
  // Extra check for non-TypeScript users
  if (typeof input !== "string") {
    return {
      type: SanitizationResultType.Error,
      errors: [createNoHostnameError(input)]
    };
  }

  const inputTrimmed = input.trim(); // IPv6 addresses are surrounded by square brackets in URLs
  // See https://tools.ietf.org/html/rfc3986#section-3.2.2

  const inputTrimmedAsIp = inputTrimmed.replace(/^\[|]$/g, "");
  const ipVersion = __WEBPACK_IMPORTED_MODULE_0_is_ip___default.a.version(inputTrimmedAsIp);

  if (ipVersion !== undefined) {
    return {
      type: SanitizationResultType.ValidIp,
      ip: inputTrimmedAsIp,
      ipVersion
    };
  }

  if (inputTrimmed.length > DOMAIN_LENGTH_MAX) {
    return {
      type: SanitizationResultType.Error,
      errors: [createDomainMaxLengthError(inputTrimmed)]
    };
  }

  const labels = inputTrimmed.split(LABEL_SEPARATOR);
  const lastLabel = labels[labels.length - 1]; // If the last label is the special root label, ignore it

  if (lastLabel === LABEL_ROOT) {
    labels.pop();
  }

  const labelValidationErrors = [];
  let column = 1;

  for (const label of labels) {
    // According to https://tools.ietf.org/html/rfc6761 labels should
    // only contain ASCII letters, digits and hyphens (LDH).
    const invalidCharacter = /[^\d\-a-z]/iu.exec(label);

    if (invalidCharacter) {
      labelValidationErrors.push(createLabelInvalidCharacterError(label, invalidCharacter[0], invalidCharacter.index + 1));
    } else if ( // We can use .length here to check for the octet size because
    // label can only contain ASCII LDH characters at this point.
    label.length < LABEL_LENGTH_MIN) {
      labelValidationErrors.push(createLabelMinLengthError(label, column));
    } else if (label.length > LABEL_LENGTH_MAX) {
      labelValidationErrors.push(createLabelMaxLengthError(label, column));
    }

    column += label.length + LABEL_SEPARATOR.length;
  }

  if (labelValidationErrors.length > 0) {
    return {
      type: SanitizationResultType.Error,
      errors: labelValidationErrors
    };
  }

  return {
    type: SanitizationResultType.ValidDomain,
    domain: inputTrimmed,
    labels
  };
};
/* harmony export (immutable) */ __webpack_exports__["b"] = sanitize;


/***/ }),

/***/ 55:
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(19)["default"];

var toPrimitive = __webpack_require__(81);

function _toPropertyKey(arg) {
  var key = toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}

module.exports = _toPropertyKey, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 59:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BasicFormSelector; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return SortPrioritySelectors; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return logoIdentifier; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return passportalIdentifiers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return ignoredQueryStrings; });
var BasicFormSelector = {
  username: 'input[type="text"],input[type="email"],input[type="tel"]',
  password: 'input[type="password"]',
  submit: 'input[type="submit"], button'
};
var SortPrioritySelectors = {
  username: '[name="username"],#username,.username',
  password: '[name*="confirm"],[name*="Confirm"],[name*="new"]'
};
var logoIdentifier = {
  get selector() {
    return '.passportalUsernameMiniLogo';
  },

  get name() {
    return 'passportalUsernameMiniLogo';
  }

};
var passportalIdentifiers = '.passportalUsernameMiniLogo,#passportalPasswordFrame,#passportal-alert-frame';
var ignoredQueryStrings = ['returnurl', 'return_url', 'scope', 'redirect_uri'];

/***/ }),

/***/ 6:
/***/ (function(module, exports) {

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

module.exports = _asyncToGenerator, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 60:
/***/ (function(module, exports, __webpack_require__) {

var arrayWithoutHoles = __webpack_require__(82);

var iterableToArray = __webpack_require__(83);

var unsupportedIterableToArray = __webpack_require__(77);

var nonIterableSpread = __webpack_require__(84);

function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
}

module.exports = _toConsumableArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 641:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(11);


/***/ }),

/***/ 66:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var scope = typeof global !== "undefined" && global || typeof self !== "undefined" && self || window;
var apply = Function.prototype.apply; // DOM APIs, for completeness

exports.setTimeout = function () {
  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
};

exports.setInterval = function () {
  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
};

exports.clearTimeout = exports.clearInterval = function (timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}

Timeout.prototype.unref = Timeout.prototype.ref = function () {};

Timeout.prototype.close = function () {
  this._clearFn.call(scope, this._id);
}; // Does not start the time, just sets up the members needed.


exports.enroll = function (item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function (item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function (item) {
  clearTimeout(item._idleTimeoutId);
  var msecs = item._idleTimeout;

  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout) item._onTimeout();
    }, msecs);
  }
}; // setimmediate attaches itself to the global object


__webpack_require__(122); // On some exotic environments, it's not clear which object `setimmediate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.


exports.setImmediate = typeof self !== "undefined" && self.setImmediate || typeof global !== "undefined" && global.setImmediate || this && this.setImmediate;
exports.clearImmediate = typeof self !== "undefined" && self.clearImmediate || typeof global !== "undefined" && global.clearImmediate || this && this.clearImmediate;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(13)))

/***/ }),

/***/ 67:
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {}; // cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}

function defaultClearTimeout() {
  throw new Error('clearTimeout has not been defined');
}

(function () {
  try {
    if (typeof setTimeout === 'function') {
      cachedSetTimeout = setTimeout;
    } else {
      cachedSetTimeout = defaultSetTimout;
    }
  } catch (e) {
    cachedSetTimeout = defaultSetTimout;
  }

  try {
    if (typeof clearTimeout === 'function') {
      cachedClearTimeout = clearTimeout;
    } else {
      cachedClearTimeout = defaultClearTimeout;
    }
  } catch (e) {
    cachedClearTimeout = defaultClearTimeout;
  }
})();

function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  } // if setTimeout wasn't available but was latter defined


  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}

function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  } // if clearTimeout wasn't available but was latter defined


  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
      return cachedClearTimeout.call(this, marker);
    }
  }
}

var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }

  draining = false;

  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }

  if (queue.length) {
    drainQueue();
  }
}

function drainQueue() {
  if (draining) {
    return;
  }

  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;

  while (len) {
    currentQueue = queue;
    queue = [];

    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }

    queueIndex = -1;
    len = queue.length;
  }

  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}

process.nextTick = function (fun) {
  var args = new Array(arguments.length - 1);

  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }

  queue.push(new Item(fun, args));

  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
}; // v8 likes predictible objects


function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}

Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues

process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
  return [];
};

process.binding = function (name) {
  throw new Error('process.binding is not supported');
};

process.cwd = function () {
  return '/';
};

process.chdir = function (dir) {
  throw new Error('process.chdir is not supported');
};

process.umask = function () {
  return 0;
};

/***/ }),

/***/ 70:
/***/ (function(module, exports) {

module.exports = function (module) {
  if (!module.webpackPolyfill) {
    module.deprecate = function () {};

    module.paths = []; // module.parent = undefined by default

    if (!module.children) module.children = [];
    Object.defineProperty(module, "loaded", {
      enumerable: true,
      get: function () {
        return module.l;
      }
    });
    Object.defineProperty(module, "id", {
      enumerable: true,
      get: function () {
        return module.i;
      }
    });
    module.webpackPolyfill = 1;
  }

  return module;
};

/***/ }),

/***/ 77:
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(48);

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
}

module.exports = _unsupportedIterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 81:
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(19)["default"];

function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];

  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }

  return (hint === "string" ? String : Number)(input);
}

module.exports = _toPrimitive, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 82:
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(48);

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return arrayLikeToArray(arr);
}

module.exports = _arrayWithoutHoles, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 83:
/***/ (function(module, exports) {

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

module.exports = _iterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 84:
/***/ (function(module, exports) {

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

module.exports = _nonIterableSpread, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),

/***/ 85:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__parse_domain__ = __webpack_require__(86);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_0__parse_domain__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__parse_domain__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__from_url__ = __webpack_require__(95);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__from_url__["a"]; });
/* unused harmony reexport NO_HOSTNAME */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sanitize__ = __webpack_require__(50);
/* unused harmony reexport ValidationErrorType */




/***/ }),

/***/ 86:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ParseResultType; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__serialized_tries__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__trie_look_up__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sanitize__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__trie_parse_trie__ = __webpack_require__(93);




const RESERVED_TOP_LEVEL_DOMAINS = ["localhost", "local", "example", "invalid", "test"];
/* unused harmony export RESERVED_TOP_LEVEL_DOMAINS */

var ParseResultType;

(function (ParseResultType) {
  /**
   * This parse result is returned in case the given hostname does not adhere to [RFC 1034](https://tools.ietf.org/html/rfc1034).
   */
  ParseResultType["Invalid"] = "INVALID";
  /**
   * This parse result is returned if the given hostname was an IPv4 or IPv6.
   */

  ParseResultType["Ip"] = "IP";
  /**
   * This parse result is returned when the given hostname
   * - is the root domain (the empty string `""`)
   * - belongs to the top-level domain `localhost`, `local`, `example`, `invalid` or `test`
   */

  ParseResultType["Reserved"] = "RESERVED";
  /**
   * This parse result is returned when the given hostname is valid and does not belong to a reserved top-level domain, but is not listed in the public suffix list.
   */

  ParseResultType["NotListed"] = "NOT_LISTED";
  /**
   * This parse result is returned when the given hostname belongs to a top-level domain that is listed in the public suffix list.
   */

  ParseResultType["Listed"] = "LISTED";
})(ParseResultType || (ParseResultType = {}));

const getAtIndex = (array, index) => {
  return index >= 0 && index < array.length ? array[index] : undefined;
};

const splitLabelsIntoDomains = (labels, index) => {
  return {
    subDomains: labels.slice(0, Math.max(0, index)),
    domain: getAtIndex(labels, index),
    topLevelDomains: labels.slice(index + 1)
  };
};

let parsedIcannTrie;
let parsedPrivateTrie;
/**
 * Splits the given hostname in topLevelDomains, a domain and subDomains.
 */

const parseDomain = hostname => {
  const sanitizationResult = Object(__WEBPACK_IMPORTED_MODULE_2__sanitize__["b" /* sanitize */])(hostname);

  if (sanitizationResult.type === __WEBPACK_IMPORTED_MODULE_2__sanitize__["a" /* SanitizationResultType */].Error) {
    return {
      type: ParseResultType.Invalid,
      hostname,
      errors: sanitizationResult.errors
    };
  }

  if (sanitizationResult.type === __WEBPACK_IMPORTED_MODULE_2__sanitize__["a" /* SanitizationResultType */].ValidIp) {
    return {
      type: ParseResultType.Ip,
      hostname: sanitizationResult.ip,
      ipVersion: sanitizationResult.ipVersion
    };
  }

  const {
    labels,
    domain
  } = sanitizationResult;

  if (hostname === "" || RESERVED_TOP_LEVEL_DOMAINS.includes(labels[labels.length - 1])) {
    return {
      type: ParseResultType.Reserved,
      hostname: domain,
      labels
    };
  } // Parse the serialized trie lazily


  parsedIcannTrie = parsedIcannTrie !== null && parsedIcannTrie !== void 0 ? parsedIcannTrie : Object(__WEBPACK_IMPORTED_MODULE_3__trie_parse_trie__["a" /* parseTrie */])(__WEBPACK_IMPORTED_MODULE_0__serialized_tries__["a" /* icannTrie */]);
  parsedPrivateTrie = parsedPrivateTrie !== null && parsedPrivateTrie !== void 0 ? parsedPrivateTrie : Object(__WEBPACK_IMPORTED_MODULE_3__trie_parse_trie__["a" /* parseTrie */])(__WEBPACK_IMPORTED_MODULE_0__serialized_tries__["b" /* privateTrie */]);
  const icannTlds = Object(__WEBPACK_IMPORTED_MODULE_1__trie_look_up__["a" /* lookUpTldsInTrie */])(labels, parsedIcannTrie);
  const privateTlds = Object(__WEBPACK_IMPORTED_MODULE_1__trie_look_up__["a" /* lookUpTldsInTrie */])(labels, parsedPrivateTrie);

  if (icannTlds.length === 0 && privateTlds.length === 0) {
    return {
      type: ParseResultType.NotListed,
      hostname: domain,
      labels
    };
  }

  const indexOfPublicSuffixDomain = labels.length - Math.max(privateTlds.length, icannTlds.length) - 1;
  const indexOfIcannDomain = labels.length - icannTlds.length - 1;
  return Object.assign({
    type: ParseResultType.Listed,
    hostname: domain,
    labels,
    icann: splitLabelsIntoDomains(labels, indexOfIcannDomain)
  }, splitLabelsIntoDomains(labels, indexOfPublicSuffixDomain));
};
/* harmony export (immutable) */ __webpack_exports__["b"] = parseDomain;


/***/ }),

/***/ 87:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__serialized_tries_icann_json__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__serialized_tries_icann_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__serialized_tries_icann_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__serialized_tries_private_json__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__serialized_tries_private_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__serialized_tries_private_json__);
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__serialized_tries_icann_json___default.a; });
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__serialized_tries_private_json___default.a; });




/***/ }),

/***/ 88:
/***/ (function(module, exports) {

module.exports = "ac>com,edu,gov,net,mil,org<ad>nom<ae>co,net,org,sch,ac,gov,mil<aero>accident-investigation,accident-prevention,aerobatic,aeroclub,aerodrome,agents,aircraft,airline,airport,air-surveillance,airtraffic,air-traffic-control,ambulance,amusement,association,author,ballooning,broker,caa,cargo,catering,certification,championship,charter,civilaviation,club,conference,consultant,consulting,control,council,crew,design,dgca,educator,emergency,engine,engineer,entertainment,equipment,exchange,express,federation,flight,fuel,gliding,government,groundhandling,group,hanggliding,homebuilt,insurance,journal,journalist,leasing,logistics,magazine,maintenance,media,microlight,modelling,navigation,parachuting,paragliding,passenger-association,pilot,press,production,recreation,repbody,res,research,rotorcraft,safety,scientist,services,show,skydiving,software,student,trader,trading,trainer,union,workinggroup,works<af>gov,com,org,net,edu<ag>com,org,net,co,nom<ai>off,com,net,org<al>com,edu,gov,mil,net,org<am>co,com,commune,net,org<ao>ed,gv,og,co,pb,it<aq,ar>com,edu,gob,gov,int,mil,musica,net,org,tur<arpa>e164,in-addr,ip6,iris,uri,urn<as>gov<asia,at>ac>sth<co,gv,or<au>com,net,org,edu>act,catholic,nsw>schools<nt,qld,sa,tas,vic,wa<gov>qld,sa,tas,vic,wa<asn,id,info,conf,oz,act,nsw,nt,qld,sa,tas,vic,wa<aw>com<ax,az>com,net,int,gov,org,edu,info,pp,mil,name,pro,biz<ba>com,edu,gov,mil,net,org<bb>biz,co,com,edu,gov,info,net,org,store,tv<bd>*<be>ac<bf>gov<bg>a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,0,1,2,3,4,5,6,7,8,9<bh>com,edu,net,org,gov<bi>co,com,edu,or,org<biz,bj>asso,barreau,gouv<bm>com,edu,gov,net,org<bn>com,edu,gov,net,org<bo>com,edu,gob,int,org,net,mil,tv,web,academia,agro,arte,blog,bolivia,ciencia,cooperativa,democracia,deporte,ecologia,economia,empresa,indigena,industria,info,medicina,movimiento,musica,natural,nombre,noticias,patria,politica,profesional,plurinacional,pueblo,revista,salud,tecnologia,tksat,transporte,wiki<br>9guacu,abc,adm,adv,agr,aju,am,anani,aparecida,app,arq,art,ato,b,barueri,belem,bhz,bib,bio,blog,bmd,boavista,bsb,campinagrande,campinas,caxias,cim,cng,cnt,com,contagem,coop,coz,cri,cuiaba,curitiba,def,des,det,dev,ecn,eco,edu,emp,enf,eng,esp,etc,eti,far,feira,flog,floripa,fm,fnd,fortal,fot,foz,fst,g12,geo,ggf,goiania,gov>ac,al,am,ap,ba,ce,df,es,go,ma,mg,ms,mt,pa,pb,pe,pi,pr,rj,rn,ro,rr,rs,sc,se,sp,to<gru,imb,ind,inf,jab,jampa,jdf,joinville,jor,jus,leg,lel,log,londrina,macapa,maceio,manaus,maringa,mat,med,mil,morena,mp,mus,natal,net,niteroi,nom>*<not,ntr,odo,ong,org,osasco,palmas,poa,ppg,pro,psc,psi,pvh,qsl,radio,rec,recife,rep,ribeirao,rio,riobranco,riopreto,salvador,sampa,santamaria,santoandre,saobernardo,saogonca,seg,sjc,slg,slz,sorocaba,srv,taxi,tc,tec,teo,the,tmp,trd,tur,tv,udi,vet,vix,vlog,wiki,zlg<bs>com,net,org,edu,gov<bt>com,edu,gov,net,org<bv,bw>co,org<by>gov,mil,com,of<bz>com,net,org,edu,gov<ca>ab,bc,mb,nb,nf,nl,ns,nt,nu,on,pe,qc,sk,yk,gc<cat,cc,cd>gov<cf,cg,ch,ci>org,or,com,co,edu,ed,ac,net,go,asso,xn--aroport-bya,int,presse,md,gouv<ck>*,!www<cl>aprendemas,co,gob,gov,mil<cm>co,com,gov,net<cn>ac,com,edu,gov,net,org,mil,xn--55qx5d,xn--io0a7i,xn--od0alg,ah,bj,cq,fj,gd,gs,gz,gx,ha,hb,he,hi,hl,hn,jl,js,jx,ln,nm,nx,qh,sc,sd,sh,sn,sx,tj,xj,xz,yn,zj,hk,mo,tw<co>arts,com,edu,firm,gov,info,int,mil,net,nom,org,rec,web<com,coop,cr>ac,co,ed,fi,go,or,sa<cu>com,edu,org,net,gov,inf<cv,cw>com,edu,net,org<cx>gov<cy>ac,biz,com,ekloges,gov,ltd,name,net,org,parliament,press,pro,tm<cz,de,dj,dk,dm>com,net,org,edu,gov<do>art,com,edu,gob,gov,mil,net,org,sld,web<dz>art,asso,com,edu,gov,org,net,pol,soc,tm<ec>com,info,net,fin,k12,med,pro,org,edu,gov,gob,mil<edu,ee>edu,gov,riik,lib,med,com,pri,aip,org,fie<eg>com,edu,eun,gov,mil,name,net,org,sci<er>*<es>com,nom,org,gob,edu<et>com,gov,org,edu,biz,name,info,net<eu,fi>aland<fj>ac,biz,com,gov,info,mil,name,net,org,pro<fk>*<fm>com,edu,net,org<fo,fr>asso,com,gouv,nom,prd,tm,aeroport,avocat,avoues,cci,chambagri,chirurgiens-dentistes,experts-comptables,geometre-expert,greta,huissier-justice,medecin,notaires,pharmacien,port,veterinaire<ga,gb,gd>edu,gov<ge>com,edu,gov,org,mil,net,pvt<gf,gg>co,net,org<gh>com,edu,gov,org,mil<gi>com,ltd,gov,mod,edu,org<gl>co,com,edu,net,org<gm,gn>ac,com,edu,gov,org,net<gov,gp>com,net,mobi,edu,org,asso<gq,gr>com,edu,net,org,gov<gs,gt>com,edu,gob,ind,mil,net,org<gu>com,edu,gov,guam,info,net,org,web<gw,gy>co,com,edu,gov,net,org<hk>com,edu,gov,idv,net,org,xn--55qx5d,xn--wcvs22d,xn--lcvr32d,xn--mxtq1m,xn--gmqw5a,xn--ciqpn,xn--gmq050i,xn--zf0avx,xn--io0a7i,xn--mk0axi,xn--od0alg,xn--od0aq3b,xn--tn0ag,xn--uc0atv,xn--uc0ay4a<hm,hn>com,edu,org,net,mil,gob<hr>iz,from,name,com<ht>com,shop,firm,info,adult,net,pro,org,med,art,coop,pol,asso,edu,rel,gouv,perso<hu>co,info,org,priv,sport,tm,2000,agrar,bolt,casino,city,erotica,erotika,film,forum,games,hotel,ingatlan,jogasz,konyvelo,lakas,media,news,reklam,sex,shop,suli,szex,tozsde,utazas,video<id>ac,biz,co,desa,go,mil,my,net,or,ponpes,sch,web<ie>gov<il>ac,co,gov,idf,k12,muni,net,org<im>ac,co>ltd,plc<com,net,org,tt,tv<in>co,firm,net,org,gen,ind,nic,ac,edu,res,gov,mil<info,int>eu<io>com<iq>gov,edu,mil,com,org,net<ir>ac,co,gov,id,net,org,sch,xn--mgba3a4f16a,xn--mgba3a4fra<is>net,com,edu,gov,org,int<it>gov,edu,abr,abruzzo,aosta-valley,aostavalley,bas,basilicata,cal,calabria,cam,campania,emilia-romagna,emiliaromagna,emr,friuli-v-giulia,friuli-ve-giulia,friuli-vegiulia,friuli-venezia-giulia,friuli-veneziagiulia,friuli-vgiulia,friuliv-giulia,friulive-giulia,friulivegiulia,friulivenezia-giulia,friuliveneziagiulia,friulivgiulia,fvg,laz,lazio,lig,liguria,lom,lombardia,lombardy,lucania,mar,marche,mol,molise,piedmont,piemonte,pmn,pug,puglia,sar,sardegna,sardinia,sic,sicilia,sicily,taa,tos,toscana,trentin-sud-tirol,xn--trentin-sd-tirol-rzb,trentin-sudtirol,xn--trentin-sdtirol-7vb,trentin-sued-tirol,trentin-suedtirol,trentino-a-adige,trentino-aadige,trentino-alto-adige,trentino-altoadige,trentino-s-tirol,trentino-stirol,trentino-sud-tirol,xn--trentino-sd-tirol-c3b,trentino-sudtirol,xn--trentino-sdtirol-szb,trentino-sued-tirol,trentino-suedtirol,trentino,trentinoa-adige,trentinoaadige,trentinoalto-adige,trentinoaltoadige,trentinos-tirol,trentinostirol,trentinosud-tirol,xn--trentinosd-tirol-rzb,trentinosudtirol,xn--trentinosdtirol-7vb,trentinosued-tirol,trentinosuedtirol,trentinsud-tirol,xn--trentinsd-tirol-6vb,trentinsudtirol,xn--trentinsdtirol-nsb,trentinsued-tirol,trentinsuedtirol,tuscany,umb,umbria,val-d-aosta,val-daosta,vald-aosta,valdaosta,valle-aosta,valle-d-aosta,valle-daosta,valleaosta,valled-aosta,valledaosta,vallee-aoste,xn--valle-aoste-ebb,vallee-d-aoste,xn--valle-d-aoste-ehb,valleeaoste,xn--valleaoste-e7a,valleedaoste,xn--valledaoste-ebb,vao,vda,ven,veneto,ag,agrigento,al,alessandria,alto-adige,altoadige,an,ancona,andria-barletta-trani,andria-trani-barletta,andriabarlettatrani,andriatranibarletta,ao,aosta,aoste,ap,aq,aquila,ar,arezzo,ascoli-piceno,ascolipiceno,asti,at,av,avellino,ba,balsan-sudtirol,xn--balsan-sdtirol-nsb,balsan-suedtirol,balsan,bari,barletta-trani-andria,barlettatraniandria,belluno,benevento,bergamo,bg,bi,biella,bl,bn,bo,bologna,bolzano-altoadige,bolzano,bozen-sudtirol,xn--bozen-sdtirol-2ob,bozen-suedtirol,bozen,br,brescia,brindisi,bs,bt,bulsan-sudtirol,xn--bulsan-sdtirol-nsb,bulsan-suedtirol,bulsan,bz,ca,cagliari,caltanissetta,campidano-medio,campidanomedio,campobasso,carbonia-iglesias,carboniaiglesias,carrara-massa,carraramassa,caserta,catania,catanzaro,cb,ce,cesena-forli,xn--cesena-forl-mcb,cesenaforli,xn--cesenaforl-i8a,ch,chieti,ci,cl,cn,co,como,cosenza,cr,cremona,crotone,cs,ct,cuneo,cz,dell-ogliastra,dellogliastra,en,enna,fc,fe,fermo,ferrara,fg,fi,firenze,florence,fm,foggia,forli-cesena,xn--forl-cesena-fcb,forlicesena,xn--forlcesena-c8a,fr,frosinone,ge,genoa,genova,go,gorizia,gr,grosseto,iglesias-carbonia,iglesiascarbonia,im,imperia,is,isernia,kr,la-spezia,laquila,laspezia,latina,lc,le,lecce,lecco,li,livorno,lo,lodi,lt,lu,lucca,macerata,mantova,massa-carrara,massacarrara,matera,mb,mc,me,medio-campidano,mediocampidano,messina,mi,milan,milano,mn,mo,modena,monza-brianza,monza-e-della-brianza,monza,monzabrianza,monzaebrianza,monzaedellabrianza,ms,mt,na,naples,napoli,no,novara,nu,nuoro,og,ogliastra,olbia-tempio,olbiatempio,or,oristano,ot,pa,padova,padua,palermo,parma,pavia,pc,pd,pe,perugia,pesaro-urbino,pesarourbino,pescara,pg,pi,piacenza,pisa,pistoia,pn,po,pordenone,potenza,pr,prato,pt,pu,pv,pz,ra,ragusa,ravenna,rc,re,reggio-calabria,reggio-emilia,reggiocalabria,reggioemilia,rg,ri,rieti,rimini,rm,rn,ro,roma,rome,rovigo,sa,salerno,sassari,savona,si,siena,siracusa,so,sondrio,sp,sr,ss,suedtirol,xn--sdtirol-n2a,sv,ta,taranto,te,tempio-olbia,tempioolbia,teramo,terni,tn,to,torino,tp,tr,trani-andria-barletta,trani-barletta-andria,traniandriabarletta,tranibarlettaandria,trapani,trento,treviso,trieste,ts,turin,tv,ud,udine,urbino-pesaro,urbinopesaro,va,varese,vb,vc,ve,venezia,venice,verbania,vercelli,verona,vi,vibo-valentia,vibovalentia,vicenza,viterbo,vr,vs,vt,vv<je>co,net,org<jm>*<jo>com,org,net,edu,sch,gov,mil,name<jobs,jp>ac,ad,co,ed,go,gr,lg,ne,or,aichi>aisai,ama,anjo,asuke,chiryu,chita,fuso,gamagori,handa,hazu,hekinan,higashiura,ichinomiya,inazawa,inuyama,isshiki,iwakura,kanie,kariya,kasugai,kira,kiyosu,komaki,konan,kota,mihama,miyoshi,nishio,nisshin,obu,oguchi,oharu,okazaki,owariasahi,seto,shikatsu,shinshiro,shitara,tahara,takahama,tobishima,toei,togo,tokai,tokoname,toyoake,toyohashi,toyokawa,toyone,toyota,tsushima,yatomi<akita>akita,daisen,fujisato,gojome,hachirogata,happou,higashinaruse,honjo,honjyo,ikawa,kamikoani,kamioka,katagami,kazuno,kitaakita,kosaka,kyowa,misato,mitane,moriyoshi,nikaho,noshiro,odate,oga,ogata,semboku,yokote,yurihonjo<aomori>aomori,gonohe,hachinohe,hashikami,hiranai,hirosaki,itayanagi,kuroishi,misawa,mutsu,nakadomari,noheji,oirase,owani,rokunohe,sannohe,shichinohe,shingo,takko,towada,tsugaru,tsuruta<chiba>abiko,asahi,chonan,chosei,choshi,chuo,funabashi,futtsu,hanamigawa,ichihara,ichikawa,ichinomiya,inzai,isumi,kamagaya,kamogawa,kashiwa,katori,katsuura,kimitsu,kisarazu,kozaki,kujukuri,kyonan,matsudo,midori,mihama,minamiboso,mobara,mutsuzawa,nagara,nagareyama,narashino,narita,noda,oamishirasato,omigawa,onjuku,otaki,sakae,sakura,shimofusa,shirako,shiroi,shisui,sodegaura,sosa,tako,tateyama,togane,tohnosho,tomisato,urayasu,yachimata,yachiyo,yokaichiba,yokoshibahikari,yotsukaido<ehime>ainan,honai,ikata,imabari,iyo,kamijima,kihoku,kumakogen,masaki,matsuno,matsuyama,namikata,niihama,ozu,saijo,seiyo,shikokuchuo,tobe,toon,uchiko,uwajima,yawatahama<fukui>echizen,eiheiji,fukui,ikeda,katsuyama,mihama,minamiechizen,obama,ohi,ono,sabae,sakai,takahama,tsuruga,wakasa<fukuoka>ashiya,buzen,chikugo,chikuho,chikujo,chikushino,chikuzen,chuo,dazaifu,fukuchi,hakata,higashi,hirokawa,hisayama,iizuka,inatsuki,kaho,kasuga,kasuya,kawara,keisen,koga,kurate,kurogi,kurume,minami,miyako,miyama,miyawaka,mizumaki,munakata,nakagawa,nakama,nishi,nogata,ogori,okagaki,okawa,oki,omuta,onga,onojo,oto,saigawa,sasaguri,shingu,shinyoshitomi,shonai,soeda,sue,tachiarai,tagawa,takata,toho,toyotsu,tsuiki,ukiha,umi,usui,yamada,yame,yanagawa,yukuhashi<fukushima>aizubange,aizumisato,aizuwakamatsu,asakawa,bandai,date,fukushima,furudono,futaba,hanawa,higashi,hirata,hirono,iitate,inawashiro,ishikawa,iwaki,izumizaki,kagamiishi,kaneyama,kawamata,kitakata,kitashiobara,koori,koriyama,kunimi,miharu,mishima,namie,nango,nishiaizu,nishigo,okuma,omotego,ono,otama,samegawa,shimogo,shirakawa,showa,soma,sukagawa,taishin,tamakawa,tanagura,tenei,yabuki,yamato,yamatsuri,yanaizu,yugawa<gifu>anpachi,ena,gifu,ginan,godo,gujo,hashima,hichiso,hida,higashishirakawa,ibigawa,ikeda,kakamigahara,kani,kasahara,kasamatsu,kawaue,kitagata,mino,minokamo,mitake,mizunami,motosu,nakatsugawa,ogaki,sakahogi,seki,sekigahara,shirakawa,tajimi,takayama,tarui,toki,tomika,wanouchi,yamagata,yaotsu,yoro<gunma>annaka,chiyoda,fujioka,higashiagatsuma,isesaki,itakura,kanna,kanra,katashina,kawaba,kiryu,kusatsu,maebashi,meiwa,midori,minakami,naganohara,nakanojo,nanmoku,numata,oizumi,ora,ota,shibukawa,shimonita,shinto,showa,takasaki,takayama,tamamura,tatebayashi,tomioka,tsukiyono,tsumagoi,ueno,yoshioka<hiroshima>asaminami,daiwa,etajima,fuchu,fukuyama,hatsukaichi,higashihiroshima,hongo,jinsekikogen,kaita,kui,kumano,kure,mihara,miyoshi,naka,onomichi,osakikamijima,otake,saka,sera,seranishi,shinichi,shobara,takehara<hokkaido>abashiri,abira,aibetsu,akabira,akkeshi,asahikawa,ashibetsu,ashoro,assabu,atsuma,bibai,biei,bifuka,bihoro,biratori,chippubetsu,chitose,date,ebetsu,embetsu,eniwa,erimo,esan,esashi,fukagawa,fukushima,furano,furubira,haboro,hakodate,hamatonbetsu,hidaka,higashikagura,higashikawa,hiroo,hokuryu,hokuto,honbetsu,horokanai,horonobe,ikeda,imakane,ishikari,iwamizawa,iwanai,kamifurano,kamikawa,kamishihoro,kamisunagawa,kamoenai,kayabe,kembuchi,kikonai,kimobetsu,kitahiroshima,kitami,kiyosato,koshimizu,kunneppu,kuriyama,kuromatsunai,kushiro,kutchan,kyowa,mashike,matsumae,mikasa,minamifurano,mombetsu,moseushi,mukawa,muroran,naie,nakagawa,nakasatsunai,nakatombetsu,nanae,nanporo,nayoro,nemuro,niikappu,niki,nishiokoppe,noboribetsu,numata,obihiro,obira,oketo,okoppe,otaru,otobe,otofuke,otoineppu,oumu,ozora,pippu,rankoshi,rebun,rikubetsu,rishiri,rishirifuji,saroma,sarufutsu,shakotan,shari,shibecha,shibetsu,shikabe,shikaoi,shimamaki,shimizu,shimokawa,shinshinotsu,shintoku,shiranuka,shiraoi,shiriuchi,sobetsu,sunagawa,taiki,takasu,takikawa,takinoue,teshikaga,tobetsu,tohma,tomakomai,tomari,toya,toyako,toyotomi,toyoura,tsubetsu,tsukigata,urakawa,urausu,uryu,utashinai,wakkanai,wassamu,yakumo,yoichi<hyogo>aioi,akashi,ako,amagasaki,aogaki,asago,ashiya,awaji,fukusaki,goshiki,harima,himeji,ichikawa,inagawa,itami,kakogawa,kamigori,kamikawa,kasai,kasuga,kawanishi,miki,minamiawaji,nishinomiya,nishiwaki,ono,sanda,sannan,sasayama,sayo,shingu,shinonsen,shiso,sumoto,taishi,taka,takarazuka,takasago,takino,tamba,tatsuno,toyooka,yabu,yashiro,yoka,yokawa<ibaraki>ami,asahi,bando,chikusei,daigo,fujishiro,hitachi,hitachinaka,hitachiomiya,hitachiota,ibaraki,ina,inashiki,itako,iwama,joso,kamisu,kasama,kashima,kasumigaura,koga,miho,mito,moriya,naka,namegata,oarai,ogawa,omitama,ryugasaki,sakai,sakuragawa,shimodate,shimotsuma,shirosato,sowa,suifu,takahagi,tamatsukuri,tokai,tomobe,tone,toride,tsuchiura,tsukuba,uchihara,ushiku,yachiyo,yamagata,yawara,yuki<ishikawa>anamizu,hakui,hakusan,kaga,kahoku,kanazawa,kawakita,komatsu,nakanoto,nanao,nomi,nonoichi,noto,shika,suzu,tsubata,tsurugi,uchinada,wajima<iwate>fudai,fujisawa,hanamaki,hiraizumi,hirono,ichinohe,ichinoseki,iwaizumi,iwate,joboji,kamaishi,kanegasaki,karumai,kawai,kitakami,kuji,kunohe,kuzumaki,miyako,mizusawa,morioka,ninohe,noda,ofunato,oshu,otsuchi,rikuzentakata,shiwa,shizukuishi,sumita,tanohata,tono,yahaba,yamada<kagawa>ayagawa,higashikagawa,kanonji,kotohira,manno,marugame,mitoyo,naoshima,sanuki,tadotsu,takamatsu,tonosho,uchinomi,utazu,zentsuji<kagoshima>akune,amami,hioki,isa,isen,izumi,kagoshima,kanoya,kawanabe,kinko,kouyama,makurazaki,matsumoto,minamitane,nakatane,nishinoomote,satsumasendai,soo,tarumizu,yusui<kanagawa>aikawa,atsugi,ayase,chigasaki,ebina,fujisawa,hadano,hakone,hiratsuka,isehara,kaisei,kamakura,kiyokawa,matsuda,minamiashigara,miura,nakai,ninomiya,odawara,oi,oiso,sagamihara,samukawa,tsukui,yamakita,yamato,yokosuka,yugawara,zama,zushi<kochi>aki,geisei,hidaka,higashitsuno,ino,kagami,kami,kitagawa,kochi,mihara,motoyama,muroto,nahari,nakamura,nankoku,nishitosa,niyodogawa,ochi,okawa,otoyo,otsuki,sakawa,sukumo,susaki,tosa,tosashimizu,toyo,tsuno,umaji,yasuda,yusuhara<kumamoto>amakusa,arao,aso,choyo,gyokuto,kamiamakusa,kikuchi,kumamoto,mashiki,mifune,minamata,minamioguni,nagasu,nishihara,oguni,ozu,sumoto,takamori,uki,uto,yamaga,yamato,yatsushiro<kyoto>ayabe,fukuchiyama,higashiyama,ide,ine,joyo,kameoka,kamo,kita,kizu,kumiyama,kyotamba,kyotanabe,kyotango,maizuru,minami,minamiyamashiro,miyazu,muko,nagaokakyo,nakagyo,nantan,oyamazaki,sakyo,seika,tanabe,uji,ujitawara,wazuka,yamashina,yawata<mie>asahi,inabe,ise,kameyama,kawagoe,kiho,kisosaki,kiwa,komono,kumano,kuwana,matsusaka,meiwa,mihama,minamiise,misugi,miyama,nabari,shima,suzuka,tado,taiki,taki,tamaki,toba,tsu,udono,ureshino,watarai,yokkaichi<miyagi>furukawa,higashimatsushima,ishinomaki,iwanuma,kakuda,kami,kawasaki,marumori,matsushima,minamisanriku,misato,murata,natori,ogawara,ohira,onagawa,osaki,rifu,semine,shibata,shichikashuku,shikama,shiogama,shiroishi,tagajo,taiwa,tome,tomiya,wakuya,watari,yamamoto,zao<miyazaki>aya,ebino,gokase,hyuga,kadogawa,kawaminami,kijo,kitagawa,kitakata,kitaura,kobayashi,kunitomi,kushima,mimata,miyakonojo,miyazaki,morotsuka,nichinan,nishimera,nobeoka,saito,shiiba,shintomi,takaharu,takanabe,takazaki,tsuno<nagano>achi,agematsu,anan,aoki,asahi,azumino,chikuhoku,chikuma,chino,fujimi,hakuba,hara,hiraya,iida,iijima,iiyama,iizuna,ikeda,ikusaka,ina,karuizawa,kawakami,kiso,kisofukushima,kitaaiki,komagane,komoro,matsukawa,matsumoto,miasa,minamiaiki,minamimaki,minamiminowa,minowa,miyada,miyota,mochizuki,nagano,nagawa,nagiso,nakagawa,nakano,nozawaonsen,obuse,ogawa,okaya,omachi,omi,ookuwa,ooshika,otaki,otari,sakae,sakaki,saku,sakuho,shimosuwa,shinanomachi,shiojiri,suwa,suzaka,takagi,takamori,takayama,tateshina,tatsuno,togakushi,togura,tomi,ueda,wada,yamagata,yamanouchi,yasaka,yasuoka<nagasaki>chijiwa,futsu,goto,hasami,hirado,iki,isahaya,kawatana,kuchinotsu,matsuura,nagasaki,obama,omura,oseto,saikai,sasebo,seihi,shimabara,shinkamigoto,togitsu,tsushima,unzen<nara>ando,gose,heguri,higashiyoshino,ikaruga,ikoma,kamikitayama,kanmaki,kashiba,kashihara,katsuragi,kawai,kawakami,kawanishi,koryo,kurotaki,mitsue,miyake,nara,nosegawa,oji,ouda,oyodo,sakurai,sango,shimoichi,shimokitayama,shinjo,soni,takatori,tawaramoto,tenkawa,tenri,uda,yamatokoriyama,yamatotakada,yamazoe,yoshino<niigata>aga,agano,gosen,itoigawa,izumozaki,joetsu,kamo,kariwa,kashiwazaki,minamiuonuma,mitsuke,muika,murakami,myoko,nagaoka,niigata,ojiya,omi,sado,sanjo,seiro,seirou,sekikawa,shibata,tagami,tainai,tochio,tokamachi,tsubame,tsunan,uonuma,yahiko,yoita,yuzawa<oita>beppu,bungoono,bungotakada,hasama,hiji,himeshima,hita,kamitsue,kokonoe,kuju,kunisaki,kusu,oita,saiki,taketa,tsukumi,usa,usuki,yufu<okayama>akaiwa,asakuchi,bizen,hayashima,ibara,kagamino,kasaoka,kibichuo,kumenan,kurashiki,maniwa,misaki,nagi,niimi,nishiawakura,okayama,satosho,setouchi,shinjo,shoo,soja,takahashi,tamano,tsuyama,wake,yakage<okinawa>aguni,ginowan,ginoza,gushikami,haebaru,higashi,hirara,iheya,ishigaki,ishikawa,itoman,izena,kadena,kin,kitadaito,kitanakagusuku,kumejima,kunigami,minamidaito,motobu,nago,naha,nakagusuku,nakijin,nanjo,nishihara,ogimi,okinawa,onna,shimoji,taketomi,tarama,tokashiki,tomigusuku,tonaki,urasoe,uruma,yaese,yomitan,yonabaru,yonaguni,zamami<osaka>abeno,chihayaakasaka,chuo,daito,fujiidera,habikino,hannan,higashiosaka,higashisumiyoshi,higashiyodogawa,hirakata,ibaraki,ikeda,izumi,izumiotsu,izumisano,kadoma,kaizuka,kanan,kashiwara,katano,kawachinagano,kishiwada,kita,kumatori,matsubara,minato,minoh,misaki,moriguchi,neyagawa,nishi,nose,osakasayama,sakai,sayama,sennan,settsu,shijonawate,shimamoto,suita,tadaoka,taishi,tajiri,takaishi,takatsuki,tondabayashi,toyonaka,toyono,yao<saga>ariake,arita,fukudomi,genkai,hamatama,hizen,imari,kamimine,kanzaki,karatsu,kashima,kitagata,kitahata,kiyama,kouhoku,kyuragi,nishiarita,ogi,omachi,ouchi,saga,shiroishi,taku,tara,tosu,yoshinogari<saitama>arakawa,asaka,chichibu,fujimi,fujimino,fukaya,hanno,hanyu,hasuda,hatogaya,hatoyama,hidaka,higashichichibu,higashimatsuyama,honjo,ina,iruma,iwatsuki,kamiizumi,kamikawa,kamisato,kasukabe,kawagoe,kawaguchi,kawajima,kazo,kitamoto,koshigaya,kounosu,kuki,kumagaya,matsubushi,minano,misato,miyashiro,miyoshi,moroyama,nagatoro,namegawa,niiza,ogano,ogawa,ogose,okegawa,omiya,otaki,ranzan,ryokami,saitama,sakado,satte,sayama,shiki,shiraoka,soka,sugito,toda,tokigawa,tokorozawa,tsurugashima,urawa,warabi,yashio,yokoze,yono,yorii,yoshida,yoshikawa,yoshimi<shiga>aisho,gamo,higashiomi,hikone,koka,konan,kosei,koto,kusatsu,maibara,moriyama,nagahama,nishiazai,notogawa,omihachiman,otsu,ritto,ryuoh,takashima,takatsuki,torahime,toyosato,yasu<shimane>akagi,ama,gotsu,hamada,higashiizumo,hikawa,hikimi,izumo,kakinoki,masuda,matsue,misato,nishinoshima,ohda,okinoshima,okuizumo,shimane,tamayu,tsuwano,unnan,yakumo,yasugi,yatsuka<shizuoka>arai,atami,fuji,fujieda,fujikawa,fujinomiya,fukuroi,gotemba,haibara,hamamatsu,higashiizu,ito,iwata,izu,izunokuni,kakegawa,kannami,kawanehon,kawazu,kikugawa,kosai,makinohara,matsuzaki,minamiizu,mishima,morimachi,nishiizu,numazu,omaezaki,shimada,shimizu,shimoda,shizuoka,susono,yaizu,yoshida<tochigi>ashikaga,bato,haga,ichikai,iwafune,kaminokawa,kanuma,karasuyama,kuroiso,mashiko,mibu,moka,motegi,nasu,nasushiobara,nikko,nishikata,nogi,ohira,ohtawara,oyama,sakura,sano,shimotsuke,shioya,takanezawa,tochigi,tsuga,ujiie,utsunomiya,yaita<tokushima>aizumi,anan,ichiba,itano,kainan,komatsushima,matsushige,mima,minami,miyoshi,mugi,nakagawa,naruto,sanagochi,shishikui,tokushima,wajiki<tokyo>adachi,akiruno,akishima,aogashima,arakawa,bunkyo,chiyoda,chofu,chuo,edogawa,fuchu,fussa,hachijo,hachioji,hamura,higashikurume,higashimurayama,higashiyamato,hino,hinode,hinohara,inagi,itabashi,katsushika,kita,kiyose,kodaira,koganei,kokubunji,komae,koto,kouzushima,kunitachi,machida,meguro,minato,mitaka,mizuho,musashimurayama,musashino,nakano,nerima,ogasawara,okutama,ome,oshima,ota,setagaya,shibuya,shinagawa,shinjuku,suginami,sumida,tachikawa,taito,tama,toshima<tottori>chizu,hino,kawahara,koge,kotoura,misasa,nanbu,nichinan,sakaiminato,tottori,wakasa,yazu,yonago<toyama>asahi,fuchu,fukumitsu,funahashi,himi,imizu,inami,johana,kamiichi,kurobe,nakaniikawa,namerikawa,nanto,nyuzen,oyabe,taira,takaoka,tateyama,toga,tonami,toyama,unazuki,uozu,yamada<wakayama>arida,aridagawa,gobo,hashimoto,hidaka,hirogawa,inami,iwade,kainan,kamitonda,katsuragi,kimino,kinokawa,kitayama,koya,koza,kozagawa,kudoyama,kushimoto,mihama,misato,nachikatsuura,shingu,shirahama,taiji,tanabe,wakayama,yuasa,yura<yamagata>asahi,funagata,higashine,iide,kahoku,kaminoyama,kaneyama,kawanishi,mamurogawa,mikawa,murayama,nagai,nakayama,nanyo,nishikawa,obanazawa,oe,oguni,ohkura,oishida,sagae,sakata,sakegawa,shinjo,shirataka,shonai,takahata,tendo,tozawa,tsuruoka,yamagata,yamanobe,yonezawa,yuza<yamaguchi>abu,hagi,hikari,hofu,iwakuni,kudamatsu,mitou,nagato,oshima,shimonoseki,shunan,tabuse,tokuyama,toyota,ube,yuu<yamanashi>chuo,doshi,fuefuki,fujikawa,fujikawaguchiko,fujiyoshida,hayakawa,hokuto,ichikawamisato,kai,kofu,koshu,kosuge,minami-alps,minobu,nakamichi,nanbu,narusawa,nirasaki,nishikatsura,oshino,otsuki,showa,tabayama,tsuru,uenohara,yamanakako,yamanashi<xn--4pvxs,xn--vgu402c,xn--c3s14m,xn--f6qx53a,xn--8pvr4u,xn--uist22h,xn--djrs72d6uy,xn--mkru45i,xn--0trq7p7nn,xn--8ltr62k,xn--2m4a15e,xn--efvn9s,xn--32vp30h,xn--4it797k,xn--1lqs71d,xn--5rtp49c,xn--5js045d,xn--ehqz56n,xn--1lqs03n,xn--qqqt11m,xn--kbrq7o,xn--pssu33l,xn--ntsq17g,xn--uisz3g,xn--6btw5a,xn--1ctwo,xn--6orx2r,xn--rht61e,xn--rht27z,xn--djty4k,xn--nit225k,xn--rht3d,xn--klty5x,xn--kltx9a,xn--kltp7d,xn--uuwu58a,xn--zbx025d,xn--ntso0iqx3a,xn--elqq16h,xn--4it168d,xn--klt787d,xn--rny31h,xn--7t0a264c,xn--5rtq34k,xn--k7yn95e,xn--tor131o,xn--d5qv7z876c,kawasaki>*,!city<kitakyushu>*,!city<kobe>*,!city<nagoya>*,!city<sapporo>*,!city<sendai>*,!city<yokohama>*,!city<<ke>ac,co,go,info,me,mobi,ne,or,sc<kg>org,net,com,edu,gov,mil<kh>*<ki>edu,biz,net,org,gov,info,com<km>org,nom,gov,prd,tm,edu,mil,ass,com,coop,asso,presse,medecin,notaires,pharmaciens,veterinaire,gouv<kn>net,org,edu,gov<kp>com,edu,gov,org,rep,tra<kr>ac,co,es,go,hs,kg,mil,ms,ne,or,pe,re,sc,busan,chungbuk,chungnam,daegu,daejeon,gangwon,gwangju,gyeongbuk,gyeonggi,gyeongnam,incheon,jeju,jeonbuk,jeonnam,seoul,ulsan<kw>com,edu,emb,gov,ind,net,org<ky>edu,gov,com,org,net<kz>org,edu,net,gov,mil,com<la>int,net,info,edu,gov,per,com,org<lb>com,edu,gov,net,org<lc>com,net,co,org,edu,gov<li,lk>gov,sch,net,int,com,org,edu,ngo,soc,web,ltd,assn,grp,hotel,ac<lr>com,edu,gov,org,net<ls>ac,biz,co,edu,gov,info,net,org,sc<lt>gov<lu,lv>com,edu,gov,org,mil,id,net,asn,conf<ly>com,net,gov,plc,edu,sch,med,org,id<ma>co,net,gov,org,ac,press<mc>tm,asso<md,me>co,net,org,edu,ac,gov,its,priv<mg>org,nom,gov,prd,tm,edu,mil,com,co<mh,mil,mk>com,org,net,edu,gov,inf,name<ml>com,edu,gouv,gov,net,org,presse<mm>*<mn>gov,edu,org<mo>com,net,org,edu,gov<mobi,mp,mq,mr>gov<ms>com,edu,gov,net,org<mt>com,edu,net,org<mu>com,net,org,gov,ac,co,or<museum>academy,agriculture,air,airguard,alabama,alaska,amber,ambulance,american,americana,americanantiques,americanart,amsterdam,and,annefrank,anthro,anthropology,antiques,aquarium,arboretum,archaeological,archaeology,architecture,art,artanddesign,artcenter,artdeco,arteducation,artgallery,arts,artsandcrafts,asmatart,assassination,assisi,association,astronomy,atlanta,austin,australia,automotive,aviation,axis,badajoz,baghdad,bahn,bale,baltimore,barcelona,baseball,basel,baths,bauern,beauxarts,beeldengeluid,bellevue,bergbau,berkeley,berlin,bern,bible,bilbao,bill,birdart,birthplace,bonn,boston,botanical,botanicalgarden,botanicgarden,botany,brandywinevalley,brasil,bristol,british,britishcolumbia,broadcast,brunel,brussel,brussels,bruxelles,building,burghof,bus,bushey,cadaques,california,cambridge,can,canada,capebreton,carrier,cartoonart,casadelamoneda,castle,castres,celtic,center,chattanooga,cheltenham,chesapeakebay,chicago,children,childrens,childrensgarden,chiropractic,chocolate,christiansburg,cincinnati,cinema,circus,civilisation,civilization,civilwar,clinton,clock,coal,coastaldefence,cody,coldwar,collection,colonialwilliamsburg,coloradoplateau,columbia,columbus,communication,communications,community,computer,computerhistory,xn--comunicaes-v6a2o,contemporary,contemporaryart,convent,copenhagen,corporation,xn--correios-e-telecomunicaes-ghc29a,corvette,costume,countryestate,county,crafts,cranbrook,creation,cultural,culturalcenter,culture,cyber,cymru,dali,dallas,database,ddr,decorativearts,delaware,delmenhorst,denmark,depot,design,detroit,dinosaur,discovery,dolls,donostia,durham,eastafrica,eastcoast,education,educational,egyptian,eisenbahn,elburg,elvendrell,embroidery,encyclopedic,england,entomology,environment,environmentalconservation,epilepsy,essex,estate,ethnology,exeter,exhibition,family,farm,farmequipment,farmers,farmstead,field,figueres,filatelia,film,fineart,finearts,finland,flanders,florida,force,fortmissoula,fortworth,foundation,francaise,frankfurt,franziskaner,freemasonry,freiburg,fribourg,frog,fundacio,furniture,gallery,garden,gateway,geelvinck,gemological,geology,georgia,giessen,glas,glass,gorge,grandrapids,graz,guernsey,halloffame,hamburg,handson,harvestcelebration,hawaii,health,heimatunduhren,hellas,helsinki,hembygdsforbund,heritage,histoire,historical,historicalsociety,historichouses,historisch,historisches,history,historyofscience,horology,house,humanities,illustration,imageandsound,indian,indiana,indianapolis,indianmarket,intelligence,interactive,iraq,iron,isleofman,jamison,jefferson,jerusalem,jewelry,jewish,jewishart,jfk,journalism,judaica,judygarland,juedisches,juif,karate,karikatur,kids,koebenhavn,koeln,kunst,kunstsammlung,kunstunddesign,labor,labour,lajolla,lancashire,landes,lans,xn--lns-qla,larsson,lewismiller,lincoln,linz,living,livinghistory,localhistory,london,losangeles,louvre,loyalist,lucerne,luxembourg,luzern,mad,madrid,mallorca,manchester,mansion,mansions,manx,marburg,maritime,maritimo,maryland,marylhurst,media,medical,medizinhistorisches,meeres,memorial,mesaverde,michigan,midatlantic,military,mill,miners,mining,minnesota,missile,missoula,modern,moma,money,monmouth,monticello,montreal,moscow,motorcycle,muenchen,muenster,mulhouse,muncie,museet,museumcenter,museumvereniging,music,national,nationalfirearms,nationalheritage,nativeamerican,naturalhistory,naturalhistorymuseum,naturalsciences,nature,naturhistorisches,natuurwetenschappen,naumburg,naval,nebraska,neues,newhampshire,newjersey,newmexico,newport,newspaper,newyork,niepce,norfolk,north,nrw,nyc,nyny,oceanographic,oceanographique,omaha,online,ontario,openair,oregon,oregontrail,otago,oxford,pacific,paderborn,palace,paleo,palmsprings,panama,paris,pasadena,pharmacy,philadelphia,philadelphiaarea,philately,phoenix,photography,pilots,pittsburgh,planetarium,plantation,plants,plaza,portal,portland,portlligat,posts-and-telecommunications,preservation,presidio,press,project,public,pubol,quebec,railroad,railway,research,resistance,riodejaneiro,rochester,rockart,roma,russia,saintlouis,salem,salvadordali,salzburg,sandiego,sanfrancisco,santabarbara,santacruz,santafe,saskatchewan,satx,savannahga,schlesisches,schoenbrunn,schokoladen,school,schweiz,science,scienceandhistory,scienceandindustry,sciencecenter,sciencecenters,science-fiction,sciencehistory,sciences,sciencesnaturelles,scotland,seaport,settlement,settlers,shell,sherbrooke,sibenik,silk,ski,skole,society,sologne,soundandvision,southcarolina,southwest,space,spy,square,stadt,stalbans,starnberg,state,stateofdelaware,station,steam,steiermark,stjohn,stockholm,stpetersburg,stuttgart,suisse,surgeonshall,surrey,svizzera,sweden,sydney,tank,tcm,technology,telekommunikation,television,texas,textile,theater,time,timekeeping,topology,torino,touch,town,transport,tree,trolley,trust,trustee,uhren,ulm,undersea,university,usa,usantiques,usarts,uscountryestate,usculture,usdecorativearts,usgarden,ushistory,ushuaia,uslivinghistory,utah,uvic,valley,vantaa,versailles,viking,village,virginia,virtual,virtuel,vlaanderen,volkenkunde,wales,wallonie,war,washingtondc,watchandclock,watch-and-clock,western,westfalen,whaling,wildlife,williamsburg,windmill,workshop,york,yorkshire,yosemite,youth,zoological,zoology,xn--9dbhblg6di,xn--h1aegh<mv>aero,biz,com,coop,edu,gov,info,int,mil,museum,name,net,org,pro<mw>ac,biz,co,com,coop,edu,gov,int,museum,net,org<mx>com,org,gob,edu,net<my>com,net,org,gov,edu,mil,name<mz>ac,adv,co,edu,gov,mil,net,org<na>info,pro,name,school,or,dr,us,mx,ca,in,cc,tv,ws,mobi,co,com,org<name,nc>asso,nom<ne,net,nf>com,net,per,rec,web,arts,firm,info,other,store<ng>com,edu,gov,i,mil,mobi,name,net,org,sch<ni>ac,biz,co,com,edu,gob,in,info,int,mil,net,nom,org,web<nl,no>fhs,vgs,fylkesbibl,folkebibl,museum,idrett,priv,mil,stat,dep,kommune,herad,aa>gs<ah>gs<bu>gs<fm>gs<hl>gs<hm>gs<jan-mayen>gs<mr>gs<nl>gs<nt>gs<of>gs<ol>gs<oslo>gs<rl>gs<sf>gs<st>gs<svalbard>gs<tm>gs<tr>gs<va>gs<vf>gs<akrehamn,xn--krehamn-dxa,algard,xn--lgrd-poac,arna,brumunddal,bryne,bronnoysund,xn--brnnysund-m8ac,drobak,xn--drbak-wua,egersund,fetsund,floro,xn--flor-jra,fredrikstad,hokksund,honefoss,xn--hnefoss-q1a,jessheim,jorpeland,xn--jrpeland-54a,kirkenes,kopervik,krokstadelva,langevag,xn--langevg-jxa,leirvik,mjondalen,xn--mjndalen-64a,mo-i-rana,mosjoen,xn--mosjen-eya,nesoddtangen,orkanger,osoyro,xn--osyro-wua,raholt,xn--rholt-mra,sandnessjoen,xn--sandnessjen-ogb,skedsmokorset,slattum,spjelkavik,stathelle,stavern,stjordalshalsen,xn--stjrdalshalsen-sqb,tananger,tranby,vossevangen,afjord,xn--fjord-lra,agdenes,al,xn--l-1fa,alesund,xn--lesund-hua,alstahaug,alta,xn--lt-liac,alaheadju,xn--laheadju-7ya,alvdal,amli,xn--mli-tla,amot,xn--mot-tla,andebu,andoy,xn--andy-ira,andasuolo,ardal,xn--rdal-poa,aremark,arendal,xn--s-1fa,aseral,xn--seral-lra,asker,askim,askvoll,askoy,xn--asky-ira,asnes,xn--snes-poa,audnedaln,aukra,aure,aurland,aurskog-holand,xn--aurskog-hland-jnb,austevoll,austrheim,averoy,xn--avery-yua,balestrand,ballangen,balat,xn--blt-elab,balsfjord,bahccavuotna,xn--bhccavuotna-k7a,bamble,bardu,beardu,beiarn,bajddar,xn--bjddar-pta,baidar,xn--bidr-5nac,berg,bergen,berlevag,xn--berlevg-jxa,bearalvahki,xn--bearalvhki-y4a,bindal,birkenes,bjarkoy,xn--bjarky-fya,bjerkreim,bjugn,bodo,xn--bod-2na,badaddja,xn--bdddj-mrabd,budejju,bokn,bremanger,bronnoy,xn--brnny-wuac,bygland,bykle,barum,xn--brum-voa,telemark>bo,xn--b-5ga<nordland>bo,xn--b-5ga,heroy,xn--hery-ira<bievat,xn--bievt-0qa,bomlo,xn--bmlo-gra,batsfjord,xn--btsfjord-9za,bahcavuotna,xn--bhcavuotna-s4a,dovre,drammen,drangedal,dyroy,xn--dyry-ira,donna,xn--dnna-gra,eid,eidfjord,eidsberg,eidskog,eidsvoll,eigersund,elverum,enebakk,engerdal,etne,etnedal,evenes,evenassi,xn--eveni-0qa01ga,evje-og-hornnes,farsund,fauske,fuossko,fuoisku,fedje,fet,finnoy,xn--finny-yua,fitjar,fjaler,fjell,flakstad,flatanger,flekkefjord,flesberg,flora,fla,xn--fl-zia,folldal,forsand,fosnes,frei,frogn,froland,frosta,frana,xn--frna-woa,froya,xn--frya-hra,fusa,fyresdal,forde,xn--frde-gra,gamvik,gangaviika,xn--ggaviika-8ya47h,gaular,gausdal,gildeskal,xn--gildeskl-g0a,giske,gjemnes,gjerdrum,gjerstad,gjesdal,gjovik,xn--gjvik-wua,gloppen,gol,gran,grane,granvin,gratangen,grimstad,grong,kraanghke,xn--kranghke-b0a,grue,gulen,hadsel,halden,halsa,hamar,hamaroy,habmer,xn--hbmer-xqa,hapmir,xn--hpmir-xqa,hammerfest,hammarfeasta,xn--hmmrfeasta-s4ac,haram,hareid,harstad,hasvik,aknoluokta,xn--koluokta-7ya57h,hattfjelldal,aarborte,haugesund,hemne,hemnes,hemsedal,more-og-romsdal>heroy,sande<xn--mre-og-romsdal-qqb>xn--hery-ira,sande<hitra,hjartdal,hjelmeland,hobol,xn--hobl-ira,hof,hol,hole,holmestrand,holtalen,xn--holtlen-hxa,hornindal,horten,hurdal,hurum,hvaler,hyllestad,hagebostad,xn--hgebostad-g3a,hoyanger,xn--hyanger-q1a,hoylandet,xn--hylandet-54a,ha,xn--h-2fa,ibestad,inderoy,xn--indery-fya,iveland,jevnaker,jondal,jolster,xn--jlster-bya,karasjok,karasjohka,xn--krjohka-hwab49j,karlsoy,galsa,xn--gls-elac,karmoy,xn--karmy-yua,kautokeino,guovdageaidnu,klepp,klabu,xn--klbu-woa,kongsberg,kongsvinger,kragero,xn--krager-gya,kristiansand,kristiansund,krodsherad,xn--krdsherad-m8a,kvalsund,rahkkeravju,xn--rhkkervju-01af,kvam,kvinesdal,kvinnherad,kviteseid,kvitsoy,xn--kvitsy-fya,kvafjord,xn--kvfjord-nxa,giehtavuoatna,kvanangen,xn--kvnangen-k0a,navuotna,xn--nvuotna-hwa,kafjord,xn--kfjord-iua,gaivuotna,xn--givuotna-8ya,larvik,lavangen,lavagis,loabat,xn--loabt-0qa,lebesby,davvesiida,leikanger,leirfjord,leka,leksvik,lenvik,leangaviika,xn--leagaviika-52b,lesja,levanger,lier,lierne,lillehammer,lillesand,lindesnes,lindas,xn--linds-pra,lom,loppa,lahppi,xn--lhppi-xqa,lund,lunner,luroy,xn--lury-ira,luster,lyngdal,lyngen,ivgu,lardal,lerdal,xn--lrdal-sra,lodingen,xn--ldingen-q1a,lorenskog,xn--lrenskog-54a,loten,xn--lten-gra,malvik,masoy,xn--msy-ula0h,muosat,xn--muost-0qa,mandal,marker,marnardal,masfjorden,meland,meldal,melhus,meloy,xn--mely-ira,meraker,xn--merker-kua,moareke,xn--moreke-jua,midsund,midtre-gauldal,modalen,modum,molde,moskenes,moss,mosvik,malselv,xn--mlselv-iua,malatvuopmi,xn--mlatvuopmi-s4a,namdalseid,aejrie,namsos,namsskogan,naamesjevuemie,xn--nmesjevuemie-tcba,laakesvuemie,nannestad,narvik,narviika,naustdal,nedre-eiker,akershus>nes<buskerud>nes<nesna,nesodden,nesseby,unjarga,xn--unjrga-rta,nesset,nissedal,nittedal,nord-aurdal,nord-fron,nord-odal,norddal,nordkapp,davvenjarga,xn--davvenjrga-y4a,nordre-land,nordreisa,raisa,xn--risa-5na,nore-og-uvdal,notodden,naroy,xn--nry-yla5g,notteroy,xn--nttery-byae,odda,oksnes,xn--ksnes-uua,oppdal,oppegard,xn--oppegrd-ixa,orkdal,orland,xn--rland-uua,orskog,xn--rskog-uua,orsta,xn--rsta-fra,hedmark>os,valer,xn--vler-qoa<hordaland>os<osen,osteroy,xn--ostery-fya,ostre-toten,xn--stre-toten-zcb,overhalla,ovre-eiker,xn--vre-eiker-k8a,oyer,xn--yer-zna,oygarden,xn--ygarden-p1a,oystre-slidre,xn--ystre-slidre-ujb,porsanger,porsangu,xn--porsgu-sta26f,porsgrunn,radoy,xn--rady-ira,rakkestad,rana,ruovat,randaberg,rauma,rendalen,rennebu,rennesoy,xn--rennesy-v1a,rindal,ringebu,ringerike,ringsaker,rissa,risor,xn--risr-ira,roan,rollag,rygge,ralingen,xn--rlingen-mxa,rodoy,xn--rdy-0nab,romskog,xn--rmskog-bya,roros,xn--rros-gra,rost,xn--rst-0na,royken,xn--ryken-vua,royrvik,xn--ryrvik-bya,rade,xn--rde-ula,salangen,siellak,saltdal,salat,xn--slt-elab,xn--slat-5na,samnanger,vestfold>sande<sandefjord,sandnes,sandoy,xn--sandy-yua,sarpsborg,sauda,sauherad,sel,selbu,selje,seljord,sigdal,siljan,sirdal,skaun,skedsmo,ski,skien,skiptvet,skjervoy,xn--skjervy-v1a,skierva,xn--skierv-uta,skjak,xn--skjk-soa,skodje,skanland,xn--sknland-fxa,skanit,xn--sknit-yqa,smola,xn--smla-hra,snillfjord,snasa,xn--snsa-roa,snoasa,snaase,xn--snase-nra,sogndal,sokndal,sola,solund,songdalen,sortland,spydeberg,stange,stavanger,steigen,steinkjer,stjordal,xn--stjrdal-s1a,stokke,stor-elvdal,stord,stordal,storfjord,omasvuotna,strand,stranda,stryn,sula,suldal,sund,sunndal,surnadal,sveio,svelvik,sykkylven,sogne,xn--sgne-gra,somna,xn--smna-gra,sondre-land,xn--sndre-land-0cb,sor-aurdal,xn--sr-aurdal-l8a,sor-fron,xn--sr-fron-q1a,sor-odal,xn--sr-odal-q1a,sor-varanger,xn--sr-varanger-ggb,matta-varjjat,xn--mtta-vrjjat-k7af,sorfold,xn--srfold-bya,sorreisa,xn--srreisa-q1a,sorum,xn--srum-gra,tana,deatnu,time,tingvoll,tinn,tjeldsund,dielddanuorri,tjome,xn--tjme-hra,tokke,tolga,torsken,tranoy,xn--trany-yua,tromso,xn--troms-zua,tromsa,romsa,trondheim,troandin,trysil,trana,xn--trna-woa,trogstad,xn--trgstad-r1a,tvedestrand,tydal,tynset,tysfjord,divtasvuodna,divttasvuotna,tysnes,tysvar,xn--tysvr-vra,tonsberg,xn--tnsberg-q1a,ullensaker,ullensvang,ulvik,utsira,vadso,xn--vads-jra,cahcesuolo,xn--hcesuolo-7ya35b,vaksdal,valle,vang,vanylven,vardo,xn--vard-jra,varggat,xn--vrggt-xqad,vefsn,vaapste,vega,vegarshei,xn--vegrshei-c0a,vennesla,verdal,verran,vestby,vestnes,vestre-slidre,vestre-toten,vestvagoy,xn--vestvgy-ixa6o,vevelstad,vik,vikna,vindafjord,volda,voss,varoy,xn--vry-yla5g,vagan,xn--vgan-qoa,voagat,vagsoy,xn--vgsy-qoa0j,vaga,xn--vg-yiab,ostfold>valer<xn--stfold-9xa>xn--vler-qoa<<np>*<nr>biz,info,gov,edu,org,net,com<nu,nz>ac,co,cri,geek,gen,govt,health,iwi,kiwi,maori,mil,xn--mori-qsa,net,org,parliament,school<om>co,com,edu,gov,med,museum,net,org,pro<onion,org,pa>ac,gob,com,org,sld,edu,net,ing,abo,med,nom<pe>edu,gob,nom,mil,org,com,net<pf>com,org,edu<pg>*<ph>com,net,org,gov,edu,ngo,mil,i<pk>com,net,edu,org,fam,biz,web,gov,gob,gok,gon,gop,gos,info<pl>com,net,org,aid,agro,atm,auto,biz,edu,gmina,gsm,info,mail,miasta,media,mil,nieruchomosci,nom,pc,powiat,priv,realestate,rel,sex,shop,sklep,sos,szkola,targi,tm,tourism,travel,turystyka,gov>ap,ic,is,us,kmpsp,kppsp,kwpsp,psp,wskr,kwp,mw,ug,um,umig,ugim,upow,uw,starostwo,pa,po,psse,pup,rzgw,sa,so,sr,wsa,sko,uzs,wiih,winb,pinb,wios,witd,wzmiuw,piw,wiw,griw,wif,oum,sdn,zp,uppo,mup,wuoz,konsulat,oirm<augustow,babia-gora,bedzin,beskidy,bialowieza,bialystok,bielawa,bieszczady,boleslawiec,bydgoszcz,bytom,cieszyn,czeladz,czest,dlugoleka,elblag,elk,glogow,gniezno,gorlice,grajewo,ilawa,jaworzno,jelenia-gora,jgora,kalisz,kazimierz-dolny,karpacz,kartuzy,kaszuby,katowice,kepno,ketrzyn,klodzko,kobierzyce,kolobrzeg,konin,konskowola,kutno,lapy,lebork,legnica,lezajsk,limanowa,lomza,lowicz,lubin,lukow,malbork,malopolska,mazowsze,mazury,mielec,mielno,mragowo,naklo,nowaruda,nysa,olawa,olecko,olkusz,olsztyn,opoczno,opole,ostroda,ostroleka,ostrowiec,ostrowwlkp,pila,pisz,podhale,podlasie,polkowice,pomorze,pomorskie,prochowice,pruszkow,przeworsk,pulawy,radom,rawa-maz,rybnik,rzeszow,sanok,sejny,slask,slupsk,sosnowiec,stalowa-wola,skoczow,starachowice,stargard,suwalki,swidnica,swiebodzin,swinoujscie,szczecin,szczytno,tarnobrzeg,tgory,turek,tychy,ustka,walbrzych,warmia,warszawa,waw,wegrow,wielun,wlocl,wloclawek,wodzislaw,wolomin,wroclaw,zachpomor,zagan,zarow,zgora,zgorzelec<pm,pn>gov,co,org,edu,net<post,pr>com,net,org,gov,edu,isla,pro,biz,info,name,est,prof,ac<pro>aaa,aca,acct,avocat,bar,cpa,eng,jur,law,med,recht<ps>edu,gov,sec,plo,com,org,net<pt>net,gov,org,edu,int,publ,com,nome<pw>co,ne,or,ed,go,belau<py>com,coop,edu,gov,mil,net,org<qa>com,edu,gov,mil,name,net,org,sch<re>asso,com,nom<ro>arts,com,firm,info,nom,nt,org,rec,store,tm,www<rs>ac,co,edu,gov,in,org<ru,rw>ac,co,coop,gov,mil,net,org<sa>com,net,org,gov,med,pub,edu,sch<sb>com,edu,gov,net,org<sc>com,gov,net,org,edu<sd>com,net,org,edu,med,tv,gov,info<se>a,ac,b,bd,brand,c,d,e,f,fh,fhsk,fhv,g,h,i,k,komforb,kommunalforbund,komvux,l,lanbib,m,n,naturbruksgymn,o,org,p,parti,pp,press,r,s,t,tm,u,w,x,y,z<sg>com,net,org,gov,edu,per<sh>com,net,gov,org,mil<si,sj,sk,sl>com,net,edu,gov,org<sm,sn>art,com,edu,gouv,org,perso,univ<so>com,edu,gov,me,net,org<sr,ss>biz,com,edu,gov,net,org<st>co,com,consulado,edu,embaixada,gov,mil,net,org,principe,saotome,store<su,sv>com,edu,gob,org,red<sx>gov<sy>edu,gov,net,mil,com,org<sz>co,ac,org<tc,td,tel,tf,tg,th>ac,co,go,in,mi,net,or<tj>ac,biz,co,com,edu,go,gov,int,mil,name,net,nic,org,test,web<tk,tl>gov<tm>com,co,org,net,nom,gov,mil,edu<tn>com,ens,fin,gov,ind,intl,nat,net,org,info,perso,tourism,edunet,rnrt,rns,rnu,mincom,agrinet,defense,turen<to>com,gov,net,org,edu,mil<tr>av,bbs,bel,biz,com,dr,edu,gen,gov,info,mil,k12,kep,name,net,org,pol,tel,tsk,tv,web,nc>gov<<tt>co,com,org,net,biz,info,pro,int,coop,jobs,mobi,travel,museum,aero,name,gov,edu<tv,tw>edu,gov,mil,com,net,org,idv,game,ebiz,club,xn--zf0ao64a,xn--uc0atv,xn--czrw28b<tz>ac,co,go,hotel,info,me,mil,mobi,ne,or,sc,tv<ua>com,edu,gov,in,net,org,cherkassy,cherkasy,chernigov,chernihiv,chernivtsi,chernovtsy,ck,cn,cr,crimea,cv,dn,dnepropetrovsk,dnipropetrovsk,donetsk,dp,if,ivano-frankivsk,kh,kharkiv,kharkov,kherson,khmelnitskiy,khmelnytskyi,kiev,kirovograd,km,kr,krym,ks,kv,kyiv,lg,lt,lugansk,lutsk,lv,lviv,mk,mykolaiv,nikolaev,od,odesa,odessa,pl,poltava,rivne,rovno,rv,sb,sebastopol,sevastopol,sm,sumy,te,ternopil,uz,uzhgorod,vinnica,vinnytsia,vn,volyn,yalta,zaporizhzhe,zaporizhzhia,zhitomir,zhytomyr,zp,zt<ug>co,or,ac,sc,go,ne,com,org<uk>ac,co,gov,ltd,me,net,nhs,org,plc,police,sch>*<<us>dni,fed,isa,kids,nsn,ak>k12,cc,lib<al>k12,cc,lib<ar>k12,cc,lib<as>k12,cc,lib<az>k12,cc,lib<ca>k12,cc,lib<co>k12,cc,lib<ct>k12,cc,lib<dc>k12,cc,lib<de>k12,cc<fl>k12,cc,lib<ga>k12,cc,lib<gu>k12,cc,lib<hi>cc,lib<ia>k12,cc,lib<id>k12,cc,lib<il>k12,cc,lib<in>k12,cc,lib<ks>k12,cc,lib<ky>k12,cc,lib<la>k12,cc,lib<ma>k12>pvt,chtr,paroch<cc,lib<md>k12,cc,lib<me>k12,cc,lib<mi>k12,cc,lib,ann-arbor,cog,dst,eaton,gen,mus,tec,washtenaw<mn>k12,cc,lib<mo>k12,cc,lib<ms>k12,cc,lib<mt>k12,cc,lib<nc>k12,cc,lib<nd>cc,lib<ne>k12,cc,lib<nh>k12,cc,lib<nj>k12,cc,lib<nm>k12,cc,lib<nv>k12,cc,lib<ny>k12,cc,lib<oh>k12,cc,lib<ok>k12,cc,lib<or>k12,cc,lib<pa>k12,cc,lib<pr>k12,cc,lib<ri>cc,lib<sc>k12,cc,lib<sd>cc,lib<tn>k12,cc,lib<tx>k12,cc,lib<ut>k12,cc,lib<vi>k12,cc,lib<vt>k12,cc,lib<va>k12,cc,lib<wa>k12,cc,lib<wi>k12,cc,lib<wv>cc<wy>k12,cc,lib<<uy>com,edu,gub,mil,net,org<uz>co,com,net,org<va,vc>com,net,org,gov,mil,edu<ve>arts,co,com,e12,edu,firm,gob,gov,info,int,mil,net,org,rec,store,tec,web<vg,vi>co,com,k12,net,org<vn>com,net,org,edu,gov,int,ac,biz,info,name,pro,health<vu>com,edu,net,org<wf,ws>com,net,org,gov,edu<yt,xn--mgbaam7a8h,xn--y9a3aq,xn--54b7fta0cc,xn--90ae,xn--90ais,xn--fiqs8s,xn--fiqz9s,xn--lgbbat1ad8j,xn--wgbh1c,xn--e1a4c,xn--qxa6a,xn--mgbah1a3hjkrd,xn--node,xn--qxam,xn--j6w193g>xn--55qx5d,xn--wcvs22d,xn--mxtq1m,xn--gmqw5a,xn--od0alg,xn--uc0atv<xn--2scrj9c,xn--3hcrj9c,xn--45br5cyl,xn--h2breg3eve,xn--h2brj9c8c,xn--mgbgu82a,xn--rvc1e0am3e,xn--h2brj9c,xn--mgbbh1a,xn--mgbbh1a71e,xn--fpcrj9c3d,xn--gecrj9c,xn--s9brj9c,xn--45brj9c,xn--xkc2dl3a5ee0h,xn--mgba3a4f16a,xn--mgba3a4fra,xn--mgbtx2b,xn--mgbayh7gpa,xn--3e0b707e,xn--80ao21a,xn--fzc2c9e2c,xn--xkc2al3hye2a,xn--mgbc0a9azcg,xn--d1alf,xn--l1acc,xn--mix891f,xn--mix082f,xn--mgbx4cd0ab,xn--mgb9awbf,xn--mgbai9azgqp6j,xn--mgbai9a5eva00b,xn--ygbi2ammx,xn--90a3ac>xn--o1ac,xn--c1avg,xn--90azh,xn--d1at,xn--o1ach,xn--80au<xn--p1ai,xn--wgbl6a,xn--mgberp4a5d4ar,xn--mgberp4a5d4a87g,xn--mgbqly7c0a67fbc,xn--mgbqly7cvafr,xn--mgbpl2fh,xn--yfro4i67o,xn--clchc0ea0b2g2a9gcd,xn--ogbpf8fl,xn--mgbtf8fl,xn--o3cw4h>xn--12c1fe0br,xn--12co0c3b4eva,xn--h3cuzk1di,xn--o3cyx2a,xn--m3ch0j3a,xn--12cfi8ixb8l<xn--pgbs0dh,xn--kpry57d,xn--kprw13d,xn--nnx388a,xn--j1amh,xn--mgb2ddes,xxx,ye>*<za>ac,agric,alt,co,edu,gov,grondar,law,mil,net,ngo,nic,nis,nom,org,school,tm,web<zm>ac,biz,co,com,edu,gov,info,mil,net,org,sch<zw>ac,co,gov,mil,org<aaa,aarp,abarth,abb,abbott,abbvie,abc,able,abogado,abudhabi,academy,accenture,accountant,accountants,aco,actor,adac,ads,adult,aeg,aetna,afamilycompany,afl,africa,agakhan,agency,aig,airbus,airforce,airtel,akdn,alfaromeo,alibaba,alipay,allfinanz,allstate,ally,alsace,alstom,amazon,americanexpress,americanfamily,amex,amfam,amica,amsterdam,analytics,android,anquan,anz,aol,apartments,app,apple,aquarelle,arab,aramco,archi,army,art,arte,asda,associates,athleta,attorney,auction,audi,audible,audio,auspost,author,auto,autos,avianca,aws,axa,azure,baby,baidu,banamex,bananarepublic,band,bank,bar,barcelona,barclaycard,barclays,barefoot,bargains,baseball,basketball,bauhaus,bayern,bbc,bbt,bbva,bcg,bcn,beats,beauty,beer,bentley,berlin,best,bestbuy,bet,bharti,bible,bid,bike,bing,bingo,bio,black,blackfriday,blockbuster,blog,bloomberg,blue,bms,bmw,bnpparibas,boats,boehringer,bofa,bom,bond,boo,book,booking,bosch,bostik,boston,bot,boutique,box,bradesco,bridgestone,broadway,broker,brother,brussels,budapest,bugatti,build,builders,business,buy,buzz,bzh,cab,cafe,cal,call,calvinklein,cam,camera,camp,cancerresearch,canon,capetown,capital,capitalone,car,caravan,cards,care,career,careers,cars,casa,case,caseih,cash,casino,catering,catholic,cba,cbn,cbre,cbs,ceb,center,ceo,cern,cfa,cfd,chanel,channel,charity,chase,chat,cheap,chintai,christmas,chrome,church,cipriani,circle,cisco,citadel,citi,citic,city,cityeats,claims,cleaning,click,clinic,clinique,clothing,cloud,club,clubmed,coach,codes,coffee,college,cologne,comcast,commbank,community,company,compare,computer,comsec,condos,construction,consulting,contact,contractors,cooking,cookingchannel,cool,corsica,country,coupon,coupons,courses,cpa,credit,creditcard,creditunion,cricket,crown,crs,cruise,cruises,csc,cuisinella,cymru,cyou,dabur,dad,dance,data,date,dating,datsun,day,dclk,dds,deal,dealer,deals,degree,delivery,dell,deloitte,delta,democrat,dental,dentist,desi,design,dev,dhl,diamonds,diet,digital,direct,directory,discount,discover,dish,diy,dnp,docs,doctor,dog,domains,dot,download,drive,dtv,dubai,duck,dunlop,dupont,durban,dvag,dvr,earth,eat,eco,edeka,education,email,emerck,energy,engineer,engineering,enterprises,epson,equipment,ericsson,erni,esq,estate,etisalat,eurovision,eus,events,exchange,expert,exposed,express,extraspace,fage,fail,fairwinds,faith,family,fan,fans,farm,farmers,fashion,fast,fedex,feedback,ferrari,ferrero,fiat,fidelity,fido,film,final,finance,financial,fire,firestone,firmdale,fish,fishing,fit,fitness,flickr,flights,flir,florist,flowers,fly,foo,food,foodnetwork,football,ford,forex,forsale,forum,foundation,fox,free,fresenius,frl,frogans,frontdoor,frontier,ftr,fujitsu,fujixerox,fun,fund,furniture,futbol,fyi,gal,gallery,gallo,gallup,game,games,gap,garden,gay,gbiz,gdn,gea,gent,genting,george,ggee,gift,gifts,gives,giving,glade,glass,gle,global,globo,gmail,gmbh,gmo,gmx,godaddy,gold,goldpoint,golf,goo,goodyear,goog,google,gop,got,grainger,graphics,gratis,green,gripe,grocery,group,guardian,gucci,guge,guide,guitars,guru,hair,hamburg,hangout,haus,hbo,hdfc,hdfcbank,health,healthcare,help,helsinki,here,hermes,hgtv,hiphop,hisamitsu,hitachi,hiv,hkt,hockey,holdings,holiday,homedepot,homegoods,homes,homesense,honda,horse,hospital,host,hosting,hot,hoteles,hotels,hotmail,house,how,hsbc,hughes,hyatt,hyundai,ibm,icbc,ice,icu,ieee,ifm,ikano,imamat,imdb,immo,immobilien,inc,industries,infiniti,ing,ink,institute,insurance,insure,international,intuit,investments,ipiranga,irish,ismaili,ist,istanbul,itau,itv,iveco,jaguar,java,jcb,jcp,jeep,jetzt,jewelry,jio,jll,jmp,jnj,joburg,jot,joy,jpmorgan,jprs,juegos,juniper,kaufen,kddi,kerryhotels,kerrylogistics,kerryproperties,kfh,kia,kim,kinder,kindle,kitchen,kiwi,koeln,komatsu,kosher,kpmg,kpn,krd,kred,kuokgroup,kyoto,lacaixa,lamborghini,lamer,lancaster,lancia,land,landrover,lanxess,lasalle,lat,latino,latrobe,law,lawyer,lds,lease,leclerc,lefrak,legal,lego,lexus,lgbt,lidl,life,lifeinsurance,lifestyle,lighting,like,lilly,limited,limo,lincoln,linde,link,lipsy,live,living,lixil,llc,llp,loan,loans,locker,locus,loft,lol,london,lotte,lotto,love,lpl,lplfinancial,ltd,ltda,lundbeck,lupin,luxe,luxury,macys,madrid,maif,maison,makeup,man,management,mango,map,market,marketing,markets,marriott,marshalls,maserati,mattel,mba,mckinsey,med,media,meet,melbourne,meme,memorial,men,menu,merckmsd,miami,microsoft,mini,mint,mit,mitsubishi,mlb,mls,mma,mobile,moda,moe,moi,mom,monash,money,monster,mormon,mortgage,moscow,moto,motorcycles,mov,movie,msd,mtn,mtr,mutual,nab,nagoya,nationwide,natura,navy,nba,nec,netbank,netflix,network,neustar,new,newholland,news,next,nextdirect,nexus,nfl,ngo,nhk,nico,nike,nikon,ninja,nissan,nissay,nokia,northwesternmutual,norton,now,nowruz,nowtv,nra,nrw,ntt,nyc,obi,observer,off,office,okinawa,olayan,olayangroup,oldnavy,ollo,omega,one,ong,onl,online,onyourside,ooo,open,oracle,orange,organic,origins,osaka,otsuka,ott,ovh,page,panasonic,paris,pars,partners,parts,party,passagens,pay,pccw,pet,pfizer,pharmacy,phd,philips,phone,photo,photography,photos,physio,pics,pictet,pictures,pid,pin,ping,pink,pioneer,pizza,place,play,playstation,plumbing,plus,pnc,pohl,poker,politie,porn,pramerica,praxi,press,prime,prod,productions,prof,progressive,promo,properties,property,protection,pru,prudential,pub,pwc,qpon,quebec,quest,qvc,racing,radio,raid,read,realestate,realtor,realty,recipes,red,redstone,redumbrella,rehab,reise,reisen,reit,reliance,ren,rent,rentals,repair,report,republican,rest,restaurant,review,reviews,rexroth,rich,richardli,ricoh,ril,rio,rip,rmit,rocher,rocks,rodeo,rogers,room,rsvp,rugby,ruhr,run,rwe,ryukyu,saarland,safe,safety,sakura,sale,salon,samsclub,samsung,sandvik,sandvikcoromant,sanofi,sap,sarl,sas,save,saxo,sbi,sbs,sca,scb,schaeffler,schmidt,scholarships,school,schule,schwarz,science,scjohnson,scot,search,seat,secure,security,seek,select,sener,services,ses,seven,sew,sex,sexy,sfr,shangrila,sharp,shaw,shell,shia,shiksha,shoes,shop,shopping,shouji,show,showtime,shriram,silk,sina,singles,site,ski,skin,sky,skype,sling,smart,smile,sncf,soccer,social,softbank,software,sohu,solar,solutions,song,sony,soy,spa,space,sport,spot,spreadbetting,srl,stada,staples,star,statebank,statefarm,stc,stcgroup,stockholm,storage,store,stream,studio,study,style,sucks,supplies,supply,support,surf,surgery,suzuki,swatch,swiftcover,swiss,sydney,systems,tab,taipei,talk,taobao,target,tatamotors,tatar,tattoo,tax,taxi,tci,tdk,team,tech,technology,temasek,tennis,teva,thd,theater,theatre,tiaa,tickets,tienda,tiffany,tips,tires,tirol,tjmaxx,tjx,tkmaxx,tmall,today,tokyo,tools,top,toray,toshiba,total,tours,town,toyota,toys,trade,trading,training,travel,travelchannel,travelers,travelersinsurance,trust,trv,tube,tui,tunes,tushu,tvs,ubank,ubs,unicom,university,uno,uol,ups,vacations,vana,vanguard,vegas,ventures,verisign,versicherung,vet,viajes,video,vig,viking,villas,vin,vip,virgin,visa,vision,viva,vivo,vlaanderen,vodka,volkswagen,volvo,vote,voting,voto,voyage,vuelos,wales,walmart,walter,wang,wanggou,watch,watches,weather,weatherchannel,webcam,weber,website,wedding,weibo,weir,whoswho,wien,wiki,williamhill,win,windows,wine,winners,wme,wolterskluwer,woodside,work,works,world,wow,wtc,wtf,xbox,xerox,xfinity,xihuan,xin,xn--11b4c3d,xn--1ck2e1b,xn--1qqw23a,xn--30rr7y,xn--3bst00m,xn--3ds443g,xn--3oq18vl8pn36a,xn--3pxu8k,xn--42c2d9a,xn--45q11c,xn--4gbrim,xn--55qw42g,xn--55qx5d,xn--5su34j936bgsg,xn--5tzm5g,xn--6frz82g,xn--6qq986b3xl,xn--80adxhks,xn--80aqecdr1a,xn--80asehdb,xn--80aswg,xn--8y0a063a,xn--9dbq2a,xn--9et52u,xn--9krt00a,xn--b4w605ferd,xn--bck1b9a5dre4c,xn--c1avg,xn--c2br7g,xn--cck2b3b,xn--cckwcxetd,xn--cg4bki,xn--czr694b,xn--czrs0t,xn--czru2d,xn--d1acj3b,xn--eckvdtc9d,xn--efvy88h,xn--fct429k,xn--fhbei,xn--fiq228c5hs,xn--fiq64b,xn--fjq720a,xn--flw351e,xn--fzys8d69uvgm,xn--g2xx48c,xn--gckr3f0f,xn--gk3at1e,xn--hxt814e,xn--i1b6b1a6a2e,xn--imr513n,xn--io0a7i,xn--j1aef,xn--jlq480n2rg,xn--jlq61u9w7b,xn--jvr189m,xn--kcrx77d1x4a,xn--kput3i,xn--mgba3a3ejt,xn--mgba7c0bbn0a,xn--mgbaakc7dvf,xn--mgbab2bd,xn--mgbca7dzdo,xn--mgbi4ecexp,xn--mgbt3dhd,xn--mk1bu44c,xn--mxtq1m,xn--ngbc5azd,xn--ngbe9e0a,xn--ngbrx,xn--nqv7f,xn--nqv7fs00ema,xn--nyqy26a,xn--otu796d,xn--p1acf,xn--pssy2u,xn--q9jyb4c,xn--qcka1pmc,xn--rhqv96g,xn--rovu88b,xn--ses554g,xn--t60b56a,xn--tckwe,xn--tiq49xqyj,xn--unup4y,xn--vermgensberater-ctb,xn--vermgensberatung-pwb,xn--vhquv,xn--vuq861b,xn--w4r85el8fhu5dnra,xn--w4rs40l,xn--xhq521b,xn--zfr164b,xyz,yachts,yahoo,yamaxun,yandex,yodobashi,yoga,yokohama,you,youtube,yun,zappos,zara,zero,zip,zone,zuerich"

/***/ }),

/***/ 89:
/***/ (function(module, exports) {

module.exports = "ua>cc,inf,ltd,biz,co,pp,v,cx<to>611,oya,rdv,vpnplus,quickconnect>direct<nyan<com>adobeaemcloud>dev>*<<kasserver,algorithmia>*,!teams,!test<amazonaws>compute>*<compute-1>*<us-east-1>dualstack>s3<<elb>*<s3,s3-ap-northeast-1,s3-ap-northeast-2,s3-ap-south-1,s3-ap-southeast-1,s3-ap-southeast-2,s3-ca-central-1,s3-eu-central-1,s3-eu-west-1,s3-eu-west-2,s3-eu-west-3,s3-external-1,s3-fips-us-gov-west-1,s3-sa-east-1,s3-us-gov-west-1,s3-us-east-2,s3-us-west-1,s3-us-west-2,ap-northeast-2>s3,dualstack>s3<s3-website<ap-south-1>s3,dualstack>s3<s3-website<ca-central-1>s3,dualstack>s3<s3-website<eu-central-1>s3,dualstack>s3<s3-website<eu-west-2>s3,dualstack>s3<s3-website<eu-west-3>s3,dualstack>s3<s3-website<us-east-2>s3,dualstack>s3<s3-website<ap-northeast-1>dualstack>s3<<ap-southeast-1>dualstack>s3<<ap-southeast-2>dualstack>s3<<eu-west-1>dualstack>s3<<sa-east-1>dualstack>s3<<s3-website-us-east-1,s3-website-us-west-1,s3-website-us-west-2,s3-website-ap-northeast-1,s3-website-ap-southeast-1,s3-website-ap-southeast-2,s3-website-eu-west-1,s3-website-sa-east-1<elasticbeanstalk>ap-northeast-1,ap-northeast-2,ap-northeast-3,ap-south-1,ap-southeast-1,ap-southeast-2,ca-central-1,eu-central-1,eu-west-1,eu-west-2,eu-west-3,sa-east-1,us-east-1,us-east-2,us-gov-west-1,us-west-1,us-west-2<on-aptible,myasustor,balena-devices,betainabox,bplaced,br,cn,de,eu,jpn,mex,ru,sa,uk,us,za,ar,gb,hu,kr,no,qc,uy,africa,gr,co,xenapponazure,jdevcloud,wpdevcloud,cloudcontrolled,cloudcontrolapp,trycloudflare,customer-oci>*,oci>*<ocp>*<ocs>*<<dattolocal,dattorelay,dattoweb,mydatto,builtwithdark,drayddns,dreamhosters,mydrobo,dyndns-at-home,dyndns-at-work,dyndns-blog,dyndns-free,dyndns-home,dyndns-ip,dyndns-mail,dyndns-office,dyndns-pics,dyndns-remote,dyndns-server,dyndns-web,dyndns-wiki,dyndns-work,blogdns,cechire,dnsalias,dnsdojo,doesntexist,dontexist,doomdns,dyn-o-saur,dynalias,est-a-la-maison,est-a-la-masion,est-le-patron,est-mon-blogueur,from-ak,from-al,from-ar,from-ca,from-ct,from-dc,from-de,from-fl,from-ga,from-hi,from-ia,from-id,from-il,from-in,from-ks,from-ky,from-ma,from-md,from-mi,from-mn,from-mo,from-ms,from-mt,from-nc,from-nd,from-ne,from-nh,from-nj,from-nm,from-nv,from-oh,from-ok,from-or,from-pa,from-pr,from-ri,from-sc,from-sd,from-tn,from-tx,from-ut,from-va,from-vt,from-wa,from-wi,from-wv,from-wy,getmyip,gotdns,hobby-site,homelinux,homeunix,iamallama,is-a-anarchist,is-a-blogger,is-a-bookkeeper,is-a-bulls-fan,is-a-caterer,is-a-chef,is-a-conservative,is-a-cpa,is-a-cubicle-slave,is-a-democrat,is-a-designer,is-a-doctor,is-a-financialadvisor,is-a-geek,is-a-green,is-a-guru,is-a-hard-worker,is-a-hunter,is-a-landscaper,is-a-lawyer,is-a-liberal,is-a-libertarian,is-a-llama,is-a-musician,is-a-nascarfan,is-a-nurse,is-a-painter,is-a-personaltrainer,is-a-photographer,is-a-player,is-a-republican,is-a-rockstar,is-a-socialist,is-a-student,is-a-teacher,is-a-techie,is-a-therapist,is-an-accountant,is-an-actor,is-an-actress,is-an-anarchist,is-an-artist,is-an-engineer,is-an-entertainer,is-certified,is-gone,is-into-anime,is-into-cars,is-into-cartoons,is-into-games,is-leet,is-not-certified,is-slick,is-uberleet,is-with-theband,isa-geek,isa-hockeynut,issmarterthanyou,likes-pie,likescandy,neat-url,saves-the-whales,selfip,sells-for-less,sells-for-u,servebbs,simple-url,space-to-rent,teaches-yoga,writesthisblog,ddnsfree,ddnsgeek,giize,gleeze,kozow,loseyourip,ooguy,theworkpc,mytuleap,evennode>eu-1,eu-2,eu-3,eu-4,us-1,us-2,us-3,us-4<onfabrica,fbsbx>apps<fastly-terrarium,fastvps-server,mydobiss,firebaseapp,freebox-os,freeboxos,gentapps,gentlentapis,githubusercontent,0emm>*<appspot>r>*<<codespot,googleapis,googlecode,pagespeedmobilizer,publishproxy,withgoogle,withyoutube,blogspot,awsmppl,herokuapp,herokussl,myravendb,pixolino,clicketcloud,cloudswitches>ams,au,sg<dopaas,elastyco>nv<hidora,hosted-by-previder>paas<hosteur>rag-cloud,rag-cloud-ch<ik-server>jcloud,jcloud-ver-jpc<jelastic>demo<kilatiron,massivegrid>paas<wafaicloud>jed,lon,ryd<joyent>cns>*<<lpusercontent,lmpm>app<linode>members,nodebalancer>*<<linodeobjects>*<barsycenter,barsyonline,miniserver,meteorapp>eu<hostedpi,mythic-beasts>customer,lynx,ocelot,onza,sphinx,vs,x,yali<4u,nfshost,001www,ddnslive,myiphost,blogsyte,ciscofreak,damnserver,ditchyourip,dnsiskinky,dynns,geekgalaxy,health-carereform,homesecuritymac,homesecuritypc,myactivedirectory,mysecuritycamera,net-freaks,onthewifi,point2this,quicksytes,securitytactics,serveexchange,servehumour,servep2p,servesarcasm,stufftoread,unusualperson,workisboring,3utilities,ddnsking,myvnc,servebeer,servecounterstrike,serveftp,servegame,servehalflife,servehttp,serveirc,servemp3,servepics,servequake,observableusercontent>static<operaunite,skygearapp,outsystemscloud,ownprovider,pgfog,pagefrontapp,pagexl,gotpantheon,platter-app,pleskns,prgmr>xen<qualifioapp,qbuser,qa2,dev-myqnapcloud,alpha-myqnapcloud,myqnapcloud,quipelements>*<rackmaze,rhcloud,render>app<onrender,logoip,scrysec,firewall-gateway,myshopblocks,shopitsite,1kapp,appchizi,applinzi,sinaapp,vipsinaapp,bounty-full>alpha,beta<stackhero-network,playstation-cloud,stdlib>api<temp-dns,dsmynas,familyds,thingdustdata,bloxcms,townnews-staging,hk,wafflecell,idnblogger,indowapblog,remotewd,wiardweb>pages<xnbay>u2,u2-local<yolasite,wpenginepowered>js<impertrixcdn,impertrix<net>adobeaemcloud,alwaysdata,cloudfront,t3l3p0rt,myfritz,blackbaudcdn,boomla,bplaced,square7,gb,hu,jp,se,uk,in,clic2000,cloudaccess,cdn77-ssl,cdn77>r<cloudeity,feste-ip,knx-server,static-access,cryptonomic>*<dattolocal,mydatto,debian,bitbridge,at-band-camp,blogdns,broke-it,buyshouses,dnsalias,dnsdojo,does-it,dontexist,dynalias,dynathome,endofinternet,from-az,from-co,from-la,from-ny,gets-it,ham-radio-op,homeftp,homeip,homelinux,homeunix,in-the-band,is-a-chef,is-a-geek,isa-geek,kicks-ass,office-on-the,podzone,scrapper-site,selfip,sells-it,servebbs,serveftp,thruhere,webhop,definima,casacam,dynu,dynv6,twmail,ru,channelsdvr>u<fastlylb>map<fastly>freetls,map,prod>a,global<ssl>a,b,global<<edgeapp,flynnhosting,cdn-edges,cloudfunctions,moonscale,in-dsl,in-vpn,ipifony,iobb,cloudjiffy>fra1-de,west1-us<docktera>jls>ams1<<elastx>jls-sto1,jls-sto2,jls-sto3<massivegrid>paas>fr-1,lon-1,lon-2,ny-1,ny-2,sg-1<<saveincloud>jelastic,nordeste-idc<scaleforce>j<tsukaeru>jelastic<vps-host>jelastic>atl,njs<<kinghost,uni5,barsy,memset,azurewebsites,azure-mobile,cloudapp,dnsup,hicam,now-dns,ownip,vpndns,eating-organic,mydissent,myeffect,mymediapc,mypsx,mysecuritycamera,nhlfan,no-ip,pgafan,privatizehealthinsurance,bounceme,ddns,redirectme,serveblog,serveminecraft,sytes,cloudycluster,bar0,bar1,bar2,rackmaze,schokokeks,firewall-gateway,seidat,senseering,siteleaf,srcf>soc,user<dsmynas,familyds,fastblog,community-pro,meinforum,yandexcloud>storage,website<za<pl>beep,unicloud,krasnik,leczna,lubartow,lublin,poniatowa,swidnik,co,art,gliwice,krakow,poznan,wroc,zakopane,gda,gdansk,gdynia,med,sopot<ca>barsy,awdev>*<co,blogspot,no-ip<estate>compute>*<<network>alces>*<co,arvo,azimuth,tlon<org>altervista,amune>tele<pimienta,poivron,potager,sweetpepper,ae,us,certmgr,cdn77>c,rsc<cdn77-secure>origin>ssl<<cloudns,duckdns,tunk,dyndns>go,home<blogdns,blogsite,boldlygoingnowhere,dnsalias,dnsdojo,doesntexist,dontexist,doomdns,dvrdns,dynalias,endofinternet,endoftheinternet,from-me,game-host,gotdns,hobby-site,homedns,homeftp,homelinux,homeunix,is-a-bruinsfan,is-a-candidate,is-a-celticsfan,is-a-chef,is-a-geek,is-a-knight,is-a-linux-user,is-a-patsfan,is-a-soxfan,is-found,is-lost,is-saved,is-very-bad,is-very-evil,is-very-good,is-very-nice,is-very-sweet,isa-geek,kicks-ass,misconfused,podzone,readmyblog,selfip,sellsyourhome,servebbs,serveftp,servegame,stuff-4-sale,webhop,ddnss,accesscam,camdvr,freeddns,mywire,webredirect,eu>al,asso,at,au,be,bg,ca,cd,ch,cn,cy,cz,de,dk,edu,ee,es,fi,fr,gr,hr,hu,ie,il,in,int,is,it,jp,kr,lt,lu,lv,mc,me,mk,mt,my,net,ng,nl,no,nz,paris,pl,pt,q-a,ro,ru,se,si,sk,tr,uk,us<twmail,fedorainfracloud,fedorapeople,fedoraproject>cloud,os>app<stg>os>app<<<freedesktop,hepforge,in-dsl,in-vpn,js,uklugs,barsy,mayfirst,mozilla-iot,bmoattachments,dynserv,now-dns,cable-modem,collegefan,couchpotatofries,mlbfan,mysecuritycamera,nflfan,read-books,ufcfan,hopto,myftp,no-ip,zapto,pubtls,my-firewall,myfirewall,spdns,small-web,dsmynas,familyds,edugit,tuxfamily,diskstation,hk,wmflabs,toolforge,wmcloud,za<cn>com>amazonaws>compute>*<eb>cn-north-1,cn-northwest-1<elb>*<cn-north-1>s3<<<instantcloud<nl>amsw,virtueeldomein,co,hosting-cluster,blogspot,khplay,transurl>*<cistron,demon<io>apigee,b-data,backplaneapp,banzaicloud>app,backyards>*<<boxfuse,browsersafetymark,bigv>uk0<cleverapps,dappnode>dyndns<dedyn,drud,definima,enonic>customer<shw,github,gitlab,lolipop,hasura-app,hostyhosting,moonscale>*<jele,opusinteractive>ocs<unispace>cloud,cloud-de,cloud-fr1<loginline,barsy,azurecontainer>*<ngrok,nodeart>stage<nodum,nid,pantheonsite,dyn53,protonet,qcx>sys>*<<vaporcloud,vbrplsbx>g<on-k3s>*<on-rio>*<readthedocs,resindevice,resinstaging>devices<hzc,sandcats,shiftedit,mo-siemens,lair>apps<stolos>*<spacekit,utwente,applicationcloud,scapp,s5y>*<telebit,thingdust>dev>cust<disrec>cust<prod>cust<testing>cust<<2038,wedeploy,basicserver,virtualserver<jp>ne>aseinet>user<gehirn<usercontent,blogspot<vc>gv>d<0e,nom<eus>party>user<<ws>advisor>*<cloud66,dyndns,mypets<cloud>banzai>*<statics>*<axarnet>es-1<diadem,jelastic>vip<jele,jenv-aruba>aruba>eur>it1<<it1<jenv-arubabiz>it1-eur<primetel>uk<reclaim>ca,uk,us<trendhosting>ch,de<linkyard,magentosite>*<perspecta,vapor,on-rancher>*<sensiosite>*<trafficplex,urown,voorloper<la>bnr,c,nym<ch>square7,blogspot,flow>ae>alp1<appengine<linkyard-cloud,dnsking,gotdns,firenet>*,svc>*<<12hp,2ix,4lima,lima-city<de>bplaced,square7,com,cosidns>dyn<dynamisches-dns,dnsupdater,internet-dns,l-o-g-i-n,dnshome,fuettertdasnetz,isteingeek,istmein,lebtimnetz,leitungsen,traeumtgerade,ddnss>dyn,dyndns<dyndns1,dyn-ip24,home-webserver>dyn<myhome-server,goip,blogspot,dyn-berlin,in-berlin,in-brb,in-butter,in-dsl,in-vpn,mein-iserv,schulserver,test-iserv,keymachine,git-repos,lcube-server,svn-repos,barsy,logoip,firewall-gateway,my-gateway,my-router,spdns,speedpartner>customer<taifun-dns,12hp,2ix,4lima,lima-city,dd-dns,dray-dns,draydns,dyn-vpn,dynvpn,mein-vigor,my-vigor,my-wan,syno-ds,synology-diskstation,synology-ds,uberspace>*<virtualuser,virtual-user,community-pro,diskussionsbereich<uk>co>bytemark>dh,vm<blogspot,layershift>j<barsy,barsyonline,retrosnub>cust<nh-serv,no-ip,wellbeingzone,gwiddle<conn,copro,gov>service,homeoffice<pymnt,org>glug,lug,lugs<barsy<eu>mycd,cloudns,dogado>jelastic<leviracloud>paas<barsy,wellbeingzone,spdns,transurl>*<diskstation<co>carrd,crd,otap>*<com>blogspot<leadpages,lpages,mypi,n4t,nodum,repl<ai>uwu,nom<se>com,blogspot,conf,iopsys<bz>za,nom,nym,gsj<in>web,cloudns,blogspot,barsy<basketball>aus,nz<am>radio,blogspot,neko,nyaa<fm>radio<ro>co,shop,blogspot,nym<group>discourse<team>discourse,jelastic<dev>lcl>*<stg>*<pages,workers,curv,fly,gateway>*<iserv,loginline,platter-app,vercel,webhare>*<<me>c66,daplie>localhost<edgestack,couk,ukco,filegear,filegear-au,filegear-de,filegear-gb,filegear-ie,filegear-jp,filegear-sg,glitch,ravendb,barsy,mcpe,nctu,soundcast,tcp4,brasilia,ddns,dnsfor,hopto,loginto,noip,webhop,nym,diskstation,dscloud,i234,myds,synology,wbq,wedeploy,yombo,nohost<zone>cloud66,hs,triton>*<lima<host>cloudaccess,freesite,fastvps,myfast,jele,mircloud,pcloud,half<site>cloudera,cyon,fnwk,folionetwork,fastvps,jele,lelux,loginline,barsy,omniwe,opensocial,platformsh>*<byen,mintere<app>wnext,platform0,run>a<web,hasura,loginline,netlify,telebit,vercel<cz>co,realm,e4,blogspot,metacentrum>cloud>*<custom<muni>cloud>flt,usr<<<asia>cloudns<biz>cloudns,jozi,dyndns,for-better,for-more,for-some,for-the,selfip,webhop,bpl,orx,mmafan,myftp,no-ip,dscloud<club>cloudns,jele,barsy,pony<cc>cloudns,ftpaccess,game-server,myphotos,scrapping,twmail,csx,fantasyleague<info>cloudns,dynamic-dns,dyndns,barrel-of-knowledge,barrell-of-knowledge,for-our,groks-the,groks-this,here-for-more,knowsitall,selfip,webhop,barsy,mayfirst,forumz,nsupdate,dvrcam,ilovecollege,no-ip,dnsupdate,v-info<pro>cloudns,dnstrace>bci<barsy<pw>cloudns,x443,nom<us>cloudns,drud,is-by,land-4-sale,stuff-4-sale,graphox,enscaled>phx<mircloud,freeddns,golffan,noip,pointto,platterp,de>lib<<gdn>cnpy<no>co,blogspot<be>webhosting,blogspot,interhostsolutions>cloud<transurl>*<<ru>ac,edu,gov,int,mil,test,adygeya,bashkiria,bir,cbg,com,dagestan,grozny,kalmykia,kustanai,marine,mordovia,msk,mytis,nalchik,nov,pyatigorsk,spb,vladikavkaz,vladimir,blogspot,na4u,mircloud,regruhosting>jelastic<myjino>hosting>*<landing>*<spectrum>*<vps>*<<cldmail>hb<mcdir>vps<net,org,pp,ras<is>cupcake,blogspot<link>cyon,mypep,dweb>*<<dk>biz,co,firm,reg,store,blogspot<earth>dapps>*,bzz>*<<<th>online,shop<sh>bip,hashbang,platform>bc,ent,eu,us<now,vxl,wedeploy<fi>dy,blogspot,xn--hkkinen-5wa,iki,cloudplatform>fi<datacenter>demo,paas<<tv>dyndns,better-than,on-the-web,worse-than<cx>ath,info<name>her>forgot<his>forgot<<nu>merseine,mine,shacknet,nom,uwu,enterprisecloud<rocks>myddns,lima-city,webspace<xyz>blogsite,fhapp,localzone,crafting,zapto,telebit>*<<fr>en-root,fbx-os,fbxos,freebox-os,freeboxos,blogspot,on-web,chirurgiens-dentistes-en-france<one>onred>staging<service,for,homelink<tw>com>mymailer<url,blogspot,nym<su>abkhazia,adygeya,aktyubinsk,arkhangelsk,armenia,ashgabad,azerbaijan,balashov,bashkiria,bryansk,bukhara,chimkent,dagestan,east-kazakhstan,exnet,georgia,grozny,ivanovo,jambyl,kalmykia,kaluga,karacol,karaganda,karelia,khakassia,krasnodar,kurgan,kustanai,lenug,mangyshlak,mordovia,msk,murmansk,nalchik,navoi,north-kazakhstan,nov,obninsk,penza,pokrovsk,sochi,spb,tashkent,termez,togliatti,troitsk,tselinograd,tula,tuva,vladikavkaz,vladimir,vologda,nym<space>myfast,linkitools,uber,xs4all<at>funkfeuer>wien<futurecms>*,ex>*<in>*<<futurehosting,futuremailing,ortsinfo>ex>*<kunden>*<<co>blogspot<biz,info,priv,12hp,2ix,4lima,lima-city<ms>lab<si>gitapp,gitpage,blogspot,nom<digital>cloudapps>london<<im>ro,nom<goog>cloud,translate<ae>blogspot,nom<al>blogspot,nom<ba>blogspot<bg>blogspot,barsy<bj>blogspot<cf>blogspot<cl>blogspot,nom<id>co>blogspot<forte,bloghp,wblog<il>co>blogspot<<ke>co>blogspot<nom<nz>co>blogspot<nym<za>co>blogspot<<ar>com>blogspot<<au>com>blogspot,cloudlets>mel<<<br>com>blogspot,virtualcloud>scale>users<<<leg>ac,al,am,ap,ba,ce,df,es,go,ma,mg,ms,mt,pa,pb,pe,pi,pr,rj,rn,ro,rr,rs,sc,se,sp,to<<by>com>blogspot<mycloud,nym<cy>com>blogspot,scaleforce>j<<<ee>com>blogspot<<eg>com>blogspot<<es>com>blogspot<<mt>com>blogspot<<ng>com>blogspot<col,firm,gen,ltd,ngo<tr>com>blogspot<<uy>com>blogspot<nom<cv>blogspot<gr>blogspot,nym<hk>blogspot,nym,ltd,inc<hr>blogspot,free<hu>blogspot<ie>blogspot,nym<it>blogspot,neen>jc<tim>open>jelastic>cloud<<<16-b,32-b,64-b,syncloud<kr>blogspot<li>blogspot,caa,nom,nym<lt>blogspot,nym<lu>blogspot,nym<md>blogspot,at,de,jp,to<mk>blogspot,nom<mr>blogspot<mx>blogspot,net>serv>jl<<nym<my>blogspot<pe>blogspot,nym<pt>blogspot,nym<qa>blogspot,nom<re>blogspot<rs>blogspot,ua,nom,ox<sg>blogspot,enscaled<sk>blogspot,nym<sn>blogspot<td>blogspot<ug>blogspot,nom<vn>blogspot<ci>fin,nl<run>hs,development,ravendb,repl<community>ravendb,myforum<city>ng<gl>biz,nom,xx<ink>ng<school>ng<so>sch<kz>jcloud,kazteleport>upaas<nym<gg>kaas,cya,panel>daemon<<systems>knightpoint<krd>co,edu<business>co<education>co<events>co<financial>co<place>co<technology>co<bs>we<services>loginline<menu>barsy<mobi>barsy,dscloud<online>barsy<pub>barsy<shop>barsy<support>barsy<casa>nabu>ui<<fashion>of,on<football>of<london>in,of<men>for<mom>and,for<sale>for<work>of,to<top>now-dns,ntdll<ovh>nerdpol<mn>nyc,nym<af>nom<ec>nym<gd>nom<ge>nom<gt>nom,blog,de,to<gy>nym,be<hn>nom,cc<lc>nym,oy<lv>nom<st>nom,noho<sx>nym<tj>nom<vg>nom,at<lol>omg<hosting>opencraft<pm>own<codes>owo>*<<page>pdns,plesk,prvcy<bn>co<fit>ptplus<edu>rit>git-pages<<scot>gov<store>shopware<land>static>dev,sites<<farm>storj<cool>de<pictures>1337<rip>clan<management>router<ax>be,cat,es,eu,gg,mc,us,xy<gp>app<kg>blog,io,jp,tv,uk,us<ls>de<porn>indie<tc>ch,me,we<vu>blog,dev,me,cn<academy>official<faith>ybo<party>ybo<review>ybo<science>ybo<trade>ybo<design>bss"

/***/ }),

/***/ 90:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__characters__ = __webpack_require__(49);

const lookUpTldsInTrie = (labels, trie) => {
  const labelsToCheck = labels.slice();
  const tlds = [];
  let node = trie;

  while (labelsToCheck.length !== 0) {
    const label = labelsToCheck.pop();
    const labelLowerCase = label.toLowerCase();

    if (node.children.has(__WEBPACK_IMPORTED_MODULE_0__characters__["f" /* WILDCARD */])) {
      if (node.children.has(__WEBPACK_IMPORTED_MODULE_0__characters__["b" /* EXCEPTION */] + labelLowerCase)) {
        break;
      }

      node = node.children.get(__WEBPACK_IMPORTED_MODULE_0__characters__["f" /* WILDCARD */]);
    } else {
      if (node.children.has(labelLowerCase) === false) {
        break;
      }

      node = node.children.get(labelLowerCase);
    }

    tlds.unshift(label);
  }

  return tlds;
};
/* harmony export (immutable) */ __webpack_exports__["a"] = lookUpTldsInTrie;


/***/ }),

/***/ 91:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const ipRegex = __webpack_require__(92);

const isIp = string => ipRegex({
  exact: true
}).test(string);

isIp.v4 = string => ipRegex.v4({
  exact: true
}).test(string);

isIp.v6 = string => ipRegex.v6({
  exact: true
}).test(string);

isIp.version = string => isIp(string) ? isIp.v4(string) ? 4 : 6 : undefined;

module.exports = isIp;

/***/ }),

/***/ 92:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const word = '[a-fA-F\\d:]';

const b = options => options && options.includeBoundaries ? `(?:(?<=\\s|^)(?=${word})|(?<=${word})(?=\\s|$))` : '';

const v4 = '(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}';
const v6seg = '[a-fA-F\\d]{1,4}';
const v6 = `
(
(?:${v6seg}:){7}(?:${v6seg}|:)|                                // 1:2:3:4:5:6:7::  1:2:3:4:5:6:7:8
(?:${v6seg}:){6}(?:${v4}|:${v6seg}|:)|                         // 1:2:3:4:5:6::    1:2:3:4:5:6::8   1:2:3:4:5:6::8  1:2:3:4:5:6::1.2.3.4
(?:${v6seg}:){5}(?::${v4}|(:${v6seg}){1,2}|:)|                 // 1:2:3:4:5::      1:2:3:4:5::7:8   1:2:3:4:5::8    1:2:3:4:5::7:1.2.3.4
(?:${v6seg}:){4}(?:(:${v6seg}){0,1}:${v4}|(:${v6seg}){1,3}|:)| // 1:2:3:4::        1:2:3:4::6:7:8   1:2:3:4::8      1:2:3:4::6:7:1.2.3.4
(?:${v6seg}:){3}(?:(:${v6seg}){0,2}:${v4}|(:${v6seg}){1,4}|:)| // 1:2:3::          1:2:3::5:6:7:8   1:2:3::8        1:2:3::5:6:7:1.2.3.4
(?:${v6seg}:){2}(?:(:${v6seg}){0,3}:${v4}|(:${v6seg}){1,5}|:)| // 1:2::            1:2::4:5:6:7:8   1:2::8          1:2::4:5:6:7:1.2.3.4
(?:${v6seg}:){1}(?:(:${v6seg}){0,4}:${v4}|(:${v6seg}){1,6}|:)| // 1::              1::3:4:5:6:7:8   1::8            1::3:4:5:6:7:1.2.3.4
(?::((?::${v6seg}){0,5}:${v4}|(?::${v6seg}){1,7}|:))           // ::2:3:4:5:6:7:8  ::2:3:4:5:6:7:8  ::8             ::1.2.3.4
)(%[0-9a-zA-Z]{1,})?                                           // %eth0            %1
`.replace(/\s*\/\/.*$/gm, '').replace(/\n/g, '').trim(); // Pre-compile only the exact regexes because adding a global flag make regexes stateful

const v46Exact = new RegExp(`(?:^${v4}$)|(?:^${v6}$)`);
const v4exact = new RegExp(`^${v4}$`);
const v6exact = new RegExp(`^${v6}$`);

const ip = options => options && options.exact ? v46Exact : new RegExp(`(?:${b(options)}${v4}${b(options)})|(?:${b(options)}${v6}${b(options)})`, 'g');

ip.v4 = options => options && options.exact ? v4exact : new RegExp(`${b(options)}${v4}${b(options)}`, 'g');

ip.v6 = options => options && options.exact ? v6exact : new RegExp(`${b(options)}${v6}${b(options)}`, 'g');

module.exports = ip;

/***/ }),

/***/ 93:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__characters__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__nodes__ = __webpack_require__(94);


const parseTrie = serializedTrie => {
  const rootNode = Object(__WEBPACK_IMPORTED_MODULE_1__nodes__["c" /* createRootNode */])();
  let domain = "";
  let parentNode = rootNode; // Type assertion necessary here due to a TypeScript unsoundness
  // https://github.com/microsoft/TypeScript/issues/9998#issuecomment-235963457

  let node = rootNode;

  const addDomain = () => {
    node = Object(__WEBPACK_IMPORTED_MODULE_1__nodes__["b" /* createOrGetChild */])(parentNode, domain);
    domain = "";
  };

  for (let i = 0; i < serializedTrie.length; i++) {
    const char = serializedTrie.charAt(i);

    switch (char) {
      case __WEBPACK_IMPORTED_MODULE_0__characters__["d" /* SAME */]:
        {
          addDomain();
          continue;
        }

      case __WEBPACK_IMPORTED_MODULE_0__characters__["a" /* DOWN */]:
        {
          addDomain();
          parentNode = node;
          continue;
        }

      case __WEBPACK_IMPORTED_MODULE_0__characters__["c" /* RESET */]:
        {
          addDomain();
          parentNode = rootNode;
          continue;
        }

      case __WEBPACK_IMPORTED_MODULE_0__characters__["e" /* UP */]:
        {
          if (parentNode.type === __WEBPACK_IMPORTED_MODULE_1__nodes__["a" /* NODE_TYPE_ROOT */]) {
            throw new Error(`Error in serialized trie at position ${i}: Cannot go up, current parent node is already root`);
          }

          addDomain();
          parentNode = parentNode.parent;
          continue;
        }
    }

    domain += char;
  }

  if (domain !== "") {
    addDomain();
  }

  return rootNode;
};
/* harmony export (immutable) */ __webpack_exports__["a"] = parseTrie;


/***/ }),

/***/ 94:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const NODE_TYPE_ROOT = Symbol("ROOT");
/* harmony export (immutable) */ __webpack_exports__["a"] = NODE_TYPE_ROOT;

const NODE_TYPE_CHILD = Symbol("CHILD");
/* unused harmony export NODE_TYPE_CHILD */

const createRootNode = () => {
  return {
    type: NODE_TYPE_ROOT,
    children: new Map()
  };
};
/* harmony export (immutable) */ __webpack_exports__["c"] = createRootNode;

const createOrGetChild = (parent, label) => {
  let child = parent.children.get(label);

  if (child === undefined) {
    child = {
      type: NODE_TYPE_CHILD,
      label,
      children: new Map(),
      parent
    };
    parent.children.set(label, child);
  }

  return child;
};
/* harmony export (immutable) */ __webpack_exports__["b"] = createOrGetChild;


/***/ }),

/***/ 95:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const urlPattern = /^[a-z]+:\/\//i;
const NO_HOSTNAME = Symbol("NO_HOSTNAME");
/* unused harmony export NO_HOSTNAME */

const fromUrl = urlLike => {
  /* istanbul ignore next */
  if (typeof URL !== "function") {
    throw new Error("Looks like the new URL() constructor is not globally available in your environment. Please make sure to use a polyfill.");
  } // Extra check for non-TypeScript users


  if (typeof urlLike !== "string") {
    return NO_HOSTNAME;
  } // URLs that start with // are protocol relative


  const url = urlLike.startsWith("//") ? `http:${urlLike}` : // URLs that start with / do not have a hostname section
  urlLike.startsWith("/") ? urlLike : urlPattern.test(urlLike) ? urlLike : `http://${urlLike}`;

  try {
    return new URL(url).hostname;
  } catch (_a) {
    return NO_HOSTNAME;
  }
};
/* harmony export (immutable) */ __webpack_exports__["a"] = fromUrl;


/***/ }),

/***/ 96:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module, global) {var __WEBPACK_AMD_DEFINE_RESULT__;/*! https://mths.be/he v1.2.0 by @mathias | MIT license */
;

(function (root) {
  // Detect free variables `exports`.
  var freeExports = typeof exports == 'object' && exports; // Detect free variable `module`.

  var freeModule = typeof module == 'object' && module && module.exports == freeExports && module; // Detect free variable `global`, from Node.js or Browserified code,
  // and use it as `root`.

  var freeGlobal = typeof global == 'object' && global;

  if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
    root = freeGlobal;
  }
  /*--------------------------------------------------------------------------*/
  // All astral symbols.


  var regexAstralSymbols = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g; // All ASCII symbols (not just printable ASCII) except those listed in the
  // first column of the overrides table.
  // https://html.spec.whatwg.org/multipage/syntax.html#table-charref-overrides

  var regexAsciiWhitelist = /[\x01-\x7F]/g; // All BMP symbols that are not ASCII newlines, printable ASCII symbols, or
  // code points listed in the first column of the overrides table on
  // https://html.spec.whatwg.org/multipage/syntax.html#table-charref-overrides.

  var regexBmpWhitelist = /[\x01-\t\x0B\f\x0E-\x1F\x7F\x81\x8D\x8F\x90\x9D\xA0-\uFFFF]/g;
  var regexEncodeNonAscii = /<\u20D2|=\u20E5|>\u20D2|\u205F\u200A|\u219D\u0338|\u2202\u0338|\u2220\u20D2|\u2229\uFE00|\u222A\uFE00|\u223C\u20D2|\u223D\u0331|\u223E\u0333|\u2242\u0338|\u224B\u0338|\u224D\u20D2|\u224E\u0338|\u224F\u0338|\u2250\u0338|\u2261\u20E5|\u2264\u20D2|\u2265\u20D2|\u2266\u0338|\u2267\u0338|\u2268\uFE00|\u2269\uFE00|\u226A\u0338|\u226A\u20D2|\u226B\u0338|\u226B\u20D2|\u227F\u0338|\u2282\u20D2|\u2283\u20D2|\u228A\uFE00|\u228B\uFE00|\u228F\u0338|\u2290\u0338|\u2293\uFE00|\u2294\uFE00|\u22B4\u20D2|\u22B5\u20D2|\u22D8\u0338|\u22D9\u0338|\u22DA\uFE00|\u22DB\uFE00|\u22F5\u0338|\u22F9\u0338|\u2933\u0338|\u29CF\u0338|\u29D0\u0338|\u2A6D\u0338|\u2A70\u0338|\u2A7D\u0338|\u2A7E\u0338|\u2AA1\u0338|\u2AA2\u0338|\u2AAC\uFE00|\u2AAD\uFE00|\u2AAF\u0338|\u2AB0\u0338|\u2AC5\u0338|\u2AC6\u0338|\u2ACB\uFE00|\u2ACC\uFE00|\u2AFD\u20E5|[\xA0-\u0113\u0116-\u0122\u0124-\u012B\u012E-\u014D\u0150-\u017E\u0192\u01B5\u01F5\u0237\u02C6\u02C7\u02D8-\u02DD\u0311\u0391-\u03A1\u03A3-\u03A9\u03B1-\u03C9\u03D1\u03D2\u03D5\u03D6\u03DC\u03DD\u03F0\u03F1\u03F5\u03F6\u0401-\u040C\u040E-\u044F\u0451-\u045C\u045E\u045F\u2002-\u2005\u2007-\u2010\u2013-\u2016\u2018-\u201A\u201C-\u201E\u2020-\u2022\u2025\u2026\u2030-\u2035\u2039\u203A\u203E\u2041\u2043\u2044\u204F\u2057\u205F-\u2063\u20AC\u20DB\u20DC\u2102\u2105\u210A-\u2113\u2115-\u211E\u2122\u2124\u2127-\u2129\u212C\u212D\u212F-\u2131\u2133-\u2138\u2145-\u2148\u2153-\u215E\u2190-\u219B\u219D-\u21A7\u21A9-\u21AE\u21B0-\u21B3\u21B5-\u21B7\u21BA-\u21DB\u21DD\u21E4\u21E5\u21F5\u21FD-\u2205\u2207-\u2209\u220B\u220C\u220F-\u2214\u2216-\u2218\u221A\u221D-\u2238\u223A-\u2257\u2259\u225A\u225C\u225F-\u2262\u2264-\u228B\u228D-\u229B\u229D-\u22A5\u22A7-\u22B0\u22B2-\u22BB\u22BD-\u22DB\u22DE-\u22E3\u22E6-\u22F7\u22F9-\u22FE\u2305\u2306\u2308-\u2310\u2312\u2313\u2315\u2316\u231C-\u231F\u2322\u2323\u232D\u232E\u2336\u233D\u233F\u237C\u23B0\u23B1\u23B4-\u23B6\u23DC-\u23DF\u23E2\u23E7\u2423\u24C8\u2500\u2502\u250C\u2510\u2514\u2518\u251C\u2524\u252C\u2534\u253C\u2550-\u256C\u2580\u2584\u2588\u2591-\u2593\u25A1\u25AA\u25AB\u25AD\u25AE\u25B1\u25B3-\u25B5\u25B8\u25B9\u25BD-\u25BF\u25C2\u25C3\u25CA\u25CB\u25EC\u25EF\u25F8-\u25FC\u2605\u2606\u260E\u2640\u2642\u2660\u2663\u2665\u2666\u266A\u266D-\u266F\u2713\u2717\u2720\u2736\u2758\u2772\u2773\u27C8\u27C9\u27E6-\u27ED\u27F5-\u27FA\u27FC\u27FF\u2902-\u2905\u290C-\u2913\u2916\u2919-\u2920\u2923-\u292A\u2933\u2935-\u2939\u293C\u293D\u2945\u2948-\u294B\u294E-\u2976\u2978\u2979\u297B-\u297F\u2985\u2986\u298B-\u2996\u299A\u299C\u299D\u29A4-\u29B7\u29B9\u29BB\u29BC\u29BE-\u29C5\u29C9\u29CD-\u29D0\u29DC-\u29DE\u29E3-\u29E5\u29EB\u29F4\u29F6\u2A00-\u2A02\u2A04\u2A06\u2A0C\u2A0D\u2A10-\u2A17\u2A22-\u2A27\u2A29\u2A2A\u2A2D-\u2A31\u2A33-\u2A3C\u2A3F\u2A40\u2A42-\u2A4D\u2A50\u2A53-\u2A58\u2A5A-\u2A5D\u2A5F\u2A66\u2A6A\u2A6D-\u2A75\u2A77-\u2A9A\u2A9D-\u2AA2\u2AA4-\u2AB0\u2AB3-\u2AC8\u2ACB\u2ACC\u2ACF-\u2ADB\u2AE4\u2AE6-\u2AE9\u2AEB-\u2AF3\u2AFD\uFB00-\uFB04]|\uD835[\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDCCF\uDD04\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDD6B]/g;
  var encodeMap = {
    '\xAD': 'shy',
    '\u200C': 'zwnj',
    '\u200D': 'zwj',
    '\u200E': 'lrm',
    '\u2063': 'ic',
    '\u2062': 'it',
    '\u2061': 'af',
    '\u200F': 'rlm',
    '\u200B': 'ZeroWidthSpace',
    '\u2060': 'NoBreak',
    '\u0311': 'DownBreve',
    '\u20DB': 'tdot',
    '\u20DC': 'DotDot',
    '\t': 'Tab',
    '\n': 'NewLine',
    '\u2008': 'puncsp',
    '\u205F': 'MediumSpace',
    '\u2009': 'thinsp',
    '\u200A': 'hairsp',
    '\u2004': 'emsp13',
    '\u2002': 'ensp',
    '\u2005': 'emsp14',
    '\u2003': 'emsp',
    '\u2007': 'numsp',
    '\xA0': 'nbsp',
    '\u205F\u200A': 'ThickSpace',
    '\u203E': 'oline',
    '_': 'lowbar',
    '\u2010': 'dash',
    '\u2013': 'ndash',
    '\u2014': 'mdash',
    '\u2015': 'horbar',
    ',': 'comma',
    ';': 'semi',
    '\u204F': 'bsemi',
    ':': 'colon',
    '\u2A74': 'Colone',
    '!': 'excl',
    '\xA1': 'iexcl',
    '?': 'quest',
    '\xBF': 'iquest',
    '.': 'period',
    '\u2025': 'nldr',
    '\u2026': 'mldr',
    '\xB7': 'middot',
    '\'': 'apos',
    '\u2018': 'lsquo',
    '\u2019': 'rsquo',
    '\u201A': 'sbquo',
    '\u2039': 'lsaquo',
    '\u203A': 'rsaquo',
    '"': 'quot',
    '\u201C': 'ldquo',
    '\u201D': 'rdquo',
    '\u201E': 'bdquo',
    '\xAB': 'laquo',
    '\xBB': 'raquo',
    '(': 'lpar',
    ')': 'rpar',
    '[': 'lsqb',
    ']': 'rsqb',
    '{': 'lcub',
    '}': 'rcub',
    '\u2308': 'lceil',
    '\u2309': 'rceil',
    '\u230A': 'lfloor',
    '\u230B': 'rfloor',
    '\u2985': 'lopar',
    '\u2986': 'ropar',
    '\u298B': 'lbrke',
    '\u298C': 'rbrke',
    '\u298D': 'lbrkslu',
    '\u298E': 'rbrksld',
    '\u298F': 'lbrksld',
    '\u2990': 'rbrkslu',
    '\u2991': 'langd',
    '\u2992': 'rangd',
    '\u2993': 'lparlt',
    '\u2994': 'rpargt',
    '\u2995': 'gtlPar',
    '\u2996': 'ltrPar',
    '\u27E6': 'lobrk',
    '\u27E7': 'robrk',
    '\u27E8': 'lang',
    '\u27E9': 'rang',
    '\u27EA': 'Lang',
    '\u27EB': 'Rang',
    '\u27EC': 'loang',
    '\u27ED': 'roang',
    '\u2772': 'lbbrk',
    '\u2773': 'rbbrk',
    '\u2016': 'Vert',
    '\xA7': 'sect',
    '\xB6': 'para',
    '@': 'commat',
    '*': 'ast',
    '/': 'sol',
    'undefined': null,
    '&': 'amp',
    '#': 'num',
    '%': 'percnt',
    '\u2030': 'permil',
    '\u2031': 'pertenk',
    '\u2020': 'dagger',
    '\u2021': 'Dagger',
    '\u2022': 'bull',
    '\u2043': 'hybull',
    '\u2032': 'prime',
    '\u2033': 'Prime',
    '\u2034': 'tprime',
    '\u2057': 'qprime',
    '\u2035': 'bprime',
    '\u2041': 'caret',
    '`': 'grave',
    '\xB4': 'acute',
    '\u02DC': 'tilde',
    '^': 'Hat',
    '\xAF': 'macr',
    '\u02D8': 'breve',
    '\u02D9': 'dot',
    '\xA8': 'die',
    '\u02DA': 'ring',
    '\u02DD': 'dblac',
    '\xB8': 'cedil',
    '\u02DB': 'ogon',
    '\u02C6': 'circ',
    '\u02C7': 'caron',
    '\xB0': 'deg',
    '\xA9': 'copy',
    '\xAE': 'reg',
    '\u2117': 'copysr',
    '\u2118': 'wp',
    '\u211E': 'rx',
    '\u2127': 'mho',
    '\u2129': 'iiota',
    '\u2190': 'larr',
    '\u219A': 'nlarr',
    '\u2192': 'rarr',
    '\u219B': 'nrarr',
    '\u2191': 'uarr',
    '\u2193': 'darr',
    '\u2194': 'harr',
    '\u21AE': 'nharr',
    '\u2195': 'varr',
    '\u2196': 'nwarr',
    '\u2197': 'nearr',
    '\u2198': 'searr',
    '\u2199': 'swarr',
    '\u219D': 'rarrw',
    '\u219D\u0338': 'nrarrw',
    '\u219E': 'Larr',
    '\u219F': 'Uarr',
    '\u21A0': 'Rarr',
    '\u21A1': 'Darr',
    '\u21A2': 'larrtl',
    '\u21A3': 'rarrtl',
    '\u21A4': 'mapstoleft',
    '\u21A5': 'mapstoup',
    '\u21A6': 'map',
    '\u21A7': 'mapstodown',
    '\u21A9': 'larrhk',
    '\u21AA': 'rarrhk',
    '\u21AB': 'larrlp',
    '\u21AC': 'rarrlp',
    '\u21AD': 'harrw',
    '\u21B0': 'lsh',
    '\u21B1': 'rsh',
    '\u21B2': 'ldsh',
    '\u21B3': 'rdsh',
    '\u21B5': 'crarr',
    '\u21B6': 'cularr',
    '\u21B7': 'curarr',
    '\u21BA': 'olarr',
    '\u21BB': 'orarr',
    '\u21BC': 'lharu',
    '\u21BD': 'lhard',
    '\u21BE': 'uharr',
    '\u21BF': 'uharl',
    '\u21C0': 'rharu',
    '\u21C1': 'rhard',
    '\u21C2': 'dharr',
    '\u21C3': 'dharl',
    '\u21C4': 'rlarr',
    '\u21C5': 'udarr',
    '\u21C6': 'lrarr',
    '\u21C7': 'llarr',
    '\u21C8': 'uuarr',
    '\u21C9': 'rrarr',
    '\u21CA': 'ddarr',
    '\u21CB': 'lrhar',
    '\u21CC': 'rlhar',
    '\u21D0': 'lArr',
    '\u21CD': 'nlArr',
    '\u21D1': 'uArr',
    '\u21D2': 'rArr',
    '\u21CF': 'nrArr',
    '\u21D3': 'dArr',
    '\u21D4': 'iff',
    '\u21CE': 'nhArr',
    '\u21D5': 'vArr',
    '\u21D6': 'nwArr',
    '\u21D7': 'neArr',
    '\u21D8': 'seArr',
    '\u21D9': 'swArr',
    '\u21DA': 'lAarr',
    '\u21DB': 'rAarr',
    '\u21DD': 'zigrarr',
    '\u21E4': 'larrb',
    '\u21E5': 'rarrb',
    '\u21F5': 'duarr',
    '\u21FD': 'loarr',
    '\u21FE': 'roarr',
    '\u21FF': 'hoarr',
    '\u2200': 'forall',
    '\u2201': 'comp',
    '\u2202': 'part',
    '\u2202\u0338': 'npart',
    '\u2203': 'exist',
    '\u2204': 'nexist',
    '\u2205': 'empty',
    '\u2207': 'Del',
    '\u2208': 'in',
    '\u2209': 'notin',
    '\u220B': 'ni',
    '\u220C': 'notni',
    '\u03F6': 'bepsi',
    '\u220F': 'prod',
    '\u2210': 'coprod',
    '\u2211': 'sum',
    '+': 'plus',
    '\xB1': 'pm',
    '\xF7': 'div',
    '\xD7': 'times',
    '<': 'lt',
    '\u226E': 'nlt',
    '<\u20D2': 'nvlt',
    '=': 'equals',
    '\u2260': 'ne',
    '=\u20E5': 'bne',
    '\u2A75': 'Equal',
    '>': 'gt',
    '\u226F': 'ngt',
    '>\u20D2': 'nvgt',
    '\xAC': 'not',
    '|': 'vert',
    '\xA6': 'brvbar',
    '\u2212': 'minus',
    '\u2213': 'mp',
    '\u2214': 'plusdo',
    '\u2044': 'frasl',
    '\u2216': 'setmn',
    '\u2217': 'lowast',
    '\u2218': 'compfn',
    '\u221A': 'Sqrt',
    '\u221D': 'prop',
    '\u221E': 'infin',
    '\u221F': 'angrt',
    '\u2220': 'ang',
    '\u2220\u20D2': 'nang',
    '\u2221': 'angmsd',
    '\u2222': 'angsph',
    '\u2223': 'mid',
    '\u2224': 'nmid',
    '\u2225': 'par',
    '\u2226': 'npar',
    '\u2227': 'and',
    '\u2228': 'or',
    '\u2229': 'cap',
    '\u2229\uFE00': 'caps',
    '\u222A': 'cup',
    '\u222A\uFE00': 'cups',
    '\u222B': 'int',
    '\u222C': 'Int',
    '\u222D': 'tint',
    '\u2A0C': 'qint',
    '\u222E': 'oint',
    '\u222F': 'Conint',
    '\u2230': 'Cconint',
    '\u2231': 'cwint',
    '\u2232': 'cwconint',
    '\u2233': 'awconint',
    '\u2234': 'there4',
    '\u2235': 'becaus',
    '\u2236': 'ratio',
    '\u2237': 'Colon',
    '\u2238': 'minusd',
    '\u223A': 'mDDot',
    '\u223B': 'homtht',
    '\u223C': 'sim',
    '\u2241': 'nsim',
    '\u223C\u20D2': 'nvsim',
    '\u223D': 'bsim',
    '\u223D\u0331': 'race',
    '\u223E': 'ac',
    '\u223E\u0333': 'acE',
    '\u223F': 'acd',
    '\u2240': 'wr',
    '\u2242': 'esim',
    '\u2242\u0338': 'nesim',
    '\u2243': 'sime',
    '\u2244': 'nsime',
    '\u2245': 'cong',
    '\u2247': 'ncong',
    '\u2246': 'simne',
    '\u2248': 'ap',
    '\u2249': 'nap',
    '\u224A': 'ape',
    '\u224B': 'apid',
    '\u224B\u0338': 'napid',
    '\u224C': 'bcong',
    '\u224D': 'CupCap',
    '\u226D': 'NotCupCap',
    '\u224D\u20D2': 'nvap',
    '\u224E': 'bump',
    '\u224E\u0338': 'nbump',
    '\u224F': 'bumpe',
    '\u224F\u0338': 'nbumpe',
    '\u2250': 'doteq',
    '\u2250\u0338': 'nedot',
    '\u2251': 'eDot',
    '\u2252': 'efDot',
    '\u2253': 'erDot',
    '\u2254': 'colone',
    '\u2255': 'ecolon',
    '\u2256': 'ecir',
    '\u2257': 'cire',
    '\u2259': 'wedgeq',
    '\u225A': 'veeeq',
    '\u225C': 'trie',
    '\u225F': 'equest',
    '\u2261': 'equiv',
    '\u2262': 'nequiv',
    '\u2261\u20E5': 'bnequiv',
    '\u2264': 'le',
    '\u2270': 'nle',
    '\u2264\u20D2': 'nvle',
    '\u2265': 'ge',
    '\u2271': 'nge',
    '\u2265\u20D2': 'nvge',
    '\u2266': 'lE',
    '\u2266\u0338': 'nlE',
    '\u2267': 'gE',
    '\u2267\u0338': 'ngE',
    '\u2268\uFE00': 'lvnE',
    '\u2268': 'lnE',
    '\u2269': 'gnE',
    '\u2269\uFE00': 'gvnE',
    '\u226A': 'll',
    '\u226A\u0338': 'nLtv',
    '\u226A\u20D2': 'nLt',
    '\u226B': 'gg',
    '\u226B\u0338': 'nGtv',
    '\u226B\u20D2': 'nGt',
    '\u226C': 'twixt',
    '\u2272': 'lsim',
    '\u2274': 'nlsim',
    '\u2273': 'gsim',
    '\u2275': 'ngsim',
    '\u2276': 'lg',
    '\u2278': 'ntlg',
    '\u2277': 'gl',
    '\u2279': 'ntgl',
    '\u227A': 'pr',
    '\u2280': 'npr',
    '\u227B': 'sc',
    '\u2281': 'nsc',
    '\u227C': 'prcue',
    '\u22E0': 'nprcue',
    '\u227D': 'sccue',
    '\u22E1': 'nsccue',
    '\u227E': 'prsim',
    '\u227F': 'scsim',
    '\u227F\u0338': 'NotSucceedsTilde',
    '\u2282': 'sub',
    '\u2284': 'nsub',
    '\u2282\u20D2': 'vnsub',
    '\u2283': 'sup',
    '\u2285': 'nsup',
    '\u2283\u20D2': 'vnsup',
    '\u2286': 'sube',
    '\u2288': 'nsube',
    '\u2287': 'supe',
    '\u2289': 'nsupe',
    '\u228A\uFE00': 'vsubne',
    '\u228A': 'subne',
    '\u228B\uFE00': 'vsupne',
    '\u228B': 'supne',
    '\u228D': 'cupdot',
    '\u228E': 'uplus',
    '\u228F': 'sqsub',
    '\u228F\u0338': 'NotSquareSubset',
    '\u2290': 'sqsup',
    '\u2290\u0338': 'NotSquareSuperset',
    '\u2291': 'sqsube',
    '\u22E2': 'nsqsube',
    '\u2292': 'sqsupe',
    '\u22E3': 'nsqsupe',
    '\u2293': 'sqcap',
    '\u2293\uFE00': 'sqcaps',
    '\u2294': 'sqcup',
    '\u2294\uFE00': 'sqcups',
    '\u2295': 'oplus',
    '\u2296': 'ominus',
    '\u2297': 'otimes',
    '\u2298': 'osol',
    '\u2299': 'odot',
    '\u229A': 'ocir',
    '\u229B': 'oast',
    '\u229D': 'odash',
    '\u229E': 'plusb',
    '\u229F': 'minusb',
    '\u22A0': 'timesb',
    '\u22A1': 'sdotb',
    '\u22A2': 'vdash',
    '\u22AC': 'nvdash',
    '\u22A3': 'dashv',
    '\u22A4': 'top',
    '\u22A5': 'bot',
    '\u22A7': 'models',
    '\u22A8': 'vDash',
    '\u22AD': 'nvDash',
    '\u22A9': 'Vdash',
    '\u22AE': 'nVdash',
    '\u22AA': 'Vvdash',
    '\u22AB': 'VDash',
    '\u22AF': 'nVDash',
    '\u22B0': 'prurel',
    '\u22B2': 'vltri',
    '\u22EA': 'nltri',
    '\u22B3': 'vrtri',
    '\u22EB': 'nrtri',
    '\u22B4': 'ltrie',
    '\u22EC': 'nltrie',
    '\u22B4\u20D2': 'nvltrie',
    '\u22B5': 'rtrie',
    '\u22ED': 'nrtrie',
    '\u22B5\u20D2': 'nvrtrie',
    '\u22B6': 'origof',
    '\u22B7': 'imof',
    '\u22B8': 'mumap',
    '\u22B9': 'hercon',
    '\u22BA': 'intcal',
    '\u22BB': 'veebar',
    '\u22BD': 'barvee',
    '\u22BE': 'angrtvb',
    '\u22BF': 'lrtri',
    '\u22C0': 'Wedge',
    '\u22C1': 'Vee',
    '\u22C2': 'xcap',
    '\u22C3': 'xcup',
    '\u22C4': 'diam',
    '\u22C5': 'sdot',
    '\u22C6': 'Star',
    '\u22C7': 'divonx',
    '\u22C8': 'bowtie',
    '\u22C9': 'ltimes',
    '\u22CA': 'rtimes',
    '\u22CB': 'lthree',
    '\u22CC': 'rthree',
    '\u22CD': 'bsime',
    '\u22CE': 'cuvee',
    '\u22CF': 'cuwed',
    '\u22D0': 'Sub',
    '\u22D1': 'Sup',
    '\u22D2': 'Cap',
    '\u22D3': 'Cup',
    '\u22D4': 'fork',
    '\u22D5': 'epar',
    '\u22D6': 'ltdot',
    '\u22D7': 'gtdot',
    '\u22D8': 'Ll',
    '\u22D8\u0338': 'nLl',
    '\u22D9': 'Gg',
    '\u22D9\u0338': 'nGg',
    '\u22DA\uFE00': 'lesg',
    '\u22DA': 'leg',
    '\u22DB': 'gel',
    '\u22DB\uFE00': 'gesl',
    '\u22DE': 'cuepr',
    '\u22DF': 'cuesc',
    '\u22E6': 'lnsim',
    '\u22E7': 'gnsim',
    '\u22E8': 'prnsim',
    '\u22E9': 'scnsim',
    '\u22EE': 'vellip',
    '\u22EF': 'ctdot',
    '\u22F0': 'utdot',
    '\u22F1': 'dtdot',
    '\u22F2': 'disin',
    '\u22F3': 'isinsv',
    '\u22F4': 'isins',
    '\u22F5': 'isindot',
    '\u22F5\u0338': 'notindot',
    '\u22F6': 'notinvc',
    '\u22F7': 'notinvb',
    '\u22F9': 'isinE',
    '\u22F9\u0338': 'notinE',
    '\u22FA': 'nisd',
    '\u22FB': 'xnis',
    '\u22FC': 'nis',
    '\u22FD': 'notnivc',
    '\u22FE': 'notnivb',
    '\u2305': 'barwed',
    '\u2306': 'Barwed',
    '\u230C': 'drcrop',
    '\u230D': 'dlcrop',
    '\u230E': 'urcrop',
    '\u230F': 'ulcrop',
    '\u2310': 'bnot',
    '\u2312': 'profline',
    '\u2313': 'profsurf',
    '\u2315': 'telrec',
    '\u2316': 'target',
    '\u231C': 'ulcorn',
    '\u231D': 'urcorn',
    '\u231E': 'dlcorn',
    '\u231F': 'drcorn',
    '\u2322': 'frown',
    '\u2323': 'smile',
    '\u232D': 'cylcty',
    '\u232E': 'profalar',
    '\u2336': 'topbot',
    '\u233D': 'ovbar',
    '\u233F': 'solbar',
    '\u237C': 'angzarr',
    '\u23B0': 'lmoust',
    '\u23B1': 'rmoust',
    '\u23B4': 'tbrk',
    '\u23B5': 'bbrk',
    '\u23B6': 'bbrktbrk',
    '\u23DC': 'OverParenthesis',
    '\u23DD': 'UnderParenthesis',
    '\u23DE': 'OverBrace',
    '\u23DF': 'UnderBrace',
    '\u23E2': 'trpezium',
    '\u23E7': 'elinters',
    '\u2423': 'blank',
    '\u2500': 'boxh',
    '\u2502': 'boxv',
    '\u250C': 'boxdr',
    '\u2510': 'boxdl',
    '\u2514': 'boxur',
    '\u2518': 'boxul',
    '\u251C': 'boxvr',
    '\u2524': 'boxvl',
    '\u252C': 'boxhd',
    '\u2534': 'boxhu',
    '\u253C': 'boxvh',
    '\u2550': 'boxH',
    '\u2551': 'boxV',
    '\u2552': 'boxdR',
    '\u2553': 'boxDr',
    '\u2554': 'boxDR',
    '\u2555': 'boxdL',
    '\u2556': 'boxDl',
    '\u2557': 'boxDL',
    '\u2558': 'boxuR',
    '\u2559': 'boxUr',
    '\u255A': 'boxUR',
    '\u255B': 'boxuL',
    '\u255C': 'boxUl',
    '\u255D': 'boxUL',
    '\u255E': 'boxvR',
    '\u255F': 'boxVr',
    '\u2560': 'boxVR',
    '\u2561': 'boxvL',
    '\u2562': 'boxVl',
    '\u2563': 'boxVL',
    '\u2564': 'boxHd',
    '\u2565': 'boxhD',
    '\u2566': 'boxHD',
    '\u2567': 'boxHu',
    '\u2568': 'boxhU',
    '\u2569': 'boxHU',
    '\u256A': 'boxvH',
    '\u256B': 'boxVh',
    '\u256C': 'boxVH',
    '\u2580': 'uhblk',
    '\u2584': 'lhblk',
    '\u2588': 'block',
    '\u2591': 'blk14',
    '\u2592': 'blk12',
    '\u2593': 'blk34',
    '\u25A1': 'squ',
    '\u25AA': 'squf',
    '\u25AB': 'EmptyVerySmallSquare',
    '\u25AD': 'rect',
    '\u25AE': 'marker',
    '\u25B1': 'fltns',
    '\u25B3': 'xutri',
    '\u25B4': 'utrif',
    '\u25B5': 'utri',
    '\u25B8': 'rtrif',
    '\u25B9': 'rtri',
    '\u25BD': 'xdtri',
    '\u25BE': 'dtrif',
    '\u25BF': 'dtri',
    '\u25C2': 'ltrif',
    '\u25C3': 'ltri',
    '\u25CA': 'loz',
    '\u25CB': 'cir',
    '\u25EC': 'tridot',
    '\u25EF': 'xcirc',
    '\u25F8': 'ultri',
    '\u25F9': 'urtri',
    '\u25FA': 'lltri',
    '\u25FB': 'EmptySmallSquare',
    '\u25FC': 'FilledSmallSquare',
    '\u2605': 'starf',
    '\u2606': 'star',
    '\u260E': 'phone',
    '\u2640': 'female',
    '\u2642': 'male',
    '\u2660': 'spades',
    '\u2663': 'clubs',
    '\u2665': 'hearts',
    '\u2666': 'diams',
    '\u266A': 'sung',
    '\u2713': 'check',
    '\u2717': 'cross',
    '\u2720': 'malt',
    '\u2736': 'sext',
    '\u2758': 'VerticalSeparator',
    '\u27C8': 'bsolhsub',
    '\u27C9': 'suphsol',
    '\u27F5': 'xlarr',
    '\u27F6': 'xrarr',
    '\u27F7': 'xharr',
    '\u27F8': 'xlArr',
    '\u27F9': 'xrArr',
    '\u27FA': 'xhArr',
    '\u27FC': 'xmap',
    '\u27FF': 'dzigrarr',
    '\u2902': 'nvlArr',
    '\u2903': 'nvrArr',
    '\u2904': 'nvHarr',
    '\u2905': 'Map',
    '\u290C': 'lbarr',
    '\u290D': 'rbarr',
    '\u290E': 'lBarr',
    '\u290F': 'rBarr',
    '\u2910': 'RBarr',
    '\u2911': 'DDotrahd',
    '\u2912': 'UpArrowBar',
    '\u2913': 'DownArrowBar',
    '\u2916': 'Rarrtl',
    '\u2919': 'latail',
    '\u291A': 'ratail',
    '\u291B': 'lAtail',
    '\u291C': 'rAtail',
    '\u291D': 'larrfs',
    '\u291E': 'rarrfs',
    '\u291F': 'larrbfs',
    '\u2920': 'rarrbfs',
    '\u2923': 'nwarhk',
    '\u2924': 'nearhk',
    '\u2925': 'searhk',
    '\u2926': 'swarhk',
    '\u2927': 'nwnear',
    '\u2928': 'toea',
    '\u2929': 'tosa',
    '\u292A': 'swnwar',
    '\u2933': 'rarrc',
    '\u2933\u0338': 'nrarrc',
    '\u2935': 'cudarrr',
    '\u2936': 'ldca',
    '\u2937': 'rdca',
    '\u2938': 'cudarrl',
    '\u2939': 'larrpl',
    '\u293C': 'curarrm',
    '\u293D': 'cularrp',
    '\u2945': 'rarrpl',
    '\u2948': 'harrcir',
    '\u2949': 'Uarrocir',
    '\u294A': 'lurdshar',
    '\u294B': 'ldrushar',
    '\u294E': 'LeftRightVector',
    '\u294F': 'RightUpDownVector',
    '\u2950': 'DownLeftRightVector',
    '\u2951': 'LeftUpDownVector',
    '\u2952': 'LeftVectorBar',
    '\u2953': 'RightVectorBar',
    '\u2954': 'RightUpVectorBar',
    '\u2955': 'RightDownVectorBar',
    '\u2956': 'DownLeftVectorBar',
    '\u2957': 'DownRightVectorBar',
    '\u2958': 'LeftUpVectorBar',
    '\u2959': 'LeftDownVectorBar',
    '\u295A': 'LeftTeeVector',
    '\u295B': 'RightTeeVector',
    '\u295C': 'RightUpTeeVector',
    '\u295D': 'RightDownTeeVector',
    '\u295E': 'DownLeftTeeVector',
    '\u295F': 'DownRightTeeVector',
    '\u2960': 'LeftUpTeeVector',
    '\u2961': 'LeftDownTeeVector',
    '\u2962': 'lHar',
    '\u2963': 'uHar',
    '\u2964': 'rHar',
    '\u2965': 'dHar',
    '\u2966': 'luruhar',
    '\u2967': 'ldrdhar',
    '\u2968': 'ruluhar',
    '\u2969': 'rdldhar',
    '\u296A': 'lharul',
    '\u296B': 'llhard',
    '\u296C': 'rharul',
    '\u296D': 'lrhard',
    '\u296E': 'udhar',
    '\u296F': 'duhar',
    '\u2970': 'RoundImplies',
    '\u2971': 'erarr',
    '\u2972': 'simrarr',
    '\u2973': 'larrsim',
    '\u2974': 'rarrsim',
    '\u2975': 'rarrap',
    '\u2976': 'ltlarr',
    '\u2978': 'gtrarr',
    '\u2979': 'subrarr',
    '\u297B': 'suplarr',
    '\u297C': 'lfisht',
    '\u297D': 'rfisht',
    '\u297E': 'ufisht',
    '\u297F': 'dfisht',
    '\u299A': 'vzigzag',
    '\u299C': 'vangrt',
    '\u299D': 'angrtvbd',
    '\u29A4': 'ange',
    '\u29A5': 'range',
    '\u29A6': 'dwangle',
    '\u29A7': 'uwangle',
    '\u29A8': 'angmsdaa',
    '\u29A9': 'angmsdab',
    '\u29AA': 'angmsdac',
    '\u29AB': 'angmsdad',
    '\u29AC': 'angmsdae',
    '\u29AD': 'angmsdaf',
    '\u29AE': 'angmsdag',
    '\u29AF': 'angmsdah',
    '\u29B0': 'bemptyv',
    '\u29B1': 'demptyv',
    '\u29B2': 'cemptyv',
    '\u29B3': 'raemptyv',
    '\u29B4': 'laemptyv',
    '\u29B5': 'ohbar',
    '\u29B6': 'omid',
    '\u29B7': 'opar',
    '\u29B9': 'operp',
    '\u29BB': 'olcross',
    '\u29BC': 'odsold',
    '\u29BE': 'olcir',
    '\u29BF': 'ofcir',
    '\u29C0': 'olt',
    '\u29C1': 'ogt',
    '\u29C2': 'cirscir',
    '\u29C3': 'cirE',
    '\u29C4': 'solb',
    '\u29C5': 'bsolb',
    '\u29C9': 'boxbox',
    '\u29CD': 'trisb',
    '\u29CE': 'rtriltri',
    '\u29CF': 'LeftTriangleBar',
    '\u29CF\u0338': 'NotLeftTriangleBar',
    '\u29D0': 'RightTriangleBar',
    '\u29D0\u0338': 'NotRightTriangleBar',
    '\u29DC': 'iinfin',
    '\u29DD': 'infintie',
    '\u29DE': 'nvinfin',
    '\u29E3': 'eparsl',
    '\u29E4': 'smeparsl',
    '\u29E5': 'eqvparsl',
    '\u29EB': 'lozf',
    '\u29F4': 'RuleDelayed',
    '\u29F6': 'dsol',
    '\u2A00': 'xodot',
    '\u2A01': 'xoplus',
    '\u2A02': 'xotime',
    '\u2A04': 'xuplus',
    '\u2A06': 'xsqcup',
    '\u2A0D': 'fpartint',
    '\u2A10': 'cirfnint',
    '\u2A11': 'awint',
    '\u2A12': 'rppolint',
    '\u2A13': 'scpolint',
    '\u2A14': 'npolint',
    '\u2A15': 'pointint',
    '\u2A16': 'quatint',
    '\u2A17': 'intlarhk',
    '\u2A22': 'pluscir',
    '\u2A23': 'plusacir',
    '\u2A24': 'simplus',
    '\u2A25': 'plusdu',
    '\u2A26': 'plussim',
    '\u2A27': 'plustwo',
    '\u2A29': 'mcomma',
    '\u2A2A': 'minusdu',
    '\u2A2D': 'loplus',
    '\u2A2E': 'roplus',
    '\u2A2F': 'Cross',
    '\u2A30': 'timesd',
    '\u2A31': 'timesbar',
    '\u2A33': 'smashp',
    '\u2A34': 'lotimes',
    '\u2A35': 'rotimes',
    '\u2A36': 'otimesas',
    '\u2A37': 'Otimes',
    '\u2A38': 'odiv',
    '\u2A39': 'triplus',
    '\u2A3A': 'triminus',
    '\u2A3B': 'tritime',
    '\u2A3C': 'iprod',
    '\u2A3F': 'amalg',
    '\u2A40': 'capdot',
    '\u2A42': 'ncup',
    '\u2A43': 'ncap',
    '\u2A44': 'capand',
    '\u2A45': 'cupor',
    '\u2A46': 'cupcap',
    '\u2A47': 'capcup',
    '\u2A48': 'cupbrcap',
    '\u2A49': 'capbrcup',
    '\u2A4A': 'cupcup',
    '\u2A4B': 'capcap',
    '\u2A4C': 'ccups',
    '\u2A4D': 'ccaps',
    '\u2A50': 'ccupssm',
    '\u2A53': 'And',
    '\u2A54': 'Or',
    '\u2A55': 'andand',
    '\u2A56': 'oror',
    '\u2A57': 'orslope',
    '\u2A58': 'andslope',
    '\u2A5A': 'andv',
    '\u2A5B': 'orv',
    '\u2A5C': 'andd',
    '\u2A5D': 'ord',
    '\u2A5F': 'wedbar',
    '\u2A66': 'sdote',
    '\u2A6A': 'simdot',
    '\u2A6D': 'congdot',
    '\u2A6D\u0338': 'ncongdot',
    '\u2A6E': 'easter',
    '\u2A6F': 'apacir',
    '\u2A70': 'apE',
    '\u2A70\u0338': 'napE',
    '\u2A71': 'eplus',
    '\u2A72': 'pluse',
    '\u2A73': 'Esim',
    '\u2A77': 'eDDot',
    '\u2A78': 'equivDD',
    '\u2A79': 'ltcir',
    '\u2A7A': 'gtcir',
    '\u2A7B': 'ltquest',
    '\u2A7C': 'gtquest',
    '\u2A7D': 'les',
    '\u2A7D\u0338': 'nles',
    '\u2A7E': 'ges',
    '\u2A7E\u0338': 'nges',
    '\u2A7F': 'lesdot',
    '\u2A80': 'gesdot',
    '\u2A81': 'lesdoto',
    '\u2A82': 'gesdoto',
    '\u2A83': 'lesdotor',
    '\u2A84': 'gesdotol',
    '\u2A85': 'lap',
    '\u2A86': 'gap',
    '\u2A87': 'lne',
    '\u2A88': 'gne',
    '\u2A89': 'lnap',
    '\u2A8A': 'gnap',
    '\u2A8B': 'lEg',
    '\u2A8C': 'gEl',
    '\u2A8D': 'lsime',
    '\u2A8E': 'gsime',
    '\u2A8F': 'lsimg',
    '\u2A90': 'gsiml',
    '\u2A91': 'lgE',
    '\u2A92': 'glE',
    '\u2A93': 'lesges',
    '\u2A94': 'gesles',
    '\u2A95': 'els',
    '\u2A96': 'egs',
    '\u2A97': 'elsdot',
    '\u2A98': 'egsdot',
    '\u2A99': 'el',
    '\u2A9A': 'eg',
    '\u2A9D': 'siml',
    '\u2A9E': 'simg',
    '\u2A9F': 'simlE',
    '\u2AA0': 'simgE',
    '\u2AA1': 'LessLess',
    '\u2AA1\u0338': 'NotNestedLessLess',
    '\u2AA2': 'GreaterGreater',
    '\u2AA2\u0338': 'NotNestedGreaterGreater',
    '\u2AA4': 'glj',
    '\u2AA5': 'gla',
    '\u2AA6': 'ltcc',
    '\u2AA7': 'gtcc',
    '\u2AA8': 'lescc',
    '\u2AA9': 'gescc',
    '\u2AAA': 'smt',
    '\u2AAB': 'lat',
    '\u2AAC': 'smte',
    '\u2AAC\uFE00': 'smtes',
    '\u2AAD': 'late',
    '\u2AAD\uFE00': 'lates',
    '\u2AAE': 'bumpE',
    '\u2AAF': 'pre',
    '\u2AAF\u0338': 'npre',
    '\u2AB0': 'sce',
    '\u2AB0\u0338': 'nsce',
    '\u2AB3': 'prE',
    '\u2AB4': 'scE',
    '\u2AB5': 'prnE',
    '\u2AB6': 'scnE',
    '\u2AB7': 'prap',
    '\u2AB8': 'scap',
    '\u2AB9': 'prnap',
    '\u2ABA': 'scnap',
    '\u2ABB': 'Pr',
    '\u2ABC': 'Sc',
    '\u2ABD': 'subdot',
    '\u2ABE': 'supdot',
    '\u2ABF': 'subplus',
    '\u2AC0': 'supplus',
    '\u2AC1': 'submult',
    '\u2AC2': 'supmult',
    '\u2AC3': 'subedot',
    '\u2AC4': 'supedot',
    '\u2AC5': 'subE',
    '\u2AC5\u0338': 'nsubE',
    '\u2AC6': 'supE',
    '\u2AC6\u0338': 'nsupE',
    '\u2AC7': 'subsim',
    '\u2AC8': 'supsim',
    '\u2ACB\uFE00': 'vsubnE',
    '\u2ACB': 'subnE',
    '\u2ACC\uFE00': 'vsupnE',
    '\u2ACC': 'supnE',
    '\u2ACF': 'csub',
    '\u2AD0': 'csup',
    '\u2AD1': 'csube',
    '\u2AD2': 'csupe',
    '\u2AD3': 'subsup',
    '\u2AD4': 'supsub',
    '\u2AD5': 'subsub',
    '\u2AD6': 'supsup',
    '\u2AD7': 'suphsub',
    '\u2AD8': 'supdsub',
    '\u2AD9': 'forkv',
    '\u2ADA': 'topfork',
    '\u2ADB': 'mlcp',
    '\u2AE4': 'Dashv',
    '\u2AE6': 'Vdashl',
    '\u2AE7': 'Barv',
    '\u2AE8': 'vBar',
    '\u2AE9': 'vBarv',
    '\u2AEB': 'Vbar',
    '\u2AEC': 'Not',
    '\u2AED': 'bNot',
    '\u2AEE': 'rnmid',
    '\u2AEF': 'cirmid',
    '\u2AF0': 'midcir',
    '\u2AF1': 'topcir',
    '\u2AF2': 'nhpar',
    '\u2AF3': 'parsim',
    '\u2AFD': 'parsl',
    '\u2AFD\u20E5': 'nparsl',
    '\u266D': 'flat',
    '\u266E': 'natur',
    '\u266F': 'sharp',
    '\xA4': 'curren',
    '\xA2': 'cent',
    '$': 'dollar',
    '\xA3': 'pound',
    '\xA5': 'yen',
    '\u20AC': 'euro',
    '\xB9': 'sup1',
    '\xBD': 'half',
    '\u2153': 'frac13',
    '\xBC': 'frac14',
    '\u2155': 'frac15',
    '\u2159': 'frac16',
    '\u215B': 'frac18',
    '\xB2': 'sup2',
    '\u2154': 'frac23',
    '\u2156': 'frac25',
    '\xB3': 'sup3',
    '\xBE': 'frac34',
    '\u2157': 'frac35',
    '\u215C': 'frac38',
    '\u2158': 'frac45',
    '\u215A': 'frac56',
    '\u215D': 'frac58',
    '\u215E': 'frac78',
    '\uD835\uDCB6': 'ascr',
    '\uD835\uDD52': 'aopf',
    '\uD835\uDD1E': 'afr',
    '\uD835\uDD38': 'Aopf',
    '\uD835\uDD04': 'Afr',
    '\uD835\uDC9C': 'Ascr',
    '\xAA': 'ordf',
    '\xE1': 'aacute',
    '\xC1': 'Aacute',
    '\xE0': 'agrave',
    '\xC0': 'Agrave',
    '\u0103': 'abreve',
    '\u0102': 'Abreve',
    '\xE2': 'acirc',
    '\xC2': 'Acirc',
    '\xE5': 'aring',
    '\xC5': 'angst',
    '\xE4': 'auml',
    '\xC4': 'Auml',
    '\xE3': 'atilde',
    '\xC3': 'Atilde',
    '\u0105': 'aogon',
    '\u0104': 'Aogon',
    '\u0101': 'amacr',
    '\u0100': 'Amacr',
    '\xE6': 'aelig',
    '\xC6': 'AElig',
    '\uD835\uDCB7': 'bscr',
    '\uD835\uDD53': 'bopf',
    '\uD835\uDD1F': 'bfr',
    '\uD835\uDD39': 'Bopf',
    '\u212C': 'Bscr',
    '\uD835\uDD05': 'Bfr',
    '\uD835\uDD20': 'cfr',
    '\uD835\uDCB8': 'cscr',
    '\uD835\uDD54': 'copf',
    '\u212D': 'Cfr',
    '\uD835\uDC9E': 'Cscr',
    '\u2102': 'Copf',
    '\u0107': 'cacute',
    '\u0106': 'Cacute',
    '\u0109': 'ccirc',
    '\u0108': 'Ccirc',
    '\u010D': 'ccaron',
    '\u010C': 'Ccaron',
    '\u010B': 'cdot',
    '\u010A': 'Cdot',
    '\xE7': 'ccedil',
    '\xC7': 'Ccedil',
    '\u2105': 'incare',
    '\uD835\uDD21': 'dfr',
    '\u2146': 'dd',
    '\uD835\uDD55': 'dopf',
    '\uD835\uDCB9': 'dscr',
    '\uD835\uDC9F': 'Dscr',
    '\uD835\uDD07': 'Dfr',
    '\u2145': 'DD',
    '\uD835\uDD3B': 'Dopf',
    '\u010F': 'dcaron',
    '\u010E': 'Dcaron',
    '\u0111': 'dstrok',
    '\u0110': 'Dstrok',
    '\xF0': 'eth',
    '\xD0': 'ETH',
    '\u2147': 'ee',
    '\u212F': 'escr',
    '\uD835\uDD22': 'efr',
    '\uD835\uDD56': 'eopf',
    '\u2130': 'Escr',
    '\uD835\uDD08': 'Efr',
    '\uD835\uDD3C': 'Eopf',
    '\xE9': 'eacute',
    '\xC9': 'Eacute',
    '\xE8': 'egrave',
    '\xC8': 'Egrave',
    '\xEA': 'ecirc',
    '\xCA': 'Ecirc',
    '\u011B': 'ecaron',
    '\u011A': 'Ecaron',
    '\xEB': 'euml',
    '\xCB': 'Euml',
    '\u0117': 'edot',
    '\u0116': 'Edot',
    '\u0119': 'eogon',
    '\u0118': 'Eogon',
    '\u0113': 'emacr',
    '\u0112': 'Emacr',
    '\uD835\uDD23': 'ffr',
    '\uD835\uDD57': 'fopf',
    '\uD835\uDCBB': 'fscr',
    '\uD835\uDD09': 'Ffr',
    '\uD835\uDD3D': 'Fopf',
    '\u2131': 'Fscr',
    '\uFB00': 'fflig',
    '\uFB03': 'ffilig',
    '\uFB04': 'ffllig',
    '\uFB01': 'filig',
    'fj': 'fjlig',
    '\uFB02': 'fllig',
    '\u0192': 'fnof',
    '\u210A': 'gscr',
    '\uD835\uDD58': 'gopf',
    '\uD835\uDD24': 'gfr',
    '\uD835\uDCA2': 'Gscr',
    '\uD835\uDD3E': 'Gopf',
    '\uD835\uDD0A': 'Gfr',
    '\u01F5': 'gacute',
    '\u011F': 'gbreve',
    '\u011E': 'Gbreve',
    '\u011D': 'gcirc',
    '\u011C': 'Gcirc',
    '\u0121': 'gdot',
    '\u0120': 'Gdot',
    '\u0122': 'Gcedil',
    '\uD835\uDD25': 'hfr',
    '\u210E': 'planckh',
    '\uD835\uDCBD': 'hscr',
    '\uD835\uDD59': 'hopf',
    '\u210B': 'Hscr',
    '\u210C': 'Hfr',
    '\u210D': 'Hopf',
    '\u0125': 'hcirc',
    '\u0124': 'Hcirc',
    '\u210F': 'hbar',
    '\u0127': 'hstrok',
    '\u0126': 'Hstrok',
    '\uD835\uDD5A': 'iopf',
    '\uD835\uDD26': 'ifr',
    '\uD835\uDCBE': 'iscr',
    '\u2148': 'ii',
    '\uD835\uDD40': 'Iopf',
    '\u2110': 'Iscr',
    '\u2111': 'Im',
    '\xED': 'iacute',
    '\xCD': 'Iacute',
    '\xEC': 'igrave',
    '\xCC': 'Igrave',
    '\xEE': 'icirc',
    '\xCE': 'Icirc',
    '\xEF': 'iuml',
    '\xCF': 'Iuml',
    '\u0129': 'itilde',
    '\u0128': 'Itilde',
    '\u0130': 'Idot',
    '\u012F': 'iogon',
    '\u012E': 'Iogon',
    '\u012B': 'imacr',
    '\u012A': 'Imacr',
    '\u0133': 'ijlig',
    '\u0132': 'IJlig',
    '\u0131': 'imath',
    '\uD835\uDCBF': 'jscr',
    '\uD835\uDD5B': 'jopf',
    '\uD835\uDD27': 'jfr',
    '\uD835\uDCA5': 'Jscr',
    '\uD835\uDD0D': 'Jfr',
    '\uD835\uDD41': 'Jopf',
    '\u0135': 'jcirc',
    '\u0134': 'Jcirc',
    '\u0237': 'jmath',
    '\uD835\uDD5C': 'kopf',
    '\uD835\uDCC0': 'kscr',
    '\uD835\uDD28': 'kfr',
    '\uD835\uDCA6': 'Kscr',
    '\uD835\uDD42': 'Kopf',
    '\uD835\uDD0E': 'Kfr',
    '\u0137': 'kcedil',
    '\u0136': 'Kcedil',
    '\uD835\uDD29': 'lfr',
    '\uD835\uDCC1': 'lscr',
    '\u2113': 'ell',
    '\uD835\uDD5D': 'lopf',
    '\u2112': 'Lscr',
    '\uD835\uDD0F': 'Lfr',
    '\uD835\uDD43': 'Lopf',
    '\u013A': 'lacute',
    '\u0139': 'Lacute',
    '\u013E': 'lcaron',
    '\u013D': 'Lcaron',
    '\u013C': 'lcedil',
    '\u013B': 'Lcedil',
    '\u0142': 'lstrok',
    '\u0141': 'Lstrok',
    '\u0140': 'lmidot',
    '\u013F': 'Lmidot',
    '\uD835\uDD2A': 'mfr',
    '\uD835\uDD5E': 'mopf',
    '\uD835\uDCC2': 'mscr',
    '\uD835\uDD10': 'Mfr',
    '\uD835\uDD44': 'Mopf',
    '\u2133': 'Mscr',
    '\uD835\uDD2B': 'nfr',
    '\uD835\uDD5F': 'nopf',
    '\uD835\uDCC3': 'nscr',
    '\u2115': 'Nopf',
    '\uD835\uDCA9': 'Nscr',
    '\uD835\uDD11': 'Nfr',
    '\u0144': 'nacute',
    '\u0143': 'Nacute',
    '\u0148': 'ncaron',
    '\u0147': 'Ncaron',
    '\xF1': 'ntilde',
    '\xD1': 'Ntilde',
    '\u0146': 'ncedil',
    '\u0145': 'Ncedil',
    '\u2116': 'numero',
    '\u014B': 'eng',
    '\u014A': 'ENG',
    '\uD835\uDD60': 'oopf',
    '\uD835\uDD2C': 'ofr',
    '\u2134': 'oscr',
    '\uD835\uDCAA': 'Oscr',
    '\uD835\uDD12': 'Ofr',
    '\uD835\uDD46': 'Oopf',
    '\xBA': 'ordm',
    '\xF3': 'oacute',
    '\xD3': 'Oacute',
    '\xF2': 'ograve',
    '\xD2': 'Ograve',
    '\xF4': 'ocirc',
    '\xD4': 'Ocirc',
    '\xF6': 'ouml',
    '\xD6': 'Ouml',
    '\u0151': 'odblac',
    '\u0150': 'Odblac',
    '\xF5': 'otilde',
    '\xD5': 'Otilde',
    '\xF8': 'oslash',
    '\xD8': 'Oslash',
    '\u014D': 'omacr',
    '\u014C': 'Omacr',
    '\u0153': 'oelig',
    '\u0152': 'OElig',
    '\uD835\uDD2D': 'pfr',
    '\uD835\uDCC5': 'pscr',
    '\uD835\uDD61': 'popf',
    '\u2119': 'Popf',
    '\uD835\uDD13': 'Pfr',
    '\uD835\uDCAB': 'Pscr',
    '\uD835\uDD62': 'qopf',
    '\uD835\uDD2E': 'qfr',
    '\uD835\uDCC6': 'qscr',
    '\uD835\uDCAC': 'Qscr',
    '\uD835\uDD14': 'Qfr',
    '\u211A': 'Qopf',
    '\u0138': 'kgreen',
    '\uD835\uDD2F': 'rfr',
    '\uD835\uDD63': 'ropf',
    '\uD835\uDCC7': 'rscr',
    '\u211B': 'Rscr',
    '\u211C': 'Re',
    '\u211D': 'Ropf',
    '\u0155': 'racute',
    '\u0154': 'Racute',
    '\u0159': 'rcaron',
    '\u0158': 'Rcaron',
    '\u0157': 'rcedil',
    '\u0156': 'Rcedil',
    '\uD835\uDD64': 'sopf',
    '\uD835\uDCC8': 'sscr',
    '\uD835\uDD30': 'sfr',
    '\uD835\uDD4A': 'Sopf',
    '\uD835\uDD16': 'Sfr',
    '\uD835\uDCAE': 'Sscr',
    '\u24C8': 'oS',
    '\u015B': 'sacute',
    '\u015A': 'Sacute',
    '\u015D': 'scirc',
    '\u015C': 'Scirc',
    '\u0161': 'scaron',
    '\u0160': 'Scaron',
    '\u015F': 'scedil',
    '\u015E': 'Scedil',
    '\xDF': 'szlig',
    '\uD835\uDD31': 'tfr',
    '\uD835\uDCC9': 'tscr',
    '\uD835\uDD65': 'topf',
    '\uD835\uDCAF': 'Tscr',
    '\uD835\uDD17': 'Tfr',
    '\uD835\uDD4B': 'Topf',
    '\u0165': 'tcaron',
    '\u0164': 'Tcaron',
    '\u0163': 'tcedil',
    '\u0162': 'Tcedil',
    '\u2122': 'trade',
    '\u0167': 'tstrok',
    '\u0166': 'Tstrok',
    '\uD835\uDCCA': 'uscr',
    '\uD835\uDD66': 'uopf',
    '\uD835\uDD32': 'ufr',
    '\uD835\uDD4C': 'Uopf',
    '\uD835\uDD18': 'Ufr',
    '\uD835\uDCB0': 'Uscr',
    '\xFA': 'uacute',
    '\xDA': 'Uacute',
    '\xF9': 'ugrave',
    '\xD9': 'Ugrave',
    '\u016D': 'ubreve',
    '\u016C': 'Ubreve',
    '\xFB': 'ucirc',
    '\xDB': 'Ucirc',
    '\u016F': 'uring',
    '\u016E': 'Uring',
    '\xFC': 'uuml',
    '\xDC': 'Uuml',
    '\u0171': 'udblac',
    '\u0170': 'Udblac',
    '\u0169': 'utilde',
    '\u0168': 'Utilde',
    '\u0173': 'uogon',
    '\u0172': 'Uogon',
    '\u016B': 'umacr',
    '\u016A': 'Umacr',
    '\uD835\uDD33': 'vfr',
    '\uD835\uDD67': 'vopf',
    '\uD835\uDCCB': 'vscr',
    '\uD835\uDD19': 'Vfr',
    '\uD835\uDD4D': 'Vopf',
    '\uD835\uDCB1': 'Vscr',
    '\uD835\uDD68': 'wopf',
    '\uD835\uDCCC': 'wscr',
    '\uD835\uDD34': 'wfr',
    '\uD835\uDCB2': 'Wscr',
    '\uD835\uDD4E': 'Wopf',
    '\uD835\uDD1A': 'Wfr',
    '\u0175': 'wcirc',
    '\u0174': 'Wcirc',
    '\uD835\uDD35': 'xfr',
    '\uD835\uDCCD': 'xscr',
    '\uD835\uDD69': 'xopf',
    '\uD835\uDD4F': 'Xopf',
    '\uD835\uDD1B': 'Xfr',
    '\uD835\uDCB3': 'Xscr',
    '\uD835\uDD36': 'yfr',
    '\uD835\uDCCE': 'yscr',
    '\uD835\uDD6A': 'yopf',
    '\uD835\uDCB4': 'Yscr',
    '\uD835\uDD1C': 'Yfr',
    '\uD835\uDD50': 'Yopf',
    '\xFD': 'yacute',
    '\xDD': 'Yacute',
    '\u0177': 'ycirc',
    '\u0176': 'Ycirc',
    '\xFF': 'yuml',
    '\u0178': 'Yuml',
    '\uD835\uDCCF': 'zscr',
    '\uD835\uDD37': 'zfr',
    '\uD835\uDD6B': 'zopf',
    '\u2128': 'Zfr',
    '\u2124': 'Zopf',
    '\uD835\uDCB5': 'Zscr',
    '\u017A': 'zacute',
    '\u0179': 'Zacute',
    '\u017E': 'zcaron',
    '\u017D': 'Zcaron',
    '\u017C': 'zdot',
    '\u017B': 'Zdot',
    '\u01B5': 'imped',
    '\xFE': 'thorn',
    '\xDE': 'THORN',
    '\u0149': 'napos',
    '\u03B1': 'alpha',
    '\u0391': 'Alpha',
    '\u03B2': 'beta',
    '\u0392': 'Beta',
    '\u03B3': 'gamma',
    '\u0393': 'Gamma',
    '\u03B4': 'delta',
    '\u0394': 'Delta',
    '\u03B5': 'epsi',
    '\u03F5': 'epsiv',
    '\u0395': 'Epsilon',
    '\u03DD': 'gammad',
    '\u03DC': 'Gammad',
    '\u03B6': 'zeta',
    '\u0396': 'Zeta',
    '\u03B7': 'eta',
    '\u0397': 'Eta',
    '\u03B8': 'theta',
    '\u03D1': 'thetav',
    '\u0398': 'Theta',
    '\u03B9': 'iota',
    '\u0399': 'Iota',
    '\u03BA': 'kappa',
    '\u03F0': 'kappav',
    '\u039A': 'Kappa',
    '\u03BB': 'lambda',
    '\u039B': 'Lambda',
    '\u03BC': 'mu',
    '\xB5': 'micro',
    '\u039C': 'Mu',
    '\u03BD': 'nu',
    '\u039D': 'Nu',
    '\u03BE': 'xi',
    '\u039E': 'Xi',
    '\u03BF': 'omicron',
    '\u039F': 'Omicron',
    '\u03C0': 'pi',
    '\u03D6': 'piv',
    '\u03A0': 'Pi',
    '\u03C1': 'rho',
    '\u03F1': 'rhov',
    '\u03A1': 'Rho',
    '\u03C3': 'sigma',
    '\u03A3': 'Sigma',
    '\u03C2': 'sigmaf',
    '\u03C4': 'tau',
    '\u03A4': 'Tau',
    '\u03C5': 'upsi',
    '\u03A5': 'Upsilon',
    '\u03D2': 'Upsi',
    '\u03C6': 'phi',
    '\u03D5': 'phiv',
    '\u03A6': 'Phi',
    '\u03C7': 'chi',
    '\u03A7': 'Chi',
    '\u03C8': 'psi',
    '\u03A8': 'Psi',
    '\u03C9': 'omega',
    '\u03A9': 'ohm',
    '\u0430': 'acy',
    '\u0410': 'Acy',
    '\u0431': 'bcy',
    '\u0411': 'Bcy',
    '\u0432': 'vcy',
    '\u0412': 'Vcy',
    '\u0433': 'gcy',
    '\u0413': 'Gcy',
    '\u0453': 'gjcy',
    '\u0403': 'GJcy',
    '\u0434': 'dcy',
    '\u0414': 'Dcy',
    '\u0452': 'djcy',
    '\u0402': 'DJcy',
    '\u0435': 'iecy',
    '\u0415': 'IEcy',
    '\u0451': 'iocy',
    '\u0401': 'IOcy',
    '\u0454': 'jukcy',
    '\u0404': 'Jukcy',
    '\u0436': 'zhcy',
    '\u0416': 'ZHcy',
    '\u0437': 'zcy',
    '\u0417': 'Zcy',
    '\u0455': 'dscy',
    '\u0405': 'DScy',
    '\u0438': 'icy',
    '\u0418': 'Icy',
    '\u0456': 'iukcy',
    '\u0406': 'Iukcy',
    '\u0457': 'yicy',
    '\u0407': 'YIcy',
    '\u0439': 'jcy',
    '\u0419': 'Jcy',
    '\u0458': 'jsercy',
    '\u0408': 'Jsercy',
    '\u043A': 'kcy',
    '\u041A': 'Kcy',
    '\u045C': 'kjcy',
    '\u040C': 'KJcy',
    '\u043B': 'lcy',
    '\u041B': 'Lcy',
    '\u0459': 'ljcy',
    '\u0409': 'LJcy',
    '\u043C': 'mcy',
    '\u041C': 'Mcy',
    '\u043D': 'ncy',
    '\u041D': 'Ncy',
    '\u045A': 'njcy',
    '\u040A': 'NJcy',
    '\u043E': 'ocy',
    '\u041E': 'Ocy',
    '\u043F': 'pcy',
    '\u041F': 'Pcy',
    '\u0440': 'rcy',
    '\u0420': 'Rcy',
    '\u0441': 'scy',
    '\u0421': 'Scy',
    '\u0442': 'tcy',
    '\u0422': 'Tcy',
    '\u045B': 'tshcy',
    '\u040B': 'TSHcy',
    '\u0443': 'ucy',
    '\u0423': 'Ucy',
    '\u045E': 'ubrcy',
    '\u040E': 'Ubrcy',
    '\u0444': 'fcy',
    '\u0424': 'Fcy',
    '\u0445': 'khcy',
    '\u0425': 'KHcy',
    '\u0446': 'tscy',
    '\u0426': 'TScy',
    '\u0447': 'chcy',
    '\u0427': 'CHcy',
    '\u045F': 'dzcy',
    '\u040F': 'DZcy',
    '\u0448': 'shcy',
    '\u0428': 'SHcy',
    '\u0449': 'shchcy',
    '\u0429': 'SHCHcy',
    '\u044A': 'hardcy',
    '\u042A': 'HARDcy',
    '\u044B': 'ycy',
    '\u042B': 'Ycy',
    '\u044C': 'softcy',
    '\u042C': 'SOFTcy',
    '\u044D': 'ecy',
    '\u042D': 'Ecy',
    '\u044E': 'yucy',
    '\u042E': 'YUcy',
    '\u044F': 'yacy',
    '\u042F': 'YAcy',
    '\u2135': 'aleph',
    '\u2136': 'beth',
    '\u2137': 'gimel',
    '\u2138': 'daleth'
  };
  var regexEscape = /["&'<>`]/g;
  var escapeMap = {
    '"': '&quot;',
    '&': '&amp;',
    '\'': '&#x27;',
    '<': '&lt;',
    // See https://mathiasbynens.be/notes/ambiguous-ampersands: in HTML, the
    // following is not strictly necessary unless it’s part of a tag or an
    // unquoted attribute value. We’re only escaping it to support those
    // situations, and for XML support.
    '>': '&gt;',
    // In Internet Explorer ≤ 8, the backtick character can be used
    // to break out of (un)quoted attribute values or HTML comments.
    // See http://html5sec.org/#102, http://html5sec.org/#108, and
    // http://html5sec.org/#133.
    '`': '&#x60;'
  };
  var regexInvalidEntity = /&#(?:[xX][^a-fA-F0-9]|[^0-9xX])/;
  var regexInvalidRawCodePoint = /[\0-\x08\x0B\x0E-\x1F\x7F-\x9F\uFDD0-\uFDEF\uFFFE\uFFFF]|[\uD83F\uD87F\uD8BF\uD8FF\uD93F\uD97F\uD9BF\uD9FF\uDA3F\uDA7F\uDABF\uDAFF\uDB3F\uDB7F\uDBBF\uDBFF][\uDFFE\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
  var regexDecode = /&(CounterClockwiseContourIntegral|DoubleLongLeftRightArrow|ClockwiseContourIntegral|NotNestedGreaterGreater|NotSquareSupersetEqual|DiacriticalDoubleAcute|NotRightTriangleEqual|NotSucceedsSlantEqual|NotPrecedesSlantEqual|CloseCurlyDoubleQuote|NegativeVeryThinSpace|DoubleContourIntegral|FilledVerySmallSquare|CapitalDifferentialD|OpenCurlyDoubleQuote|EmptyVerySmallSquare|NestedGreaterGreater|DoubleLongRightArrow|NotLeftTriangleEqual|NotGreaterSlantEqual|ReverseUpEquilibrium|DoubleLeftRightArrow|NotSquareSubsetEqual|NotDoubleVerticalBar|RightArrowLeftArrow|NotGreaterFullEqual|NotRightTriangleBar|SquareSupersetEqual|DownLeftRightVector|DoubleLongLeftArrow|leftrightsquigarrow|LeftArrowRightArrow|NegativeMediumSpace|blacktriangleright|RightDownVectorBar|PrecedesSlantEqual|RightDoubleBracket|SucceedsSlantEqual|NotLeftTriangleBar|RightTriangleEqual|SquareIntersection|RightDownTeeVector|ReverseEquilibrium|NegativeThickSpace|longleftrightarrow|Longleftrightarrow|LongLeftRightArrow|DownRightTeeVector|DownRightVectorBar|GreaterSlantEqual|SquareSubsetEqual|LeftDownVectorBar|LeftDoubleBracket|VerticalSeparator|rightleftharpoons|NotGreaterGreater|NotSquareSuperset|blacktriangleleft|blacktriangledown|NegativeThinSpace|LeftDownTeeVector|NotLessSlantEqual|leftrightharpoons|DoubleUpDownArrow|DoubleVerticalBar|LeftTriangleEqual|FilledSmallSquare|twoheadrightarrow|NotNestedLessLess|DownLeftTeeVector|DownLeftVectorBar|RightAngleBracket|NotTildeFullEqual|NotReverseElement|RightUpDownVector|DiacriticalTilde|NotSucceedsTilde|circlearrowright|NotPrecedesEqual|rightharpoondown|DoubleRightArrow|NotSucceedsEqual|NonBreakingSpace|NotRightTriangle|LessEqualGreater|RightUpTeeVector|LeftAngleBracket|GreaterFullEqual|DownArrowUpArrow|RightUpVectorBar|twoheadleftarrow|GreaterEqualLess|downharpoonright|RightTriangleBar|ntrianglerighteq|NotSupersetEqual|LeftUpDownVector|DiacriticalAcute|rightrightarrows|vartriangleright|UpArrowDownArrow|DiacriticalGrave|UnderParenthesis|EmptySmallSquare|LeftUpVectorBar|leftrightarrows|DownRightVector|downharpoonleft|trianglerighteq|ShortRightArrow|OverParenthesis|DoubleLeftArrow|DoubleDownArrow|NotSquareSubset|bigtriangledown|ntrianglelefteq|UpperRightArrow|curvearrowright|vartriangleleft|NotLeftTriangle|nleftrightarrow|LowerRightArrow|NotHumpDownHump|NotGreaterTilde|rightthreetimes|LeftUpTeeVector|NotGreaterEqual|straightepsilon|LeftTriangleBar|rightsquigarrow|ContourIntegral|rightleftarrows|CloseCurlyQuote|RightDownVector|LeftRightVector|nLeftrightarrow|leftharpoondown|circlearrowleft|SquareSuperset|OpenCurlyQuote|hookrightarrow|HorizontalLine|DiacriticalDot|NotLessGreater|ntriangleright|DoubleRightTee|InvisibleComma|InvisibleTimes|LowerLeftArrow|DownLeftVector|NotSubsetEqual|curvearrowleft|trianglelefteq|NotVerticalBar|TildeFullEqual|downdownarrows|NotGreaterLess|RightTeeVector|ZeroWidthSpace|looparrowright|LongRightArrow|doublebarwedge|ShortLeftArrow|ShortDownArrow|RightVectorBar|GreaterGreater|ReverseElement|rightharpoonup|LessSlantEqual|leftthreetimes|upharpoonright|rightarrowtail|LeftDownVector|Longrightarrow|NestedLessLess|UpperLeftArrow|nshortparallel|leftleftarrows|leftrightarrow|Leftrightarrow|LeftRightArrow|longrightarrow|upharpoonleft|RightArrowBar|ApplyFunction|LeftTeeVector|leftarrowtail|NotEqualTilde|varsubsetneqq|varsupsetneqq|RightTeeArrow|SucceedsEqual|SucceedsTilde|LeftVectorBar|SupersetEqual|hookleftarrow|DifferentialD|VerticalTilde|VeryThinSpace|blacktriangle|bigtriangleup|LessFullEqual|divideontimes|leftharpoonup|UpEquilibrium|ntriangleleft|RightTriangle|measuredangle|shortparallel|longleftarrow|Longleftarrow|LongLeftArrow|DoubleLeftTee|Poincareplane|PrecedesEqual|triangleright|DoubleUpArrow|RightUpVector|fallingdotseq|looparrowleft|PrecedesTilde|NotTildeEqual|NotTildeTilde|smallsetminus|Proportional|triangleleft|triangledown|UnderBracket|NotHumpEqual|exponentiale|ExponentialE|NotLessTilde|HilbertSpace|RightCeiling|blacklozenge|varsupsetneq|HumpDownHump|GreaterEqual|VerticalLine|LeftTeeArrow|NotLessEqual|DownTeeArrow|LeftTriangle|varsubsetneq|Intersection|NotCongruent|DownArrowBar|LeftUpVector|LeftArrowBar|risingdotseq|GreaterTilde|RoundImplies|SquareSubset|ShortUpArrow|NotSuperset|quaternions|precnapprox|backepsilon|preccurlyeq|OverBracket|blacksquare|MediumSpace|VerticalBar|circledcirc|circleddash|CircleMinus|CircleTimes|LessGreater|curlyeqprec|curlyeqsucc|diamondsuit|UpDownArrow|Updownarrow|RuleDelayed|Rrightarrow|updownarrow|RightVector|nRightarrow|nrightarrow|eqslantless|LeftCeiling|Equilibrium|SmallCircle|expectation|NotSucceeds|thickapprox|GreaterLess|SquareUnion|NotPrecedes|NotLessLess|straightphi|succnapprox|succcurlyeq|SubsetEqual|sqsupseteq|Proportion|Laplacetrf|ImaginaryI|supsetneqq|NotGreater|gtreqqless|NotElement|ThickSpace|TildeEqual|TildeTilde|Fouriertrf|rmoustache|EqualTilde|eqslantgtr|UnderBrace|LeftVector|UpArrowBar|nLeftarrow|nsubseteqq|subsetneqq|nsupseteqq|nleftarrow|succapprox|lessapprox|UpTeeArrow|upuparrows|curlywedge|lesseqqgtr|varepsilon|varnothing|RightFloor|complement|CirclePlus|sqsubseteq|Lleftarrow|circledast|RightArrow|Rightarrow|rightarrow|lmoustache|Bernoullis|precapprox|mapstoleft|mapstodown|longmapsto|dotsquare|downarrow|DoubleDot|nsubseteq|supsetneq|leftarrow|nsupseteq|subsetneq|ThinSpace|ngeqslant|subseteqq|HumpEqual|NotSubset|triangleq|NotCupCap|lesseqgtr|heartsuit|TripleDot|Leftarrow|Coproduct|Congruent|varpropto|complexes|gvertneqq|LeftArrow|LessTilde|supseteqq|MinusPlus|CircleDot|nleqslant|NotExists|gtreqless|nparallel|UnionPlus|LeftFloor|checkmark|CenterDot|centerdot|Mellintrf|gtrapprox|bigotimes|OverBrace|spadesuit|therefore|pitchfork|rationals|PlusMinus|Backslash|Therefore|DownBreve|backsimeq|backprime|DownArrow|nshortmid|Downarrow|lvertneqq|eqvparsl|imagline|imagpart|infintie|integers|Integral|intercal|LessLess|Uarrocir|intlarhk|sqsupset|angmsdaf|sqsubset|llcorner|vartheta|cupbrcap|lnapprox|Superset|SuchThat|succnsim|succneqq|angmsdag|biguplus|curlyvee|trpezium|Succeeds|NotTilde|bigwedge|angmsdah|angrtvbd|triminus|cwconint|fpartint|lrcorner|smeparsl|subseteq|urcorner|lurdshar|laemptyv|DDotrahd|approxeq|ldrushar|awconint|mapstoup|backcong|shortmid|triangle|geqslant|gesdotol|timesbar|circledR|circledS|setminus|multimap|naturals|scpolint|ncongdot|RightTee|boxminus|gnapprox|boxtimes|andslope|thicksim|angmsdaa|varsigma|cirfnint|rtriltri|angmsdab|rppolint|angmsdac|barwedge|drbkarow|clubsuit|thetasym|bsolhsub|capbrcup|dzigrarr|doteqdot|DotEqual|dotminus|UnderBar|NotEqual|realpart|otimesas|ulcorner|hksearow|hkswarow|parallel|PartialD|elinters|emptyset|plusacir|bbrktbrk|angmsdad|pointint|bigoplus|angmsdae|Precedes|bigsqcup|varkappa|notindot|supseteq|precneqq|precnsim|profalar|profline|profsurf|leqslant|lesdotor|raemptyv|subplus|notnivb|notnivc|subrarr|zigrarr|vzigzag|submult|subedot|Element|between|cirscir|larrbfs|larrsim|lotimes|lbrksld|lbrkslu|lozenge|ldrdhar|dbkarow|bigcirc|epsilon|simrarr|simplus|ltquest|Epsilon|luruhar|gtquest|maltese|npolint|eqcolon|npreceq|bigodot|ddagger|gtrless|bnequiv|harrcir|ddotseq|equivDD|backsim|demptyv|nsqsube|nsqsupe|Upsilon|nsubset|upsilon|minusdu|nsucceq|swarrow|nsupset|coloneq|searrow|boxplus|napprox|natural|asympeq|alefsym|congdot|nearrow|bigstar|diamond|supplus|tritime|LeftTee|nvinfin|triplus|NewLine|nvltrie|nvrtrie|nwarrow|nexists|Diamond|ruluhar|Implies|supmult|angzarr|suplarr|suphsub|questeq|because|digamma|Because|olcross|bemptyv|omicron|Omicron|rotimes|NoBreak|intprod|angrtvb|orderof|uwangle|suphsol|lesdoto|orslope|DownTee|realine|cudarrl|rdldhar|OverBar|supedot|lessdot|supdsub|topfork|succsim|rbrkslu|rbrksld|pertenk|cudarrr|isindot|planckh|lessgtr|pluscir|gesdoto|plussim|plustwo|lesssim|cularrp|rarrsim|Cayleys|notinva|notinvb|notinvc|UpArrow|Uparrow|uparrow|NotLess|dwangle|precsim|Product|curarrm|Cconint|dotplus|rarrbfs|ccupssm|Cedilla|cemptyv|notniva|quatint|frac35|frac38|frac45|frac56|frac58|frac78|tridot|xoplus|gacute|gammad|Gammad|lfisht|lfloor|bigcup|sqsupe|gbreve|Gbreve|lharul|sqsube|sqcups|Gcedil|apacir|llhard|lmidot|Lmidot|lmoust|andand|sqcaps|approx|Abreve|spades|circeq|tprime|divide|topcir|Assign|topbot|gesdot|divonx|xuplus|timesd|gesles|atilde|solbar|SOFTcy|loplus|timesb|lowast|lowbar|dlcorn|dlcrop|softcy|dollar|lparlt|thksim|lrhard|Atilde|lsaquo|smashp|bigvee|thinsp|wreath|bkarow|lsquor|lstrok|Lstrok|lthree|ltimes|ltlarr|DotDot|simdot|ltrPar|weierp|xsqcup|angmsd|sigmav|sigmaf|zeetrf|Zcaron|zcaron|mapsto|vsupne|thetav|cirmid|marker|mcomma|Zacute|vsubnE|there4|gtlPar|vsubne|bottom|gtrarr|SHCHcy|shchcy|midast|midcir|middot|minusb|minusd|gtrdot|bowtie|sfrown|mnplus|models|colone|seswar|Colone|mstpos|searhk|gtrsim|nacute|Nacute|boxbox|telrec|hairsp|Tcedil|nbumpe|scnsim|ncaron|Ncaron|ncedil|Ncedil|hamilt|Scedil|nearhk|hardcy|HARDcy|tcedil|Tcaron|commat|nequiv|nesear|tcaron|target|hearts|nexist|varrho|scedil|Scaron|scaron|hellip|Sacute|sacute|hercon|swnwar|compfn|rtimes|rthree|rsquor|rsaquo|zacute|wedgeq|homtht|barvee|barwed|Barwed|rpargt|horbar|conint|swarhk|roplus|nltrie|hslash|hstrok|Hstrok|rmoust|Conint|bprime|hybull|hyphen|iacute|Iacute|supsup|supsub|supsim|varphi|coprod|brvbar|agrave|Supset|supset|igrave|Igrave|notinE|Agrave|iiiint|iinfin|copysr|wedbar|Verbar|vangrt|becaus|incare|verbar|inodot|bullet|drcorn|intcal|drcrop|cularr|vellip|Utilde|bumpeq|cupcap|dstrok|Dstrok|CupCap|cupcup|cupdot|eacute|Eacute|supdot|iquest|easter|ecaron|Ecaron|ecolon|isinsv|utilde|itilde|Itilde|curarr|succeq|Bumpeq|cacute|ulcrop|nparsl|Cacute|nprcue|egrave|Egrave|nrarrc|nrarrw|subsup|subsub|nrtrie|jsercy|nsccue|Jsercy|kappav|kcedil|Kcedil|subsim|ulcorn|nsimeq|egsdot|veebar|kgreen|capand|elsdot|Subset|subset|curren|aacute|lacute|Lacute|emptyv|ntilde|Ntilde|lagran|lambda|Lambda|capcap|Ugrave|langle|subdot|emsp13|numero|emsp14|nvdash|nvDash|nVdash|nVDash|ugrave|ufisht|nvHarr|larrfs|nvlArr|larrhk|larrlp|larrpl|nvrArr|Udblac|nwarhk|larrtl|nwnear|oacute|Oacute|latail|lAtail|sstarf|lbrace|odblac|Odblac|lbrack|udblac|odsold|eparsl|lcaron|Lcaron|ograve|Ograve|lcedil|Lcedil|Aacute|ssmile|ssetmn|squarf|ldquor|capcup|ominus|cylcty|rharul|eqcirc|dagger|rfloor|rfisht|Dagger|daleth|equals|origof|capdot|equest|dcaron|Dcaron|rdquor|oslash|Oslash|otilde|Otilde|otimes|Otimes|urcrop|Ubreve|ubreve|Yacute|Uacute|uacute|Rcedil|rcedil|urcorn|parsim|Rcaron|Vdashl|rcaron|Tstrok|percnt|period|permil|Exists|yacute|rbrack|rbrace|phmmat|ccaron|Ccaron|planck|ccedil|plankv|tstrok|female|plusdo|plusdu|ffilig|plusmn|ffllig|Ccedil|rAtail|dfisht|bernou|ratail|Rarrtl|rarrtl|angsph|rarrpl|rarrlp|rarrhk|xwedge|xotime|forall|ForAll|Vvdash|vsupnE|preceq|bigcap|frac12|frac13|frac14|primes|rarrfs|prnsim|frac15|Square|frac16|square|lesdot|frac18|frac23|propto|prurel|rarrap|rangle|puncsp|frac25|Racute|qprime|racute|lesges|frac34|abreve|AElig|eqsim|utdot|setmn|urtri|Equal|Uring|seArr|uring|searr|dashv|Dashv|mumap|nabla|iogon|Iogon|sdote|sdotb|scsim|napid|napos|equiv|natur|Acirc|dblac|erarr|nbump|iprod|erDot|ucirc|awint|esdot|angrt|ncong|isinE|scnap|Scirc|scirc|ndash|isins|Ubrcy|nearr|neArr|isinv|nedot|ubrcy|acute|Ycirc|iukcy|Iukcy|xutri|nesim|caret|jcirc|Jcirc|caron|twixt|ddarr|sccue|exist|jmath|sbquo|ngeqq|angst|ccaps|lceil|ngsim|UpTee|delta|Delta|rtrif|nharr|nhArr|nhpar|rtrie|jukcy|Jukcy|kappa|rsquo|Kappa|nlarr|nlArr|TSHcy|rrarr|aogon|Aogon|fflig|xrarr|tshcy|ccirc|nleqq|filig|upsih|nless|dharl|nlsim|fjlig|ropar|nltri|dharr|robrk|roarr|fllig|fltns|roang|rnmid|subnE|subne|lAarr|trisb|Ccirc|acirc|ccups|blank|VDash|forkv|Vdash|langd|cedil|blk12|blk14|laquo|strns|diams|notin|vDash|larrb|blk34|block|disin|uplus|vdash|vBarv|aelig|starf|Wedge|check|xrArr|lates|lbarr|lBarr|notni|lbbrk|bcong|frasl|lbrke|frown|vrtri|vprop|vnsup|gamma|Gamma|wedge|xodot|bdquo|srarr|doteq|ldquo|boxdl|boxdL|gcirc|Gcirc|boxDl|boxDL|boxdr|boxdR|boxDr|TRADE|trade|rlhar|boxDR|vnsub|npart|vltri|rlarr|boxhd|boxhD|nprec|gescc|nrarr|nrArr|boxHd|boxHD|boxhu|boxhU|nrtri|boxHu|clubs|boxHU|times|colon|Colon|gimel|xlArr|Tilde|nsime|tilde|nsmid|nspar|THORN|thorn|xlarr|nsube|nsubE|thkap|xhArr|comma|nsucc|boxul|boxuL|nsupe|nsupE|gneqq|gnsim|boxUl|boxUL|grave|boxur|boxuR|boxUr|boxUR|lescc|angle|bepsi|boxvh|varpi|boxvH|numsp|Theta|gsime|gsiml|theta|boxVh|boxVH|boxvl|gtcir|gtdot|boxvL|boxVl|boxVL|crarr|cross|Cross|nvsim|boxvr|nwarr|nwArr|sqsup|dtdot|Uogon|lhard|lharu|dtrif|ocirc|Ocirc|lhblk|duarr|odash|sqsub|Hacek|sqcup|llarr|duhar|oelig|OElig|ofcir|boxvR|uogon|lltri|boxVr|csube|uuarr|ohbar|csupe|ctdot|olarr|olcir|harrw|oline|sqcap|omacr|Omacr|omega|Omega|boxVR|aleph|lneqq|lnsim|loang|loarr|rharu|lobrk|hcirc|operp|oplus|rhard|Hcirc|orarr|Union|order|ecirc|Ecirc|cuepr|szlig|cuesc|breve|reals|eDDot|Breve|hoarr|lopar|utrif|rdquo|Umacr|umacr|efDot|swArr|ultri|alpha|rceil|ovbar|swarr|Wcirc|wcirc|smtes|smile|bsemi|lrarr|aring|parsl|lrhar|bsime|uhblk|lrtri|cupor|Aring|uharr|uharl|slarr|rbrke|bsolb|lsime|rbbrk|RBarr|lsimg|phone|rBarr|rbarr|icirc|lsquo|Icirc|emacr|Emacr|ratio|simne|plusb|simlE|simgE|simeq|pluse|ltcir|ltdot|empty|xharr|xdtri|iexcl|Alpha|ltrie|rarrw|pound|ltrif|xcirc|bumpe|prcue|bumpE|asymp|amacr|cuvee|Sigma|sigma|iiint|udhar|iiota|ijlig|IJlig|supnE|imacr|Imacr|prime|Prime|image|prnap|eogon|Eogon|rarrc|mdash|mDDot|cuwed|imath|supne|imped|Amacr|udarr|prsim|micro|rarrb|cwint|raquo|infin|eplus|range|rangd|Ucirc|radic|minus|amalg|veeeq|rAarr|epsiv|ycirc|quest|sharp|quot|zwnj|Qscr|race|qscr|Qopf|qopf|qint|rang|Rang|Zscr|zscr|Zopf|zopf|rarr|rArr|Rarr|Pscr|pscr|prop|prod|prnE|prec|ZHcy|zhcy|prap|Zeta|zeta|Popf|popf|Zdot|plus|zdot|Yuml|yuml|phiv|YUcy|yucy|Yscr|yscr|perp|Yopf|yopf|part|para|YIcy|Ouml|rcub|yicy|YAcy|rdca|ouml|osol|Oscr|rdsh|yacy|real|oscr|xvee|andd|rect|andv|Xscr|oror|ordm|ordf|xscr|ange|aopf|Aopf|rHar|Xopf|opar|Oopf|xopf|xnis|rhov|oopf|omid|xmap|oint|apid|apos|ogon|ascr|Ascr|odot|odiv|xcup|xcap|ocir|oast|nvlt|nvle|nvgt|nvge|nvap|Wscr|wscr|auml|ntlg|ntgl|nsup|nsub|nsim|Nscr|nscr|nsce|Wopf|ring|npre|wopf|npar|Auml|Barv|bbrk|Nopf|nopf|nmid|nLtv|beta|ropf|Ropf|Beta|beth|nles|rpar|nleq|bnot|bNot|nldr|NJcy|rscr|Rscr|Vscr|vscr|rsqb|njcy|bopf|nisd|Bopf|rtri|Vopf|nGtv|ngtr|vopf|boxh|boxH|boxv|nges|ngeq|boxV|bscr|scap|Bscr|bsim|Vert|vert|bsol|bull|bump|caps|cdot|ncup|scnE|ncap|nbsp|napE|Cdot|cent|sdot|Vbar|nang|vBar|chcy|Mscr|mscr|sect|semi|CHcy|Mopf|mopf|sext|circ|cire|mldr|mlcp|cirE|comp|shcy|SHcy|vArr|varr|cong|copf|Copf|copy|COPY|malt|male|macr|lvnE|cscr|ltri|sime|ltcc|simg|Cscr|siml|csub|Uuml|lsqb|lsim|uuml|csup|Lscr|lscr|utri|smid|lpar|cups|smte|lozf|darr|Lopf|Uscr|solb|lopf|sopf|Sopf|lneq|uscr|spar|dArr|lnap|Darr|dash|Sqrt|LJcy|ljcy|lHar|dHar|Upsi|upsi|diam|lesg|djcy|DJcy|leqq|dopf|Dopf|dscr|Dscr|dscy|ldsh|ldca|squf|DScy|sscr|Sscr|dsol|lcub|late|star|Star|Uopf|Larr|lArr|larr|uopf|dtri|dzcy|sube|subE|Lang|lang|Kscr|kscr|Kopf|kopf|KJcy|kjcy|KHcy|khcy|DZcy|ecir|edot|eDot|Jscr|jscr|succ|Jopf|jopf|Edot|uHar|emsp|ensp|Iuml|iuml|eopf|isin|Iscr|iscr|Eopf|epar|sung|epsi|escr|sup1|sup2|sup3|Iota|iota|supe|supE|Iopf|iopf|IOcy|iocy|Escr|esim|Esim|imof|Uarr|QUOT|uArr|uarr|euml|IEcy|iecy|Idot|Euml|euro|excl|Hscr|hscr|Hopf|hopf|TScy|tscy|Tscr|hbar|tscr|flat|tbrk|fnof|hArr|harr|half|fopf|Fopf|tdot|gvnE|fork|trie|gtcc|fscr|Fscr|gdot|gsim|Gscr|gscr|Gopf|gopf|gneq|Gdot|tosa|gnap|Topf|topf|geqq|toea|GJcy|gjcy|tint|gesl|mid|Sfr|ggg|top|ges|gla|glE|glj|geq|gne|gEl|gel|gnE|Gcy|gcy|gap|Tfr|tfr|Tcy|tcy|Hat|Tau|Ffr|tau|Tab|hfr|Hfr|ffr|Fcy|fcy|icy|Icy|iff|ETH|eth|ifr|Ifr|Eta|eta|int|Int|Sup|sup|ucy|Ucy|Sum|sum|jcy|ENG|ufr|Ufr|eng|Jcy|jfr|els|ell|egs|Efr|efr|Jfr|uml|kcy|Kcy|Ecy|ecy|kfr|Kfr|lap|Sub|sub|lat|lcy|Lcy|leg|Dot|dot|lEg|leq|les|squ|div|die|lfr|Lfr|lgE|Dfr|dfr|Del|deg|Dcy|dcy|lne|lnE|sol|loz|smt|Cup|lrm|cup|lsh|Lsh|sim|shy|map|Map|mcy|Mcy|mfr|Mfr|mho|gfr|Gfr|sfr|cir|Chi|chi|nap|Cfr|vcy|Vcy|cfr|Scy|scy|ncy|Ncy|vee|Vee|Cap|cap|nfr|scE|sce|Nfr|nge|ngE|nGg|vfr|Vfr|ngt|bot|nGt|nis|niv|Rsh|rsh|nle|nlE|bne|Bfr|bfr|nLl|nlt|nLt|Bcy|bcy|not|Not|rlm|wfr|Wfr|npr|nsc|num|ocy|ast|Ocy|ofr|xfr|Xfr|Ofr|ogt|ohm|apE|olt|Rho|ape|rho|Rfr|rfr|ord|REG|ang|reg|orv|And|and|AMP|Rcy|amp|Afr|ycy|Ycy|yen|yfr|Yfr|rcy|par|pcy|Pcy|pfr|Pfr|phi|Phi|afr|Acy|acy|zcy|Zcy|piv|acE|acd|zfr|Zfr|pre|prE|psi|Psi|qfr|Qfr|zwj|Or|ge|Gg|gt|gg|el|oS|lt|Lt|LT|Re|lg|gl|eg|ne|Im|it|le|DD|wp|wr|nu|Nu|dd|lE|Sc|sc|pi|Pi|ee|af|ll|Ll|rx|gE|xi|pm|Xi|ic|pr|Pr|in|ni|mp|mu|ac|Mu|or|ap|Gt|GT|ii);|&(Aacute|Agrave|Atilde|Ccedil|Eacute|Egrave|Iacute|Igrave|Ntilde|Oacute|Ograve|Oslash|Otilde|Uacute|Ugrave|Yacute|aacute|agrave|atilde|brvbar|ccedil|curren|divide|eacute|egrave|frac12|frac14|frac34|iacute|igrave|iquest|middot|ntilde|oacute|ograve|oslash|otilde|plusmn|uacute|ugrave|yacute|AElig|Acirc|Aring|Ecirc|Icirc|Ocirc|THORN|Ucirc|acirc|acute|aelig|aring|cedil|ecirc|icirc|iexcl|laquo|micro|ocirc|pound|raquo|szlig|thorn|times|ucirc|Auml|COPY|Euml|Iuml|Ouml|QUOT|Uuml|auml|cent|copy|euml|iuml|macr|nbsp|ordf|ordm|ouml|para|quot|sect|sup1|sup2|sup3|uuml|yuml|AMP|ETH|REG|amp|deg|eth|not|reg|shy|uml|yen|GT|LT|gt|lt)(?!;)([=a-zA-Z0-9]?)|&#([0-9]+)(;?)|&#[xX]([a-fA-F0-9]+)(;?)|&([0-9a-zA-Z]+)/g;
  var decodeMap = {
    'aacute': '\xE1',
    'Aacute': '\xC1',
    'abreve': '\u0103',
    'Abreve': '\u0102',
    'ac': '\u223E',
    'acd': '\u223F',
    'acE': '\u223E\u0333',
    'acirc': '\xE2',
    'Acirc': '\xC2',
    'acute': '\xB4',
    'acy': '\u0430',
    'Acy': '\u0410',
    'aelig': '\xE6',
    'AElig': '\xC6',
    'af': '\u2061',
    'afr': '\uD835\uDD1E',
    'Afr': '\uD835\uDD04',
    'agrave': '\xE0',
    'Agrave': '\xC0',
    'alefsym': '\u2135',
    'aleph': '\u2135',
    'alpha': '\u03B1',
    'Alpha': '\u0391',
    'amacr': '\u0101',
    'Amacr': '\u0100',
    'amalg': '\u2A3F',
    'amp': '&',
    'AMP': '&',
    'and': '\u2227',
    'And': '\u2A53',
    'andand': '\u2A55',
    'andd': '\u2A5C',
    'andslope': '\u2A58',
    'andv': '\u2A5A',
    'ang': '\u2220',
    'ange': '\u29A4',
    'angle': '\u2220',
    'angmsd': '\u2221',
    'angmsdaa': '\u29A8',
    'angmsdab': '\u29A9',
    'angmsdac': '\u29AA',
    'angmsdad': '\u29AB',
    'angmsdae': '\u29AC',
    'angmsdaf': '\u29AD',
    'angmsdag': '\u29AE',
    'angmsdah': '\u29AF',
    'angrt': '\u221F',
    'angrtvb': '\u22BE',
    'angrtvbd': '\u299D',
    'angsph': '\u2222',
    'angst': '\xC5',
    'angzarr': '\u237C',
    'aogon': '\u0105',
    'Aogon': '\u0104',
    'aopf': '\uD835\uDD52',
    'Aopf': '\uD835\uDD38',
    'ap': '\u2248',
    'apacir': '\u2A6F',
    'ape': '\u224A',
    'apE': '\u2A70',
    'apid': '\u224B',
    'apos': '\'',
    'ApplyFunction': '\u2061',
    'approx': '\u2248',
    'approxeq': '\u224A',
    'aring': '\xE5',
    'Aring': '\xC5',
    'ascr': '\uD835\uDCB6',
    'Ascr': '\uD835\uDC9C',
    'Assign': '\u2254',
    'ast': '*',
    'asymp': '\u2248',
    'asympeq': '\u224D',
    'atilde': '\xE3',
    'Atilde': '\xC3',
    'auml': '\xE4',
    'Auml': '\xC4',
    'awconint': '\u2233',
    'awint': '\u2A11',
    'backcong': '\u224C',
    'backepsilon': '\u03F6',
    'backprime': '\u2035',
    'backsim': '\u223D',
    'backsimeq': '\u22CD',
    'Backslash': '\u2216',
    'Barv': '\u2AE7',
    'barvee': '\u22BD',
    'barwed': '\u2305',
    'Barwed': '\u2306',
    'barwedge': '\u2305',
    'bbrk': '\u23B5',
    'bbrktbrk': '\u23B6',
    'bcong': '\u224C',
    'bcy': '\u0431',
    'Bcy': '\u0411',
    'bdquo': '\u201E',
    'becaus': '\u2235',
    'because': '\u2235',
    'Because': '\u2235',
    'bemptyv': '\u29B0',
    'bepsi': '\u03F6',
    'bernou': '\u212C',
    'Bernoullis': '\u212C',
    'beta': '\u03B2',
    'Beta': '\u0392',
    'beth': '\u2136',
    'between': '\u226C',
    'bfr': '\uD835\uDD1F',
    'Bfr': '\uD835\uDD05',
    'bigcap': '\u22C2',
    'bigcirc': '\u25EF',
    'bigcup': '\u22C3',
    'bigodot': '\u2A00',
    'bigoplus': '\u2A01',
    'bigotimes': '\u2A02',
    'bigsqcup': '\u2A06',
    'bigstar': '\u2605',
    'bigtriangledown': '\u25BD',
    'bigtriangleup': '\u25B3',
    'biguplus': '\u2A04',
    'bigvee': '\u22C1',
    'bigwedge': '\u22C0',
    'bkarow': '\u290D',
    'blacklozenge': '\u29EB',
    'blacksquare': '\u25AA',
    'blacktriangle': '\u25B4',
    'blacktriangledown': '\u25BE',
    'blacktriangleleft': '\u25C2',
    'blacktriangleright': '\u25B8',
    'blank': '\u2423',
    'blk12': '\u2592',
    'blk14': '\u2591',
    'blk34': '\u2593',
    'block': '\u2588',
    'bne': '=\u20E5',
    'bnequiv': '\u2261\u20E5',
    'bnot': '\u2310',
    'bNot': '\u2AED',
    'bopf': '\uD835\uDD53',
    'Bopf': '\uD835\uDD39',
    'bot': '\u22A5',
    'bottom': '\u22A5',
    'bowtie': '\u22C8',
    'boxbox': '\u29C9',
    'boxdl': '\u2510',
    'boxdL': '\u2555',
    'boxDl': '\u2556',
    'boxDL': '\u2557',
    'boxdr': '\u250C',
    'boxdR': '\u2552',
    'boxDr': '\u2553',
    'boxDR': '\u2554',
    'boxh': '\u2500',
    'boxH': '\u2550',
    'boxhd': '\u252C',
    'boxhD': '\u2565',
    'boxHd': '\u2564',
    'boxHD': '\u2566',
    'boxhu': '\u2534',
    'boxhU': '\u2568',
    'boxHu': '\u2567',
    'boxHU': '\u2569',
    'boxminus': '\u229F',
    'boxplus': '\u229E',
    'boxtimes': '\u22A0',
    'boxul': '\u2518',
    'boxuL': '\u255B',
    'boxUl': '\u255C',
    'boxUL': '\u255D',
    'boxur': '\u2514',
    'boxuR': '\u2558',
    'boxUr': '\u2559',
    'boxUR': '\u255A',
    'boxv': '\u2502',
    'boxV': '\u2551',
    'boxvh': '\u253C',
    'boxvH': '\u256A',
    'boxVh': '\u256B',
    'boxVH': '\u256C',
    'boxvl': '\u2524',
    'boxvL': '\u2561',
    'boxVl': '\u2562',
    'boxVL': '\u2563',
    'boxvr': '\u251C',
    'boxvR': '\u255E',
    'boxVr': '\u255F',
    'boxVR': '\u2560',
    'bprime': '\u2035',
    'breve': '\u02D8',
    'Breve': '\u02D8',
    'brvbar': '\xA6',
    'bscr': '\uD835\uDCB7',
    'Bscr': '\u212C',
    'bsemi': '\u204F',
    'bsim': '\u223D',
    'bsime': '\u22CD',
    'bsol': '\\',
    'bsolb': '\u29C5',
    'bsolhsub': '\u27C8',
    'bull': '\u2022',
    'bullet': '\u2022',
    'bump': '\u224E',
    'bumpe': '\u224F',
    'bumpE': '\u2AAE',
    'bumpeq': '\u224F',
    'Bumpeq': '\u224E',
    'cacute': '\u0107',
    'Cacute': '\u0106',
    'cap': '\u2229',
    'Cap': '\u22D2',
    'capand': '\u2A44',
    'capbrcup': '\u2A49',
    'capcap': '\u2A4B',
    'capcup': '\u2A47',
    'capdot': '\u2A40',
    'CapitalDifferentialD': '\u2145',
    'caps': '\u2229\uFE00',
    'caret': '\u2041',
    'caron': '\u02C7',
    'Cayleys': '\u212D',
    'ccaps': '\u2A4D',
    'ccaron': '\u010D',
    'Ccaron': '\u010C',
    'ccedil': '\xE7',
    'Ccedil': '\xC7',
    'ccirc': '\u0109',
    'Ccirc': '\u0108',
    'Cconint': '\u2230',
    'ccups': '\u2A4C',
    'ccupssm': '\u2A50',
    'cdot': '\u010B',
    'Cdot': '\u010A',
    'cedil': '\xB8',
    'Cedilla': '\xB8',
    'cemptyv': '\u29B2',
    'cent': '\xA2',
    'centerdot': '\xB7',
    'CenterDot': '\xB7',
    'cfr': '\uD835\uDD20',
    'Cfr': '\u212D',
    'chcy': '\u0447',
    'CHcy': '\u0427',
    'check': '\u2713',
    'checkmark': '\u2713',
    'chi': '\u03C7',
    'Chi': '\u03A7',
    'cir': '\u25CB',
    'circ': '\u02C6',
    'circeq': '\u2257',
    'circlearrowleft': '\u21BA',
    'circlearrowright': '\u21BB',
    'circledast': '\u229B',
    'circledcirc': '\u229A',
    'circleddash': '\u229D',
    'CircleDot': '\u2299',
    'circledR': '\xAE',
    'circledS': '\u24C8',
    'CircleMinus': '\u2296',
    'CirclePlus': '\u2295',
    'CircleTimes': '\u2297',
    'cire': '\u2257',
    'cirE': '\u29C3',
    'cirfnint': '\u2A10',
    'cirmid': '\u2AEF',
    'cirscir': '\u29C2',
    'ClockwiseContourIntegral': '\u2232',
    'CloseCurlyDoubleQuote': '\u201D',
    'CloseCurlyQuote': '\u2019',
    'clubs': '\u2663',
    'clubsuit': '\u2663',
    'colon': ':',
    'Colon': '\u2237',
    'colone': '\u2254',
    'Colone': '\u2A74',
    'coloneq': '\u2254',
    'comma': ',',
    'commat': '@',
    'comp': '\u2201',
    'compfn': '\u2218',
    'complement': '\u2201',
    'complexes': '\u2102',
    'cong': '\u2245',
    'congdot': '\u2A6D',
    'Congruent': '\u2261',
    'conint': '\u222E',
    'Conint': '\u222F',
    'ContourIntegral': '\u222E',
    'copf': '\uD835\uDD54',
    'Copf': '\u2102',
    'coprod': '\u2210',
    'Coproduct': '\u2210',
    'copy': '\xA9',
    'COPY': '\xA9',
    'copysr': '\u2117',
    'CounterClockwiseContourIntegral': '\u2233',
    'crarr': '\u21B5',
    'cross': '\u2717',
    'Cross': '\u2A2F',
    'cscr': '\uD835\uDCB8',
    'Cscr': '\uD835\uDC9E',
    'csub': '\u2ACF',
    'csube': '\u2AD1',
    'csup': '\u2AD0',
    'csupe': '\u2AD2',
    'ctdot': '\u22EF',
    'cudarrl': '\u2938',
    'cudarrr': '\u2935',
    'cuepr': '\u22DE',
    'cuesc': '\u22DF',
    'cularr': '\u21B6',
    'cularrp': '\u293D',
    'cup': '\u222A',
    'Cup': '\u22D3',
    'cupbrcap': '\u2A48',
    'cupcap': '\u2A46',
    'CupCap': '\u224D',
    'cupcup': '\u2A4A',
    'cupdot': '\u228D',
    'cupor': '\u2A45',
    'cups': '\u222A\uFE00',
    'curarr': '\u21B7',
    'curarrm': '\u293C',
    'curlyeqprec': '\u22DE',
    'curlyeqsucc': '\u22DF',
    'curlyvee': '\u22CE',
    'curlywedge': '\u22CF',
    'curren': '\xA4',
    'curvearrowleft': '\u21B6',
    'curvearrowright': '\u21B7',
    'cuvee': '\u22CE',
    'cuwed': '\u22CF',
    'cwconint': '\u2232',
    'cwint': '\u2231',
    'cylcty': '\u232D',
    'dagger': '\u2020',
    'Dagger': '\u2021',
    'daleth': '\u2138',
    'darr': '\u2193',
    'dArr': '\u21D3',
    'Darr': '\u21A1',
    'dash': '\u2010',
    'dashv': '\u22A3',
    'Dashv': '\u2AE4',
    'dbkarow': '\u290F',
    'dblac': '\u02DD',
    'dcaron': '\u010F',
    'Dcaron': '\u010E',
    'dcy': '\u0434',
    'Dcy': '\u0414',
    'dd': '\u2146',
    'DD': '\u2145',
    'ddagger': '\u2021',
    'ddarr': '\u21CA',
    'DDotrahd': '\u2911',
    'ddotseq': '\u2A77',
    'deg': '\xB0',
    'Del': '\u2207',
    'delta': '\u03B4',
    'Delta': '\u0394',
    'demptyv': '\u29B1',
    'dfisht': '\u297F',
    'dfr': '\uD835\uDD21',
    'Dfr': '\uD835\uDD07',
    'dHar': '\u2965',
    'dharl': '\u21C3',
    'dharr': '\u21C2',
    'DiacriticalAcute': '\xB4',
    'DiacriticalDot': '\u02D9',
    'DiacriticalDoubleAcute': '\u02DD',
    'DiacriticalGrave': '`',
    'DiacriticalTilde': '\u02DC',
    'diam': '\u22C4',
    'diamond': '\u22C4',
    'Diamond': '\u22C4',
    'diamondsuit': '\u2666',
    'diams': '\u2666',
    'die': '\xA8',
    'DifferentialD': '\u2146',
    'digamma': '\u03DD',
    'disin': '\u22F2',
    'div': '\xF7',
    'divide': '\xF7',
    'divideontimes': '\u22C7',
    'divonx': '\u22C7',
    'djcy': '\u0452',
    'DJcy': '\u0402',
    'dlcorn': '\u231E',
    'dlcrop': '\u230D',
    'dollar': '$',
    'dopf': '\uD835\uDD55',
    'Dopf': '\uD835\uDD3B',
    'dot': '\u02D9',
    'Dot': '\xA8',
    'DotDot': '\u20DC',
    'doteq': '\u2250',
    'doteqdot': '\u2251',
    'DotEqual': '\u2250',
    'dotminus': '\u2238',
    'dotplus': '\u2214',
    'dotsquare': '\u22A1',
    'doublebarwedge': '\u2306',
    'DoubleContourIntegral': '\u222F',
    'DoubleDot': '\xA8',
    'DoubleDownArrow': '\u21D3',
    'DoubleLeftArrow': '\u21D0',
    'DoubleLeftRightArrow': '\u21D4',
    'DoubleLeftTee': '\u2AE4',
    'DoubleLongLeftArrow': '\u27F8',
    'DoubleLongLeftRightArrow': '\u27FA',
    'DoubleLongRightArrow': '\u27F9',
    'DoubleRightArrow': '\u21D2',
    'DoubleRightTee': '\u22A8',
    'DoubleUpArrow': '\u21D1',
    'DoubleUpDownArrow': '\u21D5',
    'DoubleVerticalBar': '\u2225',
    'downarrow': '\u2193',
    'Downarrow': '\u21D3',
    'DownArrow': '\u2193',
    'DownArrowBar': '\u2913',
    'DownArrowUpArrow': '\u21F5',
    'DownBreve': '\u0311',
    'downdownarrows': '\u21CA',
    'downharpoonleft': '\u21C3',
    'downharpoonright': '\u21C2',
    'DownLeftRightVector': '\u2950',
    'DownLeftTeeVector': '\u295E',
    'DownLeftVector': '\u21BD',
    'DownLeftVectorBar': '\u2956',
    'DownRightTeeVector': '\u295F',
    'DownRightVector': '\u21C1',
    'DownRightVectorBar': '\u2957',
    'DownTee': '\u22A4',
    'DownTeeArrow': '\u21A7',
    'drbkarow': '\u2910',
    'drcorn': '\u231F',
    'drcrop': '\u230C',
    'dscr': '\uD835\uDCB9',
    'Dscr': '\uD835\uDC9F',
    'dscy': '\u0455',
    'DScy': '\u0405',
    'dsol': '\u29F6',
    'dstrok': '\u0111',
    'Dstrok': '\u0110',
    'dtdot': '\u22F1',
    'dtri': '\u25BF',
    'dtrif': '\u25BE',
    'duarr': '\u21F5',
    'duhar': '\u296F',
    'dwangle': '\u29A6',
    'dzcy': '\u045F',
    'DZcy': '\u040F',
    'dzigrarr': '\u27FF',
    'eacute': '\xE9',
    'Eacute': '\xC9',
    'easter': '\u2A6E',
    'ecaron': '\u011B',
    'Ecaron': '\u011A',
    'ecir': '\u2256',
    'ecirc': '\xEA',
    'Ecirc': '\xCA',
    'ecolon': '\u2255',
    'ecy': '\u044D',
    'Ecy': '\u042D',
    'eDDot': '\u2A77',
    'edot': '\u0117',
    'eDot': '\u2251',
    'Edot': '\u0116',
    'ee': '\u2147',
    'efDot': '\u2252',
    'efr': '\uD835\uDD22',
    'Efr': '\uD835\uDD08',
    'eg': '\u2A9A',
    'egrave': '\xE8',
    'Egrave': '\xC8',
    'egs': '\u2A96',
    'egsdot': '\u2A98',
    'el': '\u2A99',
    'Element': '\u2208',
    'elinters': '\u23E7',
    'ell': '\u2113',
    'els': '\u2A95',
    'elsdot': '\u2A97',
    'emacr': '\u0113',
    'Emacr': '\u0112',
    'empty': '\u2205',
    'emptyset': '\u2205',
    'EmptySmallSquare': '\u25FB',
    'emptyv': '\u2205',
    'EmptyVerySmallSquare': '\u25AB',
    'emsp': '\u2003',
    'emsp13': '\u2004',
    'emsp14': '\u2005',
    'eng': '\u014B',
    'ENG': '\u014A',
    'ensp': '\u2002',
    'eogon': '\u0119',
    'Eogon': '\u0118',
    'eopf': '\uD835\uDD56',
    'Eopf': '\uD835\uDD3C',
    'epar': '\u22D5',
    'eparsl': '\u29E3',
    'eplus': '\u2A71',
    'epsi': '\u03B5',
    'epsilon': '\u03B5',
    'Epsilon': '\u0395',
    'epsiv': '\u03F5',
    'eqcirc': '\u2256',
    'eqcolon': '\u2255',
    'eqsim': '\u2242',
    'eqslantgtr': '\u2A96',
    'eqslantless': '\u2A95',
    'Equal': '\u2A75',
    'equals': '=',
    'EqualTilde': '\u2242',
    'equest': '\u225F',
    'Equilibrium': '\u21CC',
    'equiv': '\u2261',
    'equivDD': '\u2A78',
    'eqvparsl': '\u29E5',
    'erarr': '\u2971',
    'erDot': '\u2253',
    'escr': '\u212F',
    'Escr': '\u2130',
    'esdot': '\u2250',
    'esim': '\u2242',
    'Esim': '\u2A73',
    'eta': '\u03B7',
    'Eta': '\u0397',
    'eth': '\xF0',
    'ETH': '\xD0',
    'euml': '\xEB',
    'Euml': '\xCB',
    'euro': '\u20AC',
    'excl': '!',
    'exist': '\u2203',
    'Exists': '\u2203',
    'expectation': '\u2130',
    'exponentiale': '\u2147',
    'ExponentialE': '\u2147',
    'fallingdotseq': '\u2252',
    'fcy': '\u0444',
    'Fcy': '\u0424',
    'female': '\u2640',
    'ffilig': '\uFB03',
    'fflig': '\uFB00',
    'ffllig': '\uFB04',
    'ffr': '\uD835\uDD23',
    'Ffr': '\uD835\uDD09',
    'filig': '\uFB01',
    'FilledSmallSquare': '\u25FC',
    'FilledVerySmallSquare': '\u25AA',
    'fjlig': 'fj',
    'flat': '\u266D',
    'fllig': '\uFB02',
    'fltns': '\u25B1',
    'fnof': '\u0192',
    'fopf': '\uD835\uDD57',
    'Fopf': '\uD835\uDD3D',
    'forall': '\u2200',
    'ForAll': '\u2200',
    'fork': '\u22D4',
    'forkv': '\u2AD9',
    'Fouriertrf': '\u2131',
    'fpartint': '\u2A0D',
    'frac12': '\xBD',
    'frac13': '\u2153',
    'frac14': '\xBC',
    'frac15': '\u2155',
    'frac16': '\u2159',
    'frac18': '\u215B',
    'frac23': '\u2154',
    'frac25': '\u2156',
    'frac34': '\xBE',
    'frac35': '\u2157',
    'frac38': '\u215C',
    'frac45': '\u2158',
    'frac56': '\u215A',
    'frac58': '\u215D',
    'frac78': '\u215E',
    'frasl': '\u2044',
    'frown': '\u2322',
    'fscr': '\uD835\uDCBB',
    'Fscr': '\u2131',
    'gacute': '\u01F5',
    'gamma': '\u03B3',
    'Gamma': '\u0393',
    'gammad': '\u03DD',
    'Gammad': '\u03DC',
    'gap': '\u2A86',
    'gbreve': '\u011F',
    'Gbreve': '\u011E',
    'Gcedil': '\u0122',
    'gcirc': '\u011D',
    'Gcirc': '\u011C',
    'gcy': '\u0433',
    'Gcy': '\u0413',
    'gdot': '\u0121',
    'Gdot': '\u0120',
    'ge': '\u2265',
    'gE': '\u2267',
    'gel': '\u22DB',
    'gEl': '\u2A8C',
    'geq': '\u2265',
    'geqq': '\u2267',
    'geqslant': '\u2A7E',
    'ges': '\u2A7E',
    'gescc': '\u2AA9',
    'gesdot': '\u2A80',
    'gesdoto': '\u2A82',
    'gesdotol': '\u2A84',
    'gesl': '\u22DB\uFE00',
    'gesles': '\u2A94',
    'gfr': '\uD835\uDD24',
    'Gfr': '\uD835\uDD0A',
    'gg': '\u226B',
    'Gg': '\u22D9',
    'ggg': '\u22D9',
    'gimel': '\u2137',
    'gjcy': '\u0453',
    'GJcy': '\u0403',
    'gl': '\u2277',
    'gla': '\u2AA5',
    'glE': '\u2A92',
    'glj': '\u2AA4',
    'gnap': '\u2A8A',
    'gnapprox': '\u2A8A',
    'gne': '\u2A88',
    'gnE': '\u2269',
    'gneq': '\u2A88',
    'gneqq': '\u2269',
    'gnsim': '\u22E7',
    'gopf': '\uD835\uDD58',
    'Gopf': '\uD835\uDD3E',
    'grave': '`',
    'GreaterEqual': '\u2265',
    'GreaterEqualLess': '\u22DB',
    'GreaterFullEqual': '\u2267',
    'GreaterGreater': '\u2AA2',
    'GreaterLess': '\u2277',
    'GreaterSlantEqual': '\u2A7E',
    'GreaterTilde': '\u2273',
    'gscr': '\u210A',
    'Gscr': '\uD835\uDCA2',
    'gsim': '\u2273',
    'gsime': '\u2A8E',
    'gsiml': '\u2A90',
    'gt': '>',
    'Gt': '\u226B',
    'GT': '>',
    'gtcc': '\u2AA7',
    'gtcir': '\u2A7A',
    'gtdot': '\u22D7',
    'gtlPar': '\u2995',
    'gtquest': '\u2A7C',
    'gtrapprox': '\u2A86',
    'gtrarr': '\u2978',
    'gtrdot': '\u22D7',
    'gtreqless': '\u22DB',
    'gtreqqless': '\u2A8C',
    'gtrless': '\u2277',
    'gtrsim': '\u2273',
    'gvertneqq': '\u2269\uFE00',
    'gvnE': '\u2269\uFE00',
    'Hacek': '\u02C7',
    'hairsp': '\u200A',
    'half': '\xBD',
    'hamilt': '\u210B',
    'hardcy': '\u044A',
    'HARDcy': '\u042A',
    'harr': '\u2194',
    'hArr': '\u21D4',
    'harrcir': '\u2948',
    'harrw': '\u21AD',
    'Hat': '^',
    'hbar': '\u210F',
    'hcirc': '\u0125',
    'Hcirc': '\u0124',
    'hearts': '\u2665',
    'heartsuit': '\u2665',
    'hellip': '\u2026',
    'hercon': '\u22B9',
    'hfr': '\uD835\uDD25',
    'Hfr': '\u210C',
    'HilbertSpace': '\u210B',
    'hksearow': '\u2925',
    'hkswarow': '\u2926',
    'hoarr': '\u21FF',
    'homtht': '\u223B',
    'hookleftarrow': '\u21A9',
    'hookrightarrow': '\u21AA',
    'hopf': '\uD835\uDD59',
    'Hopf': '\u210D',
    'horbar': '\u2015',
    'HorizontalLine': '\u2500',
    'hscr': '\uD835\uDCBD',
    'Hscr': '\u210B',
    'hslash': '\u210F',
    'hstrok': '\u0127',
    'Hstrok': '\u0126',
    'HumpDownHump': '\u224E',
    'HumpEqual': '\u224F',
    'hybull': '\u2043',
    'hyphen': '\u2010',
    'iacute': '\xED',
    'Iacute': '\xCD',
    'ic': '\u2063',
    'icirc': '\xEE',
    'Icirc': '\xCE',
    'icy': '\u0438',
    'Icy': '\u0418',
    'Idot': '\u0130',
    'iecy': '\u0435',
    'IEcy': '\u0415',
    'iexcl': '\xA1',
    'iff': '\u21D4',
    'ifr': '\uD835\uDD26',
    'Ifr': '\u2111',
    'igrave': '\xEC',
    'Igrave': '\xCC',
    'ii': '\u2148',
    'iiiint': '\u2A0C',
    'iiint': '\u222D',
    'iinfin': '\u29DC',
    'iiota': '\u2129',
    'ijlig': '\u0133',
    'IJlig': '\u0132',
    'Im': '\u2111',
    'imacr': '\u012B',
    'Imacr': '\u012A',
    'image': '\u2111',
    'ImaginaryI': '\u2148',
    'imagline': '\u2110',
    'imagpart': '\u2111',
    'imath': '\u0131',
    'imof': '\u22B7',
    'imped': '\u01B5',
    'Implies': '\u21D2',
    'in': '\u2208',
    'incare': '\u2105',
    'infin': '\u221E',
    'infintie': '\u29DD',
    'inodot': '\u0131',
    'int': '\u222B',
    'Int': '\u222C',
    'intcal': '\u22BA',
    'integers': '\u2124',
    'Integral': '\u222B',
    'intercal': '\u22BA',
    'Intersection': '\u22C2',
    'intlarhk': '\u2A17',
    'intprod': '\u2A3C',
    'InvisibleComma': '\u2063',
    'InvisibleTimes': '\u2062',
    'iocy': '\u0451',
    'IOcy': '\u0401',
    'iogon': '\u012F',
    'Iogon': '\u012E',
    'iopf': '\uD835\uDD5A',
    'Iopf': '\uD835\uDD40',
    'iota': '\u03B9',
    'Iota': '\u0399',
    'iprod': '\u2A3C',
    'iquest': '\xBF',
    'iscr': '\uD835\uDCBE',
    'Iscr': '\u2110',
    'isin': '\u2208',
    'isindot': '\u22F5',
    'isinE': '\u22F9',
    'isins': '\u22F4',
    'isinsv': '\u22F3',
    'isinv': '\u2208',
    'it': '\u2062',
    'itilde': '\u0129',
    'Itilde': '\u0128',
    'iukcy': '\u0456',
    'Iukcy': '\u0406',
    'iuml': '\xEF',
    'Iuml': '\xCF',
    'jcirc': '\u0135',
    'Jcirc': '\u0134',
    'jcy': '\u0439',
    'Jcy': '\u0419',
    'jfr': '\uD835\uDD27',
    'Jfr': '\uD835\uDD0D',
    'jmath': '\u0237',
    'jopf': '\uD835\uDD5B',
    'Jopf': '\uD835\uDD41',
    'jscr': '\uD835\uDCBF',
    'Jscr': '\uD835\uDCA5',
    'jsercy': '\u0458',
    'Jsercy': '\u0408',
    'jukcy': '\u0454',
    'Jukcy': '\u0404',
    'kappa': '\u03BA',
    'Kappa': '\u039A',
    'kappav': '\u03F0',
    'kcedil': '\u0137',
    'Kcedil': '\u0136',
    'kcy': '\u043A',
    'Kcy': '\u041A',
    'kfr': '\uD835\uDD28',
    'Kfr': '\uD835\uDD0E',
    'kgreen': '\u0138',
    'khcy': '\u0445',
    'KHcy': '\u0425',
    'kjcy': '\u045C',
    'KJcy': '\u040C',
    'kopf': '\uD835\uDD5C',
    'Kopf': '\uD835\uDD42',
    'kscr': '\uD835\uDCC0',
    'Kscr': '\uD835\uDCA6',
    'lAarr': '\u21DA',
    'lacute': '\u013A',
    'Lacute': '\u0139',
    'laemptyv': '\u29B4',
    'lagran': '\u2112',
    'lambda': '\u03BB',
    'Lambda': '\u039B',
    'lang': '\u27E8',
    'Lang': '\u27EA',
    'langd': '\u2991',
    'langle': '\u27E8',
    'lap': '\u2A85',
    'Laplacetrf': '\u2112',
    'laquo': '\xAB',
    'larr': '\u2190',
    'lArr': '\u21D0',
    'Larr': '\u219E',
    'larrb': '\u21E4',
    'larrbfs': '\u291F',
    'larrfs': '\u291D',
    'larrhk': '\u21A9',
    'larrlp': '\u21AB',
    'larrpl': '\u2939',
    'larrsim': '\u2973',
    'larrtl': '\u21A2',
    'lat': '\u2AAB',
    'latail': '\u2919',
    'lAtail': '\u291B',
    'late': '\u2AAD',
    'lates': '\u2AAD\uFE00',
    'lbarr': '\u290C',
    'lBarr': '\u290E',
    'lbbrk': '\u2772',
    'lbrace': '{',
    'lbrack': '[',
    'lbrke': '\u298B',
    'lbrksld': '\u298F',
    'lbrkslu': '\u298D',
    'lcaron': '\u013E',
    'Lcaron': '\u013D',
    'lcedil': '\u013C',
    'Lcedil': '\u013B',
    'lceil': '\u2308',
    'lcub': '{',
    'lcy': '\u043B',
    'Lcy': '\u041B',
    'ldca': '\u2936',
    'ldquo': '\u201C',
    'ldquor': '\u201E',
    'ldrdhar': '\u2967',
    'ldrushar': '\u294B',
    'ldsh': '\u21B2',
    'le': '\u2264',
    'lE': '\u2266',
    'LeftAngleBracket': '\u27E8',
    'leftarrow': '\u2190',
    'Leftarrow': '\u21D0',
    'LeftArrow': '\u2190',
    'LeftArrowBar': '\u21E4',
    'LeftArrowRightArrow': '\u21C6',
    'leftarrowtail': '\u21A2',
    'LeftCeiling': '\u2308',
    'LeftDoubleBracket': '\u27E6',
    'LeftDownTeeVector': '\u2961',
    'LeftDownVector': '\u21C3',
    'LeftDownVectorBar': '\u2959',
    'LeftFloor': '\u230A',
    'leftharpoondown': '\u21BD',
    'leftharpoonup': '\u21BC',
    'leftleftarrows': '\u21C7',
    'leftrightarrow': '\u2194',
    'Leftrightarrow': '\u21D4',
    'LeftRightArrow': '\u2194',
    'leftrightarrows': '\u21C6',
    'leftrightharpoons': '\u21CB',
    'leftrightsquigarrow': '\u21AD',
    'LeftRightVector': '\u294E',
    'LeftTee': '\u22A3',
    'LeftTeeArrow': '\u21A4',
    'LeftTeeVector': '\u295A',
    'leftthreetimes': '\u22CB',
    'LeftTriangle': '\u22B2',
    'LeftTriangleBar': '\u29CF',
    'LeftTriangleEqual': '\u22B4',
    'LeftUpDownVector': '\u2951',
    'LeftUpTeeVector': '\u2960',
    'LeftUpVector': '\u21BF',
    'LeftUpVectorBar': '\u2958',
    'LeftVector': '\u21BC',
    'LeftVectorBar': '\u2952',
    'leg': '\u22DA',
    'lEg': '\u2A8B',
    'leq': '\u2264',
    'leqq': '\u2266',
    'leqslant': '\u2A7D',
    'les': '\u2A7D',
    'lescc': '\u2AA8',
    'lesdot': '\u2A7F',
    'lesdoto': '\u2A81',
    'lesdotor': '\u2A83',
    'lesg': '\u22DA\uFE00',
    'lesges': '\u2A93',
    'lessapprox': '\u2A85',
    'lessdot': '\u22D6',
    'lesseqgtr': '\u22DA',
    'lesseqqgtr': '\u2A8B',
    'LessEqualGreater': '\u22DA',
    'LessFullEqual': '\u2266',
    'LessGreater': '\u2276',
    'lessgtr': '\u2276',
    'LessLess': '\u2AA1',
    'lesssim': '\u2272',
    'LessSlantEqual': '\u2A7D',
    'LessTilde': '\u2272',
    'lfisht': '\u297C',
    'lfloor': '\u230A',
    'lfr': '\uD835\uDD29',
    'Lfr': '\uD835\uDD0F',
    'lg': '\u2276',
    'lgE': '\u2A91',
    'lHar': '\u2962',
    'lhard': '\u21BD',
    'lharu': '\u21BC',
    'lharul': '\u296A',
    'lhblk': '\u2584',
    'ljcy': '\u0459',
    'LJcy': '\u0409',
    'll': '\u226A',
    'Ll': '\u22D8',
    'llarr': '\u21C7',
    'llcorner': '\u231E',
    'Lleftarrow': '\u21DA',
    'llhard': '\u296B',
    'lltri': '\u25FA',
    'lmidot': '\u0140',
    'Lmidot': '\u013F',
    'lmoust': '\u23B0',
    'lmoustache': '\u23B0',
    'lnap': '\u2A89',
    'lnapprox': '\u2A89',
    'lne': '\u2A87',
    'lnE': '\u2268',
    'lneq': '\u2A87',
    'lneqq': '\u2268',
    'lnsim': '\u22E6',
    'loang': '\u27EC',
    'loarr': '\u21FD',
    'lobrk': '\u27E6',
    'longleftarrow': '\u27F5',
    'Longleftarrow': '\u27F8',
    'LongLeftArrow': '\u27F5',
    'longleftrightarrow': '\u27F7',
    'Longleftrightarrow': '\u27FA',
    'LongLeftRightArrow': '\u27F7',
    'longmapsto': '\u27FC',
    'longrightarrow': '\u27F6',
    'Longrightarrow': '\u27F9',
    'LongRightArrow': '\u27F6',
    'looparrowleft': '\u21AB',
    'looparrowright': '\u21AC',
    'lopar': '\u2985',
    'lopf': '\uD835\uDD5D',
    'Lopf': '\uD835\uDD43',
    'loplus': '\u2A2D',
    'lotimes': '\u2A34',
    'lowast': '\u2217',
    'lowbar': '_',
    'LowerLeftArrow': '\u2199',
    'LowerRightArrow': '\u2198',
    'loz': '\u25CA',
    'lozenge': '\u25CA',
    'lozf': '\u29EB',
    'lpar': '(',
    'lparlt': '\u2993',
    'lrarr': '\u21C6',
    'lrcorner': '\u231F',
    'lrhar': '\u21CB',
    'lrhard': '\u296D',
    'lrm': '\u200E',
    'lrtri': '\u22BF',
    'lsaquo': '\u2039',
    'lscr': '\uD835\uDCC1',
    'Lscr': '\u2112',
    'lsh': '\u21B0',
    'Lsh': '\u21B0',
    'lsim': '\u2272',
    'lsime': '\u2A8D',
    'lsimg': '\u2A8F',
    'lsqb': '[',
    'lsquo': '\u2018',
    'lsquor': '\u201A',
    'lstrok': '\u0142',
    'Lstrok': '\u0141',
    'lt': '<',
    'Lt': '\u226A',
    'LT': '<',
    'ltcc': '\u2AA6',
    'ltcir': '\u2A79',
    'ltdot': '\u22D6',
    'lthree': '\u22CB',
    'ltimes': '\u22C9',
    'ltlarr': '\u2976',
    'ltquest': '\u2A7B',
    'ltri': '\u25C3',
    'ltrie': '\u22B4',
    'ltrif': '\u25C2',
    'ltrPar': '\u2996',
    'lurdshar': '\u294A',
    'luruhar': '\u2966',
    'lvertneqq': '\u2268\uFE00',
    'lvnE': '\u2268\uFE00',
    'macr': '\xAF',
    'male': '\u2642',
    'malt': '\u2720',
    'maltese': '\u2720',
    'map': '\u21A6',
    'Map': '\u2905',
    'mapsto': '\u21A6',
    'mapstodown': '\u21A7',
    'mapstoleft': '\u21A4',
    'mapstoup': '\u21A5',
    'marker': '\u25AE',
    'mcomma': '\u2A29',
    'mcy': '\u043C',
    'Mcy': '\u041C',
    'mdash': '\u2014',
    'mDDot': '\u223A',
    'measuredangle': '\u2221',
    'MediumSpace': '\u205F',
    'Mellintrf': '\u2133',
    'mfr': '\uD835\uDD2A',
    'Mfr': '\uD835\uDD10',
    'mho': '\u2127',
    'micro': '\xB5',
    'mid': '\u2223',
    'midast': '*',
    'midcir': '\u2AF0',
    'middot': '\xB7',
    'minus': '\u2212',
    'minusb': '\u229F',
    'minusd': '\u2238',
    'minusdu': '\u2A2A',
    'MinusPlus': '\u2213',
    'mlcp': '\u2ADB',
    'mldr': '\u2026',
    'mnplus': '\u2213',
    'models': '\u22A7',
    'mopf': '\uD835\uDD5E',
    'Mopf': '\uD835\uDD44',
    'mp': '\u2213',
    'mscr': '\uD835\uDCC2',
    'Mscr': '\u2133',
    'mstpos': '\u223E',
    'mu': '\u03BC',
    'Mu': '\u039C',
    'multimap': '\u22B8',
    'mumap': '\u22B8',
    'nabla': '\u2207',
    'nacute': '\u0144',
    'Nacute': '\u0143',
    'nang': '\u2220\u20D2',
    'nap': '\u2249',
    'napE': '\u2A70\u0338',
    'napid': '\u224B\u0338',
    'napos': '\u0149',
    'napprox': '\u2249',
    'natur': '\u266E',
    'natural': '\u266E',
    'naturals': '\u2115',
    'nbsp': '\xA0',
    'nbump': '\u224E\u0338',
    'nbumpe': '\u224F\u0338',
    'ncap': '\u2A43',
    'ncaron': '\u0148',
    'Ncaron': '\u0147',
    'ncedil': '\u0146',
    'Ncedil': '\u0145',
    'ncong': '\u2247',
    'ncongdot': '\u2A6D\u0338',
    'ncup': '\u2A42',
    'ncy': '\u043D',
    'Ncy': '\u041D',
    'ndash': '\u2013',
    'ne': '\u2260',
    'nearhk': '\u2924',
    'nearr': '\u2197',
    'neArr': '\u21D7',
    'nearrow': '\u2197',
    'nedot': '\u2250\u0338',
    'NegativeMediumSpace': '\u200B',
    'NegativeThickSpace': '\u200B',
    'NegativeThinSpace': '\u200B',
    'NegativeVeryThinSpace': '\u200B',
    'nequiv': '\u2262',
    'nesear': '\u2928',
    'nesim': '\u2242\u0338',
    'NestedGreaterGreater': '\u226B',
    'NestedLessLess': '\u226A',
    'NewLine': '\n',
    'nexist': '\u2204',
    'nexists': '\u2204',
    'nfr': '\uD835\uDD2B',
    'Nfr': '\uD835\uDD11',
    'nge': '\u2271',
    'ngE': '\u2267\u0338',
    'ngeq': '\u2271',
    'ngeqq': '\u2267\u0338',
    'ngeqslant': '\u2A7E\u0338',
    'nges': '\u2A7E\u0338',
    'nGg': '\u22D9\u0338',
    'ngsim': '\u2275',
    'ngt': '\u226F',
    'nGt': '\u226B\u20D2',
    'ngtr': '\u226F',
    'nGtv': '\u226B\u0338',
    'nharr': '\u21AE',
    'nhArr': '\u21CE',
    'nhpar': '\u2AF2',
    'ni': '\u220B',
    'nis': '\u22FC',
    'nisd': '\u22FA',
    'niv': '\u220B',
    'njcy': '\u045A',
    'NJcy': '\u040A',
    'nlarr': '\u219A',
    'nlArr': '\u21CD',
    'nldr': '\u2025',
    'nle': '\u2270',
    'nlE': '\u2266\u0338',
    'nleftarrow': '\u219A',
    'nLeftarrow': '\u21CD',
    'nleftrightarrow': '\u21AE',
    'nLeftrightarrow': '\u21CE',
    'nleq': '\u2270',
    'nleqq': '\u2266\u0338',
    'nleqslant': '\u2A7D\u0338',
    'nles': '\u2A7D\u0338',
    'nless': '\u226E',
    'nLl': '\u22D8\u0338',
    'nlsim': '\u2274',
    'nlt': '\u226E',
    'nLt': '\u226A\u20D2',
    'nltri': '\u22EA',
    'nltrie': '\u22EC',
    'nLtv': '\u226A\u0338',
    'nmid': '\u2224',
    'NoBreak': '\u2060',
    'NonBreakingSpace': '\xA0',
    'nopf': '\uD835\uDD5F',
    'Nopf': '\u2115',
    'not': '\xAC',
    'Not': '\u2AEC',
    'NotCongruent': '\u2262',
    'NotCupCap': '\u226D',
    'NotDoubleVerticalBar': '\u2226',
    'NotElement': '\u2209',
    'NotEqual': '\u2260',
    'NotEqualTilde': '\u2242\u0338',
    'NotExists': '\u2204',
    'NotGreater': '\u226F',
    'NotGreaterEqual': '\u2271',
    'NotGreaterFullEqual': '\u2267\u0338',
    'NotGreaterGreater': '\u226B\u0338',
    'NotGreaterLess': '\u2279',
    'NotGreaterSlantEqual': '\u2A7E\u0338',
    'NotGreaterTilde': '\u2275',
    'NotHumpDownHump': '\u224E\u0338',
    'NotHumpEqual': '\u224F\u0338',
    'notin': '\u2209',
    'notindot': '\u22F5\u0338',
    'notinE': '\u22F9\u0338',
    'notinva': '\u2209',
    'notinvb': '\u22F7',
    'notinvc': '\u22F6',
    'NotLeftTriangle': '\u22EA',
    'NotLeftTriangleBar': '\u29CF\u0338',
    'NotLeftTriangleEqual': '\u22EC',
    'NotLess': '\u226E',
    'NotLessEqual': '\u2270',
    'NotLessGreater': '\u2278',
    'NotLessLess': '\u226A\u0338',
    'NotLessSlantEqual': '\u2A7D\u0338',
    'NotLessTilde': '\u2274',
    'NotNestedGreaterGreater': '\u2AA2\u0338',
    'NotNestedLessLess': '\u2AA1\u0338',
    'notni': '\u220C',
    'notniva': '\u220C',
    'notnivb': '\u22FE',
    'notnivc': '\u22FD',
    'NotPrecedes': '\u2280',
    'NotPrecedesEqual': '\u2AAF\u0338',
    'NotPrecedesSlantEqual': '\u22E0',
    'NotReverseElement': '\u220C',
    'NotRightTriangle': '\u22EB',
    'NotRightTriangleBar': '\u29D0\u0338',
    'NotRightTriangleEqual': '\u22ED',
    'NotSquareSubset': '\u228F\u0338',
    'NotSquareSubsetEqual': '\u22E2',
    'NotSquareSuperset': '\u2290\u0338',
    'NotSquareSupersetEqual': '\u22E3',
    'NotSubset': '\u2282\u20D2',
    'NotSubsetEqual': '\u2288',
    'NotSucceeds': '\u2281',
    'NotSucceedsEqual': '\u2AB0\u0338',
    'NotSucceedsSlantEqual': '\u22E1',
    'NotSucceedsTilde': '\u227F\u0338',
    'NotSuperset': '\u2283\u20D2',
    'NotSupersetEqual': '\u2289',
    'NotTilde': '\u2241',
    'NotTildeEqual': '\u2244',
    'NotTildeFullEqual': '\u2247',
    'NotTildeTilde': '\u2249',
    'NotVerticalBar': '\u2224',
    'npar': '\u2226',
    'nparallel': '\u2226',
    'nparsl': '\u2AFD\u20E5',
    'npart': '\u2202\u0338',
    'npolint': '\u2A14',
    'npr': '\u2280',
    'nprcue': '\u22E0',
    'npre': '\u2AAF\u0338',
    'nprec': '\u2280',
    'npreceq': '\u2AAF\u0338',
    'nrarr': '\u219B',
    'nrArr': '\u21CF',
    'nrarrc': '\u2933\u0338',
    'nrarrw': '\u219D\u0338',
    'nrightarrow': '\u219B',
    'nRightarrow': '\u21CF',
    'nrtri': '\u22EB',
    'nrtrie': '\u22ED',
    'nsc': '\u2281',
    'nsccue': '\u22E1',
    'nsce': '\u2AB0\u0338',
    'nscr': '\uD835\uDCC3',
    'Nscr': '\uD835\uDCA9',
    'nshortmid': '\u2224',
    'nshortparallel': '\u2226',
    'nsim': '\u2241',
    'nsime': '\u2244',
    'nsimeq': '\u2244',
    'nsmid': '\u2224',
    'nspar': '\u2226',
    'nsqsube': '\u22E2',
    'nsqsupe': '\u22E3',
    'nsub': '\u2284',
    'nsube': '\u2288',
    'nsubE': '\u2AC5\u0338',
    'nsubset': '\u2282\u20D2',
    'nsubseteq': '\u2288',
    'nsubseteqq': '\u2AC5\u0338',
    'nsucc': '\u2281',
    'nsucceq': '\u2AB0\u0338',
    'nsup': '\u2285',
    'nsupe': '\u2289',
    'nsupE': '\u2AC6\u0338',
    'nsupset': '\u2283\u20D2',
    'nsupseteq': '\u2289',
    'nsupseteqq': '\u2AC6\u0338',
    'ntgl': '\u2279',
    'ntilde': '\xF1',
    'Ntilde': '\xD1',
    'ntlg': '\u2278',
    'ntriangleleft': '\u22EA',
    'ntrianglelefteq': '\u22EC',
    'ntriangleright': '\u22EB',
    'ntrianglerighteq': '\u22ED',
    'nu': '\u03BD',
    'Nu': '\u039D',
    'num': '#',
    'numero': '\u2116',
    'numsp': '\u2007',
    'nvap': '\u224D\u20D2',
    'nvdash': '\u22AC',
    'nvDash': '\u22AD',
    'nVdash': '\u22AE',
    'nVDash': '\u22AF',
    'nvge': '\u2265\u20D2',
    'nvgt': '>\u20D2',
    'nvHarr': '\u2904',
    'nvinfin': '\u29DE',
    'nvlArr': '\u2902',
    'nvle': '\u2264\u20D2',
    'nvlt': '<\u20D2',
    'nvltrie': '\u22B4\u20D2',
    'nvrArr': '\u2903',
    'nvrtrie': '\u22B5\u20D2',
    'nvsim': '\u223C\u20D2',
    'nwarhk': '\u2923',
    'nwarr': '\u2196',
    'nwArr': '\u21D6',
    'nwarrow': '\u2196',
    'nwnear': '\u2927',
    'oacute': '\xF3',
    'Oacute': '\xD3',
    'oast': '\u229B',
    'ocir': '\u229A',
    'ocirc': '\xF4',
    'Ocirc': '\xD4',
    'ocy': '\u043E',
    'Ocy': '\u041E',
    'odash': '\u229D',
    'odblac': '\u0151',
    'Odblac': '\u0150',
    'odiv': '\u2A38',
    'odot': '\u2299',
    'odsold': '\u29BC',
    'oelig': '\u0153',
    'OElig': '\u0152',
    'ofcir': '\u29BF',
    'ofr': '\uD835\uDD2C',
    'Ofr': '\uD835\uDD12',
    'ogon': '\u02DB',
    'ograve': '\xF2',
    'Ograve': '\xD2',
    'ogt': '\u29C1',
    'ohbar': '\u29B5',
    'ohm': '\u03A9',
    'oint': '\u222E',
    'olarr': '\u21BA',
    'olcir': '\u29BE',
    'olcross': '\u29BB',
    'oline': '\u203E',
    'olt': '\u29C0',
    'omacr': '\u014D',
    'Omacr': '\u014C',
    'omega': '\u03C9',
    'Omega': '\u03A9',
    'omicron': '\u03BF',
    'Omicron': '\u039F',
    'omid': '\u29B6',
    'ominus': '\u2296',
    'oopf': '\uD835\uDD60',
    'Oopf': '\uD835\uDD46',
    'opar': '\u29B7',
    'OpenCurlyDoubleQuote': '\u201C',
    'OpenCurlyQuote': '\u2018',
    'operp': '\u29B9',
    'oplus': '\u2295',
    'or': '\u2228',
    'Or': '\u2A54',
    'orarr': '\u21BB',
    'ord': '\u2A5D',
    'order': '\u2134',
    'orderof': '\u2134',
    'ordf': '\xAA',
    'ordm': '\xBA',
    'origof': '\u22B6',
    'oror': '\u2A56',
    'orslope': '\u2A57',
    'orv': '\u2A5B',
    'oS': '\u24C8',
    'oscr': '\u2134',
    'Oscr': '\uD835\uDCAA',
    'oslash': '\xF8',
    'Oslash': '\xD8',
    'osol': '\u2298',
    'otilde': '\xF5',
    'Otilde': '\xD5',
    'otimes': '\u2297',
    'Otimes': '\u2A37',
    'otimesas': '\u2A36',
    'ouml': '\xF6',
    'Ouml': '\xD6',
    'ovbar': '\u233D',
    'OverBar': '\u203E',
    'OverBrace': '\u23DE',
    'OverBracket': '\u23B4',
    'OverParenthesis': '\u23DC',
    'par': '\u2225',
    'para': '\xB6',
    'parallel': '\u2225',
    'parsim': '\u2AF3',
    'parsl': '\u2AFD',
    'part': '\u2202',
    'PartialD': '\u2202',
    'pcy': '\u043F',
    'Pcy': '\u041F',
    'percnt': '%',
    'period': '.',
    'permil': '\u2030',
    'perp': '\u22A5',
    'pertenk': '\u2031',
    'pfr': '\uD835\uDD2D',
    'Pfr': '\uD835\uDD13',
    'phi': '\u03C6',
    'Phi': '\u03A6',
    'phiv': '\u03D5',
    'phmmat': '\u2133',
    'phone': '\u260E',
    'pi': '\u03C0',
    'Pi': '\u03A0',
    'pitchfork': '\u22D4',
    'piv': '\u03D6',
    'planck': '\u210F',
    'planckh': '\u210E',
    'plankv': '\u210F',
    'plus': '+',
    'plusacir': '\u2A23',
    'plusb': '\u229E',
    'pluscir': '\u2A22',
    'plusdo': '\u2214',
    'plusdu': '\u2A25',
    'pluse': '\u2A72',
    'PlusMinus': '\xB1',
    'plusmn': '\xB1',
    'plussim': '\u2A26',
    'plustwo': '\u2A27',
    'pm': '\xB1',
    'Poincareplane': '\u210C',
    'pointint': '\u2A15',
    'popf': '\uD835\uDD61',
    'Popf': '\u2119',
    'pound': '\xA3',
    'pr': '\u227A',
    'Pr': '\u2ABB',
    'prap': '\u2AB7',
    'prcue': '\u227C',
    'pre': '\u2AAF',
    'prE': '\u2AB3',
    'prec': '\u227A',
    'precapprox': '\u2AB7',
    'preccurlyeq': '\u227C',
    'Precedes': '\u227A',
    'PrecedesEqual': '\u2AAF',
    'PrecedesSlantEqual': '\u227C',
    'PrecedesTilde': '\u227E',
    'preceq': '\u2AAF',
    'precnapprox': '\u2AB9',
    'precneqq': '\u2AB5',
    'precnsim': '\u22E8',
    'precsim': '\u227E',
    'prime': '\u2032',
    'Prime': '\u2033',
    'primes': '\u2119',
    'prnap': '\u2AB9',
    'prnE': '\u2AB5',
    'prnsim': '\u22E8',
    'prod': '\u220F',
    'Product': '\u220F',
    'profalar': '\u232E',
    'profline': '\u2312',
    'profsurf': '\u2313',
    'prop': '\u221D',
    'Proportion': '\u2237',
    'Proportional': '\u221D',
    'propto': '\u221D',
    'prsim': '\u227E',
    'prurel': '\u22B0',
    'pscr': '\uD835\uDCC5',
    'Pscr': '\uD835\uDCAB',
    'psi': '\u03C8',
    'Psi': '\u03A8',
    'puncsp': '\u2008',
    'qfr': '\uD835\uDD2E',
    'Qfr': '\uD835\uDD14',
    'qint': '\u2A0C',
    'qopf': '\uD835\uDD62',
    'Qopf': '\u211A',
    'qprime': '\u2057',
    'qscr': '\uD835\uDCC6',
    'Qscr': '\uD835\uDCAC',
    'quaternions': '\u210D',
    'quatint': '\u2A16',
    'quest': '?',
    'questeq': '\u225F',
    'quot': '"',
    'QUOT': '"',
    'rAarr': '\u21DB',
    'race': '\u223D\u0331',
    'racute': '\u0155',
    'Racute': '\u0154',
    'radic': '\u221A',
    'raemptyv': '\u29B3',
    'rang': '\u27E9',
    'Rang': '\u27EB',
    'rangd': '\u2992',
    'range': '\u29A5',
    'rangle': '\u27E9',
    'raquo': '\xBB',
    'rarr': '\u2192',
    'rArr': '\u21D2',
    'Rarr': '\u21A0',
    'rarrap': '\u2975',
    'rarrb': '\u21E5',
    'rarrbfs': '\u2920',
    'rarrc': '\u2933',
    'rarrfs': '\u291E',
    'rarrhk': '\u21AA',
    'rarrlp': '\u21AC',
    'rarrpl': '\u2945',
    'rarrsim': '\u2974',
    'rarrtl': '\u21A3',
    'Rarrtl': '\u2916',
    'rarrw': '\u219D',
    'ratail': '\u291A',
    'rAtail': '\u291C',
    'ratio': '\u2236',
    'rationals': '\u211A',
    'rbarr': '\u290D',
    'rBarr': '\u290F',
    'RBarr': '\u2910',
    'rbbrk': '\u2773',
    'rbrace': '}',
    'rbrack': ']',
    'rbrke': '\u298C',
    'rbrksld': '\u298E',
    'rbrkslu': '\u2990',
    'rcaron': '\u0159',
    'Rcaron': '\u0158',
    'rcedil': '\u0157',
    'Rcedil': '\u0156',
    'rceil': '\u2309',
    'rcub': '}',
    'rcy': '\u0440',
    'Rcy': '\u0420',
    'rdca': '\u2937',
    'rdldhar': '\u2969',
    'rdquo': '\u201D',
    'rdquor': '\u201D',
    'rdsh': '\u21B3',
    'Re': '\u211C',
    'real': '\u211C',
    'realine': '\u211B',
    'realpart': '\u211C',
    'reals': '\u211D',
    'rect': '\u25AD',
    'reg': '\xAE',
    'REG': '\xAE',
    'ReverseElement': '\u220B',
    'ReverseEquilibrium': '\u21CB',
    'ReverseUpEquilibrium': '\u296F',
    'rfisht': '\u297D',
    'rfloor': '\u230B',
    'rfr': '\uD835\uDD2F',
    'Rfr': '\u211C',
    'rHar': '\u2964',
    'rhard': '\u21C1',
    'rharu': '\u21C0',
    'rharul': '\u296C',
    'rho': '\u03C1',
    'Rho': '\u03A1',
    'rhov': '\u03F1',
    'RightAngleBracket': '\u27E9',
    'rightarrow': '\u2192',
    'Rightarrow': '\u21D2',
    'RightArrow': '\u2192',
    'RightArrowBar': '\u21E5',
    'RightArrowLeftArrow': '\u21C4',
    'rightarrowtail': '\u21A3',
    'RightCeiling': '\u2309',
    'RightDoubleBracket': '\u27E7',
    'RightDownTeeVector': '\u295D',
    'RightDownVector': '\u21C2',
    'RightDownVectorBar': '\u2955',
    'RightFloor': '\u230B',
    'rightharpoondown': '\u21C1',
    'rightharpoonup': '\u21C0',
    'rightleftarrows': '\u21C4',
    'rightleftharpoons': '\u21CC',
    'rightrightarrows': '\u21C9',
    'rightsquigarrow': '\u219D',
    'RightTee': '\u22A2',
    'RightTeeArrow': '\u21A6',
    'RightTeeVector': '\u295B',
    'rightthreetimes': '\u22CC',
    'RightTriangle': '\u22B3',
    'RightTriangleBar': '\u29D0',
    'RightTriangleEqual': '\u22B5',
    'RightUpDownVector': '\u294F',
    'RightUpTeeVector': '\u295C',
    'RightUpVector': '\u21BE',
    'RightUpVectorBar': '\u2954',
    'RightVector': '\u21C0',
    'RightVectorBar': '\u2953',
    'ring': '\u02DA',
    'risingdotseq': '\u2253',
    'rlarr': '\u21C4',
    'rlhar': '\u21CC',
    'rlm': '\u200F',
    'rmoust': '\u23B1',
    'rmoustache': '\u23B1',
    'rnmid': '\u2AEE',
    'roang': '\u27ED',
    'roarr': '\u21FE',
    'robrk': '\u27E7',
    'ropar': '\u2986',
    'ropf': '\uD835\uDD63',
    'Ropf': '\u211D',
    'roplus': '\u2A2E',
    'rotimes': '\u2A35',
    'RoundImplies': '\u2970',
    'rpar': ')',
    'rpargt': '\u2994',
    'rppolint': '\u2A12',
    'rrarr': '\u21C9',
    'Rrightarrow': '\u21DB',
    'rsaquo': '\u203A',
    'rscr': '\uD835\uDCC7',
    'Rscr': '\u211B',
    'rsh': '\u21B1',
    'Rsh': '\u21B1',
    'rsqb': ']',
    'rsquo': '\u2019',
    'rsquor': '\u2019',
    'rthree': '\u22CC',
    'rtimes': '\u22CA',
    'rtri': '\u25B9',
    'rtrie': '\u22B5',
    'rtrif': '\u25B8',
    'rtriltri': '\u29CE',
    'RuleDelayed': '\u29F4',
    'ruluhar': '\u2968',
    'rx': '\u211E',
    'sacute': '\u015B',
    'Sacute': '\u015A',
    'sbquo': '\u201A',
    'sc': '\u227B',
    'Sc': '\u2ABC',
    'scap': '\u2AB8',
    'scaron': '\u0161',
    'Scaron': '\u0160',
    'sccue': '\u227D',
    'sce': '\u2AB0',
    'scE': '\u2AB4',
    'scedil': '\u015F',
    'Scedil': '\u015E',
    'scirc': '\u015D',
    'Scirc': '\u015C',
    'scnap': '\u2ABA',
    'scnE': '\u2AB6',
    'scnsim': '\u22E9',
    'scpolint': '\u2A13',
    'scsim': '\u227F',
    'scy': '\u0441',
    'Scy': '\u0421',
    'sdot': '\u22C5',
    'sdotb': '\u22A1',
    'sdote': '\u2A66',
    'searhk': '\u2925',
    'searr': '\u2198',
    'seArr': '\u21D8',
    'searrow': '\u2198',
    'sect': '\xA7',
    'semi': ';',
    'seswar': '\u2929',
    'setminus': '\u2216',
    'setmn': '\u2216',
    'sext': '\u2736',
    'sfr': '\uD835\uDD30',
    'Sfr': '\uD835\uDD16',
    'sfrown': '\u2322',
    'sharp': '\u266F',
    'shchcy': '\u0449',
    'SHCHcy': '\u0429',
    'shcy': '\u0448',
    'SHcy': '\u0428',
    'ShortDownArrow': '\u2193',
    'ShortLeftArrow': '\u2190',
    'shortmid': '\u2223',
    'shortparallel': '\u2225',
    'ShortRightArrow': '\u2192',
    'ShortUpArrow': '\u2191',
    'shy': '\xAD',
    'sigma': '\u03C3',
    'Sigma': '\u03A3',
    'sigmaf': '\u03C2',
    'sigmav': '\u03C2',
    'sim': '\u223C',
    'simdot': '\u2A6A',
    'sime': '\u2243',
    'simeq': '\u2243',
    'simg': '\u2A9E',
    'simgE': '\u2AA0',
    'siml': '\u2A9D',
    'simlE': '\u2A9F',
    'simne': '\u2246',
    'simplus': '\u2A24',
    'simrarr': '\u2972',
    'slarr': '\u2190',
    'SmallCircle': '\u2218',
    'smallsetminus': '\u2216',
    'smashp': '\u2A33',
    'smeparsl': '\u29E4',
    'smid': '\u2223',
    'smile': '\u2323',
    'smt': '\u2AAA',
    'smte': '\u2AAC',
    'smtes': '\u2AAC\uFE00',
    'softcy': '\u044C',
    'SOFTcy': '\u042C',
    'sol': '/',
    'solb': '\u29C4',
    'solbar': '\u233F',
    'sopf': '\uD835\uDD64',
    'Sopf': '\uD835\uDD4A',
    'spades': '\u2660',
    'spadesuit': '\u2660',
    'spar': '\u2225',
    'sqcap': '\u2293',
    'sqcaps': '\u2293\uFE00',
    'sqcup': '\u2294',
    'sqcups': '\u2294\uFE00',
    'Sqrt': '\u221A',
    'sqsub': '\u228F',
    'sqsube': '\u2291',
    'sqsubset': '\u228F',
    'sqsubseteq': '\u2291',
    'sqsup': '\u2290',
    'sqsupe': '\u2292',
    'sqsupset': '\u2290',
    'sqsupseteq': '\u2292',
    'squ': '\u25A1',
    'square': '\u25A1',
    'Square': '\u25A1',
    'SquareIntersection': '\u2293',
    'SquareSubset': '\u228F',
    'SquareSubsetEqual': '\u2291',
    'SquareSuperset': '\u2290',
    'SquareSupersetEqual': '\u2292',
    'SquareUnion': '\u2294',
    'squarf': '\u25AA',
    'squf': '\u25AA',
    'srarr': '\u2192',
    'sscr': '\uD835\uDCC8',
    'Sscr': '\uD835\uDCAE',
    'ssetmn': '\u2216',
    'ssmile': '\u2323',
    'sstarf': '\u22C6',
    'star': '\u2606',
    'Star': '\u22C6',
    'starf': '\u2605',
    'straightepsilon': '\u03F5',
    'straightphi': '\u03D5',
    'strns': '\xAF',
    'sub': '\u2282',
    'Sub': '\u22D0',
    'subdot': '\u2ABD',
    'sube': '\u2286',
    'subE': '\u2AC5',
    'subedot': '\u2AC3',
    'submult': '\u2AC1',
    'subne': '\u228A',
    'subnE': '\u2ACB',
    'subplus': '\u2ABF',
    'subrarr': '\u2979',
    'subset': '\u2282',
    'Subset': '\u22D0',
    'subseteq': '\u2286',
    'subseteqq': '\u2AC5',
    'SubsetEqual': '\u2286',
    'subsetneq': '\u228A',
    'subsetneqq': '\u2ACB',
    'subsim': '\u2AC7',
    'subsub': '\u2AD5',
    'subsup': '\u2AD3',
    'succ': '\u227B',
    'succapprox': '\u2AB8',
    'succcurlyeq': '\u227D',
    'Succeeds': '\u227B',
    'SucceedsEqual': '\u2AB0',
    'SucceedsSlantEqual': '\u227D',
    'SucceedsTilde': '\u227F',
    'succeq': '\u2AB0',
    'succnapprox': '\u2ABA',
    'succneqq': '\u2AB6',
    'succnsim': '\u22E9',
    'succsim': '\u227F',
    'SuchThat': '\u220B',
    'sum': '\u2211',
    'Sum': '\u2211',
    'sung': '\u266A',
    'sup': '\u2283',
    'Sup': '\u22D1',
    'sup1': '\xB9',
    'sup2': '\xB2',
    'sup3': '\xB3',
    'supdot': '\u2ABE',
    'supdsub': '\u2AD8',
    'supe': '\u2287',
    'supE': '\u2AC6',
    'supedot': '\u2AC4',
    'Superset': '\u2283',
    'SupersetEqual': '\u2287',
    'suphsol': '\u27C9',
    'suphsub': '\u2AD7',
    'suplarr': '\u297B',
    'supmult': '\u2AC2',
    'supne': '\u228B',
    'supnE': '\u2ACC',
    'supplus': '\u2AC0',
    'supset': '\u2283',
    'Supset': '\u22D1',
    'supseteq': '\u2287',
    'supseteqq': '\u2AC6',
    'supsetneq': '\u228B',
    'supsetneqq': '\u2ACC',
    'supsim': '\u2AC8',
    'supsub': '\u2AD4',
    'supsup': '\u2AD6',
    'swarhk': '\u2926',
    'swarr': '\u2199',
    'swArr': '\u21D9',
    'swarrow': '\u2199',
    'swnwar': '\u292A',
    'szlig': '\xDF',
    'Tab': '\t',
    'target': '\u2316',
    'tau': '\u03C4',
    'Tau': '\u03A4',
    'tbrk': '\u23B4',
    'tcaron': '\u0165',
    'Tcaron': '\u0164',
    'tcedil': '\u0163',
    'Tcedil': '\u0162',
    'tcy': '\u0442',
    'Tcy': '\u0422',
    'tdot': '\u20DB',
    'telrec': '\u2315',
    'tfr': '\uD835\uDD31',
    'Tfr': '\uD835\uDD17',
    'there4': '\u2234',
    'therefore': '\u2234',
    'Therefore': '\u2234',
    'theta': '\u03B8',
    'Theta': '\u0398',
    'thetasym': '\u03D1',
    'thetav': '\u03D1',
    'thickapprox': '\u2248',
    'thicksim': '\u223C',
    'ThickSpace': '\u205F\u200A',
    'thinsp': '\u2009',
    'ThinSpace': '\u2009',
    'thkap': '\u2248',
    'thksim': '\u223C',
    'thorn': '\xFE',
    'THORN': '\xDE',
    'tilde': '\u02DC',
    'Tilde': '\u223C',
    'TildeEqual': '\u2243',
    'TildeFullEqual': '\u2245',
    'TildeTilde': '\u2248',
    'times': '\xD7',
    'timesb': '\u22A0',
    'timesbar': '\u2A31',
    'timesd': '\u2A30',
    'tint': '\u222D',
    'toea': '\u2928',
    'top': '\u22A4',
    'topbot': '\u2336',
    'topcir': '\u2AF1',
    'topf': '\uD835\uDD65',
    'Topf': '\uD835\uDD4B',
    'topfork': '\u2ADA',
    'tosa': '\u2929',
    'tprime': '\u2034',
    'trade': '\u2122',
    'TRADE': '\u2122',
    'triangle': '\u25B5',
    'triangledown': '\u25BF',
    'triangleleft': '\u25C3',
    'trianglelefteq': '\u22B4',
    'triangleq': '\u225C',
    'triangleright': '\u25B9',
    'trianglerighteq': '\u22B5',
    'tridot': '\u25EC',
    'trie': '\u225C',
    'triminus': '\u2A3A',
    'TripleDot': '\u20DB',
    'triplus': '\u2A39',
    'trisb': '\u29CD',
    'tritime': '\u2A3B',
    'trpezium': '\u23E2',
    'tscr': '\uD835\uDCC9',
    'Tscr': '\uD835\uDCAF',
    'tscy': '\u0446',
    'TScy': '\u0426',
    'tshcy': '\u045B',
    'TSHcy': '\u040B',
    'tstrok': '\u0167',
    'Tstrok': '\u0166',
    'twixt': '\u226C',
    'twoheadleftarrow': '\u219E',
    'twoheadrightarrow': '\u21A0',
    'uacute': '\xFA',
    'Uacute': '\xDA',
    'uarr': '\u2191',
    'uArr': '\u21D1',
    'Uarr': '\u219F',
    'Uarrocir': '\u2949',
    'ubrcy': '\u045E',
    'Ubrcy': '\u040E',
    'ubreve': '\u016D',
    'Ubreve': '\u016C',
    'ucirc': '\xFB',
    'Ucirc': '\xDB',
    'ucy': '\u0443',
    'Ucy': '\u0423',
    'udarr': '\u21C5',
    'udblac': '\u0171',
    'Udblac': '\u0170',
    'udhar': '\u296E',
    'ufisht': '\u297E',
    'ufr': '\uD835\uDD32',
    'Ufr': '\uD835\uDD18',
    'ugrave': '\xF9',
    'Ugrave': '\xD9',
    'uHar': '\u2963',
    'uharl': '\u21BF',
    'uharr': '\u21BE',
    'uhblk': '\u2580',
    'ulcorn': '\u231C',
    'ulcorner': '\u231C',
    'ulcrop': '\u230F',
    'ultri': '\u25F8',
    'umacr': '\u016B',
    'Umacr': '\u016A',
    'uml': '\xA8',
    'UnderBar': '_',
    'UnderBrace': '\u23DF',
    'UnderBracket': '\u23B5',
    'UnderParenthesis': '\u23DD',
    'Union': '\u22C3',
    'UnionPlus': '\u228E',
    'uogon': '\u0173',
    'Uogon': '\u0172',
    'uopf': '\uD835\uDD66',
    'Uopf': '\uD835\uDD4C',
    'uparrow': '\u2191',
    'Uparrow': '\u21D1',
    'UpArrow': '\u2191',
    'UpArrowBar': '\u2912',
    'UpArrowDownArrow': '\u21C5',
    'updownarrow': '\u2195',
    'Updownarrow': '\u21D5',
    'UpDownArrow': '\u2195',
    'UpEquilibrium': '\u296E',
    'upharpoonleft': '\u21BF',
    'upharpoonright': '\u21BE',
    'uplus': '\u228E',
    'UpperLeftArrow': '\u2196',
    'UpperRightArrow': '\u2197',
    'upsi': '\u03C5',
    'Upsi': '\u03D2',
    'upsih': '\u03D2',
    'upsilon': '\u03C5',
    'Upsilon': '\u03A5',
    'UpTee': '\u22A5',
    'UpTeeArrow': '\u21A5',
    'upuparrows': '\u21C8',
    'urcorn': '\u231D',
    'urcorner': '\u231D',
    'urcrop': '\u230E',
    'uring': '\u016F',
    'Uring': '\u016E',
    'urtri': '\u25F9',
    'uscr': '\uD835\uDCCA',
    'Uscr': '\uD835\uDCB0',
    'utdot': '\u22F0',
    'utilde': '\u0169',
    'Utilde': '\u0168',
    'utri': '\u25B5',
    'utrif': '\u25B4',
    'uuarr': '\u21C8',
    'uuml': '\xFC',
    'Uuml': '\xDC',
    'uwangle': '\u29A7',
    'vangrt': '\u299C',
    'varepsilon': '\u03F5',
    'varkappa': '\u03F0',
    'varnothing': '\u2205',
    'varphi': '\u03D5',
    'varpi': '\u03D6',
    'varpropto': '\u221D',
    'varr': '\u2195',
    'vArr': '\u21D5',
    'varrho': '\u03F1',
    'varsigma': '\u03C2',
    'varsubsetneq': '\u228A\uFE00',
    'varsubsetneqq': '\u2ACB\uFE00',
    'varsupsetneq': '\u228B\uFE00',
    'varsupsetneqq': '\u2ACC\uFE00',
    'vartheta': '\u03D1',
    'vartriangleleft': '\u22B2',
    'vartriangleright': '\u22B3',
    'vBar': '\u2AE8',
    'Vbar': '\u2AEB',
    'vBarv': '\u2AE9',
    'vcy': '\u0432',
    'Vcy': '\u0412',
    'vdash': '\u22A2',
    'vDash': '\u22A8',
    'Vdash': '\u22A9',
    'VDash': '\u22AB',
    'Vdashl': '\u2AE6',
    'vee': '\u2228',
    'Vee': '\u22C1',
    'veebar': '\u22BB',
    'veeeq': '\u225A',
    'vellip': '\u22EE',
    'verbar': '|',
    'Verbar': '\u2016',
    'vert': '|',
    'Vert': '\u2016',
    'VerticalBar': '\u2223',
    'VerticalLine': '|',
    'VerticalSeparator': '\u2758',
    'VerticalTilde': '\u2240',
    'VeryThinSpace': '\u200A',
    'vfr': '\uD835\uDD33',
    'Vfr': '\uD835\uDD19',
    'vltri': '\u22B2',
    'vnsub': '\u2282\u20D2',
    'vnsup': '\u2283\u20D2',
    'vopf': '\uD835\uDD67',
    'Vopf': '\uD835\uDD4D',
    'vprop': '\u221D',
    'vrtri': '\u22B3',
    'vscr': '\uD835\uDCCB',
    'Vscr': '\uD835\uDCB1',
    'vsubne': '\u228A\uFE00',
    'vsubnE': '\u2ACB\uFE00',
    'vsupne': '\u228B\uFE00',
    'vsupnE': '\u2ACC\uFE00',
    'Vvdash': '\u22AA',
    'vzigzag': '\u299A',
    'wcirc': '\u0175',
    'Wcirc': '\u0174',
    'wedbar': '\u2A5F',
    'wedge': '\u2227',
    'Wedge': '\u22C0',
    'wedgeq': '\u2259',
    'weierp': '\u2118',
    'wfr': '\uD835\uDD34',
    'Wfr': '\uD835\uDD1A',
    'wopf': '\uD835\uDD68',
    'Wopf': '\uD835\uDD4E',
    'wp': '\u2118',
    'wr': '\u2240',
    'wreath': '\u2240',
    'wscr': '\uD835\uDCCC',
    'Wscr': '\uD835\uDCB2',
    'xcap': '\u22C2',
    'xcirc': '\u25EF',
    'xcup': '\u22C3',
    'xdtri': '\u25BD',
    'xfr': '\uD835\uDD35',
    'Xfr': '\uD835\uDD1B',
    'xharr': '\u27F7',
    'xhArr': '\u27FA',
    'xi': '\u03BE',
    'Xi': '\u039E',
    'xlarr': '\u27F5',
    'xlArr': '\u27F8',
    'xmap': '\u27FC',
    'xnis': '\u22FB',
    'xodot': '\u2A00',
    'xopf': '\uD835\uDD69',
    'Xopf': '\uD835\uDD4F',
    'xoplus': '\u2A01',
    'xotime': '\u2A02',
    'xrarr': '\u27F6',
    'xrArr': '\u27F9',
    'xscr': '\uD835\uDCCD',
    'Xscr': '\uD835\uDCB3',
    'xsqcup': '\u2A06',
    'xuplus': '\u2A04',
    'xutri': '\u25B3',
    'xvee': '\u22C1',
    'xwedge': '\u22C0',
    'yacute': '\xFD',
    'Yacute': '\xDD',
    'yacy': '\u044F',
    'YAcy': '\u042F',
    'ycirc': '\u0177',
    'Ycirc': '\u0176',
    'ycy': '\u044B',
    'Ycy': '\u042B',
    'yen': '\xA5',
    'yfr': '\uD835\uDD36',
    'Yfr': '\uD835\uDD1C',
    'yicy': '\u0457',
    'YIcy': '\u0407',
    'yopf': '\uD835\uDD6A',
    'Yopf': '\uD835\uDD50',
    'yscr': '\uD835\uDCCE',
    'Yscr': '\uD835\uDCB4',
    'yucy': '\u044E',
    'YUcy': '\u042E',
    'yuml': '\xFF',
    'Yuml': '\u0178',
    'zacute': '\u017A',
    'Zacute': '\u0179',
    'zcaron': '\u017E',
    'Zcaron': '\u017D',
    'zcy': '\u0437',
    'Zcy': '\u0417',
    'zdot': '\u017C',
    'Zdot': '\u017B',
    'zeetrf': '\u2128',
    'ZeroWidthSpace': '\u200B',
    'zeta': '\u03B6',
    'Zeta': '\u0396',
    'zfr': '\uD835\uDD37',
    'Zfr': '\u2128',
    'zhcy': '\u0436',
    'ZHcy': '\u0416',
    'zigrarr': '\u21DD',
    'zopf': '\uD835\uDD6B',
    'Zopf': '\u2124',
    'zscr': '\uD835\uDCCF',
    'Zscr': '\uD835\uDCB5',
    'zwj': '\u200D',
    'zwnj': '\u200C'
  };
  var decodeMapLegacy = {
    'aacute': '\xE1',
    'Aacute': '\xC1',
    'acirc': '\xE2',
    'Acirc': '\xC2',
    'acute': '\xB4',
    'aelig': '\xE6',
    'AElig': '\xC6',
    'agrave': '\xE0',
    'Agrave': '\xC0',
    'amp': '&',
    'AMP': '&',
    'aring': '\xE5',
    'Aring': '\xC5',
    'atilde': '\xE3',
    'Atilde': '\xC3',
    'auml': '\xE4',
    'Auml': '\xC4',
    'brvbar': '\xA6',
    'ccedil': '\xE7',
    'Ccedil': '\xC7',
    'cedil': '\xB8',
    'cent': '\xA2',
    'copy': '\xA9',
    'COPY': '\xA9',
    'curren': '\xA4',
    'deg': '\xB0',
    'divide': '\xF7',
    'eacute': '\xE9',
    'Eacute': '\xC9',
    'ecirc': '\xEA',
    'Ecirc': '\xCA',
    'egrave': '\xE8',
    'Egrave': '\xC8',
    'eth': '\xF0',
    'ETH': '\xD0',
    'euml': '\xEB',
    'Euml': '\xCB',
    'frac12': '\xBD',
    'frac14': '\xBC',
    'frac34': '\xBE',
    'gt': '>',
    'GT': '>',
    'iacute': '\xED',
    'Iacute': '\xCD',
    'icirc': '\xEE',
    'Icirc': '\xCE',
    'iexcl': '\xA1',
    'igrave': '\xEC',
    'Igrave': '\xCC',
    'iquest': '\xBF',
    'iuml': '\xEF',
    'Iuml': '\xCF',
    'laquo': '\xAB',
    'lt': '<',
    'LT': '<',
    'macr': '\xAF',
    'micro': '\xB5',
    'middot': '\xB7',
    'nbsp': '\xA0',
    'not': '\xAC',
    'ntilde': '\xF1',
    'Ntilde': '\xD1',
    'oacute': '\xF3',
    'Oacute': '\xD3',
    'ocirc': '\xF4',
    'Ocirc': '\xD4',
    'ograve': '\xF2',
    'Ograve': '\xD2',
    'ordf': '\xAA',
    'ordm': '\xBA',
    'oslash': '\xF8',
    'Oslash': '\xD8',
    'otilde': '\xF5',
    'Otilde': '\xD5',
    'ouml': '\xF6',
    'Ouml': '\xD6',
    'para': '\xB6',
    'plusmn': '\xB1',
    'pound': '\xA3',
    'quot': '"',
    'QUOT': '"',
    'raquo': '\xBB',
    'reg': '\xAE',
    'REG': '\xAE',
    'sect': '\xA7',
    'shy': '\xAD',
    'sup1': '\xB9',
    'sup2': '\xB2',
    'sup3': '\xB3',
    'szlig': '\xDF',
    'thorn': '\xFE',
    'THORN': '\xDE',
    'times': '\xD7',
    'uacute': '\xFA',
    'Uacute': '\xDA',
    'ucirc': '\xFB',
    'Ucirc': '\xDB',
    'ugrave': '\xF9',
    'Ugrave': '\xD9',
    'uml': '\xA8',
    'uuml': '\xFC',
    'Uuml': '\xDC',
    'yacute': '\xFD',
    'Yacute': '\xDD',
    'yen': '\xA5',
    'yuml': '\xFF'
  };
  var decodeMapNumeric = {
    '0': '\uFFFD',
    '128': '\u20AC',
    '130': '\u201A',
    '131': '\u0192',
    '132': '\u201E',
    '133': '\u2026',
    '134': '\u2020',
    '135': '\u2021',
    '136': '\u02C6',
    '137': '\u2030',
    '138': '\u0160',
    '139': '\u2039',
    '140': '\u0152',
    '142': '\u017D',
    '145': '\u2018',
    '146': '\u2019',
    '147': '\u201C',
    '148': '\u201D',
    '149': '\u2022',
    '150': '\u2013',
    '151': '\u2014',
    '152': '\u02DC',
    '153': '\u2122',
    '154': '\u0161',
    '155': '\u203A',
    '156': '\u0153',
    '158': '\u017E',
    '159': '\u0178'
  };
  var invalidReferenceCodePoints = [1, 2, 3, 4, 5, 6, 7, 8, 11, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 64976, 64977, 64978, 64979, 64980, 64981, 64982, 64983, 64984, 64985, 64986, 64987, 64988, 64989, 64990, 64991, 64992, 64993, 64994, 64995, 64996, 64997, 64998, 64999, 65000, 65001, 65002, 65003, 65004, 65005, 65006, 65007, 65534, 65535, 131070, 131071, 196606, 196607, 262142, 262143, 327678, 327679, 393214, 393215, 458750, 458751, 524286, 524287, 589822, 589823, 655358, 655359, 720894, 720895, 786430, 786431, 851966, 851967, 917502, 917503, 983038, 983039, 1048574, 1048575, 1114110, 1114111];
  /*--------------------------------------------------------------------------*/

  var stringFromCharCode = String.fromCharCode;
  var object = {};
  var hasOwnProperty = object.hasOwnProperty;

  var has = function (object, propertyName) {
    return hasOwnProperty.call(object, propertyName);
  };

  var contains = function (array, value) {
    var index = -1;
    var length = array.length;

    while (++index < length) {
      if (array[index] == value) {
        return true;
      }
    }

    return false;
  };

  var merge = function (options, defaults) {
    if (!options) {
      return defaults;
    }

    var result = {};
    var key;

    for (key in defaults) {
      // A `hasOwnProperty` check is not needed here, since only recognized
      // option names are used anyway. Any others are ignored.
      result[key] = has(options, key) ? options[key] : defaults[key];
    }

    return result;
  }; // Modified version of `ucs2encode`; see https://mths.be/punycode.


  var codePointToSymbol = function (codePoint, strict) {
    var output = '';

    if (codePoint >= 0xD800 && codePoint <= 0xDFFF || codePoint > 0x10FFFF) {
      // See issue #4:
      // “Otherwise, if the number is in the range 0xD800 to 0xDFFF or is
      // greater than 0x10FFFF, then this is a parse error. Return a U+FFFD
      // REPLACEMENT CHARACTER.”
      if (strict) {
        parseError('character reference outside the permissible Unicode range');
      }

      return '\uFFFD';
    }

    if (has(decodeMapNumeric, codePoint)) {
      if (strict) {
        parseError('disallowed character reference');
      }

      return decodeMapNumeric[codePoint];
    }

    if (strict && contains(invalidReferenceCodePoints, codePoint)) {
      parseError('disallowed character reference');
    }

    if (codePoint > 0xFFFF) {
      codePoint -= 0x10000;
      output += stringFromCharCode(codePoint >>> 10 & 0x3FF | 0xD800);
      codePoint = 0xDC00 | codePoint & 0x3FF;
    }

    output += stringFromCharCode(codePoint);
    return output;
  };

  var hexEscape = function (codePoint) {
    return '&#x' + codePoint.toString(16).toUpperCase() + ';';
  };

  var decEscape = function (codePoint) {
    return '&#' + codePoint + ';';
  };

  var parseError = function (message) {
    throw Error('Parse error: ' + message);
  };
  /*--------------------------------------------------------------------------*/


  var encode = function (string, options) {
    options = merge(options, encode.options);
    var strict = options.strict;

    if (strict && regexInvalidRawCodePoint.test(string)) {
      parseError('forbidden code point');
    }

    var encodeEverything = options.encodeEverything;
    var useNamedReferences = options.useNamedReferences;
    var allowUnsafeSymbols = options.allowUnsafeSymbols;
    var escapeCodePoint = options.decimal ? decEscape : hexEscape;

    var escapeBmpSymbol = function (symbol) {
      return escapeCodePoint(symbol.charCodeAt(0));
    };

    if (encodeEverything) {
      // Encode ASCII symbols.
      string = string.replace(regexAsciiWhitelist, function (symbol) {
        // Use named references if requested & possible.
        if (useNamedReferences && has(encodeMap, symbol)) {
          return '&' + encodeMap[symbol] + ';';
        }

        return escapeBmpSymbol(symbol);
      }); // Shorten a few escapes that represent two symbols, of which at least one
      // is within the ASCII range.

      if (useNamedReferences) {
        string = string.replace(/&gt;\u20D2/g, '&nvgt;').replace(/&lt;\u20D2/g, '&nvlt;').replace(/&#x66;&#x6A;/g, '&fjlig;');
      } // Encode non-ASCII symbols.


      if (useNamedReferences) {
        // Encode non-ASCII symbols that can be replaced with a named reference.
        string = string.replace(regexEncodeNonAscii, function (string) {
          // Note: there is no need to check `has(encodeMap, string)` here.
          return '&' + encodeMap[string] + ';';
        });
      } // Note: any remaining non-ASCII symbols are handled outside of the `if`.

    } else if (useNamedReferences) {
      // Apply named character references.
      // Encode `<>"'&` using named character references.
      if (!allowUnsafeSymbols) {
        string = string.replace(regexEscape, function (string) {
          return '&' + encodeMap[string] + ';'; // no need to check `has()` here
        });
      } // Shorten escapes that represent two symbols, of which at least one is
      // `<>"'&`.


      string = string.replace(/&gt;\u20D2/g, '&nvgt;').replace(/&lt;\u20D2/g, '&nvlt;'); // Encode non-ASCII symbols that can be replaced with a named reference.

      string = string.replace(regexEncodeNonAscii, function (string) {
        // Note: there is no need to check `has(encodeMap, string)` here.
        return '&' + encodeMap[string] + ';';
      });
    } else if (!allowUnsafeSymbols) {
      // Encode `<>"'&` using hexadecimal escapes, now that they’re not handled
      // using named character references.
      string = string.replace(regexEscape, escapeBmpSymbol);
    }

    return string // Encode astral symbols.
    .replace(regexAstralSymbols, function ($0) {
      // https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
      var high = $0.charCodeAt(0);
      var low = $0.charCodeAt(1);
      var codePoint = (high - 0xD800) * 0x400 + low - 0xDC00 + 0x10000;
      return escapeCodePoint(codePoint);
    }) // Encode any remaining BMP symbols that are not printable ASCII symbols
    // using a hexadecimal escape.
    .replace(regexBmpWhitelist, escapeBmpSymbol);
  }; // Expose default options (so they can be overridden globally).


  encode.options = {
    'allowUnsafeSymbols': false,
    'encodeEverything': false,
    'strict': false,
    'useNamedReferences': false,
    'decimal': false
  };

  var decode = function (html, options) {
    options = merge(options, decode.options);
    var strict = options.strict;

    if (strict && regexInvalidEntity.test(html)) {
      parseError('malformed character reference');
    }

    return html.replace(regexDecode, function ($0, $1, $2, $3, $4, $5, $6, $7, $8) {
      var codePoint;
      var semicolon;
      var decDigits;
      var hexDigits;
      var reference;
      var next;

      if ($1) {
        reference = $1; // Note: there is no need to check `has(decodeMap, reference)`.

        return decodeMap[reference];
      }

      if ($2) {
        // Decode named character references without trailing `;`, e.g. `&amp`.
        // This is only a parse error if it gets converted to `&`, or if it is
        // followed by `=` in an attribute context.
        reference = $2;
        next = $3;

        if (next && options.isAttributeValue) {
          if (strict && next == '=') {
            parseError('`&` did not start a character reference');
          }

          return $0;
        } else {
          if (strict) {
            parseError('named character reference was not terminated by a semicolon');
          } // Note: there is no need to check `has(decodeMapLegacy, reference)`.


          return decodeMapLegacy[reference] + (next || '');
        }
      }

      if ($4) {
        // Decode decimal escapes, e.g. `&#119558;`.
        decDigits = $4;
        semicolon = $5;

        if (strict && !semicolon) {
          parseError('character reference was not terminated by a semicolon');
        }

        codePoint = parseInt(decDigits, 10);
        return codePointToSymbol(codePoint, strict);
      }

      if ($6) {
        // Decode hexadecimal escapes, e.g. `&#x1D306;`.
        hexDigits = $6;
        semicolon = $7;

        if (strict && !semicolon) {
          parseError('character reference was not terminated by a semicolon');
        }

        codePoint = parseInt(hexDigits, 16);
        return codePointToSymbol(codePoint, strict);
      } // If we’re still here, `if ($7)` is implied; it’s an ambiguous
      // ampersand for sure. https://mths.be/notes/ambiguous-ampersands


      if (strict) {
        parseError('named character reference was not terminated by a semicolon');
      }

      return $0;
    });
  }; // Expose default options (so they can be overridden globally).


  decode.options = {
    'isAttributeValue': false,
    'strict': false
  };

  var escape = function (string) {
    return string.replace(regexEscape, function ($0) {
      // Note: there is no need to check `has(escapeMap, $0)` here.
      return escapeMap[$0];
    });
  };
  /*--------------------------------------------------------------------------*/


  var he = {
    'version': '1.2.0',
    'encode': encode,
    'decode': decode,
    'escape': escape,
    'unescape': decode
  }; // Some AMD build optimizers, like r.js, check for specific condition patterns
  // like the following:

  if (true) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
      return he;
    }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (freeExports && !freeExports.nodeType) {
    if (freeModule) {
      // in Node.js, io.js, or RingoJS v0.8.0+
      freeModule.exports = he;
    } else {
      // in Narwhal or RingoJS v0.7.0-
      for (var key in he) {
        has(he, key) && (freeExports[key] = he[key]);
      }
    }
  } else {
    // in Rhino or a web browser
    root.he = he;
  }
})(this);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(70)(module), __webpack_require__(13)))

/***/ })

/******/ });