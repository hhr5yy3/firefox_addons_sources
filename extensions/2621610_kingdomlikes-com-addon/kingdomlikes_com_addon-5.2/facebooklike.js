//document.body.style.border = "5px solid red";
var aTags;
var buttonTags;
var searchText;
var searchTextPage;
var found;
var foundPage;
var liked;
var pageLiked;
var obj = {};
var feature;
var stop = 0;
var idlinka;
var htmlout = "";
var prox = true;
var faceTags;
var nIntervId;

"use strict";

function handleResponse(message) {
  }
  
  function handleError(error) {
}
window.onbeforeunload = function () {

	if ((typeof idlinka !== "undefined") && (idlinka !== null)) {
		if (window.location.href.toLowerCase().includes("m.facebook")) {
			var mobile = true;
		}
		var n = idlinka.indexOf("facebook.com");
		if ((typeof n !== "undefined") && (n !== null) && n > 0) {
			if (n > 0) {
				idlinka = idlinka.substring(n + 12);
			}
		}
		
		if (idlinka.includes("/getlink") || window.location.href.toLowerCase().includes(idlinka.toLowerCase()) || idlinka.toLowerCase().includes("/videos/") || idlinka.toLowerCase().includes("plugins/") || window.location.href.toLowerCase().includes("watch/?v=")) {
			closewin = 1;
			if (mobile) {
				setTimeout(function () {
					window.close();
				}, 500);
			} else {

				window.close();
			}
		}
	}
};


browser.runtime.onMessage.addListener(request => {
	videoID = request.videoID;
	check = request.check;
	feature = request.feature;
	idlinka = request.idlinka;
	if (feature == "fbsub") {
		if ((typeof idlinka !== "undefined") && (idlinka !== null)) {
			var n = idlinka.indexOf("facebook.com");
			if ((typeof n !== "undefined") && (n !== null) && n > 0) {
				if (n > 0) {
					idlinka = idlinka.substring(n + 12);
				}
			}
		}
	}

	if ((typeof feature !== "undefined") && (feature !== null) && (feature == "fblike" )) {
		setTimeout(function () {
			startRun();
		}, 1000);
	}

	if ((typeof feature !== "undefined") && (feature !== null) && (feature == "fbpage")) {
		setTimeout(function () {
			startRun();
		}, 1000);
	}

	var n = idlinka.indexOf("facebook.com");
	if ((typeof n !== "undefined") && (n !== null) && n > 0) {
		if (n > 0) {
			idlinka = idlinka.substring(n + 12);
		}
	}

	if ((idlinka.includes("/getlink") || window.location.href.toLowerCase().includes(idlinka.toLowerCase()) || idlinka.toLowerCase().includes("/videos/") || idlinka.toLowerCase().includes("plugins")) && check == "true") {
		if(stop == 1 ){
			check = "false";
			setTimeout(function () {
				window.close();
			}, 100);
		}
		
	}
	
});

var sending = browser.runtime.sendMessage({
    greeting: "Greeting from the content script"
  });
sending.then(handleResponse, handleError); 

function startRun() {
	nIntervId = setInterval(flasheaTexto, 300);
	
}

function flasheaTexto() {
        aTags = document.getElementsByTagName("a");
				buttonTags = document.getElementsByTagName("button");
				faceTags = document.querySelectorAll("[class='tvfksri0 ozuftl9m']");
				findLikeButton();
     }

