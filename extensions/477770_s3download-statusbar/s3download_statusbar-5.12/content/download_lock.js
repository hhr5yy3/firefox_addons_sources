var s3dm = {};

//------------------------------------------------------------------------------
s3dm.init = function() {
	var params_txt = String(location.search).replace(/\?/g, '');
	params_txt = decodeURIComponent(params_txt.replace(/\+/g, ' ')).replace(/\%21/g, '!').replace(/\%27/g, "'").replace(/\%28/g, '(').replace(/\%29/g, ')').replace(/\%2A/g, '*');
	var aDownload = JSON.parse(params_txt);

	//------------------------------------------------------------------------
	chrome.downloads.acceptDanger(aDownload.id, function(){
		setTimeout(function(){
			chrome.runtime.sendMessage({ action: 'window_close' }, function(response) {});
		}, 100);
	});
}
//------------------------------------------------------------------------------
window.addEventListener("load", s3dm.init);
