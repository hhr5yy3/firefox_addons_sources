// on install/update
chrome.runtime.onInstalled.addListener(async function (details)
{
    switch (details.reason)
    {
        case "install":
            // open new tab with info
            newTab(`${mainSite}/extension/?installed=${getVersion()}`);

            // announce
            API("extensionInstalled");

            // generate unique identifier
            initializeUniqueIdentifierIfNeeded();

            break;
        case "update":
            let currentVersion = details.previousVersion;

            // no actual update
            if (getVersion() == currentVersion)
                break;

            API("extensionUpdated", { oldVersion: currentVersion });

            // major version change
            if (getVersion().split(".")[0] != currentVersion.split(".")[0])
                newTab(`${mainSite}/extension/?updated=${getVersion()}`);

            break;
    }

    localStorage.version = getVersion();
});

// on uninstall
let linkOnUninstall = `${mainSite}/extension/?uninstalled=${getVersion()}`;
if (chrome.runtime.setUninstallURL)
    chrome.runtime.setUninstallURL(linkOnUninstall);
else
    if (chrome.runtime.onUninstalled && chrome.runtime.onUninstalled.addListener)
        chrome.runtime.onUninstalled.addListener(function() { chrome.tabs.create({ url: linkOnUninstall }); });
