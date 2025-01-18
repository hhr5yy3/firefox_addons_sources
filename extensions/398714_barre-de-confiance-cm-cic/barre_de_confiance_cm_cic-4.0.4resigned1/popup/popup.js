/******************************************************************************************
 *	              					POPUP				  	
 *
 *  UTILISATION: script lancé lors d'un clic sur l'îcone de la barre de confiance
 *  
 *  Contient 
 *  	la gestion de l'UI de la popup en fonction du domaine du site visité
 *  	la fonction pour affichée la page d'aide
 *  
 *****************************************************************************************/
const BGPAGE = browser.extension.getBackgroundPage();
const STATUS_ALERTE = BGPAGE.STATUS_ALERTE;
const STATUS_CONFIANCE = BGPAGE.STATUS_CONFIANCE;
const TXT_POPUPTITLE = "Popup Barre De Confiance";
const TXT_AIDE = "Aide";
const TXT_ATTENTION = "ATTENTION !";
const TXT_TENTATIVE_PHISHING = "Tentative de phishing suspect\u00e9e";
const FICHIER_AIDE = "BarreConfCMCIC.pdf";

/**
 * Ecoute de l'evenement DOMContentLoaded sur le popup
 */
document.addEventListener('DOMContentLoaded', function ()
{
    //on met le titre de la popup
    document.head.title = TXT_POPUPTITLE;

    //on ecrit le lien vers la page d'Aide
    var eAide = document.getElementById("bcAide");
    eAide.innerHTML = Sanitizer.escapeHTML`${TXT_AIDE}`;
    eAide.addEventListener('click', AfficheAide);

    //on recupere les infos dans la page de background
    var infosPopup = BGPAGE.infosPopup;
    if (infosPopup == undefined)
        return;

    var strHTML = "";
    var eTabInfosSiteEtLiens = document.getElementById("bcTableInfosSiteEtLiens");
    var eMsg = document.getElementById("bcMsg");
    var eDomaine = document.getElementById("bcDomaine");
    if (eMsg == undefined || eDomaine == undefined)
        return;
    switch (infosPopup.status) {
        case STATUS_CONFIANCE:
            eTabInfosSiteEtLiens.className = "bcConfiance";
            eDomaine.innerHTML = Sanitizer.escapeHTML`${infosPopup.domaine}`;
            break;
        case STATUS_ALERTE:
            eTabInfosSiteEtLiens.className = "bcAlerte";
            eMsg.innerHTML = Sanitizer.escapeHTML`${TXT_TENTATIVE_PHISHING}`;
            eDomaine.innerHTML = Sanitizer.escapeHTML`${TXT_ATTENTION}`;
            break;
        default:
            eTabInfosSiteEtLiens.className = "bcNormal";
            eDomaine.innerHTML = Sanitizer.escapeHTML`${infosPopup.domaine}`;
            break;
    }

    //on rajoute le logo
    var icone = infosPopup.icone;
    if (icone != undefined) {
        var eIcones = document.getElementsByClassName("bcLogo");
        var iNbIcones = 0;

        if (eIcones != undefined && (iNbIcones = eIcones.length) > 0) {
            for (var i = 0; i < iNbIcones ; i++) {
                var eCourant = eIcones[i];
                var eImage = document.createElement("img");
                eImage.src = "../" + icone;
                eImage.width = "20";
                eImage.height = "20";
                eCourant.appendChild(eImage);
            }
        }

    }
});

/**
* Affiche une page d'aide sur la barre de confiance
*/
function AfficheAide()
{
    open(browser.extension.getURL(FICHIER_AIDE));
}
