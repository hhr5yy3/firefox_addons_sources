 /* 
 *	Ce document est la propriété intellectuelle de Druide informatique inc. Toute reproduction ou publication est interdite. 
 *  Copyright 2022 Druide informatique inc. 
 */
 let messageLog = "";
let boutonsASupprimer = [];
let desAttributsStyle = "";
const urlsIncompatiblesAvecDW = ["https://app.genial.ly"];
const urlsDWForceay = ["https://www.facebook.com", "https://mail.google.com", "https://inbox.google.com", "overleaf.com"];

function siteEstIncompatibleAvecDW() {
    for (u of urlsIncompatiblesAvecDW) {
        if (window.location.href.startsWith(u)) {
            return true;
        }
    }
    return false;
}

function determineActions(action) {
    return {
        Corriger: (action & 1) == 1,
        Ignorer: (action & 2) == 2,
        Taire: (action & 4) == 4,
        Editer: false,
        Ajouter: (action & 16) == 16,
        Remplacer: (action & 32) == 32,
        Uniformiser: (action & 64) == 64,
        Reformuler: (action & 128) == 128
    };
}

function determineNiveauAlerte(leTypeErreur, leNiveauAlerte) {
    let desTypeSoulignementsAlertesMoyennes = [-2, -1, 4, 5, 6, 7, 8, 9, 10, 11];
    switch (leNiveauAlerte) {
        case 1:
            return desTypeSoulignementsAlertesMoyennes.includes(leTypeErreur);
        case 2:
        default:
            return true;
    }
}

function donneAlertePerso(laDetection) {
    let desTypeSoulignementsAlertePerso = [8, 9, 10];
    return desTypeSoulignementsAlertePerso.includes(laDetection.typeSoulignement) && !laDetection.estIgnoree;
}

function donneMetricTexte(leTexte, leStyle) {
    var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
    var context = canvas.getContext("2d");
    context.font = leStyle.font;
    context.fontSize = leStyle.fontSize;
    context.fontFamily = leStyle.fontFamily;
    var metrics = context.measureText(leTexte);
}

function donneStyle(elem) {
    if (!elem) return {};
    const proprieteARecuperer = ["font", "fontDisplay", "fontFamily", "fontFeatureSettings", "fontKerning", "fontOpticalSizing", "fontSize", "fontStretch", "fontStyle", "fontVariant", "fontVariantCaps", "fontVariantEastAsian", "fontVariantLigatures", "fontVariantNumeric", "fontVariationSettings", "fontWeight", "padding", "paddingBlock", "paddingBlockEnd", "paddingBlockStart", "paddingBottom", "paddingInline", "paddingInlineEnd", "paddingInlineStart", "paddingLeft", "paddingRight", "paddingTop", "lineHeight", "letterSpacing", "color"];
    let unStyle = document.defaultView.getComputedStyle(elem);
    let _dib84 = {};
    for (let p in proprieteARecuperer) {
        _dib84[proprieteARecuperer[p]] = unStyle[proprieteARecuperer[p]];
    }
    return _dib84;
}

function donneStyleTextarea(elem) {
    let unStyle = document.defaultView.getComputedStyle(elem);
    let _dib84 = {};
    for (let p = 0; p < unStyle.length; p++) {
        _dib84[unStyle.item(p)] = unStyle.getPropertyValue(unStyle.item(p));
    }
    return _dib84;
}

function lieDetecteur(leDocument, leId, objetBoutonsZones) {
    const unElement = objetBoutonsZones[leId].zone;
    mesElementsPourDW.push(new referenceObjet(unElement));
    return true;
}

function ajusteCoordonnees(lesCoords, lesCoordsParent, leScrollTop, leTableauPadding, leTableauMarging, estTinyMCE) {
    let paddingY = leTableauPadding !== undefined ? parseInt(leTableauPadding[0].split('px')[0]) : 0;
    let paddingX = leTableauPadding !== undefined ? parseInt(leTableauPadding.length > 1 ? leTableauPadding[1].split('px')[0] : leTableauPadding[0].split('px')[0]) : 0;
    let top = (-lesCoordsParent.top);
    let bottom = (-lesCoordsParent.bottom);
    lesCoords.x = lesCoords.x - lesCoordsParent.x;
    lesCoords.y = lesCoords.y + top + leScrollTop;
    lesCoords.top = lesCoords.top + top + leScrollTop;
    lesCoords.right = lesCoords.right - lesCoordsParent.right;
    lesCoords.bottom = lesCoords.bottom + bottom;
    lesCoords.left = lesCoords.left - lesCoordsParent.left;
}

function recupereCoordonneesTexte(leNoeud, leIdBouton, leIntervalleSoulignement, noeudDebut) {
    let unRange = DetecteurWeb.recupereRangeTexteDeElementAvecId(leIdBouton, leNoeud, {
        _dib49: leIntervalleSoulignement.borneDebut,
        _dib50: leIntervalleSoulignement.borneFin,
        _dib37: "",
        _dib99: 0,
        noeudDebut: noeudDebut
    });
    if (unRange) {
        let desCoordonneesNoeudParent = leNoeud.getBoundingClientRect();
        let desCoordonnees = unRange.getClientRects();
        for (let c = 0; c < desCoordonnees.length; c++) {
            ajusteCoordonnees(desCoordonnees[c], desCoordonneesNoeudParent, leNoeud.scrollTop, window.getComputedStyle(leNoeud).padding.split(' '), window.getComputedStyle(leNoeud).margin.split(' '), leNoeud.ownerDocument.body.id == "tinymce" && !leNoeud.ownerDocument.body.classList.contains("wiki-content"));
            desCoordonnees[c].estInput = estInput(leNoeud);
        }
        return desCoordonnees;
    }
    return {};
}

function chercheElementEditable(element) {
    if (element.contentEditable == "true" || estInput(element) || estTextarea(element)) return element;
    if (estHTML(element)) {
        for (let i = 0; i < element.childElementCount; i++) {
            if (estBody(element.childNodes[i]) && element.childNodes[i].contentEditable == "true") {
                return element.childNodes[i];
            }
        }
    } else {
        let el = element.parentElement;
        if (el != null) {
            while (el != null && !estHTML(el) && el.contentEditable != "true") {
                el = el.parentElement;
            }
            if (el)
                element = el;
        }
    }
    return element;
}

function donneLabelAssociay(leLabel) {
    let desLabels = document.getElementsByTagName("label");
    let i = 0;
    while (i < desLabels.length) {
        if (desLabels[i].htmlFor == leLabel) {
            return desLabels[i];
        }
        i++;
    }
    return null;
}
const gNomsExclus = ["session_key", "os_username", "email", "emailOrUsername", "UserCode"];
const gListesExclues = ["session", "username", "email", "login", "user"];
const gNomLabelExclus = ["Nom d'utilisateur", "Username", "CVV", "cvv"]

function estInputValide(element) {
    return false;
    let estValide = estInput(element);
    if (estValide) {
        let unNom = element.name !== undefined ? element.name : undefined;
        if (unNom !== undefined) {
            if (unNom != "name" && contient(unNom.toLowerCase(), gListesExclues)) {
                return false
            };
            let unLabelAssociay = donneLabelAssociay(element.id);
            if (unLabelAssociay != null && unLabelAssociay.textContent !== undefined) {
                if (contient(unLabelAssociay.textContent, gNomLabelExclus)) {
                    return false;
                }
            }
        }
        let desDimensions = element.getBoundingClientRect();
        let uneAire = desDimensions.width * desDimensions.height;
        if (uneAire < 5000) return false;
    }
    return estValide;
}

function deplacerHorsIframe(unElement, contenant, documentParentPrecedent) {
    if (contenant.ownerDocument !== document && contenant.ownerDocument.documentElement.clientWidth < document.documentElement.clientWidth || contenant.ownerDocument.documentElement.scrollHeight < document.documentElement.scrollHeight) {
        let elementActifParent = unElement.ownerDocument.defaultView.parent.document.activeElement;
        let leElementParent = donneDernierOverflowHidden(elementActifParent, elementActifParent.ownerDocument.documentElement);
        let elementContenantAvant = contenant.nextElementSibling;
        if (leElementParent) {
            insereNoeudAvant(contenant, leElementParent);
        } else {
            insereNoeudAvant(contenant, elementActifParent);
        }
        const boxIframe = elementActifParent.getBoundingClientRect();
        const boxContenant = contenant.getBoundingClientRect();
        if (elementContenantAvant) {
            let boxSiblingAvant = elementContenantAvant.getBoundingClientRect();
            contenant.style.left = parseInt(contenant.style.left) + (boxIframe.left - boxContenant.left) + boxSiblingAvant.left + "px";
            contenant.style.top = parseInt(contenant.style.top) + (boxIframe.top - boxContenant.top) + boxSiblingAvant.top + "px";
        } else {
            contenant.style.left = parseInt(contenant.style.left) + (boxIframe.left - boxContenant.left) + "px";
            contenant.style.top = parseInt(contenant.style.top) + (boxIframe.top - boxContenant.top) + "px";
        }
        return unElement.ownerDocument;
    }
    return documentParentPrecedent;
}

function deplaceElement(id, laRacine) {
    let timeoutMontre = 0;
    let contenant = laRacine.ownerDocument.getElementById(`b${id}`);
    if (contenant === undefined || contenant === null) {
        contenant = document.getElementById(`b${id}`);
    }
    let unElement = contenant.shadowRoot.getElementById("bloc_dw");
    let iframes = document.getElementsByTagName("iframe");
    let documentParentPrecedent = unElement.ownerDocument;
    let deplace = false;
    let peutMontrer = true;

    function contientBouton(leChemin) {
        for (let unComposant of leChemin) {
            if (unComposant.id !== undefined && unComposant.id == "fiole_bouton") {
                return true;
            }
        }
        return false;
    }

    function executeDeplacementElement(e) {
        let leClone = !!contenant.shadowRoot ? contenant.shadowRoot.getElementById(`b${id}_clone`) : null;
        e = e || window.event;
        e.preventDefault();
        let boxContenant = contenant.getBoundingClientRect();
        unElement.classList.remove("apparition");
        unElement.classList.add("pasdanimation");
        unElement.style.left = e.clientX - boxContenant.left - 20 + "px";
        unElement.style.top = e.clientY - boxContenant.top - 14 + "px";
        if (!!leClone) {
            leClone.style.top = unElement.style.top;
            leClone.style.left = unElement.style.left;
        }
        unElement.dataset.deplace = "1";
        deplace = true;
        clearTimeout(timeoutMontre);
        DetecteurWeb.envoieMessageAuDetecteurWebPerisprit({
            message: "ouvreferme_menubulle",
            id: id,
            commande: "hidden"
        });
    }

    function fermeDeplacementElement(e) {
        unElement.ownerDocument.onpointerup = null;
        unElement.ownerDocument.onpointermove = null;
        unElement.ownerDocument.onpointerrawupdate = null;
        peutMontrer = true;
        if (!deplace) {
            if (unElement.dataset.deplace === undefined) {
                unElement.dataset.deplace = "0";
            }
            if (contientBouton(e.composedPath())) {
                if (DetecteurWeb.optionEstActivay) {
                    if (window.getComputedStyle(laRacine.getElementById("_corrdecteur")).display == "block") {
                        laRacine.getElementById("_corrdecteur").style.display = "none";
                    }
                } else {
                    if (window.getComputedStyle(laRacine.getElementById("_corrdecteur")).display == "block") {
                        DetecteurWeb.recupereAgentSelonId(laRacine.host.id);
                        envoieVersBackground({
                            message: "ConnexionAWebDetecteurWeb",
                            outil: "C0",
                            idAppelant: laRacine.host.id
                        });
                    } else {
                        laRacine.getElementById("_corrdecteur").style.display = "block";
                    }
                }
                DetecteurWeb.envoieMessageAuDetecteurWebPerisprit({
                    message: "modifie_message",
                    id: laRacine.host.id
                });
            }
        } else {
            unElement.classList.add("apparition");
            unElement.classList.remove("pasdanimation");
            DetecteurWeb.envoieMessageAuDetecteurWebPerisprit({
                message: "ouvreferme_menubulle",
                id: id,
                commande: "hidden"
            });
        }
        if (iframes !== null && unElement.ownerDocument === document) {
            for (i = 0; i < iframes.length; i++) {
                iframes[i].style.pointerEvents = "auto";
            }
        }
    }

    function ecouteCurseur(e) {
        if (e.button === 0 && contientBouton(e.composedPath())) {
            deplace = false;
            peutMontrer = false;
            e = e || window.event;
            e.preventDefault();
            let onRawUpdate = false;
            if (documentParentPrecedent !== document && estGoogleChrome() && Array.from(document.querySelectorAll("script")).filter(e => e.src.includes("/konek/js/output/")).length > 0) {
                onRawUpdate = true;
            }
            documentParentPrecedent = deplacerHorsIframe(unElement, contenant, documentParentPrecedent);
            if (onRawUpdate) {
                unElement.ownerDocument.onpointerrawupdate = executeDeplacementElement;
                unElement.ownerDocument.onpointermove = fermeDeplacementElement;
            } else {
                unElement.ownerDocument.onpointerup = fermeDeplacementElement;
                unElement.ownerDocument.onpointermove = executeDeplacementElement;
            }
            if (iframes !== null && unElement.ownerDocument === document) {
                for (i = 0; i < iframes.length; i++) {
                    iframes[i].style.pointerEvents = "none";
                }
            }
        }
    }

    function ecoutePointerOver(e) {
        clearTimeout(timeoutMontre);
        timeoutMontre = setTimeout(() => {
            if (peutMontrer) {
                DetecteurWeb.envoieMessageAuDetecteurWebPerisprit({
                    message: "ouvreferme_menubulle",
                    id: id,
                    commande: "visible"
                });
            }
            peutMontrer = true;
        }, 400);
    }

    function ecoutePointerLeave(e) {
        peutMontrer = false;
        timeoutMontre = setTimeout(() => {
            DetecteurWeb.envoieMessageAuDetecteurWebPerisprit({
                message: "ouvreferme_menubulle",
                id: id,
                commande: "hidden"
            });
            peutMontrer = true;
        }, 400);
    }
    unElement.onpointerdown = ecouteCurseur;
    unElement.onpointerover = ecoutePointerOver;
    unElement.onpointerleave = ecoutePointerLeave;
}

function chercheNoeudEditableVoulu(elem) {
    if (elem.parentElement !== undefined && elem.parentElement.contentEditable === "true") {
        return elem.parentElement;
    }
    return elem;
}

function chercheNoeudSelonEditeur(element) {
    let desClass = element.className;
    if (desClass.indexOf("ck-editor__editable") > -1) {
        element.dataset.antidote_dw_info = "bonEnfant";
        element.parentNode.dataset.antidote_dw_info = "enfant";
        return element.parentNode;
    } else if (element.ownerDocument.body.id == "tinymce") {
        if (!element.ownerDocument.body.classList.contains("wiki-content")) {
            element.ownerDocument.body.dataset.antidote_dw_info = "enfant";
            return element.ownerDocument.body;
        }
    }
    if (element.dataset.antidote_dw_info === undefined) {
        element.dataset.antidote_dw_info = "actuel";
    }
    return element;
}

function chercheElement(laRequete) {
    let uneReponse = document.querySelectorAll(laRequete);
    var iframes = document.getElementsByTagName(cstNomNoeudIframe);
    if (iframes != null) {
        for (var i = 0; i < iframes.length; i++) {
            if (iframes[i].src == "" || verifieMemeOrigine(document.URL, iframes[i].src)) {
                let r = iframes[i].contentDocument && iframes[i].contentDocument.querySelectorAll(laRequete);
                if (uneReponse && uneReponse.length == 0) {
                    uneReponse = r;
                } else if (r && r.length > 0) {
                    uneReponse = [].concat(uneReponse, r);
                }
            }
        }
    }
    if (uneReponse == null || uneReponse.length == 0)
        return [];
    else
        return uneReponse;
}

function chercheElementParId(leID) {
    let uneReponse = document.getElementById(leID);
    if (!uneReponse) {
        var iframes = document.getElementsByTagName(cstNomNoeudIframe);
        if (iframes != null) {
            for (var i = 0; i < iframes.length && !uneReponse; i++) {
                if (iframes[i].src == "" || verifieMemeOrigine(document.URL, iframes[i].src)) {
                    uneReponse = iframes[i].contentDocument && iframes[i].contentDocument.getElementById(leID);
                }
            }
        }
    }
    return uneReponse;
}

function traitementSpeciale(leElement) {
    if (leElement.ownerDocument.URL.indexOf('https://mail.google.com/mail/u/0/#inbox') >= 0) {
        let desNoeudsGramm = leElement.ownerDocument.getElementsByClassName("ng");
        if (desNoeudsGramm.length)
            for (let g of desNoeudsGramm) {
                g.dataset.druideTempClasse = g.className;
                g.className = "_druide_temp_classe";
            }
    }
}

