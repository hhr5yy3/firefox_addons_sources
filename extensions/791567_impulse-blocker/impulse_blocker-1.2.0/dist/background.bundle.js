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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/background.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/dayjs/dayjs.min.js":
/*!*****************************************!*\
  !*** ./node_modules/dayjs/dayjs.min.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!function(t,e){ true?module.exports=e():undefined}(this,function(){"use strict";var t="millisecond",e="second",n="minute",r="hour",i="day",s="week",u="month",a="quarter",o="year",f="date",h=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[^0-9]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,c=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,d={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},$=function(t,e,n){var r=String(t);return!r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},l={s:$,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return(e<=0?"+":"-")+$(r,2,"0")+":"+$(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,u),s=n-i<0,a=e.clone().add(r+(s?-1:1),u);return+(-(r+(n-i)/(s?i-a:a-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(h){return{M:u,y:o,w:s,d:i,D:f,h:r,m:n,s:e,ms:t,Q:a}[h]||String(h||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},y="en",M={};M[y]=d;var m=function(t){return t instanceof S},D=function(t,e,n){var r;if(!t)return y;if("string"==typeof t)M[t]&&(r=t),e&&(M[t]=e,r=t);else{var i=t.name;M[i]=t,r=i}return!n&&r&&(y=r),r||!n&&y},v=function(t,e){if(m(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new S(n)},g=l;g.l=D,g.i=m,g.w=function(t,e){return v(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var S=function(){function d(t){this.$L=D(t.locale,null,!0),this.parse(t)}var $=d.prototype;return $.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(g.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match(h);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},$.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},$.$utils=function(){return g},$.isValid=function(){return!("Invalid Date"===this.$d.toString())},$.isSame=function(t,e){var n=v(t);return this.startOf(e)<=n&&n<=this.endOf(e)},$.isAfter=function(t,e){return v(t)<this.startOf(e)},$.isBefore=function(t,e){return this.endOf(e)<v(t)},$.$g=function(t,e,n){return g.u(t)?this[e]:this.set(n,t)},$.unix=function(){return Math.floor(this.valueOf()/1e3)},$.valueOf=function(){return this.$d.getTime()},$.startOf=function(t,a){var h=this,c=!!g.u(a)||a,d=g.p(t),$=function(t,e){var n=g.w(h.$u?Date.UTC(h.$y,e,t):new Date(h.$y,e,t),h);return c?n:n.endOf(i)},l=function(t,e){return g.w(h.toDate()[t].apply(h.toDate("s"),(c?[0,0,0,0]:[23,59,59,999]).slice(e)),h)},y=this.$W,M=this.$M,m=this.$D,D="set"+(this.$u?"UTC":"");switch(d){case o:return c?$(1,0):$(31,11);case u:return c?$(1,M):$(0,M+1);case s:var v=this.$locale().weekStart||0,S=(y<v?y+7:y)-v;return $(c?m-S:m+(6-S),M);case i:case f:return l(D+"Hours",0);case r:return l(D+"Minutes",1);case n:return l(D+"Seconds",2);case e:return l(D+"Milliseconds",3);default:return this.clone()}},$.endOf=function(t){return this.startOf(t,!1)},$.$set=function(s,a){var h,c=g.p(s),d="set"+(this.$u?"UTC":""),$=(h={},h[i]=d+"Date",h[f]=d+"Date",h[u]=d+"Month",h[o]=d+"FullYear",h[r]=d+"Hours",h[n]=d+"Minutes",h[e]=d+"Seconds",h[t]=d+"Milliseconds",h)[c],l=c===i?this.$D+(a-this.$W):a;if(c===u||c===o){var y=this.clone().set(f,1);y.$d[$](l),y.init(),this.$d=y.set(f,Math.min(this.$D,y.daysInMonth())).$d}else $&&this.$d[$](l);return this.init(),this},$.set=function(t,e){return this.clone().$set(t,e)},$.get=function(t){return this[g.p(t)]()},$.add=function(t,a){var f,h=this;t=Number(t);var c=g.p(a),d=function(e){var n=v(h);return g.w(n.date(n.date()+Math.round(e*t)),h)};if(c===u)return this.set(u,this.$M+t);if(c===o)return this.set(o,this.$y+t);if(c===i)return d(1);if(c===s)return d(7);var $=(f={},f[n]=6e4,f[r]=36e5,f[e]=1e3,f)[c]||1,l=this.$d.getTime()+t*$;return g.w(l,this)},$.subtract=function(t,e){return this.add(-1*t,e)},$.format=function(t){var e=this;if(!this.isValid())return"Invalid Date";var n=t||"YYYY-MM-DDTHH:mm:ssZ",r=g.z(this),i=this.$locale(),s=this.$H,u=this.$m,a=this.$M,o=i.weekdays,f=i.months,h=function(t,r,i,s){return t&&(t[r]||t(e,n))||i[r].substr(0,s)},d=function(t){return g.s(s%12||12,t,"0")},$=i.meridiem||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r},l={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:g.s(a+1,2,"0"),MMM:h(i.monthsShort,a,f,3),MMMM:h(f,a),D:this.$D,DD:g.s(this.$D,2,"0"),d:String(this.$W),dd:h(i.weekdaysMin,this.$W,o,2),ddd:h(i.weekdaysShort,this.$W,o,3),dddd:o[this.$W],H:String(s),HH:g.s(s,2,"0"),h:d(1),hh:d(2),a:$(s,u,!0),A:$(s,u,!1),m:String(u),mm:g.s(u,2,"0"),s:String(this.$s),ss:g.s(this.$s,2,"0"),SSS:g.s(this.$ms,3,"0"),Z:r};return n.replace(c,function(t,e){return e||l[t]||r.replace(":","")})},$.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},$.diff=function(t,f,h){var c,d=g.p(f),$=v(t),l=6e4*($.utcOffset()-this.utcOffset()),y=this-$,M=g.m(this,$);return M=(c={},c[o]=M/12,c[u]=M,c[a]=M/3,c[s]=(y-l)/6048e5,c[i]=(y-l)/864e5,c[r]=y/36e5,c[n]=y/6e4,c[e]=y/1e3,c)[d]||y,h?M:g.a(M)},$.daysInMonth=function(){return this.endOf(u).$D},$.$locale=function(){return M[this.$L]},$.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=D(t,e,!0);return r&&(n.$L=r),n},$.clone=function(){return g.w(this.$d,this)},$.toDate=function(){return new Date(this.valueOf())},$.toJSON=function(){return this.isValid()?this.toISOString():null},$.toISOString=function(){return this.$d.toISOString()},$.toString=function(){return this.$d.toUTCString()},d}(),p=S.prototype;return v.prototype=p,[["$ms",t],["$s",e],["$m",n],["$H",r],["$W",i],["$M",u],["$y",o],["$D",f]].forEach(function(t){p[t[1]]=function(e){return this.$g(e,t[0],t[1])}}),v.extend=function(t,e){return t.$i||(t(e,S,v),t.$i=!0),v},v.locale=D,v.isDayjs=m,v.unix=function(t){return v(1e3*t)},v.en=M[y],v.Ls=M,v.p={},v});


/***/ }),

