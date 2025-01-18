/******************************************************************************************
 *	              AJOUT CODE DE BLOCAGE						  	
 *
 *  UTILISATION: script mis dans une page sur liste noire
 *  			 placé par la fonction MiseAJourInfosBarreDeConfiance de background.js
 *  
 *  Contient 
 *  	le code html a rajouté dans la page de blocage (code ajouté via du javascript)
 *  
 *****************************************************************************************/
 
 
 
 /* globals define, module */

/**
 * A simple library to help you escape HTML using template strings.
 *
 * It's the counterpart to our eslint "no-unsafe-innerhtml" plugin that helps us
 * avoid unsafe coding practices.
 * A full write-up of the Hows and Whys are documented
 * for developers at
 *  https://developer.mozilla.org/en-US/Firefox_OS/Security/Security_Automation
 * with additional background information and design docs at
 *  https://wiki.mozilla.org/User:Fbraun/Gaia/SafeinnerHTMLRoadmap
 *
 */

 
 

var ID_BLOCAGE = "bc_blocage";
var ID_ATTENTION = "bc_attention";
var PATH_BLOCAGE = "blocage/";


var CSS_BLOCAGE = chrome.extension.getURL(PATH_BLOCAGE + "blocage.css");
var JS_BLOCAGE = chrome.extension.getURL(PATH_BLOCAGE + "blocage.js");
var BOUTON_IGNORER = "Ignorer cet avertissement";
var BOUTON_SORTIR = "Sortir d'ici !";
var IMG_DETECTIVE = chrome.extension.getURL(PATH_BLOCAGE + "bc_logo-detective.png");
var TXT_TITLE_ALERTE = "Avertissement de page contrefaite !"
var MSG_ALERTE_LINE1 = "La page est signal\u00e9e comme \u00e9tant une contrefa\u00e7on et a \u00e9t\u00e9 bloqu\u00e9e par notre barre de confiance.";
var MSG_ALERTE_LINE2 = "Les pages contrefaites sont con\u00e7ues pour vous amener \u00e0 r\u00e9v\u00e9ler des informations " +
   							"personnelles en imitant les pages de site en qui vous pouvez avoir confiance.";
var ATTENTION_PHISHING = "<form>" +
							"<div id=\"bc_blocage_msg\">" +
							"	<div id=\"bc_blocage_title_div\">" +
							"		<span id=\"bc_blocage_logo\"> <img  src=\"" + IMG_DETECTIVE + "\" alt=\"logo\"/> </span>" +
							"		<span id=\"bc_blocage_title\">" + TXT_TITLE_ALERTE + "</span>" +
							"	</div>	" +
							"	<div id=\"bc_blocage_description\">" +
							"		<div class=\"bc_blocage_ligne\">" + MSG_ALERTE_LINE1 +
							"		</div>" +
							"		<div class=\"bc_blocage_ligne\">" + MSG_ALERTE_LINE2 +
							"		</div>	" +
							"	</div>" +
							"	<div id=\"bc_blocage_sortir\">" +
							"		<input type=button value=\"" + BOUTON_SORTIR + "\" id=\"bc_blocage_bouton_sortir\"  onClick=\"Sortir();\">" +
							"	</div>" +
							"	<div id=\"bc_blocage_ignorer\" >" +
							"		<a href=\"javascript:CacheCodeBlocage();\" id=\"bc_blocage_lien_ignorer\">" + BOUTON_IGNORER + " </a>" +
							"	</div>" +
							"</div>" +
							"</form>";
							
/**
* Ajoute une page de blocage dans la page html
**/
var doc = window.document;

var eBody = doc.body;
var eHead = doc.head;

if (doc.getElementById(ID_BLOCAGE) == undefined && eBody != undefined && eHead != undefined) {
    // ajoute un lien au fichier css
    var eStyle = doc.createElement("style");
    eStyle.type = "text/css";
    var nTextImport = doc.createTextNode("@import \"" + CSS_BLOCAGE + "\";");
    eStyle.appendChild(nTextImport);
    eHead.appendChild(eStyle);

    //ajoute un lien vers le fichier de script
    var eScript = doc.createElement("script");
    eScript.src = JS_BLOCAGE;
    eHead.appendChild(eScript);

    //Ajout un element div qui masque la page
    var eDiv = doc.createElement("div");
    eDiv.id = ID_BLOCAGE;
    eBody.appendChild(eDiv);


    //Ajout div de blocage dans la page
    var eDivAttention = doc.createElement("div");
    eDivAttention.id = ID_ATTENTION;
		eDivAttention.appendChild(doc.createRange().createContextualFragment(ATTENTION_PHISHING));
    eBody.appendChild(eDivAttention);
}





// Pour eviter l'erreur "script returns non structured-clonable-data"
undefined;