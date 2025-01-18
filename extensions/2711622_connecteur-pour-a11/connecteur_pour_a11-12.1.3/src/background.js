 /* 
 *	Ce document est la propriété intellectuelle de Druide informatique inc. Toute reproduction ou publication est interdite. 
 *  Copyright 2022 Druide informatique inc. 
 */
 if (self.importScripts) {
    let b = self.browser !== undefined ? self.browser : self.chrome;
    self.importScripts(b.runtime.getURL('src/cstAntidote.js'), b.runtime.getURL('src/dictionnaire.js'), b.runtime.getURL('src/outils.js'), b.runtime.getURL('src/filemessage.js'), b.runtime.getURL('src/communicationantioups.js'), b.runtime.getURL('src/gestion-t.js'), b.runtime.getURL('src/serviceClientAntiOupsA12.js'), b.runtime.getURL('src/serviceClientAntiOupsNavigateursA12.js'), b.runtime.getURL('extensions/DetecteurWeb/wasm/ClientCorrecteurSimple.js'), b.runtime.getURL('extensions/DetecteurWeb/backgroundCliCorrSi.js'));
}
const kMiseAjourEditionAbsente = -1;
const monIdConnecteur = estThunderbird() ? "ConnecteurAntidoteThunderbirdWS" : "ModuleAntidoteGoogleChromeWebSocket";
let monIdTexteur = cstMonFureteur;
const maVersionPontGDoc = "2.0";
let billetix = {
    estAppelayPar: false,
    idOnglet: -1
};
const portWebSocketMinimum = 49152;
const nombrePortValideWebSocket = 12;
async function donneInfoExtension() {
    let desInfoConnecteur = {
        versionConnecteur: "0.0.0",
        versionBuild: "1",
        origine: "tronc",
        idConnecteur: cstChaineNomFureteur + "_non_initialisay",
        manifest: 3
    };
    if (!estSafariWebex()) {
        let infoConnecteur = await fureteur.management.getSelf();
        desInfoConnecteur.idConnecteur = infoConnecteur.id;
    } else {
        desInfoConnecteur.idConnecteur = "Safari-Webextension";
    }
    desInfoConnecteur.manifest = fureteur.runtime.getManifest().manifest_version;
    desInfoConnecteur.versionConnecteur = fureteur.runtime.getManifest().version;
    const request = new Request(donneUrlFichier("version.json"), {
        method: 'GET',
        headers: {
            'Content-Type': 'text/json'
        }
    });
    let uneReponseFetch = await fetch(request);
    let uneReponse = await uneReponseFetch.json();
    desInfoConnecteur.versionBuild = uneReponse.version_build;
    desInfoConnecteur.origine = uneReponse.origine !== undefined ? uneReponse.origine : "test";
    if (estSafariWebex()) desInfoConnecteur.origine = new Date();
    global.metsDonnees({
        infoConnecteur: desInfoConnecteur
    });
}

function aFichierDetecteurWeb() {
    let aDetcteurWeb = false;
    let desContentScripts = fureteur.runtime.getManifest().content_scripts[0].js;
    for (let cs of desContentScripts) {
        if (cs == donneUrlFichier("extensions/DetecteurWeb/detecteurWeb.js")) {
            aDetcteurWeb = true;
        }
    }
    return aDetcteurWeb;
}

function DonneIDCommunication() {
    return global.idOngletActif;
};
async function _pb2d(ouvrierId) {
    var edit_arg = {
        message: "_pb2d"
    };
    let ouvrier = new ObjetOuvrier();
    await ouvrier.recupere(ouvrierId);
    ouvrier.envoieMessageAuDocument({
        message: "_pb2d"
    });
    return 0;
};
async function activeOnglet(leId) {
    let ouvrier = new ObjetOuvrier();
    await ouvrier.recupere(leId);
    await ouvrier.active();
}
async function lanceOutil(lOutil, leIdOnglet, appelayPar, idAntiOups) {
    let ouvrier = new ObjetOuvrier();
    await ouvrier.recupere(leIdOnglet !== undefined ? leIdOnglet : global.idOngletActif);
    if (estThunderbird()) {
        gestionnaireAntiOupsThunderbird.enregistreCourriel(ouvrier.idOnglet);
    }
    if (global.doisConfirmerIdAntidote()) {
        await ouvrier.afficheDialogue({
            message: "afficheDialogueOuiNon",
            messageReponse: "confirmeLanceOutilAWeb",
            _dib37: gestionTraduction.Tr_(cstMessageConfirmerAWeb, ""),
            explication: gestionTraduction.Tr_(cstExplicationConfirmerAWeb, ""),
            chaine_ok: gestionTraduction.Tr_(cstOui, ""),
            chaine_annuler: gestionTraduction.Tr_(cstNon, "")
        });
    }
    if (!global.estAntidoteWeb() && !global._donneVersionIATPrisEnCharge() && gestionnaireWebSocket._estValide(0)) {
        var unMessage = gestionTraduction.Tr_(cstMessageConnecteurIncompatible, "");
        var uneExplication = gestionTraduction.Tr_(cstExplicationConnecteurIncompatible, "");
        ouvrier.envoieMessageAuDocument({
            message: "_dib41",
            _dib37: unMessage,
            explication: uneExplication,
            plateforme: global.plateforme
        });
        return;
    }
    let unUrl = await ouvrier.donneUrl();
    if (urlEstGoogleDriveApps(unUrl)) {
        ouvrier.envoieMessageAuDocument({
            message: "_dib41",
            _dib37: gestionTraduction.Tr_(cstMessageAlerteGoolgeDocsPasSupporte, ""),
            explication: gestionTraduction.Tr_(cstExplicationAlerteGoolgeDocsPasSupporte, ""),
            plateforme: global.plateforme
        });
        return;
    }
    if (appelayPar === undefined) appelayPar = "";
    if (idAntiOups === undefined) idAntiOups = "";
    ouvrier.metsDonnees({
        appelayPar: appelayPar
    });
    ouvrier.envoieMessageAuDocument({
        message: "_dib46",
        outil: lOutil,
        appelayPar: appelayPar,
        idFenetreAntiOups: idAntiOups
    });
}
async function lanceOutilAWeb(ouvrier) {
    let ouvreNouvelOnglet = false;
    if (ouvrier.infoAWeb.idLiay == "") {
        let idLiay = await creeNouvellePage(donneCheminUriAntidoteWebSelonOutils(ouvrier.infoAWeb.infoOutils.outil, ouvrier.infoAWeb.infoOutils));
        ouvrier.metsDonnees({
            infoAWeb: {
                idLiay: idLiay
            }
        });
        ouvreNouvelOnglet = true;
        global.metsDonnees({
            idALier: ouvrier.idOnglet
        });
    } else {
        await ouvrier.active();
        var args = {};
        if (ouvrier.infoAWeb.infoOutils === undefined) {} else {
            args = ouvrier.infoAWeb.infoOutils;
        }
        if (ouvrier.infoAWeb.estTexteurNatif) {
            let ouvrierGlobal = new ObjetOuvrier();
            await ouvrierGlobal.recupere(0);
            args = ouvrierGlobal.infoAWeb.infoOutils;
        } else {
            let ouvrierAWeb = new ObjetOuvrier();
            await ouvrierAWeb.recupere(ouvrier.infoAWeb.idLiay);
            ouvrierAWeb.active();
        }
        args.message = 'MajOutilAntidote';
        ouvrier.envoieMessageAAweb(args);
    }
    if (ouvrier.infoAWeb.infoOutils !== undefined && ouvrier.infoAWeb.infoOutils._dib106) {
        ouvrier.envoieMessageAAgentConnectix({
            message: 'OutilAntidoteEstMort',
            _dib106: 1,
            _dib105: cstTypeMessageReponse,
            _dib104: cstIdAntidoteWeb,
            _dib29: ouvreNouvelOnglet
        });
    }
}
async function initialisationPourlanceOutilAWeb(ouvrier) {
    await ouvrier.active()
    lanceOutilAWeb(ouvrier);
};
async function ouvreReglages() {
    await fureteur.runtime.openOptionsPage();
}
async function ouvreDagda() {
    billetix.estAppelayPar = true;
    billetix.idOnglet = global.idOngletActif;
    let url = cstUrlBeta;
    return creeNouvellePage(url);
}
async function ouvreAWeb() {
    var url = donneCheminUriAntidoteWebSelonOutils("D0");
    return creeNouvellePage(url);
}
async function ouvreAWebConnexion() {
    if (estSafariWebex() && global.permetAuthenticationSession) {
        gestionnaireConnexionSafari.ouvreApplicationHoteSafari();
    } else {
        var leUrl = donneCheminUriAntidoteWebSelonOutils("D0");
        return new Promise(resolution => {
            global.metsDonnees({
                ouvreNouvellePage: 2,
                ouvrePageConnexion: 2
            });
            fureteur.windows.create({
                url: leUrl,
                height: 800,
                width: 500,
                type: "popup"
            }).then(function(laFenetre) {
                resolution(laFenetre.id);
            });
        });
    }
}

function donneLienDocumentation(estAssistance) {
    if (!!estAssistance) {
        return donneCheminAide("assistance", gestionTraduction.maLangueString, global.plateforme);
    }
    if (estGoogleChrome()) {
        if (monIdTexteur == cstMonFureteur) {
            return donneCheminAide("googlechrome", gestionTraduction.maLangueString, global.plateforme);
        }
        if (monIdTexteur == "AntidoteOpera") {
            return donneCheminAide("opera", gestionTraduction.maLangueString, global.plateforme);
        }
        if (monIdTexteur == "AntidoteEdge") {
            return donneCheminAide("edge", gestionTraduction.maLangueString, global.plateforme);
        }
    }
    if (estSafariWebex()) {
        return donneCheminAide("safari", gestionTraduction.maLangueString, global.plateforme);
    }
    if (estThunderbird()) {
        return donneCheminAide("thunderbird", gestionTraduction.maLangueString, global.plateforme);
    }
    if (estFirefox()) {
        return donneCheminAide("firefox", gestionTraduction.maLangueString, global.plateforme);
    }
}
async function OuvreAide(leAide) {
    return new Promise(resolution => {
        let urlAWeb = donneLienDocumentation(false);
        if (global.choixOuvertureAWeb == 'nouvelle_fenetre') {
            fureteur.windows.create({
                url: urlAWeb
            }).then(function(w) {
                resolution(w.tabs[w.tabs.length - 1].id);
            });
        } else {
            fureteur.tabs.create({
                url: urlAWeb
            }).then(function(t) {
                resolution(t.id)
            });
        }
    });
}
async function creeNouvellePage(leUrl) {
    return new Promise(resolution => {
        global.metsDonnees({
            ouvreNouvellePage: 2
        });
        if (global.choixOuvertureAWeb == 'nouvelle_fenetre') {
            fureteur.windows.create({
                url: leUrl
            }).then(function(laFenetre) {
                if (estSafariWebex()) {
                    fureteur.tabs.query({
                        windowId: laFenetre.id
                    }).then((lesOnglets) => {
                        resolution(lesOnglets[lesOnglets.length - 1].id);
                    });
                } else {
                    resolution(laFenetre.tabs[laFenetre.tabs.length - 1].id);
                }
            });
        } else {
            fureteur.tabs.create({
                url: leUrl
            }).then(function(leTab) {
                resolution(leTab.id)
            });
        }
    });
};

function estOutilDictionnaire(outil) {
    if (outil.length > 0)
        return (outil.charAt(0) === chaineCommandeD);
    return false;
};

function estOutilGuide(outil) {
    if (outil.length > 0)
        return (outil.charAt(0) === chaineCommandeG);
    return false;
};

function chercheDebutMot(leTexte, laPostionDepart) {
    var unePosition = -1;
    for (var i = laPostionDepart; i >= 0 && unePosition == -1; i--) {
        if (cstSeparateurDeMot.indexOf(leTexte[i]) >= 0) {
            unePosition = i + 1;
        }
    }
    if (unePosition == -1) unePosition = laPostionDepart;
    return unePosition;
}

function chercheFinMot(leTexte, laPostionDepart) {
    var unePosition = -1;
    if (laPostionDepart - 1 != -1 && leTexte[laPostionDepart - 1].indexOf(" ") >= 0) return laPostionDepart - 1;
    for (var i = laPostionDepart; i < leTexte.length; i++) {
        if (cstSeparateurDeMot.indexOf(leTexte[i]) >= 0) {
            return i;;
        }
    }
    if (unePosition == -1) unePosition = laPostionDepart;
    return unePosition;
}

function donneMotPourOutilsAWeb(msg) {
    var unMot = "";
    if (msg !== undefined) {
        var _dib49 = msg._dib31;
        var _dib50 = msg._dib32;
        var unTexte = decodeChaineDeJson(msg._dib30);
        _dib49 = chercheDebutMot(unTexte, msg._dib31);
        _dib50 = chercheFinMot(unTexte, msg._dib32);
        if (_dib50 > _dib49) {
            unMot = encodeURIComponent(unTexte.substr(_dib49, _dib50 - _dib49));
        }
    }
    return unMot;
};

function donneNomOutil(outil, indexLangue) {
    if (estOutilDictionnaire(outil)) {
        return donneNomDictionnaire(outil, indexLangue);
    } else if (estOutilGuide(outil)) {
        return donneNomGuide(outil, indexLangue);
    }
    return "";
}

function donneNomDictionnaire(outil, indexLangue) {
    if (outil == chaineCommandeC0) return "";
    var nomDictionnaire = "";
    if (outil == chaineCommandeD0)
        return indexLangue == cstIndexLangues.FRANCAIS ? cstOutilRechercher : cstOutilSearch;
    try {
        nomDictionnaire = cstUriDictionnaires[outil][indexLangue];
    } catch (erreur) {
        console.error("background.donneNomDictionnaire", erreur);
        gestionnaireErreur.traiteErreur({
            date: new Date().toString(),
            message_log: "background.donneNomDictionnaire.erreur",
            erreur: erreur
        });
    }
    if (nomDictionnaire === undefined || nomDictionnaire.length == 0) {
        nomDictionnaire = indexLangue == cstIndexLangues.FRANCAIS ? cstOutilRechercher : cstOutilSearch;
    }
    return nomDictionnaire;
};

function donneNomGuide(outil, indexLangue) {
    if (outil == chaineCommandeC0) return "";
    var nomDonneNomGuide = "";
    if (outil == chaineCommandeG0)
        return indexLangue == cstIndexLangues.FRANCAIS ? cstOutilRechercher : cstOutilSearch;
    try {
        nomDonneNomGuide = cstUriGuides[outil][indexLangue];
    } catch (erreur) {
        console.error("background.donneNomGuide", erreur);
        gestionnaireErreur.traiteErreur({
            date: new Date().toString(),
            message_log: "background.donneNomGuide.erreur",
            erreur: erreur
        });
    }
    if (nomDonneNomGuide === undefined || nomDonneNomGuide.length == 0) {
        nomDonneNomGuide = indexLangue == cstIndexLangues.FRANCAIS ? cstOutilRechercher : cstOutilSearch;
    }
    return nomDonneNomGuide;
};

function donneCheminUriAntidoteWebSelonOutils(outil, param) {
    var indexLangue = gestionTraduction.DonneIndexLangue();
    var unCheminUri = global.adresseAWeb;
    let uneLangue = gestionTraduction.ConvertisIndexLangueALangueIso(indexLangue);
    let vedette = param === undefined ? "" : param._dib30;
    let unOuvrage = param === undefined ? undefined : param._dib54;
    if (outil === chaineCommandeC0) {
        unCheminUri += cstUriCorrecteur[indexLangue];
    } else if (estOutilDictionnaire(outil) || estOutilGuide(outil)) {
        let unTypeOutil = estOutilDictionnaire(outil) ? cstUrlPathDictionnaires : cstUrlPathGuides;
        if (unOuvrage === undefined && estOutilDictionnaire(outil)) {
            unOuvrage = donneNomDictionnaire(outil, indexLangue);
        } else if (unOuvrage === undefined && estOutilGuide(outil)) {
            unOuvrage = donneNomGuide(outil, indexLangue);
        }
        if ((unOuvrage == cstOutilRechercher || unOuvrage == cstOutilSearch) && vedette.length == 0) {
            unOuvrage = undefined;
        }
        if (unOuvrage !== undefined && unOuvrage.length > 0) {
            unCheminUri += `${unTypeOutil}/${cstVersionUriAntidoteWeb}/${uneLangue}/${unOuvrage}/`;
        } else {
            unCheminUri += `${unTypeOutil}/${cstVersionUriAntidoteWeb}/`;
        }
        if ((estOutilDictionnaire(outil) && vedette.length > 0) || (estOutilGuide(outil) && (unOuvrage == cstOutilRechercher || unOuvrage == cstOutilSearch))) {
            unCheminUri += encodeURIComponent(vedette);
        }
    }
    unCheminUri += `?${cstVersionIATMaxUriAntidoteWeb}${cstVersionIATMax}&${cstVersionIATMinUriAntidoteWeb}${cstVersionIATMin}`;
    if (param !== undefined && param._dib106) {
        unCheminUri += `&${cstParamUriTexteurNatif}`;
    }
    return unCheminUri;
};

function faireUneGrosseZone(lesZones, ouvrier) {
    var laListeBoites = {
        _dib86: [],
        mappage: {}
    };
    var uneGrosseZone = {
        _dib99: encodeChainePourJson(0),
        _dib30: "",
        _dib31: 0,
        _dib32: 0,
        _dib97: [{
            _dib49: 0,
            _dib50: 0,
            Style: 0
        }]
    };
    var t = "";
    var pos = 0;
    for (var z in lesZones) {
        var s = decodeChaineDeJson(lesZones[z]._dib30);
        if (s == "") {
            s = cstChaineParagraphe;
        } else if (z < lesZones.length - 1) {
            s = s + cstRetourCharriotNouvelleLigne;
        }
        t = t + s;
        if (lesZones[z].aUneSelection !== undefined && lesZones[z].aUneSelection) {
            uneGrosseZone._dib31 = pos + lesZones[z]._dib31;
            uneGrosseZone._dib32 = pos + lesZones[z]._dib32;
        }
        pos = pos + s.length;
        laListeBoites.mappage[pos] = lesZones[z]._dib99;
        laListeBoites._dib86.push(pos);
    }
    uneGrosseZone._dib30 = encodeChainePourJson(t);
    var unArray = [];
    unArray.push(uneGrosseZone);
    ouvrier.metsDonnees({
        infoGDoc: {
            zones: unArray,
            listeBoites: laListeBoites
        }
    });
}

function chercheZone(listeboite, _dib49, _dib50) {
    var zone = -1;
    var unePosition = -1;
    var unDebut = _dib49;
    var uneFin = _dib50;
    var trouvay = false;
    for (var i = 0; i < listeboite._dib86.length && !trouvay; i++) {
        if (_dib49 <= listeboite._dib86[i] && _dib50 <= listeboite._dib86[i]) {
            zone = listeboite.mappage[listeboite._dib86[i]];
            unePosition = i;
            trouvay = true;
        }
    }
    if (unePosition > 0) {
        unDebut = unDebut - listeboite._dib86[unePosition - 1];
        uneFin = uneFin - listeboite._dib86[unePosition - 1];
        unDebut = unDebut < 0 ? 0 : unDebut;
        uneFin = uneFin < 0 ? 0 : uneFin;
    }
    return {
        zone: zone,
        _dib86: unePosition,
        _dib49: unDebut,
        _dib50: uneFin
    };
}

function chercheZoneSelonZone(listeboite, _dib49, _dib50, laZone) {
    var zone = laZone;
    var unePosition = -1;
    var unDebut = _dib49;
    var uneFin = _dib50;
    var unePosition = -1;
    var z = decodeChaineDeJson(laZone);
    unePosition = listeboite._dib86[z];
    if (z > 0) {
        unDebut = unDebut - listeboite._dib86[z - 1];
    }
    if (z > 0) {
        uneFin = uneFin - listeboite._dib86[z - 1];
    }
    return {
        zone: zone,
        _dib86: unePosition,
        _dib49: unDebut,
        _dib50: uneFin
    };
}

function metsAJourListeBoite(liste, _dib86, _dib49, _dib50, chaineEncodee) {
    var listet = liste;
    var diff = 0;
    var _dib37 = decodeChaineDeJson(chaineEncodee);
    if (_dib49 == _dib50) {
        diff = _dib37.length;
    } else if (_dib37.length >= 0 && _dib50 - _dib49 > 0) {
        diff = _dib49 - _dib50 + _dib37.length;
    }
    var mappage = {};
    for (var i = 0; i < _dib86; i++) {
        mappage[liste._dib86[i]] = liste.mappage[liste._dib86[i]];
    }
    for (var i = _dib86; i < liste._dib86.length; i++) {
        var _dib29 = liste._dib86[i] + diff;
        mappage[_dib29] = liste.mappage[liste._dib86[i]];
        liste._dib86[i] = _dib29;
    }
    liste.mappage = mappage;
    return liste;
}

function urlEstGoogleDocs(url) {
    if (estThunderbird()) return false;
    var resultat = url.match(cstGoogleDocsURLRegEx);
    if (resultat != null)
        return true;
    return false;
};
const cstGoogleSpreadsheetsURLRegEx = /.*docs\.google\.com.*\/spreadsheets\/.*/;
const cstGooglePresentationURLRegEx = /.*docs\.google\.com.*\/presentation\/.*/;
const cstGoogleFormsURLRegEx = /.*docs\.google\.com.*\/forms\/.*/;

function urlEstGoogleDriveApps(url) {
    if (estThunderbird()) return false;
    var resultatSpreadsheets = url.match(cstGoogleSpreadsheetsURLRegEx);
    var resultatPresentation = url.match(cstGooglePresentationURLRegEx);
    var resultatForms = url.match(cstGoogleFormsURLRegEx);
    if (resultatSpreadsheets != null || resultatPresentation != null || resultatForms != null)
        return true;
    return false;
};

