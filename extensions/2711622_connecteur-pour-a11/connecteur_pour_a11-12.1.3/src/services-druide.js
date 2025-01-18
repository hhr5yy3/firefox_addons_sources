 /* 
 *	Ce document est la propriété intellectuelle de Druide informatique inc. Toute reproduction ou publication est interdite. 
 *  Copyright 2022 Druide informatique inc. 
 */
 let gIdPageServiceDruide = "aucun";
if (window.document.location.pathname == "/connexion/externe" || window.document.location.pathname == "/connexion/erreur-antidote-web") {
    let monPort = null;

    function envoieServiceDruideVersBackground(lesArguments) {
        monPort && monPort.postMessage(lesArguments);
    };

    function gestionnaireMessageServiceDruideDuBkg(msg, port) {
        if (msg.message !== undefined && msg.message == "cacheBouton") {
            setTimeout(() => {
                if (document.getElementsByClassName("bouton-action").length > 0) {
                    document.getElementsByClassName("bouton-action")[0].parentNode.style.display = "none";
                }
                if (document.getElementsByClassName("conteneur-bouton").length > 0) {
                    document.getElementsByClassName("conteneur-bouton")[0].style.display = "none";
                }
                if (document.querySelectorAll(".liste-liens-externes").length > 0) {
                    for (let enfant of document.querySelectorAll(".liste-liens-externes")[0].children) {
                        if (enfant.nodeName == "A") {
                            let href = enfant.href + cstContexteSafari;
                            enfant.href = href;
                        }
                    }
                }
            }, 10);
        } else if (msg.message == "_dib01") {
            var edit_arg = {
                message: "_dib94",
                estPageAWeb: false,
                _dib29: true
            };
            envoieServiceDruideVersBackground(edit_arg);
        }
    }

    function actionAuChargementServiceDruide(e) {
        if (gIdPageServiceDruide == "aucun") {
            var d = new Date();
            gIdPageServiceDruide = d.getTime() + chaine_aleatoire();
        }
        if (estFureteurWebExtension()) {
            try {
                let nom = "services-druide" + separateurElement + gIdPageServiceDruide;
                monPort = fureteur.runtime.connect({
                    name: nom
                });
                monPort.onDisconnect.addListener(function() {
                    if (fureteur.runtime.lastError) {
                        var m = fureteur.runtime.lastError.message;
                    }
                    actionAuChargementServiceDruide(e);
                });
                envoieServiceDruideVersBackground({
                    message: "service_druide_chargeay",
                    _id: nom
                });
                monPort.onMessage.addListener(gestionnaireMessageServiceDruideDuBkg);
            } catch (erreur) {
                console.error("service-druide.actionAuChargementServiceDruide", erreur);
            }
        }
    }
    actionAuChargementServiceDruide();
}