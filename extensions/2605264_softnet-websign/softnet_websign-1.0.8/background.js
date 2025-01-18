/**
 * Listens to the content (content.js), takes its data, passes it 
 * to the native app and afterwards returns response data to the 
 * content. 
 */
browser.runtime.onMessage.addListener( (msg, sender, sendResponse) => {
	// As it is registered in registry
	const host_name = 'pl.com.softnet.signnet';

	// Send message to native application.
	browser.runtime.sendNativeMessage(host_name, msg, response => {
		browser.tabs.query({active: true, currentWindow: true}, tabs => {
			// Send data to the content.
			browser.tabs.sendMessage(tabs[0].id, response, null);
		});
	});
});

