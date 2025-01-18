/* 
  TU lAma - let Alma be more adroit

  background script
 
  Copyright (C) 2019 Leo Zachl, Technische Universität Wien, Bibliothek

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program.  If not, see <https://www.gnu.org/licenses/>.

*/

function handleMessage(request, sender, sendResponse) {
  if (request.action == 'openPopup'){
    var creating = browser.windows.create({
      url: request.popupURL,
      type: 'popup',
      height: 600,
      width: 800
    });
  } else {
    var gettingCurrent = browser.tabs.query({currentWindow: true, active: true});
    gettingCurrent.then(function (tabs) {
      for (let tab of tabs) {
        browser.tabs.sendMessage(
          tab.id,
          request
        );
        console.log(tab.id); console.log(request);
      }
    });
  }
}

browser.runtime.onMessage.addListener(handleMessage);

browser.webNavigation.onHistoryStateUpdated.addListener(function (details) {
  var gettingCurrent = browser.tabs.query({currentWindow: true, active: true});
  gettingCurrent.then(function (tabs) {
    request = { action: 'historyStateUpdated' };
    for (let tab of tabs) {
      browser.tabs.sendMessage(
        tab.id,
        request
      );
    }
  });
});

browser.storage.local.get().then(function(result){
  // remove old unused settings
  if (result.apiURL != undefined){
    browser.storage.local.remove('apiURL');
    browser.storage.local.remove('apiKey');
    if (!!result.apiURL) browser.permissions.remove({origins: [result.apiURL+'/*']})
  }
  if (result.selectLocation != undefined)
    browser.storage.local.remove('selectLocation');
  if (result.idLinksIsils != undefined)
    browser.storage.local.remove('idLinksIsils');
  if (result.locMap != undefined)
    browser.storage.local.remove('locMap');
  if (result.goto1stEmpty == undefined)
    browser.storage.local.set({ goto1stEmpty: true });
  if (result.addLinks == undefined)
    browser.storage.local.set({ addLinks: true });
  if (result.highContrast == undefined)
    browser.storage.local.set({ highContrast: true });
  if ((!result.warningList || result.warningList.length == 0) && !result.tuwSeen)
    browser.storage.local.set({ warningList: [
      {tag: '970', ind1: '', ind2: '', re: /Dublette|löschen/i, level: 5, msg: 'Dublette bzw. zum Löschen vorgesehen', color: '' },
    ] });
  else if (!result.warningList || result.warningList.length == 0)
    browser.storage.local.set({ warningList: [
      {tag: '970', ind1: '', ind2: '', re: /Dublette/i, level: 5, msg: 'Achtung Dublette!', color: '' },
      {tag: '970', ind1: '', ind2: '', re: /löschen/i, level: 5, msg: 'Achtung, zum Löschen vorgesehen!', color: '' },
      {tag: '997', ind1: '3', ind2: '3', re: /TEMP/, level: 4, msg: `Don't touch! - Nicht bearbeiten!`, color: '#e08600' },
    ] });

  if (result.locationIPURL != undefined && result.locationIPURL != ''){
    if (result.locationIPURL == 'https://almagw.ub.tuwien.ac.at/tulama/locMap.json' || result.locationIPURL == 'https://almagw.ub.tuwien.ac.at/tulama/locMapName.json'){
      result.locationIPURL = 'https://almagw.ub.tuwien.ac.at/tulama/locMap.php'
      browser.storage.local.set({locationIPURL:result.locationIPURL});
    }
    var xhrlm = new XMLHttpRequest();
    console.log('get location for my IP from ' + result.locationIPURL);
    xhrlm.responseType = 'json';
    xhrlm.open("GET", result.locationIPURL + "?nocache_"+(new Date()).getTime());
    xhrlm.onreadystatechange = function () {
      if (xhrlm.readyState === 4 && xhrlm.status === 200) {
        console.log(xhrlm.response);
        browser.storage.local.set({selectedLocation: xhrlm.response});
        result.selectedLocation = xhrlm.response;
      }
    };
    xhrlm.send(null);
  }
});

// tut das noch was?
function handleComplete(r){
  // console.log(r);
  const match = r.url.match(/(yardsMarcEditorService|yardsMarcProfileService)$/);
  if (match){
    browser.tabs.sendMessage(
      r.tabId,
      {action: match[1] + 'Completed'},
      {frameId: r.frameId}
    );
  } else if (r.url.match(/getLocations/)){
    browser.tabs.sendMessage(
      r.tabId,
      {action: 'checkLocation'},
      {frameId: r.frameId}
    );
  }
}

browser.webRequest.onCompleted.addListener(
  handleComplete,
  { urls: ["*://*.alma.exlibrisgroup.com/rep/yards/yardsMarcEditorService",
           "*://*.alma.exlibrisgroup.com/rep/yards/yardsMarcProfileService",
           "*://*.alma.exlibrisgroup.com/internal/airapi/navMenu/getLocations*",
           "*://*.userservices.exlibrisgroup.com/rep/yards/yardsMarcEditorService",
           "*://*.userservices.exlibrisgroup.com/rep/yards/yardsMarcProfileService",
           "*://*.userservices.exlibrisgroup.com/internal/airapi/navMenu/getLocations*"
  ]}
);
