var debug = false;
function d_log(str) {
	debug && console.log(str);
}

var Events = (function () {
	var callbacks = [];
	var eventsCollector = [];
	var eventsListeners = {};
	var eventCounter = 1;

	chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
		var type = request.type;
		for (var i = 0; i < callbacks.length; ++i) {
			if (type == callbacks[i].type) {
				var tab_id = -1;
				if (location.protocol == 'moz-extension:') {
					tab_id = sender.tab.id;
				}
				callbacks[i].func(type, request.data, 0, tab_id);
			}
		}
	});

	function _sendMessage(type, data, tab_id) {
		if (tab_id) {
			chrome.tabs.sendMessage(tab_id, {
				"type": type,
				"data": data
			});
		} else {
			chrome.runtime.sendMessage({
				"type": type,
				"data": data
			});
		}
	}

	function _addListener(type, cb) {
		if (typeof type == "string" && typeof cb == "function") {
			callbacks.push({
				"type": type,
				"func": cb
			});
		}
	}
    
	function ABMessageEvent(type, data, source, target, originalId) {
		var self = this;
		self.type = type;
		self.data = data;
		self.source = source;
		self.target = target;
		self.oid = originalId;
		self.nid = null;
	}

	ABMessageEvent.prototype.reply = function (data, handler) {
		var eventId = eventCounter++;
		eventsCollector[eventId] = handler || false;

		var self = this;
		self.nid = eventId;

		_sendMessage("internalEvent", {
			t: self.type,
			d: data,
			o: self.oid,
			n: self.nid
		}, self.source);
	};

	function _dispatchEvent(type, data, target, handler) {
		if (typeof target === "number") {
			var event = new ABMessageEvent(type, null, target, target);
			event.reply(data, handler);
		}
	}

	function _addEventListener(type, handler) {
		eventsListeners[type] = handler;
	}

	_addListener("internalEvent", function (type, data, destination, source) {
		var handler = false;
		if (data.o) {
			handler = eventsCollector[data.o];
			eventsCollector[data.o] = null;
		} else {
			handler = eventsListeners[data.t];
		}

		if (handler) {
			try {
				handler(new ABMessageEvent(data.t, data.d, source, destination, data.n));
			} catch (e) {
				//TODO: think about
			}
		}
	});

	return {
		sendMessage: _sendMessage,
		addListener: _addListener,
		dispatchEvent: _dispatchEvent,
		addEventListener: _addEventListener
	};
})();