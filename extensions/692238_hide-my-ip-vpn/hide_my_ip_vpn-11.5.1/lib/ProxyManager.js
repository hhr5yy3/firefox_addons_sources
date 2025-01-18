var get = chrome.i18n.getMessage;

var ProxyManager = {
  toolbarButton: null,
  currentProxy: null,
  proxyAuth: null,
  userAgent: null,
  config: {type: 'direct'},
  siteList: new Array(),
  debugMode: false,

  Callback: function(fn, ctx) {
    return function() {
      fn.apply(ctx, arguments);
    }
  },

  SetIcon: function(mode, name, badge) {
    chrome.browserAction.setIcon({
       path: {
         19: './data/img/19/'+mode+'/'+name+'.png',
         38: './data/img/38/'+mode+'/'+name+'.png'
       }
    });
    chrome.browserAction.setBadgeText({text: badge});
  },

  SetupProxy: function(host, port, code, name, user, password, userAgent, siteExpludeList, success) {
    if (this.currentProxy != host) {
      this.currentProxy = host;
      this.userAgent = userAgent;
      this.config = {
        host: host.match(/[\.\d\w-]+/)[0], 
        port: port.match(/\d+/)[0],
      }
      this.config.type = ((/[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}/i).test(host)) ? 'http' : 'https';
      this.proxyAuth = (user === null || password === null) ? null : {username: user, password: password};

      this.siteList = new Array('*proxylistpro.*', '*paypal.*', '*webmoney.*', '*perfectmoney.*');
      for (i in siteExpludeList)
        if (siteExpludeList[i].length > 0)
          this.siteList.push('*'+siteExpludeList[i]+'*');      
               
      if (!chrome.proxy.onRequest.hasListener(this.HandleRequest))
        chrome.proxy.onRequest.addListener(this.HandleRequest, {urls: ["<all_urls>"]});
      chrome.browserAction.setTitle({title: name});

      if (this.debugMode) console.log('Setting proxy "' + host + ':' + port + '" (ProxyManager.SetupProxy)');
    }
    if (success && typeof success === 'function')
      success();
  },

  RestoreProxy: function(success) {
    chrome.proxy.onRequest.hasListener(this.HandleRequest) && browser.proxy.onRequest.removeListener(this.HandleRequest);
    chrome.browserAction.setTitle({title: get('app_name')});

    this.currentProxy = null;
    this.userAgent = null;
    this.config = {type: 'direct'};

    if (this.debugMode) console.log('Restoring proxy (ProxyManager.RestoreProxy)');

    if (success && typeof success === 'function')
      success();
  },  

  HandleRequest: function(requestInfo) {
    var parser = document.createElement('a');
    parser.href = requestInfo.url;

    if (ProxyManager.ShExpMatch(parser.host, ProxyManager.siteList.join('|'))) 
      return {type: 'direct'}; 
      
    return ProxyManager.config;
  },
  
  HandleAuth: function(request) {
    if (!request.isProxy) return;

    if (ProxyManager.currentProxy !== null && ProxyManager.proxyAuth !== null)
      return {authCredentials: ProxyManager.proxyAuth};
  },
  
  HardReset: function() {
    if (this.debugMode) console.log('Resetting proxy settings (ProxyManager.HardReset)');
    chrome.proxy.onRequest.hasListener(this.HandleRequest) && browser.proxy.onRequest.removeListener(this.HandleRequest);
  },
  
  ShExpMatch: function(url, pattern) {
    pattern = pattern.replace(/\./g, '\\.');
    pattern = pattern.replace(/\*/g, '.*');
    pattern = pattern.replace(/\?/g, '.');
    var newRe = new RegExp('^'+pattern+'$');
    return newRe.test(url);
  }
}

browser.webRequest.onAuthRequired.addListener(ProxyManager.HandleAuth, {urls: ["<all_urls>"]}, ["blocking"]);