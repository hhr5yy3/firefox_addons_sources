function saveOptions(e) {
	// Don't submit the form
	e.preventDefault();
  	
	document.getElementById("generalerror").style.display = "none";
	document.getElementById("errornote").style.display = "none";
	document.getElementById("activitylist").style.display = "none";
  
	// Validate entries
	if (document.querySelector("#redmineurl").value.substring(0,4).toLowerCase()!="http") {
		document.getElementById("generalerror").innerHTML = "The Redmine URL should start with http or https.";
		document.getElementById("generalerror").style.display = "block";
	
		return;
	}
  
	if (document.querySelector("#apikey").value.length < 3) {
		document.getElementById("generalerror").innerHTML = "The API key is too short.";
		document.getElementById("generalerror").style.display = "block";
	
		return;
	}
  
	if (!Number.isInteger(Number.parseInt(document.querySelector("#roundto").value))) {
		document.getElementById("generalerror").innerHTML = "The 'Round time up to nearest' option must be an integer.";
		document.getElementById("generalerror").style.display = "block";
	  
		return;
	}
  
	if (!Number.isInteger(Number.parseInt(document.querySelector("#minimum").value))) {
		document.getElementById("generalerror").innerHTML = "The 'Minimum time entry' option must be an integer.";
		document.getElementById("generalerror").style.display = "block";
	  
		return;
	}
  
	// Ask for permissions to Redmine URL
	// The browser handles whether we already have permission or not and asks accordingly
	const permissionsToRequest = {
		origins: [getredmineurl() + "/*"]
	}

	function onResponse(response) {
		if (response) {
			console.log("Permission was granted");
			// Save preferences
			saveprefs();
		} else {
			console.log("Permission was refused");
			document.getElementById("generalerror").innerHTML = "You must allow permission to communicate with the Redmine URL or this tool can't work. Please re-save and allow permissions.";
			document.getElementById("generalerror").style.display = "block";
			
			// ***** WARNING: FOR DEVELOPMENT ONLY *****
			// This saves prefs even if you deny permission to the URL. This is needed to test what happens if background.js doesn't have permission to save to Redmine and you start recording anyway
			//saveprefs();
		}
		return browser.permissions.getAll();  
	}

	browser.permissions.request(permissionsToRequest)
		.then(onResponse)
		.then((currentPermissions) => {
			console.log(`Current permissions:`, currentPermissions);
		});
}


function saveprefs() {
	// Save
  
  browser.storage.sync.set({
    redmineurl: document.querySelector("#redmineurl").value,
	apikey: document.querySelector("#apikey").value,
	activitycode: document.querySelector("#activity").value,
	getcomments: document.querySelector("#getcomments").checked,
	timecomments: document.querySelector("#timecomments").checked,
	buttonsize: document.querySelector("#buttonsize").value,
	roundto: Number.parseInt(document.querySelector("#roundto").value),
	minimum: Number.parseInt(document.querySelector("#minimum").value)
  });
  
  compareRedmineURL = getredmineurl();
  
  savednote.style.display = "block";
  setTimeout(function(){ savednote.style.display = "none" }, 4000);
}

function restoreOptions() {
	console.log("Restoring options from storage");
	
  function setCurrentChoice(result) {
    document.querySelector("#redmineurl").value = result.redmineurl || "http://www.yourredmine.com";
	document.querySelector("#apikey").value = result.apikey || "";
	document.querySelector("#activity").value = result.activitycode || "1";
	document.querySelector("#getcomments").checked = result.getcomments || false;
	document.querySelector("#timecomments").checked = result.timecomments || false;
	document.querySelector("#buttonsize").selectedIndex = result.buttonsize;
	document.querySelector("#roundto").value = result.roundto || "1";
	document.querySelector("#minimum").value = result.minimum || "0";
	
	compareRedmineURL = getredmineurl();
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  var getting = browser.storage.sync.get();
  getting.then(setCurrentChoice, onError);
}

function getredmineurl() {
	
	var str = document.querySelector("#redmineurl").value;
	if(str.substr(-1) == '/') {
        return str.substr(0, str.length - 1);
    }
    return str;
}

function getActivities() {
	
	document.getElementById("generalerror").style.display = "none";
	
	if (compareRedmineURL!=getredmineurl()) {
		
		document.getElementById("generalerror").innerHTML = "You entered a new Redmine URL. Please save your preferences before setting the activity code.";
		document.getElementById("generalerror").style.display = "block";
		
	} else {
  	console.log("Getting list of activities from Redmine");
	
  	var sendtoredmine = new XMLHttpRequest();
  	sendtoredmine.addEventListener("load", activitiesFromRedmine);
  	sendtoredmine.addEventListener("error", redmineError);
  	// NOTE: Possible that other browsers don't implement load and error. Might have to use the old way: https://www.kirupa.com/html5/making_http_requests_js.htm
  	sendtoredmine.open("GET", getredmineurl()+"/enumerations/time_entry_activities.json");
	
  	sendtoredmine.setRequestHeader("Content-type", "application/json");
  	sendtoredmine.setRequestHeader("X-Redmine-API-Key", document.querySelector("#apikey").value);
	
  	//sendtoredmine.responseType = "json";
	
  	sendtoredmine.send();
	}
	
}

function activitiesFromRedmine(json) {
	console.log("response: " + json.target.responseText);
	
	json = JSON.parse(json.target.responseText);
	
	var activitylist = document.getElementById("activitylist");
	
	// Clean out whatever is in there (so we don't add the list over and over each time they click the button)
	activitylist.innerHTML = "";
	document.getElementById("errornote").style.display = "none";
	
	for(var i=0;i<json.time_entry_activities.length;i++){
        
		var actp = document.createElement("span");
		actp.style.marginRight="10px";
		
		var acta = document.createElement("A");
		acta.href = "#";
		acta.id = json.time_entry_activities[i].id;
		acta.onclick = function() { saveActivity(this.id); return false; };
		var acttext = document.createTextNode(json.time_entry_activities[i].name);
		
		// Put text in the link, and the link in the span (button), and the button in the list
		acta.appendChild(acttext);
		actp.appendChild(acta);
		activitylist.appendChild(actp);
    }
	
	activitylist.style.display = "block";
}

function saveActivity(activity) {
	document.querySelector("#activity").value = activity;
}

function redmineError(response) {
	
	console.log("Error on posting to Redmine");
	document.getElementById("errornote").style = "display: block;";
	
}

// Get the current Redmine URL to check against (to see if they changed it later)
var compareRedmineURL = "";

document.addEventListener("DOMContentLoaded", restoreOptions);
document.getElementById("saveoptions").addEventListener("click", saveOptions);
document.getElementById("getactivities").addEventListener("click", getActivities);