function determineRestrictions(restriction) {
    return [(restriction & 2 ** 7) == 2 ** 7, (restriction & 2 ** 8) == 2 ** 8, (restriction & 2 ** 9) == 2 ** 9, (restriction & 2 ** 10) == 2 ** 10, (restriction & 2 ** 11) == 2 ** 11, (restriction & 2 ** 12) == 2 ** 12, (restriction & 2 ** 13) == 2 ** 13, (restriction & 2 ** 14) == 2 ** 14, (restriction & 2 ** 15) == 2 ** 15, (restriction & 2 ** 16) == 2 ** 16];
}
let globalEstChargeay = false;
class ObjetGlobal {
    constructor() {
        this.idAntidote = cstIdAntidoteWebAConfirmer;
        this.idNavigateur = "";
        this.langue = undefined;
        this.langueAffichage = undefined;
        this.portWS = undefined;
        this.plateforme = undefined;
        this.echecLancementAgentConnectix = false;
        this.estAWebConnectay = false;
        this.estAntidoteActif = false;
        this.infoConnecteur = {
            versionConnecteur: "0.0.0",
            versionBuild: "1",
            origine: "tronc",
            idConnecteur: cstMonFureteur + "_non_initialisay",
            manifest: 3,
            plateforme: "na"
        };
        this.infoDW = {
            premiereActivation: true,
            idAntidote: 0,
            antidoteLocalCompatible: false,
            estDisponible: false,
            estActivay: false,
            estConnectay: false,
            estVerifiayAWeb: false,
            listeExclusionBrute: '',
            listeExclusion: [],
            cookieAWeb: undefined,
            cookieAWebValue: undefined,
            versionDonnees: "00000000-0000-0000-0000-000000000000",
            devDWeb: 'dweb_defaut',
            adresseDWeb: cstUrlAntidoteWeb,
            devValAdresseDWeb: cstUrlAntidoteWeb,
            devCliCorrSi: "clicorrsi_wasm",
            dWebDevoilee: false,
            devDWebDevoilee: false,
            niveauAlerte: 2,
            estActivayAntiOups: false,
            listeAntiOups: ["gmail.com", "mail.google.com", "mail.yahoo.com", "outlook.com"],
            dweb_option: {
                bouton_barre: false,
                bouton_bulle: false,
                dblclic: true
            },
            activation: [{
                disponible: true,
                active: true
            }, {
                disponible: false,
                active: false
            }, {
                disponible: false,
                active: false
            }, {
                disponible: false,
                active: false
            }],
            restrictions: 0
        };
        this.googleDoc = {
            monoZone: false
        };
        this.adresseAWeb = cstUrlAntidoteWeb;
        this.idOngletActif = undefined;
        this.idALier = undefined;
        this.reglages = {};
        this.choixOuvertureAWeb = 'nouvel_onglet';
        this.choixMenuContextuel = 'mc_regroupay';
        this.versionIAT = {
            versionMin: undefined,
            versionMax: undefined,
            borneInfPriseEnCharge: undefined,
            borneSupPriseEnCharge: undefined
        };
        this.versionPontAA = {
            versionMin: undefined,
            versionMax: undefined,
            borneInfPriseEnCharge: undefined,
            borneSupPriseEnCharge: undefined
        };
        this.versionPont = cstVersionPontAAMax;
        this.idCommunicationRetrocompatible = "";
        this.racine = donneUrlFichier("");
        this.ouvreNouvellePage = 0;
        this.ouvrePageConnexion = 0;
        this.estChromeOS = false;
        this.versionSafari = "0.0";
        this.permetAuthenticationSession = false;
        this.estModeiOS = false;
        this.estModeSolo = false;
        this.confirmeModeSolo = false;
        this.appareil = "";
        this.recuperation = [];
        this.billetix = false;
        this.activeLog = false;
        this.beta_a12 = false;
        this.antiOups = {
            pub_francais: true,
            pub_anglais: true,
            correctionAutomatique: false,
            detectionPiecesManquantes: false,
            texteRepris: false,
            jeTraiteSignature: false,
            destinatairesExclus: [],
            exclureDestinataires: false,
            reseau: {
                jeInhibeRaccourciAntiOupsShift: false,
                jeInhibeRaccourciAntiOupsCtrl: false
            }
        };
        this.capture = false;
        this.estUneRedirection = false;
    }
    reinit() {
        fureteur.storage.local.clear();
        global = new ObjetGlobal();
        global.sauvegarde();
        initialisation({
            type: "reinit"
        });
    }
    async metsDonnees(data, doisSauvegarder) {
        if (doisSauvegarder === undefined) {
            doisSauvegarder = true;
        }
        if (!!data.changeServeur) {
            if (data.changeServeur == "prod") {
                data.adresseAWeb = "https://antidote.app/";
            } else if (data.changeServeur == "beta") {
                data.adresseAWeb = "https://beta.antidote.app/";
            } else if (data.changeServeur == "prebeta") {
                data.adresseAWeb = "https://prebeta.antidote.app/";
            } else if (data.changeServeur == "preprod") {
                data.adresseAWeb = "https://preprod.antidote.app/";
            }
        }
        if (data.idAntidote !== undefined) this.idAntidote = data.idAntidote;
        if (data.idNavigateur !== undefined) this.idNavigateur = data.idNavigateur;
        if (data.langue !== undefined) {
            gestionTraduction.metsLaLangue(data.langue);
            this.langue = data.langue;
            this.langueAffichage = gestionTraduction.maLangueLocale;
        }
        if (data.portWS !== undefined) this.portWS = data.portWS;
        if (data.plateforme !== undefined) this.plateforme = data.plateforme;
        if (data.echecLancementAgentConnectix !== undefined) this.echecLancementAgentConnectix = data.echecLancementAgentConnectix;
        if (data.estAWebConnectay !== undefined) {
            this.estAWebConnectay = data.estAWebConnectay;
            this.infoDW.activation[cstIdAntidoteWeb].active = this.infoDW.activation[cstIdAntidoteWebSolo].active = this.estAWebConnectay;
        }
        if (data.estAntidoteActif !== undefined) {
            this.estAntidoteActif = data.estAntidoteActif || this._estAntidoteX("11");
            if (this._estAntidoteX("12")) {
                this.infoDW.activation[cstIdAntidoteBureau].active = this.estAntidoteActif;
            }
        }
        if (data.infoConnecteur !== undefined && data.infoConnecteur.versionConnecteur !== undefined) this.infoConnecteur.versionConnecteur = data.infoConnecteur.versionConnecteur;
        if (data.infoConnecteur !== undefined && data.infoConnecteur.versionBuild !== undefined) this.infoConnecteur.versionBuild = data.infoConnecteur.versionBuild;
        if (data.infoConnecteur !== undefined && data.infoConnecteur.origine !== undefined) this.infoConnecteur.origine = data.infoConnecteur.origine;
        if (data.infoConnecteur !== undefined && data.infoConnecteur.idConnecteur !== undefined) this.infoConnecteur.idConnecteur = data.infoConnecteur.idConnecteur;
        if (data.infoConnecteur !== undefined && data.infoConnecteur.manifest !== undefined) this.infoConnecteur.manifest = data.infoConnecteur.manifest;
        if (data.infoConnecteur !== undefined && data.infoConnecteur.plateforme !== undefined) this.infoConnecteur.plateforme = data.infoConnecteur.plateforme;
        this.infoDW.idAntidote = 0;
        if (data.infoDW !== undefined && data.infoDW.antidoteLocalCompatible !== undefined) this.infoDW.antidoteLocalCompatible = data.infoDW.antidoteLocalCompatible;
        if (data.infoDW !== undefined && data.infoDW.estDisponible !== undefined) {
            this.infoDW.estDisponible = data.infoDW.estDisponible;
            if (this.estAntidoteWeb()) this.infoDW.activation[0].disponible = this.infoDW.activation[cstIdAntidoteWeb].disponible = this.infoDW.activation[cstIdAntidoteWebSolo].disponible = data.infoDW.estDisponible;
        }
        if (data.infoDW !== undefined && data.infoDW.estConnectay !== undefined) this.infoDW.estConnectay = data.infoDW.estConnectay;
        if (data.infoDW !== undefined && data.infoDW.estVerifiayAWeb !== undefined) this.infoDW.estVerifiayAWeb = data.infoDW.estVerifiayAWeb;
        if (data.infoDW !== undefined && data.infoDW.cookieAWeb !== undefined) this.infoDW.cookieAWeb = data.infoDW.cookieAWeb;
        if (data.infoDW !== undefined && data.infoDW.cookieAWebValue !== undefined) this.infoDW.cookieAWebValue = data.infoDW.cookieAWebValue;
        if (data.infoDW !== undefined && data.infoDW.versionDonnees !== undefined) this.infoDW.versionDonnees = data.infoDW.versionDonnees;
        if (data.infoDW !== undefined && data.infoDW.devDWeb !== undefined) this.infoDW.devDWeb = data.infoDW.devDWeb;
        if (data.infoDW !== undefined && data.infoDW.adresseDWeb !== undefined) this.infoDW.adresseDWeb = data.infoDW.adresseDWeb;
        if (data.infoDW !== undefined && data.infoDW.devValAdresseDWeb !== undefined) this.infoDW.devValAdresseDWeb = data.infoDW.devValAdresseDWeb;
        if (data.infoDW !== undefined && data.infoDW.devCliCorrSi !== undefined) this.infoDW.devCliCorrSi = data.infoDW.devCliCorrSi;
        if (data.infoDW !== undefined && data.infoDW.dWebDevoilee !== undefined) this.infoDW.dWebDevoilee = data.infoDW.dWebDevoilee;
        if (data.infoDW !== undefined && data.infoDW.devDWebDevoilee !== undefined) this.infoDW.devDWebDevoilee = data.infoDW.devDWebDevoilee;
        if (data.infoDW !== undefined && data.infoDW.niveauAlerte !== undefined) this.infoDW.niveauAlerte = data.infoDW.niveauAlerte;
        if (data.infoDW !== undefined && data.infoDW.estActivayAntiOups !== undefined) this.infoDW.estActivayAntiOups = data.infoDW.estActivayAntiOups;
        if (data.infoDW !== undefined && data.infoDW.listeAntiOups !== undefined) this.infoDW.listeAntiOups = data.infoDW.listeAntiOups;
        if (data.infoDW !== undefined && data.infoDW.dweb_option !== undefined && data.infoDW.dweb_option.bouton_barre !== undefined) this.infoDW.dweb_option.bouton_barre = data.infoDW.dweb_option.bouton_barre;
        if (data.infoDW !== undefined && data.infoDW.dweb_option !== undefined && data.infoDW.dweb_option.bouton_bulle !== undefined) this.infoDW.dweb_option.bouton_bulle = data.infoDW.dweb_option.bouton_bulle;
        if (data.infoDW !== undefined && data.infoDW.dweb_option !== undefined && data.infoDW.dweb_option.dblclic !== undefined) this.infoDW.dweb_option.dblclic = data.infoDW.dweb_option.dblclic;
        if (data.infoDW !== undefined && data.infoDW.restrictions !== undefined) {
            this.infoDW.restrictions = data.infoDW.restrictions;
            let objRestrictions = determineRestrictions(data.infoDW.restrictions);
            if (objRestrictions[0] || objRestrictions[6] || objRestrictions[9]) {
                this.infoDW.activation[cstIdAntidoteWeb].disponible = this.infoDW.activation[cstIdAntidoteWebSolo].disponible = false;
            }
        }
        if (data.infoDW !== undefined && data.infoDW.listeExclusion !== undefined) {
            this._traiteListeExclusion(data.infoDW.listeExclusion, doisSauvegarder);
        }
        if (data.infoDW !== undefined && data.infoDW.premiereActivation !== undefined) this.infoDW.premiereActivation = data.infoDW.premiereActivation;
        if (data.googleDoc !== undefined && data.googleDoc.monoZone !== undefined) this.googleDoc.monoZone = data.googleDoc.monoZone;
        if (data.idOngletActif !== undefined) this.idOngletActif = data.idOngletActif;
        if (data.idALier !== undefined) this.idALier = data.idALier;
        if (data.reglages !== undefined) this.reglages = data.reglages;
        if (data.choixOuvertureAWeb !== undefined) this.choixOuvertureAWeb = data.choixOuvertureAWeb;
        if (data.choixMenuContextuel !== undefined) this.choixMenuContextuel = data.choixMenuContextuel;
        if (data.versionIAT !== undefined && data.versionIAT.versionMin !== undefined) this.versionIAT.versionMin = data.versionIAT.versionMin;
        if (data.versionIAT !== undefined && data.versionIAT.versionMax !== undefined) this.versionIAT.versionMax = data.versionIAT.versionMax;
        if (data.versionPontAA !== undefined && data.versionPontAA.versionMin !== undefined) this.versionPontAA.versionMin = data.versionPontAA.versionMin;
        if (data.versionPontAA !== undefined && data.versionPontAA.versionMax !== undefined) this.versionPontAA.versionMax = data.versionPontAA.versionMax;
        if (data.versionPontAA !== undefined && data.versionPontAA.versionMin !== undefined && data.versionPontAA.versionMax !== undefined) {
            if (this._donneVersionPontAAPrisEnChargeAEC()) {
                this.infoDW.antidoteLocalCompatible = true;
                this.beta_a12 = true;
                if (this.infoDW.premiereActivation) {
                    this.infoDW.estActivay = true;
                    this.infoDW.premiereActivation = false;
                }
                this.infoDW.estDisponible = true;
                this.infoDW.activation[cstIdAntidoteBureau].disponible = true;
                doisSauvegarder = true;
            } else {
                this.infoDW.antidoteLocalCompatible = false;
                this.infoDW.activation[cstIdAntidoteBureau].disponible = false;
                if (this._estAntidoteX("11")) {
                    this.beta_a12 = false;
                    this.infoDW.estDisponible = false;
                    this.infoDW.estActivay = false;
                    this.estAntidoteActif = true;
                }
            }
        }
        if (data.versionPont !== undefined) this.versionPont = data.versionPont;
        if (data.idCommunicationRetrocompatible !== undefined) this.idCommunicationRetrocompatible = data.idCommunicationRetrocompatible
        if (data.versionSafari !== undefined) this.versionSafari = data.versionSafari;
        if (data.permetAuthenticationSession !== undefined) this.permetAuthenticationSession = data.permetAuthenticationSession;
        if (this.versionIAT.versionMin != "" && this.versionIAT.versionMax != "") {
            this._donneVersionIATPrisEnCharge();
        }
        if (data.ouvreNouvellePage !== undefined) this.ouvreNouvellePage = data.ouvreNouvellePage;
        if (data.ouvrePageConnexion !== undefined) this.ouvrePageConnexion = data.ouvrePageConnexion;
        if (data.estChromeOS !== undefined) this.estChromeOS = data.estChromeOS;
        if (this.plateforme == "ios") this.estModeiOS = true;
        if (data.estModeiOS !== undefined) this.estModeiOS = data.estModeiOS;
        if (data.confirmeModeSolo !== undefined) this.confirmeModeSolo = data.confirmeModeSolo;
        if (data.estModeSolo !== undefined) this.estModeSolo = data.estModeSolo;
        if (this.estModeiOS || (data.estModeSolo !== undefined && data.estModeSolo)) {
            this.infoDW.idAntidote = cstIdAntidoteWebSolo;
            this.idAntidote = cstIdAntidoteWebSolo;
            if (this.estModeiOS) {
                this.appareil = navigator.platform;
                this.choixOuvertureAWeb = 'nouvel_onglet';
            }
        }
        if (data.beta_a12 !== undefined && (!this._estAntidoteX("11") || this.estAntidoteWeb())) {
            this.beta_a12 = data.beta_a12;
        }
        if (data.adresseAWeb !== undefined) {
            let unURL = new URL(data.adresseAWeb);
            if (unURL.hostname.includes(".druide") || unURL.hostname.includes("antidote.app")) {
                this.adresseAWeb = data.adresseAWeb;
                this.infoDW.adresseDWeb = data.adresseAWeb;
            }
        }
        if (this.infoDW.antidoteLocalCompatible || this.infoDW.estDisponible || this.estModeSolo) {
            this.infoDW.dWebDevoilee = true;
        } else if (!this.infoDW.antidoteLocalCompatible) {
            this.infoDW.estActivay = false;
            this.infoDW.dWebDevoilee = false;
        }
        if (data.infoDW !== undefined && data.infoDW.estActivay !== undefined) this.infoDW.estActivay = data.infoDW.estActivay;
        if (data.recuperation !== undefined && doisSauvegarder) this.recuperation.push(data.recuperation[0]);
        if (data.billetix !== undefined) this.billetix = data.billetix;
        if (data.activeLog !== undefined) this.activeLog = data.activeLog;
        if (data.antiOups !== undefined && data.antiOups.correctionAutomatique !== undefined) this.antiOups.correctionAutomatique = data.antiOups.correctionAutomatique;
        if (data.antiOups !== undefined && data.antiOups.detectionPiecesManquantes !== undefined) this.antiOups.detectionPiecesManquantes = data.antiOups.detectionPiecesManquantes;
        if (data.antiOups !== undefined && data.antiOups.texteRepris !== undefined) this.antiOups.texteRepris = data.antiOups.texteRepris;
        if (data.antiOups !== undefined && data.antiOups.pub_francais !== undefined) this.antiOups.pub_francais = data.antiOups.pub_francais;
        if (data.antiOups !== undefined && data.antiOups.pub_anglais !== undefined) this.antiOups.pub_anglais = data.antiOups.pub_anglais;
        if (data.antiOups !== undefined && data.antiOups.jeTraiteSignature !== undefined) this.antiOups.jeTraiteSignature = data.antiOups.jeTraiteSignature;
        if (data.antiOups !== undefined && data.antiOups.destinatairesExclus !== undefined) this.antiOups.destinatairesExclus = data.antiOups.destinatairesExclus;
        if (data.antiOups !== undefined && data.antiOups.exclureDestinataires !== undefined) this.antiOups.exclureDestinataires = data.antiOups.exclureDestinataires;
        if (data.antiOups !== undefined && data.antiOups.reseau !== undefined && data.antiOups.reseau.jeInhibeRaccourciAntiOupsShift !== undefined) this.antiOups.reseau.jeInhibeRaccourciAntiOupsShift = data.antiOups.reseau.jeInhibeRaccourciAntiOupsShift;
        if (data.antiOups !== undefined && data.antiOups.reseau !== undefined && data.antiOups.reseau.jeInhibeRaccourciAntiOupsCtrl !== undefined) this.antiOups.reseau.jeInhibeRaccourciAntiOupsCtrl = data.antiOups.reseau.jeInhibeRaccourciAntiOupsCtrl;
        if (data.capture !== undefined) this.capture = data.capture;
        if (data.estUneRedirection !== undefined) this.estUneRedirection = data.estUneRedirection;
        if (doisSauvegarder) {
            this.sauvegarde();
        }
    }
    async recupere() {
        if (!estMozillaWebExtension() && !estThunderbird()) {
            let taille_db = await fureteur.storage.local.getBytesInUse();
            if (taille_db > fureteur.storage.local.QUOTA_BYTES) {
                fureteur.storage.local.clear();
            }
        }
        let ceci = this;
        let promesseParent = new Promise(async function(resolutionParent) {
            let _dib84;
            let promesse = new Promise(resolution => {
                fureteur.storage.local.get("objetGlobal").then(o => {
                    _dib84 = o.objetGlobal;
                    gestionnaireLogDW.sauvegardeLog({
                        message: "traitement_global",
                        data: {
                            etat: "ok",
                            data: _dib84
                        }
                    });
                    fureteur.storage.local.set({
                        message: "traitement_global",
                        data: {
                            etat: "ok"
                        }
                    });
                    resolution(true);
                }).catch(erreur => {
                    console.error("background.objetGlobal.recupere", erreur);
                    gestionnaireLogDW.sauvegardeLog({
                        message: "traitement_global",
                        data: {
                            etat: "erreur",
                            data: erreur
                        }
                    });
                    fureteur.storage.local.set({
                        message: "traitement_global",
                        data: {
                            etat: "erreur",
                            data: erreur
                        }
                    });
                    resolution(false)
                });
            });
            let reponse = await promesse;
            if (reponse && _dib84 !== undefined) {
                ceci.metsDonnees(_dib84, false);
                globalEstChargeay = true;
                resolutionParent(true);
            } else {
                globalEstChargeay = true;
                resolutionParent(false);
            }
        });
        return promesseParent;
    }
    async sauvegarde() {
        await fureteur.storage.local.set({
            objetGlobal: this
        });
    }
    doisConfirmerIdAntidote() {
        return this.idAntidote < 0;
    }
    estAntidoteWeb() {
        return estAntidoteWeb(this.idAntidote);
    }
    estAntidoteWebPourDWeb() {
        return this.estAntidoteWeb();
    }
    estCEDisponible() {
        if (this.idAntidote == cstIdAntidoteWebAConfirmer) return false;
        return this.infoDW.activation[this.idAntidote].disponible;
    }
    estCEActive() {
        if (this.idAntidote == cstIdAntidoteWebAConfirmer) return false;
        return this.infoDW.activation[this.idAntidote].active;
    }
    metsCEInactive() {
        if (this.idAntidote != cstIdAntidoteWebAConfirmer)
            this.infoDW.activation[this.idAntidote].active = false;
        if (this.estAntidoteWeb()) {
            nettoieCookie();
        }
    }
    metsCEActive() {
        if (this.idAntidote != cstIdAntidoteWebAConfirmer)
            this.infoDW.activation[this.idAntidote].active = true;
    }
    metsCENonDispo() {
        if (this.idAntidote != cstIdAntidoteWebAConfirmer)
            this.infoDW.activation[this.idAntidote].disponible = false;
    }
    metsCEDispo() {
        if (this.idAntidote != cstIdAntidoteWebAConfirmer)
            this.infoDW.activation[this.idAntidote].disponible = true;
    }
    _donneVersionEdition(laVersion) {
        var ret = 0;
        if (laVersion.length > 0) {
            var jetons = laVersion.split(cstSeparateurVersion);
            ret = parseInt(jetons[0]);
        }
        return ret;
    }
    _estVersionPlusRecentOuEgale(laVersionRef, laVersionAEvaluer) {
        var versionMajRef = this._donneVersionEdition(laVersionRef);
        var versionMajEval = this._donneVersionEdition(laVersionAEvaluer);
        if (versionMajEval > versionMajRef) {
            return true;
        } else if (versionMajEval == versionMajRef) {
            var versionMajEval = this._donneVersionMiseAjour(laVersionAEvaluer);
            var versionMajRef = this._donneVersionMiseAjour(laVersionRef);
            if (versionMajEval == kMiseAjourEditionAbsente)
                return true;
            else if (versionMajRef == kMiseAjourEditionAbsente)
                return false;
            else
                return versionMajEval >= versionMajRef;
        }
        return false;
    }
    _donneVersionCh(lEdition, laMiseAjour) {
        return lEdition.toString() + cstSeparateurVersion + laMiseAjour.toString();
    }
    _donneVersionMiseAjour(laVersion) {
        var ret = kMiseAjourEditionAbsente;
        if (laVersion.length > 0) {
            var jetons = laVersion.split(cstSeparateurVersion);
            if (jetons.length > 1)
                ret = parseInt(jetons[1]);
        }
        return ret;
    }
    _donnneVersionMinPourEdition(laBorneInf, laBorneSup, laVersionEdition) {
        var ret = '';
        var editionMin = this._donneVersionEdition(laBorneInf);
        var editionMax = this._donneVersionEdition(laBorneSup);
        if (laVersionEdition >= editionMin && laVersionEdition <= editionMax) {
            if (laVersionEdition == editionMin)
                ret = this._donneVersionCh(laVersionEdition, this._donneVersionMiseAjour(laBorneInf));
            else
                ret = this._donneVersionCh(laVersionEdition, 0);
        }
        return ret;
    }
    _donnneVersionMaxPourEdition(laBorneInf, laBorneSup, laVersionEdition) {
        var ret = '';
        var editionMin = this._donneVersionEdition(laBorneInf);
        var editionMax = this._donneVersionEdition(laBorneSup);
        if (laVersionEdition >= editionMin && laVersionEdition <= editionMax) {
            if (laVersionEdition == editionMax)
                ret = this._donneVersionCh(laVersionEdition, this._donneVersionMiseAjour(laBorneSup));
            else
                ret = laVersionEdition.toString();
        }
        return ret;
    }
    _donneVersionPrisEnCharge(leObjVersion, laVersionMin, laVersionMax) {
        let laBorneInfAEvaluer = leObjVersion.versionMin;
        let laBorneSupAEvaluer = leObjVersion.versionMax;
        if (laBorneInfAEvaluer === undefined || laBorneSupAEvaluer === undefined)
            return false;
        let versionEditionMaxEval = this._donneVersionEdition(laBorneSupAEvaluer);
        let versionEditionMinEval = this._donneVersionEdition(laBorneInfAEvaluer);
        let versionEditionMaxDuComposant = this._donneVersionEdition(laVersionMax);
        let versionEditionMinDuComposant = this._donneVersionEdition(laVersionMin);
        let versionEditionMinPriseEnCharge = versionEditionMinEval > versionEditionMinDuComposant ? versionEditionMinEval : versionEditionMinDuComposant;
        let versionMinPourIntAEvaluer = this._donnneVersionMinPourEdition(laBorneInfAEvaluer, laBorneSupAEvaluer, versionEditionMinPriseEnCharge);
        let versionMinPourComposant = this._donnneVersionMinPourEdition(laVersionMin, laVersionMax, versionEditionMinPriseEnCharge);
        if (versionMinPourIntAEvaluer.length > 0 && versionMinPourComposant.length > 0)
            leObjVersion.borneInfPriseEnCharge = this._donneVersionCh(versionEditionMinPriseEnCharge, 0);
        let versionEditionMaxPriseEnCharge = versionEditionMaxEval < versionEditionMaxDuComposant ? versionEditionMaxEval : versionEditionMaxDuComposant;
        let versionMaxPourIntAEvaluer = this._donnneVersionMaxPourEdition(laBorneInfAEvaluer, laBorneSupAEvaluer, versionEditionMaxPriseEnCharge);
        let versionMaxPourComposant = this._donnneVersionMaxPourEdition(laVersionMin, laVersionMax, versionEditionMaxPriseEnCharge);
        if (versionMaxPourIntAEvaluer.length > 0 && versionMaxPourComposant.length > 0) {
            if (this._estVersionPlusRecentOuEgale(versionMaxPourComposant, versionMaxPourIntAEvaluer)) {
                leObjVersion.borneSupPriseEnCharge = versionMaxPourComposant;
            } else {
                leObjVersion.borneSupPriseEnCharge = versionMaxPourIntAEvaluer;
            }
            return true;
        }
        return false;
    }
    _donneVersionIATPrisEnCharge() {
        return this._donneVersionPrisEnCharge(this.versionIAT, cstVersionIATMin, cstVersionIATMax);
    }
    _donneVersionPontAAPrisEnCharge() {
        return this._donneVersionPrisEnCharge(this.versionPontAA, cstVersionPontAAMin, cstVersionPontAAMax);
    }
    _donneVersionPontAAPrisEnChargeAEC() {
        return this._donneVersionPrisEnCharge(this.versionPontAA, cstVersionPontAA.fn.AEC.min, cstVersionPontAA.fn.AEC.max);
    }
    _estAntidoteX(laVersion) {
        return this._donneVersionPrisEnCharge(this.versionPontAA, cstVersionPontAA.produit[laVersion].min, cstVersionPontAA.produit[laVersion].max);
    }
    _traiteListeExclusion(laListeExclusion, doisSauvegarder) {
        let uneListeExlusion = []
        for (let uneAdresse of laListeExclusion) {
            if (uneAdresse.length > 0 && uneAdresse.trim().substring(0, 4) != "http") {
                uneListeExlusion.push("https://" + uneAdresse.trim());
            } else {
                uneListeExlusion.push(uneAdresse);
            }
        }
        this.infoDW.listeExclusion = uneListeExlusion;
    }
    metsAjour(_dib84) {}
    estModeRetrocompatible() {
        return this.versionPont == cstVersionPontRetrocompatible;
    }
    donneIdTexteur(leIdCommuniction) {
        if (this.versionPont == cstVersionPontAAMax) {
            return monIdTexteur + "_" + leIdCommuniction;
        } else {
            return monIdTexteur;
        }
    }
}
let mesOuvriers = {
    o: null,
    init: function() {
        mesOuvriers.o = new Map();
    },
    ajoute: function(idOuvrier, ouvrier) {
        if (typeof idOuvrier != "string") {
            idOuvrier = idOuvrier.toString();
        }
        if (mesOuvriers.o == null) {
            mesOuvriers.o = new Map();
        }
        mesOuvriers.o.set(idOuvrier, ouvrier);
    },
    detruis: async function(idOuvrier) {
        if (mesOuvriers.o.has(idOuvrier)) {
            mesOuvriers.o.delete(idOuvrier);
        }
    },
    donne: async function(idOuvrier) {
        if (idOuvrier === undefined) return {};
        if (typeof idOuvrier != "string") {
            idOuvrier = idOuvrier.toString();
        }
        if (mesOuvriers.o != null && mesOuvriers.o.has(idOuvrier)) {
            let desDonnees = mesOuvriers.o.get(idOuvrier);
            if (desDonnees) {
                if (!desDonnees.infoAWeb.estPageAWeb && !desDonnees.infoAWeb.estTexteurNatif && idOuvrier > 0) {
                    let promesseEnvoi = new Promise(async (resolutionEnvoi) => {
                        fureteur.tabs.sendMessage(parseInt(desDonnees.idOnglet), {
                            message: "test"
                        }).then((m) => {
                            resolutionEnvoi(true);
                        }).catch(erreur => {
                            desDonnees = {
                                idOnglet: "-1"
                            };
                            resolutionEnvoi(true);
                        });
                    });
                    await promesseEnvoi;
                }
                return desDonnees
            } else {};
        } else if (idOuvrier != "" && parseInt(idOuvrier) > -1) {
            fureteur.tabs.sendMessage(parseInt(idOuvrier), {
                message: "reconnexion"
            }).catch(erreur => {});
            return {};
        }
    },
    metsAjour: function(_dib84) {
        if (mesOuvriers.o == null) {
            mesOuvriers.init();
        }
        mesOuvriers.o = new Map(Object.entries(_dib84));
    }
}
class ObjetOuvrier {
    constructor() {
        this.idOnglet = -1;
        this.nomOnglet = null;
        this.url = "";
        this.infoAWeb = {
            estPageAWeb: false,
            estTexteurNatif: false,
            idLiay: "",
            infoJeton: {
                jeton: "",
                urlRedirect: ""
            },
            infoOutils: {
                message: "",
                _dib106: 0,
                _dib30: "",
                langue: "",
                ouvrageAntidote: "",
                outil: "",
                idDocument: undefined
            },
        };
        this.infoDW = {
            ws: null,
            estActivay: true,
            idAppelant: "",
            aZoneIgnoree: false,
            champ: {
                id: "",
                actif: false
            }
        };
        this.infoGDoc = {
            estGoogleDoc: false,
            zones: null,
            listeBoites: null
        };
        this.reload = 0;
        this.appelayPar = "";
        this.estOffice365Online = false;
        this.estIncompatibleAvecDW = false;
        this.reponseDialogue = -1;
    }
    async initConnexion() {
        if (!gestionnaireWebSocket._estValide(this.idOnglet)) {
            await gestionnaireWebSocket.initialise(this.idOnglet);
        }
        let promesse = new Promise((resolution) => {
            resolution(gestionnaireWebSocket._estValide(this.idOnglet));
        })
        return promesse;
    }
    async metsDonnees(data, doisSauvegarder) {
        let ceci = this;
        let promesse = new Promise(async function(resolution) {
            if (typeof data === "undefined" || data === undefined || data == null || estVide(data)) {
                resolution(false);
            } else {
                if (doisSauvegarder === undefined) doisSauvegarder = true;
                if (typeof data.idOnglet !== "undefined") {
                    ceci.idOnglet = data.idOnglet;
                }
                if (data.nomOnglet !== undefined) ceci.nomOnglet = data.nomOnglet;
                if (data.url !== undefined) ceci.url = data.url;
                if (data.infoAWeb !== undefined && data.infoAWeb.estPageAWeb !== undefined) ceci.infoAWeb.estPageAWeb = data.infoAWeb.estPageAWeb;
                if (data.infoAWeb !== undefined && data.infoAWeb.estTexteurNatif !== undefined) ceci.infoAWeb.estTexteurNatif = data.infoAWeb.estTexteurNatif;
                if (data.infoAWeb !== undefined && data.infoAWeb.idLiay !== undefined) ceci.infoAWeb.idLiay = data.infoAWeb.idLiay;
                if (data.infoAWeb !== undefined && data.infoAWeb.infoJeton !== undefined && data.infoAWeb.infoJeton.jeton !== undefined) ceci.infoAWeb.infoJeton.jeton = data.infoAWeb.infoJeton.jeton;
                if (data.infoAWeb !== undefined && data.infoAWeb.infoJeton !== undefined && data.infoAWeb.infoJeton.urlRedirect !== undefined) ceci.infoAWeb.infoJeton.urlRedirect = data.infoAWeb.infoJeton.urlRedirect;
                if (data.infoAWeb !== undefined && data.infoAWeb.infoOutils !== undefined && data.infoAWeb.infoOutils.message !== undefined) ceci.infoAWeb.infoOutils.message = data.infoAWeb.infoOutils.message;
                if (data.infoAWeb !== undefined && data.infoAWeb.infoOutils !== undefined && data.infoAWeb.infoOutils._dib106 !== undefined) ceci.infoAWeb.infoOutils._dib106 = data.infoAWeb.infoOutils._dib106;
                if (data.infoAWeb !== undefined && data.infoAWeb.infoOutils !== undefined && data.infoAWeb.infoOutils._dib30 !== undefined) ceci.infoAWeb.infoOutils._dib30 = data.infoAWeb.infoOutils._dib30;
                if (data.infoAWeb !== undefined && data.infoAWeb.infoOutils !== undefined && data.infoAWeb.infoOutils.langue !== undefined) ceci.infoAWeb.infoOutils.langue = data.infoAWeb.infoOutils.langue;
                if (data.infoAWeb !== undefined && data.infoAWeb.infoOutils !== undefined && data.infoAWeb.infoOutils.ouvrageAntidote !== undefined) ceci.infoAWeb.infoOutils.ouvrageAntidote = data.infoAWeb.infoOutils.ouvrageAntidote;
                if (data.infoAWeb !== undefined && data.infoAWeb.infoOutils !== undefined && data.infoAWeb.infoOutils.outil !== undefined) ceci.infoAWeb.infoOutils.outil = data.infoAWeb.infoOutils.outil;
                if (data.infoAWeb !== undefined && data.infoAWeb.infoOutils !== undefined && data.infoAWeb.infoOutils.idDocument !== undefined) ceci.infoAWeb.infoOutils.idDocument = data.infoAWeb.infoOutils.idDocument;
                if (data.infoDW !== undefined && data.infoDW.ws !== undefined) ceci.infoDW.ws = data.infoDW.ws;
                if (data.infoDW !== undefined && data.infoDW.estActivay !== undefined) ceci.infoDW.estActivay = data.infoDW.estActivay;
                if (data.infoDW !== undefined && data.infoDW.idAppelant !== undefined) ceci.infoDW.idAppelant = data.infoDW.idAppelant;
                if (data.infoDW !== undefined && data.infoDW.aZoneIgnoree !== undefined) ceci.infoDW.aZoneIgnoree = data.infoDW.aZoneIgnoree;
                if (data.infoDW !== undefined && data.infoDW.champ !== undefined && data.infoDW.champ.id !== undefined) {
                    ceci.infoDW.champ.id = data.infoDW.champ.id;
                }
                if (data.infoDW !== undefined && data.infoDW.champ !== undefined && data.infoDW.champ.actif !== undefined) {
                    ceci.infoDW.champ.actif = data.infoDW.champ.actif;
                }
                if (data.infoGDoc !== undefined && data.infoGDoc.estGoogleDoc !== undefined) ceci.infoGDoc.estGoogleDoc = data.infoGDoc.estGoogleDoc;
                if (data.infoGDoc !== undefined && data.infoGDoc.zones !== undefined) ceci.infoGDoc.zones = data.infoGDoc.zones;
                if (data.infoGDoc !== undefined && data.infoGDoc.listeBoites !== undefined) ceci.infoGDoc.listeBoites = data.infoGDoc.listeBoites;
                if (data.reload !== undefined) ceci.reload = data.reload;
                if (data.appelayPar !== undefined) ceci.appelayPar = data.appelayPar;
                if (data.estOffice365Online !== undefined) ceci.estOffice365Online = data.estOffice365Online;
                if (data.estIncompatibleAvecDW !== undefined) ceci.estIncompatibleAvecDW = data.estIncompatibleAvecDW;
                if (data.reponseDialogue !== undefined) ceci.reponseDialogue = data.reponseDialogue;
                if (doisSauvegarder) {
                    mesOuvriers.ajoute(ceci.idOnglet, ceci);
                    resolution(ceci.sauvegarde());
                } else {
                    resolution(true);
                }
            }
        });
        return promesse;
    }
    async recupere(leTabId) {
        if (leTabId !== undefined && typeof leTabId != "string")
            leTabId = leTabId.toString();
        leTabId = gestionnairePort.convertisIdDocumentEnIdPort(leTabId);
        let ceci = this;
        let promesseParent = new Promise(async function(resolutionParent) {
            if (leTabId === undefined || mesOuvriers === undefined) resolutionParent(false);
            let desDonnees = await mesOuvriers.donne(leTabId);
            let reponse = await ceci.metsDonnees(desDonnees, false);
            resolutionParent(reponse);
        });
        return promesseParent;
    }
    async recupereAwebAvecIdDocument(leIDDoc) {
        let ceci = this;
        let promesseParent = new Promise(async function(resolution) {
            if (leIDDoc === undefined || mesOuvriers === undefined)
                resolution(false);
            let unId = undefined;
            mesOuvriers.o.forEach(async (value, key) => {
                if (value.infoAWeb.estPageAWeb && value.infoAWeb.idLiay == leIDDoc)
                    unId = key;
            });
            if (unId === undefined)
                resolution(false);
            let desDonnees = await mesOuvriers.donne(unId);
            let reponse = await ceci.metsDonnees(desDonnees, false);
            resolution(reponse);
        });
        return promesseParent;
    }
    async detruis(leTabId) {
        if (leTabId === undefined) {
            leTabId = this.idOnglet;
        }
        if (typeof leTabId != "string")
            leTabId = leTabId.toString();
        let _dib84;
        var promesse = new Promise(function(resolution) {
            fureteur.storage.local.get("objetOuvriers").then(o => {
                _dib84 = o.objetOuvriers;
                resolution(true);
            });
        });
        if (this.infoAWeb.estPageAWeb)
            gestionnairePort.supprimeAssociationIdDocument(this.infoAWeb.idLiay);
        await promesse;
        let dictionnaireDonnees;
        if (_dib84 !== undefined) {
            dictionnaireDonnees = new Map(Object.entries(_dib84));
        } else {
            dictionnaireDonnees = new Map();
        }
        let idLiay = "";
        if (dictionnaireDonnees.has(leTabId)) {
            gestionnaireWebSocket.envoieMessageRompsLien(leTabId);
            idLiay = _dib84[leTabId].infoAWeb.idLiay.toString();
            if (dictionnaireDonnees.has(idLiay)) {
                let d = dictionnaireDonnees.get(idLiay);
                d.infoAWeb.idLiay = "";
                dictionnaireDonnees.set(idLiay, d);
                global.metsDonnees({
                    idOngletActif: idLiay
                });
            }
            dictionnaireDonnees.delete(leTabId);
            mesOuvriers.detruis(leTabId);
            await fureteur.storage.local.set({
                objetOuvriers: Object.fromEntries(dictionnaireDonnees)
            });
        }
    }
    async sauvegarde() {
        let ceci = this;
        let promesse = new Promise(async function(resolution) {
            let _dib84 = await fureteur.storage.local.get("objetOuvriers");
            _dib84 = _dib84.objetOuvriers;
            let dictionnaireDonnees;
            if (_dib84 !== undefined) {
                dictionnaireDonnees = new Map(Object.entries(_dib84));
            } else {
                dictionnaireDonnees = new Map();
            }
            if (ceci.idOnglet != -1) {
                dictionnaireDonnees.set(ceci.idOnglet.toString(), ceci);
                await fureteur.storage.local.set({
                    objetOuvriers: Object.fromEntries(dictionnaireDonnees)
                });
                resolution(true);
                await gPromesseStorageConfirmation;
            } else {
                resolution(false);
            }
        });
        return promesse;
    }
    async active(focusFenetre) {
        if (focusFenetre === undefined) focusFenetre = true;
        if (this.idOnglet != -1) {
            if ((global.estAntidoteWeb() && !global.estModeiOS) || estThunderbird()) {
                let tabInfo = await fureteur.tabs.get(this.idOnglet);
                if (focusFenetre) fureteur.windows.update(tabInfo.windowId, {
                    focused: true
                });
            }
            return fureteur.tabs.update(this.idOnglet, {
                active: true
            });
        }
        return;
    }
    async donneTitre() {
        let ceci = this;
        let promesseTitre = new Promise(async function(resolution) {
            let onglet = await fureteur.tabs.get(ceci.idOnglet);
            resolution(onglet !== undefined ? onglet.title : "");
        });
        return promesseTitre;
    }
    async donneUrl() {
        let ceci = this;
        let promesseUrl = new Promise(async function(resolution) {
            if (ceci.idOnglet > 0) {
                let onglet = await fureteur.tabs.get(ceci.idOnglet);
                resolution(onglet !== undefined ? onglet.url : "");
            } else {
                resolution("");
            }
        });
        return promesseUrl;
    }
    async afficheDialogue(lesDonneesDialogue) {
        if (!estThunderbird()) {
            this.reponseDialogue = -1;
            lesDonneesDialogue.identifiant_requete_dialogue = uuidv4();
            this.envoieMessageAuDocument(lesDonneesDialogue);
            return gestionnaireAttenteOperation.attendOperation(lesDonneesDialogue.identifiant_requete_dialogue);
        } else {
            let boutonTexte1 = lesDonneesDialogue.message == "_dib41" ? "OK" : lesDonneesDialogue.chaine_ok;
            let boutonTexte2 = lesDonneesDialogue.message == "_dib41" ? "OK" : lesDonneesDialogue.chaine_annuler;
            let r = await gestionnaireDialogue.afficheMessage("dialogue", {
                MESSAGE: lesDonneesDialogue._dib37,
                EXPLICATION: lesDonneesDialogue.explication,
                BOUTONS: {
                    bouton1: {
                        texteBouton: boutonTexte1,
                        retour: boutonTexte1,
                        autofocus: false,
                        jeSuisMac: global.plateforme == "mac"
                    },
                    bouton2: {
                        texteBouton: boutonTexte2,
                        retour: boutonTexte2,
                        autofocus: true,
                        jeSuisMac: global.plateforme == "mac"
                    },
                    bouton3: {}
                },
                messageReponse: lesDonneesDialogue.messageReponse
            }, this.idOnglet);
            return r;
        }
    }
    async envoieMessageAuDocument(msg, port = undefined) {
        if (this.idOnglet == 0) return;
        if (msg.message === undefined) {
            return;
        }
        msg.nomOnglet = undefined;
        msg._dib104 = global.idAntidote;
        if (!this.infoAWeb.estTexteurNatif) {
            let estGoogleDocLiay = false;
            let ouvrierLiay = new ObjetOuvrier();
            if (this.infoAWeb.estPageAWeb) {
                await ouvrierLiay.recupere(this.infoAWeb.idLiay);
                estGoogleDocLiay = ouvrierLiay.infoGDoc.estGoogleDoc;
            }
            if (this.infoGDoc.estGoogleDoc || estGoogleDocLiay) {
                let ouvrierGoogleDoc = estGoogleDocLiay ? ouvrierLiay : this;
                if (msg.message == "CorrigeAvecContexte" || msg.message == "_pb21d" || msg.message == "_pb15d") {
                    if (global.googleDoc.monoZone) {
                        var d = chercheZone(ouvrierGoogleDoc.infoGDoc.listeBoites, msg._dib49, msg._dib50);
                        if (d !== undefined) {
                            msg._dib99 = d.zone;
                            msg._dib49 = d._dib49;
                            msg._dib50 = d._dib50;
                            if (msg.message == "CorrigeAvecContexte" || msg.message == "_pb15d") {
                                var debutContexte = msg.debutContexte !== undefined ? msg.debutContexte : msg._dib49;
                                var finContexte = msg.finContexte !== undefined ? msg.finContexte : msg._dib50;
                                if (debutContexte != msg._dib49 || finContexte != msg._dib50) {
                                    var dc = chercheZoneSelonZone(ouvrierGoogleDoc.infoGDoc.listeBoites, debutContexte, finContexte, d.zone);
                                    msg.debutContexte = dc._dib49;
                                    msg.finContexte = dc._dib50;
                                }
                                var uneNouvelleListe = metsAJourListeBoite(ouvrierGoogleDoc.infoGDoc.listeBoites, d._dib86, msg._dib49, msg._dib50, msg._dib37);
                                ouvrierGoogleDoc.metsDonnees({
                                    infoGDoc: {
                                        listeBoites: uneNouvelleListe
                                    }
                                });
                            }
                        }
                    }
                    msg.versionPontGDoc = maVersionPontGDoc;
                }
            }
            if (msg.idAppelant === undefined) {
                msg.idAppelant = this.infoDW.idAppelant;
            }
            if (!this.infoAWeb.estPageAWeb) {
                gestionnairePort.envoieMessage(msg, this.idOnglet, this);
            } else {
                let idPort = gestionnairePort.convertisIdDocumentEnIdPort(this.infoAWeb.idLiay);
                gestionnairePort.envoieMessage(msg, idPort, this);
            }
        } else {
            if (port === undefined)
                this.envoieMessageAAgentConnectix(msg);
            else
                this.envoieMessageDirectementAuTexteur(msg, port);
        }
    }
    envoieMessageAAweb(msg) {
        if (msg.message === undefined) {
            return;
        }
        if (this.infoAWeb.estPageAWeb) {
            msg.type = "MessagePourAWeb";
            gestionnairePort.envoieMessage(msg, this.idOnglet, this);
        } else {
            if (estThunderbird()) {
                msg._dib82 = encodeChainePourJson(msg._dib81);
            }
            gestionnairePort.envoieMessage(msg, this.infoAWeb.idLiay, this);
        }
    }
    async envoieMessageAAntidote(msg) {
        this.envoieMessageAAgentConnectix(msg);
    }
    async envoieMessageAAntidoteAntiOups(msg) {
        if (global.estAntidoteWeb()) {
            if (msg.message == "Deinitialise") {
                estThunderbird() && gestionnaireAntiOupsThunderbird.nettoieLeDictionnaireDesDetails(msg._dib81);
            } else if (msg.message == "FermeModuleDuCourriel") {
                if (this.infoAWeb.idLiay.length > 0)
                    estThunderbird() && fureteur.tabs.remove(this.infoAWeb.idLiay);
            }
        } else {
            this.envoieMessageAAgentConnectix(msg);
        }
    }
    async envoieMessageAAgentConnectix(msg) {
        if (msg.message === undefined) {
            return;
        }
        if (msg.donnees_globales !== undefined) msg.donnees_globales = {};
        if (gestionnaireWebSocket._estValide(this.idOnglet)) {
            gestionnaireWebSocket.envoieMessageParPaquetSiNecessaire(msg, this.idOnglet);
        } else {
            gestionnaireWebSocket.etablisConnexionWebSocket(msg, this.idOnglet);
        }
    }
    async envoieMessageDirectementAuTexteur(msg, port) {
        if (msg.message === undefined) {
            return;
        }
        if (msg.donnees_globales !== undefined) msg.donnees_globales = {};
        if (gestionnaireWebSocket._estValide(this.idOnglet)) {
            gestionnaireWebSocket.envoieMessageParPaquetSiNecessaire(msg, this.idOnglet);
        } else {
            gestionnaireWebSocket.etablisConnexionWebSocket(msg, this.idOnglet, port);
        }
    }
    async _metsAjourGlobal() {}
}
let gestionnaireLogDW = {
    bd: [],
    init: async function() {
        await fureteur.storage.local.remove("log_dw");
        gestionnaireLogDW.bd.push({
            message: "init_connecteur",
            temps: new Date().getTime()
        });
    },
    sauvegardeLog: async function(lesDonnees) {
        if (lesDonnees.liste_logs !== undefined) {
            for (let m of lesDonnees.liste_logs) {
                let objetLog = {};
                for (let d of Object.keys(lesDonnees)) {
                    if (d !== "liste_logs") {
                        objetLog[d] = lesDonnees[d];
                    }
                }
                objetLog.donnees_traitees = JSON.parse(m.phrase);
                objetLog.donnees_brutes = JSON.parse(m.msg);
                objetLog.temps = m.temps;
                objetLog.message = "enregistreLogs";
                gestionnaireLogDW.bd.unshift(objetLog);
                await attendreAsync(10);
            }
        } else {
            lesDonnees.temps = new Date().getTime();
            gestionnaireLogDW.bd.unshift(lesDonnees);
        }
        if (gestionnaireLogDW.bd.length > 50) {
            gestionnaireLogDW.bd.splice(50);
        }
    },
    donneListeLogs: async function() {
        return gestionnaireLogDW.bd;
    },
    supprimeLogs: async function() {
        gestionnaireLogDW.bd = [];
    }
};
let gestionnaireErreur = {
    nbErreurs: 0,
    messageErreur: "",
    storage: fureteur.storage.session,
    init: function() {
        if (estGoogleChrome()) {
            this.storage = fureteur.storage.local;
        }
        gestionnaireErreur.messageErreur = "";
        if (estSafariWebex() && estVersionInferieure(global.versionSafari, "16.4")) {
            global.activeLog = false;
            this.storage = null;
        } else {
            this.storage.set({
                "log_erreur": []
            });
        }
    },
    afficheBadge: async function() {
        if (global.activeLog) {
            if (gestionnaireErreur.nbErreurs > 0) {
                gestionnaireBouton.metsCouleur([252, 232, 3, 255]);
                gestionnaireBouton.metsTexte(gestionnaireErreur.nbErreurs.toString());
            } else if (gestionnaireErreur.messageErreur == "") {
                gestionnaireBouton.metsTexte("");
            }
        }
    },
    traiteErreur: function(lesDonnees) {
        if (global.activeLog) {
            lesDonnees.type_antidote = global.infoDW.idAntidote;
            this.sauvegarde(lesDonnees);
        }
    },
    sauvegarde: async function(lesDonnees) {
        if (this.storage) {
            let unArrayErreur = [lesDonnees];
            let desErreurs = await this.storage.get("log_erreur");
            let desNouvellesErreurs = desErreurs.log_erreur.concat(unArrayErreur);
            gestionnaireErreur.nbErreurs = desNouvellesErreurs.length;
            this.storage.set({
                "log_erreur": desNouvellesErreurs
            });
            gestionnaireErreur.afficheBadge();
        }
    },
    donneListeErreurs: async function() {
        return this.storage ? this.storage.get("log_erreur") : {};
    },
    supprimeErreurs: async function() {
        gestionnaireErreur.nbErreurs = 0;
        if (this.storage) await this.storage.remove("log_erreur");
        gestionnaireBouton.metsTexte("");
    }
};
let gestionnaireWebSocket = {
    mesConnexions: {},
    monIntervalId: 0,
    uuid: {},
    jeRecoisDesPaquets: false,
    monDialogueErreurPeutAfficher: false,
    maListeDesDonneesPourMessageEnPaquet: [],
    initialise(leIdCommuniction) {
        return gestionnaireWebSocket.etablisConnexionWebSocket({
            message: cstMessageReglageAgentConnectix,
            _dib105: cstTypeMessageRequeteAgentConnectix,
            _dib101: cstRoleConnecteur,
            ORIGINE: "GESTIONNAIREWEBSOCKET-INITIALISE"
        }, leIdCommuniction);
    },
    reInitialise() {},
    async afficheErreur6011(leIdCommuniction) {
        if (gestionnaireWebSocket.monDialogueErreurPeutAfficher) {
            gestionnaireWebSocket.monDialogueErreurPeutAfficher = false;
            if (!gestionnaireWebSocket._estValide(leIdCommuniction)) {
                let ouvrier = new ObjetOuvrier();
                await ouvrier.recupere(leIdCommuniction);
            }
        }
    },
    donneSigneDeVie() {
        fureteur.alarms.create("signe_de_vie", {
            periodInMinutes: 0.5
        });
        fureteur.alarms.onAlarm.addListener(async (a) => {
            if (a.name == "signe_de_vie") {
                if (gestionnaireWebSocket.mesConnexions[0] !== undefined && gestionnaireWebSocket.mesConnexions[0].readyState == WebSocket.OPEN) {
                    gestionnaireWebSocket.mesConnexions[0].send(JSON.stringify({
                        "message": "battement_de_coeur"
                    }));
                } else {
                    fureteur.alarms.clear("signe_de_vie");
                }
            }
        })
    },
    async trouvePort(lePort) {
        let ws = new WebSocket("ws://127.0.0.1:" + lePort);;
        let promesseOuvertureWebSocket = new Promise((resolution) => {
            ws.onopen = () => {
                resolution(true);
            };
            ws.onmessage = (message) => {};
            ws.onclose = (evenement) => {};
            ws.onerror = (evenement) => {
                if (lePort <= portWebSocketMinimum + nombrePortValideWebSocket) {
                    gestionnaireWebSocket.trouvePort(lePort + 1);
                } else {
                    resolution(false);
                }
            };
        });
        await promesseOuvertureWebSocket;
        return lePort;
    },
    async etablisConnexionWebSocket(leMessage, leIdCommuniction, portWs = undefined) {
        let lePortWs = portWs !== undefined && portWs ? portWs : global.portWS;
        if (lePortWs !== undefined && lePortWs != "" && (gestionnaireWebSocket._estValide(0) || leIdCommuniction == 0 || portWs !== undefined)) {
            let ws = new WebSocket("ws://127.0.0.1:" + lePortWs);;
            if (leIdCommuniction != 0) {
                gestionnaireWebSocket.monDialogueErreurPeutAfficher = true;
                fureteur.alarms.create("affiche6011", {
                    delayInMinutes: 0.5
                });
                fureteur.alarms.onAlarm.addListener((a) => {
                    if (a.name == "affiche6011") {
                        gestionnaireWebSocket.afficheErreur6011(leIdCommuniction)
                    }
                });
            }
            let promesseOuvertureWebSocket = new Promise((resolution) => {
                ws.onopen = async () => {
                    gestionnaireWebSocket.monDialogueErreurPeutAfficher = false;
                    gestionnaireWebSocket.mesConnexions[leIdCommuniction] = ws;
                    if (leIdCommuniction == 0) {
                        gestionnaireWebSocket.donneSigneDeVie();
                    }
                    if (global.estModeRetrocompatible()) {
                        global.metsDonnees({
                            idCommunicationRetrocompatible: leIdCommuniction
                        });
                    }
                    if (leMessage !== undefined) {
                        if (leMessage.message == cstMessageLanceOutil || leMessage.message == "DonneSorteIntervention") {
                            let ouvrier = new ObjetOuvrier();
                            await ouvrier.recupere(leIdCommuniction);
                            ouvrier.envoieMessageAAntidote(leMessage);
                        } else if (leMessage.message == cstMessageReglageAgentConnectix && leIdCommuniction == 0) {
                            leMessage._dib105 = cstTypeMessageRequeteAgentConnectix;
                            gestionnaireWebSocket.envoieMessageParPaquetSiNecessaire(leMessage, leIdCommuniction);
                        } else if (leMessage.message == "LienTabs") {
                            gestionnaireErreur.traiteErreur({
                                date: new Date().toString(),
                                message_log: "background.gestionnaireWebSocket.LienTabs",
                                execution: "envoie vers AgentConenctix"
                            });
                            gestionnaireWebSocket.envoieMessageParPaquetSiNecessaire(leMessage, leIdCommuniction);
                        } else if (leMessage.message == "DonneSorteInterventionAntiOups") {
                            gestionnaireWebSocket.envoieMessageParPaquetSiNecessaire(leMessage, leIdCommuniction);
                        }
                    }
                    resolution(true);
                };
                ws.onmessage = (message) => {
                    gestionnaireWebSocket._recoisMessage(message.data, leIdCommuniction);
                };
                ws.onclose = (evenement) => {
                    delete gestionnaireWebSocket.mesConnexions[leIdCommuniction];
                    if (leIdCommuniction == 0) {
                        global.metsDonnees({
                            portWS: ""
                        });
                        if (estGoogleChrome()) {
                            gestionnaireConnexionNative.fermeRespirateur();
                        }
                    }
                    if (!evenement.wasClean) {
                        gestionnaireErreur.traiteErreur({
                            date: new Date().toString(),
                            message_log: "background.gestionnaireWebSocket.onclose.non-propre"
                        });
                    }
                };
                ws.onerror = (evenement) => {
                    global.metsDonnees({
                        portWS: ""
                    });
                    delete gestionnaireWebSocket.mesConnexions[leIdCommuniction];
                    gestionnaireWebSocket.uuid[leIdCommuniction] = {};
                    gestionnaireErreur.traiteErreur({
                        date: new Date().toString(),
                        message_log: "background.gestionnaireWebSocket.onerror"
                    });
                };
            });
            return promesseOuvertureWebSocket;
        } else {
            gestionnaireConnexionNative.init(leMessage, leIdCommuniction);
        }
    },
    demandeReglages() {
        gestionnaireWebSocket.envoieMessageParPaquetSiNecessaire({
            message: cstMessageReglageAgentConnectix,
            _dib105: cstTypeMessageRequeteAgentConnectix,
            _dib101: cstRoleConnecteur,
            ORIGINE: "GESTIONNAIREWEBSOCKET-DEMANDE"
        });
    },
    envoieMessageParPaquetSiNecessaire(msg, leIdCommuniction) {
        if (leIdCommuniction === undefined || leIdCommuniction == -1) {
            leIdCommuniction = 0;
        }
        if (gestionnaireWebSocket.uuid[msg.message] !== undefined)
            msg.uuid = gestionnaireWebSocket.uuid[msg.message];
        let uneChaine = JSON.stringify(msg);
        var lg = uneChaine.length;
        if (lg > nbCaractereMaxRequeteWS && !estThunderbird()) {
            uneChaine = encodeChainePourJson(uneChaine);
            lg = uneChaine.length;
            var i = 0;
            var idPaquet = 1;
            var unJson = {
                _dib83: 999,
                _dib85: 999,
                _dib80: 1,
                _dib81: global.donneIdTexteur(leIdCommuniction),
                versionPont: global.versionPont,
                message: msg.message,
                _dib84: ""
            };
            var uneEntete = JSON.stringify(unJson);
            var lgMaxSansEntete = (nbCaractereMaxRequeteWS - (uneEntete.length + 10));
            var nbPaquet = Math.ceil(lg / lgMaxSansEntete);
            do {
                unJson = {
                    _dib83: idPaquet,
                    _dib85: nbPaquet,
                    _dib80: 1,
                    _dib81: global.donneIdTexteur(leIdCommuniction),
                    versionPont: global.versionPont,
                    message: msg.message,
                    _dib84: ""
                };
                uneEntete = JSON.stringify(unJson);
                var lgRestante = lg - i;
                var lgPaquet = (lgRestante > lgMaxSansEntete ? lgMaxSansEntete : lgRestante);
                if (lgPaquet > 0) {
                    unJson._dib84 = uneChaine.substr(i, lgPaquet);
                }
                gestionnaireWebSocket.envoieLesPaquets(unJson, leIdCommuniction);
                i += lgPaquet;
                idPaquet = idPaquet + 1;
            } while (i <= lg && idPaquet <= nbPaquet);
        } else {
            gestionnaireWebSocket.envoieLesPaquets(msg, leIdCommuniction);
        }
    },
    async envoieMessageRompsLien(leIdCommuniction) {
        let ouvrier = new ObjetOuvrier();
        await ouvrier.recupere(leIdCommuniction);
        if ((!global.estAntidoteWeb() || ouvrier.infoAWeb.estTexteurNatif) && gestionnaireWebSocket._estValide(leIdCommuniction)) {
            let msg = {};
            msg._dib79 = leIdCommuniction;
            msg.message = "_pb19d";
            msg._dib105 = cstTypeMessageRequete;
            msg._dib103 = "";
            msg.nomExpediteur = monIdConnecteur;
            if (ouvrier.infoAWeb.estTexteurNatif) {
                msg.idDocument = ouvrier.infoAWeb.idLiay;
            }
            gestionnaireWebSocket.envoieMessageParPaquetSiNecessaire(msg, leIdCommuniction);
            msg.message = "_pb18d";
            gestionnaireWebSocket.envoieMessageParPaquetSiNecessaire(msg, leIdCommuniction);
            gestionnaireWebSocket.mesConnexions[leIdCommuniction].close(1000);
            if (ouvrier.infoAWeb.estTexteurNatif) {
                gestionnaireAWebTexteurNatif.detruis(ouvrier.infoAWeb.idLiay);
            }
        }
    },
    envoieLesPaquets(msg, leIdCommuniction) {
        if (msg._dib81 === undefined) {
            msg._dib81 = global.donneIdTexteur(leIdCommuniction);
        }
        if (msg.message == "donneProgression") {
            msg._dib103 = msg._dib81;
        }
        msg.versionPont = global.versionPont;
        if (msg.message == "LanceOutil" && msg.outil == "C1" && !estThunderbird()) {
            msg.nomExpediteur = "ModuleAntidoteCourrielleurNavigateur";
        }
        if (gestionnaireWebSocket.uuid[msg.message] !== undefined)
            msg.uuid = gestionnaireWebSocket.uuid[msg.message];
        if (global.estAntidoteWeb()) {
            msg._dib104 = cstIdAntidoteWeb;
        }
        if (estThunderbird()) {
            msg._dib82 = encodeChainePourJson(msg._dib81);
            if (msg._dib79 !== undefined) {
                msg._dib79 = encodeChainePourJson(msg._dib79);
            }
            msg._dib80 = 1;
            msg.versionPont = "1.0";
        }
        gestionnaireWebSocket._envoieMessage(msg, leIdCommuniction);
    },
    _aRecuTousLesPaquets: function(leNombrePaquet) {
        if (!gestionnaireWebSocket.maListeDesDonneesPourMessageEnPaquet.length == 0) {
            for (var i = 0; i < leNombrePaquet; i++) {
                if (gestionnaireWebSocket.maListeDesDonneesPourMessageEnPaquet[i].length == 0) {
                    return false;
                }
            }
        }
        return true;
    },
    _traiteMessage(message) {
        message = message.replace(/(\u001D)/gm, "\\u001D");
        let unMessageObjet = JSON.parse(message);
        var msg = null;
        if (unMessageObjet._dib83 !== undefined) {
            gestionnaireWebSocket.jeRecoisDesPaquets = true;
            var msgPaquet = unMessageObjet;
            var _dib84 = msgPaquet._dib84;
            var unNombrePaquet = msgPaquet._dib85;
            var unNoPaquet = msgPaquet._dib83;
            if (gestionnaireWebSocket.maListeDesDonneesPourMessageEnPaquet.length == 0) {
                for (var index = 0; index < unNombrePaquet; index++) {
                    gestionnaireWebSocket.maListeDesDonneesPourMessageEnPaquet[index] = '';
                }
            }
            gestionnaireWebSocket.maListeDesDonneesPourMessageEnPaquet[unNoPaquet - 1] = _dib84;
            if (gestionnaireWebSocket._aRecuTousLesPaquets(unNombrePaquet)) {
                var uneChaine = "";
                for (var i = 0; i < unNombrePaquet; i++)
                    uneChaine = uneChaine + this.maListeDesDonneesPourMessageEnPaquet[i];
                message = decodeURIComponent(escape(self.atob(uneChaine)));
                gestionnaireWebSocket.jeRecoisDesPaquets = false;
            }
        } else {
            gestionnaireWebSocket.jeRecoisDesPaquets = false;
        }
        if (!gestionnaireWebSocket.jeRecoisDesPaquets) {
            gestionnaireWebSocket.maListeDesDonneesPourMessageEnPaquet = [];
            msg = JSON.parse(message);
        }
        return msg;
    },
    _recoisMessage(message, leIdCommuniction) {
        let msg = gestionnaireWebSocket._traiteMessage(message);
        if (msg == null) {
            return;
        }
        let unUUID = msg.uuid !== undefined ? msg.uuid : "";
        gestionnaireWebSocket.uuid[msg.message] = unUUID;
        gestionnaireMessageWebSocket(msg, leIdCommuniction);
    },
    _envoieMessage(leMessage, leIdCommuniction) {
        try {
            if (global.estModeRetrocompatible()) {
                leIdCommuniction = global.idCommunicationRetrocompatible != "" ? global.idCommunicationRetrocompatible : leIdCommuniction;
            }
            if (gestionnaireWebSocket._estValide(leIdCommuniction)) {
                if (typeof leMessage == 'object') {
                    leMessage = JSON.stringify(leMessage);
                }
                gestionnaireWebSocket.mesConnexions[leIdCommuniction].send(leMessage);
            } else {
                gestionnaireWebSocket.etablisConnexionWebSocket(leMessage, leIdCommuniction);
            }
        } catch (erreur) {
            console.error("background.gestionnaireWebSocket._envoieMessage", erreur);
            gestionnaireErreur.traiteErreur({
                date: new Date().toString(),
                message_log: "background.gestionnaireWebSocket._envoieMessage.erreur",
                erreur: erreur
            });
        }
    },
    _estValide(leIdCommuniction) {
        return gestionnaireWebSocket.mesConnexions[leIdCommuniction] !== undefined && gestionnaireWebSocket.mesConnexions[leIdCommuniction] != null && gestionnaireWebSocket.mesConnexions[leIdCommuniction].readyState == WebSocket.OPEN;
    }
}
async function nettoieCookie() {
    await fureteur.cookies.remove({
        url: global.infoDW.adresseDWeb,
        name: "__Secure-jeton"
    });
}
async function ajouteCookie(lObjetBiscuit) {
    await fureteur.cookies.set(lObjetBiscuit);
}
async function EnregistreSecureJeton(leCookie) {
    let ouvrier = new ObjetOuvrier()
    await ouvrier.recupere(0);
    var edit_msg = {
        message: "enregistreJeton",
        _dib105: cstTypeMessageRequeteAgentConnectix,
        _dib29: leCookie.value
    };
    ouvrier.envoieMessageAAgentConnectix(edit_msg);
    global.metsDonnees({
        infoDW: {
            cookieAWeb: leCookie.name + "=" + leCookie.value + "; ",
            cookieAWebValue: leCookie.value
        }
    });
}
fureteur.cookies.onChanged.addListener(async (changeInfo) => {
    let adresseAntidoteWeb = global.infoDW.adresseDWeb.substring(8, global.infoDW.adresseDWeb.length - 1);
    if (changeInfo.cookie && changeInfo.cookie.domain && changeInfo.cookie.domain == adresseAntidoteWeb && changeInfo.cookie.name && changeInfo.cookie.name == "__Secure-jeton") {
        if (global.estAntidoteWeb()) {
            let activay = !changeInfo.removed;
            global.metsDonnees({
                estAWebConnectay: activay,
                infoDW: {
                    estActivay: activay,
                    estDisponible: activay
                }
            });
        }
        if (!changeInfo.removed)
            EnregistreSecureJeton(changeInfo.cookie);
    }
});

