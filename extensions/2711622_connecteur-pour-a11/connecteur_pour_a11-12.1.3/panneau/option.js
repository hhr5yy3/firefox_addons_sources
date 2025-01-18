/* Ce document est la propriété intellectuelle de Druide informatique inc. Toute reproduction ou publication est interdite. */
/* Copyright 2022 Druide informatique inc. */

let monPort = null;
let dictAntiOups = {};
let dictExclusions = {};
let dweb_option = {
	bouton_barre : false,
	bouton_bulle : false
}
function envoieOptions(donnees) {
    monPort.postMessage({message:"nouvellesDonnees",_dib84:donnees});
}

async function demandeDonnees() {
	var promesse = new Promise(function(resolution) {
		monPort = fureteur.runtime.connect({ name: "antidote-reglages" });
		monPort.onMessage.addListener(function(m){
			if(!estVide(m)){
				if(m.message == "_dib01"){
					monPort.postMessage({message:"demandeDonnees"})
				}else{
					resolution(m);
				}
			}
		});
		monPort.onDisconnect.addListener(async function() {

			let promesse = new Promise(resolutionGlobal => {
				fureteur.storage.local.get("objetGlobal").then( o => {
					resolutionGlobal( o.objetGlobal);
				}).catch( d => {
					resolutionGlobal({
						activeLog:false,
						estModeiOS:true,
						infoDW:{devDWebDevoilee:false},
						infoConnecteur:{manifest:2},
						langue:"fr"
					})});
			});
		
			let donnees = await promesse;
			resolution(donnees);

		})
	});
	return promesse;
}

function telecharge(filename, text) {
	var pom = document.createElement('a');
	pom.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(text));
	pom.setAttribute('download', filename);

	if (document.createEvent) {
			var event = document.createEvent('MouseEvents');
			event.initEvent('click', true, true);
			pom.dispatchEvent(event);
	}
	else {
			pom.click();
	}
}



//===========================================
// estExtensionPerimee
//===========================================
function estExtensionPerimee(lExtension) {
	//Note : liste aussi dans background.2.js
	if (cstChaineNomFureteur == "GoogleChrome") {
		if (lExtension == "miogokbgkhkmdljbjlnlhhdblinpickg" ||
			lExtension == "mjcnhgdodmhnpmndnljbmafpgomahfal" ||
			lExtension == "hdncgaeemnjfkhabogcdhjeeomaiejgh" ||
			lExtension == "mpaegbolmnimfkinnkppnkbkemcmelcg" ||
			lExtension == "pfcgjlglddicjopgimohdcbmabacamll" ||
			lExtension == "lbojggafdepnclikhiapkpinbfdhbdoi" ||
			lExtension == "fgfdmjebifpgcgpfglcmpgnancpmpbnb" ||
			lExtension == "cchfigjcpjmclmmphipdkeocklpnjecm"
		) {
			return true;
		}
	} else if (cstChaineNomFureteur == "MozillaWebExtension") {
		if (lExtension == "antidote9_firefox@druide.com") {
			return true;
		}
	}
	return false;
}

//===========================================
// effacerExtension
//===========================================
function effacerExtension(lesExtensions) {

	option = {
		showConfirmDialog: false
	}; // pour enlever le dialogue  {showConfirmDialog:false}
	var desExtensionsPerimees = new Array();
	for (var i = lesExtensions.length - 1; i >= 0; i--) {
		if (estExtensionPerimee(lesExtensions[i].id)) {
			if (cstChaineNomFureteur == "GoogleChrome") {
				fureteur.management.uninstall(lesExtensions[i].id, option);
			} else if (cstChaineNomFureteur == "MozillaWebExtension") {
				desExtensionsPerimees.push(lesExtensions[i].id);

			}
		}
	}

	if (desExtensionsPerimees.length > 0 && cstChaineNomFureteur == "MozillaWebExtension") {
		fureteur.storage.local.set({
			extension_perimees: desExtensionsPerimees
		}, function () {});
		document.getElementById("extensionsperimees").style.display = 'none';
	} else {
		window.close();
	}

}

//===========================================
// reponseEffacerExtension
//===========================================
function reponseEffacerExtension() {
	if (cstChaineNomFureteur == "GoogleChrome") {
		fureteur.permissions.request({
			permissions: ['management'],
		}, function (granted) {
			// The callback argument will be true if the user granted the permissions.
			if (granted) {
				fureteur.management.getAll(effacerExtension);
			}
		});
	} else if (cstChaineNomFureteur == "MozillaWebExtension") {
		fureteur.management.getAll(effacerExtension);
	}
}


