 /* 
 *	Ce document est la propriété intellectuelle de Druide informatique inc. Toute reproduction ou publication est interdite. 
 *  Copyright 2022 Druide informatique inc. 
 */
 const cstNouvelleLigneGrav = '\n';
var gEditeurDocumentGrav = null;

function InitGravDsPage() {
    window.addEventListener("message", gestionnaireMessageDsPage, false);
};

function envoieVersContentScript(leJSON) {
    window.postMessage(leJSON, "*");
};

function agentTexteurGravDsPage() {
    this.monCodeMirror = null;
    this.monDebutSelection;
    this.maFinSelection;
    this.maPosDebutSelectionDsDocGrav = null;
    this.maPosFinSelectionDsDocGrav = null;
    this.monContexteSelection;
    this.monDebutSelectionDsContexte;
    this.maFinSelectionDsContexte;
    this.maFinDocument;
    this.monTexte;
};

function gestionnaireMessageDsPage(event) {
    if (event.data.type != "TypeContentScript")
        return;
    var unMessage = event.data.message;
    var uneValeur;
    if (unMessage == "_pb12d") {
        uneValeur = false;
        if (gEditeurDocumentGrav == null) {
            gEditeurDocumentGrav = new agentTexteurGravDsPage();
        }
        if (gEditeurDocumentGrav.monCodeMirror == null) {
            var listeEditeurs = $('.grav-editor-content');
            var objetCM = null;
            for (var i = 0; i < listeEditeurs.length && objetCM == null; i++) {
                var identifiantJQuery = '.grav-editor-content:eq(' + i + ') > textarea';
                objetCM = $(identifiantJQuery).data('codemirror');
                if (!objetCM.hasFocus())
                    objetCM = null;
            }
            gEditeurDocumentGrav.monCodeMirror = objetCM;
        }
        uneValeur = (gEditeurDocumentGrav.monCodeMirror !== undefined && gEditeurDocumentGrav.monCodeMirror != null);
    } else {
        if (gEditeurDocumentGrav != null) {
            if (unMessage == "_pb36d" || unMessage == "donneTextePourOutils") {
                gEditeurDocumentGrav.synchronisePositions();
            } else if (unMessage == "_pb2d") {
                uneValeur = gEditeurDocumentGrav.docEstMort();
            } else if (unMessage == "_pb15d") {
                uneValeur = gEditeurDocumentGrav.peutCorriger(event.data._dib49, event.data._dib50, event.data._dib37);
            } else if (unMessage == "CorrigeAvecContexte") {
                uneValeur = gEditeurDocumentGrav.peutCorriger(event.data.debutContexte, event.data.finContexte, event.data._dib92);
                if (uneValeur)
                    gEditeurDocumentGrav.corrigeDansTexteur(event.data._dib49, event.data._dib50, event.data._dib37);
            } else if (unMessage == "_pb1d") {
                gEditeurDocumentGrav.corrigeDansTexteur(event.data._dib49, event.data._dib50, event.data._dib37);
                uneValeur = true;
            } else if (unMessage == "_pb10d") {
                gEditeurDocumentGrav.initPourCorrecteur();
            } else if (unMessage == "_pb11d") {
                gEditeurDocumentGrav.initPourOutils(event.data.outil);
            } else if (unMessage == "_pb16d") {
                gEditeurDocumentGrav.remplaceSelection(event.data._dib37);
            } else if (unMessage == "_pb18d") {
                gEditeurDocumentGrav.rompsLienTexteur();
            } else if (unMessage == "_pb20d") {
                gEditeurDocumentGrav.selectionneApresRemplace(event.data._dib53);
            } else if (unMessage == "_pb21d") {
                gEditeurDocumentGrav.selectionneIntervalle(event.data._dib49, event.data._dib50);
            }
        }
    }
    if (unMessage == "_pb2d" || unMessage == "_pb15d" || unMessage == "_pb10d" || unMessage == "_pb11d" || unMessage == "_pb1d" || unMessage == "CorrigeAvecContexte") {
        event.data.type = "TypePage";
        event.data._dib29 = uneValeur;
        envoieVersContentScript(event.data);
    } else if (unMessage == "_pb12d") {
        if (gEditeurDocumentGrav != null) {
            event.data.type = "TypePage";
            event.data._dib29 = uneValeur;
            envoieVersContentScript(event.data);
        }
    } else if (unMessage == "donneTextePourOutils") {
        event.data.type = "TypePage";
        event.data._dib30 = gEditeurDocumentGrav != null ? gEditeurDocumentGrav.monContexteSelection : "";
        event.data._dib31 = gEditeurDocumentGrav != null ? gEditeurDocumentGrav.monDebutSelectionDsContexte : 0;
        event.data._dib32 = gEditeurDocumentGrav != null ? gEditeurDocumentGrav.maFinSelectionDsContexte : 0;
        envoieVersContentScript(event.data);
    } else if (unMessage == "_pb36d") {
        event.data.type = "TypePage";
        event.data._dib30 = gEditeurDocumentGrav != null ? gEditeurDocumentGrav.monTexte : "";
        event.data._dib31 = gEditeurDocumentGrav != null ? gEditeurDocumentGrav.monDebutSelection : 0;
        event.data._dib32 = gEditeurDocumentGrav != null ? gEditeurDocumentGrav.maFinSelection : 0;
        event.data.selection = gEditeurDocumentGrav != null ? gEditeurDocumentGrav.donneSelection() : "";
        event.data._dib34 = gEditeurDocumentGrav != null ? gEditeurDocumentGrav.monContexteSelection : "";
        event.data._dib35 = gEditeurDocumentGrav != null ? gEditeurDocumentGrav.monDebutSelectionDsContexte : 0;
        event.data._dib36 = gEditeurDocumentGrav != null ? gEditeurDocumentGrav.maFinSelectionDsContexte : 0;
        envoieVersContentScript(event.data);
    }
};

