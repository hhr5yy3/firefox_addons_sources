 /* 
 *	Ce document est la propriété intellectuelle de Druide informatique inc. Toute reproduction ou publication est interdite. 
 *  Copyright 2022 Druide informatique inc. 
 */
 let xsltProcessor;
let timeoutAfficgeMenuBulle = 0;

function initXsltProcessor() {
    let promesseXSL = new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', donneUrlFichier("extensions/DetecteurWeb/infobulle/infobulle.xsl"));
        xhr.onload = function() {
            if (xhr.status == 200) {
                resolve(xhr.responseXML);
            } else {
                reject(Error(xhr.statusText));
            }
        };
        xhr.onerror = function(error) {
            reject(Error('impossible de recuperer les _dib84'));
        };
        xhr.send();
    });
    return promesseXSL;
}
var mettreAJourProps = undefined;

function initialisationMiseAJour(funcMettreAJour) {
    mettreAJourProps = funcMettreAJour;
}
let positionnementInfoBulle = {
    bottom: 216,
    height: 16,
    left: 176.6875,
    right: 226.5,
    top: 200,
    width: 49.8125
};
let infosEditeur = undefined;
let estEcranEtroit = false;
let indexPremiereDetection = [0, -1];
let nbEtageMaxInfoBulle = 8;
let elementScrollHorizontal = undefined;
let contenu = "";
let visible = false;
const cstInfoAffichageInfobulle = {
    afficheCorrection: true,
    avecEtage: false,
    detectionApres: false,
    detectionAvant: false,
    dicoPersoRestreint: false,
    dictionnairesRestreint: false,
    reformulationRestreinte: false,
    infoBulleCorrection: [2],
    infosDetections: [{
        cardinalitay: 0,
        cardinalitayAffichay: "***",
        estEditable: false,
        estReformulable: false,
        etatDetection: {
            aNePlusSignaler: false,
            aReactiver: false,
            aRetablir: false,
            aUniformiser: false,
            ajoutDicosPerso: false,
            cmdMotsProches: false,
            cmdSupprimer: false,
            cmdSynonymes: false,
            corrigeable: false,
            etat: 0,
            ignorable: false,
            lienGuides: undefined,
            pourUniformiser: false,
            propositionRemplacement: undefined
        },
        explicationBreve: "",
        motRemplacement: "",
        styleApostille: undefined
    }],
    estReformulation: false,
    noEtageEnCours: 0
};
let infoAffichageInfobulle = cstInfoAffichageInfobulle;
let gDonneesDecteteur = {
    idBouton: undefined,
    idPhrase: undefined,
    _dib84: undefined
};

function fermerInfoBulle() {
    props.infoAffichageInfobulle = cstInfoAffichageInfobulle
    props.infoBulleVisible = false;
    if (mettreAJourProps !== undefined) {
        mettreAJourProps(props);
    }
    infobulleEstVisible = false;
    tempsFermetureInfobulle = new Date().getTime();
}

function fonctionChaine(message) {
    const messages = {
        "corriger": {
            defaultMessage: gestionTraduction.Tr_("Corriger", "")
        },
        "retablir": {
            defaultMessage: gestionTraduction.Tr_("Rétablir", "")
        },
        "uniformiser": {
            defaultMessage: gestionTraduction.Tr_("Uniformiser", "")
        },
        "synonymes": {
            defaultMessage: gestionTraduction.Tr_("Synonymes", "")
        },
        "supprimer": {
            defaultMessage: gestionTraduction.Tr_("Supprimer", "")
        },
        "ajouter": {
            defaultMessage: gestionTraduction.Tr_("Ajouter", "")
        },
        "remplacer": {
            defaultMessage: gestionTraduction.Tr_("Remplacer", "")
        },
        "editer": {
            defaultMessage: gestionTraduction.Tr_("Éditer", "")
        },
        "reactiver": {
            defaultMessage: gestionTraduction.Tr_("Réactiver", "")
        },
        "ignorer": {
            defaultMessage: gestionTraduction.Tr_("Ignorer", "")
        },
        "taire": {
            defaultMessage: gestionTraduction.Tr_("Taire", "")
        },
        "motsProches": {
            defaultMessage: gestionTraduction.Tr_("Mots proches", "")
        },
        "ajouterMot": {
            defaultMessage: gestionTraduction.Tr_("Ajouter le mot à un dictionnaire personnel", "")
        },
        "detPrecedente": {
            defaultMessage: gestionTraduction.Tr_("Détection précédente", "")
        },
        "detSuivante": {
            defaultMessage: gestionTraduction.Tr_("Détection suivante", "")
        },
        "lienGuides": {
            defaultMessage: gestionTraduction.Tr_("Afficher l’article correspondant à cette détection", "")
        },
        "reformuler": {
            defaultMessage: gestionTraduction.Tr_("Reformuler", "")
        },
        "copier": {
            defaultMessage: gestionTraduction.Tr_("Copier", "")
        },
        "insertion": {
            defaultMessage: gestionTraduction.Tr_("Insertion", "")
        },
        "tout": {
            defaultMessage: gestionTraduction.Tr_("Tout", "")
        },
    };
    return messages[message].defaultMessage;
}

function fonctionAction(event, action, noEtage = undefined) {
    let messageAction = {
        message: "applique_correction",
        type: "",
        id: gDonneesDecteteur.idBouton,
        idPhrase: gDonneesDecteteur.idPhrase,
        indexDetection: gDonneesDecteteur._dib84.resultats.detectionsIdx[gDonneesDecteteur.idDetection],
        idDetection: gDonneesDecteteur.idDetection,
        idCorrection: gDonneesDecteteur._dib84.resultats.detections[gDonneesDecteteur._dib84.resultats.detectionsIdx[gDonneesDecteteur.idDetection]].idCorrection,
        typeSoulignement: 9
    };
    switch (action) {
        case "deplacementDetectionAvant":
            break;
        case "deplacementDetectionApres":
            break;
        case "selectionDescrition":
            break;
        case "changeEtatGroupe":
            break;
        case "corrigerEtage":
            break;
        case "choixEtage":
            break;
        case "ignorerInfobulle":
            props.infoAffichageInfobulle.infosDetections[0].etatDetection.aReactiver = true;
            messageAction.type = "ignore";
            messageAction.typeSoulignement = 9;
            break;
        case "reactiverInfobulle":
            props.infoAffichageInfobulle.infosDetections[0].etatDetection.aReactiver = false;
            messageAction.type = "reactive";
            messageAction.typeSoulignement = -2;
            break;
        case "ajouterMot":
            break;
        case "retablirInfobulle":
            props.infoAffichageInfobulle.infosDetections[0].etatDetection.aReactiver = false;
            props.infoAffichageInfobulle.infosDetections[0].etatDetection.aRetablir = false;
            props.infoAffichageInfobulle.infosDetections[0].etatDetection.ignorable = true;
            props.infoAffichageInfobulle.infoBulleCorrection[0] = 2;
            props.infoAffichageInfobulle.infosDetections[0].motRemplacement = gDonneesDecteteur._dib84.resultats.detections[gDonneesDecteteur._dib84.resultats.detectionsIdx[gDonneesDecteteur.idDetection]].titre;
            messageAction.type = "retabli";
            messageAction.typeSoulignement = -2;
            break;
        case "corrigerInfobulle":
            props.infoAffichageInfobulle.infosDetections[0].etatDetection.aReactiver = false;
            props.infoAffichageInfobulle.infosDetections[0].etatDetection.aRetablir = true;
            props.infoAffichageInfobulle.infosDetections[0].etatDetection.ignorable = false;
            props.infoAffichageInfobulle.infoBulleCorrection[0] = 1;
            const idCorrection = gDonneesDecteteur._dib84.resultats.detections[gDonneesDecteteur._dib84.resultats.detectionsIdx[gDonneesDecteteur.idDetection]].idCorrection;
            props.infoAffichageInfobulle.infosDetections[0].motRemplacement = gDonneesDecteteur._dib84.resultats.corrections[idCorrection].infobulleRetablissement.split("<retablir>")[1].split("</retablir>")[0];
            messageAction.type = "correction";
            messageAction.typeSoulignement = 8;
            break;
        case "nePlusSignaler":
            break;
        case "uniformiser":
            break;
        case "modifier":
            break;
        case "remplacer":
            messageAction.type = "remplacer";
            messageAction.typeSoulignement = 0;
            break;
        case "motsProches":
            break;
        case "synonymes":
            break;
        case "supprimer":
            break;
        case "lienGuides":
            break;
        case "reformuler":
            messageAction.type = "remplacerParReformulation";
            break;
        default:
            break;
    }
    if (mettreAJourProps !== undefined && action !== "selectionDescrition" && action !== "choixEtage") {
        let infobulle = document.getElementById("infobulle_");
        let popupinfobulle = !!infobulle ? document.getElementById("infobulle_").shadowRoot.getElementById("popupinfobulle") : undefined;
        if (!!popupinfobulle) {
            popupinfobulle.style.visibility = "hidden";
        }
        mettreAJourProps(props);
        window.setTimeout(() => {
            if (document.getElementById("infobulle_")) {
                let zIndexMax = findHighestZIndex("*");
                document.getElementById("infobulle_").shadowRoot.getElementById("info-bulle").style.zIndex = parseInt(zIndexMax * 200);
                replacerInfobulle(gDonneesDecteteur.idBouton, gDonneesDecteteur.idPhrase, gDonneesDecteteur.idDetection);
            }
        }, 20);
    }
    if (messageAction.type != "") {
        envoieVersLumiere(messageAction);
    }
}
let props = {
    positionnementInfoBulle,
    infosEditeur,
    estEcranEtroit,
    indexPremiereDetection,
    infoAffichageInfobulle,
    nbEtageMaxInfoBulle,
    infoBulleVisible: false,
    elementScrollHorizontal,
    fonctionAction,
    fonctionChaine,
    initialisationMiseAJour,
    fermerInfoBulle,
    contenu
};
let root = undefined;
let infobulleEstVisible = false;
let tempsFermetureInfobulle = 0;
let estUneRupture = false;

