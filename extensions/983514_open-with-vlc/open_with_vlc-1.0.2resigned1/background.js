/**
 * Extension Open with VLC
 * Permet d'ouvrir des liens http / https directement dans VLC
 *
 * 1.0.0:
 * - Possibilité d'ouvrir un lien avec VLC si le module HTTP est activé
 *
 * =====================
 * = PROCHAINES VERSIONS
 * =====================
 *
 * - Sélection automatique de l'audio préféré
 * - Sélection automatique des sous titres préférés
 * - Plein écran automatiques
 * - Guide d'installation (avec capture d'écran)
 * - Ajouter une page de configuration pour pouvoir paramétrer :
 *     $ L'IP
 *     $ Le port
 *     $ L'envoie automatique en plein écran pour les vidéos
 *     $ Le mot de passe
 *     $ La langue de préférence pour les sous titres
 *     $ La langue de préférence pour l'audio
 */


////////////////////
// Paramètres généraux de l'extension
////////////////////
var AudioExtensions = [
    ".mp3",
    ".wav",
    ".flac",
    ".aiff",
    ".wma",
	".3gp",
	".midi",
	".ogg",
	".ogv",
	".oga",
	".ogx",
	".ogm",
	".spx",
	".opus",
	".wave",
	".aiff",
	".aif",
	".aifc",
	".rm",
	".mpe",
	".mpv"
];
var VideoExtensions = [
    ".mp4",
    ".mkv",
    ".avi",
    ".mov",
    ".wmv",
    ".flv",
    ".webm",
	".asf",
	".dvr-ms",
	".wtv",
	".mov",
	".m4a",
	".m4b",
	".m4p",
	".m4r",
    ".m4v",
	".mpg",
	".mpeg",
	".m2v",
	".mp2",
	".ts",
	".tsa",
	".tsv",
	".mxf",
	".heif",
	".heic",
	".vob",
	".rmvb",
	".f4v",
	".f4p",
	".f4a",
	".f4b",
	".amv"
];

// Nombre d'utilisation avant l'affichage d'une notification de don
var donationNotificationNumberOfTimes = 7;

// Nombre d'utilisation ou la notification de don ne s'affichera pas après avoir cliqué sur "Faire un don"
var donationNotificationDoneNumberOfTimes = 50;

// Nombre total d'utilisation de l'extension
var totalTimesUsed = 0;

// Nombre total d'utilisation de "don" restantes
var totalTimesDonationRemain = 0;

// Fonctionnera dans une future version
var password = null;
var autoFullscreen = false;
var preferedAudio = null;

/////////////////////
var Message = new MessagePromise(true);
var VLC = null;
var lastUrl = null;
var timeoutVideoStarted = null;

browser.storage.local.get(["vlcHTTPPassword", "autoFullscreen", "preferedAudioSource", "totalTimesUsed", "totalTimesDonationRemain"], (result) => {
    password = result.vlcHTTPPassword;
    if (result.autoFullscreen !== undefined) {
        autoFullscreen = result.autoFullscreen;
    }
    if (result.preferedAudioSource !== undefined) {
        preferedAudio = result.preferedAudioSource;
    }
    if (result.totalTimesUsed !== undefined) {
        totalTimesUsed = result.totalTimesUsed;
    }
    if (result.totalTimesDonationRemain !== undefined) {
        totalTimesDonationRemain = result.totalTimesDonationRemain;
    }

});


// Initialisation du module VLC
function InitVLC(wrongPassword, tabId) { return new Promise((resolve, reject) => {
    if (!password || wrongPassword) {
        var dataToSend = {isWrongPassword: false};
        if (password && wrongPassword) {
            dataToSend.isWrongPassword = true;
        }

        // Envoie du prompt
        Message.sendTo(tabId, "prompt-password", dataToSend).then((promptedPassword) => {
            password = promptedPassword;
            browser.storage.local.set({
                vlcHTTPPassword: password
            });
            VLC = new VLCHTTP({
                password: password
            }, Request);
            resolve();
        });

    } else if (!VLC) {
        // Si VLC n'a pas encore été initialisé et qu'on a un mot de passe enregistré
        VLC = new VLCHTTP({
            password: password
        }, Request);
        resolve();
    } else {
        resolve();
    }

}); }

