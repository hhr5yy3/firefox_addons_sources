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

/* globals Readability, config */
"use strict";

{
  if (Readability.prototype._getReadTime === undefined) {
    Readability.prototype._getReadTime = function (textContent) {
      const lang = document.documentElement.lang || "en";
      const readingSpeed = this._getReadingSpeedForLanguage(lang);
      const charactersPerMinuteLow = readingSpeed.cpm - readingSpeed.variance;
      const charactersPerMinuteHigh = readingSpeed.cpm + readingSpeed.variance;
      const length = textContent.length;
      return {
        readingTimeMinsSlow: Math.ceil(length / charactersPerMinuteLow),
        readingTimeMinsFast: Math.ceil(length / charactersPerMinuteHigh),
      };
    };
    Readability.prototype._getReadingSpeedForLanguage = function (lang) {
      const readingSpeed = new Map([
        ["en", { cpm: 987, variance: 118 }],
        ["ar", { cpm: 612, variance: 88 }],
        ["de", { cpm: 920, variance: 86 }],
        ["es", { cpm: 1025, variance: 127 }],
        ["fi", { cpm: 1078, variance: 121 }],
        ["fr", { cpm: 998, variance: 126 }],
        ["he", { cpm: 833, variance: 130 }],
        ["it", { cpm: 950, variance: 140 }],
        ["jw", { cpm: 357, variance: 56 }],
        ["nl", { cpm: 978, variance: 143 }],
        ["pl", { cpm: 916, variance: 126 }],
        ["pt", { cpm: 913, variance: 145 }],
        ["ru", { cpm: 986, variance: 175 }],
        ["sk", { cpm: 885, variance: 145 }],
        ["sv", { cpm: 917, variance: 156 }],
        ["tr", { cpm: 1054, variance: 156 }],
        ["zh", { cpm: 255, variance: 29 }],
      ]);
      return readingSpeed.get(lang) || readingSpeed.get("en");
    };
    const pars = Readability.prototype.parse;
    Readability.prototype.parse = function (...args) {
      const rtn = pars.apply(this, args);
      if (rtn) {
        return Object.assign(rtn, this._getReadTime(rtn.textContent));
      } else {
        return pars(...args);
      }
    };
  }
}

// The implementation is from https://stackoverflow.com/a/5084441/260793
function getSelectionHTML() {
  const selection = window.getSelection();
  if (
    selection &&
    selection.rangeCount &&
    selection.toString().trim().length > 2
  ) {
    let range;
    if (selection.getRangeAt) {
      range = selection.getRangeAt(0);
    } else {
      range = document.createRange();
      range.setStart(selection.anchorNode, selection.anchorOffset);
      range.setEnd(selection.focusNode, selection.focusOffset);
    }
    const doc = document.implementation.createHTMLDocument(document.title);

    const article = doc.body.appendChild(doc.createElement("article"));
    let start = range.startContainer;
    if (start.nodeType === Element.TEXT_NODE) {
      start = start.parentElement;
    }
    range.setStart(start, 0);
    let end = range.endContainer;
    if (end.nodeType === Element.TEXT_NODE) {
      end = end.parentElement;
    }
    range.setEnd(end, end.childNodes.length);
    article.appendChild(range.cloneContents());

    if (article.textContent.length > 20) {
      return doc;
    }
  }
  return;
}


