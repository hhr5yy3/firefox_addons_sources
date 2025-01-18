let loadTime = new Date();
let manifest = browser.runtime.getManifest();


/**
 * Handle générique de réponse à une Promesse
 * @param message Message de la réponse
 */
function handleResponse(response) {
    console.log(`background-script.handleResponse : ${response}`);
}

/**
 * Handle générique de retour en erreur d'une Promesse
 * @param error Erreur de retour
 */
function handleError(error) {
    console.error(`background-script.handleError: ${error}`);
}

/**
* Browser notification after installation of the web entension
*/
function handleInstalled(details) {
	console.log("*** PSud Office Opener in background script ***");

	browser.tabs.query({}).then(function(value) {
        value.forEach(function(tab){
            var onSendMessage = browser.tabs.sendMessage(
                tab.id,
                {
                    origin: 'psudOfficeOpenerv2',
                    type: 'psudOfficeOpenerv2-installed',
                }
            )
            onSendMessage.then(handleResponse, handleError);
        });
	}).catch(handleError);
	
	browser.notifications.create('Installation', {
		title: `Psud Office Opener version: ${manifest.version}`,
		message: `Effectué le ${loadTime.getDate()}/${loadTime.getMonth()+1}/${loadTime.getFullYear()} à ${loadTime.getHours()}:${loadTime.getMinutes()}:${loadTime.getSeconds()}`,
		type: 'basic'
	   });
}

/**
* Send native message to native client with url of the file to open
*/
function onReceiveWebFileToOpen(urlFile){
	if(urlFile.origin && urlFile.origin == "psudOfficeOpenerv2"){
		console.log("*** onReceiveWebFileToOpen - " + urlFile.origin + " -- " + urlFile.url);
		var sending = browser.runtime.sendNativeMessage("psudOfficeOpenerv2",urlFile.url);
    	sending.then(handleResponse, handleError);
	}
}


/**
* JS events listener
**/
browser.runtime.onInstalled.addListener(handleInstalled);
browser.runtime.onMessage.addListener(onReceiveWebFileToOpen);