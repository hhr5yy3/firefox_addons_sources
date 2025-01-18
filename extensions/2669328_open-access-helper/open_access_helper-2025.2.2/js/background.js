/** *******************
* Page Initialization - initialized for all supported sites upon load
******************** */
const EXTENSION_VERSION = "2025.2.2";
const EXTENSION_BROWSER = "firefox";
const TELEMETRY_API_URL = "https://nom.telemetrydeck.com/v1/";
const TELEMETRY_APP_ID = "412A1913-639F-4A6C-B209-D7063C3EF1E3";
const TELEMETRY_TEST_MODE = "false";
const UNPAYWALL_API_URL = "https://api.unpaywall.org/v2/";
const CORE_API_KEY = "uMPbcSzO7HNK8wDF5h2gAst3xjrldXEo";
const CORE_API_RECOM_URL = "https://api.core.ac.uk/v3/recommend";
const CORE_API_DISCOVER_URL = "CORE_API_DISCOVER_URL_VALUE";
const OAHELPER_API_KEY = "l6sNUJ3Knh";
const OAHELPER_API_URL = "https://www.oahelper.org/backend/institutes/api.php";
const EBSCO_BASIC_AUTHORIZATION = "QkZIVFg1MkxFSzllcGhzUnpzaHZ0UUZoMkNQQXR1aG86Zzk0X3JJN0hNRlNHSXYxZU8yd0JvS25ybzd0VmFOd2pmTDZEeE5adU5pU3Z0WDhJX1lOcVpXZjZrd1p3bjhOQw";
const UNINSTALL_URL = "https://www.oahelper.org/sorry-to-see-you-leave/";
const EXTENSION_EMAIL = "info@oahelper.org";
const EBSCO_TOKEN_URL = "https://apis.ebsco.com/oauth-proxy/token";
const EBSCO_API_URL = "https://apis.ebsco.com/ehostentitlements/v2/";
const OPENCITATIONS_API_URL = "https://opencitations.net/index/api/v1/citation-count/";
const RETRACTIONWATCH_API_URL = "https://www.oahelper.org/rw/rw.php";
const RETRACTIONWATCH_KEY = "qd8pUUgvqH3K";

let configuration = {};
let orangeIcon = false;
let greenIcon = false;
let ebscoIcon = false;
let warningIcon = false;
let contextMenuCreated = false;


createContextMenu();

// Initialize the extension on the specified tab
const initializeTab = function (tab, startUpRetroactiveLoad) {
  orangeIcon = false;
  greenIcon = false;
  warningIcon = false;
  setDefaultIcon();
  if(EXTENSION_BROWSER != 'firefox') {
    chrome.scripting.insertCSS({
      target: { tabId: tab.id },
      files: ["css/content.css"]
    })
    .then(() => {
      //console.log("INJECTED THE FOREGROUND STYLES.");
    })
    .catch(err => console.log(err));
  }
  else {
    browser.tabs.insertCSS(tab.id, {file: "css/content.css"});
  }
};


/** *******************
* Initialization Helpers
******************** */

// Called every time a tab is updated
const onTabUpdate = function (tabId, info, tab) {
  if (info.status == 'loading') {
    initializeTab(tab, false);
  }
};

// Called every time a tab is replaced
const onTabReplace = function (addedTabId, replacedTabId) {
  chrome.tabs.get(addedTabId, (tab) => initializeTab(tab, false));
};

const onTabActivate = function (tab) {
  chrome.tabs.get(tab.tabId, (tabObject) => {
    if (tabObject != undefined && tabObject.url.indexOf('http') > -1) {
      chrome.tabs.sendMessage(tab.tabId, { mode: 'getBadge' }, (response) => {
        orangeIcon = false;
        greenIcon = false;
        warningIcon = false;
        if (typeof response === 'undefined' || typeof response.badge === 'undefined' || response.badge == '') {
          setDefaultIcon();
        } else if (response.badge == 'orange') {
          setOrangeIcon();
        } else if (response.badge == 'blue') {
          setBlueIcon();
        } else if (response.badge == 'blue') {
          setBlueIcon();
        } else if (response.badge == 'purple') {
          setPurpleIcon();
        } else if (response.badge == 'ebsco') {
          setEBSCOicon();
        } else if (response.badge == 'warning') {
          setWarningIcon();
        } else if (response.badge == 'black') {
          setDefaultIcon();
        } else {
          setGreenIcon();
        }
      });
    }
  });
};

