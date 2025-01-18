 /* 
 *	Ce document est la propriété intellectuelle de Druide informatique inc. Toute reproduction ou publication est interdite. 
 *  Copyright 2022 Druide informatique inc. 
 */
 function donneElementParentWordpress() {
    let divEditeur = document.querySelector(".editor-visual-editor");
    let contientIframe = divEditeur?.classList?.contains("is-iframed");
    if (contientIframe !== undefined && contientIframe) {
        let monDocument = document.querySelector("iframe[name='editor-canvas']")?.contentWindow?.document;
        let elementParentEditeur = monDocument?.body;
        return {
            monDocument,
            elementParentEditeur
        };
    } else {
        let monDocument = document;
        let elementParentEditeur = divEditeur;
        return {
            monDocument,
            elementParentEditeur
        };
    }
}

function creeAgentTexteurWordpress(estDW) {
    if (estDW != true) estDW = false;
    let unAgentTexteur = new AgentTexteurWordpress();
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
class AgentTexteurWordpress extends AgentTexteurStd {
    static filtre = {
        acceptNode: function(n) {
            return AgentTexteurWordpress.conditionNoeudValide(n, "C0") ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
        }
    };
    static conditionNoeudValide(n, monOutil) {
        return !document.querySelector(".components-popover")?.contains(n) && !estNoeudAEnlevaySelonSite(n, monOutil) && !estNoeudIgnoray(n.parentNode) && (estContenuEditable(n) || (estNoeudTexte(n) && estContenuEditable(n.parentElement)) || (!!n.id && n.id.startsWith("block") || (n?.parentElement?.id?.startsWith("block"))));
    }
    testId = uuidv4();
    constructeurZone = ZoneDeTexteWordpress;
    initialiseTexteur(estCorrecteur) {
        if (this.actualisationFenAweb) {
            this.actualisationFenAweb = false;
            return;
        }
        this.estCorrecteur = estCorrecteur;
        this.jeSuisInitialisay = false;
        this.maFenetre = window;
        this.monTitre = document.title;
        this.monDocument = document.querySelector("iframe[name='editor-canvas']")?.contentWindow?.document;
        if (this.monDocument == null || this.monDocument === undefined)
            this.monDocument = document;
        if (this.estDW) {
            this.monDocument = this.monElementPourDW.ownerDocument;
            this.videListeZonesDeTexte();
        }
        this.monRangeDeReference = document.createRange();
        let estEffectuee = this.initZonesAvecNoeudsEditables(estCorrecteur);
        if (!estEffectuee) {
            var nomZone = estThunderbird() ? "1" : "0";
            var uneZoneDeTexte = new ZoneDeTexteWordpress(this.monOutil, this);
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
}
class ZoneDeTexteWordpress extends ZoneDeTexteStd {
    trouveRacine() {
        var ret = false;
        let elements = donneElementParentWordpress();
        this.monDocument = elements.monDocument;
        this.elementParentEditeur = elements.elementParentEditeur;
        if (this.monAgentTexteur.estDW) {
            this.maRacine = this.elementParentEditeur;
        } else {
            if (!estContenuEditable(this.monDocument.activeElement) || this.monDocument.getSelection().isCollapsed) {
                this.maRacine = this.elementParentEditeur;
            } else {
                this.maRacine = this.monDocument.activeElement;
            }
        }
        ret = true;
        return ret;
    };
    parcoursNoeudPourSynchro(leNoeud) {
        let resultat = AgentTexteurWordpress.construireListePositionsNoeuds(leNoeud, AgentTexteurWordpress.filtre, false);
        let listeNoeuds = resultat.liste;
        let listeGras = [];
        let listeItalique = [];
        let listeExposant = [];
        let listeIndice = [];
        let listeBarray = [];
        for (let pos in listeNoeuds) {
            let n = listeNoeuds[pos].noeud;
            let unStyle = 0;
            estNoeudEnGras(n) && listeGras.push(n);
            estNoeudEnItalique(n) && listeItalique.push(n);
            estNoeudEnExposant(n) && listeExposant.push(n);
            estNoeudEnBarre(n) && listeBarray.push(n);
            estNoeudEnIndice(n) && listeIndice.push(n);
            if (listeGras.filter(e => e.contains(n)).length > 0)
                unStyle |= kBitStyleGras;
            if (listeItalique.filter(e => e.contains(n)).length > 0)
                unStyle |= kBitStyleItalique;
            if (listeExposant.filter(e => e.contains(n)).length > 0)
                unStyle |= kBitStyleExposant;
            if (listeIndice.filter(e => e.contains(n)).length > 0)
                unStyle |= kBitStyleIndice;
            if (listeBarray.filter(e => e.contains(n)).length > 0)
                unStyle |= kBitStyleBarre;
            if (unStyle !== 0) {
                this.maListeFormatageTexte.push(new referenceFormatageTexte(listeNoeuds[pos].posDebut, listeNoeuds[pos].posFin, unStyle));
            }
        }
        return resultat.leTexte;
    };
    async selectionneIntervalle(lesArguments) {
        let unRange = await super.selectionneIntervalle(lesArguments);
        if (estGoogleChrome() || estSafariWebex()) {
            unRange = await this.fonctionSelection(lesArguments);
        }
        return unRange;
    }
}