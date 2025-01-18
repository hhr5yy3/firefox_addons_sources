
chrome.runtime.onInstalled.addListener(function(details) {
	if (details.reason == "install" && !localStorage.landing && !localStorage['first_date_installation_ntpromo'])
	{
		localStorage['first_date_installation_ntpromo'] = new Date().getTime();
		chrome.management.getSelf(function(info) {
			var ext_name = encodeURIComponent(info.name);
			chrome.tabs.create({
				url: 'http://promo-newtab.club/?cid=ntpromo_carracing&ext=' + ext_name
			});
		});
	}
});
chrome.management.getSelf(function(info) {
	var ext_name = encodeURIComponent(info.name);
	chrome.runtime.setUninstallURL('http://promo-newtab.club/?source_type=uninstall&cid=ntpromo_carracing&ext=' + ext_name);
});
