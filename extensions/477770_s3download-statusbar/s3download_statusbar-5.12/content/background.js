var s3dm = {};
s3dm.download_list = {};
s3dm.is_init = false;
s3dm.progress_interval = null;
s3dm.undo_view_list = [];
s3dm.popup_tmp_windows = [];
s3dm.check_img_name = 'CHECK_FOLDER_S3.gif';
s3dm.hide_downbar_after_all_finished_timer = null;
s3dm.context_menu_id = 's3dm_context_menu';

//------------------------------------------------------------------------------
s3dm.init = function() {
	s3dm.prefs.init(function(){
		s3dm.download_list = s3dm.utils.prefs_get('download_list');
		//-----------------------------------------------------------------
		if (s3dm.utils.prefs_get('function.clearFinishedAfterCloseBrowser')) {
			for (var i in s3dm.download_list) {
				aDownload = s3dm.download_list[i];
				if (! s3dm.utils.check_progress_state(aDownload.dlstate)) {
					if (! s3dm.utils.prefs_get('function.keepHistory')) {
						s3dm.utils.erase_history(aDownload.id, aDownload.url);
					}
					delete s3dm.download_list[i];
				}
			}
			s3dm.utils.prefs_set('download_list', s3dm.download_list);
			s3dm.check_should_show();
		}
		//-----------------------------------------------------------------
		var download_list = s3dm.utils.clone_object(s3dm.download_list);
		var dlist_tmp = s3dm.utils.get_downlist(download_list);
		//-----------------------------------------------------------------
		if (dlist_tmp && dlist_tmp.length > 400) {
			s3dm.download_list = {};
			for (var i=0; i<400; i++) {
				var aDownload = dlist_tmp.pop();
				if (aDownload) {
					s3dm.download_list[aDownload.s3id] = aDownload;
				}
			}
			download_list = s3dm.utils.clone_object(s3dm.download_list);
			dlist_tmp = s3dm.utils.get_downlist(download_list);
		}
		//-----------------------------------------------------------------
		s3dm.check_download_init(dlist_tmp);
	});
}
//------------------------------------------------------------------------------
s3dm.init_run = function() {
	s3dm.is_init = true;

//	chrome.tabs.query({  active: true }, function(tab_list) {
	chrome.tabs.query({  active: true, windowType: 'normal' }, function(tab_list) {
		if (tab_list && tab_list.length) {
			for (var i in  tab_list) {
				if (tab_list[i].id) {
					s3dm.set_content_scripts(tab_list[0].id);
				}
			}
		}
	});
	s3dm.start_progress_interval();
	s3dm.start_file_exist_interval();
}
//------------------------------------------------------------------------------
s3dm.start_file_exist_interval = function() {
	setInterval(function(){
		for (var i in s3dm.download_list) {
			var aDownload = s3dm.download_list[i];
			if (aDownload.dlstate == 1) {
				chrome.downloads.search({ 'id' : aDownload.id }, function(results) {});
			}
		}
	}, 60*1000);
}
//------------------------------------------------------------------------------
s3dm.start_progress_interval = function() {
	if (s3dm.progress_interval) { return; }
	s3dm.progress_interval_begin = true;

	//------------------------------------------------------------------------
	s3dm.progress_interval = setInterval(function(){
		if (s3dm.progress_interval_begin) {
			var stop_interval = true;
	
			for (var i in s3dm.download_list) {
				var aDownload = s3dm.download_list[i];
				if (aDownload.dlstate == 0) {
					//----------------------------------------------
					function downloads_search(download) {
						chrome.downloads.search({ 'id' : download.id }, function(results) {
							if (results && results[0]) {
								s3dm.event_changed(results[0]);
								s3dm.send_message({ 'action_event_changed' : true, 'aDownload' : download });
							} else {
								s3dm.event_removed(download);
							}
							s3dm.utils.prefs_set('download_list', s3dm.download_list);
						});
					}
					//----------------------------------------------
					downloads_search(aDownload);
					stop_interval = false;
				}
			}
			if (stop_interval) {
				clearInterval(s3dm.progress_interval);
				s3dm.progress_interval = null;
				s3dm.set_browserAction_icon(false);
			}
		}
		s3dm.progress_interval_begin = ! s3dm.progress_interval_begin;
		s3dm.set_browserAction_icon(true);
	}, 500);
}
//------------------------------------------------------------------------------
s3dm.check_download_init = function(download_list) {
	if (download_list && download_list.length > 0) {
		var aDownload = download_list.shift();

		s3dm.aDownload_update(aDownload, function(is_success) {
			if (is_success) {
				s3dm.get_iconURL(aDownload, function(){
					s3dm.download_list[aDownload.s3id] = aDownload;
					s3dm.check_download_init(download_list);
				});
			} else {
				delete s3dm.download_list[aDownload.s3id];
				s3dm.check_download_init(download_list);
			}
		});
	} else {
		s3dm.utils.prefs_set('download_list', s3dm.download_list);
		s3dm.check_should_show();
		s3dm.init_run();
	}
}
//------------------------------------------------------------------------------
s3dm.aDownload_update = function(aDownload, callback) {
	chrome.downloads.search({ 'id' : aDownload.id }, function(results) {
		if (results && results[0]) {
			s3dm.utils.merge_hash(results[0], s3dm.download_list[aDownload.s3id]);
			callback(true);
		} else {
			callback(false);
			delete s3dm.download_list[aDownload.s3id];
		}
	})
}
//------------------------------------------------------------------------------
s3dm.event_added = function(aDownload) {
	var s3id = s3dm.utils.generate_s3id(aDownload.id);
	if (s3dm.download_list[s3id]) { return false; }

	//----------------------------------------------------------------------
	if (! aDownload.startTime) {
		aDownload.startTime = (new Date()).toISOString(); 
	}
	aDownload.startTimeData = (new Date(aDownload.startTime)).getTime();

	//----------------------------------------------------------------------
	if (! aDownload.filename) { return false; }
	var filename_short = s3dm.utils.get_filename_short(aDownload.filename);

	//----------------------------------------------------------------------
	if (s3dm.utils.check_ignore_list(filename_short)) { return false; }
	if (s3dm.check_img_name == filename_short) { return false; }

	//----------------------------------------------------------------------
	var aDownload_check = s3dm.utils.search_id_with_target(s3dm.download_list, aDownload.filename);
	if (aDownload_check) {
		s3dm.utils.erase_history(aDownload_check.id, aDownload_check.url);
//		s3dm.event_removed(aDownload_check);
	}

	aDownload.s3id = s3id;
	s3dm.download_list[s3id] = aDownload;

	//----------------------------------------------------------------------
	aDownload.dlstate = s3dm.utils.get_download_state(aDownload);
	aDownload.referrer_url = s3dm.utils.get_referrer(aDownload);
	s3dm.utils.calculate_view(aDownload);
	s3dm.hide_downbar(false);
	//----------------------------------------------------------------------
	if (aDownload.dlstate == 6) {
		s3dm.file_locked_confirm(aDownload);
	}

	//----------------------------------------------------------------------
	if (! aDownload.is_old_succeeded) {
		if (! aDownload.is_manual) {
			s3dm.utils.set_queue_mode(aDownload, s3dm.download_list);
		}
	}
	//----------------------------------------------------------------------
	if (s3dm.utils.prefs_get('DL.switchDownloadsTab')) {
		s3dm.open_download_window();
	}

	//----------------------------------------------------------------------
	s3dm.get_iconURL(aDownload, function(){
		s3dm.utils.prefs_set('download_list', s3dm.download_list);
		s3dm.start_progress_interval();
		s3dm.check_should_show();
		s3dm.send_message({ 'action_event_added' : true, 'aDownload' : aDownload });
	});

	return true;
}
//------------------------------------------------------------------------------
s3dm.event_changed = function(aDownload) {
	var s3id = s3dm.utils.generate_s3id(aDownload.id);
	if (! s3dm.download_list[s3id]) {
		var result = s3dm.event_added(aDownload);
		if (result == false) {
			return false;
		}
	}

	//------------------------------------------------------------------------
	s3dm.utils.merge_hash(aDownload, s3dm.download_list[s3id]);
	aDownload = s3dm.download_list[s3id];

	//------------------------------------------------------------------------
	aDownload.referrer_url = s3dm.utils.get_referrer(aDownload);
	aDownload.dlstate = s3dm.utils.get_download_state(aDownload);
	//------------------------------------------------------------------------
	if (aDownload.dlstate == 6) {
		s3dm.file_locked_confirm(aDownload);
	}

	s3dm.utils.calculate_view(aDownload);
	var is_finish = (aDownload.dlstate == 1) ? true : false;

	//------------------------------------------------------------------------
	if (is_finish) {
		if (! aDownload.endTime) {
			aDownload.endTime = (new Date()).toISOString();
		}

		if (! aDownload.is_old_succeeded) {
			aDownload.is_old_succeeded = true;
			s3dm.finish.action(aDownload);
			s3dm.start_queue();
		}
		setTimeout(function(){
			s3dm.trim_history();
			s3dm.trim_show_completed();
//			s3dm.viewer.check_mini_mode();
		}, 100);
	}

	//----------------------------------------------------------------------
	s3dm.get_iconURL(aDownload, function(){
		s3dm.utils.prefs_set('download_list', s3dm.download_list);
		s3dm.start_progress_interval();
		s3dm.check_should_show(is_finish);
		s3dm.send_message({ 'action_event_changed' : true, 'aDownload' : aDownload });
	});

//	s3dm.viewer.update_mini();
//	s3downbar.viewer.count_summary();
}
//------------------------------------------------------------------------------
s3dm.event_removed = function(aDownload) {
	if (aDownload.s3id) {
		//------------------------------------------------------------------
		if (! s3dm.utils.prefs_get('function.keepHistory')) {
			chrome.history.deleteUrl({ 'url' : aDownload.url }, function() { if (chrome.runtime.lastError){} });
		}
		//------------------------------------------------------------------
		delete s3dm.download_list[aDownload.s3id];
		s3dm.utils.prefs_set('download_list', s3dm.download_list);
		s3dm.check_should_show();
		s3dm.send_message({ 'action_event_removed' : true, 'aDownload' : aDownload });
	}
/*
	s3dm.viewer.check_mini_mode();
*/
}
//------------------------------------------------------------------------------
s3dm.start_queue = function() {
	if (s3dm.utils.get_queue_mode()) {
		var queueNum = s3dm.utils.check_queue_mode(0, s3dm.download_list);

		for (var i in s3dm.download_list) {
			var aDownload = s3dm.download_list[i];
			if (! aDownload.succeeded) {
				if (aDownload.paused && aDownload.is_queue) {
					if (queueNum > 0) {
						aDownload.is_queue = false;
						s3dm.onMessage({ 'action' : 'download_start', 's3id' : aDownload.s3id, 'is_manual' : aDownload.is_manual, 'is_queue' : false }, {}, function(response) {});
//						chrome.runtime.sendMessage({ 'action' : 'download_start', 's3id' : s3id, 'is_manual' : aDownload.is_manual, 'is_queue' : false }, function(response){});
						queueNum--;
					}
				}
			}
		}
	}
}
//------------------------------------------------------------------------------
s3dm.check_should_show = function(is_finish) {
	//------------------------------------------------------------------------
	if (Object.keys(s3dm.download_list).length > 0) {
		var is_hide = 	s3dm.utils.prefs_get('downbar_is_collapsed');
		var timer = s3dm.utils.get_hide_downbar_after_all_finished_time();

		if (s3dm.hide_downbar_after_all_finished_timer) {
			try {
				window.clearTimeout(s3dm.hide_downbar_after_all_finished_timer);
			} catch(e) {};
		}
		if (is_finish && s3dm.utils.get_hide_downbar_after_all_finished()) {
			is_hide = s3dm.utils.check_complete_history(s3dm.download_list);
		}
		if (is_hide && (timer > 0)) {
			s3dm.hide_downbar_after_all_finished_timer = window.setTimeout(s3dm.hide_downbar_timer, timer * 1000);
		} else {
			s3dm.hide_downbar(is_hide);
		}
	}
	else {
		s3dm.hide_downbar(true);
	}
}
//------------------------------------------------------------------------------
s3dm.trim_history = function() {
	s3dm.utils.trim_history(function(s3id) {
		var message = { 'action_reload_popup' : true, 'download_list' : s3dm.download_list, 'use_animation' : true };
		s3dm.onMessage({ 'action' : 'download_remove', 's3id' : s3id, 'history_remove' : true, 'message' : message }, {}, function(response) {});
	});
}
//------------------------------------------------------------------------------
s3dm.trim_show_completed = function() {
	var trim_ary = s3dm.utils.trim_show_completed(s3dm.download_list);
	for (var i=0; i<trim_ary.length; i++) {
		var history_remove = ! s3dm.utils.prefs_get("function.keepHistory");
		var message = { 'action_reload_popup' : true, 'download_list' : s3dm.download_list, 'use_animation' : ! trim_ary[i].is_quick };
		s3dm.onMessage({ 'action' : 'download_remove', 's3id' : trim_ary[i].s3id, 'history_remove' : history_remove, 'message' : message }, {}, function(response) {});
	}
}
//------------------------------------------------------------------------------
s3dm.hide_downbar_timer = function() {
	var is_hide = s3dm.utils.check_complete_history(s3dm.download_list);
	s3dm.hide_downbar(is_hide);
}
//------------------------------------------------------------------------------
s3dm.hide_downbar = function(is_hide) {
	s3dm.utils.prefs_set('downbar_is_collapsed', is_hide);
	s3dm.send_message({ 'action_hide_downbar' : true, 'is_hide' : is_hide });
	s3dm.context_menu_create(is_hide);
}
//------------------------------------------------------------------------------
s3dm.context_menu_create = function(is_hide) {
	chrome.contextMenus.removeAll(function(){
		if (is_hide) {
			if (s3dm.utils.prefs_get("context_menu.downloadbar_show")) {
				chrome.contextMenus.create({
					id: s3dm.context_menu_id,
					type : 'normal',
					title : s3dm.utils.get_string('action.downloadbar_show.label'),
					contexts: [ "page", "browser_action" ],
					onclick: function(event){ s3dm.context_menu_click(event); }
				});
			}
		}
	});
}
//------------------------------------------------------------------------------
s3dm.context_menu_click = function(event) {
	s3dm.hide_downbar(false);
}
//------------------------------------------------------------------------------
s3dm.get_iconURL = function(aDownload, callback) {
	s3dm.utils.get_iconURL(aDownload, callback);
}
//------------------------------------------------------------------------------
s3dm.open_download_window = function() {
	var history_url = chrome.extension.getURL('/content/download_history.html');
	//-----------------------------------------------------------------------
	if (s3dm.utils.prefs_get("DL.openInWindow")) {
		var current_window_id = -1;
		//------------------------------------------------------------------
		chrome.windows.getAll({ 'populate' : true, 'windowTypes' : ['popup'] }, function(windows){
			for (var i=0; i<windows.length; i++) {
				if (windows[i].tabs[0].url.indexOf(history_url) == 0) {
					current_window_id = windows[i].id;
					break;
				}
			}
			//------------------------------------------------------------
			if (current_window_id >= 0) {
				chrome.windows.update(current_window_id, { 'focused' : true }, function(win){});
			}
			//------------------------------------------------------------
			else {
				chrome.windows.create({
					url: history_url,
					width: 500,
					height: 400,
					left: Math.round((screen.width-500)/2),
					top: Math.round((screen.height-400)/2),
					type: 'popup'
				}, function(win) {});
			}
		});
		//------------------------------------------------------------------
		return;
	}
	//-----------------------------------------------------------------------
	chrome.tabs.query({ 'url' : history_url }, function(tabs){
		if (tabs && tabs[0]) {
			chrome.tabs.update(tabs[0].id, { 'active' : true }, function(tab){});
		}
		//------------------------------------------------------------------
		else {
			chrome.tabs.create({ 'url' : '/content/download_history.html', active: true }, function(tab) { if (chrome.runtime.lastError) {} }); 
		}
	});
}
//------------------------------------------------------------------------------
s3dm.set_content_scripts = function(tab_id, callback, set_all_script) {
	chrome.tabs.sendMessage(tab_id, { check_tooltip: true }, function(response) {
		if (chrome.runtime.lastError) {
		} else if (response && response.success) {
			if (callback) {
				callback(tab_id);
			}
			return;
		}

		var js_list = (set_all_script) ?
			[ "/content/downbar.js", "/content/utils.js", "/content/viewer.js", "/content/contextmenu.js", "/content/hotkeys.js", "/content/action.js", "/content/prefs.js", "/content/i18n.js", "/content/date.toLocaleFormat.js" ]
			:
			[ "/content/tab_loader.js" ];

		var executeScript = function(js_list) {
			var js_file = js_list.shift();
			var data = {};
			data.file = js_file;
			if (set_all_script) {
				data.runAt = 'document_start';
			}
			chrome.tabs.executeScript(tab_id, data, function() {
				if (chrome.runtime.lastError) {}
				if (js_list.length > 0) {
					executeScript(js_list);
				} else if (callback) {
					callback(tab_id);
				}
			});
		}
		executeScript(js_list);
	 });
}
//------------------------------------------------------------------------------
s3dm.render_downbar = function(message) {
	if (! message) {
		message = { 'action_reload_popup' : true, 'download_list' : s3dm.download_list };
	}

	message.undo_view_list = s3dm.undo_view_list;
	chrome.runtime.sendMessage(message, function(response) { if (chrome.runtime.lastError) {} });

	chrome.tabs.query({  active: true, windowType: 'normal' }, function(tab_list) {
		if (tab_list && tab_list.length) {
			for (var i in  tab_list) {
				if (tab_list[i].id) {
					s3dm.set_content_scripts(tab_list[i].id, function(tab_id) {
						chrome.tabs.sendMessage(tab_id, message, function(response) { if (chrome.runtime.lastError) {}; });
					});
				}
			}
		}
	});
}
//------------------------------------------------------------------------------
s3dm.file_locked_confirm = function(aDownload) {
	chrome.windows.create({
		url: '/content/download_lock.html?' + s3dm.utils.urlencode(JSON.stringify(aDownload)),
		width: 500,
		height: 400,
		left: Math.round((screen.width-500)/2),
		top: Math.round((screen.height-400)/2),
		type: 'popup'
	}, function(win) {
		s3dm.popup_tmp_windows['k' + win.id] = win.id;
	});
}
//------------------------------------------------------------------------------
s3dm.send_message = function(message) {
	s3dm.render_downbar(message);
}
//------------------------------------------------------------------------------
s3dm.send_message_response = function(tab_id, message) {
	if (tab_id == 'is_popup') {
		chrome.runtime.sendMessage(message, function(response) { if (chrome.runtime.lastError) {} });
	} else if (tab_id !== undefined) {
		chrome.tabs.sendMessage(tab_id, message, function(response) { if (chrome.runtime.lastError) {} });
	} else {
		s3dm.send_message(message);
//		chrome.runtime.sendMessage(message, function(response) { if (chrome.runtime.lastError) {} });
	}
}
//------------------------------------------------------------------------------
s3dm.browserAction_pulse = true;
//------------------------------------------------------------------------------
s3dm.set_browserAction_icon = function(is_progress) {
	var res = s3dm.utils.count_summary(s3dm.download_list);
	//-----------------------------------------------------------------------
	if ((res.percentComplete == 100) || (! is_progress)) {
		try { chrome.browserAction.setIcon({ 'path' : '/skin/logo16.png' }); } catch(e) {};
		try { chrome.browserAction.setTitle({ 'title' : s3dm.utils.get_string('extension_name') }); } catch(e) {};
//		try { chrome.browserAction.setBadgeText({ 'text' :  '' }); } catch(e) {};
	}
	//-----------------------------------------------------------------------
	else {
		var side = 16;
		var img_size = 16;
		var img_size = (s3dm.browserAction_pulse) ? 14 : 16;
		var offset_x = (s3dm.browserAction_pulse) ? 1 : 0;
		var offset_y = (s3dm.browserAction_pulse) ? 2 : 0;
		s3dm.browserAction_pulse = ! s3dm.browserAction_pulse;

		//-----------------------------------------------------------------
		var width = Math.round(side * res.percentComplete / 100);
		var canvas = document.createElement('canvas');
		canvas.width = side;
		canvas.height = side;
		document.body.appendChild(canvas);
		var img = document.createElement('img');
		//-----------------------------------------------------------------
		img.	addEventListener("load", function(event) {
			var context = canvas.getContext('2d');
			context.globalCompositeOperation = 'color-burn';
			//-----------------------------------------------------------
			context.drawImage(img, offset_x, offset_y, img_size, img_size);
			//-----------------------------------------------------------
			context.fillStyle = "#269221"; // 269221 //"#008A00"; //"#00E100"; //"#009900";
			context.beginPath();
			context.fillRect(0, 0, width, side);
			context.fill();
			//-----------------------------------------------------------
/*
			context.strokeStyle = "#2D67A2";
			context.lineWidth = 1;
			context.strokeRect (0, 0, 16, 16);
*/
			//-----------------------------------------------------------
			var imageData = canvas.getContext('2d').getImageData(0, 0, side, side);
			try { chrome.browserAction.setIcon({ 'imageData' :imageData }); } catch(e) {};
			canvas.parentNode.removeChild(canvas);
			img.parentNode.removeChild(img);
		});
		//-----------------------------------------------------------------
		img.src = '/skin/logo16.png';
		document.body.appendChild(img);

		//-----------------------------------------------------------------
		var timeRemainingText = (res.timeRemaining > 0) ? ' :: ' + s3dm.utils.format_seconds(res.timeRemaining) : '';
		//-----------------------------------------------------------------
		var speedText = '';
		if (res.speed_total > 0) {
			speedText = ' :: ' + s3dm.utils.get_strings_to_KB_MB_GB(res.speed_total, true);
		}
		//-----------------------------------------------------------------
		var result_text = res.percentComplete + '%' + timeRemainingText + speedText;
		try { chrome.browserAction.setTitle({ 'title' : result_text }); } catch(e) {};
//		try { chrome.browserAction.setBadgeText({ 'text' :  res.percentComplete + '%' }); } catch(e) {};
//		try { chrome.browserAction.setBadgeBackgroundColor({ 'color': 'rgba(127,127,127,0.5)' }); } catch(e) {};
	}
}
//------------------------------------------------------------------------------
chrome.tabs.onActivated.addListener(function(){ s3dm.render_downbar(); });
//------------------------------------------------------------------------------
chrome.tabs.onUpdated.addListener(function(tab_id, changeInfo) {
	if (! changeInfo) { return; }
	if (changeInfo && (changeInfo.status !== 'loading')) { return; }
	s3dm.render_downbar(); 
});
//------------------------------------------------------------------------------
try {
	chrome.windows.onFocusChanged.addListener(function(windowId){ setTimeout(function(){ s3dm.render_downbar(); }, 200); });
	chrome.windows.onFocusChanged.addListener(function(windowId){
		for (var k in s3dm.popup_tmp_windows) {
			if (windowId != s3dm.popup_tmp_windows[k]) {
				chrome.windows.get(windowId, function(win) {
					if (chrome.runtime.lastError) {};
					if (win) {
						if (s3dm.popup_tmp_windows[k]) {
							chrome.windows.remove(s3dm.popup_tmp_windows[k], function(){ if (chrome.runtime.lastError) {}; });
						}
						delete s3dm.popup_tmp_windows[k];
					}
				});
			}
		}
	});
} catch(e) {};
//------------------------------------------------------------------------------
try {
	chrome.tabs.onZoomChange.addListener(function(zoom) {
		chrome.tabs.sendMessage(zoom.tabId, { 'action_change_zoom' : true, 'zoom_index' : zoom.newZoomFactor}, function(response) { if (chrome.runtime.lastError) {} });
	});
} catch(e) {};
//------------------------------------------------------------------------------
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) { return s3dm.onMessage(request, sender, sendResponse); });
//------------------------------------------------------------------------------
s3dm.onMessage = function(request, sender, sendResponse) {
	//------------------------------------------------------------------------
	if (! request) { return; }
	//------------------------------------------------------------------------
	if (sender.tab) {
		request.tab_id = sender.tab.id;
	}
	else if (request.tabId) {
		request.tab_id = request.tabId;
	}
	//------------------------------------------------------------------------
	if (request.action_prefs_set && request.pref_name) {
		s3dm.utils.prefs_set(request.pref_name, request.pref_value);
		var is_reload_styles = false;
		//------------------------------------------------------------------
		if (request.pref_name == 'current_locale') {
			s3dm.i18n.init(request.pref_value);
			is_reload_styles = true;
		}
		//------------------------------------------------------------------
		else if (request.pref_name == 'downbar_is_collapsed') {
			s3dm.context_menu_create(request.pref_value);
			s3dm.send_message();
		}
		//------------------------------------------------------------------
		else if (request.pref_name == 'function.numToShowCompleted') {
			s3dm.trim_show_completed();
		}
		//------------------------------------------------------------------
		else if (request.pref_name == 'function.keepHistory') {
			s3dm.trim_history();
		}
		//------------------------------------------------------------------
		else if (request.pref_name == 'function.trimHistory') {
			s3dm.trim_history();
		}
		//------------------------------------------------------------------
		else if (request.pref_name == 'function.numToTrim') {
			s3dm.trim_history();
		}
		//------------------------------------------------------------------
		else if (request.pref_name == 'context_menu.downloadbar_show') {
			s3dm.context_menu_create(s3dm.utils.prefs_get('downbar_is_collapsed'));
		}
		//------------------------------------------------------------------
		else if (request.pref_name == 'downbar_show') {
			is_reload_styles = true;
		}
		//------------------------------------------------------------------
		else if (request.pref_name == 'downbar_exclude_links') {
			is_reload_styles = true;
		}
		//------------------------------------------------------------------
		else if (request.pref_name == 'function.useAnimation') {
			is_reload_styles = true;
		}
		//------------------------------------------------------------------
		else if (request.pref_name == 'style.downbar_height') {
			if (request.tab_id !== undefined) {
				chrome.tabs.sendMessage(request.tab_id, { 'action_set_downbar_height' : true, 'downbar_height' : request.pref_value }, function(response) { if (chrome.runtime.lastError) {} });
			}
		}
		//------------------------------------------------------------------
		else if (/^style\./.test(request.pref_name)) {
			is_reload_styles = true;
		}
		//------------------------------------------------------------------
		else if (/^display\./.test(request.pref_name)) {
			is_reload_styles = true;
		}
		//------------------------------------------------------------------
		else if (request.pref_name == 'downbar_position') {
			is_reload_styles = true;
		}
		//------------------------------------------------------------------
		else if (request.pref_name == 'popup.sort_direction') {
			is_reload_styles = true;
		}
		//------------------------------------------------------------------
		else if (request.pref_name == 'function.placeDownloadsFromRight') {
			is_reload_styles = true;
		}
		//------------------------------------------------------------------
		else if (request.pref_name == 'function.placeDownloadsScrollToNew') {
			is_reload_styles = true;
		}
		//------------------------------------------------------------------
		else {
			s3dm.send_message();
		}
		//------------------------------------------------------------------
		if (is_reload_styles && (request.pref_name != 'style.downbar_height')) {
			var style_version = s3dm.utils.prefs_get('style.version');
			s3dm.utils.prefs_set('style.version', style_version+1);
			s3dm.send_message({ 'action_set_styles' : true, 'download_list' : s3dm.download_list });
		}
		//------------------------------------------------------------------
		sendResponse({ 'success' : true });
	}
	//------------------------------------------------------------------------
	else if (request.action_prefs_get) {
		sendResponse({ 'prefs_list' : s3dm.prefs.list });
	}
	//------------------------------------------------------------------------
	else if (request.action_reset_defaults) {
		s3dm.prefs.reset_defaults(function(){
			s3dm.i18n.init();
			s3dm.utils.prefs_set('first_run', false);
			s3dm.utils.prefs_set('download_list', s3dm.download_list);
		});
		sendResponse({ 'success' : true });
	}
	//------------------------------------------------------------------------
	else if (request.action_get_strings && request.string_list) {
		for (var i in request.string_list) {
			request.string_list[i] = s3dm.utils.get_string(i);
		}
		sendResponse({ 'string_list' : request.string_list });
	}
	//------------------------------------------------------------------------
	else if (request.init_content_scripts) {
		s3dm.set_content_scripts(sender.tab.id, undefined, true);
		sendResponse({ 'success' : true });
	}
	//------------------------------------------------------------------------
	else if (request.action && (request.action == 'window_close')) {
		chrome.tabs.remove(request.tab_id);
		sendResponse({ 'success' : true });
	}
	//------------------------------------------------------------------------
	else if (request.notification_box) {
		s3dm.utils.notification_box(request.msg, request.title, request.url);
		sendResponse({ 'success' : true });
	}
	//------------------------------------------------------------------------
	//------------------------------------------------------------------------
	else if (request.frame_start_show_file) {
		s3dm.send_message_response(request.tab_id, { 'action_start_show_file' : true, 's3id' : request.s3id, 'completed' : request.completed });
		sendResponse({ 'success' : true });
	}
	//------------------------------------------------------------------------
	else if (request.frame_start_open_finished) {
		s3dm.send_message_response(request.tab_id, { 'action_start_open_finished' : true, 's3id' : request.s3id, 'is_opened' : request.is_opened });
		sendResponse({ 'success' : true });
	}
	//------------------------------------------------------------------------
	else if (request.frame_start_delete) {
		s3dm.send_message_response(request.tab_id, { 'action_start_delete' : true, 's3id' : request.s3id, 'event' : request.event });
		sendResponse({ 'success' : true });
	}
	//------------------------------------------------------------------------
	else if (request.frame_animate_decide) {
		s3dm.send_message_response(request.tab_id, { 'action_animate_decide' : true, 's3id' : request.s3id, 'doWhenDone' : request.doWhenDone, 'event' : request.event });
		sendResponse({ 'success' : true });
	}
	//------------------------------------------------------------------------
	else if (request.frame_action_progress) {
		s3dm.send_message_response(request.tab_id, { 'action_set_progress' : true, 's3id' : request.s3id, 'action' : request.action });
		sendResponse({ 'success' : true });
	}
	//------------------------------------------------------------------------
	else if (request.frame_contextmenu_show) {
		s3dm.send_message_response(request.tab_id, { 'action_contextmenu_show' : true, 's3id' : request.s3id, 'event' : request.event });
		sendResponse({ 'success' : true });
	}
	//------------------------------------------------------------------------
	else if (request.frame_show_tooltip) {
		s3dm.send_message_response(request.tab_id, { 'action_show_tooltip' : true, 's3id' : request.s3id });
		sendResponse({ 'success' : true });
	}
	//------------------------------------------------------------------------
	else if (request.frame_hide_tooltip) {
		s3dm.send_message_response(request.tab_id, { 'action_hide_tooltip' : true });
		sendResponse({ 'success' : true });
	}
	//------------------------------------------------------------------------
	//------------------------------------------------------------------------
	else if (request.action && (request.action == 'get_zoom_tab')) {
		chrome.tabs.getZoom(request.tab_id, function(zoom_index) {
			s3dm.send_message_response(request.tab_id, { 'action_change_zoom' : true, 'zoom_index' : zoom_index});
		});
		sendResponse({ 'success' : true });
	}
	//------------------------------------------------------------------------
	else if (request.action && (request.action == 'open_options_page')) {
		chrome.runtime.openOptionsPage();
		sendResponse({ 'success' : true });
	}
	//------------------------------------------------------------------------
	else if (request.action && (request.action == 'get_download_list')) {
		if (s3dm.is_init) {
			sendResponse({ 'download_list' : s3dm.download_list, 'undo_view_list' : s3dm.undo_view_list });
		} else {
			sendResponse({ 'prefs_not_init' : true });
		}
	}
	//------------------------------------------------------------------------
	else if (request.action && (request.action == 'get_image_preview')) {
		if (request.s3id) {
			var filename = request.filename;
			if (! filename) {
				if (s3dm.download_list[request.s3id]) {
					var aDownload = s3dm.utils.clone_object(s3dm.download_list[request.s3id]);
					if (aDownload.exists) {
						filename = aDownload.filename;
					}
				}
			}
			if (filename) {
				var path = 'file:///' + filename.replace(/\\/g, '/');
				s3dm.utils.read_local_file(path, function(blob){
					if (blob) {
						s3dm.utils.convert_to_dataURL(blob, function(image_url){
							if (image_url) {
								s3dm.send_message_response(request.tab_id, { 'set_image_preview' : true, 's3id' : request.s3id, 'image_url' : image_url });
							}
						});
					}
				});
			}
		}
		sendResponse({ 'success' : true });
	}
	//------------------------------------------------------------------------
	else if (request.action && (request.action == 'download_remove')) {
		if (request.s3id && s3dm.download_list[request.s3id]) {
			var aDownload = s3dm.utils.clone_object(s3dm.download_list[request.s3id]);
			if (request.history_remove) {
				s3dm.utils.erase_history(aDownload.id, aDownload.url);
			} else {
				s3dm.undo_view_list.push(aDownload);
			}
			delete s3dm.download_list[request.s3id];
			s3dm.utils.prefs_set('download_list', s3dm.download_list);
			s3dm.check_should_show();
			s3dm.send_message(request.message);
			sendResponse({ 'success' : true });
		} else {
			sendResponse({ 'success' : false });
		}
	}
	//------------------------------------------------------------------------
	else if (request.action && (request.action == 'download_restore')) {
		var aDownload = s3dm.undo_view_list.pop();
		if (aDownload) {
			s3dm.download_list[aDownload.s3id] = aDownload;
			s3dm.utils.prefs_set('download_list', s3dm.download_list);
			s3dm.check_should_show();
			s3dm.send_message({ 'action_download_restore' : true, 'aDownload' : aDownload, 'undo_view_list' : s3dm.undo_view_list });
		}
		sendResponse({ 'success' : true });
	}
	//------------------------------------------------------------------------
	else if (request.action && (request.action == 'download_pause')) {
		if (request.s3id && s3dm.download_list[request.s3id]) {
			var aDownload = s3dm.download_list[request.s3id];
			aDownload.is_manual = request.is_manual;
			aDownload.is_queue = request.is_queue;
			aDownload.paused = true;
			chrome.downloads.pause( aDownload.id, function() {
				if (chrome.runtime.lastError) {};
				s3dm.aDownload_update(aDownload, function(is_success) {
					s3dm.start_queue();
					s3dm.utils.prefs_set('download_list', s3dm.download_list);
				});
			});
			sendResponse({ 'success' : true });
		} else {
			sendResponse({ 'success' : false });
		}
	}
	//------------------------------------------------------------------------
	else if (request.action && (request.action == 'download_cancel')) {
		if (request.s3id && s3dm.download_list[request.s3id]) {
			var aDownload = s3dm.download_list[request.s3id];
			aDownload.is_manual = request.is_manual;
			aDownload.is_queue = request.is_queue;
			aDownload.canceled = true;
			chrome.downloads.cancel( aDownload.id, function() {
				if (chrome.runtime.lastError) {};
				s3dm.aDownload_update(aDownload, function(is_success) {
					s3dm.start_queue();
					s3dm.utils.prefs_set('download_list', s3dm.download_list);
				});
			});
			sendResponse({ 'success' : true });
		} else {
			sendResponse({ 'success' : false });
		}
	}
	//------------------------------------------------------------------------
	else if (request.action && (request.action == 'download_start')) {
		if (request.s3id && s3dm.download_list[request.s3id]) {
			var aDownload = s3dm.download_list[request.s3id];
			aDownload.is_manual = request.is_manual;
			aDownload.is_queue = request.is_queue;
			chrome.downloads.resume( aDownload.id, function(){
				if (chrome.runtime.lastError) {
					aDownload.dlstate = 3;
					s3dm.event_changed(aDownload);
				}
				s3dm.aDownload_update(aDownload, function(is_success) {
					s3dm.start_queue();
					//-----------------------------------------------------
					if (request.start_all) {
						s3dm.utils.set_queue_mode(aDownload, s3dm.download_list);
					}
					//-----------------------------------------------------
					s3dm.utils.prefs_set('download_list', s3dm.download_list);
				});
			});
			sendResponse({ 'success' : true });
		} else {
			sendResponse({ 'success' : false });
		}
	}
	//------------------------------------------------------------------------
	else if (request.action && (request.action == 'download_retry')) {
		if (request.url) {
			var options = {
				'url' : request.url,
				'conflictAction' : 'uniquify',
				'saveAs' : true
			};
			if (request.referrer) {
				options.headers = [{ 'name' : 'x-referer', 'value' : request.referrer }];
			}
			chrome.downloads.download(options, function(downloadId){ if (chrome.runtime.lastError) {} });
		}
		sendResponse({ 'success' : true });
	}
	//------------------------------------------------------------------------
	else if (request.action && (request.action == 'file_remove')) {
		if (request.s3id && s3dm.download_list[request.s3id]) {
			chrome.downloads.removeFile(s3dm.download_list[request.s3id].id, function(){ if(chrome.runtime.lastError){}; });
			sendResponse({ 'success' : true });
		} else {
			sendResponse({ 'success' : false });
		}
	}
	//------------------------------------------------------------------------
	else if (request.action && (request.action == 'file_show')) {
		if (request.s3id && s3dm.download_list[request.s3id]) {
			chrome.downloads.show(s3dm.download_list[request.s3id].id);
		}
		sendResponse({ 'success' : true });
	}
	//------------------------------------------------------------------------
	else if (request.action && (request.action == 'file_open')) {
		if (request.s3id && s3dm.download_list[request.s3id]) {
			var aDownload = s3dm.download_list[request.s3id];
			//------------------------------------------------------------
			if (s3dm.utils.check_isChrome()) {
				chrome.downloads.open(aDownload.id);
			}
			//------------------------------------------------------------
			else {
				chrome.windows.create({
					url: '/content/download_open.html?' + s3dm.utils.urlencode(JSON.stringify(aDownload)),
					width: 400,
					height: 150,
					left: Math.round((screen.width-400)/2),
					top: Math.round((screen.height-150)/2),
					type: 'popup'
				}, function(win) {
					s3dm.popup_tmp_windows['k' + win.id] = win.id;
				});
			}
		}
		sendResponse({ 'success' : true });
	}
	//------------------------------------------------------------------------
	else if (request.action && (request.action == 'file_locked')) {
		if (request.s3id && s3dm.download_list[request.s3id]) {
			var aDownload = s3dm.download_list[request.s3id];
			s3dm.file_locked_confirm(aDownload);
		}
		sendResponse({ 'success' : true });
	}
	//------------------------------------------------------------------------
	else if (request.action && (request.action == 'file_checksum')) {
		var aDownload = s3dm.download_list[request.s3id];
		if (aDownload) {
			aDownload = s3dm.utils.urlencode(JSON.stringify(aDownload));
		}
		//------------------------------------------------------------------
		chrome.windows.create({
			url: '/content/file_checksum.html?' + aDownload,
			width: 500,
			height: 300,
			left: Math.round((screen.width-500)/2),
			top: Math.round((screen.height-300)/2),
			type: 'popup'
		}, function(win) {});
		//------------------------------------------------------------------
		sendResponse({ 'success' : true });
	}
	//------------------------------------------------------------------------
	else if (request.action && (request.action == 'file_antivirus')) {
		var aDownload = s3dm.download_list[request.s3id];
		if (aDownload && aDownload.exists) {
			chrome.windows.create({
				url: '/content/file_checksum_antivirus.html?' + s3dm.utils.urlencode(JSON.stringify(aDownload)),
				width: 400,
				height: 270,
				left: Math.round((screen.width-400)/2),
				top: Math.round((screen.height-270)/2),
				type: 'popup'
			}, function(win) {});
		}
		//------------------------------------------------------------------
		sendResponse({ 'success' : true });
	}
	//------------------------------------------------------------------------
	else if (request.action && (request.action == 'file_antivirus_done')) {
		var aDownload = s3dm.download_list[request.s3id];
		if (aDownload) {
			if (s3dm.utils.check_valid_url(request.res.virus_scan_analysis_url)) {
				s3dm.download_list[aDownload.s3id].virus_scan_ratio = request.res.virus_scan_ratio;
				s3dm.download_list[aDownload.s3id].virus_scan_analysis_url = request.res.virus_scan_analysis_url;
				s3dm.download_list[aDownload.s3id].virus_scan_warning = request.res.virus_scan_warning;
				s3dm.utils.prefs_set('download_list', s3dm.download_list);
				s3dm.send_message();
				chrome.tabs.create({ 'url' : request.res.virus_scan_analysis_url, active: true }, function(tab) { if (chrome.runtime.lastError) {} }); 
			}
		}
		//------------------------------------------------------------------
		sendResponse({ 'success' : true });
	}
	//------------------------------------------------------------------------
	else if (request.action && (request.action == 'create_new_downloads')) {
		//------------------------------------------------------------------
		var d_url = '/content/create_new_downloads.html';
		//------------------------------------------------------------------
		if (request.dlist) {
			d_url += '?' + s3dm.utils.urlencode(JSON.stringify(request.dlist));
		}
		//------------------------------------------------------------------
		chrome.windows.create({
			url: d_url,
			width: 400,
			height: 270,
			left: Math.round((screen.width-400)/2),
			top: Math.round((screen.height-270)/2),
			type: 'popup'
		}, function(win) {});
		//------------------------------------------------------------------
		sendResponse({ 'success' : true });
	}
	//------------------------------------------------------------------------
	else if (request.action && (request.action == 'open_url')) {
		if (s3dm.utils.check_valid_url(request.url)) {
			chrome.tabs.create({ 'url' : request.url, active: true }, function(tab) { if (chrome.runtime.lastError) {} }); 
		}
		sendResponse({ 'success' : true });
	}
	//------------------------------------------------------------------------
	else if (request.save_settings) {
		var result = [];
		//------------------------------------------------------------------
		var prefs_list = s3dm.utils.clone_object(s3dm.prefs.list);
		var exclude_prefs = { 'current_version' : 1,	'not_open_contribute_page' : 1, 'is_first_run' : 1, 'show_page_timer' : 1, 'download_list' : 1, 'statistics' : 1, 'statistics_timer' : 1, '_end' : 1 };
		//------------------------------------------------------------------
		for (var pref_name in prefs_list) {
			if (exclude_prefs[pref_name]) { continue; }
		 	//------------------------------------------------------------
			if (typeof(prefs_list[pref_name]) == 'object') {
				result.push(pref_name + '='  + JSON.stringify(prefs_list[pref_name]));
			} else if (typeof(prefs_list[pref_name]) == 'array') {
				result.push(pref_name + '='  + JSON.stringify(prefs_list[pref_name]));
			} else {
				result.push(pref_name + '='  + prefs_list[pref_name]);
			}
		}
	 	//-------------------------------------------------------------------
		var result_txt = result.join("\n") + "\n";
	 	//-------------------------------------------------------------------
		if (request.mode == "copy") {
			s3dm.utils.copy_clipboard(result_txt, '', true);
			s3dm.utils.notification_box(s3dm.utils.get_string('message.settings_copied'));
		}
	 	//-------------------------------------------------------------------
		else if(request.mode == "save") {
			var blob1 = new Blob([result_txt], { type: "text/plain" });
			var result_url = URL.createObjectURL(blob1);
			var date = new Date();
			var dd = date.getDate(); if (dd < 10) { dd = '0' + dd; }
			var mm = date.getMonth() + 1; if (mm < 10) { mm = '0' + mm; }
			var hh = date.getHours(); if (hh < 10) { hh = '0' + hh; }
			var mn = date.getMinutes(); if (mn < 10) { mn = '0' + mn; }
			var ss = date.getSeconds(); if (ss < 10) { ss = '0' + ss; }

			var filename = 'DownloadManagerS3.' + date.getFullYear() + '.' + mm + '.'  + dd + '.'  + hh + '.'  + mn + '.'  + ss + '.txt';
	
			chrome.downloads.download({
				url: result_url,
				filename: filename,
				saveAs: true
			}, function (downloadId) {
			});
		}
		sendResponse({ 'success' : true });
	}
	//------------------------------------------------------------------------
	else if (request.action && (request.action == 'open_download_window')) {
		s3dm.open_download_window();
		sendResponse({ 'success' : true });
	}
	//------------------------------------------------------------------------
}
//------------------------------------------------------------------------------
// check and add to Content Security Policy  "img-src data:" for downbar images by url 'data:image'
//------------------------------------------------------------------------------
chrome.webRequest.onHeadersReceived.addListener(
	function(httpChannel) {
		var headers = httpChannel.responseHeaders;
		//-----------------------------------------------------------------
		for (var i = 0; i < headers.length; i++) {
			if (headers[i].name.toLowerCase() === 'content-security-policy') {
				var policy_list = headers[i].value.split(/\;/);
				var is_ok = false;
				for (var p=0; p<policy_list.length; p++) {
					if (/^\s+img\-src/.test(policy_list[p])) {
						is_ok = true;
						if (! /\sdata\:/.test(policy_list[p])) {
							policy_list[p] += ' data:';
							headers[i].value = policy_list.join(';');
							return { responseHeaders: headers };
						}
					}
				}
				break;
			}
		}
		return;
	},
	{
		urls: ["http://*/*", "https://*/*"],
		types: ["main_frame"]
	},
	["blocking", "responseHeaders"]
);
//------------------------------------------------------------------------------
chrome.webRequest.onBeforeSendHeaders.addListener(
	function(info) {
		// Replace the Referer header
		var headers = info.requestHeaders;
		var is_virus_total = false;
		var x_referer = '';
		//-----------------------------------------------------------------
		if (/^https?\:\/\/www\.virustotal\.com/.test(info.url)) {
			is_virus_total = true;
		}
		//-----------------------------------------------------------------
		var header = null;
		var new_headers = [];
		while (header = headers.shift()) {
			if (is_virus_total && /^X\-/.test(header.name)) {
			}
			else if (is_virus_total && /DNT/.test(header.name)) {
			}
			else if (is_virus_total && /Origin/.test(header.name)) {
			}
			else if (header.name === 'x-referer') {
				x_referer = header.value;
			} else {
				new_headers.push(header);
			}
		}
		headers = new_headers;
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
//------------------------------------------------------------------------------
chrome.downloads.onCreated.addListener(
	function(downloadItem) {
		s3dm.event_added(downloadItem);
	}
);
//------------------------------------------------------------------------------
chrome.downloads.onChanged.addListener(
	function(downloadDelta) {
		var s3id = s3dm.utils.generate_s3id(downloadDelta.id);
		if (downloadDelta.hasOwnProperty('exists') && ! s3dm.download_list[s3id]) {
			return;
		}
		chrome.downloads.search({ 'id' : downloadDelta.id }, function(results) {
			if (results && results[0]) {
				s3dm.event_changed(results[0]);
			}
		});
	}
);
//------------------------------------------------------------------------------
chrome.downloads.onErased.addListener(
	function(downloadId) {
		var s3id = s3dm.utils.generate_s3id(downloadId);
		if (s3dm.download_list[s3id]) {
			s3dm.event_removed(s3dm.download_list[s3id]);
		}
	}
);
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
setTimeout(s3dm.init, 500);

//------------------------------------------------------------------------------
try {
	chrome.downloads.setShelfEnabled(false);
} catch(e) {};
