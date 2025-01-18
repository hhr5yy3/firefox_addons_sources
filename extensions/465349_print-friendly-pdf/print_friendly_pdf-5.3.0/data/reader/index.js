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

/* global config, TTS, tips */
"use strict";

let article;

let tts;
let highlight;

const args = new URLSearchParams(location.search);

// hash
const hash = (link) => {
  const hash = link.hash.substr(1);
  const a = iframe.contentDocument.querySelector(`[name="${hash}"],#${hash}`);
  if (a) {
    a.scrollIntoView({
      block: "start",
      inline: "nearest",
    });
    a.focus();
  } else {
    console.warn("hash", link.hash, "is unreachable");
  }
};
window.hash = hash;

const nav = {
  back(forced = false) {
    const now = Date.now();
    if (forced === false && (!nav.timeout || now - nav.timeout > 2000)) {
      nav.timeout = now;
      return window.notify("Press ESC again to exit", undefined, 2000);
    }

    chrome.runtime.sendMessage({
      cmd: "go-back",
    });
  },
};
window.nav = nav;

const template = async () => {
  const r = await fetch("template.html");
  return await r.text();
};

const update = {
  async: () => {
    const prefs = pfConfig.prefs;
    let lh = "unset";
    if (prefs["line-height"]) {
      lh =
        (
          prefs["font-size"] * (prefs["line-height"] === 32 ? 1.5 : 1.2)
        ).toFixed(1) + "px";
    }
    styles.internals.textContent = `body {
      font-size:  ${prefs["font-size"]}px;
      font-family: ${getFont(prefs.font)};
      text-align: ${prefs["text-align"]};
      width: ${prefs.width ? prefs.width + "px" : "calc(100vw - 50px)"};
    }
    .page {
      line-height: ${lh};
    }
    h1, h2, h3 {
      line-height: initial;
    }
    @media print {
      @page {
        margin: ${prefs["print-page-margin"]["top"]}mm ${prefs["print-page-margin"]["right"]}mm ${prefs["print-page-margin"]["bottom"]}mm ${prefs["print-page-margin"]["left"]}mm;
      }
    }`;
    // document.querySelector('[data-id=no-height] input').checked = Boolean(prefs['line-height']) === false;
    // document.querySelector('[data-id=full-width] input').checked = Boolean(prefs.width) === false;
    // as a CSS selector
    document.body.dataset.font = prefs.font;
    //
    document.querySelector('#font-details [data-id="font-size"]').textContent =
      prefs["font-size"] + "px";
    document.querySelector(
      '#font-details [data-id="screen-width"]'
    ).textContent = prefs["width"] || "unset";
    document.querySelector(
      '#font-details [data-id="line-height"]'
    ).textContent = lh;
  },
  images: () => {
    setToggleImagesButtonClasses(pfConfig.prefs["show-images"]);
  },
};

const iframe = document.querySelector("iframe");

const fontUtils = document.querySelector("#font-utils");
fontUtils.addEventListener("blur", () => {
  setTimeout(() => {
    fontUtils.classList.add("hidden");
    iframe.contentWindow.focus();
  }, 100);
});
const imageUtils = document.querySelector("#image-utils");
imageUtils.addEventListener("blur", () => {
  imageUtils.classList.add("hidden");
  iframe.contentWindow.focus();
});

const shortcuts = [];
shortcuts.render = () => {
  for (const { span, id } of shortcuts) {
    if (span && pfConfig.prefs.shortcuts[id]) {
      span.title = span.title.replace(
        "(command)",
        "(" +
        pfConfig.prefs.shortcuts[id]
          .map((s) => s.replace("Key", ""))
          .join(" + ") +
        ")"
      );
    }
  }
};

/* Toolbar Visibility*/
{
  shortcuts.push({
    id: "toggle-toolbar",
    span: document.getElementById("toolbar"),
    action: () =>
      chrome.storage.local.set({
        "toggle-toolbar": pfConfig.prefs["toggle-toolbar"] === false,
      }),
  });
}

/* printing */
{
  const span = document.getElementById("printing-button");
  span.onclick = () => iframe.contentWindow.print();

  shortcuts.push({
    id: "print",
    action: span.onclick,
    span,
  });
}

