// * Software:	Add-on "TRANSLITERUSSIAN" for Mozilla Firefox 
// * Version:	0.8
// * Date:	2020-07-24
// * Author:	Vlad Koutsenok (www.koutsenok.de)
// * File:	content-script.js

var razkladka = ""; // aktueller Zeichensatz

function onGot(item) {
	razkladka = item["razkladka"];
	if(!razkladka){
		browser.storage.sync.set({razkladka: "default"});
	}
	//console.log("HALLO_CONTENT: " + razkladka);
}
function onError(error) {
	console.log(error);
}
function sendNotification(e) {
	var type = e.target.type;
	var tagname = e.target.tagName;
	
	// Element must to be input, text, search, textarea
	if ((tagname.toLowerCase() == "input" && (type.toLowerCase() == "text" || type.toLowerCase() == "search")) || tagname.toLowerCase() == "textarea")
	{
		var post = browser.runtime.sendMessage({content: "ElementIsText", razkladka: razkladka});
		//var post = browser.runtime.sendMessage({content: "ElementIsText"});
	}
	else{
		var post = browser.runtime.sendMessage({content: "ElementIsNotText"});
	}
}
// Holen Inhalt der "raskladka" aus dem Storage-Speicher
let gettingItem = browser.storage.sync.get('razkladka');
gettingItem.then(onGot, onError);

// If click anywhere an page, start function sendNotification 
window.addEventListener("mousedown", sendNotification);



