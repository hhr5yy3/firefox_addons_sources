var oah_loaded = 0; // eslint-disable-line no-var
var oah_processedSinglePageApplication = false; // eslint-disable-line no-var
var spaUrl = location.href; // eslint-disable-line no-var

var preprintServers = ['arxiv.org', 'biorxiv.org', 'osf.io', 'engrxiv.org', 'psyarxiv.com', 'paleorxiv.org', 'eartharxiv.org', 'edarxiv.org', 'arabixiv.org', 'indiarxiv.org', 'biohackrxiv.org', 'ecoevorxiv.org', 'ecsarxiv.org', 'frenxiv.org', 'mediarxiv.org', 'thesiscommons.org']; // eslint-disable-line no-var


/**
* The oahelper object is going to be the key to the extension
*/

let oahelper = {
  configuration: {},
  doi: [],
  shouldExtProxy: {},
  freeAccess: {},
  alternativeAccess: {},
  subscriptionAccess: {},
  addOnFeatures: {},
  hideAlternativeAccess: false, // this is used for sites that offer PDF Full Text (e.g. ebscohost.com),
  currentUrl: '',
  isSpa: false,
};


/*******
* 
*  Getting the extension started
* 
*/

if (typeof (EXT_NAME_CONTENT_SCRIPT_LOADED) === 'undefined') {
  var EXT_NAME_CONTENT_SCRIPT_LOADED = true;
  
  const ExtName = {};
  
  //---------------------------------------------------------------------------------
  ExtName.initialize = function () {
    docReady(() => {
      if (!inIframe() && oah_loaded == 0) {
        oah_loaded++;
        if (onSupportedDomain('psycnet.apa.org') || onSupportedDomain('discovery.ebsco.com') || onSupportedDomain('research.ebsco.com')) {
          oahelper.isSpa = true;
          document.addEventListener('click', () => {
            requestAnimationFrame(() => {
              if(oahelper.currentUrl != location.href) {
                singlePageApplications();
              }
            });
          }, true);
          if (!oah_processedSinglePageApplication) {
            getConfigurationAndStart();
          }
        }
        else {
          getConfigurationAndStart();
        }
        findOAHelperWebsite();
        addMessageListener();
      }
    });
  };
  
  ExtName.initialize();
}

