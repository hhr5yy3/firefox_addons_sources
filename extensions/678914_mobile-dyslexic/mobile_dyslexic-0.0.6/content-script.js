function appendCss() {
	var id = browser.runtime.id;
	var css = browser.extension.getURL("css/mobiledyslexic.css");
	if (!document.getElementById(id)) {
		var link = document.createElement("link");
		link.id = id;
		link.type = "text/css";
		link.rel = "stylesheet";
		link.href = css;
		document.documentElement.appendChild(link);
	}
}

function removeCss() {
	var id = browser.runtime.id;
	var link = document.getElementById(id);
	if (link) link.parentNode.removeChild(link);
}

function onStorageResponse(response) {
	if (response.disabled) removeCss();
	else appendCss();
}

function onStorageChanged(response) {
	if (response.disabled.newValue) removeCss();
	else appendCss();
}

(function() {
	browser.storage.local.get().then(onStorageResponse);	
	browser.storage.onChanged.addListener(onStorageChanged);
})();
