var vflscrsh = {};
vflscrsh.tab_list = {};
vflscrsh.set_context_menu_timer = null;
vflscrsh.main_context_menu = false;
vflscrsh.saveAsMHTML = false;
//------------------------------------------------------------------------------
vflscrsh.init = function() {
	if (chrome.pageCapture && chrome.pageCapture.saveAsMHTML) {
		vflscrsh.saveAsMHTML = true;
	}
	vflscrsh.set_context_menu();
}
//------------------------------------------------------------------------------
vflscrsh.set_context_menu = function() {
	if (vflscrsh.set_context_menu_timer) {
		clearTimeout(vflscrsh.set_context_menu_timer);
	}
	vflscrsh.set_context_menu_timer = setTimeout(function(){ vflscrsh.set_context_menu_init(); }, 500);
}
//------------------------------------------------------------------------------
vflscrsh.set_context_menu_init = function() {
	vflscrsh.set_context_menu_timer = null;

	//------------------------------------------------------------------------
	if (! vflscrsh.utils.prefs_get('showInContextMenu')) {
		chrome.contextMenus.removeAll(function() {});
		vflscrsh.main_context_menu = false;
		return;
	}
	//------------------------------------------------------------------------
	else {
		chrome.tabs.query({  active: true, currentWindow: true }, function(tab_list) {
			if (tab_list && tab_list.length && tab_list[0].id) {
				//-----------------------------------------------------
				if (vflscrsh.main_context_menu) {
					vflscrsh.set_context_menu_actions(tab_list[0].id);
				}
				//-----------------------------------------------------
				else {
					chrome.contextMenus.create({
						id: 'vflscrsh_context_popup',
						type : 'normal',
						title : vflscrsh.utils.get_string('extension_name'),
						contexts: ["all"]
					}, function() {
						vflscrsh.main_context_menu = true;
						vflscrsh.set_context_menu_actions(tab_list[0].id);
					});
				}
			}
		});
	}
}
//------------------------------------------------------------------------------
vflscrsh.set_context_menu_actions = function(tabId) {
	chrome.tabs.executeScript(tabId, { 'file' : '/content/check_tab.js', 'runAt' : 'document_start' }, function(callback) {
		var menu_is_inactive = false;
		//------------------------------------------------------------------
		if (chrome.runtime.lastError) {
			menu_is_inactive = true;
		}
		//------------------------------------------------------------------
		vflscrsh.remove_context_menu(
			[ 'vflscrsh_context_last_operation', 'vflscrsh_context_last_operation_separator', 'vflscrsh_context_save_popup', 'vflscrsh_context_save_mhtml_popup', 'vflscrsh_context_copy_popup', 'vflscrsh_context_upload_popup', 'vflscrsh_context_preview_popup', 'vflscrsh_context_settings_separator', 'vflscrsh_context_settings' ], 
			function(){
				vflscrsh.set_context_menu_actions_init(menu_is_inactive);
			}
		);
	});
}
//------------------------------------------------------------------------------
vflscrsh.remove_context_menu = function(menu_list, callback) {
	var menu_id = menu_list.shift();

	try {
		chrome.contextMenus.remove(menu_id, function(){
			if (chrome.runtime.lastError) {};
			if (menu_list.length > 0) {
				vflscrsh.remove_context_menu(menu_list, callback);
			} else if (callback) {
				callback();
			}
		});
	} catch(e) {
		if (menu_list.length > 0) {
			vflscrsh.remove_context_menu(menu_list, callback);
		} else if (callback) {
			callback();
		}
	}
}
//------------------------------------------------------------------------------
vflscrsh.set_context_menu_actions_init = function(menu_is_inactive) {
	var last_operation = vflscrsh.utils.prefs_get('last_operation');
	var last_operation_inactive = menu_is_inactive;
	var last_operation_target = last_operation.target;
	var show_last_operation = true;
	//-----------------------------------------------------------------------
	if (last_operation_inactive && (last_operation.target != 'visible_portion')) {
		show_last_operation = false;
	}
	//-----------------------------------------------------------------------
	if (show_last_operation) {
		chrome.contextMenus.create({
			id: 'vflscrsh_context_last_operation',
			parentId: 'vflscrsh_context_popup',
			type : 'normal',
			title : vflscrsh.utils.get_string('last_operation') + ' ' + vflscrsh.utils.get_string(last_operation.method + '_operation') + ' ' + vflscrsh.utils.get_string(last_operation_target),
			contexts: ["all"],
			onclick: function(){ vflscrsh.context_menu_click(last_operation.method, last_operation_target); }
		});
		chrome.contextMenus.create({
			id: 'vflscrsh_context_last_operation_separator',
			parentId: 'vflscrsh_context_popup',
			type : 'separator',
			contexts: ["all"]
		});
	}
	//-----------------------------------------------------------------------
	//-----------------------------------------------------------------------
	var method_list = [ 'save', 'save_mhtml', 'copy', 'upload', 'preview' ];
	for (var i=0; i<method_list.length; i++) {
		var method = method_list[i];
		if ((method == 'save_mhtml') && (! vflscrsh.saveAsMHTML)) { continue; }
		if ((method == 'copy') && (vflscrsh.utils.clipboard_image_not_copy())) { continue; }
		if ((method == 'upload') && (vflscrsh.utils.prefs_get('uploadDisable'))) { continue; }
		vflscrsh.set_context_menu_actions_create(menu_is_inactive, method);
	}
	//-----------------------------------------------------------------------
	chrome.contextMenus.create({
		id: 'vflscrsh_context_settings_separator',
		parentId: 'vflscrsh_context_popup',
		type : 'separator',
		contexts: ["all"]
	});
	chrome.contextMenus.create({
		id: 'vflscrsh_context_settings',
		parentId: 'vflscrsh_context_popup',
		type : 'normal',
		title : vflscrsh.utils.get_string('settings.label'),
		contexts: ["all"],
		onclick: function(){  chrome.runtime.openOptionsPage(); }
	});
}
//------------------------------------------------------------------------------
vflscrsh.set_context_menu_actions_create = function(menu_is_inactive, method) {
	chrome.contextMenus.create({
		id: 'vflscrsh_context_' + method + '_popup',
		parentId: 'vflscrsh_context_popup',
		type : 'normal',
		title : vflscrsh.utils.get_string(method),
		contexts: ["all"],
	}, function() {
		if (! menu_is_inactive && ! vflscrsh.utils.prefs_get('onlyPageForce')) {
			chrome.contextMenus.create({
				id: 'vflscrsh_context_' + method + '_page',
				parentId: 'vflscrsh_context_' + method + '_popup',
				type : 'normal',
				title : vflscrsh.utils.get_string('page'),
				contexts: ["all"],
				onclick: function(){ vflscrsh.context_menu_click(method, 'page'); }
			});
		}
		if (! menu_is_inactive) {
			chrome.contextMenus.create({
				id: 'vflscrsh_context_' + method + '_page_force',
				parentId: 'vflscrsh_context_' + method + '_popup',
				type : 'normal',
				title : vflscrsh.utils.get_string('page_force'),
				contexts: ["all"],
				onclick: function(){ vflscrsh.context_menu_click(method, 'page_force'); }
			});
		}
		chrome.contextMenus.create({
			id: 'vflscrsh_context_' + method + '_visible_portion',
			parentId: 'vflscrsh_context_' + method + '_popup',
			type : 'normal',
			title : vflscrsh.utils.get_string('visible_portion'),
			contexts: ["all"],
			onclick: function(){ vflscrsh.context_menu_click(method, 'visible_portion'); }
		});
		if (! menu_is_inactive) {
			chrome.contextMenus.create({
				id: 'vflscrsh_context_' + method + '_selection',
				parentId: 'vflscrsh_context_' + method + '_popup',
				type : 'normal',
				title : vflscrsh.utils.get_string('selection'),
				contexts: ["all"],
				onclick: function(){ vflscrsh.context_menu_click(method, 'selection'); }
			});
		}
	});
}
//------------------------------------------------------------------------------
vflscrsh.context_menu_click = function(method, target) {
	vflscrsh.onMessage({ 'action' : 'capture', 'method' : method, 'target' : target }, null, function(response) {
		vflscrsh.onMessage({ 'action_prefs_set' : true, 'pref_name' : 'last_operation', 'pref_value' : { 'method' : method, 'target' : target } }, null, function(response) {});
	});
}
//-----------------------------------------------------------------------------------
vflscrsh.open_url = function(url, tab_id, pos_after_active) {
	if (pos_after_active && tab_id) {
		chrome.tabs.get(tab_id, function(tab) {
			chrome.tabs.create({ 'url' : url, 'active' : true, 'index' : tab.index+1 }, function(tab_new) { if (chrome.runtime.lastError) {} }); 
		});
	} else {
		chrome.tabs.create({ 'url' : url, active: true }, function(tab) { if (chrome.runtime.lastError) {} }); 
	}
}
//------------------------------------------------------------------------------
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) { return vflscrsh.onMessage(request, sender, sendResponse); });
//------------------------------------------------------------------------------
vflscrsh.onMessage = function(request, sender, sendResponse) {
		//------------------------------------------------------------------
		if (! request) { return; }
		//------------------------------------------------------------------
		if (request.action_prefs_set && request.pref_name) {
			vflscrsh.utils.prefs_set(request.pref_name, request.pref_value);
			if (request.pref_name == 'current_locale') {
				vflscrsh.i18n.init(request.pref_value);
			}
			vflscrsh.set_context_menu();
			sendResponse({ 'success' : true });
		}
		//------------------------------------------------------------------
		else if (request.action_prefs_get) {
			sendResponse({ 'prefs_list' : vflscrsh.prefs.list });
		}
		//------------------------------------------------------------------
		else if (request.action_reset_defaults) {
			vflscrsh.prefs.reset_defaults(function(){
				vflscrsh.i18n.init();
				vflscrsh.set_context_menu();
			});
			sendResponse({ 'success' : true });
		}
		//------------------------------------------------------------------
		else if (request.action_get_strings && request.string_list) {
			for (var i in request.string_list) {
				request.string_list[i] = vflscrsh.utils.get_string(i);
			}
			sendResponse({ 'string_list' : request.string_list });
		}
		//------------------------------------------------------------------
		else if (request.action_check_mhtml) {
			sendResponse({ 'saveAsMHTML' : vflscrsh.saveAsMHTML });
		}
		//------------------------------------------------------------------------
		else if (request.action && (request.action == 'window_close')) {
			if (sender.tab) {
				request.tab_id = sender.tab.id;
			}
			else if (request.tabId) {
				request.tab_id = request.tabId;
			}
			chrome.tabs.remove(request.tab_id);
			sendResponse({ 'success' : true });
		}
		//------------------------------------------------------------------
		//------------------------------------------------------------------
		else if (request.action && (request.action == 'capture')) {
			var method = request.method || 'save';
			var target = request.target || 'visible_portion';
			var closetab = request.closetab || false;

			if ((method == 'upload') && (vflscrsh.utils.prefs_get('uploadDisable'))) {
				sendResponse({ 'success' : true });
				return;
			}

			chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
				var tab = tabs[0];
				chrome.tabs.sendMessage(tab.id, { 'action' : 'capture_cancel' }, function() {});
				vflscrsh.tab_list['tab' + tab.id] = {
					'id' : tab.id,
					'method' : method,
					'target' : target,
					'site_title' : tab.title,
					'site_url' : tab.url,
					'index' : tab.index,
					'closetab' : closetab
				};
				vflscrsh.action.init(vflscrsh.tab_list['tab' + tab.id]);
			});
			vflscrsh.set_context_menu();
			sendResponse({ 'success' : true });
		}
		//------------------------------------------------------------------
		else if (request.action && (request.action == 'capture_page')) {
			if (sender.tab) {
				request.tab_id = sender.tab.id;
			}
			else if (request.tabId) {
				request.tab_id = request.tabId;
			}
			vflscrsh.action.prepare_page(request);
//			vflscrsh.utils.notification_box(vflscrsh.utils.get_string('prepare_percent') + parseInt(request.complete * 100) + '%');
			sendResponse({ 'success' : true });
		}
		//------------------------------------------------------------------
		else if (request.action && (request.action == 'capture_page_drawWindow')) {
			if (sender.tab) {
				request.tab_id = sender.tab.id;
			}
			else if (request.tabId) {
				request.tab_id = request.tabId;
			}
			vflscrsh.action.prepare_page_drawWindow(request);
			sendResponse({ 'success' : true });
		}
		//------------------------------------------------------------------
		else if (request.action && (request.action == 'capture_page_start')) {
			sendResponse({ 'success' : true });
		}
		//------------------------------------------------------------------
		else if (request.action && (request.action == 'capture_page_end')) {
			if (sender.tab) {
				request.tab_id = sender.tab.id;
			}
			else if (request.tabId) {
				request.tab_id = request.tabId;
			}
			vflscrsh.action.prepare_page_end(request);
			sendResponse({ 'success' : true });
		}
		//------------------------------------------------------------------
		else if (request.action && (request.action == 'capture_cancel')) {
			chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
				var tab = tabs[0];
				chrome.tabs.sendMessage(tab.id, { 'action' : 'capture_cancel' }, function() {});
				vflscrsh.tab_list['tab' + tab.id] = {};
			});
		}
		//------------------------------------------------------------------
		else if (request.action && (request.action == 'capture_set_selection')) {
			if (sender.tab) {
				request.tab_id = sender.tab.id;
			}
			else if (request.tabId) {
				request.tab_id = request.tabId;
			}
			vflscrsh.action.set_selection(vflscrsh.tab_list['tab' + request.tab_id], request.dimensions);
		}
		//------------------------------------------------------------------
	}
