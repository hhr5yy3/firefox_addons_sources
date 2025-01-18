"use strict";

function getBackgroundImage(element, pseudoElement) {
    let bgi = getComputedStyle(element, pseudoElement).backgroundImage;
    return "none" !== bgi ? bgi : null;
}

function getImageURL(target, deep) {
    if (null == target) return null;
    if ("IMG" === target.tagName && target.src) return `url("${target.src}")`;
    let result = getBackgroundImage(target, null) || getBackgroundImage(target, ":before");
    if (!result) if (deep--) {
        for (let node of target.children) if (result = getImageURL(node, deep)) break;
    } else result = getBackgroundImage(target, ":after");
    return result;
}

const browsi = window.browser ? browser : chrome;

document.addEventListener("mousedown", event => {
    2 === event.button && browsi.runtime.sendMessage({
        action: "updateMenu",
        url: getImageURL(event.target, 3) || getImageURL(event.target.parentElement, 3)
    });
});