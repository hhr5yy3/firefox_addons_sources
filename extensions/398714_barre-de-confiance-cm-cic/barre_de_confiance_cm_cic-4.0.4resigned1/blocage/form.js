/***********************************************************************************************
 *	              AJOUT CODE DE BLOCAGE						  	
 *
 *  UTILISATION: script lancé automatiquement (défini dans manifest.json) à chaque nouvelle page
 *  
 *  Contient 
 *  	le code envoyant vers background.js l'ensemble des URLS des formulaires POST
 *  
 ***********************************************************************************************/

var bContientFormulaireSuspect = false;
var lForms = null;
var iNbForms = 0;
var currentForm = null;
var formsUrl = []

if (document != undefined && (lForms = document.forms) != undefined && (iNbForms = lForms.length) != 0) {
    /* On parcours chaque formulaire de la page */
    for (f = 0 ; f < iNbForms ; f++) {
        currentForm = lForms[f];
        /*si le formulaire n'est pas un "method=post", on s'en fout */
        if (currentForm.method != "post") {
            continue;
        }
        /* on recupere l'adresse de destination */
        formsUrl.push(currentForm.action);
    }
}
browser.runtime.sendMessage({ "formsUrl": formsUrl });