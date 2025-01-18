// Location of the proxy script, relative to manifest.json
const proxyScriptURL = "proxy/proxy-script.js";

// Default settings. If there is nothing in storage, use these values.
const defaultSettings = {
  proxified: 'DIRECT'
}


//browser.runtime.onMessage.addListener(handleMessage);


// Register the proxy script
// Listen for a request to open a webpage
var hmipvpnspecHost, hmipvpnspecPort, hmipvpnspecUseIt, hmipvpnspecList;
function hmipvpnspecgetSaved() {
  chrome.storage.local.get(['host', 'port', 'useit'], function (result) {
    hmipvpnspecHost = result.host;
    hmipvpnspecPort = result.port;
    hmipvpnspecUseIt = result.useit;
  });
}

browser.proxy.onRequest.addListener(handleProxyRequest, { urls: ["<all_urls>"] });
function shouldProxyRequest(requestInfo) {
  return requestInfo.parentFrameId != -1;
}


// On the request to open a webpage
function handleProxyRequest(requestInfo) {
  hmipvpnspecgetSaved();
  console.log(hmipvpnspecHost + "\t" + hmipvpnspecPort+"\t"+hmipvpnspecList);

  if (typeof hmipvpnspecHost !== "undefined" && hmipvpnspecUseIt) {
    // Read the web address of the page to be visited 
    const url = new URL(requestInfo.url);
    // Determine whether the domain in the web address is on the blocked hosts list
    //if (blockedHosts.indexOf(url.hostname) != -1)
    //if (shouldProxyRequest(requestInfo)) 
    var mysite = (requestInfo.url.indexOf('api.hide-my-ip.com') != -1 || requestInfo.url.indexOf('www.hideyourselfonline.com') != -1);
  //  console.log(!mysite);

    if (!mysite) {
      // Write details of the proxied host to the console and return the proxy address
      console.log(`Proxying: ${url.hostname}`);
      //console.log("http \t" + result.host + result.port);
      if (hmipvpnspecList === "list2")
        return { type: "socks", host: hmipvpnspecHost, port: hmipvpnspecPort };
      else if (hmipvpnspecList === "list1")
        return { type: "http", host: hmipvpnspecHost, port: hmipvpnspecPort };


    }
    // Return instructions to open the requested webpage
  }
  console.log("now direct");
  return { type: "direct" };
}


// Log any errors from the proxy script
browser.proxy.onError.addListener(error => {
  console.error(`Proxy error: ${error.message}`);
});


// Initialize the proxy
function handleInit() {
  // update the proxy whenever stored settings change
  browser.storage.onChanged.addListener((newSettings) => {
    browser.runtime.sendMessage(newSettings.proxified.newValue, { toProxyScript: true });
  });

  browser.runtime.sendMessage(defaultSettings.proxified, { toProxyScript: true });
}

function handleMessage(message, sender) {
  // only handle messages from the proxy script
  console.log(message);

  if (sender.url != browser.extension.getURL(proxyScriptURL)) {
    return;
  }

  if (message === "init") {
    handleInit(message);
  } else {
    // after the init message the only other messages are status messages
    console.log(message);
  }
}

chrome.runtime.onMessage.addListener(handleMessage);


var timeMark = (new Date()).getTime();
var uniqueid = null;

var Proxy = function (manager, host, port, country, name, listname) {
  this.manager = manager;
  this.country = country;
  this.name = name;
  this.host = host;
  this.port = port;
  this.pass = null;
  this.list = listname;
  //console.log(this);

  this.isActive = function () {
    return manager.activeProxy && manager.activeProxy.host === this.host && manager.activeProxy.port === this.port;
  };

  this.toggle = function (cb) {
    console.log('Proxy: toggle');
    var self = this;
    ChromeStorage.get('some_options').then(function (some_options_val) {
      console.log('Proxy: toggle, some_options_val:', some_options_val);
      if (self.isActive()) {
        manager.clearProxy();
        chrome.storage.local.set({ useit: false }, function () { });
        cb({ status: 'success disconnect' });
        if (some_options_val && some_options_val.bPreventLeak)
          enableWebRTCLeakPreventing(false);
      } else {
        if (some_options_val && some_options_val.bPreventLeak)
          enableWebRTCLeakPreventing(true);
        //hmipvpnspec- saving proxy details
        chrome.storage.local.set({ host: host, port: port, useit: true }, function () { });
        hmipvpnspecList = listname;
        manager.setProxy(self, cb);
      }
    });
  };
};



