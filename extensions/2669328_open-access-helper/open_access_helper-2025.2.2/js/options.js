function saveOptions() {
  let oab = document.getElementById('oab').checked;
  let ill = document.getElementById('ill').checked;
  if(oab && ill){
    oab = false;
    document.getElementById('oab').checked = false;
  }
  chrome.storage.local.set({
    core: document.getElementById('core').checked,
    core1: document.getElementById('core1').checked,
    oab,
    ezproxy: document.getElementById('ezproxy').checked,
    ill,
    ebscouc: document.getElementById('ebscouc').checked,
    search: document.getElementById('selectsearch').value,
    opencitation: document.getElementById('opencitation').checked,
    retractionwatch: document.getElementById('retractionwatch').checked,
    nobadge: document.getElementById('nobadge').checked,
  }, () => {
    // Update status to let user know options were saved.
    const status = document.getElementById('status');
    status.innerHTML = chrome.i18n.getMessage('options_options_saved');
    clearStatus();
    showHideOAB();
    sendMessageToOtherPages();
  });
}

function saveInstitute(id, name, url, illurl, domainurl, discovery, ebsco_cgp) {
  //document.getElementById('institute').value = `${name} (${id})`;
  let lastload = Math.floor(Date.now() / 1000) - (8*24*60*60);
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
    // Update status to let user know options were saved.
    restoreOptions();
    restoreDropDown();
    const status = document.getElementById('status');
    status.innerHTML = chrome.i18n.getMessage('options_options_proxy_saved', [id, name]);
    const proxyurl = document.getElementById('proxyurl');
    proxyurl.textContent = url;
    const illurlText = document.getElementById('illurl');
    illurlText.textContent = illurl;
    clearStatus();
    if (domainurl != '') {
      chrome.runtime.sendMessage({ mode: 'getProxyDomains', id, domainurl }, (response) => {
        // console.log(response);
      });
    }
    document.getElementById("selectedinstitute").style.display = 'block';
    showHideOAB();
    showHideEbscoOption();
  });
}

function handleResponse(message) {
  //console.log(`Message from the background script:  ${message}`);
}

function handleError(error) {
  console.log(`Error: ${error}`);
}

function sendMessageToOtherPages(){
  chrome.runtime.sendMessage({ mode: "optionsUpdated" }, (response) => {
    // console.log(response);
  });
}

function restoreOptions() {
  chrome.storage.local.get(['core', 'core1', 'oab', 'ezproxy', 'ill', 'opencitation', 'retractionwatch', 'nobadge', 'ebscouc'], (items) => {
    for (const [key, value] of Object.entries(items)) {
      //console.log(`${key} - ${value}`);
      document.getElementById(key).checked = value;
    }
    if(items['ebscouc'] === undefined) {
      document.getElementById('ebscouc').checked = true;
    }
  });
    
}

function restoreDropDown() {
  chrome.storage.local.get(['search'], (items) => {
    for (const [key, value] of Object.entries(items)) {
      const select = document.getElementById('selectsearch');
      for (let i = 0; i < select.options.length; i++) {
        if (select.options[i].value == value) {
          select.options[i].selected = true;
        }
      }
    }
    chrome.storage.local.get(['discovery'], (discoveryItems) => {
      if(Object.keys(discoveryItems).length != 0) {
        for (const [key, value] of Object.entries(discoveryItems)) {
          if(value == undefined || value == ""){
            document.getElementById('selectsearch_institute').selected = false;
            document.getElementById('selectsearch_institute').style.display = 'none';
            document.getElementById('selectsearch_institute').disabled = true;
          }
          else{
            document.getElementById('selectsearch_institute').style.display = 'block';
            document.getElementById('selectsearch_institute').disabled = false;
          }
        }
      }
      else {
        document.getElementById('selectsearch_institute').selected = false;
        document.getElementById('selectsearch_institute').style.display = 'none';
        document.getElementById('selectsearch_institute').disabled = true;
      }
    });
  });
}

