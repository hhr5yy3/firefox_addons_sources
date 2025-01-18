
function toBackground(message, optionObject)
{
	if (chrome)
	{
		var request=message;
		if (optionObject && optionObject.channel)
			request['channel']=extensionConfig.appInfo.extensionCodeName+optionObject.channel;
		chrome.runtime.sendMessage(request);
	}
}

var reportButton=document.getElementById("signaler");
reportButton.onclick=function(event) {
	toBackground({action:"reportURL"},{channel:"reportURL"});
	$('#signaler').fadeOut("fast", function() {
		$('#spinner').fadeIn("fast");
		setTimeout(function(){window.close();},1500);
	});
};


var optionsButton=document.getElementById("gears");
optionsButton.onclick=function(event) {
    toBackground({action:"openOptions"},{channel:"openOptions"});
	setTimeout(function(){window.close();},600);
};
