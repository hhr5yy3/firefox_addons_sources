CFG.URL.BASE = chrome.runtime.getURL('');
CFG.URL.WELCOME = CFG.URL.WEBSITE+'/docs/web-monitor/distill-firefox-add-on/';
CFG.URL.BLANK = 'about:blank';  // loading blank.html causes new tabs to not load the original page
CFG.URL.STICKY = CFG.URL.BASE+'sticky.html';
CFG.URL.DIFFWORKER = '/lib/worker.mjs';

CFG.CLIENT = {
  TYPE: 13,
  NAME: 'firefox_webext',
  INFO: 'Mozilla Firefox',
};