/* The object managing all proxies */
var ProxyManager = {

  proxies: [],
  recent_proxies: { list1: [], list2: [] }, // list1 = default, list2 = experimental

  init: function () {
    this.activeProxy = Storage.getProxy();
    console.log('ProxyManager init, this.activeProxy=', this.activeProxy);
    if (this.activeProxy) ProxyAdapter.setProxy(this.activeProxy.host, this.activeProxy.port);
    if (this.activeProxy) this.setProxy2(this.activeProxy);

    function initList(listname) {
      var lst = Storage.loadRecentLocList(listname) || [];
      lst.forEach(function (pr, idx, arr) {
        arr[idx] = new Proxy(ProxyManager, pr.host, pr.port, pr.country, pr.name, pr.list);
      });
      return lst;
    }
    this.recent_proxies = { list1: initList('list1'), list2: initList('list2') };
    console.log('recent_proxies=', this.recent_proxies);
    if (!this.activeProxy) {
      ProxyManager.clearProxy();
      enableWebRTCLeakPreventing(false);
    } else {
      ChromeStorage.get('some_options').then(function (some_options_val) {
        console.log('ProxyManager > init: some_options_val:', some_options_val);
        if (some_options_val && some_options_val.bPreventLeak)
          enableWebRTCLeakPreventing(true);
      });
    }
    this._updateIcon();
    this.requestProxies();
    this.initProxyListener();
  },

  addRecent: function (proxy) { // uses Proxy items
    var bFound = false;
    var self = this;
    if (!proxy.list || !this.recent_proxies[proxy.list]) {
      console.error('addRecent: invalid list:', proxy.list);
      return;
    }
    this.recent_proxies[proxy.list].forEach(function (rpr, index) {
      if (rpr.host === proxy.host && rpr.port === proxy.port) {
        bFound = true;
        //unshift -> push, because inversed insert
        self.recent_proxies[proxy.list].push(self.recent_proxies[proxy.list].splice(index, 1)[0]);
      }
    });
    if (!bFound) {
      if (this.recent_proxies[proxy.list].length >= 3)
        this.recent_proxies[proxy.list].pop();
      this.recent_proxies[proxy.list].push(proxy);
    }
    Storage.saveRecentLocList(this.recent_proxies);
  },

  requestProxies: function (cb) {
    console.log('ProxyManager: requestProxies');
    var self = this;
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
    DataService.requestListProxy(
      function (data) {
        self._setData(data);
        if (cb) { cb(true); }
        self.timeout = setTimeout(function () {
          self.requestProxies();
        }, 3599950);
      },
      function (error) {
        self._setData([]);
        if (cb) { cb(false); }
        self._sendErrorNotification(error);
      })
  },

  _setData: function (data) { //[_setData]

    console.log('ProxyManager: _setData, data.len=', data.length);

    var self = this, activeProxyInList = false, counter1 = 0, counter2 = 0;
    this.proxies = [];

    data.forEach(function (value) {

      //console.log(value);

      //Server: Melbourne,Victoria,AU,AUSTRALIA,5598,80,|103.41.176.38<br />
      if (value.indexOf('Server: ') === 0) {
        var s1 = value.substr(8);
        var tokens = s1.split(',');
        var host = tokens[6].replace('\|', '').replace('<br />', '');
        var port = parseInt(tokens[4]);
        var countryCode = tokens[2];
        if (countryCode === 'UK') {
          countryCode = 'UA';
        }
        var city = $.trim(tokens[0]);
        var place = $.trim(tokens[1]);
        var country = tokens[3].toLowerCase().replace(/\b[a-z]/g, function (letter) {
          return letter.toUpperCase();
        });
        country = $.trim(country);
        var name = country + ', ';
        if (city !== place && country !== place)
          name += place + ', ' + city;
        else
          name += city;
        var newProxyItem = new Proxy(self, host, port, countryCode, name, 'list1');
        self.proxies.push(newProxyItem);
        counter1++;

        //see if active proxy is in the list and if so, replace activeProxy with new object referring to same prox
        if (self.activeProxy && host === self.activeProxy.host && port === self.activeProxy.port) {
          self.activeProxy = newProxyItem;

          //xxx
          var pass = self.activeProxy.pass;
          self.activeProxy.pass = pass;

          self.addRecent(newProxyItem);
          activeProxyInList = true;
        }

      } else if (value.indexOf('ExtraServer: ') === 0) {  // ExtraServer

        var s1 = value.substr(13);
        //console.log('ExtraServer:', s1);
        var tokens = s1.split(',');
        var host = tokens[4];
        var port = parseInt(tokens[5]) || 0;
        var countryCode = tokens[2];
        if (countryCode === 'UK') {
          countryCode = 'UA';
        }
        var city = $.trim(tokens[0]);
        var place = $.trim(tokens[1]);
        var country = tokens[3].toLowerCase().replace(/\b[a-z]/g, function (letter) {
          return letter.toUpperCase();
        });
        country = $.trim(country);
        var name = country + ', ';
        if (city !== place && country !== place && place.length)
          name += place + ', ' + city;
        else
          name += city;

        var newProxyItem = new Proxy(self, host, port, countryCode, name, 'list2');
        self.proxies.push(newProxyItem);
        counter2++;

        //see if active proxy is in the list and if so, replace activeProxy with new object referring to same prox
        if (self.activeProxy && host === self.activeProxy.host && port === self.activeProxy.port) {
          self.activeProxy = newProxyItem;

          self.addRecent(newProxyItem);
          activeProxyInList = true;
        }
      }// ExtraServer

    });//forEach

    console.log('self.proxies.length=', self.proxies.length, 'list1:', counter1, 'list2:', counter2);

    //if active proxy is not in the list, disable it
    if (self.activeProxy && !activeProxyInList) {
      console.log('self.clearProxy()');
      self.clearProxy();
    }

    //send populate proxies message
    this._populate();
  }, //_setData

  _populate: function () {
    console.log('sendMessage populate_proxies');
    chrome.runtime.sendMessage({
      msg: 'populate_proxies'
    });
  },

  _updateProxies: function () {
    chrome.runtime.sendMessage({
      msg: 'update_proxies'
    });
  },

  _sendErrorNotification: function (error) {
    chrome.runtime.sendMessage({
      code: error.code,
      msg: 'error:' + error.message
    });
  },

  _updateIcon: function () {
    if (this.activeProxy) {
      var country = this.activeProxy.country;
      chrome.browserAction.setIcon({
        path: 'img/flags/' + (country === '??' || country === '' ? 'unknown' : country) + '.png'
      });
      chrome.browserAction.setBadgeText({
        text: country
      });
    }
    else {
      chrome.browserAction.setIcon({
        path: 'img/disabled.png'
      });
      chrome.browserAction.setBadgeText({
        text: ''
      });
    }
  },

  getProxies: function () {
    return this.proxies;
  },

  getRecentProxies: function (list) {
    if (!list || !this.recent_proxies[list]) {
      console.error('getRecentProxies: invalid list:', list);
      return;
    }
    return this.recent_proxies[list];
  },

  setProxy: function (proxy, cb) {
    console.log('ProxyManager setProxy, proxy:', proxy, cb);
    var self = this;
    DataService.registerIP(proxy.host,
      function (type, data) {
        console.log('registerIP data=', data, 'type[ 1 (usual), 2 (socks5) ] = ', type);
        if (type === 1)
          proxy.pass = data;
        self.activeProxy = proxy;
        self.addRecent(proxy);
        self._updateIcon();
        self._updateProxies();
        Storage.saveProxy(proxy);
        ProxyAdapter.setProxy(proxy.host, proxy.port, type);
        cb({ status: 'success' });
      },
      function (err) {
        console.error('registerIP err=', err);
        proxy.manager.clearProxy();
        cb({ status: 'error' });
      });
  },

  setProxy2: function (proxy) {
    console.log('ProxyManager setProxy2, proxy:', proxy);
    var self = this;
    DataService.registerIP(proxy.host,
      function (type, data) {
        console.log('registerIP data=', data, 'type[ 1 (usual), 2 (socks5) ] = ', type);
        if (type === 1)
          proxy.pass = data;
        self.activeProxy = proxy;
        self.addRecent(proxy);
        self._updateIcon();
        self._updateProxies();
        Storage.saveProxy(proxy);
        ProxyAdapter.setProxy(proxy.host, proxy.port, type);
      },
      function (err) {
        console.error('registerIP err=', err);
        proxy.manager.clearProxy();
      });
  },

  clearProxy: function () {
    ProxyAdapter.removeProxy();
    this.activeProxy = null;
    this._updateIcon();
    this._updateProxies();
    Storage.saveProxy();
  },

  initProxyListener: function () {

    var self = this;
    var blockListener = false;
    // Log any errors from the proxy script
    browser.proxy.onError.addListener(error => {
      // chrome.proxy.onProxyError.addListener(function (){

      if (blockListener) { return; }
      blockListener = true;

      var list = self.activeProxy.list;
      var country = self.activeProxy.country;

      self.requestProxies(function (success) {

        if (!success) {
          blockListener = false;
          return;
        }

        var listProxies = self.getProxies();

        var sameListProxies = filterByList(listProxies, list);
        var sameCountryProxies = filterByCountry(sameListProxies, country);
        var tempActiveProxy = null;

        if (sameCountryProxies.length > 1) {
          var random = Math.floor(Math.random() * sameCountryProxies.length);
          tempActiveProxy = sameCountryProxies[random];
        } else {
          var random = Math.floor(Math.random() * sameListProxies.length);
          tempActiveProxy = sameListProxies[random];
        }

        if (tempActiveProxy != null) {

          console.log("call proxy automatic");
          self.setProxy(tempActiveProxy, function () {
            blockListener = false;
          });
        } else {
          blockListener = false;
        }

        function filterByList(arr, listName) {
          var proxiesList = [];
          for (var i = 0; i < arr.length; i++) {
            if (arr[i].list === listName) {
              proxiesList.push(arr[i]);
            }
          }
          return proxiesList;
        }

        function filterByCountry(arr, countryName) {
          var proxiesList = [];
          for (var i = 0; i < arr.length; i++) {
            if (arr[i].country === countryName) {
              proxiesList.push(arr[i]);
            }
          }
          return proxiesList;
        }

      });

    });

  },


};

