/* Ce document est la propriété intellectuelle de Druide informatique inc. Toute reproduction ou publication est interdite. */
/* Copyright 2022 Druide informatique inc. */


let monPort = null;
//===========================================
// envoieOptions
//===========================================
function envoieOptions(message) {
    monPort.postMessage(message);
}

//===========================================
// demandeDonnees
//===========================================
async function demandeDonnees() {
	var promesse = new Promise(function(resolution) {
		monPort = fureteur.runtime.connect({ name: "antidote-installation" });
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
// 
//===========================================
document.addEventListener('DOMContentLoaded', async function () {

	function getURLParameter(name) {
		return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
  }

	let donnees = await demandeDonnees();

	//console.log("Donnees", donnees);

	gestionTraduction.initAvecConstante(cstDict);
	gestionTraduction.metsLaLangue(donnees.langue);

	//police
	const cheminAtkinsonFont = donneUrlFichier("ressources/WOFF2/Atkinson-Hyperlegible-Regular-102a.woff2")
	let atkinson_font = new FontFace('Atkinson Hyperlegible', 'url('+cheminAtkinsonFont+')');
	await atkinson_font.load();
	document.fonts.add(atkinson_font);
	document.body.style.fontFamily = '"Atkinson Hyperlegible"';

	//gestion connecteurs perimes
	// if (cstChaineNomFureteur == "GoogleChrome" || cstChaineNomFureteur == "MozillaWebExtension") {
	// 	fureteur.management.getAll(donneLesExtensions);
	// }

	//traduction : titre
	metsTexte(document.getElementById('titre'),gestionTraduction.Tr_(cstInstallationTitre,""));

	//traduction : bienvenue
	metsTexte(document.getElementById('bienvenue'),gestionTraduction.Tr_(cstInstallationBienvenue,""));

	//traduction : antidote web
	metsTexte(document.getElementById('description_antidoteweb'),gestionTraduction.Tr_(cstReglagesAntidoWebDescription,""));
	metsTexte(document.getElementById('nouvelle_fenetre_aweb_label'),gestionTraduction.Tr_(cstOptionNouvelleFenetreAWeb,""));
	metsTexte(document.getElementById('nouvel_onglet_aweb_label'),gestionTraduction.Tr_(cstOptionNouvelOngletAWeb,""));

	// //traduction : detecteurWeb
	metsTexte(document.getElementById('description_detecteurweb'),gestionTraduction.Tr_(cstReglagesDetecteurWebDescription,""));
	metsTexte(document.getElementById('antidote_defaut_dweb_label'),gestionTraduction.Tr_(cstReglagesAntidoteDW,"")); //TODO Tr
	metsTexte(document.getElementById('antidote_local_dweb_label'),gestionTraduction.Tr_(cstUtiliser,"")+" Antidote "+cstNomIdAntidote[1]); //TODO Tr
	metsTexte(document.getElementById('antidote_web_dweb_label'),gestionTraduction.Tr_(cstUtiliser,"")+" Antidote "+cstNomIdAntidote[2]); //TODO Tr
	metsTexte(document.getElementById('desactiver_dweb_label'),gestionTraduction.Tr_(cstReglagesDecteurWebDesactivation,"")); //TODO Tr

	// //traduction : bouton
	metsTexte(document.getElementById('bouton-annuler'),gestionTraduction.Tr_(cstNomBoutonAnnuler,""));
	metsTexte(document.getElementById('bouton-reglages'),gestionTraduction.Tr_(cstPopupAntidoteRegalgeBouton,"")+" ...");

	// //remettre les options
    let choixDWeb = donnees.infoDW.idAntidote;
    let aiguilleur =  donnees.idAntidote;
    
    let nomAntidote = "";
    console.log("AIGUILLEUR",aiguilleur);
    switch(aiguilleur) {
        case 1:
        case 2:
            nomAntidote = "Antidote "+cstNomIdAntidote[aiguilleur];
            break;
        default :
            nomAntidote = gestionTraduction.Tr_(cstAConfirmer,"");  //Tr()  //TODO
    }

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
            metsTexte(document.getElementById('antidote_defaut_dweb_label'),gestionTraduction.Tr_(cstReglagesAntidoteDW,"")+" ("+nomAntidote+")"); //TODO Tr
      } 

	let choixOuvertureAWeb = donnees.choixOuvertureAWeb !== undefined ? donnees.choixOuvertureAWeb : 'nouvelle_fenetre';
	document.getElementById(choixOuvertureAWeb).checked = true;

    let antidoteLocalCompatible = donnees.infoDW.antidoteLocalCompatible;
    if(!antidoteLocalCompatible){
		document.getElementById('antidote_defaut_choix').parentNode.style.display="none";
    	document.getElementById('desactiver_dw_choix').parentNode.style.display="block";
    	document.getElementById('desactiver_dw_choix').checked=true;
        document.getElementById('antidote_local_choix').disabled = true;
        metsTexte(document.getElementById('antidote_local_dweb_label'),gestionTraduction.Tr_("Utiliser Antidote 11","")+" "+gestionTraduction.Tr_("(Non disponible)","")); //TODO Tr
    }

	document.getElementById("bouton-valider").addEventListener('click', function (e) {
		//sauvegarder les options
		let choixAWeb = donneValeurRadio("choix_aweb");
		let choixDWeb = parseInt(donneValeurRadio("choix_dweb"));

		envoieOptions({message:"nouvellesDonnees", _dib84:{
			choixOuvertureAWeb : choixAWeb,
			infoDW : {
                idAntidote : choixDWeb
			}
		}});

		//fermer fenetre
		window.close();

	}, false);

	document.getElementById("bouton-annuler").addEventListener('click', function (e) {
		//fermer fenetre
		window.close();
	}, false);


	document.getElementById("bouton-reglages").addEventListener('click', function (e) {
		fureteur.runtime.openOptionsPage();
	}, false);

});