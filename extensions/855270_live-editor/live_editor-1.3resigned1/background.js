
function openMyPage() {
	console.log("Listening");	
	browser.tabs.create({
		url: "/index.html"
	});
	browser.tabs.executeScript({
	  file: "/index.js",
	  allFrames: true
	});
}

browser.browserAction.onClicked.addListener(openMyPage);