function estElementPourDW(leElement) {
    return leElement && !estTexteTypeNode(leElement) && (estTextarea(leElement) || estInput(leElement) || leElement.getAttribute(cstChaineContenteditable)) && estUnElementValide(leElement) && estVisible(leElement);
}

function estEvenementUndoRedo(e) {
    return (e.keyCode == 90 || e.keyCode == 89) && (estMacOS() ? e.metaKey : e.ctrlKey);
}
class FileTraitementMessagesCorrecteurSimple extends FileMessages {
    constructor(cliCorrSimple) {
        super();
        this.monCliCorrSimple = cliCorrSimple;
    }
    async execute(msg) {
        let mesg = JSON.stringify(msg);
        if (msg.message == "nouveauDecoupage" || msg.message == "analyseLocale" || msg.message == "finAnalyse" || msg.message == "infobulleComplete") {
            await this.monCliCorrSimple.consomme(mesg);
            let C = new CustomEvent('donnees_traitees', {
                detail: mesg
            });
            window.dispatchEvent(C);
        } else if (msg.message == "reinit") {
            this.monCliCorrSimple.reinit(false);
        } else {
            let messageErreur = {
                date: new Date().toString(),
                id_dw: this.monCliCorrSimple.id,
                message_erreur: msg,
                message_note: "erreur dans traiteMessageCorrecteurSimple, reconnexion en cours",
                message_log: messageLog,
                url: document.URL
            };
            envoieVersBackground({
                message: "enregistreErreur",
                data: messageErreur
            });
            messageLog = "";
            this.monCliCorrSimple.reinit(true);
        }
    }
}
class CliCorrSi {
    constructor(id, zone) {
        this.id = id;
        this.zone = zone;
        this.phrases = {};
        this.idBouton = "";
        this.queueActions = [];
        this.monWalker = null;
        this.aDesSuppressions = false;
        this.doitReinitialiser = false;
        this.listeLogs = [];
        this.fileTraitementMessage = new FileTraitementMessagesCorrecteurSimple(this);
    }
    async envoieMessageAuBckgEtAttendReponse(msg) {
        let idMessage = uuidv4();
        msg.idMessage = idMessage;
        msg.id = this.id;
        msg.message = "clicorrsi-comm";
        envoieVersBackground(msg);
        return new Promise(completay => {
            let attendReponse = (msg) => {
                if (msg.data.message == "clicorrsi-comm" && msg.data.idMessage == idMessage && msg.data.id == this.id) {
                    let reponse = structuredClone(msg.data);
                    completay(reponse);
                    window.removeEventListener("message", attendReponse);
                }
            }
            window.addEventListener("message", attendReponse);
        });
    }
    async init(devCliCorrSi) {
        DetecteurWeb.construireListePositionsNoeuds(this.zone, this.id, true);
        envoieVersBackground({
            message: "dw-comm",
            requete: "initialise_communication",
            id: this.id
        });
        let unId = this.id;
        let controlleur = new AbortController();
        let signal = controlleur.signal;
        let promesseOuvertureWebSocket = new Promise((resolve) => {
            window.addEventListener('dw-comm', function(ev) {
                let data = JSON.parse(ev.detail);
                if (data.id == unId) {
                    resolve(true);
                }
            }, {
                signal
            })
        });
        await promesseOuvertureWebSocket;
        controlleur.abort();
        return true;
    }
    async reinit(jeDoisDeconnecter) {
        delete DetecteurWeb.archive[this.id];
        DetecteurWeb.envoieMessageAuDetecteurWebPerisprit({
            message: "supprime_soulignements_infobulles",
            id: this.id,
            phrasesIds: Object.keys(this.phrases)
        });
        if (jeDoisDeconnecter) {
            await this.deconnecteWS("ferme");
        }
        this.nettoie();
        this.doitReinitialiser = true;
        DetecteurWeb.envoieMessageAuDetecteurWebPerisprit({
            message: "mets_icone_analyse",
            id: this.id
        });
        DetecteurWeb.analyseDW(this.id, true);
    }
    nettoie() {
        delete this.zone;
        delete this.phrases;
        delete this.idBouton;
        delete this.queueActions;
        delete this.monWalker;
        delete this.aDesSuppressions;
    }
    async deconnecteWS(laRequete) {
        envoieVersBackground({
            message: "dw-comm",
            requete: laRequete,
            id: this.id
        });
        let controlleur = new AbortController();
        let signal = controlleur.signal;
        let ceci = this;
        let promesseOuvertureWebSocket = new Promise((resolve) => {
            window.addEventListener('dw-comm', function(ev) {
                let data = JSON.parse(ev.detail);
                if (data.id == ceci.id) {
                    resolve(true);
                }
            }, {
                signal
            })
        });
        await promesseOuvertureWebSocket;
        controlleur.abort();
    }
    async traiteMessageCorrecteurSimple(msg) {
        this.fileTraitementMessage.recoisMessage(msg);
    }
    applique(messageApplique) {
        envoieVersBackground({
            message: "clicorrsi-comm",
            requete: "applique",
            messageApplique: messageApplique,
            id: this.id
        });
    }
    async consomme(mesg) {
        envoieVersBackground({
            message: "clicorrsi-comm",
            requete: "consomme",
            donneesConsomme: mesg,
            id: this.id
        });
        let msg = JSON.parse(mesg);
        if (msg.message == "nouveauDecoupage") {
            const eventArreteSuppression = new Event("arrete_suppression_soulignements");
            window.dispatchEvent(eventArreteSuppression);
            DetecteurWeb.envoieMessageAuDetecteurWebPerisprit({
                message: "mets_icone_analyse",
                id: this.id
            });
            this.aDesSuppressions = msg.suppressionsPhrases.length > 0;
            for (let idPhrase of msg.suppressionsPhrases) {
                delete this.phrases[idPhrase];
            }
            DetecteurWeb.envoieMessageAuDetecteurWebPerisprit({
                message: "supprime_soulignements_infobulles",
                id: this.id,
                phrasesIds: msg.suppressionsPhrases
            });
            this.initialiseNbATraiter(msg);
            let desIdPhrases = await this.prepareDonnees(msg.nouvellesPhrases);
            for (let idPhrase of desIdPhrases) {
                this.ajouteResultats(idPhrase, this.phrases[idPhrase].resultats);
            }
            if (!dwAgentTexteur) {
                DetecteurWeb.recupereAgentSelonId(this.id);
            }
            if (!!dwAgentTexteur && !!dwAgentTexteur.reinitPositionDebut) dwAgentTexteur.reinitPositionDebut();
            this.monWalker = document.createTreeWalker(this.zone, NodeFilter.SHOW_ALL);
            this.monWalker.parentNode();
            if (desIdPhrases.length > 0) {
                this.recupereCoordonnees();
            }
            if (this.phrases.nbATraiter <= 0) {
                DetecteurWeb.metsAjourDetecteurWeb({
                    message: "intervention",
                    id: this.id,
                    _dib84: this.phrases,
                    sorteIntervention: this.donneSorteIntervention(),
                    niveauAlerte: DetecteurWeb.niveauAlerte
                });
            }
            envoieVersBackground({
                message: "enregistreLogs",
                donnees_brutes: mesg,
                donnees_traitees: JSON.stringify(this.phrases),
                id: this.id,
            });
        } else if (msg.message == "analyseLocale") {
            this.ajouteResultats(msg.idPhrase, msg.resultats);
            this.recupereCoordonneesPourIdPhrase(msg.idPhrase);
            let ceci = this;
            DetecteurWeb.metsAjourDetecteurWeb({
                message: "intervention-maj",
                id: ceci.id,
                idPhrase: msg.idPhrase,
                _dib84: ceci.phrases,
                sorteIntervention: ceci.donneSorteIntervention(),
                niveauAlerte: DetecteurWeb.niveauAlerte
            });
            let objPhrase = {};
            objPhrase[msg.idPhrase] = this.phrases[msg.idPhrase];
            this.listeLogs.push({
                msg: mesg,
                temps: new Date().getTime(),
                phrase: JSON.stringify(objPhrase)
            });
            if (this.listeLogs.length >= 100) {
                envoieVersBackground({
                    message: "enregistreListeLogs",
                    liste_logs: JSON.stringify(this.listeLogs),
                    id: this.id
                });
                this.listeLogs = [];
            }
        } else if (msg.message == "infobulleComplete") {
            let desResulstats = (await this.envoieMessageAuBckgEtAttendReponse({
                requete: "donneResultatsSelonIdentificateur",
                idPhrase: msg.idPhrase
            })).objetDecoupage;
            for (let d of this.phrases[msg.idPhrase].resultats.detections) {
                for (let i in desResulstats.detections) {
                    if ((d && desResulstats.detections[i]) && desResulstats.detections[i].id == d.id) {
                        desResulstats.detections[i].coordonnees = d.coordonnees;
                    }
                }
            }
            this.ajouteResultats(msg.idPhrase, desResulstats);
            this.metsAJourInfobulle(msg);
        } else if (msg.message == "finAnalyse") {
            DetecteurWeb.metsAjourDetecteurWeb({
                message: "modifie-bouton",
                id: this.id,
                sorteIntervention: this.donneSorteIntervention(),
                niveauAlerte: DetecteurWeb.niveauAlerte
            });
            envoieVersBackground({
                message: "enregistreListeLogs",
                liste_logs: JSON.stringify(this.listeLogs),
                donnees_traitees: JSON.stringify(this.phrases),
                id: this.id
            });
            this.listeLogs = [];
        }
        if (this.phrases.nbATraiter <= 0) {
            DetecteurWeb.metsAjourDetecteurWeb({
                message: "modifie-bouton",
                id: this.id,
                sorteIntervention: this.donneSorteIntervention(),
                niveauAlerte: DetecteurWeb.niveauAlerte
            });
        }
    }
    async maj(doisRecalculerIntervalles, doitRecalculerNoeudsPhrases, phraseDebutID) {
        if (DetecteurWeb.estActivayCorrectionExpress) {
            if (!this.phrases || (!!this.phrases && Object.keys(this.phrases).length == 1)) return;
            if (doisRecalculerIntervalles === undefined) {
                doisRecalculerIntervalles = true;
            }
            if (doisRecalculerIntervalles) {
                await this.recalculeAbsolu();
            }
            if (doitRecalculerNoeudsPhrases) {
                DetecteurWeb.construireListePositionsNoeuds(this.zone, this.id, true);
            }
            if (phraseDebutID === undefined) {
                phraseDebutID = Object.keys(this.phrases)[1];
            }
            if (this.zone !== undefined && dwAgentTexteur) {
                if (!!dwAgentTexteur && !!dwAgentTexteur.reinitPositionDebut) dwAgentTexteur.reinitPositionDebut();
                this.monWalker = document.createTreeWalker(this.zone, NodeFilter.SHOW_ALL);
                this.monWalker.parentNode();
                async function loop() {
                    if (phraseDebutID !== undefined) {
                        const keys = Object.keys(this.phrases);
                        const index = keys.indexOf(phraseDebutID);
                        for (let i = index; i < keys.length; i++) {
                            this.recupereCoordonneesPourIdPhrase(keys[i], doitRecalculerNoeudsPhrases);
                            DetecteurWeb.metsAjourDetecteurWeb({
                                message: "intervention-maj",
                                id: this.id,
                                _dib84: this.phrases,
                                idPhrase: keys[i],
                                sorteIntervention: this.donneSorteIntervention(),
                                niveauAlerte: DetecteurWeb.niveauAlerte
                            });
                            await attendreAsync(1);
                        }
                    } else {
                        for (let [idPhrase, phrase] of Object.entries(this.phrases)) {
                            this.recupereCoordonneesPourIdPhrase(idPhrase, doitRecalculerNoeudsPhrases);
                            DetecteurWeb.metsAjourDetecteurWeb({
                                message: "intervention-maj",
                                id: this.id,
                                _dib84: this.phrases,
                                idPhrase: idPhrase,
                                sorteIntervention: this.donneSorteIntervention(),
                                niveauAlerte: DetecteurWeb.niveauAlerte
                            });
                            await attendreAsync(1);
                        }
                    }
                }
                loop.bind(this)();
                DetecteurWeb.metsAjourDetecteurWeb({
                    message: "modifie-bouton",
                    id: this.id,
                    sorteIntervention: this.donneSorteIntervention(),
                    aDesAlertes: this.donneAlertes(),
                    niveauAlerte: DetecteurWeb.niveauAlerte
                });
            }
        }
    }
    initialiseNbATraiter(msg) {
        this.phrases.nbATraiter = msg.nouvellesPhrases.length;
        for (let [idxPhrase, phrase] of Object.entries(msg.nouvellesPhrases)) {
            if (this.phrases[phrase.idPhrase] !== undefined) {
                this.phrases.nbATraiter = this.phrases.nbATraiter - 1;
            }
        }
        this.phrases.nbATraiter = this.phrases.nbATraiter < 0 ? 0 : this.phrases.nbATraiter;
    }
    sauvegardePhrase(idPhrase, intervalle, desResulstats) {
        if (this.phrases[idPhrase] === undefined) {
            this.phrases[idPhrase] = {
                resultats: {
                    corrections: [],
                    detections: []
                }
            };
        }
        this.phrases[idPhrase].intervalle = intervalle;
        let desCorrections = desResulstats.corrections;
        if (desCorrections !== undefined) {
            for (let c in desCorrections) {
                this.phrases[idPhrase].resultats.corrections[c].intervalle = desCorrections[c].intervalle;
            }
        }
        let desDetections = desResulstats.detections;
        if (desDetections !== undefined) {
            for (let c in desDetections) {
                this.phrases[idPhrase].resultats.detections[c].intervalle = desDetections[c].intervalle;
            }
        }
        const noeudPhrase = DetecteurWeb.chercherNoeudPourIntervalle(intervalle.borneDebut, intervalle.borneFin, this.id);
        this.phrases[idPhrase].noeudDebut = noeudPhrase;
        this.phrases[idPhrase].estTraitay = false;
    }
    ajouteResultats(idPhrase, objResultats) {
        for (let c in objResultats.corrections) {
            let intervalleAbsolu = {
                borneDebut: 0,
                borneFin: 0
            };
            intervalleAbsolu.borneDebut = objResultats.corrections[c].intervalle.borneDebut + this.phrases[idPhrase].intervalle.borneDebut;
            intervalleAbsolu.borneFin = objResultats.corrections[c].intervalle.borneFin + this.phrases[idPhrase].intervalle.borneDebut;
            if (objResultats.corrections[c].intervalleAbsolu !== undefined) {
                let diffDebut = objResultats.corrections[c].intervalleAbsolu.borneDebut - intervalleAbsolu.borneDebut;
                let diffFin = objResultats.corrections[c].intervalleAbsolu.borneFin - intervalleAbsolu.borneFin;
                if (objResultats.corrections[c].intervalleDecorrection !== undefined && diffDebut == diffFin) {
                    objResultats.corrections[c].intervalleAbsoluDecorrection = {
                        borneDebut: objResultats.corrections[c].intervalleAbsoluDecorrection.borneDebut - diffDebut,
                        borneFin: objResultats.corrections[c].intervalleAbsoluDecorrection.borneFin - diffFin
                    };
                }
            }
            objResultats.corrections[c].intervalleAbsolu = intervalleAbsolu;
        }
        let dectetionsIdx = {};
        for (let c in objResultats.detections) {
            let delta = 0;
            let intervalleAbsolu = {
                borneDebut: 0,
                borneFin: 0
            };
            intervalleAbsolu.borneDebut = objResultats.detections[c].intervalle.borneDebut + this.phrases[idPhrase].intervalle.borneDebut;
            intervalleAbsolu.borneFin = objResultats.detections[c].intervalle.borneFin + this.phrases[idPhrase].intervalle.borneDebut;
            if (objResultats.detections[c].intervalleAbsolu !== undefined) {
                delta = intervalleAbsolu.borneDebut - objResultats.detections[c].intervalleAbsolu.borneDebut;
            }
            objResultats.detections[c].intervalleAbsolu = intervalleAbsolu;
            objResultats.detections[c].aEteCorrigee = objResultats.detections[c].aEteCorrigee !== undefined ? objResultats.detections[c].aEteCorrigee : false;
            objResultats.detections[c].estIgnoree = objResultats.detections[c].estIgnoree !== undefined ? objResultats.detections[c].estIgnoree : false;
            dectetionsIdx[objResultats.detections[c].id] = parseInt(c);
            objResultats.detections[c].aDesDetectionsAlerte = false;
            if (objResultats.detections[c].idCorrection === undefined) {
                objResultats.detections[c].aDesDetectionsAlerte = true;
            }
            if (objResultats.detections[c].intervalleAbsoluPostTraitement !== undefined) {
                objResultats.detections[c].intervalleAbsoluPostTraitement.borneDebut = objResultats.detections[c].intervalleAbsoluPostTraitement.borneDebut + delta;
                objResultats.detections[c].intervalleAbsoluPostTraitement.borneFin = objResultats.detections[c].intervalleAbsoluPostTraitement.borneFin + delta;
            }
        }
        if (this.phrases[idPhrase] === undefined) {
            this.phrases[idPhrase] = {};
        }
        objResultats.detectionsIdx = dectetionsIdx;
        const intervalle = this.phrases[idPhrase].intervalle;
        const noeudDebut = DetecteurWeb.chercherNoeudPourIntervalle(intervalle.borneDebut, intervalle.borneFin, this.id);
        this.phrases[idPhrase].noeudDebut = noeudDebut;
        this.phrases[idPhrase].aErreur = objResultats.detections.length != 0;
        this.phrases[idPhrase].estTraitay = true;
        this.phrases[idPhrase].resultats = objResultats;
        this.phrases.nbATraiter = this.phrases.nbATraiter - 1;
    }
    metsAJourInfobulle(msg) {
        if (msg.donneesReformulations === undefined) {
            msg.donneesReformulations = {};
        } else {
            let contenuReformaulation = construisReformulation(msg.donneesReformulations.resultat[0].reformulations);
            let intervalleAbsolu = msg.donneesReformulations.resultat[0].intervalleOrig;
            intervalleAbsolu.borneDebut = intervalleAbsolu.borneDebut + this.phrases[msg.idPhrase].intervalle.borneDebut;
            intervalleAbsolu.borneFin = intervalleAbsolu.borneFin + this.phrases[msg.idPhrase].intervalle.borneDebut;
            this.phrases[msg.idPhrase].resultats.detections[this.phrases[msg.idPhrase].resultats.detectionsIdx[msg.idDetection]].actions = 162;
            this.phrases[msg.idPhrase].resultats.detections[this.phrases[msg.idPhrase].resultats.detectionsIdx[msg.idDetection]].description = contenuReformaulation[0].outerHTML;
            this.phrases[msg.idPhrase].resultats.detections[this.phrases[msg.idPhrase].resultats.detectionsIdx[msg.idDetection]].titre = gestionTraduction.Tr_(cstDWReecrit, "");
            this.phrases[msg.idPhrase].resultats.corrections = [];
            this.phrases[msg.idPhrase].resultats.corrections.push({
                chaine: msg.donneesReformulations.resultat[0].reformulations[0].texte,
                intervalle: msg.donneesReformulations.resultat[0].intervalleOrig,
                intervalleAbsolu: intervalleAbsolu
            });
            this.phrases[msg.idPhrase].resultats.detections[this.phrases[msg.idPhrase].resultats.detectionsIdx[msg.idDetection]].idCorrection = 0;
        }
        msg.reponse = "donnerInfobulleComplete";
        window.postMessage(msg);
    }
    metsAJourObjetPhrase(phrases) {
        for (let [id, p] of Object.entries(phrases)) {
            if (!this.phrases[id]) {
                this.phrases[id] = p;
            }
            for (let [cle, val] of Object.entries(p)) {
                this.phrases[id][cle] = val;
            }
        }
    }
    async prepareDonnees(lesNouvellesPhrases) {
        let desIdPhrases = [];
        for (let unePhrase of lesNouvellesPhrases) {
            desIdPhrases.push(unePhrase.idPhrase);
        }
        let desIDPhraseARedessiner = [];
        let decoupage = (await this.envoieMessageAuBckgEtAttendReponse({
            requete: "donneObjetDecoupage"
        })).objetDecoupage;
        for (let [idPhrase, phraseDecoupee] of Object.entries(decoupage)) {
            if (this.phrases[idPhrase] === undefined) {
                this.phrases[idPhrase] = {
                    resultats: {
                        corrections: [],
                        detections: []
                    },
                    intervalle: phraseDecoupee.intervalle,
                    estTraitay: false,
                    aErreur: false,
                    estTraitay: false
                };
            } else {
                if (desIdPhrases.includes(idPhrase)) {
                    this.phrases[idPhrase].intervalle = phraseDecoupee.intervalle;
                    desIDPhraseARedessiner.push(idPhrase);
                } else if (this.phrases[idPhrase].intervalle.borneDebut != phraseDecoupee.intervalle.borneDebut || this.phrases[idPhrase].intervalle.borneFin != phraseDecoupee.intervalle.borneFin) {
                    this.phrases[idPhrase].intervalle = phraseDecoupee.intervalle;
                    desIDPhraseARedessiner.push(idPhrase);
                }
            }
        }
        return desIDPhraseARedessiner;
    }
    async recalculeAbsolu() {
        DetecteurWeb.construireListePositionsNoeuds(this.zone, this.id, true);
        var decoupage = (await this.envoieMessageAuBckgEtAttendReponse({
            requete: "donneObjetDecoupage"
        })).objetDecoupage;
        for (let [id, p] of Object.entries(decoupage)) {
            this.sauvegardePhrase(id, p.intervalle, p.resultats);
        }
        for (let [idPhrase, _dib84] of Object.entries(this.phrases)) {
            if (idPhrase != "nbATraiter") {
                if (this.phrases[idPhrase].resultats !== undefined) {
                    let i = this.phrases[idPhrase].intervalle;
                    for (let c in this.phrases[idPhrase].resultats.corrections) {
                        let intervalleAbsolu = {
                            borneDebut: 0,
                            borneFin: 0
                        };
                        intervalleAbsolu.borneDebut = this.phrases[idPhrase].resultats.corrections[c].intervalle.borneDebut + i.borneDebut;
                        intervalleAbsolu.borneFin = this.phrases[idPhrase].resultats.corrections[c].intervalle.borneFin + i.borneDebut;
                        let diffDebut = this.phrases[idPhrase].resultats.corrections[c].intervalleAbsolu.borneDebut - intervalleAbsolu.borneDebut;
                        let diffFin = this.phrases[idPhrase].resultats.corrections[c].intervalleAbsolu.borneFin - intervalleAbsolu.borneFin;
                        if (this.phrases[idPhrase].resultats.corrections[c].intervalleDecorrection !== undefined && diffDebut == diffFin) {
                            this.phrases[idPhrase].resultats.corrections[c].intervalleAbsoluDecorrection = {
                                borneDebut: this.phrases[idPhrase].resultats.corrections[c].intervalleAbsoluDecorrection.borneDebut - diffDebut,
                                borneFin: this.phrases[idPhrase].resultats.corrections[c].intervalleAbsoluDecorrection.borneFin - diffFin
                            };
                            this.phrases[idPhrase].resultats.corrections[c].intervalleDecorrection = {
                                borneDebut: this.phrases[idPhrase].resultats.corrections[c].intervalleDecorrection.borneDebut - diffDebut,
                                borneFin: this.phrases[idPhrase].resultats.corrections[c].intervalleDecorrection.borneFin - diffFin
                            };
                        }
                        this.phrases[idPhrase].resultats.corrections[c].intervalleAbsolu = intervalleAbsolu;
                    }
                    for (let c in this.phrases[idPhrase].resultats.detections) {
                        let intervalleAbsolu = {
                            borneDebut: 0,
                            borneFin: 0
                        };
                        intervalleAbsolu.borneDebut = this.phrases[idPhrase].resultats.detections[c].intervalle.borneDebut + i.borneDebut;
                        intervalleAbsolu.borneFin = this.phrases[idPhrase].resultats.detections[c].intervalle.borneFin + i.borneDebut;
                        this.phrases[idPhrase].resultats.detections[c].intervalleAbsolu = intervalleAbsolu;
                        if (this.phrases[idPhrase].resultats.detections[c].intervalleAbsoluPostTraitement !== undefined) {
                            let uneBorneDebutPostTraitement = this.phrases[idPhrase].resultats.detections[c].intervalleAbsolu.borneDebut;
                            let _dib53 = this.phrases[idPhrase].resultats.detections[c].intervalleAbsoluPostTraitement.borneFin - this.phrases[idPhrase].resultats.detections[c].intervalleAbsoluPostTraitement.borneDebut;
                            let uneBorneFinPostTraitement = uneBorneDebutPostTraitement + _dib53;
                            this.phrases[idPhrase].resultats.detections[c].intervalleAbsoluPostTraitement = {
                                borneDebut: uneBorneDebutPostTraitement,
                                borneFin: uneBorneFinPostTraitement
                            };
                        }
                    }
                }
            }
        }
    }
    donneIntervalleIdPhrase(idPhrase) {
        return this.phrases[idPhrase].intervalle;
    }
    donneResultatIdPhrase(idPhrase) {
        return this.phrases[idPhrase].resultats;
    }
    metsAJourDonnees(idPhrase) {
        this.maj(true, false, idPhrase);
    }
    donneSorteIntervention() {
        if (!this.phrases) return;
        var aDesErreurs = false;
        let uneIntervention = {
            corrections: 0,
            remplacements: 0,
            autres: 0,
            niveau: false,
            alertePerso: false
        };
        let unObjetPhrases = Object.entries(this.phrases);
        if (unObjetPhrases.length == 1)
            return {
                corrections: -1,
                remplacements: -1,
                autres: -1,
                niveau: false,
                alertePerso: false
            };
        for (let [id, _dib84] of unObjetPhrases) {
            if (id != "nbATraiter" && _dib84.resultats !== undefined) {
                for (let uneDetection of _dib84.resultats.detections) {
                    let actions = determineActions(uneDetection.actions);
                    aDesErreurs = aDesErreurs || (!uneDetection.aEteCorrigee && !uneDetection.estIgnoree);
                    if (aDesErreurs) {
                        uneIntervention.toutCorrigeay = false;
                        uneIntervention.niveau = determineNiveauAlerte(uneDetection.typeSoulignement, DetecteurWeb.niveauAlerte);
                        uneIntervention.corrections = (actions.Corriger || actions.Reformuler) && (!uneDetection.aEteCorrigee && !uneDetection.estIgnoree) ? uneIntervention.corrections + 1 : uneIntervention.corrections;
                        uneIntervention.remplacements = actions.Remplacer ? uneIntervention.remplacements + 1 : uneIntervention.remplacements;
                        uneIntervention.autres = !actions.Remplacer && !actions.Corriger ? uneIntervention.autres + 1 : uneIntervention.autres;
                        uneIntervention.alertePerso = uneIntervention.alertePerso || donneAlertePerso(uneDetection);
                    } else {
                        uneIntervention.toutCorrigeay = true;
                    }
                }
            } else if (id == "nbATraiter" && _dib84 <= 0) {
                uneIntervention.toutCorrigeay = true;
            }
        }
        return uneIntervention;
    }
    donneAlertes() {
        var aDesAlertes = false;
        for (let [id, _dib84] of Object.entries(this.phrases)) {
            if (id != "nbATraiter" && _dib84.resultats !== undefined) {
                for (let c of _dib84.resultats.detections) {
                    aDesAlertes = aDesAlertes || c.aDesDetectionsAlerte;
                }
            }
        }
        return aDesAlertes;
    }
    async donnePhrasesInvalidees(leIntervalleModification) {
        return (await this.envoieMessageAuBckgEtAttendReponse({
            requete: "donnePhrasesInvalidees",
            intervalleModification: leIntervalleModification
        })).phrasesInvalidees;
    }
    recupereCoordonnees() {
        dwAgentTexteur?.reinitPositionDebut();
        this.monWalker = document.createTreeWalker(this.zone, NodeFilter.SHOW_ALL);
        this.monWalker.parentNode();
        for (let [idPhrase, phrase] of Object.entries(this.phrases)) {
            this.recupereCoordonneesPourIdPhrase(idPhrase);
        }
    }
    recupereCoordonneesPourIdPhrase(leIdPhrase, doitRecalculerNoeudPhrase) {
        if (leIdPhrase == "nbATraiter") return;
        if (!!this.phrases && !!this.phrases[leIdPhrase] && this.phrases[leIdPhrase].aErreur) {
            let unePositionDebut = dwAgentTexteur.donnePositionDebut();
            let unCurseurWalker = this.monWalker.currentNode;
            if (doitRecalculerNoeudPhrase) {
                this.calculeNoeudDebutPourIdPhrase(leIdPhrase);
            }
            for (let detectionIdx in this.phrases[leIdPhrase].resultats.detections) {
                let detection = this.phrases[leIdPhrase].resultats.detections[detectionIdx];
                let intervalleSoulignement = this.phrases[leIdPhrase].resultats.detections[detectionIdx].aEteCorrigee ? detection.intervalleAbsoluPostTraitement : detection.intervalleAbsolu;
                let desNouvellesCoordonnees = recupereCoordonneesTexte(this.zone, this.id, intervalleSoulignement, this.phrases[leIdPhrase].noeudDebut);
                if (this.phrases[leIdPhrase].resultats.detections[detectionIdx].coordonnees === undefined) {
                    this.phrases[leIdPhrase].resultats.detections[detectionIdx].coordonnees = desNouvellesCoordonnees;
                } else {
                    this.phrases[leIdPhrase].resultats.detections[detectionIdx].coordonnees = undefined;
                    this.phrases[leIdPhrase].resultats.detections[detectionIdx].coordonnees = metsAJourObjetCoordonnees(this.phrases[leIdPhrase].resultats.detections[detectionIdx].coordonnees, desNouvellesCoordonnees);
                }
                dwAgentTexteur.reinitPositionDebut(unePositionDebut);
                this.monWalker.currentNode = unCurseurWalker;
            }
        }
    }
    calculeNoeudDebutPourIdPhrase(leIdPhrase) {
        if (leIdPhrase == "nbATraiter" || !leIdPhrase) return;
        let intervalle = this.phrases[leIdPhrase].intervalle;
        const noeudPhrase = DetecteurWeb.chercherNoeudPourIntervalle(intervalle.borneDebut, intervalle.borneFin, this.id);
        this.phrases[leIdPhrase].noeudDebut = noeudPhrase;
    }
};

