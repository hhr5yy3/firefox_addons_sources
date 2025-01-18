$(document).ready(function(){
	chrome.storage.local.get(null, function(obj){
//		$('#dragger').css('left', ((obj.opacity - .05) / .9 * 225 + 20) + 'px');
//		$('#shape').css('backgroundColor', 'rgba(0, 0, 0, ' + obj.opacity + ')');
		if (obj.color1) $('[name="color1"]').val(obj.color1);
		if (obj.color2) $('[name="color2"]').val(obj.color2);
		if (obj.height) $('[name="height"]').val(obj.height);
	});
	$('button').click(function(){
		var height = $('[name="height"]').val() * 1;
		if (!height) height = 2;
		chrome.storage.local.set({
			color1: $('[name="color1"]').val(),
			color2: $('[name="color2"]').val(),
			height: height
		});
		chrome.tabs.getCurrent(function(tab){
			chrome.tabs.remove(tab.id);
		});
	});
});