/*** Helper functions ***/
function isError(data) {
  return data.match(/^ER:-(\d+)/) != null;
}



function onAuthRequest(details) {
  if (details.isProxy && ProxyManager.activeProxy && ProxyManager.activeProxy.pass) {
    return {
      authCredentials: {
        username: ProxyManager.activeProxy.pass,
        password: ProxyManager.activeProxy.pass
      }
    }
  } else {
    return {}
  }
}

// console.log('>timeMark 1:', (new Date()).getTime() - timeMark);

chrome.webRequest.onAuthRequired.addListener(onAuthRequest, { urls: ["<all_urls>"] }, ['blocking']);

//asyncBlocking:
//If an event listener is registered with "asyncBlocking" listed in the extraInfoSpec, 
//then a callback is passed into the listener in addition to the details argument. 
//The callback expects a BlockingResponse argument, and MUST be invoked by the listener 
//at some point so the request can proceed.
//This is supported for the onAuthRequired listener only at this point.

function getRandomToken() {
  // E.g. 8 * 32 = 256 bits token
  var randomPool = new Uint8Array(32);
  crypto.getRandomValues(randomPool);
  var hex = '';
  for (var i = 0; i < randomPool.length; ++i) {
    hex += randomPool[i].toString(16);
  }
  return hex;
}

