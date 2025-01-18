import {
  LINKS_BLACKLIST,
  SEARCH_AD_BY_NAME,
  SEARCH_AD_COUNTER_KEY,
  SEARCH_AD_POOL,
  SEARCH_AD_REF_FLAG,
  cacheSearchAdCrxInfoWithIframe,
  getSearchAdCrxInfoSettings
} from "../chunks/DNY3YXVK.js";
import {
  isMobile
} from "../chunks/42XSBB7P.js";
import "../chunks/KFVZFM6T.js";
import {
  require_dayjs_min
} from "../chunks/4NOIXOKC.js";
import {
  APP_IS_PROD
} from "../chunks/XVTLOGGR.js";
import {
  require_browser_polyfill
} from "../chunks/XOBJISN3.js";
import {
  defaults_default,
  intersection_default,
  random_default
} from "../chunks/TOGVC2JX.js";
import {
  __publicField,
  __toESM
} from "../chunks/ERZ5UWI7.js";

// src/features/searchAd/utils/searchItemBuilder/GoogleSearchItemBuilder.ts
var AD_BOX_SELECTOR = {
  "en-US": 'div[aria-label="Ads"]',
  "zh-CN": 'div[aria-label="\u5E7F\u544A"]',
  "zh-TW": 'div[aria-label="\u5EE3\u544A"]',
  ja: 'div[aria-label="\u5E83\u544A"]',
  es: 'div[aria-label="Anuncios"]',
  ko: 'div[aria-label="\uAD11\uACE0"]',
  pt: 'div[aria-label="An\xFAncios"]',
  fr: 'div[aria-label="Annonces"]',
  de: 'div[aria-label="Anzeigen"]',
  vi: 'div[aria-label="Qu\u1EA3ng c\xE1o"]',
  it: 'div[aria-label="Annunci"]',
  ru: 'div[aria-label="\u0420\u0435\u043A\u043B\u0430\u043C\u0430"]',
  nl: 'div[aria-label="Advertenties"]',
  pl: 'div[aria-label="Reklamy"]',
  tr: 'div[aria-label="Reklamlar"]',
  sr: 'div[aria-label="Oglasi"]',
  th: 'div[aria-label="\u0E42\u0E06\u0E29\u0E13\u0E32"]',
  // add to 20230919
  af: 'div[aria-label="Advertensies"]',
  ak: 'div[aria-label="Edwadie ho dawurub\u0254"]',
  ban: 'div[aria-label="Iklan"]',
  ca: 'div[aria-label="Anuncis"]',
  ceb: 'div[aria-label="Mga pahibalo"]',
  cy: 'div[aria-label="Hysbysebion"]',
  da: 'div[aria-label="Annoncer"]',
  et: 'div[aria-label="Reklaamid"]',
  eu: 'div[aria-label="Iragarkiak"]',
  ee: 'div[aria-label="Boblododowo"]',
  fil: 'div[aria-label="Mga Ad"]',
  ga: 'div[aria-label="F\xF3gra\xED"]',
  xh: 'div[aria-label="Iintengiso"]',
  zu: 'div[aria-label="Izikhangiso "]',
  is: 'div[aria-label="Augl\xFDsingar"]',
  sw: 'div[aria-label="Matangazo"]',
  kg: 'div[aria-label="Ba luzayisu"]',
  lv: 'div[aria-label="Rekl\u0101mas"]',
  lt: 'div[aria-label="Sk."]',
  loz: 'div[aria-label="Zefundotwa"]',
  hu: 'div[aria-label="Hirdet\xE9sek"]',
  mg: 'div[aria-label="Doka"]',
  ms: 'div[aria-label="Pelbagai Iklan"]',
  pcm: 'div[aria-label="Advert"]',
  no: 'div[aria-label="Annonser"]',
  nso: 'div[aria-label="Dipapat\u0161o"]',
  ny: 'div[aria-label="Zotsatsa"]',
  uz: 'div[aria-label="Reklama"]',
  ro: 'div[aria-label="Anun\u021Buri"]',
  crs: 'div[aria-label="Bann piblisite"]',
  so: 'div[aria-label="Xayeysiisyo"]',
  st: 'div[aria-label="Lipapatso"]',
  fi: 'div[aria-label="Mainos"]',
  tn: 'div[aria-label="Dipapatso"]',
  chr: 'div[aria-label="\u13D5\u13A6\u13C3\u13E3\u13B8\u13AF"]',
  lo: 'div[aria-label="\u0EC2\u0E84\u0EAA\u0EB0\u0E99\u0EB2"]',
  si: 'div[aria-label="\u0DAF\u0DD0\u0DB1\u0DCA\u0DC0\u0DD3\u0DB8\u0DCA"]',
  kn: 'div[aria-label="\u0C9C\u0CBE\u0CB9\u0CC0\u0CB0\u0CBE\u0CA4\u0CC1\u0C97\u0CB3\u0CC1"]',
  te: 'div[aria-label="\u0C2A\u0C4D\u0C30\u0C15\u0C1F\u0C28\u0C32\u0C41"]',
  ta: 'div[aria-label="\u0BB5\u0BBF\u0BB3\u0BAE\u0BCD\u0BAA\u0BB0\u0B99\u0BCD\u0B95\u0BB3\u0BCD"]',
  or: 'div[aria-label="\u0B2C\u0B3F\u0B1C\u0B4D\u0B1E\u0B3E\u0B2A\u0B28\u0B17\u0B41\u0B5C\u0B3F\u0B15"]',
  gu: 'div[aria-label="\u0A9C\u0ABE\u0AB9\u0AC7\u0AB0\u0ABE\u0AA4\u0ACB"]',
  pa: 'div[aria-label="\u0A07\u0A38\u0A3C\u0A24\u0A3F\u0A39\u0A3E\u0A30"]',
  bn: 'div[aria-label="\u09AC\u09BF\u099C\u09CD\u099E\u09BE\u09AA\u09A8"]',
  hi: 'div[aria-label="\u0935\u093F\u091C\u094D\u091E\u093E\u092A\u0928"]',
  mr: 'div[aria-label="\u091C\u093E\u0939\u093F\u0930\u093E\u0924\u0940"]',
  ne: 'div[aria-label="\u0935\u093F\u091C\u094D\u091E\u093E\u092A\u0928\u0939\u0930\u0942"]',
  am: 'div[aria-label="\u121B\u1235\u1273\u12C8\u1242\u12EB\u12CE\u127D"]',
  hy: 'div[aria-label="\u0533\u0578\u057E\u0561\u0566\u0564"]',
  ka: 'div[aria-label="\u10E0\u10D4\u10D9\u10DA\u10D0\u10DB\u10D0"]',
  uk: 'div[aria-label="\u0420\u0435\u043A\u043B\u0430\u043C\u0430"]',
  sr2: 'div[aria-label="\u041E\u0433\u043B\u0430\u0441\u0438"]',
  mn: 'div[aria-label="\u0421\u0443\u0440\u0442\u0430\u043B\u0447\u0438\u043B\u0433\u0430\u0430"]',
  mk: 'div[aria-label="\u0420\u0435\u043A\u043B\u0430\u043C\u0438"]',
  kk: 'div[aria-label="\u0416\u0430\u0440\u043D\u0430\u043C\u0430"]',
  ky: 'div[aria-label="\u0416\u0430\u0440\u043D\u0430\u043C\u0430\u043B\u0430\u0440"]',
  be: 'div[aria-label="\u0420\u044D\u043A\u043B\u0430\u043C\u0430"]',
  el: 'div[aria-label="\u0394\u03B9\u03B1\u03C6\u03B7\u03BC."]'
};
var AD_TEMPLATE_SELECTOR = "div.uEierd";
var GoogleSearchItemBuilder = class {
  constructor() {
    __publicField(this, "currentLanguage", "en-US");
    __publicField(this, "currentAdInfo", null);
  }
  adBoxFinder() {
    for (const key in AD_BOX_SELECTOR) {
      const lang = key;
      const el = document.querySelector(AD_BOX_SELECTOR[lang]);
      if (el) {
        this.currentLanguage = lang;
        return el;
      }
    }
    return null;
  }
  verifier() {
    const urlCheckFlag = location.hostname.startsWith("www.google") && location.pathname.startsWith("/search");
    const hasAd = !!this.adBoxFinder();
    return hasAd && urlCheckFlag;
  }
  templateFinder() {
    const adItems = document.querySelectorAll(AD_TEMPLATE_SELECTOR);
    if (adItems.length > 0) {
      const randomIndex = random_default(0, adItems.length - 1);
      return adItems[randomIndex];
    }
    return null;
  }
  adItemDomReset(el) {
    const textAdContainer = el.querySelector("div[data-text-ad]");
    const textAdInner = textAdContainer == null ? void 0 : textAdContainer.firstChild;
    if (!textAdInner) {
      throw new Error("textAdInner dom not found");
    }
    const template = textAdInner.cloneNode(true);
    textAdInner.innerHTML = "";
    const titleTab = template.querySelector("span.U3A9Ac.qV8iec");
    if (!titleTab) {
      throw new Error("titleTab dom not found");
    }
    textAdInner.appendChild(titleTab);
    const titleBox = template.querySelector("div.v5yQqb");
    if (!titleBox) {
      throw new Error("titleBox dom not found");
    }
    textAdInner.appendChild(titleBox);
    const descBox = template.querySelector("div.MUxGbd.yDYNvb.lyLwlc");
    if (!descBox) {
      throw new Error("descBox dom not found");
    }
    textAdInner.appendChild(descBox);
    const whyAdBtn = textAdInner.querySelector(
      // WHY_AD_BTN_SELECTOR[this.currentLanguage],
      'div[role="button"][title]'
    );
    if (!whyAdBtn) {
      throw new Error("whyAdBtn dom not found");
    }
    whyAdBtn.remove();
    return true;
  }
  adItemDomSetup(el) {
    var _a;
    const randomAdIndex = random_default(0, SEARCH_AD_POOL.length - 1);
    const adInfo = SEARCH_AD_POOL[randomAdIndex];
    this.currentAdInfo = adInfo;
    const heading = el.querySelector('a div[role="heading"]');
    if (!heading) {
      throw new Error("setup heading dom failed");
    } else {
      heading.innerHTML = adInfo.title;
      const aTag = heading.closest("a");
      if (!aTag) {
        throw new Error("setup aTag dom failed");
      } else {
        const link = adInfo.link + `-${SEARCH_AD_REF_FLAG}`;
        this.currentAdInfo.link = link;
        aTag.href = link;
        aTag.dataset.pcu = link;
        aTag.dataset.rw = "";
        aTag.classList.remove("fdYsqf");
      }
    }
    const subTitle = el.querySelector("div.OSrXXb span");
    if (subTitle) {
      subTitle.innerHTML = adInfo.subTitle;
    } else {
      throw new Error("setup subTitle dom failed");
    }
    const linkTag = el.querySelector('span[role="text"]');
    if (linkTag) {
      linkTag.innerHTML = adInfo.linkText;
      linkTag.dataset.dtld = adInfo.linkText;
    } else {
      throw new Error("setup linkTag dom failed");
    }
    const description = el.querySelector("div.MUxGbd.yDYNvb.lyLwlc");
    if (description) {
      description.innerHTML = adInfo.description;
    } else {
      throw new Error("setup description dom failed");
    }
    const imgBox = el.querySelector("span.H9lube");
    if (imgBox) {
      imgBox.classList.remove("fJOpI");
      const img = imgBox.querySelector("img");
      if (img) {
        img.src = adInfo.logo;
      } else {
        const svg = el.querySelector("svg");
        if (svg) {
          const img2 = document.createElement("img");
          img2.style.width = "18px";
          img2.style.height = "18px";
          img2.src = adInfo.logo;
          (_a = svg.parentNode) == null ? void 0 : _a.replaceChild(img2, svg);
        }
      }
    } else {
      throw new Error("setup logo img dom failed");
    }
    return true;
  }
  // 判断当前 search results 的 item link 是否在黑名单中
  backListChecker() {
    const itemLinks = [];
    const getHost = (href) => {
      let url = checkEndsWithSlash(href) ? href.slice(0, href.length - 1) : href;
      try {
        const urlObj = new URL(url);
        return urlObj.host;
      } catch (error) {
        return url;
      }
    };
    const resultItems = document.querySelectorAll("#rso > div a > h3");
    if (resultItems.length > 0) {
      resultItems.forEach((item) => {
        var _a;
        const href = (_a = item.parentElement) == null ? void 0 : _a.getAttribute("href");
        href && itemLinks.push(getHost(href));
      });
    }
    const adItems = document.querySelectorAll(AD_TEMPLATE_SELECTOR);
    if (adItems.length > 0) {
      adItems.forEach((item) => {
        const heading = item.querySelector('a div[role="heading"]');
        const aTag = heading == null ? void 0 : heading.closest("a");
        if (aTag) {
          const href = aTag.getAttribute("href");
          href && itemLinks.push(getHost(href));
        }
      });
    }
    return intersection_default(LINKS_BLACKLIST, itemLinks).length > 0;
  }
  render() {
    try {
      const adItemTemplate = this.templateFinder();
      if (!adItemTemplate) {
        throw new Error("GoogleSearchItemBuilder template dom not found");
      }
      const newAdItem = adItemTemplate.cloneNode(true);
      this.adItemDomReset(newAdItem);
      this.adItemDomSetup(newAdItem);
      const withBackList = this.backListChecker();
      if (withBackList) {
        throw new Error("GoogleSearchItemBuilder with backlist");
      }
      adItemTemplate.insertAdjacentElement("afterend", newAdItem);
      return {
        lang: this.currentLanguage,
        el: newAdItem,
        success: true,
        adInfo: this.currentAdInfo
      };
    } catch (error) {
      return {
        lang: null,
        el: null,
        success: false,
        adInfo: null
      };
    }
  }
};
var GoogleSearchItemBuilder_default = GoogleSearchItemBuilder;