//------------------------------------------------------------------------------
chrome.webRequest.onBeforeSendHeaders.addListener(
	function(info) {
		// Replace the Referer header
		var headers = info.requestHeaders;
		var x_referer = '';
		//-----------------------------------------------------------------
		for (var i = 0; i < headers.length; i++) {
			if (headers[i].name === 'x-referer') {
				x_referer = headers[i].value;
				headers.splice(i, 1);
				break;
			}
		}
		//-----------------------------------------------------------------
		if (x_referer) {
			var is_ok = false;
			for (var i = 0; i < headers.length; i++) {
				if (headers[i].name.toLowerCase() == 'referer') { 
					headers[i].value = x_referer;
					is_ok = true;
					break;
				}
			}
			if (! is_ok) {
				headers.push({ 'name' : 'Referer', 'value' : x_referer });
			}
		}
		//-----------------------------------------------------------------
		return { requestHeaders: headers };
	},
	{urls: ["http://*/*", "https://*/*"]},
	["blocking", "requestHeaders"]
);
//------------------------------------------------------------------------------
// chrome.tabs.onHighlighted.addListener(function(){ vflscrsh.set_context_menu(); });
chrome.tabs.onActivated.addListener(function(){ vflscrsh.set_context_menu(); });
chrome.tabs.onUpdated.addListener(function(){ vflscrsh.set_context_menu(); });
chrome.windows.onFocusChanged.addListener(function(windowId){ vflscrsh.set_context_menu(); });
//------------------------------------------------------------------------------
setTimeout(vflscrsh.init, 1000);
//------------------------------------------------------------------------------
