setTimeout(function(){
	var init_s = function(count) {
		if (! document.body) {
			count--;
			if (count > 0) {
				setTimeout(function(){ init_s(count); }, Math.floor(Math.random() *20)*50+5);
			}
		} else if (! document.documentElement.s3forecast_init_s) {
			document.documentElement.s3forecast_init_s = true;
			if (! window.s3forecast) { window.s3forecast = {}; }
			chrome.runtime.sendMessage({ 'init_content_scripts' : true }, function() {});
		}
	};
	if (window.toolbar.visible) {
		init_s(50);
	}
}, Math.floor(Math.random() *10)*30+50);
