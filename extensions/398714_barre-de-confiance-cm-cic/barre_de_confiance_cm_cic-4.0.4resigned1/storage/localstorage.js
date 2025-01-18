/*******************************************************************************************
 *	             			LOCAL STORAGE					  	
 *
 *  UTILISATION: script présent dans la page de background de l'extension
 *  
 *  Contient les fonctions pour:
 *  	sauvegarder un élément dans le local storage de l'extension
 *  	obtenir la valeur d'un élément sauvegarder dans le local storage de l'extension
 *
 ******************************************************************************************/

var sidListeNoire = "LS_LISTE_NOIRE";
var sidTempsActu = "LS_TPS_ACTUEL";

/**
 * Recupere la valeur de local storage pour la barre de confiance
**/
function GetStorage()
{
    return localStorage;
}
/**
 * Sauvegarde une valeur dans local storage
**/
function SaveDansLocalStorage(key, value)
{
    if (value == null)
        return false;

    var bOK = true;

    try {
        var storage = GetStorage();
        storage.setItem(key, value);
    } catch (e) {
        bOK = false;
    }
    return bOK;

}
/** 
 * Recupere une valeur de local storage
**/
function GetDeLocalStorage(key)
{
    var value = null;
    try {
        var storage = GetStorage();
        value = storage.getItem(key);

    } catch (e) {
    }
    return value;

}
/** 
 * Sauve la date/heure actuelle dans local storage
**/
function SaveTpsActuelDsLocalStorage()
{
    var tpsActuel = new Date();

    return SaveDansLocalStorage(sidTempsActu, tpsActuel.getTime());
}

/**
 * Sauve la liste noire des urls (chaine de caractere) dans local storage
**/
function SaveListeNoireDsLocalStorage(sListeNoire)
{
    return SaveDansLocalStorage(sidListeNoire, sListeNoire);
}
/** 
 * Recupere la date/heure sauvegardee dans local storage
**/
function GetTpsDeLocalStorage()
{
    return GetDeLocalStorage(sidTempsActu);
}
/** 
 * Recupere la liste noire des urls (chaine de caractere) sauvegardee local storage
**/
function GetListeNoireDeLocalStorage()
{
    return GetDeLocalStorage(sidListeNoire);
}
/**
 * Compare la date/heure actuelle avec celle stocke dans le local storage
 * renvoie vrai si la difference est superieur a 1 heure
**/
function EstTpsStockeTropVieux()
{
    var bOK = true;
    var tpsStocke = GetTpsDeLocalStorage();
    if (null == tpsStocke)
        return bOK;

    var tpsActuel = new Date();
    diff = tpsActuel.getTime() - tpsStocke;

    if (diff < 3600 * 1000) {
        bOK = false;
    }

    return bOK;
}