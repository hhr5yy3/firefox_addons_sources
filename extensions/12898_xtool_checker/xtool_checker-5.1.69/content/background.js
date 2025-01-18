
chrome.webNavigation.onDOMContentLoaded.addListener(
	function(info) {
		if (info.frameId == 0)
		{
			//UpdateButtonSettings(info.tabId);
			 XTBrowserTools.UpdateButtonSettingsAddButtons(info.tabId);			   
		}
	}
);

window.addEventListener("load",  XToolChecker.checker_init, false);
window.addEventListener("unload", XToolChecker.checker_uninit, false);

