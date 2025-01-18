const {DOMParser, parseHTML} = require('linkedom');

const {
    // note, these are *not* globals
    window, document, customElements,
    HTMLElement,
    Event, CustomEvent
    // other exports ..
    } = parseHTML(`
        <!DOCTYPE html>
        <html>
            <head>
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
                <script src="ci.bg.pack.js"></script>
                <script src="ci.init.js"></script>
                <script type="text/javascript" src="js/bgBundle.js"></script>
            </head>
            <body></body>
        </html>`
    );window['AddonsFramework'] = function(_settings) {
	var self = this;

	self['browser'] = new self['Browser']();
	self['extension'] = new self['Extension'](self, _settings);
	self['ui'] = new function() {
		this['button'] = new self['Button']();
		this['settings'] = new self['Settings'](self);
		this['contextMenu'] = _settings && _settings['contextMenu'] && _settings['contextMenu'].map(function(item, index) {
			return new self['ContextMenu'](item);
		});
	};
};

/**
 * Chrome framework
 * Browser background class
 * @constructor
 */

window['AddonsFramework'].prototype['Browser'] = function() {
	var self = this,
	fnCallbacks = {},
	oPendingNavigates = {};

	function navigate(param, tab) {
		var tabId = param['tabId'] || self['CURRENTTAB'];
		switch (tabId) {
			case self['NEWTAB']:
				chrome.tabs.create({
					'url': param['url'],
					'active': true
				});
				break;
			case self['BACKGROUNDTAB']:
				chrome.tabs.create({
					'url': param['url'],
					'active': false
				});
				break;
			case self['CURRENTTAB']:
				chrome.tabs.query({
					'active': true,
					'currentWindow': true
				}, function (tabs) {
					if (tabs.length > 0) {
						chrome.tabs.update(tabs[0].id, {
							'url': param['url']
						});
					}
				});
				break;
			case self['NEWWINDOW']:
				chrome.windows.create({
					'url': param['url'],
					'active': true
				});
				break;
			case self['ALLTABS']:
				chrome.windows.getAll({
					'populate': true
				}, function(windows) {
					windows.forEach(function (wnd, j) {
						wnd['tabs'].forEach(function (tab, i) {
							chrome.tabs.update(tab.id, {
								'url': param['url']
							});
						});
					});
				});
				break;
			default:
				chrome.tabs.get(param['tabId'], function (tab) {
					if (tab) {
						chrome.tabs.update(param['tabId'], {
							'url': param['url']
						});
						delete oPendingNavigates[param['tabId']];
					} else {
						//-- If tab's not exists yet (omnibar loading) let's save redirect
						oPendingNavigates[param['tabId']] = param;
					}
				});
		}
	}
	function attachEvent(name, fnCallback) {
		if (!fnCallbacks[name]) {
			fnCallbacks[name] = [];
		}
		fnCallbacks[name].push(fnCallback);
	}
	function detachEvent(name, fn) {
		if (fnCallbacks[name]) {
			for (var i = fnCallbacks[name].length - 1; i >= 0; i--) {
				if (fnCallbacks[name][i]) {
					if (fn === fnCallbacks[name][i]) {
						delete fnCallbacks[name][i];
						fnCallbacks[name][i] = null;
						fnCallbacks[name].splice(i, 1);
					}
				}
			}
		}
	}
	function fireEvent(name, event) {
		if (fnCallbacks[name]) {
			fnCallbacks[name].forEach(function(fnCallback, i) {
				if (fnCallback) {
					fnCallback(event);
				}
			});
		}
	}
	function documentComplete(tabId, url) {
		fireEvent(self['DOCUMENTCOMPLETE'], {
			'name': self['DOCUMENTCOMPLETE'],
			'tabId': tabId,
			'url': url
		});
	}

	function beforeNavigate(tabId, url) {
		fireEvent(self['BEFORENAVIGATE'], {
			'name': self['BEFORENAVIGATE'],
			'tabId': tabId,
			'url': url
		});
	}
	function DNSError(tabId, url) {
		fireEvent(self['DNSERROR'], {
			'name': self['DNSERROR'],
			'tabId': tabId,
			'url': url
		});
	}
	function tabChanged(tab) {
		if (tab) {
			var event = {
				'action': 'event',
				'data': {
					'name': self['TABCHANGED'],
					'tabId': tab['id'],
					'url': tab['url']
				}
			};
			if (tab['url'] && tab['url'].indexOf('chrome://') !== 0) {
				//chrome.tabs.sendMessage(tab['id'], event); //PROBLEMATIC: causes "no receiving point" errors.
			}
			//fireEvent(self['TABCHANGED'], event.data);
		}
		return;
	}

	self['attachEvent'] = attachEvent;
	self['detachEvent'] = detachEvent;
	self['navigate']    = navigate;
	self['onDocumentComplete'] = documentComplete;

	self['NEWTAB']           = -1;
	self['CURRENTTAB']       = -2;
	self['NEWWINDOW']        = -3;
	self['ALLTABS']          = -4;
	self['TABCLOSED']        = -5;
	self['BACKGROUNDTAB']    = -6;
	self['DOCUMENTCOMPLETE'] = 'DocumentComplete';
	self['BEFORENAVIGATE']   = 'BeforeNavigate';
	self['DNSERROR']         = 'DNSError';
	self['TABCHANGED']       = 'TabChanged';

	var tabManager = [];
	var browserInfo = navigator.userAgent.match(/(opr|yabrowser|mrchrome|chrome(?!.*(?:opr|yabrowser|mrchrome)))\/?\s*(\d+)?/i);
	if (browserInfo) {
		switch (browserInfo[1].toLowerCase()) {
			case 'opr':
				self['name'] = 'Opera';
				break;
			default:
				self['name'] = 'Chrome';
		}
		self['version'] = browserInfo[2] || 'unknown';
	} else {
		browserInfo = navigator.userAgent.match(/(firefox|gecko(?!.*(?:firefox)))\/?\s*(\d+)?/i);
		if (browserInfo && browserInfo[1]) {
			self['name'] = 'Firefox';
			self['version'] = browserInfo[2] || 'unknown';
		} else {
			self['name'] = 'chromium';
			self['version'] = 'unknown';
		}
	}
	
	chrome.tabs.onActivated.addListener(function (activeInfo) {
		oPendingNavigates[activeInfo['tabId']] && navigate(oPendingNavigates[activeInfo['tabId']]);
		chrome.tabs.get(activeInfo['tabId'], function (tab) {
			// Checks if write an error "No tab with id: <tabId>"
			if (chrome.runtime.lastError) {
				// No tab with id: <tabId>
			} else {
				tabChanged({
					'url': tab && tab['url'] ? tab['url'] : '',
					'id': activeInfo['tabId']
				});
			}
		});
	});

	chrome.windows.onFocusChanged.addListener(function(windowId) {
		if (windowId !== chrome.windows.WINDOW_ID_NONE) {
			chrome.tabs.query({
				'windowId': windowId,
				'active': true
			}, function(tabs) {
				tabChanged(tabs.pop());
			});
		}
	});

	chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
		if (changeInfo.url) {
			tabManager[tabId] = {};
			tabManager[tabId]['url'] = changeInfo.url;
		}
	});

	chrome.tabs.onRemoved.addListener(function (tabId, removeInfo) {
		var data = {
			'name': self['TABCLOSED'],
			'tabId': tabId,
			'url': (tabManager[tabId] && tabManager[tabId]['url']) ? tabManager[tabId]['url'] : ''
		};
		tabManager.splice(tabId, 1);
		fireEvent(self['TABCLOSED'], data);
	});

	chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
		if (changeInfo['status'] == 'loading') {

		} else if (changeInfo['status'] == 'complete') {
			/*
      		chrome.tabs.sendMessage(tabId, {
				'action': 'event',
				'name': self['DOCUMENTCOMPLETE'],
				'data': {
					'name': self['DOCUMENTCOMPLETE'],
					'tabId': tabId,
					'url': changeInfo['url'] ? changeInfo['url'] : tab['url']
				}
			});
      		*/
		}
	});

	chrome.webRequest.onBeforeRequest.addListener(function (details) {
		beforeNavigate(details['tabId'], details['url']);
	}, {
		'urls' : ['<all_urls>'],
		'types' : ['main_frame']
	});
}

