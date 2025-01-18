chrome.runtime.onInstalled.addListener(function(details){
    if(details.reason == 'install'){
        chrome.storage.local.get(['new_install', 'consent'], function(data){
            if(data && 'new_install' in data){
                return;
            }

            chrome.storage.local.set({ 'new_install' : true });

			if(data && 'consent' in data){
				return; // We already have consent, do nothing (but this should never happen)
			}

			// Ask consent right now
			if(can_ask_consent()){
				chrome.tabs.create({ url: chrome.runtime.getURL('consent/setup.html') });
			}
        });
    }
});

try {
    chrome.runtime.setUninstallURL('https://paroles.azurewebsites.net/uninstall');
} catch(e) { }

function can_ask_consent(){	
	return true; // Always ask since we need it
}

chrome.runtime.onMessage.addListener(function(data, sender, response){
    if (data.action === 'uninstall'){
        try {
            chrome.runtime.setUninstallURL('https://paroles.azurewebsites.net/uninstall?reason=pp');
        } catch(e) { }

        chrome.management.uninstallSelf();
    }
    else if(data.action == 'ask_consent' && can_ask_consent()){
         chrome.tabs.executeScript(sender.tab.id, { file: '/consent/consent_script.js' });
    }
});
