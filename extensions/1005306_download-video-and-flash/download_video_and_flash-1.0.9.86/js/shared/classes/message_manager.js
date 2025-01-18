class MessageManager {
	constructor(portConnector) {
		this.portConnector = portConnector;
		this.messageListenerManager = new MessageListenerManager();

		this.portConnector.connect();
		this.messageListenerManager.startListening(this.portConnector.Port);
	}

	get MessageListenerManager() {
		return this.messageListenerManager;
	}

	postMessage(messageObject) {
		this.portConnector.Port.postMessage(messageObject);
	}
}

class MessageListener {
	constructor() {
		this.deferreds = [];
		this.callback = function callback() {};
	}

	// messageObject = { message, payload }
	onMessage(messageObject, port, value) {
		this.resolveDeferreds(value);
		this.callback(value);
	}

	setCallback(callback) {
		try {
			if (typeof callback !== "function") { 
				throw new Error("MessageListener.setCallback: 'callback' is not a function");
			}

			this.callback = callback;
		} catch(ex) {
			error(ex);
		}
	}

	// messageObject = { message, payload }
	sendResponse(port, messageObject) {
		try {
			// log(messageObject);
			if (!port) { 
				throw new Error("MessageListener.sendResponse: 'port' is undefined");
			}
			if (!messageObject || !messageObject.message) {
				throw new Error(
					"MessageListener.sendResponse: 'messageObject' or 'messageObject.message' is undefined"
				);
			}

			port.postMessage(messageObject);
		} catch(ex) { 
			error(ex);
		}
	}

	getDeferred() {
		let deferred = new Deferred();
		this.deferreds.push(deferred);

		return deferred;
	}

	resolveDeferreds(value) {
		for (let deferred of this.deferreds) {
			deferred.resolve(value);
		}

		this.initDeferreds();
	}

	initDeferreds() {
		this.deferreds = [];
	}
}

class MessageListenerManager {
	constructor() {
		this.messageListeners = {};
	}

	addMessageListener(message, messageListener) {
		this.messageListeners[message] = messageListener;
	}

	setMessageListeners(messageListeners) {
		this.messageListeners = messageListeners;
	}

	startListening(port) {
		port.onMessage.addListener(this.onMessageReceived.bind(this));
	}

	// messageObject = { message, payload }
	onMessageReceived(messageObject, port) {
		try {
			log("message received: " + messageObject.message);
			// log(port);
			// log(messageObject);

			let { message, payload = {} } = messageObject;
			messageObject.payload = payload;	// will default to empty object if a 'null' payload was handed over

			if (!message) {
				throw new Error("MessageListenerManager.onMessageReceived: 'message' is undefined");
			}

			if (!this.messageListeners[message]) {
				throw new Error(`MessageListenerManager.onMessageReceived: message is not found: '${message}'`);
			}

			// payload.message = message;	// add message to payload in case it needs to be referenced
			this.messageListeners[message].onMessage(messageObject, port);			
		} catch(ex) {
			error(ex);
		}
	}
}