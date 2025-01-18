 /* 
 *	Ce document est la propriété intellectuelle de Druide informatique inc. Toute reproduction ou publication est interdite. 
 *  Copyright 2022 Druide informatique inc. 
 */
 const cstTypeMessagePage = "TypePage";
var gAgentTexteurGrav = null;
var gEcouteEstInitialisay = false;
class AgentTexteurGrav extends AgentTexteurGen {
    constructor() {
        super();
        this.maPosDebutSelectionDsDocGrav = null;
        this.maPosFinSelectionDsDocGrav = null;
        if (this.monTypeAT === undefined)
            this.monTypeAT = cstTypeAgentTexteur.AgentTexteurGrav;
        if (!gEcouteEstInitialisay) {
            window.addEventListener("message", gestionnaireMessageGrav, false);
            gEcouteEstInitialisay = true;
        }
        gAgentTexteurGrav = this;
    }
    initialise(lesArguments) {
        lesArguments.formatTexte = cstFormatTexteMarkdown;
    }
    rompsLienCorrecteur() {}
    rompsLienTexteur() {
        this.jeSuisInitialisay = false;
        this.EnvoieRequete({
            message: "_pb18d"
        });
    }
    peutCorriger(lesArguments) {
        if (lesArguments.contexteRequete === cstContexteCorrection) {} else {
            if (this.jeUtiliseEnveloppeIntervalleTexte) {
                let contexteComparaison = lesArguments._dib92 !== undefined ? lesArguments._dib92 : lesArguments._dib37;
                let debutDuContexte = lesArguments.debutContexte;
                let finDuContexte = lesArguments.finContexte;
                this.monEnveloppeIntervalleZoneDeTexte.calculeIntervalleComparaison(this.monTexte, lesArguments._dib49, lesArguments._dib50, debutDuContexte, finDuContexte);
                var debutProposay = this.monEnveloppeIntervalleZoneDeTexte.debutContexte;
                var finProposay = this.monEnveloppeIntervalleZoneDeTexte.finContexte;
                if (debutProposay < debutDuContexte) debutProposay = debutDuContexte;
                if (finProposay > finDuContexte) finProposay = finDuContexte;
                lesArguments._dib37 = contexteComparaison.substring(debutProposay - debutDuContexte, finProposay - debutDuContexte);
                lesArguments._dib49 = debutProposay;
                lesArguments._dib50 = finProposay;
            } else {
                if (lesArguments._dib92 !== undefined)
                    lesArguments._dib37 = lesArguments._dib92;
            }
            this.EnvoieRequete(lesArguments);
        }
        return true;
    }
    remplaceSelection(lesArguments) {
        this.EnvoieRequete(lesArguments);
    }
    selectionneIntervalle(lesArguments) {
        this.EnvoieRequete(lesArguments);
    }
    selectionneApresRemplace(lesArguments) {
        this.EnvoieRequete(lesArguments);
    }
    donneLesZonesACorriger(lesArguments) {
        this.monTexte = "";
        this.maFinDocument = 0;
        this.EnvoieRequete({
            message: "_pb36d"
        });
    }
    donneTextePourOutils() {
        this.monContexteSelection = "";
        this.monDebutSelectionDsContexte = 0;
        this.maFinSelectionDsContexte = 0;
        this.EnvoieRequete({
            message: "donneTextePourOutils"
        });
    }
    initPourCorrecteur() {
        this.initialiseTexteur(true);
    }
    initPourOutils() {
        this.initialiseTexteur(false);
    }
    corrigeDansTexteur(lesArguments) {
        if (this.jeUtiliseEnveloppeIntervalleTexte) {
            lesArguments.message = "CorrigeAvecContexte";
            this.monEnveloppeIntervalleZoneDeTexte.ajusteCorrectionIntervalleVide(lesArguments._dib49, lesArguments._dib50, lesArguments._dib37, this.monTexte);
            lesArguments.debutContexte = this.monEnveloppeIntervalleZoneDeTexte.debutContexte;
            lesArguments.finContexte = this.monEnveloppeIntervalleZoneDeTexte.finContexte;
            lesArguments._dib92 = this.monEnveloppeIntervalleZoneDeTexte._dib92;
        }
        this.EnvoieRequete(lesArguments);
    }
    docEstMort() {
        this.EnvoieRequete({
            message: "_pb2d"
        });
    }
    repondsACorrigeDansTexteur(lesArguments) {}
    repondsADonneLesZonesACorriger(lesArguments) {}
    repondsATermineCorrectionAutomatique(lesArguments) {}
    repondsAPeutCorriger(lesArguments) {}
    repondsADonneTextePourOutils(lesArguments) {}
    repondsADocEstMort(lesArguments) {}
    repondsAInitialise(lesArguments) {
        this.EnvoieRequete(lesArguments);
    }
    EnvoieRequete(lesArguments) {
        lesArguments.type = cstTypeMessageContentScript;
        window.postMessage(lesArguments, "*");
    }
    initialiseTexteur(estCorrecteur) {
        if (this.actualisationFenAweb) {
            this.actualisationFenAweb = false;
            return;
        }
        this.maFenetre = window;
        this.monDocument = document;
        this.monTitre = document.title;
    }
    repondsATermineCorrectionAutomatique(lesArguments) {};
};

function gestionnaireMessageGrav(event) {
    if (event.data.type != cstTypeMessagePage)
        return;
    var unMessage = event.data.message;
    var uneValeur = "";
    if (unMessage == "_pb36d") {
        gAgentTexteurGrav.maFinDocument = event.data._dib50;
        gAgentTexteurGrav.monTexte = event.data._dib30;
        gAgentTexteurGrav.monDebutSelection = event.data._dib31;
        gAgentTexteurGrav.maFinSelection = event.data._dib32;
        var desZonesJson = [];
        var uneZoneJson = {
            _dib99: encodeChainePourJson("0"),
            _dib31: event.data._dib31,
            _dib32: event.data._dib32,
            _dib30: encodeChainePourJson(event.data._dib30),
            _dib97: []
        };
        desZonesJson[0] = uneZoneJson;
        event.data._dib100 = desZonesJson;
        gAgentTexteurGrav.envoieVersBackground(event.data);
    } else if (unMessage == "donneTextePourOutils") {
        gAgentTexteurGrav.monContexteSelection = event.data._dib30;
        gAgentTexteurGrav.monDebutSelectionDsContexte = event.data._dib31;
        gAgentTexteurGrav.maFinSelectionDsContexte = event.data._dib32;
        event.data._dib30 = encodeChainePourJson(event.data._dib30);
        gAgentTexteurGrav.envoieVersBackground(event.data);
    } else if (unMessage == "_pb2d" || (unMessage == "_pb15d")) {
        gAgentTexteurGrav.envoieVersBackground(event.data);
    } else if (unMessage == "_pb1d" || unMessage == "CorrigeAvecContexte") {
        if (event.data._dib29) {
            gAgentTexteurGrav.monTexte = remplaceIntervalle(gAgentTexteurGrav.monTexte, event.data._dib49, event.data._dib50, event.data._dib37);
        }
        gAgentTexteurGrav.envoieVersBackground(event.data);
    } else if (unMessage == "_pb12d") {
        event.data.estGoogleDocs = false;
        event.data.contientMarkDown = true;
        gAgentTexteurGrav.envoieVersBackground(event.data);
    }
};