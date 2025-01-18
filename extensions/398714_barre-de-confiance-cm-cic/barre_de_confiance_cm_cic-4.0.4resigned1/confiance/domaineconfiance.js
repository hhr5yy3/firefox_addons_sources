/************************************************************************
 *	                    DOMAINE DE CONFIANCE							  	
 *
 *  UTILISATION: script présent dans la page de background de l'extension
 *  
 *  Contient les fonctions pour:
 *  	lire le fichiers de domaines de confiance
 *  	decrypter les urls
 *  
 *  PREREQUIS: Doit être lancé avant background.js
 ************************************************************************/

const DC_CLE_CRYPTE = "kUs@yR";
//fichier de stockage des domaines de confiance
const DOMAINES_CONFIANCE_FICHIER = browser.extension.getURL("confiance/domfic.dat");
// type de domaine
const DOMAINE_CM = 0;
const DOMAINE_CMCIC = 1;
const DOMAINE_CIC = 2;
const DOMAINE_INTERNET = 3;
const DOMAINE_FICHIERLOCAL = 4;
const DOMAINE_ALERTE = 5;
const DOMAINE_CONFIG = 6;
const DOMAINES_CONFIANCE = [DOMAINE_CM, DOMAINE_CMCIC, DOMAINE_CIC];
// tableaux pour stocker les domaines de confiances
var tIdxDebutDomaine = new Array(0, 0, 0);
var tIdxFinDomaine = new Array(0, 0, 0);
var tDomaines = null;

/**
*	Decrypte un domaine de confiance a l'aide de la cle
*/
function DecrypteDC(sTexte, sCle)
{
    var sResultat = "";
    var iLgTexte = sTexte.length;
    var iLgCle = sCle.length;
    sCle = sCle.toUpperCase();
    var j = 0;
    for (var i = 0; i < iLgTexte ; i++) {
        sResultat = sResultat + String.fromCharCode(sTexte.charCodeAt(i) - (sCle.charCodeAt(j) - 65));
        if (j == iLgCle - 1) {
            j = 0;
        }
        else {
            j++;
        }
    }
    return sResultat.toLowerCase();
}

/**
* Recupere le fichier contenant la liste cryptee des domaines de confiance 
**/
function GetDomainedeConfiance(sUrlFichier)
{
    // resultat
    var sTxtDomaineConfiance = "";

    var xhr_object = null;
    if (window.XMLHttpRequest)
        xhr_object = new XMLHttpRequest();
    else { // XMLHttpRequest non supporte par le navigateur 
        return "";
    }

    // Requete HTTP
    xhr_object.open("GET", sUrlFichier);
    xhr_object.responseType = "text";
    xhr_object.onreadystatechange = function ()
    {
        if (xhr_object.readyState == 4 && (xhr_object.status == 200 || xhr_object.status == 0)) {
            // tout s'est bien passe on recupere la reponse
            sTxtDomaineConfiance = xhr_object.responseText;
            parseFicherConfiance(sTxtDomaineConfiance);
        }
    }
    xhr_object.send(null);
}

/**
* Recupere les domaines de confiances depuis un fichier
* Stocke les urls dans des tableaux
*/
function ChargeDomainesConfiance(sUrlFichier)
{
    // Initialisation des index de debut et de fin des domaines de confiance
    var iNbDomaineConfiance = DOMAINES_CONFIANCE.length;
    for (var i = 0; i < iNbDomaineConfiance ; i++) {
        var iDomaineConfiance = DOMAINES_CONFIANCE[i];
        tIdxDebutDomaine[iDomaineConfiance] = 0;
        tIdxFinDomaine[iDomaineConfiance] = 0;
    }

    //Recupere ce que contient le fichier
    GetDomainedeConfiance(sUrlFichier);
}

/**
 * Parse le fichier contenant les domaines de confiances
 */
function parseFicherConfiance(sTxtDomaines)
{
    // On supprime les blancs en fin de ligne
    sTxtDomaines = sTxtDomaines.replace(/\s+$/, '');

    // On decoupe les noms de domaines a partir des sauts de ligne (stockage dans tableau de chaines)
    if (sTxtDomaines.length > 0) {
        tDomaines = sTxtDomaines.split(/[\r\n]+/);
        if (tDomaines && tDomaines.length > 0) {
            var sIdx = tDomaines.shift(); // on recupere la premiere ligne (qui contient les index) et on decale le tableau

            var tsIdx = sIdx.split("|");
            if (tsIdx && tsIdx.length == 2) {
                // Mise a jour des index de debut et de fin des domaines CM, CMCIC et CIC
                tIdxDebutDomaine[DOMAINE_CM] = 0;
                tIdxFinDomaine[DOMAINE_CM] = parseInt(tsIdx[0], 10);
                tIdxDebutDomaine[DOMAINE_CMCIC] = tIdxFinDomaine[DOMAINE_CM] + 1;
                tIdxFinDomaine[DOMAINE_CMCIC] = parseInt(tsIdx[1], 10);
                tIdxDebutDomaine[DOMAINE_CIC] = tIdxFinDomaine[DOMAINE_CMCIC] + 1;
                tIdxFinDomaine[DOMAINE_CIC] = tDomaines && tDomaines.length > 0 ? tDomaines.length - 1 : tIdxDebutDomaine[DOMAINE_CIC];
            }
            // On decrypte maintenant les domaines
            for (var i = 0; i < tDomaines.length; i++) {
                tDomaines[i] = DecrypteDC(tDomaines[i], DC_CLE_CRYPTE);
            }
        }
    }
}