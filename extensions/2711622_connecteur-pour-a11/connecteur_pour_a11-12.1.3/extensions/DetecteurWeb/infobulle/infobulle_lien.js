/* Ce document est la propriété intellectuelle de Druide informatique inc. Toute reproduction ou publication est interdite. */
/* Copyright 2023 Druide informatique inc. */

function envoieVersLumiere(msg){
	let C = new CustomEvent('message_dw',{ detail: msg }); 
	window.dispatchEvent(C);
}

function executerAntiinfobulle(ev, type, data){
	const idAppelant = document.getElementById("infobulle_").getAttribute("iddetecteurweb");
	const idPhrase = document.getElementById("infobulle_").shadowRoot.getElementById("info-bulle").getAttribute("idphrase");
	const idDetection = document.getElementById("infobulle_").shadowRoot.getElementById("info-bulle").getAttribute("iddetection");
	let unOuvrage;
	let unData = {};
	if( type == "afficherDicosSelonFragment" ){
		const ouvrage = data.ouvrage;
		const flex = decodeURIComponent( escape( window.atob(data.idMotFlexion)));
		console.log("flex",flex.split(""));
		const langue = flex.split("")[0];
		const mot = flex.split("").slice(-1).pop();	
		unOuvrage = ouvrage;
		unData = {mot:mot, langue:langue};
	}else if( type == "afficherGuides" ){
		unOuvrage = "guides";
		unData = data;
	}
	envoieVersLumiere( {message:"lanceOutilDetecteurWeb", ouvrage:unOuvrage, data:unData, idAppelant: idAppelant, idDetection: idDetection, idPhrase:idPhrase});
}
function executerDevoilement(event, lien)
{
	if (lien.classList.contains("fermay")) {
		lien.previousSibling.style.display = "block";
		lien.classList.remove("fermay");
		lien.removeChild(lien.lastChild);
	} else {

	}
	executerAntiinfobulle(event, 'redimensionner', {});
}