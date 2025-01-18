/* Ce document est la propriété intellectuelle de Druide informatique inc. Toute reproduction ou publication est interdite. */
/* Copyright 2022 Druide informatique inc. */

const cstNomExpediteur = "ModuleJSAntidoteOutlook";

let gIdPageCommOffice = "aucun";
let chargeayCommOffice = false;

let monPortOffice = null;
var gIdCourriel = undefined;
let mesDonneesGlobalesOffice = typeof mesDonneesGlobales !== "undefined" ? mesDonneesGlobales : null;
var gIdAntidoteOffice = typeof gIdAntidote !== "undefined" ? gIdAntidote : cstIdAntidoteWeb;
var gNomExpediteur = cstNomExpediteur;  // valeur temporaire en attendant les autre texteur d'office
var gIdCommunicationDocument = "";  

//==================envoieCommVersBackground===============================
function envoieCommVersBackground(lesArguments) {
	if(!monPortOffice)
		return;

	lesArguments.estLandingPage = false;
	lesArguments.type = ""; //réinitialisé car ce n'est pas utile au background
	lesArguments._id = gIdPageCommOffice;

	lesArguments._dib107 = 'scriptPage';
	lesArguments._dib108 = "";
	if ( ( gIdAntidoteOffice == cstIdAntidoteWeb || gIdAntidoteOffice == cstIdAntidoteWebAConfirmer )//aiguillage vers AWeb
			&& !( lesArguments.message == cstMessageLanceOutilAntidote // Caprice de background.js
					|| lesArguments.message == "_dib26" )// Ne pas affecter pour la requete lanceOutilAntidote ou "_dib26"
			)
	{
		lesArguments._dib108 = cstSourceScriptAWeb;
	}
	lesArguments._dib104 = gIdAntidoteOffice;
	lesArguments.estAWeb = false;

	//console.log("AW_COMM envoieCommVersBackground : ", lesArguments);
	monPortOffice.postMessage(lesArguments);
	
};

//==================envoieMessageAuConnecteurOfficeJS===============================
function envoieMessageAuConnecteurOfficeJS(leMessage) {
	leMessage.type = "ConnecteurNavVersOfficeJs";
	window.postMessage(leMessage, "*");
};

//==================gestionnaireMessageOfficeJS===============================
// message provenant du connecteur de MS Office
function gestionnaireMessageOfficeJS(event) {
	if (event.data.type != 'OfficeJsVersConnecteurNav')
			return;
	var desArguments = event.data;
	if (desArguments !== undefined && desArguments.message == "lanceOutilAntidote"){
		if ( desArguments._dib82 !== undefined )
			gIdCourriel = desArguments._dib82;
		gNomExpediteur = desArguments.nomExpediteur !== undefined ? desArguments.nomExpediteur : cstNomExpediteur ;
		gIdCommunicationDocument = desArguments.idCommunicationDocument !== undefined ? desArguments.idCommunicationDocument : "" ;
	}
	envoieCommVersBackground(desArguments);
};

//==================gestionnaireMessageDuBkg===============================
function gestionnaireMessageDuBkgOffice(msg, port) {	
	if( msg.message !== undefined ){
		if( msg.message == "_dib46" ){
			var uneFenetre = window;
			var unURL= uneFenetre.document.URL;
			msg.message = "_dib26";
			msg.url = unURL;
			msg.appelayPar = msg.appelayPar!==undefined?msg.appelayPar:"";
			msg._dib29 = true;
			if ( gIdCourriel !== undefined )
				msg._dib82 = gIdCourriel;
			msg.nomExpediteur = gNomExpediteur;
			msg.idCommunicationDocument = gIdCommunicationDocument;
			envoieCommVersBackground(msg);
		}else if(msg.message == "_dib01"){
			envoieCommVersBackground({ message: "_dib94", estPageAWeb:false ,_dib29: true});
		}else if(msg.message == "changeTypeAppAntidote"){
			if (msg.donnees_globales !== undefined)
				gIdAntidoteOffice = msg.donnees_globales.idAntidote;
		}else{
			if( msg.message == "init" ){
				mesDonneesGlobalesOffice = msg.donnees_globales;
				if (mesDonneesGlobalesOffice !== undefined)
				gIdAntidoteOffice = mesDonneesGlobalesOffice.idAntidote;
			}
			envoieMessageAuConnecteurOfficeJS(msg);
		}
	}
};

//==================actionAuChargement===============================
function actionAuChargementCommOffice(e) {
	if  ( estPanneauConnecteurMSO() ){
		chargeayCommOffice = true;
		if(gIdPageCommOffice == "aucun"){
			var d = new Date();
			gIdPageCommOffice = d.getTime()+chaine_aleatoire();
		}

		if (estFureteurWebExtension()) {
			try { //obtenir le port
				monPortOffice = fureteur.runtime.connect({name:"si-office" + separateurElement + gIdPageCommOffice});
				monPortOffice.onDisconnect.addListener(function () {
					//console.log("ONDISCONENCT",fureteur.runtime.lastError);
					if (fureteur.runtime.lastError) {
							var m = fureteur.runtime.lastError.message;
							//console.log("Disconnected ",fureteur.runtime.lastError.message);
					}
					actionAuChargementCommOffice(e);
				});
				monPortOffice.onMessage.addListener(gestionnaireMessageDuBkgOffice);
				if ( estSafariWebex() ){
					var edit_arg = { message: "_dib94", estPageAWeb:false, estOffice365Online:false, estSiteIncompatibleAvecDW:false, _dib29: true};
					envoieCommVersBackground(edit_arg);
				}
			}catch(erreur){	
				console.error("antidoteOfficeAddin.actionAuChargementCommOffice",erreur);
			}
		}
		
		//Ajouter un noeud témoin
		var unNoeud = document.createElement("div");
		unNoeud.setAttribute("id","Druide.ScriptConnecteurNavAntidote");
		unNoeud.style.visibility = "hidden";
		document.body.appendChild(unNoeud);
		
		
		window.addEventListener("message", gestionnaireMessageOfficeJS , false);			
	}
};

window.addEventListener("DOMContentLoaded", actionAuChargementCommOffice, false);

if(( estSafariWebex() ||  document.readyState == "interactive" || document.readyState == "complete" )&& !chargeayCommOffice){
	actionAuChargementCommOffice(null);
}
