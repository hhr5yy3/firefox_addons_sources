vflscrsh.save = {};
//------------------------------------------------------------------------------
vflscrsh.save.init = function(tab_data, save_mhtml) {
	var image_data = {
		formatMimeType : vflscrsh.utils.formatMimeType(),
		formatImageExt : vflscrsh.utils.formatImageExt(),
		site_title : tab_data.site_title,
		site_description : tab_data.site_description,
		site_url : tab_data.site_url
	};

	vflscrsh.save.doAction(image_data, tab_data, save_mhtml);
}
//------------------------------------------------------------------------------
vflscrsh.save.doAction = function(image_data, tab_data, save_mhtml) {
	var dataUrl = vflscrsh.utils.canvas_toDataURL(tab_data.screenshot.canvas, image_data.formatMimeType, vflscrsh.utils.formatQuality(image_data.formatMimeType));
	image_data.imgBlob = vflscrsh.utils.img_to_blob(dataUrl, image_data.formatMimeType);
	image_data.file_name = vflscrsh.utils.defaultFileName(image_data) + "." + image_data.formatImageExt;

	var image_url = URL.createObjectURL(image_data.imgBlob);
	var filename_path = '/' + vflscrsh.utils.prefs_get('defaultSavePath') + '/' + image_data.file_name;
	filename_path = filename_path.replace(/\/\.+\//g, '/').replace(/\/+/g, '/').replace(/^\/+/g, '');

	chrome.downloads.download({
		url: image_url,
		filename: filename_path,
		saveAs: ! vflscrsh.utils.prefs_get('quicklySave')
	}, function (downloadId) {
		if (vflscrsh.utils.prefs_get('quicklySave')) {
			vflscrsh.utils.notification_box(vflscrsh.utils.get_string('save_image_done'));
		}
		if (save_mhtml && chrome.pageCapture && chrome.pageCapture.saveAsMHTML) {
			vflscrsh.save.doAction_mhtml(tab_data, filename_path);
		} else {
			vflscrsh.action.end_action(tab_data);
		}
	});
}
//------------------------------------------------------------------------------
vflscrsh.save.doAction_mhtml = function(tab_data, filename_path) {
	chrome.pageCapture.saveAsMHTML({ tabId: tab_data.id }, function(mhtmlData){
		var mhtml_url = URL.createObjectURL(mhtmlData);
		filename_path = filename_path.replace(/[^\.]+$/, 'mht');  // Google Chrome painfully reacts to the file "*.mhtml"
	
		chrome.downloads.download({
			url: mhtml_url,
			filename: filename_path,
			saveAs: ! vflscrsh.utils.prefs_get('quicklySave')
		}, function (downloadId) {
			vflscrsh.action.end_action(tab_data);
		});
	});
}
//------------------------------------------------------------------------------
