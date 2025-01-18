'use strict'

chrome.runtime.onInstalled.addListener(function(details)
{
    if ( details.reason === chrome.runtime.OnInstalledReason.INSTALL )
	{
		var strURLInstall = "https://desktoplux.com/?id=extension_games_install" + chrome.i18n.getMessage("lngURLParameterLngAnd")
		
        chrome.tabs.create({ url: strURLInstall }, function(tab)
		{
			var strURLUninstall = "https://desktoplux.com/?id=extension_games_uninstall" + chrome.i18n.getMessage("lngURLParameterLngAnd")
			
			chrome.runtime.setUninstallURL(strURLUninstall)
        })
    }
	
	saveSetting("install_date", (new Date()).toString())
})

function saveSetting(key, value)
{
	chrome.storage.local.set({[key]: value}, function()
	{
		;//console.log('The "' + key + '" value is set to ' + value)
	})
}