/* PDF */
{
  const span = document.getElementById("pdf-button");
  span.onclick = () => makePDF();
}

/* design mode */
{
  const span = document.getElementById("design-mode-button");
  shortcuts.push({
    id: "design-mode",
    span,
    action() {
      span.click();
    },
  });
}

/* images */
{
  const span = document.getElementById("images-button");
  shortcuts.push({
    id: "images",
    span,
    action() {
      chrome.storage.local.set({
        "show-images": pfConfig.prefs["show-images"] === false,
      });
    },
  });
}

/* highlight */
{
  const button = document.getElementById("highlight-button");
  shortcuts.push({
    id: "highlight",
    button,
    action() {
      button.click();
    },
  });
}

/* PDF */
{
  const span = document.getElementById("settings-button");
  span.onclick = () => chrome.runtime.openOptionsPage();
}

/* user actions */
{
  pfConfig.load(() => {
    try {
      pfConfig.prefs["user-action"].forEach((action, index) => {
        const span = document.createElement("span");
        span.classList.add("custom");
        span.title = action.title || "User Action";
        const img = document.createElement("img");
        img.src = action.icon || "command.svg";
        span.appendChild(img);
        document.getElementById("toolbar").appendChild(span);
        span.onclick = () => {
          const s = document.createElement("script");
          const b = new Blob([action.code]);
          s.src = URL.createObjectURL(b);
          iframe.contentDocument.body.appendChild(s);
          URL.revokeObjectURL(s.src);
          s.remove();
        };
        if (action.shortcut) {
          const id = "ua-" + index;
          shortcuts.push({
            id,
            span,
            action: span.onclick,
          });
          pfConfig.prefs.shortcuts[id] = action.shortcut.split(/\s+\+\s+/);
        }
      });
    } catch (e) {
      console.warn("User Action Installation Failed", e);
    }
  });
}

const styles = {
  top: document.createElement("style"),
  internals: document.createElement("style"),
};

function getFont(font) {
  switch (font) {
    case "serif":
      return 'Georgia, "Times New Roman", serif';
    case "sans-serif":
    default:
      return "Helvetica, Arial, sans-serif";
  }
}

function setToggleImagesButtonClasses(showImages) {
  const button = document.getElementById("toggle-images-button");
  const span = button.getElementsByTagName("span")[0];
  const bgClass = showImages ? "bg-emerald-600" : "bg-gray-400";
  const xclass = showImages ? "translate-x-5" : "translate-x-0";

  button.dataset.active = showImages ? "true" : "false";
  button.classList.remove("bg-emerald-600", "bg-gray-400");
  button.classList.add(bgClass);
  span.classList.remove("translate-x-5", "translate-x-0");
  span.classList.add(xclass);
}

function makePDF() {
  const url = new URL(article.url);
  const dialog = document.querySelector("#pdf-dialog");
  const form = document.querySelector("#pdf-form");
  const container = document.querySelector("#pdf-iframe-container");
  const pdfIframe = document.createElement("iframe");
  const contentNodes = Array.from(iframe.contentDocument.body.children);
  var content = "";

  contentNodes.forEach((el) => {
    if (el.nodeName != "SCRIPT") {
      // console.log(el.nodeName);
      content += el.outerHTML;
    }
  });

  pdfIframe.name = "pdf-iframe";
  pdfIframe.classList.add("outline-none", "focus:outline-none");
  container.innerHTML = "";
  container.appendChild(pdfIframe);

  form.querySelector("input[name=hostname]").value = url.hostname;
  form.querySelector("input[name=url]").value = url.toString();
  form.querySelector("input[name=code]").value = content;
  form.querySelector("input[name=title]").value = article.title;
  form.querySelector("input[name=dir]").value = article.dir;
  dialog.classList.remove("hidden");
  form.submit();
}

function closePDFDialog() {
  document.querySelector("#pdf-dialog").classList.add("hidden");
  document.querySelector('iframe[name="pdf-iframe"]').remove();
}

