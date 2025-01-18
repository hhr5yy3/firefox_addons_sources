var $ytdownloader = jQuery.noConflict(true);

function modHandleMessage(message) {
	if (message.action == '_applyModifications') {
		if (message.type == 'change') {
			var element = $ytdownloader(message.selector);
			if (element) {
				element.html(message.content);
			}
		} else if (message.type == 'append') {
			var element = $ytdownloader(message.selector);
			var existing = $ytdownloader('#'+message.content_id).length;
			if (element && !existing) {
				element.append(message.content);
			}
		} else if (message.type == 'remove') {
			var element = $ytdownloader(message.selector);
			if (element) {
				element.remove();
			}
		}
	} else if (message.action == '_applyActions') {
		var button = $ytdownloader('#youtube-download-button');
		button.unbind('click');
		button.click(function(event) {
			var title = getVideoTitle();
			
			$ytdownloader('#download-mp3').text(title + '.mp3');
			$ytdownloader('#download-mp4').text(title + '.mp4');
			
			$ytdownloader('#download-mp3').parent().unbind('click');
			$ytdownloader('#download-mp3').parent().click(function(event) {
				browser.runtime.sendMessage({'action': 'doDownload', 'url': location.href, 'type': 'mp3'});
			});
			$ytdownloader('#download-mp4').parent().unbind('click');
			$ytdownloader('#download-mp4').parent().click(function(event) {
				browser.runtime.sendMessage({'action': 'doDownload', 'url': location.href, 'type': 'mp4'});
			});
			
			var buttonOffset = $ytdownloader('#youtube-download-button').offset();
			var panelTop = buttonOffset.top + $ytdownloader('#youtube-download-button').height();
			var panelLeft = buttonOffset.left;
			
			$ytdownloader('#youtube-download-panel').css({top: panelTop, left: panelLeft});
			$ytdownloader('#youtube-download-panel').toggle();
		});
		
		$ytdownloader(document).click(function(event) {
			if (event.target.getAttribute('id') != 'youtube-download-button') {
				$ytdownloader('#youtube-download-panel').hide();
			}
		});
	} else if (message.action == '_checkURL') {
		checkURL();
	}
}

browser.runtime.onMessage.addListener(modHandleMessage);

function getVideoTitle() {
	return document.title.replace(' - YouTube', '').trim();
}

function checkURL() {
	if (location.href.indexOf('youtube.com/watch?v=') != -1) {
		browser.runtime.sendMessage({'action': 'setVideoData', 'url': location.href, 'title': getVideoTitle()});
	} else {
		browser.runtime.sendMessage({'action': 'setVideoData', 'url': '', 'title': ''});
	}
}

checkURL();

function checkModifications() {
	var button = $ytdownloader('#youtube-download-button');
	
	if (!button.length) {
		setTimeout(checkModifications, 2000);
	}
	
	browser.runtime.sendMessage({'action': 'getModifications'});
}

checkModifications();

var oldUrl = location.href;
var oldTitle = document.title;

function checkReload() {
	if (oldUrl != location.href || oldTitle != document.title) {
		checkURL();
		checkModifications();
		oldUrl = location.href;
		oldTitle = document.title;
	}
}

// create an observer instance
var observer = new MutationObserver(function(mutations) {
	mutations.forEach(function(mutation) {
		checkReload();
	});
});
 
// configuration of the observer
var config = { attributes: true, childList: true, characterData: true };
 
// pass in the target node, as well as the observer options
observer.observe(document.body, config);
