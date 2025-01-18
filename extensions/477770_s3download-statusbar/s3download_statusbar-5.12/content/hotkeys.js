s3dm.hotkeys = {};
//------------------------------------------------------------------------------
s3dm.hotkeys.init = function() {
	s3dm.hotkeys.pause = false;
	window.addEventListener('keydown', function(e) {
		s3dm.hotkeys.press(e);
	});
	window.addEventListener('keyup', function(e) {
		s3dm.hotkeys.pause = false;
	});
}
//------------------------------------------------------------------------------
s3dm.hotkeys.press = function(event) {
	var time = (new Date()).getTime();
	if (! s3dm.hotkeys.pause) {
		s3dm.hotkeys.check(event, s3dm.utils.prefs_get("hotkeys"));
	}
}
//------------------------------------------------------------------------------
s3dm.hotkeys.check = function(event, hotkeys) {
	var is_run = false;

	for (var i=0; i<hotkeys.length; i++) {
		var key = hotkeys[i];
		if ((key.shiftKey == event.shiftKey) && (key.ctrlKey == event.ctrlKey) && (key.altKey == event.altKey) && (key.keyCode == event.keyCode)) {
			s3dm.hotkeys.pause = true;
			event.preventDefault();
			event.stopPropagation();
			event.stopImmediatePropagation();

			var key_method = key.method;

			if (key_method == 'open_downloads') {
				s3dm.action.open_download_window();
			} else if (key_method == 'hide_downbar') {
				s3dm.viewer.toggle_downbar(! s3dm.utils.prefs_get('downbar_is_collapsed'));
			} else if (key_method == 'clear_last') {
				s3dm.action.key_action_last('clear');
			} else if (key_method == 'undo_clear') {
				s3dm.action.undo_clear();
			} else if (key_method == 'open_last_file') {
				s3dm.action.key_action_last('open');
			} else if (key_method == 'show_last_file') {
				s3dm.action.key_action_last('show');
			}
			is_run = true;
			break;
		}
	}
	if (! is_run) {
		s3dm.hotkeys.pause = false;
	}
}
//------------------------------------------------------------------------------
