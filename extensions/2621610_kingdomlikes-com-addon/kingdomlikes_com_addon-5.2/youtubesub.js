var aTags;
var found;
var obj = {};
var stop = 0;
var buttonFollow;
var foundElem = false;
var globCounter = 0;
var markedQuest;
var result = 'true';
var checker = false;
var checkFlexy = "";
var foundFlexy = "";
var videoID = "";
var closeWin = false;

"use strict";
function handleResponse(message) {
  }
  
  function handleError(error) {
}
  
window.onbeforeunload = function () {
	if ((typeof videoID !== "undefined") && (videoID !== null)) {
		if (findFlexyClose()) {
			window.close();
		}
	}
}

browser.runtime.onMessage.addListener(request => {
  videoID = request.videoID;
  check = request.check;
	if (check.toString() == "true") {
		if (findFlexyClose()) {
			check = "false";
			window.close();
		}
  }
});

var sending = browser.runtime.sendMessage({
    greeting: "Greeting from the content script"
  });
sending.then(handleResponse, handleError); 
  
setTimeout(function () {

	checkFlexy = document.getElementsByTagName("ytd-subscribe-button-renderer");
	console.info("aqui");
	console.info(checkFlexy.length);
	findFlexy(checkFlexy);
}, 100);


function findFlexy(checkFlexy) {
	stop = 0;
	if (videoID != "") { 
		document.head.insertAdjacentHTML('beforeend','<style>@keyframes kingdomlikes-interaction-animation { 0% {		  background-color: #f9dd9b; color: #b36b1d; } 50% { background-color: #e42a38; color: #fff; } 100% { background-color: #f9dd9b; color: #b36b1d; } }</style>');
		if(checkFlexy.length != 0){
			foundFlexy = checkFlexy[0];
			if ((typeof foundFlexy !== "undefined") && (foundFlexy !== null)){



					checkFlexy2 = foundFlexy.getElementsByTagName("tp-yt-paper-button");
					console.info("ultimo");
					console.info(checkFlexy2.length);
					found = checkFlexy2[0];
					found.style.animation = "kingdomlikes-interaction-animation 2s linear infinite";
					
					found.onclick = function (e) {
						e.preventDefault();
						found.style.visibility = 'hidden';
						setTimeout(function () {
							chechFolowed();
						}, 500);
					}
					//findFollowButton(foundFlexy);
					stop = 1;
			}
		}
			


			//foundFlexy = checkFlexy[i].getAttribute('href');
			//if ((typeof foundFlexy !== "undefined") && (foundFlexy !== null)) {
				//foundFlexy =foundFlexy.toLowerCase()
				//if (foundFlexy.includes(videoID.toLowerCase())) {
					//buttonTags = document.getElementsByTagName("paper-button")
					//findFollowButton(buttonTags);
					//stop = 1;
				//}
			//} 
			//if (stop == 1) break;
		
	}
	if (stop == 0) {
		setTimeout(function () {
			
			checkFlexy = document.getElementsByTagName("ytd-subscribe-button-renderer");
			console.info("aqui2");
			console.info(checkFlexy.length);
			findFlexy(checkFlexy);
		}, 500);
	}	
}

function findFlexyClose() {
	stop = 0;
	checkClose = document.getElementsByTagName("link");
	for (var i = 0; i < checkClose.length; i++) {
		foundFlexy = checkClose[i].getAttribute('href');
		if ((typeof foundFlexy !== "undefined") && (foundFlexy !== null)) {
			foundFlexy =foundFlexy.toLowerCase()
			//if (foundFlexy.includes(videoID.toLowerCase())) {
				return true;
			//}
		} 
		if (stop == 1) break;
	}
	return false;
}

function findFollowButton(aTags) {
	stop = 0;
	for (var i = 0; i < aTags.length; i++) {
		buttonFollow = aTags[i].getElementsByTagName("yt-formatted-string");
		if (notEmpty(buttonFollow)) {
			for (var j = 0; j < buttonFollow.length; j++) {
				if (buttonFollow[j].getAttribute('class').includes("ytd-subscribe-button-renderer")) {
					found = aTags[i];
					found.style.animation = "kingdomlikes-interaction-animation 2s linear infinite";
					stop = 1;
					found.onclick = function (e) {
						e.preventDefault();
						found.style.visibility = 'hidden';
						setTimeout(function () {
							chechFolowed();
						}, 500);
					}
				}
				if (stop == 1) break;
			}
		} 
		if (stop == 1) break;
	}
	if (stop == 0) {
		setTimeout(function () {
			buttonTags = document.getElementsByTagName("paper-button");
			findFollowButton(buttonTags);
		}, 500);
	}
}

function chechFolowed() {
	var sending = browser.runtime.sendMessage({
		data: "false",
		check: "false"
	  });
	sending.then(handleResponse, handleError); 
	setTimeout(function () {
		chechFolowed();
	}, 500);
}

function notEmpty(obj) {
	return Object.keys(obj).length;
}

function stoperror() {
	return true;
}
 
window.onerror = stoperror;

/*
browser.webRequest.onBeforeRequest.addListener(
	function(details) {
	  if(details.method == "POST") {
		console.log(details.requestBody.formData);
	  }
	},
	{urls: ["<all_urls>"]},
	["requestBody"]
);
*/