// Listen to all tab events to recognize user navigation to a supported website
const addTabListeners = function () {
  if (!chrome.tabs.onUpdated.hasListener(onTabUpdate)) {
    chrome.tabs.onUpdated.addListener(onTabUpdate);
  }
  if (!chrome.tabs.onReplaced.hasListener(onTabReplace)) {
    chrome.tabs.onReplaced.addListener(onTabReplace);
  }
  if (!chrome.tabs.onActivated.hasListener(onTabActivate)) {
    chrome.tabs.onActivated.addListener(onTabActivate);
  }
};


// Retroactively initialize all existing tabs (e.g. when extension is first installed)
const retroactivelyInitExistingTabs = function () {
  chrome.windows.getAll({
    populate: true,
  }, (windows) => {
    // For all windows
    for (let i = 0; i < windows.length; i++) {
      const currentWindow = windows[i];
      
      // For all tabs in that window
      for (let j = 0; j < currentWindow.tabs.length; j++) {
        const currentTab = currentWindow.tabs[j];
        
        // Only initialize http or https pages, not ftp://, chrome:// etc.
        if (currentTab.url.match(/(http|https):\/\//gi)) {
        initializeTab(currentTab, true);
      }
    }
  }
});
};


/** *******************
*  Initialization
******************** */

// Initialize the background script
const initializeBackgroundScript = function () {
  // Load extension to all future tabs
  addTabListeners();
  // Load extension to all existing tabs
  retroactivelyInitExistingTabs();
};

initializeBackgroundScript();

/** *******************
* set on install options page && uninstall survey
******************** */

chrome.runtime.onInstalled.addListener((object) => {
  if (object.reason != 'install') {
    return;
  }
  const optionsUrl = chrome.runtime.getURL('html/options.html');
  chrome.tabs.create({ url: optionsUrl }, (tab) => {
    // console.log('options page opened');
  });
});

chrome.runtime.setUninstallURL(UNINSTALL_URL);

/** *******************
* Listening to messages and take appropriate action
******************** */

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  let mode = '';
  switch (request.mode) {
    case 'followUrl':
      mode = 'followUrlResponse';
      followUrl(request.targetUrl, request.currentUrl).then((response) => {
        if (response) {
          setGreenIcon();
        }
        sendResponse({ mode, ona: response });
      });
      return true;
    case 'coreRecom':
      mode = 'coreRecomResponse';
      askCoreRecommendation(request.doi, request.currentUrl, request.docTitle, request.abstract).then((response) => {
        if (response.length > 0) {
          sendResponse({ mode, status: 'ok', recommendation: response });
        } else {
          //somehow explain about the rate limit?
          //console.log('obviously failed');
          sendResponse({ mode, status: response.msg, recommendation: null });
        }
      });
      return true;
    case 'unpaywall':
      mode = 'unpaywallResponse';
      unpaywallCall(request.cleanedDOI).then((response) => {
        if (response.is_oa === true && response.best_oa_location != null) {
          response.best_oa_location.source = 'Unpaywall.org';
          response.best_oa_location.title = 'Open Access Version found from unpaywall.org';
          setOrangeIcon();
        } else {
          setDefaultIcon();
        }
        sendResponse({ mode, data: response });
      });
      return true;
    case 'coreoa':
      mode = 'coreoaResponse';
      coreOpenAccessCall(request.cleanedDOI).then((response) => {
        sendResponse({ mode, data: response });
      });
      return true;
    case 'ebsco':
      mode = 'ebscoResponse';
      ebscoEntitlementCall(request.ebsco_cgp, request.cleanedDOI).then((response) => {
        sendResponse({ mode, data: response });
      });
      return true;
    case 'citationcount':
      mode = 'citationcountResponse';
      openCitationsCounts(request.cleanedDOI).then((response) => {
        let citationCount = 0;
        if (response[0] !== undefined && response[0].count !== undefined && response[0].count > 0) {
          citationCount = response[0].count;
          setPurpleIcon();
        }
        sendResponse({ mode, citationCount });
      });
      return true;
    case 'retractionwatch':
      mode = 'retractionwatchResponse';
      retractionWatchCall(request.cleanedDOI).then((response) => {
        if(response != undefined && response.is_retracted === true) {
          setWarningIcon();
        }
        sendResponse({ mode, data: response });
      });
      return true;
    case 'getoptions':
      setDefaultIcon();
      sendResponse({ mode: 'options', options: configuration });
      return true;
    case 'setBlueIcon':
      setBlueIcon();
      sendResponse({ mode: 'blueSet' });
      return true;
    case 'getProxyDomains':
      if(request.id != undefined && request.domainurl != undefined) {
        doGetProxyDomains(request.id, request.domainurl);
        sendResponse({ mode: 'proxydomainsdone'});
      }
      return true;
    case 'openTab':
      if(request.url != undefined && request.url != '') {
        chrome.tabs.create({ url: request.url });
      }
      return true;
    case 'openEBSCO':
      if(request.url != undefined && request.url != '') {
        if(request.url.indexOf('api.ebsco.com')){
          getEBSCOToken().then(async response => {
            exchangeEBSCOUrl(request.url, response.access_token).then(async response => {
              if(response.link != false) {
                sendResponse({mode: 'ebscoopened'});
                chrome.tabs.create({ url: response.link });
              }
              else {
                sendResponse({mode: 'ebscoopenfailed'});
              }
              
            }).catch(error => {
              console.log(error);
              sendResponse({mode: 'ebscoopenfailed'});
            });
          })
          .catch(error => {
            console.log(error);
            sendResponse({mode: 'ebscoopenfailed'});
          })
        }
        else {
          sendResponse({mode: 'ebscoopened'});
          chrome.tabs.create({ url: request.url });
        }
      }
      return true;
    case 'optionsUpdated':
      chrome.storage.local.get(['core', 'core1', 'ebscouc', 'oab', 'ezproxy', 'url', 'search', 'opencitation', 'retractionwatch', 'nobadge', 'ill', 'illurl', 'name', 'id', 'consolelog', 'domainurl', 'lastload', 'supportedDomains', 'discovery', 'uuid', 'lastLog', 'ebsco_token', 'ebsco_token_expires_at', 'ebsco_cgp', 'translations'], (items) => {
        configuration = items;
        createContextMenu();
        sendResponse({ mode: 'optionsUpdateReceived'});
      });
      return true;
    case 'saveSettingsFromWeb':
      reloadSettings(request.id);
      sendResponse({ mode: 'saveSettingsFromWebResponse' });
      return true;
    case 'setOrangeIcon':
      setOrangeIcon();
      return true;
    case 'setGreenIcon':
      setGreenIcon();
      return true;
    case 'setEBSCOicon':
      setEBSCOicon();
      return true;
    default:
      return true;
  }
});


