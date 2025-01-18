 /* 
 *	Ce document est la propriété intellectuelle de Druide informatique inc. Toute reproduction ou publication est interdite. 
 *  Copyright 2022 Druide informatique inc. 
 */
 let chargeay = false;
let mesDonneesGlobales = null;
const cstNomScriptAntidoteAide = "src/antidoteAide.js"
const cstNomNoeudGravEditorContent = "grav-editor-content";
const cstNomScriptAntidoteGrav = "src/antidoteGrav.js";
const cstTypeMessagePageAntidoteAPIJSConnect = "TypePageAntidoteAPIJSConnect";
const cstNomScriptAntidoteAPIJSConnect = "src/antidoteAPIJSConnect.js";
const cstTypeMessageContentScriptAntidoteAPIJSConnect = "TypeContentScriptAntidoteAPIJSConnect";
const cstTypeMessageAPIJSConnect = "TypeAPIJSConnect";
var gMozillaRessource = "";
var intervalReboursMAO = 0;
var jeSUISAPI = false;
var jeSuisLiayAPI = false;
var monIframeNoAccess = null;
var mesAttributsIframeNoAccess = "";
var monAttributTmp = "";
var monElementPourAPI = null;
var jAiPlusieursElementsAPI = false;
var mesElementsPourAPI = [];
var monElementPourDW = null;
var mesElementsPourDW = null;
var gGoogleAppsScriptAcceptay = false;
var gIdAntidote = cstIdAntidoteWeb;
var optionsTexteur = {};
var gFavIcon = "";
var gIdPage = "aucun";
var gPontCommunicationAvecBkg = "";
var jeSuisATRiche = false;
let jAiDetcteurWebDispo = true && !estThunderbird();
let ecouteurVieuxSafariActif = false;
var monSafariRangeSelection = null;
var monSafariRangeDebutSelection = null;
var monSafariNoeudDebutSelection = null;
var monSafariDecalageNoeudDebut = 0;
var monSafariRangeFinSelection = null;
var monSafariNoeudFinSelection = null;
var monSafariDecalageNoeudFin = 0;
var monSafariFormulaireElement = null;
var monSafariFormulaireDebutSelection = 0;
var monSafariFormulaireFinSelection = 0;
const cstTypeElementAPI = {
    elementNul: -1,
    elementFormulaire: 0,
    elementStandard: 1,
};
var sdk_xhr = null;
String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

function estOverleaf() {
    return !!document.location.href && document.location.href.match(/https:\/\/.*\.overleaf\.com\/project\/.*/);
}

function estFacebook() {
    return document.location.href.match(cstRegFacebook) !== null || document.location.href.match(cstRegMessenger) !== null;
};

function estGmail() {
    return document.location.href.match("https://mail.google.com") !== null || document.location.href.match("https://inbox.google.com") !== null;
}

function estOfficeOnline() {
    return document.location.href.match(cstOnedriveURL) !== null || document.location.href.includes("sharepoint.com") || (document.body !== undefined && document.body !== null && document.body.id !== undefined && document.body.id === "Wac.edit.F.A") || (document.getElementById("WopiDocWACContainer") !== undefined && document.getElementById("WopiDocWACContainer") !== null && estSpan(document.getElementById("WopiDocWACContainer").parentElement));
}

function estWordPressBlocEditor() {
    return document.location.href.match(cstRegWordPressEditorURL) !== null;
};

function estWordPressUrlEditable(leURL) {
    return leURL.match(cstRegWordPressMotCleEditableURL) !== null;
};

function trouveURLDocumentWordPressEditable() {
    var ret = undefined;
    var iframes = document.getElementsByTagName(cstNomNoeudIframe);
    if (iframes != null) {
        for (var i = 0; i < iframes.length && ret === undefined; i++) {
            var url = iframes[i].src;
            if (estWordPressUrlEditable(url))
                ret = url;
        }
    }
    return ret;
};

function filtreUrl(leURL) {
    return leURL.split(cstSeparateurPourSignet)[0];
};
var gEstCorrecteurAW = false;
var gAgentTexteur = null;
var dwAgentTexteur = null;
var gAgentTexteurOutils;
var gIndexFrameDialogue = -1;
var monPort = null;
var jeSuisAppelayParAntiOups = false;
var jeSuisConnectay = false;
var jeSuisSubjectbox = false;
String.prototype.decodeEscapeSequence = function() {
    return this.replace(/\\x([0-9A-Fa-f]{2})/g, function() {
        return String.fromCharCode(parseInt(arguments[1], 16));
    });
};
String.prototype.replaceAt = function(index, character) {
    return this.substr(0, index) + character + this.substr(index + character.length);
};

function estPageCorrecteurAntidoteWeb(param) {
    return gEstCorrecteurAW;
};

function nettoie() {};

function afficheElementNonAccessible(source) {
    let el = source.activeElement;
    monIframeNoAccess = el;
    mesAttributsIframeNoAccess = el.getAttribute("style") != null ? el.getAttribute("style") : "";
    el.setAttribute("style", "border: 5px dotted red;");
    monAttributTmp = "style";
};

function donneSiEstGoogleApps() {
    var unType = new referenceObjet(null);
    var unNoeud = trouveNoeudGoogleApps(unType);
    unType = null;
    if (unNoeud != null)
        return true;
    return false;
};

function corrigeLesFormulaire() {
    var trouveFormulaire = false;
    var unDocument = trouveDocumentAvecSelection(document, false);
    if (unDocument)
        unDocument = unDocument.contentDocument === undefined ? unDocument : unDocument.contentDocument;
    if (unDocument != null) {
        var uneSelection = unDocument.getSelection();
        var unRangeSelection = null;
        if (uneSelection.rangeCount > 0)
            unRangeSelection = uneSelection.getRangeAt(0);
        if (unRangeSelection != null) {
            if (estTexte(unRangeSelection.startContainer) && unRangeSelection.endOffset == unRangeSelection.startOffset) {
                return false;
            }
            var unNoeud = unRangeSelection.startContainer;
            if (contientElementFormulaire(unNoeud)) {
                trouveFormulaire = true;
                var unElement = unDocument.activeElement;
                if (unElement != null && !estBody(unElement)) {
                    if (estIFrame(unElement))
                        unElement = unElement.contentDocument.activeElement;
                }
                if (unElement && !contientElementFormulaire(unElement)) {
                    unDocument = trouveDocumentAvecSelection(document, true);
                    if (unDocument != null)
                        trouveFormulaire = false;
                }
            } else {
                trouveFormulaire = false;
            }
        }
    } else if (!jeSuisLiayAPI || !jeSUISAPI) {
        trouveFormulaire = true;
        if (corrigeLesEditables())
            trouveFormulaire = false;
    }
    if (monSafariRangeSelection != null && estSafariWebex() && ecouteurVieuxSafariActif) {
        trouveFormulaire = false;
    }
    if (unDocument && unDocument.activeElement.value !== undefined && unDocument.activeElement.value.length > 0) {
        trouveFormulaire = true;
    }
    return trouveFormulaire;
};

