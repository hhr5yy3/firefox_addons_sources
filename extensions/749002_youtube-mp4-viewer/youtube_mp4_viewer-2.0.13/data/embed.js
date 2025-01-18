var $ytmp4 = jQuery.noConflict(true);

function applyEmbedOverlay(embedIconURL) {
	$ytmp4('iframe[src*="youtube.com/embed"]').each(function() {
		var iframe = $ytmp4(this);
		var src = iframe.attr('src');
		var div = $ytmp4('<div id="ytmp4-overlay" style="position:absolute;width:100%;height:15px;line-height:15px;text-align:right;"></div>');
		var img = $ytmp4('<img src="'+embedIconURL+'" style="border:none;margin:0 3px 0 0;padding:0;width:15px;height:15px;line-height:15px;cursor:pointer" />');
		
		img.attr('onclick', "location.href='';");
		
		var spos = src.indexOf('/embed/');
		if (spos != -1) {
			var id = src.substr(spos+7);
			var epos = id.indexOf('?');
			if (epos != -1) {
				id = id.substr(0, epos);
			}
			
			img.attr('onclick', "location.href='https://www.youtube.com/watch?v="+id+"&feature=ytmp4';");
		} else {
			img.attr('onclick', "location.href='"+src+"';");
		}
		
		img.appendTo(div);
		div.insertAfter(iframe);
		
		div.width(iframe.width());
		div.offset({ top: iframe.offset().top + iframe.height() - 25, left: iframe.offset().left });
	}); 
}

function embedHandleMessage(message) {
	if (message.action == 'applyEmbedOverlay') {
		applyEmbedOverlay(message.url);
	}
}

browser.runtime.onMessage.addListener(embedHandleMessage);

browser.runtime.sendMessage({'action': 'getEmbedOverlay'});
