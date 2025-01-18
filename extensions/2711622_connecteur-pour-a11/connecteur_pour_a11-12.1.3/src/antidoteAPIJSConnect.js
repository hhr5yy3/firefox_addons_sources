/* Ce document est la propriété intellectuelle de Druide informatique inc. Toute reproduction ou publication est interdite. */
/* Copyright 2018 Druide informatique inc. */

let laFonctionAPI_JSConnect = undefined;
//==================initAntidoteAPIJSConnecteur===============================
function initAntidoteAPIJSConnecteur()
{
	window.addEventListener("message", gestionnaireMessageDsPageAntidoteAPI_JSConnect , false);
};

//==================gestionnaireMessageDsPageAntidoteAPI_JSConnect===============================
function gestionnaireMessageDsPageAntidoteAPI_JSConnect(event){
	// 
	if (event.data.type != "TypeContentScriptPourAPIJSConnect")
    	return;	

	if(event.data.message == "sauvegarde"){
		if(laFonctionAPI_JSConnect!==undefined){
			laFonctionAPI_JSConnect();
		}
	}
    return;	
};

//==================activeAntidoteAPI_JSConnect===============================
function activeAntidoteAPI_JSConnect(fonction){
	var edit_arg = {type: "TypeAPIJSConnect", message: "activeAntidoteAPI_JSConnect"};
	window.postMessage(edit_arg, "*");
	window.addEventListener("message", gestionnaireMessageDsPageAntidoteAPI_JSConnect , false);
	if(fonction !== undefined){
		laFonctionAPI_JSConnect = fonction;
	}
};
//==================desactiveAntidoteAPI_JSConnect===============================
function desactiveAntidoteAPI_JSConnect(){
	var edit_arg = {type: "TypeAPIJSConnect", message: "desactiveAntidoteAPI_JSConnect"};
	window.postMessage(edit_arg, "*");
};

//==================lanceAntidoteConnect===============================
function lanceAntidoteConnect(leID){
	var edit_arg = { type: 'TypeContentScriptAntidoteAPIJSConnect', message: 'lanceOutilConnect', id: leID };
	window.postMessage(edit_arg, '*');
};

//==================launchAntidoteConnect===============================
function launchAntidoteConnect(leID){
	lanceAntidoteConnect(leID);
};

//==================estPresentAntidoteAPI_JSConnect===============================
function estPresentAntidoteAPI_JSConnect(){
	return true;
};

//==================donneVersionAntidoteAPI_JSConnect===============================
function donneVersionAntidoteAPI_JSConnect(){
	var unNoeud = document.getElementById('AntidoteConnectActif');
	if(unNoeud!=null){
		var uneVersion = unNoeud.getAttribute("antidoteapiweb_jsconnect_version");
		if(uneVersion!=null && uneVersion!="")
			return uneVersion;
	}
	return "0.0.0";
};

//==================devaw_donneOptions===============================
function donneOptions_devaw(lesOptions){
	var edit_arg = {type: "TypeAPIJSConnect", message: "options_devaw",options:lesOptions};
	window.postMessage(edit_arg, "*");
};


window.postMessage({type: "TypePublicScriptAntidoteAPIJSConnect", message: "AntidoteAPI_JSConnect.Actif"}, "*");