/***/ "./src/ImpulseBlocker.js":
/*!*******************************!*\
  !*** ./src/ImpulseBlocker.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dayjs */ "./node_modules/dayjs/dayjs.min.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _enums_extensionStatus__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./enums/extensionStatus */ "./src/enums/extensionStatus.js");
/* harmony import */ var _storage_Website__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./storage/Website */ "./src/storage/Website.js");
/* harmony import */ var _PopupIcon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./PopupIcon */ "./src/PopupIcon.js");
/* harmony import */ var _utils_functions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/functions */ "./src/utils/functions.js");






class ImpulseBlocker {
  constructor(storageHandler) {
    this.storageHandler = storageHandler;
    this.boot = this.boot.bind(this);
    this.onStorageUpdated = this.onStorageUpdated.bind(this);
    this.getState = this.getState.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.getBlockedDomains = this.getBlockedDomains.bind(this);
  }

  boot() {
    browser.storage.onChanged.addListener(this.onStorageUpdated);
    return this.storageHandler.getStatus().then(async ({
      status
    }) => {
      if (status === _enums_extensionStatus__WEBPACK_IMPORTED_MODULE_1__["default"].ON) {
        return this.start(false);
      }

      if (status === _enums_extensionStatus__WEBPACK_IMPORTED_MODULE_1__["default"].OFF) {
        return this.stop(false);
      }

      if (status === _enums_extensionStatus__WEBPACK_IMPORTED_MODULE_1__["default"].PAUSED) {
        /* pausedUntil format is 2021-01-10T11:52:32.067Z */
        return this.storageHandler.getPausedUntil().then(({
          pausedUntil
        }) => {
          if (!pausedUntil) {
            return this.start(false);
          }

          const pausedUntilParsed = dayjs__WEBPACK_IMPORTED_MODULE_0___default()(pausedUntil);
          const differenceFromNow = pausedUntilParsed.diff(dayjs__WEBPACK_IMPORTED_MODULE_0___default()(), 'second');

          if (differenceFromNow < 0) {
            return this.start(false);
          }

          return this.pause(differenceFromNow, false);
        });
      }

      return this.start(false);
    });
  }

