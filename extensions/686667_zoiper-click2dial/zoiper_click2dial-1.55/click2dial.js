'use strict';

if (typeof Click2Dial === 'undefined') {
  var Click2Dial = {};
}

Click2Dial.logo_source = chrome.runtime.getURL('images/logo20.png');
Click2Dial.logo_height = 20;
Click2Dial.logo_width = 20;
Click2Dial.logo_alt = BRANDING_NAME;

Click2Dial.flag_source = chrome.runtime.getURL('images/flags/%s.png');
Click2Dial.flag_height = 16;
Click2Dial.flag_width = 28;

Click2Dial.skipElements = ['A', 'TEXTAREA', 'SELECT', 'SCRIPT', 'BUTTON', 'INPUT', 'OBJECT', 'EMBED', 'IFRAME', 'HEAD', 'NOSCRIPT', 'STYLE', 'CODE'];

Click2Dial.inspectNode = function (node) {
  if (node.nodeType === Node.TEXT_NODE) {
    this.replacePhone(node);
  } else if (node.nodeType === Node.ELEMENT_NODE) {
    if (node.isContentEditable) return;

    if (this.skipElements.includes(node.tagName)) return;

    for (const childNode of node.childNodes) {
      this.inspectNode(childNode);
    }
  }
};

Click2Dial.replacePhone = function (node) {
  const {nodeValue} = node;
  const fragment = document.createDocumentFragment();
  const phoneIterator = libphonenumber.searchPhoneNumbersInText(nodeValue, Click2Dial.countryCode);

  let cursor = 0;

  for (const phone of phoneIterator) {
    if (!phone.number.isValid()) continue;

    if (cursor !== phone.startsAt) {
      const precedingText = nodeValue.substring(cursor, phone.startsAt);
      const precedingTextNode = document.createTextNode(precedingText);
      fragment.appendChild(precedingTextNode);
    }

    const phoneText = nodeValue.substring(phone.startsAt, phone.endsAt);

    const span = document.createElement('span');
    span.setAttribute('style', 'display:inline');
    const {options} = this;
    if (options.displayLogo) {
      const logo = document.createElement('img');
      logo.setAttribute('src', Click2Dial.logo_source);
      logo.setAttribute('height', Click2Dial.logo_height);
      logo.setAttribute('width', Click2Dial.logo_width);
      logo.setAttribute('style', 'margin:0 2px;padding:0;width:' + Click2Dial.logo_width + 'px;height:' + Click2Dial.logo_height + 'px;');
      logo.setAttribute('alt', Click2Dial.logo_alt);
      span.appendChild(logo);
    }

    const anchor = document.createElement('a');
    if(phone.number.ext) {
      const extString = phoneText.match(/[a-zA-Z\.]+/g).join('');
      const phoneTextWithExt = phoneText.split(extString);
      anchor.setAttribute('href', BRANDING_SCHEME + phoneTextWithExt[0].replace(/[^\d\+]/g, ''));
      anchor.appendChild(document.createTextNode(phoneTextWithExt[0]));
      span.appendChild(anchor);
      if(phoneTextWithExt[1] !== undefined) {
        span.appendChild(document.createTextNode(extString));
        span.appendChild(document.createTextNode(phoneTextWithExt[1]));
      }
    } else {
      anchor.setAttribute('href', BRANDING_SCHEME + phoneText.replace(/[^\d\+]/g, ''));
      anchor.appendChild(document.createTextNode(phoneText));
      span.appendChild(anchor);
    }
    if (options.displayRegionFlag) {
      const flag = document.createElement('img');
      flag.setAttribute('src', Click2Dial.flag_source.replace('%s', phone.number.country.toLowerCase()));
      flag.setAttribute('height', Click2Dial.flag_height);
      flag.setAttribute('width', Click2Dial.flag_width);
      flag.setAttribute('style', 'margin:0 2px;padding:0;width:' + Click2Dial.flag_width + 'px;height:' + Click2Dial.flag_height + 'px;');
      flag.setAttribute('alt', phone.number.country);
      span.appendChild(flag);
    }
    fragment.appendChild(span);
    cursor = phone.endsAt;
  }

  // A check to prevent unnecessary DOM modifications when no phones are found
  if (cursor !== 0) {
    if (cursor !== nodeValue.length) {
      const followingText = nodeValue.substring(cursor, nodeValue.length);
      const followingTextNode = document.createTextNode(followingText);
      fragment.appendChild(followingTextNode);
    }
    node.parentNode.replaceChild(fragment, node);
  }
};

Click2Dial.init = function () {
  getOptions((options) => {
    try {
      Click2Dial.countryCode = options.defaultRegion || navigator.language.substr(-2).toUpperCase();
      libphonenumber.getCountryCallingCode(Click2Dial.countryCode); // Fallback to "US" for invalid countries
    } catch (ex) {
      Click2Dial.countryCode = 'US';
    }
    this.options = options;
    this.observer = new MutationObserver(this.deferInspection.bind(this));
    this.inspect();
  });
};

Click2Dial.deferInspection = function () {
  clearTimeout(this.inspectionTimeout);
  this.inspectionTimeout = setTimeout(this.inspect.bind(this), 1000);
};

Click2Dial.inspect = function () {
  this.observer.disconnect();
  this.inspectNode(document.body);
  this.observer.observe(document.body, {
    childList: true,
    characterData: true,
    subtree: true,
  });
};

Click2Dial.init();
