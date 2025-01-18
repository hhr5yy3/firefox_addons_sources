var tracker;
var timeManager;
var session = new Session();
var cache = new Cache();
var googleSignin = new GoogleSignin();
var currentUser = new CurrentUser();
var tasksStore = new TasksStore();
var subtasksStore = new SubtasksStore();
var projectsStore = new ProjectsStore();
var bookmarksStore = new BookmarksStore();
var events = new Events();
var teams = new Teams();
var bookmarks = new Bookmarks();
var notifications = new Notifications();
notifications.init();
var tasks = new Tasks();
var thirdParty = new ThirdParty();
var websocket =  new AmazonWebsocket();
var device = new Device();
var applications = new Applications();

var LOCAL_TASKS = [];
var search_tasks_queries = 0;
var search_tasks_done = 0;
var search_tasks_length = 900;
var search_tasks_tmp = [];

var human_login = false;
var just_installed = false;

// iframe messages
window.addEventListener("message", function(event) {
  if(event.origin.indexOf('.trackingtime.') == -1){
    return false;
  }
  var message = false;
  try {
    message = JSON.parse(event.data);
  } catch (e) {}
  if (!message) {
    return;
  }
  if (message.event == 'get_current_session') {
    var current_session = {user: currentUser.get(), account: currentUser.getCurrentAccount()}
    if (current_session.user != null) {
      var loginIframe = $('iframe[src="' + message.data.url + '"]');
      if (loginIframe.length) {
        loginIframe[0].contentWindow.postMessage(JSON.stringify({ 'event': 'set_current_session', 'data': current_session }), '*');
        setTimeout(function() {
          loginIframe[0].remove();
        }, 5000);
      }
    }
  }
}, false);