function replacerInfobulle(idBouton, idPhrase, leDetectionIdx, estLarge) {
    let contenantInfobulle = document.querySelector("#infobulle_");
    if (contenantInfobulle && contenantInfobulle.shadowRoot) {
        let infobulle = contenantInfobulle.shadowRoot.querySelector("#info-bulle");
        let popupinfobulle = contenantInfobulle.shadowRoot.querySelector("#popupinfobulle");
        if (!!infobulle && !!popupinfobulle) {
            infobulle.style.maxHeight = "500px";
            infobulle.style.maxWidth = estLarge ? "545px" : "300px";
            if (estLarge) {
                infobulle.style.width = "545px";
            }
            let box = infobulle.getBoundingClientRect();
            if (box.top + box.height >= contenantInfobulle.ownerDocument.defaultView.innerHeight) {
                let detection = DetecteurWeb.ccorrs[idBouton].phrases[idPhrase].resultats.detections[DetecteurWeb.ccorrs[idBouton].phrases[idPhrase].resultats.detectionsIdx[leDetectionIdx]];
                let hauteurDetection = 0;
                if (!!detection && !!detection.coordonnees) {
                    for (let c of detection.coordonnees) {
                        hauteurDetection += c.height;
                    }
                    infobulle.style.top = parseFloat(infobulle.style.top) - box.height - hauteurDetection - 10 + "px";
                }
            }
            popupinfobulle.style.removeProperty("visibility");
        }
    }
}
async function afficherInfobulle(laPosition, leDetectionIdx, idBouton, idPhrase, zIndex) {
    async function ecouteFinRenderInfobulle() {
        return new Promise(recu => {
            let handler = (e) => {
                if (e.data == "render_infobulle_fini") {
                    window.removeEventListener("message", handler);
                    recu();
                }
            }
            window.addEventListener("message", handler);
        });
    }
    async function _affiche(contenu, estReformulation, estAttenteReformulation) {
        props.contenu = contenu;
        props.positionnementInfoBulle = laPosition;
        props.infoBulleVisible = true;
        if (document.getElementById("infobulle_").shadowRoot.getElementById("popupinfobulle")) {
            document.getElementById("infobulle_").shadowRoot.getElementById("popupinfobulle").style.visibility = "hidden";
        }
        if (mettreAJourProps !== undefined) {
            mettreAJourProps(props);
            await ecouteFinRenderInfobulle();
        }
        infobulleEstVisible = true;
        await new Promise(res => {
            window.setTimeout(function() {
                document.getElementById("infobulle_").shadowRoot.getElementById("info-bulle").style.zIndex = parseInt(zIndex) * 200;
                document.getElementById("infobulle_").shadowRoot.getElementById("info-bulle").setAttribute("iddetection", leDetectionIdx);
                document.getElementById("infobulle_").shadowRoot.getElementById("info-bulle").setAttribute("idphrase", idPhrase);
                document.getElementById("infobulle_").shadowRoot.getElementById("info-bulle").style.maxHeight = "10000px";
                document.getElementById("infobulle_").setAttribute("iddetecteurweb", idBouton);
                let desLiensReglages = document.getElementById("infobulle_").shadowRoot.querySelectorAll(".lien_reglage");
                for (let lien of desLiensReglages) {
                    lien.remove();
                }
                let idAntidote = estAntidoteWeb(mesDonneesGlobales.idAntidote) ? cstIdAntidoteWeb : cstIdAntidoteBureau;
                if (idAntidote != 2) {
                    for (let c of document.getElementById("infobulle_").shadowRoot.querySelectorAll(".article")) {
                        c.style.cursor = "default";
                        c.removeAttribute("onclick");
                    }
                }
                if (estReformulation) {
                    if (document.getElementById("infobulle_").shadowRoot.querySelectorAll(".bouton") && document.getElementById("infobulle_").shadowRoot.querySelectorAll(".bouton").length > 1) {
                        document.getElementById("infobulle_").shadowRoot.querySelectorAll(".bouton")[1].style.display = "none";
                        document.getElementById("infobulle_").shadowRoot.querySelectorAll(".boutons-reformulation")[0]?.remove();
                    }
                }
                res();
            }, 25);
        });
        replacerInfobulle(idBouton, idPhrase, leDetectionIdx, estReformulation || estAttenteReformulation);
    }

    function _convertisDescription(description) {
        const parser = new DOMParser();
        let contenuNode = parser.parseFromString(description, "text/xml");
        if (contenuNode.querySelectorAll("infobulle").length > 0) {
            contenuNode = xsltProcessor.transformToDocument(contenuNode);
        }
        for (let a of contenuNode.querySelectorAll("a")) {
            if (a.href == document.location.href + "#" || a.href == document.location.href) {
                a.style.cursor = "pointer";
                a.removeAttribute("href");
            }
        }
        for (let a of contenuNode.querySelectorAll(".devoilement.fermay")) {
            a.remove();
        }
        return contenuNode.getElementById("contenu").outerHTML;
    }
    const detection = DetecteurWeb.ccorrs[idBouton].phrases[idPhrase].resultats.detections[DetecteurWeb.ccorrs[idBouton].phrases[idPhrase].resultats.detectionsIdx[leDetectionIdx]];
    const idCorrection = detection.idCorrection;
    const correction = DetecteurWeb.ccorrs[idBouton].phrases[idPhrase].resultats.corrections[idCorrection];
    const actions = detection.actions;
    let action = determineBoutons(actions);
    if (detection.typeSoulignement == 2) action.Corriger = false;
    const infoBulleCorrectionValeur = detection.aEteCorrigee ? 1 : 2;
    const motRemplacement = detection.aEteCorrigee ? correction.infobulleRetablissement.split("<retablir>")[1].split("</retablir>")[0] : detection.titre;
    infoAffichageInfobulle = {
        afficheCorrection: action.Corriger || detection.aEteCorrigee,
        avecEtage: false,
        detectionApres: false,
        detectionAvant: false,
        dicoPersoRestreint: false,
        dictionnairesRestreint: false,
        reformulationRestreinte: false,
        infoBulleCorrection: [infoBulleCorrectionValeur],
        infosDetections: [{
            cardinalitay: 0,
            cardinalitayAffichay: "***",
            estEditable: false,
            estReformulable: false,
            etatDetection: {
                aNePlusSignaler: false,
                aReactiver: detection.estIgnoree,
                aRetablir: action.Corriger && detection.aEteCorrigee,
                aUniformiser: action.Uniformiser,
                ajoutDicosPerso: false,
                cmdMotsProches: false,
                cmdSupprimer: false,
                cmdSynonymes: false,
                corrigeable: action.Corriger,
                etat: 0,
                ignorable: action.Ignorer && !detection.aEteCorrigee,
                lienGuides: undefined,
                pourUniformiser: false,
                propositionRemplacement: action.Remplacer || action.Reformuler ? !!correction ? correction.chaine : undefined : undefined
            },
            explicationBreve: motRemplacement,
            motRemplacement: motRemplacement,
            styleApostille: undefined,
        }],
        estReformulation: action.Reformuler,
        noEtageEnCours: 0
    };
    props.infoAffichageInfobulle = infoAffichageInfobulle;
    let demandeReformulation = !!detection.estIncomplete;
    document.getElementById("infobulle_").shadowRoot.getElementById("info-bulle").onpointerdown = captureLePointeur;
    if (demandeReformulation) {
        let desc = detection.description;
        let contenu = _convertisDescription(desc);
        _affiche(contenu, action.Reformuler, true);
        let msgApplique = JSON.stringify({
            message: "donnerInfobulleComplete",
            idPhrase: idPhrase,
            idDetections: [parseInt(leDetectionIdx)]
        })
        DetecteurWeb.ccorrs[idBouton].applique(msgApplique);
        let reponse = await new Promise(completay => {
            let handler = function(e) {
                if (e.data.reponse == "donnerInfobulleComplete") {
                    completay(e.data.reformulations);
                    window.removeEventListener("message", handler);
                }
            }
            window.addEventListener("message", handler);
        });
        afficherInfobulle(laPosition, leDetectionIdx, idBouton, idPhrase, zIndex);
    } else {
        let contenu = _convertisDescription(detection.description);
        _affiche(contenu, action.Reformuler, false);
    }
}

function construisReformulation(leObjetReformulation) {
    let desReformulations = [];
    for (let i = 0; i < leObjetReformulation.length; i++) {
        let unTexteRemplacement = leObjetReformulation[i].texte;
        let unVecteurPositions = [0];
        let unVecteurTexte = [];
        let unVecteurAjout = [];
        for (let diffIntervalle of leObjetReformulation[i].differences) {
            unVecteurPositions.push(diffIntervalle.intervalleRefo.borneDebut);
            unVecteurPositions.push(diffIntervalle.intervalleRefo.borneFin);
            unVecteurAjout.push(unTexteRemplacement.substring(diffIntervalle.intervalleRefo.borneDebut, diffIntervalle.intervalleRefo.borneFin));
        }
        if (unVecteurPositions.at(-1) < unTexteRemplacement.length) {
            unVecteurPositions.push(unTexteRemplacement.length)
        }
        for (let p = 0; p < unVecteurPositions.length - 1; p++) {
            unVecteurTexte.push(unTexteRemplacement.substring(unVecteurPositions[p], unVecteurPositions[p + 1]));
        }
        let contenuRefo = cree("div", {
            id: "contenu",
            class: "contenu-reformulation"
        });
        unVecteurAjout = unVecteurAjout.reverse();
        for (let t of unVecteurTexte) {
            if (t == unVecteurAjout.at(-1)) {
                let a = cree("span", {
                    class: "ajout"
                });
                metsTexte(a, unVecteurAjout.at(-1));
                unVecteurAjout.pop();
                contenuRefo.appendChild(a);
            } else {
                let a = cree("span", {
                    class: "texte"
                });
                metsTexte(a, t);
                contenuRefo.appendChild(a);
            }
        }
        desReformulations.push(contenuRefo);
    }
    return desReformulations;
}

function faisActionSurGraphie(e) {
    let aEteCorrigee = document.getElementById("infobulle_").shadowRoot.querySelectorAll(".mot-original").length > 0;
    let uneCommande = aEteCorrigee ? "retablirInfobulle" : "corrigerInfobulle";
    fonctionAction(null, uneCommande);
}

function captureLePointeur(e) {
    let idDetecteur = document.getElementById("infobulle_").getAttribute("iddetecteurweb");
    let unElement = DetecteurWeb.objetBoutonsZones[idDetecteur].zone;
    window.setTimeout(() => {
        if (!(estGoogleChrome() && (estGmail() || estGutenberg())) && !(estSafariWebex() && estGutenberg())) {
            unElement.focus();
        }
        document.getElementById("infobulle_").shadowRoot.getElementById("info-bulle-mot").ondblclick = faisActionSurGraphie;
    }, 1);
}
const image_fiole_menu = donneUrlFichier('images/detecteurWeb/icone-fiole-menu.svg');
const image_inactive_menu = donneUrlFichier('images/detecteurWeb/icone-detecteur-inactif-menu.svg');
const image_ignore = donneUrlFichier('images/detecteurWeb/icone-fermer-menu.svg');

function donneCoordsAncre(elem, offsets) {
    if (offsets === undefined || offsets === null) offsets = true;
    let box = elem.getBoundingClientRect();
    let verticalOffset = elem.ownerDocument.defaultView.pageYOffset !== undefined ? elem.ownerDocument.defaultView.pageYOffset : 0;
    let horizontalOffset = elem.ownerDocument.defaultView.pageXOffset !== undefined ? elem.ownerDocument.defaultView.pageXOffset : 0;
    if (!offsets) {
        verticalOffset = 0;
        horizontalOffset = 0;
    }
    const style = window.getComputedStyle(elem);
    return {
        top: box.top + verticalOffset,
        bottom: box.bottom + verticalOffset,
        left: box.left + horizontalOffset,
        right: box.right + horizontalOffset,
        width: box.width,
        height: box.height,
        paddingBottom: parseInt(style.paddingBottom),
        paddingRight: parseInt(style.paddingRight),
        marginBottom: parseInt(style.marginBottom),
        marginRight: parseInt(style.marginRight)
    };
}

function donneCoordIframe(e1, e2) {
    if (e1 != e2 && estIFrame(e2)) {
        let box = e2.getBoundingClientRect();
        return {
            top: box.top + e2.ownerDocument.defaultView.scrollY,
            bottom: box.bottom + e2.ownerDocument.defaultView.scrollY,
            left: box.left + e2.ownerDocument.defaultView.scrollX,
            right: box.right + e2.ownerDocument.defaultView.scrollX,
            height: 0,
            width: 0,
            paddingTop: 0,
            paddingBottom: 0,
            paddingLeft: 0,
            paddingRight: 0,
            bottomClient: e2.ownerDocument.documentElement.clientHeight,
            rightClient: e2.ownerDocument.body.clientWidth,
            heightClient: e2.ownerDocument.documentElement.clientHeight,
            widthClient: e2.ownerDocument.body.clientWidth
        };
    } else {
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
            bottomClient: 0,
            rightClient: 0,
            heightClient: 0,
            widthClient: 0
        }
    }
}

function enleveNoeudEnfants(leNoeud) {
    while (leNoeud.firstChild) {
        leNoeud.removeChild(leNoeud.lastChild);
    }
}

function donneClasseSoulignement(leTypeErreur) {
    switch (leTypeErreur) {
        case 0:
            return "";
            break;
        case 1:
            return "EmpanOrange";
            break;
        case 2:
            return "OndulayOrange";
            break;
        case 3:
            return "TraitFinOrange";
            break;
        case 4:
            return "TraitPointillayGrasOrange";
            break;
        case 5:
            return "TraitGrasOrange";
            break;
        case 6:
            return "TraitPointillayGrasRouge";
            break;
        case 7:
            return "TraitGrasRouge";
            break;
        case 8:
            return "TraitFinFushia";
            break;
        case 9:
            return "TraitPointillayGrasFushia";
            break;
        case 10:
            return "TraitGrasFushia";
            break;
        case 11:
            return "EmpanRouge";
            break;
        case -1:
            return "TraitGrasVert";
            break;
        case -2:
            return "TraitFinPointillayNoir";
            break;
        default:
            return "TraitGrasRouge";
    }
}

function determineBoutons(action) {
    return determineActions(action);
}

function envoieVersLumiere(msg) {
    let C = new CustomEvent('message_dw', {
        detail: msg
    });
    window.dispatchEvent(C);
}

function envoieReponseInitilasationVersLumiere(msg) {
    let C = new CustomEvent('message_init_dw', {
        detail: msg
    });
    window.dispatchEvent(C);
}

