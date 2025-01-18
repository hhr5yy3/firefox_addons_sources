 /* 
 *	Ce document est la propriété intellectuelle de Druide informatique inc. Toute reproduction ou publication est interdite. 
 *  Copyright 2022 Druide informatique inc. 
 */
 var gAgentTexteurGen = null;
const cstLgMinChaineProposerAvantCorrection = 5;
const cstLgMinChaineAVeriferAvantCorrection = 2;

function traiteElementLog(lElement) {
    if (lElement !== undefined) {
        return lElement;
    }
    return "aucune_information (_dib29 => undefined)";
};

function remplaceIntervalle(leTexte, leDebut, laFin, laChaine) {
    if (laFin > leTexte.length)
        return "";
    return leTexte.substring(0, leDebut) + laChaine + leTexte.substring(laFin);
};

function referenceFormatageTexte(leDebut, laFin, leStyle) {
    this._dib49 = leDebut;
    this._dib50 = laFin;
    this.Style = leStyle;
};

function contientElementFormulaire(leNoeud) {
    if (leNoeud == null)
        return false;
    var unStyle = leNoeud.nodeType == 1 ? document.defaultView.getComputedStyle(leNoeud) : null;
    if (unStyle && unStyle.display !== undefined && unStyle.display == "none")
        return false;
    var trouve = false;
    if (estInput(leNoeud) || estTextarea(leNoeud)) {
        return true;
    } else {
        var lesFils = leNoeud.childNodes;
        if (lesFils != null) {
            var nb = lesFils.length;
            for (var index = 0; index < nb && !trouve; index++)
                trouve = contientElementFormulaire(lesFils.item(index));
        }
    }
    return trouve;
};

function corrigeLesEditables() {
    var uneFenetre = (estMozilla() ? trouvePremiereFenetreAvecSelection(window) : null);
    if (uneFenetre == null)
        uneFenetre = window;
    let unDocument = trouveDocumentAvecElementEditable(uneFenetre.document);
    if (unDocument) return true;
    return false;
};

function trouvePremiereFenetreAvecSelection(source) {
    try {
        if (source.toString() != "[object HTMLDocument]") {
            if (source.getSelection != null) {
                var selection = source.getSelection();
                try {
                    var range = null;
                    if (source.getSelection().rangeCount > 0)
                        range = source.getSelection().getRangeAt(0);
                    if (selection != null) {
                        if (selection != null) {
                            if (!selection.isCollapsed && selection.toString().length > 0) {
                                return source;
                            } else if (selection.toString().length > 0) {
                                return source;
                            } else if (range != null && estTexte(range.startContainer) && range.endOffset == range.startOffset) {
                                unNoeud = source.document.activeElement;
                                if (estNoeudEditable(unNoeud) && !estBody(unNoeud))
                                    return source;
                            }
                        }
                    }
                } catch (erreur) {}
            }
        }
        try {
            unDocumentSource = null;
            if (source.toString() == "[object HTMLDocument]")
                unDocumentSource = source;
            else
                unDocumentSource = source.document;
        } catch (erreur) {}
        var cadres = unDocumentSource.getElementsByTagName('frame');
        var nombreCadres = cadres.length;
        if (nombreCadres > 0) {
            for (var i = 0; i < nombreCadres; ++i) {
                var cadre = cadres[i];
                try {
                    if (cadre = trouvePremiereFenetreAvecSelection(cadre.contentWindow))
                        return cadre;
                } catch (erreur) {}
            }
        }
        var iframes = unDocumentSource.getElementsByTagName('iframe');
        var nombreICadres = iframes.length;
        if (nombreICadres > 0) {
            for (var i = 0; i < nombreICadres; ++i) {
                var iframe = iframes[i];
                try {
                    if (estSrcAccessible(iframe.src) && (iframe = trouvePremiereFenetreAvecSelection(iframe.contentWindow)))
                        return iframe;
                } catch (erreur) {}
            }
        }
        return null;
    } catch (erreurParent) {
        return null;
    }
};

function trouveEditeurGrav() {
    var listeNoeuds = window.document.getElementsByClassName(cstNomNoeudGravEditorContent);
    if (listeNoeuds != null && listeNoeuds.length > 0) {
        try {
            var noeudPreview = document.getElementsByClassName("grav-editor-preview");
            if (noeudPreview.length == 0) {
                return listeNoeuds.length;
            } else if (noeudPreview.style.display.toUpperCase() === "NONE") {
                return listeNoeuds.length;
            }
        } catch (erreur) {
            console.error("agentgen.trouveEditeurGrav ", erreur);
        }
    }
    return 0;
};

