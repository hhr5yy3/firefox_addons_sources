

var backgroundPageWindow;

function removeSelectionBorderFromButtons(){
	modeButtons = document.getElementsByClassName("button");
	var i;
	for(i=0 ; i < modeButtons.length; i++) {
		modeButtons[i].classList.remove("selected");
	}		
}

function listenForClicks() {
	document.addEventListener("click", (e) => {
	
    if (e.target.classList.contains("modeOff")) {
		removeSelectionBorderFromButtons();
		e.target.classList.add("selected");
		backgroundPageWindow.disableCookies();
    } else if(e.target.classList.contains("mode1stParty")){
		removeSelectionBorderFromButtons();
		e.target.classList.add("selected");
		backgroundPageWindow.allow1stPartyCookiesOnly();
	} else if(e.target.classList.contains("mode3rdPartyVisitedOnly")){
		removeSelectionBorderFromButtons();
		e.target.classList.add("selected");
		backgroundPageWindow.allow3rdPartyCookiesFromVisitedOnly();
	} else if(e.target.classList.contains("modeAllowAll")){
		removeSelectionBorderFromButtons();
		e.target.classList.add("selected");
		backgroundPageWindow.allowAllCookies();
	} else if (e.target.classList.contains("clear")) {
		backgroundPageWindow.clearAllCookies();
    }
	window.close(); // close the popup after choosing option
  });
}

function updateSelected(){
	removeSelectionBorderFromButtons();
	if(backgroundPageWindow.bDisableCookies == true){
		document.getElementsByClassName("modeOff")[0].classList.add("selected");
	}else {
		if(backgroundPageWindow.bAllowThirdPartyCookies == false){
			document.getElementsByClassName("mode1stParty")[0].classList.add("selected");
		} else {
			if (backgroundPageWindow.bAllowThirdPartyCookiesFromVisitedOnly == true){
				document.getElementsByClassName("mode3rdPartyVisitedOnly")[0].classList.add("selected");
			}else {
				document.getElementsByClassName("modeAllowAll")[0].classList.add("selected");
			}
		}
	}
}

function onBgPageGot(page) {
  backgroundPageWindow = page;
  updateSelected();
  listenForClicks();
}

function onError(error) {
  console.log(`Error: ${error}`);
}

var getting = browser.runtime.getBackgroundPage();
getting.then(onBgPageGot, onError);
