'use strict';

/**
 * Perform maintenance operations when installed or updated.
 */
(function () {

  if (browser.runtime.onInstalled) {
    browser.runtime.onInstalled.addListener(details => {
      // Wait for the first read to complete before trying to modify settings.
      modules.settings.loaded.then(() => {
        switch (details.reason) {
          case 'install':
            onInstalled(details);
            break;
          case 'update':
            onUpdated(details);
            break;
        }
      });
    });
  }

  // Initialize the addon when first installed.
  function onInstalled (details) {
    console.log('foxy gestures installed');

    // Set contextmenu event to "mouseup" when first installed because the default gesture button is 'right'.
    if (browser.browserSettings.contextMenuShowEvent) {
      console.log('contextmenu event set to mouseup');
      browser.browserSettings.contextMenuShowEvent.set({ value: 'mouseup' });
    }
  }

  // Update the settings when the addon is updated.
  function onUpdated (details) {
    let version = modules.helpers.parseAddonVersion(details.previousVersion);
    console.log('foxy gestures update from', version);

    // Starting with 1.1.0 and FF58 the contextmenu event is configurable.
    if ((version.major === 1) && (version.minor <= 1)) {
      browser.storage.sync.get({
        gestureButton: 2
      }).then(results => {
        // Set contextmenu event to mouseup when the button is 'right'.
        if (results.gestureButton === 2) {
          console.log('contextmenu event set to mouseup');
          browser.browserSettings.contextMenuShowEvent.set({ value: 'mouseup' });
        }
      });
    }

    // Migrate storage.sync to storage.local after version 1.2.7.
    if ((version.major === 1) && (version.minor <= 2) && (version.maint <= 7)) {
      browser.storage.sync.get().then(syncStorage => {        
        // Copy all settings into local storage.
        browser.storage.local.set(syncStorage).then(() => {
          // Clear the sync storage.
          console.log('migrated sync storage to local', syncStorage);

          // TODO Not clearing the sync storage just in case of issues with the upgrade.
          // The sync storage can be cleared in the next version of the add-on.
        });
      });
    }
  }

}());
