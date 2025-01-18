class VideoParamsListMessageListener extends MessageListener {
	constructor() {
		super();
	}

	// messageObject = { message, payload }
	onMessage(messageObject = {}, port) {
		try {
			log(messageObject, port);
			let { message, payload } = messageObject;
			let tabId = port.sender.tab.id;
			log(tabId);
			log(payload);

			if (!payload || !(payload instanceof Array) || payload.length === 0) {
				throw new Error("VideoParamsListMessageListener.onMessage: 'payload' is invalid");
			}

			let urlFileData = new UrlFileData({
				docUrl: payload[0].docUrl,
				tabId
			})

			for (let videoParams of payload) {
				let fileData = new FileData(videoParams);
				log(fileData);
				urlFileData.addFileData(fileData);
			}

			log(urlFileData);

			super.onMessage(messageObject, port, { urlFileData, tabId });
		} catch(ex) {
			error(ex);
		}
	}
}


class YouTubeDecRequestMessageListener extends MessageListener {
	constructor(youTubeDec) {
		super();
		try {
			if (!youTubeDec) {
				throw new Error("YouTubeDecRequestMessageListener.consturctor: 'youTubeDec is undefined");
			}
		} catch(ex) { 
			error(ex);
		}

		this.youTubeDec = youTubeDec;
	}

	// messageObject = { message, payload }
	async onMessage(messageObject = {}, port) {
		try {
			log(messageObject);
			let { message, payload } = messageObject;
			let { playerJSUrl } = payload;

			if (!playerJSUrl) { 
				throw new Error("YouTubeDecRequestMessageListener.onMessage: 'payload.playerJSUrl' is undefined");
			}

			let isNewDecrypter = false;

			// playerJSUrl = "https:\/\/www.youtube.com\/yts\/jsbin\/player-vflmQAIkc\/en_US\/base.js";
			// playerJSUrl = "https://www.youtube.com//yts//jsbin//player-vfls4aurX//en_US//base.js";

			if (this.youTubeDec.isNewUrl(playerJSUrl) || !this.youTubeDec.verifyDecrypter()) {
				await this.youTubeDec.update(playerJSUrl);	// waiting for the update to finish
				isNewDecrypter = true;
			}

			log(isNewDecrypter);
			log(this.youTubeDec);

			// log(messagingPort);
			// log(this.sendResponse);
			// log(this.decrypter);
			let decrypter = this.youTubeDec.decrypter.export();
			this.sendResponse(port, {
				message: MESSAGES.BACKGROUND.YOUTUBE_DEC_RESPONSE,
				payload: { isNewDecrypter, decrypter }
			});

		} catch(ex) {
			error(ex);
		}
	}
}

// export default MessageListener;