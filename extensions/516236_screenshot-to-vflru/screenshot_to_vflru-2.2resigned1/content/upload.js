vflscrsh.upload = {};
//------------------------------------------------------------------------------
vflscrsh.upload.init = function(tab_data) {
	var image_data = {
		formatMimeType : vflscrsh.utils.formatMimeType(),
		formatImageExt : vflscrsh.utils.formatImageExt(),
		site_title : tab_data.site_title,
		site_description : tab_data.site_description,
		site_url : tab_data.site_url,
		tab_index : tab_data.index+1,
		tabdata : tab_data
	};
	vflscrsh.upload.doAction(image_data, tab_data);
}
//------------------------------------------------------------------------------
vflscrsh.upload.doAction = function(image_data, tab_data) {
	var dataUrl = tab_data.screenshot.canvas.toDataURL(image_data.formatMimeType, vflscrsh.utils.formatQuality(image_data.formatMimeType));
	image_data.imgBlob = vflscrsh.utils.img_to_blob(dataUrl, image_data.formatMimeType);

	//------------------------------------------------------------------------
	if (image_data.imgBlob.size > 10000000) {
		if (image_data.formatMimeType != 'image/jpeg') {
			if (confirm(vflscrsh.utils.get_string('upload_png_large'))) {
				image_data.formatMimeType = 'image/jpeg';
				image_data.formatImageExt = 'jpg';
				return vflscrsh.upload.doAction(image_data, tab_data);
			} else {
				return false;
			}
		}
		else {
			vflscrsh.utils.notification_box(vflscrsh.utils.get_string('upload_image_is_big'));
			return 0;
		}
	}
	//------------------------------------------------------------------------
	var upload_storage = vflscrsh.utils.prefs_get('uploadStorage');
	vflscrsh.Upload_VFL.doUpload(image_data);
}
//------------------------------------------------------------------------------
vflscrsh.upload.errorUpload = function(req) {
	vflscrsh.utils.notification_box(vflscrsh.utils.get_string('upload_image_error'));
	return false;
};
//-------------------------------------------------------------------
vflscrsh.upload.copyUploadLink = function(link) {
	if (vflscrsh.utils.prefs_get('uploadLinkToClipboard')) {
		vflscrsh.utils.clipboard_copy(link);
	}
}
//-------------------------------------------------------------------
