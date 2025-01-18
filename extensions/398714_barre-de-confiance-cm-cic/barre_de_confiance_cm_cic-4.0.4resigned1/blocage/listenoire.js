/************************************************************************
 *	              LISTE NOIRE						  	
 *
 *  UTILISATION: script présent dans la page de background de l'extension
 *  
 *  Contient les fonctions pour:
 *  	récupérer la liste noire du serveur
 *  	décrypter un élément de la liste noire
 *  	tester si un domaine est sur liste noire
 *
 ***********************************************************************/

// Liste noire
const LN_URL = "https://barre-de-confiance.cm-cic.com/fr/blacklist.html";
const LN_SEPARATEUR = "|";
const LN_CODE_HTTP = "!";
const LN_CODE_HTTPS = "*";
const LN_CHAINE_CLAIRE = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/&?.-~=_";
const LN_CHAINE_MELANGEE = "f~7m60Fp.Kv&yr?_bsS9Ye82BuoNxqW/E=GkItinLMaOzRdjTUgJAlZ1PH4Qc5Vh3CX-wD";
var LN_DECRYPTEE;
var LN_QUERY_DECRYPTEE;
// tableau utilisé par webrequest pr bloquer les post vers des domaine de la liste noire
var LN_FILTRE;

/**
 * Récupère la liste noire de local storage ou du serveur
**/
function ChargeOuReChargeListeNoire()
{
    var strLNCryptee = "";
    if (EstTpsStockeTropVieux()) {
        GetListeNoireDuServeur();
    } else {
        strLNCryptee = GetListeNoireDeLocalStorage();
        setListeNoireClaire(strLNCryptee);
    }
}

/**
 * Dechiffre la liste et le stocke dans les variables globales utilisées par l'extension
 */
function setListeNoireClaire(strLNCryptee)
{
    var result = DecrypteListeNoire(strLNCryptee);
    if (result != undefined && result.length == 3) {
        LN_DECRYPTEE = result[0];
        LN_FILTRE = result[1];
        LN_QUERY_DECRYPTEE = result[2];
    }
}

/**
 * Decrypte la liste noire et formate le resultat pr être utilisé dans le blocage du post (webRequest)
 **/
function DecrypteListeNoire(strListeCryptee)
{
    var strListeDecryptee = strListeCryptee.split(LN_SEPARATEUR);
    var strFiltre = [];
    var strListeQuery = [];

    if (strListeDecryptee != undefined) {
        var iNbElements = strListeDecryptee.length;

        for (var i = 0; i < iNbElements ; i++) {
            var strUrlCryptee = strListeDecryptee[i];
            var strUrlDecryptee = DecrypteURLListeNoire(strUrlCryptee);
            var tabDomQuery = GetNomDeDomaineEtQuery(strUrlDecryptee);
            var strDomaine = tabDomQuery[0];
            var strQuery = tabDomQuery[1];

            strFiltre[i] = "*://" + strDomaine + "/*";
            strListeDecryptee[i] = strDomaine;
            strListeQuery[i] = strQuery;
        }
    }
    return [strListeDecryptee, strFiltre, strListeQuery];//, strFiltreCIC, strFiltreCM ]  ;
}

/**
 * Effetue une requete HTTP pour recuperer la deniere liste noire du serveur
 * Il s'agit d'une chaine caractere crypte
**/
function GetListeNoireDuServeur()
{
    var sListeNoire;

    var xhr_object = null;
    if (window.XMLHttpRequest)
        xhr_object = new XMLHttpRequest();
    else { // XMLHttpRequest non supporte par le navigateur 
        return sListeNoire;
    }

    // Requete HTTP
    xhr_object.open("GET", LN_URL, true);
    xhr_object.setRequestHeader("User-Agent", "BarreConfiance");
    xhr_object.onreadystatechange = function ()
    {
        if (xhr_object.readyState == 4 && (xhr_object.status == 200 || xhr_object.status == 0)) {
            // tout s'est bien passe on recupere la reponse
            sListeNoire = xhr_object.responseText;
            if (SaveListeNoireDsLocalStorage(sListeNoire))
                SaveTpsActuelDsLocalStorage();
            setListeNoireClaire(sListeNoire);
        }
    }
    xhr_object.send(null);
}

/**
 * Decrypte une URL de la liste noire
 * renvoie l'url decryptee (string)
 **/
function DecrypteURLListeNoire(sUrl)
{
    var sURLDecryptee = "";

    if (sUrl == undefined)
        return sURLDecryptee;

    var iUrlLength = sUrl.length;
    var iOffset = 0;

    if (iUrlLength == 0) {
        return sURLDecryptee;
    }

    //Decodage du protocole
    if (sUrl.charAt(0) == LN_CODE_HTTP) {
        sURLDecryptee = "http://";
        iOffset = 1;
    }
    else if (sUrl.charAt(0) == LN_CODE_HTTPS) {
        sURLDecryptee = "https://";
        iOffset = 1;
    }
    else
        iOffset = 0;

    //On parcours le reste des characteres
    for (j = iOffset ; j < iUrlLength ; j++) {
        var cCurrentChar = sUrl.charAt(j);

        var iPos = LN_CHAINE_MELANGEE.indexOf(cCurrentChar, 0);

        if (-1 != iPos) {
            // si le caractere se trouve dans la chaine melangee, 
            // on le remplace par le charactere a la meme position dans la chaine claire
            sURLDecryptee += LN_CHAINE_CLAIRE.charAt(iPos);
        }
        else {
            //sinon on garde le caractere trouvee
            sURLDecryptee += cCurrentChar;

        }
    }

    return sURLDecryptee;
}

/**
 * Test si un domaine est sur liste noire
 */
function EstSurListeNoire(strDomaine, strQuery)
{
    var bEstSurListeNoire = false;

    if (LN_DECRYPTEE != undefined && LN_QUERY_DECRYPTEE != undefined) {
        var idxDomaine = LN_DECRYPTEE.indexOf(strDomaine);
        if (idxDomaine != -1 && (LN_QUERY_DECRYPTEE[idxDomaine] == strQuery || LN_QUERY_DECRYPTEE[idxDomaine] == "")) {
            bEstSurListeNoire = true;
        }
    }
    return bEstSurListeNoire;
}