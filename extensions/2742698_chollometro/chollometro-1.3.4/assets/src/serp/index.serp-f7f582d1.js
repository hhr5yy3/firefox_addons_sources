/* empty css                    */import { l as logo$1 } from "../../PriceTrackNotifications.view-71344528.js";
import "../../index-3da6bb4f.js";
import { s as serpShopsData, d as collectMetrics, B as Browser } from "../../urlAccess-93f11c64.js";
import { m as metricSerpApi } from "../../metricsSerp.api-001fbd5b.js";
import { m as metricSerpCholloApi } from "../../metricsSerpChollo.api-f5a4c373.js";
import { i as insertViteBundledCss } from "../../App.view-01e97bc9.js";
import { a as settingsAPIHandler } from "../../metricsAlerts.api-6ae7940f.js";
import "../../index-3699c331.js";
import "../../Button-e5b90d65.js";
import "../../analytics.saga-1b7095bf.js";
import "../../voucher.api-2bbc894e.js";
import "../../chollo_logo_dark.datauri-4a67f6d4.js";
import "../../extension.api-b6898106.js";
const root = "_root_1wd0y_1";
const darkTheme = "_darkTheme_1wd0y_91";
const lightTheme = "_lightTheme_1wd0y_120";
const shopMatch = "_shopMatch_1wd0y_148";
const logo = "_logo_1wd0y_162";
const pepperData = "_pepperData_1wd0y_172";
const ofertas = "_ofertas_1wd0y_175";
const cupones = "_cupones_1wd0y_176";
const bullet = "_bullet_1wd0y_179";
const cholloShop = "_cholloShop_1wd0y_183";
const highLine = "_highLine_1wd0y_199";
const misco = "_misco_1wd0y_203";
const styles = {
  root,
  darkTheme,
  lightTheme,
  shopMatch,
  logo,
  pepperData,
  ofertas,
  cupones,
  bullet,
  cholloShop,
  highLine,
  misco
};
const serpLigth = "/assets/serp.white.inline-0dae8a07.svg";
const serpDark = "/assets/serp.black.inline-a20c5dab.svg";
metricSerpApi.connect();
metricSerpCholloApi.connect();
const googleInput = document.getElementById("APjFqb");
let userSearchValue = googleInput.value;
const cholloWidget = () => {
  const widget = document.createElement("div");
  widget.id = "cholloFind";
  widget.classList.add(styles.root, styles.darkTheme, styles.lightTheme, styles.cholloShop);
  const icon = window.matchMedia("(prefers-color-scheme: dark)").matches ? serpDark : serpLigth;
  const iconPath = Browser.runtime.getURL(icon);
  widget.innerHTML = `<img src="${iconPath}" />`;
  return widget;
};
const shopMatchWidget = ({
  offers,
  vouchers,
  merchandDomain
}) => {
  if (offers === 0 && vouchers === 0)
    return document.createElement("span");
  const widget = document.createElement("div");
  widget.addEventListener("click", () => {
    const sendInputButton = document.querySelector(
      'button[jsname="Tg7LZd"]'
    );
    if (userSearchValue.match(/\w+\schollometro\s\w+\.(es|com)/)) {
      userSearchValue = userSearchValue.replace(/(\w+\.(es|com)$)/, merchandDomain);
      metricSerpApi.methods.metricSerpShop({
        name: "ext-event-redirect-serp",
        data: {
          //  query: userSearchValue.replace(/\schollometro\s\w+\.(es|com)$/, ''),
          targetUrl: merchandDomain
        }
      });
      googleInput.value = userSearchValue;
    } else {
      metricSerpApi.methods.metricSerpShop({
        name: "ext-event-redirect-serp",
        data: {
          //  query: userSearchValue,
          targetUrl: merchandDomain
        }
      });
      googleInput.value = userSearchValue + " chollometro " + merchandDomain;
    }
    sendInputButton.click();
  });
  widget.id = "cholloSerp";
  widget.classList.add(styles.root, styles.darkTheme, styles.lightTheme, styles.shopMatch);
  const dataHtml = (data, label) => {
    const getDataByLabel = (label2) => {
      switch (label2) {
        case "ofertas":
          return offers;
        case "cupones":
          return vouchers;
      }
    };
    const getLabelByData = (quantity, label2) => {
      switch (label2) {
        case "cupones":
          return quantity > 1 ? "cupones" : "cupón";
        case "ofertas":
          return quantity > 1 ? "ofertas" : "oferta";
      }
    };
    return data > 0 ? `<span class="${styles[label]}">${getDataByLabel(label)} </span>${getLabelByData(
      data,
      label
    )}` : "";
  };
  const sepHtml = (ofertas2, cupones2) => ofertas2 > 0 && cupones2 > 0 ? `<span class="${styles.bullet}">&bull;</span>` : "";
  widget.innerHTML = `<span class="${styles.logo}"> <img src="${Browser.runtime.getURL(logo$1)}" /></span><div class="${styles.pepperData}"> ${dataHtml(vouchers, "cupones")}
    ${sepHtml(offers, vouchers)}
    ${dataHtml(offers, "ofertas")}
    </div>`;
  return widget;
};
const { shops } = await serpShopsData.get();
const noNullShops = shops.filter((elm) => elm.merchantDomain !== null && elm.merchantDomain !== "");
function insertWidget(where, isScroll) {
  const domWhere = document.querySelectorAll(where);
  const CHOLLOHOST = "chollometro.com";
  domWhere.forEach((elm, index) => {
    const urlShopInfo = elm.querySelector('cite[role="text"]');
    const domStr = urlShopInfo?.textContent;
    if (domStr?.includes(CHOLLOHOST) && !elm.parentElement.querySelector("#cholloFind")) {
      elm.insertAdjacentElement("afterbegin", cholloWidget());
      const highLightElement = urlShopInfo?.parentElement?.parentElement;
      highLightElement?.classList.add(styles.root, styles.highLine);
      if (userSearchValue.match(/\w+\schollometro\s\w+\.(es|com)/)) {
        const goTocholloMetricElement = highLightElement?.parentElement?.parentElement?.parentElement;
        goTocholloMetricElement.addEventListener(
          "click",
          async function(e) {
            e.preventDefault();
            const metricData = await collectMetrics();
            const targetElm = this;
            await metricSerpCholloApi.methods.metricSerpToChollo({
              name: "ext-event-redirect-serp-chollometro",
              data: {
                username: metricData?.username,
                platform: metricData?.platform,
                order: isScroll ? domWhere.length + index : index + 1,
                version: metricData?.version,
                targetUrl: targetElm.href
              }
            });
            location.href = targetElm.href;
          },
          true
        );
      }
      return;
    }
    const shopMatch2 = noNullShops.find((elm2) => {
      return domStr?.includes(elm2.merchantDomain);
    });
    if (!!shopMatch2 && !elm.parentElement.querySelector("#cholloSerp")) {
      elm.insertAdjacentElement(
        "beforebegin",
        shopMatchWidget({
          vouchers: shopMatch2.stats.vouchersCount,
          offers: shopMatch2.stats.offersCount,
          merchandDomain: shopMatch2.merchantDomain
        })
      );
    }
  });
}
activateSerp();
async function activateSerp() {
  const { SERPConf } = await settingsAPIHandler.read();
  if (SERPConf === "activate") {
    insertViteBundledCss(document.body, ["assets/index.serp-8ee11ddd.css","assets/index-1e4bf09d.css","assets/PriceTrackNotifications-5036257e.css","assets/Button-cc42555c.css","assets/App-defde59e.css"], true);
    insertWidget('div[jscontroller="SC7lYd"]');
    scrollSerpInjection();
  }
}
function scrollSerpInjection() {
  const googleBottomStuff = '#botstuff div[jscontroller="SC7lYd"]';
  const initialPageHeight = document.documentElement.scrollHeight;
  document.addEventListener("scrollend", () => {
    if (document.documentElement.scrollHeight > initialPageHeight) {
      insertWidget(googleBottomStuff, true);
    }
  });
}
