const EVENTS = (function() {
	const EVENTS = {};

	const CONTENT_PREFIX = "content@";
	const BACKGROUND_PREFIX = "background@";
	const POPUP_PREFIX = "popup@";

	EVENTS.BACKGROUND = {
		CONTENT_READY_TO_RECEIVE_MESSAGES: 
			`${BACKGROUND_PREFIX}content-ready-to-receive-messages`,
		POPUP_READY_TO_RECEIVE_MESSAGES: 
			`${BACKGROUND_PREFIX}popup-ready-to-receive-messages`,
		SELECTED_URL_FILE_DATA_HAS_BEEN_SET:
			`${BACKGROUND_PREFIX}selected-url-file-data-has-been-set`,
		FILE_DATA_CONTENT_LENGTH_UPDATED:
			`${BACKGROUND_PREFIX}url-file-data-content-length-updated`,
		FIRST_RUN:
			`${BACKGROUND_PREFIX}first_run`,
		FILE_DATA_CREATED:
			`${BACKGROUND_PREFIX}file-data-created`,
		URL_FILE_DATA_CREATED:
			`${BACKGROUND_PREFIX}url-file-data-created`,
		URL_FILE_DATA_CLEARED:
			`${BACKGROUND_PREFIX}url-file-data-cleared`,
		NEW_NAVIGATION: 
			`${BACKGROUND_PREFIX}new-navigation`
	};

	EVENTS.CONTENT = {
		FACEBOOK_NEW_VIDEO_URLS_FOUND:
			`${CONTENT_PREFIX}facebook:new_video_urls_found`,
		FACEBOOK_RAW_DATA_FETCHED: 
			`${CONTENT_PREFIX}facebook:raw_data_fetched`,
		FACEBOOK_PARSED_DATA_READY: 
			`${CONTENT_PREFIX}facebook:parsed_data_ready`
	};

	EVENTS.POPUP = {};

	return EVENTS;
})();