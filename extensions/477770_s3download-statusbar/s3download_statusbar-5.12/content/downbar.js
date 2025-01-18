s3dm.downbar = {};

s3dm.downbar.box = null;
s3dm.downbar.box_id = 's3downbar-ibmbeeacmbeeaebmfjpmnlgkhoejinha';
s3dm.downbar.download_list = {};
s3dm.downbar.undo_view_list = [];
s3dm.downbar.download_listbox = null;
s3dm.downbar.style_version = 0;

s3dm.downbar.download_template = null;
s3dm.downbar.download_template_tooltip = null;
s3dm.downbar.download_template_context_main = null;
s3dm.downbar.download_template_context_downloads = null;
s3dm.downbar.download_tooltip_box = null;
s3dm.downbar.zoom_index = 1;
s3dm.downbar.body_margin = null;

s3dm.downbar.is_position = 'bottom';
s3dm.downbar.current_tooltip_box = null;
s3dm.downbar.current_tooltip_timer = null;

s3dm.downbar.resize_data = null;
s3dm.downbar.resize_pane = null;

s3dm.downbar.fontColor = '#222222';
s3dm.downbar.borderColor = '#999999';
s3dm.downbar.backgroundColor = "#EEEEEE";
s3dm.downbar.backgroundColor_hover = "#C8C8C8";
s3dm.downbar.lib_list = ['utils', 'viewer', 'contextmenu', 'action', 'hotkeys', 'prefs', 'i18n' ];

