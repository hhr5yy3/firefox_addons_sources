var s3dm = {};
s3dm.downbar = {};
s3dm.downbar.box = null;
s3dm.downbar.box_id = 's3downbar-ibmbeeacmbeeaebmfjpmnlgkhoejinha';
s3dm.downbar.is_popup = true;
s3dm.downbar.download_list = {};
s3dm.downbar.undo_view_list = [];
s3dm.downbar.download_listbox = null;
s3dm.downbar.zoom_index = 1;
s3dm.downbar.style_version = 0;

s3dm.downbar.download_template = null;
s3dm.downbar.download_template_tooltip = null;
s3dm.downbar.download_template_context_main = null;
s3dm.downbar.download_template_context_downloads = null;
s3dm.downbar.download_tooltip_box = null;

s3dm.downbar.current_tooltip_box = null;
s3dm.downbar.current_tooltip_timer = null;

//------------------------------------------------------------------------------
s3dm.init_0 = function() {
	s3dm.prefs.init(function(){
		setTimeout(function(){ s3dm.utils.i18n_parse(document); }, 100);
		s3dm.init();
	});
}
//------------------------------------------------------------------------------
s3dm.init = function() {
	s3dm.downbar.box = document.getElementById(s3dm.downbar.box_id);
	s3dm.downbar.style_version = s3dm.utils.prefs_get('style.version');
	//------------------------------------------------------------------------
	s3dm.downbar.box.addEventListener("contextmenu", function(e){
		if (! s3dm.utils.check_click_tooltip(e.target)) {
			e.preventDefault();
			s3dm.contextmenu.create(e);
		}
	});
	//------------------------------------------------------------------------
	s3dm.downbar.get_download_template(function(){
		s3dm.init_run();
	});
}
//------------------------------------------------------------------------------
s3dm.init_run = function() {
	chrome.runtime.sendMessage({ 'action' : 'get_download_list' }, function(response) {
		if (response.prefs_not_init) {
			setTimeout(function(){ s3dm.init_run(); }, 1000);
			return;
		}
		s3dm.downbar.create_downbar_box();
		s3dm.downbar.create_download_bar(response.download_list);
		s3dm.downbar.undo_view_list = response.undo_view_list;
		chrome.runtime.onMessage.addListener(s3dm.viewer.onMessage);
	});
}
//------------------------------------------------------------------------------
s3dm.downbar.get_download_template = function(callback) {
	s3dm.utils.get_download_template(function(res){
		s3dm.downbar.download_template = res.download_template;
		s3dm.downbar.download_template_tooltip = res.download_template_tooltip;
		s3dm.downbar.download_template_context_main = res.download_template_context_main;
		s3dm.downbar.download_template_context_downloads = res.download_template_context_downloads;
		callback();
	});
}
//------------------------------------------------------------------------------
s3dm.downbar.create_downbar_box = function() {
	if (s3dm.downbar.box_created) {
		return true;
	}
	//------------------------------------------------------------------------
	document.getElementById('s3downbar_main_menu_button').addEventListener("click", function(e) {
		s3dm.contextmenu.create(e);
	}, true);

	//------------------------------------------------------------------------
	var clear_button = document.getElementById('s3downbar_clear_button');
	//------------------------------------------------------------------------
	clear_button.addEventListener("click", function(e) {
		s3dm.action.clear_button_click(e);
	}, true);
	//------------------------------------------------------------------------
	clear_button.addEventListener("auxclick", function(e) {
		s3dm.action.clear_button_click(e);
	}, true);

	//------------------------------------------------------------------------
	document.getElementById('s3downbar_holder_summary_progress').addEventListener("click", function(e) {
		s3dm.action.open_download_window();
	}, true);

	//------------------------------------------------------------------------
	document.getElementById('s3downbar_sort_button').addEventListener("click", function(e) {
		var sort_direction = (s3dm.utils.prefs_get("popup.sort_direction") == 'descending') ? 'ascending' : 'descending';
		s3dm.downbar.pref_save('popup.sort_direction', sort_direction);
	}, true);

	//------------------------------------------------------------------------
	s3dm.downbar.box_created = true;
	return true;
}
//------------------------------------------------------------------------------
s3dm.downbar.create_download_bar = function(download_list) {
	//------------------------------------------------------------------------
	s3dm.downbar.download_list = {};

	//------------------------------------------------------------------------
	var clear_button = document.getElementById('s3downbar_clear_button');
	var clear_button_text1 = s3dm.i18n.get_string('action.left_click.label') + ' ' + s3dm.i18n.get_string('action.remove_all.label');
	var clear_button_text2 = s3dm.i18n.get_string('action.right_click.label') + ' ' + s3dm.i18n.get_string('action.undo.label');
	clear_button.setAttribute('title', clear_button_text1 + "\n" + clear_button_text2);

	//------------------------------------------------------------------------
	document.getElementById('s3downbar_holder_summary_progress').setAttribute('title', s3dm.i18n.get_string('display.download_history.label'));

	//------------------------------------------------------------------------
	s3dm.downbar.download_tooltip_box = document.getElementById('download_data_listbox');
	s3dm.downbar.download_listbox = document.getElementById('s3downbar_download_data_listbox_scroll');
	//-----------------------------------------------------------------------
	while (s3dm.downbar.download_listbox.firstChild) {
		s3dm.downbar.download_listbox.removeChild(s3dm.downbar.download_listbox.firstChild);
	}

	//------------------------------------------------------------------------
	document.getElementById('s3downbar_sort_button').setAttribute('sort_direction', s3dm.utils.prefs_get("popup.sort_direction"));

	//------------------------------------------------------------------------
	s3dm.downbar.set_styles_buttons();
	s3dm.viewer.set_styles_downloads(s3dm.downbar.download_template);

	//------------------------------------------------------------------------
	s3dm.viewer.create_download_list(download_list);
}
//------------------------------------------------------------------------------
s3dm.downbar.set_styles_buttons = function() {
	//------------------------------------------------------------------------
	var s3downbar_main_menu_button = document.getElementById('s3downbar_main_menu_button');
	var s3downbar_clear_button = document.getElementById('s3downbar_clear_button');
	var s3downbar_holder_summary_progress = document.getElementById('s3downbar_holder_summary_progress');

	//------------------------------------------------------------------------
	if (! s3dm.utils.prefs_get("style.default")) {
		// Read custom prefs
		var downbar_color = s3dm.utils.prefs_get("style.downbar_color");
		var button_text_size = s3dm.utils.prefs_get("style.button_text_size");
		var button_text_color = s3dm.utils.prefs_get("style.button_text_color");

		// Set styles to the new style - automatically overrides the class css rules
		s3dm.utils.set_element_style(s3dm.downbar.box, 'background-color: ' + downbar_color);
		s3dm.utils.set_element_style(s3downbar_main_menu_button, 'background-color: ' + downbar_color);
		s3dm.utils.set_element_style(s3downbar_clear_button, 'background-color: ' + downbar_color);

		s3dm.utils.set_element_style(s3downbar_main_menu_button, 'font-size: ' + button_text_size + 'pt');
		s3dm.utils.set_element_style(s3downbar_clear_button, 'font-size: ' + button_text_size + 'pt');
		s3dm.utils.set_element_style(s3downbar_holder_summary_progress, 'font-size: ' + button_text_size + 'pt');

		s3dm.utils.set_element_style(s3downbar_main_menu_button, 'color: ' + button_text_color);
		s3dm.utils.set_element_style(s3downbar_clear_button, 'color: ' + button_text_color);
		s3dm.utils.set_element_style(s3downbar_holder_summary_progress, 'color: ' + button_text_color);

		//------------------------------------------------------------------
		var hbox_width = s3dm.utils.prefs_get("style.hbox_width")
		if (hbox_width < 200) {
			hbox_width = 200;
		}
		s3dm.utils.set_element_style(s3dm.downbar.box, 'min-width: ' + hbox_width + 'px;max-width: ' + hbox_width + 'px');

		//------------------------------------------------------------------
		setTimeout(function(){
			if (s3dm.downbar.box.scrollWidth > s3dm.downbar.box.offsetWidth) {
				var width = s3dm.downbar.box.scrollWidth;
				s3dm.utils.set_element_style(s3dm.downbar.box, 'min-width: ' + width + 'px; max-width: ' + width + 'px;');
			}
		}, 100);
	}
}
//------------------------------------------------------------------------------
s3dm.downbar.pref_save = function(pref_name, pref_value, callback) {
	chrome.runtime.sendMessage({ 'action_prefs_set': true, 'pref_name' : pref_name, 'pref_value': pref_value }, function(response) {
		if (callback) {
			callback();
		}
	});
	s3dm.utils.prefs_set(pref_name, pref_value);
}
//------------------------------------------------------------------------------
window.addEventListener("load", s3dm.init_0);
