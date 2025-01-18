var BANNER_RENDERING_DELAY_REDUCER_TIMER = 100;

var BANNER_CONTAINER_ID = 'testachats-banner-container';
var BANNER_IFRAME_ID = 'testachats-banner';

var tabId;

function getPageBody() {
  return document.getElementsByTagName('body')[0];
}

function constructIframeCSPcompliant(targetUrl) {
  try {
    var bannerIframe;
    // Avoid recursive frame insertion...
    //var extensionOrigin = 'chrome-extension://' + chrome.runtime.id;
    //if (!location.ancestorOrigins.contains(extensionOrigin)) { //be careful, location.ancestorOrigins doesn't exist for firefox
    bannerIframe = document.createElement('iframe');

    var targetIframeUrl = encodeURIComponent(targetUrl);

    // Must be declared at web_accessible_resources in manifest.json
    bannerIframe.src = chrome.runtime.getURL(
      'app/iframe/frame.html?url=' + targetIframeUrl
    );

    // Some styles for a fancy sidebar
    bannerIframe.style.cssText =
      'top:0;left:0;display:block;' +
      'width:100%;height:100%;z-index:1000;border:0;';
    //}

    return bannerIframe;
  } catch (e) {
    console.error('constructIframeCSPcompliant', e);
  }
}

function overrideBodyCss(bannerHeight) {
  var body = getPageBody();
  body.style.setProperty('margin-top', bannerHeight + 'px', 'important');
}

function buildIframeUrl(trackingResult) {

  console.log('trackingResult', trackingResult);

  var url;

  function formatPrice(rawPrice) {
    return encodeURIComponent(
      rawPrice.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') +
        ' ' +
        trackingResult.site.currency
    );
  }

  function formatAvailability(availability) {
    return !!availability;
  }

  //trackingResult.product.feedUrl = ['http://www.test1.com','http://www.test2.com','http://www.test3.com'];

  var DATA_FEED_URLS_PARAMETER_NAME = 'datafeedUrls';
  var datafeedUrls = Array.isArray(trackingResult.product.feedUrl)
    ? trackingResult.product.feedUrl
    : [trackingResult.product.feedUrl];
  datafeedUrls = datafeedUrls.map(function(url) {
    return encodeURIComponent(decodeURIComponent(url));
  });

  try {
    url =
      trackingResult.bannerConfiguration.Url +
      '?availability=' +
      formatAvailability(trackingResult.product.available) +
      '&uuid=' +
      trackingResult.uuid +
      '&productId=' +
      trackingResult.product.sku +
      '&minPrice=' +
      formatPrice(trackingResult.product.price) +
      '&maxPrice=' +
      formatPrice(trackingResult.product.price) +
      '&pageUrl=' +
      encodeURIComponent(decodeURIComponent(document.location.href)) +
      '&' +
      DATA_FEED_URLS_PARAMETER_NAME +
      '=' +
      datafeedUrls.join('&' + DATA_FEED_URLS_PARAMETER_NAME + '=');
  } catch (e) {
    console.log('buildIframeUrl', e);
  }

  console.log('buildIframeUrl url', url);

  return url;
}

function injectBannerIframe(trackingResult) {
  try {
    if (trackingResult) {
      if (
        trackingResult.bannerConfiguration &&
        trackingResult.bannerConfiguration.Url
      ) {
        var bannerContainer = getBannerContainer();
        if (bannerContainer) {
          var bannerIframe = constructIframeCSPcompliant(
            buildIframeUrl(trackingResult)
          );
          if (bannerIframe) {
            bannerIframe.id = BANNER_IFRAME_ID;
            bannerContainer.appendChild(bannerIframe);
          }
        }
      } else {
        console.log(
          'injectBannerIframe - Test achats banner configuration not valid'
        );
      }
    } else {
      console.log('injectBannerIframe - trackingResult not valid');
    }
  } catch (e) {
    console.log('injectBannerIframe', e);
  }
}

function getBannerContainer() {
  return document.getElementById(BANNER_CONTAINER_ID);
}

function constructBannerContainer(bannerHeight) {
  try {
    var CUSTOM_TAG_NAME = 'test-achats-banner-container'; //to avoid curent css collision

    var bannerContainer = document.createElement(CUSTOM_TAG_NAME);
    bannerContainer.id = BANNER_CONTAINER_ID;
    bannerContainer.style.position = 'fixed';
    //bannerContainer.style.boxShadow = "0 0 10px rgba(0,0,0, 0.28)";
    bannerContainer.style.height = bannerHeight + 'px';
    bannerContainer.style.width = '100%';
    bannerContainer.style.zIndex = 2147483647;
    bannerContainer.style.top = '0px';
    bannerContainer.style.left = '0px';
    bannerContainer.style.display = 'none';
    return bannerContainer;
  } catch (e) {
    console.log('Test achats constructBannerContainer failed', e);
  }
}