  attachWebRequestListener() {
    return this.storageHandler.getBlockedWebsites().then(({
      sites
    }) => {
      if (!sites) {
        return false;
      }

      const domainsToBlock = Object(_utils_functions__WEBPACK_IMPORTED_MODULE_4__["createMatchPatterns"])(sites);
      browser.webRequest.onBeforeRequest.removeListener(_utils_functions__WEBPACK_IMPORTED_MODULE_4__["redirectToBlockedPage"]);

      if (domainsToBlock.length > 0) {
        browser.webRequest.onBeforeRequest.addListener(_utils_functions__WEBPACK_IMPORTED_MODULE_4__["redirectToBlockedPage"], {
          urls: domainsToBlock,
          types: ['main_frame']
        }, ['blocking']);
      }

      return true;
    });
  }

  onStorageUpdated(changes) {
    if (changes.sites === undefined) {
      return Promise.resolve('No need for action');
    }

    return this.storageHandler.getStatus().then(({
      status
    }) => {
      if (status === _enums_extensionStatus__WEBPACK_IMPORTED_MODULE_1__["default"].ON) {
        return this.attachWebRequestListener();
      }

      return Promise.resolve('No need for action');
    });
  }

  async stop(setStatus = true) {
    if (setStatus) {
      await this.storageHandler.setStatus(_enums_extensionStatus__WEBPACK_IMPORTED_MODULE_1__["default"].OFF);
    }

    await browser.webRequest.onBeforeRequest.removeListener(_utils_functions__WEBPACK_IMPORTED_MODULE_4__["redirectToBlockedPage"]);
    await _PopupIcon__WEBPACK_IMPORTED_MODULE_3__["default"].off();
  }

  async start(setStatus = true) {
    if (setStatus) {
      await this.storageHandler.setStatus(_enums_extensionStatus__WEBPACK_IMPORTED_MODULE_1__["default"].ON);
    }

    await this.attachWebRequestListener();
    await _PopupIcon__WEBPACK_IMPORTED_MODULE_3__["default"].on();
  }

  async pause(duration = 60 * 5, setStatus = true) {
    browser.webRequest.onBeforeRequest.removeListener(_utils_functions__WEBPACK_IMPORTED_MODULE_4__["redirectToBlockedPage"]);
    const pausedUntil = dayjs__WEBPACK_IMPORTED_MODULE_0___default()().add(duration, 'seconds');

    if (setStatus) {
      await this.storageHandler.setStatus(_enums_extensionStatus__WEBPACK_IMPORTED_MODULE_1__["default"].PAUSED);
    }

    await this.storageHandler.setPausedUntil(pausedUntil);
    await _PopupIcon__WEBPACK_IMPORTED_MODULE_3__["default"].off();
    setTimeout(() => {
      this.start();
    }, 1000 * duration);
  }

