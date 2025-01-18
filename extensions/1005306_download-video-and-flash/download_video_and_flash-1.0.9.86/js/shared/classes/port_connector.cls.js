class PortConnector {
	constructor(isNotifyWhenReady = true) {
		this.isNotifyWhenReady = isNotifyWhenReady;
		this.port = null;
		this.readyMessage = null;
		this.connectionMessage = null;
	}

	get Port() {
		return this.port;
	}

	setReadyMessage(readyMessage) {
		this.readyMessage = readyMessage;
	}

	setConnectionMessage(connectionMessage) {
		this.connectionMessage = connectionMessage;
	}

	notifyPortIsReady() {
		try {
			if (!this.readyMessage) {
				throw new Error("PortConnector.notifyPortIsReady: 'this.readyMessage' is null");
			}

			this.port.postMessage(this.readyMessage);
		} catch(ex) {
			error(ex);
		}
	}

	connect() {
		this.port = this.connectPort();
		
		if (this.isNotifyWhenReady) {
			this.notifyPortIsReady();
		}

		// this.port.onMessage.addListener(log);
		// setTimeout(()=>{
		// 	this.port.postMessage({message: "test!", payload: {}});
		// }, 3000);
	}

	connectPort() {
		try {
			if (!this.connectionMessage) {
				throw new Error("PortConnector.connectPort: 'this.connectionMessage' is null");
			}

			return browser.runtime.connect(
				EXT_SETTINGS.EXTENSION_ID, { 
					name: this.connectionMessage
				}
			);
		} catch(ex) {
			error(ex);
		}
	}
}