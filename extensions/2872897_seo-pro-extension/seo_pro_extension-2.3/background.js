chrome.runtime.onInstalled.addListener((details) => {
  let url = "";
  if (details.reason) {
    if (details.reason == "install")
      url = "https://marketingsyrup.com/thanks-seo-pro-extension-installed/";
    else if (details.reason == "update")
      url = "https://marketingsyrup.com/seo-pro-extension-updated/";
  }

  if (url) {
    chrome.tabs.create(
      {
        url: url,
        active: true,
      },
      function (tab) {
        //console.log(details)
      }
    );
  }
});

chrome.runtime.setUninstallURL(
  "https://marketingsyrup.com/seo-pro-extension-uninstalled/"
);

function getWebVitals(website) {
  return new Promise((resolve, reject) => {
    var apiKey = "AIzaSyBXfsEglXEIbjmY1V_hvpuV4TzaEBOePSI";
    /**
     * @url https://developers.google.com/web/tools/chrome-user-experience-report/api/guides/getting-started
     */

    const CrUXApiUtil = {
      /**
       * Query the CrUX API for metric records
       * @param {{origin?: string, url?: string, formFactor?: string,  metrics?: Array<string>}} requestBody
       * @param {string} apiKey
       * @return {{record: {key: Object, metrics: Map<string, {histogram: Array<{ start: number, end?: number, density: number}>}>}, urlNormalizationDetails: Object}}
       */
      query: async function (requestBody, apiKey) {
        const endpointUrl =
          "https://chromeuxreport.googleapis.com/v1/records:queryRecord";
        requestBody.url = website;
        const respUrl = await fetch(`${endpointUrl}?key=${apiKey}`, {
          method: "POST",
          body: JSON.stringify(requestBody),
        });
        const jsonUrl = await respUrl.json();
        if (!respUrl.ok) {
          delete requestBody["url"];
          requestBody.origin = website;
          const respOrigin = await fetch(`${endpointUrl}?key=${apiKey}`, {
            method: "POST",
            body: JSON.stringify(requestBody),
          });
          const jsonOrigin = await respOrigin.json();
          if (!respOrigin.ok) {
            console.log("API error");
          } else return jsonOrigin;
        }
        return jsonUrl;
      },
    };

    (async function () {
      const json = await CrUXApiUtil.query({ formFactor: "phone" }, apiKey);
      console.log(json);
      if (json.record && json.record.metrics) {
        const myData = {
          LCP: (json.record.metrics.largest_contentful_paint
            ? (json.record.metrics.largest_contentful_paint.percentiles.p75 /= 1000)
            : -1
          ).toFixed(1),
          INP: json.record.metrics.interaction_to_next_paint
            ? json.record.metrics.interaction_to_next_paint.percentiles.p75
            : -1,
          CLS: json.record.metrics.cumulative_layout_shift
            ? json.record.metrics.cumulative_layout_shift.percentiles.p75
            : -1,
        };
        resolve(myData);
      }
      reject("Error");
    })();
  });
}

var statusInfo = new Map();

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "Get Web Vitals") {
    getWebVitals(request.website)
      .then(function (data) {
        console.log("webvitals", data);
        chrome.runtime.sendMessage({
          dataWebVitals: true,
          error: false,
          webVitals: data,
        });
      })
      .catch(function (error) {
        console.log(error);
        chrome.runtime.sendMessage({
          dataWebVitals: true,
          error: true,
        });
      });
  } else if (request.action === "Get Status Info") {
    sendResponse({ statusInfo: statusInfo.get(request.tabId).statusData });
  }
  return true;
});

