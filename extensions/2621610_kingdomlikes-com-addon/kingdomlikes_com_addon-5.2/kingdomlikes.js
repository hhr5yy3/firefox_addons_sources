var checker;
var result;

"use strict";
function handleResponse(message) {
  }
  
  function handleError(error) {
}

browser.runtime.onMessage.addListener(request => {
	result = request.data;
	checker = request.check;
	
	if (checker.toString() == "true") {
		executeInPage(finalCheck, false, '', result, "true");
	}
});

var sending = browser.runtime.sendMessage({
    greeting: "Greeting from the content script"
  });
sending.then(handleResponse, handleError); 

function finalCheck(paramFin, paramOn) {
	la(paramFin, paramOn);
}

function docReady(fn) {

    if (document.readyState === "complete" || document.readyState === "interactive") {
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
} 

docReady(function () {
	var mfversion = "5.2";
	if (typeof document.getElementById("add-on-info") !== "undefined" && document.getElementById("add-on-info") !== null) {
		document.getElementById("add-on-info").innerHTML = mfversion;
		executeInPage(finalCheck, false, '', false, "true");
	}
	//LISTO
	if (window.location.href.toLowerCase().includes("facebook-likes")) {
		sendMessage("fbpage");
	}
	//LISTO
	if (window.location.href.toLowerCase().includes("facebook-post-likes")) {
		sendMessage("fblike");
	}
	//LISTO
	if (window.location.href.toLowerCase().includes("twitter-likes")) {
		sendMessage("twlike");
	}
	//LISTO
	if (window.location.href.toLowerCase().includes("twitter-re-tweets")) {
		sendMessage("twret");
	}
	//LISTO
	if (window.location.href.toLowerCase().includes("twitter-followers")) {
		sendMessage("twfol");
	}
	//LISTO
	if (window.location.href.toLowerCase().includes("instagram-followers")) {
		sendMessage("insfol");
	}
	//LISTO 
	if (window.location.href.toLowerCase().includes("instagram-likes")) {
		sendMessage("inslike");
	}
	if (window.location.href.toLowerCase().includes("youtube-likes")) {
		sendMessage("ytlikes");
	}
	if (window.location.href.toLowerCase().includes("youtube-dis-likes")) {
		sendMessage("ytdislikes");
	}
	if (window.location.href.toLowerCase().includes("tiktok-likes")) {
		sendMessage("tiktk");
	}
	if (window.location.href.toLowerCase().includes("tiktok-followers")) {
		sendMessage("tiktk2");
	}
});

function sendMessage(featureName,reset) {
	var sending = browser.runtime.sendMessage({
		feature: featureName,
		check: "false"
	});
	sending.then(handleResponse, handleError);
}