s3dm.utils = {};

//------------------------------------------------------------------------------
s3dm.utils.console_log = function(msg) {
	console.log('%O', msg);
}
//------------------------------------------------------------------------------
s3dm.utils.var_dump = function(arg) {
	var text = '';
	for (var i in arg) {
		try {
			if (! /^function/.test(arg[i])) {
				text += i + ':' + arg[i] + "\n";
			} else {
//				text += i + ': is function' + "\n";
			}
		} catch(e) {
		}
	}
	return text;
}
//------------------------------------------------------------------------------
s3dm.utils.console_log_dump = function(arg) {
	s3dm.utils.console_log(s3dm.utils.var_dump(arg));
}
//------------------------------------------------------------------------------
s3dm.utils.prefs_get = function(pref_name, default_value) {
	var pref_value = s3dm.prefs.get(pref_name);
	if (pref_value === undefined) {
		return default_value;
	}
	try {
		return s3dm.utils.clone_object(pref_value);
	} catch(e) {
		return pref_value;
	}
}
//------------------------------------------------------------------------------
s3dm.utils.prefs_set = function(pref_name, pref_value) {
	s3dm.prefs.set({ 'name' : pref_name, 'value' : pref_value });
	return true;
}
//------------------------------------------------------------------------------
s3dm.utils.get_string = function(name, params) {
	var result = '';
	if (! params) { params = [] }

	try {
		result = s3dm.i18n.get_string(name, params);
	} catch(e) {
		result = name + e;
	}
	return result || name;
}
//------------------------------------------------------------------------------
s3dm.utils.clone_object = function(object) {
	return JSON.parse(JSON.stringify(object));
}
//------------------------------------------------------------------------------
s3dm.utils.get_element = function(parent, search_id) {
	if (parent == null) { return null; };

	for (var i=0; i<parent.childNodes.length; i++) {
		var el = parent.childNodes[i];
		if (el.id == search_id) {
			return el;
		}
		if (el.hasChildNodes()) {
			var res = s3dm.utils.get_element(el, search_id);
			if (res != null) {
				return res;
			}
		}
	}
	return null;
}
//------------------------------------------------------------------------------
s3dm.utils.HTMLDOM_value = function(html_element, value) {
	var tagName = (html_element.tagName) ? html_element.tagName.toUpperCase() : '#text';
	var is_input_tag = ((tagName == 'INPUT') || (tagName == 'TEXTAREA')) ? true : false;

	if (value === undefined) {
		return (is_input_tag) ? html_element.value : html_element.textContent;
	} else {
		if (is_input_tag) {
			html_element.value = value;
		} else {
			html_element.textContent = value;
		}
		return;
	}
}
//------------------------------------------------------------------------------
s3dm.utils.i18n_parse = function(doc) {
	s3dm.i18n.parse_html(doc);
}
//------------------------------------------------------------------------------
s3dm.utils.urlencode = function(str) {
	str = (str + '').toString();
	return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');
}
//-------------------------------------------------------------------------------------------
s3dm.utils.random_string = function(size) {
	var size = size || 5;
	var a = 'qwertyuiopasdfghjklzxcvbnm0123456789';
	var result = '';
	for (var i=0; i<size; i++) {
		result += a.substr(Math.floor(Math.random() * a.length), 1);
	}
	return result;
}
//-------------------------------------------------------------------------------------------
s3dm.utils.parse_document = function(doc, data) {
	if (doc.childNodes && doc.childNodes.length) {
		for (var i=0; i<doc.childNodes.length; i++) {
			var el = doc.childNodes[i];
			if (el.hasChildNodes()) {
				s3dm.utils.parse_document(el, data);
			}
			else {
				var value = s3dm.utils.HTMLDOM_value(el);
				value = s3dm.utils.parse_template(value, data);
				s3dm.utils.HTMLDOM_value(el, value);
			}
		}
	}
}
//-------------------------------------------------------------------------------------------
s3dm.utils.parse_template = function(str, data) {
	// str = "asd ${a1} ${bbb}"
	// data = { 'a1' : '555', 'bbb' : 'wow!'}

	for (var d in data) {
		var regexp = new RegExp("\\${" + d + "}", "g");
		str = str.replace(regexp, data[d]);
	}

	function replacer(str, p1, p2, offset, s) {
		var keys = p2.split('-');
		if (keys.length>1) {
			var d = data;
			for (var i=0; i<keys.length; i++) {
				var key = keys[i];
				if (d[key] != undefined) {
					d = d[key];
				} else {
					return p1;
				}
			}
			if (d != undefined) {
				return d;
			}
		}
		return p1;
	}

	str = str.replace(/(\$\{([^\}]+)\})/g, replacer);
	return str;
}
//-------------------------------------------------------------------------------------------
s3dm.utils.text_hash_get = function(str, hash) {
	var k = str.split('.');
	var result;

	try {
		if (k.length == 1) { result = hash[k[0]]; }
		if (k.length == 2) { result = hash[k[0]][k[1]]; }
		if (k.length == 3) { result = hash[k[0]][k[1]][k[2]]; }
		if (k.length == 4) { result = hash[k[0]][k[1]][k[2]][k[3]]; }
	} catch(e) {
	}
	return result;
}
//-------------------------------------------------------------------------------------------
s3dm.utils.text_hash_set = function(str, hash, value) {
	var k = str.split('.');
	try {
		if (k.length == 1) { hash[k[0]] = value; }
		if (k.length == 2) { hash[k[0]][k[1]] = value; }
		if (k.length == 3) { hash[k[0]][k[1]][k[2]] = value; }
		if (k.length == 4) { hash[k[0]][k[1]][k[2]][k[3]] = value; }
	} catch(e) {
	}
	return hash;
}
//-------------------------------------------------------------------------------------------
s3dm.utils.get_filename_short = function(filename) {
	var fname = filename.toString().replace(/^.*[\/\\](.*)$/, '$1');
	if (fname) {
		fname = fname.replace(/\?.*$/, '');
	}
	return fname;
}
//------------------------------------------------------------------------------
s3dm.utils.check_ignore_list = function(download_fileext) {
	download_fileext = download_fileext.split(".").pop().toLowerCase();
	var download_ignoreList = new Array ( );
	var ignoreRaw = s3dm.utils.prefs_get("function.ignoreFiletypes");
	ignoreRaw = ignoreRaw.toLowerCase().replace(/\s/g,'');  // remove all whitespace
	download_ignoreList = ignoreRaw.split(",");
	var ignoreThisOne = false;

	//----------------------------------------------------------------------
	// If it's on the ignore list, don't show it on the downbar
	//----------------------------------------------------------------------
	for (var ignore_ext of download_ignoreList) {
		if ((ignore_ext == download_fileext) || (ignore_ext == "*")){
			ignoreThisOne = true;
		}
	}
	return ignoreThisOne;
}
//------------------------------------------------------------------------------
s3dm.utils.search_id_with_target = function(download_list, filename) {
	var aDownload = undefined;
	for (var i in download_list) {
		if (download_list[i].filename == filename) {
			aDownload = download_list[i];
		}
	}
	return aDownload;
}
//------------------------------------------------------------------------------
s3dm.utils.get_placeDownloadsFromRight = function() {
	return s3dm.utils.prefs_get("function.placeDownloadsFromRight");
}
//------------------------------------------------------------------------------
s3dm.utils.md5 = function(str) {
	var s = SparkMD5.hash(String(str));
	return s.toUpperCase();
}
//------------------------------------------------------------------------------
s3dm.utils.sha256 = function(str) {
	str = String(str);

	var sha256 = new s3dm.sha256();
	sha256.init();
	sha256.update(str, str.length);
	sha256.final();

	var s = sha256.encode_hex();
	return s.toUpperCase();
}
//------------------------------------------------------------------------------
s3dm.utils.md5_file = function(file, callback) {
	var blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;
	var chunkSize = 1024*1024*2;	// Read in chunks of 2MB
	var chunks = Math.ceil(file.size / chunkSize);
	var currentChunk = 0;
	var spark = new SparkMD5.ArrayBuffer();
	var fileReader = new FileReader();

	fileReader.onload = function (e) {
		spark.append(e.target.result);                   // Append array buffer
		currentChunk++;

		if (currentChunk < chunks) {
			var percent = Math.round((currentChunk + 1) * 100 / chunks);
			callback(false, percent, '');
			loadNext();
		} else {
			callback(true, 100, spark.end());
		}
	};

	fileReader.onerror = function () {
		console.warn('oops, something went wrong.');
	};

	function loadNext() {
		var start = currentChunk * chunkSize;
		var end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize;
		fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
	}

	loadNext();
}
//------------------------------------------------------------------------------
s3dm.utils.sha256_file = function(file, callback) {
	var blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;
	var chunkSize = 1024*1024*2;	// Read in chunks of 2MB
	var chunks = Math.ceil(file.size / chunkSize);
	var currentChunk = 0;
	var sha256 = new s3dm.sha256();
	var fileReader = new FileReader();

	sha256.init();

	fileReader.onload = function (e) {
		sha256.update(e.target.result, e.target.result.length);
		currentChunk++;

		if (currentChunk < chunks) {
			var percent = Math.round((currentChunk + 1) * 100 / chunks);
			callback(false, percent, '');
			loadNext();
		} else {
			sha256.final();
			callback(true, 100, sha256.encode_hex());
		}
	};

	fileReader.onerror = function () {
		console.warn('oops, something went wrong.');
	};

	function loadNext() {
		var start = currentChunk * chunkSize;
		var end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize;
		fileReader.readAsBinaryString(blobSlice.call(file, start, end));
	}

	loadNext();
}
//------------------------------------------------------------------------------
s3dm.utils.get_referrer = function(aDownload) {
	if ((aDownload.referrer != '') && (aDownload.referrer != null)) {
		return aDownload.referrer;
	}
	if (aDownload.referrer_url) {
		return aDownload.referrer_url;
	}
	return '';
}
//------------------------------------------------------------------------------
s3dm.utils.get_url_domain = function(url) {
	if (/^https?:\/\/.*/.test(url)) {
		return url.replace(/^https?:\/\/([^\/]+).*$/gi, '$1');
	}
	else if (/^ftps?:\/\/.*/.test(url)) {
		return url.replace(/^ftps?:\/\/([^\/]+).*$/gi, '$1');
	}
	else {
		return '';
	}
}
//------------------------------------------------------------------------------
s3dm.utils.get_download_state = function(aDownload) {
	var result = 0;

	//-----------------------------------------------------------------------
	var AVblocked = false;
	if (aDownload.danger && (aDownload.danger != 'accepted') && (aDownload.danger != 'safe')) {
		AVblocked = true;
	} else if (aDownload.error && (aDownload.error != 'accepted') && (aDownload.error != 'safe')) {
		// error: DownloadError: Download blocked.
//		AVblocked = true;
	}

	aDownload.succeeded = false;
	aDownload.stopped = false;
	aDownload.canceled = false;

	//-----------------------------------------------------------------------
	// (state == 0 | state == 5 | state == 4)  // in progress, queued, or paused
	//-----------------------------------------------------------------------
/*
	if (aDownload.state == 'complete') {
		aDownload.succeeded = true;
		result = 1;
	}
	else if (aDownload.is_queue) {
		aDownload.paused = true;
		result = 4;
	}
	else if (aDownload.paused && AVblocked) {
		aDownload.stopped = true;
		result = 8;
	}
	else if (aDownload.paused && aDownload.canResume) {
		aDownload.paused = true;
		result = 4;
	}
	else if (aDownload.paused && aDownload.canResume) {
		aDownload.paused = true;
		result = 4;
	}
	else if (aDownload.paused && ! aDownload.canResume) {
		aDownload.canceled = true;
		result = 3;
	}
	else if (aDownload.error && (aDownload.error != null) && ! aDownload.paused) {
		aDownload.canceled = true;
		result = 3;
	}
*/

	//----------------------------------------------------------------------
	if (AVblocked) {
		aDownload.stopped = true;
		result = (aDownload.state == 'complete') ? 8 : 6;
	}
	//----------------------------------------------------------------------
	else if (aDownload.state == 'complete') {
		aDownload.succeeded = true;
		result = 1;
	}
	//----------------------------------------------------------------------
	else if (aDownload.state == 'in_progress') {
		if (aDownload.is_queue) {
			aDownload.paused = true;
			result = 4;
		}
		else if (aDownload.paused) {
			aDownload.paused = true;
			result = 4;
		}
		else if (aDownload.error == 'NETWORK_FAILED') {
			aDownload.canceled = true;
			result = 3;
		}
	}
	//----------------------------------------------------------------------
	else if (aDownload.state == 'interrupted') {
		if (aDownload.paused && aDownload.canResume) {
			aDownload.paused = true;
			result = 4;
		}
		else if (aDownload.error) {
			aDownload.canceled = true;
			result = 3;
		}
	}

	return result;
}
//------------------------------------------------------------------------------
s3dm.utils.calculate_view = function(aDownload) {
	var newsize = aDownload.bytesReceived;
	var totalsize = aDownload.totalBytes;
	var oldsize = aDownload.pOldSavedKBytes;
	if (!oldsize) { oldsize = 0; }

	//----------------------------------------------------------------------
	aDownload.progress = 100;
	if ((aDownload.dlstate != 1) && ((! totalsize) || (newsize > totalsize))) {
		aDownload.progress = 0;
	}
	else if ((aDownload.dlstate != 1) && (newsize < totalsize)) {
		aDownload.progress = Math.round(100 * newsize / totalsize);
	}

	//----------------------------------------------------------------------
	var speed_bytes = newsize - oldsize;
	var current_time = (new Date()).getTime();
	var old_time = aDownload.speedTime || (new Date()).getTime();
	var speed_time = current_time - old_time;
	aDownload.speed = Math.round(speed_bytes / (speed_time /1000));
	aDownload.speedTime = current_time;

	//----------------------------------------------------------------------
	// If download stops, Download manager will incorrectly tell us the last positive speed, this fixes that - speed can go to zero
	// Count up to 3 intervals of no progress and only set speed to zero if we hit that
	//----------------------------------------------------------------------
	aDownload.dlRate = aDownload.speed;
	var noProgressIntervals = aDownload.noProgressIntervals;
	if (!noProgressIntervals) {
		noProgressIntervals = 0;
	}

	if (newsize - oldsize > 0) {
		aDownload.noProgressIntervals = 0;
	}
	else {
		// There was no progress
		noProgressIntervals++;
		aDownload.noProgressIntervals = noProgressIntervals;
		if(noProgressIntervals > 3) {
			aDownload.dlRate = 0;
		}
	}
	//----------------------------------------------------------------------
	if (aDownload.canceled) {
		aDownload.exists = false;
	}
	//----------------------------------------------------------------------
	if (aDownload.exists && (aDownload.fileSize < 0)) {
		aDownload.exists = false;
	} else if ((! aDownload.exists) && (aDownload.fileSize >= 0)) {
		aDownload.fileSize = -1;
	}


	//----------------------------------------------------------------------
	// Firefox download manager doesn't set the speed to zero when the download is paused
	//----------------------------------------------------------------------
	if (aDownload.dlstate == 4) {
		aDownload.dlRate = 0;
	}

	aDownload.currentBytes = aDownload.bytesReceived;
	aDownload.pOldSavedKBytes = newsize;
}
//------------------------------------------------------------------------------
s3dm.utils.get_iconURL = function(aDownload, callback) {
	if (aDownload.iconURL && aDownload.iconURL32) {
		callback();
	} else {
		chrome.downloads.getFileIcon(aDownload.id, { size: 16 }, function(iconURL){
			aDownload.iconURL = iconURL;
			chrome.downloads.getFileIcon(aDownload.id, { size: 32 }, function(iconURL32){
				aDownload.iconURL32 = iconURL32;
				callback();
			});
		});
	}
}
//------------------------------------------------------------------------------
// Round the number of seconds to remove fractions.
//------------------------------------------------------------------------------
s3dm.utils.format_seconds = function(secs) {
	if (secs < 0) {
		secs = 0;
	}
	secs = parseInt( secs + .5 );
	var hours = parseInt( secs/3600 );
	secs -= hours*3600;
	var mins = parseInt( secs/60 );
	secs -= mins*60;

	var result = '';
	if ( mins < 10 ) { mins = "0" + mins; }
	if ( secs < 10 ) { secs = "0" + secs; }
	if (hours) {
		if ( hours < 10 ) { hours = "0" + hours;}
		result = hours + ":" + mins + ":" + secs;
	} else {
		result = mins + ":" + secs;
	}

	return result;
}
//------------------------------------------------------------------------------
s3dm.utils.get_hide_downbar_after_all_finished = function() {
	var result = s3dm.utils.prefs_get("function.hideStatusbarAfterAllFinished");
	return result;
}
//------------------------------------------------------------------------------
s3dm.utils.get_hide_downbar_after_all_finished_time = function() {
	var result = s3dm.utils.prefs_get("function.hideStatusbarAfterAllFinishedTime");
	return result;
}
//------------------------------------------------------------------------------
s3dm.utils.get_speed_color_list = function() {
	var result = {};
	try{
		result.speedColor0 = s3dm.utils.prefs_get("style.speedColor0");
		result.speedColor1 = s3dm.utils.prefs_get("style.speedColor1");
		result.speedDivision1 = s3dm.utils.prefs_get("style.speedColorKB1");
		result.speedColor2 = s3dm.utils.prefs_get("style.speedColor2");
		result.speedDivision2 = s3dm.utils.prefs_get("style.speedColorKB2");
		result.speedColor3 = s3dm.utils.prefs_get("style.speedColor3");
		result.speedDivision3 = s3dm.utils.prefs_get("style.speedColorKB3");
	} catch(e){}

	return result;
}
//------------------------------------------------------------------------------
s3dm.utils.get_use_gradients = function() {
	return s3dm.utils.prefs_get("style.useGradients");
}
//------------------------------------------------------------------------------
s3dm.utils.get_use_animation = function() {
	return s3dm.utils.prefs_get("function.useAnimation");
}
//------------------------------------------------------------------------------
s3dm.utils.get_progressbar_border_right_color = function() {
	return s3dm.utils.prefs_get("style.pausedHbox_border_color", 'red');
}
//------------------------------------------------------------------------------
s3dm.utils.get_strings_to_KB_MB_GB = function(size, is_speed) {
	if (size > (1024*1024*1024)) {
		size = size/(1024*1024*1024);
		size = size.toFixed(2) + " " + s3dm.utils.get_string("display.giga_bytes_abbr" + (is_speed ? '_speed' : ''));
	}
	else if (size > (1024*1024)) {
		size = size/(1024*1024);
		size = size.toFixed(2) + " " + s3dm.utils.get_string("display.mega_bytes_abbr" + (is_speed ? '_speed' : ''));
	}
	else if (size > (1024)) {
		size = Math.round(size/1024);
		size = size + " " + s3dm.utils.get_string("display.kilo_bytes_abbr" + (is_speed ? '_speed' : ''));
	}
	else if (size > 0) {
		size = Math.round(size) + " " + s3dm.utils.get_string("display.bytes_abbr" + (is_speed ? '_speed' : ''));
	}
	else {
		size = "-.--";
	}
	return size;
}
//------------------------------------------------------------------------------
s3dm.utils.get_img_size = function(path, img, callback) {
	var aImage = null;

	try {
		aImage = new Image();
	} catch(e){
		try {
			aImage = new window.Image();
		} catch(e){
		}
	}

	if (aImage) {
		aImage.onload = function() {
			s3dm.utils.resize_show_img(aImage.width, aImage.height, path, img, callback);
		}
		aImage.src = path;
	}
}
//------------------------------------------------------------------------------
s3dm.utils.read_local_file = function(path, callback) {
	if (s3dm.utils.check_isFirefox()) {
		fetch(path, { mode:'same-origin' })   // <-- important
		.then(function(_res) {
			return _res.blob();
		})
		.then(function(_blob) {
			callback(_blob);
		}).catch(err=>{
			callback('');
		});
	}
	//------------------------------------------------------------------------
	else {
		var req = new XMLHttpRequest();
		req.open("GET", path, true);
		req.responseType = 'blob';
		req.onreadystatechange = function () {
			if (req.readyState == 4) {
				callback(req.response);
			}
		};
		req.send(null);
	}
}
//------------------------------------------------------------------------------
s3dm.utils.convert_to_dataURL = function(blob, callback) {
	var reader = new FileReader();
	reader.addEventListener("loadend", function() {
		callback(this.result);
	});
	reader.readAsDataURL(blob);
}
//------------------------------------------------------------------------------
s3dm.utils.resize_show_img = function(width, height, localFile, img, callback) {
	var newHeight = 120;
	var newWidth = 120;
	
	if (width>height) {
		ratio = width / 120;
		newHeight = parseInt(height / ratio);
	}
	if (height>width) {
		ratio = height / 120;
		newWidth = parseInt(width / ratio);
	}
	
	img.setAttribute("width", newWidth);
	img.setAttribute("height", newHeight);
	img.setAttribute("src", localFile);
	img.setAttribute('is_hidden', false);
	s3dm.utils.set_element_style(img, 'width: ' + newWidth + 'px; height: ' + newHeight + 'px');
	if (callback) {
		callback(width, height);
	}
}
//------------------------------------------------------------------------------
s3dm.utils.set_element_style = function(el, style) {
	if (! el) { return; }
	if (! style) { return; }

	var s = style.split(';');
	for (var i=-0; i<s.length; i++) {
		var p = s[i].split(':');
		if (p[0] && p[1]) {
			p[0] = p[0].replace(/^\s+|\s+$/g, '');
			p[1] = p[1].replace(/^\s+|\s+$/g, '');
			if (p[0] && p[1]) {
				el.style.setProperty(p[0], p[1], "important");
			}
		}
	}
}
//------------------------------------------------------------------------------
s3dm.utils.get_empty_img = function() {
	return 'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==';
}
//------------------------------------------------------------------------------
s3dm.utils.get_downlist = function(download_list) {
	var result = [];

	for (var i in download_list) {
		var aDownload = download_list[i];

		aDownload.is_succeeded = true;
		aDownload.is_progress = false;

		var state = aDownload.dlstate;

		if (state == 0 | state == 5 | state == 4 | state == 8) {
			aDownload.is_succeeded = false;
		}
		if (state == 0) {
			aDownload.is_progress = true;
		}
		result.push(aDownload);
	}

	return result.sort(s3dm.utils.create_download_list_sort);
}
//------------------------------------------------------------------------------
s3dm.utils.check_complete_history = function(download_list) {
	var is_all_complete = true;
	var d_list = s3dm.utils.get_downlist(download_list);

	for (var i=0; i<d_list.length; i++) {
		if (! d_list[i].is_succeeded) {
			is_all_complete = false;
		}
	}
	return is_all_complete;
}
//------------------------------------------------------------------------------
s3dm.utils.trim_show_completed = function(download_list) {
	var numToShow = s3dm.utils.prefs_get('function.numToShowCompleted', 50);

	//-----------------------------------------------------------------------
	var success_ary = new Array();
	var trim_ary = new Array();

	//-----------------------------------------------------------------------
	var d_list = s3dm.utils.get_downlist(download_list);
	for (var i=0; i<d_list.length; i++) {
		if (d_list[i].is_succeeded) {
			success_ary.push(d_list[i].startTime + '...' + d_list[i].s3id);
		}
	}

	//-----------------------------------------------------------------------
	success_ary = success_ary.sort();
	success_ary_length = success_ary.length-1;
	for (var i=(success_ary_length-1); i>=0; i--) {
		numToShow--;
		if (numToShow<0) {
			var s3id =  success_ary[i].replace(/^.*?\.\.\./,'');
			var is_quick = (success_ary_length > (numToShow+10)) ? true : false;
			trim_ary.push({ 's3id' : s3id, 'is_quick' : is_quick });
		}
	}

	return trim_ary;
}
//------------------------------------------------------------------------------
s3dm.utils.trim_history = function(callback) {
	var keepHistory = s3dm.utils.prefs_get('function.keepHistory', true);
	if (! keepHistory) { return; }
	var trimHistory = s3dm.utils.prefs_get('function.trimHistory', false);
	if (! trimHistory) { return; }

	var numToTrim = s3dm.utils.prefs_get('function.numToTrim', 50);
	var success_ary = new Array();
	var dl_list_tmp = {};

	//------------------------------------------------------------------------
	chrome.downloads.search({}, function(results) {
		for (var i=0; i<results.length; i++) {
			dl_list_tmp['tmp'+results[i].id] = results[i];
		}
		//-------------------------------------------------------------------
		var d_list = s3dm.utils.get_downlist(dl_list_tmp);
		//-------------------------------------------------------------------
		for (var i=0; i<d_list.length; i++) {
			if (d_list[i].is_succeeded) {
				success_ary.push(d_list[i].startTime + '...' + d_list[i].id);
			}
		}
		//-------------------------------------------------------------------
		success_ary = success_ary.sort();
		for (var i=(success_ary.length-1); i>=0; i--) {
			numToTrim--;
			if (numToTrim<0) {
				var id =  parseInt(success_ary[i].replace(/^.*?\.\.\./,''));
				var url = dl_list_tmp['tmp'+id].url;
				//------------------------------------------------------
				s3dm.utils.erase_history(id, url, function() {
					callback(s3dm.utils.generate_s3id(id));
				});
			}
		}
	});
	//------------------------------------------------------------------------
	return;
}
//------------------------------------------------------------------------------
s3dm.utils.erase_history = function(id, url, callback) {
	chrome.downloads.erase({ 'id' : id }, function() {
		if (chrome.runtime.lastError){};
		if (callback) { callback(); }
		if (url) {
			chrome.history.deleteUrl({ 'url' : url }, function() { if (chrome.runtime.lastError){} });
		}
	});
}
//------------------------------------------------------------------------------
s3dm.utils.get_queue_mode = function() {
	var result = s3dm.utils.prefs_get("function.queueMode");
	if (result) {
		var queueNum = s3dm.utils.prefs_get('function.queueNum');
		result = (queueNum > 0) ? true : false;
	}

	return result;
}
//------------------------------------------------------------------------------
s3dm.utils.set_queue_mode = function(aDownload, download_list, is_force) {
	if (is_force) {
		s3dm.utils.set_queue_mode_run(aDownload, download_list);
	} else {
		setTimeout(function() {
			s3dm.utils.set_queue_mode_run(aDownload, download_list);
		}, 1000);
	}
}
//------------------------------------------------------------------------------
s3dm.utils.set_queue_mode_run = function(aDownload, download_list) {
	if (! aDownload.succeeded && ! aDownload.canceled) {
		if (s3dm.utils.get_queue_mode()) {
			var queueIgnore = s3dm.utils.check_queue_ignore(aDownload);

			if ((!queueIgnore) && s3dm.utils.check_queue_mode(aDownload.s3id, download_list) > 0) {
				queueIgnore = true;
			}

			if (! queueIgnore) {
				setTimeout(function() {
					if (! aDownload.succeeded && ! aDownload.canceled) {
						aDownload.is_queue = true;
						aDownload.is_manual = false;
						s3dm.onMessage({ 'action' : 'download_pause', 's3id' : aDownload.s3id, 'is_manual' : false, 'is_queue' : true }, {}, function(response) {});
					}
				}, 1000);
			}
		}
	}
}
//------------------------------------------------------------------------------
s3dm.utils.check_queue_ignore = function(aDownload) {
	var queueIgnoreSizeKB = s3dm.utils.prefs_get('function.queueIgnoreSizeKB');
	if ((queueIgnoreSizeKB > 0) && aDownload.totalBytes && (queueIgnoreSizeKB*1024 >= aDownload.totalBytes)) {
		return true;
	}
	return false;
}
//------------------------------------------------------------------------------
s3dm.utils.check_queue_mode = function(s3id, download_list) {
	var queueNum = s3dm.utils.prefs_get('function.queueNum');
	
	//-----------------------------------------------------------------------
	var d_list = s3dm.utils.get_downlist(download_list);
	var download_progress = 0;
	for (var i=0; i<d_list.length; i++) {
		var aDownload = d_list[i];
		if ((! aDownload.is_succeeded) && (! aDownload.canceled) && (! aDownload.paused) && (! aDownload.is_queue)) {
			if (aDownload.s3id != s3id) {
				if (! s3dm.utils.check_queue_ignore(aDownload)) {
					download_progress++;
				}
			}
		}
	}

	return (queueNum - download_progress);
}
//------------------------------------------------------------------------------
s3dm.utils.create_download_list_sort = function(a, b) {
	if (a.startTime > b.startTime) { return 1; }
	if (a.startTime < b.startTime) { return -1; }
	return 0;
};
//------------------------------------------------------------------------------
s3dm.utils.generate_s3id = function(id) {
	return 's3db_' + s3dm.utils.md5(id || '000');
}
//------------------------------------------------------------------------------
s3dm.utils.check_progress_state = function(state) {
	if (state != 0 && state != 4 && state != 5) {		// if it isn't inprog, paused, or queued
		return false;
	} else {
		return true;
	}
}
//------------------------------------------------------------------------------
s3dm.utils.get_download_template = function(callback) {
	var xhr = new XMLHttpRequest();
	xhr.responseType = 'document';
	xhr.overrideMimeType('text/html');
	xhr.open('GET', chrome.extension.getURL('/content/download_template.html'));
	xhr.onload = function() {
		var doc = xhr.response;
		var download_template = doc.getElementById('s3downbar_download_box_template').cloneNode(true);
		document.body.appendChild(download_template);
		s3dm.i18n.parse_html(download_template);
		document.body.removeChild(download_template);

		callback({
			'download_template' : s3dm.utils.get_element(download_template, 'download_data_box').cloneNode(true),
			'download_template_tooltip' : s3dm.utils.get_element(download_template, 'download_data_tooltip').cloneNode(true),
			'download_template_context_main' : s3dm.utils.get_element(download_template, 'download_data_context_main').cloneNode(true),
			'download_template_context_downloads' : s3dm.utils.get_element(download_template, 'download_data_context_downloads').cloneNode(true),
			'download_template_context_dl_head' : s3dm.utils.get_element(download_template, 'download_data_context_dl_head').cloneNode(true),
			'download_template_context_dl_downloads' : s3dm.utils.get_element(download_template, 'download_data_context_dl_downloads').cloneNode(true)
		});
	}
	xhr.send();
}
//------------------------------------------------------------------------------
s3dm.utils.reset_style = function(el) {
	if (el.tagName == 'TABLE') {
		if (s3dm.utils.check_isFirefox()) {
			el.style.setProperty ("box-sizing", "border-box", "important"); // -- for Firefox
		} else {
			el.style.setProperty ("box-sizing", "content-box", "important"); // -- for Chrome
		}
		el.style.setProperty ("width", "initial", "important");
	} else {
		el.style.setProperty ("box-sizing", "initial", "important");
	}
}
//------------------------------------------------------------------------------
s3dm.utils.count_summary = function(download_list) {
	var progress_count = 0;
	var download_all = 0;
	var percentComplete = 0;
	var timeRemaining = 0;
	var speed_total = 0;
	var speedCount = 0;
	var pause_count = 0;

	//-----------------------------------------------------------------------
	var d_list = s3dm.utils.get_downlist(download_list);
	for (var i=0; i<d_list.length; i++) {
		var aDownload = d_list[i];

		download_all++;
//		if (! aDownload.is_succeeded) {
		if (s3dm.utils.check_progress_state(aDownload.dlstate)) {
			progress_count++;
			if (aDownload.paused) {
				pause_count++;
			} else {
				percentComplete += aDownload.progress;
			}
			if (aDownload.speed && (aDownload.speed > 0)) {
				var speed = aDownload.speed;
				var newsize = aDownload.bytesReceived;
				var totalsize = aDownload.totalBytes;
				var timeR = (1 / speed) * (totalsize - newsize);
				timeRemaining = (timeR > timeRemaining) ? timeR : timeRemaining;
				speed_total += speed;
				speedCount++;
			}
		}
	}

	//-----------------------------------------------------------------------
	percentComplete = ((progress_count-pause_count) > 0) ? Math.ceil(percentComplete / (progress_count-pause_count)) : 0;
	//-----------------------------------------------------------------------
	if ((percentComplete == 0) && ((progress_count-pause_count) <= 0)) {
		percentComplete = 100;
	}
	//-----------------------------------------------------------------------
	var speed_avg = (speedCount > 0) ? speed_total / speedCount : 0;
	//-----------------------------------------------------------------------
	return {
		'timeRemaining' : timeRemaining,
		'speed_avg' : speed_avg,
		'speed_total' : speed_total,
		'percentComplete' : percentComplete,
		'download_all' : download_all,
		'progress_count' : progress_count,
		'pause_count' : pause_count
	};
}
//------------------------------------------------------------------------------
s3dm.utils.check_click_tooltip = function(el) {
	while (el) {
		if (el.id && (el.id == 'download_data_tooltip')) {
			return true;
		}
		el = el.parentNode;
	}
	return false;
}
//------------------------------------------------------------------------------
s3dm.utils.merge_hash = function(from_hash, to_hash) {
	for (var i in from_hash) {
		if (! to_hash.hasOwnProperty(i)) {
			to_hash[i] = from_hash[i];
		}
		else if ((from_hash[i] !== null) && (from_hash[i] !== undefined) && (from_hash[i] !== '')) {
			to_hash[i] = from_hash[i];
		}
	}
	return to_hash;
}
//------------------------------------------------------------------------------
s3dm.utils.antivirus_scan_checksum = function(checksum, callback) {
	var url = 'https://www.virustotal.com/en/file/upload/?sha256=' + checksum + '&_=' + (new Date()).getTime();
	var res = {};

	//-----------------------------------------------------------------------
	var xhr = new XMLHttpRequest();
	xhr.open('GET', url);
	xhr.onload = function() {
		var result = null;
		//-----------------------------------------------------------------
		try {
			result = JSON.parse(xhr.response);
		} catch(e) {};
		//-----------------------------------------------------------------
		if (! result) {
			if (callback) {
				callback(null);
			}
		}
		//-----------------------------------------------------------------
		if (! /^https?\:\/\//.test(result.last_analysis_url)) {
			result.last_analysis_url = 'https://www.virustotal.com/' + result.last_analysis_url.replace(/^\//,'');
		}
		//-----------------------------------------------------------------
		res.virus_scan_ratio = result.detection_ratio;
		res.virus_scan_analysis_url = result.last_analysis_url;
		//-----------------------------------------------------------------
		if (result.detection_ratio && (result.detection_ratio[0] > 0)) {
			res.virus_scan_warning = true;
		} else if (result.detection_ratio) {
			res.virus_scan_warning = false;
		}
		//-----------------------------------------------------------------
		if (callback) {
			callback(res);
		}
	}
	xhr.send();
}
//-------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------
s3dm.utils.copy_clipboard = function(text, text_html) {
	var old_handler = document.oncopy;
	var handler = function(event) {
		event.clipboardData.setData('text/plain', text);
		if (text_html) {
			event.clipboardData.setData('text/html', text_html);
		}
		event.preventDefault();
		document.oncopy = old_handler;
		chrome.runtime.sendMessage({ 'notification_box': true, 'msg' : s3dm.utils.get_string('message.text_to_clipboard') }, function(response) {});
	};
	document.oncopy = handler;

	var textarea = document.createElement("textarea");
	var scrollX = window.scrollX;
	var scrollY = window.scrollY;

	textarea.style.position = "absolute";
	textarea.style.left = scrollX + "px";
	textarea.style.top = scrollY + "px";
	textarea.style.width = "1px";
	textarea.style.height = "1px";

	document.body.appendChild(textarea);
	textarea.focus();
	document.execCommand("copy", false, null);
	document.body.removeChild(textarea);
}
//-------------------------------------------------------------------------------------------
s3dm.utils.notification_box = function(msg, title, icon, timeout) {
	if (! title) {
		title = s3dm.utils.get_string('extension_name');
	}
	//-------------------------------------------------------------------------------------
	if (! timeout) {
		timeout = 2000;
	}
	//-------------------------------------------------------------------------------------
	var params = {
		'type' : 'basic',
		'isClickable' : false,
		'iconUrl' : (icon) ? icon : '/skin/logo32.png',
		'title' : title,
		'message' : String(msg)
	};
//	chrome.notifications.create(title + " notification." + Math.random(), params, function(notificationId){
	chrome.notifications.create(title + " notification", params, function(notificationId){
		setTimeout(function() {  chrome.notifications.clear(notificationId); }, timeout);
	});
}
//-------------------------------------------------------------------------------------------
s3dm.utils.check_isMac = function() {
	var text = window.navigator.platform;
	return (text.indexOf('Mac') >= 0) ? true : false;
}
//-------------------------------------------------------------------------------------------
s3dm.utils.check_isPDF = function() {
	if (document.contentType && (/pdf/i.test(document.contentType))) {
		return true;
	} else {
		return false;
	}
}
//-------------------------------------------------------------------------------------------
s3dm.utils.check_valid_url = function(url) {
	if (/^((https?)|(ftps?))\:\/\/.+/i.test(url)) {
		return true;
	}
	return false;
}
//-------------------------------------------------------------------------------------------
s3dm.utils.check_isFirefox = function() {
//	Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:58.0) Gecko/20100101 Firefox/58.0
	var text = window.navigator.userAgent;
	return (text.indexOf("Firefox") >=0) ? true : false;
}
//-------------------------------------------------------------------------------------------
s3dm.utils.check_isChrome = function() {
//	Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.167 Safari/537.36
	var text = window.navigator.userAgent;
	return (text.indexOf("Chrome") >=0) ? true : false;
}
//-------------------------------------------------------------------------------------------
