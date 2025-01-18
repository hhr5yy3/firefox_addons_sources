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
var hTags;

"use strict";
function handleResponse(message) {
  }
  
  function handleError(error) {
}

window.onbeforeunload = function () {
	if ((typeof videoID !== "undefined") && (videoID !== null)) {
			window.close();
	}
}

browser.runtime.onMessage.addListener(request => {
	videoID = request.videoID;
	check = request.check;
	feature = request.feature;
	if (check.toString() == "true") {
			check = "false";
			window.close();
	}

	if ((typeof feature !== "undefined") && (feature !== null) && feature == "insfol") {
		setTimeout(function () {
			findLikeButtonFol();
		}, 1200);
	}
});

var sending = browser.runtime.sendMessage({
    greeting: "Greeting from the content script"
  });
sending.then(handleResponse, handleError); 
  
function findLikeButtonFol() {
	stop = 0;
	if ((typeof videoID !== "undefined") && (videoID !== null)) {
			document.head.insertAdjacentHTML('beforeend','<style>@keyframes kingdomlikes-interaction-animation { 0% { background-color: #fce3b0; } 50% { background-color: #fdc44c; } 100% { background-color: #fce3b0; } }</style>');
			hTags = document.getElementsByTagName("header");
			aTags = hTags[0].getElementsByTagName("button");
			for (var i = 0; i < aTags.length; i++) {
				if ((typeof aTags[i].getAttribute('class') !== "undefined") && (aTags[i].getAttribute('class') !== null) && aTags[i].getAttribute('class').length>10) {
					found = aTags[i];
					found.style.animation = "kingdomlikes-interaction-animation 2s linear infinite";
					stop = 1;
					found.onclick = function (e) {
						setTimeout(function () {
							document.body.innerHTML = "You can close the popup now and confirm!!!";
							chechLiked();
						}, 300);
					}
					break;
				}
				if (stop == 1) break;
			}
			if (stop == 0) {
				setTimeout(function () {
					findLikeButtonFol();
				}, 500);
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