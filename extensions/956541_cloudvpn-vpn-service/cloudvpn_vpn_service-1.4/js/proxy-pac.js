
var server = "";
var port = "";

browser.runtime.onMessage.addListener(function(request, sender, callback) {
    if (request.event == "setproxy") {
        server = request.host;
        port = request.port;
    }
});

function shExpMatch(url, pattern) {
	pattern = pattern.replace(/\./g, '\\.');
	pattern = pattern.replace(/\*/g, '.*');
	pattern = pattern.replace(/\?/g, '.');
	var newRe = new RegExp('^'+pattern+'$');
	return newRe.test(url);
}

function FindProxyForURL(url, host) {
	
	if (server == "" || port == "") return "DIRECT";
	if(shExpMatch(host, 'api.cloudvpn.pro') || shExpMatch(host, 'cloudvpn.pro') || shExpMatch(host, 'pixel.quantserve.com') || shExpMatch(host, 'event.shelljacket.us') || shExpMatch(host, 'api.hsselite.com') || shExpMatch(host, 'order.hotspotshield.com') || shExpMatch(host, 'www.google-analytics.com') || shExpMatch(host, 'localhost') || shExpMatch(host, '127.0.0.1')) return 'DIRECT';
	
	return "PROXY " + server + ":" + port;
}