//===========================================
// donneLesExtensions
//===========================================
function donneLesExtensions(lesExtensions) {
	var desExtensionsPerimees = new Array();
	var extensionsPerimees = false;
	var nbPerimee = 0;
	for (var i = lesExtensions.length - 1; i >= 0; i--) {
		if (estExtensionPerimee(lesExtensions[i].id)) {
			var chaine = lesExtensions[i].name + " - " + lesExtensions[i].version + " (" + lesExtensions[i].id + ")"
			desExtensionsPerimees.push(chaine);
			extensionsPerimees = true;
			nbPerimee++;
		}
	}
	if (extensionsPerimees) {
		document.getElementById("reglages").style.display = 'none';
		document.getElementById("extensionsperimees").style.display = 'block';
		//Afficher message
		if (nbPerimee > 1) {
			metsTexte(document.getElementById('extper_titre'), gestionTraduction.Tr_(cstExtensionPerimeeTitrePluriel, ""));
			metsTexte(document.getElementById('extper_message'), gestionTraduction.Tr_(cstExtensionPerimeeMessagePluriel, ""));
			metsTexte(document.getElementById('extper_message2'), gestionTraduction.Tr_(cstExtensionPerimeeMessage2Pluriel, ""));
		} else {
			metsTexte(document.getElementById('extper_titre'), gestionTraduction.Tr_(cstExtensionPerimeeTitre, ""));
			metsTexte(document.getElementById('extper_message'), gestionTraduction.Tr_(cstExtensionPerimeeMessage, ""));
			metsTexte(document.getElementById('extper_message2'), gestionTraduction.Tr_(cstExtensionPerimeeMessage2, ""));
		}

		if (cstChaineNomFureteur == "GoogleChrome") {
			metsTexte(document.getElementById('extper_autorisation'), gestionTraduction.Tr_(cstExtensionPerimeeAutorisation, ""));
		} else if (cstChaineNomFureteur == "MozillaWebExtension") {
			//
		}

		metsTexte(document.getElementById('extper_effacer'), gestionTraduction.Tr_(cstExtensionPerimeeBouton, ""));
		metsTexte(document.getElementById('titre'), gestionTraduction.Tr_(cstExtensionPerimeeAvertissement, ""));

		//Lister :
		metsTexte(document.getElementById('extper_liste'), desExtensionsPerimees.toString());

		//Effacer les options
		var contenu = document.getElementById('contenu');
		var menCo = document.getElementById('optionMenu');
		contenu.removeChild(menCo);

	} else {
		var divExtPerParent = document.getElementById('extensionsperimees');
		var divExtPerNote = document.getElementById('extensionsperimees_note');
		divExtPerParent.removeChild(divExtPerNote);
	}

}

//===========================================
// cacher
//===========================================
function cacher() {
	for (let p of document.getElementsByClassName("panneau")) {
		p.style.display = "none";
	}
	for (let m of document.getElementsByClassName("menu")) {
		m.style.removeProperty("box-shadow");
		if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
			m.style.removeProperty("background-color");
		}
	}
}

//===========================================
// donneValeurRadio
//===========================================
function donneValeurRadio(radioGroupName) {
	var rads = document.getElementsByName(radioGroupName),
		i;
	for (i = 0; i < rads.length; i++)
		if (rads[i].checked)
			return rads[i].value;
	return "";
}

//===========================================
// estOptionValide
//===========================================
let mesOptionsValides = ["beta_dweb=faux",
						"dev_dweb=vrai","dev_dweb=faux",
						"log=vrai","log=faux",
						"lab=vrai","lab=faux",
						"log=dw",
						"bd=reinit","bd",
						"googledoc=monozone","googledoc=multizone",
						"dweb_option=bouton_bulle_vrai", "dweb_option=bouton_bulle_faux",
						"dweb_option=bouton_barre_vrai", "dweb_option=bouton_barre_faux","billetix=vrai",
						"dweb_dblclic=vrai","dweb_dblclic=faux",
						"montre_erreur=vrai","beta_a12=vrai","beta_a12=faux","capture=vrai","capture=faux",
						"test=prod","test=beta","test=prebeta","test=preprod"
					];
function estOptionValide(uneOption){
	if(mesOptionsValides.includes(uneOption) || uneOption.substring(0,2)=="bd") return true;
	return false;
}

//===========================================
// retraitAdresse
//===========================================
function retraitAdresse(entree, dict){
	let id = entree.id;
	entree.remove();
	delete dict[id];
	envoieOptions({
		infoDW : {
			listeAntiOups : Object.values(dictAntiOups),
			listeExclusion : Object.values(dictExclusions)
		}
	});
}

//===========================================
// ajouteAdresse
//===========================================
function ajouteAdresse(lAdresse,leDictionnaire,leIDElement){
	let typeElement =  leIDElement.split("_")[0];
	let id = chaine_aleatoire();
	let entree = cree('div',{id:id, typeElement:typeElement, adresse:lAdresse, class:"div_entree_liste"});
	metsTexte(entree,lAdresse);
	entree.addEventListener('click',(e)=>{
		const lesEntrees = document.getElementById(leIDElement).getElementsByClassName("div_entree_liste");
		for (let uneEntree of lesEntrees){
			uneEntree.classList.remove("selectionnee");
		}
		e.target.classList.add("selectionnee");
	});
	entree.addEventListener("dblclick", e => {
		e.target.contentEditable = "true";
		e.target.focus();
		if (e.target.getAttribute("typeelement") === "antioups") {
			e.target.addEventListener("keydown", modifieAdresseAntiOups);
		}
		if (e.target.getAttribute("typeelement") === "listeexclusion") {
			e.target.addEventListener("keydown", modifieAdresseExclusion);
		}
	});
	document.getElementById(leIDElement).appendChild(entree);
	return id;
}

