'use strict';

/*global chrome:false */

chrome.browserAction.onClicked.addListener(function(aTab) {
  chrome.tabs.create({'url': 'https://web.telegram.org/', 'active': true});
});