function verifieActivation() {
    var promesseAWeb = new Promise(async function(resolution) {
        let activay = false;
        if (!global.estAntidoteWeb() && !global.estAntidoteWebPourDWeb() && global._estAntidoteX("12")) {
            let ouvrier = new ObjetOuvrier()
            let ouvrierVivant = await ouvrier.recupere(0);
            if (ouvrierVivant) {
                let msg = {};
                msg.message = "correcteurSimpleValidationLicence";
                msg._identifiant_operation = uuidv4();
                attente = gestionnaireAttenteOperation.attendOperation(msg._identifiant_operation);
                ouvrier.envoieMessageAAgentConnectix(msg);
                if (attente !== undefined) await attente;
                resolution(activay);
            }
        } else if (!global.estAntidoteWeb() && !global.estAntidoteWebPourDWeb() && global._estAntidoteX("11")) {
            activay = true;
            resolution(activay);
        } else {
            if (estSafariWebex() && estVersionInferieure(global.versionSafari, "18.0")) {
                let unURLAntidoteWebSansHttps = global.infoDW.adresseDWeb.substring(8, global.infoDW.adresseDWeb.length);
                let adresseDW = "wss://" + unURLAntidoteWebSansHttps + "correcteur/simple";
                var promesseAWeb = new Promise(function(resolve) {
                    let w = new WebSocket(adresseDW);
                    w.onmessage = (mesg) => {};
                    w.onopen = () => {
                        resolve({
                            status: 200
                        });
                        w.close();
                    };
                    w.onclose = (evt) => {};
                    w.onerror = (evt) => {
                        resolve({
                            status: 401
                        });
                    };
                });
                let uneReponse = await promesseAWeb;
                activay = uneReponse.status == 200;
            } else {
                let adresseAntidoteWeb = global.infoDW.adresseDWeb.substring(8, global.infoDW.adresseDWeb.length - 1);
                let c = await fureteur.cookies.getAll({
                    "domain": "antidote.app"
                });
                for (let obj of c) {
                    if (obj['domain'] == adresseAntidoteWeb) {
                        if (obj['name'] == "__Secure-jeton") {
                            activay = true;
                            EnregistreSecureJeton(obj);
                        }
                    }
                }
                if (!activay && estSafariWebex()) {
                    activay = await verifieActivationAWeb();
                }
            }
            global.metsDonnees({
                estAWebConnectay: (!global.estAntidoteWeb() || activay),
            });
            if (global.estAntidoteWeb()) {
                global.metsDonnees({
                    infoDW: {
                        estDisponible: activay
                    }
                });
            }
            let ouvrier = new ObjetOuvrier();
            await ouvrier.recupere(global.idOngletActif);
            if (ouvrier.idOnglet != -1) {
                ouvrier.envoieMessageAuDocument({
                    message: "metsAjourEtatDWeb",
                    _dib29: activay
                });
            }
            resolution(activay);
        }
    });
    return promesseAWeb;
}
async function verifieActivationAWeb() {
    let activerDW = true;
    let headersGet = {
        'Content-Type': 'application/json'
    };
    let reponse = await fetch(global.infoDW.adresseDWeb + "infosUtilisateurSelonParams?typeDonnees=1", {
        method: 'GET',
        headers: headersGet
    });
    if (reponse.status == 200) {
        let infos = await reponse.json();
    } else {
        activerDW = false;
    }
    global.metsDonnees({
        infoDW: {
            estDisponible: activerDW,
            estVerifiayAWeb: true
        }
    });
    return activerDW;
}
async function demandeDonnees(leIdTab) {
    return new Promise(async (resolution) => {
        let desTabs = await fureteur.tabs.query({
            currentWindow: true,
            active: true
        });
        if (leIdTab === undefined) {
            for (let tab of desTabs) {
                if (global.idOngletActif != tab.id) {
                    global.metsDonnees({
                        idOngletActif: tab.id
                    });
                }
            }
            leIdTab = global.idOngletActif;
        }
        let ouvrier = null;
        let msgReponse = {
            data: global,
            configmenu: configMenuDefaut[gestionTraduction.maLangueString],
            estPageGoogleDoc: false,
            moduleGDocEstActivay: false,
            ouvrierEndormi: false,
            estPageAutorisee: false
        };
        if (leIdTab > 0) {
            ouvrier = new ObjetOuvrier();
            await ouvrier.recupere(leIdTab);
            if (ouvrier.idOnglet > 0) {
                let unUrl = ouvrier.url;
                let estPageGoogleDoc = urlEstGoogleDocs(unUrl);
                let estPageOK = !(cstRegexAntidoteWebApp.test(unUrl) || cstRegexServiceDruide.test(unUrl));
                cstRegexAntidoteWebApp.lastIndex = 0;
                cstRegexServiceDruide.lastIndex = 0;
                let estPageAutorisee = gestionnaireDW.estURLAutorisay(unUrl);
                if (ouvrier.estOffice365Online && global._estAntidoteX("12")) {
                    estPageAutorisee = false;
                }
                let estPageAntiOupsAntorisee = gestionnaireDW.estURLAntiOupsAutorisay(unUrl);
                let moduleGDocEstActivay = ouvrier.infoGDoc.estGoogleDoc;
                let msgErreur = gestionnaireErreur.messageErreur;
                msgReponse = {
                    data: global,
                    configmenu: configMenuDefaut[gestionTraduction.maLangueString],
                    estPageGoogleDoc: !global.beta_a12 && estPageGoogleDoc,
                    estOffice365Online: ouvrier.estOffice365Online && global._estAntidoteX("11"),
                    estSiteIncompatibleAvecDW: ouvrier.estIncompatibleAvecDW,
                    moduleGDocEstActivay: moduleGDocEstActivay,
                    messageErreur: msgErreur,
                    estPageOK: estPageOK,
                    estPageAutorisee: estPageAutorisee,
                    estPageAntiOupsAntorisee: estPageAntiOupsAntorisee,
                    aZoneIgnoree: ouvrier.infoDW.aZoneIgnoree,
                    champCE: ouvrier.infoDW.champ
                };
            } else {
                let onglet = await fureteur.tabs.query({
                    currentWindow: true,
                    active: true
                });
                msgReponse.ouvrierEndormi = false;
                let unUrl = onglet[0].url;
                if (unUrl !== undefined && unUrl.length > 0) {
                    let protocol = new URL(onglet[0].url).protocol;
                    let pageBlanche = ["about:", "moz-extension:", "chrome:", "chrome-extension:", "edge:", "extension:"].includes(protocol);
                    msgReponse.ouvrierEndormi = true && !pageBlanche;
                }
            }
        }
        resolution([msgReponse, ouvrier]);
    });
}

