/**
    Reader View - Strips away clutter

    Copyright (C) 2014-2021 [@rNeomy](https://add0n.com/chrome-reader-view.html)

    This program is free software: you can redistribute it and/or modify
    it under the terms of the Mozilla Public License as published by
    the Mozilla Foundation, either version 2 of the License, or
    (at your option) any later version.
    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    Mozilla Public License for more details.
    You should have received a copy of the Mozilla Public License
    along with this program.  If not, see {https://www.mozilla.org/en-US/MPL/}.

    GitHub: https://github.com/rNeomy/reader-view/
    Homepage: https://add0n.com/chrome-reader-view.html
*/

/* global config */
"use strict";

const args = new URLSearchParams(top.location.search);
var deletedNodes = [];
var deletedNodesCss = [];
var clickToDeleteEnabled = false;

if (window.top !== window) {
  chrome = top.chrome;
  window.pfConfig = top.pfConfig;
}

// back
// document.getElementById('reader-domain').addEventListener('click', e => {
//   e.preventDefault();
//   e.stopPropagation();
//   top.nav.back();
// });

function getTopWrapper(node) {
  var parent = node.parentNode;
  if (parent.childNodes.length > 1) {
    return node;
  }
  return getTopWrapper(parent);
}

function isDeletableElement(node) {
  var CLICK_TO_DEL_ELEMENTS =
    "small, footer, header, aside, details, dialog, figure, nav, summary, twitter-widget, p, img, blockquote, h1, h2, h3, h4, h5, h6, ol, ul, li, a, table, td, pre, span, code, dl, dt, dd, hr, div.pf-caption, video, figcaption, data";
  var MANY_ELEMENTS_THRESHOLD = 15;

  return (
    node.matches(CLICK_TO_DEL_ELEMENTS) ||
    $(node).find("*:visible").length <= MANY_ELEMENTS_THRESHOLD
  );
}

function undo() {
  if (deletedNodes.length > 0) {
    var nodeToRestore = deletedNodes.pop();
    nodeToRestore.classList.remove("pf-hidden");
    var displayValueToRestore = deletedNodesCss.pop();
    if (nodeToRestore.style.setProperty) {
      nodeToRestore.style.setProperty("display", displayValueToRestore);
    } else {
      $(nodeToRestore).css("display", displayValueToRestore);
    }
  }
}

$("#content-wrapper").on("mouseover mouseout", "*", function (e) {
  var nodeToDelete = getTopWrapper(e.target);
  if (!clickToDeleteEnabled || !isDeletableElement(nodeToDelete)) {
    return;
  }

  e.stopPropagation();
  if (e.type == "mouseover") {
    nodeToDelete.classList.add("pf-delete");
  } else {
    nodeToDelete.classList.remove("pf-delete");
  }
});

$("#content-wrapper").on("click", "*", function (e) {
  e.preventDefault();
  var nodeToDelete = getTopWrapper(e.target);

  if (!clickToDeleteEnabled || !isDeletableElement(nodeToDelete)) {
    return;
  }

  e.stopPropagation();
  if (!nodeToDelete.classList.contains("non-delete")) {
    deletedNodes.push(nodeToDelete);
    deletedNodesCss.push(getComputedStyle(nodeToDelete, "display").content);

    nodeToDelete.classList.add("pf-hidden");
  }
});

$("body").on("click", function (e) {
  e.preventDefault();
});

// link handling
document.addEventListener("click", (e) => {
  const a = e.target.closest("a");
  if (a && a.href) {
    // external links
    if (a.href.startsWith("http") && e.button === 0) {
      e.preventDefault();
      e.stopPropagation();
      // return chrome.runtime.sendMessage({
      //   cmd: 'open',
      //   url: a.href,
      //   reader: pfConfig.prefs['reader-mode'],
      //   current: e.ctrlKey === false && e.metaKey === false
      // });
    }
    // internal links
    // https://github.com/rNeomy/reader-view/issues/52
    try {
      const link = new URL(a.href);
      if (
        link.pathname === location.pathname &&
        link.origin === location.origin
      ) {
        e.preventDefault();
        e.stopPropagation();
        // if (link.hash) {
        //   if (e.button === 0 && e.metaKey === false) {
        //     top.hash(link);
        //   }
        //   else {
        //     chrome.runtime.sendMessage({
        //       cmd: 'open',
        //       url: args.get('url').split('#')[0] + link.hash,
        //       reader: pfConfig.prefs['reader-mode'],
        //       current: e.ctrlKey === false && e.metaKey === false
        //     });
        //   }
        // }
      }
    } catch (e) {
      console.warn(e);
    }
  }
});
// prefs
pfConfig.onChanged.push((ps) => {
  if (ps["user-css"]) {
    document.getElementById("user-css").textContent =
      pfConfig.prefs["user-css"];
  }
  if (ps["show-images"]) {
    document.querySelector("#content-wrapper").dataset.images =
      pfConfig.prefs["show-images"];
  }
  if (ps["mode"]) {
    document.body.dataset.mode = pfConfig.prefs.mode;
  }
  if (ps["font"]) {
    document.body.dataset.font = pfConfig.prefs.font;
  }
});