function injectBanner(trackingResult) {
  if (
    trackingResult &&
    trackingResult.bannerConfiguration &&
    trackingResult.bannerConfiguration.Height
  ) {
    var bannerContainer = constructBannerContainer(
      trackingResult.bannerConfiguration.Height
    );
    if (bannerContainer) {
      var body = getPageBody();
      if (body) {
        setTimeout(function() {
          //delay to prevent "flashing effect" of the banner with iframe rendering delay
          overrideBodyCss(trackingResult.bannerConfiguration.Height);
          bannerContainer.style.display = 'inline-block';
        }, BANNER_RENDERING_DELAY_REDUCER_TIMER);

        body.insertBefore(bannerContainer, body.firstChild);

        injectBannerIframe(trackingResult);
      }
    } else {
      //console.log("injectBanner bannerContainer not constructed");
    }
  } else {
    console.log(
      'Test achats banner configuration height not valid',
      trackingResult
    );
  }
}

function checkBannerResponse(trackingResult) {
  try {
    if (trackingResult && trackingResult.bannerConfiguration) {
      var url = buildIframeUrl(trackingResult);

      var xhrObject = new XMLHttpRequest();
      xhrObject.open('GET', url, true);
      xhrObject.setRequestHeader(
        'Content-type',
        'application/x-www-form-urlencoded; charset=UTF-8'
      );
      xhrObject.onreadystatechange = function() {
        if (xhrObject.readyState == 4 && xhrObject.status == 200) {
          console.log('Test achats product found from test achats side', url);
          injectBanner(trackingResult);
        }
        if (xhrObject.readyState == 4 && xhrObject.status == 404) {
          console.log(
            'Test achats product not found from test achats side',
            url
          );
        }
      };
      xhrObject.send(null);

      console.log('Test achats tracking tested with', url);
    } else {
      console.log('Test achats bannerConfiguration not found');
      console.log(
        'Banner configuration should be retrieved from',
        trackingResult.bannerConfigurationUrl
      );
    }
  } catch (e) {
    console.log('checkBannerResponse', e);
  }
}

function removeBanner() {
  var bannerContainer = getBannerContainer();
  if (bannerContainer) {
    bannerContainer.parentNode.removeChild(bannerContainer);
  }
}

function cleanService() {
  removeBanner();
  //To Do => restore altered margin-top
  var body = getPageBody();
  body.style.setProperty('margin-top', 0 + 'px', 'important');
}

function isOneExtensionEnabledAtATime() {
  var response = true;
  try {
    var EXTENSION_TAG_ID = 'TEST-ACHATS-EXTENSION';
    if (!document.getElementById(EXTENSION_TAG_ID)) {
      var extensionTag = document.createElement('div');
      extensionTag.id = EXTENSION_TAG_ID;
      extensionTag.style.display = 'none';
      getPageBody().appendChild(extensionTag);
    } else {
      response = false;
    }
  } catch (e) {
    //alert(e);
  }

  console.log('Test achats isOneExtensionEnabledAtATime: ' + response);

  return response;
}

function onCheckAvailableWebsiteResult(oSite) {
  try {
    if (oSite) {
      if (oSite.fail) {
        console.log(
          'Test achats - WorkIT Tracking not requested: Not on an available site'
        );
      } else {
        if (oSite.tabid) {
          tabId = oSite.tabid;
        }

        console.log('current url to track', document.location.href);

        browser.runtime
          .sendMessage({ action: 'trackProductUrl', site: oSite })
          .then(onTrackingResult);
      }
    } else {
      console.log(
        'Test achats - onCheckAvailableWebsiteResult error: oSite not available'
      );
    }
  } catch (e) {}
}

function onTrackingResult(trackingResult) {
  try {
    if (!trackingResult.fail) {
      console.log('WorkIT product successfully tracked', trackingResult);
      if (trackingResult.site) {
        console.log('WorkIT site used', trackingResult.site);
      }
      checkBannerResponse(trackingResult);
    } else {
      console.log(
        'WorkIT product tracking failed for',
        trackingResult.trackingUrl
      );
      if (trackingResult.site) {
        console.log('WorkIT site used', trackingResult.site);
      }
    }
  } catch (e) {}
}

var manifestData = browser.runtime.getManifest();
if (manifestData) {
  console.log(
    'Test achats extension:',
    manifestData.name + ' v' + manifestData.version
  );
}

if (isOneExtensionEnabledAtATime()) {
  browser.runtime
    .sendMessage({ action: 'checkWebsiteUrl' })
    .then(onCheckAvailableWebsiteResult);
}

function onDataReceived(data, callback) {
  try {
    if (data.action === 'remove-banner') {
      cleanService();
    }
    callback && callback();
  } catch (e) {
    //alert("onDataReceived : "+e);
  }
}

function onRequest(request, sender, callback) {
  try {
    if (request.tabid == tabId && request.to == 'epage') {
      onDataReceived(request, callback);
    }
  } catch (e) {
    //alert("epage onRequest:"+e);
  }
}

chrome.runtime.onMessage.addListener(onRequest);
