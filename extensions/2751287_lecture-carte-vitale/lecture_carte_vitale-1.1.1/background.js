//console.log("Web extension lecture carte vitale: background Script Actif...")

//================== VERSION SANS PERSISTANCE DU PORT =================================

/**
 * Récetion d'une requête du content script.
 */
chrome.runtime.onMessage.addListener(function (data, sender) {

    // Appel au Host
    //console.log(new Date() + ", Envoi de la demande au processus host");
    var host;
    if (data.dest_host === "vitale") {
      host = 'fr.sesamvitale.srvsvcnam_native_messaging_host';
    } else if (data.dest_host === "diagam"){
      host = 'fr.sesamvitale.diagam_v3_native_messaging_host';
    } else {
	    return;
    }

    let service = data.service;
    
    chrome.runtime.sendNativeMessage(host, data,

        function (response) {

           if (chrome.runtime.lastError) {
                chrome.tabs.sendMessage(sender.tab.id, { "dest_host" : data.dest_host, "type": "error", "error_code": "FF00", "service": service, "error_message": "Le programme host " + host + " est absent" });
            } else {

		            response.dest_host = data.dest_host;
                // Transmission de la réponse à l'onglet à l'origine de la requête.
                chrome.tabs.sendMessage(sender.tab.id, response);
            }
        }
    );

    return true;
});
