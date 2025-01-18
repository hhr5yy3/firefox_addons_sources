window['AddonsFramework'] = function(_settings) {
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
