// Create context menu item
chrome.contextMenus.create({
    id: "sendToWhatsapp",
    title: "Send to WhatsApp",
    contexts: ["selection"]
  });
  
  // Listen for context menu click
  chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId === "sendToWhatsapp") {
      chrome.tabs.create({ url: `https://web.whatsapp.com/send?text=${encodeURIComponent(info.selectionText)}` });
    }
  });
  
  // Handle browser action click to open WhatsApp Web
  chrome.browserAction.onClicked.addListener(function() {
    chrome.tabs.create({ url: "https://web.whatsapp.com" });
  });
  
  // Monitor for unread messages (example placeholder logic)
  setInterval(() => {
    chrome.tabs.query({ url: "*://web.whatsapp.com/*" }, function(tabs) {
      if (tabs.length > 0) {
        chrome.tabs.sendMessage(tabs[0].id, { command: "checkUnread" }, function(response) {
          if (response && response.unreadCount > 0) {
            chrome.browserAction.setBadgeText({ text: response.unreadCount.toString() });
            chrome.notifications.create('whatsappNotification', {
              type: 'basic',
              iconUrl: 'icon.png',
              title: 'WhatsApp Web',
              message: `You have ${response.unreadCount} unread messages.`
            });
          } else {
            chrome.browserAction.setBadgeText({ text: '' });
          }
        });
      }
    });
  }, 10000); // Check every 10 seconds
  