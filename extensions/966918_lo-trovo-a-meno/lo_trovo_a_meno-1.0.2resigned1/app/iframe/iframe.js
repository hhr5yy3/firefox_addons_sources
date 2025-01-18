// Load the passed URL into an iframe.
// This gets around restrictive CSP headers.
var url    = decodeURIComponent(window.location.search.replace('?url=', ''));
var iframe = document.createElement('iframe');
iframe.src = url;
document.body.appendChild(iframe);