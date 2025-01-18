//	Name:			admincentres.js
//	Description:	Show and hide the relevant Admin Centre options
//	Author:			Sean O'Sullivan

// Variables
let admincentre_infocus; // Which Admin Centre is in focus right now? Used when exiting Search

//	Hide all DIVS except for our M365Admin, as this is the default OOBE
document.getElementById("admincentre_section_m365admin").style.display = 'block';
document.getElementById("admincentre_section_m365apps").style.display = 'none';
document.getElementById("admincentre_section_azureAD").style.display = 'none';
document.getElementById("admincentre_section_entragsa").style.display = 'none';
document.getElementById("admincentre_section_azurePortal").style.display = 'none';
document.getElementById("admincentre_section_comply").style.display = 'none';
document.getElementById("admincentre_section_endpointmgr").style.display = 'none';
document.getElementById("admincentre_section_exchange").style.display = 'none';
document.getElementById("admincentre_section_onedrive").style.display = 'none';
document.getElementById("admincentre_section_powerplatform").style.display = 'none';
document.getElementById("admincentre_section_seccomp").style.display = 'none';
document.getElementById("admincentre_section_sharepoint").style.display = 'none';
document.getElementById("admincentre_section_stream").style.display = 'none';
document.getElementById("admincentre_section_teams").style.display = 'none';
document.getElementById("admincentre_section_troubleshooting").style.display = 'none';
document.getElementById("admincentre_section_yammer").style.display = 'none';
document.getElementById("admincentre_section_cloudappsecurity").style.display = 'none';
document.getElementById("admincentre_section_lighthouse").style.display = 'none';
document.getElementById("admincentre_section_favourites").style.display = 'none';

//	Show the Admin Centres
//	1. display the Admin Centre block
//	2. Scroll back to the top of the screen
//	3. Set admincentre_infocus so we can return to this Admin Centre when the user exits Search
function show_m365admin() {
	hideAll()
	document.getElementById("admincentre_section_m365admin").style.display = 'block';
	window.scrollTo(0, 0);
	admincentre_infocus = 'show_m365admin';
	
	//console.log("Open 365 Admin");
	//console.log("Set focused Admin centre to 365 Admin");
}

function show_m365apps() {
	hideAll()
	document.getElementById("admincentre_section_m365apps").style.display = 'block';
	window.scrollTo(0, 0);
	admincentre_infocus = 'show_m365apps';
	
	//console.log("Open 365 Apps");
	//console.log("Set focused Admin centre to 365 Apps");
}
   
function show_azureAD() {
	hideAll()
	document.getElementById("admincentre_section_azureAD").style.display = 'block';
	window.scrollTo(0, 0);
	admincentre_infocus = 'show_azureAD';
	
	//console.log("Open Entra ID");
	//console.log("Set focused Admin centre to Entra ID");
}

function show_entragsa() {
	hideAll()
	document.getElementById("admincentre_section_entragsa").style.display = 'block';
	window.scrollTo(0, 0);
	admincentre_infocus = 'show_entragsa';
	
	//console.log("Open Entra Global Secure Access");
	//console.log("Set focused Admin centre to Entra Global Secure Access");
}

function show_azurePortal() {
	hideAll()
	document.getElementById("admincentre_section_azurePortal").style.display = 'block';
	window.scrollTo(0, 0);
	admincentre_infocus = 'show_azurePortal';
	
	//console.log("Open Azure Portal");
	//console.log("Set focused Admin centre to Azure Portal");
}

function show_comply() {
	hideAll()
	document.getElementById("admincentre_section_comply").style.display = 'block';
	window.scrollTo(0, 0);
	admincentre_infocus = 'show_comply';
	
	//console.log("Open Compliance");
	//console.log("Set focused Admin centre to Compliance");
}

function show_endpointmgr() {
	hideAll()
	document.getElementById("admincentre_section_endpointmgr").style.display = 'block';
	window.scrollTo(0, 0);
	admincentre_infocus = 'show_endpointmgr';
	
	//console.log("Open InTune");
	//console.log("Set focused Admin centre to InTune");
}

function show_exchange() {
	hideAll()
	document.getElementById("admincentre_section_exchange").style.display = 'block';
	window.scrollTo(0, 0);
	admincentre_infocus = 'show_exchange';
	
	//console.log("Open Exchange");
	//console.log("Set focused Admin centre to Exchange");
}

function show_onedrive() {
	hideAll()
	document.getElementById("admincentre_section_onedrive").style.display = 'block';
	window.scrollTo(0, 0);
	admincentre_infocus = 'show_onedrive';
	
	//console.log("Open OneDrive");
	//console.log("Set focused Admin centre to OneDrive");
}