// Lorsqu'une erreur est présente
function OnError(err) {
    if (err.event.loaded === 0) {
        Message.sendTo(lastUrl.tabId, 'alert', browser.i18n.getMessage("errorVLCHTTPNotStarted"));
    } else if (err.xhr.status === 401) {
        InitVLC(true, lastUrl.tabId).then(() => {
            if (password) {
                OpenLink(lastUrl.url, lastUrl.tabId);
            }
        });
    }
}

// Envoie de la notification de don
function PushNotificationDonate() {
    var baseNotification = {
        type: "basic",
        iconUrl: "assets/icons/heart.icon.png",
        title: browser.i18n.getMessage("donationNotifcationTitle"),
        message: browser.i18n.getMessage("donationNotifcationMessage")
    };
    var chrome = /Chrome\/([0-9.]+)/.exec(navigator.userAgent);
    if (chrome && parseInt(chrome[1].substr(0, 2)) >= 50) {
        baseNotification.requireInteraction = true;
    }
    browser.notifications.create("donate", baseNotification, () => {});
}

// Clic sur une notification
browser.notifications.onClicked.addListener((notifId) => {
    if (notifId == "donate") {
        browser.notifications.clear(notifId, () => {});
        chrome.tabs.create({ url: browser.i18n.getMessage("donationLink") });
        totalTimesDonationRemain = donationNotificationDoneNumberOfTimes;
        browser.storage.local.set({
            totalTimesDonationRemain: totalTimesDonationRemain
        });
    }
})
browser.notifications.onButtonClicked.addListener((notifId, buttonIndex) => {

});

// Evènement lorsque la vidéo s'est lancée
function OnVideoStarted(data) {
    var extension = lastUrl.url.substr(lastUrl.url.lastIndexOf("."));
    if (!data.fullscreen && VideoExtensions.indexOf(extension) >= 0 && autoFullscreen) {
        VLC.fullscreen();
    }
    totalTimesUsed++;
    if (totalTimesDonationRemain == 0 && totalTimesUsed%donationNotificationNumberOfTimes == 0) {
        PushNotificationDonate();
    }
    if (totalTimesDonationRemain > 0) {
        totalTimesDonationRemain--;
    }
    browser.storage.local.set({
        totalTimesUsed: totalTimesUsed,
        totalTimesDonationRemain: totalTimesDonationRemain
    });
    if (preferedAudio) {
        var audioSources = VLC.getAudioSourcesFrom(data);
        audioSources.forEach((audio) => {
            if (audio.text.indexOf(preferedAudio) >= 0) {
                VLC.setAudioSource(audio.index);
            }
        })
    }
}

// Fonction vérifiant si la vidéo a été lancée ou non
function CheckStarted() {
    timeoutVideoStarted = setTimeout(() => {
        VLC.getCurrentItemInfo().then((data) => {
            if (data.position > 0) {
                OnVideoStarted(data);
                timeoutVideoStarted = null;
            } else {
                CheckStarted();
            }
        });
    }, 100);
}

// Ouvre un lien dans VLC
function OpenLink(url, tabId) {
    lastUrl = {url: url, tabId: tabId};
    InitVLC(false, tabId).then(() => {
        if (password) {
            VLC.stop().then(() => {
                clearTimeout(timeoutVideoStarted);
                VLC.open(url).then((data) => {
                    CheckStarted();
                }).catch(OnError);
            }).catch(OnError);
        }
    });
}


// Les URLs qui auront le menu contextuel "Ouvrir avec VLC"
var baseURI = "*://*/*";
var patterns = [];
AudioExtensions.forEach((ext) => {
    patterns.push(baseURI + ext);
});
VideoExtensions.forEach((ext) => {
    patterns.push(baseURI + ext);
});

// Création du menu contextuel
browser.contextMenus.create({
    title: browser.i18n.getMessage("contextMenuTitle"),
    contexts: ["link"],
    targetUrlPatterns: patterns,
    onclick: (info, tab) => {
        OpenLink(info.linkUrl, tab.id);
    }
})
