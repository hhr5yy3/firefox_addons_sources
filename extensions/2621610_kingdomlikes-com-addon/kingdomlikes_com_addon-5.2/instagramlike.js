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
var divTags;

"use strict";
function handleResponse(message) {
  }
  
  function handleError(error) {
}

browser.runtime.onMessage.addListener(request => {

	videoID = request.videoID;
	check = request.check;
	feature = request.feature;
	if (check.toString() == "true") {
			check = "false";
			window.close();
	}

	if ((typeof feature !== "undefined") && (feature !== null) && feature == "inslike") {
		setTimeout(function () {
			findLikeButtonlike();
		}, 500);
	}
});

var sending = browser.runtime.sendMessage({
    greeting: "Greeting from the content script"
  });
sending.then(handleResponse, handleError); 
  
function findLikeButtonlike() {
	stop = 0;

	if ((typeof videoID !== "undefined") && (videoID !== null)) {
			document.head.insertAdjacentHTML('beforeend','<style>@keyframes kingdomlikes-interaction-animation { 0% { background-color: #fce3b0; } 50% { background-color: #fdc44c; } 100% { background-color: #fce3b0; } }</style>');
			//hTags = document.getElementsByTagName("main");
			aTags = document.getElementsByTagName("svg");
			for (var i = 0; i < aTags.length; i++) {
				if ( aTags[i].getAttribute('fill') == "#262626" && aTags[i].getAttribute('height') == "24") {

					if(aTags[i].firstElementChild.tagName == "path"){
						found = aTags[i].parentNode.parentNode.parentNode;
						found.style.animation = "kingdomlikes-interaction-animation 2s linear infinite";
						found.focus();
						stop = 1;
						found.onclick = function (e) {
							e.preventDefault();
							setTimeout(function () {
								document.body.innerHTML = "You can close the popup now and confirm!!!";
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
					findLikeButtonlike();
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