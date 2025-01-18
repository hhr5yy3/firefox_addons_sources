function injectAgencyInfo(params) {
    try {
        if ( !params ) {
            return;
        }
        const inputsObj = {
            ticket_email: params.agencyLogin,
            manager_name: ((params.managers || []).find(manager => manager.id === params.managerId) || {}).name,
            accountno:  params.accountno,
            support: `https://${window.AGENCY_DOMAIN}/support/agencies?page=1&filter=${params.agencyLogin}`,
            tariff: null,
            plugin_version: params.addonVersion || chrome.runtime.getManifest().version,
            content_script_version: params.contentScriptsVersion
        }
        delete params.managers;
        inputsObj.plugin_settings = JSON.stringify(params);
        for ( let prop in inputsObj ) {
            const propInput = getInput(prop);
            if ( !propInput ) {
                window.setTimeout(injectAgencyInfo, 1000);
                return;
            }
            propInput.value = inputsObj[prop];
            const group = propInput.closest(".control-group");
            if ( group && prop !== "ticket_email" ) {
                group.style.display = "none";
            }
        }
        const mainContent = document.querySelector("section.content.main");
        if ( mainContent ) {
            mainContent.style.minHeight = "initial";
        }


    } catch (e) {
        logError("failed to inject login: " + params, e);
    }
}

function getInput(selector) {
    return document.querySelector(`input[id*="${selector}"], textarea[id*="${selector}"]`);
}

function logError(msg, e) {
	let data = {
			title: "[freshdesk] " + msg,
			url: document.location.href};

	if ( e != null ) {
		if ( e.stack != null )
			data.stack = e.stack;
		if ( e.message != null )
			data.title = data.title + " - " + e.message;
	}

	sendMessageToAddon("error", data);
}

sendMessageToAddon("get info for freshdesk").then(injectAgencyInfo);
