setTimeout(function(){
	var init_s = function(count) {
		if (! document.body) {
			count--;
			if (count > 0) {
				setTimeout(function(){ init_s(count); }, Math.floor(Math.random() *20)*50+5);
			}
		} else if (! document.documentElement.s3dm_init_s) {
			document.documentElement.s3dm_init_s = true;
			if ((!/https?:\/\//.test(location.href)) && (/download_history/.test(location.href))) {
			} else {
				if (! window.s3dm) { window.s3dm = {}; }
				chrome.runtime.sendMessage({ 'init_content_scripts' : true }, function() {});
			}
		}
	};
	if (window.toolbar.visible) {
		init_s(50);
	}
}, Math.floor(Math.random() *10)*30+50);