function insereNoeudAvant(leNoeud, leNoeudExistant) {
    if (estLabel(leNoeudExistant.previousElementSibling)) {
        leNoeudExistant = leNoeudExistant.previousElementSibling;
    }
    leNoeudExistant.insertAdjacentElement("beforebegin", leNoeud);
}
class ObjetBulle {
    constructor(leObjInitialisation) {
        this.id = leObjInitialisation.id;
        this.zIndex = leObjInitialisation.zIndex;
        this.estActivayCorrectionExpress = leObjInitialisation.estActivayCorrectionExpress;
        this.position_x = leObjInitialisation.position_x;
        this.etat = {};
    }
    async init() {
        const xslRef = await initXsltProcessor();
        xsltProcessor = new XSLTProcessor();
        xsltProcessor.importStylesheet(xslRef);
        if (!document.defaultView.parent.document.getElementById("infobulle_")) {
            this.infobulles = cree("div", {
                id: "infobulle_",
                style: {
                    position: "absolute",
                    top: "0"
                }
            });
            document.defaultView.parent.document.getElementsByTagName('html').item(0).append(this.infobulles);
            this.infobulles.attachShadow({
                mode: 'open'
            });
            this.infobulles.dataset.druide_dw = "infobulle";
            const style_infobulle = cree('link', {
                href: donneUrlFichier("extensions/DetecteurWeb/infobulle/infobulle.css"),
                rel: "stylesheet"
            })
            this.infobulles.shadowRoot.appendChild(style_infobulle);
            const style_infobulle_mod = cree('link', {
                href: donneUrlFichier("extensions/DetecteurWeb/infobulle/infobulle_mod.css"),
                rel: "stylesheet"
            })
            this.infobulles.shadowRoot.appendChild(style_infobulle_mod);
            let scriptInfoBulle = cree("script", {
                type: "text/javascript",
                src: donneUrlFichier("extensions/DetecteurWeb/infobulle/infobulle_lien.js")
            });
            this.infobulles.shadowRoot.appendChild(scriptInfoBulle);
        } else {
            this.infobulles = document.defaultView.parent.document.getElementById("infobulle_");
        }
        if (this.infobulles.shadowRoot.getElementById("popupinfobulle") === undefined || this.infobulles.shadowRoot.getElementById("popupinfobulle") == null) {
            let ancreInfoBulle = cree("div", {
                id: "popupinfobulle"
            });
            this.infobulles.shadowRoot.appendChild(ancreInfoBulle);
            root = ReactDOM.createRoot(ancreInfoBulle);
            root.render(React.createElement(window.infobulle.default, props));
        }
        envoieReponseInitilasationVersLumiere({
            message: "initialisation_bulle",
            completee: true,
            id: this.id
        });
    }
}
class ObjetDetecteur {
    constructor(leObjInitialisation) {
        this.id = leObjInitialisation.id;
        this.zIndex = Math.abs(leObjInitialisation.zIndex);
        if (this.zIndex == 0) this.zIndex = 1;
        this.estActivayCorrectionExpress = leObjInitialisation.estActivayCorrectionExpress;
        this.position_x = leObjInitialisation.position_x;
        this.maFiole = null;
        this.element = null;
        this.zone = null;
        this.perisprit = null;
        this.srBouton = null;
        this.infobulles = null;
        this.boutonDWIgnore = null;
        this.boutonDWFiole = null;
        this.boutonDW = null;
        this.cloneBoutonDW = null;
        this.contenantBoutonDW = null;
        this.msgDWMessage = null;
        this.monIDFioleActivay = "";
        this.aDesAlertes = false;
        this.iframeParent = null;
        this.intervallePositionnement = 0;
        this.intervalleRepositionnementBouton = 0;
        this.zonePositionnementDW = null;
        this.grandeurBouton = 37;
        this.menuFermer = null;
        this.menuPoursuivre = null;
        this.sectionFermer = null;
        this.sectionPoursuivre = null;
        this.sectionPoursuivreTexte = null;
        this.fioleDeplaceay = false;
        this.affichageFioleFini = false;
        this.timeoutAffichageFiole = 0;
    }
    positionAt(info) {
        if (!this.element || !this.boutonDW) return;
        const contenant = this.contenantBoutonDW;
        let boxZone = donneCoordsAncre(this.zone, false);
        if (!this.zonePositionnementDW) {
            let parentScrollable = donneParentScrollable(this.zone);
            if (!!parentScrollable && Math.abs(parentScrollable.scrollHeight - this.zone.clientHeight) <= 100) {
                this.zonePositionnementDW = parentScrollable;
            }
        }
        if (this.zonePositionnementDW) {
            const widthAvant = boxZone.width;
            const leftAvant = boxZone.left;
            boxZone = donneCoordsAncre(this.zonePositionnementDW, false);
            boxZone.width = widthAvant + (leftAvant - boxZone.left);
        }
        let styleZone = window.getComputedStyle(this.zone);
        if (this.zone === this.zone.ownerDocument.body && this.iframeParent !== null) {
            const boxIframe = this.iframeParent.getBoundingClientRect();
            boxZone.height = boxIframe.height;
            boxZone.width = boxIframe.width;
            this.changerTailleBouton("grand");
        }
        const box = this.boutonDW.getBoundingClientRect();
        let boxContenant = contenant.getBoundingClientRect();
        const boxAnchor = this.element.getBoundingClientRect();
        if (this.element.ownerDocument === contenant.ownerDocument && !this.zonePositionnementDW) {
            contenant.style.left = parseFloat(contenant.style.left) + boxAnchor.left - boxContenant.left + "px";
            contenant.style.top = parseFloat(contenant.style.top) + boxAnchor.top - boxContenant.top + "px";
        }
        if (this.iframeParent && !this.iframeParent.ownerDocument.defaultView.frameElement && this.element.ownerDocument !== contenant.ownerDocument && this.zonePositionnementDW !== this.iframeParent) {
            contenant.style.top = parseFloat(contenant.style.top) + boxAnchor.top + this.iframeParent.getBoundingClientRect().top +
                this.element.ownerDocument.scrollingElement.scrollTop - boxContenant.top + "px";
        }
        if (this.zonePositionnementDW && this.zonePositionnementDW.ownerDocument == this.contenantBoutonDW.ownerDocument) {
            contenant.style.left = parseFloat(contenant.style.left) + boxZone.left - boxContenant.left + "px";
            contenant.style.top = parseFloat(contenant.style.top) + boxZone.top - boxContenant.top + "px";
        }
        if ((this.boutonDW.dataset.deplace === undefined || this.boutonDW.dataset.deplace == "0")) {
            let left = boxZone.width - this.grandeurBouton - 12 - parseFloat(styleZone.marginLeft);
            let top = 0;
            if (this.grandeurBouton === 26 && boxZone.height < 50) top = ((boxZone.height - this.grandeurBouton) / 2);
            else if (info !== undefined && !this.zonePositionnementDW) {
                if (info.coord.left >= 0 && info.ratio !== undefined) {
                    top = (boxZone.height * info.ratio) - box.height - 12;
                }
            } else {
                top = boxZone.height - this.grandeurBouton - 12;
            }
            this.cloneBoutonDW.style.top = top + "px";
            this.cloneBoutonDW.style.left = left + "px"
            if (this.boutonDW.classList.contains("exterieur")) {
                left += 40;
                top += 32;
            }
            this.boutonDW.style.top = top + "px";
            this.boutonDW.style.left = left + "px";
        }
    }
    creerShadowRoot(parent) {
        parent.attachShadow({
            mode: "open"
        });
        const {
            shadowRoot
        } = parent;
        return shadowRoot;
    }
    corrigeEmplacement() {
        let box = this.zone.getBoundingClientRect();
        let boxElem = this.element.getBoundingClientRect();
        let styleElem = window.getComputedStyle(this.element);
        this.element.style.left = parseFloat(styleElem.left) + box.left - boxElem.left + "px";
        this.element.style.top = parseFloat(styleElem.top) + box.top - boxElem.top + "px";
        this.intervallePositionnement = window.setTimeout(this.corrigeEmplacement.bind(this), 300, this.elem, this.zone);
    }
    async init(leDocument, leElement) {
        this.zone = leElement;
        const xslRef = await initXsltProcessor();
        xsltProcessor = new XSLTProcessor();
        xsltProcessor.importStylesheet(xslRef);
        this.element = cree("div", {
            id: this.id
        });
        this.element.style.maxHeight = "0px";
        this.element.style.width = "0px";
        this.element.dataset.druide_dw = "bouton";
        this.element.style.position = "absolute";
        insereNoeudAvant(this.element, leElement);
        if (this.element.parentNode !== undefined && this.element.parentElement.classList.contains("DraftEditor-editorContainer") || estFacebook()) {
            insereNoeudAvant(this.element, this.element.parentNode);
        }
        window.clearTimeout(this.intervallePositionnement);
        this.corrigeEmplacement(this.element, this.zone);
        const elementActifParent = leElement.ownerDocument.defaultView.parent.document.activeElement;
        if (estIFrame(elementActifParent)) this.iframeParent = elementActifParent;
        this.perisprit = this.creerShadowRoot(this.element);
        const request = new Request(donneUrlFichier("extensions/DetecteurWeb/detecteurWeb.css"), {
            method: 'GET',
            headers: {
                'Content-Type': 'text/css'
            }
        });
        let uneReponseFetch = await fetch(request);
        let uneReponse = await uneReponseFetch.text();
        const style = document.createElement('style');
        style.textContent = uneReponse;
        this.perisprit.appendChild(style);
        this.contenantBoutonDW = cree("div", {
            id: `b${this.id}`
        });
        this.contenantBoutonDW.dataset.boutonAec = this.id;
        this.contenantBoutonDW.style.maxHeight = "0px";
        this.contenantBoutonDW.style.maxWidth = "0px";
        this.contenantBoutonDW.style.top = "0px";
        this.contenantBoutonDW.style.left = "0px";
        this.boutonDW = cree("div", {
            id: "bloc_dw",
            class: "grid-bouton msg_dw disparition",
            style: {
                display: "inline-grid"
            }
        });
        this.srBouton = this.creerShadowRoot(this.contenantBoutonDW);
        const styleBouton = document.createElement("style");
        styleBouton.textContent = uneReponse;
        this.srBouton.appendChild(styleBouton);
        if (leElement.clientHeight < 50 || leElement.clientWidth < 150) this.grandeurBouton = 26;
        this.boutonDWFiole = cree("div", {
            id: "fiole_bouton",
            class: "dw_bouton dw_fiole",
            style: {
                border: "0px",
                height: `${this.grandeurBouton}px`,
                width: `${this.grandeurBouton}px`
            }
        });
        this.cloneBoutonDW = cree("div", {
            id: `b${this.id}_clone`,
            style: {
                position: "absolute",
                width: `${this.grandeurBouton}px`,
                height: `${this.grandeurBouton}px`,
                visibility: "hidden"
            }
        });
        this.maFiole = new ObjetSVG(this.srBouton);
        let imgBoutonDWFiole = this.maFiole.creeFiole();
        this.msgDWMessage = cree("div", {
            id: "msg_dw_message",
            class: "dw_msg_groupe",
            visibility: "hidden",
            style: {
                opacity: 0
            }
        });
        this.menuFermer = cree("div", {
            id: "dw_ignore",
            class: "menu_selection_dw menu_dw"
        });
        this.sectionFermer = cree("div", {
            class: "section_menu"
        });
        let uneSectionImageFermer = cree("div", {
            class: "image_menu"
        });
        let imgBoutonDWIgnore = cree("img", {
            id: "icone_ignore",
            src: image_ignore,
            class: "image_ignore_svg"
        });
        uneSectionImageFermer.appendChild(imgBoutonDWIgnore);
        let uneSectionMenuFermer = cree("div", {
            class: "texte_menu"
        });
        uneSectionMenuFermer.appendChild(document.createTextNode(gestionTraduction.Tr_(cstDWSupprimer)));
        this.sectionFermer.appendChild(uneSectionImageFermer);
        this.sectionFermer.appendChild(uneSectionMenuFermer);
        this.menuFermer.appendChild(this.sectionFermer);
        this.msgDWMessage.appendChild(this.menuFermer);
        this.menuPoursuivre = cree("div", {
            id: "dw_poursuivre",
            class: "menu_selection_dw menu_dw"
        });
        this.sectionPoursuivre = cree("div", {
            class: "section_menu"
        });
        let uneSectionImagePoursuivre = cree("div", {
            class: "image_menu"
        });
        let imgBoutonFioleMenu = cree("img", {
            id: "icone_menu_fiole",
            src: image_fiole_menu,
            class: "image_svg"
        });
        uneSectionImagePoursuivre.appendChild(imgBoutonFioleMenu);
        this.sectionPoursuivreTexte = cree("div", {
            class: "texte_menu"
        });
        this.sectionPoursuivreTexte.appendChild(document.createTextNode(gestionTraduction.Tr_(cstDWPoursuivreCorrection)));
        this.sectionPoursuivre.appendChild(uneSectionImagePoursuivre);
        this.sectionPoursuivre.appendChild(this.sectionPoursuivreTexte);
        this.menuPoursuivre.appendChild(this.sectionPoursuivre);
        this.msgDWMessage.appendChild(this.menuPoursuivre);
        this.menuConnexion = cree("div", {
            id: "dw_connexion",
            class: "menu_selection_dw menu_connexion_dw",
            style: {
                display: "none"
            }
        });
        this.sectionConnexion = cree("div", {
            class: "section_connexion"
        });
        let uneSectionImageConnexion = cree("div", {
            class: "image_connexion"
        });
        let imgBoutonConnexionMenu = cree("img", {
            id: "icone_menu_fiole_connexion",
            src: image_inactive_menu,
            class: "image_inactive_svg"
        });
        uneSectionImageConnexion.appendChild(imgBoutonConnexionMenu);
        this.sousSectionConnexion = cree("div", {
            class: "sous_section_connexion"
        });
        this.titreConnexion = cree("div", {
            class: "titre_connexion"
        });
        this.explicationConnexion = cree("div", {
            class: "explication_connexion",
            style: {
                display: "none"
            }
        });
        this.titreConnexion.appendChild(document.createTextNode(gestionTraduction.Tr_(cstDWInactif)));
        this.explicationConnexion.appendChild(document.createTextNode(gestionTraduction.Tr_(cstDWAWebNonConnectay)));
        this.explicationConnexionAweb = cree("span", {
            class: "explication_connexion_aweb"
        });
        this.explicationConnexionAweb.appendChild(document.createTextNode(" Antidote Web"));
        this.explicationConnexion.appendChild(this.explicationConnexionAweb);
        this.explicationActivation = cree("div", {
            class: "explication_connexion",
            style: {
                display: "none"
            }
        });
        this.explicationActivation.appendChild(document.createTextNode(gestionTraduction.Tr_(cstAntidoteNonActivay)));
        this.explicationActiverAntidote = cree("span", {
            class: "explication_activer_antidote"
        });
        this.explicationActiverAntidote.appendChild(document.createTextNode(" Antidote "));
        this.explicationActivation.appendChild(this.explicationActiverAntidote);
        this.sousSectionConnexion.appendChild(this.titreConnexion);
        this.sousSectionConnexion.appendChild(this.explicationConnexion);
        this.sousSectionConnexion.appendChild(this.explicationActivation);
        this.sectionConnexion.appendChild(uneSectionImageConnexion);
        this.sectionConnexion.appendChild(this.sousSectionConnexion);
        this.menuConnexion.appendChild(this.sectionConnexion);
        this.msgDWMessage.appendChild(this.menuConnexion);
        this.boutonDW.appendChild(this.msgDWMessage);
        this.boutonDWFiole.appendChild(imgBoutonDWFiole);
        this.boutonDW.appendChild(this.boutonDWFiole);
        this.srBouton.appendChild(this.boutonDW);
        this.srBouton.appendChild(this.cloneBoutonDW);
        this.maFiole.cacheElement("bouton_svg");
        this.boutonDWFiole.style.zIndex = parseInt(this.zIndex) + 1;
        this.boutonDW.style.zIndex = parseInt(this.zIndex) + 2;
        envoieReponseInitilasationVersLumiere({
            message: "initialisation",
            completee: true,
            id: this.id
        });
        setTimeout(this.ajouteEcouteurBoutonDW.bind(this), 500);
    }
    positionInfobulleAt(anchor, box) {
        let unElementActifParent = anchor.ownerDocument.defaultView.parent.document.activeElement;
        let c = donneCoordIframe(anchor, unElementActifParent, true);
        let boxAnchor = donneCoordsAncre(anchor, true);
        let unDWType = parseInt(anchor.parentNode.dataset.dw_type);
        let top = estIFrame(unElementActifParent) ? box.top : boxAnchor.top;
        let position = {
            bottom: boxAnchor.bottom + c.bottom,
            height: boxAnchor.height,
            left: boxAnchor.left + c.left,
            right: boxAnchor.right + c.right,
            top: top + c.top,
            width: boxAnchor.width
        };
        return position;
    }
    montreBouton() {
        if (this.boutonDW && this.canvasInitialisay) {
            this.boutonDW.classList.remove("disparition");
            this.boutonDW.classList.add("apparition");
            this.boutonDW.style.display = "inline-grid";
            if (this.perisprit.getElementById("_corrdecteur")) this.perisprit.getElementById("_corrdecteur").style.display = "block";
            window.clearTimeout(this.intervalleRepositionnementBouton);
            this.intervalleRepositionnementBouton = window.setTimeout(this.repositionnerBouton.bind(this), 1000);
        }
    }
    cacheBouton() {
        if (this.boutonDW && this.canvasInitialisay) {
            this.boutonDW.classList.remove("apparition");
            this.boutonDW.classList.add("disparition");
            this.boutonDW.style.display = "none";
            if (this.perisprit.getElementById("_corrdecteur")) this.perisprit.getElementById("_corrdecteur").style.display = "none";
            window.clearTimeout(this.intervalleRepositionnementBouton);
        }
    }
    async montreFiole(leIDFiole) {}
    afficheMessage(leNoeud, leMessage) {
        if (!!this.perisprit && !!this.perisprit.getElementById("_corrdecteur") && window.getComputedStyle(this.perisprit.getElementById("_corrdecteur")).display == "block") {
            metsTexte(leNoeud, leMessage);
        }
    }
    ajouteBoutonAlerte(id) {
        this.maFiole.affichePastille("alerte");
        let idAntidote = estAntidoteWeb(mesDonneesGlobales.idAntidote) ? cstIdAntidoteWeb : cstIdAntidoteBureau;
        this.afficheMessage(this.sectionPoursuivreTexte, gestionTraduction.Tr_(cstDWAlerte) + " " + cstNomIdAntidote[idAntidote]);
    }
    ajouteBoutonNeutre(messageComplementaire) {
        this.maFiole.metsNeutre();
        let idAntidote = estAntidoteWeb(mesDonneesGlobales.idAntidote) ? cstIdAntidoteWeb : cstIdAntidoteBureau;
        let message = gestionTraduction.Tr_(cstDWPoursuivreCorrection) + " " + cstNomIdAntidote[idAntidote];
        if (messageComplementaire !== undefined) {
            message = messageComplementaire + " " + message;
        }
        this.afficheMessage(this.sectionPoursuivreTexte, message);
    }
    ajouteBoutonAvertissement(leIDParent) {
        this.maFiole.metsInactif();
    }
    calculeNbDetections(_dib84) {
        let unNbDetections = 0;
        for (let [idPhrase, phrase] of Object.entries(_dib84)) {
            if (phrase.aErreur !== undefined && phrase.aErreur) {
                for (let detectionIdx in phrase.resultats.detections) {
                    if (!phrase.resultats.detections[detectionIdx].aEteCorrigee) {
                        unNbDetections = unNbDetections + 1;
                    }
                }
            }
        }
        return unNbDetections;
    }
    modifieBoutonFiole(msg) {
        this.maFiole.metsNeutre();
        if (msg.sorteIntervention.toutCorrigeay === undefined) {
            this.maFiole.cachePastille();
            return;
        }
        if (msg.sorteIntervention.alertePerso) {
            this.maFiole.affichePastille("alerte_perso");
        } else {
            if (msg.sorteIntervention.corrections > 0) {
                this.maFiole.affichePastille("erreur");
            } else if (msg.sorteIntervention.corrections == 0 && !msg.sorteIntervention.toutCorrigeay) {
                if ((msg.sorteIntervention.autres > 0 || msg.sorteIntervention.remplacements > 0) && msg.niveauAlerte == 2) {
                    this.maFiole.affichePastille("alerte");
                } else {
                    this.maFiole.metsOK();
                }
            } else if (msg.sorteIntervention.corrections == -1 && msg.sorteIntervention.remplacements == -1) {
                this.maFiole.cachePastille();
            } else if (msg.sorteIntervention.toutCorrigeay) {
                this.maFiole.metsOK();
            }
        }
    }
    estDetectionAntiOups(leTitre) {
        const uneListe = ["Missing attachment?", "Missing attachment ?", "Pièce à joindre?", "Pièce à joindre ?"];
        for (let t of uneListe) {
            if (leTitre == t) {
                return true;
            }
        }
        return false;
    }
    metsSoulignement(donneesDetections) {
        const detectionIdx = donneesDetections.detectionIdx;
        const phrase = donneesDetections.phrase;
        const detection = donneesDetections.phrase.resultats.detections[detectionIdx];
        const idPhrase = donneesDetections.idPhrase;
        const noeudPhrase = donneesDetections.noeudPhrase;
        let corrdecteur = this.perisprit.getElementById("_corrdecteur");
        if (this.perisprit.getElementById("sl-" + idPhrase + "_" + detection.id)) {
            this.perisprit.getElementById("sl-" + idPhrase + "_" + detection.id).remove();
        }
        let unNoeudSoulignement = document.createElement('druide-erreur');
        noeudPhrase.appendChild(unNoeudSoulignement);
        let unTypeSoulignement = 0;
        if (phrase.resultats.detections[detectionIdx].estIgnoree) {
            unTypeSoulignement = -2;
        } else if (!phrase.resultats.detections[detectionIdx].aEteCorrigee) {
            unTypeSoulignement = phrase.resultats.detections[detectionIdx].typeSoulignement;
        } else {
            unTypeSoulignement = -1;
        }
        if (unTypeSoulignement == 0) return "-1";
        if (determineNiveauAlerte(phrase.resultats.detections[detectionIdx].typeSoulignement, donneesDetections.niveauAlerte) || this.estDetectionAntiOups(phrase.resultats.detections[detectionIdx].titre)) {
            if (detection.coordonnees !== undefined && detection.coordonnees != {}) {
                for (let s = 0; s < detection.coordonnees.length; s++) {
                    let elem = document.createElement("druide-erreur");
                    let coord = detection.coordonnees[s];
                    elem.style.position = "absolute";
                    elem.style.x = coord.x + "px";
                    elem.style.y = coord.y + "px";
                    elem.style.width = coord.width + "px";
                    elem.style.height = coord.height + "px";
                    elem.style.top = coord.top + "px";
                    if (coord.estInput) {
                        elem.style.top = "50%";
                        elem.style.transform = "translateY(-50%)";
                    }
                    elem.style.right = coord.right + "px";
                    elem.style.bottom = coord.bottom + "px";
                    elem.style.left = coord.left + "px";
                    elem.className = donneClasseSoulignement(unTypeSoulignement);
                    elem.style.zIndex = parseInt(this.zIndex) + 1;
                    elem.id = s + "-sl-" + idPhrase + "_" + detection.id;
                    elem.setAttribute("top_druide", coord.top);
                    unNoeudSoulignement.appendChild(elem);
                }
            }
        } else {
            this.aDesAlertes = true;
        }
        unNoeudSoulignement.id = "sl-" + idPhrase + "_" + detection.id;
        unNoeudSoulignement.style.zIndex = parseInt(this.zIndex) + 1;
        if (detectionIdx == donneesDetections.phrase.resultats.detections.length - 1) {
            corrdecteur.appendChild(noeudPhrase);
        }
        return unNoeudSoulignement.id;
    }
    installeActionsSoulignement(donneesDetections) {
        let unNoeudSoulignement = this.perisprit.getElementById(donneesDetections.idSoulignement);
        const detection = donneesDetections.phrase.resultats.detections[donneesDetections.detectionIdx];
        try {
            unNoeudSoulignement.removeEventListener('dblclick', function() {}, false);
            unNoeudSoulignement.addEventListener("dblclick", function(c) {
                if (this.perisprit.querySelectorAll('*[data-erreur_id="' + donneesDetections.idPhrase + ',' + detection.id + '_corriger"]')[0].style.display == "block") {
                    actionCorrection();
                } else {
                    actionRetabli();
                }
            });
        } catch (erreur) {
            console.error("dw-patron.installeActionsSoulignement", erreur);
        }
    }
    metsAJourSoulignementsPourIdPhrase(msg) {
        let _dib84 = msg._dib84;
        if (!_dib84) return;
        let corrdecteur = this.perisprit.getElementById("_corrdecteur");
        if (corrdecteur) {
            let phrase = _dib84[msg.idPhrase];
            if (phrase !== undefined && phrase.aErreur !== undefined && phrase.aErreur) {
                let noeudPhrase = corrdecteur.querySelector(`#p${msg.idPhrase}`)
                if (!noeudPhrase) {
                    noeudPhrase = cree("div", {
                        id: `p${msg.idPhrase}`
                    });
                }
                for (let detectionIdx in phrase.resultats.detections) {
                    let unIdNoeudSoulignement = this.metsSoulignement({
                        idPhrase: msg.idPhrase,
                        phrase: phrase,
                        detectionIdx: detectionIdx,
                        niveauAlerte: msg.niveauAlerte,
                        noeudPhrase: noeudPhrase
                    });
                    if (unIdNoeudSoulignement != -1) {
                        let unNoeudSoulignement = this.perisprit.getElementById(unIdNoeudSoulignement);
                        if (unNoeudSoulignement) {
                            this.installeActionsSoulignement({
                                idPhrase: msg.idPhrase,
                                phrase: phrase,
                                detectionIdx: detectionIdx,
                                idSoulignement: unIdNoeudSoulignement
                            });
                        }
                    }
                }
            }
        }
        let ceci = this;
        window.setTimeout(function() {
            if (document.getElementById("infobulle_")) document.getElementById("infobulle_").shadowRoot.getElementById("info-bulle").style.zIndex = parseInt(ceci.zIndex) * 200;
        }, 25);
    }
    async metsAJourSoulignements(msg) {
        let _dib84 = typeof msg._dib84 === 'undefined' ? null : msg._dib84;
        let corrdecteur = this.perisprit.getElementById("_corrdecteur");
        if (corrdecteur && _dib84) {
            let compteur = 0;
            for (let [idPhrase, phrase] of Object.entries(_dib84)) {
                msg.idPhrase = idPhrase;
                this.metsAJourSoulignementsPourIdPhrase(msg);
                compteur++;
                if (compteur >= 10) {
                    await attendreAsync(1);
                    compteur = 0;
                }
            }
        }
    }
    async supprimeInfoBullesEtSoulignements(msg) {
        let desPhrasesIDs = [];
        let doitArreter = false;
        let doitOptimiser = this.perisprit.getElementById("_corrdecteur").childNodes.length > 450;
        if (msg !== undefined) {
            desPhrasesIDs = msg.phrasesIds !== undefined ? msg.phrasesIds : [];
        }
        window.addEventListener("arrete_suppression_soulignements", function arreteSuppression() {
            doitArreter = true;
            window.removeEventListener("arrete_suppression_soulignements", arreteSuppression);
        });
        for (let id of desPhrasesIDs) {
            let noeudPhrase = this.perisprit.querySelector(`#p${id}`);
            if (noeudPhrase) {
                noeudPhrase.remove();
                if (doitOptimiser) await attendreAsync(0);
            }
            if (doitArreter) {
                break;
            }
        }
    }
    texteEstSousBouton() {
        let noeud = !estTextarea(this.zone) ? this.zone : this.perisprit.getElementById(`${this.id}_clone`);
        if (!noeud || noeud === undefined) return false;
        let walker = document.createTreeWalker(noeud, NodeFilter.SHOW_TEXT);
        const dernierEnfant = walker.lastChild();
        const box = this.cloneBoutonDW.getBoundingClientRect();
        if (dernierEnfant !== undefined && dernierEnfant && dernierEnfant.nodeType === Node.TEXT_NODE) {
            walker.currentNode = dernierEnfant;
            do {
                let range = document.createRange();
                if (walker.currentNode !== undefined && walker.currentNode && walker.currentNode.nodeType === Node.TEXT_NODE) {
                    const nodeRange = document.createRange();
                    nodeRange.selectNode(walker.currentNode);
                    const boxNode = nodeRange.getBoundingClientRect();
                    let rectNode = {
                        top: boxNode.top,
                        left: boxNode.left,
                        bottom: boxNode.bottom,
                        right: boxNode.right
                    }
                    if (this.iframeParent && noeud.ownerDocument !== this.cloneBoutonDW.ownerDocument) {
                        const boxIframe = this.iframeParent.getBoundingClientRect();
                        rectNode.bottom += boxIframe.top;
                        rectNode.right += boxIframe.left;
                        rectNode.top += boxIframe.top;
                        rectNode.left += boxIframe.left;
                    }
                    if (box.top < rectNode.bottom && box.bottom > rectNode.top && box.left < rectNode.right && box.right > rectNode.left) {
                        let pos = 0;
                        const liste = walker.currentNode.textContent.split(/\s/);
                        const listePos = liste.map((word, index) => {
                            pos = index && liste[index - 1].length + pos + 1;
                            return {
                                word,
                                pos
                            }
                        });
                        for (let i = listePos.length - 1; i >= 0; i--) {
                            range.setStart(walker.currentNode, listePos[i].pos);
                            range.setEnd(walker.currentNode, listePos[i].pos + listePos[i].word.length);
                            const boxRange = range.getBoundingClientRect();
                            let rect = {
                                bottom: boxRange.bottom,
                                right: boxRange.right,
                                top: boxRange.top,
                                left: boxRange.left
                            };
                            if (this.iframeParent && noeud.ownerDocument !== this.cloneBoutonDW.ownerDocument) {
                                const boxIframe = this.iframeParent.getBoundingClientRect();
                                rect.bottom += boxIframe.top;
                                rect.right += boxIframe.left;
                                rect.top += boxIframe.top;
                                rect.left += boxIframe.left;
                            }
                            if (box.top < rect.bottom && box.bottom > rect.top && box.left < rect.right && box.right > rect.left && /\S/.test(listePos[i].word)) {
                                return true;
                            }
                        }
                    }
                }
            } while (this.zone.contains(walker.previousNode()));
        }
        return false;
    }
    repositionnerBouton() {
        if (this.boutonDW !== undefined && this.boutonDW.dataset.deplace !== "1" && !!this.boutonDW.ownerDocument.defaultView) {
            if (!this.boutonDW.ownerDocument.getElementById("b" + this.id) && document.getElementById("b" + this.id + "_clone")) {
                document.getElementById("b" + this.id + "_clone").dataset.a_supprimer = "1";
                this.maFiole.metsNeutre();
                return;
            }
            const box = this.zone.getBoundingClientRect();
            let texteSousBouton = this.texteEstSousBouton(this.zone);
            let peutSeDeplacerVersLaDroite = box.right + 40 < this.boutonDW.ownerDocument.defaultView.innerWidth;
            let peutSeDeplacerVersLeBas = box.bottom + 32 < this.boutonDW.ownerDocument.defaultView.innerHeight;
            if (!this.boutonDW.classList.contains("exterieur") && texteSousBouton) {
                if (peutSeDeplacerVersLaDroite && peutSeDeplacerVersLeBas) {
                    this.boutonDW.classList.add("exterieur");
                    this.boutonDW.classList.add("diagonale");
                    this.boutonDW.style.top = parseFloat(this.boutonDW.style.top) + 32 + "px";
                    this.boutonDW.style.left = parseFloat(this.boutonDW.style.left) + 40 + "px";
                }
                if (peutSeDeplacerVersLaDroite && !peutSeDeplacerVersLeBas) {
                    this.boutonDW.classList.add("exterieur");
                    this.boutonDW.classList.add("droite");
                    this.boutonDW.style.left = parseFloat(this.boutonDW.style.left) + 40 + "px";
                }
                if (!peutSeDeplacerVersLaDroite && peutSeDeplacerVersLeBas) {
                    this.boutonDW.classList.add("exterieur");
                    this.boutonDW.classList.add("bas");
                    this.boutonDW.style.top = parseFloat(this.boutonDW.style.top) + 32 + "px";
                }
            }
            if (this.boutonDW.classList.contains("exterieur") && !texteSousBouton) {
                this.boutonDW.classList.remove("exterieur");
                if (this.boutonDW.classList.contains("diagonale")) {
                    this.boutonDW.classList.remove("diagonale");
                    this.boutonDW.style.top = parseFloat(this.boutonDW.style.top) - 32 + "px";
                    this.boutonDW.style.left = parseFloat(this.boutonDW.style.left) - 40 + "px";
                } else if (this.boutonDW.classList.contains("droite")) {
                    this.boutonDW.classList.remove("droite");
                    this.boutonDW.style.left = parseFloat(this.boutonDW.style.left) - 40 + "px";
                } else if (this.boutonDW.classList.contains("bas")) {
                    this.boutonDW.classList.remove("bas");
                    this.boutonDW.style.top = parseFloat(this.boutonDW.style.top) - 32 + "px";
                }
            }
        }
        clearTimeout(this.intervalleRepositionnementBouton);
        this.intervalleRepositionnementBouton = window.setTimeout(this.repositionnerBouton.bind(this), 500);
    }
    async donneCoordsZones(listeZones) {
        return new Promise(complet => {
            let resultat = {};
            let obs = new IntersectionObserver((e) => {
                for (let entry of e) {
                    let cle = listeZones.filter(e => e[0] == entry.target)[0][1];
                    if (!!cle) {
                        resultat[cle] = entry.boundingClientRect;
                    }
                }
                obs.disconnect();
                if (Object.keys(resultat).length == listeZones.filter(e => !!e[0]).length) {
                    complet(resultat);
                }
            });
            for (let z of listeZones) {
                if (z[0]) {
                    obs.observe(z[0]);
                }
            }
        });
    }
    async placerContenantBoutonDansBonElement() {
        if (this.zone.ownerDocument !== document && (this.zone === this.zone.ownerDocument.documentElement || this.zone === this.zone.ownerDocument.body)) {
            const iframeParent = this.zone.ownerDocument.defaultView.frameElement;
            insereNoeudAvant(this.contenantBoutonDW, iframeParent);
            const leParentFixe = donneParentFixe(iframeParent);
            const leParentSticky = donneParentSticky(iframeParent);
            const leParentScrollable = donneParentScrollable(iframeParent);
            let coords = await this.donneCoordsZones([
                [iframeParent, "iframe"],
                [this.contenantBoutonDW, "contenant"],
                [this.perisprit.host, "ancre"],
                [leParentScrollable, "scroll"]
            ]);
            const leParentLimite = leParentScrollable.contains(leParentFixe) || leParentScrollable.contains(leParentSticky) || coords["scroll"].height <= 200 ? leParentFixe.contains(leParentSticky) ? leParentSticky : leParentFixe : leParentScrollable;
            this.contenantBoutonDW.style.left = parseFloat(this.contenantBoutonDW.style.left) + coords["ancre"].left + coords["iframe"].left - coords["contenant"].left + "px";
            this.contenantBoutonDW.style.top = parseFloat(this.contenantBoutonDW.style.top) + coords["ancre"].top + coords["iframe"].top - coords["contenant"].top + "px";
            let dernierHidden = donneDernierOverflowHidden(this.contenantBoutonDW.parentNode, leParentLimite);
            if (dernierHidden) {
                if (estFacebook() && !!dernierHidden.parentElement) {
                    insereNoeudAvant(this.contenantBoutonDW, dernierHidden.parentElement);
                } else {
                    insereNoeudAvant(this.contenantBoutonDW, dernierHidden);
                }
            }
        } else {
            if (estScrollable(this.zone.parentNode)) {
                let elem = this.zone;
                while (estScrollable(this.zone.parentNode) && elem.clientWidth <= this.zone.clientWidth) {
                    elem = elem.parentNode;
                }
                insereNoeudAvant(this.contenantBoutonDW, elem);
            }
            let dernierHidden = null;
            const leParentFixe = donneParentFixe(this.zone);
            const leParentSticky = donneParentSticky(this.zone);
            let leParentScrollable = donneParentScrollable(this.zone);
            if (leParentScrollable == this.zone) {
                leParentScrollable = donneParentScrollable(this.zone.parentElement);
            }
            let coords = await this.donneCoordsZones([
                [this.zone, "zone"],
                [leParentScrollable, "scroll"]
            ]);
            let box = coords["zone"];
            let boxScroll = coords["scroll"];
            let doitSortirDuParentScrollable = false;
            if (!!leParentScrollable && !!leParentScrollable.parentElement && leParentScrollable !== this.zone.ownerDocument.body && leParentScrollable !== this.zone.ownerDocument.documentElement && (Math.abs(leParentScrollable.scrollHeight - this.zone.clientHeight) <= 100 || (!estScrollable(this.zone) && box.bottom > boxScroll.bottom && box.height > boxScroll.height) || this.zone === leParentScrollable)) {
                this.zonePositionnementDW = leParentScrollable;
                doitSortirDuParentScrollable = true;
            }
            const leParentLimite = leParentScrollable.contains(leParentFixe) || leParentScrollable.contains(leParentSticky) || boxScroll.height <= 200 ? leParentFixe.contains(leParentSticky) ? leParentSticky : leParentFixe : leParentScrollable;
            if (doitSortirDuParentScrollable && leParentLimite == leParentScrollable) {
                dernierHidden = donneDernierOverflowHidden(this.zone.parentNode, this.zone.ownerDocument.body);
            } else {
                dernierHidden = donneDernierOverflowHidden(this.zone.parentNode, leParentLimite);
            }
            const boxContenantAvant = this.contenantBoutonDW.getBoundingClientRect();
            if (dernierHidden) {
                if (estFacebook() && !!dernierHidden.parentElement) {
                    insereNoeudAvant(this.contenantBoutonDW, dernierHidden.parentElement);
                } else {
                    insereNoeudAvant(this.contenantBoutonDW, dernierHidden);
                }
                this.fioleDeplaceay = true;
            } else if (leParentLimite === document.documentElement || estFacebook()) {
                leParentLimite.appendChild(this.contenantBoutonDW);
                this.fioleDeplaceay = true;
            } else {
                if (doitSortirDuParentScrollable) {
                    let nouveauParentLimite = leParentFixe.contains(leParentSticky) ? leParentSticky : leParentFixe;
                    insereNoeudAvant(this.contenantBoutonDW, nouveauParentLimite.firstChild);
                    this.fioleDeplaceay = true;
                } else {
                    insereNoeudAvant(this.contenantBoutonDW, this.zone);
                    this.fioleDeplaceay = false;
                    this.zonePositionnementDW = null;
                }
            }
            let coordsApres = await this.donneCoordsZones([
                [this.contenantBoutonDW.nextElementSibling, "sibling"],
                [this.zonePositionnementDW, "zonePos"],
                [this.contenantBoutonDW, "contenant"]
            ]);
            const boxContenant = coordsApres["contenant"];
            if (this.fioleDeplaceay) {
                this.contenantBoutonDW.style.top = parseFloat(this.contenantBoutonDW.style.top) + boxContenantAvant.top - boxContenant.top + "px";
                this.contenantBoutonDW.style.left = parseFloat(this.contenantBoutonDW.style.left) + boxContenantAvant.left - boxContenant.left + "px";
            }
            if (this.zone.ownerDocument === this.contenantBoutonDW.ownerDocument && this.contenantBoutonDW.nextElementSibling && this.contenantBoutonDW.nextElementSibling !== undefined) {
                const boxSibling = coordsApres["sibling"];
                const boxZonePos = coordsApres["zonePos"];
                if (boxSibling.height < this.zone.scrollHeight && boxSibling.height !== 0 && boxSibling.bottom === this.contenantBoutonDW.ownerDocument.defaultView.innerHeight && !this.zonePositionnementDW) {
                    this.zonePositionnementDW = this.contenantBoutonDW.nextElementSibling;
                    this.contenantBoutonDW.style.top = parseFloat(this.contenantBoutonDW.style.top) + boxZonePos.top - boxContenant.top + "px";
                    this.contenantBoutonDW.style.left = parseFloat(this.contenantBoutonDW.style.left) + boxZonePos.left - boxContenant.left + "px";
                }
            }
        }
    }
    changerTailleBouton(taille) {
        if (taille === "petit") {
            this.maFiole.modifieTaille(26);
            this.grandeurBouton = 26;
        }
        if (taille === "grand") {
            this.maFiole.modifieTaille(37);
            this.grandeurBouton = 37;
        }
        this.boutonDWFiole.style.height = `${this.grandeurBouton}px`;
        this.boutonDWFiole.style.width = `${this.grandeurBouton}px`;
        this.cloneBoutonDW.style.height = `${this.grandeurBouton}px`;
        this.cloneBoutonDW.style.width = `${this.grandeurBouton}px`;
    }
    ajouteEcouteurBoutonDW() {
        this.sectionPoursuivre.addEventListener('click', function(d) {
            envoieVersLumiere({
                message: "ConnexionAWebDetecteurWeb",
                outil: "C0",
                idAppelant: this.id
            });
        }.bind(this));
        this.msgDWMessage.addEventListener('pointerover', function(ev) {
            clearTimeout(timeoutAfficgeMenuBulle);
        }, false);
        this.msgDWMessage.addEventListener('pointerleave', function(ev) {
            timeoutAfficgeMenuBulle = setTimeout(() => {
                this.afficheCacheMenuBulle({
                    commande: "hidden"
                })
            }, 400);
        }.bind(this), false);
        this.sectionFermer.addEventListener('click', function(d) {
            this.boutonDW.removeEventListener('pointerover', function() {});
            this.boutonDW.removeEventListener('pointeroleave', function() {});
            this.sectionFermer.removeEventListener('pointerover', function() {});
            this.sectionFermer.removeEventListener('click', function() {});
            this.boutonDW.remove();
            envoieVersLumiere({
                message: "ignoreZone",
                id: this.id
            });
        }.bind(this));
        this.sectionConnexion.addEventListener('click', function(d) {
            envoieVersLumiere({
                message: "ConnexionAWebDetecteurWeb",
                outil: "C0",
                idAppelant: this.id
            });
        }.bind(this));
    }
    afficheCacheMenuBulle(msg) {
        if (!this.msgDWMessage) return;
        let idAntidote = estAntidoteWeb(mesDonneesGlobales.idAntidote) ? cstIdAntidoteWeb : cstIdAntidoteBureau;
        if (msg.commande === undefined) {
            msg.commande = this.msgDWMessage.style.visibility == "visible" ? "hidden" : "visible";
        }
        if (msg.commande == "visible") {
            this.msgDWMessage.style.visibility = "visible";
            this.msgDWMessage.classList.remove("disparition");
            this.msgDWMessage.classList.add("apparition");
            this.msgDWMessage.style.opacity = 1;
        } else {
            this.msgDWMessage.classList.remove("apparition");
            this.msgDWMessage.classList.add("disparition");
            this.msgDWMessage.style.opacity = 0;
            this.msgDWMessage.style.visibility = "hidden";
        }
        if (infobulleEstVisible && this.msgDWMessage.style.opacity == 1) {
            fermerInfoBulle();
        }
        let desCoordsBulle = this.msgDWMessage.getBoundingClientRect();
        if (desCoordsBulle.right < desCoordsBulle.width) {
            this.msgDWMessage.style.left = -(desCoordsBulle.width + desCoordsBulle.left - parseInt(this.boutonDWFiole.style.width.split("px")[0]) - 10) + "px";
        } else {
            this.msgDWMessage.style.left = "";
            this.msgDWMessage.style.right = "0px";
        }
        if (this.estActivayCorrectionExpress) {
            this.menuPoursuivre.style.display = "block";
            this.menuConnexion.style.display = "none";
            this.afficheMessage(this.sectionPoursuivreTexte, gestionTraduction.Tr_(cstDWPoursuivreCorrection) + " " + cstNomIdAntidote[idAntidote]);
        } else {
            this.menuPoursuivre.style.display = "none";
            this.menuConnexion.style.display = "block";
            if (idAntidote == 1) {
                this.explicationConnexion.style.display = "none";
                this.explicationActivation.style.display = "block";
                this.afficheMessage(this.explicationActiverAntidote, " Antidote " + cstNomIdAntidote[idAntidote]);
            } else {
                this.explicationConnexion.style.display = "block";
                this.explicationActivation.style.display = "none";
            }
        }
    }
    async initialiseCanvas(msg) {
        let unPointAncrage = this.perisprit.getElementById("pancrage");
        if (unPointAncrage == null) {
            unPointAncrage = cree("div", {
                id: "pancrage",
                class: "point_ancre"
            });
            unPointAncrage.style.top = "0px";
            unPointAncrage.style.bottom = "0px";
            unPointAncrage.style.right = "0px";
            unPointAncrage.style.left = "0px";
            this.perisprit.appendChild(unPointAncrage);
            let canvas = document.createElement("div");
            canvas.id = "_vuedecteur";
            canvas.dataset.dw_type = 0;
            for (let s in msg.astyle) {
                canvas.style[s] = msg.astyle[s];
            }
            canvas.style.zIndex = "auto";
            if (this.zone && this.zone.tagName !== "BODY") {
                canvas.style.height = msg.coord.height + msg.coord.paddingBottom + msg.coord.paddingTop + 4 + "px";
            } else {
                canvas.style.height = msg.coord.height + msg.coord.paddingBottom + msg.coord.paddingTop + "px";
            }
            canvas.style.width = msg.coord.width + msg.coord.paddingLeft + msg.coord.paddingRight + "px";
            unPointAncrage.style.top = (-canvas.style.height) + "px";
            canvas.style.paddingTop = "0px";
            canvas.style.paddingBottom = "0px";
            canvas.style.paddingLeft = "0px";
            canvas.style.paddingRight = "0px";
            canvas.style.marginTop = "0px";
            canvas.style.marginBottom = "0px";
            canvas.style.marginLeft = "0px";
            canvas.style.marginRight = "0px";
            canvas.style.boxSizing = "content-box";
            canvas.className = "canvas";
            let _corrdecteur = cree("div", {
                id: "_corrdecteur"
            });
            _corrdecteur.style.top = "0px";
            _corrdecteur.style.position = "absolute";
            _corrdecteur.style.height = msg.coord.height + msg.coord.paddingBottom + msg.coord.paddingTop + "px";
            _corrdecteur.style.width = msg.coord.width + msg.coord.paddingLeft + msg.coord.paddingRight + "px";
            canvas.appendChild(_corrdecteur);
            unPointAncrage.appendChild(canvas);
            this.contenantBoutonDW.style.position = "absolute";
            this.element.style.setProperty("padding", "0px", "important");
            this.element.style.setProperty("margin", "0px", "important");
            insereNoeudAvant(this.contenantBoutonDW, this.element);
            this.maFiole.afficheElement("bouton_svg");
            if (msg.activay) {
                this.ajouteBoutonNeutre();
            } else {
                this.ajouteBoutonAvertissement(msg.id);
            }
            setTimeout(async function() {
                await this.placerContenantBoutonDansBonElement();
                this.positionAt.bind(this)();
                this.timeoutAffichageFiole = setTimeout(function() {
                    this.montreBouton();
                    this.affichageFioleFini = true;
                }.bind(this), 500);
                if (msg.estVisible) {
                    this.canvasInitialisay = true;
                } else {
                    this.boutonDW.classList.remove("apparition");
                    this.boutonDW.classList.add("disparition");
                    this.boutonDW.style.display = "none";
                }
                setTimeout(this.repositionnerBouton.bind(this), 1000);
            }.bind(this), 100);
        }
    }
    async reinitialiseCanvas(msg) {
        let unPointAncrage = this.perisprit.getElementById("pancrage");
        let canvas = this.perisprit.getElementById("_vuedecteur");
        if (unPointAncrage == null) {
            unPointAncrage = cree("div", {
                id: "pancrage",
                class: "point_ancre"
            });
            unPointAncrage.style.top = "0px";
            unPointAncrage.style.bottom = "0px";
            unPointAncrage.style.right = "0px";
            unPointAncrage.style.left = "0px";
            this.perisprit.appendChild(unPointAncrage);
            canvas = document.createElement("div");
            canvas.id = "_vuedecteur";
            canvas.dataset.dw_type = 0;
            canvas.className = "canvas";
            unPointAncrage.appendChild(canvas);
            this.contenantBoutonDW.style.position = "absolute";
            this.element.style.setProperty("padding", "0px", "important");
            this.element.style.setProperty("margin", "0px", "important");
            insereNoeudAvant(this.contenantBoutonDW, this.element);
            await this.placerContenantBoutonDansBonElement();
            for (let s in msg.astyle) {
                canvas.style[s] = msg.astyle[s];
            }
        }
        if (this.zone && this.zone.tagName !== "BODY") {
            canvas.style.height = msg.coord.height + msg.coord.paddingBottom + msg.coord.paddingTop + 4 + "px";
        } else {
            canvas.style.height = msg.coord.height + msg.coord.paddingBottom + msg.coord.paddingTop + "px";
        }
        canvas.style.width = msg.coord.width + msg.coord.paddingLeft + msg.coord.paddingRight + "px";
        canvas.style.paddingTop = "0px";
        canvas.style.paddingBottom = "0px";
        canvas.style.paddingLeft = "0px";
        canvas.style.paddingRight = "0px";
        canvas.style.marginTop = "0px";
        canvas.style.marginBottom = "0px";
        canvas.style.marginLeft = "0px";
        canvas.style.marginRight = "0px";
        canvas.style.display = "block";
        canvas.style.borderColor = "#000000";
        let _corrdecteur = this.perisprit.getElementById("_corrdecteur");
        _corrdecteur.style.top = "0px";
        _corrdecteur.style.position = "absolute";
        _corrdecteur.style.height = msg.coord.height + msg.coord.paddingBottom + msg.coord.paddingTop + "px";
        _corrdecteur.style.width = msg.coord.width + msg.coord.paddingLeft + msg.coord.paddingRight + "px";
        if (this.zone.clientHeight > 50 || this.zone.clientWidth < 150) {
            this.changerTailleBouton("grand")
        }
        if (this.zone.clientHeight < 50 || this.zone.clientWidth < 150) {
            this.changerTailleBouton("petit");
        }
        setTimeout(async function() {
            clearTimeout(this.timeoutAffichageFiole);
            if (!!this.boutonDW && this.boutonDW.dataset.deplace !== "1") {
                await this.placerContenantBoutonDansBonElement();
                this.positionAt.bind(this)();
            }
            if (!this.affichageFioleFini) {
                this.timeoutAffichageFiole = setTimeout(function() {
                    this.montreBouton();
                    this.affichageFioleFini = true;
                }.bind(this), 200);
            }
        }.bind(this), 50);
    }
    async traiteMessagePourBoutonDW(msg) {
        if (msg.message == "initialise_canvas") {
            await this.initialiseCanvas(msg);
        } else if (msg.message == "reinitialise_canvas") {
            await this.reinitialiseCanvas(msg);
        } else if (msg.message == "indiqueChamp") {
            let unElement = this.perisprit.getElementById("_vuedecteur");
            if (msg.etat)
                unElement.classList.add("semaphore_express");
            else
                unElement.classList.remove("semaphore_express");
        } else if (msg.message == "repositionne_bouton") {
            if (!!this.boutonDW && this.boutonDW.dataset.deplace !== "1") {
                await this.placerContenantBoutonDansBonElement();
                this.positionAt.bind(this)({
                    ratio: msg.ratio,
                    coord: msg.coord
                });
            }
            if (infobulleEstVisible) {
                fermerInfoBulle();
            }
        } else if (msg.message == "repositionne_bouton_sans_ratio") {
            if (!!this.boutonDW && this.boutonDW.dataset.deplace !== "1") {
                await this.placerContenantBoutonDansBonElement();
                this.positionAt.bind(this)();
            }
            if (infobulleEstVisible) {
                fermerInfoBulle();
            }
        } else if (msg.message == "montre_bouton") {
            this.montreBouton();
        } else if (msg.message == "supprime_soulignements_infobulles") {
            this.supprimeInfoBullesEtSoulignements(msg);
        } else if (msg.message == "texte_trop_long") {
            this.ajouteBoutonNeutre(gestionTraduction.Tr_(cstDWMessageTexteTropLong, ""));
        } else if (msg.message == "intervention") {
            this.metsAJourSoulignements(msg);
        } else if (msg.message == "intervention-maj") {
            this.metsAJourSoulignementsPourIdPhrase(msg);
        } else if (msg.message == "modifie-bouton") {
            this.modifieBoutonFiole(msg)
        } else if (msg.message == "cache_infobulle") {
            if (infobulleEstVisible) {
                fermerInfoBulle();
            }
        } else if (msg.message == "cache_bouton") {
            this.cacheBouton();
        } else if (msg.message == "cache_bouton_infobulle") {
            this.cacheBouton();
            this.supprimeInfoBullesEtSoulignements(msg);
        } else if (msg.message == "montre_cache_infobulle") {
            if (msg.estVisible !== false) this.montreBouton();
            this.afficheCacheMenuBulle({
                commande: "hidden"
            });
            if (msg.position !== undefined && msg._dib84) {
                let desErreurs = this.perisprit.querySelectorAll('druide-erreur');
                let aEteAffichee = false;
                let uneDetectionCliquee = {
                    _dib53: 99999,
                    idDetection: -1,
                    idPhrase: "",
                    position: null
                };
                for (let e of desErreurs) {
                    let idPhrase = e.id.split("sl-")[1];
                    let idDetection = idPhrase.split("_")[1];
                    idPhrase = idPhrase.split("_")[0]
                    for (let cf of e.childNodes) {
                        let box = cf.getBoundingClientRect();
                        if (box.top <= msg.position.y && msg.position.y <= box.bottom && box.left <= msg.position.x && msg.position.x <= box.right) {
                            let unePosition = this.positionInfobulleAt(cf, box);
                            let tempsOuvertureInfobulle = new Date().getTime();
                            let unIdDetecteurTemp = document.getElementById("infobulle_").shadowRoot.getElementById("info-bulle").getAttribute("iddetection");
                            let unIdPhraseTemp = document.getElementById("infobulle_").shadowRoot.getElementById("info-bulle").getAttribute("idphrase");
                            if (tempsOuvertureInfobulle - tempsFermetureInfobulle > 150 || unIdDetecteurTemp != idDetection || unIdPhraseTemp != idPhrase) {
                                const detection = DetecteurWeb.ccorrs[this.id].phrases[idPhrase].resultats.detections[DetecteurWeb.ccorrs[this.id].phrases[idPhrase].resultats.detectionsIdx[idDetection]];
                                let _dib53 = detection.intervalle.borneFin - detection.intervalle.borneDebut;
                                if (_dib53 < uneDetectionCliquee._dib53) {
                                    uneDetectionCliquee._dib53 = _dib53;
                                    uneDetectionCliquee.idDetection = idDetection;
                                    uneDetectionCliquee.idPhrase = idPhrase;
                                    uneDetectionCliquee.position = unePosition;
                                }
                            }
                            if (msg.origine == "dblclick" && !msg.jeInhibeDoubleclic && mesDonneesGlobales.infoDW.dweb_option.dblclic) {
                                if (msg._dib84[idPhrase].resultats.detections[msg._dib84[idPhrase].resultats.detectionsIdx[parseInt(idDetection)]].idCorrection !== undefined) {
                                    let uneCommande = msg._dib84[idPhrase].resultats.detections[msg._dib84[idPhrase].resultats.detectionsIdx[parseInt(idDetection)]].aEteCorrigee ? "retablirInfobulle" : "corrigerInfobulle";
                                    fonctionAction(null, uneCommande);
                                    await new Promise(recu => {
                                        let handler = (e) => {
                                            if (e.data.message == "infobulleEstMiseAJour" && e.data.idPhrase == idPhrase && e.data.idCorrection == msg._dib84[idPhrase].resultats.detectionsIdx[parseInt(idDetection)]) {
                                                recu();
                                                window.removeEventListener("message", handler);
                                            }
                                        }
                                        window.addEventListener("message", handler, false);
                                    });
                                }
                                await afficherInfobulle(unePosition, idDetection, this.id, idPhrase, this.zIndex);
                                aEteAffichee = true;
                            }
                        }
                    }
                }
                if (uneDetectionCliquee.idDetection != -1) {
                    gDonneesDecteteur = {
                        idBouton: this.id,
                        idPhrase: uneDetectionCliquee.idPhrase,
                        idDetection: parseInt(uneDetectionCliquee.idDetection),
                        _dib84: msg._dib84[uneDetectionCliquee.idPhrase]
                    };
                    await afficherInfobulle(uneDetectionCliquee.position, uneDetectionCliquee.idDetection, this.id, uneDetectionCliquee.idPhrase, this.zIndex);
                    aEteAffichee = true;
                }
                if (!aEteAffichee && infobulleEstVisible) {
                    fermerInfoBulle();
                }
            }
        } else if (msg.message == "mets_icone_analyse") {
            if (this.estActivayCorrectionExpress) {
                this.maFiole.metsAnalyse();
            }
        } else if (msg.message == "clone_texte") {
            let corrdecteur = this.perisprit.getElementById("_corrdecteur");
            corrdecteur.scrollTop = msg.scrollTop;
            this.metsAJourSoulignements(msg);
        } else if (msg.message == "defilement") {
            let corrdecteur = this.perisprit.getElementById("_corrdecteur");
            corrdecteur.style.top = -(msg.scrollTop) + "px";
        } else if (msg.message == "montre_bulle") {
            let unID = msg.id_erreur.split(".")[0] + "_bulle";
            if (this.perisprit.getElementById(unID).style.display == "none") {
                this.perisprit.getElementById(unID).style.display = "block";
            } else {
                this.perisprit.getElementById(unID).style.display = "none";
            }
        } else if (msg.message == "active_bouton") {
            this.maFiole.metsNeutre();
        } else if (msg.message == "active_bouton_expiray") {
            this.maFiole.cachePastille();
            this.maFiole.metsNeutre();
        } else if (msg.message == "desactive_bouton") {
            this.ajouteBoutonAvertissement(msg.id);
            this.supprimeInfoBullesEtSoulignements();
        } else if (msg.message == "mettre_a_jour_bouton") {
            this.estActivayCorrectionExpress = msg.activay;
            if (msg.activay) {
                this.ajouteBoutonNeutre();
            } else {
                this.ajouteBoutonAvertissement()
            }
        } else if (msg.message == "modifie_message") {
            let idAntidote = estAntidoteWeb(mesDonneesGlobales.idAntidote) ? cstIdAntidoteWeb : cstIdAntidoteBureau;
            if (this.monIDFioleActivay == "icone_fiole_alerte") {
                this.afficheMessage(this.sectionPoursuivreTexte, gestionTraduction.Tr_(cstDWAlerte) + " " + cstNomIdAntidote[idAntidote]);
            } else {
                this.afficheMessage(this.sectionPoursuivreTexte, gestionTraduction.Tr_(cstDWPoursuivreCorrection) + " " + cstNomIdAntidote[idAntidote]);
            }
        } else if (msg.message == "ouvreferme_menubulle") {
            this.afficheCacheMenuBulle(msg);
        }
    }
}
const kCouleurFondNeutreCercle = "#3B5280";
const kCouleurFondOK = "#039051";
const kCouleurFondInactif = "#A9A9A9";
const kCouleurTrait = "#FFF";
const kTracayFioleNeutre = "M17.5257537,7.25 L18.1199056,7.26127766 C18.4386802,7.27036202 18.7825791,7.28500729 19.1181945,7.30698024 L19.1181945,7.30698024 L19.5855954,7.34410016 C19.8023472,7.36494025 19.9931618,7.38936237 20.1557249,7.41809474\
 L20.1557249,7.41809474 L20.4190156,7.46914817 C20.94259,7.58375008 21.1673763,7.74147198 21.2101568,8.2779098 C21.216405,8.35625814 21.210299,8.43510169 21.1920622,8.51155379 L21.1920622,8.51155379 L20.3801544,11.9152119 L20.3725228,11.9573895\
  L20.349454,12.1607254 C20.3269765,12.4864825 20.371362,12.8390231 20.5169414,13.1604003 L20.5169414,13.1604003 L20.6769304,13.5029741 L20.9818578,14.2312999 L21.5089607,15.5510659 L22.7720764,18.8014688 L24.0501664,22.13927 L24.5657357,23.4956846\
   L24.6360925,23.6697977 C24.7286862,23.8980624 24.7802625,24.173817 24.7391407,24.4909334 C24.6637073,25.0726471 24.2777698,25.5617389 23.6067875,25.8636738 C22.2977147,26.4527546 20.5347333,26.7286086 17.4976639,26.7492746 C14.4708089,26.7286087\
	12.7078469,26.4527585 11.398744,25.8636761 C10.9755379,25.6732378 10.6618836,25.4088403 10.4679715,25.0789315 C10.211897,24.6432637 10.2021491,24.1883325 10.3319437,23.7776314 C10.3381962,23.7578471 10.3445742,23.7388387 10.3507173,23.721301\
	 L10.3507173,23.721301 L10.3899299,23.6219326 L10.3900887,23.6259146 L11.3076129,21.2160795 L12.5636039,17.9456901 L13.6654955,15.1238347 L14.1407401,13.9461611 L14.3657483,13.419164 L14.4885849,13.1604003 C14.6584276,12.7854602 14.6905341,\
	 12.3681033 14.6394206,12.0003472 L14.6394206,12.0003472 L14.6279042,11.927982 L13.8134642,8.51155379 L13.7944777,8.29041029 C13.8294104,7.73551539 14.1444371,7.56345472 14.6703062,7.4357246 C14.8870954,7.38306795 15.1610626,7.34495486 15.4931721,7.31615814\
	  C15.9791656,7.27401838 16.5552577,7.25445922 17.1409522,7.25 L17.1409522,7.25 L17.5257537,7.25 Z M15.0359131,15.7470258 L14.3805533,17.4089146 L13.0202518,20.9371577 L11.7966085,24.147282 L11.7539661,24.2431787 L11.7629673,24.2265861 L11.7537459,24.2666418\
	   C11.7509487,24.2888594 11.7537059,24.3062078 11.761133,24.3188438 C11.7886936,24.3657334 11.8613302,24.4269631 12.014279,24.4957884 C12.5802571,24.7504726 13.2789275,24.9392447 14.2191698,25.0643052 L14.2191698,25.0643052 L14.709926,25.1215363 C14.7952419,25.1301933\
		14.8823614,25.1384105 14.9713475,25.146189 L14.9713475,25.146189 L15.5281675,25.1876067 C15.8182813,25.2056941 16.1263287,25.2198567 16.454011,25.2301291 L16.454011,25.2301291 L17.1360595,25.2454968 L17.4976639,25.2493095 C17.7443207,25.2476255 17.9814177,25.2442276\
		 18.2094656,25.2391058 L18.2094656,25.2391058 L18.866973,25.2185584 C19.3931244,25.1971087 19.8659112,25.1648207 20.293314,25.1215353 L20.293314,25.1215353 L20.7849236,25.0643039 C21.7266171,24.939243 22.4252848,24.7504707 22.9912474,24.4957884 C23.2017507,24.4010641\
		  23.2454101,24.3457354 23.2515954,24.2980369 C23.255056,24.2713501 23.2447727,24.2301009 23.212832,24.1575515 L23.212832,24.1575515 L22.0059931,20.9912118 L21.0428288,18.4865116 L20.432867,16.9160954 L19.975,15.764 L19.5459823,15.8058971 C18.0699853,15.9277305\
		   16.5664379,15.9080232 15.0359131,15.7470258 Z M17.5191697,8.74996906 L17.1521127,8.74996906 C16.6026317,8.75414825 16.0612545,8.77252879 15.6227487,8.81055097 L15.6227487,8.81055097 L15.4307692,8.82929205 L16.0920227,11.6009073 L16.125139,11.7938509 C16.211942,12.4183886\
			16.1588603,13.1084035 15.8549361,13.7793384 L15.8549361,13.7793384 L15.7883189,13.917512 L15.6466051,14.2322869 L15.621,14.294 L15.7928612,14.310802 C17.0130704,14.4082764 18.2125869,14.4091247 19.3917667,14.3135025 L19.2900543,14.0735754 L19.1505902,13.7793384 C18.8466661,13.1084035\
			 18.7935844,12.4183886 18.8803873,11.7938509 L18.8803873,11.7938509 L18.9087422,11.6237693 L19.5687692,8.85029205 L19.3320304,8.82723863 L19.0201983,8.80377574 C18.7049156,8.78313398 18.3780412,8.76926954 18.0767233,8.76065411 L18.0767233,8.76065411 L17.5191697,8.74996906 Z";