document.addEventListener("click", (e) => {
  const target = e.target.closest("[data-cmd]");
  if (!target) {
    return;
  }
  const cmd = target.dataset.cmd;
  if (cmd) {
    e.target.classList.add("active");
  }

  if (cmd.startsWith("font-type-")) {
    chrome.storage.local.set({
      font: cmd.replace("font-type-", ""),
    });
  } else if (cmd === "font-decrease" || cmd === "font-increase") {
    const size = pfConfig.prefs["font-size"];
    chrome.storage.local.set({
      "font-size":
        cmd === "font-decrease"
          ? Math.max(9, size - 1)
          : Math.min(33, size + 1),
    });
  } else if (cmd === "width-decrease" || cmd === "width-increase") {
    const width = pfConfig.prefs.width;
    if (width) {
      chrome.storage.local.set({
        width:
          cmd === "width-decrease"
            ? Math.max(300, width - 50)
            : Math.min(1000, width + 50),
      });
    } else {
      chrome.storage.local.set({
        width: 600,
      });
    }
  } else if (cmd === "full-width") {
    chrome.storage.local.set({
      width: e.target.parentElement.querySelector("input").checked ? 600 : 0,
    });
  } else if (cmd === "line-height-type-1" || cmd === "line-height-type-2") {
    chrome.storage.local.set({
      "line-height": cmd === "line-height-type-1" ? 28.8 : 32,
    });
  } else if (cmd === "no-height") {
    chrome.storage.local.set({
      "line-height": e.target.parentElement.querySelector("input").checked
        ? 28.8
        : 0,
    });
  } else if (cmd === "text-align-start" || cmd === "text-align-justify") {
    chrome.storage.local.set({
      "text-align": cmd === "text-align-start" ? "start" : "justify",
    });
  } else if (cmd.startsWith("color-mode-")) {
    chrome.storage.local.set({
      mode: cmd.replace("color-mode-", ""),
    });
  } else if (cmd === "close") {
    nav.back(true);
  } else if (cmd === "pdf-dialog-close") {
    closePDFDialog();
  } else if (cmd === "close-speech") {
    document.body.dataset.speech = false;
    iframe.contentDocument.body.dataset.speech = false;
    tts.buttons.stop.click();
  } else if (cmd === "minimize-speech") {
    const e = document.getElementById("speech");
    const mode = e.dataset.mode;
    if (mode === "collapsed") {
      e.dataset.mode = "";
      target.textContent = "-";
    } else {
      e.dataset.mode = "collapsed";
      target.textContent = "□";
    }
    chrome.storage.local.set({
      "speech-mode": e.dataset.mode,
    });
  } else if (cmd === "open-font-utils") {
    fontUtils.classList.remove("hidden");
    fontUtils.focus();
  } else if (cmd === "open-image-utils") {
    imageUtils.classList.remove("hidden");
    imageUtils.focus();
  } else if (cmd === "image-increase" || cmd === "image-decrease") {
    [...iframe.contentDocument.images].forEach((img) => {
      if (img.style.width.match(/\d/)) {
        const width = parseInt(img.style.width);
        if (width >= 32) {
          const scale = cmd === "image-increase" ? 1.1 : 0.9;
          img.style.width = `${Math.max(width * scale, 32)}px`;
        }
      }
    });
    // } else if (cmd === "image-show" || cmd === "image-hide") {
    //   chrome.storage.local.set({
    //     "show-images": cmd === "image-show",
    //   });
  } else if (cmd === "toggle-images") {
    const wasActive = target.dataset.active === "true";
    const showImages = !wasActive;
    setToggleImagesButtonClasses(showImages);

    chrome.storage.local.set({
      "show-images": showImages,
    });
  } else if (cmd === "toggle-highlight") {
    highlight.toggle();
    highlight.used = true;
  } else if (cmd === "toggle-click-to-delete") {
    const active = e.target.dataset.active === "true";
    e.target.dataset.active = active ? "false" : "true";
    document.getElementById("undo-delete").dataset.disabled = active;
    document.getElementById("design-mode-button").dataset.disabled = !active;
    iframe.contentWindow.clickToDeleteEnabled = !active;
  } else if (cmd === "undo-delete") {
    iframe.contentWindow.undo();
  } else if (cmd === "toggle-design-mode") {
    const active = iframe.contentDocument.designMode === "on";
    e.target.dataset.active = active === false;
    iframe.contentDocument.designMode = active ? "off" : "on";
    // iframe.contentDocument.spellcheck = active ? 'false' : 'true';
    document.getElementById("click-to-delete").dataset.disabled = !active;

    if (active === false) {
      document.title = "[Design Mode]";
      const s = document.createElement("script");
      s.src = "libs/design-mode/inject.js";
      document.body.appendChild(s);
    } else {
      document.title = document.oTitle;
      [...document.querySelectorAll(".edit-toolbar")].forEach((e) => {
        const a = e.contentDocument.querySelector('[data-command="close"]');
        a.dispatchEvent(new Event("click", { bubbles: true }));
      });
    }
  }
});

