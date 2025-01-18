class GMStorage {
  constructor() {
    this.storage = localStorage;
  }

  async getValue(key, defaultValue) {
    return JSON.parse(this.storage.getItem(key)) || defaultValue;
  }

  async setValue(key, value) {
    this.storage.setItem(key, JSON.stringify(value));
  }
}

const GM = new GMStorage();

// ==UserScript==
// @name        Dart-Zoom for Autodarts
// @namespace   dotty-dev
// @description Dart-Zoom on 3 cams, credit to Stackoverflow question 70205816
// @include     *://*.autodarts.io/*
// @version     2.5.0
// @grant       GM.getValue
// @grant       GM.setValue
// @license     MIT
// @downloadURL https://update.greasyfork.org/scripts/512251/Dart-Zoom%20for%20Autodarts.user.js
// @updateURL https://update.greasyfork.org/scripts/512251/Dart-Zoom%20for%20Autodarts.meta.js
// ==/UserScript==
/*jshint esversion: 11 */

function injectCSS() {
  const css = /*css*/ `
    :root {
      --form-control-color: #3182ce;
    }

    #zoom-bar {
      display: flex;
      height: 20%;
      width: 100%;
      justify-content: space-between;
      overflow: hidden;
    }

    #zoom-bar > div {
        border: 1px solid white;
        border-radius: .5rem;
        width: calc(100% / 3 - 10px);
        padding: 0;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #0003;
      }

    #zoom-bar > div::after {
      content: "";
      height: 5px;
      width: 5px;
      background: var(--form-control-color);
      border: 2px solid white;
      border-radius: 50%;
      position: absolute;
      opacity: var(--dot-opacity, 1);
    }

    #zoom-bar img {
      min-width: 1000px !important;
      min-height: 1000px !important;
      border-radius: 50%;
    }

    .zoom-col-wrapper {
      display: grid !important;
      grid-template-columns: 3fr 1fr;
      grid-template-rows: var(--chakra-sizes-12);
      gap: var(--chakra-space-4);
      grid-template-areas:
        ". ."
        ". .";
    }

    .zoom-col-wrapper > div:nth-child(1) {
      grid-row: 1 / span 2;
    }

    .zoom-col-wrapper > div:nth-child(2) {
      grid-row: 2 / span 1;
    }

    .zoom-col-wrapper > div:nth-child(3)#zoom-bar {
      grid-row: 2 / span 1;
      flex-direction: column;
      gap: var(--chakra-space-2);
      height: 100%;
      width: 100%;
    }

    .zoom-col-wrapper > div:nth-child(3)#zoom-bar > div {
      width: 100%;
    }


    .zoom-col-wrapper.zoom-col-reverse {
      grid-template-columns: 1fr 3fr;
    }

    .zoom-col-wrapper.zoom-col-reverse > div:nth-child(2) {
      grid-column: 2
    }

    .zoom-col-wrapper.zoom-col-reverse > div:nth-child(3)#zoom-bar {
      grid-column: 1;
    }

    #ad-ext-user-menu-extra {
      display: block !important;
    }

    #dart-zoom-config-dialog {
      display: none;
      position: fixed;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100%;
      z-index: 9999;
      background-color: rgba(0, 0, 0, 0.9);
      padding: 20px;
      box-sizing: border-box;
      justify-content: center;
      align-items: center;
      pointer-events: all;
    }

    #dart-zoom-config-dialog-inner {
      width: 80%;
      height: 80%;
      display: flex;
      flex-direction: column;
      padding: 20px;
      padding-top: 40px;
      border-radius: 5px;
      justify-content: space-between;
      align-items: center;
      background-color: rgba(255, 255, 255, 0.3);
      position: relative;
    }

    #dart-zoom-config-dialog .close-button {
      cursor: pointer;
      font-size: 20px;
      font-weight: bold;
      padding: 5px;
      position: absolute;
      top: 20px;
      right: 20px;
    }

    #dart-zoom-config-dialog h1 {
      font-size: 20px;
      font-weight: bold;
    }

    #dart-zoom-config-dialog #config-grid {
      display: grid;
      place-content: center;
      gap: 1.5em;
    }

    #dart-zoom-config-dialog section, #dart-zoom-config-dialog fieldset {
      display: grid;
      gap: 0.5em;
    }

    #dart-zoom-config-dialog fieldset legend {
      font-size: 1rem;
      font-weight: bold;
      margin-bottom: 1.5em;
    }

    #dart-zoom-config-dialog .toggle {
      cursor: pointer;
      display: inline-block;
    }

    #dart-zoom-config-dialog .toggle-switch {
      display: inline-block;
      background: #ccc;
      border-radius: 16px;
      width: 58px;
      height: 32px;
      position: relative;
      vertical-align: middle;
      transition: background 0.25s;
    }
    #dart-zoom-config-dialog .toggle-switch:before, .toggle-switch:after {
      content: "";
    }
    #dart-zoom-config-dialog .toggle-switch:before {
      display: block;
      background: linear-gradient(to bottom, #fff 0%, #eee 100%);
      border-radius: 50%;
      box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.25);
      width: 24px;
      height: 24px;
      position: absolute;
      top: 4px;
      left: 4px;
      transition: left 0.25s;
    }
    #dart-zoom-config-dialog .toggle:hover .toggle-switch:before {
      background: linear-gradient(to bottom, #fff 0%, #fff 100%);
      box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.5);
    }
    #dart-zoom-config-dialog .toggle-checkbox:checked + .toggle-switch {
      background: var(--form-control-color);
    }
    #dart-zoom-config-dialog .toggle-checkbox:checked + .toggle-switch:before {
      left: 30px;
    }

    #dart-zoom-config-dialog .toggle-checkbox {
      position: absolute;
      visibility: hidden;
    }

    #dart-zoom-config-dialog .toggle-label {
      margin-left: 5px;
      position: relative;
      top: 2px;
    }

    #dart-zoom-config-dialog  .form-control {
      font-family: system-ui, sans-serif;
      font-size: 1rem;
      font-weight: bold;
      line-height: 1.1;
    }

    #dart-zoom-config-dialog fieldset .form-control {
      display: grid;
      grid-template-columns: 1em auto;
      gap: 0.5em;
    }

    #dart-zoom-config-dialog  .form-control + .form-control {
      margin-top: 1em;
    }

    #dart-zoom-config-dialog  .form-control:focus-within {
      color: var(--form-control-color);
    }

    #dart-zoom-config-dialog  input[type="radio"] {
      -webkit-appearance: none;
      appearance: none;
      background-color: var(--form-background);
      margin: 0;

      font: inherit;
      color: currentColor;
      width: 1.15em;
      height: 1.15em;
      border: 0.15em solid currentColor;
      border-radius: 50%;
      transform: translateY(-0.075em);

      display: grid;
      place-content: center;
    }

    #dart-zoom-config-dialog  input[type="radio"]::before {
      content: "";
      width: 0.65em;
      height: 0.65em;
      border-radius: 50%;
      transform: scale(0);
      transition: 120ms transform ease-in-out;
      box-shadow: inset 1em 1em var(--form-control-color);
      /* Windows High Contrast Mode */
      background-color: CanvasText;
    }

    #dart-zoom-config-dialog  input[type="radio"]:checked::before {
      transform: scale(1);
    }

    #dart-zoom-config-dialog  input[type="radio"]:focus {
      outline: max(2px, 0.15em) solid currentColor;
      outline-offset: max(2px, 0.15em);
    }

    #dart-zoom-config-dialog .disclaimer {
      text-align: center;
    }

    `;

  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);
}

