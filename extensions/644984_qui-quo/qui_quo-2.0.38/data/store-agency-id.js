storeAgencyId().then(showPreviousButton);
attachLogOutButtonEvents();

async function storeAgencyId() {
    const agencyIdElement = document.getElementById("agency-id");
    const domainElement = document.getElementById("agency-domain");

    if (domainElement) {
        await setStorageDataAsync({'domain': domainElement.getAttribute('agency-domain')})
    }
    if (agencyIdElement) {
        const agencyId = agencyIdElement.getAttribute("agency-id");
        if ( agencyId ) {
            sendMessageToAddon("store agency id and load", agencyId);
        }

    }
}

function getPreviuosBtn() {
	return document.getElementById("previous-client-button");
}

async function showPreviousButton() {
	if ( getPreviuosBtn() ) {
		const quoteId = await sendMessageToAddon("get previous quote");
        if ( quoteId ) {
            let btn = getPreviuosBtn();
            btn.setAttribute("quote-id", quoteId);
            btn.style.display = "inline";
        }
	}
}

function attachLogOutButtonEvents() {
    const logOutButton = document.querySelector('a[href="/agency/logout"]');
    if ( logOutButton ) {
        logOutButton.addEventListener('click', ()=>{
            sendMessageToAddon("store agency id and load", '');
        })
    } else {
        setTimeout(attachLogOutButtonEvents, 100)
    }

}


chrome.runtime.sendMessage({type: "get info for freshdesk"}).then(params => {
    if (params) {
        const currentManager = (params.managers || []).find(manager => manager.id === params.managerId) || {};
        const freshdeskInfo = document.querySelector('#freshdesk-info');
        if (freshdeskInfo) {
            if (currentManager.name) {
                freshdeskInfo.dataset.name = currentManager.name;
            }
            if (currentManager.email) {
                freshdeskInfo.dataset.email = currentManager.email;
            }
            freshdeskInfo.dataset.manager_name = currentManager.name || "Не выбран";
            freshdeskInfo.dataset.content_script_version = params.contentScriptsVersion;
            freshdeskInfo.dataset.plugin_version = params.addonVersion || chrome.runtime.getManifest().version;
            delete params.managers;
            freshdeskInfo.dataset.plugin_settings = JSON.stringify(params);
        }
    }
}).catch(_ => null);
