"use strict";

/*
Copyright 2016-2023 Nuxeo

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
(function (window) {
  var app = window.app = window.app || {};
  app.browser = {
    name: 'Firefox',
    getBackgroundPage: function getBackgroundPage(bkg) {
      return bkg(chrome.extension.getBackgroundPage());
    },
    createTabs: function createTabs(url, tabId) {
      return chrome.tabs.query({
        active: true
      }, // eslint-disable-line no-unused-vars
      function (tabs) {
        var index = tabs[0].index;
        return chrome.tabs.create({
          url: url,
          active: false,
          index: index + 1
        });
      });
    }
  };
})(window);