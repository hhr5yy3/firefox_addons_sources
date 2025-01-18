/*
*	Telephone Number Detection
*	Source © CTI Telephony
*	CTITelephony@GMail.com
*/

window.addEventListener('load', initialise);
var protocol;
var r_types = ["tel","dial","callto","ucdial","sip","skype"];

function initialise() {
	document.getElementById("saveBtn").addEventListener("click",saveOptions);
	document.getElementById("eraseBtn").addEventListener("click",eraseOptions);
	
	document.getElementById("protocol").addEventListener("change",protocolSelected);
	document.getElementById("r_enable").addEventListener("click",protocolReplacement);
	
	document.getElementById("r_slashes").addEventListener("click",slashesSelected);
	
	document.getElementById("verHeader").textContent = "V" + chrome.runtime.getManifest().version + " © CTI Telephony";
	
	protReplaceSetter(false);
	loadOptions();
}

function loadOptions() {
	chrome.storage.sync.get("protocol", function (obj) {
		protocol = (obj.protocol != undefined) ? obj.protocol : "dial";
		for (var optIndex = 0; optIndex< document.getElementById("protocol").options.length; optIndex++) {
			if (document.getElementById("protocol").options[optIndex].value == protocol){
				document.getElementById("protocol").options.selectedIndex = optIndex;
				protocolSelected();
				break;
			}
		}
	});

	chrome.storage.sync.get("minTelVal", function (obj) {
		document.getElementById("minTel").value = (obj.minTelVal != undefined) ? obj.minTelVal : 8;
	});
	
	chrome.storage.sync.get("maxTelVal", function (obj) {
		document.getElementById("maxTel").value = (obj.maxTelVal != undefined) ? obj.maxTelVal : 20;
	});
	
	chrome.storage.sync.get("useSlashes", function (obj) {
		document.getElementById("r_slashes").checked = (obj.useSlashes != undefined) ? obj.useSlashes : 1;
	});
	
	chrome.storage.sync.get("replaceList", function (obj) {
		replaceList = (obj.replaceList != undefined) ? JSON.parse(obj.replaceList) : {};
		document.getElementById("r_enable").checked = replaceList["enable"];
		
		r_types.forEach(function(type) {
			document.getElementById("r_" + type).checked = replaceList[type];
		});
		
		protocolSelected();
	});
}

function saveOptions() {
	protocol = document.getElementById("protocol").value;
	chrome.storage.sync.set({'protocol': protocol});
	
	var slashes = document.getElementById("r_slashes").checked;
	chrome.storage.sync.set({'useSlashes': slashes});
	
	chrome.storage.sync.get("replaceList", function (obj) {
		replaceList = (obj.replaceList != undefined) ? JSON.parse(obj.replaceList) : {};
		replaceList["enable"] = document.getElementById("r_enable").checked;
		
		r_types.forEach(function(type) {
			replaceList[type] = document.getElementById("r_" + type).checked;
		});
		
		chrome.storage.sync.set({'replaceList': JSON.stringify(replaceList)});
	});
	
	var minTelVal = document.getElementById("minTel").value;
	var maxTelVal = document.getElementById("maxTel").value;

	if ((minTelVal.replace(/\d/g,'').length == 0) && (maxTelVal.replace(/\d/g,'').length == 0)) {
		if (!isNaN(minTelVal) && !isNaN(maxTelVal)) {
			if(parseInt(minTelVal) <= parseInt(maxTelVal)) {
				chrome.storage.sync.set({'minTelVal': minTelVal});
				chrome.storage.sync.set({'maxTelVal': maxTelVal});
				//location.reload();
			} else {
				document.getElementById("errorStr").textContent = "Error: 'Max' value must be equal or greater than 'Min' value.";
			}
		} else {
			document.getElementById("errorStr").textContent = "Error: Invalid value.";
		}
	} else {
		document.getElementById("errorStr").textContent = "Error: Invalid value.";
	}
}

function eraseOptions() {
	chrome.storage.sync.clear();
	location.reload();
}

function protocolSelected() {
	if (document.getElementById("r_enable").checked) {
		protReplaceSetter(true);
		protocol = document.getElementById("protocol").value;
		document.getElementById("r_" + protocol).disabled = true;
	}
	var protDivs = document.getElementsByClassName("protClass");
	for(var i=0; i<protDivs.length; i++) {
		protDivs[i].textContent = protocol + ":";
	}
}

function slashesSelected() {
	var slashDivs = document.getElementsByClassName("slashClass");
	for(var i=0; i<slashDivs.length; i++) {
		slashDivs[i].textContent = (document.getElementById("r_slashes").checked) ? "//" : "";
	}
}

function protocolReplacement(obj) {
	if (obj.target.checked) {
		protocolSelected();
	} else {
		protReplaceSetter(false);
	}
}

function protReplaceSetter(isEnabled) {
	r_types.forEach(function(type) {
			document.getElementById("r_" + type).disabled = !isEnabled;
	});
}