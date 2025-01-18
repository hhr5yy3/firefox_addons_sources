/*******************************************************************************************
 *                  MAIN BACKGROUND SCRIPT                      
 *
 *  UTILISATION: script présent dans la page de background de l'extension
 *  
 *  Contient les fonctions pour:
 *      Modifier l'icone de la barre de confiance
 *      Déterminer le type de domaine visitée
 *      Bloquer l'envoie de requêtes HTTP vers des sites sur liste noire
 *  
 ******************************************************************************************/

// statut barre de confiance
var STATUS_NORMAL = 0;
var STATUS_CONFIANCE = 1;
var STATUS_ALERTE = 2;
var STATUS_CONFIG = 3;
var STATUS_ENCOURS = 4;
// icone barre de confiance
const CHEMIN_ICONES = "images/";
const ICONE_INTERNET = CHEMIN_ICONES + "bc_inet.gif";
const ICONE_CM = CHEMIN_ICONES + "bc_cm.gif";
const ICONE_CIC = CHEMIN_ICONES + "bc_cic.gif";
const ICONE_CMCIC = CHEMIN_ICONES + "bc_cmcic.gif";
const ICONE_ALERTE = CHEMIN_ICONES + "bc_alerte.gif";
const ICONE_ENCOURS = CHEMIN_ICONES + "bc_encours.gif";
// Utilisé par les methodes GetTypeDomaine et GetNomDeDomaine
const TXT_URLFILE = "file";
const TXT_URLABOUT = "about";
const TXT_EXTENSIONS = "moz-extension"
const TXT_CHROME = "chrome";
const TXT_DOMAINE_LOCAL = "Fichier local";
const TXT_DOMAINE_CONFIG = "Fichier Firefox";
const TXT_DOMAINEENCOURS = "En cours de chargement ...";
//information fourni à la popup;
var infosPopup;

/**
 * Renvoie le nom de domaine de l'url passé en parametre
**/
function GetNomDeDomaineEtQuery(sURL)
{
    /* Test si fichier local */
    if (sURL == undefined) {
        return [TXT_DOMAINE_CONFIG, ""];
    }

    /* on regarde ce qu'il y avant les 2 slashs */
    var iIdxSlashSlash = sURL.indexOf("://");
    var strDebut = sURL.substring(0, iIdxSlashSlash);

    if (sURL.indexOf(TXT_URLFILE) == 0 || sURL.indexOf(TXT_EXTENSIONS) == 0)
        return [TXT_DOMAINE_LOCAL, ""];
    else if (sURL.indexOf(TXT_CHROME) == 0 || sURL.indexOf(TXT_URLABOUT) == 0) {
        return [TXT_DOMAINE_CONFIG, ""];
    }

    /* on prend tout ce qui est après les 2 slashs ... */
    var iIdxDebut = (iIdxSlashSlash == -1) ? 0 : iIdxSlashSlash + 3;
    var strNomDeDomaine = sURL.substring(iIdxDebut, sURL.length);

    /* s'il y a un @ on ne prend que ce qui est après */
    var iIdxAt = strNomDeDomaine.indexOf("@");
    if (iIdxSlashSlash != -1)
        strNomDeDomaine = strNomDeDomaine.substring(iIdxAt + 1, strNomDeDomaine.length);

    /* ... tout ce qui est avant le 1er slash suivant */
    var iIdxSlash = strNomDeDomaine.indexOf("/");
    var iIdxFin = (iIdxSlash == -1) ? strNomDeDomaine.length : iIdxSlash;

    /* Correspond à ce qui se trouve apres le nom de domaine */
    var strQuery = strNomDeDomaine.substring(iIdxFin, strNomDeDomaine.length);
    if (iIdxSlash != -1) {
        strQuery = strQuery.substring(1, strQuery.length);
    }

    strNomDeDomaine = strNomDeDomaine.substring(0, iIdxFin);

    /* ... si le nom de domaine finit par un point on l'enlève */
    var iIdxDernierChar = strNomDeDomaine.length - 1;
    if ('.' == strNomDeDomaine.charAt(iIdxDernierChar)) {
        strNomDeDomaine = strNomDeDomaine.substring(0, iIdxDernierChar);
    }

    return [strNomDeDomaine, strQuery];
}

