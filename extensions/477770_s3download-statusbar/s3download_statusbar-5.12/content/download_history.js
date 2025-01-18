var s3dm = {};
s3dm.download_list_head = null;
s3dm.download_list_box = null;
s3dm.progress_interval = null;
s3dm.sort_handler = null;
s3dm.sort_handler_count = 0;
s3dm.sort_download_list = [];
s3dm.sortName = 'DateTime';
s3dm.sortDirection = 'descending';
s3dm.fields_list = ['FileName', 'FileExt', 'FileFullPath', 'FileSize', 'Progress', 'ProgressPercent', 'Speed', 'TimeRemaining', 'URL', 'Domain', 'DateTime'];
s3dm.style_sheet = null;
s3dm.download_list_head_resizer = null;
s3dm.download_select_list = [];
s3dm.draw_box = { start_x:0, start_y:0, start_draw: false };
s3dm.download_list_all = {};
s3dm.filter_text = '';

s3dm.downbar = {};
s3dm.downbar.box = null;
s3dm.downbar.box_id = 's3downbar-ibmbeeacmbeeaebmfjpmnlgkhoejinha';
s3dm.downbar.download_list = {};
s3dm.downbar.undo_view_list = [];
s3dm.downbar.download_template = null;
s3dm.downbar.download_template_tooltip = null;
s3dm.downbar.download_template_context_main = null;
s3dm.downbar.download_template_context_downloads = null;
s3dm.downbar.download_template_context_dl_head = null;
s3dm.downbar.download_template_context_dl_downloads = null;
s3dm.downbar.current_tooltip_box = null;
s3dm.downbar.current_tooltip_timer = null;
s3dm.downbar.zoom_index = 1;
s3dm.downbar.is_history = true;

//------------------------------------------------------------------------------
s3dm.init = function() {
	s3dm.downbar.box = document.getElementById(s3dm.downbar.box_id);
	s3dm.download_list_head = document.getElementById('download_list_head');
	s3dm.download_list_box = document.getElementById('download_list_box');
	s3dm.download_template = document.getElementById('download_template').firstChild;
	//------------------------------------------------------------------------
	s3dm.prefs.init(function(){
		setTimeout(function(){ s3dm.utils.i18n_parse(document); }, 100);
		s3dm.get_download_template(function(){
			s3dm.init_run();
		});
	});
}
//------------------------------------------------------------------------------
s3dm.init_run = function() {
	//------------------------------------------------------------------------
	s3dm.sortName = s3dm.utils.prefs_get('DL.sortName');
	s3dm.sortDirection = s3dm.utils.prefs_get('DL.sortDirection');
	s3dm.download_list_head.setAttribute('sortName', s3dm.sortName);
	s3dm.download_list_head.setAttribute('sortDirection', s3dm.sortDirection);

	//------------------------------------------------------------------------
	var style_el = document.createElement('style');
	document.head.appendChild(style_el);
	s3dm.style_sheet = style_el.sheet;

	//------------------------------------------------------------------------
	for (var i=0; i<s3dm.fields_list.length; i++) {
		var field = s3dm.fields_list[i];
		document.getElementById('head_' + field).sortName = field;
		document.getElementById('head_' + field).addEventListener("click", function(e) {
			if (! s3dm.download_list_head_resizer) {
				s3dm.download_sort_set(this.sortName);
			}
		});
	}
	//------------------------------------------------------------------------
	s3dm.set_style_sheet();
	s3dm.count_summary();

	//------------------------------------------------------------------------
	chrome.downloads.search({}, function(results) {
		//------------------------------------------------------------------------------
		chrome.runtime.onMessage.addListener(s3dm.onMessage);
		//------------------------------------------------------------------------------
		for (var i=0; i<results.length; i++) {
			results[i].filename_short = s3dm.utils.get_filename_short(results[i].filename);
			results[i].filename_ext = results[i].filename_short.split(".").pop().toLowerCase();
			results[i].dlstate = s3dm.utils.get_download_state(results[i]);
			if (! results[i].startTime) {
				results[i].startTime = (new Date()).toISOString(); 
			}

			s3dm.utils.calculate_view(results[i]);
			s3dm.calculate_view_func(results[i]);
		}
		//------------------------------------------------------------------------------
		results = results.sort(s3dm.download_sort_func);
		//------------------------------------------------------------------------------
		s3dm.event_added_pre(s3dm.utils.clone_object(results));
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
				if (downloadDelta.hasOwnProperty('exists') && ! s3dm.download_list_all[s3id]) {
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
				if (s3dm.download_list_all[s3id]) {
					s3dm.event_removed(s3dm.download_list_all[s3id]);
				}
			}
		);
	});

	//------------------------------------------------------------------------
	s3dm.downbar.box.addEventListener("contextmenu", function(e){
		if (! s3dm.utils.check_click_tooltip(e.target)) {
			e.preventDefault();
			s3dm.contextmenu.create(e);
		}
	});
	//------------------------------------------------------------------------
	s3dm.download_list_head.addEventListener("mousedown", function(e){
		s3dm.head_resize_start(e);
	});
	//------------------------------------------------------------------------
	s3dm.download_list_head.addEventListener("mouseup", function(e) {
		if (s3dm.download_list_head_resizer) {
			setTimeout(function(){
				s3dm.download_list_head_resizer = null;
			}, 20);
		}
	});
	//------------------------------------------------------------------------
	document.body.addEventListener("mouseup", function(e) {
		if (s3dm.download_list_head_resizer) {
			setTimeout(function(){
				s3dm.download_list_head_resizer = null;
			}, 20);
		}
	});
	//------------------------------------------------------------------------
	s3dm.download_list_head.addEventListener("mousemove", function(e) {
		s3dm.head_resize_set(e);
	});
	//------------------------------------------------------------------------
	s3dm.download_list_box.addEventListener("mousedown", s3dm.action_draw_begin);
	document.body.addEventListener("mousemove", s3dm.action_draw_move);
	document.body.addEventListener("mouseup", s3dm.action_draw_end);
	//------------------------------------------------------------------------