/* transition */
document.getElementById("toolbar").addEventListener("transitionend", (e) => {
  e.target.classList.remove("active");
});

const render = () =>
  chrome.runtime.sendMessage(
    {
      cmd: "read-data",
    },
    async (obj) => {
      if (obj === false) {
        alert("PrintFriendly is not available any more. Please try again");
        document.querySelector("[data-cmd=close]").click();
      }

      article = obj;
      document.dispatchEvent(new Event("article-ready"));

      document.title = document.oTitle = pfConfig.prefs.title
        .replace("[ORIGINAL]", article.title.replace(" :: PrintFriendly", ""))
        .replace("[BRAND]", "PrintFriendly");

      if (!article) {
        // open this page from history for instance
        return location.replace(args.get("url"));
      }
      iframe.contentDocument.open();
      const { pathname, hostname } = new URL(article.url);
      const gcs = window.getComputedStyle(document.documentElement);
      iframe.contentDocument.write(
        (await template())
          .replace("%dir%", article.dir ? " dir=" + article.dir : "")
          .replace("%content%", article.content)
          .replaceAll("%title%", article.title || "Unknown Title")
          .replace("%byline%", article.byline || "")
          .replace("%reading-time-fast%", article.readingTimeMinsFast)
          .replace("%reading-time-slow%", article.readingTimeMinsSlow)
          .replace("%published-time%", article["published_time"] || "")
          .replace("%href%", article.url)
          .replace("%hostname%", hostname)
          .replace("%pathname%", pathname)
          .replace("/*user-css*/", pfConfig.prefs["user-css"])
          .replace("%data-images%", pfConfig.prefs["show-images"])
          .replace("%data-font%", pfConfig.prefs.font)
          .replace("%data-mode%", pfConfig.prefs.mode)
      );
      iframe.contentDocument.close();

      // remote image loading
      {
        let shown = false;
        iframe.contentWindow.addEventListener(
          "error",
          (e) => {
            if (
              shown === false &&
              e.target.tagName === "IMG" &&
              e.target.src.startsWith("http")
            ) {
              chrome.storage.local.get(
                {
                  "warn-on-remote-resources": true,
                },
                (prefs) => {
                  if (prefs["warn-on-remote-resources"]) {
                    //tips.show(1, false);
                  }
                  shown = true;
                }
              );
            }
          },
          true
        );
      }

      // fix relative links;
      const es = [...iframe.contentDocument.querySelectorAll('[src^="//"]')];
      for (const e of es) {
        e.src = article.url.split(":")[0] + ":" + e.getAttribute("src");
      }

      const props = {
        rel: "shortcut icon",
        href:
          article.icon && article.icon.startsWith("data:")
            ? article.icon
            : "chrome://favicon/" + article.url,
      };
      if (pfConfig.prefs["show-icon"] === false) {
        props.href = "/data/icons/32.png";
      }
      const link = Object.assign(
        document.querySelector(`link[rel*='icon']`) ||
        document.createElement("link"),
        props
      );
      document.head.appendChild(link);

      iframe.contentDocument
        .querySelector("#content-wrapper")
        .appendChild(styles.internals);
      iframe.addEventListener("load", () => {
        if (document.body.dataset.loaded !== "true") {
          // apply transition after initial changes
          document.body.dataset.loaded =
            iframe.contentDocument.body.dataset.loaded = true;

          highlight = new iframe.contentWindow.Highlight();
          // if (article.highlights) {
          //   highlight.import(article.highlights);
          // }
        }
      });
      // highlight
      iframe.contentDocument.addEventListener("selectionchange", () => {
        const s = iframe.contentDocument.getSelection();
        const active = s.toString().trim() !== "";
        document.getElementById("highlight-button").dataset.disabled =
          active === false;
      });
      // close on escape
      {
        const callback = (e) => {
          if (
            e.key === "Escape" &&
            !(
              document.fullscreenElement ||
              document.mozFullScreenElement ||
              document.webkitFullscreenElement ||
              document.msFullscreenElement
            )
          ) {
            return nav.back();
          }
          if (e.code === "KeyJ" && e.shiftKey && (e.ctrlKey || e.metaKey)) {
            iframe.contentDocument.body.focus();
            iframe.contentDocument.body.click();

            e.preventDefault();
            return;
          }

          shortcuts.forEach((o) => {
            const s = pfConfig.prefs.shortcuts[o.id];
            if (s.indexOf(e.code) === -1) {
              return;
            }
            if (
              s.indexOf("Ctrl/Command") !== -1 &&
              (e.ctrlKey || e.metaKey) === false
            ) {
              return;
            }
            if (s.indexOf("Ctrl/Command") === -1 && (e.ctrlKey || e.metaKey)) {
              return;
            }
            if (s.indexOf("Shift") !== -1 && e.shiftKey === false) {
              return;
            }
            if (s.indexOf("Shift") === -1 && e.shiftKey) {
              return;
            }
            e.preventDefault();
            e.stopImmediatePropagation();
            o.action();
            return false;
          });
        };
        // editor commands issue in FF
        iframe.contentWindow.addEventListener("keydown", (e) => {
          if (iframe.contentDocument.designMode === "on") {
            const meta = e.metaKey || e.ctrlKey;
            if (meta && e.code === "KeyB") {
              iframe.contentDocument.execCommand("bold");
              e.preventDefault();
            } else if (meta && e.code === "KeyI") {
              iframe.contentDocument.execCommand("italic");
              e.preventDefault();
            } else if (meta && e.code === "KeyU") {
              iframe.contentDocument.execCommand("underline");
              e.preventDefault();
            }
          }
        });
        iframe.contentWindow.addEventListener("keydown", callback);
        window.addEventListener("keydown", callback);
        iframe.contentWindow.focus();
      }
      // move to hash
      if (args.get("url").indexOf("#") !== -1) {
        const link = new URL(args.get("url"));
        hash(link);
      }
    }
  );