function gestionnaireOnglet(activeInfo, appelant) {};
async function gestionnaireOngletCreation(leTab) {
    if (estThunderbird()) {
        injecteScript(leTab);
    }
};
async function gestionnaireOngletMAJ(leTabId, changeInfo, leTab) {
    if (changeInfo.status !== undefined && changeInfo.status == "complete") {
        let ouvrier = new ObjetOuvrier();
        await ouvrier.recupere(leTabId);
        ouvrier.metsDonnees({
            infoDW: {
                champ: {
                    id: "",
                    actif: false
                }
            }
        });
        if (leTab.url == cstUrlBeta && billetix.estAppelayPar) {
            let desDonnees = await demandeDonnees(billetix.idOnglet);
            let desErreurs = await gestionnaireErreur.donneListeErreurs()
            desDonnees[0].log_erreur = desErreurs.log_erreur;
            desDonnees.push(gestionnaireLogDW.bd);
            ouvrier.envoieMessageAuDocument({
                message: "beta-comm",
                log: desDonnees
            });
            billetix.estAppelayPar = false;
            billetix.idOnglet = -1;
        } else {
            gestionnaireInjection.injecteDansOnglet(leTabId);
        }
    }
};
async function gestionnaireOngletActivation(lActiveInfo) {
    global.metsDonnees({
        idOngletActif: lActiveInfo.tabId
    });
    let unOnglet = await fureteur.tabs.get(lActiveInfo.tabId);
    let unUrl = unOnglet !== undefined ? unOnglet.url : ""
    let ouvrier = new ObjetOuvrier();
    let ouvrierExiste = await ouvrier.recupere(lActiveInfo.tabId);
    if (urlEstGoogleDriveApps(unUrl)) {} else {
        if (true && ouvrier.idOnglet == -1) {
            gestionnaireInjection.injecteDansOnglet(lActiveInfo.tabId);
        } else {
            ouvrier.envoieMessageAuDocument({});
            if (estThunderbird() && ouvrier.infoAWeb.idLiay != "") {
                let ouvrierDoc = new ObjetOuvrier();
                await ouvrierDoc.recupere(ouvrier.infoAWeb.idLiay);
                await ouvrierDoc.active();
            } else if (!estThunderbird()) {
                gestionnaireBouton.metsTexte("");
                gestionnaireErreur.afficheBadge();
            }
        }
    }
};
let gestionnaireInjection = {
    fichiers: {},
    async recupereListeFichiers() {
        if (estThunderbird()) return;
        let fj = donneUrlFichier("src/fichiers.json");
        const request = new Request(fj, {
            method: 'GET',
            headers: {
                'Content-Type': 'text/json'
            }
        });
        let uneReponseFetch = await fetch(request);
        let uneReponse = await uneReponseFetch.json();
        this.fichiers = uneReponse;
    },
    async injecteDansOnglet(leTabId) {
        if (estThunderbird()) return;
        let unOnglet = await fureteur.tabs.get(leTabId);
        let unUrl = unOnglet !== undefined ? unOnglet.url : ""
        if (unUrl != "") {
            let unObjURL = new URL(unUrl);
            if (unObjURL.hostname == new URL(global.adresseAWeb).hostname && unObjURL.pathname == "/texteur") {
                fureteur.scripting.executeScript({
                    target: {
                        tabId: leTabId,
                        allFrames: true,
                    },
                    files: ["src/cstAntidote.js", "src/dictionnaire.js", "src/gestion-t.js", "src/outils.js", "src/aw-services.js"],
                });
            } else if (unObjURL.hostname == new URL(global.adresseAWeb).hostname && unObjURL.pathname != "/texteur") {
                fureteur.scripting.executeScript({
                    target: {
                        tabId: leTabId,
                        allFrames: true,
                    },
                    files: ["src/cstAntidote.js", "src/dictionnaire.js", "src/gestion-t.js", "src/outils.js", "src/aw-comm.js"],
                });
            }
        }
        return;
        let monManifest = fureteur.runtime.getManifest();
        let estPageAWeb = cstRegexAntidoteWebApp.test(unUrl);
        let estPageServiceDruide = cstRegexServiceDruide.test(unUrl);
        let estPageChrome = cstChromeRegEx.test(unUrl);
        let estPageChromeExtension = cstChromeExtensionRegEx.test(unUrl);
        let estPageChromeStore = cstChromeStoreRegEx.test(unUrl);
        let estPageExtension = cstExtensionRegEx.test(unUrl);
        let estPageAbout = cstAboutRegEx.test(unUrl);
        let estPageMozillaExtension = cstMozillaExtensionRegEx.test(unUrl);
        let estPageEdge = cstEdgeRegEx.test(unUrl);
        let estPageEdgeStore = cstEdgeStoreRegEx.test(unUrl);
        cstRegexAntidoteWebApp.lastIndex = 0;
        cstRegexServiceDruide.lastIndex = 0;
        cstChromeRegEx.lastIndex = 0;
        cstChromeExtensionRegEx.lastIndex = 0;
        cstChromeStoreRegEx.lastIndex = 0;
        cstAboutRegEx.lastIndex = 0;
        cstMozillaExtensionRegEx.lastIndex = 0;
        cstExtensionRegEx.lastIndex = 0;
        cstEdgeRegEx.lastIndex = 0;
        cstEdgeStoreRegEx.lastIndex = 0;
        let uneListeFichier = [];
        if (!estPageAWeb && !estPageServiceDruide && !estPageChrome && !estPageChromeExtension && !estPageChromeStore && !estPageAbout && !estPageMozillaExtension && !estPageExtension && !estPageEdge && !estPageEdgeStore) {
            uneListeFichier = this.donne("fichiers_si-comm");
        } else if (estPageAWeb && !estPageServiceDruide) {
            uneListeFichier = monManifest.content_scripts[1].js;
        } else if (!estPageAWeb && estPageServiceDruide) {
            uneListeFichier = monManifest.content_scripts[2].js;
        }
        if (uneListeFichier.length > 0 && unUrl.length > 0) {
            if (!(global.infoConnecteur.manifest == 2 && (estGoogleChrome() || estSafariWebex()))) {
                fureteur.scripting.executeScript({
                    target: {
                        tabId: leTabId,
                        allFrames: true,
                    },
                    files: uneListeFichier,
                });
            } else {
                for (let fichier of uneListeFichier) {
                    fureteur.tabs.executeScript(leTabId, {
                        file: fichier,
                        allFrames: true,
                        runAt: "document_start"
                    });
                }
            }
        }
    },
    donne(leNomListe) {
        if (estVide(this.fichiers)) {
            this.recupereListeFichiers();
        }
        return !estVide(this.fichiers) && this.fichiers[leNomListe] !== undefined ? this.fichiers[leNomListe] : [];
    }
}
async function gestionnaireOngletFermeture(leTabId, leInfoRemove) {
    let ov = new ObjetOuvrier();
    await ov.recupere(leTabId);
    if (ov.infoAWeb.idLiay != "") {
        let ouvrier = new ObjetOuvrier();
        await ouvrier.recupere(ov.infoAWeb.idLiay);
        ouvrier.envoieMessageAuDocument({
            message: "_pb18d"
        });
        ouvrier.metsDonnees({
            infoAWeb: {
                idLiay: ""
            }
        });
    }
    ov.detruis(leTabId);
};
async function gestionnaireFenetre(leWindowId) {
    if (leWindowId == -1) {
        let ouvrier = new ObjetOuvrier();
        await ouvrier.recupere(global.idOngletActif);
        if (ouvrier.infoAWeb.idLiay != "") {
            ouvrier.envoieMessageAuDocument({
                message: "_pb31d",
                _dib105: cstTypeMessageRequete,
                idDocument: ouvrier.infoAWeb.idLiay
            })
        }
    } else {
        fureteur.tabs.query({
            currentWindow: true,
            active: true
        }).then(t => {
            global.metsDonnees({
                idOngletActif: t[0].id
            });
        });
    }
};
async function gestionnaireMessageWebSocket(msg, ouvrierId) {
    let ouvrier = new ObjetOuvrier()
    let ouvrierVivant = await ouvrier.recupere(ouvrierId);
    try {
        if (msg._dib79 !== undefined && estThunderbird()) {
            msg._dib79 = decodeChaineDeJson(msg._dib79);
            msg.idCommunicationDocument = decodeChaineDeJson(msg.idCommunicationDocument);
        }
        if (msg.message == "donneProgression") {
            var edit_msg = {
                message: msg.message,
                _dib29: 1,
                _dib105: cstTypeMessageReponse,
                _dib101: cstRoleConnecteur
            };
            if (gestionnairePort.convertisIdDocumentEnIdPort(msg._dib103)) {
                let leId = decodeChaineDeJson(msg._dib103).split(monIdTexteur)[1].substring(1);
                edit_msg._dib81 = monIdTexteur + "_" + leId;
            }
            ouvrier.envoieMessageAAgentConnectix(edit_msg);
            return;
        }
        if (msg._dib104 == cstIdAntidoteWeb && msg._dib106) {
            gestionnaireMessageTexteurNatif(msg, ouvrier);
            return;
        }
        if (msg.message == "_pb2d") {
            ouvrierVivant = ouvrierVivant && (ouvrier.nomOnglet == msg._dib79 || (msg.idCommunicationDocument && ouvrier.nomOnglet == gestionnairePort.convertisIdDocumentEnIdPort(msg.idCommunicationDocument)));
            if (!!msg.idCommunicationDocument && !estThunderbird()) {
                for (let id in gestionnaireBackgroundAntiOups.lesConnexions) {
                    if (encodeChainePourJson(monIdTexteur + "_" + id) == msg.idCommunicationDocument) {
                        msg.idAO = id;
                        break;
                    }
                }
            }
            if (ouvrierVivant) {
                ouvrier.envoieMessageAuDocument(msg);
            } else {
                ouvrier.envoieMessageAAgentConnectix({
                    message: "_pb2d",
                    _dib29: !ouvrierVivant,
                    _dib105: cstTypeMessageReponse
                });
            }
        } else if (msg.message == "LienTabs") {
            if (msg.idDocument != "") {
                var leUrl = ouvrier.infoAWeb.infoJeton.urlRedirect;
                gestionnaireAWebTexteurNatif.ajoute(ouvrier.idOnglet, msg.idDocument);
                await ouvrier.metsDonnees({
                    infoAWeb: {
                        estTexteurNatif: true,
                        idLiay: msg.idDocument,
                        infoJeton: {
                            jeton: ""
                        }
                    }
                });
                gestionnaireErreur.traiteErreur({
                    date: new Date().toString(),
                    message_log: "background.gestionnaireMessageWebSocket.LienTabs",
                    urlRedirect: leUrl
                });
                ouvrier.envoieMessageAAweb({
                    message: "redirigeSansHistorique",
                    url: leUrl
                });
            }
        } else if (msg.message == "_pb13d") {
            await ouvrier.active();
        } else if (msg.message == "_pb24d") {
            var unTitre = await ouvrier.donneTitre();
            ouvrier.envoieMessageAAgentConnectix({
                message: '_pb24d',
                _dib79: ouvrier.nomOnglet,
                _dib75: unTitre
            });
        } else if (msg.message == cstMessageReglageAgentConnectix) {
            let uneLangue = fureteur.i18n.getUILanguage();
            if (estSafariWebex()) {
                let uneListeLangues = await fureteur.i18n.getAcceptLanguages();
                uneLangue = uneListeLangues[0];
            }
            global.metsDonnees({
                idAntidote: msg._dib104,
                langue: uneLangue,
                antiOups: {
                    correctionAutomatique: msg.correctionAutomatique,
                    detectionPiecesManquantes: msg.detectionPiecesManquantes,
                    texteRepris: msg.texteRepris,
                    jeTraiteSignature: msg.jeTraiteSignature,
                    reseau: {
                        jeInhibeRaccourciAntiOupsShift: msg.jeInhibeRaccourciAntiOupsShift,
                        jeInhibeRaccourciAntiOupsCtrl: msg.jeInhibeRaccourciAntiOupsCtrl
                    }
                },
                versionIAT: {
                    versionMin: msg.versionIATMin,
                    versionMax: msg.versionIATMax
                },
                versionPontAA: {
                    versionMin: msg.versionPontAAMin !== undefined ? msg.versionPontAAMin : "1.0",
                    versionMax: msg.versionPontAAMax !== undefined ? msg.versionPontAAMax : "1.0"
                },
                versionPont: msg.versionPontAAMax !== undefined ? cstVersionPontAAMax : cstVersionPontRetrocompatible
            })
            if (!estThunderbird()) {
                ouvrier.envoieMessageAAgentConnectix({
                    message: cstMessageEnregistreFureteurAWeb,
                    _dib105: cstTypeMessageRequeteAgentConnectix,
                    _dib101: cstRoleConnecteur
                });
            }
        } else if (msg.message == cstMessageChangeTypeAppAntidote) {
            if (ouvrierId == 0) {
                ouvrierVivant = await ouvrier.recupere(global.idOngletActif);
            }
            if (msg._dib104 !== undefined) {
                global.metsDonnees({
                    idAntidote: msg._dib104,
                    infoDW: {
                        estVerifiayAWeb: false
                    }
                })
            }
            gestionnaireMenu.afficheMenu();
            if (global.estAntidoteWeb()) {
                gestionnaireBouton.metsTitre("Antidote Web");
            } else {
                gestionnaireBouton.metsTitre("Antidote");
                gestionnaireWebSocket.demandeReglages();
            }
            ouvrier.envoieMessageAuDocument(msg);
        } else if (msg.message == "donneImageTexteur") {
            var edit_msg = {
                message: msg.message,
                _dib29: "",
                _dib105: cstTypeMessageReponse,
                _dib101: cstRoleConnecteur
            };
            ouvrier.envoieMessageAAgentConnectix(edit_msg);
        } else if (msg.message == "EnregistreCourriel") {
            if (estThunderbird()) {
                gestionnaireAntiOupsThunderbird.enregistreCourriel(ouvrier.idOnglet);
                let desDetails = gestionnaireAntiOupsThunderbird.donneLeDetailPourAntiOups(ouvrier.idOnglet);
                msg[kAttributJsonSujet] = encodeChainePourJson(desDetails.sujet);
                msg[kAttributJsonCorps] = encodeChainePourJson(desDetails.corps);
                msg._dib30 = encodeChainePourJson(desDetails.sujet + cstSeparateurSujet + desDetails.corps);
                msg._dib105 = cstTypeMessageReponse;
                ouvrier.envoieMessageAAntidote(msg);
            } else {
                ouvrier.envoieMessageAuDocument({
                    message: "DonneTextePourEnregistreCourriel",
                    idFenetre: decodeChaineDeJson(msg._dib103).split(monIdTexteur)[1].substring(1)
                });
            }
        } else if (msg.message == "_pb27d") {
            if (estThunderbird()) {
                gestionnaireAntiOupsThunderbird.envoieCourriel(ouvrier.idOnglet);
            } else {
                let id = decodeChaineDeJson(msg._dib103).split(monIdTexteur)[1].substring(1);
                ouvrier.envoieMessageAuDocument({
                    message: "EnvoieRequeteIntervention",
                    id: id,
                    nepascorriger: true
                });
            }
        } else if (msg.message == "DonneSorteInterventionAntiOups" && msg._dib105 == cstTypeMessageReponse && estThunderbird()) {
            var reponseAntiOups = msg.reponseAntiOups;
            gestionnaireAntiOupsThunderbird.digereInterventionAntiOups(msg, ouvrier.idOnglet);
        } else if (msg.message == "donneContientPiecesJointes" && msg._dib105 == cstTypeMessageRequete) {
            if (estThunderbird()) {
                msg._dib29 = gestionnaireAntiOupsThunderbird.donneContientPiecesJointes(ouvrier.idOnglet);
            } else {}
            msg._dib105 = cstTypeMessageReponse;
            ouvrier.envoieMessageAAntidote(msg);
        } else if (msg.message == "_pb18d") {
            gestionnaireWebSocket.mesConnexions[ouvrierId].close(1000);
        } else if (msg.message == "correcteurSimpleValidationLicence") {
            global.metsDonnees({
                estAntidoteActif: (msg._dib29),
            });
            gestionnaireAttenteOperation.termineOperation(msg._identifiant_operation);
        } else {
            if ((msg.message == "_pb12d" || msg.message == "_pb36d") && !estThunderbird()) {
                for (let id in gestionnaireBackgroundAntiOups.lesConnexions) {
                    if (encodeChainePourJson(monIdTexteur + "_" + id) == msg._dib103) {
                        msg.idAO = id;
                        break;
                    }
                }
            }
            ouvrier.envoieMessageAuDocument(msg);
        }
    } catch (erreur) {
        gestionnaireErreur.traiteErreur({
            date: new Date().toString(),
            message_log: "background.gestionnaireMessageWebSocket.catch",
            erreur: erreur
        });
    }
}
async function gestionnaireMessageTexteurNatif(msg, ouvrier) {
    try {
        let ouvrierGlobal = new ObjetOuvrier();
        await ouvrierGlobal.recupere(0);
        await ouvrierGlobal.metsDonnees({
            infoAWeb: {
                infoOutils: msg
            }
        });
        if (msg.message == 'OutilAntidoteEstMort') {
            if (gestionnaireAWebTexteurNatif.estConnectay(msg.idDocument)) {
                let ouvrierTexteurNatif = new ObjetOuvrier();
                await ouvrierTexteurNatif.recupere(gestionnaireAWebTexteurNatif.donneOnglet(msg.idDocument));
                ouvrier = ouvrierTexteurNatif;
                await ouvrier.metsDonnees({
                    infoAWeb: {
                        infoOutils: {
                            _dib106: 1
                        }
                    }
                });
                lanceOutilAWeb(ouvrier);
            } else {
                ouvrier.envoieMessageAAgentConnectix({
                    message: 'OutilAntidoteEstMort',
                    _dib106: 1,
                    _dib105: cstTypeMessageReponse,
                    _dib104: cstIdAntidoteWeb,
                    _dib29: true
                });
            }
        } else if (msg.message == "OuvrePageAweb") {
            let unIdOnglet = await creeNouvellePage(msg.URLAvecParam);
            ouvrier.envoieMessageAAgentConnectix({
                message: 'OuvrePageAweb',
                _dib106: 1,
                _dib105: cstTypeMessageReponse,
                _dib29: (unIdOnglet !== undefined && unIdOnglet != -1)
            });
        } else {
            msg.type = "MessagePourAWeb";
            ouvrier.envoieMessageAAweb(msg);
        }
    } catch (erreur) {
        gestionnaireErreur.traiteErreur({
            date: new Date().toString(),
            message_log: "background.gestionnaireMessageTexteurNatif.catch",
            erreur: erreur
        });
    }
}
async function gestionnaireMessageDesScriptsTemp(msg) {
    msg.nomOnglet = msg.nomOnglet !== undefined ? msg.nomOnglet : "si-temp" + separateurElement + msg._id;
    let portReel = gestionnairePort.donnePortSelonNom(msg.nomOnglet);
    fureteur.scripting.executeScript({
        target: {
            tabId: portReel.sender.tab.id,
            allFrames: true,
        },
        files: ["src/antidoteOfficeAddin.js"]
    });
};
class GestionnaireMessagesScriptGenerique extends FileMessages {
    constructor(id) {
        super();
        this.id = id;
    }
    async execute(msg) {
        let unNomOnglet = msg.nomOnglet;
        let portReel = gestionnairePort.donnePortSelonNom(unNomOnglet);
        if (this.id !== unNomOnglet) {
            return;
        }
        if (portReel === undefined) {
            console.error("SCRIPTGEN-PORT-UNDEFINED", unNomOnglet);
            return;
        }
        if (portReel.sender === undefined) {
            console.error("SCRIPTGEN-PORT.SENDER-UNDEFINED", unNomOnglet);
            return;
        }
        if (portReel.sender.tab === undefined) {
            console.error("SCRIPTGEN-PORT.SENDER.TAB-UNDEFINED", unNomOnglet);
            return;
        }
        let ouvrier = new ObjetOuvrier();
        if (msg.message == "reveil") {
            return;
        }
        if (msg.message == "enregistreErreur") {
            gestionnaireErreur.traiteErreur(msg.data);
            return;
        }
        if (msg.message == "enregistreLogs") {
            msg.donnees_brutes = JSON.parse(msg.donnees_brutes);
            if (msg.donnees_traitees !== undefined) msg.donnees_traitees = JSON.parse(msg.donnees_traitees);
            gestionnaireLogDW.sauvegardeLog(msg);
            return;
        }
        if (msg.message == "enregistreListeLogs") {
            msg.liste_logs = JSON.parse(msg.liste_logs);
            gestionnaireLogDW.sauvegardeLog(msg);
            return;
        }
        if (msg.message == "dw-comm") {
            gestionnaireDW.traiteMessage(msg);
            return;
        }
        if (msg.message == "clicorrsi-comm") {
            if (gestionnaireDW.mesConnexions[msg.id] !== undefined && gestionnaireDW.mesConnexions[msg.id].clicorrsi) {
                gestionnaireDW.mesConnexions[msg.id].clicorrsi.traiteMessageCliCorrSi(msg);
            } else {
                await ouvrier.recupere(portReel.sender.tab.id);
                ouvrier.envoieMessageAuDocument({
                    message: "dw-message",
                    id: msg.id,
                    reponse: "messageRecu",
                    data: JSON.stringify({
                        message: "reinit"
                    })
                });
            }
            return;
        }
        if (msg.message == "CorrigeAvecContexte") {
            gestionnaireAttenteOperation.termineOperation(msg._identifiant_operation);
        }
        let ouvrierExiste = await ouvrier.recupere(portReel.sender.tab.id);
        let execution = new Promise(async (completay) => {
            if (msg.message == "_dib94" && (!ouvrierExiste || msg._dib29)) {
                await ouvrier.metsDonnees({
                    idOnglet: portReel.sender.tab.id,
                    url: portReel.sender.tab.url,
                    nom: msg._id,
                    nomOnglet: unNomOnglet,
                    estOffice365Online: msg.estOffice365Online,
                    estIncompatibleAvecDW: msg.estSiteIncompatibleAvecDW
                });
                ouvrier.envoieMessageAuDocument({
                    message: "init"
                });
                gestionnaireMenu.afficheMenu();
                if (estThunderbird()) {
                    if (global.estAntidoteWeb()) {
                        global.metsDonnees({
                            antiOups: await CommunicationAntiOupsAweb.donneReglagesAntiOupsAWeb(global.adresseAWeb, global.antiOups)
                        });
                    }
                    gestionnaireAntiOupsThunderbird.init(global);
                }
                completay(true);
            } else if (msg.message == "_dib94") {} else if (msg.message == "demandeReglagesAC") {
                ouvrier.envoieMessageAuDocument({
                    message: "donneReglagesAC"
                });
                completay(true);
            } else if (msg.message == "confirmeLanceOutilAWeb" || msg.message == "confirmeDialogue") {
                if (msg.message == "confirmeLanceOutilAWeb") {
                    let unIdAntidote = msg._dib29 ? cstIdAntidoteWeb : cstIdAntidoteBureau;
                    if (global.confirmeModeSolo) {
                        unIdAntidote = cstIdAntidoteWebSolo;
                        global.metsDonnees({
                            estModeSolo: true,
                            confirmeModeSolo: false
                        });
                    }
                    global.metsDonnees({
                        idAntidote: unIdAntidote
                    });
                }
                ouvrier.metsDonnees({
                    reponseDialogue: 1
                });
                gestionnaireAttenteOperation.termineOperation(msg.identifiant_requete_dialogue);
            } else if (msg.message == "_dib01") {
                global.metsDonnees({
                    idOngletActif: portReel.sender.tab.id
                });
                gestionnaireMenu.afficheMenu();
                ouvrier.envoieMessageAuDocument({
                    message: "metsAjourEtatDWeb",
                    _dib29: global.infoDW.estActivay
                });
                if (estThunderbird() && global.estAntidoteWeb()) {
                    let ouvrierAWeb = new ObjetOuvrier();
                    await ouvrierAWeb.recupere(ouvrier.infoAWeb.idLiay);
                    await ouvrierAWeb.active(false);
                }
            } else if (msg.message == "ouvrePageAvecURL") {
                let idOngletAWeb = await creeNouvellePage(msg.url);
            } else if (msg.message == "ConnexionAWebDetecteurWeb") {
                if (!global.estAntidoteWeb() && global.estAntidoteWebPourDWeb() && !global.estCEActive()) {
                    var newURL = donneCheminUriAntidoteWebSelonOutils("D0");
                    let idOngletAweb = await creeNouvellePage(newURL);
                } else {
                    ouvrier.metsDonnees({
                        infoDW: {
                            idAppelant: msg.idAppelant
                        }
                    });
                    lanceOutil(msg.outil, undefined, "DW");
                }
            } else if (msg.message == "DonneTextePourOutilsAWeb") {
                var unIndexLangue = gestionTraduction.DonneIndexLangue();
                await ouvrier.metsDonnees({
                    infoAWeb: {
                        infoOutils: {
                            message: "OutilAntidoteEstMort",
                            _dib106: 0,
                            _dib30: donneMotPourOutilsAWeb(msg),
                            langue: gestionTraduction.ConvertisIndexLangueALangueIso(unIndexLangue),
                            ouvrageAntidote: donneNomOutil(msg.outil, unIndexLangue),
                            outil: msg.outil
                        }
                    }
                });
                initialisationPourlanceOutilAWeb(ouvrier);
            } else if (msg._dib108 == cstSourceScriptAWeb) {
                if (msg.message == "_pb12d") {
                    if (msg._dib75 === undefined)
                        msg._dib75 = await ouvrier.donneTitre();
                    msg.url = portReel.sender.tab.url;
                    msg._dib78 = false;
                    if (msg.idDocument !== undefined && msg.idDocument.toString().indexOf("gmailAntidote") == 0) {
                        if (msg._dib82 === undefined) {
                            msg._dib81 = encodeChainePourJson(monIdTexteur + "_" + msg.idDocument);
                            msg._dib82 = encodeChainePourJson(monIdTexteur + "_" + msg.idDocument);
                            msg.idCommunicationDocument = encodeChainePourJson(monIdTexteur + "_" + msg.idDocument);
                        }
                    }
                } else if (msg.message == "_pb36d" && estThunderbird()) {
                    let d = await fureteur.compose.getComposeDetails(ouvrier.idOnglet);
                    msg._dib100[0]._dib30 = encodeChainePourJson(d.subject);
                } else if (msg.message == "DonneSorteInterventionAntiOups") {
                    let msgReponse = msg;
                    let reponseAntiOups;
                    if (global.beta_a12) {
                        gestionnaireBackgroundAntiOups.init(msg._dib82, msg.nomOnglet);
                        reponseAntiOups = await gestionnaireBackgroundAntiOups.analyseEnvoi(CommunicationAntiOups.donneObjetCourriel(msg.idCommunicationDocument, msg.corps, msg.nbPJ, msg.destinataires), msg.nepascorriger, true);
                    } else {
                        reponseAntiOups = {
                            reponseAntiOups: {
                                codeErreur: "aucune",
                                detections: []
                            }
                        };
                    }
                    msgReponse._dib105 = cstTypeMessageReponse;
                    msgReponse = Object.assign(reponseAntiOups, msgReponse);
                    ouvrier.envoieMessageAuDocument(msgReponse);
                    completay(true);
                    return;
                } else if (msg.message == "CorrigeAvecContexte" && estThunderbird()) {
                    msg = await gestionnaireAntiOupsThunderbird.corrigeSujet(msg, ouvrier.idOnglet);
                }
                ouvrier.envoieMessageAAweb(msg);
                ouvrier.metsDonnees({
                    infoDW: {
                        idAppelant: ""
                    }
                });
            } else if (msg.message == "_pb12d") {
                if (msg._dib79 == "") msg._dib79 = ouvrier.nomOnglet;
                if (msg._dib79 !== ouvrier.nomOnglet) {
                    gestionnairePort.associeIdDocumentAIdPort(msg._dib79, ouvrier.nomOnglet);
                }
                if (msg._dib75 === undefined)
                    msg._dib75 = await ouvrier.donneTitre();
                msg.url = portReel.sender.tab.url;
                ouvrier.envoieMessageAAntidote(msg);
                ouvrier.metsDonnees({
                    infoDW: {
                        idAppelant: ""
                    }
                });
            } else if (msg.message == "lanceOutilDetecteurWeb") {
                if (global.estAntidoteWebPourDWeb()) {
                    let url = "";
                    let unOutils = "";
                    if (msg._dib54 == "guides") {
                        url = global.adresseAWeb + "guides/" + msg.data.langue + "/" + msg.data.idArticle;
                        var separateurUri = "?";
                        var separateurParam = "&";
                        url += separateurUri;
                        url += cstVersionIATMaxUriAntidoteWeb;
                        url += cstVersionIATMax;
                        url += separateurParam;
                        url += cstVersionIATMinUriAntidoteWeb;
                        url += cstVersionIATMin;
                        unOutils = "G0";
                    } else {
                        url = donneCheminUriAntidoteWebSelonOutils("D", {
                            _dib30: msg.data.mot,
                            _dib54: msg._dib54
                        });
                        unOutils = "D0";
                    }
                    if (ouvrier.infoAWeb.idLiay == "") {
                        let idOngletAWeb = await creeNouvellePage(url);
                        await ouvrier.metsDonnees({
                            infoAWeb: {
                                idLiay: idOngletAWeb,
                                idAppelant: msg.idAppelant
                            },
                            infoDW: {
                                idAppelant: msg.idAppelant
                            }
                        });
                        global.metsDonnees({
                            idALier: ouvrier.idOnglet
                        });
                    } else {
                        let ouvrierAWeb = new ObjetOuvrier();
                        await ouvrierAWeb.recupere(ouvrier.infoAWeb.idLiay);
                        await ouvrierAWeb.active();
                        if (unOutils == "D0")
                            ouvrier.envoieMessageAAweb({
                                message: 'MajOutilAntidote',
                                outil: unOutils,
                                ouvrageAntidote: msg._dib54,
                                langue: msg.data.langue.toLowerCase(),
                                _dib30: msg.data.mot
                            });
                        else
                            ouvrier.envoieMessageAAweb({
                                message: 'MajOutilAntidote',
                                outil: unOutils,
                                idArticle: msg.data.idArticle,
                                langue: msg.data.langue.toLowerCase()
                            });
                    }
                }
            } else if (msg.message == "confirmeAiguillageAWeb") {
                global.metsDonnees({
                    idAntidote: cstIdAntidoteWeb
                });
            } else if (msg.message == "lanceOutilAntidote") {
                lanceOutil(msg.outil);
            } else if (msg.message == "lanceOutilAntidoteParRaccClavier") {} else if (msg.message == "_dib65") {
                gGoogleAppsScriptAcceptay = msg._dib62;
                if (msg.lanceOutil) {
                    if (global.estAntidoteWeb()) {
                        if (monOutil == chaineCommandeC0) {
                            let idOngletAWeb = await creeNouvellePage(monUrlPageAW);
                            await ouvrier.metsDonnees({
                                infoAWeb: {
                                    idLiay: idOngletAWeb
                                }
                            });
                            global.metsDonnees({
                                idALier: idOngletAWeb
                            });
                        } else {
                            ouvrier.envoieMessageAAweb({
                                message: "DonneTextePourOutilsAWeb"
                            });
                        }
                    } else {
                        var edit_msg = {
                            message: "LanceOutil",
                            _dib104: cstIdAntidoteBureau,
                            nomExpediteur: monIdConnecteur,
                            outil: monOutil,
                            _dib79: ouvrier.nomOnglet,
                            versionIATMin: global.versionIAT.borneInfPriseEnCharge,
                            versionIATMax: global.versionIAT.borneSupPriseEnCharge
                        };
                        ouvrier.envoieMessageAAntidote(edit_msg);
                    }
                }
            } else if (msg.message == "_dib26") {
                let lanceAWeb = global.estAntidoteWeb();
                if (msg.appelayPar == "DW") {
                    lanceAWeb = global.estAntidoteWebPourDWeb();
                }
                if (!lanceAWeb && msg._dib29) {
                    let unNomExpediteur = msg.nomExpediteur === undefined ? monIdConnecteur : msg.nomExpediteur;
                    let edit_msg = {
                        message: "LanceOutil",
                        _dib104: cstIdAntidoteBureau,
                        nomExpediteur: unNomExpediteur,
                        outil: msg.outil,
                        _dib79: ouvrier.nomOnglet,
                        versionIATMin: global.versionIAT.borneInfPriseEnCharge,
                        versionIATMax: global.versionIAT.borneSupPriseEnCharge
                    };
                    if (msg.outil == "C1" && msg._dib82 === undefined && !estThunderbird()) {
                        edit_msg._dib81 = encodeChainePourJson(monIdTexteur + "_" + msg.idFenetreAntiOups);
                        edit_msg._dib82 = encodeChainePourJson(monIdTexteur + "_" + msg.idFenetreAntiOups);
                        msg.idCommunicationDocument = encodeChainePourJson(monIdTexteur + "_" + msg.idFenetreAntiOups);
                    }
                    if (msg.idCommunicationDocument !== undefined)
                        edit_msg.idCommunicationDocument = msg.idCommunicationDocument;
                    if (msg._dib82 !== undefined) {
                        edit_msg._dib82 = msg._dib82;
                    } else {
                        let unPortTemp = gestionnairePort.donnePortSelonId(portReel.sender.tab.id, true);
                        edit_msg["_dib79"] = unPortTemp.name;
                    }
                    ouvrier.envoieMessageAAntidote(edit_msg);
                } else if (lanceAWeb && msg._dib29) {
                    var newURL = donneCheminUriAntidoteWebSelonOutils(msg.outil);
                    if (msg.outil == chaineCommandeC0 || msg.outil == chaineCommandeC1) {
                        if (ouvrier.infoAWeb.idLiay == "" || (msg.idCommunicationDocument !== undefined ? !gestionnairePort.possedeAssociationAvecIdDocument(msg.idCommunicationDocument) : false)) {
                            let idOngletAWeb = await creeNouvellePage(newURL);
                            await ouvrier.metsDonnees({
                                infoAWeb: {
                                    idLiay: idOngletAWeb
                                }
                            });
                            let idDocument = msg.idCommunicationDocument !== undefined ? msg.idCommunicationDocument : ouvrier.idOnglet;
                            global.metsDonnees({
                                idALier: idDocument
                            });
                            gestionnairePort.associeIdDocumentAIdPort(idDocument, ouvrier.idOnglet);
                        } else {
                            let ouvrierAWeb = new ObjetOuvrier();
                            if (gestionnairePort.possedeAssociationAvecIdDocument(msg.idCommunicationDocument))
                                await ouvrierAWeb.recupereAwebAvecIdDocument(msg.idCommunicationDocument);
                            else
                                await ouvrierAWeb.recupere(ouvrier.infoAWeb.idLiay);
                            await ouvrierAWeb.active();
                            ouvrier.envoieMessageAAweb({
                                message: 'MajOutilAntidote',
                                outil: msg.outil
                            });
                        }
                    } else {
                        ouvrier.envoieMessageAuDocument({
                            message: "DonneTextePourOutilsAWeb",
                            outil: msg.outil
                        });
                    }
                } else {
                    var uneExplication = gestionTraduction.UniFmt(cstMsg_Cross_Origin_Securuty_Fmt, gestionTraduction.Tr_(cstExplicationAlerteCrossOrigin, ""), "", gestionTraduction.Tr_(cstCodeErreur, ""), cstCodeCrossOrigin);
                    ouvrier.envoieMessageAuDocument({
                        message: "_dib41",
                        _dib37: gestionTraduction.Tr_(cstMessageAlerteCrossOrigin, ""),
                        explication: uneExplication,
                        code: "erreur_cross_origin",
                        plateforme: global.plateforme
                    });
                }
            } else if (msg.message == "sauvegardePositionBoutonBulle") {} else if (msg.message == "fermeture") {
                gestionnaireWebSocket.envoieMessageRompsLien(ouvrier.idOnglet);
                if (estSafariWebex() && global.infoConnecteur.manifest == 2) {
                    gestionnairePort.detruisPort(portReel);
                }
            } else if (msg.message == "CorrigeAvecContexte" && estThunderbird()) {
                msg = await gestionnaireAntiOupsThunderbird.corrigeSujet(msg, ouvrier.idOnglet);
                ouvrier.envoieMessageAAntidote(msg);
            } else if (msg.message == "_pb15d" && estThunderbird() && msg._dib99 == "0") {
                msg._dib29 = true;
                ouvrier.envoieMessageAAntidote(msg);
            } else if (msg.message == "pause_antioups" && estThunderbird()) {
                if (msg._dib29) {
                    gestionnaireAntiOupsThunderbird.estAutorisay = false;
                } else {
                    gestionnaireAntiOupsThunderbird.estAutorisay = true;
                }
            } else if (msg.message == "_pb36d" && estThunderbird()) {
                let d = await fureteur.compose.getComposeDetails(ouvrier.idOnglet);
                msg._dib100[0]._dib30 = encodeChainePourJson(d.subject);
                ouvrier.envoieMessageAAntidote(msg);
            } else if (msg.message == "initialiseAntiOups") {
                if (global.estAntidoteWeb()) {
                    global.metsDonnees({
                        antiOups: await CommunicationAntiOupsAweb.donneReglagesAntiOupsAWeb(global.adresseAWeb, global.antiOups)
                    });
                    ouvrier.envoieMessageAuDocument({
                        message: "initialiseAntiOups",
                        donnees_globales: global
                    });
                }
                gestionnaireBackgroundAntiOups.init(msg.idFenetre, ouvrier.idOnglet);
            } else if (msg.message == "analyseEnvoiAntioups") {
                gestionnaireBackgroundAntiOups.analyseEnvoi(msg.objCourriel, msg.nepascorriger);
            } else if (msg.message == "DonneTextePourEnregistreCourriel") {
                if (global.estAntidoteWeb()) {
                    gestionnaireBackgroundAntiOups.enregistreCourriel(msg.idFenetre, msg._dib30);
                } else {
                    let reponse = gestionnaireBackgroundAntiOups.enregistreCourriel(msg.idFenetre, msg._dib30);
                    ouvrier.envoieMessageAAgentConnectix(reponse);
                }
            } else if (msg.message == "DesenregistreCourriel") {
                if (global.estAntidoteWeb()) {
                    gestionnaireBackgroundAntiOups.desinitialiseCourriel(msg.id);
                } else {
                    gestionnaireBackgroundAntiOups.desinitialiseCourriel(msg.id);
                    ouvrier.envoieMessageAAgentConnectix({
                        message: "Deinitialise",
                        _dib105: cstTypeMessageRequeteAntiOups,
                        _dib81: msg.id
                    });
                }
            } else if (msg.message == "LanceOutilAntiOups") {
                gestionnaireBackgroundAntiOups.lanceOutilAntiOups(msg.id);
            } else if (msg.message == "OuvreAide") {
                OuvreAide();
            } else if (msg.message == "MettreEnLocalStorage") {
                let leObj = {};
                for (let [cle, _dib29] of Object.entries(msg.lesDonnees)) {
                    leObj[cle] = _dib29;
                }
                fureteur.storage.local.set(leObj);
            } else if (msg.message == "exclusSite") {
                await ouvrier.recupere(global.idOngletActif);
                let unURL = await ouvrier.donneUrl();
                let url = new URL(unURL);
                let domaine = url.hostname;
                let uneListe = global.infoDW.listeExclusion;
                uneListe.push(domaine);
                global.metsDonnees({
                    infoDW: {
                        listeExclusion: uneListe
                    }
                });
                ouvrier.envoieMessageAuDocument({
                    message: "supprimeDW",
                    id: ouvrier.infoDW.champ.id
                });
            } else if (msg.message == "reponseDialogueAO12") {
                gestionnaireBackgroundAntiOups.instancesA12[msg._dib82].reponseDialogue = msg.reponse;
                gestionnaireAttenteOperation.termineOperation(msg.identifiant_requete_dialogue);
            } else if (msg.message == "fermeWebSocketAO") {
                if (gestionnaireBackgroundAntiOups.lesConnexions[msg.id]) {
                    gestionnaireBackgroundAntiOups.lesConnexions[msg.id].close();
                    delete gestionnaireBackgroundAntiOups.lesConnexions[msg.id];
                }
            } else {
                ouvrier.envoieMessageAAntidote(msg);
            }
            completay(true);
        });
        await execution;
    }
}
class GestionnaireMessageDesScriptsOffice extends GestionnaireMessagesScriptGenerique {
    constructor(id) {
        super();
        this.id = id;
    }
    async execute(msg) {
        msg.nomOnglet = msg.nomOnglet !== undefined ? msg.nomOnglet : "si-office" + separateurElement + msg._id;
        super.execute(msg);
    }
}
class GestionnaireMessageDesScripts extends GestionnaireMessagesScriptGenerique {
    constructor(id) {
        super();
        this.id = id;
    }
    async execute(msg) {
        msg.nomOnglet = msg.nomOnglet !== undefined ? msg.nomOnglet : "si-comm" + separateurElement + msg._id;
        super.execute(msg);
    }
}
class GestionnaireMessageDesScriptsGoogleDoc extends GestionnaireMessageDesScripts {
    constructor(lePort) {
        super();
        this.port = lePort;
        this.id = lePort.name;
    }
    async execute(msg) {
        let ouvrier = new ObjetOuvrier();
        await ouvrier.recupere(this.port.sender.tab.id);
        if (msg.message == "LanceOutil") {
            lanceOutil(msg.outil);
        } else {
            if (global.googleDoc.monoZone) {
                if (msg.versionPontGDoc !== undefined && msg.versionPontGDoc == "2.0") {
                    if (msg.message == "_pb36d") {
                        let desZones = msg.toutesLesZones !== undefined ? msg.toutesLesZones : msg._dib100;
                        faireUneGrosseZone(desZones, ouvrier);
                        msg._dib100 = ouvrier.infoGDoc.zones;
                    }
                }
            }
            if (msg.aRetourner) {
                msg.nomOnglet = ouvrier.nomOnglet;
                super.execute(msg);
            }
        }
    }
}
let gestionnaireAttenteOperation = {
    mesAbortControllers: new Map(),
    attendOperation(id) {
        return new Promise(async (complete) => {
            this.mesAbortControllers[id] = new AbortController();
            this.mesAbortControllers[id].signal.addEventListener("abort", () => {
                complete();
            })
        });
    },
    termineOperation(id) {
        if (this.mesAbortControllers[id] !== undefined) {
            this.mesAbortControllers[id].abort();
            this.mesAbortControllers.delete(id);
        }
    }
}
class GestionnaireMessageDAWeb extends FileMessages {
    constructor(id) {
        super();
        this.id = id;
    }
    async execute(msg) {
        let unNomOnglet = msg.nomOnglet !== undefined ? msg.nomOnglet : "aw-comm" + separateurElement + msg._id;
        let portReel = gestionnairePort.donnePortSelonNom(unNomOnglet);
        if (this.id !== unNomOnglet) {
            return;
        }
        if (portReel === undefined) {
            console.error("AWEB-PORT-UNDEFINED", unNomOnglet);
            return;
        }
        if (portReel.sender === undefined) {
            console.error("AWEB-PORT.SENDER-UNDEFINED", unNomOnglet);
            return;
        }
        if (portReel.sender.tab === undefined) {
            console.error("AWEB-PORT.SENDER.TAB-UNDEFINED", unNomOnglet);
            return;
        }
        let ouvrier = new ObjetOuvrier();
        let ouvrierExiste = await ouvrier.recupere(portReel.sender.tab.id);
        if (msg.message == "reveil") {
            return;
        }
        if (msg.message == "confirme") {
            global.metsDonnees({
                ouvrePageConnexion: msg.ouvrePageConnexion
            });
            if (msg.ouvrePageConnexion == 0) {
                global.metsDonnees({
                    estUneRedirection: true
                });
            }
            return;
        }
        let execution = new Promise(async (completay) => {
            if (msg.message == "_dib01") {
                global.metsDonnees({
                    idOngletActif: portReel.sender.tab.id,
                    ouvreNouvellePage: 0
                });
                gestionnaireMenu.cacheMenu();
                completay(true);
            }
            if (msg.message == "_dib94") {
                gestionnaireMenu.cacheMenu();
                global.metsDonnees({
                    idOngletActif: portReel.sender.tab.id
                });
                let unIdLiay = global.idALier;
                if (ouvrierExiste && ouvrier.infoAWeb.idLiay != "") {
                    unIdLiay = ouvrier.infoAWeb.idLiay;
                }
                let estTexteurNatif = false;
                if (ouvrierExiste) {
                    estTexteurNatif = ouvrier.infoAWeb.estTexteurNatif;
                }
                let infoAWeb = {
                    estPageAWeb: true,
                    estTexteurNatif: estTexteurNatif
                };
                if (unIdLiay != "") {
                    infoAWeb.idLiay = unIdLiay;
                }
                await ouvrier.metsDonnees({
                    idOnglet: portReel.sender.tab.id,
                    url: portReel.sender.tab.url,
                    nom: msg._id,
                    nomOnglet: unNomOnglet,
                    infoAWeb: infoAWeb
                });
                global.metsDonnees({
                    idALier: ""
                });
                ouvrier.envoieMessageAAweb({
                    message: "initialiseCommunication",
                    ouvrePageConnexion: global.ouvrePageConnexion
                });
                completay(true);
            }
            msg.idDocument = "";
            msg.idDocument = ouvrier.infoAWeb.idLiay;
            if (ouvrier.infoAWeb.estTexteurNatif && !gestionnaireWebSocket._estValide(ouvrier.idOnglet)) {
                if (msg.message == "_pb2d") {
                    msg._dib105 = cstTypeMessageReponse;
                    msg._dib29 = true;
                    ouvrier.envoieMessageAAweb(msg);
                    completay(true);
                } else if (msg.message == "_pb36d") {
                    completay(true);
                }
            }
            if (msg._dib106 == 1 || ouvrier.infoAWeb.estTexteurNatif || msg.estLandingPage) {
                if (msg.message == "perteFocus") {
                    ouvrier.envoieMessageAAgentConnectix({
                        message: "_pb31d",
                        _dib105: cstTypeMessageRequete,
                        idDocument: msg.idDocument
                    });
                    completay(true);
                }
                var unIDPage = ouvrier.idOnglet;
                msg.idPageCoCorrecteurAW = encodeChainePourJson(unIDPage);
                ouvrier.envoieMessageAAgentConnectix(msg);
            } else {
                if (msg.message == "_pb12d") {
                    if (global.estUneRedirection) {
                        global.metsDonnees({
                            infoDW: {
                                estVerifiayAWeb: false
                            }
                        });
                        await verifieActivation();
                        await fureteur.tabs.update(ouvrier.idOnglet, {
                            url: donneUrlFichier("panneau/aw.html") + "?connexion=ok"
                        })
                        global.metsDonnees({
                            estUneRedirection: false
                        });
                    } else {
                        global.metsDonnees({
                            versionIAT: {
                                versionMin: msg.versionIATMin,
                                versionMax: msg.versionIATMax
                            }
                        });
                        msg.idDocument = ouvrier.infoAWeb.idLiay;
                        msg.pontCommunication = ouvrier.idOnglet;
                        let ouvrierLiay = new ObjetOuvrier();
                        await ouvrierLiay.recupere(ouvrier.infoAWeb.idLiay);
                        msg.idAppelant = ouvrierLiay.infoDW.idAppelant;;
                    }
                } else if (msg.message == "_pb17d") {
                    activeOnglet(ouvrier.infoAWeb.idLiay);
                } else if (msg.message == "_pb2d") {
                    let ouvrierLiay = new ObjetOuvrier();
                    await ouvrierLiay.recupere(ouvrier.infoAWeb.idLiay);
                    if (ouvrierLiay && ouvrierLiay.idOnglet != -1) {
                        ouvrier.envoieMessageAuDocument(msg);
                        completay(true);
                    } else {
                        msg._dib105 = cstTypeMessageReponse;
                        msg._dib107 = cstSourceScriptPage;
                        msg._dib108 = cstSourceScriptAWeb;
                        msg._dib29 = true;
                        ouvrier.envoieMessageAAweb(msg);
                        completay(true);
                    }
                } else if (msg.message == "_pb19d") {
                    let ouvrierDocument = new ObjetOuvrier();
                    await ouvrierDocument.recupere(ouvrier.infoAWeb.idLiay);
                    ouvrierDocument.metsDonnees({
                        infoAWeb: {
                            idLiay: ""
                        }
                    });
                    completay(true);
                } else if (msg.message == "_pb27d") {
                    let ouvrierDocument = new ObjetOuvrier();
                    await ouvrierDocument.recupere(ouvrier.infoAWeb.idLiay);
                    if (estThunderbird()) {
                        gestionnaireAntiOupsThunderbird.envoieCourriel(ouvrierDocument.idOnglet);
                    } else {
                        let id = "";
                        if (msg.idDocument !== undefined) id = msg.idDocument
                        ouvrierDocument.active();
                        fureteur.tabs.remove(ouvrier.idOnglet);
                        ouvrierDocument.envoieMessageAuDocument({
                            message: "EnvoieRequeteIntervention",
                            id: id,
                            nepascorriger: true
                        });
                    }
                } else if (msg.message == "donneContientPiecesJointes" && msg._dib105 == cstTypeMessageRequete) {
                    let ouvrierDocument = new ObjetOuvrier();
                    await ouvrierDocument.recupere(ouvrier.infoAWeb.idLiay);
                    if (estThunderbird()) {
                        msg._dib29 = gestionnaireAntiOupsThunderbird.donneContientPiecesJointes(ouvrierDocument.idOnglet);
                    } else {}
                    msg._dib105 = cstTypeMessageReponse;
                    ouvrier.envoieMessageAAweb(msg);
                }
                if (msg.idDocument !== undefined) {
                    let attente;
                    if (msg.message == "CorrigeAvecContexte") {
                        msg._identifiant_operation = uuidv4();
                        attente = gestionnaireAttenteOperation.attendOperation(msg._identifiant_operation);
                    }
                    ouvrier.envoieMessageAuDocument(msg);
                    ouvrier.metsDonnees({
                        infoDW: {
                            idAppelant: ""
                        }
                    });
                    if (attente !== undefined) await attente;
                }
            }
            completay(true);
        });
        await execution;
    }
}
class GestionnaireMessageDesServices extends FileMessages {
    constructor(id) {
        super();
        this.id = id;
    }
    async execute(msg) {
        let unNomOnglet = msg.nomOnglet !== undefined ? msg.nomOnglet : "aw-services" + separateurElement + msg._id;
        let portReel = gestionnairePort.donnePortSelonNom(unNomOnglet);
        if (this.id !== unNomOnglet) {
            return;
        }
        if (portReel === undefined) {
            console.error("SERVICES-PORT-UNDEFINED", unNomOnglet);
            return;
        }
        if (portReel.sender === undefined) {
            console.error("SERVICES-PORT.SENDER-UNDEFINED", unNomOnglet);
            return;
        }
        if (portReel.sender.tab === undefined) {
            console.error("SERVICES-PORT.SENDER.TAB-UNDEFINED", unNomOnglet);
            return;
        }
        if (msg.message == "enregistreErreur") {
            gestionnaireErreur.traiteErreur(msg.data);
            return;
        }
        let execution = new Promise(async (completay) => {
            if (msg.message == "_dib01") {
                global.metsDonnees({
                    idOngletActif: portReel.sender.tab.id
                });
                gestionnaireMenu.cacheMenu();
                completay(true);
            }
            if (msg.estLandingPage && msg.message == "LienTabs") {
                if (global.estModeiOS) {
                    completay(true);
                }
                gestionnaireErreur.traiteErreur({
                    date: new Date().toString(),
                    message_log: "gestionnaireMessageDesServices.LienTabs"
                });
                global.metsDonnees({
                    idAntidote: msg._dib104
                });
                gestionnaireMenu.cacheMenu();
                let ouvrier = new ObjetOuvrier();
                global.metsDonnees({
                    idOngletActif: portReel.sender.tab.id
                });
                await ouvrier.metsDonnees({
                    idOnglet: portReel.sender.tab.id,
                    url: portReel.sender.tab.url,
                    nom: msg._id,
                    nomOnglet: unNomOnglet,
                    infoAWeb: {
                        estPageAWeb: true,
                        estTexteurNatif: true
                    }
                });
                let ouvrierGlobal = new ObjetOuvrier();
                await ouvrierGlobal.recupere(0);
                if (ouvrierGlobal.idOnglet == -1 && gestionnaireAWebTexteurNatif.peuxRecharger(msg.jetonDoc)) {
                    gestionnaireErreur.traiteErreur({
                        date: new Date().toString(),
                        message_log: "gestionnaireMessageDesServices.LienTabs",
                        execution: "ajouteRecharge"
                    });
                    gestionnaireAWebTexteurNatif.ajouteRecharge(msg.jetonDoc);
                    fureteur.alarms.create("recharge_onglet_lientabs", {
                        delayInMinutes: 0.5
                    });
                    fureteur.alarms.onAlarm.addListener((a) => {
                        if (a.name == "recharge_onglet_lientabs") {
                            fureteur.tabs.reload(portReel.sender.tab.id)
                        }
                    });
                } else if (ouvrierGlobal.idOnglet != -1) {
                    if (gestionnaireAWebTexteurNatif.donneNbRecharge(msg.jetonDoc) > 1) {
                        gestionnaireErreur.traiteErreur({
                            date: new Date().toString(),
                            message_log: "Nombre de recharge de la page tremplin > 1",
                            nbRecharges: gestionnaireAWebTexteurNatif.donneNbRecharge(msg.jetonDoc)
                        });
                    }
                    msg.idPageCoCorrecteurAW = encodeChainePourJson(ouvrier.idOnglet);
                    await ouvrier.metsDonnees({
                        infoAWeb: {
                            estTexteurNatif: true,
                            estPageAWeb: true,
                            infoJeton: {
                                jeton: msg.jetonDoc,
                                urlRedirect: msg.urlRedir
                            },
                            infoOutils: ouvrierGlobal.infoAWeb.infoOutils
                        }
                    });
                    ouvrier.envoieMessageAuDocument(msg, msg.lePortWs);
                } else {
                    gestionnaireErreur.traiteErreur({
                        date: new Date().toString(),
                        message_log: "Nombre de recharge de la page tremplin > 5; appel annulé",
                        nbRecharges: gestionnaireAWebTexteurNatif.donneNbRecharge(msg.jetonDoc)
                    });
                }
            } else if (msg.message == "fermeture") {
                if (estSafariWebex() && global.infoConnecteur.manifest == 2) {
                    gestionnairePort.detruisPort(portReel);
                }
            }
            completay(true);
        });
        await execution;
    }
}
async function gestionnaireMessageDuPopup(msg) {
    if (msg.message == "lanceOutil") {
        lanceOutil(msg.outil, undefined, "popup");
    } else if (msg.message == "ouvreReglages") {
        ouvreReglages();
    } else if (msg.message == "ouvreDagda") {
        ouvreDagda();
    } else if (msg.message == "ouvreAWeb") {
        ouvreAWeb();
    } else if (msg.message == "ouvreAWebConnexion") {
        ouvreAWebConnexion();
        global.metsDonnees({
            idAntidote: cstIdAntidoteWeb
        });
    } else if (msg.message == "ouvreAide") {
        OuvreAide("dw");
    } else if (msg.message == "reactiveDW") {
        let ouvrier = new ObjetOuvrier();
        await ouvrier.recupere(global.idOngletActif);
        ouvrier.envoieMessageAuDocument({
            message: "reactiveDW",
            id: ouvrier.infoDW.champ.id
        });
        ouvrier.metsDonnees({
            infoDW: {
                champ: {
                    id: ouvrier.infoDW.champ.id,
                    actif: true
                }
            }
        });
    } else if (msg.message == "supprimeDW") {
        let ouvrier = new ObjetOuvrier();
        await ouvrier.recupere(global.idOngletActif);
        ouvrier.envoieMessageAuDocument({
            message: "supprimeDW",
            id: ouvrier.infoDW.champ.id
        });
        ouvrier.metsDonnees({
            infoDW: {
                champ: {
                    id: ouvrier.infoDW.champ.id,
                    actif: false
                }
            }
        });
    } else if (msg.message == "indiqueChamp") {
        let ouvrier = new ObjetOuvrier();
        await ouvrier.recupere(global.idOngletActif);
        ouvrier.envoieMessageAuDocument({
            message: "indiqueChamp",
            id: ouvrier.infoDW.champ.id,
            etat: msg.etat
        });
    } else if (msg.message == "exclusSite") {
        let ouvrier = new ObjetOuvrier();
        await ouvrier.recupere(global.idOngletActif);
        let unURL = await ouvrier.donneUrl();
        let url = new URL(unURL);
        let domaine = url.hostname;
        let uneListe = global.infoDW.listeExclusion;
        uneListe.push(domaine);
        global.metsDonnees({
            infoDW: {
                listeExclusion: uneListe
            }
        });
        ouvrier.envoieMessageAuDocument({
            message: "supprimeDW",
            id: ouvrier.infoDW.champ.id
        });
    } else if (msg.message == "inclusSite") {
        let ouvrier = new ObjetOuvrier();
        await ouvrier.recupere(global.idOngletActif);
        let unURL = await ouvrier.donneUrl();
        let url = new URL(unURL);
        let domaine = url.hostname;
        let uneListe = global.infoDW.listeExclusion;
        let i = uneListe.indexOf(domaine);
        uneListe.splice(i, 1);
        global.metsDonnees({
            infoDW: {
                listeExclusion: uneListe
            }
        });
    } else if (msg.message == "traiteErreur") {
        if (msg.type == "recharge") {
            gestionnaireBouton.metsTexte("");
            gestionnaireErreur.messageErreur = "";
            fureteur.runtime.reload();
            fureteur.runtime.reload();
        }
    } else if (msg.message == "demandeDonnees") {
        let _dib84 = await demandeDonnees();
        let unPort = gestionnairePort.donnePortSelonNom("antidote-popup");
        unPort.postMessage(_dib84[0]);
    } else if (msg.message == "changeEtatDW") {
        let ouvrier = new ObjetOuvrier();
        await ouvrier.recupere(global.idOngletActif);
        if (global.doisConfirmerIdAntidote()) {
            await ouvrier.afficheDialogue({
                message: "afficheDialogueOuiNon",
                messageReponse: "confirmeLanceOutilAWeb",
                _dib37: gestionTraduction.Tr_(cstMessageConfirmerAWeb, ""),
                explication: gestionTraduction.Tr_(cstExplicationConfirmerAWeb, ""),
                chaine_ok: gestionTraduction.Tr_(cstOui, ""),
                chaine_annuler: gestionTraduction.Tr_(cstNon, "")
            });
        }
        global.metsDonnees({
            infoDW: {
                estActivay: msg.etat
            }
        });
        ouvrier.envoieMessageAuDocument({
            message: "activerDW"
        });
    } else if (msg.message == "changeNiveauAlerte") {
        let ouvrier = new ObjetOuvrier();
        await ouvrier.recupere(global.idOngletActif);
        global.metsDonnees({
            infoDW: {
                niveauAlerte: msg.niveau_alerte
            }
        });
        ouvrier.envoieMessageAuDocument({
            message: "changeNiveauAlerte",
            niveauAlerte: msg.niveau_alerte
        });
    }
}
async function gestionnaireMessageLog(msg) {
    if (msg.message == "demandeDonnees") {
        let unPort = gestionnairePort.donnePortSelonNom("antidote-log");
        unPort.postMessage({
            global: global,
            log_dw: gestionnaireLogDW.bd
        });
    }
}
async function gestionnaireMessagePage(msg, leNomPort) {
    if (msg.message == "demandeDonnees" && leNomPort != "billetix") {
        let unPort = gestionnairePort.donnePortSelonNom(leNomPort);
        if (unPort && unPort !== undefined) {
            let reponse = global;
            let desErreurs = await gestionnaireErreur.donneListeErreurs()
            reponse.log_erreur = desErreurs.log_erreur;
            unPort.postMessage(reponse);
        }
    } else if (msg.message == "demandeDonnees" && leNomPort == "billetix") {
        let unPort = gestionnairePort.donnePortSelonNom(leNomPort);
        if (unPort && unPort !== undefined) {
            let desDonnees = await demandeDonnees();
            let desErreurs = await gestionnaireErreur.donneListeErreurs()
            desDonnees[0].log_erreur = desErreurs.log_erreur;
            desDonnees.push(gestionnaireLogDW.bd);
            unPort.postMessage(desDonnees);
        }
    } else if (msg.message == "nouvellesDonnees") {
        global.metsDonnees(msg._dib84);
        gestionnaireMenu.installeMenu();
    } else if (msg.message == "supprime_log_erreur") {
        gestionnaireErreur.supprimeErreurs();
    } else if (msg.message == "ouvreReglages") {
        ouvreReglages();
    } else if (msg.message == "bd_reinit") {
        global.reinit();
        gestionnaireLogDW.supprimeLogs();
        gestionnaireErreur.supprimeErreurs();
    } else if (msg.message == "bd_nouveau") {
        global.metsDonnees(msg.data, true);
    } else if (msg.message == "ouvre_billetix") {
        ouvreDagda();
    } else if (msg.message == "service_druide_chargeay") {
        let unPort = gestionnairePort.donnePortSelonNom(msg._id);
        if (estSafariWebex() && unPort && unPort !== undefined) {
            if (unPort.sender.url.indexOf("redirect_uri=x-safari-antidote-app://connexion") >= 0) {
                unPort.postMessage({
                    message: "cacheBouton"
                });
            }
        }
    } else if (msg.message == "ferme") {
        let unPort = gestionnairePort.donnePortSelonNom(leNomPort);
        if (unPort && unPort !== undefined) fureteur.tabs.remove(unPort.sender.tab.id);
    }
}
async function gestionnaireMessageDesReglages(msg) {
    gestionnaireMessagePage(msg, "antidote-reglages");
}
async function gestionnaireMessagePageInstallation(msg) {
    gestionnaireMessagePage(msg, "antidote-installation");
}
async function gestionnaireMessagePageMiseAjour(msg) {
    gestionnaireMessagePage(msg, "antidote-miseajour");
}
async function gestionnaireMessageBilletix(msg) {
    gestionnaireMessagePage(msg, "billetix");
}
async function gestionnaireMessagePageServices(msg) {
    gestionnaireMessagePage(msg, "services-druide");
}
let gestionnaireAWebTexteurNatif = {
    mesSessions: null,
    mesRecharges: null,
    init() {
        gestionnaireAWebTexteurNatif.mesSessions = new Map();
        gestionnaireAWebTexteurNatif.mesRecharges = new Map();
    },
    ajoute(idOnglet, idDocument) {
        if (gestionnaireAWebTexteurNatif.mesSessions == null) gestionnaireAWebTexteurNatif.init();
        gestionnaireAWebTexteurNatif.mesSessions.set(idDocument, idOnglet);
    },
    detruis(idDocument) {
        if (gestionnaireAWebTexteurNatif.mesSessions.has(idDocument)) {
            gestionnaireAWebTexteurNatif.mesSessions.delete(idDocument);
        }
    },
    donneOnglet(idDocument) {
        return gestionnaireAWebTexteurNatif.mesSessions.get(idDocument) !== undefined ? gestionnaireAWebTexteurNatif.mesSessions.get(idDocument) : 0;
    },
    estConnectay(idDocument) {
        if (gestionnaireAWebTexteurNatif.mesSessions == null) return false;
        if (!gestionnaireAWebTexteurNatif.mesSessions.has(idDocument) && gestionnaireAWebTexteurNatif.mesSessions.size == 1 && gestionnaireAWebTexteurNatif.mesSessions.has(undefined)) {
            gestionnaireAWebTexteurNatif.mesSessions.set(idDocument, gestionnaireAWebTexteurNatif.mesSessions.get(undefined));
        }
        return gestionnaireAWebTexteurNatif.mesSessions.has(idDocument);
    },
    ajouteRecharge(leJeton) {
        if (gestionnaireAWebTexteurNatif.mesRecharges == null) {
            gestionnaireAWebTexteurNatif.mesRecharges = new Map();
        };
        if (gestionnaireAWebTexteurNatif.mesRecharges.has(leJeton)) {
            let nbRecharges = gestionnaireAWebTexteurNatif.mesRecharges.get(leJeton);
            nbRecharges++;
            gestionnaireAWebTexteurNatif.mesRecharges.set(leJeton, nbRecharges);
        } else {
            gestionnaireAWebTexteurNatif.mesRecharges.set(leJeton, 1);
        }
    },
    peuxRecharger(leJeton) {
        if (gestionnaireAWebTexteurNatif.mesRecharges && gestionnaireAWebTexteurNatif.mesRecharges.has(leJeton)) {
            let nbRecharges = gestionnaireAWebTexteurNatif.mesRecharges.get(leJeton);
            return nbRecharges < 5;
        } else {
            return true;
        }
    },
    donneNbRecharge(leJeton) {
        if (gestionnaireAWebTexteurNatif.mesRecharges && gestionnaireAWebTexteurNatif.mesRecharges.has(leJeton)) {
            return gestionnaireAWebTexteurNatif.mesRecharges.get(leJeton);
        } else {
            return 0;
        }
    }
}
let servicesCommunicationAntiOupsWeb = {
    faisRequete: async function(msg, details, fonctionReponse) {
        let msgIntervention = {
            reponseAntiOups: {},
            uuid: msg.uuid !== undefined ? msg.uuid : ""
        };
        let headersGet = {
            'Content-Type': 'application/json'
        };
        fetch(global.infoDW.adresseDWeb + "infosUtilisateurSelonParams?typeDonnees=7", {
            method: 'GET',
            headers: headersGet
        }).then(async (infos) => {
            if (infos.status == 200) {
                let reponseInfos = await infos.json();
                let headers = {
                    'Content-Type': 'application/json',
                    'Version-Donnees': reponseInfos.version,
                    'Version-Commune': reponseInfos.version
                };
                let unTexte = decodeChaineDeJson(msg.texteCourriel._dib30);
                let data = {
                    texteAvecAttributs: {
                        texte: unTexte,
                        attributs: {
                            intervalleDebut: 0,
                            intervalleFin: unTexte.length,
                            attribut: 0
                        }
                    }
                }
                const requete = new Request(global.infoDW.adresseDWeb + "correcteur/antiOups", {
                    method: 'POST',
                    headers,
                    body: JSON.stringify(data)
                });
                let uneInfoIntervention = await fetch(requete);
                if (uneInfoIntervention.status == 200) {
                    let uneInterventionOriginal = await uneInfoIntervention.json();
                    let msgConverti = servicesCommunicationAntiOupsWeb.convertisResultat(uneInterventionOriginal, msg.nbPJ > 0);
                    msgIntervention.reponseAntiOups = servicesCommunicationAntiOupsWeb.traiteResultat(msg, details, msgConverti);
                }
            }
            fonctionReponse(msgIntervention)
        });
    },
    convertisResultat: function(msg, contientPJ = false) {
        let msgIntervention = {
            codeErreur: "aucune",
            signaleAbsenceDetection: true,
            detections: []
        }
        let detections = msg.resultatsAntiOups.detections;
        let mentionPJ = msg.resultatsAntiOups.mentionPJ;
        let premierMots = msg.resultatsAntiOups.lesPremiersMots2eLangue;
        let languesInactives = msg.resultatsAntiOups.languesInactives;
        if (detections & 1) {
            msgIntervention.detections.push({
                type: "fautes",
                mention: "",
                langues: 0
            });
            msgIntervention.signaleAbsenceDetection = false;
        }
        if (detections & 2) {
            msgIntervention.detections.push({
                type: "typos",
                mention: "",
                langues: 0
            });
        }
        if (detections & 4 && !contientPJ) {
            msgIntervention.detections.push({
                type: "pieceJointe",
                mention: mentionPJ,
                langues: 0
            });
            msgIntervention.signaleAbsenceDetection = false;
        }
        if (detections & 8) {
            msgIntervention.detections.push({
                type: "langueInactive",
                mention: premierMots,
                langues: languesInactives
            });
            msgIntervention.signaleAbsenceDetection = false;
        }
        if (detections & 16) {
            msgIntervention.detections.push({
                type: "tonVexant",
                mention: "",
                langues: 0
            });
            msgIntervention.signaleAbsenceDetection = false;
        }
        return msgIntervention;
    },
    traiteResultat: function(msgOriginal, details, msgResultat) {
        let _dib30 = decodeChaineDeJson(msgOriginal.texteCourriel._dib30);
        let textOriginal = details.sujet + cstSeparateurSujet + details.corps;
        if (_dib30 != textOriginal) {
            if (details.sujet.length > 0 || details.corps.length > 0) {
                msgResultat.codeErreur = "AucuneVerificationSubsequente";
                msgResultat.detections = [];
            }
        } else {
            msgResultat.signaleAbsenceDetection = true;
            msgResultat.detections = [];
        }
        return msgResultat;
    }
}
let gestionnaireConnexionSafari = {
    monAppNative: null,
    gereCookieSafari: async function() {
        this.monAppNative = fureteur.runtime.connectNative(gestionnaireConnexionNative.monNomAgentConsole);
        this.monAppNative.onMessage.addListener(async function(msg) {
            let userInfo = msg.userInfo !== undefined ? msg.userInfo : null;
            if (userInfo) {
                if (userInfo.succes !== undefined) {
                    global.metsDonnees({
                        estAWebConnectay: userInfo.succes,
                        infoDW: {
                            estActivay: userInfo.succes,
                            estDisponible: userInfo.succes,
                            estVerifiayAWeb: true
                        }
                    });
                }
                if (userInfo.entete && userInfo.entete !== undefined && userInfo.entete["Set-Cookie"] !== undefined) {
                    if (userInfo.entete["Set-Cookie"].indexOf("__Secure-jeton") >= 0) {
                        let chaineBiscuit = userInfo.entete["Set-Cookie"].substring(userInfo.entete["Set-Cookie"].indexOf("__Secure-jeton"));
                        let desBiscuits = chaineBiscuit.split(";");
                        let unObjBiscuit = {
                            url: global.adresseAWeb,
                            name: "",
                            value: "",
                            path: "/",
                            sameSite: "strict",
                            httpOnly: false,
                            secure: false
                        }
                        for (let unBiscuit of desBiscuits) {
                            if (unBiscuit.split("=")[0] == "__Secure-jeton") {
                                unObjBiscuit.name = unBiscuit.split("=")[0];
                                unObjBiscuit.value = unBiscuit.split("=")[1];
                            } else if (unBiscuit.split("=")[0] == "SameSite") {
                                unObjBiscuit.sameSite = unBiscuit.split("=")[1].toLowerCase();
                            } else if (unBiscuit.split("=")[0] == "Path") {
                                unObjBiscuit.path = unBiscuit.split("=")[1];
                            } else if (unBiscuit.split("=")[0] == "Secure") {
                                unObjBiscuit.secure = true;
                            } else if (unBiscuit.split("=")[0] == "HttpOnly") {
                                unObjBiscuit.httpOnly = true;
                            }
                        }
                        ajouteCookie(unObjBiscuit);
                    }
                }
            }
        });
    },
    ouvreApplicationHoteSafari: async function() {
        fureteur.runtime.sendNativeMessage(gestionnaireConnexionNative.monNomAgentConsole, {
            message: "lanceApplicationHote"
        });
    }
}
let gestionnaireConnexionNative = {
    monAppNative: null,
    monNomAgentConsole: cstNomAgentAntidote,
    essaiVieilAgent: false,
    monRespirateur: null,
    monIntervalleRespirateur: 0,
    estReglagesV1: false,
    global: null,
    objMessage: {
        message: null,
        idOnglet: -1
    },
    nbEssai: 0,
    init: async function(leMessage, leIdOnglet) {
        if (estGoogleChrome()) {
            gestionnaireConnexionNative.fermeRespirateur();
        }
        if (estSafariWebex()) {
            gestionnaireConnexionSafari.gereCookieSafari();
        }
        let ouvrier = new ObjetOuvrier();
        await ouvrier.metsDonnees({
            idOnglet: 0
        });
        if (leMessage !== undefined && leMessage.message != "_dib41" && leIdOnglet !== undefined) {
            gestionnaireConnexionNative.objMessage.message = leMessage;
            gestionnaireConnexionNative.objMessage.idOnglet = leIdOnglet;
        } else {
            gestionnaireConnexionNative.objMessage = {
                message: null,
                idOnglet: -1
            };
        }
        if (!global.estModeSolo) {
            gestionnaireConnexionNative.lanceApplication();
        }
    },
    demandeReglages_v1: async function() {
        this.monAppNative = fureteur.runtime.connectNative(gestionnaireConnexionNative.monNomAgentConsole);
        if (estSafariWebex()) {
            this.monAppNative.postMessage({
                message: "connexion",
                origine: "etablisCommunicationWs"
            });
        }
        this.monAppNative.onMessage.addListener(function(msg) {
            gestionnaireConnexionNative.recoisMessage(msg);
        });
        this.monAppNative.onDisconnect.addListener(function() {
            if (fureteur.runtime.lastError) {
                var m = fureteur.runtime.lastError.message;
            }
            gestionnaireConnexionNative.monAppNative = null;
        });
        fureteur.alarms.create("demande_regalges_v1", {
            delayInMinutes: 0.5
        });
        fureteur.alarms.onAlarm.addListener((a) => {
            if (a.name == "demande_regalges_v1") {
                gestionnaireConnexionNative.envoieMessage({
                    message: cstMessageReglageAgentConnectix,
                    _dib105: cstTypeMessageRequeteAgentConnectix,
                    _dib101: cstRoleConnecteur,
                    ORIGINE: "demandeReglages_v1"
                })
            }
        });
        return gPromesseReglage;
    },
    demandeReglages: async function() {
        let uneReponse = null;
        if (!gestionnaireConnexionNative.estReglagesV1) {
            let rnm = fureteur.runtime.sendNativeMessage(gestionnaireConnexionNative.monNomAgentConsole, {
                message: cstMessageReglageAgentConnectix,
                _dib105: cstTypeMessageRequeteAgentConnectix,
                _dib101: cstRoleConnecteur,
                ORIGINE: "demandeReglages"
            });

            function gereErreurNativeMessaging(erreurConnexion) {
                global.metsDonnees({
                    idAntidote: cstIdAntidoteWebAConfirmer,
                    infoDW: {
                        antidoteLocalCompatible: false
                    }
                });
            }
            rnm.then(gestionnaireConnexionNative.recoisMessage, gereErreurNativeMessaging);
            uneReponse = gPromesseReglage;
        } else {
            uneReponse = gestionnaireConnexionNative.demandeReglages_v1();
        }
        return uneReponse;
    },
    lanceApplication: function() {
        fureteur.runtime.sendNativeMessage(gestionnaireConnexionNative.monNomAgentConsole, {
            message: "lanceApplication"
        }).then(msg => {
            gestionnaireConnexionNative.estReglagesV1 = false;
            gestionnaireConnexionNative.recoisMessage(msg, true)
        }).catch(async function(erreurConnexion) {
            function traiteMessageErreur(leMessageErreur) {
                const desMessagesErreurs = ["Error: Invalid native messaging host name specified.", "Error: Specified native messaging host not found.", "Error: Specified native messaging host not found.", "Error: Access to the specified native messaging host is forbidden.", "Error: No such native application " + gestionnaireConnexionNative.monNomAgentConsole];
                return desMessagesErreurs.includes(leMessageErreur);
            }
            if (traiteMessageErreur(erreurConnexion.toString()) && gestionnaireConnexionNative.nbEssai == 0 && !gestionnaireConnexionNative.essaiVieilAgent) {
                gestionnaireConnexionNative.monNomAgentConsole = cstNomAgentAntidote;
                global.metsDonnees({
                    infoDW: {
                        antidoteLocalCompatible: false,
                        estActivay: false,
                        dWebDevoilee: false
                    }
                });
                gestionnaireConnexionNative.nbEssai++;
                gestionnaireConnexionNative.essaiVieilAgent = true;
                gestionnaireConnexionNative.lanceApplication();
            } else if (gestionnaireConnexionNative.essaiVieilAgent && traiteMessageErreur(erreurConnexion.toString())) {
                global.metsDonnees({
                    confirmeModeSolo: true
                });
                if (global.idAntidote != cstIdAntidoteWebSolo) {
                    global.metsDonnees({
                        idAntidote: cstIdAntidoteWebAConfirmer
                    });
                }
            } else {
                if (gestionnaireConnexionNative.objMessage.message != null) {
                    global.metsDonnees({
                        idAntidote: cstIdAntidoteWebAConfirmer,
                        infoDW: {
                            antidoteLocalCompatible: false
                        }
                    });
                    let ouvrier = new ObjetOuvrier();
                    await ouvrier.recupere(global.idOngletActif);
                    if (ouvrier.infoAWeb.estTexteurNatif) {
                        ouvrier.envoieMessageAAweb({
                            message: "integrationIncomplete"
                        })
                    } else {
                        let uneExplication = gestionTraduction.UniFmt(cstMsg_Patience_Fmt, gestionTraduction.Tr_(cstExplicationAppelAntidoteImpossibleChrome, ""), gestionTraduction.Tr_(cstCodeErreur, ""), cstCodeAppelAntidoteInaccessible);
                        await ouvrier.afficheDialogue({
                            message: "_dib41",
                            messageReponse: "confirmeDialogue",
                            _dib37: gestionTraduction.Tr_(cstMessageAppelAntidoteImpossible, ""),
                            explication: uneExplication
                        });
                    }
                } else {
                    gestionnaireErreur.traiteErreur({
                        erreur: "Erreur_6080",
                        message: gestionnaireConnexionNative.objMessage.message
                    });
                }
            }
        });;
    },
    envoieMessage: function(msg) {
        gestionnaireConnexionNative.monAppNative.postMessage(msg);
    },
    recoisMessage: async function(msg, estLanceApplication) {
        if (estLanceApplication === undefined) {
            estLanceApplication = false;
        }
        if (msg === undefined) {} else if (!estVide(msg)) {
            if ((typeof msg) != cstObject) {
                msg = JSON.parse(msg);
            }

            function donneValiditeDuMessage(leMessage) {
                return leMessage.noPort !== undefined && leMessage._dib104 !== undefined && leMessage.versionIATMin !== undefined && leMessage.versionIATMax !== undefined && (leMessage.versionPontAAMin !== undefined || gestionnaireConnexionNative.estReglagesV1) && (leMessage.versionPontAAMax !== undefined || gestionnaireConnexionNative.estReglagesV1);
            }
            let uneLangue = fureteur.i18n.getUILanguage();
            if (estSafariWebex()) {
                let uneListeLangues = await fureteur.i18n.getAcceptLanguages();
                uneLangue = uneListeLangues[0];
            }
            global.metsDonnees({
                langue: uneLangue,
                portWS: msg.noPort,
                idAntidote: msg._dib104,
                echecLancementAgentConnectix: false,
                versionIAT: {
                    versionMin: msg.versionIATMin,
                    versionMax: msg.versionIATMax
                },
                versionPontAA: {
                    versionMin: msg.versionPontAAMin !== undefined ? msg.versionPontAAMin : "1.0",
                    versionMax: msg.versionPontAAMax !== undefined ? msg.versionPontAAMax : "1.0"
                },
                versionPont: msg.versionPontAAMax !== undefined ? cstVersionPontAAMax : cstVersionPontRetrocompatible,
                versionSafari: msg.versionSafari !== undefined ? msg.versionSafari : "0.0",
                permetAuthenticationSession: msg.permetAuthenticationSession !== undefined ? msg.permetAuthenticationSession : false,
                antiOups: {
                    correctionAutomatique: msg.correctionAutomatique,
                    detectionPiecesManquantes: msg.detectionPiecesManquantes,
                    texteRepris: msg.texteRepris,
                    jeTraiteSignature: msg.jeTraiteSignature,
                    reseau: {
                        jeInhibeRaccourciAntiOupsShift: msg.jeInhibeRaccourciAntiOupsShift,
                        jeInhibeRaccourciAntiOupsCtrl: msg.jeInhibeRaccourciAntiOupsCtrl
                    }
                }
            });
            let estEchecLancementAgentConnectix = (msg.message !== undefined && msg.message == "echecLancementAgentConnectix") || !donneValiditeDuMessage(msg);
            if (estEchecLancementAgentConnectix) {
                global.metsDonnees({
                    echecLancementAgentConnectix: true,
                    portWS: ""
                });
            }
            let estModeSolo = estSafariWebex() && msg.estModeSolo;
            global.metsDonnees({
                estModeSolo: estModeSolo
            });
            if (!estModeSolo && !estEchecLancementAgentConnectix) {
                if (msg.enExecution !== undefined) {
                    if (!msg.enExecution) {
                        gestionnaireConnexionNative.lanceApplication();
                    }
                }
                if (msg.enExecution && (estLanceApplication || global.estModeRetrocompatible())) {
                    gestionnaireWebSocket.initialise(0);
                }
            }
            if (estThunderbird()) {
                gestionnaireAntiOupsThunderbird.init(global);
            }
            if (msg.enExecution && gestionnaireConnexionNative.objMessage.message != null && gestionnaireConnexionNative.objMessage.idOnglet != -1 && !estEchecLancementAgentConnectix) {
                gestionnaireWebSocket.etablisConnexionWebSocket(gestionnaireConnexionNative.objMessage.message, gestionnaireConnexionNative.objMessage.idOnglet);
                gestionnaireConnexionNative.objMessage.message = null;
                gestionnaireConnexionNative.objMessage.idOnglet = -1;
            } else if (estEchecLancementAgentConnectix && gestionnaireConnexionNative.objMessage.message != null) {
                let uneExplication = gestionTraduction.UniFmt(cstMsg_Patience_Fmt, gestionTraduction.Tr_(cstExplicationEchecLancementAC, ""), gestionTraduction.Tr_(cstCodeErreur, ""), cstCodeEchecLancementAC);
                let ouvrier = new ObjetOuvrier();
                await ouvrier.recupere(gestionnaireConnexionNative.objMessage.idOnglet);
                await ouvrier.afficheDialogue({
                    message: "_dib41",
                    messageReponse: "confirmeDialogue",
                    _dib37: gestionTraduction.Tr_(cstMessageEchecLancementAC, ""),
                    explication: uneExplication,
                    plateforme: global.plateforme
                });
            }
            let C = new CustomEvent('reglages_nm_recu', {
                detail: JSON.stringify({
                    message: "reglages_nm_recu",
                    port: global.portWS
                })
            });
            self.dispatchEvent(C);
        } else if (!gestionnaireConnexionNative.estReglagesV1) {
            gestionnaireConnexionNative.estReglagesV1 = true;
            gestionnaireConnexionNative.demandeReglages_v1();
        }
    },
    deconnexion: function() {
        gestionnaireConnexionNative.envoieMessage({
            message: "deconnexion"
        });
    },
    fermeRespirateur: function() {
        if (gestionnaireConnexionNative.monRespirateur != null && gestionnaireConnexionNative.monIntervalleRespirateur > 0) {
            gestionnaireConnexionNative.monRespirateur.postMessage({
                message: "deconnexion"
            });
            clearInterval(gestionnaireConnexionNative.monIntervalleRespirateur);
            gestionnaireConnexionNative.monIntervalleRespirateur = null;
        }
    }
};
let gestionnaireBackgroundAntiOups = {
    correctionAutomatiqueActif: false,
    detectionPiecesManquantesActif: false,
    texteReprisActif: false,
    nePasDeranger: false,
    instancesA12: {},
    ouvriers: {},
    mesCommunications: {},
    serviceAO12: {},
    init: async function(leIdFenetreCourriel, leIdOnglet) {
        if (global.antiOups.correctionAutomatique !== undefined) {
            this.correctionAutomatiqueActif = global.antiOups.correctionAutomatique;
        }
        if (global.antiOups.detectionPiecesManquantes !== undefined) {
            this.detectionPiecesManquantesActif = global.antiOups.detectionPiecesManquantes;
        }
        if (global.antiOups.texteRepris !== undefined) {
            this.texteReprisActif = global.antiOups.texteRepris;
        }
        if (this.mesCommunications[leIdFenetreCourriel] == undefined) {
            if (global.idAntidote == cstIdAntidoteBureau) {
                this.mesCommunications[leIdFenetreCourriel] = new CommunicationAntiOupsConnectix(leIdFenetreCourriel, global.portWS);
            } else {
                this.mesCommunications[leIdFenetreCourriel] = new CommunicationAntiOupsAweb(leIdFenetreCourriel, global.adresseAWeb, global.infoDW.cookieAWebValue);
            }
        }
        if (!this.ouvriers[leIdFenetreCourriel]) {
            this.ouvriers[leIdFenetreCourriel] = new ObjetOuvrier();
            await this.ouvriers[leIdFenetreCourriel].recupere(leIdOnglet);
        }
        this.serviceAO12 = !this.instancesA12[leIdFenetreCourriel] ? new serviceClientAntiOupsNavigateursA12(leIdFenetreCourriel, leIdOnglet) : this.instancesA12[leIdFenetreCourriel];
    },
    desinitialiseCourriel: function(leId) {
        this.mesCommunications[leId]?.desinitialiseCourriel();
        this.mesCommunications[leId] = undefined;
    },
    enregistreCourriel: function(leId, _dib30) {
        return this.mesCommunications[leId].enregistreCourriel(leId, _dib30);
    },
    analyseEnvoi: async function(objCourriel, nepascorriger, modeSansTraitement) {
        let reponse = await this.mesCommunications[objCourriel.id].analyseEnvoi(objCourriel, nepascorriger);
        if (modeSansTraitement)
            return reponse;
        if (this.instancesA12[objCourriel.id]) {
            this.instancesA12[objCourriel.id].digereIntervention(reponse);
        } else {
            if (serviceClientAntiOupsA12.donneResultatAPartirDeReponse(reponse) !== undefined) {
                this.instancesA12[objCourriel.id] = this.serviceAO12;
                this.instancesA12[objCourriel.id].digereIntervention(reponse);
            } else {
                this.traiteIntervention(reponse, objCourriel.id);
            }
        }
    },
    lanceOutilAntiOups(id) {
        lanceOutil("C1", this.ouvriers[id].idOnglet, "", id);
    },
    afficheAlerteEphemere(tempsExpiration, explication, _dib75, id) {
        this.ouvriers[id].envoieMessageAuDocument({
            message: "AfficheAlerteEphemere",
            donneesDialogue: {
                message: "alerte",
                plateforme: global.plateforme,
                explication_dialogue: explication,
                titre_dialogue: _dib75,
                expiration: tempsExpiration
            }
        });
    },
    traiteIntervention: async function(msg, leIdFenetreCourriel) {
        if (msg.sorteIntervention == 0) {
            this.ouvriers[leIdFenetreCourriel].envoieMessageAuDocument({
                message: "EnvoieCourriel",
                idFenetre: leIdFenetreCourriel
            });
        }
        if (msg.sorteIntervention == 1) {
            this.ouvriers[leIdFenetreCourriel].envoieMessageAuDocument({
                message: "AfficheDialogueAO",
                idFenetre: leIdFenetreCourriel,
                donneesDialogue: {
                    message: "dialogue",
                    plateforme: global.plateforme,
                    titre_dialogue: gestionTraduction.Tr_(cstMessageAntiOupsPJManquante, ""),
                    explication_dialogue: gestionTraduction.UniFmt(gestionTraduction.Tr_(cstExplicationAntiOupsPJManquante, cstExplicationAntiOupsPJManquante_2), msg.mentionPJ),
                    bouton_ok: {
                        texte_dialogue: gestionTraduction.Tr_(cstNomBoutonAnnuler, ""),
                        retour: "annuler"
                    },
                    bouton_annuler: {
                        texte_dialogue: gestionTraduction.Tr_(cstNomBoutonPoursuivre, ""),
                        retour: "poursuivre"
                    },
                }
            });
        } else if (msg.sorteIntervention == 2) {
            this.lanceOutilAntiOups(leIdFenetreCourriel);
        } else if (msg.sorteIntervention == 3) {
            this.ouvriers[leIdFenetreCourriel].envoieMessageAuDocument({
                message: "AfficheDialogueAO",
                idFenetre: leIdFenetreCourriel,
                donneesDialogue: {
                    message: "dialogue",
                    plateforme: global.plateforme,
                    titre_dialogue: gestionTraduction.Tr_(cstMessageAntiOupsRecorrection, ""),
                    explication_dialogue: gestionTraduction.Tr_(cstExplicationAntiOupsRecorrection, ""),
                    bouton_annuler: {
                        texte_dialogue: gestionTraduction.Tr_(cstNomBoutonAnnuler, ""),
                        retour: "annuler"
                    },
                    bouton_ok: {
                        texte_dialogue: gestionTraduction.Tr_(cstNomBoutonPoursuivreEnvoi, ""),
                        retour: "poursuivre"
                    },
                    bouton_info: {
                        texte_dialogue: gestionTraduction.Tr_(cstNomBoutonCorriger, ""),
                        retour: "corriger"
                    }
                }
            });
        } else if (msg.sorteIntervention == 5) {
            this.afficheAlerteEphemere(1000, gestionTraduction.Tr_(cstMessageAucuneInterventionRequise, ""), gestionTraduction.Tr_(cstAntiOups, ""), leIdFenetreCourriel)
            this.ouvriers[leIdFenetreCourriel].envoieMessageAuDocument({
                message: "EnvoieCourriel",
                idFenetre: leIdFenetreCourriel
            });
        } else if (msg.sorteIntervention == 8) {
            this.ouvriers[leIdFenetreCourriel].envoieMessageAuDocument({
                message: "AfficheDialogueAO",
                idFenetre: leIdFenetreCourriel,
                donneesDialogue: {
                    message: "dialogue",
                    plateforme: global.plateforme,
                    titre_dialogue: gestionTraduction.Tr_("COLÈRE!", ""),
                    explication_dialogue: gestionTraduction.Tr_("Es-tu sûr?", ""),
                    bouton_annuler: {
                        texte_dialogue: gestionTraduction.Tr_(cstNomBoutonAnnuler, ""),
                        retour: "annuler"
                    },
                    bouton_ok: {
                        texte_dialogue: gestionTraduction.Tr_(cstNomBoutonPoursuivreEnvoi, ""),
                        retour: "poursuivre"
                    }
                }
            });
        } else if (msg.sorteIntervention == -8) {
            this.ouvriers[leIdFenetreCourriel].envoieMessageAuDocument({
                message: "AfficheDialogueAO",
                idFenetre: leIdFenetreCourriel,
                donneesDialogue: {
                    message: "dialogue",
                    plateforme: global.plateforme,
                    titre_dialogue: gestionTraduction.Tr_(cstMessageAntidoteInactif, ""),
                    explication_dialogue: gestionTraduction.Tr_(cstExplicationAntidoteInactif, ""),
                    bouton_annuler: {
                        texte_dialogue: gestionTraduction.Tr_(cstNomBoutonActiver, ""),
                        retour: "annuler"
                    },
                    bouton_ok: {
                        texte_dialogue: gestionTraduction.Tr_(cstNomBoutonPoursuivreEnvoi, ""),
                        retour: "poursuivre"
                    }
                }
            });
        } else if (msg.sorteIntervention == -7) {
            this.ouvriers[leIdFenetreCourriel].envoieMessageAuDocument({
                message: "AfficheDialogueAO",
                idFenetre: leIdFenetreCourriel,
                donneesDialogue: {
                    message: "dialogue",
                    plateforme: global.plateforme,
                    titre_dialogue: gestionTraduction.Tr_(cstAgentAntidoteIncompatible, ""),
                    explication_dialogue: "-7",
                    bouton_annuler: {
                        texte_dialogue: gestionTraduction.Tr_(cstNomBoutonAnnuler, ""),
                        retour: "annuler"
                    },
                    bouton_ok: {
                        texte_dialogue: gestionTraduction.Tr_(cstNomBoutonPoursuivreEnvoi, ""),
                        retour: "poursuivre"
                    }
                }
            });
        } else if (msg.sorteIntervention == -4) {
            this.ouvriers[leIdFenetreCourriel].envoieMessageAuDocument({
                message: "AfficheDialogueAO",
                idFenetre: leIdFenetreCourriel,
                donneesDialogue: {
                    message: "dialogue",
                    plateforme: global.plateforme,
                    titre_dialogue: gestionTraduction.Tr_(cstMessageErreurDernierEnvoi, ""),
                    explication_dialogue: "-4",
                    bouton_annuler: {
                        texte_dialogue: gestionTraduction.Tr_(cstNomBoutonAnnuler, ""),
                        retour: "annuler"
                    },
                    bouton_ok: {
                        texte_dialogue: gestionTraduction.Tr_(cstNomBoutonPoursuivreEnvoi, ""),
                        retour: "poursuivre"
                    }
                }
            });
        } else if (msg.sorteIntervention == -3) {
            this.ouvriers[leIdFenetreCourriel].envoieMessageAuDocument({
                message: "AfficheDialogueAO",
                idFenetre: leIdFenetreCourriel,
                donneesDialogue: {
                    message: "dialogue",
                    plateforme: global.plateforme,
                    titre_dialogue: gestionTraduction.Tr_(cstMessageLibLingPasChargee, ""),
                    explication_dialogue: "-3",
                    bouton_annuler: {
                        texte_dialogue: gestionTraduction.Tr_(cstNomBoutonAnnuler, ""),
                        retour: "annuler"
                    },
                    bouton_ok: {
                        texte_dialogue: gestionTraduction.Tr_(cstNomBoutonPoursuivreEnvoi, ""),
                        retour: "poursuivre"
                    }
                }
            });
        } else if (msg.sorteIntervention == -2) {
            this.ouvriers[leIdFenetreCourriel].envoieMessageAuDocument({
                message: "AfficheDialogueAO",
                idFenetre: leIdFenetreCourriel,
                donneesDialogue: {
                    message: "dialogue",
                    plateforme: global.plateforme,
                    titre_dialogue: gestionTraduction.Tr_(cstMessageAgentAntidoteInaccessible, ""),
                    explication_dialogue: "-2",
                    bouton_annuler: {
                        texte_dialogue: gestionTraduction.Tr_(cstNomBoutonAnnuler, ""),
                        retour: "annuler"
                    },
                    bouton_ok: {
                        texte_dialogue: gestionTraduction.Tr_(cstNomBoutonPoursuivreEnvoi, ""),
                        retour: "poursuivre"
                    }
                }
            });
        } else if (msg.sorteIntervention == -1) {
            this.ouvriers[leIdFenetreCourriel].envoieMessageAuDocument({
                message: "AfficheDialogueAO",
                idFenetre: leIdFenetreCourriel,
                donneesDialogue: {
                    message: "dialogue",
                    plateforme: global.plateforme,
                    titre_dialogue: gestionTraduction.Tr_(cstMessageAntidoteIntrouvable, ""),
                    explication_dialogue: "-1",
                    bouton_annuler: {
                        texte_dialogue: gestionTraduction.Tr_(cstNomBoutonAnnuler, ""),
                        retour: "annuler"
                    },
                    bouton_ok: {
                        texte_dialogue: gestionTraduction.Tr_(cstNomBoutonPoursuivreEnvoi, ""),
                        retour: "poursuivre"
                    }
                }
            });
        } else if (msg.sorteIntervention == 6 || msg.sorteIntervention == 7) {
            this.nePasDeranger = (await fureteur.storage.local.get()).nepasderanger === "true";
            if (!this.nePasDeranger) {
                if (msg.sorteIntervention == 6) {
                    this.ouvriers[leIdFenetreCourriel].envoieMessageAuDocument({
                        message: "AfficheDialogueAO",
                        idFenetre: leIdFenetreCourriel,
                        donneesDialogue: {
                            message: "dialogue",
                            plateforme: global.plateforme,
                            titre_dialogue: gestionTraduction.Tr_(cstChAntiOupsMessageInformationAnglaisInactif, ""),
                            explication_dialogue: gestionTraduction.UniFmt(gestionTraduction.Tr_(cstChAntiOupsExplicationInformationAnglaisInactif, ""), msg.mention2eLangue),
                            bouton_annuler: {
                                texte_dialogue: gestionTraduction.Tr_(cstChBoutonNePlusAfficher, ""),
                                retour: "nepasderanger"
                            },
                            bouton_ok: {
                                texte_dialogue: gestionTraduction.Tr_(cstChBoutonPlustard, ""),
                                retour: "poursuivre"
                            },
                            bouton_info: {
                                texte_dialogue: gestionTraduction.Tr_(cstChBoutonEnSavoirPlus, ""),
                                retour: "savoirplus"
                            }
                        }
                    });
                }
                if (msg.sorteIntervention == 7) {
                    this.ouvriers[leIdFenetreCourriel].envoieMessageAuDocument({
                        message: "AfficheDialogueAO",
                        idFenetre: leIdFenetreCourriel,
                        donneesDialogue: {
                            message: "dialogue",
                            plateforme: global.plateforme,
                            titre_dialogue: gestionTraduction.Tr_(cstChAntiOupsMessageInformationFrancaisInactif, ""),
                            explication_dialogue: gestionTraduction.UniFmt(gestionTraduction.Tr_(cstChAntiOupsExplicationInformationFrancaisInactif, ""), msg.mention2eLangue),
                            bouton_annuler: {
                                texte_dialogue: gestionTraduction.Tr_(cstChBoutonNePlusAfficher, ""),
                                retour: "nepasderanger"
                            },
                            bouton_ok: {
                                texte_dialogue: gestionTraduction.Tr_(cstChBoutonPlustard, ""),
                                retour: "poursuivre"
                            },
                            bouton_info: {
                                texte_dialogue: gestionTraduction.Tr_(cstChBoutonEnSavoirPlus, ""),
                                retour: "savoirplus"
                            }
                        }
                    });
                }
            } else {
                this.ouvriers[leIdFenetreCourriel].envoieMessageAuDocument({
                    message: "EnvoieCourriel",
                    idFenetre: leIdFenetreCourriel
                });
            }
        } else {
            this.ouvriers[leIdFenetreCourriel].envoieMessageAuDocument({
                message: "EnvoieCourriel",
                idFenetre: leIdFenetreCourriel
            });
        }
    }
}
let gestionnaireDW = {
    mesConnexions: {},
    etablisConnexionDW: async function(msg) {
        let portReel = gestionnairePort.donnePortSelonNom("si-comm" + separateurElement + msg._id);
        let ouvrier = new ObjetOuvrier();
        await ouvrier.recupere(portReel.sender.tab.id);
        if (!global.estAntidoteWebPourDWeb() && (global.echecLancementAgentConnectix || !global.estCEActive())) {
            global.metsDonnees({
                infoDW: {
                    estConnectay: false
                }
            });
            ouvrier.envoieMessageAuDocument({
                message: "metsAjourEtatDWeb",
                _dib29: false
            });
            return;
        }
        if (global.estAntidoteWebPourDWeb() && !global.estCEActive()) {
            ouvrier.envoieMessageAuDocument({
                message: "metsAjourEtatDWeb",
                _dib29: false
            });
            return;
        }
        let adresseDW = "";
        if (global.estAntidoteWebPourDWeb()) {
            let unURLAntidoteWebSansHttps = global.infoDW.adresseDWeb.substring(8, global.infoDW.adresseDWeb.length);
            if (global.infoDW.devDWeb == 'dweb_defaut' || global.infoDW.devDWeb == 'dweb_autre') {
                if (global.infoConnecteur.manifest == 3) {
                    adresseDW = "wss://" + unURLAntidoteWebSansHttps + "correcteur/simple2";
                } else {
                    adresseDW = "wss://" + unURLAntidoteWebSansHttps + "correcteur/simple";
                }
            } else {
                adresseDW = "ws://127.0.0.1:11000/correcteur/simple";
            }
        } else {
            if (global.portWS == "" || global.portWS == 0) {
                ouvrier.envoieMessageAuDocument({
                    message: "dw-comm",
                    id: msg.id,
                    reponse: "etatConnexion",
                    connectay: false
                });
                return;
            }
            adresseDW = "ws://127.0.0.1:" + global.portWS;
        }
        if (global.estAntidoteWebPourDWeb() && estGoogleChrome() && global.infoConnecteur.manifest == 2) {
            const networkFilters = {
                urls: [adresseDW],
                types: ['websocket']
            };
            fureteur.webRequest.onBeforeSendHeaders.addListener((details) => {
                let request = details.requestHeaders;
                request.push({
                    "name": "Cookie",
                    "value": global.infoDW.cookieAWeb
                });
                return {
                    requestHeaders: request
                };
            }, networkFilters, ["blocking", "requestHeaders", "extraHeaders"]);
        }
        if (msg.essai === undefined || msg.essai < 5) {
            let unPortConnexionWS = new WebSocket(adresseDW);
            if (this.mesConnexions[msg.id] === undefined) {
                this.mesConnexions[msg.id] = {
                    port: null,
                    ouvrierId: msg._id,
                    essai: 0
                };
            }
            unPortConnexionWS.onmessage = (mesg) => {
                if (mesg.data == "401") {
                    ouvrier.envoieMessageAuDocument({
                        message: "dw-comm",
                        id: msg.id,
                        reponse: "etatConnexion",
                        connectay: false
                    });
                } else {
                    var _dib84 = "";
                    if (global.estAntidoteWebPourDWeb()) {
                        _dib84 = JSON.stringify(mesg.data);
                    } else {
                        let objMessage = gestionnaireWebSocket._traiteMessage(mesg.data);
                        if (objMessage == null) return;
                        _dib84 = JSON.stringify(objMessage.data)
                    }
                    ouvrier.envoieMessageAuDocument({
                        message: "dw-message",
                        id: msg.id,
                        reponse: "messageRecu",
                        data: _dib84
                    });
                }
            };
            let promesseOuvertureWebSocket = new Promise((resolution) => {
                unPortConnexionWS.onopen = async () => {
                    if (global.infoConnecteur.manifest == 3 && global.estAntidoteWebPourDWeb() && global.infoDW.devDWeb != "dweb_docker") {
                        if (global.infoDW.cookieAWebValue !== undefined) {
                            unPortConnexionWS.send(global.infoDW.cookieAWebValue);
                        } else {
                            unPortConnexionWS.send("nul");
                        }
                    }
                    resolution(true);
                };
                unPortConnexionWS.onclose = (evt) => {
                    delete this.mesConnexions[msg.id];
                    ouvrier.envoieMessageAuDocument({
                        message: "dw-comm",
                        id: msg.id,
                        requete: "nettoie",
                        reponse: ""
                    });
                    let typeDeconnexion = "erreur";
                    if (!evt.wasClean) {
                        gestionnaireErreur.traiteErreur({
                            date: new Date().toString(),
                            message_perdu: msg,
                            message_log: "connexion websocket perdue",
                            ws: adresseDW
                        });
                        typeDeconnexion = "erreur";
                    } else {
                        typeDeconnexion = "expiray";
                    }
                    ouvrier.envoieMessageAuDocument({
                        message: "dw-comm",
                        id: msg.id,
                        reponse: "etatConnexion",
                        connectay: false,
                        type: typeDeconnexion
                    });
                    resolution(false);
                };
                unPortConnexionWS.onerror = (evt) => {
                    console.error("errorwebsocket ", evt);
                };
            });
            let connectay = await promesseOuvertureWebSocket;
            if (connectay) {
                let clicorrsi = new BackgroundCliCorrSi(msg.id);
                await clicorrsi.init(msg);
                this.mesConnexions[msg.id] = {
                    port: unPortConnexionWS,
                    ouvrierId: msg._id,
                    essai: 0,
                    clicorrsi: clicorrsi
                };
                if (msg.requete == "initialise_communication") {
                    ouvrier.envoieMessageAuDocument({
                        message: "dw-comm",
                        id: msg.id,
                        reponse: "etatConnexion",
                        connectay: connectay
                    });
                } else {
                    gestionnaireDW.envoieMessageDW(msg);
                }
            }
        } else {
            if (msg.requete == "initialise_communication") {
                console.error("ECHEC CONNEXION DW");
                global.metsDonnees({
                    infoDW: {
                        estConnectay: false
                    }
                });
                ouvrier.envoieMessageAuDocument({
                    message: "dw-comm",
                    id: msg.id,
                    reponse: "etatConnexion",
                    connectay: false
                });
            }
        }
    },
    envoieMessageDW: async function(msg) {
        if (global.estAntidoteWebPourDWeb() && !global.estCEActive()) {
            let ouvrier = new ObjetOuvrier();
            await ouvrier.recupere(msg.id);
            ouvrier.envoieMessageAuDocument({
                message: "metsAjourEtatDWeb",
                _dib29: false
            });
            return;
        }
        if (this.mesConnexions[msg.id] !== undefined && this.mesConnexions[msg.id].port && this.mesConnexions[msg.id].port !== undefined && this.mesConnexions[msg.id].port.readyState == this.mesConnexions[msg.id].port.OPEN) {
            if (global.estAntidoteWebPourDWeb()) {
                this.mesConnexions[msg.id].port.send(msg.action);
            } else {
                var requete = {
                    message: "actionEncapsuleeCS",
                    _dib105: "correcteurSimple",
                    _dib81: msg.id,
                    uuidDestinataire: "serveurCS",
                    action: msg.action
                };
                var uneChaine = JSON.stringify(requete);
                this.mesConnexions[msg.id].port.send(uneChaine);
            }
        } else {
            gestionnaireDW.etablisConnexionDW(msg);
        }
    },
    traiteMessage: async function(msg) {
        if (msg.requete == "initialise_communication") {
            gestionnaireDW.etablisConnexionDW(msg);
        } else if (msg.requete == "envoie") {
            gestionnaireDW.envoieMessageDW(msg);
        } else if (msg.requete == "ferme") {
            if (!global.estAntidoteWebPourDWeb()) {
                var requete = {
                    message: "suppressionCS",
                    _dib105: "correcteurSimple",
                    _dib81: msg.id,
                    uuidDestinataire: "serveurCS"
                };
                var uneChaine = JSON.stringify(requete);
                if (this.mesConnexions[msg.id] !== undefined && this.mesConnexions[msg.id].port) {
                    this.mesConnexions[msg.id].port.send(uneChaine);
                }
            }
            if (this.mesConnexions[msg.id] !== undefined) {
                if (this.mesConnexions[msg.id] !== undefined && this.mesConnexions[msg.id].port) {
                    this.mesConnexions[msg.id].port.close(1000, "ferme");
                }
            }
        } else if (msg.requete == "reconnecte") {
            if (this.mesConnexions[msg.id] !== undefined && this.mesConnexions[msg.id].port) {
                this.mesConnexions[msg.id].port.close(1000, "reconnecte");
            }
        } else if (msg.requete == "metsAJourZoneIgnoree") {
            let ouvrier = new ObjetOuvrier();
            await ouvrier.recupere(global.idOngletActif);
            ouvrier.metsDonnees({
                infoDW: {
                    aZoneIgnoree: msg.aZoneIgnoree
                }
            });
        } else if (msg.requete == "metsAJourActivation") {
            let ouvrier = new ObjetOuvrier();
            await ouvrier.recupere(global.idOngletActif);
            global.metsDonnees({
                infoDW: {
                    estActivay: msg.activationDW
                }
            });
        } else if (msg.requete == "metsAJourChampActif") {
            let ouvrier = new ObjetOuvrier();
            await ouvrier.recupere(global.idOngletActif);
            ouvrier.metsDonnees({
                infoDW: {
                    champ: {
                        id: msg.idActif,
                        actif: msg.actif
                    }
                }
            });
        } else if (msg.requete == "donnerInfobulleComplete") {
            let ouvrier = new ObjetOuvrier();
            await ouvrier.recupere(global.idOngletActif);
            let data = {
                idPhrase: msg.idPhrase,
                idDetections: msg.idDetection,
                detectionsIgnorees: msg.detectionsIgnorees,
                texte: msg._dib30
            };
            if (false && global.estAntidoteWebPourDWeb()) {
                let headersGet = {
                    'Content-Type': 'application/json'
                };
                fetch(global.infoDW.adresseDWeb + "infosUtilisateurSelonParams?typeDonnees=7", {
                    method: 'GET',
                    headers: headersGet
                }).then(async (infos) => {
                    if (infos.status == 200) {
                        let reponseInfos = await infos.json();
                        let headers = {
                            'Content-Type': 'application/json',
                            'Version-Donnees': reponseInfos.version,
                            'Version-Commune': reponseInfos.version
                        };
                        const requete = new Request(global.infoDW.adresseDWeb + "correcteur/reformulerJson", {
                            method: 'POST',
                            headers,
                            body: JSON.stringify(data)
                        });
                        let uneInfoReformulation = await fetch(requete);
                        msg.donneesReformulations = await uneInfoReformulation.json();
                        msg.reponse = msg.requete;
                        delete msg.requete;
                        ouvrier.envoieMessageAuDocument(msg);
                    }
                });
            } else {
                data.message = msg.requete;
                msg.action = JSON.stringify(data);
                gestionnaireDW.envoieMessageDW(msg);
            }
        }
    },
    estURLAutorisay: function(leURL) {
        try {
            if (estThunderbird()) return;
            if (leURL == "")
                return false;
            let url = new URL(leURL);
            let domaine = url.hostname;
            for (let u of global.infoDW.listeExclusion) {
                let lu = new URL(u);
                if (lu.hostname == domaine) {
                    return false;
                }
            }
            return true;
        } catch (erreur) {
            console.error("background.gestionnaireDW.estURLAutorisayDW ", erreur, leURL);
            gestionnaireErreur.traiteErreur({
                date: new Date().toString(),
                message_log: "background.gestionnaireDW.estURLAutorisayDW.erreur",
                erreur: erreur,
                url: leURL
            });
            return false;
        }
    },
    estURLAntiOupsAutorisay: function(leURL) {
        try {
            if (estThunderbird()) return false;
            if (leURL == "")
                return false;
            let url = new URL(leURL);
            let domaine = url.hostname;
            for (let u of global.infoDW.listeAntiOups) {
                if (u == domaine) {
                    return true;
                }
            }
            return false;
        } catch (erreur) {
            console.error("background.gestionnaireDW.estURLAntiOupsAutorisay ", erreur, leURL);
            gestionnaireErreur.traiteErreur({
                date: new Date().toString(),
                message_log: "background.gestionnaireDW.estURLAntiOupsAutorisay.erreur",
                erreur: erreur,
                url: leURL
            });
            return false;
        }
    }
}
let gestionnairePort = {
    portFromCS: null,
    portNomId: null,
    assocIdDocumentEtIdPort: null,
    init: function() {
        gestionnairePort.portFromCS = new Map();
        gestionnairePort.portNomId = new Map();
        gestionnairePort.assocIdDocumentEtIdPort = new Map();
    },
    ajoutePort: async function(lePort) {
        gestionnairePort.portFromCS.set(lePort.name, lePort);
        if (lePort.sender.tab) {
            let listeDePorts = gestionnairePort.portNomId.get(lePort.sender.tab.id);
            if (listeDePorts === undefined)
                listeDePorts = [];
            if (listeDePorts.indexOf(lePort.name) < 0)
                listeDePorts.push(lePort.name);
            gestionnairePort.portNomId.set(lePort.sender.tab.id, listeDePorts);
        }
    },
    detruisPort: function(lePort) {
        gestionnairePort.portFromCS.delete(lePort.name);
        if (lePort.sender.tab && lePort.name.indexOf("aw-services") < 0) {
            let unIdOnglet = lePort.sender.tab.id;
            var listeDePorts = gestionnairePort.portNomId.get(unIdOnglet);
            if (listeDePorts !== undefined) {
                var index = listeDePorts.indexOf(lePort.name);
                if (index >= 0)
                    listeDePorts.splice(index, 1);
                if (listeDePorts.length > 0)
                    gestionnairePort.portNomId.set(unIdOnglet, listeDePorts);
                else
                    gestionnairePort.portNomId.delete(unIdOnglet);
            }
        }
    },
    donnePortSelonId: function(leId, appelayParPopup) {
        if (appelayParPopup === undefined) appelayParPopup = true;
        var listeDePorts = gestionnairePort.portNomId.get(leId);
        if (listeDePorts !== undefined && listeDePorts.length > 0) {
            if (appelayParPopup) {
                for (let port of listeDePorts) {
                    if (port.indexOf("si-comm") >= 0) {
                        return gestionnairePort.portFromCS.get(port);
                    }
                }
                return gestionnairePort.portFromCS.get(listeDePorts[0]);
            } else return gestionnairePort.portFromCS.get(listeDePorts[listeDePorts.length - 1]);
        }
        return undefined;
    },
    associeIdDocumentAIdPort: function(leIdDocument, idPort) {
        if (leIdDocument !== undefined && leIdDocument != null)
            gestionnairePort.assocIdDocumentEtIdPort.set(leIdDocument, idPort);
    },
    supprimeAssociationIdDocument: function(leIdDocument) {
        if (gestionnairePort.possedeAssociationAvecIdDocument(leIdDocument))
            gestionnairePort.assocIdDocumentEtIdPort.delete(leIdDocument);
    },
    possedeAssociationAvecIdDocument: function(leIdDocument) {
        return leIdDocument !== undefined && leIdDocument != null ? gestionnairePort.assocIdDocumentEtIdPort.has(leIdDocument) : false;
    },
    convertisIdDocumentEnIdPort: function(leIdDocument) {
        if (leIdDocument == "") return global.idOngletActif;
        return gestionnairePort.possedeAssociationAvecIdDocument(leIdDocument) ? gestionnairePort.assocIdDocumentEtIdPort.get(leIdDocument) : leIdDocument;
    },
    donnePortSelonNom: function(leNom) {
        return gestionnairePort.portFromCS.get(leNom);
    },
    envoieMessage: async function(msg, leId, ouvrier) {
        if (leId != -1) {
            let estpopup = ouvrier.appelayPar == "popup";
            let unPort = gestionnairePort.donnePortSelonId(leId, estpopup);
            if (unPort !== undefined) {
                if ((msg.message == "afficheDialogueOuiNon" || msg.message == "_dib41") && unPort.name.indexOf("gdoc-comm") >= 0) {
                    let unNomOngletFrere = "si-comm" + separateurElement + unPort.name.split(separateurElement)[1];
                    unPort = gestionnairePort.donnePortSelonNom(unNomOngletFrere);
                }
                msg.disponibleCE = global.estCEDisponible();
                msg.activationDW = global.infoDW.estActivay && global.estCEActive() && gestionnaireDW.estURLAutorisay(unPort.sender.url) && !ouvrier.estOffice365Online && !ouvrier.estIncompatibleAvecDW;
                msg.activationAntiOups = gestionnaireDW.estURLAntiOupsAutorisay(unPort.sender.url);
                msg.donnees_globales = global;
                msg.donnees_globales.idTexteur = monIdTexteur;
                if (estThunderbird()) {
                    msg.donnees_globales.reglages = gestionnaireAntiOupsThunderbird.mesReglagesAntiOups;
                }
                msg.position_x = -1;
                unPort.postMessage(msg);
            } else {
                gestionnaireErreur.traiteErreur({
                    date: new Date().toString(),
                    onglet_id: leId,
                    les_ports: gestionnairePort.portNomId,
                    message_log: "port communication onglet perdu",
                });
                fureteur.tabs.connect(leId, {
                    name: "reconnexion-onglet"
                });
            }
        }
    }
}
gestionnairePort.init();