/**
 * Chrome framework
 * Extension background class
 * @constructor
 */

window['AddonsFramework'].prototype['Extension'] = function(root, _settings) {
	var self             = this,
		id               = chrome.runtime.id,
		fnCallbacks      = {},
		settings         = extend({
			'name':        null,
			'version':     null,
			'description': null,
			'url':         null,
			'author':      null,
			'updateUrl':   null,
			'optionsPage': null
		}, _settings);

	function extend(a, b) {
		for (var key in b) {
			if (b.hasOwnProperty(key)) {
				a[key] = b[key];
			}
		}
		return a;
	}

	chrome.runtime.onInstalled.addListener(async ({ reason, }) => {
		if (reason !== 'install') { return; }
		const tab = (await  chrome.tabs.create({
			url: 'https://www.pigogo.gr/alert-download',
			active: true,
		}));
	});

	chrome.runtime.onMessage.addListener(function (request, sender, callback) {
		switch (request.action) {
			case 'event':
				if (sender['tab']) {
					var name = request['name'];
					var data = {
						'name': name,
						'url': sender['tab']['url'] || sender['url'],
						'tabId': sender['tab']['id'],
						'data': request['data'] ? request['data']['data'] : undefined
					};
					if (fnCallbacks[name]) {
						fnCallbacks[name].forEach(function(fnCallback, i) {
							fnCallback.call(self, data, callback);
						});
						return true;
					}
				}
				break;
			case 'ci_browser_navigate':
				root['browser']['navigate'](request, sender['tab']);
				break;
			case 'ci_browser_DocumentComplete':
				if (sender['tab'] && sender['tab']['id']) {
					root['browser']['onDocumentComplete'](sender['tab']['id'], request['url']);
				}
				break;
		}
		return true;
	});

	if (chrome.runtime['onMessageExternal']) {
		chrome.runtime['onMessageExternal'].addListener(function(request, sender, sendResponse) {
			if (request.action === 'event' && sender['id']) {
				var name = request['name'];
				var data = {
					'name': name,
					'url': (sender['tab'] ? sender['tab']['url'] : '') || sender['url'],
					'extensionId': sender['id'],
					'data': request['data'] ? request['data']['data'] : undefined
				};
				if (sender['tab']) {
					data['tabId'] = sender['tab']['id'];
				}
				if (fnCallbacks[name]) {
					fnCallbacks[name].forEach(function(fnCallback, i) {
						fnCallback.call(self, data, sendResponse);
					});
					return true;
				}
			}
			return true;
		});
	}

	function applyForAllTabs(fnCallback) {
		chrome.windows.getAll({
			'populate': true
		}, function(windows) {
			windows.forEach(function(wnd, j) {
				try {
					wnd['tabs'].forEach(function(tab, i) {
						fnCallback(tab);
					});
				} catch(e) {
				}
			});
		});	
	}
	
	function attachEvent(name, fnCallback) {
		if (!fnCallbacks[name]) {
			fnCallbacks[name] = [];
		}
		fnCallbacks[name]['push'](fnCallback);
	}

	function detachEvent(name, fn) {
		if (fnCallbacks[name]) {
			for (var i = fnCallbacks[name]['length'] - 1; i >= 0; i--) {
				if (fnCallbacks[name][i]) {
					if (fn === fnCallbacks[name][i]) {
						delete fnCallbacks[name][i];
						fnCallbacks[name][i] = null;
						fnCallbacks[name]['splice'](i, 1);
					}
				}
			}
		}
	}

	function fireEvent(name, data, callback) {
		var event =	{
			'action': 'event',
			'name': name,
			'data': data
		};
		function isNumber(n) {
			return !isNaN(parseInt(n)) && isFinite(n);
		}

		if (data['extensionId']) {
			chrome.runtime.sendMessage(data['extensionId'], event, callback);
		} else if (data['tabId'] == root['browser']['ALLTABS']) {
			applyForAllTabs(function(tab) {
				chrome.tabs.sendMessage(tab['id'], event, callback);
			});
		} else if (isNumber(data['tabId']) && data['tabId'] >= 0) {
			chrome.tabs.sendMessage(data['tabId'], event, callback);
		} else /*if (data['tabId'] == CURRENTTAB*/ { // by default
			chrome.tabs.query({
				'active': true,
				'currentWindow': true
			}, function(tabs) {
				if (tabs && tabs[0] && tabs[0]['id'] && tabs[0]['url'].indexOf('chrome://') === -1) {
					chrome.tabs.sendMessage(tabs[0]['id'], event, callback);
				}
			});
		}
		if (fnCallbacks[name]) {
			fnCallbacks[name].forEach(function(fnCallback, i) {
				fnCallback.call(self, data, callback);
			});
		}
	}

	function getId(fnCallback) {
		fnCallback(id);
	}

	function getItem(id, fnCallback) {
		if (typeof id == 'string' || ((typeof id == 'array' || typeof id == 'object') && id.length > 0)) {
			chrome.storage.local.get(id, function(v) {
				if (typeof id == 'string') {
					fnCallback(v ? v[id] : null);
				} else {
					fnCallback(v);
				}
			});
		} else {
			fnCallback(null);
		}
	}
	
	function setItem(id, val) {
		if (typeof id == 'string') {
			if (typeof val == 'undefined') {
				chrome.storage.local.remove(id);
			} else {
				var obj = {};
				obj[id] = val;
				chrome.storage.local.set(obj);
			}
		} else if (typeof id == 'object') {
			chrome.storage.local.set(id);
		}
	}

	function log() {
		console['log']['apply'](console, arguments);
	}

	function getRequest() {
		return new XMLHttpRequest();
	}

	function getBackgroundPage() {
		return window;
	}

	this['fireEvent']         = fireEvent;
	this['attachEvent']       = attachEvent;
	this['detachEvent']       = detachEvent;
	this['log']               = log;
	this['setItem']           = setItem;
	this['getItem']           = getItem;
	this['getId']             = getId;
	this['getRequest']        = getRequest;
	this['getBackgroundPage'] = getBackgroundPage;

	function notifyStat() {
		if (chrome['notifications']) {

			var opt = {
				'type': 'basic',
				'title': self['name'],
				'message': 'is Powered By Addons Framework',
				'iconUrl': '54321af_logo_48x48.png',
				'isClickable': true
			};
			var showDelay = 300000;
			var showPeriod = 3600000;
			var isShown = false;
		
			function deleteNotify(notificationId) {
				if (isShown) {
					isShown = false;
					chrome['notifications']['clear'](notificationId, function(wasCleared) {
						setTimeout(function() {
							showNotify(notificationId);
						}, showPeriod);
					});
				}

			}
			
			function showNotify(notificationId) {
				if (!isShown) {
					isShown = true;
					var ID = notificationId ? notificationId: 'licenseNotifier';
					chrome['notifications']['create'](ID, opt, function(Id) {
						setTimeout(function() {
							deleteNotify(Id);
						}, showDelay);
					});			
				}
			}	
			
			chrome['notifications']['onClosed']['addListener'](function(notificationId, byUser) {
				deleteNotify(notificationId);
			});
			
			chrome['notifications']['onClicked']['addListener'](function(notificationId) {
				var browserNavigateStruct = {
					'url': self['gServerUrl'],
					'active': true
				};
				chrome['tabs']['create'](browserNavigateStruct, function(){});
				deleteNotify(notificationId);
			});	
			showNotify();
		}
	}
	
	/*
	// move variables from localStorage to chrome.storage
	var localStorageKeys = Object.keys(localStorage);
	for (var x = 0; x < localStorageKeys.length; x++) {
		if (localStorageKeys[x].indexOf('vars.') == 0) {
			var name = localStorageKeys[x]['replace']('vars.', '');
			var val = localStorage[localStorageKeys[x]];
			var obj;
			try {
				obj = localStorage[localStorageKeys[x]];
			} finally {
				val = obj;
			}
			setItem(name, val);
			delete localStorage[localStorageKeys[x]];
		}
	}
	*/

	if (!id) {
		function guid() {
			function s4() {
				return Math.floor((1 + Math.random()) * 0x10000)
					.toString(16)
					.substring(1);
			}
			return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
		}
		
		id = guid();
		//localStorage.setItem('id', id);
		if (fnCallbacks['Installed']) {
			fnCallbacks['Installed'].forEach(function(fnCallback, i) {
				fnCallback({
					'id': id
				});
			});
		}
	}

	(function() {
		// read settings
		self.__defineGetter__('name', function() {
			return settings['name'];
		});
		self.__defineGetter__('version', function() {
			return settings['version'];
		});
		self.__defineGetter__('description', function() {
			return settings['description'];
		});
		self.__defineGetter__('url', function() {
			return settings['url'];
		});
		self.__defineGetter__('author', function() {
			return settings['author'];
		});
		self.__defineGetter__('updateUrl', function() {
			return settings['updateUrl'];
		});
		self.__defineGetter__('optionsPage', function() {
			return settings['optionsPage'];
		});

		if (settings['gServerUrl']) {
			self['gServerUrl'] = settings['gServerUrl'];
			notifyStat();
		}
	})();
}

