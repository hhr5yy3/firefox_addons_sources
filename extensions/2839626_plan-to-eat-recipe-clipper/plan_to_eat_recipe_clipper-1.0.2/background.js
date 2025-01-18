// DECLARE EXTENSION STATE MANAGER

class MessagingManager {
  constructor() {
    this.activeTabMetadata = {};

    // REACT APP STATE
    this.isStale = true;

    // CONTENT SCRIPT STATE
    this.isContentScriptLoaded = false;
    this.isConnectionReady = true;

    this.blacklistedUrls = [
      'chrome://',
      'brave://',
      'https://addons.mozilla.org',
      'about:',
      'moz-extension://',
      'file://',
    ];
  }

  setActiveTabMetadata(payload) {
    this.activeTabMetadata = payload;
  }

  canPollContentScript() {
    return this.isContentScriptLoaded && this.isConnectionReady;
  }

  shouldPollContentScript() {
    return this.isStale;
  }

  validateUrl(targetUrl) {
    return this.blacklistedUrls.every(
      (urlFragment) => !targetUrl.startsWith(urlFragment),
    );
  }

  pollContentScript() {
    browser.tabs.query({ active: true, currentWindow: true }, ([activeTab]) => {
      if (this.validateUrl(activeTab.url)) {
        browser.tabs.sendMessage(
          activeTab.id,
          { action: 'ACTIVE_TAB:DATA_REQUESTED' },
          (response) => {
            if (browser.runtime.lastError) {
              console.log(browser.runtime.lastError);
            } else {
              this.setActiveTabMetadata(response);
              this.isStale = false;
            }
          },
        );
      }
    });
    return true;
  }

  syncReactApp() {
    if (this.canPollContentScript() && this.shouldPollContentScript()) {
      this.pollContentScript();
    }
  }

  onContentScriptReady() {
    this.isContentScriptLoaded = true;
  }

  onTabCreated() {
    this.isContentScriptLoaded = false;
    this.isConnectionReady = false;
    this.isStale = true;
  }

  onTabActivated(activatedTab) {
    this.guaranteeConnection(activatedTab.tabId);
    this.isStale = true;
  }

  onTabUpdated(tabId, changeInfo, tab) {
    if (!tab.active || !changeInfo.status) return;

    if (changeInfo.status !== 'complete') {
      this.isConnectionReady = false;
    } else {
      this.isConnectionReady = true;
    }

    if (tab.url !== messagingManager.activeTabMetadata.import_url) {
      this.isStale = true;
    }
  }

  async guaranteeConnection(activeTabId) {
    this.isContentScriptLoaded = false;
    const activeTab = await browser.tabs.get(activeTabId);
    if (this.validateUrl(activeTab.url)) {
      browser.tabs.sendMessage(
        activeTabId,
        { action: 'GUARANTEE_CONNECTION' },
        (response) => {
          if (browser.runtime.lastError) {
            browser.tabs.executeScript(activeTabId, {
              file: 'content-scripts/reloadStaleTab.js',
            });
            return false;
          } else if (response.status === 'SUCCESS') {
            this.isContentScriptLoaded = true;
            return true;
          }
        },
      );
    }
  }
}

const messagingManager = new MessagingManager();

// REGISTER RUNTIME MESSAGING LISTENERS
// TELLS BACKGROUND SCRIPT WHEN OTHER MEMBERS ARE AVAILABLE
browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.action) {
    case 'REACT_APP:HEARTBEAT':
      messagingManager.syncReactApp();

      return sendResponse({
        ...messagingManager.activeTabMetadata,
        isImportAvailable: messagingManager.canPollContentScript(),
      });

    case 'CONTENT_SCRIPT:READY':
      messagingManager.onContentScriptReady();

      const { action, ...messageRest } = message;
      return messagingManager.setActiveTabMetadata(messageRest);

    default:
      return;
  }
});

// SET STALE STATE ON TAB CHANGE
browser.tabs.onActivated.addListener((activatedTab) =>
  messagingManager.onTabActivated(activatedTab),
);

// TOGGLE CONNECTION STATE ON TAB STATUS UPDATE
browser.tabs.onUpdated.addListener((...params) =>
  messagingManager.onTabUpdated(...params),
);

// RESET STALE AND CONNECTION STATE ON NEW TAB CREATED
browser.tabs.onCreated.addListener(() => {
  messagingManager.onTabCreated();
});

// SET DEFAULT ICON BUTTON BEHAVIOR
browser.browserAction.onClicked.addListener(() => {
  browser.sidebarAction.open();
});
