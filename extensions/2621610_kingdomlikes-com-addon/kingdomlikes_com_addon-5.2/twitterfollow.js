var aTags;
var found;
var obj = {};
var stop = 0;
var buttonLike;
var foundElem = false;
var globCounter = 0;
var markedQuest;
var result = 'true';
var checker = false;
var checkFlexy = "";
var foundFlexy = "";
var videoID = "";
var brojac = 0;
var feature;

"use strict";
function handleResponse(message) {
	//console.log(`Message from the background script:  ${message.response}`);
  }
  
  function handleError(error) {
	//console.log(`Error: ${error}`);
}

window.onbeforeunload = function () {
	if ((typeof videoID !== "undefined") && (videoID !== null)) {
		//if (window.location.href.toLowerCase().includes(videoID.toLowerCase())) {
			setTimeout(function () {
				window.close();
			}, 500);
		//}
	}
}

browser.runtime.onMessage.addListener(request => {
	videoID = request.videoID;
	check = request.check;
	feature = request.feature;
	/*var n = videoID.indexOf("12a25b49c57g");
	if (n > 0) {
		videoID = videoID.substring(n + 12);
	}*/
	if (check.toString() == "true") {
		setTimeout(function () {
			check = "false";
			window.close();
		}, 500);
	}

	if ((typeof feature !== "undefined") && (feature !== null) && feature == "twfol") {
		setTimeout(function () {
			findLikeButtonFol();
		}, 500);
	}
});

var sending = browser.runtime.sendMessage({
    greeting: "Greeting from the content script"
  });
sending.then(handleResponse, handleError); 
  
function findLikeButtonFol() {
	stop = 0;
	var statusf = true;
	if ((typeof videoID !== "undefined") && (videoID !== null)) {
		if (window.location.href.toLowerCase().includes("/status/")) statusf = false;
		if (statusf) {
			//if (window.location.href.toLowerCase().includes(videoID.toLowerCase())) {
				document.head.insertAdjacentHTML('beforeend','<style>@keyframes kingdomlikes-interaction-animation { 0% { background-color: #fce3b0; } 50% { background-color: #fdc44c; } 100% { background-color: #fce3b0; } }</style>');
				aTags = document.getElementsByTagName("div");
				for (var i = 0; i < aTags.length; i++) {
					if ((typeof aTags[i].getAttribute('data-testid') !== "undefined") && (aTags[i].getAttribute('data-testid') !== null)) {
						if (aTags[i].getAttribute('data-testid').toLowerCase().includes("confirmationsheetconfirm")) {
							found = aTags[i];
							found.style.animation = "kingdomlikes-interaction-animation 2s linear infinite";
							stop = 1;
							found.onclick = function (e) {
								e.preventDefault();
								setTimeout(function () {
									document.body.innerHTML = "Waiting for approval!!!";
									chechLiked();
								}, 300);
							}
							break;
						}
					}
					if (stop == 1) break;
				}
				if (stop == 0) {
					setTimeout(function () {
						findLikeButtonFol();
					}, 500);
				}
			//}
		}
	}
}

function chechLiked() {
	var sending = browser.runtime.sendMessage({
		data: "false",
		check: "false"
	  });
	sending.then(handleResponse, handleError); 
	setTimeout(function () {
		chechLiked();
	}, 300);
}

function notEmpty(obj) {
	return Object.keys(obj).length;
}

function stoperror() {
	return true;
}
 
window.onerror = stoperror;