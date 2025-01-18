var s3dm = {};

//------------------------------------------------------------------------------
s3dm.init = function() {
	var params_txt = String(location.search).replace(/\?/g, '');
	params_txt = decodeURIComponent(params_txt.replace(/\+/g, ' ')).replace(/\%21/g, '!').replace(/\%27/g, "'").replace(/\%28/g, '(').replace(/\%29/g, ')').replace(/\%2A/g, '*');
	var aDownload = JSON.parse(params_txt);

	//------------------------------------------------------------------------
	document.getElementById('d_img').src = aDownload.iconURL32;
	var filename = aDownload.filename;
	if (filename.length >50) {
		filename = s3dm.utils.get_filename_short(filename);
	}
	document.getElementById('d_filename').appendChild(document.createTextNode(filename));
	document.getElementById('d_filename').setAttribute('title', filename);

	//------------------------------------------------------------------------
	document.getElementById('download_open').addEventListener("click", function(event) {
		event.preventDefault();
		event.stopPropagation();
		chrome.downloads.open(aDownload.id);
		setTimeout(function(){
			chrome.runtime.sendMessage({ action: 'window_close' }, function(response) {});
		}, 500);
	}, true);

	//------------------------------------------------------------------------
	s3dm.prefs.init(function(){
		setTimeout(function(){ s3dm.utils.i18n_parse(document); }, 100);
	});
}
//------------------------------------------------------------------------------
window.addEventListener("load", s3dm.init);
