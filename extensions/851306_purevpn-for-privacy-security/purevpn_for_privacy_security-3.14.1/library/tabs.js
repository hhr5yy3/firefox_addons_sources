/*
*   PureVPN
*   by GZ systems Ltd.
*	Everyone is permitted to copy and distribute verbatim copies
*	of this document, but changing it is not allowed.
*
*	This program is distributed in the hope that it will be useful,
*	but WITHOUT ANY WARRANTY; without even the implied warranty of
*	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
*
*	copyright 2016 All Rights are Reserved.
*/

(function() {
  'use strict';
  //! Creates the tab object
  //! param: tabId [required] | url [optional] | domain [optional]
  var TabList = function(iTabId, sUrl, sDomain, bIsPoup, bIsFiltering) {
    this.tabId = iTabId;
    this.url = (sUrl && sUrl !== "") ? sUrl : "";
    this.domain = (typeof sDomain !== "undefined" &&
      sDomain !== "") ? sDomain : "";
    this.timestamp = pVn.makeDate();
    this.allowFiltering = (sUrl === false) ? true : bIsFiltering;
    this.is_popup = bIsPoup;
    this.title = "";
    this.incognito = false;
    return this;
  };
  //! Tabs class
  pVn.tabs = (function() {
    //! create and open custom link
    var openLink = function(sUrl) {
      chrome.tabs.create({url: sUrl});
    };
    var lists = Object.create(null);
    var List = function(iTabId) {
      lists[iTabId] = new TabList(iTabId);
      return lists[iTabId];
    };
    /* var get = function(iTabId) {
      var oTab = lists[iTabId];
      if (!oTab) {
        oTab = new List(iTabId);
      }
      return oTab;
    };*/
    //! Method to create the tab
    //! params: string: tabId [required] | url [optional] | title [optional]
    var create = function(iTabId, sUrl, sTitle, bIncognito) {
      var oTab = lists[iTabId];
      if (!oTab || sUrl !== oTab.url) {
        oTab = new List(iTabId, sUrl);
        oTab.incognito = bIncognito;
        if (sUrl !== "") {
          var sDomain = pVn.uri.getDomain(sUrl);
          oTab.domain = sDomain;
          oTab.url = sUrl;
          oTab.title = sTitle;
        }
      }
      return oTab;
    };
    //! Method add new tab
    //! Params: Object: {id: tabid, url: taburl, title: tabtitle}
    var add = function(oTab) {
      return create(oTab.id, oTab.url, oTab.title, oTab.incognito);
    };
    //! Method update tab properties
    //! Params: tabId [required] | updateProperties : object {} | tab: object {}
    var update = function(iTabId, oUpdateProperties, oTab) {
      if (!oTab) {
        return;
      }

      if (!lists[iTabId]) {
        create(iTabId, oTab.url, oTab.title);
      }

      if (oTab.title) {
        lists[iTabId].title = oTab.title;
      }

      return;
    };
    //! Method delete tab from list
    //! Param: tabId [required]
    var delelted = function(iTabId) {
      delete lists[iTabId];
    };
    //! Method to close the tab
    //! param: tabId [required]
    var remove = function(iTabId) {
      var onRemove = function() {
        delelted(iTabId);
      };
      chrome.tabs.remove(iTabId, onRemove);
    };

    //! Method query opened tabs
    //! params: url [optional] | callback [function|optional] [callback failover: bindTabs]
    var tabQuery = function(sUrl, callback) {
      if (!callback) {
        callback = pVn.nofunc;
      }
      chrome.tabs.query({url: [(sUrl === false) ?
        '<all_urls>' : sUrl]}, callback);
    };
    //! bind tabs - startup function
    //! param: object: tabs
    var bindTabs = function(callback) {
      if (!callback) {
        callback = pVn.nofunc;
      }
      var onQuery = function(oTabs) {
        var i = oTabs.length;
        var oTab;
        while (i--) {
          oTab = oTabs[i];
          pVn.tabs.add(oTab);
        }
        callback();
      };
      tabQuery(false, onQuery);
    };

    var matchUrl = function(url, callback) {
      var getAlltabs = function(oData) {
        var urlFound = false;
        var params = {};
        oData.forEach(function(object) {
          if (url !== "" && urlFound === false) {
            var domainNameTabs = object.url.match(REGEX_EXTRACT_DOMAIN_NAME);
            var domainNameChannel = url.match(REGEX_EXTRACT_DOMAIN_NAME);
            var matchResult = domainNameTabs[2].localeCompare(
              domainNameChannel[2]);
            if (matchResult === 0) {
              var tabId = object.id;
              urlFound = true;
              params = {
                status: urlFound,
                id: tabId,
                active: object.active,
                windowId: object.windowId
              };
              callback(params);
            }
          }
        });
        if (urlFound === false) {
          params = {
            status: urlFound
          };
          callback(params);
        }
      };
      tabQuery(false, getAlltabs);
    };
    var reload = function(iTabId, reloadProperties, callback) {
      if (!iTabId) {
        return;
      }
      if (!callback) {
        callback = pVn.nofunc;
      }
      if (!reloadProperties) {
        reloadProperties = {};
      }
      chrome.tabs.reload(iTabId, reloadProperties, callback);
    };
    var focusTab = function(iTabId, properties, iWindowId, callback) {
      if (!callback) {
        callback = pVn.nofunc;
      }
      var runtimeError = function() {
        if (chrome.runtime.lastError) {
          // console.log(chrome.runtime.lastError);
        }
      };
      chrome.tabs.update(iTabId, properties, callback);
      chrome.windows.update(iWindowId, {focused: true}, runtimeError);
    };

    return {
      add: add,
      del: delelted,
      list: List,
      lists: lists,
      remove: remove,
      update: update,
      openLink: openLink,
      tabQuery: tabQuery,
      bindTabs: bindTabs,
      matchUrl: matchUrl,
      reload: reload,
      focusTab: focusTab
    };
  })();
})();

