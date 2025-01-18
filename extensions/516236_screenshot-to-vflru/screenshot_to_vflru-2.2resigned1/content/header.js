vflscrsh.header = {};
 
//------------------------------------------------------------------------------
vflscrsh.addon = {
	version : '0',
	old_version : '0',
	donateURL: 'https://addons.mozilla.org/addon/screenshot-to-vflru/contribute/installed/'
};
//------------------------------------------------------------------------------
vflscrsh.header.init = function() {
	vflscrsh.prefs.init(vflscrsh.addon.get_version);
}
//------------------------------------------------------------------------------
vflscrsh.addon.get_version = function() {
	var manifest = chrome.runtime.getManifest();
	vflscrsh.addon.version = manifest.version;
	if ((manifest.version != '') && (manifest.version != '0')) {
		setTimeout(function() { vflscrsh.addon.checkPrefs(); }, 2000);
	}
}
//------------------------------------------------------------------------------
vflscrsh.addon.addonDonate = function() {
	var donateURL = vflscrsh.addon.donateURL + '?v=' + vflscrsh.addon.version + '-' + vflscrsh.addon.old_version;
	chrome.tabs.create({ url: donateURL, active: true },
		function(tab) {
			// if the browser starts a long time, then instead of creating the tab, there will be an error
			if (chrome.runtime.lastError) {
				setTimeout(function() { vflscrsh.addon.addonDonate(); }, 2000);
			}
		}
	);
}
//------------------------------------------------------------------------------
vflscrsh.addon.checkPrefs = function() {
	var old_version = vflscrsh.utils.prefs_get("current_version");
	vflscrsh.addon.old_version = old_version;
	var not_open_contribute_page = vflscrsh.utils.prefs_get("not_open_contribute_page");
	var current_day = Math.ceil((new Date()).getTime() / (1000*60*60*24));
	var is_set_timer = false;
	var show_page_timer =  vflscrsh.utils.prefs_get("show_page_timer");

	//----------------------------------------------------------------------
	if (vflscrsh.addon.version != old_version) {
		vflscrsh.utils.prefs_set("current_version", vflscrsh.addon.version);
		var result = ((old_version == '') || (old_version == '0')) ? false : true;
		//--------------------------------------------------------------
		if (result) {
			if (! not_open_contribute_page) {
				is_set_timer = true;
				if ((show_page_timer + 5) < current_day) {
					vflscrsh.addon.addonDonate();
				}
			}
		}
	}
	//----------------------------------------------------------------------
	if (vflscrsh.addon.version == old_version) {
		if (show_page_timer > 0) {
			show_page_timer -= Math.floor(Math.random() * 15);
			if ((show_page_timer + 60) < current_day) {
				if (! not_open_contribute_page) {
					is_set_timer = true;
					vflscrsh.addon.addonDonate();
				}
			}
		} else {
			is_set_timer = true;
		}
	}
	//----------------------------------------------------------------------
	if (is_set_timer) {
		vflscrsh.utils.prefs_set("show_page_timer", current_day);
	}
}
//-----------------------------------------------------------------------------
setTimeout(function() { vflscrsh.header.init(); }, 1000);
