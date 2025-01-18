'use strict';
var ColorfulTabsPopup = {
    init() {
        document.addEventListener("wheel", async function (event, delta) {
            if (event.deltaY) {
                document.getElementById("ct-tabs").scrollLeft += event.deltaY * 100;
                document.getElementsByTagName("body").scrollTop = 0;
                event.stopPropagation();
                event.preventDefault();
            }
        });
        document.addEventListener('contextmenu', async function (ev) {
            ev.preventDefault();
            return false;
        }, false);
        browser.runtime.onMessage.addListener(async function (message, sender) {
            if (message.tabs) { // We've received tabs
                var gettingCurrent = await browser.windows.getCurrent()
                if (gettingCurrent.id != message.winId) {
                    return;
                }
                var cttabs = document.createElement('ul');
                cttabs.id = "ct-tabs";
                document.getElementById("ct-tabs-container").innerHTML = '';
                message.tabs.forEach(async (element, index, array) => {
                    var tabClr;
                    var gradientstyle;
                    var ct_tab = document.createElement('li');
                    var ct_tab_close = document.createElement('span');
                    ct_tab_close.className = "ct-tab-close";
                    ct_tab_close.data_closetabid = element.id;
                    var ct_tab_label = document.createElement('span');
                    ct_tab_label.className = "ct-tab-label";
                    var attribs = Object.keys(element);
                    for (var i = 0; i < attribs.length; i++) {
                        if (element.hasOwnProperty(attribs[i])) {
                            ct_tab.setAttribute("data-ct-" + attribs[i], element[attribs[i]]);
                        }
                    }
                    if (element.hasOwnProperty('color')) {
                        try {
                            tabClr = JSON.parse(element.color);
                            gradientstyle = `
                        linear-gradient(
                            hsla(${tabClr.h},${tabClr.s}%,${tabClr.l}%,1),
                            hsla(0,0%,100%,.5) 15%,
                            hsla(${tabClr.h},${tabClr.s}%,${tabClr.l}%,1),
                            hsla(0,0%,0%,.1)
                        ),
                        linear-gradient(
                            hsla(${tabClr.h},${tabClr.s}%,${tabClr.l}%,1),
                            hsla(${tabClr.h},${tabClr.s}%,${tabClr.l}%,1)
                        )`;
                            ct_tab.style = "background-image:" + gradientstyle;
                            ct_tab.setAttribute("data-ct-color", `hsl(${tabClr.h},${tabClr.s}%,${tabClr.l}%);`)
                        } catch (e) {
                            console.log(e);
                        }
                    }
                    ct_tab.className = "ct-tab";
                    ct_tab.id = "ct-tab-" + element.id;
                    ct_tab.title = element.title;
                    ct_tab.data_tabid = element.id;
                    ct_tab_label.textContent = element.title;
                    ct_tab.appendChild(ct_tab_close);
                    ct_tab.appendChild(ct_tab_label);
                    try {
                        if (element.favIconUrl) {
                            ct_tab_close.style.backgroundImage = 'url(' + element.favIconUrl + ')';
                        }
                    } catch (e) {
                        console.log(e);
                    }
                    cttabs.appendChild(ct_tab);
                    if (array.length === (index + 1)) {
                        const done = await ColorfulTabsPopup.finishRender(cttabs);
                    }
                });
            }
        });
        document.addEventListener('DOMContentLoaded', async function () {
            await chrome.windows.getCurrent({
                populate: true
            }, async function (window) {
                await browser.runtime.sendMessage(browser.runtime.id, {
                    initialized: "pls send all tabs"
                }, async function (response) { });
            });

            var contribute = document.getElementById("contribute");
            contribute.addEventListener("click", async function () {
                chrome.tabs.create({
                    url: contribute.getAttribute("data-href"),
                    active: true
                });
            });
            var feedback = document.getElementById("feedback");
            feedback.addEventListener("click", async function () {
                chrome.tabs.create({
                    url: feedback.getAttribute("data-href"),
                    active: true
                });
            });
            var customize = document.getElementById("customize");
            customize.addEventListener("click", async function () {
                chrome.tabs.create({
                    url: customize.getAttribute("data-href"),
                    active: true
                });
            });
            var settings = document.getElementById("settings");
            settings.addEventListener("click", async function () {
                browser.runtime.openOptionsPage();
            });
            var sidebartoggle = document.getElementById("sidebartoggle");
            sidebartoggle.addEventListener("click", async function () {
                try {
                    browser.sidebarAction.open().then(setSB => {
                        let ctpanel = browser.runtime.getURL("/sidebar.html");
                        browser.sidebarAction.setPanel({
                            panel: ctpanel
                        });
                    });
                } catch (err) {
                    console.log(err);
                }
            });
            var newtabcreator = document.getElementById("ct-pop-new-tab");
            newtabcreator.addEventListener("click", async function () {
                try {
                    browser.runtime.sendMessage(browser.runtime.id, {
                        newtab: 'newtab'
                    });
                } catch (err) {
                    console.log(err);
                }
            });
            var closetab = document.getElementById("ct-pop-close-tab");
            closetab.addEventListener("click", async function () {
                try {
                    console.log('closing above');
                    browser.runtime.sendMessage(browser.runtime.id, {
                        close: {
                            tabId: false
                        }
                    }, function (response) {
                    });
                } catch (err) {
                    console.log(err);
                }
            });
        });
    },
    async finishRender(cttabs) {
        document.getElementById("ct-tabs-container").append(cttabs);
        var ct_tabs = [].slice.call(document.getElementsByClassName("ct-tab"));
        ct_tabs.forEach(async function (element, index) {
            element.addEventListener("click", async function (window) {
                chrome.tabs.update(element.data_tabid, {
                    active: true
                }, async function (data_tabid) { });
            });
        });
        var ct_tabs = [].slice.call(document.getElementsByClassName("ct-tab-close"));
        ct_tabs.forEach(async function (element, index) {
            element.addEventListener("click", function (e) {
                chrome.tabs.remove(element.data_closetabid);
                element.parentNode.parentNode.removeChild(element.parentNode);
                e.stopPropagation();
                e.preventDefault();
            });
        });
        var selected = document.querySelector("li.ct-tab[data-ct-active='true']");
        var selectedClr = selected.getAttribute("data-ct-color");
        var container = document.getElementById("ct-tabs");
        selectedClr = selectedClr.replace(";", "");
        container.style.transition = "border-color .2s ease";
        container.style.borderTop = "5px solid " + selectedClr;
        var ct_tabs = [].slice.call(document.getElementsByClassName("ct-tab"));
        ct_tabs.forEach(async function (element, index) {
            element.addEventListener("mouseenter", async function (win) {
                document.getElementById("ct-tabs").style.borderTopColor = element.getAttribute("data-ct-color").replace(';', '');
            });
        });
        ct_tabs.forEach(async function (element, index) {
            element.addEventListener("mouseleave", async function (win) {
                var selected = document.querySelector("li.ct-tab[data-ct-active='true']");
                var clr = selected.getAttribute("data-ct-color").replace(';', '');
                container.style.borderTopColor = clr;
            });
        });
        selected.scrollIntoView({
            behavior: "smooth",
            block: "end"
        });
    },
}
ColorfulTabsPopup.init();