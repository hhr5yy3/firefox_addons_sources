chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    // Check if the updated tab's URL matches the specified pattern and if the tab is still loading
    if (changeInfo.url && changeInfo.url.includes('www.skroutz.gr/s')) {
        // Query the active tab in the current window to ensure we are sending messages to the correct tab
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            // If no tabs are found (which is unlikely), return to avoid errors
            if (tabs.length === 0) return;
            
            // Send a message to the content script in the active tab
            chrome.tabs.sendMessage(tabs[0].id, {method: "skroutzRefreshed2"}, function(response) {
                // Handle potential errors, such as the content script not being ready to receive the message
                if (chrome.runtime.lastError) {
                    return; // Return to avoid further execution if there was an error
                }
            });
        });
    }
});

