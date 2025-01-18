const html = document.documentElement.outerHTML;
const import_url = document.location.href;

// SEND ACTIVE TAB METADATA TO BACKGROUND ON CONTENT SCRIPT INJECTION
browser.runtime.sendMessage({
  action: 'CONTENT_SCRIPT:READY',
  html,
  import_url,
});

// REGISTER LISTENER TO PASS TAB METADATA TO BACKGROUND WHEN REQUESTED
browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.action) {
    case 'ACTIVE_TAB:DATA_REQUESTED':
      const import_url = document.location.href;
      const DOM = document.documentElement;

      sendResponse({ import_url, html: DOM.outerHTML });
      return true;

    case 'GUARANTEE_CONNECTION':
      return sendResponse({ status: 'SUCCESS' });

    default:
      return;
  }
});