// src/features/searchAd/utils/searchItemBuilder/index.ts
var import_webextension_polyfill = __toESM(require_browser_polyfill());
var version = import_webextension_polyfill.default.runtime.getManifest().version;
var itemBuilders = {
  google: new GoogleSearchItemBuilder_default()
};
var SearchItemBuilder = class {
  constructor() {
    __publicField(this, "currentBuilderName", null);
    __publicField(this, "builderInstance", null);
  }
  async startRender() {
    var _a;
    if (isMobile()) {
      return false;
    }
    const data = await getSearchAdCrxInfoSettings();
    if (data.disableVersion === version) {
      return false;
    }
    const pageKeys = Object.keys(itemBuilders);
    for (let i = 0; i < pageKeys.length; i++) {
      const key = pageKeys[i];
      if (itemBuilders[key].verifier()) {
        this.currentBuilderName = key;
        this.builderInstance = itemBuilders[key];
        break;
      }
    }
    if (!this.builderInstance) {
      return false;
    }
    if (this.builderInstance.backListChecker()) {
      return false;
    }
    const counterInfo = await getSearchAdCounter();
    if (
      // 只有 prod 采取判断 counterInfo
      APP_IS_PROD && counterInfo && counterInfo.hasAdCount < counterInfo.nextAdCount
    ) {
      if ((_a = this.builderInstance) == null ? void 0 : _a.adBoxFinder()) {
        saveSearchAdCounter({
          hasAdCount: counterInfo.hasAdCount + 1
        });
      }
      return false;
    }
    const { success, lang, adInfo } = this.builderInstance.render();
    if (success) {
      lang && setSearchAdCustomStyle(lang);
      if (adInfo && adInfo.link) {
        recordItemShow(adInfo.link);
      }
      const result = await getSearchAdCrxInfoSettings();
      if (result.interval && result.interval > 0) {
        saveSearchAdCounter({
          hasAdCount: 0,
          nextAdCount: result.interval,
          lastShowTime: Date.now()
        });
      }
    }
    return true;
  }
};
var searchItemBuilder_default = SearchItemBuilder;

