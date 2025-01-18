import "./index-3da6bb4f.js";
import { c as createAPI, b as browser, f as analytics, A as AffiliateData } from "./urlAccess-93f11c64.js";
const DELTA_TIME_VOUCHER_TRACKING = 30 * 60 * 1e3;
const voucherApi = createAPI({
  name: "Vouchers",
  endpoint: "/pepper/vouchers",
  read() {
    return Promise.resolve("");
  },
  default: () => "",
  methods: {
    create(body) {
      return this.fetch("", { method: "POST", body: JSON.stringify(body) }, this.sender).then((res) => {
        return res.json();
      }).then((res) => res.data);
    },
    async trackVoucher({ shopUrl, clickoutUrl }) {
      if (clickoutUrl) {
        browser.tabs.create({
          url: clickoutUrl,
          // <the url injecting the tracking cookie>
          index: 0,
          active: false,
          pinned: true
        }).then((e) => {
          const tabId = e.id;
          browser.tabs.onUpdated.addListener((updatedTabId, update) => {
            if ("complete" === update.status && updatedTabId === tabId) {
              browser.tabs.remove(tabId);
              analytics.voucherUnlocked({ shopUrl });
            }
          });
        });
        return;
      }
      const trakckingUrl = `https://chollometrocextension.digidip.net/visit?url=${encodeURI(
        shopUrl
      )}`;
      const urlPattern = /(?<protocol>https?:\/{2})(?:www\.)?((?<subDomain>\w+)\.(?<subDomainExtension>[a-z]+))?\.?(?<domain>\w+)\.(?<domainExtension>[a-z]+)\/(?<path>.+)?/;
      const urlShopMatch = shopUrl?.match(urlPattern);
      let affiliateData = await AffiliateData.get();
      if (urlShopMatch != null && urlShopMatch.groups != null) {
        const currentShop = affiliateData.find((elm) => {
          return elm.shopName === urlShopMatch.groups.domain;
        });
        if (currentShop != void 0) {
          if (currentShop.lastTimeTracked + DELTA_TIME_VOUCHER_TRACKING < Date.now()) {
            browser.tabs.create({
              url: trakckingUrl,
              // <the url injecting the tracking cookie>
              index: 0,
              active: false,
              pinned: true
            }).then((e) => {
              const tabId = e.id;
              browser.tabs.onUpdated.addListener((updatedTabId, update) => {
                if ("complete" === update.status && updatedTabId === tabId) {
                  browser.tabs.remove(tabId);
                  analytics.voucherUnlocked({ shopUrl });
                  affiliateData = affiliateData.map((elm) => {
                    if (elm.shopName === urlShopMatch?.groups.domain) {
                      elm.lastTimeTracked = Date.now();
                    }
                    return elm;
                  });
                  AffiliateData.set(affiliateData);
                }
              });
            });
          }
        } else {
          browser.tabs.create({
            url: trakckingUrl,
            // <the url injecting the tracking cookie>
            index: 0,
            active: false,
            pinned: true
          }).then((e) => {
            const tabId = e.id;
            browser.tabs.onUpdated.addListener((updatedTabId, update) => {
              if ("complete" === update.status && updatedTabId === tabId) {
                browser.tabs.remove(tabId);
                analytics.voucherUnlocked({ shopUrl });
                affiliateData.push({
                  shopName: urlShopMatch?.groups.domain,
                  lastTimeTracked: Date.now()
                });
                AffiliateData.set(affiliateData).then((data) => {
                });
              }
            });
          });
        }
      } else {
        throw new Error("Pattern url matching null value error");
      }
    }
  }
});
const __vite_glob_0_11 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: voucherApi
}, Symbol.toStringTag, { value: "Module" }));
export {
  __vite_glob_0_11 as _,
  voucherApi as v
};
