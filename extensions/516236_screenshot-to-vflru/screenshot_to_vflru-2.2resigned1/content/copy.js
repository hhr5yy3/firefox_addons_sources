vflscrsh.copy = {};
//------------------------------------------------------------------------------
vflscrsh.copy.init = function(tab_data) {
	var image_data = {
		formatMimeType : vflscrsh.utils.formatMimeType(),
		formatImageExt : vflscrsh.utils.formatImageExt(),
		site_title : tab_data.site_title,
		site_description : tab_data.site_description,
		site_url : tab_data.site_url
	};
	//------------------------------------------------------------------------
	if (image_data.formatMimeType == 'image/bmp') {
		image_data.formatMimeType = 'image/png';
		image_data.formatImageExt = 'png';
	}
	//------------------------------------------------------------------------
	else if (image_data.formatMimeType == 'image/webp') {
		image_data.formatMimeType = 'image/png';
		image_data.formatImageExt = 'png';
	}
	//------------------------------------------------------------------------
	else if (image_data.formatImageExt == 'jpg') {
		image_data.formatImageExt = 'jpeg';
	}

	//------------------------------------------------------------------------
	vflscrsh.copy.doAction(image_data, tab_data);
}
//------------------------------------------------------------------------------
vflscrsh.copy.doAction = function(image_data, tab_data) {
	if (vflscrsh.utils.clipboard_image_not_copy()) { return; }
	var dataUrl = tab_data.screenshot.canvas.toDataURL(image_data.formatMimeType, vflscrsh.utils.formatQuality(image_data.formatMimeType));
	var buffer = vflscrsh.utils.img_to_ArrayBuffer(dataUrl);
	try {
		chrome.clipboard.setImageData(buffer, image_data.formatImageExt);
		if (vflscrsh.utils.prefs_get('showCopyNotification')) {
			setTimeout(function() {
				vflscrsh.utils.notification_box(vflscrsh.utils.get_string('copy_image_done'));
			}, 100);
		}
		vflscrsh.action.end_action(tab_data);
	} catch (e) {};
}
//------------------------------------------------------------------------------
