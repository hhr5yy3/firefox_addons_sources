 /* 
 *	Ce document est la propriété intellectuelle de Druide informatique inc. Toute reproduction ou publication est interdite. 
 *  Copyright 2022 Druide informatique inc. 
 */
 kDetectionFautes = 1 << 0;
kDetectionErreursDeTypo = 1 << 1;
kDetectionPiecesJointes = 1 << 2;
kDetectionLangueInactive = 1 << 3;
kDetectionTonVexant = 1 << 4;
class CommunicationAntiOups {
    #identifiant
    constructor(id) {
        this.#identifiant = id;
    }
    get identifiant() {
        return this.#identifiant;
    }
    desinitialiseCourriel() {}
    enregistreCourriel(corpCourriel) {}
    analyseEnvoi(objCourriel, analyseRapide) {}
    static donneObjetCourriel(identifiant, leCorps, nombrePiecesJointes, destinataires) {
        return {
            id: identifiant,
            corps: leCorps,
            nbPJ: nombrePiecesJointes,
            destinataires: destinataires,
        }
    }
    inhibeDestinataire(reglages, listeDestinataire) {
        if (reglages.exclureDestinataires) {
            return listeDestinataire.some(destinataire => reglages.destinatairesExclus.includes(decodeChaineDeJson(destinataire)));
        }
        return false;
    }
}
class CommunicationAntiOupsConnectix extends CommunicationAntiOups {
    #communicationWebSocket;
    #monAbortController;
    #maReponse;
    #communiqueAvecA12;
    constructor(id, portWs) {
        super(id);
        let adresseWebSocket = "ws://127.0.0.1:" + portWs;
        this.#communiqueAvecA12 = false;
        this.#communicationWebSocket = new WebSocket(adresseWebSocket);
        this.#communicationWebSocket.onmessage = msgJson => {
            let msg = JSON.parse(msgJson.data);
            if (msg.message == "ReponseSorteIntervention") {
                this.#communiqueAvecA12 = serviceClientAntiOupsNavigateursA12.donneResultatAPartirDeReponse(msg) !== undefined;
                this.ObtientReponse(msg);
            }
        }
    }
    attendReponse(requete) {
        return new Promise(async (complete) => {
            let identifiantMessage = uuidv4();
            requete.identifiantMessage = identifiantMessage;
            let messageAEnvoyer = JSON.stringify(requete);
            this.#monAbortController = new AbortController();
            this.#monAbortController.signal.addEventListener("abort", () => {
                let reponse = this.#maReponse;
                complete(reponse);
            })
            this.#communicationWebSocket.send(messageAEnvoyer);
        });
    }
    ObtientReponse(reponse) {
        this.#maReponse = reponse;
        this.#monAbortController.abort();
    }
    desinitialiseCourriel() {}
    enregistreCourriel(corpsCourriel) {
        let objMessage = {
            message: "EnregistreCourriel",
            _dib30: this.#communiqueAvecA12 ? encodeChainePourJson("\f" + corpsCourriel) : encodeChainePourJson(corpsCourriel),
            _dib105: cstTypeMessageReponse,
            _dib81: encodeChainePourJson(this.identifiant),
            _dib82: encodeChainePourJson(this.identifiant)
        }
        return objMessage;
    }
    analyseEnvoi(objCourriel, analyseRapide) {
        let objMessage = {
            message: "DonneSorteIntervention",
            _dib81: encodeChainePourJson(this.identifiant + "_" + objCourriel.id),
            _dib82: encodeChainePourJson(this.identifiant + "_" + objCourriel.id),
            _dib79: encodeChainePourJson(this.identifiant + "_" + objCourriel.id),
            _dib105: cstTypeMessageRequeteAntiOups,
            _dib80: 1,
            _dib104: cstIdAntidoteBureau,
            encoday: true,
            texteCourriel: objCourriel.corps,
            nbPJ: objCourriel.nbPJ,
            destinataires: objCourriel.destinataires,
            nepascorriger: analyseRapide,
            fermeFenetreSiAucuneIntervention: true,
        };
        return this.attendReponse(objMessage);
    }
}
class CommunicationAntiOupsAweb extends CommunicationAntiOups {
    #urlAWeb;
    #monAncienContenuCourriel;
    constructor(id, urlAWeb, jeton) {
        super(id);
        this.#urlAWeb = urlAWeb;
        this.#monAncienContenuCourriel = undefined;
    }
    desinitialiseCourriel() {}
    static donneReglagesAntiOupsVide() {
        var reglagesDeBase = {};
        reglagesDeBase.correctionAutomatique = true;
        reglagesDeBase.detectionPiecesManquantes = true;
        reglagesDeBase.detectionTonVexant = true;
        reglagesDeBase.exclureDestinataires = false;
        reglagesDeBase.texteRepris = true;
        reglagesDeBase.destinatairesExclus = [];
        return reglagesDeBase;
    }
    static async donneReglagesAntiOupsAWeb(urlAWeb, reglagesDeBase) {
        let headersGet = {
            'Content-Type': 'application/json'
        };
        let infos = await fetch(urlAWeb + "infosUtilisateurSelonParams?typeDonnees=1", {
            method: 'GET',
            headers: headersGet
        });
        if (infos.status == 200) {
            var lesReglagesAWeb = await infos.json();
            reglagesDeBase.correctionAutomatique = lesReglagesAWeb.reglages["antiOups.correctionAutomatique"] != undefined ? lesReglagesAWeb.reglages["antiOups.correctionAutomatique"] : true;
            reglagesDeBase.detectionPiecesManquantes = lesReglagesAWeb.reglages["antiOups.detectionPiecesJointes"] != undefined ? lesReglagesAWeb.reglages["antiOups.detectionPiecesJointes"] : true;
            reglagesDeBase.detectionTonVexant = lesReglagesAWeb.reglages["antiOups.detectionTonVexant"] != undefined ? lesReglagesAWeb.reglages["antiOups.detectionTonVexant"] : true;
            reglagesDeBase.exclureDestinataires = lesReglagesAWeb.reglages["antiOups.exclureAdresseDestination"] != undefined ? lesReglagesAWeb.reglages["antiOups.exclureAdresseDestination"] : false;
            reglagesDeBase.texteRepris = lesReglagesAWeb.reglages["reglages.balises.exclureTexteReprisCourriel"] != undefined ? lesReglagesAWeb.reglages["reglages.balises.exclureTexteReprisCourriel"] : true;
            reglagesDeBase.destinatairesExclus = lesReglagesAWeb.reglages["antiOups.adressesAExclure"] != undefined ? lesReglagesAWeb.reglages["antiOups.adressesAExclure"] : [];
        }
        return reglagesDeBase;
    }
    enregistreCourriel(contenuCourriel) {
        this.#monAncienContenuCourriel = contenuCourriel;
    }
    async faisRequeteAntiOups(objCourriel, analyseRapide) {
        let headersGet = {
            'Content-Type': 'application/json'
        };
        let infos = await fetch(this.#urlAWeb + "infosUtilisateurSelonParams?typeDonnees=7", {
            method: 'GET',
            headers: headersGet
        });
        if (infos.status == 200) {
            let reponseInfos = await infos.json();
            let headers = {
                'Content-Type': 'application/json',
                'Version-Donnees': reponseInfos.version,
                'Version-Commune': reponseInfos.version
            };
            let unTexte = decodeChaineDeJson(objCourriel.corps._dib30);
            let mesDetectionsAFaire, mesDetectionsSuffisantesPourArreter;
            if (analyseRapide) {
                mesDetectionsAFaire = mesDetectionsSuffisantesPourArreter = kDetectionPiecesJointes;
            } else {
                mesDetectionsAFaire = kDetectionFautes | kDetectionErreursDeTypo | kDetectionPiecesJointes | kDetectionLangueInactive | kDetectionTonVexant;
                mesDetectionsSuffisantesPourArreter = kDetectionFautes;
            }
            let data = {
                texteAvecAttributs: {
                    texte: unTexte,
                    attributs: []
                },
                detectionsAFaire: mesDetectionsAFaire,
                detectionsSuffisantesPourArreter: mesDetectionsSuffisantesPourArreter
            };
            const requete = new Request(this.#urlAWeb + "correcteur/antiOups", {
                method: 'POST',
                headers,
                body: JSON.stringify(data)
            });
            let uneInfoIntervention = await fetch(requete);
            if (uneInfoIntervention.status == 200) {
                let uneInterventionOriginal = await uneInfoIntervention.json();
                return {
                    reponseAntiOups: servicesCommunicationAntiOupsWeb.convertisResultat(uneInterventionOriginal, objCourriel.nbPJ > 0)
                };
            } else if (uneInfoIntervention.status == 401) {
                return {
                    reponseAntiOups: {
                        codeErreur: "aWebInactif",
                        detections: []
                    }
                };
            } else {
                return {
                    reponseAntiOups: {
                        codeErreur: "aWebInaccessible",
                        detections: []
                    }
                };
            }
        } else if (infos.status == 401) {
            return {
                reponseAntiOups: {
                    codeErreur: "aWebInactif",
                    detections: []
                }
            };
        } else {
            return {
                reponseAntiOups: {
                    codeErreur: "aWebInaccessible",
                    detections: []
                }
            };
        }
    }
    async analyseEnvoi(objCourriel, analyseRapide) {
        var reglagesAntiOups = CommunicationAntiOupsAweb.donneReglagesAntiOupsVide();
        reglagesAntiOups = await CommunicationAntiOupsAweb.donneReglagesAntiOupsAWeb(this.#urlAWeb, reglagesAntiOups);
        if (this.inhibeDestinataire(reglagesAntiOups, objCourriel.destinataires)) return {
            reponseAntiOups: {
                codeErreur: "aucune",
                dectections: []
            }
        }
        if (analyseRapide) {
            return await this.faisRequeteAntiOups(objCourriel, analyseRapide);
        } else {
            let estPremierAppel = this.#monAncienContenuCourriel == undefined;
            let contenuDifferent = !estPremierAppel && this.#monAncienContenuCourriel != objCourriel.corps._dib30;
            this.enregistreCourriel(objCourriel.corps._dib30)
            if (estPremierAppel) {
                return await this.faisRequeteAntiOups(objCourriel, analyseRapide);
            } else if (contenuDifferent) {
                return {
                    reponseAntiOups: {
                        codeErreur: "AucuneVerificationSubsequente",
                        detections: []
                    }
                };
            } else {
                return await this.faisRequeteAntiOups(objCourriel, true);
            }
        }
    }
}