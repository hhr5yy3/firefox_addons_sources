"use strict";
const fontDefault = "32px arial";
const foreColor = "#fff";
const backgroundColor = "#323234";
const borderColor = "#bebebe";
const privateColor = "#8d20ae";

function updateCounter(handle, windowId) {
    // Get tabs information
    browser.tabs.query({
      windowId: windowId
    }).then((tabs) => {
        // Get number of tabs
        let tabCount = tabs.length + "";
        let tabInfo = "Open tabs: " + tabCount;
        
        browser.tabs.query({
          windowId: windowId,
          active: true
        }).then((tabs) => {
            browser.windows.getCurrent()
            .then((getInfo) => {
                let image = getImageData(tabCount, tabs[0].incognito);
                if (getInfo.id === tabs[0].windowId) {
                    // Set tooltip
                    browser.browserAction.setTitle({
                        title: tabInfo,
                        tabId: null
                    });
                    // Set default icon in global (Reduce icon flicker when selecting tab)
                    browser.browserAction.setIcon({
                        imageData: image,
                        tabId: null
                    });
                }
                // Set tooltip
                browser.browserAction.setTitle({
                    title: tabInfo,
                    tabId: tabs[0].id
                });
                // Set icon image for active tab in the other windows
                browser.browserAction.setIcon({
                    imageData: image,
                    tabId: tabs[0].id
                });
            });
        });
    });
}

function roundedRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);  // move to start
    ctx.lineTo(x + width - radius, y);  // border top
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);  // border top right radius
    ctx.lineTo(x + width, y + height - radius); // border right
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);  // border bottom right radius
    ctx.lineTo(x + radius, y + height); // border bottom
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);  // border bottom left radius
    ctx.lineTo(x, y + radius);  // border left
    ctx.quadraticCurveTo(x, y, x + radius, y);  // border top left radius
    ctx.fill();
}

function getImageData(tabCount, isPrivate) {

    let ctx = document.createElement("canvas").getContext("2d");
    
    // Draw background
    ctx.fillStyle = isPrivate ? privateColor : backgroundColor;
    roundedRect(ctx, 0, 0, 48, 38, 8);

    // Draw border bottom
    ctx.fillStyle = borderColor;
    roundedRect(ctx, 0, 43, 48, 4, 3);

    // Draw text
    ctx.fillStyle = foreColor;
    ctx.strokeStyle = foreColor;
    ctx.font = fontDefault;
    ctx.textAlign = "center";
    ctx.fillText(tabCount, 24, 31, 42);
    ctx.strokeText(tabCount, 24, 31, 42);
  
    return ctx.getImageData(0, 0, 48, 48);
}

function updateAll() {
    browser.windows.getAll({
        populate: true,
        windowTypes: ["normal"]
    }).then((windowInfoArray) => {
        for (let windowInfo of windowInfoArray) {
            updateCounter("updateAll", windowInfo.id);
        }
    });
}

function handleActivated(activeInfo) {
    updateCounter("activated", activeInfo.windowId);
}

function handleCreated(tab) {
    updateCounter("created", tab.windowId);
}

function handleRemoved(tabId, removeInfo) {
    if (!removeInfo.isWindowClosing) {
        browser.browserAction.setIcon({
            path: "icons/loading.svg"
        }).then(() => {
            setTimeout(() => {
                updateCounter("remove", removeInfo.windowId);
            }, 300);
        });
    }
}

function handleUpdated(tabId, changeInfo, tabInfo) {
    updateCounter("updated", tabInfo.windowId);
}

// Compatible check
if (browser.runtime.getBrowserInfo === undefined) {
    browser.browserAction.setTitle({
        title: "Compatible with 51+"
    });
} else {
    browser.windows.onFocusChanged.addListener(updateAll);
    browser.tabs.onActivated.addListener(handleActivated);
    browser.tabs.onCreated.addListener(handleCreated);
    browser.tabs.onRemoved.addListener(handleRemoved);
    browser.tabs.onUpdated.addListener(handleUpdated);
    updateAll();
}