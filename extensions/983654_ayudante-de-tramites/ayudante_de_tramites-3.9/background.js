var filter = {
    "urls": ["*://certificacioninternacional.mijp.gob.ve/*", "*://citas.saren.gob.ve/*", "*://www.citavirtual.mppeu.gob.ve/*", "*://legalizacionve.mppre.gob.ve/*"]
};
var filter2 = {
    "urls": ["*://tramites.saime.gob.ve/index.php?r=site/*", "*://tramites.saime.gob.ve/index.php?r=usuario/*", "*://tramites.saime.gob.ve/index.php?r=comun/*", "*://tramites.saime.gob.ve/index.php?r=verificacion/*", "*://tramites.saime.gob.ve/index.php?r=tramite/*", "*://tramites.saime.gob.ve/index.php?r=inicio/*", "*://tramites.saime.gob.ve/index.php?r=consular/*", "*://tramites.saime.gob.ve/index.php?r=pago/pago/formpago*"]
};
var isExtensionOn = true;
var ultimapag;
var ultimareq;
var ultimoip;

function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

browser.webRequest.onBeforeRequest.addListener((details) => {
	console.log(details);
	ultimapag = details.url;
	ultimareq = details.method;
    reqMethod = details.method;
    if ((reqMethod != "GET") && details.requestBody && isExtensionOn == true) {
        formData = clone(details.requestBody.formData);
    } else {
        formData = null;
    }
},
    { urls: ["*://tramites.saime.gob.ve/*", "*://certificacioninternacional.mijp.gob.ve/*", "*://citas.saren.gob.ve/*", "*://www.citavirtual.mppeu.gob.ve/*", "*://legalizacionve.mppre.gob.ve/*"], types: ["main_frame"] },
    ["requestBody"]
);

browser.webRequest.onCompleted.addListener(function(details) {
    console.log(details);
    if (details.statusCode == 500 || details.statusCode == 502 || details.statusCode == 504 || details.statusCode == 404 || details.statusCode == 408 || details.statusCode == 400 || details.statusCode == 503) {
		if (details.type == "main_frame" && isExtensionOn == true) {
			if (details.tabId != -1) {
				setTimeout(function() {
					if (reqMethod != "GET") {
						let msg = {
                event: "reload-post",
                postData: formData
            };
            return browser.tabs.sendMessage(details.tabId, msg);
					}
				browser.tabs.reload(details.tabId);
				}, 1000);
			}
		}	
    }
	if (details.statusCode == 200 && details.type == "main_frame" && isExtensionOn == true) {
		var myAudio = new Audio();
		myAudio.src = "/alarm.mp3";
		myAudio.play();
		ultimoip = details.ip;
	}
}, filter);

browser.webRequest.onErrorOccurred.addListener(function(details) {
	console.log(details);
	if (details.type == "main_frame" && isExtensionOn == true && details.error != "net::ERR_ABORTED" && details.error != "NS_BINDING_ABORTED") {
		if (details.tabId != -1) {
			if (ultimareq == "GET" && ultimapag == details.url) {
				setTimeout(function() {
					browser.tabs.reload(details.tabId);
				}, 2000);
			}
			if (details.type == "main_frame" && isExtensionOn == true && (ultimareq != "GET" || ultimapag != details.url)) {
				var myAudio = new Audio();
				myAudio.src = "/erro.mp3";
				myAudio.play();
			}
		}
	}
}, filter);

browser.webRequest.onCompleted.addListener(function(details) {
    console.log(details);
    if (details.statusCode == 502 || details.statusCode == 504 || details.statusCode == 404 || details.statusCode == 408 || details.statusCode == 400 || details.statusCode == 503) {
		if (details.type == "main_frame" && isExtensionOn == true) {
			if (details.tabId != -1) {
				setTimeout(function() {
					if (reqMethod != "GET") {
						let msg = {
                event: "reload-post",
                postData: formData
            };
            return browser.tabs.sendMessage(details.tabId, msg);
					}
				browser.tabs.reload(details.tabId);
				}, 1000);
			}
		}	
    }
	if (details.statusCode == 200 && details.type == "main_frame" && isExtensionOn == true) {
		var myAudio = new Audio();
		myAudio.src = "/alarm.mp3";
		myAudio.play();
		ultimoip = details.ip;
	}
}, filter2);

browser.webRequest.onErrorOccurred.addListener(function(details) {
	console.log(details);
	if (details.type == "main_frame" && isExtensionOn == true && details.error != "net::ERR_ABORTED" && details.error != "NS_BINDING_ABORTED") {
		if (details.tabId != -1) {
			if (ultimareq == "GET" && ultimapag == details.url) {
				setTimeout(function() {
					browser.tabs.reload(details.tabId);
				}, 2000);
			}
			if (details.type == "main_frame" && isExtensionOn == true && (ultimareq != "GET" || ultimapag != details.url)) {
				var myAudio = new Audio();
				myAudio.src = "/erro.mp3";
				myAudio.play();
			}
		}
	}
}, filter2);

async function sendContentTabId(tabId) {
    let msg = {
        event: "set-tab-id",
        tabId: tabId
    }
    return browser.tabs.sendMessage(details.tabId, msg)
}