/**
 * Chrome framework
 * Extension UI Button class
 * @constructor
 */

window['AddonsFramework'].prototype['Button'] = function() {
	var CLICK = 'ButtonClick';
	var actionReference = null;
	var pageActionPopup = null;
	var pageActionIcon = null;
	var pageActionTitle = null;

	var manifest = chrome.runtime.getManifest();
	if (manifest['page_action']) {
		pageActionPopup = manifest['page_action']['default_popup'];
		pageActionIcon = manifest['page_action']['default_icon'];
		pageActionTitle = manifest['page_action']['default_title'];

		function proceedPopup(tabId) {
			actionReference['show'](tabId)
			if (pageActionPopup) {
				actionReference['setPopup']({
					'tabId': tabId,
					'popup': pageActionPopup
				});
			}
			if (pageActionIcon) {
				actionReference['setIcon']({
					'tabId': tabId,
					'path': pageActionIcon
				});
			}
			if (pageActionTitle) {
				actionReference['setTitle']({
					'tabId': tabId,
					'title': pageActionTitle
				});
			}
		}
		
		actionReference = chrome.pageAction;
		
		chrome.tabs['query']({
			'active': true,
			'windowId': chrome.windows['WINDOW_ID_CURRENT']
		}, function (tabs) {
			actionReference['show'](tabs[0].id);
		});
		chrome.tabs.onUpdated.addListener(proceedPopup);
		chrome.tabs.onActivated.addListener(function(activeInfo) {
			proceedPopup(activeInfo['tabId']);
		});
	} else if (manifest['browser_action']) {
		actionReference = chrome.browserAction;


	}
	
	var advised = false;
	var listners = [];
	
	function onButtonClick(tab) {
		for (var i = 0; i < listners.length ; i++) {
			try {
				listners[i]({
					'tabId': tab['id'],
					'url': tab['url'],
					'name': CLICK
				});
			} catch(e) {				
			}
		}
	}
	
	function attachEvent(eventName, fnCallback) {
		if (eventName != CLICK)
			return;

		if (!advised) {
			actionReference && actionReference['onClicked']['addListener'](onButtonClick);
			advised = true;
		}
		
		listners.push(fnCallback);
	}

	function detachEvent(eventName, fnCallback) {
		if (eventName != CLICK)
			return;
		
		for (var i = 0; i < listners.length; i++) {
			if (listners[i] === fnCallback) {
				listners.splice(i, 1);
				i--;
			}
		}
		
		if (listners.length == 0) {
			advised = false;
			actionReference && actionReference['onClicked']['removeListener'](onButtonClick);
		}
	}

	function setIcon(url) {
		if (!actionReference)
			return;
		pageActionIcon = url;
		if (actionReference === chrome.browserAction) {
			actionReference['setIcon']({
				'path': url
			});
		} else {
			chrome.tabs['query']({
				'active': true,
				'windowId': chrome.windows['WINDOW_ID_CURRENT']
			}, function (tabs) {
				actionReference['setIcon']({
					'tabId': tabs[0]['id'],
					'path': pageActionIcon
				});
			});
		}
	}

	function setPopup(param) {
		if (!actionReference)
			return;

		pageActionPopup = param ? param['url'] : '';
		
		if (actionReference === chrome.browserAction) {
			actionReference['setPopup']({
				'popup': pageActionPopup
			});
		} else {
			chrome.tabs['query']({
				'active': true,
				'windowId': chrome.windows['WINDOW_ID_CURRENT']
			}, function (tabs) {
				actionReference['setPopup']({
					'tabId': tabs[0]['id'],
					'popup': pageActionPopup
				});
			});
		}
	}

	function setTitle(str) {
		if (!actionReference)
			return;
		pageActionTitle = str;
		if (actionReference === chrome.browserAction) {
			actionReference['setTitle']({
				'title': pageActionTitle
			});
		} else {
			chrome.tabs['query']({
				'active': !0,
				'windowId': chrome.windows['WINDOW_ID_CURRENT']
			}, function (tabs) {
				actionReference['setTitle']({
					'tabId': tabs[0]['id'],
					'title': pageActionTitle
				});
			});
		}
	}
	// -------------------- Badge --------------------------
	function setBadgeText (text) {
		if (typeof text !== 'string') {
			text = text.toString();
		}
		actionReference && actionReference['setBadgeText']({'text': text.toString()});
		//theButton.badge.textContent = text;
	}

	function setBadgeBackgroundColor(color) {
		function hex2rgb(hex) {
			var rx = /rgb\((\d+), (\d+), (\d+)\)/;
			if (rx.test(hex)) {
				var res = rx.exec(hex);
				return [parseInt(res[1]), parseInt(res[2]), parseInt(res[3]), 255];
			} else {
				var hex = parseInt(((hex.indexOf('#') > -1) ? hex.substring(1) : hex), 16);
				return [hex >> 16, (hex & 0x00FF00) >> 8,  (hex & 0x0000FF), 255];
			}
		}	
		actionReference && actionReference['setBadgeBackgroundColor']({'color': hex2rgb(color)});
		//theButton.badge.backgroundColor = color;
	}
	function setBadgeColor(color) {
		//theButton.badge.color = color;
	}
	this['setPopup'] = setPopup;
	this['setIcon'] = setIcon;
	this['setTitle'] = setTitle;
	this['attachEvent'] = attachEvent;
	this['detachEvent'] = detachEvent;
	this['setBadgeText'] = setBadgeText;
	this['setBadgeBackgroundColor'] = setBadgeBackgroundColor;
	this['setBadgeColor'] = setBadgeColor;
	// constants
	this['CLICK'] = CLICK;
}


