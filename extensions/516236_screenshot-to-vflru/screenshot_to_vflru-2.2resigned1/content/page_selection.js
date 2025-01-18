//------------------------------------------------------------------------------
if (! window.vflscrsht) {
	window.vflscrsht = {};
}
//------------------------------------------------------------------------------
window.vflscrsht.selection = {
	BACKGROUND_DIV : "vflscrshtBackgroundDiv",
	DRAW_DIV : "vflscrshtDrawDiv",
	BOX_DIV : "vflscrshtBoxDiv",
	IDLE_IMAGE : "url('chrome://vflscrsht/skin/idle.png') 0 no-repeat",
	SNAP_IMAGE : "url('chrome://vflscrsht/skin/snap.png') 0 no-repeat",
	TOOL_TEXT : "Grab/Cancel",
	oldText : null,
	fast_selection : false,
	save_selection_timer : {},
	draw_type : '',
	originX : null,
	originY : null,
	mouseX : null,
	mouseY : null,
	offsetX : null,
	offsetY : null
};
//------------------------------------------------------------------------------
window.vflscrsht.selection.init = function() {
	chrome.runtime.sendMessage({ action_prefs_get : true }, function(response) {
		window.vflscrsht.selection.prefs = response.prefs_list;
		var string_list = {
			'selection.savePosition' : '',
			'selection.ok' : '',
			'selection.cancel' : '', 
			'selection.esc.exit' : '',
			'selection.fast_mode' : '',
			'selection.fast_mode.temp' : '',
			'selection.fast_mode.always' : '' 
		};
		chrome.runtime.sendMessage({ action_get_strings : true, 'string_list' : string_list }, function(response) {
			window.vflscrsht.selection.string_list = response.string_list;
			window.vflscrsht.selection.toggleDraw();
		});
	});
}
//------------------------------------------------------------------------------
window.vflscrsht.selection.toggleDraw = function() {
	if (window.vflscrsht.drawing) {
		window.vflscrsht.selection.disableDrawAndGrabIfRequired();
	} else {
		window.vflscrsht.selection.enableDraw();
	}
}
//------------------------------------------------------------------------------
window.vflscrsht.selection.insertHeaderElements = function() {
	var pageHead = document.getElementsByTagName("head")[0];
    
	if (pageHead == null) { // if page head doesn't exist, create one
		var pageBody = document.getElementsByTagName("html")[0];
		pageHead = document.createElement("head");
		pageBody.appendChild(pageHead);
		pageHead = document.getElementsByTagName("head")[0];
	}
    
	var cssCheck = document.getElementById("vflscrsht_css");
	if (cssCheck == null) { // insert stylesheet reference
		var css = document.createElement("link");
		css.setAttribute("id", "vflscrsht_css");
		css.setAttribute("rel", "stylesheet");
		css.setAttribute("type", "text/css");
		css.setAttribute("href", chrome.extension.getURL("/skin/selection.css"));
    
		pageHead.appendChild(css);
	}
}
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
window.vflscrsht.selection.beginBoxDraw = function(event) {
	window.vflscrsht.selection.fast_selection = window.vflscrsht.selection.fast_selection || event.shiftKey || event.ctrlKey;
	window.vflscrsht.selection.vflscrsht_bar_hint_hide();
	window.vflscrsht.selection.fastModeTextHide();

	var boxDiv = document.getElementById(window.vflscrsht.selection.BOX_DIV);
	if (boxDiv == null) {
		boxDiv = window.vflscrsht.selection.createBoxDraw();
	}

	boxDiv.style.left = event.pageX + "px";
	boxDiv.style.top = event.pageY + "px";

	window.vflscrsht.selection.originX = event.pageX;
	window.vflscrsht.selection.originY = event.pageY;

	window.vflscrsht.selection.mouseX = event.pageX;
	window.vflscrsht.selection.mouseY = event.pageY;

	window.vflscrsht.selection.draw_type = 'start';

	window.vflscrsht.selection.boxDrawing_left_right(event);
	window.vflscrsht.selection.boxDrawing_up_down(event);
	window.vflscrsht.selection.vflscrsht_bar_hint_hide();
	window.vflscrsht.selection.boxDrawing_text_size();
}
//------------------------------------------------------------------------------
window.vflscrsht.selection.restoreBoxDraw = function() {
	var boxDiv = document.getElementById(window.vflscrsht.selection.BOX_DIV);
	if (boxDiv == null) {
		boxDiv = window.vflscrsht.selection.createBoxDraw();
	}

	var startX = window.vflscrsht.selection.prefs['selection.startX'];
	var startY = window.vflscrsht.selection.prefs['selection.startY'];
	var selection_width = window.vflscrsht.selection.prefs['selection.width'];
	var selection_height = window.vflscrsht.selection.prefs['selection.height'];

	//-----------------------------------------------------------------------
	window.vflscrsht.selection.getClientSize();
	//-----------------------------------------------------------------------
	if ((startX + selection_width) > window.vflscrsht.selection.scrollWidth) {
		startX = 0;
	}
	if ((startY + selection_height) > window.vflscrsht.selection.scrollHeight) {
		startY = 0;
	}
	//-----------------------------------------------------------------------
	boxDiv.style.left = startX + "px";
	boxDiv.style.top = startY + "px";

	window.vflscrsht.selection.originX = startX;
	window.vflscrsht.selection.originY = startY;

//	window.vflscrsht.selection.winDoc.scrollTop = window.vflscrsht.selection.prefs['selection.scrollY'];
//	window.vflscrsht.selection.winDoc.scrollLeft = window.vflscrsht.selection.prefs['selection.scrollX'];
	window.scrollTo(window.vflscrsht.selection.prefs['selection.scrollX'], window.vflscrsht.selection.prefs['selection.scrollY']);

	window.vflscrsht.selection.boxDrawing_left_right({ 'pageX' : selection_width + startX, 'view' : window });
	window.vflscrsht.selection.boxDrawing_up_down({ 'pageY' : selection_height + startY, 'view' : window });
	window.vflscrsht.selection.vflscrsht_bar_hint_hide();
	window.vflscrsht.selection.boxDrawing_text_size();
}
//------------------------------------------------------------------------------
window.vflscrsht.selection.createBoxDraw = function() {
	var boxDiv = document.createElement("div");
	boxDiv.setAttribute("id", window.vflscrsht.selection.BOX_DIV);
	boxDiv.setAttribute("class", "boxOverlay");
	boxDiv.addEventListener("mousedown", window.vflscrsht.selection.boxDrawing_move, true);
	var body = document.getElementsByTagName("html")[0];
	body.appendChild(boxDiv);

	//-----------------------------------------------------------------------
	var bar_line = document.createElement("div");
	bar_line.id = 'vflscrshtBoxDiv_bar_line';
	boxDiv.appendChild(bar_line);

	if (! window.vflscrsht.selection.fast_selection) {
		var bar_line_savePosition = document.createElement("input");
		bar_line_savePosition.id = 'vflscrshtBoxDiv_bar_line_savePosition';
		bar_line_savePosition.setAttribute('type', 'checkbox');
		bar_line_savePosition.addEventListener("click", window.vflscrsht.selection.boxDrawing_savePosition, true);
		bar_line.appendChild(bar_line_savePosition);
		bar_line_savePosition.checked = window.vflscrsht.selection.prefs['selection.savePosition'];
		bar_line_savePosition.setAttribute('title', window.vflscrsht.selection.string_list['selection.savePosition']);
	}

	var bar_line_text_size = document.createElement("span");
	bar_line_text_size.id = 'vflscrshtBoxDiv_bar_line_text_size';
	bar_line.appendChild(bar_line_text_size);

	if (! window.vflscrsht.selection.fast_selection) {
		var bar_line_ok = document.createElement("div");
		bar_line_ok.id = 'vflscrshtBoxDiv_bar_line_ok';
		bar_line_ok.addEventListener("click", window.vflscrsht.selection.OnMouseUpHandlerThatHasToExistForSomeReason, true);
		bar_line.appendChild(bar_line_ok);
		bar_line_ok.setAttribute('title', window.vflscrsht.selection.string_list['selection.ok']);

		var bar_line_cancel = document.createElement("div");
		bar_line_cancel.id = 'vflscrshtBoxDiv_bar_line_cancel';
		bar_line_cancel.addEventListener("click", window.vflscrsht.selection.disableDraw, true);
		bar_line.appendChild(bar_line_cancel);
		bar_line_cancel.setAttribute('title', window.vflscrsht.selection.string_list['selection.cancel']);
	}

	//-----------------------------------------------------------------------
	var resize_up_line = document.createElement("div");
	resize_up_line.id = 'vflscrshtBoxDiv_up_line';
	resize_up_line.addEventListener("mousedown", window.vflscrsht.selection.boxDrawing_custom, true);
	boxDiv.appendChild(resize_up_line);
	
	var resize_down_line = document.createElement("div");
	resize_down_line.id = 'vflscrshtBoxDiv_down_line';
	resize_down_line.addEventListener("mousedown", window.vflscrsht.selection.boxDrawing_custom, true);
	boxDiv.appendChild(resize_down_line);
	
	var resize_left_line = document.createElement("div");
	resize_left_line.id = 'vflscrshtBoxDiv_left_line';
	resize_left_line.addEventListener("mousedown", window.vflscrsht.selection.boxDrawing_custom, true);
	boxDiv.appendChild(resize_left_line);
	
	var resize_right_line = document.createElement("div");
	resize_right_line.id = 'vflscrshtBoxDiv_right_line';
	resize_right_line.addEventListener("mousedown", window.vflscrsht.selection.boxDrawing_custom, true);
	boxDiv.appendChild(resize_right_line);
	
	var resize_up = document.createElement("div");
	resize_up.id = 'vflscrshtBoxDiv_up';
	resize_up.addEventListener("mousedown", window.vflscrsht.selection.boxDrawing_custom, true);
	boxDiv.appendChild(resize_up);
	
	var resize_up_left = document.createElement("div");
	resize_up_left.id = 'vflscrshtBoxDiv_up_left';
	resize_up_left.addEventListener("mousedown", window.vflscrsht.selection.boxDrawing_custom, true);
	boxDiv.appendChild(resize_up_left);
	
	var resize_up_right = document.createElement("div");
	resize_up_right.id = 'vflscrshtBoxDiv_up_right';
	resize_up_right.addEventListener("mousedown", window.vflscrsht.selection.boxDrawing_custom, true);
	boxDiv.appendChild(resize_up_right);
	
	var resize_left = document.createElement("div");
	resize_left.id = 'vflscrshtBoxDiv_left';
	resize_left.addEventListener("mousedown", window.vflscrsht.selection.boxDrawing_custom, true);
	boxDiv.appendChild(resize_left);
	
	var resize_right = document.createElement("div");
	resize_right.id = 'vflscrshtBoxDiv_right';
	resize_right.addEventListener("mousedown", window.vflscrsht.selection.boxDrawing_custom, true);
	boxDiv.appendChild(resize_right);
	
	var resize_down = document.createElement("div");
	resize_down.id = 'vflscrshtBoxDiv_down';
	resize_down.addEventListener("mousedown", window.vflscrsht.selection.boxDrawing_custom, true);
	boxDiv.appendChild(resize_down);
	
	var resize_down_left = document.createElement("div");
	resize_down_left.id = 'vflscrshtBoxDiv_down_left';
	resize_down_left.addEventListener("mousedown", window.vflscrsht.selection.boxDrawing_custom, true);
	boxDiv.appendChild(resize_down_left);
	
	var resize_down_right = document.createElement("div");
	resize_down_right.id = 'vflscrshtBoxDiv_down_right';
	resize_down_right.addEventListener("mousedown", window.vflscrsht.selection.boxDrawing_custom, true);
	boxDiv.appendChild(resize_down_right);

	return boxDiv;
}
//------------------------------------------------------------------------------
window.vflscrsht.selection.boxDrawing_move = function(event) {
	window.vflscrsht.selection.draw_type = 'move';
	window.vflscrsht.selection.originX = event.pageX;
	window.vflscrsht.selection.originY = event.pageY;
}
//------------------------------------------------------------------------------
window.vflscrsht.selection.boxDrawing_custom = function(event) {
	var resize_div = event.target;
	var boxDiv = document.getElementById(window.vflscrsht.selection.BOX_DIV);

	if (resize_div.id == 'vflscrshtBoxDiv_up_line') {
		window.vflscrsht.selection.draw_type = 'up_down';
		window.vflscrsht.selection.originY = boxDiv.top_box + boxDiv.height_box;
	}
	else if (resize_div.id == 'vflscrshtBoxDiv_down_line') {
		window.vflscrsht.selection.draw_type = 'up_down';
		window.vflscrsht.selection.originY = boxDiv.top_box;
	}
	else if (resize_div.id == 'vflscrshtBoxDiv_left_line') {
		window.vflscrsht.selection.draw_type = 'left_right';
		window.vflscrsht.selection.originX = boxDiv.left_box + boxDiv.width_box;
	}
	else if (resize_div.id == 'vflscrshtBoxDiv_right_line') {
		window.vflscrsht.selection.draw_type = 'left_right';
		window.vflscrsht.selection.originX = boxDiv.left_box;
	}
	else if (resize_div.id == 'vflscrshtBoxDiv_up') {
		window.vflscrsht.selection.draw_type = 'up_down';
		window.vflscrsht.selection.originY = boxDiv.top_box + boxDiv.height_box;
	}
	else if (resize_div.id == 'vflscrshtBoxDiv_up_left') {
		window.vflscrsht.selection.draw_type = 'both';
		window.vflscrsht.selection.originX = boxDiv.left_box + boxDiv.width_box;
		window.vflscrsht.selection.originY = boxDiv.top_box + boxDiv.height_box;
	}
	else if (resize_div.id == 'vflscrshtBoxDiv_up_right') {
		window.vflscrsht.selection.draw_type = 'both';
		window.vflscrsht.selection.originX = boxDiv.left_box;
		window.vflscrsht.selection.originY = boxDiv.top_box + boxDiv.height_box;
	}
	else if (resize_div.id == 'vflscrshtBoxDiv_left') {
		window.vflscrsht.selection.draw_type = 'left_right';
		window.vflscrsht.selection.originX = boxDiv.left_box + boxDiv.width_box;
	}
	else if (resize_div.id == 'vflscrshtBoxDiv_right') {
		window.vflscrsht.selection.draw_type = 'left_right';
		window.vflscrsht.selection.originX = boxDiv.left_box;
	}
	else if (resize_div.id == 'vflscrshtBoxDiv_down') {
		window.vflscrsht.selection.draw_type = 'up_down';
		window.vflscrsht.selection.originY = boxDiv.top_box;
	}
	else if (resize_div.id == 'vflscrshtBoxDiv_down_left') {
		window.vflscrsht.selection.draw_type = 'both';
		window.vflscrsht.selection.originX = boxDiv.left_box + boxDiv.width_box;
		window.vflscrsht.selection.originY = boxDiv.top_box;
	}
	else if (resize_div.id == 'vflscrshtBoxDiv_down_right') {
		window.vflscrsht.selection.draw_type = 'both';
		window.vflscrsht.selection.originX = boxDiv.left_box;
		window.vflscrsht.selection.originY = boxDiv.top_box;
	}
}
//------------------------------------------------------------------------------
window.vflscrsht.selection.boxDrawing = function(event) {
	if ((window.vflscrsht.selection.draw_type == 'both') || (window.vflscrsht.selection.draw_type == 'start')) {
		window.vflscrsht.selection.boxDrawing_up_down(event);
		window.vflscrsht.selection.boxDrawing_left_right(event);
	}
	else if (window.vflscrsht.selection.draw_type == 'up_down') {
		window.vflscrsht.selection.boxDrawing_up_down(event);
	}
	else if (window.vflscrsht.selection.draw_type == 'left_right') {
		window.vflscrsht.selection.boxDrawing_left_right(event);
	}
	else if (window.vflscrsht.selection.draw_type == 'move') {
		window.vflscrsht.selection.boxDrawing_move_start(event);
	}
	window.vflscrsht.selection.boxDrawing_text_size();
}
//------------------------------------------------------------------------------
window.vflscrsht.selection.boxDrawing_left_right = function(event) {
	var boxDiv = document.getElementById(window.vflscrsht.selection.BOX_DIV);

	window.vflscrsht.selection.mouseX = event.view ? event.pageX : window.vflscrsht.selection.mouseX;
	var left_tmp = window.vflscrsht.selection.mouseX < window.vflscrsht.selection.originX ? window.vflscrsht.selection.mouseX : window.vflscrsht.selection.originX;
	var left = (left_tmp < 0) ? 0 : left_tmp;
	var width = (left_tmp < 0) ? window.vflscrsht.selection.originX : Math.abs(window.vflscrsht.selection.mouseX - window.vflscrsht.selection.originX);

	//------------------------------------------------------------------------------------
	var doc_width = window.vflscrsht.selection.getDocumentWidth();
	if ((left +  width + 5) >= doc_width) {
		boxDiv.setAttribute('is_hide_right_border', true); 
	} else {
		boxDiv.removeAttribute('is_hide_right_border');
	}
	if ((left +  width + 2) >= doc_width) {
		width = doc_width - left - 2;
	}

	//------------------------------------------------------------------------------------
	boxDiv.style.display = "none";
	boxDiv.style.left = left + "px";
	boxDiv.left_box = left;
	window.vflscrsht.selection.setPrefs('selection.startX', left);

	if (width >= 0) {
		boxDiv.style.width = width + "px";
		boxDiv.width_box = width;
		window.vflscrsht.selection.setPrefs('selection.width', width);
	}
	boxDiv.style.display = "inline";

	//------------------------------------------------------------------------------------
	try {
		if (! window.vflscrsht.selection.check_disable_autoscroll()) {
			var scrollX = (window.vflscrsht.selection.clientWidth + window.scrollX);
			window.vflscrsht.selection.setPrefs('selection.scrollX', window.scrollX);
			if ((window.vflscrsht.selection.scrollWidth > window.vflscrsht.selection.mouseX) && (window.vflscrsht.selection.mouseX > (scrollX - 50))) {
				scrollBy(1, 0);
			} else if ((window.scrollX > 0) && (window.vflscrsht.selection.mouseX < (window.scrollX + 50))) {
				scrollBy(-1, 0);
			}
		}
	} catch(e) {
	}
}
//------------------------------------------------------------------------------
window.vflscrsht.selection.boxDrawing_up_down = function(event) {
	var boxDiv = document.getElementById(window.vflscrsht.selection.BOX_DIV);

	window.vflscrsht.selection.mouseY = event.view ? event.pageY : window.vflscrsht.selection.mouseY;
	var top_tmp = window.vflscrsht.selection.mouseY < window.vflscrsht.selection.originY ? window.vflscrsht.selection.mouseY : window.vflscrsht.selection.originY;
	var top = (top_tmp < 0) ? 0 : top_tmp;
	var height = (top_tmp < 0) ? window.vflscrsht.selection.originY : Math.abs(window.vflscrsht.selection.mouseY - window.vflscrsht.selection.originY);

	//------------------------------------------------------------------------------------
	var doc_height = window.vflscrsht.selection.getDocumentHeight();
	if ((top +  height + 5) >= doc_height) {
		boxDiv.setAttribute('is_hide_bottom_border', true); 
	} else {
		boxDiv.removeAttribute('is_hide_bottom_border');
	}
	if ((top +  height + 2) >= doc_height) {
		height = doc_height - top - 2;
	}

	//------------------------------------------------------------------------------------
	boxDiv.style.display = "none";
	boxDiv.style.top = top + "px";
	boxDiv.top_box = top;
	window.vflscrsht.selection.setPrefs('selection.startY', top);

	if (height >= 0) {
		boxDiv.style.height = height + "px";
		boxDiv.height_box = height;
		window.vflscrsht.selection.setPrefs('selection.height', height);
	}
	boxDiv.style.display = "inline";
	//------------------------------------------------------------------------------------
	try {
		if (! window.vflscrsht.selection.check_disable_autoscroll()) {
			window.vflscrsht.selection.getClientSize();
			var scrollY = (window.vflscrsht.selection.clientHeight + window.scrollY);
			window.vflscrsht.selection.setPrefs('selection.scrollY', window.scrollY);
			if ((window.vflscrsht.selection.scrollHeight > window.vflscrsht.selection.mouseY) && (window.vflscrsht.selection.mouseY > (scrollY - 50))) {
				scrollBy(0, 1);
			} else if ((window.scrollY > 0) && (window.vflscrsht.selection.mouseY < (window.scrollY + 50))) {
				scrollBy(0, -1);
			}
		}
	} catch(e) {
	}
}
//------------------------------------------------------------------------------
window.vflscrsht.selection.boxDrawing_move_start = function(event) {
	var boxDiv = document.getElementById(window.vflscrsht.selection.BOX_DIV);

	window.vflscrsht.selection.mouseX = event.view ? event.pageX : window.vflscrsht.selection.mouseX;
	window.vflscrsht.selection.mouseY = event.view ? event.pageY : window.vflscrsht.selection.mouseY;
	boxDiv.left_box += window.vflscrsht.selection.mouseX - window.vflscrsht.selection.originX;
	boxDiv.top_box += window.vflscrsht.selection.mouseY - window.vflscrsht.selection.originY;

	//------------------------------------------------------------------------------------
	var doc_width = window.vflscrsht.selection.getDocumentWidth();
	if ((boxDiv.left_box +  boxDiv.clientWidth + 5) >= doc_width) {
		boxDiv.setAttribute('is_hide_right_border', true); 
	} else {
		boxDiv.removeAttribute('is_hide_right_border');
	}
	if ((boxDiv.left_box +  boxDiv.clientWidth + 2) >= doc_width) { boxDiv.left_box = doc_width - boxDiv.clientWidth - 2; }
	if (boxDiv.left_box < 0) { boxDiv.left_box = 0; }

	//------------------------------------------------------------------------------------
	var doc_height = window.vflscrsht.selection.getDocumentHeight();
	if ((boxDiv.top_box +  boxDiv.clientHeight + 5) >= doc_height) {
		boxDiv.setAttribute('is_hide_bottom_border', true); 
	} else {
		boxDiv.removeAttribute('is_hide_bottom_border');
	}
	if ((boxDiv.top_box +  boxDiv.clientHeight + 2) >= doc_height) { boxDiv.top_box = doc_height - boxDiv.clientHeight - 2; }
	if (boxDiv.top_box < 0) { boxDiv.top_box = 0; }

	//------------------------------------------------------------------------------------
	window.vflscrsht.selection.setPrefs('selection.startX', boxDiv.left_box);
	window.vflscrsht.selection.setPrefs('selection.startY', boxDiv.top_box);

	boxDiv.style.display = "none";
	boxDiv.style.left = boxDiv.left_box + "px";
	boxDiv.style.top = boxDiv.top_box + "px";
	boxDiv.style.display = "inline";

	window.vflscrsht.selection.originX = event.view ? event.pageX : window.vflscrsht.selection.originX;
	window.vflscrsht.selection.originY = event.view ? event.pageY : window.vflscrsht.selection.originY;

	//------------------------------------------------------------------------------------
	try {
		if (! window.vflscrsht.selection.check_disable_autoscroll()) {
			window.vflscrsht.selection.getClientSize();
			var scrollX = (window.vflscrsht.selection.clientWidth + window.scrollX);
			window.vflscrsht.selection.setPrefs('selection.scrollX', window.scrollX);
			if ((window.vflscrsht.selection.scrollWidth > window.vflscrsht.selection.mouseX) && (window.vflscrsht.selection.mouseX > (scrollX - 50))) {
				scrollBy(1, 0);
			} else if ((window.scrollX > 0) && (window.vflscrsht.selection.mouseX < (window.scrollX + 50))) {
				scrollBy(-1, 0);
			}
	
			var scrollY = (window.vflscrsht.selection.clientHeight + window.scrollY);
			window.vflscrsht.selection.setPrefs('selection.scrollY', window.scrollY);
			if ((window.vflscrsht.selection.scrollHeight > window.vflscrsht.selection.mouseY) && (window.vflscrsht.selection.mouseY > (scrollY - 50))) {
				scrollBy(0, 1);
			} else if ((window.scrollY > 0) && (window.vflscrsht.selection.mouseY < (window.scrollY + 50))) {
				scrollBy(0, -1);
			}
		}
	} catch(e) {
	}
}
//------------------------------------------------------------------------------
window.vflscrsht.selection.boxDrawing_text_size = function() {
	var boxDiv = document.getElementById(window.vflscrsht.selection.BOX_DIV);
	if (! boxDiv) { return; }

	var bar_line = document.getElementById('vflscrshtBoxDiv_bar_line');
	var bar_line_text_size = document.getElementById('vflscrshtBoxDiv_bar_line_text_size');
	var bar_line_ok = document.getElementById('vflscrshtBoxDiv_bar_line_ok');
	var bar_line_cancel = document.getElementById('vflscrshtBoxDiv_bar_line_cancel');
	window.vflscrsht.selection.getClientSize();

	//------------------------------------------------------------------------
	var zoom_font = window.devicePixelRatio || 1;
	var zoom = zoom_font;

	var doc_width = window.vflscrsht.selection.getDocumentWidth();

	bar_line_text_size.textContent = Math.round(boxDiv.width_box*zoom) + ' x ' + Math.round(boxDiv.height_box*zoom);
	bar_line_text_size.style.fontSize = Math.round(14 / zoom_font) + 'px';
	if (bar_line_ok) {
		bar_line_ok.style.width = bar_line_ok.style.height = Math.round(14 / zoom_font) + 'px';
	}
	if (bar_line_cancel) {
		bar_line_cancel.style.width = bar_line_cancel.style.height = Math.round(14 / zoom_font) + 'px';
	}

	//------------------------------------------------------------------------
	//------------------------------------------------------------------------
	var pos_top = boxDiv.top_box - window.scrollY - bar_line.clientHeight - 5;
	if (pos_top > window.vflscrsht.selection.clientHeight - bar_line.clientHeight) {
		pos_top = window.vflscrsht.selection.clientHeight - bar_line.clientHeight;
	}
	if (pos_top < 5) {
		pos_top = 5;
	}
	bar_line.style.top = pos_top + 'px';

	//------------------------------------------------------------------------
	var box_left = boxDiv.left_box + 3;
	if (boxDiv.width_box > bar_line.clientWidth+5) {
		box_left = boxDiv.left_box + boxDiv.width_box - bar_line.clientWidth - 3;
	}
	var pos_left = box_left - window.scrollX;
	if (pos_left > window.vflscrsht.selection.clientWidth - bar_line.clientWidth) {
		pos_left = window.vflscrsht.selection.clientWidth - bar_line.clientWidth;
	}
	if (pos_left < 3) {
		pos_left = 3;
	}
	bar_line.style.left = pos_left + 'px';
}
//------------------------------------------------------------------------------
window.vflscrsht.selection.getClientSize = function() {
	var winDoc = null;
	try {
		winDoc = (document.documentElement) ? document.documentElement : document.body;
		window.vflscrsht.selection.winDoc = winDoc;
	} catch(e) {
	}

	if (winDoc) {
		window.vflscrsht.selection.clientWidth = winDoc.clientWidth - 2;
		window.vflscrsht.selection.clientHeight = winDoc.clientHeight - 2;
		window.vflscrsht.selection.scrollWidth = (winDoc.scrollWidth > winDoc.offsetWidth) ? winDoc.scrollWidth : winDoc.offsetWidth;
		window.vflscrsht.selection.scrollHeight = (winDoc.scrollHeight > winDoc.offsetHeight) ? winDoc.scrollHeight : winDoc.offsetHeight;
	}
}
//------------------------------------------------------------------------------
window.vflscrsht.selection.boxDrawing_savePosition = function(event) {
	window.vflscrsht.selection.setPrefs('selection.savePosition', event.target.checked);
}
//------------------------------------------------------------------------------
window.vflscrsht.selection.scrollBoxDraw = function(event) {
	var event2 = new window.MouseEvent('mousemove', { 'view': null, 'bubbles': true, 'cancelable': true });
	document.dispatchEvent(event2);
}
//------------------------------------------------------------------------------
window.vflscrsht.selection.endBoxDraw = function(event) {
	if (window.vflscrsht.selection.draw_type == 'start') {
		var backgroundDiv = document.getElementById(window.vflscrsht.selection.BACKGROUND_DIV);
		backgroundDiv.removeEventListener("mousedown", window.vflscrsht.selection.beginBoxDraw);
		backgroundDiv.removeAttribute('is_start');
		if (window.vflscrsht.selection.fast_selection) {
			window.vflscrsht.selection.OnMouseUpHandlerThatHasToExistForSomeReason(event);
		}
	}
	window.vflscrsht.selection.draw_type = '';
}
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
window.vflscrsht.selection.enableDraw = function() {
	window.vflscrsht.selection.fast_selection = window.vflscrsht.selection.prefs['selection.fastMode'];

	var vflscrshtBar = window.document.getElementById("vflscrsht_bar");
	if (vflscrshtBar != null) {
		vflscrshtBar.style.background = window.vflscrsht.selection.SNAP_IMAGE;
		window.vflscrsht.selection.oldText = vflscrshtBar.tooltiptext;
		vflscrshtBar.tooltiptext = window.vflscrsht.selection.TOOL_TEXT;
    	}
    
	window.vflscrsht.selection.insertHeaderElements();
    
	var body = document.getElementsByTagName("html")[0];
        
	var drawDiv = document.createElement("div");
	drawDiv.setAttribute("id", window.vflscrsht.selection.DRAW_DIV);
        
	var backgroundDiv = document.createElement("div");
	backgroundDiv.setAttribute("id",  window.vflscrsht.selection.BACKGROUND_DIV);
	backgroundDiv.setAttribute("class", "backgroundOverlay");
	drawDiv.appendChild(backgroundDiv);
	body.appendChild(drawDiv);

	//------------------------------------------------------------------------
	var hide_hint_text = window.vflscrsht.selection.prefs['selection.hide_hint_text'];
	var vflscrsht_bar_hint = document.createElement("div");
	vflscrsht_bar_hint.id = 'vflscrsht_bar_hint';
	backgroundDiv.appendChild(vflscrsht_bar_hint);
	//------------------------------------------------------------------------
	if (! hide_hint_text) {
		var vflscrsht_bar_hint_esc = document.createElement("div");
		vflscrsht_bar_hint_esc.id = 'vflscrsht_esc_text';
		vflscrsht_bar_hint_esc.textContent = window.vflscrsht.selection.string_list['selection.esc.exit'];
		vflscrsht_bar_hint.appendChild(vflscrsht_bar_hint_esc);

		if (! window.vflscrsht.selection.fast_selection) {
			var vflscrsht_bar_hint_fast_mode = document.createElement("div");
			vflscrsht_bar_hint_fast_mode.id = 'vflscrsht_bar_fx_fast_mode_descr';
			vflscrsht_bar_hint.appendChild(vflscrsht_bar_hint_fast_mode);
	
			var fast_mode_descr = document.createElement("div");
			fast_mode_descr.id = 'vflscrsht_fast_mode_text';
			vflscrsht_bar_hint_fast_mode.appendChild(fast_mode_descr);
	
			fast_mode_descr.appendChild(document.createTextNode(window.vflscrsht.selection.string_list['selection.fast_mode']));
			fast_mode_descr.appendChild(document.createElement("br"));
			fast_mode_descr.appendChild(document.createTextNode(window.vflscrsht.selection.string_list['selection.fast_mode.temp']));
			fast_mode_descr.appendChild(document.createElement("br"));
			fast_mode_descr.appendChild(document.createTextNode(window.vflscrsht.selection.string_list['selection.fast_mode.always']));
		}
	}
	//------------------------------------------------------------------------
        
	document.addEventListener("mousemove", window.vflscrsht.selection.boxDrawing, true);
	document.addEventListener("mouseup", window.vflscrsht.selection.endBoxDraw, true);
	document.addEventListener("scroll", window.vflscrsht.selection.scrollBoxDraw, true);
	document.addEventListener("keydown", window.vflscrsht.selection.OnKeyDownHandler, true);

	window.vflscrsht.selection.offsetX = pageXOffset || window.scrollX;
	window.vflscrsht.selection.offsetY = pageYOffset || window.scrollY;

	//------------------------------------------------------------------------
	window.vflscrsht.selection.getClientSize();
	window.vflscrsht.drawing = true;

	//------------------------------------------------------------------------
	var savePosition = window.vflscrsht.selection.prefs['selection.savePosition'];
	if (savePosition && (! window.vflscrsht.selection.fast_selection)) {
		window.vflscrsht.selection.fastModeTextHide();
		window.vflscrsht.selection.restoreBoxDraw();
	} else {
		backgroundDiv.setAttribute('is_start', true);
		backgroundDiv.addEventListener("mousedown", window.vflscrsht.selection.beginBoxDraw);
	}
}
//------------------------------------------------------------------------------
window.vflscrsht.selection.disableDrawAndGrabIfRequired = function(event) {
	var result = window.vflscrsht.selection.disableDraw(event);
	if (result.box != null && event != null) {
		setTimeout(function(){
			chrome.runtime.sendMessage({ 'action' : 'capture_set_selection', 'dimensions': result.dimBox }, function(response) {});
		}, 10);
	}
}
//------------------------------------------------------------------------------
window.vflscrsht.selection.OnMouseUpHandlerThatHasToExistForSomeReason = function(event) {
	if (event.target.id == 'vflscrsht_esc_text') {
		window.vflscrsht.selection.disableDraw(event);
	} else {
		window.vflscrsht.selection.disableDrawAndGrabIfRequired(event);
	}
}
//------------------------------------------------------------------------------
window.vflscrsht.selection.OnKeyDownHandler = function(event) {
	if (event.keyCode === 27 ) {
		window.vflscrsht.selection.disableDraw(event);
	}
}
//------------------------------------------------------------------------------
window.vflscrsht.selection.disableDraw = function(event) {
	try {
		document.removeEventListener("mousemove", window.vflscrsht.selection.boxDrawing, true);
		document.removeEventListener("mouseup", window.vflscrsht.selection.endBoxDraw, true);
		document.removeEventListener("scroll", window.vflscrsht.selection.scrollBoxDraw, true);
		document.removeEventListener("keydown", window.vflscrsht.selection.OnKeyDownHandler, true);
	} catch (error) {
	}
	var box = null;
	var dimBox = null;
	try {
		var body = document.getElementsByTagName("html")[0];

		// create a box to hold the dimensions of the box
		box = document.getElementById( window.vflscrsht.selection.BOX_DIV);
		if (box && (box != null)) {
//			dimBox = new vflscrsht.Box(box.offsetLeft, box.offsetTop, box.clientWidth, box.clientHeight)

			var zoom = window.devicePixelRatio || 1;
			dimBox = { 'startX' : Math.floor(box.offsetLeft * zoom), 'startY' : Math.floor(box.offsetTop * zoom), 'width' : Math.floor(box.clientWidth * zoom), 'height' : Math.floor(box.clientHeight * zoom) };
			// remove the box div
			body.removeChild(box);
		}
		var newDiv = document.getElementById(window.vflscrsht.selection.DRAW_DIV);
		if (newDiv) {
			body.removeChild(newDiv);
		}
	    	
		// restore the styling to the vflscrsht bar
		var vflscrshtBar = window.document.getElementById("vflscrsht_bar");
		if (vflscrshtBar != null) {
			vflscrshtBar.style.background = window.vflscrsht.selection.IDLE_IMAGE;
			vflscrshtBar.tooltiptext = window.vflscrsht.selection.oldText;
		}

		window.vflscrsht.drawing = false;

		//--------------------------------------------------------------
		// check scrolling page
		//--------------------------------------------------------------
		if (dimBox) {
			dimBox.disable_autoscroll = window.vflscrsht.selection.check_disable_autoscroll();

			var zoom = window.devicePixelRatio || 1;
			if ((dimBox.startY >= window.scrollY*zoom) && ((dimBox.startY + dimBox.height) <= (window.scrollY*zoom + window.vflscrsht.selection.winDoc.clientHeight*zoom))) {
				if ((dimBox.startX >= window.scrollX*zoom) && ((dimBox.startX + dimBox.width) <= (window.scrollX*zoom + window.vflscrsht.selection.winDoc.clientWidth*zoom))) {
					dimBox.disable_autoscroll = true;
				}
			}
		}
	    } catch (error) {
//		vflscrsht.error(error);
	}
	return { 'box' : box, 'dimBox' : dimBox };
}
//------------------------------------------------------------------------------
window.vflscrsht.selection.vflscrsht_bar_hint_hide = function() {
	var vflscrsht_bar_hint = document.getElementById('vflscrsht_bar_hint');
	if (vflscrsht_bar_hint) {
		vflscrsht_bar_hint.parentNode.removeChild(vflscrsht_bar_hint);
	}
}
//------------------------------------------------------------------------------
window.vflscrsht.selection.fastModeTextHide = function() {
	var vflscrsht_bar_hint_fast_mode = document.getElementById('vflscrsht_bar_hint_fast_mode_descr');
	if (vflscrsht_bar_hint_fast_mode) {
		vflscrsht_bar_hint_fast_mode.parentNode.removeChild(vflscrsht_bar_hint_fast_mode);
	}
}
//------------------------------------------------------------------------------
window.vflscrsht.selection.getDocumentHeight = function() {
	var height = (document.documentElement.scrollHeight > document.documentElement.offsetHeight) ? document.documentElement.scrollHeight : document.documentElement.offsetHeight;

	if (document && document.body) {
		var body_height = (document.body.scrollHeight > document.body.offsetHeight) ? document.body.scrollHeight : document.body.offsetHeight;
		if (body_height > height) {
			height = body_height;
		}
//		height = document.body.clientHeight;
	}
	return height;
}
//------------------------------------------------------------------------------
window.vflscrsht.selection.getDocumentWidth = function() {
//	return (document.body.scrollWidth > document.body.offsetWidth) ? document.body.scrollWidth : document.body.offsetWidth;
	var width = (document.documentElement.scrollWidth > document.documentElement.offsetWidth) ? document.documentElement.scrollWidth : document.documentElement.offsetWidth;
	if (width <= 0) {
		if (document && document.body) {
			width = document.body.clientWidth;
		}
	}
	return width;
}
//------------------------------------------------------------------------------
window.vflscrsht.selection.setPrefs = function(name, value) {
	try {
		clearTimeout(window.vflscrsht.selection.save_selection_timer[name]);
	} catch(e) {};
	window.vflscrsht.selection.save_selection_timer[name] = setTimeout(function(){
		chrome.runtime.sendMessage({ action_prefs_set : true, 'pref_name' : name, 'pref_value' : value }, function(response) {});
	}, 200);
	window.vflscrsht.selection.prefs[name] = value;
}
//------------------------------------------------------------------------------
window.vflscrsht.selection.check_disable_autoscroll = function() {
	var result = false;

	if (window.document.location.host == 'twitter.com') {
		var body = window.document.getElementsByTagName("body")[0];
		if (/overlay\-enabled/.test(body.className)) {
			result = true;
		}
		else if (/gallery\-enabled/.test(body.className)) {
			result = true;
		}
	}
	if ((window.scrollY == 0) && (window.vflscrsht.selection.winDoc.clientHeight == window.vflscrsht.selection.winDoc.scrollHeight)) {
		if ((window.scrollX == 0) && (window.vflscrsht.selection.winDoc.clientWidth == window.vflscrsht.selection.winDoc.scrollWidth)) {
			result = true;
		}
	}

	return result;
}
//------------------------------------------------------------------------------
if (! window.vflscrsht.is_listener_selection) {
	chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
		if (request.action == 'capture_cancel') {
			window.vflscrsht.selection.disableDrawAndGrabIfRequired();
		}
	});
	window.vflscrsht.is_listener_selection = true;
}
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
window.vflscrsht.selection.init();