/**
 * Indique si sDomaine est une "extension" de sSousDomaine.
 * Ex : www.creditmutuel.fr est une "extension" de creditmutuel.fr
 * Pour simplifier, on peut dire que la fonction renvoie vrai si sDomaine finit par sSousDomaine.
**/
function EstSurDomaine(sDomaine, sSousDomaine)
{
    var idx = sDomaine.indexOf("." + sSousDomaine);
    return (idx >= 0 && idx == sDomaine.length - sSousDomaine.length - 1);
}

/**
 * Renvoie le type d'url
**/

function GetTypeURL(infosBarreDeConfiance)
{
    var url = infosBarreDeConfiance.url;
    var tabDomQuery = GetNomDeDomaineEtQuery(url);
    var strNomDeDomaine = tabDomQuery[0];
    var strQuery = tabDomQuery[1];
    infosBarreDeConfiance.domaine = strNomDeDomaine;

    // 1 - On teste s'il s'agit d'un fichier local
    if ("" == strNomDeDomaine || TXT_DOMAINE_CONFIG == strNomDeDomaine)
        return DOMAINE_CONFIG;
    else {

        if (TXT_DOMAINE_LOCAL == strNomDeDomaine) {
            return DOMAINE_FICHIERLOCAL;
        }

        var iTypeUrl = DOMAINE_INTERNET;
        var bEstDomaineConfiance = false;

        // 2 - On teste s'il s'agit d'un domaine de confiance
        if (tDomaines && tDomaines.length > 0) {
            var iNbDomaineConfiance = DOMAINES_CONFIANCE.length;
            for (var j = 0; j < iNbDomaineConfiance; j++) {
                var iDomaineConfiance = DOMAINES_CONFIANCE[j];
                for (var i = tIdxDebutDomaine[iDomaineConfiance]; i <= tIdxFinDomaine[iDomaineConfiance]; i++) {
                    if (EstSurDomaine(strNomDeDomaine, tDomaines[i])) {
                        iTypeUrl = iDomaineConfiance;
                        bEstDomaineConfiance = true;
                        break;
                    }
                }
            }
        }

        ChargeOuReChargeListeNoire();

        // 3 - On teste s'il s'agit d'une url ou d'un domaine sur la liste noire
        //if ( !bEstDomaineConfiance  && EstSurListeNoire( infosBarreDeConfiance.url, infosBarreDeConfiance.domaine ) )
        if (!bEstDomaineConfiance && EstSurListeNoire(infosBarreDeConfiance.domaine, strQuery))

            iTypeUrl = DOMAINE_ALERTE;

        return iTypeUrl;
    }
}


/**
    Verifie si l'url courante:
        - fait partie d'un des domaines de confiances
        - est sur la liste noire
**/
function AnalyseURLcourante(infosBarreDeConfiance)
{
    removeWebRequest();
    var iTypeURL = GetTypeURL(infosBarreDeConfiance);
    switch (iTypeURL) {
        case DOMAINE_CM: infosBarreDeConfiance.icone = ICONE_CM;
            infosBarreDeConfiance.status = STATUS_CONFIANCE;
            break;
        case DOMAINE_CIC: infosBarreDeConfiance.icone = ICONE_CIC;
            infosBarreDeConfiance.status = STATUS_CONFIANCE;
            break;
        case DOMAINE_CMCIC: infosBarreDeConfiance.icone = ICONE_CMCIC;
            infosBarreDeConfiance.status = STATUS_CONFIANCE;
            break;
        case DOMAINE_ALERTE: infosBarreDeConfiance.icone = ICONE_ALERTE;
            infosBarreDeConfiance.status = STATUS_ALERTE;
            break;
        case DOMAINE_CONFIG: infosBarreDeConfiance.icone = ICONE_INTERNET;
            infosBarreDeConfiance.status = STATUS_CONFIG;
            infosBarreDeConfiance.domaine = TXT_DOMAINE_CONFIG;
            break;
        case DOMAINE_FICHIERLOCAL: infosBarreDeConfiance.icone = ICONE_INTERNET;
            infosBarreDeConfiance.status = STATUS_NORMAL;
            CreateWebRequest();
            break;
        default: infosBarreDeConfiance.icone = ICONE_INTERNET;
            infosBarreDeConfiance.status = STATUS_NORMAL;
            break;
    }
}

