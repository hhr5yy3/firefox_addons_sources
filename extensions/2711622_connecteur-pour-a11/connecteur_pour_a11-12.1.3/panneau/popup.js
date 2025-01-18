
/* Ce document est la propriété intellectuelle de Druide informatique inc. Toute reproduction ou publication est interdite. */
/* Copyright 2023 Druide informatique inc. */

// const cheminAtkinsonFont = donneUrlFichier("ressources/WOFF2/Atkinson-Hyperlegible-Regular-102a.woff2")
// var atkinson_font = new FontFace('Atkinson Hyperlegible', 'url('+cheminAtkinsonFont+')');
// atkinson_font.load().then(function(loaded_face) {
// 	document.fonts.add(loaded_face);
// }).catch(function(error) {
// });

let dictionnairesAffiches = false;
let guidesAffiches = false;
let etat = false;
let etatMessage = "";
let jeMontreListe = false;

//===================================================

let monPort = null;

function envoieReponseSansFermer(msg) {
	monPort.postMessage(msg);
}

function envoieReponse(msg) {
	envoieReponseSansFermer(msg);
	window.setTimeout(function(){
		window.close()
	},500);

}

async function demandeDonnees() {
	var promesse = new Promise(function(resolution) {
		monPort = fureteur.runtime.connect({ name: "antidote-popup" });
		monPort.onMessage.addListener(function(m){
			if(!estVide(m)){
				if(m.message == "_dib01"){
					monPort.postMessage({message:"demandeDonnees"})
				}else{
					resolution(m);
				}
			}
		});
	});
	return promesse;
}


function LanceOutil (outil) {
	envoieReponse({message:"lanceOutil", outil:outil});
};

function LanceCorrecteur(){
	LanceOutil("C0");
};

function LanceDictionnaire(){
	if(!jeMontreListe)
		LanceOutil("D0");
};

function LanceGuide(){
	if(!jeMontreListe)
		LanceOutil("G0");
};

function OuvreReglages(){
	envoieReponse({message:"ouvreReglages"});
}

function OuvreDagda(){
	envoieReponse({message:"ouvreDagda"});
}

function OuvreAWeb(){
	envoieReponse({message:"ouvreAWebConnexion"});
}

function OuvreAide(){ //tex-3636
	envoieReponse({message:"ouvreAide"});
}

function ReactiveDW(){
	envoieReponse({message:"reactiveDW"});
}

function SupprimeDW(){
	envoieReponse({message:"supprimeDW"});
}

function ExclureSite(){
	envoieReponseSansFermer({message:"exclusSite"});
}

function InclureSite(){
	envoieReponseSansFermer({message:"inclusSite"});
}

function IndiqueChamp(){
	envoieReponseSansFermer({message:"indiqueChamp",etat:true});
}

function FinIndiqueChamp(){
	envoieReponseSansFermer({message:"indiqueChamp",etat:false});
}

function Reconnexion(){

};

function MontreDictionnaires(){
	jeMontreListe = true;
	const estModeSombre = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
	if(!dictionnairesAffiches){
		if (estModeSombre) {
			document.querySelector(".div_popup_dictionnaires").style.backgroundColor = "rgb(63, 63, 65)";
		}
		else {
			document.querySelector(".div_popup_dictionnaires").style.backgroundColor = "#dfeefd";
		}
		document.querySelector(".div_popup_guides").style.removeProperty("background-color");
		document.getElementById("DICT").style.display = "block"; 
		document.getElementById("D0").classList.add("bouton_popup_ouvert");
		document.getElementById("D_chevron").style.transform="rotate(90deg)";
		document.getElementById("GUIDE").style.display = "none"; 
		document.getElementById("G0").classList.remove("bouton_popup_ouvert");
		document.getElementById("G_chevron").style.opacity="1";
		document.getElementById("G_chevron").style.transform="rotate(0deg)";
		dictionnairesAffiches=true;
		guidesAffiches=false;
	}else{
		document.getElementById("D0").classList.remove("bouton_popup_ouvert");
		document.querySelector(".div_popup_dictionnaires").style.removeProperty("background-color");
		document.getElementById("DICT").style.display = "none"; 
		document.getElementById("D_chevron").style.transform="rotate(0deg)";
		dictionnairesAffiches=false;
	}
};

