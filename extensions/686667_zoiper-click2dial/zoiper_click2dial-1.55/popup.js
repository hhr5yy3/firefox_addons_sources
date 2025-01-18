'use strict';

const addSiteExceptionButton = document.getElementById('add-site-exception');
const addPageExceptionButton = document.getElementById('add-page-exception');
const removePageExceptionButton = document.getElementById('remove-page-exception');
const openSettingsButton = document.getElementById('open-settings');

openSettingsButton.addEventListener('click', () => {
  chrome.runtime.openOptionsPage();

  window.close();
});

getOptions(({exceptions}) => {
  chrome.tabs.query({currentWindow: true, active: true}, (tabs) => {
    const url = tabs[0].url;

    if (!canInjectCode(url)) return;

    if (matchesAnyPattern(url, exceptions)) {
      removePageExceptionButton.classList.remove('hidden');
    } else {
      addSiteExceptionButton.classList.remove('hidden');
      addPageExceptionButton.classList.remove('hidden');
    }

    addSiteExceptionButton.addEventListener('click', () => {
      const parsedURL = new URL(url);

      exceptions.unshift(`*://${parsedURL.hostname}/*`);
      chrome.browserAction.setIcon({path: ICON_PHONE_DETECTION_INACTIVE});
      chrome.storage.local.set({exceptions});

      setTimeout(() => window.close(), 200);
    });

    addPageExceptionButton.addEventListener('click', () => {
      const parsedURL = new URL(url);
      const queryString = parsedURL.search === '' ? '' : '?*';

      exceptions.unshift(`*://${parsedURL.hostname}${parsedURL.pathname}${queryString}`);
      chrome.browserAction.setIcon({path: ICON_PHONE_DETECTION_INACTIVE});
      chrome.storage.local.set({exceptions});

      setTimeout(() => window.close(), 200);
    });

    removePageExceptionButton.addEventListener('click', () => {
      const matchingPatterns = getMatchingPatterns(url, exceptions);

      chrome.browserAction.setIcon({path: ICON_PHONE_DETECTION_ACTIVE});
      chrome.storage.local.set({
        exceptions: exceptions.filter(el => !matchingPatterns.includes(el))
      });

      setTimeout(() => window.close(), 200);
    });
  });
});