  isDomainBlocked(domainToCheck) {
    return this.storageHandler.getBlockedWebsites().then(({
      sites
    }) => {
      const domains = sites.map(site => site.domain);
      return domains.includes(domainToCheck);
    });
  }

  getBlockedDomains() {
    return this.storageHandler.getBlockedWebsites().then(storage => storage.sites.map(website => website.domain));
  }

  getState() {
    const promises = [this.storageHandler.getStatus(), this.storageHandler.getSettings(), this.storageHandler.getPausedUntil()];
    return Promise.all(promises).then(results => ({
      extensionStatus: results[0].status,
      extensionSettings: results[1].extensionSettings,
      pausedUntil: results[2].pausedUntil
    }));
  }

  updateStatus(newStatus) {
    if (newStatus === _enums_extensionStatus__WEBPACK_IMPORTED_MODULE_1__["default"].OFF) {
      return this.stop();
    }

    if (newStatus === _enums_extensionStatus__WEBPACK_IMPORTED_MODULE_1__["default"].ON) {
      return this.start();
    }

    return Promise.reject(new Error(`Unknown status: ${newStatus}`));
  }

  addToBlockList(domain) {
    const domainToBlock = domain.replace(/.*www\./, '');
    return this.storageHandler.getBlockedWebsites().then(({
      sites
    }) => {
      const updatedWebsites = [...sites, _storage_Website__WEBPACK_IMPORTED_MODULE_2__["default"].create(domainToBlock)];
      return this.storageHandler.setBlockedWebsites(updatedWebsites);
    });
  }

  removeFromBlockList(domain) {
    const domainToRemove = domain.replace(/.*www\./, '');
    return this.storageHandler.getBlockedWebsites().then(storage => {
      const updatedWebsites = storage.sites.filter(website => website.domain !== domainToRemove);
      return this.storageHandler.setBlockedWebsites(updatedWebsites);
    });
  }

  updateSetting(key, value) {
    return this.storageHandler.updateSetting(key, value);
  }

}

/* harmony default export */ __webpack_exports__["default"] = (ImpulseBlocker);

/***/ }),

/***/ "./src/PopupIcon.js":
/*!**************************!*\
  !*** ./src/PopupIcon.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const PopupIcon = {
  set: path => browser.browserAction.setIcon({
    path
  }),
  off: () => PopupIcon.set('icons/icon96-disabled.png'),
  on: () => PopupIcon.set('icons/icon96.png')
};
/* harmony default export */ __webpack_exports__["default"] = (PopupIcon);

/***/ }),

/***/ "./src/background.js":
/*!***************************!*\
  !*** ./src/background.js ***!
  \***************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ImpulseBlocker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ImpulseBlocker */ "./src/ImpulseBlocker.js");
/* harmony import */ var _enums_messages__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./enums/messages */ "./src/enums/messages.js");
/* harmony import */ var _enums_extensionStatus__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./enums/extensionStatus */ "./src/enums/extensionStatus.js");
/* harmony import */ var _enums_settings__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./enums/settings */ "./src/enums/settings.js");
/* harmony import */ var _utils_tabs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/tabs */ "./src/utils/tabs.js");
/* harmony import */ var _storage_StorageHandler__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./storage/StorageHandler */ "./src/storage/StorageHandler.js");