function MontreGuides(){
	jeMontreListe = true;
	const estModeSombre = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
	if(!guidesAffiches){
		if (estModeSombre) {
			document.querySelector(".div_popup_guides").style.backgroundColor = "rgb(63, 63, 65)";
		}
		else {
			document.querySelector(".div_popup_guides").style.backgroundColor = "#dfeefd";
		}
		document.querySelector(".div_popup_dictionnaires").style.removeProperty("background-color");
		document.getElementById("DICT").style.display = "none"; 
		document.getElementById("D0").classList.remove("bouton_popup_ouvert"); 
		document.getElementById("D_chevron").style.transform="rotate(0deg)";
		document.getElementById("GUIDE").style.display = "block"; 
		document.getElementById("G0").classList.add("bouton_popup_ouvert");
		document.getElementById("G_chevron").style.transform="rotate(90deg)";

		guidesAffiches=true;
		dictionnairesAffiches=false;
	}else{
		document.getElementById("G0").classList.remove("bouton_popup_ouvert");
		document.querySelector(".div_popup_guides").style.removeProperty("background-color");
		document.getElementById("GUIDE").style.display = "none"; 
		document.getElementById("G_chevron").style.transform="rotate(0deg)";
		guidesAffiches=false;
	}
};

function traiterConfigMenu(laListe){
	for (var i in laListe){
		var uneLigne = laListe[i].split("/");
		_dict[uneLigne[8]]=uneLigne[2];
	}
};

function modifieSite(element, valeur, clic){
	const curseur = document.getElementById("curseur_site");
	if (parseInt(valeur) > 2) element.value = "2";
	const box = element.getBoundingClientRect();
	if (clic === undefined) {
		curseur.style.transition = "0s";
		element.style.transition = "0s";
	}
	curseur.style.marginLeft = `${(parseInt(valeur)-1) * (box.width/2)}px`;
	if (valeur == "1"){ 
		element.classList.add("bascule_desactivee");
		document.getElementById('activer_dw').disabled=true;
		document.getElementById("reglages_alertes").disabled=true;
		document.getElementById("section_zone_ignoree").disabled=true;
		document.getElementById('dw').classList.add("image_desactivee");
		document.getElementById('alertes').classList.add("image_desactivee");
		document.getElementById("section_zone_ignoree").classList.add("image_desactivee");

	} else {
		element.classList.remove("bascule_desactivee");	
		document.getElementById('activer_dw').disabled=false;
		document.getElementById("reglages_alertes").disabled=false;
		document.getElementById("section_zone_ignoree").disabled=false;
		document.getElementById('dw').classList.remove("image_desactivee");
		document.getElementById('alertes').classList.remove("image_desactivee");
		document.getElementById("section_zone_ignoree").classList.remove("image_desactivee");
	}
	if (clic === undefined) setTimeout(()=>{
		curseur.style.removeProperty("transition");
		element.style.removeProperty("transition");
	},500);
};

function modifieAlerte(element, valeur, clic){
	const curseur = document.getElementById("curseur_alerte");
	if (parseInt(valeur) > 2) element.value = "2";
	const box = element.getBoundingClientRect();
	if (clic === undefined) {
		curseur.style.transition = "0s";
		element.style.transition = "0s";
	}
	curseur.style.marginLeft = `${(parseInt(valeur)-1) * (box.width/2)}px`;
	if (clic === undefined) setTimeout(()=>{
		curseur.style.removeProperty("transition");
		element.style.removeProperty("transition");
	},500);
	if (valeur == "1") element.classList.add("bascule_desactivee");
	else element.classList.remove("bascule_desactivee");
};