function creeAgentTexteurFormulaire(estDW) {
    if (estDW != true) estDW = false;
    let unAgentTexteur = new AgentTexteurFormulaire();
    if (estDW) {
        unAgentTexteur.jeSUISAPI = false;
        unAgentTexteur.jeSuisLiayAPI = false;
        unAgentTexteur.jAiPlusieursElementsAPI = false;
        unAgentTexteur.mesElementsPourDW = mesElementsPourDW;
        unAgentTexteur.monElementPourDW = monElementPourDW;
    } else {
        unAgentTexteur.jeSUISAPI = jeSUISAPI || jeSuisLiayAPI;
        unAgentTexteur.jeSuisLiayAPI = jeSuisLiayAPI;
        unAgentTexteur.monElementPourAPI = monElementPourAPI;
        unAgentTexteur.mesElementsPourAPI = mesElementsPourAPI;
        unAgentTexteur.jAiPlusieursElementsAPI = jAiPlusieursElementsAPI;
    }
    unAgentTexteur.estDW = estDW;
    if (estSafariWebex() && estVersionInferieure(mesDonneesGlobales.versionSafari, "16.1")) {
        unAgentTexteur.monSafariFormulaireElement = monSafariFormulaireElement;
        unAgentTexteur.monSafariFormulaireDebutSelection = monSafariFormulaireDebutSelection;
        unAgentTexteur.monSafariFormulaireFinSelection = monSafariFormulaireFinSelection;
    }
    return unAgentTexteur;
};

function creeAgentTexteurStandard(estDW) {
    if (estDW != true) estDW = false;
    let unAgentTexteur = new AgentTexteurStd();
    if (estDW) {
        unAgentTexteur.jeSUISAPI = false;
        unAgentTexteur.jeSuisLiayAPI = false;
        unAgentTexteur.jAiPlusieursElementsAPI = false;
        unAgentTexteur.mesElementsPourDW = mesElementsPourDW;
        unAgentTexteur.monElementPourDW = monElementPourDW;
    } else {
        unAgentTexteur.jeSUISAPI = jeSUISAPI || jeSuisLiayAPI;
        unAgentTexteur.jeSuisLiayAPI = jeSuisLiayAPI;
        unAgentTexteur.monElementPourAPI = monElementPourAPI;
        unAgentTexteur.mesElementsPourAPI = mesElementsPourAPI;
        unAgentTexteur.jAiPlusieursElementsAPI = jAiPlusieursElementsAPI;
    }
    unAgentTexteur.estDW = estDW;
    if (estSafariWebex() && estVersionInferieure(mesDonneesGlobales.versionSafari, "16.1")) {
        unAgentTexteur.monSafariRangeSelection = monSafariRangeSelection;
        unAgentTexteur.monSafariRangeDebutSelection = monSafariRangeDebutSelection;
        unAgentTexteur.monSafariNoeudDebutSelection = monSafariNoeudDebutSelection;
        unAgentTexteur.monSafariDecalageNoeudDebut = monSafariDecalageNoeudDebut;
        unAgentTexteur.monSafariRangeFinSelection = monSafariRangeFinSelection;
        unAgentTexteur.monSafariNoeudFinSelection = monSafariNoeudFinSelection;
        unAgentTexteur.monSafariDecalageNoeudFin = monSafariDecalageNoeudFin;
    }
    return unAgentTexteur;
};

function creeAgentTexteurAPI(msg) {
    var typeElementAPI = donneTypeElementAPI();
    if (typeElementAPI == cstTypeElementAPI.elementStandard) {
        return creeAgentTexteurStandard();
    } else if (typeElementAPI == cstTypeElementAPI.elementFormulaire) {
        return creeAgentTexteurFormulaire();
    }
};

function creeAgentTexteurDW(msg) {
    let typeElementDW = donneTypeElementDW();
    if (estGutenberg()) {
        return creeAgentTexteurWordpress(true);
    } else if (typeElementDW == cstTypeElementAPI.elementStandard) {
        return creeAgentTexteurStandard(true);
    } else if (typeElementDW == cstTypeElementAPI.elementFormulaire) {
        return creeAgentTexteurFormulaire(true);
    }
}

function creeAgentTexteur(msg) {
    var uneFenetre = window;
    var nbEditeursGrav = trouveEditeurGrav();
    let unAgentTexteur;
    if (jeSuisLiayAPI) {
        unAgentTexteur = creeAgentTexteurAPI(msg);
    } else {
        jeSUISAPI = false;
        if (donneSiEstGoogleApps()) {
            unAgentTexteur = new AgentTexteurGoogleDocs();
        } else if (estGutenberg()) {
            unAgentTexteur = creeAgentTexteurWordpress();
        } else if (nbEditeursGrav > 0) {
            unAgentTexteur = new AgentTexteurGrav();
            var unMessage = donneNomMessage(msg);
            if (unMessage == "DonneTextePourOutilsAWeb")
                unMessage = "_pb12d";
            var edit_arg = {
                type: cstTypeMessageContentScript,
                message: unMessage,
                _dib29: nbEditeursGrav
            };
            window.postMessage(edit_arg, "*");
        } else if (corrigeLesFormulaire() && !estThunderbird()) {
            unAgentTexteur = creeAgentTexteurFormulaire();
        } else {
            unAgentTexteur = creeAgentTexteurStandard();
        }
        if (msg.outil !== undefined) unAgentTexteur.monOutil = msg.outil;
    }
    unAgentTexteur.monPort = monPort;
    jeSUISAPI = false;
    return unAgentTexteur;
};

function trouveChamp(leDocument, leID) {
    if (leDocument == null) return null;
    let unChamp = DetecteurWeb.objetBoutonsZones[leID] !== undefined ? DetecteurWeb.objetBoutonsZones[leID].zone : null;
    if (unChamp == null || unChamp === undefined) {
        var iframes = leDocument.getElementsByTagName(cstNomNoeudIframe);
        if (iframes != null) {
            for (var i = 0; i < iframes.length && (unChamp == null || unChamp === undefined); i++) {
                try {
                    if (estSrcAccessible(iframes[i].src) && estElementAccessible(iframes[i])) {
                        unChamp = trouveChamp(iframes[i].contentDocument, leID);
                    } else {}
                } catch (erreur) {
                    console.error("antidote.trouveChamp", erreur);
                }
            }
        }
    }
    return unChamp;
};

function creeAgentTexteurSelonID(leID, estDW) {
    if (estDW != true) estDW = false;
    if (estDW) {
        mesElementsPourDW = [];
        monElementPourDW = trouveChamp(document, leID);
        return creeAgentTexteurDW({});
    } else {
        mesElementsPourAPI = [];
        jeSUISAPI = true;
        _jeSuisLiayAPI = true;
        jAiPlusieursElementsAPI = false;
        monElementPourAPI = trouveChamp(document, leID);
        return creeAgentTexteurAPI({});
    }
};

function donneUrlImage(lImage) {
    var uneChaine = "";
    if (estFureteurWebExtension())
        uneChaine = fureteur.extension.getURL("../images/" + lImage);
    else if (estSafari())
        uneChaine = safari.extension.baseURI + lImage;
    return uneChaine;
};
var monCoeur = null;

