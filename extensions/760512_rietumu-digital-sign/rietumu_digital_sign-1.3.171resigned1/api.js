var Rietumu = new function() {
	var callMap = {}, types = {
		REQUEST: "request",
		RESPONSE: "response"
	}, processTypes = {
		ERROR: "error",
		RESULT: "result"
	}, idCounter = 0;
	/**
	 * Sends message to background communicator
	 * @param data
	 * @param id
	 * @returns {Promise}
	 */
	var sendMessage = function(data, id) {
		idCounter++;
		var msg = {
			requestid: idCounter,
			type: types.REQUEST,
			event: id,
			data: data
		};
		return new Promise(createMessageProcessor(idCounter, msg));
	};
	/**
	 * Returns callback promise register method
	 * @param    {Number}    id     id of the request
	 * @param    {Object}    msg    message object that will be send to plugin
	 * @returns {Function}
	 */
	var createMessageProcessor = function(id, msg) {
		return function(resolve, reject) {
			registerCallbacks(id, resolve, reject);
			window.postMessage(msg, "*");
		};
	};
	/**
	 * Registers callbacks
	 * @param    {Number}      id         id of the request
	 * @param    {Function}    success    callback that will be called on success
	 * @param    {Function}    failure    callback that will be called on failure
	 */
	var registerCallbacks = function(id, success, failure) {
		id = id ? id : ++idCounter;
		callMap[id] = {
			success: success,
			failure: failure,
			id: id
		};
	}
	;/**
	 * Process async response from plugin
	 * @param    {Object}    response    response from plugin
	 */
	var processResponse = function(response) {
		if (isHandlersRegistered(response.requestid)) {
			var callback = callMap[response.requestid];
			if (processTypes.ERROR == response.process) {
				callback.failure(response.error);
			}
			else if (processTypes.RESULT == response.process) {
				callback.success(response.data);
			}
			clearHandlers(response.requestid);
		}
	};
	/**
	 * Checks if handlers for such request id are registered
	 * @param    {Number}    id    index of stored handlers
	 * @returns {boolean}
	 */
	var isHandlersRegistered = function(id) {
		var registered = false;
		if (id) {
			registered = !!callMap[id];
		}
		return registered;
	};
	/**
	 * Clears request handlers
	 * @param    {Number}    id    id of the request
	 */
	var clearHandlers = function(id) {
		callMap[id] = null;
		delete callMap[id];
	};
	/**
	 * Generates canonical signed xml and returns it with signer info
	 * @param xml
	 * @param data
	 * @returns {{xml: *, signer: *}}
	 */
	var createCanonicalXml = function(xml, data) {
		return {
			xml: XMLDSig.sign(
				xml,
				data['Signature'],
				data['Certificate'],
				(data['Key'] && data['Key']['Modulus']),
				(data['Key'] && data['Key']['Exponent'])
			),
			signer: data['Signer']
		}
	};
	/**
	 * Starts sign process
	 * @param certificate
	 * @param xml
	 * @returns {Promise}
	 */
	this.sign = function(certificate, xml) {
		return new Promise(function(resolve, reject) {
			sendMessage(
				{
					type: 'SIGN',
					certificate: certificate,
					hash: XMLDSig.hash(xml)
				}, 'sign')
				.then(function(response) {
					resolve(createCanonicalXml(xml, response))
				})
				.catch(function(error) {
					reject(error)
				})
		});
	};
	/**
	 * Reads certificates
	 * @returns {Promise}
	 */
	this.certificates = function() {
		return sendMessage({type: 'CERTIFICATES'}, 'certificates')
	};
	/**
	 * Gets version info
	 * @returns {Promise}
	 */
	this.version = function() {
		return sendMessage({type: 'VERSION'}, 'version')
	};
	window.addEventListener("message", function(event) {
		if (event.source == window) {
			if (event.data && event.data.event && event.data.type == types.RESPONSE) {//Check that this is answer from plugin
				if (event.data && event.data.requestid) {
					processResponse(event.data);
				}
			}
		}
	}, false);
}();