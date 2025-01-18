// ******* Create and listen to timer buttons *********

var timingproject = "";
var skipoff = false;

function scopepreserver(mypath, projectname) {
	return function () {
		//console.log("Current timing project: " + timingproject + " -- Button ID (mypath): " + mypath);
		
		if ((timingproject != "") && (timingproject != mypath)) {
			// Setting skip - this is because, if both of the above are true, then we just clicked one timer button while another was already recording
			// therefore, when the first one turns off, the background script will send a notification for it, and we'll end up turning off the new one instead of the old one
			// ... the asynchronous function typically comes back after we've set new button to record, but even if it's early, the skip will still work fine.
			//console.log("Skipping the next request to turn off the timer button");
			skipoff = true;
		}
		
		if (timingproject != "") {
			// Something is timing already. Make it stop.
			// TODO: Should probably make this part of the stopTiming function instead of standalone, but watch out for resetting timingproject var
			myPort.postMessage({startorstop: "stop"});
			
			// Turn the button off
			document.getElementById(timingproject).className = "bigdiv";
			
			// Remove the timer div's text and itself
			document.getElementById("timerdiv").removeChild(document.getElementById("timerdiv").firstChild);
			document.getElementById(timingproject).removeChild(document.getElementById("timerdiv"));
		}
		if (timingproject != mypath) {
			// They started some new project (whether another was already recording or not). Start recording.
			myPort.postMessage({startorstop: "start", projectid: mypath, projectname: projectname});
			timingproject = mypath;
			//console.log("Setting classes for div ID: " + timingproject);
			document.getElementById(timingproject).className = "bigdiv recording";
			
			var timediv = document.createElement("div");
			timediv.setAttribute("id","timerdiv");
			var d = new Date();
			var t = d.toLocaleTimeString();
			var timeText = document.createTextNode("Started at " + t);
			timediv.appendChild(timeText);
			
			document.getElementById(timingproject).appendChild(timediv);
			
		} else {
			// They just turned off the same project that was recording. Reset variables.
			timingproject = "";
		}
	};
}

function stopTiming() {
	//console.log("Stop timing requested");
	
	if (timingproject != "") {
		// Something is timing already. Make it stop.
		//console.log("Something is timing -- stopping it");
		myPort.postMessage({startorstop: "stop"});
		
		// Turn the button off
		document.getElementById(timingproject).className = "bigdiv";
		
		// Remove the timer div's text and itself
		document.getElementById("timerdiv").removeChild(document.getElementById("timerdiv").firstChild);
		document.getElementById(timingproject).removeChild(document.getElementById("timerdiv"));
	}
	
	timingproject = "";
}

function loadProjects(projects) {
	// Clean out all the existing project buttons
	var projectlist = document.getElementById("projectlist");
	while (projectlist.firstChild) {
		// Remove the listener 
		projectlist.firstChild.removeEventListener("click",scopepreserver());
		
		// Remove the text inside the div
		projectlist.firstChild.removeChild(projectlist.firstChild.firstChild);
		
		// Remove the div
		projectlist.removeChild(projectlist.firstChild);
	}
	
	// Put things in alphabetical order
	projects.sort(function(first, second){
		var project1 = first.projectname.toLowerCase();
		var project2 = second.projectname.toLowerCase();
		
		if (project1 < project2) 
			{ return -1; }
		if (project1 > project2)
			{ return 1; }
		return 0; 
	});

	//console.log("Projects: " + JSON.stringify(projects));
	
	// list all the projects as buttons
	for (var i = 0; i < projects.length; i++) {
		var newdiv = document.createElement("div");
		var linkText = document.createTextNode(projects[i].projectname);
		newdiv.appendChild(linkText);
		newdiv.setAttribute("id",projects[i].projectid);
		newdiv.setAttribute("class","bigdiv");
		newdiv.addEventListener("click", scopepreserver(projects[i].projectid, projects[i].projectname));
			
		// Add the link to the parent div
		document.getElementById("projectlist").appendChild(newdiv);
		
	}
}

