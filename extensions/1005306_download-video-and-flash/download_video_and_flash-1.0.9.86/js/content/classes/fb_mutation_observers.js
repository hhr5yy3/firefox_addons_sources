var FacebookAnchorsListMutationObserver = (function() {
	const CONTENT_QUERY = "#content";

	const OBSERVED_ELEMENT_QUERIES = [
		CONTENT_QUERY
	];

	class FacebookAnchorsListMutationObserver extends FacebookMutationObserver {
		constructor() {
			super(OBSERVED_ELEMENT_QUERIES);
		}

		getListToIterateOn() {
			return document.querySelectorAll("a");
		}
	}

	return FacebookAnchorsListMutationObserver;
})();

var FacebookUserContentMutationObserver = (function() {
	const FEED_QUERY = "div[role='feed']";
	const CONTENT_AREA_QUERY = "#contentArea";
	const CONTENT_QUERY = "#content";

	const USER_CONTENT_WRAPPER_CLASS_NAME = "userContentWrapper";

	const OBSERVED_ELEMENT_QUERIES = [
		FEED_QUERY, CONTENT_AREA_QUERY, CONTENT_QUERY
	];

	class FacebookUserContentMutationObserver extends FacebookMutationObserver {
		constructor() {
			super(OBSERVED_ELEMENT_QUERIES);
		}

		getListToIterateOn() {
			return document.getElementsByClassName(USER_CONTENT_WRAPPER_CLASS_NAME);
		}
	}

	return FacebookUserContentMutationObserver;
})();

var FacebookVideosElementMutationObserver = (function() {
	const VIDEOS_QUERY = "#content";
	const OBSERVED_ELEMENT_QUERIES = [VIDEOS_QUERY];

	class FacebookVideosElementMutationObserver extends FacebookMutationObserver {
		constructor() {
			super(OBSERVED_ELEMENT_QUERIES);
		}

		getListToIterateOn() {
			return document.getElementById("videos").querySelectorAll("a");
		}
	}

	return FacebookVideosElementMutationObserver;
})();