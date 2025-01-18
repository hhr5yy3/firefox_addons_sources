var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import "./_virtual_wxt-html-plugins-8f653fed.js";
import { b as browser$1, m as makeMessageListener } from "./message-939596d6.js";
const browser = browser$1;
class OffscreenMain {
  constructor() {
    __publicField(this, "textArea");
    __publicField(this, "handleMessage", makeMessageListener({
      GetScreenSize: () => {
        return {
          width: window.screen.width,
          height: window.screen.height,
          availWidth: window.screen.availWidth,
          availHeight: window.screen.availHeight
        };
      },
      ClearValueFromClipboard: async ({
        value
      }) => {
        this.textArea.select();
        document.execCommand("paste");
        const clipboardValue = this.textArea.value;
        if (clipboardValue !== value) {
          return;
        }
        this.textArea.value = "\0";
        this.textArea.select();
        document.execCommand("copy");
      }
    }));
    this.textArea = document.createElement("textarea");
    document.body.appendChild(this.textArea);
  }
  init() {
    browser.runtime.onMessage.addListener(this.handleMessage);
  }
}
const main = new OffscreenMain();
main.init();
//# sourceMappingURL=offscreen-1cb3bb6d.js.map
