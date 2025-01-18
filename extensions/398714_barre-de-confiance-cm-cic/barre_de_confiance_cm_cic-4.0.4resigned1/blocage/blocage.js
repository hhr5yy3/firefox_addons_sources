/*****************************************************************************************************
 *	              ACTIONS ASSOCIEES AU BLOCAGE D'UNE PAGE						  	
 *
 *  UTILISATION: script mis par ajoutblocage.js dans une page sur liste noire 
 *  
 *  Contient 
 *  	les 2 actions pour "Sortir d'ici"(Sortir) et "Ignorer l'avertissement" (CacheCodeBlocage)
 *  
 *  PREREQUIS: Doit être contenu dans manifest.json dans web_accessible_resources
 *  
 ****************************************************************************************************/

var ID_BLOCAGE = "bc_blocage";
var ID_ATTENTION = "bc_attention";

/** 
* Masque le code qui bloque la page
**/
function CacheCodeBlocage()
{
    // Cache les div de blocage
    var eBlock = document.getElementById(ID_BLOCAGE);
    var eAttention = document.getElementById(ID_ATTENTION);
    if (eBlock != undefined && eBlock.style != undefined)
        eBlock.style.display = "none";
    if (eAttention != undefined && eAttention.style != undefined)
        eAttention.style.display = "none";
}

/**
* Renvoie vers une page vide
**/
function Sortir()
{
    // Redirige vers une page blanche
    setTimeout(function () { window.location = "about:home" }, 100);
}