// Announce Web Signer presence if requested in meta tags
var metaWebsigner = document.createElement('meta');
metaWebsigner.name = 'websigner';
metaWebsigner.content = 'is installed';
if (document.head !== null) {
    document.head.appendChild(metaWebsigner);
}

// This event is fired and can be caught by scripts that would benefit from knowing if webSigner is loading on the page.
var event = document.createEvent('Event');
event.initEvent('webSignerLoadStart', true, true);
document.dispatchEvent(event);
