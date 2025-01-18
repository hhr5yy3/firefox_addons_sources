let url    = decodeURIComponent(window.location.search.replace('?url=', ''));
let iframe = document.createElement('iframe');
iframe.src = url;
document.body.appendChild(iframe);