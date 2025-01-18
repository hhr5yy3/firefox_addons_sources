"use strict";

function get_param( name )
{
	name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");

	var regexS = "[\\?&]"+name+"=([^&#]*)";
	var regex = new RegExp( regexS );
	var results = regex.exec( window.location.href );

	if ( results == null )
		return "";
	else
		return results[1];
}

window.addEventListener("load", function()
{
	document.getElementById("idnovideo1").innerText = chrome.i18n.getMessage("idnovideo1");
	document.getElementById("idnovideo2").innerText = chrome.i18n.getMessage("idnovideo2");
	document.getElementById("idnovideo3").innerText = chrome.i18n.getMessage("idnovideo3");
	document.getElementById("idnovideo4").innerText = chrome.i18n.getMessage("idnovideo4");
	document.getElementById("idnovideo5").innerText = chrome.i18n.getMessage("idnovideo5");

    var url = get_param("url");
    var curElement = document.getElementById("idSubmit");
    curElement.addEventListener('click', function(data)
    {
		window.open("https://www.videodownloaderultimate.com/?p=submit&url="+url);
        //UploadUrl( url);
    });
    
}, false);
