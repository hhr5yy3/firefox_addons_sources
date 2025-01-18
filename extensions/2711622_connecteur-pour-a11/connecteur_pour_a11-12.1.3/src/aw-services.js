 /* 
 *	Ce document est la propriété intellectuelle de Druide informatique inc. Toute reproduction ou publication est interdite. 
 *  Copyright 2022 Druide informatique inc. 
 */
 let gIdPageService = "aucun";
if (window.document.location.pathname == "/texteur") {
    let monPort = null;

    function envoieServiceVersBackground(lesArguments) {
        if (!monPort) return;
        lesArguments.estLandingPage = document.getElementById('Druide.PageLocale') != null;
        lesArguments.type = "";
        lesArguments._id = gIdPageService;
        lesArguments._dib107 = cstSourceScriptPage;
        lesArguments._dib105 = cstTypeMessageRequete;
        lesArguments._dib104 = cstIdAntidoteWeb;
        lesArguments.estAWeb = false;
        if (estFureteurWebExtension()) {
            monPort.postMessage(lesArguments);
            if (lesArguments.message == "fermeture") {
                monPort.disconnect();
                monPort = null;
            }
        }
    };

    function initialiseCommunicationPageLocale() {
        if (document.getElementById('Druide.Connecteur.version') != null) {
            metsTexte(document.getElementById('Druide.Connecteur.version'), fureteur.runtime.getManifest().version);
        }
        if (document.getElementById('Druide.PageLocale') != null) {
            var lePortWs = getURLParameter("ws");
            var leJeton = getURLParameter("jetonTexteur");
            var leUrl = getURLParameter("urlAWeb");
            if ((leJeton != null && leUrl != null) || (lePortWs != null && leUrl != null)) {
                var edit_arg = {
                    _dib106: 1,
                    message: "LienTabs",
                    jetonDoc: leJeton,
                    urlRedir: leUrl,
                    lePortWs: lePortWs
                };
                window.postMessage("6041", "*");
                envoieServiceVersBackground(edit_arg);
            } else {
                transmetErreurPageLocale("6045");
            }
        }
    }

    function transmetErreurPageLocale(code) {
        if (document.getElementById('Druide.PageLocale') != null) {
            window.postMessage({
                code: code
            }, "*");
        }
    }

    function redirigeEnMasquantDansHistorique(leUri) {
        window.location.replace(leUri);
    }

    function envoieIntegrationIncomplete() {
        window.postMessage("6043", "*");
    }

    function getURLParameter(name) {
        return decodeURIComponent((new RegExp(cstRegExUrlDebut + name + cstRegExUrlEgal + cstRegExUrlGroupe).exec(location.search) || [, ""])[1].replace(/\+/g, cstRegExUrlPourcent20)) || null;
    }

    function gestionnaireMessageServiceDuBkg(msg, port) {
        envoieServiceVersBackground({
            message: "enregistreErreur",
            data: {
                "aw-services.gestionnaireMessageServiceDuBkg.msg": msg
            }
        });
        try {
            if (msg.message == "redirigeSansHistorique") {
                redirigeEnMasquantDansHistorique(decodeChaineDeJson(msg.url));
            } else if (msg.message == "integrationIncomplete") {
                envoieIntegrationIncomplete();
            } else if (msg.message == "_dib01") {}
        } catch (erreur) {
            console.error("aw-services.gestionnaireMessageServiceDuBkg", erreur);
            envoieServiceVersBackground({
                message: "enregistreErreur",
                data: {
                    "aw-services.gestionnaireMessageServiceDuBkg.erreur": erreur
                }
            });
        }
    }

    function actionRemiseEnAvantPlanService(ev) {
        envoieServiceVersBackground({
            message: "_dib01"
        });
    };

    function actionAuChargementService(e) {
        if (gIdPageService == "aucun") {
            var d = new Date();
            gIdPageService = d.getTime() + chaine_aleatoire();
        }
        gestionTraduction.initAvecConstante(cstDict);
        if (estFureteurWebExtension()) {
            try {
                monPort = fureteur.runtime.connect({
                    name: "aw-services" + separateurElement + gIdPageService
                });
                monPort.onDisconnect.addListener(function() {
                    if (fureteur.runtime.lastError) {
                        var m = fureteur.runtime.lastError.message;
                        actionAuChargementService(e);
                    } else {
                        transmetErreurPageLocale("6044");
                    }
                });
                monPort.onMessage.addListener(gestionnaireMessageServiceDuBkg);
                initialiseCommunicationPageLocale();
            } catch (erreur) {
                console.error("aw-service.actionAuChargementService", erreur);
            }
        }
    }
    window.addEventListener("focus", actionRemiseEnAvantPlanService, false);
    fureteur.runtime.onMessage.addListener(function(m) {
        if (m.message == "reconnexion") {
            actionAuChargementService(null);
        }
    });
    actionAuChargementService(null);

    function actionFermeture(event) {
        if (window.top === window && monPort)
            envoieServiceVersBackground({
                message: "fermeture",
                _id: gIdPageService
            });
    }
    window.addEventListener("beforeunload", actionFermeture, false);
}