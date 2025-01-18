class BackgroundCliCorrSi {
    constructor(id){
        this.phrases = {};
        this.id = id;
        this.ouvrier = null;
        this.obj = null;
        this.ccorrs = null;
		this.timeoutMessageRecuID = [];
    }

	async gereMessgeNonRecu(){
		this.ouvrier.envoieMessageAuDocument({message:"dw-comm", requete:"erreur", cause:"Problème de communication (AgentAntidote ou Antidote Web)"});
	}

    async init(msg) {
        this.ouvrier = new ObjetOuvrier();
		if (!msg.nomOnglet) msg.nomOnglet = msg.nomOnglet !== undefined ? msg.nomOnglet : "si-comm"+separateurElement+msg._id ;
		let portReel = gestionnairePort.donnePortSelonNom(msg.nomOnglet);
        await this.ouvrier.recupere(portReel.sender.tab.id);

		var dispatch = (action) => {
            gestionnaireDW.envoieMessageDW({
				message: "dw-comm",
				requete: "envoie",
				idOnglet: this.ouvrier.idOnglet,
				id: this.id,
				_id: msg._id,
				action: action
			});
			if(JSON.parse(action).message == "texte"){
				this.timeoutMessageRecuID.push(setTimeout(this.gereMessgeNonRecu.bind(this),5000));
			}
		};
		
		async function promesseClientCorrecteurSimple() {
			var options = {};
			var racineRessources = estAvecWorker() ? "../" : "";
			var dossierWasm = racineRessources + "extensions/DetecteurWeb/wasm/"
			if (estSafariWebex()) {
				let urlFichierWasm = browser.runtime.getURL(dossierWasm + "ClientCorrecteurSimple.wasm");
				let reponse = await fetch(urlFichierWasm, { credentials: "same-origin" });
				let donnees = await reponse.arrayBuffer();
				options["wasmBinary"] = donnees;
			} else if (estAvecWorker()) {
				options["locateFile"] = function(path, scriptDirectory) {
					return scriptDirectory + dossierWasm + path;
				};
			}
			return await ClientCorrecteurSimple(options);
		}

		this.ccorrs = await promesseClientCorrecteurSimple();
		this.obj = new this.ccorrs.ClientCorrecteurSimple(dispatch);
		
		return true;
	}

	donneChaine(laChaineN){
		return this.ccorrs.ChaineNVersString(laChaineN);
	}
	
    donnePhrasesInvalidees(leIntervalleModification){
        let phrasesInvalidees = [];
		if(this.obj){
			let uuidInvalides = this.obj.DonnePhrasesInvalidees(leIntervalleModification);
			for (let i = 0; i < uuidInvalides.size(); ++i) {
				phrasesInvalidees.push(this.ccorrs.uuid_to_string(uuidInvalides.get(i)));
			}
		}
		return phrasesInvalidees;
    }

	donneListeCorrections(leObjResultats) {
		let uneListeCorrections = []
		for (var j = 0, m = leObjResultats.corrections.size(); j < m; ++j) {
			let unObjCorrection = {
				chaine: this.donneChaine(leObjResultats.corrections.get(j).chaineRemplacement),
				infobulleCorrection: this.donneChaine(leObjResultats.corrections.get(j).infobulleCorrection),
				infobulleRetablissement:  this.donneChaine(leObjResultats.corrections.get(j).infobulleRetablissement),
				intervalle: leObjResultats.corrections.get(j).intervalleRemplacement
			};
			uneListeCorrections.push(unObjCorrection);
		}
		return uneListeCorrections;
	}

	donneListeDetections(leObjResultats) {
		let uneListeDetections = []
		for (var j = 0, m = leObjResultats.detections.size(); j < m; ++j) {
			let unObjDetection = {
				description:this.donneChaine(leObjResultats.detections.get(j).description),
				idCorrection:this.ccorrs.DonneIdCorrection(leObjResultats.detections.get(j).idCorrection),
				intervalle: leObjResultats.detections.get(j).intervalleSoulignement,
				titre:this.donneChaine(leObjResultats.detections.get(j).titre),
				typeSoulignement:leObjResultats.detections.get(j).typeSoulignement.value,
				actions:this.ccorrs.DonneValeurActionsDetection(leObjResultats.detections.get(j)),
				id : leObjResultats.detections.get(j).ident
			};
			uneListeDetections.push(unObjDetection);
		}
		return uneListeDetections;
	}

    donneObjetDecoupage(){
        let objetDecoupage = {};
        let decoupage = this.obj.DonneDecoupageSelonOrdre();
        for (let i = 0, n = decoupage.size(); i < n; i++){
            let phraseDecoupee = decoupage.get(i);
			let idPhrase = this.ccorrs.uuid_to_string(phraseDecoupee.identificateur);
			objetDecoupage[idPhrase]= { 
				intervalle : phraseDecoupee.intervalle,
            	resultats : this.donneResultatsSelonIdentificateur(phraseDecoupee.identificateur)
			}
        }
        return objetDecoupage;
    }

	donneResultatsSelonIdentificateur(identificateur,doisConvertir){
		if( doisConvertir === undefined ) doisConvertir=false;
		if( doisConvertir ) identificateur=this.ccorrs.string_to_uuid(identificateur);
		let desResultats = this.obj.DonneResultats(identificateur);
		desResultats.corrections = this.donneListeCorrections(desResultats);
		desResultats.detections = this.donneListeDetections(desResultats);
		return desResultats
	}

    traiteMessageCliCorrSi(msg){
        if (msg.requete == "donnePhrasesInvalidees"){
            msg.phrasesInvalidees = this.donnePhrasesInvalidees(msg.intervalleModification);
            this.ouvrier.envoieMessageAuDocument(msg);
        }
        else if (msg.requete == "consomme"){
			this.timeoutMessageRecuID.forEach((leID) => {clearTimeout(leID);});
            !!this.obj && this.obj.Consomme(msg.donneesConsomme);
        }
        else if (msg.requete == "donneObjetDecoupage"){
            msg.objetDecoupage = this.donneObjetDecoupage();
            this.ouvrier.envoieMessageAuDocument(msg);
        }
		else if (msg.requete == "donneResultatsSelonIdentificateur"){
            msg.objetDecoupage = this.donneResultatsSelonIdentificateur(msg.idPhrase,true);
            this.ouvrier.envoieMessageAuDocument(msg);
        }
        else if (msg.requete == "applique"){
            !!this.obj && this.obj.Applique(msg.messageApplique);
        }
    }
}