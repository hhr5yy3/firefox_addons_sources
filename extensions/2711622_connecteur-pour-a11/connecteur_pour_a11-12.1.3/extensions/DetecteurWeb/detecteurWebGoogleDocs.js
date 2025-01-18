 /* 
 *	Ce document est la propriété intellectuelle de Druide informatique inc. Toute reproduction ou publication est interdite. 
 *  Copyright 2022 Druide informatique inc. 
 */
 function deplaceElementBulle(element) {
    let timeoutMontre = 0;
    let contenant = element.getRootNode().host;
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
        e = e || window.event;
        e.preventDefault();
        let boxContenant = contenant.getBoundingClientRect();
        element.classList.remove("apparition");
        element.classList.add("pasdanimation");
        element.style.left = e.clientX - boxContenant.left - 20 + "px";
        element.style.top = e.clientY - boxContenant.top - 14 + "px";
        element.dataset.deplace = "1";
        deplace = true;
        clearTimeout(timeoutMontre);
        DetecteurWeb.envoieMessageAuDetecteurWebPerisprit({
            message: "ouvreferme_menubulle_bulle",
            commande: "hidden"
        })
    }

    function fermeDeplacementElement(e) {
        element.ownerDocument.onpointerup = null;
        element.ownerDocument.onpointermove = null;
        element.ownerDocument.onpointerrawupdate = null;
        peutMontrer = true;
        if (!deplace) {
            if (element.dataset.deplace === undefined) {
                element.dataset.deplace = "0";
            }
            if (contientBouton(e.composedPath())) {
                if (DetecteurWeb.optionEstActivay && !DetecteurWeb.soulignaysCachays) {
                    for (let b of Object.values(DetecteurWeb.dictBouton)) {
                        let laRacine = b.perisprit;
                        laRacine.getElementById("_corrdecteur").style.display = "none";
                    }
                } else {
                    if (!DetecteurWeb.soulignaysCachays) {
                        envoieVersBackground({
                            message: "ConnexionAWebDetecteurWeb",
                            outil: "C0"
                        });
                    } else {
                        for (let b of Object.values(DetecteurWeb.dictBouton)) {
                            let laRacine = b.perisprit;
                            laRacine.getElementById("_corrdecteur").style.display = "block";
                        }
                    }
                }
                DetecteurWeb.envoieMessageABulle({
                    message: "modifie_message"
                });
            }
        } else {
            element.classList.add("apparition");
            element.classList.remove("pasdanimation");
            DetecteurWeb.envoieMessageABulle({
                message: "ouvreferme_menubulle",
                id: "bdw_bulle",
                commande: "hidden"
            });
        }
    }

    function ecouteCurseur(e) {
        if (e.button === 0 && contientBouton(e.composedPath())) {
            deplace = false;
            peutMontrer = false;
            e = e || window.event;
            e.preventDefault();
            let onRawUpdate = false;
            if (onRawUpdate) {
                element.ownerDocument.onpointerrawupdate = executeDeplacementElement;
                element.ownerDocument.onpointermove = fermeDeplacementElement;
            } else {
                element.ownerDocument.onpointerup = fermeDeplacementElement;
                element.ownerDocument.onpointermove = executeDeplacementElement;
            }
        }
    }

    function ecoutePointerOver(e) {
        clearTimeout(timeoutMontre);
        timeoutMontre = setTimeout(() => {
            if (peutMontrer) {
                DetecteurWeb.envoieMessageABulle({
                    message: "ouvreferme_menubulle",
                    commande: "visible"
                });
            }
            peutMontrer = true;
        }, 400);
    }

    function ecoutePointerLeave(e) {
        peutMontrer = false;
        timeoutMontre = setTimeout(() => {
            DetecteurWeb.envoieMessageABulle({
                message: "ouvreferme_menubulle",
                commande: "hidden"
            });
            peutMontrer = true;
        }, 400);
    }
    element.onpointerdown = ecouteCurseur;
    element.onpointerover = ecoutePointerOver;
    element.onpointerleave = ecoutePointerLeave;
}
class CliCorrSiGoogleDocs extends CliCorrSi {
    constructor(id, page) {
        super(id, page);
    }
    recupereCoordonneesPourIdPhrase(id) {
        let page = DetecteurWeb.recuperePageSelonId(this.id);
        if (!page || (page && !page.proprietes) || (page && page.proprietes && !page.proprietes.page)) return;
        if (id == "nbATraiter") return;
        if (!!this.phrases && !!this.phrases[id] && this.phrases[id].aErreur) {
            for (let detectionIdx in this.phrases[id].resultats.detections) {
                let detection = this.phrases[id].resultats.detections[detectionIdx];
                let intervalleSoulignement = this.phrases[id].resultats.detections[detectionIdx].aEteCorrigee ? detection.intervalleAbsoluPostTraitement : detection.intervalleAbsolu;
                if (intervalleSoulignement.borneFin <= DetecteurWeb.recuperePageSelonId(this.id).proprietes.longueurTexte) {
                    let desNouvellesCoordonnees = this.recupereCoordonneesTexte(intervalleSoulignement.borneDebut, intervalleSoulignement.borneFin);
                    if (!desNouvellesCoordonnees) continue;
                    if (this.phrases[id].resultats.detections[detectionIdx].coordonnees === undefined) {
                        this.phrases[id].resultats.detections[detectionIdx].coordonnees = desNouvellesCoordonnees;
                    } else {
                        this.phrases[id].resultats.detections[detectionIdx].coordonnees = undefined;
                        this.phrases[id].resultats.detections[detectionIdx].coordonnees = metsAJourObjetCoordonnees(this.phrases[id].resultats.detections[detectionIdx].coordonnees, desNouvellesCoordonnees);
                    }
                }
            }
        }
    }
    recupereCoordonneesTexte(d, f) {
        let page = DetecteurWeb.recuperePageSelonId(this.id);
        if (!page || (page && !page.proprietes) || (page && page.proprietes && !page.proprietes.page)) return;
        return page.proprietes.agentTexteur.donneCoordonneesIntervalle(d, f);
    }
    recupereCoordonnees() {
        let page = DetecteurWeb.recuperePageSelonId(this.id);
        if (!page || (page && !page.proprietes) || (page && page.proprietes && !page.proprietes.page)) return;
        for (let [idPhrase, phrase] of Object.entries(this.phrases)) {
            this.recupereCoordonneesPourIdPhrase(idPhrase);
        }
    }
}
class ClasseDetecteurWebGoogleDocs extends ClasseDetecteurWeb {
    constructor() {
        super();
        this.objPages = {};
        this.observeurChangementPage = null;
        this.observeurAjoutSuppressionPage = null;
        this.decalagePagesGauche = null;
        this.timeoutConstruirePages = null;
        this.bulle = null;
        this.objPagesConstruit = false;
        this.soulignaysCachays = false;
        this.doitRedessiner = false;
        this.enTrainDeChangerDOnglet = false;
        this.mutationEnSuspension = false;
        this.listeOnglets = [];
        this.modeActuel = null;
    }
    async init() {
        if (this.estInitialiser) return;
        this.estInitialiser = true;
        this.installeDetecteurWeb = this.installeDetecteurWeb.bind(this);
        this.recoisMessageDuDetecteurWebPerisprit = this.recoisMessageDuDetecteurWebPerisprit.bind(this);
        this.cacheInfobulle = this.cacheInfobulle.bind(this);
        this.ecouteMutations = this.ecouteMutations.bind(this);
        this.ecouteurPointeur = this.ecouteurPointeur.bind(this);
        this.ecouteClicsPourInfobulle = this.ecouteClicsPourInfobulle.bind(this);
        this.toutRedessiner = this.toutRedessiner.bind(this);
        this.cacheBulleGDocs = this.cacheBulleGDocs.bind(this);
        this.ecouteChangementOnglet = this.ecouteChangementOnglet.bind(this);
        if (document.readyState == "complete" && !this.objPagesConstruit) {
            let mode = await donneModeGoogleDocs(true);
            if (mode === "modification") {
                await this.construireListeOnglets();
            }
            this.modeActuel = mode;
        } else {
            document.onreadystatechange = async function() {
                if (document.readyState == "complete" && !this.objPagesConstruit) {
                    let mode = await donneModeGoogleDocs(true);
                    if (mode === "modification") {
                        await this.construireListeOnglets();
                    }
                    this.modeActuel = mode;
                }
            }.bind(this);
        }
        this.ajouteEcouteurs();
    }
    ajouteEcouteurs() {
        this.observeurChangmementMode = new MutationObserver(this.ecouteChangementMode.bind(this));
        this.observeurChangmementMode.observe(document.querySelector("#docs-bars"), {
            attributes: true,
            subtree: true
        });
        this.observeurChangementOnglets = new MutationObserver(this.ecouteChangementOnglet);
        this.observeurChangementOnglets.observe(document.querySelector(".kix-appview-editor"), {
            attributes: true,
            subtree: true,
            attributeFilter: ["style"]
        });
        this.observeurChangementPage = new MutationObserver(this.ecouteChangementStylePage.bind(this));
        this.observeurChangementPage.observe(document.querySelector(".kix-rotatingtilemanager-content"), {
            attributes: true,
            attributeFilter: ["style"],
            subtree: true
        });
        this.observeurAjoutSuppressionPage = new MutationObserver(this.ecouteAjoutSuppressionPages.bind(this));
        this.observeurAjoutSuppressionPage.observe(document.querySelector(".kix-rotatingtilemanager-content"), {
            childList: true
        });
        this.observeurBulleGDocs = new MutationObserver(this.cacheBulleGDocs);
        setTimeout(function() {
            this.observeurBulleGDocs.observe(document.querySelector(".kix-appview-clipped-ui-elements-container"), {
                attributes: true,
                attributeFilter: ["style"],
                subtree: true
            });
        }.bind(this), 500);
        document.addEventListener("pointerup", this.ecouteurPointeur);
        document.addEventListener("pointerup", this.ecouteClicsPourInfobulle);
        document.addEventListener("dblclick", this.ecouteClicsPourInfobulle);
        document.querySelector(".kix-appview-editor").addEventListener("scroll", this.cacheInfobulle);
        window.addEventListener('message_dw', this.recoisMessageDuDetecteurWebPerisprit, false);
        window.addEventListener('message_dw-comm', function(m) {
            this.traiteMessageDuBckg(JSON.parse(m.detail));
        }.bind(this));
    }
    detruisEcouteurs() {
        if (!!this.observeurChangementPage) this.observeurChangementPage.disconnect();
        if (!!this.observeurAjoutSuppressionPage) this.observeurAjoutSuppressionPage.disconnect();
        for (let p of Object.values(this.objPages)) {
            if (!!p.observeur) p.observeur.disconnect();
        }
        if (!!this.observeurBulleGDocs) this.observeurBulleGDocs.disconnect();
        document.removeEventListener("pointerup", this.ecouteurPointeur);
        document.removeEventListener("pointerup", this.ecouteClicsPourInfobulle);
        document.removeEventListener("dblclick", this.ecouteClicsPourInfobulle);
        document.querySelector(".kix-appview-editor").removeEventListener("scroll", this.cacheInfobulle);
        window.removeEventListener('message_dw', this.recoisMessageDuDetecteurWebPerisprit, false);
        window.removeEventListener('message_dw-comm', function(m) {
            this.traiteMessageDuBckg(JSON.parse(m.detail));
        }.bind(this));
    }
    detruisDetecteur() {
        super.detruisDetecteur();
        for (let [n, page] of Object.entries(this.objPages)) {
            if (page.observeur) page.observeur.disconnect();
            delete this.objPages[n].agentTexteur;
        }
        delete this.objPages;
        this.objPages = {};
        this.observeurChangementPage = null;
        this.observeurAjoutSuppressionPage = null;
        this.decalagePagesGauche = null;
        this.timeoutConstruirePages = null;
        this.bulle = null;
        this.objPagesConstruit = false;
        document.onreadystatechange = null;
    }
    desinstalleBoutons() {
        if (this.bulle) {
            if (this.bulle.contenantBoutonBulle) {
                this.bulle.contenantBoutonBulle.remove();
            }
            delete this.bulle;
        }
        super.desinstalleBoutons();
    }
    cacheBulleGDocs() {
        for (let e of Array.from(document.querySelectorAll(".kix-spell-bubble"))) {
            e.style.display = "none";
        }
    }
    ecouteClicsPourInfobulle(e) {
        let page = this.recuperePageSelonCoords(e.clientX, e.clientY);
        if (page !== undefined && document.activeElement.classList.contains("docs-texteventtarget-iframe") && !!e.target && e.target.id !== "infobulle_") {
            this.envoieMessageAuDetecteurWebPerisprit({
                message: "montre_cache_infobulle",
                id: page.proprietes.id,
                origine: e.type,
                jeInhibeDoubleclic: this.optionEstActivay,
                position: {
                    x: e.x,
                    y: e.y
                },
                _dib84: this.ccorrs[page.proprietes.id] !== undefined ? this.ccorrs[page.proprietes.id].phrases : null,
                estVisible: false
            });
        }
    }
    estOnglet(elem) {
        return elem !== undefined && elem !== null && elem.tagName && elem.tagName === "DIV" && elem.parentElement && elem.parentElement.classList.contains("kix-appview-editor") && (elem.attributes.length == 0 || (elem.attributes.length == 1 && elem.style !== undefined)) && elem.classList.length == 0 && elem.id == "";
    }
    ecouteChangementOnglet(mut) {
        let oChangeays = mut.filter(e => this.estOnglet(e.target)).map(e => e.target);
        if (oChangeays.length == 0) return;
        this.enTrainDeChangerDOnglet = true;
        clearTimeout(this.timeoutChangementOnglet);
        this.timeoutChangementOnglet = setTimeout(async function() {
            await this.construireListeOnglets();
            this.enTrainDeChangerDOnglet = false;
            window.dispatchEvent(new CustomEvent("finiChangementOnglet"));
        }.bind(this), 100);
    }
    async ecouteChangementMode() {
        if (!this.modeActuel) return;
        let mode = await donneModeGoogleDocs(false);
        let modesNonActifs = ["suggestion", "apercu"];
        if (mode == this.modeActuel) return;
        if (modesNonActifs.includes(mode) && modesNonActifs.includes(this.modeActuel)) return;
        if (mode == "modification") {
            this.modeActuel = mode;
            this.construireListeOnglets();
        }
        if (mode !== "modification" && this.modeActuel == "modification") {
            this.modeActuel = mode;
            this.desinstalleBoutons();
            this.objPages = {};
            this.listeOnglets = [];
        }
    }
    async toutRedessiner() {
        let pagesARedessiner = [];
        let pagesVisibles = !this.monOngletActif ? document.querySelectorAll(".kix-page-paginated") : this.monOngletActif.querySelectorAll(".kix-page-paginated");
        let objPagesVisibles = {};
        this.numerosPagesVisibles = [];
        for (let p of pagesVisibles) {
            objPagesVisibles[Math.round((parseFloat(p.style.top) - parseFloat(p.style.left)) / (parseFloat(p.style.height) + parseFloat(p.style.left) * 2))] = p;
            this.numerosPagesVisibles.push(Math.round((parseFloat(p.style.top) - parseFloat(p.style.left)) / (parseFloat(p.style.height) + parseFloat(p.style.left) * 2)));
            this.numerosPagesVisibles.sort();
        }
        for (let n of this.numerosPagesVisibles) {
            pagesARedessiner.push(this.objPages[n]);
        }
        if (pagesARedessiner.length == 0) return;
        for (let p of pagesARedessiner.filter(p => !!p && p.page)) {
            if (!!this.ccorrs[p.id]) {
                this.envoieMessageAuDetecteurWebPerisprit({
                    message: "supprime_soulignements_infobulles",
                    id: p.id,
                    phrasesIds: Object.keys(this.ccorrs[p.id].phrases).filter(e => e !== "nbATraiter")
                });
            }
        }
        this.doitRedessiner = true;
    }
    ecouteChangementStylePage(e) {
        let mutationsTraitees = [];
        for (let i in e) {
            e[i] = e[i].target;
        }
        mutationsTraitees = e.filter(t => t.classList.contains("kix-page-paginated") || t.classList.contains("kix-rotatingtilemanager-content"));
        this.construireObjetPagesAvecTimeout(mutationsTraitees);
    }
    ecouteAjoutSuppressionPages(e) {
        let mutationsTraitees = [];
        for (let i in e) {
            e[i] = Array.from(e[i].addedNodes).concat(Array.from(e[i].removedNodes));
        }
        mutationsTraitees = e.flat(1).filter(n => n.classList.contains("kix-page-paginated"));
        this.construireObjetPagesAvecTimeout(mutationsTraitees);
    }
    async construireListeOnglets() {
        if (await donneModeGoogleDocs(false) !== "modification") return;
        let lesOnglets = Array.from(document.querySelectorAll(".kix-rotatingtilemanager")).map(e => e.parentElement);
        this.monOngletActif = lesOnglets.filter(e => window.getComputedStyle(e).display !== "none")[0];
        for (let [num, o] of Object.entries(this.listeOnglets)) {
            if (!lesOnglets.includes(o.element)) {
                o = undefined;
            }
        }
        this.listeOnglets.filter(o => o !== undefined);
        for (let o of lesOnglets) {
            if (this.listeOnglets.filter(e => e.element == o).length !== 0) {
                let i = this.listeOnglets.findIndex(e => e.element == o);
                this.listeOnglets[i].estActif = o === this.monOngletActif;
                if (!this.listeOnglets[i].estActif) {}
            } else {
                this.listeOnglets.push({
                    element: o,
                    estActif: o === this.monOngletActif,
                    objPages: {}
                });
            }
        }
        await this.construireObjetPages();
    }
    async construireObjetPages() {
        if (await donneModeGoogleDocs(false) !== "modification") return;
        if (document.readyState !== "complete") return;
        this.enTrainDeConstruirePages = true;
        this.objPagesConstruit = true;
        let indexOngletActif = this.listeOnglets.findIndex(e => e.estActif);
        if (this.listeOnglets[indexOngletActif].objPages !== undefined) {
            this.objPages = this.listeOnglets[indexOngletActif].objPages;
        }
        let pagesVisibles = !this.monOngletActif && this.listeOnglets.length == 0 ? document.querySelectorAll(".kix-page-paginated") : this.monOngletActif.querySelectorAll(".kix-page-paginated");
        let objPagesVisibles = {};
        this.numerosPagesVisibles = [];
        for (let p of pagesVisibles) {
            objPagesVisibles[Math.round((parseFloat(p.style.top) - parseFloat(p.style.left)) / (parseFloat(p.style.height) + parseFloat(p.style.left) * 2))] = p;
            this.numerosPagesVisibles.push(Math.round((parseFloat(p.style.top) - parseFloat(p.style.left)) / (parseFloat(p.style.height) + parseFloat(p.style.left) * 2)));
            this.numerosPagesVisibles.sort();
        }
        await attendreAsync(50);
        for (let i in objPagesVisibles) {
            let echelleXAvant;
            let echelleYAvant;
            let texteAvant;
            let resultat = construireObjPositionsParagraphes(objPagesVisibles[i]);
            if (!this.objPages[i]) {
                this.objPages[i] = resultat;
                this.objPages[i].dernierIndexDiff = 0;
            } else {
                if (this.objPages[i] && this.objPages[i].paragraphes && this.objPages[i].paragraphes[0] && this.objPages[i].paragraphes[0].blocs) {
                    echelleXAvant = this.objPages[i].paragraphes[0].blocs[0].matrice.a;
                    echelleYAvant = this.objPages[i].paragraphes[0].blocs[0].matrice.d;
                } else {
                    echelleXAvant = 1;
                    echelleYAvant = 1;
                }
                if (this.objPages[i] && this.objPages[i].leTexte) {
                    texteAvant = this.objPages[i].leTexte;
                }
                this.objPages[i].paragraphes = resultat.paragraphes;
                this.objPages[i].leTexte = resultat.leTexte;
                this.objPages[i].longueurTexte = resultat.longueurTexte;
            }
            this.objPages[i].page = objPagesVisibles[i];
            if (!this.objPages[i].id) {
                this.objPages[i].id = "dw" + chaine_aleatoire() + new Date().getTime();
            }
            if (!this.dictBouton[this.objPages[i].id]) {
                await this.ajouteBoutonDW(i, true);
            }
            if (this.dictBouton[this.objPages[i].id] && this.objPages[i].page) {
                if (this.dictBouton[this.objPages[i].id].estEnlevay) {
                    this.envoieMessageAuDetecteurWebPerisprit({
                        message: "mettreCorrdecteurDansLeDom",
                        id: this.objPages[i].id,
                        zone: this.objPages[i].page
                    });
                    this.envoieMessageAuDetecteurWebPerisprit({
                        message: "mettreBoutonDansLeDom",
                        id: this.objPages[i].id
                    });
                    let coordonnees = this.constructor.donneCoords(this.objPages[i].page);
                    let unStyle = donneStyle(this.objPages[i].page);
                    this.envoieMessageAuDetecteurWebPerisprit({
                        message: "reinitialise_canvas",
                        activay: this.estActivayCorrectionExpress,
                        coord: coordonnees,
                        astyle: unStyle,
                        id: this.objPages[i].id
                    });
                    if (this.ccorrs[this.objPages[i].id]) {
                        this.envoieMessageAuDetecteurWebPerisprit({
                            message: "nettoieSoulignements",
                            id: this.objPages[i].id
                        });
                    }
                }
            }
            if (this.objPages[i].agentTexteur && this.objPages[i].page) {
                this.objPages[i].agentTexteur.objPositionsParagraphes = construireObjPositionsParagraphes(this.objPages[i].page);
            }
            if (this.objPages[i].page && (!this.objPages[i].aJour || (texteAvant !== undefined && texteAvant !== this.objPages[i].leTexte))) {
                await this.analyseDW(this.objPages[i].id);
            }
            if (!this.objPages[i].observeur && this.objPages[i].page) {
                this.objPages[i].observeur = new MutationObserver(function(e) {
                    this.ecouteMutations(e, i)
                }.bind(this));
                this.objPages[i].observeur.observe(this.objPages[i].page, {
                    childList: true,
                    subtree: true
                });
            }
            if (this.objPages[i].paragraphes && this.objPages[i].paragraphes[0] && this.objPages[i].paragraphes[0].blocs && (echelleXAvant !== this.objPages[i].paragraphes[0].blocs[0].matrice.a || echelleYAvant !== this.objPages[i].paragraphes[0].blocs[0].matrice.d || this.doitRedessiner)) {
                let coordonnees = this.constructor.donneCoords(this.objPages[i].page);
                let unStyle = donneStyle(this.objPages[i].page);
                this.envoieMessageAuDetecteurWebPerisprit({
                    message: "reinitialise_canvas",
                    activay: this.estActivayCorrectionExpress,
                    coord: coordonnees,
                    astyle: unStyle,
                    id: this.objPages[i].id
                });
                if (this.objPages[i].aJour) await this.analyseDW(this.objPages[i].id);
            }
            this.objPages[i].aJour = true;
        }
        for (let i in this.objPages) {
            if (!objPagesVisibles[i]) {
                if (!!this.objPages[i].observeur) this.objPages[i].observeur.disconnect();
                if (this.dictBouton[this.objPages[i].id] && !this.dictBouton[this.objPages[i].id].estEnlevay) {
                    this.envoieMessageAuDetecteurWebPerisprit({
                        message: "enleverCorrdecteurDuDom",
                        id: this.objPages[i].id
                    });
                    this.envoieMessageAuDetecteurWebPerisprit({
                        message: "enleverBoutonDuDom",
                        id: this.objPages[i].id
                    });
                }
                this.objPages[i].observeur = undefined;
                this.objPages[i].page = undefined
                this.objPages[i].aJour = false;
                this.objPages[i].dernierIndexDiff = 0;
            }
        }
        this.doitResterReveillay = true;
        this.doitRedessiner = false;
        this.enTrainDeConstruirePages = false;
        window.dispatchEvent(new CustomEvent("finiDeConstruirePages"));
        this.envoieMessageABulle({
            message: "metsAJourEtats"
        });
        this.listeOnglets[indexOngletActif].objPages = this.objPages;
        return {
            objPages: this.objPages,
            numerosPagesVisibles: this.numerosPagesVisibles
        };
    }
    async construireObjetPagesAvecTimeout(mut) {
        if (!!mut && mut.length == 0) return;
        if (!!mut && mut.filter(e => e.classList.contains("kix-rotatingtilemanager-content").length !== 0)) {
            let nouveauDecalage = document.querySelector(".kix-rotatingtilemanager-content").style.left;
            if (!this.decalagePagesGauche) {
                this.decalagePagesGauche = nouveauDecalage;
            } else if (this.decalagePagesGauche !== nouveauDecalage) {
                this.decalagePagesGauche = nouveauDecalage;
                this.toutRedessiner();
            }
        }
        clearTimeout(this.timeoutConstruirePages);
        await new Promise(function(res) {
            this.timeoutConstruirePages = setTimeout(async function() {
                await this.construireObjetPages();
                res();
            }.bind(this), 300);
        }.bind(this));
        return {
            objPages: this.objPages,
            numerosPagesVisibles: this.numerosPagesVisibles
        };
    }
    async ecouteMutations(e, numeroPage) {
        if (await donneModeGoogleDocs(false) !== "modification") return;
        if (this.taireMutations) return;
        if (this.enTrainDeChangerDOnglet) {
            this.mutationEnSuspension = true;
            await new Promise(recu => {
                let ecoute = () => {
                    window.removeEventListener("finiChangementOnglet", ecoute);
                    this.mutationEnSuspension = false;
                    window.dispatchEvent(new CustomEvent("mutationDebloquee"));
                    recu();
                }
                window.addEventListener("finiChangementOnglet", ecoute);
            });
        }
        let gChangeays = e.filter(e => e.target.tagName == "g" && e.target.dataset.sectionType == "body").map(e => e.target);
        let gEnlevays = e.filter(e => e.target.tagName == "svg" && e.target.parentElement.classList.contains("kix-canvas-tile-content") && !e.target.parentElement.classList.contains("kix-canvas-tile-selection")).map(e => Array.from(e.removedNodes).filter(e => e.tagName == "g" && e.dataset.sectionType == "body")).flat(1);
        let gAjoutays = e.filter(e => e.target.tagName == "svg" && e.target.parentElement.classList.contains("kix-canvas-tile-content") && !e.target.parentElement.classList.contains("kix-canvas-tile-selection")).map(e => Array.from(e.addedNodes).filter(e => e.tagName == "g" && e.dataset.sectionType == "body")).flat(1);
        if (gChangeays.length == 0 && gAjoutays.length == 0 && gEnlevays.length == 0) return;
        let page = this.objPages[numeroPage].page;
        let pagesVisibles = document.querySelectorAll(".kix-page-paginated");
        this.numerosPagesVisibles = [];
        for (let p of pagesVisibles) {
            this.numerosPagesVisibles.push(Math.round((parseFloat(p.style.top) - parseFloat(p.style.left)) / (parseFloat(p.style.height) + parseFloat(p.style.left) * 2)));
            this.numerosPagesVisibles.sort();
        }
        if (!this.numerosPagesVisibles.includes(parseInt(numeroPage))) {
            this.envoieMessageABulle({
                message: "metsAJourEtats"
            });
            return;
        }
        let texteavant = this.objPages[numeroPage].leTexte;
        let resultat = this.construireListePositionsNoeuds(page, this.objPages[numeroPage].id, false);
        this.objPages[numeroPage].dernierIndexDiff = this.donneIndexDiff(texteavant, resultat.leTexte);
        const vieilleLongueurTexte = texteavant.length;
        let pagesAReanalyser = Object.entries(this.objPages).filter(e => parseInt(e[0]) >= numeroPage && e[1].page !== undefined);
        for (let i in pagesAReanalyser) {
            pagesAReanalyser[i] = pagesAReanalyser[i][1];
        }
        if (!!this.ccorrs[this.objPages[numeroPage].id] && texteavant.length !== 0) {
            let uuidPhrase = [];
            let uuidPhraseAForcerMiseAJourSoulignes = null;
            if (Array.from(page.querySelectorAll("g")).filter(e => e.dataset.sectionType == "body").length == 0 && gEnlevays !== 0) {
                uuidPhrase = Object.keys(this.ccorrs[this.objPages[numeroPage].id].phrases).filter(e => e !== "nbATraiter");
            } else if (gChangeays.length == 1 && gAjoutays.length == 0 && gEnlevays.length == 0) {
                uuidPhrase = await this.ccorrs[this.objPages[numeroPage].id].donnePhrasesInvalidees({
                    borneDebut: Math.min(vieilleLongueurTexte, this.objPages[numeroPage].dernierIndexDiff),
                    borneFin: Math.max(vieilleLongueurTexte, this.objPages[numeroPage].dernierIndexDiff)
                });
            } else {
                let paragsExistants = gChangeays.concat(gAjoutays);
                if (paragsExistants.length > 0) {
                    let indexInvalider = null;
                    for (let p of this.objPages[numeroPage].paragraphes) {
                        if (paragsExistants.includes(p.paragraphe)) {
                            indexInvalider = p.posDepuisDebut;
                            break;
                        }
                    }
                    if (indexInvalider !== null) {
                        uuidPhrase = await this.ccorrs[this.objPages[numeroPage].id].donnePhrasesInvalidees({
                            borneDebut: Math.min(vieilleLongueurTexte, indexInvalider),
                            borneFin: Math.max(vieilleLongueurTexte, indexInvalider)
                        });
                        uuidPhraseAForcerMiseAJourSoulignes = uuidPhrase[0];
                    }
                }
            }
            for (let p of pagesAReanalyser) {
                if (p.id !== this.objPages[numeroPage].id) {
                    let idPhrases = Object.keys(this.ccorrs[p.id].phrases).filter(e => e !== "nbATraiter");
                    this.envoieMessageAuDetecteurWebPerisprit({
                        message: "supprime_soulignements_infobulles",
                        id: p.id,
                        phrasesIds: idPhrases
                    });
                    this.envoieMessageAuDetecteurWebPerisprit({
                        message: "mets_icone_analyse",
                        id: p.id
                    });
                } else {
                    this.envoieMessageAuDetecteurWebPerisprit({
                        message: "supprime_soulignements_infobulles",
                        id: this.objPages[numeroPage].id,
                        phrasesIds: uuidPhrase
                    });
                    this.envoieMessageAuDetecteurWebPerisprit({
                        message: "mets_icone_analyse",
                        id: this.objPages[numeroPage].id
                    });
                }
            }
            this.envoieMessageABulle({
                message: "metsAJourEtats"
            });
            this.reAnalyseDW(this.objPages[numeroPage].id, pagesAReanalyser, uuidPhraseAForcerMiseAJourSoulignes);
        } else {
            this.reAnalyseDW(this.objPages[numeroPage].id, pagesAReanalyser);
        }
    }
    donneIndexDiff(texteAvant, texteApres) {
        if (texteAvant === texteApres) return -1;
        let dmp = new diff_match_patch();
        let diff = dmp.diff_main(texteAvant, texteApres);
        dmp.diff_cleanupSemantic(diff);
        if (diff[1] && diff[1][0]) {
            if (diff[1][0] == -1) {
                return diff[0][1].length;
            }
            if (diff[1][0] == 1) {
                return diff[0][1].length + diff[1][1].length;
            }
        }
        if (diff[0] && diff[0][1]) return diff[0][1].length;
        return 0;
    }
    chercherNoeudPourIntervalle(d, f, id) {
        let bonnePage = this.recuperePageSelonId(id);
        if (bonnePage[1] !== undefined && bonnePage[1].agentTexteur !== undefined) {
            return bonnePage[1].agentTexteur.chercherNoeudPourIndex(d);
        }
    }
    construireListePositionsNoeuds(page, id, sauvegarderDansObj = true) {
        let numeroPage = this.recuperePageSelonId(id).numeroPage;
        page = numeroPage !== undefined ? this.objPages[numeroPage].page : undefined;
        if (page !== undefined) {
            let resultat = construireObjPositionsParagraphes(page);
            if (sauvegarderDansObj) {
                this.objPages[numeroPage].paragraphes = resultat.paragraphes;
                this.objPages[numeroPage].leTexte = resultat.leTexte;
                this.objPages[numeroPage].longueurTexte = resultat.longueurTexte;
            }
            this.objetBoutonsZones[id] = {
                zone: page,
                texteZone: resultat.leTexte,
                longueurTexte: resultat.longueurTexte,
                listePositionsNoeuds: [],
                numeroPage: numeroPage
            }
            return resultat;
        }
    }
    async envoieMessageABulle(msg) {
        let aEteEnvoye = false;
        try {
            if (!this.bulle) {
                let zIndexMax = findHighestZIndex("*");
                this.bulle = new ObjetBulleGoogleDocs({
                    zIndex: zIndexMax,
                    estActivayCorrectionExpress: this.estActivayCorrectionExpress,
                    position_x: this.position_x
                });
            }
            await this.bulle.traiteMessagePourBulle(msg);
        } catch (erreur) {
            console.error("dw.detecteurWeb.envoieMessageABulle", erreur);
        }
        return aEteEnvoye;
    }
    envoieMessageAuDetecteurWebPerisprit(msg) {
        if (!msg.id) return;
        let aEteEnvoye = false;
        try {
            let numeroPage = this.recuperePageSelonId(msg.id).numeroPage;
            const unElement = numeroPage !== undefined ? this.objPages[numeroPage].page : undefined;
            msg._dib105 = 'messageDetecteurWebPerisprit';
            let unDetecteur = this.dictBouton[msg.id];
            if (unDetecteur === undefined) {
                let zIndexMax = findHighestZIndex("*");
                unDetecteur = new ObjetDetecteurGoogleDocs({
                    id: msg.id,
                    zIndex: zIndexMax,
                    estActivayCorrectionExpress: this.estActivayCorrectionExpress,
                    position_x: this.position_x
                });
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
    recupereAgentSelonId(id) {
        let numeroPage = this.recuperePageSelonId(id).numeroPage;
        if (numeroPage !== undefined) {
            if (!!this.objPages[numeroPage].agentTexteur) {
                dwAgentTexteur = this.objPages[numeroPage].agentTexteur;
                return this.objPages[numeroPage].agentTexteur;
            } else {
                this.objPages[numeroPage].agentTexteur = new AgentTexteurGoogleDocsDW(numeroPage, id);
                dwAgentTexteur = this.objPages[numeroPage].agentTexteur;
                return this.objPages[numeroPage].agentTexteur;
            }
        }
    }
    recupereElementSelonId(id) {
        return this.recuperePageSelonId(id)?.page;
    }
    recuperePageSelonId(id) {
        let bonnePage = Object.entries(this.objPages).filter(e => e[1].id == id).flat(1);
        if (bonnePage.length > 0) {
            return {
                numeroPage: parseInt(bonnePage[0]),
                proprietes: bonnePage[1]
            };
        }
        return {};
    }
    recuperePageSelonCoords(x, y) {
        for (let [i, p] of Object.entries(this.objPages)) {
            if (p.page !== undefined) {
                let box = p.page.getBoundingClientRect();
                if (x >= box.x && x <= box.x + box.width && y >= box.y && y <= box.y + box.height) {
                    return {
                        numeroPage: parseInt(i),
                        proprietes: p
                    };
                }
            }
        }
    }
    recupereTexteDeElementAvecId(id) {
        let numeroPage = this.recuperePageSelonId(id).numeroPage;
        let dwAgentTexteur = this.recupereAgentSelonId(id);
        if (!dwAgentTexteur) return;
        dwAgentTexteur.initialiseTexteur(true);
        this.construireListePositionsNoeuds(this.objPages[numeroPage].page, id, true);
        if (numeroPage !== undefined && this.objPages[numeroPage] && this.objPages[numeroPage] !== undefined) {
            let interval = {
                d: this.objPages[numeroPage].dernierIndexDiff,
                f: this.objPages[numeroPage].dernierIndexDiff
            }
            return {
                texteagent: this.objPages[numeroPage].leTexte,
                _dib30: this.objPages[numeroPage].leTexte,
                texteHTML: "",
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
    async reAnalyseDW(leIdBouton, lesPages, idDebutForceMiseAJour) {
        let leNumeroPage = this.recuperePageSelonId(leIdBouton).numeroPage;
        if (this.enTrainDeConstruirePages) {
            await new Promise(function(res) {
                let handler = function() {
                    window.removeEventListener("finiDeConstruirePages", handler);
                    res();
                }
                window.addEventListener("finiDeConstruirePages", handler);
            }.bind(this))
        }
        if (this.dernierePageReanalyse == undefined || this.dernierePageReanalyse >= leNumeroPage) {
            window.clearTimeout(this.intervalReAnalyseDW);
            this.dernierePageReanalyse = leNumeroPage;
            let timeout = this.donneTimeout(leIdBouton);
            this.intervalReAnalyseDW = window.setTimeout(function() {
                if (!!idDebutForceMiseAJour && !!this.ccorrs[leIdBouton]) {
                    this.objPages[leNumeroPage].agentTexteur.initialiseTexteur();
                    this.ccorrs[leIdBouton].maj(false, idDebutForceMiseAJour);
                }
                for (let p of lesPages) {
                    if (p.page !== undefined) {
                        this.analyseDW(p.id);
                    }
                    this.dernierePageReanalyse = undefined;
                }
            }.bind(this), timeout);
        }
    }
    async analyseDW(leIdBouton, estReconnexion) {
        if (estReconnexion === undefined) estReconnexion = false;
        let leObjetTexte = this.recupereTexteDeElementAvecId(leIdBouton);
        if (!leObjetTexte) return;
        if (this.archive[leIdBouton] !== undefined && this.ccorrs[leIdBouton] !== undefined && !(leObjetTexte.message !== undefined && leObjetTexte.message == "supprime")) {
            let dmp = new diff_match_patch();
            let diff = dmp.diff_main(this.archive[leIdBouton].texteagent, leObjetTexte.texteagent);
            dmp.diff_cleanupSemantic(diff);
            if (diff.length > 500) {
                this.ccorrs[leIdBouton].reinit();
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
                    this.ccorrs[leIdBouton].recupereCoordonnees();
                    this.metsAjourDetecteurWeb({
                        message: "intervention",
                        id: leIdBouton,
                        _dib84: this.ccorrs[leIdBouton].phrases,
                        sorteIntervention: this.ccorrs[leIdBouton].donneSorteIntervention(),
                        niveauAlerte: this.niveauAlerte
                    });
                    this.metsAjourDetecteurWeb({
                        message: "modifie-bouton",
                        id: leIdBouton,
                        sorteIntervention: this.ccorrs[leIdBouton].donneSorteIntervention(),
                        niveauAlerte: this.niveauAlerte
                    });
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
                    unClient = new CliCorrSiGoogleDocs(leIdBouton, this.objetBoutonsZones[leIdBouton].zone);
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
    async ajouteBoutonDW(numeroPage, leEstVisible) {
        let promesse = new Promise(async (resolution) => {
            var unIdBouton = DetecteurWeb.objPages[numeroPage].id;
            let unClone = document.getElementById("b" + unIdBouton + "_clone");
            let estExistant = false;
            let zIndexMax = findHighestZIndex("*");
            if (unClone && unClone.dataset.a_supprimer !== undefined && unClone.dataset.a_supprimer == "0") {
                estExistant = true;
            }
            if (!estExistant && !this.dictBouton[unIdBouton]) {
                try {
                    if (this.listeFantome.includes(unIdBouton)) {
                        this.objPages[numeroPage].estFantome = true;
                    }
                    let detecteur = new ObjetDetecteurGoogleDocs({
                        id: unIdBouton,
                        zIndex: zIndexMax,
                        estActivayCorrectionExpress: this.estActivayCorrectionExpress,
                        position_x: this.position_x
                    });
                    this.dictBouton[unIdBouton] = detecteur;
                    this.dictBouton[unIdBouton].init(document, this.objPages[numeroPage].page);
                    let ancre = this.objPages[numeroPage].page;
                    let coordonnees = this.constructor.donneCoords(ancre);
                    let unStyle = donneStyle(ancre);
                    this.construireListePositionsNoeuds(this.objPages[numeroPage].page, unIdBouton, true);
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
                        estVisible: false
                    });
                    if (!this.bulle || (this.bulle && !this.bulle.estInitialisay)) {
                        await this.envoieMessageABulle({
                            message: "init_bulle",
                            activay: this.estActivayCorrectionExpress,
                        });
                        deplaceElementBulle(this.bulle.boutonBulle);
                    }
                    document.addEventListener("keyup", function(k) {
                        this.activeOption(k.altKey);
                    }.bind(this), false);
                    document.addEventListener("keydown", function(k) {
                        this.activeOption(k.altKey);
                    }.bind(this), false);
                    document.addEventListener('scroll', this.cacheInfobulle);
                } catch (erreur) {
                    console.error("dw.detecteurWeb.ajouteBoutonDW", erreur);
                }
            } else {
                if (false) {
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
    recoisMessageDuDetecteurWebPerisprit(e) {
        super.recoisMessageDuDetecteurWebPerisprit(e);
        if (e.data.message == "desactiveSurSite") {
            envoieVersBackground({
                message: "exclusSite"
            });
        }
    }
    traiteMessageDuBckg(msg) {
        super.traiteMessageDuBckg(msg);
    }
}