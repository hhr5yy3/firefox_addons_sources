/**
 * @param {HTMLElement} tab
 */
function activateTab(tabId) {
  const tab = document.querySelector(`.tab[data-tab="${tabId}"]`);
  const tabContent = document.querySelector(`[data-tab-content="${tabId}"]`);

  if (!tabContent) return;

  const tabs = document.querySelectorAll("[data-tab]");
  tabs.forEach((tab) => tab.classList.remove("active"));

  const tabContents = document.querySelectorAll("[data-tab-content]");
  tabContents.forEach((tabContent) => tabContent.classList.remove("active"));

  tab?.classList.add("active");
  tabContent.classList.add("active");

  const event = tab?.getAttribute("data-dispatch-event");
  if (event) {
    document.dispatchEvent(new CustomEvent(event));
  }
}

function bindLinks() {
  /** @type {HTMLElement[]} */
  const tabs = document.querySelectorAll("[data-tab]");

  tabs.forEach(
    (tab) =>
      (tab.onclick = () => {
        if (tab.hasAttribute("data-disabled")) return;
        activateTab(tab.getAttribute("data-tab"));
      })
  );
}

document.addEventListener("ReBindDataTabLinks", () => bindLinks());

document.addEventListener("DOMContentLoaded", () => {
  updateCheck();
  bindLinks();

  print(
    "rate-us-link",
    typeof browser !== "undefined"
      ? `<a href="https://addons.mozilla.org/ru/firefox/addon/siteanalyzer-seo-tools/" target="_blank"><span data-translation="rateUs">${translate(
          "rateUs"
        )}</span></a>`
      : `<a href="https://chromewebstore.google.com/detail/siteanalyzer-seo-tools-fr/lefbdkondfcnlfplglcnjjncgdficmhc" target="_blank"><span data-translation="rateUs">${translate(
          "rateUs"
        )}</span></a>`
  );
});

function printWebsiteLink(link) {
  print(
    "website-link",
    `<a href=${link} target="_blank">SiteAnalyzer SEO Tools</a>`
  );
}

document.addEventListener("languageChanged", () => {
  const telegramLink = document.querySelector(".telegram-link");
  if (telegramLink) {
    api.storage.local.get("locale").then(({ locale }) => {
      switch (locale) {
        case "ru":
          telegramLink.href = "https://t.me/siteanalyzer";
          printWebsiteLink("https://site-analyzer.ru/soft/seo-extension/");
          break;
        default:
          telegramLink.href = "https://t.me/siteanalyzer_pro";
          printWebsiteLink("https://site-analyzer.pro/soft/seo-extension/");
          break;
      }
    });
  }
});

async function startBannersRotator() {
  const footer = document.querySelector("footer");
  if (footer) {
    const banners = [
      {
        service: "RateUs",
      },
      {
        service: "SiteAnalyzer",
        color: "#5ba308",
        icon: "logo-banner-site-analyzer.png",
        href: "attribute",
        hrefRu: "https://site-analyzer.ru/",
        hrefEn: "https://site-analyzer.pro/",
        desc: "attribute",
        descRu: "Программа для технического аудита сайтов",
        descEn: "Website SEO Crawler for technical audit of the websites",
      },
      {
        service: "SEOFAQT",
        color: "#4673d3",
        icon: "logo-banner-seofaqt.png",
        href: "https://t.me/seofaqt/",
        desc: "Новостной агрегатор Telegram-каналов по SEO и маркетингу",
      },
      // {
      //   service: "SERPRiver",
      //   color: "rgb(128 185 14)",
      //   icon: "logo-banner-serpriver.png",
      //   href: "attribute",
      //   hrefRu: "https://serpriver.ru/",
      //   hrefEn: "https://serpriver.com/",
      //   desc: "attribute",
      //   descRu: "Выдача Яндекс, Google & Bing в формате JSON и XML",
      //   descEn: "Google, Bing & Yandex Search API Services in JSON format",
      // },
      // {
      //   service: "Majento",
      //   color: "#1b5088",
      //   icon: "logo-banner-majento.png",
      //   href: "https://majento.ru/index.php?page=seo-analize",
      //   desc: "80+ инструментов для проведения SEO-аудита и анализа сайта",
      // },
      {
        service:
          "<span style='color: #f00; text-decoration: none;'>В</span>ордстат <span style='color: #f00; text-decoration: none;'>E</span>xtension",
        color: "#ffdb4d",
        textColor: "#000",
        icon: "logo-banner-wordstat.png",
        href: "https://site-analyzer.ru/soft/seo-extension-wordstat/",
        desc: "Браузерное расширение для сбора семантики в <span style='color: #f00; text-decoration: none;'>Я</span>ндекс <span style='color: #f00; text-decoration: none;'>В</span>ордстат",
      },
      /*{
        service:
          "<div style='color: white;background: black;text-decoration: none;position: absolute;width: 33%;left: 0;top: 0;display: flex;justify-content: center;align-items: center;height: 100%;/!* background:  black; *!/'>SiteAnalyzer</div>",
        color: "rgb(236 36 36)",
        href: "attribute",
        hrefRu: "https://site-analyzer.ru/prices/#promocode",
        hrefEn: "https://site-analyzer.pro/prices/#promocode",
        descElStyles:
          "background: rgb(236 36 36); position: absolute; width: calc(100% - 33%); right: 0; top: 0; display: flex; justify-content: center; align-items: center; height: 100%;",
        desc: "attribute",
        descRu:
          "НОВОГОДНИЕ СКИДКИ &nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp; 10% OFF!",
        descEn: "NEW YEAR SALE &nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp; 50% OFF!",
      },*/
    ];

    api.storage.local.get("locale").then(({ locale }) => {
      const arr = banners.filter((item) => {
        if (locale === "ru") {
          return true;
        } else {
          return item.service === "RateUs" || !!item?.hrefEn;
        }
      });
      const getRandom = () => {
        return arr[Math.floor(Math.random() * arr.length)];
      };

      const banner = getRandom();

      if (banner.service === "RateUs") return;

      const link = document.createElement("a");
      link.classList.add("footer");
      link.target = "_blank";
      link.href = banner.href === "attribute" ? "#" : banner.href;
      link.style = `position: relative; gap: 8px; justify-content: center; background-color: ${
        banner.color ?? "green"
      }; color: ${banner?.textColor || "#fff"}`;
      if (banner.href === "attribute") {
        link.setAttribute("data-locale-attribute", "href");
        if (banner.hrefRu) {
          link.setAttribute("data-locale-ru", banner.hrefRu);
        }
        if (banner.hrefEn) {
          link.setAttribute("data-locale-en", banner.hrefEn);
        }
      }

      const service = document.createElement("div");
      service.classList.add("copyright");
      const serviceIcon = document.createElement("img");
      serviceIcon.classList.add("footer__icon");
      serviceIcon.src = `./res/icons/${banner.icon}`;
      const serviceName = document.createElement("div");
      serviceName.innerHTML = banner.service;
      if (banner.icon) {
        service.append(serviceIcon);
      }
      service.append(serviceName);

      const divider = document.createElement("div");
      divider.classList.add("footer__divider");
      divider.innerText = "–";

      const desc = document.createElement("div");

      if (banner.descElStyles) {
        desc.setAttribute("style", banner.descElStyles);
      }

      desc.classList.add("footer__desc");
      if (banner.desc === "attribute") {
        desc.setAttribute("data-locale-content", "true");
        desc.setAttribute("data-locale-en", banner.descEn);
        desc.setAttribute("data-locale-ru", banner.descRu);
      } else {
        desc.innerHTML = banner.desc;
      }

      link.append(service, divider, desc);

      footer.innerHTML = "";
      footer.classList.remove("footer-rate-us");
      footer.append(link);
    });
  }
}

