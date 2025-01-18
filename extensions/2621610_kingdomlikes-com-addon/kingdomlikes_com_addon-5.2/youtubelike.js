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
var feature = "";

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
			window.close();
		//}
	}
}

browser.runtime.onMessage.addListener(request => {
	videoID = request.videoID;
	check = request.check;
	feature = request.feature;
	if (check.toString() == "true") {
		//if (window.location.href.toLowerCase().includes(videoID.toLowerCase())) {
			setTimeout(function () {
				check = "false";
				window.close();
			}, 500);
			
		//}
	}
});

var sending = browser.runtime.sendMessage({
    greeting: "Greeting from the content script"
  });
sending.then(handleResponse, handleError); 
  
setTimeout(function () {
	checkFlexy = document.getElementById("menu-container");
	findFlexy(checkFlexy);
}, 100);

function findFlexy(checkFlexy) {
	stop = 0;

	if (videoID != "") {
		document.head.insertAdjacentHTML('beforeend','<style>@keyframes like4like-interaction-animation { 0% { background-color: #fce3b0; } 50% { background-color: #fdc44c; } 100% { background-color: #fce3b0; } }</style>');

		//for (var i = 0; i < checkFlexy.length; i++) {
			//foundFlexy = checkFlexy[i].getAttribute('video-id');
			//if ((typeof foundFlexy !== "undefined") && (foundFlexy !== null)) {
				//if (foundFlexy.toLowerCase() == videoID.toLowerCase()) {
					//aTags = document.getElementsByTagName("a");
					//findLikeButton(aTags);
					//stop = 1;
				//}
			//}
			console.info("aqui1");
			console.info(checkFlexy);
			if ((typeof checkFlexy !== "undefined") && (checkFlexy !== null)){
				aTags = checkFlexy.getElementsByTagName("a");
				findLikeButton(aTags);
				stop = 1;
			}
			

			//if (stop == 1) break;
		//}
	}
	if (stop == 0) {
		setTimeout(function () {
			checkFlexy = document.getElementById("menu-container");
			findFlexy(checkFlexy);
		}, 500);
	}
}

function findLikeButton(aTags) {
	stop = 0;

	for (var i = 0; i < aTags.length; i++) {
		if ((typeof aTags[i].getAttribute('class') !== "undefined") && (aTags[i].getAttribute('class') !== null)) {
			if (aTags[i].getAttribute('class').includes("ytd-toggle-button-renderer")) {
				if(feature.toLowerCase().includes("dislikes")){
					if(i == 1){
						found = aTags[i];
						found.style.animation = "like4like-interaction-animation 2s linear infinite";
						stop = 1;
						found.onclick = function (e) {
							console.info("clicks0793");
							e.preventDefault();
							found.style.visibility = 'hidden';
							setTimeout(function () {
								chechLiked();
							}, 500);
						}
						break;	
					}
				}else{
					found = aTags[i];
					found.style.animation = "like4like-interaction-animation 2s linear infinite";
					stop = 1;
					found.onclick = function (e) {
						console.info("clicks0793");
						e.preventDefault();
						found.style.visibility = 'hidden';
						setTimeout(function () {
							chechLiked();
						}, 500);
					}
					break;	
				}
			}
		}
		if (stop == 1) break;
	}
	if (stop == 0) {
		setTimeout(function () {
			checkFlexy = document.getElementById("menu-container");
			aTags = checkFlexy.getElementsByTagName("a");
			findLikeButton(aTags);
		}, 500);
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