// pref changes
pfConfig.onChanged.push((ps) => {
  if (ps["top-css"]) {
    styles.top.textContent = pfConfig.prefs["top-css"];
  }
  if (
    ps["font-size"] ||
    ps["font"] ||
    ps["line-height"] ||
    ps["width"] ||
    ps["text-align"]
  ) {
    update.async();
  }
  if (ps["show-images"]) {
    update.images();
  }
  if (ps["mode"]) {
    document.body.dataset.mode = pfConfig.prefs.mode;
  }
  if (ps["toggle-toolbar"]) {
    document.body.dataset.toolbar = pfConfig.prefs["toggle-toolbar"];
  }
});

// load
pfConfig.load(() => {
  document.body.dataset.mode = pfConfig.prefs.mode;
  document.body.dataset.toolbar = pfConfig.prefs["toggle-toolbar"];
  if (pfConfig.prefs["printing-button"]) {
    document.getElementById("printing-button").classList.remove("hidden");
  }
  if (pfConfig.prefs["images-button"]) {
    document.getElementById("images-button").classList.remove("hidden");
  }
  if (pfConfig.prefs["highlight-button"]) {
    document.getElementById("highlight-button").classList.remove("hidden");
  }
  if (pfConfig.prefs["design-mode-button"]) {
    document.getElementById("design-mode-button").classList.remove("hidden");
  }
  update.images();
  update.async();

  styles.top.textContent = pfConfig.prefs["top-css"];
  document.documentElement.appendChild(styles.top);

  render();
});

// convert data HREFs

/*
DISABLE
const links = window.links = (d = document) => {
  for (const a of [...d.querySelectorAll('[data-href]')]) {
    if (a.hasAttribute('href') === false) {
      a.href = chrome.runtime.getManifest().homepage_url + '#' + a.dataset.href;
    }
  }
};
document.addEventListener('DOMContentLoaded', () => links());
*/
shortcuts.render();
