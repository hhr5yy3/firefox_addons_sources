const CONNECTIONS = (function() {
	const CONNECTIONS = {};

	const CONTENT_PREFIX = "content@";				// the sender
	const POPUP_PREFIX = "popup@";					// the sender
	const BACKGROUND_PREFIX = "background@";		// the sender

	CONNECTIONS.BACKGROUND = {
		CONNECTION_CONFIRMED: `${BACKGROUND_PREFIX}connection-confirmed`,
		CONNECTION_CHECK: `${BACKGROUND_PREFIX}connection-check`
	};

	CONNECTIONS.CONTENT = {
		REQUEST_CONNECTION: `${CONTENT_PREFIX}request-connection`,
		CONNECTION_CHECK: `${CONTENT_PREFIX}connection-check`,
		CONNECTION_CONFIRMED: `${CONTENT_PREFIX}connection-confirmed`
	};

	CONNECTIONS.POPUP = {
		REQUEST_CONNECTION: `${POPUP_PREFIX}request-connection`,
		CONNECTION_CHECK: `${POPUP_PREFIX}connection-check`,
		CONNECTION_CONFIRMED: `${POPUP_PREFIX}connection-confirmed`
	};

	return CONNECTIONS;
})();