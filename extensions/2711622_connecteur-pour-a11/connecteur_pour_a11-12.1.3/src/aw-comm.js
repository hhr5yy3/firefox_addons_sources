 /* 
 *	Ce document est la propriété intellectuelle de Druide informatique inc. Toute reproduction ou publication est interdite. 
 *  Copyright 2022 Druide informatique inc. 
 */
 let gIdPageComm = "aucun";
let chargeayComm = false;
let gDonneesGlobales = null;
let gIdCommunicationDocument = "";
let intervalleReveilBackgroundAWComm = 0;
if (window.document.location.pathname != "/texteur") {
    let monPort = null;

    function envoieCommVersBackground(lesArguments) {
        if (!monPort) return;
        lesArguments.estLandingPage = false;
        lesArguments.type = "";
        lesArguments._id = gIdPageComm;
        lesArguments._dib107 = cstSourceScriptAWeb;
        lesArguments._dib108 = "";
        lesArguments._dib105 = cstTypeMessageRequete;
        lesArguments._dib104 = cstIdAntidoteWeb;
        lesArguments.idCommunicationDocument = gIdCommunicationDocument;
        lesArguments.estAWeb = true;
        if (!monPort) {
            actionAuChargementComm(null);
            return;
        }
        if (estSafariAppex()) {
            safari.extension.dispatchMessage(lesArguments.message, lesArguments);
        } else if (estFureteurWebExtension()) {
            monPort.postMessage(lesArguments);
        }
    };

    function envoieMessageAuCorrecteurAW(leMessage) {
        leMessage.type = 'ConnecteurAntidote';
        if (leMessage.donnees_globales !== undefined && leMessage.donnees_globales.infoConnecteur !== undefined) {
            leMessage.infoConnecteur = leMessage.donnees_globales.infoConnecteur;
            gDonneesGlobales = leMessage.donnees_globales;
        } else {
            leMessage.infoConnecteur = {
                versionConnecteur: "0.0.0",
                idConnecteur: cstChaineNomFureteur + "_non_initialisay",
                manifest: 3
            }
            gDonneesGlobales.idTexteur = "idTexteur_non_initialisay";
        }
        if (leMessage.donnees_globales !== undefined) leMessage.donnees_globales = {};
        leMessage.infoApplication = {
            nom: encodeChainePourJson(gDonneesGlobales.idTexteur)
        };
        window.postMessage(leMessage, "*");
    };

    function gestionnaireMessageDuCorrecteurAW(event) {
        if (event.data.type != 'CorrecteurAntidoteWeb')
            return;
        let _dib84 = event.data;
        if (_dib84.message == "_pb2d" && gIdCommunicationDocument !== undefined)
            _dib84.idCommunicationDocument = gIdCommunicationDocument;
        _dib84.estAWeb = true;
        envoieCommVersBackground(_dib84);
    };

    function actionRemiseEnAvantPlanComm(ev) {
        if (estSafariAppex()) {
            envoieCommVersBackground({
                message: "suspend"
            });
        }
        var edit_arg = {
            message: '_dib01'
        };
        envoieMessageAuCorrecteurAW(edit_arg);
        envoieCommVersBackground(edit_arg);
    };

    function initialiseCommunicationAntidoteWeb(msg) {
        gEstCorrecteurAW = true;
        window.addEventListener("message", gestionnaireMessageDuCorrecteurAW, false);
        window.addEventListener("focus", actionRemiseEnAvantPlanComm, false);
        msg.message = 'chargementConnecteur';
        envoieMessageAuCorrecteurAW(msg);
    };

    function gestionnaireMessageDuBkg(msg, port) {
        if (msg.message == "initialiseCommunication") {
            initialiseCommunicationAntidoteWeb(msg);
            if (msg.ouvrePageConnexion > 0) {
                envoieCommVersBackground({
                    message: "confirme",
                    ouvrePageConnexion: msg.ouvrePageConnexion - 1
                });
            }
        } else if (msg.message == "_dib01") {
            if (msg.ouvrePageConnexion > 0) {
                envoieCommVersBackground({
                    message: "confirme",
                    ouvrePageConnexion: msg.ouvrePageConnexion - 1
                });
            }
        } else if (msg.message !== undefined) {
            if (msg.message == "_pb12d")
                gIdCommunicationDocument = msg.idCommunicationDocument;
            envoieMessageAuCorrecteurAW(msg);
        }
    }

    function actionPerteFocus(e) {
        envoieCommVersBackground({
            message: "_pb31d"
        });
    };

    function actionAuChargementComm(e) {
        var body = document.getElementsByTagName('body').item(0);
        if (body != null && !document.getElementById("antidote_connecteur")) {
            var undiv = document.createElement('div');
            undiv.setAttribute("id", "antidote_connecteur");
            undiv.setAttribute("style", "display: none;");
            body.appendChild(undiv);
        }
        chargeayComm = true;
        if (gIdPageComm == "aucun") {
            var d = new Date();
            gIdPageComm = d.getTime() + chaine_aleatoire();
        }
        gestionTraduction.initAvecConstante(cstDict);
        if (estFureteurWebExtension() && !monPort) {
            try {
                monPort = fureteur.runtime.connect({
                    name: "aw-comm" + separateurElement + gIdPageComm
                });
                monPort.onDisconnect.addListener(function() {
                    if (fureteur.runtime.lastError) {
                        var m = fureteur.runtime.lastError.message;
                    }
                    monPort = null;
                });
                monPort.onMessage.addListener(gestionnaireMessageDuBkg);
                var edit_arg = {
                    message: "_dib94",
                    estPageAWeb: true,
                    _dib29: true
                };
                envoieCommVersBackground(edit_arg);
                if (intervalleReveilBackgroundAWComm == 0) {
                    intervalleReveilBackgroundAWComm = setInterval(() => {
                        envoieCommVersBackground({
                            message: "reveil"
                        })
                    }, 30000);
                }
            } catch (erreur) {
                console.error("aw-comm.actionAuChargementComm", erreur);
            }
        }
    }
    actionAuChargementComm(null);
    window.addEventListener("blur", actionPerteFocus, false);
    window.addEventListener("focus", actionAuChargementComm);
}