const kTracayFioleOK = "M17.5229844,7.25070795 L18.1171363,7.26198561 C18.3296528,7.26804185 18.5533355,7.2765696 18.778286,7.28809236 L19.1154252,7.30768819 L19.5828261,7.3448081 C19.7273273,7.3587015 19.8603009,7.3741869 19.9810611,7.39148009 L20.1529556,7.41880269 L20.4162463,\
7.46985612 C20.9398208,7.58445803 21.1646071,7.74217992 21.2073876,8.27861775 C21.211553,8.33084997 21.2102277,8.3833023 21.2034779,8.4351194 L21.189293,8.51226174 L20.3773851,11.9159199 L20.3697536,11.9580975 L20.3466848,12.1614334 C20.3279535,12.4328976 20.3556549,12.7229615\
 20.4496564,12.998091 L20.5141722,13.1611083 L20.6741611,13.5036821 L20.9790886,14.2320079 L21.5061914,15.5517738 L21.9012308,16.5707079 L20.7592308,17.7657079 L20.4300977,16.9168033 L19.9722308,15.7647079 L19.543213,15.806605 C18.0672161,15.9284385 16.5636686,15.9087311 15.0331438,15.7477337\
  L14.3777841,17.4096226 L13.0174825,20.9378656 L11.7938392,24.14799 L11.7511969,24.2438867 L11.7601981,24.227294 L11.7509767,24.2673498 C11.7481795,24.2895674 11.7509367,24.3069157 11.7583638,24.3195517 C11.7859243,24.3664414 11.858561,24.427671 12.0115097,24.4964964 C12.5146014,24.7228823\
   13.1225363,24.8971896 13.9117842,25.0209636 L14.2164005,25.0650131 L14.7071568,25.1222442 L14.8364912,25.1349 L14.8364912,25.1349 L14.9685783,25.1468969 L15.5253983,25.1883147 C15.7188075,25.2003729 15.9201871,25.2106868 16.1300414,25.2192666 L16.4512417,25.230837 L17.1332903,25.2462048\
	L17.4948946,25.2500175 L17.8577738,25.2462048 L17.8577738,25.2462048 L18.2066964,25.2398138 L18.8642037,25.2192663 C19.2588173,25.2031791 19.6234133,25.1809952 19.9613584,25.1526478 L20.2905447,25.1222432 L20.7821544,25.0650119 C21.7238479,24.9399509 22.4225155,24.7511787 22.9884781,24.4964964\
	 C23.1989815,24.4017721 23.2426409,24.3464433 23.2488261,24.2987449 C23.2514216,24.2787298 23.2462861,24.2505233 23.2300811,24.2070642 L23.2100627,24.1582594 L22.5442308,22.4137079 L23.6922308,21.2127079 L24.0473971,22.1399779 L24.5629665,23.4963926 L24.6333233,23.6705057 C24.7259169,23.8987703\
	  24.7774933,24.174525 24.7363714,24.4916414 C24.6609381,25.0733551 24.2750005,25.5624468 23.6040183,25.8643817 C22.2949455,26.4534625 20.5319641,26.7293165 17.4948947,26.7499825 C14.4680397,26.7293166 12.7050776,26.4534664 11.3959748,25.864384 C10.9727687,25.6739458 10.6591144,25.4095483\
	   10.4652023,25.0796395 C10.2091277,24.6439717 10.1993798,24.1890404 10.3291745,23.7783394 L10.3386023,23.7493317 L10.3386023,23.7493317 L10.3479481,23.7220089 L10.3871607,23.6226406 L10.3873195,23.6266225 L11.3048437,21.2167874 L12.5608347,17.9463981 L13.6627263,15.1245426 L14.1379709,13.946869\
		L14.3629791,13.419872 L14.4858157,13.1611082 C14.6313951,12.8397311 14.6757806,12.4871905 14.6533031,12.1614334 L14.6366514,12.0010551 L14.625135,11.9286899 L13.8106949,8.51226174 L13.7917084,8.29111824 C13.8266412,7.73622333 14.1416679,7.56416267 14.667537,7.43643255 C14.8843262,7.3837759\
		 15.1582933,7.34566281 15.4904029,7.31686609 C15.8791976,7.28315428 16.3256556,7.26389405 16.7885625,7.25525532 L17.1381829,7.25070795 L17.5229844,7.25070795 Z M17.5164004,8.75067701 L17.1493435,8.75067701 C16.7097586,8.75402036 16.2753603,8.76645257 15.8946693,8.79075908 L15.6199795,8.81125891\
		  L15.428,8.83 L16.0892534,11.6016152 L16.1223698,11.7945589 C16.1995279,12.3497035 16.16616,12.9565832 15.9443367,13.5558107 L15.8521669,13.7800463 L15.7855497,13.91822 L15.6438359,14.2329948 L15.6182308,14.2947079 L15.790092,14.3115099 C17.0103012,14.4089844 18.2098176,14.4098326 19.3889975,\
		  14.3142105 L19.2872851,14.0742834 L19.147821,13.7800463 C18.8776662,13.1836598 18.8057079,12.5721976 18.8540169,12.0050472 L18.8776181,11.7945589 L18.9059729,11.6244772 L19.566,8.851 L19.3292612,8.82794658 L19.0174291,8.80448368 C18.8072406,8.79072251 18.5919003,8.77997349 18.382415,8.77178376\
		   L18.0739541,8.76136205 L17.5164004,8.75067701 Z";