//	document.body.addEventListener("keydown", s3dm.action_keyboard_move);

	//------------------------------------------------------------------------
	document.getElementById('s3downbar_button_create_new_downloads').setAttribute('is_hidden', ! s3dm.prefs.get('DL.showCreateNewButton'));
	document.getElementById('s3downbar_button_pause_all').setAttribute('is_hidden', ! s3dm.prefs.get('DL.showPauseButton'));
	document.getElementById('s3downbar_button_resume_all').setAttribute('is_hidden', ! s3dm.prefs.get('DL.showResumeButton'));
	document.getElementById('s3downbar_button_cancel_all').setAttribute('is_hidden', ! s3dm.prefs.get('DL.showCancelButton'));
	document.getElementById('s3downbar_button_remove_all').setAttribute('is_hidden', ! s3dm.prefs.get('DL.showRemoveButton'));

	//------------------------------------------------------------------------
	document.getElementById('s3downbar_button_settings').addEventListener("click", function(e) {
		chrome.runtime.sendMessage({ 'action' : 'open_url', 'url' : '/content/options.html#download_historyTab' }, function(response) {});
	});
	document.getElementById('s3downbar_button_create_new_downloads').addEventListener("click", function(e) {
		chrome.runtime.sendMessage({ 'action' : 'create_new_downloads' }, function(response) {});
	});
	document.getElementById('s3downbar_button_pause_all').addEventListener("click", function(e) {
		s3dm.action_all('pause');
	});
	document.getElementById('s3downbar_button_resume_all').addEventListener("click", function(e) {
		s3dm.action_all('resume_all');
	});
	document.getElementById('s3downbar_button_cancel_all').addEventListener("click", function(e) {
		s3dm.action_all('cancel');
	});
	document.getElementById('s3downbar_button_remove_all').addEventListener("click", function(e) {
		s3dm.action_all('remove_history_all_done');
	});
	document.getElementById('s3downbar_searchbox').addEventListener("input", function(e) {
		s3dm.search(this.value);
	});
	document.getElementById('s3downbar_button_cols').addEventListener("click", function(e) {
		s3dm.contextmenu.create(e, 'menu_dl_head');
	});
}
//------------------------------------------------------------------------------
s3dm.set_style_sheet = function() {
	while (s3dm.style_sheet.cssRules.length) {
		s3dm.style_sheet.deleteRule(0);
	}

	var fr_ary = [];
	var fields_list = s3dm.prefs.get('DL.fields_list');
	//------------------------------------------------------------------------
	for (var i=0; i<s3dm.fields_list.length; i++) {
		var field = s3dm.fields_list[i];
		if (fields_list[field].disabled) {
			fr_ary.push({ 'order' : fields_list[field].order, 'size' : '0px' });
			document.getElementById('head_' + field).style.visibility = 'hidden';
			s3dm.style_sheet.insertRule('.grid_cols_' + field + ' { visibility: hidden; }', s3dm.style_sheet.cssRules.length);
		} else {
			fr_ary.push({ 'order' : fields_list[field].order, 'size' : fields_list[field].size + 'fr' });
			document.getElementById('head_' + field).style.visibility = 'visible';
		}
		//------------------------------------------------------------------
		document.getElementById('head_' + field).style.order = fields_list[field].order;
		s3dm.style_sheet.insertRule('.grid_cols_' + field + ' { order: ' + fields_list[field].order + '; }', s3dm.style_sheet.cssRules.length);
	}
	//------------------------------------------------------------------------
	fr_ary.sort(function(a,b){
		if (a.order > b.order) { return 1; }
		if (a.order < b.order) { return -1; }
		return 0;
	});
	//------------------------------------------------------------------------
	var fr_string = '';
	//------------------------------------------------------------------------
	while (fr_ary.length) {
		fr_string += fr_ary.shift().size + ' ';
	}

	//------------------------------------------------------------------------
	s3dm.style_sheet.insertRule('.grid_head { grid-template-columns: ' + fr_string + '; }', s3dm.style_sheet.cssRules.length);
	s3dm.style_sheet.insertRule('.grid_rows { grid-template-columns: ' + fr_string + '; }', s3dm.style_sheet.cssRules.length);
}
//------------------------------------------------------------------------------
s3dm.get_download_template = function(callback) {
	s3dm.utils.get_download_template(function(res){
		s3dm.downbar.download_template_tooltip = res.download_template_tooltip;
		s3dm.downbar.download_template_context_main = res.download_template_context_main;
		s3dm.downbar.download_template_context_downloads = res.download_template_context_downloads;
		s3dm.downbar.download_template_context_dl_head = res.download_template_context_dl_head;
		s3dm.downbar.download_template_context_dl_downloads = res.download_template_context_dl_downloads;
		callback();
	});
}
//------------------------------------------------------------------------------
s3dm.start_progress_interval = function() {
	if (s3dm.progress_interval) { return; }
	s3dm.progress_interval_begin = true;

	//------------------------------------------------------------------------
	s3dm.progress_interval = setInterval(function(){
		var stop_interval = true;

		for (var i in s3dm.download_list_all) {
			var aDownload = s3dm.download_list_all[i];
			if (aDownload.dlstate == 0) {
				chrome.downloads.search({ 'id' : aDownload.id }, function(results) {
					if (results && results[0]) {
						s3dm.event_changed(results[0]);
					} else {
						s3dm.event_removed(aDownload);
					}
				});
				stop_interval = false;
			}
		}
		if (stop_interval) {
			clearInterval(s3dm.progress_interval);
			s3dm.progress_interval = null;
		}
	}, 1000);
}
//------------------------------------------------------------------------------
s3dm.event_added_pre = function(results) {
	var aDownload = results.shift();
	if (aDownload) {
		//------------------------------------------------------------------
		var func = function(a, r) {
			if (! s3dm.event_added(a, function(){ s3dm.event_added_pre(r); }) ) {
				s3dm.event_added_pre(r);
			}
		}
		//------------------------------------------------------------------
		if (results.length%100) {
			func(aDownload, results);
		} else {
			setTimeout(function(){ func(aDownload, results); }, 1);
		}
	}
}
//------------------------------------------------------------------------------
s3dm.event_added = function(aDownload, callback) {
	var s3id = s3dm.utils.generate_s3id(aDownload.id);
	if (s3dm.download_list_all[s3id]) { return false; }
	//----------------------------------------------------------------------
	if (! aDownload.startTime) {
		aDownload.startTime = (new Date()).toISOString(); 
	}
	aDownload.startTimeData = (new Date(aDownload.startTime)).getTime();

	//----------------------------------------------------------------------
	if (! aDownload.filename) { return false; }
	aDownload.filename_short = s3dm.utils.get_filename_short(aDownload.filename);
	aDownload.filename_ext = aDownload.filename_short.split(".").pop().toLowerCase();

	aDownload.s3id = s3id;
	s3dm.download_list_all[s3id] = aDownload;
	//----------------------------------------------------------------------
	aDownload.dlstate = s3dm.utils.get_download_state(aDownload);
	s3dm.utils.calculate_view(aDownload);
	s3dm.calculate_view_func(aDownload);

	//----------------------------------------------------------------------
	if (s3dm.check_download_filter(aDownload)) {
		s3dm.downbar.download_list[s3id] = aDownload;
	}

	//----------------------------------------------------------------------
	s3dm.get_iconURL(aDownload, function(){
		s3dm.insert_new_download(aDownload);
		if (callback) {
			callback();
		}
		s3dm.start_progress_interval();
	});
	//----------------------------------------------------------------------
	return true;
}
//------------------------------------------------------------------------------
s3dm.event_changed = function(aDownload) {
	var s3id = s3dm.utils.generate_s3id(aDownload.id);
	if (! s3dm.download_list_all[s3id]) {
		var result = s3dm.event_added(aDownload, function(){ s3dm.event_changed(aDownload); });
		return;
	}

	//------------------------------------------------------------------------
	s3dm.utils.merge_hash(aDownload, s3dm.download_list_all[s3id]);
	aDownload = s3dm.download_list_all[s3id];

	//------------------------------------------------------------------------
	aDownload.dlstate = s3dm.utils.get_download_state(aDownload);
	s3dm.utils.calculate_view(aDownload);
	//----------------------------------------------------------------------
	if (s3dm.check_download_filter(aDownload)) {
		s3dm.downbar.download_list[s3id] = aDownload;
	}

	//------------------------------------------------------------------------
	if (aDownload.dlstate == 1) {
		if (! aDownload.endTime) {
			aDownload.endTime = (new Date()).toISOString();
		}
	}

	//----------------------------------------------------------------------
	s3dm.get_iconURL(aDownload, function(){
		s3dm.start_progress_interval();
		s3dm.set_download_state(aDownload);
		s3dm.calculate_view(aDownload);

		//-----------------------------------------------------------------
		var download_data_img = s3dm.utils.get_element(aDownload.box, 's3downbar_download_box_img');
		if (aDownload.dlstate == 6) {
			download_data_img.src = chrome.extension.getURL('/skin/blocked_alert.png');
		}
		else if (aDownload.dlstate == 8) {
			download_data_img.src = chrome.extension.getURL('/skin/blocked.png');
		}
		else if (aDownload.iconURL) {
			download_data_img.src = aDownload.iconURL;
		} else {
			download_data_img.src = s3dm.utils.get_empty_img();
		}
	});
}
//------------------------------------------------------------------------------
s3dm.event_removed = function(aDownload) {
	if (aDownload.s3id) {
		s3dm.download_list_box.removeChild(document.getElementById(aDownload.s3id));
		var el_id = s3dm.sort_download_list.indexOf(aDownload.s3id);
		if (el_id >= 0) {
			s3dm.sort_download_list.splice(el_id, 1);
		}
		delete s3dm.download_list_all[aDownload.s3id];
		delete s3dm.downbar.download_list[aDownload.s3id];
	}
	s3dm.count_summary();
}
//------------------------------------------------------------------------------
s3dm.get_iconURL = function(aDownload, callback) {
	s3dm.utils.get_iconURL(aDownload, callback);
}
//------------------------------------------------------------------------------
s3dm.insert_new_download = function(aDownload) {
	var download_data_box = s3dm.download_template.cloneNode(true);
	download_data_box.id = aDownload.s3id;
	s3dm.download_list_box.appendChild(download_data_box);

	//-----------------------------------------------------------------------
	if (s3dm.check_download_filter(aDownload)) {
		s3dm.sort_download_list.push(aDownload.s3id);
		download_data_box.setAttribute('is_hidden', false);
	} else {
		download_data_box.setAttribute('is_hidden', true);
	}

	//-----------------------------------------------------------------------
	s3dm.downbar.tooltip_create(s3dm.downbar.tooltip_init(), download_data_box);
	s3dm.downbar.tooltip_content(download_data_box.tooltip_box, 'downloads');
	//-----------------------------------------------------------------------
	s3dm.utils.get_element(download_data_box, 's3downbar_download_tooltip_source').addEventListener("click", function(event) {
		this.select();
	}, true);
	s3dm.utils.get_element(download_data_box, 's3downbar_download_tooltip_from').addEventListener("click", function(event) {
		this.select();
	}, true);

	//-----------------------------------------------------------------------
	download_data_box.addEventListener("click", function(event) {
		s3dm.download_select(aDownload, event);
	}, true);
	//-----------------------------------------------------------------------
	download_data_box.addEventListener("auxclick", function(event) {
		s3dm.download_select(aDownload, event);
		s3dm.action_click_handle(aDownload, event);
	}, true);
	//-----------------------------------------------------------------------
	download_data_box.addEventListener("dblclick", function(event) {
		s3dm.action_click_handle(aDownload, event);
	}, true);
	//-----------------------------------------------------------------------
	download_data_box.addEventListener("mousedown", function(event) {
		if (event.button == 1) {
			event.preventDefault();
			event.stopPropagation();
		}
	}, true);

	//------------------------------------------------------------------------
	if (chrome.downloads.drag) {
		download_data_box.addEventListener("dragstart", function(event) {
			event.preventDefault();
			event.stopPropagation();
			var click_handle = aDownload.box.getAttribute('click_handle');
			if ((click_handle == 'finished_click_handle') && (aDownload.exists)) {
				chrome.downloads.drag(aDownload.id);
				s3dm.downbar.tooltip_hide_force();
			}
		}, true);
	}

	//-----------------------------------------------------------------------
	var download_data_img = s3dm.utils.get_element(download_data_box, 's3downbar_download_box_img');
	if (aDownload.dlstate == 6) {
		download_data_img.src = chrome.extension.getURL('/skin/blocked_alert.png');
	}
	else if (aDownload.dlstate == 8) {
		download_data_img.src = chrome.extension.getURL('/skin/blocked.png');
	}
	else if (aDownload.iconURL) {
		download_data_img.src = aDownload.iconURL;
	} else {
		download_data_img.src = s3dm.utils.get_empty_img();
	}

	//-----------------------------------------------------------------------
	s3dm.utils.HTMLDOM_value(s3dm.utils.get_element(download_data_box, 's3downbar_download_box_filename'), aDownload.filename_short);
	s3dm.utils.HTMLDOM_value(s3dm.utils.get_element(download_data_box, 's3downbar_download_box_filename_ext'), aDownload.filename_ext);
	s3dm.utils.HTMLDOM_value(s3dm.utils.get_element(download_data_box, 's3downbar_download_box_filename_fullpath'), aDownload.filename);

	//-----------------------------------------------------------------------
	aDownload.box = download_data_box;
	s3dm.set_download_state(aDownload);
	s3dm.calculate_view(aDownload);
}
//------------------------------------------------------------------------------
s3dm.set_download_state = function (aDownload) {
	var dlElem = aDownload.box;
	var aState = aDownload.dlstate;
	dlElem.setAttribute('is_progress', 'false');

	switch(aState) {

		case -1: // Not started
		break;

		case 0:  // In progress
			dlElem.setAttribute('is_progress', 'true');
			dlElem.setAttribute('state', 'progress');
			dlElem.setAttribute('click_handle', 'progress_click_handle');
		break;

		case 4:  // Paused
			dlElem.setAttribute('is_progress', 'true');
			dlElem.setAttribute('state', 'pause');
			dlElem.setAttribute('click_handle', 'progress_click_handle');
		break;

		case 5:  // Queued
			dlElem.setAttribute('is_progress', 'true');
			dlElem.setAttribute('state', 'progress');
			dlElem.setAttribute('click_handle', 'progress_click_handle');
		break;

		case 1:  // Finished
		case 6:  // Parental Blocked
		case 7:  // AV Scanning
		case 8:  // AV Dirty
			dlElem.setAttribute('state', 'finished');
			dlElem.setAttribute('click_handle', 'finished_click_handle');
		break;

		case 2:  // Failed
		case 3:  // Canceled
			dlElem.setAttribute('state', 'cancel');
			dlElem.setAttribute('click_handle', 'finished_click_handle');
		break;
	}
}
//------------------------------------------------------------------------------
s3dm.calculate_view_func = function(aDownload) {
	var res = {};
	var state = aDownload.dlstate;
	var s3downbar_unkStr = s3dm.utils.get_string("display.unknown");

	//-----------------------------------------------------------------------
	res.secsleft = 0;
	res.additionalText = " ";  // status text to be added after filename
	res.currSize = 0;
	res.totalSize = '-.--';
	res.percent = aDownload.progress + '%';
	res.remainTime = '--:--';
	res.speed_text = '-.--';

	//-----------------------------------------------------------------------
	// if the state is queued, we won't know these
	//-----------------------------------------------------------------------
	if (state == 5) {
		res.additionalText = " - " + s3dm.utils.get_string("status.starting");
		res.currSize = "0 " + s3dm.utils.get_string("display.bytes_abbr");
		res.totalSize = s3downbar_unkStr;
		res.percent = s3downbar_unkStr;
		res.remainTime = "--:--";
	}
	else if (state == 2) {
		res.additionalText = " - " + s3dm.utils.get_string("status.failed");
	} else if (state == 3) {
		res.additionalText = " - " + s3dm.utils.get_string("status.cancelled");
	} else if (state == 6 | state == 8) {
		res.additionalText = " - " + s3dm.utils.get_string("status.av_blocked");
	} else if (state == 7) {
		res.additionalText = " - " + s3dm.utils.get_string("status.av_scanning");
	}
	// state is inprog or paused
	else if (s3dm.utils.check_progress_state(state)) {
		res.currSize = aDownload.pOldSavedKBytes;
		res.totalSize = aDownload.totalBytes;
		var dlRate = aDownload.dlRate;

		if (state == 4) {
			res.additionalText = " - " + s3dm.utils.get_string("status.paused");
		} else if (state == 0) {
			res.speed_text = s3dm.utils.get_strings_to_KB_MB_GB(aDownload.speed, true);
		}

		//-----------------------------------------------------------------
		// If the mode is undetermined, we won't know these - should totalsize be -1?
		//-----------------------------------------------------------------
		if ((parseInt(res.currSize) > parseInt(res.totalSize)) || (parseInt(res.totalSize)>100000000000000)) { // 18 446 100 000 000 000 000
			res.percent = s3downbar_unkStr;
			res.totalSize = s3downbar_unkStr;
			res.remainTime = s3downbar_unkStr;
		}
		else {
			var remainingkb = parseInt(res.totalSize - res.currSize);
			if(dlRate != 0) {
				res.secsleft = (1 / dlRate) * remainingkb;
				res.remainTime = s3dm.utils.format_seconds(res.secsleft);
			}
			res.totalSize = s3dm.utils.get_strings_to_KB_MB_GB(res.totalSize);
		}
	}

	//-----------------------------------------------------------------------
	res.currSize = s3dm.utils.get_strings_to_KB_MB_GB(res.currSize);

	//-----------------------------------------------------------------------
	res.startDate = new Date(aDownload.startTime);
	res.startDate_string = res.startDate.toLocaleFormat(s3dm.utils.prefs_get('DL.dateTimeFormat'));
	res.endDate = (aDownload.endTime) ? new Date(aDownload.endTime) : res.startDate;
	res.endDate_string = res.endDate.toLocaleFormat(s3dm.utils.prefs_get('DL.dateTimeFormat'));

	//-----------------------------------------------------------------------------
	aDownload.sort_filename = aDownload.filename_short;
	aDownload.sort_fileext = aDownload.filename_ext;
	aDownload.sort_filepath = aDownload.filename;
	aDownload.sort_datetime = res.endDate.getTime();
	aDownload.sort_filesize = (state == 1) ? ((aDownload.exists) ? aDownload.fileSize : -1) : aDownload.totalBytes;
	aDownload.sort_domain = s3dm.utils.get_url_domain(aDownload.finalUrl || aDownload.url);
	aDownload.sort_url = aDownload.finalUrl || aDownload.url;
	aDownload.sort_percent = aDownload.progress;
	aDownload.sort_speed = aDownload.speed;
	aDownload.sort_time_remaining = res.secsleft;

	return res;
}
//------------------------------------------------------------------------------
s3dm.calculate_view = function(aDownload) {
	var progElem = aDownload.box;
	var state = aDownload.dlstate;

	//-----------------------------------------------------------------------
	if (aDownload.iconURL32) {
		s3dm.utils.get_element(progElem, 's3downbar_download_tooltip_img').src = aDownload.iconURL32;
		s3dm.utils.get_element(progElem, 's3downbar_download_tooltip_img').setAttribute('no_image', false);
		aDownload.iconURL32_present = true;
	}
	//-----------------------------------------------------------------------
	else if (! aDownload.iconURL32_present) {
		s3dm.utils.get_element(progElem, 's3downbar_download_tooltip_img').setAttribute('no_image', true);
	}

	//-----------------------------------------------------------------------
	var sizeString = '';
	var res = s3dm.calculate_view_func(aDownload);

	//-----------------------------------------------------------------------
	if (aDownload.exists && (aDownload.fileSize>=0)) {
		sizeString = s3dm.utils.get_strings_to_KB_MB_GB(aDownload.fileSize);
		s3dm.utils.get_element(progElem, 's3downbar_download_tooltip_size').setAttribute('fileNotFound', false);
	}
	//-----------------------------------------------------------------------
	else if ((state != 1) && (aDownload.totalBytes >=0)) {
		sizeString = s3dm.utils.get_strings_to_KB_MB_GB(aDownload.totalBytes);
		s3dm.utils.get_element(progElem, 's3downbar_download_tooltip_size').setAttribute('fileNotFound', false);
	}
	//-----------------------------------------------------------------------
	else {
		sizeString = s3dm.utils.get_string("message.file_not_found");
		s3dm.utils.get_element(progElem, 's3downbar_download_tooltip_size').setAttribute('fileNotFound', true);
		if (state == 1) {
			progElem.setAttribute('state', 'fileNotFound');
		}
	} 

	//-----------------------------------------------------------------------
	var completeTime = s3dm.utils.get_string("display.unknown");
	var completeSeconds = -1;
	if (aDownload.endTime) {
		var endTime = new Date(aDownload.endTime);
		completeSeconds = (parseInt(endTime.getTime())-parseInt(res.startDate.getTime()))/1000;
		var completeTime = s3dm.utils.format_seconds(completeSeconds);
		if (completeTime == "00:00") {
			completeTime = "<00:01";
		}
	}

	//-----------------------------------------------------------------------
	var avgSpeed = '';
	//-----------------------------------------------------------------------
	try {
		if (aDownload.fileSize != -1 && completeSeconds != -1) {
			if (completeSeconds == 0) { completeSeconds = 1; }
			avgSpeed = s3dm.utils.get_strings_to_KB_MB_GB(aDownload.fileSize / completeSeconds, true);
		} else {
			avgSpeed = s3dm.utils.get_string("display.unknown");
		}
	} catch(e){};

	//-----------------------------------------------------------------------
	s3dm.utils.HTMLDOM_value(s3dm.utils.get_element(progElem, 's3downbar_download_tooltip_filename'), aDownload.filename_short + res.additionalText);
	s3dm.utils.HTMLDOM_value(s3dm.utils.get_element(progElem, 's3downbar_download_tooltip_from'), aDownload.finalUrl || aDownload.url );
	s3dm.utils.get_element(progElem, 's3downbar_download_tooltip_from').setAttribute('title', aDownload.finalUrl || aDownload.url );
	//-----------------------------------------------------------------------
	if (aDownload.referrer || aDownload.referrer_url) {
		s3dm.utils.HTMLDOM_value(s3dm.utils.get_element(progElem, 's3downbar_download_tooltip_source'), aDownload.referrer || aDownload.referrer_url );
		s3dm.utils.get_element(progElem, 's3downbar_download_tooltip_source').setAttribute('title', aDownload.referrer || aDownload.referrer_url );
	} else {
		s3dm.utils.get_element(progElem, 's3downbar_download_tooltip_source_box').setAttribute('is_hidden', true);
	}
	//-----------------------------------------------------------------------
	s3dm.utils.HTMLDOM_value(s3dm.utils.get_element(progElem, 's3downbar_download_tooltip_to'), aDownload.filename );
	s3dm.utils.HTMLDOM_value(s3dm.utils.get_element(progElem, 's3downbar_download_tooltip_status'), res.currSize + " / " + res.totalSize + " ( " + res.speed_text + " )" );
	s3dm.utils.HTMLDOM_value(s3dm.utils.get_element(progElem, 's3downbar_download_tooltip_size'), sizeString );
	s3dm.utils.HTMLDOM_value(s3dm.utils.get_element(progElem, 's3downbar_download_tooltip_timeLeft'), res.remainTime );
	s3dm.utils.HTMLDOM_value(s3dm.utils.get_element(progElem, 's3downbar_download_tooltip_timeStart'), res.startDate_string );
	s3dm.utils.HTMLDOM_value(s3dm.utils.get_element(progElem, 's3downbar_download_tooltip_timeEnd'), completeTime );
	s3dm.utils.HTMLDOM_value(s3dm.utils.get_element(progElem, 's3downbar_download_tooltip_percent'), res.percent );
	s3dm.utils.HTMLDOM_value(s3dm.utils.get_element(progElem, 's3downbar_download_tooltip_speed'), avgSpeed );

	//-----------------------------------------------------------------------
	s3dm.utils.HTMLDOM_value(s3dm.utils.get_element(progElem, 's3downbar_download_box_from'), aDownload.finalUrl || aDownload.url );
	s3dm.utils.HTMLDOM_value(s3dm.utils.get_element(progElem, 's3downbar_download_box_from_domain'), s3dm.utils.get_url_domain(aDownload.finalUrl || aDownload.url));
	s3dm.utils.HTMLDOM_value(s3dm.utils.get_element(progElem, 's3downbar_download_box_progress_currSize'), res.currSize);
	s3dm.utils.HTMLDOM_value(s3dm.utils.get_element(progElem, 's3downbar_download_box_datetime'), res.endDate_string);
	if (s3dm.utils.check_progress_state(state)) {
		s3dm.utils.HTMLDOM_value(s3dm.utils.get_element(progElem, 's3downbar_download_box_totalSize'), res.totalSize);
	} else {
		s3dm.utils.HTMLDOM_value(s3dm.utils.get_element(progElem, 's3downbar_download_box_totalSize'), sizeString);
	}
	s3dm.utils.HTMLDOM_value(s3dm.utils.get_element(progElem, 's3downbar_download_box_speed'), res.speed_text );
	s3dm.utils.HTMLDOM_value(s3dm.utils.get_element(progElem, 's3downbar_download_box_remaintime'), res.remainTime );
	s3dm.utils.HTMLDOM_value(s3dm.utils.get_element(progElem, 's3downbar_download_box_percent'), res.percent );
	s3dm.utils.get_element(progElem, 's3downbar_download_box_progress_bar_value').setAttribute('value', res.percent);
	s3dm.utils.get_element(progElem, 's3downbar_download_box_progress_bar').value = aDownload.progress;

	//-----------------------------------------------------------------------------
	var showTooltip_hint = s3dm.utils.prefs_get("DL.showTooltip_hint");
	//-----------------------------------------------------------------------
	if (s3dm.utils.check_progress_state(state)) {
		s3dm.utils.get_element(progElem, 's3downbar_download_tooltip_data_box').setAttribute('is_hidden_progress', false);
		s3dm.utils.get_element(progElem, 's3downbar_download_tooltip_data_box').setAttribute('is_hidden_finish', true);

		s3dm.utils.get_element(progElem, 's3downbar_download_tooltip_hint_progress').setAttribute('is_hidden', ! showTooltip_hint);
		s3dm.utils.get_element(progElem, 's3downbar_download_tooltip_hint_finish').setAttribute('is_hidden', true);
	}
	//-----------------------------------------------------------------------
	else {
		if (aDownload.exists) {
			var localFileSplit = aDownload.filename.split(".");
			var fileext = localFileSplit[localFileSplit.length-1].toLowerCase();
			if (fileext == "gif" | fileext == "jpg" | fileext == "png" | fileext == "jpeg") {
				progElem.image_preview_exists = true;
				progElem.image_local_file = aDownload.filename;
			}
		}
		s3dm.utils.get_element(progElem, 's3downbar_download_tooltip_data_box').setAttribute('is_hidden_progress', true);
		s3dm.utils.get_element(progElem, 's3downbar_download_tooltip_data_box').setAttribute('is_hidden_finish', false);

		s3dm.utils.get_element(progElem, 's3downbar_download_tooltip_hint_progress').setAttribute('is_hidden', true);
		s3dm.utils.get_element(progElem, 's3downbar_download_tooltip_hint_finish').setAttribute('is_hidden', ! showTooltip_hint);
	}

	//-----------------------------------------------------------------------
	s3dm.utils.get_element(progElem, 's3downbar_download_virus_scan_box').setAttribute('is_hidden', true);
	s3dm.download_sort();
	s3dm.count_summary();
}
//------------------------------------------------------------------------------
s3dm.count_summary = function() {
	var res = s3dm.utils.count_summary(s3dm.downbar.download_list);
	//-----------------------------------------------------------------------
	var timeRemainingText = (res.timeRemaining > 0) ? s3dm.utils.format_seconds(res.timeRemaining) + ' :: ' : '';
	//-----------------------------------------------------------------------
	var speedText = '';
	if (res.speed_total > 0) {
		speedText = s3dm.utils.get_strings_to_KB_MB_GB(res.speed_total, true) + ' :: ';
	}
	//-----------------------------------------------------------------------
	var progress_text = (res.percentComplete == 100) ? res.percentComplete + '%'  : timeRemainingText + speedText + res.percentComplete + '%';
	var done_count = res.download_all - res.progress_count;

	//-----------------------------------------------------------------------
	document.getElementById('s3downbar_summary_progress').value = res.percentComplete;
	document.getElementById('s3downbar_summary_box_progress_bar_value').setAttribute('progress_text', progress_text);
	document.getElementById('s3downbar_summary_box_progress_bar_value').setAttribute('summary_text', res.progress_count + '/' + res.download_all);
	document.getElementById('s3downbar_download_data_list_empty').setAttribute('list_count', res.download_all);

	//-----------------------------------------------------------------------
	var s3downbar_button_pause_all = document.getElementById('s3downbar_button_pause_all');
	if ((res.progress_count - res.pause_count) > 0) {
		s3downbar_button_pause_all.removeAttribute('disabled');
	} else {
		s3downbar_button_pause_all.setAttribute('disabled', true);
	}
	s3downbar_button_pause_all.value = s3dm.utils.get_string('action.pause_all.label') + ((res.progress_count - res.pause_count) > 0 ? ' (' + (res.progress_count - res.pause_count) + ')' : '');

	//-----------------------------------------------------------------------
	var s3downbar_button_resume_all = document.getElementById('s3downbar_button_resume_all');
	if (res.pause_count > 0) {
		s3downbar_button_resume_all.removeAttribute('disabled');
	} else {
		s3downbar_button_resume_all.setAttribute('disabled', true);
	}
	s3downbar_button_resume_all.value = s3dm.utils.get_string('action.resume_all.label') + ((res.pause_count > 0) ? ' (' + res.pause_count + ')' : '');

	//-----------------------------------------------------------------------
	var s3downbar_button_cancel_all = document.getElementById('s3downbar_button_cancel_all');
	if (res.progress_count > 0) {
		s3downbar_button_cancel_all.removeAttribute('disabled');
	} else {
		s3downbar_button_cancel_all.setAttribute('disabled', true);
	}
	s3downbar_button_cancel_all.value = s3dm.utils.get_string('action.cancel_all.label') + ((res.progress_count>0) ? ' (' + res.progress_count + ')' : '');

	//-----------------------------------------------------------------------
	var s3downbar_button_remove_all = document.getElementById('s3downbar_button_remove_all');
	if (done_count > 0) {
		s3downbar_button_remove_all.removeAttribute('disabled');
	} else {
		s3downbar_button_remove_all.setAttribute('disabled', true);
	}
	s3downbar_button_remove_all.value = s3dm.utils.get_string('action.remove_all.label') + ((done_count>0) ? ' (' + done_count + ')' : '');

}
//------------------------------------------------------------------------------
s3dm.download_select = function(aDownload, event) {
	if (s3dm.utils.check_click_tooltip(event.target)) {
		return;
	}
	//------------------------------------------------------------------------
	s3dm.downbar.tooltip_hide_force();
	//-----------------------------------------------------------------------
	if (event.button == 0) {
		if (! event.ctrlKey) {
			s3dm.download_unselect();
		}
		//-----------------------------------------------------------------
		var idx = s3dm.download_select_list.indexOf(aDownload.s3id);
		//-----------------------------------------------------------------
		if (idx >= 0) {
			s3dm.download_unselect(idx);
		} else {
			aDownload.box.setAttribute('is_selected', true);
			s3dm.download_select_list.push(aDownload.s3id);
		}
	}
	//-----------------------------------------------------------------------
	else {
		//-----------------------------------------------------------------
		var idx = s3dm.download_select_list.indexOf(aDownload.s3id);
		//-----------------------------------------------------------------
		if (idx < 0) {
			s3dm.download_unselect();
			aDownload.box.setAttribute('is_selected', true);
			s3dm.download_select_list.push(aDownload.s3id);
		}
	}
}
//------------------------------------------------------------------------------
s3dm.download_unselect = function(idx) {
	for (var i=0; i<s3dm.download_select_list.length; i++) {
		var aDownload = s3dm.downbar.download_list[s3dm.download_select_list[i]];
		//------------------------------------------------------------------
		if ((idx >= 0) && (idx != i)) {
			aDownload = null;
		}
		//------------------------------------------------------------------
		if (aDownload && aDownload.box) {
			aDownload.box.removeAttribute('is_selected');
		}
	}
	//------------------------------------------------------------------------
	if (idx >= 0) {
		s3dm.download_select_list.splice(idx, 1);
	} else {
		s3dm.download_select_list = [];
	}
}
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
s3dm.downbar.tooltip_init = function() {
	var tooltip_box = document.createElement('div');
	var tooltip_arrow = document.createElement('div');

	tooltip_box.className = 'tooltip_box';
	tooltip_arrow.className = 'tooltip_arrow';

	tooltip_box.setAttribute('is_top', false);
	tooltip_arrow.setAttribute('is_top', false);

	return { 'box' : tooltip_box, 'arrow' : tooltip_arrow };
}
//------------------------------------------------------------------------------
s3dm.downbar.tooltip_create = function(tooltip, box, func, box_place) {
	box.tooltip_box = tooltip.box;
	box.tooltip_arrow = tooltip.arrow;

	box.tooltip_is_hidden = true;
	box.addEventListener("mouseout", function(e){
		if (box.tooltip_box.timeout) {
			try {
				clearTimeout(box.tooltip_box.timeout);
			} catch(e){};
		}
		box.tooltip_is_hidden = true;
		box.tooltip_box.timeout = setTimeout(function(){ s3dm.downbar.tooltip_hide(box); }, 250);
	});

	box.appendChild(tooltip.box);
	box.appendChild(tooltip.arrow);
	box.style.setProperty("position", "relative", "important");

	//------------------------------------------------------------------------
	box.addEventListener("mouseover", function(e){
		var mbox = this;
		mbox.tooltip_is_hidden = false;
		if (func) {
			if (! mbox.is_created) {
				func(mbox);
				mbox.is_created = true;
			}
		}
		//------------------------------------------------------------
		if (s3dm.downbar.current_tooltip_timer) {
			try {
				clearTimeout(s3dm.downbar.current_tooltip_timer);
			} catch(e){};
		}
		//------------------------------------------------------------
		if (! s3dm.utils.prefs_get('DL.showTooltip')) {
			return;
		}
		//------------------------------------------------------------
		if (s3dm.downbar.current_tooltip_box && (s3dm.downbar.current_tooltip_box == mbox)) {
			s3dm.downbar.tooltip_show(mbox, e);
		}
		//------------------------------------------------------------
		else {
			s3dm.downbar.current_tooltip_timer = setTimeout(function(){
				if (! mbox.tooltip_is_hidden) {
					s3dm.downbar.tooltip_show(mbox, e); 
				}
			}, 700);
		}
	});
}
//------------------------------------------------------------------------------
s3dm.downbar.tooltip_content = function(tooltip_box, tooltip_type, tooltip_data) {
	if (tooltip_type == 'downloads') {
		s3dm.downbar.tooltip_content_downloads(tooltip_box);
	} else if (tooltip_type == 'text') {
		var text = document.createElement('div');
		s3dm.utils.reset_style(text);
		s3dm.utils.HTMLDOM_value(text, tooltip_data);
		text.className = 'tooltipText';
		tooltip_box.appendChild(text);
	}
	//------------------------------------------------------------------------
	var styleDefault = s3dm.utils.prefs_get("style.default");
	//------------------------------------------------------------------------
	if (! styleDefault) {
		var tooltipTextSize = s3dm.utils.prefs_get("style.tooltipFontSize");
		if (tooltip_type == 'downloads') {
			s3dm.utils.set_element_style(s3dm.utils.get_element(tooltip_box, 'download_data_tooltip'), 'font-size:' + tooltipTextSize + 'pt');
		} else {
			s3dm.utils.set_element_style(tooltip_box, 'font-size:' + tooltipTextSize + 'pt');
		}
	}
}
//------------------------------------------------------------------------------
s3dm.downbar.tooltip_content_downloads = function(tooltip_box) {
	var download_data_tooltip = s3dm.downbar.download_template_tooltip.cloneNode(true);
	tooltip_box.appendChild(download_data_tooltip);
}
//------------------------------------------------------------------------------
s3dm.downbar.tooltip_show = function(box, event) {
	if (s3dm.draw_box.start_draw) { return; }
	if (s3dm.contextmenu.box) { return; }
	//------------------------------------------------------------------------
	if (box.image_preview_exists && ! box.image_preview_loaded) {
		box.image_preview_loaded = true;
		chrome.runtime.sendMessage({ 'action' : 'get_image_preview', 's3id' : box.id, 'filename' : box.image_local_file }, function(response) {});
	}

	//------------------------------------------------------------------------
	if (s3dm.downbar.current_tooltip_box && (s3dm.downbar.current_tooltip_box != box)) {
		s3dm.downbar.tooltip_hide(s3dm.downbar.current_tooltip_box);
		box.tooltip_box.style.setProperty("left", event.screenX + 'px', "important");
		box.tooltip_arrow.style.setProperty("left", event.screenX + 'px', "important");
	}
	//------------------------------------------------------------------------
	s3dm.downbar.current_tooltip_box = box;
	box.tooltip_box.setAttribute('is_top', false);
	box.tooltip_arrow.setAttribute('is_top', false);

	//------------------------------------------------------------------------
	box.tooltip_box.style.setProperty("top", 'unset', "important");
	box.tooltip_box.style.setProperty("display", "inline-block", "important");
	box.tooltip_arrow.style.setProperty("display", "inline-block", "important");

	box.tooltip_box.style.width = '';
	var tooltip_box_width = box.tooltip_box.offsetWidth;
	box.tooltip_box.style.width = box.tooltip_box.clientWidth + 'px';

	box.tooltip_box.style.setProperty("margin-top", '10px', "important");
	box.tooltip_box.style.setProperty("margin-bottom", "10px", "important");
	box.tooltip_box.style.setProperty("transform", "scale(1)", "important");
	var box_height = box.tooltip_box.offsetHeight;

	//------------------------------------------------------------------------
	var is_position = 'bottom';
	var rect1 = box.tooltip_box.getBoundingClientRect();
	if (rect1.top < 40) {
		is_position = 'top';
		box.tooltip_box.setAttribute('is_top', true);
		box.tooltip_arrow.setAttribute('is_top', true);
	}

	//------------------------------------------------------------------------
	if (box.tooltip_box.offsetWidth > (document.documentElement.clientWidth*s3dm.downbar.zoom_index - 5)) {
		var scale = (document.documentElement.clientWidth*s3dm.downbar.zoom_index - 10) / box.tooltip_box.offsetWidth;
		box.tooltip_box.style.setProperty("transform", 'scale( '+ scale +' )', "important");
		var margin_value = parseInt(((box_height * scale) - box_height) / 2 + 9);

		if (is_position == 'top') {
			box.tooltip_box.style.setProperty("margin-top", margin_value + 'px', "important");
		} else {
			box.tooltip_box.style.setProperty("margin-bottom", margin_value + 'px', "important");
		}
	}

	var margin_left = Math.ceil(tooltip_box_width/2);
	box.tooltip_box.style.setProperty("margin-left", '-' + margin_left + 'px', "important");
	var rect = box.tooltip_box.getBoundingClientRect();
	if (rect.left < 5) {
		var m_left = -1*(margin_left  + rect.left*s3dm.downbar.zoom_index - 5);
		box.tooltip_box.style.setProperty("margin-left", m_left + 'px', "important");
	}
	else if (rect.right > (document.documentElement.clientWidth - 5)) {
		var m_left = -1*(margin_left + (rect.right - document.documentElement.clientWidth)*s3dm.downbar.zoom_index + 5);
		box.tooltip_box.style.setProperty("margin-left", m_left + 'px', "important");
	}

	if (is_position == 'top') {
		var box_rect = box.getBoundingClientRect();
		box.tooltip_box.style.setProperty("top", ((box_rect.bottom - box_rect.top)*s3dm.downbar.zoom_index-5)+'px', "important");
		box.tooltip_arrow.style.setProperty("top", ((box_rect.bottom - box_rect.top)*s3dm.downbar.zoom_index-5)+'px', "important");
	}

	box.tooltip_box.style.setProperty("opacity", "1", "important");
	box.tooltip_arrow.style.setProperty("opacity", "1", "important");

	if (box.tooltip_box.timeout) {
		try {
			clearTimeout(box.tooltip_box.timeout);
		} catch(e){};
		box.tooltip_box.timeout = null;
	}
	if (box.tooltip_box.is_timeout) {
		box.tooltip_box.timeout = setTimeout(function(){ s3dm.downbar.tooltip_hide(box, true); }, 1000);
	}
}
//------------------------------------------------------------------------------
s3dm.downbar.tooltip_hide = function(box, is_timer) {
	if (is_timer) {
		setTimeout(function(){
			box.tooltip_box.style.setProperty("display", "none", "important");
			box.tooltip_arrow.style.setProperty("display", "none", "important");
		}, 500);
	} else {
		box.tooltip_box.style.setProperty("display", "none", "important");
		box.tooltip_arrow.style.setProperty("display", "none", "important");
	}
	box.tooltip_box.style.setProperty("opacity", "0", "important");
	box.tooltip_arrow.style.setProperty("opacity", "0", "important");

	if (box.tooltip_box.timeout) {
		try {
			clearTimeout(box.tooltip_box.timeout);
		} catch(e){};
		box.tooltip_box.timeout = null;
	}
}
//------------------------------------------------------------------------------
s3dm.downbar.tooltip_hide_force = function() {
	try {
		if (s3dm.downbar.current_tooltip_box) {
			s3dm.downbar.tooltip_hide(s3dm.downbar.current_tooltip_box);
		}
	} catch(e) {};
}
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
s3dm.head_resize_start = function(e) {
	if (e.target.className != 'grid_head_resizer') { return; }
	//------------------------------------------------------------------------
	var field = e.target.parentNode;
	var rect = field.getBoundingClientRect();
	var fields_list = s3dm.prefs.get('DL.fields_list');
	var next_fr = 0;
	var prev_fr_list = [];

	//------------------------------------------------------------------------
	for (var i=0; i<s3dm.fields_list.length; i++) {
		var field_name = s3dm.fields_list[i];
		//-----------------------------------------------------------------
		if ((! fields_list[field_name].disabled) && (field_name != field.sortName)) {
			//----------------------------------------------------------
			if (fields_list[field_name].order < fields_list[field.sortName].order) {
				var rect2 = document.getElementById('head_' + field_name).getBoundingClientRect();
				rect2.start_fr = fields_list[field_name].size;
				rect2.field_name = field_name;
				prev_fr_list.push(rect2);
			}
			//----------------------------------------------------------
			else {
				next_fr += fields_list[field_name].size;
			}
		}
	}
	//------------------------------------------------------------------------
	s3dm.download_list_head_resizer = {
		'field_name' : field.sortName,
		'start_width' : rect.width,
		'total_width' : document.body.clientWidth,
		'start_right' : rect.right,
		'next_fr' : next_fr,
		'prev_fr_list' : prev_fr_list
	};
	//------------------------------------------------------------------------
	e.preventDefault();
}
//------------------------------------------------------------------------------
s3dm.head_resize_set = function(e) {
	if (! s3dm.download_list_head_resizer) { return; }
	//------------------------------------------------------------------------
	var field_name = s3dm.download_list_head_resizer.field_name;
	var new_right = e.pageX+3;
	var new_width = s3dm.download_list_head_resizer.start_width + (new_right - s3dm.download_list_head_resizer.start_right);
	if (new_width < 10) { new_width = 10; }
	//------------------------------------------------------------------------
	var fields_list = s3dm.prefs.get('DL.fields_list');
	//------------------------------------------------------------------
	var other_width = s3dm.download_list_head_resizer.total_width - new_width;
	for (var i=0; i<s3dm.download_list_head_resizer.prev_fr_list.length; i++) {
		other_width -= s3dm.download_list_head_resizer.prev_fr_list[i].width;
	}
	//------------------------------------------------------------------------
	var new_fr = parseFloat((s3dm.download_list_head_resizer.next_fr * new_width / other_width).toFixed(3));
	if (new_fr >0) {
		fields_list[field_name].size = new_fr;
	}
	//------------------------------------------------------------------------
	for (var i=0; i<s3dm.download_list_head_resizer.prev_fr_list.length; i++) {
		var new_fr2 = parseFloat((s3dm.download_list_head_resizer.next_fr * s3dm.download_list_head_resizer.prev_fr_list[i].width / other_width).toFixed(3));
		if (new_fr2 >0) {
			fields_list[s3dm.download_list_head_resizer.prev_fr_list[i].field_name].size = new_fr2;
		}
	}
	//------------------------------------------------------------------------
	s3dm.set_style_sheet();
	s3dm.pref_save('DL.fields_list', fields_list, function(){});
}
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
s3dm.action = function(action, action_count) {
	s3dm.contextmenu.destroy();
	if ((action == 'open_file') || (action == 'copy_source') || (action == 'copy_download')) {
		s3dm.action_run(action, action_count);
	} else {
		setTimeout(function(){
			s3dm.action_run(action, action_count);
		}, 10);
	}
}
//------------------------------------------------------------------------------
s3dm.action_run = function(action, action_count) {
	//-----------------------------------------------------------------------
	if (action == 'pause') {
		for (var i=0; i<s3dm.download_select_list.length; i++) {
			var s3id = s3dm.download_select_list[i];
			var aDownload = s3dm.downbar.download_list[s3id];
			if (s3dm.utils.check_progress_state(aDownload.dlstate) && ! aDownload.paused) {
				//---------------------------------------------------
				function download_pause(aDownload2) {
					chrome.runtime.sendMessage({ 'action' : 'download_pause', 's3id' : aDownload2.s3id, 'is_manual' : true, 'is_queue' : false }, function(response){
						if (! response.success) {
							chrome.downloads.pause( aDownload2.id, function() { if (chrome.runtime.lastError) {}; });
						}
					});
				}
				//---------------------------------------------------
				download_pause(aDownload);
			}
		}
	}
	//-----------------------------------------------------------------------
	else if (action == 'resume') {
		for (var i=0; i<s3dm.download_select_list.length; i++) {
			var s3id = s3dm.download_select_list[i];
			var aDownload = s3dm.downbar.download_list[s3id];
			if (s3dm.utils.check_progress_state(aDownload.dlstate) && aDownload.paused) {
				//---------------------------------------------------
				function download_start(aDownload2) {
					chrome.runtime.sendMessage({ 'action' : 'download_start', 's3id' : aDownload2.s3id, 'is_manual' : true, 'is_queue' : false, 'start_all' : false }, function(response){
						if (! response.success) {
							chrome.downloads.resume( aDownload2.id, function() { if (chrome.runtime.lastError) {}; });
						}
					});
				}
				//---------------------------------------------------
				download_start(aDownload);
			}
		}
	}
	//-----------------------------------------------------------------------
	else if (action == 'resume_all') {
		for (var s3id in s3dm.downbar.download_list) {
			var aDownload = s3dm.downbar.download_list[s3id];
			if (s3dm.utils.check_progress_state(aDownload.dlstate) && aDownload.paused) {
				//---------------------------------------------------
				function download_start(aDownload2) {
					chrome.runtime.sendMessage({ 'action' : 'download_start', 's3id' : aDownload2.s3id, 'is_manual' : true, 'is_queue' : false, 'start_all' : true }, function(response){
						if (! response.success) {
							chrome.downloads.resume( aDownload2.id, function() { if (chrome.runtime.lastError) {}; });
						}
					});
				}
				//---------------------------------------------------
				download_start(aDownload);
			}
		}
	}
	//-----------------------------------------------------------------------
	else if (action == 'cancel') {
		for (var i=0; i<s3dm.download_select_list.length; i++) {
			var s3id = s3dm.download_select_list[i];
			var aDownload = s3dm.downbar.download_list[s3id];
			if (s3dm.utils.check_progress_state(aDownload.dlstate)) {
				//---------------------------------------------------
				function download_cancel(aDownload2) {
					chrome.runtime.sendMessage({ 'action' : 'download_cancel', 's3id' : aDownload2.s3id, 'is_manual' : true, 'is_queue' : false }, function(response){
						if (! response.success) {
							chrome.downloads.cancel( aDownload2.id, function() { if (chrome.runtime.lastError) {}; });
						}
					});
				}
				//---------------------------------------------------
				download_cancel(aDownload);
			}
		}
	}
	//-----------------------------------------------------------------------
	else if (action == 'retry') {
		//----------------------------------------------------------------
		var d_list = [];
		var u_list = {};
		//----------------------------------------------------------------
		for (var i=0; i<s3dm.download_select_list.length; i++) {
			var s3id = s3dm.download_select_list[i];
			var aDownload = s3dm.downbar.download_list[s3id];
			if (! s3dm.utils.check_progress_state(aDownload.dlstate)) {
				var url = aDownload.finalUrl || aDownload.url;
				if (! u_list[url]) {
					d_list.push({ 'url' : url, 'referrer' : aDownload.referrer });
					u_list[url] = true;
				}
			}
		}
		//----------------------------------------------------------------
		if (d_list.length == 1) {
			var options = {
				'url' : d_list[0].url,
				'conflictAction' : 'uniquify',
				'saveAs' : true
			};
			if (d_list[0].referrer) {
				options.headers = [{ 'name' : 'x-referer', 'value' : d_list[0].referrer }];
			}
			chrome.downloads.download(options, function(downloadId){ if (chrome.runtime.lastError) {} });
		}
		//----------------------------------------------------------------
		else if (d_list.length > 0) {
			chrome.runtime.sendMessage({ 'action' : 'create_new_downloads', 'dlist' : d_list }, function(response) {});
		}
	}
	//-----------------------------------------------------------------------
	else if ((action == 'visit_source') || (action == 'copy_source')) {
		//----------------------------------------------------------------
		var r_url = {};
		var r_list = [];
		//----------------------------------------------------------------
		for (var i=0; i<s3dm.download_select_list.length; i++) {
			var s3id = s3dm.download_select_list[i];
			var aDownload = s3dm.downbar.download_list[s3id];
			if (aDownload.referrer) {
				r_url[aDownload.referrer] = true;
			}
		}
		//----------------------------------------------------------------
		for (var url in r_url) {
			if (action == 'visit_source') {
				//---------------------------------------------------
				function open_url(source_url) {
					chrome.runtime.sendMessage({ 'action' : 'open_url', 'url' : source_url }, function(response) {});
				}
				//---------------------------------------------------
				open_url(url);
			} else {
				r_list.push(url);
			}
		}
		//----------------------------------------------------------------
		if (action == 'copy_source') {
			if (r_list.length > 1) {
				r_list.push('');
			}
			s3dm.utils.copy_clipboard(r_list.join("\n"));
		}
	}
	//-----------------------------------------------------------------------
	else if (action == 'copy_download') {
		//----------------------------------------------------------------
		var d_list = [];
		var u_list = {};
		//----------------------------------------------------------------
		for (var i=0; i<s3dm.download_select_list.length; i++) {
			var s3id = s3dm.download_select_list[i];
			var aDownload = s3dm.downbar.download_list[s3id];
			if (! s3dm.utils.check_progress_state(aDownload.dlstate)) {
				var url = aDownload.finalUrl || aDownload.url;
				if (! u_list[url]) {
					d_list.push(url);
					u_list[url] = true;
				}
			}
		}
		//----------------------------------------------------------------
		if (d_list.length > 1) {
			d_list.push('');
		}
		s3dm.utils.copy_clipboard(d_list.join("\n"));
	}
	//-----------------------------------------------------------------------
	else if (action == 'delete_file') {
		//----------------------------------------------------------------
		var message = s3dm.utils.get_string('action.delete.label') + ' (' + action_count + ')';
		//----------------------------------------------------------------
		if (s3dm.utils.prefs_get("DL.confirmDeleteSystem")) {
			var s3downbar_confirmMsg = s3dm.utils.get_string("confirm.warning");
			if (! confirm(message + "\n" + s3downbar_confirmMsg)) {
				return;
			}
		}
		//----------------------------------------------------------------
		for (var i=0; i<s3dm.download_select_list.length; i++) {
			var s3id = s3dm.download_select_list[i];
			var aDownload = s3dm.downbar.download_list[s3id];
			if (! s3dm.utils.check_progress_state(aDownload.dlstate)) {
				if (aDownload.exists) {
					//---------------------------------------------
					function file_remove(aDownload2) {
						chrome.runtime.sendMessage({ 'action' : 'file_remove', 's3id' : aDownload2.s3id }, function(response){
							if (! response.success) {
								chrome.downloads.removeFile( aDownload2.id, function() { if (chrome.runtime.lastError) {}; });
							}
						});
					}
					//---------------------------------------------
					file_remove(aDownload);
				}
			}
		}
	}
	//-----------------------------------------------------------------------
	else if (action == 'remove_history') {
		//----------------------------------------------------------------
		var message = s3dm.utils.get_string('action.remove_history.label') + ' (' + action_count + ')';
		if (s3dm.utils.prefs_get("DL.confirmDeleteHistory")) {
			var s3downbar_confirmMsg = s3dm.utils.get_string("confirm.warning");
			if (! confirm(message + "\n" + s3downbar_confirmMsg)) {
				return;
			}
		}
		//----------------------------------------------------------------
		for (var i=0; i<s3dm.download_select_list.length; i++) {
			var s3id = s3dm.download_select_list[i];
			var aDownload = s3dm.downbar.download_list[s3id];
			if (! s3dm.utils.check_progress_state(aDownload.dlstate)) {
				//---------------------------------------------------
				function download_remove(aDownload2) {
					chrome.runtime.sendMessage({ 'action' : 'download_remove', 's3id' : aDownload2.s3id, 'history_remove' : true }, function(response){
						if (! response.success) {
							s3dm.utils.erase_history(aDownload2.id, aDownload2.url);
						}
					});
				}
				//---------------------------------------------------
				download_remove(aDownload);
			}
		}
	}
	//-----------------------------------------------------------------------
	else if (action == 'remove_history_all_done') {
		//----------------------------------------------------------------
		var r_list = [];
		//----------------------------------------------------------------
		for (var s3id in s3dm.downbar.download_list) {
			var aDownload = s3dm.downbar.download_list[s3id];
			if (! s3dm.utils.check_progress_state(aDownload.dlstate)) {
				r_list.push({ 's3id' : s3id, 'id' : aDownload.id, 'url' : aDownload.url });
			}
		}
		//----------------------------------------------------------------
		if (r_list.length == 0) { return; }
		//----------------------------------------------------------------
		var message = s3dm.utils.get_string('action.remove_history.label') + ' (' + r_list.length + ')';
		if (s3dm.utils.prefs_get("DL.confirmDeleteHistory")) {
			var s3downbar_confirmMsg = s3dm.utils.get_string("confirm.warning");
			if (! confirm(message + "\n" + s3downbar_confirmMsg)) {
				return;
			}
		}
		//----------------------------------------------------------------
		for (var i=0; i<r_list.length; i++) {
			var d = r_list[i];
			//---------------------------------------------------------
			function download_remove(aDownload2) {
				chrome.runtime.sendMessage({ 'action' : 'download_remove', 's3id' : aDownload2.s3id, 'history_remove' : true }, function(response){
					if (! response.success) {
						s3dm.utils.erase_history(aDownload2.id, aDownload2.url);
					}
				});
			}
			//---------------------------------------------------------
			download_remove(d);
		}
	}
	//-----------------------------------------------------------------------
	else if (action == 'remove_history_file_not_found') {
		var message = s3dm.utils.get_string('action.remove_history.label') + ' : ' + s3dm.utils.get_string('action.all_lost_files.label') + ' (' + action_count + ')';
		//----------------------------------------------------------------
		if (s3dm.utils.prefs_get("DL.confirmDeleteHistory")) {
			var s3downbar_confirmMsg = s3dm.utils.get_string("confirm.warning");
			if (! confirm(message + "\n" + s3downbar_confirmMsg)) {
				return;
			}
		}
		//----------------------------------------------------------------
		for (var s3id in s3dm.downbar.download_list) {
			var aDownload = s3dm.downbar.download_list[s3id];
			if ((! s3dm.utils.check_progress_state(aDownload.dlstate)) && (! aDownload.exists)) {
				//---------------------------------------------------
				function download_remove(aDownload2) {
					chrome.runtime.sendMessage({ 'action' : 'download_remove', 's3id' : aDownload2.s3id, 'history_remove' : true }, function(response){
						if (! response.success) {
							s3dm.utils.erase_history(aDownload2.id, aDownload2.url);
						}
					});
				}
				//---------------------------------------------------
				download_remove(aDownload);
			}
		}
	}
	//-----------------------------------------------------------------------
	else if (action == 'open_file') {
		//-----------------------------------------------------------------
		if (s3dm.download_select_list.length == 0) { return; }
		//-----------------------------------------------------------------
		var s3id = s3dm.download_select_list[0];
		var aDownload = s3dm.downbar.download_list[s3id];
		//-----------------------------------------------------------------
		if (! s3dm.utils.check_progress_state(aDownload.dlstate)) {
			if (aDownload.dlstate == 6) {
				chrome.downloads.acceptDanger(aDownload.id);
			} else if (aDownload.exists) {
				chrome.downloads.open(aDownload.id);
			} else {
				alert(s3dm.utils.get_string("message.file_not_found"));
			}
		}
	}
	//-----------------------------------------------------------------------
	else if (action == 'show_dir') {
		//-----------------------------------------------------------------
		if (s3dm.download_select_list.length == 0) { return; }
		//-----------------------------------------------------------------
		var s3id = s3dm.download_select_list[0];
		var aDownload = s3dm.downbar.download_list[s3id];
		chrome.downloads.show(aDownload.id);
	}
	//-----------------------------------------------------------------------
	else if (action == 'checksum') {
		//-----------------------------------------------------------------
		if (s3dm.download_select_list.length == 0) { return; }
		//-----------------------------------------------------------------
		var s3id = s3dm.download_select_list[0];
		var aDownload = s3dm.downbar.download_list[s3id];
		//-----------------------------------------------------------------
		if (! s3dm.utils.check_progress_state(aDownload.dlstate)) {
			if (aDownload.exists) {
				aDownload = s3dm.utils.urlencode(JSON.stringify(aDownload));
				//------------------------------------------------------------------
				chrome.windows.create({
					url: '/content/file_checksum.html?' + aDownload,
					width: 500,
					height: 300,
					left: Math.round((screen.width-500)/2),
					top: Math.round((screen.height-300)/2),
					type: 'popup'
				}, function(win) {});
			} else {
				alert(s3dm.utils.get_string("message.file_not_found"));
			}
		}
	}
	//-----------------------------------------------------------------------
	else if (action == 'select_all') {
		//----------------------------------------------------------------
		s3dm.download_unselect();
		//----------------------------------------------------------------
		for (var s3id in s3dm.downbar.download_list) {
			var aDownload = s3dm.downbar.download_list[s3id];
			aDownload.box.setAttribute('is_selected', true);
			s3dm.download_select_list.push(aDownload.s3id);
		}
	}
	//-----------------------------------------------------------------------
	else if (action == 'create_new_downloads') {
		chrome.runtime.sendMessage({ 'action' : 'create_new_downloads' }, function(response) {});
	}
	//-----------------------------------------------------------------------
}
//------------------------------------------------------------------------------
s3dm.action_all = function(action) {
	s3dm.action_run('select_all');
	s3dm.action_run(action);
	s3dm.download_unselect();
}
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
s3dm.action_click_handle = function(aDownload, event) {
	event.preventDefault();
	event.stopPropagation();

	var click_handle = aDownload.box.getAttribute('click_handle');
	if (click_handle == 'finished_click_handle') {
		s3dm.action_click_handle_finished(aDownload, event);
	}
	else if (click_handle == 'progress_click_handle') {
		s3dm.action_click_handle_progress(aDownload, event);
	}
}
//------------------------------------------------------------------------------
s3dm.action_click_handle_progress = function(aDownload, event) {
	var state = aDownload.dlstate;
	var is_dblclick = (event.type == 'dblclick') ? true : false;

	if (is_dblclick && (event.button == 0)) {  // left click
		if (state == 0 | state == 5) {
			s3dm.action('pause');
		}
			
		if (state == 4) {
			s3dm.action('resume');
		}
	}
	//-----------------------------------------------------------------------
	else if (event.button == 0) {	// left click
		s3dm.downbar.tooltip_hide_force();
	}
	//-----------------------------------------------------------------------
	else if (event.button == 1) {  // middle click
		s3dm.action('cancel');
	}
	//-----------------------------------------------------------------------
	else if (event.button == 2) {
		// Hide the tooltip if present, otherwise both right-click menu and tooltip will disappear together
	}
	
}
//------------------------------------------------------------------------------
s3dm.action_click_handle_finished = function(aDownload, event) {
	var is_dblclick = (event.type == 'dblclick') ? true : false;
	//-----------------------------------------------------------------------
	if (is_dblclick && (event.button == 0)) {  // left click
		if (event.ctrlKey) {
			s3dm.action('show_dir');
		} else {
			s3dm.action('open_file');
		}
		return;
	}
	//-----------------------------------------------------------------------
	else if (event.button == 0) {	// left click
		s3dm.downbar.tooltip_hide_force();
	}
	//-----------------------------------------------------------------------
	else if (event.button == 1) {	// middle click
		if (event.ctrlKey) {
			s3dm.action('delete_file', s3dm.download_select_list.length);
		} else {
			s3dm.action('remove_history', s3dm.download_select_list.length);
		}
	}
	//-----------------------------------------------------------------------
	else if (event.button == 2) {	// right click
		// Hide the tooltip if present, otherwise both right-click menu and tooltip will disappear together
//		document.getElementById("s3downbar_finTip").hidePopup();
	}
}
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
s3dm.action_draw_begin = function(event) {
	if (event.button != 0) {
		return s3dm.action_draw_end(event);
	}
	if (event.ctrlKey) {
		return s3dm.action_draw_end(event);
	}
	if (s3dm.utils.check_click_tooltip(event.target)) {
		return;
	}
	//------------------------------------------------------------------------
	var box = document.getElementById("s3downbar_draw_box");
	var hbox = document.getElementById("s3downbar_draw_box_hbox");
	s3dm.download_list_box.setAttribute('start_draw', true);

	//------------------------------------------------------------------------
	s3dm.draw_box.start_x = event.pageX;
	s3dm.draw_box.start_y = event.pageY;

	var id_start = s3dm.action_draw_search_downloads(event.pageX, event.pageY-window.scrollY);
	s3dm.draw_box.idx_start = s3dm.sort_download_list.indexOf(id_start);

	//------------------------------------------------------------------------
	box.style.left = event.pageX + "px";
	box.style.top = event.pageY + "px";
	hbox.style.width = '0px';
	hbox.style.height = '0px';
	s3dm.draw_box.start_draw = true;
}
//------------------------------------------------------------------------------
s3dm.action_draw_move = function(event) {
	//------------------------------------------------------------------------
	if (! s3dm.draw_box.start_draw) {
		return;
	}
	//------------------------------------------------------------------------
	var box = document.getElementById("s3downbar_draw_box");
	var hbox = document.getElementById("s3downbar_draw_box_hbox");
	//------------------------------------------------------------------------
	var mouseX = event.pageX;
	var mouseY = event.pageY;
	//------------------------------------------------------------------------
	var left = mouseX < s3dm.draw_box.start_x ? mouseX : s3dm.draw_box.start_x;
	var top = mouseY < s3dm.draw_box.start_y ? mouseY : s3dm.draw_box.start_y;
	//------------------------------------------------------------------------
	var width = Math.abs(mouseX - s3dm.draw_box.start_x);
	var height = Math.abs(mouseY - s3dm.draw_box.start_y);

	//------------------------------------------------------------------------
	box.style.left = left + "px";
	box.style.top = top + "px";
	//------------------------------------------------------------------------
	hbox.style.width = width + 'px';
	hbox.style.height = height + 'px';

	//------------------------------------------------------------------------
	s3dm.download_unselect();
	//------------------------------------------------------------------------
	box.setAttribute('is_hidden', true);
	var id_end = s3dm.action_draw_search_downloads(mouseX, mouseY-window.scrollY);
	box.setAttribute('is_hidden', false);
	//------------------------------------------------------------------------
	var idx_end = s3dm.sort_download_list.indexOf(id_end);
	var i_start = (s3dm.draw_box.idx_start > idx_end) ? idx_end : s3dm.draw_box.idx_start;
	var i_end = (s3dm.draw_box.idx_start > idx_end) ? s3dm.draw_box.idx_start : idx_end;
	//------------------------------------------------------------------------
	for (var i=i_start; i<=i_end; i++) {
		if (i >= 0) {
			document.getElementById(s3dm.sort_download_list[i]).setAttribute('is_selected', true);
			s3dm.download_select_list.push(s3dm.sort_download_list[i]);
		}
	}
}
//------------------------------------------------------------------------------
s3dm.action_draw_search_downloads = function(x, y) {
	var el = document.elementFromPoint(x, y);
	//------------------------------------------------------------------------
	var id = -1;
	while (el && el.parentNode) {
		if (s3dm.downbar.download_list[el.id]) {
			id = el.id;
			break;
		}
		el = el.parentNode;
	}
	//------------------------------------------------------------------------
	if (id<0) {
		if (y>0) {
			id = s3dm.action_draw_search_downloads(x, y-3);
		}
	}
	//------------------------------------------------------------------------
	return id;
}
//------------------------------------------------------------------------------
s3dm.action_draw_end = function(event) {
	document.getElementById("s3downbar_draw_box").setAttribute('is_hidden', true);
	if (s3dm.draw_box.start_draw) {
		setTimeout(function(){
			if (s3dm.download_select_list.length > 1) {
				s3dm.contextmenu.create(event, 'menu_downloads');
			}
		}, 100);
	}
	s3dm.draw_box.start_draw = false;
	s3dm.download_list_box.setAttribute('start_draw', false);
}
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
s3dm.action_keyboard_move = function(event) {
	if (event.target && event.target.id && s3dm.downbar.download_list[event.target.id]) {
	} else {
		return;
	}
	//------------------------------------------------------------------------
	var s3id = event.target.id;
	//------------------------------------------------------------------------
	s3dm.contextmenu.destroy();
	//------------------------------------------------------------------------
	if (event.keyCode == 38) {
		var idx = s3dm.sort_download_list.indexOf(s3id);
		s3dm.action_keyboard_move_func(event, idx, idx-1);
		event.preventDefault();
	} else if (event.keyCode == 40) {
		var idx = s3dm.sort_download_list.indexOf(s3id);
		s3dm.action_keyboard_move_func(event, idx, idx+1);
		event.preventDefault();
	} else if (event.keyCode == 32) {
		var idx = s3dm.sort_download_list.indexOf(s3id);
		s3dm.action_keyboard_move_func({ shiftKey: true }, idx, idx);
		event.preventDefault();
	} else if (event.keyCode == 27) {
		s3dm.download_unselect();
	}
}
//------------------------------------------------------------------------------
s3dm.action_keyboard_move_func = function(event, idx_old, idx_new) {
	if (idx_new<0) {
		idx_new = 0;
	}
	else if (idx_new > s3dm.sort_download_list.length-1) {
		idx_new = s3dm.sort_download_list.length-1;
	}
	//------------------------------------------------------------------------
	if ((! event.ctrlKey) && (! event.shiftKey)) {
		s3dm.download_unselect();
	}
	//------------------------------------------------------------------------
	s3dm.downbar.tooltip_hide_force();
	//------------------------------------------------------------------------
	document.getElementById(s3dm.sort_download_list[idx_new]).focus();
	//------------------------------------------------------------------------
	var idx_old_s = s3dm.download_select_list.indexOf(s3dm.sort_download_list[idx_old]);
	var idx_new_s = s3dm.download_select_list.indexOf(s3dm.sort_download_list[idx_new]);
	var idx_old_selected = false;
	var idx_new_selected = false;
	//------------------------------------------------------------------------
	if (event.shiftKey) {
		if ((idx_old_s >= 0) && (idx_new_s < 0)) {
			idx_old_selected = true;
			idx_new_selected = true;
		}
		else if ((idx_old_s >= 0) && (idx_new_s >= 0)) {
			idx_old_selected = false;
			idx_new_selected = true;
		}
		else if ((idx_old_s < 0) && (idx_new_s < 0)) {
			idx_old_selected = true;
			idx_new_selected = true;
		}
		else if ((idx_old_s < 0) && (idx_new_s >= 0)) {
			idx_old_selected = false;
			idx_new_selected = false;
		}
	}
	else if (! event.ctrlKey) {
		idx_old_selected = false;
		idx_new_selected = true;
	}

	//------------------------------------------------------------------------
	if (! event.ctrlKey) {
		if (idx_old_selected) {
			if (idx_old_s < 0) {
				document.getElementById(s3dm.sort_download_list[idx_old]).setAttribute('is_selected', true);
				s3dm.download_select_list.push(s3dm.sort_download_list[idx_old]);
			}
		} else if (idx_old_s >= 0) {
			s3dm.download_unselect(idx_old_s);
		}
		//------------------------------------------------------------------------
		if (idx_new_selected) {
			if ((idx_new_s <0) && (idx_new != idx_old)) {
				document.getElementById(s3dm.sort_download_list[idx_new]).setAttribute('is_selected', true);
				s3dm.download_select_list.push(s3dm.sort_download_list[idx_new]);
			}
		} else if (idx_new_s >= 0) {
			s3dm.download_unselect(idx_new_s);
		}
	}
}
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
s3dm.search = function(text) {
	//------------------------------------------------------------------------
	s3dm.filter_text = text;
	s3dm.download_unselect();
	s3dm.downbar.download_list = {};
	s3dm.sort_download_list = [];

	//------------------------------------------------------------------------
	for (var s3id in s3dm.download_list_all) {
		var aDownload = s3dm.download_list_all[s3id];
		if (s3dm.check_download_filter(aDownload)) {
			s3dm.downbar.download_list[s3id] = aDownload;
//			s3dm.sort_download_list.push(s3id);
			aDownload.box.setAttribute('is_hidden', false);
		} else {
			aDownload.box.setAttribute('is_hidden', true);
		}
	}
	//------------------------------------------------------------------------
	s3dm.download_sort();
	s3dm.count_summary();
}
//------------------------------------------------------------------------------
s3dm.check_download_filter = function(aDownload) {
	if (! s3dm.filter_text) { return true; }

	var fields_list = s3dm.prefs.get('DL.fields_list');
	var fields_map = {
		'FileName' : 'sort_filename', 
		'FileExt' : 'sort_fileext', 
		'FileFullPath' : 'sort_filepath', 
		'FileSize' : '', 
		'Progress' : '', 
		'ProgressPercent' : '', 
		'Speed' : '', 
		'TimeRemaining' : '', 
		'URL' : 'sort_url', 
		'Domain' : 'sort_domain', 
		'DateTime' : ''
	};
	//------------------------------------------------------------------------
	for (var i=0; i<s3dm.fields_list.length; i++) {
		var field = s3dm.fields_list[i];
		if (! fields_list[field].disabled) {
			if (fields_map[field]) {
				if (aDownload[fields_map[field]].toLowerCase().indexOf(s3dm.filter_text) >= 0) {
					return true;
				}
			}
		}
	}

	//------------------------------------------------------------------------
	return false;
}
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
s3dm.download_sort_set = function(sortName) {
	if (sortName == s3dm.sortName) {
		s3dm.sortDirection = (s3dm.sortDirection == 'ascending') ? 'descending' : 'ascending';
	} else {
		s3dm.sortName = sortName;
		s3dm.sortDirection = 'ascending';
	}

	s3dm.download_list_head.setAttribute('sortName', s3dm.sortName);
	s3dm.download_list_head.setAttribute('sortDirection', s3dm.sortDirection);
	s3dm.pref_save('DL.sortName', s3dm.sortName);
	s3dm.pref_save('DL.sortDirection', s3dm.sortDirection);


	s3dm.download_sort();
}
//------------------------------------------------------------------------------
s3dm.download_sort = function() {
	s3dm.sort_handler_count++;

	//------------------------------------------------------------------------
	if (s3dm.sort_handler != null) {
		try { clearTimeout(s3dm.sort_handler); } catch(e) {};
	}
	//------------------------------------------------------------------------
	if (s3dm.sort_handler_count > 1000) {
		s3dm.download_sort_count_clear();
	} else {
		s3dm.sort_handler = setTimeout(function(){ s3dm.download_sort_count_clear(); } , 150);
	}
}
//------------------------------------------------------------------------------
s3dm.download_sort_count_clear = function() {
	s3dm.sort_handler_count = 0;
	s3dm.sort_handler = null;
	s3dm.download_sort_run();
}
//------------------------------------------------------------------------------
s3dm.download_sort_func = function(a1, b1) {
	var field = 'sort_datetime'; 
	var field_type = 'number';

	if (s3dm.sortName == "FileName") { field = 'sort_filename'; field_type = 'string'; }
	else if (s3dm.sortName == "FileExt") { field = 'sort_fileext'; field_type = 'string'; }
	else if (s3dm.sortName == "FileFullPath") { field = 'sort_filepath'; field_type = 'string'; }
	else if (s3dm.sortName == "DateTime") { field = 'sort_datetime'; field_type = 'number'; }
	else if (s3dm.sortName == "FileSize") { field = 'sort_filesize'; field_type = 'number'; }
	else if (s3dm.sortName == "Domain") { field = 'sort_domain'; field_type = 'string'; }
	else if (s3dm.sortName == "URL") { field = 'sort_url'; field_type = 'string'; }
	else if (s3dm.sortName == "ProgressPercent") { field = 'sort_percent'; field_type = 'number'; }
	else if (s3dm.sortName == "Speed") { field = 'sort_speed'; field_type = 'number'; }
	else if (s3dm.sortName == "Progress") { field = 'sort_progress'; field_type = 'number'; }
	else if (s3dm.sortName == "TimeRemaining") { field = 'sort_time_remaining'; field_type = 'number'; }

	//------------------------------------------------------------------------
	if (field == 'sort_progress') {
		var state = { '0' : 1, '4' : 2, '1' : 3 };

		var a = state[a1.dlstate] || 99;
		var b = state[b1.dlstate] || 99;
	
		if (a > b) { return (s3dm.sortDirection == 'ascending') ? 1 : -1; }
		else if (a < b) { return (s3dm.sortDirection == 'ascending') ? -1 : 1; }
		else if (a1.sort_percent > b1.sort_percent) { return 1; }
		else if (a1.sort_percent < b1.sort_percent) { return -1; }
		else if (a1.exists > b1.exists) { return (s3dm.sortDirection == 'ascending') ? -1 : 1; }
		else if (a1.exists < b1.exists) { return (s3dm.sortDirection == 'ascending') ? 1 : -1; }
	}
	//------------------------------------------------------------------------
	else if (field == 'sort_percent') {

		if (a1.sort_percent > b1.sort_percent) { return (s3dm.sortDirection == 'ascending') ? 1 : -1; }
		else if (a1.sort_percent < b1.sort_percent) { return (s3dm.sortDirection == 'ascending') ? -1 : 1; }
		else if (a1.exists > b1.exists) { return (s3dm.sortDirection == 'ascending') ? -1 : 1; }
		else if (a1.exists < b1.exists) { return (s3dm.sortDirection == 'ascending') ? 1 : -1; }
	}
	//------------------------------------------------------------------------
	else {
		var a = a1[field];
		var b = b1[field];
	
		if (field_type == 'string') {
			a = a.toLowerCase();
			b = b.toLowerCase();
			if (/^[^0-9a-z]/.test(a)) { a = 'z' + a; }
			if (/^[^0-9a-z]/.test(b)) { b = 'z' + b; }
		}
		if (a > b) { return (s3dm.sortDirection == 'ascending') ? 1 : -1; }
		else if (a < b) { return (s3dm.sortDirection == 'ascending') ? -1 : 1; }
	}

	//------------------------------------------------------------------------
	if (a1.sort_datetime > b1.sort_datetime) { return -1; }
	if (a1.sort_datetime < b1.sort_datetime) { return 1;  }
	return 0; 
}
//------------------------------------------------------------------------------
s3dm.download_sort_run = function() {
	var d_list = s3dm.utils.get_downlist(s3dm.downbar.download_list);
	var result = d_list.sort(s3dm.download_sort_func);
	var sort_new_list = [];
	//------------------------------------------------------------------------
	for (var i=0; i<result.length; i++) {
		if (! document.getElementById(result[i].s3id)) {
			continue;
		}
		if (result.length == s3dm.sort_download_list.length) {
			if (result[i].s3id != s3dm.sort_download_list[i]) {
				var new_el = document.getElementById(result[i].s3id);
				var old_el = document.getElementById(s3dm.sort_download_list[i]);
				var next_el = new_el.nextSibling;
				//-----------------------------------------------------
				s3dm.download_list_box.replaceChild(new_el, old_el);
				//-----------------------------------------------------
				var new_id = s3dm.sort_download_list.indexOf(result[i].s3id);
				s3dm.sort_download_list.splice(i, 1, new_el.id);
				s3dm.sort_download_list.splice(new_id, 1, old_el.id);
				//-----------------------------------------------------
				if (next_el && (next_el.id != old_el.id)) {
					s3dm.download_list_box.insertBefore(old_el, next_el);	
				} else {
					s3dm.download_list_box.appendChild(old_el);
				}
			}
		}
		//------------------------------------------------------------------
		else {
			s3dm.download_list_box.appendChild(document.getElementById(result[i].s3id));
		}
		sort_new_list.push(result[i].s3id);
	}
	//------------------------------------------------------------------------
	if (sort_new_list.length != s3dm.sort_download_list.length) {
		s3dm.sort_download_list = sort_new_list;
	}
}
//------------------------------------------------------------------------------
s3dm.pref_save = function(pref_name, pref_value, callback) {
	chrome.runtime.sendMessage({ 'action_prefs_set': true, 'pref_name' : pref_name, 'pref_value': pref_value }, function(response) {
		s3dm.utils.prefs_set(pref_name, pref_value);
		if (callback) {
			callback(pref_name, pref_value);
		}
	});
}
//------------------------------------------------------------------------------
s3dm.onMessage = function(request, sender, sendResponse) {
	//------------------------------------------------------------------------
	if (! request) { return; }
	//------------------------------------------------------------------------
	else if (request.set_image_preview && request.s3id && request.image_url) {
		var aDownload = s3dm.downbar.download_list[request.s3id];
		if (aDownload) {
			var img_preview = s3dm.utils.get_element(aDownload.box, 's3downbar_download_tooltip_img_preview');
			s3dm.utils.get_img_size(request.image_url, img_preview, function(width, height){
				if (s3dm.downbar.current_tooltip_box == aDownload.box) {
					s3dm.downbar.tooltip_show(aDownload.box);
				}
				var img_size = s3dm.utils.get_element(aDownload.box, 's3downbar_download_tooltip_img_size');
				s3dm.utils.HTMLDOM_value(img_size, width + ' x ' + height);
			});
		}
		sendResponse({ 'success' : true });
	}
	//------------------------------------------------------------------------
/*
	else if (request.action_set_styles) {
		s3dm.downbar.get_download_template(function(){
			if (s3dm.downbar.create_downbar_box()) {
				s3dm.downbar.create_download_bar(request.download_list);
			}
		});
		sendResponse({ 'success' : true });
	}
*/
}
//------------------------------------------------------------------------------
window.addEventListener("load", s3dm.init);