try {
  if (window.wrappedJSObject && window.wrappedJSObject.extensionPath) {
    var originalWindow = window.wrappedJSObject;
    window.extensionId = originalWindow.extensionId;
    window.extensionRootTabId = originalWindow.extensionRootTabId;
    window.extensionPath = originalWindow.extensionPath;
    window.pfstyle = originalWindow.pfstyle;
    window.pfOptions = originalWindow.pfOptions;
    window.pfShowHiddenContent = originalWindow.pfShowHiddenContent;
  }

  const articlePromise = true
    ? PfAlgo(document)
    : new Promise(resolve => resolve(new Readability(document.cloneNode(true)).parse()));
  articlePromise.then(article => {
    article.url = article.url || location.href;

    // detect doi
    try {
      const doi = document.querySelector('[href^="https://doi.org/"]');
      if (doi) {
        article.doi = doi.href;
      } else {
        const n = /doi:\s([^\s]{3,})/i.exec(document.body.innerText);
        if (n) {
          article.doi = "https://doi.org/" + n[1];
        } else {
          const m = /https:\/\/doi\.org\/[^\s]{4,}/.exec(document.body.innerText);
          if (m) {
            article.doi = m[0];
          }
        }
      }
    } catch (e) {
      console.warn("detect doi", e);
    }
    // detect date
    try {
      const date = document.querySelector(
        'meta[property="article:published_time"],meta[property="og:pubdate"],meta[property="og:publish_date"],meta[name="citation_online_date"],meta[name="dc.Date"]'
      );
      if (date) {
        article.published_time = new Date(date.content).toLocaleDateString();
      } else {
        const e = document.querySelector('script[type="application/ld+json"]');
        if (e) {
          const j = JSON.parse(e.textContent);
          if (j && j.datePublished) {
            article.published_time = new Date(
              j.datePublished
            ).toLocaleDateString();
          }
        }
      }
    } catch (e) {
      console.warn("detect date", e);
    }

    // https://www.w3.org/International/questions/qa-scripts.en#directions
    if (article.dir === null) {
      const lang = document.documentElement.lang;
      if (
        lang &&
        ["ar", "fa", "he", "iw", "ur", "yi", "ji"].some(
          (a) => lang.indexOf(a) !== -1
        )
      ) {
        article.dir = "rtl";
      }
    }

    // if a website has an automatic redirect use this method to wait for a new page load
    if (
      location.href.indexOf("://news.google.") !== -1 &&
      location.href.indexOf("/articles/") !== -1
    ) {
      window.addEventListener("unload", () =>
        chrome.runtime.sendMessage({
          cmd: "reader-on-reload",
        })
      );
    } else {
      const convert = () =>
        pfConfig.load(async () => {
          const prefs = pfConfig.prefs;
          if (prefs.embedded || window.embedded === true) {
            const { pathname, hostname } = new URL(article.url);
            const title = document.title;
            const getFont = (font) => {
              switch (font) {
                case "serif":
                  return 'Georgia, "Times New Roman", serif';
                case "sans-serif":
                default:
                  return "Helvetica, Arial, sans-serif";
              }
            };
            const resp = await fetch(
              chrome.runtime.getURL("/data/reader/template.html")
            );
            const html = (await resp.text())
              .replace("%dir%", article.dir ? " dir=" + article.dir : "")
              .replace("%content%", article.content)
              .replaceAll("%title%", article.title || "Unknown Title")
              .replace("%byline%", article.byline || "")
              .replace("%reading-time-fast%", article.readingTimeMinsFast)
              .replace("%reading-time-slow%", article.readingTimeMinsSlow)
              .replace("%href%", article.url)
              .replace("%hostname%", hostname)
              .replace("%pathname%", pathname)
              .replace(
                "/*user-css*/",
                `
            body {
              font-size:  ${prefs["font-size"]}px;
              font-family: ${getFont(prefs.font)} !important;
              text-align: ${prefs["text-align"]};
              width: ${prefs.width ? prefs.width + "px" : "calc(100vw - 50px)"};
            }
            @media print {
              @page {
                margin: ${prefs["print-page-margin"]["top"]}mm ${prefs["print-page-margin"]["right"]
                }mm ${prefs["print-page-margin"]["bottom"]}mm ${prefs["print-page-margin"]["left"]
                }mm;
              }
            }
          ` + prefs["user-css"]
              )
              .replace("%data-images%", prefs["show-images"])
              .replace("%data-mode%", prefs.mode)
              .replace("%data-font%", prefs.font)
              .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");

            const dom = new DOMParser().parseFromString(html, `text/html`);
            document.head.replaceWith(dom.querySelector("head"));
            document.body.replaceWith(dom.querySelector("body"));
            document.title = title;
          } else {
            chrome.runtime.sendMessage({
              cmd: "open-reader",
              article,
            });
          }
        });

      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", convert);
      } else {
        convert();
      }
    }
  })
} catch (e) {
  console.error(e);
  window.alert("Conversion Failed. Error: " + e.message);
}
