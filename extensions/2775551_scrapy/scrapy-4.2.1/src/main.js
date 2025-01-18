///////////////
// Variables //
//////////////////////////////////////////////////////////////////////////////////////////

const defaultSiteUrl = "https://scrapy.co.za/";
const defaultApiUrl = "https://api.scrapy.co.za/";
const scrapyUserInputName = "scrapy-user-input";
const serverVersion = "4";

// User notification settings
var notificationSettings = null;

// Variables for settings users can change
var siteUrl, contribute, removeAds, iframeWidth, showlistingprice;

// Selector variables for where iframe is displayed
var takealotSelector, geewizSelector, wootwareSelector, diyelectronicsSelector, evetechSelector, incredibleSelector, hifiSelector, miaSelector, roboticsSelector, yuppiechefSelector, makroSelector;

// Page variables
var iframeAppended = false;
var pageUrl;
var apiVersionResponse;

// Load settings
chrome.storage.local.get("setting", function (fetchedData) {
    loadExtensionSettings(fetchedData);

    // Add hidden to page, and then read hidden value from the {site}.js file 
    console.log(`Scrapy: Is contributing - ${contribute}`);
    if (typeof contribute === 'undefined' || contribute == "" || contribute == true) {
        var input = document.createElement("input");
        input.setAttribute("type", "hidden");
        input.setAttribute("value", contribute);
        input.setAttribute("id", "scrapy-contribute");
        document.querySelectorAll('html')[0].append(input);
        addHelperScript();
        setTimeout(function () {
            addSiteScript();
        }, 100);
    }

    // Add hidden to page, and then read hidden value from the {site}.js file 
    console.log(`Scrapy: Is removing sponsored products - ${removeAds}`);
    if (typeof removeAds === 'undefined' || removeAds == "" || removeAds == true) {
        var input = document.createElement("input");
        input.setAttribute("type", "hidden");
        input.setAttribute("value", removeAds);
        input.setAttribute("id", "scrapy-removeAds");
        document.querySelectorAll('html')[0].append(input);
    }
});

document.addEventListener("DOMContentLoaded", async function () {
    documentReady();
});

window.addEventListener('message', function (message) {
    messageRecieved(message);
});

// Document ready
async function documentReady() {
    // Set current page url
    pageUrl = (window.location != window.parent.location) ? document.referrer : document.location.href;

    // Get the current version of scrapy
    await getVersion();

    // Check if extension is enabled
    if (apiVersionResponse.version <= serverVersion && apiVersionResponse.enabled == true) {
        // Load user settings
        await loadUserSettings();

        // Append iframe to website view on page load
        appendIframe();

        // Click event listener for SPA's - The Url might change but no page load triggered
        document.querySelector("body").addEventListener('click', function (e) {
            // Set new page url
            let newPageUrl = (window.location != window.parent.location) ? document.referrer : document.location.href;

            // Check if url changed
            if (pageUrl != newPageUrl) {
                // Set new page url
                pageUrl = newPageUrl;

                // remove iframe if it exists
                iframeAppended = false;
                let scrapyIframe = document.getElementById('scrapy-iframe');
                if (scrapyIframe != null) {
                    scrapyIframe.remove();
                }

                // Append iframe to website view
                appendIframe();
            }
        }, false);
    }
}

// Recieve messages from scrapy website
async function messageRecieved(message) {
    // Verify domain
    var origin = `${message.origin}/`;
    if (origin !== siteUrl)
        return;

    // Check message type
    if (typeof message.data === 'string' && message.data.includes('userId')) {
        // User settings message
        chrome.storage.local.set({ 'notification-settings': message.data });
    } else if (message.data == parseInt(message.data, 10)) {
        // Iframe size message
        resizeIframe(message.data);
    }
}


/////////////////////
// Notifications  //
//////////////////////////////////////////////////////////////////////////////////////////