function envoieVersBackground(lesArguments) {
    if (monPort == null) return;
    lesArguments.estLandingPage = document.getElementById('Druide.PageLocale') != null;
    lesArguments.type = "";
    lesArguments._id = gIdPage;
    if (estPageCorrecteurAntidoteWeb()) {
        lesArguments._dib107 = cstSourceScriptAWeb;
        lesArguments._dib108 = "";
        lesArguments._dib105 = cstTypeMessageRequete;
        lesArguments._dib104 = gIdAntidote;
        lesArguments.estAWeb = true;
    } else if (lesArguments.estLandingPage) {
        lesArguments._dib107 = cstSourceScriptPage;
        lesArguments._dib105 = cstTypeMessageRequete;
        lesArguments._dib104 = gIdAntidote;
        lesArguments.estAWeb = false;
    } else {
        lesArguments._dib108 = lesArguments._dib107;
        lesArguments._dib107 = cstSourceScriptPage;
        lesArguments._dib105 = cstTypeMessageReponse;
        lesArguments._dib104 = gIdAntidote;
        lesArguments.estAWeb = false;
    }
    if (estFureteurWebExtension()) {
        try {
            monPort.postMessage(lesArguments);
        } catch (erreur) {
            console.error("antidote.envoieVersBackground", erreur);
        }
    }
};

function donneNomMessage(msg) {
    var uneChaine = "";
    if (estSafari())
        uneChaine = msg.message.message;
    else if (estFureteurWebExtension())
        uneChaine = msg.message;
    return uneChaine;
};

function donneArgumentsMessage(msg) {
    var desArguments = null;
    if (estSafari()) {
        desArguments = msg.message;
    } else if (estFureteurWebExtension()) {
        desArguments = msg;
    }
    return desArguments;
};

function activeAntidoteAPI_JSConnect(leDocument) {
    if (leDocument === undefined)
        leDocument = document;
    var mesBoutonAPI = leDocument.querySelectorAll('*[data-antidoteapi_jsconnect_lanceoutil]');
    if (mesBoutonAPI != null) {
        for (var i = 0; i < mesBoutonAPI.length; i++) {
            var estInit = mesBoutonAPI[i].dataset.antidoteapi_jsconnect_initlistener;
            if (estInit == null || !estInit || estInit == "false") {
                mesBoutonAPI[i]._dib29 = mesBoutonAPI[i].dataset.antidoteapi_jsconnect_lanceoutil;
                mesBoutonAPI[i].addEventListener('click', onclickOutil, false);
                mesBoutonAPI[i].dataset.antidoteapi_jsconnect_initlistener = true;
            }
        }
    }
    var mesBoutonIgnoeMAO = leDocument.querySelectorAll('*[data-antidote_mao_ignore]');
    if (mesBoutonIgnoeMAO != null) {
        for (var i = 0; i < mesBoutonIgnoeMAO.length; i++) {
            var estInit = mesBoutonIgnoeMAO[i].dataset.antidoteapi_jsconnect_initlistener;
            if (estInit == null || !estInit || estInit == "false") {
                mesBoutonIgnoeMAO[i]._dib29 = mesBoutonIgnoeMAO[i].dataset.antidote_mao_ignore;
                mesBoutonIgnoeMAO[i].addEventListener('click', onclickMAOIgnore, false);
                mesBoutonIgnoeMAO[i].dataset.antidoteapi_jsconnect_initlistener = true;
            }
        }
    }
};

function desactiveAntidoteAPI_JSConnect(leDocument) {
    try {
        if (leDocument === undefined)
            leDocument = document;
        var mesBoutonAPI = leDocument.querySelectorAll('*[data-antidoteapi_jsconnect_lanceoutil]');
        if (mesBoutonAPI != null) {
            for (var i = 0; i < mesBoutonAPI.length; i++) {
                var estInit = mesBoutonAPI[i].dataset.antidoteapi_jsconnect_initlistener;
                if (estInit != null && (estInit || estInit == "true")) {
                    mesBoutonAPI[i].removeEventListener('click', onclickOutil, false);
                    mesBoutonAPI[i].dataset.antidoteapi_jsconnect_initlistener = false;
                }
            }
        }
    } catch (erreur) {
        console.error("antidote.desactiveAntidoteAPI_JSConnect", erreur);
    }
};

function donneTypeElementAPI() {
    var unElementAPI = null;
    if (monElementPourAPI != null) {
        if (!contientElementFormulaire(monElementPourAPI))
            return cstTypeElementAPI.elementStandard;
    } else {
        for (var i = 0; i < mesElementsPourAPI.length; i++) {
            if (!contientElementFormulaire(mesElementsPourAPI[i].value))
                return cstTypeElementAPI.elementStandard;
        }
    }
    return cstTypeElementAPI.elementFormulaire;
}

function donneTypeElementDW() {
    if (monElementPourDW != null) {
        if (!contientElementFormulaire(monElementPourDW)) return cstTypeElementAPI.elementStandard;
        else {
            for (let e of mesElementsPourDW) {
                if (!contientElementFormulaire(e.value)) return cstTypeElementAPI.elementStandard;
            }
        }
    }
    return cstTypeElementAPI.elementFormulaire;
}

function lieChamps(leDocument, leNoeud) {
    var _jeSuisLiayAPI = false;
    var unGroupe = leNoeud.getAttribute("data-antidoteapi_jsconnect_groupe_id");
    if (unGroupe != null && unGroupe != "") {
        var uneListeElement = leDocument.querySelectorAll('*[data-antidoteapi_jsconnect_groupe_id="' + unGroupe + '"]');
        var unNombreElement = uneListeElement.length;
        jAiPlusieursElementsAPI = false;
        for (var k = 0; k < unNombreElement; k++) {
            _jeSuisLiayAPI = true;
            mesElementsPourAPI.push(new referenceObjet(uneListeElement[k]));
        }
    }
    try {
        var iframes = leDocument.getElementsByTagName(cstNomNoeudIframe);
        if (iframes != null) {
            for (var i = 0; i < iframes.length; i++) {
                if (iframes[i].contentDocument)
                    _jeSuisLiayAPI = lieChamps(iframes[i].contentDocument, leNoeud) || _jeSuisLiayAPI;
            }
        }
    } catch (erreur) {
        console.error("antidote.lieChamps", erreur);
    }
    return _jeSuisLiayAPI;
};

function gestionnaireReponseAppsScript(msg) {
    var edit_arg = msg.arguments;
    edit_arg._dib105 = cstTypeMessageReponse;
    if (msg._dib58 == cstFctDonneTexte) {
        gAgentTexteur.monTexteGoogleDocs = msg.reponse;
        gAgentTexteur.monTexteGoogleDocsActuel = gAgentTexteur.monTexteGoogleDocs;
        if (estSafari()) {
            gestionnaireMessageDuBkg({
                name: edit_arg.message,
                message: edit_arg
            });
        } else {
            gestionnaireMessageDuBkg(edit_arg);
        }
    } else if (msg._dib58 == cstFctRemplaceIntervalle) {
        if (msg.reponse == cstReussi) {
            gAgentTexteur.monTexteGoogleDocsActuel = gAgentTexteur.monTexteGoogleDocs;
            gAgentTexteur.maListeCorrections = [];
        }
        edit_arg._dib29 = msg.reponse == cstReussi;
        envoieVersBackground(edit_arg);
    } else if (uneFonction == cstFctTest) {
        if (msg.reponse == cstReussi) {
            gGoogleAppsScriptAcceptay = true;
            edit_arg.message = "_dib65";
            edit_arg._dib62 = varGoogleAppsScriptAcceptay;
            edit_arg.lanceOutil = false;
            envoieVersBackground(edit_arg);
        } else {}
    }
};