function restoreInstitute() {
  chrome.storage.local.get(['id', 'name', 'url', 'illurl'], (items) => {
    for (const [key, value] of Object.entries(items)) {
      //console.log(`${key} - ${value}`);
      document.getElementById("selectedinstitute").style.display = 'inherit';
      document.getElementById("selectedinstitute").setAttribute("institute", items.id); 
      document.getElementById("selectedinstitute").innerHTML = `${items.name ? items.name : ''} (${items.id})`;
      const proxyurl = document.getElementById('proxyurl');
      proxyurl.textContent = items.url;
      const illurl = document.getElementById('illurl');
      illurl.textContent = items.illurl;
    }
  });
}

function setup() {
  if (typeof chrome.storage.managed != 'undefined') {
    chrome.storage.managed.get(null, function(items) {
      if (typeof items != 'undefined' && typeof items.institute != 'undefined' && items.insitute != '') {
        // hide the search box to set another institute
        document.getElementById("autoComplete_wrappper").style.display = 'none';
        document.getElementById("instituteupdate").style.display = 'none';
        document.getElementById("institutelist").style.minHeight = "2rem";
        document.getElementById("settings_managed_info").innerHTML = chrome.i18n.getMessage("options_settings_managed_info");
        // check if we have this institute configured
        chrome.storage.local.get(['id', 'issetup'], (myItems) => {
          if (myItems.id != undefined && myItems.id == items.institute) {
            // we have a managed institueId and it matches what we've got stored
            setup1();
          } 
          else if (myItems.issetup != undefined && myItems.issetup) {
            // save instituteId and move on
            chrome.storage.local.set({
              id: items.institute
            }, () => {
              reloadSettings();
              setup1();
            });
          }
          else {
            // do basic setup, plus institute ID
            chrome.storage.local.set({
              id: items.institute,
              core: true,
              core1: false,
              oab: true,
              ebscouc: true,
              opencitation: true,
              retractionwatch: false,
              ezproxy: false,
              ill: false,
              issetup: true,
              search: 'google',
              consolelog: false,
              nobadge: false,
              lastLog: Math.floor(Date.now() / 1000),
              uuid: uuidv4()
            }, () => {
              reloadSettings();
              setup1();
            });
          }
        });
      }
      else {
        //chrome.storage.managed exists, but no institute set
        setup1();
      }
    });
  }
  else {
    // no chrome.storage.managed
    setup1();
  }
  
}

function setup1() {
  chrome.storage.local.get(['issetup'], (items) => {
    if (items.issetup != undefined && items.issetup) {
      restoreOptions();
      restoreInstitute();
      restoreDropDown();
      showHideUpdateInstitute();
      showHideOAB();
      showHideEbscoOption();
    } else {
      doInitialSetup();
    }
  });
}

function doInitialSetup(uuid = uuidv4()) {
  chrome.storage.local.set({
    core: true,
    core1: false,
    oab: true,
    ebscouc: true,
    opencitation: true,
    retractionwatch: false,
    ezproxy: false,
    ill: false,
    issetup: true,
    search: 'google',
    consolelog: false,
    nobadge: false,
    lastLog: Math.floor(Date.now() / 1000),
    uuid: uuid
  }, () => {
    restoreOptions();
    restoreDropDown();
    showHideUpdateInstitute();
  });
}

