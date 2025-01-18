(() => {
  // src/lib/consts.ts
  var SEARCH_OMNIBOX_PARAM = "wspob";
  var SEARCH_OMNIBOX_VAL = "1";
  var LOGO = "/resources/SASExt_logo.png";

  // ../common/lib/consts.ts
  var NODE_ENV = "production";
  var BROWSER = "firefox";
  var TITLE = "SUPERAntiSpyware Ext";
  var TRANSMIT_STATS_DEFAULT = !browser;
  var ENABLED_DEFAULT = !browser;
  var TEST_GROUP_STORAGE_KEY = "config:test_group";
  var DSE_DISMISED_STORAGE_KEY = "dse:prompt_dismissed";

  // ../common/lib/util.ts
  function getMessage(messageName) {
    const BROWSER_NAME = BROWSER === "chrome" ? "Chrome" : BROWSER === "edge" ? "Edge" : BROWSER === "firefox" ? "Firefox" : BROWSER;
    return chrome.i18n.getMessage(messageName).replace(/<BROWSER>/g, BROWSER_NAME).replace(/<TITLE>/g, TITLE);
  }
  async function getStoredData(key, storage = "local", defaultValue = null) {
    const store = storage === "sync" ? chrome.storage.sync : storage === "session" ? chrome.storage.session : chrome.storage.local;
    const data = await new Promise((res) => store.get(key, res));
    return data && data.hasOwnProperty(key) ? data[key] : defaultValue;
  }
  async function log(...args) {
    NODE_ENV === "development" && console.debug("[WSP]", ...args);
  }

  // ../common/lib/defaultSearchEngine.ts
  async function shouldShowDsePrompt() {
    if (BROWSER === "firefox") {
      return false;
    }
    const dismissed = await getStoredData(DSE_DISMISED_STORAGE_KEY, "sync");
    return !dismissed;
  }
  function setDsePromptDismissed() {
    const storage = chrome.storage.sync || chrome.storage.local;
    try {
      storage.set({ [DSE_DISMISED_STORAGE_KEY]: true });
    } catch (err) {
      console.error(err);
    }
  }

  // src/lib/Color.ts
  var Color = /* @__PURE__ */ ((Color2) => {
    Color2["Green"] = "#04B72F";
    Color2["Grey"] = "#7F7F7F";
    Color2["Red"] = "#F30011";
    Color2["Lightblue"] = "#10A7E2";
    Color2["Blue"] = "#285972";
    Color2["Darkblue"] = "#0F3544";
    Color2["Yellow"] = "#F9DD0E";
    Color2["Mustard"] = "#EDC20F";
    return Color2;
  })(Color || {});
  var Color_default = Color;

  // ../common/lib/abTesting.ts
  async function getTestGroup() {
    let testGroup = await getStoredData(TEST_GROUP_STORAGE_KEY, "sync");
    if (!testGroup) {
      testGroup = getRandomArbitrary(1, 12);
      const storage = chrome.storage.sync || chrome.storage.local;
      await storage.set({ [TEST_GROUP_STORAGE_KEY]: testGroup });
    }
    return testGroup;
  }
  async function getTestDiv(divs) {
    const g = await getTestGroup();
    const rangeSize = 12 / divs;
    for (let i = 1; i <= divs; i++) {
      const start = (i - 1) * rangeSize + 1;
      const end = i * rangeSize;
      if (g >= start && g <= end) {
        return i;
      }
    }
    return null;
  }
  function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  // src/lib/showDsePrompt.ts
  var CIRCLE = "/resources/dse/circle.svg";
  var KEEP = `/resources/dse/en-${BROWSER}-keep-b.webm`;
  async function showDsePrompt_default() {
    const testDiv = await getTestDiv(2);
    if (testDiv === 2) {
      return;
    }
    const outerContainer = document.createElement("aside");
    addBoxStyle(outerContainer);
    outerContainer.style.left = "50%";
    outerContainer.style.transform = "translate(-50%, 0)";
    outerContainer.style.width = "48rem";
    outerContainer.addEventListener("click", dismiss);
    const arrow = getArrow();
    arrow.style.top = "-48px";
    arrow.style.left = "50%";
    arrow.style.transform = "translate(-50%, 0)";
    const innerContainer = document.createElement("div");
    innerContainer.style.display = "flex";
    innerContainer.style.alignItems = "center";
    innerContainer.style.justifyContent = "space-evenly";
    const left = document.createElement("div");
    left.style.width = "400px";
    left.style.backgroundImage = `url(${chrome.runtime.getURL(CIRCLE)})`;
    left.style.backgroundSize = "400px";
    left.style.backgroundPosition = "center";
    left.style.display = "flex";
    left.style.alignItems = "center";
    left.style.justifyContent = "center";
    left.style.padding = "3rem 0";
    const right = document.createElement("div");
    const video = document.createElement("video");
    video.src = chrome.runtime.getURL(KEEP);
    video.width = 340;
    addVideoProps(video);
    const logo = document.createElement("img");
    logo.src = chrome.runtime.getURL(LOGO);
    logo.width = 200;
    const text = document.createElement("span");
    text.style.color = Color_default.Yellow;
    text.style.fontWeight = "500";
    addTextContent(text);
    left.append(video);
    right.append(logo, text, getDoneButton());
    innerContainer.append(left, right);
    outerContainer.append(arrow, innerContainer);
    document.body.append(outerContainer);
    function dismiss() {
      outerContainer.remove();
      setDsePromptDismissed();
    }
  }
  function getDoneButton() {
    const button = document.createElement("button");
    button.style.display = "block";
    button.style.marginTop = "16px";
    button.style.padding = "8px 32px 8px 12px";
    button.style.fontSize = "14px";
    button.style.color = "white";
    button.style.backgroundColor = Color_default.Darkblue;
    button.style.outlineWidth = "0px";
    button.style.borderWidth = "0px";
    button.style.borderRadius = "6px";
    button.style.textTransform = "lowercase";
    button.style.fontWeight = "bold";
    button.style.backgroundImage = `url(${chrome.runtime.getURL("/resources/dse/arrow.svg")})`;
    button.style.backgroundSize = "16px";
    button.style.backgroundRepeat = "no-repeat";
    button.style.backgroundPositionX = "calc(100% - 8px)";
    button.style.backgroundPositionY = "50%";
    button.style.cursor = "pointer";
    button.style.boxShadow = "none";
    button.innerText = getMessage("buttons_done");
    return button;
  }
  function addTextContent(target) {
    const html = getMessage(`dse_keep_${BROWSER}`);
    const dom = new DOMParser().parseFromString(html, "text/html");
    const b = dom.getElementsByTagName("b")[0];
    if (b) {
      b.style.display = "block";
      b.style.padding = "1rem 0";
      b.style.color = "white";
    }
    for (const node of dom.body.childNodes) {
      target.appendChild(node.cloneNode(true));
    }
  }
  function addBoxStyle(box) {
    box.style.position = "fixed";
    box.style.zIndex = "2147483647";
    box.style.bottom = "0";
    box.style.fontFamily = "sans-serif";
    box.style.fontSize = "1.25rem";
    box.style.lineHeight = "1.75rem";
    box.style.backgroundColor = Color_default.Blue;
  }
  function getArrow() {
    const W = 96;
    const H = W / 2;
    const el = document.createElement("div");
    el.style.position = "absolute";
    el.innerHTML = `
    <svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
      <polygon points="${H},0 ${W},${H} 0,${H}" fill="${Color_default.Blue}" />
    </svg>
  `;
    return el;
  }
  function addVideoProps(video) {
    video.loop = true;
    video.muted = true;
    video.autoplay = true;
    video.style.clipPath = "inset(1px 1px)";
  }

  // src/content-scripts/default-search-engine.ts
  if (isDse(window.location.href)) {
    perhapsShowDsePrompt();
  } else {
    chrome.runtime.onMessage.addListener(
      (message, sender, sendResponse) => {
        log("Message received", sender, message), sendResponse();
        perhapsShowDsePrompt();
      }
    );
    log("Added message listener");
  }
  var dsePromptShown = false;
  function perhapsShowDsePrompt() {
    if (!dsePromptShown) {
      shouldShowDsePrompt().then((show) => {
        if (show) {
          showDsePrompt_default();
          dsePromptShown = true;
        }
      });
    }
  }
  function isDse(url) {
    const { searchParams } = new URL(url);
    return searchParams.get(SEARCH_OMNIBOX_PARAM) === SEARCH_OMNIBOX_VAL;
  }
})();