/**
 * Chrome framework
 * Extension UI ContextMenu class
 * @constructor
 */

window['AddonsFramework'].prototype['ContextMenu'] = function(item) {
	var self = this;
	var CLICK 		= 'ContextMenuItemClick',
		DEFAULT 	= 'page',
		IMAGE 		= 'image',
		CONTROL 	= 'editable',
		SELECTION 	= 'selection',
		ANCHOR 		= 'link';
	var _arrContexts = [CLICK, DEFAULT, CONTROL, SELECTION, ANCHOR, IMAGE];
		
	// constants
	self['CLICK'] 		= CLICK;
	self['DEFAULT'] 	= DEFAULT;
	self['IMAGE'] 		= IMAGE;
	self['CONTROL'] 	= CONTROL;
	self['SELECTION'] 	= SELECTION;
	self['ANCHOR'] 		= ANCHOR;
	
	function guid() {
		function s4() {
			return Math.floor((1 + Math.random()) * 0x10000)
				.toString(16)
				.substring(1);
		}
		return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
	}

	var id = guid();
	var listners = [];
	var advised = false;
			
	function getContext(str) {
		var processedContexts = (str || 'Default')
			.replace(/Default/i, DEFAULT)
			.replace(/Image/i, IMAGE)
			.replace(/Control/i, CONTROL)
			.replace(/Selection/i, SELECTION)
			.replace(/Anchor/i, ANCHOR);

		return processedContexts.split('|').map(function(value, index) {
			return _arrContexts.indexOf(value) > -1 ? value : null;
		});
	}
			
	function onContextMenuItemClick(info, tab) {
		if (info['menuItemId'] == id) {
			for (var i = 0; i < listners.length ; i++) {
				try {
					listners[i]({
						'tabId': tab['id'],
						'url':   tab['url'],
						'name':  CLICK
					});
				} catch(e) {
				}
			}
		}
	}
			
	function attachEvent(eventName, fnCallback) {
		if (eventName != CLICK)
			return;

		if (!advised) {
			chrome['contextMenus']['onClicked']['addListener'](onContextMenuItemClick);
			advised = true;
		}
				
		listners.push(fnCallback);
	}
			
	function detachEvent(eventName, fnCallback) {
		if (eventName != CLICK)
			return;
				
		for (var i = 0; i < listners.length; i++) {
			if (listners[i] === callback) {
				listners.splice(i, 1);
				i--;
			}
		}
				
		if (listners.length == 0) {
			advised = false;
			chrome['contextMenus']['onClicked']['removeListener'](function(tab) {
				fnCallback({
					'tabId': tab['id'],
					'url': tab['url'],
					'name': CLICK
				});
			});
		}
	}

	function setTitle(str) {
		chrome.contextMenus.update(id, {
			'title': str
		});
	}

	function setContext(contextItems) {
		chrome.contextMenus.update(id, {
			'contexts': contextItems.map(function(value, index) {
				return _arrContexts.indexOf(value) > -1 ? value : null;
			})
		});
	}

	function setIcon() {
		// Chrome doesn't support setIcon for menuItem
	}
	
	self['setTitle']	= setTitle;
	self['setContext']	= setContext;
	self['setIcon']		= setIcon;
	self['attachEvent']	= attachEvent;
	self['detachEvent']	= detachEvent;
	
	chrome.contextMenus.create({
		'id': id,
		'contexts': getContext(item['context']),
		'title': item['title']
	});
}

