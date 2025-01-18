 /* 
 *	Ce document est la propriété intellectuelle de Druide informatique inc. Toute reproduction ou publication est interdite. 
 *  Copyright 2022 Druide informatique inc. 
 */
 class ObjetBulleGoogleDocs extends ObjetBoutonBulle {
    creerShadowRoot(parent) {
        parent.attachShadow({
            mode: "open"
        });
        const {
            shadowRoot
        } = parent;
        return shadowRoot;
    }
    async init() {
        await super.init();
        document.documentElement.appendChild(this.contenantBoutonBulle);
        let box = document.querySelector("#docs-editor").getBoundingClientRect();
        this.boutonBulle.style.position = "absolute";
        this.boutonBulle.style.left = box.width - 75 + "px";
        this.boutonBulle.style.top = box.height + box.top - 75 + "px";
        this.maFiole.afficheElement("bouton_svg");
        this.ajouteEcouteurBoutonBulleDW();
        window.dispatchEvent(new CustomEvent("initbullegdocsfinie"));
    }
    ajouteEcouteurBoutonBulleDW() {
        super.ajouteEcouteurBoutonBulleDW();
        let observeChangementTaille = function(e) {
            this.replacerBoutonBulle();
        }.bind(this);
        this.observeurChangementTaille = new ResizeObserver(observeChangementTaille);
        this.observeurChangementTaille.observe(document.querySelector("#docs-editor"));
    }
    replacerBoutonBulle() {
        if (!this.boutonBulle.ownerDocument) {
            this.observeurChangementTaille.disconnect();
            return;
        }
        let box = document.querySelector("#docs-editor").getBoundingClientRect();
        this.boutonBulle.style.left = box.width - 75 + "px";
        this.boutonBulle.style.top = box.height + box.top - 75 + "px";
    }
    metsAJourEtats() {
        for (let [id, dw] of Object.entries(DetecteurWeb.dictBouton)) {
            let page = DetecteurWeb.recuperePageSelonId(id);
            if (!!dw.maFiole && !!page.proprietes && !!page.proprietes.page) {
                this.ajouteEtat(id, {
                    fiole: dw.maFiole.fioleAffichee,
                    pastille: dw.maFiole.pastilleAffichee
                });
            }
        }
        let lesIdsExistants = Object.keys(DetecteurWeb.dictBouton);
        let lesIdsEtats = Object.keys(this.etat);
        let lesIdsASupprimer = lesIdsEtats.filter(e => !lesIdsExistants.includes(e));
        lesIdsASupprimer = lesIdsASupprimer.concat(Object.values(DetecteurWeb.objPages).filter(e => !e.page).map(e => e.id));
        lesIdsASupprimer = lesIdsASupprimer.concat(DetecteurWeb.listeOnglets.filter(o => !o.estActif).map(e => Object.values(e.objPages).map(e => e.id).flat(1)).flat(1));
        for (let id of lesIdsASupprimer) {
            this.supprimeEtat(id);
        }
        this.metsEtat();
    }
}
class ObjetDetecteurGoogleDocs extends ObjetDetecteur {
    constructor(leObjInitialisation) {
        super(leObjInitialisation);
    }
    positionInfobulleAt(noeudDetection, coordsNoeud) {
        let boxAnchor = donneCoordsAncre(noeudDetection, true);
        let unDWType = parseInt(noeudDetection.parentNode.dataset.dw_type);
        let top = boxAnchor.top;
        let position = {
            bottom: boxAnchor.bottom,
            height: boxAnchor.height,
            left: boxAnchor.left,
            right: boxAnchor.right,
            top: top,
            width: boxAnchor.width
        };
        return position;
    }
    corrigeEmplacement() {
        if (!!DetecteurWeb.objetBoutonsZones[this.id] && !!DetecteurWeb.objetBoutonsZones[this.id].zone && !!DetecteurWeb.objetBoutonsZones[this.id].zone.parentElement) {
            this.zone = DetecteurWeb.objetBoutonsZones[this.id].zone;
        }
        let box = this.zone.getBoundingClientRect();
        let boxElem = this.element.getBoundingClientRect();
        let styleElem = window.getComputedStyle(this.element);
        this.element.style.left = parseFloat(styleElem.left) + box.left - boxElem.left + "px";
        this.element.style.top = parseFloat(styleElem.top) + box.top - boxElem.top + "px";
        if (DetecteurWeb.enTrainDeChangerDOnglet || DetecteurWeb.mutationEnSuspension) {
            this.element.style.opacity = "0";
        } else {
            if (box.top > window.innerHeight || box.height == 0 || box.width == 0) this.element.style.opacity = "0";
            if (box.top <= window.innerHeight && box.height != 0 && box.width != 0) this.element.style.opacity = "1";
        }
        this.intervallePositionnement = window.setTimeout(this.corrigeEmplacement.bind(this), 300, this.elem, this.zone);
    }
    enleverElementCorrecteurDuDom() {
        if (this.element) this.element.remove();
    }
    remettreElementCorrecteurDansLeDom() {
        insereNoeudAvant(this.element, this.zone);
        this.element.style.top = this.zone.style.top;
        this.element.style.left = this.zone.style.left;
    }
    nettoieSoulignements() {
        let phrasesExistantes = Object.keys(DetecteurWeb.ccorrs[this.id].phrases).filter(e => e !== "nbATraiter");
        for (let n of Array.from(this.perisprit.querySelector("#_corrdecteur").querySelectorAll("div"))) {
            if (!phrasesExistantes.includes(n.id)) {
                n.remove();
            }
        }
    }
    repositionnerBouton() {}
    async traiteMessagePourBoutonDW(msg) {
        super.traiteMessagePourBoutonDW(msg);
        if (msg.message == "enleverCorrdecteurDuDom") {
            this.enleverElementCorrecteurDuDom();
            this.estEnlevay = true;
        }
        if (msg.message == "mettreCorrdecteurDansLeDom") {
            this.zone = msg.zone;
            this.remettreElementCorrecteurDansLeDom();
            this.estEnlevay = false;
        }
        if (msg.message == "enleverBoutonDuDom") {
            if (this.contenantBoutonDW) this.contenantBoutonDW.remove();
        }
        if (msg.message == "mettreBoutonDansLeDom") {
            insereNoeudAvant(this.contenantBoutonDW, this.element);
            this.placerContenantBoutonDansBonElement();
        }
        if (msg.message == "nettoieSoulignements") {
            this.nettoieSoulignements();
        }
        if (msg.message == "active_bouton" || msg.message == "desactive_bouton" || msg.message == "mettre_a_jour_bouton" || msg.message == "mets_icone_analyse" || msg.message == "modifie-bouton" || msg.message == "initialise_canvas") {
            if (!DetecteurWeb.bulle || (DetecteurWeb.bulle && !DetecteurWeb.bulle.estInitialisay)) {
                await new Promise(res => {
                    let handler = () => {
                        window.removeEventListener("initbullegdocsfinie", handler);
                        res();
                    }
                    window.addEventListener("initbullegdocsfinie", handler);
                });
            }
            DetecteurWeb.envoieMessageABulle({
                message: "metsAJourEtats"
            });
        }
    }
}