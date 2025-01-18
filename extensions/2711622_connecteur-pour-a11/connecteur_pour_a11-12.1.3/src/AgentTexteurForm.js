 /* 
 *	Ce document est la propriété intellectuelle de Druide informatique inc. Toute reproduction ou publication est interdite. 
 *  Copyright 2022 Druide informatique inc. 
 */
 function estUnElementVisible(element) {
    if (element == null)
        return false;
    if (!estVisible(element)) {
        return false;
    }
    var parentEstVisible = true;
    var unParent = element.parentNode;
    if (unParent != null)
        parentEstVisible = estUnElementVisible(unParent);
    var nouedEstVisible = true;
    var lesAttributs = element.attributes;
    if (lesAttributs != null) {
        var nbAttribues = lesAttributs.length;
        var trouve = false;
        for (var i = 0; i < nbAttribues && !trouve; i++) {
            var unAttribut = lesAttributs.item(i);
            var nomAttribut = unAttribut.nodeName;
            var valeurAttribut = unAttribut.value.toLowerCase();
            if ((nomAttribut == cstChaineStyle && valeurAttribut == cstChaineHidden) || (nomAttribut == cstChaineStyle && valeurAttribut == cstChaineHidden) || (nomAttribut == cstChaineStyle && valeurAttribut == "display:none"))
                nouedEstVisible = false;
        }
    }
    return nouedEstVisible && parentEstVisible;
};

function estUnElementMotDePasse(element) {
    var unAttributStyle = "";
    var unAttributType = "";
    if (element.getAttribute(cstChaineStyle) != null)
        unAttributStyle = element.getAttribute(cstChaineStyle);
    if (element.getAttribute(cstChaineType) != null)
        unAttributType = element.getAttribute(cstChaineType);
    if (unAttributStyle == cstChainePassword || unAttributType == cstChainePassword)
        return true;
    if (element.autocomplete !== undefined && element.autocomplete == "current-password")
        return true;
    return false;
};

function estUnElementEstCourriel(element) {
    var unAttributStyle = "";
    var unAttributType = "";
    if (element.getAttribute(cstChaineStyle) != null)
        unAttributStyle = element.getAttribute(cstChaineStyle);
    if (element.getAttribute(cstChaineType) != null)
        unAttributType = element.getAttribute(cstChaineType);
    if (unAttributStyle == cstChaineEmail || unAttributType == cstChaineEmail)
        return true;
    return false;
};

function estUnElementValide(element) {
    return !estUnElementMotDePasse(element) && !estUnElementEstCourriel(element);
};

function estUnElementAPIValide(element) {
    if (element.dataset.antidoteapi_jsconnect_ignore !== undefined && element.dataset.antidoteapi_jsconnect_ignore != null) {
        if (element.dataset.antidoteapi_jsconnect_ignore == "true")
            return cstElementAPINonValide;
        else
            return cstElementAPIValide;
    }
    return cstElementAPINonDefini;
};

function estUnElementTextareaValide(element) {
    var estValide = estUnElementAPIValide(element);
    return estValide != cstElementAPINonValide;
};