window.TTExtension = {
  getDomainsFromServer: function(params) {
    params = typeof params == 'object' ? params : {}
    $.ajax({
      url: DOMAINS_URL,
      dataType: "json",
      crossDomain: true,
      cache: false,
      beforeSend: function() {},
      success: function(data, status, xhr) {
        if (typeof data == "object") {
          let new_domains_version = DOMAINS_VERSION != data.version;
          DOMAINS = typeof data.domains == "object" ? data.domains : data;
          DOMAINS_VERSION = typeof data.version != "undefined" ? data.version : xhr.getResponseHeader('last-modified');
          localStorage.DOMAINS = JSON.stringify(DOMAINS);
          localStorage.DOMAINS_VERSION = DOMAINS_VERSION;
          TTExtension.sendMessage('onGetDomainsFromServer', Object.assign({}, params, {version: DOMAINS_VERSION}));
          if( params.from == 'interval' && new_domains_version){
            notifications.notifyOnDomains(DOMAINS_VERSION);
          }
        } else {
          TTExtension.sendMessage('onGetDomainsFromServer', Object.assign({}, params, {error: true}));
        }
      },
      error: function(xhr, status, error){
        TTExtension.sendMessage('onGetDomainsFromServer', Object.assign({}, params, {error: true}));
      }
    });
  },
  onInstalled: function(details) {
    if (details.reason == "install") {
      just_installed = true;
      human_login = true;
      chrome.cookies.remove({ url: COOKIES_URL, name: 'autologin' }, function() {});
      //chrome.runtime.openOptionsPage();
      //TTExtension.reloadTabs();
    } else
    if (details.reason == "update") {
      if (OPEN_SETTINGS_ON_UPDATE) {
        chrome.runtime.openOptionsPage();
      }
      if (RELOAD_TABS_ON_UPDATE) {
        TTExtension.reloadTabs();
      }
    }
  },
  tryToLogin: function() {
    console.log('tryToLogin');
    if (currentUser.isLoggedIn()) {
      TTExtension.loginWithToken(currentUser.get().token);
    } else {
      TTExtension.tryToLoginWithCookie();
    }
  },
  tryToLoginWithCookie: function() {
    console.log('tryToLoginWithCookie');
    chrome.cookies.getAll({}, function(cookies) {
      var cookies_url_domain = new URL(COOKIES_URL).host;
      
      var cookie_autologin = cookies.filter(function(cookie){return cookie.domain == cookies_url_domain && cookie.name == 'autologin'})[0] || false;
      var cookie_token = cookies.filter(function(cookie){return cookie.domain == cookies_url_domain && cookie.name == 'token'})[0] || false;
      
      var autologin = cookie_autologin ? cookie_autologin.value === 'true' : true;
      
      if (autologin && !!cookie_token && cookie_token.value) {
        TTExtension.loginWithToken(cookie_token.value);
      } else {
        TTExtension.clearLogin()
      }
      
    });
  },
  loginWithToken: function(token) {
    console.log('loginWithToken');
    session.loginWithToken({
      data: {
        token: token
      },
      callback: this.onLoginWithToken,
      errorCallback: onErrorCallback
    });
  },
  onLoginWithToken: function(data){
    // TTExtension.loginIframe();
    TTExtension.setSessionCookie();
    currentUser.set(data.data);
    saveStore();
    bookmarksStore.clear();
    notifications.getBookmarks();
    tracker = new Tracker();
    timeManager = new TimeManager();
    timeManager.init();
    websocket.init();
    timeManager.broadCastViewUpdate();
    SPEED = currentUser.getCurrentAccountStatus() == "FREE" ? 3 : 1;
    mixIdentify();
    if(RELOAD_TABS_ON_UPDATE && human_login){
      TTExtension.reloadTabs();
    }
    
    
    if (just_installed) {
      chrome.tabs.query({ url: PRODUCTION_DOMAIN }, function(tabs) {
        var onboarding_tab = tabs != undefined ? tabs.filter(function(t) { return t.url.indexOf('#/onboarding') != -1; })[0] || false : false;
        if(onboarding_tab){
          chrome.tabs.highlight({
            tabs: onboarding_tab.index,
            windowId: onboarding_tab.windowId
          });
        } else {
          chrome.runtime.openOptionsPage();
        }
      });
    } else if (OPEN_SETTINGS_ON_LOGIN && human_login) {
      chrome.runtime.openOptionsPage();
    }
    human_login = false;
    
    //localStorage.STATE = "NOT_TRACKING";
    //TTExtension.updateView({});
    pageView('/login-with-token');
    
  },
  verifyToken: function(data, sendResponse) {
    session.verifyUserToken({
      data: data,
      action: data.action,
      token: data.token,
      service: data.service,
      callback: TTExtension.onVerifyToken,
      errorCallbackPreventDefault: TTExtension.onVerifyTokenError
    });
  },
  verifyGoogleToken: function(data, sendResponse) {
    googleSignin.verifyToken({
      action: data.action,
      token: data.token,
      callback: TTExtension.onVerifyToken,
      errorCallbackPreventDefault: TTExtension.onVerifyTokenError
    });
  },
  onVerifyToken: function(data) {
    // TTExtension.loginIframe();
    TTExtension.setSessionCookie();
    TTLogin.hide();
    pageView('/login-success');
    currentUser.set(data.data);
    saveStore();
    bookmarksStore.clear();
    notifications.getBookmarks();
    tracker = new Tracker();
    timeManager = new TimeManager();
    timeManager.init();
    websocket.init();
    SPEED = currentUser.getCurrentAccountStatus() == "FREE" ? 3 : 1;
    mixIdentify();
    if(RELOAD_TABS_ON_UPDATE && human_login){
      TTExtension.reloadTabs();
    }
    if(human_login){
      var optionsUrl = chrome.extension.getURL('options.html') + '*';
      chrome.tabs.query({ url: optionsUrl }, function(tabs) {
        if (tabs.length) {
          for (var i = 0; i < tabs.length; i++) {
            if(i == 0){
              chrome.tabs.update(tabs[i].id, { url: "options.html", active: true });
              chrome.tabs.reload(tabs[i].id);
            }else{
              chrome.tabs.remove(tabs[i].id, function() { });
            }  
          }
        } else {
          chrome.tabs.create({ url: "options.html" });
        }
      });
    }
    human_login = false;
  },
  onVerifyTokenError: function(data) {
    TTLogin.hide();
    var optionsUrl = chrome.extension.getURL('options.html') + '*';
    
    var message = typeof data.response == 'object' ? data.response.message : data.message;
    
    chrome.tabs.query({ url: optionsUrl }, function(tabs) {
      if (tabs.length) {
        for (var i = 0; i < tabs.length; i++) {
          if(i == 0){
            chrome.tabs.update(tabs[i].id, { url: "options.html?show_error=true&message=" + message, active: true });
          }else{
            chrome.tabs.remove(tabs[i].id, function() { });
          }  
        }
      }
    });
  },
  loginIframe: function() {
    // entra acá después de onLoginWithToken y onVerifyToken
    var loginIframe = document.createElement('iframe');
    loginIframe.setAttribute('src', BUTTON_PRODUCTION_DOMAIN + 'vue/trello-integration/card-buttons/');
    // fallback: iframe manda get_current_session
    loginIframe.onload = function() {
      loginIframe.contentWindow.postMessage(JSON.stringify({ 'event': 'set_current_session', 'data': {user: currentUser.get(), account: currentUser.getCurrentAccount()} }), '*');
      setTimeout(function() {
        loginIframe.remove();
      }, 5000);
    };
    loginIframe.onerror = function() {
      this.remove();
    };
    document.body.appendChild(loginIframe);   
  },
  logout: function() {
    // try {
    //   $('iframe[src="' + LOGOUT_URL + '"]').remove();
    // } catch (e) {}
    // var logoutIframe = document.createElement('iframe');
    // logoutIframe.setAttribute('src', LOGOUT_URL);
    // logoutIframe.onload = TTExtension.onLogout;
    // logoutIframe.onerror = TTExtension.onLogout;
    // document.body.appendChild(logoutIframe);
    TTExtension.onLogout();
  },
  onLogout: function() {
    TTExtension.clearSessionCookie();
    session.logout();
    cache.clear();
    currentUser.clear();
    if(timeManager){
      timeManager.stopTrackingIntervals();
      timeManager.kill();
    }
    websocket.destroy();
    tracker = undefined;
    localStorage.STATE = "LOGIN";
    TTExtension.updateView({});
    TTExtension.sendMessage('loggedOut', {});
    chrome.browserAction.setIcon({ "path": "img/iconos/32x32_grey.png" });
    pageView('/logout');
    
    // chrome.cookies.remove({ url: COOKIES_URL, name: 'token' }, function() {});
    // chrome.cookies.set({ url: COOKIES_URL, name: 'autologin', value: 'false'}, function() {});
    
    TTExtension.reloadTabs();
    
    // if options open
    var optionsUrl = chrome.extension.getURL('options.html') + '*';
    chrome.tabs.query({ url: optionsUrl }, function(tabs) {
      if (tabs.length) {
        for (var i = 0; i < tabs.length; i++) {
          if(i == 0){
            chrome.tabs.update(tabs[i].id, { active: true });
            chrome.tabs.reload(tabs[i].id);
          }else{
            chrome.tabs.remove(tabs[i].id, function() { });
          }  
        }
      }
    });
  },
  clearLogin: function() {
    TTExtension.clearSessionCookie();
    cache.clear();
    currentUser.clear();
    localStorage.STATE = "LOGIN";
    chrome.browserAction.setIcon({ "path": "img/iconos/32x32_grey.png" });
    chrome.cookies.remove({ url: COOKIES_URL, name: 'token' }, function() {});
    if (just_installed) {      
      chrome.tabs.query({ url: PRODUCTION_DOMAIN }, function(tabs) {
        var onboarding_tab = tabs != undefined ? tabs.filter(function(t) { return t.url.indexOf('#/onboarding') != -1; })[0] || false : false;
        if(onboarding_tab){
          chrome.tabs.highlight({
            tabs: onboarding_tab.index,
            windowId: onboarding_tab.windowId
          });
        } else {
          chrome.runtime.openOptionsPage();
        }
        TTExtension.reloadTabs();
        just_installed = false;
        human_login = false;
      });    
    }
  },
  setSessionCookie: function() {
    chrome.cookies.set({
      url: BUTTON_PRODUCTION_DOMAIN,
      name: 'extension_session',
      value: JSON.stringify({
        token: currentUser.get().token,
        user_id: currentUser.get().id,
        account_id: currentUser.getCurrentAccount().account_id
      })
    });
  },
  clearSessionCookie: function() {
    chrome.cookies.remove({ url: BUTTON_PRODUCTION_DOMAIN, name: 'extension_session' });
  },
  onCookiesChange: function(changeInfo) {
    var cookie = changeInfo.cookie;
    if (cookie.domain == new URL(COOKIES_URL).host && cookie.name == 'token') {
      if (changeInfo.removed) {
        return false;
      }
      if (!currentUser.isLoggedIn()) {
        TTExtension.tryToLoginWithCookie();
      }
    }
  },
  onTabUpdated: function(tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete') {
      if (tab.windowId == TTLogin.popup) {
        //TTLogin.onUpdated(tab.url);
        return false;
      }
      
      if (tab.url != '' && tab.url.indexOf('chrome://') === -1 && tab.url.indexOf('-extension://') === -1 && tab.url.indexOf('-error://') === -1) {
        var origin = TTExtension.getOrigin(tab.url);
        if (origin != "*:///*") {
          chrome.permissions.contains({
            origins: [origin]
          }, function(allowed) {
            if (allowed) {
              TTExtension.checkAndLoadFiles(tabId);
            }
          });
        }
      }

    }
  },
  getOrigin: function(url) {
    var url_ = new URL(url);
    
    return '*://' + url_.hostname + '/*';
    /*
    var domain;
    if (url.indexOf('://') > -1) {
      domain = url.split('/')[2];
    } else {
      domain = url.split('/')[0];
    }
    domain = domain.split('/*')[0];
    domain = domain.split(':')[0];
    return '*://' + domain + '/*';
    */
  },
  checkAndLoadFiles: function(tabId){
    // The extension has the permissions.
    chrome.tabs.executeScript(tabId, { code: "(typeof TTExtensionBrowser === 'undefined')"},
    function(isFirstLoad) {
      var load = false;
      if (FF) {
        if (isFirstLoad) {
          load = true;
        }
      } else {
        if (!!isFirstLoad && !!isFirstLoad[0]) {
          load = true;
        }
      }
      if (load) {
        TTExtension.loadFiles(tabId);
      }
    });
  },
  loadFiles: function(tabId) {
    chrome.tabs.get(tabId, function(tab) {
      var domain = TTExtension.getTabDomain(tab);
      if(!domain){
        return false;
      }
      var allFrames = false;
      var timeout = 0;
      if (typeof domain.settings != "undefined") {
        allFrames = domain.settings.allFrames == true;
        timeout = 4000;
      }
      
      var tab_app = {
        enabled: false, // si está prendida en taskManagement
        sync: false, // si la tiene prendida el usuario
      };
      
      if (currentUser.isLoggedIn()) {

        // let user_apps = currentUser.get().apps;
        // let taskManagement = user_apps.filter(i=>i.key == 'taskManagement')[0];

        if (domain.app) {
          // está habilitada en taskManagement?
          // let key = domain.app.replace('basecamp', 'basecamp_');
          // let domain_app = user_apps.filter(i=>i.key == 'taskManagement')[0];
          // tab_app.enabled = taskManagement.settings[key] == true;
          let is_integration_enabled = currentUser.isIntegrationEnabled(domain.app);
          tab_app = {
            enabled: is_integration_enabled,
            sync: is_integration_enabled
          };

          // for (var i = 0; i < user_apps.length; i++) {
          //   if (domain.app == user_apps[i].key) {
          //     if (user_apps[i].status == 'on' && user_apps[i].integrations.account_id == currentUser.getCurrentAccount().account_id) {
          //       tab_app.sync = true;
          //     }
          //   }
          // }
        } else
        if (domain.third_party_app) {
          // si no es legacy, no rendereo
          let is_legacy = taskManagement ? taskManagement.settings[`is_${domain.third_party_app.key}_legacy`] === true : false;
          if(!is_legacy) {
            return false;
          }
        }
      }
      
      setTimeout(function() {
        chrome.tabs.insertCSS(tab.id, {
          file: 'css/browser.css',
          allFrames: allFrames
        });
        chrome.tabs.executeScript(tab.id, {
          file: 'js/lib/jquery-3.3.1.min.js',
          allFrames: allFrames
        });
        chrome.tabs.executeScript(tab.id, {
          file: 'js/lib/moment-with-locales.min.js',
          allFrames: allFrames
        });
        chrome.tabs.executeScript(tab.id, {
          file: 'environment.js',
          allFrames: allFrames
        });
        chrome.tabs.executeScript(tab.id, {
          file: 'js/lib/url-pattern.js',
          allFrames: allFrames
        });
        chrome.tabs.executeScript(tab.id, {
          code: 'var TAB_DOMAIN = ' + JSON.stringify(domain) + '; var TAB_APP = ' + JSON.stringify(tab_app) + ';',
          allFrames: allFrames
        });
        chrome.tabs.executeScript(tab.id, {
          file: 'js/browser.js',
          allFrames: allFrames
        });
      }, timeout);
    
    });
  },
  updateView: function(data){
    data = typeof data != 'undefined' ? data : {};
    TTExtension.sendMessage('updateView', data);
  },
  sendMessage: function(status, data, callback){
    if (typeof callback != "undefined") {
      chrome.runtime.sendMessage({ status: status, data: data }, function(response) {
        var lastError = chrome.runtime.lastError;
        if (lastError) {
            console.log(lastError.message);
            // 'Could not establish connection. Receiving end does not exist.'
            return;
        }
        callback(response);
      });
    } else {
      chrome.runtime.sendMessage({ status: status, data: data });
    }
  },
  onMessage: function(request, sender, sendResponse) {
    var response = {
      response: {
        status: '',
        message: ''
      },
      data: {}
    };
    switch (request.action) {
      case 'popUpOpened':
        if (currentUser.isLoggedIn()) {
          // si no tiene permisos habilitados y hace 15 días no muestra options en click
          var permissions_length = parseInt(localStorage.getItem('PERMISSIONS_LENGTH')) || 0;
          var permissions_today = new Date().getTime();
          var permissions_expiration_date = parseInt(localStorage.getItem('SHOW_PERMISSIONS_EXPIRATION_DATE')) || 0;
          if (permissions_length == 0 && (permissions_expiration_date == 0 || permissions_today > permissions_expiration_date)) {
            localStorage.setItem('SHOW_PERMISSIONS_EXPIRATION_DATE', permissions_today + (24 * 60 * 60 * 1000 * 20));
            chrome.runtime.openOptionsPage();
            sendResponse({action: 'close'});
          } else {
            sendResponse({});
            if (timeManager) {
              timeManager.checkUpdates();
            }
          }
        } else {
          chrome.runtime.openOptionsPage();
          setTimeout(function() {
            TTLogin.show('login', {from: 'button'});
          }, 500);
          sendResponse({action: 'close'});
        }
        break;
      case 'showLogin':
        TTLogin.show('login', request.data);
        sendResponse({});
        break;
      case 'showSignUp':
        TTLogin.show('signup', request.data);
        sendResponse({});
        break;
      case 'doLogin':
        human_login = true;
        session.login({
          data: request.data,
          callback: onLoginSuccess,
          errorCallback: onErrorCallback
        });
        sendResponse({});
        break;
      case 'doLogout':
        TTExtension.logout();
        sendResponse({});
        break;
      case 'doRecover':
        session.recoverPass({
          data: request.data,
          callback: onRecover,
          errorCallback: onErrorCallback
        });
        sendResponse({});
        break;
      case 'doSignUp':
        human_login = true;
        session.signup({
          data: request.data,
          callback: onSignUpSuccess,
          errorCallback: onErrorCallback
        });
        sendResponse({});
        break;
      case 'humanLogin':
        human_login = true;
        sendResponse({});
        break;
      case 'verifyToken':
        human_login = true;
        TTExtension.verifyToken(request.data);
        sendResponse({});
        break;
      case 'verifyGoogleToken':
        human_login = true;
        TTExtension.verifyGoogleToken(request.data);
        sendResponse({});
        break;
      case 'doTTLoginOnUpdated':
        TTLogin.onUpdated(request.data.url);
        sendResponse({});
        break;
      case 'doTrack':
        if (currentUser.get() != null && currentUser.get().id) {
          timeManager.createAndStartTracking({
            data: request.data
          });
          pageView('/tracking-from/' + request.data.json.button.domain);
          var evt = {
            event_name: "Start Tracking from Button",
            prop: {
              integration: request.data.json.button.domain,
            },
            intercom: true
          };
          eventTrack(evt);
          mixButtonUpdateUserAttribute({
            last_integration_used: request.data.json.button.domain
          });
          sendResponse({});
        } else {
          
          TTLogin.show('login', {from: 'play'});
          
          onNotLogged();
          sendResponse({
            error: true
          });
        }
        
        break;
      case 'doTrackWithId':
        if (currentUser.get() != null && currentUser.get().id) {
          timeManager.startTracking(request.data.id);
          sendResponse({});
        } else {
          onNotLogged();
          sendResponse({
            error: true
          });
        }
        break;
      case "trackService":
        if (currentUser.get()) {
          timeManager.startTracking(request.data);
          sendResponse({});
        } else {
          onNotLogged();
          sendResponse({
            error: true
          });
        }
        break;
      case 'doStopTrack':
        onStopTrack();
        sendResponse({});
        break;
      case 'checkUpdates':
        if (currentUser.isLoggedIn()) {
          if (timeManager) {
            timeManager.broadCastViewUpdate();
          } else {
            TTExtension.tryToLogin();
          }
        }
        sendResponse({});
        break;
      case 'getCurrentTask':
        sendResponse({
          event_duration: returnCurrentEventDuration(),
          task: returnCurrentTask(),
          local_tasks: LOCAL_TASKS
        });
        break;
      case 'timerStartedElsewhere':
        if (currentUser.isLoggedIn() && timeManager) {
          timeManager.checkUpdates();
        }
        sendResponse({});
        break;
      case 'timerStopedElsewhere':
        if (currentUser.isLoggedIn() && timeManager) {
          timeManager.timerStopedElsewhere();
        }
        sendResponse({});
        break;
      case 'addLocalTasks':
        if (currentUser.isLoggedIn()) {
          addLocalTasks(request.data);
        }
        sendResponse({});
        break;
      case 'getRecentEvents':
        getRecentEvents(request.data.page, request.data.page_size);
        sendResponse({});
        break;
      case 'switchTeam':
        currentUser.swicthTeam(request.data);
        sendResponse({});
        break;
      case 'changeDefaultTeam':
        teams.changeDefaultTeam({
          data: request.data
        });
        sendResponse({});
        break;
      case 'onError':
        trackJavaScriptError(request.data);
        sendResponse({});
        break;
      case 'getSettings':
        sendResponse(localStorage.SETTINGS);
        break;
      case 'getDomains':
        sendResponse(localStorage.DOMAINS);
        break;
      case 'getCustomDomains':
        sendResponse(localStorage.CUSTOM_DOMAINS);
        break;
      case 'getLocalTasks':
        sendResponse(localStorage.LOCAL_TASKS);
        break;
      case 'trackDomain':
        pageView('/' + request.data.domain);
        sendResponse({});
        break;
      case 'openSettings':
        chrome.runtime.openOptionsPage();
        sendResponse({});
        break;
      case 'getSupportsSharedTask':
        sendResponse(supportsSharedTasks());
        break;
      case 'saveNotificationsSettings':
        notifications.saveBookmarks(request.data);
        sendResponse({});
        break;
      case 'CUSTOM_DOMAIN_ADDED':
        // from options.js
        CUSTOM_DOMAINS = JSON.parse(localStorage.CUSTOM_DOMAINS);
        TTExtension.reloadTab(request.data.origins);
        sendResponse({});
        break;
      case 'CUSTOM_DOMAIN_REMOVED':
        // from options.js
        CUSTOM_DOMAINS = JSON.parse(localStorage.CUSTOM_DOMAINS);
        TTExtension.reloadTab(request.data.origins);
        sendResponse({});
        break;
      case 'ORIGINS_TOGGLED':
        // from options.js
        TTExtension.reloadTab(request.data.origins);
        sendResponse({});
        break;
      case 'getServiceTask':
        if (currentUser.isLoggedIn()) {
          TTExtension.getServiceTask(request.data, sender.tab.id);
        } else {
          //onNotLogged();
        }
        sendResponse({});
        break;
      case 'getProject':
        if (currentUser.isLoggedIn()) {
          //projects.getServiceProject({data: request.data, callback:function(data){debugger;}});
        } else {
          //onNotLogged();
        }
        sendResponse({});
        break;
      case 'getCurrentSession':
        sendResponse({user: currentUser.get(), account: currentUser.getCurrentAccount()});
        break;
      case 'getDomainsFromServer':
        TTExtension.getDomainsFromServer(request.data);
        sendResponse({});
        break;
      case 'reloadTabs':
        TTExtension.reloadTabs();
        sendResponse({});
        break;
      case 'notifyOnError':
        notifications.notifyOnError(request.data);
        sendResponse({});
        break;        
      case 'notifyOnSyncRequired':
        notifications.notifyOnSyncRequired(request.data);
        sendResponse({});
        break;
      case 'navigateToDesktop':
        if(currentUser.isLoggedIn()) {
          navigateToDesktop(request.data.url);
        }else{
          TTLogin.show('login', request.data);
        }
        sendResponse({});
        break;
      case 'setSessionCookie':
        if (currentUser.isLoggedIn()) {
          TTExtension.setSessionCookie();
        } else {
          TTExtension.clearSessionCookie();
        }
        sendResponse({});
        break;
      case 'pageView':
        pageView(request.data);
        sendResponse({});
        break;
      default:
        sendResponse({});
        break;
    }
  },
  isPopupOpen: function(){
    return !!chrome.extension.getViews({ type: "popup" }).length;
  },
  getTabDomain: function(tab) {
    var domains = DOMAINS.filter(function(domain) {
      var tab_domain = new URL(tab.url).hostname;
      if(domain.domain.indexOf('*.') == 0){
        return tab_domain.indexOf(domain.domain.split('*.')[1]) != -1;
      }else{
        return tab_domain == domain.domain;
      }
    });
    if (domains.length) {
      return domains[0];
    }
    var custom_domains = CUSTOM_DOMAINS.filter(function(domain) {
      var tab_domain = new URL(tab.url).hostname;
      if (domain.domain.indexOf('*.') == 0) {
        return tab_domain.indexOf(domain.domain.split('*.')[1]) != -1;
      } else {
        return tab_domain == domain.domain;
      }
    });
    if (custom_domains.length) {
      custom_domains[0].based_on = custom_domains[0].rules;
      var domain = TTExtension.getDomainById(custom_domains[0].rules);
      var custom_domain = $.extend({}, domain, custom_domains[0]);
      custom_domain.rules = domain.rules;
      return custom_domain;
    }
    return false;
  },
  getDomainById: function(id) {
    var domains = DOMAINS.filter(function(domain) {
      return domain.id == id;
    });
    if (domains.length) {
      return domains[0];
    }
    return {};
  },
  reloadTab: function(origins){
    if(typeof origins != 'object'){
      return false;
    }
    var urls = [];
    for (var i = 0; i < origins.length; i++) {
      urls.push(origins[i] + '*');
    }
    // agregar /*
    chrome.tabs.query({url:urls}, function(tabs) {
      if(typeof tabs == "undefined"){
        return false;
      }
      tabs.forEach(function(tab) {
        if (tab.url) {
          chrome.tabs.reload(tab.id, {
            bypassCache: false
          });
        }
      });
    });
  },
  reloadTabs: function(){
    chrome.tabs.query({}, function(tabs) {
      tabs.forEach(function(tab) {
        if (tab.url) {
          var in_domains = DOMAINS.filter(function(domain) {
            return tab.url.indexOf(domain.domain.replace('*.','')) > -1;
          });
          var in_custom_domains = CUSTOM_DOMAINS.filter(function(domain) {
            return tab.url.indexOf(domain.domain.replace('*.','')) > -1;
          });
          if (in_domains.length || in_custom_domains.length) {
            chrome.tabs.reload(tab.id, {
              bypassCache: false
            });
          }
        }
      });
    });
  },
  reload:chrome.runtime.reload,
  onLoginError: function(data) {
    TTExtension.clearLogin();
    TTExtension.updateView(data.detail);
    pageView('/login-error');
  },
  getServiceTask: function(data, tabId){
    thirdParty.list({
      service: data.service,
      item: 'users/tasks',
      data: {
        task_id: data.id
      },
      tabId: tabId,
      callback: TTExtension.onGetServiceTask,
      errorCallback: TTExtension.onGetServiceTaskError
    });
  },
  onGetServiceTask: function(data, params){
    chrome.tabs.sendMessage(params.tabId, {action: 'onGetServiceTask', data:data.data});
  },
  onGetServiceTaskError: function(data, params){
    chrome.tabs.sendMessage(params.tabId, {action: 'onGetServiceTaskError', data:data.data});
  }
};

