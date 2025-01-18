 /* 
 *	Ce document est la propriété intellectuelle de Druide informatique inc. Toute reproduction ou publication est interdite. 
 *  Copyright 2022 Druide informatique inc. 
 */
 var gAgentTexteurSdt = null;
let gBloqueSelection = false;
const cstTypeZoneDeTexte = {
    zoneDeTexteInconnue: 0,
    zoneEditeurTexteRiche: 1,
    zoneStdAPI: 2
};
var derniereRacineCorrection = null;

function estDansUnDivEditable(leNoeud) {
    let unParent = leNoeud.parentNode !== undefined ? leNoeud.parentNode : null;
    if (unParent == null) {
        return false;
    }
    if (unParent.lastChild !== leNoeud) {
        return false;
    }
    if (estDiv(unParent) && unParent.contentEditable !== undefined && unParent.contentEditable == "true") {
        return true;
    } else if (estDiv(unParent) && unParent.contentEditable !== undefined && unParent.contentEditable == "inherit") {
        return estDansUnDivEditable(unParent);
    } else {
        return false;
    }
}

function estNoeudBlanc(leNoeud) {
    var uneChaine = leNoeud.nodeValue;
    return estBlanc(uneChaine);
};

function estNoeudAEnlevay(leNoeud, lesInfos) {
    if (leNoeud == null)
        return true;
    if (leNoeud.classList !== undefined && (leNoeud.classList.contains('mce-resizehandler') || leNoeud.classList.contains('mce-resize-helper'))) {
        return true;
    }
    if (estThunderbird()) {
        return _estNoeudAEnlevay(leNoeud);
    }
    if (!!lesInfos.antiOups && !!lesInfos.laRacine) {
        return estNoeudAEnlevayAntiOupsNav(leNoeud, laRacine);
    }
    return (estScript(leNoeud));;
};

function estNoeudAEnlevayAntiOupsNav(leNoeud, laRacine) {
    if (estGmail()) {
        if (!!leNoeud.classList && (leNoeud.classList.contains("gmail_signature") || leNoeud.classList.contains("gmail_signature_prefix")) && (leNoeud !== laRacine.firstChild && leNoeud !== laRacine.firstChild.firstChild)) {
            return true;
        }
        if (mesDonneesGlobales.antiOups.texteRepris && estDiv(leNoeud) && leNoeud.classList.contains("gmail_quote")) {
            return true;
        }
    }
    return false;
}

function estNoeudAEnlevaySelonSite(leNoeud, leOutil) {
    const kListeSite = ["smartling.com"];
    let url = new URL(document.URL);
    let hostname = url.hostname;
    if (hostname.includes(kListeSite) && leOutil == "C0") {
        return !(leNoeud.isContentEditable === undefined ? leNoeud.parentNode.isContentEditable : leNoeud.isContentEditable);
    }
    return false;
}

function estNoeudIgnoray(leNoeud) {
    if (!leNoeud || leNoeud === undefined) return true;
    try {
        if (estTexteTypeNode(leNoeud) || estDocument(leNoeud)) {
            return false;
        }
        if (leNoeud.getAttribute("data-antidoteapi_jsconnect_ignore") != null) {
            return true;
        }
        return false;
    } catch (erreur) {
        console.error(erreur, leNoeud);
        return false;
    }
}

function estNoeudEnGras(leNoeud) {
    var rep = false;
    if (leNoeud == null)
        return false;
    try {
        if (estGras(leNoeud) || estStrong(leNoeud)) {
            rep = true;
        } else if (leNoeud.style != null) {
            rep = leNoeud.style.fontWeight == 700 || leNoeud.style.fontWeight.toLowerCase() === "bold";
            if (!rep) {
                var unStyle = donneStyleNoeud(leNoeud);
                rep = unStyle.fontWeight ? unStyle.fontWeight == 700 || unStyle.fontWeight.toLowerCase() === "bold" : false;
            }
        }
    } catch (erreur) {
        console.error("agentstd.estNoeudEnGras", erreur);
    }
    return rep;
};

function estNoeudEnItalique(leNoeud) {
    var rep = false;
    if (leNoeud == null)
        return false;
    try {
        if (estItalique(leNoeud)) {
            rep = true;
        } else if (leNoeud.style != null) {
            rep = leNoeud.style.fontStyle.toLowerCase() === "italic";
            if (!rep) {
                var unStyle = donneStyleNoeud(leNoeud);
                rep = unStyle.fontStyle ? unStyle.fontStyle === "italic" : false;
            }
        }
    } catch (erreur) {
        console.error("agentstd.estNoeudEnItalique", erreur);
    }
    return rep;
}

function estNoeudEnExposant(leNoeud) {
    var rep = false;
    if (leNoeud == null)
        return false;
    try {
        if (estExposant(leNoeud)) {
            rep = true;
        } else if (leNoeud.style != null) {}
    } catch (erreur) {
        console.error("agentstd.estNoeudEnExposant", erreur);
    }
    return rep;
};

function estNoeudEnIndice(leNoeud) {
    var rep = false;
    if (leNoeud == null)
        return false;
    try {
        if (estIndice(leNoeud)) {
            rep = true;
        } else if (leNoeud.style != null) {}
    } catch (erreur) {
        console.error("agentstd.estNoeudEnIndice", erreur);
    }
    return rep;
};

function estNoeudEnBarre(leNoeud) {
    var rep = false;
    if (leNoeud == null)
        return false;
    try {
        if (estBarre(leNoeud)) {
            rep = true;
        } else if (leNoeud.style != null) {
            rep = leNoeud.style.textDecorationLine.toLowerCase() === "line-through";
            if (!rep) {
                var unStyle = donneStyleNoeud(leNoeud);
                rep = unStyle.textDecorationLine ? unStyle.textDecorationLine === "line-through" : false;
            }
        }
    } catch (erreur) {
        console.error("agentstd.estNoeudEnBarre", erreur);
    }
    return rep;
}