//------------------------------------------------------------------------------
s3dm.downbar.init_0 = function(init_count) {
	if (! document.body) {
		init_count--;
		if (init_count > 0) {
			setTimeout(function(){ s3dm.downbar.init_0(init_count); }, 500);
			return;
		}
	}
	//------------------------------------------------------------------------
	var lib_list = s3dm.downbar.lib_list;
	var lib_load_ok = true;
	//------------------------------------------------------------------------
	for (var i=0; i<lib_list.length; i++) {
		if (! s3dm[lib_list[i]]) {
			lib_load_ok = false;
			break;
		}
	}
	//------------------------------------------------------------------------
	if (! lib_load_ok) {
		init_count--;
		if (init_count > 0) {
			setTimeout(function(){ s3dm.downbar.init_0(init_count); }, 50);
		}
		return;
	}
	//------------------------------------------------------------------------
	try {
		chrome.runtime.onMessage.removeListener(s3dm.viewer.onMessage);
	} catch(e) {
	}

	s3dm.prefs.init(function(){
		s3dm.downbar.init();
		s3dm.hotkeys.init();
		chrome.runtime.onMessage.addListener(s3dm.viewer.onMessage);
	});
}
//------------------------------------------------------------------------------
s3dm.downbar.init = function() {
	s3dm.downbar.get_download_template(function(){
		s3dm.downbar.init_run();
	});
	s3dm.downbar.style_version = s3dm.utils.prefs_get('style.version');

	s3dm.downbar.set_downbar_style('/skin/s3downbar.css');
	s3dm.downbar.set_downbar_style('/skin/contextmenu.css');
	s3dm.downbar.set_downbar_style('/skin/tooltip.css');

	//------------------------------------------------------------------------
	document.documentElement.addEventListener("mouseup", function(e) {
		s3dm.downbar.resize_data = null;
	}, true);
	//------------------------------------------------------------------------
	document.documentElement.addEventListener("mousemove", function(e) {
		s3dm.downbar.resize_begin(e);
	}, true);
}
//------------------------------------------------------------------------------
s3dm.downbar.init_run = function() {
	chrome.runtime.sendMessage({ 'action' : 'get_zoom_tab' }, function(response) {
		if (s3dm.downbar.create_downbar_box()) {
			chrome.runtime.sendMessage({ 'action' : 'get_download_list' }, function(response) {
				if (response.prefs_not_init) {
					setTimeout(function(){ s3dm.downbar.init_run(); }, 1000);
					return;
				}
				s3dm.downbar.create_download_bar(response.download_list);
				s3dm.downbar.undo_view_list = response.undo_view_list;
			});
		}
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
	//------------------------------------------------------------------------
	if (! s3dm.downbar.box) {
		s3dm.downbar.box = document.getElementById(s3dm.downbar.box_id);
	}
	//------------------------------------------------------------------------
	if (s3dm.downbar.box) {
		try {
			s3dm.downbar.box.parentNode.removeChild(s3dm.downbar.box);
		} catch(e) {
		}
	}
	//------------------------------------------------------------------------
	var downbar_show = s3dm.utils.prefs_get('downbar_show');
	if (downbar_show) {
		var exclude_links = s3dm.utils.prefs_get('downbar_exclude_links');
		var link = new String(document.location);
		for (var i=0; i<exclude_links.length; i++) {
			var exclude = exclude_links[i].replace(/\s/g, '');
			if (/\*$/.test(exclude)) {
				exclude = exclude.replace(/\*+$/, '');
				if (link.indexOf(exclude) == 0) {
					downbar_show = false;
				}
			} else if (link == exclude) {
				downbar_show = false;
			}
		}
	}
	if (! downbar_show) {
		return false;
	}

	//------------------------------------------------------------------------
	s3dm.downbar.box = document.createElement('div');
	s3dm.downbar.box.id = s3dm.downbar.box_id;
	try {
		s3dm.utils.reset_style(s3dm.downbar.box);
	} catch(e) {
		return false;
	}
	//------------------------------------------------------------------------
	document.body.appendChild(s3dm.downbar.box);
	s3dm.downbar.set_body_margin();
	s3dm.downbar.is_position = s3dm.utils.prefs_get('downbar_position');
	//------------------------------------------------------------------------
	s3dm.downbar.set_print_style();
	s3dm.downbar.box.style.position = "fixed";
	s3dm.downbar.box.style.whiteSpace = "nowrap";
	s3dm.downbar.box.style.width = "100%";
	s3dm.downbar.box.style.left = "0px";
	//------------------------------------------------------------------------
	if (s3dm.downbar.is_position == 'top') {
		s3dm.downbar.box.style.top = "0px";
		s3dm.downbar.box.style.borderBottom = "1px " + s3dm.downbar.borderColor + " solid";
		s3dm.downbar.box.style.transformOrigin = 'top left';
	}
	else {
		s3dm.downbar.box.style.bottom = "0px";
		s3dm.downbar.box.style.borderTop = "1px " + s3dm.downbar.borderColor + " solid";
		s3dm.downbar.box.style.transformOrigin = 'bottom left';
	}
	//------------------------------------------------------------------------
	s3dm.downbar.box.style.zIndex = "9999999998";
	s3dm.downbar.box.style.margin = "0";
	s3dm.downbar.box.style.padding = "2px 0px";
	s3dm.downbar.box.style.backgroundColor = s3dm.downbar.backgroundColor;
	s3dm.downbar.box.style.color = s3dm.downbar.fontColor;
	s3dm.downbar.box.style.display = "flex";

	//------------------------------------------------------------------------
	s3dm.downbar.box.addEventListener("contextmenu", function(e){
		if (! s3dm.utils.check_click_tooltip(e.target)) {
			e.preventDefault();
			s3dm.contextmenu.create(e);
		}
	});
	//------------------------------------------------------------------------
	s3dm.downbar.box.addEventListener("mousedown", function(event) {
		if (event.button == 1) {
			event.preventDefault();
			event.stopPropagation();
		}
	}, true);
	//------------------------------------------------------------------------
	s3dm.downbar.set_zoom(s3dm.downbar.zoom_index);
	s3dm.viewer.hide_downbar(s3dm.utils.prefs_get('downbar_is_collapsed'));
	//------------------------------------------------------------------------
	return true;
}
//------------------------------------------------------------------------------
s3dm.downbar.set_zoom = function(zoom_index) {
	s3dm.downbar.zoom_index = zoom_index;
	try {
		s3dm.utils.set_element_style(s3dm.downbar.box, 'transform: scale(' + 1/ zoom_index + ')');
		s3dm.utils.set_element_style(s3dm.downbar.box, 'width: ' + Math.round(100*zoom_index) + '%');
	} catch(e) {
	}
}
//------------------------------------------------------------------------------
s3dm.downbar.set_body_margin = function() {
	if (! s3dm.downbar.box) { return; }
	//--------------------------------------------------------------------------
	var is_scroll_bottom = (((document.documentElement.scrollHeight - window.innerHeight) == window.scrollY) && (window.scrollY > 0)) ? true : false;
	var panel_bottom = s3dm.downbar.box.clientHeight;
	//--------------------------------------------------------------------------
	if (s3dm.utils.check_isPDF()) {
		s3dm.downbar.doc_style_height = 'none';
		s3dm.downbar.body_margin = 0;
	}
	//--------------------------------------------------------------------------
	if (! s3dm.downbar.doc_style_height) {
		try {
			var doc_style = document.defaultView.getComputedStyle(document.documentElement, "");
			if (doc_style) {
				var old_style = document.documentElement.style.display;
				var scrollX = window.scrollX;
				var scrollY = window.scrollY;
				document.documentElement.style.display = 'none';
				s3dm.downbar.doc_style_height = doc_style.getPropertyValue('min-height') || '';
				if (s3dm.downbar.doc_style_height == '0px') {
					s3dm.downbar.doc_style_height = 'auto';
				}
				document.documentElement.style.display = old_style;
				window.scrollTo(scrollX, scrollY);
			} else {
				s3dm.downbar.doc_style_height = 'none';
			}
		} catch(e) {
			s3dm.downbar.doc_style_height = 'none';
		}
	}
	//------------------------------------------------------------------------
	if (s3dm.downbar.body_margin == null) {
		try {
			var node_style = document.defaultView.getComputedStyle(document.body, "");
			if (node_style) {
				if (s3dm.downbar.is_position == 'top') {
					s3dm.downbar.body_margin = parseInt(node_style.getPropertyValue('margin-top') || 0);
				} else {
					s3dm.downbar.body_margin = parseInt(node_style.getPropertyValue('margin-bottom') || 0);
				}
			} else {
				s3dm.downbar.body_margin = 0;
			}
		} catch(e) {
			s3dm.downbar.body_margin = 0;
		}
	}
	//--------------------------------------------------------------------------
	if ((s3dm.downbar.doc_style_height == 'auto')) {
		if (s3dm.downbar.is_position == 'top') {
			s3dm.utils.set_element_style(document.body, 'margin-top: ' + (s3dm.downbar.body_margin + panel_bottom) + 'px');
		} else {
			s3dm.utils.set_element_style(document.body, 'margin-bottom: ' + (s3dm.downbar.body_margin + panel_bottom) + 'px');
			if (is_scroll_bottom && (panel_bottom > 0)) {
				window.scrollTo(window.scrollX, document.documentElement.scrollHeight);
			}
		}
	}
}
//------------------------------------------------------------------------------
s3dm.downbar.set_downbar_style = function(css_file) {
	var style_downbar = document.createElement('link');
	style_downbar.setAttribute('rel', 'stylesheet');
	style_downbar.setAttribute('type', 'text/css');
	//------------------------------------------------------------------------
	// googleapis - for blocker-workaround  :)
	// example: https://rozetka.com.ua/blocker.js
	//------------------------------------------------------------------------
	style_downbar.href = chrome.extension.getURL(css_file + '?googleapis');
	document.body.appendChild(style_downbar);
}
//------------------------------------------------------------------------------
s3dm.downbar.set_print_style = function() {
	var style_print = document.createElement('style');
	style_print.setAttribute('type', 'text/css');
	style_print.setAttribute('media', 'print');
	style_print.appendChild(document.createTextNode('#' + s3dm.downbar.box_id + ' { display: none !important; }'));
	s3dm.downbar.box.appendChild(style_print);
}
//------------------------------------------------------------------------------
s3dm.downbar.create_download_bar = function(download_list) {
	while (s3dm.downbar.box.firstChild) {
		s3dm.downbar.box.removeChild(s3dm.downbar.box.firstChild);
	}

	//------------------------------------------------------------------------
	s3dm.downbar.download_list = {};
	s3dm.downbar.set_print_style();

	//------------------------------------------------------------------------
	var resize_pane = document.createElement('div');
	s3dm.utils.reset_style(resize_pane);
	resize_pane.id = 's3downbar_resize_pane';
	s3dm.downbar.box.appendChild(resize_pane);
	s3dm.downbar.resize_pane = resize_pane;
	resize_pane.setAttribute('is_top', (s3dm.downbar.is_position == 'top') ? true : false);
	//------------------------------------------------------------------------
	s3dm.downbar.tooltip_create(s3dm.downbar.tooltip_init(), s3dm.downbar.resize_pane, function(){
		s3dm.downbar.resize_pane.is_created = false;
		s3dm.downbar.resize_title();
	});
	s3dm.utils.set_element_style(resize_pane, 'position: absolute');
	//------------------------------------------------------------------------
	resize_pane.addEventListener("mousedown", function(event) {
		s3dm.downbar.resize_data = {
			start_y: event.pageY,
			start_height : s3dm.downbar.download_listbox.clientHeight+2
		};
	}, true);

	//------------------------------------------------------------------------
	//------------------------------------------------------------------------
	var hide_button = document.createElement('div');
	s3dm.downbar.set_box_style(hide_button);
	hide_button.id = 's3downbar_hide_button';
	var hide_button_img = document.createElement('div');
	hide_button_img.id = 's3downbar_hide_button_img';
	s3dm.utils.reset_style(hide_button_img);
	hide_button_img.style.setProperty("background-image", "url(" + chrome.extension.getURL('/skin/s3dm_icons.png') + ")", "important");
	hide_button_img.style.setProperty("display", "inline-block", "important");
	hide_button.appendChild(hide_button_img);
	s3dm.downbar.box.appendChild(hide_button);
	s3dm.downbar.tooltip_create(s3dm.downbar.tooltip_init(), hide_button);
	s3dm.downbar.tooltip_content(hide_button.tooltip_box, 'hide_button');
	//------------------------------------------------------------------------
	hide_button.addEventListener("click", function(e) {
		s3dm.viewer.toggle_downbar(true);
	}, true);

	//------------------------------------------------------------------------
	var main_menu_button = document.createElement('div');
	s3dm.downbar.set_box_style(main_menu_button);
	main_menu_button.id = 's3downbar_main_menu_button';
	//------------------------------------------------------------------------
	main_menu_button.addEventListener("click", function(e) {
		s3dm.contextmenu.create(e);
	}, true);

	//------------------------------------------------------------------------
	var main_menu_button_img = document.createElement('img');
	s3dm.utils.reset_style(main_menu_button_img);
	main_menu_button_img.src = chrome.extension.getURL('/skin/logo16.png');
	main_menu_button.appendChild(main_menu_button_img);
	//------------------------------------------------------------------------
	var main_menu_button_txt = document.createElement('span');
	s3dm.utils.reset_style(main_menu_button_txt);
	main_menu_button.appendChild(main_menu_button_txt);
	s3dm.utils.HTMLDOM_value(main_menu_button_txt, s3dm.i18n.get_string('display.downloads_title.label'));
	s3dm.downbar.box.appendChild(main_menu_button);
	s3dm.downbar.tooltip_create(s3dm.downbar.tooltip_init(), main_menu_button);
	s3dm.downbar.tooltip_content(main_menu_button.tooltip_box, 'text', s3dm.i18n.get_string('extension_name'));

	//------------------------------------------------------------------------
	var clear_button = document.createElement('div');
	s3dm.downbar.set_box_style(clear_button);
	clear_button.id = 's3downbar_clear_button';
	s3dm.utils.HTMLDOM_value(clear_button, s3dm.i18n.get_string('action.clear.label'));
	s3dm.downbar.box.appendChild(clear_button);
	s3dm.downbar.tooltip_create(s3dm.downbar.tooltip_init(), clear_button);
	s3dm.downbar.tooltip_content(clear_button.tooltip_box, 'clear_button');
	//------------------------------------------------------------------------
	clear_button.addEventListener("click", function(e) {
		s3dm.action.clear_button_click(e);
	}, true);
	//------------------------------------------------------------------------
	clear_button.addEventListener("auxclick", function(e) {
		s3dm.action.clear_button_click(e);
	}, true);

	//------------------------------------------------------------------------
	var holder_summary_progress = document.createElement('div');
	s3dm.downbar.set_box_style(holder_summary_progress);
	holder_summary_progress.id = 's3downbar_holder_summary_progress';
	//------------------------------------------------------------------------
	var holder_summary_progress_txt = document.createElement('div');
	s3dm.utils.reset_style(holder_summary_progress_txt);
	holder_summary_progress.appendChild(holder_summary_progress_txt);
	s3dm.downbar.box.appendChild(holder_summary_progress);
	s3dm.downbar.tooltip_create(s3dm.downbar.tooltip_init(), holder_summary_progress);
	s3dm.downbar.tooltip_content(holder_summary_progress.tooltip_box, 'text', s3dm.i18n.get_string('display.download_history.label'));
	//------------------------------------------------------------------------
	holder_summary_progress.addEventListener("click", function(e) {
		s3dm.action.open_download_window();
	}, true);

	//------------------------------------------------------------------------
	var download_data_listbox = document.createElement('div');
	s3dm.utils.reset_style(download_data_listbox);
	download_data_listbox.id = 's3downbar_download_data_listbox';
	s3dm.downbar.box.appendChild(download_data_listbox);
	s3dm.downbar.download_tooltip_box = download_data_listbox;
	//------------------------------------------------------------------------
	download_data_listbox.addEventListener("dblclick", function(e) {
		s3dm.action.dblclick_clear_panel(e);
	}, true);

	//------------------------------------------------------------------------
	var download_data_listbox_scroll = document.createElement('div');
	s3dm.utils.reset_style(download_data_listbox_scroll);
	download_data_listbox_scroll.id = 's3downbar_download_data_listbox_scroll';
	download_data_listbox.appendChild(download_data_listbox_scroll);
	s3dm.downbar.download_listbox = download_data_listbox_scroll;

	//------------------------------------------------------------------------
	var download_data_list_empty = document.createElement('div');
	s3dm.utils.reset_style(download_data_list_empty);
	download_data_list_empty.id = 's3downbar_download_data_list_empty';
	download_data_listbox_scroll.appendChild(download_data_list_empty);
	s3dm.utils.HTMLDOM_value(download_data_list_empty, s3dm.i18n.get_string('display.download_list_empty.label'));

	//------------------------------------------------------------------------
	s3dm.downbar.set_styles_buttons();
	s3dm.viewer.set_styles_downloads(s3dm.downbar.download_template);

	//------------------------------------------------------------------------
	s3dm.viewer.create_download_list(download_list);
	s3dm.downbar.set_body_margin();
}
//------------------------------------------------------------------------------
s3dm.downbar.set_styles_buttons = function() {
	var styleDefault = s3dm.utils.prefs_get("style.default");
	var showMainButton = s3dm.utils.prefs_get("display.mainButton");
	var showClearButton = s3dm.utils.prefs_get("display.clearButton");
	var showHideButton = s3dm.utils.prefs_get("display.hideButton");
	var showHolderSummaryProgress = s3dm.utils.prefs_get("display.summaryProgress");

	//------------------------------------------------------------------------
	var s3downbar_main_menu_button = document.getElementById('s3downbar_main_menu_button');
	s3downbar_main_menu_button.setAttribute('is_hidden', ! showMainButton);

	//------------------------------------------------------------------------
	var s3downbar_clear_button = document.getElementById('s3downbar_clear_button');
	s3downbar_clear_button.setAttribute('is_hidden', ! showClearButton);

	//------------------------------------------------------------------------
	var s3downbar_hide_button = document.getElementById('s3downbar_hide_button');
	s3downbar_hide_button.setAttribute('is_hidden', ! showHideButton);

	//------------------------------------------------------------------------
	var s3downbar_holder_summary_progress = document.getElementById('s3downbar_holder_summary_progress');
	s3downbar_holder_summary_progress.setAttribute('is_hidden', ! showHolderSummaryProgress);

	//------------------------------------------------------------------------
	if (! s3dm.utils.prefs_get("display.hideButtonFromLeft")) {
		s3dm.utils.set_element_style(s3downbar_hide_button, 'order: 4');
	}
	//------------------------------------------------------------------------
	if (! s3dm.utils.prefs_get("display.mainButtonFromLeft")) {
		s3dm.utils.set_element_style(s3downbar_main_menu_button, 'order: 3');
	}
	//------------------------------------------------------------------------
	if (! s3dm.utils.prefs_get("display.clearButtonFromLeft")) {
		s3dm.utils.set_element_style(s3downbar_clear_button, 'order: 2');
	}
	//------------------------------------------------------------------------
	if (! s3dm.utils.prefs_get("display.summaryProgressFromLeft")) {
		s3dm.utils.set_element_style(s3downbar_holder_summary_progress, 'order: 1');
	}

	//------------------------------------------------------------------------
	if (! styleDefault) {
		// Read custom prefs
		var downbar_color = s3dm.utils.prefs_get("style.downbar_color");
		var button_text_size = s3dm.utils.prefs_get("style.button_text_size");
		var button_text_color = s3dm.utils.prefs_get("style.button_text_color");

		s3dm.utils.set_element_style(s3dm.downbar.box, 'background-color: ' + downbar_color);
		s3dm.utils.set_element_style(s3downbar_main_menu_button, 'background-color: ' + downbar_color);
		s3dm.utils.set_element_style(s3downbar_clear_button, 'background-color: ' + downbar_color);

		s3dm.utils.set_element_style(s3downbar_main_menu_button, 'font-size: ' + button_text_size + 'pt');
		s3dm.utils.set_element_style(s3downbar_clear_button, 'font-size: ' + button_text_size + 'pt');
		s3dm.utils.set_element_style(s3downbar_holder_summary_progress, 'font-size: ' + button_text_size + 'pt');

		s3dm.utils.set_element_style(s3downbar_main_menu_button, 'color: ' + button_text_color);
		s3dm.utils.set_element_style(s3downbar_clear_button, 'color: ' + button_text_color);
		s3dm.utils.set_element_style(s3downbar_holder_summary_progress, 'color: ' + button_text_color);
	}
	//------------------------------------------------------------------------
//	s3dm.utils.set_element_style(s3dm.downbar.download_listbox, 'min-height: ' + s3dm.utils.prefs_get("style.downbar_height") + 'px');
	s3dm.utils.set_element_style(s3dm.downbar.download_listbox, 'max-height: ' + s3dm.utils.prefs_get("style.downbar_height") + 'px');
}
//------------------------------------------------------------------------------
s3dm.downbar.resize_begin = function(event) {
	//------------------------------------------------------------------------
	if (! s3dm.downbar.resize_data) { return; }

	//------------------------------------------------------------------------
	var downbar_height = 0;
	if (s3dm.downbar.is_position == 'top') {
		downbar_height = s3dm.downbar.resize_data.start_height + (event.pageY - s3dm.downbar.resize_data.start_y);
	} else {
		downbar_height = s3dm.downbar.resize_data.start_height + (s3dm.downbar.resize_data.start_y - event.pageY);
	}
	//------------------------------------------------------------------------
	if (downbar_height < 20) {
		downbar_height = 20;
	} else if (downbar_height > s3dm.downbar.download_listbox.scrollHeight+2) {
		downbar_height = s3dm.downbar.download_listbox.scrollHeight+2;
	}

	//------------------------------------------------------------------------
//	s3dm.utils.set_element_style(s3dm.downbar.download_listbox, 'min-height: ' + downbar_height + 'px');
	s3dm.utils.set_element_style(s3dm.downbar.download_listbox, 'max-height: ' + downbar_height + 'px');
	s3dm.utils.prefs_set("style.downbar_height", downbar_height)
	s3dm.downbar.pref_save("style.downbar_height", downbar_height);
	s3dm.downbar.resize_title();
}
//------------------------------------------------------------------------------
s3dm.downbar.resize_title = function() {
	var downbar_height = s3dm.utils.prefs_get("style.downbar_height");
	var max_height = s3dm.downbar.download_listbox.scrollHeight+2;

	if (downbar_height > max_height) {
		downbar_height = max_height;
	}
	s3dm.downbar.tooltip_content(s3dm.downbar.resize_pane.tooltip_box, 'text', s3dm.i18n.get_string('display.download_bar_height').replace('%CURRENT%', downbar_height).replace('%MAX%', max_height));
}
//------------------------------------------------------------------------------
s3dm.downbar.tooltip_init = function() {
	var tooltip_box = document.createElement('div');
	var tooltip_arrow = document.createElement('div');
	s3dm.utils.reset_style(tooltip_box);
	s3dm.utils.reset_style(tooltip_arrow);

	tooltip_box.className = 'tooltip_box';
	tooltip_arrow.className = 'tooltip_arrow';

	if (s3dm.downbar.is_position == 'top') {
		tooltip_box.setAttribute('is_top', true);
		tooltip_arrow.setAttribute('is_top', true);
	} else {
		tooltip_box.setAttribute('is_top', false);
		tooltip_arrow.setAttribute('is_top', false);
	}

	return { 'box' : tooltip_box, 'arrow' : tooltip_arrow };
}
//------------------------------------------------------------------------------
s3dm.downbar.tooltip_create = function(tooltip, box, func, box_place) {
	box.tooltip_box = tooltip.box;
	box.tooltip_arrow = tooltip.arrow;
	//------------------------------------------------------------------------
	if (box_place) {
		box.tooltip_box_place = box_place;
		box.tooltip_is_hidden = true;
		box_place.appendChild(tooltip.box);
		box_place.appendChild(tooltip.arrow);
		box_place.style.setProperty("position", "fixed", "important");
		box_place.style.setProperty("z-index", "50", "important");
		box.addEventListener("mouseout", function(e){
			if (box.tooltip_box.timeout) {
				try {
					clearTimeout(box.tooltip_box.timeout);
				} catch(e){};
			}
			box.tooltip_is_hidden = true;
			box.tooltip_box.timeout = setTimeout(function(){ s3dm.downbar.tooltip_hide(box); }, 250);
		});
	}
	//------------------------------------------------------------------------
	else {
		box.appendChild(tooltip.box);
		box.appendChild(tooltip.arrow);
		box.style.setProperty("position", "relative", "important");
		box.addEventListener("mouseout", function(e){ s3dm.downbar.tooltip_hide(this); });
	}
	//------------------------------------------------------------------------
	box.addEventListener("mouseover", function(e){
		var mbox = this;
		mbox.tooltip_is_hidden = false;
		if (func) {
			if (! mbox.is_created) {
				mbox.is_created = true;
				func(mbox);
			}
		}
		if (mbox.tooltip_box_place) {
			if (s3dm.downbar.current_tooltip_timer) {
				try {
					clearTimeout(s3dm.downbar.current_tooltip_timer);
				} catch(e){};
			}
			//------------------------------------------------------------
			if (! s3dm.utils.prefs_get('function.showTooltip')) {
				return;
			}
			//------------------------------------------------------------
			if (s3dm.downbar.current_tooltip_box && (s3dm.downbar.current_tooltip_box == mbox)) {
				s3dm.downbar.tooltip_show(mbox);
			}
			//------------------------------------------------------------
			else {
				s3dm.downbar.current_tooltip_timer = setTimeout(function(){
					if (! mbox.tooltip_is_hidden) {
						s3dm.downbar.tooltip_show(mbox); 
					}
				}, 100);
			}
		} else {
			s3dm.downbar.tooltip_show(mbox);
		}
	});
}
//------------------------------------------------------------------------------
s3dm.downbar.tooltip_content = function(tooltip_box, tooltip_type, tooltip_data) {
	var styleDefault = s3dm.utils.prefs_get("style.default");
	//------------------------------------------------------------------------
	if (! styleDefault) {
		var tooltipTextSize = s3dm.utils.prefs_get("style.tooltipFontSize");
		s3dm.utils.set_element_style(tooltip_box, 'font-size:' + tooltipTextSize + 'pt');
	}
	//------------------------------------------------------------------------
	if (tooltip_type == 'clear_button') {
		s3dm.downbar.tooltip_content_clear_button(tooltip_box);
	} else if (tooltip_type == 'hide_button') {
		s3dm.downbar.tooltip_content_hide_button(tooltip_box);
	} else if (tooltip_type == 'downloads') {
		s3dm.downbar.tooltip_content_downloads(tooltip_box);
	} else if (tooltip_type == 'text') {
		while (tooltip_box.firstChild) {
			tooltip_box.removeChild(tooltip_box.firstChild);
		}
		var text = document.createElement('div');
		s3dm.utils.reset_style(text);
		s3dm.utils.HTMLDOM_value(text, tooltip_data);
		text.className = 'tooltipText';
		tooltip_box.appendChild(text);
	}
}
//------------------------------------------------------------------------------
s3dm.downbar.tooltip_content_clear_button = function(tooltip_box) {
	var text1 = document.createElement('div');
	s3dm.utils.reset_style(text1);
	s3dm.utils.HTMLDOM_value(text1, s3dm.i18n.get_string('action.left_click.label') + ' ' + s3dm.i18n.get_string('action.remove_all.label'));
	text1.className = 'tooltipText';
	tooltip_box.appendChild(text1);

	var text2 = document.createElement('div');
	s3dm.utils.reset_style(text2);
	s3dm.utils.HTMLDOM_value(text2, s3dm.i18n.get_string('action.right_click.label') + ' ' + s3dm.i18n.get_string('action.undo.label'));
	text2.className = 'tooltipText';
	tooltip_box.appendChild(text2);
}
//------------------------------------------------------------------------------
s3dm.downbar.tooltip_content_hide_button = function(tooltip_box) {
	var text1 = document.createElement('div');
	s3dm.utils.reset_style(text1);
	s3dm.utils.HTMLDOM_value(text1, s3dm.i18n.get_string('action.downloadbar_hide.label'));
	text1.className = 'tooltipText';
	tooltip_box.appendChild(text1);

	var key_string = '';
	var hotkeys = s3dm.utils.prefs_get("hotkeys");
	for (var i=0; i<hotkeys.length; i++) {
		if (hotkeys[i].method == 'hide_downbar') {
			key_string = s3dm.downbar.hotkeys_string(hotkeys[i]);
			break;
		}
	}

	if (key_string) {
		var text2 = document.createElement('div');
		s3dm.utils.reset_style(text2);
		s3dm.utils.HTMLDOM_value(text2, s3dm.i18n.get_string('action.downloadbar_hide.hotkey').replace('%HOTKEY_VALUE%', key_string));
		text2.className = 'tooltipText';
		tooltip_box.appendChild(text2);
	}
}
//------------------------------------------------------------------------------
s3dm.downbar.hotkeys_string = function(key) {
	var str = [];

	if (key.ctrlKey) { str.push('Ctrl'); }
	if (key.altKey) { str.push('Alt'); }
	if (key.shiftKey) { str.push('Shift'); }

	if (key.key.length > 1) {
		str.push(key.key);
	}
	else if ((key.keyCode >= 32) && (key.keyCode < 127)) {
		str.push(String.fromCharCode(key.keyCode).toUpperCase());
	} 
	else if (key.key) {
		str.push(key.key.toUpperCase());
	}

	return str.join(' + ');
}
//------------------------------------------------------------------------------
s3dm.downbar.tooltip_content_downloads = function(tooltip_box) {
	var download_data_tooltip = s3dm.downbar.download_template_tooltip.cloneNode(true);
	tooltip_box.appendChild(download_data_tooltip);
}
//------------------------------------------------------------------------------
s3dm.downbar.tooltip_show = function(box) {
	if (box.image_preview_exists && ! box.image_preview_loaded) {
		box.image_preview_loaded = true;
		chrome.runtime.sendMessage({ 'action' : 'get_image_preview', 's3id' : box.id }, function(response) { });
	}

	//------------------------------------------------------------------------
	if (s3dm.downbar.current_tooltip_box && (s3dm.downbar.current_tooltip_box != box)) {
		s3dm.downbar.tooltip_hide(s3dm.downbar.current_tooltip_box);
	}
	//------------------------------------------------------------------------
	s3dm.downbar.current_tooltip_box = box;
	s3dm.contextmenu.destroy();

	box.tooltip_box.style.setProperty("display", "inline-block", "important");
	box.tooltip_arrow.style.setProperty("display", "inline-block", "important");

	if (box.tooltip_box_place) {
		box.tooltip_box_place.style.setProperty("width", box.offsetWidth + "px", "important");
		box.tooltip_box_place.style.setProperty("margin-top", (-1)*s3dm.downbar.download_listbox.scrollTop + "px", "important");
	}

	box.tooltip_box.style.width = '';
	var tooltip_box_width = box.tooltip_box.offsetWidth;
//	if (! box.tooltip_box.style.width) {
		box.tooltip_box.style.width = box.tooltip_box.clientWidth + 'px';
//	}

	box.tooltip_box.style.setProperty("margin-bottom", "10px", "important");
	box.tooltip_box.style.setProperty("transform", "scale(1)", "important");
	var box_height = box.tooltip_box.offsetHeight;

	if (box.tooltip_box.offsetWidth > (document.documentElement.clientWidth*s3dm.downbar.zoom_index - 5)) {
		var scale = (document.documentElement.clientWidth*s3dm.downbar.zoom_index - 10) / box.tooltip_box.offsetWidth;
		box.tooltip_box.style.setProperty("transform", 'scale( '+ scale +' )', "important");
		var margin_value = parseInt(((box_height * scale) - box_height) / 2 + 9);

		if (s3dm.downbar.is_position == 'top') {
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

	if (s3dm.downbar.is_position == 'top') {
		var box_rect = box.getBoundingClientRect();
		box.tooltip_box.style.setProperty("top", ((box_rect.bottom - box_rect.top)*s3dm.downbar.zoom_index-5)+'px', "important");
		box.tooltip_arrow.style.setProperty("top", ((box_rect.bottom - box_rect.top)*s3dm.downbar.zoom_index-5)+'px', "important");
	}

	box.tooltip_box.style.setProperty("opacity", "1", "important");
	box.tooltip_arrow.style.setProperty("opacity", "1", "important");

	if (! box.tooltip_box_place) {
//		box.style.setProperty("background-color", s3dm.downbar.backgroundColor_hover, "important");
	}

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
	if (! box.tooltip_box_place) {
//		box.style.backgroundColor = s3dm.downbar.backgroundColor;
//		box.style.setProperty("background-color", s3dm.downbar.backgroundColor, "important");
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
s3dm.downbar.set_box_style = function(box) {
	s3dm.utils.reset_style(box);
	box.className = 's3dmBox';
	box.style.setProperty ("color", s3dm.downbar.fontColor, "important");
}
//------------------------------------------------------------------------------
s3dm.downbar.window_open = function(url) {
	window.open(url, "_blank");
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
s3dm.downbar.init_0(60);