//===========================================
// modifieAdresse
//===========================================
function modifieAdresse(element, leDictionnaire, type){
	const id = element.id;
	leDictionnaire[id] = element.textContent;
	element.setAttribute("adresse", element.textContent);
	if (type === "antioups") {
		envoieOptions({
			infoDW : {
				listeAntiOups : Object.values(dictAntiOups)
			}
		});
	}
	if (type === "exclusion") {
		envoieOptions({
			infoDW : {
				listeExclusion : Object.values(dictExclusions)
			}
		});
	}
}

function modifieAdresseAntiOups(e) {
	if (e.keyCode === 13) {
		if (estBlanc(e.target.textContent)){
			retraitAdresse(e.target, dictAntiOups);
		}
		else {
			modifieAdresse(e.target, dictAntiOups, "antioups");
		}
		e.target.contentEditable = false;
		e.target.removeEventListener("keydown", modifieAdresseAntiOups);
		e.target.classList.remove("selectionnee");
	}
	if (e.keyCode === 27) {
		e.target.textContent = e.target.getAttribute("adresse");
		e.target.contentEditable = false;
		e.target.removeEventListener("keydown", modifieAdresseAntiOups);
		e.target.classList.remove("selectionnee");
	}
}

function modifieAdresseExclusion(e){
	if (e.keyCode === 13){
		if (estBlanc(e.target.textContent)){
			retraitAdresse(e.target, dictExclusions);
		}
		else {
			modifieAdresse(e.target, dictExclusions, "exclusion");
		}
		e.target.contentEditable = false;
		e.target.removeEventListener("keydown", modifieAdresseExclusion);
		e.target.classList.remove("selectionnee");
	}
	if (e.keyCode === 27) {
		e.target.textContent = e.target.getAttribute("adresse");
		e.target.contentEditable = false;
		e.target.removeEventListener("keydown", modifieAdresseExclusion);
		e.target.classList.remove("selectionnee");
	}
}

//===========================================
// ajouteAdresseAntiOups
//===========================================
function ajouteAdresseAntiOups(lAdresse){
	return ajouteAdresse(lAdresse,dictAntiOups,"antioups_detecteurweb");
}

//===========================================
// ajouteAdresseExlusion
//===========================================
function ajouteAdresseExlusion(lAdresse){
	return ajouteAdresse(lAdresse,dictExclusions,"listeexclusion_detecteurweb");
}