/**
 * Ajoute un cookie avec des infos sur le browser et la barre de confiance
 */
const NOM_COOKIE_CONFIANCE = "Barre de confiance";
function AjouteCookie(infosBarreDeConfiance)
{
    // version de la barre de confiance
    var strVersionBarreDeConfiance = browser.runtime.getManifest().version;

    // version de mozilla firefox
    var strUserAgent = navigator.userAgent.toLowerCase();
    var strFirefox = "Firefox/".toLowerCase();
    var idxFirefox = strUserAgent.indexOf(strFirefox);
    var idxEndFirefox = strUserAgent.indexOf(" ", idxFirefox);
    if (idxEndFirefox == -1) {
        idxEndFirefox = strUserAgent.length;
    }
    var strVersion = strUserAgent.substring(idxFirefox + strFirefox.length, idxEndFirefox);

    //valeur du cookie
    // version barre de confiance | Mozilla Firefox | version Mozilla Firefox
    var strCookieValue = strVersionBarreDeConfiance + " | Mozilla Firefox | " + strVersion;

    // date d'expiration du cookie
    var maintenant = new Date();
    var dateExpiration = new Date();
    dateExpiration.setTime(maintenant.getTime() + (365 * 24 * 3600 * 1000));

    // creation du cookie
    var setCookie = browser.cookies.set({
        name: NOM_COOKIE_CONFIANCE,
        domain: infosBarreDeConfiance.domain,
        url: infosBarreDeConfiance.url,
        path: "/",
        value: strCookieValue,
        expirationDate: dateExpiration.getTime() / 1000
    });

}

/**
  Affiche toutes les informations de la barre de confiance
**/
function AfficheInfosBarreDeConfiance(tab)
{
    var infosBarreDeConfiance;

    if (tab != undefined)
        infosBarreDeConfiance = {
            status: STATUS_NORMAL,
            icone: ICONE_INTERNET,
            url: tab.url,
            domaine: "",
            tabId: tab.id
        };

    else
        infosBarreDeConfiance = {
            status: STATUS_NORMAL,
            icone: ICONE_INTERNET,
            url: "",
            domaine: "",
            tabId: -1
        };

    AnalyseURLcourante(infosBarreDeConfiance);
    MiseAJourInfosBarreDeConfiance(infosBarreDeConfiance);
    if (infosBarreDeConfiance.status != STATUS_ALERTE && infosBarreDeConfiance.status != STATUS_CONFIG) {    				
            browser.tabs.executeScript(infosBarreDeConfiance.tabId, { runAt: "document_end", file: "blocage/form.js" });
    }

    return infosBarreDeConfiance;
}

/**
 * Mets à jour l'UI de la barre de confiance:
 *   - l'icone
 *   - ajoute une page de blocage si nécessaire
 **/
function MiseAJourInfosBarreDeConfiance(infosBarreDeConfiance)
{
    infosPopup = infosBarreDeConfiance;
    if (infosBarreDeConfiance == undefined || infosBarreDeConfiance.tabId == undefined || infosBarreDeConfiance.icone == undefined) {
        browser.browserAction.setIcon({ path: ICONE_INTERNET });
    }
    else {
        browser.browserAction.setIcon({ tabId: infosBarreDeConfiance.tabId, path: infosBarreDeConfiance.icone });
        if (infosBarreDeConfiance.status == STATUS_ALERTE) {
            browser.tabs.executeScript(infosBarreDeConfiance.tabId, { runAt: "document_end",  file: "sanitizer/sanitizer.js" });
            browser.tabs.executeScript(infosBarreDeConfiance.tabId, { runAt: "document_end",  file: "blocage/ajoutblocage.js" });
        }
    }
}

