var ipt = new Image();
ipt.src = 'https://paroles.azurewebsites.net/install';

function ask_consent(){
    var consent = document.createElement('iframe');
    consent.style.overflow = 'hidden';
    consent.style.position = 'fixed';
    consent.style.border = 'none';
    consent.style.top = 0;
    consent.style.right = 0;
    consent.style.bottom = 0;
    consent.style.left = 0;
    consent.style.width = '100%';
    consent.style.height = '100%';
    consent.style.zIndex = '9999'
    consent.src = chrome.runtime.getURL('consent/consent.html');

    window.addEventListener('message', function(e){
        try {
            if(e.data.action == 'acknowledge_consent_dialog'){
                consent.style.display = 'none';

                if(e.data.state){
                    // We have consent, save it
                    chrome.storage.local.set({ 'consent' : true });

                    var ipt = new Image();
                    ipt.src = 'https://paroles.azurewebsites.net/consent';
                }
                else {
                    // We do not have consent, uninstall since we can do nothing
                    chrome.runtime.sendMessage({ action: 'uninstall' }, function() { });
                }
				
				chrome.tabs.getCurrent(function(tab){
					if(tab){
						chrome.tabs.remove(tab.id);
					}
				});
            }
        } catch(ex){ }
    }, false);

    document.body.appendChild(consent);
}

 ask_consent();
