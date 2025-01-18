var videoURL = '';

function ypHandleMessage(message) {
	if (message.action == '_setVideoData') {
		videoURL = message.url;
		document.getElementById('download-mp3').innerText = message.title + '.mp3';
		document.getElementById('download-mp4').innerText = message.title + '.mp4';
	}
}

browser.runtime.onMessage.addListener(ypHandleMessage);

browser.runtime.sendMessage({'action': 'getVideoData'});

window.onload = function() {

	document.getElementById('download-mp3').onclick = function() {
		browser.runtime.sendMessage({'action': 'doDownload', 'url': videoURL, 'type': 'mp3'});
		window.close();
	}

	document.getElementById('download-mp4').onclick = function() {
		browser.runtime.sendMessage({'action': 'doDownload', 'url': videoURL, 'type': 'mp4'});
		window.close();
	}

}


