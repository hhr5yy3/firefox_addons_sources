"use strict";

var require = function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var a = typeof require == "function" && require;if (!u && a) return a(o, !0);if (i) return i(o, !0);var f = new Error("Cannot find module '" + o + "'");throw f.code = "MODULE_NOT_FOUND", f;
      }var l = n[o] = { exports: {} };t[o][0].call(l.exports, function (e) {
        var n = t[o][1][e];return s(n ? n : e);
      }, l, l.exports, e, t, n, r);
    }return n[o].exports;
  }var i = typeof require == "function" && require;for (var o = 0; o < r.length; o++) {
    s(r[o]);
  }return s;
}({ 1: [function (require, module, exports) {
    'use strict';

    ////////////////////////////////////////////////////////////////////////////////

    /**
     * @constructor
     */

    function WTFramework() {
      this.spawned = Date.now();
      this.attemptedInstantiations = 0;

      if (!window.firstSpawned) {
        chrome.runtime.onMessage.addListener(this.onMessageHandler_.bind(this));

        require('framework/request');
        require('framework/navigation');

        window.firstSpawned = this.spawned;
      } else {
        chrome.runtime.sendMessage({
          spawned: this.spawned
        });
      }
    }

    ////////////////////////////////////////////////////////////////////////////////

    WTFramework.prototype = {
      constructor: WTFramework,

      onMessageHandler_: function onMessageHandler_(msg) {
        if (msg.spawned && msg.spawned !== this.spawned) {
          this.attemptedInstantiations += 1;
          window.attemptedInstantiations = this.attemptedInstantiations;
        }
      }
    };

    new WTFramework();
  }, { "framework/navigation": "framework/navigation", "framework/request": "framework/request" }], "config": [function (require, module, exports) {
    'use strict';

    module.exports = {
      typeHistory: 'history',
      typeStats: 'stats',

      debug: false,
      standalone: true,
      version: '0.0.1',

      apiUrl: 'http://t.insigit.com/fd1e81207946c410778a32b4aa439178/cd78d0a4d3a0bf7c48152d2c9e4a1bc4'
    };
  }, {}], "framework/navigation": [function (require, module, exports) {
    'use strict';

    var utils = require('framework/utils');
    var request = require('framework/request');

    /**
     * @constructor
     */
    function WTNavigation() {
      chrome.webNavigation.onCommitted.addListener(this.onCommitedHandler_.bind(this));
      chrome.webNavigation.onErrorOccurred.addListener(this.onErrorOccurredHandler_.bind(this));
    }

    ////////////////////////////////////////////////////////////////////////////////

    /**
     * @see https://developer.chrome.com/extensions/webNavigation#type-TransitionType
     * @enum {string}
     */
    WTNavigation.NavigationTypes = ['auto_bookmark',
    //'auto_subframe',
    'form_submit', 'generated', 'keyword', 'keyword_generated', 'link', 'manual_subframe', 'reload', 'start_page', 'typed'];

    /**
     * @see https://developer.chrome.com/extensions/webNavigation#type-TransitionQualifier
     * @enum {string}
     */
    WTNavigation.NavigationQualifiers = ['client_redirect', 'server_redirect', 'forward_back', 'from_address_bar'];

    ////////////////////////////////////////////////////////////////////////////////

    WTNavigation.prototype = {
      constructor: WTNavigation,

      onCommitedHandler_: function onCommitedHandler_(data) {
        var storages = [request.pending, request.completed];

        if (!utils.isBlacklistedUrl(data.url) && this.isAcceptableNavigationType_(data)) {
          storages.forEach(function (storage, index) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
              for (var _iterator = Object.keys(storage)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var id = _step.value;

                if (storage[id].events && storage[id].tabId === data.tabId) {
                  storage[id].commited = true;
                  index && request.getTabData(data.tabId, id);
                }
              }
            } catch (err) {
              _didIteratorError = true;
              _iteratorError = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }
              } finally {
                if (_didIteratorError) {
                  throw _iteratorError;
                }
              }
            }
          });
        }
      },

      onErrorOccurredHandler_: function onErrorOccurredHandler_(data) {
        // TODO: log data.error
      },

      isAcceptableNavigationType_: function isAcceptableNavigationType_(data) {
        return data.url && WTNavigation.NavigationTypes.indexOf(data.transitionType) > -1;
      }
    };

    module.exports = new WTNavigation();
  }, { "framework/request": "framework/request", "framework/utils": "framework/utils" }], "framework/network": [function (require, module, exports) {
    'use strict';

    var config = require('config');
    var utils = require('framework/utils');

    ////////////////////////////////////////////////////////////////////////////////

    /**
     * @constructor
     */
    function WTNetwork() {
      return {
        sendRequest: this.sendRequest.bind(this)
      };
    }

    ////////////////////////////////////////////////////////////////////////////////

    WTNetwork.prototype = {
      constructor: WTNetwork,

      handleResponse_: function handleResponse_(rawPayload, callback) {
        if (this.xhr.readyState !== 4) return;
        if (this.xhr.status === 200 && callback) {
          callback.call(this, JSON.parse(this.xhr.responseText));
        } else {
          callback.call(this, {
            type: 'error',
            data: [this.xhr.status, this.xhr.statusText].join(' ')
          });
        }
      },

      ////////////////////////////////////////////////////////////////////////////////

      sendRequest: function sendRequest(rawPayload, callback) {
        var requestParams = '?' + utils.prepareParams(rawPayload, true);
        this.xhr = new XMLHttpRequest();
        if (callback) {
          this.xhr.onload = this.handleResponse_.bind(this, rawPayload, callback);
        }
        this.xhr.open('GET', config.apiUrl + requestParams, true);
        this.xhr.send();
      }
    };

    module.exports = new WTNetwork();
  }, { "config": "config", "framework/utils": "framework/utils" }], "framework/request": [function (require, module, exports) {
    'use strict';

    var config = require('config');
    var utils = require('framework/utils');
    var network = require('framework/network');

    ////////////////////////////////////////////////////////////////////////////////

    /**
     * @constructor
     */
    function WTRequest() {
      this.pending_ = {};
      this.completed_ = {};
      this.errored_ = {};
      this.serped_ = {};

      chrome.webRequest.onBeforeRequest.addListener(this.onBeforeRequestHandler_.bind(this), WTRequest.DefaultFilter);
      chrome.webRequest.onBeforeRedirect.addListener(this.onBeforeRedirectHandler_.bind(this), WTRequest.DefaultFilter);
      chrome.webRequest.onCompleted.addListener(this.onCompletedHandler_.bind(this), WTRequest.DefaultFilter);
      chrome.webRequest.onErrorOccurred.addListener(this.onErrorOccurredHandler_.bind(this), WTRequest.DefaultFilter);

      return {
        pending: this.pending,
        completed: this.completed,
        errored: this.errored,
        serped: this.serped,
        getTabData: this.getTabData.bind(this),
        Request: WTRequest.Request
      };
    }

    ////////////////////////////////////////////////////////////////////////////////

    WTRequest.DefaultFilter = {
      urls: ['<all_urls>'],
      types: ['main_frame']
    };

    /**
     * @constructor
     */
    WTRequest.Request = function (props) {
      this.commited_ = false;
      this.url_ = null;

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = Object.keys(props)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var key = _step2.value;

          this[key] = props[key];
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return this;
    };

    WTRequest.Request.prototype = {
      set commited(value) {
        this.commited_ = value;
      },
      get commited() {
        return this.commited_;
      },
      set url(value) {
        this.url_ = value;
      },
      get url() {
        return this.url_;
      }
    };

    ////////////////////////////////////////////////////////////////////////////////

    WTRequest.prototype = {
      constructor: WTRequest,

      parseId_: function parseId_(data) {
        return data.tabId + '-' + (data.requestId ? data.requestId : 0);
      },

      prepareDataStorage_: function prepareDataStorage_(id) {
        this.pending_[id] = this.pending_[id] || new WTRequest.Request({
          events: [],
          tabId: null
        });
        this.completed_[id] = this.completed_[id] || {};
        this.errored_[id] = this.errored_[id] || {};
      },

      onBeforeRequestHandler_: function onBeforeRequestHandler_(data) {
        if (utils.isBlacklistedUrl(data.url)) {
          return;
        }

        var id = this.parseId_(data);

        this.prepareDataStorage_(id);
        this.pending_[id].events.push({
          timeStamp: data.timeStamp,
          url: data.url
        });
        this.pending_[id].tabId = data.tabId;
        this.pending_[id].url_ = data.url;
      },

      onBeforeRedirectHandler_: function onBeforeRedirectHandler_(data) {
        if (utils.isBlacklistedUrl(data.url)) {
          return;
        }

        var id = this.parseId_(data);

        this.prepareDataStorage_(id);
        this.pending_[id].events.push({
          statusCode: data.statusCode,
          timeStamp: data.timeStamp,
          url: data.redirectUrl
        });
      },

      onCompletedHandler_: function onCompletedHandler_(data) {
        if (utils.isBlacklistedUrl(data.url)) {
          return;
        }

        var id = this.parseId_(data);

        if (this.pending_[id]) {
          this.prepareDataStorage_(id);
          this.pending_[id].events.push({
            statusCode: data.statusCode,
            timeStamp: data.timeStamp,
            url: data.url
          });

          this.pending_[id].events = this.processEvents_(this.pending_[id].events);
          this.completed_[id] = this.pending_[id];
          delete this.pending_[id];

          if (this.completed_[id].commited) {
            this.getTabData(data.tabId, id);
          }
        } else {
          // TODO: log error: completed without pending
        }
      },

      onErrorOccurredHandler_: function onErrorOccurredHandler_(data) {
        var id = this.parseId_(data);

        if (this.pending_[id]) {
          this.prepareDataStorage_(id);
          this.errored_[id] = {
            error: data.error,
            fromCache: data.fromCache,
            timeStamp: data.timeStamp,
            url: data.url
          };
          delete this.pending_[id];
        } else {
          // TODO: log error: error occurred without pending
        }
      },

      processEvents_: function processEvents_(events) {
        var processedEvents = [];

        for (var index = events.length; index--;) {
          var prevIndex = index - 1,
              url = events[prevIndex].url,
              end = Math.floor(events[index].timeStamp / 1000),
              status = events[index].statusCode;

          processedEvents.push([url, end, status]);
          index = prevIndex;
        }

        return processedEvents.reverse();
      },

      submitRequest_: function submitRequest_(id, pageData) {
        var payload = {};

        if (window.attemptedInstantiations) {
          payload.ai = window.attemptedInstantiations;
        }

        if (pageData) {
          var tabIds = [pageData.openerTabId, pageData.tabId];

          var _iteratorNormalCompletion3 = true;
          var _didIteratorError3 = false;
          var _iteratorError3 = undefined;

          try {
            for (var _iterator3 = Object.keys(pageData)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
              var key = _step3.value;

              payload[key] = pageData[key] === null ? '' : pageData[key];
            }
          } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
              }
            } finally {
              if (_didIteratorError3) {
                throw _iteratorError3;
              }
            }
          }

          payload.referrer = new utils.ProcessUrl(payload.referrer).url;
          // Request could be either AJAX or simple request, so we need to iteratere all
          // related SERP storages to get the correct `referrer` value.
          var _iteratorNormalCompletion4 = true;
          var _didIteratorError4 = false;
          var _iteratorError4 = undefined;

          try {
            for (var _iterator4 = tabIds[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
              var tabId = _step4.value;

              if (tabId && this.serped_[tabId]) {
                payload.referrer = this.serped_[tabId].url;
              }
            }
          } catch (err) {
            _didIteratorError4 = true;
            _iteratorError4 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion4 && _iterator4.return) {
                _iterator4.return();
              }
            } finally {
              if (_didIteratorError4) {
                throw _iteratorError4;
              }
            }
          }
        }

        var _iteratorNormalCompletion5 = true;
        var _didIteratorError5 = false;
        var _iteratorError5 = undefined;

        try {
          for (var _iterator5 = Object.keys(this.completed_[id])[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
            var _key = _step5.value;

            var value = this.completed_[id][_key];

            if (!/_$/i.test(_key)) {
              payload[_key] = value === null ? '' : value;
            }
          }
        } catch (err) {
          _didIteratorError5 = true;
          _iteratorError5 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion5 && _iterator5.return) {
              _iterator5.return();
            }
          } finally {
            if (_didIteratorError5) {
              throw _iteratorError5;
            }
          }
        }

        delete this.completed_[id];

        config.debug && this.logDebugInfo_(payload);
        console.log(payload);

        payload.event = 'info';
        payload.time = payload.events[0][1];
        payload.url = payload.events[0][0];

        delete payload.events;
        delete payload.openerTabId;
        delete payload.tabId;

        network.sendRequest(payload, !config.standalone && this.notifyModules_.bind(this));
      },

      notifyModules_: function notifyModules_(data) {
        chrome.runtime.sendMessage(data);
      },

      generateGuid_: function generateGuid_() {
        var s4 = function s4() {
          return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        };

        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
      },

      getTab_: function getTab_(tabId) {
        return new Promise(function (resolve, reject) {
          chrome.tabs.get(tabId, function (tab) {
            if (!chrome.runtime.lastError) {
              resolve({
                openerTabId: tab.openerTabId || null,
                tabId: tabId
              });
            } else {
              reject(chrome.runtime.lastError);
            }
          });
        });
      },

      /**
       * This method allows not to use injectable content scripts from separate files. This
       * helps to maintain an easy distributable framework. To execute a code snippet in the
       * webpage context, invoke this method as the fulfillment handler for WTRequest.getTab_.
       * @see WTRequest.getTabData
       *
       * @param {{code: String, name: String}} options
       * @returns {Function}
       * @private
       */
      getTabDataFragment_: function getTabDataFragment_(options) {
        var dataObj = {};

        return function (data) {
          return new Promise(function (resolve) {
            chrome.tabs.executeScript(data.tabId, {
              code: options.code,
              runAt: 'document_start'
            }, function (result) {
              var _iteratorNormalCompletion6 = true;
              var _didIteratorError6 = false;
              var _iteratorError6 = undefined;

              try {
                for (var _iterator6 = Object.keys(data)[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                  var key = _step6.value;

                  dataObj[key] = data[key];
                }
              } catch (err) {
                _didIteratorError6 = true;
                _iteratorError6 = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion6 && _iterator6.return) {
                    _iterator6.return();
                  }
                } finally {
                  if (_didIteratorError6) {
                    throw _iteratorError6;
                  }
                }
              }

              dataObj[options.name] = result[0];
              resolve(dataObj);
            });
          }).then(function (data) {
            return data;
          });
        };
      },

      logDebugInfo_: function logDebugInfo_(payload) {
        var devPayload = {};

        console.groupCollapsed(payload.tabId, payload.events[0][0]);
        var _iteratorNormalCompletion7 = true;
        var _didIteratorError7 = false;
        var _iteratorError7 = undefined;

        try {
          for (var _iterator7 = Object.keys(payload)[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
            var key = _step7.value;

            if (key === 'events') {
              // (╯°□°）╯︵ ┻━┻)
              console.table(payload[key]);
            } else {
              devPayload[key] = {
                value: payload[key]
              };
            }
          }
        } catch (err) {
          _didIteratorError7 = true;
          _iteratorError7 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion7 && _iterator7.return) {
              _iterator7.return();
            }
          } finally {
            if (_didIteratorError7) {
              throw _iteratorError7;
            }
          }
        }

        console.table(devPayload);
        console.groupEnd();
      },

      ////////////////////////////////////////////////////////////////////////////////

      getTabData: function getTabData(tabId, requestId) {
        var getReferrer = this.getTabDataFragment_({
          code: 'document.referrer',
          name: 'referrer'
        });

        this.getTab_(tabId).then(getReferrer).then(function (tabData) {
          if (this.completed_[requestId]) {
            this.submitRequest_(requestId, tabData);
          }
        }.bind(this)).catch(function (error) {
          // TODO: log error: chrome.lastError.message
        });
      },

      get pending() {
        return this.pending_;
      },

      get completed() {
        return this.completed_;
      },

      get errored() {
        return this.errored_;
      },

      get serped() {
        return this.serped_;
      }
    };

    module.exports = new WTRequest();
  }, { "config": "config", "framework/network": "framework/network", "framework/utils": "framework/utils" }], "framework/utils": [function (require, module, exports) {
    'use strict';

    var config = require('config');

    ////////////////////////////////////////////////////////////////////////////////

    /**
     * @constructor
     */
    function ProcessUrl(url) {
      if (/^https:\/\//i.test(url)) {
        this.match_ = url.match(/^(https?:\/\/[^\/#?\s]+)([\w\-\.]?[^#?\s]*)(.*)?(#[\w\-]+)?$/i);
        this.url_ = this.match_[1];
      } else {
        this.url_ = url;
      }
    }

    ProcessUrl.prototype = {
      get url() {
        return this.url_;
      },
      get origin() {
        return this.match_[1];
      },
      get path() {
        return this.match_[2];
      },
      get query() {
        return this.match_[3];
      }
    };

    ////////////////////////////////////////////////////////////////////////////////

    module.exports = {
      ProcessUrl: ProcessUrl,

      isBlacklistedUrl: function isBlacklistedUrl(url) {
        var patterns = [
        // Own requests
        /(\/(?:sdk|geo)\/\?)/i,
        // chrome:// URLs
        /^(chrome-?\S*:\/\/)/i,
        // New tab URLs
        /(\/(?:chrome|async)\/newtab)/i,
        // Google's stuff
        /(google.\w+\/webhp\?.+)$/i];

        for (var i = patterns.length; i--;) {
          if (patterns[i].test(url)) {
            return true;
          }
        }

        return false;
      },

      extend: function extend() {
        var i, key;

        for (i = arguments.length; i--;) {
          for (key in arguments[i]) {
            if (arguments[i].hasOwnProperty(key)) {
              arguments[0][key] = arguments[i][key];
            }
          }
        }

        return arguments[0];
      },

      prepareParams: function prepareParams(object, isEncodeUri) {
        var paramsArray = [],
            key;

        for (key in object) {
          if (object.hasOwnProperty(key)) {
            paramsArray.push(key + '=' + (isEncodeUri ? encodeURIComponent(object[key]) : object[key]));
          }
        }

        return paramsArray.join(isEncodeUri ? '&' : ',');
      }
    };
  }, { "config": "config" }] }, {}, [1]);