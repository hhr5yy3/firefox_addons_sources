class BackgroundMessageManager {
	constructor() {
		this.backgroundPortManager = new BackgroundPortManager();
		this.contentScriptMessageListenerManager = new MessageListenerManager();;
		this.popupMessageListenerManager = new MessageListenerManager();;
		this.subscribeForContentScriptReadyEvent();
		this.subscribeForPopupReadyEvent();
	}

	get BackgroundPortManager() {
		return this.backgroundPortManager;
	}

	get PopupMessageListenerManager() {
		return this.popupMessageListenerManager;
	}

	get ContentScriptMessageListenerManager() {
		return this.contentScriptMessageListenerManager;
	}

	get Ports() {
		return {
			popup: this.backgroundPortManager.PopupPort,
			tabPorts: this.backgroundPortManager.TabPorts
		};
	}

	// messageObject = { message, payload }
	postMessagePopup(messageObject) {
		try {
			let port = this.backgroundPortManager.PopupPort;
			if (!port) {
				throw new Error("BackgroundMessageManager.postMessagePopup: 'port' is null");
			}

			port.postMessage(messageObject);
		} catch(ex) {
			error(ex);
		}		
	}

	// messageObject = { message, payload }
	postMessageContentScript(tabId, messageObject) {
		try {
			let port = this.backgroundPortManager.getTabPort(tabId);
			if (!port) {
				throw new Error("BackgroundMessageManager.contentScriptPostMessage: 'port' is null");
			}

			port.postMessage(messageObject);
		} catch(ex) {
			error(ex);
		}
	}

	subscribeForContentScriptReadyEvent() {
		this.backgroundPortManager.subscribe({
			topic: EVENTS.BACKGROUND.CONTENT_READY_TO_RECEIVE_MESSAGES,
			callback: this.contentScriptReady.bind(this)
		});
	}

	subscribeForPopupReadyEvent() {
		this.backgroundPortManager.subscribe({
			topic: EVENTS.BACKGROUND.POPUP_READY_TO_RECEIVE_MESSAGES,
			callback: this.popupReady.bind(this)
		});
	}

	contentScriptReady(data) {
		let { port } = data;
		let tabId = port.sender.tab.id;
		this.contentScriptMessageListenerManager.startListening(port);

		this.postMessageContentScript(
			tabId, 
			{ message: CONNECTIONS.BACKGROUND.CONNECTION_CHECK }
		);
		// log(data);
	}

	popupReady(data) {
		let { port } = data;
		this.popupMessageListenerManager.startListening(port);

		this.postMessagePopup(
			{ message: CONNECTIONS.BACKGROUND.CONNECTION_CHECK }
		);		
		log(data);
	}
}

class BackgroundPortManager extends Observer {
	constructor() {
		super();
		this.tabPorts = {};			// content scripts
		this.popupPort = null;		// popup
		this.setConnectionListener();
		this.isPopupReady = false;
	}

	get PopupPort() {
		return this.popupPort;
	}

	get TabPorts() {
		return this.tabPorts;
	}

	get IsPopupReady() {
		return this.isPopupReady;
	}

	getTabPort(tabId) {
		let tabIdKey = this.getTabIdKey(tabId);

		return this.tabPorts[tabIdKey] ? this.tabPorts[tabIdKey] : null;
	}

	addTabPortById(tabId, port) {
		try {
			if (!tabId || !port) {
				throw new Error("BackgroundPortManager.addTabPortById: 'tabId' or 'port' is null");
			}

			let tabIdKey = this.getTabIdKey(tabId);

			if (this.isTabPortExist(tabId)) { return; }
			this.tabPorts[tabIdKey] = port;
		}
		catch(ex) {
			error(ex);
		}
	}

	setPopupPort(port = null) {
		try {
			if (!port) { 
				throw new Error("BackgroundPortManager.setPopupPort: 'port' is null");
			}
			this.popupPort = port;
		} catch(ex) {
			error(ex);
		}		
	}

	isTabPortExist(tabId) {
		let tabIdKey = this.getTabIdKey(tabId);

		return !!this.tabPorts[tabIdKey];
	}

	getTabIdKey(tabId) {
		return "_" + tabId;
	}

	removePopupPort() {
		this.popupPort = null;
	}

	removePortByTabId(tabId) {
		let tabIdKey = this.getTabIdKey(tabId);
		delete this.tabPorts[tabIdKey];
	}	

	setConnectionListener() {
		browser.runtime.onConnect.addListener(this.connectionListener.bind(this));	
	}
	
	tabDisconnectListener(port) {
		// log(port);
		let tabId = port.sender.tab.id;
		log("%c" + `port disconnected, tab id: ${tabId}`, "color: yellow");
		this.removePortByTabId(tabId);
	}

	popupDisconnectListener(port) {
		log(port); log("disconnect popup");
		this.removePopupPort();
		this.isPopupReady = false;
	}

	isExtensionIdValid(extensionId) {
		return extensionId === EXT_SETTINGS.EXTENSION_ID;
	}

	checkContentScriptReady(message, port) {
		if (message === MESSAGES.CONTENT.READY_TO_RECEIVE_MESSAGES) {
			log("%c" + MESSAGES.CONTENT.READY_TO_RECEIVE_MESSAGES, "color: yellow");

			this.notify(
				EVENTS.BACKGROUND.CONTENT_READY_TO_RECEIVE_MESSAGES, 
				{ message, port }
			);
		}
	}

	checkPopupScriptReady(message, port) {
		if (message === MESSAGES.POPUP.READY_TO_RECEIVE_MESSAGES) {
			log("%c" + MESSAGES.POPUP.READY_TO_RECEIVE_MESSAGES, "color: yellow");

			this.isPopupReady = true;

			this.notify(
				EVENTS.BACKGROUND.POPUP_READY_TO_RECEIVE_MESSAGES, 
				{ message, port }
			);
		}
	}

	connectionListener(port) {
		try {
			let { name, sender } = port;
			// log(port);

			if (!this.isExtensionIdValid(sender.extensionId || sender.id)) {
				throw new Error("BackgroundPortManager.connectionListener: connection failed");
			}

			if (name === CONNECTIONS.POPUP.REQUEST_CONNECTION) {
				this.setPopupPort(port);
				port.onMessage.addListener(request => { 
					this.checkPopupScriptReady(request, port); 
				});
				port.onDisconnect.addListener(this.popupDisconnectListener.bind(this));
				return;
			} 

			if (name === CONNECTIONS.CONTENT.REQUEST_CONNECTION) {
				this.addTabPortById(sender.tab.id, port);
				port.onMessage.addListener(request => { 
					this.checkContentScriptReady(request, port); 
				});
				port.onDisconnect.addListener(this.tabDisconnectListener.bind(this));
			}
		} catch(ex) {
			error(ex);
		}
	}
}