window.TTLogin = {
  redirect_url: chrome.runtime.getURL('options.html'),
  popup: undefined,
  args: {},
  getQuery: function(url) {
    var query = {};
    var url_params = url.split('?');
    var query_string = url_params[1] || '';
    var pairs = query_string.split("&");
    for (var i in pairs) {
      if (pairs[i] === "") continue;
      var pair = pairs[i].split("=");
      var name = decodeURIComponent(pair[0]);
      var value = decodeURIComponent(pair[1]);
      query[name] = value;
    }
    return query;
  },
  width: 500,
  height: 620,
  show: function(action, args) {
    TTLogin.hide();
    TTLogin.args = typeof args != 'undefined' ? args : {};
    
    var url = LOGIN_URL + '?tmp_token=true&r=' + TTLogin.redirect_url;
    if (action == 'signup') {
      url = SIGNUP_URL + '&tmp_token=true&r=' + TTLogin.redirect_url;
    }
    
    TTLogin.open(url, TTLogin.width, TTLogin.height);
  },
  onUpdated: function(tab_url) {
    // chequear si está abierto
    if (tab_url.indexOf(TTLogin.redirect_url) == 0) {
      var query = TTLogin.getQuery(tab_url);
      if(objectLength(query)){
        TTLogin.onSuccess(query);  
      }
    }
  },
  onSuccess: function(query) {
    
    if (typeof query != 'object') {
      return false;
    }
    
    query.action = typeof query.action == 'string' ? query.action : '';
    query.message = typeof query.message == 'string' ? query.message : '';
    query.service = typeof query.service == 'string' ? query.service : '';
    
    if (!!query.action) {
      if (query.status == "200") {
        if(!!query.token){
          var params = {
            action: query.action,
            token: query.token,
            service: query.service,
            response_type: 'json' // para el mensaje de error
          };
          if (TTLogin.args.from != 'play') {
            human_login = true;
          }
          TTExtension.verifyToken(params);
          return false;
        } else{
          alert("Invalid or missing token");
        }
      } else {
        alert(query.message);
      }
    }
    TTLogin.hide();
  },
  hide: function() {
    if (!!TTLogin.popup) {
      chrome.tabs.query({ windowId: TTLogin.popup }, function(tabs) {
        for (var i = 0; i < tabs.length; i++) {
          chrome.tabs.remove(tabs[i].id, function() {});
        }
      });
    }
    TTLogin.popup = '';
    TTLogin.clearInterval();
  },
  clearInterval: function(){
    if(typeof TTLogin.interval != "undefined"){
      clearInterval(TTLogin.interval);
    }
  },
  open: function(url, width, height) {
    var left = parseInt((screen.width - width) / 2);
    var top = parseInt((screen.height - height) / 2);
    chrome.windows.create({
      url: url,
      type: 'popup',
      width: width,
      height: height,
      top: top,
      left: left
    }, function(window){
      TTLogin.popup = window.id;
    });
  }
};