function estUnElementInputValide(element) {
    try {
        if (element == null || element.tagName.toLowerCase() != cstNomNoeudInput)
            return false;
        if (estUnElementValide(element))
            return false;
        var estAPIValide = estUnElementAPIValide(element);
        if (estAPIValide == cstElementAPINonValide) {
            return false;
        }
        if (estAPIValide == cstElementAPIValide) {
            return true;
        }
        var estValide = false;
        var lesAttributs = element.attributes;
        if (lesAttributs != null) {
            var unType = "";
            var unNom = "";
            var attributValeurPresent = false;
            var nbAttribues = lesAttributs.length;
            for (var i = 0; i < nbAttribues; i++) {
                var unAttribut = lesAttributs.item(i);
                var nomAttribut = unAttribut.nodeName;
                if (nomAttribut == cstChaineType) {
                    unType = unAttribut.nodeValue;
                } else if (nomAttribut == cstChaineValue) {
                    attributValeurPresent = true;
                } else if (nomAttribut == cstChaineName) {
                    unNom = unAttribut.nodeValue;
                }
            }
        }
        if (unNom == "subjectbox")
            jeSuisSubjectbox = true;
        if (jeSuisSubjectbox && unNom == "subject") {
            jeSuisSubjectbox = false;
            return false;
        }
        if (unType == cstChaineText || (unType == "" && attributValeurPresent) || unNom == cstChaineSubject || unNom == "subjectbox") {
            return true;
        }
    } catch (erreur) {
        console.error("agentform.estUnElementInputValide", erreur);
    }
    return false;
};
class AgentTexteurFormulaire extends AgentTexteurGen {
    constructor() {
        super();
        this.mesElements = [];
        this.monElement;
        this.monElementSelectionnay;
        this.monElementID;
        this.monDebutSelectionDsZoneCourante;
        this.maFinSelectionDsZoneCourante;
        this.maFinDocument;
        this.jeSuisUnElementCorrecteur = false;
        this.monSafariFormulaireElement = null;
        this.monSafariFormulaireDebutSelection = 0;
        this.monSafariFormulaireFinSelection = 0;
        this.utiliseExecCommand = true;
        if (this.monTypeAT === undefined)
            this.monTypeAT = cstTypeAgentTexteur.AgentTexteurForm;
    }
    donneNoeud() {
        return this.monElement;
    }
    peutCorriger(lesArguments) {
        var unElement = null;
        var chaineAComparer = lesArguments._dib92 !== undefined ? lesArguments._dib92 : lesArguments._dib37;
        this.erreur_log.infos_recues.chaine_a_comparer = traiteElementLog(chaineAComparer);
        this.erreur_log.infos_recues.origine = lesArguments._dib92 !== undefined ? "_dib92" : "_dib37";
        this.erreur_log.infos_recues.debut_contexte = traiteElementLog(lesArguments.debutContexte);
        this.erreur_log.infos_recues.fin_contexte = traiteElementLog(lesArguments.finContexte);
        if (this.donneSiConsidereUnSeulElement()) {
            unElement = this.monElement;
        } else {
            var index = parseInt(lesArguments._dib99);
            if (lesArguments._dib99 < this.mesElements.length) {
                unElement = this.mesElements[index].value;
            }
        }
        this.erreur_log.infos_contexte.texte_zone = traiteElementLog(unElement.value);
        if (unElement) {
            if (this.jeUtiliseEnveloppeIntervalleTexte) {
                let contexteComparaison = lesArguments._dib92 !== undefined ? lesArguments._dib92 : lesArguments._dib37;
                let debutDuContexte = lesArguments.debutContexte;
                let finDuContexte = lesArguments.finContexte;
                this.monEnveloppeIntervalleZoneDeTexte.calculeIntervalleComparaison(unElement.value, lesArguments._dib49, lesArguments._dib50, debutDuContexte, finDuContexte);
                var debutProposay = this.monEnveloppeIntervalleZoneDeTexte.debutContexte;
                var finProposay = this.monEnveloppeIntervalleZoneDeTexte.finContexte;
                if (debutProposay < debutDuContexte) debutProposay = debutDuContexte;
                if (finProposay > finDuContexte) finProposay = finDuContexte;
                chaineAComparer = contexteComparaison.substring(debutProposay - debutDuContexte, finProposay - debutDuContexte);
                lesArguments.debutContexte = debutProposay;
                lesArguments.finContexte = finProposay;
                this.erreur_log.infos_recues.chaine_a_comparer_enveloppe = traiteElementLog(chaineAComparer);
                this.erreur_log.infos_recues.debut_contexte_enveloppe = lesArguments.debutContexte;
                this.erreur_log.infos_recues.fin_contexte_enveloppe = lesArguments.finContexte;
            }
            var unTexte = unElement.value.substr(lesArguments.debutContexte, lesArguments.finContexte - lesArguments.debutContexte);
            this.erreur_log.infos_calcules.texte_trouvay_essai_1 = traiteElementLog(unTexte);
            return unTexte == chaineAComparer;
        }
        return false;
    }
    async corrigeDansTexteur(lesArguments) {
        var cumul = 0;
        var unTexteOriginal = "";
        if (this.donneSiConsidereUnSeulElement()) {
            unTexteOriginal = await this.corrigeDansTexteurPourElement(this.monElement, lesArguments._dib49, lesArguments._dib50, lesArguments._dib37, false);
        } else {
            var index = parseInt(lesArguments._dib99);
            if (lesArguments._dib99 < this.mesElements.length) {
                var unElement = this.mesElements[index].value;
                unTexteOriginal = await this.corrigeDansTexteurPourElement(unElement, lesArguments._dib49, lesArguments._dib50, lesArguments._dib37, false);
            }
        }
        this.donneLesZonesACorriger();
        window.postMessage({
            message: "sauvegarde",
            type: "TypeContentScriptPourAPIJSConnect"
        }, "*");
        return unTexteOriginal;
    }
    docEstMort() {
        return !this.jeSuisInitialisay;
    }
    donneLesZonesACorriger(lesArguments) {
        this.synchronise();
        return this.donneRepresentationDesZones();
    }
    donneTextePourOutils() {
        this.synchronise();
        if (this.monSafariFormulaireElement != null && (estSafariAppex() || estSafariWebex())) {
            this.initialiseSelection();
        }
        this.monDebutSelectionDsZoneCourante = this.monDebutSelectionDsContexte;
        this.maFinSelectionDsZoneCourante = this.maFinSelectionDsContexte;
        var edit_arg = {
            _dib30: encodeChainePourJson(this.monContexteSelection),
            _dib31: this.monDebutSelectionDsContexte,
            _dib32: this.maFinSelectionDsContexte
        };
        return edit_arg;
    }
    initPourCorrecteur() {
        this.initialiseTexteur();
    }
    initPourOutils() {
        this.initialiseTexteur();
    }
    remplaceSelection(lesArguments) {
        if (this.monDebutSelectionDsZoneCourante >= 0 && this.maFinSelection >= 0)
            this.corrigeDansTexteurPourElement(this.monElementSelectionnay, this.monDebutSelectionDsZoneCourante, this.maFinSelectionDsZoneCourante, lesArguments._dib37, true);
    }
    rompsLienCorrecteur() {}
    rompsLienTexteur() {
        this.jeSuisInitialisay = false;
        this.jAiPlusieursElementsAPI = false;
        this.jeSUISAPI = false;
        this.jeSuisLiayAPI = false;
    }
    selectionneApresRemplace(lesArguments) {
        if (this.monDebutSelectionDsZoneCourante >= 0)
            this.maFinSelectionDsZoneCourante = this.monDebutSelectionDsZoneCourante + lesArguments._dib53;
        lesArguments._dib49 = this.monDebutSelectionDsZoneCourante;
        lesArguments._dib50 = this.maFinSelectionDsZoneCourante;
        this.selectionneIntervalle(lesArguments);
    }
    selectionneIntervalle(lesArguments) {
        var leDebut = lesArguments._dib49;
        var laFin = lesArguments._dib50;
        if (this.donneSiConsidereUnSeulElement()) {
            this.monElement.focus();
            this.monElement.setSelectionRange(leDebut, laFin);
            this.monElementSelectionnay = this.monElement;
        } else {
            var index = parseInt(lesArguments._dib99);
            if (index < this.mesElements.length) {
                this.monElementSelectionnay = this.mesElements[index].value;
                this.monElementSelectionnay.focus();
                this.monElementSelectionnay.setSelectionRange(leDebut, laFin);
            }
        }
        this.monDebutSelectionDsZoneCourante = leDebut;
        this.maFinSelectionDsZoneCourante = laFin;
        if (!!this.monElementSelectionnay && this.monElementSelectionnay.clientHeight < this.monElementSelectionnay.ownerDocument.defaultView.innerHeight) {
            this.monElementSelectionnay.scrollIntoView({
                block: "center",
                behavior: "smooth"
            });
        }
    }
    donneSiConsidereUnSeulElement() {
        return (!this.jAiPlusieursElementsAPI && this.monElement !== undefined && this.monElement != null && this.monElement.value !== undefined && !estBody(this.monElement) && !estBouton(this.monElement));
    }
    donneSelection() {
        if (this.maSelection != null)
            return this.maSelection.toString();
        return "";
    }
    reInitialiseTexteur() {
        this.maFenetre = null;
        this.monDocument = null;
        this.monTitre = "";
        this.monTexte = "";
        this.jeSuisInitialisay = false;
        this.mesElements = [];
        this.maFinDocument = 0;
    }
    reInitialiseSelection() {
        this.monDebutSelection = 0;
        this.maFinSelection = 0;
        this.maSelection = null;
        this.monContexte = null;
        this.monDebutSelectionDsContexte = 0;
        this.maFinSelectionDsContexte = 0;
    }
    initialiseSelection() {
        this.reInitialiseSelection();
        this.maFenetre = window;
        this.monDocument = this.maFenetre.document;
        this.monElementSelectionnay = null;
        this.jeSuisUnElementCorrecteur = false;
        try {
            if (this.monSafariFormulaireElement != null && (estSafariAppex() || estSafariWebex())) {
                this.monSafariFormulaireElement.select();
                this.monSafariFormulaireElement.setSelectionRange(this.monSafariFormulaireDebutSelection, this.monSafariFormulaireFinSelection);
            }
            if (this.donneSiConsidereUnSeulElement()) {
                if (this.monOutil == chaineCommandeC0) {
                    this.monDebutSelection = 0;
                    this.maFinSelection = this.monTexte.length;
                    this.jeSuisUnElementCorrecteur = true;
                } else {
                    this.monDebutSelection = this.monElement.selectionStart;
                    this.maFinSelection = this.monElement.selectionEnd;
                }
                this.maSelection = this.monTexte.substr(this.monDebutSelection, this.maFinSelection - this.monDebutSelection);
                this.monContexteSelection = this.monTexte;
                this.monDebutSelectionDsContexte = this.monElement.selectionStart;
                this.maFinSelectionDsContexte = this.monElement.selectionEnd;
                this.monElementSelectionnay = this.monElement;
            } else {
                if (this.monOutil == chaineCommandeC0) {
                    this.monContexteSelection = this.monTexte;
                    this.monDebutSelectionDsContexte = 0;
                    this.maFinSelectionDsContexte = this.monTexte.length;
                } else {
                    this.monDocument = trouveDocumentAvecSelection(document, false);
                    if (this.monDocument != null) {
                        this.maSelection = this.monDocument.getSelection();
                    }
                    this.monContexteSelection = this.donneSelection();
                    this.monDebutSelectionDsContexte = 0;
                    this.maFinSelectionDsContexte = this.monContexteSelection.length;
                }
            }
        } catch (erreur) {
            console.error("agentform.initialiseSelection", erreur);
            this.reInitialiseTexteur();
        }
    }
    estDsListeElements(source) {
        var trouve = false;
        for (var i = 0; i < this.mesElements.length && !trouve; i++) {
            if (this.mesElements[i].value == source)
                trouve = true;
        }
        return trouve;
    }
    ajouteFormes(source) {
        if (source == null)
            return;
        try {
            if (!source.getElementsByTagName)
                return;
            var zonesDeTextes = source.getElementsByTagName(cstNomNoeudTextArea);
            for (var i = 0; i < zonesDeTextes.length; i++) {
                var uneZoneDeTexte = zonesDeTextes[i];
                if (estUnElementVisible(uneZoneDeTexte) && !this.estDsListeElements(uneZoneDeTexte) && estUnElementTextareaValide(uneZoneDeTexte)) {
                    this.mesElements.push(new referenceObjet(uneZoneDeTexte));
                }
            }
            var inputs = source.getElementsByTagName(cstNomNoeudInput);
            for (var i = 0; i < inputs.length; i++) {
                var unInput = inputs[i];
                if (estUnElementVisible(unInput) && estUnElementInputValide(unInput) && !this.estDsListeElements(unInput)) {
                    this.mesElements.push(new referenceObjet(unInput));
                }
            }
        } catch (erreur) {
            console.error("agentform.ajouteFormes", erreur);
        }
    }
    ajouteLesElementsFormulaireRecursif(source) {
        try {
            var unDocument = (estMozilla() ? window.content.document : document);
            this.ajouteFormes(unDocument);
            var iframes = window.document.getElementsByTagName(cstNomNoeudIframe);
            for (let i = 0; i < iframes.length; i++) {
                if (estElementAccessible(iframes[i])) {
                    this.ajouteLesElementsFormulaire(iframes[i].contentDocument);
                }
            }
            var frames = window.document.getElementsByTagName(cstNomNoeudFrame);
            for (let i = 0; i < frames.length; i++) {
                if (estElementAccessible(frames[i])) {
                    this.ajouteLesElementsFormulaire(frames[i].contentDocument);
                }
            }
        } catch (erreur) {
            console.error("agentform.ajouteLesElementsFormulaireRecursif", erreur);
        }
    }
    ajouteLesElementsFormulaire(leDoc) {
        var unDoc = leDoc;
        this.ajouteFormes(unDoc);
        try {
            var iframes = unDoc.getElementsByTagName(cstNomNoeudIframe);
            if (iframes != null) {
                for (let i = 0; i < iframes.length; i++) {
                    if (estElementAccessible(iframes[i])) {
                        this.ajouteFormes(iframes[i].contentDocument);
                    }
                }
            }
            if (iframes != null) {
                var frames = unDoc.getElementsByTagName(cstNomNoeudFrame);
                for (let i = 0; i < frames.length; i++) {
                    if (estElementAccessible(frames[i])) {
                        this.ajouteFormes(frames[i].contentDocument);
                    }
                }
            }
        } catch (erreur) {
            console.error("agentform.ajouteLesElementsFormulaire", erreur);
        }
    }
    donneRepresentationDesZones() {
        var desZonesJson = [];
        var index = 0;
        if (this.donneSiConsidereUnSeulElement() && estUnElementValide(this.monElement)) {
            var uneZoneJson = {
                _dib99: encodeChainePourJson(index.toString()),
                _dib30: encodeChainePourJson(this.monElement.value),
                _dib31: this.jeSUISAPI ? 0 : this.monElement.selectionStart,
                _dib32: this.jeSUISAPI ? 0 : this.monElement.selectionEnd,
                d: this.monElement.selectionStart,
                f: this.monElement.selectionEnd,
                _dib97: []
            };
            desZonesJson[index] = uneZoneJson;
        } else {
            var uneZoneJson = null;
            for (index = 0; index < this.mesElements.length; index++) {
                var unElement = this.mesElements[index].value;
                if (estUnElementValide(unElement)) {
                    var uneZoneJson = {
                        _dib99: encodeChainePourJson(index.toString()),
                        _dib30: encodeChainePourJson(unElement.value),
                        _dib31: this.jeSUISAPI ? 0 : unElement.selectionStart,
                        _dib32: this.jeSUISAPI ? 0 : unElement.selectionEnd,
                        d: unElement.selectionStart,
                        f: unElement.selectionEnd,
                        _dib97: []
                    };
                    desZonesJson.push(uneZoneJson);
                }
            }
        }
        return desZonesJson;
    }
    synchronise() {
        try {
            this.monTexte = "";
            this.monDebutSelectionDsZoneCourante = 0;
            this.maFinSelectionDsZoneCourante = 0;
            this.maFinDocument = 0;
            if (this.donneSiConsidereUnSeulElement()) {
                if (estUnElementValide(this.monElement)) {
                    this.monTexte = this.monElement.value;
                    this.maFinDocument = this.monTexte.length;
                }
            } else {
                if (this.mesElements) {
                    for (let i = 0; i < this.mesElements.length; i++)
                        this.monTexte += this.mesElements[i].value.value;
                    this.maFinSelection = this.monTexte.length;
                    this.maFinDocument = this.maFinSelection;
                }
            }
            this.initialiseSelection();
        } catch (erreur) {
            console.error("agentform.synchronise", erreur);
            this.reInitialiseSelection();
        }
    }
    initialiseTexteur() {
        if (this.actualisationFenAweb) {
            this.actualisationFenAweb = false;
            return;
        }
        this.reInitialiseTexteur();
        this.maFenetre = window;
        this.monDocument = document;
        this.monTitre = document.title;
        this.jeSuisInitialisay = true;
        try {
            this.monDocument = (estMozilla() ? this.maFenetre.document : trouveDocumentAvecSelection(document, false));
            if (this.monDocument != null) {
                this.monDocument = this.monDocument.contentDocument === undefined ? this.monDocument : this.monDocument.contentDocument;
                this.monElement = estUnElementValide(this.monDocument.activeElement) ? this.monDocument.activeElement : null;
            } else {
                this.monDocument = window.document;
                this.monElement = estUnElementValide(this.monDocument.activeElement) ? this.monDocument.activeElement : null;
                if (estIFrame(this.monElement)) {
                    this.monDocument = this.monElement.contentDocument;
                    if (this.monDocument != null)
                        this.monElement = this.monElement.contentDocument.activeElement;
                }
            }
            if (this.jAiPlusieursElementsAPI && this.jeSUISAPI) {
                this.mesElements = this.mesElementsPourAPI;
                this.mesElementsPourAPI = [];
            } else {
                if (this.estDW) {
                    this.monElement = this.monElementPourDW;
                    this.jeSuisLiayAPI = false;
                }
                if (this.jeSUISAPI) {
                    this.monElement = this.monElementPourAPI;
                    this.jeSuisLiayAPI = false;
                }
                if (this.monElement == null || !this.jeSUISAPI) {
                    this.ajouteLesElementsFormulaire(this.monDocument);
                }
            }
        } catch (erreur) {
            console.error("agentform.initialiseTexteur ", erreur);
            this.jeSuisInitialisay = false;
        }
    }
    textAreaEstAssociayAUnChampCachay(leTextArea, leElementInput) {
        var trouve = false;
        if (leTextArea != null) {
            var parentDomNode = leTextArea.parentNode;
            if (parentDomNode != null) {
                var grandParentDomNode = parentDomNode.parentNode;
                if (grandParentDomNode != null) {
                    var arriereGrandParentDomNode = grandParentDomNode.parentNode;
                    if (arriereGrandParentDomNode != null) {
                        var unFrere = arriereGrandParentDomNode.nextSibling;
                        if (unFrere != null) {
                            if (estInput(unFrere)) {
                                if (!(estUnElementVisible(unFrere) && estUnElementInputValide(unFrere))) {
                                    if (unFrere.value == leTextArea.value) {
                                        trouve = true;
                                        leElementInput.value = unFrere;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return trouve;
    }
    async corrigeChamp(leElementInput, debutDsElement, finDsElement, laChaine, estRemplacement) {
        var _dib29 = leElementInput.value;
        var monTexteOriginal = "";
        if (this.jeUtiliseEnveloppeIntervalleTexte) {
            this.monEnveloppeIntervalleZoneDeTexte.ajusteCorrectionIntervalleVide(debutDsElement, finDsElement, laChaine, _dib29);
            debutDsElement = this.monEnveloppeIntervalleZoneDeTexte.debutContexte;
            finDsElement = this.monEnveloppeIntervalleZoneDeTexte.finContexte;
            laChaine = this.monEnveloppeIntervalleZoneDeTexte._dib92;
        }
        var tailleElement = _dib29.length;
        if (debutDsElement <= finDsElement && (debutDsElement >= 0 && debutDsElement <= tailleElement) && (finDsElement >= 0 && finDsElement <= tailleElement)) {
            monTexteOriginal = this.monTexte.substring(debutDsElement, finDsElement);
            let essaieSansExecCommand = true;
            if (this.utiliseExecCommand) {
                if (!estRemplacement) {
                    leElementInput.selectionStart = debutDsElement;
                    leElementInput.selectionEnd = finDsElement;
                    await attendreAsync(20);
                }
                essaieSansExecCommand = !leElementInput.ownerDocument.execCommand("insertText", false, laChaine);
            }
            if (!this.utiliseExecCommand || essaieSansExecCommand) {
                var chaineDebut = _dib29.substring(0, debutDsElement);
                var chaineFin = _dib29.substring(finDsElement, tailleElement);
                _dib29 = chaineDebut + laChaine + chaineFin;
                leElementInput.value = _dib29;
                var event = new Event('input');
                leElementInput.dispatchEvent(event);
            }
        }
        return monTexteOriginal;
    }
    async corrigeDansTexteurPourElement(lElement, leDebut, laFin, laChaine, estRemplacement) {
        if (estRemplacement === undefined) estRemplacement = false;
        if (estTextarea(lElement)) {
            var unElementInput = new referenceObjet(null);
            if (this.textAreaEstAssociayAUnChampCachay(lElement, unElementInput))
                await this.corrigeChamp(unElementInput.value, leDebut, laFin, laChaine, estRemplacement);
            unElementInput = null;
        }
        return await this.corrigeChamp(lElement, leDebut, laFin, laChaine, estRemplacement);;
    }
    reinitPositionDebut(laPosition) {}
    donnePositionDebut() {
        return 0;
    }
};