/**
 * Appele la mise a jour d'une page
 **/
function PageMiseAJour(tabId, changeInfo, tab)
{
    if (changeInfo.status == 'complete') {
        var infosBarreDeConfiance = AfficheInfosBarreDeConfiance(tab);

        // Ajout du script pour la gestion des stats sur les sites de confiance
        if (infosBarreDeConfiance.status == STATUS_CONFIANCE) {
            AjouteCookie(infosBarreDeConfiance);
        }
    } else if (changeInfo.status == 'loading') {
        AfficheVide(tab);
    }
}

/**
 * Fonction lancé quand la tab active change
 */
function ChangeTabActive(activeInfo)
{
    browser.tabs.get(activeInfo.tabId)
        .then(function (tab) { AfficheInfosBarreDeConfiance(tab); }, onError);
}

/**
 * Vide la zone d'affichage du nom de domaine
 **/
function AfficheVide(tab)
{
    browser.browserAction.setIcon({ tabId: tab.id, path: ICONE_ENCOURS });
    infosPopup = {
        status: STATUS_ENCOURS,
        icone: ICONE_ENCOURS,
        domaine: TXT_DOMAINEENCOURS
    };
}

/** 
 * Fonction d'erreur appelée si les appels asynchrones echouent (tabs.get, tabs.query, etc.)
 **/
function onError(error)
{
    console.log(error);
}

/**
* Lancée au chargement de l'extension
**/
function Init()
{
    browser.tabs.query({ currentWindow: true, active: true })
        .then(function (tab)
        {
            AfficheInfosBarreDeConfiance(tab[0]);
        }, onError);
}

/**
* Cree un listener pr bloquer les post vers des domaines sur liste noire
*/
function CreateWebRequest()
{
    ChargeOuReChargeListeNoire();

    browser.webRequest.onBeforeRequest.addListener(
        blockedOnWebRequest
        , { urls: LN_FILTRE },
        ['blocking']);

}
/**
 * Définit l'url de redirection lors d'un blocage de post vers une url sur liste noire 
 */
function blockedOnWebRequest(details)
{
	  browser.tabs.executeScript(details.tabId, { runAt: "document_start", file: "sanitizer/sanitizer.js" });
    browser.tabs.executeScript(details.tabId, { runAt: "document_start", file: "blocage/ajoutblocage.js" });
}

/**
 * Efface le blocage de post vers une url sur liste noire
 */
function removeWebRequest()
{
    browser.webRequest.onBeforeRequest.removeListener(blockedOnWebRequest);
}

/** 
* Vérifie si l'un des formulaires de la page pointer vers une url de la liste noire
*/
function BloqueFormulairePhishing(message, sender)
{
    for (i = 0; i < message.formsUrl.length; i++) {
        let cUrl = message.formsUrl[i];
        domEtQuery = GetNomDeDomaineEtQuery(cUrl)
        if (EstSurListeNoire(domEtQuery[0], domEtQuery[1])) {
            var infosBarreDeConfiance = {
                status: STATUS_ALERTE,
                icone: ICONE_ALERTE,
                url: cUrl,
                domaine: domEtQuery[0],
                tabId: sender.tab.id
            }
            MiseAJourInfosBarreDeConfiance(infosBarreDeConfiance);
            break;
        }
    }
}

/**
* Code appele avec le fichier (à l'ajout/udpate de l'extension, lancement de Firefox)
**/
ChargeOuReChargeListeNoire();
ChargeDomainesConfiance(DOMAINES_CONFIANCE_FICHIER);
Init();

/** 
 * Ecoute des 3 evenements:
 *    Mis a jour d'une tab
 *    Changement de tab
 *    Reception d'un message (cf. form.js)
 */
browser.tabs.onUpdated.addListener(PageMiseAJour);
browser.tabs.onActivated.addListener(ChangeTabActive);
browser.runtime.onMessage.addListener(BloqueFormulairePhishing)