/** *******************
* Monitor storage and reload the extension
******************** */

chrome.storage.onChanged.addListener((changes, namespace) => {
  // console.log('local storage has changed');
  chrome.storage.local.get(['core', 'core1', 'oab', 'ebscouc', 'ezproxy', 'url', 'search', 'opencitation', 'retractionwatch', 'nobadge', 'ill', 'illurl', 'name', 'id', 'consolelog', 'domainurl', 'lastload', 'supportedDomains', 'discovery', 'uuid', 'ebsco_token', 'ebsco_token_expires_at', 'ebsco_cgp', 'translations'], (items) => {
    configuration = items;
    createContextMenu();
  });
});


/** *******************
* Context Menu Support
******************** */

const CONTEXT_MENU_ID = 'oahelper_context';


function getword(info, tab) {
  if (info.menuItemId !== CONTEXT_MENU_ID) {
    return;
  }
  chrome.storage.local.get(['core', 'core1', 'oab', 'ezproxy', 'url', 'search'], (items) => {
    let searchTermToUse = encodeURIComponent(info.selectionText);
    if (items.search == 'google') {
      chrome.tabs.create({
        url: `https://scholar.google.com/scholar?q=${searchTermToUse}`,
      });
    } else if (items.search == 'microsoft') {
      chrome.tabs.create({
        url: `https://academic.microsoft.com/search?q=${searchTermToUse}`,
      });
    } else if (items.search == 'core') {
      chrome.tabs.create({
        url: `https://core.ac.uk/search?q=${encodeURIComponent(searchTermToUse)}`,
      });
    }
    else if (items.search == 'base') {
      chrome.tabs.create({
        url: `https://www.base-search.net/Search/Results?lookfor=${searchTermToUse}&name=&oaboost=1&newsearch=1&refid=dcbasen`,
      });
    }
    else if (items.search == 'dimensions') {
      chrome.tabs.create({
        url: `https://app.dimensions.ai/discover/publication?search_mode=content&search_text=${searchTermToUse}&search_type=kws&search_field=full_search`,
      });
    }
    else if (items.search == 'semantic') {
      chrome.tabs.create({
        url: `https://www.semanticscholar.org/search?q=${searchTermToUse}&sort=relevance`,
      });
    }
    else if (items.search == 'institute'){
      if(configuration.discovery != undefined && configuration.discovery != ""){
        let myurl = configuration.discovery.replace('{searchTerm}', searchTermToUse);
        chrome.tabs.create({
          url: myurl,
        });
      }
      else{
        chrome.tabs.create({
          url: `https://scholar.google.com/scholar?q=${searchTermToUse}`,
        });
      }
    }
  });
}


