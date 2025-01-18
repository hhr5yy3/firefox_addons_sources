function savePrefs() {
	chrome.storage.local.set({
		hideUseAlt: document.querySelector("#hideUseAlt").checked,
		showSearchAll: document.querySelector("#showSearchAll").checked,
		tabType: document.querySelector("#tabType").value
	}, () => chrome.runtime.sendMessage({type: "rebuildMenu"}));	
}

function initializeOptionsMenu() {
	chrome.storage.local.get(["hideUseAlt", "showSearchAll", "tabType"], function(result){
		document.querySelector("#hideUseAlt").checked = result.hideUseAlt || false;
		document.querySelector("#showSearchAll").checked = result.showSearchAll || false;
		document.querySelector("#tabType").value = result.tabType || 0;
	})
	hideEditContainer();
	loadOptionsList();
	
	document.getElementById("save").addEventListener("click", savePrefs);
	document.getElementById("add").addEventListener("click", addOption);
	document.getElementById("remove").addEventListener("click", removeOption);
	document.getElementById("move").addEventListener("click", moveOption);
	document.getElementById("import").addEventListener("click", importOptions);
	document.getElementById("export").addEventListener("click", exportOptions);
	document.getElementById("fixdefaults").addEventListener("click", restoreDefaults);
	document.getElementById("help").addEventListener("click", help);

	document.getElementById("submitEdit").addEventListener("click", saveEdit);
	document.getElementById("closeEdit").addEventListener("click", hideEditContainer);
}

function saveEdit() {
	//saves all changes made in the Edit page, and can also add new elements 
	var getting = chrome.storage.local.get(["urlList", "currentItem"], function(result){
		var optionArray = [];
		//main
		optionArray[1] = document.querySelector("#optionName").value;
		optionArray[2] = document.querySelector("#optionIcon").value;
		optionArray[3] = document.querySelector("#optionEnabled").checked;
		optionArray[4] = document.querySelector("#optionSearchAll").checked;
		optionArray[5] = document.querySelector("#optionURL").value;
		optionArray[6] = document.querySelector("#optionVariables").value;
		optionArray[7] = document.querySelector("#optionSeperator1").value;
		optionArray[8] = document.querySelector("#optionSeperator2").value;
		optionArray[9] = document.querySelector("#optionPOST").checked;
		optionArray[10] = document.querySelector("#optionIMGDATA2URL").checked;
		//alt
		optionArray[11] = document.querySelector("#optionURL-Alt").value;
		optionArray[12] = document.querySelector("#optionVariables-Alt").value;
		optionArray[13] = document.querySelector("#optionSeperator1-Alt").value;
		optionArray[14] = document.querySelector("#optionSeperator2-Alt").value;
		optionArray[15] = document.querySelector("#optionPOST-Alt").checked;
		optionArray[16] = document.querySelector("#optionIMGDATA2URL-Alt").checked;
		if (optionArray[1] == ""){
			optionArray[1] = "Untitled Option"
		}
		if (result.currentItem == "new") {
			optionArray[0] = 0; //marks as user created, NOT a default
			result.urlList.push(optionArray); //add to list
		}else{
			optionArray[0] = result.urlList[result.currentItem][0];
			result.urlList[result.currentItem] = optionArray; //update item in list
		}
		chrome.storage.local.set({urlList: result.urlList});
		loadOptionsList();
		hideEditContainer();
	})
}

function hideEditContainer(){
	var editContainer = document.getElementById("edit-container");
	editContainer.classList.remove("active")
}

function showEditContainer(){
	//unhides edit-container
	var editContainer = document.getElementById("edit-container");
	editContainer.classList.add("active")
}

function clearEditContainer(){
	//main
	document.querySelector("#optionName").value = "";
	document.querySelector("#optionIcon").value = "";
	document.querySelector("#optionEnabled").checked = true;
	document.querySelector("#optionSearchAll").checked = true;
	document.querySelector("#optionURL").value = "";
	document.querySelector("#optionVariables").value = "";
	document.querySelector("#optionSeperator1").value = "?";
	document.querySelector("#optionSeperator2").value = "&";
	document.querySelector("#optionPOST").checked = false;
	document.querySelector("#optionIMGDATA2URL").checked = false;
	//alt
	document.querySelector("#optionURL-Alt").value = "";
	document.querySelector("#optionVariables-Alt").value = "";
	document.querySelector("#optionSeperator1-Alt").value = "?";
	document.querySelector("#optionSeperator2-Alt").value = "&";
	document.querySelector("#optionPOST-Alt").checked = false;
	document.querySelector("#optionIMGDATA2URL-Alt").checked = false;
}

