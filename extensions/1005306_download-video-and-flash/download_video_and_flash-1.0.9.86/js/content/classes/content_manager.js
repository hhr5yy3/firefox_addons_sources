class ContentMessageManager extends MessageManager {
	constructor() {
		super(new ContentPortConnector());
	}
}

class ContentPortConnector extends PortConnector {
	constructor() {
		super();

		this.setReadyMessage(
			MESSAGES.CONTENT.READY_TO_RECEIVE_MESSAGES
		);

		this.setConnectionMessage(
			CONNECTIONS.CONTENT.REQUEST_CONNECTION
		);
	}
}