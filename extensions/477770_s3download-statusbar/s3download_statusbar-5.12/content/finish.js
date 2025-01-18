s3dm.finish = {};

//------------------------------------------------------------------------------
s3dm.finish.action = function(aDownload) {
	var elmpath = aDownload.filename;
	var s3dm_fileext = elmpath.split(".").pop().toLowerCase();
		
	//-----------------------------------------------------------------------
	s3dm.finish.popupNotification(aDownload, s3dm_fileext);
	s3dm.finish.complete_sound(aDownload, s3dm_fileext);
	s3dm.finish.antivirus_check(aDownload, s3dm_fileext);

	var clearTime = s3dm.utils.prefs_get("function.timeToClear");
	var clearRaw = s3dm.utils.prefs_get("function.clearFiletypes");
	var s3dm_clearList = new Array ( );
		
	clearRaw = clearRaw.toLowerCase().replace(/\s/g,'');  // remove all whitespace
	s3dm_clearList = clearRaw.split(",");
		
	//-----------------------------------------------------------------------
	// check if it's on the list of autoclear
	//-----------------------------------------------------------------------
	var autoClear = false;
	if (s3dm_clearList[0] == "all" | s3dm_clearList[0] == "*") {
		autoClear = true;
	} else {
		for (var i=0; i<=s3dm_clearList.length; ++i) {
			if (s3dm_fileext == s3dm_clearList[i]) {
				autoClear = true;
			}
		}
	}

	//-----------------------------------------------------------------------
	var message = { 'action_reload_popup' : true, 'download_list' : s3dm.download_list, 'use_animation' : s3dm.utils.prefs_get('function.useAnimation') };
					
	//-----------------------------------------------------------------------
	if (autoClear) {
		setTimeout(function(){
			var history_remove = ! s3dm.utils.prefs_get('function.keepHistory', true);
			if (! history_remove) {
				history_remove = ! s3dm.utils.prefs_get("function.clearFiletypesKeepHistory");
			}
			s3dm.onMessage({ 'action' : 'download_remove', 's3id' : aDownload.s3id, 'history_remove' : history_remove, 'message' : message }, {}, function(response) {});
		}, clearTime*1000);
	}

	//-----------------------------------------------------------------------
	if (s3dm.utils.prefs_get("function.autoOpenFolder")) {
			chrome.downloads.show(aDownload.id);
			if (! s3dm.utils.prefs_get('function.removeOnShow', true)) {
				var history_remove = ! s3dm.utils.prefs_get('function.keepHistory', true);
				s3dm.onMessage({ 'action' : 'download_remove', 's3id' : aDownload.s3id, 'history_remove' : history_remove }, {}, function(response) {});
				s3dm.render_downbar(message);
			}
	}
}
//------------------------------------------------------------------------------
s3dm.finish.popupNotification = function(aDownload, fileExt) {
	if (! s3dm.utils.prefs_get("function.popupNotification")) { return; }

	//-----------------------------------------------------------------------
	var ignoreList = new Array ( );
	var ignoreListRaw = s3dm.utils.prefs_get("function.popupNotification_ignore");
	ignoreListRaw = ignoreListRaw.toLowerCase().replace(/\s/g,'');  // remove all whitespace
	ignoreList = ignoreListRaw.split(",");
		
	//-----------------------------------------------------------------------
	var toIgnore = false;
	for (var i=0; i<=ignoreList.length; ++i) {
		if (fileExt == ignoreList[i]) {
			toIgnore = true;
		}
	}
	if (toIgnore) { return; }

	//-----------------------------------------------------------------------
	if (s3dm.utils.prefs_get("function.popupNotification_filesize") > (aDownload.fileSize/1024)) {
		return;
	}
	//-----------------------------------------------------------------------
	var startDate = new Date(aDownload.startTime);
	var completeSeconds = 0;
	if (aDownload.endTime) {
		var endTime = new Date(aDownload.endTime);
		completeSeconds = (parseInt(endTime.getTime())-parseInt(startDate.getTime()))/1000;
	}
	if (s3dm.utils.prefs_get("function.popupNotification_timesize") > completeSeconds) {
		return;
	}

	//-----------------------------------------------------------------------
	s3dm.finish.notification_box(aDownload);
}
//------------------------------------------------------------------------------
s3dm.finish.complete_sound = function(aDownload, fileExt) {
	if (! s3dm.utils.prefs_get("function.soundComplete")) { return; }

	//-----------------------------------------------------------------------
	var soundIgnoreList = new Array ( );
	var ignoreListRaw = s3dm.utils.prefs_get("function.soundCompleteIgnore");
	ignoreListRaw = ignoreListRaw.toLowerCase().replace(/\s/g,'');  // remove all whitespace
	soundIgnoreList = ignoreListRaw.split(",");
		
	//-----------------------------------------------------------------------
	var toIgnore = false;
	for (var i=0; i<=soundIgnoreList.length; ++i) {
		if (fileExt == soundIgnoreList[i]) {
			toIgnore = true;
		}
	}
	if (toIgnore) { return; }

	//-----------------------------------------------------------------------
	if (s3dm.utils.prefs_get("function.soundComplete_filesize") > (aDownload.fileSize/1024)) {
		return;
	}
	//-----------------------------------------------------------------------
	var startDate = new Date(aDownload.startTime);
	var completeSeconds = 0;
	if (aDownload.endTime) {
		var endTime = new Date(aDownload.endTime);
		completeSeconds = (parseInt(endTime.getTime())-parseInt(startDate.getTime()))/1000;
	}
	if (s3dm.utils.prefs_get("function.soundComplete_timesize") > completeSeconds) {
		return;
	}

	//-----------------------------------------------------------------------
	if (! s3dm.sound) {
		s3dm.sound = new Audio();
		s3dm.preload = 'none';
	}
	var sound_custom = s3dm.utils.prefs_get('function.soundCustomCompleteData') || chrome.extension.getURL('/skin/downbar_finished.ogg');

	s3dm.sound.src = sound_custom;
	s3dm.sound.load();
	s3dm.sound.play();
}
//------------------------------------------------------------------------------
s3dm.finish.antivirus_check = function(aDownload, s3dm_fileext) {
	var virusScan = s3dm.utils.prefs_get("function.virusScan");
	var virusAutoScan = s3dm.utils.prefs_get("function.virusAutoScan");
	var virusMode = s3dm.utils.prefs_get("function.virusMode");

	if (virusScan && virusAutoScan) {
		var s3dm_excludeList = new Array ( );
		var excludeRaw = s3dm.utils.prefs_get("function.virusExclude");
		excludeRaw = excludeRaw.toLowerCase().replace(/\s/g,'');  // remove all whitespace
		var s3dm_excludeList = excludeRaw.split(",");
			
		var excludeFiletype = false;
		for (var i=0; i<=s3dm_excludeList.length; ++i) {
			if (s3dm_fileext == s3dm_excludeList[i])
				excludeFiletype = true;
		}
			
		if (!excludeFiletype) {
			s3dm.finish.antivirus_by_checksum(aDownload);
		}
	}
}
//------------------------------------------------------------------------------
s3dm.finish.antivirus_by_checksum = function(aDownload) {
	var path = 'file:///' + aDownload.filename.replace(/\\/g, '/');
	s3dm.utils.read_local_file(path, function(blob){
		if (blob) {
			s3dm.utils.sha256_file(blob, function(is_complete, percent, checksum_string) {
				if (is_complete) {
					s3dm.finish.antivirus_scan(aDownload, String(checksum_string));
				}
			});
		}
	});
	//-----------------------------------------------------------------------
	s3dm.download_list[aDownload.s3id].virus_scan_check = true;
	s3dm.utils.prefs_set('download_list', s3dm.download_list);
	s3dm.send_message();
}
//------------------------------------------------------------------------------
s3dm.finish.antivirus_scan = function(aDownload, checksum) {
	s3dm.utils.antivirus_scan_checksum(checksum, function(res){
		if (res) {
			s3dm.download_list[aDownload.s3id].virus_scan_ratio = res.virus_scan_ratio;
			s3dm.download_list[aDownload.s3id].virus_scan_analysis_url = res.virus_scan_analysis_url;
			s3dm.download_list[aDownload.s3id].virus_scan_warning = res.virus_scan_warning;
			//-----------------------------------------------------------------
			if (res.virus_scan_warning) {
				s3dm.utils.notification_box(s3dm.utils.get_filename_short(aDownload.filename), s3dm.utils.get_string("message.virus_detected"), chrome.extension.getURL('/skin/virus_alert.png'), 10000);
			}
			//-----------------------------------------------------------------
			s3dm.utils.prefs_set('download_list', s3dm.download_list);
			s3dm.send_message();
		}
	});
}
//------------------------------------------------------------------------------
s3dm.finish.notification_box = function(aDownload) {
	s3dm.utils.notification_box(s3dm.utils.get_filename_short(aDownload.filename), s3dm.utils.get_string("message.download_completed"), aDownload.iconURL32);
}
//------------------------------------------------------------------------------
