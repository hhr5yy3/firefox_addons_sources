s3dm.action = {};

//------------------------------------------------------------------------------
s3dm.action.start_auto_clear = function(idtoclear, timeout, is_quick) {
	if (! s3dm.downbar.download_list[idtoclear]) { return; }
	setTimeout(function(){ try { s3dm.action.animate_decide(idtoclear, "clear", {shiftKey:is_quick}); } catch(e) {}}, timeout)
}
//------------------------------------------------------------------------------
s3dm.action.animate_decide = function(elemid, doWhenDone, event) {
	if (! s3dm.downbar.download_list[elemid]) { return; }
	if (s3dm.utils.get_use_animation() && !event.shiftKey) {
		s3dm.action.clear_animate(elemid, 1, 125, doWhenDone);
	}
   	else {
		if (doWhenDone == "clear") {
   			s3dm.action.clear_one(elemid);
		} else {
   			s3dm.action.start_delete(elemid, event);
		}
   	}
}
//------------------------------------------------------------------------------
s3dm.action.clear_animate = function(idtoanimate, curropacity, currsize, doWhenDone) {
	if (! s3dm.downbar.download_list[idtoanimate]) { return; }
	if(curropacity < .05) {
		if (doWhenDone == "clear") {
			s3dm.action.clear_one(idtoanimate);
		} else {
			s3dm.action.finish_delete(idtoanimate);
		}
		return;
	}
	s3dm.utils.set_element_style(s3dm.downbar.download_list[idtoanimate].box, 'opacity: ' + (curropacity-.04));
	s3dm.utils.set_element_style(s3dm.downbar.download_list[idtoanimate].box, 'min-width: 10px');
	s3dm.utils.set_element_style(s3dm.downbar.download_list[idtoanimate].box, 'max-width: ' + (currsize-5.2) + 'px');
	window.setTimeout(function(){s3dm.action.clear_animate(idtoanimate, curropacity-.04, currsize-5.2, doWhenDone);}, 15);
}
//------------------------------------------------------------------------------
s3dm.action.clear_one = function(idtoclear) {
	var aDownload = s3dm.downbar.download_list[idtoclear];
	var not_real_remove = aDownload.not_real_remove;
	aDownload.box.parentNode.removeChild(aDownload.box);
	//----------------------------------------------------------------------
	if (! not_real_remove) {
		var keepHistory = s3dm.utils.prefs_get('function.keepHistory', true);
		var history_remove = ! keepHistory;

		chrome.runtime.sendMessage({ 'action' : 'download_remove', 's3id' : idtoclear, 'history_remove' : history_remove }, function(response) { });
		if (! history_remove) {
			s3dm.downbar.undo_view_list.push(aDownload);
		}
	}
	//----------------------------------------------------------------------
	delete s3dm.downbar.download_list[idtoclear];
	s3dm.viewer.count_summary();
}
//------------------------------------------------------------------------------
s3dm.action.start_delete = function(elemIDtodelete, event) {
	var aDownload = s3dm.downbar.download_list[elemIDtodelete];

	var askOnDelete = s3dm.utils.prefs_get("function.askOnDelete");
	if (askOnDelete) {
		var confirmMsg = s3dm.utils.get_string("confirm.delete") + "\n\n" + aDownload.filename + "\n ";
		if (! confirm(confirmMsg)) {
			return;
		}
	}

	if (s3dm.utils.get_use_animation() && !event.shiftKey) {
		s3dm.utils.get_element(aDownload.box, 's3downbar_download_box_img').src = chrome.extension.getURL('/skin/delete1.png');
		window.setTimeout(function(){s3dm.action.delete_animate_cont(elemIDtodelete);}, 150);
	}
	else {
		s3dm.action.finish_delete(elemIDtodelete);
	}
}
//------------------------------------------------------------------------------
s3dm.action.delete_animate_cont = function(elemIDtodelete) {
	var aDownload = s3dm.downbar.download_list[elemIDtodelete];
	s3dm.utils.get_element(aDownload.box, 's3downbar_download_box_img').src = chrome.extension.getURL('/skin/delete2.png');
	s3dm.action.clear_animate(elemIDtodelete, 1, 125, "delete");
}
//------------------------------------------------------------------------------
s3dm.action.finish_delete = function(elemIDtodelete) {
	chrome.runtime.sendMessage({ 'action' : 'file_remove', 's3id' : elemIDtodelete }, function(response) {
		s3dm.action.clear_one(elemIDtodelete);
	});
}
//------------------------------------------------------------------------------
s3dm.action.start_show_file = function(idtoshow, completed) {
	if (s3dm.utils.get_use_animation() && completed) {
		var aDownload = s3dm.downbar.download_list[idtoshow];
		var picToShrink = s3dm.utils.get_element(aDownload.box, 's3downbar_download_box_picToShrink');

		picToShrink.src = chrome.extension.getURL('/skin/folder.png');
//		s3dm.utils.set_element_style(picToShrink, 'opacity: 0.5');
		picToShrink.setAttribute('is_hidden', false);
		s3dm.action.show_animate_cont(idtoshow, 1);
		window.setTimeout(function(){s3dm.action.finish_show(idtoshow, completed);}, 50);
	} else {
		s3dm.action.finish_show(idtoshow, completed);
	}
}
//------------------------------------------------------------------------------
s3dm.action.show_animate_cont = function(idtoshow, newsize) {
	var aDownload = s3dm.downbar.download_list[idtoshow];
	var picToShrink = s3dm.utils.get_element(aDownload.box, 's3downbar_download_box_picToShrink');

	if (newsize > 16) {
		// put the icon back how it's supposed to be after 1 sec.
		window.setTimeout(function() {
			try{
				picToShrink.src = "";
				s3dm.utils.set_element_style(picToShrink, 'height:16px; width:16px;');
				picToShrink.setAttribute('is_hidden', true);
			} catch(e){}
		}, 1000);
	}
	else {
		s3dm.utils.set_element_style(picToShrink, 'height: ' + newsize + 'px; width: ' + newsize + 'px;');
		window.setTimeout(function(){s3dm.action.show_animate_cont(idtoshow, newsize+2);}, 25);
	}
}
//------------------------------------------------------------------------------
s3dm.action.finish_show = function(idtoshow, completed) {
	chrome.runtime.sendMessage({ 'action' : 'file_show', 's3id' : idtoshow }, function(response) {});

	var removeOnShow = s3dm.utils.prefs_get("function.removeOnShow");
	if (removeOnShow && completed) {
		s3dm.action.animate_decide(idtoshow, "clear", {shiftKey:false});
	}
}
//------------------------------------------------------------------------------
s3dm.action.start_open_finished = function(idtoopen, is_opened) {
	var aDownload = s3dm.downbar.download_list[idtoopen];
	//------------------------------------------------------------------------
	if (aDownload.dlstate == 6) {  // Don't open Anti-virus Blocked downloads
		chrome.runtime.sendMessage({ 'action' : 'file_locked', 's3id' : idtoopen }, function(response) {});
		return;
	}
	//------------------------------------------------------------------------
	else if (aDownload.dlstate == 8) {  // Don't open Anti-virus Blocked downloads
		alert(s3dm.utils.get_string("message.av_cannotopen"));
		return;
	}
		
	if (s3dm.utils.get_use_animation()) {
		var picToShrink = s3dm.utils.get_element(aDownload.box, 's3downbar_download_box_picToShrink');

		picToShrink.src = chrome.extension.getURL('/skin/greenArrow16.png');
		picToShrink.setAttribute('is_hidden', false);
		s3dm.action.open_finished_cont(idtoopen, 1);
		window.setTimeout(function(){s3dm.action.finish_open(idtoopen, is_opened);}, 150);
	} else {
		s3dm.action.finish_open(idtoopen, is_opened);
	}
}
//------------------------------------------------------------------------------
s3dm.action.open_finished_cont = function(idtoopen, newsize) {
	var aDownload = s3dm.downbar.download_list[idtoopen];
	var picToShrink = s3dm.utils.get_element(aDownload.box, 's3downbar_download_box_picToShrink');

	if (newsize > 16) {
		// put the icon back how it's supposed to be after 1 sec.
		window.setTimeout(function() {
			try{
				picToShrink.src = "";
				s3dm.utils.set_element_style(picToShrink, 'height:16px; width:16px;');
				picToShrink.setAttribute('is_hidden', true);
			} catch(e){}
		}, 1000);
	}
	else {
		s3dm.utils.set_element_style(picToShrink, 'height: 16px; width: ' + newsize + 'px;');
		window.setTimeout(function(){s3dm.action.open_finished_cont(idtoopen, newsize+2);}, 20);
	}
}
//------------------------------------------------------------------------------
s3dm.action.finish_open = function(idtoopen, is_opened) {
	var aDownload =s3dm.downbar.download_list[idtoopen];
	if (aDownload.exists) {
		if (! is_opened) {
			chrome.runtime.sendMessage({ 'action' : 'file_open', 's3id' : idtoopen }, function(response) {});
		}
	} else {
		s3dm.action.re_calculate_view(idtoopen);
		alert(s3dm.utils.get_string("message.file_not_found"));
	}

	var removeOnOpen = s3dm.utils.prefs_get("function.removeOnOpen");
	if (removeOnOpen) {
		s3dm.action.animate_decide(idtoopen, "clear", {shiftKey:false});
	}
}
//------------------------------------------------------------------------------
s3dm.action.re_calculate_view = function(elemID) {
	if (s3dm.downbar.download_list[elemID]) {
		s3dm.viewer.calculate_view(s3dm.downbar.download_list[elemID]);
	}
}
//------------------------------------------------------------------------------
s3dm.action.set_pause_all = function() {
	s3dm.action.set_action_all('pause');
}
//------------------------------------------------------------------------------
s3dm.action.set_resume_all = function() {
	s3dm.action.set_action_all('start_all');
}
//------------------------------------------------------------------------------