// Load user notification settings, if no settings exist create new user account
async function loadUserSettings() {
    let settingJson = await readLocalStorage('notification-settings');

    // If no settings exist create new user account
    if (!settingJson) {
        // Load old user id
        var userId = await readLocalStorage('userId1222');
        if (!userId) {
            // Create new user id
            userId = await getNewUserId();
        }

        let settings = {
            userId: userId,
            email: false,
            push: false,
            firebaseToken: null,
            emailaddress: null
        }
        settingJson = JSON.stringify(settings);
        chrome.storage.local.set({ 'notification-settings': settingJson });
    }

   

    await appendUserInput(settingJson);
}

// Append user ID input to page
async function appendUserInput(settingJson) {
    let settings = JSON.parse(settingJson);
    if (settings) {
        notificationSettings = settings;
        let input = document.getElementById("scrapy-user-input");
        if (input == null) {
            input = document.createElement("input");
            input.setAttribute("type", "hidden");
            input.setAttribute("id", scrapyUserInputName);
            document.querySelectorAll('html')[0].append(input);
        }
        input.setAttribute("value", settings?.userId);
    }
}

// Retrieve new user id
async function getNewUserId() {
    const scrapyUrl = `${apiUrl}api/user/getuid`
    let res = await fetch(scrapyUrl);
    var json = await res.json();
    if (json.uid) {
        return json.uid;
    }
    return null;
}


//////////////////////
// Product history //
//////////////////////////////////////////////////////////////////////////////////////////

function appendIframe() {
    // Iframe settings
    let appendBottom = true; // If iframe should be appended or prepended
    let appendTimeout = false; // Set time to wait before adding iframe
    let appendLastIndex = false; // If iframe should be appended to last index of selector

    // Page settings
    let domain = getDomain();
    let productId = getProductId();

    let scrapyIframe = document.getElementById('scrapy-iframe');
    if (productId != null && iframeAppended == false && scrapyIframe == null) {
        iframeAppended = true;
        let selector;
        let iframe = document.createElement('iframe');
        switch (domain) {
            case "takealot":
                selector = takealotSelector;
                appendTimeout = true;
                break;
            case "geewiz":
                selector = geewizSelector;
                break;
            case "wootware":
                selector = wootwareSelector;
                break;
            case "diyelectronics":
                selector = diyelectronicsSelector;
                break;
            case "evetech":
                selector = evetechSelector;
                appendTimeout = true;
                break;
            case "incredible":
                selector = incredibleSelector;
                iframe.style.cssText = 'margin-top:64px';
                break;
            case "hificorp":
                selector = hifiSelector;
                iframe.style.cssText = 'margin-top:64px';
                break;
            case "mia.africa":
                selector = miaSelector;
                break;
            case "robotics":
                selector = roboticsSelector;
                break;
            case "yuppiechef":
                selector = yuppiechefSelector;
                appendBottom = false;
                break;
            case "makro":
                selector = makroSelector;
                appendBottom = false;
                appendTimeout = true;
                appendLastIndex = true;
                break;
            default:
                break;
        }

        // Create iframe from settings
        iframe.width = iframeWidth;
        iframe.height = 395;
        iframe.scrolling = 'no';
        iframe.frameBorder = 'no';
        iframe.id = 'scrapy-iframe';
        let src = siteUrl + `iframe?productId=${productId}&store=${domain}`;

        // Remove listing price from graph
        if (showlistingprice == 'False') {
            src += '&showListPrice=false';
        }

        // Disable notifications tab
        if (
            !notificationSettings || // No settings
            !notificationSettings.userId || // No user id
            (!notificationSettings?.email && !notificationSettings?.push) || // Haven't selected notification type
            (notificationSettings?.email && !notificationSettings?.emailaddress) || // Selected email but no email address
            (notificationSettings?.push && !notificationSettings?.firebaseToken) // Selected push but no firebase token
        ) {
            src += '&settings=true';
        }

        // Append userId
        let userId = notificationSettings?.userId;
        if (userId) {
            src += `&userId=${encodeURIComponent(userId)}`;
        }

        // Set iframe source
        iframe.src = src;

        // Append iframe to page using settings applied above
        if (appendTimeout) {
            setTimeout(function () {
                var productArea = document.querySelectorAll(selector);
                if (productArea && productArea.length > 0) {
                    let indexCount = productArea.length;
                    let scrapyIframLocation = appendLastIndex ? productArea[indexCount - 1] : productArea[0];
                    appendBottom ? scrapyIframLocation.appendChild(iframe) : scrapyIframLocation.prepend(iframe);
                }
            }, 2000);
        } else {
            var productArea = document.querySelectorAll(selector);
            if (productArea && productArea.length > 0) {
                let indexCount = productArea.length;
                let scrapyIframLocation = appendLastIndex ? productArea[indexCount - 1] : productArea[0];
                appendBottom ? scrapyIframLocation.appendChild(iframe) : scrapyIframLocation.prepend(iframe);
            }
        }
    }
}