function trouveDocumentAvecElementEditable(source) {
    if (source == null)
        return null;
    if (estThunderbird()) return source;
    let unDocumentAvecElementEditable = null;
    try {
        if (unDocumentAvecElementEditable == null) {
            if (source.activeElement.shadowRoot !== undefined) {
                unDocumentAvecElementEditable = trouveDocumentAvecElementEditable(source.activeElement.shadowRoot);
            }
        }
    } catch (erreur) {
        console.error("agentgen.trouveDocumentAvecElementEditable.1 ", erreur);
    }
    if (unDocumentAvecElementEditable != null)
        return unDocumentAvecElementEditable;
    try {
        if (unDocumentAvecElementEditable == null) {
            let iframes = source.querySelectorAll(cstNomNoeudIframe);
            if (iframes != null) {
                for (let i = 0; i < iframes.length && unDocumentAvecElementEditable == null; i++) {
                    try {
                        if (estSrcAccessible(iframes[i].src) && estElementAccessible(iframes[i])) {
                            unDocumentAvecElementEditable = trouveDocumentAvecElementEditable(iframes[i].contentDocument);
                        }
                    } catch (erreur) {
                        console.error("agentgen.trouveDocumentAvecElementEditable.2 ", erreur);
                    }
                }
            }
        }
    } catch (erreurParent) {
        console.error("agentgen.trouveDocumentAvecElementEditable.2.p ", erreurParent);
    }
    if (unDocumentAvecElementEditable != null)
        return unDocumentAvecElementEditable;
    try {
        let frames = source.querySelectorAll(cstNomNoeudFrame);
        if (frames != null) {
            for (let i = 0; i < frames.length && unDocumentAvecElementEditable == null; i++) {
                try {
                    if (estSrcAccessible(frames[i].src) && estElementAccessible(frames[i])) {
                        unDocumentAvecElementEditable = trouveDocumentAvecElementEditable(frames[i].contentDocument);
                    }
                } catch (erreur) {
                    console.error("agentgen.trouveDocumentAvecElementEditable.3 ", erreur);
                }
            }
        }
    } catch (erreurParent) {
        console.error("agentgen.trouveDocumentAvecElementEditable.3.p ", erreurParent);
    }
    try {
        if (unDocumentAvecElementEditable == null) {
            if (source.activeElement.ownerDocument !== undefined) {
                if (estNoeudEditable(source.activeElement))
                    unDocumentAvecElementEditable = source.activeElement.ownerDocument;
            }
        }
    } catch (erreur) {
        console.error("agentgen.trouveDocumentAvecElementEditable.4 ", erreur);
    }
    return unDocumentAvecElementEditable;
};

function trouveDocumentAvecSelection(source, chercheSelectionRiche) {
    if (source == null)
        return null;
    if (estDocumentAvecSelection(source, chercheSelectionRiche))
        return source;
    let unDocumentAvecSelection = null;
    try {
        if (unDocumentAvecSelection == null) {
            if (source.activeElement.shadowRoot !== undefined) {
                unDocumentAvecSelection = trouveDocumentAvecSelection(source.activeElement.shadowRoot, chercheSelectionRiche);
            }
        }
    } catch (erreur) {
        console.error("agentgen.trouveDocumentAvecSelection.1 ", erreur);
    }
    if (unDocumentAvecSelection != null)
        return unDocumentAvecSelection;
    try {
        if (unDocumentAvecSelection == null) {
            let iframes = source.querySelectorAll(cstNomNoeudIframe);
            if (iframes != null) {
                for (let i = 0; i < iframes.length && unDocumentAvecSelection == null; i++) {
                    try {
                        if (estSrcAccessible(iframes[i].src) && estElementAccessible(iframes[i])) {
                            unDocumentAvecSelection = trouveDocumentAvecSelection(iframes[i].contentDocument, chercheSelectionRiche);
                        }
                    } catch (erreur) {
                        console.error("agentgen.trouveDocumentAvecSelection.2 ", erreur);
                    }
                }
            }
        }
    } catch (erreurParent) {
        console.error("agentgen.trouveDocumentAvecSelection.2.p ", erreurParent);
    }
    if (unDocumentAvecSelection != null)
        return unDocumentAvecSelection;
    try {
        let frames = source.querySelectorAll(cstNomNoeudFrame);
        if (frames != null) {
            for (let i = 0; i < frames.length && unDocumentAvecSelection == null; i++) {
                try {
                    if (estSrcAccessible(frames[i].src) && estElementAccessible(frames[i])) {
                        unDocumentAvecSelection = trouveDocumentAvecSelection(frames[i].contentDocument, chercheSelectionRiche);
                    }
                } catch (erreur) {
                    console.error("agentgen.trouveDocumentAvecSelection.3 ", erreur);
                }
            }
        }
    } catch (erreurParent) {
        console.error("agentgen.trouveDocumentAvecSelection.3.p ", erreurParent);
    }
    try {
        if (unDocumentAvecSelection == null) {
            if (source.activeElement.ownerDocument !== undefined) {
                if (source.activeElement.ownerDocument.getSelection() && source.activeElement.ownerDocument.getSelection().toString().length > 0) {
                    unDocumentAvecSelection = source.activeElement.ownerDocument;
                } else if (estIFrame(source.activeElement)) {
                    unDocumentAvecSelection = source.activeElement.contentDocument;
                }
            }
        }
    } catch (erreur) {
        console.error("agentgen.trouveDocumentAvecSelection.4 ", erreur);
    }
    return unDocumentAvecSelection;
};

