/**
* Used on client side to verify if extension is installed or not
*/
document.body.classList.add("psudOfficeOpenerInstalled");

/**
* Event listner to launch MS Office opening process via native message API
*/
var jcrExtension = {
  jcrListener: function(evt) {

	var urlFile = evt.target.getAttribute("davLinkAttribute");
	psudOfficeLaunch(urlFile);
	
  }
}
window.addEventListener("psudJcrExtension", function(e) { jcrExtension.jcrListener(e); }, false, true);		

/**
* Send browser message to background.js with url of the file to open
*/
var psudOfficeLaunch = function(urlFile) {
	//console.log("*** urlFile to open : " + urlFile);

	// Native message to browser to open in MS Office
	browser.runtime.sendMessage({origin:"psudOfficeOpenerv2", url: urlFile});
	
};

/**
 * Traitement des messages sur l'event 'message' du tab
 * @param message Paramètres de l'événement
 */
function processBackgroundMessage(message) {
	console.log('content-script.processBackgroundMessage');

	// On ne traite que les events envoyés par le background-script de l'extension 'psudofficeopenerv2'
	if (message.origin != "psudOfficeOpenerv2")
			return;


	console.debug('content-script.processBackgroundMessage type: ${message.type}');

	if (message.type) {

			// Traitement de l'event selon le type
			switch (message.type) {
					case 'psudOfficeOpenerv2-installed':
							setIsInstalled();
							break;
					default:
							console.error('Le type ${message.type} n\'est pas connu');
			}
	} else
			console.error('Aucun type défini dans l\'event');
};

/**
 *
 */
function setIsInstalled() {
	console.log('content-script.setIsInstalled');

	var data = {
			origin: 'psudOfficeOpenerv2',
			type: 'psudOfficeOpenerv2-installed',
			direction: 'extension-to-application'
	}
	window.postMessage(data, this.window.location.origin);
}

browser.runtime.onMessage.addListener(processBackgroundMessage);