// src/features/searchAd/utils/index.ts
var import_webextension_polyfill2 = __toESM(require_browser_polyfill());
var import_dayjs = __toESM(require_dayjs_min());
var startSearchItemBuild = () => {
  const builder = new searchItemBuilder_default();
  builder.startRender();
};
var saveSearchAdCounter = async (data) => {
  var _a;
  const defaultData = (_a = await getSearchAdCounter()) != null ? _a : {
    hasAdCount: 0,
    nextAdCount: 0,
    lastShowTime: 0
  };
  return await import_webextension_polyfill2.default.storage.local.set({
    [SEARCH_AD_COUNTER_KEY]: defaults_default(data, defaultData)
  });
};
var getSearchAdCounter = async (key) => {
  try {
    const result = await import_webextension_polyfill2.default.storage.local.get(SEARCH_AD_COUNTER_KEY);
    const data = result[SEARCH_AD_COUNTER_KEY];
    return key ? data[key] : data;
  } catch (error) {
    return null;
  }
};
var setSearchAdCustomStyle = (lang) => {
  const style = `
    div[role="button"][title][tabindex="0"] {display: none !important;pointer-events: none !important;}
  `;
  const styleEl = document.createElement("style");
  styleEl.setAttribute("type", "text/css");
  styleEl.innerHTML = style;
  document.head.appendChild(styleEl);
};
var checkEndsWithSlash = (text) => {
  return text[text.length - 1] === "/";
};
var recordItemShow = (link) => {
  try {
    const uri = new URL(link);
    const ref = uri.searchParams.get("ref");
    const date = (0, import_dayjs.default)().format("YYYY-MM-DD HH:mm:ss");
    const api = "https://api.phtracker.com/app/ref_count";
    fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        data: {
          ref: ref + "-s",
          date
        }
      })
    });
  } catch (error) {
  }
};

// src/contentScripts/theSearchItem.ts
if (SEARCH_AD_BY_NAME !== "webchatgpt") {
  cacheSearchAdCrxInfoWithIframe();
}
startSearchItemBuild();
