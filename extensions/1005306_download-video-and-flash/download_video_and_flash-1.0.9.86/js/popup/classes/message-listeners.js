class FileDataContentLengthUpdatedMessageListener extends MessageListener {
	constructor() {
		super();
	}

	// messageObject = { message, payload }
	onMessage(messageObject = {}, port) {
		try {
			let { message, payload } = messageObject;
			if (!payload) { return; }
			
			let fileData = FileData.parse(payload);
			log(fileData);
			log(message);
			log(messageObject);

			super.onMessage(messageObject, port, fileData);
		} catch(ex) {
			error(ex);
		}
	}
}

class UrlFileDataMessageListener extends MessageListener {
	constructor() {
		super();
	}

	// messageObject = { message, payload }
	onMessage(messageObject = {}, port) {
		try {
			let { message, payload } = messageObject;
			let urlFileData = null;

			if (payload) {
				urlFileData = UrlFileData.parse(payload);
			}

			log(urlFileData);
			log(message);
			log(messageObject);

			super.onMessage(messageObject, port, urlFileData);
		} catch(ex) {
			error(ex);
		}
	}
}