const blocker = new _ImpulseBlocker__WEBPACK_IMPORTED_MODULE_0__["default"](_storage_StorageHandler__WEBPACK_IMPORTED_MODULE_5__["default"]);
blocker.boot();
const messageHandlers = {
  [_enums_messages__WEBPACK_IMPORTED_MODULE_1__["default"].GET_CURRENT_DOMAIN]: _utils_tabs__WEBPACK_IMPORTED_MODULE_4__["default"],
  [_enums_messages__WEBPACK_IMPORTED_MODULE_1__["default"].IS_DOMAIN_BLOCKED]: req => blocker.isDomainBlocked(req.domain),
  [_enums_messages__WEBPACK_IMPORTED_MODULE_1__["default"].GET_EXTENSION_STATUS]: blocker.getState,
  [_enums_messages__WEBPACK_IMPORTED_MODULE_1__["default"].UPDATE_EXTENSION_STATUS]: req => blocker.updateStatus(req.parameter),
  [_enums_messages__WEBPACK_IMPORTED_MODULE_1__["default"].START_BLOCKING_DOMAIN]: req => blocker.addToBlockList(req.domain),
  [_enums_messages__WEBPACK_IMPORTED_MODULE_1__["default"].START_ALLOWING_DOMAIN]: req => blocker.removeFromBlockList(req.domain),
  [_enums_messages__WEBPACK_IMPORTED_MODULE_1__["default"].PAUSE_BLOCKER]: req => blocker.pause(req.duration),
  [_enums_messages__WEBPACK_IMPORTED_MODULE_1__["default"].UNPAUSE_BLOCKER]: blocker.start,
  [_enums_messages__WEBPACK_IMPORTED_MODULE_1__["default"].UPDATE_EXTENSION_SETTING]: req => blocker.updateSetting(req.key, req.value),
  [_enums_messages__WEBPACK_IMPORTED_MODULE_1__["default"].GET_BLOCKED_DOMAINS_LIST]: blocker.getBlockedDomains,
  default: req => {
    throw new Error('Message type not recognized: ', req.type);
  }
};
browser.runtime.onMessage.addListener(req => (messageHandlers[req.type] || messageHandlers.default)(req));
browser.runtime.onInstalled.addListener(() => {
  browser.storage.local.get('sites').then(storage => {
    // if the user is installed the extension first time
    // we should create the sites key in the storage
    if (!Array.isArray(storage.sites)) {
      return browser.storage.local.set({
        sites: []
      });
    }
  });
  browser.storage.local.get('extensionSettings').then(storage => {
    if (!Array.isArray(storage.extensionSettings)) {
      return browser.storage.local.set({
        extensionSettings: [{
          key: _enums_settings__WEBPACK_IMPORTED_MODULE_3__["default"].SHOW_ON_OFF_BUTTONS_IN_POPUP,
          value: _enums_settings__WEBPACK_IMPORTED_MODULE_3__["default"].ON
        }, {
          key: _enums_settings__WEBPACK_IMPORTED_MODULE_3__["default"].SHOW_PAUSE_BUTTONS_IN_POPUP,
          value: _enums_settings__WEBPACK_IMPORTED_MODULE_3__["default"].ON
        }]
      });
    }
  });
  browser.storage.local.get('status').then(storage => {
    if (!storage.status) {
      return browser.storage.local.set({
        status: _enums_extensionStatus__WEBPACK_IMPORTED_MODULE_2__["default"].ON
      });
    }
  });
});

/***/ }),

/***/ "./src/enums/extensionStatus.js":
/*!**************************************!*\
  !*** ./src/enums/extensionStatus.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const extensionStatus = {
  OFF: 'off',
  ON: 'on',
  PAUSED: 'paused'
};
Object.freeze(extensionStatus);
/* harmony default export */ __webpack_exports__["default"] = (extensionStatus);

/***/ }),

/***/ "./src/enums/messages.js":
/*!*******************************!*\
  !*** ./src/enums/messages.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const messages = {
  GET_EXTENSION_STATUS: 'getExtensionStatus',
  GET_CURRENT_DOMAIN: 'getCurrentDomain',
  IS_DOMAIN_BLOCKED: 'isDomainBlocked',
  UPDATE_EXTENSION_STATUS: 'updateExtensionStatus',
  START_BLOCKING_DOMAIN: 'startBlockingDomain',
  START_ALLOWING_DOMAIN: 'startAllowingDomain',
  GET_BLOCKED_DOMAINS_LIST: 'getBlockedDomainsList',
  PAUSE_BLOCKER: 'pauseBlocker',
  UNPAUSE_BLOCKER: 'unpauseBlocker',
  UPDATE_EXTENSION_SETTING: 'updateExtensionSetting'
};
Object.freeze(messages);
/* harmony default export */ __webpack_exports__["default"] = (messages);