const kTracayCrochet = "M24.6136296,15.9044715 C24.8996987,15.6049096 25.3744465,15.5939716 25.6740083,15.8800407 C25.9463373,16.1401035 25.9801342,16.5560991 25.7691005,16.8546507 L25.6984392,16.9404195 L19.9686892,22.9404195 C19.6907122,23.2315075 19.239034,23.2476008 18.9415931,22.994947 L18.8645433,\
						22.919383 L16.5635661,20.318345 C16.289115,20.0081039 16.3181286,19.5341174 16.6283696,19.2596663 C16.9104069,19.0101654 17.3277711,19.0114616 17.6075238,19.246848 L17.6870483,19.3244699 L19.447,21.313 L24.6136296,15.9044715 Z";
const kTracayFioleBarree = "M7.99720464,6.38341277 L8.07216712,6.45258466 L28.0167619,27.5052125 C28.3016351,27.8059119 28.2888053,28.2806123 27.9883033,28.5656829 C27.7124647,28.8266192 27.2906144,28.8375998 27.0027954,28.6060014 L26.9278329,28.5368295\
 L6.98323809,7.48420163 C6.69836493,7.18350219 6.71119467,6.70880179 7.01169668,6.4237312 C7.28753528,6.1627949 7.70938557,6.1518143 7.99720464,6.38341277 Z M13.2226787,16.2513704 L14.3606787,17.4523704 L13.0174825,20.9378656 L11.7938392,24.14799\
  L11.7511969,24.2438867 L11.7601981,24.227294 L11.7509767,24.2673498 C11.7481795,24.2895674 11.7509367,24.3069157 11.7583638,24.3195517 C11.7859243,24.3664414 11.858561,24.427671 12.0115097,24.4964964 C12.5146014,24.7228823 13.1225363,24.8971896\
   13.9117842,25.0209636 L14.2164005,25.0650131 L14.7071568,25.1222442 L14.8364912,25.1349 L14.8364912,25.1349 L14.9685783,25.1468969 L15.5253983,25.1883147 C15.7188075,25.2003729 15.9201871,25.2106868 16.1300414,25.2192666 L16.4512417,25.230837\
	L17.1332903,25.2462048 L17.4948946,25.2500175 L17.8577738,25.2462048 L17.8577738,25.2462048 L18.2066964,25.2398138 L18.8642037,25.2192663 C19.2588173,25.2031791 19.6234133,25.1809952 19.9613584,25.1526478 L20.2905447,25.1222432 L20.7821544,25.0650119\
	 C21.02681,25.0325206 21.2550619,24.9957288 21.4688446,24.9545982 L22.6577979,26.2105347 C21.4508907,26.5632041 19.858849,26.7338968 17.4948947,26.7499825 C14.4680397,26.7293166 12.7050776,26.4534664 11.3959748,25.864384 C10.9727687,25.6739458\
	  10.6591144,25.4095483 10.4652023,25.0796395 C10.2091277,24.6439717 10.1993798,24.1890404 10.3291745,23.7783394 L10.3386023,23.7493317 L10.3386023,23.7493317 L10.3479481,23.7220089 L10.3871607,23.6226406 L10.3873195,23.6266225 L11.3048437,21.2167874\
	   L12.5608347,17.9463981 L13.2226787,16.2513704 Z M17.5229844,7.25070795 L18.1171363,7.26198561 C18.3296528,7.26804185 18.5533355,7.2765696 18.778286,7.28809236 L19.1154252,7.30768819 L19.5828261,7.3448081 C19.7273273,7.3587015 19.8603009,7.3741869\
		19.9810611,7.39148009 L20.1529556,7.41880269 L20.4162463,7.46985612 C20.9398208,7.58445803 21.1646071,7.74217992 21.2073876,8.27861775 C21.211553,8.33084997 21.2102277,8.3833023 21.2034779,8.4351194 L21.189293,8.51226174 L20.3773851,11.9159199\
		 L20.3697536,11.9580975 L20.3466848,12.1614334 C20.3279535,12.4328976 20.3556549,12.7229615 20.4496564,12.998091 L20.5141722,13.1611083 L20.6741611,13.5036821 L20.9790886,14.2320079 L21.5061914,15.5517738 L22.7693072,18.8021768 L23.4006787,20.4513704\
		  L20.6926787,17.5933704 L20.4300977,16.9168033 L19.9722308,15.7647079 L19.543213,15.806605 L19.0326787,15.8413704 L17.6520619,14.3852566 C18.2358891,14.384457 18.8148539,14.360769 19.3889975,14.3142105 L19.2872851,14.0742834 L19.147821,13.7800463\
		   C18.8776662,13.1836598 18.8057079,12.5721976 18.8540169,12.0050472 L18.8776181,11.7945589 L18.9059729,11.6244772 L19.566,8.851 L19.3292612,8.82794658 L19.0174291,8.80448368 C18.8072406,8.79072251 18.5919003,8.77997349 18.382415,8.77178376\
			L18.0739541,8.76136205 L17.5164004,8.75067701 L17.1493435,8.75067701 C16.7097586,8.75402036 16.2753603,8.76645257 15.8946693,8.79075908 L15.6199795,8.81125891 L15.428,8.83 L16.0892534,11.6016152 L16.1223698,11.7945589 C16.1660956,12.1091615\
			 16.1743256,12.4403791 16.1328767,12.7774032 L14.3896787,10.9403704 L13.8106949,8.51226174 L13.7917084,8.29111824 C13.8266412,7.73622333 14.1416679,7.56416267 14.667537,7.43643255 C14.8843262,7.3837759 15.1582933,7.34566281 15.4904029,7.31686609\
			  C15.8791976,7.28315428 16.3256556,7.26389405 16.7885625,7.25525532 L17.1381829,7.25070795 L17.5229844,7.25070795 Z";
