const serverUrl = "https://scrapy.co.za/";

document.addEventListener('DOMContentLoaded', function () {
  appendIframe();
});

// Show product history iframe
async function appendIframe() {
  const url = await getCurrentUrl();
  let domain = getDomain(url);
  let productId = await getProductId(url);

  if (productId != null) {
    let src = `${serverUrl}iframe?productId=${productId}&store=${domain}`;
    const iframe = document.createElement('iframe');
    iframe.src = src;
    iframe.style.width = '100%';
    iframe.style.height = '100%';

    // Append the iframe to the iframe container
    const iframeContainer = document.getElementById('iframe-container');
    iframeContainer.appendChild(iframe);
  }
}

// Get url of current tab
async function getCurrentUrl() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return tab.url;
}

// Get the domain name from url or current window
function getDomain(url) {
  let hostname = new URL(url).hostname;
  return hostname.replace("www.", "").replace(".com", "").replace(".co.za", "").replace(".org.za", "");
}

// Get product id from current page or url
async function getProductId(url) {
  let domain = getDomain(url);
  let productIdResult = null;
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
        const func = () => document.querySelectorAll('input[type=hidden][name=product]')[0].value;
        productIdResult = await executeScript(func);
      } catch (error) { }
      break;
    case "diyelectronics":
      try {
        const func = () => document.querySelectorAll('#product_reference > span')[0].innerText;
        productIdResult = await executeScript(func);
      } catch (error) { }
      break;
    case "evetech":
      try {
        productIdResult = url.substring(url.lastIndexOf('/') + 1).replace(".aspx", "");
      } catch (error) { }
      break;
    case "incredible":
      try {
        const func = () => document.getElementById('videoly-product-id').innerHTML;
        productIdResult = await executeScript(func);
      } catch (error) { }
      break;
    case "hificorp":
      try {
        const func = () => document.getElementById('videoly-product-id').innerHTML;
        productIdResult = await executeScript(func);
      } catch (error) { }
      break;
    case "mia.africa":
      try {
        const func = () => document.getElementsByClassName('sku')[0].innerHTML;
        productIdResult = await executeScript(func);
        if (productIdResult.includes('Master')) {
          productIdResult = productIdResult.replace('Master', '');
        }
      } catch (error) { }
      break;
    case "robotics":
      try {
        const func = () => document.querySelector('#content > div.row > div.col-sm-4 > ul:nth-child(3) > li:nth-child(2)').innerHTML.replace('Product Code: ', '');
        productIdResult = await executeScript(func);
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
    case "greatyellowbrick":
      try {
        const func = () => document.querySelector('.jdgm-preview-badge--with-link').getAttribute('data-id');
        productIdResult = await executeScript(func);
      } catch (error) { }
      break;
    case "woolworths":
      try {
        productIdResult = url.match(/A-(\d+)/gm)[0].replace('A-', '');
      } catch (error) { }
      break;
    default:
      break;
  }

  if (productIdResult == null) {
    document.getElementById('info').innerHTML = 'Scrapy: No product found';
  }
  return productIdResult;
}

// Execute a script on the current tab
async function executeScript(func) {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const result = await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: func,
  });
  return result[0].result;
} 