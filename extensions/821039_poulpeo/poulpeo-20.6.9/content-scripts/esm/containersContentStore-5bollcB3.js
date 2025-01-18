import { am as C, af as c, an as r } from "./esm-index-C1muFETj.js";
const i = (e) => {
  const a = [];
  for (const t of e)
    t.type === "merchant" && t.merchant.extensionOffersStatus && a.push(t.merchant);
  return a;
}, o = (e) => {
  var t;
  const a = [];
  for (const n of e)
    n.type === "offer" && n.offer.giftCardCashback !== void 0 && ((t = n.merchant) == null ? void 0 : t.extensionOffersStatus) === !0 && a.push({
      ...n.merchant,
      offer: n.offer
    });
  return a;
}, b = C("containers", {
  state: () => ({
    liveCashbackIncreaseContainerMerchants: [],
    liveCashbackIncreaseContainerTechnicalName: "cashback_increase_live",
    liveGiftCardCashbackContainerMerchants: [],
    liveGiftCardCashbackContainerTechnicalName: "gift_card_cashback_live",
    // 'technical_name_17858'
    liveSuperCashbackContainerMerchants: [],
    liveSuperCashbackContainerTechnicalName: "super_cashback_live",
    popularGiftCardCashbackContainerMerchants: [],
    popularGiftCardCashbackContainerTechnicalName: "popular_gift_card_cashback",
    // 'technical_name_17865'
    upcomingSuperCashbackContainerMerchants: [],
    upcomingSuperCashbackContainerTechnicalName: "upcoming_super_cashback"
  }),
  actions: {
    async fetchLiveCashbackIncreaseContainer() {
      this.liveCashbackIncreaseContainerMerchants = i(
        await c().getContainerContent(
          this.liveCashbackIncreaseContainerTechnicalName,
          24
        )
      ).map(r).filter((e) => {
        var a;
        return ((a = e.cashback) == null ? void 0 : a.hasIncrease) === !0;
      });
    },
    async fetchLiveGiftCardCashbackContainer() {
      this.liveGiftCardCashbackContainerMerchants = o(
        await c().getContainerContent(
          this.liveGiftCardCashbackContainerTechnicalName,
          100
        )
      ).map(r);
    },
    async fetchLiveSuperCashbackContainer() {
      this.liveSuperCashbackContainerMerchants = i(
        await c().getContainerContent(
          this.liveSuperCashbackContainerTechnicalName,
          20
        )
      ).map(r).filter((e) => {
        var a;
        return ((a = e.cashback) == null ? void 0 : a.isSuperCashback) === !0;
      });
    },
    async fetchPopularGiftCardCashbackContainer() {
      this.popularGiftCardCashbackContainerMerchants = o(
        await c().getContainerContent(
          this.popularGiftCardCashbackContainerTechnicalName,
          100
        )
      ).map(r);
    },
    async fetchUpcomingSuperCashbackContainer() {
      this.upcomingSuperCashbackContainerMerchants = i(
        await c().getContainerContent(
          this.upcomingSuperCashbackContainerTechnicalName,
          100
        )
      ).filter(
        (e) => {
          var a;
          return ((a = e.nextCashback) == null ? void 0 : a.dateStart) ?? 0 > Date.now();
        }
      ).sort((e, a) => {
        var s, h;
        const t = ((s = e.nextCashback) == null ? void 0 : s.dateStart) ?? 0, n = ((h = a.nextCashback) == null ? void 0 : h.dateStart) ?? 0;
        return t - n;
      }).slice(0, 6);
    }
  }
});
content;
export {
  b as u
};
content;
