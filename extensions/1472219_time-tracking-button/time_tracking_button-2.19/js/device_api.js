//CORDOVA EVENTS INITIALLIZATION
$(document).ready(function() {
	
	document.addEventListener("resume", onResume, false);
	
})

function onResume() {
	restartApp();
}

//ONLINE
window.addEventListener("offline", function(e) {
  console.log("OFF LINE");
  ONLINE = false;
}, false);

window.addEventListener("online", function(e) {
  ONLINE = true;
  console.log("NOW ON LINE");
    
}, false);

function isOnline(){
	//detecta si esta online
	var online = navigator.onLine;
	
	if(online){
		 ONLINE = true;
	}else{
		 ONLINE = false;
	}
	
	return online;
}

//STORAGE


function ApiSaveItemToStore( var_name, var_value ){
    localStorage.setItem( var_name , var_value );
}

function ApiGetItemFromStore( var_name){
  	var storedValue = localStorage.getItem( var_name);
    return storedValue;
}
function ApiRemoveItemFromStore(var_name){
	localStorage.removeItem(var_name);
}
function saveStore(){
  	ApiSaveItemToStore( "STORE" , JSON.stringify(STORE) )
}

function getStore(){
  	return JSON.parse( ApiGetItemFromStore( "STORE" ) );
}
function resetStore(){
  	localStorage.removeItem("STORE");
  	localStorage.removeItem("token");
  	localStorage.removeItem("remember_me");
}

function APIresetLocalStore(){
    localStorage.clear();
}

function onAppfocusEvent(){

	// Set the name of the hidden property and the change event for visibility
	
	    if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support 
		  hidden = "hidden";
		  visibilityChange = "visibilitychange";
		} else if (typeof document.mozHidden !== "undefined") {
		  hidden = "mozHidden";
		  visibilityChange = "mozvisibilitychange";
		} else if (typeof document.msHidden !== "undefined") {
		  hidden = "msHidden";
		  visibilityChange = "msvisibilitychange";
		} else if (typeof document.webkitHidden !== "undefined") {
		  hidden = "webkitHidden";
		  visibilityChange = "webkitvisibilitychange";
		}
		
		document.addEventListener(visibilityChange, handleVisibilityChange, false);
    
	
}

function handleVisibilityChange(){
	if (!document[hidden]) {
	    var evt = new CustomEvent('APP_IS_VISIBLE');
		document.dispatchEvent(evt);
	}else{
		var evt = new CustomEvent('APP_IS_HIDDEN');
		document.dispatchEvent(evt);
	}
}