function metsAJourObjetCoordonnees(lesCoords, lesNouvellesCoord) {
    if (lesCoords === undefined) {
        lesCoords = lesNouvellesCoord;
    } else {
        lesCoords.x = lesNouvellesCoord.x;
        lesCoords.y = lesNouvellesCoord.y;
        lesCoords.top = lesNouvellesCoord.top;
        lesCoords.right = lesNouvellesCoord.right;
        lesCoords.bottom = lesNouvellesCoord.bottom;
        lesCoords.left = lesNouvellesCoord.left;
    }
    return lesCoords;
}

function donneListeDeTousLesEnfants(noeud) {
    let liste = [];
    let walker = document.createTreeWalker(noeud, NodeFilter.SHOW_ELEMENT);
    do {
        liste.push(walker.currentNode);
    } while (walker.nextNode());
    return liste;
}
class ClasseDetecteurWeb {
    constructeurObjetDetecteur = ObjetDetecteur;
    constructor() {
        this.mesAnalyseDW = {};
        this.listeGrise = [];
        this.listeFantome = [];
        this.estActivayDW = false;
        this.estAntiOupsActivay = false;
        this.estActifAWeb = false;
        this.niveauAlerte = 2;
        this.versionDonnees = "00000000-0000-0000-0000-000000000000";
        this.devCliCorrSi = "clicorrsi_wasm";
        this.cssDWEstInstallay = false;
        this.intervalAnalyseDW = 0;
        this.intervalReAnalyseDW = 0;
        this.ccorrs = {};
        this.archive = {};
        this.bckg = null;
        this.dictBouton = {};
        this.diffIndexListe = {};
        this.optionEstActivay = false;
        this.estInitialiser = false;
        this.position_x = -1;
        this.bulle = null;
        this.intervallesActivees = [];
        this.objetBoutonsZones = {};
        this.observateurMutation = {};
        this.observateurChangementTaille = {};
        this.observateurIntersection = {};
        this.taireMutations = false;
        this.doitResterReveillay = false;
        this.estInitialisay = false;
        this.fenetresAvecEcouteurs = [];
    }
    static donneCoords(elem) {
        if (!elem) {
            return {
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                height: 0,
                width: 0,
                paddingTop: 0,
                paddingBottom: 0,
                paddingLeft: 0,
                paddingRight: 0,
                marginLeft: 0,
                marginRight: 0,
                marginTop: 0
            };
        }
        let coordonnees = {};
        let estTinyMCEWiki = false;
        if (estTinyMCE(elem)) {
            estTinyMCEWiki = elem.ownerDocument.body.classList.contains("wiki-content");
        }
        let style = window.getComputedStyle(elem);
        let marginTop = style.marginTop !== undefined ? parseInt(style.marginTop) : 0;
        let marginBottom = style.marginBottom !== undefined ? parseInt(style.marginBottom) : 0;
        let marginLeft = style.marginLeft !== undefined ? parseInt(style.marginLeft) : 0;
        let marginRight = style.marginRight !== undefined ? parseInt(style.marginRight) : 0;
        if (!estTinyMCEWiki && elem.ownerDocument.body.id !== undefined && elem.ownerDocument.body.id == "tinymce") {
            let box = elem.getBoundingClientRect();
            coordonnees = {
                top: 0,
                bottom: box.height,
                left: 0,
                right: box.width,
                height: box.height,
                width: box.width,
                paddingTop: 0,
                paddingBottom: 0,
                paddingLeft: 0,
                paddingRight: 0,
                marginLeft: marginLeft,
                marginRight: marginRight,
                marginTop: marginTop
            };
        } else {
            let box = elem.getBoundingClientRect();
            let paddingTop = style.paddingTop !== undefined ? parseInt(style.paddingTop) : 0;
            let paddingBottom = style.paddingBottom !== undefined ? parseInt(style.paddingBottom) : 0;
            let paddingLeft = style.paddingLeft !== undefined ? parseInt(style.paddingLeft) : 0;
            let paddingRight = style.paddingRight !== undefined ? parseInt(style.paddingRight) : 0;
            coordonnees = {
                top: box.top + elem.ownerDocument.defaultView && elem.ownerDocument.defaultView.scrollY,
                bottom: box.bottom + elem.ownerDocument.defaultView && elem.ownerDocument.defaultView.scrollY,
                left: box.left + elem.ownerDocument.defaultView && elem.ownerDocument.defaultView.scrollX,
                right: box.right + elem.ownerDocument.defaultView && elem.ownerDocument.defaultView.scrollX,
                height: !estTextarea(elem) && estBody(elem) ? elem.scrollHeight - paddingTop - paddingBottom : box.height - paddingTop - paddingBottom,
                width: box.width - paddingLeft - paddingRight,
                paddingTop: parseInt(paddingTop),
                paddingBottom: parseInt(paddingBottom),
                paddingLeft: parseInt(paddingLeft),
                paddingRight: parseInt(paddingRight),
                marginTop: marginTop,
                marginBottom: marginBottom,
                marginLeft: marginLeft,
                marginRight: marginRight
            };
        }
        return coordonnees;
    }
    init(e) {
        if (this.estInitialiser) return;
        this.estInitialiser = true;
        this.installeDetecteurWeb = this.installeDetecteurWeb.bind(this);
        this.recoisMessageDuDetecteurWebPerisprit = this.recoisMessageDuDetecteurWebPerisprit.bind(this);
        this.ecouteurTabulation = this.ecouteurTabulation.bind(this);
        this.ecouteUndoRedo = this.ecouteUndoRedo.bind(this);
        this.ecouteurPointeur = this.ecouteurPointeur.bind(this);
        this.audite = this.audite.bind(this);
        this.cacheInfobulle = this.cacheInfobulle.bind(this);
        this.ajouteEcouteurs(window);
        var iframes = document.getElementsByTagName(cstNomNoeudIframe);
        if (iframes != null) {
            for (var i = 0; i < iframes.length; i++) {
                try {
                    if (estElementAccessible(iframes[i])) {
                        if (iframes[i].src == "" || verifieMemeOrigine(document.URL, iframes[i].src)) {
                            this.ajouteEcouteurs(iframes[i].contentWindow);
                        }
                    }
                } catch (erreur) {
                    console.error("dw.detecteurWeb.init.1", erreur);
                }
            }
        }
        try {
            let observer = new MutationObserver(callback.bind(this));

            function callback(mutations) {
                if (estOverleaf() && this.doitResterReveillay) {
                    for (let e of Array.from(document.querySelectorAll("span.ol-cm-spelling-error"))) {
                        e.classList.remove("ol-cm-spelling-error");
                    }
                }
                for (let m of mutations) {
                    for (let [id, zone] of Object.entries(this.objetBoutonsZones)) {
                        if (zone.zone.ownerDocument.defaultView === null || zone.zone.parentNode === null) this.desinstalleBouton(id, false);
                        if (m.removedNodes.length > 0) {
                            for (let removed of m.removedNodes) {
                                if (zone.zone === removed) this.desinstalleBouton(id, false);
                            }
                        }
                    }
                    if (m.addedNodes.length > 0) {
                        let iframes = Array.from(m.addedNodes).map(e => donneListeDeTousLesEnfants(e)).flat(1).filter(e => estIFrame(e));
                        for (let i of iframes) {
                            if (estSrcAccessible(i.src) || i.src == "" || verifieMemeOrigine(document.URL, i.src)) {
                                setTimeout(function() {
                                    this.ajouteEcouteurs(i.contentWindow);
                                }.bind(this), 100);
                            }
                        }
                    }
                }
            }
            if (document.body instanceof Node) {
                observer.observe(document.body, {
                    childList: true,
                    attributes: true,
                    subtree: true,
                    attributeOldValue: true,
                });
            }
        } catch (erreur) {
            console.error("dw.detecteurWeb.init.2", erreur);
        }
        window.addEventListener('message_dw-comm', function(m) {
            this.traiteMessageDuBckg(JSON.parse(m.detail));
        }.bind(this))
    }
    async ajouteEcouteurs(leElementFenetre) {
        if (leElementFenetre && leElementFenetre !== undefined && !this.fenetresAvecEcouteurs.includes(leElementFenetre)) {
            this.detruisEcouteurs(leElementFenetre);
            let controlleur = new AbortController();
            let signal = controlleur.signal;
            leElementFenetre.addEventListener("input", this.installeDetecteurWeb, {
                signal
            });
            leElementFenetre.addEventListener("dblclick", this.installeDetecteurWeb, {
                signal
            });
            leElementFenetre.addEventListener("pointerup", this.installeDetecteurWeb, {
                signal
            });
            leElementFenetre.addEventListener("keyup", this.ecouteurTabulation, {
                signal
            });
            leElementFenetre.addEventListener("keydown", this.ecouteUndoRedo, {
                signal
            });
            document.addEventListener("pointerup", this.ecouteurPointeur, false);
            window.addEventListener('message_dw', this.recoisMessageDuDetecteurWebPerisprit, false);
            this.fenetresAvecEcouteurs.push({
                element: leElementFenetre,
                controlleur
            });
        }
    }
    async detruisEcouteurs(leElementFenetre) {
        if (leElementFenetre && leElementFenetre !== undefined) {
            leElementFenetre.removeEventListener("input", this.installeDetecteurWeb, false);
            leElementFenetre.removeEventListener("dblclick", this.installeDetecteurWeb, false);
            leElementFenetre.removeEventListener("pointerup", this.installeDetecteurWeb, false);
            leElementFenetre.removeEventListener("keyup", this.ecouteurTabulation, false);
            leElementFenetre.removeEventListener("keydown", this.ecouteUndoRedo, false);
            document.removeEventListener("pointerup", this.ecouteurPointeur, false);
            window.removeEventListener('message_dw', this.recoisMessageDuDetecteurWebPerisprit, false);
            this.fenetresAvecEcouteurs = this.fenetresAvecEcouteurs.filter(e => e.element !== leElementFenetre);
        }
    }
    async ecouteurPointeur(e) {
        if (document.getElementById("infobulle_")) {
            let idDetecteur = document.getElementById("infobulle_").getAttribute("iddetecteurweb");
            if (idDetecteur && !!this.objetBoutonsZones[idDetecteur]) {
                let unElement = this.objetBoutonsZones[idDetecteur].zone;
                if (unElement[0] != e.target && (e.target.id !== undefined && e.target.id != "infobulle_")) {
                    this.envoieMessageAuDetecteurWebPerisprit({
                        message: "cache_infobulle",
                        id: idDetecteur
                    });
                }
            }
        }
        if (e.target.id === undefined || e.explicitOriginalTarget === undefined || e.explicitOriginalTarget.id === undefined || e.explicitOriginalTarget.id != "fiole_bouton") {
            let uneListeBoutonDW = chercheElement('*[data-druide_dw="bouton"]');
            for (let b of uneListeBoutonDW) {
                if (b.id !== undefined) {
                    this.envoieMessageAuDetecteurWebPerisprit({
                        message: "ouvreferme_menubulle",
                        id: b.id,
                        commande: "hidden"
                    });
                }
            }
        }
    }
    async ecouteurTabulation(leEvenement) {
        if (leEvenement.keyCode == 9 || leEvenement.keyCode == 8 || leEvenement.keyCode == 13 || leEvenement.keyCode == 46) {
            this.installeDetecteurWeb(leEvenement);
        }
    }
    async ecouteUndoRedo(e) {
        if (estEvenementUndoRedo(e)) {
            this.installeDetecteurWeb(e);
        }
    }
    ferme(e) {
        for (let [id, ccorrs] of Object.entries(this.ccorrs)) {
            envoieVersBackground({
                message: "dw-comm",
                requete: "ferme",
                id: id
            });
        }
    }
    async traiteMessageDuBckg(msg, port) {
        if (msg.message != "dw-comm" && msg.message != "dw-message") return;
        if (msg.reponse == "etatConnexion") {
            if (msg.connectay) {
                let C = new CustomEvent('dw-comm', {
                    detail: JSON.stringify(msg)
                });
                window.dispatchEvent(C);
            } else {
                if (msg.type == "erreur") {
                    this.envoieMessageAuDetecteurWebPerisprit({
                        message: "supprime_soulignements_infobulles",
                        id: msg.id,
                        phrasesIds: Object.keys(this.ccorrs[msg.id].phrases)
                    });
                    this.envoieMessageAuDetecteurWebPerisprit({
                        message: "desactive_bouton",
                        id: msg.id
                    });
                } else if (msg.type == "expiray") {
                    this.envoieMessageAuDetecteurWebPerisprit({
                        message: "supprime_soulignements_infobulles",
                        id: msg.id,
                        phrasesIds: Object.keys(this.ccorrs[msg.id].phrases)
                    });
                    this.envoieMessageAuDetecteurWebPerisprit({
                        message: "active_bouton_expiray",
                        id: msg.id
                    });
                }
            }
        } else if (msg.reponse == "messageRecu") {
            if (msg.data === undefined) {
                return;
            }
            let donneesRecues = JSON.parse(msg.data);
            if (typeof donneesRecues == "string") {
                donneesRecues = JSON.parse(donneesRecues);
            }
            if (this.ccorrs[msg.id]) {
                let unArrayDonnees = donneesRecues;
                if (!Array.isArray(donneesRecues)) {
                    unArrayDonnees = new Array();
                    unArrayDonnees.push(donneesRecues);
                }
                for (let d of unArrayDonnees) {
                    await this.ccorrs[msg.id].traiteMessageCorrecteurSimple(d);
                }
            }
        } else if (msg.reponse === "donnerInfobulleComplete") {
            this.ccorrs[msg.id].metsAJourInfobulle(msg);
        } else if (msg.requete !== undefined && msg.requete == "nettoie") {
            delete this.archive[msg.id];
            let C = new CustomEvent('dw-comm', {
                detail: JSON.stringify(msg)
            });
            window.dispatchEvent(C);
        }
    }
    donneSelection(zone, zoneID) {
        const vieilleLongueurTexte = this.objetBoutonsZones[zoneID].longueurTexte;
        this.construireListePositionsNoeuds(zone, zoneID, true);
        let interval = {
            d: 0,
            f: 0
        };
        if (zone && zone.getAttribute(cstChaineContenteditable) && estUnElementValide(zone)) {
            const laSelection = zone.ownerDocument.defaultView.getSelection();
            const offsetFocus = laSelection.focusNode !== zone ? (Object.values(this.objetBoutonsZones[zoneID].listePositionsNoeuds).find(e => e.noeud === laSelection.focusNode)?.posDebut ? Object.values(this.objetBoutonsZones[zoneID].listePositionsNoeuds).find(e => e.noeud === laSelection.focusNode)?.posDebut : 0) : 0;
            const offsetAnchor = laSelection.anchorNode !== zone ? (Object.values(this.objetBoutonsZones[zoneID].listePositionsNoeuds).find(e => e.noeud === laSelection.anchorNode)?.posDebut ? Object.values(this.objetBoutonsZones[zoneID].listePositionsNoeuds).find(e => e.noeud === laSelection.anchorNode).posDebut : 0) : 0;
            interval = {
                d: Math.min(offsetAnchor + laSelection.anchorOffset, offsetFocus + laSelection.focusOffset),
                f: Math.max(offsetAnchor + laSelection.anchorOffset, offsetFocus + laSelection.focusOffset)
            };
        } else if ((estTextarea(zone) || estInput(zone)) && estUnElementValide(zone) && zone.nodeType !== Node.TEXT_NODE) {
            interval = {
                d: zone.selectionStart,
                f: zone.selectionEnd
            };
        }
        interval.vieilleLongueurTexte = vieilleLongueurTexte;
        return interval;
    }
    construireListePositionsNoeuds(zone, zoneID, sauvegarderDansObj) {
        let resultat = AgentTexteurStd.construireListePositionsNoeuds(zone, AgentTexteurStd.filtre, false);
        if (estTextarea(zone) || estInput(zone)) {
            if (sauvegarderDansObj) {
                this.objetBoutonsZones[zoneID] = {
                    zone: zone,
                    listePositionsNoeuds: resultat.liste,
                    longueurTexte: zone.value.length,
                    texteZone: zone.value
                };
            }
            return {
                liste: resultat.liste,
                longueurTexte: zone.value.length,
                texteZone: zone.value
            };
        }
        if (sauvegarderDansObj) {
            this.objetBoutonsZones[zoneID] = {
                zone: zone,
                listePositionsNoeuds: resultat.liste,
                longueurTexte: resultat.longueurTexte,
                texteZone: resultat.leTexte
            }
        }
        return {
            liste: resultat.liste,
            longueurTexte: resultat.longueurTexte,
            texteZone: resultat.leTexte
        };
    }
    chercherNoeudPourIntervalle(d, f, id) {
        let liste = this.objetBoutonsZones[id].listePositionsNoeuds;
        let nombreIterations = 0;
        let indexDebut = 0;
        let indexFin = liste.length;
        let index, posDebut, posFin;
        let noeudDebut = null;
        let noeudFin = null;
        while (liste.length > 0) {
            if (nombreIterations > 100) {
                return liste[0];
            }
            index = Math.floor((indexDebut + indexFin) / 2);
            posDebut = liste[index].posDebut;
            posFin = liste[index].posFin;
            if (posDebut > d) indexFin = index;
            else if (posDebut < d && posFin < d) indexDebut = index;
            else if (posDebut <= d && posFin >= d) {
                noeudDebut = liste[index];
                break;
            }
            nombreIterations++;
        }
        return noeudDebut;
    }
    donneTimeout(id) {
        const leObj = this.objetBoutonsZones;
        if (leObj[id] === undefined || (leObj[id] !== undefined && leObj[id].longueurTexte < 10000)) return 500;
        if (leObj[id].longueurTexte >= 10000 && leObj[id].longueurTexte < 50000) return 700;
        return 1500;
    }
    estEvenementSuppression(e) {
        return (!this.taireMutations && ((e.type == "input" && e.isTrusted) || (e.type == "keyup" && (e.keyCode == 8 || e.keyCode == 46)) || (e.type == "keydown" && estEvenementUndoRedo(e))));
    }
    async installeDetecteurWeb(e) {
        if (!this.estActivayDW) return;
        if (this.taireMutations) return;
        var element = document.activeElement;
        if (e !== undefined) {
            element = e.target;
            if (e.type == "paste") {
                if (e.target != null && e.target.id != null && e.target.id == "mcepastebin") {
                    if (e.path !== undefined && e.path[1]) {
                        element = e.path[1];
                    } else if (e.explicitOriginalTarget !== undefined) {
                        element = e.explicitOriginalTarget;
                    }
                }
            }
        }
        element = chercheElementEditable(element);
        this.nettoieBouton(element);
        let unIdBouton = Object.keys(this.objetBoutonsZones).find(key => this.objetBoutonsZones[key].zone === element);
        if (unIdBouton != null && unIdBouton !== undefined && unIdBouton != "" && e.isTrusted && !this.listeGrise.includes(unIdBouton)) {
            if (this.estEvenementSuppression(e) && !estTextarea(element) && !estInput(element) && !!this.ccorrs[unIdBouton]) {
                const interval = this.donneSelection(element, unIdBouton);
                const vieilleLongueurTexte = interval.vieilleLongueurTexte;
                let uuidPhrase = await this.ccorrs[unIdBouton].donnePhrasesInvalidees({
                    borneDebut: Math.min(vieilleLongueurTexte, interval.d),
                    borneFin: Math.max(vieilleLongueurTexte, interval.d)
                });
                this.envoieMessageAuDetecteurWebPerisprit({
                    message: "supprime_soulignements_infobulles",
                    id: unIdBouton,
                    phrasesIds: uuidPhrase
                });
                this.envoieMessageAuDetecteurWebPerisprit({
                    message: "mets_icone_analyse",
                    id: unIdBouton
                });
            }
            this.envoieMessageAuDetecteurWebPerisprit({
                message: "montre_cache_infobulle",
                id: unIdBouton,
                origine: e.type,
                jeInhibeDoubleclic: this.optionEstActivay,
                position: {
                    x: e.x,
                    y: e.y
                },
                _dib84: this.ccorrs[unIdBouton] !== undefined ? this.ccorrs[unIdBouton].phrases : null
            });
            this.cacheBoutons(unIdBouton);
            return;
        }
        if (estElementPourDW(element)) {
            element = chercheNoeudEditableVoulu(element);
            if (contientElementFormulaire(element)) {
                monElementPourDW = element;
            }
            if (this.estActivayDW) {
                if (this.autoriseAjoutBoutonDW(element)) {
                    unIdBouton = await this.ajouteBoutonDW(element, true);
                    this.cacheBoutons(unIdBouton);
                    element.addEventListener('scroll', function(ev) {
                        this.envoieMessageAuDetecteurWebPerisprit({
                            message: "defilement",
                            id: unIdBouton,
                            scrollTop: ev.target.scrollTop,
                            scrollHeight: ev.target.scrollHeight
                        });
                    }.bind(this), false);
                    if (this.estActivayCorrectionExpress) {
                        let interval_func = function(id, textePrecedent) {
                            if (!this.listeGrise.includes(id) && this.intervallesActivees.includes(id) && !!element?.ownerDocument?.getElementById(id)) {
                                let temps = 1000;
                                if (this.objetBoutonsZones[id] && this.objetBoutonsZones[id].longueurTexte > 5000) {
                                    temps = 1000 + (this.objetBoutonsZones[id].longueurTexte / 2);
                                }
                                if (this.intervalAnalyseDW === 0 && element?.value !== textePrecedent) {
                                    this.analyseDW(id);
                                }
                                if (element && this.intervalAnalyseDW == 0) this.cloneEtEnvoieElement(element, id);
                                this.intervalTimeout = setTimeout(interval_func, temps, id, element?.value);
                            }
                        }.bind(this);
                        if (estTextarea(element) || estInput(element)) {
                            if (!this.intervallesActivees.includes(unIdBouton)) {
                                this.intervallesActivees.push(unIdBouton);
                                interval_func(unIdBouton, element.value);
                            }
                            element.addEventListener("paste", this.audite, false);
                            element.addEventListener("input", this.audite, false);
                        }
                    }
                    this.envoieMessageAuDetecteurWebPerisprit({
                        message: "montre_cache_infobulle",
                        id: unIdBouton,
                        origine: e.type,
                        jeInhibeDoubleclic: this.optionEstActivay,
                        position: {
                            x: e.x,
                            y: e.y
                        },
                        _dib84: this.ccorrs[unIdBouton] !== undefined ? this.ccorrs[unIdBouton].phrases : null
                    });
                    this.envoieMessageAuDetecteurWebPerisprit({
                        message: "montre_bouton",
                        id: unIdBouton
                    });
                    this.analyseDW(unIdBouton);
                    this.doitResterReveillay = true;
                }
            }
        }
    }
    indiqueChamp(leIdBouton, etat) {
        const indexIdActivay = this.listeGrise.indexOf(leIdBouton);
        if (indexIdActivay > -1) {
            let element = this.objetBoutonsZones[leIdBouton].zone;
            if (etat) {
                desAttributsStyle = element.getAttribute("style");
                let desAttributsStyleAugmentes = desAttributsStyle + "; border: 1px solid #BDDEFF !important; border-radius: 2px !important; box-shadow: 5px 10px 18px #2496FF !important;"
                element.setAttribute("style", desAttributsStyleAugmentes);
            } else {
                element.setAttribute("style", desAttributsStyle);
            }
        } else {
            this.envoieMessageAuDetecteurWebPerisprit({
                message: "indiqueChamp",
                id: leIdBouton,
                etat: etat
            });
        }
    }
    async reinstalleBouton(leIdBouton) {
        const indexIdActivay = this.listeGrise.indexOf(leIdBouton);
        this.listeGrise.splice(indexIdActivay, 1);
        this.listeFantome.push(leIdBouton);
        let element = this.objetBoutonsZones[leIdBouton].zone;
        element.setAttribute("style", desAttributsStyle);
        let unNouveauIdBouton = await this.ajouteBoutonDW(element, true);
        this.cacheBoutons(unNouveauIdBouton);
        envoieVersBackground({
            message: "dw-comm",
            requete: "metsAJourZoneIgnoree",
            aZoneIgnoree: this.listeGrise.length > 0
        });
    }
    async reinstalleBoutons() {
        for (let unIdx = 0; unIdx < this.listeGrise.length; unIdx++) {
            let unIdBouton = this.listeGrise[unIdx];
            this.listeFantome.push(unIdBouton);
            let element = this.objetBoutonsZones[unIdBouton].zone;
            let unNouveauIdBouton = await this.ajouteBoutonDW(element, true);
            this.cacheBouton(unNouveauIdBouton);
        }
        this.listeGrise = [];
        envoieVersBackground({
            message: "dw-comm",
            requete: "metsAJourZoneIgnoree",
            aZoneIgnoree: this.listeGrise.length > 0
        });
    }
    async desinstalleBouton(leIdBouton, sauvegardeDansListeGrise, supprimeBouton, laRaison) {
        if (supprimeBouton === undefined) {
            supprimeBouton = true;
        }
        if (laRaison === undefined) {
            laRaison = "";
        }
        let unElement = this.objetBoutonsZones[leIdBouton] !== undefined ? this.objetBoutonsZones[leIdBouton].zone : null;
        if (unElement && sauvegardeDansListeGrise) {
            unElement.removeEventListener("input", this.audite, false);
            unElement.removeEventListener("paste", this.audite, false);
            if (estCKEditor5(unElement) && unElement.parentElement !== undefined) {
                let unAttributSpelcheck = unElement.parentElement.getAttribute("druide_spellcheck");
                if (unAttributSpelcheck == "true") {
                    unElement.parentElement.setAttribute("spellcheck", "true");
                    unElement.parentElement.removeAttribute("druide_spellcheck");
                } else if (unAttributSpelcheck == "vide") {
                    unElement.parentElement.removeAttribute("spellcheck");
                    unElement.parentElement.removeAttribute("druide_spellcheck");
                }
            } else {
                let unAttributSpelcheck = unElement.getAttribute("druide_spellcheck");
                if (unAttributSpelcheck == "true") {
                    unElement.setAttribute("spellcheck", "true");
                    unElement.removeAttribute("druide_spellcheck");
                } else if (unAttributSpelcheck == "vide") {
                    unElement.removeAttribute("spellcheck");
                    unElement.removeAttribute("druide_spellcheck");
                }
            }
            let desNoeudsTempClasse = document.querySelectorAll("*[data-druide-temp-classe]");
            for (let unNoeud of desNoeudsTempClasse) {
                unNoeud.className = unNoeud.dataset.druideTempClasse;
                unNoeud.dataset.druideTempClasse = "";
                unNoeud.removeAttribute("data-druide-temp-classe");
            }
            this.listeGrise.push(leIdBouton);
            if (this.listeFantome.includes(leIdBouton)) {
                let i = this.listeFantome.indexOf(leIdBouton);
                this.listeFantome.splice(i, 1);
            }
        } else {
            this.listeFantome.push(leIdBouton);
        }
        if (this.ccorrs[leIdBouton] !== undefined) {
            this.envoieMessageAuDetecteurWebPerisprit({
                message: "supprime_soulignements_infobulles",
                id: leIdBouton,
                phrasesIds: Object.keys(this.ccorrs[leIdBouton].phrases)
            });
        }
        let unBoutonClone = this.dictBouton[leIdBouton].cloneBoutonDW;
        let unBouton = this.dictBouton[leIdBouton].contenantBoutonDW;
        let uneSectionDW = this.dictBouton[leIdBouton].element;
        if (unElement && supprimeBouton) {
            if (!!unBoutonClone) {
                unBoutonClone.dataset.a_supprimer = "1";
            }
            if (!!unBouton) {
                unBouton.remove();
                if (!!unBoutonClone) unBoutonClone.remove();
                if (!!uneSectionDW) uneSectionDW.remove();
            }
            if (!sauvegardeDansListeGrise) {
                let unElement = this.objetBoutonsZones[leIdBouton].zone;
                unElement.removeAttribute("data-antidote_dw_id");
                unElement.removeAttribute("data-antidote_dw");
                delete this.objetBoutonsZones[leIdBouton];
            }
            unElement.ownerDocument.removeEventListener('scroll', this.cacheInfobulle, false);
            if (!!this.observateurMutation[leIdBouton]) this.observateurMutation[leIdBouton].disconnect();
            if (!!this.observateurChangementTaille[leIdBouton]) this.observateurChangementTaille[leIdBouton].disconnect();
            if (!!this.observateurIntersection[leIdBouton]) this.observateurIntersection[leIdBouton].disconnect();
            const indexIdActivay = this.intervallesActivees.indexOf(leIdBouton);
            this.intervallesActivees.splice(indexIdActivay, 1);
            clearTimeout(this.dictBouton[leIdBouton].intervallePositionnement);
            clearTimeout(this.dictBouton[leIdBouton].intervalleRepositionnementBouton);
            delete this.dictBouton[leIdBouton];
        } else if (unBouton.length >= 1) {
            if (laRaison == "") {
                this.cacheBouton(leIdBouton);
            } else if (laRaison == "texte_trop_long") {
                this.envoieMessageAuDetecteurWebPerisprit({
                    message: "texte_trop_long",
                    id: leIdBouton
                });
            }
        }
        if (this.ccorrs[leIdBouton] !== undefined) {
            await this.ccorrs[leIdBouton].deconnecteWS("ferme");
            delete this.ccorrs[leIdBouton];
            dwAgentTexteur = null;
        }
    }
    desinstalleBoutons() {
        var uneListeBoutonDW = chercheElement('*[data-druide_dw="bouton"]');
        for (let b of uneListeBoutonDW) {
            if (b.id !== undefined) {
                this.desinstalleBouton(b.id, false);
            } else {
                for (let c of b) {
                    this.desinstalleBouton(c.id, false);
                }
            }
        }
        for (let idGris of this.listeGrise) {
            var r = this.objetBoutonsZones[idGris].zone;
            r.removeAttribute("data-antidote_dw_id");
            r.removeAttribute("data-antidote_dw");
        }
        this.listeGrise = [];
        this.listeFantome = [];
        let uneInfobulle = chercheElement('*[id="infobulle_"]');
        if (uneInfobulle.length >= 1) {
            uneInfobulle[0].remove();
        }
        this.bulle = null;
    }
    detruisDetecteur() {
        window.clearTimeout(this.intervalReAnalyseDW);
        window.clearTimeout(this.intervalTimeout);
        this.desinstalleBoutons();
        this.detruisEcouteurs(window);
        var iframes = document.getElementsByTagName(cstNomNoeudIframe);
        if (iframes != null) {
            for (var i = 0; i < iframes.length; i++) {
                try {
                    if (estElementAccessible(iframes[i])) {
                        if (iframes[i].src == "" || verifieMemeOrigine(document.URL, iframes[i].src)) {
                            this.detruisEcouteurs(iframes[i].contentWindow);
                        }
                    }
                } catch (erreur) {
                    console.error("dw.detecteurWeb.detruisDetecteur", erreur);
                }
            }
        }
        this.estInitialiser = false;
        this.doitResterReveillay = false;
    }
    nettoieBouton(leElement) {
        if (!leElement || !leElement.dataset) return;
        let unIdTest = leElement.dataset.antidote_dw_id !== undefined ? leElement.dataset.antidote_dw_id : "";
        let uneListeBoutonDW = chercheElement('*[id="' + unIdTest + '"]');
        let unBouton = chercheElement('*[id="b' + unIdTest + '"]');
        if (boutonsASupprimer.includes(unIdTest)) {
            for (let b of uneListeBoutonDW) {
                b.remove();
            }
            for (let b of unBouton) {
                b.remove();
            }
        }
        let desBoutonsAEC = chercheElement('*[data-bouton-aec]');
        for (let unBoutonAEC of desBoutonsAEC) {
            if (unBoutonAEC.dataset !== undefined) {
                let unIDDw = unBoutonAEC.dataset.boutonAec;
                let unDWAssociay = chercheElement('*[id="' + unIDDw + '"]');
                if (unDWAssociay.length == 0) {
                    unBoutonAEC.remove();
                }
            }
        }
    }
    cacheBouton(leIdBouton) {
        this.envoieMessageAuDetecteurWebPerisprit({
            message: "cache_bouton",
            id: leIdBouton
        });
    }
    cacheBoutons(leIdActif) {
        var uneListeBoutonDW = chercheElement('*[data-druide_dw="bouton"]');
        for (let b of uneListeBoutonDW) {
            if (b.id !== undefined) {
                if (b.id != leIdActif) {
                    this.cacheBouton(b.id);
                }
            } else {
                for (let c of b) {
                    if (c.id != leIdActif) {
                        this.cacheBouton(c.id);
                    }
                }
            }
        }
        envoieVersBackground({
            message: "dw-comm",
            requete: "metsAJourChampActif",
            idActif: leIdActif,
            actif: !this.listeGrise.includes(leIdActif)
        });
    }
    cacheInfobulle(e) {
        if (!document.querySelector("#infobulle_")) return;
        let idInfobulle = document.querySelector("#infobulle_").getAttribute("iddetecteurweb");
        this.envoieMessageAuDetecteurWebPerisprit({
            message: "cache_infobulle",
            id: idInfobulle
        });
    }
    activeDetecteurWeb(_dib84) {
        this.devCliCorrSi = _dib84.donnees_globales.infoDW.devCliCorrSi !== undefined ? _dib84.donnees_globales.infoDW.devCliCorrSi : "clicorrsi_wasm";
        this.position_x = _dib84.position_x !== undefined ? _dib84.position_x : -1;
        this.estAntiOupsActivay = false;
        if (_dib84.activationDW && _dib84.donnees_globales.infoDW.activation[_dib84.donnees_globales.idAntidote].disponible) {
            if (this.estActivayDW != _dib84.activationDW) {
                this.listeGrise = [];
                this.listeFantome = [];
                this.init();
            }
        } else {
            window.document.removeEventListener("input", this.installeDetecteurWeb, false);
            this.detruisDetecteur();
        }
        this.estActivayDW = _dib84.activationDW && _dib84.donnees_globales.infoDW.activation[_dib84.donnees_globales.idAntidote].disponible;
        if (this.estActivayDW) {
            this.metsAjourEtatDWeb(this.estActivayDW, _dib84.donnees_globales.infoDW.niveauAlerte);
        }
        window.postMessage({
            message: "etatDWGDocs",
            etatDW: _dib84.activationDW
        });
    }
    envoieMessageAuDetecteurWebPerisprit(msg) {
        let aEteEnvoye = false;
        try {
            msg.id = msg.id === undefined ? Object.keys(this.objetBoutonsZones)[0] : msg.id;
            const unElement = Object.keys(this.objetBoutonsZones).length > 0 ? this.objetBoutonsZones[msg.id] ? this.objetBoutonsZones[msg.id].zone : Object.values(this.objetBoutonsZones)[0].zone : undefined;
            msg._dib105 = 'messageDetecteurWebPerisprit';
            let unDetecteur = this.dictBouton[msg.id];
            if (unDetecteur === undefined && !!unElement) {
                let zIndexMax = findHighestZIndex("*");
                unDetecteur = new this.constructeurObjetDetecteur({
                    id: msg.id,
                    zIndex: zIndexMax,
                    estActivayCorrectionExpress: this.estActivayCorrectionExpress,
                    position_x: this.position_x
                });
                if (!this.bulle) {
                    this.bulle = new ObjetBulle({
                        id: msg.id,
                        zIndex: zIndexMax,
                        estActivayCorrectionExpress: this.estActivayCorrectionExpress,
                        position_x: this.position_x
                    });
                    this.bulle.init();
                }
                this.dictBouton[msg.id] = unDetecteur;
                this.dictBouton[msg.id].init(unElement.ownerDocument, unElement);
            }
            if (msg.id !== undefined && unElement && unElement !== undefined) {
                unDetecteur.traiteMessagePourBoutonDW(msg);
                aEteEnvoye = true;
            }
        } catch (erreur) {
            console.error("dw.detecteurWeb.envoieMessageAuDetecteurWebPerisprit", erreur);
        }
        return aEteEnvoye;
    }
    async recoisMessageDuDetecteurWebPerisprit(e) {
        e.data = e.detail;
        if (e.data.message == "lanceOutil") {
            if (e.data.outil !== undefined) {
                mesElementsPourDW = [];
                jeSuisLiayAPI = lieDetecteur(document, e.data.id, this.objetBoutonsZones);
                if (mesElementsPourDW.length == 1) {
                    monElementPourDW = mesElementsPourDW[0].value;
                    mesElementsPourDW = [];
                } else if (mesElementsPourDW.length > 1) {
                    jAiPlusieursElementsAPI = true;
                    monElementPourDW = null;
                }
                var edit_arg = {
                    message: "lanceOutil",
                    outil: e.data.outil
                };
                envoieVersBackground(edit_arg);
            }
        } else if (e.data.message == "lanceOutilDetecteurWeb") {
            let msg = e.data;
            msg.idAppelant = e.data.idAppelant;
            envoieVersBackground(msg);
        } else if (e.data.message == "ConnexionAWebDetecteurWeb") {
            envoieVersBackground({
                message: "ConnexionAWebDetecteurWeb",
                outil: e.data.outil,
                idAppelant: e.data.idAppelant
            });
        } else if (e.data.message == "ignoreZone") {
            this.desinstalleBouton(e.data.id, true);
            envoieVersBackground({
                message: "dw-comm",
                requete: "metsAJourZoneIgnoree",
                aZoneIgnoree: this.listeGrise.length > 0
            });
        } else if (e.data.message == "ignoreZones") {
            this.desinstalleBoutons();
            envoieVersBackground({
                message: "dw-comm",
                requete: "metsAJourActivation",
                activationDW: false
            });
        } else if (e.data.message == "applique_correction") {
            let unIdBouton = e.data.id;
            this.recupereAgentSelonId(unIdBouton);
            let unMessageAppliqueCorrection = {};
            let unTypeCorrection = "insertion";
            if (e.data.type == "correction" || e.data.type == "retabli" || e.data.type == "remplacer" || e.data.type == "remplacerParReformulation") {
                dwAgentTexteur.initialiseTexteur(true);
                dwAgentTexteur.donneLesZonesACorriger({
                    estCorrecteur: true
                })
                let uneChaineCorrection = "";
                let uneBorneDebut = 0;
                let uneBorneFin = 0;
                let actions = determineActions(this.ccorrs[unIdBouton].phrases[e.data.idPhrase].resultats.detections[e.data.indexDetection].actions);
                uneChaineCorrection = e.data.type == "correction" || e.data.type == "remplacer" ? this.ccorrs[unIdBouton].phrases[e.data.idPhrase].resultats.corrections[e.data.idCorrection][cstChaine] : this.ccorrs[unIdBouton].phrases[e.data.idPhrase].resultats.corrections[e.data.idCorrection].chaineDecorrection;
                uneBorneDebut = e.data.type == "correction" || e.data.type == "remplacer" ? this.ccorrs[unIdBouton].phrases[e.data.idPhrase].resultats.corrections[e.data.idCorrection].intervalleAbsolu.borneDebut : this.ccorrs[unIdBouton].phrases[e.data.idPhrase].resultats.corrections[e.data.idCorrection].intervalleAbsoluDecorrection.borneDebut;
                uneBorneFin = e.data.type == "correction" || e.data.type == "remplacer" ? this.ccorrs[unIdBouton].phrases[e.data.idPhrase].resultats.corrections[e.data.idCorrection].intervalleAbsolu.borneFin : this.ccorrs[unIdBouton].phrases[e.data.idPhrase].resultats.corrections[e.data.idCorrection].intervalleAbsoluDecorrection.borneFin;
                let uneChaineOriginale = "";
                dwAgentTexteur.jeUtiliseEnveloppeIntervalleTexte = false;
                this.taireMutations = true;
                var texto = await dwAgentTexteur.corrigeDansTexteur({
                    _dib37: uneChaineCorrection,
                    _dib49: uneBorneDebut,
                    _dib50: uneBorneFin,
                    _dib99: "0",
                    estDW: unIdBouton
                });
                let unIntervalle = {};
                let unIntervalleAbsolu = {};
                let unTypeAction = true;
                if (e.data.type == "correction") {
                    uneChaineOriginale = texto;
                    this.ccorrs[unIdBouton].phrases[e.data.idPhrase].resultats.detections[e.data.indexDetection].aEteCorrigee = true;
                    this.ccorrs[unIdBouton].phrases[e.data.idPhrase].resultats.detections[e.data.indexDetection].estIgnoree = false;
                    unIntervalle = this.ccorrs[unIdBouton].phrases[e.data.idPhrase].resultats.corrections[e.data.idCorrection].intervalle;
                    unIntervalleAbsolu = this.ccorrs[unIdBouton].phrases[e.data.idPhrase].resultats.corrections[e.data.idCorrection].intervalleAbsolu;
                    if (this.ccorrs[unIdBouton].phrases[e.data.idPhrase].resultats.corrections[e.data.idCorrection][cstChaine] == "" && this.ccorrs[unIdBouton].phrases[e.data.idPhrase].resultats.corrections[e.data.idCorrection].intervalle.borneDebut != this.ccorrs[unIdBouton].phrases[e.data.idPhrase].resultats.corrections[e.data.idCorrection].intervalle.borneFin) {
                        unTypeCorrection = "suppression";
                        this.ccorrs[unIdBouton].phrases[e.data.idPhrase].resultats.corrections[e.data.idCorrection].chaineDecorrection = uneChaineOriginale;
                        this.ccorrs[unIdBouton].phrases[e.data.idPhrase].resultats.corrections[e.data.idCorrection].intervalleDecorrection = {
                            borneDebut: this.ccorrs[unIdBouton].phrases[e.data.idPhrase].resultats.corrections[e.data.idCorrection].intervalle.borneDebut,
                            borneFin: this.ccorrs[unIdBouton].phrases[e.data.idPhrase].resultats.corrections[e.data.idCorrection].intervalle.borneDebut
                        };
                        this.ccorrs[unIdBouton].phrases[e.data.idPhrase].resultats.corrections[e.data.idCorrection].intervalleAbsoluDecorrection = {
                            borneDebut: this.ccorrs[unIdBouton].phrases[e.data.idPhrase].resultats.corrections[e.data.idCorrection].intervalleAbsolu.borneDebut,
                            borneFin: this.ccorrs[unIdBouton].phrases[e.data.idPhrase].resultats.corrections[e.data.idCorrection].intervalleAbsolu.borneDebut
                        };
                    } else if (this.ccorrs[unIdBouton].phrases[e.data.idPhrase].resultats.corrections[e.data.idCorrection][cstChaine] != "" && this.ccorrs[unIdBouton].phrases[e.data.idPhrase].resultats.corrections[e.data.idCorrection].intervalle.borneDebut == this.ccorrs[unIdBouton].phrases[e.data.idPhrase].resultats.corrections[e.data.idCorrection].intervalle.borneFin) {
                        unTypeCorrection = "insertion";
                        uneChaineOriginale = "";
                        this.ccorrs[unIdBouton].phrases[e.data.idPhrase].resultats.corrections[e.data.idCorrection].chaineDecorrection = uneChaineOriginale;
                        this.ccorrs[unIdBouton].phrases[e.data.idPhrase].resultats.corrections[e.data.idCorrection].intervalleDecorrection = {
                            borneDebut: this.ccorrs[unIdBouton].phrases[e.data.idPhrase].resultats.corrections[e.data.idCorrection].intervalle.borneDebut,
                            borneFin: this.ccorrs[unIdBouton].phrases[e.data.idPhrase].resultats.corrections[e.data.idCorrection].intervalle.borneDebut + this.ccorrs[unIdBouton].phrases[e.data.idPhrase].resultats.corrections[e.data.idCorrection][cstChaine].length
                        };
                        this.ccorrs[unIdBouton].phrases[e.data.idPhrase].resultats.corrections[e.data.idCorrection].intervalleAbsoluDecorrection = {
                            borneDebut: this.ccorrs[unIdBouton].phrases[e.data.idPhrase].resultats.corrections[e.data.idCorrection].intervalleAbsolu.borneDebut,
                            borneFin: this.ccorrs[unIdBouton].phrases[e.data.idPhrase].resultats.corrections[e.data.idCorrection].intervalleAbsolu.borneDebut + this.ccorrs[unIdBouton].phrases[e.data.idPhrase].resultats.corrections[e.data.idCorrection][cstChaine].length
                        };
                    } else if (this.ccorrs[unIdBouton].phrases[e.data.idPhrase].resultats.corrections[e.data.idCorrection][cstChaine] != "" && this.ccorrs[unIdBouton].phrases[e.data.idPhrase].resultats.corrections[e.data.idCorrection].intervalle.borneDebut != this.ccorrs[unIdBouton].phrases[e.data.idPhrase].resultats.corrections[e.data.idCorrection].intervalle.borneFin) {
                        unTypeCorrection = "remplacement";
                        this.ccorrs[unIdBouton].phrases[e.data.idPhrase].resultats.corrections[e.data.idCorrection].chaineDecorrection = uneChaineOriginale;
                        this.ccorrs[unIdBouton].phrases[e.data.idPhrase].resultats.corrections[e.data.idCorrection].intervalleDecorrection = {
                            borneDebut: this.ccorrs[unIdBouton].phrases[e.data.idPhrase].resultats.corrections[e.data.idCorrection].intervalle.borneDebut,
                            borneFin: this.ccorrs[unIdBouton].phrases[e.data.idPhrase].resultats.corrections[e.data.idCorrection].intervalle.borneDebut + this.ccorrs[unIdBouton].phrases[e.data.idPhrase].resultats.corrections[e.data.idCorrection][cstChaine].length
                        };
                        this.ccorrs[unIdBouton].phrases[e.data.idPhrase].resultats.corrections[e.data.idCorrection].intervalleAbsoluDecorrection = {
                            borneDebut: this.ccorrs[unIdBouton].phrases[e.data.idPhrase].resultats.corrections[e.data.idCorrection].intervalleAbsolu.borneDebut,
                            borneFin: this.ccorrs[unIdBouton].phrases[e.data.idPhrase].resultats.corrections[e.data.idCorrection].intervalleAbsolu.borneDebut + this.ccorrs[unIdBouton].phrases[e.data.idPhrase].resultats.corrections[e.data.idCorrection][cstChaine].length
                        };
                    }
                } else if (e.data.type == "remplacer") {
                    this.ccorrs[unIdBouton].phrases[e.data.idPhrase].resultats.detections[e.data.indexDetection].actions = 0;
                    unIntervalle = this.ccorrs[unIdBouton].phrases[e.data.idPhrase].resultats.corrections[e.data.idCorrection].intervalle;
                    unIntervalleAbsolu = this.ccorrs[unIdBouton].phrases[e.data.idPhrase].resultats.corrections[e.data.idCorrection].intervalleAbsolu;
                    uneChaineOriginale = texto;
                } else {
                    unTypeAction = false;
                    unIntervalle = this.ccorrs[unIdBouton].phrases[e.data.idPhrase].resultats.corrections[e.data.idCorrection].intervalleDecorrection;
                    unIntervalleAbsolu = this.ccorrs[unIdBouton].phrases[e.data.idPhrase].resultats.corrections[e.data.idCorrection].intervalleAbsoluDecorrection;
                    uneChaineCorrection = this.ccorrs[unIdBouton].phrases[e.data.idPhrase].resultats.corrections[e.data.idCorrection].chaineDecorrection;
                    uneChaineOriginale = this.ccorrs[unIdBouton].phrases[e.data.idPhrase].resultats.corrections[e.data.idCorrection][cstChaine];
                    this.ccorrs[unIdBouton].phrases[e.data.idPhrase].resultats.detections[e.data.indexDetection].aEteCorrigee = false;
                    delete this.ccorrs[unIdBouton].phrases[e.data.idPhrase].resultats.corrections[e.data.idCorrection].chaineDecorrection;
                    delete this.ccorrs[unIdBouton].phrases[e.data.idPhrase].resultats.corrections[e.data.idCorrection].intervalleDecorrection;
                    delete this.ccorrs[unIdBouton].phrases[e.data.idPhrase].resultats.corrections[e.data.idCorrection].intervalleAbsoluDecorrection;
                }
                window.postMessage({
                    message: "infobulleEstMiseAJour",
                    idPhrase: e.data.idPhrase,
                    idCorrection: e.data.idCorrection
                });
                unMessageAppliqueCorrection = {
                    message: actions.Corriger ? "appliquerCorrection" : cstTexte,
                    idPhrase: e.data.idPhrase,
                    intervalle: unIntervalle,
                    intervalleAbsolu: unIntervalleAbsolu,
                    texteOriginal: uneChaineOriginale,
                    idDetection: e.data.idDetection,
                    typeAction: unTypeAction
                };
                unMessageAppliqueCorrection[cstTexte] = uneChaineCorrection;
                if (unMessageAppliqueCorrection.message == cstTexte) {
                    unMessageAppliqueCorrection.intervalle = unMessageAppliqueCorrection.intervalleAbsolu;
                    unMessageAppliqueCorrection.phrasesInvalidees = await this.ccorrs[unIdBouton].donnePhrasesInvalidees(unMessageAppliqueCorrection.intervalle);;
                }
            }
            if (e.data.type == "correction" || e.data.type == "retabli" || e.data.type == "remplacer" || e.data.type == "remplacerParReformulation") {
                let messageApplique = JSON.stringify(unMessageAppliqueCorrection);
                messageLog = messageApplique;
                this.ccorrs[unIdBouton].applique(messageApplique);
            }
            let unObjTexte = this.recupereTexteDeElementAvecId(unIdBouton);
            this.archive[unIdBouton] = unObjTexte;
            if (e.data.type != "remplacer" && e.data.type != "remplacerParReformulation" && e.data.idCorrection !== undefined && this.ccorrs[unIdBouton].phrases[e.data.idPhrase].resultats.corrections[e.data.idCorrection] !== undefined) {
                let longueurCorrigee = this.ccorrs[unIdBouton].phrases[e.data.idPhrase].resultats.corrections[e.data.idCorrection][cstChaine].length;
                let longueurCorrection = this.ccorrs[unIdBouton].phrases[e.data.idPhrase].resultats.corrections[e.data.idCorrection].intervalleAbsolu.borneFin - this.ccorrs[unIdBouton].phrases[e.data.idPhrase].resultats.corrections[e.data.idCorrection].intervalleAbsolu.borneDebut;
                let diff = longueurCorrigee - longueurCorrection;
                let uneBorneDebutPostTraitement = this.ccorrs[unIdBouton].phrases[e.data.idPhrase].resultats.detections[e.data.indexDetection].intervalleAbsolu.borneDebut;
                let uneBorneFinPostTraitement = this.ccorrs[unIdBouton].phrases[e.data.idPhrase].resultats.detections[e.data.indexDetection].intervalleAbsolu.borneFin + diff;
                this.ccorrs[unIdBouton].phrases[e.data.idPhrase].resultats.detections[e.data.indexDetection].intervalleAbsoluPostTraitement = {
                    borneDebut: uneBorneDebutPostTraitement,
                    borneFin: uneBorneFinPostTraitement
                };
            }
            if (e.data.type == "remplacer" || e.data.type == "remplacerParReformulation") {
                this.cacheInfobulle();
            }
            if (e.data.type == "ignore") {
                this.ccorrs[unIdBouton].phrases[e.data.idPhrase].resultats.detections[e.data.indexDetection].estIgnoree = true;
            }
            if (e.data.type == "reactive") {
                this.ccorrs[unIdBouton].phrases[e.data.idPhrase].resultats.detections[e.data.indexDetection].estIgnoree = false;
            }
            this.metsAjourDetecteurWeb({
                message: "modifie-bouton",
                id: unIdBouton,
                sorteIntervention: this.ccorrs[unIdBouton].donneSorteIntervention(),
                aDesAlertes: this.ccorrs[unIdBouton].donneAlertes(),
                niveauAlerte: this.niveauAlerte
            });
            let unElement = this.recupereElementSelonId(unIdBouton);
            if (estTextarea(unElement) || estInput(unElement)) {
                this.cloneEtEnvoieElement(unElement, unIdBouton);
            }
            this.ccorrs[unIdBouton].metsAJourDonnees(e.data.idPhrase);
            envoieVersBackground({
                message: "enregistreLogs",
                donnees_brutes: JSON.stringify(e.data),
                donnees_traitees: JSON.stringify(this.ccorrs[unIdBouton].phrases),
                id: unIdBouton
            });
            setTimeout(function() {
                this.taireMutations = false;
            }.bind(this), 50);
        }
    }
    async audite(e) {
        if (!e.isTrusted || !this.estActivayDW) return;
        window.clearTimeout(this.intervalAnalyseDW);
        let element = e.target;
        if (!estVisible(element)) return;
        var unIdBouton = await this.ajouteBoutonDW(element, true);
        let selectionDebut = element.selectionStart;
        if (this.ccorrs[unIdBouton] !== undefined && !this.taireMutations) {
            let selectionFin = element.value.length - 1 < 0 ? 0 : element.value.length - 1;
            if (selectionDebut > selectionFin) {
                selectionDebut = selectionFin;
            }
            selectionDebut = selectionDebut < 0 ? 0 : selectionDebut;
            let uuidPhrase = await this.ccorrs[unIdBouton].donnePhrasesInvalidees({
                borneDebut: selectionDebut,
                borneFin: selectionFin
            });
            this.envoieMessageAuDetecteurWebPerisprit({
                message: "supprime_soulignements_infobulles",
                id: unIdBouton,
                phrasesIds: uuidPhrase
            });
            this.envoieMessageAuDetecteurWebPerisprit({
                message: "mets_icone_analyse",
                id: unIdBouton
            });
        }
        async function fonctionTimeout() {
            const unObjTexte = this.recupereTexteDeElementAvecId(unIdBouton);
            if (e.type == "paste") {
                element = e.currentTarget;
            }
            if (element && !estTexteTypeNode(element) && (estTextarea(element) || estInput(element) || element.getAttribute(cstChaineContenteditable)) && estUnElementValide(element) && estVisible(element) && e.isTrusted) {
                if (contientElementFormulaire(element)) {
                    monElementPourDW = element;
                }
                if (this.estActivayDW) {
                    if (this.autoriseAjoutBoutonDW(element)) {
                        if (this.archive[unIdBouton] === undefined && estBlanc(unObjTexte.texteagent)) {
                            return;
                        }
                        this.envoieMessageAuDetecteurWebPerisprit({
                            message: "mets_icone_analyse",
                            id: unIdBouton
                        });
                        element.addEventListener('scroll', function(ev) {
                            this.envoieMessageAuDetecteurWebPerisprit({
                                message: "defilement",
                                id: unIdBouton,
                                scrollTop: ev.target.scrollTop,
                                scrollHeight: ev.target.scrollHeight
                            });
                        }.bind(this), false);
                        this.analyseDW(unIdBouton);
                        this.intervalAnalyseDW = 0;
                    }
                }
            }
        }
        const timeout = this.donneTimeout(unIdBouton);
        this.intervalAnalyseDW = window.setTimeout(fonctionTimeout.bind(this), timeout);
    }
    autoriseAjoutBoutonDW(element) {
        if (element.getAttribute("data-druide-aec-active") != null) return true;
        if (element.getAttribute("data-druide-aec-ignore") != null) return false;
        var id = Object.keys(this.objetBoutonsZones).find(key => this.objetBoutonsZones[key].zone === element);
        if (id && this.listeGrise && this.listeGrise.includes(id)) {
            envoieVersBackground({
                message: "dw-comm",
                requete: "metsAJourChampActif",
                idActif: id,
                actif: false
            });
            return false;
        }
        if (id && this.listeFantome && this.listeFantome.includes(id)) {
            return true;
        }
        if (estInput(element) && element.type != "text") {
            return false;
        }
        if (element.getAttribute('role') && element.getAttribute('role') == "combobox") {
            return false;
        }
        let desClass = element.className;
        if (desClass.indexOf("userpickerfield") >= 0) {
            return false;
        }
        if (document.body !== undefined && document.body.id !== undefined && document.body.id == "jira") {
            if (element.id !== undefined && element.id == "login-form-username") {
                return false;
            }
        }
        if (element.attributes.getNamedItem('aria-readonly') && element.attributes.getNamedItem('aria-readonly').value == "true") {
            return false;
        }
        if (element.readOnly !== undefined && element.readOnly) return false;
        if (estDraftJS(element)) return true;
        let unAttributSpellcheck = element.getAttribute("spellcheck");
        let unAttributSpelcheckDruide = element.getAttribute("druide_spellcheck");
        let unSpellcheckActivay = (unAttributSpellcheck == null) || (unAttributSpellcheck != null && unAttributSpellcheck == "true") || (unAttributSpelcheckDruide != null && unAttributSpelcheckDruide == "true") || (unAttributSpelcheckDruide != null && unAttributSpelcheckDruide == "vide")
        if (!unSpellcheckActivay && urlsDWForceay.filter(e => document.location.href.includes(e)).length == 0) {
            return false;
        }
        if (estInput(element)) return estInputValide(element);
        return true;
    }
    ecouteMutation(mutations) {
        let aAnalyser = false;
        for (let m of mutations) {
            if (m.type == "childList") {
                for (let noeudDisparu of m.removedNodes) {
                    if (noeudDisparu.elements !== undefined) {
                        for (let elementDiparu of noeudDisparu.elements) {
                            let id;
                            if ((id = Object.keys(this.objetBoutonsZones).find(key => this.objetBoutonsZones[key].zone === elementDiparu)) !== undefined) {
                                let unIdDisparu = id;
                                this.desinstalleBouton(unIdDisparu, false);
                            }
                        }
                    }
                }
                if (Object.values(this.objetBoutonsZones).find(val => val.zone === m.target || val.zone.contains(m.target)) !== undefined) {
                    for (let n of m.addedNodes) {
                        if (n.dataset === undefined || (n.dataset !== undefined && n.dataset.mceCarret === undefined && n.dataset.mceBogus === undefined)) {
                            aAnalyser = true;
                            break;
                        }
                        if (n.id === undefined || (n.id !== undefined && (n.id.indexOf("mceResizeHandle") == -1))) {
                            aAnalyser = true;
                            break;
                        }
                    }
                    for (let n of m.removedNodes) {
                        if (n.dataset === undefined || (n.dataset !== undefined && n.dataset.mceCarret === undefined && n.dataset.mceBogus === undefined)) {
                            aAnalyser = true;
                            break;
                        }
                        if (n.id === undefined || (n.id !== undefined && (n.id.indexOf("mceResizeHandle") == -1))) {
                            aAnalyser = true;
                            break;
                        }
                    }
                }
            }
            if (m.type === "characterData") {
                aAnalyser = true;
                break;
            }
        }
        return aAnalyser;
    }
    async ajouteBoutonDW(leElement, leEstVisible) {
        let promesse = new Promise(async (resolution) => {
            var unIdBouton = Object.keys(this.objetBoutonsZones).find(key => this.objetBoutonsZones[key].zone === leElement);
            let unClone = document.getElementById("b" + unIdBouton + "_clone");
            let estExistant = false;
            if (unClone && unClone.dataset.a_supprimer !== undefined && unClone.dataset.a_supprimer == "0") {
                estExistant = true;
            }
            if ((!estExistant) && (unIdBouton == null || unIdBouton === undefined || unIdBouton == "" || this.listeFantome.includes(unIdBouton))) {
                try {
                    if (this.listeFantome.includes(unIdBouton)) {
                        delete this.objetBoutonsZones[unIdBouton];
                    }
                    unIdBouton = "dw" + chaine_aleatoire() + new Date().getTime();
                    let zIndexMax = findHighestZIndex("*");
                    let detecteur = new this.constructeurObjetDetecteur({
                        id: unIdBouton,
                        zIndex: zIndexMax,
                        estActivayCorrectionExpress: this.estActivayCorrectionExpress,
                        position_x: this.position_x
                    });
                    if (!this.bulle) {
                        this.bulle = new ObjetBulle({
                            id: unIdBouton,
                            zIndex: zIndexMax,
                            estActivayCorrectionExpress: this.estActivayCorrectionExpress,
                            position_x: this.position_x
                        });
                        this.bulle.init();
                    }
                    this.dictBouton[unIdBouton] = detecteur;
                    this.dictBouton[unIdBouton].init(leElement.ownerDocument, leElement);
                    let ancre = leElement;
                    let coordonnees = this.constructor.donneCoords(ancre);
                    let unStyle = donneStyle(ancre);
                    leElement.dataset.antidote_dw_id = unIdBouton;
                    this.construireListePositionsNoeuds(leElement, unIdBouton, true);
                    leElement.dataset.antidote_dw = "bouton";
                    if (estCKEditor5(leElement) && leElement.parentElement !== undefined) {
                        let unAttributSpellcheck = leElement.parentElement.getAttribute("spellcheck");
                        if (unAttributSpellcheck == "true") {
                            leElement.parentElement.setAttribute("spellcheck", false);
                            leElement.parentElement.setAttribute("druide_spellcheck", "true");
                        } else if (unAttributSpellcheck == null) {
                            leElement.parentElement.setAttribute("spellcheck", false);
                            leElement.parentElement.setAttribute("druide_spellcheck", "vide");
                        }
                        leElement.blur();
                        leElement.focus();
                    } else {
                        let unAttributSpellcheck = leElement.getAttribute("spellcheck");
                        if (unAttributSpellcheck == "true") {
                            leElement.setAttribute("spellcheck", false);
                            leElement.setAttribute("druide_spellcheck", "true");
                        } else if (unAttributSpellcheck == null) {
                            leElement.setAttribute("spellcheck", false);
                            leElement.setAttribute("druide_spellcheck", "vide");
                        }
                    }
                    desactiveAntidoteAPI_JSConnect();
                    activeAntidoteAPI_JSConnect();
                    let promesseInitPerisprit = new Promise((resolve) => {
                        window.addEventListener('message_init_dw', function(e) {
                            if (e.detail.message == "initialisation" && e.detail.id == unIdBouton) {
                                resolve(true);
                            }
                        }, false);
                    });
                    await promesseInitPerisprit;
                    this.envoieMessageAuDetecteurWebPerisprit({
                        message: "initialise_canvas",
                        activay: this.estActivayCorrectionExpress,
                        coord: coordonnees,
                        astyle: unStyle,
                        id: unIdBouton,
                        estVisible: leEstVisible
                    });
                    leElement.ownerDocument.addEventListener("keyup", function(k) {
                        this.activeOption(k.altKey);
                    }.bind(this), false);
                    leElement.ownerDocument.addEventListener("keydown", function(k) {
                        this.activeOption(k.altKey);
                    }.bind(this), false);
                    deplaceElement(unIdBouton, leElement.ownerDocument.getElementById(unIdBouton).shadowRoot);
                    let vieilleLargeurElement = null;
                    let vieilleHauteurElement = null;
                    let largeurScrollBar = donneLargeurScrollbar();

                    function changement(element, leRect) {
                        if (element !== undefined) {
                            let deltaLargeur = vieilleLargeurElement ? Math.abs(vieilleLargeurElement - leRect.width) : null;
                            let deltaHauteur = vieilleHauteurElement ? Math.abs(vieilleHauteurElement - leRect.height) : null;
                            if (largeurScrollBar !== 0 && deltaHauteur && deltaLargeur && (deltaHauteur == largeurScrollBar && deltaLargeur == largeurScrollBar) || (deltaHauteur == largeurScrollBar && deltaLargeur == 0) || (deltaHauteur == 0 && deltaLargeur == largeurScrollBar)) return;
                            let coordonnees = this.constructor.donneCoords(element);
                            if (!estVisible(element) || leRect.width <= 0 || leRect.height <= 0) {
                                if (leRect.width <= 0 || leRect.height <= 0) {
                                    this.desinstalleBouton(unIdBouton, false);
                                } else {
                                    this.envoieMessageAuDetecteurWebPerisprit({
                                        message: "cache_bouton_infobulle",
                                        id: unIdBouton,
                                        phrasesIds: this.ccorrs[unIdBouton] !== undefined ? Object.keys(this.ccorrs[unIdBouton].phrases) : []
                                    });
                                }
                            } else {
                                this.envoieMessageAuDetecteurWebPerisprit({
                                    message: "reinitialise_canvas",
                                    activay: this.estActivayCorrectionExpress,
                                    coord: coordonnees,
                                    astyle: unStyle,
                                    id: unIdBouton
                                });
                                if (this.ccorrs[unIdBouton] !== undefined) {
                                    this.ccorrs[unIdBouton] && this.ccorrs[unIdBouton].maj(false, false);
                                }
                            }
                            vieilleHauteurElement = leRect.height;
                            vieilleLargeurElement = leRect.width;
                        }
                    }

                    function ecouteChangement(entries) {
                        if (entries !== undefined) {
                            changement.bind(this)(entries[0].target, entries[0].contentRect);
                        }
                    }
                    this.observateurChangementTaille[unIdBouton] = new ResizeObserver(ecouteChangement.bind(this));
                    this.observateurChangementTaille[unIdBouton].observe(leElement);
                    this.ecouteMutation = this.ecouteMutation.bind(this);

                    function gereMutation(e) {
                        let aAnalyser = this.ecouteMutation(e);
                        if (aAnalyser && !this.taireMutations) {
                            this.reAnalyseDW(unIdBouton, leElement);
                            window.setTimeout(traitementSpeciale, 200, leElement);
                        }
                    }
                    this.observateurMutation[unIdBouton] = new MutationObserver(gereMutation.bind(this));
                    this.observateurMutation[unIdBouton].observe(leElement, {
                        childList: true,
                        attributes: true,
                        subtree: true,
                        attributeOldValue: true,
                        characterData: true,
                        characterDataOldValue: true
                    });
                    let timeoutIntersection = 0;

                    function ecouteIntersection(entries) {
                        clearTimeout(timeoutIntersection);
                        timeoutIntersection = setTimeout(function() {
                            let coordonnees = this.constructor.donneCoords(ancre);
                            let style = donneStyle(ancre);
                            if (!entries[0].isIntersecting || (Math.abs(entries[0].intersectionRect.bottom - entries[0].boundingClientRect.bottom) <= 0.01 && entries[0].intersectionRect.top !== entries[0].boundingClientRect.top)) {
                                this.envoieMessageAuDetecteurWebPerisprit({
                                    message: "repositionne_bouton_sans_ratio",
                                    ratio: entries[0].intersectionRatio,
                                    id: unIdBouton,
                                    coord: coordonnees,
                                    astyle: style
                                });
                                return;
                            }
                            this.envoieMessageAuDetecteurWebPerisprit({
                                message: "repositionne_bouton",
                                ratio: entries[0].intersectionRatio,
                                id: unIdBouton,
                                coord: coordonnees,
                                astyle: style
                            });
                        }.bind(this), 200);
                    };
                    let pas = 50.0;

                    function donneSeuils() {
                        let desSeuils = [];
                        for (var i = 1.0; i <= pas; i++) {
                            var ratio = i / pas;
                            desSeuils.push(ratio);
                        }
                        desSeuils.push(0);
                        return desSeuils;
                    }
                    const elementParentActif = leElement.ownerDocument.defaultView.parent.document.activeElement;
                    if (estIFrame(elementParentActif) && leElement.id === "tinymce") {
                        this.observateurIntersection[unIdBouton] = new IntersectionObserver(ecouteIntersection.bind(this), {
                            root: null,
                            rootMargin: "0px",
                            threshold: donneSeuils()
                        });
                        this.observateurIntersection[unIdBouton].observe(elementParentActif);
                    } else {
                        this.observateurIntersection[unIdBouton] = new IntersectionObserver(ecouteIntersection.bind(this), {
                            root: null,
                            rootMargin: "0px",
                            threshold: donneSeuils()
                        })
                        this.observateurIntersection[unIdBouton].observe(leElement);
                    }
                    leElement.ownerDocument.addEventListener('scroll', this.cacheInfobulle);
                } catch (erreur) {
                    console.error("dw.detecteurWeb.ajouteBoutonDW", erreur);
                }
            } else {
                let coordonnees = this.constructor.donneCoords(leElement);
                if (leEstVisible) {
                    this.envoieMessageAuDetecteurWebPerisprit({
                        message: "montre_bouton",
                        id: unIdBouton
                    });
                }
            }
            resolution(unIdBouton);
        });
        return promesse;
    }
    reAnalyseDW(leIdBouton, leElement) {
        window.clearTimeout(this.intervalReAnalyseDW);
        let timeout = this.donneTimeout(leIdBouton);
        this.intervalReAnalyseDW = window.setTimeout(function() {
            if (this.ccorrs[leIdBouton] !== undefined) this.construireListePositionsNoeuds(leElement, leIdBouton, true);
            this.analyseDW(leIdBouton);
        }.bind(this), timeout);
    }
    async analyseDW(leIdBouton, estReconnexion) {
        if (estReconnexion === undefined) estReconnexion = false;
        let leObjetTexte = this.recupereTexteDeElementAvecId(leIdBouton);
        if (this.archive[leIdBouton] !== undefined && this.ccorrs[leIdBouton] !== undefined && !(leObjetTexte.message !== undefined && leObjetTexte.message == "supprime")) {
            let dmp = new diff_match_patch();
            let diff = dmp.diff_main(this.archive[leIdBouton].texteagent, leObjetTexte.texteagent);
            dmp.diff_cleanupSemantic(diff);
            if (diff.length > 500) {
                this.ccorrs[leIdBouton].reinit(true);
                return;
            }

            function traiteDifferences(diff) {
                let pos = 0;
                for (let i = 0; i < diff.length; i++) {
                    let objIntervalle = {
                        _dib49: 0,
                        _dib50: 0,
                        _dib37: "",
                        chaine_origine: "",
                        typeDiff: ""
                    };
                    if (diff[i][0] == 0) {
                        pos = pos + diff[i][1].length;
                    } else if (diff[i][0] == 1) {
                        objIntervalle._dib49 = pos;
                        objIntervalle._dib50 = pos + diff[i][1].length;
                        objIntervalle[cstChaine] = diff[i][1];
                        objIntervalle.typeDiff = "insertion";
                        pos = pos + diff[i][1].length;
                        this.diffIndexListe[leIdBouton].push(objIntervalle);
                    } else if (diff[i][0] == -1) {
                        objIntervalle._dib49 = pos;
                        objIntervalle._dib50 = pos + diff[i][1].length;
                        objIntervalle[cstChaine] = diff[i][1];
                        objIntervalle.typeDiff = "suppression";
                        this.diffIndexListe[leIdBouton].push(objIntervalle);
                    }
                }
            }
            traiteDifferences.bind(this)(diff);
            if (this.diffIndexListe[leIdBouton].length > 0) {
                this.envoieMessageAuDetecteurWebPerisprit({
                    message: "cache_infobulle",
                    id: leIdBouton
                });
            }
            if (this.diffIndexListe[leIdBouton].length === 0) {
                if (this.ccorrs[leIdBouton].phrases.nbATraiter <= 0) {
                    this.ccorrs[leIdBouton].maj(false, true);
                }
            }
            while (this.diffIndexListe[leIdBouton].length != 0) {
                let estSuppressionPremierCaractere = false;
                if (this.diffIndexListe[leIdBouton][0].typeDiff == "suppression") {
                    estSuppressionPremierCaractere = true;
                }
                let l = this.diffIndexListe[leIdBouton].shift();
                let texte_ori = "";
                let texte_nouveau = "";
                let di = -1;
                let fi = -1;
                if (l.typeDiff == "suppression") {
                    texte_ori = l[cstChaine];
                    di = l._dib49;
                    fi = l._dib49 + texte_ori.length;
                } else if (l.typeDiff == "insertion") {
                    texte_nouveau = l[cstChaine];
                    di = fi = l._dib49;
                } else if (l.typeDiff == "remplacement") {
                    di = l._dib49;
                    fi = l._dib50;
                    texte_ori = l.chaine_origine;
                    texte_nouveau = l[cstChaine];
                }
                let intervalleModificationPourInvalide = {
                    borneDebut: l._dib49,
                    borneFin: l._dib50
                };
                let intervalleModification = {
                    borneDebut: di,
                    borneFin: fi
                };
                async function envoie_applique() {
                    let uuidInvalides = await this.ccorrs[leIdBouton].donnePhrasesInvalidees(intervalleModificationPourInvalide);
                    let messageApplique = {
                        message: cstTexte,
                        intervalle: intervalleModification,
                        texteOriginal: texte_ori,
                        phrasesInvalidees: uuidInvalides
                    };
                    messageApplique[cstTexte] = texte_nouveau
                    messageLog = JSON.stringify(messageApplique);
                    this.archive[leIdBouton] = leObjetTexte;
                    this.ccorrs[leIdBouton].applique(JSON.stringify(messageApplique));
                    messageApplique.typeDiff = l.typeDiff;
                    envoieVersBackground({
                        message: "enregistreLogs",
                        donnees_brutes: JSON.stringify(messageApplique),
                        donnees_traitees: JSON.stringify(this.ccorrs[leIdBouton].phrases),
                        id: leIdBouton
                    });
                }
                envoie_applique.bind(this)();
                if (estSuppressionPremierCaractere) {
                    if (!estBlanc(texte_ori)) {
                        estSuppressionPremierCaractere = false;
                    } else {}
                }
                if (!estSuppressionPremierCaractere) {
                    let p = new Promise((resolve) => {
                        window.addEventListener('donnees_traitees', function(ev) {
                            resolve(true);
                        }, false);
                    });
                    await p;
                    window.removeEventListener('donnees_traitees', function() {});
                }
            }
        } else if (leObjetTexte.message !== undefined && leObjetTexte.message == "supprime") {
            let timeout = this.donneTimeout(leIdBouton);
            window.clearTimeout(timeout);
            boutonsASupprimer.push(leIdBouton);
        } else {
            if (leObjetTexte.texteagent.length > 0 && !estBlanc(leObjetTexte.texteagent)) {
                let unClient = null;
                if (this.ccorrs[leIdBouton] === undefined || (!!this.ccorrs[leIdBouton] && this.ccorrs[leIdBouton].doitReinitialiser)) {
                    unClient = new CliCorrSi(leIdBouton, this.objetBoutonsZones[leIdBouton].zone);
                    let promesseInitClientCorrSimple = new Promise((resolve) => {
                        this.ccorrs[leIdBouton] = unClient;
                        resolve(unClient.init(this.devCliCorrSi));
                    });
                    await promesseInitClientCorrSimple;
                } else {
                    unClient = this.ccorrs[leIdBouton];
                }
                unClient.idBouton = leIdBouton;
                if (leObjetTexte.texteagent.length < 100000) {
                    let messageApplique = JSON.stringify({
                        message: "initialiser",
                        zones: [leObjetTexte.texteagent],
                        locale: gestionTraduction.maLangueLocale != "" ? gestionTraduction.maLangueLocale : "fr_CA",
                        langueInterface: gestionTraduction.maLangueString != "" ? gestionTraduction.maLangueString : "fr",
                        infoConnecteur: mesDonneesGlobales.infoConnecteur,
                        options: {
                            antiOups: this.estAntiOupsActivay
                        }
                    });
                    messageLog = messageApplique;
                    unClient.applique(messageApplique);
                    this.diffIndexListe[leIdBouton] = [];
                    this.archive[leIdBouton] = leObjetTexte;
                    this.ccorrs[leIdBouton] = unClient;
                    envoieVersBackground({
                        message: "enregistreLogs",
                        donnees_brutes: messageApplique,
                        donnees_traitees: JSON.stringify(this.ccorrs[leIdBouton].phrases),
                        id: leIdBouton
                    });
                } else {
                    this.desinstalleBouton(leIdBouton, true, false, "texte_trop_long");
                }
            }
        }
        let unElement = this.recupereElementSelonId(leIdBouton);
        if (estTextarea(unElement) || estInput(unElement)) {
            this.cloneEtEnvoieElement(unElement, leIdBouton);
        }
    }
    async cloneEtEnvoieElement(leElement, leIdBouton) {
        let unClone = cree("div", {
            class: "textarea_clone"
        });
        unClone.appendChild(document.createTextNode(leElement.value))
        unClone.id = leIdBouton + "_clone";
        if (leElement.ownerDocument.getElementById(leIdBouton).shadowRoot.getElementById(leIdBouton + "_clone")) {
            leElement.ownerDocument.getElementById(leIdBouton).shadowRoot.getElementById(leIdBouton + "_clone").remove();
        }
        let stl = donneStyleTextarea(leElement);
        for (let s in stl) {
            unClone.style[s] = stl[s];
        }
        let largeurScrollBar = donneLargeurScrollbar();
        if (leElement.scrollHeight > leElement.clientHeight && stl['box-sizing'] == "content-box") {
            unClone.style.width = parseFloat(unClone.style.width) + largeurScrollBar + "px";
        }
        unClone.contenteditable = "false";
        unClone.style.visibility = "hidden";
        unClone.style.zIndex = "-100";
        unClone.style.pointerEvents = "none";
        unClone.style.height = window.getComputedStyle(leElement).height;
        unClone.style.alignItems = "start";
        let uneDistanceGauche = 0;
        if (estInput(leElement)) {
            let unAttributId = leElement.id !== undefined ? leElement.id : "";
            if (unAttributId != "") {
                let unLabel = donneLabelAssociay(unAttributId);
                if (unLabel) {
                    if (parseFloat(window.getComputedStyle(unLabel).left) > 0 || window.getComputedStyle(unLabel).left == "auto") {
                        uneDistanceGauche = unLabel.getBoundingClientRect().width + unLabel.getBoundingClientRect().x - parseFloat(leElement.ownerDocument.getElementById(leIdBouton).shadowRoot.getElementById("_corrdecteur").style.paddingLeft);
                    }
                }
            }
        }
        leElement.ownerDocument.getElementById(leIdBouton).shadowRoot.getElementById("_corrdecteur").dataset.dw_type = leElement.ownerDocument.defaultView.parent.document.activeElement.nodeName.toLowerCase() == cstNomNoeudIframe ? 2 : 1;
        leElement.ownerDocument.getElementById(leIdBouton).shadowRoot.getElementById("_corrdecteur").style.left = uneDistanceGauche + "px";
        leElement.ownerDocument.getElementById(leIdBouton).shadowRoot.getElementById("_corrdecteur").appendChild(unClone);
        if (this.ccorrs[leIdBouton] !== undefined) {
            this.ccorrs[leIdBouton].maj(false, true);
        }
    }
    recupereAgentSelonId(leID) {
        if (dwAgentTexteur && dwAgentTexteur.monElementPourDW && !!this.objetBoutonsZones[leID] && this.objetBoutonsZones[leID].zone !== dwAgentTexteur.monElementPourDW) {
            dwAgentTexteur = null;
        }
        if (dwAgentTexteur == null || dwAgentTexteur.monElementPourDW == null) {
            dwAgentTexteur = creeAgentTexteurSelonID(leID, true);
        }
    }
    recupereElementSelonId(leID) {
        this.recupereAgentSelonId(leID);
        return dwAgentTexteur.monElementPourDW;
    }
    recupereTexteDeElementAvecId(leID) {
        this.recupereAgentSelonId(leID);
        dwAgentTexteur.initialiseTexteur(true);
        if (this.objetBoutonsZones[leID] && this.objetBoutonsZones[leID] !== undefined) {
            var leElement = this.objetBoutonsZones[leID].zone;
            let uneSectionDW = chercheElement('*[id="' + leID + '"]');
            if (uneSectionDW.length == 0) {
                delete this.objetBoutonsZones[leID];
                return {
                    message: "supprime"
                };
            }
            let unTexte = "";
            let unTexteHTML = "";
            let interval = this.donneSelection(leElement, leID);
            if (leElement && leElement.getAttribute(cstChaineContenteditable) && estUnElementValide(leElement)) {
                unTexte = leElement.textContent;
                unTexteHTML = leElement.innerHTML;
            } else if ((estTextarea(leElement) || estInput(leElement)) && estUnElementValide(leElement) && leElement.nodeType != leElement.TEXT_NODE) {
                unTexte = leElement.value;
            }
            return {
                texteagent: this.objetBoutonsZones[leID].texteZone,
                _dib30: unTexte,
                texteHTML: unTexteHTML,
                interval: interval
            };
        } else {
            return {
                texteagent: "",
                _dib30: "",
                texteHTML: "",
                interval: {
                    d: 0,
                    f: 0
                }
            }
        }
    }
    recupereRangeTexteDeElementAvecId(leID, leElement, lesArguements) {
        this.recupereAgentSelonId(leID);
        let unElement = dwAgentTexteur.monElementPourDW;
        if ((dwAgentTexteur.monElementPourDW.getAttribute("contenteditable") || unElement.getAttribute("contenteditable")) && estUnElementValide(dwAgentTexteur.monElementPourDW)) {
            dwAgentTexteur.initialiseTexteur(true);
            dwAgentTexteur.jeUtiliseEnveloppeIntervalleTexte = false;
            let unRange = dwAgentTexteur.recupereRange(lesArguements, this.ccorrs[leID].monWalker);
            return unRange
        } else if ((estTextarea(dwAgentTexteur.monElementPourDW) || estInput(dwAgentTexteur.monElementPourDW))) {
            try {
                if (leElement.ownerDocument.getElementById(leID)) {
                    let unNoeud = leElement.ownerDocument.getElementById(leID).shadowRoot.getElementById(leID + "_clone").firstChild;
                    let unRange = document.createRange();
                    if (unNoeud.textContent.length >= lesArguements._dib50) {
                        let startNode = unNoeud.splitText(lesArguements._dib49);
                        let ret = startNode.splitText(lesArguements._dib50 - lesArguements._dib49);
                        unRange.selectNode(startNode);
                        unNoeud.parentNode.normalize();
                        return unRange;
                    } else return null;
                } else {
                    return null;
                }
            } catch (erreur) {
                console.error("dw.detecteurWeb.recupereRangeTexteDeElementAvecId", erreur, leID);
            }
        }
        return null;
    }
    recupereTexteDeElement(leElement) {
        let unTexte = "";
        let unTexteHTML = "";
        if (leElement && leElement.nodeType != leElement.TEXT_NODE && leElement.getAttribute(cstChaineContenteditable) && estUnElementValide(leElement)) {
            unTexte = leElement.textContent;
            unTexteHTML = leElement.innerHTML;
        } else if ((estTextarea(leElement) || estInput(leElement)) && estUnElementValide(leElement)) {
            unTexte = leElement.value;
        }
        return unTexte;
    }
    metsAjourDetecteurWeb(msg) {
        if (msg.id.substring(0, 3) == "dw.") {
            this.envoieMessageAuDetecteurWebPerisprit(msg);
        }
    }
    async metsAjourEtatDWeb(estActivayCorrectionExpress, leNiveauAlerte) {
        if (this.estActivayCorrectionExpress != estActivayCorrectionExpress) {
            this.estActivayCorrectionExpress = estActivayCorrectionExpress;
            for (let [unIdBouton, e] of Object.entries(this.objetBoutonsZones)) {
                let element = e.zone;
                if (estActivayCorrectionExpress) {
                    if (estTextarea(element) || estInput(element)) {
                        element.removeEventListener("input", this.audite, false);
                        element.addEventListener("input", this.audite, false);
                    }
                    this.envoieMessageAuDetecteurWebPerisprit({
                        message: "mets_icone_analyse",
                        id: unIdBouton
                    });
                    this.analyseDW(unIdBouton);
                } else {
                    if (this.archive[unIdBouton] !== undefined) {
                        delete this.archive[unIdBouton];
                    }
                    if (this.ccorrs[unIdBouton] !== undefined) {
                        await this.ccorrs[unIdBouton].deconnecteWS("ferme");
                        delete this.ccorrs[unIdBouton];
                    }
                    var r = this.objetBoutonsZones[unIdBouton].zone;
                    r.removeEventListener("input", this.audite, false);
                    element.removeEventListener("input", this.audite, false);
                    window.clearTimeout(this.intervalAnalyseDW);
                    this.intervalAnalyseDW = 0;
                }
                this.envoieMessageAuDetecteurWebPerisprit({
                    message: "mettre_a_jour_bouton",
                    id: unIdBouton,
                    activay: estActivayCorrectionExpress
                });
            }
        }
        if (this.estActivayCorrectionExpress) {
            if (leNiveauAlerte !== undefined && this.niveauAlerte && this.niveauAlerte != leNiveauAlerte) {
                this.niveauAlerte = leNiveauAlerte;
                for (let [unIdBouton, e] of Object.entries(this.objetBoutonsZones)) {
                    this.ccorrs[unIdBouton].maj(false, false);
                }
            }
        }
    }
    metsAJourDetection(msg) {
        if (msg.activationDW && !!dwAgentTexteur) {}
    }
    activeOption(_dib29) {
        this.optionEstActivay = _dib29;
    }
}
if (typeof DetecteurWeb === "undefined") {
    var DetecteurWeb;
    if (document.readyState == "interactive" || document.readyState == "complete") {
        if (window.location.href.includes("docs.google.com/document/d")) {
            DetecteurWeb = new ClasseDetecteurWebGoogleDocs();
        } else if (estGutenberg()) {
            DetecteurWeb = new ClasseDetecteurWebWordpress();
        } else {
            DetecteurWeb = new ClasseDetecteurWeb();
        }
    }
    document.onreadystatechange = () => {
        if (typeof DetecteurWeb === "undefined") {
            if (document.readyState == "interactive" || document.readyState == "complete") {
                if (window.location.href.includes("docs.google.com/document/d")) {
                    DetecteurWeb = new ClasseDetecteurWebGoogleDocs();
                } else if (estGutenberg()) {
                    DetecteurWeb = new ClasseDetecteurWebWordpress();
                } else {
                    DetecteurWeb = new ClasseDetecteurWeb();
                }
            }
        }
    }
}
window.addEventListener("si-chargeay", function(e) {}, false);
window.addEventListener("beforeunload", function(e) {
    DetecteurWeb.ferme();
}, false);