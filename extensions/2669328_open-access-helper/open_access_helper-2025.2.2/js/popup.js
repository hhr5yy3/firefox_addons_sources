
function localizeHtmlPage() {
  // Localize by replacing __MSG_***__ meta tags
  const objects = document.getElementsByTagName('html');
  for (let j = 0; j < objects.length; j++) {
    const obj = objects[j];

    const valStrH = obj.innerHTML.toString();
    const valNewH = valStrH.replace(/__MSG_(\w+)__/g, (match, v1) => (v1 ? chrome.i18n.getMessage(v1) : ''));

    if (valNewH != valStrH) {
      obj.innerHTML = valNewH;
    }
  }
}

localizeHtmlPage();

chrome.windows.getAll({
  populate: true,
}, (windows) => {
  // For all windows
  for (let i = 0; i < windows.length; i++) {
    const currentWindow = windows[i];
    // For all tabs in that window
    for (let j = 0; j < currentWindow.tabs.length; j++) {
      const currentTab = currentWindow.tabs[j];
      // Only send message to http or https pages, not ftp://, chrome:// etc.
      if (currentTab.active && currentTab.url.match(/(http|https):\/\//gi)) {
        chrome.tabs.sendMessage(currentTab.id, { mode: 'popup' }, (response) => {
          if(chrome.runtime.lastError != null || response == undefined) {
            return;
          }
          // console.log(response);
          const element = document.getElementById('popupanswer');
          let oabutton = '';
          let subbutton = '';
          let citationbutton = '';
          let proxybutton = '';
          let institute = '';
          let buttonCount = 0;
          let illButtonCount = 0;
          let retractionButton = '';
          if (response != undefined && response.data != undefined && response.data.oaurl != '' && response.data.oastatus != '') {
            let oaurl = '';
            if(Array.isArray(response.data.oaurl)){ 
              oaurl = response.data.oaurl[0];
            }
            else {
              oaurl = response.data.oaurl;
            }
            if (response.data.oaurl.indexOf('https://openaccessbutton.org/request?') === 0) {
              oabutton = translateOAH(response, 'popup_oabutton_001', [oaurl, response.data.oastatus]);
              buttonCount += 1;
            } else if(response.data.isIll === 'ill') {
              oabutton = translateOAH(response, 'popup_oabutton_003', [oaurl, response.data.oastatus]);
              buttonCount += 1;
              illButtonCount += 1;
            } else if(response.data.isIll === '✔'){
              oabutton = translateOAH(response, 'popup_oabutton_006', [oaurl, response.data.oastatus]);
              buttonCount += 1;
            } 
            else {
              oabutton = translateOAH(response, 'popup_oabutton_002', [oaurl, response.data.oastatus]);
              buttonCount += 1;
            }
          }

          if (response != undefined && response.data != undefined && response.data.substatus != '' && response.data.suburl != '') {
            subbutton = translateOAH(response, 'popup_oabutton_007', [response.data.suburl, 'EBSCOhost']);
            buttonCount += 1;
          }

          if (response != undefined && response.data != undefined && response.data.citationcount > 0) {
            citationbutton = translateOAH(response, 'popup_citationbutton_001', [response.data.citationurl, response.data.citationcount.toString()]);
            buttonCount += 1;
          }

          if(response != undefined && response.data != undefined && response.data.rw_label != undefined && response.data.rw_label != ''){
            retractionButton = translateOAH(response, 'popup_oabutton_008', [response.data.rw_url, response.data.rw_label]);
            buttonCount += 1;
          }

          if (response != undefined && response.configuration != undefined && response.configuration.name != undefined && response.configuration.name != '') {
            institute = response.configuration.name;
          }

          if (response != undefined && response.configuration != undefined && response.configuration.ezproxy && response.configuration.url != '' && !onProxiedDomain(response.configuration.url, response.data.currenturl) && response.data.shouldProxy) {
            const newUrl = new URL(response.data.currenturl);
            let urltoproxy = newUrl.hostname;
            if (urltoproxy.length > 25) {
              urltoproxy = `${urltoproxy.substring(0, 25)}&hellip;`;
            }
            let proxyUrl = response.configuration.url + response.data.currenturl;
            if (response.configuration.url.includes("go.openathens.net") || response.configuration.url.includes("qurl=")) {
              proxyUrl = response.configuration.url + encodeURIComponent(response.data.currenturl);
            }
            proxybutton = translateOAH(response, 'popup_proxybutton_001', [institute, proxyUrl, urltoproxy]);
            buttonCount += 1;
          }

          
          let addonButton = '';
          if(response != undefined && response.configuration.ill && response.data.doi != '' && response.data.doi != '-' && illButtonCount == 0){
            let illUrl = response.configuration.illurl + response.data.doi;
            let illLabel = translateOAH(response, 'content_ill_002');
            
            if(buttonCount < 3){
              //we will simply add a new button
              addonButton = translateOAH(response, 'popup_oabutton_005', [illUrl, illLabel]);
            }
            else{
              addonButton = translateOAH(response, 'popup_oabutton_004', [illUrl, illLabel])
            }
          }

          let html = `${retractionButton}${oabutton}${subbutton}${citationbutton}${proxybutton}${addonButton}`;

          if (html == '' && response != undefined && onProxiedDomain(response.configuration.url, response.data.currenturl)) {
            html = translateOAH(response, 'popup_empty_responses_proxied');
          }
          else if(html == '') {
            html = translateOAH(response, 'popup_empty_responses');
          }
          element.innerHTML = html;
          addButtonListener();
          addConfigurationListener();
          addSupportListener();
          addHideListener();
          addSeeExampleListener();
        });
      } else {
        const element = document.getElementById('popupanswer');
        //html = chrome.i18n.getMessage('popup_non_http_source');
        html = translateOAH(null, 'popup_empty_responses');
        element.innerHTML = html;
        addConfigurationListener();
        addSupportListener();
        addHideListener();
        addSeeExampleListener();
      }
    }
  }
});

function onProxiedDomain(proxyUrl, currentUrl){
  //we take apart the proxy url and remove the first part of it,
  //as it could be something like login.proxy.uni.edu
  //the finaly proxied url then only contains domain-tld.proxy.uni.edu
  if (proxyUrl == '') {
    return false;
  }
  const ezproxyUrl = new URL(proxyUrl);
  const urlParts = ezproxyUrl.hostname.split('.');
  urlParts.splice(0,1);
  const testUrl = urlParts.join('.');
  if(currentUrl.indexOf(testUrl) >= 0){
    return true;
  }
  return false;
}

function addButtonListener() {
  const links = document.getElementsByTagName('button');
  for (var i = 0; i < links.length; i++) {
    (function () {
      const ln = links[i];
      const location = ln.dataset.url;
      const id = ln.getAttribute('id');
      if (id != 'ebscobutton') {
        ln.onclick = function () {
          chrome.tabs.create({ active: true, url: location });
        };
      }
      else {
        ln.onclick = function() {
          document.getElementById('ebscobutton').innerText = 'Loading...';
          chrome.runtime.sendMessage({ mode: 'openEBSCO', url: location }, (response) => {
            console.log(response);
          });
        }
      }
      
    }());
  }
}

function addConfigurationListener() {
  const configLink = document.getElementById('configurationlink');
  configLink.onclick = function () {
    chrome.tabs.create({ active: true, url: chrome.runtime.getURL('html/options.html') });
  };

  const configIcon = document.getElementById('oah_settings_icon');
  configIcon.onclick = function () {
    chrome.tabs.create({ active: true, url: chrome.runtime.getURL('html/options.html') });
  };
}

function addSupportListener() {
  const configLink = document.getElementById('supportlink');
  configLink.onclick = function () {
    chrome.tabs.create({ active: true, url: 'https://www.oahelper.org/support/' });
  };
}

function addHideListener() {
  const configLink = document.getElementById('hidebadges');
  configLink.onclick = function () {
    document.getElementById('hidebadgespan').style.display = 'none';
    chrome.windows.getAll({ populate: true }, (windows) => {
      // For all windows
      for (let i = 0; i < windows.length; i++) {
        const currentWindow = windows[i];
        // For all tabs in that window
        for (let j = 0; j < currentWindow.tabs.length; j++) {
          const currentTab = currentWindow.tabs[j];
          if (currentTab.active && currentTab.url.match(/(http|https):\/\//gi)) {
            chrome.tabs.sendMessage(currentTab.id, { mode: 'hidebadges' }, () => {
              // console.log(response);
            });
          }
        }
      }
    });
  };
}

function addSeeExampleListener() {
  const configLink = document.getElementById('seeexample');
  configLink.onclick = function () {
    chrome.tabs.create({ active: true, url: 'https://www.oahelper.org/example/' });
  };
}

function translateOAH(response, key, variableArray = null) {
  const language = chrome.i18n.getUILanguage().substring(0,2);
  if(response != null 
    && response['configuration'] != undefined 
    && response['configuration']['translations'] != undefined 
    && response['configuration']['translations'][key] != undefined
    && response['configuration']['translations'][key][language] != undefined) 
  { 
      let textToReturn = response['configuration']['translations'][key][language];
      if (variableArray != null && variableArray.length > 0) {
        for (i=0; i<variableArray.length; i++) {
          textToReturn = textToReturn.replace(`$${i+1}$`, variableArray[i]);
        }
      }
      return textToReturn;
  }
  else {
    return chrome.i18n.getMessage(key, variableArray);
  }

}