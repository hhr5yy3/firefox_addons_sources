(function () {
  'use strict';

  function createUnlockButton(callback) {
    async function wrapCallback() {
      text.innerHTML = "Working... might take up to 10 seconds";
      let result;
      try {
        result = await callback();
        console.log("liberanews:", result);
        if (!result) {
          throw Error("Cannot unlock");
        }
      } catch (e) {
        console.trace(e);
        console.log("liberanews: error", e);
        error.innerHTML = `<strong>Liberanews error</strong><br/> Try again, if it doesn't work contact me on <a href='https://twitter.com/FreiburgLuca' target='_blank'>Twitter</a>, <a href='https://github.com/lucafrei/liberanews' target='_blank'>GitHub</a>, or <a href='mailto:c.harlock@yandex.com?subject=Liberanews%20Error&body=URL:%20${document.location.href}'>send me an email</a>.`;
        error.style.display = "block";
      }
      button.remove();
    }

    const container = document.createElement("div");
    const error = document.createElement("div");
    const button = document.createElement("button");
    const img = document.createElement("img");
    const text = document.createElement("span");
    container.id = "liberanews--container";
    error.style = [
      "display: none",
      "margin: 20px auto",
      "font-size: 26px",
      "border: none",
      "color: black",
      "background: white",
      "padding: 10px 20px",
      "border-radius: 5px",
      "border: 2px solid #f44336"
    ].join(";");
    button.id = "liberanews--unlock";
    container.appendChild(error);
    container.appendChild(button);
    button.appendChild(img);
    button.appendChild(text);
    button.style = [
      "display: block",
      "margin: 20px auto",
      "font-size: 26px",
      "border: none",
      "color: white",
      "background: #2e7d32",
      "padding: 10px 20px",
      "border-radius: 5px"
    ].join(";");
    img.src = browser.runtime.getURL("icons/icon-64.png");
    img.style = [
      "display: inline",
      "width: 32px",
      "height: 32px",
      "margin-right: 10px",
      "vertical-align: top"
    ].join(";");
    text.innerHTML = "Unlock article with <strong>liberanews</strong>";
    button.addEventListener("click", wrapCallback, false);
    return container;
  }

  const domain = "corriere.it";

  async function unlock(article) {
    const newArticle = await fetchArticle();
    const toReplace = document.querySelector("html");
    if (!toReplace) {
      throw new Error("Cannot replace content");
    }
    document.querySelector("#pwl_overlay").remove();
    document.querySelector("#pwl_vt").remove();
    toReplace.replaceWith(newArticle);
    return true;
  }

  function addUnlockButton(reference) {
    const container = reference.parentElement;
    const button = createUnlockButton(unlock);
    container.insertBefore(button, reference);
  }

  async function fetchArticle() {
    let url = document.location.origin + document.location.pathname;
    url = url.replace("_preview.shtml", ".shtml");
    const resp = await fetch(url, { credentials: "omit" });
    const bytes = await resp.arrayBuffer();
    const decoder = new TextDecoder("iso-8859-1");
    const text = decoder.decode(bytes);
    const domparser = new DOMParser();
    const doc = domparser.parseFromString(text, "text/html");
    doc
      .querySelectorAll("img.lazy")
      .forEach(elem =>
        elem.replaceWith(elem.parentElement.querySelector("noscript img"))
      );
    return doc.querySelector("html");
  }

  function check(timerId) {
    console.log("liberanews: check", timerId);
    const paywall = document.querySelector("#pwl_vt");
    if (!paywall) {
      return;
    }
    window.clearInterval(timerId);
    console.log("liberanews: paywall found");
    const reference = paywall.querySelector(".bottom_xs");
    addUnlockButton(reference);
  }

  function run() {
    let timerId = window.setInterval(() => check(timerId), 1000);
  }

  var corriere = { domain, run };

  const domain$1 = "ft.com";

  async function unlock$1() {
    const article = await fetchArticle$1();
    document.querySelector("html").replaceWith(article);
    return true;
  }

  function addUnlockButton$1(reference) {
    const container = reference.parentElement;
    const button = createUnlockButton(unlock$1);
    container.insertBefore(button, reference);
  }

  function addCookieButton(reference) {
    const container = reference.parentElement;
    const button = document.createElement("button");
    button.innerHTML = "Close banner with <strong>liberanews</strong>";
    button.addEventListener(
      "click",
      () => document.querySelector(".cookie-banner").remove(),
      false
    );
    button.style =
      "display: block; border: 1px solid gray; margin: 20px auto; font-size: 26px; padding: 10px 20px";
    container.insertBefore(button, reference);
  }

  async function fetchArticle$1() {
    let url = document.location.href;
    const req = await fetch(url, {
      headers: { "X-Liberanews-Referer": "https://www.facebook.com/" }
    });
    const text = await req.text();
    const domparser = new DOMParser();
    const doc = domparser.parseFromString(text, "text/html");
    const article = doc.querySelector("html");
    const note = document.createElement("div");
    note.innerHTML = `Article unlocked with <a href="https://github.com/lucafrei/liberanews" target="_blank"><code>liberanews</code></a>`;
    article.appendChild(note);
    addCookieButton(doc.querySelector(".cookie-banner .cookie-banner__head"));
    return article;
  }

  function check$1(timerId) {
    console.log("liberanews: check", timerId);
    const paywall = document.querySelector(
      "#site-content section + div.o-grid-container main"
    );
    if (!paywall) {
      return;
    }
    window.clearInterval(timerId);
    console.log("liberanews: paywall found");
    addUnlockButton$1(paywall);
  }

  function run$1() {
    let timerId = window.setInterval(() => check$1(timerId), 1000);
  }

  var ft = { domain: domain$1, run: run$1 };

  const domain$2 = "gelocal.it";

  async function unlock$2() {
    const newArticle = await fetchArticle$2();
    replace(newArticle);
    removeBanner();
    return true;
  }

  function addUnlockButton$2() {
    const reference = document.querySelector("#ph-paywall:first-child");
    const container = reference.parentElement;
    const button = createUnlockButton(unlock$2);
    container.insertBefore(button, reference);
  }

  async function fetchArticle$2() {
    const req = await fetch(document.location.href);
    const text = await req.text();
    const domparser = new DOMParser();
    const doc = domparser.parseFromString(text, "text/html");
    const article = doc.querySelector("#article-body");
    article.style.visibility = "visible";
    if (article.attributes.getNamedItem("hidden")) {
      article.attributes.removeNamedItem("hidden");
    }
    const note = document.createElement("div");
    note.innerHTML = `Article unlocked with <a href="https://github.com/lucafrei/liberanews" target="_blank"><code>liberanews</code></a>`;
    article.appendChild(note);
    return article;
  }

  function replace(newArticle) {
    const articleBody = document.getElementById("article-body");
    articleBody.replaceWith(newArticle);
    document.querySelector(".gnn-main-content").style = "overflow-x: unset";
  }

  function removeBanner() {
    const banner = document.querySelector(".paywall-adagio");
    banner.remove();
  }

  function check$2(timerId) {
    const phPaywall = document.querySelector("#ph-paywall");

    if (!phPaywall) {
      return;
    }
    window.clearInterval(timerId);
    console.log("liberanews: paywall found");
    addUnlockButton$2();
  }

  function run$2() {
    let timerId = window.setInterval(() => check$2(timerId), 1000);
  }

  var gelocal = { domain: domain$2, run: run$2 };

  const domain$3 = "lastampa.it";

  async function unlock$3() {
    const newArticle = await fetchArticle$3();
    replace$1(newArticle);
    removeBanner$1();
    return true;
  }

  function addUnlockButton$3() {
    const reference = document.getElementById("article-body");
    const container = reference.parentElement;
    const button = createUnlockButton(unlock$3);
    container.insertBefore(button, reference);
  }

  async function fetchArticle$3() {
    const req = await fetch(document.location.href);
    const text = await req.text();
    const domparser = new DOMParser();
    const doc = domparser.parseFromString(text, "text/html");
    const article = doc.querySelector("#article-body");
    const note = document.createElement("div");
    note.innerHTML = `Article unlocked with <a href="https://github.com/lucafrei/liberanews" target="_blank"><code>liberanews</code></a>`;
    article.appendChild(note);
    return article;
  }

  function replace$1(newArticle) {
    const articleBody = document.getElementById("article-body");
    articleBody.replaceWith(newArticle);
  }

  function removeBanner$1() {
    const banner = document.querySelector(".paywall-adagio");
    banner.remove();
  }

  function run$3() {
    const articleBody = document.getElementById("article-body");
    const phPaywall = document.getElementById("ph-paywall");

    if (!phPaywall) {
      return;
    }
    console.log("liberanews: paywall found");
    addUnlockButton$3();
  }

  var lastampa = { domain: domain$3, run: run$3 };

  const domain$4 = "morgenpost.de";

  async function unlock$4(lockedArticle) {
    const article = await fetchArticle$4();
    replace$2(lockedArticle, article);
    removeBanner$2();
    return true;
  }

  function addUnlockButton$4(reference) {
    const container = reference.parentElement;
    const button = createUnlockButton(unlock$4.bind(null, reference));
    container.insertBefore(button, reference);
  }

  async function fetchArticle$4() {
    const req = await fetch(document.location.href);
    const text = await req.text();
    const domparser = new DOMParser();
    const doc = domparser.parseFromString(text, "text/html");
    const article = doc.querySelector(".article__body");
    const note = document.createElement("div");
    note.innerHTML = `Article unlocked with <a href="https://github.com/lucafrei/liberanews" target="_blank"><code>liberanews</code></a>`;
    article.appendChild(note);
    return article;
  }

  function replace$2(lockedArticle, newArticle) {
    lockedArticle.replaceWith(newArticle);
  }

  function removeBanner$2() {
    const banner = document.querySelector(".paywall-container");
    banner.remove();
  }

  function run$4() {
    const lockedArticle = document.querySelector(".article__body");
    const paywall = document.querySelector("#paywall-container");

    if (!paywall) {
      return;
    }
    console.log("liberanews: paywall found");
    addUnlockButton$4(lockedArticle);
  }

  var morgenpost = { domain: domain$4, run: run$4 };

  const domain$5 = "nytimes.com";

  async function unlock$5() {
    document.querySelector("#gateway-content").remove();
    document.querySelector("#site-content").style = "";
    document.querySelector("#app > div > div").style =
      "position: relative; overflow: auto";
    document.querySelector("#app > div > div:first-child").lastChild.remove();
    return true;
  }

  function addUnlockButton$5(reference) {
    const container = reference.parentElement;
    const button = createUnlockButton(unlock$5);
    container.insertBefore(button, reference);
  }

  function check$3(timerId) {
    const paywall = document.querySelector("#gateway-content");
    const reference = paywall && paywall.querySelector("div");
    if (!reference) {
      return;
    }
    window.clearInterval(timerId);
    console.log("liberanews: paywall found");
    addUnlockButton$5(reference);
  }

  function run$5() {
    let timerId = window.setInterval(() => check$3(timerId), 1000);
  }

  var nytimes = { domain: domain$5, run: run$5 };

  const domain$6 = "repubblica.it";

  async function unlock$6(lockedArticle) {
    const newArticle = await fetchArticle$5();
    replace$3(lockedArticle, newArticle);
    return true;
  }

  function addUnlockButton$6(lockedArticle) {
    const container = lockedArticle.parentElement;
    const button = createUnlockButton(unlock$6.bind(null, lockedArticle));
    container.insertBefore(button, lockedArticle);
  }

  async function fetchArticle$5() {
    let url = document.location.href;
    url = url.replace(
      "https://rep.repubblica.it/pwa/",
      "https://rep.repubblica.it/ws/detail/"
    );
    url = url.substring(0, url.length - 1);

    const req = await fetch(url);
    const text = await req.text();
    const domparser = new DOMParser();
    const doc = domparser.parseFromString(text, "text/html");
    const article = doc.querySelector(".detail-article_body .paywall");
    const note = document.createElement("div");
    note.innerHTML = `Article unlocked with <a href="https://github.com/lucafrei/liberanews" target="_blank"><code>liberanews</code></a>`;
    article.querySelector("div.adv").replaceWith(note);
    return article;
  }

  function replace$3(lockedArticle, newArticle) {
    lockedArticle.innerHTML = newArticle.innerHTML;
  }

  function check$4(timerId) {
    console.log("liberanews: check for paywall");
    const articleContainer = document
      .querySelector("news-app")
      .shadowRoot.querySelector("news-article")
      .shadowRoot.querySelector(".amp-doc-host")
      .shadowRoot.querySelector(".detail-article");
    const articleBody = articleContainer.querySelector(".detail-article_body");
    const paywall = articleContainer.querySelector(".paywall-fixed");
    if (articleContainer.querySelector("#liberanews--unlock")) {
      return;
    }
    if (!paywall) {
      return;
    }
    // window.clearInterval(timerId);
    console.log("liberanews: paywall found");
    addUnlockButton$6(articleBody);
  }

  function run$6() {
    let timerId = window.setInterval(() => check$4(), 1000);
  }

  var repubblica = { domain: domain$6, run: run$6 };

  const domain$7 = "theglobeandmail.com";

  async function unlock$7(article) {
    const newArticle = await fetchArticle$6();
    article.replaceWith(newArticle);
    document.getElementsByTagName("html")[0].classList.remove("keytar-enabled");
    document
      .querySelectorAll(".hide-paragraph")
      .forEach(elem => elem.classList.remove("hide-paragraph"));
    return true;
  }

  function addUnlockButton$7(article) {
    const container = article.parentElement;
    const button = createUnlockButton(unlock$7.bind(null, article));
    container.insertBefore(button, article);
  }

  async function fetchArticle$6() {
    const req = await fetch(document.location.href);
    const text = await req.text();
    const domparser = new DOMParser();
    const doc = domparser.parseFromString(text, "text/html");
    const article = doc.querySelector(".c-article-body");
    const note = document.createElement("div");
    note.innerHTML = `Article unlocked with <a href="https://github.com/lucafrei/liberanews" target="_blank"><code>liberanews</code></a>`;
    article.appendChild(note);
    return article;
  }

  function check$5(timerId) {
    const article = document.querySelector(".c-article-body");
    const paywall = document.querySelector(".c-keytar-header");
    if (!paywall) {
      return;
    }
    window.clearInterval(timerId);
    console.log("liberanews: paywall found");
    addUnlockButton$7(article);
  }

  function run$7() {
    let timerId = window.setInterval(() => check$5(timerId), 1000);
  }

  var theglobeandmail = { domain: domain$7, run: run$7 };

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const domain$8 = "wsj.com";
  const TOTALLY_ARBITRARY_ATTEMPTS = 20;
  const TOTALLY_ARBITRARY_SLEEP_TIME = 100;

  async function unlock$8() {
    let article;
    for (let i = 0; i < TOTALLY_ARBITRARY_ATTEMPTS; i++) {
      console.log("liberanews: fetch article, attempt", i);
      article = await fetchArticle$7();
      if (article) {
        document.querySelector(".wsj-snippet-body").replaceWith(article);
        document.querySelector(".wsj-snippet-login").remove();
        return true;
      }
      await sleep(TOTALLY_ARBITRARY_SLEEP_TIME);
    }
  }

  function addUnlockButton$8(reference) {
    const container = reference.parentElement;
    const button = createUnlockButton(unlock$8);
    container.insertBefore(button, reference);
  }

  async function fetchArticle$7() {
    let url = document.location.href;
    const req = await fetch(url, {
      headers: { "X-Liberanews-Fetch-As": "googlebot" }
    });
    const text = await req.text();
    const domparser = new DOMParser();
    const doc = domparser.parseFromString(text, "text/html");
    const article = doc.querySelector(".article-content");
    if (!article) {
      return;
    }
    const note = document.createElement("div");
    note.innerHTML = `Article unlocked with <a href="https://github.com/lucafrei/liberanews" target="_blank"><code>liberanews</code></a>`;
    article.appendChild(note);
    return article;
  }

  function check$6(timerId) {
    console.log("liberanews: check", timerId);
    const paywall = document.querySelector(".wsj-snippet-login");
    if (!paywall) {
      return;
    }
    window.clearInterval(timerId);
    console.log("liberanews: paywall found");
    addUnlockButton$8(paywall.querySelector(".snippet-label"));
  }

  function run$8() {
    let timerId = window.setInterval(() => check$6(timerId), 1000);
  }

  var wsj = { domain: domain$8, run: run$8 };

  const DOMAINS = [
    corriere,
    ft,
    gelocal,
    lastampa,
    morgenpost,
    nytimes,
    repubblica,
    theglobeandmail,
    wsj
  ];

  const hostname = document.location.hostname;

  for (let { domain, run } of DOMAINS) {
    if (hostname.endsWith(domain)) {
      console.log("liberanews: run", domain);
      run();
    }
  }

}());