function VerifieActivationGoogleAppsScriptEtLanceAntidote(desArguments) {};
async function gestionnaireMessageDuBkg(msg, port) {
    var unMessage = donneNomMessage(msg);
    var desArguments = donneArgumentsMessage(msg);
    if (msg.donnees_globales !== undefined) {
        mesDonneesGlobales = msg.donnees_globales;
        if (estThunderbird()) initOutilsThunderbird();
        gIdAntidote = mesDonneesGlobales.idAntidote;
        gestionTraduction.convertisLangue(mesDonneesGlobales.langue);
        if (document.readyState === "loading") {
            window.addEventListener("DOMContentLoaded", () => {
                if (typeof DetecteurWeb !== "undefined") {
                    DetecteurWeb.activeDetecteurWeb(msg);
                }
            });
        } else {
            if (typeof DetecteurWeb !== "undefined") {
                DetecteurWeb.activeDetecteurWeb(msg);
            }
        }
        if (estSafariWebex() && estVersionInferieure(mesDonneesGlobales.versionSafari, "16.1") && !ecouteurVieuxSafariActif) {
            ecouteurVieuxSafariActif = true;

            function actionSurSelectionRiche(evSurSelection) {
                var elementActif = evSurSelection.view.document.activeElement;
                if (!estInput(elementActif) && !estTextarea(elementActif)) {
                    monSafariFormulaireElement = null;
                    var uneSelection = evSurSelection.view.getSelection();
                    if (uneSelection && uneSelection.rangeCount > 0) {
                        monSafariRangeSelection = uneSelection.getRangeAt(0);
                        if (monSafariRangeSelection) {
                            monSafariRangeDebutSelection = monSafariRangeSelection.cloneRange();
                            monSafariRangeDebutSelection.collapse(true);
                            monSafariNoeudDebutSelection = monSafariRangeSelection.startContainer;
                            monSafariDecalageNoeudDebut = monSafariRangeSelection.startOffset;
                            monSafariRangeFinSelection = monSafariRangeSelection.cloneRange();
                            monSafariRangeFinSelection.collapse(false);
                            monSafariNoeudFinSelection = monSafariRangeSelection.endContainer;
                            monSafariDecalageNoeudFin = monSafariRangeSelection.endOffset;
                        }
                    }
                }
            }

            function actionSurSelectionFormulaire(evSurSelection) {
                monSafariRangeSelection = null;
                monSafariFormulaireElement = evSurSelection.target.ownerDocument.activeElement;
                monSafariFormulaireDebutSelection = monSafariFormulaireElement.selectionStart;
                monSafariFormulaireFinSelection = monSafariFormulaireElement.selectionEnd;
            }
            window.addEventListener("mouseup", actionSurSelectionRiche, false);
            window.addEventListener("select", actionSurSelectionFormulaire, false);
            var iframes = document.getElementsByTagName(cstNomNoeudIframe);
            if (iframes != null) {
                for (var i = 0; i < iframes.length; i++) {
                    try {
                        if ((iframes[i].src == "" || verifieMemeOrigine(document.URL, iframes[i].src)) && iframes[i].contentWindow) {
                            iframes[i].contentWindow.addEventListener("mouseup", actionSurSelectionRiche, false);
                            iframes[i].contentWindow.addEventListener("select", actionSurSelectionFormulaire, false);
                        }
                    } catch (erreur) {
                        console.error("antidote.gestionnaireMessageDuBkg.1", erreur);
                    }
                }
            }
            let observer = new MutationObserver(callback);

            function callback(mutations) {
                for (let m of mutations) {
                    if (m.addedNodes.length > 0) {
                        if (estIFrame(m.addedNodes[0])) {
                            if ((m.addedNodes[0].src == "" || verifieMemeOrigine(document.URL, m.addedNodes[0].src) && estElementAccessible(m.addedNodes[0])) && m.addedNodes[0].contentWindow) {
                                m.addedNodes[0].contentWindow.addEventListener("mouseup", actionSurSelectionRiche, false);
                                m.addedNodes[0].contentWindow.addEventListener("select", actionSurSelectionFormulaire, false);
                            }
                        }
                    }
                }
            }
            try {
                if (document.body) {
                    observer.observe(document.body, {
                        childList: true,
                        attributes: true,
                        subtree: true,
                        attributeOldValue: true,
                    });
                }
            } catch (erreur) {
                console.error("antidote.gestionnaireMessageDuBkg.2", erreur);
            }
        }
    }
    if (unMessage == "dw-comm" || unMessage == "dw-message") {
        let C = new CustomEvent('message_dw-comm', {
            detail: JSON.stringify(msg)
        });
        window.dispatchEvent(C);
        return;
    }
    if (unMessage == "clicorrsi-comm") {
        window.postMessage(msg, "*");
        return;
    }
    if (unMessage == "beta-comm") {
        let C = new CustomEvent('message_beta-comm', {
            detail: JSON.stringify(msg)
        });
        window.dispatchEvent(C);
        return;
    }
    if (unMessage == "focus_safari" && desArguments.idfocus == gIdPage) {
        envoieVersBackground(desArguments);
        return;
    }
    if (unMessage == "reponseAppsScript") {
        gestionnaireReponseAppsScript(desArguments);
    } else if (unMessage == "etablisConnexion") {
        envoieVersBackground({
            message: "_dib94"
        });
    } else if (unMessage == "reactiveDW") {
        DetecteurWeb.reinstalleBouton(msg.id);
    } else if (unMessage == "supprimeDW") {
        DetecteurWeb.desinstalleBouton(msg.id, true);
    } else if (unMessage == "indiqueChamp") {
        DetecteurWeb.indiqueChamp(msg.id, msg.etat);
    } else if (unMessage == "_dib01") {
        desArguments.message = "_dib94";
        desArguments._dib29 = false;
        desArguments.estOffice365Online = estOfficeOnline();
        desArguments.estSiteIncompatibleAvecDW = jAiDetcteurWebDispo ? siteEstIncompatibleAvecDW() : true;
        desArguments.estPageAWeb = false;
        envoieVersBackground(desArguments);
    } else if (unMessage == "init") {
        mesDonneesGlobales = msg.donnees_globales;
        if (typeof gestionnaireAntiOups !== "undefined") {
            await gestionnaireAntiOups.init(desArguments);
        }
    } else if (unMessage == "metsAjourEtatDWeb") {} else if (unMessage == "metsAJourIdAntidote") {} else if (unMessage == "_dib40") {
        afficheDialogueOKouOuiNon(desArguments, cstMessageAlertePlugicielAbsent, cstExplicationAlertePlugicielAbsent);
    } else if (unMessage == "_dib41") {
        afficheDialogueOKouOuiNon(desArguments, desArguments._dib37, desArguments.explication);
    } else if (unMessage == "afficheDialogueOuiNon") {
        desArguments.alerteOuiNon = true;
        afficheDialogueOKouOuiNon(desArguments, desArguments._dib37, desArguments.explication);
    } else if (unMessage == "_dib42") {
        _dib42(desArguments._dib37, desArguments.explication);
    } else if (unMessage == "_dib43") {
        _dib43();
    } else if (unMessage == "_dib44") {} else if (unMessage == "_dib25") {
        nettoie();
    } else if (unMessage == "_dib46") {
        correcteurOuvert = true;
        let estFormulaire = corrigeLesFormulaire();
        let estSurThunderbird = estThunderbird();
        if (desArguments.outil !== "C1" && !gAgentTexteur || (!estSurThunderbird && gAgentTexteur && gAgentTexteur instanceof AgentTexteurStd && estFormulaire) || (!estSurThunderbird && gAgentTexteur && gAgentTexteur instanceof AgentTexteurFormulaire && !estFormulaire)) {
            gAgentTexteur = creeAgentTexteur(msg);
        } else if (desArguments.outil === "C1") {
            gAgentTexteur = creeAgentTexteur(msg);
        }
        var uneFenetre = null;
        var unURL = "";
        try {
            if (donneSiEstGoogleApps()) {
                uneFenetre = window;
            } else {
                uneFenetre = trouvePremiereFenetreAvecSelection(window);
                if (uneFenetre == null) {
                    uneFenetre = window;
                }
            }
            unURL = uneFenetre.document.URL;
        } catch (erreur) {
            console.error("antidote.gestionnaireMessageDuBkg.3", erreur);
            unURL = window.document.URL;
            uneFenetre = window;
        }
        desArguments.message = "_dib26";
        desArguments.url = unURL;
        desArguments.appelayPar = desArguments.appelayPar !== undefined ? desArguments.appelayPar : "";
        desArguments.idFenetreAntiOups = desArguments.idFenetreAntiOups !== undefined ? desArguments.idFenetreAntiOups : "";
        if (desArguments.idFenetreAntiOups !== "") desArguments.idCommunicationDocument = desArguments.idFenetreAntiOups;
        try {
            desArguments._dib29 = estElementAccessible(document);
        } catch (erreur) {
            console.error("antidote.gestionnaireMessageDuBkg.4", erreur);
            desArguments._dib29 = false
        }
        if (!desArguments._dib29) {
            afficheElementNonAccessible(document);
        }
        if (!desArguments._dib29 && estWordPressBlocEditor()) {
            var desArguments = {
                alerteOuiNon: true,
                messageReponse: "ouvrePageWordPress"
            };
            afficheDialogueOKouOuiNon(desArguments, cstMessageDomaineWordPress, cstExplicationDomaineWordPress);
        } else {
            envoieVersBackground(desArguments);
        }
    } else if (unMessage == "_dib27") {
        var unURL = "";
        try {
            var uneFenetre = null;
            if (donneSiEstGoogleApps()) {
                uneFenetre = window;
            } else {
                uneFenetre = trouvePremiereFenetreAvecSelection(window);
                if (uneFenetre == null)
                    uneFenetre = window;
            }
            unURL = uneFenetre.document.URL;
        } catch (erreur) {
            console.error("antidote.gestionnaireMessageDuBkg.5", erreur);
            unURL = "";
        }
        desArguments.message = "_dib47";
        desArguments.url = unURL;
        envoieVersBackground(desArguments);
    } else if (unMessage == "donneFavIconUrl") {
        demandeFavIconUrl();
        setTimeout(function() {
            desArguments.iconeApplication = donneFavIconUrl();
            envoieVersBackground(desArguments);
        }, 100);
    } else if (unMessage == "preInitialisationCommunication") {
        gestionTraduction.metsLaLangue(desArguments.langue);
        envoieVersBackground(desArguments);
    } else if (unMessage == "_pb12d") {
        if (true) {
            if (msg.idAppelant === undefined || msg.idAppelant == "") {} else {
                let estDW = msg.idAppelant && msg.idAppelant.startsWith("dw.");
                gAgentTexteur = creeAgentTexteurSelonID(msg.idAppelant, estDW);
            }
            if (!!msg.idAO && !!gestionnaireAntiOups.fenetres[msg.idAO]) {
                gestionnaireAntiOups.fenetres[msg.idAO].agentTexteur = gAgentTexteur;
            }
        } else {
            gAgentTexteur = (gAgentTexteur != null && desArguments.actualisation !== undefined) ? gAgentTexteur : creeAgentTexteur(msg);
        }
        gAgentTexteur.faisInitialise(desArguments);
        jeSuisMAO = false;
    } else if (unMessage == "DonneTextePourOutilsAWeb") {
        jeSuisMAO = false;
        gIdAntidote = cstIdAntidoteWeb;
        if (gAgentTexteurOutils == null)
            gAgentTexteurOutils = creeAgentTexteur(msg);
        gAgentTexteurOutils.faisInitPourOutils(desArguments);
        gAgentTexteurOutils.faisDonneTextePourOutils(desArguments);
    } else if (unMessage == "ReponseSorteIntervention" && !estSafariAppex()) {
        miniAntiOupsMettreAJour(desArguments);
    } else if (unMessage == "_pb2d") {
        if (!!msg.idAO && !!gestionnaireAntiOups.fenetres[msg.idAO] && !!gestionnaireAntiOups.fenetres[msg.idAO].agentTexteur) {
            gAgentTexteur = gestionnaireAntiOups.fenetres[msg.idAO].agentTexteur;
        }
        if (gAgentTexteur == null) {
            desArguments._dib29 = true;
            envoieVersBackground(desArguments);
        } else {
            if (gAgentTexteur.monOutil == "C0" || gAgentTexteur.monOutil == "C1" || gAgentTexteurOutils == null) {
                gAgentTexteur.faisDocEstMort(desArguments);
            } else {
                gAgentTexteurOutils.faisDocEstMort(desArguments);
            }
        }
    } else if (unMessage == "ChangerVariablesAO" || unMessage == "AfficheDialogueAO" || unMessage == "AfficheDialogueAO12" || unMessage == "DonneTextePourEnregistreCourriel" || unMessage == "EnvoieCourriel" || unMessage == "AfficheAlerteEphemere" || unMessage == "FermeDialogueAO" || unMessage == "EnvoieRequeteIntervention") {
        try {
            traiteMessageAntiOups(msg);
        } catch (e) {}
    } else if (unMessage == cstMessageChangeTypeAppAntidote) {
        DetecteurWeb.desinstalleBoutons();
    } else if (gAgentTexteur != null) {
        if (unMessage == "_pb41d") {
            gAgentTexteur.faisDebuteCorrectionAutomatique(desArguments);
        } else if (unMessage == "donneTextePourOutils") {
            gAgentTexteurOutils.faisDonneTextePourOutils(desArguments);
        } else if (unMessage == "_pb15d") {
            gAgentTexteur.faisPeutCorriger(desArguments);
        } else if (unMessage == "CorrigeAvecContexte") {
            let unAgentTexteur = gAgentTexteur;
            if (!unAgentTexteur.estDW) {
                if (mesElementsPourAPI.length > 0) {
                    let unElement = mesElementsPourAPI[decodeChaineDeJson(desArguments._dib99)];
                    if (estTextarea(unElement.value) || estInput(unElement.value)) {
                        unAgentTexteur = creeAgentTexteurFormulaire();
                        unAgentTexteur.faisInitPourCorrecteur();
                    }
                }
            } else {
                if (mesElementsPourDW.length > 0) {
                    let unElement = mesElementsPourDW[decodeChaineDeJson(desArguments._dib99)];
                    if (estTextarea(unElement.value) || estInput(unElement.value)) {
                        unAgentTexteur = creeAgentTexteurFormulaire(true);
                        unAgentTexteur.faisInitPourCorrecteur();
                    }
                }
            }
            unAgentTexteur.faisCorrigeAvecContexte(desArguments);
            if (typeof DetecteurWeb !== "undefined" || unAgentTexteur.estDW) DetecteurWeb.metsAJourDetection(desArguments);
        } else if (unMessage == "_pb1d") {
            gAgentTexteur.faisCorrigeDansTexteur(desArguments);
            if (typeof DetecteurWeb !== "undefined") DetecteurWeb.metsAJourDetection(desArguments);
        } else if (unMessage == "_pb10d") {
            gAgentTexteur.faisInitPourCorrecteur(desArguments);
        } else if (unMessage == "_pb11d") {
            gAgentTexteurOutils = creeAgentTexteur(msg);
            gAgentTexteurOutils.faisInitPourOutils(desArguments);
        } else if (unMessage == "_pb16d") {
            gAgentTexteurOutils.faisRemplaceSelection(desArguments);
            if (typeof DetecteurWeb !== "undefined") DetecteurWeb.metsAJourDetection(desArguments);
        } else if (unMessage == "_pb17d") {
            gAgentTexteur.faisRetourneAuTexteur(desArguments);
        } else if (unMessage == "_pb18d") {
            correcteurOuvert = false;
            gAgentTexteur.faisRompsLienTexteur(desArguments);
            gAgentTexteur = null;
        } else if (unMessage == "_pb19d") {
            correcteurOuvert = false;
            gAgentTexteur.faisRompsLienCorrecteur(desArguments);
            jeSuisConnectay = false;
        } else if (unMessage == "_pb20d") {
            gAgentTexteurOutils.faisSelectionneApresRemplace(desArguments);
        } else if (unMessage == "_pb21d") {
            gAgentTexteur.faisSelectionneIntervalle(desArguments);
        } else if (unMessage == "_pb36d") {
            desArguments.estCorrecteur = gAgentTexteur.monOutil == chaineCommandeC0 || gAgentTexteur.monOutil == chaineCommandeC1;;
            if (!gAgentTexteur.estDW) gAgentTexteur.mesElementsPourAPI = mesElementsPourAPI;
            else gAgentTexteur.mesElementsPourDW = mesElementsPourDW;
            if (!!msg.idAO && !!gestionnaireAntiOups.fenetres[msg.idAO] && !!gestionnaireAntiOups.fenetres[msg.idAO].agentTexteur) {
                gAgentTexteur = gestionnaireAntiOups.fenetres[msg.idAO].agentTexteur;
            }
            gAgentTexteur.faisDonneLesZonesACorriger(desArguments);
        } else if (unMessage == "_pb28d") {
            gAgentTexteur.faisTermineCorrectionAutomatique(desArguments);
        }
    }
};