function setSize(buttonsize) {
	// See how big they want their buttons to be (from preferences)
	var divstyle =  "width: 275px; height: 110px; font-size: 1.2em; padding: 17px;";
	if (buttonsize==1) { divstyle="width: 200px; height: 80px; font-size: 1em; padding: 8px;"; }
	if (buttonsize==2) { divstyle="width: 140px; height: 50px; font-size: 0.7em; padding: 3px;"; }
	
	var css = document.createElement("style");
	css.type = "text/css";
	// TODO: This feature is disabled for now. See options.html
	//css.innerHTML = ".bigdiv { " + divstyle + " }";
	css.innerHTML = ".bigdiv { width: 275px; height: 110px; font-size: 1.2em; padding: 17px; }";
	document.head.appendChild(css);
}


// ******* Connect to the background script *********

var myPort = browser.runtime.connect({name:"port-projectbuttons"});

myPort.onMessage.addListener(function(m) {
	//console.log("In content script, received message from background script: ");
	//console.log(m.msgtype);
  
	switch(m.msgtype) {
		case "buttonsize":
			setSize(m.buttonsize);
			break;
		case "loadprojects":
			loadProjects(m.projects);
			break;
		case "mainbutton":
			startButtonFromMain(m.project);
			break;
		case "mainbuttonoff":
			turnOff();
			break;
		case "allprojects":
			listProjects(m.projects);
			break;
	}
});

// ******* On/Off from Main Browser Button *********

function startButtonFromMain(projectid) {
	if (document.getElementById(projectid)) {
		// Obviously we only want to do this if the project button exists for this projectid
		//console.log("Turning on a project button from the main browser button");
		
		timingproject = projectid;
		document.getElementById(timingproject).className += " recording";
		
		var timediv = document.createElement("div");
		timediv.setAttribute("id","timerdiv");
		var d = new Date();
		var t = d.toLocaleTimeString();
		var timeText = document.createTextNode("Started at " + t);
		timediv.appendChild(timeText);
		
		document.getElementById(timingproject).appendChild(timediv);
	}
}

function turnOff() {
	if (skipoff) {
		// Don't turn off the project button because we just turned it on
		skipoff = false;
	} else {
		if (timingproject != "") {
			// We only do this if a timer button was on...
			//console.log("Turning off a timer button from the main browser button");
			
			// Turn the button off
			document.getElementById(timingproject).className = "bigdiv";
			
			// Remove the timer div's text and itself
			document.getElementById("timerdiv").removeChild(document.getElementById("timerdiv").firstChild);
			document.getElementById(timingproject).removeChild(document.getElementById("timerdiv"));
			
			timingproject = "";
		}
	}
}

// ******* Listeners *********
window.onload = function() {
	document.getElementById("btnShowList").addEventListener("click",showProjectList);
	document.getElementById("btnLoadMore").addEventListener("click",loadmore);
	document.getElementById("saveprojects").addEventListener("click",saveProjects);
	document.getElementById("saveprojects2").addEventListener("click",saveProjects);
	document.getElementById("cancelprojects").addEventListener("click",cancelProjects);
	document.getElementById("cancelprojects2").addEventListener("click",cancelProjects);
	
}

// ******* Loading Add/Remove Project List *********

var iOffset=0;


function showProjectList(e, fromLoadMore = false) {
	//console.log("fromLoadMore = " + fromLoadMore);
	
	// Stop timing, just in case anything is recording.
	// Since saving a new project recreates all the timing buttons, it messes things up if one is recording during the save.
	stopTiming();
	
	if (!fromLoadMore) {
		// Put current project buttons on the list first
		//console.log("Adding current buttons to the list");
		var childDivs = document.getElementById("projectlist").getElementsByTagName("div");

		for( i=0; i< childDivs.length; i++ ) {
			projButton(childDivs[i]);
		}
	}
	
	//console.log("Telling background script to send us all projects");
	
	myPort.postMessage({startorstop: "list", offset: iOffset});
	
	// Show the list and the wait notice
	document.getElementById("addremoveprojects").style.display = "block";
	document.getElementById("wait").style.display = "block";
	document.getElementById("btnShowList").style.display = "none";
}