document.addEventListener("ON_ERROR", onError);
document.addEventListener("ON_UNCTACHED_ERROR", onUnctachedError);
document.addEventListener("TRACKING_EVENT_UPDATE", trackingEventUpdate);
document.addEventListener("TASK_DURATION_UPATED", updateTaskDuration);
document.addEventListener("BEFORE_START_TRACKING", beforeStartTracking);
document.addEventListener("TASK_STARTED", taskStarted);
document.addEventListener("TASK_SYNC_ERROR", taskSyncError);
document.addEventListener("ON_SWITCH_ACCOUNT", onSwitchAccount);
document.addEventListener("DEFAULT_TEAM_CHANGED", onSwitchAccount);
document.addEventListener("ON_ACCESS_DENIED", TTExtension.onLogout);
document.addEventListener("ON_APP_UPDATED", onAppUpdated);
document.addEventListener("ON_USER_UPDATED", onUserUpdated);

if (!DEBUG_MODE) {
  TTExtension.getDomainsFromServer({ silently: true });
  domains_from_server_interval = setInterval(function() {
    TTExtension.getDomainsFromServer({ from: 'interval' });
  }, 1000 * 60 * 60);
}
//restart();
//ApiSaveItemToStore( "remember_me" , "true" );
chrome.runtime.onMessage.addListener(TTExtension.onMessage);
chrome.runtime.onInstalled.addListener(TTExtension.onInstalled);
chrome.tabs.onUpdated.addListener(TTExtension.onTabUpdated);
chrome.cookies.onChanged.addListener(TTExtension.onCookiesChange);
            
            
$(document).ready(function(){
  restart();
});