function setUnqiueToken(cb) {
  chrome.storage.sync.get('uniqueid', function (items) {
    if (items['uniqueid']) {
      uniqueid = items['uniqueid'];
      cb();
    } else {
      uniqueid = getRandomToken();
      chrome.storage.sync.set({ uniqueid: uniqueid });
      cb();
    }
  });
}


function enableWebRTCLeakPreventing(bEnable) {
  console.log('enableWebRTCLeakPreventing, setting to:', bEnable);
  if (chrome.privacy.IPHandlingPolicy == null) {
    return;
  }
  var newVal = chrome.privacy.IPHandlingPolicy.DEFAULT;
  if (bEnable)
    newVal = chrome.privacy.IPHandlingPolicy.DISABLE_NON_PROXIED_UDP;
  chrome.privacy.network.webRTCIPHandlingPolicy.get({}, function (details) {
    console.log('webRTCIPHandlingPolicy details:', details);
    if (details.levelOfControl !== 'controlled_by_this_extension' &&
      details.levelOfControl !== 'controllable_by_this_extension') {
      console.log("webRTCIPHandlingPolicy controlled_by_other_extensions");
      //controlled_by_other_extensions
    } else {
      //details: Object {levelOfControl: "controlled_by_other_extensions", value: "disable_non_proxied_udp"}
      chrome.privacy.network.webRTCIPHandlingPolicy.set({ value: newVal }, function () {
        if (chrome.runtime.lastError === undefined) {
          setTimeout(function () {
            chrome.privacy.network.webRTCIPHandlingPolicy.get({}, function (details_again) {
              console.log('webRTCIPHandlingPolicy details_again:', details_again);
              if (details_again.value == newVal) {
                console.log("webRTCIPHandlingPolicy.set() successful, new value:", newVal);
              } else {
                console.log("webRTCIPHandlingPolicy.set() NOT CHANGED");
              }
            });
          }, 300);
        } else {
          console.log("webRTCIPHandlingPolicy.set() error:", chrome.runtime.lastError);
        }
      });
    }
  });
}


function flagExists(code, cb) {
  var path = 'img/flags/' + code + '.png';
  cb(true);

  // function fileExists(rootEntry, filename, callback) {
  //   rootEntry.getFile(filename, {
  //     create: false
  //   }, function() {
  //     callback(true);
  //   }, function() {
  //     callback(false);
  //   });
  // }
  // chrome.runtime.getPackageDirectoryEntry(function(root) {
  //   fileExists(root, path, cb); 
  // });
}


var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-48046477-1']);
_gaq.push(['_trackPageview']);


function ajax_pr(url) { // ajax promise, only HEAD - just to check if the url exists
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(this);
    };
    xhr.onerror = reject;
    xhr.open('HEAD', url);
    xhr.send();
  });
}

$(document).ready(function () {
  setUnqiueToken(function () {
    ProxyManager.init();
  })
})

