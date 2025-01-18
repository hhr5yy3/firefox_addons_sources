class PopupMessageManager extends MessageManager {
	constructor() {
		super(new PopupPortConnector(false));	// don't automatically notify when ready
	}
}

class PopupPortConnector extends PortConnector {
	constructor(isNotifyWhenReady) {
		super(isNotifyWhenReady);

		this.setReadyMessage(
			MESSAGES.POPUP.READY_TO_RECEIVE_MESSAGES
		);

		this.setConnectionMessage(
			CONNECTIONS.POPUP.REQUEST_CONNECTION
		);
	}
}