/***/ }),

/***/ "./src/enums/settings.js":
/*!*******************************!*\
  !*** ./src/enums/settings.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const settings = {
  SHOW_ON_OFF_BUTTONS_IN_POPUP: 'showOnOffButtonsInPopup',
  SHOW_PAUSE_BUTTONS_IN_POPUP: 'showPauseButtonsInPopup',
  ON: 'on',
  OFF: 'off'
};
Object.freeze(settings);
/* harmony default export */ __webpack_exports__["default"] = (settings);

/***/ }),

/***/ "./src/storage/StorageHandler.js":
/*!***************************************!*\
  !*** ./src/storage/StorageHandler.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const StorageHandler = {
  getStatus: () => browser.storage.local.get('status'),
  setStatus: status => browser.storage.local.set({
    status
  }),
  getSettings: () => browser.storage.local.get('extensionSettings'),
  getBlockedWebsites: () => browser.storage.local.get('sites'),
  setBlockedWebsites: sites => browser.storage.local.set({
    sites
  }),
  setPausedUntil: datetime => browser.storage.local.set({
    pausedUntil: datetime.toISOString()
  }),
  getPausedUntil: () => browser.storage.local.get('pausedUntil'),
  updateSetting: (key, value) => StorageHandler.getSettings().then(storage => {
    const updatedSettings = storage.extensionSettings.filter(setting => setting.key !== key);
    updatedSettings.push({
      key,
      value
    });
    browser.storage.local.set({
      extensionSettings: updatedSettings
    });
    return updatedSettings;
  })
};
/* harmony default export */ __webpack_exports__["default"] = (StorageHandler);

/***/ }),

/***/ "./src/storage/Website.js":
/*!********************************!*\
  !*** ./src/storage/Website.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dayjs */ "./node_modules/dayjs/dayjs.min.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_0__);


class Website {
  static create(url) {
    return {
      domain: url,
      isActive: true,
      timesBlocked: 0,
      createdAt: dayjs__WEBPACK_IMPORTED_MODULE_0___default()().format()
    };
  }

}

/* harmony default export */ __webpack_exports__["default"] = (Website);

/***/ }),

/***/ "./src/utils/functions.js":
/*!********************************!*\
  !*** ./src/utils/functions.js ***!
  \********************************/
/*! exports provided: openOptionsPage, redirectToBlockedPage, createMatchPatterns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "openOptionsPage", function() { return openOptionsPage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "redirectToBlockedPage", function() { return redirectToBlockedPage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createMatchPatterns", function() { return createMatchPatterns; });
function openOptionsPage() {
  browser.runtime.openOptionsPage();
  window.close();
}
function redirectToBlockedPage(requestDetails) {
  const original = encodeURIComponent(requestDetails.url);
  const theme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  const interceptPage = `/resources/redirect.html?target=${original}&theme=${theme}`;
  browser.tabs.update(requestDetails.tabId, {
    url: interceptPage
  });
}
function createMatchPatterns(sites) {
  return sites.map(site => `*://*.${site.domain}/*`);
}

/***/ }),

/***/ "./src/utils/tabs.js":
/*!***************************!*\
  !*** ./src/utils/tabs.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getCurrentWebsiteDomain; });
function getActiveTab() {
  return browser.tabs.query({
    active: true,
    currentWindow: true
  });
}

function parse(url) {
  try {
    const domain = new URL(url); // dont show the button for non-http pages

    if (['http:', 'https:'].indexOf(domain.protocol) === -1) {
      throw new Error('URLS with non-http protocols are not supported.');
    }

    return domain.hostname.replace(/^www\./, '');
  } catch (e) {
    return false;
  }
}

function getCurrentWebsiteDomain() {
  return getActiveTab().then(tabs => {
    const activeTab = tabs[0];
    return parse(activeTab.url);
  });
}

/***/ })

/******/ });
//# sourceMappingURL=background.bundle.js.map