function findLikeButton() {

	
	if ((typeof feature !== "undefined") && (feature !== null) && (feature == "fblike" || feature == "fbpage")) {
		stop = 1;
		if ((typeof idlinka !== "undefined") && (idlinka !== null)) {
			
			var n = idlinka.indexOf("facebook.com");
			if ((typeof n !== "undefined") && (n !== null) && n > 0) {
				if (n > 0) {
					idlinka = idlinka.substring(n + 12);
				}
			}
			if (idlinka.includes("/getlink") || window.location.href.toLowerCase().includes(idlinka.toLowerCase()) || idlinka.toLowerCase().includes("/videos/") || window.location.href.toLowerCase().includes("plugins") || window.location.href.toLowerCase().includes("watch/?v=")) {
				stop = 0;
			}
		} else {
			clearInterval(nIntervId);
			stop = 1;
		}

		if (stop === 0) {
			var post = false;
			var mversion = false;
			mversion = window.location.href.toLowerCase().includes("/m.facebook.");
			if (!post) { post = window.location.href.toLowerCase().includes("/posts/"); }
			if (!post) { post = window.location.href.toLowerCase().includes("/groups/"); }
			if (!post) { post = window.location.href.toLowerCase().includes("/group/"); }
			if (!post) { post = window.location.href.toLowerCase().includes("/permalink.php?"); }
			if (!post) { post = window.location.href.toLowerCase().includes("/photo.php?"); }
			if (!post) { post = window.location.href.toLowerCase().includes("/photos/"); }
			if (!post) { post = window.location.href.toLowerCase().includes("/videos/"); }
			if (!post) { post = window.location.href.toLowerCase().includes("story.php?"); }
			if (!post) { post = window.location.href.toLowerCase().includes("photo?"); }
			if (!post) { post = window.location.href.toLowerCase().includes("watch/?v="); }
			if (stop == 0) {
				document.head.insertAdjacentHTML('beforeend','<style>@keyframes kingdomlikes-interaction-animation { 0% { background-color: #fce3b0; } 50% { background-color: #fdc44c; } 100% { background-color: #fce3b0; } }</style>');
				if (post) {
					faceTags = document.querySelectorAll("[class='tvfksri0 ozuftl9m']");
					
					for (var i = 0; i < faceTags.length; i++) {
											console.log(faceTags[i].firstElementChild.childNodes.length);

											if(faceTags[i].firstElementChild.childNodes.length > 1){
												foundPage = faceTags[i].firstElementChild.firstElementChild;
												foundPage.style.animation = "kingdomlikes-interaction-animation 2s linear infinite";
												foundPage.onclick = function (event) {
													setTimeout(function () {
														document.body.innerHTML = "You can close the popup and confirm!!!";
														chechLiked();
													}, 1000);
												}
												clearInterval(nIntervId);
												stop = 1;
												break;
											}
											
										
								}

								

					faceTags = document.querySelectorAll("[class='jmbispl3 olo4ujb6']");
					for (var i = 0; i < faceTags.length; i++) {
											console.log(faceTags[i].firstElementChild.childNodes.length);

											if(faceTags[i].firstElementChild.childNodes.length > 1){
												foundPage = faceTags[i].firstElementChild.firstElementChild;
												foundPage.style.animation = "kingdomlikes-interaction-animation 2s linear infinite";
												foundPage.onclick = function (event) {
													setTimeout(function () {
														document.body.innerHTML = "You can close the popup and confirm!!!";
														chechLiked();
													}, 1000);
												}
												clearInterval(nIntervId);
												stop = 1;
												break;
											}
										
								}

					for (var i = 0; i < aTags.length; i++) {
						if (!mversion) {

							if ((typeof aTags[i].getAttribute('data-testid') !== "undefined") && (aTags[i].getAttribute('data-testid') !== null) && aTags[i].getAttribute('data-testid').includes("UFI2ReactionLink")) {
								if ((typeof aTags[i].getAttribute('aria-pressed') !== "undefined") && (aTags[i].getAttribute('aria-pressed') !== null) && aTags[i].getAttribute('aria-pressed').includes("false")) {
									found = aTags[i];
									found.style.animation = "kingdomlikes-interaction-animation 2s linear infinite";
									setTimeout(function () {
										found.focus();
									}, 500);
									found.onclick = function (e) {
										//e.preventDefault();
										setTimeout(function () {
											document.body.innerHTML = "You can close the popup and confirm!!!";
											chechLiked();
										}, 400);
									}
									clearInterval(nIntervId);
									stop = 1;
									break;
								}
							}
							//console.info("aqui");

							

						} else {
							try{
								if(aTags[i].getAttribute('href') !== null && aTags[i].getAttribute('href') !== "undefined" )  {

								if ((typeof aTags[i].getAttribute('role') !== "undefined") && (aTags[i].getAttribute('role') !== null) && aTags[i].getAttribute('role').includes("button")) {
									if ((typeof aTags[i].getAttribute('aria-pressed') !== "undefined") && (aTags[i].getAttribute('aria-pressed') !== null) && aTags[i].getAttribute('aria-pressed').includes("false")) {
										found = aTags[i];
										found.style.animation = "kingdomlikes-interaction-animation 2s linear infinite";
										setTimeout(function () {
											found.focus();
										}, 500);
										found.onclick = function (e) {
											//e.preventDefault();
											setTimeout(function () {
												document.body.innerHTML = "You can close the popup and confirm!!!";
												chechLiked();
											}, 400);
										}
										clearInterval(nIntervId);
										stop = 1;
										break;
									}
								}
							}

								if (aTags[i].hasAttribute("data-uri")) { 
										if (aTags[i].getAttribute('data-uri').includes("ufi/reaction/?")){
											found = aTags[i];
											found.style.animation = "kingdomlikes-interaction-animation 2s linear infinite";
											setTimeout(function () {
												found.focus();
											}, 500);
											found.onclick = function (e) {
												//e.preventDefault();
												setTimeout(function () {
													document.body.innerHTML = "You can close the popup and confirm!!!";
													chechLiked();
												}, 300);
											}
											clearInterval(nIntervId);
											stop = 1;
											break;
										}
									}

							}catch(error){

							}
							
						}
					}
				} else {
					var faceTags = document.querySelectorAll("[class='j83agx80 bp9cbjyn']");

					for (var i = 0; i < faceTags.length; i++) {
									foundPage = faceTags[i].firstElementChild;
									foundPage.style.animation = "kingdomlikes-interaction-animation 2s linear infinite";
									foundPage.onclick = function (event) {
										setTimeout(function () {
											document.body.innerHTML = "You can close the popup and confirm!!!";
											chechLiked();
										}, 1000);
									}
									clearInterval(nIntervId);
									stop = 1;
									break;
								
						}

					if(faceTags.length == 0 ){
						var faceTags = document.getElementsByClassName("likeButton");
						for (var i = 0; i < faceTags.length; i++) {
									foundPage = faceTags[i];
									foundPage.style.animation = "kingdomlikes-interaction-animation 2s linear infinite";
									foundPage.onclick = function (event) {
										setTimeout(function () {
											document.body.innerHTML = "You can close the popup and confirm!!!";
											chechLiked();
										}, 1000);
									}
									clearInterval(nIntervId);
									stop = 1;
									break;
								
						}
					}		

						/*
					if(window.location.href.toLowerCase().includes("plugins/error/confirm/like?") ){
						if ((typeof idlinka !== "undefined") && (idlinka !== null)) {
							var n = idlinka.indexOf("facebook.com");
							if ((typeof n !== "undefined") && (n !== null) && n > 0) {
								if (n > 0) {
									idlinka = idlinka.substring(n + 12);
								}
							}
						}
						var buttonTags2 = document.getElementsByTagName("button");
						for (var k = 0; k < buttonTags2.length; k++) {
									foundPage = buttonTags2[k];
									foundPage.style.animation = "kingdomlikes-interaction-animation 2s linear infinite";
									foundPage.onclick = function (event) {
										setTimeout(function () {
											document.body.innerHTML = "Waiting for approval!!!";
											chechLiked();
											
										}, 300);
									}
									stop = 1;
									break;
						}
					}else{
						for (var i = 0; i < buttonTags.length; i++) {
							if (((typeof buttonTags[i].getAttribute('data-testid') === "undefined") || (buttonTags[i].getAttribute('data-testid') === null)) && buttonTags[i].getAttribute('type').includes("submit")) {
									foundPage = buttonTags[i];
									foundPage.style.animation = "kingdomlikes-interaction-animation 2s linear infinite";
									var interval = setInterval(function(){
											if(window.location.href.toLowerCase().includes("from_confirm") &&window.location.href.toLowerCase().includes("new_count")  ){
												window.close();
											}
										}, 400);
									stop = 1;
									break;
								}
						}
					}*/
				}
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