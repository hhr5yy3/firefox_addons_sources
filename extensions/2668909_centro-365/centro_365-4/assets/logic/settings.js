//	Name:		   settings.js
//	Description:   Saves and loads user Settings from storage
//	Author:        Sean O'Sullivan.

// Save settings to storage

function save_settings() {
  
  // Set the variables
  
  /// Default section
  var option_defaultsection = document.getElementById('option_defaultsection').value;
  
  /// Sidebar
  var showbutton_m365admin = document.getElementById('showbutton_m365admin').checked;
  var showbutton_m365apps = document.getElementById('showbutton_m365apps').checked;
  var showbutton_azureAD = document.getElementById('showbutton_azureAD').checked;
  var showbutton_entragsa = document.getElementById('showbutton_entragsa').checked;
  var showbutton_azurePortal = document.getElementById('showbutton_azurePortal').checked;
  var showbutton_comply = document.getElementById('showbutton_comply').checked;
  var showbutton_endpointmgr = document.getElementById('showbutton_endpointmgr').checked;
  var showbutton_exchange = document.getElementById('showbutton_exchange').checked;
  var showbutton_onedrive = document.getElementById('showbutton_onedrive').checked;
  var showbutton_powerplatform = document.getElementById('showbutton_powerplatform').checked;
  var showbutton_seccomp = document.getElementById('showbutton_seccomp').checked;
  var showbutton_sharepoint = document.getElementById('showbutton_sharepoint').checked;
  var showbutton_stream = document.getElementById('showbutton_stream').checked;
  var showbutton_teams = document.getElementById('showbutton_teams').checked;
  var showbutton_troubleshooting = document.getElementById('showbutton_troubleshooting').checked;
  var showbutton_yammer = document.getElementById('showbutton_yammer').checked;
  var showbutton_cloudappsecurity = document.getElementById('showbutton_cloudappsecurity').checked;
  var showbutton_lighthouse = document.getElementById('showbutton_lighthouse').checked;
  var showbutton_favourites = document.getElementById('showbutton_favourites').checked;
  
  // Search Style
  
  var option_searchstyle = document.getElementById('option_searchstyle').value;

  // Save to storage
  
  chrome.storage.sync.set({
    defaultsection: option_defaultsection,
    searchstyle: option_searchstyle,
    button_m365admin: showbutton_m365admin,
    button_m365apps: showbutton_m365apps,
    button_azureAD: showbutton_azureAD,
    button_entragsa: showbutton_entragsa,
    button_azurePortal: showbutton_azurePortal,
    button_comply: showbutton_comply,
    button_endpointmgr: showbutton_endpointmgr,
    button_exchange: showbutton_exchange,
    button_onedrive: showbutton_onedrive,
    button_powerplatform: showbutton_powerplatform,
    button_seccomp: showbutton_seccomp,
    button_sharepoint: showbutton_sharepoint,
    button_stream: showbutton_stream,
    button_teams: showbutton_teams,
    button_troubleshooting: showbutton_troubleshooting,
    button_yammer: showbutton_yammer,
    button_cloudappsecurity: showbutton_cloudappsecurity,
    button_lighthouse: showbutton_lighthouse,
    button_favourites: showbutton_favourites
  }, function() {
	// Update status to let user know settings were saved.
	var status = document.getElementById('status');
	// status.textContent = 'Settings saved. Enjoy :)';
  // window.location.href='index.html';
	// console.info('Settings have been saved');
	setTimeout(function() {
	  status.textContent = '';
	}, 1750);
  });
}


function goto_index() {
  save_settings()
  window.location.href='index.html'
}

function goto_faveeditor() {
  save_settings()
  window.location.href='faveeditor.html'
}


// Get Settings from storage

function restore_settings() {

  // Set default values to the following
  //  option_defaultsection = show_m365admin
  //  button_m365admin = true

  chrome.storage.sync.get({
    defaultsection: 'show_m365admin',
    searchstyle: 'global',
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
	document.getElementById('option_defaultsection').value = items.defaultsection;
  document.getElementById('option_searchstyle').value = items.searchstyle;
  document.getElementById('showbutton_m365admin').checked = items.button_m365admin;
  document.getElementById('showbutton_m365apps').checked = items.button_m365apps;
  document.getElementById('showbutton_azureAD').checked = items.button_azureAD;
  document.getElementById('showbutton_entragsa').checked = items.button_entragsa;
  document.getElementById('showbutton_azurePortal').checked = items.button_azurePortal;
  document.getElementById('showbutton_comply').checked = items.button_comply;
  document.getElementById('showbutton_endpointmgr').checked = items.button_endpointmgr;
  document.getElementById('showbutton_exchange').checked = items.button_exchange;
  document.getElementById('showbutton_onedrive').checked = items.button_onedrive;
  document.getElementById('showbutton_powerplatform').checked = items.button_powerplatform;
  document.getElementById('showbutton_seccomp').checked = items.button_seccomp;
  document.getElementById('showbutton_sharepoint').checked = items.button_sharepoint;
  document.getElementById('showbutton_stream').checked = items.button_stream;
  document.getElementById('showbutton_teams').checked = items.button_teams;
  document.getElementById('showbutton_troubleshooting').checked = items.button_troubleshooting;
  document.getElementById('showbutton_yammer').checked = items.button_yammer;
  document.getElementById('showbutton_cloudappsecurity').checked = items.button_cloudappsecurity;
  document.getElementById('showbutton_lighthouse').checked = items.button_lighthouse;
  document.getElementById('showbutton_favourites').checked = items.button_favourites;
  
  // console.info('m365admin checkbox reads ' + items.button_m365admin);
  // console.info('m365apps checkbox reads ' + items.button_m365apps);
  // console.info('azureAD checkbox reads ' + items.button_azureAD);
  // console.info('azurePortal checkbox reads ' + items.button_azurePortal);
  // console.info('comply checkbox reads ' + items.button_comply);
  // console.info('endpointmgr checkbox reads ' + items.button_endpointmgr);
  // console.info('exchange checkbox reads ' + items.button_exchange);
  // console.info('onedrive checkbox reads ' + items.button_onedrive);
  // console.info('powerplatform checkbox reads ' + items.button_powerplatform);
  // console.info('seccomp checkbox reads ' + items.button_seccomp);
  // console.info('sharepoint checkbox reads ' + items.button_sharepoint);
  // console.info('stream checkbox reads ' + items.button_stream);
  // console.info('teams checkbox reads ' + items.button_teams);
  // console.info('troubleshooting checkbox reads ' + items.button_troubleshooting);
  // console.info('yammer checkbox reads ' + items.button_yammer);
  // console.info('cloudappsecurity checkbox reads ' + items.button_cloudappsecurity);
  // console.info('lighthouse checkbox reads ' + items.button_lighthouse);
  // console.info('favourites checkbox reads ' + items.button_favourites)
  
  });

}

// Let's listen

// Listen for the user saving their settings
// document.getElementById('save').addEventListener('click',save_settings);
document.getElementById('savemebackbutton').addEventListener('click',goto_index);
document.getElementById('savemegotofaveeditor').addEventListener('click',goto_faveeditor);


// Restore the settings, setting the Settings page to what the users saved options are
document.addEventListener('DOMContentLoaded', restore_settings);