(function() {
  window.Intercom = function(action, value, metadata) {
    var data = {};
    data.action = action;
    if (action == 'trackEvent') {
      data.data = {
        event_name: value,
        user_id: currentUser.get().id,
        metadata: {}
      };
      if (typeof(metadata) != "undefined") {
        data.data.metadata = metadata;
      }
    } else
    if (action == 'update') {
      data.data = value;
    }
    data.app_id = INTERCOM_ID;
    $.ajax({
      beforeSend: function() {},
      url: "https://integrations.trackingtime.io/intercom/",
      data: data,
      dataType: 'json',
      success: function(data) {
        if (DEBUG_MODE) {
          console.log('intercom ok');
          console.log(data);
        }
      },
      error: function() {}
    });
  };
  
  window.ga = function() {
    // ga('send', 'event', [eventCategory], [eventAction], [eventLabel], [eventValue], [fieldsObject]);

    if (!arguments.length) {
      return false;
    }
    var fieldObject = {};
    if (arguments[0] != 'send') {
      return false;
    }
    if (arguments.length > 1) {
      if (typeof arguments[arguments.length - 1] == 'object') {
        fieldObject = arguments[arguments.length - 1];
      }
      if (typeof arguments[1] == 'string') {
        fieldObject.hitType = arguments[1]; // hitType
      }
      if (typeof arguments[2] == 'string') {
        fieldObject.eventCategory = arguments[2]; // eventCategory
      }
      if (typeof arguments[3] == 'string') {
        fieldObject.eventAction = arguments[3]; // eventAction
      }
      if (typeof arguments[4] == 'string') {
        fieldObject.eventLabel = arguments[4]; // eventLabel
      }
      if (typeof arguments[5] == 'string') {
        fieldObject.eventValue = arguments[5]; // eventValue
      }
    }

    var params = {
      v: '1', // *
      tid: GA_ID, // *
      cid: cid()
    };
    
    if (typeof fieldObject.hitType != 'undefined') params.t = fieldObject.hitType;
    if (typeof fieldObject.eventCategory != 'undefined') params.ec = fieldObject.eventCategory;
    if (typeof fieldObject.eventAction != 'undefined') params.ea = fieldObject.eventAction;
    if (typeof fieldObject.eventLabel != 'undefined') params.el = fieldObject.eventLabel;
    if (typeof fieldObject.eventValue != 'undefined') params.ev = fieldObject.eventValue;
    if (typeof fieldObject.dimension1 != 'undefined') params.cd1 = fieldObject.dimension1;
    if (typeof fieldObject.dimension2 != 'undefined') params.cd2 = fieldObject.dimension2;
    if (typeof fieldObject.dimension3 != 'undefined') params.cd3 = fieldObject.dimension3;
    if (typeof fieldObject.dimension4 != 'undefined') params.cd4 = fieldObject.dimension4;
    if (typeof fieldObject.nonInteraction != 'undefined') params.ni = fieldObject.nonInteraction;
    if (params.t == 'pageview' && params.ec) {
      params.dp = params.ec;
    }
    var request = new XMLHttpRequest();
    request.open("POST", "https://www.google-analytics.com/collect", true);
    request.send(serialize(params));

    function serialize(obj) {
      if (typeof(obj) === 'string') return obj;
      var query = [];
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          query.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
        }
      }
      return query.join('&');
    }
    
    function cid(){
      if (!!localStorage.getItem('cid')) {
        return localStorage.getItem('cid');
      }
    
      for (var a = window.navigator.userAgent + (document.cookie ? document.cookie : "") + (document.referrer ? document.referrer : ""), b = a.length, c = window.history.length; 0 < c;) {
        a += c-- ^ b++;
      }
      
      var cid = [hd() ^ La(a) & 2147483647, Math.round((new Date()).getTime() / 1E3)].join(".");
      localStorage.setItem('cid', cid);
      
      return localStorage.getItem('cid');
      
      function hd() {
        return Math.round(2147483647 * Math.random());
      }
      
      function La(a) {
        var b = 1, c;
        if (a){
          for (b = 0, c = a.length - 1; 0 <= c; c--) {
            var d = a.charCodeAt(c);
            b = (b << 6 & 268435455) + d + (d << 14);
            d = b & 266338304;
            b = 0 != d ? b ^ d >> 21 : b;
          }
        }
        return b;
      }
    }

  };
  
  mixpanel = function(){
    this.identify = function(){
      
    };
    this.track = function(){
      
    };
  };

})();