function estNoeudTexte(leNoeud) {
    var rep = false;
    if (leNoeud == null)
        return false;
    try {
        rep = (estTexteTypeNode(leNoeud));
        if (!rep && (estTextarea(leNoeud) || estInput(leNoeud)))
            rep = true;
    } catch (erreur) {
        console.error("agentstd.estNoeudTexte", erreur);
    }
    return rep;
};
class AgentTexteurStd extends AgentTexteurGen {
    static filtre = {
        acceptNode: function(n) {
            return AgentTexteurStd.conditionNoeudValide(n, "C0") ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
        }
    };
    constructeurZone = ZoneDeTexteStd;
    static conditionNoeudValide(n, monOutil) {
        return !estNoeudAEnlevaySelonSite(n, monOutil) && !estNoeudIgnoray(n.parentNode) && (estContenuEditable(n.parentNode) || (!estContenuEditable(n.parentNode) && !estFigure(n.parentNode)));
    }
    constructor() {
        super();
        this.maRacine = null;
        this.monDocument;
        this.monRangeDeReference;
        this.jeSuisInitialisay = false;
        this.estCorrecteur;
        this.mesZonesDeTexte = [];
        this.maListeNoeudsEditables = [];
        this.maZoneSelectionnee = undefined;
        this.monType = "";
        this.maSorteCorrection = cstSorteCorrection.sorteCorrectionAucune;
        this.monSafariRangeSelection = null;
        this.monSafariRangeDebutSelection = null;
        this.monSafariNoeudDebutSelection = null;
        this.monSafariDecalageNoeudDebut = 0;
        this.monSafariRangeFinSelection = null;
        this.monSafariNoeudFinSelection = null;
        this.monSafariDecalageNoeudFin = 0;
        if (this.monTypeAT === undefined)
            this.monTypeAT = cstTypeAgentTexteur.AgentTexteurStd;
        gAgentTexteurSdt = this;
    }
    static donneTexteNoeud(leNoeud, enfantInclus, lesInfos) {
        if (leNoeud == null)
            return "";
        if (estThunderbird()) {
            return _donneTexteNoeud(leNoeud, enfantInclus);
        }
        var uneChaine = "";
        if (lesInfos === undefined) {
            lesInfos = {
                parentEstVisible: undefined,
                parentEstInput: undefined,
                parentEstTextarea: undefined,
                parentEstAEnlevay: undefined,
                styleParent: undefined,
                noeudEstValide: undefined
            };
        }
        if (lesInfos.parentEstVisible === undefined) lesInfos.parentEstVisible = estVisible(leNoeud.parentNode);
        if (lesInfos.parentEstInput === undefined) lesInfos.parentEstInput = estInput(leNoeud.parentNode);
        if (lesInfos.parentEstTextarea === undefined) lesInfos.parentEstTextarea = estTextarea(leNoeud.parentNode);
        if (lesInfos.parentEstAEnlevay === undefined) lesInfos.parentEstAEnlevay = estNoeudAEnlevay(leNoeud.parentNode, lesInfos);
        if (lesInfos.styleParent === undefined) lesInfos.styleParent = donneStyleNoeud(leNoeud.parentNode);
        lesInfos.noeudEstValide = this.conditionNoeudValide(leNoeud, lesInfos.monOutil);
        if (!lesInfos.noeudEstValide) {
            return uneChaine;
        }
        if (estNoeudTexte(leNoeud) && !lesInfos.parentEstAEnlevay) {
            if (lesInfos.parentEstVisible && estVisible(leNoeud.parentNode)) {
                if (estTextarea(leNoeud) || estInput(leNoeud)) {
                    uneChaine = leNoeud.value;
                } else if (!lesInfos.parentEstTextarea && !lesInfos.parentEstInput) {
                    uneChaine = leNoeud.nodeValue;
                }
                if (!estPre(leNoeud.parentNode) && estContenuEditable(leNoeud.parentNode)) {
                    if (lesInfos.styleParent.whiteSpace == "normal" || lesInfos.styleParent.whiteSpace == "nowrap") {
                        uneChaine = uneChaine.replace(/(\r\n|\n|\r)/gm, " ");
                    }
                    uneChaine = uneChaine.replace(/(\t)/gm, "\u001D");
                }
                if (!lesInfos.noeudEstValide) {
                    uneChaine = cstCarBidon.repeat(uneChaine.length);
                }
            }
        } else {
            if (estNoeudAEnlevay(leNoeud, lesInfos)) {
                uneChaine += cstRetourCharriotNouvelleLigne;
            } else {
                if (estP(leNoeud) || estEnteteDeListe(leNoeud) || estEntete(leNoeud) || (estDiv(leNoeud) && estGmail())) {
                    uneChaine = cstChaineParagraphe;
                } else if (estElementDeListe(leNoeud) || estDiv(leNoeud) || estElementTable(leNoeud)) {
                    uneChaine = cstChaineSautColonne;
                } else if (estBr(leNoeud)) {
                    if (estDansUnDivEditable(leNoeud)) {
                        uneChaine = "";
                    } else {
                        uneChaine = cstRetourCharriotNouvelleLigne;
                    }
                } else if (estImg(leNoeud)) {
                    uneChaine = cstCarBidon;
                }
            }
        }
        if (enfantInclus) {
            var lesFils = leNoeud.childNodes;
            if (lesFils != null) {
                var nb = lesFils.length;
                for (var index = 0; index < nb; index++) {
                    var unFils = lesFils.item(index);
                    if (unFils != null)
                        uneChaine += this.donneTexteNoeud(unFils, enfantInclus, lesInfos);
                }
            }
        }
        return uneChaine;
    };
    static construireListePositionsNoeuds(zone, filtre, estAntiOups) {
        if (estAntiOups === undefined) estAntiOups = false;
        if (filtre === undefined) filtre = AgentTexteurStd.filtre;
        let walker = document.createTreeWalker(zone, NodeFilter.SHOW_ALL, filtre);
        let liste = [];
        let positionDepuisDebut = 0;
        let leTexte = "";
        const parentEstVisible = estVisible(zone);
        const parentEstInput = estInput(zone);
        const parentEstTextarea = estTextarea(zone);
        const parentEstAEnlevay = estNoeudAEnlevay(zone, {
            laRacine: zone,
            monOutil: estAntiOups ? "C1" : "C0"
        });
        const styleParent = donneStyleNoeud(zone);
        let lesInfos = {
            parentEstVisible: parentEstVisible,
            parentEstInput: parentEstInput,
            parentEstTextarea: parentEstTextarea,
            parentEstAEnlevay: parentEstAEnlevay,
            styleParent: styleParent,
            monOutil: estAntiOups ? "C1" : "C0",
            laRacine: zone
        };
        let listeNoeudsAEnlevayAntiOups = [];
        do {
            let noeudCourant = walker.currentNode;
            if (estAntiOups) {
                if (estNoeudAEnlevay(noeudCourant, lesInfos)) {
                    listeNoeudsAEnlevayAntiOups.push(noeudCourant);
                }
            }
            let _dib30 = this.donneTexteNoeud(noeudCourant, false, lesInfos);
            if (noeudCourant.nodeType === Node.TEXT_NODE)
                if (estAntiOups) {
                    let leNoeudParentAEnlevay = listeNoeudsAEnlevayAntiOups.filter(e => e.contains(noeudCourant))[0];
                    if (leNoeudParentAEnlevay !== undefined) {
                        continue;
                    }
                }
            liste.push({
                noeud: noeudCourant,
                _dib30: _dib30,
                posDebut: positionDepuisDebut,
                posFin: positionDepuisDebut + _dib30.length
            });
            leTexte += _dib30;
            positionDepuisDebut += _dib30.length;
        } while (walker.nextNode())
        if (estTextarea(zone)) {
            return {
                liste: liste,
                longueurTexte: zone.value.length,
                leTexte: zone.value
            };
        }
        return {
            liste: liste,
            longueurTexte: positionDepuisDebut,
            leTexte: leTexte
        };
    }
    donneNoeud() {
        return this.maRacine;
    }
    docEstMort() {
        if (!this.jeSuisInitialisay)
            return true;
        if (this.maRacine != null) {
            if (this.maRacine.isConnected !== undefined) {
                return this.maRacine.isConnected == false;
            }
        }
        return false;
    }
    initPourCorrecteur() {
        this.initialiseTexteur(true);
    }
    initPourOutils() {
        this.initialiseTexteur(false);
    }
    rompsLienCorrecteur() {
        this.maRacine = null;
        this.videListeZonesDeTexte();
    }
    rompsLienTexteur() {}
    remplaceSelection(lesArguments) {
        if (this.maZoneSelectionnee !== undefined) {
            try {
                this.maZoneSelectionnee.remplaceSelection(lesArguments);
            } catch (erreur) {
                console.error("agentstd.remplaceSelection", erreur);
            }
        }
    }
    selectionneIntervalle(lesArguments) {
        var uneZone = this.trouveZoneDeTexte(lesArguments._dib99);
        if (uneZone !== undefined) {
            this.maZoneSelectionnee = uneZone;
            this.maZoneSelectionnee.selectionneIntervalle(lesArguments);
        }
    }
    peutCorriger(lesArguments) {
        this.erreur_log.zone.zone_id = traiteElementLog(lesArguments._dib99);
        var uneZone = this.trouveZoneDeTexte(lesArguments._dib99);
        if (uneZone !== undefined) {
            this.erreur_log.zone.trouvee = true;
            return uneZone.peutCorriger(lesArguments);
        }
        return false;
    }
    selectionneApresRemplace(lesArguments) {
        if (this.maZoneSelectionnee !== undefined) {
            this.maZoneSelectionnee.selectionneApresRemplace(lesArguments);
        }
    }
    donneLesZonesACorriger(lesArguments) {
        try {
            if (this.jeSUISAPI) {
                this.initZonesAvecNoeudsEditables(lesArguments.estCorrecteur);
            }
            var x = 0;
            while (x < this.mesZonesDeTexte.length) {
                this.mesZonesDeTexte[x].synchronisePositions();
                if (!this.mesZonesDeTexte[x].jeSuisInitialisay) {
                    this.mesZonesDeTexte.splice(x, 1);
                } else {
                    x++;
                }
            }
            this.jeSuisInitialisay = (this.mesZonesDeTexte.length > 0);
        } catch (erreur) {
            console.error("agentstd._pb36d", erreur);
        }
        return this.donneRepresentationDesZones();
    }
    async corrigeDansTexteur(lesArguments) {
        var uneZone = this.trouveZoneDeTexte(lesArguments._dib99);
        if (uneZone !== undefined) {
            let untTexteOriginal = await uneZone.corrigeDansTexteur(lesArguments);
            return untTexteOriginal;
        }
        return "";
    }
    reinitPositionDebut(laPosition) {
        for (var x = 0; x < this.mesZonesDeTexte.length; x++) {
            var uneZone = this.trouveZoneDeTexte(x);
            if (uneZone !== undefined) {
                uneZone.reinitPositionDebut(laPosition);
            }
        }
    }
    donnePositionDebut() {
        var uneZone = this.trouveZoneDeTexte(0);
        if (uneZone !== undefined) {
            return uneZone.donnePositionDebut();
        }
    }
    recupereRange(lesArguments, leWalker) {
        var uneZone = this.trouveZoneDeTexte(lesArguments._dib99);
        if (uneZone !== undefined) {
            return uneZone.recupereRange(lesArguments, leWalker);
        }
    }
    donneTextePourOutils(lesArguments) {
        if (this.maZoneSelectionnee !== undefined) {
            return this.maZoneSelectionnee.donneTextePourOutils(lesArguments);
        }
        return {};
    }
    trouveZoneDeTexte(leNomZone) {
        var uneValeur = undefined;
        var index = parseInt(leNomZone);
        index = estThunderbird() ? index - 1 : index;
        if (index < this.mesZonesDeTexte.length)
            uneValeur = this.mesZonesDeTexte[index];
        return uneValeur;
    }
    videListeZonesDeTexte() {
        for (var x = 0; x < this.mesZonesDeTexte.length; x++)
            this.mesZonesDeTexte[x] = null;
        this.mesZonesDeTexte = [];
    }
    videListeNoeudsEditables() {
        for (var x = 0; x < this.maListeNoeudsEditables.length; x++)
            this.maListeNoeudsEditables[x] = null;
        this.maListeNoeudsEditables = [];
    }
    donneDocumentDuNoeud(leNoeud) {
        if (leNoeud == null || leNoeud === undefined)
            return null;
        try {
            if (leNoeud.nodeType === leNoeud.DOCUMENT_NODE) {
                return leNoeud;
            }
            return this.donneDocumentDuNoeud(leNoeud.parentNode);
        } catch (erreur) {
            console.error("agentstd.donneDocumentDuNoeud", erreur);
        }
        return null;
    }
    ajouteZonesAvecListeNoeuds(laListe, leTypeDeZone, estListeDeReferences, estCorrecteur) {
        var auMoinsUneZoneAjoute = false;
        if (!this.jeSUISAPI) {
            let listeDeMauvaisEnfants = [];
            if (laListe.length > 1) {
                for (let i = 0; i < laListe.length; i++) {
                    if (!estTextarea(laListe[i]) && !estInput(laListe[i])) {
                        for (let j = 0; j < laListe.length; j++) {
                            if (laListe.includes(laListe[i]) && laListe[i] != laListe[j] && !listeDeMauvaisEnfants.includes(laListe[i])) {
                                listeDeMauvaisEnfants.push(laListe[i]);
                            }
                        }
                    } else {
                        listeDeMauvaisEnfants.push(laListe[i]);
                    }
                }
            }
            for (let e of listeDeMauvaisEnfants) {
                let idx = laListe.indexOf(e);
                laListe.splice(idx, 1);
            }
        }
        if (leTypeDeZone == cstTypeZoneDeTexte.zoneStdAPI || this.estDW)
            this.maSorteCorrection = cstSorteCorrection.sorteCorrigeTout;
        else
            this.maSorteCorrection = cstSorteCorrection.sorteCorrectionAucune;
        try {
            if (laListe.length > 0) {
                var selectionTrouvee = false;
                for (var x = 0; x < laListe.length; x++) {
                    var uneZoneDeTexte = new this.constructeurZone(this.monOutil, this);
                    uneZoneDeTexte.monTypeZone = leTypeDeZone;
                    var noeudDeZone = estListeDeReferences ? laListe[x].value : laListe[x];
                    var unDocument = this.donneDocumentDuNoeud(noeudDeZone);
                    if (unDocument == null)
                        unDocument = this.monDocument;
                    var unRangeDeReference = document.createRange();
                    uneZoneDeTexte.initialiseZone(this.mesZonesDeTexte.length.toString(), estCorrecteur, unDocument, unRangeDeReference, noeudDeZone);
                    if (x == 0 && this.maSorteCorrection != cstSorteCorrection.sorteCorrigeTout) {
                        if (uneZoneDeTexte.monRangeSelection != null) {
                            if (uneZoneDeTexte.monRangeSelection.toString().length == 0 && uneZoneDeTexte.monRangeSelection.startOffset == uneZoneDeTexte.monRangeSelection.endOffset) {
                                this.maSorteCorrection = cstSorteCorrection.sorteCorrigeApartirDe;
                            } else {
                                this.maSorteCorrection = cstSorteCorrection.sorteCorrigeSelection;
                            }
                        }
                    }
                    var decalage = new referenceObjet(null);
                    var selectionEstDsZone = uneZoneDeTexte.donneSiRangeEstInclusDsNoeud(uneZoneDeTexte.maRacine, uneZoneDeTexte.monRangeSelection, decalage);
                    decalage = null;
                    if (selectionEstDsZone) {
                        this.maZoneSelectionnee = uneZoneDeTexte;
                        selectionTrouvee = true;
                    }
                    var inclus = false;
                    if (this.maSorteCorrection == cstSorteCorrection.sorteCorrigeApartirDe) {
                        inclus = selectionTrouvee;
                    } else if (this.maSorteCorrection == cstSorteCorrection.sorteCorrigeSelection) {
                        inclus = selectionEstDsZone;
                    }
                    if (inclus || leTypeDeZone == cstTypeZoneDeTexte.zoneStdAPI || this.estDW) {
                        if (estVisible(uneZoneDeTexte.maRacine))
                            this.mesZonesDeTexte[this.mesZonesDeTexte.length] = uneZoneDeTexte;
                        auMoinsUneZoneAjoute = true;
                    }
                }
            }
        } catch (erreur) {
            console.error("agentstd.ajouteZonesAvecListeNoeuds", erreur);
        }
        var valideSorteCorrection = this.maSorteCorrection != cstSorteCorrection.sorteCorrectionAucune;
        return valideSorteCorrection && auMoinsUneZoneAjoute;
    }
    initZonesAvecElementsAPI(estCorrecteur) {
        this.maZoneSelectionnee = null;
        if (this.mesZonesDeTexte.length > 0 && estCorrecteur) {
            return this.mesZonesDeTexte[0].monTypeZone == cstTypeZoneDeTexte.zoneStdAPI;
        }
        if (this.mesElementsPourAPI.length == 0 && this.monElementPourAPI != null) {
            this.mesElementsPourAPI.push(new referenceObjet(this.monElementPourAPI));
        }
        var estInitialisee = this.ajouteZonesAvecListeNoeuds(this.mesElementsPourAPI, cstTypeZoneDeTexte.zoneStdAPI, true, estCorrecteur);
        if (this.maZoneSelectionnee == null) {
            this.maZoneSelectionnee = this.monElementPourAPI != null ? this.monElementPourAPI : this.mesElementsPourAPI[0];
        }
        return estInitialisee;
    }
    ajouteNoeudsEditablesDuDoc(leDocument) {
        var uneListeElement = leDocument.querySelectorAll('*[contenteditable="true"]');
        for (var x = 0; x < uneListeElement.length; x++) {
            if (estVisible(uneListeElement[x])) {
                this.maListeNoeudsEditables[this.maListeNoeudsEditables.length] = uneListeElement[x];
            }
        }
        try {
            var iframes = leDocument.getElementsByTagName(cstNomNoeudIframe);
            if (iframes != null) {
                for (var x = 0; x < iframes.length; x++) {
                    if (estElementAccessible(iframes[x])) {
                        this.ajouteNoeudsEditablesDuDoc(iframes[x].contentDocument);
                    }
                }
            }
        } catch (erreur) {
            console.error("agentstd.ajouteNoeudsEditablesDuDoc.1", erreur);
        }
        try {
            var frames = leDocument.getElementsByTagName(cstNomNoeudFrame);
            if (frames != null) {
                for (var x = 0; x < frames.length; x++) {
                    if (estElementAccessible(frames[x])) {
                        this.ajouteNoeudsEditablesDuDoc(frames[x].contentDocument);
                    }
                }
            }
        } catch (erreur) {
            console.error("agentstd.ajouteNoeudsEditablesDuDoc.2", erreur);
        }
    }
    initZonesAvecNoeudsEditables(estCorrecteur) {
        if (!estCorrecteur)
            return false;
        if (this.mesZonesDeTexte.length > 0 && !this.jeSUISAPI) {
            return this.mesZonesDeTexte[0].monTypeZone == cstTypeZoneDeTexte.zoneEditeurTexteRiche;
        }
        this.videListeNoeudsEditables();
        this.ajouteNoeudsEditablesDuDoc(document);
        if (this.jeSUISAPI) {
            this.videListeZonesDeTexte();
            return this.ajouteZonesAvecListeNoeuds(this.mesElementsPourAPI, cstTypeZoneDeTexte.zoneStdAPI, true, estCorrecteur);
        }
        if (this.estDW) {
            this.videListeZonesDeTexte();
            return this.ajouteZonesAvecListeNoeuds([this.monElementPourDW], cstTypeZoneDeTexte.zoneStdAPI, false, estCorrecteur);
        }
        return this.ajouteZonesAvecListeNoeuds(this.maListeNoeudsEditables, cstTypeZoneDeTexte.zoneEditeurTexteRiche, false, estCorrecteur);
    }
    initialiseTexteur(estCorrecteur) {
        if (this.actualisationFenAweb) {
            this.actualisationFenAweb = false;
            return;
        }
        this.estCorrecteur = estCorrecteur;
        this.jeSuisInitialisay = false;
        this.maFenetre = window;
        this.monTitre = document.title;
        this.monDocument = trouveDocumentAvecSelection(document, true);
        if (this.monDocument == null)
            this.monDocument = document;
        if (this.estDW) {
            this.monDocument = this.monElementPourDW.ownerDocument;
            this.videListeZonesDeTexte();
        }
        this.monRangeDeReference = document.createRange();
        var estEffectuee = this.jeSUISAPI ? this.initZonesAvecElementsAPI(estCorrecteur) : false;
        if (!estEffectuee) {
            estEffectuee = this.initZonesAvecNoeudsEditables(estCorrecteur);
        }
        if (!estEffectuee) {
            var nomZone = estThunderbird() ? "1" : "0";
            var uneZoneDeTexte = new ZoneDeTexteStd(this.monOutil, this);
            uneZoneDeTexte.initialiseZone(nomZone, estCorrecteur, this.monDocument, this.monRangeDeReference);
            this.maZoneSelectionnee = null;
            this.maZoneSelectionnee = uneZoneDeTexte;
            if (estCorrecteur) {
                if (this.mesZonesDeTexte.length == 0)
                    this.mesZonesDeTexte[0] = uneZoneDeTexte;
            }
        }
        if (this.mesZonesDeTexte.length > 0) {
            this.maRacine = this.mesZonesDeTexte[0].maRacine;
        }
        this.jeSuisInitialisay = true;
    }
    donneRepresentationDesZones() {
        var desZonesJson = [];
        if (estThunderbird()) {
            var uneZoneJsonSujet = {
                _dib99: encodeChainePourJson("0"),
                _dib30: "",
                _dib31: 0,
                _dib32: 0,
                _dib97: []
            };
            desZonesJson.push(uneZoneJsonSujet);
        }
        for (var x = 0; x < this.mesZonesDeTexte.length; x++) {
            var zone = this.mesZonesDeTexte[x];
            var uneZoneJson = {
                _dib99: encodeChainePourJson(zone.monNom),
                _dib30: encodeChainePourJson(zone.monTexte),
                _dib31: this.jeSUISAPI ? 0 : zone.monDebutSelection,
                _dib32: this.jeSUISAPI ? 0 : zone.maFinSelection,
                d: zone.monDebutSelection,
                f: zone.maFinSelection,
                _dib97: zone.maListeFormatageTexte
            };
            desZonesJson.push(uneZoneJson);
        }
        return desZonesJson;
    }
};
class ZoneDeTexteStd {
    constructor(monOutil, agentTexteur) {
        this.monAgentTexteur = agentTexteur;
        this.monDocument;
        this.maRacine = null;
        this.monOutil = !!monOutil ? monOutil : "";
        this.jeSuisInitialisay = false;
        this.estCorrecteur;
        this.monNom = "";
        this.maLongeur;
        this.monRangeDeReference;
        this.maListeFormatageTexte = [];
        this.monTypeZone = cstTypeZoneDeTexte.zoneDeTexteInconnue;
        this.monDebutSelection;
        this.maFinSelection;
        this.monNoeudDebutSelection;
        this.monNoeudFinSelection;
        this.monDecalageNoeudDebut;
        this.monDecalageNoeudFin;
        this.monRangeSelection;
        this.monRangeDebutSelection;
        this.monRangeFinSelection;
        this.jeSuisEnGrasDsParcours;
        this.jeSuisEnItaliqueDsParcours;
        this.jeSuisEnExposantDsParcours;
        this.jeSuisEnIndiceDsParcours;
        this.jeSuisBarreDsParcours;
        this.utiliseExecCmd = false;
        this.posDepuisDebut = new referenceObjet(null);
        this.positionDW = 0;
    }
    videListeFormatageTexte() {
        for (var x = 0; x < this.maListeFormatageTexte.length; x++)
            this.maListeFormatageTexte[x] = null;
        this.maListeFormatageTexte = [];
    };
    donneSiRangeEstInclusDsNoeud(leNoeud, leRange, leDecalage) {
        if (leNoeud == null || leRange == null)
            return false;
        var estInclus = false;
        try {
            var unRangeNoeud = document.createRange();
            unRangeNoeud.setStartBefore(leNoeud);
            unRangeNoeud.setEndAfter(leNoeud);
            var compDebut = unRangeNoeud.compareBoundaryPoints(unRangeNoeud.START_TO_START, leRange);
            var compFin = unRangeNoeud.compareBoundaryPoints(unRangeNoeud.END_TO_END, leRange);
            unRangeNoeud = null;
            estInclus = (compDebut <= 0 && compFin >= 0);
            if (estInclus)
                leDecalage.value = leRange.endOffset;
        } catch (erreur) {
            console.error("agentstd.donneSiRangeEstInclusDsNoeud", erreur);
        }
        return estInclus;
    };
    donneSiNoeudEstInclusDsNoeud(leNoeudDeRef, leNoeudAVerifier) {
        if (leNoeudDeRef == null || leNoeudAVerifier == null)
            return false;
        var estInclus = false;
        try {
            var unRangeNoeud = document.createRange();
            unRangeNoeud.setStartBefore(leNoeudAVerifier);
            unRangeNoeud.setEndAfter(leNoeudAVerifier);
            var decalage = new referenceObjet(null);
            estInclus = this.donneSiRangeEstInclusDsNoeud(leNoeudDeRef, unRangeNoeud, decalage);
            decalage = null;
            unRangeNoeud = null;
        } catch (erreur) {
            console.error("agentstd.donneSiNoeudEstInclusDsNoeud", erreur);
        }
        return estInclus;
    };
    chercherNoeudPourIntervalle(d, f, liste) {
        liste = liste.filter(e => estNoeudTexte(e.noeud));
        let nombreIterations = 0;
        let indexDebut = 0;
        let indexFin = liste.length;
        let index, posDebut, posFin;
        let noeudDebut = null;
        let noeudFin = null;
        while (liste.length > 0) {
            if (nombreIterations > 100) {
                return null;
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
        let posFinDebut = 0;
        for (let i = index; i < liste.length; i++) {
            if (f <= liste[i].posFin && f >= liste[i].posDebut) {
                noeudFin = liste[i];
                posFinDebut = f - noeudFin.posDebut;
            }
            if (!!liste[i + 1] && f < liste[i + 1].posDebut && f > liste[i].posFin) {
                noeudFin = liste[i];
                posFinDebut = noeudFin.posFin - noeudFin.posDebut;
            }
        }
        return {
            noeudDebut: noeudDebut,
            decalageNoeudDebut: d - noeudDebut.posDebut,
            noeudFin: noeudFin,
            decalageNoeudFin: posFinDebut
        };
    }
    fonctionSelection(lesArguments) {
        let constructeurAgent = this.monAgentTexteur.constructor;
        return new Promise(function(resolution) {
            setTimeout(() => {
                this.monDebutSelection = lesArguments._dib49;
                this.maFinSelection = lesArguments._dib50;
                let unRange;
                gAgentTexteurSdt.reinitPositionDebut();
                let unWalker = document.createTreeWalker(this.maRacine, NodeFilter.SHOW_ALL);
                unWalker.parentNode();
                const listePositionsNoeuds = (lesArguments.estDW === undefined ? constructeurAgent.construireListePositionsNoeuds(this.maRacine, constructeurAgent.filtre, this.monOutil == "C1") : constructeurAgent.construireListePositionsNoeuds(DetecteurWeb.objetBoutonsZones[lesArguments.estDW].zone, constructeurAgent.filtre, false));
                const infosPourSelection = this.chercherNoeudPourIntervalle(lesArguments._dib49, lesArguments._dib50, listePositionsNoeuds.liste);
                if (infosPourSelection) {
                    if (estTextarea(infosPourSelection.noeudDebut.noeud.parentNode) || estInput(infosPourSelection.noeudDebut.noeud.parentNode) || estTextarea(infosPourSelection.noeudDebut.noeud) || estInput(infosPourSelection.noeudDebut.noeud)) {
                        let unAgentTexteurformulaire = new AgentTexteurFormulaire();
                        if (gAgentTexteurSdt.estDW) {
                            unAgentTexteurformulaire.jeSUISAPI = false;
                            unAgentTexteurformulaire.jeSuisLiayAPI = false;
                            unAgentTexteurformulaire.jAiPlusieursElementsAPI = false;
                            unAgentTexteurformulaire.monElementPourDW = gAgentTexteurSdt.monElementPourDW;
                        } else {
                            unAgentTexteurformulaire.jeSUISAPI = gAgentTexteurSdt.jeSUISAPI;
                            unAgentTexteurformulaire.jeSuisLiayAPI = gAgentTexteurSdt.jeSuisLiayAPI;
                            unAgentTexteurformulaire.monElementPourAPI = gAgentTexteurSdt.monElementPourAPI;
                            unAgentTexteurformulaire.mesElementsPourAPI = gAgentTexteurSdt.mesElementsPourAPI;
                            unAgentTexteurformulaire.jAiPlusieursElementsAPI = gAgentTexteurSdt.jAiPlusieursElementsAPI;
                        }
                        unAgentTexteurformulaire.estDW = gAgentTexteurSdt.estDW;
                        unAgentTexteurformulaire.jeUtiliseEnveloppeIntervalleTexte = gAgentTexteurSdt.jeUtiliseEnveloppeIntervalleTexte;
                        unAgentTexteurformulaire.initialiseTexteur(true);
                        unAgentTexteurformulaire.monElement = infosPourSelection.noeudDebut.noeud.parentNode;
                        if (estTextarea(infosPourSelection.noeudDebut.noeud) || estInput(infosPourSelection.noeudDebut.noeud)) {
                            unAgentTexteurformulaire.monElement = infosPourSelection.noeudDebut.noeud;
                        }
                        unAgentTexteurformulaire.selectionneIntervalle(lesArguments);
                    } else {
                        this.monNoeudDebutSelection = infosPourSelection.noeudDebut.noeud;
                        this.monNoeudFinSelection = infosPourSelection.noeudFin.noeud;
                        this.monDecalageNoeudDebut = infosPourSelection.decalageNoeudDebut;
                        this.monDecalageNoeudFin = infosPourSelection.decalageNoeudFin;
                        var rangeSelection = this.monRangeDeReference.cloneRange();
                        if (estNoeudTexte(this.monNoeudDebutSelection)) {
                            if (!estTextarea(this.monNoeudDebutSelection) && !estInput(this.monNoeudDebutSelection)) {
                                rangeSelection.setStart(this.monNoeudDebutSelection, this.monDecalageNoeudDebut);
                            }
                        } else if (this.monNoeudDebutSelection != null) {
                            rangeSelection.setStartAfter(this.monNoeudDebutSelection);
                        }
                        if (estNoeudTexte(this.monNoeudFinSelection)) {
                            if (!estTextarea(this.monNoeudFinSelection) && !estInput(this.monNoeudFinSelection)) {
                                rangeSelection.setEnd(this.monNoeudFinSelection, this.monDecalageNoeudFin);
                            }
                        } else if (this.monNoeudFinSelection != null) {
                            rangeSelection.setEndBefore(this.monNoeudFinSelection);
                        }
                        let selection = this.maRacine.ownerDocument.defaultView.getSelection();
                        for (let i = 0; i <= 10; i++) {
                            if (!!selection && !(selection.rangeCount == 1 && selection.getRangeAt(0) == rangeSelection)) {
                                selection.removeAllRanges()
                                selection.addRange(rangeSelection);
                                selection.setBaseAndExtent(rangeSelection.startContainer, rangeSelection.startOffset, rangeSelection.endContainer, rangeSelection.endOffset);
                            } else if (i > 0 && !!selection && selection.rangeCount == 1 && selection.getRangeAt(0) == rangeSelection) {
                                break;
                            }
                        }
                        if (lesArguments.estDW === undefined) {
                            let leParent = donneParentScrollable(this.monNoeudDebutSelection);
                            const styleAvant = donneStyleNoeud(leParent);
                            leParent.style.scrollBehavior = "smooth";
                            let scrolltop = leParent.scrollTop;
                            scrolltop += rangeSelection.getBoundingClientRect().top - leParent.clientHeight / 2;
                            if (leParent.clientHeight < leParent.ownerDocument.documentElement.clientHeight) scrolltop -= leParent.getBoundingClientRect().top;
                            leParent.scrollTop = scrolltop;
                            leParent.style.scrollBehavior = styleAvant.scrollBehavior;
                        }
                        unRange = rangeSelection;
                        unRange?.startContainer?.parentElement?.click();
                    }
                }
                let unCle = unRange?.startContainer.parentElement?.parentElement?.dataset?.offsetKey?.split("-")[0];
                document.dispatchEvent(new CustomEvent("metsAJourSelection", {
                    detail: unCle
                }));
                resolution(unRange);
            }, 0);
        }.bind(this));
    }
    async selectionneIntervalle(lesArguments) {
        if (gBloqueSelection && !lesArguments.estDW) {
            let attente = new Promise((resolution) => {
                document.addEventListener('correction-completay', ((e) => {
                    gBloqueSelection = false;
                    resolution(true);
                }), false);
            })
            await attente;
            document.removeEventListener('correction-completay', ((e) => {}), false);
        }
        let unRange = await this.fonctionSelection(lesArguments);
        return unRange;
    };
    async remplaceSelection(lesArguments, methode, infos) {
        try {
            if (methode === undefined) methode = "normal";
            if (infos === undefined) {
                if (!!this.monDocument && !!this.monDocument.getSelection()) {
                    this.monDocument.execCommand("insertText", false, lesArguments._dib37);
                } else {
                    if (estNoeudTexte(this.monNoeudFinSelection)) {
                        let unRangeTmp = this.monRangeDeReference.cloneRange();
                        unRangeTmp.setStart(this.monNoeudDebutSelection, this.monDecalageNoeudDebut);
                        unRangeTmp.setEnd(this.monNoeudFinSelection, this.monDecalageNoeudFin);
                        this.monNoeudFinSelection.insertData(this.monDecalageNoeudFin, lesArguments._dib37);
                        unRangeTmp.deleteContents();
                    } else if (estNoeudTexte(this.monNoeudDebutSelection)) {
                        let unRangeTmp = this.monRangeDeReference.cloneRange();
                        unRangeTmp.setStart(this.monNoeudDebutSelection, this.monDecalageNoeudDebut);
                        unRangeTmp.setEnd(this.monNoeudDebutSelection, this.monDecalageNoeudDebut + this.maSelection.toString().length);
                        unRangeTmp.deleteContents();
                        this.monNoeudDebutSelection.insertData(this.monDecalageNoeudDebut, lesArguments._dib37);
                    }
                }
                return;
            }
            const startContainer = infos.startContainer;
            const startOffset = infos.startOffset;
            const endContainer = infos.endContainer;
            const endOffset = infos.endOffset;
            const unTexte = infos.unTexte;
            const unRange = infos.unRange;
            let remplaceNormalement = false;
            let essaieEvents = false;
            const texteAvantRemplace = unRange.commonAncestorContainer.data;
            if (methode == "execCommand") {
                await attendreAsync(20);
                essaieEvents = !this.maRacine.ownerDocument.execCommand("insertText", false, lesArguments._dib37);
            }
            if (methode == "events" || essaieEvents) {
                await attendreAsync(20);
                const n = new DataTransfer();
                let i = null;
                if (lesArguments._dib37.length === 0) {
                    if (estCKEditor5(this.maRacine)) {
                        i = new InputEvent("beforeinput", {
                            inputType: "deleteContentBackward",
                            cancelable: true,
                            bubbles: true
                        });
                    } else {
                        i = new KeyboardEvent("keydown", {
                            key: "Delete",
                            keyCode: 46,
                            cancelable: true,
                            bubbles: true
                        });
                    }
                } else {
                    if (estMozillaWebExtension()) {
                        i = new ClipboardEvent("paste", {
                            dataType: "text/plain",
                            data: lesArguments._dib37,
                            bubbles: true,
                            cancelable: true
                        });
                    } else {
                        i = new ClipboardEvent("paste", {
                            clipboardData: n,
                            bubbles: true,
                            cancelable: true
                        });
                        if (i.clipboardData) {
                            i.clipboardData.setData("text/plain", lesArguments._dib37);
                        }
                    }
                }
                await this.maRacine.dispatchEvent(i);
                if (texteAvantRemplace === unRange.commonAncestorContainer.data) {
                    remplaceNormalement = true;
                }
            }
            if (methode == "normal") {
                remplaceNormalement = true;
            }
            if (remplaceNormalement) {
                if (startContainer === endContainer) {
                    startContainer.replaceData(startOffset, endOffset - startOffset, unTexte);
                } else {
                    unRange.deleteContents();
                    startContainer.insertData(startOffset, unTexte);
                }
            }
        } catch (erreur) {
            console.error("agentstd.remplaceSelection", erreur);
        }
        document.dispatchEvent(new CustomEvent('correction-completay', {}));
    };
    peutCorriger(lesArguments) {
        var ret = false;
        var unNoeudDebut = new referenceObjet(null);
        var unNoeudFin = new referenceObjet(null);
        var unDecalageNoeudDebut = new referenceObjet(null);
        var unDecalageNoeudFin = new referenceObjet(null);
        var posDepuisDebut = new referenceObjet(null);
        var unTexte = new referenceObjet("");
        var finSelectionIncluse = new referenceObjet(false);
        var unePos = new referenceObjet(null);
        var unTexteZone = this.parcoursNoeudPourSynchro(this.maRacine, unePos, finSelectionIncluse);
        var chaineAComparer = lesArguments._dib92 !== undefined ? lesArguments._dib92 : lesArguments._dib37;
        gAgentTexteurSdt.erreur_log.infos_recues.chaine_a_comparer = traiteElementLog(chaineAComparer);
        gAgentTexteurSdt.erreur_log.infos_recues.origine = lesArguments._dib92 !== undefined ? "_dib92" : "_dib37";
        gAgentTexteurSdt.erreur_log.infos_recues.debut_contexte = traiteElementLog(lesArguments.debutContexte);
        gAgentTexteurSdt.erreur_log.infos_recues.fin_contexte = traiteElementLog(lesArguments.finContexte);
        gAgentTexteurSdt.erreur_log.infos_contexte.texte_zone = traiteElementLog(unTexteZone);
        if (gAgentTexteurSdt.jeUtiliseEnveloppeIntervalleTexte) {
            let debutDuContexte = lesArguments.debutContexte;
            let finDuContexte = lesArguments.finContexte;
            let contexteComparaison = chaineAComparer;
            gAgentTexteurSdt.monEnveloppeIntervalleZoneDeTexte.calculeIntervalleComparaison(this.monTexte, lesArguments._dib49, lesArguments._dib50, debutDuContexte, finDuContexte);
            var debutProposay = gAgentTexteurSdt.monEnveloppeIntervalleZoneDeTexte.debutContexte;
            var finProposay = gAgentTexteurSdt.monEnveloppeIntervalleZoneDeTexte.finContexte;
            if (debutProposay < debutDuContexte) debutProposay = debutDuContexte;
            if (finProposay > finDuContexte) finProposay = finDuContexte;
            chaineAComparer = contexteComparaison.substring(debutProposay - debutDuContexte, finProposay - debutDuContexte);
            lesArguments.debutContexte = debutProposay;
            lesArguments.finContexte = finProposay;
            gAgentTexteurSdt.erreur_log.infos_recues.chaine_a_comparer_enveloppe = traiteElementLog(chaineAComparer);
            gAgentTexteurSdt.erreur_log.infos_recues.debut_contexte_enveloppe = lesArguments.debutContexte;
            gAgentTexteurSdt.erreur_log.infos_recues.fin_contexte_enveloppe = lesArguments.finContexte;
        }
        if (this.maRacine == null) this.trouveRacine();
        var unTexteZoneComparer = unTexteZone.substring(lesArguments.debutContexte, lesArguments.finContexte);
        gAgentTexteurSdt.erreur_log.infos_calcules.texte_trouvay_essai_2 = traiteElementLog(unTexteZoneComparer);
        ret = (chaineAComparer == unTexteZoneComparer);
        unNoeudDebut = null;
        unNoeudFin = null;
        unDecalageNoeudDebut = null;
        unDecalageNoeudFin = null;
        posDepuisDebut = null;
        unTexte = null;
        return ret;
    };
    selectionneApresRemplace(lesArguments) {
        var uneRacine = this.maRacine;
        this.estCorrecteur = false;
        try {
            if (this.initialiseSelection(false)) {
                var unParent = new referenceObjet(null);
                if (this.trouvePremierParentCommun(this.monNoeudDebutSelection, this.monNoeudFinSelection, unParent)) {
                    this.maRacine = unParent.value;
                    var unePos = new referenceObjet(null);
                    var finSelectionIncluse = new referenceObjet(false);
                    var unTexte = this.parcoursNoeudPourSynchro(this.maRacine, unePos, finSelectionIncluse);
                    if (this.monDebutSelection + lesArguments._dib53 <= unePos.value) {
                        lesArguments._dib49 = this.monDebutSelection;
                        lesArguments._dib50 = this.monDebutSelection + lesArguments._dib53;
                        this.selectionneIntervalle(lesArguments);
                    }
                    unePos = null;
                    unParent = null;
                    finSelectionIncluse = null;
                }
            }
        } catch (erreur) {
            console.error("agentstd.selectionneApresRemplace", erreur);
        }
        this.maRacine = uneRacine;
        this.jeSuisInitialisay = true;
    };
    async corrigeDansTexteur(lesArguments) {
        let constructeurAgent = this.monAgentTexteur.constructor;
        let corrige = new Promise(async function(resolution) {
            if (gAgentTexteurSdt.jeUtiliseEnveloppeIntervalleTexte) {
                gAgentTexteurSdt.monEnveloppeIntervalleZoneDeTexte.ajusteCorrectionIntervalleVide(lesArguments._dib49, lesArguments._dib50, lesArguments._dib37, this.monTexte);
                lesArguments._dib49 = gAgentTexteurSdt.monEnveloppeIntervalleZoneDeTexte.debutContexte;
                lesArguments._dib50 = gAgentTexteurSdt.monEnveloppeIntervalleZoneDeTexte.finContexte;
                lesArguments._dib37 = gAgentTexteurSdt.monEnveloppeIntervalleZoneDeTexte._dib92;
            }
            let essaieCorrigeSansExecCmd = false;
            var monTexteOriginal = "";
            var unTexte = new referenceObjet("");
            gAgentTexteurSdt.reinitPositionDebut();
            let unWalker = document.createTreeWalker(this.maRacine, NodeFilter.SHOW_ALL);
            unWalker.parentNode();
            const listePositionsNoeuds = (lesArguments.estDW === undefined ? constructeurAgent.construireListePositionsNoeuds(this.maRacine, constructeurAgent.filtre, this.monOutil == "C1") : constructeurAgent.construireListePositionsNoeuds(DetecteurWeb.objetBoutonsZones[lesArguments.estDW].zone, constructeurAgent.filtre, false));
            const infosPourSelection = this.chercherNoeudPourIntervalle(lesArguments._dib49, lesArguments._dib50, listePositionsNoeuds.liste);
            if (estTextarea(infosPourSelection.noeudDebut.noeud.parentNode) || estInput(infosPourSelection.noeudDebut.noeud.parentNode) || estTextarea(infosPourSelection.noeudDebut.noeud) || estInput(infosPourSelection.noeudDebut.noeud)) {
                let unAgentTexteurformulaire = new AgentTexteurFormulaire();
                if (gAgentTexteurSdt.estDW) {
                    unAgentTexteurformulaire.jeSUISAPI = false;
                    unAgentTexteurformulaire.jeSuisLiayAPI = false;
                    unAgentTexteurformulaire.jAiPlusieursElementsAPI = false;
                    unAgentTexteurformulaire.monElementPourDW = gAgentTexteurSdt.monElementPourDW;
                } else {
                    unAgentTexteurformulaire.jeSUISAPI = gAgentTexteurSdt.jeSUISAPI;
                    unAgentTexteurformulaire.jeSuisLiayAPI = gAgentTexteurSdt.jeSuisLiayAPI;
                    unAgentTexteurformulaire.monElementPourAPI = gAgentTexteurSdt.monElementPourAPI;
                    unAgentTexteurformulaire.mesElementsPourAPI = gAgentTexteurSdt.mesElementsPourAPI;
                    unAgentTexteurformulaire.jAiPlusieursElementsAPI = gAgentTexteurSdt.jAiPlusieursElementsAPI;
                }
                unAgentTexteurformulaire.estDW = gAgentTexteurSdt.estDW;
                unAgentTexteurformulaire.jeUtiliseEnveloppeIntervalleTexte = gAgentTexteurSdt.jeUtiliseEnveloppeIntervalleTexte;
                unAgentTexteurformulaire.initialiseTexteur(true);
                unAgentTexteurformulaire.monElement = infosPourSelection.noeudDebut.noeud.parentNode;
                if (estTextarea(infosPourSelection.noeudDebut.noeud) || estInput(infosPourSelection.noeudDebut.noeud))
                    unAgentTexteurformulaire.monElement = infosPourSelection.noeudDebut.noeud;
                lesArguments._dib29 = unAgentTexteurformulaire.peutCorriger(lesArguments);
                if (lesArguments._dib29) {
                    resolution(unAgentTexteurformulaire.corrigeDansTexteur(lesArguments));
                }
            } else {
                if (estNoeudTexte(infosPourSelection.noeudDebut.noeud) && estNoeudTexte(infosPourSelection.noeudFin.noeud)) {
                    unTexte = lesArguments._dib37;
                    let unRange = await this.selectionneIntervalle(lesArguments);
                    let infosRange = {
                        startContainer: unRange.startContainer,
                        startOffset: unRange.startOffset,
                        endContainer: unRange.endContainer,
                        endOffset: unRange.endOffset,
                        unTexte: unTexte,
                        unRange: unRange
                    }
                    if (estCKEditor5(this.maRacine)) {
                        await this.remplaceSelection(lesArguments, "events", infosRange);
                    } else if (estTinyMCE(this.maRacine)) {
                        await this.remplaceSelection(lesArguments, "execCommand", infosRange);
                    } else if (estDraftJS(this.maRacine)) {
                        await this.remplaceSelection(lesArguments, "execCommand", infosRange);
                    } else if (estSafariWebex() && estGutenberg() && !lesArguments.estDW && !lesArguments._dib37.match(/^ +$/g)) {
                        await this.remplaceSelection(lesArguments, "events", infosRange);
                    } else if (estGmail()) {
                        await this.remplaceSelection(lesArguments, "normal", infosRange);
                    } else {
                        await this.remplaceSelection(lesArguments, "execCommand", infosRange);
                    }
                } else {
                    var unNoeudTexte = window.document.createTextNode(lesArguments._dib37.trimStart());
                    if (infosPourSelection.noeudDebut.noeud.firstChild !== undefined) {
                        infosPourSelection.noeudDebut.noeud.insertBefore(unNoeudTexte, infosPourSelection.noeudDebut.noeud.firstChild);
                    } else {
                        infosPourSelection.noeudDebut.noeud.appendChild(unNoeudTexte);
                    }
                }
            }
            unTexte = null;
            monTexteOriginal = this.monTexte.substring(lesArguments._dib49, lesArguments._dib50);
            this.maLongeur += lesArguments._dib37.length - (lesArguments._dib50 - lesArguments._dib49);
            this.monTexte = remplaceIntervalle(this.monTexte, lesArguments._dib49, lesArguments._dib50, lesArguments._dib37);
            window.postMessage({
                message: "sauvegarde",
                type: "TypeContentScriptPourAPIJSConnect"
            });
            window.postMessage({
                message: "sauvegarde",
                type: "TypeContentScriptAide"
            });
            resolution(monTexteOriginal);
        }.bind(this));
        let unTexteOriginal = await corrige;
        return unTexteOriginal;
    };
    reinitPositionDebut(laPosition) {
        this.posDepuisDebut.value = laPosition === undefined ? 0 : laPosition;
    }
    donnePositionDebut() {
        return this.posDepuisDebut.value;
    }
    recupereRange(lesArguments, leWalker) {
        let posDebutNoeud = lesArguments.noeudDebut.posDebut;
        const posDebutIntervalle = lesArguments._dib49;
        const posFinIntervalle = lesArguments._dib50;
        let unNoeudDebut = null;
        let unNoeudFin = null;
        let unDecalageNoeudDebut = null;
        let unDecalageNoeudFin = null;
        let unRange = null;
        const parentEstVisible = estVisible(leWalker.currentNode);
        const parentEstInput = estInput(leWalker.currentNode);
        const parentEstTextarea = estTextarea(leWalker.currentNode);
        const parentEstAEnlevay = estNoeudAEnlevay(leWalker.currentNode, {
            monOutil: "C0",
            laRacine: this.maRacine
        });
        const styleParent = donneStyleNoeud(leWalker.currentNode);
        leWalker.currentNode = lesArguments.noeudDebut.noeud;
        const lesInfos = {
            parentEstVisible: parentEstVisible,
            parentEstInput: parentEstInput,
            parentEstTextarea: parentEstTextarea,
            parentEstAEnlevay: parentEstAEnlevay,
            styleParent: styleParent,
            monOutil: this.monOutil,
            laRacine: this.maRacine
        };
        do {
            let texteNoeud = this.monAgentTexteur.constructor.donneTexteNoeud(leWalker.currentNode, false, lesInfos);
            let posFinNoeud = posDebutNoeud + texteNoeud.length;
            if (posDebutIntervalle >= posDebutNoeud && posDebutIntervalle <= posFinNoeud && estNoeudTexte(leWalker.currentNode)) {
                unDecalageNoeudDebut = posDebutIntervalle - posDebutNoeud;
                unNoeudDebut = leWalker.currentNode;
            }
            if (posFinNoeud >= posFinIntervalle && posDebutNoeud <= posFinIntervalle && estNoeudTexte(leWalker.currentNode)) {
                unDecalageNoeudFin = posFinIntervalle - posDebutNoeud;
                unNoeudFin = leWalker.currentNode;
                break;
            }
            posDebutNoeud += texteNoeud.length;
        } while (leWalker.nextNode());
        if (estNoeudTexte(unNoeudDebut) && estNoeudTexte(unNoeudFin)) {
            unRange = this.monRangeDeReference.cloneRange();
            unRange.setStart(unNoeudDebut, unDecalageNoeudDebut);
            unRange.setEnd(unNoeudFin, unDecalageNoeudFin);
        }
        unNoeudDebut = null;
        unNoeudFin = null;
        unDecalageNoeudDebut = null;
        unDecalageNoeudFin = null;
        return unRange;
    };
    donneTextePourOutils() {
        this.monDocument = this.monDocument.contentDocument === undefined ? this.monDocument : this.monDocument.contentDocument;
        var uneSelection = this.monDocument.getSelection();
        if (uneSelection != null) {
            var unRangeSelection = null;
            if (uneSelection.rangeCount > 0)
                unRangeSelection = uneSelection.getRangeAt(0);
        }
        var edit_arg = {
            _dib30: encodeChainePourJson(this.monContexteSelection !== undefined ? this.monContexteSelection : ""),
            _dib31: this.monDebutSelectionDsContexte !== undefined ? this.monDebutSelectionDsContexte : 0,
            _dib32: this.maFinSelectionDsContexte !== undefined ? this.maFinSelectionDsContexte : 0
        };
        return edit_arg;
    };
    synchronisePositions() {
        this.monDebutSelection = 0;
        this.maFinSelection = 0;
        this.maLongeur = 0;
        try {
            if (this.maRacine == null) {
                this.initialiseSelection(false);
                this.monTexte = this.donneSelection();
                this.maFinSelection = this.monTexte.length;
                this.maLongeur = this.monTexte.length;
            } else {
                if (this.monDocument) {
                    var unePos = new referenceObjet(null);
                    var finSelectionIncluse = new referenceObjet(false);
                    this.videListeFormatageTexte();
                    this.monTexte = this.parcoursNoeudPourSynchro(this.maRacine, unePos, finSelectionIncluse);
                    this.maLongeur = unePos.value;
                    unePos = null;
                    finSelectionIncluse = null;
                }
            }
        } catch (erreur) {
            console.error("agentstd.synchronisePositions", erreur);
            this.jeSuisInitialisay = false;
        }
    };
    parcoursNoeudPourSynchro(leNoeud, laPosDepuisDebut, finSelectionIncluse, leNoeudEstValide) {
        if ((leNoeud.id !== undefined && (leNoeud.id == "dialogue_druide" || leNoeud.id.indexOf("alertify-druide") >= 0)))
            return "";
        if (leNoeudEstValide === undefined) leNoeudEstValide = true;
        var finSelectionDsNoeud = 0;
        var sansSelection = false;
        var unDecalage = new referenceObjet(null);
        if (this.donneSiRangeEstInclusDsNoeud(leNoeud, this.monRangeDebutSelection, unDecalage))
            this.monDebutSelection = laPosDepuisDebut.value + unDecalage.value;
        if (this.donneSiRangeEstInclusDsNoeud(leNoeud, this.monRangeFinSelection, unDecalage)) {
            this.maFinSelection = laPosDepuisDebut.value + unDecalage.value;
            finSelectionIncluse.value = true;
            if (!estNoeudTexte(leNoeud))
                finSelectionDsNoeud = this.maFinSelection;
        }
        unDecalage = null;
        if (this.monDebutSelection == this.maFinSelection)
            sansSelection = true;
        var uneChaine = this.monAgentTexteur.constructor.donneTexteNoeud(leNoeud, false, {
            noeudEstValide: leNoeudEstValide,
            monOutil: this.monOutil,
            laRacine: this.maRacine
        });
        laPosDepuisDebut.value += uneChaine.length;
        var estNoeudGras = estNoeudEnGras(leNoeud);
        var estNoeudItalique = estNoeudEnItalique(leNoeud);
        var estNoeudExposant = estNoeudEnExposant(leNoeud);
        var estNoeudIndice = estNoeudEnIndice(leNoeud);
        var estNoeudBarre = estNoeudEnBarre(leNoeud);
        this.jeSuisEnGrasDsParcours = this.jeSuisEnItaliqueDsParcours = this.jeSuisEnExposantDsParcours = this.jeSuisEnIndiceDsParcours = this.jeSuisBarreDsParcours = false;
        if (estNoeudGras)
            this.jeSuisEnGrasDsParcours = true;
        if (estNoeudItalique)
            this.jeSuisEnItaliqueDsParcours = true;
        if (estNoeudExposant)
            this.jeSuisEnExposantDsParcours = true;
        if (estNoeudIndice)
            this.jeSuisEnIndiceDsParcours = true;
        if (estNoeudBarre)
            this.jeSuisBarreDsParcours = true;
        var finSelectionIncluseDsEnfant = new referenceObjet(false);
        if (!estNoeudAEnlevay(leNoeud, {
                laRacine: this.maRacine,
                monOutil: this.monOutil
            })) {
            var lesFils = leNoeud.childNodes;
            if (lesFils != null) {
                var nb = lesFils.length;
                for (var index = 0; index < nb; index++) {
                    var unFils = lesFils.item(index);
                    if (unFils != null) {
                        if ((estTextarea(unFils) || estInput(unFils)) && estNoeudTexte(unFils)) {
                            break;
                        }
                        var unStyle = 0;
                        if (this.jeSuisEnGrasDsParcours)
                            unStyle |= kBitStyleGras;
                        if (this.jeSuisEnItaliqueDsParcours)
                            unStyle |= kBitStyleItalique;
                        if (this.jeSuisEnExposantDsParcours)
                            unStyle |= kBitStyleExposant;
                        if (this.jeSuisEnIndiceDsParcours)
                            unStyle |= kBitStyleIndice;
                        if (this.jeSuisBarreDsParcours)
                            unStyle |= kBitStyleBarre;
                        var posAvant = laPosDepuisDebut.value;
                        let estNoeudValide = this.monAgentTexteur.constructor.conditionNoeudValide(leNoeud, this.monOutil);
                        if (!estNoeudValide) {
                            try {
                                let estUnePageAvecAPI = document.getElementsByTagName('html').item(0) ? document.getElementsByTagName('html').item(0).getAttribute("antidoteapi_jsconnect") : false;
                                if (estUnePageAvecAPI && !estNoeudIgnoray(unFils.parentNode)) {
                                    estNoeudValide = aAncetreAvecAttribut(unFils, "data-antidoteapi_jsconnect_groupe_id");;
                                }
                                if (estNoeudValide) {
                                    estNoeudValide = !aAncetreAvecAttribut(unFils, "contentEditable", "false");;
                                }
                            } catch (erreur) {
                                console.error("agentstd.parcoursNoeudPourSynchro", erreur);
                            }
                        }
                        if (!estNoeudValide) return "";
                        uneChaine += this.parcoursNoeudPourSynchro(unFils, laPosDepuisDebut, finSelectionIncluseDsEnfant, estNoeudValide);
                        if (unStyle > 0) {
                            var objFormatage = new referenceFormatageTexte(posAvant, laPosDepuisDebut.value, unStyle);
                            this.maListeFormatageTexte[this.maListeFormatageTexte.length] = objFormatage;
                        }
                    }
                }
            }
        }
        if (estNoeudGras)
            this.jeSuisEnGrasDsParcours = false;
        if (estNoeudItalique)
            this.jeSuisEnItaliqueDsParcours = false;
        if (estNoeudExposant)
            this.jeSuisEnExposantDsParcours = false;
        if (estNoeudIndice)
            this.jeSuisEnIndiceDsParcours = false;
        if (estNoeudBarre)
            this.jeSuisBarreDsParcours = false;
        if (finSelectionDsNoeud > 0 && !finSelectionIncluseDsEnfant.value && !sansSelection)
            this.maFinSelection = laPosDepuisDebut.value;
        finSelectionIncluseDsEnfant = null;
        return uneChaine;
    };
    trouveInfoPourIntervalleWalker(leDebutInt, laFinInt, leWalker, laPosDepuisDebut, leNoeudDebut, leDecalageDebut, leNoeudFin, leDecalageFin, leTexte, lesArguments) {
        if (leWalker == null)
            return false;
        let leNoeud = leWalker.currentNode;
        var trouve = false;
        var uneChaine = this.monAgentTexteur.constructor.donneTexteNoeud(leNoeud, false, {
            laRacine: this.maRacine,
            monOutil: this.monOutil
        });
        var longueurNoeud = uneChaine.length;
        var debutDsNoeud = 0;
        let estCaret = false;
        if (leNoeud.dataset !== undefined && leNoeud.dataset.mceCaret !== undefined) {
            estCaret = false;
        }
        if ((leDebutInt >= laPosDepuisDebut.value) && (leDebutInt <= laPosDepuisDebut.value + longueurNoeud)) {
            leNoeudDebut.value = leNoeud;
            if (estNoeudTexte(leNoeud)) {
                leDecalageDebut.value = leDebutInt - laPosDepuisDebut.value;
            } else {
                leDecalageDebut.value = longueurNoeud;
            }
            debutDsNoeud = leDecalageDebut.value;
        }
        if ((laFinInt >= laPosDepuisDebut.value) && (laFinInt <= laPosDepuisDebut.value + longueurNoeud)) {
            leNoeudFin.value = leNoeud;
            if (estNoeudTexte(leNoeud))
                leDecalageFin.value = laFinInt - laPosDepuisDebut.value;
            else
                leDecalageFin.value = 0;
            trouve = true;
        }
        if (laPosDepuisDebut.value + longueurNoeud > leDebutInt) {
            var finDsNoeud = Math.min(laFinInt - laPosDepuisDebut.value, uneChaine.length);
            leTexte.value += uneChaine.substring(debutDsNoeud, finDsNoeud);
        }
        if (!trouve)
            laPosDepuisDebut.value += !estCaret ? uneChaine.length : -2;
        if (!trouve && !estNoeudAEnlevay(leNoeud, {
                laRacine: this.maRacine,
                monOutil: this.monOutil
            })) {
            leNoeud = leWalker.nextNode();
            if (leNoeud != null) {
                if (this.trouveInfoPourIntervalleWalker(leDebutInt, laFinInt, leWalker, laPosDepuisDebut, leNoeudDebut, leDecalageDebut, leNoeudFin, leDecalageFin, leTexte, lesArguments))
                    return true;
            }
        }
        return trouve;
    };
    trouveInfoPourIntervalle(leDebutInt, laFinInt, leNoeud, laPosDepuisDebut, leNoeudDebut, leDecalageDebut, leNoeudFin, leDecalageFin, leTexte) {
        if (leNoeud == null)
            return false;
        var trouve = false;
        var uneChaine = this.monAgentTexteur.constructor.donneTexteNoeud(leNoeud, false, {
            monOutil: this.monOutil,
            laRacine: this.maRacine
        });
        var longueurNoeud = uneChaine.length;
        var debutDsNoeud = 0;
        let estCaret = false;
        if (leNoeud.dataset !== undefined && leNoeud.dataset.mceCaret !== undefined) {
            estCaret = false;
        }
        if ((leDebutInt >= laPosDepuisDebut.value) && (leDebutInt <= laPosDepuisDebut.value + longueurNoeud)) {
            leNoeudDebut.value = leNoeud;
            if (estNoeudTexte(leNoeud))
                leDecalageDebut.value = leDebutInt - laPosDepuisDebut.value;
            else
                leDecalageDebut.value = longueurNoeud;
            debutDsNoeud = leDecalageDebut.value;
        }
        if ((laFinInt >= laPosDepuisDebut.value) && (laFinInt <= laPosDepuisDebut.value + longueurNoeud)) {
            leNoeudFin.value = leNoeud;
            if (estNoeudTexte(leNoeud))
                leDecalageFin.value = laFinInt - laPosDepuisDebut.value;
            else
                leDecalageFin.value = 0;
            trouve = true;
        }
        if (laPosDepuisDebut.value + longueurNoeud > leDebutInt) {
            var finDsNoeud = Math.min(laFinInt - laPosDepuisDebut.value, uneChaine.length);
            leTexte.value += uneChaine.substring(debutDsNoeud, finDsNoeud);;
        }
        laPosDepuisDebut.value += !estCaret ? uneChaine.length : -2;
        if (!trouve && !estNoeudAEnlevay(leNoeud, {
                laRacine: this.maRacine,
                monOutil: this.monOutil
            })) {
            var lesFils = leNoeud.childNodes;
            if (lesFils != null) {
                var nb = lesFils.length;
                for (var index = 0; index < nb; index++) {
                    var unFils = lesFils.item(index);
                    if (unFils != null) {
                        if (this.trouveInfoPourIntervalle(leDebutInt, laFinInt, unFils, laPosDepuisDebut, leNoeudDebut, leDecalageDebut, leNoeudFin, leDecalageFin, leTexte))
                            return true;
                    }
                }
            }
        }
        return trouve;
    };
    trouvePremierParentCommun(unNoeud1, unNoeud2, unParent) {
        if (unNoeud1 == null || unNoeud2 == null)
            return false;
        var range = document.createRange();
        range.setStart(unNoeud1, 0);
        range.setEnd(unNoeud2, 0);
        var container;
        if (range) {
            container = range.commonAncestorContainer;
        }
        if (container) {
            unParent.value = container;
            return true;
        } else {
            return false;
        }
    };
    trouveRacine() {
        var ret = false;
        var unType = new referenceObjet(null);
        var unNoeud = trouveNoeudGoogleApps(unType);
        this.monType = unType.value;
        unType = null;
        if (unNoeud != null) {
            this.maRacine = unNoeud;
            return true;
        }
        var unParent = new referenceObjet(null);
        if (corrigeLesEditables()) {
            let unDocument = trouveDocumentAvecSelection(document, true);
            this.maRacine = unDocument ? unDocument.activeElement : document.activeElement;
            ret = true;
        } else {
            if (this.trouvePremierParentCommun(this.monNoeudDebutSelection, this.monNoeudFinSelection, unParent)) {
                this.maRacine = unParent.value;
                ret = true;
            }
        }
        unParent = null;
        return ret;
    };
    reInitialiseTexteur() {
        this.monDocument = null;
        this.monRangeDeReference = null;
    };
    reInitialiseSelection() {
        this.maSelection = null;
        this.monNoeudDebutSelection = null;
        this.monNoeudFinSelection = null;
        this.monRangeSelection = null;
        this.monRangeDebutSelection = null;
        this.monRangeFinSelection = null;
        this.monDecalageNoeudDebut = 0;
        this.monDecalageNoeudFin = 0;
        this.monContexteSelection = "";
        this.monDebutSelectionDsContexte = 0;
        this.maFinSelectionDsContexte = 0;
        this.maSelectionSujet = null;
    };
    initialiseSelectionDansSonContexte() {
        var unRange = this.monRangeDeReference.cloneRange();
        if (this.monNoeudDebutSelection != null && this.monNoeudFinSelection != null) {
            unRange.setStartBefore(this.monNoeudDebutSelection);
            unRange.setEndAfter(this.monNoeudFinSelection);
            this.monContexteSelection = unRange.toString();
            unRange.setEnd(this.monNoeudDebutSelection, this.monDecalageNoeudDebut);
            var uneChaine = unRange.toString();
            this.monDebutSelectionDsContexte = uneChaine.length;
            this.maFinSelectionDsContexte = Math.min(this.monDebutSelectionDsContexte + (this.maFinSelection - this.monDebutSelection), this.monContexteSelection.length);
        } else {
            this.monContexteSelection = "";
            this.monDebutSelectionDsContexte = 0;
            this.maFinSelectionDsContexte = 0;
        }
    };
    initialiseSelection(peutEtendreSelection) {
        this.reInitialiseSelection();
        if (this.monDocument == null)
            return;
        this.monDocument = this.monDocument.contentDocument === undefined ? this.monDocument : this.monDocument.contentDocument;
        this.maSelection = this.monDocument.getSelection();
        if (this.maSelection != null) {
            this.monRangeSelection = null;
            if (this.maSelection.rangeCount > 0)
                this.monRangeSelection = this.maSelection.getRangeAt(0);
            if (this.monRangeSelection != null) {
                this.monRangeDebutSelection = this.monRangeSelection.cloneRange();
                this.monRangeDebutSelection.collapse(true);
                this.monNoeudDebutSelection = this.monRangeSelection.startContainer;
                this.monDecalageNoeudDebut = this.monRangeDebutSelection.endOffset;
                this.monRangeFinSelection = this.monRangeSelection.cloneRange();
                this.monRangeFinSelection.collapse(false);
                this.monNoeudFinSelection = this.monRangeSelection.endContainer;
                this.monDecalageNoeudFin = this.monRangeFinSelection.endOffset;
                let granularitayDebut = "paragraphboundary";
                let granularitayFin = "documentboundary";
                if (!this.estCorrecteur) {
                    granularitayDebut = cstChaineWord;
                    granularitayFin = cstChaineWord;
                }
                if (this.monRangeSelection.toString().length == 0 && this.monRangeSelection.startOffset == this.monRangeSelection.endOffset && this.monOutil !== undefined && this.monOutil[0] != "G") {
                    var source = trouveDocumentAvecSelection(this.monDocument, true);
                    if (source != null) {
                        var range = null;
                        if (source.getSelection().rangeCount > 0)
                            range = source.getSelection().getRangeAt(0);
                        var selection = source.getSelection();
                        if (peutEtendreSelection && this.monTypeZone === cstTypeZoneDeTexte.zoneDeTexteInconnue) {
                            try {
                                selection.modify(cstChaineMove, cstChaineBackward, granularitayDebut);
                                selection.modify(cstChaineExtend, cstChaineForward, granularitayFin);
                                this.initialiseSelection(false);
                            } catch (erreur) {
                                console.error("agentstd.initialiseSelection.1", erreur);
                            }
                        }
                    }
                }
                var jeSuisBodyBody = estBody(this.monNoeudDebutSelection) && estBody(this.monNoeudFinSelection);
                if (!jeSuisBodyBody && this.donneSiNoeudEstInclusDsNoeud(this.monNoeudDebutSelection, this.monNoeudFinSelection) && this.donneSiNoeudEstInclusDsNoeud(this.monNoeudFinSelection, this.monNoeudDebutSelection)) {
                    this.monContexteSelection = this.monAgentTexteur.constructor.donneTexteNoeud(this.monNoeudDebutSelection, true, {
                        laRacine: this.maRacine,
                        monOutil: this.monOutil
                    });
                    this.monDebutSelectionDsContexte = this.monRangeDebutSelection.endOffset;
                    this.maFinSelectionDsContexte = this.monRangeFinSelection.endOffset;
                } else {
                    var unParent = new referenceObjet(null);
                    if (this.trouvePremierParentCommun(this.monNoeudDebutSelection, this.monNoeudFinSelection, unParent)) {
                        var unePos = new referenceObjet(null);
                        var finSelectionIncluse = new referenceObjet(false);
                        this.monContexteSelection = this.parcoursNoeudPourSynchro(unParent.value, unePos, finSelectionIncluse);
                        this.monDebutSelectionDsContexte = this.monDebutSelection;
                        this.maFinSelectionDsContexte = this.maFinSelection;
                        unePos = null;
                        finSelectionIncluse = null;
                    } else {
                        this.monContexteSelection = this.donneSelection();
                        this.monDebutSelectionDsContexte = 0;
                        this.maFinSelectionDsContexte = this.monContexteSelection.length;
                    }
                    unParent = null;
                }
            } else {
                if (gAgentTexteurSdt.monSafariRangeSelection != null && estSafariWebex()) {
                    try {
                        this.monRangeDebutSelection = gAgentTexteurSdt.monSafariRangeDebutSelection;
                        this.monNoeudDebutSelection = gAgentTexteurSdt.monSafariNoeudDebutSelection;
                        this.monDecalageNoeudDebut = gAgentTexteurSdt.monSafariDecalageNoeudDebut;
                        this.monRangeFinSelection = gAgentTexteurSdt.monSafariRangeFinSelection;
                        this.monNoeudFinSelection = gAgentTexteurSdt.monSafariNoeudFinSelection;
                        this.monDecalageNoeudFin = gAgentTexteurSdt.monSafariDecalageNoeudFin;
                        this.selectionneIntervalle({
                            _dib49: gAgentTexteurSdt.monSafariRangeSelection.startOffset,
                            _dib50: gAgentTexteurSdt.monSafariRangeSelection.endOffset
                        });
                        this.initialiseSelectionDansSonContexte();
                    } catch (erreur) {
                        console.error("agentstd.initialiseSelection.2", erreur);
                    }
                }
            }
        } else {
            if (gAgentTexteurSdt.monSafariRangeSelection != null && estSafariWebex()) {
                try {
                    this.monRangeDebutSelection = gAgentTexteurSdt.monSafariRangeDebutSelection;
                    this.monNoeudDebutSelection = gAgentTexteurSdt.monSafariNoeudDebutSelection;
                    this.monDecalageNoeudDebut = gAgentTexteurSdt.monSafariDecalageNoeudDebut;
                    this.monRangeFinSelection = gAgentTexteurSdt.monSafariRangeFinSelection;
                    this.monNoeudFinSelection = gAgentTexteurSdt.monSafariNoeudFinSelection;
                    this.monDecalageNoeudFin = gAgentTexteurSdt.monSafariDecalageNoeudFin;
                    this.selectionneIntervalle({
                        _dib49: gAgentTexteurSdt.monSafariRangeSelection.startOffset,
                        _dib50: gAgentTexteurSdt.monSafariRangeSelection.endOffset
                    });
                    this.initialiseSelectionDansSonContexte();
                } catch (erreur) {
                    console.error("agentstd.initialiseSelection.3", erreur);
                }
            } else {
                this.jeSuisInitialisay = false;
            }
        }
        return true;
    };
    initialiseZone(nomZone, estCorrecteur, leDocument, leRangeDeReference, laRacine) {
        this.monNom = nomZone;
        this.estCorrecteur = estCorrecteur;
        this.jeSuisInitialisay = false;
        this.reInitialiseTexteur();
        this.maFenetre = window;
        this.monDocument = leDocument;
        this.monTitre = document.title;
        this.monRangeDeReference = leRangeDeReference;
        try {
            this.initialiseSelection(true && !this.monAgentTexteur.estDW);
            if (estCorrecteur) {
                if (laRacine !== undefined) {
                    this.maRacine = laRacine;
                } else {
                    this.trouveRacine();
                }
                if (this.maRacine != null) {
                    this.monRangeDeReference.setStart(this.maRacine, 0);
                    this.monRangeDeReference.setEndAfter(this.maRacine);
                }
            }
            this.utiliseExecCmd = true;
            this.jeSuisInitialisay = true;
        } catch (erreur) {
            console.error("agentstd.initialiseZone", erreur);
        }
    };
    donneSelection() {
        if (this.maSelection == null)
            return "";
        return this.maSelection.toString();
    };
}