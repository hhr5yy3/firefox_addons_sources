'use strict'

chrome.runtime.onInstalled.addListener(function(details)
{
    if ( details.reason === chrome.runtime.OnInstalledReason.INSTALL )
	{
		var strURLInstall = "https://mara.photos/help/?id=58" + chrome.i18n.getMessage("lngURLParameterLngAnd")
		
        chrome.tabs.create({ url: strURLInstall }, function(tab)
		{
			var strURLUninstall = "https://mara.photos/help/?id=59" + chrome.i18n.getMessage("lngURLParameterLngAnd")
			
			chrome.runtime.setUninstallURL(strURLUninstall)
        })
    }
})

browser.browserAction.onClicked.addListener((tab)=>
{
	chrome.tabs.create({url: "app/index.html"})
})