const kCouleursPastille = {
    erreur: "#FF2400",
    alerte: "#FF9D00",
    alerte_perso: "#D420FF"
};
const kCouleursCercle = {
    neutre: kCouleurFondNeutreCercle,
    ok: kCouleurFondOK,
    inactif: kCouleurFondInactif
};
const kCouleursBulle = {
    bulle1: kCouleurTrait,
    bulle2: kCouleurTrait
};
class ObjetSVG {
    constructor(leDocument) {
        this.monDocument = leDocument;
        this.timeo = 0;
        this.pastilleAffichee = null;
        this.fioleAffichee = null;
    }
    creeFiole() {
        let unSVG = cree("svg", {
            id: "bouton_svg",
            width: "37",
            height: "37",
            viewBox: "0 0 37 37",
            xmlns: "http://www.w3.org/2000/svg"
        }, "SVG");
        let unGroupeParent = cree("g", {
            fill: "none",
            "fill-rule": "evenodd"
        }, "SVG");
        let unCercleParent = cree("circle", {
            id: "cercle_parent_svg",
            cx: "17.5",
            cy: "19.5",
            r: "17.5",
            fill: kCouleurFondNeutreCercle
        }, "SVG");
        let unGroupeFioleNeutre = cree("g", {
            id: "fiole_neutre_svg"
        }, "SVG");
        let unTracayFiole = cree("path", {
            fill: "#FFF",
            "fill-rule": "nonzero",
            d: kTracayFioleNeutre,
            class: "apparition",
            transform: "translate(0, 2)"
        }, "SVG");
        unGroupeFioleNeutre.appendChild(unTracayFiole);
        let unGroupeAnalyse = cree("g", {
            id: "analyse_svg",
            class: "disparition"
        }, "SVG");
        let uneBulle1 = cree("ellipse", {
            cx: "18.0",
            cy: "19.5",
            "fill-rule": "non-zero",
            fill: "#FFF",
            rx: "1.5",
            ry: "1.5"
        }, "SVG");
        let uneAnimationBulle1 = cree("animateTransform", {
            attributeName: "transform",
            attributeType: "XML",
            type: "rotate",
            from: "0 17.5 22.5",
            to: "360 17.5 22.5",
            dur: "1.3s",
            begin: "0.1s",
            repeatCount: "indefinite"
        }, "SVG");
        let uneBulle2 = cree("ellipse", {
            cx: "16.6",
            cy: "23.3",
            "fill-rule": "non-zero",
            fill: "#FFF",
            rx: "2.0",
            ry: "2.0"
        }, "SVG");
        let uneAnimationBulle2 = cree("animateTransform", {
            attributeName: "transform",
            attributeType: "XML",
            type: "rotate",
            from: "0 17.5 22.5",
            to: "360 17.5 22.5",
            dur: "1.3s",
            begin: "0.1s",
            repeatCount: "indefinite"
        }, "SVG");
        uneBulle1.appendChild(uneAnimationBulle1);
        uneBulle2.appendChild(uneAnimationBulle2);
        unGroupeAnalyse.appendChild(uneBulle1);
        unGroupeAnalyse.appendChild(uneBulle2);
        let unGroupeFioleInactive = cree("g", {
            id: "inactive_svg",
            class: "disparition",
            transform: "translate(0, 2)"
        }, "SVG");
        let unTracayFioleInactive = cree("path", {
            fill: kCouleurTrait,
            "fill-rule": "nonzero",
            d: kTracayFioleBarree
        }, "SVG");
        unGroupeFioleInactive.appendChild(unTracayFioleInactive);
        let unGroupeFioleOK = cree("g", {
            id: "fiole_ok_svg",
            class: "disparition",
            transform: "translate(0, 2)"
        }, "SVG");
        let unTracayFioleOK = cree("path", {
            fill: "#FFF",
            "fill-rule": "nonzero",
            d: kTracayFioleOK
        }, "SVG");
        let unTracayCrochet = cree("path", {
            fill: "#FFF",
            "fill-rule": "nonzero",
            d: kTracayCrochet
        }, "SVG");
        unGroupeFioleOK.appendChild(unTracayFioleOK);
        unGroupeFioleOK.appendChild(unTracayCrochet);
        let unGroupePastille = cree("g", {
            id: "groupe_pastille_svg",
            class: "groupe_pastille"
        }, "SVG");
        let uneOmbre = cree("circle", {
            cx: "29.1",
            cy: "7",
            r: "7",
            fill: "black",
            "fill-opacity": "1",
            class: "ombre"
        }, "SVG");
        let unePastille = cree("circle", {
            cx: "29.1",
            cy: "7",
            r: "7",
            id: "pastille_svg",
            "fill-rule": "evenodd",
            class: "pastille"
        }, "SVG");
        unGroupePastille.appendChild(uneOmbre);
        unGroupePastille.appendChild(unePastille);
        let uneDefinition = cree("defs", null, "SVG");
        let unFiltreOmbragePastille = cree("filter", {
            id: "ombrage_pastille",
            x: "-25.0%",
            y: "-17.9%",
            filterUnits: "objectBoundingBox",
            width: "150%",
            height: "150%"
        }, "SVG");
        let unElementFiltreA = cree("feOffset", {
            in: "SourceAlpha",
            dx: "0",
            dy: "1",
            result: "shadowOffsetOuter1"
        }, "SVG");
        let unElementFiltreB = cree("feGaussianBlur", {
            stdDeviation: "1",
            in: "shadowOffsetOuter1",
            result: "shadowBlurOuter1"
        }, "SVG");
        let unElementFiltreC = cree("feColorMatrix", {
            values: "0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.5 0",
            type: "matrix",
            in: "shadowBlurOuter1"
        }, "SVG");
        unFiltreOmbragePastille.appendChild(unElementFiltreA);
        unFiltreOmbragePastille.appendChild(unElementFiltreB);
        unFiltreOmbragePastille.appendChild(unElementFiltreC);
        uneDefinition.appendChild(unFiltreOmbragePastille);
        unGroupeParent.appendChild(uneDefinition);
        unGroupeParent.appendChild(unCercleParent);
        unGroupeParent.appendChild(unGroupeFioleNeutre);
        unGroupeParent.appendChild(unGroupeAnalyse);
        unGroupeParent.appendChild(unGroupeFioleInactive);
        unGroupeParent.appendChild(unGroupeFioleOK);
        unGroupeParent.appendChild(unGroupePastille);
        unSVG.appendChild(unGroupeParent);
        return unSVG;
    }
    afficheElement(leID) {
        this.monDocument.getElementById(leID).classList.remove("disparition");
        this.monDocument.getElementById(leID).classList.add("apparition");
        this.monDocument.getElementById(leID).style.opacity = 1;
    }
    cacheElement(leID) {
        this.monDocument.getElementById(leID).classList.remove("apparition");
        this.monDocument.getElementById(leID).classList.add("disparition");
        this.monDocument.getElementById(leID).style.opacity = 0;
    }
    metsInactif() {
        clearTimeout(this.timeo);
        let ceci = this;
        this.afficheElement("inactive_svg");
        this.timeo = setTimeout(() => {
            ceci.monDocument.getElementById("cercle_parent_svg").style.fill = kCouleursCercle.inactif;
            ceci.cacheElement("fiole_neutre_svg");
            ceci.cacheElement("analyse_svg");
            ceci.cacheElement("fiole_ok_svg");
        }, 200)
        this.cachePastille();
        this.pastilleAffichee = null;
        this.fioleAffichee = "inactif";
    }
    metsNeutre() {
        clearTimeout(this.timeo);
        let ceci = this;
        this.afficheElement("fiole_neutre_svg");
        this.timeo = setTimeout(() => {
            ceci.monDocument.getElementById("cercle_parent_svg").style.fill = kCouleursCercle.neutre;
            ceci.cacheElement("inactive_svg");
            ceci.cacheElement("analyse_svg");
            ceci.cacheElement("fiole_ok_svg");
        }, 200);
        this.fioleAffichee = "neutre";
    }
    metsOK() {
        clearTimeout(this.timeo);
        let ceci = this;
        this.afficheElement("fiole_ok_svg");
        this.timeo = setTimeout(() => {
            ceci.monDocument.getElementById("cercle_parent_svg").style.fill = kCouleursCercle.ok;
            ceci.cacheElement("fiole_neutre_svg");
            ceci.cacheElement("inactive_svg");
            ceci.cacheElement("analyse_svg");
        }, 200)
        this.cachePastille();
        this.pastilleAffichee = null;
        this.fioleAffichee = "ok";
    }
    metsAnalyse() {
        clearTimeout(this.timeo);
        let ceci = this;
        this.afficheElement("fiole_neutre_svg");
        this.timeo = setTimeout(() => {
            ceci.monDocument.getElementById("cercle_parent_svg").style.fill = kCouleursCercle.neutre;
            ceci.cacheElement("fiole_ok_svg");
            ceci.cacheElement("inactive_svg");
        }, 200)
        this.afficheElement("analyse_svg");
        this.fioleAffichee = "analyse";
    }
    affichePastille(leType) {
        this.afficheElement("groupe_pastille_svg");
        this.monDocument.getElementById("pastille_svg").style.fill = kCouleursPastille[leType];
        this.pastilleAffichee = leType;
    }
    cachePastille() {
        this.cacheElement("groupe_pastille_svg");
        this.pastilleAffichee = null;
    }
    modifieTaille(laNouvelleTaille) {
        this.monDocument.getElementById("bouton_svg").style.height = laNouvelleTaille + "px";
        this.monDocument.getElementById("bouton_svg").style.width = laNouvelleTaille + "px";
    }
}