function loadExtensionSettings(fetchedData) {
    let settings = fetchedData.setting;

    if (typeof settings === 'undefined') {
        settings = {
            'contribute': '',
            'removeAds': '',
            'iframeWidth': '',
            'showlistingprice': '',
            'takealotSelector': '',
            'geewizSelector': '',
            'wootwareSelector': '',
            'diyelectronicsSelector': '',
            'evetechSelector': '',
            'incredibleSelector': '',
            'hifiSelector': '',
            'miaSelector': '',
            'roboticsSelector': '',
            'yuppiechefSelector': '',
            'makroSelector': ''
        };
    }

    contribute = settings.contribute;
    removeAds = settings.removeAds;
    siteUrl = settings.iframeUrl || defaultSiteUrl;
    apiUrl = settings.apiUrl || defaultApiUrl;
    localStorage.setItem("defaultUrl", siteUrl);
    iframeWidth = settings.iframeWidth || '100%';
    showlistingprice = settings.showlistingprice || 'True';
    takealotSelector = settings.takealotSelector || '.pdp-main-panel';
    geewizSelector = settings.geewizSelector || '#main > div.product-main-container.row.bg-transparent.pl-0.pr-0 > div.block-content.mb-1.col-xl-8.col-lg-8.col-md-12.col-sm-12.col-xs-12.col-sp-12 > div.bg-white.p-1';
    wootwareSelector = settings.wootwareSelector || 'div.product-essential';
    diyelectronicsSelector = settings.diyelectronicsSelector || '#center_column > div > div.primary_block.row';
    evetechSelector = settings.evetechSelector || 'div > div.pb-3.row';
    incredibleSelector = settings.incredibleSelector || '.product-info-left-row.product-col-block';
    hifiSelector = settings.hifiSelector || '.product-info-left-row.product-col-block';
    miaSelector = settings.miaSelector || 'div.product-images-summary';
    roboticsSelector = settings.roboticsSelector || '#content > div.row > div.col-sm-8 > ul.thumbnails';
    yuppiechefSelector = settings.yuppiechefSelector || '.product-content__section';
    makroSelector = settings.makroSelector || 'div[data-testid="pdpProductDesSpecs"]';

    if (contribute === "") {
        contribute = true;
    }
    if (removeAds === "") {
        removeAds = true;
    }
}


////////////////////////
// User contribution //
//////////////////////////////////////////////////////////////////////////////////////////


// Add site specific script for contributing
function addSiteScript() {
    const domain = getDomain();
    const s = document.createElement('script');
    const isFirefox = typeof InstallTrigger !== 'undefined';
    const src = isFirefox ? browser.runtime.getURL(`/src/sites/${domain}.js`) : `chrome-extension://${chrome.runtime.id}/src/sites/${domain}.js`;
    s.src = src;
    s.onload = () => s.remove();
    (document.head || document.documentElement).appendChild(s);
}