function openEditContainer() {
	//enables the edit menu for the highlighted url and fills it with the URL's current settings
	var attribute = this.getAttribute("id");
	chrome.storage.local.set({currentItem: attribute});
	var urls = chrome.storage.local.get(["urlList"], function(result){
		//main
		document.querySelector("#optionName").value = result.urlList[attribute][1] || "";
		document.querySelector("#optionIcon").value = result.urlList[attribute][2] || "";
		document.querySelector("#optionEnabled").checked = result.urlList[attribute][3] || false;
		document.querySelector("#optionSearchAll").checked = result.urlList[attribute][4];
		document.querySelector("#optionURL").value = result.urlList[attribute][5] || "";
		document.querySelector("#optionVariables").value = result.urlList[attribute][6] || "";
		document.querySelector("#optionSeperator1").value = result.urlList[attribute][7] || "";
		document.querySelector("#optionSeperator2").value = result.urlList[attribute][8] || "";
		document.querySelector("#optionPOST").checked = result.urlList[attribute][9] || false;
		document.querySelector("#optionIMGDATA2URL").checked = result.urlList[attribute][10] || false;
		//alt
		document.querySelector("#optionURL-Alt").value = result.urlList[attribute][11] || "";
		document.querySelector("#optionVariables-Alt").value = result.urlList[attribute][12] || "";
		document.querySelector("#optionSeperator1-Alt").value = result.urlList[attribute][13] || "";
		document.querySelector("#optionSeperator2-Alt").value = result.urlList[attribute][14] || "";
		document.querySelector("#optionPOST-Alt").checked = result.urlList[attribute][15] || false;
		document.querySelector("#optionIMGDATA2URL-Alt").checked = result.urlList[attribute][16] || false;
	})
	showEditContainer();
}

//deal with drag and drop behavior on the search options menu
function updateListOnChange(){
	arr = $("#option-list").sortable( "toArray" )
	//get a list of mutated ids after the drag/drop
	var new_arr = [];
	for(elem in arr) {
		new_arr.push("");
	}
	
	var urls = chrome.storage.local.get("urlList", function(result){
		for(elem in arr) {
			new_arr[elem] = result.urlList[arr[elem]];
		}
		chrome.storage.local.set({"urlList": new_arr}, () => loadOptionsList())
	});
}

function loadOptionsList(){
	//clears menu-settings-list and creates the list of URLs in a table inside it
	//clear container div first
	var menuSettingsList = document.getElementById("menu-settings-list");
	menuSettingsList.textContent = "";
	
	var urls = chrome.storage.local.get("urlList", function(result){
		var len = result.urlList.length;
		var temp = document.createElement("div");
		var addedportion = document.createElement("TABLE");
		temp.appendChild(addedportion);
		addedportion.id = "option-list";
		for (var i = 0; i < len; i++){
			var addition = document.createElement("TR");
			var textportion = document.createTextNode(result.urlList[i][1]);
			addition.className = "option-list-row";
			addition.id = i;
			addition.appendChild(textportion);
			addedportion.appendChild(addition);
		}   
		document.body.appendChild(addedportion);
		menuSettingsList.appendChild(addedportion)
		$("#option-list").sortable({
			update: updateListOnChange
		});
		var kids = document.getElementsByClassName("option-list-row");
		for (var i = 0; i < kids.length; i++){
			kids[i].addEventListener("click", openEditContainer);
		}
	})
	chrome.runtime.sendMessage({type: "rebuildMenu"})
}

function addOption() {
	clearEditContainer();
	showEditContainer();
	chrome.storage.local.set({currentItem: "new"});
}

function removeOption(){
	//removes the currently selected option from the list
	var urls = chrome.storage.local.get(["urlList", "currentItem"], function(result){
		result.urlList.splice(result.currentItem, 1);
		chrome.storage.local.set({urlList: result.urlList});
		loadOptionsList();
		hideEditContainer();
	})
}

function moveOption(){
	//moves the currently selected URL to the end of the list
	var urls = chrome.storage.local.get(["urlList", "currentItem"], function(result){
		if (result.currentItem < result.urlList.length && result.currentItem > -1)	{
			var temp = result.urlList[result.currentItem];
			result.urlList.splice(result.currentItem, 1);
			result.urlList.push(temp)
			chrome.storage.local.set({urlList: result.urlList});
			loadOptionsList();
			hideEditContainer();
		}
	})
}

function importOptions(){
	importExportField = document.getElementById("import-export-text");
	var importedJSON = importExportField.value;
	if (importedJSON == ""){
		importExportField.value = "Nothing to Import..."
	}
	try {
		var data = JSON.parse(importedJSON);
	} catch(e) {
		importExportField.value = "Unable to Parse JSON Export Data..."
		return;
	}
	if(data['ISOFormat'] == 3){
		for (var i = 0; i < data['Options'].length; i++){
			if (data['Options'][i].length != 17){
				importExportField.value = "Invalid Settings..."
				return;
			}
		}
		importExportField.value = "Import Success..."
		chrome.storage.local.set({urlList: data['Options']});
		loadOptionsList();
	}else{
		importExportField.value = "Invalid Format..."
	}
}

function exportOptions(){
	var list = chrome.storage.local.get("urlList", function(result){
		var newList = JSON.stringify(result.urlList);
		var data = {};
		data['ISOFormat'] = 3
		data['Options'] = result.urlList
		dataJSON = JSON.stringify(data)
		document.getElementById("import-export-text").value = dataJSON;
	});
}

function restoreDefaults(){
	chrome.runtime.sendMessage({type: "restoreDefaults"})
	hideEditContainer();
	//reloading options list async
}

chrome.runtime.onMessage.addListener(function(message){
    if(message){
		switch (message.type){
			//a possible less clunky way to do this might be to send all of the user preferences through this message
			//rather than wait through an entire set/get process
			case "refreshPreferences":
				loadOptionsList();
				break;
			default:
				break;
		}
	}
});


function help(){
	chrome.tabs.create({
		url: "/help.html"
	});
}

//creates the event listeners necessary to generate the menus and add functionality to the options page
document.addEventListener("DOMContentLoaded", initializeOptionsMenu);