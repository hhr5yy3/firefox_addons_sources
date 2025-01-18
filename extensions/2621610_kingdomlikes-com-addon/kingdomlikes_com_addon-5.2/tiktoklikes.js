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
	//window.close(); 
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
		if (window.location.href.toLowerCase().includes(videoID.toLowerCase()) || feature == "tiktk2" ) {

			setTimeout(function () {
				check = "false";
				window.close();
			}, 700);
			
		}
	}

	if ((typeof feature !== "undefined") && (feature !== null) && (feature == "tiktk" || feature == "tiktk2") ) {
		setTimeout(function () {
			findLikeButtonLike();
		}, 500);
	}
});

var sending = browser.runtime.sendMessage({
    greeting: "Greeting from the content script"
  });
sending.then(handleResponse, handleError); 
  
function findLikeButtonLike() {
	stop = 0;
	var statusf = false;
	if ((typeof videoID !== "undefined") && (videoID !== null)) {
		if (window.location.href.toLowerCase().includes("/video/")) statusf = true;
		if (statusf) {
				document.head.insertAdjacentHTML('beforeend','<style>@keyframes kingdomlikes-interaction-animation { 0% { background-color: #fce3b0; } 50% { background-color: #fdc44c; } 100% { background-color: #fce3b0; } }</style>');
				setTimeout(function () {

						divTags = document.getElementsByClassName("tiktok-ouggfm-SpanIconWrapper");
						found = divTags[0].parentNode;
						found.style.animation = "kingdomlikes-interaction-animation 2s linear infinite";
						stop = 1;
						found.focus();
						found.onclick = function (e) {
							setTimeout(function () {
								document.body.innerHTML = "Waiting for approval!!!";
								chechLiked();
							}, 700);
						}

						if (stop == 0) {
							setTimeout(function () {
								findLikeButtonLike();
							}, 500);
						}
					}, 500);

		}else{
			document.head.insertAdjacentHTML('beforeend','<style>@keyframes kingdomlikes-interaction-animation { 0% { background-color: #fce3b0; } 50% { background-color: #fdc44c; } 100% { background-color: #fce3b0; } }</style>');
				setTimeout(function () {
						//aTags = document.getElementsByTagName("header");
						divTags = document.getElementsByClassName("tiktok-1h3j14u-DivFollowButtonWrapper");
						console.log(divTags.length);
						found = divTags[0].parentNode;
						found.style.animation = "kingdomlikes-interaction-animation 2s linear infinite";
						stop = 1;
						found.focus();
						found.onclick = function (e) {
							setTimeout(function () {
								document.body.innerHTML = "Waiting for approval!!!";
								chechLiked();
							}, 700);
						}

						if (stop == 0) {
							setTimeout(function () {
								findLikeButtonLike();
							}, 500);
						}
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
	}, 400);
}

function notEmpty(obj) {
	return Object.keys(obj).length;
}

function stoperror() {
	return true;
}
 
window.onerror = stoperror;