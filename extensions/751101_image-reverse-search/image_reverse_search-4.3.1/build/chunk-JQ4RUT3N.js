var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// source/storage.ts
var newProvider = {
  name: "",
  icon: "icons/other.png",
  url: "",
  selected: true,
  doNotEncodeUrl: false,
  stripProtocol: false
};
var defaultOptions = Object.freeze({
  openInBackground: false,
  openTabAt: "right",
  showOpenAll: true,
  showOpenAllAtTop: false,
  searchAllByDefault: false,
  storageProviders: [
    {
      name: "Google Lens",
      icon: "icons/google.png",
      url: "https://lens.google.com/uploadbyurl?url=%s",
      selected: true,
      doNotEncodeUrl: false,
      stripProtocol: false
    },
    {
      name: "Google",
      icon: "icons/google.png",
      url: "https://www.google.com/searchbyimage?sbisrc=google&image_url=%s",
      selected: false,
      doNotEncodeUrl: false,
      stripProtocol: false
    },
    {
      name: "IQDB",
      icon: "icons/iqdb.png",
      url: "https://iqdb.org/?url=%s",
      selected: false,
      doNotEncodeUrl: false,
      stripProtocol: false
    },
    {
      name: "TinEye",
      icon: "icons/tineye.png",
      url: "https://www.tineye.com/search?url=%s",
      selected: false,
      doNotEncodeUrl: false,
      stripProtocol: false
    },
    {
      name: "Bing",
      icon: "icons/bing.png",
      url: "https://www.bing.com/images/searchbyimage?FORM=IRSBIQ&cbir=sbi&imgurl=%s",
      selected: false,
      doNotEncodeUrl: false,
      stripProtocol: false
    },
    {
      name: "Yandex",
      icon: "icons/yandex.png",
      url: "https://yandex.com/images/search?url=%s&rpt=imageview",
      selected: false,
      doNotEncodeUrl: false,
      stripProtocol: false
    },
    {
      name: "\u042F\u043D\u0434\u0435\u043A\u0441",
      icon: "icons/yandexru.png",
      url: "https://yandex.ru/images/search?url=%s&rpt=imageview",
      selected: false,
      doNotEncodeUrl: false,
      stripProtocol: false
    },
    {
      name: "Baidu",
      icon: "icons/baidu.png",
      url: "https://image.baidu.com/n/pc_search?queryImageUrl=%s",
      selected: false,
      doNotEncodeUrl: false,
      stripProtocol: false
    },
    {
      name: "SauceNAO",
      icon: "icons/saucenao.png",
      url: "https://saucenao.com/search.php?db=999&url=%s",
      selected: false,
      doNotEncodeUrl: false,
      stripProtocol: false
    }
  ]
});
var getOptions = async () => chrome.storage.sync.get(defaultOptions);

// source/utils.ts
var isNullish = (argument) => argument === null || argument === void 0;
var getMessage = (key, parameters) => chrome.i18n.getMessage(key, parameters) || `??${key}??`;
var arraymove = (array, fromIndex, toIndex) => {
  const clonedArray = [...array];
  const [element] = clonedArray.splice(fromIndex, 1);
  clonedArray.splice(toIndex, 0, element);
  return clonedArray;
};
var getUpperIndex = (length, index) => {
  if (index === 0) {
    return length - 1;
  }
  return index - 1;
};
var getLowerIndex = (length, index) => {
  if (index === length - 1) {
    return 0;
  }
  return index + 1;
};
var base64EncodeIcon = (ctx) => {
  const pngBase64 = ctx.canvas.toDataURL();
  const { data: pixels } = ctx.getImageData(0, 0, 24, 24);
  const isTransparent = pixels.some(
    (value, index) => index % 4 === 3 && value !== 255
  );
  if (isTransparent) {
    return pngBase64;
  }
  const jpegBase64 = ctx.canvas.toDataURL("image/jpeg", 0.8);
  if (pngBase64.length < jpegBase64.length) {
    return pngBase64;
  }
  return jpegBase64;
};
var isFirefox = (
  // @ts-ignore
  typeof window !== "undefined" && window.browser && browser.runtime
);

export {
  __commonJS,
  __toESM,
  newProvider,
  defaultOptions,
  getOptions,
  isNullish,
  getMessage,
  arraymove,
  getUpperIndex,
  getLowerIndex,
  base64EncodeIcon,
  isFirefox
};
