class ConnectionCheckMessageListener extends MessageListener {
	constructor() {
		super();
	}

	// messageObject = { message, payload }
	onMessage(messageObject = {}, port) {
		try {
			// log(port);
			// log(messageObject);

			let message = messageObject.message;
			let logMessage = this.generateLog(message, port);

			log("%c" + logMessage, 'color: yellow');
			super.onMessage(messageObject, port, logMessage);

			// this.sendResponse(
			// 	port, 
			// 	{ message: CONNECTIONS.BACKGROUND.CONNECTION_CONFIRMED }
			// );
		} catch(ex) {
			error(ex);
		}
	}

	generateLog(message, port) {
		try {
			if (this.isContentScript(message)) {
				let tabId = port.sender.tab.id;
				return `${CONNECTIONS.CONTENT.CONNECTION_CONFIRMED}, tab id: ${tabId}`;
			} else if (this.isPopup(message)) {
				return `${CONNECTIONS.POPUP.CONNECTION_CONFIRMED}`;
			} else if (this.isBackground(message)) {
				return `${CONNECTIONS.BACKGROUND.CONNECTION_CONFIRMED}`;
			}

			throw new Error("ConnectionCheckMessageListener.generateLog: unknown connection");
		} catch(ex) {
			error(ex);
		}
	}

	isContentScript(message) {
		return message === CONNECTIONS.CONTENT.CONNECTION_CHECK;
	}

	isBackground(message) {
		return message === CONNECTIONS.BACKGROUND.CONNECTION_CHECK;
	}

	isPopup(message) {
		return message === CONNECTIONS.POPUP.CONNECTION_CHECK;
	}
}