function show_powerplatform() {
	hideAll()
	document.getElementById("admincentre_section_powerplatform").style.display = 'block';
	window.scrollTo(0, 0);
	admincentre_infocus = 'show_powerplatform';
	
	//console.log("Open Power Platform");
	//console.log("Set focused Admin centre to Power Platform");
}

function show_seccomp() {
	hideAll()
	document.getElementById("admincentre_section_seccomp").style.display = 'block';
	window.scrollTo(0, 0);
	admincentre_infocus = 'show_seccomp';
	
	//console.log("Open Secuity and Compliance");
	//console.log("Set focused Admin centre to Security and Compliance");
}

function show_sharepoint() {
	hideAll()
	document.getElementById("admincentre_section_sharepoint").style.display = 'block';
	window.scrollTo(0, 0);
	admincentre_infocus = 'show_sharepoint';
	
	//console.log("Open SharePoint");
	//console.log("Set focused Admin centre to SharePoint");
}

function show_stream() {
	hideAll()
	document.getElementById("admincentre_section_stream").style.display = 'block';
	window.scrollTo(0, 0);
	admincentre_infocus = 'show_stream';
	
	//console.log("Open Stream");
	//console.log("Set focused Admin centre to Stream");
}

function show_teams() {
	hideAll()
	document.getElementById("admincentre_section_teams").style.display = 'block';
	window.scrollTo(0, 0);
	admincentre_infocus = 'show_teams';
	
	//console.log("Open Teams");
	//console.log("Set focused Admin centre to Teams");
}

function show_troubleshooting() {
	hideAll()
	document.getElementById("admincentre_section_troubleshooting").style.display = 'block';
	window.scrollTo(0, 0);
	admincentre_infocus = 'show_troubleshooting';
	
	//console.log("Open Troubleshooting");
	//console.log("Set focused Admin centre to Troubleshooting");
}
   
function show_yammer() {
	hideAll()
	document.getElementById("admincentre_section_yammer").style.display = 'block';
	window.scrollTo(0, 0);
	admincentre_infocus = 'show_yammer';
	
	//console.log("Open Yammer");
	//console.log("Set focused Admin centre to Yammer");
}

function show_cloudappsecurity() {
	hideAll()
	document.getElementById("admincentre_section_cloudappsecurity").style.display = 'block';
	window.scrollTo(0, 0);
	admincentre_infocus = 'show_cloudappsecurity';
	
	//console.log("Open Cloud App Security");
	//console.log("Set focused Admin centre to Cloud App Security");
}

function show_lighthouse() {
	hideAll()
	document.getElementById("admincentre_section_lighthouse").style.display = 'block';
	window.scrollTo(0, 0);
	admincentre_infocus = 'show_lighthouse';
	
	//console.log("Open Microsoft 365 Lighthouse");
	//console.log("Set focused Admin centre to Microsoft 365 Lighthouse");
}

function show_favourites() {
	hideAll()
	document.getElementById("admincentre_section_favourites").style.display = 'block';
	window.scrollTo(0, 0);
	admincentre_infocus = 'show_favourites';
	
	//console.log("Open Favourites");
	//console.log("Set focused Admin centre to Favourites");
}

//	Hide all of the Admin Centres
function hideAll() {
	document.getElementById("admincentre_section_m365admin").style.display = 'none';
	document.getElementById("admincentre_section_m365apps").style.display = 'none';
	document.getElementById("admincentre_section_azureAD").style.display = 'none';
	document.getElementById("admincentre_section_entragsa").style.display = 'none';
	document.getElementById("admincentre_section_azurePortal").style.display = 'none';
	document.getElementById("admincentre_section_comply").style.display = 'none';
	document.getElementById("admincentre_section_endpointmgr").style.display = 'none';
	document.getElementById("admincentre_section_exchange").style.display = 'none';
	document.getElementById("admincentre_section_onedrive").style.display = 'none';
	document.getElementById("admincentre_section_powerplatform").style.display = 'none';
	document.getElementById("admincentre_section_seccomp").style.display = 'none';
	document.getElementById("admincentre_section_sharepoint").style.display = 'none';
	document.getElementById("admincentre_section_stream").style.display = 'none';
	document.getElementById("admincentre_section_teams").style.display = 'none';
	document.getElementById("admincentre_section_troubleshooting").style.display = 'none';
	document.getElementById("admincentre_section_yammer").style.display = 'none';
	document.getElementById("admincentre_section_cloudappsecurity").style.display = 'none';
	document.getElementById("admincentre_section_lighthouse").style.display = 'none';
	document.getElementById("admincentre_section_favourites").style.display = 'none';
}

