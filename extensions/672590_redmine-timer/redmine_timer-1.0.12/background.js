// NEW FEATURE SOMEDAY:
//  Add a feature where you can tap and hold any of your timer buttons to start a new issue in that project
//    It'll start timing if it's not already, but it won't stop timing if it was already.
//	Looked into doing this, but would have to get the project URL from the API since we don't store that in the project buttons (just ID and name)


// ********** Variables *********** //


var timeoutid = 0;
var reminderinterval = 60; 
var recording = false;
var starttime;
var issue = "";
var project = "";
var redmineprojectID = 0;
var comments = "";
var gotcomments = false;
var windowForNewTab = 0;
var apikey = "";
var gRedmineURL = "";
var gActivityCode = 1;
var gGetComments = false;
var gTimeComments = false;
var gButtonSize = 0;
var gRoundTo = 1;
var gMinimum = 0;
var gProjectList = [];
var portProjectab;

// ********** Click Handler *********** //

function handleClick(tab, projectbutton, projectbuttonname) {
	// Are we already recording time? 
	if (recording) {
		//console.log("Stopping the timer. Logging to Redmine.");
		
		// Before doing anything else, get the last focused "normal" window
		// Must do this because the user could be stopping time from the buttons popup window, or they could
		// focus the buttons window before clicking the notification to edit the entry... and if you do that, it'll open the tab in the
		// popup, which is bad. And since every function on earth is now asynchronous, we just hope the browser provides this info faster
		// than Redmine's API responds, which is probably a bad way to do things. Also FYI, using the "windowTypes" property limits us to Chrome 46+.
		
		// And after some tests, it appears filtering for windowTypes=normal doesn't actually do anything... it just returns the popup
		// So we'll have to loop through and check instead. The line below would be more efficient if it worked.
		//var lastwindow = browser.windows.getLastFocused({populate: false, windowTypes: ["normal"]});
		
		// And as of FF 62, windowTypes is ignored. So the solution above is out.
		var lastwindow = browser.windows.getAll({populate: false});
		lastwindow.then(setNewTabWindow, onError);
		
		
		// Get the time difference
		var stoptime = new Date(); 
		var totaltime = (stoptime - starttime) / 1000 / 60;
		//console.log("Total time in minutes: " + totaltime)
		
		// Make sure it's more than the minimum, if set
		if (gMinimum > 0) {
			if (totaltime < gMinimum) {
				//console.log("Recorded time is less than minimum time option. Setting time to " + gMinimum + " minutes.");
				totaltime = gMinimum ;
			}
		}
		
		// Round to nearest whatever, if that option is set
		if (gRoundTo > 1) {
			totaltime = Math.ceil(totaltime/gRoundTo)*gRoundTo;
			//console.log("Rounded to nearest " + Math.round(gRoundTo) + " minutes. Time is " + totaltime + " minutes.");
		}
		
		// Convert to hours, and round to two decimal places
		totaltime = Math.round(((totaltime / 60) + 0.00001) * 100) / 100;
		//console.log("Total time in hours: " + totaltime)
		
		
		if (gTimeComments) {
			comments = `[${toTime(starttime)}-${toTime(stoptime)}]`.trim();
		}

		// Issue or project?
		var issueorprojectlabel = "";
		var issueorprojectid = "";
		var notificationnote = "";
		
		if (issue!="") {
			issueorprojectlabel = "issue_id";
			issueorprojectid = issue;
			notificationnote = "Issue #" + issue;
		} else if (project!="") {
			issueorprojectlabel = "project_id";
			issueorprojectid = redmineprojectID;
			notificationnote = "Project identifier = " + project + " " + redmineprojectID;
			
			// We know it's a project they are turning off. Tell the popup, if it's available, just in case that button was on.
			try {
				portProjectab.postMessage({msgtype: "mainbuttonoff"});
			} catch (e) {
				//console.log("Cannot notify project button popup");
			}
		} else {
			// open new tab with form
			
			// Coerce to int
			var sanitizedActivityCode = +gActivityCode;
			
			//console.log("Activity is: " + sanitizedActivityCode);
			
			
			// TODO: Attach minute converter to this page (awaiting ability to dynamically attach page scripts)
			
			// This creates in the current window by default. That's good, because you can't get here from a project button, so you must have clicked the browser button.
			//console.log("Ignoring Window ID because they clicked the browser button");
			var creating = browser.tabs.create({
				active: true,
				url: getredmineurl()+"/time_entries/new"
			});
			creating.then((tabs) => {
				var executing = browser.tabs.executeScript({
					code: "var hourfield = document.getElementById('time_entry_hours'); if (hourfield) {	hourfield.value = \"" + totaltime + "\"; } var activityfield = document.getElementById('time_entry_activity_id'); if (activityfield) { for(var i = 0;i < activityfield.options.length;i++){ if(activityfield.options[i].value == " + sanitizedActivityCode + "){ activityfield.options[i].selected = true;	} } } var commentfield = document.getElementById('time_entry_comments');   if (commentfield) { commentfield.value = \"" + comments + "\"; }"
				});
				executing.then(onExecuted, onError);
			});			
						
			stopandcleanup();
			return;
		}
		
		// Create submission for Redmine
		var toredmine = "";
		if (issue!="") {
			toredmine = JSON.stringify({"time_entry": {"issue_id":issueorprojectid, "hours":totaltime, "activity_id":gActivityCode, "comments":comments}});
		} else {
			toredmine = JSON.stringify({"time_entry": {"project_id":issueorprojectid, "hours":totaltime, "activity_id":gActivityCode, "comments":comments}});
		}
		
		//console.log("For Redmine: " + toredmine);
		
		// Submit to Redmine
		var sendtimetoredmine = new XMLHttpRequest();
		
		sendtimetoredmine.onreadystatechange = function() {
			if (this.readyState == 4) {
				//console.log("HTTP status: " + this.status);
				//console.log("Response text: " + this.responseText);
				var myArr;
				if (this.status==404) {
					myArr = JSON.parse('{"errors":{"Redmine URL unreachable or not found"}}');
				} else {
					try {
						myArr = JSON.parse(this.responseText);
					} catch(err) {
						myArr = JSON.parse('{"errors":["Redmine did not respond. Make sure you 1) are online and 2) have granted permissions to the Redmine URL in extension Options."]}');
					}
				}
				replyFromRedmine(myArr, this.status);
			}
		};
		
		sendtimetoredmine.open("POST", getredmineurl()+"/time_entries.json");
		
		sendtimetoredmine.setRequestHeader("Content-type", "application/json");
		sendtimetoredmine.setRequestHeader("X-Redmine-API-Key", currentapikey());
		
		//console.log("Sending post to " + getredmineurl()+"/time_entries.json");
		
		sendtimetoredmine.send(toredmine);
		
		stopandcleanup();
			
		
	} else { // We are not recording, so start
		
		// Make sure they have an API key
		if (currentapikey()=="") {
			//console.log("They didn't put in an API key.");
			
			browser.notifications.create("redmine-recorded-time", {
				"type": "basic",
				"iconUrl": browser.extension.getURL("icons/timer.svg"),
				"title": "No API Key",
				"message": "Please put in your API key. You can get this from your User page in Redmine."
			  });
						
			// exit function
			return;
		}
		
		
		// Begin the process of tracking the start time and project
		
		// record the start time
		starttime = new Date(); 
		
		// figure out what they want to record
		if (typeof projectbutton == "string") {
			// They tapped a button
			project = projectbuttonname;
			redmineprojectID = projectbutton;
			
			//console.log("Got project from button: " + project + ", (" + typeof projectbutton + ")");
			
		} else {
			// Figure it out from the URL, if possible
			
		
			// Ask for permission to Redmine URL -- NOTE: We have to do this here because it can only be called from a user input handler -- project buttons don't count
			// This is necessary for people who have upgraded from an old version that asked for all hosts permission
			const permissionsToRequest = {
				origins: [getredmineurl() + "/*"]
			}

			function onPermissionsResponse(response) {
				if (response) {
					//console.log("Permission was granted");
				} else {
					//console.log("Permission was refused");
					browser.notifications.create("redmine-recorded-time", {
						"type": "basic",
						"iconUrl": browser.extension.getURL("icons/timer.svg"),
						"title": "Grant Permissions",
						"message": "Please stop recording, restart recording, and grant permissions to your Redmine URL. Without this permission, no time will be saved."
					  });
					
				}
				return browser.permissions.getAll();  
			}

			browser.permissions.request(permissionsToRequest)
				.then(onPermissionsResponse)
				.then((currentPermissions) => {
					//console.log(`Current permissions:`, currentPermissions);
				});
			
			
			// NOTE: This section is being rewritten since the URL API no longer exists in Firefox.
			// Could use something like this if my own version is junk: http://blog.stevenlevithan.com/archives/parseuri
			
			// Set up the basic variables
			var url="x";
			var redmineurl = getredmineurl();
			
			var redminepath = getpath(redmineurl);
			
			// Make sure there's a tab and a url (some special pages like about: pages don't have a URL)
			if (typeof tab.url == "string") {
				url = tab.url
			}
			
			//console.log('active: ' + url);
						
			// Very first, see if we're even in Redmine. You could be on some random page like www.google.com/projects and we don't want to try to track that
			if (url.length > redmineurl.length) {
				// See if the current URL is longer than the Redmine URL -- if not, then we're not in any Redmine subpage (could be on the Redmine homepage, but that doesn't matter for recording)
				// Then see if the left part of URL = the Redmine URL
				var formatch = redmineurl.length;
				
				if (url.substr(0, formatch).replace(/http\:\/\/|https\:\/\//i,"") != redmineurl.replace(/http\:\/\/|https\:\/\//i,"")) {
					// We have to strip out the http(s) from both since they could use both protocols inconsistently
					//console.log("Not currently on Redmine page (URLs do not match)");
					url = "http://nothing.xyz";
				}
			} else {
				//console.log("Not currently on Redmine page (current URL too short)");
				// setting the current URL to any fake URL without a path will effectively stop anything else from working, since no rules will match the path
				url = "http://nothing.xyz";
			}
						
			// First must check if Redmine was installed in a folder, because...
			// parsing the path would fail if their Redmine URL has "projects" or "issues" as a folder name, like http://localhost/projects/ (as the root of Redmine)
			// because there would be two instances of "projects" or "issues" in the URL, and it would just use the first one. We can't assume the last instance since I guess you could have a project named "projects" or the like.
			// And this is what you get for parsing strings. Oh well.
			var pathsplit = getpath(url).split("/");
			
			var pathstartindex = 1;
			if (redminepath != "/") {
				pathstartindex = redminepath.split("/").length;
				//console.log("pathstartindex: " + pathstartindex);
			}
			
			
			if (pathsplit[pathstartindex]=="issues" && pathsplit.length>pathstartindex+1) {
				//console.log("Start timing on an issue");
				
				// NOTE: You cannot assume the issue number is in a fixed place
				// since you could have Redmine in a folder like http://localhost/redmine
				// nor can you assume the issue number will always be last, due to URLs like http://redmine.com/issues/39852/time_entries/new
				// so the best solution is to move to the item in the array after the thing you're looking for (/issues/ or /projects/)
				
				issue = pathsplit[pathstartindex+1];
				
				// Get rid of anything that's not an integer, like a # or ? or any other junk at the end of the issue
				issue = parseInt(issue);
				
				//console.log("Issue ID: " + issue);
				
				
			} else if (pathsplit[pathstartindex]=="projects" && pathsplit.length>pathstartindex+1) {
				//console.log("Start timing on a project");
				
				project = pathsplit[pathstartindex+1];
				
				// Check for querystrings and hashes, since that breaks things
				if (project.indexOf("?")>-1) {
					project = project.substr(0,project.indexOf("?"));
				}
				if (project.indexOf("#")>-1) {
					project = project.substr(0,project.indexOf("#"));
				}
				
				//console.log("Project ID: " + project);
				
				// Get the Redmine ID to use later
				getProjectID(project);
			} else {
				//console.log("Don't know what they want to record.  Will show form later.");
						
			}
		}
		
		//console.log("Started timer. Switch the icon now.");
		browser.browserAction.setBadgeText({text:"rec"});
		var titletext = "Recording";
		if (issue!="") {
			titletext += " to issue #" + issue;
		} else if (project!="") {
			titletext += " to project " + project;
		} 
		titletext += " since " + toTime(starttime);
		browser.browserAction.setTitle({title:titletext});
		recording = true;
		
		// Stop old reminder and create a new one
		var clearAlarms = browser.alarms.clearAll();
		clearAlarms.then(makealarm);
		
 
	} // if not recording
}


// ****** Redmine response callback ******

function replyFromRedmine(response, httpstatus){
	//console.log("Header status code: " + httpstatus);
	//console.log("Response: " + JSON.stringify(response));
	
	if (httpstatus!=201) {
		var errmsg = JSON.stringify(response);
		if (JSON.stringify(response.errors)!="undefined") { errmsg = JSON.stringify(response.errors); }
		//console.log("Error: Response status was " + httpstatus);
		browser.notifications.create("redmine-submit-error", {
			"type": "basic",
			"iconUrl": browser.extension.getURL("icons/timer.svg"),
			"title": "Error submitting to Redmine",
			"message": "Error details: Status code " + httpstatus + ": " + errmsg
		  });

	  } else {
		//console.log("Submitted ok. Switch the icon and notify user.");
		
		var timeentryid = 0;
		var totaltime = 0;
		var notificationnote = "something (not sure what)";
		
		if (response) {
			timeentryid = response.time_entry.id;
			totaltime = response.time_entry.hours;
			
			if (response.time_entry.project) {
				notificationnote = response.time_entry.project.name;
			} 
			if (response.time_entry.issue) {
				notificationnote = "issue #" + response.time_entry.issue.id;
			}
				
		}
		//console.log("Time entry ID: " + timeentryid);
		
		if (!gGetComments) {
			// They don't want to ask for comments, so we show a notification they can click if they feel like it
			browser.notifications.create(String(timeentryid), {
				"type": "basic",
				"iconUrl": browser.extension.getURL("icons/timer.svg"),
				"title": "Time recorded",
				"message": "Recorded "+Math.round(totaltime*60)+" minutes for "+notificationnote+". Click to edit."
			  });
			  
			browser.notifications.onClicked.addListener(notificationClick);
			
		} else {
			// They do want to ask for comments, so we'll automatically open the entry for editing (adding comments)
			
			// TODO: Open this in new window if the only open window is the timer buttons popup
			// would need to set windowForNewTab to 0 and then check for that here. Same note is in one other location
			var creating = browser.tabs.create({
				active: true,
				url: getredmineurl()+"/time_entries/"+timeentryid+"/edit",
				windowId: windowForNewTab
			});
			// Call attention to this window in case it is minimized or behind something
			var windowupdating = browser.windows.update(
				windowForNewTab, 
				{ drawAttention: true }
			);
		}

		
	}	
}

// ****** Helper functions ******
function stopandcleanup() {
	// Clean up
	//console.log("Cleaning up");
	browser.browserAction.setBadgeText({text:""});
	browser.browserAction.setTitle({title:"Click to record time"});
	recording = false;
	issue = "";
	project = "";
	
	// Stop old timer and create a new one
	//console.log("Action happened -- killing reminders");
	var clearAlarms = browser.alarms.clearAll();
	clearAlarms.then(makealarm);
	
}

function getredmineurl() {
	var str = gRedmineURL;
	if(str.substr(-1) == '/') {
        return str.substr(0, str.length - 1);
    }
    return str;
}


function toTime(date) {
	return date.toLocaleTimeString(undefined, {hour: 'numeric', minute: 'numeric'});
}

function currentapikey() {
	// TODO: Potentially rewrite to store API key as password. 
	//        Used a different method before browser storage sync in WebExtensions -- have not found an equivalent
	
	// (NOTE: This is the message from the pre-WebExtensions version): Jumping through hoops here to store this API key as a password
	// Have to be able to return the variable anew each time
	//console.log("Returning API key: " + apikey);
	return apikey;
}


function getpath(url) {
	//console.log("Incoming URL: " + url);
	
	pathonly="/";
	
	if (url.length > 9) {
		// Anything with http and a domain would have to be longer
		pathstarts = url.indexOf("/",8);
		
		if (pathstarts > -1) {
			pathonly = url.substr(pathstarts);
		}
	}
	
	//console.log("Just the path: " + pathonly);
	
	return pathonly;
}

function onError(error) {
	//console.log(`Error: ${error}`);
}

function onExecuted(result) {
  //console.log("It executed the script to fill the time form.");
}


function getProjectID(projectName) {
	// Gets the project ID from the project URL
	// Not really sure why Redmine makes us do this... but in some versions sending the project code from the URL doesn't seem to work
	//console.log("Requesting project ID from " + getredmineurl()+"/projects/" + projectName + ".json");
	
	var sendtoredmine = new XMLHttpRequest();
		
	sendtoredmine.onreadystatechange = function() {
		if (this.readyState == 4) {
			var myArr = [];
			if (this.responseText) {
				myArr = JSON.parse(this.responseText);
			}
			projectFromRedmine(myArr, this.status);
		}
	};
	
	sendtoredmine.open("GET", getredmineurl()+"/projects/" + projectName + ".json");
	
	sendtoredmine.setRequestHeader("Content-type", "application/json");
	sendtoredmine.setRequestHeader("X-Redmine-API-Key", currentapikey());
			
	sendtoredmine.send();
	
	project = projectName;
	
}

function projectFromRedmine(response, httpstatus) {
	//console.log("Header status code: " + httpstatus);
	//console.log("Response: " + JSON.stringify(response).substring(0,600));
	
	if (httpstatus!=200) {
		//console.log("Error getting the project ID.");
		browser.notifications.create("project-id-error", {
			"type": "basic",
			"iconUrl": browser.extension.getURL("icons/timer.svg"),
			"title": "Redmine returned error",
			"message": "Redmine"
		});
	
	} else {
		redmineprojectID = response.project.id;
		//console.log("Got project ID = " + redmineprojectID);
		
		// The only time we get a project ID is when the main browser button is click and the user is on a project page
		// So notify the timer buttons, if they exist, that they clicked the main button on a project page
		// That way we can highlight that project's button if it exists
		try {
			portProjectab.postMessage({msgtype: "mainbutton", project: redmineprojectID});
		} catch (e) {
			//console.log("Cannot notify project button popup: " + e.message);
		}
		
	}
}

function notificationClick(notificationId) {
	//console.log('Time entry notification ID ' + notificationId + ' was clicked by the user');
	// TODO: Open this in new window if the only open window is the timer buttons popup
	// would need to set windowForNewTab to 0 and then check for that here. Same note is in one other location
	var creating = browser.tabs.create({
		active: true,
		url: getredmineurl()+"/time_entries/"+notificationId+"/edit",
		windowId: windowForNewTab
	});
	// Call attention to this window in case it is minimized or behind something
	var windowupdating = browser.windows.update(
		windowForNewTab, 
		{ drawAttention: true }
	);
}

function setNewTabWindow(windowInfo) {
	// There does not seem to be a way to reliably find the last-used window if you have multiple windows open.
	// Using the last one returned in the loop often works, but it doesn't account for covered or minimized windows. 
	// Also doesn't account for the rare case that you have timer buttons (popup) open with all other (normal) windows closed.
	// We'll just use choose the last one in the best state (active, then normal but not minimized, then normal but minimized, then anything including the popup)
	winfocused = 0;
	winnormal = 0;
	winminimized = 0;
	winany = 0;
	
	for (wi of windowInfo) {
		// We don't care what kind it is -- this is the emergency backup option
		winany = wi.id;
		//console.log("Window ID for new tab: " + wi.id + " type: " + wi.type + ", focused: " + wi.focused + ", state: " + wi.state);
		
		if (wi.type=="normal") {
			// We know it's normal, so now we want the focused first, then anything not minimized, then minimized as last resort
			if (wi.focused) {
				winfocused = wi.id;
			} else {
				// not focused... is it minimized?
				if (wi.state != "minimized") {
					winnormal = wi.id;
				} else {
					winminimized = wi.id;
				}
			}
			
		}
	}
	
	// Pick the best option
	windowForNewTab = winany;
	
	if (winminimized > 0) {
		windowForNewTab = winminimized;
	}
	
	if (winnormal > 0) {
		windowForNewTab = winnormal;
	}
	
	if (winfocused > 0) {
		windowForNewTab = winfocused;
	}
	
	//console.log("Will use Window ID: " + windowForNewTab);
}

// ****** Timers ******
function makereminder() {
	if (!recording) {
		
		browser.notifications.create("please-record", {
			"type": "basic",
			"iconUrl": browser.extension.getURL("icons/timer.svg"),
			"title": "Record time",
			"message": "Don't forget to record your time!"
		});
	} else {
		
		browser.notifications.create("please-stop", {
			"type": "basic",
			"iconUrl": browser.extension.getURL("icons/timer.svg"),
			"title": "Still working?",
			"message": "You have been recording for a long time. Don't forget to stop recording when finished."
		});
	}
	
	
	
}

function makealarm() {
	//console.log("Setting alarm for " + reminderinterval + " minutes.");
	const delayInMinutes  = reminderinterval;
	browser.alarms.create("redmine-timer", {
	  delayInMinutes
	});

}

// Set initial reminder to log time
//console.log("Setting the initial reminder to record time.");

makealarm();

browser.alarms.onAlarm.addListener(makereminder);




// ****** Preferences/Options ******
function loadPreferences() {
	var getting = browser.storage.sync.get();
	getting.then(onPrefChange, onError);
}

function onPrefChange(objStorage) {
	//console.log("The Redmine URL is " + objStorage.redmineurl);
	  
	apikey = objStorage.apikey;
	gRedmineURL = objStorage.redmineurl;
	gActivityCode = objStorage.activitycode;
	gGetComments = objStorage.getcomments;
	gTimeComments = objStorage.timecomments;
	gButtonSize = objStorage.buttonsize;
	gRoundTo = objStorage.roundto;
	gMinimum = objStorage.minimum;
	gProjectList = objStorage.projectlist;

	// Make sure everything is at least defined
	// There are some cases where you could accidentally get an undefined value in your preferences, and that'll jack things up
	if (typeof apikey != "string") { 
		//console.log("Bad apikey Typeof: " + typeof apikey );
		apikey = ""; 
	}
	if (typeof gRedmineURL != "string") { 
		//console.log("Bad gRedmineURL Typeof: " + typeof gRedmineURL ); 
		gRedmineURL = ""; 
	}
	if (typeof gActivityCode != "string") { 
		//console.log("Bad gActivityCode Typeof: " + typeof gActivityCode ); 
		gActivityCode = 1; 
	}
	if (typeof gGetComments != "boolean") { 
		//console.log("Bad gGetComments Typeof: " + typeof gGetComments ); 
		gGetComments = false; 
	}
	if (typeof gTimeComments != "boolean") { 
		//console.log("Bad gTimeComments Typeof: " + typeof gTimeComments ); 
		gTimeComments = false; 
	}
	if (typeof gButtonSize != "string") { 
		//console.log("Bad gButtonSize Typeof: " + typeof gButtonSize ); 
		gButtonSize = 0; 
	}
	if (typeof gRoundTo != "number") { 
		//console.log("Bad gRoundTo Typeof: " + typeof gRoundTo ); 
		gRoundTo = 1; 
	}
	if (typeof gMinimum != "number") { 
		//console.log("Bad gMinimum Typeof: " + typeof gMinimum ); 
		gMinimum = 0; 
	}
	if (typeof gProjectList != "object") { 
		//console.log("Bad gProjectList. Typeof: " + typeof gProjectList ); 
		gProjectList = []; 
	}
	
	//console.log("Activity code: " + gActivityCode);
  
  
}



// ********** Startup & Listeners *********** //
loadPreferences();
browser.storage.onChanged.addListener(loadPreferences);

browser.browserAction.onClicked.addListener(handleClick);

browser.notifications.onClosed.removeListener(notificationClick);

// Context menu to open the list of project buttons
browser.contextMenus.create({
  id: "redminetimerbuttons",
  title: "Show Redmine Timer Buttons"
});

browser.contextMenus.onClicked.addListener(function(info, tab) {
	
	
	if (info.menuItemId == "redminetimerbuttons") {
		// Ask for permission to Redmine URL
		// This is necessary for people who have upgraded from an old version that asked for all hosts permission
		// We have to do this here (again) because you can only request permissions in response to user input, and I don't feel like putting it in projectab.js, and the other check is for the main timer button
		const permissionsToRequest = {
			origins: [getredmineurl() + "/*"]
		}

		function onPermissionsResponse(response) {
			if (response) {
				//console.log("Permission was granted");
			} else {
				//console.log("Permission was refused");
				browser.notifications.create("redmine-recorded-time", {
					"type": "basic",
					"iconUrl": browser.extension.getURL("icons/timer.svg"),
					"title": "Grant Permissions",
					"message": "Please stop recording, restart recording, and grant permissions to your Redmine URL. Without this permission, no time will be saved."
				  });
				
			}
			return browser.permissions.getAll();  
		}

		browser.permissions.request(permissionsToRequest)
			.then(onPermissionsResponse)
			.then((currentPermissions) => {
				//console.log(`Current permissions:`, currentPermissions);
			});
			
		// Now actually do the popup
		var popupURL = browser.extension.getURL("projectab.html");

		var creating = browser.windows.create({
			url: popupURL,
			type: "popup",
			height: 500,
			width: 800
		});
		creating.then(onCreatedPop, onErrorPop);
	}
});


function onCreatedPop(windowInfo) {
  //console.log("Created window: " + windowInfo.id + " " + windowInfo.type);
}

function onErrorPop(error) {
  //console.log(`Error: ${error}`);
}



// ********** Project List System *********** //
// This may be impossible to duplicate exactly until the system allows dynamically adding content scripts
// https://developer.mozilla.org/en-US/Add-ons/WebExtensions/manifest.json/content_scripts
// Since we don't know the URL of the person's Redmine instance, we have no way to list it in the manifest.
// Short of adding the script to every URL that ends in "projects", there's no way to attach it
// The workaround is to make the project popup come from a context menu item rather than attaching to the page

function connected(p) {
  portProjectab = p;
  
  // Initialize tab
  portProjectab.postMessage({msgtype: "buttonsize", buttonsize: gButtonSize});
  portProjectab.postMessage({msgtype: "loadprojects", projects: gProjectList});
  
  if (project != "") {
	  // A project is already recording -- send it over so we can highlight that button, if it exists
	  portProjectab.postMessage({msgtype: "mainbutton", project: redmineprojectid});
  }
  // Listen for button click events
  portProjectab.onMessage.addListener(function(m) {
    //console.log("In background script, received message from Project Buttons:")
    //console.log(m.startorstop);
	
	switch(m.startorstop) {
		case "start":
			startstopfrombuttons(m.projectid, true, m.projectname);
			break;
		case "stop":
			startstopfrombuttons("", false);
			break;
		case "list":
			sendProjectList(m.offset);
			break;
		case "saveprojects":
			saveProjects(m.projects);
			break;
	}
	
  });
}

browser.runtime.onConnect.addListener(connected);

function startstopfrombuttons(projectid, start, projectname) {
	//console.log("Received start/stop command for: " + projectname + ". Start?: " + start);
	if (start) {
		if (recording) {
			// If we are already recording and we got a start command, that means we're in the unusual scenario where
			// they started timing from the browser button and then clicked a project button.
			// So we need to stop recording first... otherwise we'll get out of sync.
			handleClick();
		}
		// pass the project ID so it can start
		handleClick(false,projectid,projectname);
	} else {
		// They're stopping, so we don't have to pass anything
		handleClick();
	}
}

function sendProjectList(offset) {
	//console.log("Requesting all projects from " + getredmineurl()+"/projects.json?offset=" + offset + "&limit=100");
	
	var sendtoredmine = new XMLHttpRequest();
		
	sendtoredmine.onreadystatechange = function() {
		if (this.readyState == 4) {
			var myArr = {error:"No response from Redmine"};
			if (this.responseText) {
				myArr = JSON.parse(this.responseText);
			}
			//console.log("Response from Redmine: " + myArr);
			
			allProjectsFromRedmine(myArr, this.status);
		}
	};
	
	sendtoredmine.open("GET", getredmineurl()+"/projects.json?offset=" + offset + "&limit=100");
	
	sendtoredmine.setRequestHeader("Content-type", "application/json");
	sendtoredmine.setRequestHeader("X-Redmine-API-Key", currentapikey());
			
	sendtoredmine.send();
	
}


function allProjectsFromRedmine(response, httpstatus) {
	//console.log("Header status code: " + httpstatus);
	//console.log("Response: " + JSON.stringify(response).substring(0,600));
	
	// Should be getting back this: http://www.redmine.org/projects/redmine/wiki/Rest_Projects
	
	if (httpstatus!=200) {
		//console.log("Error getting your projects.");
		browser.notifications.create("all-projects-error", {
			"type": "basic",
			"iconUrl": browser.extension.getURL("icons/timer.svg"),
			"title": "Redmine returned error",
			"message": JSON.stringify(response).substring(0,600)
		});
	
	} else {
		portProjectab.postMessage({msgtype: "allprojects", projects: response.projects});
		
		//console.log("Sent list of projects:" + response.projects);
		
	}
}

function saveProjects(projects) {
	//console.log("Saving projects: " + JSON.stringify(projects));
	
	browser.storage.sync.set({
		projectlist: projects
	});
}