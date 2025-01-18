const openInBrowser = (e) => {
    e.preventDefault();
  
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const oldUrl = params.get("page");

    const DESKTOP_APP_OPT_OUT_COOKIE = "DESKTOP_APP_OPT_OUT_COOKIE";
    //One Hour from now
    const expirationDate = (new Date().getTime() / 1000) + 3600;

    chrome.cookies.set({ 
        name: DESKTOP_APP_OPT_OUT_COOKIE,
        url: "https://app.smartsheet.com",
        expirationDate: expirationDate.valueOf(),
        value: "1"
        },
        chrome.tabs.query(
            {
                active: true,
                lastFocusedWindow: true
            },
            function (tabs) {
                const curTab = tabs[0];
                chrome.tabs.update(curTab.id, { url: oldUrl });
            }
        )
    );
    return false;
  };

const launchApp = (e) => {
    e.preventDefault();

    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const oldUrl = params.get("page");

    let splitUrl = oldUrl.split("https://");
    let targetURL = splitUrl[1];
    if (splitUrl.length > 2) {
      splitUrl.shift()
      targetURL = splitUrl.join("https://")
    }
    chrome.tabs.update({ url: `smartsheet://${targetURL}` });
}

window.onload = launchApp;

document.getElementById('openInBrowser').addEventListener("click", openInBrowser);
document.getElementById('launchApp').addEventListener("click", launchApp);
