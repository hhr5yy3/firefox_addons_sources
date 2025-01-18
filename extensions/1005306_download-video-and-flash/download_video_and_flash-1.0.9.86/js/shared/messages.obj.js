const MESSAGES = (function() {
	const MESSAGES = {};

	const CONTENT_PREFIX = "content@";					// the sender
	const BACKGROUND_PREFIX = "background@";			// the sender
	const POPUP_PREFIX = "popup@";						// the sender

	MESSAGES.BACKGROUND = {
		TAB_UPDATED: `${BACKGROUND_PREFIX}tab-updated`,
		YOUTUBE_DEC_RESPONSE: `${BACKGROUND_PREFIX}youtube-dec-response`,
		URL_FILE_DATA: `${BACKGROUND_PREFIX}url-file-data`,
		FILE_DATA_CONTENT_LENGTH_UPDATED: `${BACKGROUND_PREFIX}file-data-content-length-updated`
	};

	MESSAGES.CONTENT = {
		READY_TO_RECEIVE_MESSAGES: `${CONTENT_PREFIX}ready-to-receive-messages`,
		YOUTUBE_VIDEO_DATA_LIST: `${CONTENT_PREFIX}youtube-video-data-list`,
		YOUTUBE_DEC_REQUEST: `${CONTENT_PREFIX}youtube-dec-request`,
		DAILYMOTION_VIDEO_DATA_LIST: `${CONTENT_PREFIX}dailymotion-video-data-list`,
		VIMEO_VIDEO_DATA_LIST: `${CONTENT_PREFIX}vimeo-video-data-list`,
		FACEBOOK_VIDEO_DATA_LIST: `${CONTENT_PREFIX}facebook-video-data-list`
	};

	MESSAGES.POPUP = {
		READY_TO_RECEIVE_MESSAGES: `${POPUP_PREFIX}ready-to-receive-messages`
	};

	return MESSAGES;
})();