function listen(fn) {
  fn = fn || console.log;

  let property = Object.getOwnPropertyDescriptor(
    MessageEvent.prototype,
    "data"
  );

  const data = property.get;

  // wrapper that replaces getter
  function lookAtMessage() {
    let socket = this.currentTarget instanceof WebSocket;

    if (!socket) {
      return data.call(this);
    }

    let msg = data.call(this);

    Object.defineProperty(this, "data", { value: msg }); //anti-loop
    fn({ data: msg, socket: this.currentTarget, event: this });
    return msg;
  }

  property.get = lookAtMessage;

  Object.defineProperty(MessageEvent.prototype, "data", property);
}

function createConfigDialog() {
  const menuPromise = new Promise((resolve, reject) => {
    let menuLookup = setInterval(() => {
      if (document.querySelector("#ad-ext-user-menu-extra")) {
        clearInterval(menuLookup);
        resolve();
      }
    }, 500);
  });
  menuPromise.then(() => {
    const adExtMenuHeader = document.querySelector("#ad-ext-user-menu-extra");
    let configDialog = document.querySelector("#dart-zoom-config-dialog");
    let configButton = document.querySelector("#dart-zoom-config-link");
    if (!configDialog) {
      configDialog = document.createElement("div");
      configDialog.id = "dart-zoom-config-dialog";

      configDialog.innerHTML = /*html*/ `
        <div id="dart-zoom-config-dialog-inner">
          <button class="close-button">X</button>
          <h1>Dart Zoom Configuration</h1>
          <div id="config-grid">
            <section>
              <label for="dart-zoom-enabled" class="toggle form-control">
              <input class="toggle-checkbox" type="checkbox" id="dart-zoom-enabled"/>
              <div class="toggle-switch"></div>
              <span class="toggle-label">Dart Zoom Enabled</span>
            </label>
            </section>

            <section>
              <label for="dart-zoom-check-only" class="toggle form-control">
                <input class="toggle-checkbox" type="checkbox" id="dart-zoom-check-only"/>
                <div class="toggle-switch"></div>
                <span class="toggle-label">Show only on check-dart</span>
              </label>
            </section>

            <section>
              <label for="dart-zoom-scale-factor" class="form-control">Scale Factor:</label>
              <input
                type="range"
                id="dart-zoom-scale-factor"
                min="0.1"
                max="5.1"
                step="0.2"
                value="1.1"
              />
            </section>

            <section>
              <label for="dart-zoom-dot-opacity" class="form-control">Center Dot Visibility:</label>
              <input
                type="range"
                id="dart-zoom-dot-opacity"
                min="0"
                max="1"
                step="0.1"
                value="1"
              />
            </section>
            <fieldset>
              <legend>Position:</legend>
              <label class="form-control"><input type="radio" name="dart-zoom-position" value="0" /> bottom</label>
              <label class="form-control"><input type="radio" name="dart-zoom-position" value="1" /> right</label>
              <label class="form-control"><input type="radio" name="dart-zoom-position" value="2" /> left</label>
            </fieldset>
          </div>
          <div class="disclaimer">
            This is a user-made extension and it is used at your own risk.
            <br />
            Extensions can break at any time, especially if the platform is being updated.
            <br />If you have any problems, please try disabling the extension and contact the extension developers.
          </div>
        </div>
      `;

      configDialog
        .querySelector(".close-button")
        .addEventListener("click", () => {
          configDialog.style.display = "none";
        });

      configDialog
        .querySelector("#dart-zoom-enabled")
        .addEventListener("click", (e) => {
          GM.setValue("zoomEnabled", e.target.checked);
        });

      configDialog
        .querySelector("#dart-zoom-check-only")
        .addEventListener("click", (e) => {
          GM.setValue("checkOnly", e.target.checked);
        });

      configDialog
        .querySelector("#dart-zoom-scale-factor")
        .addEventListener("input", (e) => {
          GM.setValue("zoomFactor", parseFloat(e.target.value));
        });

      configDialog
        .querySelectorAll(`input[name="dart-zoom-position"]`)
        .forEach((e) => {
          e.addEventListener("change", (e) => {
            GM.setValue("zoomPosition", parseInt(e.target.value));
          });
        });

      configDialog
        .querySelector("#dart-zoom-dot-opacity")
        .addEventListener("input", (e) => {
          const opacity = parseFloat(e.target.value);
          GM.setValue("dotOpacity", opacity);
          document.documentElement.style.setProperty("--dot-opacity", opacity);
        });

      document.body.appendChild(configDialog);
      updateConfigDialog();
    }

    if (!configButton) {
      configButton = document.createElement("button");
      configButton.id = "dart-zoom-config-link";
      configButton.innerText = "Dart Zoom";
      configButton.classList =
        adExtMenuHeader.parentElement.querySelector("button").classList;
      configButton.addEventListener("click", (e) => {
        e.preventDefault();
        configDialog.style.display = "flex";
        updateConfigDialog(configDialog);
      });
      adExtMenuHeader.insertAdjacentElement("afterend", configButton);
    }
  });
}

