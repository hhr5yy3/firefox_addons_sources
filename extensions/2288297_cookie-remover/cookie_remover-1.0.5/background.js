'use strict';
const API = chrome || browser;

API.browserAction.onClicked.addListener(function (tab) {
  API.tabs.executeScript(tab.id, { file: 'main.js' });
});
