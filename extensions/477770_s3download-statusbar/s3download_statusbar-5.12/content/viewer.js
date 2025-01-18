s3dm.viewer = {};
s3dm.viewer.dl_list_view = undefined;
s3dm.viewer.dl_list_ignore = {};

//------------------------------------------------------------------------------
s3dm.viewer.set_download_state = function (aDownload) {
	var dlElem = aDownload.box;
	var styleDefault = s3dm.utils.prefs_get("style.default");
	var aState = aDownload.dlstate;
	s3dm.utils.get_element(dlElem, 's3downbar_download_box_img_queue').setAttribute('is_hidden', true);

	//------------------------------------------------------------------------
	if (!styleDefault) {
		s3dm.utils.set_element_style(dlElem, 'border: 1px solid threeDShadow;');
	}
	//------------------------------------------------------------------------
	switch(aState) {

		case -1: // Not started
		break;

		case 0:  // In progress
			dlElem.className = 'download_data_box db_progressStack';
			dlElem.setAttribute('click_handle', 'progress_click_handle');
			
			s3dm.utils.get_element(dlElem, 's3downbar_download_box_progress').setAttribute('is_hidden', false); // Progress bar and remainder
			s3dm.utils.get_element(dlElem, 's3downbar_download_box_progressremainder').setAttribute('is_hidden', false); // Progress bar and remainder
			s3dm.utils.get_element(dlElem, 's3downbar_download_box_img').setAttribute('is_hidden', true); // Icon stack
			s3dm.utils.get_element(dlElem, 's3downbar_download_box_progress_data').setAttribute('is_hidden', false); // Progress indicators
		break;

		case 4:  // Paused
			if (aDownload.is_queue) {
				s3dm.utils.get_element(dlElem, 's3downbar_download_box_progress').setAttribute('is_hidden', false); // Progress bar and remainder
				s3dm.utils.get_element(dlElem, 's3downbar_download_box_progress_data').setAttribute('is_hidden', true); // Progress indicators
				s3dm.utils.get_element(dlElem, 's3downbar_download_box_progressremainder').setAttribute('is_hidden', false); // Progress bar and remainder
				s3dm.utils.get_element(dlElem, 's3downbar_download_box_img').setAttribute('is_hidden', true); // Icon stack
				s3dm.utils.get_element(dlElem, 's3downbar_download_box_img_queue').setAttribute('is_hidden', false); // Icon stack
				s3dm.utils.get_element(dlElem, 's3downbar_download_box_img_queue').src = chrome.extension.getURL('/skin/queue.gif');
				aDownload.progress = 0;
			}
			else {
				s3dm.utils.get_element(dlElem, 's3downbar_download_box_progress').setAttribute('is_hidden', false); // Progress bar and remainder
				s3dm.utils.get_element(dlElem, 's3downbar_download_box_progress_data').setAttribute('is_hidden', false); // Progress indicators
				s3dm.utils.get_element(dlElem, 's3downbar_download_box_progressremainder').setAttribute('is_hidden', false); // Progress bar and remainder
				s3dm.utils.get_element(dlElem, 's3downbar_download_box_img').setAttribute('is_hidden', true); // Icon stack
			}

			dlElem.className = 'download_data_box db_pauseStack';
			dlElem.setAttribute('click_handle', 'progress_click_handle');
			
			if (!styleDefault) {
				s3dm.utils.set_element_style(dlElem, 'border-color: ' + s3dm.utils.prefs_get("style.pausedHbox_border_color") + ';border-style:solid;border-width:1px;');
			}

		break;

		// XXX make queued downloads look different so they don't look stuck
		case 5:  // Queued
			dlElem.className = 'download_data_box db_progressStack';
			dlElem.setAttribute('click_handle', 'progress_click_handle');
			
			s3dm.utils.get_element(dlElem, 's3downbar_download_box_progress').setAttribute('is_hidden', false); // Progress bar and remainder
			s3dm.utils.get_element(dlElem, 's3downbar_download_box_progressremainder').setAttribute('is_hidden', false); // Progress bar and remainder
			s3dm.utils.get_element(dlElem, 's3downbar_download_box_img').setAttribute('is_hidden', true); // Icon stack
			s3dm.utils.get_element(dlElem, 's3downbar_download_box_progress_data').setAttribute('is_hidden', true); // Progress indicators
		break;

		case 1:  // Finished
		case 6:  // Parental Blocked
		case 7:  // AV Scanning
		case 8:  // AV Dirty

			// Put on the correct overlay icon based on the state
			var img = s3dm.utils.get_element(dlElem, 's3downbar_download_box_img');
			if (aState == 6) {
				img.src = chrome.extension.getURL('/skin/blocked_alert.png');
			}
			else if (aState == 8) {
				img.src = chrome.extension.getURL('/skin/blocked.png');
			}
			else if (aState == 7) {
				img.src = chrome.extension.getURL('/skin/scanAnimation.png');
			}
			else {
				img.src = s3dm.utils.get_empty_img();
			}

			dlElem.className = 'download_data_box db_finishedHbox';
			dlElem.setAttribute('click_handle', 'finished_click_handle');

			s3dm.utils.get_element(dlElem, 's3downbar_download_box_progress').setAttribute('is_hidden', true); // Progress bar and remainder
			s3dm.utils.get_element(dlElem, 's3downbar_download_box_progressremainder').setAttribute('is_hidden', true); // Progress bar and remainder
			s3dm.utils.get_element(dlElem, 's3downbar_download_box_img').setAttribute('is_hidden', false); // Icon stack
			s3dm.utils.get_element(dlElem, 's3downbar_download_box_progress_data').setAttribute('is_hidden', true); // Progress indicators

			if (!styleDefault) {
				s3dm.utils.set_element_style(dlElem, 'background-color: ' + s3dm.utils.prefs_get("style.finishedHbox_color"));
			}

		break;

		case 2:  // Failed
		case 3:  // Canceled
			dlElem.className = 'download_data_box db_notdoneHbox';
			dlElem.setAttribute('click_handle', 'finished_click_handle');
//			dlElem.setAttribute("ondblclick", "s3dm.action.set_start(this.id); event.stopPropagation();");

			// Do canceled downloads keep the percent done?  keep the progress bar there?
			s3dm.utils.get_element(dlElem, 's3downbar_download_box_progress').setAttribute('is_hidden', true); // Progress bar and remainder
			s3dm.utils.get_element(dlElem, 's3downbar_download_box_progressremainder').setAttribute('is_hidden', true); // Progress bar and remainder
			s3dm.utils.get_element(dlElem, 's3downbar_download_box_img').setAttribute('is_hidden', false); // Icon stack
			s3dm.utils.get_element(dlElem, 's3downbar_download_box_progress_data').setAttribute('is_hidden', true); // Progress indicators

			if (!styleDefault) {
				s3dm.utils.set_element_style(dlElem, 'background-color: ' + s3dm.utils.prefs_get("style.notdoneHbox_color"));
			}
		break;
	}
}
//------------------------------------------------------------------------------
s3dm.viewer.calculate_view = function(aDownload) {
	var progElem = aDownload.box;
	var progElem_progress = s3dm.utils.get_element(progElem, 's3downbar_download_box_progress');

	//-----------------------------------------------------------------------
	var newsize = aDownload.pOldSavedKBytes;
	var totalsize = aDownload.totalBytes;
	var dlRate = aDownload.dlRate;

	//-----------------------------------------------------------------------
	if (aDownload.dlstate == 1 | aDownload.dlstate == 7 | aDownload.dlstate == 8) {
		aDownload.fileNotFound = ! aDownload.exists;
		var img = s3dm.utils.get_element(progElem, 's3downbar_download_box_img');
		if (aDownload.exists) {
			if (aDownload.dlstate == 6 | aDownload.dlstate == 8) {
				img.src = chrome.extension.getURL('/skin/blocked.png');
			} else if (aDownload.virus_scan_warning) {
				img.src = chrome.extension.getURL('/skin/virus_alert.png');
				s3dm.utils.set_element_style(img, 'background-image: none');
			} else {
				img.src = s3dm.utils.get_empty_img();
			}
		} else {
			img.src = chrome.extension.getURL('/skin/delete2.png');
		}
	}
	//-----------------------------------------------------------------------
	else if (aDownload.dlstate == 6) {
		var img = s3dm.utils.get_element(progElem, 's3downbar_download_box_img');
		img.src = chrome.extension.getURL('/skin/blocked_alert.png');
	}

	//-----------------------------------------------------------------------
	s3dm.utils.HTMLDOM_value(s3dm.utils.get_element(progElem, 's3downbar_download_box_progress_bytesReceived'), s3dm.utils.get_strings_to_KB_MB_GB(newsize));
	s3dm.utils.HTMLDOM_value(s3dm.utils.get_element(progElem, 's3downbar_download_box_progress_speed'), s3dm.utils.get_strings_to_KB_MB_GB(dlRate, true));

	//-----------------------------------------------------------------------
	// If the mode is undetermined, just count up the MB
	// Firefox bug - totalsize should be -1 when the filesize is unknown?
	if ((parseInt(newsize) > parseInt(totalsize)) || (parseInt(totalsize)>100000000000000)) { // 18 446 100 000 000 000 000
		var s3dm_unkAbbr = s3dm.utils.get_string("display.unknown_abbreviation");  // "Unk." in english
		// Percent and remaining time will be unknown
		s3dm.utils.HTMLDOM_value(s3dm.utils.get_element(progElem, 's3downbar_download_box_progress_percent'), s3dm_unkAbbr);
		s3dm.utils.HTMLDOM_value(s3dm.utils.get_element(progElem, 's3downbar_download_box_progress_remaintime'), s3dm_unkAbbr);
		aDownload.remaintime = s3dm_unkAbbr;
	}
	//-----------------------------------------------------------------------
	else {
		// Get and set percent
		var currpercent = aDownload.progress;
		s3dm.utils.HTMLDOM_value(s3dm.utils.get_element(progElem, 's3downbar_download_box_progress_percent'), currpercent + "%");
		progElem_progress.style.setProperty("width", currpercent + "%", "important");

		// Calculate and set the remaining time
		var remainingkb = parseInt(totalsize - newsize);
		if(dlRate != 0) {
			var secsleft = (1 / dlRate) * remainingkb;
			var remaintime = s3dm.utils.format_seconds(secsleft);
			s3dm.utils.HTMLDOM_value(s3dm.utils.get_element(progElem, 's3downbar_download_box_progress_remaintime'), remaintime);
			aDownload.remaintime = remaintime;
		}
		else {
			var s3dm_unkAbbr = s3dm.utils.get_string("display.unknown_abbreviation");  // "Unk." in english
			s3dm.utils.HTMLDOM_value(s3dm.utils.get_element(progElem, 's3downbar_download_box_progress_remaintime'), "--:--");
			aDownload.remaintime = "--:--";
		}
	}
	
	//-----------------------------------------------------------------------
	// Speed sensitive color
	//-----------------------------------------------------------------------
	if (dlRate>0 && (s3dm.utils.prefs_get("style.speedColorsEnabled"))) {
		var newrate = dlRate/1024;

		var colors = s3dm.utils.get_speed_color_list();
		// Incremental
		var newcolor = colors.speedColor0;
		if(newrate > colors.speedDivision3) {
			newcolor = colors.speedColor3;
		}
		else if (newrate > colors.speedDivision2) {
			newcolor = colors.speedColor2;
		}
		else if (newrate > colors.speedDivision1) {
			newcolor = colors.speedColor1;
		}

		if (s3dm.utils.get_use_gradients()) {
			progElem_progress.style.setProperty("background-color", newcolor, "important");
			progElem_progress.style.setProperty("border-right", "1px solid " + s3dm.utils.get_progressbar_border_right_color(), "important");
		} else {
			progElem_progress.style.setProperty("background-color", newcolor, "important");
			progElem_progress.style.setProperty("border-right", "1px solid " + s3dm.utils.get_progressbar_border_right_color(), "important");
		}
	}

	//-----------------------------------------------------------------------
	if (progElem.is_frame_show) {
		if (aDownload.dlstate != aDownload.dlstate_old) {
			progElem.load_frame();
		}
	}
	//-----------------------------------------------------------------------
	if (! s3dm.downbar.is_popup) {
		s3dm.viewer.calculate_view_tooltip(aDownload);
	}

	//------------------------------------------------------------------------
	// set which progress notifications are set to display on the download element template
	//------------------------------------------------------------------------
	s3dm.utils.get_element(progElem, 's3downbar_download_box_progress_percent').setAttribute('is_hidden', ! s3dm.utils.prefs_get("display.percent"));
	s3dm.utils.get_element(progElem, 's3downbar_download_box_progress_remaintime').setAttribute('is_hidden', ! s3dm.utils.prefs_get("display.time"));
	s3dm.utils.get_element(progElem, 's3downbar_download_box_progress_bytesReceived').setAttribute('is_hidden', ! s3dm.utils.prefs_get("display.size"));
	s3dm.utils.get_element(progElem, 's3downbar_download_box_progress_speed').setAttribute('is_hidden', ! s3dm.utils.prefs_get("display.speed"));

	//------------------------------------------------------------------------
	s3dm.viewer.count_summary();
}
//------------------------------------------------------------------------------
s3dm.viewer.calculate_view_tooltip = function(aDownload) {
	var progElem = aDownload.box;
	var state = aDownload.dlstate;
	var s3downbar_unkStr = s3dm.utils.get_string("display.unknown");

	//-----------------------------------------------------------------------
	if (state == 6) {  // antivirus blocked - use the firefox error icon like the download manager
		s3dm.utils.get_element(progElem, 's3downbar_download_tooltip_img').src = chrome.extension.getURL('/skin/virus_alert.png');
		s3dm.utils.get_element(progElem, 's3downbar_download_tooltip_img').setAttribute('no_image', false);
	}
	//-----------------------------------------------------------------------
	else if (state == 8) {  // antivirus blocked - use the firefox error icon like the download manager
		s3dm.utils.get_element(progElem, 's3downbar_download_tooltip_img').src = chrome.extension.getURL('/skin/avblocked.png');
		s3dm.utils.get_element(progElem, 's3downbar_download_tooltip_img').setAttribute('no_image', false);
	}
	//-----------------------------------------------------------------------
	else if (aDownload.virus_scan_warning) {
		s3dm.utils.get_element(progElem, 's3downbar_download_tooltip_img').src = chrome.extension.getURL('/skin/virus_alert.png')
		s3dm.utils.get_element(progElem, 's3downbar_download_tooltip_img').setAttribute('no_image', false);
	}
	//-----------------------------------------------------------------------
	else if (aDownload.iconURL32) {
		s3dm.utils.get_element(progElem, 's3downbar_download_tooltip_img').src = aDownload.iconURL32;
		s3dm.utils.get_element(progElem, 's3downbar_download_tooltip_img').setAttribute('no_image', false);
		aDownload.iconURL32 = ''; // optimize memory
		aDownload.iconURL32_present = true;
	}
	//-----------------------------------------------------------------------
	else if (! aDownload.iconURL32_present) {
		s3dm.utils.get_element(progElem, 's3downbar_download_tooltip_img').setAttribute('no_image', true);
	}

	//-----------------------------------------------------------------------
	var additionalText = " ";  // status text to be added after filename
	var currSize = 0;
	var totalSize = '-.--';
	var percent = '0%';
	var speed_text = '-.--';
	var remainTime = '--:--';
	var sizeString = '';

	//-----------------------------------------------------------------------
	// if the state is queued, we won't know these
	if (state == 5) {
		additionalText = " - " + s3dm.utils.get_string("status.starting");
		currSize = "0 " + s3dm.utils.get_string("display.bytes_abbr");
		totalSize = s3downbar_unkStr;
		percent = s3downbar_unkStr;
		remainTime = "--:--";
	}
	else if (state == 2) {
		additionalText = " - " + s3dm.utils.get_string("status.failed");
	} else if (state == 3) {
		additionalText = " - " + s3dm.utils.get_string("status.cancelled");
	} else if (state == 8) {
		additionalText = " - " + s3dm.utils.get_string("status.av_blocked");
	} else if (state == 7) {
		additionalText = " - " + s3dm.utils.get_string("status.av_scanning");
	}
	// state is inprog or paused
	else {
		currSize = aDownload.pOldSavedKBytes;
		totalSize = aDownload.totalBytes;
		percent = aDownload.progress + '%';
		remainTime = aDownload.remaintime;

		if (state == 4) {
			additionalText = " - " + s3dm.utils.get_string("status.paused");
		} else {
			speed_text = s3dm.utils.get_strings_to_KB_MB_GB(aDownload.speed, true);
		}

		//-----------------------------------------------------------------
		// If the mode is undetermined, we won't know these - should totalsize be -1?
		//-----------------------------------------------------------------
		if ((parseInt(currSize) > parseInt(totalSize)) || (parseInt(totalSize)>100000000000000)) { // 18 446 100 000 000 000 000
			percent = s3downbar_unkStr;
			totalSize = s3downbar_unkStr;
			remainTime = s3downbar_unkStr;
		}
		else {
			totalSize = s3dm.utils.get_strings_to_KB_MB_GB(totalSize);
		}
	}

	//-----------------------------------------------------------------------
	currSize = s3dm.utils.get_strings_to_KB_MB_GB(currSize);

	//-----------------------------------------------------------------------------
	if (aDownload.exists && (aDownload.fileSize>=0)) {	// may be .totalBytes ?
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
	}

	//-------------------------------------------------------------------------
	var startDate = new Date(aDownload.startTime);
	var startDate_string = startDate.toLocaleFormat(s3dm.utils.prefs_get('display.dateTimeFormat'));

	//-------------------------------------------------------------------------
	var completeTime = s3dm.utils.get_string("display.unknown");
	var completeSeconds = -1;
	if (aDownload.endTime) {
		var endTime = new Date(aDownload.endTime);
		completeSeconds = (parseInt(endTime.getTime())-parseInt(startDate.getTime()))/1000;
		var completeTime = s3dm.utils.format_seconds(completeSeconds);
		if (completeTime == "00:00") {
			completeTime = "<00:01";
		}
	}

	//-----------------------------------------------------------------------------
	var avgSpeed = '';
	//-----------------------------------------------------------------------------
	try {
		if (aDownload.fileSize != -1 && completeSeconds != -1) {
			if (completeSeconds == 0) { completeSeconds = 1; }
			avgSpeed = s3dm.utils.get_strings_to_KB_MB_GB(aDownload.fileSize / completeSeconds, true);
		} else {
			avgSpeed = s3dm.utils.get_string("display.unknown");
		}
	} catch(e){};

	//-----------------------------------------------------------------------------
	s3dm.utils.HTMLDOM_value(s3dm.utils.get_element(progElem, 's3downbar_download_tooltip_filename'), s3dm.utils.get_filename_short(aDownload.filename) + additionalText);
	s3dm.utils.HTMLDOM_value(s3dm.utils.get_element(progElem, 's3downbar_download_tooltip_from'), aDownload.finalUrl || aDownload.url );
	s3dm.utils.get_element(progElem, 's3downbar_download_tooltip_from').setAttribute('title', aDownload.finalUrl || aDownload.url );
	//-----------------------------------------------------------------------------
	if (aDownload.referrer || aDownload.referrer_url) {
		s3dm.utils.HTMLDOM_value(s3dm.utils.get_element(progElem, 's3downbar_download_tooltip_source'), aDownload.referrer || aDownload.referrer_url );
		s3dm.utils.get_element(progElem, 's3downbar_download_tooltip_source').setAttribute('title', aDownload.referrer || aDownload.referrer_url );
	} else {
		s3dm.utils.get_element(progElem, 's3downbar_download_tooltip_source_box').setAttribute('is_hidden', true);
	}
	//-----------------------------------------------------------------------------
	s3dm.utils.HTMLDOM_value(s3dm.utils.get_element(progElem, 's3downbar_download_tooltip_to'), aDownload.filename );
	s3dm.utils.HTMLDOM_value(s3dm.utils.get_element(progElem, 's3downbar_download_tooltip_status'), currSize + " / " + totalSize + " ( " + speed_text + " )" );
	s3dm.utils.HTMLDOM_value(s3dm.utils.get_element(progElem, 's3downbar_download_tooltip_size'), sizeString );
	s3dm.utils.HTMLDOM_value(s3dm.utils.get_element(progElem, 's3downbar_download_tooltip_timeLeft'), remainTime );
	s3dm.utils.HTMLDOM_value(s3dm.utils.get_element(progElem, 's3downbar_download_tooltip_timeStart'), startDate_string );
	s3dm.utils.HTMLDOM_value(s3dm.utils.get_element(progElem, 's3downbar_download_tooltip_timeEnd'), completeTime );
	s3dm.utils.HTMLDOM_value(s3dm.utils.get_element(progElem, 's3downbar_download_tooltip_percent'), percent );
	s3dm.utils.HTMLDOM_value(s3dm.utils.get_element(progElem, 's3downbar_download_tooltip_speed'), avgSpeed );

	//-----------------------------------------------------------------------------
	var showTooltip_hint = s3dm.utils.prefs_get("function.showTooltip_hint");
	//-----------------------------------------------------------------------------
	if (s3dm.utils.check_progress_state(state)) {
		s3dm.utils.get_element(progElem, 's3downbar_download_tooltip_data_box').setAttribute('is_hidden_progress', false);
		s3dm.utils.get_element(progElem, 's3downbar_download_tooltip_data_box').setAttribute('is_hidden_finish', true);

		s3dm.utils.get_element(progElem, 's3downbar_download_tooltip_hint_progress').setAttribute('is_hidden', ! showTooltip_hint);
		s3dm.utils.get_element(progElem, 's3downbar_download_tooltip_hint_finish').setAttribute('is_hidden', true);
	} else {
		if (aDownload.exists) {
			var localFileSplit = aDownload.filename.split(".");
			var fileext = localFileSplit[localFileSplit.length-1].toLowerCase();
			if (fileext == "gif" | fileext == "jpg" | fileext == "png" | fileext == "jpeg") {
				progElem.image_preview_exists = true;
			}
		}
		s3dm.utils.get_element(progElem, 's3downbar_download_tooltip_data_box').setAttribute('is_hidden_progress', true);
		s3dm.utils.get_element(progElem, 's3downbar_download_tooltip_data_box').setAttribute('is_hidden_finish', false);

		s3dm.utils.get_element(progElem, 's3downbar_download_tooltip_hint_progress').setAttribute('is_hidden', true);
		s3dm.utils.get_element(progElem, 's3downbar_download_tooltip_hint_finish').setAttribute('is_hidden', ! showTooltip_hint);
	}

	//-----------------------------------------------------------------------------
	if (s3dm.utils.prefs_get("function.virusScan") || aDownload.virus_scan_check) {
		s3dm.utils.get_element(progElem, 's3downbar_download_virus_scan_box').setAttribute('virus_scan_warning', aDownload.virus_scan_warning);
		if (aDownload.virus_scan_ratio) {
			s3dm.utils.HTMLDOM_value(s3dm.utils.get_element(progElem, 's3downbar_download_virus_scan'), aDownload.virus_scan_ratio[0] + ' / ' + aDownload.virus_scan_ratio[1]);
			s3dm.utils.get_element(progElem, 's3downbar_download_virus_scan').href = aDownload.virus_scan_analysis_url;
			s3dm.utils.get_element(progElem, 's3downbar_download_virus_scan').setAttribute('title', aDownload.virus_scan_analysis_url);
		} else {
			s3dm.utils.HTMLDOM_value(s3dm.utils.get_element(progElem, 's3downbar_download_virus_scan'), s3dm.utils.get_string("display.unknown"));
		}
		s3dm.utils.get_element(progElem, 's3downbar_download_virus_scan_box').setAttribute('is_hidden', false);
	}
	else {
		s3dm.utils.get_element(progElem, 's3downbar_download_virus_scan_box').setAttribute('is_hidden', true);
	}
}
//------------------------------------------------------------------------------
s3dm.viewer.create_download_list = function(download_list, is_init, use_animation) {
	//-----------------------------------------------------------------------
	for (var i in s3dm.downbar.download_list) {
		if (! download_list[i]) {
			var aDownload = s3dm.downbar.download_list[i];
			aDownload.not_real_remove = true;
			if (use_animation) {
				s3dm.action.start_auto_clear(aDownload.s3id, 10);
			} else {
				s3dm.action.clear_one(aDownload.s3id);
			}
		}
	}
	//-----------------------------------------------------------------------
	var d_list = s3dm.utils.get_downlist(download_list);
	//-----------------------------------------------------------------------
	for (var i=0; i<d_list.length; i++) {
		var aDownload = d_list[i];
		s3dm.viewer.insert_new_download(aDownload, null, is_init);
	}
	//-----------------------------------------------------------------------
	s3dm.viewer.count_summary();
}
//------------------------------------------------------------------------------
s3dm.viewer.insert_new_download = function (aDownload, insert_before, is_init) {
	if (s3dm.downbar.download_list[aDownload.s3id]) {
		s3dm.utils.merge_hash(aDownload, s3dm.downbar.download_list[aDownload.s3id]);
		s3dm.viewer.set_download_state(s3dm.downbar.download_list[aDownload.s3id]);
		s3dm.viewer.calculate_view(s3dm.downbar.download_list[aDownload.s3id]);
		return;
	}

	//-----------------------------------------------------------------------
	var place_from_right = s3dm.viewer.get_placeDownloadsFromRight();
	var downbar = s3dm.downbar.download_listbox;
	//-----------------------------------------------------------------------
	if (! downbar.firstChild) {
		place_from_right = true;
	}
	//-----------------------------------------------------------------------
	var download_data_box = s3dm.downbar.download_template.cloneNode(true);
	download_data_box.id = aDownload.s3id;

	//-----------------------------------------------------------------------
	if (insert_before) {
		if (insert_before.is_first_child) {
			downbar.appendChild(download_data_box);
//			insert_before = { 'is_first_child' : true, 'place_from_right' : place_from_right };
		} else {
			downbar.insertBefore(download_data_box, insert_before);
		}
	}
	else if (place_from_right) {
		downbar.appendChild(download_data_box);
	}
	else {
		downbar.insertBefore(download_data_box, downbar.firstChild);
	}

	//-----------------------------------------------------------------------
	if (! s3dm.downbar.is_popup) {
		var box_tooltip_place = document.createElement('div');
		s3dm.utils.reset_style(box_tooltip_place);
		download_data_box.appendChild(box_tooltip_place);

		s3dm.downbar.tooltip_create(s3dm.downbar.tooltip_init(), download_data_box, null, box_tooltip_place);
		s3dm.downbar.tooltip_content(download_data_box.tooltip_box, 'downloads');

		s3dm.utils.get_element(download_data_box, 's3downbar_download_tooltip_source').addEventListener("click", function(event) {
			this.select();
		}, true);
		s3dm.utils.get_element(download_data_box, 's3downbar_download_tooltip_from').addEventListener("click", function(event) {
			this.select();
		}, true);
	}

	//-----------------------------------------------------------------------
	var download_data_img = s3dm.utils.get_element(download_data_box, 's3downbar_download_box_img');
	download_data_img.src = s3dm.utils.get_empty_img();
	if (aDownload.iconURL) {
		download_data_img.style.setProperty("background", 'url("' + aDownload.iconURL + '") 50% 50% no-repeat', "important");
		download_data_img.style.setProperty("background-size", 'contain', "important");
		download_data_img.setAttribute('no_image', false);
		aDownload.iconURL = ''; // optimize memory
	} else {
		download_data_img.setAttribute('no_image', true);
	}

	s3dm.utils.HTMLDOM_value(s3dm.utils.get_element(download_data_box, 's3downbar_download_box_filename'), s3dm.utils.get_filename_short(aDownload.filename));
	//-----------------------------------------------------------------------
	if (s3dm.utils.prefs_get("function.placeDownloadsScrollToNew")) {
		if (! is_init) {
			setTimeout(function() {
				try { download_data_box.scrollIntoView(); } catch(e) {};
			}, 500);
		}
	}

	//------------------------------------------------------------------------
	download_data_box.is_frame_show = false;
	download_data_box.is_frame_show_timer = null;
	download_data_box.download_frame = s3dm.utils.get_element(download_data_box, 's3downbar_download_box_iframe');
	//------------------------------------------------------------------------
	download_data_box.load_frame = function() {
		var download_frame = download_data_box.download_frame;
		var download_frame_new = document.createElement('iframe');
		download_frame_new.id = 's3downbar_download_box_iframe';
		download_frame_new.className = 'download_data_box_iframe';
		download_frame_new.addEventListener("load", function(event) {
			download_frame_new.is_loaded = true;
			download_frame_new.setAttribute('is_hidden', false);
		});
		//------------------------------------------------------------------
		var aDownload_tmp = s3dm.downbar.download_list[download_data_box.id];
		aDownload_tmp.dlstate_old = aDownload_tmp.dlstate;
		//------------------------------------------------------------------
		var aDownload_clone = s3dm.utils.clone_object(aDownload_tmp);
		aDownload_clone.is_popup = s3dm.downbar.is_popup;
		aDownload_clone.click_handle = download_data_box.getAttribute('click_handle');
		aDownload_clone.iconURL = '';
		aDownload_clone.iconURL32 = '';
		aDownload_clone.is_popup = s3dm.downbar.is_popup;


		//------------------------------------------------------------------
		download_frame_new.src = chrome.extension.getURL('/content/download_action.html?' + s3dm.utils.urlencode(JSON.stringify(aDownload_clone)));
		download_frame.parentNode.replaceChild(download_frame_new, download_frame);
		download_data_box.download_frame = download_frame_new;
	}
	//------------------------------------------------------------------------
	download_data_box.hide_frame = function() {
		download_data_box.is_frame_show = false;
		var download_frame = download_data_box.download_frame;
		var download_frame_new = document.createElement('div');
		download_frame_new.id = 's3downbar_download_box_iframe';
		download_frame_new.className = 'download_data_box_iframe';
		download_frame_new.setAttribute('is_hidden', true);
		download_frame.parentNode.replaceChild(download_frame_new, download_frame);
		download_data_box.download_frame = download_frame_new;
	}
	//------------------------------------------------------------------------
	download_data_box.addEventListener("mouseover", function(event) {
		try {
			clearTimeout(download_data_box.is_frame_show_timer);
		} catch(e){};
		if (! download_data_box.is_frame_show) {
			download_data_box.is_frame_show_timer = setTimeout(function(){
				download_data_box.is_frame_show = true;
				download_data_box.load_frame();
				setTimeout(function(){
					if (! download_data_box.download_frame.is_loaded) {
						download_data_box.hide_frame();
					}
				}, 500);
			}, 100);
		}
	}, true);
	//------------------------------------------------------------------------
	download_data_box.addEventListener("mouseout", function(event) {
		try {
			clearTimeout(download_data_box.is_frame_show_timer);
		} catch(e){};
		download_data_box.is_frame_show_timer = setTimeout(function(){
			download_data_box.hide_frame();
		}, 3000);
	}, true);

	//-----------------------------------------------------------------------
	s3dm.downbar.download_list[aDownload.s3id] = aDownload;
	aDownload.box = download_data_box;
	s3dm.viewer.set_download_state(aDownload);
	s3dm.viewer.calculate_view(aDownload);
	//-----------------------------------------------------------------------
	if (! s3dm.downbar.is_popup) {
		s3dm.downbar.set_body_margin();
	}
}
//------------------------------------------------------------------------------
s3dm.viewer.get_placeDownloadsFromRight = function() {
	if (s3dm.downbar.is_popup) {
		return (s3dm.utils.prefs_get("popup.sort_direction") == 'descending') ? false : true;
	} else {
		return s3dm.utils.get_placeDownloadsFromRight();
	}
}
//------------------------------------------------------------------------------
s3dm.viewer.set_styles_downloads = function(dlItemTemplate) {
	var styleDefault = s3dm.utils.prefs_get("style.default");
	var progressbar = s3dm.utils.get_element(dlItemTemplate, 's3downbar_download_box_progress');
	//------------------------------------------------------------------------
	if (s3dm.utils.get_use_gradients()) {
		s3dm.utils.set_element_style(progressbar, "background-image: linear-gradient(to bottom, rgba(255, 255, 255, .8), rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0), rgba(255, 255, 255, 0));");
		s3dm.utils.set_element_style(dlItemTemplate, "background-image: linear-gradient(to bottom, rgba(255, 255, 255, .8), rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0), rgba(255, 255, 255, 0));");
	}
	//------------------------------------------------------------------------
	if (! styleDefault) {
		var download_box_img = s3dm.utils.get_element(dlItemTemplate, 's3downbar_download_box_img');

		var hbox_width = s3dm.utils.prefs_get("style.hbox_width");
		if (s3dm.downbar.is_popup && (hbox_width < 200)) {
			hbox_width = 200;
		}
		if (s3dm.downbar.is_popup) {
			s3dm.utils.set_element_style(dlItemTemplate, 'min-width: ' + (hbox_width-4) + 'px');
		} else {
			s3dm.utils.set_element_style(dlItemTemplate, 'max-width: ' + hbox_width + 'px');
			s3dm.utils.set_element_style(dlItemTemplate, 'flex-basis: ' + Math.round(hbox_width/170*75) + 'px');
		}

		var hbox_height = s3dm.utils.prefs_get("style.hbox_height");
		s3dm.utils.set_element_style(dlItemTemplate, 'height: ' + hbox_height + 'px');
		if (hbox_height < 12) {
			s3dm.utils.set_element_style(download_box_img, 'width:' + hbox_height + 'px;max-width:' + hbox_height + 'px;max-height:' + hbox_height + 'px');
		}

		var progressbarStyle = s3dm.utils.prefs_get("style.progressbar_color");
		s3dm.utils.set_element_style(progressbar, 'background-color: ' + progressbarStyle);

		var progressremainder = s3dm.utils.get_element(dlItemTemplate, 's3downbar_download_box_progressremainder');
		var progressremainderStyle = s3dm.utils.prefs_get("style.progressremainder_color");
		s3dm.utils.set_element_style(progressremainder, 'background-color: ' + progressremainderStyle);

		var filename = s3dm.utils.get_element(dlItemTemplate, 's3downbar_download_box_filename');
		var filenameLabel_color = s3dm.utils.prefs_get("style.filenameLabel_color");
		var filenameLabel_size = s3dm.utils.prefs_get("style.filenameLabel_size");
		s3dm.utils.set_element_style(filename, 'color:' + filenameLabel_color + ';font-size:' + filenameLabel_size + 'pt');
		if (filenameLabel_size < 9) {
			download_box_img.setAttribute('filename_size_8pt', true);
		}

		var progress_percent = s3dm.utils.get_element(dlItemTemplate, 's3downbar_download_box_progress_percent');
		var progress_remaintime = s3dm.utils.get_element(dlItemTemplate, 's3downbar_download_box_progress_remaintime');
		var progress_bytesReceived = s3dm.utils.get_element(dlItemTemplate, 's3downbar_download_box_progress_bytesReceived');
		var progress_speed = s3dm.utils.get_element(dlItemTemplate, 's3downbar_download_box_progress_speed');
		var progressIndicatorStyle = s3dm.utils.prefs_get("style.progressIndicator_size");
		s3dm.utils.set_element_style(progress_percent, 'font-size:' + progressIndicatorStyle + 'pt');
		s3dm.utils.set_element_style(progress_remaintime, 'font-size:' + progressIndicatorStyle + 'pt');
		s3dm.utils.set_element_style(progress_bytesReceived, 'font-size:' + progressIndicatorStyle + 'pt');
		s3dm.utils.set_element_style(progress_speed, 'font-size:' + progressIndicatorStyle + 'pt');
	}
}
//------------------------------------------------------------------------------
s3dm.viewer.count_summary = function() {
	var res = s3dm.utils.count_summary(s3dm.downbar.download_list);
	//-----------------------------------------------------------------------
	var timeRemainingText = (res.timeRemaining > 0) ? s3dm.utils.format_seconds(res.timeRemaining) + ' :: ' : '';
	//-----------------------------------------------------------------------
	var speedText = '';
	if (res.speed_total > 0) {
		speedText = s3dm.utils.get_strings_to_KB_MB_GB(res.speed_total, true) + ' :: ';
	}
	//-----------------------------------------------------------------------
	var result_text = (res.percentComplete == 100) ? res.percentComplete + '%'  : timeRemainingText + speedText + res.percentComplete + '%';
	if (document.getElementById('s3downbar_download_data_list_empty')) {
		s3dm.downbar.download_listbox.setAttribute('list_count', res.download_all);
	}
	if (document.getElementById('s3downbar_holder_summary_progress')) {
		s3dm.utils.HTMLDOM_value(document.getElementById('s3downbar_holder_summary_progress').firstChild, result_text);
	}

	//-----------------------------------------------------------------------
	if (! s3dm.downbar.is_popup) {
		s3dm.downbar.set_body_margin();
	}
}
//------------------------------------------------------------------------------
s3dm.viewer.set_action = function(s3id_list, action) {
	for (var s3id in s3id_list) {
		var aDownload = s3dm.downbar.download_list[s3id];
		if (aDownload) {
			aDownload.is_queue = false;
			aDownload.is_manual = true;
			//-----------------------------------------------------------
			if (action == 'pause') {
				if (! aDownload.succeeded) {
					chrome.runtime.sendMessage({ 'action' : 'download_pause', 's3id' : s3id, 'is_manual' : true, 'is_queue' : false }, function(response){});
				}
			} else if (action == 'cancel') {
				if (! aDownload.succeeded) {
					chrome.runtime.sendMessage({ 'action' : 'download_cancel', 's3id' : s3id, 'is_manual' : true, 'is_queue' : false }, function(response){});
//					s3dm.action.start_auto_clear(s3id, 10);
				}
			} else if ((action == 'start') || (action == 'start_all')) {
				if (! aDownload.succeeded) {
					var start_all = (action == 'start_all') ? true : false;
					chrome.runtime.sendMessage({ 'action' : 'download_start', 's3id' : s3id, 'is_manual' : true, 'is_queue' : false, 'start_all' : start_all }, function(response){});
				}
			} else if (action == 'refresh') {
//				yield aDownload.refresh();
			}
			//---------------------------------------------
			s3dm.viewer.set_download_state(aDownload);
			s3dm.viewer.calculate_view(aDownload);
		}
	}
}
//------------------------------------------------------------------------------
s3dm.viewer.toggle_downbar = function(is_hide) {
	chrome.runtime.sendMessage({ 'action_prefs_set': true, 'pref_name' : 'downbar_is_collapsed', 'pref_value': is_hide }, function(response) {
		s3dm.viewer.hide_downbar(is_hide);
	});
}
//------------------------------------------------------------------------------
s3dm.viewer.hide_downbar = function(is_hide) {
	if (! s3dm.downbar.is_popup) {
		if (is_hide) {
			s3dm.utils.set_element_style(s3dm.downbar.box, "display: none");
		} else {
			s3dm.utils.set_element_style(s3dm.downbar.box, "display: flex");
		}
		s3dm.downbar.set_body_margin();
	}
}
//------------------------------------------------------------------------------
s3dm.viewer.onMessage = function(request, sender, sendResponse) {
	//------------------------------------------------------------------------
	if (! request) { return; }
	//------------------------------------------------------------------------
	if (request.undo_view_list) {
		s3dm.downbar.undo_view_list = request.undo_view_list;
	}

	//------------------------------------------------------------------------
	if (request.action_reload_popup) {
		s3dm.prefs.init(function(){
			var style_version = s3dm.utils.prefs_get('style.version');
			//-----------------------------------------------------------
			if ((! s3dm.downbar.is_popup) && (style_version != s3dm.downbar.style_version)) {
				s3dm.downbar.style_version = style_version;
				s3dm.downbar.get_download_template(function(){
					if (s3dm.downbar.create_downbar_box()) {
						s3dm.downbar.create_download_bar(request.download_list);
					}
				});
			}
			//-----------------------------------------------------------
			else if (s3dm.downbar.box) {
				s3dm.viewer.create_download_list(request.download_list, false, request.use_animation);
			}
			//-----------------------------------------------------------
			else if (s3dm.downbar.is_popup) {
				s3dm.downbar.create_download_bar(request.download_list, false, request.use_animation);
			}
			//-----------------------------------------------------------
			else if (s3dm.downbar.create_downbar_box()) {
				s3dm.downbar.create_download_bar(request.download_list);
			}
			//-----------------------------------------------------------
			s3dm.viewer.hide_downbar(s3dm.utils.prefs_get('downbar_is_collapsed'));
		});
	}
	//------------------------------------------------------------------------
	else if (! s3dm.downbar.box) {
		sendResponse({ 'success' : false });
	}
	//------------------------------------------------------------------------
	else if (request.check_tooltip) {
		if (window.s3dm) {
			var lib_load_ok = true;
			try {
				var lib_list = s3dm.downbar.lib_list;
				//-----------------------------------------------------------
				for (var i=0; i<lib_list.length; i++) {
					if (! s3dm[lib_list[i]]) {
						lib_load_ok = false;
						break;
					}
				}
			} catch(e) {
				lib_load_ok = false;
			}
			sendResponse({ 'success' : lib_load_ok });
		} else {
			document.documentElement.s3dm_init_s = false;
			sendResponse({ 'success' : false });
		}
	}
	//------------------------------------------------------------------------
	else if (request.action_change_zoom) {
		if (! s3dm.downbar.is_popup) {
			s3dm.downbar.set_zoom(request.zoom_index);
			sendResponse({ 'success' : true });
		}
	}
	//------------------------------------------------------------------------
	else if (request.action_event_added && request.aDownload) {
		s3dm.viewer.insert_new_download(request.aDownload);
//		s3dm.viewer.count_summary();
		sendResponse({ 'success' : true });
	}
	//------------------------------------------------------------------------
	else if (request.action_event_changed && request.aDownload) {
		s3dm.viewer.insert_new_download(request.aDownload);
//		s3dm.viewer.count_summary();
		sendResponse({ 'success' : true });
	}
	//------------------------------------------------------------------------
	else if (request.action_download_restore && request.aDownload) {
		var insert_before = null;
		var download_list = s3dm.utils.get_downlist(s3dm.downbar.download_list);
		var place_from_right = s3dm.viewer.get_placeDownloadsFromRight();
		//------------------------------------------------------------------
		for (var i=0; i<download_list.length; i++) {
			var aDownload = download_list[i];
			if (place_from_right) {
				if (request.aDownload.startTime < aDownload.startTime) {
					if (! insert_before) {
						insert_before = aDownload.box;
						break;
					}
				}
			} else if (request.aDownload.startTime > aDownload.startTime) {
				insert_before = aDownload.box;
			} else {
				break;
			}
		}
		//------------------------------------------------------------------
		if (! insert_before) {
			insert_before = { 'is_first_child' : true, 'place_from_right' : place_from_right };
		}
		s3dm.viewer.insert_new_download(request.aDownload, insert_before);
	}
	//------------------------------------------------------------------------
	else if (request.action_event_removed && request.aDownload) {
		s3dm.action.start_auto_clear(request.aDownload.s3id, 10);
		sendResponse({ 'success' : true });
	}
	//------------------------------------------------------------------------
	else if ((! s3dm.downbar.is_popup) && request.set_image_preview && request.s3id && request.image_url) {
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
	else if (request.action_start_show_file) {
		s3dm.action.start_show_file(request.s3id, request.completed);
		sendResponse({ 'success' : true });
	}
	//------------------------------------------------------------------------
	else if (request.action_start_open_finished) {
		s3dm.action.start_open_finished(request.s3id, request.is_opened);
		sendResponse({ 'success' : true });
	}
	//------------------------------------------------------------------------
	else if (request.action_start_delete) {
		s3dm.action.start_delete(request.s3id, request.event);
		sendResponse({ 'success' : true });
	}
	//------------------------------------------------------------------------
	else if (request.action_animate_decide) {
		s3dm.action.animate_decide(request.s3id, request.doWhenDone, request.event);
		sendResponse({ 'success' : true });
	}
	//------------------------------------------------------------------------
	else if (request.action_set_progress) {
		if (request.action == 'pause') {
			s3dm.action.set_pause(request.s3id);
		} else if (request.action == 'resume') {
			s3dm.action.set_resume(request.s3id);
		} else if (request.action == 'cancel') {
			s3dm.action.set_cancel(request.s3id);
		}
		sendResponse({ 'success' : true });
	}
	//------------------------------------------------------------------------
	else if (request.action_show_tooltip) {
		var aDownload = s3dm.downbar.download_list[request.s3id];
		if (aDownload) {
			if (s3dm.utils.prefs_get('function.showTooltip')) {
				s3dm.downbar.tooltip_show(aDownload.box);
			}
		}
		sendResponse({ 'success' : true });
	}
	//------------------------------------------------------------------------
	else if (request.action_hide_tooltip) {
		if (s3dm.downbar.current_tooltip_box) {
			s3dm.downbar.tooltip_hide(s3dm.downbar.current_tooltip_box);
		}
		sendResponse({ 'success' : true });
	}
	//------------------------------------------------------------------------
	else if (request.action_hide_downbar) {
		s3dm.viewer.hide_downbar(request.is_hide);
		s3dm.utils.prefs_set('downbar_is_collapsed', request.is_hide);
		sendResponse({ 'success' : true });
	}
	//------------------------------------------------------------------------
	else if (request.action_set_styles) {
		s3dm.downbar.get_download_template(function(){
			if (s3dm.downbar.create_downbar_box()) {
				s3dm.downbar.create_download_bar(request.download_list);
			}
		});
		sendResponse({ 'success' : true });
	}
	//------------------------------------------------------------------------
	else if (request.action_contextmenu_show) {
		var aDownload = s3dm.downbar.download_list[request.s3id];
		if (aDownload) {
			var res = aDownload.box.getBoundingClientRect();
			var event = {
				'clientX' : request.event.clientX/s3dm.downbar.zoom_index + res.left,
				'clientY' : request.event.clientY/s3dm.downbar.zoom_index + res.top,
				'target' : aDownload.box
			};
			s3dm.contextmenu.create(event);
		}
		sendResponse({ 'success' : true });
	}
}
//------------------------------------------------------------------------------
