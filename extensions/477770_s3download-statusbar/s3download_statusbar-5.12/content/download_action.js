var s3dm = {};
s3dm.aDownload = {};

//------------------------------------------------------------------------------
s3dm.init_0 = function() {
	s3dm.prefs.init(function(){
		setTimeout(function(){ s3dm.utils.i18n_parse(document); }, 100);
		s3dm.init();
	});
}
//------------------------------------------------------------------------------
s3dm.init = function() {
	var params = String(location.search).replace(/\?/g, '');
	params = decodeURIComponent(params.replace(/\+/g, ' ')).replace(/\%21/g, '!').replace(/\%27/g, "'").replace(/\%28/g, '(').replace(/\%29/g, ')').replace(/\%2A/g, '*');
	s3dm.aDownload = JSON.parse(params);

	var dpane_action = document.getElementById('dpane_action');

	//------------------------------------------------------------------------
	if (s3dm.aDownload.is_popup) {
		s3dm.make_tooltip(s3dm.aDownload);
		chrome.runtime.onMessage.addListener(s3dm.onMessage);
	}
	//------------------------------------------------------------------------
	dpane_action.addEventListener("mousedown", function(event) {
		if (event.button == 1) {
			event.preventDefault();
			event.stopPropagation();
		}
	}, true);
	//------------------------------------------------------------------------
	dpane_action.addEventListener("mouseover", function(event) {
		if (! s3dm.aDownload.is_popup) {
			chrome.runtime.sendMessage({ 'frame_show_tooltip' : true, 's3id' : s3dm.aDownload.s3id }, function(response) { if (chrome.runtime.lastError) {} });
		}
	}, true);
	//------------------------------------------------------------------------
	dpane_action.addEventListener("mousemove", function(event) {
		if (! s3dm.aDownload.is_popup) {
			chrome.runtime.sendMessage({ 'frame_show_tooltip' : true, 's3id' : s3dm.aDownload.s3id }, function(response) { if (chrome.runtime.lastError) {} });
		}
	}, true);
	//------------------------------------------------------------------------
	dpane_action.addEventListener("mouseout", function(event) {
		chrome.runtime.sendMessage({ 'frame_hide_tooltip' : true }, function(response) { if (chrome.runtime.lastError) {} });
	}, true);
	//------------------------------------------------------------------------
	dpane_action.addEventListener("click", function(event) {
		event.preventDefault();
		event.stopPropagation();
		s3dm.click_handle(event);
	}, true);
	//------------------------------------------------------------------------
	dpane_action.addEventListener("auxclick", function(event) {
		s3dm.click_handle(event);
	}, true);
	//------------------------------------------------------------------------
	dpane_action.addEventListener("dblclick", function(event) {
		s3dm.click_handle(event);
	}, true);
	//------------------------------------------------------------------------
	dpane_action.addEventListener("contextmenu", function(event) {
		event.preventDefault();
		event.stopPropagation();
		var msg = { 'frame_contextmenu_show' : true, 's3id' : s3dm.aDownload.s3id, 'event' : { 'clientX' : event.clientX, 'clientY' : event.clientY } };
		if (s3dm.aDownload.is_popup) {
			msg.tab_id = 'is_popup';
		}
		chrome.runtime.sendMessage(msg, function(response) { if (chrome.runtime.lastError) {} });
	}, true);
	//------------------------------------------------------------------------
	dpane_action.addEventListener("dragstart", function(event) {
		event.preventDefault();
		event.stopPropagation();
		if ((s3dm.aDownload.click_handle == 'finished_click_handle') && (s3dm.aDownload.exists)) {
			if (chrome.downloads) {
				chrome.downloads.drag(s3dm.aDownload.id);
			}
		}
	}, true);
}
//------------------------------------------------------------------------------
s3dm.click_handle = function(event) {
	event.preventDefault();
	event.stopPropagation();

	if (s3dm.aDownload.click_handle == 'finished_click_handle') {
		s3dm.finished_click_handle(event);
	}
	else if (s3dm.aDownload.click_handle == 'progress_click_handle') {
		s3dm.progress_click_handle(event);
	}
}
//------------------------------------------------------------------------------
s3dm.progress_click_handle = function(event) {
	var state = s3dm.aDownload.dlstate;
	var is_dblclick = (event.type == 'dblclick') ? true : false;

	if (is_dblclick && (event.button == 0)) {  // left click
		if (state == 0 | state == 5) {
			s3dm.action_progress(s3dm.aDownload.s3id, 'pause');
		}
			
		if (state == 4) {
			s3dm.action_progress(s3dm.aDownload.s3id, 'resume');
		}
	}
	//-----------------------------------------------------------------------
	else if (event.button == 0) {	// left click
		chrome.runtime.sendMessage({ 'frame_hide_tooltip' : true }, function(response) { if (chrome.runtime.lastError) {} });
	}
	//-----------------------------------------------------------------------
	else if (event.button == 1) {  // middle click
		s3dm.action_progress(s3dm.aDownload.s3id, 'cancel');
	}
	//-----------------------------------------------------------------------
	else if (event.button == 2) {
		// Hide the tooltip if present, otherwise both right-click menu and tooltip will disappear together
//   		document.getElementById("s3downbar_progTip").hidePopup();
	}
	
}
//------------------------------------------------------------------------------
s3dm.finished_click_handle = function(event) {
	var is_dblclick = (event.type == 'dblclick') ? true : false;
	//-----------------------------------------------------------------------
	if (is_dblclick && (event.button == 0)) {  // left click
		if (event.ctrlKey) {
			s3dm.start_show_file(s3dm.aDownload.s3id, true);
		} else {
			s3dm.start_open_finished(s3dm.aDownload.s3id);
		}
		return;
	}
	//-----------------------------------------------------------------------
	else if (event.button == 0) {	// left click
		chrome.runtime.sendMessage({ 'frame_hide_tooltip' : true }, function(response) { if (chrome.runtime.lastError) {} });
	}
	//-----------------------------------------------------------------------
	else if (event.button == 1) {	// middle click
		if (event.ctrlKey) {
			s3dm.start_delete(s3dm.aDownload.s3id, event);
		} else {
			s3dm.animate_decide(s3dm.aDownload.s3id, "clear", event);
		}
	}
	//-----------------------------------------------------------------------
	else if (event.button == 2) {	// right click
		// Hide the tooltip if present, otherwise both right-click menu and tooltip will disappear together
//		document.getElementById("s3downbar_finTip").hidePopup();
	}
}
//------------------------------------------------------------------------------
s3dm.action_progress = function(s3id, action) {
	chrome.runtime.sendMessage({ 'frame_action_progress' : true, 's3id' : s3id, 'action' : action }, function(response) { if (chrome.runtime.lastError) {} });
}
//------------------------------------------------------------------------------
s3dm.start_show_file = function(idtoshow, completed) {
	chrome.runtime.sendMessage({ 'frame_start_show_file' : true, 's3id' : idtoshow, 'completed' : completed }, function(response) { if (chrome.runtime.lastError) {} });
}
//------------------------------------------------------------------------------
s3dm.start_open_finished = function(idtoopen) {
	var is_opened = false;

	if (chrome.downloads) {
		chrome.downloads.open(s3dm.aDownload.id);
		is_opened = true;
	}
	chrome.runtime.sendMessage({ 'frame_start_open_finished' : true, 's3id' : idtoopen, 'is_opened' : is_opened }, function(response) { if (chrome.runtime.lastError) {} });
}
//------------------------------------------------------------------------------
s3dm.start_delete = function(elemIDtodelete, event) {
	chrome.runtime.sendMessage({ 'frame_start_delete' : true, 's3id' : elemIDtodelete, 'event' : { 'shiftKey' : event.shiftKey } }, function(response) { if (chrome.runtime.lastError) {} });
}
//------------------------------------------------------------------------------
s3dm.animate_decide = function(elemid, doWhenDone, event) {
	chrome.runtime.sendMessage({ 'frame_animate_decide' : true, 's3id' : elemid, 'doWhenDone' : doWhenDone, 'event' : { 'shiftKey' : event.shiftKey } }, function(response) { if (chrome.runtime.lastError) {} });
}
//------------------------------------------------------------------------------
s3dm.make_tooltip = function(aDownload) {
	var result = (aDownload.finalUrl || aDownload.url) + "\n" + aDownload.filename + "\n";
	var s3downbar_unkStr = s3dm.utils.get_string("display.unknown");

	//------------------------------------------------------------------------
	if (s3dm.utils.check_progress_state(aDownload.dlstate)) {
		var currSize = 0;
		var totalSize = '-.--';
		var percent = '0%';
		var speed_text = '-.--';
		//-----------------------------------------------------------------------
		if (aDownload.dlstate == 5) {
			currSize = "0 " + s3dm.utils.get_string("display.bytes_abbr");
			totalSize = s3downbar_unkStr;
			percent = s3downbar_unkStr;
		}
		// state is inprog or paused
		else {
			currSize = aDownload.pOldSavedKBytes;
			totalSize = aDownload.totalBytes;
			percent = aDownload.progress + '%';
			if (aDownload.dlstate != 4) {
				speed_text = s3dm.utils.get_strings_to_KB_MB_GB(aDownload.speed, true);
			}
	
			//-----------------------------------------------------------------
			// If the mode is undetermined, we won't know these - should totalsize be -1?
			//-----------------------------------------------------------------
			if ((parseInt(currSize) > parseInt(totalSize)) || (parseInt(totalSize)>100000000000000)) { // 18 446 100 000 000 000 000
				percent = s3downbar_unkStr;
				totalSize = s3downbar_unkStr;
			}
			else {
				totalSize = s3dm.utils.get_strings_to_KB_MB_GB(totalSize);
			}
		}
	
		//-----------------------------------------------------------------------
		currSize = s3dm.utils.get_strings_to_KB_MB_GB(currSize);
		//------------------------------------------------------------------
		result += currSize + " / " + totalSize + " ( " + speed_text + " )" + "\n";
		result += percent;

		//------------------------------------------------------------------
		if (! s3dm.utils.prefs_get("function.showTooltip_hint")) {
			result += "\n--------------------------------------------------\n";
			result += s3dm.utils.get_string("download.tooltip_progress_hint1.label") + "\n";
			result += s3dm.utils.get_string("download.tooltip_progress_hint2.label");
		}
	}
	//------------------------------------------------------------------------
	else {
		if (aDownload.exists && (aDownload.fileSize>=0)) {	// may be .totalBytes ?
			result += s3dm.utils.get_strings_to_KB_MB_GB(aDownload.fileSize);
		} else {
			result += s3dm.utils.get_string("message.file_not_found");
		}
		//------------------------------------------------------------------
		if (! s3dm.utils.prefs_get("function.showTooltip_hint")) {
			result += "\n--------------------------------------------------\n";
			result += s3dm.utils.get_string("download.tooltip_finish_hint1.label") + "\n";
			result += s3dm.utils.get_string("download.tooltip_finish_hint2.label") + "\n";
			result += s3dm.utils.get_string("download.tooltip_finish_hint3.label") + "\n";
			result += s3dm.utils.get_string("download.tooltip_finish_hint4.label") + "\n";
			result += s3dm.utils.get_string("download.tooltip_finish_hint5.label");
		}
	}

	//------------------------------------------------------------------------
	document.getElementById('dpane_action').setAttribute('title', result);
}
//------------------------------------------------------------------------------
s3dm.onMessage = function(request, sender, sendResponse) {
	//------------------------------------------------------------------------
	if (! request) { return; }
	//------------------------------------------------------------------------
	if (request.action_event_changed && request.aDownload) {
		if (request.aDownload.s3id == s3dm.aDownload.s3id) {
			s3dm.make_tooltip(request.aDownload);
		}
	}
}
//------------------------------------------------------------------------------
window.addEventListener("load", s3dm.init_0);
