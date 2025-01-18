chrome.runtime.onInstalled.addListener(function(details){
    if(details.reason == 'install'){
        chrome.storage.local.get(['new_install'], function(data){
            if(data && 'new_install' in data){
                return;
            }

            chrome.storage.local.set({ 'new_install' : true });

            // Ask consent right now
            ask_consent();
        });
    }
});

try {
    chrome.runtime.setUninstallURL('https://mpestate.azurewebsites.net/uninstall');
} catch(e) { }

function can_ask_consent(){	
	return true; // Always ask since we need it
}

function ask_consent(){
    chrome.tabs.query({ 'active': true, 'lastFocusedWindow': true }, function(tabs){ // This will show the consent dialog on Mapio
        if(tabs.length > 0 && can_ask_consent()){
            chrome.tabs.executeScript(tabs[0].id, { file: '/consent/consent_script_install.js' });
        }
    });
}

chrome.runtime.onMessage.addListener(function(data, sender, response){
    if (data.action === 'uninstall'){
        try {
            chrome.runtime.setUninstallURL('https://mpestate.azurewebsites.net/uninstall?reason=pp');
        } catch(e) { }

        chrome.management.uninstallSelf();
    }
    else if(data.action == 'ask_consent' && can_ask_consent()){
         chrome.tabs.executeScript(sender.tab.id, { file: '/consent/consent_script.js' });
    }
});
