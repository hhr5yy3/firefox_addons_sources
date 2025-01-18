"use strict";

var attributeName = "data-dav0";

var pendingName = attributeName + "-pending";
var errorName = attributeName + "-error";
var versionName = attributeName + "-version";

document.documentElement.setAttribute(pendingName, "");
var request = {	type : 'schema'};
chrome.runtime.sendMessage(request, function (data) {
	if (data.error) {
		document.documentElement.setAttribute(errorName, data.error);
		document.documentElement.removeAttribute(pendingName);
		return;
	}
	
	if(data.protocols){
		//Remove initial protocol attributes
		document.documentElement.removeAttribute(attributeName);
		document.documentElement.removeAttribute(versionName);
		document.documentElement.removeAttribute(pendingName);	

		let jsonData = JSON.parse(data.protocols);
		for (var i = 0; i < jsonData.length; i++) {
			if(jsonData[i].protocol){
				attributeName = "data-" + jsonData[i].protocol;
				versionName = attributeName + "-version";
				document.documentElement.setAttribute(versionName, jsonData[i].version);
				document.documentElement.setAttribute(attributeName, data.supportedSchemes);
			}
		}
	}
});

// add event listener to get event when user requests open uri
window.addEventListener("OpenUriUsingFirefoxExtension_Request", function (evt) {
    let detail = evt.detail;
    detail.type = 'cookie';
	detail.taburl = location.href;
    chrome.runtime.sendMessage(detail, function (cookiesUrl) {
        if (cookiesUrl.error) {
            console.log("Error in getCookies: " + cookiesUrl.error);
            alert(cookiesUrl.error);
            detail.error = true;
        }else{
            location.href = cookiesUrl;
        }
    });
}, false);


window.addEventListener("CallOpenerExtension_Request", function (evt) {
    chrome.runtime.sendMessage(evt.detail, function (data) {});
}, false);

function hashCode(str) {
	var hash = 0;
	for (var i = 0; i < str.length; i++) {
		var character = str.charCodeAt(i);
		hash = ((hash << 5) - hash) + character;
		hash = hash & hash;
	}
	return hash;
}