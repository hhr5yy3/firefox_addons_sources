const isDebug = true;
var consent = false;
let isScriptAlreadyInjected = false;

//L'utilisateur doit accepter qu'on utilise ses données (Lien des pages qu'il visite)
browser.runtime.onInstalled.addListener(async ({ reason, temporary }) => {
    //if (temporary) return; // skip during development
    switch (reason) {
        case "install":
        {
            const url = browser.runtime.getURL("consent.html");
            await browser.tabs.create({ url });
            //await browser.windows.create({ url, type: "popup", height: 600, width: 600, });
        }
            break;
        case "update":
        {
            const url = browser.runtime.getURL("consent.html");
            await browser.tabs.create({ url });
            //await browser.windows.create({ url, type: "popup", height: 600, width: 600, });
        }
            break;
    }
});

async function checkConsent() {
    let couleur_ce_privacy = await browser.storage.local.get("couleur_ce_privacy");
    if(couleur_ce_privacy.couleur_ce_privacy === "true") {
        consent = true;
    }
}

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    debug(isDebug, changeInfo);
    debug(isDebug, tab);
    if(consent === false) {
        checkConsent();
    }

    if (changeInfo.status == "complete" && consent === true) {
        var url = tab.url;
        chrome.tabs.query({'active': true, 'currentWindow': true}, function (tabs) {

            debug(isDebug, chrome.tabs.windowType);
            console.table("Tabs : " + tabs[0]);
            var url_non_formatee = url;
            var url_referrer = document.referrer;
            // var title = $(document).attr('title');
            debug(isDebug, "URL : " + url_non_formatee);
            // debug(isDebug, "Title : " + title);
            // $.ajax({
            //     dataType: "json",
            //     type: "get",
            //     url: "https://application.opence.fr/extension/have_activated_on_url?url_non_formatee=" + encodeURIComponent(url_referrer)
            // })
            //     .done(function (d) {
            //         var data = JSON.stringify(d);
            //
            //         chrome.tabs.executeScript(tab.id, {file: 'background.js'}, function () {
            //             chrome.tabs.sendMessage(tab.id, url_referrer);
            //         });
            //
            //         if (date["haveActivate"] == true)
            //             return;
            //     })
            //
            //     .fail(function (data) {
            //         return;
            //     })

            fetch("https://application.opence.fr/extension/webservice?url_non_formatee=" + encodeURIComponent(url_non_formatee))
                .then((response) => response.json())
                .then((data) => {
                    debug(isDebug, data);
                    if (data.length !== 0 || typeof data !== "boolean") {
                        if (data.length !== 0) {
                            DisplayModalite(data, tabs, tab);
                        }
                    } else {
                        debug(isDebug, "Erreur retour " + data);
                    }
                })
                .catch((error) =>  {
                    // var data = JSON.parse(data);
                    debug(isDebug, "Appel fail " + error);
                })
        })
    }
});

debug(isDebug, "On est dans le fichier extension.js");

function debug(isDebug, toDisplay) {
    if (isDebug)
        console.log(toDisplay);
}

function DisplayModalite(data, tabs, tab) {
    if(isScriptAlreadyInjected === false) {
        isScriptAlreadyInjected = true;
        chrome.scripting.executeScript({target: {tabId:tab.id}, files: ['background.js'] }, function() {
            chrome.tabs.sendMessage(tab.id, data)
        });
    }
}

function createCookie(nom, valeur, jours) {
    // Le nombre de jour sp�cifi�
    if (jours) {
        var date = new Date();
        //Converti le nombre de jours en millisecondes
        date.setTime(date.getTime() + (jours * 24 * 60 * 60 * 1000));
        var expire = "; expires=" + date.toUTCString();
        expire = expire.replace('GMT', 'UTC');
    } else {
        var expire = "";
    }
    var test = nom + "=" + valeur + expire + "; path=/";
    document.cookie = nom + "=" + valeur + expire + "; path=/";
}