function showAuthPrompt(leUrl) {
    leUrl = leUrl.decodeEscapeSequence();
    var unUrl = "";
    var unePos = leUrl.indexOf(cstChaineBackSlash);
    while (unePos > 0) {
        unUrl += leUrl.substring(0, unePos);
        leUrl = leUrl.substring(unePos + 1, leUrl.length);
        unePos = leUrl.indexOf(cstChaineBackSlash);
    }
    unUrl += leUrl;
    var hauteur = 500;
    var largeur = 654;
    var offsetY = (screen.height - hauteur) / 2;
    var offsetX = (screen.width - largeur) / 2;
    var uneChainePosition = "height=" + hauteur + ",width=" + largeur + ",top=" + offsetY + ",left=" + offsetX;
    window.open(unUrl, "_blank", uneChainePosition);
    var authRequired = document.getElementById('auth-required');
    var authLoading = document.getElementById('auth-loading');
    if (authRequired && authRequired.classList) {
        authRequired.classList.add('auth-loading-hidden');
        authLoading.classList.remove('auth-loading-hidden');
    }
};

function afficheAutorisationGoogleDocs(lesArguments) {};

function _dib43() {};

function _dib42(leMessage, leExplication) {};

function demandeFavIconUrl() {
    var favicon = undefined;
    var nodeList = document.getElementsByTagName("link");
    for (var i = 0; i < nodeList.length; i++) {
        if ((nodeList[i].getAttribute("rel") == "icon shortcut") || (nodeList[i].getAttribute("rel") == "shortcut icon")) {
            favicon = nodeList[i].getAttribute("href");
        }
    }
    if (favicon === undefined) {
        gFavIcon = "";
    } else {
        faviconSuffix = favicon.substr(0, 4);
        if (faviconSuffix.indexOf("http") == -1) {
            favicon = window.document.location.protocol + "//" + window.document.location.hostname + "/" + favicon;
        }
        toDataURL(favicon, function(dataUrl) {
            gFavIcon = dataUrl;
        });
    }
};

