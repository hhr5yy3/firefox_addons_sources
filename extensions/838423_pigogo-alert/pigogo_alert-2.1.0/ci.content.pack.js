
window['AddonsFramework'] = function() {
	var self = this;

	self['browser'] = new self['Browser']();
	self['extension'] = new self['Extension']();
};

/**
 * Browser content class
 * @constructor
 */

window['AddonsFramework'].prototype['Browser'] = function() {
	var self = this,
		fnCallbacks = {};
		
	function navigate(param) {
		chrome.runtime.sendMessage(extend({
			'action': 'ci_browser_navigate'
		}, param));
	};
	
	function attachEvent(name, fnCallback) {
		if (!fnCallbacks[name]) {
			fnCallbacks[name] = [];
		}
		fnCallbacks[name].push(fnCallback);
	};
	
	function fireEvent(name, event) {
		if (fnCallbacks[name]) {
			for (var i = 0; i < fnCallbacks[name].length; i++) {
				fnCallbacks[name][i](event);
			}
		}
	};
	
	self['attachEvent'] = attachEvent;
	self['fireEvent']   = fireEvent;
	self['navigate']    = navigate;
	
	self['NEWTAB']           = -1;
	self['CURRENTTAB']       = -2;
	self['NEWWINDOW']        = -3;
	self['ALLTABS']          = -4;
	self['TABCLOSED']        = -5;
	self['DOCUMENTCOMPLETE'] = 'DocumentComplete';
	self['BEFORENAVIGATE']   = 'BeforeNavigate';
	self['DNSERROR']         = 'DNSError';
	self['TABCHANGED']       = 'TabChanged';

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
		self['name'] = 'chromium';
		self['version'] = 'unknown';
	}
	
	function extend(target, object) {
		for (var x in object) {
			target[x] = object[x];
		}
		return target;
	}
	chrome.runtime.onMessage.addListener(function (request, sender, callback) {
		if (request['action'] == 'event') {
			fireEvent(request['name'], request['data']);
		}
	});
	var data = {
		'name': self['BEFORENAVIGATE'],
		'url':  document.location.href
	};
}

/**
 * Chrome framework
 * Extension content class
 * @constructor
 */

window['AddonsFramework'].prototype['Extension'] = function() {
	var self = this;
	var fnCallbacks = {};
		
	function attachEvent(name, fnCallback) {
		if (!fnCallbacks[name]) {
			fnCallbacks[name] = [];
		}
		fnCallbacks[name].push(fnCallback);
	}

	function detachEvent(name, fnCallback) {
		if (fnCallbacks[name]) {
			for (var i = 0; i < fnCallbacks[name].length; i++) {
				if (fnCallback && fnCallback === fnCallbacks[name][i]) {
					delete fnCallbacks[name][i];
					fnCallbacks[name][i] = null;
					fnCallbacks[name].splice(i, 1);
				}
			}
		}
	}
	
	function fireEvent(name, data, callback) {
		if (!callback) {
			chrome.runtime.sendMessage({
				'action': 'event', 
				'name': name,
				'data': data
			});
		} else {
			chrome.runtime.sendMessage({
				'action': 'event', 
				'name': name,
				'data': data
			}, callback);
		}

		if (fnCallbacks[name]) {
			for (var i = 0; i < fnCallbacks[name].length; i++) {
				fnCallbacks[name][i].call(self, data, callback);
			}
		}
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
		console.log.apply(console, arguments);
	}

	this['fireEvent']	= fireEvent;
	this['attachEvent']	= attachEvent;
	this['detachEvent']	= detachEvent;
	this['log'] 		= log;
	this['setItem'] 	= setItem;
	this['getItem'] 	= getItem;
	
	chrome.runtime.onMessage.addListener(function (request, sender, callback) {
		if (request['action'] == 'event') {
			var name = request['name'];
			var param = {
				data: request['data']['data']
			};
			if (fnCallbacks[name]) {
				for (var i = 0; i < fnCallbacks[name].length; i++) {
					if (fnCallbacks[name][i]) {
						fnCallbacks[name][i].call(self, param, callback);
					}
				}
			}
		}
	});
}

window['framework'] = new AddonsFramework();
