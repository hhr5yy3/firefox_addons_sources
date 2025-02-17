var vflscrsh = {};
vflscrsh.is_minimize = false;
vflscrsh.is_minimize_height = true;
//------------------------------------------------------------------------------
vflscrsh.onMessageHandler = function(message, sender, sendResponse) {
	setTimeout(function(){ vflscrsh.onMessageAction(message); }, 200);
	sendResponse({ 'success' : true });
}
//------------------------------------------------------------------------------
vflscrsh.onMessageAction = function(message) {
	chrome.runtime.onMessage.removeListener(vflscrsh.onMessageHandler);
	document.getElementById('image_preview_title').textContent = message.file_name;
	var body = document.body || { 'scrollWidth' : 0, 'offsetWidth' : 0, 'clientWidth' : 0, 'scrollHeight' : 0,  'offsetHeight' : 0, 'clientHeight' : 0 };
	var html = document.documentElement;
	var page_height = Math.max(body.scrollHeight, body.offsetHeight, html.scrollHeight, html.offsetHeight, html.clientHeight);
	var screen_height = Math.max(body.clientHeight, body.offsetHeight, html.offsetHeight, html.clientHeight);
	var screen_width = Math.max(body.clientWidth, body.offsetWidth, html.offsetWidth, html.clientWidth);
	var image_preview = document.getElementById('image_preview');

	if (message.height < page_height) {
		var margin_top = Math.floor((page_height - message.height)/3);
		if (margin_top > 0) {
			image_preview.style.marginTop = margin_top + 'px';
		}
	}
	image_preview.setAttribute('title', message.file_name + ' (' + message.width + 'x' + message.height + ')');
	image_preview.width_original = message.width;
	image_preview.height_original = message.height;
	image_preview.src = message.image_url;
	//------------------------------------------------------------------------
	if ((message.height > screen_height) && (message.width > screen_width)) {
		if ((message.height - screen_height) > (message.width - screen_width)) {
			vflscrsh.is_minimize_height = true;
		} else {
			vflscrsh.is_minimize_height = false;
		}
		vflscrsh.is_minimize = true;
	} else if (message.height > screen_height) {
		vflscrsh.is_minimize_height = true;
		vflscrsh.is_minimize = true;
	} else if (message.width > screen_width) {
		vflscrsh.is_minimize_height = false;
		vflscrsh.is_minimize = true;
	}
	//------------------------------------------------------------------------
	if (vflscrsh.is_minimize) {
		image_preview.addEventListener('click', vflscrsh.minimize);
		vflscrsh.minimize();
	}
}
//------------------------------------------------------------------------------
vflscrsh.minimize = function() {
	var image_preview = document.getElementById('image_preview');

	if (vflscrsh.is_minimize) {
		if (vflscrsh.is_minimize_height) {
			image_preview.style.height = '100%';
		} else {
			image_preview.style.width = '100%';
		}
		image_preview.style.cursor = 'zoom-in';
		vflscrsh.is_minimize = false;
	} else {
		image_preview.style.height = '';
		image_preview.style.width = '';
		image_preview.style.cursor = 'zoom-out';
		vflscrsh.is_minimize = true;
	}
}
//------------------------------------------------------------------------------
chrome.runtime.onMessage.addListener(vflscrsh.onMessageHandler);
