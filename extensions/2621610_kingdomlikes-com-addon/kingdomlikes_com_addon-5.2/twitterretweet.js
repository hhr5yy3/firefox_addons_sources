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
var formTags;
var feature;

"use strict";
function handleResponse(message) {
  }
  
  function handleError(error) {
}

window.onbeforeunload = function () {
}

browser.runtime.onMessage.addListener(request => {
	videoID = request.videoID;
	check = request.check;
	feature = request.feature;

	if (check.toString() == "true") {
		if (window.location.href.toLowerCase().includes(videoID.toLowerCase())) {
			setTimeout(function () {
				check = "false";
				window.close();
			}, 700);
		}
	}

	if ((typeof feature !== "undefined") && (feature !== null) && feature == "twret") {
		setTimeout(function () {
			findLikeButtonRet();
		}, 500);
	}
});

var sending = browser.runtime.sendMessage({
    greeting: "Greeting from the content script"
  });
sending.then(handleResponse, handleError); 
  
function findLikeButtonRet() {
	stop = 0;
	var statusf = false;
	if ((typeof videoID !== "undefined") && (videoID !== null)) {
		if (window.location.href.toLowerCase().includes("intent/retweet")) statusf = true;
		if (statusf) {
				document.head.insertAdjacentHTML('beforeend','<style>@keyframes kingdomlikes-interaction-animation { 0% { background-color: #fce3b0; } 50% { background-color: #fdc44c; } 100% { background-color: #fce3b0; } }</style>');
				aTags = document.getElementsByTagName("div");
				for (var i = 0; i < aTags.length; i++) {
					if ((typeof aTags[i].getAttribute('data-testid') !== "undefined") && (aTags[i].getAttribute('data-testid') !== null)) {
						if (aTags[i].getAttribute('data-testid').toLowerCase().includes("confirmationsheetconfirm")) {
							found = aTags[i];
							found.style.animation = "kingdomlikes-interaction-animation 2s linear infinite";
							stop = 1;
							found.focus();
							found.onclick = function (e) {
								setTimeout(function () {
									chechLiked();
								}, 400);
							}
							break;
						}
					}
					if (stop == 1) break;
				}
				if (stop == 0) {
					setTimeout(function () {
						findLikeButtonRet();
					}, 500);
				}
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