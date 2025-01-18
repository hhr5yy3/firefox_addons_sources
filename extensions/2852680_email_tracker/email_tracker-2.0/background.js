const url = "https://mail.google.com/*";
const emailtrackURL = "https://app.emailtracker.cc/api"; // production

chrome.runtime.onMessage.addListener(({ type, data }, sender, sendResponse) => {
  console.log('all data is   ', {
    type,
    data,
    sender,
    sendResponse
  });
  
  switch (type) {
    case "inboxsdk__injectPageWorld":
      if (chrome.scripting) {
        // MV3
        chrome.scripting.executeScript({
          target: { tabId: sender.tab.id },
          world: "MAIN",
          files: ["pageWorld.js"],
        });
      }
      sendResponse(true);
      break;
    
    case "check_account":
      if (!data) {
        sendResponse(true);
        return true;
      }
      var requestOptions = {
        method: 'GET'
      };
      fetch(`${emailtrackURL}/check_user?email=${data && data.email}`, requestOptions)
        .then(response => response.text())
        .then(result => { 
          console.log('result', result); 
          sendResponse(result);
        })
        .catch(error => console.log('error', error));
      return true; // Indicates that the response will be sent asynchronously
    
    default:
      return true;
  }
});

// On Install, Please Refresh
chrome.runtime.onInstalled.addListener(() => {
  console.log("Installed");
  if (chrome.tabs) {
    chrome.tabs.query({ url }, (tabs) => {
      // Iterate over the Array of Tabs
      tabs.forEach(({ id }) => chrome.tabs.reload(id));
    });
  }
});