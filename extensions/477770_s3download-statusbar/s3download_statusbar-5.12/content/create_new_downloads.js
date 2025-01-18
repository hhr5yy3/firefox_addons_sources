var s3dm = {};
s3dm.download_count_all = 0;
s3dm.download_count_done = 0;
s3dm.default_save_as = false;
s3dm.check_img_name = 'CHECK_FOLDER_S3.gif';
s3dm.default_dir = '';
s3dm.user_dir = '';
s3dm.check_download_id = null;
s3dm.check_download_url = null;
s3dm.url_list = [];

//------------------------------------------------------------------------------
s3dm.init = function() {
	//------------------------------------------------------------------------
	try {
		var params_txt = String(location.search).replace(/\?/g, '');
		params_txt = decodeURIComponent(params_txt.replace(/\+/g, ' ')).replace(/\%21/g, '!').replace(/\%27/g, "'").replace(/\%28/g, '(').replace(/\%29/g, ')').replace(/\%2A/g, '*');
		var dlist = JSON.parse(params_txt);
		document.getElementById('s3downbar_url_list').value = '';
		for (var i=0; i<dlist.length; i++) {
			document.getElementById('s3downbar_url_list').value += dlist[i].url + "\n";
		}
	} catch(e){};
	//------------------------------------------------------------------------
	document.getElementById('button_ok').addEventListener("click", function(event) {
		s3dm.dialog_accept();
	}, true);
	//------------------------------------------------------------------------
	document.getElementById('button_cancel').addEventListener("click", function(event) {
		s3dm.close_window();
	}, true);

	//------------------------------------------------------------------------
	s3dm.prefs.init(function(){
		setTimeout(function(){ s3dm.utils.i18n_parse(document); }, 100);
		document.getElementById('s3downbar_url_list').focus();
	});

	//------------------------------------------------------------------------
	document.getElementById('help_template_count').setAttribute('title', "http://test.com/?id={%COUNT:2:4%}&w=bbb" + "\n==========\n" + "http://test.com/?id=2&w=bbb" + "\n"+ "http://test.com/?id=3&w=bbb" + "\n"+ "http://test.com/?id=4&w=bbb");

	//------------------------------------------------------------------------
	if (chrome.downloads.onDeterminingFilename) {
		var image_url = URL.createObjectURL(s3dm.dataURItoBlob(s3dm.utils.get_empty_img()));
		var options = {
			'url' : image_url,
			'conflictAction' : 'overwrite',
			'saveAs' : false,
			'filename' : s3dm.check_img_name
		};
		chrome.downloads.download(options, function(downloadId){
			if (downloadId) {
				setTimeout(function(){
					chrome.downloads.search({  id:downloadId }, function(downloads){
						if (downloads && downloads[0] && downloads[0].filename) {
							var  filename = String(downloads[0].filename);
							var start = filename.indexOf(s3dm.check_img_name);
							if (start > 0) {
								s3dm.default_dir = filename.substr(0, start);
								chrome.downloads.removeFile(downloadId, function(){ if(chrome.runtime.lastError){}; });
								chrome.downloads.erase({ 'id' : downloadId }, function(){ if(chrome.runtime.lastError){}; });
								s3dm.default_save_as = true;
							}
						}
					});
				}, 1000);
			}
		});
	}
}
//-------------------------------------------------------------------------------------------
s3dm.onDeterminingFilename = function() {
	if (chrome.downloads.onDeterminingFilename) {
		chrome.downloads.onDeterminingFilename.addListener(function(downloadItem, suggest){
			if (downloadItem.filename && s3dm.user_dir) {
				suggest({ 'filename' : s3dm.user_dir + downloadItem.filename });
			}
		});
	}
}
//-------------------------------------------------------------------------------------------
chrome.downloads.onChanged.addListener(function(downloadDelta){
	if (downloadDelta.filename && downloadDelta.filename.current && (downloadDelta.id == s3dm.check_download_id)) {
		var  filename = String(downloadDelta.filename.current);
		if (filename.indexOf(s3dm.default_dir) == 0) {
			var user_dir = filename.substr(s3dm.default_dir.length);
			if (/\/$/.test(s3dm.default_dir)) {
				user_dir = user_dir.replace(/[^\/]+$/, '');
			} else {
				user_dir = user_dir.replace(/[^\\]+$/, '');
			}
			s3dm.user_dir = user_dir;
			if (s3dm.user_dir) {
				s3dm.onDeterminingFilename();
				s3dm.run_downloads();
			}
		}
	}
	if (downloadDelta.error && downloadDelta.error.current && (downloadDelta.id == s3dm.check_download_id)) {
		if (s3dm.check_download_url) {
			s3dm.url_list.unshift(s3dm.check_download_url);
		}
		s3dm.check_download_id = null;
		s3dm.check_download_url = null;
		s3dm.button_disabled(false);
	}
});
//-------------------------------------------------------------------------------------------
s3dm.dialog_accept = function() {
	s3dm.button_disabled(true);
	document.getElementById('progress_bar_box').setAttribute('label_wait', s3dm.utils.get_string('message.wait'));

	//-------------------------------------------------------------------------------------
	function template_count(str, link, n, m, link2) {
		var res = [];
		for (var i=n; i<=m; i++) {
			res.push(link + i + link2);
		}
		return res.join("\n");
	}

	//-------------------------------------------------------------------------------------
	var s3dm_url_list = document.getElementById('s3downbar_url_list').value;
	var url_list_tmp = s3dm_url_list.replace(/\r/g, '').replace(/([^\n]+)\{\%count\:(\d+)\:(\d+)\%\}([^\n]*)/gi, template_count).split("\n");
	var url_list_hash = {};
	s3dm.url_list = [];

	//-------------------------------------------------------------------------------------
	for (var i=0; i<url_list_tmp.length; i++) {
		var url = url_list_tmp[i].replace(/\s/g, '');
		if (url) {
			if (! /^(ht|f)tps?\:\/\//i.test(url)) {
				url = 'http://' + url;
			}
			if (! url_list_hash[url]) {
				s3dm.url_list.push(url);
				url_list_hash[url] = 1;
			}
		}
	}
	s3dm.download_count_all = s3dm.url_list.length;
	s3dm.download_count_done = 0;

	//-------------------------------------------------------------------------------------
	if (s3dm.url_list.length == 0) {
		s3dm.button_disabled(false);
		return;
	}
	//-------------------------------------------------------------------------------------
	else if ((s3dm.url_list.length == 1) || (s3dm.default_save_as)) {
		var url = s3dm.url_list.shift();
		s3dm.create_download(url, true, function(downloadId){
			if (chrome.downloads.onDeterminingFilename) {
				s3dm.check_download_id = downloadId;
				s3dm.check_download_url = url;
			} else {
				s3dm.run_downloads();
			}
		});
	}
	//-------------------------------------------------------------------------------------
	else {
		s3dm.run_downloads();
	}
}
//-------------------------------------------------------------------------------------------
s3dm.run_downloads = function() {
	if (s3dm.url_list.length) {
		s3dm.create_download(s3dm.url_list.shift(), false, function(downloadId){
			s3dm.run_downloads();
		});
	}
	s3dm.download_count_check();
}
//-------------------------------------------------------------------------------------------
s3dm.create_download = function(url, saveAs, callback) {
	var client = new XMLHttpRequest();
	client.open("HEAD", url, true);
	client.onreadystatechange = function() {
		if (this.readyState == this.HEADERS_RECEIVED) {
			var filename = s3dm.utils.get_filename_short(this.responseURL);
			filename = filename.replace(/^\.+/, '');
			if (! /.+\..+/.test(filename)) {
				filename = '';
			}
			try {
				client.manual_stopped = true;
				client.abort();
			} catch(e) {};
			s3dm.create_download_run(url, saveAs, callback, filename);
		}
	}
	client.onerror = function() {
		if (! client.manual_stopped) {
			s3dm.create_download_run(url, saveAs, callback);
		}
	}
	client.send();
}
//-------------------------------------------------------------------------------------------
s3dm.create_download_run = function(url, saveAs, callback, filename) {
	var options = {
		'url' : url,
		'conflictAction' : 'uniquify',
		'saveAs' : saveAs
	};
	//-------------------------------------------------------------------------------------
	if (filename) {
		options.filename = filename;
	}
	//-------------------------------------------------------------------------------------
	chrome.downloads.download(options, function(downloadId){
		if (chrome.runtime.lastError) {
			alert(chrome.runtime.lastError.message + "\n-----------------\n" + url);
			s3dm.url_list.unshift(url);
			s3dm.button_disabled(false);
		} else {
			s3dm.download_count_done++;
	
			if (callback) {
				callback(downloadId);
			}
		}
	});
}
//-------------------------------------------------------------------------------------------
s3dm.download_count_check = function() {
	if (s3dm.download_count_done >= s3dm.download_count_all) {
		setTimeout(function(){
			s3dm.close_window();
		}, 500);
	}
	var percent = (s3dm.download_count_all > 0) ? Math.ceil(100 * s3dm.download_count_done / s3dm.download_count_all) : 100;
	document.getElementById('progress_bar_box').setAttribute('value', percent+ '%');
	document.getElementById('s3downbar_progressmeter').value = percent;
}
//-------------------------------------------------------------------------------------------
s3dm.dataURItoBlob = function(dataURI) {
	var byteString = atob(dataURI.split(',')[1]);
	var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
	var ab = new ArrayBuffer(byteString.length);
	var ia = new Uint8Array(ab);
	for (var i = 0; i < byteString.length; i++) {
		ia[i] = byteString.charCodeAt(i);
	}
	var blob = new Blob([ab], {type: mimeString});
	return blob;
}
//-------------------------------------------------------------------------------------------
s3dm.button_disabled = function(is_disabled) {
	document.getElementById('input_box').setAttribute('is_hidden', is_disabled);
	document.getElementById('progress_bar_box').setAttribute('is_hidden', ! is_disabled);

	if (! is_disabled) {
		document.getElementById('s3downbar_url_list').value = s3dm.url_list.join("\n");
	}
}
//-------------------------------------------------------------------------------------------
s3dm.close_window = function() {
	chrome.runtime.sendMessage({ 'action' : 'window_close' }, function(response) {});
}
//-------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------
window.addEventListener("load", s3dm.init);