//	When the user prefers the Global Search Style, this function is called when a search is begun
function showForGlobalSearch() {
	document.getElementById("admincentre_section_m365admin").style.display = 'block';
	document.getElementById("admincentre_section_m365apps").style.display = 'block';
	document.getElementById("admincentre_section_azureAD").style.display = 'block';
	document.getElementById("admincentre_section_entragsa").style.display = 'block';
	document.getElementById("admincentre_section_azurePortal").style.display = 'block';
	document.getElementById("admincentre_section_comply").style.display = 'block';
	document.getElementById("admincentre_section_endpointmgr").style.display = 'block';
	document.getElementById("admincentre_section_exchange").style.display = 'block';
	document.getElementById("admincentre_section_onedrive").style.display = 'block';
	document.getElementById("admincentre_section_powerplatform").style.display = 'block';
	document.getElementById("admincentre_section_seccomp").style.display = 'block';
	document.getElementById("admincentre_section_sharepoint").style.display = 'block';
	document.getElementById("admincentre_section_stream").style.display = 'block';
	document.getElementById("admincentre_section_teams").style.display = 'block';
	document.getElementById("admincentre_section_troubleshooting").style.display = 'block';
	document.getElementById("admincentre_section_yammer").style.display = 'block';
	document.getElementById("admincentre_section_cloudappsecurity").style.display = 'block';
	document.getElementById("admincentre_section_lighthouse").style.display = 'block';
}

//	Event Listeners
document.getElementById("menu_section_m365admin").addEventListener("click", show_m365admin);
document.getElementById("menu_section_m365apps").addEventListener("click", show_m365apps);
document.getElementById("menu_section_azureAD").addEventListener("click", show_azureAD);
document.getElementById("menu_section_entragsa").addEventListener("click", show_entragsa);
document.getElementById("menu_section_azurePortal").addEventListener("click", show_azurePortal);
document.getElementById("menu_section_comply").addEventListener("click", show_comply);
document.getElementById("menu_section_endpointmgr").addEventListener("click", show_endpointmgr);
document.getElementById("menu_section_exchange").addEventListener("click", show_exchange);
document.getElementById("menu_section_onedrive").addEventListener("click", show_onedrive);
document.getElementById("menu_section_powerplatform").addEventListener("click", show_powerplatform);
document.getElementById("menu_section_seccomp").addEventListener("click", show_seccomp);
document.getElementById("menu_section_sharepoint").addEventListener("click", show_sharepoint);
document.getElementById("menu_section_stream").addEventListener("click", show_stream);
document.getElementById("menu_section_teams").addEventListener("click", show_teams);
document.getElementById("menu_section_troubleshooting").addEventListener("click", show_troubleshooting);
document.getElementById("menu_section_yammer").addEventListener("click", show_yammer);
document.getElementById("menu_section_cloudappsecurity").addEventListener("click", show_cloudappsecurity);
document.getElementById("menu_section_lighthouse").addEventListener("click", show_lighthouse);
document.getElementById("menu_section_favourites").addEventListener("click", show_favourites);

// Let's load the values from storage and use them to select the right variables

