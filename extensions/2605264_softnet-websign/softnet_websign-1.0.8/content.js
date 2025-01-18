/**
 * Send message event listener
 * 
 * Client dispatches 'send-message-event' event with data object. 
 * Then the data object is sent to background script.
 */
window.addEventListener("send-message-event", data => {
	const request = data.detail.data;
	// Send message to the background script
	browser.runtime.sendMessage(request);
});
/**
 * Listens to the background script and dispatches 'get-message-event' 
 * to the client when the data is received.
 */
browser.runtime.onMessage.addListener( (response, sender, sendResponse) => {
	// Send response to the front page
	// Clone response to avoid problem with restrictions
	const clonedDetail = cloneInto(response, document.defaultView);
	if(!!clonedDetail){
		const event = new CustomEvent('get-message-event', {
			detail: clonedDetail,
			bubbles: true,
			cancelable: true });
		document.dispatchEvent(event);
	}
});
