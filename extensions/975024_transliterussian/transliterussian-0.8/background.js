// * Software:	Add-on "TRANSLITERUSSIAN" for Mozilla Firefox 
// * Version:	0.8
// * Date:	2020-07-24
// * Author:	Vlad Koutsenok (www.koutsenok.de)
// * File:	background-script.js

var addon_active = false;
var request_content = false;
var menu_created = false;
var razkladka = ""; // aktueller Zeichensatz

//console.log("Start: addon_active = " + addon_active);
//console.log("Start: menu_created = " + menu_created);

function handleMessage(request, sender, sendResponse) {
	
	//console.log("Klick: " + request_content);
	//console.log("Klick: addon_active = " + addon_active)
	//console.log("Klick: menu_created = " + menu_created);

	request_content = request.content;
	razkladka = request.razkladka;

	if(request.content == "ElementIsText" && menu_created === false){
		
		//console.log("CreateMenu");

		if(addon_active === false){
			browser.contextMenus.create({
				id: "translit_on",
				type: "radio",
				title: "On / Ein",
				contexts: ["all"],
				checked: false,
				icons: {
					"16": "icons/icon16.png",
					"32": "icons/icon32.png"
				}
			});
			browser.contextMenus.create({
				id: "translit_off",
				type: "radio",
				title: "Off / Aus",
				contexts: ["all"],
				checked: true
			});
		}
		else{
			browser.contextMenus.create({
				id: "translit_on",
				type: "radio",
				title: "On / Ein",
				contexts: ["all"],
				checked: true,
				icons: {
					"16": "icons/icon16.png",
					"32": "icons/icon32.png"
				}
			});
			browser.contextMenus.create({
				id: "translit_off",
				type: "radio",
				title: "Off / Aus",
				contexts: ["all"],
				checked: false
			});
		}
		menu_created = true;
	}

	if(request.content == "ElementIsNotText"){
		//console.log("ElementIsNotText");
		if(menu_created === true){ 
			removeContextMenu();
			menu_created = false;
		}
	}

}

function removeContextMenu() {	
	browser.contextMenus.remove("translit_on");
	browser.contextMenus.remove("translit_off");
	//console.log("RemoveMenu");
}

//Message Listener
browser.runtime.onMessage.addListener(handleMessage);

//Context Menu Click Listener
browser.contextMenus.onClicked.addListener(function(info, tab) {
	if (info.menuItemId == "translit_on") {
		addon_active = true;
		browser.tabs.executeScript({ file: razkladka + ".js" });
	} 
	if (info.menuItemId == "translit_off") {
		addon_active = false;
		browser.tabs.executeScript({ file: "deactivate.js" });
	} 
});

//Command Listener
let gettingAllCommands = browser.commands.getAll();
browser.commands.onCommand.addListener((command) => {
	if(request_content == "ElementIsText"){
		if(addon_active === true){
			browser.tabs.executeScript({ file: "deactivate.js" });
			addon_active = false;
		}
		else{
			browser.tabs.executeScript({ file: razkladka + ".js" });
			addon_active = true;
		}
		//console.log("addon_active = " + addon_active);
		if(menu_created === true){ 
			removeContextMenu();
			menu_created = false;
		}
	}
});

function onGot(item) {
	razkladka = item["razkladka"];
	if(!razkladka){
		browser.storage.sync.set({razkladka: "default"});
	}
	//console.log("HALLO_BACKGR: " + razkladka);
}
function onError(error) {
	console.log(error);
}

// Holen Inhalt der "raskladka" aus dem Storage-Speicher
let gettingItem = browser.storage.sync.get('razkladka');
gettingItem.then(onGot, onError);