function donneFavIconUrl() {
    return gFavIcon;
};
async function afficheDialogueOKouOuiNon(lesArguments, leMessage, leExplication) {
    var uneExplication = "";
    var unMessage = "";
    if (estSafari()) {
        unMessage = gestionTraduction.Tr_(leMessage, "");
        if (typeof leExplication === "string") {
            uneExplication = gestionTraduction.Tr_(leExplication, "");
        } else {
            for (var i = 1; i < leExplication.length; i++) {
                leExplication[i] = gestionTraduction.Tr_(leExplication[i], "");
            }
            uneExplication = gestionTraduction.UniFmt_(leExplication[0], leExplication);
        }
    } else {
        unMessage = leMessage;
        uneExplication = leExplication;
    }
    if (lesArguments.alerteOuiNon == true) {
        let r = await afficheDialogue({
            message: "dialogue",
            plateforme: mesDonneesGlobales.plateforme,
            titre_dialogue: unMessage,
            explication_dialogue: uneExplication,
            bouton_ok: {
                texte_dialogue: lesArguments.chaine_ok !== undefined ? lesArguments.chaine_ok : "OK",
                retour: "ok"
            },
            bouton_annuler: {
                texte_dialogue: lesArguments.chaine_annuler !== undefined ? lesArguments.chaine_annuler : gestionTraduction.Tr_(cstNomBoutonAnnuler),
                retour: "annulation"
            }
        });
        let uneReponse = r == "ok";
        if (lesArguments.messageReponse == "ouvrePageWordPress") {
            if (uneReponse) {
                var unURL = trouveURLDocumentWordPressEditable();
                if (unURL !== undefined && unURL.length > 0) {
                    var edit_arg = {
                        message: "ouvrePageAvecURL",
                        url: unURL
                    };
                    envoieVersBackground(edit_arg);
                }
            }
        } else {
            var edit_arg = {
                message: lesArguments.messageReponse,
                _dib29: uneReponse,
                identifiant_requete_dialogue: lesArguments.identifiant_requete_dialogue
            };
            envoieVersBackground(edit_arg);
        }
    } else {
        let r = await afficheDialogue({
            message: "dialogue",
            plateforme: mesDonneesGlobales.plateforme,
            titre_dialogue: unMessage,
            explication_dialogue: uneExplication,
            bouton_ok: {
                texte_dialogue: "OK",
                retour: "ok"
            }
        });
        var edit_arg = {
            message: lesArguments.messageReponse,
            identifiant_requete_dialogue: lesArguments.identifiant_requete_dialogue
        };
        envoieVersBackground(edit_arg);
        if (lesArguments.code !== undefined && lesArguments.code == "erreur_cross_origin") {
            if (mesAttributsIframeNoAccess != "") {
                monIframeNoAccess.setAttribute(monAttributTmp, mesAttributsIframeNoAccess);
                monIframeNoAccess = null;
                mesAttributsIframeNoAccess = "";
                monAttributTmp = "";
            } else {
                monIframeNoAccess.removeAttribute(monAttributTmp);
            }
        }
    }
};