/**
 *
 * @param {HTMLElement} content
 */
function showModal(content, headerContent) {
  const overlay = document.querySelector(".overlay");

  const modalContent = overlay.querySelector(".modal-window__content");
  modalContent.innerHTML = "";
  if (content) modalContent.append(content);

  const header = document.querySelector(".modal-window__header");
  header.innerHTML = "";
  if (headerContent) header.append(headerContent);

  overlay.classList.add("overlay--shown");
}

function closeModal() {
  const overlay = document.querySelector(".overlay");
  overlay.classList.remove("overlay--shown");
}

document.addEventListener("DOMContentLoaded", () => {
  const modalCloseButton = document.querySelector(".modal-window__close");
  modalCloseButton.addEventListener("click", () => closeModal());

  const background = document.querySelector(".overlay__background");
  background.addEventListener("click", () => closeModal());
  startBannersRotator();
});

function updateCheck() {
  const manifestData = api.runtime.getManifest();
  const version = document.querySelector(".version");
  version.innerHTML = `v${manifestData.version}`;

  print("updated-version", manifestData.version);
  print("updated-version-link", manifestData.version);

  document.addEventListener("languageChanged", () => {
    /** @type {HTMLAnchorElement} */
    const updatedLink = document.querySelector("#link-to-changelog");

    if (!updatedLink) return;

    /** @type {HTMLAnchorElement} */
    const headerUpdatedLink = document.querySelector(
      ".link-to-updated-version"
    );

    api.storage.local.get("locale").then(({ locale }) => {
      let url;

      if (true) {
        switch (locale) {
          case "ru":
            url = "https://site-analyzer.ru/soft/seo-extension/#whatsnew";
            break;
          case "en":
            url = "https://site-analyzer.pro/soft/seo-extension/#whatsnew";
            break;
          default:
            url = "https://site-analyzer.pro/soft/seo-extension/#whatsnew";
            break;
        }
      } else {
        switch (locale) {
          case "ru":
            url = "https://site-analyzer.ru/articles/sitemap-clusterizer/";
            break;
          case "en":
            url = "https://site-analyzer.pro/articles/sitemap-clusterizer/";
            break;
          default:
            url = "https://site-analyzer.pro/articles/sitemap-clusterizer/";
            break;
        }
      }

      updatedLink.href = url;
      headerUpdatedLink.href = url;
    });
  });

  // api.storage.local.get("updated").then(({ updated }) => {
  //   if (!updated) return;

  //   const updateWindow = document.querySelector(".update-window");
  //   updateWindow.classList.add("update-window--shown");

  //   api.storage.local.set({
  //     updated: false,
  //   });

  //   setTimeout(() => {
  //     updateWindow.classList.remove("update-window--shown");
  //   }, 10000);
  // });
}
