s3dm.contextmenu = {};
s3dm.contextmenu.box = null;

//------------------------------------------------------------------------------
s3dm.contextmenu.create = function(e, force_target) {
	try {
		if (s3dm.downbar.current_tooltip_box) {
			s3dm.downbar.tooltip_hide(s3dm.downbar.current_tooltip_box);
		}
	} catch(e) {};

	//------------------------------------------------------------------------
	s3dm.contextmenu.destroy();

	//------------------------------------------------------------------------
	s3dm.contextmenu.box = document.createElement('div');
	s3dm.utils.reset_style(s3dm.contextmenu.box);
	s3dm.downbar.box.appendChild(s3dm.contextmenu.box);
	s3dm.contextmenu.box.setAttribute('tabindex', 0);
//	s3dm.contextmenu.box.focus();
	s3dm.contextmenu.box.className = 'contextmenu_box';
	if (s3dm.downbar.is_history) {
		s3dm.utils.set_element_style(s3dm.contextmenu.box, 'position: fixed');
	}
	s3dm.contextmenu.box.className = 'contextmenu_box';
	s3dm.contextmenu.box.addEventListener("blur", function(e){ s3dm.contextmenu.destroy(); });
	s3dm.contextmenu.box.mouseX = (e.clientX*s3dm.downbar.zoom_index)-90;
	s3dm.contextmenu.box.mouseY = (e.clientY*s3dm.downbar.zoom_index)+10;

	//------------------------------------------------------------------------
	if (! s3dm.utils.prefs_get("style.default")) {
		var contextmenu_bgcolor = s3dm.utils.prefs_get("style.contextmenu_bgcolor");
		var contextmenu_text_color = s3dm.utils.prefs_get("style.contextmenu_text_color");
		var contextmenu_text_size = s3dm.utils.prefs_get("style.contextmenu_text_size");

		s3dm.utils.set_element_style(s3dm.contextmenu.box, 'background-color: ' + contextmenu_bgcolor);
		s3dm.utils.set_element_style(s3dm.contextmenu.box, 'color: ' + contextmenu_text_color);
		s3dm.utils.set_element_style(s3dm.contextmenu.box, 'font-size: ' + contextmenu_text_size + 'pt');
	}

	//------------------------------------------------------------------------
	var menu_target_id = null;
	var menu_target_type = null;
	var menu_search = e.target;
	//------------------------------------------------------------------------
	while (menu_search.parentNode) {
		if (menu_search.id == s3dm.downbar.box_id) {
			menu_target_type = 'menu_main';
			break;
		} else if (s3dm.downbar.download_list[menu_search.id]) {
			menu_target_id = menu_search.id;
			menu_target_type = 'menu_downloads';
			break;
		} else if (menu_search.id == 's3downbar_clear_button') {
			break;
		} else if (menu_search.id == 'download_list_head') {
			menu_target_type = 'menu_dl_head';
			break;
		}

		menu_search = menu_search.parentNode;
	}
	//------------------------------------------------------------------------
	if (force_target) { menu_target_type = force_target; }
	//------------------------------------------------------------------------
	if (menu_target_type == 'menu_main') {
		if (! s3dm.downbar.is_history) {
			s3dm.contextmenu.create_menu_main();
			s3dm.contextmenu.position();
			return;
		}
	}
	//------------------------------------------------------------------------
	else if (menu_target_type == 'menu_downloads') {
		if (s3dm.downbar.is_history) {
			s3dm.contextmenu.create_menu_dl_downloads();
		} else {
			s3dm.contextmenu.create_menu_downloads(menu_target_id);
		}
		s3dm.contextmenu.position();
		return;
	}
	//------------------------------------------------------------------------
	else if (menu_target_type == 'menu_dl_head') {
		s3dm.contextmenu.create_menu_dl_head();
		s3dm.contextmenu.position();
		return;
	} else {
		s3dm.contextmenu.destroy();
		return;
	}
}
//------------------------------------------------------------------------------
s3dm.contextmenu.create_menu_main = function() {
	var context_menu = s3dm.downbar.download_template_context_main.cloneNode(true);
	s3dm.contextmenu.box.appendChild(context_menu);
	s3dm.contextmenu.set_bg_image(context_menu);

	var is_paused = false;
	var is_resume = false;
	var is_canceled = false;
	var is_finished = false;
	var download_list = s3dm.utils.get_downlist(s3dm.downbar.download_list);

	//------------------------------------------------------------------------
	for (var i=0; i<download_list.length; i++) {
		var aDownload = download_list[i];

		if (s3dm.utils.check_progress_state(aDownload.dlstate)) {
			if (aDownload.paused) {
				is_resume = true;
			} else {
				is_paused = true;
			}
			is_canceled = true;
		} else {
			is_finished = true;
		}
	}

	//------------------------------------------------------------------------
	s3dm.utils.get_element(context_menu, 's3downbar_context_open_DL_history').addEventListener("click", function(event) {
		s3dm.action.open_download_window();
		s3dm.contextmenu.destroy();
		if (s3dm.downbar.is_popup) {
			window.close();
		}
	});
	//------------------------------------------------------------------------
	if (s3dm.downbar.undo_view_list.length > 0) {
		s3dm.utils.get_element(context_menu, 's3downbar_context_undo').addEventListener("click", function(event) {
			s3dm.action.undo_clear();
			if (! s3dm.downbar.undo_view_list.length) {
				s3dm.utils.get_element(context_menu, 's3downbar_context_undo').setAttribute('is_disabled', true);
			}
		});
	} else {
		s3dm.utils.get_element(context_menu, 's3downbar_context_undo').setAttribute('is_disabled', true);
	}
	//------------------------------------------------------------------------
	if (is_paused) {
		s3dm.utils.get_element(context_menu, 's3downbar_context_pause_all').addEventListener("click", function(event) {
			s3dm.action.set_pause_all();
			s3dm.contextmenu.destroy();
		});
	} else {
		s3dm.utils.get_element(context_menu, 's3downbar_context_pause_all').setAttribute('is_disabled', true);
	}
	//------------------------------------------------------------------------
	if (is_resume) {
		s3dm.utils.get_element(context_menu, 's3downbar_context_resume_all').addEventListener("click", function(event) {
			s3dm.action.set_resume_all();
			s3dm.contextmenu.destroy();
		});
	} else {
		s3dm.utils.get_element(context_menu, 's3downbar_context_resume_all').setAttribute('is_disabled', true);
	}
	//------------------------------------------------------------------------
	if (is_canceled) {
		s3dm.utils.get_element(context_menu, 's3downbar_context_cancel_all').addEventListener("click", function(event) {
			s3dm.action.set_cancel_all();
			s3dm.contextmenu.destroy();
		});
	} else {
		s3dm.utils.get_element(context_menu, 's3downbar_context_cancel_all').setAttribute('is_disabled', true);
	}
	//------------------------------------------------------------------------
	if (is_finished) {
		s3dm.utils.get_element(context_menu, 's3downbar_context_remove_all').addEventListener("click", function(event) {
			s3dm.action.clear_all();
			s3dm.contextmenu.destroy();
		});
	} else {
		s3dm.utils.get_element(context_menu, 's3downbar_context_remove_all').setAttribute('is_disabled', true);
	}

	//------------------------------------------------------------------------
	s3dm.utils.get_element(context_menu, 's3downbar_context_create_new_downloads').addEventListener("click", function(event) {
		s3dm.action.create_new_downloads();
		s3dm.contextmenu.destroy();
	});
	//------------------------------------------------------------------------
	s3dm.utils.get_element(context_menu, 's3downbar_context_checksum_for_any_file').addEventListener("click", function(event) {
		s3dm.action.checksum_for_any_file();
		s3dm.contextmenu.destroy();
	});

	//------------------------------------------------------------------------
	if (s3dm.utils.prefs_get('downbar_is_collapsed')) {
		s3dm.utils.get_element(context_menu, 's3downbar_context_show_downbar').addEventListener("click", function(event) {
			s3dm.viewer.toggle_downbar(false);
			s3dm.contextmenu.destroy();
		});
		s3dm.utils.get_element(context_menu, 's3downbar_context_hide_downbar').setAttribute('is_hidden', true);
	}
	//------------------------------------------------------------------------
	else {
		s3dm.utils.get_element(context_menu, 's3downbar_context_hide_downbar').addEventListener("click", function(event) {
			s3dm.viewer.toggle_downbar(true);
			s3dm.contextmenu.destroy();
		});
		s3dm.utils.get_element(context_menu, 's3downbar_context_show_downbar').setAttribute('is_hidden', true);
	}

	//------------------------------------------------------------------------
	if (! s3dm.utils.prefs_get('downbar_show')) {
		s3dm.utils.get_element(context_menu, 's3downbar_context_show_downbar').setAttribute('is_hidden', true);
		s3dm.utils.get_element(context_menu, 's3downbar_context_hide_downbar').setAttribute('is_hidden', true);
		s3dm.utils.get_element(context_menu, 's3downbar_context_show_downbar_separator').setAttribute('is_hidden', true);
	}
	//------------------------------------------------------------------------
	s3dm.utils.get_element(context_menu, 's3downbar_context_open_options').addEventListener("click", function(event) {
		s3dm.action.open_options_window();
		s3dm.contextmenu.destroy();
		if (s3dm.downbar.is_popup) {
			window.close();
		}
	});
}
//------------------------------------------------------------------------------
s3dm.contextmenu.create_menu_downloads = function(menu_target_id) {
	var aDownload = s3dm.downbar.download_list[menu_target_id];
	var context_menu = s3dm.downbar.download_template_context_downloads.cloneNode(true);
	s3dm.contextmenu.box.appendChild(context_menu);
	s3dm.contextmenu.set_bg_image(context_menu);

	//------------------------------------------------------------------------
	if (s3dm.utils.check_progress_state(aDownload.dlstate)) {
		context_menu.setAttribute('is_hidden_finish', true);
	} else {
		context_menu.setAttribute('is_hidden_progress', true);
	}
	//------------------------------------------------------------------------
	if (aDownload.referrer || aDownload.referrer_url) {
		s3dm.utils.get_element(context_menu, 's3downbar_context_visit_source').addEventListener("click", function(event) {
			s3dm.action.visit_referrer_website(aDownload.referrer || aDownload.referrer_url);
			s3dm.contextmenu.destroy();
		});
		s3dm.utils.get_element(context_menu, 's3downbar_context_copy_source').addEventListener("click", function(event) {
			s3dm.action.copy_URL(aDownload.referrer || aDownload.referrer_url);
			s3dm.contextmenu.destroy();
		});
	} else {
		s3dm.utils.get_element(context_menu, 's3downbar_context_visit_source').setAttribute('is_disabled', true);
		s3dm.utils.get_element(context_menu, 's3downbar_context_copy_source').setAttribute('is_disabled', true);
	}
	//------------------------------------------------------------------------
	s3dm.utils.get_element(context_menu, 's3downbar_context_copy_download').addEventListener("click", function(event) {
		s3dm.action.copy_URL(aDownload.finalUrl || aDownload.url);
		s3dm.contextmenu.destroy();
	});
	//------------------------------------------------------------------------
	if (aDownload.dlstate == 0) {
		s3dm.utils.get_element(context_menu, 's3downbar_context_pause_one').addEventListener("click", function(event) {
			s3dm.action.set_pause(aDownload.s3id, event);
			s3dm.contextmenu.destroy();
		});
		s3dm.utils.get_element(context_menu, 's3downbar_context_resume_one').setAttribute('is_disabled', true);
	} else {
		s3dm.utils.get_element(context_menu, 's3downbar_context_resume_one').addEventListener("click", function(event) {
			s3dm.action.set_resume(aDownload.s3id, event);
			s3dm.contextmenu.destroy();
		});
		s3dm.utils.get_element(context_menu, 's3downbar_context_pause_one').setAttribute('is_disabled', true);
	}
	//------------------------------------------------------------------------
	s3dm.utils.get_element(context_menu, 's3downbar_context_cancel_one').addEventListener("click", function(event) {
		s3dm.action.set_cancel(aDownload.s3id, event);
		s3dm.contextmenu.destroy();
	});
	//------------------------------------------------------------------------
	//------------------------------------------------------------------------
	if (aDownload.exists && ((aDownload.dlstate == 1) || (aDownload.dlstate == 6))) {
		s3dm.utils.get_element(context_menu, 's3downbar_context_file_open').addEventListener("click", function(event) {
			s3dm.action.start_open_finished(aDownload.s3id);
			s3dm.contextmenu.destroy();
		});
		//------------------------------------------------------------------
		s3dm.utils.get_element(context_menu, 's3downbar_context_file_show').addEventListener("click", function(event) {
			s3dm.action.start_show_file(aDownload.s3id, true);
			s3dm.contextmenu.destroy();
		});
		//------------------------------------------------------------------
		if (aDownload.dlstate == 1) {
			s3dm.utils.get_element(context_menu, 's3downbar_context_delete_one').addEventListener("click", function(event) {
				s3dm.action.start_delete(aDownload.s3id, event);
				s3dm.contextmenu.destroy();
			});
			//------------------------------------------------------------------
			s3dm.utils.get_element(context_menu, 's3downbar_context_checksum_one').addEventListener("click", function(event) {
				s3dm.action.checksum(aDownload.s3id);
				s3dm.contextmenu.destroy();
			});
		} else {
			s3dm.utils.get_element(context_menu, 's3downbar_context_checksum_one').setAttribute('is_disabled', true);
			s3dm.utils.get_element(context_menu, 's3downbar_context_delete_one').setAttribute('is_disabled', true);
		}

		//------------------------------------------------------------------
		var virusScan = s3dm.utils.prefs_get("function.virusScan");
		if ((aDownload.dlstate == 1) && (virusScan || aDownload.virus_scan_check)) {
			s3dm.utils.get_element(context_menu, 's3downbar_context_antivirus_one').addEventListener("click", function(event) {
				s3dm.action.antivirus(aDownload.s3id);
				s3dm.contextmenu.destroy();
			});
			//------------------------------------------------------------
			s3dm.utils.get_element(context_menu, 's3downbar_context_antivirus_one').setAttribute('virus_scan_warning', aDownload.virus_scan_warning);
			if (aDownload.virus_scan_ratio) {
				s3dm.utils.HTMLDOM_value(s3dm.utils.get_element(context_menu, 's3downbar_context_antivirus_one_ratio'), aDownload.virus_scan_ratio[0] + ' / ' + aDownload.virus_scan_ratio[1]);
			}
		} else {
			s3dm.utils.get_element(context_menu, 's3downbar_context_antivirus_one').setAttribute('is_disabled', true);
		}
	}
	//------------------------------------------------------------------------
	else {
		s3dm.utils.get_element(context_menu, 's3downbar_context_file_open').setAttribute('is_disabled', true);
		s3dm.utils.get_element(context_menu, 's3downbar_context_file_show').setAttribute('is_disabled', true);
		s3dm.utils.get_element(context_menu, 's3downbar_context_antivirus_one').setAttribute('is_disabled', true);
		s3dm.utils.get_element(context_menu, 's3downbar_context_checksum_one').setAttribute('is_disabled', true);
		s3dm.utils.get_element(context_menu, 's3downbar_context_delete_one').setAttribute('is_disabled', true);
	}
	//------------------------------------------------------------------------
	//------------------------------------------------------------------------
	s3dm.utils.get_element(context_menu, 's3downbar_context_file_show_progress').addEventListener("click", function(event) {
		s3dm.action.start_show_file(aDownload.s3id, false);
		s3dm.contextmenu.destroy();
	});
	//------------------------------------------------------------------------
	s3dm.utils.get_element(context_menu, 's3downbar_context_remove_one').addEventListener("click", function(event) {
		s3dm.action.animate_decide(aDownload.s3id, 'clear', event);
		s3dm.contextmenu.destroy();
	});
	//------------------------------------------------------------------------
	s3dm.utils.get_element(context_menu, 's3downbar_context_retry_one').addEventListener("click", function(event) {
		s3dm.action.download_retry(aDownload.finalUrl || aDownload.url, aDownload.referrer);
		s3dm.contextmenu.destroy();
	});
}
//------------------------------------------------------------------------------
s3dm.contextmenu.create_menu_dl_head = function() {
	var context_menu = s3dm.downbar.download_template_context_dl_head.cloneNode(true);
	s3dm.contextmenu.box.appendChild(context_menu);
	s3dm.contextmenu.set_bg_image(context_menu);

	//------------------------------------------------------------------------
	function sort_set(field_name, field_order, is_up) {
		var el = null;
		var el_change_name = null;
		var el_change_order = (is_up) ? field_order-1 : field_order+1;
		var f_list = s3dm.prefs.get('DL.fields_list');
		//------------------------------------------------------------------
		for (var i=0; i<s3dm.fields_list.length; i++) {
			var f = s3dm.fields_list[i];
			if (f_list[f].order == el_change_order) {
				el_change_name = f;
			}
		}
		//------------------------------------------------------------------
		if (f_list[field_name] && f_list[el_change_name]) {
			f_list[el_change_name].order = f_list[field_name].order;
			f_list[field_name].order = el_change_order;
			s3dm.pref_save('DL.fields_list', f_list, function(){
				sort_list();
				s3dm.set_style_sheet();
			});
		}
	}
	//------------------------------------------------------------------------
	function field_set(f_list, field_name) {
		var f_el_head = s3dm.utils.get_element(context_menu, 's3downbar_context_head_' + field_name);

		s3dm.utils.get_element(f_el_head, 's3downbar_context_head_up').fieldOrder = f_list[field_name].order;
		s3dm.utils.get_element(f_el_head, 's3downbar_context_head_down').fieldOrder = f_list[field_name].order;

		s3dm.utils.set_element_style(f_el_head, 'order:' + f_list[field_name].order);
		f_el_head.setAttribute('is_first_child', false);
		f_el_head.setAttribute('is_last_child', false);
		//------------------------------------------------------------------
		if (f_list[field_name].order == 1) {
			f_el_head.setAttribute('is_first_child', true);
		}
		else if (f_list[field_name].order == s3dm.fields_list.length) {
			f_el_head.setAttribute('is_last_child', true);
		}
	}
	//------------------------------------------------------------------------
	function sort_list() {
		var f_list = s3dm.prefs.get('DL.fields_list');
		//------------------------------------------------------------------
		for (var i=0; i<s3dm.fields_list.length; i++) {
			var f = s3dm.fields_list[i];
			field_set(f_list, f);
		}
	}

	//------------------------------------------------------------------------
	var fields_list = s3dm.prefs.get('DL.fields_list');
	//------------------------------------------------------------------------
	for (var i=0; i<s3dm.fields_list.length; i++) {
		var field = s3dm.fields_list[i];
		var field_el_head = s3dm.utils.get_element(context_menu, 's3downbar_context_head_' + field);
		var field_el_check = s3dm.utils.get_element(context_menu, 's3downbar_context_check_' + field);
		//------------------------------------------------------------------
		field_el_head.fieldName = field;
		//------------------------------------------------------------------
		field_el_head.addEventListener("mousedown", function(event) {
			s3dm.contextmenu.box.not_destroy = true;
		});
		//------------------------------------------------------------------
		field_el_head.addEventListener("click", function(event) {
			var fieldName = this.fieldName;
			if (s3dm.utils.get_element(context_menu, 's3downbar_context_check_' + fieldName).checked) {
				fields_list[fieldName].disabled = false;
			} else {
				fields_list[fieldName].disabled = true;
			}
			s3dm.pref_save('DL.fields_list', fields_list, function(){
				s3dm.set_style_sheet();
				s3dm.contextmenu.box.focus();
			});
		});
		//------------------------------------------------------------------
		s3dm.utils.get_element(field_el_head, 's3downbar_context_head_up').fieldName = field;
		s3dm.utils.get_element(field_el_head, 's3downbar_context_head_up').addEventListener("click", function(event) {
			sort_set(this.fieldName, this.fieldOrder, true);
			s3dm.contextmenu.box.focus();
		});
		//------------------------------------------------------------------
		s3dm.utils.get_element(field_el_head, 's3downbar_context_head_down').fieldName = field;
		s3dm.utils.get_element(field_el_head, 's3downbar_context_head_down').addEventListener("click", function(event) {
			sort_set(this.fieldName, this.fieldOrder, false);
			s3dm.contextmenu.box.focus();
		});
		//------------------------------------------------------------------
		if (! fields_list[field].disabled) {
			field_el_check.checked = true;
		}
		//------------------------------------------------------------------
		field_set(fields_list, field);
	}
	//------------------------------------------------------------------------
	s3dm.utils.get_element(context_menu, 's3downbar_context_head_reset').addEventListener("click", function(event) {
		s3dm.pref_save('DL.fields_list', s3dm.prefs.defaults['DL.fields_list'], function(){
			s3dm.contextmenu.destroy();
			s3dm.set_style_sheet();
		});
	});
}
//------------------------------------------------------------------------------
s3dm.contextmenu.create_menu_dl_downloads = function() {
	var context_menu = s3dm.downbar.download_template_context_dl_downloads.cloneNode(true);
	s3dm.contextmenu.box.appendChild(context_menu);
	s3dm.contextmenu.set_bg_image(context_menu);

	if (! s3dm.download_select_list.length) {
		s3dm.contextmenu.destroy();
		return false;
	}

	//-----------------------------------------------------------------------
	var select_count = 0;
	var progress_count = 0;
	var done_count = 0;
	var pause_count = 0;
	var fileSizeMax = -1;
	var fileSizeCount = 0;
	var referrerUri_count = 0;
	var download_count = 0;
	var download_file_not_found_count = 0;
	var referer_list = {};
	var download_url_list = {};
	var download_url_count = 0;
	var file_locked = 0;
	//-----------------------------------------------------------------------
	for (var i=0; i<s3dm.download_select_list.length; i++) {
		var s3id = s3dm.download_select_list[i];
		select_count++;
		var aDownload = s3dm.downbar.download_list[s3id];
		//-----------------------------------------------------------------
		if (s3dm.utils.check_progress_state(aDownload.dlstate)) {
			if (aDownload.paused) {
				pause_count++;
			}
			progress_count++;
		} else {
			done_count++;
			if (aDownload.succeeded) {
				fileSizeMax = (aDownload.fileSize > fileSizeMax) ? aDownload.fileSize : fileSizeMax;
				if (aDownload.fileSize >= 0) {
					fileSizeCount++;
				}
			} else if (aDownload.dlstate == 6) {
				file_locked++;
			}
		}
		//-----------------------------------------------------------------
		if (aDownload.referrer != '') {
			if (! referer_list[aDownload.referrer]) {
				referrerUri_count++;
				referer_list[aDownload.referrer] = true;
			}
		}
		//-----------------------------------------------------------------
		var download_url = aDownload.finalUrl || aDownload.url;
		if (! download_url_list[download_url]) {
			download_url_count++;
			download_url_list[download_url] = true;
		}
	}
	//-----------------------------------------------------------------------
	var d_list = s3dm.utils.get_downlist(s3dm.downbar.download_list);
	//-----------------------------------------------------------------------
	for (var i=0; i<d_list.length; i++) {
		var aDownload = d_list[i];
		if (! s3dm.utils.check_progress_state(aDownload.dlstate)) {
			download_count++;
			if (aDownload.is_succeeded && (aDownload.fileSize < 0)) {
				download_file_not_found_count++;
			}
		}
	}

	//-----------------------------------------------------------------------
	var s3downbar_pause = s3dm.utils.get_element(context_menu, 's3downbar_context_dl_pause');
	var s3downbar_pause_hidden = (progress_count > 0) ? false : true;
	var s3downbar_pause_disabled = (pause_count >= progress_count) ? true : false;
	s3downbar_pause.setAttribute('is_hidden', s3downbar_pause_hidden);
	s3downbar_pause.setAttribute('is_disabled' , s3downbar_pause_disabled);
	var s3downbar_pause_label = s3dm.utils.get_string('action.pause_one.label') + (((progress_count - pause_count)>1) || (select_count > 1) ? ' (' + (progress_count - pause_count) + ')' : '');
	s3dm.utils.HTMLDOM_value(s3dm.utils.get_element(context_menu, 's3downbar_context_dl_pause_label'), s3downbar_pause_label);
	if (! (s3downbar_pause_hidden || s3downbar_pause_disabled)) {
/**/		s3downbar_pause.addEventListener("click", function(event) { s3dm.action('pause'); });
	}
	//-----------------------------------------------------------------------
	var s3downbar_resume = s3dm.utils.get_element(context_menu, 's3downbar_context_dl_resume');
	var s3downbar_resume_hidden = (progress_count > 0) ? false : true;
	var s3downbar_resume_disabled = (pause_count > 0) ? false : true;
	var s3downbar_resume_label = s3dm.utils.get_string('action.resume_one.label') + ((pause_count > 1) || (select_count > 1) ? ' (' + pause_count + ')' : '');
	s3downbar_resume.setAttribute('is_hidden', s3downbar_resume_hidden);
	s3downbar_resume.setAttribute('is_disabled' , s3downbar_resume_disabled);
	s3dm.utils.HTMLDOM_value(s3dm.utils.get_element(context_menu, 's3downbar_context_dl_resume_label'), s3downbar_resume_label);
	if (! (s3downbar_resume_hidden || s3downbar_resume_disabled)) {
/**/		s3downbar_resume.addEventListener("click", function(event) { s3dm.action('resume'); });
	}
	//-----------------------------------------------------------------------
	var s3downbar_cancel = s3dm.utils.get_element(context_menu, 's3downbar_context_dl_cancel');
	var s3downbar_cancel_hidden = (progress_count > 0) ? false : true;
	var s3downbar_cancel_disabled = (progress_count > 0) ? false : true;
	var s3downbar_cancel_label = s3dm.utils.get_string('action.cancel_one.label') + ((progress_count>1) || (select_count > 1) ? ' (' + progress_count + ')' : '');
	s3downbar_cancel.setAttribute('is_hidden', s3downbar_cancel_hidden);
	s3downbar_cancel.setAttribute('is_disabled' , s3downbar_cancel_disabled);
	s3dm.utils.HTMLDOM_value(s3dm.utils.get_element(context_menu, 's3downbar_context_dl_cancel_label'), s3downbar_cancel_label);
	if (! (s3downbar_cancel_hidden || s3downbar_cancel_disabled)) {
/**/		s3downbar_cancel.addEventListener("click", function(event) { s3dm.action('cancel'); });
	}
	//-----------------------------------------------------------------------
	var s3downbar_retry = s3dm.utils.get_element(context_menu, 's3downbar_context_dl_retry');
	var s3downbar_retry_hidden = (done_count > 0) ? false : true;
	var s3downbar_retry_disabled = (done_count > 0) ? false : true;
	var s3downbar_retry_label = s3dm.utils.get_string('action.retry_one.label') + ((done_count > 1) || (select_count > 1) ? ' (' + (download_url_count - progress_count) + ')' : '');
	s3downbar_retry.setAttribute('is_hidden', s3downbar_retry_hidden);
	s3downbar_retry.setAttribute('is_disabled' , s3downbar_retry_disabled);
	s3dm.utils.HTMLDOM_value(s3dm.utils.get_element(context_menu, 's3downbar_context_dl_retry_label'), s3downbar_retry_label);
	if (! (s3downbar_retry_hidden || s3downbar_retry_disabled)) {
/**/		s3downbar_retry.addEventListener("click", function(event) { s3dm.action('retry'); });
	}
	//-----------------------------------------------------------------------
	var s3downbar_visit_source = s3dm.utils.get_element(context_menu, 's3downbar_context_dl_visit_source');
	var s3downbar_visit_source_disabled = (referrerUri_count > 0) ? false : true;
	var s3downbar_visit_source_label = s3dm.utils.get_string('action.visit_source.label') + (select_count>1 ? ' (' + referrerUri_count + ')' : '');
	s3downbar_visit_source.setAttribute('is_disabled' , s3downbar_visit_source_disabled);
	s3dm.utils.HTMLDOM_value(s3dm.utils.get_element(context_menu, 's3downbar_context_dl_visit_source_label'), s3downbar_visit_source_label);
	if (! s3downbar_visit_source_disabled) {
/**/		s3downbar_visit_source.addEventListener("click", function(event) { s3dm.action('visit_source'); });
	}
	//-----------------------------------------------------------------------
	var s3downbar_copy_source = s3dm.utils.get_element(context_menu, 's3downbar_context_dl_copy_source');
	var s3downbar_copy_source_disabled = (referrerUri_count > 0) ? false : true;
	var s3downbar_copy_source_label = s3dm.utils.get_string('action.copy_source.label') + (select_count>1 ? ' (' + referrerUri_count + ')' : '');
	s3downbar_copy_source.setAttribute('is_disabled' , s3downbar_copy_source_disabled);
	s3dm.utils.HTMLDOM_value(s3dm.utils.get_element(context_menu, 's3downbar_context_dl_copy_source_label'), s3downbar_copy_source_label);
	if (! s3downbar_copy_source_disabled) {
/**/		s3downbar_copy_source.addEventListener("click", function(event) { s3dm.action('copy_source'); });
	}
	//-----------------------------------------------------------------------
	var s3downbar_copy_download = s3dm.utils.get_element(context_menu, 's3downbar_context_dl_copy_download');
	var s3downbar_copy_download_label = s3dm.utils.get_string('action.copy_download_link.label') + (select_count>1 ? ' (' + download_url_count + ')' : '');
	s3dm.utils.HTMLDOM_value(s3dm.utils.get_element(context_menu, 's3downbar_context_dl_copy_download_label'), s3downbar_copy_download_label);
/**/	s3downbar_copy_download.addEventListener("click", function(event) { s3dm.action('copy_download'); });
	//-----------------------------------------------------------------------
	var s3downbar_delete_file = s3dm.utils.get_element(context_menu, 's3downbar_context_dl_delete');
	var s3downbar_delete_file_hidden = (done_count > 0) ? false : true;
	var s3downbar_delete_file_disabled = (fileSizeMax >= 0) ? false : true;
	var s3downbar_delete_file_label = s3dm.utils.get_string('action.delete.label') + ((done_count>1) || (select_count > 1) ? ' (' + fileSizeCount + ')' : '');
	s3downbar_delete_file.setAttribute('is_hidden', s3downbar_delete_file_hidden);
	s3downbar_delete_file.setAttribute('is_disabled' , s3downbar_delete_file_disabled);
	s3dm.utils.HTMLDOM_value(s3dm.utils.get_element(context_menu, 's3downbar_context_dl_delete_label'), s3downbar_delete_file_label);
	if (! (s3downbar_delete_file_hidden || s3downbar_delete_file_disabled)) {
/**/		s3downbar_delete_file.addEventListener("click", function(event) { s3dm.action('delete_file', fileSizeCount); });
	}
	//-----------------------------------------------------------------------
	var s3downbar_remove_history = s3dm.utils.get_element(context_menu, 's3downbar_context_dl_remove');
	var s3downbar_remove_history_hidden = (done_count > 0) ? false : true;
	var s3downbar_remove_history_label = s3dm.utils.get_string('action.remove_history.label') + ((done_count>1) || (select_count > 1) ? ' (' + done_count + ')' : '');
	s3downbar_remove_history.setAttribute('is_hidden', s3downbar_remove_history_hidden);
	s3dm.utils.HTMLDOM_value(s3dm.utils.get_element(context_menu, 's3downbar_context_dl_remove_label'), s3downbar_remove_history_label);
	if (! s3downbar_remove_history_hidden) {
/**/		s3downbar_remove_history.addEventListener("click", function(event) { s3dm.action('remove_history', done_count); });
	}
	//-----------------------------------------------------------------------
	var s3downbar_open_file = s3dm.utils.get_element(context_menu, 's3downbar_context_dl_file_open');
	var s3downbar_open_file_hidden = ((select_count == 1) && done_count > 0) ? false : true;
	var s3downbar_open_file_disabled = ((fileSizeMax >= 0) || (file_locked>0)) ? false : true;
	s3downbar_open_file.setAttribute('is_hidden', s3downbar_open_file_hidden);
	s3downbar_open_file.setAttribute('is_disabled' , s3downbar_open_file_disabled);
	if (! (s3downbar_open_file_hidden || s3downbar_open_file_disabled)) {
/**/		s3downbar_open_file.addEventListener("click", function(event) { s3dm.action('open_file'); });
	}
	//-----------------------------------------------------------------------
	var s3downbar_show_dir = s3dm.utils.get_element(context_menu, 's3downbar_context_dl_file_show');
	var s3downbar_show_dir_hidden = ((select_count == 1) && done_count > 0) ? false : true;
	var s3downbar_show_dir_disabled = ((fileSizeMax >= 0) || (file_locked>0)) ? false : true;
	s3downbar_show_dir.setAttribute('is_hidden', s3downbar_show_dir_hidden);
	s3downbar_show_dir.setAttribute('is_disabled' , s3downbar_show_dir_disabled);
	if (! (s3downbar_show_dir_hidden || s3downbar_show_dir_disabled)) {
/**/		s3downbar_show_dir.addEventListener("click", function(event) { s3dm.action('show_dir'); });
	}
	//-----------------------------------------------------------------------
	var s3downbar_checksum = s3dm.utils.get_element(context_menu, 's3downbar_context_dl_checksum');
	var s3downbar_checksum_hidden = ((select_count == 1) && done_count > 0) ? false : true;
	var s3downbar_checksum_disabled = (fileSizeMax >= 0) ? false : true;
	s3downbar_checksum.setAttribute('is_hidden', s3downbar_checksum_hidden);
	s3downbar_checksum.setAttribute('is_disabled' , s3downbar_checksum_disabled);
	if (! (s3downbar_checksum_hidden || s3downbar_checksum_disabled)) {
/**/		s3downbar_checksum.addEventListener("click", function(event) { s3dm.action('checksum'); });
	}
	//-----------------------------------------------------------------------
	var s3downbar_remove_all_file_not_found = s3dm.utils.get_element(context_menu, 's3downbar_context_dl_remove_not_found');
	var s3downbar_remove_all_file_not_found_disabled = (download_file_not_found_count > 0) ? false : true;
	var s3downbar_remove_all_file_not_found_label = s3dm.utils.get_string('action.remove_history.label') + ' : ' + s3dm.utils.get_string('action.all_lost_files.label') + ' (' + download_file_not_found_count + ')';
	s3downbar_remove_all_file_not_found.setAttribute('is_disabled', s3downbar_remove_all_file_not_found_disabled);
	s3dm.utils.HTMLDOM_value(s3dm.utils.get_element(context_menu, 's3downbar_context_dl_remove_not_found_label'), s3downbar_remove_all_file_not_found_label);
	if (! s3downbar_remove_all_file_not_found_disabled) {
/**/		s3downbar_remove_all_file_not_found.addEventListener("click", function(event) { s3dm.action('remove_history_file_not_found', download_file_not_found_count); });
	}
	//-----------------------------------------------------------------------
	var s3downbar_remove_all = s3dm.utils.get_element(context_menu, 's3downbar_context_dl_remove_all');
	var s3downbar_remove_all_disabled = (download_count > 0) ? false : true;
	var s3downbar_remove_all_label = s3dm.utils.get_string('action.remove_history.label') + ' : ' + s3dm.utils.get_string('action.all_files.label') + ' (' + download_count + ')';
	s3downbar_remove_all.setAttribute('is_disabled', s3downbar_remove_all_disabled);
	s3dm.utils.HTMLDOM_value(s3dm.utils.get_element(context_menu, 's3downbar_context_dl_remove_all_label'), s3downbar_remove_all_label);
	if (! s3downbar_remove_all_disabled) {
/**/		s3downbar_remove_all.addEventListener("click", function(event) { s3dm.action('remove_history_all_done'); });
	}
	//-----------------------------------------------------------------------
	var s3downbar_select_all = s3dm.utils.get_element(context_menu, 's3downbar_context_dl_select_all');
/**/	s3downbar_select_all.addEventListener("click", function(event) { s3dm.action('select_all'); });

	//-----------------------------------------------------------------------
	var s3downbar_menuseparator_1_hidden = (s3downbar_open_file_hidden && s3downbar_show_dir_hidden && s3downbar_checksum_hidden) ? true : false;
	s3dm.utils.get_element(context_menu, 's3downbar_menuseparator_dl_1').setAttribute('is_hidden', s3downbar_menuseparator_1_hidden);

	var s3downbar_menuseparator_2_hidden = (s3downbar_pause_hidden && s3downbar_resume_hidden && s3downbar_cancel_hidden && s3downbar_retry_hidden) ? true : false;
	s3dm.utils.get_element(context_menu, 's3downbar_menuseparator_dl_2').setAttribute('is_hidden', s3downbar_menuseparator_2_hidden);

	var s3downbar_menuseparator_3_hidden = (s3downbar_remove_history_hidden && s3downbar_delete_file_hidden) ? true : false;
	s3dm.utils.get_element(context_menu, 's3downbar_menuseparator_dl_3').setAttribute('is_hidden', s3downbar_menuseparator_3_hidden);
}
//------------------------------------------------------------------------------
s3dm.contextmenu.set_bg_image = function(parent) {
	if (parent == null) { return null; };

	for (var i=0; i<parent.childNodes.length; i++) {
		var el = parent.childNodes[i];
		if (el.hasAttribute && el.hasAttribute('bgimage')) {
			el.style.setProperty("background-image", "url(" + chrome.extension.getURL('/skin/s3dm_icons.png') + ")", "important");
		}
		if (el.hasChildNodes()) {
			var res = s3dm.contextmenu.set_bg_image(el);
			if (res != null) {
				return res;
			}
		}
	}
	return null;
}
//------------------------------------------------------------------------------
s3dm.contextmenu.position = function() {
	//------------------------------------------------------------------------
	if (! s3dm.contextmenu.box) { return; }
	//------------------------------------------------------------------------
	var mouseX = s3dm.contextmenu.box.mouseX;
	var mouseY = s3dm.contextmenu.box.mouseY;
	var zoom_index = s3dm.downbar.zoom_index;

	var contextmenu_width = s3dm.contextmenu.box.offsetWidth;
	var contextmenu_height = s3dm.contextmenu.box.offsetHeight;

	s3dm.utils.set_element_style(s3dm.contextmenu.box, 'min-width: ' + contextmenu_width + 'px; min-height: ' + (contextmenu_height-5) + 'px');

	var page_height = Math.min(document.body.clientHeight, document.documentElement.clientHeight)*zoom_index;

	if ((mouseX + contextmenu_width) > (document.documentElement.clientWidth*zoom_index - 10)) {
		mouseX = document.documentElement.clientWidth*zoom_index - (contextmenu_width + 10);
	}

	if ((s3dm.downbar.is_position == 'top') || (s3dm.downbar.is_history)) {
		mouseY = mouseY-20;
		if ((mouseY + contextmenu_height) > (page_height - 2)) {
			mouseY = page_height - (contextmenu_height + 10);
		}
	} else {
		if (mouseY < (contextmenu_height+15)) {
			mouseY = contextmenu_height + 15;
		}
	}
	//------------------------------------------------------------------------
	if (mouseX < 0) { mouseX = 5; }
	if (mouseY < 0) { mouseY = 2; }

	//------------------------------------------------------------------------
	var box_width = s3dm.downbar.box.offsetWidth*zoom_index;
	var box_height = s3dm.downbar.box.offsetHeight*zoom_index;
	var right = document.documentElement.clientWidth*zoom_index - mouseX - contextmenu_width;

	var bottom = (page_height - mouseY);// + contextmenu_height;
	//------------------------------------------------------------------------
	if (right < 0) { right = 5; }
	if (bottom < 0) { bottom = 0; }
	//------------------------------------------------------------------------

	if ((s3dm.downbar.is_position == 'top') || (s3dm.downbar.is_history)) {
		var left = mouseX;
		var top = mouseY;
		s3dm.utils.set_element_style(s3dm.contextmenu.box, 'left: ' + left + 'px; top: ' + top + 'px');
	}
	else {
		var left = mouseX;
		s3dm.utils.set_element_style(s3dm.contextmenu.box, 'left: ' + left + 'px; bottom: ' + bottom + 'px');
	}

	s3dm.contextmenu.box.mouseX = mouseX;
	s3dm.contextmenu.box.mouseY = mouseY;
	s3dm.contextmenu.box.focus();

	//------------------------------------------------------------------------
	if (s3dm.downbar.is_popup) {
		if (s3dm.downbar.box.scrollWidth > s3dm.downbar.box.offsetWidth) {
			var width = s3dm.downbar.box.scrollWidth;
			s3dm.downbar.box.custom_context_width_value = s3dm.downbar.box.style.minWidth;
			s3dm.utils.set_element_style(s3dm.downbar.box, 'min-width: ' + width + 'px; max-width: ' + width + 'px;');
			s3dm.downbar.box.custom_context_width = true;
		}
		if (s3dm.contextmenu.box.offsetHeight > s3dm.downbar.box.offsetHeight) {
			var height = s3dm.contextmenu.box.offsetHeight;
			s3dm.utils.set_element_style(s3dm.downbar.box, 'min-height: ' + height + 'px; max-height: ' + height + 'px;');
			s3dm.downbar.box.custom_context_height = true;
		}
	}
}
//------------------------------------------------------------------------------
s3dm.contextmenu.destroy = function() {
	if (s3dm.contextmenu.box) {
		if (s3dm.contextmenu.box.not_destroy) {
			s3dm.contextmenu.box.not_destroy = false;
			s3dm.contextmenu.box.focus();
			return;
		}
		//------------------------------------------------------------------
		try {
			s3dm.contextmenu.box.parentNode.removeChild(s3dm.contextmenu.box);
		} catch(e) {
		}
		//------------------------------------------------------------------
		s3dm.contextmenu.box = null;
		//------------------------------------------------------------------
		if (s3dm.downbar.box.custom_context_width) {
			s3dm.downbar.box.style.minWidth = s3dm.downbar.box.custom_context_width_value;
			s3dm.downbar.box.style.maxWidth = s3dm.downbar.box.custom_context_width_value;
			s3dm.downbar.box.custom_context_width = false;
		}
		//------------------------------------------------------------------
		if (s3dm.downbar.box.custom_context_height) {
			s3dm.downbar.box.style.minHeight = '';
			s3dm.downbar.box.style.maxHeight = '';
			s3dm.downbar.box.custom_context_height = false;
		}
	}
}
