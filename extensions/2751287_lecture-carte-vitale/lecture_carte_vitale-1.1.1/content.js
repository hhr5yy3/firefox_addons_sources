//console.log("Web extension lecture vitale: Content Script Actif...");

function do_nothing() {}

function get_dest_host(event) {


		if (event.source != window ) {
			return "unknown";
		}

		if (!event.data ) {
			return "unknown";
		}

		if (!event.data.hasOwnProperty("service")) {
//			console.log( "parametre manquant");
    			return "unknown";
		}

		//l'host de destination a ete fixé par l'émetteur de la demande
		//pour mettre en place un nouveau, host, il suffira de préciser dest_host dans la demande ( pas de liste de valeurs du champ 'service' à maintenir )
		if (event.data.hasOwnProperty("dest_host")) {
			return event.data.dest_host;
		}

		let service = event.data.service;

  		if (service === "vitale" || service === "serial_number" || service === "version") {
    			return "vitale";
		} else {
			return "diagam";
		}
}

//pour indiquer à la page utilisateur que la web extension diagam est operationnelle, on cree une balise div
var div = document.createElement('div');
div.setAttribute('id', 'lecture-vitale-native-messaging-webextension-version');
div.style.display = 'none';

//Pour compatibilite Firefox/reste du monde
try {
  div.innerHTML = chrome.runtime.getManifest().version;
}
catch (error) {
  div.innerHTML = browser.runtime.getManifest().version;
}

document.getElementsByTagName('body')[0].appendChild(div);



//doublon de la méthode précédente, plus adaptée à certains utilisateurs
//pour signaler à la page utilisateur que la web extension diagam est operationnelle, on lui envoie un message
//une seule fois, au premier chargement de content.js

function hello_i_am_ready() {

	hello_i_am_ready = do_nothing;

	evt_id = "evenement_reponse_diagam";
	message = { "service" : "diagam_web_extension_is_loaded",  "version" : div.innerHTML };
	//Pour compatibilite Firefox/reste du monde
	try {
      		var clonedDetail = cloneInto(message, document.defaultView);
      		document.dispatchEvent(new CustomEvent(evt_id, { detail: clonedDetail }));
    	}
    	catch (error) {
      		document.dispatchEvent(new CustomEvent(evt_id, { detail: message }));
 	}
}


hello_i_am_ready();


/*
 * Traitement des évenements reçus de la page web.
 */
window.addEventListener("message", function (event) {

  //console.log(new Date() + "Reception de la requete par le script content.js ");

  let dest_host = get_dest_host( event ) ;

  // on modifie l'apparence du curseur de souris : attente
  if (dest_host === "vitale" ) {
	document.body.style.cursor = 'wait';
  }
  else if (dest_host === "unknown")  {
	return false;
  }
  
  event.data.dest_host = dest_host;

//  console.log(new Date() + ", Envoi de la requete de la page vers le script background");

  //on poste la demande au script background
  chrome.runtime.sendMessage(event.data);

}, false);


/* 
* Traitement de la réponse de l'extension (via background)
*  - Mise à jour de la page et du formulaire
*  - Transmission du formulaire. 
*/
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

  if ((sender.id == "webextension.vitale@giesv.fr"  // Firefox 
    || sender.id == "kpjpglcbcgnblkigbedgaoegjbifejka" // Chrome V3
    || sender.id.startsWith("fr.sesam-vitale.lecture-vitale") // Safari
  )
  ) {
    //console.log(new Date() + ", reception de la réponse du script background");

    if (message.service == "version") {

      message.webextension = div.innerHTML;
    }
    //on retablit un curseur de souris "normal"
    document.body.style.cursor = 'default';

    //Pour compatibilite Firefox/reste du monde
    try {
      var clonedDetail = cloneInto(message, document.defaultView);
      document.dispatchEvent(new CustomEvent('evenement_reponse_' + message.dest_host, { detail: clonedDetail }));
    }
    catch (error) {
      document.dispatchEvent(new CustomEvent('evenement_reponse_' + message.dest_host, { detail: message }));
    }

    //console.log(new Date() + ", reponse de la web extension envoyee a la page");

  } else {
 //   console.log(new Date() + ", message " + JSON.stringify(message) +" provenant d'une extension inconnue " + sender.id);
  }
  return true;
});

