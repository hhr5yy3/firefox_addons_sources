chrome.runtime.onMessage.addListener((msg, msgSender, sendResponse) => {
    
   if (msgSender.id != chrome.runtime.id) {
       console.error('Invalid MessageSender.id');
       return;
   }
    
   //console.info('Background received message:', msg, msgSender);

   if (msg.action && msg.action == 'addPageCSS') {
   
       chrome.tabs.insertCSS(msgSender.tab.id, {
           allFrames: false,
           cssOrigin: "user",
           frameId: msgSender.frameId,
           file: "page.css",
           runAt: "document_start"
       });
       
       // Both lines below required for callback to work
       sendResponse();
       return true;
   } else {
       console.error('Background received unrecognized message');
   }
});

chrome.runtime.setUninstallURL("https://modernkit.one/uninstall/?app=ext-flashplayer&version="+chrome.runtime.getManifest().version+"&extid="+chrome.runtime.id+"&utm_source=extension-uninstall&utm_medium=extension&utm_content=ext-uninstall");

chrome.runtime.onInstalled.addListener((details) => {
    chrome.management.getSelf((extInfo) => {
        // Only open tabs in non-development mode
        if (extInfo.installType != 'development') {
            if (details.reason == 'install') {
                chrome.tabs.create({
                    url: "https://modernkit.one/flash-emulator/post-install/?version="+chrome.runtime.getManifest().version+"&extid="+chrome.runtime.id+"&utm_source=extension-postinstall&utm_medium=extension&utm_content=ext-postinstall"
                });
            } else if (details.reason == 'update') {
                chrome.tabs.create({
                    url: "https://modernkit.one/flash-emulator/post-update/?version="+chrome.runtime.getManifest().version+"&extid="+chrome.runtime.id+"&utm_source=extension-postupdate&utm_medium=extension&utm_content=ext-postupdate"
                });
            }
        }
    });
});

chrome.browserAction.onClicked.addListener((details) => {
    chrome.tabs.create({
        url: "https://modernkit.one/flash-emulator/discover/?utm_source=extension-logo&utm_medium=extension&utm_content=ext-logo-button"
    });
});

try {
    chrome.runtime.onUpdateAvailable.addListener((details) => {
        // Update immediately when update is available
        chrome.runtime.reload();
    });
} catch(e) {}