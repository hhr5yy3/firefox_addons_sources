let currentTabId;
let calendarTabId;
let previousTab;

// Refresh the icon every minute so when the day changes, the icon changes aswell
myInterval = setInterval(refreshIconInterval, 1000 * 60)

function queryTab() {
    return browser.tabs.query({ url: "*://calendar.google.com/*", currentWindow: true });
}

function onError(e) {
    console.log("***Error: " + e);
};

function setButtonIcon(imageURL) {
    try {
        browser.browserAction.setIcon({ path: imageURL });
    } catch (e) {
        onError(e);
    }
};

function createPinnedTab() {
    browser.tabs.create(
        {
            url: "https://calendar.google.com",
            pinned: true,
            active: true
        }
    )
};

function handleSearch(calendarTabs) {
    //console.log("currentTabId: " + currentTabId);
    if (calendarTabs.length > 0) {
        //console.log("there is a calendar tab");
        calendarTabId = calendarTabs[0].id;
        if (calendarTabId === currentTabId) {
            //console.log("I'm in the calendar tab");
            browser.tabs.update(previousTab, { active: true, });
        } else {
            //console.log("I'm NOT in the calendar tab");
            previousTab = currentTabId;
            browser.tabs.update(calendarTabId, { active: true, });
        }
        setButtonIcon(calendarTabs[0].favIconUrl);
    } else {
        //console.log("there is NO calendar tab");
        previousTab = currentTabId;
        createPinnedTab();
    }
};

function handleSetIconInterval(calendarTabs) {
    //console.log('*********handleSetIconInterval*********');
    setButtonIcon(calendarTabs[0].favIconUrl);
}

function refreshIconInterval() {
    //console.log('*********refreshIconInterval*********');
    let querying = queryTab();
    querying.then(handleSetIconInterval, onError);
};

function handleClick(tab) {
    //console.log("*********Button clicked*********");
    currentTabId = tab.id;
    let querying = queryTab();
    querying.then(handleSearch, onError);
};

function update(details) {
    if (details.reason === "install" || details.reason === "update") {
        var opening = browser.runtime.openOptionsPage();
    }
};

browser.browserAction.onClicked.addListener(handleClick);
browser.runtime.onInstalled.addListener(update);

var day = new Date().getDate();
setButtonIcon("https://calendar.google.com/googlecalendar/images/favicons_2020q4/calendar_" + day + ".ico");