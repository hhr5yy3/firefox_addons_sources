function typeAndSendMessage(query) {
  const checkInterval = setInterval(() => {
    const textarea = document.querySelector('textarea[data-id]');
    if (textarea) {
      clearInterval(checkInterval);
      
      textarea.value = query;
      textarea.dispatchEvent(new Event('input', { bubbles: true }));
      
      const sendButton = textarea.nextElementSibling;
      if (sendButton && sendButton.tagName === 'BUTTON') {
        sendButton.click();
      }
    }
  }, 500);
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'fillChatGPT' && request.query) {
    typeAndSendMessage(decodeURIComponent(request.query));
  }
});