function setIconAndBadge() {
  // Send request to inject.js to get canonical and meta_robots info to set proper icon
  let iconPath = "/images/icons/ic_seo-pro.png";
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    if (tabs && tabs.length && tabs[0].url) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { action: "Update icon", statusData: statusInfo.get(tabs[0].id) },
        function (response) {
          if (response) {
            if (
              response.showCanonicalBadge != undefined &&
              response.showMetarobotsBadge != undefined
            ) {
              if (response.showCanonicalBadge && !response.showMetarobotsBadge)
                iconPath = "/images/icons/ic_seo-pro_canonical.png";
              else if (
                !response.showCanonicalBadge &&
                response.showMetarobotsBadge
              )
                iconPath = "/images/icons/ic_seo-pro_noindex.png";
              else if (
                response.showCanonicalBadge &&
                response.showMetarobotsBadge
              )
                iconPath = "/images/icons/ic_seo-pro_canonical_noindex.png";
            }
            browser.browserAction.setIcon({ path: iconPath });

            if (
              statusInfo.get(tabs[0].id) &&
              statusInfo.get(tabs[0].id).statusData
            ) {
              let statusHeaderResponseCode = 0;
              for (let req of statusInfo.get(tabs[0].id).statusData) {
                statusHeaderResponseCode = Math.max(
                  statusHeaderResponseCode,
                  req.statusCode
                );
              }
              let color = [];
              let codeGroup = statusHeaderResponseCode.toString()[0];
              if (codeGroup == "2") color = "#24cd6f";
              else if (codeGroup == "3") color = "#fda328";
              else if (codeGroup == "4" || codeGroup == "5") color = "#fd5049";
              if (statusHeaderResponseCode != 0) {
                browser.browserAction.setBadgeBackgroundColor({
                  color: color,
                });
                browser.browserAction.setBadgeText({
                  text: statusHeaderResponseCode.toString(),
                });
              } else {
                browser.browserAction.setBadgeText({ text: "" });
              }
            } else {
              browser.browserAction.setBadgeText({ text: "" });
            }
          }
        }
      );
    } else {
      browser.browserAction.setIcon({ path: iconPath });
      browser.browserAction.setBadgeText({ text: "" });
    }
  });
}

chrome.tabs.onActivated.addListener((activeInfo) => {
  setIconAndBadge();
});

chrome.webNavigation.onErrorOccurred.addListener(function (details) {
  if (
    details.error === "net::ERR_NAME_NOT_RESOLVED" ||
    details.error === "net::ERR_INTERNET_DISCONNECTED"
  ) {
    let iconPath = "/images/icons/ic_seo-pro.png";
    browser.browserAction.setIcon({ path: iconPath });
    browser.browserAction.setBadgeText({ text: "" });
  }
});

chrome.webNavigation.onCompleted.addListener(function (details) {
  if (details.frameId !== 0) return;
  if (!details.url.match(/^http.*/)) return;
  if (details.url.match(/^https?:\/\/chrome\.google\.com\/webstore/)) return;

  const tabId = details.tabId;
  let newStatusInfo = statusInfo.get(tabId) || {
    canBeReset: false,
    statusData: [],
  };
  newStatusInfo.canBeReset = true;
  statusInfo.set(tabId, newStatusInfo);

  setIconAndBadge();
});

var searchEnginesToIgnore = [
  "www.google.com",
  "google.com",
  "www.bing.com",
  "bing.com",
  "yahoo.com",
  "search.yahoo.com",
];

chrome.webRequest.onHeadersReceived.addListener(
  function (details) {
    const statusCode = details.statusCode;
    const url = details.url;
    const redirect = false;
    const tabId = details.tabId;

    let newStatusInfo = statusInfo.get(tabId) || {
      canBeReset: false,
      statusData: [],
    };
    if (newStatusInfo.canBeReset) {
      newStatusInfo.statusData = [];
      newStatusInfo.canBeReset = false;
    }

    if (searchEnginesToIgnore.indexOf(new URL(details.url).hostname) === -1) {
      newStatusInfo.statusData.push({ statusCode, url, redirect });
    }

    statusInfo.set(tabId, newStatusInfo);
  },
  { urls: ["http://*/*", "https://*/*"], types: ["main_frame"] }
  // , ['extraHeaders']
);
