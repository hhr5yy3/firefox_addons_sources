class ObjetBoutonBulle extends ObjetBulle {
	constructor(leObjInitialisation){
		super(leObjInitialisation);
		this.zIndex = leObjInitialisation.zIndex;
		this.estActivayCorrectionExpress = leObjInitialisation.estActivayCorrectionExpress;
		this.position_x = leObjInitialisation.position_x;
		this.etat = {};
		this.estInitialisay = false;
	}

	creerShadowRoot(parent){
		parent.attachShadow({mode: "open"});
		const { shadowRoot } = parent;
		return shadowRoot;
	}

	//
	// - init -
	//
	async init() {
		super.init();

		const xslRef = await initXsltProcessor();
		xsltProcessor = new XSLTProcessor();
		xsltProcessor.importStylesheet(xslRef);

		const cheminAtkinsonFont = donneUrlFichier("ressources/WOFF2/Atkinson-Hyperlegible-Regular-102a.woff2");
		let atkinson_font = new FontFace('Atkinson Hyperlegible', 'url('+cheminAtkinsonFont+')');
		await atkinson_font.load();
		document.defaultView.parent.document.fonts.add(atkinson_font);

		const request = new Request(donneUrlFichier("extensions/DetecteurWeb/detecteurWeb.css"), {method: 'GET',headers: {
			'Content-Type': 'text/css'
		}});
		let uneReponseFetch = await fetch(request);
		let uneReponse = await uneReponseFetch.text();

		this.contenantBoutonBulle = cree("div", {id:"bdw_bulle"});
		this.contenantBoutonBulle.style.maxHeight = "0px";
		this.contenantBoutonBulle.style.maxWidth = "0px";
		this.contenantBoutonBulle.style.top = "0px";
		this.contenantBoutonBulle.style.left = "0px";
		this.contenantBoutonBulle.style.position = "absolute";
		this.boutonBulle = cree("div",{id:"bloc_dw", class:"grid-bouton msg_dw",style:{display:"inline-grid"}});
		this.srBouton = this.creerShadowRoot(this.contenantBoutonBulle);
		const styleBouton = document.createElement("style");
		styleBouton.textContent = uneReponse;
		this.srBouton.appendChild(styleBouton);
		this.boutonBulleFiole = cree("div",{id:"fiole_bouton", class:"dw_bouton dw_fiole", style:{border:"0px", height:"37px", width:"37px"}});
		this.maFiole = new ObjetSVG(this.srBouton);
		let imgBoutonBulleFiole= this.maFiole.creeFiole();

		this.msgDWMessage = cree("div",{id:"msg_dw_message",class:"dw_msg_groupe",visibility:"hidden",style:{opacity:0}});
		
		this.menuFermer = cree("div",{id:"dw_ignore",class:"menu_selection_dw menu_dw"});
		this.sectionFermer = cree("div",{class:"section_menu"});
		let uneSectionImageFermer = cree("div",{class:"image_menu"});

		let imgBoutonBulleIgnore = cree("img",{id:"icone_ignore",src:image_ignore, class:"image_ignore_svg"});
		uneSectionImageFermer.appendChild(imgBoutonBulleIgnore);
		let uneSectionMenuFermer = cree("div",{class:"texte_menu"});
		uneSectionMenuFermer.appendChild(document.createTextNode(gestionTraduction.Tr_(cstDWExclure)));
		this.sectionFermer.appendChild(uneSectionImageFermer);
		this.sectionFermer.appendChild(uneSectionMenuFermer);
		this.menuFermer.appendChild(this.sectionFermer);
		this.msgDWMessage.appendChild(this.menuFermer);

		this.menuPoursuivre = cree("div",{id:"dw_poursuivre",class:"menu_selection_dw menu_dw"});
		this.sectionPoursuivre = cree("div",{class:"section_menu"});
		let uneSectionImagePoursuivre = cree("div",{class:"image_menu"});

		let imgBoutonFioleMenu = cree("img",{id:"icone_menu_fiole",src:image_fiole_menu, class:"image_svg"});
		uneSectionImagePoursuivre.appendChild(imgBoutonFioleMenu);
		this.sectionPoursuivreTexte = cree("div",{class:"texte_menu"});
		this.sectionPoursuivreTexte.appendChild(document.createTextNode(gestionTraduction.Tr_(cstDWPoursuivreCorrection)));
		this.sectionPoursuivre.appendChild(uneSectionImagePoursuivre);
		this.sectionPoursuivre.appendChild(this.sectionPoursuivreTexte);
		this.menuPoursuivre.appendChild(this.sectionPoursuivre);
		this.msgDWMessage.appendChild(this.menuPoursuivre);

		this.menuConnexion = cree("div",{id:"dw_connexion",class:"menu_selection_dw menu_connexion_dw",style:{display:"none"}});
		this.sectionConnexion = cree("div",{class:"section_connexion"});
		let uneSectionImageConnexion = cree("div",{class:"image_connexion"});

		let imgBoutonConnexionMenu = cree("img",{id:"icone_menu_fiole_connexion",src:image_inactive_menu, class:"image_inactive_svg"});
		uneSectionImageConnexion.appendChild(imgBoutonConnexionMenu);
		this.sousSectionConnexion = cree("div",{class:"sous_section_connexion"});
		this.titreConnexion = cree("div",{class:"titre_connexion"});
		this.explicationConnexion = cree("div",{class:"explication_connexion", style: {display: "none"}});
		this.titreConnexion.appendChild(document.createTextNode(gestionTraduction.Tr_(cstDWInactif)));
		this.explicationConnexion.appendChild(document.createTextNode(gestionTraduction.Tr_(cstDWAWebNonConnectay)));
		this.explicationConnexionAweb = cree("span", {class: "explication_connexion_aweb"});
		this.explicationConnexionAweb.appendChild(document.createTextNode(" Antidote Web"));
		this.explicationConnexion.appendChild(this.explicationConnexionAweb);
		this.explicationActivation = cree("div", {class: "explication_connexion",style: {display: "none"}});
		this.explicationActivation.appendChild(document.createTextNode(gestionTraduction.Tr_(cstAntidoteNonActivay)));
		this.explicationActiverAntidote = cree("span", {class: "explication_activer_antidote"});
		this.explicationActiverAntidote.appendChild(document.createTextNode(" Antidote "));
		this.explicationActivation.appendChild(this.explicationActiverAntidote);
		this.sousSectionConnexion.appendChild(this.titreConnexion);
		this.sousSectionConnexion.appendChild(this.explicationConnexion);
		this.sousSectionConnexion.appendChild(this.explicationActivation);
		this.sectionConnexion.appendChild(uneSectionImageConnexion);
		this.sectionConnexion.appendChild(this.sousSectionConnexion);
		this.menuConnexion.appendChild(this.sectionConnexion);

		this.msgDWMessage.appendChild(this.menuConnexion);
		this.boutonBulle.appendChild(this.msgDWMessage);
		this.boutonBulleFiole.appendChild(imgBoutonBulleFiole);
		this.boutonBulle.appendChild(this.boutonBulleFiole);
		this.srBouton.appendChild(this.boutonBulle);

		this.maFiole.cacheElement("bouton_svg");
		this.boutonBulleFiole.style.zIndex=parseInt(this.zIndex) + 1;
		this.boutonBulle.style.zIndex=parseInt(this.zIndex) + 2;

		this.ajouteEcouteurBoutonBulleDW();

        // La class qui hérite de celle-ci doit insérer le bouton bulle à la bonne place dans la page elle-même
	}


	ajouteEcouteurBoutonBulleDW(){
		let ceci = this;
		this.msgDWMessage.addEventListener('pointerover', function(ev) {
			clearTimeout(timeoutAfficgeMenuBulle);
		},false);

		this.msgDWMessage.addEventListener('pointerleave', function(ev){
			timeoutAfficgeMenuBulle = setTimeout(()=>{
				ceci.afficheCacheMenuBulle({commande : "hidden"});
			},400);
		},false);

		this.sectionFermer.addEventListener('click',(d)=>{
			ceci.boutonBulle.removeEventListener('pointerover',function(){});
			ceci.boutonBulle.removeEventListener('pointeroleave',function(){});
			ceci.sectionFermer.removeEventListener('pointerover',function(){});
			ceci.sectionFermer.removeEventListener('click',function(){});
			ceci.boutonBulle.remove();
			ceci.observeurChangementTaille.disconnect();
			envoieVersLumiere({message:"desactiveSurSite"});	
		});

		this.sectionPoursuivre.addEventListener('click',(d)=>{			
			envoieVersLumiere({message:"ConnexionAWebDetecteurWeb",outil:"C0"});		
		});

		this.sectionConnexion.addEventListener('click',(d)=>{			
			envoieVersLumiere({message:"ConnexionAWebDetecteurWeb",outil:"C0"});
		});
	}

	// - montreFiole -
	// 		
	async montreFiole(etatCompilay){
		switch (etatCompilay.fiole) {
			case "neutre":
				this.maFiole.metsNeutre();
				if (etatCompilay.pastille) this.maFiole.affichePastille(etatCompilay.pastille);
				else this.maFiole.cachePastille();
				break;
			case "inactif":
				this.maFiole.metsInactif();
				break;	
			case "ok":
				this.maFiole.metsOK();
				break;
			case "analyse":
				this.maFiole.metsAnalyse();
				if (etatCompilay.pastille) this.maFiole.affichePastille(etatCompilay.pastille);
				break;
			default:
				break;
		}
	}

	//
	metsEtat(){
		let etatCompilay = {
			fiole: null,
			pastille: null
		};

		for(let [idBouton, etat] of Object.entries(this.etat)){

			if (!etat) continue;

			if (etat.pastille == "alerte_perso" && etatCompilay.fiole !== "inactif"){
				etatCompilay.pastille = "alerte_perso";
			}

			if (etat.pastille == "erreur" && etatCompilay.pastille !== "alerte_perso" && etatCompilay.fiole !== "inactif"){
				etatCompilay.pastille = "erreur";
			}

			if (etat.pastille == "alerte" && etatCompilay.pastille !== "erreur" && etatCompilay.pastille !== "alerte_perso" && etatCompilay.fiole !== "inactif"){
				etatCompilay.pastille = "alerte";
			}

			if (etat.fiole == "neutre" && etatCompilay.fiole !== "analyse" && etatCompilay.fiole !== "inactif"){
				etatCompilay.fiole = "neutre";
			}

			if (etat.fiole == "ok" && !etatCompilay.pastille && etatCompilay.fiole !== "neutre" && etatCompilay.fiole !== "analyse" && etatCompilay.fiole !== "inactif"){
				etatCompilay.fiole = "ok";
				etatCompilay.pastille = null;
			}

			if (etat.fiole == "analyse" && etatCompilay.fiole !== "inactif"){
				etatCompilay.fiole = "analyse";
			}

			if (etat.fiole == "inactif"){
				etatCompilay.pastille = null;
				etatCompilay.fiole = "inactif";
			}

		}
		this.montreFiole(etatCompilay);

	}

	//
	ajouteEtat(id, etat){
		// console.log("AJOUTE",id, etat,this.etat);
		this.etat[id] = etat;
	}

	//
	supprimeEtat(id){
		if(this.etat[id]){
			delete this.etat[id];
		}
	}

	metsAJourEtats(){
		// console.log("metsEtat", structuredClone(this.etat));
		for (let [id, dw] of Object.entries(DetecteurWeb.dictBouton)){
			if (!!dw.maFiole){
				this.ajouteEtat(id, {fiole: dw.maFiole.fioleAffichee, pastille: dw.maFiole.pastilleAffichee});
			}
		}
        
		this.metsEtat();
	}

	afficheCacheMenuBulle(msg){
		if(!this.msgDWMessage)return;

		let idAntidote = mesDonneesGlobales.idAntidote == -1 ? (mesDonneesGlobales.idAntidote < 0 ? 0 : mesDonneesGlobales.idAntidote) : mesDonneesGlobales.infoDW.idAntidote;
		if(mesDonneesGlobales.infoDW.idAntidote == 0){
			idAntidote = mesDonneesGlobales.idAntidote;
		}
		if(msg.commande === undefined){
			msg.commande= this.msgDWMessage.style.visibility=="visible"?"hidden":"visible";
		}

		if(msg.commande=="visible"){
			this.msgDWMessage.style.visibility="visible";
			this.msgDWMessage.classList.remove("disparition");
			this.msgDWMessage.classList.add("apparition");
			this.msgDWMessage.style.opacity=1;

		}else{
			this.msgDWMessage.classList.remove("apparition");
			this.msgDWMessage.classList.add("disparition");
			this.msgDWMessage.style.opacity=0;
			this.msgDWMessage.style.visibility="hidden";
		}

		if (infobulleEstVisible && this.msgDWMessage.style.opacity == 1) {

			fermerInfoBulle();
		}

		let desCoordsBulle = this.msgDWMessage.getBoundingClientRect();
		if(desCoordsBulle.right < desCoordsBulle.width){
			this.msgDWMessage.style.left = -(desCoordsBulle.width + desCoordsBulle.left - parseInt(this.boutonDWFiole.style.width.split("px")[0]) - 10 ) + "px"; // 10 pour le dégagement avec le bord
		}else{
			this.msgDWMessage.style.left = "";
			this.msgDWMessage.style.right = "0px";
		}

		if (this.estActivayCorrectionExpress) {
			this.menuPoursuivre.style.display = "block";
			this.menuConnexion.style.display = "none";
			this.afficheMessage(gestionTraduction.Tr_(cstDWPoursuivreCorrection) + " " + cstNomIdAntidote[idAntidote]);
		} else {
			this.menuPoursuivre.style.display = "none";
			this.menuConnexion.style.display = "block";
			if (idAntidote == 1) {
                this.explicationConnexion.style.display = "none";
                this.explicationActivation.style.display = "block";
                this.afficheMessage(this.explicationActiverAntidote, " Antidote " + cstNomIdAntidote[idAntidote]);
            } else {
                this.explicationConnexion.style.display = "block";
                this.explicationActivation.style.display = "none";
            }
		}
	}

	afficheMessage(leMessage){
		metsTexte(this.sectionPoursuivreTexte,leMessage);
	}

	async traiteMessagePourBulle(msg){
		if (!msg || msg && !msg.message) return;

		if (msg.message == "init_bulle"){
			await this.init();
			this.estInitialisay = true;
		}
		if (msg.message == "ajouteEtat"){
			this.ajouteEtat(msg.id, msg.etat);
		}
		if (msg.message == "supprimeEtat"){
			this.supprimeEtat(msg.id);
		}
		if(msg.message == "modifie_message"){
			let idAntidote = mesDonneesGlobales.idAntidote == -1 ? (mesDonneesGlobales.idAntidote < 0 ? 0 : mesDonneesGlobales.idAntidote) : mesDonneesGlobales.infoDW.idAntidote;
			if(mesDonneesGlobales.infoDW.idAntidote == 0){
				idAntidote = mesDonneesGlobales.idAntidote;
			}
			this.afficheMessage(gestionTraduction.Tr_(cstDWPoursuivreCorrection)+" "+cstNomIdAntidote[idAntidote]);
		}
		if (msg.message == "ouvreferme_menubulle"){
			this.afficheCacheMenuBulle(msg);
		}
		if (msg.message == "metsAJourEtats"){
			this.metsAJourEtats();
		}
	}

}