function trouveNoeudGoogleApps(leType) {
    leType.value = 0;
    var unNoeud = document.getElementById(cstNomNoeudDocEditor);
    if (unNoeud != null) {
        unNoeud = document.getElementById(cstNomNoeudKixAppview);
        leType.value = 1;
        return unNoeud;
    }
    return null;
};

function estDocumentAvecSelection(source, chercheSelectionRiche) {
    if (source == null)
        return false;
    if (source.activeElement.value !== undefined && source.activeElement.value.length > 0) {
        return true;
    }
    var uneSelection = source.getSelection();
    if (uneSelection != null) {
        var nb = uneSelection.rangeCount;
        var laSel = uneSelection.toString();
        if (nb > 0 && laSel.length > 0) {
            if (chercheSelectionRiche) {
                var trouve = false;
                try {
                    var unRangeSelection = null;
                    if (uneSelection.rangeCount > 0) {
                        unRangeSelection = uneSelection.getRangeAt(0);
                        trouve = !contientElementFormulaire(unRangeSelection.startContainer);
                    }
                } catch (erreur) {
                    console.error("agentgen.estDocumentAvecSelection.1", erreur);
                    trouve = false;
                }
                return trouve;
            }
        }
        try {
            var range = null;
            if (uneSelection.rangeCount > 0)
                range = uneSelection.getRangeAt(0);
            if (range != null && estTexte(range.startContainer) && range.endOffset == range.startOffset) {
                unNoeud = source.activeElement;
                if (estNoeudEditable(unNoeud))
                    return true;
            }
        } catch (erreur) {
            console.error("agentgen.estDocumentAvecSelection.2", erreur);
        }
    }
    return false;
};
class enveloppeIntervalleZoneDeTexte {
    constructor() {
        this.debutContexte = 0;
        this.finContexte = 0;
        this._dib92 = "";
    }
    reInitialise() {
        this.debutContexte = 0;
        this.finContexte = 0;
        this._dib92 = "";
    }
    proposeIntervalleComparaison(leTexte, leDebut, laFin, leDebutContexte, laFinContexte, lgMinIntervalle) {
        const debutDuContexte = leDebutContexte;
        const finDuContexte = laFinContexte;
        var reussi = false;
        if (laFin - leDebut < lgMinIntervalle) {
            if (leTexte.length > 0) {
                var lgManquante = lgMinIntervalle - (laFin - leDebut);
                var finRelTest = laFin + lgManquante;
                if (finRelTest <= finDuContexte) {
                    if (intervalleEstValideSelonTexteur(leTexte, leDebut, finRelTest)) {
                        laFin = finRelTest;
                        reussi = true;
                    }
                }
                if (!reussi && (leDebut - debutDuContexte) >= lgManquante) {
                    var debRelTest = leDebut - lgManquante;
                    if (intervalleEstValideSelonTexteur(leTexte, debRelTest, laFin)) {
                        leDebut = debRelTest;
                        reussi = true;
                    }
                }
                if (reussi) {
                    this.debutContexte = leDebut;
                    this.finContexte = laFin;
                    return true;
                }
                let finDomaine = Math.min(laFin + lgManquante, finDuContexte);
                let debDomaine = leDebut - debutDuContexte > lgManquante ? leDebut - lgManquante : debutDuContexte;
                var onContinue = true;
                while (laFin < finDomaine && onContinue && lgManquante > 0) {
                    laFin++;
                    if (!intervalleEstValideSelonTexteur(leTexte, leDebut, laFin)) {
                        laFin--;
                        onContinue = false;
                    } else {
                        lgManquante--;
                    }
                }
                onContinue = true;
                while (leDebut > debDomaine && onContinue && lgManquante > 0) {
                    leDebut--;
                    if (!intervalleEstValideSelonTexteur(leTexte, leDebut, laFin)) {
                        leDebut++;
                        onContinue = false;
                    } else {
                        lgManquante--;
                    }
                }
                if ((laFin - leDebut) >= lgMinIntervalle) {
                    this.debutContexte = leDebut;
                    this.finContexte = laFin;
                    reussi = true;
                }
            }
        }
        return reussi;
    }
    calculeIntervalleComparaison(leTexte, leDebut, laFin, leDebutContexte, laFinContexte) {
        this.reInitialise();
        this._dib92 = leTexte;
        if (leDebutContexte < 0 || laFinContexte > leTexte.length || leDebutContexte > laFinContexte || leDebut < leDebutContexte || laFin > laFinContexte) {
            return;
        }
        this.debutContexte = leDebut;
        this.finContexte = laFin;
        if (!this.proposeIntervalleComparaison(leTexte, leDebut, laFin, leDebutContexte, laFinContexte, cstLgMinChaineProposerAvantCorrection)) {
            this.proposeIntervalleComparaison(leTexte, leDebut, laFin, leDebutContexte, laFinContexte, cstLgMinChaineAVeriferAvantCorrection);
        }
    }
    donneIntervalleComparaison(leDebutContexte, laFinContexte) {
        var uneChaine = "";
        if (this.debutContexte >= leDebutContexte && this.finContexte <= laFinContexte) {
            uneChaine = this._dib92.substr(this.debutContexte, this.finContexte - this.debutContexte);
        }
        return uneChaine;
    }
    ajusteCorrectionIntervalleVide(leDebut, laFin, laCorrection, leTexte) {
        this.reInitialise();
        this.debutContexte = leDebut;
        this.finContexte = laFin;
        this._dib92 = laCorrection;
        if (this.finContexte == this.debutContexte && leTexte.length > 0) {
            var uneChaine = "";
            var estAjustay = false;
            if (this.debutContexte < leTexte.length) {
                estAjustay = true;
                uneChaine = leTexte[this.debutContexte];
                if (this.debutContexte > 0) {
                    if (uneChaine[0] == cstCarBidon || uneChaine[0] == cstRetourCharriot || uneChaine[0] == cstNouvelleLigne) {
                        estAjustay = false;
                    }
                }
                if (estAjustay)
                    this.finContexte++;
            }
            if (estAjustay) {
                this._dib92 = this._dib92 + uneChaine;
            } else {
                this.debutContexte--;
                this._dib92 = leTexte[this.debutContexte] + this._dib92;
            }
        }
    }
};

