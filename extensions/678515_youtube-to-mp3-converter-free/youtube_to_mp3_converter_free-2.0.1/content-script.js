var mp3button_timeout = null;
function add_mp3download_button() {
	var player = document.getElementById('player-container-outer');
	if (player != null) {
		// remove old button
		if (document.getElementById("youtube2mp3-button")) {
			(elem=document.getElementById("youtube2mp3-button")).parentNode.removeChild(elem);
		}
		setTimeout(function() {
			var e = document.createElement('div');
			if (window != window.top) {
				var mp3button = "<a target=\"_blank\" id=\"youtube2mp3-button\" href=\"https://ytmp3free.cc/en/?link=" + document.location.href + "&utm_source=chromewebstore&utm_medium=addons&utm_campaign=overlay\" style=\"position: absolute; background: #dd2c28; padding: 5px 10px; color: #fff; top: 0; left: 0; z-index: 999; text-decoration: none;\"><img width=\"14\" style=\"vertical-align: -2px;\" src=\"" + browser.runtime.getURL("icon-download.png") + "\" />&nbsp;" + "Youtube To MP3" + "</a>";
			} else {
				var mp3button = "<a target=\"_blank\" id=\"youtube2mp3-button\" href=\"https://ytmp3free.cc/en/?link=" + document.location.href + "&utm_source=chromewebstore&utm_medium=addons&utm_campaign=overlay\" style=\"position: absolute; background: #dd2c28; padding: 5px 10px; color: #fff; top: -24px; left: 0; z-index: 999; text-decoration: none;\"><img width=\"14\" style=\"vertical-align: -2px;\" src=\"" + browser.runtime.getURL("icon-download.png") + "\" />&nbsp;" + "Youtube To MP3" + "</a>";
			}
			e.innerHTML = mp3button;

			// player.innerHTML = mp3button + player.innerHTML;
			// while (e.firstChild) {
				player.appendChild(e.firstChild);
			// }
			mp3button_timeout = setTimeout(function() {
				document.getElementById("youtube2mp3-button").style.visibility = 'hidden';
			}, 1000);
			document.getElementById('player-container-outer').addEventListener("mousemove", function() {
				document.getElementById("youtube2mp3-button").style.visibility = 'visible';
				clearTimeout(mp3button_timeout);
				mp3button_timeout = setTimeout(function() {
					document.getElementById("youtube2mp3-button").style.visibility = 'hidden';
				}, 1000);
			});
		}, 2000);
	}
}

(document.body || document.documentElement).addEventListener('transitionend',
  function(/*TransitionEvent*/ event) {
    if (event.propertyName === 'width' && event.target.id === 'progress') {
        add_mp3download_button();
    }
}, true);

add_mp3download_button();
