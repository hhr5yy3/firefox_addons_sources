'use strict';
var ColorfulTabs = {
    async init() {
        browser.runtime.onInstalled.addListener(function (details) {
            if (details.reason == "install") {
                browser.tabs.create({
                    url: "https://www.addongenie.com/fr/colorfultabs?vi=" + browser.runtime.getManifest().version,
                    active: true
                });
            }
            if (details.reason == "update") {
                browser.tabs.create({
                    url: "https://www.addongenie.com/fr/colorfultabs?vu=" + browser.runtime.getManifest().version,
                    active: true
                });
            }
            try {
                let ctpanel = browser.extension.getURL("/sidebar.html");
                browser.sidebarAction.open().then(setSB => {
                    browser.sidebarAction.setPanel({
                        panel: ctpanel
                    });
                });
            } catch (err) {
                console.log(err);
            }
        });
        browser.tabs.onActivated.addListener(async (activeInfo) => {
            await browser.tabs.get(activeInfo.tabId, async (tab) => {
                let host = new URL(tab.url);
                if (host.hostname) {
                    host = host.hostname.toString();
                } else {
                    host = host.href;
                }
                let tabClr;
                try {
                    tabClr = await CtUtils.gethsl(host, tab.id); //ColorfulTabs.genTabClr(host); // 'hsl(' + Math.abs(ColorfulTabs.clrHash(host)) % 360 + ',' + sat + '%,' + lum + '%)';
                    tabClr = 'hsl(' + tabClr.h + ',' + tabClr.s + '%,' + tabClr.l + '%)';
                } catch (e) {
                    console.log('tabClr err in bg.s' + e);
                }
                ColorfulTabs.clrtheme.colors.toolbar = tabClr;
                await ColorfulTabs.updateTheme(tab.windowId, ColorfulTabs.clrtheme);
            });
        });
        browser.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
            if (changeInfo.status != "complete") {}
            await browser.tabs.get(tabId, async (tab) => {
                let host = new URL(tab.url);
                if (host.hostname) {
                    host = host.hostname.toString();
                } else {
                    host = host.href;
                }
                let tabClr;
                try {
                    tabClr = await CtUtils.gethsl(host, tab.id); //ColorfulTabs.genTabClr(host); // 'hsl(' + Math.abs(ColorfulTabs.clrHash(host)) % 360 + ',' + sat + '%,' + lum + '%)';
                    tabClr = 'hsl(' + tabClr.h + ',' + tabClr.s + '%,' + tabClr.l + '%)';
                } catch (e) {
                    console.log('tabClr err in bg.s' + e);
                }
                ColorfulTabs.clrtheme.colors.toolbar = tabClr;
                await ColorfulTabs.updateTheme(tab.windowId, ColorfulTabs.clrtheme);
            });
        });
        browser.runtime.onMessage.addListener(
            async (request, sender, sendResponse) => {
                if (request.initialized) {
                    ColorfulTabs.sendTabs(request, sender, sendResponse);
                }
                if (request.select) {
                    ColorfulTabs.onUpdated(request.select);
                }
                if (request.close) {
                    if (request.close.tabId) {
                        ColorfulTabs.onRemoved(request.close.tabId, request.close);
                    } else {
                        browser.tabs.query({
                            currentWindow: true,
                            active: true
                        }).then((tabs) => {
                            ColorfulTabs.onRemoved(tabs[0].id, false);
                        });
                    }
                }
                if (request.newtab) {
                    browser.tabs.create({
                        active: true
                    });
                }
            }
        );
        browser.tabs.onCreated.addListener(ColorfulTabs.setBadge);
        browser.tabs.onAttached.addListener(ColorfulTabs.setBadge);
        browser.tabs.onDetached.addListener(ColorfulTabs.setBadge);
        browser.tabs.onRemoved.addListener(ColorfulTabs.setBadge);
        browser.tabs.onUpdated.addListener(ColorfulTabs.onUpdated);
    },
    async sendTabs(info) {
        try {
            browser.tabs.query({
                currentWindow: true
            }, async function (tabs) {
                await ColorfulTabs.sendTabsJson(tabs);
            });
        } catch (e) {
            console.log('sendTabs: ' + e);
        }
    },
    async onUpdated(tabId, changeInfo, tabInfo) {
        try {
            browser.tabs.query({
                currentWindow: true
            }, async function (tabs) {
                await ColorfulTabs.sendTabsJson(tabs);
            });
        } catch (e) {
            console.log('CT: ' + e);
        }
    },
    async onRemoved(tabId, removeInfo) {
        try {
            browser.tabs.remove(tabId, async function () {
                browser.tabs.query({
                    currentWindow: true
                }, async function (tabs) {
                    tabs = tabs.filter(tab => tab.id != tabId);
                    await ColorfulTabs.sendTabsJson(tabs);
                })
            });
        } catch (e) {
            console.log('CT: ' + e);
        }
    },
    async sendFilteredTabs(j) {
        var gettingCurrent = await browser.windows.getCurrent().then( async (win) => {
            await browser.runtime.sendMessage(
                browser.runtime.id, {
                    tabs: j,
                    winId: win.id
                });
        });

    },
    async sendTabsJson(tabs) {
        var j = JSON.parse(JSON.stringify(tabs));
        j.forEach(async (el, index, array) => {
            try {
                let host = new URL(el.url);
                if (host.hostname) {
                    host = host.hostname.toString();
                } else {
                    host = host.href;
                }
                var tabClr = await CtUtils.gethsl(host, el.id);
                el.color = JSON.stringify(tabClr);
            } catch (e) {
                console.dir(e);
            }
            if (array.length === (index + 1)) {
                var done = await ColorfulTabs.sendFilteredTabs(j);
            }
        });
    },
    async setBadge() {
        browser.windows.getCurrent({
            populate: true
        }, async function (window) {
            browser.browserAction.setBadgeText({
                text: window.tabs.length.toString()
            });
        });
    },
    async initTheme() {
        var overridetheme = await getOption("overridetheme");
        console.log(overridetheme);
        if (overridetheme == 'yes') {} else {
            return;
        }
        let headerColor = await getOption("accentcolor");
        headerColor = await CtUtils.anytorgb(headerColor);
        let headerImage = await CtUtils.generateImage(headerColor);
        ColorfulTabs.clrtheme.images.theme_frame = headerImage;
        let accentcolor = await CtUtils.anytorgb(await getOption("accentcolor"));
        accentcolor = await CtUtils.rgbtohsl(accentcolor.r, accentcolor.g, accentcolor.b);
        ColorfulTabs.clrtheme.colors.frame = "rgb(" + accentcolor + ")";
        let textcolor = await CtUtils.anytorgb(await getOption("textcolor"));
        textcolor = await CtUtils.rgbtohsl(textcolor.r, textcolor.g, textcolor.b);
        ColorfulTabs.clrtheme.colors.tab_background_text = "rgb(" + textcolor + ")";
        let toolbar_text = await CtUtils.anytorgb(await getOption("toolbar_text"));
        toolbar_text = await CtUtils.rgbtohsl(toolbar_text.r, toolbar_text.g, toolbar_text.b);
        ColorfulTabs.clrtheme.colors.bookmark_text = "rgb(" + toolbar_text + ")";
        let toolbar_field = await CtUtils.anytorgb(await getOption("toolbar_field"));
        toolbar_field = await CtUtils.rgbtohsl(toolbar_field.r, toolbar_field.g, toolbar_field.b);
        ColorfulTabs.clrtheme.colors.toolbar_field = "rgb(" + toolbar_field + ")";
        let toolbar_field_text = await CtUtils.anytorgb(await getOption("toolbar_field_text"));
        toolbar_field_text = await CtUtils.rgbtohsl(toolbar_field_text.r, toolbar_field_text.g, toolbar_field_text.b);
        ColorfulTabs.clrtheme.colors.toolbar_field_text = "rgb(" + toolbar_field_text + ")";
    },
    async updateTheme(windowId, updatedTheme) {
        var overridetheme = await getOption("overridetheme");
        if (overridetheme == 'yes') {
            await browser.theme.update(windowId, updatedTheme);
        } else {}
    },
    clrtheme: {
        "images": {
            "theme_frame": ""
        },
        "colors": {
            "toolbar": "",
        }
    },
    clrthemeNew: {
        "images": {
            "theme_frame": ""
        },
        "colors": {
            "frame": "#fff",
            "tab_background_text": "#000",
            "toolbar": "rgba(255,0,0, 1)",
            "bookmark_text": "#000",
            "toolbar_field": "#fff",
            "toolbar_field_text": "#000",
        }
    },
}
ColorfulTabs.init();