function estAPIAvecFormulaire() {
    var unElementAPI = null;
    if (jeSuisATRiche)
        return false;
    if (jeSuisLiayAPI) {
        if (mesElementsPourAPI.length > 0) {
            unElementAPI = mesElementsPourAPI[0].value;
        } else if (monElementPourAPI != null) {
            unElementAPI = monElementPourAPI;
        }
    }
    return contientElementFormulaire(unElementAPI);
};
var monIdMaoLanceOutil = "";

function onclickOutil(ev) {
    lanceOutilConnect(this);
};

function lanceOutilConnect(leNoeud) {
    var unOutil = leNoeud.dataset.antidoteapi_jsconnect_lanceoutil !== undefined ? leNoeud.dataset.antidoteapi_jsconnect_lanceoutil + "0" : "C0";
    let jsconnectid = chaine_aleatoire();
    leNoeud.dataset.jsconnectid = jsconnectid;
    var edit_arg = {
        message: "lanceOutilAntidote",
        outil: unOutil,
        type: "MessageVersWindowTop",
        idGroupe: leNoeud.dataset.antidoteapi_jsconnect_groupe_id,
        jsconnectid: jsconnectid
    };
    parent.postMessage(edit_arg, "*");
}

function gestionnaireMessageAntidoteAPIJSConnect(event) {
    if (event.data.type != cstTypeMessageAPIJSConnect && event.data.type != cstTypeMessageContentScriptAntidoteAPIJSConnect)
        return;
    var unMessage = event.data.message;
    var uneValeur = "";
    if (unMessage == "activeAntidoteAPI_JSConnect") {
        activeAntidoteAPI_JSConnect(event.target.document);
    }
    if (unMessage == "desactiveAntidoteAPI_JSConnect") {
        desactiveAntidoteAPI_JSConnect(event.target.document);
    }
    if (unMessage == "lanceOutilConnect") {
        let unNoeud = document.querySelectorAll('*[data-antidoteapi_jsconnect_groupe_id="' + event.data.id + '"]')[0];
        lanceOutilConnect(unNoeud);
    }
};
window.addEventListener("message", function(event) {
    if (event.data.type != "TypeContentScriptAntidoteAPIJSConnectAnnonce")
        return;
    if (event.data.message == "annoncePresence") {
        annoncePresence();
    }
}, false);

function gestionnaireMessageIframe(event) {
    if (event.data.type != "MessageVersWindowTop")
        return;
    let n = document.querySelectorAll('*[data-jsconnectid="' + event.data.jsconnectid + '"]');
    if (n.length == 0) {
        var iframes = document.getElementsByTagName(cstNomNoeudIframe);
        if (iframes != null) {
            for (var i = 0; i < iframes.length; i++) {
                if (n.length == 0)
                    n = iframes[i].contentDocument.querySelectorAll('*[data-jsconnectid="' + event.data.jsconnectid + '"]');
            }
        }
    }
    jeSUISAPI = true;
    if (monIdMaoLanceOutil != event.data.idGroupe) {
        monIdMaoLanceOutil = event.data.idGroupe;
        gAgentTexteur = null;
    }
    if (event.data.outil == chaineCommandeC0) {
        mesElementsPourAPI = [];
        jeSuisLiayAPI = lieChamps(document, n[0]);
        if (mesElementsPourAPI.length == 1) {
            monElementPourAPI = mesElementsPourAPI[0].value;
            mesElementsPourAPI = [];
        } else if (mesElementsPourAPI.length > 1) {
            jAiPlusieursElementsAPI = true;
            monElementPourAPI = null;
        }
    }
    envoieVersBackground(event.data);
};

function annoncePresence() {
    let elementHtml = document.getElementsByTagName('html').item(0);
    if (!elementHtml) return;
    let estUnePageAvecAPI = elementHtml.getAttribute("antidoteapi_jsconnect");
    let head = document.getElementsByTagName('head').item(0);
    if (estUnePageAvecAPI != null && (estUnePageAvecAPI || estUnePageAvecAPI == "true")) {
        if (!document.getElementById("script_api_jsconnect")) {
            let script = document.createElement('script');
            script.src = donneUrlFichier(cstNomScriptAntidoteAPIJSConnect);
            script.id = "script_api_jsconnect";
            head.appendChild(script);
        }
        window.addEventListener("message", gestionnaireMessageAntidoteAPIJSConnect, false);
        if (window.top === window) {
            window.addEventListener("message", gestionnaireMessageIframe, false);
        }
        if (document.getElementById('antidoteapi_jsconnect_actif') == null) {
            try {
                var body = document.getElementsByTagName('body').item(0);
                var undiv = document.createElement('div');
                undiv.setAttribute("id", "antidoteapi_jsconnect_actif");
                undiv.setAttribute("style", "display: none;");
                undiv.setAttribute("antidoteapi_jsconnect_version", cstAntidoteAPIversion);
                body.appendChild(undiv);
            } catch (erreur) {
                console.error("antidote.annoncePresence", erreur);
            }
        }
        jeSuisATRiche = false;
        var considereAgentTexteurRiche = elementHtml.getAttribute("agenttexteurriche");
        if (considereAgentTexteurRiche != null && (considereAgentTexteurRiche || considereAgentTexteurRiche == "true")) {
            jeSuisATRiche = true;
        }
    }
    if (!document.getElementById("script_antidote_aide")) {
        let script = document.createElement('script');
        script.src = donneUrlFichier(cstNomScriptAntidoteAide);
        script.id = "script_antidote_aide";
        head.appendChild(script);
    }
};
var intervalleReveilBackground = 0;
var correcteurOuvert = false;