function infoElementMenuAntidote(leNiveau, estDsMenu, leNom, leNomLong, leTooltips, laCategorie, estPopup, laCommandeListe, laCommande) {
    var estDsMenuBool = false;
    var estPopupBool = false;
    if (estDsMenu == cstAntidoteOui)
        estDsMenuBool = true;
    if (estPopup == cstAntidoteOui)
        estPopupBool = true;
    this.monNiveau = leNiveau;
    this.jeSuisDsMenu = estDsMenuBool;
    this.monNom = leNom;
    this.monNomLong = leNomLong;
    this.monTooltips = leTooltips;
    this.maCategorie = laCategorie;
    this.jeSuisPopup = estPopupBool;
    this.maCommandeListe = laCommandeListe;
    this.maCommande = laCommande;
};

function referenceObjetMenu(param) {
    this.value = param;
};
let gestionnaireMenu = {
    mesElementsMenu: null,
    etatMenu: {
        "C0": false,
        "D0": false,
        "G0": false,
        "D1": false
    },
    init() {
        gestionnaireMenu.mesElementsMenu = new Object();
    },
    installeMenu() {
        if (global.estModeiOS) return;
        gestionnaireMenu.donneConfigurationParDefaut();
    },
    async action(info, tab) {
        global.metsDonnees({
            idOngletActif: tab.id
        });
        lanceOutil(info.menuItemId, tab.id);
    },
    creeMenu(_dib84) {
        if (global.estModeiOS) return;
        if (!this.etatMenu[_dib84.id]) {
            if (!estSafariWebex() && !estThunderbird()) {
                fureteur.contextMenus.create(_dib84, () => {
                    fureteur.runtime.lastError;
                });
            } else {
                fureteur.menus.create(_dib84, () => {
                    fureteur.runtime.lastError;
                });
            }
            this.etatMenu[_dib84.id] = true;
        } else {
            let unId = _dib84.id;
            delete _dib84.id;
            if (!estSafariWebex() && !estThunderbird()) {
                fureteur.contextMenus.update(unId, _dib84);
            } else {
                fureteur.menus.update(unId, _dib84);
            }
        }
    },
    async cacheMenu() {
        if (global.estModeiOS) return;
        this.etatMenu = {
            "C0": false,
            "D0": false,
            "G0": false,
            "D1": false
        };
        if (!estSafariWebex() && !estThunderbird()) {
            fureteur.contextMenus.removeAll();
        } else {
            return fureteur.menus.removeAll();
        }
    },
    async afficheMenu() {
        if (global.estModeiOS) return;
        await verifieActivation();
        gestionnaireMenu.ajouteElementsMenuAntidote();
    },
    ajouteElementMenu(nom, paramCommand) {
        let estActif = true;
        if (global.estAntidoteWeb()) {
            if (!global.estAWebConnectay) {
                estActif = false;
            }
        }
        gestionnaireMenu.creeMenu({
            "id": paramCommand,
            "title": nom,
            "type": "normal",
            "contexts": ["all"],
            "enabled": estActif
        });
    },
    ajouteElementsMenuAntidote() {
        if (global.estModeiOS) return;
        let element = null;
        let titreSupp = "";
        if (global.estAntidoteWeb()) {
            titreSupp = " (Antidote Web)";
            if (!global.estAWebConnectay) {
                element = gestionnaireMenu.mesElementsMenu[chaineCommandeD0];
                gestionnaireMenu.creeMenu({
                    "id": "D1",
                    "title": gestionTraduction.Tr_(cstDWAWebNonConnectay, "") + " Antidote Web",
                    "type": "normal",
                    "contexts": ["all"],
                    visible: true
                });
            } else {
                if (this.etatMenu.D1) gestionnaireMenu.creeMenu({
                    "id": "D1",
                    visible: false
                });
            }
        } else {
            if (this.etatMenu.D1) gestionnaireMenu.creeMenu({
                "id": "D1",
                visible: false
            });
        }
        if (global.choixMenuContextuel == "mc_regroupay" || global.choixMenuContextuel == "mc_correcteur") {
            element = gestionnaireMenu.mesElementsMenu[chaineCommandeC0];
            gestionnaireMenu.ajouteElementMenu(element.monNom + titreSupp, element.maCommande);
        }
        if (global.choixMenuContextuel == "mc_regroupay" || global.choixMenuContextuel == "mc_dictionnaires") {
            element = gestionnaireMenu.mesElementsMenu[chaineCommandeD0];
            gestionnaireMenu.ajouteElementMenu(element.monNom + titreSupp, element.maCommande);
        }
        if (global.choixMenuContextuel == "mc_regroupay" || global.choixMenuContextuel == "mc_guides") {
            element = gestionnaireMenu.mesElementsMenu[chaineCommandeG0];
            gestionnaireMenu.ajouteElementMenu(element.monNom + titreSupp, element.maCommande);
        }
        if (!estSafariWebex() && !estThunderbird()) {
            if (!fureteur.contextMenus.onClicked.hasListener(gestionnaireMenu.action))
                fureteur.contextMenus.onClicked.addListener(gestionnaireMenu.action);
        } else {
            if (!fureteur.menus.onClicked.hasListener(gestionnaireMenu.action))
                fureteur.menus.onClicked.addListener(gestionnaireMenu.action);
        }
    },
    ajouteElementMenuAntidoteDsListe(laLigne) {
        var uneLigne = new referenceObjetMenu(laLigne);
        let niveau = parseInt(gestionnaireMenu.donneProchainJeton(uneLigne, cstSeparateurDsFichierConfigMenu));
        let estDsMenu = gestionnaireMenu.donneProchainJeton(uneLigne, cstSeparateurDsFichierConfigMenu);
        let nom = gestionnaireMenu.donneProchainJeton(uneLigne, cstSeparateurDsFichierConfigMenu);
        let nomLong = gestionnaireMenu.donneProchainJeton(uneLigne, cstSeparateurDsFichierConfigMenu);
        let tooltips = gestionnaireMenu.donneProchainJeton(uneLigne, cstSeparateurDsFichierConfigMenu);
        let categorie = gestionnaireMenu.donneProchainJeton(uneLigne, cstSeparateurDsFichierConfigMenu);
        let estPopup = gestionnaireMenu.donneProchainJeton(uneLigne, cstSeparateurDsFichierConfigMenu);
        let commandeListe = gestionnaireMenu.donneProchainJeton(uneLigne, cstSeparateurDsFichierConfigMenu);
        let commande = gestionnaireMenu.donneProchainJeton(uneLigne, cstSeparateurDsFichierConfigMenu);
        if (nom == cstCategorieCorrecteur)
            categorie = cstCategorieCorrecteur;
        if (nom == cstCategorieDictionnaires)
            categorie = cstCategorieDictionnaires;
        if (nom == cstCategorieGuides)
            categorie = cstCategorieGuides;
        let unElement = new infoElementMenuAntidote(niveau, estDsMenu, nom, nomLong, tooltips, categorie, estPopup, commandeListe, commande);
        gestionnaireMenu.mesElementsMenu[commande] = unElement;
        uneLigne = null;
    },
    donneConfigurationParDefaut() {
        for (var idx in configMenuDefaut[gestionTraduction.maLangueString]) {
            gestionnaireMenu.ajouteElementMenuAntidoteDsListe(configMenuDefaut[gestionTraduction.maLangueString][idx]);
        }
    },
    donneProchainJeton(laLigne, leSeparateur) {
        var jeton = "";
        var pos = laLigne.value.indexOf(leSeparateur);
        if (pos >= 0) {
            jeton = laLigne.value.substr(0, pos);
            var lgRestant = laLigne.value.length - (pos + 1);
            laLigne.value = laLigne.value.substr(pos + 1, lgRestant);
        }
        return jeton;
    }
};
gestionnaireMenu.init();
let gestionnaireBouton = {
    metsTitre(leTitre) {
        if (global.infoConnecteur.manifest == 3) {
            fureteur.action.setTitle({
                title: leTitre
            });
        } else {
            fureteur.browserAction.setTitle({
                title: leTitre
            });
        }
    },
    metsCouleur(laCouleur) {
        if (global.infoConnecteur.manifest == 3) {
            fureteur.action.setBadgeBackgroundColor({
                color: laCouleur
            });
        } else {
            fureteur.browserAction.setBadgeBackgroundColor({
                color: laCouleur
            });
        }
    },
    metsTexteCouleur(laCouleur) {
        if (global.infoConnecteur.manifest == 3) {
            fureteur.action.setBadgeTextColor({
                color: laCouleur
            });
        } else {
            estMozillaWebExtension() && fureteur.browserAction.setBadgeTextColor({
                color: laCouleur
            });
        }
    },
    metsTexte(leTexte) {
        if (global.infoConnecteur.manifest == 3) {
            fureteur.action.setBadgeText({
                text: leTexte
            });
        } else {
            fureteur.browserAction.setBadgeText({
                text: leTexte
            });
        }
    }
};

