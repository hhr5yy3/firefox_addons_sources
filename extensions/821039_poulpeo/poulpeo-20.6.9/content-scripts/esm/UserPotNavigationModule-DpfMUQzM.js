import { a as e } from "./useMerchantActions-DQd7fZJe.js";
import { R as i } from "./SidebarManager-CoX2oc26.js";
import { a9 as t } from "./esm-index-C1muFETj.js";
const s = {
  setup() {
    return () => t(i, {
      title: "Créer ma cagnotte",
      description: "Vous aussi, faites l’essai ! Profitez de l’offre de bienvenue +3€ offerts.",
      linkLabel: "Connexion / inscription",
      onLinkClick: () => {
        e().requestAuthModalDisplay({
          initialMode: "register"
        });
      }
    });
  }
};
content;
export {
  s as UserPotNavigationModule
};
content;