function restart() {
  localStorage.STATE = "LOGIN";
  localStorage.EVENT = "{}";
  LOCAL_TASKS = [];
  localStorage.LOCAL_TASKS = JSON.stringify(LOCAL_TASKS);

  cache.clear();
  tracker = undefined;
  if (timeManager) {
    timeManager.stopTrackingIntervals();
    timeManager.kill();
  }
  websocket.destroy();
  
  updatePermissionsLength();
  
  // intento loguear
  setTimeout(function(){
    TTExtension.tryToLogin();
  }, 1000);
}

function loginWithToken(token) {
  session.loginWithToken({
    data: { token: token },
    callback: setValues,
    errorCallback: onErrorCallback
  });
}

function restartApp() {
  chrome.runtime.reload();
}

function forceUpdate() {}

function setValues(data) {
  currentUser.set(data.data);
  saveStore();
  bookmarksStore.clear();
  notifications.getBookmarks();
  tracker = new Tracker();
  timeManager = new TimeManager();
  timeManager.init();
  websocket.init();
  SPEED = currentUser.getCurrentAccountStatus() == "FREE" ? 3 : 1;
  mixIdentify();
  human_login = false;
}

function onError(data) {
  data = data.detail;
  method = typeof data.method != "undefined" ? data.method : data.title;
  switch (method) {
    case "LOGIN_ON_BACKGROUND_ERROR":
      TTExtension.onLoginError(data);
      notifications.notifyOnError(data);
      break;
    case "LOGIN_ERROR":
      onLoginError(data);
      break;
    case "SIGNUP ERROR":
      onSignUpError(data);
      break;
    case "FORGOT PASSWORD ERROR":
      onRecoverError(data);
      break;
    case "START TRACKING ERROR":
      onTrackError(data);
      break;
    case "VERIFY_TOKEN":
      TTExtension.onVerifyTokenError(data);
      break;
    default:
      //TTExtension.onVerifyTokenError(data);
      notifications.notifyOnError(data);
      break;
  }
  saveError(data);
}

function onUnctachedError(data) {
  data = data.detail;
  method = typeof data.method != "undefined" ? data.method : data.title;
  switch (method) {
    case "VERIFY_TOKEN":
      TTExtension.onVerifyTokenError(data);
      break;
    default:
      notifications.notifyOnError(data);
      break;
  }
  saveError(data);
}

function saveError(error) {
  error.timestamp = new Date().getTime();
  var errors = getErrors();
  errors.pop(error);
  localStorage.ERROR = JSON.stringify(errors);
}

function getErrors() {
  var errors = [];
  try {
    errors = JSON.parse(localStorage.ERROR);
  } catch (err) {}
  return errors;
}

function onErrorCallback(data) {
  // sended to app.js
  TTExtension.sendMessage('showError', data.response);
}

function onLoginSuccess(data) {
  setValues(data);
  localStorage.STATE = "NOT_TRACKING";
  TTExtension.updateView(data);
  pageView('/login-success');
  mixIdentify();
}

function onLoginError(data) {
  localStorage.STATE = "LOGIN";
  TTExtension.clearLogin();
  TTExtension.updateView(data.detail);
  pageView('/login-error');
}

