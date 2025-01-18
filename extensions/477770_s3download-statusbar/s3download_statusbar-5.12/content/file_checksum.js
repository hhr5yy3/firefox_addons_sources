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
			aDownload = null;
		}
	} catch(e) {
	}

	//------------------------------------------------------------------------
	document.getElementById('checksum_compare_file_button').addEventListener("click", function(event) {
		document.getElementById('checksum_file_to').click();
	}, true);
	//------------------------------------------------------------------------
	document.getElementById('checksum_file_to').addEventListener("change", function(event) {
		var file = event.target.files[0];
		if (file) {
			s3dm.show_box_checksum(false, 'to');
			s3dm.calculate_md5(file, 'to');
		}
		event.target.value = '';
	}, true);
	//------------------------------------------------------------------------
	document.getElementById('checksum_file_from').addEventListener("change", function(event) {
		var file = event.target.files[0];
		if (file) {
			document.getElementById('box_from').setAttribute('is_hidden', false);
			document.getElementById('checksum_file_from').setAttribute('is_hidden', true);
			document.getElementById('s3downbar_checksum_file').textContent = file.name;
			s3dm.show_box_checksum(false, 'MD5_from');
			s3dm.show_box_checksum(false, 'SHA256_from');
			s3dm.calculate_md5(file, 'from');
		}
		event.target.value = '';
	}, true);
	//------------------------------------------------------------------------
	document.getElementById('checksum_to').addEventListener("input", function(event) {
		setTimeout(function(){
			s3dm.compare_checksum();
		}, 100);
	}, true);
	//------------------------------------------------------------------------
	document.getElementById('button_copy_MD5_from').addEventListener("click", function(event) {
		s3dm.utils.copy_clipboard(document.getElementById('checksum_MD5_from').value);
	}, true);
	//------------------------------------------------------------------------
	document.getElementById('button_copy_SHA256_from').addEventListener("click", function(event) {
		s3dm.utils.copy_clipboard(document.getElementById('checksum_SHA256_from').value);
	}, true);
	//------------------------------------------------------------------------
	document.getElementById('button_copy_to').addEventListener("click", function(event) {
		s3dm.utils.copy_clipboard(document.getElementById('checksum_to').value);
	}, true);



	//------------------------------------------------------------------------
	s3dm.prefs.init(function(){
		setTimeout(function(){ s3dm.utils.i18n_parse(document); }, 100);
		s3dm.init_run(aDownload);
	});
}
//------------------------------------------------------------------------------
s3dm.init_run = function(aDownload) {
	document.getElementById('progress_bar_box_MD5_from').setAttribute('label_wait', s3dm.utils.get_string('message.wait'));
	document.getElementById('progress_bar_box_SHA256_from').setAttribute('label_wait', s3dm.utils.get_string('message.wait'));
	document.getElementById('progress_bar_box_to').setAttribute('label_wait', s3dm.utils.get_string('message.wait'));

	if (aDownload) {
		document.getElementById('s3downbar_checksum_file').textContent = aDownload.filename;
		document.getElementById('box_from').setAttribute('is_hidden', false);
		document.getElementById('checksum_file_from').setAttribute('is_hidden', true);
		s3dm.auto_run_from(aDownload);
	} else {
		s3dm.show_box_checksum(true, 'MD5_from');
		s3dm.show_box_checksum(true, 'SHA256_from');
	}
}
//------------------------------------------------------------------------------
s3dm.auto_run_from = function(aDownload) {
	s3dm.show_box_checksum(false, 'MD5_from');
	s3dm.show_box_checksum(false, 'SHA256_from');

	var path = 'file:///' + aDownload.filename.replace(/\\/g, '/');
	s3dm.utils.read_local_file(path, function(blob){
		if (blob) {
			document.getElementById('box_to').setAttribute('is_hidden', false);
			s3dm.calculate_md5(blob, 'from');
		}
	});
}
//------------------------------------------------------------------------------
s3dm.calculate_md5 = function(file, who) {
	var el_id = (who == 'to') ? 'to' : 'MD5_from';
	var bar = document.getElementById('progress_bar_' + el_id);
	var bar_box = document.getElementById('progress_bar_box_' +el_id);
	var checksum = document.getElementById('checksum_' + el_id);

	s3dm.utils.md5_file(file, function(is_complete, percent, checksum_string) {
		bar_box.setAttribute('value', percent + '%');
		bar.value = percent;
		if (is_complete) {
			s3dm.show_box_checksum(true, el_id);
			checksum.value = String(checksum_string).toUpperCase();
			if (who == 'to') {
				s3dm.compare_checksum();
			}
			else if (who == 'from') {
				document.getElementById('box_to').setAttribute('is_hidden', false);
				s3dm.calculate_sha256(file, who);
			}
		}
	});
}
//------------------------------------------------------------------------------
s3dm.calculate_sha256 = function(file, who) {
	var bar = document.getElementById('progress_bar_SHA256_' + who);
	var bar_box = document.getElementById('progress_bar_box_SHA256_' + who);
	var checksum = document.getElementById('checksum_SHA256_' + who);

	s3dm.utils.sha256_file(file, function(is_complete, percent, checksum_string) {
		bar_box.setAttribute('value', percent + '%');
		bar.value = percent;
		if (is_complete) {
			s3dm.show_box_checksum(true, 'SHA256_from');
			checksum.value = String(checksum_string).toUpperCase();
			s3dm.compare_checksum();
		}
	});
}
//------------------------------------------------------------------------------
s3dm.compare_checksum = function() {
	var img = document.getElementById('s3downbar_checksum_compare_check');
	//------------------------------------------------------------------------
	var md5_from = String(document.getElementById('checksum_MD5_from').value).toUpperCase();
	var sha256_from = String(document.getElementById('checksum_SHA256_from').value).toUpperCase();
	var md5_to = String(document.getElementById('checksum_to').value).toUpperCase();
	//------------------------------------------------------------------------
	md5_to = md5_to.replace(/\s/g, '');
	document.getElementById('checksum_to').value = md5_to;

	//------------------------------------------------------------------------
	if (md5_to == '') {
		img.className = 'checksum_unknown';
	} else if ((md5_to == md5_from) || (md5_to == sha256_from)) {
		img.className = 'checksum_success';
	} else {
		img.className = 'checksum_fail';
	}
}
//------------------------------------------------------------------------------
s3dm.show_box_checksum = function(is_completed, who) {
	if (is_completed) {
		document.getElementById('checksum_' + who).setAttribute('is_hidden', false);
		document.getElementById('button_copy_' + who).setAttribute('is_hidden', false);
		document.getElementById('progress_bar_box_' + who).setAttribute('is_hidden', true);
	} else {
		document.getElementById('checksum_' + who).setAttribute('is_hidden', true);
		document.getElementById('button_copy_' + who).setAttribute('is_hidden', true);
		document.getElementById('progress_bar_box_' + who).setAttribute('is_hidden', false);
		document.getElementById('progress_bar_box_' + who).setAttribute('value', '0%');
		document.getElementById('progress_bar_' + who).value = 0;
	}
}
//------------------------------------------------------------------------------
window.addEventListener("load", s3dm.init);