function createContextMenu() {
  chrome.storage.local.get(['core', 'core1', 'ebscouc', 'oab', 'ezproxy', 'url', 'search', 'opencitation', 'retractionwatch', 'nobadge', 'ezproxy', 'url', 'ill', 'illurl', 'name', 'id', 'consolelog', 'domainurl', 'lastload', 'supportedDomains', 'discovery', 'uuid', 'lastLog', 'issetup', 'ebsco_token', 'ebsco_token_expires_at', 'ebsco_cgp' ,'translations'], (items) => {
    configuration = items;
    let searchLabel = chrome.i18n.getMessage('context_search_label');
    let instituteSearchLabel = chrome.i18n.getMessage('context_titute_search_label');
    if (items.domainurl != undefined) {
      doSync(items.id, items.lastload);
    }
    if(items.issetup){
      doTelemetry(items.id, items.lastLog, items.uuid);
    }
    
    if (items.search == 'none'){
      return;
    }
    let contextMenuTitle = '';
    switch(items.search) {
      case 'google':
      contextMenuTitle = `${searchLabel} Google Scholar: "%s"`;
      break;
      case 'core':
      contextMenuTitle = `${searchLabel} core.ac.uk: "%s"`;
      break;
      case 'base':
      contextMenuTitle = `${searchLabel} base-search.net: "%s"`;
      break;
      case 'dimensions':
      contextMenuTitle = `${searchLabel} dimensions.ai: "%s"`;
      break;
      case 'semantic':
      contextMenuTitle = `${searchLabel} semanticscholar.org: "%s"`;
      break;
      case 'institute':
      contextMenuTitle = `${instituteSearchLabel}: "%s"`;
      break;
      default:
      contextMenuTitle = `${searchLabel} Google Scholar: "%s"`;
      break;
    }
    
    // needs to be implementeditems.search == 'institute' && items.discovery != undefined && items.discovery != ''
    try {
      if(!contextMenuCreated){
        chrome.contextMenus.create({
          title: contextMenuTitle,
          contexts: ['selection'],
          id: CONTEXT_MENU_ID,
        }, () => chrome.runtime.lastError);
      }
      else {
        // console.log('updating context menu');
        chrome.contextMenus.update(CONTEXT_MENU_ID,
          {
            title: contextMenuTitle,
            contexts: ['selection'],
          }
          );
        }
        
        chrome.contextMenus.onClicked.addListener(getword);
        contextMenuCreated = true;
      }
      catch(err){
        
      }
      
    });
  }
  
  function setUUID(){
    let uuid = uuidv4();
    chrome.storage.local.set({
      uuid
    }, () => {
      //
    });
    return uuid;
  }
  
  function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }
  
  async function sha256(message) {
    // encode as UTF-8
    const msgBuffer = new TextEncoder().encode(message);                    
    
    // hash the message
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    
    // convert ArrayBuffer to Array
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    
    // convert bytes to hex string                  
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
  }
  
  function setLastLog(lastLog){
    chrome.storage.local.set({
      lastLog
    }, () => {
      //
    });
  }
  
  /** *******************
  * fundamental extension functionality
  ******************** */
  
  async function followUrl(targetUrl, currentUrl) {
    const turl = new URL(targetUrl);
    const domain0 = turl.host;
    const cUrl1 = new URL(currentUrl);
    const domain1 = cUrl1.host;
    
    if (domain0 === domain1) {
      return true;
    }
    
    const response = await fetch(targetUrl);
    const finalUrlString = response.url;
    let myFinalUrl = finalUrlString.replace('https://', '');
    myFinalUrl = myFinalUrl.replace('http://', '');
    let myCurrent = currentUrl.replace('https://', '');
    myCurrent = myCurrent.replace('http://', '');
    
    
    const next1 = new URL(finalUrlString);
    
    const domain2 = next1.host;
    
    if (myFinalUrl === myCurrent) {
      return true;
    }
    if (domain1 === domain2) {
      return true;
    }
    if (domain1 === 'www.sciencedirect.com' && domain2 === 'linkinghub.elsevier.com') {
      return true;
    }
    if (domain1 === 'psycnet.apa.org' && domain2 === 'doi.apa.org') {
      return true;
    }
    if (currentUrl.indexOf('www.ncbi.nlm.nih.gov/pmc/') > -1) {
      return true;
    }
    
    return false;
  }
  
  async function askCoreRecommendation(mydoi, currentUrl, docTitle, abstract) {
    const coreApiKey = CORE_API_KEY;
    const url = CORE_API_RECOM_URL;
    const jsonPayload = `{
      "limit": 3,
      "identifier": "${mydoi}",
      "abstract": "${abstract}",
      "authors": "",
      "title": "${docTitle}",
      "exclude": [ "fullText"]
    }`;
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Authorization': `Bearer ${coreApiKey}`,
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: jsonPayload,
      });
      
      if(response.status == 200){
        return await response.json();
      }
      else{
        return { msg: 'rate limit', data: [] };
      }
      
    } catch (err) {
      return { msg: 'failed', data: [] };
    }
  }
  
  async function unpaywallCall(cleanedDOI) {
    const url = `${UNPAYWALL_API_URL}${cleanedDOI}?email=${EXTENSION_EMAIL}`;
    try {
      const response = await fetch(url);
      if(response.ok){
        return response.json();
      }
      else{
        return [];
      }
    } catch (err) {
      return [];
    }
  }
  
  
  async function coreOpenAccessCall(cleanedDOI) {
    const coreApiKey = CORE_API_KEY;
    const url = CORE_API_DISCOVER_URL;
    const jsonPayload = `{"doi" : "${cleanedDOI}"}`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Authorization': `Bearer ${coreApiKey}`,
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: jsonPayload,
      });
      if(response.ok && response.status == 200){
        return await response.json();
      }
      else{
        return [];
      }
    } catch (err) {
      return [];
    }
  }
  
  async function ebscoEntitlementCall(ebsco_cgp, cleanedDOI) {
    return new Promise(resolve => {
      getEBSCOToken().then(async response => {
        makeEBSCOEntitlementCall(ebsco_cgp, cleanedDOI, response.access_token).then(async response => {
          resolve(response);
        }).catch(error => {
          resolve({error : 'entitelmentCall'});
        });
      })
      .catch(error => {
        resolve({error : 'token'});
      })
    });
  }
  
  async function getEBSCOToken() {
    if(configuration.ebsco_token != undefined  
      && configuration.ebsco_token_expires_at != undefined 
      && configuration.ebsco_token_expires_at > Math.floor(Date.now()/1000)) 
      {
      //console.log('old token');
      return {
        access_token: configuration.ebsco_token
      }
    }
    
    const ebscoTokenUrl = EBSCO_TOKEN_URL;
    const body = new URLSearchParams();
    body.append('grant_type', 'client_credentials');
    
    const response = await fetch(ebscoTokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${EBSCO_BASIC_AUTHORIZATION}`
      },
      body
    });
    const responseBody = await response.json();
    configuration.ebsco_token = responseBody.access_token
    configuration.ebsco_token_expires_at = Math.floor(Date.now()/1000) + responseBody.expires_in - 60;
    setEBSCOToken(responseBody.access_token, responseBody.expires_in);
    return responseBody;
  }

  async function setEBSCOToken(token, expiry) {
    const tokenExpiry = Math.floor(Date.now()/1000) + expiry - 60;
    chrome.storage.local.set({ ebsco_token: token, ebsco_token_expires_at: tokenExpiry }).then(() => {
      // do nothing
    });
  }
  
  async function makeEBSCOEntitlementCall(ebsco_cgp, doi, token) {
    const entitlementUrl = `${EBSCO_API_URL}${ebsco_cgp}/discovery?doi=${doi}&svc_id=ehostFT;slplusFT`;
    const response = await fetch(entitlementUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${token}`,
        'x-forwarded-proto': 'https',
        'x-forwarded-host': 'www.oahelper.org'
      }
    });
    if (response.status === 302) {
      const redirectLocation = response.headers.get('Location');
      return { "link" : redirectLocation };
    }
    
    const responseBody = await response.json();
    return responseBody;
  }

  async function exchangeEBSCOUrl(url, token) {
    let fetchOptions = {}
    fetchOptions.method = 'GET';
    fetchOptions.headers = {Authorization: `Bearer ${token}`};

    if (EXTENSION_BROWSER === 'apple') {
      fetchOptions.redirect = 'manual';
    }
    
    try {
      const response = await fetch(url, fetchOptions);
      if (response.status === 302) {
        const redirectLocation = response.headers.get('Location');
        return { "link" : redirectLocation };
      }
      if (response.status === 200) {
        return { "link" : response.url};
      }
    }
    catch (err) {
      return {"link": false, "error" : err};
    }
    
  }
  
  async function openCitationsCounts(cleanedDOI) {
    if(cleanedDOI == undefined) {
      return [];
    }
    const url = `${OPENCITATIONS_API_URL}${cleanedDOI}`;
    try {
      const response = await fetch(url);
      if(response.ok && response.status == 200){
        return response.json();
      }
      else{
        return [];
      }
    } catch (err) {
      return [];
    }
  }

  async function retractionWatchCall(cleanedDOI) {
    if(cleanedDOI == undefined) {
      return {
        'is_retracted' : false,
        'code' : 400,
        'doi' : '',
        'label' : '',
        'url' : '',
        'urls' : [],
        'reasons' : []
      };
    }

    const headers = new Headers();
    headers.append('x-oahelper', RETRACTIONWATCH_KEY);

    const formdata = new FormData();
    formdata.append('doi', cleanedDOI);
    
    const requestOptions = {
      method: 'POST',
      headers: headers,
      body: formdata,
      redirect: 'follow'
    };
    
    const response = await fetch(RETRACTIONWATCH_API_URL, requestOptions);
    // api only responds with 200 if it found a retraction
    if (response.status === 200) {
      const responseData = await response.json();
      const urls = responseData[0].url ?? [];
      return {
        'is_retracted' : true,
        'code' : 200,
        'doi' : responseData[0].OriginalPaperDOI,
        'label' : responseData[0].RetractionNature,
        'url' : urls[0] ?? '',
        'urls' : urls,
        'reasons' : responseData[0].reason ?? []
      };
    }
    // either not found or some other error
    return {
      'is_retracted' : false,
      'code' : response.status,
      'doi' : cleanedDOI,
      'label' : '',
      'url' : '',
      'urls' : [],
      'reasons' : []
    };
  }
  
  function doSync(id, lastload){
    //console.log(`doSync called ${Date.now()}`);
    // get timestamp 7 days ago
    let checkTimeStamp = Math.floor(Date.now() / 1000) - (7*24*60*60);
    // if last load is greater 7 days ago, we will reload settings
    if (lastload < checkTimeStamp) {
      reloadSettings(id);
    }
    else{
      // console.log('doSync doesn\'t need to run');
    }
  }
  
  async function doTelemetry(id, lastLog, uuid){
    if (uuid == undefined){
      uuid = setUUID();
      return;
    }
    let uuidHash = await sha256(uuid);
    // get timestamp 7 days ago
    let checkTimeStamp = Math.floor(Date.now() / 1000) - (7*24*60*60);
    let now = Math.floor(Date.now() / 1000);
    // if last load is greater 7 days ago, we will reload settings
    if (lastLog < checkTimeStamp) {
      // console.log('I am going to do a thing now');
      const url = TELEMETRY_API_URL;
      const signals = [
        {
          "isTestMode": TELEMETRY_TEST_MODE,
          "appID": TELEMETRY_APP_ID,
          "clientUser": uuidHash,
          "sessionID": uuidv4(),
          "type": "weeklyLog",
          "payload": [
            "browser:"+EXTENSION_BROWSER,
            "os:"+getOS(),
            "systemVersion:extension_"+EXTENSION_VERSION,
            "language:"+navigator.language.substring(0,2),
            "appVersion:"+EXTENSION_VERSION,
            "institute:"+id,
          ]
        },
      ];
      
      const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(signals),
      });
      if(response.status == 200){
        setLastLog(now);
      }
    }
  }
  
  function getOS() {
    var userAgent = navigator.userAgent,
    platform = navigator?.userAgentData?.platform || navigator.platform,
    macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
    windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
    iosPlatforms = ['iPhone', 'iPad', 'iPod'],
    os = 'unknown';
    
    if (macosPlatforms.indexOf(platform) !== -1) {
      os = 'Mac OS';
    } else if (iosPlatforms.indexOf(platform) !== -1) {
      os = 'iOS';
    } else if (windowsPlatforms.indexOf(platform) !== -1) {
      os = 'Windows';
    } else if (/Android/.test(userAgent)) {
      os = 'Android';
    } else if (/Linux/.test(platform)) {
      os = 'Linux';
    }
    
    return os;
  }
  
  
  function reloadSettings(id) {
    doProxySearchById(id).then((response) => {
      if (response != undefined && (response.code >= 200 && response.code <= 299)) {
        if (response.data.length == 0) {
          // we found nothing, need to give up
          //console.log('background / reloadSettings found no settings')
          return;
        } else{
          //console.log('background / reloadSettings has found settings and will attempt to save next');
          // we found one, as we search by id there can only be one result
          saveInstitute(response.data[0].id, response.data[0].institution, response.data[0].proxyUrl.replace('{targetUrl}', ''), response.data[0].ill.replace('{doi}', ''), response.data[0].domainUrl, response.data[0].discovery, response.data[0].ebsco_cgp);
          return;
        } 
      } else {
        //console.log('background / doGetProxyDomains had an error in the doProxySearch Response, response undefined, or response.code outside valid range');
        // there was an error, we need to give up
        return;
      }
    });
  }
  
  async function doProxySearchById(searchTerm) {
    if(searchTerm == '99999') {
      return;
    }
    const url = OAHELPER_API_URL;
    const apiKey = OAHELPER_API_KEY;
    const formData = new URLSearchParams();
    let searchtype = 'id';
    formData.append(searchtype, searchTerm);
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Token': apiKey,
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: formData,
    });
    return response.json();
  }
  
  function saveInstitute(id, name, url, illurl, domainurl, discovery, ebsco_cgp) {
    let lastload = Math.floor(Date.now() / 1000);
    let ill = false;
    if(illurl.length > 0 && illurl.indexOf('http') === 0) {
      ill = true;
    }
    let ezproxy = false;
    if(url.length > 0 && url.indexOf('http') === 0){
      ezproxy = true;
    }
    chrome.storage.local.set({
      id,
      name,
      url,
      illurl,
      ezproxy,
      ill,
      domainurl,
      discovery,
      lastload,
      ebsco_cgp
    }, () => {
      //console.log('background / saveInstitute has finished saving');
      // we just reloaded the settings, now let's check if we should obtain proxy domains and then run that process
      if (domainurl != '') {
        doGetProxyDomains(id, domainurl)
      }
    });
  }
  
  function doGetProxyDomains(id, domainurl){
    if (domainurl == '' || domainurl == "undefined" || domainurl == undefined){
      return;
    }
    getProxyDomains(domainurl).then((response) => {
      if (response.length != 0 && id == response.id && response.domains.length > 0) {
        // we need to save the domains now
        let translationsData = '';
        if (response.translations != null) {
          translationsData = response.translations;
        }
        chrome.storage.local.set({
          supportedDomains: response.domains,
          translations: translationsData,
          lastLoad: Math.floor(Date.now() / 1000),
          ezproxy: true,
          url: response.prefix
        })
        // we might want to log something for now
        //console.log('background / doGetProxyDomains has finished');
      }
    })
  }
  
  async function getProxyDomains(domainurl) {
    try {
      const response = await fetch(domainurl);
      if(response.ok){
        return response.json();
      }
      else{
        return [];
      }
    } catch (err) {
      return [];
    }
  }
  
  function setBrowserIcon(iconType) {
    if(EXTENSION_BROWSER == 'firefox' || EXTENSION_BROWSER == 'apple') {
      chrome.browserAction.setIcon({
        path: {
          19: `images/oahelper_${iconType}_19.png`,
          38: `images/oahelper_${iconType}_38.png`,
        },
      });
    }
    else {
      chrome.action.setIcon({
        path: {
          19: `images/oahelper_${iconType}_19.png`,
          38: `images/oahelper_${iconType}_38.png`,
        },
      });
    }
  }
  
  function setGreenIcon() {
    if(warningIcon){
      return;
    }
    greenIcon = true;
    setBrowserIcon('orangeok');
    checkProxy('orangeok');
  }
  
  function setOrangeIcon() {
    if(warningIcon){
      return;
    }
    orangeIcon = true;
    setBrowserIcon('orange');
    checkProxy('orange');
  }
  
  function setBlueIcon() {
    if(orangeIcon || greenIcon || ebscoIcon || warningIcon){
      return;
    }
    setBrowserIcon('blue');
    checkProxy('blue');
  }

  function setEBSCOicon() {
    if(warningIcon){
      return;
    }
    ebscoIcon = true;
    setBrowserIcon('ebsco');
  }
  
  function setPurpleIcon() {
    if(orangeIcon || greenIcon || ebscoIcon || warningIcon){
      return;
    }
    setBrowserIcon('purple');
    checkProxy('purple');
  }

  function setWarningIcon() {
    warningIcon = true;
    setBrowserIcon('warning');
  }
  
  function setDefaultIcon() {
    if(warningIcon){
      return;
    }
    setBrowserIcon('black');
    checkProxy('');
  }


  
  function checkProxy(icontype) {
    
    let queryOptions = { active: true, lastFocusedWindow: true };
    chrome.tabs.query(queryOptions, ([tab]) => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
      }
      if(tab != undefined && tab.id != undefined) {
        return shouldProxy(tab.id, tab.url, icontype);
      }
      else {
        return false;
      }
      
    });
  }
  
  function shouldProxy(tabid, currenturl, icontype) {
    if (
      configuration == undefined ||
      configuration.domainurl == undefined ||
      configuration.domainurl == "undefined" ||
      configuration.domainurl == ''
      ) {
        return false
      }
      else{
        configuration.supportedDomains.forEach(function(a){
          if (typeof(a) == 'string' && currenturl.indexOf(a)>-1) {
            if(icontype != ''){
              setBrowserIcon(`ezproxy_${icontype}`);
            }
            else{
              setBrowserIcon('ezproxy');
            }
          }     
        });
      }
    }