function onRecover(data) {
  localStorage.STATE = "LOGIN";
  TTExtension.updateView(data);
  pageView('/recover-password');
}

function onRecoverError(data) {
	localStorage.STATE = "RECOVER_PASSWORD";
  TTExtension.updateView({ response: {status: 500, message: data.message }});
  pageView('/recover-password-error');
}

function onSignUpSuccess(data) {
  session.loginWithToken({
    data: {
      token: data.data.token
    },
    callback: function(data) {
      localStorage.STATE = "NOT_TRACKING";
      setValues(data);
      TTExtension.updateView(data);
    }
  });
  pageView('/signup-success');
}

function onSignUpError(data) {
	localStorage.STATE = "SIGN_UP";
  TTExtension.updateView({ response: {status: 500, message: data.message }});
	pageView('/signup-error');
}

function onTrackError(data) {
	localStorage.STATE = "NOT_TRACKING";
  TTExtension.updateView({ response: {status: 500, message: data.message }});
	pageView('/track-error');
}

function onStop(data) {
  localStorage.STATE = "NOT_TRACKING";
  TTExtension.updateView(data);
  pageView('/stop-tracking');
}

function onStopTrack() {
  if (localStorage.STATE == 'TRACKING') {
    timeManager.stopTracking();
  }
  pageView('/stop-tracking');
}

function onNotLogged() {
  localStorage.STATE = "LOGIN";
  pageView('/not-logged');
}

function trackingEventUpdate() {
  if (timeManager.event_data !== "") {
    localStorage.STATE = "TRACKING";
    chrome.browserAction.setIcon({ "path": "img/iconos/32x32_green.png" });
  } else {
    localStorage.STATE = "NOT_TRACKING";
    chrome.browserAction.setIcon({ "path": "img/iconos/32x32_grey.png" });
  }
  TTExtension.updateView({ event: 'TRACKING_EVENT_UPDATE' });
}
	
function beforeStartTracking() {}

function taskStarted() {
  localStorage.STATE = "TRACKING";
  TTExtension.updateView({ event: 'TASK_STARTED' });
  //var text = timeManager.event_data.task ? timeManager.event_data.task : '';
  //text = text == '' ? timeManager.task_data.project : text;
  pageView('/start-tracking');
  notifications.notifyWhenTracking();
}

function taskSyncError() {
  localStorage.STATE = "NOT_TRACKING";
  timeManager.stopTracking();
  TTExtension.updateView();
}

function updateTaskDuration() {
  var domain = getTaskJson(timeManager.task_data.json);
  var data = {
    event_id: timeManager.event_data.id,
    formated_event_duration: timeManager.formated_event_duration,
    id: timeManager.task_data.id,
    project: timeManager.task_data.project,
    task: timeManager.task_data.name,
    formated_duration: timeManager.formated_task_duration,
    worked_hours: timeManager.task_data.worked_hours,
    estimated_time: timeManager.task_data.estimated_time,
    loc_estimated_time: timeManager.task_data.loc_estimated_time,
    url: domain.url,
    domain: domain.domain,
    domain_id: domain.id
  };
  localStorage.EVENT = JSON.stringify(data);
  // sended to app.js
  TTExtension.sendMessage('updateTaskDuration', data);
}

function onSwitchAccount(data) {
  applications.get({
    callback: onGetApplications,
    errorCallback: onGetErrorApplications
  });
}

function onGetApplications(data) {
  TTExtension.reloadTabs();
  // sended to app.js
  TTExtension.sendMessage('updateData', {});
}

function onGetErrorApplications(data) {
  TTExtension.reloadTabs();
  // sended to app.js
  TTExtension.sendMessage('updateData', {});
}

function onAppUpdated(e) {
  // recargar tab e.detail == 'asana'
  var app_domain = DOMAINS.filter(function(d) {
    return d.app == e.detail;
  })[0] || false;

  if (app_domain) {
    // reload domain pages
    var origins = domainToOrigins(app_domain.domain);
    chrome.permissions.contains({
      origins: origins
    }, function(allowed) {
      if (allowed) {
        TTExtension.reloadTab(origins);
      }
    });
    
    // reload options page
    chrome.tabs.query({
      url: chrome.extension.getURL('options.html') + '*'
    }, function(tabs) {
      if (tabs.length) {
        for (var i = 0; i < tabs.length; i++) {
          chrome.tabs.reload(tabs[i].id);
        }
      }
    });
    
  }
}

function onUserUpdated(e) {
  // reload options page
  chrome.tabs.query({
    url: chrome.extension.getURL('options.html') + '*'
  }, function(tabs) {
    if (tabs.length) {
      for (var i = 0; i < tabs.length; i++) {
        chrome.tabs.reload(tabs[i].id);
      }
    }
  });
}

function getTaskJson(json) {
  var domain = { url: '', domain: '', id: '' };
  try {
    json = JSON.parse(json);
    domain.url = json.button.url;
    domain.domain = json.button.domain;
    domain.id = json.button.id;
  } catch (err) {}

  return domain;
}

function getRecentEvents(page, page_size) {
  var post_data = [
    {
      "name": "from",
      "value": moment().subtract(2, 'years').format('YYYY-MM-DD')
    },
    {
      "name": "to",
      "value": moment().format('YYYY-MM-DD')
    },
    {
      "name": "filter",
      "value": "USER"
    },
    {
      "name": "id",
      "value": currentUser.get().id
    },
    {
      "name": "page",
      "value": page
    },
    {
      "name": "page_size",
      "value": page_size
    },
    {
      "name": "order",
      "value": "desc"
    }
  ];
  var params = {
    callback: onGetRecentEvents,
    errorCallback: onErrorCallback,
    data: post_data,
    blockLoading: false
  };
  events.get.min(params);
}

function onGetRecentEvents(data) {
  // sended to app.js
  TTExtension.sendMessage('updateEvents', data);
}

function addLocalTasks(data) {
  var SEARCH_TASKS = [];

  for (var i = 0; i < data.length; i++) {
    var task = data[i];
    var add = true;
    for (var j = 0; j < LOCAL_TASKS.length; j++) {
      //exists on local storage?  
      if(LOCAL_TASKS[j].task == task.task && LOCAL_TASKS[j].project == task.project){
        add = false;
        //break;
      }
    }

    if (add) {
      var search_task = {
        task_name: task.task,
        project_name: task.project
      };
      var formatted_local_task = {
        id: null,
        project: task.project,
        task: task.task,
        formated_duration: '',
        human_duration: '',
        worked_hours: 0,
        estimated_time: 0,
        loc_estimated_time: '',
        url: '',
        domain: '',
        domain_id: ''
      };
      SEARCH_TASKS.push(search_task);
      LOCAL_TASKS.push(formatted_local_task);
    }
  }

  localStorage.LOCAL_TASKS = JSON.stringify(LOCAL_TASKS);
  
  if (SEARCH_TASKS.length) {
    if (DEBUG_MODE) console.log('search');
    // queries tiene que ser global (con otro nombre),
    // así on search tasks puede saber si se terminaron o no los ajax y
    // sumar las consultas
    search_tasks_tmp = [];
    search_tasks_queries = Math.ceil(JSON.stringify(SEARCH_TASKS).length / search_tasks_length);
    // BUG:
    var search_tasks_queries_array = splitArrayInArrays(SEARCH_TASKS, search_tasks_queries);
    for (var k = 0; k < search_tasks_queries_array.length; k++) {
      tasks.search({
        data: search_tasks_queries_array[k],
        callback: onSearchTasks,
        errorCallback: onErrorCallback
      });
    }
  }
}

