chrome.options.opts.about = `
  <p>StubTabs for Firefox</p>
  <p>Contact support@stubtabs.com for help</p>
`;

chrome.options.addTab('License', [
  { type: 'h3', desc: 'License' },
  { name: 'license', type: 'object', options: [
    { name: 'core', type: 'text', default: "", desc: 'StubTabs License Key' }
  ] },
  { type: 'html', html: 'Go <a href=https://www.stubtabs.com/setting-up-stubtabs-firefox/>here</a> for help finding your license key.' },
]);

chrome.options.addTab('General', [
  { type: 'h3', desc: 'Features' },
  { name: 'cookies', type: 'object', options: [
    { name: 'enable', default: false, desc: 'Allow StubTabs to Delete Cookies' },
  ] },
  { name: 'twofa', type: 'object', options: [
    { name: 'enable', default: true, desc: 'Enable 2FA code forwarding support' },
  ] },
  { name: 'canvas', type: 'object', options: [
    { name: 'disable', default: true, desc: 'Beta version' },
  ] },
  { type: 'html', html: '<br>Go <a href= https://www.stubtabs.com/2fa_codes/>here</a> for instructions on 2FA code forwarding feature.'},
]);

chrome.options.addTab('Third Party', [
  { type: 'html', html: '<img src=\"images/1ticket.png\" height=\"30\"></img>' },
  { name: '1ticket', type: 'object', options: [
    { name: 'enable', default: false, desc: 'Enable 1Ticket Support' },
    { name: 'key', type: 'text', default: "" , desc: '1Ticket API Key' }
  ] },
  { type: 'html', html: '<br><h2>By enabling 1Ticket support you agree to allow the StubTabs extension to collect and send Ticketmaster email and order numbers to 1Ticket.</h2>'},
]);

chrome.options.addTab('NetNut', [
  { type: 'h3', desc: 'NetNut' },
  { name: 'netnut', type: 'object', options: [
    { name: 'enable', default: false, desc: 'Enable NetNut Support' },
    { name: 'settings', type: 'object', options: [
        { name: 'nonsticky', default: false, desc: 'Nonstick IP' },
        { type: 'html', html: 'Nonstick will change IP with each webrequest.' },
    ] },
  ] },
  { type: 'html', html: '<br>Go <a href= https://www.stubtabs.com/netnut/>here</a> for instructions on using proxy per tab.'},
]);
