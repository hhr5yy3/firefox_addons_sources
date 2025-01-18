 /* 
 *	Ce document est la propriété intellectuelle de Druide informatique inc. Toute reproduction ou publication est interdite. 
 *  Copyright 2022 Druide informatique inc. 
 */
 class ClasseDetecteurWebWordpress extends ClasseDetecteurWeb {
    constructeurObjetDetecteur = ObjetDetecteurWordpress;
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
        let box = elem.getBoundingClientRect();
        let style = window.getComputedStyle(elem);
        let marginTop = style.marginTop !== undefined ? parseInt(style.marginTop) : 0;
        let marginBottom = style.marginBottom !== undefined ? parseInt(style.marginBottom) : 0;
        let marginLeft = style.marginLeft !== undefined ? parseInt(style.marginLeft) : 0;
        let marginRight = style.marginRight !== undefined ? parseInt(style.marginRight) : 0;
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
        return coordonnees;
    }
    mettreAJourElementParent() {
        let elements = donneElementParentWordpress();
        this.monDocument = elements.monDocument;
        this.elementParentEditeur = elements.elementParentEditeur;
    }
    init() {
        super.init();
        this.mettreAJourElementParent();
    }
    construireListePositionsNoeuds(zone, zoneID, sauvegarderDansObj) {
        let resultat = AgentTexteurWordpress.construireListePositionsNoeuds(zone, AgentTexteurWordpress.filtre, false);
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
    async installeDetecteurWeb(e) {
        if (!this.estActivayDW) return;
        if (this.taireMutations) return;
        this.mettreAJourElementParent();
        if (!this.elementParentEditeur) return;
        let element = document.activeElement;
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
        if (element == this.elementParentEditeur) return;
        if (element && estContenuEditable(element)) {
            element = this.elementParentEditeur;
        }
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
        if (element !== this.elementParentEditeur) {
            return false;
        }
        return true;
    }
    recupereRangeTexteDeElementAvecId(leID, leElement, lesArguements) {
        this.recupereAgentSelonId(leID);
        if (dwAgentTexteur.monElementPourDW) {
            dwAgentTexteur.initialiseTexteur(true);
            dwAgentTexteur.jeUtiliseEnveloppeIntervalleTexte = false;
            let unRange = dwAgentTexteur.recupereRange(lesArguements, this.ccorrs[leID].monWalker);
            return unRange
        }
        return null;
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
                    if (AgentTexteurWordpress.conditionNoeudValide(m.target, "C0")) {
                        aAnalyser = true;
                    } else {
                        aAnalyser = false;
                    }
                }
            }
            if (m.type === "characterData") {
                aAnalyser = true;
                break;
            }
        }
        if (!aAnalyser) {
            let lePopover = document.querySelector(".components-popover");
            let lesMutationsStyle = mutations.filter(m => m.type == "attributes" && m.attributeName == "style" && !lePopover?.contains(m.target));
            aAnalyser = lesMutationsStyle.length > 0;
        }
        return aAnalyser;
    }
}