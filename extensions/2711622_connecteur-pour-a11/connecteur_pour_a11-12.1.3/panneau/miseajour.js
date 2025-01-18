/* Ce document est la propriété intellectuelle de Druide informatique inc. Toute reproduction ou publication est interdite. */
/* Copyright 2022 Druide informatique inc. */


//===========================================
// demandeDonnees
//===========================================
async function demandeDonnees() {
	var promesse = new Promise(function(resolution) {
		monPort = fureteur.runtime.connect({ name: "antidote-miseajour" });
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

document.addEventListener('DOMContentLoaded', async function () {

	let donnees = await demandeDonnees();

	gestionTraduction.initAvecConstante(cstDict);
	gestionTraduction.metsLaLangue(donnees.langue);

	//police
	const cheminAtkinsonFont = donneUrlFichier("ressources/WOFF2/Atkinson-Hyperlegible-Regular-102a.woff2")
	let atkinson_font = new FontFace('Atkinson Hyperlegible', 'url('+cheminAtkinsonFont+')');
	await atkinson_font.load();
	document.fonts.add(atkinson_font);
	document.body.style.fontFamily = '"Atkinson Hyperlegible"';

	//traduction : titre
	metsTexte(document.getElementById('titre'),gestionTraduction.Tr_(cstMajTitre,""));

	//traduction : bienvenue
	metsTexte(document.getElementById('maj'),gestionTraduction.Tr_(cstMajBienvenue,""));

});