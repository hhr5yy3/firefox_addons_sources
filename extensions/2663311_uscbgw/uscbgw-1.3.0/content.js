document.documentElement.setAttribute('uscbg-extension-installed', true);

browser.runtime.sendMessage({newtab: "newtab"});

browser.runtime.onMessage.addListener(request => {
    if(request === "newtab")
  		return;
  		
  	// Nachricht an PS "senden"
  	var eventDetail = cloneInto({detail: request}, document.defaultView);
  	var myEvent = new document.defaultView.CustomEvent("response", eventDetail);
  	document.dispatchEvent(myEvent);
});

// Nachrichten von PS
window.addEventListener("message", event => {
    // We only accept messages from ourselves
    if (event.source != window)
        return;

	if(event.data.type)
        browser.runtime.sendMessage(event.data);
});