function Pos(line, ch) {
    if (!(this instanceof Pos)) {
        return new Pos(line, ch)
    }
    this.line = line;
    this.ch = ch
};
agentTexteurGravDsPage.prototype.convertisPostionAntidoteACodeMirror = function(laPosition) {
    var nbLignes = this.monCodeMirror.doc.lineCount();
    var texteADate = "";
    for (var i = 0; i < nbLignes; i++) {
        var texteLigne = this.monCodeMirror.doc.getLine(i);
        if (texteADate.length + texteLigne.length >= laPosition) {
            var unePos = Pos(i, laPosition - texteADate.length);
            return unePos;
        }
        texteADate += texteLigne;
        texteADate += cstNouvelleLigneGrav;
    }
    return null;
};
agentTexteurGravDsPage.prototype.convertisPostionCodeMirrorAAntidote = function(laPosGrav) {
    var nbLignes = this.monCodeMirror.doc.lineCount();
    var texteADate = "";
    for (var i = 0; i < nbLignes; i++) {
        if (i < laPosGrav.line) {
            var texteLigne = this.monCodeMirror.doc.getLine(i);
            texteADate += texteLigne;
            texteADate += cstNouvelleLigneGrav;
        } else if (i == laPosGrav.line) {
            return texteADate.length + laPosGrav.ch;
        }
    }
    return null;
};
agentTexteurGravDsPage.prototype.reInitialiseSelection = function() {
    this.monDebutSelection = 0;
    this.maFinSelection = 0;
    var texteSel = this.monCodeMirror.doc.getSelection();
    var selection = this.monCodeMirror.doc.listSelections()[0];
    var ancre = selection.anchor;
    var tete = selection.head;
    if (ancre.line < tete.line) {
        this.maPosDebutSelectionDsDocGrav = ancre;
        this.maPosFinSelectionDsDocGrav = tete;
    } else if (ancre.line > tete.line) {
        this.maPosDebutSelectionDsDocGrav = tete;
        this.maPosFinSelectionDsDocGrav = ancre;
    } else {
        if (ancre.ch < tete.ch) {
            this.maPosDebutSelectionDsDocGrav = ancre;
            this.maPosFinSelectionDsDocGrav = tete;
        } else {
            this.maPosDebutSelectionDsDocGrav = tete;
            this.maPosFinSelectionDsDocGrav = ancre;
        }
    }
    this.monDebutSelection = this.convertisPostionCodeMirrorAAntidote(this.maPosDebutSelectionDsDocGrav);
    this.maFinSelection = this.convertisPostionCodeMirrorAAntidote(this.maPosFinSelectionDsDocGrav);
};
agentTexteurGravDsPage.prototype.initialiseSelection = function() {
    this.reInitialiseSelection();
};
agentTexteurGravDsPage.prototype.initialiseTexteur = function(estCorrecteur) {
    this.reInitialiseTexteur();
};
agentTexteurGravDsPage.prototype.initPourCorrecteur = function() {
    this.initialiseTexteur(true);
};
agentTexteurGravDsPage.prototype.initPourOutils = function(lOutil) {
    this.initialiseTexteur(false);
};
agentTexteurGravDsPage.prototype.corrigeDansTexteur = function(leDebut, laFin, laChaine) {
    var _dib49 = this.convertisPostionAntidoteACodeMirror(leDebut);
    var _dib50 = this.convertisPostionAntidoteACodeMirror(laFin);
    if (_dib49 != null && _dib50 != null) {
        this.monCodeMirror.doc.replaceRange(laChaine, _dib49, _dib50);
        this.monCodeMirror.save();
    }
};
agentTexteurGravDsPage.prototype.docEstMort = function() {
    return !(gEditeurDocumentGrav.monCodeMirror !== undefined && gEditeurDocumentGrav.monCodeMirror != null);
};
agentTexteurGravDsPage.prototype.donneBloc = function(posDebut, posFin) {
    return this.monTexte.substr(posDebut, posFin - posDebut);
};
agentTexteurGravDsPage.prototype.donneSelection = function() {
    return this.monCodeMirror.doc.getSelection();
};
agentTexteurGravDsPage.prototype.rompsLienCorrecteur = function() {};
agentTexteurGravDsPage.prototype.rompsLienTexteur = function() {
    this.monCodeMirror = null;
    this.maPosDebutSelectionDsDocGrav = null;
    this.maPosFinSelectionDsDocGrav = null;
};
agentTexteurGravDsPage.prototype.peutCorriger = function(leDebut, laFin, laGraphieOriginale) {
    var _dib49 = this.convertisPostionAntidoteACodeMirror(leDebut);
    var _dib50 = this.convertisPostionAntidoteACodeMirror(laFin);
    if (_dib49 != null && _dib50 != null) {
        var uneChaine = this.monCodeMirror.doc.getRange(_dib49, _dib50);
        return uneChaine == laGraphieOriginale;
    }
    return false;
};
agentTexteurGravDsPage.prototype.remplaceSelection = function(laChaine) {
    var temp = Pos(this.maPosDebutSelectionDsDocGrav.line, this.maPosDebutSelectionDsDocGrav.ch);
    this.monCodeMirror.doc.replaceSelection(laChaine);
    this.maPosDebutSelectionDsDocGrav = Pos(temp.line, temp.ch);
    this.maPosFinSelectionDsDocGrav = Pos(temp.line, temp.ch);
    temp = null;
};
agentTexteurGravDsPage.prototype.selectionneIntervalle = function(leDebut, laFin) {
    this.maPosDebutSelectionDsDocGrav = this.convertisPostionAntidoteACodeMirror(leDebut);
    this.maPosFinSelectionDsDocGrav = this.convertisPostionAntidoteACodeMirror(laFin);
    if (this.maPosDebutSelectionDsDocGrav != null && this.maPosFinSelectionDsDocGrav != null) {
        this.monCodeMirror.doc.setSelection(this.maPosDebutSelectionDsDocGrav, this.maPosFinSelectionDsDocGrav);
    }
};
agentTexteurGravDsPage.prototype.selectionneApresRemplace = function(lgSel) {
    if (this.maPosDebutSelectionDsDocGrav) {
        this.maPosFinSelectionDsDocGrav = null;
        var texteLigne = this.monCodeMirror.doc.getLine(this.maPosDebutSelectionDsDocGrav.line);
        var texteADate = texteLigne.substr(this.maPosDebutSelectionDsDocGrav.ch, texteLigne.length - this.maPosDebutSelectionDsDocGrav.ch);
        if (texteADate.length >= lgSel) {
            this.maPosFinSelectionDsDocGrav = Pos(this.maPosDebutSelectionDsDocGrav.line, this.maPosDebutSelectionDsDocGrav.ch + lgSel);
        } else {
            var indiceLigne = this.maPosDebutSelectionDsDocGrav.line;
            do {
                texteLigne = this.monCodeMirror.doc.getLine(indiceLigne);
                if (texteADate.length + texteLigne.length >= lgSel) {
                    this.maPosFinSelectionDsDocGrav = Pos(indiceLigne, lgSel - texteADate.length);
                }
                texteADate += texteLigne;
                texteADate += cstNouvelleLigneGrav;
                indiceLigne++;
            } while (this.maPosFinSelectionDsDocGrav == null && indiceLigne < this.monCodeMirror.doc.lineCount());
        }
        if (this.maPosFinSelectionDsDocGrav != null)
            this.monCodeMirror.doc.setSelection(this.maPosDebutSelectionDsDocGrav, this.maPosFinSelectionDsDocGrav);
    }
};
agentTexteurGravDsPage.prototype.synchronisePositions = function() {
    this.monTexte = "";
    this.maFinDocument = 0;
    var nbLignes = this.monCodeMirror.doc.lineCount();
    for (var i = 0; i < nbLignes; i++) {
        this.monTexte += this.monCodeMirror.doc.getLine(i);
        if (i < nbLignes - 1)
            this.monTexte += cstNouvelleLigneGrav;
    }
    this.initialiseSelection();
    this.maFinDocument = this.monTexte.length;
    this.monContexteSelection = this.monTexte;
    this.monDebutSelectionDsContexte = this.monDebutSelection;
    this.maFinSelectionDsContexte = this.maFinSelection;
};
agentTexteurGravDsPage.prototype.donnePosFinBoite = function(position) {
    return this.monTexte.length;
};