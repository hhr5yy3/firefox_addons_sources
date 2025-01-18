var s3dm = {};

//------------------------------------------------------------------------------
s3dm.init = function() {
	var params_txt = String(location.search).replace(/\?/g, '');
	params_txt = decodeURIComponent(params_txt.replace(/\+/g, ' ')).replace(/\%21/g, '!').replace(/\%27/g, "'").replace(/\%28/g, '(').replace(/\%29/g, ')').replace(/\%2A/g, '*');

	//------------------------------------------------------------------------
	var aDownload = null;
	try {
		aDownload = JSON.parse(params_txt);
		if (! aDownload.filename) {
			s3dm.close_window();
		}
	} catch(e) {
		s3dm.close_window();
	}

	//------------------------------------------------------------------------
	s3dm.prefs.init(function(){
		setTimeout(function(){ s3dm.utils.i18n_parse(document); }, 100);
		s3dm.init_run(aDownload);
	});
}
//------------------------------------------------------------------------------
s3dm.init_run = function(aDownload) {
	document.getElementById('progress_bar_box_SHA256_from').setAttribute('label_wait', s3dm.utils.get_string('message.wait'));

	document.getElementById('s3downbar_checksum_file').textContent = aDownload.filename;
	s3dm.auto_run_from(aDownload);
}
//------------------------------------------------------------------------------
s3dm.auto_run_from = function(aDownload) {
	var path = 'file:///' + aDownload.filename.replace(/\\/g, '/');
	s3dm.utils.read_local_file(path, function(blob){
		if (blob) {
			s3dm.calculate_sha256(blob, aDownload);
		}
	});
}
//------------------------------------------------------------------------------
s3dm.calculate_sha256 = function(file, aDownload) {
	var bar = document.getElementById('progress_bar_SHA256_from');
	var bar_box = document.getElementById('progress_bar_box_SHA256_from');

	s3dm.utils.sha256_file(file, function(is_complete, percent, checksum_string) {
		bar_box.setAttribute('value', percent + '%');
		bar.value = percent;
		if (is_complete) {
			s3dm.antivirus_scan(aDownload, String(checksum_string));
		}
	});
}
//------------------------------------------------------------------------------
s3dm.antivirus_scan = function(aDownload, checksum) {
	s3dm.utils.antivirus_scan_checksum(checksum, function(res){
		if (res) {
			chrome.runtime.sendMessage({ 'action' : 'file_antivirus_done', 'res' : res, 's3id' : aDownload.s3id }, function(response) {
				s3dm.close_window();
			});
		} else {
			s3dm.close_window();
		}
	});
}
//-------------------------------------------------------------------------------------------
s3dm.close_window = function() {
	chrome.runtime.sendMessage({ 'action' : 'window_close' }, function(response) {});
}
//------------------------------------------------------------------------------
window.addEventListener("load", s3dm.init);