function ajouteEcouteurs() {
    fureteur.windows.onFocusChanged.addListener(gestionnaireFenetre);
    fureteur.tabs.onActivated.addListener(gestionnaireOngletActivation);
    fureteur.tabs.onCreated.addListener(gestionnaireOngletCreation);
    fureteur.tabs.onUpdated.addListener(gestionnaireOngletMAJ);
    fureteur.tabs.onRemoved.addListener(gestionnaireOngletFermeture);
    fureteur.runtime.onConnect.addListener(async function(port) {
        if (!globalEstChargeay) {
            await global.recupere();
        }
        gestionnairePort.ajoutePort(port);
        if (port.name.indexOf("si-comm") >= 0) {
            port.gestionnaireMessagesDesScripts = new GestionnaireMessageDesScripts(port.name);
            port.onMessage.addListener((msg) => port.gestionnaireMessagesDesScripts.recoisMessage(msg));
        } else if (port.name.indexOf("si-office") >= 0) {
            port.gestionnaireMessagesDesScriptsOffice = new GestionnaireMessageDesScriptsOffice(port.name)
            port.onMessage.addListener((msg) => port.gestionnaireMessagesDesScriptsOffice.recoisMessage(msg));
        } else if (port.name.indexOf("si-temp") >= 0) {
            port.onMessage.addListener(gestionnaireMessageDesScriptsTemp);
        } else if (port.name.indexOf("aw-comm") >= 0) {
            port.gestionnaireAWeb = new GestionnaireMessageDAWeb(port.name);
            port.onMessage.addListener((msg) => {
                port.gestionnaireAWeb.recoisMessage(msg)
            });
        } else if (port.name.indexOf("aw-services") >= 0) {
            port.gestionnaireDesServices = new GestionnaireMessageDesServices(port.name);
            port.onMessage.addListener((msg) => {
                port.gestionnaireDesServices.recoisMessage(msg)
            });
        } else if (port.name == "antidote-popup") {
            port.onMessage.addListener(gestionnaireMessageDuPopup);
        } else if (port.name == "antidote-log") {
            port.onMessage.addListener(gestionnaireMessageLog);
        } else if (port.name == "antidote-reglages") {
            port.onMessage.addListener(gestionnaireMessageDesReglages);
        } else if (port.name == "antidote-installation") {
            port.onMessage.addListener(gestionnaireMessagePageInstallation);
        } else if (port.name == "antidote-miseajour") {
            port.onMessage.addListener(gestionnaireMessagePageMiseAjour);
        } else if (port.name.indexOf("services-druide") >= 0) {
            port.onMessage.addListener(gestionnaireMessagePageServices);
        } else if (port.name.indexOf("antidote-dialogue") >= 0) {
            port.gestionnaireMessageDialogue = new GestionnaireMessageDialogue();
            port.onMessage.addListener((msg) => port.gestionnaireMessageDialogue.recoisMessage(msg));
        } else if (port.name == "billetix") {
            port.onMessage.addListener(gestionnaireMessageBilletix);
        }
        port.onDisconnect.addListener(function(m) {
            gestionnairePort.detruisPort(m);
        });
        port.postMessage({
            message: "_dib01",
            ouvrePageConnexion: global.ouvrePageConnexion,
            beta_a12: global.beta_a12,
            donnees_globales: global,
            estAWeb: global.estAntidoteWeb()
        });
    });
}
if (estGoogleChrome()) {
    fureteur.runtime.onConnectExternal.addListener(async function(port) {
        let ouvrier = new ObjetOuvrier();
        await ouvrier.recupere(global.idOngletActif);
        let unNomPort = "gdoc-comm" + separateurElement + ouvrier.nomOnglet.split(separateurElement)[1];
        port.name = (unNomPort !== undefined && unNomPort != "") ? unNomPort : "page_inconnue";
        ouvrier.metsDonnees({
            nomOnglet: port.name,
            infoGDoc: {
                estGoogleDoc: true
            }
        });
        gestionnairePort.ajoutePort(port);
        port.gestionnaireMessageDesScriptsGoogleDoc = new GestionnaireMessageDesScriptsGoogleDoc(port);
        port.onMessage.addListener((msg) => port.gestionnaireMessageDesScriptsGoogleDoc.recoisMessage(msg));
        port.postMessage({
            message: "init",
            versionPontGDoc: maVersionPontGDoc,
            _dib104: global.idAntidote,
            estChromeOS: global.estChromeOS
        });
        port.onDisconnect.addListener(async function(m) {
            gestionnairePort.detruisPort(m);
            let ouvrier = new ObjetOuvrier();
            await ouvrier.recupere(m.sender.tab.id);
            ouvrier.metsDonnees({
                infoGDoc: {
                    estGoogleDoc: false
                }
            });
            gestionnaireBouton.metsTexte(cstBadgeAvertissement);
            gestionnaireBouton.metsTexteCouleur("white");
            gestionnaireBouton.metsCouleur("red");
        });
    });
}
fureteur.runtime.onInstalled.addListener(async function(details) {
    identifiant_operation_initialisation = uuidv4();
    let plateformeInfo = await fureteur.runtime.getPlatformInfo();
    if (plateformeInfo.os != "ios") {
        if (details.reason == "install") {
            async function estIlVisible() {
                let estDansToolbar = false;
                if (fureteur.runtime.getManifest().manifest_version == 3) {
                    let desReglages = await fureteur.action.getUserSettings();
                    estDansToolbar = desReglages.isOnToolbar;
                }
                if (estDansToolbar == false) {
                    fureteur.tabs.create({
                        url: donneUrlFichier("panneau/installation.html")
                    });
                }
            }
        } else if (details.reason == "update") {}
    }
    const versionsConnecteursErronees = ["11.4.1017", "11.4.1027", "11.4.1037", "11.4.1047", "11.4.1067", "11.5.1797"];
    if (details.reason == "update" && versionsConnecteursErronees.indexOf(details.previousVersion) >= 0) {
        global.reinit();
    }
});
if (!estThunderbird()) {
    if (fureteur.runtime.getManifest().manifest_version == 3) {
        fureteur.runtime.onMessage.addListener((message, sender, sendResponse) => {
            if (message.type === 'inboxsdk__injectPageWorld' && sender.tab) {
                if (fureteur.scripting) {
                    fureteur.scripting.executeScript({
                        target: {
                            tabId: sender.tab.id,
                            frameIds: [sender.frameId]
                        },
                        world: 'MAIN',
                        files: ['src/tierces_parties/pageWorld.js'],
                    });
                    sendResponse(true);
                } else {
                    sendResponse(false);
                }
            }
        });
    }
}
gestionTraduction.initAvecConstante(cstDict);
let uneLangue = fureteur.i18n.getUILanguage();
gestionTraduction.metsLaLangue(uneLangue);
async function initialisation(event) {
    await global.recupere();
    global.metsDonnees({
        estModeSolo: false,
        recuperation: [{
            id: donneUrlFichier(""),
            timeStamp: new Date(),
            origine: "initialisation",
            activationDW: global.infoDW.estActivay
        }]
    });
    if (estMozillaWebExtension() && !aFichierDetecteurWeb()) {
        global.metsDonnees({
            infoDW: {
                estConnectay: false,
                estActivay: false,
                dWebDevoilee: false
            }
        });
    }
    global.metsDonnees({
        infoDW: {
            estConnectay: false,
            estVerifiayAWeb: false
        }
    });
    donneInfoExtension();
    gestionnaireErreur.init();
    gestionnaireLogDW.init();
    let plateformeInfo = await fureteur.runtime.getPlatformInfo();
    global.metsDonnees({
        plateforme: plateformeInfo.os,
        infoConnecteur: {
            plateforme: plateformeInfo.os
        }
    });
    let monIdTexteurPourAgentConsole = cstMonFureteur;
    if (plateformeInfo.os == "cros") {
        global.metsDonnees({
            idAntidote: cstIdAntidoteWebSolo,
            estChromeOS: true,
            estModeSolo: true,
            infoDW: {
                antidoteLocalCompatible: false
            }
        });
    } else {
        if (estGoogleChrome()) {
            let unNavInfo = self.navigator.userAgentData.brands;
            let trouvay = false;
            for (let data of unNavInfo) {
                if (data.brand == "Google Chrome") {
                    monIdTexteur = cstMonFureteur;
                    trouvay = true;
                } else if (data.brand == "Opera") {
                    monIdTexteur = "AntidoteOpera";
                    monIdTexteurPourAgentConsole = monIdTexteur;
                    trouvay = true;
                } else if (data.brand == "Vivaldi") {
                    monIdTexteur = "AntidoteVivaldi";
                    monIdTexteurPourAgentConsole = "AntidoteChromium";
                    trouvay = true;
                } else if (data.brand == "Microsoft Edge") {
                    monIdTexteur = "AntidoteEdge";
                    monIdTexteurPourAgentConsole = monIdTexteur;
                    trouvay = true;
                } else if (data.brand == "Brave") {
                    monIdTexteur = "AntidoteBrave";
                    monIdTexteurPourAgentConsole = "AntidoteChromium";
                    trouvay = true;
                }
            }
            if (!trouvay) {
                monIdTexteur = "AntidoteChromium";
                monIdTexteurPourAgentConsole = monIdTexteur;
            }
        }
        gestionnaireConnexionNative.monNomAgentConsole = cstNomAgentAntidote + "." + monIdTexteurPourAgentConsole.toLowerCase();
        gestionnaireConnexionNative.init();
    }
    gestionnaireInjection.recupereListeFichiers();
    gestionnaireMenu.installeMenu();
    fureteur.storage.onChanged.addListener(function(changes, area) {
        if (changes !== undefined) {
            if (changes.objetOuvriers !== undefined && changes.objetOuvriers.newValue !== undefined) {} else if (changes.objetGlobal !== undefined && changes.objetGlobal.newValue !== undefined) {
                global.metsAjour(changes.objetGlobal.newValue);
            }
        }
    });
    ajouteEcouteurs();
    await verifieActivation();
}
let global = new ObjetGlobal();
let connexions = {};
self.addEventListener('activate', async event => {});
self.addEventListener('install', async event => {
    await fureteur.storage.local.remove("objetOuvriers");
});
self.addEventListener('load', async event => {
    await fureteur.storage.local.remove("objetOuvriers");
});
let gPromesseReglage = new Promise(resolution => {
    self.addEventListener('reglages_nm_recu', function(ev) {
        resolution(true);
    })
});
let gPromesseStorageConfirmation = new Promise(resolution => {
    self.addEventListener('confirmation-storage', function(e) {
        resolution(true);
    })
});
initialisation({
    type: ""
});