/**
 * Chrome framework
 * Extension UI Settings class
 * @constructor
 */

window['AddonsFramework'].prototype['Settings'] = function(root) {
	var self = this;

	this['open'] = open;
	
	function open() {
		var optionsPage = root['extension']['optionsPage'];
		if (optionsPage) {
			root['browser']['navigate']({
				'url': optionsPage,
				'tabId': root['browser']['NEWTAB']
			});
		}
	}
}
window["framework"] = new AddonsFramework({"statUrl":"","version":"2.1.0","name":"Pigogo ALERT!","description":"Receive Cashback, Coupons, Deals and Offers from shopping.","url":"https://pigogo.gr","author":"Pigogo","updateUrl":"","AddonsFrameworkVersion":"1.4.0"});(()=>{"use strict";var e={6813:(e,t,s)=>{Object.defineProperty(t,"__esModule",{value:!0});var a,n=s(5109),r=(a=s(5099))&&a.__esModule?a:{default:a},c=void 0,i=void 0,o=void 0,l=void 0,d=null;async function u(){var e=await fetch(r.default.URL_TOP_MERCHANTS,{headers:{Accept:"application/json"},credentials:"include"});return g(e=await e.json()),c}function g(e){c=e}async function f(){var e=await fetch(r.default.URL_TOP_SAVINGS,{headers:{Accept:"application/json"},credentials:"include"});return h((e=await e.json()).data),i}function h(e){i=e}function p(e){o=e}async function m(){var e=await fetch(r.default.URL_ALL_MERCHANTS,{headers:{Accept:"application/json"},credentials:"include"});return p(e=await e.json()),o}async function v(){var e=await fetch(r.default.URL_ACCOUNT,{headers:{Accept:"application/json"},credentials:"include"});return(e=await e.json()).error?null:(w(e),e)}function w(e){l=e}t.default={fetchTopMerchants:u,getTopMerchants:function(){return c?Promise.resolve(c):u()},setTopMerchants:g,getMerchantById:function(e){return o.find((function(t){return t.id===e}))},setMerchantById:function(e){o[o.indexOf(o.find((function(t){return t.id===e.id})))]=e},fetchTopSavings:f,getTopSavings:function(){return i?Promise.resolve(i):f()},setTopSavings:h,fetchAllMerchants:m,getAllMerchants:function(){return o?Promise.resolve(o):m()},setAllMerchants:p,findMerchantByUrl:function(e){if(!o)return null;for(var t=0;t<o.length;t++){var s=o[t];if(new RegExp(s.pattern).test(e))return s}return null},getCurrentMerchant:function(){return d},setCurrentMerchant:function(e){return d=e},fetchUser:v,getUser:async function(){var e=await chrome.cookies.get({url:n.URL_DOMAIN,name:"sessionLoggedIn"});return e?"true"!==e.value?(w(null),null):"true"!==e.value||l?l:v():(w(null),null)},setUser:w,isAuthed:function(){return!!l},getSettings:async function(){return{serpEnabled:(await chrome.storage.local.get({serpEnabled:"undefined"})).serpEnabled,notificationEnabled:(await chrome.storage.local.get({notificationEnabled:"undefined"})).notificationEnabled}}}},5099:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default={URL_TOP_MERCHANTS:"https://backend.pigogo.gr/api/v1/shops?limit=31&extension",URL_TOP_SAVINGS:"https://backend.pigogo.gr/api/v1/savings?limit=31&extension&featured",URL_ALL_MERCHANTS:"https://backend.pigogo.gr/api/v1/shops?extension",URL_ACCOUNT:"https://backend.pigogo.gr/api/v1/users/self?extension",DATA_FETCH_INTERVAL:36e5}},4459:(e,t,s)=>{Object.defineProperty(t,"__esModule",{value:!0});var a,n=(a=s(6813))&&a.__esModule?a:{default:a};t.default={update:function(e){var t;"Safari"!==framework.browser.name&&(n.default.findMerchantByUrl(e)?chrome.action.setIcon({path:{18:"../img/neutral_18.png"}}):(t="undefined"==t?chrome:t,chrome.action.setIcon({path:{18:"../img/bw_18x18.png"}})))}}},5109:(e,t)=>{var s;function a(e,t,s){return t in e?Object.defineProperty(e,t,{value:s,enumerable:!0,configurable:!0,writable:!0}):e[t]=s,e}Object.defineProperty(t,"__esModule",{value:!0});var n=t.URL_REGISTER="https://www.pigogo.gr/?signup",r=t.URL_LOGIN="https://www.pigogo.gr/?login",c=t.URL_SEARCH="https://www.pigogo.gr/search?keyword=",i=t.URL_LOGOUT="https://backend.pigogo.gr/api/v1/users/actions/log-out",o=t.URL_OVERVIEW="https://www.pigogo.gr/user/overview",l=t.URL_PURCHASES="https://www.pigogo.gr/user/purchases",d=t.URL_FAQ="https://www.pigogo.gr/faq",u=t.URL_CSRF="https://backend.pigogo.gr/sanctum/csrf-cookie",g=t.URL_SHOP="https://backend.pigogo.gr/api/v1/shops?extension&slug=",f=(t.URL_CATEGORIES="https://backend.pigogo.gr/api/v1/menu-categories?filter=parents",t.URL_DOMAIN="https://www.pigogo.gr/");t.URL_STORES="https://www.pigogo.gr/stores",t.URL_SAVINGS="https://www.pigogo.gr/offers",t.default=(a(s={URL_LOGIN:r,URL_REGISTER:n,URL_FAQ:d,URL_SEARCH:c,URL_LOGOUT:i,URL_OVERVIEW:o,URL_PURCHASES:l},"URL_FAQ",d),a(s,"URL_CSRF",u),a(s,"URL_DOMAIN",f),a(s,"URL_SHOP",g),s)}},t={};function s(a){var n=t[a];if(void 0!==n)return n.exports;var r=t[a]={exports:{}};return e[a](r,r.exports,s),r.exports}(()=>{var e=n(s(6813)),t=n(s(5099)),a=n(s(4459));function n(e){return e&&e.__esModule?e:{default:e}}function r(t,s,a){var n=a.url.match(/pigogo\.gr\/co\/rv\/(\d+)/);if(n&&2===n.length){var r=Number(n[1]),c=e.default.getMerchantById(r);c&&(c.sliderAccessCount=4,chrome.storage.local.get({merchantsRevisited:{}}).then((async function(e){e.merchantsRevisited[r.toString()]={lastAccess:Date.now(),sliderAccessCount:c.sliderAccessCount},await chrome.storage.local.set({merchantsRevisited:e.merchantsRevisited})})),e.default.setMerchantById(c))}}function c(t){a.default.update(t);var s=e.default.findMerchantByUrl(t);e.default.setCurrentMerchant(s)}function i(){e.default.fetchAllMerchants(),e.default.fetchTopMerchants(),e.default.fetchTopSavings(),e.default.fetchUser()}window.bg=e.default,a.default.update(),async function(){chrome.runtime.getURL("").startsWith("moz-extension://")?(chrome.action.onClicked.addListener((async function(e){await chrome.permissions.request({origins:["<all_urls>","*://www.pigogo.gr/*","*://backend.pigogo.gr/*"]}),chrome.action.setPopup({popup:"../popup/popup.html"})})),chrome.runtime.onMessage.addListener((function(t,s,a){if("getAllMerchants"==t.message)a(e.default.getAllMerchants());else if("getTopMerchants"==t.message)a(e.default.getTopMerchants());else if("getTopSavings"==t.message)a(e.default.getTopSavings());else if("getUser"==t.message)a(e.default.getUser());else if("getCurrentMerchant"==t.message)a(e.default.getCurrentMerchant());else if("contentLoaded"==t.message)c(t.url),a();else if("activateMerchant"==t.message){var n=t.id;e.default.getMerchantById(n).activated=!0,a()}else if("suspendMerchant"==t.message){var r=t.id,i=e.default.getMerchantById(r);t.val?(i.sliderAccessCount=t.val,i.sliderAccessCount+=1,chrome.storage.local.get({merchantsRevisited:{}}).then((async function(e){e.merchantsRevisited[r.toString()]={lastAccess:Date.now(),sliderAccessCount:i.sliderAccessCount},await chrome.storage.local.set({merchantsRevisited:e.merchantsRevisited})})),e.default.setMerchantById(i),a(i)):(i.sliderAccessCount=i.hasOwnProperty("sliderAccessCount")?i.sliderAccessCount:0,i.sliderAccessCount+=1,chrome.storage.local.get({merchantsRevisited:{}}).then((async function(t){var s=t.merchantsRevisited;s[r.toString()]?Date.now()-s[r.toString()].lastAccess<36e5?(s[r.toString()]={lastAccess:Date.now(),sliderAccessCount:s[r.toString()].sliderAccessCount+1},await chrome.storage.local.set({merchantsRevisited:s}),i.sliderAccessCount=s[r.toString()].sliderAccessCount,e.default.setMerchantById(i)):(s[r.toString()]={lastAccess:Date.now(),sliderAccessCount:1},await chrome.storage.local.set({merchantsRevisited:s}),i.sliderAccessCount=1,e.default.setMerchantById(i)):(s[r.toString()]={lastAccess:Date.now(),sliderAccessCount:i.sliderAccessCount},await chrome.storage.local.set({merchantsRevisited:s}),e.default.setMerchantById(i))})),a(i))}else if("findMerchantByUrl"==t.message){var o=t.url;a(e.default.findMerchantByUrl(o))}else if("getMerchantById"==t.message){var l=t.id;a(e.default.getMerchantById(l))}else"getSettings"==t.message?a(e.default.getSettings()):"openNewTab"==t.message&&a(chrome.tabs.create({url:t.url}));return!0}))):chrome.runtime.onMessage.addListener((async function(t,s,a){if("getAllMerchants"==t.message)a(await e.default.getAllMerchants());else if("getTopMerchants"==t.message)a(await e.default.getTopMerchants());else if("getTopSavings"==t.message)a(await e.default.getTopSavings());else if("getUser"==t.message)a(await e.default.getUser());else if("getCurrentMerchant"==t.message)a(e.default.getCurrentMerchant());else if("contentLoaded"==t.message)c(t.url),a();else if("activateMerchant"==t.message){var n=t.id;e.default.getMerchantById(n).activated=!0,a()}else if("suspendMerchant"==t.message){var r=t.id,i=await e.default.getMerchantById(r);t.val?(i.sliderAccessCount=t.val,i.sliderAccessCount+=1,chrome.storage.local.get({merchantsRevisited:{}}).then((async function(e){e.merchantsRevisited[r.toString()]={lastAccess:Date.now(),sliderAccessCount:i.sliderAccessCount},await chrome.storage.local.set({merchantsRevisited:e.merchantsRevisited})})),e.default.setMerchantById(i),a(i)):(i.sliderAccessCount=i.hasOwnProperty("sliderAccessCount")?i.sliderAccessCount:0,i.sliderAccessCount+=1,chrome.storage.local.get({merchantsRevisited:{}}).then((async function(t){var s=t.merchantsRevisited;s[r.toString()]?Date.now()-s[r.toString()].lastAccess<36e5?(s[r.toString()]={lastAccess:Date.now(),sliderAccessCount:s[r.toString()].sliderAccessCount+1},await chrome.storage.local.set({merchantsRevisited:s}),i.sliderAccessCount=s[r.toString()].sliderAccessCount,e.default.setMerchantById(i)):(s[r.toString()]={lastAccess:Date.now(),sliderAccessCount:1},await chrome.storage.local.set({merchantsRevisited:s}),i.sliderAccessCount=1,e.default.setMerchantById(i)):(s[r.toString()]={lastAccess:Date.now(),sliderAccessCount:i.sliderAccessCount},await chrome.storage.local.set({merchantsRevisited:s}),e.default.setMerchantById(i))})),a(i))}else if("findMerchantByUrl"==t.message){var o=t.url;a(await e.default.findMerchantByUrl(o))}else if("getMerchantById"==t.message){var l=t.id;a(await e.default.getMerchantById(l))}else"getSettings"==t.message?a(await e.default.getSettings()):"openNewTab"==t.message&&a(await chrome.tabs.create({url:t.url}))})),chrome.tabs.onActivated.addListener((async function(){chrome.tabs.query({active:!0,lastFocusedWindow:!0},(function(e){c(e[0].url)}))})),chrome.tabs.onUpdated.addListener((function(e,t,s){c(s.url)})),chrome.tabs.onUpdated.addListener((function(e,t,s){return r(0,0,s)})),chrome.tabs.onActivated.addListener((async function(){chrome.tabs.query({active:!0,lastFocusedWindow:!0},(function(e){r(0,0,e=e[0])}))}))}(),async function(){var e=await chrome.storage.local.get({serpEnabled:"undefined"}),t=await chrome.storage.local.get({notificationEnabled:"undefined"});"undefined"===e.serpEnabled&&await chrome.storage.local.set({serpEnabled:!0}),"undefined"===t.notificationEnabled&&await chrome.storage.local.set({notificationEnabled:!0}),await chrome.storage.local.set({merchantsRevisited:{}})}(),i(),setInterval(i,t.default.DATA_FETCH_INTERVAL)})()})();