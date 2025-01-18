function hexToRgb(hex) {
	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? parseInt(result[1], 16) + ', ' + parseInt(result[2], 16) + ', ' + parseInt(result[3], 16) : null;
}
function setStyles() {
	chrome.storage.local.get(null, function(obj){
		if (obj.color1) $('#la-player-line').css('backgroundColor', 'rgba(' + hexToRgb(obj.color1) + ', .5)');
		if (obj.color2) $('#la-player-line div').css('backgroundColor', obj.color2);
		if (obj.height) $('#la-player-line').css('height', obj.height + 'px');
	});
}
chrome.storage.onChanged.addListener(function(obj){
	if (obj.color1 && obj.color1.newValue) $('#la-player-line').css('backgroundColor', 'rgba(' + hexToRgb(obj.color1.newValue) + ', .5)');
	if (obj.color2 && obj.color2.newValue) $('#la-player-line div').css('backgroundColor', obj.color2.newValue);
	if (obj.height && obj.height.newValue) $('#la-player-line').css('height', obj.height.newValue + 'px');
});

if (!$('body').attr('laYoutubeLine')) {
	$('body').attr('laYoutubeLine', 'true');
	$(document).ready(function(){
		function wait() {
			if ($('.ytp-live').length)
				setTimeout(wait, 2000);
			else {
				$('#la-player-line').css('display', 'block');
				setLine();
			}
		}
		function setLine() {
			if ($('.ytp-live').length) {
				$('#la-player-line').css('display', 'none');
				wait();
				return false;
			}
			var block = $('video');
			if (block.length) {
				var proc = block[0].currentTime / block[0].duration;
				$('#la-player-line div').css('width', (proc * 100) + '%');
			}
			setTimeout(setLine, 500);
		}

		function addLine() {
			if ($('#movie_player').length) {
				$('#movie_player').append('<div id="la-player-line"><div></div></div>');
				setStyles();
				setLine();
			}
			else setTimeout(addLine, 500);
		}
		addLine();
	});
}
else setStyles();