//===========================================
// addEventListener - DOMContentLoaded -
//===========================================
document.addEventListener('DOMContentLoaded', async function () {
	//police
	// const cheminAtkinsonFont = donneUrlFichier("ressources/WOFF2/Atkinson-Hyperlegible-Regular-102a.woff2")
	// let atkinson_font = new FontFace('Atkinson Hyperlegible', 'url('+cheminAtkinsonFont+')');
	// await atkinson_font.load();
	// document.fonts.add(atkinson_font);
	// document.body.style.fontFamily = '"Atkinson Hyperlegible"';

	let donnees = await demandeDonnees();
	let activeLog = donnees.activeLog; 
	let beta_a12 = donnees.beta_a12;
	let capture = donnees.capture;
	let montreErreur = false;

	if(estThunderbird()){
		document.getElementById("setcion_aw").style.display="none";
		document.getElementById("titre_antidoteweb").style.display="none";
		document.getElementById("description_antidoteweb").style.display="none";
		document.getElementById("setcion_thunderbird_signature").style.display="block";
	}
	if(donnees.estModeiOS){
		document.getElementById("contextmenu_m").style.display="none";
	  	document.getElementById("choix_detecteurweb").style.display="none";
		document.getElementById("propos_p").style.display="none";
		document.getElementById("contextmennu_p").style.display="none";

		document.getElementById("propos_m").classList.add("bouton_ios");
		document.getElementById("detecteurweb_m").classList.add("bouton_ios");
		document.getElementById("propos_m").classList.remove("box");
		document.getElementById("detecteurweb_m").classList.remove("box");

		document.getElementById("propos_p").classList.add("panel-wrap");
		document.getElementById("detecteurweb_p").classList.add("panel-wrap");
		document.getElementById("propos_p").style.display="block";
		document.getElementById("detecteurweb_p").style.display="block";

		const menuNav = document.getElementById("menu_nav");
		const boutons = document.getElementById("boutons");
		menuNav.style.flexDirection="column";
		menuNav.style.gap = "20px 0";
		menuNav.style.height = "fit-content";
		menuNav.style.justifyContent = "center";
		menuNav.style.alignItems = "center";
		menuNav.appendChild(boutons);
		boutons.style.position = "static";
		boutons.style.width = "fit-content";
		
		for (let b of boutons.getElementsByClassName("bouton-defaut")){
			b.style.boxSizing = "content-box";
			b.style.width = "50vw";
			b.style.padding = "5px 20px";
			b.style.margin = "0";
			b.style.marginTop = "5px";
			b.style.zIndex = "0";
		}

		const html = document.body.parentElement;
		html.style.height = "100vh";
		html.style.display = "flex";
		html.style.alignItems = "center";
		html.style.justifyContent = "center";


		for (let b of menuNav.getElementsByClassName("bouton_ios")){
			b.style.padding = "20px";
		}

		for( let c of document.getElementsByClassName("div_sp_chevron")){
			c.style.display = "block";
		}
	
		document.getElementById("detecteurweb_m").addEventListener('click', function (e) {
			document.getElementById("detecteurweb_p").style.transform="translateX(0%)";
		}, false);
	
	
		document.getElementById("propos_m").addEventListener('click', function (e) {	
			document.getElementById("propos_p").style.transform="translateX(0%)";
		}, false);

		
		document.getElementById("dw_chevron").addEventListener('click', function (e) {
			document.getElementById("detecteurweb_p").style.transform="translateX(110%)";
		}, false);
	
	
		document.getElementById("propos_chevron").addEventListener('click', function (e) {	
			document.getElementById("propos_p").style.transform="translateX(110%)";
		}, false);
	
	}


	if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
		for(let c of document.getElementsByClassName("img_chevron")){
			c.src="../images/icone-chevron-sombre.svg";
		}
		for (let p of document.getElementsByClassName("liste_image_plus")) {
			p.src="../images/plus-sombre13x13.svg";
		}
		for (let m of document.getElementsByClassName("liste_image_moins")) {
			m.src="../images/moins-sombre13x13.svg";
		}
	}

	gestionTraduction.initAvecConstante(cstDict);
	gestionTraduction.metsLaLangue(donnees.langue);

	//traduction : titre
	metsTexte(document.getElementById('titre'),gestionTraduction.Tr_(cstOptionConfigExtGC,""));

	// Devoiler menu DetecteurWeb
	let idAntidote = donnees.idAntidote;
	if(idAntidote == cstIdAntidoteWebAConfirmer) idAntidote = 0;
	let devoileDWeb = donnees.infoDW.dWebDevoilee && donnees.idAntidote>0 && donnees.infoDW.activation[donnees.idAntidote].disponible && !estThunderbird();
	if(devoileDWeb){
		document.getElementById("detecteurweb_m").style.display = "block";
		activeLog = false;
	}

	let devoileDWebDev = donnees.infoDW.devDWebDevoilee;
	if(devoileDWebDev){
		document.getElementById("detecteurweb_m").style.display = "block";
		document.getElementById("dev_dweb").style.display = "block";
	}

	function getURLParameter(name) {
		return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
  	}

	if(location.search.length > 0){
		if( !estThunderbird() && (donnees.versionPont == "2.0" || donnees.versionPont == "3.0") && (getURLParameter("dev_dweb") == "vrai" || getURLParameter("beta_a12") == "vrai")){
			document.getElementById("detecteurweb_m").style.display = "block";
			cacher();
			document.getElementById("detecteurweb_m").style.boxShadow = "0 3px 0 #2496ff";
			document.getElementById("detecteurweb_p").style.display = "block";
			if(getURLParameter("dev_dweb") == "vrai" ){
				document.getElementById("dev_dweb").style.display = "block";
				devoileDWebDev = true;
			}
			devoileDWeb = true;
			activeLog = false;
			beta_a12 = true;
			envoieOptions({
				activeLog:activeLog,
				dWebDevoilee : devoileDWeb,
				devoileDWebDev : devoileDWebDev,
				beta_a12 : beta_a12
			});	
		}else if(getURLParameter("beta_dweb") == "faux" || getURLParameter("beta_a12") == "faux" ){
			document.getElementById("detecteurweb_m").style.display = "none";
			cacher();
			devoileDWeb = false;
			beta_a12 = false;
			envoieOptions({
				activeLog:false,
				dWebDevoilee : false,
				devoileDWebDev : false,
				beta_a12 : beta_a12
			});	
		}else if(getURLParameter("log") == "vrai"){
			activeLog = true;
			envoieOptions({
				activeLog:activeLog
			});
		}else if(getURLParameter("log") == "faux"){
			activeLog = false;
			envoieOptions({
				activeLog:activeLog
			});
		}else if(getURLParameter("log") == "dw"){
			let uneAdresseRacine = donnees.racine+"panneau/log.html";
			window.location.replace(uneAdresseRacine);	
		}else if(getURLParameter("googledoc") == "monozone"){
			envoieOptions({
				googleDoc:{monoZone:true},
			});
		}else if(getURLParameter("googledoc") == "multizone"){
			envoieOptions({
				googleDoc:{monoZone:false},
			});	
		}else if(getURLParameter("dweb_option") == "bouton_bulle_vrai" || getURLParameter("dweb_option") == "bouton_bulle_faux"){
			dweb_option.bouton_bulle =  getURLParameter("dweb_option") == "bouton_bulle_vrai";
		}else if(getURLParameter("dweb_option") == "bouton_barre_vrai" || getURLParameter("dweb_option") == "bouton_barre_faux"){
			dweb_option.bouton_barre =  getURLParameter("dweb_option") == "bouton_barre_vrai";			
		}else if(getURLParameter("dweb_dblclic") == "vrai"){
			envoieOptions({
				infoDW:{dweb_option:{dblclic:true}},
			});	
		}else if(getURLParameter("dweb_dblclic") == "faux"){	
			envoieOptions({
				infoDW:{dweb_option:{dblclic:false}}
			});			
		}else if(getURLParameter("lab") == "vrai"){
			document.getElementById("lab_m").style.display = "block";
			cacher();
			document.getElementById("lab_m").style.boxShadow = "0 3px 0 #2496ff";
			document.getElementById("lab_p").style.display = "block";
		}else if(getURLParameter("aide") && getURLParameter("aide").length > 0){ //tex-3636
			document.getElementById("aide_m").style.display = "block";
			cacher();
			document.getElementById("aide_m").style.boxShadow = "0 3px 0 #2496ff";
			document.getElementById("aide_p").style.display = "block";
			if(getURLParameter("aide") == "dw"){
				document.getElementById("aide_dw").style.display = "block";
			}
		}else if(getURLParameter("bd") == "reinit"){
			monPort.postMessage({message:"bd_reinit"});
		}else if(getURLParameter("bd")){
			monPort.postMessage({message:"bd_nouveau", data: getURLParameter("bd")});
		}else if(getURLParameter("billetix") == "vrai"){
			monPort.postMessage({message:"ouvre_billetix"});
		}else if(getURLParameter("montre_erreur") == "vrai"){
			montreErreur=true;
		}else if(getURLParameter("capture") == "vrai" || getURLParameter("capture") == "faux"){
			capture = getURLParameter("capture") == "vrai";
			envoieOptions({
				capture:capture
			});
		}else if(getURLParameter("test") == "prod" || getURLParameter("test") == "beta" || getURLParameter("test") == "prebeta" || getURLParameter("test") == "preprod"){
			envoieOptions({
				changeServeur:getURLParameter("test")
			});
		}
	}

	//gestion connecteurs perimes
	if ( estGoogleChrome() || estMozillaWebExtension() ) {
		fureteur.management.getAll().then(donneLesExtensions);
	}

	if( estGoogleChrome() && donnees.infoConnecteur.manifest == 2 ){
		for (let m of document.getElementsByClassName("pour_chrome_mv2")) {
			m.style.display = "block";
		}
	}

	// if(beta_a12){
	// 	for (let m of document.getElementsByClassName("pour_beta_a12")) {
	// 		m.style.display = "block";
	// 	}
	// }


	if(estSafariWebex()){
		for (let m of document.getElementsByClassName("pour_safari")) {
			m.style.display = "block";
		}
	}

	metsTexte(document.getElementById('version_interne_val'), donnees.infoConnecteur.versionConnecteur+" ("+donnees.infoConnecteur.versionBuild+")");

	//traduction : menu contextuel
	metsTexte(document.getElementById('contextmenu_m'),gestionTraduction.Tr_(cstOptionConnecteurGC,""));
	metsTexte(document.getElementById('description_contextmenu'),gestionTraduction.Tr_(cstReglagesMenuContextuelDescription,""));
	metsTexte(document.getElementById('menuanti'),gestionTraduction.Tr_(cstOptionMenuAntidoteGC,""));
	metsTexte(document.getElementById('menucorr'),gestionTraduction.Tr_(cstOptionMenuCorrecteurGC,""));
	metsTexte(document.getElementById('menudict'),gestionTraduction.Tr_(cstOptionMenuDictGC,""));
	metsTexte(document.getElementById('menuguid'),gestionTraduction.Tr_(cstOptionMenuGuidesGC,""));

	//traduction : antidote web
	// metsTexte(document.getElementById('antidoteweb_m'),gestionTraduction.Tr_(cstReglagesAntidoWeb,""));
	metsTexte(document.getElementById('description_antidoteweb'),gestionTraduction.Tr_(cstReglagesAntidoWebDescription,""));
	metsTexte(document.getElementById('nouvelle_fenetre_aweb_label'),gestionTraduction.Tr_(cstOptionNouvelleFenetreAWeb,""));
	metsTexte(document.getElementById('nouvel_onglet_aweb_label'),gestionTraduction.Tr_(cstOptionNouvelOngletAWeb,""));
	metsTexte(document.getElementById('etat_aweb'),gestionTraduction.Tr_(cstEtatConnectayAWeb,""));

	//traduction : detecteurWeb
	metsTexte(document.getElementById('detecteurweb_m'),gestionTraduction.Tr_(cstReglagesDetecteurWeb,""));
	metsTexte(document.getElementById('description_detecteurweb'),gestionTraduction.Tr_(cstReglagesDetecteurWebDescription,""));
	metsTexte(document.getElementById('detecteurweb_label'),gestionTraduction.Tr_(cstReglagesDecteurWebActivation,""));
	metsTexte(document.getElementById('description_listeexclusion_detecteurweb'),gestionTraduction.Tr_(cstReglagesDetecteurWebListeExclusion,""));
	metsTexte(document.getElementById('dweb_beta_dev_label'),"Utiliser "+cstUrlAntidoteWeb);

	metsTexte(document.getElementById('detecteurweb_antioups_activation_label'),gestionTraduction.Tr_(cstReglagesDWAntiOupsActivation,""));
	// metsTexte(document.getElementById('detecteurweb_antioups_description'),gestionTraduction.Tr_(cstReglagesDWAntiOupsDescription,""));
	// document.getElementById('nouveau_antioups').placeholder = gestionTraduction.Tr_(cstReglagesDWAntiOupsAjout,"");

	metsTexte(document.getElementById('antidote_defaut_dweb_label'),gestionTraduction.Tr_(cstReglagesAntidoteDW,"")); //TODO Tr
	metsTexte(document.getElementById('antidote_local_dweb_label'),gestionTraduction.Tr_(cstUtiliser,"")+" Antidote "+cstNomIdAntidote[1]); //TODO Tr
	metsTexte(document.getElementById('antidote_web_dweb_label'),gestionTraduction.Tr_(cstUtiliser,"")+" Antidote "+cstNomIdAntidote[2]); //TODO Tr

	//traduction : a propos	
	metsTexte(document.getElementById('propos_m'),gestionTraduction.Tr_(cstReglagesAPropos,""));
	metsTexte(document.getElementById('description_propos'),gestionTraduction.Tr_(cstReglagesAProposDescription,""));
	metsTexte(document.getElementById('credit'),gestionTraduction.Tr_(cstReglagesCredit,""));
	metsTexte(document.getElementById('description_credit'),gestionTraduction.Tr_(cstReglagesCreditDescription,""));
	metsTexte(document.getElementById('titre_boite_adresse'),gestionTraduction.Tr_(cstReglagesAvance,""));

	//traduction : allez
	metsTexte(document.getElementById('bouton-go'),gestionTraduction.Tr_(cstNomBoutonAller,""));

	//traduction : antioups
	metsTexte(document.getElementById('traitesignature_label'),gestionTraduction.Tr_(cstOptionTraiteSignatureLabel,""));

	/** BETA */
	metsTexte(document.getElementById("beta"),gestionTraduction.Tr_(cstTexteBeta,""));
	// if(beta_a12 && !capture){
	// 	document.getElementById("beta").style.display = "block";
	// }

	//remettre les options
  	let optionMenuContextuel = donnees.choixMenuContextuel !== undefined ? donnees.choixMenuContextuel : 'menuanti';
	document.getElementById(optionMenuContextuel).checked = true;
  	let activationDetecteurWeb = donnees.infoDW !== undefined && donnees.infoDW.estActivay !== undefined ? donnees.infoDW.estActivay : true;
	document.getElementById("detecteurweb_activation").checked = activationDetecteurWeb && idAntidote != 0;
	document.getElementById("antioups_traitesignature").checked = donnees.antiOups.jeTraiteSignature;
	let choixOuvertureAWeb = donnees.choixOuvertureAWeb !== undefined ? donnees.choixOuvertureAWeb : 'nouvelle_fenetre';
	document.getElementById(choixOuvertureAWeb).checked = true;
	let devDWeb = donnees.infoDW !== undefined && donnees.infoDW.devDWeb !== undefined ? donnees.infoDW.devDWeb : 'dweb_defaut';
	document.getElementById(devDWeb).checked = true;
	let devAdressseDWeb = donnees.infoDW !== undefined && donnees.infoDW.devValAdresseDWeb !== undefined ? donnees.infoDW.devValAdresseDWeb : '';
	document.getElementById("nouvelle_adresse_dweb").value = devAdressseDWeb;
	document.getElementById("detecteurweb_antioups_activation").checked = donnees.infoDW !== undefined && donnees.infoDW.estActivayAntiOups !== undefined ? donnees.infoDW.estActivayAntiOups : false;
	if(donnees.infoDW.listeAntiOups){
		for(let adresseAntiOups of donnees.infoDW.listeAntiOups){
			let idAO = ajouteAdresseAntiOups(adresseAntiOups);
			dictAntiOups[idAO] = adresseAntiOups;
		}
	}

	if(donnees.infoDW.listeExclusion){
		for(let adresseExclue of donnees.infoDW.listeExclusion){
			let idEx = ajouteAdresseExlusion(adresseExclue);
			dictExclusions[idEx] = adresseExclue;
		}
	}

	if((donnees.log_erreur !== undefined && donnees.log_erreur.length>0) || montreErreur){
		document.getElementById("erreur_log_section").style.display = "block";
		document.getElementById("erreur_log_textarea").value = JSON.stringify(donnees.log_erreur,null,2);
	}

    let choixDWeb = donnees.infoDW.idAntidote;
    let aiguilleur =  donnees.idAntidote;
    
    let nomAntidote = "";
    switch(aiguilleur) {
        case 1:
        case 2:
            nomAntidote = "Antidote "+cstNomIdAntidote[aiguilleur];
            break;
        default :
            nomAntidote = gestionTraduction.Tr_(cstAConfirmer,"");  //Tr()  //TODO
    }
	metsTexte(document.getElementById('antidote_defaut_dweb_label'),gestionTraduction.Tr_(cstReglagesAntidoteDW,"")+" ("+nomAntidote+")");

    switch(choixDWeb) {
        case 1:
            document.getElementById('antidote_local_choix').checked = true;
          break;
        case 2:
            document.getElementById('antidote_web_choix').checked = true;
          break;
        case -1:
        default:
            document.getElementById('antidote_defaut_choix').checked = true;
    } 

    let antidoteLocalCompatible = donnees.infoDW.antidoteLocalCompatible;
    if(!antidoteLocalCompatible){
      document.getElementById('antidote_local_choix').disabled = true;
			document.getElementById('antidote_defaut_choix').parentNode.style.display="none";
			document.getElementById('antidote_web_choix').checked = true;
			metsTexte(document.getElementById('antidote_local_dweb_label'),gestionTraduction.Tr_("Utiliser","")+" Antidote "+cstNomIdAntidote[1]+" - "+gestionTraduction.Tr_("non disponible","")); //TODO Tr
    }

	//ajouter listener
	for (let m of document.getElementsByClassName("menu")) {
		m.addEventListener('click', function (e) {
			if (e.target.dataset.panneau != "") {
				if(!donnees.estModeiOS){
					cacher();
					document.getElementById(e.target.id).style.boxShadow = "0 3px 0 #2496ff";
				}
				document.getElementById(e.target.dataset.panneau).style.display = "block";
			}
		}, false);
	}

	// choix menu
	document.getElementById("choix_contextmenu").addEventListener('change', function (e) {
		let choixMenuContextuel = donneValeurRadio("choix_menu_contextuel");
		envoieOptions({
			choixMenuContextuel: choixMenuContextuel,
		});

	},false);

	// aweb : onglet vs fenetre
	document.getElementById("choix_antidoteweb").addEventListener('change', function (e) {
		let choixAWeb = donneValeurRadio("choix_aweb");
		envoieOptions({
			choixOuvertureAWeb : choixAWeb,
		});
	},false);

	// dweb : bureau vs aweb
	document.getElementById("choix_detecteurweb").addEventListener('change', function (e) {
		let choixDWeb = parseInt(donneValeurRadio("choix_dweb"));
		envoieOptions({
			infoDW : {
				idAntidote:choixDWeb
			}
		});
	},false);

	//dweb : activation
	document.getElementById("detecteurweb_activation").addEventListener('change',async function (e) {
		let activationDW = document.getElementById("detecteurweb_activation").checked;
		let idAntidoteRetour = donnees.idAntidote;
		if(donnees.idAntidote==cstIdAntidoteWebAConfirmer){
			let r = await afficheDialogue(
				{
					message : "dialogue",
					plateforme : donnees.plateforme,
					titre_dialogue : gestionTraduction.Tr_(cstMessageConfirmerAWeb,"") ,
					explication_dialogue : gestionTraduction.Tr_(cstExplicationConfirmerAWeb,""),
					bouton_ok : {texte_dialogue: gestionTraduction.Tr_(cstOui,""), retour: "ok"}, //
					bouton_annuler : {texte_dialogue:gestionTraduction.Tr_(cstNon,""), retour:"annulation"}
				});
				idAntidoteRetour = r ? cstIdAntidoteWebSolo : cstIdAntidoteBureau;
		}
		envoieOptions({
			idAntidote : idAntidoteRetour,
			infoDW : {
				estActivay:activationDW	
			}
		});
	},false);

	// anti-oups : activation
	document.getElementById("detecteurweb_antioups_activation").addEventListener('change', function (e) {
		envoieOptions({
			infoDW : {
				estActivayAntiOups : activationDWAntiOups
			}
		});
	},false);

	// anti-oups : signature antiOups.jeTraiteSignature
	document.getElementById("antioups_traitesignature").addEventListener('change', function (e) {
		let jeTraiteSignature = document.getElementById("antioups_traitesignature").checked;
		envoieOptions({
			antiOups : {
				jeTraiteSignature:jeTraiteSignature	
			}
		});
	},false);
		
	// anti-oups : liste 
	document.getElementById("ajoute").addEventListener('click',function(){
		const laListe = document.getElementById("antioups_detecteurweb");
		let entreeSelectionnee = laListe.querySelector(".selectionnee");
		if (entreeSelectionnee !== undefined && entreeSelectionnee !== null){
			entreeSelectionnee.classList.remove("selectionnee");
		}
		let nouvelleEntree = cree('div',{typeElement:"antioups", contentEditable:"true", class:"div_entree_liste_ajoutee selectionnee"});
		laListe.appendChild(nouvelleEntree);
		nouvelleEntree.focus();
		nouvelleEntree.addEventListener("keydown", e => {
			let nouvelAdresse = nouvelleEntree.textContent;
			if (e.keyCode === 13 && nouvelAdresse !== ""){
				nouvelleEntree.remove();
				let idAO = ajouteAdresseAntiOups(nouvelAdresse);
				dictAntiOups[idAO] = nouvelAdresse;
				envoieOptions({
					infoDW : {
						listeAntiOups : Object.values(dictAntiOups)
					}
				});
			}
			if (e.keyCode === 27) nouvelleEntree.remove();
		});
	},false);

	document.getElementById("enleve").addEventListener("click", () => {
		let entreeSelectionnee = document.getElementById("antioups_detecteurweb").querySelector(".selectionnee");
		if (entreeSelectionnee !== undefined && entreeSelectionnee !== null){
			retraitAdresse(entreeSelectionnee, dictAntiOups);
		}
	});

	// dweb : liste exclusion
	document.getElementById("ajoute_exclue").addEventListener('click',function(){
		const laListe = document.getElementById("listeexclusion_detecteurweb");
		let entreeSelectionnee = laListe.querySelector(".selectionnee");
		if (entreeSelectionnee !== undefined && entreeSelectionnee !== null){
			entreeSelectionnee.classList.remove("selectionnee");
		}
		let nouvelleEntree = cree('div',{typeElement:"listeexclusion", contentEditable:"true", class:"div_entree_liste_ajoutee selectionnee"});
		laListe.appendChild(nouvelleEntree);
		nouvelleEntree.focus();
		nouvelleEntree.addEventListener("keydown", e => {
			let nouvelAdresse = nouvelleEntree.textContent;
			if (e.keyCode === 13 && nouvelAdresse !== ""){
				nouvelleEntree.remove();
				let idEX = ajouteAdresseExlusion(nouvelAdresse);
				dictExclusions[idEX] = nouvelAdresse;
				envoieOptions({
					infoDW : {
						listeExclusion : Object.values(dictExclusions)
					}
				});
			}
			if (e.keyCode === 27) nouvelleEntree.remove();
		});
		nouvelleEntree.addEventListener("blur", e =>{
			let nouvelAdresse = nouvelleEntree.textContent;			
			nouvelleEntree.remove();
			let idEX = ajouteAdresseExlusion(nouvelAdresse);
			dictExclusions[idEX] = nouvelAdresse;
			envoieOptions({
				infoDW : {
					listeExclusion : Object.values(dictExclusions)
				}
			});
		});

	},false);

	document.getElementById("enleve_exclue").addEventListener("click", () => {
		let entreeSelectionnee = document.getElementById("listeexclusion_detecteurweb").querySelector(".selectionnee");
		if (entreeSelectionnee !== undefined && entreeSelectionnee !== null){
			retraitAdresse(entreeSelectionnee, dictExclusions);
		}
	});

	document.getElementById("bouton-valider").addEventListener('click', function (e) {
		//sauvegarder les options
		//- menu contextuel
		let choixMenuContextuel = donneValeurRadio("choix_menu_contextuel");
		let activationDW = document.getElementById("detecteurweb_activation").checked
		let jeTraiteSignature = document.getElementById("antioups_traitesignature").checked;
		let activationDWAntiOups = document.getElementById("detecteurweb_antioups_activation").checked;
		let choixAWeb = donneValeurRadio("choix_aweb");
		let choixDevDWeb = donneValeurRadio("choix_dweb_dev");
		let nouvAdressseDWeb = undefined;
		let valAdressseDWeb = document.getElementById("nouvelle_adresse_dweb").value;
		if(choixDevDWeb == "dweb_autre"){
			if (valAdressseDWeb == ""){
				nouvAdressseDWeb = "https://antidote.app/";
			}else{
				nouvAdressseDWeb = "https://"+valAdressseDWeb;
			}
		}
		let choixDWeb = parseInt(donneValeurRadio("choix_dweb"));
		envoieOptions({
			choixMenuContextuel: choixMenuContextuel,
			choixOuvertureAWeb : choixAWeb,
			infoDW : {
				activeLog : activeLog,
				idAntidote:choixDWeb,
				estActivay:activationDW,
				listeExclusion:Object.values(dictExclusions),
				devDWeb:choixDevDWeb,
				adresseDWeb:nouvAdressseDWeb,
				devValAdresseDWeb : valAdressseDWeb,
				dWebDevoilee : devoileDWeb,
				devDWebDevoilee : devoileDWebDev,
				estActivayAntiOups : activationDWAntiOups,
				listeAntiOups : Object.values(dictAntiOups),
				dweb_option : dweb_option
			},
			antiOups:{
				jeTraiteSignature:jeTraiteSignature
			},
			adresseAWeb:nouvAdressseDWeb
		});

		//fermer fenetre
		window.close();

	}, false);

	document.getElementById("bouton-go").addEventListener('click', function (e) {
		//fermer fenetre
		let uneOption = document.getElementById("barre_adresse").value.toLowerCase();
		if(estOptionValide(uneOption)){
			if(uneOption.substring(0,2)=="bd"){
				let arg = document.getElementById("barre_adresse").value.split("=")[1];
				uneOption = "bd="+arg;
			}
			let uneAdresseRacine = donnees.racine+"panneau/option.html?"+uneOption;
			window.location.replace(uneAdresseRacine);
		}else{
			//initaliser barre d'adresse
			document.getElementById("barre_adresse").value = "";
			document.getElementById("barre_adresse").placeholder = gestionTraduction.Tr_(cstOptionInvalide);
		}
	}, false);

	document.getElementById("barre_adresse").addEventListener("keydown", function(event) {
		if (event.key === "Enter") {
		  event.preventDefault();
		  document.getElementById("bouton-go").click();
		}
	},false);

	document.getElementById("bouton-supprime_erreur_log").addEventListener('click', function (e) {
		monPort.postMessage({message:"supprime_log_erreur"});
		document.getElementById("erreur_log_textarea").value = "";
	}, false);

	document.getElementById("extper_effacer").addEventListener('click', reponseEffacerExtension, false);

});