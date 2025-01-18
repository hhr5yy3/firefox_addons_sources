"use strict";

chrome.tabs.executeScript({
  file: "inject.js",
  allFrames: true,
  runAt: "document_end"
});

chrome.tabs.insertCSS({
  file: "inject.css",
  allFrames: true,
  runAt: "document_end"
});

function $(id) {
  return document.getElementById(id);
}

let tabId;
let tabFrameId;

let selectId;
let selectOptions;
let selectFilter = [];

chrome.runtime.onMessage.addListener((msg, sender) => {
  if(msg.select) {
    tabId = sender.tab.id;
    tabFrameId = sender.frameId;

    selectId = msg.select.id;
    selectOptions = msg.select.options;
    selectFilter = strToFilter(msg.select.filter);

    $("search").style.display = "block";
    refresh();
  }
});

function strToFilter(str) {
  if(str === "") return [];

  //replace double bars with single bars
  str = str.replace(/\n/g, "").replace(/\|\|/g, "\n").split("|").map(s => s.replace(/\n/g, "|"));
  
  //break into triplets
  str = str.map(s => [s.substr(0, 2), s.substr(2), s]);

  return str;
}

function filterToStr(list) {
  return list.map(triplet => triplet[2].replace(/\|/g, "||")).join("|");
}

function refresh() {
  let frag = document.createDocumentFragment();

  let filterLen = selectFilter.length;
  
  for(let i = 0; i < filterLen; i++) {
    let f = selectFilter[i];

    let n = document.createElement("li");
    n.setAttribute("data-index", i);
    n.textContent = f[1];
    n.className = "filter-" + f[0];
    n.onclick = onFilterClick;

    frag.appendChild(n);
  }

  let ctnr = $("filters");
  ctnr.textContent = "";
  ctnr.appendChild(frag);

  let count = 0;
  for(let i = selectOptions.length - 1; i >= 0; i--) {
    let str = selectOptions[i];

    let pass = true;

    for(let j = 0; j < filterLen; j++) {
      if(!pass) break;
      switch(selectFilter[j][0]) {
        case "cn": if(str.indexOf(selectFilter[j][1]) < 0) pass = false; break;
        case "nc": if(str.indexOf(selectFilter[j][1]) >= 0) pass = false; break;

        case "bw": if(str.indexOf(selectFilter[j][1]) !== 0) pass = false; break;
        case "nb": if(str.indexOf(selectFilter[j][1]) === 0) pass = false; break;

        case "ew": if(str.substr(-selectFilter[j][1].length) !== selectFilter[j][1]) pass = false; break;
        case "ne": if(str.substr(-selectFilter[j][1].length) === selectFilter[j][1]) pass = false; break;
      }
    }

    if(pass) count++;

    $("summary").textContent = filterLen > 0 ? chrome.i18n.getMessage("popupResults", [count]) : "";
  }
}

$("search").onsubmit = () => {
  let s = [$("opt").value, $("q").value.toLowerCase()];
  if(s[1]) {
    s.push(s[0] + s[1]);
    selectFilter.push(s);
    refresh();
    pushChanges();
    $("q").value = "";
  }
  return false;
};

$("filters").textContent = "";  //clear debug text
$("summary").textContent = chrome.i18n.getMessage("popupIntro");

document.querySelectorAll("*[data-i18n]").forEach(n => {
  let prop = n.getAttribute("data-i18n");
  n[prop] = chrome.i18n.getMessage(n[prop]);
});

function onFilterClick() {
  let i = this.getAttribute("data-index")*1;
  selectFilter.splice(i, 1);
  refresh();
  pushChanges();
}

function pushChanges() {
  chrome.tabs.executeScript(tabId, {
    frameId: tabFrameId,
    code: `handleFilter(${selectId},"${encodeURIComponent(filterToStr(selectFilter))}")`,
    runAt: "document_end"
  });
}