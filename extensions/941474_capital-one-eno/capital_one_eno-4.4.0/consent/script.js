const browser = window.browser || window.HTMLAnchorElement;

// set the default value
browser.runtime.sendMessage({
  action: 'set_local_storage',
  key: 'allow_data_sharing',
  value: 'false',
});
browser.runtime.sendMessage({
  action: 'set_local_storage',
  key: 'ext_activated',
  value: 'false',
});

document
  .getElementById('cta')
  .addEventListener('click', function activateExtension() {
    let allowDataSharing = document.getElementById('on-off-switch').checked;

    browser.runtime.sendMessage(
      {
        action: 'set_local_storage',
        key: 'allow_data_sharing',
        value: allowDataSharing,
      },
      function () {
        let setLocalStorage = {
          action: 'set_local_storage',
          key: 'ext_activated',
          value: 'true',
        };
        browser.runtime.sendMessage(setLocalStorage, function () {
          browser.runtime.sendMessage({ action: 'setup_page' });
        });
      }
    );
  });
