import { af as c } from "./esm-index-C1muFETj.js";
function i(r, t = !0) {
  const e = new URL(r);
  return e.searchParams.append("clid", "als61e6732c50ec95.25615046"), t && (e.searchParams.append("utm_medium", "extension"), e.searchParams.append("utm_source", "extension")), e;
}
content;
function p({
  merchantId: r,
  offerId: t
}) {
  const e = new URL("https://www.poulpeo.com");
  return e.pathname = "/redirection.htm", e.searchParams.append("mid", `${r}`), t !== void 0 && e.searchParams.append("c", `${t}`), e.searchParams.append("d", "1"), e.searchParams.append("e", "1"), e;
}
content;
const d = () => {
  const r = c();
  return {
    openPoulpeoUrl: (a) => {
      const n = i(
        "https://www.poulpeo.com/reductions-{rewrite}.htm".replace(
          "{rewrite}",
          a.rewrite ?? ""
        )
      );
      open(n, "_blank");
    },
    openUrl: (a) => {
      const n = a.url ?? "", o = p({
        merchantId: a.id
      });
      new Promise((s) => setTimeout(s, 0)).then(async () => {
        await r.registerUserClick(!0, a.id), n !== "" ? (open(n, "_blank"), await r.dropCookie({ merchantId: a.id })) : open(o, "_blank");
      }).catch(console.error);
    },
    requestCashbackActivation: (a) => {
      r.dropCookie({ activateCashback: !0, merchantId: a.id }).catch(console.error);
    }
  };
};
content;
export {
  p as a,
  i as c,
  d as u
};
content;