function uuidv4() {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

function showHideUpdateInstitute() {
  chrome.storage.local.get(['id'], (items) => {
    if(items.id != undefined && items.id > 0){
      document.getElementById('instituteupdate').style.display = "inline-block";
    }
    else{
      document.getElementById('instituteupdate').style.display = "none";
    }
  });
}

function showHideOAB() {
  chrome.storage.local.get(['ill'], (items) => {
    if(items.ill){
      document.getElementById('oab').style.display = "none";
      document.getElementById('oablabel').style.display = "none";
    }
    else{
      document.getElementById('oab').style.display = "inline-block";
      document.getElementById('oablabel').style.display = "inline-block";
    }
  });
}

function showHideEbscoOption() {
  chrome.storage.local.get(['ebsco_cgp'], (items) => {
    if(items['ebsco_cgp'] === undefined || items['ebsco_cgp'] == 'unset' || items['ebsco_cgp'] == ''){
      document.getElementById('ebscouc').style.display = "none";
      document.getElementById('ebscouclabel').style.display = "none";
    }
    else{
      document.getElementById('ebscouc').style.display = "inline-block";
      document.getElementById('ebscouclabel').style.display = "inline-block";
    }
  })
}

async function doProxySearch() {
  const searchTerm = document.getElementById('institute').value;
  if (searchTerm.length < 5) {
    //console.log('too short');
    const response = { code: 203, data: [] };
    return response;
  }
  const url = 'https://www.oahelper.org/backend/institutes/api.php';
  const apiKey = 'l6sNUJ3Knh';
  const formData = new URLSearchParams();
  let searchtype = 'domain';
  if (document.getElementById('query').checked) {
    searchtype = document.getElementById('query').value;
  }
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

function proxySearch() {
  document.getElementById('institutelist').innerHTML = '';
  doProxySearch().then((response) => {
    if (response != undefined && (response.code >= 200 && response.code <= 299)) {
      if (response.code == 203) {
        const status = document.getElementById('status');
        status.innerHTML = chrome.i18n.getMessage('options_proxy_searchtooshort');
        // 'Please enter at least 5 characters';
        clearStatus();
      } else if (response.data.length == 0) {
        // we found nothing
        const status = document.getElementById('status');
        status.innerHTML = chrome.i18n.getMessage('options_no_institutes');
        clearStatus();
      } else if (response.data.length == 1) {
        // we found one
        saveInstitute(response.data[0].id, response.data[0].institution, response.data[0].proxyUrl.replace('{targetUrl}', ''), response.data[0].ill.replace('{doi}', ''), response.data[0].domainUrl, response.data[0].discovery, response.data[0].ebsco_cgp);
        // don't need a message, as that will be provided by saveInstitute function
      } else {
        // we found multiple
        const status = document.getElementById('status');
        status.innerHTML = chrome.i18n.getMessage('options_multi_institutes');
        const html = [];
        response.data.forEach((data) => {
          html.push(`<tr class="institutetoadd" data-id="${data.id}" data-institute="${data.institution}" data-url="${data.proxyUrl.replace('{targetUrl}', '')}" data-ill="${data.ill.replace('{doi}','')}" data-domainurl="${data.domainurl}" data-discovery="${data.discovery}" data-ebsco_cgp="${data.ebsco_cgp}"><td>${data.id}</td><td>${data.institution}</td><td>${data.proxyUrl.replace('{targetUrl}', '')}</td><td>${data.ill.replace('{doi}', '')}</td><tr>`);
        });
        const rows = html.join('');
        document.getElementById('institutelist').innerHTML = `<table class="table"><thead><tr><th>ID</th><th>Institute</th><th>URL</th><th>ILL</th></tr></thead><tbody>${rows}</tbody></table>`;
        const items = document.getElementsByClassName('institutetoadd');
        for (let i = 0; i < items.length; i++) {
          items[i].addEventListener('click', itemToAddClicked);
        }
        clearStatus();
      }
    } else {
      const status = document.getElementById('status');
      status.innerHTML = chrome.i18n.getMessage('options_error_institutes');
      clearStatus();
    }
  });
}

async function doProxySearchById(searchTerm) {
  const url = 'https://www.oahelper.org/backend/institutes/api.php';
  const apiKey = 'l6sNUJ3Knh';
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


function reloadSettings() {
  chrome.storage.local.get(['id'], (items) => {
    doProxySearchById(items.id).then((response) => {
      if (response != undefined && (response.code >= 200 && response.code <= 299)) {
        if (response.data.length == 0) {
          // we found nothing
          const status = document.getElementById('status');
          status.innerHTML = chrome.i18n.getMessage('options_no_institutes');
          clearStatus();
        } else{
          // we found one, as we search by id there can only be one result
          saveInstitute(response.data[0].id, response.data[0].institution, response.data[0].proxyUrl.replace('{targetUrl}', ''), response.data[0].ill.replace('{doi}', ''), response.data[0].domainUrl, response.data[0].discovery, response.data[0].ebsco_cgp);
          // don't need a message, as that will be provided by saveInstitute function
        } 
      } else {
        const status = document.getElementById('status');
        status.innerHTML = chrome.i18n.getMessage('options_error_institutes');
        clearStatus();
      }
    });
  });
}

function loadAndStoreSettingsById(id) {
  doProxySearchById(id).then((response) => {
    if (response != undefined && (response.code >= 200 && response.code <= 299)) {
      if (response.data.length == 0) {
        // we found nothing
        const status = document.getElementById('status');
        status.innerHTML = chrome.i18n.getMessage('options_no_institutes');
        clearStatus();
      } else{
        // we found one, as we search by id there can only be one result
        saveInstitute(response.data[0].id, response.data[0].institution, response.data[0].proxyUrl.replace('{targetUrl}', ''), response.data[0].ill.replace('{doi}', ''), response.data[0].domainUrl, response.data[0].discovery, response.data[0].ebsco_cgp);
        // don't need a message, as that will be provided by saveInstitute function
      } 
    } else {
      const status = document.getElementById('status');
      status.innerHTML = chrome.i18n.getMessage('options_error_institutes');
      clearStatus();
    }
  });
}


function itemToAddClicked() {
  saveInstitute(this.dataset.id, this.dataset.institute, this.dataset.url, this.dataset.ill, this.dataset.domainurl, this.dataset.discovery, this.dataset.ebsco_cgp);
}

function clearStatus() {
  setTimeout(() => {
    document.getElementById('status').innerHTML = '';
  }, 3500);
}

function showsettings() {
  document.getElementById('settingssection').style.display = 'block';
  document.getElementById('showsettings').style.display = 'none';
  document.getElementById('hidesettings').style.display = 'inline-block';
}

function hidesettings() {
  document.getElementById('settingssection').style.display = 'none';
  document.getElementById('showsettings').style.display = 'inline-block';
  document.getElementById('hidesettings').style.display = 'none';
}

function viewtutorial() {
  chrome.tabs.create({ url: 'https://www.oahelper.org/tutorial-open-access-helper-for-chrome/' }, (tab) => {
    // console.log('tutorial has been opened');
  });
}

function getsupport() {
  chrome.tabs.create({ url: 'https://www.oahelper.org/support/' }, (tab) => {
    // console.log('support has been opened');
  });
}

function showexample() {
  chrome.tabs.create({ url: 'https://www.oahelper.org/example/' }, (tab) => {
    // console.log('example has been opened');
  });
}

function isTouchScreen() {
    var hasTouchScreen = false;
    if ("maxTouchPoints" in navigator) {
        hasTouchScreen = navigator.maxTouchPoints > 0;
    } else if ("msMaxTouchPoints" in navigator) {
        hasTouchScreen = navigator.msMaxTouchPoints > 0;
    } else {
        var mQ = window.matchMedia && matchMedia("(pointer:coarse)");
        if (mQ && mQ.media === "(pointer:coarse)") {
            hasTouchScreen = !!mQ.matches;
        } else if ('orientation' in window) {
            hasTouchScreen = true; // deprecated, but good fallback
        } else {
            // Only as a last resort, fall back to user agent sniffing
            var UA = navigator.userAgent;
            hasTouchScreen = (
                /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
                /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA)
            );
        }
    }
    
    if(hasTouchScreen){
        document.getElementById('contextMenuSettingsGroup').style.display = 'none';
        document.getElementById('intro002').style.display = 'none';
        document.getElementById('breadcrumb2').style.display = 'none';
    }
    
    return hasTouchScreen;
}




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


function breadcrumb1() {
  removeAllActiveBreadCrumbs();
  document.getElementById('breadcrumb1').classList.add('is-active');
  document.getElementById('settingssection').style.display = 'none';
  document.getElementById('similarsection').style.display = 'none';
  document.getElementById('contextmenusection').style.display = 'none';
  document.getElementById('institutesection').style.display = 'block';
  document.getElementById('nobadgesection').style.display = 'none';
}

function breadcrumb2() {
  removeAllActiveBreadCrumbs();
  document.getElementById('breadcrumb2').classList.add('is-active');
  document.getElementById('settingssection').style.display = 'none';
  document.getElementById('similarsection').style.display = 'none';
  document.getElementById('contextmenusection').style.display = 'block';
  document.getElementById('institutesection').style.display = 'none';
  document.getElementById('nobadgesection').style.display = 'none';
}

function breadcrumb3() {
  removeAllActiveBreadCrumbs();
  document.getElementById('breadcrumb3').classList.add('is-active');
  document.getElementById('settingssection').style.display = 'block';
  document.getElementById('similarsection').style.display = 'none';
  document.getElementById('contextmenusection').style.display = 'none';
  document.getElementById('institutesection').style.display = 'none';
  document.getElementById('nobadgesection').style.display = 'none';
}

function breadcrumb4() {
  removeAllActiveBreadCrumbs();
  document.getElementById('breadcrumb4').classList.add('is-active');
  document.getElementById('settingssection').style.display = 'none';
  document.getElementById('similarsection').style.display = 'block';
  document.getElementById('contextmenusection').style.display = 'none';
  document.getElementById('institutesection').style.display = 'none';
  document.getElementById('nobadgesection').style.display = 'none';
}
function breadcrumb5() {
  removeAllActiveBreadCrumbs();
  document.getElementById('breadcrumb5').classList.add('is-active');
  document.getElementById('settingssection').style.display = 'none';
  document.getElementById('similarsection').style.display = 'none';
  document.getElementById('contextmenusection').style.display = 'none';
  document.getElementById('institutesection').style.display = 'none';
  document.getElementById('nobadgesection').style.display = 'block';
}

function removeAllActiveBreadCrumbs() {
  document.getElementById('breadcrumb1').classList.remove('is-active');
  document.getElementById('breadcrumb2').classList.remove('is-active');
  document.getElementById('breadcrumb3').classList.remove('is-active');
  document.getElementById('breadcrumb4').classList.remove('is-active');
  document.getElementById('breadcrumb5').classList.remove('is-active');
}

function removeinstitute() {

  // get UUID
  chrome.storage.local.get(['uuid'], (items) => { 
    const uuidv4 = items['uuid'];
    // clear Storage
    chrome.storage.local.clear(function() {
      document.getElementById("selectedinstitute").setAttribute("institute", ''); 
      document.getElementById("selectedinstitute").innerHTML = '';
      document.getElementById("selectedinstitute").style.display = 'none';
      // do initial setup, set old uuid
      if (typeof uuidv4 != 'undefined') {
        doInitialSetup(uuidv4);
      }
      else {
        doInitialSetup();
      }
      
    });
  })
}


localizeHtmlPage();


document.addEventListener('DOMContentLoaded', setup);
document.addEventListener('DOMContentLoaded', isTouchScreen);
// document.getElementById('save').addEventListener('click', saveOptions);
document.getElementById('save_additionalsources').addEventListener('click', saveOptions);
document.getElementById('save_similar').addEventListener('click', saveOptions);
document.getElementById('save_contextmenu').addEventListener('click', saveOptions);
document.getElementById('save_institute').addEventListener('click', saveOptions);
document.getElementById('save_badge').addEventListener('click', saveOptions);
// document.getElementById('proxysearch').addEventListener('click', proxySearch);
// document.getElementById('institute').addEventListener("keyup", function(event) {
//   if (event.key === "Enter") {
//       proxySearch();
//   }
// });
document.getElementById('instituteupdate').addEventListener('click', reloadSettings);
document.getElementById('breadcrumb1a').addEventListener('click', breadcrumb1);
document.getElementById('breadcrumb2a').addEventListener('click', breadcrumb2);
document.getElementById('breadcrumb3a').addEventListener('click', breadcrumb3);
document.getElementById('breadcrumb4a').addEventListener('click', breadcrumb4);
document.getElementById('breadcrumb5a').addEventListener('click', breadcrumb5);
document.getElementById('selectedinstitute').addEventListener('click', removeinstitute);
document.getElementById('selectsearch').addEventListener('change', saveOptions);
document.getElementById('core').addEventListener('change', saveOptions);
document.getElementById('oab').addEventListener('change', saveOptions);
document.getElementById('core1').addEventListener('change', saveOptions);
document.getElementById('opencitation').addEventListener('change', saveOptions);
document.getElementById('retractionwatch').addEventListener('change', saveOptions);
document.getElementById('nobadge').addEventListener('change', saveOptions);
document.getElementById('ebscouc').addEventListener('change', saveOptions);


document.addEventListener('DOMContentLoaded', () => {

  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  // Add a click event on each of them
  $navbarBurgers.forEach( el => {
    el.addEventListener('click', () => {
      // Get the target from the "data-target" attribute
      const target = el.dataset.target;
      const $target = document.getElementById(target);

      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      el.classList.toggle('is-active');
      $target.classList.toggle('is-active');

    });
  });

});