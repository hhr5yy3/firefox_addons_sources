(function() {
  'use strict';
  const protocolToStoreName = {
    'moz-extension:': 'addons.mozilla.org',
    'chrome-extension:': 'chrome.google.com',
  };
  const propsString = `?utm_source=${protocolToStoreName[window.location.protocol] || 'store_name_not_found'}&utm_medium=referral&utm_campaign=knopka_importa`;
  const chromeRegexp = /(^|\s)Chrome\s*\/\s*(6[7-9]|[7-9][0-9]|\d{3,})(\.|\s|$)/;
  const userAgentIsChrome = navigator.userAgent.match(chromeRegexp);
  let currentListItemNumber = 1;

  document.querySelectorAll('.js-add-marks').forEach(link => {
    link.setAttribute('href', `${link.getAttribute('href')}${propsString}`);
  });

  if (!userAgentIsChrome) {
    document.querySelectorAll('.js-chrome-only-visible').forEach(element => {
      element.style.display = 'none';
    });
  }

  document.querySelectorAll('.js-list-item-number').forEach(element => {
    if (userAgentIsChrome || !element.classList.contains('js-chrome-only-visible')) {
      element.innerText = `${currentListItemNumber}. `;
      currentListItemNumber = currentListItemNumber + 1;
    }
  });
})();
