import "./DollarPolyfills-DiqWGOUq.js";
import { s as setup } from "./i18n-CWi2JcO5.js";
var define_import_meta_env_default = { BASE_URL: "/dist/", MODE: "production", DEV: false, PROD: true, SSR: false };
document.getElementById("betaTestingCTA").addEventListener("click", () => {
  window.open("https://forum.kee.pm/t/beta-testing-the-kee-browser-extension/2022");
});
document.getElementById("betaTestingFeedbackCTA").addEventListener("click", () => {
  window.open("https://forum.kee.pm/");
});
document.getElementById("keeVaultCTA").addEventListener("click", () => {
  window.open("https://forum.kee.pm/kee-vault-launch");
});
const root = document.documentElement;
if (define_import_meta_env_default.VITE_KEE_CHANNEL) {
  console.log("beta 1");
  root.style.setProperty("--display-none-when-beta", "none");
} else {
  console.log("prod");
  root.style.setProperty("--display-none-when-not-beta", "none");
}
setup();
//# sourceMappingURL=updateNotes-C9vAs0Yh.js.map
