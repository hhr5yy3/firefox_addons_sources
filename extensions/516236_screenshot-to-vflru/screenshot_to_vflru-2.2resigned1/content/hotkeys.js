//------------------------------------------------------------------------------
if (! window.vflscrsht) {
	window.vflscrsht = {};
}
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
if (! window.vflscrsht.is_hotkeys_init) {
	window.vflscrsht.is_hotkeys_init = true;
	window.vflscrsht.hotkeys_pause = 0;
	window.addEventListener('keydown', function(e) {
		window.vflscrsht.hotkeys_press(e);
	});
}
//------------------------------------------------------------------------------
window.vflscrsht.hotkeys_press = function(event) {
	var time = (new Date()).getTime();
	if (window.vflscrsht.hotkeys_pause < time-(1000*5)) {
		chrome.runtime.sendMessage({ action_prefs_get : true }, function(response) {
			if (response && response.prefs_list && response.prefs_list.hotkeys) {
				window.vflscrsht.hotkeys_check(event, response.prefs_list.hotkeys);
			}
		});
	}
}
//------------------------------------------------------------------------------
window.vflscrsht.hotkeys_check = function(event, hotkeys) {
	for (var i=0; i<hotkeys.length; i++) {
		var key = hotkeys[i];
		if ((key.shiftKey == event.shiftKey) && (key.ctrlKey == event.ctrlKey) && (key.altKey == event.altKey) && (key.keyCode == event.keyCode)) {
			event.preventDefault();
			event.stopPropagation();
			event.stopImmediatePropagation();

			window.vflscrsht.hotkeys_pause = (new Date()).getTime();
			chrome.runtime.sendMessage({ 'action' : 'capture', 'method' : key.method, 'target' : key.target, 'closetab' : key.closetab }, function(response) {
				chrome.runtime.sendMessage({ 'action_prefs_set' : true, 'pref_name' : 'last_operation', 'pref_value' : { 'method' : key.method, 'target' : key.target } }, function(response) {});
			});
			break;
		}
	}
}
//------------------------------------------------------------------------------