function intervalleEstValideSelonTexteur(uneChaine, _dib49, _dib50) {
    let sousChaine = uneChaine.substring(_dib49, _dib50);
    return !sousChaine.indexOf(cstRetourCharriot) >= 0 || sousChaine.indexOf(cstNouvelleLigne) >= 0 || sousChaine.indexOf(cstCarBidon) >= 0;
};
class AgentTexteurGen {
    constructor() {
        this.windowtype;
        this.maFenetre;
        this.monDocument;
        this.maSelection;
        this.jeUtiliseEnveloppeIntervalleTexte = false;
        this.monContexteSelection;
        this.monDebutSelectionDsContexte;
        this.maFinSelectionDsContexte;
        this.monDebutSelection;
        this.maFinSelection;
        this.estDW = false;
        this.monOutil = "";
        this.monTexte;
        this.monTexteOriginal = "";
        this.monTitre;
        this.jeSuisInitialisay;
        this.blocDeCorrectionsEnCours = false;
        this.actualisationFenAweb = false;
        this.maListeFormatageTexte = [];
        this.jeSUISAPI = false;
        this.jeSuisLiayAPI = false;
        this.monGuidSession = "";
        this.monPontCommunicationAvecBkg = "";
        this.monPort;
        this.monEnveloppeIntervalleZoneDeTexte = new enveloppeIntervalleZoneDeTexte();
        this.monElementPourAPI = null;
        this.mesElementsPourAPI = [];
        this.monElementPourDW = null;
        if (this.monTypeAT === undefined)
            this.monTypeAT = cstTypeAgentTexteur.AgentTexteurGen;
        this.erreur_log = {
            zone: {
                zone_id: -1,
                trouvee: false
            },
            infos_recues: {},
            infos_calcules: {},
            infos_contexte: {}
        };
    }
    envoieVersBackground(lesArguments) {
        lesArguments.estCorrecteurAntidoteWeb = false;
        return envoieVersBackground(lesArguments);
    }
    corrigeDansTexteur(lesArguments) {}
    docEstMort() {
        return true;
    }
    donneLesZonesACorriger(lesArguments) {}
    donneTextePourOutils() {
        return {};
    }
    initPourCorrecteur() {}
    initPourOutils() {}
    peutCorriger(lesArguments) {}
    remplaceSelection(lesArguments) {}
    rompsLienCorrecteur() {}
    rompsLienTexteur() {}
    selectionneApresRemplace(lesArguments) {}
    selectionneIntervalle(lesArguments) {}
    initialise(lesArguments) {}
    termineCorrectionAutomatique(lesArguments) {
        lesArguments._dib29 = true;
    }
    repondsACorrigeDansTexteur(lesArguments) {
        return this.envoieVersBackground(lesArguments);
    }
    repondsADonneLesZonesACorriger(lesArguments) {
        return this.envoieVersBackground(lesArguments);
    }
    repondsAPeutCorriger(lesArguments) {
        return this.envoieVersBackground(lesArguments);
    }
    repondsADonneTextePourOutils(lesArguments) {
        return this.envoieVersBackground(lesArguments);
    }
    repondsADocEstMort(lesArguments) {
        return this.envoieVersBackground(lesArguments);
    }
    repondsAInitialise(lesArguments) {
        return this.envoieVersBackground(lesArguments);
    }
    repondsATermineCorrectionAutomatique(lesArguments) {
        return this.envoieVersBackground(lesArguments);
    }
    donneNoeud() {
        return this.donneNoeud();
    }
    faisPeutCorriger(lesArguments) {
        this.jeUtiliseEnveloppeIntervalleTexte = lesArguments._dib104 !== cstIdAntidoteBureau;
        lesArguments._dib37 = decodeChaineDeJson(lesArguments._dib37);
        lesArguments._dib99 = decodeChaineDeJson(lesArguments._dib99);
        lesArguments.debutContexte = lesArguments.debutContexte !== undefined ? lesArguments.debutContexte : lesArguments._dib49;
        lesArguments.finContexte = lesArguments.finContexte !== undefined ? lesArguments.finContexte : lesArguments._dib50;
        lesArguments._dib29 = this.peutCorriger(lesArguments);
        return this.repondsAPeutCorriger(lesArguments);
    }
    async faisCorrigeAvecContexte(lesArguments) {
        this.jeUtiliseEnveloppeIntervalleTexte = lesArguments._dib104 !== cstIdAntidoteBureau;
        lesArguments._dib37 = decodeChaineDeJson(lesArguments._dib37);
        lesArguments._dib92 = decodeChaineDeJson(lesArguments._dib92);
        lesArguments._dib99 = decodeChaineDeJson(lesArguments._dib99);
        lesArguments.contexteRequete = cstContexteCorrection;
        lesArguments._dib29 = this.peutCorriger(lesArguments);
        if (lesArguments._dib29) {
            await this.corrigeDansTexteur(lesArguments);
        }
        this.erreur_log.type_agent_texteur = this.monTypeAT;
        if (!lesArguments._dib29) {
            lesArguments.erreur_log = this.erreur_log;
        }
        return this.repondsACorrigeDansTexteur(lesArguments);
    }
    async faisCorrigeDansTexteur(lesArguments) {
        lesArguments._dib37 = decodeChaineDeJson(lesArguments._dib37);
        lesArguments._dib99 = decodeChaineDeJson(lesArguments._dib99);
        await this.corrigeDansTexteur(lesArguments);
        lesArguments._dib29 = true;
        return this.repondsACorrigeDansTexteur(lesArguments);
    }
    async faisDonneLesZonesACorriger(lesArguments) {
        var desZonesJson = await this.donneLesZonesACorriger(lesArguments);
        if (desZonesJson !== undefined) {
            lesArguments._dib100 = desZonesJson;
            lesArguments._dib34 = encodeChainePourJson(gAgentTexteurGen.monContexteSelection);
            lesArguments._dib35 = gAgentTexteurGen.monDebutSelectionDsContexte;
            lesArguments._dib36 = gAgentTexteurGen.maFinSelectionDsContexte;
            if (lesArguments._dib100.length == 0) gAgentTexteur = null;
            return this.repondsADonneLesZonesACorriger(lesArguments);
        }
        return {};
    }
    faisSelectionneIntervalle(lesArguments) {
        if (this.blocDeCorrectionsEnCours) return;
        lesArguments._dib99 = decodeChaineDeJson(lesArguments._dib99);
        this.selectionneIntervalle(lesArguments);
    }
    faisRemplaceSelection(lesArguments) {
        lesArguments._dib37 = decodeChaineDeJson(lesArguments._dib37);
        this.remplaceSelection(lesArguments);
    }
    faisDonneTextePourOutils(lesArguments) {
        var desArguments = this.donneTextePourOutils();
        lesArguments._dib30 = desArguments !== undefined ? desArguments._dib30 : "";
        lesArguments._dib31 = desArguments !== undefined ? desArguments._dib31 : 0;
        lesArguments._dib32 = desArguments !== undefined ? desArguments._dib32 : 0;
        return this.repondsADonneTextePourOutils(lesArguments);
    }
    faisDocEstMort(lesArguments) {
        lesArguments._dib29 = this.docEstMort();
        return this.repondsADocEstMort(lesArguments);
    }
    faisInitPourCorrecteur(lesArguments) {
        this.initPourCorrecteur();
    }
    faisInitPourOutils(lesArguments) {
        this.initPourOutils();
    }
    faisRompsLienTexteur(lesArguments) {
        this.rompsLienTexteur();
    }
    faisRompsLienCorrecteur(lesArguments) {
        this.rompsLienCorrecteur();
    }
    faisSelectionneApresRemplace(lesArguments) {
        this.selectionneApresRemplace(lesArguments);
    }
    faisInitialise(lesArguments) {
        if (lesArguments.actualisation !== undefined) {
            this.actualisationFenAweb = true;
        } else {
            this.monPontCommunicationAvecBkg = lesArguments.pontCommunication;
            this.monGuidSession = uuidv4();
            lesArguments._dib93 = true;
            if (optionsTexteur !== undefined) {}
        }
        demandeFavIconUrl();
        lesArguments.nomApplication = encodeChainePourJson(mesDonneesGlobales.idTexteur);
        lesArguments.estGoogleDocs = false;
        lesArguments.lgMinPropositionComparaison = cstLgMinChaineProposerAvantCorrection;
        lesArguments.infoApplication = {
            nom: encodeChainePourJson(mesDonneesGlobales.idTexteur)
        };
        lesArguments._dib78 = false;
        lesArguments._dib72 = true;
        lesArguments._dib68 = true;
        lesArguments.formatTexte = cstFormatTexteInconnu;
        var url = new URL(window.document.URL);
        var domaine = url.hostname;
        lesArguments.domaine = domaine;
        this.initialise(lesArguments);
        gAgentTexteurGen = this;
        setTimeout(function() {
            lesArguments.iconeApplication = donneFavIconUrl();
            return gAgentTexteurGen.repondsAInitialise(lesArguments);
        }, 100);
    }
    faisRetourneAuTexteur(lesArguments) {
        lesArguments.pontCommunication = this.monPontCommunicationAvecBkg;
    }
    faisDebuteCorrectionAutomatique(lesArguments) {
        this.blocDeCorrectionsEnCours = true;
    }
    faisTermineCorrectionAutomatique(lesArguments) {
        this.blocDeCorrectionsEnCours = false;
        lesArguments._dib29 = true;
        this.termineCorrectionAutomatique(lesArguments);
        return this.repondsATermineCorrectionAutomatique(lesArguments);
    }
};