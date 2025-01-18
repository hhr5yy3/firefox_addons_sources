"use strict";

// NOTE: This file contains generic DOM helper functions needed in multiple places that don't need to be included in util.js for background scripts / workers

//BEGIN DOM HELPERS ***********************************************************
//{{{

function getElementContainerByTagName(element, tagName) {  // CAUTION: For HTML, element.tagName is always uppercase
    do {
        if (element.tagName === tagName)  // Catches the case where the given element is the requested one
            return element;
    } while (element = element.parentElement);
    return null;
}

function getIndexOfElementInParent(element) {
    if (!element)
        return null;  // If called after getElementContainerByTagName(), make sure it found something
    let i = 0;
    while(element = element.previousElementSibling)  // Just count all previous siblings
        ++i;
    return i;
}

function scrollIntoViewIfNeeded(element, container) {
    if (element.offsetTop < container.scrollTop) {
        container.scrollTop = element.offsetTop;
    } else {
        const element_offsetBottom = element.offsetTop + element.offsetHeight;  // You'd think these properties would exist, but nope
        const container_scrollBottom = container.scrollTop + container.offsetHeight;
        if (element_offsetBottom > container_scrollBottom)
            container.scrollTop = element_offsetBottom - container.offsetHeight;
    }
}

function addElementEventListener(id, event, fn, doc=document) {
    doc.getElementById(id).addEventListener(event, fn);
}

// Disables all normal context menus inside a page to prevent issues
// NOTE: This also prevents a useless in-page Flagfox context menu inside the Flagfox options page (menu API document filters are buggy; don't work correctly for this)
function disableContextMenu(win=window) {
    win.addEventListener("contextmenu", (event => event.preventDefault()));
}

//}}}
