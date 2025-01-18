;(function() {
  const state = {};
  // const browser = window.chrome;

  const set = (tabId, data) => {
    state[tabId] = {
      ...(state[tabId] || null),
      ...data
    };
  };

  async function isAllowedFileSchemeAccess (tab) {
    if (tab.url && tab.url.startsWith("file://") && !(await browser.extension.isAllowedFileSchemeAccess())) {
      showNotification(
        MESSAGE_TYPES.FILE,
        'This extension currently lacks permission to access local files. Please click here for instructions on how to enable file access in your browser settings.')
    }
  }

  const tryShowExtension = async (tab) => {
    const injected = await AppExtension.isInjected(tab.id);

    if (injected) {
      AppExtension.toggle(tab.id);
    } else {
      AppExtension.injectAppContainer(tab.id);
      AppExtension.injectJS(tab);
    }
  };

  async function onUpdateTab(tabId, changeInfo, tab) {
    // If updated tab matches this one
    if (changeInfo.status === "complete" &&
      state[tabId] &&
      state[tabId].status === "on"
    ) {
      try {
        isAllowedFileSchemeAccess(tab);

        const injected = await AppExtension.isInjected(tab.id);

        if (injected) return;

        AppExtension.injectAppContainer(tab.id);
        AppExtension.injectJS(tab);
      } catch (e) {
        state[tabId].status === "off";
      }
    }
  }


  const MESSAGE_TYPES = {
    INCOGNITO: "INCOGNITO",
    FILE: "FILE"
  }

  function showNotification(notificationId, message) {
    browser.notifications.create(notificationId, {
      "type": "basic",
      "iconUrl": browser.runtime.getURL("32.png"), // specify your icon file here
      "title": "Pixel Perfect Permission - Permissions",
      "message": message,
      // "priority": 2,
    });
  }

  browser.notifications.onClicked.addListener((notificationId) => {
    const link = {
      [MESSAGE_TYPES.INCOGNITO]: "https://www.ghostery.com/blog/enable-extensions-in-incognito",
      [MESSAGE_TYPES.FILE]: "https://support.mozilla.org/en-US/kb/quarantined-domains",
    }[notificationId];
    // Open a URL
    browser.tabs.create({url: link});
  });

  async function onClick(tab) {
    const isOn = state[tab.id] && state[tab.id].status === "on";
    const status = isOn ? "off" : "on";

    isAllowedFileSchemeAccess(tab);

    set(tab.id, {status});
    await tryShowExtension(tab);
  }

  class AppExtension {
    static toggle(tabId) {
      browser.tabs.executeScript(tabId, {
        code: `
    ;(function() {
      const frame = document.querySelector("${AppExtension.APP_CONTAINER_ID}");
    
      if (frame) {
        frame.style.display = frame.style.display ? '' : 'none'
      }
    })();`
      });
    }

    static injectAppContainer(tabId) {
      browser.tabs.executeScript(tabId, {
        code: `
    ;(function() {
      const frame = document.createElement('div');
			frame.id = "${AppExtension.APP_CONTAINER_ID.slice(1)}";
			frame.style.position = 'absolute';
			frame.style.top = 0;
			frame.style.left = 0;
			frame.style.zIndex = 99999999;
			document.body.appendChild(frame);
    })();`
      });
    }

    static async isInjected(tabId) {
      return new Promise((resolve) => {

        browser.tabs.executeScript(tabId, {
          code: `
      ;(function() {
        if( document.querySelector("${AppExtension.APP_CONTAINER_ID}") )  {
          return true
        }
      })();
      `
        }, function(results) {
          if (!results || !results.length) {
            resolve();
            return;  // Permission error, tab closed, etc.
          }

          resolve(results[0]);
        });
      });
    }

    static run() {
      if (!AppExtension.APP_CONTAINER_ID) {
        throw new Error("Not implemented params <APP_CONTAINER_ID>");
      }

      // async actions
      // todo - fast click and hide while page loading
      browser.tabs.onUpdated.addListener(onUpdateTab);
      browser.browserAction.onClicked.addListener(onClick);
    }

    static injectJS() {
      throw new Error("Not implemented !");
    }
  }


// My code
  AppExtension.APP_CONTAINER_ID = "#react-app-ext";
  AppExtension.injectJS = (tab) => {


    browser.tabs.executeScript(tab.id, {
      file: "runtime.js"
    });

    browser.tabs.executeScript(tab.id, {
      file: "chunk.js"
    });

    browser.tabs.executeScript(tab.id, {
      file: "main.js"
    });
  };

  AppExtension.run();


  browser.runtime.setUninstallURL('https://forms.gle/cPf47Q6ve7YRzygQ8', () => {
    if (browser.runtime.lastError) {
      console.error(`Error setting uninstall URL: ${browser.runtime.lastError}`);
    }
  });

// - Menu
  browser.runtime.onInstalled.addListener(() => {
    // Create a parent context menu item
    browser.contextMenus.create({
      id: "pixelPerfectMenu",
      title: "Pixel Perfect Pro",
      contexts: ["page"], // include "page" for right-click on the webpage
    });
  });

// Listener for context menu item clicks
  browser.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "pixelPerfectMenu") {
      onClick(tab);
    }
  });
})();
