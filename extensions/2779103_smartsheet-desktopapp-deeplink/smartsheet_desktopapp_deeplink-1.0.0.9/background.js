// TODO: Create Common Source for the URLS in all extensions
const APPSMARTSHEETCOM = "https://app.smartsheet.com";
const smartsheetURLS = [
  /^https:\/\/admin\.(smartsheet\.com|smartsheet\.eu|smartsheetgov\.com)(\/|$)/,
  /^https:\/\/app\.(smartsheet\.com|smartsheet\.eu|smartsheetgov\.com)(\/|$)/,
  /^https:\/\/([a-z0-9][a-z0-9-]*[a-z0-9]|[a-z0-9])\.bridge\.(smartsheet\.com|smartsheet\.eu|smartsheetgov\.com)(\/|$)/,
  /^https:\/\/calendar\.(smartsheet\.com|smartsheet\.eu|smartsheetgov\.com)(\/|$)/,
  /^https:\/\/click\.(smartsheet\.com|smartsheet\.eu|smartsheetgov\.com)(\/|$)/,
  /^https:\/\/controlcenter\.(smartsheet\.com|smartsheet\.eu|smartsheetgov\.com)(\/|$)/,
  /^https:\/\/datamesh\.(smartsheet\.com|smartsheet\.eu|smartsheetgov\.com)(\/|$)/,
  /^https:\/\/datauploader\.(smartsheet\.com|smartsheet\.eu|smartsheetgov\.com)(\/|$)/,
  /^https:\/\/documents\.(smartsheet\.com|smartsheet\.eu|smartsheetgov\.com)(\/|$)/,
  /^https:\/\/dynamicview\.(smartsheet\.com|smartsheet\.eu|smartsheetgov\.com)(\/|$)/,
  /^https:\/\/pivot\.(smartsheet\.com|smartsheet\.eu|smartsheetgov\.com)(\/|$)/,
  /^https:\/\/workapps\.(smartsheet\.com|smartsheet\.eu|smartsheetgov\.com)(\/|$)/,
  /^https:\/\/([a-z0-9][a-z0-9-]*[a-z0-9]|[a-z0-9])\.brandfolder\.com(\/|$)/,
  /^https:\/\/brandfolder\.com(\/|$)/,
];
const blockedRedirectPaths = [
  "/b/authorize",
  "/b/orgsso",
  "lrt=p",
  "/2.0/desktopapp/interstitial",
];

const setOptOutCookie = () => {
  const DESKTOP_APP_OPT_OUT_COOKIE = "DESKTOP_APP_OPT_OUT_COOKIE";
  //One Hour from now
  const expirationDate = (new Date().getTime() / 1000) + 3600;

  chrome.cookies.set({ 
      name: DESKTOP_APP_OPT_OUT_COOKIE,
      url: "https://app.smartsheet.com",
      expirationDate: expirationDate.valueOf(),
      value: "1"
      },
  );
}

function isSmartsheetUrl(url) {
  const found = smartsheetURLS.find((exp) => {
    return url.match(exp);
  });
  let validRedirect = true;
  blockedRedirectPaths.forEach(redirectPath => {
    if (url.includes(redirectPath)) {
      validRedirect = false;
    }
  });
  return !!found && validRedirect;
}

function replaceSmartsheetTab(tab, params) {
  const curURL = tab.url;
  const ignoreProtocol = params.get("ignoreProtocol");

  if (isSmartsheetUrl(curURL) && !ignoreProtocol) {
    chrome.tabs.update(tab.id, {
      url: `trail.html?page=${encodeURIComponent(curURL)}`,
    });
  }
}

chrome.tabs.onUpdated.addListener(function (tab, changeinfo) {
  if (changeinfo.status !== "complete") {
    return;
  }

  const DESKTOP_APP_OPT_OUT_COOKIE = "DESKTOP_APP_OPT_OUT_COOKIE";

  chrome.tabs.query(
    {
      active: true,
      lastFocusedWindow: true,
    },
    (tabs) => {
      const curTab = tabs[0];
      chrome.cookies.get(
        { name: DESKTOP_APP_OPT_OUT_COOKIE, url: APPSMARTSHEETCOM },
        (cookie) => {
          if (!cookie) {
            const curURL = decodeURIComponent(curTab.url);
            const queryString = curURL.substring(curURL.indexOf("?"));
            const params = new URLSearchParams(queryString);
            const deepLinkDisable = params.get("da_disableDeepLink");
            if(deepLinkDisable) {
              setOptOutCookie();
            } else {
              replaceSmartsheetTab(curTab, params);
            }
          }
        }
      );
    }
  );
});