function docReady(fn) {
  // see if DOM is already available
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    // call on next available tick
    setTimeout(fn, 1);
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

// Check, if extension script was injected into iframe
function inIframe() {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
}

function singlePageApplications() {
  if (spaUrl !== location.href && oah_processedSinglePageApplication) {
    oah_processedSinglePageApplication = true;
    removeMyself();
    setTimeout(() => {
      getConfigurationAndStart();
    }, 4000);
  }
  else if(!oah_processedSinglePageApplication) {
    // ebsco falls into this one
    removeMyself();
    getConfigurationAndStart();
  }
  spaUrl = location.href;
}

/*****
* 
*  Getting the configuration from background.js - this will help us
*  understand what we need to get right
* 
*/

function getConfigurationAndStart() {
  chrome.runtime.sendMessage({ mode: 'getoptions' }, async (response) => {
    if (response != undefined && response.options != undefined && !response.options != null) {
      oahelper.configuration = response.options;
      oahelper.doi = await getDOIs();
      oahelper.shouldExtProxy = shouldProxy(window.location.href);
      oahelper.freeAccess = await findFreeAccess();
      oahelper.alternativeAccess = await checkAlternativeAccess(oahelper.doi);
      oahelper.addOnFeatures = await checkAddOnFeatures(oahelper.doi);
      // let's not waste time, if subscription access is not enabled AND unpaywall didn't have an oaVersion
      // might need to consider checking oaVersion too
      if (shouldDoSubscriptionAccess()) {
        oahelper.subscriptionAccess = await checkSubscriptionAccess(oahelper.doi);
      }
      processAccessData();
      addCitationCount();
      addRetractionWatch();
      onAccessLocation();
      onOpenAthensFourOhFour();
    }
  });
}

function shouldDoSubscriptionAccess() {
  if (oahelper.configuration.ebsco_cgp == 'unset') {
    return false;
  }
  if (oahelper.configuration.ebsco_cgp == '') {
    return false;
  }
  if (oahelper.configuration.ebscouc != undefined && !oahelper.configuration.ebscouc) {
    return false;
  }
  if (oahelper.alternativeAccess.unpaywall.isOA && oahelper.alternativeAccess.unpaywall.version == 'publishedVersion') {
    return false;
  }
  return true;
}

async function getDOIs() {
  return new Promise(async resolve => {
    if(oahelper.isSpa) {
      let doi = await Promise.all([find_DOI_webscraping()]);
      resolve(doi.flat());
    }
    else {
      let doi = await Promise.all([find_DOI_Metatags(), find_DOI_Metaschema(), find_DOI_MetaProperty(), find_DOI_CSS_Selector(), find_DOI_webscraping()]);
      resolve(doi.flat());
    }
  });
}

async function checkAlternativeAccess(doi) {
  return new Promise(async resolve => {
    let alternativeAccess = await Promise.all([checkUnpaywall(doi), checkCore(doi), makeIll(doi)]);
    let response = {
      unpaywall: alternativeAccess[0],
      core: alternativeAccess[1],
      ill: alternativeAccess[2]
    };
    resolve(response);
  });
}

async function checkSubscriptionAccess(doi) {
  return new Promise(async resolve => {
    let subscriptionAccess = await Promise.all([checkEBSCO(doi)]);
    let response = {
      ebsco: subscriptionAccess[0]
    };
    resolve(response);
  });
}

async function checkAddOnFeatures(doi) {
  return new Promise(async resolve => {
    let addOnFeatures = await Promise.all([checkOpenCitations(doi), checkRetractionWatch(doi)]);
    let response = {
      opencitations: addOnFeatures[0],
      retractionwatch: addOnFeatures[1]
    };
    resolve(response);
  });
}

function onOpenAthensFourOhFour() {
  if (oahelper.configuration.url != undefined && oahelper.configuration.url != '' && oahelper.configuration.url.length > 0 && window.location.href.includes(oahelper.configuration.url) && document.title == "OpenAthens: 404") {
    const elements = document.getElementsByClassName('unauthLink');
    const requiredElement = elements[0];

    const newDiv = document.createElement("div");
    newDiv.id = "oahelper_openathens_404";
    newDiv.innerHTML = "<div class=\"error-title\">Hello from Open Access Helper!</div><p>My apologies for bringing you to a page that might look a bit scary.</p><p>It simply means that your institution hasn't configured this domain for OpenAthens access. You might want to let them know.</p><p>For now, the best thing to do is click the link above or hit the back button. Thanks so much for your understanding!</p>";
    requiredElement.append(newDiv);
  }
}


/**
*  DOI Related Function
*  - includes the AsyncFunction of trying to find content in different places
*  - + helper functions, which validat we found a DOI, clean it, etc.
*/



function find_DOI_Metatags() {
  return new Promise(resolve => {
    // we are going to look in meta-tags for the DOI
    const option = ['citation_doi', 'doi', 'dc.doi', 'dc.identifier', 'dc.identifier.doi', 'bepress_citation_doi', 'rft_id', 'dcsext.wt_doi', 'DC.identifier', 'publication_doi'];
    const doi = [];
    for (i = 0; i < option.length; i++) {
      const potentialDoiArray = getMeta(option[i]);
      for (j = 0; j < potentialDoiArray.length; j++) {
        const testDoi = potentialDoiArray[j];
        if (testDoi != '' && isDOI(cleanDOI(testDoi))) {
          doi.push(cleanDOI(testDoi));
        }
      }
    }
    resolve(doi);
  });
}

function find_DOI_Metaschema() {
  return new Promise(resolve => {
    // in this case, we are looking for both meta-tag and its scheme
    const potentialDoiArray = getMetaScheme('dc.Identifier', 'doi');
    const doi = [];
    for (i = 0; i < potentialDoiArray.length; i++) {
      const testDoi = potentialDoiArray[i];
      if (testDoi != '' && isDOI(cleanDOI(testDoi))) {
        doi.push(cleanDOI(testDoi));
      }
    }
    resolve(doi);
  });
}

function find_DOI_MetaProperty() {
  return new Promise(resolve => {
    // this handled Research Gate or others that use meta property
    const selectors = ['citation_doi', 'doi', 'dc.doi', 'dc.identifier', 'dc.identifier.doi', 'bepress_citation_doi', 'rft_id', 'dcsext.wt_doi', 'DC.identifier'];
    let doi = [];
    for (i = 0; i < selectors.length; i++) {
      const testDoi = getMetaProperty(selectors[i]);
      if (testDoi != 0) {
        doi.push(cleanDOI(testDoi));
        break;
      }
    }
    resolve(doi);
  });
}

function find_DOI_CSS_Selector() {
  return new Promise(resolve => {
    // this is a place for more complex fallbacks, where we can provide additional "CSS-Selectors" to find
    // a DOI. Right now it really only handles two cases, but hopefully there will be aditional cases
    // in future
    const selectors = ['a[ref=\"aid_type=doi\"]', 'a.citation__doi__link'];
    let doi = [];
    for (i = 0; i < selectors.length; i++) {
      const testDoi = getFromSelector(selectors[i]);
      if (testDoi != 0) {
        doi.push(cleanDOI(testDoi));
        break;
      }
    }
    resolve(doi);
  });
}

function find_DOI_webscraping() {
  // if we cannot work through specific selectors, a more general scraping approach might be neeeded
  // to avoid doing this on every page, we specify the pages we support
  
  return new Promise(async resolve => {
    let doi = [];
    const domainArray = ['ieeexplore.ieee.org', 'nber.org', 'base-search.net', 'psycnet.apa.org', 'proquest.com', 'dl.acm.org', 'ebscohost.com', 'discovery.ebsco.com', 'research.ebsco.com']
    for(i=0; i<domainArray.length; i++) {
      if (onSupportedDomain(domainArray[i])){
        const functionName = domainArray[i].replaceAll('.','');
        // the timeout in IEEE causes trouble
        const testDoi = await webscrapers[functionName]();
        if (isDOI(testDoi)){
          doi.push(testDoi);
        }
        break;
      }
    }
    resolve(doi);
  });
}

function onSupportedDomain(domain){
  const host = window.location.hostname;
  if(host.indexOf(domain) > -1){
    return true;
  }
  const proxiedDomain = domain.replaceAll('.', '-')+'.';
  if(host.indexOf(proxiedDomain) > -1){
    return true;
  }
  return false;
}


function getMeta(metaName) {
  // get meta tags and loop through them. Looking for the name attribute and see if it is the metaName
  // we were looking for
  const metas = document.getElementsByTagName('meta');
  const response = [];
  
  for (let i = 0; i < metas.length; i++) {
    if (metas[i].getAttribute('name') === metaName) {
      response.push(metas[i].getAttribute('content'));
    }
  }
  return response;
}

function getMetaForAbstract(metaName) {
  // get meta tags and loop through them. Looking for the name attribute and see if it is the metaName
  // we were looking for
  const metas = document.getElementsByTagName('meta');

  for (let i = 0; i < metas.length; i++) {
    if (metas[i].getAttribute('name') === metaName) {
      return metas[i].getAttribute('content');
    }
  }

  return '0';
}

function getMetaScheme(metaName, scheme) {
  // pretty much the same as the other function, but it also double-checks the scheme
  const metas = document.getElementsByTagName('meta');
  const response = [];
  for (let i = 0; i < metas.length; i++) {
    if (metas[i].getAttribute('name') === metaName && metas[i].getAttribute('scheme') === scheme) {
      response.push(metas[i].getAttribute('content'));
    }
  }
  
  return response;
}

function getMetaProperty(metaName) {
  const metas = document.getElementsByTagName('meta');
  
  for (let i = 0; i < metas.length; i++) {
    if (metas[i].getAttribute('property') === metaName) {
      return metas[i].getAttribute('content');
    }
  }
  
  return 0;
}

function getFromSelector(selector) {
  // allow for more complex CSS selectors, these are likely more unreliable
  const elements = document.querySelectorAll(selector);
  
  for (let i = 0; i < elements.length; i++) {
    // make sure we test what we find to be a proper DOI
    if (isDOI(cleanDOI(elements[i].innerHTML))) {
      return cleanDOI(elements[i].innerHTML);
    }
  }
  
  return 0;
}

function cleanDOI(doi) {
  // clean for a few common known prefixes (well exactly one right now, but easy to expand
  const clean = ['info:doi/', 'https://doi.org/'];
  
  for (let i = 0; i < clean.length; i++) {
    doi = doi.replace(clean[i], '');
  }
  
  return doi;
}

function isDOI(doi) {
  // these regular expressions were recommended by CrossRef in a blog post
  // https://www.crossref.org/blog/dois-and-matching-regular-expressions/
  const regex1 = /^10.\d{4,9}\/[-._;()\/:A-Z0-9]+$/i;
  const regex2 = /^10.1002\/[^\s]+$/i;
  const regex3 = /^10.\d{4}\/\d+-\d+X?(\d+)\d+<[\d\w]+:[\d\w]*>\d+.\d+.\w+;\d$/i;
  const regex4 = /^10.1021\/\w\w\d+$/i;
  const regex5 = /^10.1207\/[\w\d]+\&\d+_\d+$/i;
  
  if (regex1.test(doi)) {
    return true;
  }
  if (regex2.test(doi)) {
    return true;
  }
  if (regex3.test(doi)) {
    return true;
  }
  if (regex4.test(doi)) {
    return true;
  }
  if (regex5.test(doi)) {
    return true;
  }
  
  return false;
}

function onSupportedDomain(domain){
  const host = window.location.hostname;
  if(host.indexOf(domain) > -1){
    return true;
  }
  const proxiedDomain = domain.replaceAll('.', '-')+'.';
  if(host.indexOf(proxiedDomain) > -1){
    return true;
  }
  return false;
}

function runRegexOnDoc(regEx) {
  const m = regEx.exec(document.documentElement.innerHTML);
  if (m && m.length > 1) {
    return m[1];
  }
  return false;
}

function runRegexOnText(text, regEx) {
  const m = regEx.exec(text);
  if (m && m.length > 1) {
    return m[1];
  }
  return false;
}


/**
* 
* Some Webpage specific functions, basically webscraping the heck out of things
* 
*/
var webscrapers = [];
webscrapers['ieeexploreieeeorg'] = async function(){
  return new Promise(resolve => {
    let returnDOI = [];
    setTimeout(() => {
      const regex = new RegExp('"doi":"([^"]+)"');
      const doi = runRegexOnDoc(regex);
      if (isDOI(doi)) {
        returnDOI.push(doi);
      }
      resolve(returnDOI);
    }, 1500);
  });
} 


webscrapers['nberorg'] = async function(){
  return new Promise(resolve => {
    let returnDOI = [];
    var regex = new RegExp('Document Object Identifier \\(DOI\\): (10.*?)<\\/p>');
    var doi = runRegexOnDoc(regex);
    if (isDOI(doi)) {
      returnDOI.push(doi);
    }
    resolve(returnDOI);
  });
}

webscrapers['basesearchnet'] = async function(){
  return new Promise(resolve => {
    let returnDOI = [];
    if (document.querySelectorAll('a.link-orange[href^="https://doi.org/"]').length > 0) {
    var doi = document.querySelectorAll('a.link-orange[href^="https://doi.org/"]')[0].href.replace('https://doi.org/', '').replace('http://doi.org/', '');
    if (isDOI(doi)) {
      returnDOI.push(doi);
    }
  }
  resolve(returnDOI);
});
}  

webscrapers['psycnetapaorg'] = async function(){
  return new Promise(resolve => {
    setTimeout(async ()=> {
      oahelper.doi = [];
      let doi = await Promise.all([find_DOI_Metatags(), find_DOI_Metaschema(), find_DOI_MetaProperty(), find_DOI_CSS_Selector()]);
      let returnArray = doi.flat();
      resolve(returnArray[0]);
    },2500);

  });
  
} 



webscrapers['proquestcom'] = async function(){
  return new Promise(resolve => {
    let returnDOI = [];
    if (document.querySelectorAll('.abstract_Text').length > 0) {
      var doiElements = document.querySelectorAll('.abstract_Text');
      var potentialDoi = doiElements[0];
      var regex = new RegExp('DOI:(10\..*)');
      var doi = runRegexOnText(potentialDoi.textContent, regex);
      if (isDOI(doi)) {
        returnDOI.push(doi);
      }
    }
    resolve(returnDOI);
  });
}

webscrapers['ebscohostcom'] = async function(){
  return new Promise(resolve => {
    let returnDOI = [];
    if ((onSupportedDomain('ebscohost.com') && document.location.href.indexOf('/detail') > -1) || (onSupportedDomain('discovery.ebsco.com') && document.location.href.indexOf('/details/') > -1)) {
      const fullTextIndicators = ['pdf-ft', 'html-ft', 'html-ftwg'];
      let isFullText = false;
      fullTextIndicators.forEach((item) => {
        const element = document.getElementsByClassName(item);
        if (element.length > 0) {
          isFullText = true;
        }
      });
      if(isFullText){
        oahelper.hideAlternativeAccess = true;
      }
      if (document.getElementsByTagName('dd').length > 0) {
        var doiElements = document.getElementsByTagName('dd');
        [...doiElements].forEach((element) => {
          if (element.textContent.indexOf('10.') == 0 && isDOI(element.textContent)) {
            returnDOI.push(element.textContent);
          }
        });
      }
    }
    resolve(returnDOI);
  });
  
}

webscrapers['researchebscocom'] = async function() {
  //console.log(`oah: research.ebsco.com`);
  return new Promise(resolve => {
    setTimeout(async ()=> {
      oahelper.doi = [];
      let doi = await Promise.all([find_DOI_Metatags()]);
      let returnArray = doi.flat();
      resolve(returnArray[0]);
    },4000);

  });
}

webscrapers['discoveryebscocom'] = async function(){
  //console.log(`oah: discovery.ebsco.com`);
  return new Promise(resolve => {
    setTimeout(async ()=> {
      oahelper.doi = [];
      let doi = await Promise.all([find_DOI_Metatags()]);
      let returnArray = doi.flat();
      resolve(returnArray[0]);
    },4000);

  });
}

webscrapers['dlacmorg'] = async function(){
  return new Promise(resolve => {
    let returnDOI = [];
    if (onSupportedDomain('dl.acm.org') && document.location.href.indexOf('/doi/') > -1) {
      doConsoleLog(translateOAHelper('content_console_002', 'dl.acm.org'));
      const urlParts = document.location.href.split('/doi/');
      if (isDOI(urlParts[1])) {
        returnDOI.push(urlParts[1]);
      }
    }
    resolve(returnDOI);
  });
}

/**
* 
*  Free Access, some publishers will provide free access to articles
*  The extension should indicate this too
* 
*/


async function findFreeAccess() {
  return new Promise(async resolve => {
    
    const host = window.location.hostname;
    const path = window.location.pathname;
    const generator = getMeta('Generator');
    let freeAccessResponse = {
      isFree: false,
      url: '',
      labelText: ''
    };
    
    if (host.indexOf('ingentaconnect') > -1) {
      freeAccessResponse = doIngentaConnect();
    } else if (host.indexOf('base-search.net') > -1 && window.location.href.indexOf('/Record/') > -1) {
      freeAccessResponse = doBaseSearch();
    } else if (host.indexOf('ieeexplore.ieee.org') > -1) {
      freeAccessResponse = doIEEExplore();
    } else if (host.indexOf('journals.sagepub.com') > -1 && path.indexOf('doi') > -1) {
      freeAccessResponse = doSagePub();
    } else if (host.indexOf('academic.oup.com') > -1) {
      freeAccessResponse = doOup();
    } else if (host.indexOf('bmj.com') > -1) {
      freeAccessResponse = doBmj();
    } else if (host.indexOf('cambridge.org') > -1) {
      freeAccessResponse = doCambridge();
    } else if (host.indexOf('onlinelibrary.wiley.com') > -1 && path.indexOf('doi') > -1) {
      freeAccessResponse = doWiley();
    } else if (host.indexOf('link.springer.com') > -1 && path.indexOf('article') > -1) {
      freeAccessResponse = doSpringerLink();
    } else if (host.indexOf('tandfonline.com') > -1 && path.indexOf('/doi/full/')){
      freeAccessResponse = doTandFOnline();
    } else if (document.location.href.indexOf('www.biorxiv.org') > -1 || document.location.href.indexOf('www.medrxiv.org') > -1) {
      freeAccessResponse = await doBioMedArxiv();
    } else if (
      document.location.href.indexOf('osf.io/preprints') > -1 || 
      document.location.href.indexOf('engrxiv.org/') > -1 ||
      document.location.href.indexOf('biohackrxiv.org/') > -1 ||
      document.location.href.indexOf('ecsarxiv.org') > -1 ||
      document.location.href.indexOf('frenxiv.org/') > -1 ||
      document.location.href.indexOf('mediarxiv.org/') > -1
      ) {
        freeAccessResponse = await doOSFArxiv();
      } else if (document.location.href.indexOf('arxiv.org') > -1) {
        freeAccessResponse = await doArxivOrg();
      } else if (document.location.href.indexOf('ascopubs.org') > -1) {
        freeAccessResponse = await ascopubs();
      }
      resolve(freeAccessResponse);
    });
  }
  
  
  async function doIngentaConnect() {
    // Ingenta Connect
    return new Promise(resolve => {
      let freeAccessResponse = {
        isFree: false,
        url: '',
        labelText: ''
      };
      if (document.querySelectorAll("span.access-icon img[alt='Open Access']").length > 0) {
        const onclick = document.querySelectorAll('a.fulltext.pdf')[0].getAttribute('onclick');
        if (onclick != null && onclick != '' && onclick.indexOf('javascript' > -1)) {
          const href = onclick.replace("javascript:popup('", '').replace("','downloadWindow','900','800')", '');
          if (href != null && href != '') {
            var url = `${window.location.protocol}//${host}${href}`;
            freeAccessResponse.isFree = true;
            freeAccessResponse.url = url;
            freeAccessResponse.labelText = 'Free Access';
          } 
        } 
        else {
          const { popup } = document.querySelectorAll('a.fulltext.pdf')[0].dataset;
          if (popup != null && popup != '' && popup.indexOf('download' > -1)) {
            if (popup != null && popup != '') {
              var url = `${window.location.protocol}//${host}${popup}`;
              freeAccessResponse.isFree = true;
              freeAccessResponse.url = url;
              freeAccessResponse.labelText = 'Free Access';
            } 
          }
        }
      }
      resolve(freeAccessResponse);
    });
  }
  
  async function doBmj() {
    return new Promise(resolve => {
      let freeAccessResponse = {
        isFree: false,
        url: '',
        labelText: ''
      };
      
      const bmjFreeAccessClass = 'highwire-access-icon highwire-access-icon-user-access user-access bmjj-free bmjj-free-access bmjj-access-tag';
      const pdf = getMeta('citation_pdf_url');
      
      if (document.querySelectorAll('svg.icon-open-access').length > 0) {
        if (pdf != '' && pdf.indexOf('http' == 0)) {
          freeAccessResponse.isFree = true;
          freeAccessResponse.url = pdf;
          freeAccessResponse.labelText = 'Open Access';
        } 
      } else if (document.getElementsByClassName(bmjFreeAccessClass).length > 0) {
        const freeAccess = document.getElementsByClassName(bmjFreeAccessClass);
        const bmjFree = false;
        for (i = 0; i < freeAccess.length; i++) {
          if (freeAccess[i].textContent == 'Free' && !bmjFree) {
            freeAccessResponse.isFree = true;
            freeAccessResponse.url = pdf;
            freeAccessResponse.labelText = 'Free Access';
          }
        }
      }
      resolve(freeAccessResponse); 
    });
  }
  
  async function doBaseSearch() {
    return new Promise(resolve => {
      let freeAccessResponse = {
        isFree: false,
        url: '',
        labelText: ''
      };
      if (document.querySelectorAll("img.pull-right[alt='Open Access']").length > 0) {
        freeAccessResponse = webscraperBadge('a.link-gruen.bold');
      } 
      resolve(freeAccessResponse);
    });
    
  }
  
  async function doIEEExplore() {
    return new Promise(resolve => {
      let freeAccessResponse = {
        isFree: false,
        url: '',
        labelText: ''
      };
      if (document.querySelectorAll('i.icon-access-open-access').length > 0) {
        freeAccessResponse = webscraperBadge('a.doc-actions-link.stats-document-lh-action-downloadPdf_2');
      }
      resolve(freeAccessResponse);
    });
  }
  
  async function doSagePub() {
    return new Promise(resolve => {
      let freeAccessResponse = {
        isFree: false,
        url: '',
        labelText: ''
      };
      if (document.querySelectorAll('img.accessIcon.freeAccess').length > 0) {
        freeAccessResponse = webscraperBadge('a[data-item-name="download-PDF"]');
      } 
      else if (document.querySelectorAll('img.accessIcon.openAccess').length > 0) {
        freeAccessResponse = webscraperBadge('div.pdf-access>a');
      }
      else if (document.querySelectorAll('.meta-panel__access.meta-panel__access--free').length > 0) {
        freeAccessResponse = webscraperBadge('a[title^="PDF"]');
      }
      resolve(freeAccessResponse);
    });  
  }
  
  async function doOup() {
    return new Promise(resolve => {
      let freeAccessResponse = {
        isFree: false,
        url: '',
        labelText: ''
      };
      if (document.querySelectorAll('i.icon-availability_free').length > 0) {
        freeAccessResponse = webscraperBadge('a.article-pdfLink');
      }
      resolve(freeAccessResponse);
    });
  }
  
  async function doCambridge() {
    return new Promise(resolve => {
      let freeAccessResponse = {
        isFree: false,
        url: '',
        labelText: ''
      };
      
      if (document.querySelectorAll('span.entitled').length > 0) {
        const pdf = getMeta('citation_pdf_url');
        if (pdf != '' && pdf.indexOf('http' == 0)) {
          freeAccessResponse.isFree = true;
          freeAccessResponse.url = pdf;
          freeAccessResponse.labelText = 'Free / Subscription Access';
        }
      }
      resolve(freeAccessResponse);
    });
    
  }
  
  async function doWiley() {
    return new Promise(resolve => {
      let freeAccessResponse = {
        isFree: false,
        url: '',
        labelText: ''
      };
      
      const toCheck = document.querySelectorAll('div.article-citation > div > div.doi-access-container.clearfix > div > div');
      const toCheck2 = document.getElementById('pdf-iframe');
      if (toCheck.length > 0 && toCheck[0].innerHTML.indexOf('Free Access')) {
        if (toCheck2 === null) {
          const pdf = getMeta('citation_pdf_url');
          freeAccessResponse.isFree = true;
          freeAccessResponse.url = pdf;
          freeAccessResponse.labelText = 'Free Access';
        }
      }
      resolve(freeAccessResponse);
    });
  }
  
  async function doSpringerLink() {
    return new Promise(resolve => {
      let freeAccessResponse = {
        isFree: false,
        url: '',
        labelText: ''
      };
      
      const toCheck = document.querySelectorAll('div.download-article');
      if (toCheck.length > 0 && toCheck[0].innerHTML.indexOf('Download') > -1) {
        const pdf = getMeta('citation_pdf_url');
        freeAccessResponse.isFree = true;
        freeAccessResponse.url = pdf;
        freeAccessResponse.labelText = 'Free / Subscription Access';
      }
      resolve(freeAccessResponse);
    });
    
  }
  
  async function doTandFOnline(){
    return new Promise(resolve => {
      let freeAccessResponse = {
        isFree: false,
        url: '',
        labelText: ''
      };
      
      const toCheck = document.querySelectorAll('div.accessIconLocation');
      if (toCheck.length > 0 && toCheck[0].alt == 'Open access' && getMeta('citation_fulltext_world_readable').length > 0){
        freeAccessResponse.isFree = true;
        freeAccessResponse.url = window.location.href;
        freeAccessResponse.labelText = 'Open Access';
      }
      resolve(freeAccessResponse);
    });
  }
  
  function webscraperBadge(selector) {
    let freeAccessResponse = {
      isFree: false,
      url: '',
      labelText: ''
    };
    
    const selected = document.querySelectorAll(selector);
    if (selected.length == 0) {
      freeAccessResponse; 
    }
    const { href } = document.querySelectorAll(selector)[0];
    if (href != null && href != '') {
      const message = new Array();
      freeAccessResponse.isFree = true;
      freeAccessResponse.url = href;
      freeAccessResponse.labelText = 'Free Access (*)';
    }
    return freeAccessResponse;
  }
  
  async function doBioMedArxiv() {
    return new Promise(resolve => {
      setTimeout(() => {
        let freeAccessResponse = {
          isFree: false,
          url: '',
          labelText: ''
        };
        const possibleDocs = document.getElementsByClassName('article-dl-pdf-link link-icon');
        if (possibleDocs.length > 0) {
          for (const link of possibleDocs) {
            const href = link.getAttribute('href');
            if (href.indexOf('pdf') > -1) {
              const url = `${window.location.protocol}//${window.location.hostname}${href}`;
              freeAccessResponse.isFree = true;
              freeAccessResponse.url = url;
              freeAccessResponse.labelText = 'Preprint Server';
            }
          }
        }
        resolve(freeAccessResponse);
      }, 2000);
    });
  }
  
  async function doArxivOrg() {
    return new Promise(resolve => {
      setTimeout(() => {
        let freeAccessResponse = {
          isFree: false,
          url: '',
          labelText: ''
        };
        const possibleDocs = document.getElementsByClassName('abs-button download-pdf');
        if (possibleDocs.length > 0) {
          for (const link of possibleDocs) {
            const href = link.getAttribute('href');
            if (href.indexOf('pdf') > -1) {
              // I am on Open Access
              const url = `${window.location.protocol}//${window.location.hostname}${href}`;
              freeAccessResponse.isFree = true;
              freeAccessResponse.url = url;
              freeAccessResponse.labelText = 'Preprint Server';
            }
          }
        }
        resolve(freeAccessResponse);
      }, 2000);
    });
  }
  
  async function doOSFArxiv() {
    return new Promise(resolve => {
      let freeAccessResponse = {
        isFree: false,
        url: '',
        labelText: ''
      };
      
      setTimeout(() => {
        
        const classArray = ['btn btn-primary p-v-xs', 'btn btn-primary p-v-xsf', 'pdf-download-link'];
        classArray.forEach(className => {
          const possibleDocs = document.getElementsByClassName(className);
          if (possibleDocs.length > 0) {
            for (const link of possibleDocs) {
              const href = link.getAttribute('href');
              if (href.indexOf('download') > -1) {
                // I am on Open Access
                const url = `${href}`;
                freeAccessResponse.isFree = true;
                freeAccessResponse.url = url;
                freeAccessResponse.labelText = 'Preprint Server';
              }
            }
          }
        });
        resolve(freeAccessResponse);
      }, 2000);
    });
  }

  async function ascopubs() {
    return new Promise(resolve => {
      setTimeout(() => {
        let freeAccessResponse = {
          isFree: false,
          url: '',
          labelText: ''
        };
        const classArray = ['icon-open_access', 'icon-lock_open'];
        classArray.forEach(className => {
          const possibleDocs = document.getElementsByClassName(className);
          if (possibleDocs.length > 0) {
                // I am on Open Access
                const url = `${window.location.href}`;
                freeAccessResponse.isFree = true;
                freeAccessResponse.url = url;
                freeAccessResponse.labelText = possibleDocs[0].getAttribute('title') ?? 'Free Access';
          }
        })
        resolve(freeAccessResponse);
      }, 1000);
    });
  }
  
  /**
  * 
  *  support Proxy
  * 
  */
  
  function shouldProxy(currenturl) {
    let returnValue = {
      toProxy: false,
      prefix: '',
      proxiedUrl: ''
    };
    returnValue['toProxy'] = false;
    if (oahelper.configuration.domainurl == undefined || oahelper.configuration.domainurl == "undefined" || oahelper.configuration.domainurl == '') {
      returnValue.toProxy = true;
      returnValue.prefix = oahelper.configuration.url;
      if (oahelper.configuration.url != undefined && oahelper.configuration.url != '' && (oahelper.configuration.url.includes("go.openathens.net") || oahelper.configuration.url.includes("qurl="))) {
        returnValue.proxiedUrl = oahelper.configuration.url + encodeURIComponent(currenturl);
      }
      else {
        returnValue.proxiedUrl = oahelper.configuration.url + currenturl;
      }
    }
    else{
      oahelper.configuration.supportedDomains.forEach(function(a){
        //  console.log(a);
        if (typeof(a) == 'string' && currenturl.indexOf(a)>-1) {
          returnValue.toProxy = true;
          returnValue.prefix = oahelper.configuration.url;
          if (oahelper.configuration.url != undefined && oahelper.configuration.url != '' && (oahelper.configuration.url.includes("go.openathens.net") || oahelper.configuration.url.includes("qurl="))) {
            returnValue.proxiedUrl = oahelper.configuration.url + encodeURIComponent(currenturl);
          }
          else {
            returnValue.proxiedUrl = oahelper.configuration.url + currenturl;
          }
        }        
      });
    }
    return(returnValue);
  }
  
  /**
  * 
  * Function to support check Access Options
  * 
  */
  
  async function checkUnpaywall(doi) {
    let cleanedDOI = doi[0];
    
    return new Promise(resolve => {  
      var unpaywall = {
        source: 'unpaywall.org',
        enabled: true,
        isOA: false,
        url: '',
        version: '',
        title: 'Open Access Version found from unpaywall.org',
        doi: cleanedDOI
      };
      if(doi.length == 0) {
        resolve(unpaywall);
      }
      else {
        const mode = 'unpaywall';
        chrome.runtime.sendMessage({ mode, cleanedDOI }, (response) => {
          if (response.data.is_oa && response.data.best_oa_location != null) {
            unpaywall.url = response.data.best_oa_location.url;
            unpaywall.isOA = true;
            unpaywall.version = response.data.best_oa_location.version
          }
          resolve(unpaywall);
        });
      }
    });
  }
  
  async function checkCore(doi) {
    return new Promise(resolve => {
      let cleanedDOI = doi[0];
      let coreData = {
        source: 'core.ac.uk',
        enabled: false,
        isOA: false,
        url: '',
        version: '',
        title: '',
        doi: cleanedDOI
      };
      const mode = 'coreoa';
      // if user has EBSCO configured, we'll skip the core.ac.uk check
      if(oahelper.configuration != null && oahelper.configuration.ebsco_cgp != undefined && oahelper.configuration.ebsco_cgp != 'unset') {
        resolve(coreData);
      }
      else if(oahelper.configuration != null && oahelper.configuration.core && doi.length != 0){
        coreData.enabled = true;
        chrome.runtime.sendMessage({ mode, cleanedDOI }, (response) => {
          if (response.data.fullTextLink != null) {
            coreData.isOA = true,
            coreData.url = response.data.fullTextLink;
            coreData.title = 'Open Access Version found from core.ac.uk',
            coreData.version = 'core.ac.uk'
          }
          resolve(coreData);
        });
      }
      else {
        resolve(coreData);
      }
    });
  }

  async function checkEBSCO(doi) {
    return new Promise(resolve => {
      let cleanedDOI = doi[0];
      let ebsco_cgp = oahelper.configuration.ebsco_cgp;
      let ebscoData = {
        source: 'ebsco',
        enabled: false,
        isAvailable: false,
        url: '',
        doi: cleanedDOI
      };
      const mode = 'ebsco';
      if(oahelper.configuration != null && doi.length != 0 && oahelper.configuration.ebsco_cgp != undefined && oahelper.configuration.ebsco_cgp != 'unset'){
        ebscoData.enabled = true;
        chrome.runtime.sendMessage({ mode, cleanedDOI, ebsco_cgp }, (response) => {
          if(response.data.link != undefined) {
            ebscoData.isAvailable = true;
            ebscoData.url = response.data.link;
          }
          resolve(ebscoData);
        });
      }
      else {
        resolve(ebscoData);
      }
    });
  }
  
  async function checkOpenCitations(doi) {
    const cleanedDOI = doi[0];
    
    let openCitations = {
      source: 'opencitations',
      enabled: false,
      citationCount: 0,
      doi: cleanedDOI,
      url: ''
    }
    return new Promise(resolve => {
      if (oahelper.configuration != null && oahelper.configuration.opencitation) {
        const mode = 'citationcount';
        chrome.runtime.sendMessage({ mode, cleanedDOI }, (response) => {
          if (response.citationCount != undefined && response.citationCount > 0) {
            openCitations.enabled = true;
            openCitations.citationCount = response.citationCount; 
            openCitations.url = `https://www.oahelper.org/opencitations/?doi=${cleanedDOI}`;
          }
          resolve(openCitations);
        });
      }
      else {
        resolve(openCitations);
      }
    });
  }

  async function checkRetractionWatch(doi) {
    const cleanedDOI = doi[0];
    
    let retractionWatch = {
      source: 'retractionWatch',
      enabled: false,
      is_retracted: false,
      doi: cleanedDOI,
      url: '',
      label: '',
      urls: [],
      reasonsons: []
    }
    return new Promise(resolve => {
      if (oahelper.configuration != null && oahelper.configuration.retractionwatch) {
        const mode = 'retractionwatch';
        chrome.runtime.sendMessage({ mode, cleanedDOI }, (response) => {
          if (response.data.is_retracted != undefined && response.data.is_retracted) {
            retractionWatch.enabled = true;
            retractionWatch.is_retracted = response.data.is_retracted;
            retractionWatch.label = response.data.label ?? 'Retraction';
            retractionWatch.url = response.data.urls[0] ?? `https://www.otzberg.net/retractionwatch/index.php?doi=${cleanedDOI}`;
            retractionWatch.urls = response.data.urls;
            retractionWatch.reasons = response.data.reasons;
          }
          resolve(retractionWatch);
        });
      }
      else {
        resolve(retractionWatch);
      }
    });
  }

  function makeIll(doi) {
    const cleanDOI = doi[0];
    let ill = {
      source: 'ill',
      enabled: false,
      doi: cleanDOI,
      url: ''
    };
    return new Promise(resolve => {
      if (oahelper.configuration.ill && oahelper.configuration.illurl != ''){
        ill.enabled = true;
        ill.url =  `${oahelper.configuration.illurl}${cleanDOI}`;
      }
      resolve(ill);
    });
  }
  
  
  /****
  * 
  * inject the Open Access or Subscription Buttons
  * 
  */
  
  async function processAccessData() {
    if(oahelper.hideAlternativeAccess){
      return;
    }
    oahelper.currentUrl = location.href;
    let message =  {
      version: '',
      url: '',
      title: '',
      source: '',
      doi: ''
    };
    // I need to determine the rules under which to show this badge
    if(oahelper.subscriptionAccess.ebsco != undefined && oahelper.subscriptionAccess.ebsco.isAvailable){
      message.version = 'subscription';
      message.url = oahelper.subscriptionAccess.ebsco.url;
      message.title = 'Access through your institution\'s subscription';
      message.source = 'EBSCOhost';
      message.doi = oahelper.subscriptionAccess.ebsco.doi;
      injectSubscriptionBadge(message);
    }
    else if(oahelper.alternativeAccess.unpaywall.isOA) {
      message.version = oahelper.alternativeAccess.unpaywall.version;
      message.url = oahelper.alternativeAccess.unpaywall.url;
      message.title = oahelper.alternativeAccess.unpaywall.title;
      message.source = oahelper.alternativeAccess.unpaywall.source;
      message.doi = oahelper.alternativeAccess.unpaywall.doi;
      injectAccessBadge(message);
    }
    else if(oahelper.alternativeAccess.core.enabled && oahelper.alternativeAccess.core.isOA) {
      message.version = oahelper.alternativeAccess.core.version;
      message.url = oahelper.alternativeAccess.core.url;
      message.title = oahelper.alternativeAccess.core.title;
      message.source = oahelper.alternativeAccess.core.source;
      message.doi = oahelper.alternativeAccess.core.doi;
      injectAccessBadge(message);
    }
    else if(oahelper.freeAccess.isFree != undefined && oahelper.freeAccess.isFree && oahelper.freeAccess.url != '') {
      message.version = oahelper.freeAccess.labelText;
      message.url = oahelper.freeAccess.url;
      message.title = oahelper.freeAccess.labelText;
      message.source = oahelper.freeAccess.labelText;
      message.doi = ''
      injectAccessBadge(message);
    }
    else {
      requestDocument();
    }
    
  }
  
  function injectAccessBadge(message) {
    if(message.version == ''){
      return;
    }
    // here we inject the icon into the page
    const src = chrome.runtime.getURL('images/oahelper_white.svg'); // padlock
    const oaVersionString = makeOaVersion(message.version);
    
    let oaVersion = '';
    if (oaVersionString != '') {
      oaVersion = ` - OA Version: ${oaVersionString}`;
    } else {
      oaVersion = 'CORE Discovery';
    }
    
    
    const div = document.createElement('div');
    div.innerHTML = `<div class="oahelper_doifound" id="oahelper_open1" data-url="${message.url}" title="${message.title}${oaVersion} | Location: ${message.url}"><img id="oahelper_doicheckmark" src="${src}" align="left" title="${message.title}${oaVersion} | Location: ${message.url}" data-oaurl="${message.url}" data-badge="!" data-doi="${message.doi}"/><span id="oahelper_oahelpmsg">${oaVersionString}</span></div><span id="oahelper_LiveRegion" role="alert" aria-live="assertive" aria-atomic="true"></span>`; // data-oaurl is a gift to ourselves
    div.id = 'oahelper_doifound_outer';
    div.className = 'oahelper_doifound_outer';
    if (oahelper.configuration.nobadge) {
      div.className = 'oah_hidden';
    }
    
    if (document.body.parentNode.parentNode != '#document') {
      document.body.appendChild(div);
      //doOaHelperLiveRegion(message.title);
      const element = document.getElementById('oahelper_open1');
      element.addEventListener("click", oahelper_open1, false);
    }
    
    if(oaVersionString == 'Core.ac.uk'){
      chrome.runtime.sendMessage({ mode: 'setOrangeIcon' }, (response) => {
        // console.log(response);
      });
    }
    else if(oaVersionString == 'Free Access (*)') {
      chrome.runtime.sendMessage({ mode: 'setGreenIcon' }, (response) => {
        // console.log(response);
      });
    }
    
  }

  function injectSubscriptionBadge(message) {
    if(message.version == ''){
      return;
    }
    // here we inject the icon into the page
    const src = chrome.runtime.getURL('images/ebsco_e.svg'); // EBSCO E   
    
    const div = document.createElement('div');
    div.innerHTML = `<div class="oahelper_doifound" id="oahelper_ebsco" data-url="${message.url}" title="${message.title} | Location: ${message.url}"><img id="oahelper_doicheckmark" src="${src}" align="left" title="${message.title} | Location: ${message.url}" data-oaurl="${message.url}" data-badge="e" data-doi="${message.doi}"/><span id="oahelper_oahelpmsg">${translateOAHelper('ebsco_access')}</span></div><span id="oahelper_LiveRegion" role="alert" aria-live="assertive" aria-atomic="true"></span>`; // data-oaurl is a gift to ourselves
    div.id = 'oahelper_doifound_outer';
    div.className = 'oahelper_doifound_outer ebsco_badge';
    if (oahelper.configuration.nobadge) {
      div.className = 'oah_hidden';
    }
    
    if (document.body.parentNode.parentNode != '#document') {
      document.body.appendChild(div);
      //doOaHelperLiveRegion(message.title);
      const element = document.getElementById('oahelper_ebsco');
      element.addEventListener("click", oahelper_ebsco, false);
    }
    
    chrome.runtime.sendMessage({ mode: 'setEBSCOicon' }, (response) => {
      // console.log(response);
    });
    
  }
  
  function makeOaVersion(version) {
    const translation = translateOAHelper(`content_version_${version}`);
    if (translation.length == 0) {
      return version;
    }
    return translation;
  }
  
  function oahelper_open1() {
    const element = document.getElementById('oahelper_open1');
    const url = element.dataset.url;
    chrome.runtime.sendMessage({ mode: 'openTab', url }, (response) => {
      // console.log(response);
    });
  }
  
  function oahelper_ebsco() {
    const element = document.getElementById('oahelper_ebsco');
    const url = element.dataset.url;
    injectWillOpenSoonNotice();
    chrome.runtime.sendMessage({ mode: 'openEBSCO', url }, (response) => {
      if(response.mode == 'ebscoopenfailed') {
        ebscoOpenFailed();
      }
      else {
        removeWillOpenSoonNotice();
      }
      
    });
  }

  function injectWillOpenSoonNotice() {
    const div = document.createElement('div');
    div.innerHTML = `<span>${translateOAHelper('ebsco_open_soon')}</span>`;
    div.id = 'ebsco_will_open';
    if (document.body.parentNode.parentNode != '#document') {
      document.body.appendChild(div);
    }
  }

  function removeWillOpenSoonNotice() { 
    document.getElementById('ebsco_will_open').remove();
  }

  function ebscoOpenFailed() {
    let element = document.getElementById('ebsco_will_open');
    element.innerHTML = `<span>${translateOAHelper('ebsco_open_fail')}</span>`;
  }

  /***
  * 
  * Handle Citation Button
  * 
  */
  
  function addCitationCount() {
    const doi = oahelper.addOnFeatures.opencitations.doi;
    const count = oahelper.addOnFeatures.opencitations.citationCount;
    
    if(count == 0){
      return;
    }

    const url = `https://www.oahelper.org/opencitations/?doi=${doi}`;
    const message = `${translateOAHelper('content_times_cited')} ${count}`;
    const src = chrome.runtime.getURL('images/ocicon.svg');
    const div = document.createElement('div');
    
    div.innerHTML = `<div class="oahelper_opencitations" onclick="window.open('${url}')" title="OpenCitations ${message}"><img id="oahelper_opencitations_logo" src="${src}" align="left" title="${message}" data-citcount="${count}" data-oaurl="${url}" data-badge="oc"/><span id="oahelper_opencitations_msg">${message}</span></div><span id="oahelper_opencitations_LiveRegion" role="alert" aria-live="assertive" aria-atomic="true"></span>`; // data-oaurl is a gift to ourselves
    div.id = 'oahelper_opencitations_outer';
    div.className = 'oahelper_opencitations_outer';
    if (oahelper.configuration.nobadge) {
      div.className = 'oah_hidden';
    }
    
    if (document.body.parentNode.parentNode != '#document') {
      document.body.appendChild(div);
    }
  }

  /***
  * 
  * Handle RetractionWatch
  * 
  */
  
  function addRetractionWatch() {
    const doi = oahelper.addOnFeatures.retractionwatch.doi ?? '';
    const is_retracted = oahelper.addOnFeatures.retractionwatch.is_retracted ?? false;
    const label = oahelper.addOnFeatures.retractionwatch.label ?? '';
    
    // if not retracted, if bad response, do not show the badge
    if(!is_retracted){
      return;
    }

    let url = `https://www.otzberg.net/retractionwatch/index.php?doi=${doi}`;
    if(oahelper.addOnFeatures.retractionwatch.urls.length > 0){
      url = oahelper.addOnFeatures.retractionwatch.urls[0];
    }
    const message = `${label}`;
    const src = chrome.runtime.getURL('images/oa_retraction_watch.svg');
    const div = document.createElement('div');
    
    div.innerHTML = `<div class="oahelper_retractionwatch" onclick="window.open('${url}')" title="retractionwatch: ${message}"><img id="oahelper_retractionwatch_logo" src="${src}" align="left" title="${message}" data-oaurl="${url}" data-badge="rw"/><span id="oahelper_retractionwatch_msg">${message}</span></div><span id="oahelper_retractionwatch_LiveRegion" role="alert" aria-live="assertive" aria-atomic="true"></span>`; // data-oaurl is a gift to ourselves
    div.id = 'oahelper_retractionwatch_outer';
    div.className = 'oahelper_retractionwatch_outer';
    if (oahelper.configuration.nobadge) {
      div.className = 'oah_hidden';
    }
    
    if (document.body.parentNode.parentNode != '#document') {
      document.body.appendChild(div);
    }
  }

  /***
   * 
   * Handle Ask the Library Button
   * 
   */

  function requestDocument() {
    const doi = oahelper.doi;
    let isPreprint = false;
    preprintServers.forEach((server) => {
      if (document.location.href.indexOf(server) > -1) {
        isPreprint = true;
      }
    });
  
    if (isPreprint) {
      return;
    }
  
    if (!oahelper.configuration.oab && !oahelper.configuration.ill) {
      return;
    }
    
    if(doi == '') {
      return;
    }

    const src = chrome.runtime.getURL('images/ask.svg'); // padlock
    let url = encodeURIComponent(location.href);
    let oabUrl = 'https://openaccessbutton.org/request?url=';
    let message = translateOAHelper('content_oab_001');
    let usermsg = 'Open Access Button';
    let databadge = 'oab';

    if(oahelper.configuration.ill){
      oabUrl = oahelper.alternativeAccess.ill.url;
      message = translateOAHelper('content_ill_001');
      url = '';
      usermsg = translateOAHelper('content_ill_002');
      databadge = 'ill';
    }

    const div = document.createElement('div');
    div.innerHTML = `<div class="oahelper_doifound" onclick="window.open('${oabUrl}${url}')" title="${message}"><img id="oahelper_doicheckmark" src="${src}" align="left"  title="${message}" data-oaurl="${oabUrl}${url}" data-badge="${databadge}" data-doi="${doi}"/><span id="oahelper_oahelpmsg">${usermsg}</span></div><span id="oahelper_LiveRegion" role="alert" aria-live="assertive" aria-atomic="true"></span>`; // data-oaurl is a gift to ourselves
    div.id = 'oahelper_doifound_outer';
    div.className = 'oahelper_doifound_outer oahelper_doiblue';
    if (oahelper.configuration.nobadge) {
      div.className = 'oah_hidden';
    }
  
    if (document.body.parentNode.parentNode != '#document') {
      document.body.appendChild(div);
    }
  
    chrome.runtime.sendMessage({ mode: 'setBlueIcon' }, (response) => {
      // console.log(response);
    });

    if(oahelper.configuration.core1 != undefined && oahelper.configuration.core1) {
      coreRecommenderStart(oahelper.doi[0]);
    }
  }

  function addMessageListener() {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if(request.mode == undefined){
        return true;
      }
      switch (request.mode) {
        case 'getBadge':
          sendResponse({ mode: 'getBadgeResponse', badge: getBadge() });
          return true;
        case 'popup':
          let configuration = oahelper.configuration
          sendResponse({ mode: 'popupAnswer', data: getPopupAnswer(), configuration });
          return true;
        case 'hidebadges':
          hideBadgeRequest();
          sendResponse({ mode: 'badgehidden' });
          return true;
        default:
          return true;
      }
    });
  }


  function getPopupAnswer() {
    let doi = '';
    if (oahelper.doi[0] != undefined) {
      doi = oahelper.doi[0];
    }
    let response = {
      oaurl: '',
      oastatus: '',
      suburl: '',
      substatus: false,
      citationcount: 0,
      citationurl: '',
      currenturl: window.location.href,
      illUrl: '',
      doi: doi,
      shouldProxy: false,
      rw_label: '',
      rw_url: ''
    };
    
    // unpaywall > core > freeAccess
    if (oahelper.alternativeAccess.unpaywall != undefined && oahelper.alternativeAccess.unpaywall.isOA) {
      response.oaurl = oahelper.alternativeAccess.unpaywall.url;
      response.oastatus = makeOaVersion(oahelper.alternativeAccess.unpaywall.version);
    }
    else if (oahelper.alternativeAccess.core != undefined && oahelper.alternativeAccess.core.enabled && oahelper.alternativeAccess.core.isOA) {
      response.oaurl = oahelper.alternativeAccess.core.url;
      response.oastatus = makeOaVersion(oahelper.alternativeAccess.core.version);
    }
    else if (oahelper.freeAccess.isFree != undefined && oahelper.freeAccess.isFree){
      response.oaurl = oahelper.freeAccess.url;
      response.oastatus = oahelper.freeAccess.labelText;
    }
    // subscription access - right now only EBSCO
    if (oahelper.subscriptionAccess.ebsco != undefined && oahelper.subscriptionAccess.ebsco.enabled && oahelper.subscriptionAccess.ebsco.isAvailable) {
      response.suburl = oahelper.subscriptionAccess.ebsco.url;
      response.substatus = oahelper.subscriptionAccess.ebsco.source;
    }
    // opencitations
    if (oahelper.addOnFeatures.opencitations != undefined && oahelper.addOnFeatures.opencitations.url != '') {
      response.citationurl = oahelper.addOnFeatures.opencitations.url;
    }

    if (oahelper.addOnFeatures.opencitations != undefined && oahelper.addOnFeatures.opencitations.citationCount > 0) {
      response.citationcount = oahelper.addOnFeatures.opencitations.citationCount;
    }
    // ILL form
    if (oahelper.alternativeAccess.ill != undefined && oahelper.alternativeAccess.ill.url != '') {
      response.illUrl = oahelper.alternativeAccess.ill.url;
    }
    // should offer a proxy button?
    if(oahelper.shouldExtProxy.toProxy != undefined && oahelper.shouldExtProxy.toProxy) {
      response.shouldProxy = true;
    }
    // retraction watch
    if (oahelper.addOnFeatures.retractionwatch != undefined && oahelper.addOnFeatures.retractionwatch.is_retracted) {
      response.rw_label = oahelper.addOnFeatures.retractionwatch.label;
      response.rw_url = oahelper.addOnFeatures.retractionwatch.url;
    }
    return response;
  }

  function onAccessLocation() {
    // if we are on free access, turn icon green right away
    if(oahelper.freeAccess.isFree) {
      onOpenAccess(oahelper.freeAccess.labelText);
      return;
    }
    // if there is no Open Access, nothing to make gree
    if(!oahelper.alternativeAccess.unpaywall.isOA && !oahelper.alternativeAccess.core.isOA) {
      return;
    }
    // there should be either unpaywall or core
    const mode 		= 'followUrl';
    let targetUrl = '';
    if(oahelper.alternativeAccess.unpaywall.isOA) {
      targetUrl = oahelper.alternativeAccess.unpaywall.url;
    }
    else if(oahelper.alternativeAccess.core.isOA) {
      targetUrl = oahelper.alternativeAccess.core.url;
    }

    const currentUrl 	= window.location.href;
    chrome.runtime.sendMessage({ mode, currentUrl, targetUrl }, (response) => {
      if (response.ona != undefined && response.ona == true) {
        // the current location is Open Access
        onOpenAccess(translateOAHelper('content_onoa_001'));
      }
    });

  }

  function onOpenAccess(title) {
    const src = chrome.runtime.getURL('images/oahelper_white_ok.svg');
    const div1 = document.getElementById('oahelper_doicheckmark');
    div1.dataset.badge = '✔';
    div1.src = src;
  }

  function getBadge() {
    let badge = 'black';
    // need to early on identify retractionwatch status
    if(oahelper.addOnFeatures.retractionwatch != undefined && oahelper.addOnFeatures.retractionwatch.is_retracted != undefined && oahelper.addOnFeatures.retractionwatch.is_retracted) {
      return 'warning';
    }
    // only after we are certain there is not retraction can we care about the rest
    if(oahelper.alternativeAccess.unpaywall != undefined && oahelper.alternativeAccess.unpaywall.isOA != undefined && oahelper.alternativeAccess.unpaywall.isOA) {
      badge = 'orange';
    }
    else if(oahelper.alternativeAccess.core != undefined && oahelper.alternativeAccess.core.isOA != undefined && oahelper.alternativeAccess.core.isOA) {
      badge = 'orange';
    }
    else if(oahelper.subscriptionAccess.ebsco != undefined && oahelper.subscriptionAccess.ebsco.isAvailable != undefined && oahelper.subscriptionAccess.ebsco.isAvailable) {
      badge = 'ebsco';
    }
    else if(oahelper.freeAccess.isFree != undefined && oahelper.freeAccess.isFree) {
      badge = 'green';
    }
    else if (oahelper.addOnFeatures.opencitations != undefined && oahelper.addOnFeatures.opencitations.citationcount > 0) {
      badge = 'purple';
    }
    else if (oahelper.alternativeAccess.ill != undefined && oahelper.alternativeAccess.ill.url != undefined && oahelper.alternativeAccess.ill.url != '') {
      badge = 'blue';
    }
    return badge
  }


  function translateOAHelper(key, variableArray = null) {
    const language = chrome.i18n.getUILanguage().substring(0,2);
    if(oahelper.configuration != undefined 
      && oahelper.configuration.translations != undefined 
      && oahelper.configuration.translations[key] != undefined
      && oahelper.configuration.translations[key][language] != undefined) 
    { 
        let textToReturn = oahelper.configuration.translations[key][language];
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

  function hideBadgeRequest() {
    const elementsToHide = ['oahelper_doifound_outer', 'oahelper_opencitations_outer', 'oahelper_corerecom_outer', 'oahelper_retractionwatch_outer'];
    elementsToHide.forEach((element) => {
      if (document.getElementById(element) != null) {
        document.getElementById(element).style.display = 'none';
      }
    });
  }

  /****
   * 
   * core.ac.uk Recommender Related Functions
   * 
   */

  function coreRecommenderStart(doistring) {
    infoString = translateOAHelper('content_corerecom_004');
    closeLabel = translateOAHelper('content_close_label');

    if (isDOI(doistring)) {
      var doi = doistring;
    } else {
      //console.log(doistring);
      return;
    }

    const currentUrl = document.URL;
    const docTitle = findTitle();
    const abstract = findAbstract();

    if (doi == '' && docTitle == '0' && abstract == '0') {
      return;
    }

    const src = chrome.runtime.getURL('images/recom.svg'); // padlock
    const message = chrome.i18n.getMessage('content_corerecom_001');

    const div = document.createElement('div');
    div.innerHTML = `<div class="oahelper_corerecom" title="${message}"><img id="oahelper_doicheckmark1" src="${src}" align="left"  title="${message}" data-doi="${doi}" data-badge=""/><span id="oahelper_oahelpmsg1">CORE Recommender</span></div>`; // data-oaurl is a gift to ourselves
    div.id = 'oahelper_corerecom_outer';
    div.className = 'oahelper_corerecom_outer oahelper_corecolor';
    if (oahelper.configuration.nobadge) {
      div.className = 'oah_hidden';
    }
    if (document.body.parentNode.parentNode != '#document') {
      document.body.appendChild(div);
    }
    const element = document.getElementById('oahelper_corerecom_outer');
    addRecommenderClickHandler(element, infoString, closeLabel);
  }

  function addRecommenderClickHandler(element, infoString, closeLabel) {
    element.addEventListener('click', (e) => {
      doCORERecom(infoString, closeLabel);
    }, false);
  }

  function findAbstract() {
    const locations = ['DC.description', 'dc.Description', 'DCTERMS.abstract', 'eprints.abstract', 'description', 'Description'];
    let abstract = '0';

    for (i = 0; i < locations.length; i++) {
      if (abstract == '0') {
        abstract = getMetaForAbstract(locations[i]);
      }
    }
    const ogLocation = ['og:description'];
    for (j = 0; j < ogLocation.length; j++) {
      if (abstract == '0') {
        abstract = getMetaProperty(ogLocation[j]);
      }
    }
    if (abstract.length > 2000) {
      abstract = abstract.substring(0, 2000);
    }
    return abstract;
  }

  function findTitle() {
    const locations = ['citation_title'];
    let title = '0';

    for (i = 0; i < locations.length; i++) {
      if (title == '0') {
        title = getMetaForAbstract(locations[i]);
      }
    }
    if (title == 0) {
      title = document.title;
    }

    return title;
  }


  function doCORERecom(infoString, closeLabel) {
    const element = document.getElementById('oahelper_doicheckmark1');

    const { doi } = element.dataset;
    const currentUrl = document.URL;
    const docTitle = findTitle();
    const abstract = findAbstract();

    // remove button
    const element1 = document.getElementById('oahelper_corerecom_outer');
    element1.parentNode.removeChild(element1);

    const imgSrc = chrome.runtime.getURL('images/loader.gif');
    const logoSrc = chrome.runtime.getURL('images/core_logo.svg');

    // add sidebar // TO DO: the X close needs to be translatable
    const div = document.createElement('div');
    div.innerHTML = `<div id="oahelper_corerecommendations" ><div id="oahelper_corerecom_intro"><img src="${logoSrc}" id="oahelper_core_logo"> Recommender <div id="oahelper_core_x" title="close">X ${closeLabel}</div></div><div id="oahelper_correcom_intro2">${infoString}</div><div id="oahelper_spinner"><img src="${imgSrc}"></div></div>`; // data-oaurl is a gift to ourselves
    div.id = 'oahelper_corerecommender_outer';
    div.className = 'oahelper_corerecommender_outer';
    if (oahelper.configuration.nobadge) {
      div.className = 'oah_hidden';
    }
    if (document.body.parentNode.parentNode != '#document') {
      document.body.appendChild(div);
    }

    const element2 = document.getElementById('oahelper_core_x');
    element2.addEventListener('click', dismissCoreRecommendations, false);

    setTimeout(() => {
      const element3 = document.getElementById('oahelper_corerecommender_outer');
      element3.classList.remove('oahelper_animate_out');
      element3.classList.add('oahelper_animate_in');
    }, 200);


    const mode = 'coreRecom';
    const infoString1 = translateOAHelper('content_corerecom_002');
    chrome.runtime.sendMessage({
      mode,
      doi,
      currentUrl,
      docTitle,
      abstract,
    }, (response) => {
      if(response.status == 'ok') {
        showRecommendations(response.recommendation, infoString1);
      }
      else if(response.status == 'rate limit'){
        //console.log(`oah: ${response}`);
        showCoreRateLimit(logoSrc, closeLabel);
      }
      else {
        dismissCoreRecommendations();
      }
      
    });
  }

  function dismissCoreRecommender() {
    doConsoleLog(chrome.i18n.getMessage('content_console_011'));

    var element = document.getElementById('oahelper_spinner');
    element.parentNode.removeChild(element);

    var element = document.getElementById('oahelper_correcom_intro2');
    element.parentNode.removeChild(element);

    const myRecomElement = document.getElementById('oahelper_corerecommendations');

    const div = document.createElement('div');
    div.className = 'oahelper_recommendation';
    div.innerHTML = `<p class="oahelper_recommendation_p">${translateOAHelper('content_corerecom_003')}</p>`;
    myRecomElement.appendChild(div);

    setTimeout(() => {
      dismissCoreRecommendations();
    }, 5500);
  }

  function showRecommendations(data, infoString) {
    const element = document.getElementById('oahelper_spinner');
    element.parentNode.removeChild(element);

    const intro = document.getElementById('oahelper_correcom_intro2');
    intro.innerHTML = infoString;

    const myRecomElement = document.getElementById('oahelper_corerecommendations');
    const obj = data;

    if (obj === null) {
      dismissCoreRecommendations();
      return;
    }

    for (i = 0; i < obj.length; i++) {
      var year = "";
      var authors = "";
      var link = "";
      var title = obj[i].title;
      var foundLink = false;
      if(obj[i].yearPublished != ""){
          year = "("+obj[i].yearPublished+") ";
      }
      //get three authors & et al
      if(obj[i].authors.length > 0){
          var maxAuthors = 3;
          if(obj[i].authors.length < 3) {
              maxAuthors = obj[i].authors.length;
          }
          for(j=0; j<maxAuthors; j++){
              authors += obj[i].authors[j].name+"; ";
          }
          if (obj[i].authors.length > 3 ){
              authors += " et al.";
          }
      }
      if(obj[i].links.length > 0){
          for(k=0; k<obj[i].links.length; k++){
              if(obj[i].links[k].type == "download" && !foundLink){
                  link = obj[i].links[k].url;
                  foundLink = true;
              }
              if(obj[i].links[k].type == "display" && !foundLink){
                  link = obj[i].links[k].url;
                  foundLink = true;
              }
          }
      }
      const div = document.createElement('div');
      div.className = 'oahelper_recommendation';
      div.innerHTML = `<p class="oahelper_recommendation_p"><a href="${link}" target="_blank" class="oahelper_recommendation_a">${title}</a><br>${year}${authors}</p>`;
      myRecomElement.appendChild(div);
    }
  }

  function dismissCoreRecommendations() {
    const element = document.getElementById('oahelper_corerecommender_outer');
    element.parentNode.removeChild(element);
  }

  function showCoreRateLimit(logoSrc, closeLabel){
    const element = document.getElementById('oahelper_spinner');
    element.parentNode.removeChild(element);

    const oldIntro = document.getElementById('oahelper_correcom_intro2');
    oldIntro.parentNode.removeChild(oldIntro);

    const myRecomElement = document.getElementById('oahelper_corerecommendations');
    const div = document.createElement('div');

    const myRecomIntro = document.getElementById('oahelper_corerecom_intro');
    myRecomIntro.parentNode.removeChild(myRecomIntro);

    const rateLimit = chrome.i18n.getMessage('content_corerecom_ratelimit');
    
    div.className = 'oahelper_recommendation';
    div.innerHTML = `<div id="oahelper_corerecom_intro"><img src="${logoSrc}" id="oahelper_core_logo"> Recommender <div id="oahelper_core_x" title="close">X ${closeLabel}</div></div><p class="oahelper_recommendation_p">${rateLimit}</p>`;
    myRecomElement.appendChild(div);

    const element2 = document.getElementById('oahelper_core_x');
    element2.addEventListener('click', dismissCoreRecommendations, false);

  }


  /******
   * 
   *  additional helpers
   * 
   */

  function removeMyself() {
    const elementRecom = document.getElementById('oahelper_corerecom_outer');
    if (elementRecom != null) {
      elementRecom.parentNode.removeChild(elementRecom);
    }
    const element = document.getElementById('oahelper_doifound_outer');
    if (element != null) {
      element.parentNode.removeChild(element);
    }
    const elementOpenCitation = document.getElementById('oahelper_opencitations_outer');
    if (elementOpenCitation != null) {
      elementOpenCitation.parentNode.removeChild(elementOpenCitation);
    }
  }

  /******
   * 
   * Dedetec OAHELPER Proxy Site
   * 
   */

  function findOAHelperWebsite(){
    const location = document.location.href;
    if(location.indexOf('https://www.oahelper.org/proxy' > -1)) {
      const results = document.getElementsByClassName('oahelper_institute_result');
      if(results.length != 0){
        for (let item of results) {
          let element = document.createElement('button')
          element.classList = 'oahelper_add_config';
          element.dataset.id = item.dataset.id;
          element.textContent = 'Add to Open Access Helper';
          item.appendChild(element);
        }
        const buttons = document.getElementsByClassName('oahelper_add_config')
        Array.from(buttons).forEach(function(element) {
          element.addEventListener('click', addConfigFromButton);
        });
      }
    }
  }
  
  function addConfigFromButton(){
    var id = this.dataset.id;
    chrome.runtime.sendMessage({ mode: 'saveSettingsFromWeb', id }, (response) => {
      this.classList = 'oahelper_add_config_success';
      this.textContent = 'Added to Open Access Helper';
    });
  }