function projButton(pb) {
	var tempprojectname = pb.textContent;
		
	if (tempprojectname.indexOf("Started at ")>-1) {
		tempprojectname = tempprojectname.substr(0,tempprojectname.indexOf("Started at "));
	}
	
	if (tempprojectname.length>0) {
		//console.log("Adding checkbox for existing button: " + tempprojectname);
		
		createCheckbox(pb.id, tempprojectname, true);
	}
}

function listProjects(projects) {
	
	// Show the rest of the projects
	projects.forEach(addProject); 
	
	// Hide the wait notice
	document.getElementById("wait").style.display = "none";
}

function addProject(project, index) {
	
	if (project.status==1 && !document.getElementById(project.id)) {
		// We only show active projects (status=1) that aren't already a button (since existing buttons are at the top)
		createCheckbox(project.id, project.name, false)
	}
	
	// See if we need the option to load more
	if (index==99) {
		iOffset=iOffset+100;
		document.getElementById("btnLoadMore").style.display = "block";
	}
	
}

function createCheckbox(projectid, projectname, checked) {
	var newproject = document.createElement("div");
	var chk = document.createElement("input");
	chk.setAttribute("type","checkbox");
	chk.setAttribute("id","chk-" + projectid);
	chk.setAttribute("value",projectname);
	if (checked) {
		chk.setAttribute("checked","true");
	}
	
	var lbl = document.createElement("label");
	lbl.setAttribute("for","chk-" + projectid);
	
	var projectname = document.createTextNode(projectname);
	lbl.appendChild(projectname);
	
	newproject.appendChild(chk);
	newproject.appendChild(lbl);
	newproject.setAttribute("id","div-" + projectid);
	newproject.setAttribute("class","project");
	
	// Add the project to the parent div
	document.getElementById("allprojects").appendChild(newproject);
}

function loadmore(e) {
	// TODO: Consider making this automatic. When you have tons of closed projects, it ends up listing 20 or so at a time
	// And in theory, if you had 100 closed projects at the first of the list, it wouldn't show anything.
	e.preventDefault();
	document.getElementById("btnLoadMore").style.display = "none";
	showProjectList(null,true);
}

// ******* Save and Cancel *********

function saveProjects() {
	var inputs = document.querySelectorAll("input[type='checkbox']");
	var projtosave = { projects: [] };
	
	for(var i = 0; i < inputs.length; i++) {
		if (inputs[i].checked) {
			//console.log("Adding project: " + inputs[i].value);
			
			var newproj = { projectname: inputs[i].value, projectid: inputs[i].id.substring(4) };
			projtosave.projects.push(newproj);
		}
	}
	
	myPort.postMessage({startorstop: "saveprojects", projects: projtosave.projects });
	
	loadProjects(projtosave.projects);
	
	document.getElementById("addremoveprojects").style.display = "none";
	
	cleanup();
}

function cancelProjects() {
	document.getElementById("addremoveprojects").style.display = "none";
	
	cleanup();
}

function cleanup() {
	// Turn off the "Load More" stuff so it'll start at the beginning next time you click the button
	iOffset=0;
	document.getElementById("btnLoadMore").style.display = "none";
	document.getElementById("btnShowList").style.display = "block";
	
	// Remove all the checkboxes and their divs
	var allproj = document.getElementById("allprojects")
	while (allproj.firstChild) {
		// Remove the checkbox and label
		allproj.firstChild.removeChild(allproj.firstChild.firstChild);
		allproj.firstChild.removeChild(allproj.firstChild.firstChild);
		
		// Remove the div
		allproj.removeChild(allproj.firstChild);
	}
}