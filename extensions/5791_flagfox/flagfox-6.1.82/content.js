"use strict";  // Use ES5 strict mode for this file (within this scope)

// ATTENTION: This is a content script to be run within web pages via browser.tabs.executeScript(); see runContentScript() in main.js
// NOTE: Content scripts can't see page scripts, nor vice versa (based on the WebExtension documentation).

//BEGIN REQUEST HANDLING ******************************************************
//{{{

function receiveMessage(msg, senderInfo, sendResponse) {
    if (msg.name !== "Flagfox:contentscript")
        return;

    browser.runtime.onMessage.removeListener(receiveMessage);  // One message per content script injection

    function doWhenReady(fn, ...args) {
        const callFn = (() => fn(...args));
        if (document.readyState === "loading")  // Run at "interactive" or later
            window.addEventListener("readystatechange", callFn, {once:true,capture:true});
        else
            callFn();
    }

    const data = msg.data;
    switch (data.type) {
        case "formfield":    return doWhenReady(doFormFieldAction,     data.params);
        case "copystring":   return doWhenReady(doCopyStringAction,    data.value);
        case "javascript":   return doWhenReady(doJavaScriptAction,    data.value, data.location);
        case "getmetadata":  return doWhenReady(handleMetadataRequest, sendResponse);
    }
}

browser.runtime.onMessage.addListener(receiveMessage);

//}}}
//BEGIN CONTENT ACTION FUNCTIONS **********************************************
//{{{

function doFormFieldAction({formID, formValue, buttonID}) {
    function getElementByIdIsh(id_ish) {
        if (!id_ish)
            return null;
        id_ish = CSS.escape(id_ish);
        const not_hidden = ":not([type='hidden'])";
        const selector = "#"+id_ish+not_hidden+", [name='"+id_ish+"']"+not_hidden;  // Get shown form element by ID or name
        return document.querySelector(selector);
    }
    const field = getElementByIdIsh(formID);
    const button = getElementByIdIsh(buttonID);
    if (field) {
        field.value = formValue;
        if (button)
            setTimeout((() => button.click()), 100);  // Click the submit button, if available (after a 100ms delay)
    }
}

function doCopyStringAction(string) {
    const onCopy = (event => {
        event.clipboardData.setData("text/plain", string);
        event.preventDefault();
        event.stopImmediatePropagation();
    });
    window.addEventListener("copy", onCopy, {once:true,capture:true});
    window.focus();
    window.document.execCommand("copy", false, null);
}

// NOTE: This was previously done via Components.utils.Sandbox() (laughably, still recommended on the MDN eval() page), but in WebExtension-land the only way is plain eval()
function doJavaScriptAction(script, locationInfo) {
    // Functions defined for use in Flagfox JavaScript actions:
    const log         = console.log;
    const copystring  = doCopyStringAction;
    const openurl     = (url => window.open(url, "_new_tab_for_action"));
    const getinfo     = (dat => locationInfo[dat]);  // TODO: Change to match old JS action API or note in changelog or something
    const getmetadata = getMetadata;
    const copyString  = copystring;
    const openUrl     = openurl;
    const openURL     = openurl;
    const getInfo     = getinfo;
    eval(script);
}

function handleMetadataRequest(sendResponse) {
    const meta = getMetadata();
    const locale = document.documentElement.lang;
    sendResponse({meta,locale});
}

function getMetadata() {
    const nameAttributes = ["name","http-equiv","property"];        // Get both standard attributes and a non-standard one that is also used frequently
    const getMetaTagName = (element => element.getAttributeNames().find(n => nameAttributes.includes(n)));
    return Array.from(document.getElementsByTagName("meta"))        // Case-insensitive tag search
                .reduce(((obj,element) => {
                    let name = element.getAttribute(getMetaTagName(element));
                    if (name)
                        obj[name.toLowerCase()] = element.content;  // Drop casing for names, too (also drops duplicates, though they should be unique)
                    return obj;
                }), {});
}

//}}}