function onSearchTasks(data, params) {
  search_tasks_done++;
  var tasks = data.data;
  for (var i = 0; i < tasks.length; i++) {
    var task = tasks[i];
    search_tasks_tmp.push(task);
  }

  if (search_tasks_done < search_tasks_queries) return false;

  //callback from tasks.search
  //if(!tasks.length) return;

  for (var j = 0; j < search_tasks_tmp.length; j++) {
    var task = search_tasks_tmp[j];
    var current_task = {
      task: task.name,
      project: task.project == null ? '' : task.project
    };

    //replacing data on local tasks
    for (var k = 0; k < LOCAL_TASKS.length; k++) {
      if(LOCAL_TASKS[k].task == current_task.task && LOCAL_TASKS[k].project == current_task.project){
        //task
        var domain = getTaskJson(task.json);

        var formatted_local_task = {
          id: task.id,
          project: task.project == null ? "" : task.project,
          task: task.name,
          formated_duration: task.accumulated_time_display,
          human_duration: humanDuration(task.accumulated_time),
          worked_hours: task.worked_hours,
          estimated_time: task.estimated_time,
          loc_estimated_time: task.loc_estimated_time,
          url: domain.url,
          domain: domain.domain,
          domain_id: domain.id
        };
        LOCAL_TASKS[k] = formatted_local_task;
        break;
      }
    }
  }
  localStorage.LOCAL_TASKS = JSON.stringify(LOCAL_TASKS);
}

function getAppVersion() {
  return PLATFORM + " " + STAGE + " " + APP_VERSION;
}

function navigateToDesktop(hash) {
  var url = PRODUCTION_DOMAIN + '#';
  url += currentUser.isLoggedIn() ? currentUser.getCurrentAccount().account_id : '';
  url += hash ? hash : '';
  navigateTo(url);
}

function navigateTo(url) {
  chrome.tabs.create({
    url: url
  });
}

window.onerror = function(error, url, line) {
  return false;
};

function pageView(e) {
  var evt = {
    event_name: "Page View",
    prop: {
      url: e,
      category: 'use'
    },
    ga: true
  };
  eventTrack(evt);
}

function mixIdentify() {
  var obj = {
    user_id: currentUser.get().id,
    name: currentUser.get().name + " " + currentUser.get().surname, // Full name
    email: currentUser.get().email, // Email address
    created_at: Number(moment(currentUser.get().created_at, "YYYY-MM-DD HH:mm:ss").format("X")), // Signup date as a Unix timestamp    
    custom_attributes: {
      app_id: INTERCOM_ID,
      user_id: currentUser.get().id,
      first_name: currentUser.get().name,
      last_name: currentUser.get().surname,
      worked_hours: currentUser.get().worked_hours,
      role: currentUser.get().role,
      is_owner: currentUser.get().is_owner,
      account_id: currentUser.get().account_id,
      last_app_version: getAppVersion(),
      language: currentUser.get().settings.language,
      STAGE: STAGE,
      BUTTON: getAppVersion()
    },
    companies: [{
      id: currentUser.getCurrentAccount().account_id,
      name: currentUser.getCurrentAccount().company
    }]
  };
  window.Intercom('update', obj);
}

function mixButtonUpdateUserAttribute(stat_obj) {
  var obj = {
    user_id: currentUser.get().id,
    name: currentUser.get().name + " " + currentUser.get().surname, // Full name
    email: currentUser.get().email, // Email address
    created_at: Number(moment(currentUser.get().created_at, "YYYY-MM-DD HH:mm:ss").format("X")), // Signup date as a Unix timestamp    
    custom_attributes: stat_obj
  };
  window.Intercom("update", obj);
}

function mixIdentifyForSignup(email, user_id, app_version) {
  var obj = {
    user_id: user_id,
    email: email, // Email address
    custom_attributes: {
      app_id: INTERCOM_ID,
      signed_up_in: getAppVersion()
    }
  };
  window.Intercom("update", obj);
}


function returnCurrentTask() {
  var current_task = {};
  if (timeManager) {
    current_task = timeManager.task_data;
    if (current_task) {
      for (var j = 0; j < LOCAL_TASKS.length; j++) {
        if (timeManager.task_data.name == LOCAL_TASKS[j].task && (timeManager.task_data.project == null ? '' : timeManager.task_data.project) == LOCAL_TASKS[j].project) {
          var domain = getTaskJson(current_task.json);
          //format
          var formatted_local_task = {
            id: timeManager.task_data.id,
            project: timeManager.task_data.project == null ? '' : timeManager.task_data.project,
            task: timeManager.task_data.name,
            formated_duration: timeManager.formated_task_duration,
            human_duration: humanDuration(timeManager.actual_total_task_duration),
            worked_hours: timeManager.task_data.worked_hours,
            estimated_time: timeManager.task_data.estimated_time,
            loc_estimated_time: timeManager.task_data.loc_estimated_time,
            url: domain.url,
            domain: domain.domain,
            domain_id: domain.id,
            third_party_data: timeManager.task_data.third_party_data
          };
          LOCAL_TASKS[j] = formatted_local_task;
        }
      }
      //sincro cambios
      localStorage.LOCAL_TASKS = JSON.stringify(LOCAL_TASKS);
      //envío respuesta
    }
  }
  return current_task;
}

function returnCurrentEventDuration() {
  var current_event = '';
  if (timeManager) {
    return timeManager.formated_event_duration;
  }
  return current_event;
}

function splitArrayInArrays(arr, n) {
  var rest = arr.length % n, // how much to divide
    restUsed = rest, // to keep track of the division over the elements
    partLength = Math.floor(arr.length / n),
    result = [];
  for (var i = 0; i < arr.length; i += partLength) {
    var end = partLength + i,
      add = false;

    if (rest !== 0 && restUsed) { // should add one element for the division
      end++;
      restUsed--; // we've used one division element now
      add = true;
    }
    result.push(arr.slice(i, end)); // part of the array
    if (add) {
      i++; // also increment i in the case we added an extra element for division
    }
  }
  return result;
}

var _ls=function(){var _lsT=0,_xL,_x,_t;for(_x in localStorage){_xL=((localStorage[_x].length+_x.length)*2);_lsT+=_xL;}_t=(_lsT/1024).toFixed(2)+" KB";return _t}
