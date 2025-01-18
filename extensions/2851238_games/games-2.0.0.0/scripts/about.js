'use strict'

document.addEventListener('DOMContentLoaded', function()
{	
	localizeHtmlPage()
})

function localizeHtmlPage()
{
    // Localize by replacing __MSG_***__ meta tags
	// https://stackoverflow.com/questions/25467009/internationalization-of-html-pages-for-my-google-chrome-extension
	
    var objects = document.getElementsByTagName('html')
    for ( var j = 0; j < objects.length; j++ )
    {
        var obj = objects[j]

        var valStrH = obj.innerHTML.toString()
        var valNewH = valStrH.replace(/__MSG_(\w+)__/g, function(match, v1)
        {
            return v1 ? chrome.i18n.getMessage(v1) : ""
        })

        if ( valNewH != valStrH )
        {
            obj.innerHTML = valNewH
        }
    }
}