async function updateConfigDialog() {
  const configDialog = document.querySelector("#dart-zoom-config-dialog");
  const zoomEnabled = await GM.getValue("zoomEnabled", true);
  const checkOnly = await GM.getValue("checkOnly", false);
  const scaleFactor = await GM.getValue("zoomFactor", 1.1);
  const dotOpacity = await GM.getValue("dotOpacity", 1);
  const zoomPosition = await GM.getValue("zoomPosition", 0);

  if (configDialog) {
    configDialog.querySelector("#dart-zoom-enabled").checked = zoomEnabled;
    configDialog.querySelector("#dart-zoom-check-only").checked = checkOnly;
    configDialog.querySelector("#dart-zoom-scale-factor").value = scaleFactor;
    configDialog
      .querySelector(
        `input[name="dart-zoom-position"][value="${zoomPosition}"]`
      )
      ?.setAttribute("checked", true);
    configDialog.querySelector("#dart-zoom-dot-opacity").value = dotOpacity;
  }

  GM.setValue("zoomEnabled", zoomEnabled);
  GM.setValue("checkOnly", checkOnly);
  GM.setValue("zoomFactor", scaleFactor);
  GM.setValue("zoomPosition", zoomPosition);
  GM.setValue("dotOpacity", dotOpacity);
  document.documentElement.style.setProperty('--dot-opacity', dotOpacity);
}

