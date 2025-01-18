vflscrsh.preview = {};
//------------------------------------------------------------------------------
vflscrsh.preview.init = function(tab_data) {
	var image_data = {
		formatMimeType : vflscrsh.utils.formatMimeType(),
		formatImageExt : vflscrsh.utils.formatImageExt(),
		site_title : tab_data.site_title,
		site_description : tab_data.site_description,
		site_url : tab_data.site_url
	};
	vflscrsh.preview.doAction(image_data, tab_data);
}
//------------------------------------------------------------------------------
vflscrsh.preview.doAction = function(image_data, tab_data) {
	var dataUrl = tab_data.screenshot.canvas.toDataURL(image_data.formatMimeType, vflscrsh.utils.formatQuality(image_data.formatMimeType));
	image_data.imgBlob = vflscrsh.utils.img_to_blob(dataUrl, image_data.formatMimeType);
	image_data.file_name = vflscrsh.utils.defaultFileName(image_data) + "." + image_data.formatImageExt;

	var image_url = URL.createObjectURL(image_data.imgBlob);

	chrome.tabs.create(
		{ url: "/content/image_preview.html", 'active': true, 'index' : tab_data.index+1 },
		function(tab) {
			var handler = function(tabId, changeInfo) {
				if ((tabId === tab.id) && (changeInfo.status === "complete")) {
					chrome.tabs.onUpdated.removeListener(handler);
					chrome.tabs.sendMessage(tabId, { 'image_url' : image_url, 'file_name' : image_data.file_name, 'width' : tab_data.screenshot.canvas.width, 'height' : tab_data.screenshot.canvas.height });
				}
			}
			chrome.tabs.onUpdated.addListener(handler);
			chrome.tabs.sendMessage(tab.id, { 'image_url' : image_url, 'file_name' : image_data.file_name, 'width' : tab_data.screenshot.canvas.width, 'height' : tab_data.screenshot.canvas.height });
			vflscrsh.action.end_action(tab_data);
		}
	);
}
//------------------------------------------------------------------------------