s3dm.action.set_cancel_all = function() {
	s3dm.action.set_action_all('cancel');
}
//------------------------------------------------------------------------------
s3dm.action.set_action_all = function(who) {
	var el = {};
	var download_list = s3dm.utils.get_downlist(s3dm.downbar.download_list);
	for (var i=0; i<download_list.length; i++) {
		var aDownload = download_list[i];
		if (! aDownload.is_succeeded) {
			el[aDownload.s3id] = 1;
		}
	}
	s3dm.viewer.set_action(el, who);
}
//------------------------------------------------------------------------------
s3dm.action.clear_all = function() {
	var not_found_list = [];
	var succeeded_list = [];
	var canceled_list = [];
	//------------------------------------------------------------------------
	var download_list = s3dm.utils.get_downlist(s3dm.downbar.download_list);
	for (var i=0; i<download_list.length; i++) {
		var aDownload = download_list[i];
		if (aDownload.is_succeeded) {
			succeeded_list.push(aDownload);
			if (! aDownload.exists) {
				not_found_list.push(aDownload);
			}
		}
		if (aDownload.canceled) {
			canceled_list.push(aDownload);
		}
	}
	var result_list = (not_found_list.length > 0) ? not_found_list : (canceled_list.length > 0) ? canceled_list : succeeded_list;
	for (var i=0; i<result_list.length; i++) {
		var aDownload = result_list[i];
		s3dm.action.start_auto_clear(aDownload.s3id, 10);
	}
}
//------------------------------------------------------------------------------
s3dm.action.set_pause = function(elemid, aEvent) {
	var el = {}; el[elemid] = 1;
	s3dm.viewer.set_action(el, 'pause');
}
//------------------------------------------------------------------------------
s3dm.action.set_resume = function(elemid, aEvent) {
	var el = {}; el[elemid] = 1;
	s3dm.viewer.set_action(el, 'start');
}
//------------------------------------------------------------------------------
s3dm.action.set_cancel = function(elemid, aEvent) {
	var el = {}; el[elemid] = 1;
	s3dm.viewer.set_action(el, 'cancel');
}
//------------------------------------------------------------------------------
s3dm.action.visit_referrer_website = function(url) {
	chrome.runtime.sendMessage({ 'action' : 'open_url', 'url' : url }, function(response) {});
}
//------------------------------------------------------------------------------
s3dm.action.copy_URL = function(url) {
	s3dm.utils.copy_clipboard(url);
}
//------------------------------------------------------------------------------
s3dm.action.download_retry = function(url, referrer) {
	chrome.runtime.sendMessage({ 'action' : 'download_retry', 'url' : url, 'referrer' : referrer }, function(response) {});
}
//------------------------------------------------------------------------------
s3dm.action.checksum = function(elemID) {
	var aDownload =s3dm.downbar.download_list[elemID];
	if (aDownload.exists) {
		chrome.runtime.sendMessage({ 'action' : 'file_checksum', 's3id' : elemID }, function(response) {});
	} else {
		s3dm.action.re_calculate_view(elemID);
		alert(s3dm.utils.get_string("message.file_not_found"));
		return;
	}
}
//------------------------------------------------------------------------------
s3dm.action.antivirus = function(elemID) {
	var aDownload =s3dm.downbar.download_list[elemID];
	if (aDownload.exists) {
		if (aDownload.virus_scan_analysis_url) {
			chrome.runtime.sendMessage({ 'action' : 'open_url', 'url' : aDownload.virus_scan_analysis_url }, function(response) {});
		} else {
			chrome.runtime.sendMessage({ 'action' : 'file_antivirus', 's3id' : elemID }, function(response) {});
		}
	} else {
		s3dm.action.re_calculate_view(elemID);
		alert(s3dm.utils.get_string("message.file_not_found"));
		return;
	}
}
//------------------------------------------------------------------------------
s3dm.action.checksum_for_any_file = function() {
	chrome.runtime.sendMessage({ 'action' : 'file_checksum' }, function(response) {});
}
//------------------------------------------------------------------------------
s3dm.action.open_download_window = function() {
	chrome.runtime.sendMessage({ 'action' : 'open_download_window' }, function(response) {});
}
//------------------------------------------------------------------------------
s3dm.action.undo_clear = function() {
	var aDownload = s3dm.downbar.undo_view_list.pop();
	if (aDownload) {
		delete s3dm.viewer.dl_list_ignore[aDownload.s3id];
		chrome.runtime.sendMessage({ 'action' : 'download_restore' }, function(response) {});
	}
}
//------------------------------------------------------------------------------
s3dm.action.clear_button_click = function(aEvent) {
	aEvent.preventDefault();
	aEvent.stopPropagation();

	if (aEvent.button == 0) {  // left click
		s3dm.action.clear_all();
	}
	
	if (aEvent.button == 1) {  // middle click
		s3dm.action.undo_clear();
	}
	
	if (aEvent.button == 2) {  // right click
		s3dm.action.undo_clear();
	}
}
//------------------------------------------------------------------------------
s3dm.action.dblclick_clear_panel = function(event) {
	if (s3dm.utils.prefs_get('function.dblclickClearPanel', false)) {
		s3dm.action.clear_all();
	}
}
//------------------------------------------------------------------------------
s3dm.action.key_action_last = function(who) {
	var place_from_right = s3dm.utils.get_placeDownloadsFromRight();

	var download_list = s3dm.utils.get_downlist(s3dm.downbar.download_list);
	while (download_list.length > 0) {
		var download = null;
		if (place_from_right) {
			download = download_list.pop();
		} else {
			download = download_list.shift();
		}
		if (download.is_succeeded) {
			if (who == 'open') {
				s3dm.action.start_open_finished(download.s3id);
			} else if (who == 'show') {
				s3dm.action.start_show_file(download.s3id, true);
			} else if (who == 'clear') {
				s3dm.action.animate_decide(download.s3id, 'clear', {shiftKey: false});
			}
			break;
		}
	}
}
//------------------------------------------------------------------------------
s3dm.action.create_new_downloads = function() {
	chrome.runtime.sendMessage({ 'action' : 'create_new_downloads' }, function(response) {});
}
//------------------------------------------------------------------------------
s3dm.action.open_options_window = function() {
	chrome.runtime.sendMessage({ 'action' : 'open_options_page' }, function(response) {});
}
//------------------------------------------------------------------------------
