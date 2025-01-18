function onInstallHandler() {
    handleInstall();
}

chrome.runtime.onInstalled.addListener(function (details) {
    if (details.reason === "install") {
        onInstallHandler();
    } else if (details.reason === "update") {
        setUninstallUrl();
    }
});


function handleInstall() {
    fireInstalledSuccessfully();
    setUninstallUrl();
}

function fireInstalledSuccessfully() {
    try {
        chrome.tabs.query({url: "*://" + DOMAIN + "*"}, function (tabs) {
            for (var i = 0; i < tabs.length; i++) {
                try {
                    chrome.tabs.sendMessage(tabs[i].id, {method: "Installed"}, function (response) {
                    });
                } catch (e) {
                    console.log("error", e);
                }
            }
        });
    } catch (err) {
        console.log(err);
    }
}