// Add helper script
function addHelperScript() {
    var s = document.createElement('script');
    const isFirefox = typeof InstallTrigger !== 'undefined';
    const src = isFirefox ? browser.runtime.getURL('/src/sites/helper.js') : `chrome-extension://${chrome.runtime.id}/src/sites/helper.js`;
    s.src = src;
    s.onload = () => s.remove();
    (document.head || document.documentElement).appendChild(s);
}


/////////////////////
// Helper Methods //
//////////////////////////////////////////////////////////////////////////////////////////

// Get the domain name from url or current window
function getDomain(url) {
    let hostname;
    if (url == null) {
        hostname = window.location.hostname;
    }
    else {
        hostname = new URL(url).hostname;
    }
    return hostname.replace("www.", "").replace(".com", "").replace(".co.za", "").replace(".org.za", "");
}

// Get product id from current page or url
function getProductId(url) {
    let domain = getDomain();;
    let productIdResult = null;

    // If url is not passed use the current page url
    if (url == null) {
        url = (window.location != window.parent.location) ? document.referrer : document.location.href;
    }

    switch (domain) {
        case "takealot":
            let takealotPlid = url.substring(url.lastIndexOf('/') + 1);
            if (takealotPlid.match(/plid[\d\w]+/i)) {
                productIdResult = takealotPlid.match(/plid[\d\w]+/i)[0].replace('PLID', '');
            }
            break;
        case "geewiz":
            try {
                productIdResult = url.match("(\/)(?!.*\/)(.*?)\-")[2]
            } catch (error) { }
            break;
        case "wootware":
            try {
                productIdResult = document.querySelectorAll('input[type=hidden][name=product]')[0].value;
            } catch (error) { }
            break;
        case "diyelectronics":
            try {
                productIdResult = document.querySelectorAll('#product_reference > span')[0].innerText;
            } catch (error) { }
            break;
        case "evetech":
            try {
                productIdResult = url.substring(url.lastIndexOf('/') + 1).replace(".aspx", "");
            } catch (error) { }
            break;
        case "incredible":
            try {
                productIdResult = document.getElementById('videoly-product-id').innerHTML;
            } catch (error) { }
            break;
        case "hificorp":
            try {
                productIdResult = document.getElementById('videoly-product-id').innerHTML;
            } catch (error) { }
            break;
        case "mia.africa":
            try {
                productIdResult = document.getElementsByClassName('sku')[0].innerHTML;
                if (productIdResult.includes('Master')) {
                    productIdResult = productIdResult.replace('Master', '');
                }
            } catch (error) { }
            break;
        case "robotics":
            try {
                productIdResult = document.querySelector('#content > div.row > div.col-sm-4 > ul:nth-child(3) > li:nth-child(2)').innerHTML.replace('Product Code: ', '');
            } catch (error) { }
            break;
        case "yuppiechef":
            try {
                let params = (new URL(`${url}`)).searchParams;
                productIdResult = params.get("id");
            } catch (error) { }
            break;
        case "makro":
            try {
                const pattern = /\/p\/([^\/]+)$/;
                productIdResult = url.match(pattern)[1]
            } catch (error) { }
            break;
        default:
            break;
    }

    if (productIdResult == null) {
        console.log('Scrapy: No product Id found');
    }
    return productIdResult;
}

// Get scrapy version
async function getVersion() {
    if(apiUrl){
        const scrapyVersionUrl = `${apiUrl}api/settings`
        let res = await fetch(scrapyVersionUrl);
        var json = await res.json();
        apiVersionResponse = json;
    }
}

// Resize iframe to specified height
function resizeIframe(height) {
    var iframe = document.getElementById('scrapy-iframe');
    if(iframe){
        iframe.style.height = (height + 5) + "px";
    }
}

// Read specific key from local storage
const readLocalStorage = async (key) => {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get([key], function (result) {
            if (result[key] === undefined) {
                resolve(null);
            } else {
                resolve(result[key]);
            }
        });
    });
};