function modifieDWActivation(element, valeur, clic){
	document.getElementById('section_detecteurweb').style.display = 'block';
	const curseurDW = document.getElementById("curseur_dw");
	const boxDW = element.getBoundingClientRect();
	if (clic === undefined){
		curseurDW.style.transition = "0s";
		element.style.transition = "0s";
	}
	if (valeur == "1") {
		element.classList.add("bascule_desactivee");
		document.querySelector("#alertes").style.display="none";
		document.querySelector("#section_zone_ignoree").style.display="none";
		document.querySelector("#site").style.display="none";
	}
	else {
		element.classList.remove("bascule_desactivee");
		document.querySelector("#alertes").style.removeProperty("display");
		document.querySelector("#site").style.removeProperty("display");
		document.querySelector("#section_zone_ignoree").style.display="block";
		modifieAlerte(document.getElementById('reglages_alertes'), document.getElementById('reglages_alertes').value);
	}
	curseurDW.style.marginLeft = `${(parseInt(valeur)-1) * boxDW.width/2}px`;
	if (clic === undefined){
		setTimeout(()=>{
			curseurDW.style.removeProperty("transition");
			element.style.removeProperty("transition");
		},500);
	}
}


async function actionAuChargement() {

	if(estGoogleChrome()){
		document.body.style.width="350px";
	}
	
	var privee = false;
	if(!estThunderbird())privee = fureteur.extension.inIncognitoContext;
	let donnees = await demandeDonnees();

	let items = donnees.data;
	gestionTraduction.initAvecConstante(cstDict);
	gestionTraduction.metsLaLangue(items.langueAffichage);
	
	if(donnees.ouvrierEndormi){
		metsTexte(document.getElementById("recharge"),gestionTraduction.Tr_(cstRechargePage,""));
		document.getElementById("recharge").style.display="block";
		donnees = await demandeDonnees();
	}
	
	if(items.estModeiOS!== undefined && items.estModeiOS){
		if(items.appareil == "iPhone"){
			document.body.style.width = "100vw";
			document.body.style.padding = "0 15px";
			document.body.style.margin = "10px 0";
			document.body.style.boxSizing = "border-box";
		}
	}
	
	document.getElementById("reglages_popup").src = "../images/reglages22x22.svg";
	document.getElementById("aide_popup").src = "../images/aide22x22.svg";

	//if(!estThunderbird() && !items.capture) document.getElementById("section_billetix").style.display = "block";

	if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
		document.getElementById("aide_popup").src = "../images/aide-sombre22x22.svg";
		document.getElementById("reglages_popup").src = "../images/reglages-sombre22x22.svg";
		for(let c of document.getElementsByClassName("img_chevron")){
			c.src="../images/chevron-cercle-droite-sombre16x16.svg";
		}
	}

	if(estAntidoteWeb(items.idAntidote)){
		document.getElementById("t2").textContent = "Antidote Web";
		if(donnees.estPageOK && !items.estAWebConnectay){
			document.getElementById("aweb_connexion_section").style.display = "block"; 
			metsTexte(document.getElementById("aweb_connexion"),gestionTraduction.Tr_(cstAWebNonConnectay,""));
			document.getElementsByClassName('parent_popup')[0].style.display = "none";
			document.getElementById('section_detecteurweb').style.display = 'none';
		}
	}else{
		if(donnees.estPageOK && !items.estAntidoteActif){
			document.getElementById("antidote_activation_section").style.display = "block"; 
			metsTexte(document.getElementById("antidote_activation"),gestionTraduction.Tr_(cstAntidoteNonActivay,""));
			document.getElementsByClassName('parent_popup')[0].style.display = "none";
			document.getElementById('section_detecteurweb').style.display = 'none';
		}
		document.getElementById("t2").textContent = "Antidote"; 
	}

	document.getElementById('C0').addEventListener('click', LanceCorrecteur);
	document.getElementById('D0').addEventListener('click', LanceDictionnaire);
	document.getElementById('G0').addEventListener('click', LanceGuide); 
	document.getElementById('C0i').addEventListener('click', LanceCorrecteur);
	document.getElementById('D0i').addEventListener('click', LanceDictionnaire);
	document.getElementById('G0i').addEventListener('click', LanceGuide); 
	document.getElementById('D_Liste').addEventListener('click', MontreDictionnaires);
	document.getElementById('G_Liste').addEventListener('click', MontreGuides);  

	if((!donnees.estPageOK)){
		document.getElementById('C0').classList.remove("bouton_popup_activay");
		document.getElementById('D0').classList.remove("bouton_popup_activay");
		document.getElementById('G0').classList.remove("bouton_popup_activay");

		document.getElementById('C0').classList.add("bouton_popup_desactivay");
		document.getElementById('D0').classList.add("bouton_popup_desactivay");
		document.getElementById('G0').classList.add("bouton_popup_desactivay");


		document.getElementById('C0').classList.add("image_desactivee");
		document.getElementById('D0').classList.add("image_desactivee");
		document.getElementById('G0').classList.add("image_desactivee");

		document.getElementById('C0').style.opacity = "1.0";
		document.getElementById('D0').style.opacity = "1.0";
		document.getElementById('G0').style.opacity = "1.0";

		document.getElementById('C0').removeEventListener('click', LanceCorrecteur);
		document.getElementById('D0').removeEventListener('click', LanceDictionnaire);
		document.getElementById('G0').removeEventListener('click', LanceGuide); 
		document.getElementById('C0i').removeEventListener('click', LanceCorrecteur);
		document.getElementById('D0i').removeEventListener('click', LanceDictionnaire);
		document.getElementById('G0i').removeEventListener('click', LanceGuide); 
		document.getElementById('D_Liste').removeEventListener('click', MontreDictionnaires);
		document.getElementById('G_Liste').removeEventListener('click', MontreGuides);   

	}else{
		let idAntidote = items.idAntidote;
		if(idAntidote == cstIdAntidoteWebAConfirmer) idAntidote = 0;
		if( idAntidote >= 0 && items.infoDW.activation[idAntidote].disponible && items.infoDW.activation[idAntidote].active &&  !estThunderbird()){
			if(items.infoDW !== undefined && items.infoDW.dWebDevoilee){
				let etat = items.infoDW.estActivay && idAntidote != 0;
				let contenantDW = document.getElementById("activer_dw");
				etat ? contenantDW.value = 2 : contenantDW.value = 1;
				document.getElementById('reglages_alertes').value = items.infoDW.niveauAlerte;
				modifieAlerte(document.getElementById("reglages_alertes"), items.infoDW.niveauAlerte);
				modifieDWActivation(contenantDW, contenantDW.value);
			}

			if(donnees.estPageAutorisee !== undefined){
				if(!donnees.estPageAutorisee){
					document.getElementById('activer_dw').disabled=true;
					document.getElementById('dw').classList.add("image_desactivee");
					modifieDWActivation(document.getElementById('activer_dw'), document.getElementById('activer_dw').value);

					document.querySelector("#alertes").style.display="none";
					document.querySelector("#section_zone_ignoree").style.display="none";
				}else{
					document.getElementById('activer_dw').disabled=false;
					document.getElementById('dw').classList.remove("image_desactivee");
				}
				donnees.estPageAutorisee ? document.getElementById("reglages_site").value = 2 : document.getElementById("reglages_site").value = 1;
				modifieSite(document.getElementById("reglages_site"), document.getElementById("reglages_site").value);
			}

			if(donnees.champCE !== undefined && donnees.champCE){
				if(donnees.champCE.id==""){
					document.getElementById("section_zone_ignoree").classList.remove("bouton_popup_activay");
					document.getElementById("section_zone_ignoree").classList.add("image_desactivee");
				}else{
					document.getElementById("section_zone_ignoree").classList.add("bouton_popup_activay");
					document.getElementById("section_zone_ignoree").classList.remove("image_desactivee");
		
					if(donnees.champCE.actif){
						document.getElementById("ce_supprimer").style.display = "block";
						document.getElementById("ce_reactiver").style.display = "none";
					}else{
						document.getElementById("ce_supprimer").style.display = "none";
						document.getElementById("ce_reactiver").style.display = "block";
					}
		
					document.getElementById('ce_supprimer').addEventListener('click',SupprimeDW,false);
					document.getElementById('ce_reactiver').addEventListener('click',ReactiveDW,false);
					document.getElementById('section_zone_ignoree').addEventListener('pointerenter',IndiqueChamp,false);
					document.getElementById('section_zone_ignoree').addEventListener('pointerleave',FinIndiqueChamp,false);
				}
			}
		}
	}

	if(donnees.estOffice365Online !== undefined && donnees.estOffice365Online){
		document.body.style.width="";
		document.body.style.width="300px";

		document.getElementById("popup_antidote").style.display = "none";
		document.getElementById("message_office365").style.display = "block";

		let message = gestionTraduction.UniFmt(cstMessageOffice365Online,gestionTraduction.ConvertisIndexLangueALangueIso(gestionTraduction.DonneIndexLangue()));
		document.getElementById("message_office365_message").removeChild(document.getElementById("message_office365_message").lastChild);
		let divMessage = document.createElement("div");
		divMessage.appendChild(document.createTextNode(message));
		document.getElementById("message_office365_message").appendChild(divMessage);
	}

	if( cstChaineNomFureteur == "MozillaWebExtension" && privee ){
		document.getElementById("popup_antidote").style.display = "none";
		document.getElementById("message_incognito").style.display = "block";
		document.body.style.width="300px";
		let titre = document.createElement("H2");
		titre.appendChild(document.createTextNode(gestionTraduction.Tr_(cstMessageIncognitoTitre,"")));
		let message = document.createElement("DIV");
		message.appendChild(document.createTextNode(gestionTraduction.Tr_(cstMessageIncognitoSolution,"")));
		let n = document.createElement("DIV");
		document.getElementById("message_incognito_message").appendChild(titre);
		document.getElementById("message_incognito_message").appendChild(message);
	}

	traiterConfigMenu(configMenuDefaut[gestionTraduction.maLangueString]);

	// metsTexte(document.getElementById("t1"), gestionTraduction.Tr_(cstOptionConnecteurGC,""));
	document.getElementById("C0").setAttribute("title",gestionTraduction.Tr_(cstPopupAntidoteCorrecteurGC,"")); 
	document.getElementById("D0").setAttribute("title",gestionTraduction.Tr_(cstPopupAntidoteDictGC,""));   ;
	document.getElementById("G0").setAttribute("title",gestionTraduction.Tr_(cstPopupAntidoteGuidesGC,"")); 
	document.getElementById("R0").setAttribute("title",gestionTraduction.Tr_(cstPopupAntidoteRegalge,"")); 
	document.getElementById("A0").setAttribute("title", gestionTraduction.Tr_(cstReglagesAide,""));

	metsTexte(document.getElementById("C0l"),_dict['C0']);
	metsTexte(document.getElementById("D0l"),_dict['D0']);
	metsTexte(document.getElementById("G0l"),_dict['G0']);
	// metsTexte(document.getElementById("R0l"),gestionTraduction.Tr_(cstPopupAntidoteRegalge,"")+"...");

	//*** DETECEURWEB TEX-1555 ***/
	// metsTexte(document.getElementById("titre_dw"),gestionTraduction.Tr_(cstDWDetecteurWeb,""));
	metsTexte(document.getElementById("label_alerte"), gestionTraduction.Tr_(cstDWAfficheAlertes,""));
	metsTexte(document.getElementById("label_activer_dw"),gestionTraduction.Tr_(cstReglagesDecteurWebActivation,""));
	metsTexte(document.getElementById("ce_reactiver"),gestionTraduction.Tr_(cstDWReactiver,""));
	metsTexte(document.getElementById("ce_supprimer"),gestionTraduction.Tr_(cstDWSupprimer,""));
	metsTexte(document.getElementById("label_site"),gestionTraduction.Tr_(cstDWReglageSite,""));
	metsTexte(document.getElementById("soumettre_une_observation"),gestionTraduction.Tr_(cstSoumettreUneObservation,""));

	/** BETA */
	// metsTexte(document.getElementById("beta"),gestionTraduction.Tr_(cstTexteBeta,""));
	// if( items.beta_a12 && !items.capture ){
	// 	document.getElementById("beta").style.display = "block";
	// }

	//****** DICT ******//
	metsTexte(document.getElementById("D1"),_dict['D1']); 
	document.getElementById('D1').addEventListener('click', 
			function onclick(ev){
				LanceOutil(document.getElementById('D1').getAttribute("id"));
		}
	);

	metsTexte(document.getElementById("D2"),_dict['D2']); 
	document.getElementById('D2').addEventListener('click', 
			function onclick(ev){
				LanceOutil(document.getElementById('D2').getAttribute("id"));
		}
	);

	if(document.getElementById('D3')){
		if(_dict['D3']){
			metsTexte(document.getElementById("D3"),_dict['D3']);
			document.getElementById('D3').addEventListener('click', 
					function onclick(ev){
						LanceOutil(document.getElementById('D3').getAttribute("id"));
				}
			);
		}else{
			var table = document.getElementById('DICT');
			if(document.getElementById('D3tr')){
				var index = document.getElementById('D3tr').rowIndex;
				table.deleteRow(index);
			}
		}
	}

	metsTexte(document.getElementById("D5"),_dict['D5']); 
	document.getElementById('D5').addEventListener('click', 
			function onclick(ev){
				LanceOutil(document.getElementById('D5').getAttribute("id"));
		}
	);

	metsTexte(document.getElementById("D13"),_dict['D13']); 
	document.getElementById('D13').addEventListener('click', 
			function onclick(ev){
				LanceOutil(document.getElementById('D13').getAttribute("id"));
		}
	);

	metsTexte(document.getElementById("D10"),_dict['D10']); 
	document.getElementById('D10').addEventListener('click', 
			function onclick(ev){
				LanceOutil(document.getElementById('D10').getAttribute("id"));
		}
	);

	metsTexte(document.getElementById("D6"),_dict['D6']);
	document.getElementById('D6').addEventListener('click', 
			function onclick(ev){
				LanceOutil(document.getElementById('D6').getAttribute("id"));
		}
	);

	metsTexte(document.getElementById("D8"),_dict['D8']);
	document.getElementById('D8').addEventListener('click', 
			function onclick(ev){
				LanceOutil(document.getElementById('D8').getAttribute("id"));
		}
	);

	metsTexte(document.getElementById("D11"),_dict['D11']); 
	document.getElementById('D11').addEventListener('click', 
			function onclick(ev){
				LanceOutil(document.getElementById('D11').getAttribute("id"));
		}
	);

	metsTexte(document.getElementById("D14"),_dict['D14']); 
	document.getElementById('D14').addEventListener('click', 
			function onclick(ev){
				LanceOutil(document.getElementById('D14').getAttribute("id"));
		}
	);

	//****** GUIDES ******//

	metsTexte(document.getElementById("G1"),_dict['G1']); 
	document.getElementById('G1').addEventListener('click', 
			function onclick(ev){
				LanceOutil(document.getElementById('G1').getAttribute("id"));
		}
	);

	metsTexte(document.getElementById("G2"),_dict['G2']);
	document.getElementById('G2').addEventListener('click', 
			function onclick(ev){
				LanceOutil(document.getElementById('G2').getAttribute("id"));
		}
	);

	metsTexte(document.getElementById("G3"),_dict['G3']); 
	document.getElementById('G3').addEventListener('click', 
			function onclick(ev){
				LanceOutil(document.getElementById('G3').getAttribute("id"));
		}
	);

	metsTexte(document.getElementById("G4"),_dict['G4']); 
	document.getElementById('G4').addEventListener('click', 
			function onclick(ev){
				LanceOutil(document.getElementById('G4').getAttribute("id"));
		}
	);

	metsTexte(document.getElementById("G5"),_dict['G5']); 
	document.getElementById('G5').addEventListener('click', 
			function onclick(ev){
				LanceOutil(document.getElementById('G5').getAttribute("id"));
		}
	);

	metsTexte(document.getElementById("G6"),_dict['G6']); 
	document.getElementById('G6').addEventListener('click', 
			function onclick(ev){
				LanceOutil(document.getElementById('G6').getAttribute("id"));
		}
	);

	metsTexte(document.getElementById("G7"),_dict['G7']); 
	document.getElementById('G7').addEventListener('click', 
			function onclick(ev){
				LanceOutil(document.getElementById('G7').getAttribute("id"));
		}
	);

	metsTexte(document.getElementById("G8"),_dict['G8']); 
	document.getElementById('G8').addEventListener('click', 
			function onclick(ev){
				LanceOutil(document.getElementById('G8').getAttribute("id"));
		}
	);

	metsTexte(document.getElementById("G13"),_dict['G13']); 
	document.getElementById('G13').addEventListener('click', 
			function onclick(ev){
				LanceOutil(document.getElementById('G13').getAttribute("id"));
		}
	);

	metsTexte(document.getElementById("G11"),_dict['G11']);
	document.getElementById('G11').addEventListener('click', 
			function onclick(ev){
				LanceOutil(document.getElementById('G11').getAttribute("id"));
		}
	);
	
	if(document.getElementById('G9')){
		if(_dict['G9']){
			metsTexte(document.getElementById("G9"),_dict['G9']); 
			document.getElementById('G9').addEventListener('click', 
					function onclick(ev){
						LanceOutil(document.getElementById('G9').getAttribute("id"));
				}
			);
		}else{
			var table = document.getElementById('GUIDE');
			if(document.getElementById('G9tr')){
				index = document.getElementById('G9tr').rowIndex;
				table.deleteRow(index);
			}
		}
	}
	
	document.getElementById("DICT").style.display= "none"; 
	document.getElementById("GUIDE").style.display= "none"; 
	document.getElementById('R0')
		  .addEventListener('click', OuvreReglages); 

	document.getElementById('activer_dw').addEventListener('mousedown',function(ec){
		const contenant = document.getElementById("activer_dw");
		const valeur = parseInt(contenant.value) < 2 ? 2 : 1;
		contenant.value = `${valeur}`;
		if(valeur==2){
			document.getElementById("reglages_site").value = donnees.estPageAutorisee ? 2 : 1;
			setTimeout(()=>{
				modifieSite(document.getElementById("reglages_site"), document.getElementById("reglages_site").value, ec);
			},10);
		}
		modifieDWActivation(contenant, contenant.value, ec);
		envoieReponseSansFermer({message:"changeEtatDW", etat:valeur==2?true:false});
	},false);
	document.getElementById('reglages_alertes').addEventListener('mousedown',function(ec){ //tex-3636
		let element = document.getElementById('reglages_alertes');
		parseInt(element.value) < 2 ? element.value = "2" : element.value = "1";
		modifieAlerte(element, element.value, ec);
		envoieReponseSansFermer({message:"changeNiveauAlerte", niveau_alerte:parseInt(element.value)});
	},false);
	document.getElementById('reglages_site').addEventListener('mousedown',function(ec){ 
		let element = document.getElementById('reglages_site');
		const valeur = parseInt(element.value) < 2 ? 2 : 1;
		element.value = `${valeur}`;
		if(valeur == 2){
			InclureSite();
		}else{
			ExclureSite();
		}
		setTimeout(()=>{
			modifieSite(element, element.value, ec);
		},10);
	},false);	
	document.getElementById('soumettre_une_observation').addEventListener('click',OuvreDagda,false);
	document.getElementById('aweb_connexion').addEventListener('click',OuvreAWeb,false);
	document.getElementById('antidote_activation').addEventListener('click',LanceDictionnaire,false);
	document.getElementById('ce_supprimer').addEventListener('click',SupprimeDW,false);
	document.getElementById('ce_reactiver').addEventListener('click',ReactiveDW,false);
	document.getElementById('aide_popup').addEventListener('click',OuvreAide,false); //tex-3636
}

document.addEventListener('DOMContentLoaded', async function () {
	actionAuChargement();
});


fureteur.runtime.onMessage.addListener(function(m){
	//console.log("ONMESSAGE");
	if(m.message=="reconnexion-onglet"){
		actionAuChargement();
	}
});