function updateZoom(zoomFactor) {
  document.querySelectorAll("#zoom-bar img").forEach((img) => {
    img.style.transform = img.style.transform.replace(
      /scale\(\d.\d\)/,
      `scale(${zoomFactor})`
    );
  });
}

function updatePosition(zoomPosition) {
  const wrapper = document.querySelector("#zoom-bar")?.parentElement;
  if (wrapper) {
    switch (zoomPosition) {
      case 2:
        wrapper.classList.add("zoom-col-reverse");
      case 1:
        wrapper.classList.add("zoom-col-wrapper");
        break;
      default:
        wrapper.classList.remove("zoom-col-wrapper");
        wrapper.classList.remove("zoom-col-reverse");
        break;
    }
  }
}

async function dartZoom(data) {
  const adObject = JSON.parse(data);
  console.log(adObject);
  if (adObject?.channel.match(/autodarts\.(matches|board)/) == false) {
    return;
  }
  let zoomEnabled = await GM.getValue("zoomEnabled");
  const checkOnly = await GM.getValue("checkOnly");
  let zoomFactor = await GM.getValue("zoomFactor");
  let zoomPosition = await GM.getValue("zoomPosition");
  let zoomBar = document.querySelector("#zoom-bar");
  let images = zoomBar?.querySelectorAll("img");
  updatePosition(zoomPosition);
  if (zoomFactor === undefined) {
    zoomFactor = 1.1;
    GM.setValue("zoomFactor", zoomFactor);
  }
  if ((adObject && adObject?.data?.turns) || adObject?.data?.changes) {
    let latestX, latestY;
    if (adObject?.data?.turns) {
      const turns = adObject.data.turns.length - 1;
      const latestTurn = adObject.data.turns.at(turns);
      const latestThrow = latestTurn.throws.at(-1);
      latestX = latestThrow?.coords.x;
      latestY = latestThrow?.coords.y;

      const score = adObject.data?.turns.at(turns).score;
      if (zoomEnabled && checkOnly && score == 0) {
        zoomEnabled = true;
      } else if (zoomEnabled && checkOnly && score > 0) {
        zoomEnabled = false;
      } else {
        zoomEnabled = zoomEnabled;
      }
    }

    if (adObject?.data?.changes) {
      updatePosition(zoomPosition);
      latestX = adObject.data.changes[adObject.data.activated].coords.x;
      latestY = adObject.data.changes[adObject.data.activated].coords.y;
    }

    if (latestX !== undefined && latestY !== undefined && zoomEnabled) {
      const transX = (latestX * (1000 / 3) + 500) / 10;
      const transY = (-latestY * (1000 / 3) + 500) / 10;
      if (!zoomBar) {
        const board = document.querySelector(".boardAnimation")?.parentElement;
        board?.insertAdjacentHTML(
          "afterend",
          /*html*/ `
                      <div id="zoom-bar">
                        <div><img></div>
                        <div><img></div>
                        <div><img></div>
                      </div>
                    `
        );
        zoomBar = document.querySelector("#zoom-bar");
        images = zoomBar?.querySelectorAll("img");
        if (images) {
          images.forEach((img, index) => {
            switch (index) {
              case 0:
                img.parentElement.addEventListener("click", () => {
                  zoomFactor -= 0.2;
                  zoomFactor = zoomFactor < 0.1 ? 0.1 : zoomFactor;
                  updateZoom(zoomFactor);
                  GM.setValue("zoomFactor", zoomFactor);
                });
                break;
              case 1:
                img.parentElement.addEventListener("click", (e) => {
                  if (e.detail > 1) {
                    return;
                  }
                  zoomFactor = 1.1;
                  updateZoom(zoomFactor);
                  GM.setValue("zoomFactor", zoomFactor);
                });
                img.parentElement.addEventListener("dblclick", () => {
                  if (zoomPosition == 0) {
                    zoomPosition = 1;
                  } else if (zoomPosition == 1) {
                    zoomPosition = 2;
                  } else {
                    zoomPosition = 0;
                  }
                  GM.setValue("zoomPosition", zoomPosition);
                  updatePosition(zoomPosition);
                });
                break;
              case 2:
                img.parentElement.addEventListener("click", () => {
                  zoomFactor += 0.2;
                  zoomFactor = zoomFactor > 5.1 ? 5.1 : zoomFactor;
                  updateZoom(zoomFactor);
                  GM.setValue("zoomFactor", zoomFactor);
                });
                break;
            }
          });
          updatePosition(zoomPosition);
        }
      }

      images?.forEach((image, index) => {
        image.style.transform = /*css*/ `scale(${zoomFactor}) translate(calc(-${transX}% + 500px), calc(-${transY}% + 500px))`;
        const currentPlayerImageHref = document
          .querySelector("image")
          .getAttribute("href");
        image.setAttribute(
          "src",
          currentPlayerImageHref.replace(/cam=\d/, `cam=${index}`)
        );
      });
    }

    if (!zoomEnabled && zoomBar) {
      zoomBar.parentElement.classList.remove(
        "zoom-col-wrapper",
        "zoom-col-reverse"
      );
      zoomBar.remove();
    }
  }

  if (adObject?.data?.event === "Takeout finished") {
    zoomBar = document.querySelector("#zoom-bar");
    images = zoomBar?.querySelectorAll("img");
    images?.forEach((image, index) => {
      image.removeAttribute("src");
    });
    if (zoomEnabled && checkOnly) {
      zoomEnabled = false;
    } else {
      zoomEnabled = zoomEnabled;
    }

    if (!zoomEnabled) {
      zoomBar.parentElement.classList.remove(
        "zoom-col-wrapper",
        "zoom-col-reverse"
      );
      zoomBar.remove();
    }

    updatePosition(zoomPosition);
  }
}

let observer = new MutationObserver(function () {
  if (document.head) {
    observer.disconnect();
    injectCSS();
    listen(({ data }) => dartZoom(data));
  }
});
observer.observe(document, { subtree: true, childList: true });

(() => {
  createConfigDialog();
})();

(async function() {
  const dotOpacity = await GM.getValue("dotOpacity", 1);
  document.documentElement.style.setProperty('--dot-opacity', dotOpacity);
})();