chrome.storage.sync.get({
	defaultsection: 'show_m365admin',
	button_m365admin: true,
	button_m365apps: true,
	button_azureAD: true,
	button_entragsa: true,
	button_azurePortal: true,
	button_comply: true,
	button_endpointmgr: true,
	button_exchange: true,
	button_onedrive: true,
	button_powerplatform: true,
	button_seccomp: true,
	button_sharepoint: true,
	button_stream: true,
	button_teams: true,
	button_troubleshooting: true,
	button_yammer: true,
	button_cloudappsecurity: true,
	button_lighthouse: true,
	button_favourites: true
  }, function(items) {

	var option_defaultsection = items.defaultsection;
	var showbutton_m365admin = items.button_m365admin;
	var showbutton_m365apps = items.button_m365apps;
	var showbutton_azureAD = items.button_azureAD;
	var showbutton_entragsa = items.button_entragsa;
	var showbutton_azurePortal = items.button_azurePortal;
	var showbutton_comply = items.button_comply;
	var showbutton_endpointmgr = items.button_endpointmgr;
	var showbutton_exchange = items.button_exchange;
	var showbutton_onedrive = items.button_onedrive;
	var showbutton_powerplatform = items.button_powerplatform;
	var showbutton_seccomp = items.button_seccomp;
	var showbutton_sharepoint = items.button_sharepoint;
	var showbutton_stream = items.button_stream;
	var showbutton_teams = items.button_teams;
	var showbutton_troubleshooting = items.button_troubleshooting;
	var showbutton_yammer = items.button_yammer;
	var showbutton_cloudappsecurity = items.button_cloudappsecurity;
	var showbutton_lighthouse = items.button_lighthouse;
	var showbutton_favourites = items.button_favourites;
	
	// First - Lets set the default section
	// console.info('defaultsection is currently SET to ' + option_defaultsection);
	window[option_defaultsection]();
	
	// Second - What sections are we showing in the sidebar?
	if(items.button_m365admin)
		// console.info('SHOW m365admin button'),
		document.getElementById("menu_section_m365admin").style.display = 'block';
	else {
		// console.info('HIDE m365admin button');
	};
	
	if(items.button_m365apps)
		// console.info('SHOW m365apps button'),
		document.getElementById("menu_section_m365apps").style.display = 'block';
	else {
		// console.info('HIDE m365apps button');
	}
	
	if(items.button_azureAD)
		// console.info('SHOW azureAD button'),
		document.getElementById("menu_section_azureAD").style.display = 'block';
	else {
		// console.info('HIDE azureAD button');
	}
	
	if(items.button_entragsa)
		// console.info('SHOW entragsa button'),
		document.getElementById("menu_section_entragsa").style.display = 'block';
	else {
		// console.info('HIDE entragsa button');
	}
	
	if(items.button_azurePortal)
		// console.info('SHOW azurePortal button'),
		document.getElementById("menu_section_azurePortal").style.display = 'block';
	else {
		// console.info('HIDE azurePortal button');
	}
	
	if(items.button_comply)
		// console.info('SHOW comply button'),
		document.getElementById("menu_section_comply").style.display = 'block';
	else {
		// console.info('HIDE comply button');
	}
	
	if(items.button_endpointmgr)
		// console.info('SHOW endpointmgr button'),
		document.getElementById("menu_section_endpointmgr").style.display = 'block';
	else {
		// console.info('HIDE endpointmgr button');
	}
	
	if(items.button_exchange)
		// console.info('SHOW exchange button'),
		document.getElementById("menu_section_exchange").style.display = 'block';
	else {
		// console.info('HIDE exchange button');
	}
	
	if(items.button_onedrive)
		// console.info('SHOW onedrive button'),
		document.getElementById("menu_section_onedrive").style.display = 'block';
	else {
		// console.info('HIDE onedrive button');
	}
	
	if(items.button_powerplatform)
		// console.info('SHOW powerplatform button'),
		document.getElementById("menu_section_powerplatform").style.display = 'block';
	else {
		// console.info('HIDE powerplatform button');
	}
	
	if(items.button_seccomp)
		// console.info('SHOW seccomp button'),
		document.getElementById("menu_section_seccomp").style.display = 'block';
	else {
		// console.info('HIDE seccomp button');
	}
	
	if(items.button_sharepoint)
		// console.info('SHOW sharepoint button'),
		document.getElementById("menu_section_sharepoint").style.display = 'block';
	else {
		// console.info('HIDE sharepoint button');
	}
	
	if(items.button_stream)
		// console.info('SHOW stream button'),
		document.getElementById("menu_section_stream").style.display = 'block';
	else {
		// console.info('HIDE stream button');
	}
	
	if(items.button_teams)
		// console.info('SHOW teams button'),
		document.getElementById("menu_section_teams").style.display = 'block';
	else {
		// console.info('HIDE teams button');
	}
	
	if(items.button_troubleshooting)
		// console.info('SHOW troubleshooting button'),
		document.getElementById("menu_section_troubleshooting").style.display = 'block';
	else {
		// console.info('HIDE troubleshooting button');
	}
	
	if(items.button_yammer)
		// console.info('SHOW yammer button'),
		document.getElementById("menu_section_yammer").style.display = 'block';
	else {
		// console.info('HIDE yammer button');
	}
	
	if(items.button_cloudappsecurity)
	// console.info('SHOW cloudappsecurity button'),
	document.getElementById("menu_section_cloudappsecurity").style.display = 'block';
	else {
		// console.info('HIDE cloudappsecurity button');
	}
	
	if(items.button_lighthouse)
	// console.info('SHOW lighthouse button'),
	document.getElementById("menu_section_lighthouse").style.display = 'block';
	else {
		// console.info('HIDE lighthouse button');
	}

	if(items.button_favourites)
	// console.info('SHOW favourites button'),
	document.getElementById("menu_section_favourites").style.display = 'block';
	else {
		// console.info('HIDE favourites button');
	}
	

  });