function actionAuChargement(e) {
    chargeay = true;
    if (gIdPage == "aucun") {
        var d = new Date();
        gIdPage = d.getTime() + chaine_aleatoire();
    }
    gestionTraduction.initAvecConstante(cstDict);
    if (estFureteurWebExtension()) {
        if (window.top === window && !monPort) {
            try {
                monPort = fureteur.runtime.connect({
                    name: "si-comm" + separateurElement + gIdPage
                });
                monPort.onDisconnect.addListener(function() {
                    monPort = null;
                    if (typeof DetecteurWeb !== "undefined") DetecteurWeb.detruisDetecteur();;
                    if (fureteur.runtime.lastError) {
                        var m = fureteur.runtime.lastError.message;
                    }
                });
                monPort.onMessage.addListener(gestionnaireMessageDuBkg);
                var estNoeudAweb = (document.getElementById('Druide.AntidoteWeb') != null);
                window.setTimeout(() => {
                    if (typeof DetecteurWeb !== "undefined") {
                        jAiDetcteurWebDispo = true;
                    }
                    var edit_arg = {
                        message: "_dib94",
                        estPageAWeb: estNoeudAweb,
                        estOffice365Online: estOfficeOnline(),
                        estSiteIncompatibleAvecDW: jAiDetcteurWebDispo ? siteEstIncompatibleAvecDW() : true,
                        _dib29: true
                    };
                    envoieVersBackground(edit_arg);
                }, 50);
                window.addEventListener("focus", actionRemiseEnAvantPlan, false);
            } catch (erreur) {
                console.error("antidote.actionAuChargement", erreur);
            }
        } else if (estPanneauConnecteurMSO() && estSafariWebex()) {
            monPort = fureteur.runtime.connect({
                name: "si-temp" + separateurElement + gIdPage
            });
            monPort.onDisconnect.addListener(function() {
                actionAuChargement(e);
                if (fureteur.runtime.lastError) {
                    var m = fureteur.runtime.lastError.message;
                }
            });
            envoieVersBackground({
                message: "injecte_office"
            });
        }
    }
    if (window.document.getElementById('AntidoteLanceCorrecteur') != null)
        window.document.getElementById('AntidoteLanceCorrecteur').addEventListener('click', function onclick(ev) {
            jeSUISAPI = true;
            var edit_arg = {
                message: "lanceOutilAntidote",
                outil: chaineCommandeC0
            };
            envoieVersBackground(edit_arg);
        });
    if (window.document.getElementById('AntidoteLanceDictionnaires') != null)
        window.document.getElementById('AntidoteLanceDictionnaires').addEventListener('click', function onclick(ev) {
            jeSUISAPI = true;
            var edit_arg = {
                message: "lanceOutilAntidote",
                outil: chaineCommandeD0
            };
            envoieVersBackground(edit_arg);
        });
    if (window.document.getElementById('AntidoteLanceGuides') != null)
        window.document.getElementById('AntidoteLanceGuides').addEventListener('click', function onclick(ev) {
            jeSUISAPI = true;
            var edit_arg = {
                message: "lanceOutilAntidote",
                outil: chaineCommandeG0
            };
            envoieVersBackground(edit_arg);
        });
    window.addEventListener("DOMContentLoaded", () => {
        if (intervalleReveilBackground == 0) {
            intervalleReveilBackground = setInterval(() => {
                if (correcteurOuvert || (DetecteurWeb.doitResterReveillay !== undefined && DetecteurWeb.doitResterReveillay)) {
                    envoieVersBackground({
                        message: "reveil"
                    })
                }
            }, 30000);
        }!estThunderbird() && annoncePresence();
        !estThunderbird() && activeAntidoteAPI_JSConnect();
        if (trouveEditeurGrav() > 0 && !estThunderbird()) {
            var head = document.getElementsByTagName('head').item(0);
            var script = document.createElement('script');
            script.src = donneUrlFichier(cstNomScriptAntidoteGrav);
            head.appendChild(script);
            var button = document.createElement("input");
            button.type = "button";
            button.setAttribute("id", "boutonAntidoteGrav");
            document.body.appendChild(button);
            button.setAttribute("onClick", "InitGravDsPage('OnClick')");
            window.setTimeout(function() {
                button.click();
                document.body.removeChild(button);
            }, 1000);
            window.addEventListener("message", gestionnaireMessageGrav, false);
        }
    }, false);
};
fureteur.runtime.onConnect.addListener(function(lePort) {
    actionAuChargement();
});
var timeStamp = 0;

function actionRemiseEnAvantPlan(ev) {
    envoieVersBackground({
        message: "_dib01"
    });
};
var pause = false;

function ecouteurToucheRelachee(e) {
    if (estFureteurWebExtension() && !estThunderbird) {
        if (e.ctrlKey && e.altKey && e.keyCode && !e.metaKey && !e.shiftKey) {
            if (e.keyCode == 75) {
                var edit_arg = {
                    message: "lanceOutilAntidoteParRaccClavier",
                    outil: chaineCommandeC0
                };
                envoieVersBackground(edit_arg);
            }
            if (e.keyCode == 68) {
                var edit_arg = {
                    message: "lanceOutilAntidoteParRaccClavier",
                    outil: chaineCommandeD0
                };
                envoieVersBackground(edit_arg);
            }
            if (e.keyCode == 71) {
                var edit_arg = {
                    message: "lanceOutilAntidoteParRaccClavier",
                    outil: chaineCommandeG0
                };
                envoieVersBackground(edit_arg);
            }
            if (e.keyCode == 76 && navigator.userAgent.indexOf("Macintosh") >= 0) {
                var edit_arg = {
                    message: "lanceOutilAntidoteParRaccClavier",
                    outil: chaineCommandeG0
                };
                envoieVersBackground(edit_arg);
            }
        }
    } else if (estThunderbird()) {
        if (pause) {
            envoieVersBackground({
                message: "pause_antioups",
                _dib29: false
            });
            pause = false;
        }
    }
};

function ecouteToucheEnfoncee(event) {
    if ((mesDonneesGlobales.plateforme == "mac" && (event.keyCode == KeyEvent.DOM_VK_ALT || event.keyCode == KeyEvent.DOM_VK_SHIFT)) || (mesDonneesGlobales.plateforme != "mac" && ((event.keyCode == KeyEvent.DOM_VK_CONTROL && !mesDonneesGlobales.antiOups.reseau.jeInhibeRaccourciAntiOupsCtrl) || (event.keyCode == KeyEvent.DOM_VK_SHIFT && !mesDonneesGlobales.antiOups.reseau.jeInhibeRaccourciAntiOupsShift)))) {
        envoieVersBackground({
            message: "pause_antioups",
            _dib29: true
        });
        pause = true;
    }
}
if ((estSafariWebex() && (document.readyState == "interactive" || document.readyState == "complete")) && !chargeay) {
    actionAuChargement(null);
}
if (estFureteurWebExtension()) {
    window.addEventListener("DOMContentLoaded", actionAuChargement, false);
    window.addEventListener("keyup", ecouteurToucheRelachee, false);
    if (estThunderbird())
        window.addEventListener("keydown", ecouteToucheEnfoncee, true);
} else if (estSafari()) {
    window.addEventListener("DOMContentLoaded", actionAuChargement, false);
    safari.self.addEventListener("message", function(event) {
        gestionnaireMessageDuBkg(event, null);
    }, false);
}

function actionFermeture(event) {
    if (window.top === window && monPort)
        envoieVersBackground({
            message: "fermeture",
            _id: gIdPage
        });
}
window.addEventListener("beforeunload", actionFermeture, false);
fureteur.runtime.onMessage.addListener(function(m) {
    if (m.message == "reconnexion") {
        actionAuChargement(null);
    }
});
actionAuChargement(null);
window.addEventListener("focus", actionAuChargement);

function destructor() {
    document.removeEventListener(destructionEvent, destructor);
}
var destructionEvent = 'destructmyextension_' + chrome.runtime.id;
document.dispatchEvent(new CustomEvent(destructionEvent));
document.addEventListener(destructionEvent, destructor);