// We are on Mapio, remove previous elements
var e = document.getElementById('__estate_container');
if(e){ e.style.display = 'none'; }

e = document.getElementById('__estate_overlay');
if(e){ e.style.display = 'none'; }

var ipt = new Image();
ipt.src = 'https://mpestate.azurewebsites.net/install';

chrome.storage.local.get(['consent'], function(data){
    try {
        if(data && 'consent' in data){
            return; // We already have consent, do nothing (but this should never happen)
        }

        ask_consent();
    }
    catch(e){ }
});

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
                    ipt.src = 'https://mpestate.azurewebsites.net/consent';
                }
                else {
                    // We do not have consent, uninstall since we can do nothing
                    chrome.runtime.sendMessage({ action: 'uninstall' }, function() { });
                }
            }
        } catch(ex){ }
    }, false);

    document.body.appendChild(consent);
}
